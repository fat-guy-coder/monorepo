# 🎮 Monorepo — 独立游戏开发助力文档

> 一切为了做独立游戏而铺路。用 Godot 做游戏，Go 写后端，Python 写工具——边做边学，全部沉淀为结构化学习文档。

## 项目定位

这不是一个传统 monorepo，而是一个**独立游戏开发者的知识库 + 学习系统**。每个 `apps/` 子项目对应做独立游戏时需要的技术栈：

| 技术 | 项目 | 用途 |
|------|------|------|
| 🎮 Godot (GDScript) | `apps/game/blitz/` | 做 2D 游戏本体 — **Blitz：像素风武侠动作游戏** |
| 🐹 Go | `apps/go/` | 游戏后端、高并发服务、网络层 |
| 🐍 Python | `apps/python/` | 自动化工具、数据处理、快速原型 |
| 🌐 Vue 3 | `apps/learning/` | 把学到的知识做成结构化文档网站 |
| ⚙️ Bun + PG | `apps/backend/` | 文档网站的后端 API |
| 🛠️ Vue 3 | `apps/admin/` | 管理后台（菜单/角色/权限管理） |

**核心循环:** 做游戏 → 需要技术 → 学 → 写文档沉淀 → 文档反哺开发效率 → 做出更好的游戏

---

## 项目结构

```
monorepo/
├── apps/
│   ├── go/                # Go 学习 — 7 阶段 108 篇文档+代码（后端/并发/微服务）
│   ├── python/            # Python 学习 — 5 阶段 20 个项目（工具/爬虫/Web/数据库）
│   ├── learning/           # 学习网站 (Vue 3 + Pinia + Tailwind) — 承载所有文档
│   ├── backend/            # 后端 API (Bun + Drizzle + PostgreSQL)
│   ├── admin/              # 管理后台 (Vue 3 + Element Plus)
│   └── game/
│       └── blitz/          # 🎮 Blitz — 2D 像素风武侠动作游戏 (Godot 4)
│           ├── scenes/     #   主关卡 / 玩家 / 敌人 / 攻击判定
│           ├── scripts/    #   6 个 .gd 脚本（player/enemy/bullet/attack_hitbox…）
│           ├── DESIGN.md   #   游戏设计文档（战斗系统/美术路线/连招表）
│           └── project.godot
├── packages/
│   ├── components/         # 共享 Vue 3 组件库（Code、EditorLink、Nav、Tree 等 15+ 组件）
│   └── utils/              # 共享工具 + Tailwind 配置 + 主题
├── openspec/               # AI 辅助开发工作流（提案 → 设计 → 任务 → 实施）
│   ├── config.yaml         #   项目上下文（AI proposal 时自动读取）
│   └── changes/            #   历史变更档案
├── .claude/
│   ├── skills/             # AI Skills（doc-style / dsa-diagram / dsa-visualizer / openspec-*）
│   └── scheduled_tasks.json
├── docker-compose.yml      # PostgreSQL + 后端 容器编排
├── turbo.json              # Turborepo 构建设置
├── pnpm-workspace.yaml     # pnpm monorepo 工作区配置
├── README.md               # 📖 本文件 — 项目总览
└── PROGRESS.md             # 📊 全项目进度面板（新 AI 会话的接续入口）
```

---

## 🎮 Blitz — 独立游戏项目

> **"发家致富靠它了"** — 今后的重心全在独立游戏开发上。

**Blitz** 是一个 2D 横版像素风武侠动作游戏，用 Godot 4 开发。核心体验：**刀光剑影，一击一命。**

### 游戏概况

| 项目 | 说明 |
|------|------|
| 引擎 | Godot 4.6 (GDScript) |
| 类型 | 2D 横版动作 / 像素风 |
| 渲染 | Forward+ (D3D12)，1280×720 |
| 灵感 | Dead Cells（美术）、Katana Zero（手感）、Hades（Build 系统） |
| 当前版本 | v0.1 — 全部用 `_draw()` 几何图形验证玩法 |

### 核心系统

| 系统 | 状态 | 说明 |
|------|------|------|
| 🏃 移动 | ✅ | 水平加减速 + 可变跳跃高度 + coyote time + jump buffer |
| 💨 闪避 | ✅ | 无敌帧 + 冷却 + 水平爆发 |
| ⚔️ 轻击 | ✅ | J 键触发，前向生成攻击判定框 |
| 🛡️ 格挡 | ✅ | 空中靠近格挡对象按跳 = 弹跳 + 150分 + 无敌 |
| 🎯 敌人 AI | ✅ | 巡逻/固定/追踪 三种行为 |
| 🩸 生命/死亡 | ✅ | HP + 死亡 UI + 重开 |
| 📊 分数/HUD | ✅ | 分数 + 冲刺冷却条 |
| 👊 连招系统 | ❌ | 轻→轻→轻→重 四连、方向+攻击组合 |
| 💢 架势/气力 | ❌ | 架势槽 + 精准格挡窗口 + 气力消耗 |
| 🎨 像素美术 | 🚧 | 当前用 `_draw()` 占位，目标 Dead Cells 级法线贴图+动态光照 |
| 🔈 音效 | ❌ | 待加 |

### 美术路线图

```
v0.1 ✅ (当前)   全部 _draw() 几何图形，验证玩法
v0.5 (下一阶段)  骨骼动画 + 粒子特效 + 屏幕震动
v1.0             像素精灵 + 法线贴图 + PointLight2D 动态光照
v1.5             后处理（Glow/Vignette/Color Grading）+ 视差背景
v2.0             完整角色动画集 + 环境美术 + 多场景
v3.0             联机合作（可选）
```

### 打击感四要素（0 素材成本）

| 要素 | 做法 | 说明 |
|------|------|------|
| 屏幕震动 | Camera2D offset Tween | 重击 4px，轻击 1px，最便宜有效 |
| 击停帧 | 双方暂停 0.05-0.1s | 命中瞬间的「卡肉」感 |
| 粒子特效 | 程序化粒子 | 命中火花、剑气拖尾、受击碎片 |
| 音效 | 素材 | 挥剑/命中/格挡/死亡声（后期加） |

### 代码与文档关联

Blitz 的每个 `.gd` 脚本顶部都标注了对应的学习文档（如 `player.gd` 开头标注了 12 篇 Godot 文档引用），文档中也通过 EditorLink 组件指向 Blitz 源码。**边做游戏边写文档，代码即教程。**

> 详见 [apps/game/blitz/DESIGN.md](apps/game/blitz/DESIGN.md) — 完整设计文档（连招表、碰撞层设计、战斗系统、改造范围）

---

## 学习路线

### 🎮 Godot / GDScript（9 阶段 ~101 篇）

```
阶段0 概览 → 阶段1 GDScript 语法 → 阶段2 节点系统 → 阶段3 UI系统
→ 阶段4 场景管理 → 阶段5 输入/动画 → 阶段6 物理/碰撞 → 阶段7 GDScript 进阶
→ 阶段8 编辑器/工具 → 阶段9 实战项目
```

101 篇文档位于 `apps/learning/src/views/GameProduction/`。**优先按 Blitz 实际开发需要填充**。

### 🐹 Go 语言（7 阶段）

```
阶段1 基础入门 (19 篇 ✅) → 阶段2 并发编程 (13 篇) → 阶段3 Web 开发 (16 篇)
→ 阶段4 数据库 (14 篇) → 阶段5 微服务 (16 篇) → 阶段6 工程化 (15 篇)
→ 阶段7 进阶 (15 篇)
```

**进度:** 19/108 篇文档填充，29/108 个代码文件。详见 [PROGRESS.md](PROGRESS.md)

```bash
cd apps/go
go run . 1              # 运行阶段1所有代码
go run . 2 goroutine    # 运行阶段2 goroutine 主题
go run . all            # 运行全部
```

### 🐍 Python（5 阶段）

```
阶段1 基础脚本 → 阶段2 面向对象 → 阶段3 Web 框架 (Flask/FastAPI/Django)
→ 阶段4 数据库实战 → 阶段5 项目进阶
```

详见 [apps/python/LEARNING_PATH.md](apps/python/LEARNING_PATH.md)

### 📊 算法与数据结构（13 模块 ~157 篇）

```
模块1 复杂度分析 (8篇 ✅) → 模块2 线性结构 (22篇 ✅) → 模块3 哈希表 (10篇 ✅) → 模块4 树 (21篇 ✅) → 模块5 堆 (11篇 ✅) → 模块6 图 (20篇 ✅) → 模块7 排序 (17篇 ✅) → 模块8-13 待填充
```

位于 `apps/learning/src/views/AlgorithmsAndDataStructures/`。模块 1-7 的 109 篇已全部完成「📐 结构图 + 正文 + 🎬 动画」三层内容。

---

## 📦 npm Scripts 完全指南

> 根目录 `package.json` 中的每个脚本说明。太多记不住？看这里。

### 🚀 开发启动

| 命令 | 实际执行 | 说明 |
|------|----------|------|
| `pnpm learning:dev` | `pnpm --filter learning run dev` | 启动**学习网站**（`localhost:5173`），Vite HMR |
| `pnpm admin:dev` | `pnpm --filter admin run dev` | 启动**管理后台**（`localhost:8848`），Vite HMR |
| `pnpm backend:dev` | `pnpm --filter backend run dev` | 启动**后端 API**（`bun run src/server.ts`，`:3000`） |
| `pnpm python:dev` | `cd apps/python && python manage.py runserver` | 启动 **Django 开发服务器**（`localhost:8000`） |

### 📄 页面 / 代码生成（⭐ 核心自动化）

| 命令 | 实际执行 | 说明 |
|------|----------|------|
| `pnpm learning:gen` | `pnpm -F learning g` → `node --import=tsx scripts/generateRouteAndView.ts` | **从菜单 API 拉取数据，自动生成前端路由 + .vue 文件**。先请求 API 获取菜单树，再递归创建目录和 .vue 模板文件。新增菜单后跑这个，页面就自动出来了 |
| `pnpm admin:gen` | `pnpm -F admin g` | 同上，给管理后台生成路由和页面 |
| `pnpm learning:g-a` | `pnpm -F learning gen:api` → `tsx scripts/gen-api/index.ts` | 从 **OpenAPI spec** 自动生成前端 API 调用代码（类型安全的请求函数） |
| `pnpm learning:g-a-m` | `pnpm -F learning gen:api:module` | 同上，但按模块拆分生成（`gen:api --module`） |
| `pnpm admin:g-a` | `pnpm -F admin gen:api` | 给管理后台生成 API 调用代码 |
| `pnpm admin:g-a-m` | `pnpm -F admin gen:api:module` | 同上，模块模式 |
| `pnpm translate` | `pnpm -F learning translate` → `tsx src/language/generate.ts` | 生成**国际化翻译文件** |

### 🏗️ 构建

| 命令 | 实际执行 | 说明 |
|------|----------|------|
| `pnpm learning:build` | `pnpm --filter learning run build` | 构建学习网站（`vite build` → `dist/`） |
| `pnpm admin:build` | `pnpm --filter admin run build` | 构建管理后台 |
| `pnpm all:build` | `run-p "build:**"` | 并行构建**所有**子项目 |
| `pnpm turbo:all:build` | `turbo run build` | 通过 **Turborepo** 构建全部（自动处理依赖顺序+缓存） |
| `pnpm turbo:learning:build` | `turbo run build --filter=learning` | Turbo 只构建 learning |
| `pnpm turbo:project:build` | `turbo run build --filter="$1"` | Turbo 构建**指定项目**（需传参） |
| `pnpm learning:preview` | `pnpm --filter learning run preview` | 预览构建产物（`vite preview`） |

### 🌱 菜单管理

菜单数据以 **PostgreSQL 数据库为准**（运行时后端读库），本地不维护菜单 JSON 文件。日常加/改菜单走 **admin 后台「菜单管理」**（单条 `POST /api/menus`）；一次性批量导入可用 `POST /api/menus/batch`（临时生成 JSON，用完即弃）。

### 🐍 Python 辅助

| 命令 | 实际执行 | 说明 |
|------|----------|------|
| `pnpm python:migrate` | `cd apps/python && python manage.py migrate` | 执行 Django 数据库迁移 |
| `pnpm python:admin` | `cd apps/python && python manage.py createsuperuser` | 创建 Django 超级管理员 |

### 🧪 其他

| 命令 | 说明 |
|------|------|
| `pnpm install` | 安装所有 monorepo 依赖（pnpm workspace） |
| `pnpm test` | 运行测试（当前占位） |

### 🔧 后端子命令（`cd apps/backend` 后直接跑）

| 命令 | 说明 |
|------|------|
| `bun run dev` / `bun start` | 启动后端服务器 |
| `bun run db:generate` | Drizzle — 从 schema 生成 SQL 迁移文件 |
| `bun run db:migrate` | Drizzle — 执行迁移 |
| `bun run db:push` | Drizzle — 直接推送 schema 到 DB（开发用，无迁移文件） |

### 📐 代码质量（子项目级别）

| 命令 | 说明 |
|------|------|
| `pnpm lint`（在 learning/admin） | 先 oxlint 再 eslint，自动修复 |
| `pnpm format`（在 learning/admin） | Prettier 格式化 `src/` |
| `pnpm type-check`（在 learning/admin） | vue-tsc 类型检查 |
| `pnpm test:unit`（在 learning/admin） | Vitest 单元测试 |

---

## AI 增强开发工作流 (OpenSpec)

本项目使用 **OpenSpec** 进行 AI 辅助的规范化开发——写提案、做设计、拆任务、实施验证一气呵成。

```
/opsx:propose   → 创建变更提案（proposal + design + tasks）
/opsx:apply     → 按 tasks 逐项实施
/opsx:archive   → 完成后归档
/opsx:explore   → 进入探索模式，理清需求
```

配置见 [openspec/config.yaml](openspec/config.yaml)。

---

## 后端 API 速查

> 🟢 **调试期间后端通常在本地运行** → `http://localhost:3000`
> 生产环境 → `http://47.108.233.237:3000`
>
> 完整接口文档见 [apps/backend/API.md](apps/backend/API.md)

### 菜单 API（最常用）

| 操作 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 全量菜单树 | `GET` | `/api/menus?project=learning` | 返回完整嵌套树 |
| 根菜单 | `GET` | `/api/menus?project=learning&root=true` | 只返回顶级（前端侧边栏用） |
| 扁平列表 | `GET` | `/api/menus?project=learning&flat=true` | 所有菜单打平，每个含 parentId |
| 单个菜单 | `GET` | `/api/menus/:id` | 按 UUID 查 |
| 搜索 | `GET` | `/api/menus?flat=true&search=关键词` | 模糊匹配 label/name |
| 创建 | `POST` | `/api/menus` | `{ name, label, parentId?, icon?, order?, project? }` |
| 批量创建树 | `POST` | `/api/menus/batch` | `{ project, parentId, items: [...] }` — 幂等，同名跳过 |
| 更新 | `PUT` | `/api/menus/:id` | 只传需更新的字段 |
| 删除（递归） | `DELETE` | `/api/menus/:id` | 删该节点及所有后代 |
| 批量删除 | `DELETE` | `/api/menus/batch` | `{ parentId }` 或 `{ ids: [...] }` |

### 响应格式

```json
{ "code": 200, "message": "success", "data": ... }
```

### ⚠️ 传中文用 Python 脚本，别用 curl -d

Windows 下 `curl -d '{"label":"中文"}'` 会把中文按 GBK 传给后端，存进数据库就成了乱码。**给菜单加中文 label 时，用 Python 脚本（UTF-8）或 `curl --data-binary @文件.json`**：

```bash
# ❌ 会乱码
curl -X POST .../api/menus/batch -d '{"label":"堆的基本概念"}'

# ✅ 用 Python 脚本（UTF-8 编码）
python3 -c "
import urllib.request, json
data = json.dumps({'label': '堆的基本概念'}).encode('utf-8')
urllib.request.urlopen(urllib.request.Request('http://localhost:8080/api/menus/batch', data=data, headers={'Content-Type':'application/json'}))
"
```

### 菜单批量导入

一次性批量建菜单用 `POST /api/menus/batch`（需登录，body 为 `{ project, parentId, items }`，`items` 为嵌套树）。幂等——同名子菜单已存在则跳过并递归其子节点，可安全重试。日常单条增改用 admin 后台即可。

### 用户/角色 API

| 操作 | 方法 | 路径 |
|------|------|------|
| 注册 | `POST` | `/api/user/register` |
| 登录 | `POST` | `/api/user/login` |
| 当前用户 | `GET` | `/api/user/me` |
| 角色列表 | `GET` | `/api/roles` |

---

## 后端工作流（完整）

### 新增菜单的典型流程

```
1. admin 后台「菜单管理」加菜单（或一次性批量用 POST /api/menus/batch）
2. pnpm learning:gen                    # 自动生成 .vue 文件 + 路由
3. 编辑 .vue 文档内容（遵循 doc-style skill）
4. pnpm learning:dev                    # 验证页面显示
```

### 数据库同步：本地 ↔ 服务器

**本地 → 服务器:**
```bash
docker exec postgres pg_dump -U jason -d jason -Fc -f /tmp/jason.dump
docker cp postgres:/tmp/jason.dump ./jason.dump
scp ./jason.dump root@47.108.233.237:/tmp/jason.dump
# 服务器上:
docker cp /tmp/jason.dump postgres:/tmp/jason.dump
docker exec postgres pg_restore -U jason -d jason --clean --if-exists --no-owner --no-privileges /tmp/jason.dump
docker restart backend-app
```

**服务器 → 本地:**
```bash
scp root@47.108.233.237:/tmp/jason.dump ./jason.dump
docker cp ./jason.dump postgres:/tmp/jason.dump
docker exec postgres pg_restore -U jason -d jason --clean --if-exists --no-owner --no-privileges /tmp/jason.dump
docker-compose restart backend
```

---

## 🐹 Go 后端（学习项目，端口 3002）

> **以学习 Go 为目的**：用 Go 重写菜单 API（`apps/go/backend/`），与 Bun backend **同库同表**（菜单表列名完全一致，直接复用数据库），12 条路由已对齐。
> 分层：`handler`（路由/解析）→ `service`（业务）→ `repository`（SQL）→ PostgreSQL。

### 🚀 启动命令（推送到服务器后直接跑）

```bash
cd apps/go
go mod tidy                                          # 自动下载依赖（lib/pq、google/uuid，纯 Go 无需装任何驱动）
go build -o backend ./backend/cmd/server             # 编译
DATABASE_URL=postgres://jason:123456@localhost:5432/jason ./backend   # 连服务器 Docker postgres，端口 3002
```

启动后测试：`curl http://localhost:3002/api/menus`

### 📋 说明

- **本地不用装 PostgreSQL**——代码推送到服务器后，服务器自动下包编译，连接服务器 Docker 里的 postgres（docker-compose 映射 5432，`localhost` 直连）
- **首次启动自动建表**：`database.Migrate` 跑 `schema_migrations` 幂等迁移（`CREATE TABLE IF NOT EXISTS`），安全可重复执行
- **与 Bun 共用数据**：Go 后端只读/写同一张 `menu` 表，替换 Bun 前可先并跑对比
- ⚠️ 唯一未对齐：Bun 的 JWT 权限过滤（`tree=true` 需登录）——Go 端暂未实现，留待阶段 3 学 JWT 时补
- 当前线上仍跑 Bun backend（`:3000`），Go 端是学习副本（`:3002`），功能对齐后即可替换

---

## 技术栈

### 前端 (learning / admin)
| 层 | 技术 |
|----|------|
| 框架 | Vue 3.6-beta + TypeScript |
| 路由 | vue-router 4 |
| 状态 | Pinia 3 |
| 样式 | Tailwind CSS v4 + Less |
| 动画 | GSAP / vue-konva (Canvas) |
| 构建 | Vite 7 |
| 代码高亮 | Prism.js |
| 代码生成 | commander + tsx |

### 后端
| 层 | 技术 |
|----|------|
| 运行时 | Bun |
| ORM | Drizzle ORM |
| 数据库 | PostgreSQL (Docker) |
| 部署 | Docker Compose |

### 共享包 (packages/)
| 包 | 内容 |
|----|------|
| `components` | 15+ Vue 3 组件：Button、Input、Select、Modal、Tree、Menu、Code、EditorLink、Nav、Link、message 等 |
| `utils` | 通用工具函数 + Tailwind 配置 + 主题色定义 |

> 详见 [packages/components/README.md](packages/components/README.md)

---

## 设计系统 — 赛博朋克 / 科技风

| 角色 | 颜色 | Tailwind |
|------|------|----------|
| 主色 | `#00ffff` | cyan |
| 辅色 | `#ff00ff` | fuchsia |
| 背景 | `#0a0a0f` / `#1a1a2e` | slate |
| 强调 | `#ff3333` | red |
| 成功 | `#00ff88` | emerald |

适用于管理后台及面向用户的页面。学习文档使用独立的 Tailwind 浅色主题（见 `doc-style` skill）。

---

## 🤖 AI Skills 速查

本项目在 `.claude/skills/` 下配置了 7 个 Skill，AI 可通过 `/skill-name` 调用：

| Skill | 类型 | 用途 |
|-------|------|------|
| `doc-style` | 规范 | **所有学习文档**的统一样式规范（布局/配色/组件/Tailwind）。DSA 文档还规定「开头结构图 + 结尾动画」两段式结构 |
| `dsa-diagram` | 规范 | 文档**开头**的静态 SVG 结构图规范（内联 SVG、配色、marker、before/after 操作示意图） |
| `dsa-visualizer` | 规范 | 文档**结尾**的 Canvas 动画规范。用 vue-konva 做数据结构操作动画（数组/链表/栈/队列/跳表等） |
| `openspec-propose` | 工作流 | 提出新变更的完整提案（proposal + design + tasks） |
| `openspec-apply-change` | 工作流 | 实施 OpenSpec 变更中的任务 |
| `openspec-archive-change` | 工作流 | 完成后归档变更 |
| `openspec-explore` | 工作流 | 进入探索模式，理清需求和设计方案 |

---

## 📊 进度追踪

**`PROGRESS.md`** 是全项目进度面板，记录每个子项目的完成状态和当前任务。
新 AI 会话启动后，读取 `README.md` + `PROGRESS.md` 即可接续工作。

**当前活跃任务：**
- 🎮 首要：Blitz 独立游戏开发（核心战斗原型 Phase 1）
- 📝 DSA 算法文档填充（模块 1-7 ✅ 含结构图+动画，模块 8-13 待填充）
- 🐹 Go 文档待填充（阶段 2-7，89 篇）

---

## 开发规范

1. TypeScript 优先
2. 前端组件用对应框架的函数式组件
3. 确保构建通过后再提交
4. 从 `packages/components` 引入共享组件，避免重复造轮子
5. Go 示例代码标注 `// 输出:` 注释
6. 学习文档遵循 `doc-style` skill 规范
7. DSA 文档开头必须插入 `📐 结构总览` section（静态 SVG 结构图，见 `dsa-diagram` skill）
8. DSA 文档适合加动画的必须在小结前插入 `🎬 动画演示` section（见 `dsa-visualizer` skill）
9. Blitz 的 `.gd` 脚本顶部必须标注对应的学习文档引用，文档中通过 EditorLink 反向关联源码
