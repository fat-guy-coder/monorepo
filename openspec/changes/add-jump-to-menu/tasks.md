## 1. RouteTab 右键菜单插槽 (packages/components)

- [x] 1.1 RouteTab.vue 模板中 context-menu div 内新增 `<slot name="contextMenuItems">` 插槽
- [x] 1.2 确保有插槽内容时，默认三个菜单项和自定义项之间有视觉分隔（用 border-top 或 margin）

## 2. 后端 /api/user/me 返回角色

- [x] 2.1 修改 `apps/backend/src/routes/user.ts` 中 GET `/api/user/me` handler，查询 userRole 关联表，返回 roles 数组 `[{ id, name }]`
- [x] 2.2 更新前端 `apps/learning/src/api/user.ts` 中 `UserInfo` 接口，加入 `roles?: { id: string; name: string }[]`

## 3. 前端 admin 角色检测 (App.vue)

- [x] 3.1 App.vue 新增 `isAdmin` ref，`onMounted` 中调用 `getApiUserMe()` 获取并判断
- [x] 3.2 `provide('isAdmin', isAdmin)` 供子组件注入使用
- [x] 3.3 仅在 `isAdmin` 为 true 时向 RouteTab 的 contextMenuItems 插槽注入"跳转菜单"项

## 4. "跳转菜单"点击逻辑 (App.vue)

- [x] 4.1 实现 `gotoMenuManagement()` 函数：获取 `activeKey.value`（当前 tab 的 path），通过 routeInfoMap 查找菜单管理页并跳转
- [x] 4.2 点击"跳转菜单"时关闭右键菜单（调 `toggleShowMenu(false)`）

## 5. menu.vue 支持 expandPath query 参数

- [x] 5.1 导入 `useRoute`，`onMounted` 中读取 `route.query.expandPath`
- [x] 5.2 如果 `expandPath` 存在，用 `getApiMenus({ flat: 'true' })` 获取扁平菜单列表，按 path 查找目标并回溯父链
- [x] 5.3 对每个父节点调 `loadNodeChildren` 逐层加载子菜单
- [x] 5.4 设置 `defaultExpandedKeys` 展开所有父级节点
- [x] 5.5 滚动到目标菜单项（`scrollIntoView`）

## 6. 验证

> ⚠️ **部署前提**: 前端连接的是远程服务器 API，验证前需确保后端已部署并重启。
> 后端改动点：`apps/backend/src/routes/user.ts` — GET `/api/user/me` 新增 `roles` 字段。
> 可在浏览器 Console 运行以下命令快速验证后端是否已更新：
> ```js
> fetch('/api/user/me', { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }).then(r => r.json()).then(d => console.log('roles:', d.data?.roles))
> ```

- [ ] 6.1 admin 用户登录后，右键 tab 出现"跳转菜单"项，点击后跳转到 menu.vue 并展开对应位置
- [ ] 6.2 普通用户登录后，右键 tab 不出现"跳转菜单"项
- [ ] 6.3 expandPath 为空时 menu.vue 行为不变
- [ ] 6.4 expandPath 对应路径不存在时 menu.vue 不报错
