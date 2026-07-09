<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📡 Channel 通道</h1>
          <p class="text-sm text-slate-500 mt-1">goroutine 之间的管道 — "通过通信来共享内存，而非通过共享内存来通信"</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/concurrency/go-2-2-channels.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 基础 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          Channel = goroutine 间的类型安全管道
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Channel 是 Go 并发编程的<strong>核心原语</strong>。它让 goroutine 之间可以安全地传递数据，<strong>无需锁</strong>。
          Go 的哲学：<strong>"不要通过共享内存来通信，而要通过通信来共享内存。"</strong>
        </p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Channel ≈ <strong>JS 的 BroadcastChannel</strong> 或 <strong>Node.js worker.postMessage()</strong> — 类型安全的管道。<br/>
          ≈ <strong>RxJS Subject</strong> 的"推"模式 — 但 Channel 是阻塞的，天然实现了<strong>背压</strong>。<br/>
          ≈ <strong>消息队列</strong>（RabbitMQ/Kafka）的进程内版本 — 生产-消费模式，缓冲控制流量。
          </p>
        </aside>
        <div class="mb-4"><Code language="go" :code="basicCode" title="channel_basic.go" /></div>
      </section>

      <!-- 2. 缓冲 vs 非缓冲 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          缓冲 vs 非缓冲 —— 同步 vs 异步
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold"></th><th class="px-4 py-2 border border-slate-200 font-semibold">非缓冲 <code class="text-xs">make(chan int)</code></th><th class="px-4 py-2 border border-slate-200 font-semibold">缓冲 <code class="text-xs">make(chan int, 3)</code></th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">发送阻塞条件</td><td class="px-4 py-2 border">直到有接收方读取</td><td class="px-4 py-2 border">缓冲满时才阻塞</td></tr>
              <tr><td class="px-4 py-2 border">接收阻塞条件</td><td class="px-4 py-2 border">直到有发送方写入</td><td class="px-4 py-2 border">缓冲空时才阻塞</td></tr>
              <tr><td class="px-4 py-2 border">同步性</td><td class="px-4 py-2 border"><strong>同步</strong> — 发送=接收同时发生</td><td class="px-4 py-2 border"><strong>异步</strong> — 解耦收发</td></tr>
              <tr><td class="px-4 py-2 border">用途</td><td class="px-4 py-2 border">goroutine 间同步信号、确认</td><td class="px-4 py-2 border">生产者-消费者队列、限流</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="bufferCode" title="buffer_demo.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">nil channel 的特殊行为</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm">向 nil channel 发送/接收会<strong>永久阻塞</strong>（不是 panic）。关闭 nil channel 会 panic。这个特性在 select 中用来<strong>动态禁用 case</strong>——把 channel 设为 nil，对应的 case 就永远不会被选中。</p>
        <div class="mb-4"><Code language="go" :code="nilChannelCode" title="nil_channel.go" /></div>
      </section>

      <!-- 3. 关闭与 range -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          关闭 Channel 与 range 遍历
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>只有发送方关闭 channel，接收方不要关闭。</strong>关闭后仍可读取剩余数据（直到清空），之后再读返回零值（ok=false）。
          range 循环会在 channel 关闭且数据清空后自动退出。
        </p>
        <div class="mb-4"><Code language="go" :code="closeCode" title="channel_close.go" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ Channel 关闭规则速记：</strong><br/>
          向<strong>已关闭</strong> channel 发送 → <strong>panic</strong><br/>
          关闭<strong>已关闭</strong>的 channel → <strong>panic</strong><br/>
          关闭<strong>nil</strong> channel → <strong>panic</strong><br/>
          从<strong>已关闭且空</strong>的 channel 接收 → 返回<strong>零值</strong>（ok=false）<br/>
          <strong>黄金法则：发送方关闭，接收方只管读。</strong></p>
        </aside>
      </section>

      <!-- 4. 单向 Channel + 实战 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          单向 Channel + 经典模式
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">单向 Channel：编译时方向约束</h3>
        <p class="text-slate-600 mb-2 leading-relaxed text-sm"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">chan<- T</code> 只能发送，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono"><-chan T</code> 只能接收。双向 chan 可以隐式转为单向；单向不能转回双向。</p>
        <div class="mb-4"><Code language="go" :code="directionalCode" title="directional.go" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">经典模式：生产者-消费者 + 通知 done</h3>
        <div class="mb-4"><Code language="go" :code="patternCode" title="producer_consumer.go" /></div>
      </section>

      <!-- 5. 小结 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ch <- v</code> 发送，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">v := <-ch</code> 接收</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>非缓冲 = 同步握手；缓冲 = 异步队列；nil channel = 永久阻塞</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>发送方关闭 channel</strong>，关闭后可读不可写。range 自动在关闭后退出</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>单向 channel（<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">chan<-</code>/<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs"><-chan</code>）在编译时保证方向</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-1-goroutine-gmp" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：goroutine 与 GMP</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-3-select" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Select 多路复用 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "Channel 基础" },
  { id: "sec-2", name: "缓冲 vs 非缓冲" },
  { id: "sec-3", name: "关闭与 range" },
  { id: "sec-4", name: "单向 + 实战模式" },
  { id: "sec-5", name: "小结" },
]

const basicCode = `ch := make(chan int)      // 非缓冲 — 同步

go func() { ch <- 42 }()  // goroutine 发送
v := <-ch                  // 主 goroutine 接收 — 阻塞等待
fmt.Println(v)             // 输出: 42

// 双向通信：channel 可以双向传递数据
go func() {
    ch <- 10               // 发送
    fmt.Println(<-ch)      // 也可以接收！ 输出: 20
}()
ch <- 20                   // 发送
fmt.Println(<-ch)          // 输出: 10

// 用 channel 做信号（不需要传值，用 struct{} 省内存）
done := make(chan struct{})
go func() {
    // 做一些工作...
    done <- struct{}{}     // 通知完成
}()
<-done  // 等待完成`

const bufferCode = `// 非缓冲 — 同步握手
unbuf := make(chan int)
go func() {
    unbuf <- 1             // 阻塞，直到有人接收...
}()
v := <-unbuf               // ...这里接收后，上面才继续
fmt.Println(v)             // 输出: 1

// 缓冲 — 异步管道（容量 3）
buf := make(chan string, 3)
buf <- "a"                 // 不阻塞
buf <- "b"                 // 不阻塞
buf <- "c"                 // 不阻塞
// buf <- "d"              // 阻塞！缓冲满了
fmt.Println(<-buf, <-buf, <-buf)  // 输出: a b c

// 查看缓冲状态
fmt.Println(len(buf), cap(buf))   // 输出: 0 3`

const nilChannelCode = `var nilCh chan int        // nilCh == nil

// nilCh <- 1              // 永久阻塞！不是 panic
// <-nilCh                 // 永久阻塞！
// close(nilCh)            // panic!

// 实战用法：在 select 中动态禁用 case
var ch chan int            // nil
select {
case v := <-ch:            // 这个 case 永远不会被选中
    fmt.Println(v)
default:
    fmt.Println("ch is nil, skipped")  // 输出: ch is nil, skipped
}`

const closeCode = `ch := make(chan int, 3)
ch <- 1; ch <- 2; ch <- 3
close(ch)                  // 发送方关闭

// ch <- 4                 // panic! 不能向已关闭 channel 发送

// range 遍历 — 自动在 channel 关闭后退出
for v := range ch {
    fmt.Println(v)         // 输出: 1, 2, 3
}

// 检查 channel 是否已关闭
v, ok := <-ch              // v=0, ok=false — 已关闭且空

// 关闭 channel 常用于广播"结束"信号
done := make(chan struct{})
go func() {
    <-done
    fmt.Println("收到退出信号")  // 输出: 收到退出信号
}()
close(done)  // 所有等待 <-done 的 goroutine 同时收到零值！`

const directionalCode = `// 参数约束：只能发送
func produce(ch chan<- int) {
    for i := 0; i < 3; i++ {
        ch <- i
    }
    close(ch)              // 发送方关闭
}

// 参数约束：只能接收
func consume(ch <-chan int) {
    for v := range ch {
        fmt.Println(v)     // 输出: 0, 1, 2
    }
}

func main() {
    ch := make(chan int, 3)
    go produce(ch)         // 双向 → 只发（自动）
    consume(ch)            // 双向 → 只收（自动）
}`

const patternCode = `// 🏭 生产者-消费者模式 + 完成通知
func producer(out chan<- int, count int) {
    for i := 1; i <= count; i++ {
        fmt.Printf("生产: %d\\n", i)
        out <- i
    }
    close(out)             // 生产完毕，关闭 channel 通知消费者
}

func consumer(in <-chan int, done chan<- struct{}) {
    for item := range in { // 自动在 channel 关闭后退出
        fmt.Printf("  消费: %d\\n", item)
        time.Sleep(50 * time.Millisecond) // 模拟处理
    }
    done <- struct{}{}     // 通知 main：消费完成
}

func main() {
    jobs := make(chan int, 5)
    done := make(chan struct{})

    go producer(jobs, 10)
    go consumer(jobs, done)

    <-done                 // 等待消费者完成
    fmt.Println("所有任务处理完毕")
    // 输出:
    // 生产: 1, 2, 3, 4, 5（缓冲满后生产阻塞）
    //   消费: 1, 消费: 2, ...
    // 所有任务处理完毕
}`
</script>
