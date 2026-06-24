package concurrency

import "fmt"

// RunErrgroup 演示 errgroup 并发错误组
// 注意：此文件仅做概念说明，实际运行需要 golang.org/x/sync/errgroup 依赖
func RunErrgroup() {
	fmt.Println("=== errgroup ===")
	fmt.Println("WaitGroup 的痛点：goroutine 内部 error 无法传递")
	fmt.Println("errgroup 解决：任何一个 goroutine 返回 error → 取消所有 → 返回第一个 error")
	fmt.Println()
	fmt.Println("基本用法:")
	fmt.Println("  var g errgroup.Group")
	fmt.Println("  g.Go(func() error { return doWork() })")
	fmt.Println("  if err := g.Wait(); err != nil { ... }")
	fmt.Println()
	fmt.Println("带 context:")
	fmt.Println("  g, ctx := errgroup.WithContext(ctx)")
	fmt.Println("  // 一个 goroutine 出错 → ctx 自动取消")
	fmt.Println("  // 其他 goroutine 通过 ctx.Done() 优雅退出")
	fmt.Println()
	fmt.Println("并发限制（Go 1.20+）:")
	fmt.Println("  g.SetLimit(10)  // 最多 10 个 goroutine 并发")
	fmt.Println()
	fmt.Println("前端类比: ≈ Promise.all() 遇到第一个 reject 就全部取消")
	fmt.Println("安装: go get golang.org/x/sync/errgroup")
}
