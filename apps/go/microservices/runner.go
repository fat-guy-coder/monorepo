package microservices

import "fmt"

// RunAll 运行阶段 5 所有的微服务主题。
func RunAll() {
	fmt.Println("\n🏗️ ========== 阶段 5: 微服务与分布式系统 ==========")

	RunGRPC()
	// TODO: RunGrpcUnary()
	// TODO: RunGrpcStream()
	// TODO: RunGrpcInterceptor()
	// TODO: RunGrpcLbRetry()
	RunRegistry()
	RunConfig()
	// TODO: RunMqRabbitmq()
	// TODO: RunMqKafka()
	// TODO: RunEventDriven()
	// TODO: RunDistributedTracing()
	// TODO: RunCircuitBreaker()
	// TODO: RunIdempotency()
	// TODO: RunDistributedTransaction()
	// TODO: RunDddArchitecture()
	// TODO: RunDocker()

	fmt.Println("\n✅ 微服务阶段完成！")
}

func RunTopic(topic string) bool {
	switch topic {
	case "grpc", "protobuf":
		RunGRPC()
	case "registry":
		RunRegistry()
	case "config", "viper":
		RunConfig()
	default:
		fmt.Printf("未知的微服务主题: %s\n", topic)
		fmt.Println("可用: grpc, registry, config")
		return false
	}
	return true
}
