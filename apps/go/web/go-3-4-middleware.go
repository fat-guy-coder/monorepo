package web

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

// RunMiddleware 演示 Go Web 中间件模式。
//
// 中间件是 HTTP 请求处理链中的可插拔组件，用于处理
// 横切关注点（日志、认证、恢复、CORS 等）。
//
// 内容包括：
//   - net/http 自定义中间件模式
//   - 日志中间件
//   - 认证中间件
//   - 恢复（recovery）中间件
//   - 中间件链式组合
//   - Gin 中间件模式
//   - CORS 中间件概念
func RunMiddleware() {
	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("  03 · 中间件模式")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

	// ============================================================
	// 1. 中间件基础概念
	// ============================================================
	fmt.Println("\n📌 1. 中间件基础概念")
	fmt.Println("   中间件本质上是一个函数，它接收一个 http.Handler 并返回一个新的 http.Handler。")
	fmt.Println("   签名: func(http.Handler) http.Handler")
	fmt.Println()
	fmt.Println("   洋葱模型: Request → M1 → M2 → Handler → M2 → M1 → Response")

	// ============================================================
	// 2. 日志中间件 — 完整可运行的演示
	// ============================================================
	fmt.Println("\n📌 2. 日志中间件 — 记录请求方法、路径和耗时")
	loggingMiddleware := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			fmt.Printf("    [LOG] → %s %s\n", r.Method, r.URL.Path)

			next.ServeHTTP(w, r)

			duration := time.Since(start)
			fmt.Printf("    [LOG] ← %s %s (%v)\n", r.Method, r.URL.Path, duration)
		})
	}
	_ = loggingMiddleware // 用于演示，不实际运行

	fmt.Println(`
// 日志中间件实现:
//   func LoggingMiddleware(next http.Handler) http.Handler {
//       return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//           start := time.Now()
//           log.Printf("→ %s %s", r.Method, r.URL.Path)
//           next.ServeHTTP(w, r)
//           log.Printf("← %s %s (%v)", r.Method, r.URL.Path, time.Since(start))
//       })
//   }
`)

	// ============================================================
	// 3. 认证中间件
	// ============================================================
	fmt.Println("📌 3. 认证中间件 — Basic Auth 检查")

	fmt.Println(`
// 认证中间件实现:
//   func AuthMiddleware(next http.Handler) http.Handler {
//       return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//           username, password, ok := r.BasicAuth()
//           if !ok || username != "admin" || password != "secret" {
//               w.Header().Set("WWW-Authenticate", ` + "`" + `Basic realm="Restricted"` + "`" + `)
//               http.Error(w, "Unauthorized", http.StatusUnauthorized)
//               return  // 未认证，不调用 next
//           }
//           next.ServeHTTP(w, r)
//       })
//   }
`)

	// 演示认证流程
	fmt.Println("--- 演示: 中间件认证流程 ---")
	fmt.Println("    Request → AuthMiddleware → 验证通过?")
	fmt.Println("       Yes → next.ServeHTTP(w, r)  // 继续处理")
	fmt.Println("       No  → http.Error 401        // 拦截请求")

	// ============================================================
	// 4. 恢复中间件
	// ============================================================
	fmt.Println("\n📌 4. 恢复 (Recovery) 中间件 — 防止 panic 导致服务器崩溃")

	fmt.Println(`
// 恢复中间件实现:
//   func RecoveryMiddleware(next http.Handler) http.Handler {
//       return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//           defer func() {
//               if err := recover(); err != nil {
//                   log.Printf("PANIC recovered: %v\n%s", err, debug.Stack())
//                   http.Error(w, "Internal Server Error", http.StatusInternalServerError)
//               }
//           }()
//           next.ServeHTTP(w, r)
//       })
//   }
`)

	// ============================================================
	// 5. 中间件链
	// ============================================================
	fmt.Println("📌 5. 中间件链式组合 — 将多个中间件串联")

	fmt.Println(`
// 方案 A: 手动嵌套
//   handler := LoggingMiddleware(AuthMiddleware(RecoveryMiddleware(mux)))
//
// 方案 B: 辅助函数 (推荐)
//   func Chain(handler http.Handler, middlewares ...func(http.Handler) http.Handler) http.Handler {
//       for i := len(middlewares) - 1; i >= 0; i-- {
//           handler = middlewares[i](handler)
//       }
//       return handler
//   }
//
//   handler := Chain(mux, LoggingMiddleware, AuthMiddleware, RecoveryMiddleware)
//   http.ListenAndServe(":8080", handler)
`)

	// 完整的中间件链演示
	fmt.Println("--- 演示: 中间件链 ---")
	fmt.Println("    请求处理流程:")
	fmt.Println("    [Logging] → [Auth] → [Recovery] → [Handler]")
	fmt.Println("    [Logging] 记录请求开始时间")
	fmt.Println("    [Auth]    验证 Basic Auth")
	fmt.Println("    [Recovery] 捕获 panic (defer+recover)")
	fmt.Println("    [Handler]  执行业务逻辑")

	// ============================================================
	// 6. 请求计时与上下文传递
	// ============================================================
	fmt.Println("\n📌 6. 请求计时与上下文传递")
	fmt.Println("   使用 context.WithValue 在请求链中传递数据。")

	fmt.Println(`
// 计时中间件 + 上下文传递:
//   type contextKey string
//   const RequestIDKey contextKey = "requestID"
//
//   func RequestIDMiddleware(next http.Handler) http.Handler {
//       return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//           requestID := r.Header.Get("X-Request-ID")
//           if requestID == "" {
//               requestID = uuid.New().String()
//           }
//           ctx := context.WithValue(r.Context(), RequestIDKey, requestID)
//           w.Header().Set("X-Request-ID", requestID)
//           next.ServeHTTP(w, r.WithContext(ctx))
//       })
//   }
`)

	// ============================================================
	// 7. Gin 中间件模式
	// ============================================================
	fmt.Println("📌 7. Gin 中间件模式 (概念与代码结构)")

	fmt.Println(`
// Gin 中间件签名:
//   func(c *gin.Context)  或  gin.HandlerFunc
//
// Gin 自定义中间件示例:
//   func GinLogger() gin.HandlerFunc {
//       return func(c *gin.Context) {
//           start := time.Now()
//           c.Next()  // 执行后续处理器
//           latency := time.Since(start)
//           log.Printf("[GIN] %s %s %v %d",
//               c.Request.Method, c.Request.URL.Path,
//               latency, c.Writer.Status())
//       }
//   }
//
// Gin 中间件的关键方法:
//   c.Next()      → 调用后续链中的下一个处理器
//   c.Abort()     → 阻止后续处理器执行
//   c.Set(k, v)   → 在上下文中存储键值
//   c.Get(k)      → 从上下文中获取值
//   c.MustGet(k)  → 获取值，不存在则 panic
//
// 使用方式:
//   r.Use(GinLogger())          // 全局中间件
//   group.Use(AuthRequired())   // 分组中间件
//   r.GET("/x", mw, handler)    // 路由级中间件
`)

	// ============================================================
	// 8. CORS 中间件
	// ============================================================
	fmt.Println("📌 8. CORS 中间件 — 跨域资源共享")

	fmt.Println(`
// CORS 中间件概念:
//   浏览器安全策略阻止跨域请求，
//   服务器通过设置响应头告诉浏览器允许哪些跨域请求。

// CORS 中间件实现:
//   func CORSMiddleware(next http.Handler) http.Handler {
//       return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//           w.Header().Set("Access-Control-Allow-Origin", "*")
//           w.Header().Set("Access-Control-Allow-Methods",
//               "GET, POST, PUT, DELETE, OPTIONS")
//           w.Header().Set("Access-Control-Allow-Headers",
//               "Content-Type, Authorization")
//
//           // 处理预检请求
//           if r.Method == http.MethodOptions {
//               w.WriteHeader(http.StatusNoContent)
//               return
//           }
//
//           next.ServeHTTP(w, r)
//       })
//   }
//
// CORS 响应头说明:
//   Access-Control-Allow-Origin   → 允许的源 (或 *)
//   Access-Control-Allow-Methods  → 允许的 HTTP 方法
//   Access-Control-Allow-Headers  → 允许的请求头
//   Access-Control-Max-Age        → 预检请求缓存时间（秒）
//   Access-Control-Allow-Credentials → 是否允许携带 Cookie
`)

	// ============================================================
	// 9. 限流中间件概念
	// ============================================================
	fmt.Println("📌 9. 限流中间件概念")

	fmt.Println(`
// 简单令牌桶限流概念:
//   type RateLimiter struct {
//       mu       sync.Mutex
//       requests map[string][]time.Time
//       limit    int
//       window   time.Duration
//   }
//
//   func RateLimitMiddleware(limit int, window time.Duration) func(http.Handler) http.Handler {
//       return func(next http.Handler) http.Handler {
//           return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//               // 按 IP 计数请求次数
//               // 超过限制则返回 429 Too Many Requests
//           })
//       }
//   }
`)

	// ============================================================
	// 10. 生产环境中间件栈示例
	// ============================================================
	fmt.Println("📌 10. 生产环境推荐的中间件栈")

	fmt.Println(`
// 典型中间件栈 (从外到内):
//   1. Recovery        → 防止 panic 导致崩溃
//   2. RequestID       → 为每个请求生成唯一 ID
//   3. Logger          → 请求日志
//   4. CORS            → 跨域处理
//   5. RateLimiter     → 限流保护
//   6. Auth            → 身份认证
//   7. Business Handler → 业务逻辑
//
//   handler := Chain(mux,
//       RecoveryMiddleware,
//       RequestIDMiddleware,
//       LoggingMiddleware,
//       CORSMiddleware,
//       RateLimitMiddleware,
//       AuthMiddleware,
//   )
`)

	// ============================================================
	// 总结
	// ============================================================
	fmt.Println("\n╔════════════════════════════════════════════════════════════╗")
	fmt.Println("║  中间件核心概念总结                                      ║")
	fmt.Println("╠════════════════════════════════════════════════════════════╣")
	fmt.Println("║  模式: func(http.Handler) http.Handler                    ║")
	fmt.Println("║  Logging    → 记录请求方法、路径、耗时                   ║")
	fmt.Println("║  Auth       → Basic Auth / Bearer Token 验证             ║")
	fmt.Println("║  Recovery   → defer + recover 捕获 panic                 ║")
	fmt.Println("║  CORS       → 跨域资源共享响应头                         ║")
	fmt.Println("║  RateLimit  → 基于 IP/Token 的限流                      ║")
	fmt.Println("║  Chain()    → 将多个中间件串联                           ║")
	fmt.Println("║  Gin: c.Next() / c.Abort() / c.Set() / c.Get()          ║")
	fmt.Println("╚════════════════════════════════════════════════════════════╝")
}

// Ensure imports from comments don't cause unused errors.
var _ = log.Println
var _ = time.Now
