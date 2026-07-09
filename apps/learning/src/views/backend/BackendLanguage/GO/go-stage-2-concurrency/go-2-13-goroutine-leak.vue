<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">💧 goroutine 泄漏排查</h1><p class="text-sm text-slate-500 mt-1">检测 · 排查 · 修复 — goroutine 泄漏的完整处理流程</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-13-goroutine-leak.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-13</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>goroutine 泄漏是什么？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">goroutine 不会自动结束——函数执行完才退出。如果 goroutine 在等待<strong>永远不会到来的消息</strong>（channel、锁、网络），就永远阻塞→ <strong>goroutine 泄漏</strong>。每个泄漏占用 ~2KB 起步栈 + 堆变量 → 100,000 个泄漏 = ~200MB+ 无法回收的内存。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>≈ JS 的<strong>未清理的 setInterval</strong> 或 <strong>未 remove 的 EventListener</strong>——引用还在，GC 无法回收。≈ <strong>没有 cancel 的 fetch</strong>——请求完成但回调永远不会被清理。</p></aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>三大泄漏场景 + 修复方案</h2>
        <div class="space-y-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">❌ 场景1: Channel 发送/接收 无人配对</h4>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="leak1BadCode" title="❌ 泄漏" /></div><div><Code language="go" :code="leak1FixCode" title="✅ 修复" /></div></div>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">❌ 场景2: 没有退出条件的 for-select 循环</h4>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="leak2BadCode" title="❌ 泄漏" /></div><div><Code language="go" :code="leak2FixCode" title="✅ 修复" /></div></div>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">❌ 场景3: 未关闭的 HTTP Response Body</h4>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="leak3BadCode" title="❌ 泄漏" /></div><div><Code language="go" :code="leak3FixCode" title="✅ 修复" /></div></div>
          </div>
        </div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>检测工具与方法</h2>
        <div class="mb-4"><Code language="go" :code="detectCode" title="leak_detect.go" /></div>
        <ul class="space-y-2 text-slate-600 text-sm"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>pprof goroutine profile：</strong><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">go tool pprof http://localhost:6060/debug/pprof/goroutine</code></span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>goleak 库：</strong><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">goleak.VerifyTestMain(m)</code> 在测试中自动检测泄漏</span></li></ul>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>修复口诀</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>给每个 goroutine 一个退出路径</strong>——context、done channel、close(ch)</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>发送方关闭 channel，接收方用 range</strong>——range 自动在 channel 关闭后退出</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>测试前后对比 runtime.NumGoroutine()</strong>——多了就是泄漏</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-12-errgroup" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：errgroup</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"泄漏是什么"},{id:"sec-2",name:"三大场景+修复"},{id:"sec-3",name:"检测工具"},{id:"sec-4",name:"修复口诀"}]
const leak1BadCode = `// Channel 发送方阻塞——没人接收
func leak() {
    ch := make(chan int)
    go func() { ch <- 42 }()  // 永远阻塞！
}`
const leak1FixCode = `// ✅ 用缓冲 channel 或确保有接收方
func noLeak() {
    ch := make(chan int, 1)
    go func() { ch <- 42 }()
}`
const leak2BadCode = `// for-select 没有退出条件
go func() {
    for { select { case v := <-ch: handle(v) } }
}()  // ch 没人关 → 永不退出`
const leak2FixCode = `// ✅ 加 done channel 或 context
go func() {
    for {
        select {
        case v := <-ch: handle(v)
        case <-ctx.Done(): return  // 退出！
        }
    }
}()`
const leak3BadCode = `resp, _ := http.Get(url)
// 忘记 resp.Body.Close()
// goroutine 泄漏——底层连接不释放`
const leak3FixCode = `resp, err := http.Get(url)
if err != nil { return err }
defer resp.Body.Close()  // ✅ 一定记得关`
const detectCode = `// ① 测试中检测泄漏
func TestNoLeak(t *testing.T) {
    before := runtime.NumGoroutine()
    doWork()
    after := runtime.NumGoroutine()
    if after > before {
        t.Errorf("泄漏: %d → %d", before, after)
    }
}

// ② goleak 库（推荐——自动检测）
// import "go.uber.org/goleak"
func TestMain(m *testing.M) {
    goleak.VerifyTestMain(m)
}

// ③ 运行时排查（pprof）
// import _ "net/http/pprof"
// http://localhost:6060/debug/pprof/goroutine?debug=1
// 查看所有 goroutine 的调用栈——找到阻塞在哪`
</script>
