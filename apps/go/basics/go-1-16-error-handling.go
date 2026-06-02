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

// RunErrorHandling 演示 Go 的错误处理惯用法。
func RunErrorHandling() {
	fmt.Println("\n--- error 接口 ---")
	fmt.Println("type error interface { Error() string }")
	err1 := errors.New("something went wrong")
	fmt.Printf("errors.New: %v\n", err1)
	err2 := fmt.Errorf("failed to read file: %s", "data.txt")
	fmt.Printf("fmt.Errorf: %v\n", err2)

	fmt.Println("\n--- 哨兵错误 (Sentinel Errors) ---")
	var ErrNotFound = errors.New("not found")
	var ErrPermission = errors.New("permission denied")
	fmt.Printf("ErrNotFound = %v\n", ErrNotFound)
	fmt.Printf("== 比较: %t (哨兵用 ==)\n", ErrNotFound == ErrNotFound)
	_ = ErrPermission

	fmt.Println("\n--- 错误包装 (%w) ---")
	openFile := func(name string) error {
		return fmt.Errorf("open %s: %w", name, ErrNotFound)
	}
	err := openFile("config.yaml")
	fmt.Printf("包装后: %v\n", err)
	fmt.Printf("errors.Is(err, ErrNotFound): %t\n", errors.Is(err, ErrNotFound))

	fmt.Println("\n--- errors.As: 类型断言 ---")
	readFile := func(path string) error {
		return &pathError{"read", path, ErrNotFound}
	}
	fileErr := readFile("config.yaml")
	fmt.Printf("自定义错误: %v\n", fileErr)
	var pe *pathError
	if errors.As(fileErr, &pe) {
		fmt.Printf("提取 pathError: Op=%q, Path=%q\n", pe.Op, pe.Path)
	}

	fmt.Println("\n--- errors.Join (Go 1.20+) ---")
	errA := errors.New("error A")
	errB := errors.New("error B")
	joined := errors.Join(errA, errB)
	fmt.Printf("joined: %v\n", joined)
	fmt.Printf("Is(errA)=%t, Is(errB)=%t\n", errors.Is(joined, errA), errors.Is(joined, errB))

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
		}
	}

	fmt.Println("\n--- 错误处理最佳实践 ---")
	fmt.Println("1. 优先返回 error，不要 panic")
	fmt.Println("2. 用 %w 包装，保留错误链")
	fmt.Println("3. 调用方用 errors.Is/As 检查")
	fmt.Println("4. error 是最后一个返回值")
	fmt.Println("5. errors.Join 聚合多个错误 (Go 1.20+)")

	_, err = os.Open("nonexistent.txt")
	if err != nil {
		fmt.Printf("\nos.Open 错误: %v\n", err)
		fmt.Printf("Is(ErrNotExist)=%t\n", errors.Is(err, os.ErrNotExist))
	}
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunErrorHandling() }
