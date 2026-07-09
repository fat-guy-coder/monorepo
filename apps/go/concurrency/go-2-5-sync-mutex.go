package concurrency

import (
	"fmt"
	"sync"
)

// RunMutex 演示 Mutex / RWMutex 以及竞态条件
func RunMutex() {
	// ============================================
	// 1. 竞态条件演示
	// ============================================
	fmt.Println("=== 1. 竞态条件 ===")
	var counter int
	var wg sync.WaitGroup
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() { defer wg.Done(); counter++ }() // 不是原子操作！
	}
	wg.Wait()
	fmt.Printf("without mutex: counter=%d (expected 1000)\n", counter)
	// 输出: without mutex: counter=982（每次不同，< 1000）

	// ============================================
	// 2. Mutex 修复
	// ============================================
	fmt.Println("\n=== 2. Mutex 修复 ===")
	var mu sync.Mutex
	counter = 0
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			mu.Lock()
			counter++ // 临界区——同一时刻只有一个 goroutine 进入
			mu.Unlock()
			wg.Done()
		}()
	}
	wg.Wait()
	fmt.Printf("with mutex: counter=%d\n", counter)
	// 输出: with mutex: counter=1000 ✅

	// ============================================
	// 3. defer Unlock 标准模式
	// ============================================
	fmt.Println("\n=== 3. defer Unlock 标准模式 ===")
	type SafeCounter struct {
		mu sync.Mutex
		v  map[string]int
	}
	sc := &SafeCounter{v: make(map[string]int)}

	// 标准模式：Lock + defer Unlock
	func(c *SafeCounter) {
		c.mu.Lock()
		defer c.mu.Unlock() // defer 保证即使 panic 也解锁
		c.v["key"] = 42
	}(sc)
	fmt.Printf("SafeCounter['key'] = %d\n", sc.v["key"])
	// 输出: SafeCounter['key'] = 42

	// ============================================
	// 4. RWMutex — 读写锁（读多写少场景）
	// ============================================
	fmt.Println("\n=== 4. RWMutex 读写锁 ===")
	var rw sync.RWMutex
	cache := make(map[int]string)

	// 写操作——独占
	rw.Lock()
	for i := 0; i < 5; i++ {
		cache[i] = fmt.Sprintf("value-%d", i)
	}
	rw.Unlock()

	// 读操作——多 goroutine 可同时 RLock
	var wgR sync.WaitGroup
	for i := 0; i < 5; i++ {
		wgR.Add(1)
		go func(id int) {
			defer wgR.Done()
			rw.RLock()
			fmt.Printf("  reader %d: %s\n", id, cache[id])
			rw.RUnlock()
		}(i)
	}
	wgR.Wait()
	// 输出（顺序随机）:
	//   reader 0: value-0
	//   reader 3: value-3
	//   ...

	// ============================================
	// 5. 常见死锁场景演示
	// ============================================
	fmt.Println("\n=== 5. 死锁提示 ===")
	fmt.Println("场景一: Lock 两次（不可重入）")
	fmt.Println("  mu.Lock(); mu.Lock() → fatal error: all goroutines are asleep - deadlock!")
	fmt.Println("场景二: 忘记 Unlock")
	fmt.Println("  临界区中 return 前忘了 Unlock → 其他 goroutine 永久阻塞")
	fmt.Println("  用 defer mu.Unlock() 解决")
	fmt.Println("场景三: 锁顺序不一致")
	fmt.Println("  goroutine A: Lock(mu1); Lock(mu2)")
	fmt.Println("  goroutine B: Lock(mu2); Lock(mu1) → 死锁!")
	fmt.Println("  统一锁的获取顺序即可避免")
	fmt.Println("\n💡 go run -race ./...  检测竞态条件")
	fmt.Println("   go vet ./...        检测锁拷贝问题")
}
