## Why

当前 `scripts/seedGoRoadmapMenus.ts` 的菜单数据硬编码在脚本中，每次新增/修改菜单都需要改代码，不灵活。同时后端缺少批量操作菜单的 API 端点——现有 POST /api/menus 只能逐条创建，DELETE 只能逐个删除（仅一级级联），无法按 parentId 批量删除子树。

改造目标：
1. **种子脚本数据驱动**：菜单数据抽离到外部配置文件（JSON/YAML），脚本只负责读取+调 API 创建，实现"换数据不换代码"
2. **批量 API 端点**：新增 `POST /api/menus/batch` 批量创建、`DELETE /api/menus/batch` 批量删除（支持按 parentId 清除子树），方便后续任何学习路线（Python/Node.js/前端等）快速复制菜单结构

## What Changes

- **种子脚本改造**：抽取 `config/menus-go-roadmap.json` 作为数据文件，脚本改为通用批量导入器，接受 `--config <path>` 参数
- **新增 POST /api/menus/batch**：接受 `{ parentId, items: [...] }` 树形结构，递归创建，返回创建结果统计
- **强化 DELETE /api/menus/batch**：接受 `{ parentId }` 或 `{ ids: [...] }`，级联删除所有子孙菜单
- **强化 DELETE /api/menus/:id**：修复只删一级子菜单的 bug，改为递归删除所有后代

## Capabilities

### New Capabilities

- `data-driven-seed-script`: 种子脚本支持从 JSON 配置文件读取菜单树数据，通用化批量导入逻辑
- `batch-menu-api`: 后端新增批量创建/删除菜单接口，支持递归操作整个子树

### Modified Capabilities

- `DELETE /api/menus/:id`: 删除行为从"仅删一级子菜单"修复为"递归删除所有后代"

## Impact

- **apps/backend/scripts/seedGoRoadmapMenus.ts**：重构为通用批量导入器
- **apps/backend/config/menus-go-roadmap.json**：新增 — GO 路线图菜单数据（从脚本中抽离）
- **apps/backend/src/routes/menu.ts**：新增 POST + DELETE `/api/menus/batch`，修复 DELETE `:id` 级联逻辑
- **apps/backend/package.json**：新增 `db:seed` 脚本入口，支持指定配置文件
