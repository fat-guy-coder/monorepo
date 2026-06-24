<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">errgroup 并发错误组</h1><p class="text-sm text-slate-500 mt-1">WaitGroup + 错误传播——goroutine 错误处理的标准方案</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-2-12-errgroup.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-12</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🚨</span>WaitGroup 的痛点——错误处理困难</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>errgroup ≈ <strong>Promise.all() 遇到第一个 reject 就取消</strong>——多个 goroutine 协同工作，任何一个出错就立即取消其他所有 goroutine。≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">Promise.all([...]) 的 fail-fast 版本</code>。</p></aside>
        <p class="text-slate-600 mb-3 leading-relaxed">WaitGroup 无法传递 goroutine 内部的 error。<strong>errgroup</strong>（golang.org/x/sync/errgroup）完美解决：任何一个 goroutine 返回 error → 取消所有其他 goroutine → 返回第一个 error。</p>
        <div class="mb-4"><Code language="go" :code="basicCode" title="errgroup_basic.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>带 context 的 errgroup</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">errgroup.WithContext(ctx)</code> 返回一个 group——任何一个 goroutine 返回 error，<strong>自动取消 ctx</strong>，所有其他 goroutine 通过 ctx.Done() 收到退出信号。</p>
        <div class="mb-4"><Code language="go" :code="ctxCode" title="errgroup_context.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>实战：并发爬虫</h2>
        <div class="mb-4"><Code language="go" :code="realCode" title="errgroup_crawler.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>errgroup 替代 WaitGroup</strong>——当 goroutine 需要返回 error 时</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>任何一个 goroutine 出错 → 取消所有 → 返回第一个 error</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>WithContext 自动取消——goroutine 通过 ctx.Done() 优雅退出</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-11-sync-pool" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：sync.Pool</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-13-goroutine-leak" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：goroutine泄漏 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"errgroup基础"},{id:"sec-2",name:"WithContext"},{id:"sec-3",name:"实战爬虫"},{id:"sec-4",name:"小结"}]
const basicCode = `import "golang.org/x/sync/errgroup"
var g errgroup.Group
urls := []string{"https://a.com", "https://b.com", "https://c.com"}
for _, url := range urls {
    url := url  // 循环变量捕获
    g.Go(func() error {
        resp, err := http.Get(url)
        if err != nil { return err }
        defer resp.Body.Close()
        return nil
    })
}
if err := g.Wait(); err != nil { log.Fatal(err) }`
const ctxCode = `g, ctx := errgroup.WithContext(context.Background())
g.Go(func() error {
    return fetchWithContext(ctx, "https://a.com")
})
g.Go(func() error {
    return fetchWithContext(ctx, "https://b.com")
})
// 如果 a 失败 → ctx 自动取消 → b 收到 ctx.Done() → 退出`
const realCode = `func crawl(urls []string) error {
    g, ctx := errgroup.WithContext(context.Background())
    g.SetLimit(10)  // 限制并发数（Go 1.20+）
    for _, u := range urls {
        u := u
        g.Go(func() error {
            req, _ := http.NewRequestWithContext(ctx, "GET", u, nil)
            resp, err := http.DefaultClient.Do(req)
            if err != nil { return err }
            defer resp.Body.Close()
            return process(resp)
        })
    }
    return g.Wait()
}`
</script>
