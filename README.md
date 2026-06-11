# 🎮 Monorepo — 独立游戏开发助力文档

> 一切为了做独立游戏而铺路。用 Godot 做游戏，Go 写后端，Python 写工具——边做边学，全部沉淀为结构化学习文档。

## 项目定位

这不是一个传统 monorepo，而是一个**独立游戏开发者的知识库 + 学习系统**。每个 `apps/` 子项目对应做独立游戏时需要的技术栈：

| 技术 | 项目 | 用途 |
|------|------|------|
| 🎮 Godot (GDScript) | 游戏引擎 | 做 2D/3D 游戏本体 |
| 🐹 Go | `apps/go/` | 游戏后端、高并发服务、网络层 |
| 🐍 Python | `apps/python/` | 自动化工具、数据处理、快速原型 |
| 🌐 Vue 3 | `apps/learning/` | 把学到的知识做成结构化文档网站 |
| ⚙️ Bun + PG | `apps/backend/` | 文档网站的后端 API |

**核心循环:** 做游戏 → 需要技术 → 学 → 写文档沉淀 → 文档反哺开发效率

## 项目结构

```
monorepo/
├── apps/
│   ├── go/                # Go 学习 — 7 阶段 108 篇文档+代码（后端/并发/微服务）
│   ├── python/            # Python 学习 — 5 阶段 20 个项目（工具/爬虫/Web/数据库）
│   ├── learning/           # 学习网站 (Vue 3 + Pinia + Tailwind) — 承载所有文档
│   ├── backend/            # 后端 API (Bun + Drizzle + PostgreSQL)
│   ├── admin/              # 管理后台 (Vue 3 + Element Plus)
│   └── main/               # 个人主页 (Vue 3 + GSAP 赛博朋克风)
├── packages/               # 共享组件库（Code、EditorLink、Nav、Tree 等）
├── openspec/               # AI 辅助开发工作流（提案 → 设计 → 任务 → 实施）
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

## 学习路线

### 🐹 Go 语言（7 阶段）

```
阶段1 基础入门 (19 篇 ✅) → 阶段2 并发编程 (13 篇) → 阶段3 Web 开发 (16 篇)
→ 阶段4 数据库 (14 篇) → 阶段5 微服务 (16 篇) → 阶段6 工程化 (15 篇)
→ 阶段7 进阶 (15 篇)
```

**进度:** 19/108 篇文档，29/108 个代码文件。详见 [PROGRESS.md](PROGRESS.md)

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

### 🎮 Godot（规划中）

学习路径将在 `apps/learning/` 中建立，涵盖 GDScript、场景系统、信号机制、物理引擎、着色器等。

## AI 增强开发工作流 (OpenSpec)

本项目使用 **OpenSpec** 进行 AI 辅助的规范化开发——写提案、做设计、拆任务、实施验证一气呵成。

```
/opsx:propose   → 创建变更提案（proposal + design + tasks）
/opsx:apply     → 按 tasks 逐项实施
/opsx:archive   → 完成后归档
/opsx:explore   → 进入探索模式，理清需求
```

配置见 [openspec/config.yaml](openspec/config.yaml)，使用说明见下方常用命令区。

## 常用命令

### 开发

| 命令 | 说明 |
|------|------|
| `pnpm install` | 安装所有依赖 |
| `pnpm learning:dev` | 启动学习网站 |
| `pnpm admin:dev` | 启动管理后台 |
| `pnpm main:dev` | 启动个人主页 |
| `pnpm backend:dev` | 启动后端 (Docker) |

### Go 学习

```bash
cd apps/go
go run . 1              # 运行阶段1
go run . 2 goroutine    # 运行阶段2 goroutine 主题
go run . all            # 运行全部
```

### OpenSpec AI 工作流

```bash
openspec new change "<变更名>"              # 创建变更
openspec status --change "<变更名>"         # 查看状态
openspec instructions <artifact> --change "<变更名>"  # 获取 artifact 指令
```

### Docker 部署

```bash
docker-compose up -d                    # 启动所有服务
docker-compose up -d backend postgres   # 仅后端+数据库
docker-compose ps                       # 查看状态
docker-compose logs -f backend          # 查看后端日志
docker-compose down                     # 停止
```

## 数据库同步

### 本地 → 服务器

```bash
docker exec postgres pg_dump -U jason -d jason -Fc -f /tmp/jason.dump
docker cp postgres:/tmp/jason.dump ./jason.dump
scp ./jason.dump root@47.108.233.237:/tmp/jason.dump
# 服务器上:
docker cp /tmp/jason.dump postgres:/tmp/jason.dump
docker exec postgres pg_restore -U jason -d jason --clean --if-exists --no-owner --no-privileges /tmp/jason.dump
docker restart backend-app
```

### 服务器 → 本地

```bash
# 服务器导出后:
scp root@47.108.233.237:/tmp/jason.dump ./jason.dump
docker cp ./jason.dump postgres:/tmp/jason.dump
docker exec postgres pg_restore -U jason -d jason --clean --if-exists --no-owner --no-privileges /tmp/jason.dump
docker-compose restart backend
```

## 技术栈

### 前端
- **框架**: Vue 3 + TypeScript
- **样式**: Tailwind CSS v4 + Less
- **状态**: Pinia
- **动画**: GSAP (main 项目)
- **构建**: Vite

### 后端
- **运行时**: Bun
- **ORM**: Drizzle ORM
- **数据库**: PostgreSQL
- **部署**: Docker Compose

### 共享包
- **components**: 通用组件库（Code、EditorLink、Nav、Tree、Modal 等）
- 见 [packages/components/README.md](packages/components/README.md)

## 设计系统 — 赛博朋克 / 科技风

| 角色 | 颜色 | Tailwind |
|------|------|----------|
| 主色 | `#00ffff` | cyan |
| 辅色 | `#ff00ff` | fuchsia |
| 背景 | `#0a0a0f` / `#1a1a2e` | slate |
| 强调 | `#ff3333` | red |
| 成功 | `#00ff88` | emerald |

适用于 `apps/main` 及所有面向用户的页面。学习文档使用独立的 Tailwind 浅色主题（见 `go-doc-style` skill）。

## 开发规范

1. TypeScript 优先
2. 前端组件用对应框架的函数式组件
3. 确保构建通过后再提交
4. 从 `packages/components` 引入共享组件，避免重复造轮子
5. Go 示例代码标注 `// 输出:` 注释
6. 学习文档遵循 `go-doc-style` skill 规范
