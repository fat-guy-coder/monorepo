package basics

import "fmt"

// RunControlFlow 演示 Go 中的控制流结构。
func RunControlFlow() {
	// --- if / else if / else ---
	fmt.Println("\n--- if / else if / else ---")

	x := 42
	if x > 50 {
		fmt.Println("x > 50")
	} else if x > 30 {
		fmt.Println("x 在 30~50 之间")
	} else {
		fmt.Println("x <= 30")
	}

	// 语句+条件形式（statement; condition）
	if val := x * 2; val > 80 {
		fmt.Printf("x*2=%d > 80\n", val)
	} else {
		fmt.Printf("x*2=%d <= 80\n", val)
	}
	// val 在 if 块外不可见

	// --- for 循环 ---
	fmt.Println("\n--- for 循环 ---")

	// 传统形式（init; condition; post）
	fmt.Print("传统 for: ")
	for i := 0; i < 5; i++ {
		fmt.Printf("%d ", i)
	}
	fmt.Println()

	// while 风格（只有 condition）
	fmt.Print("while 风格: ")
	count := 5
	for count > 0 {
		fmt.Printf("%d ", count)
		count--
	}
	fmt.Println()

	// 无限循环（break 退出）
	fmt.Print("无限循环+break: ")
	iter := 0
	for {
		if iter >= 3 {
			break
		}
		fmt.Printf("%d ", iter)
		iter++
	}
	fmt.Println()

	// --- for range ---
	fmt.Println("\n--- for range ---")

	// range over 数组
	arr := [4]int{10, 20, 30, 40}
	fmt.Print("range 数组: ")
	for i, v := range arr {
		fmt.Printf("[%d]=%d ", i, v)
	}
	fmt.Println()

	// range over 切片（只有 index）
	fmt.Print("range 切片(index only): ")
	for i := range arr[:3] {
		fmt.Printf("%d ", i)
	}
	fmt.Println()

	// range over map
	m := map[string]int{"a": 1, "b": 2, "c": 3}
	fmt.Print("range map: ")
	for k, v := range m {
		fmt.Printf("%q:%d ", k, v)
	}
	fmt.Println()

	// range over 字符串（rune by rune）
	s := "Go语言"
	fmt.Print("range string(runes): ")
	for i, r := range s {
		fmt.Printf("(%d:'%c') ", i, r)
	}
	fmt.Println()

	// --- switch ---
	fmt.Println("\n--- switch ---")

	// 带表达式
	day := "Mon"
	switch day {
	case "Mon":
		fmt.Println("星期一，新的一周开始！")
	case "Fri":
		fmt.Println("星期五，即将周末！")
	case "Sat", "Sun":
		fmt.Println("周末休息日")
	default:
		fmt.Println("工作日")
	}

	// 无表达式（相当于 if-else）
	score := 85
	switch {
	case score >= 90:
		fmt.Println("优秀")
	case score >= 80:
		fmt.Println("良好")
	case score >= 60:
		fmt.Println("及格")
	default:
		fmt.Println("不及格")
	}

	// fallthrough 关键字
	fmt.Print("fallthrough 演示: ")
	n := 1
	switch n {
	case 1:
		fmt.Print("case 1 -> ")
		fallthrough
	case 2:
		fmt.Print("case 2 -> ")
		fallthrough
	case 3:
		fmt.Println("case 3")
	}

	// --- 类型 switch ---
	fmt.Println("\n--- 类型 switch（Type Switch）---")

	printType := func(v interface{}) {
		switch t := v.(type) {
		case int:
			fmt.Printf("int: %d\n", t)
		case string:
			fmt.Printf("string: %q\n", t)
		case bool:
			fmt.Printf("bool: %t\n", t)
		case []int:
			fmt.Printf("[]int: %v\n", t)
		default:
			fmt.Printf("未知类型: %T\n", t)
		}
	}
	printType(42)
	printType("hello")
	printType(true)
	printType([]int{1, 2, 3})
	printType(3.14)

	// --- defer ---
	fmt.Println("\n--- defer（延迟执行）---")

	// 基本 defer
	fmt.Println("开始")
	defer fmt.Println("defer: 最后执行")
	fmt.Println("结束")

	// 参数立即求值
	val := 10
	defer fmt.Printf("defer 参数在声明时求值: val=%d\n", val)
	val = 20

	// 栈式 defer（LIFO）
	fmt.Println("\n栈式 defer:")
	for i := 0; i < 3; i++ {
		defer fmt.Printf("  defer %d\n", i)
	}
	fmt.Println("循环体结束")

	// 实用 defer：资源清理模拟
	defer fmt.Println("--- defer 资源清理示例结束 ---")
	fmt.Println("模拟打开文件...")
	defer fmt.Println("  关闭文件（defer）")
	fmt.Println("模拟写入数据...")
	defer fmt.Println("  刷新缓冲区（defer）")

	// --- panic 和 recover ---
	fmt.Println("\n--- panic 和 recover ---")

	safeDivide := func(a, b int) {
		defer func() {
			if r := recover(); r != nil {
				fmt.Printf("  捕获到 panic: %v\n", r)
			}
		}()
		if b == 0 {
			panic("除零错误！")
		}
		fmt.Printf("  %d / %d = %d\n", a, b, a/b)
	}

	safeDivide(10, 2)
	safeDivide(10, 0)
	fmt.Println("程序继续执行（因为有 recover）")
}
