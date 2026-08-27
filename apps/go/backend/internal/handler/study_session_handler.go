// handler 包 — 学习会话 HTTP 层（路由 + 请求解析 + 响应）
//
// 对齐 Bun backend 的 study-session.ts 两条端点（日志式：一次填起止时间，服务端算时长）。
// 复用 menu_handler.go 里的包级 writeJSON / writeError（同 package 可直接用）。
// 核心模式：解析请求 → 校验 → 调 service → 统一 JSON 返回
package handler

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"

	"github.com/monorepo/go/backend/internal/model"
	"github.com/monorepo/go/backend/internal/repository"
	"github.com/monorepo/go/backend/internal/service"
)

// StudySessionHandler 组合 service，绑定到 HTTP 路由
type StudySessionHandler struct {
	svc *service.StudySessionService
}

// NewStudySessionHandler 构造函数
func NewStudySessionHandler(svc *service.StudySessionService) *StudySessionHandler {
	return &StudySessionHandler{svc: svc}
}

// RegisterStudySessionRoutes 注册学习计时相关路由（2 条，与 Bun 对齐）
func RegisterStudySessionRoutes(mux *http.ServeMux, db *sql.DB) {
	h := NewStudySessionHandler(service.NewStudySessionService(repository.NewStudySessionRepository(db)))

	mux.HandleFunc("POST /api/study-sessions", h.create)  // 新增学习记录（起止时间必填）
	mux.HandleFunc("GET /api/menus/{id}/study", h.aggregate) // 章节学习统计
}

// POST /api/study-sessions
// body: { "menuId": "...", "startedAt": "...", "endedAt": "..." }
func (h *StudySessionHandler) create(w http.ResponseWriter, r *http.Request) {
	var in model.StudyCreateInput
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		writeError(w, http.StatusBadRequest, "请求体解析失败: "+err.Error())
		return
	}
	if in.MenuID == "" {
		writeError(w, http.StatusBadRequest, "menuId 必填")
		return
	}
	if in.StartedAt.IsZero() || in.EndedAt.IsZero() {
		writeError(w, http.StatusBadRequest, "startedAt 和 endedAt 必填")
		return
	}
	if !in.EndedAt.After(in.StartedAt) {
		writeError(w, http.StatusBadRequest, "结束时间必须晚于开始时间")
		return
	}

	session, err := h.svc.Create(in)
	if err != nil {
		if errors.Is(err, service.ErrMenuNotFound) {
			writeError(w, http.StatusNotFound, "菜单不存在")
			return
		}
		writeError(w, http.StatusInternalServerError, "新增学习记录失败: "+err.Error())
		return
	}
	writeJSON(w, http.StatusCreated, session)
}

// GET /api/menus/{id}/study — 某章节学习统计（建议时长 + 累计已学）
func (h *StudySessionHandler) aggregate(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")

	agg, ok, err := h.svc.Aggregate(id)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "查询学习统计失败: "+err.Error())
		return
	}
	if !ok {
		writeError(w, http.StatusNotFound, "菜单不存在")
		return
	}
	writeJSON(w, http.StatusOK, agg)
}
