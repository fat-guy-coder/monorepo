package concurrency

import (
	"context"
	"fmt"
	"runtime"
	"time"
)

// RunGoroutineLeak 演示 goroutine 泄漏检测与修复
func RunGoroutineLeak() {
	fmt.Println("=== goroutine 泄漏 ===")

	// === 泄漏场景 1：向无人读的 channel 发送 ===
	fmt.Println("\n场景 1：向无人读的 channel 发送")
	ch := make(chan int)
	go func() { ch <- 1 }() // 永远阻塞——没人读 ch
	time.Sleep(50 * time.Millisecond)
	fmt.Printf("goroutines after leak 1: %d\n", runtime.NumGoroutine())
	// 输出: goroutines after leak 1: N+1（多了一个泄漏的）

	// === 修复：给 goroutine 退出信号 ===
	fmt.Println("\n=== 修复：context 取消 ===")
	ctx, cancel := context.WithCancel(context.Background())
	go func() {
		select {
		case <-ctx.Done(): fmt.Println("goroutine: received cancel, exiting")
		case v := <-ch: fmt.Println("got:", v)
		}
	}()
	cancel() // 发送退出信号
	time.Sleep(50 * time.Millisecond)

	// === 修复：done channel ===
	fmt.Println("\n=== 修复：done channel ===")
	done := make(chan struct{})
	go func() {
		for {
			select {
			case <-done: fmt.Println("worker: done signal, exiting"); return
			default:
				time.Sleep(10 * time.Millisecond)
			}
		}
	}()
	time.Sleep(30 * time.Millisecond)
	close(done) // 广播退出信号
	time.Sleep(20 * time.Millisecond)

	fmt.Printf("\nfinal goroutines: %d\n", runtime.NumGoroutine())
	// 输出示例: "\nfinal goroutines: 3" (依赖当前 goroutine 数)
	fmt.Println("\n检测方法:")
	fmt.Println("  - runtime.NumGoroutine() 比较前后 goroutine 数")
	fmt.Println("  - pprof: http://localhost:6060/debug/pprof/goroutine?debug=1")
	fmt.Println("  - 测试: go.uber.org/goleak")
	fmt.Println("修复原则: 每个 goroutine 必须有明确的退出路径")
}
