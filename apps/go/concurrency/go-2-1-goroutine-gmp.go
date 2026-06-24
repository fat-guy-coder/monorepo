package concurrency

import (
	"fmt"
	"runtime"
	"sync"
	"time"
)

// RunGoroutines 演示 goroutine 基础与 GMP 调度模型
func RunGoroutines() {
	// === 基本 goroutine ===
	fmt.Println("=== 基本 goroutine ===")
	go say("world") // 启动 goroutine——不阻塞！
	say("hello")    // 主 goroutine
	time.Sleep(100 * time.Millisecond)
	// 输出: hello world（或 world hello——取决于调度）

	// === sync.WaitGroup（等待一组 goroutine） ===
	fmt.Println("\n=== WaitGroup ===")
	var wg sync.WaitGroup
	for i := 1; i <= 5; i++ {
		wg.Add(1) // 计数器+1——必须在 goroutine 外！
		go func(id int) {
			defer wg.Done() // defer 保证 Done 一定执行
			fmt.Printf("worker %d done\n", id)
		}(i) // 传参——避免闭包陷阱
	}
	wg.Wait() // 阻塞直到计数器归零
	fmt.Println("all workers done")
	// 输出:
	// worker 1 done
	// worker 5 done
	// worker 3 done
	// worker 2 done
	// worker 4 done
	// all workers done
	// （顺序随机）

	// === 闭包循环变量陷阱 ===
	fmt.Println("\n=== 循环变量闭包陷阱 ===")
	fmt.Println("Bug 版:")
	var wg2 sync.WaitGroup
	for i := 0; i < 3; i++ {
		wg2.Add(1)
		go func() {
			defer wg2.Done()
			fmt.Printf("  Bug: i=%d\n", i)
		}()
	}
	wg2.Wait()
	// 输出（Go < 1.22）: Bug: i=3, Bug: i=3, Bug: i=3
	// 输出（Go >= 1.22）: Bug: i=0, Bug: i=1, Bug: i=2（Go 1.22+ 自动修复）

	// 修复：传参
	var wg3 sync.WaitGroup
	for i := 0; i < 3; i++ {
		wg3.Add(1)
		go func(n int) { defer wg3.Done(); fmt.Printf("  传参: i=%d\n", n) }(i)
	}
	wg3.Wait()
	// 输出: 传参: i=0  传参: i=1  传参: i=2

	// === GMP 模型 ===
	fmt.Println("\n=== GMP 调度模型 ===")
	fmt.Printf("GOMAXPROCS = %d (CPU 核数)\n", runtime.GOMAXPROCS(0))
	fmt.Println("G = Goroutine（用户态协程，初始 2KB 栈）")
	fmt.Println("M = Machine（OS 线程，真正执行代码）")
	fmt.Println("P = Processor（逻辑处理器，持有 G 的本地队列）")
	fmt.Println("GMP 核心：M:N 调度——N 个 goroutine 映射到 M 个 OS 线程")
	fmt.Println("工作窃取：P 的队列空了 → 从其他 P 偷一半 G")
	fmt.Println("goroutine 切换 ~几十 ns（用户态），OS 线程切换 ~几 μs（内核态）")
}

func say(msg string) {
	fmt.Println(msg)
}
