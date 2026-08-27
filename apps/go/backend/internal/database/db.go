// database 包 — 数据库连接层（database/sql + lib/pq）
//
// 对照学习：
//   go-4-1-database-sql（database/sql 标准接口：sql.Open / QueryRow / Exec / Scan）
//   go-4-2-connection-pool（连接池：SetMaxOpenConns / SetMaxIdleConns / SetConnMaxLifetime）
//   核心模式：sql.Open 只是拿到连接池句柄，真正连库在 Ping
package database

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/lib/pq" // 注册 Postgres 驱动（空白导入：只取副作用，不直接用符号）
)

// Open 连接 PostgreSQL，返回连接池句柄 *sql.DB
//
// 关键点（go-4-1-database-sql）：
//   - sql.Open 不会真的去连库——它只校验 DSN 格式并准备好驱动
//   - 真正的 TCP 连接发生在 Ping() / 第一次 Query 时（连接是懒建立的）
func Open(dsn string) (*sql.DB, error) {
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, fmt.Errorf("打开数据库失败: %w", err)
	}

	// ---- 连接池配置（go-4-2-connection-pool）----
	db.SetMaxOpenConns(10)           // 最多同时 10 个连接在跑（并发高峰上限）
	db.SetMaxIdleConns(5)            // 空闲时保留 5 个复用，避免频繁建连
	db.SetConnMaxLifetime(time.Hour) // 单个连接最长活 1 小时，防陈旧连接/防火墙掐断

	// Ping 真正建立连接，确认数据库可达（启动时快速失败）
	if err := db.Ping(); err != nil {
		db.Close()
		return nil, fmt.Errorf("连接数据库失败（检查 DSN/网络/凭据）: %w", err)
	}
	return db, nil
}
