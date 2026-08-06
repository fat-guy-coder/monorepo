<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🪢 errgroup 并发错误组</h1><p class="text-sm text-slate-500 mt-1">WaitGroup 的升级版——同时等多个 goroutine + 传错误 + 自动取消</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-12-errgroup.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-12</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>WaitGroup 做不到的三件事 — errgroup 全做成</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">WaitGroup 只能等——不知道哪个 goroutine 出错了，不能取消其他 goroutine，也不能控制并发数。<strong>errgroup 解决这三个痛点：</strong>① <strong>错误传播</strong>——任意 goroutine 返回 error→Wait() 返回第一个 error；② <strong>自动取消</strong>——WithContext 版本下，出错时 context 取消→其他 goroutine 收到信号提前退出；③ <strong>并发控制</strong>——SetLimit 限制同时运行的 goroutine 数。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 JS 类比：</strong>errgroup ≈ <strong>Promise.all() 的 fail-fast 模式</strong>——一个 reject 就整体失败。如果要"收集所有结果不管成败"，需要用 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Promise.allSettled()</code>——errgroup 默认是 fail-fast。</p></aside>
        <div class="mb-4"><Code language="go" :code="basicCode" title="errgroup_basic.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>WithContext — 一个出错，全取消</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">如果你要并发请求 3 个微服务，其中 1 个返回错误——剩下 2 个还在白费力气等响应（浪费资源）。WithContext 返回一个带 context 的 Group：任何一个 goroutine 返回 error→context 自动 cancel→其他 goroutine 里的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono"><-ctx.Done()</code> 立即返回→它们可以提前退出。</p>
        <div class="mb-4"><Code language="go" :code="withCtxCode" title="errgroup_withctx.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>SetLimit — 内置并发限流</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">有 1000 个 URL 要爬，但你不想同时启动 1000 个 goroutine 把网络打爆。SetLimit(N) 确保同时只有 N 个 goroutine 在运行——其余排队等。这比手动实现 Worker Pool + channel 简洁得多。</p>
        <div class="mb-4"><Code language="go" :code="limitCode" title="errgroup_limit.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>errgroup vs WaitGroup 速查</h2>
        <table class="w-full text-sm border-collapse mb-3"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">特性</th><th class="px-4 py-2 border font-semibold">WaitGroup</th><th class="px-4 py-2 border font-semibold">errgroup</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">错误传播</td><td class="px-4 py-2 border">❌ 自己收集</td><td class="px-4 py-2 border text-emerald-600">✅ 返回第一个 error</td></tr><tr><td class="px-4 py-2 border">取消其他 goroutine</td><td class="px-4 py-2 border">❌</td><td class="px-4 py-2 border text-emerald-600">✅ WithContext</td></tr><tr><td class="px-4 py-2 border">并发控制</td><td class="px-4 py-2 border">❌</td><td class="px-4 py-2 border text-emerald-600">✅ SetLimit (1.21+)</td></tr><tr><td class="px-4 py-2 border">标准库</td><td class="px-4 py-2 border text-emerald-600">✅ sync</td><td class="px-4 py-2 border">⚠️ golang.org/x/sync</td></tr><tr><td class="px-4 py-2 border">Go 类型</td><td class="px-4 py-2 border">结构体</td><td class="px-4 py-2 border">结构体</td></tr></tbody></table>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 什么时候用 WaitGroup？</strong>简单的"等所有完成后继续"——不需要错误处理，不需要取消。一旦涉及<strong>错误</strong>或<strong>取消</strong>——直接上 errgroup。这个包虽然不在标准库，但 Go 官方维护（golang.org/x），生产环境大量使用。</p></aside>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-11-sync-pool" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：sync.Pool</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-13-goroutine-leak" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：goroutine 泄漏 →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"errgroup 基础"},{id:"sec-2",name:"WithContext"},{id:"sec-3",name:"SetLimit"},{id:"sec-4",name:"选型速查"}]
const basicCode = `import "golang.org/x/sync/errgroup"

// errgroup = WaitGroup + 错误传播
var g errgroup.Group
urls := []string{"url1", "url2", "url3"}
for _, url := range urls {
    url := url
    g.Go(func() error {
        resp, err := http.Get(url)
        if err != nil { return err }  // 👈 返回错误！WaitGroup 做不到
        defer resp.Body.Close()
        return process(resp)
    })
}
if err := g.Wait(); err != nil {  // 返回第一个 error
    log.Fatal("至少一个请求失败:", err)
}
fmt.Println("所有请求成功")`
const withCtxCode = `// WithContext — 一个出错 → 所有 goroutine 收到取消
g, ctx := errgroup.WithContext(context.Background())

g.Go(func() error {
    return fetchWithCtx(ctx, "url1")  // ctx 出错时被 cancel
})
g.Go(func() error {
    return fetchWithCtx(ctx, "url2")
})
// url1 返回 error → ctx 自动 cancel
// → url2 里的 <-ctx.Done() 立即返回 → url2 提前退出（不再傻等）
// → g.Wait() 返回 url1 的 error`
const limitCode = `// SetLimit: 最多同时 3 个 goroutine（Go 1.21+）
g := new(errgroup.Group)
g.SetLimit(3)  // 内置并发限流——不需要额外 pool 代码
for _, url := range hugeURLList {
    url := url
    g.Go(func() error {
        return fetch(url)  // 1000 个 URL，但同时只有 3 个在执行
    })
}
g.Wait()
// 等价于:
// sema := make(chan struct{}, 3) + WaitGroup + error collection
// 但 errgroup 三行搞定`
</script>
