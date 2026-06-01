package web

import (
	"fmt"
	"strings"
)

// RunAll 按顺序运行阶段 3 的所有 Web 开发主题。
func RunAll() {
	fmt.Println("\n🌐 ========== 阶段 3: Web 开发 ==========")
	fmt.Println("涵盖：net/http → Gin → 中间件 → RESTful → WebSocket → 优雅关停\n")

	RunNetHTTP()
	RunGin()
	RunMiddleware()
	RunRESTAPI()
	RunWebSocket()
	RunGraceful()
}

// RunTopic 根据关键词运行指定的 Web 开发主题。
// 支持灵活匹配：包含或前缀匹配。返回 false 表示未找到匹配主题。
//
// 支持的关键词：
//   - "http"       → net/http 标准库
//   - "gin"        → Gin 框架
//   - "middleware" → 中间件模式
//   - "rest"       → RESTful API 设计
//   - "websocket"  → WebSocket 实时通信
//   - "graceful"   → 优雅关停
func RunTopic(topic string) bool {
	t := strings.ToLower(strings.TrimSpace(topic))

	// 辅助函数：关键词包含匹配
	match := func(keywords ...string) bool {
		for _, kw := range keywords {
			if strings.Contains(t, kw) {
				return true
			}
		}
		return false
	}

	switch {
	case match("http", "net/http", "标准库"):
		fmt.Println("\n🌐 ========== net/http 标准库 ==========")
		RunNetHTTP()
		return true
	case match("gin", "框架"):
		fmt.Println("\n🌐 ========== Gin 框架 ==========")
		RunGin()
		return true
	case match("middleware", "中间件"):
		fmt.Println("\n🌐 ========== 中间件 ==========")
		RunMiddleware()
		return true
	case match("rest", "restful", "api", "crud"):
		fmt.Println("\n🌐 ========== RESTful API ==========")
		RunRESTAPI()
		return true
	case match("websocket", "websocket", "ws", "socket"):
		fmt.Println("\n🌐 ========== WebSocket ==========")
		RunWebSocket()
		return true
	case match("graceful", "grace", "优雅", "shutdown", "关停"):
		fmt.Println("\n🌐 ========== 优雅关停 ==========")
		RunGraceful()
		return true
	default:
		fmt.Printf("未知的 Web 开发主题: %s\n", t)
		fmt.Println("可用主题: http, gin, middleware, rest, websocket, graceful")
		return false
	}
}

// RunWebServer 启动一个简单的 Gin Web 服务器在 :8080 端口。
// 演示一个完整可运行的服务端应用。
func RunWebServer() {
	fmt.Println("\n🌍 ========== 启动 Gin Web 服务器 :8080 ==========")
	startGinServer()
}
