// repository 包 — 数据访问层
//
// 第 1 阶段：用内存 map 存数据（不连数据库）
// 第 2 阶段：换成 PostgreSQL（database/sql 或 GORM）
// 第 4 阶段：把这里的函数改成接口，方便测试替换
//
// 对照学习：
//   go-1-9-maps.vue（map 的增删改查）
//   go-1-13-methods-interfaces.vue（方法：指针接收者）
package repository

import (
	"sort"
	"sync"
	"time"

	"github.com/monorepo/go/backend/internal/model"
)

// MenuRepository 用内存 map 存储菜单
// ⚠️ 这里用了 sync.Mutex 保护 map —— 第 3 阶段学习并发时重点看这里
type MenuRepository struct {
	mu    sync.Mutex
	menus map[string]*model.Menu
	order int // 生成递增 ID 用
}

// NewMenuRepository 构造函数（Go 没有 new 关键字做这个，约定 NewXxx）
func NewMenuRepository() *MenuRepository {
	r := &MenuRepository{
		menus: make(map[string]*model.Menu),
		order: 0,
	}
	// 预置几条测试数据
	r.seed()
	return r
}

func (r *MenuRepository) seed() {
	r.mu.Lock()
	defer r.mu.Unlock()
	now := time.Now()

	r.insert(&model.Menu{
		ID: "menu-1", Name: "Home", Label: "首页", Path: "/",
		Order: 1, Project: "learning", IsLeaf: true, CreatedAt: now, UpdatedAt: now,
	})
	r.insert(&model.Menu{
		ID: "menu-2", Name: "Frontend", Label: "前端开发", Path: "/frontend",
		Order: 2, Project: "learning", IsLeaf: false, CreatedAt: now, UpdatedAt: now,
	})
	r.insert(&model.Menu{
		ID: "menu-3", Name: "JavaScript", Label: "JavaScript", Path: "/frontend/JavaScript",
		Order: 1, Project: "learning", ParentID: strPtr("menu-2"), IsLeaf: true, CreatedAt: now, UpdatedAt: now,
	})
	r.insert(&model.Menu{
		ID: "menu-4", Name: "Backend", Label: "后端开发", Path: "/backend",
		Order: 3, Project: "learning", IsLeaf: true, CreatedAt: now, UpdatedAt: now,
	})
}

// strPtr 返回 string 指针（Go 没有字面量指针，需要工具函数）
func strPtr(s string) *string { return &s }

// insert 内部插入（调用方需已持有锁）
func (r *MenuRepository) insert(m *model.Menu) {
	r.menus[m.ID] = m
	r.order++
}

// ---------- CRUD ----------

// List 返回所有菜单（扁平）
func (r *MenuRepository) List(project string) []*model.Menu {
	r.mu.Lock()
	defer r.mu.Unlock()

	// 收集 + 按 order 排序
	all := make([]*model.Menu, 0, len(r.menus))
	for _, m := range r.menus {
		if project == "" || m.Project == project {
			all = append(all, m)
		}
	}
	sort.Slice(all, func(i, j int) bool { return all[i].Order < all[j].Order })
	return all
}

// Get 按 ID 查单个
func (r *MenuRepository) Get(id string) (*model.Menu, bool) {
	r.mu.Lock()
	defer r.mu.Unlock()
	m, ok := r.menus[id]
	return m, ok
}

// Create 新增菜单（自动生成 ID）
func (r *MenuRepository) Create(name, label string, parentID *string, order int, project string) *model.Menu {
	r.mu.Lock()
	defer r.mu.Unlock()

	now := time.Now()
	menu := &model.Menu{
		ID:        "menu-" + string(rune('A'+r.order)), // 简单递增 ID（第 2 阶段换 UUID）
		Name:      name,
		Label:     label,
		Path:      "/" + name,
		Order:     order,
		Project:   project,
		ParentID:  parentID,
		IsLeaf:    true,
		CreatedAt: now,
		UpdatedAt: now,
	}
	r.insert(menu)
	return menu
}

// Update 更新菜单（部分更新：只改传入的非空字段）
func (r *MenuRepository) Update(id string, label *string, order *int) (*model.Menu, bool) {
	r.mu.Lock()
	defer r.mu.Unlock()

	m, ok := r.menus[id]
	if !ok {
		return nil, false
	}
	if label != nil {
		m.Label = *label
	}
	if order != nil {
		m.Order = *order
	}
	m.UpdatedAt = time.Now()
	return m, true
}

// Delete 删除菜单
func (r *MenuRepository) Delete(id string) bool {
	r.mu.Lock()
	defer r.mu.Unlock()
	if _, ok := r.menus[id]; !ok {
		return false
	}
	delete(r.menus, id)
	return true
}

// BuildTree 构建菜单树（根据 parentId 嵌套 children）
// 对照学习：go-2-2-channels 里用到的 map + 遍历模式，这里用 map 做索引
func (r *MenuRepository) BuildTree(project string) []*model.Menu {
	all := r.List(project)

	// map 索引：id -> menu，方便 O(1) 找父节点
	index := make(map[string]*model.Menu, len(all))
	for _, m := range all {
		index[m.ID] = m
	}

	// 根节点列表
	roots := make([]*model.Menu, 0)
	for _, m := range all {
		if m.ParentID != nil {
			if parent, ok := index[*m.ParentID]; ok {
				parent.Children = append(parent.Children, m)
				parent.IsLeaf = false
				continue
			}
		}
		roots = append(roots, m)
	}
	return roots
}
