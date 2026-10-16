// model 包 — 定义数据结构
//
// 对照学习：go-1-11-structs.vue（结构体定义 + JSON 标签）
//   结构体标签 `json:"id"` 决定 JSON 序列化后的字段名
//   go 的 struct 字段大写开头 = 导出（public），小写 = 私有
package model

import "time"

// Menu 对应 backend 的菜单表
// JSON 标签控制序列化：id -> "id", label -> "label"
type Menu struct {
	ID               string     `json:"id"`
	Name             string     `json:"name"`
	Label            string     `json:"label"`
	Path             string     `json:"path"`
	Icon             *string    `json:"icon,omitempty"` // 指针 + omitempty：nil 时不输出
	Order            int        `json:"order"`
	Project          string     `json:"project"`
	SuggestedMinutes int        `json:"suggestedMinutes"` // 建议学习时长（分钟），0 = 未设置
	ParentID         *string    `json:"parentId,omitempty"` // nil = 顶级菜单
	Children         []*Menu    `json:"children,omitempty"`
	IsLeaf           bool       `json:"isLeaf"`
	Match            bool       `json:"match,omitempty"` // 搜索命中标记（GET /api/menus/search 用）
	CreatedAt        time.Time  `json:"createdAt"`
	UpdatedAt        time.Time  `json:"updatedAt"`
}

// 统一响应格式 — 与现有 Bun backend 保持一致 { code, message, data }
type Response struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    any    `json:"data"`
}

// MenuInput 批量创建菜单的输入项（支持 children 递归嵌套，对应 POST /api/menus/batch）
type MenuInput struct {
	Name             string      `json:"name"`
	Label            string      `json:"label"`
	Icon             *string     `json:"icon,omitempty"`
	Order            int         `json:"order"`
	SuggestedMinutes int         `json:"suggestedMinutes"`
	Children         []MenuInput `json:"children,omitempty"`
}

// MenuCreate 单个创建菜单的输入（POST /api/menus）
// Order 用指针：不传（nil）时服务端自动放到同级末尾
type MenuCreate struct {
	Name             string  `json:"name"`
	Label            string  `json:"label"`
	Icon             *string `json:"icon,omitempty"`
	Order            *int    `json:"order"`
	Project          string  `json:"project"`
	SuggestedMinutes int     `json:"suggestedMinutes"`
	ParentID         *string `json:"parentId"`
}

// MenuUpdate 更新菜单的输入（PUT /api/menus/:id，全部指针：nil = 该字段不更新）
// Icon 传 "" 表示清空图标；ParentID 传 "" 表示移到顶级
type MenuUpdate struct {
	Name             *string `json:"name"`
	Label            *string `json:"label"`
	Icon             *string `json:"icon"`
	Order            *int    `json:"order"`
	Project          *string `json:"project"`
	SuggestedMinutes *int    `json:"suggestedMinutes"`
	ParentID         *string `json:"parentId"`
}

// BatchDetail 批量创建的单条结果（对齐 Bun /api/menus/batch）
type BatchDetail struct {
	Label  string `json:"label"`
	Path   string `json:"path"`
	Status string `json:"status"` // created / skipped / failed
}

// BatchResult 批量创建的结果统计
type BatchResult struct {
	Created int           `json:"created"`
	Skipped int           `json:"skipped"`
	Failed  int           `json:"failed"`
	Details []BatchDetail `json:"details"`
}

// SearchResult 搜索返回：匹配树 + 需要展开的父级 path + 选中 path
type SearchResult struct {
	Matched      []*Menu  `json:"matched"`
	OpenKeys     []string `json:"openKeys"`
	SelectedKeys []string `json:"selectedKeys"`
}

// Leaf 叶子菜单简略信息（GET /api/menus/:id/leaves）
type Leaf struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Label string `json:"label"`
	Path  string `json:"path"`
	Order int    `json:"order"`
}

// LeavesResult 子树叶子统计结果
type LeavesResult struct {
	Total  int    `json:"total"`
	Leaves []Leaf `json:"leaves"`
}

// ---------- 学习计时（对齐 Bun /api/menus/:id/study + start/end/manual） ----------

// StudyProgress 某菜单的学习进度行（study_progress 表，一菜单一行，total_minutes 累加）
type StudyProgress struct {
	MenuID       string     `json:"menuId"`
	TotalMinutes int        `json:"totalMinutes"`
	StartedAt    *time.Time `json:"startedAt,omitempty"` // 进行中/上次开始
	EndedAt      *time.Time `json:"endedAt,omitempty"`   // 最近一次结束（进行中为 nil）
	CreatedAt    time.Time  `json:"createdAt"`
	UpdatedAt    time.Time  `json:"updatedAt"`
}

// StudyStartInput 开始学习的输入（POST /api/menus/:id/study/start）
type StudyStartInput struct {
	StartedAt *time.Time `json:"startedAt"`
}

// StudyEndInput 结束学习的输入（POST /api/menus/:id/study/end）
type StudyEndInput struct {
	EndedAt *time.Time `json:"endedAt"`
}

// StudyManualInput 手动补录的输入（POST /api/menus/:id/study/manual）
type StudyManualInput struct {
	StartedAt time.Time `json:"startedAt"`
	EndedAt   time.Time `json:"endedAt"`
}

// StudyAggregate 某章节的学习统计（GET /api/menus/:id/study）
type StudyAggregate struct {
	MenuID           string     `json:"menuId"`
	Label            string     `json:"label"`
	SuggestedMinutes int        `json:"suggestedMinutes"`
	TotalMinutes     int        `json:"totalMinutes"`
	StartedAt        *time.Time `json:"startedAt,omitempty"`
	EndedAt          *time.Time `json:"endedAt,omitempty"`
	OvertimeMinutes  int        `json:"overtimeMinutes"`
}
