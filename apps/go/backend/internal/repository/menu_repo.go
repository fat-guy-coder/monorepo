// repository 包 — 数据访问层（PostgreSQL 版）
//
// 第 1 阶段：内存 map（重启丢数据，进程内不共享）
// 第 4 阶段：换成 PostgreSQL（database/sql + lib/pq），数据持久化
//
// 对照学习：
//   go-4-1-database-sql（database/sql：QueryRow / Query / Exec / Scan）
//   go-4-2-connection-pool（DB 是连接池句柄，连库发生在 Ping）
//   go-4-3-crud-basics（CRUD：INSERT / SELECT / UPDATE / DELETE）
//   go-4-4-sql-security（占位符 $1 $2 防 SQL 注入——绝不拼接用户输入）
//   go-4-8-transactions（CreateBatchTree 用事务保证原子性 + 幂等跳过）
//   go-4-13-migration（建表走 schema_migrations 迁移，见 database.Migrate）
//   go-1-9-maps（BuildTree 用 map 索引，O(1) 找父节点）
package repository

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/monorepo/go/backend/internal/model"
)

// MenuRepository 用 PostgreSQL 存储菜单
// 替换了第 1 阶段的内存 map —— 现在数据落盘，服务重启不丢
type MenuRepository struct {
	db *sql.DB
}

// NewMenuRepository 构造函数，注入连接池句柄 *sql.DB
func NewMenuRepository(db *sql.DB) *MenuRepository {
	return &MenuRepository{db: db}
}

// menuColumns 所有查询共用的列清单
// 注意 "order"/"parent_id" 等 snake_case 列名要和 Bun 端 drizzle schema 完全一致
const menuColumns = `id, name, label, path, icon, "order", project, suggested_minutes, parent_id, created_at, updated_at`

// scanMenu 把一行数据库结果扫描成 model.Menu
// 接收 scan 回调（rows.Scan / row.Scan 都满足），两种查询共用一套映射
func scanMenu(scan func(dest ...any) error) (*model.Menu, error) {
	var m model.Menu
	var icon, parentID sql.NullString // 可空列用 NullString，避免 NULL 扫描报错
	err := scan(&m.ID, &m.Name, &m.Label, &m.Path, &icon, &m.Order, &m.Project, &m.SuggestedMinutes, &parentID, &m.CreatedAt, &m.UpdatedAt)
	if err != nil {
		return nil, err
	}
	if icon.Valid {
		m.Icon = &icon.String
	}
	if parentID.Valid {
		m.ParentID = &parentID.String
	}
	return &m, nil
}

// scanAll 遍历 rows 并逐个扫描，统一收尾（Close + rows.Err）
func scanAll(rows *sql.Rows) ([]*model.Menu, error) {
	all := make([]*model.Menu, 0, 16)
	for rows.Next() {
		m, err := scanMenu(rows.Scan)
		if err != nil {
			return nil, err
		}
		all = append(all, m)
	}
	return all, rows.Err()
}

// ---------- 查询（对照 go-4-3-crud-basics） ----------

// List 查询某项目的所有菜单（扁平，按 order 排序）
// project 为空字符串则查全部
func (r *MenuRepository) List(project string) ([]*model.Menu, error) {
	var rows *sql.Rows
	var err error
	if project == "" {
		rows, err = r.db.Query(`SELECT ` + menuColumns + ` FROM menu ORDER BY "order"`)
	} else {
		rows, err = r.db.Query(`SELECT `+menuColumns+` FROM menu WHERE project = $1 ORDER BY "order"`, project)
	}
	if err != nil {
		return nil, fmt.Errorf("查询菜单列表失败: %w", err)
	}
	defer rows.Close() // ⚠️ 忘记 Close 会泄漏数据库连接（池子会被占满）
	return scanAll(rows)
}

// ListByParent 查询指定父菜单的直接子菜单
// parentID 为 nil = 顶级菜单（parent_id 为 NULL 或空字符串），对应 ?root=true
// 对应 GET /api/menus?parentId=xxx 和 GET /api/menus/:id/children
func (r *MenuRepository) ListByParent(parentID *string, project string) ([]*model.Menu, error) {
	var rows *sql.Rows
	var err error
	if parentID == nil {
		if project == "" {
			rows, err = r.db.Query(`SELECT ` + menuColumns + ` FROM menu WHERE (parent_id IS NULL OR parent_id = '') ORDER BY "order"`)
		} else {
			rows, err = r.db.Query(`SELECT `+menuColumns+` FROM menu WHERE (parent_id IS NULL OR parent_id = '') AND project = $1 ORDER BY "order"`, project)
		}
	} else {
		if project == "" {
			rows, err = r.db.Query(`SELECT `+menuColumns+` FROM menu WHERE parent_id = $1 ORDER BY "order"`, *parentID)
		} else {
			rows, err = r.db.Query(`SELECT `+menuColumns+` FROM menu WHERE parent_id = $1 AND project = $2 ORDER BY "order"`, *parentID, project)
		}
	}
	if err != nil {
		return nil, fmt.Errorf("查询子菜单失败: %w", err)
	}
	defer rows.Close()
	return scanAll(rows)
}

// Get 按 ID 查单个菜单（不存在返回 ok=false）
func (r *MenuRepository) Get(id string) (*model.Menu, bool, error) {
	row := r.db.QueryRow(`SELECT `+menuColumns+` FROM menu WHERE id = $1`, id)
	m, err := scanMenu(row.Scan)
	if err == sql.ErrNoRows {
		return nil, false, nil // 查不到不是错误，返回 ok=false，让上层决定返回什么
	}
	if err != nil {
		return nil, false, err
	}
	return m, true, nil
}

// GetByName 按 name 精确查单个（对应 GET /api/menus/by-name）
// project 为空则不区分项目，非空则限定项目
func (r *MenuRepository) GetByName(name, project string) (*model.Menu, bool, error) {
	row := r.db.QueryRow(`SELECT `+menuColumns+` FROM menu WHERE name = $1 AND ($2 = '' OR project = $2) LIMIT 1`, name, project)
	m, err := scanMenu(row.Scan)
	if err == sql.ErrNoRows {
		return nil, false, nil
	}
	if err != nil {
		return nil, false, err
	}
	return m, true, nil
}

// CountChildren 统计某个菜单的直接子菜单数量（标记 isLeaf 用）
// ⚠️ 教学注意：循环里对每个节点调它会形成 N+1 查询——
//   go-4-6-gorm-association 的 Preload 就是专门解决这种 N+1 的
func (r *MenuRepository) CountChildren(id string) (int, error) {
	var n int
	err := r.db.QueryRow(`SELECT count(*) FROM menu WHERE parent_id = $1`, id).Scan(&n)
	if err != nil {
		return 0, fmt.Errorf("统计子菜单失败: %w", err)
	}
	return n, nil
}

// ---------- 写入（对照 go-4-3-crud-basics + go-4-4-sql-security） ----------

// InsertMenu 插入一个新菜单（path/order 由 service 计算好传入）
// 所有值走占位符 $n，注入的字符串只会被当作文本
func (r *MenuRepository) InsertMenu(in model.MenuCreate, path string, order int) (*model.Menu, error) {
	id := uuid.NewString() // google/uuid 生成主键（对应表里的 uuid 列）
	now := time.Now()

	var parentID *string
	if in.ParentID != nil && *in.ParentID != "" {
		parentID = in.ParentID // 空串统一转 NULL（顶级）
	}

	_, err := r.db.Exec(`INSERT INTO menu (id, name, label, path, icon, "order", project, suggested_minutes, parent_id, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
		id, in.Name, in.Label, path, in.Icon, order, in.Project, in.SuggestedMinutes, parentID, now, now)
	if err != nil {
		return nil, fmt.Errorf("插入菜单失败: %w", err)
	}
	return &model.Menu{
		ID: id, Name: in.Name, Label: in.Label, Path: path,
		Icon: in.Icon, Order: order, Project: in.Project, SuggestedMinutes: in.SuggestedMinutes, ParentID: parentID,
		IsLeaf: true, CreatedAt: now, UpdatedAt: now,
	}, nil
}

// UpdateFields 更新菜单的多个字段（name/label/icon/order/project/suggested_minutes/parent_id）
// 所有参数已是「最终值」（未传字段由 service 保持原值），path 单独用 UpdatePath
func (r *MenuRepository) UpdateFields(id, name, label string, icon *string, order int, project string, suggestedMinutes int, parentID *string) error {
	// 列名和 WHERE 都是写死的常量，唯一变量走占位符 → 无注入面
	_, err := r.db.Exec(`UPDATE menu SET name = $1, label = $2, icon = $3, "order" = $4, project = $5, suggested_minutes = $6, parent_id = $7, updated_at = $8 WHERE id = $9`,
		name, label, icon, order, project, suggestedMinutes, parentID, time.Now(), id)
	if err != nil {
		return fmt.Errorf("更新菜单失败: %w", err)
	}
	return nil
}

// UpdateOrder 更新单个菜单的 order（PUT 里 order 互换用）
func (r *MenuRepository) UpdateOrder(id string, order int) error {
	_, err := r.db.Exec(`UPDATE menu SET "order" = $1, updated_at = $2 WHERE id = $3`, order, time.Now(), id)
	if err != nil {
		return fmt.Errorf("更新 order 失败: %w", err)
	}
	return nil
}

// ShiftOrders 把同级的 order >= fromOrder 全部 +1（给插入腾位置）
// parentID 为 nil = 顶级；对应 CreateMenu 指定 order 时的后移
func (r *MenuRepository) ShiftOrders(parentID *string, project string, fromOrder int) error {
	var err error
	if parentID == nil {
		if project == "" {
			_, err = r.db.Exec(`UPDATE menu SET "order" = "order" + 1, updated_at = $1 WHERE "order" >= $2 AND (parent_id IS NULL OR parent_id = '')`,
				time.Now(), fromOrder)
		} else {
			_, err = r.db.Exec(`UPDATE menu SET "order" = "order" + 1, updated_at = $1 WHERE "order" >= $2 AND (parent_id IS NULL OR parent_id = '') AND project = $3`,
				time.Now(), fromOrder, project)
		}
	} else {
		if project == "" {
			_, err = r.db.Exec(`UPDATE menu SET "order" = "order" + 1, updated_at = $1 WHERE "order" >= $2 AND parent_id = $3`,
				time.Now(), fromOrder, *parentID)
		} else {
			_, err = r.db.Exec(`UPDATE menu SET "order" = "order" + 1, updated_at = $1 WHERE "order" >= $2 AND parent_id = $3 AND project = $4`,
				time.Now(), fromOrder, *parentID, project)
		}
	}
	if err != nil {
		return fmt.Errorf("order 后移失败: %w", err)
	}
	return nil
}

// UpdatePath 更新单个菜单的 path（改 name / parentId 后递归更新子孙路径用）
func (r *MenuRepository) UpdatePath(id, path string) error {
	_, err := r.db.Exec(`UPDATE menu SET path = $1, updated_at = $2 WHERE id = $3`, path, time.Now(), id)
	if err != nil {
		return fmt.Errorf("更新 path 失败: %w", err)
	}
	return nil
}

// UpdateDescendantPaths 递归更新某菜单所有子孙的 path（Bun 的 updateChildrenPaths 等价）
// 步骤：① 查直接子 → ② 每个子 path = 父path/name → ③ 递归
func (r *MenuRepository) UpdateDescendantPaths(parentID, parentPath string) error {
	children, err := r.ListByParent(&parentID, "")
	if err != nil {
		return err
	}
	for _, c := range children {
		newPath := parentPath + "/" + c.Name
		if err := r.UpdatePath(c.ID, newPath); err != nil {
			return err
		}
		if err := r.UpdateDescendantPaths(c.ID, newPath); err != nil {
			return err
		}
	}
	return nil
}

// Delete 递归删除菜单及其所有后代，返回删除行数
// WITH RECURSIVE 一条 SQL 求出整棵子树（parent_id 自引用）再删
func (r *MenuRepository) Delete(id string) (int64, error) {
	res, err := r.db.Exec(`WITH RECURSIVE descendants AS (
		SELECT id FROM menu WHERE id = $1
		UNION ALL
		SELECT m.id FROM menu m JOIN descendants d ON m.parent_id = d.id
	)
	DELETE FROM menu WHERE id IN (SELECT id FROM descendants)`, id)
	if err != nil {
		return 0, fmt.Errorf("删除菜单失败: %w", err)
	}
	return res.RowsAffected()
}

// DeleteBatch 批量递归删除（对应 DELETE /api/menus/batch）
// parentID 非 nil = 模式1：清空该父下所有子树（保留父自身）
// ids 非空 = 模式2：每个 id 连同其所有后代一起删
func (r *MenuRepository) DeleteBatch(parentID *string, ids []string) (int64, error) {
	if parentID != nil {
		res, err := r.db.Exec(`WITH RECURSIVE descendants AS (
			SELECT id FROM menu WHERE parent_id = $1
			UNION ALL
			SELECT m.id FROM menu m JOIN descendants d ON m.parent_id = d.id
		)
		DELETE FROM menu WHERE id IN (SELECT id FROM descendants)`, *parentID)
		if err != nil {
			return 0, fmt.Errorf("批量删除失败: %w", err)
		}
		return res.RowsAffected()
	}

	var total int64
	for _, id := range ids {
		affected, err := r.Delete(id) // 复用递归删除
		if err != nil {
			return total, err
		}
		total += affected
	}
	return total, nil
}

// ---------- 事务（对照 go-4-8-transactions） ----------

// CreateBatchTree 在单个事务里递归幂等批量创建菜单树
// 幂等：同 parent + 同 name 已存在 → 标记 skipped（但继续递归它的 children，子可能新增）
// 任一条插入失败 → 整个事务回滚，不会留下「插了一半」的脏数据
func (r *MenuRepository) CreateBatchTree(project, parentID string, items []model.MenuInput) (*model.BatchResult, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return nil, fmt.Errorf("开启事务失败: %w", err)
	}
	defer tx.Rollback() // 兜底：没 Commit 就回滚；Commit 成功后再 Rollback 返回 ErrTxDone（无害）

	result := &model.BatchResult{}

	// 递归创建函数：pID = 当前父 id，pPath = 当前父 path（nil 表示根级）
	var createRecursive func(pID string, pPath *string, list []model.MenuInput) error
	createRecursive = func(pID string, pPath *string, list []model.MenuInput) error {
		for _, item := range list {
			var existingID, existingPath string
			err := tx.QueryRow(`SELECT id, path FROM menu WHERE parent_id = $1 AND name = $2 LIMIT 1`,
				pID, item.Name).Scan(&existingID, &existingPath)

			switch {
			case err == sql.ErrNoRows:
				// 不存在 → 真正创建
				itemPath := buildBatchPath(pPath, item.Name)
				newID := uuid.NewString()
				now := time.Now()
				if _, err := tx.Exec(`INSERT INTO menu (id, name, label, path, icon, "order", project, suggested_minutes, parent_id, created_at, updated_at)
					VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
					newID, item.Name, item.Label, itemPath, item.Icon, item.Order, project, item.SuggestedMinutes, pID, now, now); err != nil {
					return fmt.Errorf("插入「%s」失败: %w", item.Label, err)
				}
				result.Created++
				result.Details = append(result.Details, model.BatchDetail{Label: item.Label, Path: itemPath, Status: "created"})

				// 递归子节点
				if len(item.Children) > 0 {
					if err := createRecursive(newID, &itemPath, item.Children); err != nil {
						return err
					}
				}

			case err != nil:
				return fmt.Errorf("查重「%s」失败: %w", item.Label, err)

			default:
				// 已存在 → 跳过（幂等），但子节点仍递归（子可能新增）
				result.Skipped++
				result.Details = append(result.Details, model.BatchDetail{Label: item.Label, Path: existingPath, Status: "skipped"})
				if len(item.Children) > 0 {
					if err := createRecursive(existingID, &existingPath, item.Children); err != nil {
						return err
					}
				}
			}
		}
		return nil
	}

	// 取父菜单 path（供子 path 拼接）
	var parentPath *string
	if parentID != "" {
		var p string
		err := tx.QueryRow(`SELECT path FROM menu WHERE id = $1`, parentID).Scan(&p)
		if err != nil && err != sql.ErrNoRows {
			return nil, fmt.Errorf("查询父菜单失败: %w", err)
		}
		if err == nil {
			parentPath = &p
		}
	}

	if err := createRecursive(parentID, parentPath, items); err != nil {
		return nil, fmt.Errorf("批量创建失败，已整体回滚: %w", err)
	}
	if err := tx.Commit(); err != nil {
		return nil, fmt.Errorf("提交事务失败: %w", err)
	}
	return result, nil
}

// buildBatchPath 根据父 path 拼子 path（父为根级则直接 /name）
func buildBatchPath(parentPath *string, name string) string {
	if parentPath != nil && *parentPath != "" {
		return *parentPath + "/" + name
	}
	return "/" + name
}

// ---------- 建树 ----------

// BuildTree 构建菜单树（根据 parent_id 嵌套 children）
// 用 map 做 id→menu 索引，O(1) 找父节点（对照 go-1-9-maps）
func (r *MenuRepository) BuildTree(project string) ([]*model.Menu, error) {
	all, err := r.List(project)
	if err != nil {
		return nil, err
	}

	index := make(map[string]*model.Menu, len(all))
	for _, m := range all {
		index[m.ID] = m
	}

	roots := make([]*model.Menu, 0, len(all))
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
	return roots, nil
}
