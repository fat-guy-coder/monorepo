package examples

import "fmt"

// RunArrays 运行数组示例
func RunArrays() {
	fmt.Println("\n=== 数组 ===")

	// 声明数组 - 固定长度，固定类型
	var arr1 [5]int
	fmt.Printf("默认初始化: %v\n", arr1) // [0 0 0 0 0]

	// 声明并初始化
	arr2 := [5]int{1, 2, 3, 4, 5}
	fmt.Printf("完整初始化: %v\n", arr2)

	// 部分初始化，未指定的元素为类型零值
	arr3 := [5]int{1, 2, 3}
	fmt.Printf("部分初始化: %v\n", arr3) // [1 2 3 0 0]

	// 指定索引初始化
	arr4 := [5]int{1: 10, 3: 30}
	fmt.Printf("索引初始化: %v\n", arr4) // [0 10 0 30 0]

	// 自动计算长度
	arr5 := [...]int{1, 2, 3, 4, 5}
	fmt.Printf("自动长度: len=%d, %v\n", len(arr5), arr5)

	// 二维数组
	arr2D := [2][3]int{
		{1, 2, 3},
		{4, 5, 6},
	}
	fmt.Printf("二维数组: %v\n", arr2D)

	// 遍历数组
	for i := 0; i < len(arr2); i++ {
		fmt.Printf("arr2[%d] = %d\n", i, arr2[i])
	}

	// 使用 for-range 遍历
	for index, value := range arr2 {
		fmt.Printf("arr2[%d] = %d\n", index, value)
	}

	// 数组是值类型，赋值会复制整个数组
	arr6 := arr2        // 复制了一份
	arr6[0] = 100       // 修改副本
	fmt.Printf("原数组: %v, 副本: %v\n", arr2, arr6)

	// 多维数组
	arr3D := [2][2][2]int{
		{{1, 2}, {3, 4}},
		{{5, 6}, {7, 8}},
	}
	fmt.Printf("三维数组: %v\n", arr3D)
}