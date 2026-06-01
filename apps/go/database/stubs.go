package database

import "fmt"

// RunSQLBasics 演示 database/sql 标准库。
// TODO: 边学边写 — 连接池、CRUD、预编译语句
func RunSQLBasics() {
	fmt.Println("\n--- database/sql 标准库 ---")
	fmt.Println("📝 TODO: 学到这里时来这里写代码！")
	fmt.Println("   参考知识点：sql.Open, 连接池配置, QueryRow/Query/Exec, sql.NullString")
	fmt.Println("   更多提示见 GOLearningRoadmap.vue 阶段4")
}

// RunGORM 演示 GORM ORM 框架。
// TODO: 边学边写 — 模型定义、关联、事务、Hook
func RunGORM() {
	fmt.Println("\n--- GORM 框架 ---")
	fmt.Println("📝 TODO: 学到这里时来这里写代码！")
	fmt.Println("   参考知识点：Model 定义, AutoMigrate, CRUD, 关联(HasOne/HasMany/BelongsTo), Preload")
	fmt.Println("   需要先 go get gorm.io/gorm gorm.io/driver/postgres")
	fmt.Println("   更多提示见 GOLearningRoadmap.vue 阶段4")
}

// RunRedis 演示 Redis 缓存操作。
// TODO: 边学边写 — 缓存策略、分布式锁
func RunRedis() {
	fmt.Println("\n--- Redis 缓存 ---")
	fmt.Println("📝 TODO: 学到这里时来这里写代码！")
	fmt.Println("   参考知识点：go-redis, String/Hash/List/Set/ZSet, 缓存穿透/击穿/雪崩, 分布式锁 SET NX EX")
	fmt.Println("   需要先 go get github.com/redis/go-redis/v9")
	fmt.Println("   更多提示见 GOLearningRoadmap.vue 阶段4")
}

// RunTransactions 演示数据库事务与并发控制。
// TODO: 边学边写 — ACID、隔离级别、死锁处理
func RunTransactions() {
	fmt.Println("\n--- 事务与并发控制 ---")
	fmt.Println("📝 TODO: 学到这里时来这里写代码！")
	fmt.Println("   参考知识点：ACID, 隔离级别, SELECT FOR UPDATE, 乐观锁/悲观锁, Savepoint")
	fmt.Println("   更多提示见 GOLearningRoadmap.vue 阶段4")
}

// RunMigration 演示数据库迁移。
// TODO: 边学边写 — golang-migrate、embed 嵌入迁移文件
func RunMigration() {
	fmt.Println("\n--- 数据库迁移 ---")
	fmt.Println("📝 TODO: 学到这里时来这里写代码！")
	fmt.Println("   参考知识点：golang-migrate, 迁移文件命名(up/down), embed 嵌入 SQL, 版本管理")
	fmt.Println("   更多提示见 GOLearningRoadmap.vue 阶段4")
}
