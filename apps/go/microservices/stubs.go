package microservices

import "fmt"

// RunMQ 演示消息队列。
// TODO: 边学边写 — RabbitMQ / Kafka 客户端
func RunMQ() {
	fmt.Println("\n--- 消息队列 ---")
	fmt.Println("📝 TODO: 学到这里时来这里写代码！")
	fmt.Println("   参考知识点：RabbitMQ(amqp091-go) 发布确认/消费Ack/死信队列, Kafka(sarama) 生产者/消费者组")
	fmt.Println("   需要先 go get github.com/rabbitmq/amqp091-go 或 github.com/IBM/sarama")
	fmt.Println("   更多提示见 GOLearningRoadmap.vue 阶段5")
}

// RunTracing 演示分布式链路追踪。
// TODO: 边学边写 — OpenTelemetry + Jaeger
func RunTracing() {
	fmt.Println("\n--- 分布式链路追踪 ---")
	fmt.Println("📝 TODO: 学到这里时来这里写代码！")
	fmt.Println("   参考知识点：OpenTelemetry SDK, Span 创建/传播, Jaeger exporter, 采样策略")
	fmt.Println("   需要先 go get go.opentelemetry.io/otel")
	fmt.Println("   更多提示见 GOLearningRoadmap.vue 阶段5")
}

// RunDocker 演示容器化部署。
// TODO: 边学边写 — Dockerfile 多阶段构建 + docker-compose
func RunDocker() {
	fmt.Println("\n--- Docker 容器化 ---")
	fmt.Println("📝 TODO: 学到这里时来这里写代码！")
	fmt.Println("   参考知识点：多阶段构建 Dockerfile, docker-compose.yml, FROM scratch, 健康检查")
	fmt.Println("   更多提示见 GOLearningRoadmap.vue 阶段5")
}
