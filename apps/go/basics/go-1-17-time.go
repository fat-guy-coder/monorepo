package basics

import (
	"fmt"
	"time"
)

// RunTime 演示 time 包的核心用法：时间获取、格式化、解析、Duration、定时器与时区。
func RunTime() {
	// ═══════════════════════════════════════════
	// 获取当前时间
	// ═══════════════════════════════════════════
	fmt.Println("--- 获取当前时间 ---")
	now := time.Now()
	fmt.Printf("time.Now()  = %v\n", now)
	// 输出示例: "time.Now()  = 2026-06-26 15:04:05.123456 +0800 CST"
	fmt.Printf("  Unix()    = %d (秒)\n", now.Unix())
	// 输出示例: "  Unix()    = 1750921445 (秒)"
	fmt.Printf("  UnixMilli = %d (毫秒)\n", now.UnixMilli())
	// 输出示例: "  UnixMilli = 1750921445123 (毫秒)"
	fmt.Printf("  UnixNano  = %d (纳秒)\n", now.UnixNano())
	// 输出示例: "  UnixNano  = 1750921445123456789 (纳秒)"
	fmt.Printf("  Year/Month/Day/Hour/Minute/Second:\n")
	fmt.Printf("    %d-%02d-%02d %02d:%02d:%02d\n",
		now.Year(), now.Month(), now.Day(),
		now.Hour(), now.Minute(), now.Second())
	// 输出示例: "    2026-06-26 15:04:05"

	// ═══════════════════════════════════════════
	// 构造指定时间
	// ═══════════════════════════════════════════
	fmt.Println("\n--- 构造指定时间 ---")
	t1 := time.Date(2025, 1, 15, 10, 30, 0, 0, time.UTC)
	fmt.Printf("Date(2025,1,15,10,30,0,0,UTC) = %v\n", t1)
	// 输出: "Date(2025,1,15,10,30,0,0,UTC) = 2025-01-15 10:30:00 +0000 UTC"

	// ═══════════════════════════════════════════
	// 格式化 — Go 的独特设计：用参考时间代替 Y/m/d
	// 参考时间: Mon Jan 2 15:04:05 MST 2006
	// 记忆:     1   2   3  4  5      6
	// 月/日 时:分:秒 年 时区
	// ═══════════════════════════════════════════
	fmt.Println("\n--- 格式化（Layout 常量）---")
	fmt.Println("Go 的格式基于参考时间: Mon Jan 2 15:04:05 MST 2006")
	fmt.Println("  记忆: 01/02 03:04:05PM '06 -0700 (月/日 时:分:秒PM 年 时区)")

	fmt.Printf("  time.RFC3339     = %s\n", now.Format(time.RFC3339))
	// 输出示例: "  time.RFC3339     = 2026-06-26T15:04:05+08:00"
	fmt.Printf("  time.RFC3339Nano = %s\n", now.Format(time.RFC3339Nano))
	// 输出示例: "  time.RFC3339Nano = 2026-06-26T15:04:05.123456789+08:00"
	fmt.Printf("  time.DateTime    = %s\n", now.Format(time.DateTime))
	// 输出示例: "  time.DateTime    = 2026-06-26 15:04:05"
	fmt.Printf("  time.DateOnly    = %s\n", now.Format(time.DateOnly))
	// 输出示例: "  time.DateOnly    = 2026-06-26"
	fmt.Printf("  time.TimeOnly    = %s\n", now.Format(time.TimeOnly))
	// 输出示例: "  time.TimeOnly    = 15:04:05"
	fmt.Printf("  time.RFC822      = %s\n", now.Format(time.RFC822))
	// 输出示例: "  time.RFC822      = 26 Jun 26 15:04 CST"
	fmt.Printf("  time.Kitchen     = %s\n", now.Format(time.Kitchen))
	// 输出示例: "  time.Kitchen     = 3:04PM"
	fmt.Printf("  自定义: \"2006/01/02 15:04\" = %s\n", now.Format("2006/01/02 15:04"))
	// 输出示例: "  自定义: \"2006/01/02 15:04\" = 2026/06/26 15:04"

	// ═══════════════════════════════════════════
	// 解析时间字符串
	// ═══════════════════════════════════════════
	fmt.Println("\n--- 解析（Parse）---")
	parsed, err := time.Parse(time.RFC3339, "2025-06-15T14:30:00Z")
	if err != nil {
		fmt.Printf("Parse error: %v\n", err)
	} else {
		fmt.Printf("Parse: 2025-06-15T14:30:00Z → %v\n", parsed)
		// 输出: "Parse: 2025-06-15T14:30:00Z → 2025-06-15 14:30:00 +0000 UTC"
	}

	// ParseInLocation — 按指定时区解析
	loc, _ := time.LoadLocation("Asia/Shanghai")
	parsed2, err := time.ParseInLocation("2006-01-02 15:04", "2025-06-15 14:30", loc)
	if err != nil {
		fmt.Printf("ParseInLocation error: %v\n", err)
	} else {
		fmt.Printf("ParseInLocation(Asia/Shanghai): %v\n", parsed2)
		// 输出: "ParseInLocation(Asia/Shanghai): 2025-06-15 14:30:00 +0800 CST"
	}

	// ═══════════════════════════════════════════
	// Duration — 时间间隔，支持算术运算
	// ═══════════════════════════════════════════
	fmt.Println("\n--- Duration ---")
	d1 := 3 * time.Hour
	d2 := 30 * time.Minute
	d3 := 500 * time.Millisecond
	fmt.Printf("  3h + 30m + 500ms = %v\n", d1+d2+d3)
	// 输出: "  3h + 30m + 500ms = 3h30m0.5s"
	fmt.Printf("  常用单位: 1s=%v, 1ms=%v, 1us=%v, 1ns=%v\n",
		time.Second, time.Millisecond, time.Microsecond, time.Nanosecond)
	// 输出: "  常用单位: 1s=1s, 1ms=1ms, 1µs=1µs, 1ns=1ns"

	// 时间加减
	fmt.Printf("  时间加减:\n")
	fmt.Printf("    now + 2h  = %v\n", now.Add(2*time.Hour))
	// 输出示例: "    now + 2h  = 2026-06-26 17:04:05.123 +0800 CST"
	fmt.Printf("    now - 30m = %v\n", now.Add(-30*time.Minute))
	// 输出示例: "    now - 30m = 2026-06-26 14:34:05.123 +0800 CST"

	// ═══════════════════════════════════════════
	// time.Since — 测量耗时（常用！）
	// ═══════════════════════════════════════════
	fmt.Println("\n--- time.Since（耗时测量）---")
	start := time.Now()
	elapsed := time.Since(start)
	fmt.Printf("  耗时: %v\n", elapsed)
	// 输出示例: "  耗时: 1.5µs"  （非常短，因为中间没干活）
	fmt.Printf("  等价于: time.Now().Sub(start)\n")
	// 输出: "  等价于: time.Now().Sub(start)"

	// ═══════════════════════════════════════════
	// time.Sleep — 阻塞当前 goroutine
	// ═══════════════════════════════════════════
	fmt.Println("\n--- time.Sleep（阻塞等待）---")
	fmt.Println("  Sleeping 100ms...")
	// 输出: "  Sleeping 100ms..."
	time.Sleep(100 * time.Millisecond)
	fmt.Println("  Done.")
	// 输出: "  Done."

	// ═══════════════════════════════════════════
	// time.After — 返回 channel，常用于 select 超时
	// ═══════════════════════════════════════════
	fmt.Println("\n--- time.After ---")
	fmt.Println("  time.After 返回 <-chan Time，常用于 select 超时控制")
	fmt.Println("  示例用法:")
	fmt.Println("    select {")
	fmt.Println("    case <-ch:   // 正常逻辑")
	fmt.Println("    case <-time.After(5*time.Second):  // 超时")
	fmt.Println("    }")
	// 输出: （同上纯文本，无变量）

	// ═══════════════════════════════════════════
	// time.Ticker — 按固定间隔反复触发
	// ═══════════════════════════════════════════
	fmt.Println("\n--- time.Ticker ---")
	fmt.Println("  Ticker 按固定间隔反复触发，需 Stop() 避免泄漏")
	fmt.Println("  ticker := time.NewTicker(1 * time.Second)")
	fmt.Println("  defer ticker.Stop()")
	fmt.Println("  for range ticker.C { /* 每秒执行 */ }")
	// 输出: （同上纯文本）

	// 实际演示（限制 3 次）
	ticker := time.NewTicker(50 * time.Millisecond)
	defer ticker.Stop()
	fmt.Print("  Ticker 触发: ")
	count := 0
	for range ticker.C {
		fmt.Printf("tick ")
		count++
		if count >= 3 {
			fmt.Println("(stopped)")
			break
		}
	}
	// 输出: "  Ticker 触发: tick tick tick (stopped)"

	// ═══════════════════════════════════════════
	// 时区处理
	// ═══════════════════════════════════════════
	fmt.Println("\n--- 时区 ---")
	fmt.Printf("  UTC:  %v\n", now.UTC())
	// 输出示例: "  UTC:  2026-06-26 07:04:05.123 +0000 UTC"
	shanghai, _ := time.LoadLocation("Asia/Shanghai")
	tokyo, _ := time.LoadLocation("Asia/Tokyo")
	fmt.Printf("  Shanghai: %v\n", now.In(shanghai))
	// 输出示例: "  Shanghai: 2026-06-26 15:04:05.123 +0800 CST"
	fmt.Printf("  Tokyo:    %v\n", now.In(tokyo))
	// 输出示例: "  Tokyo:    2026-06-26 16:04:05.123 +0900 JST"

	// 固定偏移时区
	fixedZone := time.FixedZone("UTC+5:30", 5.5*3600)
	fmt.Printf("  FixedZone UTC+5:30: %v\n", now.In(fixedZone))
	// 输出示例: "  FixedZone UTC+5:30: 2026-06-26 12:34:05.123 +0530 UTC+5:30"

	// 时区转换 — 同一时刻在不同时区的显示
	nyc, _ := time.LoadLocation("America/New_York")
	tNY := t1.In(nyc)
	tSH := t1.In(shanghai)
	fmt.Printf("  同一时刻: UTC=%v, NY=%v, SH=%v\n", t1, tNY, tSH)
	// 输出: "  同一时刻: UTC=2025-01-15 10:30:00 +0000 UTC,"
	//         " NY=2025-01-15 05:30:00 -0500 EST,"
	//         " SH=2025-01-15 18:30:00 +0800 CST"
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunTime() }
