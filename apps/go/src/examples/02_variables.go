package examples

import "fmt"

// RunVariables 运行变量声明示例
func RunVariables() {
	fmt.Println("\n=== 变量声明 ===")

	// 方法1: var 声明
	var name string = "Alice"
	var age int = 25
	fmt.Printf("var声明: name=%s, age=%d\n", name, age)

	// 方法2: 类型推断
	var score = 95.5 // 推断为 float64
	var isStudent = true
	fmt.Printf("类型推断: score=%.1f, isStudent=%t\n", score, isStudent)

	// 方法3: 短变量声明 (只能在函数内使用)
	message := "Hello, Go!"
	count := 0
	isActive := false
	fmt.Printf("短变量: message=%s, count=%d, isActive=%t\n", message, count, isActive)

	// 方法4: 多变量声明
	var (
		a = 1
		b = 2
		c = 3
	)
	fmt.Printf("多变量声明: a=%d, b=%d, c=%d\n", a, b, c)

	// 方法5: 并行声明
	var x, y, z = 1, 2, 3
	fmt.Printf("并行声明: x=%d, y=%d, z=%d\n", x, y, z)

	// 方法6: 交换变量
	x, y = y, x
	fmt.Printf("交换后: x=%d, y=%d\n", x, y)

	// 匿名变量 (空标识符)
	var _, unused = 10, 20
	fmt.Printf("匿名变量: _ 丢弃了值，只使用了 unused=%d\n", unused)

	// 常量不能用 :=
	// 命名建议: 小写字母开头只能在本包内访问，大写字母开头可导出
}