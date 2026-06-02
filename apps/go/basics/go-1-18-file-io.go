package basics

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
)

// RunFileIO 演示文件 I/O：os 包、bufio、filepath、embed 及 ioutil 废弃说明。
func RunFileIO() {
	// --- 写入文件 ---
	fmt.Println("--- 写入文件 ---")
	data := []byte("Hello, Go File I/O!\nLine 2\nLine 3\n")
	err := os.WriteFile("demo_output.txt", data, 0644)
	if err != nil {
		fmt.Printf("WriteFile error: %v\n", err)
		return
	}
	fmt.Println("写入成功: demo_output.txt")

	// 清理（演示结束后删除）
	defer os.Remove("demo_output.txt")

	// --- 读取整个文件 ---
	fmt.Println("\n--- 读取整个文件 os.ReadFile ---")
	content, err := os.ReadFile("demo_output.txt")
	if err != nil {
		fmt.Printf("ReadFile error: %v\n", err)
	} else {
		fmt.Printf("文件内容 (%d bytes):\n%s", len(content), content)
	}

	// --- 逐行读取 bufio.Scanner ---
	fmt.Println("\n--- 逐行读取 bufio.Scanner ---")
	file, err := os.Open("demo_output.txt")
	if err != nil {
		fmt.Printf("Open error: %v\n", err)
	} else {
		defer file.Close()
		scanner := bufio.NewScanner(file)
		lineNum := 0
		for scanner.Scan() {
			lineNum++
			fmt.Printf("  Line %d: %s\n", lineNum, scanner.Text())
		}
		if err := scanner.Err(); err != nil {
			fmt.Printf("Scanner error: %v\n", err)
		}
	}

	// --- os.Open / os.Create 模式对比 ---
	fmt.Println("\n--- os.OpenFile 标志 ---")
	fmt.Println("常用打开模式:")
	fmt.Println("  os.O_RDONLY       只读")
	fmt.Println("  os.O_WRONLY       只写")
	fmt.Println("  os.O_RDWR         读写")
	fmt.Println("  os.O_CREATE       不存在则创建")
	fmt.Println("  os.O_APPEND       追加写入")
	fmt.Println("  os.O_TRUNC        清空后写入")
	fmt.Println("  os.O_EXCL         与 CREATE 同用，文件已存在则失败")
	fmt.Println()
	fmt.Println("组合示例:")
	fmt.Println("  os.OpenFile(name, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0644)")
	fmt.Println()
	fmt.Println("快捷函数:")
	fmt.Println("  os.Create(name)   // = OpenFile(name, O_RDWR|O_CREATE|O_TRUNC, 0666)")
	fmt.Println("  os.Open(name)     // = OpenFile(name, O_RDONLY, 0)")

	// --- filepath 包 ---
	fmt.Println("\n--- filepath 包 ---")
	p := filepath.Join("dir", "subdir", "file.txt")
	fmt.Printf("  Join:                 %s\n", p)
	fmt.Printf("  Dir:                  %s\n", filepath.Dir(p))
	fmt.Printf("  Base:                 %s\n", filepath.Base(p))
	fmt.Printf("  Ext:                  %s\n", filepath.Ext(p))

	// Walk 遍历目录（演示结构）
	fmt.Println("  Walk 示例:")
	fmt.Println("    filepath.Walk(\".\", func(path string, info os.FileInfo, err error) error {")
	fmt.Println("        if err != nil { return err }")
	fmt.Println("        fmt.Println(path)")
	fmt.Println("        return nil")
	fmt.Println("    })")

	// Glob 匹配
	fmt.Println("  Glob 示例:")
	fmt.Println("    matches, _ := filepath.Glob(\"*.txt\")")
	fmt.Println("    filepath.Glob(\"data/**/*.json\")  // 无 ** 递归，需第三方库")

	// Abs / Rel
	abs, _ := filepath.Abs("demo_output.txt")
	fmt.Printf("  Abs:  %s\n", abs)

	// --- embed 嵌入文件 ---
	fmt.Println("\n--- embed (Go 1.16+) ---")
	fmt.Println("embed 将文件嵌入二进制，无需运行时读取磁盘:")
	fmt.Println("  //go:embed static/*")
	fmt.Println("  var staticFiles embed.FS")
	fmt.Println()
	fmt.Println("  //go:embed config.json")
	fmt.Println("  var configBytes []byte")
	fmt.Println()
	fmt.Println("使用:")
	fmt.Println("  data, _ := staticFiles.ReadFile(\"static/style.css\")")
	fmt.Println("  f, _ := staticFiles.Open(\"static/index.html\")")

	// embed 示例需要 testdata/ 目录，此处略
	fmt.Println("  embed demo: see https://pkg.go.dev/embed")

	// --- ioutil 废弃说明 ---
	fmt.Println("\n--- ioutil 废弃说明 (Go 1.16+) ---")
	fmt.Println("以下 ioutil 函数已迁移到对应的包:")
	fmt.Println("  ioutil.ReadFile  → os.ReadFile")
	fmt.Println("  ioutil.WriteFile → os.WriteFile")
	fmt.Println("  ioutil.ReadAll   → io.ReadAll")
	fmt.Println("  ioutil.ReadDir   → os.ReadDir (返回 []os.DirEntry)")
	fmt.Println("  ioutil.NopCloser → io.NopCloser")
	fmt.Println("  ioutil.TempFile  → os.CreateTemp")
	fmt.Println("  ioutil.TempDir   → os.MkdirTemp")
	fmt.Println("  ioutil.Discard   → io.Discard")
	fmt.Println()
	fmt.Println("迁移简单：去掉 ioutil. 前缀，修正包名即可。")
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunFileIO() }
