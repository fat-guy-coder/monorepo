package examples

import "fmt"

// RunStructs 运行结构体示例
func RunStructs() {
	fmt.Println("\n=== 结构体 (Struct) ===")

	// 定义结构体
	type Person struct {
		Name   string
		Age    int
		Gender string
	}

	// 声明结构体变量
	var p1 Person
	fmt.Printf("默认初始化: %+v\n", p1)

	// 命名初始化
	p2 := Person{Name: "Alice", Age: 25, Gender: "female"}
	fmt.Printf("命名初始化: %+v\n", p2)

	// 按字段顺序初始化
	p3 := Person{"Bob", 30, "male"}
	fmt.Printf("按顺序初始化: %+v\n", p3)

	// 部分初始化
	p4 := Person{Name: "Charlie", Age: 20}
	fmt.Printf("部分初始化: %+v\n", p4)

	// 访问和修改字段
	p5 := Person{Name: "David", Age: 35}
	fmt.Printf("修改前: %s, Age=%d\n", p5.Name, p5.Age)
	p5.Age = 36
	fmt.Printf("修改后: %s, Age=%d\n", p5.Name, p5.Age)

	// 结构体指针
	ptr := &p5
	fmt.Printf("结构体指针: %p, Name=%s\n", ptr, ptr.Name)
	// 也可以用 (*ptr).Name，但 ptr.Name 更简洁

	// 嵌套结构体
	type Address struct {
		City    string
		Country string
	}

	type Employee struct {
		Person
		Address
		Company string
	}

	emp := Employee{
		Person:  Person{Name: "Eve", Age: 28},
		Address: Address{City: "Beijing", Country: "China"},
		Company: "TechCorp",
	}
	fmt.Printf("嵌套结构体: %+v\n", emp)
	fmt.Printf("直接访问嵌套字段: %s 在 %s 工作\n", emp.Name, emp.Company)

	// 匿名字段 (嵌入)
	type Student struct {
		Person
		School string
	}

	stu := Student{
		Person: Person{Name: "Frank", Age: 20},
		School: "MIT",
	}
	fmt.Printf("匿名字段: %s, %s\n", stu.Name, stu.School)

	// 结构体是值类型
	original := Person{Name: "Grace", Age: 22}
	copy := original
	copy.Name = "Henry"
	fmt.Printf("原结构体: %s, 副本: %s\n", original.Name, copy.Name)

	// 结构体作为函数参数
	person := Person{Name: "Ivy", Age: 24}
	modifyPerson(person)
	fmt.Printf("值传递后: %+v (原结构体不变)\n", person)

	modifyPersonPointer(&person)
	fmt.Printf("指针传递后: %+v (结构体改变)\n", person)

	// 结构体标签 (tag)
	type TagExample struct {
		Name string `json:"name"`     // json tag
		Age  int    `json:"age"`
	}
	tag := TagExample{Name: "Jack", Age: 26}
	fmt.Printf("带 tag 的结构体: %+v\n", tag)
}

func modifyPerson(p Person) {
	p.Age = 100
}

func modifyPersonPointer(p *Person) {
	p.Age = 100
}