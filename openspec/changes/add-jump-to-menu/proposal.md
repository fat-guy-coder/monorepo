## Why

管理员需要从任意页面快速跳转到菜单管理后台（System/menu.vue）并定位到当前页面对应的菜单项，方便编辑菜单配置。普通用户不应看到此入口。

## What Changes

- **RouteTab 右键菜单扩展**：在 packages/components 的 RouteTab 组件中新增插槽或 prop，允许父组件注入自定义右键菜单项
- **"跳转菜单"菜单项**：App.vue 中传入"跳转菜单"项到 RouteTab 右键菜单，仅 admin 角色可见
- **后端返回角色信息**：扩展 `/api/user/me` 接口，返回当前用户的角色列表（含 `name` 字段），供前端判断 admin
- **前端 admin 判断**：新增 `isAdmin` computed 或 provide，供子组件使用
- **menu.vue 支持 query 预展开**：System/menu.vue 读取 URL query 参数 `expandPath`，自动加载并展开对应菜单项所在的父级树节点

## Capabilities

### New Capabilities

- `route-tab-context-menu-slot`: RouteTab 组件支持自定义右键菜单项（通过 slot 或 prop），使调用方可以注入额外操作
- `admin-role-detection`: 前端能够判断当前登录用户是否拥有 admin 角色，控制管理功能的可见性
- `menu-tree-query-expand`: menu.vue 支持通过 URL query 参数指定要展开的菜单路径，自动展开并定位到目标菜单项

### Modified Capabilities

<!-- No existing specs to modify -->

## Impact

- **packages/components/src/components/Tab/RouteTab.vue**：新增插槽/prop 支持自定义右键菜单项
- **apps/learning/src/App.vue**：注入"跳转菜单"项，实现跳转逻辑
- **apps/backend/src/routes/user.ts**：`/api/user/me` 返回角色信息
- **apps/learning/src/views/System/menu.vue**：支持 query 参数预展开
- **apps/learning/src/stores/tab.ts**：可能需要存储当前选中 tab 的额外上下文信息
