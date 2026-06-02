package basics

import (
	"fmt"
)

// RunTesting 演示 Go 测试的核心模式：表格驱动测试、子测试、Helper、Parallel 和覆盖率。
// 注意：实际的 TestXxx 函数由 go test 框架运行，这里用模拟方式展示其结构。
func RunTesting() {
	// --- 表格驱动测试 ---
	fmt.Println("--- 表格驱动测试（Table-Driven Tests）---")
	fmt.Println("Go 测试的核心模式 —— 一个测试函数覆盖多条用例：")
	fmt.Println()
	fmt.Println("  func TestAdd(t *testing.T) {")
	fmt.Println("      tests := []struct {")
	fmt.Println("          name     string")
	fmt.Println("          a, b     int")
	fmt.Println("          expected int")
	fmt.Println("      }{")
	fmt.Println("          {\"正数相加\", 2, 3, 5},")
	fmt.Println("          {\"零值\",     0, 0, 0},")
	fmt.Println("          {\"负数相加\", -2, -3, -5},")
	fmt.Println("          {\"正负混合\", -5, 10, 5},")
	fmt.Println("      }")
	fmt.Println("      for _, tt := range tests {")
	fmt.Println("          t.Run(tt.name, func(t *testing.T) {")
	fmt.Println("              if got := Add(tt.a, tt.b); got != tt.expected {")
	fmt.Println("                  t.Errorf(\"Add(%d, %d) = %d, want %d\",")
	fmt.Println("                      tt.a, tt.b, got, tt.expected)")
	fmt.Println("              }")
	fmt.Println("          })")
	fmt.Println("      }")
	fmt.Println("  }")
	fmt.Println()

	// 模拟运行
	fmt.Println("模拟运行结果:")
	tests := []struct {
		name     string
		a, b     int
		expected int
	}{
		{"正数相加", 2, 3, 5},
		{"零值", 0, 0, 0},
		{"负数相加", -2, -3, -5},
		{"正负混合", -5, 10, 5},
	}
	allPassed := true
	for _, tt := range tests {
		got := Add(tt.a, tt.b)
		status := "PASS"
		if got != tt.expected {
			status = "FAIL"
			allPassed = false
		}
		fmt.Printf("  [%s] %s: Add(%d, %d) = %d (期望 %d)\n",
			status, tt.name, tt.a, tt.b, got, tt.expected)
	}
	if allPassed {
		fmt.Println("\n结果: 所有测试通过 ✓")
	}

	// --- t.Run 子测试 ---
	fmt.Println("\n--- t.Run 子测试 ---")
	fmt.Println("子测试的好处:")
	fmt.Println("  1. 每个用例独立运行、独立报告")
	fmt.Println("  2. 可以单独运行某个子测试:")
	fmt.Println("     go test -run TestAdd/正数相加")
	fmt.Println("  3. 并行执行（配合 t.Parallel）")
	fmt.Println("  4. setup/teardown 可以用嵌套 t.Run 分组")

	// --- t.Helper ---
	fmt.Println("\n--- t.Helper() — 辅助函数标记 ---")
	fmt.Println("t.Helper() 告诉测试框架\"调用者才是失败的测试\"")
	fmt.Println("这样错误信息会显示调用处而非 helper 内部:")
	fmt.Println()
	fmt.Println("  func assertEqual[T comparable](t *testing.T, got, want T) {")
	fmt.Println("      t.Helper()  // ← 关键！")
	fmt.Println("      if got != want {")
	fmt.Println("          t.Errorf(\"got %v, want %v\", got, want)")
	fmt.Println("      }")
	fmt.Println("  }")
	fmt.Println()
	fmt.Println("无 t.Helper() → 报错指向 assertEqual 内部 (无用)")
	fmt.Println("有 t.Helper() → 报错指向调用 assertEqual 的测试函数 (正确)")

	// --- t.Parallel ---
	fmt.Println("\n--- t.Parallel() — 并行测试 ---")
	fmt.Println("t.Parallel() 标记子测试可并行执行，由 testing 框架调度:")
	fmt.Println()
	fmt.Println("  for _, tt := range tests {")
	fmt.Println("      tt := tt             // 闭包安全 (Go 1.22+ 自动) ")
	fmt.Println("      t.Run(tt.name, func(t *testing.T) {")
	fmt.Println("          t.Parallel()     // 与其他子测试并行")
	fmt.Println("          // ... test logic")
	fmt.Println("      })")
	fmt.Println("  }")
	fmt.Println()
	fmt.Println("注意: 父测试函数自身也可调用 t.Parallel()")
	fmt.Println("并行粒度控制: -parallel N 标志限制并发数（默认 GOMAXPROCS）")

	// --- 测试覆盖率 ---
	fmt.Println("\n--- 测试覆盖率 ---")
	fmt.Println("生成覆盖率报告:")
	fmt.Println("  go test -coverprofile=coverage.out ./...")
	fmt.Println("  go tool cover -html=coverage.out     # 浏览器查看")
	fmt.Println("  go tool cover -func=coverage.out     # 终端摘要")
	fmt.Println()
	fmt.Println("覆盖率百分比说明:")
	fmt.Println("  覆盖率 ≠ 测试质量，高覆盖率可能缺少边界断言")
	fmt.Println("  关注未覆盖的分支（if/switch/error path）")
	fmt.Println("  关键: 测试的是行为，不是代码行数")

	// --- 常用测试模式总结 ---
	fmt.Println("\n--- 文件与命名规范 ---")
	fmt.Println("  文件:    xxx_test.go  (与源文件同目录)")
	fmt.Println("  测试:    func TestXxx(t *testing.T)")
	fmt.Println("  基准:    func BenchmarkXxx(b *testing.B)")
	fmt.Println("  示例:    func ExampleXxx()  // 含 // Output: 注释即测试")
	fmt.Println("  模糊:    func FuzzXxx(f *testing.F)")
	fmt.Println()
	fmt.Println("运行命令:")
	fmt.Println("  go test ./...                         # 所有测试")
	fmt.Println("  go test -v                            # 详细输出")
	fmt.Println("  go test -run TestAdd                  # 运行特定测试")
	fmt.Println("  go test -bench=. -benchmem            # 基准测试+内存")
	fmt.Println("  go test -coverprofile=c.out -coverpkg ./...")
	fmt.Println("  go test -count=1                      # 禁用缓存")
	fmt.Println("  go test -short                        # 跳过长时间测试")
}

// Add 加法函数，供测试演示使用。
func Add(a, b int) int {
	return a + b
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunTesting() }
