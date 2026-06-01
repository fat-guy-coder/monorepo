package concurrency

import (
	"fmt"
	"time"
)

// RunChannels 演示 Go 中的 channel 通信。
func RunChannels() {
	// --- 无缓冲 channel ---
	fmt.Println("\n--- 无缓冲 channel（同步）---")

	ch := make(chan string)

	go func() {
		time.Sleep(50 * time.Millisecond)
		ch <- "数据已就绪" // 阻塞直到接收方准备好
		fmt.Println("  发送完成")
	}()

	fmt.Println("等待接收...")
	msg := <-ch // 阻塞直到发送方发送
	fmt.Printf("  接收到: %q\n", msg)
	fmt.Println("无缓冲 channel 保证同步：发送和接收同时发生。")

	// --- 缓冲 channel ---
	fmt.Println("\n--- 缓冲 channel（异步）---")

	bufCh := make(chan int, 3)

	// 发送不会阻塞（缓冲区未满）
	bufCh <- 1
	bufCh <- 2
	bufCh <- 3
	fmt.Printf("缓冲 channel 已发送 3 个值, len=%d, cap=%d\n", len(bufCh), cap(bufCh))

	// 第 4 个会阻塞（缓冲区满）
	done := make(chan bool)
	go func() {
		bufCh <- 4 // 阻塞
		fmt.Println("  第 4 个值已发送")
		done <- true
	}()

	// 接收一个，释放缓冲空间
	fmt.Printf("接收: %d\n", <-bufCh)
	time.Sleep(50 * time.Millisecond)
	fmt.Printf("接收: %d\n", <-bufCh)
	<-done

	// --- channel 方向 ---
	fmt.Println("\n--- channel 方向 ---")

	// 双向 channel 可转为单向
	ch2 := make(chan int)

	go func(sendOnly chan<- int) {
		sendOnly <- 42
		// <-sendOnly // 编译错误：不能从 send-only channel 接收
	}(ch2)

	go func(recvOnly <-chan int) {
		val := <-recvOnly
		fmt.Printf("recv-only: 接收到 %d\n", val)
		// recvOnly <- 1 // 编译错误：不能向 recv-only channel 发送
	}(ch2)

	time.Sleep(100 * time.Millisecond)

	// --- 关闭 channel ---
	fmt.Println("\n--- 关闭 channel ---")

	ch3 := make(chan int, 5)
	for i := 1; i <= 3; i++ {
		ch3 <- i
	}
	close(ch3) // 关闭 channel

	// 从已关闭的 channel 接收：先接收剩余值，然后返回零值
	for i := 0; i < 5; i++ {
		val, ok := <-ch3
		if ok {
			fmt.Printf("  正常接收: %d\n", val)
		} else {
			fmt.Printf("  channel 已关闭，零值: %d\n", val)
		}
	}

	// 向关闭的 channel 发送会 panic
	// ch3 <- 10 // panic: send on closed channel

	// --- range over channel ---
	fmt.Println("\n--- range over channel ---")

	ch4 := make(chan int, 5)
	go func() {
		for i := 10; i <= 14; i++ {
			ch4 <- i
		}
		close(ch4) // range 需要 close 才能退出
	}()

	for val := range ch4 {
		fmt.Printf("  range 接收: %d\n", val)
	}
	fmt.Println("range 循环结束（channel 已关闭）")

	// --- nil channel 行为 ---
	fmt.Println("\n--- nil channel 行为 ---")

	var nilCh chan int
	fmt.Printf("nil channel: %v\n", nilCh)
	fmt.Println("向 nil channel 发送 → 永远阻塞")
	fmt.Println("从 nil channel 接收 → 永远阻塞")
	fmt.Println("关闭 nil channel → panic")
	fmt.Println()
	fmt.Println("利用 nil channel 在 select 中禁用某个 case。")

	// --- channel of channels ---
	fmt.Println("\n--- channel of channels ---")

	cc := make(chan chan string)

	go func() {
		// 创建一个内部 channel 并通过外层 channel 发送
		innerCh := make(chan string)
		cc <- innerCh
		// 通过内部 channel 接收
		reply := <-innerCh
		fmt.Printf("  通过 channel-of-channels 收到: %s\n", reply)
	}()

	// 接收内部 channel
	inner := <-cc
	inner <- "Hello via channel of channels!"

	time.Sleep(100 * time.Millisecond)
}
