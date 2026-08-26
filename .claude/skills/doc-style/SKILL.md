---
name: doc-style
description: 所有学习文档 .vue 文件的统一样式规范（Go/Python/Godot/DSA 等）。当需要创建或编辑学习网站下的学习文档时使用，确保所有文档风格一致。
metadata:
  version: "2.0"
  appliesTo: "apps/learning/src/views/**/*.vue"
---

# 学习文档统一样式规范（doc-style）

所有学习网站下的 .vue 文档遵循此规范（Go、Python、Godot、DSA 等），确保视觉风格统一。

## 🤖 AI 批量填充策略（执行批量任务时必读）

> 当用户要求「一次填充多个文档」「继续填 XX 模块的文档」这类**批量任务**时，**不要串行一篇一篇写**——用 `Agent` 工具派生子代理并行处理，大幅提速。

### 何时用子代理

| 场景 | 做法 |
|------|------|
| 一个模块有 N 篇文档要填 | 每个子代理负责 1~2 篇，并行写 |
| 一个阶段有多个子主题 | 按子主题分组，每组一个子代理 |
| 文档内容相互独立（不同知识点） | 天然适合并行，无冲突 |

### 具体做法

1. **先摸清任务清单**：用 Glob 列出待填充的 .vue 文件，确认哪些是空壳（< 200 字节）
2. **拆分任务**：按文件/子主题分组，每组一个子代理
3. **派发子代理**：在同一轮里并行调用多个 `Agent` 工具（`subagent_type: "general-purpose"` 或 `"Explore"`），每个 agent 的 prompt 里必须：
   - 指定要写的**具体文件路径**
   - 附上本 skill 的**关键规范**（布局/配色/组件/navList/结构图/动画）
   - 说明该文档的知识点主题和深度要求
4. **并行等待**：子代理在后台运行，全部完成后汇总结果
5. **抽查校验**：对每篇文档做一次 `vue-tsc`/构建检查，确认无编译错误（尤其模板字面量闭合、变量重名）

### 子代理 prompt 模板

```
你是学习文档编写者。请填充这个 .vue 文档：
- 文件路径：<path>
- 知识点：<主题>
- 规范：遵循 doc-style skill（见 .claude/skills/doc-style/SKILL.md）
  - 布局：header + main(max-w-4xl space-y-6) + section 卡片
  - 配色：bg-gradient-to-br from-slate-50 to-blue-50，cyan 主色
  - 组件：import { Code, Nav } from 'components'
  - navList 用 { id, name }，section 加对应 id
  - 代码语言用 ts（DSA 文档）
- 要求：自给自足、至少 3 个代码示例、类比三件套（🔗 前端类比 + ⚙️ 后端类比·Go 必加，抽象概念加 🌍 现实类比）、常见错误、小结
- 完成后直接返回最终文件内容
```

### 注意

- **子代理之间不要互相依赖**——每篇文档独立成篇，避免共享状态
- **DSA 文档**若需要结构图（📐）和动画（🎬），在 prompt 里一并说明，或由主 agent 统一补
- 子代理写完后，主 agent 负责**统一检查**样式一致性（配色、间距、组件用法）

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
| 提示框(前端类比) | `bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4` | 🔗 前端类比桥梁（必加） |
| 提示框(后端类比·Go) | `bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4` | ⚙️ 后端类比桥梁（必加） |
| 提示框(现实类比) | `bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4` | 🌍 现实类比桥梁（抽象概念时加） |
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

**重要**: 代码字符串（放在反引号模板字面量里）中有 `${}` 时，用 `\${}`（反斜杠）转义。Code 组件通过文本插值 `{{ code }}` 渲染（无 v-html），HTML 实体 `&#36;{}` 会显示成字面文本、不生效，所以必须用 `\${}`。

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

<!-- 🔗 前端类比（紫色）— 每篇必加 -->
<aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
  <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
  {{ Go 概念 }} 就像 {{ JS/前端概念 }}—— {{ 相似之处 }}。
  </p>
</aside>

<!-- ⚙️ 后端类比·Go（青色）— 每篇必加：用 Go 生态的概念做桥梁，帮用户连回 Go 后端 -->
<aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
  <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong><br/>
  {{ 本页概念 }} 在 Go 里对应 {{ goroutine / channel / sync.Mutex / context / 网络 IO 等 }}—— {{ 对应关系与区别 }}。
  </p>
</aside>

<!-- 🌍 现实类比（橙色）— 概念特别抽象时加：拿日常生活/工程场景打比方 -->
<aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
  <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong><br/>
  {{ 本页概念 }} 就像 {{ 日常生活场景 }}—— {{ 相似之处 }}。
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

> **核心目标：文档即教程——用户不需要查外部资料就能完全掌握这个知识点。**
> 每篇文档写完后自问：一个新手只看这篇文档 + 运行代码，能不能理解这个概念？
> 如果不能，就是内容不够。继续加例子、加类比、加执行流程图、加常见错误。

1. **自给自足（最重要）**: 每篇文档覆盖一个知识点的<strong>全部核心内容</strong>——原理、语法、至少 3 个代码示例、常见错误、最佳实践、类比。让用户关掉搜索引擎，只在这个网站里学习。
2. **类比三件套（每篇必须）**：每篇文档必须同时包含 <strong>🔗 前端类比</strong>（JS/TS/React/Node）+ <strong>⚙️ 后端类比·Go</strong>（把知识点对回 Go 后端生态）；概念特别抽象时再补一个 <strong>🌍 现实类比</strong>（日常生活/工程场景）。三者分别用紫色 / 青色 / 橙色框（见「3. 提示框」），让用户从「前端经历 + Go 后端 + 生活直觉」三个角度理解同一个知识点。
3. **循序渐进**: 从简单概念开始，逐步深入
4. **代码优先**: 每个知识点配可运行代码示例（至少 2-3 个，从 hello-world 到生产级）
5. **输出展示**: 代码后面跟上预期输出（用注释或终端块）
6. **实用导向**: 解释"为什么需要这个"而不是只讲语法
7. **陷阱标注**: 使用 ⚠️ 警告框标注常见错误，每个概念至少列 2 个坑
8. **中文解释**: 概念用中文，代码关键字保留英文

### 复杂知识点深度要求

对于 Go 的核心/独特概念（defer、panic/recover、goroutine/channel、interface、reflect、Functional Options 等），<strong>不能只讲"是什么"</strong>，必须讲透。<strong>每篇文档目标行数 ≥ 200 行（含代码常量），</strong>包含以下全部内容：

**必须有：**
- **类比三件套** — 🔗 前端类比（紫色）+ ⚙️ 后端类比·Go（青色，拿 Go 生态对应：goroutine/channel/sync.Mutex/context/net/http/数据库等）每篇必加；概念特别抽象时再补 🌍 现实类比（橙色）。例如：defer ≈ finally 块（前端）≈ HTTP 中间件的收尾（后端·Go）；goroutine ≈ Promise（前端）≈ Go 自己的轻量线程（后端·Go）；channel ≈ EventEmitter（前端）≈ 消息队列 worker（后端·Go）
- **执行流程拆解** — 把运行时行为拆成步骤列表（1→2→3→4），让读者在脑子里能"跑"一遍
- **"为什么"而不是"只讲怎么用"** — 解释设计决策：Go 为什么没有 try-catch？为什么 recover 只能在 defer 里？为什么 LIFO 是合理的？
- **至少 2-3 个代码示例** — 从简单到复杂，最后一个贴近生产实战
- **反模式 + 经验法则** — 用 ⚠️ / ✅ 提示框总结什么时候用、什么时候不用

**类比三件套模板：**
```html
<!-- 🔗 前端类比（紫色） -->
<aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-5">
  <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
  {{ Go 概念 }} 就像 {{ JS/前端概念 }}—— {{ 相似之处的解释 }}。<br/>
  </p>
</aside>

<!-- ⚙️ 后端类比·Go（青色）— 每篇必加 -->
<aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-5">
  <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong><br/>
  {{ 本页概念 }} 在 Go 后端对应 {{ goroutine/channel/sync.Mutex/context/net/http/数据库 }}——{{ 对应关系 + 差别 }}。
  </p>
</aside>

<!-- 🌍 现实类比（橙色）— 概念抽象时加 -->
<aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-5">
  <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong><br/>
  {{ 本页概念 }} 就像 {{ 日常生活场景 }}——{{ 相似之处 }}。
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

## Blitz 项目关联规范（Godot 学习文档专属）

> **每个学习文档必须与 `apps/game/blitz/` 项目代码双向关联。**

### 文档 → 代码 (在 .vue 中)

1. 每个 .vue 文档的 header 区域必须包含 `<EditorLink>` 指向对应的 Blitz 源码文件
2. 必须有至少一个 "🕹️ 实战：Blitz" 章节，展示概念在真实游戏中的用法
3. 代码示例优先从 Blitz 源码中精简提取（保持可读性的前提下尽量真实）

```html
<header>
  <EditorLink file-path="apps/game/blitz/scripts/player.gd" label="📝 player.gd" :is-admin="userStore.isAdmin" />
</header>
```

### 代码 → 文档 (在 .gd 中)

1. 每个 .gd 脚本顶部必须有 `## 📚 涉及学习文档:` 块，列出关联的 godot-X-Y-name
2. 关键代码行上方用 `# → godot-X-Y-name: 说明` 格式标注对应的文档
3. 标注粒度：每个重要概念至少一处标注

```gdscript
## 📚 涉及学习文档:
##   godot-2-6-characterbody2d  — move_and_slide/velocity/重力
##   godot-6-6-platformer-physics — coyote time/jump buffer/可变跳跃高度
##   godot-7-8-state-machines      — enum State 四状态机

func _physics_process(delta: float) -> void:
    # → godot-6-6-platformer-physics: 着地时持续刷新 coyote time
    if is_on_floor():
        _coyote_timer = coyote_time

    # → godot-2-6-characterbody2d: CharacterBody2D 的核心方法
    move_and_slide()
```

### 文档编写优先级

1. **先写有 Blitz 代码对应的** — 文档里的代码示例直接从 Blitz 精简
2. **空壳优先填** — 扫描 `apps/learning/src/views/GameProduction/GotDot/` 下 < 200 字节的 .vue
3. **还没用到的概念可以延后** — 等 Blitz 里用到了再补文档

### 菜单命名规范

- Godot 阶段文档的 `name` 字段 = 文件名去掉 .vue 后缀
- 格式: `godot-{阶段}-{序号}-{英文名}`, 如 `godot-6-4-collision-layers`
- 菜单数据在 `apps/backend/config/` 下对应的 JSON 文件

## 文件命名

- 文件名与菜单 `name` 字段一致: `go-1-1-env-tools.vue`
- 路径: `apps/learning/src/views/backend/BackendLanguage/GO/<阶段文件夹>/<文件名>.vue`
- Godot 文档: `godot-{阶段}-{序号}-{英文名}.vue`
- 路径: `apps/learning/src/views/GameProduction/GotDot/<阶段文件夹>/<文件名>.vue`

## 底部导航

每个文档末尾有上一节/下一节导航，链接到相邻文档：
```html
<nav class="flex justify-between items-center pt-4 border-t border-slate-200">
  <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-1-env-tools" class="...">← 上一节：标题</RouterLink>
  <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-3-operators" class="...">下一节：标题 →</RouterLink>
</nav>
```

## 结构图 Section（DSA / 数据结构文档开头必须）

> 数据结构与算法文档（**仅 DSA 文档**，GO 等其他学习文档暂不要求）在**文档最前面**——header 之后、`<Nav>` 之后、第一个编号 section 之前——必须插入一个 `📐 结构总览` section，用**静态 SVG** 画一张结构图 + 关键操作示意图，让读者一眼看懂数据结构本体。

### 规范

1. **仅 DSA 文档需要**——`apps/learning/src/views/AlgorithmsAndDataStructures/**/*.vue`，其他文档（Go/Python 等）暂不要求
2. **用内联 `<svg>`**（不用 vue-konva，不用 v-html），`viewBox` + `w-full h-auto` 响应式
3. **结构图 + 操作示意图**——先一张图展示数据结构本体，再用 1~2 张小图（before/after）展示核心操作
4. **配色与动画一致**——沿用 cyan 主题（节点 `#06b6d4`、箭头灰 `#94a3b8`、哨兵虚线、新增绿、删除红）
5. **marker id 唯一**——同一页面多张 SVG 时加前缀区分

### section 结构

```html
<section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
  <h2>📐 结构总览：XXX</h2>
  <p>说明文字</p>
  <!-- 结构图 SVG -->
  <!-- 操作示意图 before/after -->
</section>
```

### 具体实现

完整模板、配色常量、SVG 写法规范见 [dsa-diagram skill](.claude/skills/dsa-diagram/SKILL.md)。

### navList 更新

```ts
const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  // ...原有条目...
]
```

## 动画演示 Section（DSA / 数据结构文档必须）

> 数据结构与算法文档如果适合通过动画帮助理解（数组操作、链表反转、栈的 push/pop、队列出入等），**必须在最后一个知识点 section 之后、小结 section 之前**插入一个 `🎬 动画演示` section。

### 规范

1. **使用 vue-konva**（已安装：`vue-konva ^3.4.0` + `konva ^10.3.0`）
2. **不创建共享组件**——动画代码直接写在当前 .vue 的 `<script setup>` 中
3. **按钮必须覆盖文档介绍的操作**——如果文档讲了链表反转，动画就要有「反转」按钮
4. **画布上必须展示动态信息**——链表长度、当前操作复杂度、指针状态等
5. **必须有按钮反馈样式**：`active:scale-95 transition-all duration-150`

### section 结构

```html
<section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
  <h2>🎬 动画演示：XXX操作</h2>
  <!-- 说明文字 + 动态信息标签 + 控制按钮 + Canvas -->
</section>
```

### 动态信息展示（必须）

Canvas 区域上方或内部展示：
- 📏 **数据规模**：length/size/capacity（随操作实时变化）
- ⏱️ **操作复杂度**：如 `Push  O(1)` / `Insert  O(n)`
- 🔍 **操作状态**：如「正在查找 42…」「在第 3 步比较」
- 🏷️ **特殊标注**：如指针位置（prev/curr/next）、容量边界

```html
<div class="flex items-center gap-3 mb-2 text-xs">
  <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ bars.length }}</span>
  <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
</div>
```

### 具体实现

完整动画模板、代码和规范见 [dsa-visualizer skill](.claude/skills/dsa-visualizer/SKILL.md)。

### navList 更新

```ts
const navList = [
  // ...原有条目...
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-N", name: "小结" },
]
```
