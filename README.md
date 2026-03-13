# Monorepo 项目

## 项目概述

这是一个综合性的 Monorepo 项目，包含多个前端和后端应用，使用 pnpm workspace 和 Turborepo 进行管理。

## 项目结构

```
monorepo/
├── apps/
│   ├── front-learning/    # 前端学习网站 (Vue 3)
│   ├── main/              # 个人主页 (Solid.js)
│   ├── go/                # Go 学习项目
│   │   ├── frontend/      # Go 学习网站前端 (Solid.js)
│   │   └── backend/       # Go 学习网站后端 (Gin)
│   └── cpp/               # C++ 学习项目
│       ├── frontend/      # C++ 学习网站前端 (Solid.js)
│       └── backend/       # C++ 学习网站后端 (Crow)
├── packages/              # 共享包
├── turbo.json             # Turborepo 配置
└── pnpm-workspace.yaml    # pnpm 工作区配置
```

## 技术栈概览

### apps/front-learning
- **框架**: Vue 3 + TypeScript
- **样式**: Less
- **路由**: vue-router
- **状态**: Pinia
- **构建**: Vite

### apps/main
- **框架**: Solid.js
- **路由**: @solidjs/router
- **样式**: Tailwind CSS v4
- **动画**: GSAP
- **构建**: Vite

### apps/go
- **描述**: Go 学习项目

#### apps/go/frontend
- **框架**: Solid.js
- **路由**: @solidjs/router
- **样式**: Tailwind CSS v4
- **构建**: Vite
- **端口**: 5174

#### apps/go/backend
- **框架**: Gin (Go)
- **端口**: 8080
- **API**: RESTful

### apps/cpp

#### apps/cpp/frontend
- **框架**: Solid.js
- **路由**: @solidjs/router
- **样式**: Tailwind CSS v4
- **构建**: Vite
- **端口**: 5175

#### apps/cpp/backend
- **框架**: Crow (C++)
- **端口**: 8081
- **API**: RESTful

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

| 命令 | 说明 |
|------|------|
| `pnpm front-learning:dev` | 启动前端学习网站 (Vue) |
| `pnpm main:dev` | 启动个人主页 |
| `pnpm go:dev` | 启动 Go 学习前端 |
| `pnpm go-server:dev` | 启动 Go 学习后端 |
| `pnpm cpp:dev` | 启动 C++ 学习前端 |
| `pnpm cpp-server:dev` | 启动 C++ 学习后端 (需 CMake 构建) |

### 构建

```bash
# 构建所有项目
pnpm all:build

# 构建单个项目
pnpm front-learning:build
pnpm main:build
pnpm go:build
pnpm cpp:build
```

## 工作区依赖

项目使用 pnpm workspace，共享依赖统一放在根目录的 `package.json` 中：

- solid-js / @solidjs/router (Solid.js 系列)
- tailwindcss / postcss / autoprefixer (CSS)
- vite / typescript / vite-plugin-solid (构建)
- gsap (动画，仅 main 项目使用)

子项目的 `package.json` 只保留项目特有的依赖（如 gsap）或必要的开发依赖。

## 开发规范

1. 使用 TypeScript 进行开发
2. 遵循项目的技术栈规范
3. 确保构建通过后再提交代码
4. 前端项目遵循赛博朋克/科技风设计规范
