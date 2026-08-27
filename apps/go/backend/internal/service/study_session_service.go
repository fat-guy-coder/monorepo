// service 包 — 学习会话业务逻辑层
//
// 对齐 Bun /api/study-sessions：校验入参 → 算时长 → 调 repository。
// 时长结算规则：四舍五入取整分钟，负值归 0（与 Bun 端 Math.round + Math.max 对齐）。
package service

import (
	"errors"
	"math"
	"time"

	"github.com/monorepo/go/backend/internal/model"
	"github.com/monorepo/go/backend/internal/repository"
)

// 业务错误（handler 用 errors.Is 判断返回对应状态码）
var ErrMenuNotFound = errors.New("菜单不存在")

// StudySessionService 学习会话业务
type StudySessionService struct {
	repo *repository.StudySessionRepository
}

// NewStudySessionService 构造函数
func NewStudySessionService(repo *repository.StudySessionRepository) *StudySessionService {
	return &StudySessionService{repo: repo}
}

// computeMinutes 结算分钟数：四舍五入，负值归 0
func computeMinutes(start, end time.Time) int {
	m := int(math.Round(end.Sub(start).Minutes()))
	if m < 0 {
		return 0
	}
	return m
}

// Create 新增一条学习记录（POST /api/study-sessions，日志式）
func (s *StudySessionService) Create(in model.StudyCreateInput) (*model.StudySession, error) {
	exists, err := s.repo.MenuExists(in.MenuID)
	if err != nil {
		return nil, err
	}
	if !exists {
		return nil, ErrMenuNotFound
	}
	return s.repo.Create(in.MenuID, in.StartedAt, in.EndedAt, computeMinutes(in.StartedAt, in.EndedAt))
}

// Aggregate 某章节学习统计（GET /api/menus/:id/study）
func (s *StudySessionService) Aggregate(menuID string) (*model.StudyAggregate, bool, error) {
	return s.repo.Aggregate(menuID)
}
