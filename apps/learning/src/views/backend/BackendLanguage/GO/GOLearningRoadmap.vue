<template>
  <div class="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- 标题区域 -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
          Go 语言学习路线图
        </h1>
        <p class="mt-4 text-xl text-gray-500">
          从入门到全栈，每天 2-3 小时，历时约 24 周，系统掌握 Go 开发
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <span class="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">🐹
            Go 1.21+</span>
          <span
            class="px-4 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200">📦
            Go Modules</span>
          <span
            class="px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">⚡
            高并发</span>
          <span
            class="px-4 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm font-medium border border-orange-200">🌐
            微服务</span>
        </div>
      </div>

      <!-- 时间轴 -->
      <div class="relative">
        <!-- 纵向线条 -->
        <div class="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gray-200" aria-hidden="true"></div>

        <ul class="flex flex-col gap-12">
          <li v-for="stage in stages" :key="stage.id" class="relative pl-12 sm:pl-16">
            <!-- 时间轴圆点 -->
            <div
              class="absolute left-0 sm:left-2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center text-white text-sm font-bold"
              :class="stage.color" aria-hidden="true">
              {{ stage.icon }}
            </div>

            <!-- 阶段卡片 -->
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div class="p-6 sm:p-8">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h2 class="text-2xl font-bold text-gray-900">{{ stage.title }}</h2>
                  <span class="mt-2 sm:mt-0 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    ⏱ {{ stage.period }}
                  </span>
                </div>

                <p class="text-gray-600 mb-5 leading-relaxed">{{ stage.description }}</p>

                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-5">
                  <li v-for="(item, idx) in stage.items" :key="idx"
                    class="flex items-baseline gap-2 text-gray-700 text-sm">
                    <span
                      class="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-bold"
                      :class="stage.color">
                      {{ idx + 1 }}
                    </span>
                    <Link v-if="item.name" :route="item.name" :text="item.text" animation="none" size="small"
                      class="p-0! text-sm! font-normal! text-gray-700! hover:text-cyan-600! bg-transparent! border-none! inline!" />
                    <span v-else class="leading-relaxed">{{ item.text }}</span>
                  </li>
                </ul>

                <!-- 实战项目 -->
                <div class="mt-4 p-4 rounded-xl border-2 border-dashed"
                  :class="stage.color.replace('bg-', 'border-').replace('-500', '-300') + ' ' + stage.color.replace('bg-', 'bg-').replace('-500', '-50')">
                  <p class="text-sm font-semibold text-gray-800">{{ stage.project }}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- 底部资源区 -->
      <div class="mt-16 max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 class="text-xl font-bold text-gray-900 mb-6">📚 推荐学习资源</h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- 官方资源 -->
            <div>
              <h4 class="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">🏛️ 官方</h4>
              <ul class="space-y-2 text-sm text-gray-600">
                <li><a href="https://go.dev/doc/" target="_blank" class="hover:text-blue-600 underline">Go 官方文档</a></li>
                <li><a href="https://go.dev/tour/" target="_blank" class="hover:text-blue-600 underline">A Tour of
                    Go（交互式教程）</a></li>
                <li><a href="https://go.dev/play/" target="_blank" class="hover:text-blue-600 underline">Go
                    Playground</a></li>
                <li><a href="https://pkg.go.dev/" target="_blank" class="hover:text-blue-600 underline">Go 包文档索引</a>
                </li>
                <li><a href="https://go.dev/doc/effective_go" target="_blank"
                    class="hover:text-blue-600 underline">Effective Go</a></li>
              </ul>
            </div>

            <!-- 书籍推荐 -->
            <div>
              <h4 class="text-sm font-semibold text-green-600 uppercase tracking-wide mb-3">📖 经典书籍</h4>
              <ul class="space-y-2 text-sm text-gray-600">
                <li>• 《The Go Programming Language》- Alan Donovan</li>
                <li>• 《Go 语言设计与实现》- draveness</li>
                <li>• 《Concurrency in Go》- Katherine Cox-Buday</li>
                <li>• 《Go Web Programming》- Sau Sheong Chang</li>
                <li>• 《Cloud Native Go》- Matthew A. Titmus</li>
              </ul>
            </div>

            <!-- 实战资源 -->
            <div>
              <h4 class="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">🛠️ 实战平台</h4>
              <ul class="space-y-2 text-sm text-gray-600">
                <li><a href="https://github.com/golang-standards/project-layout" target="_blank"
                    class="hover:text-purple-600 underline">标准项目布局</a></li>
                <li><a href="https://gobyexample.com/" target="_blank" class="hover:text-purple-600 underline">Go by
                    Example</a></li>
                <li><a href="https://exercism.org/tracks/go" target="_blank"
                    class="hover:text-purple-600 underline">Exercism Go 练习</a></li>
                <li><a href="https://github.com/avelino/awesome-go" target="_blank"
                    class="hover:text-purple-600 underline">awesome-go 精选库</a></li>
                <li><a href="https://quii.gitbook.io/learn-go-with-tests" target="_blank"
                    class="hover:text-purple-600 underline">Learn Go with Tests</a></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 本仓库路径提示 -->
        <div class="mt-6 p-4 bg-linear-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <p class="text-sm text-gray-700 text-center">
            💡 <span class="font-semibold">本地练习：</span>
            路线图示例代码位于 <code class="px-1.5 py-0.5 bg-white rounded text-blue-700 text-xs font-mono">apps/go/src/</code>，
            按阶段分文件夹，进入对应目录运行 <code
              class="px-1.5 py-0.5 bg-white rounded text-blue-700 text-xs font-mono">go run .</code> 即可查看输出。
            前端学习页面 + Go 源码项目联动学习！
          </p>
        </div>

        <div class="mt-6 text-center text-sm text-gray-400">
          建议按照阶段顺序学习，每个阶段完成后动手做实战项目巩固。每天 2-3 小时，坚持约 24 周，你将成为合格的 Go 开发者 💪
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Link } from 'components'

interface StageItem {
  text: string
  name?: string // .vue 文件名（不含后缀），用于 Link 跳转
}

interface Stage {
  id: number
  title: string
  period: string
  description: string
  items: StageItem[]
  project: string
  color: string
  icon: string
}

const stages = ref<Stage[]>([
  {
    id: 1,
    title: '基础入门：语法与工具链',
    period: '第1-3周',
    description: '快速掌握 Go 的基本语法和开发环境，建立对静态类型编译型语言的感觉。',
    items: [
      { text: '安装 Go、配置 GOPATH/GOROOT 与 Go Modules', name: 'go-1-1-env-tools' },
      { text: '变量声明（var/:=）、基本数据类型、零值、类型转换', name: 'go-1-2-variables-types' },
      { text: '控制结构：if/else、for（唯一循环关键字）、switch、defer', name: 'go-1-5-control-flow' },
      { text: '函数：多返回值、命名返回值、可变参数、匿名函数与闭包', name: 'go-1-6-functions-basic' },
      { text: '数组、切片（slice）底层原理（len/cap）与容量增长机制', name: 'go-1-8-arrays-slices' },
      { text: 'map 的声明、遍历、删除与 sync.Map 的并发安全对比', name: 'go-1-9-maps' },
      { text: '指针（* 和 &）、结构体定义与匿名字段嵌入', name: 'go-1-10-pointers' },
      { text: '方法：值接收者 vs 指针接收者的选择原则', name: 'go-1-13-methods-interfaces' },
      { text: '接口（interface）：隐式实现、类型断言、空接口 any', name: 'go-1-13-methods-interfaces' },
      { text: '包与模块：go mod init/tidy/vendor、internal 包可见性', name: 'go-1-14-packages-modules' },
      { text: '单元测试与基准测试：testing 包、表格驱动测试、testify', name: 'go-1-19-testing' },
      { text: '字符串操作：strings/strconv 包、rune 与 UTF-8 编码', name: 'go-1-15-strings-rune' },
      { text: '错误处理：error 接口、errors.Is/As、fmt.Errorf 包装', name: 'go-1-16-error-handling' },
    ],
    project: '📌 实战：命令行 TODO 工具 — 支持增删改查、数据持久化到 JSON 文件',
    icon: '🔰',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: '并发编程：goroutine 与 channel',
    period: '第4-6周',
    description: '深入 Go 最核心的并发模型 — "不要通过共享内存来通信，而要通过通信来共享内存"。',
    items: [
      { text: 'goroutine 调度模型（GMP）与 runtime 基础', name: 'go-2-1-goroutine-gmp' },
      { text: 'channel 声明、缓冲/非缓冲区别、关闭与 range 遍历', name: 'go-2-2-channels' },
      { text: 'select 多路复用：default 非阻塞、超时控制、心跳', name: 'go-2-3-select' },
      { text: 'sync.Mutex / RWMutex：读写锁与竞态条件', name: 'go-2-5-sync-mutex' },
      { text: 'sync.WaitGroup、sync.Once、sync.Cond 使用场景', name: 'go-2-6-sync-wg-once' },
      { text: 'context 包：WithCancel/WithTimeout/WithDeadline/WithValue', name: 'go-2-8-context' },
      { text: '并发模式：生产者-消费者、扇入（fan-in）扇出（fan-out）', name: 'go-2-9-concurrency-patterns' },
      { text: '流水线模式（Pipeline）与错误传播', name: 'go-2-9-concurrency-patterns' },
      { text: '竞态检测：go run -race、go test -race', name: 'go-2-10-race-detection' },
      { text: 'sync/atomic 原子操作与无锁编程', name: 'go-2-7-atomic' },
      { text: 'sync.Pool 对象复用池，降低 GC 压力', name: 'go-2-11-sync-pool' },
      { text: 'goroutine 泄漏排查：pprof goroutine profile、runtime.NumGoroutine', name: 'go-2-13-goroutine-leak' },
      { text: 'errgroup 并发错误组：golang.org/x/sync/errgroup', name: 'go-2-12-errgroup' },
    ],
    project: '📌 实战：并发网页爬虫 — 爬取指定网站所有链接，支持并发数控制与结果去重',
    icon: '⚡',
    color: 'bg-green-500'
  },
  {
    id: 3,
    title: 'Web 开发：从标准库到主流框架',
    period: '第7-10周',
    description: '使用 Go 构建高性能 HTTP 服务，掌握中间件链与路由设计模式。',
    items: [
      { text: 'net/http 标准库：Server、Handler 接口、ServeMux 路由', name: 'go-3-1-net-http' },
      { text: '自定义 Handler 与中间件链（责任链模式）的实现', name: 'go-3-4-middleware' },
      { text: 'Gin 框架：路由分组、路径参数、查询参数、表单绑定', name: 'go-3-5-gin' },
      { text: '请求验证：go-playground/validator 与自定义验证器', name: 'go-3-6-gin-advanced' },
      { text: 'JSON/XML/Protobuf 序列化与响应渲染', name: 'go-3-7-json-serialization' },
      { text: '文件上传（单/多文件）、下载、静态文件服务', name: 'go-3-8-file-upload-download' },
      { text: 'RESTful API 设计：资源命名、版本控制、状态码规范', name: 'go-3-9-restful-api' },
      { text: 'JWT 鉴权流程：access token + refresh token 双 token 模式', name: 'go-3-11-jwt-auth' },
      { text: 'API 限流：令牌桶（golang.org/x/time/rate）与 IP 白名单', name: 'go-3-12-cors-rate-limit' },
      { text: 'CORS 跨域处理与安全 Header 中间件', name: 'go-3-12-cors-rate-limit' },
      { text: 'WebSocket：gorilla/websocket 实时双向通信', name: 'go-3-13-websocket' },
      { text: '优雅关停：signal.NotifyContext + http.Server.Shutdown', name: 'go-3-14-graceful-shutdown' },
      { text: 'html/template 模板渲染、embed 静态资源嵌入（Go 1.16+）', name: 'go-3-15-template-embed' },
      { text: 'Swagger/OpenAPI 文档自动生成（swaggo）', name: 'go-3-16-swagger' },
    ],
    project: '📌 实战：RESTful 博客 API — 文章 CRUD + 分类标签 + JWT 认证 + Swagger 文档',
    icon: '🌐',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    title: '数据库与存储',
    period: '第11-13周',
    description: '掌握主流数据库的 Go SDK 使用方法，学习缓存策略与数据一致性方案。',
    items: [
      { text: 'database/sql 标准接口：Open、Ping、QueryRow、Exec', name: 'go-4-1-database-sql' },
      { text: '连接池参数：SetMaxOpenConns、SetMaxIdleConns、SetConnMaxLifetime', name: 'go-4-2-connection-pool' },
      { text: 'GORM 快速入门：模型定义、AutoMigrate、CRUD、Hook', name: 'go-4-5-gorm-start' },
      { text: 'GORM 关联：HasOne/HasMany/BelongsTo/ManyToMany、预加载', name: 'go-4-6-gorm-association' },
      { text: '原生 SQL 与 sqlx：命名参数、结构体映射、批量操作', name: 'go-4-7-sqlx-native' },
      { text: 'MySQL 事务：ACID、隔离级别（读已提交/可重复读/串行化）', name: 'go-4-8-transactions' },
      { text: 'GORM 事务 + 嵌套事务 + SavePoint', name: 'go-4-8-transactions' },
      { text: 'Redis：go-redis v9，String/Hash/List/Set/ZSet 命令', name: 'go-4-9-redis-basics' },
      { text: '缓存策略：缓存穿透（布隆过滤器）、击穿（互斥锁）、雪崩（随机过期）', name: 'go-4-10-cache-strategy' },
      { text: 'Redis 分布式锁：SET NX EX + Lua 脚本解锁', name: 'go-4-11-distributed-lock' },
      { text: 'MongoDB：mongo-driver 连接、BSON、CRUD、聚合管道', name: 'go-4-12-mongodb' },
      { text: '数据库迁移：golang-migrate 创建/回滚迁移文件', name: 'go-4-13-migration' },
      { text: 'pprof 分析慢查询 + 执行计划优化 + 索引策略', name: 'go-4-14-pprof-slow-query' },
    ],
    project: '📌 实战：电商库存系统 — 商品 SKU + Redis 库存扣减 + MySQL 订单持久化 + 分布式锁防超卖',
    icon: '🗄️',
    color: 'bg-yellow-500'
  },
  {
    id: 5,
    title: '微服务与分布式系统',
    period: '第14-17周',
    description: '构建可扩展的微服务架构，掌握服务间 RPC 通信、治理与可观测性。',
    items: [
      { text: 'RPC 原理：序列化、传输协议、服务契约', name: 'go-5-1-rpc-protobuf' },
      { text: 'Protobuf 语法：message、enum、service、oneof、map', name: 'go-5-1-rpc-protobuf' },
      { text: 'gRPC：Unary RPC、Server Streaming、Client Streaming、Bidirectional', name: 'go-5-2-grpc-unary' },
      { text: 'gRPC 拦截器：UnaryInterceptor、StreamInterceptor（鉴权/日志/重试）', name: 'go-5-4-grpc-interceptor' },
      { text: 'gRPC 超时控制（Deadline）、重试策略与负载均衡（round_robin）', name: 'go-5-5-grpc-lb-retry' },
      { text: '服务注册与发现：Consul 健康检查 + gRPC 服务解析器', name: 'go-5-6-service-discovery' },
      { text: '配置中心：Viper 读取 YAML/ENV/远程配置 + 热更新', name: 'go-5-7-viper-config' },
      { text: '消息队列：RabbitMQ（amqp091-go）— 发布确认、消费 Ack、死信队列', name: 'go-5-8-mq-rabbitmq' },
      { text: 'Kafka：sarama 生产者/消费者、消费者组、分区策略', name: 'go-5-9-mq-kafka' },
      { text: '分布式链路追踪：OpenTelemetry SDK + Jaeger/Grafana Tempo', name: 'go-5-11-distributed-tracing' },
      { text: '熔断器：sony/gobreaker 或 sentinel-golang 降级策略', name: 'go-5-12-circuit-breaker' },
      { text: 'API 网关模式：路由转发、鉴权统一、限流、日志聚合', name: 'go-5-12-circuit-breaker' },
      { text: 'DDD 初步：分层架构（interface/app/domain/infra）', name: 'go-5-15-ddd-architecture' },
      { text: 'Docker：Dockerfile 多阶段构建、docker-compose 编排服务', name: 'go-5-16-docker' },
    ],
    project: '📌 实战：微服务商城 — 用户服务 + 商品服务 + 订单服务，gRPC 通信 + Kafka 异步 + Jaeger 追踪',
    icon: '🏗️',
    color: 'bg-red-500'
  },
  {
    id: 6,
    title: '工程化与项目实战',
    period: '第18-22周',
    description: '代码规范 → 测试体系 → 性能分析 → CI/CD，用真实项目锤炼交付能力。',
    items: [
      { text: '代码风格：gofmt、goimports、golangci-lint 配置与 Git Hook', name: 'go-6-1-code-style' },
      { text: 'Makefile / Taskfile 统一构建、测试、部署命令', name: 'go-6-3-makefile-taskfile' },
      { text: '错误处理进阶：自定义错误类型、errors.Is/As、%w 包装链', name: 'go-6-5-error-handling' },
      { text: '结构化日志：zap 高性能日志、zerolog 零分配日志', name: 'go-6-6-structured-logging' },
      { text: '日志切割：lumberjack 按大小/时间轮转', name: 'go-6-6-structured-logging' },
      { text: 'pprof 性能分析：CPU profile、heap profile、goroutine profile', name: 'go-6-7-pprof-cpu' },
      { text: 'trace 工具：追踪 goroutine 调度、GC、网络阻塞', name: 'go-6-9-trace' },
      { text: '火焰图解读与性能瓶颈定位', name: 'go-6-8-pprof-heap' },
      { text: '单元测试：表格驱动测试 + testify/suite + 覆盖率', name: 'go-6-10-table-driven-test' },
      { text: 'Mock 与集成测试：gomock/mockery、testcontainers-go', name: 'go-6-11-gomock' },
      { text: 'CI/CD Pipeline：GitHub Actions 自动化测试→构建→部署', name: 'go-6-14-cicd' },
      { text: '标准 Go 项目布局：cmd/internal/pkg/api + 依赖注入（wire）', name: 'go-6-2-project-layout' },
      { text: '配置管理：Viper + 环境变量 + .env + 12-Factor App', name: 'go-6-2-project-layout' },
    ],
    project: '📌 实战：前后端全栈后台管理系统 — Vue3 + Go Gin + GORM + PostgreSQL + Redis + Docker 部署',
    icon: '🚀',
    color: 'bg-indigo-500'
  },
  {
    id: 7,
    title: '进阶拓展：生态与底层',
    period: '第23-26周（持续学习）',
    description: '探索 Go 生态的深度领域，了解语言底层机制与前沿特性，向高级工程师迈进。',
    items: [
      { text: '泛型（Go 1.18+）：类型参数、约束（constraints）、泛型函数与类型', name: 'go-7-1-generics-basic' },
      { text: '反射机制：reflect 包、Type/Value、结构体标签解析', name: 'go-7-3-reflection' },
      { text: 'unsafe 包：指针转换、内存布局、与 C 语言互操作基础', name: 'go-7-4-unsafe' },
      { text: 'CGO：调用 C 库、导出 Go 函数给 C、内存管理边界', name: 'go-7-5-cgo' },
      { text: 'Go 内存管理：栈/堆分配、逃逸分析（-gcflags="-m"）、GC 原理', name: 'go-7-6-memory-allocation' },
      { text: '编译器优化：内联、逃逸分析、边界检查消除', name: 'go-7-9-inline-optimization' },
      { text: 'Go Plugin 与 WASM：编译为 WebAssembly 并在浏览器运行', name: 'go-7-11-wasm' },
      { text: '网络编程进阶：TCP/UDP 服务器、net.Poller、epoll/kqueue', name: 'go-7-12-network-deep' },
      { text: '源码阅读：net/http、sync、context 标准库核心实现', name: 'go-7-12-network-deep' },
      { text: '性能优化实战：benchstat 对比、分配优化、并发模式调优', name: 'go-7-13-performance' },
      { text: '代码生成：go generate、stringer、mockgen', name: 'go-6-13-go-generate' },
      { text: '安全编程：SQL 注入防护、XSS、CSRF、密钥管理', name: 'go-7-14-security' },
      { text: 'Go 版本管理：gvm / goenv 多版本共存与切换', name: 'go-7-14-security' },
    ],
    project: '📌 实战：高性能代理网关 — TCP/HTTP 代理 + 连接池 + 限流熔断 + 插件热加载 + 可观测性全链路',
    icon: '🧠',
    color: 'bg-pink-500'
  }
])
</script>
