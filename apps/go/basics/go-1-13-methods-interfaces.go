package basics

import (
	"fmt"
	"math"
)

// --- 方法演示用的类型 ---
type Point struct{ X, Y float64 }

func (p Point) Distance() float64      { return math.Sqrt(p.X*p.X + p.Y*p.Y) }
func (p Point) Scale(factor float64) Point { return Point{p.X * factor, p.Y * factor} }
func (p *Point) ScaleInPlace(factor float64) { p.X *= factor; p.Y *= factor }

// --- 接口演示用的类型 ---
type Speaker interface{ Speak() string }
type Dog struct{ Name string }
type Cat struct{ Name string }
func (d Dog) Speak() string { return d.Name + " says woof!" }
func (c Cat) Speak() string { return c.Name + " says meow!" }

type Reader interface{ Read() string }
type Writer interface{ Write(data string) }
type ReadWriter interface {
	Reader
	Writer
}
type Buffer struct{ data string }
func (b *Buffer) Read() string  { return b.data }
func (b *Buffer) Write(s string) { b.data = s }

type User struct{ Name string; Age int }
func (u User) String() string { return fmt.Sprintf("%s(%d)", u.Name, u.Age) }

// RunMethodsInterfaces 演示 Go 的方法（值/指针接收者）与接口。
func RunMethodsInterfaces() {
	fmt.Println("\n--- 方法：值接收者 ---")
	p := Point{3, 4}
	fmt.Printf("Point(%.0f,%.0f) Distance=%.2f\n", p.X, p.Y, p.Distance())
	fmt.Printf("Scale(2)=%+v, 原值不变=%+v\n", p.Scale(2), p)

	fmt.Println("\n--- 方法：指针接收者 ---")
	p2 := Point{3, 4}
	p2.ScaleInPlace(2)
	fmt.Printf("ScaleInPlace(2)=%+v (原值被修改)\n", p2)

	fmt.Println("\n--- 值 vs 指针接收者 ---")
	fmt.Println("值接收者:  不修改接收者 | 小 struct | 并发安全")
	fmt.Println("指针接收者: 修改接收者 | 大 struct | 包含 mutex")

	fmt.Println("\n--- 接口：隐式实现 ---")
	var s Speaker
	s = Dog{Name: "Rex"}
	fmt.Println(s.Speak())
	s = Cat{Name: "Luna"}
	fmt.Println(s.Speak())

	fmt.Println("\n--- 接口嵌入 ---")
	var rw ReadWriter = &Buffer{}
	rw.Write("hello from embedded interface")
	fmt.Printf("Read: %q\n", rw.Read())

	fmt.Println("\n--- 空接口 & 类型断言 ---")
	describe := func(i interface{}) {
		switch v := i.(type) {
		case int:    fmt.Printf("int: %d (double: %d)\n", v, v*2)
		case string: fmt.Printf("string: %q (len: %d)\n", v, len(v))
		case bool:   fmt.Printf("bool: %t\n", v)
		default:     fmt.Printf("unknown: %T = %v\n", v, v)
		}
	}
	describe(100)
	describe("go")
	describe(true)
	describe(3.14)

	fmt.Println("\n--- error 接口 ---")
	fmt.Println("type error interface { Error() string }")

	fmt.Println("\n--- fmt.Stringer ---")
	fmt.Println(User{"Alice", 30})
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunMethodsInterfaces() }
