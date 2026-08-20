package web

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"
)

// RunAll 按顺序运行阶段 3 的所有 Web 开发主题。
func RunAll() {
	fmt.Println("\n🌐 ========== 阶段 3: Web 开发 ==========")

	RunNetHTTP()
	RunRequestResponse()
	RunRoutingUrl()
	RunMiddleware()
	RunGin()
	RunGinAdvanced()
	RunJsonSerialization()
	RunFileUploadDownload()
	RunRestfulApi()
	RunCookieSession()
	RunJwtAuth()
	RunCorsRateLimit()
	RunWebsocket()
	RunGracefulShutdown()
	RunTemplateEmbed()
	RunSwagger()

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
	case match("http", "标准库"):
		RunNetHTTP()
	case match("request", "响应", "请求"):
		RunRequestResponse()
	case match("routing", "url", "路由"):
		RunRoutingUrl()
	case match("middleware", "中间件"):
		RunMiddleware()
	case match("gin-advanced", "gin进阶", "gin 进阶"):
		RunGinAdvanced()
	case match("gin", "框架"):
		RunGin()
	case match("json", "序列化"):
		RunJsonSerialization()
	case match("upload", "download", "文件", "上传", "下载"):
		RunFileUploadDownload()
	case match("rest", "restful"):
		RunRestfulApi()
	case match("cookie", "session", "会话"):
		RunCookieSession()
	case match("jwt", "auth", "鉴权", "token"):
		RunJwtAuth()
	case match("cors", "rate", "limit", "限流"):
		RunCorsRateLimit()
	case match("websocket", "ws"):
		RunWebsocket()
	case match("shutdown", "graceful", "优雅", "停机"):
		RunGracefulShutdown()
	case match("template", "embed", "模板", "嵌入"):
		RunTemplateEmbed()
	case match("swagger"):
		RunSwagger()
	default:
		fmt.Printf("未知的 Web 主题: %s\n", t)
		fmt.Println("可用: http, request, routing, middleware, gin, gin-advanced, json, file, rest, cookie, jwt, cors, rate-limit, websocket, shutdown, template, swagger")
		return false
	}
	return true
}

// RunWebServer 启动一个真实运行的演示服务器（标准库实现）。
// 演示：路由注册、JSON 响应、RESTful 菜单 API、优雅停机（SIGTERM 排空）。
// 运行：go run . web-server   （Ctrl+C 触发优雅停机）
func RunWebServer() {
	fmt.Println("\n🌍 启动演示 Web 服务器（标准库 net/http，端口 :8090）")
	fmt.Println("   访问:")
	fmt.Println("     GET http://localhost:8090/ping           → 健康检查")
	fmt.Println("     GET http://localhost:8090/api/menus      → 菜单列表")
	fmt.Println("     GET http://localhost:8090/api/menus?tree=true → 菜单树")
	fmt.Println("   Ctrl+C 或发送 SIGTERM → 优雅停机（先排空在途请求）\n")

	mux := http.NewServeMux()

	// 健康检查 — 对应 go-3-1 net/http + go-3-7 JSON 序列化
	mux.HandleFunc("GET /ping", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]any{"code": 0, "message": "pong", "data": time.Now().Format("15:04:05")})
	})

	// RESTful 菜单 API — 对应 go-3-9 RESTful API 设计
	// 返回格式与 apps/backend 一致: { code, message, data }
	mux.HandleFunc("GET /api/menus", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		menus := []map[string]any{
			{"id": "1", "name": "front", "label": "前端", "parentId": nil, "order": 1, "project": "learning"},
			{"id": "2", "name": "js", "label": "JavaScript", "parentId": "1", "order": 1, "project": "learning"},
			{"id": "3", "name": "ts", "label": "TypeScript", "parentId": "1", "order": 2, "project": "learning"},
			{"id": "4", "name": "backend", "label": "后端", "parentId": nil, "order": 2, "project": "learning"},
		}
		data := any(menus)
		if r.URL.Query().Get("tree") == "true" {
			data = []map[string]any{
				{"id": "1", "name": "front", "label": "前端", "children": []map[string]any{
					{"id": "2", "name": "js", "label": "JavaScript"},
					{"id": "3", "name": "ts", "label": "TypeScript"},
				}},
				{"id": "4", "name": "backend", "label": "后端"},
			}
		}
		json.NewEncoder(w).Encode(map[string]any{"code": 0, "message": "success", "data": data})
	})

	srv := &http.Server{Addr: ":8090", Handler: mux}

	// 启动服务器（goroutine，不阻塞）
	go func() {
		fmt.Println("✅ 服务器已启动: http://localhost:8090")
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			log.Fatalf("启动失败: %v", err)
		}
	}()

	// 优雅停机 — 对应 go-3-14 graceful-shutdown
	// 等待 Ctrl+C (os.Interrupt) 或 SIGTERM (K8s/Docker 停机信号)
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()
	<-ctx.Done() // 阻塞直到收到信号

	fmt.Println("\n📥 收到停机信号，开始优雅停机...")
	shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := srv.Shutdown(shutdownCtx); err != nil {
		log.Fatalf("优雅停机失败: %v", err)
	}
	fmt.Println("✅ 服务器已干净退出（所有在途请求处理完毕）")
}
