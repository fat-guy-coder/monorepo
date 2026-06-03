package basics

import (
	"fmt"
	"os"
	"runtime/debug"
	"strings"
	"time"
)

// RunFunctionsAdvanced 演示 Go 函数进阶：defer、闭包、panic/recover、函数式选项、高阶函数。
func RunFunctionsAdvanced() {
	fmt.Println("\n--- defer 基本用法 ---")
	demoDeferBasic()

	fmt.Println("\n--- defer 参数求值时机 ---")
	demoDeferEval()

	fmt.Println("\n--- defer LIFO 顺序 ---")
	demoDeferLIFO()

	fmt.Println("\n--- defer 实用模式 ---")
	demoDeferPatterns()

	fmt.Println("\n--- defer 在循环中的陷阱 ---")
	demoDeferInLoop()

	fmt.Println("\n--- 闭包基础 ---")
	demoClosures()

	fmt.Println("\n--- 闭包进阶模式 ---")
	demoClosurePatterns()

	fmt.Println("\n--- panic 与 recover ---")
	demoPanicRecover()

	fmt.Println("\n--- recover 获取堆栈信息 ---")
	demoRecoverWithStack()

	fmt.Println("\n--- 高阶函数 ---")
	demoHigherOrder()

	fmt.Println("\n--- 函数式选项模式 ---")
	demoFunctionalOptions()
}

// ============================================================
// defer
// ============================================================

func demoDeferBasic() {
	defer fmt.Println("  3. defer（最后执行）")
	fmt.Println("  1. 正常语句")
	fmt.Println("  2. 正常语句")
}

func demoDeferEval() {
	// ⚠️ defer 的参数在声明时立即求值，而非执行时
	x := 1
	defer fmt.Printf("  defer x=%d（声明时已求值）\n", x)
	x = 2
	fmt.Printf("  返回前 x=%d\n", x)
}

func demoDeferLIFO() {
	defer fmt.Println("  第1个 defer（最先声明，最后执行）")
	defer fmt.Println("  第2个 defer")
	defer fmt.Println("  第3个 defer（最后声明，最先执行）")
}

func demoDeferPatterns() {
	// 模式1: 文件资源管理（打开后立刻 defer 关闭）
	func() {
		f, err := os.CreateTemp("", "example-*.txt")
		if err != nil {
			fmt.Println("  创建临时文件失败:", err)
			return
		}
		defer func() {
			name := f.Name()
			f.Close()
			os.Remove(name)
			fmt.Printf("  临时文件 %s 已关闭并清理\n", name)
		}()
		fmt.Fprintln(f, "Hello, defer!")
	}()

	// 模式2: 函数计时器
	func() {
		start := time.Now()
		defer func() { fmt.Printf("  执行耗时: %v\n", time.Since(start)) }()
		time.Sleep(10 * time.Millisecond)
	}()

	// 模式3: defer 修改命名返回值
	result := func() (r int) {
		defer func() { r++ }() // return 42 后 r 被 defer 改成 43
		return 42
	}()
	fmt.Printf("  defer 修改后返回值: %d（原值 42）\n", result)

	// 模式4: 互斥锁（模拟）
	locked := true
	defer func() {
		if locked {
			fmt.Println("  🔓 解锁（defer 保证无论函数如何退出都会执行）")
		}
	}()
	fmt.Println("  🔒 加锁，执行临界区...")
}

func demoDeferInLoop() {
	// ❌ 循环中 defer 会累积，直到函数返回才执行 → 资源泄漏
	fmt.Println("  ❌ 错误做法:")
	fmt.Println("    for i := 0; i < 1000; i++ {")
	fmt.Println("        f, _ := os.Open(...)")
	fmt.Println("        defer f.Close()  // 1000 个文件都不关闭！")
	fmt.Println("    }")

	// ✅ 解决方案1：提取为独立函数
	fmt.Println("  ✅ 方案1：提取为函数（每次迭代立即释放）")
	processFiles := func() {
		f, _ := os.CreateTemp("", "loop-*.txt")
		defer func() { f.Close(); os.Remove(f.Name()) }()
		fmt.Fprintf(f, "处理中...")
	}
	for i := 0; i < 3; i++ {
		processFiles()
	}
	fmt.Println("  3 次迭代，每次文件都立即关闭")

	// ✅ 解决方案2：显式关闭（不用 defer）
	fmt.Println("  ✅ 方案2：显式关闭")
	f2, _ := os.CreateTemp("", "manual-*.txt")
	fmt.Fprintf(f2, "data")
	f2.Close()
	os.Remove(f2.Name())
	fmt.Println("  手动关闭并清理完成")
}

// ============================================================
// 闭包
// ============================================================

func demoClosures() {
	// 闭包通过引用捕获外部变量
	base := 100
	add := func(n int) int { return base + n }
	fmt.Printf("  add(5)=%d\n", add(5))
	base = 200
	fmt.Printf("  修改 base=200 后 add(5)=%d（引用！）\n", add(5))

	// 闭包工厂：每次调用创建独立实例
	makeCounter := func() func() int {
		count := 0
		return func() int { count++; return count }
	}
	c1, c2 := makeCounter(), makeCounter()
	fmt.Printf("  c1: %d, %d, %d\n", c1(), c1(), c1())
	fmt.Printf("  c2: %d, %d（c1 和 c2 状态独立）\n", c2(), c2())

	// Fibonacci 闭包
	fib := func() func() int {
		a, b := 0, 1
		return func() int { a, b = b, a+b; return a }
	}()
	fmt.Print("  Fibonacci: ")
	for i := 0; i < 8; i++ {
		fmt.Printf("%d ", fib())
	}
	fmt.Println()
}

func demoClosurePatterns() {
	// 模式1: 累加器（accumulator）
	accumulator := func(init int) func(int) int {
		sum := init
		return func(n int) int { sum += n; return sum }
	}
	acc := accumulator(0)
	fmt.Printf("  累加器: +10=%d, +20=%d, +30=%d\n", acc(10), acc(20), acc(30))

	// 模式2: 带记忆的过滤器
	makeFilter := func(min int) func(int) bool {
		return func(n int) bool { return n > min }
	}
	gt10 := makeFilter(10)
	nums := []int{5, 12, 8, 20, 3}
	fmt.Print("  >10 过滤: ")
	for _, n := range nums {
		if gt10(n) {
			fmt.Printf("%d ", n)
		}
	}
	fmt.Println()

	// 模式3: 函数柯里化
	multiply := func(a int) func(int) int {
		return func(b int) int { return a * b }
	}
	double := multiply(2)
	triple := multiply(3)
	fmt.Printf("  double(5)=%d, triple(5)=%d\n", double(5), triple(5))

	// 模式4: 延迟执行（lazy evaluation）
	lazy := func(fn func() int) func() int {
		var cache *int
		return func() int {
			if cache == nil {
				v := fn()
				cache = &v
			}
			return *cache
		}
	}
	expensive := func() int { fmt.Print("  (执行计算...) "); return 42 }
	lazyVal := lazy(expensive)
	fmt.Printf("第1次: %d\n", lazyVal())
	fmt.Printf("  第2次: %d（缓存命中，未重新计算）\n", lazyVal())

	// 模式5: 事件处理器闭包
	makeHandler := func(name string) func() {
		return func() { fmt.Printf("  处理器 [%s] 被触发\n", name) }
	}
	handlers := []func(){makeHandler("A"), makeHandler("B"), makeHandler("C")}
	fmt.Println("  触发所有处理器:")
	for _, h := range handlers {
		h()
	}
}

// ============================================================
// panic 与 recover
// ============================================================

func demoPanicRecover() {
	fmt.Println("  基本 recover:")
	safeDiv := func(a, b int) (result int) {
		defer func() {
			if r := recover(); r != nil {
				fmt.Printf("  捕获 panic: %v（返回 0）\n", r)
				result = 0
			}
		}()
		if b == 0 {
			panic("除零错误")
		}
		return a / b
	}
	fmt.Printf("  10/2 = %d\n", safeDiv(10, 2))
	fmt.Printf("  10/0 = %d\n", safeDiv(10, 0))

	// ⚠️ recover 只在 defer 函数中直接调用才有效
	fmt.Println("\n  recover 位置说明:")
	fmt.Println("  ✅ defer func() { recover() }()")
	fmt.Println("  ❌ func() { recover() }()（不在 defer 中，返回 nil）")
	fmt.Println("  ❌ defer recover()（未在 defer 函数体内直接调用）")

	// panic 传播：当前函数停止 → 执行 defer → 向上传播
	fmt.Println("\n  panic 传播链:")
	func() {
		defer func() {
			if r := recover(); r != nil {
				fmt.Printf("  最外层捕获: %v（整条链被中断）\n", r)
			}
		}()
		func() {
			defer fmt.Println("  内层 defer 仍会执行")
			panic("内层错误")
		}()
		fmt.Println("  这行不会执行")
	}()
}

func demoRecoverWithStack() {
	fmt.Println("  recover + 堆栈信息（生产环境排查用）:")
	func() {
		defer func() {
			if r := recover(); r != nil {
				fmt.Printf("  panic: %v\n", r)
				stack := string(debug.Stack())
				// 只显示前 5 行作为演示
				lines := strings.Split(stack, "\n")
				if len(lines) > 5 {
					lines = lines[:5]
				}
				fmt.Printf("  堆栈（前5行）:\n%s\n", strings.Join(lines, "\n"))
			}
		}()
		type user struct{ name string }
		u := user{"test"}
		_ = fmt.Sprint(u)
		// 不会真正 panic，仅做演示
		fmt.Println("  正常执行，未 panic")
	}()
	fmt.Println("  实际 panic 时 debug.Stack() 会打印完整调用栈")
}

// ============================================================
// 高阶函数
// ============================================================

func demoHigherOrder() {
	// 1. 函数作为参数
	nums := []int{1, 2, 3, 4, 5}
	transform := func(arr []int, fn func(int) int) []int {
		result := make([]int, len(arr))
		for i, v := range arr {
			result[i] = fn(v)
		}
		return result
	}
	doubled := transform(nums, func(n int) int { return n * 2 })
	fmt.Printf("  map(n*2): %v\n", doubled)
	squared := transform(nums, func(n int) int { return n * n })
	fmt.Printf("  map(n²):  %v\n", squared)

	// 2. 函数作为返回值
	makeAdder := func(n int) func(int) int {
		return func(x int) int { return x + n }
	}
	add5 := makeAdder(5)
	fmt.Printf("  add5(10)=%d, add5(100)=%d\n", add5(10), add5(100))

	// 3. 函数类型别名（提高可读性）
	type Predicate func(int) bool
	filter := func(arr []int, pred Predicate) []int {
		var result []int
		for _, v := range arr {
			if pred(v) {
				result = append(result, v)
			}
		}
		return result
	}
	evens := filter(nums, func(n int) bool { return n%2 == 0 })
	fmt.Printf("  filter(偶数): %v\n", evens)
	gt3 := filter(nums, func(n int) bool { return n > 3 })
	fmt.Printf("  filter(>3): %v\n", gt3)

	// 4. 方法值 vs 方法表达式（使用 strings.Builder 标准库示例）
	var b strings.Builder
	b.WriteString("hello") // 方法值：b.WriteString 绑定到 b 实例
	writeFn := b.WriteString // 方法值
	writeFn(" world")
	fmt.Printf("  方法值演示: %q\n", b.String())
	// 方法表达式：不绑定实例，第一个参数是接收者
	writeExpr := (*strings.Builder).WriteString
	var b2 strings.Builder
	writeExpr(&b2, "method expr")
	fmt.Printf("  方法表达式: %q\n", b2.String())
}

// ============================================================
// 函数式选项模式
// ============================================================

type ServerConfig struct {
	Host    string
	Port    int
	Timeout time.Duration
	MaxConn int
}
type ServerOption func(*ServerConfig)

func WithHost(host string) ServerOption    { return func(c *ServerConfig) { c.Host = host } }
func WithPort(port int) ServerOption       { return func(c *ServerConfig) { c.Port = port } }
func WithTimeout(d time.Duration) ServerOption { return func(c *ServerConfig) { c.Timeout = d } }
func WithMaxConn(n int) ServerOption       { return func(c *ServerConfig) { c.MaxConn = n } }

func NewServerConfig(opts ...ServerOption) *ServerConfig {
	cfg := &ServerConfig{Host: "0.0.0.0", Port: 8080, Timeout: 30 * time.Second, MaxConn: 100}
	for _, opt := range opts {
		opt(cfg)
	}
	return cfg
}

func demoFunctionalOptions() {
	defaultCfg := NewServerConfig()
	fmt.Printf("  默认: Host=%s Port=%d Timeout=%v MaxConn=%d\n",
		defaultCfg.Host, defaultCfg.Port, defaultCfg.Timeout, defaultCfg.MaxConn)
	customCfg := NewServerConfig(WithPort(3000), WithTimeout(5*time.Second), WithMaxConn(1000))
	fmt.Printf("  自定义: Host=%s Port=%d Timeout=%v MaxConn=%d\n",
		customCfg.Host, customCfg.Port, customCfg.Timeout, customCfg.MaxConn)
	fmt.Println("\n  优势: 可选参数自由组合，默认值集中管理，类型安全，易扩展")
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunFunctionsAdvanced() }
