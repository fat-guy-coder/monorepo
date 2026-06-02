package concurrency

import (
	"fmt"
	"sync"
	"sync/atomic"
	"time"
)

// RunSync 演示 Go 中的同步原语。
func RunSync() {
	// --- sync.Mutex ---
	fmt.Println("\n--- sync.Mutex ---")

	var mu sync.Mutex
	counter := 0

	var wg sync.WaitGroup
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			mu.Lock()
			counter++
			mu.Unlock()
		}()
	}
	wg.Wait()
	fmt.Printf("Mutex 保护后的 counter: %d (期望 1000)\n", counter)

	// defer Unlock 模式
	fmt.Println("\n--- defer Unlock 模式 ---")
	fmt.Println("推荐写法: mu.Lock() 后立即 defer mu.Unlock()")
	fmt.Println("这确保即使发生 panic 也能正确释放锁。")

	// --- sync.RWMutex ---
	fmt.Println("\n--- sync.RWMutex ---")

	var rwMu sync.RWMutex
	sharedData := make(map[string]int)

	// 写者
	var wg2 sync.WaitGroup
	wg2.Add(1)
	go func() {
		defer wg2.Done()
		rwMu.Lock()
		sharedData["key"] = 42
		rwMu.Unlock()
		fmt.Println("  写者: 写入 key=42")
	}()

	// 多个读者（可以同时持有读锁）
	for i := 0; i < 3; i++ {
		wg2.Add(1)
		go func(id int) {
			defer wg2.Done()
			rwMu.RLock()
			val := sharedData["key"]
			time.Sleep(20 * time.Millisecond) // 模拟读操作
			rwMu.RUnlock()
			fmt.Printf("  读者 %d: 读取 key=%d\n", id, val)
		}(i)
	}
	wg2.Wait()

	// --- sync.WaitGroup ---
	fmt.Println("\n--- sync.WaitGroup ---")

	var wg3 sync.WaitGroup
	for i := 0; i < 3; i++ {
		wg3.Add(1)
		go func(id int) {
			defer wg3.Done()
			fmt.Printf("  任务 %d 执行中\n", id)
		}(i)
	}
	wg3.Wait()
	fmt.Println("WaitGroup: 所有任务完成")

	// --- sync.Once ---
	fmt.Println("\n--- sync.Once（单例模式）---")

	var once sync.Once
	initFunc := func() {
		fmt.Println("  初始化操作（只执行一次）")
	}

	// 多次调用，只执行一次
	for i := 0; i < 5; i++ {
		once.Do(initFunc)
	}
	fmt.Println("sync.Once 确保初始化只执行一次，适合单例模式。")

	// --- sync.Cond ---
	fmt.Println("\n--- sync.Cond ---")

	var condMu sync.Mutex
	cond := sync.NewCond(&condMu)
	ready := false

	// 等待者
	go func() {
		condMu.Lock()
		for !ready {
			fmt.Println("  等待者: 等待条件满足...")
			cond.Wait() // 释放锁并等待，被唤醒后重新获取锁
		}
		fmt.Println("  等待者: 条件满足，继续执行！")
		condMu.Unlock()
	}()

	time.Sleep(50 * time.Millisecond)

	// 通知者
	condMu.Lock()
	ready = true
	fmt.Println("  通知者: 发送广播")
	cond.Broadcast() // 唤醒所有等待者
	condMu.Unlock()

	time.Sleep(50 * time.Millisecond)

	// Signal vs Broadcast
	fmt.Println("\nSignal: 唤醒一个等待的 goroutine")
	fmt.Println("Broadcast: 唤醒所有等待的 goroutine")

	// --- sync/atomic ---
	fmt.Println("\n--- sync/atomic ---")

	var atomicCounter int64 = 0

	var wg4 sync.WaitGroup
	for i := 0; i < 1000; i++ {
		wg4.Add(1)
		go func() {
			defer wg4.Done()
			atomic.AddInt64(&atomicCounter, 1)
		}()
	}
	wg4.Wait()

	val := atomic.LoadInt64(&atomicCounter)
	fmt.Printf("atomic 计数器: %d (期望 1000)\n", val)

	atomic.StoreInt64(&atomicCounter, 0)
	fmt.Printf("重置后: %d\n", atomic.LoadInt64(&atomicCounter))

	fmt.Println("\natomic 操作是无锁的，性能比 Mutex 更好，适合简单计数。")

	// --- sync.Pool ---
	fmt.Println("\n--- sync.Pool ---")

	var pool = sync.Pool{
		New: func() interface{} {
			fmt.Println("  创建新对象")
			return make([]byte, 0, 1024)
		},
	}

	// 获取对象
	obj1 := pool.Get().([]byte)
	fmt.Printf("Get 1: len=%d, cap=%d\n", len(obj1), cap(obj1))

	// 放回
	obj1 = append(obj1, []byte("hello")...)
	pool.Put(obj1)
	fmt.Println("Put: 将对象放回池中")

	// 再次获取（可能得到同一个对象）
	obj2 := pool.Get().([]byte)
	fmt.Printf("Get 2: len=%d, cap=%d, content=%q\n", len(obj2), cap(obj2), obj2)
	fmt.Println("sync.Pool 适合频繁创建和销毁的临时对象。")

	// --- 竞态条件演示 ---
	fmt.Println("\n--- 竞态条件演示 ---")

	raceCounter := 0
	var wg5 sync.WaitGroup
	for i := 0; i < 1000; i++ {
		wg5.Add(1)
		go func() {
			defer wg5.Done()
			raceCounter++ // 数据竞争！
		}()
	}
	wg5.Wait()
	fmt.Printf("无锁 counter: %d (期望 1000，但可能小于 1000)\n", raceCounter)
	fmt.Println("使用 go run -race 可以检测到竞态条件。")
	fmt.Println("修复方法：使用 Mutex 或 atomic 操作。")
}
