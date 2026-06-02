package basics

import (
	"fmt"
	"strings"
	"unicode/utf8"
)

// RunStringsRune 演示 Go 的 strings 包操作与 rune/byte 区别。
func RunStringsRune() {
	// --- strings 常用函数 ---
	fmt.Println("\n--- strings 常用函数 ---")

	s := "Hello, Go Gopher!"

	// Contains
	fmt.Printf("Contains(s, \"Go\") = %t\n", strings.Contains(s, "Go"))
	fmt.Printf("Contains(s, \"Java\") = %t\n", strings.Contains(s, "Java"))

	// HasPrefix / HasSuffix
	fmt.Printf("HasPrefix(s, \"Hello\") = %t\n", strings.HasPrefix(s, "Hello"))
	fmt.Printf("HasSuffix(s, \"!\") = %t\n", strings.HasSuffix(s, "!"))

	// Split / Join
	parts := strings.Split("a,b,c,d", ",")
	fmt.Printf("Split(\"a,b,c,d\", \",\") = %q\n", parts)
	joined := strings.Join(parts, " | ")
	fmt.Printf("Join(parts, \" | \") = %q\n", joined)

	// Replace
	fmt.Printf("Replace(\"Go\", \"gopher\", -1) = %q\n", strings.Replace(s, "Go", "gopher", -1))
	fmt.Printf("Replace(\"o\", \"0\", 2) = %q\n", strings.Replace(s, "o", "0", 2))

	// Trim / TrimSpace
	raw := "  spaces around  "
	fmt.Printf("TrimSpace(%q) = %q\n", raw, strings.TrimSpace(raw))
	fmt.Printf("Trim(%q, \"x\") = %q\n", "xxxHelloxxx", strings.Trim("xxxHelloxxx", "x"))

	// ToLower / ToUpper
	fmt.Printf("ToUpper(%q) = %q\n", s, strings.ToUpper(s))
	fmt.Printf("ToLower(%q) = %q\n", s, strings.ToLower(s))

	// --- strings.Builder（高效拼接） ---
	fmt.Println("\n--- strings.Builder ---")
	var sb strings.Builder
	sb.WriteString("Go ")
	sb.WriteString("is ")
	sb.WriteString("fun!")
	fmt.Printf("Builder result: %q\n", sb.String())
	fmt.Printf("Builder Len=%d, Cap=%d\n", sb.Len(), sb.Cap())

	// 重置
	sb.Reset()
	sb.WriteString("reset and write")
	fmt.Printf("After reset: %q\n", sb.String())

	fmt.Println("\n提示: strings.Builder 比 += 拼接高效得多（预分配，零拷贝）")

	// --- byte vs rune ---
	fmt.Println("\n--- byte vs rune ---")

	ascii := "Go"
	unicode := "你好"

	// byte 是 uint8 别名，单字节
	fmt.Printf("ASCII \"Go\":   len=%d, bytes: ", len(ascii))
	for i := 0; i < len(ascii); i++ {
		fmt.Printf("%c ", ascii[i])
	}
	fmt.Println()

	// rune 是 int32 别名，代表一个 Unicode 码点
	fmt.Printf("中文 \"你好\": len=%d, 但只有 %d 个字符\n", len(unicode), utf8.RuneCountInString(unicode))

	// --- range 遍历字符串 ---
	fmt.Println("\n--- range 遍历字符串 ---")

	text := "Go语言"
	fmt.Printf("字符串: %q\n", text)

	// 按字节遍历（UTF-8 原始字节）
	fmt.Print("byte index: ")
	for i := 0; i < len(text); i++ {
		fmt.Printf("[%d]=%c ", i, text[i])
	}
	fmt.Println()

	// 按 rune 遍历（推荐，正确处理多字节字符）
	fmt.Print("rune range: ")
	for i, r := range text {
		fmt.Printf("[%d]=%c ", i, r)
	}
	fmt.Println()

	fmt.Println("\n关键: len() 返回字节数，range 返回 rune（即字符位置）")
	fmt.Println("中文每个字符占 3 个 UTF-8 字节")

	// --- 字符串不可变 ---
	fmt.Println("\n--- 字符串不可变 ---")
	fmt.Println("Go 字符串是不可变的（immutable）。")
	fmt.Println("  s := \"hello\"")
	fmt.Println("  s[0] = 'H'  // ❌ 编译错误: cannot assign to s[0]")
	fmt.Println("修改方式: 转为 []byte 或 []rune 再操作")

	// 修改字符串的两种方式
	original := "hello"
	// 方式一：[]byte (仅 ASCII 安全)
	bytes := []byte(original)
	bytes[0] = 'H'
	fmt.Printf("[]byte 修改: %q → %q\n", original, string(bytes))

	// 方式二：[]rune (Unicode 安全)
	chinese := "你好世界"
	runes := []rune(chinese)
	runes[2] = '新'
	fmt.Printf("[]rune 修改: %q → %q\n", chinese, string(runes))
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunStringsRune() }
