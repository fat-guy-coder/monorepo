// repository 包 — 学习会话数据访问层（PostgreSQL）
//
// 对齐 Bun backend 的 /api/study-sessions + /api/menus/:id/study。
// 沿用 menu_repo 的模式：列清单常量 + scan 回调统一扫描、占位符 $n 防注入。
package repository

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/monorepo/go/backend/internal/model"
)

// StudySessionRepository 学习会话存取（表：study_session）
type StudySessionRepository struct {
	db *sql.DB
}

// NewStudySessionRepository 构造函数，注入连接池句柄
func NewStudySessionRepository(db *sql.DB) *StudySessionRepository {
	return &StudySessionRepository{db: db}
}

// studyColumns 查询共用列清单（与 scanStudySession 顺序严格一致）
const studyColumns = `id, menu_id, started_at, ended_at, duration_minutes, created_at`

// scanStudySession 把一行结果扫描成 model.StudySession
// ended_at 可空（进行中会话为 NULL），用 sql.NullTime 中转
func scanStudySession(scan func(dest ...any) error) (*model.StudySession, error) {
	var s model.StudySession
	var endedAt sql.NullTime
	err := scan(&s.ID, &s.MenuID, &s.StartedAt, &endedAt, &s.DurationMinutes, &s.CreatedAt)
	if err != nil {
		return nil, err
	}
	if endedAt.Valid {
		s.EndedAt = &endedAt.Time
	}
	return &s, nil
}

// scanStudyAll 遍历 rows 并逐个扫描
func scanStudyAll(rows *sql.Rows) ([]*model.StudySession, error) {
	all := make([]*model.StudySession, 0, 8)
	for rows.Next() {
		s, err := scanStudySession(rows.Scan)
		if err != nil {
			return nil, err
		}
		all = append(all, s)
	}
	return all, rows.Err()
}

// MenuExists 校验 menu_id 对应菜单是否存在（外键是 DB 级，但提前校验能给更友好的错误）
func (r *StudySessionRepository) MenuExists(menuID string) (bool, error) {
	var id string
	err := r.db.QueryRow(`SELECT id FROM menu WHERE id = $1`, menuID).Scan(&id)
	if err == sql.ErrNoRows {
		return false, nil
	}
	if err != nil {
		return false, fmt.Errorf("查询菜单失败: %w", err)
	}
	return true, nil
}

// Create 新增一条完整学习记录（POST /api/study-sessions，日志式：起止时间一次性填）
func (r *StudySessionRepository) Create(menuID string, startedAt, endedAt time.Time, durationMinutes int) (*model.StudySession, error) {
	id := uuid.NewString()
	now := time.Now()
	_, err := r.db.Exec(`INSERT INTO study_session (id, menu_id, started_at, ended_at, duration_minutes, created_at)
		VALUES ($1, $2, $3, $4, $5, $6)`,
		id, menuID, startedAt, endedAt, durationMinutes, now)
	if err != nil {
		return nil, fmt.Errorf("新增学习记录失败: %w", err)
	}
	return &model.StudySession{
		ID: id, MenuID: menuID, StartedAt: startedAt, EndedAt: &endedAt,
		DurationMinutes: durationMinutes, CreatedAt: now,
	}, nil
}

// Aggregate 某章节的学习统计（GET /api/menus/:id/study）
// ① 查菜单信息（label / suggested_minutes）② 查已结束会话列表并累加分钟
func (r *StudySessionRepository) Aggregate(menuID string) (*model.StudyAggregate, bool, error) {
	agg := &model.StudyAggregate{MenuID: menuID}

	err := r.db.QueryRow(`SELECT label, suggested_minutes FROM menu WHERE id = $1`, menuID).
		Scan(&agg.Label, &agg.SuggestedMinutes)
	if err == sql.ErrNoRows {
		return nil, false, nil // 菜单不存在
	}
	if err != nil {
		return nil, false, fmt.Errorf("查询菜单信息失败: %w", err)
	}

	rows, err := r.db.Query(`SELECT `+studyColumns+` FROM study_session WHERE menu_id = $1 AND ended_at IS NOT NULL ORDER BY started_at`, menuID)
	if err != nil {
		return nil, false, fmt.Errorf("查询学习会话失败: %w", err)
	}
	defer rows.Close()

	sessions, err := scanStudyAll(rows)
	if err != nil {
		return nil, false, err
	}
	agg.Sessions = sessions
	for _, s := range sessions {
		agg.TotalMinutes += s.DurationMinutes
	}
	return agg, true, nil
}
