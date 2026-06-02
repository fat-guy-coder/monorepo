package concurrency

import (
	"fmt"
	"sync"
	"time"
)

// RunGoroutines 演示 Go 中的 goroutine 基础。
func RunGoroutines() {
	// --- 基本 goroutine ---
	fmt.Println("\n--- 基本 goroutine ---")

	go say("Hello from goroutine")
	// 主 goroutine 继续执行
	fmt.Println("主 goroutine 继续执行...")

	// 等待 goroutine 完成（不理想的方式）
	time.Sleep(100 * time.Millisecond)

	// --- 匿名 goroutine ---
	fmt.Println("\n--- 匿名 goroutine ---")

	go func(msg string) {
		fmt.Printf("匿名 goroutine: %s\n", msg)
	}("直接传参")

	time.Sleep(50 * time.Millisecond)

	// --- 为什么 time.Sleep 不好 ---
	fmt.Println("\n--- time.Sleep 的问题 ---")
	fmt.Println("time.Sleep 的问题：")
	fmt.Println("  1. 无法确定 goroutine 何时完成")
	fmt.Println("  2. 固定等待时间要么太长（浪费）要么太短（出错）")
	fmt.Println("  3. 更好的方式：sync.WaitGroup 或 channel")

	// --- sync.WaitGroup ---
	fmt.Println("\n--- sync.WaitGroup ---")

	var wg sync.WaitGroup

	for i := 1; i <= 5; i++ {
		wg.Add(1) // 计数器 +1
		go func(id int) {
			defer wg.Done() // 完成时计数器 -1
			time.Sleep(time.Duration(id*20) * time.Millisecond)
			fmt.Printf("  工作者 %d 完成\n", id)
		}(i)
	}

	fmt.Println("等待所有工作者完成...")
	wg.Wait()
	fmt.Println("所有工作者完成！")

	// --- GOMAXPROCS 说明 ---
	fmt.Println("\n--- GOMAXPROCS ---")
	fmt.Println("GOMAXPROCS 设置可同时执行的 CPU 核心数。")
	fmt.Println("默认值为 runtime.NumCPU()。")
	fmt.Println("可通过 runtime.GOMAXPROCS(n) 或环境变量 GOMAXPROCS 设置。")
	fmt.Println()
	fmt.Println("Go 的调度器（GMP 模型）：")
	fmt.Println("  G = Goroutine（协程）")
	fmt.Println("  M = Machine（OS 线程）")
	fmt.Println("  P = Processor（逻辑处理器，数量 = GOMAXPROCS）")
	fmt.Println("Go 使用协作式+抢占式混合调度。")

	// --- 闭包循环变量捕获（经典 Bug） ---
	fmt.Println("\n--- 闭包循环变量捕获 Bug ---")

	// Bug 版本（所有 goroutine 引用同一个循环变量）
	fmt.Println("Bug 版本（错误）:")
	var wg2 sync.WaitGroup
	for i := 0; i < 3; i++ {
		wg2.Add(1)
		go func() {
			defer wg2.Done()
			// 这里捕获的是变量 i 的引用，循环结束后 i=3
			fmt.Printf("  Bug: i=%d\n", i)
		}()
	}
	wg2.Wait()

	// 修复 1：传参（推荐）
	fmt.Println("\n修复 1——传参:")
	var wg3 sync.WaitGroup
	for i := 0; i < 3; i++ {
		wg3.Add(1)
		go func(id int) {
			defer wg3.Done()
			fmt.Printf("  传参: i=%d\n", id)
		}(i)
	}
	wg3.Wait()

	// 修复 2：局部变量（Go 1.22+ 自动修复此问题）
	fmt.Println("\n修复 2——循环内局部变量:")
	var wg4 sync.WaitGroup
	for i := 0; i < 3; i++ {
		i := i // 创建新变量遮蔽外层
		wg4.Add(1)
		go func() {
			defer wg4.Done()
			fmt.Printf("  局部变量: i=%d\n", i)
		}()
	}
	wg4.Wait()

	fmt.Println("\n注意：Go 1.22+ 中，for 循环变量每次迭代自动创建新变量。")
}

func say(msg string) {
	fmt.Printf("  say(): %s\n", msg)
}
