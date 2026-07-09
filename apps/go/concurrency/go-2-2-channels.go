package concurrency

import (
	"fmt"
	"time"
)

// RunChannels 演示 channel 通信——goroutine 之间的类型安全管道
func RunChannels() {
	// ============================================
	// 1. 无缓冲 channel（同步握手）
	// ============================================
	fmt.Println("=== 1. 无缓冲 channel（同步） ===")
	ch := make(chan int)
	go func() { ch <- 42 }() // goroutine 发送——阻塞直到有人接收
	v := <-ch                // 主 goroutine 接收——阻塞直到有人发送
	fmt.Printf("received: %d\n", v)
	// 输出: received: 42

	// 双向通信——channel 的两端都可以收发
	go func() {
		ch <- 10
		fmt.Printf("  goroutine 收到: %d\n", <-ch)
		// 输出:   goroutine 收到: 20
	}()
	fmt.Printf("  main 收到: %d\n", <-ch)
	// 输出:   main 收到: 10
	ch <- 20
	time.Sleep(50 * time.Millisecond)

	// ============================================
	// 2. 缓冲 channel（异步队列）
	// ============================================
	fmt.Println("\n=== 2. 缓冲 channel（异步） ===")
	buf := make(chan string, 3) // 容量 3
	buf <- "a"                  // 不阻塞（缓冲未满）
	buf <- "b"
	buf <- "c"
	fmt.Printf("len=%d cap=%d\n", len(buf), cap(buf))
	// 输出: len=3 cap=3
	fmt.Println(<-buf, <-buf, <-buf)
	// 输出: a b c

	// 缓冲满 → 阻塞
	go func() {
		buf <- "d" // 阻塞——缓冲满
		buf <- "e"
		fmt.Println("  发送成功（缓冲有空间了）")
	}()
	time.Sleep(50 * time.Millisecond)
	fmt.Println("  接收一个释放空间:", <-buf) // 释放一个位置 → goroutine 恢复
	time.Sleep(50 * time.Millisecond)
	// 输出:   接收一个释放空间: d
	// 输出:   发送成功（缓冲有空间了）

	// ============================================
	// 3. nil channel 行为
	// ============================================
	fmt.Println("\n=== 3. nil channel ===")
	var nilCh chan int
	// nilCh <- 1   // 永久阻塞！不是 panic
	// <-nilCh       // 永久阻塞！
	// close(nilCh)  // panic!
	fmt.Println("nil channel send/recv: 永久阻塞（select 中用来禁用 case）")
	fmt.Println("close(nil channel): panic!")

	// ============================================
	// 4. 关闭 channel + range 遍历
	// ============================================
	fmt.Println("\n=== 4. close + range ===")
	ch2 := make(chan int, 5)
	ch2 <- 10
	ch2 <- 20
	ch2 <- 30
	close(ch2) // 发送方关闭

	fmt.Println("range 遍历:")
	for v := range ch2 {
		fmt.Printf("  %d\n", v)
	}
	// 输出:
	// range 遍历:
	//   10
	//   20
	//   30

	v2, ok := <-ch2
	fmt.Printf("关闭后再读: v=%d ok=%v\n", v2, ok)
	// 输出: 关闭后再读: v=0 ok=false

	// 关闭 channel 作为广播信号
	done := make(chan struct{})
	for i := 0; i < 3; i++ {
		go func(id int) {
			<-done // 等待关闭信号
			fmt.Printf("  worker %d 收到退出信号\n", id)
		}(i)
	}
	time.Sleep(10 * time.Millisecond)
	close(done) // 所有 goroutine 同时被唤醒！
	time.Sleep(50 * time.Millisecond)
	// 输出（顺序随机）:
	//   worker 0 收到退出信号
	//   worker 2 收到退出信号
	//   worker 1 收到退出信号

	// ============================================
	// 5. 单向 channel
	// ============================================
	fmt.Println("\n=== 5. 单向 channel ===")
	ch3 := make(chan int, 3)
	go produce(ch3)      // 双向→只发（自动）
	consume(ch3)         // 双向→只收（自动）
	// 输出:
	//   consumer: 0
	//   consumer: 1
	//   consumer: 2

	// ============================================
	// 6. 生产者-消费者模式
	// ============================================
	fmt.Println("\n=== 6. 生产者-消费者模式 ===")
	jobs := make(chan int, 3)
	done2 := make(chan struct{})

	go func() {
		for i := 1; i <= 5; i++ {
			fmt.Printf("  生产: %d\n", i)
			jobs <- i
		}
		close(jobs) // 生产完毕
	}()

	go func() {
		for job := range jobs {
			fmt.Printf("    消费: %d\n", job)
			time.Sleep(20 * time.Millisecond)
		}
		done2 <- struct{}{}
	}()

	<-done2 // 等待消费完成
	fmt.Println("  生产者-消费者完成")
	// 输出:
	//   生产: 1, 2, 3
	//     消费: 1, 消费: 2, ...
	//   生产: 4, 5
	//   生产者-消费者完成
}

func produce(ch chan<- int) {
	for i := 0; i < 3; i++ {
		ch <- i
	}
	close(ch) // 发送方关闭——单向 channel 同样适用
}

func consume(ch <-chan int) {
	for v := range ch {
		fmt.Printf("  consumer: %d\n", v)
	}
}
