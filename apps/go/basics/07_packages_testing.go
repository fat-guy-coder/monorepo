package basics

import (
	"fmt"
)

// RunPackages 演示 Go 的包管理和测试模式。
func RunPackages() {
	// --- 包导入模式 ---
	fmt.Println("\n--- 包导入模式 ---")

	fmt.Println("Go 的导入模式:")
	fmt.Println("  import \"fmt\"                    // 标准库")
	fmt.Println("  import \"github.com/xxx/yyy\"     // 第三方包")
	fmt.Println("  import \"github.com/monorepo/go/basics\" // 模块内包")
	fmt.Println()
	fmt.Println("别名导入:")
	fmt.Println("  import f \"fmt\"    // f.Println()")
	fmt.Println("  import _ \"pkg\"    // 仅执行 init()，不使用")
	fmt.Println("  import . \"pkg\"    // 导入所有导出符号到当前命名空间（不推荐）")

	// --- 导出 vs 未导出 ---
	fmt.Println("\n--- 导出 vs 未导出 ---")

	fmt.Println("Go 使用首字母大小写决定可见性:")
	fmt.Println("  大写字母开头 → 导出（Public）: RunPackages, Person, Area")
	fmt.Println("  小写字母开头 → 未导出（Private）: greet, divide, maxDepth")
	fmt.Println()
	fmt.Println("这对函数、类型、变量、常量、方法、结构体字段都适用。")

	// --- go mod 说明 ---
	fmt.Println("\n--- go mod 说明 ---")

	fmt.Println("Go Modules 基础命令:")
	fmt.Println("  go mod init github.com/monorepo/go   # 初始化模块")
	fmt.Println("  go mod tidy                           # 整理/下载依赖")
	fmt.Println("  go get github.com/gin-gonic/gin       # 添加依赖")
	fmt.Println("  go get -u ./...                       # 更新所有依赖")
	fmt.Println("  go mod vendor                         # 创建 vendor 目录")
	fmt.Println()
	fmt.Println("模块路径 github.com/monorepo/go 定义在 go.mod 中。")

	// --- internal 包 ---
	fmt.Println("\n--- internal 包 ---")

	fmt.Println("Go 的 internal 包提供访问控制:")
	fmt.Println("  /internal/ 目录下的包只能被其父目录及")
	fmt.Println("  父目录的子目录中的包导入。")
	fmt.Println()
	fmt.Println("例如:")
	fmt.Println("  github.com/monorepo/go/internal/config")
	fmt.Println("  只能被 github.com/monorepo/go/... 内的包导入")
	fmt.Println("  外部包无法导入此 internal 包")

	// --- 表格驱动测试 ---
	fmt.Println("\n--- 表格驱动测试（Table-Driven Tests）---")

	fmt.Println("Go 测试文件以 _test.go 结尾，函数以 Test 开头。")
	fmt.Println()
	fmt.Println("示例实现:")
	fmt.Println("  // 文件: math_test.go")
	fmt.Println("  func Add(a, b int) int {")
	fmt.Println("      return a + b")
	fmt.Println("  }")
	fmt.Println()
	fmt.Println("  func TestAdd(t *testing.T) {")
	fmt.Println("      tests := []struct {")
	fmt.Println("          name     string")
	fmt.Println("          a, b     int")
	fmt.Println("          expected int")
	fmt.Println("      }{")
	fmt.Println("          {\"正数\", 2, 3, 5},")
	fmt.Println("          {\"零值\", 0, 0, 0},")
	fmt.Println("          {\"负数\", -1, -2, -3},")
	fmt.Println("          {\"混合\", -5, 10, 5},")
	fmt.Println("      }")
	fmt.Println("      for _, tt := range tests {")
	fmt.Println("          t.Run(tt.name, func(t *testing.T) {")
	fmt.Println("              got := Add(tt.a, tt.b)")
	fmt.Println("              if got != tt.expected {")
	fmt.Println("                  t.Errorf(\"Add(%d,%d)=%d, want %d\",")
	fmt.Println("                      tt.a, tt.b, got, tt.expected)")
	fmt.Println("              }")
	fmt.Println("          })")
	fmt.Println("      }")
	fmt.Println("  }")

	// 实际运行测试演示
	fmt.Println("\n使用 Add 函数验证测试:（模拟表格驱动测试）")
	tests := []struct {
		name     string
		a, b     int
		expected int
	}{
		{"正数", 2, 3, 5},
		{"零值", 0, 0, 0},
		{"负数", -1, -2, -3},
		{"混合", -5, 10, 5},
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
		fmt.Println("\n所有测试通过")
	}

	// --- 基准测试 ---
	fmt.Println("\n--- 基准测试（Benchmark）---")

	fmt.Println("Go 基准测试函数以 Benchmark 开头:")
	fmt.Println()
	fmt.Println("  func BenchmarkAdd(b *testing.B) {")
	fmt.Println("      for i := 0; i < b.N; i++ {")
	fmt.Println("          Add(1000, 2000)")
	fmt.Println("      }")
	fmt.Println("  }")
	fmt.Println()
	fmt.Println("运行: go test -bench=. -benchmem")

	// --- 示例测试 ---
	fmt.Println("\n--- 示例测试（Example Tests）---")

	fmt.Println("Go 示例测试函数以 Example 开头，也是文档:")
	fmt.Println()
	fmt.Println("  func ExampleAdd() {")
	fmt.Println("      fmt.Println(Add(1, 2))")
	fmt.Println("      // Output: 3")
	fmt.Println("  }")
	fmt.Println()
	fmt.Println("示例测试既是测试（验证输出）也是文档（显示在 pkg.go.dev）。")
	fmt.Println("运行: go test -run ExampleAdd")
}

// Add 简单加法（用于测试演示）
func Add(a, b int) int {
	return a + b
}
