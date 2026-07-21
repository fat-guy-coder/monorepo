package concurrency

import (
	"context"
	"fmt"
	"time"
)

// RunSelect 演示 select 多路复用——底层原理、七大实战模式、常见陷阱
func RunSelect() {
	// ============================================
	// 0. select 底层原理概述
	// ============================================
	fmt.Println("=== 0. select 底层原理 ===")
	fmt.Println(`
  select 在编译时被转换为 runtime.selectgo() 调用：
  ① 按 channel 地址排序——统一加锁所有 channel（防死锁）
  ② 遍历所有 case——检查是否有就绪的 channel
  ③ 有就绪→伪随机选一个（fastrand 防饥饿）
  ④ 全都阻塞+无 default→把 G 加入所有 channel 的等待队列→gopark 挂起
  ⑤ 任意 channel 就绪→G 被唤醒→从其他队列中移除
  ⑥ 有 default→所有 case 阻塞时立即执行 default（不挂起）

  select {} (空 select) → 永久阻塞当前 goroutine——实用场景：
  // 让 main goroutine 不退出，其他 goroutine 继续跑
  func main() { go server(); select {} }`)

	// ============================================
	// 1. 基本用法：多路等待
	// ============================================
	fmt.Println("\n=== 1. select 基础：多路等待 ===")
	ch1 := make(chan string)
	ch2 := make(chan string)

	go func() { time.Sleep(10 * time.Millisecond); ch1 <- "one" }()
	go func() { time.Sleep(30 * time.Millisecond); ch2 <- "two" }()

	select {
	case msg := <-ch1:
		fmt.Printf("  received: %s\n", msg) // 输出: one（ch1 先就绪）
	case msg := <-ch2:
		fmt.Printf("  received: %s\n", msg)
	}

	// 随机选择演示
	fmt.Println("  随机选择（多个就绪）：")
	a := make(chan string, 1); a <- "A"
	b := make(chan string, 1); b <- "B"
	for i := 0; i < 4; i++ {
		select {
		case m := <-a: fmt.Printf("    picked: %s\n", m)
		case m := <-b: fmt.Printf("    picked: %s\n", m)
		}
	}
	// 输出（随机）: picked: A / B / A / A
	// 每次运行结果不同

	// ============================================
	// 2. 超时控制（模式 ①）
	// ============================================
	fmt.Println("\n=== 2. 超时控制 ===")
	slowCh := make(chan string)
	select {
	case msg := <-slowCh:
		fmt.Printf("  received: %s\n", msg)
	case <-time.After(50 * time.Millisecond):
		fmt.Println("  timeout! 操作超时")
	}
	// 输出: timeout! 操作超时

	// ============================================
	// 3. 非阻塞操作（模式 ②）
	// ============================================
	fmt.Println("\n=== 3. 非阻塞操作（default） ===")
	// 非阻塞接收
	select {
	case v := <-ch1:
		fmt.Printf("  received: %s\n", v)
	default:
		fmt.Println("  channel empty, do other work")
	}
	// 输出: channel empty, do other work

	// 非阻塞发送
	buf := make(chan int, 1)
	buf <- 1 // 先填满
	select {
	case buf <- 2:
		fmt.Println("  sent")
	default:
		fmt.Println("  channel full, dropped")
	}
	// 输出: channel full, dropped

	// ============================================
	// 4. 退出信号 + for-select（模式 ③ + ④）
	// ============================================
	fmt.Println("\n=== 4. 退出信号 + for-select 循环 ===")
	jobs := make(chan int, 3)
	shutdown := make(chan struct{})

	// Worker: for-select + done 退出
	go func() {
		for {
			select {
			case job, ok := <-jobs:
				if !ok {
					fmt.Println("  worker: jobs channel 关闭，退出")
					return
				}
				fmt.Printf("  worker: 处理 job %d\n", job)
			case <-shutdown:
				fmt.Println("  worker: 收到关闭信号，退出")
				return
			}
		}
	}()

	// 生产者发送 3 个 job 后关闭
	for i := 1; i <= 3; i++ {
		jobs <- i
		time.Sleep(20 * time.Millisecond)
	}
	close(jobs)
	time.Sleep(50 * time.Millisecond)
	// 输出:
	//   worker: 处理 job 1
	//   worker: 处理 job 2
	//   worker: 处理 job 3
	//   worker: jobs channel 关闭，退出

	_ = shutdown // 这个 demo 用 close(jobs) 退出

	// ============================================
	// 5. send 和 recv 混合（模式 ⑥）
	// ============================================
	fmt.Println("\n=== 5. send + recv 混合 ===")
	data := make(chan int, 2)
	control := make(chan string, 1)

	data <- 42
	control <- "pause"

	// 同一个 select 中混合 send 和 recv
	select {
	case v := <-data:
		fmt.Printf("  收到数据: %d\n", v) // 输出: 收到数据: 42
	case data <- 100:
		fmt.Println("  发送了 100")
	case cmd := <-control:
		fmt.Printf("  收到控制命令: %s\n", cmd)
		// 因为 data 和 control 都就绪，随机选一个
	}

	// ============================================
	// 6. nil chan 动态禁用（模式 ⑦）
	// ============================================
	fmt.Println("\n=== 6. nil chan 动态禁用 ===")
	var disabled chan struct{} = nil
	select {
	case <-disabled:
		fmt.Println("  never")
	default:
		fmt.Println("  nil chan skipped")
	}
	// 输出: nil chan skipped

	// 实战：动态启用/禁用超时
	fmt.Println("  动态启用/禁用超时：")
	normalCh := make(chan string, 1)
	normalCh <- "data"
	var timeoutCh <-chan time.Time = nil // 初始不启用超时
	useTimeout := false
	if useTimeout {
		timeoutCh = time.After(5 * time.Second)
	}
	select {
	case msg := <-normalCh:
		fmt.Printf("    received: %s (timeout disabled)\n", msg)
	case <-timeoutCh:
		fmt.Println("    timeout")
	}
	// 输出: received: data (timeout disabled)

	// ============================================
	// 7. select + Ticker（模式 ⑤）
	// ============================================
	fmt.Println("\n=== 7. select + Ticker 定时任务 ===")
	ticker := time.NewTicker(30 * time.Millisecond)
	defer ticker.Stop()
	stop := make(chan struct{})

	go func() {
		time.Sleep(100 * time.Millisecond)
		close(stop)
	}()

	count := 0
loop:
	for {
		select {
		case <-ticker.C:
			count++
			fmt.Printf("  tick #%d\n", count)
		case <-stop:
			fmt.Println("  收到停止信号")
			break loop
		}
	}
	fmt.Printf("  总共 tick %d 次\n", count)
	// 输出: tick #1, tick #2, tick #3, 收到停止信号, 总共 tick 3 次

	// ============================================
	// 8. context 取消（生产级模式）
	// ============================================
	fmt.Println("\n=== 8. select + context（生产级） ===")
	ctx, cancel := context.WithTimeout(context.Background(), 50*time.Millisecond)
	defer cancel()

	workCh := make(chan string)
	go func() {
		time.Sleep(80 * time.Millisecond) // 比 ctx 超时慢
		workCh <- "done"
	}()

	select {
	case result := <-workCh:
		fmt.Printf("  工作完成: %s\n", result)
	case <-ctx.Done():
		fmt.Printf("  取消: %v\n", ctx.Err()) // 输出: 取消: context deadline exceeded
	}

	// ============================================
	// 9. 常见陷阱总结
	// ============================================
	fmt.Println("\n=== 9. 常见陷阱总结 ===")
	fmt.Println(`
  ⚠️ 陷阱清单：
  ① for-select 里没有退出条件 → goroutine 永不退出（泄漏）
  ② select {} (空 select) → 永久阻塞整个 goroutine
  ③ 循环中用 time.After → 每次分配新 Timer，GC 前不释放（内存泄漏）
     ✅ 用 time.NewTimer + Reset 复用
  ④ break 只跳出 select，不跳出外层 for → 用标签 break 或 goto
  ⑤ select 中同时有 send 和 recv case → 两个都就绪时随机选，可能不是你期望的
  ⑥ nil channel 发送/接收会永久阻塞——仅在 select 中用于禁用 case
  `)
}
