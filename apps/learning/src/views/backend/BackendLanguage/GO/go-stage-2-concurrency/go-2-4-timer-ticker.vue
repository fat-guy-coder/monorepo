<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">⏰ Timer 与 Ticker</h1><p class="text-sm text-slate-500 mt-1">Timer ≈ setTimeout · Ticker ≈ setInterval · 配合 channel 的超时控制</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-4-timer-ticker.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-4</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Timer — 延时执行</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Timer ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">setTimeout(fn, delay)</code> · Ticker ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">setInterval(fn, interval)</code>。关键差异：Go 的 Timer/Ticker 返回<strong>channel</strong>——配合 select 做超时控制和定时任务，而不是传回调函数。</p></aside>
        <div class="mb-4"><Code language="go" :code="timerCode" title="timer.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>Ticker — 周期性执行</h2>
        <div class="mb-4"><Code language="go" :code="tickerCode" title="ticker.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ Ticker 必须 Stop：</strong>不 Stop 的 Ticker <strong>永远不会被 GC</strong>——即使没有 goroutine 在读取通道！用完一定 <code class="bg-amber-100 px-1 rounded text-xs font-mono">defer ticker.Stop()</code>。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>内存泄漏陷阱：time.After vs NewTimer</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.After(d)</code> 在触发前<strong>不会被 GC</strong>。select 中超时控制用一次 OK；但<strong>循环中每次创建新的 time.After → 内存泄漏</strong>。长时间/循环中用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.NewTimer + Reset</code>。</p>
        <div class="mb-4"><Code language="go" :code="afterCode" title="after_vs_newtimer.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>一次性超时 → <code class="bg-emerald-100 px-1 rounded text-xs font-mono">time.After</code>；循环中需要定时/超时 → <code class="bg-emerald-100 px-1 rounded text-xs font-mono">time.NewTimer + Reset</code>；周期性执行 → <code class="bg-emerald-100 px-1 rounded text-xs font-mono">time.NewTicker</code>。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Timer ≈ setTimeout</strong>——延时后 channel 收到值</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Ticker ≈ setInterval</strong>——周期性收到值。必须 Stop！</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>短时超时用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">time.After</code>；循环中/长时用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">NewTimer + Reset</code></span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Stop 后如果 channel 有残留值，需 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">if !t.Stop() { <-t.C }</code> 排空</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-3-select" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Select</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-5-sync-mutex" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Mutex →</RouterLink></nav></footer>
  </div></template>

<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"Timer"},{id:"sec-2",name:"Ticker"},{id:"sec-3",name:"内存泄漏陷阱"},{id:"sec-4",name:"小结"}]
const timerCode = `// Timer — 延时后触发（≈ setTimeout）
timer := time.NewTimer(2 * time.Second)
<-timer.C                    // 阻塞 2 秒
fmt.Println("2 秒后打印")   // 输出: 2 秒后打印

// 可以在触发前 Stop 并 Reset
if !timer.Stop() {
    <-timer.C               // 排空 channel
}
timer.Reset(5 * time.Second) // 重新计时 5 秒

// time.AfterFunc — 延时后执行函数（不阻塞）
time.AfterFunc(1*time.Second, func() {
    fmt.Println("1 秒后异步执行")
})`
const tickerCode = `// Ticker — 周期性触发（≈ setInterval）
ticker := time.NewTicker(500 * time.Millisecond)
defer ticker.Stop()          // ⚠️ 必须 Stop！否则永不 GC

done := make(chan struct{})
go func() {
    time.Sleep(2 * time.Second)
    close(done)
}()

loop:
for {
    select {
    case t := <-ticker.C:
        fmt.Println("tick at", t.Format("15:04:05"))
        // 输出（每 0.5 秒）:
        // tick at 15:04:05.000
        // tick at 15:04:05.500
        // tick at 15:04:06.000
        // tick at 15:04:06.500
    case <-done:
        break loop
    }
}`
const afterCode = `// ❌ 循环中用 time.After — 内存泄漏！
for {
    select {
    case <-ch: handle()
    case <-time.After(5*time.Second): // 每次循环创建新 Timer！
        fmt.Println("timeout")
    }
}
// 问题：上一个 time.After 在触发前无法 GC，循环→堆积 Timer

// ✅ 正确：用 NewTimer + Reset 复用
timeout := time.NewTimer(5 * time.Second)
for {
    timeout.Reset(5 * time.Second) // 复用同一个 Timer
    select {
    case <-ch: handle()
    case <-timeout.C:
    }
}
timeout.Stop()`
</script>
