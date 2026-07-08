package basics

import "fmt"

// RunNewMake 演示 Go 中 new 和 make 的区别。
func RunNewMake() {
	fmt.Println("\n--- new(T)：分配零值，返回 *T ---")
	p1 := new(int)      // *int，指向 0
	p2 := new(string)   // *string，指向 ""
	p3 := new([3]int)   // *[3]int，指向 [0,0,0]
	fmt.Printf("new(int)=%d, new(string)=%q, new([3]int)=%v\n", *p1, *p2, *p3)

	fmt.Println("\n--- make(T, ...)：只用于 slice/map/chan，返回 T（非指针）---")
	s := make([]int, 3, 5)           // len=3, cap=5
	m := make(map[string]int)        // 可写的空 map
	ch := make(chan int, 10)         // 缓冲区 10
	fmt.Printf("slice: %v, len=%d, cap=%d\n", s, len(s), cap(s))
	fmt.Printf("map: %v, len=%d\n", m, len(m))
	fmt.Printf("chan: cap=%d\n", cap(ch))

	fmt.Println("\n--- new vs make 选择 ---")
	fmt.Println("new:  所有类型 → 返回零值指针")
	fmt.Println("make: 仅 slice/map/chan → 返回初始化后的 T（已分配底层结构）")

	// ❌ 常见错误
	// var m2 map[string]int    // nil map，不能写
	// m2["k"] = 1              // panic!
	// ✅ 正确
	m2 := make(map[string]int)
	m2["k"] = 1 // OK
	fmt.Printf("make 创建的 map 可写: %v\n", m2)

	// new 创建的 map 也是 nil，不 写
	// m3 := new(map[string]int)
	// (*m3)["k"] = 1           // panic: nil map！
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunNewMake() }
