---
name: go-doc-style
description: GO 学习文档 .vue 文件的统一样式规范。当需要创建或编辑 GO 路线图下的学习文档时使用，确保所有文档风格一致。
metadata:
  version: "1.0"
  appliesTo: "apps/learning/src/views/backend/BackendLanguage/GO/**/*.vue"
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
    <!-- 页面头部 -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📦 页面标题</h1>
          <p class="text-sm text-slate-500 mt-1">简短描述</p>
        </div>
        <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段X</span>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">

      <!-- 知识点卡片 -->
      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
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
import { Code } from 'components'
import { RouterLink } from 'vue-router'

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

### 6. 步骤编号

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
