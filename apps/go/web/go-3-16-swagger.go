package web

import "fmt"

// RunSwagger 演示 Swagger/OpenAPI 文档
func RunSwagger() {
	fmt.Println("=== Swagger / OpenAPI（swaggo/swag） ===")
	fmt.Println("通过注释生成 API 文档:")
	fmt.Println("  // @title           My API")
	fmt.Println("  // @version         1.0")
	fmt.Println("  // @host            localhost:8080")
	fmt.Println("  // @BasePath        /api")
	fmt.Println()
	fmt.Println("  // @Summary      获取用户列表")
	fmt.Println("  // @Description  返回所有用户")
	fmt.Println("  // @Tags         users")
	fmt.Println("  // @Success      200  {array}   User")
	fmt.Println("  // @Router       /users [get]")
	fmt.Println("  func listUsers(c *gin.Context) { ... }")
	fmt.Println()
	fmt.Println("安装与使用:")
	fmt.Println("  go install github.com/swaggo/swag/cmd/swag@latest")
	fmt.Println("  swag init            # 扫描注释，生成 docs/")
	fmt.Println("  // 代码中导入 docs")
	fmt.Println("  r.GET(\"/swagger/*any\", ginSwagger.WrapHandler(swaggerFiles.Handler))")
	fmt.Println()
	fmt.Println("  🚀 访问 http://localhost:8080/swagger/index.html")
	fmt.Println()
	fmt.Println("前端类比: ≈ TS tsoa / NestJS @ApiProperty 装饰器")
}
