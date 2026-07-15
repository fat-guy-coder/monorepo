package concurrency

import (
	"context"
	"fmt"
	"runtime"
	"sync"
	"time"
)

// RunGoroutines 深度演示 goroutine 基础、GMP 调度模型、调度器行为、泄漏检测。
func RunGoroutines() {
	// ============================================
	// 1. 基本 goroutine — go 关键字即并发
	// ============================================
	fmt.Println("=== 1. 基本 goroutine ===")
	go say("world") // 启动 goroutine——不阻塞，立即返回
	say("hello")    // 主 goroutine 继续执行
	time.Sleep(100 * time.Millisecond)
	// 输出（hello 和 world 交替，顺序取决于调度）:
	// hello
	// world
	// hello
	// world
	// ...

	// ============================================
	// 2. G（Goroutine）— 深度解析
	// ============================================
	fmt.Println("\n=== 2. G — Goroutine（用户态协程） ===")

	fmt.Println(`
┌──────────────────────────────────────────────────────────────────┐
│                    G 到底是什么？用来干嘛？                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  G（Goroutine）= 一个"可以暂停和恢复的函数调用"                      │
│                                                                  │
│  它用来干嘛？                                                      │
│  ─────────────────                                                │
│  G 的职责就是【执行一段代码】。每一个 go func() 创建一个 G。         │
│  G 本身不做调度——它只是被调度的对象。                               │
│                                                                  │
│  打个比方：                                                        │
│  · 操作系统里，"线程"是被调度的基本单元——它持有栈和寄存器上下文       │
│  · Go runtime 里，"G"就是那个被调度的基本单元——goroutine             │
│                                                                  │
│  再打个比方：                                                      │
│  · M（线程）= 流水线工人，真正干活的人                               │
│  · P（处理器）= 工作台，限定同时几个工人在干活                        │
│  · G（goroutine）= 流水线上的"工件"——工人拿到它就干活，               │
│    活没干完中途暂停（阻塞）→ 工件放一边，工人拿下一个                 │
│                                                                  │
│  G 的核心能力：                                                    │
│  ① 拥有独立的栈（2KB 起步，动态增长）——所以 goroutine 之间不会覆写    │
│  ② 栈上保存了函数调用的局部变量——暂停时整个栈都被保留               │
│  ③ sched 字段（gobuf）存了"断点"——sp（栈指针）和 pc（程序计数器）    │
│     恢复时从断点继续执行，就像什么都没发生过                         │
│  ④ 阻塞时 G 不占 M——M 被释放去执行其他 G                           │
│                                                                  │
│  type g struct {                                                 │
│      stack       stack        // 栈内存（lo 到 hi）               │
│      stackguard0 uintptr      // 栈溢出检测警戒线                  │
│      sched       gobuf        // 【核心】"断点快照"：sp + pc + g + ret │
│      sp  uintptr  // 栈指针 —— 当前执行到栈的哪里               │
│      pc  uintptr  // 程序计数器 —— 下一条要执行的指令地址           │
│      atomicstatus uint32      // 状态：runnable/running/waiting/... │
│      goid         int64       // goroutine ID（pprof 调试用）     │
│      m            *m          // 当前绑在哪个 M 上                 │
│      lockedm      *m          // LockOSThread——绑定到固定 M        │
│      gopc         uintptr     // 从哪里 go 出来的（调试用）         │
│      startpc      uintptr     // goroutine 函数入口                │
│      waitreason   string      // 阻塞原因（debug/pprof 可看）       │
│  }                                                               │
│                                                                  │
│  【G 的 8 种状态 + 每种状态在干嘛】                                  │
│                                                                  │
│  _Gidle      = 刚分配，还没初始化——还在"出生"阶段                   │
│  _Grunnable  = 准备好执行了，在 P 的队列里排队等 M                    │
│  _Grunning   = 正在某个 M 上跑——curg = 这个 G                      │
│  _Gsyscall   = 执行系统调用中（真正的 OS 阻塞！M 被占着）            │
│  _Gwaiting   = 阻塞在 channel/锁/timer/网络 I/O——M 被释放了         │
│  _Gdead      = 执行完毕，g 结构体回收到 gFree 列表（下次复用！）     │
│  _Gcopystack = 栈在扩容——旧栈数据正在拷贝到新栈                     │
│  _Gpreempted = 被 sysmon 抢占了——等重新调度                        │
│                                                                  │
│  【G 的完整生命周期：从生到死】                                      │
│                                                                  │
│  ① 创建: go func() → runtime.newproc()                           │
│     · 从 P 的 gFree 列表复用一个 g 结构体（无则 new）               │
│     · 分配 2KB 栈，设置 startpc = 函数地址                          │
│     · 状态 → _Grunnable，放入当前 P 的 runq（本地队列）              │
│                                                                  │
│  ② 被调度: P 的调度循环选出这个 G                                   │
│     · P 从 runq 取 G，找/绑定一个 M                                │
│     · M.curg = g, g.m = m（绑定）                                  │
│     · 状态 _Grunnable → _Grunning                                  │
│     · 从 g.sched 恢复 sp/pc → 跳转执行                              │
│                                                                  │
│  ③ 执行中: 跑用户代码，直到遇到"让出点"                              │
│     · 让出 = channel send/recv、time.Sleep、mutex.Lock、syscall    │
│     · 这些操作内部会调用 gopark()——把自己挂起                       │
│                                                                  │
│  ④ 阻塞挂起: gopark() 过程                                        │
│     · 把当前 sp/pc 保存到 g.sched（"断点快照"）                     │
│     · 状态 → _Gwaiting（或 _Gsyscall）                             │
│     · M.curg = nil, g.m = nil —— M 和 G 分离                       │
│     · M 的 g0 接管 → 回到调度循环选下一个 G                          │
│                                                                  │
│  ⑤ 被唤醒: 阻塞条件满足（channel 有数据了、锁释放了...）             │
│     · 调用 goready(g) → 状态 → _Grunnable                          │
│     · G 放回某个 P 的 runq（尽量放回原 P——缓存亲和性）               │
│                                                                  │
│  ⑥ 函数 return → 自然死亡                                          │
│     · 状态 → _Gdead                                                │
│     · g 结构体放回当前 P 的 gFree 列表——下次 go func() 直接复用！      │
│     · 栈内存不立即释放——缓存在 gFree 中加速下次创建                  │
└──────────────────────────────────────────────────────────────────┘
`)

	// ============================================
	// 3. M（Machine）— 深度解析
	// ============================================
	fmt.Println("\n=== 3. M — Machine（OS 线程） ===")

	fmt.Println(`
┌──────────────────────────────────────────────────────────────────┐
│                    M 到底是什么？用来干嘛？                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  M（Machine）= 一条真正的操作系统线程                                │
│                                                                  │
│  它用来干嘛？                                                      │
│  ─────────────────                                                │
│  M 的职责就是【干活】——真正在 CPU 上执行指令。G 只是"待办事项"，     │
│  M 是"执行者"。M 必须绑定一个 P 才能执行 G。                        │
│                                                                  │
│  打个比方：                                                        │
│  · M = 工厂的工人——真正干活的人                                     │
│  · P = 工作台——没有工作台，工人没法干活                             │
│  · G = 工件——工人从工作台上拿工件来做                                │
│                                                                  │
│  M 是怎么干活的（执行流程）：                                        │
│  ① M 绑定 P → ② M 从 P 的本地队列取一个 G                          │
│  → ③ M 切换到 G 的栈，执行 G 的函数代码                              │
│  → ④ G 阻塞了 → M 切回 g0（调度 goroutine）                        │
│  → ⑤ g0 选择下一个 G → 回到 ③                                      │
│                                                                  │
│  M 的核心职责总结：                                                 │
│  · 执行代码（M 是唯一能执行指令的东西——G 只是"被执行的代码"）         │
│  · 管理内核资源（每个 M 对应一个 pthread，涉及内核栈/信号处理）        │
│  · 处理阻塞和唤醒（M 自己的 g0 负责调度）                            │
│  · 如果 M 在执行 G 时遇到 syscall 阻塞 → M 被占用，P 另找 M          │
│                                                                  │
│  type m struct {                                                 │
│      g0       *g          //【M 自己的调度 goroutine】             │
│                            // g0 不跑用户代码，专门执行调度逻辑      │
│                            // 每个 M 出生就自带 g0——有独立栈        │
│                            //                                            │
│      curg     *g          //【当前正在执行哪个用户 G】              │
│                            // M 存在的意义——就是为了执行 curg      │
│                            // G 阻塞时 curg 被剥掉，g0 接管         │
│                            //                                            │
│      p        puintptr    // 当前绑定的 P（没有 P 的 M 是"失业"状态）│
│      nextp    puintptr    // 休眠醒来后要绑定的 P                   │
│      oldp     puintptr    // syscall 前的 P（回来后优先找回旧 P）     │
│                            //                                            │
│      spinning bool        //【自旋状态】没活干但不睡觉——等新 G 出现  │
│      blocked  bool        // 是否已休眠（parked）                   │
│      incgo    bool        // 是否在执行 cgo（cgo 调用要走 C 栈）    │
│      locks    int32       // M 被锁定次数——locked 时不能被抢占      │
│      park     note        // 休眠/唤醒原语——底层是 OS futex         │
│  }                                                               │
│                                                                  │
│  【g0 vs curg — M 的双重人格】                                     │
│                                                                  │
│  这是一个很多人困惑的概念。每个 M 同时存在两个 goroutine！           │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │ g0（调度 goroutine）                                      │     │
│  │ · M 创建时就分配好了，有自己独立的栈（~8KB）                  │     │
│  │ · 不跑用户代码——只执行 schedule()、findrunnable() 等调度函数 │     │
│  │ · "我需要切换到另一个 G？先切到 g0，g0 去选下一个 G"          │     │
│  │ · 为什么需要 g0？——调度器也是代码，也需要栈来跑。              │     │
│  │   如果用用户 G 的栈跑调度逻辑，万一 G 的栈快满了就崩了          │     │
│  ├──────────────────────────────────────────────────────────┤     │
│  │ curg（当前用户 goroutine）                                 │     │
│  │ · 就是正在执行用户代码的那个 G                              │     │
│  │ · "M 绑定 P → 获取 G → G 成为 curg → 执行 G 的函数体"       │     │
│  │ · curg 阻塞 → g0 接管 → 调度新 G                           │     │
│  └──────────────────────────────────────────────────────────┘     │
│                                                                  │
│  【M 的三种存活状态】                                               │
│                                                                  │
│  运行中（curg != nil）: 绑定了 P，正在执行 G                        │
│  · 这是 M 的"正常工作状态"                                         │
│  · 一直在执行——要么在跑用户代码，要么 g0 在跑调度代码（切换间隙）    │
│                                                                  │
│  自旋 spinning: 没有绑 P（或 P 刚被剥离），但 M 不睡觉              │
│  · 自旋 = "忙等"——M 在循环检查有没有新的可运行 G                   │
│  · 目的：避免线程创建/销毁的开销——有事干时直接上                    │
│  · 限制：同时最多 GOMAXPROCS 个自旋 M——防止 CPU 空转               │
│                                                                  │
│  休眠 parked: 彻底没事干，M 调用 stopm() 进入 OS 休眠               │
│  · 休眠 = futex 系统调用——M 被内核挂起，不占 CPU                   │
│  · 被唤醒后通过 nextp 绑定新的 P，恢复工作                          │
│                                                                  │
│  【M 的创建与回收】                                                │
│  · M 数量 ≈ P 数量（稳态——一个 P 同时只绑一个 M）                   │
│  · syscall 阻塞时 P 必须找新 M → runtime.newm() → clone() 新线程   │
│  · M 上限 10000——防止无限创建线程                                  │
│  · M 不会无限增长：空闲的 M 会休眠，过多的 M 会被回收（垃圾回收）     │
└──────────────────────────────────────────────────────────────────┘
`)

	// ============================================
	// 4. P（Processor）— 深度解析
	// ============================================
	fmt.Println("\n=== 4. P — Processor（逻辑处理器） ===")

	fmt.Println(`
┌──────────────────────────────────────────────────────────────────┐
│                    P 到底是什么？用来干嘛？                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  P（Processor）= 一个"调度上下文"——G 和 M 之间的中介                  │
│                                                                  │
│  它用来干嘛？                                                      │
│  ─────────────────                                                │
│  P 是 GMP 模型中最关键的设计——它是调度器的工作单元。                  │
│  P 的职责有三件事：                                                │
│                                                                  │
│  ① 持有 G 的本地队列（runq[256]）——G 在排队等 M 来执行              │
│     → 没有 P，G 就像没挂号的患者——没法被 M 处理                      │
│                                                                  │
│  ② 绑定 M——"M 必须拿到 P 才能干活"                                 │
│     → P 的数量（GOMAXPROCS）决定了【最多同时干活的 M 数】            │
│     → 也就是决定了真正的并行度                                       │
│                                                                  │
│  ③ 提供 mcache——每个 P 有独立的内存分配缓存                         │
│     → 这就是 Go 的并发内存分配为什么这么快——没全局锁！               │
│                                                                  │
│  打个比方：                                                        │
│  · P = 工作台/工位（只有 GOMAXPROCS 个工位）                        │
│  · M = 工人——工人必须站在工位上才能干活                              │
│  · G = 待加工的工件——排在工作台旁边，工人一个个拿来做                  │
│                                                                  │
│  type p struct {                                                 │
│      id          int32       // P 的编号 0,1,2,...               │
│      status      uint32      // _Pidle / _Prunning / _Psyscall   │
│      m           muintptr    // 当前绑定的 M                      │
│                                                                  │
│      // === G 的本地队列（P 最核心的数据结构）===                   │
│      runq        [256]guintptr  // 环形数组——存着排队的 G          │
│      runqhead    uint32         // 队头——M 从这里取 G 执行         │
│      runqtail    uint32         // 队尾——新 G 从这里入队           │
│      runnext     guintptr       //【下一个优先执行】的单槽缓存      │
│                                  // runnext 优先级最高——M 先看它    │
│                                  // 用于实现 goroutine 的"亲和性"    │
│                                                                  │
│      // === 已退出的 G 复用池 ===                                  │
│      gFree       struct {       // G 执行完变成 _Gdead             │
│          n        int32        // 不销毁，放这里下次直接复用         │
│          list     *g           // 链表——避免频繁分配 g 结构体       │
│      }                                                           │
│                                                                  │
│      // === 内存分配缓存（性能关键！）===                            │
│      mcache      *mcache       // P 专属的小对象内存分配缓存         │
│                                  // 这就是为什么 Go 并发分配内存快    │
│                                  // ——每个 P 有自己的 mcache，无锁    │
│                                                                  │
│      // === sysmon 监控用 ===                                     │
│      syscalltick uint32       // syscall 计数                     │
│      schedtick   uint32       // 调度次数计数                      │
│      preempt     bool         // 是否被标记抢占                    │
│  }                                                               │
│                                                                  │
│  【runq[256] + runnext 是怎么工作的？】                              │
│                                                                  │
│  每个 P 有一个本地 G 队列，是一个环形数组：                          │
│                                                                  │
│  runnext ─→ [G4]  ← M 优先执行这个（最近运行过的 G）               │
│  runq[0..255] = [G5, G6, G7, G8, ...]  ← M 从这里取              │
│               head↑        tail↑                                 │
│                                                                  │
│  · runnext 存最近被"让出"的 G——下次调度优先选它（缓存亲和性）        │
│  · runq 是无锁的——因为只有当前 P 的 M 会操作它                      │
│  · 队列满（256）时，把一半 G 移到全局队列（schedt.runq）              │
│  · 队列空时，从全局队列取一批（加锁），或从其他 P 偷（工作窃取）       │
│                                                                  │
│  【P 的三种状态】                                                   │
│                                                                  │
│  _Pidle:    P 空闲——在全局 pidle 链表上，等 M 来绑定                │
│             → M 醒来时 acquirep() 从 pidle 取一个 P                 │
│                                                                  │
│  _Prunning: P 正在工作——绑定了 M，M 在跑 runq 里的 G               │
│             → 这是 P 的正常态                                       │
│                                                                  │
│  _Psyscall: P 的当前 G 在执行系统调用，M 被阻塞                      │
│             → sysmon 检测到 >20μs → 把 P 从 M 剥离                  │
│             → P 状态变为 _Pidle，可以绑定新 M                        │
│                                                                  │
│  【P 的数量 = GOMAXPROCS = 并行度上限】                              │
│                                                                  │
│  · P 的数量直接决定了"最多几个 goroutine 真正并行执行"               │
│  · GOMAXPROCS = 16 → 最多 16 个 G 同时跑在 16 个 CPU 核上           │
│  · 为什么不是"有多少 G 就并行多少"？——因为 CPU 核数是有限的            │
│  · 可以动态改：runtime.GOMAXPROCS(n)                                │
│                                                                  │
│  【mcache：为什么 Go 的并发内存分配没有锁竞争】                       │
│                                                                  │
│  每个 P 有自己独立的 mcache：                                       │
│  · 小对象（&lt;=32KB）分配 → 直接从当前 P 的 mcache 取 → 无锁！       │
│  · mcache 空了 → 从全局 mcentral 批量拿一批 → 锁一次，用很多次        │
│  · 这就是为什么成千上万个 goroutine 同时 new 对象不会互相拖慢         │
│  · 对比 Java/C++ 的全局堆锁——Go 的每 P mcache 是巨大的性能优势       │
└──────────────────────────────────────────────────────────────────┘
`)

	// ============================================
	// 5. GMP 协同工作 — 一次完整的调度
	// ============================================
	fmt.Println("\n=== 5. GMP 协同：一次完整的调度周期 ===")

	fmt.Println(`
  想象一个正在运行的 P（_Prunning 状态，绑定了一个 M）：

  ┌──── 调度循环（schedule 函数）───────────────────────────────┐
  │                                                            │
  │  ① 取 G: 从 P 的本地队列取下一个 G（首选 runnext）            │
  │     · 本地队列有 → 直接取 head                                │
  │     · 本地队列空 → 从全局队列取（需要锁）                       │
  │     · 全局队列也空 → 工作窃取（从其他 P 偷）→ 见第 6 节         │
  │     · 全都空 → M 进入自旋，然后休眠                            │
  │                                                            │
  │  ② 绑 G: g0 调用 execute(g, ...)                            │
  │     · G 状态: _Grunnable → _Grunning                         │
  │     · M.curg = g, g.m = m                                   │
  │     · g0 保存调度栈 → 恢复 g 的栈和寄存器                     │
  │     · 跳转到 g 上次被暂停的位置继续执行                         │
  │                                                            │
  │  ③ 运行 G: 执行用户代码，直到遇到"让出点"                      │
  │     · 主动让出: channel 操作、time.Sleep、runtime.Gosched()   │
  │     · 被动让出: sysmon 发现 G 运行超过 10ms → 标记抢占          │
  │     · 阻塞让出: syscall、cgo 调用                             │
  │                                                            │
  │  ④ 切回 g0: 保存 G 的当前执行上下文到 G.sched                 │
  │     · 恢复 g0 的栈和寄存器                                    │
  │     · 根据阻塞原因设置 G 的状态                                │
  │                                                            │
  │  ⑤ 处理阻塞的 G:                                             │
  │     · channel/锁 → G 放等待队列（_Gwaiting）                  │
  │     · syscall → G 放 syscall 队列，P 找新 M                   │
  │     · timer → G 放定时器堆，到期后唤醒                         │
  │     · 正常完成 → G 变 _Gdead，放回 gFree 复用                 │
  │                                                            │
  │  ⑥ 循环: 回到 ①                                              │
  └────────────────────────────────────────────────────────────┘

  【为什么 Go 不需要"事件循环"？】
  GMP 调度器就是 Go 的"事件循环"——只是它内建在 runtime 里了。
  每个 P 独立调度自己的 G 队列，P 之间通过工作窃取均衡负载。
  这比 Node.js 的单线程 Event Loop 更强大——能利用多核并行。
`)
	// ============================================
	// 6. 工作窃取（Work Stealing）— 核心算法
	// ============================================
	fmt.Println("\n=== 6. 工作窃取（Work Stealing）—— 核心算法 ===")

	fmt.Println(`
  【为什么需要工作窃取？】
  不同 P 的 G 队列负载不均——有的 P 忙得要死，有的 P 闲着。
  工作窃取实现了【动态负载均衡】——空闲的 P 从繁忙的 P 偷一半 G。

  【窃取三步走】
  ① P 本地队列空 → 检查全局队列（有锁，一次取一批，减少锁竞争）
  ② 全局队列也空 → 随机选一个 P，尝试从它的队尾"偷"一半 G
  ③ 如果所有 P 都空 → M 自旋 → 休眠

  【窃取策略细节】
  · 被偷的 P 是【随机选择】的（start = fastrand() % nprocs）
  · 从队尾偷（runqtail），而不是队头（runqhead）——减少与被偷 P 的竞争
  · 每次偷不超过 runq/2（一半），保证公平
  · 窃取发生在窃取方的 g0 栈上（窃取代码也是调度逻辑）

  【为什么这个设计好？】
  · 无全局锁：每个 P 主要操作自己的无锁本地队列
  · 自动均衡：忙的 P 自动被偷 → 不需要手动做负载均衡
  · 扩展性好：P 越多，并发调度越不互相干扰

  【一次窃取的数据结构视角】
  P1（空闲）: runq = []                   P2（繁忙）: runq = [G5,G6,G7,G8,G9,G10]
              runnext = nil                            runnext = G4
  窃取后:
  P1: runq = [G7,G8,G9]                  P2: runq = [G5,G6,G10]
       runnext = G10                                 runnext = G4
  （P1 拿了 P2 队尾的一半 + runnext 中的一个）
`)

	// ============================================
	// 7. sysmon — 系统监控线程
	// ============================================
	fmt.Println("\n=== 7. sysmon — 系统监控线程（幕后英雄） ===")

	fmt.Println(`
  sysmon 是 Go runtime 的一个特殊线程（M，不绑定任何 P），它不执行 G，
  只在后台循环检查系统状态：

  【sysmon 的四大职责】
  ① 抢占检测: 检查有没有 G 运行超过 10ms
     → 标记 G 的 stackguard0 → 下次函数调用/循环时被抢占
     → Go 1.14+ 更激进：基于信号的异步抢占，不需要函数调用

  ② netpoll: 检查网络 I/O 是否就绪（epoll/kqueue）
     → 把就绪的 G 从 netpoller 取回，放到运行队列
     → 这就是为什么 Go 的 HTTP 服务能在几百个 goroutine 阻塞在 I/O
       上时只用一个线程服务它们

  ③ 定时器: 检查 timer 堆，把到期的 timer 对应的 G 唤醒

  ④ 回收空闲 P: 长时间空闲的 P 的资源被回收

  sysmon 的检查间隔:
  · 初始 20μs → 逐渐增加（最大 10ms）
  · 有 syscall 被监控时更频繁
`)

	// ============================================
	// 8. GMP 运行时信息
	// ============================================
	fmt.Println("\n=== 8. 当前环境的 GMP 信息 ===")
	fmt.Printf("  CPU 逻辑核数: %d\n", runtime.NumCPU())
	fmt.Printf("  GOMAXPROCS（P 数量）: %d\n", runtime.GOMAXPROCS(0))
	fmt.Printf("  当前 goroutine 总数: %d\n", runtime.NumGoroutine())
	fmt.Printf("  Go 版本: %s\n", runtime.Version())
	// 输出:
	// CPU 逻辑核数: 16
	// GOMAXPROCS（P 数量）: 16
	// 当前 goroutine 总数: 2
	// Go 版本: go1.22.x

	fmt.Println("\n  【GOMAXPROCS 调优指南】")
	fmt.Println("  · CPU 密集型: GOMAXPROCS = NumCPU（默认，不需要改）")
	fmt.Println("  · I/O 密集型: 可以设为 NumCPU × 1.5~2")
	fmt.Println("    原因：I/O 阻塞时 P 会找新 M，更多 P = 更多 M 可并发处理 I/O")
	fmt.Println("  · 容器环境: 设置为 cgroup 限制的 CPU 配额，而非宿主机的 CPU 数")
	fmt.Println("  · 不要超过 NumCPU 的 2 倍——过多 P 导致调度开销增加")

	// ============================================
	// 9. goroutine vs OS 线程 可视化对比
	// ============================================
	fmt.Println("\n=== 9. goroutine vs OS 线程 — 可视化对比 ===")
	fmt.Println("┌──────────┬───────────────────────┬───────────────────────┐")
	fmt.Println("│  特性     │     goroutine          │     OS 线程（pthread）   │")
	fmt.Println("├──────────┼───────────────────────┼───────────────────────┤")
	fmt.Println("│ 调度      │ Go runtime（用户态）    │ OS 内核（内核态）        │")
	fmt.Println("│ 上下文切换 │ ~几十 ns（函数调用级别） │ ~1-10 μs（切换页表/寄存器）│")
	fmt.Println("│ 初始栈    │ 2KB（可增长到 1GB）     │ 1-8MB（固定，OS 分配）    │")
	fmt.Println("│ 创建开销   │ ~几 μs（复用 g 结构体） │ ~几十 μs（内核分配）      │")
	fmt.Println("│ 并发数量   │ 轻松 100 万+           │ 几千（内存限制）         │")
	fmt.Println("│ 100万内存  │ ~2GB（栈）             │ ~1TB+（栈）——不可能！     │")
	fmt.Println("│ 通信机制   │ Channel（推荐）        │ 共享内存 + 锁           │")
	fmt.Println("│ 抢占方式   │ runtime 信号抢占       │ OS 时间片抢占           │")
	fmt.Println("│ 调度策略   │ 协作 + 工作窃取         │ 优先级队列              │")
	fmt.Println("│ 缓存亲和性 │ 高（G 优先在旧 P 运行）  │ 一般（内核随意迁移）      │")
	fmt.Println("└──────────┴───────────────────────┴───────────────────────┘")

	// 内存实测
	const batchSize = 10000
	fmt.Printf("\n  实测: 启动 %d 个 goroutine...\n", batchSize)
	var wgMem sync.WaitGroup
	wgMem.Add(batchSize)
	for i := 0; i < batchSize; i++ {
		go func() {
			wgMem.Done()
			select {} // 永久阻塞以观察
		}()
	}
	wgMem.Wait()
	time.Sleep(50 * time.Millisecond)
	fmt.Printf("  当前 goroutine 总数: %d\n", runtime.NumGoroutine())
	fmt.Printf("  估算内存: %d × ~2KB = ~%dMB\n", batchSize, batchSize*2/1024)
	fmt.Printf("  对比 %d 线程: ~%dGB（不可行）\n", batchSize, batchSize/1024)
	// 输出:
	// 当前 goroutine 总数: 10002
	// 估算内存: 10000 × ~2KB = ~19MB
	// 对比 10000 线程: ~9GB（不可行）

	// ============================================
	// 10. 调度器行为 demo
	// ============================================
	fmt.Println("\n=== 10. 调度器关键行为 demo ===")

	// Gosched 主动让出
	fmt.Println("--- 10.1 runtime.Gosched() — 主动让出 CPU ---")
	var wg10 sync.WaitGroup
	wg10.Add(2)
	go func() {
		defer wg10.Done()
		for i := 0; i < 3; i++ {
			fmt.Printf("  G1: step %d\n", i)
			if i == 1 {
				runtime.Gosched()
				fmt.Println("  G1: 主动 Gosched()——让出 CPU")
			}
		}
	}()
	go func() {
		defer wg10.Done()
		for i := 0; i < 3; i++ {
			fmt.Printf("  G2: step %d\n", i)
		}
	}()
	wg10.Wait()

	// 抢占式调度验证
	fmt.Println("\n--- 10.2 抢占式调度验证 ---")
	preemptDone := make(chan struct{})
	go func() {
		count := 0
		start := time.Now()
		for time.Since(start) < 100*time.Millisecond {
			count++
		}
		fmt.Printf("  压缩循环完成: %d 次迭代\n", count)
		close(preemptDone)
	}()
	go func() {
		for i := 0; i < 5; i++ {
			time.Sleep(20 * time.Millisecond)
			fmt.Printf("  定时 goroutine 仍在运行 #%d\n", i+1)
		}
	}()
	<-preemptDone

	// syscall 阻塞时 P-M 分离示意
	fmt.Println("\n--- 10.3 syscall 阻塞：P-M 分离 ---")
	fmt.Println("  当 G 执行 syscall（如文件读写）:")
	fmt.Println("  ① runtime.entersyscall(): P 状态 → _Psyscall")
	fmt.Println("  ② sysmon 检测到 P 在 syscall 中 >20μs → 剥离 M")
	fmt.Println("  ③ P 找一个新的 M（或从休眠组唤醒一个）→ 继续执行其他 G")
	fmt.Println("  ④ syscall 返回: runtime.exitsyscall()")
	fmt.Println("     → G 状态恢复，尝试找回原来的 P → 找不到就放全局队列")

	// ============================================
	// 11. goroutine 泄漏演示
	// ============================================
	fmt.Println("\n=== 11. goroutine 泄漏演示 ===")
	fmt.Println("--- 11.1 泄漏：channel 无人发送 ---")
	leakBefore := runtime.NumGoroutine()
	leakyCh := make(chan int)
	go func() { <-leakyCh }()
	time.Sleep(20 * time.Millisecond)
	fmt.Printf("  泄漏前: %d, 泄漏后: %d\n", leakBefore, runtime.NumGoroutine())

	fmt.Println("--- 11.2 修复：context 取消 ---")
	ctx, cancel := context.WithCancel(context.Background())
	done := make(chan struct{})
	go func() {
		defer close(done)
		for {
			select {
			case <-ctx.Done():
				fmt.Println("  worker: 收到取消信号，安全退出")
				return
			default:
				time.Sleep(10 * time.Millisecond)
			}
		}
	}()
	cancel()
	<-done
	fmt.Println("  ✓ worker 已安全退出")

	// ============================================
	// 12. 核心要点总结
	// ============================================
	fmt.Println("\n=== 12. 核心要点总结 ===")
	fmt.Println("┌──────────────────────────────────────────────────────────────┐")
	fmt.Println("│  GMP 调度模型速记                                              │")
	fmt.Println("├──────────────────────────────────────────────────────────────┤")
	fmt.Println("│  G: 用户态协程，2KB 栈，百万并发。状态: idle→runnable→running │")
	fmt.Println("│     阻塞: waiting。退出: dead→复用 gFree                      │")
	fmt.Println("│                                                              │")
	fmt.Println("│  M: OS 线程，真正执行代码。每个 M 有 g0（调度用）和 curg（业务用） │")
	fmt.Println("│     状态: 运行/自旋/休眠。syscall 阻塞时 P 剥离、M 被占用       │")
	fmt.Println("│                                                              │")
	fmt.Println("│  P: 逻辑处理器，有 256 个槽的本地 G 队列（无锁）+ mcache         │")
	fmt.Println("│     数量=GOMAXPROCS。空闲时从其他 P 偷一半 G（工作窃取）         │")
	fmt.Println("│                                                              │")
	fmt.Println("│  sysmon: 独立线程，负责抢占检测、netpoll、定时器、回收空闲 P     │")
	fmt.Println("│                                                              │")
	fmt.Println("│  go func() 的完整路径:                                        │")
	fmt.Println("│  ① newproc 创建 G → ② 放 P 本地队列 → ③ P 取 G 给 M 执行       │")
	fmt.Println("│  ④ G 阻塞 → g0 接管 → ⑤ 调度下一个 G → ⑥ 原 G 唤醒回队列       │")
	fmt.Println("└──────────────────────────────────────────────────────────────┘")
}

func say(msg string) {
	for i := 0; i < 5; i++ {
		time.Sleep(50 * time.Millisecond)
		fmt.Println(msg)
	}
}
