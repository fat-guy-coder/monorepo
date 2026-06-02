package database

import (
	"fmt"
	"strings"
)

// RunAll 运行阶段 4 所有的数据库与存储主题。
func RunAll() {
	fmt.Println("\n🗄️ ========== 阶段 4: 数据库与存储 ==========")
	fmt.Println("涵盖：database/sql → GORM → Redis → 事务 → 迁移\n")
	fmt.Println("📝 本阶段尚在建设中，请参考前端文档。")
	fmt.Println()
	fmt.Println("--- database/sql 标准库 ---")
	fmt.Println("   关注：Open, Ping, QueryRow, Exec, 连接池参数")
	fmt.Println("--- GORM ORM ---")
	fmt.Println("   关注：模型定义, AutoMigrate, CRUD, 关联, Hook")
	fmt.Println("--- Redis ---")
	fmt.Println("   关注：go-redis v9, String/Hash/List/Set/ZSet")
	fmt.Println("--- 事务 ---")
	fmt.Println("   关注：ACID, 隔离级别, SavePoint")
	fmt.Println("--- 迁移 ---")
	fmt.Println("   关注：golang-migrate, 版本控制")
	fmt.Println("\n✅ 数据库阶段知识概览完成！")
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
	case match("sql", "标准库"):
		fmt.Println("📝 database/sql: Open/Ping/QueryRow/Exec + 连接池")
	case match("gorm", "orm"):
		fmt.Println("📝 GORM: 模型/AutoMigrate/CRUD/关联/Hook")
	case match("redis", "缓存"):
		fmt.Println("📝 Redis: go-redis v9 五大基本类型")
	case match("transaction", "事务"):
		fmt.Println("📝 事务: ACID/隔离级别/SavePoint")
	case match("migration", "迁移"):
		fmt.Println("📝 迁移: golang-migrate")
	default:
		fmt.Printf("未知的数据库主题: %s\n", t)
		fmt.Println("可用: sql, gorm, redis, transaction, migration")
		return false
	}
	return true
}
