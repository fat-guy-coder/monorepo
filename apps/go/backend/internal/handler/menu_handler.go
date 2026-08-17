// handler 包 — HTTP 层（路由 + 请求解析 + 响应）
//
// 对照学习：
//   go-3-x-web 阶段（HTTP 处理）
//   go-1-4-fmt-io（JSON 序列化）
//   核心模式：解析请求 → 调 service → 返回 JSON
package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

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

// RegisterMenuRoutes 注册 /api/menus 相关路由
func RegisterMenuRoutes(mux *http.ServeMux) {
	h := NewMenuHandler(service.NewMenuService(newMenuRepo()))

	mux.HandleFunc("GET /api/menus", h.list)     // 列表（?flat=true / ?tree=true）
	mux.HandleFunc("GET /api/menus/{id}", h.get) // 单个
	mux.HandleFunc("POST /api/menus", h.create)  // 新增
	mux.HandleFunc("PUT /api/menus/{id}", h.update)
	mux.HandleFunc("DELETE /api/menus/{id}", h.delete)
}

// ---------- 统一响应工具 ----------

func writeJSON(w http.ResponseWriter, code int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(model.Response{Code: code, Message: "success", Data: data})
}

func writeError(w http.ResponseWriter, code int, msg string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(model.Response{Code: code, Message: msg, Data: nil})
}

// ---------- handlers ----------

// GET /api/menus?flat=true&project=learning
func (h *MenuHandler) list(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	project := q.Get("project")
	flat := q.Get("flat") == "true"
	tree := q.Get("tree") == "true"

	data := h.svc.ListMenus(project, tree && !flat)
	writeJSON(w, http.StatusOK, data)
}

// GET /api/menus/{id}
func (h *MenuHandler) get(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	menu, ok := h.svc.GetMenu(id)
	if !ok {
		writeError(w, http.StatusNotFound, "菜单不存在")
		return
	}
	writeJSON(w, http.StatusOK, menu)
}

// POST /api/menus  body: { "name": "X", "label": "X", "parentId": "...", "order": 1, "project": "learning" }
func (h *MenuHandler) create(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Name     string  `json:"name"`
		Label    string  `json:"label"`
		ParentID *string `json:"parentId"`
		Order    int     `json:"order"`
		Project  string  `json:"project"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeError(w, http.StatusBadRequest, "请求体解析失败: "+err.Error())
		return
	}
	if body.Name == "" || body.Label == "" {
		writeError(w, http.StatusBadRequest, "name 和 label 必填")
		return
	}

	menu := h.svc.CreateMenu(body.Name, body.Label, body.ParentID, body.Order, body.Project)
	writeJSON(w, http.StatusCreated, menu)
}

// PUT /api/menus/{id}  body: { "label": "新名字", "order": 3 }
func (h *MenuHandler) update(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	var body struct {
		Label *string `json:"label"`
		Order *int    `json:"order"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeError(w, http.StatusBadRequest, "请求体解析失败")
		return
	}

	menu, ok := h.svc.UpdateMenu(id, body.Label, body.Order)
	if !ok {
		writeError(w, http.StatusNotFound, "菜单不存在")
		return
	}
	writeJSON(w, http.StatusOK, menu)
}

// DELETE /api/menus/{id}
func (h *MenuHandler) delete(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if !h.svc.DeleteMenu(id) {
		writeError(w, http.StatusNotFound, "菜单不存在")
		return
	}
	writeJSON(w, http.StatusOK, map[string]bool{"deleted": true})
}

// ---------- 内部工具 ----------

func newMenuRepo() *repository.MenuRepository {
	return repository.NewMenuRepository()
}

// 解析 order 参数（演示 strconv，虽然当前没用到——留给读者练习）
func parseInt(s string) int {
	n, err := strconv.Atoi(s)
	if err != nil {
		log.Printf("解析整数失败: %s", s)
		return 0
	}
	return n
}
