package basics

import (
	"cmp"
	"fmt"
	"maps"
	"slices"
)

// RunGenerics 演示 Go 泛型：类型参数、约束（类型集）、泛型类型、标准库 slices/maps。
func RunGenerics() {
	fmt.Println("--- 泛型函数：一个函数通吃所有可排序类型 ---")
	fmt.Println("maxNum(3, 9)              =", maxNum(3, 9))
	fmt.Println("maxNum(2.5, 1.8)          =", maxNum(2.5, 1.8))
	fmt.Println(`maxNum("apple","banana")  =`, maxNum("apple", "banana"))
	// 输出:
	// maxNum(3, 9)              = 9
	// maxNum(2.5, 1.8)          = 2.5
	// maxNum("apple","banana")  = banana

	fmt.Println()
	fmt.Println("--- 自定义约束（类型集）：~ 表示底层类型，| 表示联合 ---")
	// Summable 只接受 int/int64/float64（及底层类型相同的类型），不接受 string
	fmt.Println("sumNums([]int{1,2,3})       =", sumNums([]int{1, 2, 3}))
	fmt.Println("sumNums([]float64{1.5,2.5}) =", sumNums([]float64{1.5, 2.5}))
	// 输出:
	// sumNums([]int{1,2,3})       = 6
	// sumNums([]float64{1.5,2.5}) = 4

	fmt.Println()
	fmt.Println("--- 泛型类型：通用 GenericStack[T]，int / string 都能装 ---")
	intGenericStack := NewGenericStack[int]()
	intGenericStack.Push(1)
	intGenericStack.Push(2)
	v, _ := intGenericStack.Pop()
	fmt.Println("intGenericStack Pop 出:", v, "剩余元素数:", intGenericStack.Len())

	strGenericStack := NewGenericStack[string]()
	strGenericStack.Push("go")
	strGenericStack.Push("泛型")
	s, _ := strGenericStack.Pop()
	fmt.Println("strGenericStack Pop 出:", s)
	// 输出:
	// intGenericStack Pop 出: 2 剩余元素数: 1
	// strGenericStack Pop 出: 泛型

	fmt.Println()
	fmt.Println("--- 标准库泛型：slices / maps（Go 1.21+） ---")
	names := []string{"banana", "apple", "cherry"}
	slices.Sort(names)
	fmt.Println("slices.Sort:", names)
	fmt.Println("slices.Contains(names, \"apple\"):", slices.Contains(names, "apple"))
	// 输出:
	// slices.Sort: [apple banana cherry]
	// slices.Contains(names, "apple"): true

	cfg := map[string]int{"timeout": 30, "retry": 3}
	clone := maps.Clone(cfg)
	clone["retry"] = 5 // 改克隆不影响原 map
	fmt.Println("maps.Clone 原 cfg:", cfg, "克隆:", clone)
	// 输出: maps.Clone 原 cfg: map[retry:3 timeout:30] 克隆: map[retry:5 timeout:30]
}

// maxNum 泛型函数：T 需实现 cmp.Ordered（整数/浮点/字符串等可比较大小的类型）。
func maxNum[T cmp.Ordered](a, b T) T {
	if a > b {
		return a
	}
	return b
}

// Summable 自定义约束：~ 表示"底层类型"，| 表示联合（这叫类型集 type set）。
type Summable interface {
	~int | ~int64 | ~float64
}

// sumNums 只接受实现 Summable 约束的类型——string 传进来会编译报错。
func sumNums[T Summable](nums []T) T {
	var s T
	for _, n := range nums {
		s += n
	}
	return s
}

// GenericStack 泛型类型：可以存任意元素类型的栈。
type GenericStack[T any] struct {
	items []T
}

// NewGenericStack 构造一个空栈。
func NewGenericStack[T any]() *GenericStack[T] { return &GenericStack[T]{} }

// Push 入栈。
func (s *GenericStack[T]) Push(v T) { s.items = append(s.items, v) }

// Pop 出栈；空栈时返回零值 + false。
func (s *GenericStack[T]) Pop() (T, bool) {
	if len(s.items) == 0 {
		var zero T
		return zero, false
	}
	v := s.items[len(s.items)-1]
	s.items = s.items[:len(s.items)-1]
	return v, true
}

// Len 栈内元素数。
func (s *GenericStack[T]) Len() int { return len(s.items) }
