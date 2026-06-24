<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">goroutine 泄漏排查</h1><p class="text-sm text-slate-500 mt-1">检测 · 排查 · 修复——goroutine 泄漏的完整处理流程</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-2-13-goroutine-leak.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-13</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">💧</span>什么是 goroutine 泄漏</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>goroutine 泄漏 ≈ <strong>忘记 removeEventListener 的监听器</strong>——创建了但永远不释放，内存慢慢增长。≈ <strong>未关闭的 setInterval</strong>——后台一直在跑，但没人要它的结果了。</p></aside>
        <p class="text-slate-600 mb-3 leading-relaxed">goroutine 泄漏 = goroutine <strong>创建后永远阻塞</strong>，无法退出也无法被 GC。最常见原因：<strong>向没人读的 channel 发送</strong>、<strong>从没人写的 channel 接收</strong>、<strong>没有退出机制的无限循环</strong>。</p>
        <div class="mb-4"><Code language="go" :code="leakCode" title="goroutine_leak.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>检测泄漏——pprof</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">runtime.NumGoroutine()</code> 和 <strong>pprof</strong> 定位泄漏源：</p>
        <div class="mb-4"><Code language="go" :code="pprofCode" title="pprof.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>修复——给 goroutine 退出信号</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>根本原则：每个 goroutine 必须有明确的退出路径。</strong>三种方式：</p>
        <div class="space-y-2 text-slate-600 text-sm mb-3"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>方式 1：context 取消。</strong>ctx.Done() 收到信号 → goroutine 退出。HTTP handler 最常用</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>方式 2：close(channel)。</strong>关闭 channel 广播给所有接收方 → range 自动退出</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>方式 3：done channel。</strong>专用的退出信号 channel，goroutine 用 select 监听</span></li></div>
        <div class="mb-4"><Code language="go" :code="fixCode" title="fix_leak.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>泄漏 = goroutine 永久阻塞无法退出。最常见：channel 阻塞</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>检测：</strong>NumGoroutine() + pprof goroutine profile</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>修复：</strong>每个 goroutine 加退出机制——context / done channel / close(ch)</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-12-errgroup" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：errgroup</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-1-goroutine-gmp" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">阶段 2 完成！回到 goroutine 概述 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"什么是泄漏"},{id:"sec-2",name:"pprof检测"},{id:"sec-3",name:"修复方法"},{id:"sec-4",name:"小结"}]
const leakCode = `// ❌ 泄漏1：向没人读的 channel 发送
func leak1() {
    ch := make(chan int)
    go func() { ch <- 1 }()  // 永远阻塞——没人读 ch
}
// ❌ 泄漏2：从没人写的 channel 接收
func leak2() {
    ch := make(chan int)
    go func() { <-ch }()     // 永远阻塞——没人写 ch
}
// ❌ 泄漏3：无限循环无退出
func leak3() {
    go func() { for { doWork() } }()  // 永远不会停
}`
const pprofCode = `import _ "net/http/pprof"
// 启动 pprof HTTP 服务
go func() { http.ListenAndServe(":6060", nil) }()
// 浏览器打开 http://localhost:6060/debug/pprof/goroutine?debug=1
// 查看每个 goroutine 的调用栈——定位泄漏点

// 代码中检查 goroutine 数量
fmt.Println("goroutines:", runtime.NumGoroutine())`
const fixCode = `// ✅ 用 context 给 goroutine 退出信号
func worker(ctx context.Context, ch <-chan int) {
    for {
        select {
        case <-ctx.Done():  // 收到退出信号
            return
        case v := <-ch:
            handle(v)
        }
    }
}
// ✅ 用 done channel 通知退出
func workerWithDone(done <-chan struct{}) {
    for {
        select {
        case <-done: return
        default: doWork()
        }
    }
}`
</script>
