package concurrency

import "fmt"

// RunChannels 演示 channel 通信——goroutine 之间的管道
func RunChannels() {
	// === 无缓冲 channel（同步） ===
	fmt.Println("=== 无缓冲 channel ===")
	ch := make(chan int)
	go func() { ch <- 42 }() // goroutine 发送——阻塞直到有人接收
	v := <-ch                // 主 goroutine 接收——阻塞直到有人发送
	fmt.Printf("received: %d\n", v)
	// 输出: received: 42

	// === 缓冲 channel（异步） ===
	fmt.Println("\n=== 缓冲 channel ===")
	buf := make(chan string, 3) // 容量 3
	buf <- "a"                  // 不阻塞（缓冲未满）
	buf <- "b"
	buf <- "c"
	fmt.Printf("len=%d cap=%d\n", len(buf), cap(buf))
	fmt.Println(<-buf, <-buf, <-buf)
	// 输出: len=3 cap=3
	// 输出: a b c

	// === nil channel 行为 ===
	fmt.Println("\n=== nil channel ===")
	var nilCh chan int
	// nilCh <- 1   // 永久阻塞！不是 panic
	// <-nilCh       // 永久阻塞！
	fmt.Println("nil channel send/recv 永久阻塞——select 中用来禁用 case")
	// close(nilCh)  // panic!

	// === close + range ===
	fmt.Println("\n=== close + range ===")
	ch2 := make(chan int, 3)
	ch2 <- 10; ch2 <- 20; ch2 <- 30
	close(ch2) // 发送方关闭
	for v := range ch2 {
		fmt.Printf("  %d\n", v)
	}
	v2, ok := <-ch2
	fmt.Printf("after close: v=%d ok=%v\n", v2, ok)
	// 输出: 10, 20, 30, after close: v=0 ok=false

	// === 单向 channel ===
	fmt.Println("\n=== 单向 channel ===")
	ch3 := make(chan int)
	go sendOnly(ch3)  // 双向→单向（自动转换）
	recvOnly(ch3)     // 双向→单向
	// 输出: received from sendOnly: 99
}

func sendOnly(ch chan<- int) { ch <- 99 }
func recvOnly(ch <-chan int)  { fmt.Printf("received from sendOnly: %d\n", <-ch) }
