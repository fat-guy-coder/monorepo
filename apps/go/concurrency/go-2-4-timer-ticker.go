package concurrency

import (
	"fmt"
	"time"
)

// RunTimerTicker 演示 Timer / Ticker / time.After 的使用与陷阱
func RunTimerTicker() {
	// ============================================
	// 1. Timer — 延时执行（≈ setTimeout）
	// ============================================
	fmt.Println("=== 1. Timer ===")
	timer := time.NewTimer(100 * time.Millisecond)
	fmt.Println("waiting 100ms...")
	<-timer.C // 阻塞直到 timer 触发
	fmt.Println("timer fired!")
	// 输出: waiting 100ms...
	// 输出: timer fired!

	// Timer 停止与重置
	timer2 := time.NewTimer(200 * time.Millisecond)
	go func() {
		time.Sleep(50 * time.Millisecond)
		if timer2.Stop() {
			fmt.Println("  timer2 stopped before firing")
		}
	}()
	select {
	case <-timer2.C:
		fmt.Println("  timer2 fired")
	case <-time.After(100 * time.Millisecond):
		fmt.Println("  timer2 was stopped, no fire")
	}
	// 输出:   timer2 stopped before firing
	// 输出:   timer2 was stopped, no fire

	// Reset 复用 timer
	timer3 := time.NewTimer(300 * time.Millisecond)
	timer3.Reset(50 * time.Millisecond) // 重新计时
	<-timer3.C
	fmt.Println("timer3 fired (50ms, not 300ms)")
	// 输出: timer3 fired (50ms, not 300ms)

	// time.AfterFunc — 延时后异步执行函数
	fmt.Println("AfterFunc 延时 100ms...")
	time.AfterFunc(100*time.Millisecond, func() {
		fmt.Println("  AfterFunc 回调执行！")
	})
	time.Sleep(150 * time.Millisecond)
	// 输出: AfterFunc 延时 100ms...
	// 输出:   AfterFunc 回调执行！

	// ============================================
	// 2. Ticker — 周期性触发（≈ setInterval）
	// ============================================
	fmt.Println("\n=== 2. Ticker ===")
	ticker := time.NewTicker(50 * time.Millisecond)
	defer ticker.Stop() // ⚠️ 必须 Stop——否则永不 GC

	count := 0
	done := make(chan struct{})
	go func() {
		time.Sleep(180 * time.Millisecond)
		close(done)
	}()

loop:
	for {
		select {
		case t := <-ticker.C:
			count++
			fmt.Printf("  tick #%d at %s\n", count, t.Format("15:04:05.000"))
		case <-done:
			fmt.Println("  ticker stopped")
			break loop
		}
	}
	fmt.Printf("总共 tick %d 次\n", count)
	// 输出:
	//   tick #1 at ...
	//   tick #2 at ...
	//   tick #3 at ...
	//   ticker stopped
	//   总共 tick 3 次

	// ============================================
	// 3. time.After vs NewTimer（内存泄漏警示）
	// ============================================
	fmt.Println("\n=== 3. time.After — 方便但有陷阱 ===")

	// ✅ 一次性超时 → 用 time.After OK
	ch := make(chan string)
	select {
	case msg := <-ch:
		fmt.Println(msg)
	case <-time.After(50 * time.Millisecond):
		fmt.Println("  timeout after 50ms")
	}
	// 输出:   timeout after 50ms

	// ⚠️ 循环中用 time.After 会泄漏！
	// 演示：Timer 复用
	fmt.Println("  循环中应使用 NewTimer + Reset:")
	timeout := time.NewTimer(30 * time.Millisecond)
	for i := 1; i <= 3; i++ {
		timeout.Reset(30 * time.Millisecond)
		select {
		case <-timeout.C:
			fmt.Printf("    loop #%d: timeout\n", i)
		}
	}
	timeout.Stop()
	// 输出:
	//    loop #1: timeout
	//    loop #2: timeout
	//    loop #3: timeout

	fmt.Println("\n总结: time.After 一次性用 OK；循环中 → NewTimer + Reset")
}
