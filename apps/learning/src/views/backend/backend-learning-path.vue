<template>
  <LearningPath
    title="后端开发学习路线图"
    description="从 Go 语言到分布式系统 · 高性能后端工程师的成长之路"
    :tags="[{ label: '🔷 Go', color: 'cyan' },{ label: '🗄️ 数据库', color: 'teal' },{ label: '⚡ Redis', color: 'red' },{ label: '📡 gRPC', color: 'indigo' },{ label: '🐳 DevOps', color: 'blue' }]"
    :phases="phases"
    footerText="预计全部完成需 10-14 个月 · Go 为主 Node.js 为辅 · 项目驱动"
  />
</template>

<script setup lang="ts">
import { LearningPath } from 'components'
import type { Phase } from 'components/LearningPath/index.vue'

const phases: Phase[] = [
  {
    id: 1, icon: '🔷', title: 'Go 语言基础', period: '4-6 周',
    desc: '掌握 Go 核心语法与并发模型。Go 的简洁设计使其成为后端开发的首选语言——学会它，就掌握了一把瑞士军刀。',
    color: 'bg-cyan-500',
    practice: '📌 实战：用 Go 编写一个 CLI 工具（TODO 管理器 + JSON 持久化）',
    modules: [
      { name: 'backend-1-a', label: '语法基础', topics: [
        { name: 'backend-1-a-1-env', label: '环境搭建与 Go Modules' },
        { name: 'backend-1-a-2-types', label: '变量、零值与类型系统' },
        { name: 'backend-1-a-3-control', label: '控制流与函数' },
      ]},
      { name: 'backend-1-b', label: '复合类型', topics: [
        { name: 'backend-1-b-1-slice', label: '数组与切片底层原理' },
        { name: 'backend-1-b-2-map', label: 'map 与 sync.Map' },
        { name: 'backend-1-b-3-struct', label: '结构体与方法' },
      ]},
      { name: 'backend-1-c', label: '接口与错误', topics: [
        { name: 'backend-1-c-1-interface', label: '接口：隐式实现与断言' },
        { name: 'backend-1-c-2-error', label: '错误处理最佳实践' },
      ]},
      { name: 'backend-1-d', label: '并发编程', topics: [
        { name: 'backend-1-d-1-goroutine', label: 'goroutine 与 GMP 模型' },
        { name: 'backend-1-d-2-channel', label: 'channel 通信模式' },
        { name: 'backend-1-d-3-sync', label: 'sync 包：Mutex/WaitGroup' },
        { name: 'backend-1-d-4-context', label: 'context 包深入' },
      ]},
    ]
  },
  {
    id: 2, icon: '🌐', title: 'Go Web 与 HTTP 服务', period: '6-8 周',
    desc: '从标准库到 Gin 框架，掌握 RESTful API 设计、JWT 鉴权和中间件架构。',
    color: 'bg-blue-500',
    practice: '📌 实战：构建一个博客 API（Gin + JWT + 中间件 + 参数验证）',
    modules: [
      { name: 'backend-2-a', label: 'HTTP 基础', topics: [
        { name: 'backend-2-a-1-net-http', label: 'net/http 标准库深入' },
        { name: 'backend-2-a-2-gin', label: 'Gin 框架：路由与中间件' },
        { name: 'backend-2-a-3-validation', label: '参数绑定与验证' },
      ]},
      { name: 'backend-2-b', label: '鉴权与安全', topics: [
        { name: 'backend-2-b-1-jwt', label: 'JWT 双 Token 模式' },
        { name: 'backend-2-b-2-rbac', label: 'RBAC 权限设计' },
        { name: 'backend-2-b-3-cors', label: 'CORS + 限流(令牌桶)' },
      ]},
      { name: 'backend-2-c', label: '实时通信', topics: [
        { name: 'backend-2-c-1-websocket', label: 'WebSocket 协议实战' },
        { name: 'backend-2-c-2-sse', label: 'SSE 服务端推送' },
      ]},
    ]
  },
  {
    id: 3, icon: '🗄️', title: '数据库设计与 ORM', period: '4-6 周',
    desc: '理解关系型数据库的存储、索引、事务原理。重点：为什么慢、怎么让它快。',
    color: 'bg-teal-500',
    practice: '📌 实战：设计电商数据库 Schema，编写核心 SQL 并分析 EXPLAIN 输出',
    modules: [
      { name: 'backend-3-a', label: 'SQL 深入', topics: [
        { name: 'backend-3-a-1-crud', label: 'CRUD 与 JOIN 类型' },
        { name: 'backend-3-a-2-window', label: '窗口函数与 CTE' },
        { name: 'backend-3-a-3-index', label: '索引原理与 EXPLAIN' },
      ]},
      { name: 'backend-3-b', label: '事务与设计', topics: [
        { name: 'backend-3-b-1-acid', label: 'ACID 与隔离级别' },
        { name: 'backend-3-b-2-mvcc', label: 'MVCC 原理' },
        { name: 'backend-3-b-3-normal', label: '范式化与反范式化' },
      ]},
      { name: 'backend-3-c', label: 'Go ORM', topics: [
        { name: 'backend-3-c-1-database-sql', label: 'database/sql 连接池' },
        { name: 'backend-3-c-2-gorm', label: 'GORM：关联/事务/Hook' },
        { name: 'backend-3-c-3-drizzle', label: 'Drizzle ORM 入门' },
      ]},
    ]
  },
  {
    id: 4, icon: '⚡', title: '缓存与消息队列', period: '4-6 周',
    desc: '让系统快一个数量级。掌握 Redis 缓存策略、分布式锁和 Kafka 消息队列。',
    color: 'bg-red-500',
    practice: '📌 实战：给博客 API 加 Redis 缓存层 + 用 Kafka 实现异步通知',
    modules: [
      { name: 'backend-4-a', label: 'Redis 核心', topics: [
        { name: 'backend-4-a-1-structs', label: '五种数据结构实战' },
        { name: 'backend-4-a-2-cache', label: '缓存策略：穿透/击穿/雪崩' },
        { name: 'backend-4-a-3-lock', label: '分布式锁 Redlock' },
      ]},
      { name: 'backend-4-b', label: '消息队列', topics: [
        { name: 'backend-4-b-1-kafka', label: 'Kafka 生产者/消费者' },
        { name: 'backend-4-b-2-patterns', label: '发布订阅与消费组' },
        { name: 'backend-4-b-3-reliability', label: '消息可靠性保证' },
      ]},
    ]
  },
  {
    id: 5, icon: '📡', title: '微服务与 gRPC', period: '6-8 周',
    desc: '当单体不够用时——理解服务拆分、RPC 通信和服务治理的核心模式。',
    color: 'bg-indigo-500',
    practice: '📌 实战：将博客 API 拆分为 user-service + post-service，gRPC 通信 + 网关',
    modules: [
      { name: 'backend-5-a', label: 'gRPC 深入', topics: [
        { name: 'backend-5-a-1-protobuf', label: 'Protobuf 定义与生成' },
        { name: 'backend-5-a-2-modes', label: '四种通信模式' },
        { name: 'backend-5-a-3-interceptor', label: '拦截器链设计' },
      ]},
      { name: 'backend-5-b', label: '服务治理', topics: [
        { name: 'backend-5-b-1-discovery', label: '服务注册与发现' },
        { name: 'backend-5-b-2-lb', label: '负载均衡策略' },
        { name: 'backend-5-b-3-circuit', label: '熔断降级与限流' },
      ]},
      { name: 'backend-5-c', label: '分布式理论', topics: [
        { name: 'backend-5-c-1-cap', label: 'CAP/PACELC 定理' },
        { name: 'backend-5-c-2-dist-tx', label: '分布式事务：Saga/TCC' },
        { name: 'backend-5-c-3-observability', label: '可观测性三件套' },
      ]},
    ]
  },
  {
    id: 6, icon: '🟢', title: 'Node.js 后端（选学）', period: '6-8 周',
    desc: 'TypeScript 全栈的另一种选择。掌握 Node.js 运行时、Express/Nest 框架和企业级实践。',
    color: 'bg-emerald-500',
    practice: '📌 实战：Nest.js + Prisma + PostgreSQL 构建一个 GraphQL API',
    modules: [
      { name: 'backend-6-a', label: 'Node.js 运行时', topics: [
        { name: 'backend-6-a-1-event-loop', label: '事件循环与 libuv' },
        { name: 'backend-6-a-2-stream', label: 'Stream 与 Buffer' },
        { name: 'backend-6-a-3-cluster', label: 'Cluster 多进程' },
      ]},
      { name: 'backend-6-b', label: '框架', topics: [
        { name: 'backend-6-b-1-express', label: 'Express 中间件模式' },
        { name: 'backend-6-b-2-nest', label: 'Nest.js 依赖注入' },
        { name: 'backend-6-b-3-prisma', label: 'Prisma ORM 实战' },
      ]},
    ]
  },
  {
    id: 7, icon: '🐳', title: '部署运维与 DevOps', period: '4-6 周',
    desc: '从开发到上线的最后一公里。掌握容器化、CI/CD 和云服务部署。',
    color: 'bg-blue-500',
    practice: '📌 实战：Docker Compose 编排全栈应用 + GitHub Actions 自动部署',
    modules: [
      { name: 'backend-7-a', label: '容器化', topics: [
        { name: 'backend-7-a-1-docker', label: 'Docker 多阶段构建' },
        { name: 'backend-7-a-2-compose', label: 'Docker Compose 编排' },
        { name: 'backend-7-a-3-k8s', label: 'Kubernetes 入门' },
      ]},
      { name: 'backend-7-b', label: 'CI/CD', topics: [
        { name: 'backend-7-b-1-actions', label: 'GitHub Actions 管道' },
        { name: 'backend-7-b-2-deploy', label: '部署策略：滚动/蓝绿' },
        { name: 'backend-7-b-3-monitor', label: '日志聚合与告警' },
      ]},
    ]
  },
  {
    id: 8, icon: '🏛️', title: '系统设计与架构', period: '4-6 周',
    desc: '从"会写代码"到"会设计系统"。学习架构模式、设计原则和 trade-off 分析。',
    color: 'bg-purple-500',
    practice: '📌 实战：设计一个短链系统 / 秒杀系统，写出完整的设计文档',
    modules: [
      { name: 'backend-8-a', label: '架构模式', topics: [
        { name: 'backend-8-a-1-patterns', label: '分层/六边形/事件驱动' },
        { name: 'backend-8-a-2-cqrs', label: 'CQRS 与 Event Sourcing' },
        { name: 'backend-8-a-3-ddd', label: 'DDD 领域驱动设计入门' },
      ]},
      { name: 'backend-8-b', label: '设计原则', topics: [
        { name: 'backend-8-b-1-solid', label: 'SOLID/DRY/KISS' },
        { name: 'backend-8-b-2-design-patterns', label: 'GoF 设计模式在后端的应用' },
      ]},
      { name: 'backend-8-c', label: '性能调优', topics: [
        { name: 'backend-8-c-1-profile', label: 'pprof 性能分析' },
        { name: 'backend-8-c-2-optimize', label: '常见性能瓶颈与优化' },
        { name: 'backend-8-c-3-bench', label: '基准测试与压测' },
      ]},
    ]
  },
]
</script>
