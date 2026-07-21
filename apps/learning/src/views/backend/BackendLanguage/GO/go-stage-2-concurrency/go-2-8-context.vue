<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">📋 Context 上下文</h1><p class="text-sm text-slate-500 mt-1">超时 · 取消传播 · 传值 — Go 并发控制的事实标准，每个请求的"生命周期管理器"</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-8-context.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-8</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Context 的四种创建方式</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">context 是 Go 中每个请求的<strong>"生命周期管理线"</strong>——超时、取消、传值都通过它传递。它是一个<strong>不可变的链表</strong>——每个派生函数在父节点上添加一层。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 JS 类比：</strong>context ≈ <strong>AbortController.signal</strong>（取消传播）+ <strong>AsyncLocalStorage</strong>（请求级传值）。JS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">fetch(url, {signal})</code> 就是 context 的超时+取消模式。</p></aside>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">函数</th><th class="px-4 py-2 border font-semibold">用途</th><th class="px-4 py-2 border font-semibold">典型场景</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">Background()</td><td class="px-4 py-2 border">根 context（永不取消）</td><td class="px-4 py-2 border">main、init、测试入口</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">TODO()</td><td class="px-4 py-2 border">占位符</td><td class="px-4 py-2 border">重构中、待确定</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">WithCancel(parent)</td><td class="px-4 py-2 border">手动取消</td><td class="px-4 py-2 border">手动停止 goroutine</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">WithTimeout(parent, d)</td><td class="px-4 py-2 border">超时自动取消</td><td class="px-4 py-2 border">HTTP 请求、DB 查询</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">WithDeadline(parent, t)</td><td class="px-4 py-2 border">截止时间取消</td><td class="px-4 py-2 border">定时任务截止</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">WithValue(parent, k, v)</td><td class="px-4 py-2 border">携带请求级数据</td><td class="px-4 py-2 border">trace ID、user ID</td></tr></tbody></table></div>
        <div class="mb-4"><Code language="go" :code="basicCode" title="context_basic.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>取消传播 — context 的树形结构</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">context 的取消是<strong>单向传播</strong>——父取消→所有子都取消，子取消不影响父。cancel 函数<strong>幂等</strong>——多次调用安全。Done() 返回的 channel 在取消时<strong>close</strong>（不是发送值），所以所有等待者同时被唤醒。</p>
        <div class="mb-4"><Code language="go" :code="propagationCode" title="propagation.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>实战：HTTP 服务中的 context 全链路</h2>
        <div class="mb-4"><Code language="go" :code="httpCtxCode" title="http_context.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>最佳实践与反模式</h2>
        <ul class="space-y-2 text-slate-600 text-sm"><li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✅</span><span>context 作为<strong>函数第一个参数</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">func Do(ctx context.Context, arg string)</code></span></li><li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✅</span><span><strong>不要存 context 到 struct</strong>——每次调用传参</span></li><li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✅</span><span>ctx.Value 只存<strong>请求级元数据</strong>（trace ID），不存业务参数</span></li><li class="flex items-start gap-2"><span class="text-red-500 mt-1">❌</span><span>不要用 string 做 context key——用<strong>自定义类型</strong>防止冲突</span></li><li class="flex items-start gap-2"><span class="text-red-500 mt-1">❌</span><span>不要忘记 defer cancel()——WithTimeout 的 cancel 必须调用来释放 timer</span></li><li class="flex items-start gap-2"><span class="text-red-500 mt-1">❌</span><span>不要把 context 传给 struct 存起来——它是<strong>请求级</strong>的，不能跨请求复用</span></li></ul>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>context = 请求的生命周期线——超时+取消+传值，不可变树形结构</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Done() 返回 close 的 channel（非发送值）——所有等待者<strong>同时被唤醒</strong></span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>父取消→子全取消；cancel 幂等；<strong>defer cancel() 必须调用</strong>释放资源</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>函数第一参数，不存 struct，Value 用自定义类型做 key</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-7-atomic" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Atomic</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-9-concurrency-patterns" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：并发模式 →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"创建方式"},{id:"sec-2",name:"取消传播树"},{id:"sec-3",name:"HTTP 实战"},{id:"sec-4",name:"最佳实践"},{id:"sec-5",name:"小结"}]
const basicCode = `// WithCancel — 手动取消
ctx, cancel := context.WithCancel(context.Background())
go func() { select { case <-ctx.Done(): fmt.Println("cancelled!") } }()
cancel() // Done() channel 被 close——所有等待者同时唤醒
// 输出: cancelled!

// WithTimeout — 超时自动取消
ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
defer cancel() // ⚠️ 必须调用——释放 timer 资源
select {
case <-doWork(): fmt.Println("done")
case <-ctx.Done(): fmt.Println("timeout:", ctx.Err()) // deadline exceeded
}

// WithValue — 携带元数据（用自定义类型做 key 防冲突）
type traceIDKey struct{}
ctx := context.WithValue(ctx, traceIDKey{}, "abc-123")
traceID := ctx.Value(traceIDKey{}).(string)  // "abc-123"`
const propagationCode = `// 取消传播：父取消 → 子全部取消
rootCtx, rootCancel := context.WithCancel(context.Background())
childCtx, _ := context.WithCancel(rootCtx)
grandChild, _ := context.WithTimeout(childCtx, time.Hour)

rootCancel()          // 取消父
<-childCtx.Done()     // 立即返回
<-grandChild.Done()   // 立即返回（孙也被取消！）

// cancel 是幂等的——多次调用安全
cancel(); cancel()    // 第二次无影响

// Done() 返回的是 close 的 channel——不是发送值
// 所以所有 <-ctx.Done() 同时收到零值（广播效应）`
const httpCtxCode = `// HTTP 服务中 context 的完整链路
func handler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()                         // 请求自带 context
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()

    // 传给 DB 层——超时会取消查询
    user, err := db.QueryUser(ctx, userID)
    if err != nil { http.Error(w, "查询超时", 504); return }

    // 传给下游服务
    posts, err := api.FetchPosts(ctx, user.ID)
    if err != nil { /* 处理 */ }

    json.NewEncoder(w).Encode(posts)
}
// 客户端断开 → r.Context() 自动取消 → DB 查询取消 → goroutine 退出
// 整条链路上的 goroutine 都安全退出——不会泄漏`
</script>
