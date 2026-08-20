package web

import (
	"encoding/json"
	"fmt"
	"strings"
)

// RunSwagger 演示 Swagger / OpenAPI 文档自动生成。
//
// 内容包括：
//   - Swagger / OpenAPI 两个名字的含义
//   - 安装 swag + swag init 生成 docs/
//   - swag 注解清单（@Summary / @Param / @Success / @Router 等）
//   - 集成 http-swagger / gin-swagger
//   - swagger.json 结构（paths + components/schemas）
//   - 为什么用 OpenAPI + 文档最佳实践
//
// 说明：swaggo/swag、swaggo/http-swagger、swaggo/gin-swagger 均为第三方工具，
// 本项目无第三方依赖，相关代码以注释字符串形式打印；用标准库 json/strings
// 真实演示 swagger.json 结构与注解解析。
func RunSwagger() {
	fmt.Println("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
	fmt.Println("  01 · Swagger / OpenAPI 文档")
	fmt.Println("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

	// ============================================================
	// 1. Swagger / OpenAPI 是什么
	// ============================================================
	fmt.Println("\n📌 1. Swagger / OpenAPI — 先理清两个名字")
	fmt.Println("   OpenAPI 是一套描述 HTTP API 的标准规范（JSON/YAML），规定接口的路径、")
	fmt.Println("   参数、响应、鉴权怎么描述。Swagger 是围绕这套规范的工具全家桶：")
	fmt.Println("   Swagger UI 是渲染成网页的可视化工具，Editor/Codegen 负责生成文档或 SDK。")
	fmt.Println("   Go 这边最流行的是 swaggo/swag（生成器）+ swaggo/http-swagger（托管器）。")

	fmt.Println(`
// 为什么好:
//   ① 规范化——行业标准，不管后端用 Go/Python/Java，描述格式统一
//   ② 可交互——Swagger UI 上能直接 Try it out：填参数、点发送、看真实响应
//   ③ 可复用——swagger.json 是纯数据，能生成客户端 SDK、导入 Postman、喂给 mock 服务
`)

	fmt.Println("   前端类比: Swagger 注解 ≈ NestJS 的 @ApiTags/@ApiOperation 装饰器、")
	fmt.Println("   TS 的 tsoa、Express 的 swagger-jsdoc——都是\"写代码时顺手声明 API 元数据\"。")

	// ============================================================
	// 2. 安装与 swag init
	// ============================================================
	fmt.Println("\n📌 2. 安装 swag + 第一次生成")
	fmt.Println("   swag 是命令行工具。装好后在项目根目录跑 swag init，它会扫描入口文件")
	fmt.Println("   （main）和所有含注解的 handler，生成 docs/ 目录（swagger.json / docs.go）。")

	fmt.Println(`
// 安装与生成（命令行，第三方工具）:
//   go install github.com/swaggo/swag/cmd/swag@latest
//
//   swag init                 # 在含 main.go 的位置生成 docs/
//   swag init -g cmd/server/main.go   # main 不在根目录时指定入口
//
//   // docs.go 里用 //go:embed 把 JSON 打包，所以记得空导入：
//   import _ "你的项目/docs"
`)

	fmt.Println(`
// 第一步：main 上方加全局注解——整个文档的元信息
//   // @title        用户服务 API
//   // @version      1.0
//   // @description  用户增删改查示例
//   // @host         localhost:8080
//   // @BasePath     /api
//
// 第二步：给每个 handler 写注解（见第 3 节）
// 第三步：跑 swag init 重新生成 docs/；改过注解后每次都要重跑
`)

	fmt.Println("   ⚠️ 坑：swag 默认找当前目录的 main.go；新加了 handler 却不重跑 init，")
	fmt.Println("   文档就会\"缺接口\"。建议写进 Makefile：make docs。")

	// ============================================================
	// 3. 注解详解
	// ============================================================
	fmt.Println("\n📌 3. 注解详解 — @Summary 到 @Router")
	fmt.Println("   注解全部写在 handler 函数紧上方的注释块里，以 @ 开头即视为注解。")

	fmt.Println(`
// user_handler.go — 完整注解示例（Gin 版，仅打印演示）
//   // User 用户模型——@Success/@Param 里引用的类型
//   type User struct {
//       ID   int    ` + "`" + `json:"id" example:"1"` + "`" + `
//       Name string ` + "`" + `json:"name" example:"Alice"` + "`" + `
//       Role string ` + "`" + `json:"role" example:"admin"` + "`" + `
//   }
//
//   // GetUsers 获取用户列表
//   //
//   // @Summary      获取用户列表
//   // @Description  分页返回所有用户
//   // @Tags         users
//   // @Accept       json
//   // @Produce      json
//   // @Param        page    query    int    false "页码"      default(1)
//   // @Param        size    query    int    false "每页数量"  default(10)
//   // @Success      200     {array}  User
//   // @Failure      400     {object} Error
//   // @Router       /users [get]
//   func GetUsers(c *gin.Context) {
//       c.JSON(200, []User{{ID: 1, Name: "Alice", Role: "admin"}})
//   }
`)

	fmt.Println(`
// @Param 的五种位置:
//   path        URL 路径段: /users/{id}
//   query       URL 查询串: ?page=1
//   header      请求头: Authorization
//   body        请求体（类型写 Go struct 名）
//   formData    表单字段（multipart）
//
// @Success 的三种返回类型:
//   {object} User     单个对象
//   {array}  User     对象数组
//   {string} string   普通字符串
`)

	// 真实演示: 解析一行 @Param 注解
	fmt.Println("--- 演示: 解析一行 @Param 注解 ---")
	demoAnnotationParse()

	fmt.Println(`
// 注解速查表:
//   @Summary      一句话摘要（列表页标题）
//   @Description  详细说明（支持多行）
//   @Tags         分组标签（UI 里按组折叠）
//   @Accept       请求 Content-Type
//   @Produce      响应 Content-Type
//   @Param        name + 位置 + 类型 + 必填 + 说明
//   @Success      状态码 + 返回模型
//   @Failure      错误响应
//   @Router       /users/{id} [get]
`)

	// ============================================================
	// 4. 集成 http-swagger
	// ============================================================
	fmt.Println("\n📌 4. 集成 http-swagger / gin-swagger")
	fmt.Println("   生成完 docs/，再把它\"挂\"到 HTTP 服务上：标准库用 http-swagger，Gin 用 gin-swagger。")
	fmt.Println("   关键一行：import _ \"你的项目/docs\"——空导入触发 docs.go 的 init 注册 swagger.json。")

	fmt.Println(`
// gin_swagger.go — Gin 集成（最常用，仅打印演示）
//   import (
//       _ "your-project/docs"          // ⚠️ 空导入：触发 docs.go 注册 swagger.json
//       "github.com/gin-gonic/gin"
//       swaggerFiles "github.com/swaggo/files"
//       ginSwagger "github.com/swaggo/gin-swagger"
//   )
//
//   func main() {
//       r := gin.Default()
//       api := r.Group("/api")
//       api.GET("/users", GetUsers)
//
//       r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
//       r.Run(":8080")
//   }
//   // 浏览器打开 http://localhost:8080/swagger/index.html
//
// std_swagger.go — 标准库 net/http 集成（仅打印演示）
//   mux := http.NewServeMux()
//   mux.Handle("/swagger/", httpSwagger.WrapHandler)
//   http.ListenAndServe(":8080", mux)
`)

	fmt.Println("   ⚠️ 坑 1：docs 包没空导入 → 404（\"swagger 页面打不开\"最常见的原因）。")
	fmt.Println("   ⚠️ 坑 2：生产环境别裸奔 Swagger——暴露全部接口细节方便攻击者侦察，")
	fmt.Println("   生产应关闭或加 Basic Auth / IP 白名单，只在 dev/staging 开启。")

	// ============================================================
	// 5. swagger.json 结构
	// ============================================================
	fmt.Println("\n📌 5. swagger.json 长什么样 — 为什么用 OpenAPI")
	fmt.Println("   生成的 swagger.json 是标准 OpenAPI 文档：顶层有 openapi 版本、info（标题/版本）、")
	fmt.Println("   paths（所有接口）、components/schemas（所有模型）。")

	// 真实演示: 用标准库构造一个最小 OpenAPI 文档并序列化
	fmt.Println("--- 演示: 用 map + encoding/json 构造最小 swagger.json ---")
	demoOpenAPIDoc()

	fmt.Println(`
// docs/swagger.json（核心结构）:
//   {
//     "openapi": "3.0.0",
//     "info": { "title": "用户服务 API", "version": "1.0" },
//     "paths": {
//       "/users": { "get": { "tags": ["users"], "summary": "获取用户列表",
//           "responses": { "200": { "description": "OK" } } } }
//     },
//     "components": { "schemas": { "User": { "type": "object",
//         "properties": { "id": {"type": "integer"}, "name": {"type": "string"} } } } }
//   }
//   // paths = 接口；components/schemas = 模型——前端能直接生成 TS 类型和请求客户端
`)

	fmt.Println("   ✅ 为什么用 OpenAPI 而不是自己写文档：① 文档与代码同源，改了注解重跑 init 就同步；")
	fmt.Println("   ② 机器可读，能生成 SDK/Mock/类型；③ 行业标准，团队内外沟通零成本；")
	fmt.Println("   ④ Swagger UI 自带 Try it out，联调效率翻倍。")

	// ============================================================
	// 6. 最佳实践 + 小结
	// ============================================================
	fmt.Println("\n📌 6. API 文档最佳实践 + 对比")

	fmt.Println(`
// 手写文档（Word/README）     vs  Swagger 自动生成
//   极易过期，没人维护就废了      改代码改注解，重跑即同步
//   只能看文字                    Try it out 直接调真实接口
//   无机器可读性                  生成 SDK / Mock / TS 类型
//   写一份还要更新一份            注解跟着代码写，一次到位
`)

	fmt.Println("\n╔════════════════════════════════════════════════════════════╗")
	fmt.Println("║  Swagger 文档核心要点总结                                 ║")
	fmt.Println("╠════════════════════════════════════════════════════════════╣")
	fmt.Println("║  OpenAPI   → 描述 API 的标准规范，Swagger 是工具全家桶     ║")
	fmt.Println("║  核心注解   → @Summary @Tags @Param @Success @Failure @Router║")
	fmt.Println("║  swag init → 生成 docs/，import _ \"docs\" 注册进程序        ║")
	fmt.Println("║  托管       → http-swagger / gin-swagger 提供 /swagger/*    ║")
	fmt.Println("║  swagger.json → paths + components/schemas（可生成 SDK）    ║")
	fmt.Println("╚════════════════════════════════════════════════════════════╝")

	fmt.Println("\n💡 提示: 最佳实践——① 注解写在 handler 上，和实现贴在一起；")
	fmt.Println("   ② 响应模型用 {object} 你的结构体，别用 map 糊弄；")
	fmt.Println("   ③ 统一错误结构 Error{code,message} 并在 @Failure 引用；")
	fmt.Println("   ④ 把 swag init 加进 Makefile / CI，避免\"无声过期\"；⑤ 生产关闭或加鉴权。")
}

// demoAnnotationParse 解析一行 @Param 注解的五个部分。
func demoAnnotationParse() {
	param := "id path int true 用户ID"
	p := strings.Fields(param)
	fmt.Printf("   @Param %s\n", param)
	fmt.Printf("   → 名字=%s | 位置=%s | 类型=%s | 必填=%s | 说明=用户ID\n",
		p[0], p[1], p[2], p[3])
	fmt.Println("   （位置 5 选 1: path / query / header / body / formData）")
}

// demoOpenAPIDoc 用 map + encoding/json 构造并打印最小 OpenAPI 文档。
func demoOpenAPIDoc() {
	doc := map[string]interface{}{
		"openapi": "3.0.0",
		"info": map[string]interface{}{
			"title":   "用户服务 API",
			"version": "1.0",
		},
		"paths": map[string]interface{}{
			"/users": map[string]interface{}{
				"get": map[string]interface{}{
					"tags":    []string{"users"},
					"summary": "获取用户列表",
					"responses": map[string]interface{}{
						"200": map[string]interface{}{"description": "OK"},
					},
				},
			},
		},
	}
	b, _ := json.MarshalIndent(doc, "   ", "  ")
	fmt.Printf("   %s\n", b)
}
