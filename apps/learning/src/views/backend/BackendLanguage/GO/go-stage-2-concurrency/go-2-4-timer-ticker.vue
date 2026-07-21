<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">⏰ Timer 与 Ticker</h1><p class="text-sm text-slate-500 mt-1">Timer ≈ setTimeout · Ticker ≈ setInterval · 都是 channel 驱动的定时器</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-4-timer-ticker.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-4</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Timer — 延时一次</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.NewTimer(d)</code> 创建一个在 d 时间后往 C channel 发送当前时间的定时器。底层是一个<strong>最小堆</strong>（四叉堆），Go runtime 的调度器在每个调度循环中检查堆顶 timer 是否到期。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 JS 类比：</strong>Timer ≈ <strong>setTimeout</strong>——延时后触发一次。关键区别：Go 返回 <strong>channel</strong> 而非回调函数，需要配合 <code class="bg-purple-100 px-1 rounded text-xs font-mono"><-timer.C</code> 或 select 使用。</p></aside>
        <div class="mb-4"><Code language="go" :code="timerCode" title="timer.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>Ticker — 周期性触发</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.NewTicker(d)</code> 每 d 时间往 C channel 发送一次。和 Timer 共用同一套底层堆——只是每次到期后自动 Reset。</p>
        <div class="mb-4"><Code language="go" :code="tickerCode" title="ticker.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ Ticker 不 Stop 就永远不会被 GC！</strong>即使没有任何 goroutine 读它的 channel，runtime 仍然持有对 Ticker 的引用——定时器堆里的条目不会释放。必须 <code class="bg-amber-100 px-1 rounded text-xs font-mono">defer ticker.Stop()</code>。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>time.After 的陷阱 — 为什么循环中会内存泄漏？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">time.After(d)</code> 本质是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">NewTimer(d).C</code>——它创建了一个 Timer 但只返回 channel。问题是：<strong>在 Timer 到期之前，它不会被 GC</strong>。循环中每次迭代创建一个新的 After → 旧的还没到期 → 堆上攒了几百个 Timer → 内存泄漏。</p>
        <div class="mb-4"><Code language="go" :code="afterCode" title="after_vs_newtimer.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 速记：</strong>一次性超时用 time.After；循环中必须用 NewTimer+Reset 复用。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>Stop 与 Reset 的正确姿势</h2>
        <div class="mb-4"><Code language="go" :code="stopResetCode" title="stop_reset.go" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Timer ≈ setTimeout</strong>（一次），<strong>Ticker ≈ setInterval</strong>（周期），都通过 channel 通知</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>底层：四叉堆</strong> + runtime 调度循环检查到期定时器</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>time.After 循环中泄漏！</strong>改用 NewTimer + Reset 复用</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Stop 返回 false 时 <strong>必须排空 channel</strong>（<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs"><-t.C</code>），否则 Reset 后立即触发</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Ticker 不 Stop = 永不 GC</strong>——defer ticker.Stop()</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-3-select" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Select</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-5-sync-mutex" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Mutex →</RouterLink></nav></footer>
  </div></template>

<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"Timer"},{id:"sec-2",name:"Ticker"},{id:"sec-3",name:"After 陷阱"},{id:"sec-4",name:"Stop/Reset"},{id:"sec-5",name:"小结"}]
const timerCode = `// Timer — 延时后 C channel 收到当前时间
timer := time.NewTimer(2 * time.Second)
<-timer.C                         // 阻塞 2 秒
fmt.Println("2 秒后执行")          // 输出: 2 秒后执行

// 提前 Stop 阻止触发
if !timer.Stop() {
    <-timer.C                     // 已触发→排空 channel（否则 Reset 立即可读）
}
timer.Reset(5 * time.Second)      // 重新计时 5 秒

// AfterFunc — 延时后执行回调（不阻塞，在独立 goroutine 中执行）
time.AfterFunc(1*time.Second, func() {
    fmt.Println("1 秒后异步执行")  // 输出: 1 秒后异步执行
})`
const tickerCode = `// Ticker — 每 d 时间 C channel 收到一次
ticker := time.NewTicker(500 * time.Millisecond)
defer ticker.Stop()               // ⚠️ 不 Stop 永不 GC

done := make(chan struct{})
go func() { time.Sleep(2*time.Second); close(done) }()

loop:
for {
    select {
    case t := <-ticker.C:
        fmt.Println("tick at", t.Format("15:04:05"))
    case <-done:
        break loop
    }
}
// 输出: tick at 15:04:05.000  15:04:05.500  15:04:06.000  15:04:06.500`
const afterCode = `// ❌ 循环中用 time.After——每次迭代创建新 Timer！
for {
    select {
    case <-ch: handle()
    case <-time.After(5*time.Second):  // 旧的 After 在 5s 到期前不 GC！
        fmt.Println("timeout")         // 循环 1000 次 = 堆上 1000 个 Timer
    }
}

// ✅ 正确：NewTimer + Reset 复用
timeout := time.NewTimer(5 * time.Second)
defer timeout.Stop()
for {
    timeout.Reset(5 * time.Second)     // 复用同一个 Timer
    select {
    case <-ch: handle()
    case <-timeout.C: fmt.Println("timeout")
    }
}`
const stopResetCode = `// ⚠️ Stop 的正确用法：必须排空 channel
func resetTimer(t *time.Timer, d time.Duration) {
    if !t.Stop() {
        select { case <-t.C: default: }  // 非阻塞排空——Timer 已触发时 C 中有值
    }
    t.Reset(d)
}

// 同理 Ticker 的 Reset（Go 1.23+ 才支持，之前需 Stop+New）
// Go 1.23+: ticker.Reset(d)
// Go < 1.23: ticker.Stop(); ticker = time.NewTicker(d)`
</script>
