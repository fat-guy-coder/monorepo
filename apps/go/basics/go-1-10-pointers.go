package basics

import "fmt"

// RunPointers 演示 Go 中的指针。
func RunPointers() {
	fmt.Println("\n--- 指针基础 ---")
	x := 42
	var p *int = &x // p 指向 x
	fmt.Printf("x=%d, p=%p, *p=%d\n", x, p, *p)
	*p = 99 // 通过指针修改 x
	fmt.Printf("修改后: x=%d\n", x)

	// 指针零值是 nil
	var nilP *int
	fmt.Printf("nil 指针: %v, isNil=%t\n", nilP, nilP == nil)

	// --- 指针与结构体 ---
	fmt.Println("\n--- 指针与结构体 ---")
	type Person struct {
		Name string
		Age  int
	}
	person := Person{Name: "Alice", Age: 30}
	pp := &person
	pp.Age = 31 // 等价 (*pp).Age = 31，Go 自动解引用
	fmt.Printf("person: %+v\n", person)

	// --- 值传递 vs 指针传递 ---
	fmt.Println("\n--- 值传递 vs 指针传递 ---")
	func(a int, b *int) {
		a = 999       // 不影响外部
		*b = 999      // 影响外部
	}(10, &x)
	fmt.Printf("x=%d（指针修改生效）\n", x)

	// --- new() 分配零值指针 ---
	fmt.Println("\n--- new() ---")
	ptr := new(int) // 等价 var i int; ptr := &i
	fmt.Printf("*ptr 零值: %d\n", *ptr)
	*ptr = 100
	fmt.Printf("赋值后: %d\n", *ptr)

	// --- 指针数组 vs 数组指针 ---
	fmt.Println("\n--- 指针数组 vs 数组指针 ---")
	a, b2, c := 1, 2, 3
	arrOfPtrs := [3]*int{&a, &b2, &c} // 指针数组
	fmt.Printf("指针数组: [%d %d %d]\n", *arrOfPtrs[0], *arrOfPtrs[1], *arrOfPtrs[2])

	arr := [3]int{10, 20, 30}
	ptrToArr := &arr // 数组指针
	ptrToArr[0] = 100
	fmt.Printf("数组指针修改: %v\n", arr)
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunPointers() }
