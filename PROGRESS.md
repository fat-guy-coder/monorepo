# 📊 全项目进度面板

> 更新时间: 2026-08-17 | 当前活跃任务: **DSA 算法文档更新（模块 8 → 13）**

## 🎯 当前任务（下次 AI 会话继续入口）

**主任务：** 填充 DSA 算法与数据结构学习文档（`apps/learning/src/views/AlgorithmsAndDataStructures/`）
- ✅ 模块 1（复杂度分析）：8/8 篇，100% 完成
- ✅ 模块 2（线性数据结构）：22/22 篇，100% 完成（全部含「结构图 + 正文 + 动画」三层）
- ✅ 模块 3（哈希表）：10/10 篇，100% 完成（全部含「结构图 + 正文 + 动画」三层）
- ✅ 模块 4（树）：21/21 篇，100% 完成（全部含「结构图 + 正文 + 动画」三层）
- ✅ 模块 5（堆）：11/11 篇，100% 完成（全部含「结构图 + 正文 + 动画」三层，新增了「堆的基本概念」基础章节）
- ✅ 模块 6（图）：20/20 篇，100% 完成（全部含「结构图 + 正文 + 动画」三层）
- ✅ 模块 7（排序）：17/17 篇，100% 完成（全部含「结构图 + 正文 + 动画」三层，补齐了冒泡/选择/鸡尾酒/梳/锦标赛/Tim/内省等）
- ⏳ 模块 8-13：待填充

**继续指令：** 对 AI 说「继续 DSA 算法文档的更新，从模块 8（搜索）开始」

**子任务：** 模块 2 视觉增强（✅ 已完成）
- 22 篇全部有：开头静态 SVG 结构图（`📐 结构总览`）+ 结尾 Canvas 动画（`🎬 动画演示`）
- 结构图规范见 `.claude/skills/dsa-diagram/SKILL.md`
- 动画规范见 `.claude/skills/dsa-visualizer/SKILL.md`
- 文档样式规范见 `.claude/skills/doc-style/SKILL.md`

---

## 一、DSA 算法与数据结构文档（前端 Vue 文档）

> 路径: `apps/learning/src/views/AlgorithmsAndDataStructures/`

| 模块 | 名称 | 文件数 | 文档 | 结构图 | 动画 | 状态 |
|------|------|--------|------|--------|------|------|
| 1 | 复杂度分析基础 | 8 | ✅ 8/8 | 0 | 0 | ✅ 完成 |
| 2 | 线性数据结构 | 22 | ✅ 22/22 | 🎨 22 | 🎬 22 | ✅ 完成 |
| 3 | 哈希表 | 10 | ✅ 10/10 | 🎨 10 | 🎬 10 | ✅ 完成 |
| 4 | 树 | 21 | ✅ 21/21 | 🎨 21 | 🎬 21 | ✅ 完成 |
| 5 | 堆 | 11 | ✅ 11/11 | 🎨 11 | 🎬 11 | ✅ 完成 |
| 6 | 图 | 20 | ✅ 20/20 | 🎨 20 | 🎬 20 | ✅ 完成 |
| 7 | 排序 | 17 | ✅ 17/17 | 🎨 17 | 🎬 17 | ✅ 完成 |
| 8 | 搜索 | 11 | 空壳 | — | — | ⏳ 待填充 |
| 9 | 动态规划 | 17 | 空壳 | — | — | ⏳ 待填充 |
| 10 | 贪心算法 | 7 | 空壳 | — | — | ⏳ 待填充 |
| 11 | 字符串算法 | 11 | 空壳 | — | — | ⏳ 待填充 |
| 12 | 高级数据结构 | 10 | 空壳 | — | — | ⏳ 待填充 |
| 13 | 解题方法论 | 8 | 空壳 | — | — | ⏳ 待填充 |
| **合计** | | **173** | **109** | **101** | **101** | **63%** |

**视觉增强（模块 2 全部完成）：**

模块 2 的 22 篇文档全部具备「📐 结构总览（静态 SVG）+ 正文 + 🎬 动画演示（Canvas）」三层结构：
- **结构图**（`dsa-diagram` skill）：数组/链表/栈/队列/跳表的结构图 + 关键操作 before/after 示意图
- **动画**（`dsa-visualizer` skill）：数组 Bar 图、链表节点+箭头、栈垂直堆叠、队列水平滑动、跳表多层查找等

**生成工具：** `apps/learning/scripts/generateRouteAndView.ts` — 从后端菜单 API 自动生成 .vue 文件壳。注意：全量菜单可能包含孤儿节点（parentId=null 的重复菜单），需先清理数据库。

---

## 二、Go 学习文档

> 路径: `apps/go/` (代码) + `apps/learning/src/views/backend/BackendLanguage/GO/` (前端文档)

| 阶段 | 名称 | .vue 文档 | .go 代码 | 状态 |
|------|------|-----------|----------|------|
| 1 | 基础入门 | 19/19 ✅ | 19/19 ✅ | ✅ 完成 |
| 2 | 并发编程 | 0/13 | 4/13 | ⏳ 待开始 |
| 3 | Web 开发 | 0/16 | 3/16 | ⏳ 待开始 |
| 4 | 数据库 | 0/14 | 0/14 | ⏳ 待开始 |
| 5 | 微服务 | 0/16 | 3/16 | ⏳ 待开始 |
| 6 | 工程化 | 0/15 | 0/15 | ⏳ 待开始 |
| 7 | 进阶 | 0/15 | 0/15 | ⏳ 待开始 |
| **合计** | | **19/108** | **29/108** | **18%** |

**继续指令：** 「继续 Go 文档的填充」「从 Go 阶段 2 开始写并发文档」

**运行：** `cd apps/go && go run . <stage> [topic]` 或 `go run . all`

---

## 三、Python 学习文档

> 路径: `apps/learning/src/views/backend/BackendLanguage/Python/`

共 37 个 .vue 文档（空壳为主）。学习路径见 `apps/python/LEARNING_PATH.md`。

| 阶段 | 内容 | 状态 |
|------|------|------|
| 1 | 基础脚本 | ⏳ |
| 2 | 面向对象 | ⏳ |
| 3 | Web 框架 (Flask/FastAPI/Django) | ⏳ |
| 4 | 数据库实战 | ⏳ |
| 5 | 项目进阶 | ⏳ |

**继续指令：** 「继续 Python 文档的填充」

---

## 四、Godot 游戏开发

### 4.1 Godot 学习文档

> 路径: `apps/learning/src/views/GameProduction/`

共 101 个 .vue 文档（空壳为主）。Godot 文档也遵循 `doc-style` 规范，但 GDScript 代码使用强类型（Static Typing）。

**继续指令：** 「继续 Godot 文档的填充」

### 4.2 Blitz 游戏项目

> 路径: `apps/game/blitz/`

包含：`scripts/`（GDScript 源码）、`scenes/`（场景文件）、`DESIGN.md`（设计文档）。

每个 .gd 脚本顶部有 `## 📚 涉及学习文档:` 注释块关联到 Godot 学习文档，关键代码行用 `# → godot-X-Y-name: 说明` 标注。

**继续指令：** 「继续 Blitz 游戏开发」

---

## 五、后端 API

> 路径: `apps/backend/` | 运行时: Bun + Drizzle + PostgreSQL | 端口: 3000

- ✅ 菜单 CRUD API（完整，含批量创建/删除/搜索/树形查询）
- ✅ 用户认证 API（JWT 登录/注册/角色）
- ✅ 种子脚本（`bun run scripts/seed-menus.ts`）
- ✅ 菜单 JSON 配置文件（`apps/backend/config/menus-*.json`）

API 文档: `apps/backend/API.md` | 快速启动: `docker-compose up -d backend postgres`

**继续指令：** 「继续后端开发」「添加 XXX API 接口」

---

## 六、前端网站（learning）

> 路径: `apps/learning/` | Vue 3 + Pinia + Tailwind CSS v4 + Vite

- ✅ 学习文档系统（动态路由 + 多 Tab + 侧边菜单树）
- ✅ 共享组件库（Code、Nav、EditorLink、LearningPath 等）
- ✅ 管理后台（`apps/admin/`，端口 8848）
- ✅ 个人主页（`apps/main/`，赛博朋克风）

**关键约定：**
- 页面跳转用 `inject('goToByName')` 或 `<Link :route="item.name">`，不用 `<RouterLink>`
- Code 组件: `import { Code } from 'components'`，支持 `language="ts"|"go"|"bash"|"text"` 等
- 底部导航用 path-based RouterLink：`to="/AlgorithmsAndDataStructures/dsa-module-2-linear/..."`

---

## 七、Skills 清单

| Skill | 用途 | 位置 |
|-------|------|------|
| `doc-style` | 所有学习文档的统一样式规范（布局/配色/组件） | `.claude/skills/doc-style/` |
| `dsa-diagram` | 文档开头静态 SVG 结构图规范（内联 SVG/配色/marker） | `.claude/skills/dsa-diagram/` |
| `dsa-visualizer` | 文档结尾 Canvas 动画规范（vue-konva inline 动画模板） | `.claude/skills/dsa-visualizer/` |
| `openspec-propose` | OpenSpec 变更提案 | `.claude/skills/openspec-propose/` |
| `openspec-apply-change` | 实施 OpenSpec 变更任务 | `.claude/skills/openspec-apply-change/` |
| `openspec-archive-change` | 归档 OpenSpec 变更 | `.claude/skills/openspec-archive-change/` |
| `openspec-explore` | 探索模式，理清需求 | `.claude/skills/openspec-explore/` |

---

## 八、快速恢复指南

**新会话启动时对 AI 说：**

| 任务 | 提示词 |
|------|--------|
| 继续 DSA 文档 | 「继续 DSA 算法文档的更新，从模块 8（搜索）开始」 |
| 继续 Go 文档 | 「继续 Go 学习文档的填充，从阶段 2 开始」 |
| 继续 Godot 文档 | 「继续 Godot 学习文档的填充」 |
| 继续后端开发 | 「继续后端 API 开发」 |
| 继续游戏开发 | 「继续 Blitz 游戏项目开发」 |

> **提示：** 新会话中 AI 首先读取 `README.md` 和 `PROGRESS.md`（本文件），即可了解全局状态和当前任务。

### ⚡ 批量文档填充：用子代理并行

批量填充文档（一次填一个模块/阶段的多篇）时，**不要串行写**，用 `Agent` 工具派生子代理并行处理：

1. Glob 列出待填充的空壳文件（< 200 字节）
2. 按文件/子主题分组，每组一个子代理
3. 同一轮并行调用多个 `Agent`（`general-purpose`），prompt 里附 `doc-style` 关键规范 + 文件路径 + 知识点主题
4. 全部完成后统一 `vue-tsc`/构建校验

完整策略见 `.claude/skills/doc-style/SKILL.md` 开头的「🤖 AI 批量填充策略」章节。
