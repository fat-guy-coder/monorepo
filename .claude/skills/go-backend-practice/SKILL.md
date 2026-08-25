---
name: go-backend-practice
description: Go 学习驱动规则——「能塞进 backend 就塞进去」。用真实项目 apps/go/backend 驱动学习：三档消化法（A档塞 backend / B档 playground / C档跑 demo），阶段3 Web 开发知识基本全部塞进 backend。用户继续填 Go 文档、给 backend 加功能、进入 Web 开发阶段时遵循。
metadata:
  version: "1.0"
  dependsOn: "doc-style"
---

# Go 学习驱动规则（go-backend-practice）

> 用户学 Go 的方法论：**用真实项目（`apps/go/backend`）驱动学习，文档当军规查，playground 当训练场。**
> 学习方法全文见 `apps/go/LEARNING_METHOD.md`（网页版：学习网站「GO → GO 学习方法」）。

## 黄金规则

**能塞进 backend 就塞进去。**

- 后端学习项目：`apps/go/backend/`——分层骨架已建（`cmd/server` + `internal/{handler,service,repository,model}`），net/http 标准库，端口 3002，接口与 `apps/backend`（Bun 版）对齐
- 判断标准：这个知识点能不能在真实后端服务里用出来？
  - **能** → 故意塞进 backend，用真实场景暴露坑（A 档）
  - **不能但值得动手练** → playground 写小变体（B 档）
  - **纯理解型** → 跑 demo + 改参数看懂就够（C 档）

## 阶段映射（A 档扩展规则）

| 文档阶段 | 知识点 | 落点 |
|----------|--------|------|
| 阶段 1 基础 | struct / json / 接口 / 错误处理等 | backend 主体代码 |
| 阶段 2 并发 | context / sync.Map / errgroup / channel 限流 / atomic / race | 故意塞进 backend（见三档） |
| **阶段 3 Web 开发** | 框架路由、中间件、JWT、CORS、限流、WebSocket、优雅关停、日志、配置、数据库、模板、Swagger 等 | **基本全部塞进 backend** |

> 📌 **阶段 3 规则（用户明确决策）**：Web 开发阶段的知识点基本都是通用后端服务——用户做了很久前端，对这些服务已经很清楚。所以**不细分 A/B/C，基本全塞进 `apps/go/backend`**，用真实服务落地，学得最牢。

## 三档消化法（怎么判断）

### A 档 — 故意塞进 backend 的并发（在真实项目里才暴露坑）

| 并发主题 | 塞进 backend 的玩法 |
|----------|---------------------|
| context | 请求超时 / 取消中间件 |
| sync.Map | 菜单缓存（读多写少，教科书场景） |
| errgroup | 并行查「菜单树 + 计数」再聚合 |
| channel + select | 限流器（token bucket） |
| atomic | 请求计数器 / 统计 |
| race-detection | 用 `go run -race` 跑服务，观察竞态 |

> 💡 `http.ListenAndServe` 每个请求本身就是一个 goroutine——写第一个 handler 时已经在并发环境里了。

### B 档 — backend 塞不下，值得动手练 → playground 写小变体

泛型、反射、struct tag 深玩、errgroup / WaitGroup 自己重写一遍——这些去 playground，别硬造项目场景。

### C 档 — 跑 demo + 改参数看懂就够（理解型知识，别硬塞）

GMP 内部、goroutine 泄漏 + pprof、sync.Pool、select 多路复用——看动画 + 改 demo 输出就够。

## 怎么跑单个 demo（用户练习用）

```bash
cd apps/go
go run . 1 json        # 阶段1 主题（runner 子串匹配）
go run . 2 syncmap     # 阶段2 主题
go run playground/channel_demo.go   # playground 单文件（package main）
```

规则：
- demo 的 .go 是 `package basics` / `package concurrency`（不是 main 包），不能直接 `go run 单文件.go`，走 `main.go` + `runner.go` 调度
- runner 是**子串匹配**，具体关键词的 case 必须排在宽泛关键词前面（如 `reflection` 含 `io`，要排到 `io` 前面）
- playground 文件必须 `package main` + 一个 `main()`，**文件名别用 `_test` 后缀**（`go run` 会忽略 `*_test.go`，跑起来没输出）

## 给 AI 的行为指引

当用户说「继续填 Go 文档」「给 backend 加 XX」「到 Web 开发阶段了」时：

1. 先判断该知识点属于 A/B/C 哪档（阶段 3 Web 开发默认全塞 A 档）
2. **A 档** → 在 `apps/go/backend/` 里落地实现（按现有分层结构加），文档里写「已塞进 backend 的玩法」
3. **B 档** → 在 `apps/go/playground/` 加练习文件，文档里写「playground 怎么练」
4. **C 档** → 跑 demo 验证输出，文档里写「跑 demo 改参数」
5. 文档本身遵循 **doc-style** skill（布局 / 配色 / 组件 / navList）
6. 给 backend 加功能时遵循现有分层（handler → service → repository → model），返回格式 `{ code: 0, data, message: "ok" }`
