package basics

import (
	"fmt"
	"math"
)

// --- 方法演示用的类型 ---
type Point struct{ X, Y float64 }

// 值接收者: 不能修改原始值
// 输出: 3.00
func (p Point) Distance() float64 { return math.Sqrt(p.X*p.X + p.Y*p.Y) }

// 值接收者: 返回新 Point，原值不变
// 输出: {X:6 Y:8}
func (p Point) Scale(factor float64) Point { return Point{p.X * factor, p.Y * factor} }

// 指针接收者: 直接修改原值（无返回值）
func (p *Point) ScaleInPlace(factor float64) { p.X *= factor; p.Y *= factor }

// --- 接口演示用的类型 ---
type Speaker interface{ Speak() string }
type Dog struct{ Name string }
type Cat struct{ Name string }

// 输出: "Rex says woof!"
func (d Dog) Speak() string { return d.Name + " says woof!" }

// 输出: "Luna says meow!"
func (c Cat) Speak() string { return c.Name + " says meow!" }

// --- 接口嵌入演示 ---
type Reader interface{ Read() string }
type Writer interface{ Write(data string) }
type ReadWriter interface {
	Reader
	Writer
}
type Buffer struct{ data string }

func (b *Buffer) Read() string  { return b.data }
func (b *Buffer) Write(s string) { b.data = s }

// --- fmt.Stringer 演示 ---
type User struct {
	Name string
	Age  int
}

// String 实现 fmt.Stringer 接口，fmt.Println 会自动调用
// 输出: Alice(30)
func (u User) String() string { return fmt.Sprintf("%s(%d)", u.Name, u.Age) }

// RunMethodsInterfaces 演示 Go 的方法（值/指针接收者）与接口。
func RunMethodsInterfaces() {
	// ═══════════════════════════════════════════
	// 值接收者 vs 指针接收者
	// ═══════════════════════════════════════════

	fmt.Println("\n--- 方法：值接收者 ---")
	p := Point{3, 4}
	// Point{X:3, Y:4}, Distance=√(3²+4²)=5.00
	fmt.Printf("Point(%.0f,%.0f) Distance=%.2f\n", p.X, p.Y, p.Distance())
	// 输出: "Point(3,4) Distance=5.00"

	// Scale 值接收者 → 返回新对象, p 不变
	fmt.Printf("Scale(2)=%+v, 原值不变=%+v\n", p.Scale(2), p)
	// 输出: "Scale(2)={X:6 Y:8}, 原值不变={X:3 Y:4}"

	fmt.Println("\n--- 方法：指针接收者 ---")
	p2 := Point{3, 4}
	p2.ScaleInPlace(2) // 指针接收者直接修改 p2
	fmt.Printf("ScaleInPlace(2)=%+v (原值被修改)\n", p2)
	// 输出: "ScaleInPlace(2)={X:6 Y:8} (原值被修改)"

	fmt.Println("\n--- 值 vs 指针接收者 ---")
	fmt.Println("值接收者:  不修改接收者 | 小 struct | 并发安全")
	fmt.Println("指针接收者: 修改接收者 | 大 struct | 包含 mutex")
	// 输出:
	// 值接收者:  不修改接收者 | 小 struct | 并发安全
	// 指针接收者: 修改接收者 | 大 struct | 包含 mutex

	// ═══════════════════════════════════════════
	// 接口：隐式实现（Go 不需要 implements 关键字！）
	// ═══════════════════════════════════════════

	fmt.Println("\n--- 接口：隐式实现 ---")
	var s Speaker
	s = Dog{Name: "Rex"}
	fmt.Println(s.Speak())
	// 输出: "Rex says woof!"

	s = Cat{Name: "Luna"}
	fmt.Println(s.Speak())
	// 输出: "Luna says meow!"

	// ═══════════════════════════════════════════
	// 接口嵌入：组合多个接口
	// ═══════════════════════════════════════════

	fmt.Println("\n--- 接口嵌入 ---")
	var rw ReadWriter = &Buffer{}
	rw.Write("hello from embedded interface")
	fmt.Printf("Read: %q\n", rw.Read())
	// 输出: Read: "hello from embedded interface"

	// ═══════════════════════════════════════════
	// 空接口 + 类型断言 (switch v := i.(type))
	// ═══════════════════════════════════════════

	fmt.Println("\n--- 空接口 & 类型断言 ---")
	describe := func(i interface{}) {
		switch v := i.(type) {
		case int:
			fmt.Printf("int: %d (double: %d)\n", v, v*2)
		case string:
			fmt.Printf("string: %q (len: %d)\n", v, len(v))
		case bool:
			fmt.Printf("bool: %t\n", v)
		default:
			fmt.Printf("unknown: %T = %v\n", v, v)
		}
	}
	describe(100)
	// 输出: "int: 100 (double: 200)"
	describe("go")
	// 输出: "string: \"go\" (len: 2)"
	describe(true)
	// 输出: "bool: true"
	describe(3.14)
	// 输出: "unknown: float64 = 3.14" (float64 没有 case, 命中 default)

	// ═══════════════════════════════════════════
	// error 接口
	// ═══════════════════════════════════════════

	fmt.Println("\n--- error 接口 ---")
	fmt.Println("type error interface { Error() string }")
	// 输出: "type error interface { Error() string }"

	// ═══════════════════════════════════════════
	// fmt.Stringer 接口（自定义打印格式）
	// ═══════════════════════════════════════════

	fmt.Println("\n--- fmt.Stringer ---")
	fmt.Println(User{"Alice", 30})
	// 输出: "Alice(30)" ← User 的 String() 方法被 fmt 自动调用
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunMethodsInterfaces() }
