package concurrency

import (
	"fmt"
	"time"
)

// RunTimerTicker 演示 Timer / Ticker
func RunTimerTicker() {
	// === Timer ≈ setTimeout ===
	fmt.Println("=== Timer ===")
	timer := time.NewTimer(100 * time.Millisecond)
	fmt.Println("waiting...")
	<-timer.C // 阻塞 100ms
	fmt.Println("timer fired!")
	// 输出: waiting...（等100ms）timer fired!

	// Timer 重置
	timer.Reset(50 * time.Millisecond)
	<-timer.C
	fmt.Println("timer reset and fired again")
	// 输出: timer reset and fired again

	// === time.After 超时控制 ===
	fmt.Println("\n=== time.After 超时 ===")
	select {
	case <-time.After(50 * time.Millisecond): fmt.Println("timeout")
	}
	// 输出: timeout
	// ⚠️ 短时间用 OK；长时间/循环中用 NewTimer+Stop 防泄漏

	// === Ticker ≈ setInterval ===
	fmt.Println("\n=== Ticker ===")
	ticker := time.NewTicker(50 * time.Millisecond)
	defer ticker.Stop() // 必须 Stop——否则永不 GC！
	count := 0
	for range ticker.C {
		count++
		fmt.Printf("tick %d\n", count)
		if count >= 3 { break }
	}
	// 输出: tick 1, tick 2, tick 3（每 50ms 一次）
	fmt.Println("ticker stopped")
}
