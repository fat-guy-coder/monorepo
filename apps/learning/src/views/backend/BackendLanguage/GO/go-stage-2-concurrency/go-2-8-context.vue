<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Context 上下文</h1><p class="text-sm text-slate-500 mt-1">超时 · 取消 · 传值——Go 并发控制的标配</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-2-8-context.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-8</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎯</span>context = 请求的生命周期管理</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>context ≈ <strong>AbortController + Request 元数据</strong>。<code class="bg-purple-100 px-1 rounded text-xs font-mono">ctx.Done()</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">signal.aborted</code>（取消信号）。<code class="bg-purple-100 px-1 rounded text-xs font-mono">ctx.Value(key)</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">request.headers['X-Request-ID']</code>（请求级元数据）。<br/>context 解决的核心问题：<strong>如何在 goroutine 树中传播取消信号。</strong></p></aside>
        <p class="text-slate-600 leading-relaxed">Go 中每个 HTTP 请求、gRPC 调用、数据库查询的第一个参数都是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">ctx context.Context</code>。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>四种创建方式</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">函数</th><th class="px-4 py-2 border font-semibold text-slate-700">取消方式</th><th class="px-4 py-2 border font-semibold text-slate-700">用途</th></tr></thead><tbody class="text-slate-600 font-mono text-xs"><tr><td class="px-4 py-2 border">context.Background()</td><td class="px-4 py-2 border">永不取消</td><td class="px-4 py-2 border">根 context（main/init/test）</td></tr><tr><td class="px-4 py-2 border">context.TODO()</td><td class="px-4 py-2 border">永不取消</td><td class="px-4 py-2 border">占位——还没想好用哪个</td></tr><tr><td class="px-4 py-2 border">context.WithCancel(parent)</td><td class="px-4 py-2 border">手动 cancel()</td><td class="px-4 py-2 border">goroutine 取消传播</td></tr><tr><td class="px-4 py-2 border">context.WithTimeout(parent, d)</td><td class="px-4 py-2 border">超时自动取消</td><td class="px-4 py-2 border"><strong>HTTP 请求、DB 查询超时</strong></td></tr><tr><td class="px-4 py-2 border">context.WithDeadline(parent, t)</td><td class="px-4 py-2 border">到达时刻取消</td><td class="px-4 py-2 border">精确截止时间</td></tr></tbody></table></div>
        <div class="mb-4"><Code language="go" :code="basicCode" title="context_basic.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>实战：HTTP 服务超时 + 取消传播</h2>
        <div class="mb-4"><Code language="go" :code="httpCode" title="context_http.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ context 的值传递：</strong>可以存 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">request ID</code>、<code class="bg-emerald-100 px-1 rounded text-xs font-mono">user info</code> 等请求级数据。但<strong>不要存业务数据</strong>（如函数参数）——context 是"控制平面"，不是"数据平面"。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>最佳实践</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>context <strong>作为第一个参数</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">func Do(ctx context.Context, arg string)</code></span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>不要存 context 到 struct</strong>——每次调用都传参</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>调用 cancel 后 ctx.Done() 的 channel <strong>立即关闭</strong>——所有监听这个 ctx 的 goroutine 同时收到信号</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>ctx.Value 只用字符串 key？用<strong>自定义类型</strong>避免 key 冲突</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-7-atomic" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：原子操作</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-9-concurrency-patterns" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：并发模式 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"context概述"},{id:"sec-2",name:"四种创建"},{id:"sec-3",name:"实战HTTP"},{id:"sec-4",name:"最佳实践"}]
const basicCode = `ctx := context.Background()
// 超时控制——HTTP handler 最常用
ctx, cancel := context.WithTimeout(ctx, 3*time.Second)
defer cancel()  // 确保释放资源

// 检查 ctx 是否已取消
select {
case <-ctx.Done(): return ctx.Err()  // context.DeadlineExceeded
case result := <-doWork(ctx): fmt.Println(result)
}`

const httpCode = `func handler(w http.ResponseWriter, r *http.Request) {
    ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
    defer cancel()
    // 数据库查询——ctx 取消时自动释放连接
    rows, err := db.QueryContext(ctx, "SELECT ...")
    // 下游 HTTP 调用——ctx 取消时中止请求
    req, _ := http.NewRequestWithContext(ctx, "GET", url, nil)
    resp, err := client.Do(req)
    // ctx 取消 → 所有依赖 ctx 的操作同时取消
}`
</script>
