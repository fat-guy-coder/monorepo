package examples

import "fmt"

// RunSlices 运行切片示例
func RunSlices() {
	fmt.Println("\n=== 切片 (Slice) ===")

	// 切片是数组的引用，是引用类型

	// 创建切片 - 使用 make
	slice1 := make([]int, 5) // len=5, cap=5, 初始值为零
	fmt.Printf("make([]int, 5): len=%d, cap=%d, %v\n", len(slice1), cap(slice1), slice1)

	slice2 := make([]int, 3, 10) // len=3, cap=10
	fmt.Printf("make([]int, 3, 10): len=%d, cap=%d\n", len(slice2), cap(slice2))

	// 使用切片字面量
	slice3 := []int{1, 2, 3, 4, 5}
	fmt.Printf("切片字面量: %v\n", slice3)

	// 从数组或切片创建切片 [start:end]
	arr := [10]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	slice4 := arr[2:5]       // 索引 2,3,4 -> [2,3,4]
	slice5 := arr[:5]        // 索引 0-4 -> [0,1,2,3,4]
	slice6 := arr[5:]        // 索引 5-9 -> [5,6,7,8,9]
	slice7 := arr[:]         // 整个数组 -> [0,1,2,3,4,5,6,7,8,9]
	fmt.Printf("arr[2:5]=%v, arr[:5]=%v, arr[5:]=%v\n", slice4, slice5, slice6)
	fmt.Printf("arr[:]=%v\n", slice7)

	// append 添加元素
	slice8 := []int{1, 2, 3}
	slice8 = append(slice8, 4, 5)
	fmt.Printf("append 后: %v\n", slice8)

	// append 扩容
	slice9 := make([]int, 0)
	for i := 0; i < 10; i++ {
		slice9 = append(slice9, i)
		fmt.Printf("append %d: len=%d, cap=%d\n", i, len(slice9), cap(slice9))
	}

	// copy 复制切片
	src := []int{1, 2, 3}
	dst := make([]int, len(src))
	copied := copy(dst, src)
	fmt.Printf("copy: copied=%d, dst=%v\n", copied, dst)

	// 删除元素 (不改变原切片，创建新切片)
	slice10 := []int{1, 2, 3, 4, 5}
	index := 2
	slice11 := append(slice10[:index], slice10[index+1:]...)
	fmt.Printf("删除索引 %d 后: %v (原切片: %v)\n", index, slice11, slice10)

	// 遍历切片
	slice12 := []string{"apple", "banana", "orange"}
	for i, v := range slice12 {
		fmt.Printf("slice12[%d] = %s\n", i, v)
	}

	// 切片是引用类型
	original := []int{1, 2, 3}
	copySlice := original
	copySlice[0] = 100
	fmt.Printf("original=%v, copySlice=%v\n", original, copySlice)

	// nil 切片
	var nilSlice []int
	fmt.Printf("nil 切片: %v, len=%d, cap=%d\n", nilSlice, len(nilSlice), cap(nilSlice))

	// 空切片
	emptySlice := []int{}
	fmt.Printf("空切片: %v, len=%d, cap=%d\n", emptySlice, len(emptySlice), cap(emptySlice))
}