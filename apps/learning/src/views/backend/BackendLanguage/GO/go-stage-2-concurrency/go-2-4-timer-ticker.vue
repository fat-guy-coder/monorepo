<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Timer 与 Ticker</h1><p class="text-sm text-slate-500 mt-1">定时器——延时执行与周期性任务</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-2-4-timer-ticker.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-4</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">⏰</span>Timer——延时执行</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Timer ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">setTimeout(fn, delay)</code> · Ticker ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">setInterval(fn, interval)</code>。<br/>关键区别：Go 的 Timer/Ticker 返回<strong>channel</strong>——配合 select 做超时控制和定时任务。</p></aside>
        <div class="mb-4"><Code language="go" :code="timerCode" title="timer.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Ticker——周期性执行</h2>
        <div class="mb-4"><Code language="go" :code="tickerCode" title="ticker.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ Ticker 必须 Stop：</strong>不 Stop 的 Ticker <strong>永远不会被 GC</strong>——即使没有 goroutine 在读取。用完一定 <code class="bg-amber-100 px-1 rounded text-xs font-mono">ticker.Stop()</code>。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>time.After vs time.AfterFunc</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">time.After(d)</code> 返回一个 channel，d 时间后收到一个值——select 中超时控制的最常用方式。<strong>短时间使用 OK，长时间或循环中使用会导致内存泄漏</strong>（After 在触发前不会被 GC）。长时间用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">time.NewTimer</code>。</p>
        <div class="mb-4"><Code language="go" :code="afterCode" title="time_after.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Timer ≈ setTimeout</strong>——延时后通过 channel 通知。用完 Stop 防止泄漏</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Ticker ≈ setInterval</strong>——周期性触发。必须 Stop</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>time.After 短时间用 OK，长时间用 NewTimer——防止内存泄漏</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-3-select" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Select</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-5-sync-mutex" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Mutex →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"Timer"},{id:"sec-2",name:"Ticker"},{id:"sec-3",name:"time.After"},{id:"sec-4",name:"小结"}]
const timerCode = `// Timer ——延时后触发
timer := time.NewTimer(2 * time.Second)
<-timer.C                    // 阻塞 2 秒
fmt.Println("done")

// 超时控制（最常用模式）
select {
case res := <-doWork(): fmt.Println(res)
case <-time.After(3*time.Second): fmt.Println("timeout")
}

// Timer 重置（复用 timer）
if !timer.Stop() { <-timer.C }  // 清空 channel
timer.Reset(5 * time.Second)`
const tickerCode = `// Ticker ——周期性触发
ticker := time.NewTicker(500 * time.Millisecond)
defer ticker.Stop()          // ⚠️ 必须 Stop！
for i := 0; i < 5; i++ {
    <-ticker.C                // 每 0.5 秒收到一次
    fmt.Println("tick")
}`
const afterCode = `// ✅ select 超时——短时间用 After
select {
case <-ch: ...
case <-time.After(3*time.Second): ...
}
// ❌ 循环中不要用 After——每次都创建新 Timer，内存泄漏
// ✅ 循环中用 NewTimer + Reset`
</script>
