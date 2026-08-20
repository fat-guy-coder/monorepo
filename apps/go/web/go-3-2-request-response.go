package web

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
)

// RunRequestResponse 演示 HTTP 请求与响应：*http.Request 与 http.ResponseWriter。
//
// 内容包括：
//   - 报文 → *http.Request 对象的字段映射
//   - 读取 Query 与 Header
//   - Body 读取（只读一次、Close）
//   - JSON 请求体解码
//   - ResponseWriter 写响应（Header → 状态码 → Body）
//   - 常见坑（Body 只读一次 / MaxBytesReader 限流等）
//
// 全程使用标准库，并通过 httptest 构造请求 / 捕获响应做真实演示。
func RunRequestResponse() {
	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("  02 · 请求与响应 (*http.Request / ResponseWriter)")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

	// ============================================================
	// 1. 报文 → Request 对象
	// ============================================================
	fmt.Println("\n📌 1. HTTP 报文 → *http.Request 对象")
	fmt.Println("   Go 的 net/http 把浏览器发来的纯文本报文解析成结构化对象：")
	fmt.Println("     请求行  →  r.Method / r.URL / r.Proto")
	fmt.Println("     Header  →  r.Header (http.Header，map 可多值)")
	fmt.Println("     Body    →  r.Body (io.ReadCloser，只能读一次)")
	fmt.Println("   r.URL 是 *url.URL，可继续拆出 Path 与 Query。")

	fmt.Println(`
// 示例代码:
//   func handler(w http.ResponseWriter, r *http.Request) {
//       path := r.URL.Path       // /users/42
//       q    := r.URL.Query()    // url.Values
//       host := r.Header.Get("Host")
//       id   := r.PathValue("id")   // Go 1.22+ 的 {id} 通配
//       ip   := r.RemoteAddr
//   }
//   假设请求: POST /users/42?page=2&size=10
//   输出:
//   path=/users/42 page=2 size=10 id=42
//   Host: localhost:8080`)

	// 真实演示：构造一个请求并解剖字段
	fmt.Println("--- 演示: 用 httptest.NewRequest 构造请求并解剖字段 ---")
	req := httptest.NewRequest("POST", "http://localhost:8080/users/42?page=2&size=10",
		strings.NewReader(`{"name":"alice"}`))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer secret-token")
	fmt.Printf("    Method      = %s\n", req.Method)
	fmt.Printf("    URL.Path    = %s\n", req.URL.Path)
	fmt.Printf("    Query(page) = %s\n", req.URL.Query().Get("page"))
	fmt.Printf("    Header Get  = %s\n", req.Header.Get("Authorization"))
	fmt.Printf("    RemoteAddr  = %s\n", req.RemoteAddr)
	fmt.Printf("    Proto       = %s\n", req.Proto)

	// ============================================================
	// 2. 读取 Query 与 Header
	// ============================================================
	fmt.Println("\n📌 2. 读取 Query 与 Header")
	fmt.Println("   Query 参数在 URL 的 ? 后面，用 r.URL.Query() 拿到 url.Values（map[string][]string）。")
	fmt.Println("   Header 用 Get(key) 取单值（key 大小写不敏感）；同名多值用 q[\"tag\"] 取整个切片。")

	fmt.Println(`
// 示例代码:
//   q := r.URL.Query()
//   page := q.Get("page")         // "2"（不存在返回空串）
//   tags := q["tag"]              // []string{"a","b"} 同名多值
//   if page == "" { page = "1" }  // 手动给默认值
//
//   auth := r.Header.Get("Authorization")   // "Bearer xxx"
//   请求: GET /search?page=2&tag=web&tag=backend`)

	// 真实演示 Query 多值
	fmt.Println("--- 演示: 同名多值 Query 参数 ---")
	req2 := httptest.NewRequest("GET", "http://example.com/search?page=2&tag=web&tag=backend", nil)
	q := req2.URL.Query()
	fmt.Printf("    page = %q\n", q.Get("page"))
	fmt.Printf("    tag  = %v\n", q["tag"])

	// ============================================================
	// 3. 读取 Body
	// ============================================================
	fmt.Println("\n📌 3. 读取 Body——只读一次 + 用完 Close")
	fmt.Println("   r.Body 是 io.ReadCloser：流式、只能读一次、用完要 Close。")
	fmt.Println("   一次读完用 io.ReadAll；要再读必须 io.NopCloser(bytes.NewReader(body)) 重置。")

	fmt.Println(`
// 示例代码:
//   defer r.Body.Close()
//   body, err := io.ReadAll(r.Body)
//   if err != nil { http.Error(w, "bad body", 400); return }
//   fmt.Printf("收到: %s\n", string(body))`)

	// 真实演示：读一次 + 第二次读是空的
	fmt.Println("--- 演示: Body 只能读一次 ---")
	req3 := httptest.NewRequest("POST", "/", strings.NewReader("hello body"))
	b1, _ := io.ReadAll(req3.Body)
	b2, _ := io.ReadAll(req3.Body)
	fmt.Printf("    第一次读: %q\n", string(b1))
	fmt.Printf("    第二次读: %q（已 EOF，流不可重放）\n", string(b2))
	// 重置演示
	req3.Body = io.NopCloser(bytes.NewReader(b1))
	b3, _ := io.ReadAll(req3.Body)
	fmt.Printf("    重置后可再读: %q\n", string(b3))
	req3.Body.Close()
	fmt.Println("    显式 Close() 释放连接资源（服务端虽会自动关，但约定要养成）")

	// ============================================================
	// 4. JSON 请求体解码
	// ============================================================
	fmt.Println("\n📌 4. JSON 请求体解码——json.NewDecoder")
	fmt.Println("   流式解码最推荐：json.NewDecoder(r.Body).Decode(&obj)，错误自动处理。")
	fmt.Println("   表单: r.ParseForm() → r.FormValue(k)；文件: r.FormFile(\"avatar\")。")

	fmt.Println(`
// 示例代码:
//   type CreateUserReq struct {
//       Name  string ` + "`" + `json:"name"` + "`" + `
//       Email string ` + "`" + `json:"email"` + "`" + `
//   }
//   var req CreateUserReq
//   if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
//       http.Error(w, "invalid json: "+err.Error(), http.StatusBadRequest)
//       return
//   }
//   // 解码后: req.Name="Alice" req.Email="a@b.com"`)

	// 真实演示：从 Body 解码 JSON
	fmt.Println("--- 演示: 从 Body 解码 JSON ---")
	type userReq struct {
		Name  string `json:"name"`
		Email string `json:"email"`
	}
	req4 := httptest.NewRequest("POST", "/users", strings.NewReader(`{"name":"Alice","email":"a@b.com"}`))
	var ur userReq
	if err := json.NewDecoder(req4.Body).Decode(&ur); err != nil {
		fmt.Printf("    解码失败: %v\n", err)
	} else {
		fmt.Printf("    解码结果: Name=%s Email=%s\n", ur.Name, ur.Email)
	}

	// ============================================================
	// 5. ResponseWriter 写响应
	// ============================================================
	fmt.Println("\n📌 5. ResponseWriter——Header → WriteHeader → Write")
	fmt.Println("   写响应顺序固定: ① Header ② 状态码 ③ Body。JSON 用 json.NewEncoder(w)。")
	fmt.Println("   顺序错了：WriteHeader 之后再 Set Header 不生效（响应头已定型）。")

	fmt.Println(`
// 示例代码:
//   w.Header().Set("Content-Type", "application/json; charset=utf-8")
//   w.WriteHeader(http.StatusCreated)   // 201
//   json.NewEncoder(w).Encode(user)     // 流式，自动换行
//
//   // 错误场景:
//   http.Error(w, "user not found", http.StatusNotFound) // 404 纯文本`)

	// 真实演示：用 httptest.NewRecorder 捕获响应
	fmt.Println("--- 演示: 用 httptest.NewRecorder 捕获响应 ---")
	rr := httptest.NewRecorder()
	writeJSON := func(w http.ResponseWriter, status int, v any) {
		w.Header().Set("Content-Type", "application/json; charset=utf-8")
		w.WriteHeader(status)
		json.NewEncoder(w).Encode(v)
	}
	writeJSON(rr, http.StatusCreated, map[string]any{"id": 42, "name": "Alice"})
	fmt.Printf("    状态码      = %d\n", rr.Code)
	fmt.Printf("    Content-Type = %s\n", rr.Header().Get("Content-Type"))
	fmt.Printf("    Body         = %s\n", strings.TrimSpace(rr.Body.String()))

	// ============================================================
	// 6. 常见坑
	// ============================================================
	fmt.Println("\n📌 6. 常见坑——必踩的 4 个坑")
	fmt.Println("   坑1 Body 只能读一次；坑2 要显式 Close；")
	fmt.Println("   坑3 WriteHeader 后 Set Header 无效；坑4 不设 Body 大小限制。")
	fmt.Println("   用 http.MaxBytesReader(w, r.Body, 1<<20) 限制 Body 为 1MB。")

	// 真实演示：MaxBytesReader 限制
	fmt.Println("--- 演示: http.MaxBytesReader 限制 Body 大小 ---")
	rr2 := httptest.NewRecorder()
	big := httptest.NewRequest("POST", "/", strings.NewReader("0123456789abcdef"))
	limited := http.MaxBytesReader(rr2, big.Body, 8)
	_, err := io.ReadAll(limited)
	var maxErr *http.MaxBytesError
	if errors.As(err, &maxErr) {
		fmt.Printf("    Body 超限被拒: %v\n", err)
		fmt.Printf("    最大限制     = %d 字节\n", maxErr.Limit)
	}

	// ============================================================
	// 总结
	// ============================================================
	fmt.Println("\n╔════════════════════════════════════════════════════════════╗")
	fmt.Println("║  请求与响应 核心概念总结                                   ║")
	fmt.Println("╠════════════════════════════════════════════════════════════╣")
	fmt.Println("║  *http.Request   → 报文的结构化视图 (Method/URL/Header/Body) ║")
	fmt.Println("║  r.URL.Query()   → 查询参数 (Get 取单值 / [k] 取多值)        ║")
	fmt.Println("║  r.Body          → io.ReadCloser，只读一次、用完 Close      ║")
	fmt.Println("║  json.NewDecoder → 流式解码 JSON 请求体                    ║")
	fmt.Println("║  ResponseWriter  → Header → WriteHeader → Write            ║")
	fmt.Println("║  json.NewEncoder → 流式写 JSON 响应                       ║")
	fmt.Println("║  MaxBytesReader  → 限制 Body 大小防拖垮内存                ║")
	fmt.Println("╚════════════════════════════════════════════════════════════╝")

	fmt.Println("\n💡 提示: 想真实跑起来，把上面的 Handler 挂到 http.HandleFunc 再启动服务即可。")
}
