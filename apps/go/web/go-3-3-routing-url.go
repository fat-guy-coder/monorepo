package web

import "fmt"

// RunRoutingUrl 演示 Gin 路由与 URL 参数
func RunRoutingUrl() {
	fmt.Println("=== Gin 路由与 URL 参数 ===")
	fmt.Println("三种参数来源:")
	fmt.Println()
	fmt.Println("1. 路径参数 /users/:id")
	fmt.Println("   c.Param(\"id\")           → \"123\"")
	fmt.Println()
	fmt.Println("2. Query 参数 ?page=1&size=10")
	fmt.Println("   c.DefaultQuery(\"page\",\"1\") → \"1\"")
	fmt.Println("   c.Query(\"size\")           → \"10\"")
	fmt.Println()
	fmt.Println("3. POST Form 参数")
	fmt.Println("   c.PostForm(\"username\")       → form value")
	fmt.Println("   c.DefaultPostForm(\"remember\",\"false\")")
	fmt.Println()
	fmt.Println("4. 路径通配 /static/*filepath")
	fmt.Println("   c.Param(\"filepath\") → \"/css/style.css\"")
	fmt.Println()
	fmt.Println("路由分组:")
	fmt.Println("  api := r.Group(\"/api\")")
	fmt.Println("  { api.GET(\"/users\", listUsers) }")
	fmt.Println("  admin := r.Group(\"/admin\", authMiddleware())")
	fmt.Println("前端类比: ≈ Express Router / Vue Router children")
}
