# Admin 管理后台

基于 [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin) 精简版的中后台管理系统。

## 技术栈

- **Vue3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **TypeScript** - JavaScript 超集
- **Element Plus** - 基于 Vue 3 的组件库
- **Pinia** - Vue 状态管理
- **Tailwind CSS** - 功能优先的 CSS 框架

## 功能模块

- 菜单管理（CRUD）
- 系统管理（扩展中）

## 项目结构

```
monorepo/
├── apps/
│   ├── admin/           # 管理后台（本项目）
│   ├── front-learning/  # 前端学习网站
│   └── fastify/         # 后端 API 服务
├── packages/            # 共享包
└── pnpm-workspace.yaml  # pnpm 工作区配置
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
# 根目录运行
pnpm admin:dev

# 或直接运行
cd apps/admin
pnpm dev
```

### 项目构建

```bash
pnpm admin:build
```

## 环境变量

在 `.env.development` 或 `.env.production` 中配置：

```env
VITE_PORT=8848
VITE_API_BASE=http://localhost:3000
VITE_ROUTER_HISTORY=hash
```

## API 接口

依赖于 Fastify 后端服务，请确保以下服务正在运行：

```bash
docker-compose up -d fastify postgres
```

### 菜单管理接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/menus` | GET | 获取菜单列表 |
| `/api/menus/:id` | GET | 获取单个菜单 |
| `/api/menus` | POST | 创建菜单 |
| `/api/menus/:id` | PUT | 更新菜单 |
| `/api/menus/:id` | DELETE | 删除菜单 |

## 文档

- [vue-pure-admin 文档](https://pure-admin.cn/)
- [@pureadmin/utils 工具库文档](https://pure-admin-utils.netlify.app)

## 许可证

基于 [MIT](./LICENSE) 协议开源
