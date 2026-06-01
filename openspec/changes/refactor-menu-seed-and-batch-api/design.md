## Context

当前菜单管理系统基于 Bun + Drizzle ORM + PostgreSQL，通过 `src/routes/menu.ts` 提供单条 CRUD。种子脚本 `scripts/seedGoRoadmapMenus.ts` 是独立的 Node/Bun 脚本，通过 HTTP 调用远程 API 逐条创建。

### 现有架构
- `POST /api/menus` — 单条创建，自动生成 path，处理 order 插入
- `DELETE /api/menus/:id` — 删除菜单，内部用 `rawQuery` 删 `parent_id = id`（只删一级子菜单，不递归）
- `GET /api/menus/:id/children` — 查询直接子菜单
- 种子脚本使用 fetch API 逐条调用 POST，先查后建保证幂等

### 问题
1. 种子脚本硬编码数据，新增路线图（Python/Node.js/前端）需复制整个脚本改 STAGES
2. DELETE `:id` 只删一级子菜单，深层嵌套的菜单会产生孤儿记录
3. 没有批量创建 API，种子脚本需 100+ 次 HTTP 请求

## Goals / Non-Goals

**Goals:**
- 种子脚本通过 JSON 配置文件驱动，通用化导入逻辑
- `POST /api/menus/batch` 支持树形数据一次性批量创建，减少 HTTP 请求
- `DELETE /api/menus/batch` 支持按 parentId 清空子树或按 ids 批量删除
- DELETE `:id` 修复为递归删除所有后代
- 保持现有 API 完全向后兼容

**Non-Goals:**
- 不改变菜单 schema/表结构
- 不引入新的依赖（仅使用现有 Bun + Drizzle）
- 不改变前端菜单展示逻辑

## Decisions

### Decision 1: 数据格式 — JSON 文件，结构与现有 STAGES 对齐

**选择**: JSON 配置文件格式如下：
```json
{
  "project": "learning",
  "parentId": "48eef805-b727-4430-b7d6-6ae35bb8634b",
  "stages": [
    {
      "name": "go-stage-1-basics",
      "label": "阶段1：基础入门",
      "icon": "🔰",
      "order": 10,
      "topics": [
        { "name": "go-1-1-env-tools", "label": "环境搭建与工具链", "order": 1 }
      ]
    }
  ]
}
```
**理由**: 与现有脚本内 STAGES 数据结构完全一致，迁移成本为零。JSON 无外部依赖，Bun/Node 原生支持。

### Decision 2: 批量创建 API — 新增 POST /api/menus/batch

**选择**: 接受 `{ parentId: string, items: TreeItem[] }`，后端递归创建。每个 item 可含 `children: TreeItem[]` 实现深层嵌套。

**请求体**:
```json
{
  "project": "learning",
  "parentId": "xxx",
  "items": [
    {
      "name": "stage-1", "label": "阶段1", "icon": "🔰", "order": 10,
      "children": [
        { "name": "topic-1", "label": "知识点1", "order": 1 }
      ]
    }
  ]
}
```

**响应**: 返回 `{ created: number, skipped: number, details: [...] }` 统计信息。

**理由**: 一次请求完成整个树创建，种子脚本从 100+ 次 HTTP 请求降为 1 次。递归创建在服务端完成，保证事务一致性。

### Decision 3: 批量删除 API — 新增 DELETE /api/menus/batch

**选择**: 支持两种模式：
1. `{ parentId: "xxx" }` — 删除该节点下的所有子孙（保留 parentId 自身）
2. `{ ids: ["id1", "id2"] }` — 删除指定 id 及其所有子孙

**理由**: parentId 模式适合"重新导入前清空旧数据"的场景。ids 模式适合"选择性清理"。

### Decision 4: DELETE `:id` 递归修复

**选择**: 用递归 CTE 或应用层递归查找所有后代 id，批量 DELETE。

**理由**: 当前 `DELETE FROM menu WHERE parent_id = $id` 只删一级，嵌套子孙变孤儿。应递归收集所有后代 ID 后统一删除。

### Decision 5: 种子脚本通用化

**选择**: 脚本改为：
```
bun run scripts/seed-menus.ts --config config/menus-go-roadmap.json
```
- 读取 JSON 配置文件
- 调用 `POST /api/menus/batch` 一次性创建
- 支持 `--dry-run` 预览不执行
- 支持 `--clean` 先调 DELETE batch 清空子树再导入

**理由**: 换路线图只需换配置文件，脚本代码零改动。

## Risks / Trade-offs

- **[Risk] 批量创建失败回滚**: 如果 100 个菜单中第 50 个失败，已创建的前 49 个需要回滚。→ **Mitigation**: 用 PostgreSQL 事务包裹（`BEGIN...COMMIT/ROLLBACK`），任一失败全部回滚。
- **[Risk] DELETE 递归删除误删**: 递归删除范围大，误传 id 可能删掉整个子树。→ **Mitigation**: 批量删除 API 记录操作日志，`--dry-run` 模式可预览。
- **[Trade-off] 配置文件 vs 管理后台 UI**: JSON 文件配置需要手动编辑，不如管理后台 UI 方便。但作为批量导入工具，JSON 配置更适合版本控制和复用。
