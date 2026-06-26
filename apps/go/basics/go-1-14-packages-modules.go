package basics

import (
	"fmt"
	"math"
	"strings"
)

// RunPackagesModules 演示 Go 的包组织、导入与模块管理。
func RunPackagesModules() {
	// ═══════════════════════════════════════════
	// 导出规则：大写=Public, 小写=private
	// ═══════════════════════════════════════════
	fmt.Println("\n--- 导出规则：首字母决定可见性 ---")
	fmt.Println("大写开头 → 导出 (Public):  fmt.Println, strings.Builder")
	fmt.Println("小写开头 → 未导出 (Private): strings.clone, math.sqrt")
	fmt.Println()
	// 输出:
	// 大写开头 → 导出 (Public):  fmt.Println, strings.Builder
	// 小写开头 → 未导出 (Private): strings.clone, math.sqrt
	fmt.Println("适用：类型、函数、方法、变量、常量、结构体字段")
	// 输出: 适用：类型、函数、方法、变量、常量、结构体字段

	type Person struct {
		Name string // 导出（跨包可用）
		age  int    // 未导出（仅本包内可用）
	}
	p := Person{Name: "Bob"}
	fmt.Printf("Person{Name:%q, age:%d}\n", p.Name, p.age)
	// 输出: Person{Name:"Bob", age:0}  (age 未初始化,零值=0)

	// ═══════════════════════════════════════════
	// 导入模式 (4 种)
	// ═══════════════════════════════════════════
	fmt.Println("\n--- 导入模式 ---")
	fmt.Println("标准导入:")
	fmt.Println(`  import "fmt"`)
	fmt.Println("别名导入:")
	fmt.Println(`  import f "fmt"          // f.Println()`)
	fmt.Println("空白导入（仅执行 init）:")
	fmt.Println(`  import _ "image/png"    // 注册 PNG 解码器`)
	fmt.Println("点导入（不推荐，污染命名空间）:")
	fmt.Println(`  import . "math"         // 直接用 Pi 而非 math.Pi`)
	// 输出:
	// 标准导入:
	//   import "fmt"
	// 别名导入:
	//   import f "fmt"          // f.Println()
	// 空白导入（仅执行 init）:
	//   import _ "image/png"    // 注册 PNG 解码器
	// 点导入（不推荐，污染命名空间）:
	//   import . "math"         // 直接用 Pi 而非 math.Pi

	// ═══════════════════════════════════════════
	// init() 函数
	// ═══════════════════════════════════════════
	fmt.Println("\n--- init() 函数 ---")
	fmt.Println("- 每个包可有多个 init() 函数")
	fmt.Println("- 执行顺序: 被导入包的 init → 当前包的 init → main()")
	fmt.Println("- 同一文件内按声明顺序执行，不同文件按文件名字典序")
	fmt.Println("- 用于: 初始化全局状态、注册驱动、校验配置")
	// 输出:
	// - 每个包可有多个 init() 函数
	// - 执行顺序: 被导入包的 init → 当前包的 init → main()
	// - 同一文件内按声明顺序执行，不同文件按文件名字典序
	// - 用于: 初始化全局状态、注册驱动、校验配置

	// ═══════════════════════════════════════════
	// internal 包 (编译器强制隔离)
	// ═══════════════════════════════════════════
	fmt.Println("\n--- internal 包 ---")
	fmt.Println("/internal/ 目录下的包只能被其父级目录树内的包导入")
	fmt.Println("例如: myapp/internal/config 只能被 myapp/... 导入")
	fmt.Println("编译器强制执行，外部包 import 会报错")
	// 输出:
	// /internal/ 目录下的包只能被其父级目录树内的包导入
	// 例如: myapp/internal/config 只能被 myapp/... 导入
	// 编译器强制执行，外部包 import 会报错

	// ═══════════════════════════════════════════
	// 包名约定
	// ═══════════════════════════════════════════
	fmt.Println("\n--- 包名约定 ---")
	fmt.Println("- 包名 = 目录名，保持简短、小写、单数")
	fmt.Println("- 避免: util, common, base, misc（无意义命名）")
	fmt.Println("- 好的包名: http, json, strconv, user, auth")
	// 输出:
	// - 包名 = 目录名，保持简短、小写、单数
	// - 避免: util, common, base, misc（无意义命名）
	// - 好的包名: http, json, strconv, user, auth

	// ═══════════════════════════════════════════
	// go.mod 结构
	// ═══════════════════════════════════════════
	fmt.Println("\n--- go.mod 速览 ---")
	fmt.Println("// go.mod")
	fmt.Println("module github.com/user/project")
	fmt.Println("go 1.22")
	fmt.Println("require (")
	fmt.Println("    github.com/gin-gonic/gin v1.9.1")
	fmt.Println(")")
	fmt.Println()
	fmt.Println("go mod tidy   — 整理依赖")
	fmt.Println("go get pkg    — 添加依赖")
	fmt.Println("go mod vendor — 创建 vendor 目录")
	// 输出:
	// // go.mod
	// module github.com/user/project
	// go 1.22
	// require (
	//     github.com/gin-gonic/gin v1.9.1
	// )
	// go mod tidy   — 整理依赖
	// go get pkg    — 添加依赖
	// go mod vendor — 创建 vendor 目录

	// ═══════════════════════════════════════════
	// 构建标签 (条件编译)
	// ═══════════════════════════════════════════
	fmt.Println("\n--- 构建标签 ---")
	fmt.Println("方式一 — 文件后缀:")
	fmt.Println("  file_linux.go      // 仅 Linux")
	fmt.Println("  file_windows.go    // 仅 Windows")
	fmt.Println("  file_amd64.go      // 仅 amd64 架构")
	fmt.Println("  file_linux_amd64.go // Linux + amd64")
	fmt.Println()
	fmt.Println("方式二 — //go:build 指令 (Go 1.17+):")
	fmt.Println("  //go:build linux")
	fmt.Println("  //go:build linux && amd64")
	fmt.Println("  //go:build !windows")
	// 输出:
	// 方式一 — 文件后缀:
	//   file_linux.go      // 仅 Linux
	//   file_windows.go    // 仅 Windows
	//   file_amd64.go      // 仅 amd64 架构
	//   file_linux_amd64.go // Linux + amd64
	// 方式二 — //go:build 指令 (Go 1.17+):
	//   //go:build linux
	//   //go:build linux && amd64
	//   //go:build !windows

	// 运行时演示
	fmt.Println("\n运行时检测:")
	fmt.Printf("  math.MaxFloat64 = %g\n", math.MaxFloat64)
	// 输出示例: "  math.MaxFloat64 = 1.7976931348623157e+308"
	fmt.Printf("  strings.Repeat(\"go\", 3) = %q\n", strings.Repeat("go", 3))
	// 输出: "  strings.Repeat(\"go\", 3) = \"gogogo\""
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunPackagesModules() }
