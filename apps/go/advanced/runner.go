package advanced

import (
	"fmt"
	"strings"
)

// RunAll 按顺序运行阶段 7 的所有进阶主题。
func RunAll() {
	fmt.Println("\n🧠 ========== 阶段 7: 进阶拓展 ==========")
	fmt.Println("涵盖：泛型 → 反射 → unsafe → CGO → 内存管理 → WASM → 网络编程 → 性能优化\n")
	fmt.Println("📝 进阶主题，建议学完前 6 个阶段后再深入。每个主题都值得花时间研究。\n")

	fmt.Println("--- 泛型 (Go 1.18+) ---")
	fmt.Println("📝 类型参数、约束(constraints)、泛型函数与类型、类型推断")
	fmt.Println("   实践：实现泛型 Map/Filter/Reduce、泛型 Set")

	fmt.Println("\n--- 反射 (reflect) ---")
	fmt.Println("📝 reflect.TypeOf/ValueOf, 结构体标签解析, 方法调用")
	fmt.Println("   实践：手写一个简易 JSON 序列化器")

	fmt.Println("\n--- unsafe 包 ---")
	fmt.Println("📝 unsafe.Pointer, Sizeof/Alignof/Offsetof, 类型转换")
	fmt.Println("   ⚠️ unsafe 是双刃剑，仅在性能关键路径使用")

	fmt.Println("\n--- CGO ---")
	fmt.Println("📝 import \"C\", 调用 C 库, 内存边界管理")
	fmt.Println("   前提：需要安装 C 编译器 (gcc/mingw)")

	fmt.Println("\n--- 内存管理 ---")
	fmt.Println("📝 栈/堆分配, 逃逸分析(-gcflags=\"-m\"), GC 原理, GOGC 调优")

	fmt.Println("\n--- WASM ---")
	fmt.Println("📝 GOOS=js GOARCH=wasm go build, syscall/js, DOM 操作")

	fmt.Println("\n--- 网络编程进阶 ---")
	fmt.Println("📝 TCP/UDP 服务器, net.Poller, 自定义协议, 连接池")

	fmt.Println("\n--- 性能优化实战 ---")
	fmt.Println("📝 strings.Builder vs +, 预分配 slice, sync.Pool, benchstat 对比")
}

// RunTopic 根据关键词运行指定的进阶主题。
func RunTopic(topic string) bool {
	t := strings.ToLower(strings.TrimSpace(topic))
	fmt.Printf("\n🧠 进阶主题 [%s]:\n", t)
	fmt.Println("📝 该主题以深度研究为主，请参考 GOLearningRoadmap.vue 阶段7 的知识点。")

	match := func(keywords ...string) bool {
		for _, kw := range keywords {
			if strings.Contains(t, kw) {
				return true
			}
		}
		return false
	}

	switch {
	case match("generic", "泛型"):
		fmt.Println("   关注：类型参数 [T any], 约束, 泛型 Map/Filter/Reduce")
	case match("reflect", "反射"):
		fmt.Println("   关注：reflect.Type/Value, 结构体标签, 运行时类型操作")
	case match("unsafe"):
		fmt.Println("   关注：unsafe.Pointer, 内存布局, 性能优化边界")
	case match("cgo"):
		fmt.Println("   关注：CGO_ENABLED, import \"C\", Go/C 互操作")
	case match("memory", "内存", "gc", "逃逸"):
		fmt.Println("   关注：逃逸分析, GC 调优, 内存分配优化")
	case match("wasm", "webassembly"):
		fmt.Println("   关注：GOOS=js GOARCH=wasm, syscall/js")
	case match("network", "网络", "tcp", "udp"):
		fmt.Println("   关注：TCP/UDP 服务器, net.Poller, 连接池")
	case match("optimiz", "optim", "性能", "benchmark"):
		fmt.Println("   关注：benchstat, 分配优化, 内联, 边界检查消除")
	default:
		fmt.Printf("未知的进阶主题: %s\n", t)
		fmt.Println("可用主题: generics, reflect, unsafe, cgo, memory, wasm, network, optimization")
		return false
	}
	return true
}
