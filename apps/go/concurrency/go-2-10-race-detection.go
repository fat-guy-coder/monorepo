package concurrency

import "fmt"

// RunRaceDetection 演示竞态检测
func RunRaceDetection() {
	fmt.Println("=== go run -race ===")
	fmt.Println("Go 竞态检测器基于 Google ThreadSanitizer v2")
	fmt.Println("编译时插入额外检查代码，运行时检测并发读写冲突")
	fmt.Println()
	fmt.Println("用法:")
	fmt.Println("  go run -race main.go       # 运行检测")
	fmt.Println("  go test -race ./...        # 测试检测（CI 标配）")
	fmt.Println("  go build -race -o myapp    # 编译带检测的二进制")
	fmt.Println()
	fmt.Println("性能开销：内存 ~10x，CPU ~2-20x——只在测试/开发环境用")
	fmt.Println("生产环境不需要 -race——开销太大")
	fmt.Println()
	fmt.Println("报告示例：")
	fmt.Println("  WARNING: DATA RACE")
	fmt.Println("  Write at 0x00c000... by goroutine 7:")
	fmt.Println("    main.main.func1() at main.go:12")
	fmt.Println("  Previous read at 0x00c000... by goroutine 6:")
	fmt.Println("    main.main.func2() at main.go:18")
	fmt.Println()
	// 实际演示需要 -race flag，这里仅说明
	var counter int
	go func() { counter++ }()
	go func() { counter++ }()
	fmt.Println("counter=", counter)
	// 输出: counter=2（大概率，偶发 1）
	// go run -race 会报告 DATA RACE
}
