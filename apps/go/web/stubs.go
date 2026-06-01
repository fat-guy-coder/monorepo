package web

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// RunRESTAPI 演示 RESTful API 设计。
// TODO: 边学边写 — 实现完整的 CRUD handler
func RunRESTAPI() {
	fmt.Println("\n--- RESTful API 设计 ---")
	fmt.Println("📝 TODO: 学到这里时来这里写代码！")
	fmt.Println("   参考知识点：RESTful URL 设计、状态码规范、请求验证、分页")
	fmt.Println("   更多提示见 GOLearningRoadmap.vue 阶段3")
}

// RunWebSocket 演示 WebSocket 实时通信。
// TODO: 边学边写 — 实现聊天室或实时推送
func RunWebSocket() {
	fmt.Println("\n--- WebSocket 实时通信 ---")
	fmt.Println("📝 TODO: 学到这里时来这里写代码！")
	fmt.Println("   参考知识点：gorilla/websocket、连接升级、Hub/Client 模式")
	fmt.Println("   更多提示见 GOLearningRoadmap.vue 阶段3")
}

// RunGraceful 演示优雅关停。
// TODO: 边学边写 — 实现 signal + http.Server.Shutdown
func RunGraceful() {
	fmt.Println("\n--- 优雅关停 ---")
	fmt.Println("📝 TODO: 学到这里时来这里写代码！")
	fmt.Println("   参考知识点：signal.NotifyContext, http.Server.Shutdown, 连接排空")
	fmt.Println("   更多提示见 GOLearningRoadmap.vue 阶段3")
}

// startGinServer 启动 Gin Web 服务器。
func startGinServer() {
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, Go Learning! 🐹",
			"routes":  []string{"/api/v1/users", "/api/v1/ping"},
		})
	})

	r.GET("/api/v1/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"ping": "pong"})
	})

	r.GET("/api/v1/users", func(c *gin.Context) {
		c.JSON(http.StatusOK, []gin.H{
			{"id": 1, "name": "Alice"},
			{"id": 2, "name": "Bob"},
		})
	})

	fmt.Println("🌍 服务器启动在 http://localhost:8080")
	fmt.Println("   访问 http://localhost:8080/api/v1/ping 试试")
	log.Fatal(r.Run(":8080"))
}
