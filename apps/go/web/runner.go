package web

import (
	"fmt"
	"strings"
)

// RunAll 按顺序运行阶段 3 的所有 Web 开发主题。
func RunAll() {
	fmt.Println("\n🌐 ========== 阶段 3: Web 开发 ==========")

	RunNetHTTP()
	// TODO: RunRequestResponse()
	// TODO: RunRoutingUrl()
	RunMiddleware()
	RunGin()
	// TODO: RunGinAdvanced()
	// TODO: RunJsonSerialization()
	// TODO: RunFileUploadDownload()
	// TODO: RunRestfulApi()
	// TODO: RunCookieSession()
	// TODO: RunJwtAuth()
	// TODO: RunCorsRateLimit()
	// TODO: RunWebsocket()
	// TODO: RunGracefulShutdown()
	// TODO: RunTemplateEmbed()
	// TODO: RunSwagger()

	fmt.Println("\n✅ Web 开发阶段完成！")
}

func RunTopic(topic string) bool {
	t := strings.ToLower(strings.TrimSpace(topic))
	match := func(keywords ...string) bool {
		for _, kw := range keywords {
			if strings.Contains(t, kw) { return true }
		}
		return false
	}
	switch {
	case match("http", "net/http", "标准库"):
		RunNetHTTP()
	case match("gin", "框架"):
		RunGin()
	case match("middleware", "中间件"):
		RunMiddleware()
	default:
		fmt.Printf("未知的 Web 主题: %s\n", t)
		fmt.Println("可用: http, gin, middleware")
		return false
	}
	return true
}

func RunWebServer() {
	fmt.Println("\n🌍 Gin Web 服务器（待实现）")
	// TODO: startGinServer()
}
