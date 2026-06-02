package basics

import (
	"fmt"
	"strings"
)

// RunOperators 演示 Go 中的所有运算符：算术、比较、逻辑、位、赋值、优先级。
func RunOperators() {
	fmt.Println("\n--- 算术运算符 ---")
	a, b := 10, 3
	fmt.Printf("a=%d, b=%d\n", a, b)
	fmt.Printf("a+b=%d, a-b=%d, a*b=%d, a/b=%d, a%%b=%d\n", a+b, a-b, a*b, a/b, a%b)

	// 浮点除法
	fmt.Printf("float64(a)/float64(b)=%.3f\n", float64(a)/float64(b))

	// 取余符号跟随被除数
	fmt.Printf("-5 %% 3 = %d, 5 %% -3 = %d\n", -5%3, 5%-3)

	// ++ 和 --（只能后置，语句非表达式）
	x := 5
	x++
	fmt.Printf("x++ = %d, ", x)
	x--
	fmt.Printf("x-- = %d\n", x)

	fmt.Println("\n--- 比较运算符 ---")
	fmt.Printf("a==b=%t, a!=b=%t, a>b=%t, a<b=%t, a>=b=%t, a<=b=%t\n",
		a == b, a != b, a > b, a < b, a >= b, a <= b)
	// 字符串比较（字典序）
	fmt.Printf(`"abc"=="abc"=%t, "abc"<"abd"=%t`+"\n", "abc" == "abc", "abc" < "abd")

	fmt.Println("\n--- 逻辑运算符（短路求值） ---")
	t, f := true, false
	fmt.Printf("t&&f=%t, t||f=%t, !t=%t\n", t && f, t || f, !t)
	// 短路演示
	calls := 0
	expensive := func() bool { calls++; return true }
	_ = false && expensive()
	fmt.Printf("&& 短路: expensive 调用次数=%d (未调用)\n", calls)
	_ = true || expensive()
	fmt.Printf("|| 短路: expensive 调用次数=%d (未调用)\n", calls)

	fmt.Println("\n--- 位运算符 ---")
	fmt.Printf("5 & 3  = %d (0101 & 0011 = 0001)\n", 5&3)
	fmt.Printf("5 | 3  = %d (0101 | 0011 = 0111)\n", 5|3)
	fmt.Printf("5 ^ 3  = %d (0101 ^ 0011 = 0110)\n", 5^3)
	fmt.Printf("5 &^ 3 = %d (0101 &^ 0011 = 0100) — Go 特有\n", 5&^3)
	fmt.Printf("1 << 3 = %d (左移)\n", 1<<3)
	fmt.Printf("8 >> 2 = %d (右移)\n", 8>>2)

	// 一元 ^ 取反
	var c uint8 = 0b00001111
	fmt.Printf("^%08b = %08b (按位取反)\n", c, ^c)

	// 权限位掩码实战
	fmt.Println("  权限位掩码:")
	const (
		Read = 1 << iota
		Write
		Exec
	)
	perm := Read | Write
	fmt.Printf("  Read=%d Write=%d Exec=%d, perm=Read|Write=%d\n", Read, Write, Exec, perm)
	fmt.Printf("  perm&Read!=0=%t, perm&Exec!=0=%t\n", perm&Read != 0, perm&Exec != 0)

	fmt.Println("\n--- 赋值运算符 ---")
	n := 10
	fmt.Printf("初始: %d\n", n)
	n += 5
	fmt.Printf("+=5: %d  ", n)
	n -= 3
	fmt.Printf("-=3: %d  ", n)
	n *= 2
	fmt.Printf("*=2: %d  ", n)
	n /= 4
	fmt.Printf("/=4: %d  ", n)
	n %= 5
	fmt.Printf("%%=5: %d\n", n)
	n <<= 2
	fmt.Printf("<<=2: %d  ", n)
	n >>= 1
	fmt.Printf(">>=1: %d  ", n)
	n &= 3
	fmt.Printf("&=3: %d  ", n)
	n |= 8
	fmt.Printf("|=8: %d  ", n)
	n ^= 1
	fmt.Printf("^=1: %d  ", n)
	n &^= 8
	fmt.Printf("&^=8: %d\n", n)

	fmt.Println("\n--- 运算符优先级 ---")
	fmt.Println(strings.Repeat("─", 40))
	fmt.Println(" 优先 | 运算符                         | 结合")
	fmt.Println(strings.Repeat("─", 40))
	fmt.Println("   1  | () [] .                        | →")
	fmt.Println("   2  | ! ^ - + & * (一元)             | ←")
	fmt.Println("   3  | * / % << >> & &^               | →")
	fmt.Println("   4  | + - | ^ (二元)                 | →")
	fmt.Println("   5  | == != < <= > >=                | →")
	fmt.Println("   6  | <- (chan)                      | →")
	fmt.Println("   7  | &&                             | →")
	fmt.Println("   8  | ||                             | →")
	fmt.Println(strings.Repeat("─", 40))
	// 演示
	fmt.Printf("3 + 4*5 = %d (不是 35)\n", 3+4*5)
	fmt.Printf("1 << 2 + 3 = %d (不是 (1<<2)+3=7)\n", 1<<2+3)
	fmt.Printf("(1<<2) + 3 = %d (加括号明确)\n", (1<<2)+3)
	fmt.Printf("true || false && false = %t (&& 高于 ||)\n", true || false && false)

	fmt.Println("\n--- Go 特色 ---")
	fmt.Println("1. ++ / -- 是语句，不是表达式")
	fmt.Println("   x := 1; x++      // ✅")
	fmt.Println("   // y := x++      // ❌ 编译错误")
	fmt.Println("2. 没有三元运算符 ? : → 用 if-else")
	fmt.Println("3. 不同类型不能直接比较（编译期报错）")
	fmt.Println("4. &^ — Go 特有的位清空运算符")
}
