package concurrency

import (
	"fmt"
	"sync"
)

// RunConcurrencyPatterns 演示 Fan-out/in、Pipeline、Worker Pool
func RunConcurrencyPatterns() {
	// === Fan-out / Fan-in ===
	fmt.Println("=== Fan-out / Fan-in ===")
	gen := func(nums ...int) <-chan int {
		out := make(chan int)
		go func() { for _, n := range nums { out <- n }; close(out) }()
		return out
	}
	sq := func(in <-chan int) <-chan int {
		out := make(chan int)
		go func() { for n := range in { out <- n * n }; close(out) }()
		return out
	}
	for v := range sq(gen(2, 3, 4)) { fmt.Printf("  %d\n", v) }
	// 输出: 4, 9, 16

	// === Worker Pool ===
	fmt.Println("\n=== Worker Pool ===")
	jobs := make(chan int, 5)
	var wg sync.WaitGroup
	for w := 1; w <= 3; w++ { // 3 个 worker
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			for j := range jobs { fmt.Printf("  worker %d: job %d\n", id, j) }
		}(w)
	}
	for j := 1; j <= 5; j++ { jobs <- j }
	close(jobs); wg.Wait()
	// 输出示例: worker 1: job 1, worker 2: job 2, worker 3: job 3, worker 1: job 4, worker 2: job 5

	// === Generator ===
	fmt.Println("\n=== Generator ===")
	fib := func() <-chan int {
		ch := make(chan int)
		go func() { a, b := 0, 1; for { ch <- a; a, b = b, a+b } }()
		return ch
	}
	f := fib()
	for i := 0; i < 6; i++ { fmt.Printf("  %d", <-f) }
	fmt.Println()
	// 输出: 0 1 1 2 3 5
}
