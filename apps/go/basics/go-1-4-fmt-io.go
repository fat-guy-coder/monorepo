package basics

import (
	"errors"
	"fmt"
	"os"
)

// RunFmtIO 演示 fmt 包的格式化输入输出：Print/Sprint/Scan/Errorf。
func RunFmtIO() {
	name, age := "Gopher", 13

	// --- Print 系列：输出到标准输出 ---
	fmt.Println("\n--- Print 系列 ---")
	fmt.Print("A")                      // 无换行
	fmt.Print("B\n")                   // 手动换行
	fmt.Println("C", "D")              // 空格分隔 + 自动换行
	fmt.Printf("Name: %s, Age: %d\n", name, age)

	// --- Sprint 系列：返回字符串 ---
	fmt.Println("\n--- Sprint 系列 ---")
	s1 := fmt.Sprint("Hello", " ", name)
	s2 := fmt.Sprintf("Sprintf: %s v%.1f", name, 1.23)
	s3 := fmt.Sprintln("Line1", "Line2") // 末尾带 \n
	fmt.Printf("Sprint:  %q\n", s1)
	fmt.Printf("Sprintf: %q\n", s2)
	fmt.Printf("Sprintln:%q\n", s3)

	// --- 格式化动词 ---
	fmt.Println("\n--- 格式化动词 ---")
	type Person struct{ Name string; Age int }
	p := Person{"Alice", 25}
	fmt.Printf("  %%v  = %v\n", p)    // 默认格式
	fmt.Printf("  %%+v = %+v\n", p)   // 含字段名
	fmt.Printf("  %%#v = %#v\n", p)   // Go 语法
	fmt.Printf("  %%T  = %T\n", p)    // 类型
	fmt.Printf("  %%t  = %t\n", true) // 布尔
	fmt.Printf("  %%d  = %d, %%b = %b, %%o = %o, %%x = %x\n", 42, 5, 9, 255)
	fmt.Printf("  %%f  = %f, %%e = %e\n", 3.1415, 3141.5)
	fmt.Printf("  %%s  = %s, %%q = %q\n", "hello", "hello\tworld")
	fmt.Printf("  %%p  = %p\n", &name)

	// --- 宽度与精度 ---
	fmt.Println("\n--- 宽度与精度 ---")
	fmt.Printf("  |%8s|\n", "Go")        // 右对齐
	fmt.Printf("  |%-8s|\n", "Go")       // 左对齐
	fmt.Printf("  |%08d|\n", 42)         // 零填充
	fmt.Printf("  Pi = %.2f\n", 3.14159) // 精度
	fmt.Printf("  |%8.2f|\n", 3.14)       // 宽度+精度

	// --- 动态宽度（*） ---
	fmt.Println("\n--- 动态宽度 ---")
	for i := 1; i <= 4; i++ {
		fmt.Printf("  %*d\n", i*2, i)
	}

	// --- Scan 系列：读取用户输入 ---
	fmt.Println("\n--- Scan 系列 ---")
	fmt.Println("Scan 需要实际输入，这里演示 API 用法:")
	fmt.Println("  var s string; var n int")
	fmt.Println("  fmt.Scan(&s, &n)       // 空格/换行分隔")
	fmt.Println("  fmt.Scanf(\"%d/%d\", &d, &m) // 按格式读取")
	fmt.Println("  fmt.Scanln(&s, &n)     // 换行即停止")
	fmt.Println()
	// 实际演示（模拟输入，不阻塞）
	fmt.Println("  模拟：fmt.Sscanf(\"2024/08/15\", \"%d/%d/%d\", &y, &m, &d)")
	var y, m, d int
	fmt.Sscanf("2024/08/15", "%d/%d/%d", &y, &m, &d)
	fmt.Printf("  结果: y=%d, m=%d, d=%d\n", y, m, d)

	// Sscan —— 从字符串读取
	var word1, word2 string
	fmt.Sscanf("hello world", "%s %s", &word1, &word2)
	fmt.Printf("  Sscanf: word1=%q, word2=%q\n", word1, word2)

	// --- Errorf：格式化错误 ---
	fmt.Println("\n--- Errorf ---")
	err1 := fmt.Errorf("failed to open %q: %w", "config.yaml", os.ErrNotExist)
	fmt.Printf("  包装错误: %v\n", err1)
	fmt.Printf("  errors.Is(err, os.ErrNotExist): %t\n", errors.Is(err1, os.ErrNotExist))

	// 多层包装
	err2 := fmt.Errorf("load config: %w", err1)
	fmt.Printf("  再包装: %v\n", err2)
	fmt.Printf("  errors.Is still works: %t\n", errors.Is(err2, os.ErrNotExist))
}
