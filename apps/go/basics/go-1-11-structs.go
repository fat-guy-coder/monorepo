package basics

import (
	"encoding/json"
	"fmt"
)

// RunStructs 演示 Go 中的结构体（定义、嵌入、标签、空结构体）。
func RunStructs() {
	fmt.Println("\n--- 结构体定义与初始化 ---")
	type Person struct {
		Name string
		Age  int
		City string
	}
	p1 := Person{Name: "张三", Age: 28, City: "北京"}
	fmt.Printf("命名字段: %+v\n", p1)
	p2 := Person{"李四", 32, "上海"}
	fmt.Printf("位置初始化: %+v\n", p2)
	p3 := Person{Name: "王五"}
	fmt.Printf("部分初始化: %+v\n", p3)
	p4 := &Person{Name: "foo", Age: 50}
	fmt.Printf("取地址初始化: %+v\n", p4)

	fmt.Println("\n--- 匿名结构体 ---")
	anon := struct{ X, Y int; Label string }{10, 20, "坐标点"}
	fmt.Printf("匿名: %+v\n", anon)

	fmt.Println("\n--- 嵌入式结构体（组合） ---")
	type Address struct{ Street, City, Zip string }
	type Employee struct {
		Name    string
		Address          // 嵌入（匿名字段）
		Company string
	}
	emp := Employee{Name: "员工A", Company: "科技公司", Address: Address{"科技园路1号", "深圳", "518000"}}
	fmt.Printf("员工: %s, %s %s, %s\n", emp.Name, emp.Street, emp.City, emp.Company)

	fmt.Println("\n--- 结构体标签 ---")
	type User struct {
		ID       int    `json:"id"`
		Name     string `json:"name"`
		Password string `json:"-"`
	}
	user := User{ID: 1, Name: "testuser", Password: "secret"}
	data, _ := json.MarshalIndent(user, "", "  ")
	fmt.Printf("JSON:\n%s\n", data)

	fmt.Println("\n--- 空结构体 struct{}（0 字节）---")
	done := make(chan struct{})
	go func() { fmt.Println("  协程工作..."); done <- struct{}{} }()
	<-done
	fmt.Println("  收到信号")

	set := map[string]struct{}{"Go": {}, "Rust": {}}
	fmt.Printf("  Set: ")
	for k := range set { fmt.Printf("%s ", k) }
	fmt.Println()
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunStructs() }
