# 🐹 Go 语言学习方法论

> 你有 TypeScript + 前端 + 计算机基础——Go 对你不是"学一门陌生语言"，而是"换一套写法"。
> 本文是**学习方法**，不是教程。教程在 `apps/learning` 的文档里，代码在 `apps/go/`。
> 网页版：学习网站「GO → GO 学习方法」`GOLearningMethod`，内容和本文一一对应。

## 核心结论：用真实项目驱动学习，文档当参考手册

| 方式 | 效果 | 说明 |
|------|------|------|
| ❌ 纯看文档 + 记忆 | 弱 | 记忆科学里这属于"被动输入"，3 天后忘一半 |
| ⚠️ 只看文档 + 跑 demo | 中 | 属于"演示级"，强于纯看，但弱于自己写 |
| ✅ 边写边学（用 Go 重写 backend） | 强 | "主动回忆 + 间隔重复"，写得越多记得越牢 |
| ✅ 单个练习文件验证小概念 | 中→强 | 遇到不懂的语法，用 playground 秒验证 + 改着玩 |

**一句话：文档是地图，不是路。路是你自己写出来的。**

---

## 为什么"用 Go 重写 backend"是最佳路径

1. **用得越多记得越牢**——写代码 = 主动回忆，大脑记忆最牢固的方式
2. **遇到真实问题才会深入**——写 API 时你会遇到"并发请求怎么安全处理""JSON 字段怎么命名""错误怎么传播"，这些是文档里看不会的
3. **有前端的对比锚点**——你写 Go 接口时，大脑会自动对比"这在 Express/Bun 里怎么写"，形成双通道记忆

---

## 关键认识：不同知识，消化方式不同（三档）

menu CRUD 是纯 I/O bound，**天然用不上并发**——阶段 2 的知识不会在 backend 里自然出现。
所以不能"只用项目学"，要按"能不能塞进真实项目"把知识分三档：

### A 档 — 故意塞进 backend 的并发（在真实项目里才暴露坑）

| 并发主题 | 塞进 backend 的玩法 |
|----------|---------------------|
| go-2-8 context | 请求超时/取消中间件 |
| go-2-14 sync.Map | 菜单缓存（读多写少，教科书场景） |
| go-2-12 errgroup | 并行查「菜单树 + 计数」再聚合 |
| go-2-2 / go-2-3 channel + select | 限流器（token bucket） |
| go-2-7 atomic | 请求计数器/统计 |
| go-2-10 race-detection | 用 `go run -race` 跑服务，观察竞态 |

> 💡 `http.ListenAndServe` 每个请求本身就是一个 goroutine——你写第一个 handler 时已经在并发环境里了。

> 📌 **铁律：能塞进 backend 就塞进去**——不只是并发。到 **Web 开发阶段（go-3-x-web）**，那部分知识基本都是通用后端服务（框架路由、中间件、JWT、CORS、限流、WebSocket、优雅关停、日志、配置、数据库、模板、Swagger），你做了很久前端、对这些服务已经很熟，**基本全塞进 backend**，不再细分档位——用真实服务落地，学得最牢。

### B 档 — backend 塞不下，但值得动手练的 → playground 写小变体
泛型 go-1-20、反射 go-1-22、struct tag 深玩 go-1-11、errgroup / WaitGroup 自己重写一遍

### C 档 — 跑 demo + 改参数看懂就够（理解型知识，别硬造项目场景）
GMP 内部 go-2-1、goroutine 泄漏 + pprof go-2-13、sync.Pool go-2-11、select 多路复用 go-2-3

---

## 文档的正确用法（不是背，是查 + 主动回忆）

### 3 步主动回忆法（对阶段 2 尤其重要）

```
1. 看 doc 的执行流程 + 类比（搞懂"为什么"）
2. go run . 2 xxx 看真实输出（验证 demo）
3. 改一处代码 → 预测输出 → 再跑（主动回忆，这步才是杠杆）
```

### 写 API 时当"军规"查

| 遇到问题 | 翻哪篇 |
|----------|--------|
| 结构体标签怎么写给 JSON 序列化 | go-1-11-structs |
| 多个请求并发怎么办 | go-2-2-channels |
| 错误怎么传播给调用方 | go-1-16-error-handling |
| 怎么写接口让测试容易替换 | go-1-13-methods-interfaces |

**先写，卡住了再查文档**——文档里的内容以"解决问题"的方式进入长期记忆。

---

## 推荐学习路径（阶段）

```
第 1 阶段：用 Go 重写 backend 的菜单 CRUD（先 net/http 标准库）✅ 已完成分层骨架
  → 学：struct、json、http.Handler、路由、map 存内存数据
  → 对照文档：go-1-11-structs（结构体标签）、go-1-15-strings（字符串处理）

第 1.5 阶段：给 backend 加并发（立即动手）
  → 加 sync.Map 缓存层 + context 超时中间件 → 把并发最实用的两个概念捡起来
  → 对照文档：go-2-14-sync-map、go-2-8-context

第 2 阶段：换成 Gin/Echo 框架 + 连 PostgreSQL（= 文档的 Web 开发阶段 go-3-x-web）
  → 学：框架路由、中间件、JWT、CORS、限流、WebSocket、优雅关停、日志、配置、database/sql 或 GORM、模板、Swagger
  → 对照文档：go-3-x-web（Web 开发阶段）
  → 📌 规则：这一阶段的通用后端服务**基本全塞进 backend**——能塞就塞，不再分档（见「三档」铁律）

第 3 阶段：并发进阶
  → 学：goroutine 处理并发请求、sync.Mutex 保护计数、channel 做限流、errgroup 并行聚合
  → 对照文档：go-2-x-concurrency（并发阶段）

第 4 阶段：重构为分层架构 + 测试
  → 学：接口抽象、依赖注入、单元测试、go run -race
  → 对照文档：go-6-x-engineering（工程化阶段）
```

**关键心态**：不要一上来就追求"完美 Go 项目"。先用最小代码把 `/api/menus` 用 Go 跑起来——能 `curl` 到数据就算赢。后面再逐步加。

---

## 单个练习文件怎么跑

`apps/go/` 下的示例文件都是 `package basics` / `package concurrency`（不是 `package main`），靠 `main.go` + `runner.go` 统一调度。所以直接 `go run 单个文件.go` 会报错：`cannot run non-main package`。

### 方案 A：用现成调度器（看已有示例）

```bash
cd apps/go
go run . 2 channels      # 阶段2 的 channels
go run . 2 mutex         # 阶段2 的 mutex
go run . 1 pointers      # 阶段1 的指针
```

**主题只输关键词即可**（runner 是子串匹配，`go run . 2 chan`、`go run . 1 json` 都行）。可用主题：

| 阶段 | 主题关键词 |
|------|-----------|
| 1 基础 | env, variables, operators, fmt, control, functions, defer, arrays, maps, pointers, structs, new, methods, packages, strings, errors, time, file, testing, generics, json, reflection |
| 2 并发 | goroutines, channels, select, timer, mutex, wg, atomic, context, patterns, race, pool, errgroup, leak, syncmap |

> ❓ 为什么不能直接 `go run 单个文件.go`？因为 demo 都是 `package basics` / `package concurrency`（不是 `package main`），要经过 `main.go` + `runner.go` 调度。直接跑会报 `cannot run non-main package`。

### 方案 B：playground 目录（推荐——自己写练习用）

`apps/go/playground/` 已建好，`channel_demo.go` 是可直接跑的示例。写独立 `package main` 文件：

```go
package main

import "fmt"

func main() {
	ch := make(chan int, 2)
	ch <- 1
	ch <- 2
	fmt.Println("收到:", <-ch)
}
```

```bash
cd apps/go
go run playground/channel_demo.go   # 单独跑这个文件
```

**规则：**
- 文件写 `package main` + 一个 `main()`
- ⚠️ **文件名别用 `_test` 后缀**——`go run` 会忽略 `*_test.go`，跑起来没输出
- 把 demo 里想练的片段抄进来、改成 main，就能改着玩

**关于"实时"：** Go 没有 vite 那种热更新，但 demo 编译毫秒级，改完 ↑ 键重跑即可；想要自动监听可装 `watchexec -e go -- go run . 2 channels`（可选）。

### 方案 C：临时改造已有示例

```bash
cd apps/go
sed 's/package concurrency/package main/' concurrency/go-2-5-sync-mutex.go > /tmp/mutex_demo.go
# 手动把 RunMutex() 改成 main()，然后：
cd /tmp && go run mutex_demo.go
```

---

## 常见学习误区

- ❌ **别只靠背文档**——文档是地图，不是路
- ❌ **别只看文档 + 跑 demo 就以为会了**——那是"演示级"，自己改过代码才算数
- ❌ **别上来就啃 microservices/advanced**——那是阶段 5-7 的事，写 API 用不到
- ❌ **别把前后端混在一起学**——先专注把 Go 后端写好，前端那套你已经会了
- ❌ **别追求"完美代码"**——先跑起来，再重构。V1 能用就行

---

## 建议的每周节奏

```
周一：看 1-2 篇文档（当预习，不背）
周二~周四：把文档里的概念用 playground 验证 + 在 backend 重写里用出来
周五：对照文档 review 自己写的代码，查漏补缺
周末：跑一遍 backend，curl 验证，巩固
```

> 💡 最终目标：**用 Go 重写 backend 后，你会发现——并发、接口、错误处理这些"文档里抽象的概念"，已经在你的肌肉记忆里了。**
