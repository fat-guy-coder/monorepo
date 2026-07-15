package concurrency

import (
	"fmt"
	"sync"
	"time"
)

// RunChannels 深度演示 channel 通信——底层结构、同步/异步、经典并发模式。
func RunChannels() {
	// ============================================
	// 0. Channel 底层结构 hchan
	// ============================================
	fmt.Println("=== 0. Channel 底层结构 hchan ===")
	fmt.Println(`
  Channel 本质是一个指向 runtime.hchan 的指针：

  type hchan struct {
      qcount   uint           // 环形队列中当前的元素数
      dataqsiz uint           // 环形队列总容量（make(chan T, N) 的 N）
      buf      unsafe.Pointer // 环形队列指针（缓冲数据存放处）
      elemsize uint16         // 每个元素的大小
      closed   uint32         // channel 是否已关闭
      sendx    uint           // 发送索引（buf 中下一个写入位置）
      recvx    uint           // 接收索引（buf 中下一个读取位置）
      recvq    waitq          // 等待接收的 goroutine 队列（FIFO 链表）
      sendq    waitq          // 等待发送的 goroutine 队列（FIFO 链表）
      lock     mutex          // 保护所有字段的互斥锁
  }

  【send 和 recv 底层到底发生了什么？】

  ┌─ send(ch, v) 的执行流程 ───────────────────────────────────┐
  │ ① lock(&ch.lock)              —— 获取互斥锁                │
  │ ② 检查 ch.closed              —— 已关闭→panic！            │
  │ ③ 有 recvq 等待者？            —— 非缓冲/缓冲空的场景        │
  │    ├─ 有: 直接把 v 从发送方栈  │                             │
  │    │      拷贝到接收方栈       │  ← 无 buf 参与！            │
  │    │      唤醒recv G (goready)│                             │
  │    └─ 无: qcount < dataqsiz?  │                             │
  │           ├─ 是: 拷贝v到      │                             │
  │           │      buf[sendx]   │  ← 写入环形队列             │
  │           │      sendx++,     │                             │
  │           │      qcount++     │                             │
  │           └─ 否: 把自己挂起   │                             │
  │                  (gopark)     │  ← 加入 sendq 等待队列      │
  │                  保存 sp/pc   │                             │
  │                  到 g.sched   │                             │
  │ ④ unlock(&ch.lock)            —— 释放锁                   │
  └────────────────────────────────────────────────────────────┘

  ┌─ recv(ch, &v) 的执行流程 ──────────────────────────────────┐
  │ ① lock(&ch.lock)              —— 获取互斥锁                │
  │ ② 有 sendq 等待者？            —— 非缓冲/缓冲满的场景        │
  │    ├─ 有: 直接把数据从发送方栈  │                             │
  │    │      拷贝到接收方栈       │  ← 无 buf 参与！            │
  │    │      唤醒send G (goready)│                             │
  │    └─ 无: qcount > 0?         │                             │
  │           ├─ 是: 从buf[recvx] │                             │
  │           │      拷贝数据到 v  │  ← 从环形队列读取           │
  │           │      recvx++,     │                             │
  │           │      qcount--     │                             │
  │           └─ 否: 把自己挂起   │                             │
  │                  (gopark)     │  ← 加入 recvq 等待队列      │
  │ ③ 检查 ch.closed && buf空?    —— closed + 空了→返回零值     │
  │ ④ unlock(&ch.lock)            —— 释放锁                   │
  └────────────────────────────────────────────────────────────┘

  【关键理解：为什么 channel 是并发安全的？】
  · 所有操作都先 lock(&ch.lock)——一把大锁保护整个 hchan
  · 阻塞时调用 gopark()——挂起当前 G 而不是忙等
  · 唤醒时调用 goready()——把对方 G 放回 P 的队列

  【非缓冲 vs 缓冲：数据路径完全不同】
  · 非缓冲 (dataqsiz=0, buf=nil):
    send 的内存拷贝: sender栈 → 直接拷贝到 → receiver栈（跳过buf）
  · 缓冲 (dataqsiz>0, buf!=nil):
    send 的内存拷贝: sender栈 → buf[sendx]
    recv 的内存拷贝: buf[recvx] → receiver栈
  · make(chan T) 返回的是 *hchan——所以 channel 传参不需要 &ch

  【Channel 的四大核心用途】
  ① 传递数据: goroutine A→channel→goroutine B，类型安全的管道
  ② 同步信号: done channel（chan struct{}），"我完成了，通知你"
  ③ 广播退出: close(ch) 同时唤醒所有等待者
  ④ 并发控制: 缓冲 channel 作为 Semaphore（容量=最大并发数）`)

	// ============================================
	// 1. 无缓冲 channel（同步握手）—— send 和 recv 同时发生
	// ============================================
	fmt.Println("\n=== 1. 无缓冲 channel（同步握手） ===")
	ch := make(chan int) // dataqsiz=0, buf=nil

	// 1.1 基础：send 必须等 recv，recv 必须等 send
	go func() {
		fmt.Println("  sender: 准备发送 42...")
		ch <- 42 // 阻塞，直到有接收方就绪
		fmt.Println("  sender: 42 已送达！")
	}()
	time.Sleep(50 * time.Millisecond) // 确保 sender 先阻塞
	fmt.Println("  receiver: 准备接收...")
	v := <-ch // 阻塞，直到有发送方就绪 → 直接内存拷贝，跳过 buf
	fmt.Printf("  receiver: 收到 %d\n", v)
	// 输出:
	//   sender: 准备发送 42...
	//   receiver: 准备接收...
	//   sender: 42 已送达！
	//   receiver: 收到 42

	// 1.2 双向通信：无缓冲 channel 是天然的同步点
	fmt.Println("\n  双向通信演示:")
	go func() {
		ch <- 10            // send→等待 recv
		fmt.Printf("    goroutine 收到回传: %d\n", <-ch) // recv→等待 send
	}()
	fmt.Printf("    main 收到: %d\n", <-ch) // recv→配对上面的 send
	ch <- 20                              // send→配对上面的 recv
	time.Sleep(50 * time.Millisecond)
	// 输出:
	//   main 收到: 10
	//   goroutine 收到回传: 20

	// 1.3 无缓冲 channel 用作同步信号（done channel 模式）
	fmt.Println("\n  同步信号（done channel）:")
	done := make(chan struct{}) // struct{} 占 0 字节，纯信号
	go func() {
		fmt.Println("    worker: 工作中...")
		time.Sleep(100 * time.Millisecond)
		fmt.Println("    worker: 完成！")
		done <- struct{}{} // 发送信号——"我完成了"
	}()
	fmt.Println("    main: 等待 worker...")
	<-done // 阻塞，直到 worker 完成
	fmt.Println("    main: 收到完成信号，继续")
	// 输出:
	//   main: 等待 worker...
	//   worker: 工作中...
	//   worker: 完成！
	//   main: 收到完成信号，继续

	// ============================================
	// 2. 缓冲 channel（异步队列）—— send 和 recv 解耦
	// ============================================
	fmt.Println("\n=== 2. 缓冲 channel（异步队列） ===")
	buf := make(chan string, 3) // dataqsiz=3, buf 环形队列 3 个槽

	// 2.1 缓冲未满 → send 立即返回
	fmt.Println("  缓冲未满，send 不阻塞:")
	buf <- "a" // sendx=0→写 buf[0], qcount=1
	buf <- "b" // sendx=1→写 buf[1], qcount=2
	buf <- "c" // sendx=2→写 buf[2], qcount=3
	fmt.Printf("  len=%d cap=%d（满了！）\n", len(buf), cap(buf))
	// 输出: len=3 cap=3（满了！）

	// 2.2 缓冲满 → send 阻塞（等待 recv 腾出位置）
	fmt.Println("\n  缓冲满，send 阻塞:")
	go func() {
		fmt.Println("    sender: 尝试发送 'd'（将阻塞）...")
		buf <- "d" // 阻塞！sendq 队列上等待 recv
		fmt.Println("    sender: 'd' 已送入缓冲")
		buf <- "e" // 又阻塞！sendq 队列上等待
		fmt.Println("    sender: 'e' 已送入缓冲")
	}()
	time.Sleep(50 * time.Millisecond) // 确保 sender 已阻塞
	fmt.Printf("    recv: 取出 %q（释放一个槽位）\n", <-buf) // recvx=0→读 buf[0]
	time.Sleep(50 * time.Millisecond)                      // 等 sender 写入 d
	fmt.Printf("    recv: 取出 %q\n", <-buf)              // recvx=1→读 buf[1]
	time.Sleep(50 * time.Millisecond)
	fmt.Printf("    recv: 取出 %q\n", <-buf) // recvx=2→读 buf[2]
	time.Sleep(50 * time.Millisecond)
	fmt.Printf("    recv: 取出 %q\n", <-buf) // recvx=0→读 buf[0]（环形）
	time.Sleep(50 * time.Millisecond)
	fmt.Printf("    remaining: %q（还剩下 e）\n", <-buf)
	// 输出:
	//   sender: 尝试发送 'd'（将阻塞）...
	//   recv: 取出 "a"（释放一个槽位）
	//   sender: 'd' 已送入缓冲
	//   sender: 尝试发送 'e'（将阻塞）...
	//   recv: 取出 "b", recv: 取出 "c"
	//   sender: 'e' 已送入缓冲
	//   recv: 取出 "d", recv: 取出 "e"

	// 2.3 缓冲 channel 用作信号量（Semaphore）——控制并发数
	fmt.Println("\n  缓冲 channel 用作信号量（控制最多 3 个并发）:")
	sema := make(chan struct{}, 3) // 容量 3 = 最多同时 3 个 goroutine
	var wgSema sync.WaitGroup
	for i := 1; i <= 8; i++ {
		wgSema.Add(1)
		go func(id int) {
			defer wgSema.Done()
			sema <- struct{}{} // 获取槽位——满了就阻塞
			defer func() { <-sema }() // 释放槽位
			fmt.Printf("    task %d 开始\n", id)
			time.Sleep(30 * time.Millisecond)
			fmt.Printf("    task %d 完成\n", id)
		}(i)
	}
	wgSema.Wait()
	// 输出: 同时最多 3 个 task 在运行，其余排队等待
	// task 1,2,3 开始 → 完成 → task 4,5,6 开始 → ...

	// ============================================
	// 3. nil channel — 永久阻塞的特殊语义
	// ============================================
	fmt.Println("\n=== 3. nil channel 的特殊行为 ===")
	fmt.Println(`
  nil channel（var ch chan T）不是 make 出来的，它永远是 nil。
  【三大规则】
  ① nilCh <- v   → 永久阻塞（不是 panic！用于禁用 select case）
  ② <-nilCh      → 永久阻塞
  ③ close(nilCh) → panic!

  【实用技巧】在 select 中动态禁用某个 case：
  var timeoutCh <-chan time.Time = nil // 初始不想要超时
  if needTimeout {
      timeoutCh = time.After(5 * time.Second)
  }
  select {
  case <-timeoutCh: // nil 时永远不会被选中，非 nil 时有效
  case <-workCh:
  }`)

	// ============================================
	// 4. 关闭 channel — 广播信号 + range 遍历
	// ============================================
	fmt.Println("\n=== 4. 关闭 channel 的完整规则 ===")
	fmt.Println(`
  ┌────────────────────────────────┬────────────────────────┐
  │  操作                           │  结果                   │
  ├────────────────────────────────┼────────────────────────┤
  │ close(ch) — ch 未关闭           │ ✅ 关闭成功              │
  │ close(ch) — ch 已关闭           │ ❌ panic                │
  │ close(nil)                     │ ❌ panic                │
  │ ch <- v — ch 已关闭             │ ❌ panic                │
  │ <-ch — ch 已关闭且 buf 非空      │ ✅ 返回 buf 中剩余值      │
  │ <-ch — ch 已关闭且 buf 为空      │ ✅ 返回零值, ok=false     │
  │ for v := range ch — ch 已关闭   │ ✅ 读完 buf 后自动退出     │
  └────────────────────────────────┴────────────────────────┘

  【黄金法则】只有发送方关闭 channel，接收方只管读！`)

	fmt.Println("  示例: close + range")
	ch2 := make(chan int, 5)
	for i := 1; i <= 3; i++ {
		ch2 <- i * 10
	}
	close(ch2) // 发送方关闭
	fmt.Print("  range: ")
	for v := range ch2 {
		fmt.Printf("%d ", v)
		// range 在 channel 关闭且 buf 清空后自动退出
	}
	fmt.Println()
	// 输出: range: 10 20 30

	v2, ok := <-ch2
	fmt.Printf("  关闭后再读: v=%d, ok=%v\n", v2, ok)
	// 输出: 关闭后再读: v=0, ok=false

	// 关闭 channel 作为广播——所有等待者同时被唤醒
	fmt.Println("\n  关闭 channel 广播信号（同时唤醒 5 个 goroutine）:")
	broadcast := make(chan struct{})
	for i := 0; i < 5; i++ {
		go func(id int) {
			<-broadcast // 等待关闭信号
			fmt.Printf("    worker %d 收到广播\n", id)
		}(i)
	}
	time.Sleep(20 * time.Millisecond)
	close(broadcast) // 所有 <-broadcast 同时收到零值！
	time.Sleep(50 * time.Millisecond)
	// 输出（所有 worker 几乎同时打印）:
	//   worker 0/1/2/3/4 收到广播

	// ============================================
	// 5. 单向 channel — 编译时确保方向正确
	// ============================================
	fmt.Println("\n=== 5. 单向 channel（编译时类型安全） ===")
	fmt.Println(`
  类型语法:
    chan<- T  = 只能发送（send-only）
    <-chan T  = 只能接收（recv-only）

  双向 chan 可以隐式转为单向，反之不行。
  这是 Go 类型系统提供的编译时保证——防止你在不该发的地方发数据。`)

	ch3 := make(chan int, 3)
	go produce(ch3)  // 双向 → send-only（自动转换）
	consume(ch3)     // 双向 → recv-only（自动转换）
	// 输出:
	//   consumer: 0
	//   consumer: 1
	//   consumer: 2

	// ============================================
	// 6. 经典并发模式
	// ============================================
	fmt.Println("\n=== 6. 经典并发模式 ===")

	// 6.1 生产者-消费者（带多个消费者）
	fmt.Println("--- 6.1 生产者-消费者（1 生产 + 3 消费） ---")
	jobs := make(chan int, 5)
	var wgWorkers sync.WaitGroup

	// 启动 3 个消费者
	for w := 1; w <= 3; w++ {
		wgWorkers.Add(1)
		go func(workerID int) {
			defer wgWorkers.Done()
			for job := range jobs { // range 自动在 close(jobs) 后退出
				fmt.Printf("    worker-%d 处理 job %d\n", workerID, job)
				time.Sleep(30 * time.Millisecond)
			}
			fmt.Printf("    worker-%d 退出\n", workerID)
		}(w)
	}

	// 生产者
	for j := 1; j <= 6; j++ {
		fmt.Printf("  生产 job %d\n", j)
		jobs <- j
	}
	close(jobs) // 生产完毕 → 所有 worker 的 range 将在消费完后退出
	wgWorkers.Wait()
	fmt.Println("  所有 job 已消费")
	// 输出:
	//   生产 job 1..6
	//   worker-1/2/3 各处理几个 job（随机分配）
	//   worker-1/2/3 退出
	//   所有 job 已消费

	// 6.2 Fan-out / Fan-in（扇出 / 扇入）
	fmt.Println("\n--- 6.2 Fan-out / Fan-in ---")
	nums := []int{2, 3, 4, 5, 6, 7, 8, 9, 10}
	in := gen(nums...)    // Generator: 生成数字流
	c1 := sq(in)          // Fan-out: Worker 1 处理一部分
	c2 := sq(in)          // Fan-out: Worker 2 处理一部分
	merged := merge(c1, c2) // Fan-in: 合并两个 worker 的输出

	fmt.Print("  结果: ")
	for v := range merged {
		fmt.Printf("%d ", v) // 平方值，顺序取决于谁先算完
	}
	fmt.Println()
	// 输出: 结果: 4 9 16 25 36 49 64 81 100（顺序随机）

	// 6.3 Or-Done 模式 — 优雅地取消 channel 消费
	fmt.Println("\n--- 6.3 Or-Done 模式 ---")
	dataCh := make(chan int)
	stopCh := make(chan struct{})

	// 生产者：持续发送直到被打断
	go func() {
		i := 0
		for {
			select {
			case dataCh <- i:
				i++
				time.Sleep(20 * time.Millisecond)
			case <-stopCh:
				close(dataCh)
				return
			}
		}
	}()

	// 消费者：读到 5 个值后主动停止
	count := 0
	for v := range orDone(dataCh, stopCh) {
		fmt.Printf("    orDone 消费: %d\n", v)
		count++
		if count >= 5 {
			close(stopCh) // 通知生产者停止
		}
	}
	fmt.Println("    orDone 消费完成")
	// 输出: orDone 消费: 0, 1, 2, 3, 4, orDone 消费完成

	// ============================================
	// 7. Channel 的常见错误
	// ============================================
	fmt.Println("\n=== 7. Channel 常见错误总结 ===")
	fmt.Println(`
  ┌─────────────────────────────────────────────────────────┐
  │ ❌ 向已关闭 channel 发送 → panic（send on closed channel）  │
  │ ❌ 关闭已关闭的 channel → panic                           │
  │ ❌ 关闭 nil channel → panic                              │
  │ ❌ 接收方关闭 channel → 发送方再发送 → panic               │
  │ ⚠️ nil channel send/recv → 永久阻塞（不是 panic）          │
  │ ⚠️ 无缓冲 channel 无接收方时 send → 永久阻塞               │
  │ ⚠️ 忘记 close(ch) → range 永不退出 → goroutine 泄漏       │
  │                                                         │
  │ ✅ 黄金法则: 发送方关闭 channel                            │
  │ ✅ range channel 自动在 close 后退出                      │
  │ ✅ 用 _, ok := <-ch 检查 channel 是否关闭                  │
  │ ✅ struct{} 做信号 channel（零内存）                        │
  └─────────────────────────────────────────────────────────┘
`)
}

// ======================== 辅助函数 ========================

// produce: 发送方向 channel 写入数据
func produce(ch chan<- int) {
	for i := 0; i < 3; i++ {
		ch <- i
	}
	close(ch) // 发送方关闭——单向 channel 同样适用
}

// consume: 接收方向 channel 读取数据
func consume(ch <-chan int) {
	for v := range ch {
		fmt.Printf("  consumer: %d\n", v)
	}
}

// gen: Generator 模式——返回一个 channel，惰性生成序列
func gen(nums ...int) <-chan int {
	out := make(chan int, len(nums)) // 预分配容量，不阻塞
	go func() {
		for _, n := range nums {
			out <- n
		}
		close(out)
	}()
	return out
}

// sq: Pipeline 阶段——对输入 channel 的每个值求平方
func sq(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		for n := range in {
			out <- n * n
		}
		close(out)
	}()
	return out
}

// merge: Fan-in——合并多个 channel 到一个输出 channel
func merge(cs ...<-chan int) <-chan int {
	var wg sync.WaitGroup
	out := make(chan int)

	// 为每个输入 channel 启动一个 goroutine
	for _, c := range cs {
		wg.Add(1)
		go func(ch <-chan int) {
			defer wg.Done()
			for n := range ch {
				out <- n
			}
		}(c)
	}

	// 等所有 goroutine 完成，关闭输出 channel
	go func() {
		wg.Wait()
		close(out)
	}()
	return out
}

// orDone: 优雅取消模式——从 data channel 读取，但 stop 信号到达时安全退出。
// 这避免了 goroutine 泄漏——如果外部不再消费 data channel，生产端的 goroutine 会阻塞。
func orDone(data <-chan int, stop <-chan struct{}) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for {
			select {
			case v, ok := <-data:
				if !ok {
					return // data channel 已关闭，正常退出
				}
				select {
				case out <- v: // 成功发送到输出
				case <-stop:
					return // 收到停止信号，退出
				}
			case <-stop:
				return // 收到停止信号，退出
			}
		}
	}()
	return out
}
