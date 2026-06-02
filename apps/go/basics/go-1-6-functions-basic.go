package basics

import "fmt"

// RunFunctions 演示 Go 中的函数。
func RunFunctions() {
	// --- 基本函数声明 ---
	fmt.Println("\n--- 基本函数声明 ---")

	greet("Go 开发者")

	// --- 多返回值 ---
	fmt.Println("\n--- 多返回值 ---")

	quot, rem := divide(10, 3)
	fmt.Printf("divide(10, 3): 商=%d, 余数=%d\n", quot, rem)

	// 忽略某个返回值
	quotOnly, _ := divide(20, 7)
	fmt.Printf("divide(20, 7): 商=%d\n", quotOnly)

	// --- 命名返回值 ---
	fmt.Println("\n--- 命名返回值 ---")

	lower, upper := minMax(5, 10, 3, 8)
	fmt.Printf("minMax(5,10,3,8): min=%d, max=%d\n", lower, upper)

	// --- 变长参数 ---
	fmt.Println("\n--- 变长参数（Variadic）---")

	fmt.Printf("sum(1,2,3): %d\n", sum(1, 2, 3))
	fmt.Printf("sum(10,20): %d\n", sum(10, 20))
	nums := []int{1, 2, 3, 4, 5}
	fmt.Printf("sum(nums...): %d\n", sum(nums...)) // 展开切片

	// --- 函数作为值 ---
	fmt.Println("\n--- 函数作为值 ---")

	var add func(int, int) int = func(a, b int) int {
		return a + b
	}
	var multiply = func(a, b int) int {
		return a * b
	}
	fmt.Printf("add(3,4)=%d, multiply(3,4)=%d\n", add(3, 4), multiply(3, 4))

	// --- 闭包 ---
	fmt.Println("\n--- 闭包（Closure）---")

	counter := newCounter()
	fmt.Printf("counter(): %d\n", counter())
	fmt.Printf("counter(): %d\n", counter())
	fmt.Printf("counter(): %d\n", counter())

	// 闭包实用示例：配置函数
	greeting := makeGreeter("你好")
	fmt.Printf("greeting(\"小明\"): %s\n", greeting("小明"))
	fmt.Printf("greeting(\"小红\"): %s\n", greeting("小红"))

	// --- 高阶函数 ---
	fmt.Println("\n--- 高阶函数（Higher-Order Functions）---")

	// 接受函数作为参数
	applyAndPrint := func(fn func(int) int, val int) {
		fmt.Printf("f(%d) = %d\n", val, fn(val))
	}
	applyAndPrint(double, 5)
	applyAndPrint(func(x int) int { return x * x }, 5)

	// 返回函数
	tripleFn := makeMultiplier(3)
	fmt.Printf("triple(4) = %d\n", tripleFn(4))

	// 函数组合：chain
	increment := func(x int) int { return x + 1 }
	composed := chain(double, increment)
	fmt.Printf("chain(double, increment)(3) = %d\n", composed(3))

	// --- init() 说明 ---
	fmt.Println("\n--- init() 函数说明 ---")
	fmt.Println("Go 中每个包可以有一个或多个 init() 函数。")
	fmt.Println("它们在 main() 之前自动执行，用于初始化包级状态。")
	fmt.Println("执行顺序：导入的包 init() -> 当前包 init() -> main()")
	fmt.Println("同一个文件/包中可以有多个 init()。")
}

// --- 示例函数定义 ---

func greet(name string) {
	fmt.Printf("Hello, %s!\n", name)
}

// 多返回值
func divide(a, b int) (int, int) {
	return a / b, a % b
}

// 命名返回值 + 变长参数
func minMax(nums ...int) (min int, max int) {
	if len(nums) == 0 {
		return
	}
	min, max = nums[0], nums[0]
	for _, n := range nums {
		if n < min {
			min = n
		}
		if n > max {
			max = n
		}
	}
	return // 裸返回（naked return）——使用命名返回值时可直接写 return
}

func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

// 闭包：计数器
func newCounter() func() int {
	count := 0
	return func() int {
		count++
		return count
	}
}

// 闭包：生成问候函数
func makeGreeter(prefix string) func(string) string {
	return func(name string) string {
		return prefix + "，" + name + "！"
	}
}

// 高阶函数：接受函数
func double(x int) int {
	return x * 2
}

// 高阶函数：返回函数
func makeMultiplier(factor int) func(int) int {
	return func(x int) int {
		return x * factor
	}
}

// 函数组合
func chain(f, g func(int) int) func(int) int {
	return func(x int) int {
		return g(f(x))
	}
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunFunctions() }
