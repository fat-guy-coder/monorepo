package engineering

import (
	"fmt"
	"strings"
)

// RunAll 按顺序运行阶段 6 的所有工程化主题。
func RunAll() {
	fmt.Println("\n🚀 ========== 阶段 6: 工程化与项目实战 ==========")
	fmt.Println("涵盖：项目布局 → 日志 → 错误处理 → 性能分析 → 测试 → CI/CD\n")
	fmt.Println("📝 该阶段以动手实践为主，配合实际项目边做边学效果最好。")
	fmt.Println("   这里提供每个主题的知识要点和学习指引。\n")

	fmt.Println("--- 项目布局 ---")
	fmt.Println("📝 参考标准 Go 项目布局: cmd/ internal/ pkg/ api/ configs/")
	fmt.Println("   依赖注入工具: github.com/google/wire")

	fmt.Println("\n--- 结构化日志 ---")
	fmt.Println("📝 Go 1.21+ 推荐 log/slog; 高性能场景可选 zap 或 zerolog")
	fmt.Println("   日志轮转: github.com/natefinch/lumberjack")

	fmt.Println("\n--- 错误处理进阶 ---")
	fmt.Println("📝 自定义错误类型, errors.Is/As, %w 包装, errors.Join (Go 1.20+)")

	fmt.Println("\n--- 性能分析 ---")
	fmt.Println("📝 pprof (CPU/heap/goroutine), trace, 火焰图 (go tool pprof -http=:)")

	fmt.Println("\n--- 测试体系 ---")
	fmt.Println("📝 表格驱动测试, t.Run 子测试, gomock/mockery, testcontainers-go")

	fmt.Println("\n--- CI/CD ---")
	fmt.Println("📝 GitHub Actions: setup-go, cache, lint, test, build, docker push")
}

// RunTopic 根据关键词运行指定的工程化主题。
func RunTopic(topic string) bool {
	t := strings.ToLower(strings.TrimSpace(topic))
	fmt.Printf("\n🚀 工程化主题 [%s]:\n", t)
	fmt.Println("📝 该主题以实践为主，请参考 GOLearningRoadmap.vue 阶段6 的知识点并在实际项目中应用。")

	match := func(keywords ...string) bool {
		for _, kw := range keywords {
			if strings.Contains(t, kw) {
				return true
			}
		}
		return false
	}

	switch {
	case match("layout", "布局", "结构"):
		fmt.Println("   关注：标准 Go 项目布局, cmd/internal/pkg, Wire 依赖注入")
	case match("log", "日志", "slog", "zap"):
		fmt.Println("   关注：slog 结构化日志, 日志级别, 上下文信息, 日志切割")
	case match("error", "错误", "异常"):
		fmt.Println("   关注：自定义错误类型, errors.Is/As, %w 包装链")
	case match("profil", "性能", "pprof", "trace", "火焰"):
		fmt.Println("   关注：pprof, trace, 火焰图解读, benchstat")
	case match("test", "测试", "mock"):
		fmt.Println("   关注：表格驱动测试, gomock, testcontainers, 覆盖率")
	case match("ci", "cd", "cicd", "部署", "action"):
		fmt.Println("   关注：GitHub Actions, golangci-lint, Docker 构建部署")
	default:
		fmt.Printf("未知的工程化主题: %s\n", t)
		fmt.Println("可用主题: layout, logging, error, profiling, testing, cicd")
		return false
	}
	return true
}
