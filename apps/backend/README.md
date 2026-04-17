# backend + PostgreSQL + Prisma（JavaScript 版）

基于 backend 的极简 REST API，使用 Prisma 连接 PostgreSQL。已集成 CORS、Helmet 与 Swagger UI（接口文档）。本项目为 JS 版本（不含 TypeScript）。

## 技术栈

- **backend** - 高性能 Web 框架
- **Prisma** - ORM
- **PostgreSQL** - 数据库
- **Docker** - 容器化部署

## Docker 部署

### 常用命令

```bash
# 启动所有服务（backend + PostgreSQL）
docker-compose up -d

# 启动 backend（需要 PostgreSQL 已运行）
docker-compose up -d backend

# 启动 PostgreSQL
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

# 重新构建镜像（代码修改后）
docker-compose build backend
docker-compose up -d backend
```

### 数据库迁移

```bash
# 运行迁移（创建/更新数据表）
docker exec backend npx prisma migrate dev --name init

# 生产环境迁移
docker exec backend npx prisma migrate deploy
```

### 环境变量

在 docker-compose.yml 中配置：

```yaml
environment:
  DATABASE_URL: "postgresql://jason:123456@postgres:5432/jason"
  PORT: 3000
  HOST: "0.0.0.0"
```

## 本地开发

### 环境要求

- Node.js ≥ 18
- 可用的 PostgreSQL 数据库
- 包管理器（pnpm 或 npm）

### 安装依赖

```bash
pnpm install
```

### 环境变量

在 apps/backend 下创建 .env 文件：

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/backenddb?schema=public"
PORT=3000
HOST=0.0.0.0
```

### Prisma 命令

```bash
# 生成 Prisma Client
pnpm prisma:generate

# 进行数据库迁移
pnpm prisma:migrate
```

### 启动服务

```bash
# Docker 方式（推荐）
docker-compose up -d backend

# 本地开发
pnpm dev
# 或
npm run dev
```

## 接口列表

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/menus` | GET | 获取菜单列表（支持 `project`、`parentId`、`flat` 参数） |
| `/api/menus/:id` | GET | 获取单个菜单 |
| `/api/menus` | POST | 创建菜单 |
| `/api/menus/:id` | PUT | 更新菜单 |
| `/api/menus/:id` | DELETE | 删除菜单 |
| `/docs` | GET | Swagger API 文档 |

### 响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

## 说明

- 本项目使用 ESM（"type": "module"），请确保 Node 版本支持。
- 未包含 Prisma Studio。如后续需要 GUI，可临时执行 `npx prisma studio` 使用。
