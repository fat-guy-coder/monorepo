package basics

import (
	"errors"
	"fmt"
	"os"
)

// --- 自定义错误类型（包级别） ---

type pathError struct {
	Op   string
	Path string
	Err  error
}

func (e *pathError) Error() string { return fmt.Sprintf("%s %s: %v", e.Op, e.Path, e.Err) }

type validationError struct {
	Field string
	Value any
	Msg   string
}

func (e *validationError) Error() string {
	return fmt.Sprintf("validation: %s %v: %s", e.Field, e.Value, e.Msg)
}

// RunErrorHandling 演示 Go 的错误处理惯用法：哨兵错误 / %w 包装 / errors.Is/As / Join。
func RunErrorHandling() {
	// ═══════════════════════════════════════════
	// error 接口 — Go 的错误就是实现了 Error() string 的值
	// ═══════════════════════════════════════════
	fmt.Println("\n--- error 接口 ---")
	fmt.Println("type error interface { Error() string }")
	// 输出: "type error interface { Error() string }"

	// errors.New — 创建简单错误
	err1 := errors.New("something went wrong")
	fmt.Printf("errors.New: %v\n", err1)
	// 输出: "errors.New: something went wrong"

	// fmt.Errorf — 格式化错误消息（%s 插入值）
	err2 := fmt.Errorf("failed to read file: %s", "data.txt")
	fmt.Printf("fmt.Errorf: %v\n", err2)
	// 输出: "fmt.Errorf: failed to read file: data.txt"

	// ═══════════════════════════════════════════
	// 哨兵错误 — 包级别预定义的错误变量，用 == 比较
	// ═══════════════════════════════════════════
	fmt.Println("\n--- 哨兵错误 (Sentinel Errors) ---")
	var ErrNotFound = errors.New("not found")
	var ErrPermission = errors.New("permission denied")
	fmt.Printf("ErrNotFound = %v\n", ErrNotFound)
	// 输出: "ErrNotFound = not found"
	fmt.Printf("== 比较: %t (哨兵用 ==)\n", ErrNotFound == ErrNotFound)
	// 输出: "== 比较: true (哨兵用 ==)"
	_ = ErrPermission // 避免 unused 警告

	// ═══════════════════════════════════════════
	// 错误包装 (%w) — 保留原始错误，形成错误链
	// ═══════════════════════════════════════════
	fmt.Println("\n--- 错误包装 (%w) ---")
	openFile := func(name string) error {
		return fmt.Errorf("open %s: %w", name, ErrNotFound)
	}
	err := openFile("config.yaml")
	fmt.Printf("包装后: %v\n", err)
	// 输出: "包装后: open config.yaml: not found"

	// errors.Is — 沿错误链向上查找，检查是否包含某个哨兵错误
	fmt.Printf("errors.Is(err, ErrNotFound): %t\n", errors.Is(err, ErrNotFound))
	// 输出: "errors.Is(err, ErrNotFound): true"

	// ═══════════════════════════════════════════
	// errors.As — 沿错误链提取特定类型的错误（类型断言版）
	// ═══════════════════════════════════════════
	fmt.Println("\n--- errors.As: 类型断言 ---")
	readFile := func(path string) error {
		return &pathError{"read", path, ErrNotFound}
	}
	fileErr := readFile("config.yaml")
	fmt.Printf("自定义错误: %v\n", fileErr)
	// 输出: "自定义错误: read config.yaml: not found"

	var pe *pathError
	if errors.As(fileErr, &pe) {
		fmt.Printf("提取 pathError: Op=%q, Path=%q\n", pe.Op, pe.Path)
		// 输出: "提取 pathError: Op=\"read\", Path=\"config.yaml\""
	}

	// ═══════════════════════════════════════════
	// errors.Join (Go 1.20+) — 合并多个错误
	// ═══════════════════════════════════════════
	fmt.Println("\n--- errors.Join (Go 1.20+) ---")
	errA := errors.New("error A")
	errB := errors.New("error B")
	joined := errors.Join(errA, errB)
	fmt.Printf("joined: %v\n", joined)
	// 输出: "joined: error A\nerror B"  (换行分隔)
	fmt.Printf("Is(errA)=%t, Is(errB)=%t\n", errors.Is(joined, errA), errors.Is(joined, errB))
	// 输出: "Is(errA)=true, Is(errB)=true"

	// ═══════════════════════════════════════════
	// 自定义错误类型 + errors.As 实战
	// ═══════════════════════════════════════════
	fmt.Println("\n--- 自定义错误类型 ---")
	validate := func(name string) error {
		if name == "" {
			return &validationError{"name", name, "must not be empty"}
		}
		return nil
	}
	if err := validate(""); err != nil {
		var ve *validationError
		if errors.As(err, &ve) {
			fmt.Printf("字段 %q 校验失败: %s\n", ve.Field, ve.Msg)
			// 输出: "字段 \"name\" 校验失败: must not be empty"
		}
	}

	// ═══════════════════════════════════════════
	// 最佳实践 6 条
	// ═══════════════════════════════════════════
	fmt.Println("\n--- 错误处理最佳实践 ---")
	fmt.Println("1. 优先返回 error，不要 panic")
	fmt.Println("2. 用 %w 包装，保留错误链")
	fmt.Println("3. 调用方用 errors.Is/As 检查")
	fmt.Println("4. error 是最后一个返回值")
	fmt.Println("5. errors.Join 聚合多个错误 (Go 1.20+)")
	// 输出:
	// 1. 优先返回 error，不要 panic
	// 2. 用 %w 包装，保留错误链
	// 3. 调用方用 errors.Is/As 检查
	// 4. error 是最后一个返回值
	// 5. errors.Join 聚合多个错误 (Go 1.20+)

	// os.Open 演示系统错误 + errors.Is
	_, err = os.Open("nonexistent.txt")
	if err != nil {
		fmt.Printf("\nos.Open 错误: %v\n", err)
		// 输出: "os.Open 错误: open nonexistent.txt: The system cannot find the file specified."
		fmt.Printf("Is(ErrNotExist)=%t\n", errors.Is(err, os.ErrNotExist))
		// 输出: "Is(ErrNotExist)=true"
	}
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunErrorHandling() }
