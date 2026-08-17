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
	ID        string     `json:"id"`
	Name      string     `json:"name"`
	Label     string     `json:"label"`
	Path      string     `json:"path"`
	Icon      *string    `json:"icon,omitempty"` // 指针 + omitempty：nil 时不输出
	Order     int        `json:"order"`
	Project   string     `json:"project"`
	ParentID  *string    `json:"parentId,omitempty"` // nil = 顶级菜单
	Children  []*Menu    `json:"children,omitempty"`
	IsLeaf    bool       `json:"isLeaf"`
	CreatedAt time.Time  `json:"createdAt"`
	UpdatedAt time.Time  `json:"updatedAt"`
}

// 统一响应格式 — 与现有 Bun backend 保持一致 { code, message, data }
type Response struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
	Data    any    `json:"data"`
}
