package basics

import (
	"fmt"
	"strings"
	"unicode/utf8"
)

// RunStringsRune 演示 Go 的 strings 包操作与 rune（字符）/byte（字节）区别。
func RunStringsRune() {
	// ═══════════════════════════════════════════
	// strings 常用函数（Contains/HasPrefix/Split/Join/Replace/Trim）
	// ═══════════════════════════════════════════
	fmt.Println("\n--- strings 常用函数 ---")

	s := "Hello, Go Gopher!"

	// Contains — 是否包含子串
	fmt.Printf("Contains(s, \"Go\") = %t\n", strings.Contains(s, "Go"))
	// 输出: "Contains(s, \"Go\") = true"
	fmt.Printf("Contains(s, \"Java\") = %t\n", strings.Contains(s, "Java"))
	// 输出: "Contains(s, \"Java\") = false"

	// HasPrefix / HasSuffix — 前缀/后缀匹配
	fmt.Printf("HasPrefix(s, \"Hello\") = %t\n", strings.HasPrefix(s, "Hello"))
	// 输出: "HasPrefix(s, \"Hello\") = true"
	fmt.Printf("HasSuffix(s, \"!\") = %t\n", strings.HasSuffix(s, "!"))
	// 输出: "HasSuffix(s, \"!\") = true"

	// Split / Join — 切割/拼接
	parts := strings.Split("a,b,c,d", ",")
	fmt.Printf("Split(\"a,b,c,d\", \",\") = %q\n", parts)
	// 输出: "Split(\"a,b,c,d\", \",\") = [\"a\" \"b\" \"c\" \"d\"]"
	joined := strings.Join(parts, " | ")
	fmt.Printf("Join(parts, \" | \") = %q\n", joined)
	// 输出: "Join(parts, \" | \") = \"a | b | c | d\""

	// Replace — 替换（-1=全部, N=替换前N个）
	fmt.Printf("Replace(\"Go\", \"gopher\", -1) = %q\n", strings.Replace(s, "Go", "gopher", -1))
	// 输出: "Replace(\"Go\", \"gopher\", -1) = \"Hello, gopher Gopher!\""
	fmt.Printf("Replace(\"o\", \"0\", 2) = %q\n", strings.Replace(s, "o", "0", 2))
	// 输出: "Replace(\"o\", \"0\", 2) = \"Hell0, G0 Gopher!\""

	// Trim / TrimSpace — 去除首尾字符/空格
	raw := "  spaces around  "
	fmt.Printf("TrimSpace(%q) = %q\n", raw, strings.TrimSpace(raw))
	// 输出: "TrimSpace(\"  spaces around  \") = \"spaces around\""
	fmt.Printf("Trim(%q, \"x\") = %q\n", "xxxHelloxxx", strings.Trim("xxxHelloxxx", "x"))
	// 输出: "Trim(\"xxxHelloxxx\", \"x\") = \"Hello\""

	// ToLower / ToUpper — 大小写转换
	fmt.Printf("ToUpper(%q) = %q\n", s, strings.ToUpper(s))
	// 输出: "ToUpper(\"Hello, Go Gopher!\") = \"HELLO, GO GOPHER!\""
	fmt.Printf("ToLower(%q) = %q\n", s, strings.ToLower(s))
	// 输出: "ToLower(\"Hello, Go Gopher!\") = \"hello, go gopher!\""

	// ═══════════════════════════════════════════
	// strings.Builder — 高效字符串拼接
	// 比 += 高效（预分配内存，零拷贝）
	// ═══════════════════════════════════════════
	fmt.Println("\n--- strings.Builder ---")
	var sb strings.Builder
	sb.WriteString("Go ")
	sb.WriteString("is ")
	sb.WriteString("fun!")
	fmt.Printf("Builder result: %q\n", sb.String())
	// 输出: "Builder result: \"Go is fun!\""
	fmt.Printf("Builder Len=%d, Cap=%d\n", sb.Len(), sb.Cap())
	// 输出示例: "Builder Len=10, Cap=16"

	// 重置 Builder（复用底层数组，避免分配新内存）
	sb.Reset()
	sb.WriteString("reset and write")
	fmt.Printf("After reset: %q\n", sb.String())
	// 输出: "After reset: \"reset and write\""

	fmt.Println("\n提示: strings.Builder 比 += 拼接高效得多（预分配，零拷贝）")

	// ═══════════════════════════════════════════
	// byte vs rune — 核心概念！
	// byte  = uint8  = 1 字节（ASCII 字符占 1 字节）
	// rune  = int32  = 1 个 Unicode 码点（中文占 1 个 rune，但 3 个字节）
	// ═══════════════════════════════════════════
	fmt.Println("\n--- byte vs rune ---")

	ascii := "Go"
	unicode := "你好"

	// 按字节遍历 ASCII — 每个字母 1 字节
	fmt.Printf("ASCII \"Go\":   len=%d, bytes: ", len(ascii))
	for i := 0; i < len(ascii); i++ {
		fmt.Printf("%c ", ascii[i])
	}
	fmt.Println()
	// 输出: "ASCII \"Go\":   len=2, bytes: G o "

	// 按字节遍历中文 — 1 个中文字 = 3 字节！len() 返回字节数不是字符数
	fmt.Printf("中文 \"你好\": len=%d, 但只有 %d 个字符\n", len(unicode), utf8.RuneCountInString(unicode))
	// 输出: "中文 \"你好\": len=6, 但只有 2 个字符"

	// ═══════════════════════════════════════════
	// range 遍历字符串的两种方式
	// ═══════════════════════════════════════════
	fmt.Println("\n--- range 遍历字符串 ---")

	text := "Go语言"
	fmt.Printf("字符串: %q\n", text)
	// 输出: "字符串: \"Go语言\""

	// 方式一：按字节遍历 — 看到原始 UTF-8 字节
	fmt.Print("byte index: ")
	for i := 0; i < len(text); i++ {
		fmt.Printf("[%d]=%c ", i, text[i])
	}
	fmt.Println()
	// 输出: "byte index: [0]=G [1]=o [2]=è [3]=¯ [4]=­ [5]=è [6]=¨ [7]="
	// 注意: 索引 2-7 是乱码——因为按字节切割了 UTF-8 编码的中文字符

	// 方式二：按 rune 遍历 — 正确处理多字节字符
	fmt.Print("rune range: ")
	for i, r := range text {
		fmt.Printf("[%d]=%c ", i, r)
	}
	fmt.Println()
	// 输出: "rune range: [0]=G [1]=o [2]=语 [5]=言"
	// 注意: "语"的索引是 2（不是 3！），"言"的索引是 5——跳过了中间的 UTF-8 续字节

	fmt.Println("\n关键: len() 返回字节数，range 返回 rune（即字符位置）")
	fmt.Println("中文每个字符占 3 个 UTF-8 字节")

	// ═══════════════════════════════════════════
	// 字符串不可变 + 修改方法
	// ═══════════════════════════════════════════
	fmt.Println("\n--- 字符串不可变 ---")
	fmt.Println("Go 字符串是不可变的（immutable）。")
	fmt.Println("  s := \"hello\"")
	fmt.Println("  s[0] = 'H'  // ❌ 编译错误: cannot assign to s[0]")
	fmt.Println("修改方式: 转为 []byte 或 []rune 再操作")

	// 方式一：[]byte（仅 ASCII 安全）
	original := "hello"
	bytes := []byte(original)
	bytes[0] = 'H'
	fmt.Printf("[]byte 修改: %q → %q\n", original, string(bytes))
	// 输出: "[]byte 修改: \"hello\" → \"Hello\""

	// 方式二：[]rune（Unicode 安全——中文也能正确修改）
	chinese := "你好世界"
	runes := []rune(chinese)
	runes[2] = '新'
	fmt.Printf("[]rune 修改: %q → %q\n", chinese, string(runes))
	// 输出: "[]rune 修改: \"你好世界\" → \"你好新界\""
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunStringsRune() }
