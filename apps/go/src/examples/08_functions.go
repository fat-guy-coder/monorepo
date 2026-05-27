package examples

import "fmt"

// RunFunctions 运行函数示例
func RunFunctions() {
	fmt.Println("\n=== 函数 (Function) ===")

	// 基本函数声明
	result := add(10, 20)
	fmt.Printf("add(10, 20) = %d\n", result)

	// 多返回值
	sum, product := calc(3, 4)
	fmt.Printf("calc(3, 4): sum=%d, product=%d\n", sum, product)

	// 忽略某个返回值
	_, prod := calc(3, 4)
	fmt.Printf("calc(3, 4) 只取 product: %d\n", prod)

	// 命名返回值
	quo, rem := divide(10, 3)
	fmt.Printf("divide(10, 3): quo=%d, rem=%d\n", quo, rem)

	// 可变参数
	total := sumAll(1, 2, 3, 4, 5)
	fmt.Printf("sumAll(1,2,3,4,5) = %d\n", total)

	// 传切片给可变参数
	nums := []int{1, 2, 3, 4, 5}
	total2 := sumAll(nums...)
	fmt.Printf("sumAll([]int{1,2,3,4,5}...) = %d\n", total2)

	// 闭包
	addFunc := adder(10)
	fmt.Printf("adder(10)(5) = %d\n", addFunc(5))
	fmt.Printf("adder(10)(3) = %d\n", addFunc(3))

	// 回调函数
	nums2 := []int{1, 2, 3, 4, 5}
	evens := filter(nums2, isEven)
	odds := filter(nums2, isOdd)
	fmt.Printf("偶数: %v\n", evens)
	fmt.Printf("奇数: %v\n", odds)

	// defer 延迟执行
	deferExample()
	fmt.Println("deferExample 执行完毕")

	// 多 defer (后进先出)
	deferOrder()
}

// 基本函数
func add(a int, b int) int {
	return a + b
}

// 简写参数类型
func sub(a, b int) int {
	return a - b
}

// 多返回值
func calc(a, b int) (int, int) {
	return a + b, a * b
}

// 命名返回值
func divide(a, b int) (quo, rem int) {
	quo = a / b
	rem = a % b
	return // 裸 return
}

// 可变参数函数
func sumAll(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

// 函数作为参数 (回调函数)
func filter(nums []int, f func(int) bool) []int {
	result := []int{}
	for _, n := range nums {
		if f(n) {
			result = append(result, n)
		}
	}
	return result
}

func isEven(n int) bool {
	return n%2 == 0
}

func isOdd(n int) bool {
	return n%2 != 0
}

// 闭包函数
func adder(base int) func(int) int {
	return func(n int) int {
		base += n
		return base
	}
}

// defer 延迟执行
func deferExample() {
	defer fmt.Println("defer 1")
	defer fmt.Println("defer 2")
	defer fmt.Println("defer 3")
	fmt.Println("主逻辑")
}

func deferOrder() {
	fmt.Println("开始")
	for i := 0; i < 3; i++ {
		defer fmt.Printf("defer in loop: %d\n", i)
	}
	fmt.Println("结束")
}