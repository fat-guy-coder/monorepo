---
name: dsa-diagram
description: 数据结构/算法文档开头的静态 SVG 结构图与关键操作示意图规范。当需要给 DSA 学习文档添加结构图时使用，确保所有图风格统一。
metadata:
  version: "1.0"
  appliesTo: "apps/learning/src/views/AlgorithmsAndDataStructures/**/*.vue"
---

# DSA SVG 结构图规范

数据结构文档「开头结构图 + 结尾动画」两部分中的**开头静态图**规范。结尾动画见 [[dsa-visualizer]]。

## 核心原则

1. **内联 SVG**——直接 `<svg>` 写在 `<template>` 里，不用字符串 + `v-html`。这样支持响应式、hover 高亮、Tailwind。
2. **图放文档最前面**——header 之后、`<Nav>` 之后、第一个编号 section 之前，作为独立的「结构总览」卡片。
3. **结构图完整清晰 + 操作示意图**——结构图必须完整覆盖数据结构的全部关键要素（字段、指针、关系、哨兵、边界条件），让读者一眼看懂本质，不能只画个大概；再用 1~2 张小图展示核心操作的前后变化。
4. **配色与动画统一**——沿用 [[dsa-visualizer]] 的 cyan 主题色板，图里节点/箭头颜色和动画画布一致。

---

## 位置规范

```html
<main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
  <Nav :list="navList" ... />

  <!-- 📐 结构总览（新增，最前面） -->
  <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
    <h2>📐 结构总览</h2>
    <p class="说明">...</p>
    <svg>结构图</svg>
    <svg>操作示意图 1</svg>
    <svg>操作示意图 2</svg>
  </section>

  <section id="sec-1">...正文...</section>
</main>
```

`navList` 里在开头插入：`{ id: "sec-overview", name: "📐 结构总览" }`

---

## 配色常量

与 [[dsa-visualizer]] 一致（Tailwind 色值）：

| 用途 | 色值 | 说明 |
|------|------|------|
| 主节点填充 | `#06b6d4` | cyan-500，数据节点 |
| 主节点描边 | `#0891b2` | cyan-600，稍深 |
| 节点文字 | `#ffffff` 或 `#0f172a` | 深底白字 / 浅底深字 |
| 箭头/连线 | `#94a3b8` | slate-400 |
| 哨兵/虚拟节点 | `#e2e8f0` 填充 + `#94a3b8` 虚线描边 | 如 dummy / head / tail |
| 强调/当前操作 | `#f59e0b` | amber-500，高亮正在操作的节点 |
| 新增节点 | `#4ade80` | green-400，插入的新节点 |
| 删除节点 | `#ef4444` | red-500，被删节点 |
| 辅助文字 | `#64748b` | slate-500，小标注/图例 |

---

## 通用基础设施

### viewBox 与响应式

```html
<svg viewBox="0 0 720 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
  ...
</svg>
```

- `viewBox` 宽高固定（按图内容定），`class="w-full h-auto"` 让图随卡片宽度缩放。
- 坐标用整数，节点间距统一（如 110），方便心算对齐。

### 箭头 marker（在 `<defs>` 定义一次）

```html
<defs>
  <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
  </marker>
</defs>
```

- 用 `orient="auto-start-reverse"` + `marker-start`/`marker-end` 可同时画正反向箭头。
- 每个 `<svg>` 的 marker `id` 需全局唯一（多个图用 `arr1`/`arr2` 区分，避免冲突）。

### 节点与文字

```html
<rect x="60" y="90" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
<text x="88" y="110" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">19</text>
```

- 节点用 `<rect rx="6">`，文字用 `<text text-anchor="middle" dominant-baseline="central">` 居中。
- `font-family="monospace"` 对齐代码风格。

---

## 模板：结构图（以双向链表为例）

展示数据结构本体。双向链表要画出 **prev（下） + next（上）两条反向箭头** 和 **哨兵头尾节点**。

```html
<svg viewBox="0 0 720 230" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="ov-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
    </marker>
  </defs>

  <!-- 哨兵头尾 -->
  <rect x="40" y="80" width="52" height="60" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
  <text x="66" y="98" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">head</text>
  <text x="66" y="120" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">(哨兵)</text>

  <!-- 数据节点：prev 指针 ←（下），next 指针 →（上） -->
  <!-- 节点 1 -->
  <rect x="140" y="70" width="60" height="80" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
  <text x="170" y="96" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
  <text x="170" y="120" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ffffff">data</text>
  <text x="170" y="140" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">↑next ↓prev</text>
  ...
</svg>
```

**要点**：
- 节点内画 `data` + `prev` + `next` 三个字段（双向链表），单链表只画 `data` + `next`。
- 正反向箭头用 `<line>` + `marker-start`/`marker-end` 分上下两条。

---

## 模板：操作示意图（插入 / 删除）

用 **before → after** 左右两栏，或「操作前 → 操作后」上下两栏，展示指针变化。被改动/新增/删除的节点用强调色。

```html
<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
  <div>
    <p class="text-xs text-slate-500 font-semibold mb-1">插入前</p>
    <svg viewBox="0 0 340 140" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">...</svg>
  </div>
  <div>
    <p class="text-xs text-slate-500 font-semibold mb-1">插入后（4 指针改写）</p>
    <svg viewBox="0 0 340 140" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">...</svg>
  </div>
</div>
```

**要点**：
- 新增节点填 `#4ade80`，被删节点填 `#ef4444`，当前操作节点描边 `#f59e0b`。
- 每张操作图配一句 caption，说明改动了哪几个指针。

---

## 模板：树结构图（二叉树 / BST / 多叉树）

树模块（模块 4）最常见。节点用**圆**（`<circle>`，区别于链表的 rect），边用 `<line>` 连父子。布局：根在上，孩子在下，层序水平展开。

```html
<svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="tr-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
    </marker>
  </defs>

  <!-- 边：父圆下缘 → 子圆上缘（先画边，节点后画覆盖端点） -->
  <line x1="200" y1="94" x2="120" y2="166" stroke="#94a3b8" stroke-width="2" marker-end="url(#tr-arr)" />
  <line x1="200" y1="94" x2="280" y2="166" stroke="#94a3b8" stroke-width="2" marker-end="url(#tr-arr)" />
  <line x1="120" y1="166" x2="70" y2="214" stroke="#94a3b8" stroke-width="2" marker-end="url(#tr-arr)" />
  <line x1="120" y1="166" x2="170" y2="214" stroke="#94a3b8" stroke-width="2" marker-end="url(#tr-arr)" />

  <!-- 节点（圆 r=24，值居中） -->
  <circle cx="200" cy="70" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
  <text x="200" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>

  <circle cx="120" cy="142" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
  <text x="120" y="142" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>

  <circle cx="280" cy="142" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
  <text x="280" y="142" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">10</text>

  <!-- 空子节点（虚线圆 + null） -->
  <circle cx="70" cy="190" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
  <text x="70" y="190" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">null</text>
  <circle cx="170" cy="190" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
  <text x="170" y="190" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">null</text>
</svg>
```

**要点**：
- 节点 `<circle r="24">`，值 `<text text-anchor="middle" dominant-baseline="central">`，深底白字
- 边 `<line>` 从父圆下缘 `(cx, cy+24)` 到子圆上缘 `(cx, cy-24)`，带箭头 marker
- **强调**当前查找/遍历路径节点用 `#f59e0b` 描边加粗（`stroke-width="3"`）；新增 `#4ade80`；删除 `#ef4444`
- 空子节点用虚线圆 + "null"（BST 讲解插入位置时常用）
- **多叉树**（Trie / B 树）节点可换回 `<rect>`（能容纳多个 key），边同理
- 层序坐标心算：根居中 `x=360`，第 2 层两个节点 `x=220/500`，第 3 层 `x=120/320/400/600`… 间距按节点数均分

## 内容编写原则

1. **一张结构图说清本质**——读者只看结构图就能理解「这个结构长什么样、由什么组成、怎么工作」。结构图要画全所有关键要素（节点内部字段、指针方向、哨兵/边界、层级关系），不能只画个大概。
2. **操作图聚焦指针变化**——不要画完整结构，只画受影响的局部节点 + 被改动的指针（用强调色）。
3. **中文标注、英文/数字数据**——节点值用数字或变量名，说明文字用中文，与正文一致。
4. **图要有 caption**——每张图下配 `<p class="text-xs text-slate-400">` 一句说明。
5. **marker id 唯一**——同一页面多张 SVG 时，每个 `<defs>` 里的 marker id 加前缀区分（如 `ov-`、`ins-`、`del-`）。

---

## 参考实现

- `dsa-2-2-2-doubly.vue` — 双向链表结构图 + 插入/删除操作示意图（完整模板）
- 配色/动画画布一致性见 [[dsa-visualizer]]
