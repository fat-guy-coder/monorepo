package concurrency

import (
	"fmt"
	"strings"
)

// RunAll 按顺序运行阶段 2 的所有并发编程主题。
func RunAll() {
	fmt.Println("\n⚡ ========== 阶段 2: 并发编程 ==========")

	RunGoroutines()
	RunChannels()
	RunSelect()
	// TODO: RunTimerTicker()
	RunSync()
	// TODO: RunSyncWgOnce()
	// TODO: RunAtomic()
	// TODO: RunContext()
	// TODO: RunConcurrencyPatterns()
	// TODO: RunRaceDetection()
	// TODO: RunSyncPool()
	// TODO: RunErrgroup()
	// TODO: RunGoroutineLeak()

	fmt.Println("\n✅ 并发编程阶段完成！")
}

func RunTopic(topic string) bool {
	t := strings.ToLower(strings.TrimSpace(topic))
	match := func(keywords ...string) bool {
		for _, kw := range keywords {
			if strings.Contains(t, kw) { return true }
		}
		return false
	}
	switch {
	case match("goroutine", "协程"):
		RunGoroutines()
	case match("channel", "chan"):
		RunChannels()
	case match("select"):
		RunSelect()
	case match("sync", "mutex", "lock"):
		RunSync()
	default:
		fmt.Printf("未知的并发主题: %s\n", t)
		fmt.Println("可用: goroutines, channels, select, sync")
		return false
	}
	return true
}
