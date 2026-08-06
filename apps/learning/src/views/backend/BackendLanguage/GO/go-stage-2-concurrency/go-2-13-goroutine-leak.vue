<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">💧 goroutine 泄漏排查</h1><p class="text-sm text-slate-500 mt-1">检测 · 排查 · 修复 — goroutine 泄漏像水龙头没关，慢慢耗尽你的内存</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-13-goroutine-leak.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-13</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>什么是 goroutine 泄漏？— "等一个永远不会来的消息"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">goroutine 不会自己结束——函数执行完才退出。如果 goroutine 在等一个<strong>永远不会到来的消息</strong>——channel、锁、网络连接——它就<strong>永远阻塞</strong>。每秒泄漏 1 个→一天 86400 个→一个月 ~250 万个≈ <strong>~5GB 无法回收的内存</strong>。GC 处理不了——因为 goroutine 还没退出，它的栈和变量不是垃圾。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 JS 类比：</strong>≈ <strong>没 remove 的 EventListener</strong>——页面都销毁了回调还在占着引用。≈ <strong>没 clearInterval 的定时器</strong>——程序退出前永远不会停。Go 的 goroutine 泄漏更隐蔽——不 crash 不报错，只是内存悄悄涨。</p></aside>
        <div class="bg-amber-50 rounded-xl p-4 border border-amber-200 text-sm mb-4"><strong class="text-amber-700">⚠️ 泄漏的代价：</strong>每个 goroutine ~2KB 启动栈 + 堆变量 + channel 缓冲区。100,000 个泄漏 goroutine ≈ 200MB+ 不可回收内存。更糟的是——可能还<strong>持有锁、占着文件描述符、占着数据库连接</strong>。</div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>三泄漏场景 + 修复</h2>
        <div class="space-y-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200"><h4 class="font-semibold text-slate-700 mb-2">❌ 场景1: Channel 无人配对——最经典</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="leak1BadCode" title="❌" /></div><div><Code language="go" :code="leak1FixCode" title="✅ 缓冲 channel / 确保有接收方" /></div></div></div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200"><h4 class="font-semibold text-slate-700 mb-2">❌ 场景2: for-select 没有退出条件</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="leak2BadCode" title="❌" /></div><div><Code language="go" :code="leak2FixCode" title="✅ done channel / context" /></div></div></div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200"><h4 class="font-semibold text-slate-700 mb-2">❌ 场景3: HTTP Response.Body 没关（资源泄漏）</h4><div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="leak3BadCode" title="❌" /></div><div><Code language="go" :code="leak3FixCode" title="✅ defer Close" /></div></div></div>
        </div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>如何发现泄漏？— 三件武器</h2>
        <div class="mb-4"><Code language="go" :code="detectCode" title="leak_detect.go" /></div>
        <ul class="space-y-2 text-slate-600 text-sm"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>① NumGoroutine：</strong>测试前后对比——生产 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">/debug/pprof/goroutine</code> 实时查看</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>② goleak：</strong><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">goleak.VerifyTestMain(m)</code>——每个测试自动检查，CI 跑</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>③ pprof goroutine profile：</strong>运行时抓 goroutine 堆栈——看哪个函数阻塞了最多 goroutine</span></li></ul>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>修复口诀</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>每个 goroutine 一个退出路径</strong>——context、done channel、close(ch)</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>发送方关闭 channel</strong>，接收方用 range——自动退出</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>defer close / defer cancel / defer Body.Close()</strong>——资源清理铁三角</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>goleak + go test -race</strong>——CI 自动守住大门，不让泄漏上线</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-12-errgroup" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：errgroup</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"什么是泄漏"},{id:"sec-2",name:"三场景+修复"},{id:"sec-3",name:"检测武器"},{id:"sec-4",name:"修复口诀"}]
const leak1BadCode = `// ❌ goroutine 永远阻塞——没人接收
func leak() {
    ch := make(chan int)
    go func() { ch <- 42 }()  // 永远等 recv——泄漏！
    // 函数返回后 ch 无引用——但 goroutine 还活着，不会 GC
}`
const leak1FixCode = `// ✅ 缓冲 = 发送不阻塞
ch := make(chan int, 1)
go func() { ch <- 42 }()
// ✅ 或确保有 goroutine 在另一头接收`
const leak2BadCode = `// ❌ for-select 没有退出条件——永不退出
go func() {
    for { select { case v := <-ch: handle(v) } }
}()`
const leak2FixCode = `// ✅ 加 done channel 退出路径
go func() {
    for {
        select {
        case v := <-ch: handle(v)
        case <-ctx.Done(): return  // 退出！
        }
    }
}()`
const leak3BadCode = `resp, _ := http.Get(url)
// 忘了 resp.Body.Close()
// goroutine 泄漏——底层 TCP 连接不释放，文件描述符泄漏`
const leak3FixCode = `resp, err := http.Get(url)
if err != nil { return err }
defer resp.Body.Close()  // ✅ defer 铁律`
const detectCode = `// ① NumGoroutine——测试前后对比（最简单）
func TestNoLeak(t *testing.T) {
    before := runtime.NumGoroutine()
    doConcurrentWork()
    time.Sleep(100*time.Millisecond)  // 等 goroutine 退出
    after := runtime.NumGoroutine()
    if after > before {
        t.Errorf("泄漏 %d goroutines: %d → %d", after-before, before, after)
    }
}

// ② goleak——每个测试自动检测（推荐）
// import "go.uber.org/goleak"
func TestMain(m *testing.M) {
    goleak.VerifyTestMain(m)  // 任何测试多了 goroutine 就 fail
}

// ③ pprof——运行时抓 goroutine 堆栈
// http://localhost:6060/debug/pprof/goroutine?debug=1
// 输出: goroutine 123 [chan receive, 10 minutes]:
//        main.leakBug() at leak.go:42
// → 看到 "10 minutes" 就知道这个 goroutine 阻塞太久了`
</script>
