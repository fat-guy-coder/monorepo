package concurrency

import (
	"fmt"
	"sync"
	"sync/atomic"
)

// RunSyncMap 演示 sync.Map：Load/Store/LoadOrStore/Range，以及并发缓存实战。
func RunSyncMap() {
	fmt.Println("--- 基础 API：Load / Store / Delete ---")
	var cache sync.Map
	cache.Store("key1", 100)
	if v, ok := cache.Load("key1"); ok {
		fmt.Println("Load key1:", v)
	}
	if _, ok := cache.Load("nope"); !ok {
		fmt.Println("Load 不存在的 key → ok=false，不会崩")
	}
	// 输出:
	// Load key1: 100
	// Load 不存在的 key → ok=false，不会崩

	fmt.Println()
	fmt.Println("--- LoadOrStore：原子「读-不存在则写」 ---")
	actual, loaded := cache.LoadOrStore("key1", 999) // key1 已存在
	fmt.Println("LoadOrStore(key1): 实际值", actual, "已存在?", loaded)
	actual2, loaded2 := cache.LoadOrStore("new", 42) // 不存在则写入
	fmt.Println("LoadOrStore(new):  实际值", actual2, "已存在?", loaded2)
	// 输出:
	// LoadOrStore(key1): 实际值 100 已存在? true
	// LoadOrStore(new):  实际值 42 已存在? false

	fmt.Println()
	fmt.Println("--- 并发读缓存：100 个 goroutine 同时读（无锁读） ---")
	cfg := &sync.Map{}
	cfg.Store("timeout", 30)
	var wg sync.WaitGroup
	var reads int64
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			if v, ok := cfg.Load("timeout"); ok {
				fmt.Printf("goroutine 读到 timeout=%v\n", v)
				atomic.AddInt64(&reads, 1) // 计数器用 atomic，避免非原子写竞态
			}
		}()
	}
	wg.Wait()
	fmt.Println("100 个 goroutine 全部读到（sync.Map 读路径无锁），共读", reads, "次")
	// 输出: ...共读 100 次

	fmt.Println()
	fmt.Println("--- Range 遍历（sync.Map 没有 Len()，用 Range 统计） ---")
	count := 0
	cfg.Range(func(k, v any) bool {
		fmt.Printf("key=%v value=%v\n", k, v)
		count++
		return true // 返回 false 可提前终止遍历
	})
	fmt.Println("遍历到", count, "个 key")
	// 输出:
	// key=timeout value=30
	// 遍历到 1 个 key
}
