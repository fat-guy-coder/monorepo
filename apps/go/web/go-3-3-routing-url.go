package web

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
)

// RunRoutingUrl 演示 URL 解析与路由：url.Parse、ServeMux pattern、路径参数。
//
// 内容包括：
//   - URL 六段解剖（scheme / host / path / query / fragment）
//   - url.Parse 实际演示
//   - 三种参数来源：Path / Query / Form
//   - Go 1.22 ServeMux pattern：方法 + {id} 通配、r.PathValue
//   - 405 vs 404 的区别
//   - 最长匹配 + 具体优先的优先级规则
//   - Go 1.21 与 1.22 的路由能力对比
//
// 全程使用标准库，并通过 httptest 直接驱动真实 ServeMux 做演示。
func RunRoutingUrl() {
	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("  03 · 路由与 URL (url.Parse / ServeMux pattern)")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

	// ============================================================
	// 1. URL 六段解剖
	// ============================================================
	fmt.Println("\n📌 1. url.Parse——把 URL 拆成六段")
	fmt.Println("   一个 URL 由 scheme://host:port/path?query#fragment 组成。")
	fmt.Println("   url.Parse 全部分解好；Handler 里 r.URL 就是已解析的 *url.URL。")

	fmt.Println(`
// 示例代码:
//   u, err := url.Parse("https://api.example.com:8080/api/users/42?page=2#sec")
//   if err != nil { panic(err) }
//   fmt.Println(u.Scheme)      // https
//   fmt.Println(u.Host)        // api.example.com:8080
//   fmt.Println(u.Hostname())  // api.example.com
//   fmt.Println(u.Port())      // 8080
//   fmt.Println(u.Path)        // /api/users/42
//   fmt.Println(u.RawQuery)    // page=2
//   fmt.Println(u.Fragment)    // sec`)

	// 真实演示
	fmt.Println("--- 演示: url.Parse 实际解析 ---")
	u, err := url.Parse("https://api.example.com:8080/api/users/42?page=2&size=10#sec")
	if err != nil {
		fmt.Println("    解析失败:", err)
	} else {
		fmt.Printf("    Scheme   = %s\n", u.Scheme)
		fmt.Printf("    Host     = %s\n", u.Host)
		fmt.Printf("    Hostname = %s\n", u.Hostname())
		fmt.Printf("    Port     = %s\n", u.Port())
		fmt.Printf("    Path     = %s\n", u.Path)
		fmt.Printf("    RawQuery = %s\n", u.RawQuery)
		fmt.Printf("    Fragment = %s\n", u.Fragment)
		fmt.Printf("    Query(page) = %s\n", u.Query().Get("page"))
	}

	// ============================================================
	// 2. 三种参数来源
	// ============================================================
	fmt.Println("\n📌 2. 三种参数来源——Path / Query / Form")
	fmt.Println("   路径参数标识资源 (/users/42)、Query 做筛选分页 (?page=2)、表单传提交数据 (name=alice)。")

	fmt.Println(`
// 示例代码:
//   id := r.PathValue("id")        // /users/42 → "42"
//   q := r.URL.Query()
//   page := q.Get("page")          // "2"，不存在返回空串
//   r.ParseForm()
//   name := r.FormValue("name")    // POST Body 里的字段
//   请求: POST /users/42?page=2&size=10   Body: name=alice
//   输出: id=42 page=2 size=10 name=alice`)

	// ============================================================
	// 3. ServeMux pattern (Go 1.22+)
	// ============================================================
	fmt.Println("\n📌 3. ServeMux pattern——方法 + {id} 通配 (Go 1.22+)")
	fmt.Println("   pattern 格式: [METHOD ]/path/{wildcard}，方法可省略（省略则匹配所有方法）。")
	fmt.Println("   {id} 匹配单段（不含 /），{path...} 匹配多段。取值用 r.PathValue(\"id\")。")

	fmt.Println(`
// 示例代码:
//   mux := http.NewServeMux()
//   mux.HandleFunc("GET /api/users", listUsers)
//   mux.HandleFunc("GET /api/users/{id}", func(w http.ResponseWriter, r *http.Request) {
//       id := r.PathValue("id")
//       fmt.Fprintf(w, "get user %s", id)
//   })
//   mux.HandleFunc("GET /api/files/{path...}", ...)   // 多段通配
//   http.ListenAndServe(":8080", mux)`)

	// 真实演示 ServeMux + PathValue
	fmt.Println("--- 演示: 真实驱动 ServeMux 路由 + PathValue ---")
	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/users/{id}", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "get user %s (page=%s)", r.PathValue("id"), r.URL.Query().Get("page"))
	})
	mux.HandleFunc("POST /api/users", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "create user")
	})
	rr := httptest.NewRecorder()
	mux.ServeHTTP(rr, httptest.NewRequest("GET", "/api/users/42?page=2", nil))
	fmt.Printf("    GET /api/users/42?page=2 → %s\n", rr.Body.String())

	// ============================================================
	// 4. 405 vs 404
	// ============================================================
	fmt.Println("\n📌 4. 405 vs 404——方法不对还是路径不存在")
	fmt.Println("   405 = 路径命中但方法未注册（自动带 Allow 头）；404 = 路径本身未注册。")
	fmt.Println("   一句话：405 = 找对了门但钥匙不对；404 = 根本没有这扇门。")

	// 真实演示
	fmt.Println("--- 演示: 同一 mux 下三种请求 ---")
	rr = httptest.NewRecorder()
	mux.ServeHTTP(rr, httptest.NewRequest("GET", "/api/users/42", nil))
	fmt.Printf("    GET    /api/users/42 → %d\n", rr.Code)
	rr = httptest.NewRecorder()
	mux.ServeHTTP(rr, httptest.NewRequest("DELETE", "/api/users/42", nil))
	fmt.Printf("    DELETE /api/users/42 → %d (路径命中方法不对)\n", rr.Code)
	rr = httptest.NewRecorder()
	mux.ServeHTTP(rr, httptest.NewRequest("GET", "/api/nothing", nil))
	fmt.Printf("    GET    /api/nothing  → %d (路径未注册)\n", rr.Code)

	// ============================================================
	// 5. 最长匹配优先级
	// ============================================================
	fmt.Println("\n📌 5. 优先级与最长匹配")
	fmt.Println("   多个 pattern 都可能命中时，ServeMux 用「最长匹配 + 具体优先」裁决：")
	fmt.Println("   精确 > 单段通配 > 多段通配 > 尾斜杠子树 > 根兜底。")

	fmt.Println(`
// 优先级表 (高 → 低):
//   1 精确        "/api/users"
//   2 单段通配    "/api/users/{id}"
//   3 多段通配    "/files/{path...}"
//   4 尾斜杠子树  "/api/"
//   5 根兜底      "/"
// 请求 "/api/users/42"    → {id} 胜出（比子树更具体）
// 请求 "/api/users/42/x"  → 子树兜底（{id} 只匹配一段）`)

	// 真实演示最长匹配
	fmt.Println("--- 演示: 注册多层 pattern，看谁胜出 ---")
	pmux := http.NewServeMux()
	pmux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) { fmt.Fprint(w, "ROOT") })
	pmux.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) { fmt.Fprint(w, "SUBTREE") })
	pmux.HandleFunc("GET /api/users", func(w http.ResponseWriter, r *http.Request) { fmt.Fprint(w, "EXACT") })
	pmux.HandleFunc("GET /api/users/{id}", func(w http.ResponseWriter, r *http.Request) { fmt.Fprint(w, "ID:"+r.PathValue("id")) })
	pmux.HandleFunc("GET /api/files/{path...}", func(w http.ResponseWriter, r *http.Request) { fmt.Fprint(w, "PATH:"+r.PathValue("path")) })
	demoPaths := []string{"/other", "/api", "/api/users", "/api/users/42", "/api/users/42/x", "/api/files/a/b"}
	for _, p := range demoPaths {
		rr := httptest.NewRecorder()
		pmux.ServeHTTP(rr, httptest.NewRequest("GET", p, nil))
		fmt.Printf("    %-18s → %s\n", p, rr.Body.String())
	}

	// ============================================================
	// 6. Go 1.22 路由增强
	// ============================================================
	fmt.Println("\n📌 6. Go 1.22 路由增强——为什么不用装 Gin")
	fmt.Println("   1.21 之前 ServeMux 不匹配方法、不能取路径参数，得手写 if + 切分字符串。")

	// 真实演示旧写法
	fmt.Println("--- 演示: 1.21 时代手写方法判断 + 切分路径 ---")
	oldReq := httptest.NewRequest("GET", "/users/42", nil)
	parts := strings.Split(oldReq.URL.Path, "/")
	if oldReq.Method == "GET" && len(parts) >= 3 {
		fmt.Printf("    手写解析结果: user id = %s\n", parts[2])
	}

	fmt.Println(`
// Go 1.22+ 标准库一步到位:
//   mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
//       fmt.Fprintf(w, "user %s", r.PathValue("id"))
//   })
// 对照:
//   Gin:      r.GET("/users/:id", ...) + c.Param("id")
//   net/http: mux.HandleFunc("GET /users/{id}", ...) + r.PathValue("id")
//   Express:  app.get("/users/:id", ...) + req.params.id`)

	// ============================================================
	// 7. 常见坑
	// ============================================================
	fmt.Println("\n📌 7. 常见坑——路由相关的 5 个陷阱")
	fmt.Println("   ① {id} 不匹配含 / 的路径（多段用 {path...}）")
	fmt.Println("   ② 通配符名冲突注册时 panic（同位置两个不同名的通配符）")
	fmt.Println("   ③ 方法不匹配应返回 405 而非 404")
	fmt.Println("   ④ Query 取不到返回空串不是报错，自己给默认值")
	fmt.Println("   ⑤ url.Parse 不校验合法性，严格场景要检查 u.Host / scheme 白名单")

	// ============================================================
	// 总结
	// ============================================================
	fmt.Println("\n╔════════════════════════════════════════════════════════════╗")
	fmt.Println("║  路由与 URL 核心概念总结                                   ║")
	fmt.Println("╠════════════════════════════════════════════════════════════╣")
	fmt.Println("║  url.Parse         → 拆出 scheme/host/path/query/fragment  ║")
	fmt.Println("║  r.URL.Query()     → 查询参数                              ║")
	fmt.Println("║  ServeMux pattern  → METHOD /path/{id} (Go 1.22+)          ║")
	fmt.Println("║  r.PathValue(\"id\") → 取路径参数                           ║")
	fmt.Println("║  405 = 方法不对 · 404 = 路径不存在                         ║")
	fmt.Println("║  精确 > 通配 > 子树 > 根兜底（最长匹配优先）                ║")
	fmt.Println("╚════════════════════════════════════════════════════════════╝")

	fmt.Println("\n💡 提示: 小项目优先用标准库 ServeMux，升级 Go 1.22 就能白嫖路由增强。")
}
