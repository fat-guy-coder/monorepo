package web

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

// RunRestfulApi 演示 RESTful API 的设计规范与 Go 落地。
//
// 内容包括：
//   - REST 设计原则（名词资源 + 动词方法 + 状态码）
//   - 资源命名规范（复数、层级、查询参数）
//   - HTTP 方法映射表（GET / POST / PUT / PATCH / DELETE）
//   - 状态码语义与幂等性
//   - /api/v1 版本化
//   - 对照本项目 apps/backend 的真实菜单 API
//   - 统一返回格式 {code, message, data} 与 Go CRUD 落地
func RunRestfulApi() {
	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("  09 · RESTful API 设计")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

	// ============================================================
	// 1. REST 设计原则
	// ============================================================
	fmt.Println("\n📌 1. REST 设计原则 — 名词资源 + 动词方法 + 状态码")
	fmt.Println("   REST 把后端能力抽象成「资源」(Resource)：URL 用复数名词表示资源，")
	fmt.Println("   用 HTTP 方法（动词）表达操作，用状态码告诉前端「成功还是失败」。")
	fmt.Println("   相比 /getUser、/deleteUser 这种动词式 URL，同一套 URL 就能承载增删改查，")
	fmt.Println("   前端无需记忆一堆自定义动词，后端也好维护。")

	fmt.Println(`
// ❌ 动词式（不推荐）              ✅ RESTful（推荐）
//   GET  /getUser?id=42             GET    /users/42
//   GET  /deleteUser?id=42          DELETE /users/42
//   GET  /addUser                   POST   /users
//   GET  /updateUser                PUT    /users/42
`)
	fmt.Println("   REST 核心约定:")
	fmt.Println("   - 一切皆资源: 用户、订单、菜单都是名词")
	fmt.Println("   - 方法表达动作: GET 查 / POST 增 / PUT 改 / DELETE 删")
	fmt.Println("   - 无状态 Stateless: 每个请求自带全部信息，服务器不记上一次")
	fmt.Println("   - 统一接口: 同样的 URL + 方法，返回格式一致，前端代码可预测")

	// ============================================================
	// 2. 资源命名规范
	// ============================================================
	fmt.Println("\n📌 2. 资源命名规范 — 复数、层级、查询参数")
	fmt.Println("   集合用复数名词，单个资源加 /:id，子资源用路径层级表达。")

	// 真实演示：用 strings.Join 组装 RESTful URL
	base := strings.Join([]string{"/api", "v1"}, "/")
	listURL := base + "/users"
	detailURL := listURL + "/42"
	nestedURL := detailURL + "/orders"
	fmt.Println("--- 演示: 组装 RESTful 资源 URL ---")
	fmt.Printf("   列表 URL:   %s\n", listURL)
	fmt.Printf("   详情 URL:   %s\n", detailURL)
	fmt.Printf("   嵌套 URL:   %s   (42 号用户的订单)\n", nestedURL)
	fmt.Println("   查询参数只做「筛选 / 视图形态」，不改变语义:")
	fmt.Println("     /users?page=2&search=alice    → 分页 + 搜索")
	fmt.Println("     /api/menus?tree=true          → 树形视图")
	fmt.Println("     /api/menus?flat=true          → 扁平视图")

	// ============================================================
	// 3. HTTP 方法映射表
	// ============================================================
	fmt.Println("\n📌 3. HTTP 方法映射表 — CRUD 一张表")
	fmt.Println("   方法来自 net/http 常量 (http.MethodGet / MethodPost / ...)，真实迭代演示:")

	// 本地结构体类型，仅本函数使用
	type methodRow struct {
		action, method, url, semantics string
		idempotent                     bool
	}
	rows := []methodRow{
		{"列表", http.MethodGet, "/users", "获取用户列表（可带 ?page）", true},
		{"详情", http.MethodGet, "/users/42", "获取单个用户", true},
		{"创建", http.MethodPost, "/users", "新建用户 → 201 + 新资源", false},
		{"全量更新", http.MethodPut, "/users/42", "整体替换，缺的字段会清空", true},
		{"部分更新", http.MethodPatch, "/users/42", "只改传入的字段（更常用）", true},
		{"删除", http.MethodDelete, "/users/42", "删除 → 204 无内容", true},
	}
	for _, r := range rows {
		idem := "❌"
		if r.idempotent {
			idem = "✅"
		}
		fmt.Printf("     %-6s %-9s %-13s → %s (幂等 %s)\n",
			r.method, r.url, r.semantics, r.action, idem)
	}

	fmt.Println(`
// gin 落地对照——方法 + 路径决定语义:
//   users := r.Group("/api/v1/users")
//   {
//       users.GET("", listUsers)         // GET    /api/v1/users    查列表 (200)
//       users.GET("/:id", getUser)       // GET    /api/v1/users/42 查详情 (200)
//       users.POST("", createUser)       // POST   /api/v1/users    创建   (201)
//       users.PUT("/:id", updateUser)    // PUT    /api/v1/users/42 全量更新(200)
//       users.DELETE("/:id", deleteUser) // DELETE /api/v1/users/42 删除   (204)
//   }
//   // Go 1.22+ 标准库也能写方法路由:
//   mux.HandleFunc("GET /items", listItems)
//   mux.HandleFunc("POST /items", createItem)
`)

	// ============================================================
	// 4. 状态码语义
	// ============================================================
	fmt.Println("\n📌 4. HTTP 状态码语义 — 前端拦截器靠它分流")
	fmt.Println("   状态码是 REST 的「交流语言」：2xx 成功 / 4xx 客户端错 / 5xx 服务端错。")
	fmt.Println("   用 net/http 常量打印真实数值:")

	type codeRow struct {
		code  int
		text  string
		usage string
	}
	codes := []codeRow{
		{http.StatusOK, "OK", "GET/PUT 成功，带数据返回"},
		{http.StatusCreated, "Created", "POST 创建成功，返回新资源"},
		{http.StatusNoContent, "No Content", "DELETE 成功，无返回体"},
		{http.StatusBadRequest, "Bad Request", "参数校验 / JSON 解析失败"},
		{http.StatusUnauthorized, "Unauthorized", "未登录 / token 过期"},
		{http.StatusForbidden, "Forbidden", "已登录但没权限"},
		{http.StatusNotFound, "Not Found", "资源 / 路由不存在"},
		{http.StatusConflict, "Conflict", "唯一键冲突（用户名已存在）"},
		{http.StatusTooManyRequests, "Too Many Requests", "限流触发（见 3-12）"},
		{http.StatusInternalServerError, "Internal Server Error", "服务端 panic / 数据库挂了"},
	}
	for _, c := range codes {
		fmt.Printf("     %d  %-24s → %s\n", c.code, c.text, c.usage)
	}
	fmt.Println("   常见坑: 所有请求一律返回 200、错误塞进 body —— 前端拦截器无法按状态码分流（401 跳登录、429 退避），别这么做。")

	// ============================================================
	// 5. 幂等性
	// ============================================================
	fmt.Println("\n📌 5. 幂等性 — 为什么 POST 不能随便重试")
	fmt.Println("   幂等 = 同一个请求重复执行 N 次，结果和只执行 1 次一样。")
	fmt.Println("   GET / PUT / DELETE 天然幂等，POST 不幂等。数值演示:")

	// 非幂等: 每次 POST 都新增一条 → 结果随次数增长
	postCount := 0
	for i := 0; i < 3; i++ {
		postCount++ // POST /orders 连发 3 次
	}
	// 幂等: 每次 PUT 都是「置为同一个值」→ 结果恒定
	putValue := 0
	for i := 0; i < 3; i++ {
		putValue = 42 // PUT /orders/42 连发 3 次，值不变
	}
	fmt.Printf("     POST /orders  ×3  → 订单数 = %d   (重复创建，不可重试)\n", postCount)
	fmt.Printf("     PUT /orders/42 ×3  → 状态仍   = %d   (重复执行结果一致，可放心重试)\n", putValue)
	fmt.Println("   ⚠️ 「提交订单」别用 POST 无脑重试，否则可能下两单 → 用幂等键或前端防重复提交")

	// ============================================================
	// 6. 版本化 & apps/backend 菜单 API 对照
	// ============================================================
	fmt.Println("\n📌 6. 版本化 /api/v1 与 apps/backend 菜单 API 对照")
	fmt.Println("   API 一旦上线就会被前端 / App / 第三方引用，破坏性变更必须走版本号。")
	fmt.Println("   v1 保持兼容、v2 随便改，老客户端不受影响。")

	verLabel := map[string]string{
		"/api/v1/users":  "稳定版：只加不改不删，长期兼容",
		"/api/v2/users":  "新版：可破坏字段，供新客户端",
		"/api/v1/orders": "v1 订单（老 App 仍可用）",
	}
	vers := []string{"/api/v1/users", "/api/v2/users", "/api/v1/orders"}
	for _, v := range vers {
		fmt.Printf("     %-14s → %s\n", v, verLabel[v])
	}

	fmt.Println(`
// 🎯 对照本项目 apps/backend 真实菜单 API（Bun + Drizzle + PostgreSQL，端口 3000）
// 返回格式: { "code": 200, "message": "success", "data": ... }
//
// # 查询参数驱动同一接口返回不同形态 —— REST「一接口多形态」
// curl "http://localhost:3000/api/menus?tree=true"            # 树形（需登录）
// curl "http://localhost:3000/api/menus?flat=true"            # 扁平列表
// curl "http://localhost:3000/api/menus?flat=true&search=jwt" # 扁平 + 搜索
//
// # POST 创建（201）—— Windows 下用 --data-binary @file.json 避免中文乱码
// curl -X POST http://localhost:3000/api/menus \
//   -H "Content-Type: application/json" --data-binary @new-menu.json
//
// # PUT 更新 / DELETE 删除（DELETE 递归删除全部后代）
// curl -X PUT    http://localhost:3000/api/menus/菜单ID --data-binary @edit-menu.json
// curl -X DELETE http://localhost:3000/api/menus/菜单ID
// # 输出: {"code":200,"message":"已删除菜单及其 N 个后代","data":{...}}
`)

	// ============================================================
	// 7. 统一返回格式 + Go CRUD 落地
	// ============================================================
	fmt.Println("\n📌 7. Go 实现：统一返回格式 + CRUD 路由")
	fmt.Println("   所有接口返回统一结构 {code, message, data}，前端一个 axios 拦截器通吃。")
	fmt.Println("   真实演示: 用标准库 encoding/json 序列化统一响应:")

	// 真实演示：统一响应格式的序列化
	okResp := struct {
		Code    int         `json:"code"`
		Message string      `json:"message"`
		Data    interface{} `json:"data,omitempty"`
	}{Code: 0, Message: "ok", Data: map[string]interface{}{"id": 42, "name": "Alice"}}
	failResp := struct {
		Code    int    `json:"code"`
		Message string `json:"message"`
	}{Code: http.StatusNotFound, Message: "资源不存在"}

	okJSON, _ := json.MarshalIndent(okResp, "     ", "   ")
	failJSON, _ := json.Marshal(failResp)
	fmt.Println("   成功 → HTTP 200, body:")
	fmt.Printf("     %s\n", string(okJSON))
	fmt.Println("   失败 → HTTP 404, body:")
	fmt.Printf("     %s\n", string(failJSON))

	fmt.Println(`
// gin 完整 CRUD 落地（gin 代码，仅作注释参考）:
//   type User struct {
//       ID   int    ` + "`" + `json:"id"` + "`" + `
//       Name string ` + "`" + `json:"name"` + "`" + `
//   }
//
//   func createUser(c *gin.Context) {
//       var u User
//       if err := c.ShouldBindJSON(&u); err != nil {
//           c.JSON(400, gin.H{"code": 400, "message": "参数错误"})
//           return
//       }
//       c.JSON(201, gin.H{"code": 0, "message": "ok", "data": u})
//       // 输出: HTTP 201 {"code":0,"message":"ok","data":{"id":7,...}}
//   }
//
//   func getUser(c *gin.Context) {
//       id := c.Param("id")
//       user, ok := db.FindByID(id)
//       if !ok {
//           c.JSON(404, gin.H{"code": 404, "message": "用户不存在"})
//           return
//       }
//       c.JSON(200, gin.H{"code": 0, "message": "ok", "data": user})
//       // 输出: {"code":0,"message":"ok","data":{"id":42,"name":"Alice"}}
//   }
//
//   func deleteUser(c *gin.Context) {
//       id := c.Param("id")
//       db.Delete(id)
//       c.Status(204) // 无返回体，成功删除
//   }
//   // 幂等要点: PUT/DELETE 可放心重试；POST 需幂等键或前端防重复提交
`)

	// ============================================================
	// 总结
	// ============================================================
	fmt.Println("\n╔════════════════════════════════════════════════════════════╗")
	fmt.Println("║  RESTful API 设计要点总结                                 ║")
	fmt.Println("╠════════════════════════════════════════════════════════════╣")
	fmt.Println("║  REST = 名词(资源) + 动词(方法) + 状态码(结果)            ║")
	fmt.Println("║  资源命名    → 复数 /users，单个加 /:id，层级 /users/42/orders ║")
	fmt.Println("║  CRUD 映射   → GET 查 / POST 增 / PUT 改 / DELETE 删       ║")
	fmt.Println("║  状态码      → 200/201/204 成功，4xx 客户端，5xx 服务端    ║")
	fmt.Println("║  幂等性      → GET/PUT/DELETE 幂等，POST 不幂等            ║")
	fmt.Println("║  版本化      → /api/v1，破坏性变更走 v2                   ║")
	fmt.Println("║  统一返回    → {code, message, data}，前端一个拦截器通吃   ║")
	fmt.Println("║  真实对照    → apps/backend 的 /api/menus 就是标准 REST    ║")
	fmt.Println("╚════════════════════════════════════════════════════════════╝")

	fmt.Println("\n💡 提示: 真实项目可用 gin 的 r.Group 挂版本号；标准库 go 1.22+ 也能写方法路由。")
}
