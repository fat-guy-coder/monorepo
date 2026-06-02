package basics

import "fmt"

// RunEnvTools 演示 Go 环境关键概念和实践。
func RunEnvTools() {
	fmt.Println("Go 环境搭建与工具链")
	fmt.Println()

	fmt.Println("1. 安装 Go")
	fmt.Println("   官网: https://go.dev/dl/")
	fmt.Println("   Windows: .msi 安装包，自动加入 PATH")
	fmt.Println("   macOS:   brew install go")
	fmt.Println("   Linux:   sudo tar -C /usr/local -xzf go*.tar.gz")
	fmt.Println()

	fmt.Println("2. 验证安装")
	fmt.Println("   $ go version")
	fmt.Println("   go version go1.22.0 windows/amd64")
	fmt.Println("   $ go env GOPATH GOROOT")
	fmt.Println()

	fmt.Println("3. GOROOT vs GOPATH")
	fmt.Printf("   GOROOT = Go 安装目录（编译器+标准库）\n")
	fmt.Printf("   GOPATH = 工作区（模块缓存 pkg/mod/ + go install 的 bin/）\n")
	fmt.Printf("   Go Modules 时代，项目不用放在 GOPATH 下\n")
	fmt.Println()

	fmt.Println("4. Go Modules")
	fmt.Println("   $ go mod init example/hello")
	fmt.Println("   $ go mod tidy    # 整理依赖")
	fmt.Println("   $ go get pkg@v   # 添加依赖")
	fmt.Println()

	fmt.Println("5. 核心 CLI 命令")
	commands := map[string]string{
		"go run main.go":           "编译+运行",
		"go build -o app ./...":    "编译生成二进制",
		"go fmt ./...":             "自动格式化",
		"go vet ./...":             "静态分析",
		"go test ./...":            "运行测试",
		"go test -cover ./...":     "测试覆盖率",
		"go mod tidy":             "整理依赖",
		"go env GOPATH":            "查看环境变量",
	}
	for cmd, desc := range commands {
		fmt.Printf("   %-25s # %s\n", cmd, desc)
	}
	fmt.Println()

	fmt.Println("6. IDE 推荐")
	fmt.Println("   VS Code + Go 扩展（免费，推荐）")
	fmt.Println("   GoLand（商业，功能最全）")
	fmt.Println("   开启保存时 go fmt + goimports")
	fmt.Println()

	fmt.Println("7. Hello World")
	fmt.Println(`   package main
   import "fmt"
   func main() { fmt.Println("Hello, Go!") }`)
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunEnvTools() }
