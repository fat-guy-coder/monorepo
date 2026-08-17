// 🐹 Go 后端学习项目 — 第 1 阶段：用 Go 重写 backend 的菜单 API
//
// 目标：先用 net/http 标准库 + 内存 map 实现 /api/menus 的 CRUD，
//     能 curl 到数据就算赢。后续阶段再换框架、接数据库、加并发。
//
// 运行：cd apps/go && go run ./backend/cmd/server
// 测试：curl http://localhost:8080/api/menus
package main

import (
	"log"
	"net/http"

	"github.com/monorepo/go/backend/internal/handler"
)

func main() {
	// 注册路由
	mux := http.NewServeMux()
	handler.RegisterMenuRoutes(mux)

	addr := ":3002" // Go 后端用 3001，避开 Bun backend 的 3000/8080
	log.Printf("🐹 Go 后端启动: http://localhost%s", addr)
	log.Printf("  测试: curl http://localhost%s/api/menus", addr)
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatal("启动失败:", err)
	}
}
