package basics

import "fmt"

// RunArraysSlices 演示 Go 中的数组和切片。
func RunArraysSlices() {
	// --- 数组 ---
	fmt.Println("\n--- 数组（Array）---")

	var arr1 [3]int
	arr1[0], arr1[1], arr1[2] = 10, 20, 30
	fmt.Printf("声明: %v, len=%d\n", arr1, len(arr1))

	arr2 := [4]string{"Go", "Rust", "Python", "Java"}
	fmt.Printf("字面量: %v\n", arr2)

	arr3 := [...]float64{1.1, 2.2, 3.3}
	fmt.Printf("自动推导: %v, len=%d\n", arr3, len(arr3))

	arr4 := [5]int{0: 100, 4: 500}
	fmt.Printf("稀疏初始化: %v\n", arr4)

	// 数组是值类型
	original := [3]int{1, 2, 3}
	copied := original
	copied[0] = 999
	fmt.Printf("值类型: original=%v, copied=%v\n", original, copied)

	// --- 切片 ---
	fmt.Println("\n--- 切片（Slice）---")

	sl1 := []int{1, 2, 3, 4, 5}
	fmt.Printf("字面量: %v, len=%d, cap=%d\n", sl1, len(sl1), cap(sl1))

	sl2 := make([]int, 3, 5)
	fmt.Printf("make(3,5): %v, len=%d, cap=%d\n", sl2, len(sl2), cap(sl2))

	sl3 := make([]int, 3)
	fmt.Printf("make(3): %v, len=%d, cap=%d\n", sl3, len(sl3), cap(sl3))

	// 从数组创建切片（共享底层数组）
	arr := [5]int{10, 20, 30, 40, 50}
	slFromArr := arr[1:4]
	fmt.Printf("arr[1:4]: %v, len=%d, cap=%d\n", slFromArr, len(slFromArr), cap(slFromArr))
	slFromArr[0] = 999
	fmt.Printf("修改切片后: arr=%v（底层数组也被改了）\n", arr)

	// --- append ---
	fmt.Println("\n--- append ---")
	s := []int{1, 2, 3}
	fmt.Printf("初始: %v, len=%d, cap=%d\n", s, len(s), cap(s))
	s = append(s, 4, 5)
	fmt.Printf("append(4,5): %v, len=%d, cap=%d\n", s, len(s), cap(s))

	// append 扩容演示
	fmt.Println("\n--- append 扩容 ---")
	demo := make([]int, 0)
	for i := 0; i < 10; i++ {
		demo = append(demo, i)
		fmt.Printf("  append %d: len=%d, cap=%d\n", i, len(demo), cap(demo))
	}

	// --- copy ---
	fmt.Println("\n--- copy ---")
	src := []int{1, 2, 3, 4, 5}
	dst := make([]int, 3)
	n := copy(dst, src)
	fmt.Printf("src=%v, dst=%v, copied=%d\n", src, dst, n)

	// --- 切片操作 ---
	s2 := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	fmt.Println("\n--- 切片操作 ---")
	fmt.Printf("s=%v\n", s2)
	fmt.Printf("  s[2:5] = %v\n", s2[2:5])
	fmt.Printf("  s[:4]  = %v\n", s2[:4])
	fmt.Printf("  s[6:]  = %v\n", s2[6:])
	fmt.Printf("  s[:]   = %v\n", s2[:])

	// nil 切片 vs 空切片
	var nilSlice []int
	emptySlice := []int{}
	fmt.Println("\n--- nil 切片 vs 空切片 ---")
	fmt.Printf("nil 切片: %v, len=%d, isNil=%t\n", nilSlice, len(nilSlice), nilSlice == nil)
	fmt.Printf("空切片:   %v, len=%d, isNil=%t\n", emptySlice, len(emptySlice), emptySlice == nil)
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunArraysSlices() }
