package concurrency

import (
	"context"
	"fmt"
	"time"
)

// RunContext 演示 context 上下文——超时、取消、传值
func RunContext() {
	// === WithCancel 手动取消 ===
	fmt.Println("=== WithCancel ===")
	ctx, cancel := context.WithCancel(context.Background())
	go func() {
		select {
		case <-ctx.Done(): fmt.Println("goroutine: cancelled!")
		case <-time.After(2 * time.Second): fmt.Println("goroutine: done")
		}
	}()
	time.Sleep(50 * time.Millisecond)
	cancel() // 手动取消——ctx.Done() 立即关闭
	time.Sleep(50 * time.Millisecond)
	// 输出: goroutine: cancelled!

	// === WithTimeout 超时 ===
	fmt.Println("\n=== WithTimeout ===")
	ctx2, cancel2 := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel2()
	start := time.Now()
	select {
	case <-ctx2.Done(): fmt.Printf("timeout after %v, err=%v\n", time.Since(start), ctx2.Err())
	}
	// 输出: timeout after ~100ms, err=context deadline exceeded

	// === WithDeadline 截止时间 ===
	fmt.Println("\n=== WithDeadline ===")
	deadline := time.Now().Add(100 * time.Millisecond)
	ctx3, cancel3 := context.WithDeadline(context.Background(), deadline)
	defer cancel3()
	<-ctx3.Done()
	fmt.Printf("deadline reached: %v\n", ctx3.Err())
	// 输出: deadline reached: context deadline exceeded

	// === WithValue 传值 ===
	fmt.Println("\n=== WithValue ===")
	type contextKey string // 自定义类型防 key 冲突
	ctx4 := context.WithValue(context.Background(), contextKey("userID"), "user-123")
	userID := ctx4.Value(contextKey("userID")).(string)
	fmt.Printf("userID from context: %s\n", userID)
	// 输出: userID from context: user-123

	// === 取消传播：取消父→取消子 ===
	fmt.Println("\n=== 取消传播 ===")
	parentCtx, parentCancel := context.WithCancel(context.Background())
	childCtx, _ := context.WithCancel(parentCtx)
	parentCancel() // 取消父→子也取消
	<-childCtx.Done()
	fmt.Printf("child cancelled by parent: %v\n", childCtx.Err())
	// 输出: child cancelled by parent: context canceled

	fmt.Println("\n最佳实践:")
	fmt.Println(" 1. context 作为第一个参数: func Do(ctx context.Context, arg string)")
	fmt.Println(" 2. 不存 context 到 struct——每次调用传参")
	fmt.Println(" 3. ctx.Value 只存请求级元数据，不存业务参数")
}
