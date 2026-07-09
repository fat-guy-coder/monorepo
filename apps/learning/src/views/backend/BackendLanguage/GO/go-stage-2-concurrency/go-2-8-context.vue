<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">📋 Context 上下文</h1><p class="text-sm text-slate-500 mt-1">超时 · 取消传播 · 传值 — Go 并发控制的事实标准</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-8-context.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-8</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Context 的四种创建方式</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Go 中<strong>每个请求都应该携带一个 context</strong>——用于超时控制、取消传播、传递请求级元数据。context 是<strong>不可变的树形结构</strong>：每个派生函数创建一个新的 context 节点。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>context ≈ <strong>AbortController + 请求级全局变量</strong>。JS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">new AbortController()</code> + <code class="bg-purple-100 px-1 rounded text-xs font-mono">signal</code> 类似 ctx 的取消传播。Node.js 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">AsyncLocalStorage</code> 类似 ctx 的值传递。</p></aside>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">函数</th><th class="px-4 py-2 border font-semibold">用途</th><th class="px-4 py-2 border font-semibold">典型场景</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">context.Background()</td><td class="px-4 py-2 border">根 context（永不取消）</td><td class="px-4 py-2 border">main、init、测试</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">context.TODO()</td><td class="px-4 py-2 border">占位符（不确定用啥时）</td><td class="px-4 py-2 border">重构中、待定</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">WithCancel(parent)</td><td class="px-4 py-2 border">手动取消</td><td class="px-4 py-2 border">手动停止 goroutine</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">WithTimeout(parent, d)</td><td class="px-4 py-2 border">超时自动取消</td><td class="px-4 py-2 border">HTTP 请求、DB 查询</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">WithDeadline(parent, t)</td><td class="px-4 py-2 border">截止时间取消</td><td class="px-4 py-2 border">定时任务截止</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">WithValue(parent, k, v)</td><td class="px-4 py-2 border">携带请求级数据</td><td class="px-4 py-2 border">trace ID、user ID</td></tr></tbody></table></div>
        <div class="mb-4"><Code language="go" :code="basicCode" title="context_basic.go" /></div>
      </section>
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>取消传播与 context 树</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">context 的取消是<strong>单向传播</strong>的——父取消→所有子都取消，但子取消不影响父。这是实现<strong>优雅关闭</strong>的关键。</p>
        <div class="mb-4"><Code language="go" :code="propagationCode" title="propagation.go" /></div>
      </section>
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>最佳实践与反模式</h2>
        <ul class="space-y-2 text-slate-600 text-sm"><li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✅</span><span>context 作为<strong>函数第一个参数</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">func Do(ctx context.Context, arg string)</code></span></li><li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✅</span><span><strong>不要存 context 到 struct</strong>——每次调用传参，让调用者控制生命周期</span></li><li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✅</span><span>ctx.Value 只存<strong>请求级元数据</strong>（trace ID、user ID），不存业务参数</span></li><li class="flex items-start gap-2"><span class="text-red-500 mt-1">❌</span><span>不要用 string 做 context key——用<strong>自定义类型</strong>防止冲突</span></li><li class="flex items-start gap-2"><span class="text-red-500 mt-1">❌</span><span>不要忘记 defer cancel()——WithTimeout 返回的 cancel 必须调用</span></li></ul>
      </section>
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>每个请求一个 context——超时控制 + 取消传播</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>WithCancel 手动取消，WithTimeout 自动超时，WithValue 传元数据</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>父取消 → 子全部取消；defer cancel() 必须调用</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-7-atomic" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Atomic</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-9-concurrency-patterns" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：并发模式 →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"四种创建方式"},{id:"sec-2",name:"取消传播"},{id:"sec-3",name:"最佳实践"},{id:"sec-4",name:"小结"}]
const basicCode = `// WithCancel — 手动取消
ctx, cancel := context.WithCancel(context.Background())
go func() {
    select {
    case <-ctx.Done(): fmt.Println("cancelled!")
    }
}()
cancel() // 手动取消——ctx.Done() channel 立即关闭
// 输出: cancelled!

// WithTimeout — 超时自动取消（HTTP 请求、DB 查询必备）
ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
defer cancel() // ⚠️ 必须调用——释放 timer 资源
select {
case <-doWork(): fmt.Println("done")
case <-ctx.Done(): fmt.Println("timeout:", ctx.Err())
}
// 输出: timeout: context deadline exceeded

// WithValue — 携带请求级元数据（用自定义类型做 key）
type traceIDKey struct{}
ctx := context.WithValue(context.Background(), traceIDKey{}, "abc-123")
traceID := ctx.Value(traceIDKey{}).(string)  // "abc-123"`
const propagationCode = `// 取消传播：父取消 → 子全部取消
rootCtx, rootCancel := context.WithCancel(context.Background())
childCtx, _ := context.WithCancel(rootCtx)   // 子
grandChild, _ := context.WithTimeout(childCtx, time.Hour) // 孙

rootCancel()  // 取消父 → 子和孙都收到取消信号！
<-childCtx.Done()   // 立即返回
<-grandChild.Done() // 立即返回
// 输出: child cancelled by parent: context canceled

// 实战：HTTP Server 优雅关闭
func main() {
    ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
    defer stop()
    srv := &http.Server{Addr: ":8080"}
    go srv.ListenAndServe()
    <-ctx.Done()       // 收到 Ctrl+C
    srv.Shutdown(ctx)  // 优雅关闭（等待进行中的请求完成）}`
</script>
