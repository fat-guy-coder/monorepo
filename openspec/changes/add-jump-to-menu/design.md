## Context

当前 RouteTab 右键菜单（id="context-menu"）是硬编码在 `packages/components/src/components/Tab/RouteTab.vue` 中的三个固定项（关闭左侧/关闭右侧/关闭其他）。没有任何插槽或 prop 机制允许调用方注入自定义菜单项。

同时，前端没有判断当前用户是否为 admin 的能力——JWT token 中不含角色信息，`/api/user/me` 仅返回 `{ id, username }`。

菜单管理页面（System/menu.vue）的 Tree 组件通过 `defaultExpandedKeys` 控制展开，但只从页面内部状态管理，不支持外部传入初始展开键。

## Goals / Non-Goals

**Goals:**
- RouteTab 右键菜单支持调用方注入自定义项，同时保持默认三项不变
- App.vue 中根据 admin 角色控制"跳转菜单"项的显隐
- 点击"跳转菜单"后跳转到 System/menu.vue，自动加载并展开目标菜单所在层级
- 后端 `/api/user/me` 返回用户角色信息，供前端做权限判断

**Non-Goals:**
- 不改造后端的完整 RBAC 权限中间件
- 不让 RouteTab 右键菜单支持任意位置的 slot 插入（只加最小化扩展点）
- 不修改 Tree 组件本身的 API（仅使用现有 `expand` 方法）

## Decisions

### Decision 1: RouteTab 扩展方式 — 使用插槽而非 prop

**选择**: 在 RouteTab context-menu div 中新增 `<slot name="contextMenuItems">`，App.vue 通过插槽传入"跳转菜单"项。

**备选**: 用 prop `extraMenuItems` 传递数组。
**理由**: 插槽比 prop 更灵活，调用方完全控制渲染内容（样式、图标、条件显隐），且 Vue 风格一致。prop 方式会限制自定义能力。

### Decision 2: Admin 判断 — 扩展 `/api/user/me` 返回角色

**选择**: 后端 `/api/user/me` 返回 `{ id, username, roles: [{ name: "admin" }] }`。前端 `onMounted` 时调用 `getApiUserMe()` 存入 ref，App.vue 提供 `isAdmin`。

**备选**: 前端单独调 `/api/users/:id/roles`。
**理由**: 一次请求拿到用户 + 角色，减少 API 调用次数。`/api/user/me` 本就设计为"当前用户信息"端点。

### Decision 3: menu.vue 预展开 — 使用 query 参数 `expandPath`

**选择**: System/menu.vue 读取 `route.query.expandPath`，在 Tree 数据加载完成后，通过搜索 API 找到目标路径的父级链，展开所有父节点，然后定位到目标。

**实现方式**:
1. menu.vue 读取 `expandPath` query 参数
2. 调用 `getApiMenusSearch` 搜索目标 path，获取 `openKeys`（父级链）和 `selectedKeys`
3. 设置 `defaultExpandedKeys = openKeys`，让 Tree 展开所有父级
4. 用 `scrollIntoView` 滚动到目标节点

**备选**: 用 hash fragment 传递。
**理由**: query 参数更规范，且 Vue Router 对 query 有原生支持。

### Decision 4: 传递目标路径到 menu.vue

**选择**: 当前激活 tab 的 path 就是菜单项 path（如 `/front/CoreSkills/JavaScript`），App.vue 中的 `gotoMenuManagement` 函数获取 `activeKey.value`（即当前 tab 的 path），用 `router.push({ name: 'menu', query: { expandPath: activeKey.value } })` 跳转。

**前提**: System/menu.vue 路由需要注册 name 为 `'menu'`。检查路由注册逻辑——如果该页面的路由 name 不是 `'menu'`，需要用 goToByName 或直接 push path。

## Risks / Trade-offs

- **[Risk] Tree 懒加载与预展开冲突**：目标菜单的父节点可能尚未加载子菜单，导致展开时看不到目标项。→ **Mitigation**: 在 menu.vue 中先调用 flat API 获取全量菜单，追溯父链后逐层 `loadNodeChildren`，再展开。
- **[Risk] `/api/user/me` 向后兼容**：加入 roles 字段后，旧版前端如果不处理 roles 不会报错（只是不用）。→ **Mitigation**: 新增字段不影响现有字段结构，完全向后兼容。
- **[Risk] 后端部署时序**：前端代码部署后，`isAdmin` 依赖 `/api/user/me` 返回 `roles` 字段。如果前端先于后端上线，`isAdmin` 始终为 `false`，"跳转菜单"不出现但无报错。→ **Mitigation**: 确保后端先部署，或同时部署。部署顺序不影响核心功能（仅"跳转菜单"入口不显示）。
- **[Trade-off] 每次导航到 menu.vue 都触发 flat 全量查询**：仅 admin 操作，低频触发，可接受。
