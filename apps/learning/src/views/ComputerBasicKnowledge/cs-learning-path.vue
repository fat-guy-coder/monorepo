<template>
  <LearningPath
    title="计算机科学学习路线图"
    description="从计算思维到分布式系统 · 系统工程师的必修之路"
    :tags="[{ label: '💻 编程', color: 'blue' },{ label: '🧮 数学', color: 'green' },{ label: '📊 算法', color: 'purple' },{ label: '🖥️ 系统', color: 'orange' },{ label: '🔀 分布式', color: 'red' }]"
    :phases="phases"
    footerText="预计全部完成需 18-24 个月 · 扎实基础 · 持续实践"
  />
</template>

<script setup lang="ts">
import { LearningPath } from 'components'
import type { Phase } from 'components/LearningPath/index.vue'

const phases: Phase[] = [
  {
    id: 1, icon: '💻', title: '编程基础与计算思维', period: '4-6 周',
    desc: '学会用一门语言描述和解决问题。本阶段目标是"能写能跑"，不追求语法精熟。推荐 TypeScript 或 Python。',
    color: 'bg-blue-500',
    practice: '📌 实战：命令行 TODO 工具 — 增删改查 + JSON 持久化 + 标签分类',
    modules: [
      { name: 'cs-1-a', label: '基础语法与概念', topics: [
        { name: 'cs-1-a-1-vars', label: '变量、常量与类型系统' },
        { name: 'cs-1-a-2-control', label: '条件判断与循环' },
        { name: 'cs-1-a-3-functions', label: '函数定义、参数与返回值' },
        { name: 'cs-1-a-4-scope', label: '作用域与生命周期' },
      ]},
      { name: 'cs-1-b', label: '基本数据结构', topics: [
        { name: 'cs-1-b-1-arrays', label: '数组与动态数组' },
        { name: 'cs-1-b-2-map-set', label: '字典(Map)与集合(Set)' },
        { name: 'cs-1-b-3-string', label: '字符串操作与编码基础' },
      ]},
      { name: 'cs-1-c', label: '计算思维训练', topics: [
        { name: 'cs-1-c-1-recursion', label: '递归思想与分治策略' },
        { name: 'cs-1-c-2-file', label: '文件读写与数据持久化' },
        { name: 'cs-1-c-3-cli', label: '命令行工具编写' },
      ]},
      { name: 'cs-1-d', label: '版本控制', topics: [
        { name: 'cs-1-d-1-git-init', label: 'Git 基础' },
        { name: 'cs-1-d-2-branch', label: '分支管理' },
        { name: 'cs-1-d-3-remote', label: '远程协作' },
      ]},
    ]
  },
  {
    id: 2, icon: '🧮', title: '离散数学与计算理论', period: '6-8 周',
    desc: '算法和系统设计的数学基础。不需要成为数学家——理解核心概念并能在需要时查阅即可。',
    color: 'bg-green-500',
    practice: '📌 实战：用离散数学概念分析一个实际算法的时间/空间复杂度，写一篇技术笔记',
    modules: [
      { name: 'cs-2-a', label: '逻辑与证明', topics: [
        { name: 'cs-2-a-1-prop-logic', label: '命题逻辑' },
        { name: 'cs-2-a-2-pred-logic', label: '谓词逻辑' },
        { name: 'cs-2-a-3-proof', label: '证明方法' },
      ]},
      { name: 'cs-2-b', label: '集合与关系', topics: [
        { name: 'cs-2-b-1-set-ops', label: '集合运算' },
        { name: 'cs-2-b-2-relation', label: '关系：等价关系' },
        { name: 'cs-2-b-3-function', label: '函数：单射/满射/双射' },
      ]},
      { name: 'cs-2-c', label: '图论与组合', topics: [
        { name: 'cs-2-c-1-graph-basic', label: '图基础' },
        { name: 'cs-2-c-2-tree', label: '树与生成树' },
        { name: 'cs-2-c-3-combo', label: '组合数学' },
      ]},
      { name: 'cs-2-d', label: '计算理论', topics: [
        { name: 'cs-2-d-1-induction', label: '数学归纳法' },
        { name: 'cs-2-d-2-automata', label: '自动机理论' },
        { name: 'cs-2-d-3-complexity', label: 'P vs NP' },
      ]},
    ]
  },
  {
    id: 3, icon: '📊', title: '数据结构与算法', period: '10-14 周',
    desc: '编程内功核心。理解"为什么这个算法快、哪个慢"，能分析时间空间复杂度，能根据场景选择合适的数据结构。',
    color: 'bg-purple-500',
    practice: '📌 实战：LeetCode 100 题（按专题刷：数组→链表→树→DP→图），每道题写注释说明复杂度',
    modules: [
      { name: 'cs-3-a', label: '算法分析', topics: [
        { name: 'cs-3-a-1-big-o', label: '大O/Ω/Θ 记号' },
        { name: 'cs-3-a-2-amortized', label: '均摊分析' },
      ]},
      { name: 'cs-3-b', label: '线性结构', topics: [
        { name: 'cs-3-b-1-array', label: '数组与缓存' },
        { name: 'cs-3-b-2-linkedlist', label: '链表' },
        { name: 'cs-3-b-3-stack-queue', label: '栈与队列' },
        { name: 'cs-3-b-4-skiplist', label: '跳表' },
      ]},
      { name: 'cs-3-c', label: '哈希', topics: [
        { name: 'cs-3-c-1-hash-func', label: '哈希函数设计' },
        { name: 'cs-3-c-2-collision', label: '冲突解决' },
        { name: 'cs-3-c-3-bloom', label: '布隆过滤器' },
      ]},
      { name: 'cs-3-d', label: '树结构', topics: [
        { name: 'cs-3-d-1-bst', label: '二叉搜索树' },
        { name: 'cs-3-d-2-avl-rb', label: 'AVL与红黑树' },
        { name: 'cs-3-d-3-btree', label: 'B/B+ 树' },
        { name: 'cs-3-d-4-trie', label: 'Trie 字典树' },
      ]},
      { name: 'cs-3-e', label: '堆', topics: [
        { name: 'cs-3-e-1-binary-heap', label: '二叉堆与堆排序' },
        { name: 'cs-3-e-3-topk', label: 'Top-K 问题' },
      ]},
      { name: 'cs-3-f', label: '图算法', topics: [
        { name: 'cs-3-f-1-repr', label: '图的表示' },
        { name: 'cs-3-f-2-traversal', label: 'DFS/BFS' },
        { name: 'cs-3-f-3-shortest', label: '最短路径' },
        { name: 'cs-3-f-4-topo-mst', label: '拓扑排序/MST' },
      ]},
      { name: 'cs-3-g', label: '排序', topics: [
        { name: 'cs-3-g-1-nlogn', label: '快排/归并/堆排' },
        { name: 'cs-3-g-2-linear', label: '计数/桶/基数' },
        { name: 'cs-3-g-3-binary', label: '二分搜索' },
      ]},
      { name: 'cs-3-h', label: '动态规划', topics: [
        { name: 'cs-3-h-1-basic-dp', label: 'DP 基础' },
        { name: 'cs-3-h-2-classic', label: '背包/LCS/LIS' },
        { name: 'cs-3-h-3-backtrack', label: '回溯算法' },
      ]},
      { name: 'cs-3-i', label: '字符串', topics: [
        { name: 'cs-3-i-1-kmp', label: 'KMP 匹配' },
        { name: 'cs-3-i-3-aho', label: 'AC 自动机' },
      ]},
    ]
  },
  {
    id: 4, icon: '🖥️', title: '计算机组成原理', period: '8-10 周',
    desc: '"软件运行在硬件上"——理解 CPU 如何执行代码、内存如何存储数据、缓存为什么快。',
    color: 'bg-yellow-500',
    practice: '📌 实战：用汇编或 C 写一个简单程序，读懂编译后的汇编输出；用 perf 观察 Cache Miss',
    modules: [
      { name: 'cs-4-a', label: '数字逻辑', topics: [
        { name: 'cs-4-a-1-gates', label: '逻辑门与组合电路' },
        { name: 'cs-4-a-2-sequential', label: '时序逻辑' },
        { name: 'cs-4-a-4-integer', label: '整数：补码/溢出' },
        { name: 'cs-4-a-5-float', label: 'IEEE 754 浮点' },
      ]},
      { name: 'cs-4-b', label: 'CPU 微架构', topics: [
        { name: 'cs-4-b-1-isa', label: 'RISC vs CISC' },
        { name: 'cs-4-b-2-pipeline', label: '流水线' },
        { name: 'cs-4-b-3-branch', label: '分支预测' },
      ]},
      { name: 'cs-4-c', label: '存储器', topics: [
        { name: 'cs-4-c-1-hierarchy', label: '层次结构' },
        { name: 'cs-4-c-2-cache', label: 'Cache 原理' },
      ]},
      { name: 'cs-4-d', label: '汇编', topics: [
        { name: 'cs-4-d-1-registers', label: '寄存器与调用约定' },
        { name: 'cs-4-d-2-mov-alu', label: '指令与栈帧' },
      ]},
    ]
  },
  {
    id: 5, icon: '⚙️', title: '操作系统', period: '10-14 周',
    desc: '理解 OS 如何管理 CPU、内存、文件、I/O，并为应用程序提供抽象。结合 CSAPP 和 xv6 动手实践。',
    color: 'bg-red-500',
    practice: '📌 实战：完成 MIT 6.S081 xv6 实验（util/syscall/pgtbl/traps/lazy/cow）',
    modules: [
      { name: 'cs-5-a', label: 'OS 核心', topics: [
        { name: 'cs-5-a-1-kernel', label: '内核态与系统调用' },
        { name: 'cs-5-a-2-interrupt', label: '中断与异常' },
      ]},
      { name: 'cs-5-b', label: '进程线程', topics: [
        { name: 'cs-5-b-1-pcb', label: 'PCB与上下文切换' },
        { name: 'cs-5-b-2-fork', label: 'fork/exec/wait' },
        { name: 'cs-5-b-3-thread', label: '线程模型' },
        { name: 'cs-5-b-4-scheduling', label: 'CPU调度' },
      ]},
      { name: 'cs-5-c', label: '同步', topics: [
        { name: 'cs-5-c-1-race', label: '竞态条件' },
        { name: 'cs-5-c-2-locks', label: '互斥锁/自旋锁' },
        { name: 'cs-5-c-3-semaphore', label: '信号量' },
        { name: 'cs-5-c-4-deadlock', label: '死锁' },
      ]},
      { name: 'cs-5-d', label: '内存', topics: [
        { name: 'cs-5-d-1-paging', label: '分页/TLB' },
        { name: 'cs-5-d-2-virtual', label: '虚拟内存' },
        { name: 'cs-5-d-3-replacement', label: '页面置换' },
      ]},
      { name: 'cs-5-e', label: '文件系统', topics: [
        { name: 'cs-5-e-1-inode', label: 'inode 与目录' },
        { name: 'cs-5-e-2-journal', label: '日志/写时复制' },
        { name: 'cs-5-e-3-io-model', label: 'I/O 模型' },
      ]},
    ]
  },
  {
    id: 6, icon: '🌐', title: '计算机网络', period: '8-10 周',
    desc: '"网络是不可靠的"——理解数据如何从一台机器到达另一台。自顶向下学习法更直观。',
    color: 'bg-indigo-500',
    practice: '📌 实战：用 Wireshark 抓一次完整的 HTTP 请求-响应，逐层分析；实现 HTTP 代理',
    modules: [
      { name: 'cs-6-a', label: '网络基础', topics: [
        { name: 'cs-6-a-1-osi', label: 'OSI/TCP-IP 模型' },
        { name: 'cs-6-a-2-encap', label: '封装与解封装' },
      ]},
      { name: 'cs-6-b', label: '应用层', topics: [
        { name: 'cs-6-b-1-http1', label: 'HTTP/1.1' },
        { name: 'cs-6-b-2-http2', label: 'HTTP/2 多路复用' },
        { name: 'cs-6-b-3-http3', label: 'HTTP/3 QUIC' },
        { name: 'cs-6-b-4-dns', label: 'DNS' },
        { name: 'cs-6-b-5-cdn', label: 'CDN' },
      ]},
      { name: 'cs-6-c', label: '传输层', topics: [
        { name: 'cs-6-c-1-tcp-handshake', label: 'TCP 三次握手' },
        { name: 'cs-6-c-2-tcp-congestion', label: 'TCP 拥塞控制' },
        { name: 'cs-6-c-3-tcp-flow', label: 'TCP 滑动窗口' },
        { name: 'cs-6-c-4-udp', label: 'UDP' },
      ]},
      { name: 'cs-6-d', label: '网络层与安全', topics: [
        { name: 'cs-6-d-1-ip', label: 'IP 协议' },
        { name: 'cs-6-d-2-subnet', label: '子网划分/CIDR' },
        { name: 'cs-6-d-4-tls', label: 'TLS 1.3' },
        { name: 'cs-6-d-5-security', label: 'Web 安全' },
      ]},
      { name: 'cs-6-e', label: '网络编程', topics: [
        { name: 'cs-6-e-1-socket', label: 'Socket API' },
        { name: 'cs-6-e-2-epoll', label: 'I/O 多路复用' },
      ]},
    ]
  },
  {
    id: 7, icon: '🗄️', title: '数据库系统', period: '8-10 周',
    desc: '理解关系型数据库的存储、索引、事务原理。重点：为什么慢、怎么让它快。',
    color: 'bg-teal-500',
    practice: '📌 实战：设计一个小型电商数据库 schema，写出核心 SQL；用 Redis 实现限流器',
    modules: [
      { name: 'cs-7-a', label: 'SQL', topics: [
        { name: 'cs-7-a-1-crud', label: 'CRUD 操作' },
        { name: 'cs-7-a-2-join', label: 'JOIN 类型' },
        { name: 'cs-7-a-3-agg', label: '聚合与分组' },
        { name: 'cs-7-a-4-window', label: '窗口函数' },
        { name: 'cs-7-a-5-cte', label: 'CTE 递归查询' },
      ]},
      { name: 'cs-7-b', label: '存储引擎', topics: [
        { name: 'cs-7-b-1-btree-idx', label: 'B+ 树索引' },
        { name: 'cs-7-b-2-lsm', label: 'LSM-Tree' },
        { name: 'cs-7-b-4-explain', label: 'EXPLAIN 优化' },
      ]},
      { name: 'cs-7-c', label: '事务', topics: [
        { name: 'cs-7-c-1-acid', label: 'ACID 隔离级别' },
        { name: 'cs-7-c-2-mvcc', label: 'MVCC' },
        { name: 'cs-7-c-3-locks', label: '锁机制' },
      ]},
      { name: 'cs-7-d', label: '设计', topics: [
        { name: 'cs-7-d-1-er', label: 'ER 模型' },
        { name: 'cs-7-d-2-normal', label: '范式化' },
      ]},
      { name: 'cs-7-e', label: 'Redis', topics: [
        { name: 'cs-7-e-1-structs', label: '五种数据结构' },
        { name: 'cs-7-e-3-cache', label: '缓存策略' },
        { name: 'cs-7-e-4-lock', label: '分布式锁' },
      ]},
      { name: 'cs-7-f', label: 'NoSQL', topics: [
        { name: 'cs-7-f-1-mongo', label: 'MongoDB' },
        { name: 'cs-7-f-2-es', label: 'Elasticsearch' },
        { name: 'cs-7-f-3-timeseries', label: '时序数据库' },
      ]},
    ]
  },
  {
    id: 8, icon: '📝', title: '编程语言与编译原理', period: '8-10 周',
    desc: '深入语言底层，理解内存布局和类型系统。建议学 Go + Rust 互补。',
    color: 'bg-pink-500',
    practice: '📌 实战：用 Go 写 HTTP 服务器 + Redis 客户端；用 Rust 写命令行工具',
    modules: [
      { name: 'cs-8-a', label: 'Go 深入', topics: [
        { name: 'cs-8-a-1-goroutine', label: 'goroutine/GMP' },
        { name: 'cs-8-a-2-interface', label: '接口与反射' },
        { name: 'cs-8-a-3-escape', label: '逃逸分析与GC' },
      ]},
      { name: 'cs-8-b', label: 'Rust 深入', topics: [
        { name: 'cs-8-b-1-ownership', label: '所有权/借用' },
        { name: 'cs-8-b-2-trait', label: 'Trait 系统' },
        { name: 'cs-8-b-3-unsafe', label: 'unsafe与FFI' },
      ]},
      { name: 'cs-8-c', label: '内存模型', topics: [
        { name: 'cs-8-c-1-stack-heap', label: '栈vs堆' },
        { name: 'cs-8-c-2-gc', label: 'GC 原理' },
        { name: 'cs-8-c-3-raii', label: 'RAII' },
      ]},
      { name: 'cs-8-d', label: '编译原理', topics: [
        { name: 'cs-8-d-1-lex-parse', label: '词法与语法分析' },
        { name: 'cs-8-d-2-ir-opt', label: 'IR与优化' },
        { name: 'cs-8-d-3-codegen', label: '代码生成' },
      ]},
      { name: 'cs-8-e', label: '类型系统', topics: [
        { name: 'cs-8-e-1-static-dyn', label: '静态/动态类型' },
        { name: 'cs-8-e-2-polymorphism', label: '多态' },
        { name: 'cs-8-e-3-inference', label: '类型推断' },
      ]},
      { name: 'cs-8-f', label: '运行时', topics: [
        { name: 'cs-8-f-1-bytecode', label: '字节码 VM' },
        { name: 'cs-8-f-2-jit', label: 'JIT 编译' },
        { name: 'cs-8-f-3-fp', label: '函数式编程' },
      ]},
    ]
  },
  {
    id: 9, icon: '🏛️', title: '软件工程与系统设计', period: '6-8 周',
    desc: '学习如何组织代码、设计接口，应对需求变化。先建立概念框架，实战中逐步内化。',
    color: 'bg-cyan-500',
    practice: '📌 实战：选取自己做过的项目进行重构，写出 5 个设计决策的 trade-off 分析',
    modules: [
      { name: 'cs-9-a', label: '设计模式', topics: [
        { name: 'cs-9-a-1-solid', label: 'SOLID/DRY/KISS' },
        { name: 'cs-9-a-2-creational', label: '创建型模式' },
        { name: 'cs-9-a-3-behavioral', label: '行为型模式' },
        { name: 'cs-9-a-4-structural', label: '结构型模式' },
      ]},
      { name: 'cs-9-b', label: '架构', topics: [
        { name: 'cs-9-b-1-layered', label: '分层/六边形' },
        { name: 'cs-9-b-2-event', label: '事件驱动/CQRS' },
        { name: 'cs-9-b-3-ddd', label: 'DDD 入门' },
      ]},
      { name: 'cs-9-c', label: 'API', topics: [
        { name: 'cs-9-c-1-restful', label: 'RESTful' },
        { name: 'cs-9-c-2-grpc', label: 'gRPC' },
        { name: 'cs-9-c-3-graphql', label: 'GraphQL' },
      ]},
      { name: 'cs-9-d', label: '质量', topics: [
        { name: 'cs-9-d-1-unit-test', label: '单元测试/TDD' },
        { name: 'cs-9-d-2-pyramid', label: '测试金字塔' },
        { name: 'cs-9-d-3-refactor', label: '重构' },
        { name: 'cs-9-d-4-review', label: '代码审查' },
      ]},
    ]
  },
  {
    id: 10, icon: '🔀', title: '分布式系统基础', period: '8-10 周',
    desc: '当一台机器不够用时——理解"一切皆可失败"的假设和应对策略。',
    color: 'bg-orange-500',
    practice: '📌 实战：用 etcd 实现一个简易分布式锁；部署 Kafka 集群并压测',
    modules: [
      { name: 'cs-10-a', label: '理论', topics: [
        { name: 'cs-10-a-1-cap', label: 'CAP/PACELC' },
        { name: 'cs-10-a-2-base', label: 'BASE' },
        { name: 'cs-10-a-3-consistency', label: '一致性模型' },
      ]},
      { name: 'cs-10-b', label: '共识', topics: [
        { name: 'cs-10-b-1-raft', label: 'Raft' },
        { name: 'cs-10-b-3-replication', label: '数据复制' },
      ]},
      { name: 'cs-10-c', label: '事务', topics: [
        { name: 'cs-10-c-1-2pc', label: '2PC/3PC' },
        { name: 'cs-10-c-2-saga', label: 'Saga/TCC' },
      ]},
      { name: 'cs-10-d', label: '基础设施', topics: [
        { name: 'cs-10-d-1-discovery', label: '服务发现' },
        { name: 'cs-10-d-2-lb', label: '负载均衡' },
        { name: 'cs-10-d-3-mq', label: '消息队列' },
      ]},
      { name: 'cs-10-e', label: '可观测性', topics: [
        { name: 'cs-10-e-1-traces', label: '分布式追踪' },
        { name: 'cs-10-e-2-metrics', label: '指标监控' },
        { name: 'cs-10-e-3-logs', label: '日志聚合' },
      ]},
    ]
  },
  {
    id: 11, icon: '🚀', title: '工程实践与持续成长', period: '持续',
    desc: '将理论知识转化为高效工作流。这些技能贯穿整个职业生涯，越早建立习惯越受益。',
    color: 'bg-emerald-500',
    practice: '📌 实战：打造个人技术品牌——技术博客 + GitHub 项目 + 开源贡献',
    modules: [
      { name: 'cs-11-a', label: 'DevOps', topics: [
        { name: 'cs-11-a-1-cicd', label: 'CI/CD 流水线' },
        { name: 'cs-11-a-2-docker', label: 'Docker' },
        { name: 'cs-11-a-3-k8s', label: 'Kubernetes' },
        { name: 'cs-11-a-4-deploy', label: '部署策略' },
      ]},
      { name: 'cs-11-b', label: '性能', topics: [
        { name: 'cs-11-b-1-profile', label: 'CPU 分析/火焰图' },
        { name: 'cs-11-b-2-memory', label: '内存分析' },
        { name: 'cs-11-b-3-bench', label: '基准测试' },
      ]},
      { name: 'cs-11-c', label: '安全', topics: [
        { name: 'cs-11-c-1-owasp', label: 'OWASP Top 10' },
        { name: 'cs-11-c-2-crypto', label: '密码学基础' },
        { name: 'cs-11-c-3-secrets', label: '密钥管理' },
      ]},
      { name: 'cs-11-d', label: '成长', topics: [
        { name: 'cs-11-d-1-git-workflow', label: 'Git 工作流' },
        { name: 'cs-11-d-2-tech-writing', label: '技术写作' },
        { name: 'cs-11-d-3-english', label: '技术英语' },
        { name: 'cs-11-d-4-career', label: '职业规划' },
      ]},
    ]
  },
]
</script>
