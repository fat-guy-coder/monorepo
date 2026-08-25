package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	// 无缓冲 channel（make(chan int)）——send 必须有 recv 同时就绪，否则阻塞
	n := 3
	a := make(chan int) // 换成无缓冲！对比 make(chan int, n)
	for i := range n {
		wg.Add(1)
		go func(c int) {
			defer wg.Done() // 发送者自己报告完成
			a <- c          // 等 main 的 range 来"握手"，才能发出去
		}(i)
	}
	go func() {
		wg.Wait() // 等所有发送者干完……
		close(a)  // ……此刻才安全关 channel，绝无发送者了
	}()
	for v := range a { // 无缓冲时，range 在这里"接住"每次 send
		fmt.Println(v)
	}
}
