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
│                        G（Goroutine结构体）                        │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  type g struct {                                                 │
│      stack       stack        // 栈内存（lo 到 hi，初始 2KB）      │
│      stackguard0 uintptr      // 栈溢出检测的警戒线                │
│                                                                  │
│      sched       gobuf        // 调度上下文（寄存器快照）           │
│      ┌─────────────────────────────────────┐                     │
│      │ sp   uintptr  // 栈指针（保存位置）   │                     │
│      │ pc   uintptr  // 程序计数器（下一条指令）│                    │
│      │ g    guintptr // 指向自己的指针       │                     │
│      │ ret  uintptr  // 返回值              │                     │
│      └─────────────────────────────────────┘                     │
│                                                                  │
│      atomicstatus uint32      // goroutine 状态（见下方状态机）     │
│      goid         int64       // 全局唯一的 goroutine ID          │
│      m            *m          // 当前绑定的 M（运行时）            │
│      lockedm      *m          // 锁定到某个 M（LockOSThread）     │
│      gopc         uintptr     // 创建此 goroutine 的 go 语句 PC    │
│      startpc      uintptr     // goroutine 函数的入口 PC           │
│      waitreason   string      // 阻塞原因（调试用）                │
│  }                                                               │
│                                                                  │
│  【G 的状态机】                                                    │
│                                                                  │
│  _Gidle     ──→ 刚分配，尚未初始化                                 │
│  _Grunnable ──→ 在运行队列中等待 M 执行                             │
│  _Grunning  ──→ 正在某个 M 上执行（与 M 和 P 绑定）                 │
│  _Gsyscall  ──→ 在执行系统调用（阻塞中，M 被占用）                   │
│  _Gwaiting  ──→ 阻塞在 channel/锁/timer/网络 I/O 上                │
│  _Gdead     ──→ 执行完毕，可被复用（放入 gFree 列表）               │
│  _Gcopystack──→ 栈正在扩容（复制到新栈中）                          │
│  _Gpreempted──→ 被抢占，等待重新调度                               │
│                                                                  │
│  典型流转：                                                       │
│  _Gidle → _Grunnable → _Grunning → _Gwaiting → _Grunnable → ... │
│                               ↓                                  │
│                            _Gdead（复用或 GC）                    │
│                                                                  │
│  【goroutine 生命周期】                                            │
│                                                                  │
│  ① 创建: go func() → runtime.newproc()                           │
│     → 分配 g 结构体（优先从 gFree 复用）                            │
│     → 初始化 2KB 栈                                                │
│     → 状态设为 _Grunnable，放入 P 的本地队列                        │
│                                                                  │
│  ② 运行: P 从队列头部取出 G，绑定 M                                 │
│     → 恢复 G.sched 中保存的寄存器                                   │
│     → 执行 goroutine 函数体                                        │
│                                                                  │
│  ③ 阻塞: G 遇到 channel/锁/timer/网络 I/O                         │
│     → 保存当前执行上下文到 G.sched                                 │
│     → 状态改为 _Gwaiting                                          │
│     → M 与 G 分离，M 绑定 P 取下一个 G 执行                          │
│                                                                  │
│  ④ 唤醒: 阻塞条件满足（channel 有数据、锁释放...）                    │
│     → G 状态改为 _Grunnable，放回 P 队列                            │
│     → 等待调度器重新调度它                                          │
│                                                                  │
│  ⑤ 退出: goroutine 函数 return                                    │
│     → 状态改为 _Gdead                                              │
│     → g 结构体放回 gFree 列表（下次复用，减少内存分配）               │
└──────────────────────────────────────────────────────────────────┘
`)

	// ============================================
	// 3. M（Machine）— 深度解析
	// ============================================
	fmt.Println("\n=== 3. M — Machine（OS 线程） ===")

	fmt.Println(`
┌──────────────────────────────────────────────────────────────────┐
│                      M（Machine 结构体）                           │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  type m struct {                                                 │
│      g0       *g          // 【关键】调度 g——用于执行调度代码       │
│      curg     *g          // 当前正在运行的用户 g（即业务 goroutine）│
│      p        puintptr    // 当前绑定的 P                          │
│      nextp    puintptr    // 即将绑定的 P（M 从休眠唤醒时用）        │
│      oldp     puintptr    // 之前绑定的 P（系统调用返回后复用）       │
│                                                                  │
│      spinning bool        // M 是否在"自旋"寻找可运行的 G           │
│      blocked  bool        // M 是否阻塞在 note（休眠）上            │
│      incgo    bool        // 是否在执行 cgo 调用                   │
│      locks    int32       // 锁计数（M 被锁定不能抢占）             │
│      park     note        // 休眠/唤醒的同步原语（OS futex）         │
│  }                                                               │
│                                                                  │
│  【关键概念：g0 vs curg】                                          │
│                                                                  │
│  每个 M 有两个特殊的 goroutine：                                   │
│                                                                  │
│  ① g0（调度 goroutine）— 在 M 创建时分配，有自己独立的栈             │
│     · 不运行用户代码，只执行调度逻辑（schedule 函数）                 │
│     · 当 M 需要切换到另一个 G 时，先切到 g0，g0 选择下一个 G         │
│     · 为什么要 g0？— 调度器也需要一个栈来运行，不能用用户 G 的栈      │
│                                                                  │
│  ② curg（当前用户 goroutine）— 正在执行业务代码的 G                 │
│     · M 的"真正常态"——M 存在就是为了服务用户 G                       │
│     · 当 G 阻塞时，curg 被剥离，M 的 g0 接管                         │
│                                                                  │
│  【M 的三种状态】                                                   │
│                                                                  │
│  ┌──────────────┬────────────────────────────────────────┐       │
│  │ 运行中        │ 绑定了 P，正在执行 G（curg != nil）       │       │
│  ├──────────────┼────────────────────────────────────────┤       │
│  │ 自旋(spinning)│ 没有绑 P（或 P 刚被剥离），但 M 不睡觉      │       │
│  │              │ 它在自旋寻找可运行的 G（类似忙等）          │       │
│  │              │ 同时最多 GOMAXPROCS 个自旋 M——避免过多 CPU │       │
│  ├──────────────┼────────────────────────────────────────┤       │
│  │ 休眠(parked)  │ 没有可运行的 G，M 进入 OS 休眠            │       │
│  │              │ 被唤醒后通过 nextp 绑定新的 P             │       │
│  └──────────────┴────────────────────────────────────────┘       │
│                                                                  │
│  【M 的创建与复用】                                                │
│                                                                  │
│  ① 正常情况：M 数量 ≈ P 数量（因为一个 P 同时只需一个 M 来执行）      │
│  ② 系统调用阻塞：P 分离 → 需要新 M → runtime.newm() 创建新线程      │
│  ③ 当阻塞的 M 从 syscall 返回：把 G 放回队列，M 尝试"自旋"找活干     │
│  ④ M 上限 10000（runtime 限制）— 防止线程爆炸                      │
│  ⑤ 在 Linux 上，每个 M 对应一个 pthread（clone 系统调用）           │
└──────────────────────────────────────────────────────────────────┘
`)

	// ============================================
	// 4. P（Processor）— 深度解析
	// ============================================
	fmt.Println("\n=== 4. P — Processor（逻辑处理器） ===")

	fmt.Println(`
┌──────────────────────────────────────────────────────────────────┐
│                      P（Processor 结构体）                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  type p struct {                                                 │
│      id          int32       // P 的编号（0, 1, 2, ...）          │
│      status      uint32      // 状态：_Pidle/_Prunning/_Psyscall  │
│                                                                  │
│      m           muintptr    // 当前绑定的 M（没有则为 nil）        │
│      mcache      *mcache     // 【关键】P 独有的内存分配缓存        │
│                                                                  │
│      // ── G 的本地队列（无锁，速度快）──                           │
│      runq        [256]guintptr  // 环形队列——存 _Grunnable 的 G    │
│      runqhead    uint32         // 队头索引                       │
│      runqtail    uint32         // 队尾索引                       │
│      runnext     guintptr       // 下一个优先执行的 G（单槽缓存）    │
│                                                                  │
│      // ── 已退出的 G 复用缓存 ──                                  │
│      gFree       struct {       // _Gdead 状态的 g 列表            │
│          n        int32        // 数量                            │
│          list     *g           // 链表头                          │
│      }                                                           │
│                                                                  │
│      // ── 其他 ──                                                │
│      syscalltick uint32       // syscall 计数（用于 sysmon 监控）   │
│      schedtick   uint32       // 调度计数                          │
│      preempt     bool         // 是否被标记抢占                    │
│  }                                                               │
│                                                                  │
│  【P 的三种状态与生命周期】                                         │
│                                                                  │
│  _Pidle    ──→ P 在空闲链表（pidle list）中，等待被 M 绑定         │
│  _Prunning ──→ P 已绑定 M，正在执行 G                              │
│  _Psyscall ──→ P 的当前 G 在执行系统调用，M 被阻塞                  │
│                                                                  │
│  流转: _Pidle → acquirep() → _Prunning → releasep() → _Pidle     │
│               ↑    M 绑定 P       M/P 分离    ↑                   │
│                                                                  │
│  【P 数量的决定因素: GOMAXPROCS】                                   │
│                                                                  │
│  · 默认值 = runtime.NumCPU()（CPU 逻辑核心数）                      │
│  · P 的数量决定了【真正并行】的 goroutine 数——每个 P 同一时刻只能     │
│    运行一个 G。更多的 P = 更多 CPU 核心被利用                         │
│  · 修改: runtime.GOMAXPROCS(n) 或环境变量 GOMAXPROCS=n             │
│  · I/O 密集型可以设大（CPU 核数的 1.5-2 倍），CPU 密集型 = 核数       │
│                                                                  │
│  【mcache — 为什么锁那么快】                                        │
│  · 每个 P 有独立的 mcache（内存分配缓存）——分配小对象时不需要全局锁    │
│  · mcache 缓存了各种大小等级的 span，直接从 P 本地取                  │
│  · 这就是为什么 Go 的多 goroutine 并发分配内存几乎没有锁竞争          │
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
