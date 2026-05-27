package examples

import "fmt"

// RunControlFlow 运行控制流示例
func RunControlFlow() {
	fmt.Println("\n=== 控制流 ===")

	// if 条件语句
	score := 85
	if score >= 90 {
		fmt.Println("优秀")
	} else if score >= 70 {
		fmt.Println("良好")
	} else if score >= 60 {
		fmt.Println("及格")
	} else {
		fmt.Println("不及格")
	}

	// if 初始化语句
	if age := 20; age >= 18 {
		fmt.Printf("年龄 %d 是成年人\n", age)
	}

	// switch 语句
	day := 3
	switch day {
	case 1:
		fmt.Println("星期一")
	case 2:
		fmt.Println("星期二")
	case 3:
		fmt.Println("星期三")
	case 4, 5: // 多个值
		fmt.Println("星期四或星期五")
	default:
		fmt.Println("周末")
	}

	// switch 不带变量
	num := 5
	switch {
	case num > 0:
		fmt.Println("正数")
		fallthrough // 继续执行下一个 case
	case num < 0:
		fmt.Println("负数") // 这行也会执行
	default:
		fmt.Println("零")
	}

	// for 循环 - 基本形式
	sum := 0
	for i := 1; i <= 5; i++ {
		sum += i
	}
	fmt.Printf("1+2+3+4+5 = %d\n", sum)

	// for 循环 - 省略初始和结束条件 (相当于 while)
	n := 1
	for n < 10 {
		n *= 2
	}
	fmt.Printf("while 循环: n = %d\n", n)

	// for 循环 - 无限循环
	// for {
	//     fmt.Println("无限循环")
	// }

	// for-range 遍历
	slice := []string{"apple", "banana", "orange"}
	for index, value := range slice {
		fmt.Printf("索引 %d: %s\n", index, value)
	}

	// for-range 遍历 map
	m := map[string]int{"a": 1, "b": 2, "c": 3}
	for key, value := range m {
		fmt.Printf("key=%s, value=%d\n", key, value)
	}

	// for-range 遍历字符串 (Unicode)
	str := "Hello世界"
	for i, r := range str {
		fmt.Printf("索引 %d: %c (Unicode: %d)\n", i, r, r)
	}

	// break 和 continue
	for i := 1; i <= 10; i++ {
		if i == 3 {
			continue // 跳过 3
		}
		if i == 8 {
			break // 跳出循环
		}
		fmt.Printf("%d ", i)
	}
	fmt.Println()

	// goto 跳转
	goto Label
	fmt.Println("这行不会执行")
Label:
	fmt.Println("跳转到这里")
}