<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🪢 errgroup 并发错误组</h1><p class="text-sm text-slate-500 mt-1">WaitGroup + 错误传播 + context 取消 — goroutine 错误处理标准方案</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-12-errgroup.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-12</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>WaitGroup 的痛点 → errgroup 的解法</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">WaitGroup 只能<strong>等待完成</strong>，不能<strong>传播错误</strong>，也不能<strong>取消其他 goroutine</strong>。<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">golang.org/x/sync/errgroup</code> 解决了这三个问题：① 收集第一个错误，② 出错时取消所有 goroutine（通过 context），③ API 更简洁。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>errgroup ≈ <strong>Promise.all() 的 fail-fast 模式</strong>——一个 reject 就整体失败。≈ <strong>Promise.allSettled()</strong>（如果想要所有结果，需要自己收集）。</p></aside>
        <div class="mb-4"><Code language="go" :code="basicCode" title="errgroup_basic.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>WithContext — 出错自动取消其他 goroutine</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">errgroup.WithContext</code> 返回一个带 context 的 Group——任意 goroutine 返回 error 时，context 自动取消，其他 goroutine 收到取消信号可以提前退出。</p>
        <div class="mb-4"><Code language="go" :code="withCtxCode" title="errgroup_withctx.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>控制并发数：SetLimit（Go 1.21+）</h2>
        <div class="mb-4"><Code language="go" :code="limitCode" title="errgroup_limit.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>errgroup vs WaitGroup</h2>
        <table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">特性</th><th class="px-4 py-2 border font-semibold">WaitGroup</th><th class="px-4 py-2 border font-semibold">errgroup</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">错误传播</td><td class="px-4 py-2 border">❌ 需手动收集</td><td class="px-4 py-2 border text-emerald-600">✅ 第一个错误</td></tr><tr><td class="px-4 py-2 border">取消其他 goroutine</td><td class="px-4 py-2 border">❌</td><td class="px-4 py-2 border text-emerald-600">✅ WithContext</td></tr><tr><td class="px-4 py-2 border">并发控制</td><td class="px-4 py-2 border">❌</td><td class="px-4 py-2 border text-emerald-600">✅ SetLimit (1.21+)</td></tr><tr><td class="px-4 py-2 border">标准库</td><td class="px-4 py-2 border text-emerald-600">✅ sync</td><td class="px-4 py-2 border">⚠️ x/sync</td></tr></tbody></table>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-11-sync-pool" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：sync.Pool</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-13-goroutine-leak" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：goroutine 泄漏 →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"errgroup 基础"},{id:"sec-2",name:"WithContext"},{id:"sec-3",name:"SetLimit"},{id:"sec-4",name:"对比小结"}]
const basicCode = `import "golang.org/x/sync/errgroup"

// errgroup = WaitGroup + 错误收集
g := new(errgroup.Group)
urls := []string{"url1", "url2", "url3"}
for _, url := range urls {
    url := url  // Go < 1.22 闭包陷阱
    g.Go(func() error {
        resp, err := http.Get(url)
        if err != nil { return err }  // 返回错误
        defer resp.Body.Close()
        // ... 处理响应
        return nil
    })
}
if err := g.Wait(); err != nil {  // 等待所有完成，返回第一个错误
    log.Fatal(err)
}`
const withCtxCode = `// WithContext: 一个 goroutine 出错 → 取消所有
g, ctx := errgroup.WithContext(context.Background())
g.Go(func() error {
    return fetchFromAPI(ctx, "url1")  // ctx 会在出错时取消
})
g.Go(func() error {
    return fetchFromAPI(ctx, "url2")
})
// url1 返回 error → ctx 取消 → url2 收到 ctx.Done()，可以提前退出`
const limitCode = `// SetLimit: 控制最大并发数（Go 1.21+）
g := new(errgroup.Group)
g.SetLimit(3)  // 最多同时 3 个 goroutine
for _, url := range urls {
    url := url
    g.Go(func() error {
        return fetch(url)  // 同时只有 3 个在执行
    })
}
g.Wait()  // 等价于带并发限制的 Worker Pool`
</script>
