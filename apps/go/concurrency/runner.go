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
	RunTimerTicker()
	RunMutex()
	RunSyncWgOnce()
	RunAtomic()
	RunContext()
	RunConcurrencyPatterns()
	RunRaceDetection()
	RunSyncPool()
	RunErrgroup()
	RunGoroutineLeak()
	RunSyncMap()

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
	case match("goroutine", "协程", "gmp"):
		RunGoroutines()
	case match("channel", "chan"):
		RunChannels()
	case match("select"):
		RunSelect()
	case match("timer", "ticker", "定时"):
		RunTimerTicker()
	case match("mutex", "lock", "锁"):
		RunMutex()
	case match("wg", "waitgroup", "once"):
		RunSyncWgOnce()
	case match("atomic", "原子"):
		RunAtomic()
	case match("context"):
		RunContext()
	case match("pattern", "并发模式"):
		RunConcurrencyPatterns()
	case match("race", "竞态"):
		RunRaceDetection()
	case match("pool"):
		RunSyncPool()
	case match("errgroup", "错误组"):
		RunErrgroup()
	case match("leak", "泄漏"):
		RunGoroutineLeak()
	case match("syncmap", "sync.map"):
		RunSyncMap()
	default:
		fmt.Printf("未知的并发主题: %s\n", t)
		fmt.Println("可用: goroutines, channels, select, timer, mutex, wg, atomic, context, patterns, race, pool, errgroup, leak, syncmap")
		return false
	}
	return true
}
