package examples

import "fmt"

// RunPointers 运行指针示例
func RunPointers() {
	fmt.Println("\n=== 指针 (Pointer) ===")

	// 基本概念
	// Go 有指针，但没有指针运算

	// 取地址符 &
	var num int = 42
	ptr := &num
	fmt.Printf("num 的值: %d\n", num)
	fmt.Printf("num 的地址: %p\n", ptr)
	fmt.Printf("ptr 指向的值: %d\n", *ptr)

	// 指针声明
	var p1 *int // nil 指针
	fmt.Printf("未初始化的指针: %v\n", p1)

	// new 创建指针
	p2 := new(int)
	fmt.Printf("new(int) 创建的指针: %p, 值: %d\n", p2, *p2)

	// 修改指针指向的值
	*p2 = 100
	fmt.Printf("修改后的值: %d\n", *p2)

	// 指针作为函数参数
	num2 := 10
	fmt.Printf("调用前: %d\n", num2)
	increment(&num2)
	fmt.Printf("调用后: %d\n", num2)

	// 指针与切片
	slice := []int{1, 2, 3, 4, 5}
	slicePtr := &slice
	// 注意: 不能直接修改切片指针，需通过索引
	fmt.Printf("切片地址: %p\n", slicePtr)
	fmt.Printf("切片长度: %d, 容量: %d\n", len(slice), cap(slice))

	// 指针与 map
	m := map[string]int{"a": 1}
	mapPtr := &m
	// map 本身是指针类型，所以通常不需要额外的指针
	fmt.Printf("map 地址: %p\n", mapPtr)

	// 指针与结构体
	type Person struct {
		Name string
		Age  int
	}
	person := Person{Name: "Alice", Age: 25}
	personPtr := &person
	fmt.Printf("person 的名字: %s\n", personPtr.Name) // 自动解引用

	// 二重指针
	pp := &ptr
	fmt.Printf("二重指针 pp 指向: %p, pp 的值: %v\n", pp, *pp)
	fmt.Printf("ptr 指向的值: %d\n", **pp)

	// new 与 make
	// new: 分配值类型的内存，返回指针
	// make: 分配引用类型的内存 (slice, map, channel)，返回类型本身
	p3 := new([]int) // 很少这样用
	fmt.Printf("new([]int): %p, 值: %v\n", p3, *p3)

	s := make([]int, 3)
	sPtr := &s
	fmt.Printf("make([]int, 3): %p, 值: %v\n", sPtr, s)
}

func increment(n *int) {
	*n++
}