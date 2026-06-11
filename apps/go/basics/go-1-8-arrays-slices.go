package basics

import "fmt"

// RunArraysSlices 演示 Go 中的数组和切片。
func RunArraysSlices() {
	// ============================================================
	// 1. 数组（Array）—— 固定长度，值类型
	// ============================================================
	fmt.Println("\n=== 1. 数组（Array）===")

	// --- 声明数组：var 变量名 [长度]类型 ---
	// 未初始化的数组，所有元素为零值
	var arr1 [3]int               // [0, 0, 0] — int 的零值是 0
	arr1[0], arr1[1], arr1[2] = 10, 20, 30 // 逐个赋值
	fmt.Printf("声明: %v, len=%d\n", arr1, len(arr1))
	// 输出: 声明: [10 20 30], len=3

	// --- 字面量初始化 ---
	// 长度是类型的一部分：[4]string 和 [3]string 是不同的类型！
	arr2 := [4]string{"Go", "Rust", "Python", "Java"}
	fmt.Printf("字面量: %v\n", arr2)
	// 输出: 字面量: [Go Rust Python Java]

	// --- 自动推导长度（...） ---
	// 编译器根据初始化列表自动确定数组长度
	arr3 := [...]float64{1.1, 2.2, 3.3} // 等价于 [3]float64
	fmt.Printf("自动推导: %v, len=%d\n", arr3, len(arr3))
	// 输出: 自动推导: [1.1 2.2 3.3], len=3

	// --- 稀疏初始化：按索引赋值 ---
	// 未指定的索引保持零值
	arr4 := [5]int{0: 100, 4: 500} // 索引 0=100, 4=500, 其余为 0
	fmt.Printf("稀疏初始化: %v\n", arr4)
	// 输出: 稀疏初始化: [100 0 0 0 500]

	// --- 数组是值类型（关键区别！） ---
	// 赋值操作会复制整个数组，不是引用！
	// 这意味着修改 copy 不会影响 original
	original := [3]int{1, 2, 3}
	copied := original   // 整个数组被拷贝（内存中两份独立数据）
	copied[0] = 999      // 只修改 copied
	fmt.Printf("值类型: original=%v, copied=%v\n", original, copied)
	// 输出: 值类型: original=[1 2 3], copied=[999 2 3]
	// 注意：original 未被修改！这就是"值类型"的含义

	// ============================================================
	// 2. 切片（Slice）—— 动态长度，引用底层数组
	// ============================================================
	fmt.Println("\n=== 2. 切片（Slice）===")
	// 切片本质是一个结构体：{指针 ptr, 长度 len, 容量 cap}
	// 不存储数据，只是底层数组的一个"视图"

	// --- 方式1：字面量创建 ---
	// []T{...} — 注意没有指定长度，区别于数组 [N]T{...}
	sl1 := []int{1, 2, 3, 4, 5}
	fmt.Printf("字面量: %v, len=%d, cap=%d\n", sl1, len(sl1), cap(sl1))
	// 输出: 字面量: [1 2 3 4 5], len=5, cap=5

	// --- 方式2：make([]T, len, cap) ---
	// 预分配容量，避免后续 append 时频繁扩容
	sl2 := make([]int, 3, 5) // 长度为 3（前 3 个元素为零值），容量为 5
	fmt.Printf("make(3,5): %v, len=%d, cap=%d\n", sl2, len(sl2), cap(sl2))
	// 输出: make(3,5): [0 0 0], len=3, cap=5

	// make([]T, len) — cap 默认等于 len
	sl3 := make([]int, 3) // 等价于 make([]int, 3, 3)
	fmt.Printf("make(3): %v, len=%d, cap=%d\n", sl3, len(sl3), cap(sl3))
	// 输出: make(3): [0 0 0], len=3, cap=3

	// --- 方式3：从数组/切片截取（共享底层！） ---
	// 语法：arr[low:high] — 包含 low，不包含 high
	// len = high - low, cap = 原容量 - low
	arr := [5]int{10, 20, 30, 40, 50}
	slFromArr := arr[1:4] // 索引 1,2,3 → [20, 30, 40]
	fmt.Printf("arr[1:4]: %v, len=%d, cap=%d\n", slFromArr, len(slFromArr), cap(slFromArr))
	// 输出: arr[1:4]: [20 30 40], len=3, cap=4
	// cap=4 因为底层数组从索引 1 开始到末尾有 4 个元素(20,30,40,50)

	// ⚠️ 切片共享底层数组！修改切片会影响原数组
	slFromArr[0] = 999
	fmt.Printf("修改切片后: arr=%v（底层数组也被改了！）\n", arr)
	// 输出: 修改切片后: arr=[10 999 30 40 50]（底层数组也被改了！）

	// ============================================================
	// 3. append —— 向切片追加元素
	// ============================================================
	fmt.Println("\n=== 3. append 追加元素 ===")

	s := []int{1, 2, 3}
	fmt.Printf("初始: %v, len=%d, cap=%d\n", s, len(s), cap(s))
	// 输出: 初始: [1 2 3], len=3, cap=3

	// append 返回新的切片，必须接收返回值！
	// 如果容量不够，会自动扩容（分配更大的底层数组并拷贝）
	s = append(s, 4, 5) // 追加两个元素
	fmt.Printf("append(4,5): %v, len=%d, cap=%d\n", s, len(s), cap(s))
	// 输出: append(4,5): [1 2 3 4 5], len=5, cap=6
	// cap 从 3 增长到 6（小于 256 时容量翻倍，此处 3→6）

	// 追加另一个切片用 ... 展开
	s = append(s, []int{6, 7}...) // ... 展开切片为单个元素
	fmt.Printf("append([]int{6,7}...): %v\n", s)
	// 输出: append([]int{6,7}...): [1 2 3 4 5 6 7]

	// ============================================================
	// 3b. append 扩容规律演示
	// ============================================================
	fmt.Println("\n=== 3b. 扩容规律 ===")
	fmt.Println("Go 1.18+ 扩容规则：容量 < 256 时翻倍，>= 256 时约增长 25%")

	demo := make([]int, 0) // 初始空切片
	for i := 0; i < 10; i++ {
		demo = append(demo, i)
		fmt.Printf("  append %d: len=%d, cap=%d, slice=%v\n", i, len(demo), cap(demo), demo)
	}
	// 输出（观察 cap 变化规律）:
	//   append 0: len=1, cap=1, slice=[0]
	//   append 1: len=2, cap=2, slice=[0 1]           (1→2 翻倍)
	//   append 2: len=3, cap=4, slice=[0 1 2]          (2→4 翻倍)
	//   append 3: len=4, cap=4, slice=[0 1 2 3]        (未扩容)
	//   append 4: len=5, cap=8, slice=[0 1 2 3 4]      (4→8 翻倍)
	//   append 5: len=6, cap=8, slice=[0 1 2 3 4 5]    (未扩容)
	//   append 6: len=7, cap=8, slice=[...]            (未扩容)
	//   append 7: len=8, cap=8, slice=[...]            (未扩容)
	//   append 8: len=9, cap=16, slice=[...]           (8→16 翻倍)
	//   append 9: len=10, cap=16, slice=[...]          (未扩容)

	// ============================================================
	// 4. copy —— 拷贝切片元素
	// ============================================================
	fmt.Println("\n=== 4. copy 拷贝 ===")
	// copy(dst, src) 返回实际复制的元素数量 = min(len(dst), len(src))
	src := []int{1, 2, 3, 4, 5}
	dst := make([]int, 3) // dst 只有 3 个位置
	n := copy(dst, src)    // 只拷贝 min(3, 5) = 3 个元素
	fmt.Printf("src=%v, dst=%v, copied=%d\n", src, dst, n)
	// 输出: src=[1 2 3 4 5], dst=[1 2 3], copied=3
	// 注意：copy 不会扩容 dst，多余的元素被丢弃

	// ============================================================
	// 5. 切片操作（截取语法）
	// ============================================================
	fmt.Println("\n=== 5. 切片操作 ===")

	s2 := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
	fmt.Printf("s=%v\n", s2)
	// 输出: s=[0 1 2 3 4 5 6 7 8 9]

	// s[low:high] — 从 low 到 high-1
	fmt.Printf("  s[2:5] = %v\n", s2[2:5])
	// 输出:   s[2:5] = [2 3 4]

	// s[:high] — 从开头到 high-1（等价于 s[0:high]）
	fmt.Printf("  s[:4]  = %v\n", s2[:4])
	// 输出:   s[:4]  = [0 1 2 3]

	// s[low:] — 从 low 到末尾（等价于 s[low:len(s)]）
	fmt.Printf("  s[6:]  = %v\n", s2[6:])
	// 输出:   s[6:]  = [6 7 8 9]

	// s[:] — 整个切片（浅拷贝！共享底层数组）
	fmt.Printf("  s[:]   = %v\n", s2[:])
	// 输出:   s[:]   = [0 1 2 3 4 5 6 7 8 9]

	// ============================================================
	// 6. nil 切片 vs 空切片 —— 一个重要区别
	// ============================================================
	fmt.Println("\n=== 6. nil 切片 vs 空切片 ===")

	// nil 切片：声明但未初始化
	var nilSlice []int // 未分配底层数组，nilSlice == nil

	// 空切片：已初始化但长度为 0
	emptySlice := []int{} // 分配了底层数组（虽然长度为 0），emptySlice != nil

	fmt.Printf("nil 切片: %v, len=%d, cap=%d, isNil=%t\n", nilSlice, len(nilSlice), cap(nilSlice), nilSlice == nil)
	// 输出: nil 切片: [], len=0, cap=0, isNil=true

	fmt.Printf("空切片:   %v, len=%d, cap=%d, isNil=%t\n", emptySlice, len(emptySlice), cap(emptySlice), emptySlice == nil)
	// 输出: 空切片:   [], len=0, cap=0, isNil=false

	// JSON 序列化时它们的区别很重要：
	//   nil 切片 → "null"
	//   空切片   → "[]"
	// 所以："返回空切片而非 nil" 是一个常见的最佳实践

	// ============================================================
	// 总结
	// ============================================================
	fmt.Println("\n=== 关键要点 ===")
	fmt.Println("1. 数组长度固定，是值类型（赋值会拷贝整个数组）")
	fmt.Println("2. 切片是引用语义（共享底层数组），修改需谨慎")
	fmt.Println("3. append 必须接收返回值：s = append(s, v)")
	fmt.Println("4. 扩容规律：容量 < 256 时翻倍，>= 256 时约增长 25%")
	fmt.Println("5. copy 不会自动扩容，只拷贝 min(len(dst), len(src)) 个元素")
	fmt.Println("6. nil 切片 (JSON→null) vs 空切片 (JSON→[])，场景选择")
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunArraysSlices() }
