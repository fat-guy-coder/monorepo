// 🐹 Go 后端学习项目 — 第 4 阶段：接入 PostgreSQL
//
// 目标：把内存 map 换成真实数据库（database/sql + lib/pq + schema_migrations 迁移）
//   第 1 阶段：net/http + 内存 map（重启丢数据）
//   第 4 阶段：net/http + PostgreSQL（数据落盘，重启不丢）
//
// 部署模型（与 Bun backend 一致）：
//   本地不装 PostgreSQL —— 代码推送到服务器后：
//   cd apps/go && go mod tidy   # 自动下载依赖（lib/pq、google/uuid）
//   go build -o backend ./backend/cmd/server
//   DATABASE_URL=postgres://jason:123456@localhost:5432/jason ./backend
//   数据库是服务器 Docker 里的 postgres（docker-compose 映射 5432，localhost 直连）
//
// 本地运行：cd apps/go && go run ./backend/cmd/server
// 测试：curl http://localhost:3002/api/menus
package main

import (
	"log"
	"net/http"
	"os"

	"github.com/monorepo/go/backend/internal/database"
	"github.com/monorepo/go/backend/internal/handler"
)

func main() {
	// 1. 读数据库连接串（环境变量优先，默认服务器 Docker postgres 的地址）
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "postgres://jason:123456@localhost:5432/jason?sslmode=disable"
	}

	// 2. 连数据库（database/sql + lib/pq）——连接池配置见 database.Open（go-4-1 / go-4-2）
	db, err := database.Open(dsn)
	if err != nil {
		log.Fatal("数据库连接失败:", err)
	}
	defer db.Close()

	// 3. 跑迁移（幂等建表，见 go-4-13-migration）
	if err := database.Migrate(db); err != nil {
		log.Fatal("数据库迁移失败:", err)
	}

	// 4. 注册路由（handler → service → repository → Postgres）
	mux := http.NewServeMux()
	handler.RegisterMenuRoutes(mux, db)
	handler.RegisterStudySessionRoutes(mux, db)

	addr := ":3002" // Go 后端用 3002，避开 Bun backend 的 3000
	log.Printf("🐹 Go 后端启动: http://localhost%s", addr)
	log.Printf("  测试: curl http://localhost%s/api/menus", addr)
	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Fatal("启动失败:", err)
	}
}
