// service 包 — 树的纯函数工具（构建 / 扁平 / 叶子标记 / 排序）
//
// 对照学习：
//   go-1-9-maps（map 索引 O(n) 建树，避免 N² 查找）
//   go-1-5-slices-funcs（切片 append / 递归闭包）
//   go-4-3-crud-basics（查询到数据后在内存里做树形处理）
// 这些函数不碰数据库，只操作 model.Menu，方便单测
package service

import (
	"sort"

	"github.com/monorepo/go/backend/internal/model"
)

// markIsLeaf 递归标记每个节点的 isLeaf（有子节点 = false，否则 true）
// 步骤：① 看 children 长度 → ② 有子则递归下沉 → ③ 无子标记叶子
func markIsLeaf(list []*model.Menu) {
	for _, m := range list {
		if len(m.Children) > 0 {
			m.IsLeaf = false
			markIsLeaf(m.Children)
		} else {
			m.IsLeaf = true
		}
	}
}

// flatten 树形 → 扁平列表（前序遍历，Bun 的 flatten 等价）
// 用途：GET /api/menus?flat=true 时把嵌套树摊平成路由可遍历的数组
func flatten(list []*model.Menu) []*model.Menu {
	out := make([]*model.Menu, 0, len(list))
	var walk func(items []*model.Menu)
	walk = func(items []*model.Menu) {
		for _, m := range items {
			out = append(out, m)
			if len(m.Children) > 0 {
				walk(m.Children)
			}
		}
	}
	walk(list)
	return out
}

// sortMenuByOrder 按 order 升序排序（Bun 端也是 order 排序）
func sortMenuByOrder(items []*model.Menu) {
	sort.Slice(items, func(i, j int) bool { return items[i].Order < items[j].Order })
}
