package basics

import (
	"fmt"
	"os"
	"time"
)

// RunFunctionsAdvanced 演示 Go 函数进阶特性：defer、闭包、panic/recover、函数式选项。
func RunFunctionsAdvanced() {
	fmt.Println("\n--- defer 基本用法 ---")
	demoDeferBasic()

	fmt.Println("\n--- defer 参数求值 ---")
	demoDeferEval()

	fmt.Println("\n--- defer LIFO ---")
	demoDeferLIFO()

	fmt.Println("\n--- defer 实用模式 ---")
	demoDeferPatterns()

	fmt.Println("\n--- 闭包 (Closures) ---")
	demoClosures()

	fmt.Println("\n--- panic 与 recover ---")
	demoPanicRecover()

	fmt.Println("\n--- 函数式选项模式 ---")
	demoFunctionalOptions()
}

func demoDeferBasic() {
	defer fmt.Println("  3. defer（最后执行）")
	fmt.Println("  1. 正常语句")
	fmt.Println("  2. 正常语句")
}

func demoDeferEval() {
	// ⚠️ defer 参数在声明时立即求值
	x := 1
	defer fmt.Printf("  defer x=%d（声明时求值）\n", x)
	x = 2
	fmt.Printf("  返回前 x=%d\n", x)
}

func demoDeferLIFO() {
	defer fmt.Println("  第1个 defer（最先声明，最后执行）")
	defer fmt.Println("  第2个 defer")
	defer fmt.Println("  第3个 defer（最后声明，最先执行）")
}

func demoDeferPatterns() {
	// 模式1: 文件资源管理
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
			fmt.Printf("  临时文件 %s 已清理\n", name)
		}()
		fmt.Fprintln(f, "Hello, defer!")
	}()

	// 模式2: 执行计时
	func() {
		start := time.Now()
		defer func() { fmt.Printf("  耗时: %v\n", time.Since(start)) }()
		time.Sleep(10 * time.Millisecond)
	}()

	// 模式3: defer 修改命名返回值
	result := func() (r int) {
		defer func() { r++ }()
		return 42
	}()
	fmt.Printf("  defer 修改后返回值: %d（原值 42）\n", result)

	// 模式4: 互斥锁
	locked := true
	defer func() {
		if locked {
			fmt.Println("  🔓 解锁（defer 保证）")
		}
	}()
	fmt.Println("  🔒 加锁，执行临界区...")
}

func demoClosures() {
	base := 100
	add := func(n int) int { return base + n }
	fmt.Printf("  add(5)=%d\n", add(5))
	base = 200
	fmt.Printf("  改 base=200, add(5)=%d\n", add(5))

	// 闭包工厂：独立计数器
	makeCounter := func() func() int {
		count := 0
		return func() int { count++; return count }
	}
	c1, c2 := makeCounter(), makeCounter()
	fmt.Printf("  c1: %d,%d,%d  c2: %d,%d\n", c1(), c1(), c1(), c2(), c2())

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

	// ⚠️ recover 只在 defer 中有效
	fmt.Println("  recover 位置说明:")
	func() {
		defer func() { recover() }() // ✅ 可以捕获
		// recover() // ❌ 不在 defer 中，无效
		fmt.Println("  正常执行")
	}()
}

// --- 函数式选项模式 ---
type ServerConfig struct {
	Host    string
	Port    int
	Timeout time.Duration
	MaxConn int
}
type ServerOption func(*ServerConfig)

func WithHost(host string) ServerOption { return func(c *ServerConfig) { c.Host = host } }
func WithPort(port int) ServerOption    { return func(c *ServerConfig) { c.Port = port } }
func WithTimeout(d time.Duration) ServerOption { return func(c *ServerConfig) { c.Timeout = d } }
func WithMaxConn(n int) ServerOption    { return func(c *ServerConfig) { c.MaxConn = n } }

func NewServerConfig(opts ...ServerOption) *ServerConfig {
	cfg := &ServerConfig{Host: "0.0.0.0", Port: 8080, Timeout: 30 * time.Second, MaxConn: 100}
	for _, opt := range opts {
		opt(cfg)
	}
	return cfg
}

func demoFunctionalOptions() {
	defaultCfg := NewServerConfig()
	fmt.Printf("  默认: %+v\n", defaultCfg)
	customCfg := NewServerConfig(WithPort(3000), WithTimeout(5*time.Second), WithMaxConn(1000))
	fmt.Printf("  自定义: %+v\n", customCfg)
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunFunctionsAdvanced() }
