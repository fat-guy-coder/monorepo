# 🎮 独立游戏开发助力文档项目

> 一切为了做独立游戏而铺路。Godot 做游戏，Go 写后端，Python 写工具。
> 学到的全部沉淀为结构化文档，反哺开发效率。

## 项目结构

```
monorepo/
├── apps/
│   ├── go/                # Go 学习（7 阶段 108 篇）— 游戏后端/并发/微服务
│   ├── python/            # Python 学习（5 阶段 20 项目）— 工具/爬虫/Web
│   ├── learning/          # 学习网站 (Vue 3 + Pinia + Tailwind)
│   ├── backend/           # 后端 API (Bun + Drizzle + PostgreSQL)
│   ├── admin/             # 管理后台 (Vue 3 + Element Plus)
│   └── main/              # 个人主页 (Vue 3 + GSAP 赛博朋克风)
├── packages/              # 共享组件库
├── openspec/              # AI 辅助开发工作流
│   ├── config.yaml        # 项目上下文 + artifact 规则（AI proposal 时会读取）
│   └── changes/           # 历史变更档案
└── docker-compose.yml
```

## AI 增强开发 (OpenSpec)

本项目配置了 OpenSpec 进行 AI 辅助的规范化开发。**openspec/config.yaml 已填充项目上下文**，AI 在创建 proposal/design/tasks 时会自动理解项目技术栈和约束。

### 工作流

```
/opsx:propose  → 提出变更，生成 proposal.md + design.md + tasks.md
/opsx:apply    → 按 tasks 逐项实施代码
/opsx:archive  → 完成后归档到 openspec/changes/
/opsx:explore  → 探索模式 — 理清需求再动手
```

### 可用的 Claude Code Skills

| Skill | 用途 |
|-------|------|
| `go-doc-style` | Go 学习文档 .vue 文件的统一样式规范（创建/编辑文档时必须遵循） |
| `openspec-propose` | 提出新变更的完整提案 |
| `openspec-apply-change` | 实施 OpenSpec 变更中的任务 |
| `openspec-explore` | 进入探索模式，理清需求和设计方案 |
| `openspec-archive-change` | 完成后归档变更 |

## 技术栈

### apps/learning - 学习网站
- **框架**: Vue 3 + TypeScript + Less
- **路由**: vue-router
- **状态管理**: Pinia
- **构建**: Vite

### apps/main - 个人主页
- **框架**: Vue 3 + TypeScript
- **样式**: Tailwind CSS v4
- **动画**: GSAP
- **设计**: 赛博朋克/科技风

### apps/backend - 后端 API
- **运行时**: Bun
- **框架**: 原生 HTTP 服务器
- **ORM**: Drizzle ORM
- **数据库**: PostgreSQL
- **端口**: 3000

### apps/go - Go 学习代码
- 7 阶段 108 篇 .go 文件，用 `go run . <stage> [topic]` 运行
- 详见 [PROGRESS.md](PROGRESS.md)
- 阶段1 基础（✅ 完成），阶段2-7 代码文件已建

### apps/python - Python 学习代码
- 5 阶段 20 个项目，从脚本工具到 Web 框架到数据库实战
- 详见 [apps/python/LEARNING_PATH.md](apps/python/LEARNING_PATH.md)

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm install` | 安装所有依赖 |
| `pnpm learning:dev` | 启动学习网站 |
| `pnpm backend:dev` | 启动后端 (Docker) |
| `pnpm main:dev` | 启动个人主页 |
| `pnpm admin:dev` | 启动管理后台 (8848) |
| `cd apps/go && go run . 1` | 运行 Go 阶段1 全部代码 |
| `cd apps/go && go run . 2 goroutine` | 运行 Go 阶段2 goroutine 主题 |
| `cd apps/go && go run . all` | 运行全部 Go 示例 |
| `docker-compose up -d` | 启动所有 Docker 服务 |
| `openspec new change "<name>"` | 创建变更提案目录 |

## 开发规范

1. 使用 TypeScript 进行开发
2. 前端组件使用对应框架的函数式组件
3. 样式使用 Tailwind CSS（优先 class，避免 `<style scoped>`）
4. 动画使用 GSAP + CSS (main 项目)
5. 确保构建通过后再提交代码
6. **优先使用 packages/components 共享组件**（Button, Input, Select, Modal, Tree, Menu, Code, EditorLink, Nav, Link, message 等）
7. **Go 学习文档遵循 go-doc-style skill 规范**
8. **学习网站页面跳转用 Link 组件或 goToByName()，不用 RouterLink**（需自动打开 tab + 展开菜单）

## 关键约定

### 学习网站
- 页面跳转：`inject('goToByName')` 或 `<Link :route="item.name">`，不用 `<RouterLink>`
- EditorLink 组件：`import { useUserStore } from '@/stores/userProfle'`，通过 props 传 `:is-admin="userStore.isAdmin"`
- Code 组件：`import { Code } from 'components'`，支持 go/bash/shell/text 语言

### Go 示例代码
- 每个输出语句紧接 `// 输出: ...` 注释
- 多行输出用多行注释标注
- 分支逻辑标注走哪个分支及原因
- 目的：不运行代码也能直接看懂结果，适合学习场景

### 后端 API
- 返回格式：`{ code: 0, data: ..., message: "ok" }`
- 菜单 API 支持 `?tree=true` 树形返回、`?flat=true` 扁平返回
- 权限判断：`/api/user/me` 返回 `roles: [{ id, name }]`

### OpenSpec 变更规范
- 提案前检查是否影响学习网站的菜单/路由/权限系统
- 涉及后端 API 变更标注部署顺序
- 技术决策需与现有技术栈一致
- 优先使用 packages/components 已有组件

## 设计规范

### 赛博朋克风 (apps/main)
| 名称 | 颜色 | 用途 |
|------|------|------|
| 主色 | `#00ffff` | 主强调色、链接、高亮 |
| 辅色 | `#ff00ff` | 次要强调、边框 |
| 警告 | `#ff3333` | 交互状态 |
| 成功 | `#00ff88` | 正面指示 |
| 背景深 | `#0a0a0f` | 主背景 |
| 背景中 | `#1a1a2e` | 次要背景 |

### 学习文档浅色主题 (apps/learning Go 文档)
参考 `.claude/skills/go-doc-style/SKILL.md`，白底 + 蓝灰渐变 + Tailwind CSS

## 工作区共享组件 (packages/components)

**优先使用工作区组件，避免重复造轮子**

```typescript
import { Button, Input, Select, Modal, Tree, Code, EditorLink, Nav, Link, message } from 'components'
```

| 组件 | 说明 |
|------|------|
| Button | 按钮 (default/primary) |
| Input | 输入框 |
| Select | 下拉选择 |
| Modal | 模态框 |
| Tree | 树形组件 |
| Menu | 菜单 |
| Code | 代码高亮（go/bash/shell/text/html/json/css） |
| EditorLink | admin 专属：一键跳转编辑器打开文件 |
| Nav | 页面内目录导航 |
| Link | 页面跳转（自动打开 tab + 展开菜单） |
| message | 消息提示 (success/error/warning/info) |

完整列表见 [packages/components/README.md](packages/components/README.md)

### 创建新组件

1. 在 `packages/components/src/components/` 下创建组件文件夹
2. 导出类型声明和组件
3. 在 `packages/components/src/components/index.ts` 中注册
4. 组件文档放在组件文件夹下的 readme.md
