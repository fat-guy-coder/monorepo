## 1. 新增后端批量 API (menu.ts)

- [ ] 1.1 新增 `POST /api/menus/batch` — 接受树形 JSON，递归批量创建，事务包裹
- [ ] 1.2 新增 `DELETE /api/menus/batch` — 支持 `{ parentId }` 清空子树 或 `{ ids }` 批量删除
- [ ] 1.3 修复 `DELETE /api/menus/:id` — 递归查询所有后代后统删（当前只删一级子菜单）
- [ ] 1.4 添加 `POST /api/menus/batch` 的幂等逻辑 — 同 name 已存在则跳过

## 2. 配置文件抽离

- [ ] 2.1 创建 `apps/backend/config/menus-go-roadmap.json` — 108 个菜单的完整树形数据
- [ ] 2.2 数据格式：`{ project, parentId, stages: [{ name, label, icon, order, topics: [...] }] }`

## 3. 种子脚本通用化

- [ ] 3.1 重构 `scripts/seedGoRoadmapMenus.ts` → `scripts/seed-menus.ts`
- [ ] 3.2 支持 `--config <path>` 参数指定配置文件
- [ ] 3.3 支持 `--dry-run` 预览模式（打印将要创建的结构，不执行）
- [ ] 3.4 支持 `--clean` 先删除 parentId 下所有子菜单，再重新导入
- [ ] 3.5 使用 `POST /api/menus/batch` 替代逐条创建（一次 HTTP 请求完成）
- [ ] 3.6 保留旧脚本作为 `scripts/seedGoRoadmapMenus.ts`（软链接或重新导出）

## 4. package.json 脚本入口

- [ ] 4.1 新增 `"db:seed": "bun run scripts/seed-menus.ts --config"` 通用入口
- [ ] 4.2 新增 `"db:seed:go": "bun run scripts/seed-menus.ts --config config/menus-go-roadmap.json"` 快捷入口

## 5. 后端部署与验证

- [ ] 5.1 部署后端到服务器（`docker-compose build backend && docker-compose up -d backend`）
- [ ] 5.2 执行 `docker exec backend bun run db:seed:go` 验证完整 108 个菜单创建
- [ ] 5.3 执行 `docker exec backend bun run db:seed:go --clean` 验证清空+重建
- [ ] 5.4 调用 `DELETE /api/menus/batch { parentId }` 验证级联删除正确性
- [ ] 5.5 调用 `DELETE /api/menus/:id` 验证递归删除所有后代（测试 3 层嵌套）
