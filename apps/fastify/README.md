# Fastify + PostgreSQL + Prisma（JavaScript 版）

基于 Fastify 的极简 REST API，使用 Prisma 连接 PostgreSQL。已集成 CORS、Helmet 与 Swagger UI（接口文档）。本项目为 JS 版本（不含 TypeScript）。

## 环境要求
- Node.js ≥ 18
- 可用的 PostgreSQL 数据库
- 包管理器（pnpm 或 npm）

## 目录结构
```
apps/fastify
├── package.json
├── prisma
│   └── schema.prisma
└── src
    ├── plugins
    │   └── prisma.js
    └── server.js
```

## 安装依赖
在 apps/fastify 目录下执行：

- 使用 pnpm（推荐）：
  - pnpm add fastify @fastify/cors @fastify/helmet @fastify/swagger @fastify/swagger-ui @prisma/client fastify-plugin
  - pnpm add -D prisma

- 使用 npm：
  - npm i fastify @fastify/cors @fastify/helmet @fastify/swagger @fastify/swagger-ui @prisma/client fastify-plugin
  - npm i -D prisma

## 环境变量
在 apps/fastify 下创建 .env 文件（按需修改用户名、密码、端口与库名）：
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fastifydb?schema=public"
PORT=3000
HOST=0.0.0.0
```

## Prisma 初始化与迁移
- 初始化（可选，用于生成默认目录与 .env）：
  - npm run prisma:init
- 生成 Prisma Client：
  - npm run prisma:generate
- 进行首次迁移（创建数据表）：
  - npm run prisma:migrate

Prisma 模型（prisma/schema.prisma）示例：
```
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 启动服务
- 开发/启动：
  - npm run dev
- 简单生产启动：
  - npm start

服务读取 .env 中的 HOST 与 PORT（默认 0.0.0.0:3000）。

## 接口与文档
- 健康检查：GET /health → { status: "ok" }
- 用户列表：GET /users
- 获取用户：GET /users/:id
- 新增用户：POST /users（JSON：{ "email": "xx@xx.com", "name": "张三" }）
- 删除用户：DELETE /users/:id
- Swagger 文档：GET /docs

## 说明
- 本项目使用 ESM（"type": "module"），请确保 Node 版本支持。
- 未包含 Prisma Studio（按你的要求移除）。如后续需要 GUI，可临时执行 `npx prisma studio` 使用（无需脚本）。
- 首次运行前请确保数据库已创建（例如创建名为 fastifydb 的数据库），并正确配置 DATABASE_URL。