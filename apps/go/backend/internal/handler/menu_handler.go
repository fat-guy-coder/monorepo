// handler 包 — HTTP 层（路由 + 请求解析 + 响应）
//
// 对齐 Bun backend 的 /api/menus 全部接口（apps/backend/src/routes/menu.ts）。
// ⚠️ Bun 端的权限过滤（JWT 登录 + 角色 menuIds）这里暂未实现——等阶段 3 学 JWT 时补。
//
// 对照学习：
//   go-3-x-web 阶段（HTTP 处理：ServeMux 方法路由 / PathValue / 状态码）
//   go-1-4-fmt-io（JSON 序列化：json.NewDecoder / Encoder）
//   go-4-1-database-sql（handler → service → repository → Postgres 全链路）
//   go-4-4-sql-security（请求体校验，name/label 必填，脏数据不进库）
// 核心模式：解析请求 → 校验 → 调 service → 统一 JSON 返回
package handler

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/monorepo/go/backend/internal/model"
	"github.com/monorepo/go/backend/internal/repository"
	"github.com/monorepo/go/backend/internal/service"
)

// MenuHandler 组合 service，绑定到 HTTP 路由
type MenuHandler struct {
	svc *service.MenuService
}

// NewMenuHandler 构造函数
func NewMenuHandler(svc *service.MenuService) *MenuHandler {
	return &MenuHandler{svc: svc}
}

// RegisterMenuRoutes 注册 /api/menus 相关路由（12 条，与 Bun backend 对齐）
// Go 1.22 ServeMux：literal 路径（如 /api/menus/search）优先于通配符 {id}，无需手动排序
func RegisterMenuRoutes(mux *http.ServeMux, db *sql.DB) {
	h := NewMenuHandler(service.NewMenuService(repository.NewMenuRepository(db)))

	// 查询
	mux.HandleFunc("GET /api/menus", h.list)                   // 列表（root/parentId/tree/flat/search）
	mux.HandleFunc("GET /api/menus/search", h.search)          // 搜索（返回匹配树 + openKeys）
	mux.HandleFunc("GET /api/menus/by-name", h.byName)         // 按 name 精确查
	mux.HandleFunc("GET /api/menus/{id}", h.get)               // 单个（带直接子）
	mux.HandleFunc("GET /api/menus/{id}/children", h.children) // 直接子菜单
	mux.HandleFunc("GET /api/menus/{id}/tree", h.subtree)      // 完整子树（递归）
	mux.HandleFunc("GET /api/menus/{id}/leaves", h.leaves)     // 子树下叶子

	// 写入
	mux.HandleFunc("POST /api/menus", h.create)            // 新增（自动算 path/order）
	mux.HandleFunc("POST /api/menus/batch", h.createBatch) // 递归幂等批量（事务，go-4-8-transactions）
	mux.HandleFunc("PUT /api/menus/{id}", h.update)        // 完整更新（path/order 互换/递归子 path）
	mux.HandleFunc("DELETE /api/menus/batch", h.deleteBatch) // parentId 清空子树 / ids 批量删
	mux.HandleFunc("DELETE /api/menus/{id}", h.delete)       // 递归删除
}

// ---------- 统一响应工具 ----------

// writeJSON 统一成功响应：{ code, message: "success", data }
func writeJSON(w http.ResponseWriter, code int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(model.Response{Code: code, Message: "success", Data: data})
}

// writeError 统一失败响应：{ code, message, data: null }
func writeError(w http.ResponseWriter, code int, msg string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(model.Response{Code: code, Message: msg, Data: nil})
}

// ---------- 查询 handlers ----------

// GET /api/menus?project=learning&root=true&parentId=xxx&tree=true&flat=true&search=xx
// 参数组合逻辑在 service.ListMenus（见 menu_service.go），handler 只负责解析 query
func (h *MenuHandler) list(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	project := q.Get("project")
	parentID := q.Get("parentId")
	root := q.Get("root") == "true"
	flat := q.Get("flat") == "true"
	tree := q.Get("tree") == "true"
	search := q.Get("search")

	data, err := h.svc.ListMenus(project, root, parentID, flat, tree, search)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "查询失败: "+err.Error())
		return
	}
	writeJSON(w, http.StatusOK, data)
}

// GET /api/menus/search?search=xx&project=learning
// 返回 { matched: 匹配树, openKeys: 需展开父 path, selectedKeys: 命中 path }
func (h *MenuHandler) search(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	project := q.Get("project")
	term := q.Get("search")

	result, err := h.svc.SearchMenus(project, term)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "搜索失败: "+err.Error())
		return
	}
	writeJSON(w, http.StatusOK, result)
}

// GET /api/menus/by-name?name=xxx&project=learning
func (h *MenuHandler) byName(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	name := q.Get("name")
	project := q.Get("project")
	if name == "" {
		writeError(w, http.StatusBadRequest, "请提供 name 参数")
		return
	}

	menu, ok, err := h.svc.GetMenuByName(name, project)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "查询失败: "+err.Error())
		return
	}
	if !ok {
		writeError(w, http.StatusNotFound, "菜单不存在: "+name)
		return
	}
	writeJSON(w, http.StatusOK, menu)
}

// GET /api/menus/{id}
func (h *MenuHandler) get(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	menu, ok, err := h.svc.GetMenu(id)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "查询失败: "+err.Error())
		return
	}
	if !ok {
		writeError(w, http.StatusNotFound, "菜单不存在")
		return
	}
	writeJSON(w, http.StatusOK, menu)
}

// GET /api/menus/{id}/children — 直接子菜单列表
func (h *MenuHandler) children(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	items, err := h.svc.GetChildren(id)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "查询失败: "+err.Error())
		return
	}
	writeJSON(w, http.StatusOK, items)
}

// GET /api/menus/{id}/tree?project=learning — 完整子树（递归嵌套）
func (h *MenuHandler) subtree(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	project := r.URL.Query().Get("project")

	node, ok, err := h.svc.GetSubtree(id, project)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "查询失败: "+err.Error())
		return
	}
	if !ok {
		writeError(w, http.StatusNotFound, "菜单不存在")
		return
	}
	writeJSON(w, http.StatusOK, node)
}

// GET /api/menus/{id}/leaves?project=learning — 子树下所有叶子
func (h *MenuHandler) leaves(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	project := r.URL.Query().Get("project")

	result, err := h.svc.GetLeaves(id, project)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "查询失败: "+err.Error())
		return
	}
	writeJSON(w, http.StatusOK, result)
}

// ---------- 写入 handlers ----------

// POST /api/menus
// body: { "name": "X", "label": "X", "parentId": "...", "order": 1, "project": "learning" }
// 不传 order → 自动放同级末尾；传了 → 同级从该位置后移
func (h *MenuHandler) create(w http.ResponseWriter, r *http.Request) {
	var body model.MenuCreate
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeError(w, http.StatusBadRequest, "请求体解析失败: "+err.Error())
		return
	}
	if body.Name == "" || body.Label == "" {
		writeError(w, http.StatusBadRequest, "name 和 label 必填")
		return
	}

	menu, err := h.svc.CreateMenu(body)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "创建失败: "+err.Error())
		return
	}
	writeJSON(w, http.StatusCreated, menu)
}

// POST /api/menus/batch
// body: { "project": "learning", "parentId": "xxx", "items": [{ "name": "...", "label": "...", "children": [...] }] }
// 递归建树 + 幂等（同 parent 同 name 已存在 → skipped）+ 事务（任一失败整体回滚）
func (h *MenuHandler) createBatch(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Project  string            `json:"project"`
		ParentID string            `json:"parentId"`
		Items    []model.MenuInput `json:"items"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeError(w, http.StatusBadRequest, "请求体解析失败: "+err.Error())
		return
	}
	if body.Project == "" || body.ParentID == "" || len(body.Items) == 0 {
		writeError(w, http.StatusBadRequest, "请提供 project, parentId, items 参数")
		return
	}

	result, err := h.svc.CreateMenusBatch(body.Project, body.ParentID, body.Items)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "批量创建失败，已整体回滚: "+err.Error())
		return
	}
	writeJSON(w, http.StatusCreated, result)
}

// PUT /api/menus/{id}
// body: { "name": "...", "label": "...", "icon": "...", "order": 3, "project": "...", "parentId": "..." }
// 全字段指针：未传字段不更新；icon="" 清空；parentId="" 移到顶级
func (h *MenuHandler) update(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	var body model.MenuUpdate
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeError(w, http.StatusBadRequest, "请求体解析失败: "+err.Error())
		return
	}

	menu, ok, err := h.svc.UpdateMenu(id, body)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "更新失败: "+err.Error())
		return
	}
	if !ok {
		writeError(w, http.StatusNotFound, "菜单不存在")
		return
	}
	writeJSON(w, http.StatusOK, menu)
}

// DELETE /api/menus/batch
// body: { "parentId": "xxx" } 清空该父下所有子树（保留父） 或 { "ids": ["a", "b"] } 逐个连同后代删
func (h *MenuHandler) deleteBatch(w http.ResponseWriter, r *http.Request) {
	var body struct {
		ParentID *string  `json:"parentId"`
		IDs      []string `json:"ids"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeError(w, http.StatusBadRequest, "请求体解析失败: "+err.Error())
		return
	}
	if body.ParentID == nil && len(body.IDs) == 0 {
		writeError(w, http.StatusBadRequest, "请提供 parentId 或 ids 参数")
		return
	}

	affected, err := h.svc.DeleteMenusBatch(body.ParentID, body.IDs)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "批量删除失败: "+err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"deleted": affected})
}

// DELETE /api/menus/{id} — 递归删除（WITH RECURSIVE，含子孙）
func (h *MenuHandler) delete(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	affected, ok, err := h.svc.DeleteMenu(id)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "删除失败: "+err.Error())
		return
	}
	if !ok {
		writeError(w, http.StatusNotFound, "菜单不存在")
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"deleted": affected})
}
