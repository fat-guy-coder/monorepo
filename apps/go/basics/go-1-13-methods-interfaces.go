package basics

import (
	"fmt"
	"math"
)

// RunInterfaces 演示 Go 中的接口。
func RunInterfaces() {
	// --- 接口定义 ---
	fmt.Println("\n--- 接口定义 ---")

	// 定义接口
	type Speaker interface {
		Speak() string
	}

	// 实现 Speaker 的类型
	type Dog struct{ Name string }
	type Cat struct{ Name string }

	func (d Dog) Speak() string {
		return d.Name + " 说: 汪汪!"
	}

	func (c Cat) Speak() string {
		return c.Name + " 说: 喵喵!"
	}

	// 隐式实现——无需声明 "implements"
	var s Speaker
	s = Dog{Name: "旺财"}
	fmt.Println(s.Speak())
	s = Cat{Name: "小花"}
	fmt.Println(s.Speak())

	// --- 空接口 ---
	fmt.Println("\n--- 空接口（interface{} / any）---")

	var anything interface{}
	anything = 42
	fmt.Printf("int: %d\n", anything.(int))

	anything = "Hello, 世界"
	fmt.Printf("string: %s\n", anything.(string))

	anything = []int{1, 2, 3}
	fmt.Printf("slice: %v\n", anything.([]int))

	// any 是 interface{} 的别名（Go 1.18+）
	var anyVal any = true
	fmt.Printf("any (bool): %t\n", anyVal.(bool))

	// --- 类型断言 ---
	fmt.Println("\n--- 类型断言（Type Assertion）---")

	var val interface{} = "hello"
	// 安全断言（comma ok 惯用法）
	if s, ok := val.(string); ok {
		fmt.Printf("安全断言成功: %q\n", s)
	} else {
		fmt.Println("断言失败")
	}

	if _, ok := val.(int); !ok {
		fmt.Println("string 不能断言为 int")
	}

	// 不安全断言（panic on failure）
	// s := val.(string) // 如果类型不匹配会 panic

	// --- 类型 switch ---
	fmt.Println("\n--- 类型 switch ---")

	describeType := func(i interface{}) {
		switch v := i.(type) {
		case nil:
			fmt.Println("是 nil")
		case int:
			fmt.Printf("int: %d, 两倍: %d\n", v, v*2)
		case string:
			fmt.Printf("string: %q, 长度: %d\n", v, len(v))
		case []int:
			fmt.Printf("[]int: %v, 总和: %d\n", v, sumSlice(v))
		case bool:
			fmt.Printf("bool: %t\n", v)
		default:
			fmt.Printf("其他类型: %T\n", v)
		}
	}

	describeType(42)
	describeType("Go语言")
	describeType([]int{1, 2, 3, 4})
	describeType(true)
	describeType(3.14)

	// --- 接口嵌入 ---
	fmt.Println("\n--- 接口嵌入 ---")

	type Reader interface {
		Read() string
	}
	type Writer interface {
		Write(data string)
	}
	type ReadWriter interface {
		Reader
		Writer
	}

	type Buffer struct {
		data string
	}
	func (b *Buffer) Read() string {
		return b.data
	}
	func (b *Buffer) Write(data string) {
		b.data = data
	}

	var rw ReadWriter = &Buffer{}
	rw.Write("Hello, 接口嵌入!")
	fmt.Printf("Read: %q\n", rw.Read())

	// --- 常见标准接口 ---
	fmt.Println("\n--- 常见标准接口 ---")

	// Stringer (fmt.Stringer)
	type Point struct{ X, Y int }

	func (p Point) String() string {
		return fmt.Sprintf("Point{X:%d, Y:%d}", p.X, p.Y)
	}

	p := Point{X: 10, Y: 20}
	fmt.Printf("Stringer: %s\n", p) // 自动调用 String()
	fmt.Printf("Stringer explicit: %s\n", p.String())

	// error 接口
	type MyError struct {
		Code    int
		Message string
	}
	func (e *MyError) Error() string {
		return fmt.Sprintf("错误 [%d]: %s", e.Code, e.Message)
	}

	err := &MyError{Code: 404, Message: "未找到"}
	fmt.Printf("error: %v\n", err)

	// io.Reader 说明
	fmt.Println("\nio.Reader 接口定义:")
	fmt.Println("  type Reader interface {")
	fmt.Println("      Read(p []byte) (n int, err error)")
	fmt.Println("  }")
	fmt.Println("实现了 Read 方法的类型就可以作为 Reader 使用。")

	// --- 实用示例：Shape 接口 ---
	fmt.Println("\n--- 实用示例：Shape 接口 ---")

	type Shape interface {
		Area() float64
		Perimeter() float64
	}

	type Circle struct{ Radius float64 }
	type Rect struct{ Width, Height float64 }

	func (c Circle) Area() float64 {
		return math.Pi * c.Radius * c.Radius
	}
	func (c Circle) Perimeter() float64 {
		return 2 * math.Pi * c.Radius
	}
	func (r Rect) Area() float64 {
		return r.Width * r.Height
	}
	func (r Rect) Perimeter() float64 {
		return 2 * (r.Width + r.Height)
	}

	shapes := []Shape{
		Circle{Radius: 5},
		Rect{Width: 4, Height: 6},
		Circle{Radius: 2.5},
	}

	for i, shape := range shapes {
		fmt.Printf("形状 %d: 面积=%.2f, 周长=%.2f\n",
			i+1, shape.Area(), shape.Perimeter())
	}

	// 接口变量底层包含 (type, value)
	fmt.Println("\n接口底层结构: (动态类型, 动态值)")
	fmt.Printf("  Shape 变量: 类型=%T, 值=%v\n", shapes[0], shapes[0])
}

func sumSlice(nums []int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}
