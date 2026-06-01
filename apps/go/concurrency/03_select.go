package concurrency

import (
	"fmt"
	"time"
)

// RunSelect 演示 Go 中的 select 语句。
func RunSelect() {
	// --- 基本 select ---
	fmt.Println("\n--- 基本 select ---")

	ch1 := make(chan string)
	ch2 := make(chan string)

	go func() {
		time.Sleep(50 * time.Millisecond)
		ch1 <- "来自 ch1"
	}()
	go func() {
		time.Sleep(100 * time.Millisecond)
		ch2 <- "来自 ch2"
	}()

	// select 等待多个 channel，哪个先就绪就执行哪个
	for i := 0; i < 2; i++ {
		select {
		case msg := <-ch1:
			fmt.Printf("收到: %s\n", msg)
		case msg := <-ch2:
			fmt.Printf("收到: %s\n", msg)
		}
	}

	// --- default 非阻塞 ---
	fmt.Println("\n--- default 非阻塞 ---")

	ch3 := make(chan int, 1)

	// 无 default：阻塞等待
	select {
	case ch3 <- 10:
		fmt.Println("发送成功（阻塞模式）")
	case <-time.After(10 * time.Millisecond):
		fmt.Println("超时（不会到这里）")
	}

	// 有 default：非阻塞尝试
	select {
	case ch3 <- 20:
		fmt.Println("发送成功")
	default:
		fmt.Println("channel 已满，跳过发送")
	}

	// 接收非阻塞
	select {
	case val := <-ch3:
		fmt.Printf("非阻塞接收: %d\n", val)
	default:
		fmt.Println("channel 为空")
	}

	// --- time.After 超时 ---
	fmt.Println("\n--- time.After 超时 ---")

	ch4 := make(chan string)
	go func() {
		time.Sleep(200 * time.Millisecond)
		ch4 <- "慢响应"
	}()

	select {
	case msg := <-ch4:
		fmt.Printf("收到: %s\n", msg)
	case <-time.After(100 * time.Millisecond):
		fmt.Println("超时！操作超过 100ms")
	}

	// --- time.Tick 定时器 ---
	fmt.Println("\n--- time.Tick 定时器 ---")

	ticker := time.NewTicker(200 * time.Millisecond)
	done := make(chan bool)

	go func() {
		count := 0
		for {
			select {
			case t := <-ticker.C:
				fmt.Printf("  定时触发: %s\n", t.Format("15:04:05.000"))
				count++
				if count >= 3 {
					done <- true
					return
				}
			}
		}
	}()

	<-done
	ticker.Stop()
	fmt.Println("定时器已停止")

	// --- select + done channel ---
	fmt.Println("\n--- select 循环 + done channel ---")

	dataCh := make(chan int)
	stopCh := make(chan struct{})

	// 生产者
	go func() {
		for i := 1; ; i++ {
			select {
			case <-stopCh:
				fmt.Println("  生产者收到停止信号")
				close(dataCh)
				return
			case dataCh <- i:
				time.Sleep(50 * time.Millisecond)
			}
		}
	}()

	// 消费者：只取前 5 个
	go func() {
		count := 0
		for val := range dataCh {
			fmt.Printf("  消费: %d\n", val)
			count++
			if count >= 5 {
				close(stopCh)
				break
			}
		}
		fmt.Println("  消费者退出")
	}()

	time.Sleep(500 * time.Millisecond)

	// --- Fan-in 模式 ---
	fmt.Println("\n--- Fan-in 模式（select 合并多输入）---")

	fanIn := func(ch1, ch2 <-chan string) <-chan string {
		out := make(chan string)
		go func() {
			for {
				select {
				case v := <-ch1:
					out <- v
				case v := <-ch2:
					out <- v
				}
			}
		}()
		return out
	}

	input1 := make(chan string)
	input2 := make(chan string)

	go func() {
		for i := 1; i <= 3; i++ {
			input1 <- fmt.Sprintf("源1-消息%d", i)
			time.Sleep(30 * time.Millisecond)
		}
		close(input1)
	}()
	go func() {
		for i := 1; i <= 3; i++ {
			input2 <- fmt.Sprintf("源2-消息%d", i)
			time.Sleep(40 * time.Millisecond)
		}
		close(input2)
	}()

	merged := fanIn(input1, input2)
	for i := 0; i < 6; i++ {
		fmt.Printf("  合并输出: %s\n", <-merged)
	}

	fmt.Println("Fan-in 完成！")
}
