package microservices

import "fmt"

// RunAll 运行阶段 5 所有的微服务主题。
func RunAll() {
	fmt.Println("\n╔══════════════════════════════════════════════╗")
	fmt.Println("║       阶段 5：微服务与分布式系统            ║")
	fmt.Println("╚══════════════════════════════════════════════╝")

	RunGRPC()
	RunRegistry()
	RunConfig()
	RunMQ()
	RunTracing()
	RunDocker()
}

// RunTopic 根据关键字运行阶段 5 的某个主题。返回 true 表示匹配成功。
//
// 支持的关键字：
//   - "grpc", "protobuf"    → gRPC 与 Protobuf
//   - "registry"            → 服务注册发现
//   - "config", "viper"     → 配置中心
//   - "mq", "message", "queue" → 消息队列
//   - "tracing"             → 链路追踪
//   - "docker"              → 容器化部署
func RunTopic(topic string) bool {
	switch topic {
	case "grpc", "protobuf":
		RunGRPC()
	case "registry":
		RunRegistry()
	case "config", "viper":
		RunConfig()
	case "mq", "message", "queue":
		RunMQ()
	case "tracing":
		RunTracing()
	case "docker":
		RunDocker()
	default:
		return false
	}
	return true
}
