package web

import "fmt"

// RunGinAdvanced 演示 Gin 进阶——参数验证、Logger、Recovery
func RunGinAdvanced() {
	fmt.Println("=== 参数验证（go-playground/validator） ===")
	fmt.Println("type CreateUserReq struct {")
	fmt.Println("    Name  string `json:\"name\" binding:\"required,min=2,max=50\"`")
	fmt.Println("    Email string `json:\"email\" binding:\"required,email\"`")
	fmt.Println("    Age   int    `json:\"age\" binding:\"gte=0,lte=150\"`")
	fmt.Println("}")
	fmt.Println("c.ShouldBindJSON(&req)  // 自动校验，失败返回 400")
	fmt.Println()
	fmt.Println("前端类比: ≈ TypeScript Zod / Yup 的 schema 验证")
	fmt.Println()

	fmt.Println("=== 自定义 Logger 中间件 ===")
	fmt.Println("func Logger() gin.HandlerFunc {")
	fmt.Println("    return func(c *gin.Context) {")
	fmt.Println("        t := time.Now(); c.Next()")
	fmt.Println("        log.Printf(\"[%d] %s %s %v\", c.Writer.Status(), c.Request.Method, c.Request.URL.Path, time.Since(t))")
	fmt.Println("    }")
	fmt.Println("}")
	fmt.Println()

	fmt.Println("=== Recovery 防 panic ===")
	fmt.Println("func Recovery() gin.HandlerFunc {")
	fmt.Println("    return func(c *gin.Context) {")
	fmt.Println("        defer func() { if e := recover(); e != nil { c.JSON(500, ...) } }()")
	fmt.Println("        c.Next()")
	fmt.Println("    }")
	fmt.Println("}")
}
