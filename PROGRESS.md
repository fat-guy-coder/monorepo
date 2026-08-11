# 📊 全项目进度面板

> 更新时间: 2026-08-11 | 当前活跃任务: **DSA 算法文档更新（模块 3→13）+ Canvas 动画**

## 🎯 当前任务（下次 AI 会话继续入口）

**主任务：** 填充 DSA 算法与数据结构学习文档（`apps/learning/src/views/AlgorithmsAndDataStructures/`）
- ✅ 模块 1（复杂度分析）：8/8 篇，100% 完成
- ✅ 模块 2（线性数据结构）：20/20 篇，100% 完成，其中 10 篇已加 Canvas 动画
- ⏳ 模块 3-13：157 个文件已建（空壳），待填充

**继续指令：** 对 AI 说「继续 DSA 算法文档的更新」或「从 dsa-module-3-hash 开始填充文档」

**子任务：** Canvas 动画（vue-konva）
- 已为 10 篇文档加入 inline Canvas 动画（数组 4 + 链表 4 + 栈 1 + 队列 1）
- 动画规范见 `.claude/skills/dsa-visualizer/SKILL.md`
- 文档样式规范见 `.claude/skills/go-doc-style/SKILL.md`

---

## 一、DSA 算法与数据结构文档（前端 Vue 文档）

> 路径: `apps/learning/src/views/AlgorithmsAndDataStructures/`

| 模块 | 名称 | 文件数 | 文档 | 动画 | 状态 |
|------|------|--------|------|------|------|
| 1 | 复杂度分析基础 | 8 | ✅ 8/8 | 0 | ✅ 完成 |
| 2 | 线性数据结构 | 20 | ✅ 20/20 | 🎬 10 | ✅ 完成 |
| 3 | 哈希表 | 10 | 空壳 | — | ⏳ 待填充 |
| 4 | 树 | 18 | 空壳 | — | ⏳ 待填充 |
| 5 | 堆 | 7 | 空壳 | — | ⏳ 待填充 |
| 6 | 图 | 18 | 空壳 | — | ⏳ 待填充 |
| 7 | 排序 | 12 | 空壳 | — | ⏳ 待填充 |
| 8 | 搜索 | 11 | 空壳 | — | ⏳ 待填充 |
| 9 | 动态规划 | 17 | 空壳 | — | ⏳ 待填充 |
| 10 | 贪心算法 | 7 | 空壳 | — | ⏳ 待填充 |
| 11 | 字符串算法 | 11 | 空壳 | — | ⏳ 待填充 |
| 12 | 高级数据结构 | 10 | 空壳 | — | ⏳ 待填充 |
| 13 | 解题方法论 | 8 | 空壳 | — | ⏳ 待填充 |
| **合计** | | **157** | **28** | **10** | **18%** |

**动画进度（模块 2 内）：**

| 文档 | 动画 | 类型 |
|------|------|------|
| dsa-2-1-1 静态数组 | Push/Pop/Insert/Remove/Search + 缩放 | Bar 图 |
| dsa-2-1-2 动态数组 | Push→扩容演示（容量栏变色） | Bar 图 |
| dsa-2-1-3 双指针技巧 | 对撞指针分步 + 滑动窗口 | Bar 图 + 指针 |
| dsa-2-1-4 前缀和 | 区间高亮 + O(1) 公式演算 | 双排 Bar 图 |
| dsa-2-2-1 单向链表 | 头插/尾插/删头 | 节点+箭头 |
| dsa-2-2-5 反转全家桶 | 三指针逐步反转（prev/curr/next） | 节点+箭头+标注 |
| dsa-2-2-6 快慢指针 | 找中点追逐 | 节点+箭头+标注 |
| dsa-2-2-7 合并排序 | 双排比较合并 | 三排节点 |
| dsa-2-3-1 单调栈 | Push/Pop/Peek | 垂直堆叠 |
| dsa-2-4-1 双端队列 | Enqueue/Dequeue | 水平滑动 |

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

共 101 个 .vue 文档（空壳为主）。Godot 文档也遵循 `go-doc-style` 规范，但 GDScript 代码使用强类型（Static Typing）。

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
| `go-doc-style` | 所有学习文档的统一样式规范（布局/配色/组件） | `.claude/skills/go-doc-style/` |
| `dsa-visualizer` | Canvas 动画规范（vue-konva inline 动画模板） | `.claude/skills/dsa-visualizer/` |
| `openspec-propose` | OpenSpec 变更提案 | `.claude/skills/openspec-propose/` |
| `openspec-apply-change` | 实施 OpenSpec 变更任务 | `.claude/skills/openspec-apply-change/` |
| `openspec-archive-change` | 归档 OpenSpec 变更 | `.claude/skills/openspec-archive-change/` |
| `openspec-explore` | 探索模式，理清需求 | `.claude/skills/openspec-explore/` |

---

## 八、快速恢复指南

**新会话启动时对 AI 说：**

| 任务 | 提示词 |
|------|--------|
| 继续 DSA 文档 | 「继续 DSA 算法文档的更新，从模块 3 开始」 |
| 继续 Go 文档 | 「继续 Go 学习文档的填充，从阶段 2 开始」 |
| 继续 Canvas 动画 | 「继续给 DSA 文档加 Canvas 动画」 |
| 继续 Godot 文档 | 「继续 Godot 学习文档的填充」 |
| 继续后端开发 | 「继续后端 API 开发」 |
| 继续游戏开发 | 「继续 Blitz 游戏项目开发」 |

> **提示：** 新会话中 AI 首先读取 `README.md` 和 `PROGRESS.md`（本文件），即可了解全局状态和当前任务。
