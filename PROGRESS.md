# 🐹 GO 学习路线图 — 开发进度

> 更新时间: 2026-06-02

## 整体进度

| 阶段 | 前端 .vue | Go .go | EditorLink | 状态 |
|------|-----------|--------|------------|------|
| 阶段1 基础 | 19/19 ✅ | 19/19 ✅ | ✅ | **完成** |
| 阶段2 并发 | 0/13 | 4/13 (stub) | — | 待开始 |
| 阶段3 Web | 0/16 | 3/16 (stub) | — | 待开始 |
| 阶段4 数据库 | 0/14 | 0/14 (stub) | — | 待开始 |
| 阶段5 微服务 | 0/16 | 3/16 (stub) | — | 待开始 |
| 阶段6 工程化 | 0/15 | 0/15 (stub) | — | 待开始 |
| 阶段7 进阶 | 0/15 | 0/15 (stub) | — | 待开始 |
| **合计** | **19/108** | **29/108** | — | 17.6% |

## 阶段 1 — 基础入门 ✅

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

## 路径对应关系

| 前端文档 | Go 源码 |
|----------|---------|
| `apps/learning/src/views/backend/BackendLanguage/GO/go-stage-X-*/go-X-Y-*.vue` | `apps/go/*/go-X-Y-*.go` |

- 阶段目录: `go-stage-1-basics` → `apps/go/basics/`
- 阶段目录: `go-stage-2-concurrency` → `apps/go/concurrency/`
- 阶段目录: `go-stage-3-web` → `apps/go/web/`
- 阶段目录: `go-stage-4-database` → `apps/go/database/`
- 阶段目录: `go-stage-5-microservices` → `apps/go/microservices/`
- 阶段目录: `go-stage-6-engineering` → `apps/go/engineering/`
- 阶段目录: `go-stage-7-advanced` → `apps/go/advanced/`

## 组件与工具

| 组件 | 位置 | 用途 |
|------|------|------|
| `Code` | `packages/components/src/components/Code/` | 代码高亮展示 |
| `EditorLink` | `packages/components/src/components/EditorLink/` | admin 专属：一键跳转 Cursor 打开 .go 文件 |

### EditorLink 权限流程

```
App.vue mount → getApiUserMe() → userStore.setUser()
→ provide('isAdmin', userStore.isAdmin)
→ EditorLink inject('isAdmin') → v-if="isAdmin"
```

仅 `username === 'admin'` 可见。
