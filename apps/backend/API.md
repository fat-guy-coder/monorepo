# 🚀 Backend API 接口文档

> 运行时: Bun | ORM: Drizzle | 数据库: PostgreSQL | 端口: 3000

## 基础信息

### 通用响应格式

```json
// 成功
{ "code": 200, "message": "success", "data": ... }

// 创建成功
{ "code": 200, "message": "创建成功", "data": ... }  // HTTP 201

// 失败
{ "code": 500, "message": "错误描述", "data": null }
```

### 认证方式

JWT Bearer Token（HMAC-SHA256），在请求头中携带：

```
Authorization: Bearer <accessToken>
```

- Access Token 有效期: 15 分钟
- Refresh Token 有效期: 90 天

---

## 一、菜单 API — `/api/menus`

### 数据库表结构 (`menu`)

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | uuid | 主键，自动生成 |
| `name` | varchar(255) | 菜单标识名（kebab-case，用于路由匹配） |
| `label` | varchar(255) | 菜单显示名（中文） |
| `path` | varchar(255) | 路径，自动生成（如 `/backend/git/git-internals`） |
| `icon` | varchar(255) | 图标（emoji，可选） |
| `order` | integer | 排序号 |
| `project` | varchar(255) | 所属项目（`learning` / `default` 等） |
| `parentId` | varchar(255) | 父菜单 ID（null 表示顶级） |
| `createdAt` | timestamp | 创建时间 |
| `updatedAt` | timestamp | 更新时间 |

### 1.1 查询菜单列表

```http
GET /api/menus?project=learning&root=true&flat=true&tree=true&search=关键词&parentId=xxx
```

所有查询参数可选：

| 参数 | 说明 | 示例 |
|------|------|------|
| `project` | 按项目过滤 | `?project=learning` |
| `root=true` | 只返回顶级菜单（parentId 为 null） | `?root=true` |
| `parentId` | 返回指定父菜单的直接子菜单 | `?parentId=xxx` |
| `flat=true` | 扁平化返回（去嵌套，配合 parentId 使用） | `?flat=true` |
| `tree=true` | 返回完整树形结构（**需要登录**） | `?tree=true` |
| `search` | 搜索关键词（匹配 label/name，需 `flat=true`） | `?flat=true&search=git` |

**响应 `data`**：菜单对象数组，每个菜单含 `id, name, label, path, icon, order, project, parentId`，非叶子节点含 `children` 数组。

`root=true` 或 `parentId` 模式下，每个菜单额外含 `isLeaf: boolean`。

### 1.2 搜索菜单（带父链）

```http
GET /api/menus/search?project=learning&search=git
```

返回匹配项及其完整祖先链，用于前端 Tree 组件展开到匹配位置。

**响应 `data`**：
```json
{
  "matched": [...],        // 匹配到的菜单树
  "openKeys": ["/a/b"],    // 需要展开的父节点 path
  "selectedKeys": ["/a/b/git-base"]  // 匹配项的 path
}
```

### 1.3 查询单个菜单

```http
GET /api/menus/:id
```

### 1.3.1 按 name 精确查询单个菜单

```http
GET /api/menus/by-name?name=cs-5-d-1-paging&project=learning
```

- `name` 必填（菜单 name，kebab-case）
- `project` 可选（默认不区分项目，传 `learning` 更精确）
- 精确匹配 `name` 字段，返回单个菜单对象（含 `id`/`path`/`parentId`/`order`）——方便 AI/脚本直接拿 name 换 id 后再操作
- 未找到返回 404

### 1.4 查询子菜单

```http
GET /api/menus/:id/children
```

返回直接子菜单列表，每个含 `isLeaf`。

### 1.5 查询完整子树

```http
GET /api/menus/:id/tree?project=learning
```

返回以 `:id` 为根的完整嵌套树（所有后代节点，递归嵌套）。

---

### 1.6 创建菜单

```http
POST /api/menus
Content-Type: application/json

{
  "name": "git-internals",        // 必填，kebab-case
  "label": "Git 底层实现",         // 必填，显示名
  "parentId": "父菜单UUID",        // 可选，null = 顶级菜单
  "icon": "🔧",                   // 可选
  "order": 5,                     // 可选，不传则放同级末尾
  "project": "learning"           // 可选，默认 "default"
}
```

- `name` 会在服务端自动拼成 `path`：父 path + "/" + name
- `order` 指定插入位置，已有同位置的菜单自动后移
- 响应 `data` 返回新菜单对象，含 `isLeaf: true`

### 1.7 批量创建菜单树

```http
POST /api/menus/batch
Content-Type: application/json

{
  "project": "learning",
  "parentId": "父菜单UUID",
  "items": [
    {
      "name": "git-internals",
      "label": "Git 底层实现",
      "icon": "🔧",
      "order": 1,
      "children": [
        { "name": "git-object-model", "label": "对象模型 (blob/tree/commit/tag)", "order": 1 },
        { "name": "git-refs", "label": "引用与 HEAD", "order": 2 },
        { "name": "git-index", "label": "暂存区与工作区", "order": 3 }
      ]
    }
  ]
}
```

- **幂等**：同名菜单已存在则跳过（status: `skipped`），可重复执行
- 递归创建整棵树，自动生成 path
- `order` 可选

**响应 `data`**：
```json
{
  "created": 4,
  "skipped": 0,
  "failed": 0,
  "details": [
    { "label": "Git 底层实现", "path": "/backend/git-internals", "status": "created" }
  ]
}
```

### 1.8 更新菜单

```http
PUT /api/menus/:id
Content-Type: application/json

{
  "name": "new-name",        // 可选，改 name 会自动更新 path
  "label": "新名称",          // 可选
  "icon": "📝",              // 可选，传 "" 清空
  "order": 3,                // 可选，同级中已存在则互换
  "project": "learning",     // 可选
  "parentId": "新父ID"       // 可选，移动节点 + 自动更新子孙 path
}
```

- 只传需要更新的字段即可
- 修改 `name` 或 `parentId` 会递归更新所有后代菜单的 path
- 修改 `order` 时若目标位置已有菜单，二者互换 order

### 1.9 删除菜单

```http
DELETE /api/menus/:id
```

**递归删除**该菜单及其所有后代。响应返回删除数量。

### 1.10 批量删除

```http
DELETE /api/menus/batch
Content-Type: application/json

// 方式一：清空某个父菜单下的所有子菜单（保留父节点自身）
{ "parentId": "父菜单UUID" }

// 方式二：按 ID 列表批量删除（每个 ID 连同其所有后代）
{ "ids": ["id1", "id2", "id3"] }
```

---

## 二、用户 API

### 2.1 注册

```http
POST /api/user/register
Content-Type: application/json

{ "username": "jason", "password": "123456" }
```

约束：用户名 ≥ 3 位，密码 ≥ 6 位。用户名不可重复。

### 2.2 登录

```http
POST /api/user/login
Content-Type: application/json

{ "username": "jason", "password": "123456" }
```

**响应 `data`**：
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ...",
  "user": { "id": "uuid", "username": "jason" }
}
```

### 2.3 刷新 Token

```http
POST /api/user/refresh
Content-Type: application/json

{ "refreshToken": "eyJ..." }
```

**响应 `data`**：`{ "accessToken": "...", "refreshToken": "..." }`

### 2.4 登出

```http
POST /api/user/logout
Authorization: Bearer <accessToken>
```

> 当前为无状态 JWT，登出由前端清除 token 即可。

### 2.5 获取当前用户信息

```http
GET /api/user/me
Authorization: Bearer <accessToken>
```

**响应 `data`**：
```json
{
  "id": "uuid",
  "username": "jason",
  "roles": [{ "id": "uuid", "name": "admin" }]
}
```

### 2.6 修改密码

```http
PUT /api/user/password
Authorization: Bearer <accessToken>
Content-Type: application/json

{ "currentPassword": "old", "newPassword": "new123" }
```

### 2.7 获取所有用户

```http
GET /api/users
Authorization: Bearer <accessToken>
```

返回用户列表，每个用户含 `id, username, createdAt, roles`。

### 2.8 更新用户

```http
PUT /api/users/:id
Authorization: Bearer <accessToken>
Content-Type: application/json

{ "username": "新用户名", "password": "新密码" }  // 均可选
```

### 2.9 删除用户

```http
DELETE /api/users/:id
Authorization: Bearer <accessToken>
```

同时删除该用户的角色关联。

### 2.10 获取用户角色

```http
GET /api/users/:id/roles
Authorization: Bearer <accessToken>
```

### 2.11 绑定角色

```http
POST /api/users/:id/roles
Authorization: Bearer <accessToken>
Content-Type: application/json

{ "roleId": "角色UUID" }
```

### 2.12 解绑角色

```http
DELETE /api/users/:id/roles/:roleId
Authorization: Bearer <accessToken>
```

---

## 三、角色 API — `/api/roles`

### 数据库表结构 (`role`)

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | uuid | 主键 |
| `name` | varchar(50) | 角色名（`admin` / `default` 等） |
| `description` | varchar(255) | 描述 |
| `menuIds` | text | JSON 数组，允许访问的菜单 ID 列表（`[]` = 全部） |
| `menuPaths` | text | JSON 数组，允许访问的 menu path 列表 |

### 3.1 获取所有角色

```http
GET /api/roles
```

### 3.2 获取单个角色

```http
GET /api/roles/:id
```

### 3.3 创建角色

```http
POST /api/roles
Content-Type: application/json

{
  "name": "editor",
  "description": "内容编辑者",
  "menuIds": ["id1", "id2"],    // 可选，默认 []
  "menuPaths": ["/a/b"]          // 可选，默认 []
}
```

### 3.4 更新角色

```http
PUT /api/roles/:id
Content-Type: application/json

{
  "name": "new-name",
  "description": "新描述",
  "menuIds": [...],
  "menuPaths": [...]
}
```

### 3.5 删除角色

```http
DELETE /api/roles/:id
```

不能删除 `admin` 角色。同时清理该角色的用户关联。

### 3.6 获取角色的用户

```http
GET /api/roles/:id/users
```

### 3.7 给角色添加用户

```http
POST /api/roles/:id/users
Content-Type: application/json

{ "userId": "用户UUID" }
```

### 3.8 移除角色的用户

```http
DELETE /api/roles/:id/users/:userId
```

---

## 四、批量导入菜单（API）

菜单数据以 PostgreSQL 为准，日常增改用 admin 后台（单条 `POST /api/menus`）。需要一次性批量建树时用 `POST /api/menus/batch`：

```bash
# 临时 JSON（用完即弃）
curl -X POST http://<host>:3000/api/menus/batch \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <token>' \
  --data-binary @menu-tree.json
```

body 格式：
```json
{
  "project": "learning",
  "parentId": "父菜单的UUID",
  "items": [
    {
      "name": "section-name",
      "label": "分类名称",
      "icon": "📁",
      "order": 1,
      "children": [
        { "name": "doc-name", "label": "文档标题", "order": 1 }
      ]
    }
  ]
}
```

> 接口幂等——同名子菜单已存在则 `skipped` 并递归其子节点，不会重复创建，可安全重试。

### 其他初始化脚本

```bash
bun run scripts/initRoles.ts     # 初始化 admin/default 角色
bun run scripts/initUserTable.ts # 初始化用户表
```

---

## 五、菜单权限机制

1. 用户通过 `user_role` 表关联到角色
2. 角色的 `menuIds` 字段决定该角色可见的菜单（`[]` 空数组 = 全部可见）
3. 查询菜单时自动根据当前用户角色过滤：
   - 已登录 → 按角色的 `menuIds` 过滤
   - 未登录 → 按 `default` 角色的 `menuIds` 过滤
4. `tree=true` 查询需要登录
