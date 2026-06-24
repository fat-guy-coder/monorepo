package concurrency

import (
	"fmt"
	"sync"
)

// RunSyncWgOnce 演示 WaitGroup / Once / Cond
func RunSyncWgOnce() {
	// === WaitGroup ≈ Promise.all ===
	fmt.Println("=== WaitGroup ===")
	var wg sync.WaitGroup
	for i := 1; i <= 5; i++ {
		wg.Add(1) // ⚠️ 必须在 goroutine 外 Add！
		go func(id int) {
			defer wg.Done()
			fmt.Printf("worker %d done\n", id)
		}(i)
	}
	wg.Wait()
	fmt.Println("all done")
	// 输出: worker N done（x5，顺序随机）, all done

	// === sync.Once 单次执行 ===
	fmt.Println("\n=== sync.Once ===")
	var once sync.Once
	var counter int
	initFn := func() { counter++; fmt.Println("init called") }
	once.Do(initFn)
	once.Do(initFn) // 第二次——不执行
	once.Do(initFn) // 第三次——也不执行
	fmt.Printf("counter=%d\n", counter)
	// 输出: init called, counter=1

	// === sync.Cond 条件变量 ===
	fmt.Println("\n=== sync.Cond ===")
	var mu sync.Mutex
	cond := sync.NewCond(&mu)
	ready := false
	// 消费者
	go func() {
		mu.Lock()
		for !ready { cond.Wait() } // Wait 自动释放锁，唤醒后重获取
		fmt.Println("consumer: ready!")
		mu.Unlock()
	}()
	// 生产者
	mu.Lock(); ready = true; mu.Unlock()
	cond.Signal() // 唤醒一个等待者（Broadcast 唤醒所有）
	// 输出: consumer: ready!
}
