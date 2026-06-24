package web

import "fmt"

// RunGracefulShutdown 演示优雅关停
func RunGracefulShutdown() {
	fmt.Println("=== 优雅关停 ===")
	fmt.Println("完整流程:")
	fmt.Println("  srv := &http.Server{Addr: \":8080\", Handler: mux}")
	fmt.Println("  go func() { srv.ListenAndServe() }()")
	fmt.Println()
	fmt.Println("  // 监听 OS 信号")
	fmt.Println("  ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)")
	fmt.Println("  defer stop()")
	fmt.Println("  <-ctx.Done()  // 阻塞直到 Ctrl+C 或 SIGTERM")
	fmt.Println()
	fmt.Println("  // 10 秒超时——防止请求卡死")
	fmt.Println("  shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)")
	fmt.Println("  defer cancel()")
	fmt.Println("  srv.Shutdown(shutdownCtx)  // 停止接受新请求→等现有请求完成→退出")
	fmt.Println()
	fmt.Println("核心原则:")
	fmt.Println("  1. 停止接受新请求")
	fmt.Println("  2. 等待现有请求完成")
	fmt.Println("  3. 超时兜底——防止某个请求永久不结束")
	fmt.Println()
	fmt.Println("前端类比: ≈ process.on('SIGTERM', () => server.close())")
	fmt.Println("生产必备——K8s/Docker 发 SIGTERM 后等 30s")
}
