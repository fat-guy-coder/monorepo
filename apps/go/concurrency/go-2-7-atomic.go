package concurrency

import (
	"fmt"
	"sync/atomic"
)

// RunAtomic 演示 atomic 原子操作
func RunAtomic() {
	// === atomic vs Mutex ===
	fmt.Println("=== atomic 基础 ===")
	var counter int64
	atomic.AddInt64(&counter, 1)    // counter += 1（原子）
	atomic.AddInt64(&counter, 5)    // counter += 5
	v := atomic.LoadInt64(&counter) // 原子读
	fmt.Printf("counter=%d\n", v)
	// 输出: counter=6

	// Store / Swap
	atomic.StoreInt64(&counter, 100)
	old := atomic.SwapInt64(&counter, 200) // 交换并返回旧值
	fmt.Printf("old=%d counter=%d\n", old, atomic.LoadInt64(&counter))
	// 输出: old=100 counter=200

	// === CAS（无锁数据结构的基础） ===
	fmt.Println("\n=== CAS ===")
	var flag int64
	swapped := atomic.CompareAndSwapInt64(&flag, 0, 1) // flag==0 → 设1
	fmt.Printf("CAS 0→1: swapped=%v flag=%d\n", swapped, flag)
	swapped = atomic.CompareAndSwapInt64(&flag, 0, 2) // flag≠0 → 不修改
	fmt.Printf("CAS 0→2: swapped=%v flag=%d\n", swapped, flag)
	// 输出: CAS 0→1: swapped=true flag=1
	//       CAS 0→2: swapped=false flag=1

	fmt.Println("\natomic 比 Mutex 快 10-100x——CPU 指令级别（LOCK 前缀）")
	fmt.Println("但只适用于单个变量。代码块保护还是用 Mutex。")
}
