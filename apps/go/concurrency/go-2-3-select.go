package concurrency

import (
	"fmt"
	"time"
)

// RunSelect 演示 select 多路复用
func RunSelect() {
	// === 基本用法 ===
	fmt.Println("=== select 基础 ===")
	ch1 := make(chan string); ch2 := make(chan string)
	go func() { time.Sleep(10 * time.Millisecond); ch1 <- "one" }()
	go func() { time.Sleep(20 * time.Millisecond); ch2 <- "two" }()
	select {
	case msg := <-ch1: fmt.Println(msg)
	case msg := <-ch2: fmt.Println(msg)
	}
	// 输出: one（ch1 先就绪）

	// === 超时控制 ===
	fmt.Println("\n=== 超时控制 ===")
	select {
	case <-time.After(50 * time.Millisecond): fmt.Println("timeout!")
	}
	// 输出: timeout!

	// === default 非阻塞 ===
	fmt.Println("\n=== default 非阻塞 ===")
	select {
	case v := <-ch1: fmt.Println("received", v)
	default: fmt.Println("channel empty, do other work")
	}
	// 输出: channel empty, do other work

	// === nil chan 动态禁用 ===
	var disabled chan struct{} = nil
	select {
	case <-disabled: fmt.Println("never")
	default: fmt.Println("nil chan skipped")
	}
	// 输出: nil chan skipped

	// === 随机选择 ===
	fmt.Println("\n=== 随机选择 ===")
	a := make(chan string, 1); a <- "A"
	b := make(chan string, 1); b <- "B"
	for i := 0; i < 3; i++ {
		select {
		case m := <-a: fmt.Println("picked:", m)
		case m := <-b: fmt.Println("picked:", m)
		}
	}
	// 输出示例: picked: A, picked: A, picked: B（随机）
}
