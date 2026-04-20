# Monorepo 项目

## 项目概述

这是一个综合性的 Monorepo 项目，包含多个前端和后端应用，使用 pnpm workspace 和 Turborepo 进行管理。

## 项目结构

```
monorepo/
├── apps/
│   ├── admin/              # 管理后台 (Vue 3 + Element Plus)
│   ├── learning/            # 学习网站 (Vue 3)
│   ├── main/               # 个人主页 (Vue 3)
│   └── backend/            # 后端 API 服务 (Bun + Drizzle)
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

### apps/learning - 学习网站
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

### apps/backend - 后端 API
- **框架**: Bun (原生 HTTP)
- **ORM**: Drizzle ORM
- **数据库**: PostgreSQL
- **端口**: 3000

## Docker 部署

### 常用命令

```bash
# 启动所有服务（后端 API + PostgreSQL + 管理后台）
docker-compose up -d

# 启动后端 API + 数据库
docker-compose up -d backend postgres

# 启动管理后台
docker-compose up -d admin

# 更新 drizzle schema
docker exec backend bun run db:push

# 启动特定服务
docker-compose up -d backend
docker-compose up -d postgres

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f backend
docker-compose logs -f postgres

# 停止服务
docker-compose down

# 停止并删除数据卷（清空数据库）
docker-compose down -v

# 重启
docker-compose restart backend
docker-compose restart postgres

# 重新构建镜像（代码修改后）
docker-compose build backend
docker-compose up -d backend
```

### 数据库迁移

```bash
# 推送 schema 到数据库
docker exec backend bun run db:push

# 生成迁移文件
docker exec backend bun run db:generate
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
| `pnpm learning:dev` | 启动学习网站 |
| `pnpm main:dev` | 启动个人主页 |
| `pnpm backend:dev` | 启动后端 API (Docker) |

### 构建

```bash
# 构建所有项目
pnpm all:build

# 构建单个项目
pnpm admin:build
pnpm learning:build
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

## 本地 PostgreSQL 同步到服务器（Docker -> Docker）

> 适用于：本地数据库容器名为 `postgres`，服务器数据库容器名也为 `postgres`。

### 1）本地导出（在本机执行）

```bash
# 从本地 postgres 容器导出 jason 库到容器内临时文件
docker exec postgres pg_dump -U jason -d jason -Fc -f /tmp/jason.dump

# 拷贝到本机当前目录
docker cp postgres:/tmp/jason.dump ./jason.dump
```

### 2）上传到服务器（在本机执行）

```bash
# 默认 22 端口
scp ./jason.dump root@47.108.233.237:/tmp/jason.dump

# 如果是自定义端口（示例 2222）
# scp -P 2222 ./jason.dump root@47.108.233.237:/tmp/jason.dump
```

### 3）导入服务器数据库（在服务器执行）

```bash
# 拷贝到服务器 postgres 容器
docker cp /tmp/jason.dump postgres:/tmp/jason.dump

# 导入（会清理同名对象再重建）
docker exec postgres pg_restore -U jason -d jason --clean --if-exists --no-owner --no-privileges /tmp/jason.dump
```

### 4）验证

```bash
# 查看表
docker exec postgres psql -U jason -d jason -c "\dt"

# 查看后端日志（可选）
docker logs --tail=100 backend-app
```

### 5）导入后重启后端（建议）

```bash
docker restart backend-app
```

## 是否要把“数据同步”放进流水线？

- **建议默认手动同步**：数据库是有状态资源，自动覆盖风险高（误覆盖线上数据、无法回滚）。
- **推荐流程**：代码走 CI/CD，数据走“手动可控脚本（本文命令）”。
- **仅在明确需要时自动化**：可单独做一个 `workflow_dispatch` 的“手动触发数据同步”工作流，并加二次确认参数。

## 开发规范

1. 使用 TypeScript 进行开发
2. 遵循项目的技术栈规范
3. 确保构建通过后再提交代码
4. 前端项目遵循赛博朋克/科技风设计规范
