package basics

import "fmt"

// RunVariables 演示 Go 中的变量、类型和常量。
func RunVariables() {
	// --- 变量声明 ---
	fmt.Println("\n--- 变量声明 ---")

	// var 声明
	var a int = 42
	var b string = "hello"
	var c bool = true

	fmt.Printf("var 声明: a=%d, b=%s, c=%t\n", a, b, c)

	// 多变量声明
	var d, e int = 10, 20
	fmt.Printf("多变量声明: d=%d, e=%d\n", d, e)

	// 声明块
	var (
		f float64 = 3.14
		g string  = "block"
	)
	fmt.Printf("声明块: f=%f, g=%s\n", f, g)

	// 简短声明 :=（仅函数内可用）
	h := "short declaration"
	i := 100
	j, k := "multi", false
	fmt.Printf("简短声明: h=%s, i=%d, j=%s, k=%t\n", h, i, j, k)

	// --- 基本类型 ---
	fmt.Println("\n--- 基本类型 ---")

	// 整数类型
	var i8 int8 = 127
	var i16 int16 = 32767
	var i32 int32 = 2147483647
	var i64 int64 = 9223372036854775807
	var ui8 uint8 = 255
	var ui16 uint16 = 65535
	var defaultInt int = -42

	fmt.Printf("int8=%d, int16=%d, int32=%d, int64=%d\n", i8, i16, i32, i64)
	fmt.Printf("uint8=%d, uint16=%d, int=%d\n", ui8, ui16, defaultInt)

	// 浮点类型
	var f32 float32 = 3.1415926535
	var f64 float64 = 3.141592653589793
	fmt.Printf("float32=%.7f, float64=%.15f\n", f32, f64)

	// 复数类型
	var c64 complex64 = complex(1.0, 2.0)
	var c128 complex128 = 3 + 4i
	fmt.Printf("complex64=%v, complex128=%v\n", c64, c128)

	// 字符串、字节和 rune
	var s string = "Go语言"
	var by byte = 'A'
	var rn rune = '语'
	fmt.Printf("string=%s, byte=%c(%d), rune=%c(%d)\n", s, by, by, rn, rn)

	// --- 零值 ---
	fmt.Println("\n--- 零值（Zero Values）---")

	var zInt int         // 0
	var zFloat float64   // 0.0
	var zBool bool       // false
	var zString string   // ""
	var zPtr *int        // nil
	var zSlice []int     // nil
	var zMap map[int]int // nil

	fmt.Printf("int 零值: %d\n", zInt)
	fmt.Printf("float64 零值: %f\n", zFloat)
	fmt.Printf("bool 零值: %t\n", zBool)
	fmt.Printf("string 零值: %q\n", zString)
	fmt.Printf("pointer 零值: %v\n", zPtr)
	fmt.Printf("slice 零值: %v (nil=%t)\n", zSlice, zSlice == nil)
	fmt.Printf("map 零值: %v (nil=%t)\n", zMap, zMap == nil)

	// --- 类型转换 ---
	fmt.Println("\n--- 类型转换（Type Conversion）---")

	x := 42
	y := float64(x)
	z := int(y)
	fmt.Printf("int->float64->int: %d -> %f -> %d\n", x, y, z)

	// 大类型转小类型（注意溢出）
	big := 300
	small := uint8(big) // 300 % 256 = 44
	fmt.Printf("int(%d) -> uint8(%d) 溢出演示\n", big, small)

	// string 与 rune/byte 转换
	runes := []rune("Go语言")
	bytes := []byte("Go")
	fmt.Printf("string->runes: %v (len=%d)\n", runes, len(runes))
	fmt.Printf("string->bytes: %v\n", bytes)

	// --- 常量 ---
	fmt.Println("\n--- 常量（Constants）---")

	// 有类型常量
	const typedInt int = 100
	const typedStr string = "typed"

	// 无类型常量（untyped，编译器自动推断/转换）
	const untypedInt = 200
	const untypedFloat = 3.14
	const untypedStr = "untyped"

	fmt.Printf("有类型: %d, %s\n", typedInt, typedStr)
	fmt.Printf("无类型: %d, %f, %s\n", untypedInt, untypedFloat, untypedStr)

	// 无类型常量可以参与不同精度的运算而无需显式转换
	var needFloat32 float32 = untypedFloat // 无类型常量自动适配
	fmt.Printf("无类型常量赋值给 float32: %f\n", needFloat32)

	// --- iota 枚举 ---
	fmt.Println("\n--- iota 枚举 ---")

	const (
		Monday    = iota + 1 // 1
		Tuesday              // 2
		Wednesday            // 3
		Thursday             // 4
		Friday               // 5
	)
	fmt.Printf("工作日: %d, %d, %d, %d, %d\n", Monday, Tuesday, Wednesday, Thursday, Friday)

	// 位掩码模式
	const (
		FlagRead  = 1 << iota // 1 << 0 = 1
		FlagWrite             // 1 << 1 = 2
		FlagExec              // 1 << 2 = 4
	)
	fmt.Printf("文件权限: Read=%d, Write=%d, Exec=%d\n", FlagRead, FlagWrite, FlagExec)

	// 跳过值
	const (
		_  = iota             // 跳过 0
		KB = 1 << (10 * iota) // 1 << 10 = 1024
		MB                    // 1 << 20
		GB                    // 1 << 30
	)
	fmt.Printf("存储单位: KB=%d, MB=%d, GB=%d\n", KB, MB, GB)

	var str string = "Hello, World!"
	name := "John"

	var i1 uint16
	i1 = 2556
	fmt.Println(str, name, i1)
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunVariables() }
