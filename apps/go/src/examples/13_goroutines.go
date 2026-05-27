package examples

import (
	"fmt"
	"sync"
	"time"
)

// RunGoroutines 运行并发示例
func RunGoroutines() {
	fmt.Println("\n=== Goroutine (协程) ===")

	// 启动一个 goroutine
	go hello("异步执行!")

	// 主线程继续执行
	fmt.Println("主线程继续...")

	// 等待一下让 goroutine 执行
	time.Sleep(100 * time.Millisecond)

	// 匿名 goroutine
	go func() {
		fmt.Println("匿名函数在 goroutine 中执行")
	}()

	time.Sleep(50 * time.Millisecond)

	// Channel 基础
	fmt.Println("\n--- Channel ---")
	ch := make(chan int)

	go func() {
		ch <- 42 // 发送数据到 channel
	}()

	value := <-ch // 从 channel 接收数据
	fmt.Printf("从 channel 收到: %d\n", value)

	// 有缓冲的 Channel
	bufferedCh := make(chan int, 3)
	bufferedCh <- 1
	bufferedCh <- 2
	bufferedCh <- 3
	// bufferedCh <- 4 // 会阻塞，因为缓冲满了

	fmt.Printf("缓冲 channel 长度: %d\n", len(bufferedCh))

	// Channel 关闭
	intCh := make(chan int, 5)
	for i := 1; i <= 5; i++ {
		intCh <- i
	}
	close(intCh) // 关闭 channel

	fmt.Print("遍历已关闭的 channel: ")
	for v := range intCh {
		fmt.Printf("%d ", v)
	}
	fmt.Println()

	// Select 语句
	fmt.Println("\n--- Select ---")
	ch1 := make(chan string)
	ch2 := make(chan string)

	go func() {
		time.Sleep(100 * time.Millisecond)
		ch1 <- "channel 1"
	}()

	go func() {
		time.Sleep(50 * time.Millisecond)
		ch2 <- "channel 2"
	}()

	// 只等待第一个完成的 channel
	select {
	case msg := <-ch1:
		fmt.Printf("收到: %s\n", msg)
	case msg := <-ch2:
		fmt.Printf("收到: %s\n", msg)
	case <-time.After(200 * time.Millisecond):
		fmt.Println("超时")
	}

	// WaitGroup 等待多个 goroutine
	fmt.Println("\n--- WaitGroup ---")
	var wg sync.WaitGroup

	for i := 0; i < 3; i++ {
		wg.Add(1) // 添加计数
		go func(n int) {
			defer wg.Done() // 完成时减计数
			fmt.Printf("Goroutine %d 开始\n", n)
			time.Sleep(time.Duration(n*50) * time.Millisecond)
			fmt.Printf("Goroutine %d 结束\n", n)
		}(i)
	}

	wg.Wait() // 等待所有 goroutine 完成
	fmt.Println("所有 goroutine 执行完毕")

	// Mutex 互斥锁
	fmt.Println("\n--- Mutex ---")
	counter := 0
	var mu sync.Mutex

	for i := 0; i < 1000; i++ {
		go func() {
			mu.Lock()
			counter++
			mu.Unlock()
		}()
	}

	time.Sleep(100 * time.Millisecond) // 等待 goroutine 完成
	fmt.Printf("计数器最终值: %d\n", counter)

	// deferUnlock 模式
	mu.Lock()
	defer mu.Unlock()
	// 临界区代码
	fmt.Println("使用 defer mutex 解锁")
}

func hello(msg string) {
	fmt.Printf("Hello goroutine: %s\n", msg)
}