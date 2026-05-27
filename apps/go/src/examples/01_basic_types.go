package examples

import "fmt"

// RunBasicTypes 运行基础数据类型示例
func RunBasicTypes() {
	fmt.Println("\n=== 基础数据类型 ===")

	// 整型
	var a int = 10
	var b int8 = 127
	var c int16 = 32767
	var d int32 = 2147483647
	var e int64 = 9223372036854775807

	fmt.Printf("int: %d, int8: %d, int16: %d, int32: %d, int64: %d\n", a, b, c, d, e)

	// 无符号整型
	var ua uint = 100
	var ub uint8 = 255
	var uc uint16 = 65535

	fmt.Printf("uint: %d, uint8: %d, uint16: %d\n", ua, ub, uc)

	// 浮点型
	var f1 float32 = 3.14
	var f2 float64 = 3.141592653589793

	fmt.Printf("float32: %f, float64: %.15f\n", f1, f2)

	// 复数
	var c1 complex128 = 1 + 2i
	fmt.Printf("complex128: %v\n", c1)

	// 布尔型
	var isTrue bool = true
	var isFalse bool = false
	fmt.Printf("bool: isTrue=%t, isFalse=%t\n", isTrue, isFalse)

	// 字符串
	var s1 string = "Hello, Go!"
	var s2 string = "世界"
	fmt.Printf("string: %s, %s, 长度: %d\n", s1, s2, len(s2))

	// 字节和rune
	var b1 byte = 'A'
	var r1 rune = '中'
	fmt.Printf("byte: %c (%d), rune: %c (%d)\n", b1, b1, r1, r1)

	// 类型转换
	var num int = 42
	var flt float64 = float64(num)
	fmt.Printf("int to float64: %v -> %.2f\n", num, flt)
}