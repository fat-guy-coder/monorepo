// database 包 — 数据库迁移（schema 版本管理）
//
// 对照学习：
//   go-4-13-migration（迁移：up/down 文件 / schema_migrations 账本表 / //go:embed 内嵌）
//   go-1-14-packages-modules（//go:embed 编译期内嵌文件）
// 核心模式：schema_migrations 记录已执行的版本，跳过已跑过的迁移 → 幂等可重复执行
package database

import (
	"database/sql"
	"embed"
	"fmt"
)

//go:embed migrations/*.sql
var migrationsFS embed.FS

// Migrate 执行所有未跑过的迁移（幂等，服务启动时调用一次）
func Migrate(db *sql.DB) error {
	// 1. 先建「迁移账本表」——记录哪些版本已经执行过
	if _, err := db.Exec(`CREATE TABLE IF NOT EXISTS schema_migrations (
		version    text      PRIMARY KEY,
		applied_at timestamp NOT NULL DEFAULT now()
	)`); err != nil {
		return fmt.Errorf("创建 schema_migrations 失败: %w", err)
	}

	// 2. 遍历内嵌的迁移文件（按文件名排序执行）
	entries, err := migrationsFS.ReadDir("migrations")
	if err != nil {
		return err
	}
	for _, entry := range entries {
		version := entry.Name()
		applied, err := isApplied(db, version)
		if err != nil {
			return err
		}
		if applied {
			continue // 已执行过，跳过（幂等）
		}

		sqlBytes, err := migrationsFS.ReadFile("migrations/" + version)
		if err != nil {
			return err
		}
		if _, err := db.Exec(string(sqlBytes)); err != nil {
			return fmt.Errorf("执行迁移 %s 失败: %w", version, err)
		}
		if _, err := db.Exec(`INSERT INTO schema_migrations (version) VALUES ($1)`, version); err != nil {
			return fmt.Errorf("记录迁移版本 %s 失败: %w", version, err)
		}
	}
	return nil
}

// isApplied 查询某个迁移版本是否已执行过
func isApplied(db *sql.DB, version string) (bool, error) {
	var count int
	if err := db.QueryRow(`SELECT count(*) FROM schema_migrations WHERE version = $1`, version).Scan(&count); err != nil {
		return false, err
	}
	return count > 0, nil
}
