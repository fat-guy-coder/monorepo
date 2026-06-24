package concurrency

import (
	"fmt"
	"sync"
)

// RunMutex 演示 Mutex / RWMutex
func RunMutex() {
	// === 竞态条件 ===
	fmt.Println("=== 竞态条件 ===")
	var counter int
	var wg sync.WaitGroup
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() { defer wg.Done(); counter++ }() // 不是原子操作！
	}
	wg.Wait()
	fmt.Printf("without mutex: counter=%d (expected 1000)\n", counter)
	// 输出: without mutex: counter=982（每次不同，< 1000）

	// === Mutex 修复 ===
	fmt.Println("\n=== Mutex 修复 ===")
	var mu sync.Mutex
	counter = 0
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			mu.Lock(); counter++; mu.Unlock()
			wg.Done()
		}()
	}
	wg.Wait()
	fmt.Printf("with mutex: counter=%d\n", counter)
	// 输出: with mutex: counter=1000

	// === defer Unlock（标准模式） ===
	fmt.Println("\n=== defer Unlock 标准模式 ===")
	type SafeMap struct {
		mu sync.Mutex
		m  map[string]int
	}
	sm := &SafeMap{m: make(map[string]int)}
	sm.mu.Lock()
	sm.m["key"] = 42
	sm.mu.Unlock()
	fmt.Printf("SafeMap['key'] = %d\n", sm.m["key"])
	// 输出: SafeMap['key'] = 42

	// === RWMutex 读写锁 ===
	fmt.Println("\n=== RWMutex 读写锁 ===")
	var rw sync.RWMutex
	data := make(map[string]string)
	// 写
	rw.Lock(); data["name"] = "Alice"; rw.Unlock()
	// 读（多 goroutine 可同时 RLock）
	rw.RLock(); fmt.Println(data["name"]); rw.RUnlock()
	// 输出: Alice

	fmt.Println("\n注意: Go 的 Mutex 不可重入——Lock 两次 = 死锁")
	fmt.Println("用 go run -race 检测竞态条件")
}
