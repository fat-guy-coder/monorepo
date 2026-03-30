# Monorepo 项目

## 项目概述

这是一个综合性的 Monorepo 项目，包含多个前端和后端应用，使用 pnpm workspace 和 Turborepo 进行管理。

## 项目结构

```
monorepo/
├── apps/
│   ├── admin/              # 管理后台 (Vue 3 + Element Plus)
│   ├── front-learning/      # 前端学习网站 (Vue 3)
│   ├── main/               # 个人主页 (Vue 3)
│   └── fastify/            # 后端 API 服务 (Fastify + Prisma)
├── packages/               # 共享包
├── docker-compose.yml       # Docker 编排配置
├── turbo.json              # Turborepo 配置
└── pnpm-workspace.yaml     # pnpm 工作区配置
```

## 技术栈

### apps/admin - 管理后台
- **框架**: Vue 3 + TypeScript
- **UI**: Element Plus + Tailwind CSS
- **状态**: Pinia
- **构建**: Vite
- **端口**: 8848

### apps/front-learning - 前端学习网站
- **框架**: Vue 3 + TypeScript
- **样式**: Less
- **路由**: vue-router
- **状态**: Pinia
- **构建**: Vite

### apps/main - 个人主页
- **框架**: Vue 3 + TypeScript
- **路由**: vue-router
- **样式**: Tailwind CSS v4
- **动画**: GSAP
- **构建**: Vite

### apps/fastify - 后端 API
- **框架**: Fastify
- **ORM**: Prisma
- **数据库**: PostgreSQL
- **端口**: 3000

## Docker 部署

### 常用命令

```bash
# 启动所有服务（后端 API + PostgreSQL + 管理后台）
docker-compose up -d

# 启动后端 API + 数据库
docker-compose up -d fastify postgres

# 启动管理后台
docker-compose up -d admin

# 更新prisma schema
docker exec fastify npx prisma generate
docker exec fastify npx prisma migrate dev --name init
docker exec fastify npx prisma studio

# 更新prisma schema
docker exec fastify npx prisma generate
docker exec fastify npx prisma migrate dev --name init
docker exec fastify npx prisma studio

# 启动特定服务
docker-compose up -d fastify
docker-compose up -d postgres

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f fastify
docker-compose logs -f postgres

# 停止服务
docker-compose down

# 停止并删除数据卷（清空数据库）
docker-compose down -v

# 重启
docker-compose restart fastify
docker-compose restart postgres

# 重新构建镜像（代码修改后）
docker-compose build fastify
docker-compose up -d fastify
```

### 数据库迁移

```bash
# 运行迁移
docker exec fastify npx prisma migrate dev --name init

# 查看 Prisma Studio
docker exec -it fastify npx prisma studio
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

| 命令 | 说明 |
|------|------|
| `pnpm admin:dev` | 启动管理后台 (端口 8848) |
| `pnpm front-learning:dev` | 启动前端学习网站 |
| `pnpm main:dev` | 启动个人主页 |
| `pnpm fastify:dev` | 启动后端 API (Docker) |

### 构建

```bash
# 构建所有项目
pnpm all:build

# 构建单个项目
pnpm admin:build
pnpm front-learning:build
pnpm main:build
```

## 工作区依赖

项目使用 pnpm workspace，共享依赖统一放在根目录的 `package.json` 中：

- vue / vue-router
- tailwindcss / postcss / autoprefixer
- vite / typescript
- gsap (动画)
- turbo (构建)

子项目的 `package.json` 只保留项目特有的依赖。

## 开发规范

1. 使用 TypeScript 进行开发
2. 遵循项目的技术栈规范
3. 确保构建通过后再提交代码
4. 前端项目遵循赛博朋克/科技风设计规范
