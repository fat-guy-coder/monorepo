<template>
  <div class="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- 标题区域 -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
          Go 语言学习路线图
        </h1>
        <p class="mt-4 text-xl text-gray-500">
          从入门到全栈，每天 2-3 小时，系统掌握 Go 开发
        </p>
      </div>

      <!-- 时间轴 -->
      <div class="relative">
        <!-- 纵向线条 -->
        <div class="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gray-200" aria-hidden="true"></div>

        <ul class="flex flex-col gap-12">
          <li v-for="stage in stages" :key="stage.id" class="relative pl-12 sm:pl-16">
            <!-- 时间轴圆点 -->
            <div
              class="absolute left-0 sm:left-2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold"
              :class="stage.color" aria-hidden="true">
              {{ stage.id }}
            </div>

            <!-- 阶段卡片 -->
            <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div class="p-6 sm:p-8">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h2 class="text-2xl font-bold text-gray-900">{{ stage.title }}</h2>
                  <span class="mt-2 sm:mt-0 text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {{ stage.period }}
                  </span>
                </div>

                <p class="text-gray-600 mb-5 leading-relaxed">{{ stage.description }}</p>

                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  <li v-for="(item, idx) in stage.items" :key="idx" class="flex items-baseline gap-2 text-gray-700">
                    <span class="font-bold" :class="stage.color.replace('bg-', 'text-')">✓</span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- 底部提示 -->
      <div class="mt-16 text-center text-sm text-gray-400">
        建议按照阶段顺序学习，每个阶段完成后动手做一个小项目巩固。
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Stage {
  id: number
  title: string
  period: string
  description: string
  items: string[]
  color: string
}

const stages = ref<Stage[]>([
  {
    id: 1,
    title: '基础入门：语法与工具链',
    period: '第1-3周',
    description: '快速掌握 Go 的基本语法和开发环境，建立对静态类型编译型语言的感觉。',
    items: [
      '安装 Go、配置 GOPATH/GOROOT 与 Go Modules',
      '变量声明、基本数据类型、零值、类型转换',
      '控制结构：if、for、switch、defer 的用法',
      '函数：多返回值、命名返回值、可变参数、闭包',
      '数组、切片（slice）底层原理与容量增长',
      'map 与 sync.Map 的使用和性能对比',
      '指针、结构体与方法，值接收者 vs 指针接收者',
      '接口（interface）、类型断言与空接口',
      '包与模块管理：go mod init/tidy/vendor',
      '单元测试与基准测试：testing 包、表格驱动测试'
    ],
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: '并发编程：goroutine 与 channel',
    period: '第4-6周',
    description: '深入 Go 最核心的并发模型，这是区别于其他语言的关键能力。',
    items: [
      'goroutine 调度模型（GMP）与 runtime 基础',
      'channel 的声明、缓冲与非缓冲、关闭与遍历',
      'select 多路复用与超时控制',
      'sync 包：Mutex、RWMutex、WaitGroup、Once',
      'context 包：传递取消信号、超时、截止时间与值',
      '并发模式：生产者-消费者、扇入扇出、流水线',
      '并发安全：竞态检测（go run -race）与原子操作',
      'sync.Pool 与对象复用，降低 GC 压力',
      '并发场景的错误处理与 goroutine 泄漏排查'
    ],
    color: 'bg-green-500'
  },
  {
    id: 3,
    title: 'Web 开发：从标准库到主流框架',
    period: '第7-10周',
    description: '使用 Go 构建高性能 HTTP 服务，掌握中间件与路由设计。',
    items: [
      'net/http 标准库：Server、Handler、ServeMux',
      '路由分组与中间件链的实现思路',
      'Gin 框架：路由、参数绑定、验证、中间件',
      '请求与响应处理：JSON 序列化、文件上传下载',
      'RESTful API 设计规范与版本控制',
      'JWT 鉴权、API 限流与 CORS 处理',
      'WebSocket 简单聊天室实战',
      '优雅关停与信号监听（signal）',
      '模板渲染（html/template）与静态资源嵌入'
    ],
    color: 'bg-purple-500'
  },
  {
    id: 4,
    title: '数据库与存储',
    period: '第11-13周',
    description: '掌握主流数据库的 Go SDK 使用方法，并学习缓存策略。',
    items: [
      'database/sql 标准接口与连接池管理',
      'GORM 入门：模型定义、自动迁移、关联查询',
      '原生 SQL 与 SQLX 的对比使用场景',
      'MySQL 事务、隔离级别与 GORM 事务处理',
      'Redis：go-redis 客户端，缓存穿透/击穿/雪崩',
      'MongoDB 驱动基础操作与聚合查询',
      '数据库迁移工具（golang-migrate）',
      '连接池参数调优与 pprof 分析慢查询'
    ],
    color: 'bg-yellow-500'
  },
  {
    id: 5,
    title: '微服务与分布式系统',
    period: '第14-17周',
    description: '构建可扩展的微服务架构，掌握服务间通信与治理。',
    items: [
      'RPC 原理与 gRPC：protobuf 定义、代码生成',
      'gRPC 拦截器、超时重试与负载均衡',
      '服务注册与发现：consul/etcd 基础使用',
      '配置中心：viper 读取本地/远程配置',
      '消息队列：RabbitMQ/Kafka 的 Go 客户端实践',
      '分布式链路追踪：OpenTelemetry + Jaeger',
      'API 网关与限流熔断（如 sentinel-golang）',
      '微服务拆分原则与 DDD 初步',
      'Docker 容器化与多阶段构建'
    ],
    color: 'bg-red-500'
  },
  {
    id: 6,
    title: '工程化与项目实战',
    period: '第18-24周',
    description: '从代码规范到 CI/CD，用真实项目锤炼全栈交付能力。',
    items: [
      '代码风格：gofmt、goimports、golangci-lint',
      'Makefile 与 Taskfile 组织项目命令',
      '错误处理策略：wrap、sentinel error、error group',
      '日志规范：zap/zerolog 结构化日志',
      '性能分析：pprof、trace、火焰图解读',
      '单元测试、集成测试与 Mock（gomock）',
      'CI/CD：GitHub Actions 或 GitLab CI 部署 Go 服务',
      '项目结构布局：标准 Go 项目布局与内部 package 设计',
      '综合实战：前端 Vue3 + Go 后台管理系统（从零到上线）'
    ],
    color: 'bg-indigo-500'
  }
])
</script>
