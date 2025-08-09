# 前端学习项目

## 项目概述

这是一个综合性的前端学习项目，包含多个子应用和模块，旨在提供全面的前端技术学习资源。

## 项目结构

### apps/myvue - Vue.js 学习应用

- **框架**: Vue 3 + TypeScript + Less
- **功能**: 前端技术知识库，包含JavaScript、CSS、框架等学习内容
- **特色**: 模块化设计，响应式布局，现代化UI

### apps/svelte - Svelte 学习应用

- **框架**: Svelte + GASP + SVG + Canvas
- **功能**: 动画和图形处理学习
- **特色**: 高性能动画，交互式图形

### apps/express - 后端服务

- **框架**: Express + TypeScript
- **功能**: 提供API服务和数据支持

## 最近更新

### Set & Map 页面重构 (2025年)

- **文件位置**: `apps/myvue/src/views/CoreSkills/JavaScript/ES/SetMap.vue`
- **改进内容**:
  - 重新设计了完整的Set和Map介绍页面
  - 采用浅色主题，风格整齐紧凑
  - 详细介绍了概念、特点、API、优缺点、适用场景
  - 包含完整的代码示例和最佳实践
  - 响应式设计，支持移动端访问
  - 使用TypeScript + Less + Scoped + Setup语法

### Promise 实现场景页面 (2025年)

- **文件位置**: `apps/myvue/src/views/CoreSkills/JavaScript/ES/PromiseImplementationScenarios.vue`
- **改进内容**:
  - 重新设计了完整的Promise实现场景页面
  - 包含链式调用、并发控制、Scheduler实现、超时控制、async实现等场景
  - 采用浅色主题，风格整齐紧凑
  - 每个场景都有详细的代码实现和使用示例
  - 包含可交互的演示功能
  - 响应式设计，支持移动端访问

### 页面特性

- **概念定义**: 清晰解释Set和Map的基本概念
- **核心特点**: 突出展示每种数据结构的关键特性
- **API文档**: 完整的API方法表格，包含参数、返回值、示例
- **遍历方法**: 详细的遍历方式说明和代码示例
- **优缺点分析**: 客观分析每种数据结构的优缺点
- **适用场景**: 实际应用场景和代码示例
- **对比表格**: Set vs Map vs Object的详细对比
- **最佳实践**: 开发中的最佳实践建议

### Promise 场景特性

- **链式调用**: 完整的Promise链式调用实现
- **并发控制**: Promise并发控制器实现
- **Scheduler**: 任务调度器实现
- **超时控制**: Promise超时控制机制
- **async实现**: 使用Promise和Generator实现async/await
- **高级应用**: 重试机制、缓存机制、进度通知等

### 技术栈

- Vue 3 Composition API
- TypeScript
- Less CSS预处理器
- 响应式设计
- 现代化UI组件

### 通用 404 页面

- 文件位置: `apps/myvue/src/views/Other/notFound.vue`
- 特性:
  - 自适应布局，良好移动端体验
  - 使用全局 CSS 变量适配明/暗主题
  - 轻量 SVG 插画与细微动画（低功耗，避免重资源）
  - 提供“返回首页”和“返回上一页”操作
  - 无第三方依赖，零额外打包体积
- 路由集成:
  - 在 `apps/myvue/src/router/index.ts` 中配置了兜底路由：`/:pathMatch(.*)*` 指向 404 页面

## 开发指南

### 环境要求

- Node.js 16+
- pnpm (推荐包管理器)

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

## 贡献指南

欢迎提交Issue和Pull Request来改进项目。

## 许可证

MIT License
