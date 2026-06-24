package web

import "fmt"

// RunCorsRateLimit 演示 CORS 与限流
func RunCorsRateLimit() {
	fmt.Println("=== CORS 跨域 ===")
	fmt.Println("gin-contrib/cors 中间件:")
	fmt.Println("r.Use(cors.New(cors.Config{")
	fmt.Println("    AllowOrigins: []string{\"http://localhost:5173\"},")
	fmt.Println("    AllowMethods: []string{\"GET\",\"POST\",\"PUT\",\"DELETE\"},")
	fmt.Println("    AllowHeaders: []string{\"Origin\",\"Content-Type\",\"Authorization\"},")
	fmt.Println("    AllowCredentials: true,")
	fmt.Println("}))")
	fmt.Println()
	fmt.Println("前端类比: ≈ 后端设置 Access-Control-Allow-Origin 头")
	fmt.Println()

	fmt.Println("=== 限流（令牌桶） ===")
	fmt.Println("golang.org/x/time/rate")
	fmt.Println("func RateLimit(r rate.Limit, b int) gin.HandlerFunc {")
	fmt.Println("    limiters := sync.Map{}")
	fmt.Println("    return func(c *gin.Context) {")
	fmt.Println("        ip := c.ClientIP()")
	fmt.Println("        lim, _ := limiters.LoadOrStore(ip, rate.NewLimiter(r, b))")
	fmt.Println("        if !lim.Allow() { c.JSON(429, ...); c.Abort(); return }")
	fmt.Println("        c.Next()")
	fmt.Println("    }")
	fmt.Println("}")
	fmt.Println("r.Use(RateLimit(10, 20))  // 每秒 10 个，突发 20")
	fmt.Println()
	fmt.Println("HTTP 429 Too Many Requests")
}
