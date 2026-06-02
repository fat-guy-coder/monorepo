<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4">
        <h1 class="text-2xl font-bold text-slate-800">计算机科学学习路线图</h1>
        <p class="text-sm text-slate-500 mt-1">从计算思维到分布式系统 · 系统工程师的必修之路</p>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">

      <section class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📖</span>
          如何使用本路线图
        </h2>
        <p class="text-slate-600 leading-relaxed">
          以下 11 个阶段按<strong>依赖关系排列</strong>——前一阶段是后一阶段的基础。每阶段标注了建议学习时间和核心产出。
          概念用中文解释，术语保留英文便于查资料。前端工程师可跳过阶段 1 直接到阶段 2。
        </p>
      </section>

      <!-- 阶段卡片列表 -->
      <div v-for="(phase, idx) in phases" :key="phase.id" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <div class="flex items-start gap-4 mb-4">
          <span class="shrink-0 w-10 h-10 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-lg font-bold">{{ idx + 1 }}</span>
          <div class="flex-1">
            <div class="flex items-center gap-3 flex-wrap">
              <h2 class="text-lg font-semibold text-slate-800">{{ phase.icon }} {{ phase.title }}</h2>
              <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{{ phase.time }}</span>
            </div>
            <p class="text-slate-600 text-sm mt-1">{{ phase.desc }}</p>
          </div>
        </div>

        <div class="ml-14">
          <h3 class="text-sm font-semibold text-slate-700 mb-2">📌 核心知识点</h3>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-slate-600 mb-4">
            <li v-for="t in phase.topics" :key="t" class="flex items-start gap-2">
              <span class="text-cyan-500 mt-1">▸</span>
              <span>{{ t }}</span>
            </li>
          </ul>

          <div v-if="phase.practice" class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-3 mb-3">
            <p class="text-sm text-emerald-800"><strong>🛠️ 实践产出：</strong>{{ phase.practice }}</p>
          </div>

          <div v-if="phase.resources" class="text-xs text-slate-400">
            <strong>参考资源：</strong>{{ phase.resources.join(' · ') }}
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 text-center text-slate-500 text-sm">
        ✨ 扎实基础 · 持续实践 · 构建完整知识体系 — 预计全部完成需 18-24 个月
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
interface Phase {
  id: number; icon: string; title: string; time: string; desc: string
  topics: string[]; practice?: string; resources?: string[]
}

const phases: Phase[] = [
  {
    id: 1, icon: '💻', title: '编程基础与计算思维', time: '4-6 周',
    desc: '学会用一门语言描述问题和解决问题。本阶段目标是"能写能跑"，不追求语法精熟——后续各阶段都会不断强化编程能力。推荐 TypeScript（前端背景）或 Python。',
    topics: [
      '变量、类型、控制流、函数 —— 任何语言通用',
      '数组/列表、对象/字典、集合 —— 基本数据结构直觉',
      '递归思想：汉诺塔、斐波那契、目录遍历',
      '文件读写：文本、CSV、JSON 处理',
      '命令行工具编写：接受参数、管道、退出码',
      '调试技巧：打印调试、断点、日志',
      'Git 基础：init / add / commit / branch / merge / rebase',
    ],
    practice: '用所选语言写一个命令行 TODO 工具，支持增删改查 + JSON 持久化 + 标签分类',
    resources: ['CS50 (Harvard)', 'Python Crash Course', 'The Odin Project']
  },
  {
    id: 2, icon: '🧮', title: '离散数学与计算理论', time: '6-8 周',
    desc: '算法和系统设计的数学基础。不需要成为数学家——理解核心概念并能在需要时查阅即可。前端开发者尤其要加强这部分。',
    topics: [
      '命题逻辑与谓词逻辑（与或非、量词、逻辑等价）',
      '集合论基础：集合运算、幂集、笛卡尔积',
      '函数与关系：单射/满射/双射、等价关系',
      '图论入门：顶点、边、度、连通性、树',
      '组合数学：排列、组合、鸽巢原理',
      '归纳法与递归关系',
      '自动机理论入门：DFA / NFA、正则表达式',
      '计算复杂度直觉：P vs NP、可计算性（了解即可）',
    ],
    resources: ['《离散数学及其应用》(Rosen)', 'MIT 6.042J', 'Brilliant.org 离散数学']
  },
  {
    id: 3, icon: '📊', title: '数据结构与算法', time: '10-14 周',
    desc: '编程内功核心。理解"为什么这个算法快、那个慢"，能分析时间空间复杂度，能根据场景选择合适的数据结构。本阶段重点：多写多画多调试，不要光看。',
    topics: [
      '复杂度分析：大 O、大 Ω、大 Θ、均摊分析',
      '线性结构：数组（静态/动态）、链表（单向/双向/循环）、跳表',
      '栈与队列：表达式求值、BFS、单调栈/队列应用',
      '哈希表：哈希函数、冲突解决（链地址/开放寻址）、动态扩容',
      '树：二叉搜索树、AVL、红黑树、B 树/B+ 树（数据库索引核心）',
      '堆与优先队列：二叉堆、堆排序、Top-K 问题',
      '图：邻接表/矩阵、DFS、BFS、拓扑排序、最短路径（Dijkstra / Bellman-Ford / Floyd）',
      '排序：快排、归并、堆排、计数/桶/基数排序（稳定性与适用场景）',
      '递归与 DP：重叠子问题、最优子结构、背包/LCS/编辑距离',
      '字符串算法：KMP、Trie 树、后缀数组（了解）',
    ],
    practice: 'LeetCode 100 题（按专题刷：数组→链表→树→DP→图），每道题写注释说明复杂度',
    resources: ['《算法导论》(CLRS)', '《算法》(Sedgewick)', 'LeetCode / 代码随想录', 'visualgo.net']
  },
  {
    id: 4, icon: '🖥️', title: '计算机组成原理', time: '8-10 周',
    desc: '"软件运行在硬件上"——理解 CPU 如何执行代码、内存如何存储数据、缓存为什么快。这是理解操作系统和性能优化的前提。',
    topics: [
      '数字逻辑：门电路、组合/时序逻辑、寄存器、ALU',
      '数据表示：整数（补码）、浮点数（IEEE 754）、字符编码（ASCII / Unicode / UTF-8）',
      '冯·诺依曼架构：控制器、运算器、存储器、输入输出',
      '指令集架构 (ISA)：RISC vs CISC、寻址模式、调用约定',
      'CPU 微架构：流水线、分支预测、乱序执行、超标量',
      '存储器层次：寄存器 → L1/L2/L3 Cache → 内存 → SSD/HDD',
      'Cache 原理：局部性、映射策略、写回/写直达、Cache Line',
      '虚拟内存概述：页表、TLB、缺页（详见操作系统）',
      '汇编入门 (x86-64)：寄存器、mov/add/call/ret、栈帧',
    ],
    practice: '用汇编或 C 写一个简单程序，读懂编译后的汇编输出；用 perf/cachegrind 观察 Cache Miss',
    resources: ['《深入理解计算机系统》(CSAPP) 前半本', 'Nand2Tetris (Coursera)', 'Crash Course: Computer Science (YouTube)']
  },
  {
    id: 5, icon: '⚙️', title: '操作系统', time: '10-14 周',
    desc: '理解 OS 如何管理 CPU、内存、文件、I/O，并为应用程序提供抽象。这是后端/系统开发的必修课。结合 CSAPP 和 xv6 动手实践效果最好。',
    topics: [
      'OS 概述：内核态 vs 用户态、系统调用、中断/异常机制',
      '进程管理：PCB、上下文切换、fork/exec、孤儿/僵尸进程',
      '线程与并发：用户态线程 vs 内核态线程、线程池',
      'CPU 调度：FCFS、SJF、优先级、Round Robin、多级队列、CFS (Linux)',
      '同步与互斥：竞态条件、临界区、互斥锁、信号量、条件变量',
      '死锁：必要条件、银行家算法、预防/避免/检测恢复',
      '内存管理：分段、分页、页表、TLB、多级页表',
      '虚拟内存：需求分页、页面置换（LRU/Clock）、工作集、抖动',
      '文件系统：inode、目录结构、日志 (ext4)、快照 (ZFS)',
    ],
    practice: '完成 MIT 6.S081 xv6 实验（至少完成 util、syscall、pgtbl、traps、lazy、cow）',
    resources: ['《深入理解计算机系统》(CSAPP) 后半本', 'MIT 6.S081 (xv6)', '《现代操作系统》(Tanenbaum)']
  },
  {
    id: 6, icon: '🌐', title: '计算机网络', time: '8-10 周',
    desc: '"网络是不可靠的"——理解数据如何从一台机器到达另一台，以及各层协议如何协同工作。自顶向下学习法更直观（从应用层开始）。',
    topics: [
      '网络模型：OSI 七层 vs TCP/IP 四层，封装与解封装',
      '应用层：HTTP/1.1 → HTTP/2 → HTTP/3 (QUIC)、DNS 解析过程、CDN 原理',
      '传输层：TCP（三次握手/四次挥手、拥塞控制、滑动窗口）、UDP',
      '网络层：IP 地址、子网掩码、CIDR、路由协议（OSPF / BGP）',
      '数据链路层：MAC 地址、ARP、交换机 vs 集线器、VLAN',
      'TLS/SSL：证书链、握手过程、前向安全性',
      'Socket 编程：TCP/UDP 服务器/客户端、epoll (Linux) / IOCP (Windows)',
      '网络工具：ping、traceroute、tcpdump/Wireshark 抓包分析',
      '网络安全：XSS、CSRF、SQL 注入防御、CORS、CSP',
    ],
    practice: '用 Wireshark 抓一次完整的 HTTP 请求-响应，逐层分析；实现一个简易 HTTP 代理',
    resources: ['《计算机网络：自顶向下方法》(Kurose/Ross)', 'Beej\'s Guide to Network Programming', 'High Performance Browser Networking (Ilya Grigorik)']
  },
  {
    id: 7, icon: '🗄️', title: '数据库系统', time: '8-10 周',
    desc: '数据是大多数应用的核心。理解关系型数据库的存储、索引、事务原理，以及什么时候用 NoSQL。重点是"为什么慢"和"怎么让它快"。',
    topics: [
      '关系模型与 SQL：JOIN（Nested Loop / Hash / Merge）、子查询、窗口函数、CTE',
      '存储引擎：B+ 树索引、LSM-Tree、页结构、行存 vs 列存',
      '索引：聚集/非聚集、覆盖索引、最左前缀、索引下推 (ICP)',
      '事务与 ACID：隔离级别（读未提交→可串行化）、MVCC 实现原理',
      '锁与并发：行锁/表锁/间隙锁、死锁检测、乐观锁 (CAS)',
      '查询优化：EXPLAIN 读执行计划、统计信息、Hint',
      '数据库设计：ER 模型、范式（1NF~BCNF）、反范式化策略',
      'Redis：五大数据结构、持久化 RDB/AOF、分布式锁（Redlock）、缓存策略',
      'NoSQL 概览：MongoDB、Elasticsearch、时序数据库 (InfluxDB)',
    ],
    practice: '设计一个小型电商的数据库 schema，写出核心 SQL；用 Redis 实现一个限流器',
    resources: ['《数据库系统概念》(Silberschatz)', '《高性能 MySQL》(第4版)', 'Redis 官方文档', 'Use The Index, Luke!']
  },
  {
    id: 8, icon: '📝', title: '编程语言与编译原理', time: '8-10 周',
    desc: '了解"语法糖"的底层实现，理解内存布局和类型系统。建议学 Go + Rust：Go 学并发和工程化，Rust 学所有权和零成本抽象。',
    topics: [
      'Go 核心：并发模型 (goroutine/channel/select)、接口隐式实现、逃逸分析',
      'Rust 核心：所有权/借用/生命周期、Trait、unsafe 边界',
      '内存模型：栈 vs 堆分配、逃逸分析、GC（标记清扫/分代/并发）vs RAII',
      '编译过程：词法分析 → 语法分析 (AST) → 语义分析 → IR → 优化 → 代码生成',
      '类型系统：静态/动态、强/弱、多态（参数化/特设/子类型）、类型推断',
      '函数式编程思想：纯函数、不可变性、Monad（概念了解）、柯里化',
      '虚拟机与运行时：字节码 (JVM/CLR)、JIT、内联缓存',
    ],
    practice: '用 Go 写一个简易 HTTP 服务器 + Redis 客户端；用 Rust 写一个命令行工具',
    resources: ['《Go 程序设计语言》(Donovan/Kernighan)', '《Rust 程序设计》(Klabnik/Nichols)', 'Crafting Interpreters (Nystrom)']
  },
  {
    id: 9, icon: '🏛️', title: '软件工程与系统设计', time: '6-8 周',
    desc: '学习如何组织代码、设计接口，以及应对需求变化的策略。本阶段不需要全部掌握，先建立概念框架，在实战中逐步内化。',
    topics: [
      '设计原则：SOLID、DRY、KISS、关注点分离、组合优于继承',
      '设计模式：工厂、单例、策略、观察者、装饰器、适配器 —— 理解意图而非背代码',
      '架构模式：分层、六边形（端口适配器）、事件驱动、CQRS',
      '领域驱动设计 (DDD) 入门：实体、值对象、聚合、限界上下文',
      'API 设计：RESTful 规范、gRPC、GraphQL 选型、版本策略',
      '代码质量：单元测试 (FIRST 原则)、TDD 节奏、测试金字塔',
      '重构：代码坏味道 (Martin Fowler)、安全重构步骤',
    ],
    practice: '选取自己做过的项目进行重构，写出 5 个设计决策的 trade-off 分析',
    resources: ['《设计模式：可复用面向对象软件的基础》(GoF)', '《重构》(Fowler)', '《实现领域驱动设计》(Vernon)']
  },
  {
    id: 10, icon: '🔀', title: '分布式系统基础', time: '8-10 周',
    desc: '当一台机器不够用时，如何让多台机器协同工作。重点理解"一切皆可失败"的假设和应对策略。这是高级后端/架构师的必修课。',
    topics: [
      '分布式理论：CAP 定理、BASE、PACELC、拜占庭将军（了解）',
      '共识算法：Paxos（历史）、Raft（etcd 核心）、ZAB (ZooKeeper)',
      '数据分区与复制：主从、多主、无主、一致性哈希',
      '一致性模型：线性一致性、顺序一致性、最终一致性',
      '分布式事务：2PC/3PC、Saga、TCC、本地消息表',
      '服务发现与负载均衡：Consul、Nginx、Envoy、轮询/加权/一致性哈希',
      '消息队列：Kafka（分区、消费者组、高水位）、RabbitMQ（交换器、死信）',
      '分布式追踪与可观测性：OpenTelemetry、Jaeger、指标/日志/追踪三位一体',
    ],
    practice: '用 etcd 实现一个简易的分布式锁；部署一个 Kafka 集群并压测',
    resources: ['《设计数据密集型应用》(DDIA, Kleppmann) —— 必读', 'MIT 6.824 分布式系统', 'Raft 论文 + 动画 (raft.github.io)']
  },
  {
    id: 11, icon: '🚀', title: '工程实践与持续成长', time: '持续',
    desc: '将理论知识转化为高效工作流。这些技能贯穿整个职业生涯，越早建立习惯越受益。',
    topics: [
      '版本控制：Git 工作流 (GitHub Flow / GitLab Flow)、rebase vs merge、bisect',
      'CI/CD：GitHub Actions / GitLab CI 流水线设计、蓝绿部署、金丝雀发布',
      '容器与编排：Docker (Dockerfile 最佳实践)、docker-compose、Kubernetes 核心概念 (Pod/Service/Deployment)',
      '可观测性：结构化日志、Prometheus + Grafana、Sentry 错误追踪',
      '性能分析：pprof / perf / FlameGraph、基准测试 (benchstat / criterion)',
      '技术写作：RFC / ADR、API 文档、架构决策记录',
      '安全：OWASP Top 10、密钥管理、依赖漏洞扫描 (Dependabot)',
      '技术英语：阅读英文文档/论文/规范，Stack Overflow 查问题',
    ],
    resources: ['《The Pragmatic Programmer》(Hunt/Thomas)', 'Google SRE Book', '《持续交付》(Humble/Farley)']
  }
]
</script>
