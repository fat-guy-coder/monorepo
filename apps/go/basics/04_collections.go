package basics

import (
	"fmt"
	"sync"
)

// RunCollections 演示 Go 中的数组、切片和映射。
func RunCollections() {
	// --- 数组 ---
	fmt.Println("\n--- 数组（Array）---")

	// 指定长度
	var arr1 [3]int
	arr1[0] = 10
	arr1[1] = 20
	arr1[2] = 30
	fmt.Printf("arr1: %v, len=%d\n", arr1, len(arr1))

	// 初始化列表
	arr2 := [4]string{"Go", "Rust", "Python", "Java"}
	fmt.Printf("arr2: %v\n", arr2)

	// 自动推导长度
	arr3 := [...]float64{1.1, 2.2, 3.3}
	fmt.Printf("arr3: %v, len=%d\n", arr3, len(arr3))

	// 按索引初始化
	arr4 := [5]int{0: 100, 4: 500}
	fmt.Printf("arr4: %v (稀疏初始化)\n", arr4)

	// 数组是值类型（复制整个数组）
	original := [3]int{1, 2, 3}
	copied := original
	copied[0] = 999
	fmt.Printf("值类型: original=%v, copied=%v\n", original, copied)

	// --- 切片 ---
	fmt.Println("\n--- 切片（Slice）---")

	// 字面量创建
	sl1 := []int{1, 2, 3, 4, 5}
	fmt.Printf("字面量: %v, len=%d, cap=%d\n", sl1, len(sl1), cap(sl1))

	// make 创建
	sl2 := make([]int, 3, 5) // len=3, cap=5
	fmt.Printf("make(3,5): %v, len=%d, cap=%d\n", sl2, len(sl2), cap(sl2))

	sl3 := make([]int, 3) // len=cap=3
	fmt.Printf("make(3): %v, len=%d, cap=%d\n", sl3, len(sl3), cap(sl3))

	// 从数组创建切片
	arr := [5]int{10, 20, 30, 40, 50}
	slFromArr := arr[1:4] // [20, 30, 40]
	fmt.Printf("arr[1:4]: %v, len=%d, cap=%d\n", slFromArr, len(slFromArr), cap(slFromArr))

	// 切片是引用类型（共享底层数组）
	slFromArr[0] = 999
	fmt.Printf("修改切片: arr=%v, slFromArr=%v\n", arr, slFromArr)

	// --- 切片操作 ---
	fmt.Println("\n--- 切片操作 ---")

	// append
	s := []int{1, 2, 3}
	fmt.Printf("初始: %v, len=%d, cap=%d\n", s, len(s), cap(s))

	s = append(s, 4, 5)
	fmt.Printf("append(4,5): %v, len=%d, cap=%d\n", s, len(s), cap(s))

	// append 触发扩容（capacity 翻倍）
	fmt.Println("\n--- append 扩容演示 ---")
	demo := make([]int, 0)
	for i := 0; i < 10; i++ {
		demo = append(demo, i)
		fmt.Printf("  append %d: len=%d, cap=%d, slice=%v\n", i, len(demo), cap(demo), demo)
	}

	// copy
	src := []int{1, 2, 3, 4, 5}
	dst := make([]int, 3)
	n := copy(dst, src)
	fmt.Printf("\ncopy: src=%v, dst=%v, copied=%d\n", src, dst, n)

	// 切片操作
	s2 := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	fmt.Printf("\n切片操作: s=%v\n", s2)
	fmt.Printf("  s[2:5] = %v\n", s2[2:5])
	fmt.Printf("  s[:4]  = %v\n", s2[:4])
	fmt.Printf("  s[6:]  = %v\n", s2[6:])
	fmt.Printf("  s[:]   = %v\n", s2[:])

	// nil 切片 vs 空切片
	var nilSlice []int
	emptySlice := []int{}
	fmt.Printf("\nnil 切片: %v, len=%d, cap=%d, isNil=%t\n", nilSlice, len(nilSlice), cap(nilSlice), nilSlice == nil)
	fmt.Printf("空切片: %v, len=%d, cap=%d, isNil=%t\n", emptySlice, len(emptySlice), cap(emptySlice), emptySlice == nil)

	// --- Map ---
	fmt.Println("\n--- Map 映射 ---")

	// 声明与初始化
	var scores map[string]int // nil map，不能写入
	fmt.Printf("nil map: %v\n", scores)

	// make 创建
	scores = make(map[string]int)
	scores["Alice"] = 95
	scores["Bob"] = 87
	scores["Charlie"] = 92
	fmt.Printf("scores: %v\n", scores)

	// 字面量初始化
	colors := map[string]string{
		"red":   "#FF0000",
		"green": "#00FF00",
		"blue":  "#0000FF",
	}
	fmt.Printf("colors: %v\n", colors)

	// 插入
	colors["yellow"] = "#FFFF00"

	// 查找 (comma ok 惯用法)
	if hex, ok := colors["red"]; ok {
		fmt.Printf("red 存在: %s\n", hex)
	}
	if _, ok := colors["purple"]; !ok {
		fmt.Println("purple 不存在")
	}

	// 删除
	delete(colors, "green")
	fmt.Printf("删除 green 后: %v\n", colors)

	// --- range over map ---
	fmt.Println("\n--- range over map ---")
	for name, score := range scores {
		fmt.Printf("  %s: %d 分\n", name, score)
	}

	fmt.Println("\n注意：map 的遍历顺序是随机的，每次可能不同")

	// --- sync.Map ---
	fmt.Println("\n--- sync.Map（并发安全的 map）---")

	var sm sync.Map

	// Store
	sm.Store("key1", "value1")
	sm.Store("key2", 42)
	sm.Store("key3", true)

	// Load
	if val, ok := sm.Load("key1"); ok {
		fmt.Printf("Load key1: %v\n", val)
	}
	if val, ok := sm.Load("key2"); ok {
		fmt.Printf("Load key2: %v\n", val)
	}

	// LoadOrStore
	actual, loaded := sm.LoadOrStore("key1", "new_value")
	fmt.Printf("LoadOrStore key1: val=%v, already_loaded=%t\n", actual, loaded)

	actual2, loaded2 := sm.LoadOrStore("key4", "new_item")
	fmt.Printf("LoadOrStore key4: val=%v, already_loaded=%t\n", actual2, loaded2)

	// Delete
	sm.Delete("key3")
	if _, ok := sm.Load("key3"); !ok {
		fmt.Println("key3 已删除")
	}

	// Range（遍历）
	fmt.Print("sync.Map Range: ")
	sm.Range(func(key, value interface{}) bool {
		fmt.Printf("[%v:%v] ", key, value)
		return true // 继续遍历
	})
	fmt.Println()
}
