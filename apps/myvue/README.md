# MyVue 前端学习项目

## 项目简介

这是一个基于 Vue 3 + TypeScript 的前端学习项目，专注于 JavaScript 核心技能、算法数据结构、前端框架等知识点的学习和展示。

## 统一样式系统

项目采用统一的浅色主题样式系统，确保所有页面组件风格一致、整齐紧凑，并完美适配移动端和小屏幕设备。

### 样式文件结构

```bash
src/assets/css/
└── unified-styles.css    # 统一样式系统
```

### 主要特性

#### 🎨 设计系统

- **浅色主题**：清爽现代的视觉风格
- **CSS 变量**：统一的设计令牌系统
- **响应式设计**：完美适配各种屏幕尺寸
- **组件化样式**：可复用的样式组件

#### 📱 移动端优化

- **断点系统**：640px、768px、1024px 响应式断点
- **触摸友好**：适合移动设备的交互设计
- **性能优化**：轻量级样式，快速加载

#### 🧩 组件样式

##### 页面容器

```html
<div class="page-container">
  <div class="content-wrapper">
    <!-- 页面内容 -->
  </div>
</div>
```

##### 页面头部

```html
<header class="page-header">
  <h1 class="page-title">
    页面标题
    <span class="page-badge">标签</span>
  </h1>
  <p class="page-subtitle">页面描述</p>
</header>
```

##### 卡片组件

```html
<div class="card">
  <div class="card-header">
    <h2 class="card-title">
      <span class="card-icon">📚</span>
      卡片标题
    </h2>
  </div>
  <div class="card-body">
    <!-- 卡片内容 -->
  </div>
</div>
```

##### 网格布局

```html
<div class="grid grid-2">
  <!-- grid-1, grid-2, grid-3, grid-4 -->
  <div>内容1</div>
  <div>内容2</div>
</div>
```

##### 代码块

```html
<div class="code-block">
  <pre><code>// 代码内容</code></pre>
</div>
```

##### 表格

```html
<div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th>列1</th>
        <th>列2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>数据1</td>
        <td>数据2</td>
      </tr>
    </tbody>
  </table>
</div>
```

#### 🎯 工具类

##### 间距类

- `mt-0`, `mt-sm`, `mt-md`, `mt-lg`, `mt-xl` - 上边距
- `mb-0`, `mb-sm`, `mb-md`, `mb-lg`, `mb-xl` - 下边距
- `p-0`, `p-sm`, `p-md`, `p-lg`, `p-xl` - 内边距

##### 文本类

- `text-center`, `text-left`, `text-right` - 文本对齐
- `text-primary`, `text-secondary`, `text-muted` - 文本颜色
- `text-success`, `text-warning`, `text-error` - 状态颜色

##### 背景类

- `bg-primary`, `bg-secondary`, `bg-tertiary` - 背景颜色

##### 圆角类

- `rounded`, `rounded-lg`, `rounded-xl` - 圆角大小

##### 阴影类

- `shadow`, `shadow-md`, `shadow-lg` - 阴影效果

### 使用方法

#### 1. 引入统一样式

在组件的 `<script>` 标签中引入：

```js
import '@/assets/css/unified-styles.css'
```

#### 2. 使用组件样式

```vue
<template>
  <div class="page-container">
    <div class="content-wrapper">
      <header class="page-header">
        <h1 class="page-title">页面标题</h1>
        <p class="page-subtitle">页面描述</p>
      </header>

      <div class="card mb-xl">
        <div class="card-header">
          <h2 class="card-title">
            <span class="card-icon">📚</span>
            卡片标题
          </h2>
        </div>
        <div class="card-body">
          <div class="grid grid-2">
            <div class="syntax-card">
              <h3 class="text-lg font-semibold mb-md">标题</h3>
              <div class="code-block">
                <pre><code>代码内容</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 组件特定样式 */
.syntax-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-light);
}
</style>
```

### CSS 变量系统

#### 颜色变量

```css
:root {
  --primary-color: #3b82f6; /* 主色调 */
  --success-color: #10b981; /* 成功色 */
  --warning-color: #f59e0b; /* 警告色 */
  --error-color: #ef4444; /* 错误色 */

  --text-primary: #1f2937; /* 主要文本 */
  --text-secondary: #6b7280; /* 次要文本 */
  --text-muted: #9ca3af; /* 静默文本 */

  --bg-primary: #ffffff; /* 主背景 */
  --bg-secondary: #f9fafb; /* 次要背景 */
  --bg-tertiary: #f3f4f6; /* 第三级背景 */
}
```

#### 间距变量

```css
:root {
  --spacing-xs: 0.25rem; /* 4px */
  --spacing-sm: 0.5rem; /* 8px */
  --spacing-md: 1rem; /* 16px */
  --spacing-lg: 1.5rem; /* 24px */
  --spacing-xl: 2rem; /* 32px */
  --spacing-2xl: 3rem; /* 48px */
}
```

#### 字体变量

```css
:root {
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;

  --text-xs: 0.75rem; /* 12px */
  --text-sm: 0.875rem; /* 14px */
  --text-base: 1rem; /* 16px */
  --text-lg: 1.125rem; /* 18px */
  --text-xl: 1.25rem; /* 20px */
  --text-2xl: 1.5rem; /* 24px */
  --text-3xl: 1.875rem; /* 30px */
  --text-4xl: 2.25rem; /* 36px */
}
```

### 响应式设计

#### 断点系统

- **640px 以下**：移动设备
- **640px - 768px**：平板设备
- **768px - 1024px**：小屏桌面
- **1024px 以上**：大屏桌面

#### 响应式工具类

```css
.sm\:hidden {
  display: none;
} /* 640px以下隐藏 */
.md\:block {
  display: block;
} /* 768px以下显示块级 */
.lg\:flex {
  display: flex;
} /* 1024px以下显示弹性布局 */
```

### 最佳实践

1. **优先使用统一样式**：尽量使用预定义的样式类
2. **组件特定样式**：只在必要时添加组件特定的样式
3. **响应式优先**：从移动端开始设计，逐步增强
4. **语义化命名**：使用有意义的类名和变量名
5. **性能优化**：避免过度嵌套和复杂选择器

### 更新日志

#### v1.0.0 (2024-01-01)

- 创建统一样式系统
- 实现浅色主题设计
- 添加响应式布局支持
- 完善组件样式库

---

## 项目结构

```bash
myvue/
├── src/
│   ├── assets/
│   │   └── css/
│   │       └── unified-styles.css    # 统一样式系统
│   ├── components/                   # 通用组件
│   ├── views/                        # 页面组件
│   │   └── CoreSkills/
│   │       └── JavaScript/
│   │           └── ES+1/             # ES+ 特性页面
│   └── router/                       # 路由配置
├── README.md                         # 项目说明
└── package.json                      # 项目配置
```

## 开发指南

### 环境要求

- Node.js >= 16
- npm >= 8

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License
