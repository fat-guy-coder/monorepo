package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/monorepo/go/advanced"
	"github.com/monorepo/go/basics"
	"github.com/monorepo/go/concurrency"
	"github.com/monorepo/go/database"
	"github.com/monorepo/go/engineering"
	"github.com/monorepo/go/microservices"
	"github.com/monorepo/go/web"
)

func main() {
	if len(os.Args) < 2 {
		printMenu()
		return
	}

	stage := strings.ToLower(os.Args[1])
	topic := ""
	if len(os.Args) > 2 {
		topic = strings.ToLower(os.Args[2])
	}

	switch stage {
	case "1", "basics", "基础":
		fmt.Println("\n🔰 ========== 阶段 1: 基础入门 ==========")
		basics.RunAll()
	case "2", "concurrency", "并发":
		fmt.Println("\n⚡ ========== 阶段 2: 并发编程 ==========")
		concurrency.RunAll()
	case "3", "web", "网络":
		fmt.Println("\n🌐 ========== 阶段 3: Web 开发 ==========")
		web.RunAll()
	case "4", "database", "数据库":
		fmt.Println("\n🗄️ ========== 阶段 4: 数据库与存储 ==========")
		database.RunAll()
	case "5", "microservices", "微服务":
		fmt.Println("\n🏗️ ========== 阶段 5: 微服务与分布式 ==========")
		microservices.RunAll()
	case "6", "engineering", "工程化":
		fmt.Println("\n🚀 ========== 阶段 6: 工程化实战 ==========")
		engineering.RunAll()
	case "7", "advanced", "进阶":
		fmt.Println("\n🧠 ========== 阶段 7: 进阶拓展 ==========")
		advanced.RunAll()
	case "all":
		fmt.Println("\n🐹 ========== 运行所有阶段示例 ==========")
		basics.RunAll()
		concurrency.RunAll()
		web.RunAll()
		database.RunAll()
		microservices.RunAll()
		engineering.RunAll()
		advanced.RunAll()
	case "web-server":
		web.RunWebServer()
	default:
		// 尝试匹配子主题
		if runTopic(stage, topic) {
			return
		}
		fmt.Printf("未知的阶段: %s\n\n", stage)
		printMenu()
	}
}

func printMenu() {
	fmt.Println(`
╔══════════════════════════════════════════════════╗
║         🐹 Go 语言学习路线图 - 交互式示例       ║
╠══════════════════════════════════════════════════╣
║                                                  ║
║  用法: go run . <阶段编号或名称> [主题]         ║
║                                                  ║
║  阶段:                                           ║
║    go run . 1  (basics)       🔰 基础入门       ║
║    go run . 2  (concurrency)  ⚡ 并发编程       ║
║    go run . 3  (web)          🌐 Web 开发       ║
║    go run . 4  (database)     🗄️  数据库与存储  ║
║    go run . 5  (microservices)🏗️  微服务        ║
║    go run . 6  (engineering)  🚀 工程化实战     ║
║    go run . 7  (advanced)     🧠 进阶拓展       ║
║    go run . all               📋 运行所有       ║
║    go run . web-server        🌍 启动Web服务    ║
║                                                  ║
║  示例: go run . basics variables                 ║
║         go run . 2 channels                      ║
║         go run . 3 gin                            ║
║                                                  ║
╚══════════════════════════════════════════════════╝
`)
}

func runTopic(stage, topic string) bool {
	topics := map[string]func(string) bool{
		"1": basics.RunTopic,
		"2": concurrency.RunTopic,
		"3": web.RunTopic,
		"4": database.RunTopic,
		"5": microservices.RunTopic,
		"6": engineering.RunTopic,
		"7": advanced.RunTopic,
	}

	for key, fn := range topics {
		if stage == key || stage == stageName(key) {
			return fn(topic)
		}
	}
	return false
}

func stageName(key string) string {
	names := map[string]string{
		"1": "basics", "2": "concurrency", "3": "web",
		"4": "database", "5": "microservices", "6": "engineering", "7": "advanced",
	}
	return names[key]
}
