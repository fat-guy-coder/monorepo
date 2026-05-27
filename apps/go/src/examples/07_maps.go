package examples

import "fmt"

// RunMaps 运行 Map 示例
func RunMaps() {
	fmt.Println("\n=== Map (映射) ===")

	// 创建 Map - 使用 make
	map1 := make(map[string]int)
	fmt.Printf("make(map[string]int): %v\n", map1)

	// 创建带容量的 Map
	map2 := make(map[string]int, 10)
	fmt.Printf("make(map[string]int, 10): len=%d\n", len(map2))

	// Map 字面量
	map3 := map[string]int{
		"apple":  1,
		"banana": 2,
		"orange": 3,
	}
	fmt.Printf("Map 字面量: %v\n", map3)

	// 访问 Map 元素
	fmt.Printf("map3[\"apple\"] = %d\n", map3["apple"])
	fmt.Printf("map3[\"grape\"] = %d (不存在的键)\n", map3["grape"])

	// 检查键是否存在
	value, exists := map3["apple"]
	fmt.Printf("map3[\"apple\"]: value=%d, exists=%t\n", value, exists)

	_, exists = map3["grape"]
	fmt.Printf("map3[\"grape\"]: exists=%t\n", exists)

	// 设置 Map 元素
	map3["grape"] = 4
	fmt.Printf("设置 grape=4 后: %v\n", map3)

	// 删除 Map 元素
	delete(map3, "banana")
	fmt.Printf("delete banana 后: %v\n", map3)

	// 遍历 Map
	map4 := map[string]int{"a": 1, "b": 2, "c": 3}
	fmt.Println("遍历 Map:")
	for key, value := range map4 {
		fmt.Printf("  %s -> %d\n", key, value)
	}

	// 只遍历键
	fmt.Print("所有键: ")
	for key := range map4 {
		fmt.Printf("%s ", key)
	}
	fmt.Println()

	// 只遍历值
	fmt.Print("所有值: ")
	for _, value := range map4 {
		fmt.Printf("%d ", value)
	}
	fmt.Println()

	// Map 是引用类型
	map5 := map[string]int{"x": 1}
	map6 := map5
	map6["x"] = 100
	fmt.Printf("map5[\"x\"] = %d, map6[\"x\"] = %d\n", map5["x"], map6["x"])

	// nil Map
	var nilMap map[string]int
	fmt.Printf("nil Map: %v, len=%d\n", nilMap, len(nilMap))
	// nil Map 不能写入，会 panic
	// nilMap["key"] = 1 // 错误!

	// 空 Map
	emptyMap := map[string]int{}
	fmt.Printf("空 Map: %v, len=%d\n", emptyMap, len(emptyMap))

	// Map 作为函数参数
	map7 := map[string]int{"original": 1}
	modifyMap(map7)
	fmt.Printf("修改后 map7: %v\n", map7)
}

func modifyMap(m map[string]int) {
	m["modified"] = 999
}