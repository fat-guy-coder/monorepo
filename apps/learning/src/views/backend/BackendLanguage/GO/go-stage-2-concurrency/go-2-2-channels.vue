<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Channel 通道</h1><p class="text-sm text-slate-500 mt-1">goroutine 之间的管道——Go 并发编程的核心原语</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-2-2-channels.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-2</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📡</span>Channel = goroutine 间通信的管道</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Channel ≈ <strong>消息队列 / EventEmitter 的数据版</strong>——一个 goroutine 往里写，另一个从里面读。≈ JS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">new BroadcastChannel()</code> 或 Node.js 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">worker.postMessage()</code>。<br/>Go 哲学：<strong>"不要通过共享内存来通信，而要通过通信来共享内存。"</strong></p></aside>
        <div class="mb-4"><Code language="go" :code="basicCode" title="channel_basic.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>缓冲 vs 非缓冲</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700"></th><th class="px-4 py-2 border font-semibold text-slate-700">非缓冲 ch := make(chan int)</th><th class="px-4 py-2 border font-semibold text-slate-700">缓冲 ch := make(chan int, 3)</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">发送阻塞</td><td class="px-4 py-2 border">直到有接收方读取</td><td class="px-4 py-2 border">缓冲未满时立即返回</td></tr><tr><td class="px-4 py-2 border">接收阻塞</td><td class="px-4 py-2 border">直到有发送方写入</td><td class="px-4 py-2 border">缓冲非空时立即返回</td></tr><tr><td class="px-4 py-2 border">同步性</td><td class="px-4 py-2 border"><strong>同步</strong>——发送和接收同时发生</td><td class="px-4 py-2 border"><strong>异步</strong>——解耦发送和接收</td></tr><tr><td class="px-4 py-2 border">用途</td><td class="px-4 py-2 border">goroutine 间同步信号</td><td class="px-4 py-2 border">生产者-消费者队列</td></tr></tbody></table></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ nil channel 的行为：</strong>向 nil channel 发送/接收<strong>永久阻塞</strong>（不是 panic！）。这被用在 select 中动态禁用 case。关闭 nil channel 会 panic。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>关闭与 range 遍历</h2>
        <div class="mb-4"><Code language="go" :code="closeCode" title="channel_close.go" /></div>
        <p class="text-slate-600 text-sm"><strong>原则：只有发送方关闭 channel，</strong>接收方不要关闭。关闭后仍可读取剩余数据（直到清空），之后再读返回零值（ok=false）。</p>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>单向 Channel</h2>
        <div class="mb-4"><Code language="go" :code="directionalCode" title="directional_channel.go" /></div>
        <p class="text-slate-600 text-sm"><strong>编译时保证方向正确。</strong>双向 chan 可以隐式转为单向；单向不能转回双向。</p>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ch <- v</code> 发送，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">v := <-ch</code> 接收</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>非缓冲=同步，缓冲=异步。nil channel 永久阻塞（select 中禁用 case）</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>发送方关闭 channel</strong>——关闭后仍可读，读空后返回零值</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>单向 channel：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">chan<-</code> 只发、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs"><-chan</code> 只收</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-1-goroutine-gmp" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：goroutine 与 GMP</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-3-select" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Select 多路复用 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"Channel基础"},{id:"sec-2",name:"缓冲vs非缓冲"},{id:"sec-3",name:"关闭与range"},{id:"sec-4",name:"单向Channel"},{id:"sec-5",name:"小结"}]
const basicCode = `ch := make(chan int)     // 非缓冲——同步
// ch := make(chan int, 3) // 缓冲——异步（容量3）

go func() { ch <- 42 }()  // goroutine 发送
v := <-ch                  // 主 goroutine 接收——阻塞等待
fmt.Println(v)             // 42

// nil channel 永久阻塞（不是 panic！）
var nilCh chan int
// nilCh <- 1  // 永久阻塞——select 中用来禁用 case`

const closeCode = `ch := make(chan int, 3)
ch <- 1; ch <- 2; ch <- 3
close(ch)                  // 发送方关闭
// ch <- 4                 // panic! 不能向已关闭 channel 发送

for v := range ch {        // range 自动在 channel 关闭后退出
    fmt.Println(v)         // 1, 2, 3
}
v, ok := <-ch              // v=0, ok=false（已关闭且为空）`

const directionalCode = `// 参数约束：只能发送
func sendOnly(ch chan<- int) { ch <- 1 }
// 参数约束：只能接收
func recvOnly(ch <-chan int) { v := <-ch; fmt.Println(v) }

ch := make(chan int)
go sendOnly(ch)            // 双向 → 单向（自动）
recvOnly(ch)
// chan<- 只发，<-chan 只收——编译时检查`
</script>
