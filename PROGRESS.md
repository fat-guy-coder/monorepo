# 🐹 GO 学习路线图 — 开发进度

> 更新时间: 2026-06-02

## 整体进度

| 阶段 | 前端 .vue | Go .go | EditorLink | 状态 |
|------|-----------|--------|------------|------|
| 阶段1 基础 | 19/19 | 19/19 | ✅ | ✅ 完成 |
| 阶段2 并发 | 0/13 | 4/13 | — | 待开始 |
| 阶段3 Web | 0/16 | 3/16 | — | 待开始 |
| 阶段4 数据库 | 0/14 | 0/14 | — | 待开始 |
| 阶段5 微服务 | 0/16 | 3/16 | — | 待开始 |
| 阶段6 工程化 | 0/15 | 0/15 | — | 待开始 |
| 阶段7 进阶 | 0/15 | 0/15 | — | 待开始 |
| **合计** | **19/108** | **29/108** | — | 17.6% |

## 阶段 1 — 基础入门 ✅ 完成

| 节 | 主题 | .vue | .go | EditorLink |
|----|------|------|-----|------------|
| 1-1 | 环境搭建与工具链 | ✅ | ✅ | ✅ |
| 1-2 | 变量、常量与数据类型 | ✅ | ✅ | ✅ |
| 1-3 | 运算符与表达式 | ✅ | ✅ | ✅ |
| 1-4 | fmt 格式化输入输出 | ✅ | ✅ | ✅ |
| 1-5 | 控制结构 (if/for/switch/goto) | ✅ | ✅ | ✅ |
| 1-6 | 函数基础 | ✅ | ✅ | ✅ |
| 1-7 | 函数进阶 (defer/闭包/panic) | ✅ | ✅ | ✅ |
| 1-8 | 数组与切片 | ✅ | ✅ | ✅ |
| 1-9 | Map 映射 | ✅ | ✅ | ✅ |
| 1-10 | 指针 | ✅ | ✅ | ✅ |
| 1-11 | 结构体 | ✅ | ✅ | ✅ |
| 1-12 | new 与 make | ✅ | ✅ | ✅ |
| 1-13 | 方法与接口 | ✅ | ✅ | ✅ |
| 1-14 | 包管理与模块 | ✅ | ✅ | ✅ |
| 1-15 | 字符串与 rune | ✅ | ✅ | ✅ |
| 1-16 | 错误处理 | ✅ | ✅ | ✅ |
| 1-17 | 时间处理 | ✅ | ✅ | ✅ |
| 1-18 | 文件 IO | ✅ | ✅ | ✅ |
| 1-19 | 测试基础 | ✅ | ✅ | ✅ |

## 阶段 2~7 🔜

- 所有 .go 文件结构已创建（共 89 个文件，其中 12 个有内容，其余为 stub）
- runner.go 全部更新为可编译状态
- .vue 文档待后续填充

## 路径对应关系

| 前端文档 | Go 源码 |
|----------|---------|
| `apps/learning/src/views/backend/BackendLanguage/GO/go-stage-X-*/go-X-Y-*.vue` | `apps/go/*/go-X-Y-*.go` |

阶段目录映射：
- `go-stage-1-basics` → `apps/go/basics/`
- `go-stage-2-concurrency` → `apps/go/concurrency/`
- `go-stage-3-web` → `apps/go/web/`
- `go-stage-4-database` → `apps/go/database/`
- `go-stage-5-microservices` → `apps/go/microservices/`
- `go-stage-6-engineering` → `apps/go/engineering/`
- `go-stage-7-advanced` → `apps/go/advanced/`

## 组件与工具

| 组件 | 位置 | 用途 |
|------|------|------|
| `Code` | `packages/components/src/components/Code/` | 代码高亮（支持 go/bash/shell/text） |
| `EditorLink` | `packages/components/src/components/EditorLink/` | admin 专属：一键跳转 Cursor 打开 .go 文件 |

### EditorLink 配置

`vite.config.ts` 通过 `__dirname` 推导 monorepo 根目录并注入：
```ts
// vite.config.ts 在 apps/learning/，往上两级即 monorepo 根
const workspaceRoot = resolve(__dirname, '../..').replace(/\\/g, '/')
define: { 'import.meta.env.VITE_WORKSPACE_ROOT': JSON.stringify(workspaceRoot) }
```
换电脑无需修改，自动适配当前项目路径。

## 技术规范

- **文档样式**: `.claude/skills/go-doc-style/SKILL.md` — Go 学习文档统一样式规范
- **Code 组件**: `import { Code } from 'components'` — 代码块首选方式
- **菜单数据**: `apps/backend/config/menus-go-roadmap.json` — 108 条菜单树
- **种子脚本**: `apps/backend/scripts/seed-menus.ts` — 通用批量导入器

## 如何恢复工作

在新电脑打开此文件，告诉我从哪个文档继续即可（例如"从 go-1-5-control-flow 继续填充 Vue 文档"）。
