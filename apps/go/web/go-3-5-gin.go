package web

import "fmt"

// RunGin 演示 Gin Web 框架的核心用法。
//
// 注意: 以下代码展示了 Gin 的完整 API 模式。
// Gin 已在 go.mod 中声明为依赖 (go get github.com/gin-gonic/gin)。
// 使用 go run . web-server 可启动真实的 Gin 服务器。
//
// 内容包括：
//   - Gin 路由初始化
//   - 路径参数 (:id) 与查询字符串
//   - 路由分组 (r.Group)
//   - JSON 绑定 (ShouldBindJSON)
//   - 表单绑定
//   - 验证标签
//   - 多种响应格式
//   - 自定义错误处理
func RunGin() {
	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("  02 · Gin Web 框架")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

	// ============================================================
	// 1. Gin 路由初始化
	// ============================================================
	fmt.Println("\n📌 1. Gin 引擎与基本路由")
	fmt.Println("   gin.Default() 创建带 Logger 和 Recovery 中间件的引擎。")
	fmt.Println("   gin.New() 创建不带中间件的空白引擎。")

	fmt.Println(`
// 代码示例:
//   import "github.com/gin-gonic/gin"
//
//   func main() {
//       r := gin.Default()  // 带默认中间件
//
//       r.GET("/ping", func(c *gin.Context) {
//           c.JSON(200, gin.H{"message": "pong"})
//       })
//
//       r.Run(":8080")  // 默认监听 :8080
//   }
`)

	// ============================================================
	// 2. 路径参数与查询字符串
	// ============================================================
	fmt.Println("📌 2. 路径参数 (:id) 与查询参数 (?key=val)")
	fmt.Println("   Param 获取路径参数，Query/DefaultQuery 获取查询参数。")

	fmt.Println(`
// 代码示例:
//   // 路径参数
//   r.GET("/users/:id", func(c *gin.Context) {
//       id := c.Param("id")         // /users/42 → "42"
//       c.String(200, "User ID: %s", id)
//   })
//
//   // 多级路径参数
//   r.GET("/users/:uid/posts/:pid", func(c *gin.Context) {
//       uid := c.Param("uid")
//       pid := c.Param("pid")
//       c.JSON(200, gin.H{"user": uid, "post": pid})
//   })
//
//   // 查询参数
//   r.GET("/search", func(c *gin.Context) {
//       keyword := c.Query("q")             // 无默认值
//       page := c.DefaultQuery("page", "1") // 默认 "1"
//       limit := c.DefaultQuery("limit", "20")
//
//       c.JSON(200, gin.H{
//           "keyword": keyword,
//           "page":    page,
//           "limit":   limit,
//       })
//   })
`)

	// ============================================================
	// 3. 路由分组
	// ============================================================
	fmt.Println("📌 3. 路由分组 (r.Group)")
	fmt.Println("   Group 将路由组织在一起，应用共享的中间件和路径前缀。")

	fmt.Println(`
// 代码示例:
//   // 公开 API
//   api := r.Group("/api")
//   {
//       api.GET("/health", healthCheck)
//       api.GET("/version", versionInfo)
//   }
//
//   // 需要认证的管理 API
//   admin := r.Group("/admin", authMiddleware())
//   {
//       admin.GET("/dashboard", adminDashboard)
//       admin.POST("/users", createUser)
//       admin.DELETE("/users/:id", deleteUser)
//   }
//
//   // v1 版本组
//   v1 := r.Group("/api/v1")
//   {
//       v1.GET("/articles", listArticlesV1)
//   }
//
//   // v2 版本组
//   v2 := r.Group("/api/v2")
//   {
//       v2.GET("/articles", listArticlesV2)
//   }
`)

	// ============================================================
	// 4. JSON 数据绑定
	// ============================================================
	fmt.Println("📌 4. JSON 请求体绑定 — ShouldBindJSON")
	fmt.Println("   ShouldBindJSON 将 JSON body 绑定到结构体，失败时返回 400。")

	fmt.Println(`
// 代码示例:
//   type CreateUserReq struct {
//       Name  string ` + "`" + `json:"name" binding:"required"` + "`" + `
//       Email string ` + "`" + `json:"email" binding:"required,email"` + "`" + `
//       Age   int    ` + "`" + `json:"age" binding:"gte=0,lte=130"` + "`" + `
//   }
//
//   r.POST("/users", func(c *gin.Context) {
//       var req CreateUserReq
//       if err := c.ShouldBindJSON(&req); err != nil {
//           c.JSON(400, gin.H{"error": err.Error()})
//           return
//       }
//
//       // 使用绑定后的数据
//       fmt.Printf("创建用户: %+v\n", req)
//       c.JSON(201, gin.H{"status": "created", "user": req})
//   })
//
//   // 请求示例:
//   //   POST /users
//   //   Content-Type: application/json
//   //   {"name": "张三", "email": "zhang@example.com", "age": 25}
`)

	// ============================================================
	// 5. 表单绑定
	// ============================================================
	fmt.Println("📌 5. 表单数据绑定 — ShouldBind")
	fmt.Println("   ShouldBind 自动检测 Content-Type 并选择合适的绑定器。")
	fmt.Println("   支持: JSON (application/json)、Form (application/x-www-form-urlencoded)、")
	fmt.Println("         Multipart (multipart/form-data)、Query 参数。")

	fmt.Println(`
// 代码示例:
//   type LoginForm struct {
//       Username string ` + "`" + `form:"username" binding:"required"` + "`" + `
//       Password string ` + "`" + `form:"password" binding:"required,min=6"` + "`" + `
//   }
//
//   r.POST("/login", func(c *gin.Context) {
//       var form LoginForm
//       if err := c.ShouldBind(&form); err != nil {
//           c.JSON(400, gin.H{"error": err.Error()})
//           return
//       }
//       // 处理登录逻辑...
//       c.JSON(200, gin.H{"message": "登录成功"})
//   })
//
//   // 文件上传
//   r.POST("/upload", func(c *gin.Context) {
//       file, err := c.FormFile("file")
//       if err != nil {
//           c.JSON(400, gin.H{"error": "未选择文件"})
//           return
//       }
//       dst := "./uploads/" + file.Filename
//       c.SaveUploadedFile(file, dst)
//       c.JSON(200, gin.H{"path": dst})
//   })
`)

	// ============================================================
	// 6. 验证标签
	// ============================================================
	fmt.Println("📌 6. 结构体验证 — binding 标签")
	fmt.Println("   Gin 集成了 validator 库，通过 struct tag 声明验证规则。")

	fmt.Println(`
// 常用 binding 标签:
//   required        - 必填
//   min=3           - 字符串最小长度 / 数字最小值
//   max=100         - 字符串最大长度 / 数字最大值
//   len=10          - 固定长度
//   eq=admin        - 等于
//   ne=             - 不等于
//   oneof=a b c     - 枚举
//   email           - 邮箱格式
//   url             - URL 格式
//   ip              - IP 地址
//   alpha           - 字母
//   alphanum        - 字母数字
//   numeric         - 数字字符串
//   datetime=2006-01-02  - 日期格式
//
//   自定义验证器:
//   import "github.com/go-playground/validator/v10"
//
//   if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
//       v.RegisterValidation("custom", func(fl validator.FieldLevel) bool {
//           return strings.HasPrefix(fl.Field().String(), "GO-")
//       })
//   }
`)

	// ============================================================
	// 7. 响应格式
	// ============================================================
	fmt.Println("📌 7. Gin 响应格式对比")
	fmt.Println("   Gin 提供多种便捷的响应方法。")

	fmt.Println(`
// 响应方法:
//   c.JSON(code, obj)    → application/json
//   c.XML(code, obj)     → application/xml
//   c.YAML(code, obj)    → application/yaml
//   c.String(code, fmt, args...) → text/plain
//   c.HTML(code, name, data)     → text/html (需加载模板)
//   c.IndentedJSON(code, obj)    → 格式化 JSON
//   c.Redirect(code, location)   → 重定向
//   c.File(filePath)             → 文件下载
//
// 示例:
//   // JSON
//   c.JSON(200, gin.H{"status": "ok", "data": items})
//
//   // 纯文本
//   c.String(200, "Hello %s", name)
//
//   // HTML 模板
//   r.LoadHTMLGlob("templates/*")
//   c.HTML(200, "index.tmpl", gin.H{"title": "首页"})
//
//   // 重定向
//   c.Redirect(http.StatusMovedPermanently, "/new-url")
//
//   // 文件
//   c.File("./downloads/report.pdf")
`)

	// ============================================================
	// 8. 错误处理
	// ============================================================
	fmt.Println("📌 8. Gin 错误处理")

	fmt.Println(`
// Gin 默认 Recovery 中间件已处理 panic。
// 自定义错误处理:

//   // 自定义 404 页面
//   r.NoRoute(func(c *gin.Context) {
//       c.JSON(404, gin.H{"error": "页面不存在"})
//   })
//
//   // 自定义 405 页面
//   r.NoMethod(func(c *gin.Context) {
//       c.JSON(405, gin.H{"error": "方法不允许"})
//   })
//
//   // 自定义错误格式
//   type AppError struct {
//       Code    int    ` + "`" + `json:"code"` + "`" + `
//       Message string ` + "`" + `json:"message"` + "`" + `
//   }
//
//   func respondError(c *gin.Context, code int, msg string) {
//       c.AbortWithStatusJSON(code, AppError{Code: code, Message: msg})
//   }
`)

	// ============================================================
	// 9. Gin 中间件使用
	// ============================================================
	fmt.Println("📌 9. Gin 中间件使用方式")

	fmt.Println(`
// 全局中间件:
//   r.Use(gin.Logger(), gin.Recovery(), corsMiddleware())
//
// 分组中间件:
//   auth := r.Group("/api")
//   auth.Use(authMiddleware())
//   {
//       auth.GET("/profile", profileHandler)
//   }
//
// 路由级别中间件:
//   r.GET("/secure", authMiddleware(), sensitiveHandler)
`)

	// ============================================================
	// 10. 绑定查询参数到结构体
	// ============================================================
	fmt.Println("📌 10. 查询参数绑定到结构体")

	fmt.Println(`
// 代码示例:
//   type ListQuery struct {
//       Page  int    ` + "`" + `form:"page" binding:"min=1"` + "`" + `
//       Limit int    ` + "`" + `form:"limit" binding:"min=1,max=100"` + "`" + `
//       Sort  string ` + "`" + `form:"sort"` + "`" + `
//   }
//
//   r.GET("/items", func(c *gin.Context) {
//       var q ListQuery
//       if err := c.ShouldBindQuery(&q); err != nil {
//           c.JSON(400, gin.H{"error": err.Error()})
//           return
//       }
//       // 默认值
//       if q.Page == 0 { q.Page = 1 }
//       if q.Limit == 0 { q.Limit = 20 }
//
//       c.JSON(200, gin.H{"page": q.Page, "limit": q.Limit, "sort": q.Sort})
//   })
`)

	// ============================================================
	// 总结
	// ============================================================
	fmt.Println("\n╔════════════════════════════════════════════════════════════╗")
	fmt.Println("║  Gin 框架核心概念总结                                    ║")
	fmt.Println("╠════════════════════════════════════════════════════════════╣")
	fmt.Println("║  gin.Default()         → 创建引擎 (Logger + Recovery)    ║")
	fmt.Println("║  c.Param(":id")        → 路径参数                        ║")
	fmt.Println("║  c.Query("key")        → 查询参数                        ║")
	fmt.Println("║  r.Group("/prefix")    → 路由分组                        ║")
	fmt.Println("║  c.ShouldBindJSON(&s)  → JSON 绑定 + 验证                ║")
	fmt.Println("║  c.ShouldBind(&s)      → 自动检测类型绑定                ║")
	fmt.Println("║  binding:"required"    → 验证标签                        ║")
	fmt.Println("║  c.JSON/XML/String     → 多种响应格式                   ║")
	fmt.Println("║  r.Use(middleware)     → 全局中间件                      ║")
	fmt.Println("║  c.AbortWithStatusJSON → 中断并返回错误                  ║")
	fmt.Println("╚════════════════════════════════════════════════════════════╝")
}
