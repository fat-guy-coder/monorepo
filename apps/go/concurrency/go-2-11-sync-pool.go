package concurrency

import (
	"bytes"
	"fmt"
	"sync"
)

// RunSyncPool 演示 sync.Pool 对象复用
func RunSyncPool() {
	fmt.Println("=== sync.Pool ===")
	var bufPool = sync.Pool{
		New: func() any { return new(bytes.Buffer) },
	}
	// 取——如果没有就 New
	buf := bufPool.Get().(*bytes.Buffer)
	buf.Reset()
	buf.WriteString("hello pool")
	fmt.Println(buf.String())
	// 还——放回池子复用
	bufPool.Put(buf)

	// 再次取——复用上次的 buffer（不分配新内存）
	buf2 := bufPool.Get().(*bytes.Buffer)
	fmt.Printf("same buffer? %v\n", buf == buf2)
	bufPool.Put(buf2)
	// 输出: hello pool, same buffer? true

	fmt.Println("\nPool 的特性:")
	fmt.Println("  - Get() 取，Put() 还")
	fmt.Println("  - GC 时自动清空——不存持久对象")
	fmt.Println("  - 适合 bytes.Buffer、JSON encoder 等高频临时对象")
	fmt.Println("  - 不适合 socket/文件句柄（GC 会清空导致丢失）")
}
