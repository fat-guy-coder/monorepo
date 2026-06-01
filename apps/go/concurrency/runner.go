package concurrency

import (
	"fmt"
	"strings"
)

// RunAll 按顺序运行阶段 2 的所有并发编程主题。
func RunAll() {
	fmt.Println("\n⚡ ========== 阶段 2: 并发编程 ==========")
	fmt.Println("涵盖：goroutine → channel → select → sync → context → 并发模式\n")

	RunGoroutines()
	RunChannels()
	RunSelect()
	RunSync()
	RunContext()
	RunPatterns()

	fmt.Println("\n┌──────────────────────────────────────────┐")
	fmt.Println("│   ✅ 并发编程阶段完成！                   │")
	fmt.Println("└──────────────────────────────────────────┘")
}

// RunTopic 根据关键词运行指定的并发编程主题。
func RunTopic(topic string) bool {
	t := strings.ToLower(strings.TrimSpace(topic))

	match := func(keywords ...string) bool {
		for _, kw := range keywords {
			if strings.Contains(t, kw) {
				return true
			}
		}
		return false
	}

	switch {
	case match("goroutine", "goroutines", "协程"):
		fmt.Println("\n⚡ ========== Goroutine ==========")
		RunGoroutines()
		return true
	case match("channel", "channels", "chan"):
		fmt.Println("\n⚡ ========== Channel ==========")
		RunChannels()
		return true
	case match("select"):
		fmt.Println("\n⚡ ========== Select 多路复用 ==========")
		RunSelect()
		return true
	case match("sync", "mutex", "锁", "原子", "atomic"):
		fmt.Println("\n⚡ ========== Sync 同步原语 ==========")
		RunSync()
		return true
	case match("context", "ctx", "超时", "取消"):
		fmt.Println("\n⚡ ========== Context 上下文 ==========")
		RunContext()
		return true
	case match("pattern", "模式", "pipeline", "fan", "worker", "生产者", "消费者"):
		fmt.Println("\n⚡ ========== 并发模式 ==========")
		RunPatterns()
		return true
	default:
		fmt.Printf("未知的并发主题: %s\n", t)
		fmt.Println("可用主题: goroutines, channels, select, sync, context, patterns")
		return false
	}
}
