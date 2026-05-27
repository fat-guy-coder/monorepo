package examples

import "fmt"

// RunInterfaces 运行接口示例
func RunInterfaces() {
	fmt.Println("\n=== 接口 (Interface) ===")

	// 定义接口
	type Speaker interface {
		Speak() string
	}

	// 实现接口的类型
	type Dog struct{}
	type Cat struct{}
	type Human struct {
		Name string
	}

	// Dog 实现 Speaker 接口
	func (d Dog) Speak() string {
		return "汪汪!"
	}

	// Cat 实现 Speaker 接口
	func (c Cat) Speak() string {
		return "喵喵~"
	}

	// Human 实现 Speaker 接口
	func (h Human) Speak() string {
		return "你好, 我是 " + h.Name
	}

	// 使用接口
	var s Speaker
	s = Dog{}
	fmt.Printf("Dog: %s\n", s.Speak())

	s = Cat{}
	fmt.Printf("Cat: %s\n", s.Speak())

	s = Human{Name: "张三"}
	fmt.Printf("Human: %s\n", s.Speak())

	// 接口切片
	speakers := []Speaker{Dog{}, Cat{}, Human{Name: "李四"}}
	fmt.Println("接口切片:")
	for _, sp := range speakers {
		fmt.Printf("  %s\n", sp.Speak())
	}

	// 空接口 (可以存储任何值)
	var empty interface{}
	empty = 42
	fmt.Printf("空接口存 int: %v\n", empty)
	empty = "hello"
	fmt.Printf("空接口存 string: %v\n", empty)

	// 空接口 map
	data := make(map[string]interface{})
	data["name"] = "Go"
	data["version"] = 1.21
	data["isAwesome"] = true
	fmt.Printf("空接口 map: %+v\n", data)

	// 类型断言
	var i interface{} = "hello"
	str, ok := i.(string)
	fmt.Printf("类型断言成功: %s, ok=%t\n", str, ok)

	// 类型断言失败
	var j interface{} = 123
	str2, ok := j.(string)
	fmt.Printf("类型断言失败: str2=%v, ok=%t\n", str2, ok)

	// switch 类型断言
	typeSwitch("hello")
	typeSwitch(123)
	typeSwitch(true)
}

func typeSwitch(v interface{}) {
	switch val := v.(type) {
	case string:
		fmt.Printf("string: %s\n", val)
	case int:
		fmt.Printf("int: %d\n", val)
	case bool:
		fmt.Printf("bool: %t\n", val)
	default:
		fmt.Printf("unknown type: %T\n", val)
	}
}