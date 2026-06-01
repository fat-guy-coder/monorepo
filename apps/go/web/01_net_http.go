package web

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"
)

// RunNetHTTP 演示 Go 标准库 net/http 的核心用法。
//
// 内容包括：
//   - 基础 HTTP 服务器 (http.HandleFunc)
//   - 自定义 Handler 接口实现
//   - ServeMux 路由
//   - 查询参数与路径解析
//   - 请求体读取
//   - 响应头与 JSON 响应
//   - 不同 HTTP 方法处理
//   - 文件服务器
//   - 自定义 Server 配置与超时
func RunNetHTTP() {
	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("  01 · net/http 标准库")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

	// ============================================================
	// 1. 最简单的 HTTP 服务器
	// ============================================================
	fmt.Println("\n📌 1. 基础 HTTP 服务器 — http.HandleFunc")
	fmt.Println("   http.HandleFunc 是最快启动 HTTP 服务的方式。")
	fmt.Println("   每个路径模式对应一个处理函数 func(w http.ResponseWriter, r *http.Request)。")

	fmt.Println(`
// 示例代码:
//   http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
//       fmt.Fprintf(w, "Hello, World!")
//   })
//   http.ListenAndServe(":8080", nil)  // nil 表示使用 DefaultServeMux
`)

	// ============================================================
	// 2. 自定义 Handler 接口
	// ============================================================
	fmt.Println("📌 2. 自定义 Handler — 实现 http.Handler 接口")
	fmt.Println("   http.Handler 接口只有一个方法: ServeHTTP(ResponseWriter, *Request)")
	fmt.Println("   任何实现了该接口的类型都可以作为 HTTP 处理器。")

	fmt.Println(`
// 示例代码:
//   type MyHandler struct{ Name string }
//
//   func (h MyHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
//       fmt.Fprintf(w, "Hello from %s", h.Name)
//   }
//
//   http.ListenAndServe(":8080", MyHandler{Name: "Custom"})
`)

	// ============================================================
	// 3. ServeMux 路由
	// ============================================================
	fmt.Println("📌 3. ServeMux — 显式路由复用器")
	fmt.Println("   使用 http.NewServeMux() 创建独立的路由器，更灵活。")
	fmt.Println("   Go 1.22+ 支持路径参数模式如 GET /users/{id}。")

	fmt.Println(`
// 示例代码:
//   mux := http.NewServeMux()
//
//   // 传统风格 - 精确路径
//   mux.HandleFunc("/users", handleUsers)
//   mux.HandleFunc("/users/", handleUserByID) // 尾部斜杠匹配前缀
//
//   // Go 1.22+ 风格 - 支持方法和路径参数
//   mux.HandleFunc("GET /items/{id}", func(w http.ResponseWriter, r *http.Request) {
//       id := r.PathValue("id")
//       fmt.Fprintf(w, "Item ID: %s", id)
//   })
//
//   http.ListenAndServe(":8080", mux)
`)

	// ============================================================
	// 4. 查询参数与路径解析
	// ============================================================
	fmt.Println("📌 4. 查询参数 (Query Parameters)")
	fmt.Println("   使用 r.URL.Query() 获取 URL 中的查询字符串。")

	fmt.Println(`
// 示例代码:
//   func searchHandler(w http.ResponseWriter, r *http.Request) {
//       q := r.URL.Query()
//       keyword := q.Get("q")           // 获取单个值
//       page := q.Get("page")
//       tags := q["tag"]                // 同名多值参数
//
//       fmt.Printf("搜索: keyword=%s, page=%s, tags=%v\n", keyword, page, tags)
//   }
//
//   // 请求: GET /search?q=golang&page=2&tag=web&tag=backend
`)

	// 演示 Query() 解析
	fmt.Println("--- 演示: URL 查询参数解析 ---")
	demoURL := "http://example.com/search?q=golang&page=2&tag=web&tag=backend"
	fmt.Printf("   请求 URL: %s\n", demoURL)
	fmt.Println("   解析结果:")
	fmt.Println("     q    = \"golang\"")
	fmt.Println("     page = \"2\"")
	fmt.Println("     tag  = [\"web\", \"backend\"]")

	// ============================================================
	// 5. 请求体读取
	// ============================================================
	fmt.Println("\n📌 5. 请求体读取 — io.ReadAll")
	fmt.Println("   POST/PUT 请求的 body 通过 r.Body 读取，务必 r.Body.Close()。")

	fmt.Println(`
// 示例代码:
//   func createHandler(w http.ResponseWriter, r *http.Request) {
//       defer r.Body.Close()
//       body, err := io.ReadAll(r.Body)
//       if err != nil {
//           http.Error(w, "读取请求体失败", http.StatusBadRequest)
//           return
//       }
//       fmt.Printf("收到: %s\n", string(body))
//   }
`)

	// ============================================================
	// 6. 响应头与 JSON
	// ============================================================
	fmt.Println("📌 6. 设置响应头与 JSON 响应")
	fmt.Println("   w.Header().Set() 设置响应头。JSON 通过 json.NewEncoder(w).Encode() 返回。")

	fmt.Println(`
// 示例代码:
//   type User struct {
//       ID    int    ` + "`" + `json:"id"` + "`" + `
//       Name  string ` + "`" + `json:"name"` + "`" + `
//       Email string ` + "`" + `json:"email"` + "`" + `
//   }
//
//   func userHandler(w http.ResponseWriter, r *http.Request) {
//       w.Header().Set("Content-Type", "application/json; charset=utf-8")
//       w.Header().Set("X-Custom-Header", "my-value")
//
//       user := User{ID: 1, Name: "张三", Email: "zhang@example.com"}
//       w.WriteHeader(http.StatusOK)  // 200, 可省略（默认）
//       json.NewEncoder(w).Encode(user)
//   }
`)

	// 演示 JSON 序列化
	fmt.Println("--- 演示: JSON 响应体 ---")
	demoUser := map[string]interface{}{
		"id":    1,
		"name":  "张三",
		"email": "zhang@example.com",
	}
	jsonBytes, _ := json.MarshalIndent(demoUser, "    ", "  ")
	fmt.Printf("    响应 Body:\n    %s\n", string(jsonBytes))
	fmt.Println("    响应头: Content-Type=application/json; charset=utf-8")

	// ============================================================
	// 7. HTTP 方法
	// ============================================================
	fmt.Println("\n📌 7. 不同 HTTP 方法 (GET / POST / PUT / DELETE)")
	fmt.Println("   通过 r.Method 判断请求方法，服务于不同操作。")

	fmt.Println(`
// 示例代码:
//   func itemsHandler(w http.ResponseWriter, r *http.Request) {
//       switch r.Method {
//       case http.MethodGet:
//           // 查询 - 返回列表
//       case http.MethodPost:
//           // 创建 - 解析 body 并创建资源
//       case http.MethodPut:
//           // 更新 - 完整替换资源
//       case http.MethodDelete:
//           // 删除 - 移除资源
//       default:
//           http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
//       }
//   }
//
//   // Go 1.22+ 更推荐:
//   mux.HandleFunc("GET /items", listItems)
//   mux.HandleFunc("POST /items", createItem)
`)

	// ============================================================
	// 8. 文件服务器
	// ============================================================
	fmt.Println("📌 8. 文件服务器 — http.FileServer")
	fmt.Println("   http.FileServer 一行代码即可提供静态文件服务。")
	fmt.Println("   http.Dir 指定文件系统根目录。")

	fmt.Println(`
// 示例代码:
//   // 将 ./static 目录作为静态文件服务器
//   fs := http.FileServer(http.Dir("./static"))
//   http.Handle("/static/", http.StripPrefix("/static/", fs))
//
//   // 访问: http://localhost:8080/static/index.html → ./static/index.html
//
//   // 使用 embed 嵌入静态文件 (Go 1.16+):
//   // //go:embed static/*
//   // var staticFiles embed.FS
//   // fs := http.FileServer(http.FS(staticFiles))
`)

	// ============================================================
	// 9. 自定义 Server 配置
	// ============================================================
	fmt.Println("📌 9. 自定义 http.Server — 超时与高级配置")
	fmt.Println("   生产环境应自定义 http.Server 结构体而非使用默认值。")

	// 展示一个实际的 Server 配置结构
	serverConfig := &http.Server{
		Addr:         ":8080",
		Handler:      nil, // 使用 DefaultServeMux
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
		MaxHeaderBytes: 1 << 20, // 1MB
	}
	_ = serverConfig // 仅演示，不实际启动

	fmt.Println(`
// 示例代码:
//   srv := &http.Server{
//       Addr:           ":8080",
//       Handler:        mux,
//       ReadTimeout:    10 * time.Second,  // 读取请求超时
//       WriteTimeout:   10 * time.Second,  // 写入响应超时
//       IdleTimeout:    60 * time.Second,  // Keep-Alive 超时
//       MaxHeaderBytes: 1 << 20,           // 请求头最大 1MB
//   }
//   srv.ListenAndServe()
`)

	// ============================================================
	// 10. 请求信息展示（完整示例）
	// ============================================================
	fmt.Println("📌 10. 完整示例: 请求信息回声服务器")
	fmt.Println("   综合运用以上知识点，输出请求的完整信息。")

	fmt.Println(`
// 完整代码示例 — RequestInfoHandler:
//   func requestInfoHandler(w http.ResponseWriter, r *http.Request) {
//       // 读取请求体
//       defer r.Body.Close()
//       body, _ := io.ReadAll(r.Body)
//
//       // 构建响应
//       w.Header().Set("Content-Type", "application/json")
//       resp := map[string]interface{}{
//           "method": r.Method,
//           "url":    r.URL.String(),
//           "host":   r.Host,
//           "remote": r.RemoteAddr,
//           "headers": r.Header,
//           "query":   r.URL.Query(),
//           "body":    string(body),
//       }
//       json.NewEncoder(w).Encode(resp)
//   }
`)

	// ============================================================
	// 总结
	// ============================================================
	fmt.Println("\n╔════════════════════════════════════════════════════════════╗")
	fmt.Println("║  net/http 核心概念总结                                   ║")
	fmt.Println("╠════════════════════════════════════════════════════════════╣")
	fmt.Println("║  http.HandleFunc  → 快速注册路由处理函数                 ║")
	fmt.Println("║  http.Handler     → 接口，自定义处理器                   ║")
	fmt.Println("║  http.ServeMux    → 显式路由复用器                       ║")
	fmt.Println("║  ResponseWriter   → 写入状态码、头部、Body               ║")
	fmt.Println("║  *http.Request    → 读取方法、路径、参数、Body           ║")
	fmt.Println("║  http.FileServer  → 静态文件服务                         ║")
	fmt.Println("║  http.Server      → 生产级配置（超时等）                 ║")
	fmt.Println("╚════════════════════════════════════════════════════════════╝")

	fmt.Println("\n💡 提示: 使用 go run . web-server 启动一个真实运行的 Gin 服务器。")
}

// basicAuthCheck 是一个简单的辅助函数，在中间件章节也会用到。
// 放在这里使整个包都可以复用。
func basicAuthCheck(r *http.Request) bool {
	username, password, ok := r.BasicAuth()
	if !ok {
		return false
	}
	return username == "admin" && password == "secret"
}

// parseQueryDemo 用于统一展示查询解析的辅助函数（本文件内使用）。
func parseQueryDemo() {
	r, _ := http.NewRequest("GET", "http://example.com/search?q=golang&page=2&tag=web&tag=backend", nil)
	q := r.URL.Query()
	fmt.Printf("    Parsed query: q=%s page=%s tags=%v\n", q.Get("q"), q.Get("page"), q["tag"])
}

// Ensure unused imports don't cause issues (used in comments above).
var _ = io.ReadAll
var _ = strings.NewReader
var _ = json.NewEncoder
var _ = time.Now
