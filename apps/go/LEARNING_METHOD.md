# 🐹 Go 语言学习方法论

> 你有 TypeScript + 前端 + 计算机基础——Go 对你不是"学一门陌生语言"，而是"换一套写法"。
> 本文是**学习方法**，不是教程。教程在 `apps/learning` 的文档里，代码在 `apps/go/`。

## 核心结论：用真实项目驱动学习，文档当参考手册

| 方式 | 效果 | 说明 |
|------|------|------|
| ❌ 纯看文档 + 记忆 | 弱 | 记忆科学里这属于"被动输入"，3 天后忘一半 |
| ✅ 边写边学（用 Go 重写 backend） | 强 | "主动回忆 + 间隔重复"，写得越多记得越牢 |
| ✅ 单个练习文件验证小概念 | 中 | 遇到不懂的语法，用 playground 秒验证 |

**一句话：文档是地图，不是路。路是你自己写出来的。**

---

## 为什么"用 Go 重写 backend"是最佳路径

1. **用得越多记得越牢**——写代码=主动回忆，大脑记忆最牢固的方式
2. **遇到真实问题才会深入**——写 API 时你会遇到"并发请求怎么安全处理""JSON 字段怎么命名""错误怎么传播"，这些是文档里看不会的
3. **有前端的对比锚点**——你写 Go 接口时，大脑会自动对比"这在 Express/Bun 里怎么写"，形成双通道记忆

---

## 推荐学习路径（4 个阶段）

```
第 1 阶段：用 Go 重写 backend 的菜单 CRUD（先 net/http 标准库）
  → 学：struct、json、http.Handler、路由、map 存内存数据
  → 对照文档：go-1-11-structs（结构体标签）、go-1-15-strings（字符串处理）

第 2 阶段：换成 Gin/Echo 框架 + 连 PostgreSQL
  → 学：框架路由、中间件、database/sql 或 GORM、环境变量
  → 对照文档：go-3-x-web（Web 开发阶段）

第 3 阶段：加并发（你的文档阶段2刚好派上用场）
  → 学：goroutine 处理并发请求、sync.Mutex 保护计数、channel 做限流
  → 对照文档：go-2-x-concurrency（并发阶段）

第 4 阶段：重构为分层架构（handler/service/repository）
  → 学：接口抽象、依赖注入、单元测试
  → 对照文档：go-6-x-engineering（工程化阶段）
```

**关键心态**：不要一上来就追求"完美 Go 项目"。先用最小代码把 `/api/menus` 用 Go 跑起来——能 `curl` 到数据就算赢。后面再逐步加。

---

## 文档的正确用法（不是背，是查）

你的文档阶段 1-2 已经写得很好了，**当"参考手册"用**：

- 写 API 时遇到"结构体标签怎么写给 JSON 序列化" → 翻 **go-1-11-structs**
- 遇到"多个请求并发怎么办" → 翻 **go-2-2-channels**
- 遇到"错误怎么传播给调用方" → 翻 **go-1-16-error-handling**
- 遇到"怎么写接口让测试容易替换" → 翻 **go-1-13-methods-interfaces**

**先写，卡住了再查文档**——这样文档里的内容会以"解决问题"的方式进入长期记忆。

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

### 方案 B：playground 目录（推荐——自己写练习用）

建 `apps/go/playground/` 目录，写独立 `package main` 文件：

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
cd apps/go/playground
go run channel_test.go    # 单独跑这个文件
```

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
