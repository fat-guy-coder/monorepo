package examples

import "fmt"

// RunErrorHandling 运行错误处理示例
func RunErrorHandling() {
	fmt.Println("\n=== 错误处理 (Error Handling) ===")

	// Go 没有异常机制，使用 error 类型

	// 创建 error
	err1 := fmt.Errorf("这是一个错误: %d", 42)
	fmt.Printf("fmt.Errorf: %v\n", err1)

	// 自定义错误类型
	type MyError struct {
		Code    int
		Message string
	}

	func (e *MyError) Error() string {
		return fmt.Sprintf("错误码: %d, 消息: %s", e.Code, e.Message)
	}

	err2 := &MyError{Code: 404, Message: "资源未找到"}
	fmt.Printf("自定义错误: %v\n", err2)

	// 错误检查
	result, err := divide(10, 2)
	if err != nil {
		fmt.Printf("错误: %v\n", err)
	} else {
		fmt.Printf("10/2 = %d\n", result)
	}

	result, err = divide(10, 0)
	if err != nil {
		fmt.Printf("错误: %v\n", err)
	} else {
		fmt.Printf("10/0 = %d\n", result)
	}

	// error 类型断言
	err3 := fmt.Errorf("io error: %s", "file not found")
	if ioErr, ok := err3.(interface{ IsIO() bool }); ok {
		fmt.Printf("这是 IO 错误: %v\n", ioErr)
	} else {
		fmt.Printf("普通错误: %v\n", err3)
	}

	// defer 和 error
	deferExampleWithError()

	// 包装错误 (Go 1.13+)
	err4 := fmt.Errorf("包装错误: %w", err2)
	fmt.Printf("包装后的错误: %v\n", err4)
}

func divide(a, b int) (int, error) {
	if b == 0 {
		return 0, fmt.Errorf("除数不能为零")
	}
	return a / b, nil
}

func deferExampleWithError() {
	defer fmt.Println("defer 总是执行")
	fmt.Println("函数执行中...")

	// 模拟错误
	err := fmt.Errorf("模拟错误")
	if err != nil {
		fmt.Printf("捕获错误: %v\n", err)
	}
}