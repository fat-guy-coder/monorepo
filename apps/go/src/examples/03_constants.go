package examples

import "fmt"

// RunConstants 运行常量示例
func RunConstants() {
	fmt.Println("\n=== 常量 ===")

	// 普通常量
	const PI float64 = 3.141592653589793
	const NAME string = "Go Language"
	const IS_TRUE bool = true

	fmt.Printf("PI=%.5f, NAME=%s, IS_TRUE=%t\n", PI, NAME, IS_TRUE)

	// 类型推断常量
	const A = 100 // int
	const B = 3.14 // float64
	const C = "Hello"
	fmt.Printf("A=%d, B=%.2f, C=%s\n", A, B, C)

	// 枚举常量 - 使用 iota
	const (
		Sunday    = iota // 0
		Monday           // 1
		Tuesday          // 2
		Wednesday        // 3
		Thursday         // 4
		Friday           // 5
		Saturday         // 6
	)
	fmt.Printf("星期枚举: Sunday=%d, Friday=%d, Saturday=%d\n", Sunday, Friday, Saturday)

	// iota 在每个 const 块重置为 0
	const (
		Red    = iota // 0
		Green        // 1
		Blue         // 2
	)
	fmt.Printf("颜色枚举: Red=%d, Green=%d, Blue=%d\n", Red, Green, Blue)

	// 位掩码用法
	const (
		Read  = 1 << iota // 1
		Write             // 2
		Execute           // 4
	)
	fmt.Printf("权限位掩码: Read=%d, Write=%d, Execute=%d\n", Read, Write, Execute)

	// 常量计算
	const LENGTH = 10
	const WIDTH = 5
	const AREA = LENGTH * WIDTH
	fmt.Printf("矩形面积: %d * %d = %d\n", LENGTH, WIDTH, AREA)
}