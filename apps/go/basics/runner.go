package basics

import (
	"fmt"
	"strings"
)

// RunAll 按顺序运行所有基础入门主题。
func RunAll() {
	fmt.Println("🔰 ========== 阶段 1: 基础入门 ==========")

	RunEnvTools()
	RunVariables()
	RunOperators()
	RunFmtIO()
	RunControlFlow()
	RunFunctions()
	RunFunctionsAdvanced()
	RunArraysSlices()
	RunMaps()
	RunPointers()
	RunStructs()
	RunNewMake()
	RunMethodsInterfaces()
	RunPackagesModules()
	RunStringsRune()
	RunErrorHandling()
	RunTime()
	RunFileIO()
	RunTesting()

	fmt.Println("\n✅ 基础入门阶段完成！")
}

// RunTopic 根据主题名称运行对应模块。
func RunTopic(topic string) bool {
	topic = strings.ToLower(strings.TrimSpace(topic))

	switch {
	case matchTopic(topic, "env", "tools", "环境", "工具"):
		RunEnvTools()
	case matchTopic(topic, "variable", "variables", "变量", "类型"):
		RunVariables()
	case matchTopic(topic, "operator", "operators", "运算符"):
		RunOperators()
	case matchTopic(topic, "fmt", "io", "print", "格式化"):
		RunFmtIO()
	case matchTopic(topic, "control", "if", "for", "switch", "控制"):
		RunControlFlow()
	case matchTopic(topic, "function", "functions", "func", "函数"):
		RunFunctions()
	case matchTopic(topic, "defer", "closure", "panic", "闭包", "延迟"):
		RunFunctionsAdvanced()
	case matchTopic(topic, "array", "slice", "数组", "切片"):
		RunArraysSlices()
	case matchTopic(topic, "map", "映射"):
		RunMaps()
	case matchTopic(topic, "pointer", "指针"):
		RunPointers()
	case matchTopic(topic, "struct", "结构体"):
		RunStructs()
	case matchTopic(topic, "new", "make"):
		RunNewMake()
	case matchTopic(topic, "method", "interface", "方法", "接口"):
		RunMethodsInterfaces()
	case matchTopic(topic, "package", "module", "包", "模块"):
		RunPackagesModules()
	case matchTopic(topic, "string", "rune", "字符串"):
		RunStringsRune()
	case matchTopic(topic, "error", "错误"):
		RunErrorHandling()
	case matchTopic(topic, "time", "时间"):
		RunTime()
	case matchTopic(topic, "file", "io", "文件"):
		RunFileIO()
	case matchTopic(topic, "test", "测试"):
		RunTesting()
	default:
		fmt.Printf("未知的基础主题: %s\n", topic)
		fmt.Println("可用: env, variables, operators, fmt, control, functions, defer, arrays, maps, pointers, structs, new, methods, packages, strings, errors, time, file, testing")
		return false
	}
	return true
}

func matchTopic(input string, keywords ...string) bool {
	for _, kw := range keywords {
		if input == kw || strings.Contains(input, kw) || strings.Contains(kw, input) {
			return true
		}
	}
	return false
}
