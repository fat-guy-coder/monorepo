package basics

import "fmt"

// RunControlFlow 演示 Go 中的控制流结构。
// 每个示例下方以注释形式标注预期输出，无需运行即可查看结果。
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
	// 输出: x 在 30~50 之间

	// 语句+条件形式（statement; condition）
	// Go 允许在 if 条件中声明并初始化变量，该变量作用域仅限于 if 语句块
	if val := x * 2; val > 80 {
		fmt.Printf("x*2=%d > 80\n", val)
	} else {
		fmt.Printf("x*2=%d <= 80\n", val)
	}
	// 输出: x*2=84 > 80
	// val 在 if 块外不可见

	// --- for 循环 ---
	fmt.Println("\n--- for 循环 ---")

	// 传统形式（init; condition; post）
	fmt.Print("传统 for: ")
	for i := 0; i < 5; i++ {
		fmt.Printf("%d ", i)
	}
	fmt.Println()
	// 输出: 传统 for: 0 1 2 3 4

	// while 风格（只有 condition）
	fmt.Print("while 风格: ")
	count := 5
	for count > 0 {
		fmt.Printf("%d ", count)
		count--
	}
	fmt.Println()
	// 输出: while 风格: 5 4 3 2 1

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
	// 输出: 无限循环+break: 0 1 2

	// --- for range ---
	fmt.Println("\n--- for range ---")

	// range over 数组
	arr := [4]int{10, 20, 30, 40}
	fmt.Print("range 数组: ")
	for i, v := range arr {
		fmt.Printf("[%d]=%d ", i, v)
	}
	fmt.Println()
	// 输出: range 数组: [0]=10 [1]=20 [2]=30 [3]=40

	// range over 切片（只有 index）
	fmt.Print("range 切片(index only): ")
	for i := range arr[:3] {
		fmt.Printf("%d ", i)
	}
	fmt.Println()
	// 输出: range 切片(index only): 0 1 2

	// range over map
	m := map[string]int{"a": 1, "b": 2, "c": 3}
	fmt.Print("range map: ")
	for k, v := range m {
		fmt.Printf("%q:%d ", k, v)
	}
	fmt.Println()
	// 输出: range map: (顺序不固定，例如) "a":1 "b":2 "c":3

	// range over 字符串（rune by rune）
	s := "Go语言"
	fmt.Print("range string(runes): ")
	for i, r := range s {
		fmt.Printf("(%d:'%c') ", i, r)
	}
	fmt.Println()
	// 输出: range string(runes): (0:'G') (1:'o') (2:'语') (5:'言')
	// 注意 "语" 占3字节，索引从2直接跳到5 — rune 按 Unicode 码点遍历

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
	// 输出: 星期一，新的一周开始！

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
	// 输出: 良好

	// fallthrough 关键字 — 强制执行下一个 case（不判断条件）
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
	// 输出: fallthrough 演示: case 1 -> case 2 -> case 3

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
	printType(42)            // 输出: int: 42
	printType("hello")       // 输出: string: "hello"
	printType(true)          // 输出: bool: true
	printType([]int{1, 2, 3}) // 输出: []int: [1 2 3]
	printType(3.14)          // 输出: 未知类型: float64

	// --- defer ---
	fmt.Println("\n--- defer（延迟执行）---")

	// 基本 defer（函数返回前执行，LIFO 栈序）
	fmt.Println("开始")
	defer fmt.Println("defer: 最后执行")
	fmt.Println("结束")
	// 输出:
	//   开始
	//   结束
	//   defer: 最后执行

	// 参数立即求值（defer 注册时参数已冻结）
	val := 10
	defer fmt.Printf("defer 参数在声明时求值: val=%d\n", val)
	val = 20
	// 输出: defer 参数在声明时求值: val=10 （注意不是 20！）

	// 栈式 defer（LIFO: 后进先出）
	fmt.Println("\n栈式 defer:")
	for i := 0; i < 3; i++ {
		defer fmt.Printf("  defer %d\n", i)
	}
	fmt.Println("循环体结束")
	// 输出:
	//   循环体结束
	//     defer 2
	//     defer 1
	//     defer 0

	// 实用 defer：资源清理模拟
	defer fmt.Println("--- defer 资源清理示例结束 ---")
	fmt.Println("模拟打开文件...")
	defer fmt.Println("  关闭文件（defer）")
	fmt.Println("模拟写入数据...")
	defer fmt.Println("  刷新缓冲区（defer）")
	// 输出:
	//   模拟打开文件...
	//   模拟写入数据...
	//     刷新缓冲区（defer）
	//     关闭文件（defer）
	//   --- defer 资源清理示例结束 ---

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
	// 输出:   10 / 2 = 5
	safeDivide(10, 0)
	// 输出:   捕获到 panic: 除零错误！
	fmt.Println("程序继续执行（因为有 recover）")
	// 输出: 程序继续执行（因为有 recover）
}
