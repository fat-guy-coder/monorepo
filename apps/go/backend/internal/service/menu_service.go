// service 包 — 业务逻辑层
//
// 职责：把 repository 的原子查询组合成业务动作（建树、算 path、order 互换、递归更新）
// 调用链：handler → service → repository → PostgreSQL
//
// 对照学习：
//   go-4-1-database-sql（三层架构：handler 解析 HTTP / service 组织业务 / repo 碰数据库）
//   go-4-3-crud-basics（Create/Update/Delete 的参数组合）
//   go-4-4-sql-security（parentId 空串统一转 nil，避免脏数据）
//   go-4-8-transactions（UpdateMenu 的多步更新保证一致性）
//   go-1-6-errors（错误用 fmt.Errorf 包装，逐层带上下文）
package service

import (
	"fmt"
	"sort"
	"strings"

	"github.com/monorepo/go/backend/internal/model"
	"github.com/monorepo/go/backend/internal/repository"
)

// MenuService 业务逻辑层，持有数据访问层
type MenuService struct {
	repo *repository.MenuRepository
}

// NewMenuService 构造函数
func NewMenuService(repo *repository.MenuRepository) *MenuService {
	return &MenuService{repo: repo}
}

// ---------- 查询 ----------

// ListMenus 对齐 Bun GET /api/menus 的多种返回形态
// 参数：root=true 顶级 / parentId=xxx 直接子 / tree=true 完整树 / flat=true 扁平 / search 过滤
// 步骤：① tree 优先 → ② root → ③ parentId → ④ 默认树（flat 可摊平 + 过滤）
func (s *MenuService) ListMenus(project string, root bool, parentID string, flat bool, tree bool, search string) (any, error) {
	// 形态 1：?tree=true → 完整树 + isLeaf 标记
	if tree {
		treeData, err := s.repo.BuildTree(project)
		if err != nil {
			return nil, err
		}
		markIsLeaf(treeData)
		return treeData, nil
	}

	// 形态 2：?root=true → 顶级菜单 + isLeaf
	if root {
		items, err := s.repo.ListByParent(nil, project)
		if err != nil {
			return nil, err
		}
		if err := s.markLeaves(items); err != nil {
			return nil, err
		}
		return items, nil
	}

	// 形态 3：?parentId=xxx → 指定父的直接子 + isLeaf
	if parentID != "" {
		items, err := s.repo.ListByParent(&parentID, project)
		if err != nil {
			return nil, err
		}
		if err := s.markLeaves(items); err != nil {
			return nil, err
		}
		return items, nil
	}

	// 形态 4（默认）：全量树；?flat=true 摊平成数组，可再按 search 过滤
	treeData, err := s.repo.BuildTree(project)
	if err != nil {
		return nil, err
	}
	if flat {
		list := flatten(treeData)
		if search != "" {
			lower := strings.ToLower(search)
			filtered := make([]*model.Menu, 0, len(list))
			for _, m := range list {
				if strings.Contains(strings.ToLower(m.Label), lower) ||
					strings.Contains(strings.ToLower(m.Name), lower) {
					filtered = append(filtered, m)
				}
			}
			return filtered, nil
		}
		return list, nil
	}
	return treeData, nil
}

// GetMenu 按 ID 查单个菜单（带直接子菜单列表）
func (s *MenuService) GetMenu(id string) (*model.Menu, bool, error) {
	m, ok, err := s.repo.Get(id)
	if err != nil || !ok {
		return m, ok, err
	}
	kids, err := s.repo.ListByParent(&id, "")
	if err != nil {
		return nil, false, err
	}
	m.Children = kids
	return m, true, nil
}

// GetMenuByName 按 name 查单个菜单（GET /api/menus/by-name）
func (s *MenuService) GetMenuByName(name, project string) (*model.Menu, bool, error) {
	return s.repo.GetByName(name, project)
}

// GetChildren 直接子菜单（GET /api/menus/:id/children）
func (s *MenuService) GetChildren(id string) ([]*model.Menu, error) {
	return s.repo.ListByParent(&id, "")
}

// GetSubtree 完整子树（GET /api/menus/:id/tree）
// 步骤：① 全量拉一次 → ② map 索引找根 → ③ 所有节点挂到父的 children → ④ 标记 isLeaf
func (s *MenuService) GetSubtree(id, project string) (*model.Menu, bool, error) {
	all, err := s.repo.List(project)
	if err != nil {
		return nil, false, err
	}

	index := make(map[string]*model.Menu, len(all))
	for _, m := range all {
		cp := *m // 浅拷贝，避免污染 all
		cp.Children = nil
		index[m.ID] = &cp
	}

	root, ok := index[id]
	if !ok {
		return nil, false, nil
	}

	for _, m := range all {
		if m.ParentID != nil {
			if parent, ok := index[*m.ParentID]; ok {
				parent.Children = append(parent.Children, index[m.ID])
			}
		}
	}
	markIsLeaf([]*model.Menu{root})
	return root, true, nil
}

// GetLeaves 子树下所有叶子（GET /api/menus/:id/leaves）
// 步骤：① 全量拉 → ② 判断是否 root 后代（沿 parent 链向上找） → ③ 排除有子的 → ④ 排序
func (s *MenuService) GetLeaves(id, project string) (*model.LeavesResult, error) {
	all, err := s.repo.List(project)
	if err != nil {
		return nil, err
	}

	// parent 链映射：id → 父 id（向上回溯用）
	parentMap := make(map[string]*string, len(all))
	// 有子的集合（叶子 = 不在这个集合里）
	hasChild := make(map[string]bool)
	for _, m := range all {
		parentMap[m.ID] = m.ParentID
		if m.ParentID != nil {
			hasChild[*m.ParentID] = true
		}
	}

	// isDescendant：沿 parent 链向上走，能走到 rootId 就是后代
	isDescendant := func(m *model.Menu) bool {
		cur := m.ParentID
		for cur != nil {
			if *cur == id {
				return true
			}
			p := parentMap[*cur]
			if p == nil {
				break
			}
			cur = p
		}
		return false
	}

	var leaves []model.Leaf
	for _, m := range all {
		if isDescendant(m) && !hasChild[m.ID] {
			leaves = append(leaves, model.Leaf{
				ID: m.ID, Name: m.Name, Label: m.Label, Path: m.Path, Order: m.Order,
			})
		}
	}
	sortLeaves(leaves)
	return &model.LeavesResult{Total: len(leaves), Leaves: leaves}, nil
}

// SearchMenus 搜索菜单（GET /api/menus/search）
// 步骤：① 全量拉 + 建 parent 映射 → ② 空搜索词返回根+一层 → ③ 匹配 label/name
//       → ④ 收集「匹配项的祖先链 + 每层全部同级」为可见集 → ⑤ 顶层可见节点递归建子树
//       → ⑥ 父级 path 进 openKeys、命中 path 进 selectedKeys
func (s *MenuService) SearchMenus(project, term string) (*model.SearchResult, error) {
	all, err := s.repo.List(project)
	if err != nil {
		return nil, err
	}
	lower := strings.ToLower(term)

	// id → 菜单 / id → 父 id，各一次 O(n) 建好，后续全部 O(1)
	menuMap := make(map[string]*model.Menu, len(all))
	parentMap := make(map[string]*string, len(all))
	for _, m := range all {
		cp := *m
		cp.Children = nil
		menuMap[m.ID] = &cp
		parentMap[m.ID] = m.ParentID
	}
	childrenOf := func(pid string) []*model.Menu {
		var out []*model.Menu
		for _, m := range all {
			if m.ParentID != nil && *m.ParentID == pid {
				out = append(out, m)
			}
		}
		return out
	}

	// 空搜索词 → 根菜单 + 一层子（给前端默认展开用）
	if term == "" {
		roots := make([]*model.Menu, 0)
		for _, m := range all {
			if m.ParentID == nil || *m.ParentID == "" {
				node := menuMap[m.ID]
				kids := childrenOf(m.ID)
				node.IsLeaf = len(kids) == 0
				node.Children = kids
				roots = append(roots, node)
			}
		}
		sortMenuByOrder(roots)
		return &model.SearchResult{Matched: roots, OpenKeys: []string{}, SelectedKeys: []string{}}, nil
	}

	// 1. 匹配 label/name（不区分大小写）
	var matched []*model.Menu
	for _, m := range all {
		if strings.Contains(strings.ToLower(m.Label), lower) ||
			strings.Contains(strings.ToLower(m.Name), lower) {
			matched = append(matched, m)
		}
	}
	if len(matched) == 0 {
		return &model.SearchResult{Matched: []*model.Menu{}, OpenKeys: []string{}, SelectedKeys: []string{}}, nil
	}

	// 2. 收集可见节点 + openKeys + selectedKeys
	visible := make(map[string]bool)
	openKeys := make(map[string]bool)
	var selectedKeys []string

	for _, mt := range matched {
		selectedKeys = append(selectedKeys, mt.Path)
		menuMap[mt.ID].Match = true // 命中节点打标记

		// 祖先链（根 → 命中节点）
		ancestors := make([]string, 0, 8)
		for cur := mt.ID; cur != ""; {
			ancestors = append([]string{cur}, ancestors...)
			p := parentMap[cur]
			if p == nil || *p == "" {
				break
			}
			cur = *p
		}

		// 每层：该节点的所有直接子都进 visible（同级全部展开）
		for i, nodeID := range ancestors {
			for _, c := range childrenOf(nodeID) {
				visible[c.ID] = true
			}
			// 非根层：父级 path 进 openKeys
			if i > 0 {
				if pn := menuMap[ancestors[i-1]]; pn != nil {
					openKeys[pn.Path] = true
				}
			}
		}
	}

	// 3. 顶层可见节点（父不在 visible 集内 = 树的根）
	rootVisible := make([]string, 0)
	for id := range visible {
		p := parentMap[id]
		if p == nil || *p == "" || !visible[*p] {
			rootVisible = append(rootVisible, id)
		}
	}

	// 4. 递归构建子树（只包含 visible 节点）
	var buildSubTree func(pid string) []*model.Menu
	buildSubTree = func(pid string) []*model.Menu {
		kids := make([]*model.Menu, 0)
		for _, m := range all {
			if m.ParentID != nil && *m.ParentID == pid && visible[m.ID] {
				node := menuMap[m.ID]
				sub := buildSubTree(m.ID)
				node.IsLeaf = len(sub) == 0
				node.Children = sub
				kids = append(kids, node)
			}
		}
		sortMenuByOrder(kids)
		return kids
	}

	result := make([]*model.Menu, 0, len(rootVisible))
	for _, rid := range rootVisible {
		node := menuMap[rid]
		sub := buildSubTree(rid)
		node.IsLeaf = len(sub) == 0
		node.Children = sub
		result = append(result, node)
	}
	sortMenuByOrder(result)

	// 5. map → slice（Bun 端输出数组）
	openKeyList := make([]string, 0, len(openKeys))
	for k := range openKeys {
		openKeyList = append(openKeyList, k)
	}

	return &model.SearchResult{
		Matched:      result,
		OpenKeys:     openKeyList,
		SelectedKeys: selectedKeys,
	}, nil
}

// ---------- 写入 ----------

// CreateMenu 创建菜单（POST /api/menus）
// 步骤：① parentId 空串转 nil → ② 算 path（父 path/name） → ③ 算 order（不传=末尾，传了=同级后移）
func (s *MenuService) CreateMenu(in model.MenuCreate) (*model.Menu, error) {
	// ① 规范化：空串 parentId 统一转 nil（顶级），project 默认 learning
	var parentID *string
	if in.ParentID != nil && *in.ParentID != "" {
		parentID = in.ParentID
	}
	if in.Project == "" {
		in.Project = "learning"
	}

	// ② 算 path：父 path + "/" + name；无父则 "/name"
	var path string
	if parentID != nil {
		parent, ok, err := s.repo.Get(*parentID)
		if err != nil {
			return nil, err
		}
		if !ok {
			return nil, fmt.Errorf("父菜单不存在: %s", *parentID)
		}
		if parent.Path != "" {
			path = parent.Path + "/" + in.Name
		} else {
			path = "/" + in.Name
		}
	} else {
		path = "/" + in.Name
	}

	// ③ 算 order：不传 → 放同级末尾（当前同级数量）；传了 → 同级 >= 目标的全部后移 1
	order := in.Order
	if order == nil {
		siblings, err := s.repo.ListByParent(parentID, in.Project)
		if err != nil {
			return nil, err
		}
		n := len(siblings)
		order = &n
	} else {
		if err := s.repo.ShiftOrders(parentID, in.Project, *order); err != nil {
			return nil, err
		}
	}

	return s.repo.InsertMenu(in, path, *order)
}

// UpdateMenu 更新菜单（PUT /api/menus/:id）
// 步骤：① 存在性 → ② 算最终 parent_id → ③ 算最终各字段 → ④ 重算 path（name/parent 变了才重算）
//       → ⑤ order 互换（同级同 order 的另一菜单换走） → ⑥ 更新 → ⑦ path 变了递归更新子孙
func (s *MenuService) UpdateMenu(id string, in model.MenuUpdate) (*model.Menu, bool, error) {
	// ① 存在性检查
	existing, ok, err := s.repo.Get(id)
	if err != nil || !ok {
		return nil, ok, err
	}

	// ② 最终 parent_id：未传 → 保持；传 "" → 移到顶级；传值 → 新父
	newParent := existing.ParentID
	parentChanged := false
	if in.ParentID != nil {
		oldNorm := ""
		if existing.ParentID != nil {
			oldNorm = *existing.ParentID
		}
		newNorm := *in.ParentID
		parentChanged = newNorm != oldNorm
		if *in.ParentID == "" {
			newParent = nil
		} else {
			newParent = in.ParentID
		}
	}

	// ③ 最终字段值（未传 = 保持原值）
	name, label := existing.Name, existing.Label
	if in.Name != nil {
		name = *in.Name
	}
	if in.Label != nil {
		label = *in.Label
	}
	icon := existing.Icon
	if in.Icon != nil {
		icon = in.Icon // 传 "" = 清空图标
	}
	project := existing.Project
	if in.Project != nil {
		project = *in.Project
	}
	order := existing.Order
	if in.Order != nil {
		order = *in.Order
	}
	suggestedMinutes := existing.SuggestedMinutes
	if in.SuggestedMinutes != nil {
		suggestedMinutes = *in.SuggestedMinutes
	}

	// ④ 重算 path（仅 name 或 parent 变了才重算）
	path := existing.Path
	if in.Name != nil || parentChanged {
		if newParent != nil {
			p, ok2, err2 := s.repo.Get(*newParent)
			if err2 != nil {
				return nil, false, err2
			}
			if !ok2 {
				return nil, false, fmt.Errorf("父菜单不存在: %s", *newParent)
			}
			if p.Path != "" {
				path = p.Path + "/" + name
			} else {
				path = "/" + name
			}
		} else {
			path = "/" + name
		}
	}

	// ⑤ order 互换：同级已有相同 order 的菜单 → 把它改成自己的旧 order
	if in.Order != nil && *in.Order != existing.Order {
		siblings, err := s.repo.ListByParent(existing.ParentID, "")
		if err != nil {
			return nil, false, err
		}
		for _, sib := range siblings {
			if sib.ID != id && sib.Order == *in.Order {
				if err := s.repo.UpdateOrder(sib.ID, existing.Order); err != nil {
					return nil, false, err
				}
				break
			}
		}
	}

	// ⑥ 主体更新（含新 order）
	if err := s.repo.UpdateFields(id, name, label, icon, order, project, suggestedMinutes, newParent); err != nil {
		return nil, false, err
	}

	// ⑦ path 变了 → 递归更新所有子孙 path
	if path != existing.Path {
		if err := s.repo.UpdatePath(id, path); err != nil {
			return nil, false, err
		}
		if err := s.repo.UpdateDescendantPaths(id, path); err != nil {
			return nil, false, err
		}
	}

	// ⑧ 返回更新后的菜单 + isLeaf
	updated, ok2, err2 := s.repo.Get(id)
	if err2 != nil || !ok2 {
		return updated, ok2, err2
	}
	n, err := s.repo.CountChildren(id)
	if err != nil {
		return nil, false, err
	}
	updated.IsLeaf = n == 0
	return updated, true, nil
}

// DeleteMenu 递归删除菜单（DELETE /api/menus/:id）
func (s *MenuService) DeleteMenu(id string) (int64, bool, error) {
	affected, err := s.repo.Delete(id)
	if err != nil {
		return 0, false, err
	}
	return affected, affected > 0, nil
}

// CreateMenusBatch 递归幂等批量创建（POST /api/menus/batch，事务）
func (s *MenuService) CreateMenusBatch(project, parentID string, items []model.MenuInput) (*model.BatchResult, error) {
	return s.repo.CreateBatchTree(project, parentID, items)
}

// DeleteMenusBatch 批量递归删除（DELETE /api/menus/batch）
func (s *MenuService) DeleteMenusBatch(parentID *string, ids []string) (int64, error) {
	return s.repo.DeleteBatch(parentID, ids)
}

// ---------- 内部工具 ----------

// markLeaves 给列表里的菜单标记 isLeaf（查子计数）
// ⚠️ 教学注意：每个节点一次 count 查询 = N+1，可对照 go-4-6-gorm-association 的 Preload
func (s *MenuService) markLeaves(items []*model.Menu) error {
	for _, m := range items {
		n, err := s.repo.CountChildren(m.ID)
		if err != nil {
			return err
		}
		m.IsLeaf = n == 0
	}
	return nil
}

// sortLeaves 叶子按 order 排序（教学：sort.Slice 稳定排序处理）
func sortLeaves(leaves []model.Leaf) {
	sort.Slice(leaves, func(i, j int) bool {
		if leaves[i].Order == leaves[j].Order {
			return leaves[i].Label < leaves[j].Label
		}
		return leaves[i].Order < leaves[j].Order
	})
}
