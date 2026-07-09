package concurrency

import (
	"fmt"
	"time"
)

// RunSelect 演示 select 多路复用
func RunSelect() {
	// ============================================
	// 1. 基本用法
	// ============================================
	fmt.Println("=== 1. select 基础 ===")
	ch1 := make(chan string); ch2 := make(chan string)
	go func() { time.Sleep(10 * time.Millisecond); ch1 <- "one" }()
	go func() { time.Sleep(20 * time.Millisecond); ch2 <- "two" }()
	select {
	case msg := <-ch1: fmt.Println(msg)
	case msg := <-ch2: fmt.Println(msg)
	}
	// 输出: one（ch1 先就绪）

	// ============================================
	// 2. 超时控制
	// ============================================
	fmt.Println("\n=== 2. 超时控制 ===")
	slowCh := make(chan string)
	select {
	case msg := <-slowCh:
		fmt.Println("received:", msg)
	case <-time.After(50 * time.Millisecond):
		fmt.Println("timeout! 操作超时")
	}
	// 输出: timeout! 操作超时

	// ============================================
	// 3. default 非阻塞
	// ============================================
	fmt.Println("\n=== 3. default 非阻塞 ===")
	select {
	case v := <-ch1: fmt.Println("received", v)
	default: fmt.Println("channel empty, do other work")
	}
	// 输出: channel empty, do other work

	// ============================================
	// 4. nil chan 动态禁用
	// ============================================
	fmt.Println("\n=== 4. nil chan 动态禁用 ===")
	var disabled chan struct{} = nil
	select {
	case <-disabled: fmt.Println("never")
	default: fmt.Println("nil chan skipped")
	}
	// 输出: nil chan skipped

	// ============================================
	// 5. 随机选择演示
	// ============================================
	fmt.Println("\n=== 5. 随机选择（多个就绪） ===")
	a := make(chan string, 1); a <- "A"
	b := make(chan string, 1); b <- "B"
	for i := 0; i < 4; i++ {
		select {
		case m := <-a: fmt.Printf("  picked: %s\n", m)
		case m := <-b: fmt.Printf("  picked: %s\n", m)
		}
	}
	// 输出示例:
	//   picked: A
	//   picked: B
	//   picked: A
	//   picked: A
	// （随机，每次运行不同）

	// ============================================
	// 6. for-select 循环模式
	// ============================================
	fmt.Println("\n=== 6. for-select 循环 ===")
	jobs := make(chan int, 3)
	done := make(chan struct{})

	// 生产者
	go func() {
		for i := 1; i <= 3; i++ {
			jobs <- i
			time.Sleep(20 * time.Millisecond)
		}
		close(jobs)
	}()

	// 消费者（for-select 模式）
	go func() {
		for {
			select {
			case job, ok := <-jobs:
				if !ok {
					fmt.Println("  jobs channel 关闭，退出")
					done <- struct{}{}
					return
				}
				fmt.Printf("  处理 job: %d\n", job)
			}
		}
	}()

	<-done
	// 输出:
	//   处理 job: 1
	//   处理 job: 2
	//   处理 job: 3
	//   jobs channel 关闭，退出

	// ============================================
	// 7. select + time.Ticker 定时任务
	// ============================================
	fmt.Println("\n=== 7. select + Ticker 定时任务 ===")
	ticker := time.NewTicker(30 * time.Millisecond)
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
			ticker.Stop()
			break loop
		}
	}
	fmt.Printf("总共 tick %d 次\n", count)
	// 输出:
	//   tick #1
	//   tick #2
	//   tick #3
	//   收到停止信号
	//   总共 tick 3 次
}
