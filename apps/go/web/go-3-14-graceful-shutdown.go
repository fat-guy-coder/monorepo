package web

import (
	"context"
	"errors"
	"fmt"
	"net"
	"net/http"
	"sync"
	"time"
)

// RunGracefulShutdown 演示优雅停机（Graceful Shutdown）。
//
// 内容包括：
//   - 为什么需要优雅停机（不优雅的下场）
//   - signal.Notify / signal.NotifyContext 监听停止信号
//   - http.Server.Shutdown(ctx) 的流程（停收新连接 → 排空 → 超时强杀）
//   - 10s 超时 ctx 兜底
//   - WaitGroup 等后台 goroutine 收尾
//   - 常见错误与反模式
//
// 说明：os/os/signal/syscall 的信号注册只在注释里演示（避免真实挂起），
// 但 Shutdown、超时强杀、WaitGroup 收尾都用真实可运行的代码演示。
func RunGracefulShutdown() {
	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("  01 · 优雅停机 Graceful Shutdown")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

	// ============================================================
	// 1. 为什么需要优雅停机
	// ============================================================
	fmt.Println("\n📌 1. 为什么需要优雅停机 — 不优雅的下场")
	fmt.Println("   想象 K8s 滚动更新：它先启动新 Pod，再给旧 Pod 发 SIGTERM，默认等 30s。")
	fmt.Println("   如果你的服务收到信号就 os.Exit(0) 或直接 return——")
	fmt.Println("   正在处理的请求会被拦腰斩断：用户看到 502/连接重置，写了一半的订单没入库。")
	fmt.Println("   发布越频繁，丢的请求越多，这就是\"发布即事故\"的根源。")

	fmt.Println(`
// 三个必须做到的点:
//   ① 不丢请求——已经进来的请求必须走完（订单、支付、写库）
//   ② 资源清理——数据库连接池、WebSocket、消息队列订阅要优雅关闭
//   ③ 配合负载均衡——先摘流量再发 SIGTERM，实现零停机发布
`)

	fmt.Println("   ⚠️ 先看反面教材：直接 http.ListenAndServe() 的 main，Ctrl+C 会立刻把进程杀掉，")
	fmt.Println("   Go 默认不会帮你等请求结束。不写优雅停机的服务，发布一次就丢一批请求。")
	fmt.Println("   前端类比: ≈ 前端 beforeunload / navigator.sendBeacon 上报埋点——关门前先把数据送出去")

	// ============================================================
	// 2. 信号监听
	// ============================================================
	fmt.Println("\n📌 2. 信号监听 — signal.Notify / signal.NotifyContext")
	fmt.Println("   优雅停机的第一步是感知\"要停了\"。操作系统用信号通知进程。")

	fmt.Println(`
// 信号          来源                      Go 常量           说明
// SIGINT        终端 Ctrl+C              os.Interrupt      本地调试最常见
// SIGTERM       K8s / Docker / systemd   syscall.SIGTERM   生产环境主角，必须监听
// SIGHUP        终端挂断 / 配置重载约定   syscall.SIGHUP    常被用来触发配置热更新
`)

	fmt.Println(`
// 写法一：signal.Notify —— channel 风格
//   sigCh := make(chan os.Signal, 1)
//   signal.Notify(sigCh, os.Interrupt, syscall.SIGTERM)
//   defer signal.Stop(sigCh)
//   <-sigCh                                  // 阻塞等待信号
//   log.Println("收到退出信号，开始优雅停机…")
//
// 写法二：signal.NotifyContext —— context 风格（推荐）
//   ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
//   defer stop()
//   <-ctx.Done()                             // 信号到达 → ctx 取消 → 这里解除阻塞
//   log.Println("signal ctx 已取消，开始优雅停机…")
//   // 把这个 ctx 传给所有后台任务，它们也会一起退出——全局一次广播搞定停机
`)

	fmt.Println("   NotifyContext 的好处：信号直接变成 context 取消，所有用这个 ctx 的 goroutine 一起收到。")

	// ============================================================
	// 3. Shutdown(ctx)
	// ============================================================
	fmt.Println("\n📌 3. http.Server.Shutdown(ctx) — 优雅关停 HTTP 服务")
	fmt.Println("   srv.Shutdown(ctx) 做的事非常精确：")
	fmt.Println("   ① 立即关闭 Listener（不再 accept 新连接）")
	fmt.Println("   ② 等待所有活跃连接的处理结束（等 handler 写完响应）")
	fmt.Println("   ③ 如果 ctx 到期还没排空，返回 ctx 错误——此时可调用 srv.Close() 强制关闭")

	// 真实演示 1: 正常排空，Shutdown 返回 nil
	fmt.Println("--- 演示 1: 正常排空（无在途请求） ---")
	demoShutdownGraceful()

	// 真实演示 2: 在途慢请求 + 超时 → Shutdown 返回 deadline exceeded
	fmt.Println("--- 演示 2: 在途请求超过 ctx 超时 → Shutdown 返回错误（超时强杀兜底） ---")
	demoShutdownTimeout()

	fmt.Println(`
// graceful.go — 生产级优雅停机完整模板（核心结构）
//   ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
//   defer stop()
//
//   srv := &http.Server{Addr: ":8080"}
//   go func() {
//       if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
//           log.Fatalf("listen: %v", err)
//       }
//   }()
//
//   <-ctx.Done()                     // 等信号
//   log.Println("收到停止信号，开始优雅停机…")
//
//   shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
//   defer cancel()
//   if err := srv.Shutdown(shutdownCtx); err != nil {
//       log.Printf("shutdown 超时: %v → 强制关闭", err)
//       _ = srv.Close()              // 超时兜底：强杀剩余连接
//   }
//   // ⚠️ ListenAndServe 返回 http.ErrServerClosed 是正常的，不算错误
`)

	fmt.Println("   ⚠️ 坑：ctx 要新建，不要直接用 signal ctx。signal ctx 是\"无期限取消\"，")
	fmt.Println("   信号一到它就 Done，用它做 Shutdown 的 ctx 会立刻认为超时，等于没排空。")
	fmt.Println("   ⚠️ 坑：ListenAndServe 不返回错误——shutdown 之后返回的是 http.ErrServerClosed，")
	fmt.Println("   这是\"假错误\"，别 log.Fatal 它。")

	// ============================================================
	// 4. WaitGroup 收尾
	// ============================================================
	fmt.Println("\n📌 4. WaitGroup 等待后台 goroutine — 只关 HTTP 还不够")
	fmt.Println("   一个服务不只有 HTTP handler，还有后台 goroutine：定时清理、队列消费者、")
	fmt.Println("   指标上报、WebSocket hub。Shutdown 只管 HTTP——其他 goroutine 要手动等。")
	fmt.Println("   做法：每个后台任务持有 signal ctx，收到信号后自己退出；")
	fmt.Println("   主流程用 sync.WaitGroup 计数，等所有任务 Done() 才真正返回。")

	// 真实演示 3: WaitGroup + ctx 取消
	fmt.Println("--- 演示 3: 后台任务 + WaitGroup + ctx 取消 ---")
	demoBackgroundTasks()

	fmt.Println(`
// wg_cleanup.go — 后台任务 + WaitGroup + ctx 取消
//   func backgroundTask(ctx context.Context, wg *sync.WaitGroup) {
//       defer wg.Done()
//       ticker := time.NewTicker(1 * time.Second)
//       defer ticker.Stop()
//       for {
//           select {
//           case <-ticker.C:
//               log.Println("后台任务跑一轮")   // 定时清理、消费队列、上报指标
//           case <-ctx.Done():
//               log.Println("后台任务收到取消信号，正在收尾…")
//               time.Sleep(200 * time.Millisecond) // 关 db、flush 日志、确认消费位置
//               return
//           }
//       }
//   }
//   // main 里最后一行 wg.Wait() 保证：后台任务真退出了，进程才退出
`)

	fmt.Println("   前端类比: context 取消 + WaitGroup ≈ AbortController 信号 + Promise.all——")
	fmt.Println("   一个 abort() 同时取消一批 fetch，Promise.all 等所有 Promise 结束。")

	// ============================================================
	// 5. 常见错误
	// ============================================================
	fmt.Println("\n📌 5. 常见错误与反模式")

	fmt.Println(`
// ❌ 错误 1：完全不做优雅停机
//   func main() {
//       log.Fatal(http.ListenAndServe(":8080", nil))
//   }
//   // 行为: 按 Ctrl+C → 进程瞬间消失，请求丢失，无任何日志
//
// ❌ 错误 2：把 signal ctx 直接当 Shutdown 的超时
//   ctx, _ := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
//   <-ctx.Done()
//   srv.Shutdown(ctx)   // ❌ signal ctx 是"无期限取消"，Shutdown 会立刻强杀
//   // ✅ 正确: 单独造带期限的 ctx
//   // shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
//   // defer cancel()
//   // srv.Shutdown(shutdownCtx)
//
// ❌ 错误 3：漏掉后台 goroutine / 超时设成 0
//   - 只等 HTTP 不等后台任务 → 消息队列消费者被强杀，消息丢失
//   - context.WithTimeout(ctx, 0) → 立即超时，等于没排空就强杀
//   - 超时设 2 分钟 → K8s 只等 30s 就 SIGKILL，白等还拖慢发布节奏
`)

	// ============================================================
	// 6. 对比 + 小结
	// ============================================================
	fmt.Println("\n📌 6. 对比总结 + 最佳实践")

	fmt.Println(`
// 直接退出（暴力）          vs  优雅停机
//   在途请求被拦腰斩断          全部正常返回
//   新连接无感知突然全挂        先停止接收，负载均衡已摘流量
//   后台任务被强杀可能丢数据     WaitGroup 等收尾
//   用户刷新就报错              无感（零停机发布）
`)

	fmt.Println("\n╔════════════════════════════════════════════════════════════╗")
	fmt.Println("║  优雅停机核心要点总结                                     ║")
	fmt.Println("╠════════════════════════════════════════════════════════════╣")
	fmt.Println("║  signal.NotifyContext → 把信号变成全局取消的 context      ║")
	fmt.Println("║  srv.Shutdown(ctx)    → 关 Listener + 等活跃请求         ║")
	fmt.Println("║  10s 超时 ctx          → 排空超时则强杀兜底，绝不无限等   ║")
	fmt.Println("║  WaitGroup + ctx       → 后台 goroutine 一个都不能漏      ║")
	fmt.Println("║  超时 < K8s 30s         → 配合滚动更新实现零停机发布      ║")
	fmt.Println("║  ErrServerClosed       → 不是错误，别误当崩溃            ║")
	fmt.Println("╚════════════════════════════════════════════════════════════╝")

	fmt.Println("\n💡 提示: 最佳实践——① 超时设置到 10~20s（小于容器 terminationGracePeriod）；")
	fmt.Println("   ② Shutdown 失败返回后主动 srv.Close() 收尾；③ 停机前后打日志，")
	fmt.Println("   方便排查\"发布时是否丢请求\"；④ 数据库连接池也要 db.Close()。")
}

// demoShutdownGraceful 演示：无在途请求时 Shutdown 立刻排空并返回 nil。
func demoShutdownGraceful() {
	srv := &http.Server{Addr: "127.0.0.1:0"}
	go func() {
		err := srv.ListenAndServe()
		if err != nil && !errors.Is(err, http.ErrServerClosed) {
			fmt.Printf("   ListenAndServe 意外错误: %v\n", err)
		}
	}()
	time.Sleep(50 * time.Millisecond) // 等服务起来

	shutdownCtx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()
	err := srv.Shutdown(shutdownCtx)
	fmt.Printf("   Shutdown() 返回: %v（nil 表示正常排空，无在途请求被丢弃）\n", err)
	fmt.Println("   此时进程可以安全退出了")
}

// demoShutdownTimeout 演示：在途慢请求拖过 ctx 超时 → Shutdown 返回 deadline exceeded。
func demoShutdownTimeout() {
	mux := http.NewServeMux()
	started := make(chan struct{})
	mux.HandleFunc("/slow", func(w http.ResponseWriter, r *http.Request) {
		close(started)                    // 通知"请求已进入 handler"
		time.Sleep(500 * time.Millisecond) // 模拟慢请求
		w.WriteHeader(http.StatusOK)
	})

	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		fmt.Println("   listen 失败:", err)
		return
	}
	srv := &http.Server{Addr: ln.Addr().String(), Handler: mux}
	go func() { _ = srv.Serve(ln) }()

	// 发起一个慢请求
	go func() { _, _ = http.Get("http://" + srv.Addr + "/slow") }()

	// 等请求真的进入 handler，再做 Shutdown（否则可能没在途连接，演示不成立）
	select {
	case <-started:
	case <-time.After(2 * time.Second):
		fmt.Println("   (请求未发出，跳过演示)")
		return
	}

	// 超时只给 100ms，远小于慢请求的 500ms
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
	defer cancel()
	err = srv.Shutdown(shutdownCtx)
	if err != nil {
		fmt.Printf("   Shutdown() 返回: %v\n", err)
		fmt.Println("   原因: 在途请求 100ms 内没处理完 → ctx 到期 → Shutdown 放弃等待")
		fmt.Println("   此时应调用 srv.Close() 强制断开剩余连接（强杀兜底）")
		_ = srv.Close()
	} else {
		fmt.Println("   Shutdown() 返回 nil（请求恰好完成）")
	}
}

// demoBackgroundTasks 演示：后台任务监听 ctx 取消 + WaitGroup 等待收尾。
func demoBackgroundTasks() {
	var wg sync.WaitGroup
	ctx, cancel := context.WithCancel(context.Background())
	wg.Add(1)
	go backgroundCleanup(ctx, &wg)

	time.Sleep(200 * time.Millisecond) // 模拟服务运行了一段时间
	cancel()                           // 模拟信号触发 ctx 取消
	wg.Wait()                          // 等后台任务真正退出
	fmt.Println("   所有后台任务收尾完成，进程可以退出了")
}

// backgroundCleanup 模拟一个后台任务：定时跑一轮，收到 ctx 取消信号后收尾退出。
func backgroundCleanup(ctx context.Context, wg *sync.WaitGroup) {
	defer wg.Done()
	ticker := time.NewTicker(100 * time.Millisecond)
	defer ticker.Stop()
	for {
		select {
		case <-ticker.C:
			fmt.Println("   后台任务跑一轮（定时清理/消费队列/上报指标）")
		case <-ctx.Done():
			fmt.Println("   后台任务收到取消信号，正在收尾…")
			time.Sleep(50 * time.Millisecond) // 模拟清理：关 db、flush 日志
			return
		}
	}
}
