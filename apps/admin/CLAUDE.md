# Admin 管理后台项目文档

基于 vue-pure-admin 精简版的中后台管理系统。

## 技术栈

| 分类 | 技术 | 版本 |
|------|------|------|
| 框架 | Vue3 | ^3.5.x |
| 构建 | Vite | ^7.x |
| 语言 | TypeScript | ^5.x |
| UI 库 | Element Plus | ^2.11.x |
| 样式 | Tailwind CSS | ^4.x |
| 状态 | Pinia | ^3.x |
| 路由 | Vue Router | ^4.x |
| HTTP | Axios (封装) | ^1.x |

## 目录结构

```
src/
├── api/           # API 接口封装
│   └── menu/     # 菜单管理 API
├── assets/       # 静态资源
├── components/   # 公共组件
├── layout/       # 布局组件
├── router/       # 路由配置
│   └── modules/  # 路由模块
├── store/        # Pinia 状态管理
├── utils/       # 工具函数
│   └── http/    # Axios 封装
├── views/       # 页面组件
│   ├── system/  # 系统管理
│   └── ...      # 其他模块
├── App.vue
└── main.ts
```

## 核心组件

### Layout (`src/layout/`)
- `index.vue` - 主布局容器
- `components/` - 布局子组件（侧边栏、顶栏等）

### 公共组件 (`src/components/`)

## 工具函数 (`src/utils/`)

| 工具 | 说明 |
|------|------|
| `http/` | Axios 封装，提供 `http.request/get/post/put/delete` 方法 |
| `auth.ts` | 认证相关（token 管理） |
| `tree.ts` | 树形结构处理 |
| `progress.ts` | 进度条控制 |

### HTTP 封装使用

```ts
import { http } from "@/utils/http";

// GET 请求
http.request<T>("get", "/api/users", { params: { id: 1 } })

// POST 请求
http.post<T, P>("/api/users", { data: { name: "test" } })

// 响应格式
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
```

## 路由配置

路由文件在 `src/router/modules/` 目录下，自动加载。

```ts
// 示例路由模块
export default {
  path: "/system",
  name: "System",
  component: Layout,
  meta: { title: "系统管理", icon: "ep Setting", rank: 99 },
  children: [
    {
      path: "/system/menu",
      name: "SystemMenu",
      component: () => import("@/views/system/menu/index.vue"),
      meta: { title: "菜单管理" }
    }
  ]
}
```

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `VITE_PORT` | 开发端口 | 8848 |
| `VITE_API_BASE` | API 基础地址 | http://localhost:3000 |
| `VITE_ROUTER_HISTORY` | 路由模式 | hash |

## API 接口（Fastify 后端）

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/menus` | GET | 获取菜单列表 |
| `/api/menus/:id` | GET | 获取单个菜单 |
| `/api/menus` | POST | 创建菜单 |
| `/api/menus/:id` | PUT | 更新菜单 |
| `/api/menus/:id` | DELETE | 删除菜单 |

### 响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

## 常用命令

```bash
pnpm admin:dev      # 开发模式
pnpm admin:build    # 生产构建
pnpm admin:preview  # 预览构建结果
```
