package examples

import "fmt"

// RunMethods 运行方法示例
func RunMethods() {
	fmt.Println("\n=== 方法 (Method) ===")

	// Go 没有类，但可以为类型定义方法

	// 定义结构体
	type Circle struct {
		Radius float64
	}

	// 为 Circle 定义方法 (值接收者)
	func (c Circle) Area() float64 {
		return 3.14159 * c.Radius * c.Radius
	}

	// 为 Circle 定义方法 (指针接收者)
	func (c *Circle) SetRadius(r float64) {
		c.Radius = r
	}

	// 使用方法
	c := Circle{Radius: 5}
	fmt.Printf("圆的半径: %.2f\n", c.Radius)
	fmt.Printf("圆的面积: %.2f\n", c.Area())

	c.SetRadius(10)
	fmt.Printf("修改后的半径: %.2f\n", c.Radius)
	fmt.Printf("修改后的面积: %.2f\n", c.Area())

	// 值接收者 vs 指针接收者
	type Counter struct {
		Count int
	}

	// 值接收者: 复制对象
	func (c Counter) AddVal(n int) {
		c.Count += n
	}

	// 指针接收者: 共享对象
	func (c *Counter) AddPtr(n int) {
		c.Count += n
	}

	counter := Counter{Count: 0}

	counter.AddVal(5)
	fmt.Printf("值接收者方法后: Count = %d\n", counter.Count) // 仍然是 0

	counter.AddPtr(5)
	fmt.Printf("指针接收者方法后: Count = %d\n", counter.Count) // 变成 5

	// 内置类型也可以定义方法
	type Int int

	func (i Int) IsZero() bool {
		return i == 0
	}

	var num Int = 10
	fmt.Printf("num.IsZero() = %t\n", num.IsZero())

	// 方法与接口
	type Shape interface {
		Area() float64
		Perimeter() float64
	}

	type Rectangle struct {
		Width, Height float64
	}

	func (r Rectangle) Area() float64 {
		return r.Width * r.Height
	}

	func (r Rectangle) Perimeter() float64 {
		return 2 * (r.Width + r.Height)
	}

	var shape Shape = Rectangle{Width: 3, Height: 4}
	fmt.Printf("矩形面积: %.2f, 周长: %.2f\n", shape.Area(), shape.Perimeter())
}