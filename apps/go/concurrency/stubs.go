package concurrency

import "fmt"

// RunContext 演示 context 包的用法。
// TODO: 边学边写 — 实现 context.WithCancel/WithTimeout/WithDeadline/WithValue 示例
func RunContext() {
	fmt.Println("\n--- Context 上下文 ---")
	fmt.Println("📝 TODO: 学到这里时来这里写代码！")
	fmt.Println("   参考知识点：context.Background(), WithCancel, WithTimeout, WithDeadline, WithValue")
	fmt.Println("   更多提示见 GOLearningRoadmap.vue 阶段2")
}

// RunPatterns 演示 Go 常见并发模式。
// TODO: 边学边写 — 生产者-消费者、扇入扇出、流水线、Worker Pool
func RunPatterns() {
	fmt.Println("\n--- 并发模式 ---")
	fmt.Println("📝 TODO: 学到这里时来这里写代码！")
	fmt.Println("   参考知识点：生产者-消费者、扇入(fan-in)、扇出(fan-out)、流水线(pipeline)、Worker Pool")
	fmt.Println("   更多提示见 GOLearningRoadmap.vue 阶段2")
}
