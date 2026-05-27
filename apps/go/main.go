package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("=== Gin Web 框架示例 ===")

	// 创建默认路由
	r := gin.Default()

	// 中间件
	r.Use(loggerMiddleware())

	// 路由
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello, Gin!",
		})
	})

	r.GET("/hello/:name", func(c *gin.Context) {
		name := c.Param("name")
		c.JSON(200, gin.H{
			"message": fmt.Sprintf("Hello, %s!", name),
		})
	})

	r.POST("/data", func(c *gin.Context) {
		var data map[string]interface{}
		if err := c.ShouldBindJSON(&data); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
		c.JSON(200, gin.H{
			"received": data,
		})
	})

	// 路由组
	v1 := r.Group("/api/v1")
	{
		v1.GET("/users", func(c *gin.Context) {
			c.JSON(200, []gin.H{
				{"id": 1, "name": "Alice"},
				{"id": 2, "name": "Bob"},
			})
		})
	}

	fmt.Println("启动服务器在 http://localhost:8080")
	log.Fatal(r.Run(":8080"))
}

// 自定义中间件
func loggerMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Printf("[%s] %s\n", c.Request.Method, c.Request.URL.Path)
		c.Next()
	}
}