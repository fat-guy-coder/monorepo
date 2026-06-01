package database

import (
	"fmt"
	"strings"
)

// RunAll 按顺序运行阶段 4 的所有数据库与存储主题。
func RunAll() {
	fmt.Println("\n🗄️  ========== 阶段 4: 数据库与存储 ==========")
	fmt.Println("涵盖：database/sql → GORM → Redis → 事务 → 迁移\n")

	RunSQLBasics()
	RunGORM()
	RunRedis()
	RunTransactions()
	RunMigration()
}

// RunTopic 根据关键词运行指定的数据库与存储主题。
// 支持灵活匹配：包含或前缀匹配。返回 false 表示未找到匹配主题。
//
// 支持的关键词：
//   - "sql"         → database/sql 标准库
//   - "gorm"        → GORM ORM 框架
//   - "redis"       → Redis 缓存与数据结构
//   - "transaction" → 事务与并发控制
//   - "migration"   → 数据库迁移
func RunTopic(topic string) bool {
	t := strings.ToLower(strings.TrimSpace(topic))

	match := func(keywords ...string) bool {
		for _, kw := range keywords {
			if strings.Contains(t, kw) {
				return true
			}
		}
		return false
	}

	switch {
	case match("sql", "database/sql", "标准库", "query", "连接池"):
		fmt.Println("\n🗄️  ========== database/sql 标准库 ==========")
		RunSQLBasics()
		return true
	case match("gorm", "orm", "模型"):
		fmt.Println("\n🗄️  ========== GORM 框架 ==========")
		RunGORM()
		return true
	case match("redis", "缓存", "cache"):
		fmt.Println("\n🗄️  ========== Redis ==========")
		RunRedis()
		return true
	case match("transaction", "事务", "tx", "acid", "锁"):
		fmt.Println("\n🗄️  ========== 事务与锁 ==========")
		RunTransactions()
		return true
	case match("migration", "迁移", "migrate", "schema"):
		fmt.Println("\n🗄️  ========== 数据库迁移 ==========")
		RunMigration()
		return true
	default:
		fmt.Printf("未知的数据库主题: %s\n", t)
		fmt.Println("可用主题: sql, gorm, redis, transaction, migration")
		return false
	}
}
