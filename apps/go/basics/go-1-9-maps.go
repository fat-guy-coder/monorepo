package basics

import (
	"fmt"
	"sync"
)

// RunMaps 演示 Go 中的 Map 和 sync.Map。
func RunMaps() {
	// --- Map 基础 ---
	fmt.Println("\n--- Map 基础 ---")

	// 声明（nil map 不能写入）
	var nilMap map[string]int
	fmt.Printf("nil map: %v, isNil=%t\n", nilMap, nilMap == nil)

	// make 创建
	scores := make(map[string]int)
	scores["Alice"] = 95
	scores["Bob"] = 87
	scores["Charlie"] = 92
	fmt.Printf("scores: %v, len=%d\n", scores, len(scores))

	// 字面量初始化
	colors := map[string]string{
		"red": "#FF0000", "green": "#00FF00", "blue": "#0000FF",
	}
	fmt.Printf("colors: %v\n", colors)

	// 插入和更新
	colors["yellow"] = "#FFFF00" // 插入
	colors["red"] = "#CC0000"    // 更新
	fmt.Printf("更新后: %v\n", colors)

	// 查找 (comma ok)
	if hex, ok := colors["red"]; ok {
		fmt.Printf("red = %s\n", hex)
	}
	if _, ok := colors["purple"]; !ok {
		fmt.Println("purple 不存在")
	}

	// 删除
	delete(colors, "green")
	fmt.Printf("删除 green: %v\n", colors)

	// --- 遍历（顺序随机！）---
	fmt.Println("\n--- range over map（顺序随机）---")
	for name, score := range scores {
		fmt.Printf("  %s: %d 分\n", name, score)
	}
	fmt.Println("注意：每次运行输出顺序可能不同")

	// --- Map 的引用特性 ---
	fmt.Println("\n--- Map 是引用类型 ---")
	m1 := map[string]int{"a": 1}
	m2 := m1
	m2["a"] = 999
	fmt.Printf("m1=%v, m2=%v（共享底层数据）\n", m1, m2)

	// --- sync.Map（并发安全）---
	fmt.Println("\n--- sync.Map ---")
	var sm sync.Map
	sm.Store("key1", "value1")
	sm.Store("key2", 42)

	if val, ok := sm.Load("key1"); ok {
		fmt.Printf("Load key1: %v\n", val)
	}

	actual, loaded := sm.LoadOrStore("key1", "new")
	fmt.Printf("LoadOrStore key1: val=%v, existed=%t\n", actual, loaded)

	actual2, loaded2 := sm.LoadOrStore("key3", "fresh")
	fmt.Printf("LoadOrStore key3: val=%v, existed=%t\n", actual2, loaded2)

	sm.Delete("key2")
	if _, ok := sm.Load("key2"); !ok {
		fmt.Println("key2 已删除")
	}

	fmt.Print("Range: ")
	sm.Range(func(key, value interface{}) bool {
		fmt.Printf("[%v:%v] ", key, value)
		return true
	})
	fmt.Println()
}

// ============================================================
// 单独运行此文件:
//   1. 将第 1 行 "package basics" 改为 "package main"
//   2. 取消下面 main 函数的注释
//   3. go run FILE_NAME
// ============================================================
//func main() { RunMaps() }
