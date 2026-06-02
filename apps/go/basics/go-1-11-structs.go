package basics

import (
	"encoding/json"
	"fmt"
)

// RunStructsMethods 演示 Go 中的结构体和方法。
func RunStructsMethods() {
	// --- 结构体定义与初始化 ---
	fmt.Println("\n--- 结构体定义与初始化 ---")

	type Person struct {
		Name string
		Age  int
		City string
	}

	// 命名字段初始化（推荐）
	p1 := Person{
		Name: "张三",
		Age:  28,
		City: "北京",
	}
	fmt.Printf("p1: %+v\n", p1)

	// 位置初始化（不推荐，易出错）
	p2 := Person{"李四", 32, "上海"}
	fmt.Printf("p2: %+v\n", p2)

	// 部分字段初始化（其余为零值）
	p3 := Person{Name: "王五"}
	fmt.Printf("p3(部分初始化): %+v\n", p3)

	// new 关键字（返回指针）
	p4 := new(Person)
	p4.Name = "foo"
	fmt.Printf("p4(new): %+v\n", p4)

	// 取地址初始化（常用模式）
	p5 := &Person{Name: "bar", Age: 50}
	fmt.Printf("p5(&Person): %+v\n", p5)

	// --- 匿名结构体 ---
	fmt.Println("\n--- 匿名结构体 ---")

	anon := struct {
		X, Y int
		Label string
	}{
		X: 10, Y: 20,
		Label: "坐标点",
	}
	fmt.Printf("匿名结构体: %+v\n", anon)

	// 临时结构（常见于表格驱动测试）
	config := struct {
		Host string
		Port int
	}{
		Host: "localhost",
		Port: 8080,
	}
	fmt.Printf("配置: %s:%d\n", config.Host, config.Port)

	// --- 嵌入式结构体（组合优于继承） ---
	fmt.Println("\n--- 嵌入式结构体（Composition） ---")

	type Address struct {
		Street string
		City   string
		Zip    string
	}

	type Employee struct {
		Name    string
		Address        // 嵌入（匿名字段）
		Company string
	}

	emp := Employee{
		Name:    "员工A",
		Company: "科技公司",
		Address: Address{
			Street: "科技园路1号",
			City:   "深圳",
			Zip:    "518000",
		},
	}
	// 可以直接访问被嵌入类型的方法和字段（提升）
	fmt.Printf("员工: %s, 地址: %s, %s, %s, 公司: %s\n",
		emp.Name, emp.Street, emp.City, emp.Zip, emp.Company)
	fmt.Printf("全路径访问: %s, %s\n", emp.Address.Street, emp.Address.City)
	// 注意：json 序列化时嵌入字段会平铺，也可用全路径

	// --- 方法：值接收者 ---
	fmt.Println("\n--- 方法：值接收者 ---")

	type Rectangle struct {
		Width, Height float64
	}

	// 值接收者方法
	rect := Rectangle{Width: 10, Height: 5}
	fmt.Printf("矩形: %+v, 面积: %.1f\n", rect, rect.Area())

	// 值接收者不会修改原始值
	rect.Scale(2)
	fmt.Printf("值接收者 Scale(2) 后: %+v (未改变！)\n", rect)

	// --- 方法：指针接收者 ---
	fmt.Println("\n--- 方法：指针接收者 ---")

	rectPtr := &Rectangle{Width: 10, Height: 5}
	rectPtr.ScalePtr(2)
	fmt.Printf("指针接收者 ScalePtr(2) 后: %+v (已改变)\n", rectPtr)

	// Go 自动处理指针/值转换，可以直接在值上调用指针方法
	rect2 := Rectangle{Width: 5, Height: 3}
	rect2.ScalePtr(3) // Go 自动取地址
	fmt.Printf("值调用指针方法 ScalePtr(3): %+v\n", rect2)

	// --- 接收者选择指南 ---
	fmt.Println("\n--- 值 vs 指针接收者 ---")
	fmt.Println("使用指针接收者的情况：")
	fmt.Println("  1. 方法需要修改接收者")
	fmt.Println("  2. 接收者是大型结构体（避免复制开销）")
	fmt.Println("  3. 保持一致性（如果一个方法用指针，其他也用指针）")
	fmt.Println("使用值接收者的情况：")
	fmt.Println("  1. 方法不需要修改接收者")
	fmt.Println("  2. 接收者是小类型且不可变")
	fmt.Println("  3. 接收者是 map/func/chan 等引用类型")

	// --- 结构体标签 ---
	fmt.Println("\n--- 结构体标签（Struct Tags）---")

	type User struct {
		ID       int    `json:"id"`
		Name     string `json:"name"`
		Password string `json:"-"` // 忽略此字段
	}

	user := User{ID: 1, Name: "testuser", Password: "secret123"}
	data, _ := json.MarshalIndent(user, "", "  ")
	fmt.Printf("JSON 序列化:\n%s\n", string(data))

	// 反序列化
	jsonStr := `{"id": 2, "name": "新用户"}`
	var newUser User
	json.Unmarshal([]byte(jsonStr), &newUser)
	fmt.Printf("JSON 反序列化: %+v\n", newUser)

	// --- 空结构体 ---
	fmt.Println("\n--- 空结构体（struct{}）---")

	// 空结构体占用 0 字节，常用于信号传递
	done := make(chan struct{})
	go func() {
		fmt.Println("  协程工作中...")
		done <- struct{}{} // 发送信号
	}()
	<-done // 等待信号
	fmt.Println("  收到完成信号！")

	// 用作集合（set）
	set := make(map[string]struct{})
	set["Go"] = struct{}{}
	set["Rust"] = struct{}{}
	set["Python"] = struct{}{}
	fmt.Printf("  set: ")
	for k := range set {
		fmt.Printf("%s ", k)
	}
	fmt.Println()
	fmt.Printf("  \"Go\" in set: %t\n", contains(set, "Go"))
	fmt.Printf("  \"Java\" in set: %t\n", contains(set, "Java"))
}

// --- 值接收者方法 ---

// Area 值接收者：计算矩形面积
func (r Rectangle) Area() float64 {
	return r.Width * r.Height
}

// Scale 值接收者：不会修改原始值
func (r Rectangle) Scale(factor float64) {
	r.Width *= factor
	r.Height *= factor
}

// --- 指针接收者方法 ---

// ScalePtr 指针接收者：会修改原始值
func (r *Rectangle) ScalePtr(factor float64) {
	r.Width *= factor
	r.Height *= factor
}

// --- 辅助函数 ---

func contains(set map[string]struct{}, key string) bool {
	_, ok := set[key]
	return ok
}
