---
name: go-doc-style
description: GO 学习文档 .vue 文件的统一样式规范。当需要创建或编辑 GO 路线图下的学习文档时使用，确保所有文档风格一致。
metadata:
  version: "1.0"
  appliesTo: "apps/learning/src/views/backend/BackendLanguage/GO/**/*.vue, apps/learning/src/views/GameProduction/**/*.vue"
---

# Go 学习文档样式规范

所有 GO 学习路线图下的 .vue 文档遵循此规范，确保视觉风格统一。

## 技术选型

- **样式**: Tailwind CSS（优先用 class，避免 `<style scoped>`）
- **脚本**: `<script setup lang="ts">`
- **图标**: Emoji（无需额外依赖）
- **代码高亮**: 用 `<pre>` + Tailwind 背景色模拟

## 配色常量

| 用途 | Tailwind Class | 说明 |
|------|---------------|------|
| 页面背景 | `bg-gradient-to-br from-slate-50 to-blue-50` | 浅蓝灰渐变 |
| 主色调 | `text-cyan-600` / `bg-cyan-500` | Go 官方蓝绿色系 |
| 卡片背景 | `bg-white` + `shadow-md` | 圆角卡片 |
| 代码块背景 | `bg-slate-900 text-green-400` | 深色终端风格 |
| 提示框(信息) | `bg-blue-50 border-blue-400 text-blue-800` | 蓝色信息提示 |
| 提示框(警告) | `bg-amber-50 border-amber-400 text-amber-800` | 警告/注意事项 |
| 提示框(成功) | `bg-emerald-50 border-emerald-400 text-emerald-800` | 正面/最佳实践 |
| 提示框(类比) | `bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4` | 🔗 前端类比桥梁 |
| 标题文字 | `text-slate-800` / `text-slate-700` | 深灰色层级 |
| 正文文字 | `text-slate-600` | 可读性好的灰色 |

## 页面结构

每个 .vue 文件遵循固定布局：

```
┌──────────────────────────────────────┐
│  页面标题 (h1)          阶段导航 ←── 可选面包屑 │
│  副标题 (p)             简短描述              │
├──────────────────────────────────────┤
│                                       │
│  📦 知识点卡片 1                       │
│  ┌──────────────────────────────┐     │
│  │ 标题 + 说明文字               │     │
│  │ 代码示例 (深色终端风格)       │     │
│  │ 输出/说明                     │     │
│  └──────────────────────────────┘     │
│                                       │
│  💡 提示卡片 (info/warning/success)   │
│                                       │
│  📦 知识点卡片 2                       │
│  ...                                  │
├──────────────────────────────────────┤
│  ← 上一页  |  下一页 →    ── 底部导航  │
└──────────────────────────────────────┘
```

## 布局模板

```vue
<template>
  <div class="go-doc min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- 页面头部（不再 sticky，不占视口） -->
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📦 页面标题</h1>
          <p class="text-sm text-slate-500 mt-1">简短描述</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-X-Y-xxx.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段X</span>
        </div>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 知识点卡片（id 用于 Nav 锚点跳转） -->
      <section id="sec-N" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          标题
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">说明文字...</p>

        <!-- Go 代码块 — 使用共享 Code 组件 -->
        <div class="mb-4">
          <Code language="go" :code="codeExample" title="main.go" />
        </div>
      </section>

      <!-- 提示框 -->
      <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
        <p class="text-sm text-blue-800"><strong>💡 提示：</strong>提示内容...</p>
      </aside>

    </main>

    <!-- 底部导航 -->
    <footer class="max-w-4xl mx-auto px-6 py-8 flex justify-between text-sm">
      <a href="#" class="text-slate-500 hover:text-cyan-600">← 上一节</a>
      <a href="#" class="text-cyan-600 hover:text-cyan-700 font-medium">下一节 →</a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

// Nav 目录（id 对应 section 的 id 属性，name 为显示文字）
const navList = [
  { id: "sec-1", name: "概述" },
  { id: "sec-2", name: "知识点A" },
  { id: "sec-3", name: "常见错误" },
  { id: "sec-4", name: "小结" },
]

const codeExample = `package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}`
</script>
```

## 组件清单及 Tailwind 样式

### 1. 代码块 — 使用共享 Code 组件（首选）

优先使用 `packages/components` 的 `Code` 组件，自带语法高亮、复制按钮、主题适配。

**引入方式：**
```ts
import { Code } from 'components'
```

**Go 代码示例：**
```html
<Code language="go" :code="goCode" title="main.go" />
```

**终端/Shell 输出：**
```html
<Code language="bash" :code="shellOutput" title="📟 Terminal" />
```

**纯文本：**
```html
<Code language="text" :code="plainText" :hiddenToolbar="true" />
```

**Props：**
| Prop | 类型 | 默认 | 说明 |
|------|------|------|------|
| code | string | (必填) | 代码字符串 |
| language | 'go'\|'bash'\|'shell'\|'text'\|'js'\|'ts'\|'html'\|'json'\|'css' | 'js' | 语言 |
| title | string | — | 标题/文件名 |
| hiddenToolbar | boolean | false | 隐藏工具栏 |
| css | object | {} | 额外样式 |

**重要**: 代码字符串中有模板字面量 `${}` 时，用 `&#36;{}` 转义，或在 script 中用原始字符串定义。

### 2. 手动代码块（备选 — 仅 Code 组件不适用时）

用于内联代码说明或极短片段（终端输出推荐用 `Code language="bash"`）：

```html
<!-- 内联代码 -->
<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">go build</code>
```

### 3. 提示框

```html
<!-- 信息 -->
<aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
  <p class="text-sm text-blue-800"><strong>💡 提示：</strong>{{ tip }}</p>
</aside>

<!-- 警告 -->
<aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
  <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>{{ warning }}</p>
</aside>

<!-- 最佳实践 -->
<aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
  <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>{{ bestPractice }}</p>
</aside>

<!-- 前端类比（紫色）— 复杂概念必加 -->
<aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
  <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
  {{ Go 概念 }} 就像 {{ JS/前端概念 }}—— {{ 相似之处 }}。
  </p>
</aside>
```

### 4. 对比表格

```html
<div class="overflow-x-auto mb-4">
  <table class="w-full text-sm border-collapse">
    <thead>
      <tr class="bg-slate-100 text-left">
        <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
        <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方式A</th>
        <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方式B</th>
      </tr>
    </thead>
    <tbody class="text-slate-600">
      <tr><td class="px-4 py-2 border border-slate-200">...</td>...</tr>
    </tbody>
  </table>
</div>
```

### 5. 要点列表

```html
<ul class="space-y-2 text-slate-600 mb-4">
  <li class="flex items-start gap-2">
    <span class="text-cyan-500 mt-1">▸</span>
    <span>内容...</span>
  </li>
</ul>
```

### 6. 目录导航（Nav 组件）

每个文档添加 `Nav` 组件实现页面内章节跳转：

```html
<Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
```

**navList 格式：** 使用 `name` 字段（Nav 默认 keyMap 读 `name`）：
```ts
const navList = [
  { id: "sec-1", name: "概述" },
  { id: "sec-2", name: "知识点A" },
  { id: "sec-3", name: "常见错误" },
  { id: "sec-4", name: "小结" },
]
```

**section 需要 id：** `<section id="sec-1" class="...">`

### 7. 编辑器跳转（EditorLink 组件）

仅 admin 可见，通过 props 传 `isAdmin`（避免 provide/inject 链路问题）：

```html
<EditorLink file-path="apps/go/basics/go-X-Y-xxx.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
```

导入：`import { useUserStore } from '@/stores/userProfle'`

### 8. 页面跳转：goToByName 与 Link 组件

学习网站的所有页面跳转都使用集成导航——<strong>自动打开 tab、展开菜单、跳转路由</strong>。不要用 `<RouterLink>` 做页面跳转。

**goToByName(name)** — 通过菜单 name 跳转，App.vue 提供：

```ts
// App.vue 通过 provide 暴露
provide('goToByName', goToByName)

// 任何子组件通过 inject 获取
const goToByName = inject<Function>('goToByName')
goToByName('go-1-3-operators')  // 跳转到运算符页面
```

`name` 参数即菜单的 `name` 字段（也是 .vue 文件名不含后缀）。`goToByName` 会：
1. 在菜单树/tabList/routeInfoMap 中查找对应路径
2. 若路由未注册则动态注册
3. `router.push({ name })` 跳转
4. `store.activateTab()` 激活/新建标签
5. 展开父级菜单链

**Link 组件**（推荐）— 封装了 `goToByName`，直接用 `route` 传 name：

```html
<Link :route="item.name" :text="item.text" animation="none" size="small"
  class="p-0! text-sm! font-normal! text-gray-700! hover:text-cyan-600! bg-transparent! border-none! inline!" />
```

```ts
import { Link } from 'components'
```

**使用场景：**
- 路线图页面中的知识点跳转
- 任意需要在侧边栏展现完整导航路径的页面间跳转
- 不用 `<RouterLink to="...">`——那个只能跳路由，不会打开 tab/展开菜单

### 9. 步骤编号

```html
<ol class="space-y-4 mb-4">
  <li class="flex gap-3">
    <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
    <div class="text-slate-600">步骤说明...</div>
  </li>
</ol>
```

## 内容编写原则

1. **循序渐进**: 从简单概念开始，逐步深入
2. **代码优先**: 每个知识点配可运行代码示例
3. **输出展示**: 代码后面跟上预期输出（用注释或终端块）
4. **实用导向**: 解释"为什么需要这个"而不是只讲语法
5. **陷阱标注**: 使用 ⚠️ 警告框标注常见错误
6. **中文解释**: 概念用中文，代码关键字保留英文

### 复杂知识点深度要求

对于 Go 的核心/独特概念（defer、panic/recover、goroutine/channel、interface、reflect、Functional Options 等），<strong>不能只讲"是什么"</strong>，必须讲透：

**必须有：**
- **前端/JS 类比** — 用 `🔗 前端类比` 提示框（紫色），拿 JS/TS/React/Node 里的概念做桥梁。例如：defer ≈ finally 块 + useEffect cleanup；panic/recover ≈ throw + 全局 error middleware；goroutine ≈ 比 Promise 更轻量的并发单元
- **执行流程拆解** — 把运行时行为拆成步骤列表（1→2→3→4），让读者在脑子里能"跑"一遍
- **"为什么"而不是"只讲怎么用"** — 解释设计决策：Go 为什么没有 try-catch？为什么 recover 只能在 defer 里？为什么 LIFO 是合理的？
- **至少 2-3 个代码示例** — 从简单到复杂，最后一个贴近生产实战
- **反模式 + 经验法则** — 用 ⚠️ / ✅ 提示框总结什么时候用、什么时候不用

**前端类比模板：**
```html
<aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-5">
  <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
  {{ Go 概念 }} 就像 {{ JS/前端概念 }}—— {{ 相似之处的解释 }}。<br/>
  </p>
</aside>
```

**执行流程模板：**
```html
<ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
  <li>第一步：xxx</li>
  <li>第二步：xxx</li>
  <li>第三步：xxx</li>
</ol>
```

## GDScript / Godot 文档额外规范

Godot 学习文档同样使用本 skill 的布局和配色（将 `blue` 替代 `cyan` 作为主色调）。以下为 GDScript 特有规则：

### 代码风格：始终使用强类型（Static Typing）

所有 GDScript 代码示例 <strong>必须写类型注解</strong>。用户有 TypeScript 和 Python 经验，强类型代码对其更直观、更安全：

```gdscript
# ✅ 正确：带类型注解
var speed: float = 200.0
var player_name: String = "Godot"
func take_damage(amount: int) -> void:
    health -= amount

# ❌ 错误：无类型（文档中不使用）
var speed = 200.0
func take_damage(amount):
```

### 语法类比：TS + Python 双参照

每个新语法点需要同时标注 TypeScript 和 Python 的对应写法。用户两种语言都会，双重参照加深理解：

```html
<aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
  <p class="text-sm text-purple-800"><strong>🔗 语法类比：</strong><br/>
  <strong>TS:</strong> <code>function foo(x: number): void {"{"}</code><br/>
  <strong>Python:</strong> <code>def foo(x: int) -> None:</code><br/>
  <strong>GDScript:</strong> <code>func foo(x: int) -> void:</code><br/>
  关键差异：GDScript 没有 <code>:</code> 冒号在参数类型前（不同于 Python），返回值写在 <code>-></code> 后面。
  </p>
</aside>
```

### 编码习惯：前端开发者视角

- GDScript 的 `var foo: Array[int] = []` ≈ TS 的 `const foo: number[] = []`
- GDScript 的 `@export var speed: float` ≈ Vue 的 `defineProps<{ speed: number }>()`
- GDScript 的 `signal health_changed(new_health: int)` ≈ TS 的 `EventEmitter.emit('healthChanged', newHealth)`
- GDScript 的 `$Sprite2D` ≈ JS 的 `document.querySelector('#Sprite2D')` 或 Vue 的 `$refs`
- GDScript 的 `preload("res://x.tscn")` ≈ TS 的 `import X from './X.vue'`（编译时导入）

## 文件命名

- 文件名与菜单 `name` 字段一致: `go-1-1-env-tools.vue`
- 路径: `apps/learning/src/views/backend/BackendLanguage/GO/<阶段文件夹>/<文件名>.vue`

## 底部导航

每个文档末尾有上一节/下一节导航，链接到相邻文档：
```html
<nav class="flex justify-between items-center pt-4 border-t border-slate-200">
  <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-1-env-tools" class="...">← 上一节：标题</RouterLink>
  <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-3-operators" class="...">下一节：标题 →</RouterLink>
</nav>
```
