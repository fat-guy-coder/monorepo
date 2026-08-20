package web

import (
	"fmt"
	"strings"
)

// ginCtx 用标准库模拟 Gin 的 *gin.Context 里 c.Set/c.Get 的传值机制（仅教学演示）。
type ginCtx struct {
	data map[string]any
}

func newGinCtx() *ginCtx { return &ginCtx{data: map[string]any{}} }

// Set 存入任意类型到 Context。
func (c *ginCtx) Set(k string, v any) { c.data[k] = v }

// GetInt 类型安全地取回 int，不存在的 key 返回零值。
func (c *ginCtx) GetInt(k string) int {
	if n, ok := c.data[k].(int); ok {
		return n
	}
	return 0
}

// GetString 类型安全地取回 string，不存在的 key 返回空串。
func (c *ginCtx) GetString(k string) string {
	if s, ok := c.data[k].(string); ok {
		return s
	}
	return ""
}

// simpleRule 用标准库模拟 binding 标签的极小校验实现（required / min / max / email）。
// 让读者在无 Gin 依赖的环境下也能看到「规则校验」的真实输出。
func simpleRule(rule, v string) bool {
	switch {
	case rule == "required":
		return v != ""
	case strings.HasPrefix(rule, "min="):
		var n int
		fmt.Sscanf(rule, "min=%d", &n)
		return len(v) >= n
	case strings.HasPrefix(rule, "max="):
		var n int
		fmt.Sscanf(rule, "max=%d", &n)
		return len(v) <= n
	case rule == "email":
		return strings.Contains(v, "@")
	}
	return true
}

// RunGinAdvanced 演示 Gin 进阶：Context 传值、参数校验、自定义校验器、Abort、中间件、错误处理。
//
// 注意: Gin 是第三方依赖（go get github.com/gin-gonic/gin），本文件只把 Gin 代码作为
// 教学注释字符串打印出来（与 go-3-5 一致），真实演示则用标准库模拟其核心机制。
func RunGinAdvanced() {
	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("  06 · Gin 进阶 (Context / 校验 / Abort / 中间件)")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

	// ============================================================
	// 1. Context 基础
	// ============================================================
	fmt.Println("\n📌 1. Context——请求的“全局对象”")
	fmt.Println("   每个请求一个 *gin.Context，承载请求数据、响应、传值、控制流。")
	fmt.Println("   c.Param / c.Query / c.PostForm / c.GetHeader / c.ClientIP 读取请求信息。")

	fmt.Println(`
// Gin 代码示例:
//   r.GET("/user/:id", func(c *gin.Context) {
//       id   := c.Param("id")                  // 路径参数
//       page := c.DefaultQuery("page", "1")    // query 带默认值
//       token:= c.GetHeader("Authorization")   // 请求头
//       ip   := c.ClientIP()                   // 客户端 IP
//       c.JSON(200, gin.H{"id": id, "page": page, "token": token, "ip": ip})
//   })
// curl '/user/7?page=2' -H 'Authorization: Bearer abc'
// 输出: {"id":"7","page":"2","token":"Bearer abc","ip":"127.0.0.1"}`)

	// ============================================================
	// 2. c.Set / c.Get
	// ============================================================
	fmt.Println("\n📌 2. c.Set / c.Get——中间件链里传值")
	fmt.Println("   中间件把计算结果放进 Context (c.Set)，后续中间件和 Handler 再取出 (c.Get)。")
	fmt.Println("   还有类型安全方法: c.GetString / c.GetInt / c.GetBool / c.GetStringSlice。")
	fmt.Println("   ⚠️ Context 按请求隔离，一个请求 Set 的数据另一个请求看不到。")

	// 真实演示：模拟 auth 中间件 Set、Handler Get
	fmt.Println("--- 演示: 用标准库模拟 c.Set/c.Get 的传值机制 ---")
	ctx := newGinCtx()
	// 模拟 Auth 中间件
	ctx.Set("userID", 42)
	ctx.Set("userName", "alice")
	// 模拟 Handler 读取
	fmt.Printf("    Handler 读到 userID=%d userName=%s\n", ctx.GetInt("userID"), ctx.GetString("userName"))
	fmt.Printf("    不存在的 key 返回零值: GetInt(\"nope\")=%d\n", ctx.GetInt("nope"))

	fmt.Println(`
// Gin 代码示例:
//   func Auth() gin.HandlerFunc {
//       return func(c *gin.Context) {
//           token := c.GetHeader("Authorization")
//           if token == "" {
//               c.AbortWithStatusJSON(401, gin.H{"error": "unauthorized"})
//               return
//           }
//           c.Set("userID", 42)
//           c.Set("userName", "alice")
//           c.Next()
//       }
//   }
//   r.Use(Auth())
//   r.GET("/me", func(c *gin.Context) {
//       uid := c.GetInt("userID")
//       c.JSON(200, gin.H{"uid": uid, "name": c.GetString("userName")})
//   })
// 输出: {"uid":42,"name":"alice"}`)

	// ============================================================
	// 3. 参数绑定校验
	// ============================================================
	fmt.Println("\n📌 3. 参数绑定校验——binding 标签 ≈ Zod / Yup")
	fmt.Println("   ShouldBindJSON 先反序列化进结构体，再按 binding 标签逐条校验。")
	fmt.Println("   常用规则: required / omitempty / min / max / gte / lte / email / oneof。")
	fmt.Println("   ⚠️ required 对 int 0、string \"\"、nil 都视为缺失；0 合法时用 omitempty 或 *int。")

	// 真实演示：模拟校验规则
	fmt.Println("--- 演示: 用标准库模拟 required/min/max/email 校验 ---")
	cases := []struct{ name, rule, val string }{
		{"空用户名", "required", ""},
		{"短密码", "min=6", "123"},
		{"坏邮箱", "email", "abc"},
		{"好邮箱", "email", "a@b.com"},
		{"长标题", "max=5", "abcdef"},
	}
	for _, c := range cases {
		fmt.Printf("    %-8s 规则=%-8s 值=%q → %v\n", c.name, c.rule, c.val, simpleRule(c.rule, c.val))
	}

	fmt.Println(`
// Gin 代码示例:
//   type CreateUserReq struct {
//       Name  string ` + "`" + `json:"name" binding:"required,min=2,max=50"` + "`" + `
//       Email string ` + "`" + `json:"email" binding:"required,email"` + "`" + `
//       Age   int    ` + "`" + `json:"age" binding:"gte=0,lte=150"` + "`" + `
//   }
//   func createUser(c *gin.Context) {
//       var req CreateUserReq
//       if err := c.ShouldBindJSON(&req); err != nil {
//           c.JSON(400, gin.H{"error": err.Error()})  // 校验失败
//           return
//       }
//       c.JSON(200, gin.H{"created": req.Name})
//   }`)

	// ============================================================
	// 4. 自定义校验器
	// ============================================================
	fmt.Println("\n📌 4. 自定义校验器——RegisterValidation")
	fmt.Println("   binding.Validator.Engine().(*validator.Validate) 拿到底层引擎，")
	fmt.Println("   再用 RegisterValidation(\"phone\", 函数) 注册自定义规则，在 init() 里执行一次。")

	fmt.Println(`
// Gin 代码示例:
//   var phoneValidator validator.Func = func(fl validator.FieldLevel) bool {
//       ok, _ := regexp.MatchString("^1[3-9]\\d{9}$", fl.Field().String())
//       return ok
//   }
//   func init() {
//       if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
//           v.RegisterValidation("phone", phoneValidator)
//       }
//   }
//   type RegReq struct {
//       Phone string ` + "`" + `json:"phone" binding:"required,phone"` + "`" + `
//   }`)

	// ============================================================
	// 5. Auth 中间件 + Abort 家族
	// ============================================================
	fmt.Println("\n📌 5. Auth 中间件 + c.Abort 家族——中断请求")
	fmt.Println("   中间件发现请求不合法时阻止后续 Handler: c.Abort() 只设标记，")
	fmt.Println("   c.AbortWithStatusJSON(code, obj) 中断 + 写 JSON（最常用）。")
	fmt.Println("   Abort 之后仍要 return，否则会继续往下走。")

	fmt.Println(`
// c.Abort()                只中断，不写响应
// c.AbortWithStatus(403)   中断 + 状态码
// c.AbortWithStatusJSON()  中断 + JSON（最常用）
// c.IsAborted()            查询是否被中断
//
// Gin 代码示例:
//   r.GET("/secure", AuthRequired(), func(c *gin.Context) {
//       c.JSON(200, gin.H{"secret": "ok"})
//   })
//   func AuthRequired() gin.HandlerFunc {
//       return func(c *gin.Context) {
//           if c.GetHeader("Authorization") == "" {
//               c.AbortWithStatusJSON(401, gin.H{"code": 401, "error": "请先登录"})
//               return   // 关键: Abort 后仍要 return
//           }
//           c.Next()
//       }
//   }
// 不带 Token 访问 /secure → {"code":401,"error":"请先登录"}（Handler 未执行）`)

	// ============================================================
	// 6. 静态文件 / HTML / JSONP
	// ============================================================
	fmt.Println("\n📌 6. 静态文件 / HTML 模板 / JSONP")
	fmt.Println("   r.Static 映射磁盘目录、LoadHTMLGlob + c.HTML 渲染模板、c.JSONP 支持老式跨域。")
	fmt.Println("   ⚠️ 模板要在 Run() 前加载；生产用 embed 把模板打进二进制。")

	fmt.Println(`
// Gin 代码示例:
//   r.Static("/static", "./public")            // /static/xxx → ./public/xxx
//   r.StaticFile("/favicon.ico", "./public/favicon.ico")
//   r.LoadHTMLGlob("templates/*.tmpl")
//   r.GET("/index", func(c *gin.Context) { c.HTML(200, "index.tmpl", gin.H{"title": "Gin 教程"}) })
//   r.GET("/jsonp", func(c *gin.Context) { c.JSONP(200, gin.H{"msg": "hi"}) })
// curl 'http://localhost:8080/jsonp?callback=myCallback'
// 输出: myCallback({"msg":"hi"});`)

	// ============================================================
	// 7. 错误处理
	// ============================================================
	fmt.Println("\n📌 7. 错误处理——统一响应 + Recovery 兜底")
	fmt.Println("   统一响应格式 {code, data, message}，封装 ok()/fail()；")
	fmt.Println("   自定义 Recovery 捕获 panic 返回 500，服务不崩溃。")
	fmt.Println("   ⚠️ 能预期到的错误全走 return，不要用 panic 做控制流。")

	fmt.Println(`
// Gin 代码示例:
//   func ok(c *gin.Context, data any) { c.JSON(200, gin.H{"code": 0, "data": data, "message": "ok"}) }
//   func fail(c *gin.Context, code int, msg string) {
//       c.JSON(code, gin.H{"code": code, "data": nil, "message": msg})
//   }
//   func Recovery() gin.HandlerFunc {
//       return func(c *gin.Context) {
//           defer func() {
//               if r := recover(); r != nil {
//                   log.Printf("panic recovered: %v", r)
//                   fail(c, http.StatusInternalServerError, "internal server error")
//                   c.Abort()
//               }
//           }()
//           c.Next()
//       }
//   }
// curl /boom → {"code":500,"data":null,"message":"internal server error"}（进程不崩溃）`)

	// ============================================================
	// 总结
	// ============================================================
	fmt.Println("\n╔════════════════════════════════════════════════════════════╗")
	fmt.Println("║  Gin 进阶 核心概念总结                                     ║")
	fmt.Println("╠════════════════════════════════════════════════════════════╣")
	fmt.Println("║  c.Set/c.Get       → 中间件链传值 (请求隔离)               ║")
	fmt.Println("║  ShouldBindJSON    → 绑定 + 校验，失败返回 400             ║")
	fmt.Println("║  binding:\"required\" → 声明式校验 ≈ Zod / Yup               ║")
	fmt.Println("║  RegisterValidation → 自定义校验器                         ║")
	fmt.Println("║  AbortWithStatusJSON → 中断请求 + 写 JSON                  ║")
	fmt.Println("║  r.Static / JSONP   → 静态服务 / 老式跨域                  ║")
	fmt.Println("║  ok()/fail()       → 统一响应 + Recovery 兜底 panic        ║")
	fmt.Println("╚════════════════════════════════════════════════════════════╝")

	fmt.Println("\n💡 提示: gin 是第三方依赖，本文件只打印教学代码；真实运行需 go get github.com/gin-gonic/gin。")
}
