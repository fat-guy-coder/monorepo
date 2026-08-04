<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">📋 Context 上下文</h1><p class="text-sm text-slate-500 mt-1">超时 · 取消传播 · 传值 — 每一个 Go 请求都该有的"到期时间"和"退出开关"</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-8-context.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-8</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Context 解决什么问题？— "过期时间"+"退出开关"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">一个 HTTP 请求过来了，你要查数据库、调下游服务、写缓存——这些操作都需要时间。如果<strong>客户端断了连接</strong>或者<strong>等了太久</strong>，继续执行这些操作就是在<strong>浪费 CPU + 数据库连接 + 内存</strong>。context 就是<strong>给请求绑一个"有效期"和一个"取消开关"</strong>——超时或取消后，所有下游操作一起停。</p>
        <div class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-blue-800"><strong>💡 心智模型——"酒店房卡"：</strong>你入住时拿到一张房卡（context），上面有退房时间（deadline）。你用这张卡开门（DB 查询）、坐电梯（RPC 调用）、游泳（写缓存）。退房时间一到——卡自动失效——所有你试图做的操作都返回"过期了"。<br/>你也可以<strong>提前退房</strong>（cancel）——卡立刻失效。这就是 context：<strong>一个会过期的"授权凭证"，贯穿整个请求链路</strong>。</p></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 JS 类比：</strong>context ≈ <strong>AbortController + signal</strong>——<code class="bg-purple-100 px-1 rounded text-xs font-mono">fetch(url, {signal})</code> 就是"请求级 context"模式。Node.js 的 <strong>AsyncLocalStorage</strong> 类似 ctx 的传值能力。</p></aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>Context 的六种创建方式</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">函数</th><th class="px-4 py-2 border font-semibold">用途</th><th class="px-4 py-2 border font-semibold">何时用</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">Background()</td><td class="px-4 py-2 border">根 context——永不取消、无 deadline</td><td class="px-4 py-2 border">main()、init()、测试入口</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">TODO()</td><td class="px-4 py-2 border">占位符——"我知道该传 context 但还没想好用啥"</td><td class="px-4 py-2 border">重构中、待定</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">WithCancel(parent)</td><td class="px-4 py-2 border">返回 ctx + cancel 函数——手动取消</td><td class="px-4 py-2 border">手动停止 goroutine</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">WithTimeout(parent, d)</td><td class="px-4 py-2 border">d 时间后自动取消</td><td class="px-4 py-2 border"><strong>HTTP 请求、DB 查询——90% 的场景用这个</strong></td></tr><tr><td class="px-4 py-2 border font-mono text-xs">WithDeadline(parent, t)</td><td class="px-4 py-2 border">指定时刻 t 取消（WithTimeout 的绝对时间版）</td><td class="px-4 py-2 border">需要在特定时刻截止</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">WithValue(parent, k, v)</td><td class="px-4 py-2 border">携带请求级数据</td><td class="px-4 py-2 border">trace ID、user ID——慎用！</td></tr></tbody></table></div>
        <div class="mb-4"><Code language="go" :code="basicCode" title="context_basic.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>取消传播 — context 的树形结构</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">context 内部是一个<strong>单向链表</strong>（从当前节点指向上级父节点）。WithCancel/WithTimeout/WithValue 都创建一个<strong>新节点</strong>挂在父节点下。cancel 函数的机制：向上遍历到根，从根往下逐一 close 所有子节点的 Done channel。<strong>所以父取消→所有子都被取消。子取消不影响父。</strong></p>
        <div class="mb-4"><Code language="go" :code="propagationCode" title="propagation.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 Done() 返回的是 close 的 channel（不是发送值）。</strong>这意味着所有同时等待 <code class="bg-blue-100 px-1 rounded text-xs font-mono"><-ctx.Done()</code> 的 goroutine 会<strong>同时被唤醒</strong>——因为一个已关闭的 channel 会无限返回零值。这就是 cancel 的"广播"效应。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>实战：从 HTTP 到优雅关闭</h2>
        <h3 class="text-md font-semibold text-slate-700 mb-3">HTTP 全链路 context</h3>
        <div class="mb-4"><Code language="go" :code="httpCtxCode" title="http_context.go" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">优雅关闭（Graceful Shutdown）</h3>
        <div class="mb-4"><Code language="go" :code="shutdownCode" title="graceful_shutdown.go" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>新手最常犯的 context 错误</h2>
        <div class="space-y-3 text-sm">
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-semibold text-amber-700 mb-1">① 忘记 defer cancel()——最常见的泄漏</h4>
            <p class="text-amber-600">WithTimeout 创建了一个 Timer。<strong>不调用 cancel，Timer 永不释放</strong>——即使 ctx 已经超时。一次请求泄漏一个 Timer，一天百万请求就泄漏百万 Timer。<code class="bg-amber-100 px-1 rounded text-xs">defer cancel()</code> 记住。</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-semibold text-amber-700 mb-1">② 用 string 做 context key</h4>
            <p class="text-amber-600">两个不同的包可能用相同的字符串 "userID" 做 key → 值被互相覆盖。<strong>用空的私有类型</strong>（<code class="bg-amber-100 px-1 rounded text-xs">type myKey struct{}</code>）做 key——Go 的类型系统保证不同包不会冲突。</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-semibold text-amber-700 mb-1">③ 把 context 存到 struct 里</h4>
            <p class="text-amber-600">context 是<strong>请求级</strong>的——请求结束它就过期了。存到 struct 里会让后续请求误用已过期的 context（操作全失败）。每次都通过函数参数传递。</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-semibold text-amber-700 mb-1">④ ctx.Value 存业务数据</h4>
            <p class="text-amber-600">ctx.Value 的类型是 <code class="bg-amber-100 px-1 rounded text-xs">any</code>——丢失了类型安全。只存<strong>请求追踪</strong>（trace ID / user ID / request ID），不存订单、用户对象等业务数据。</p>
          </div>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>context = <strong>请求的"有效期" + "取消开关"</strong>。每一个请求一个 ctx，传递到所有下游</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>WithTimeout + defer cancel()</strong>——覆盖 90% 场景。忘记 cancel = Timer 泄漏</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>取消传播是<strong>双向的</strong>：父取消→所有子取消。Done() close channel = 广播效应</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>函数第一参数、不存 struct、Value 用自定义类型做 key、不存业务数据</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-7-atomic" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Atomic</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-9-concurrency-patterns" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：并发模式 →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"Context解决什么问题"},{id:"sec-2",name:"六种创建方式"},{id:"sec-3",name:"取消传播树"},{id:"sec-4",name:"HTTP+优雅关闭"},{id:"sec-5",name:"新手常见错误"},{id:"sec-6",name:"小结"}]
const basicCode = `// WithCancel — 手动取消
ctx, cancel := context.WithCancel(context.Background())
go func() { select { case <-ctx.Done(): fmt.Println("cancelled!") } }()
cancel() // Done() channel 被 close——所有等待者同时唤醒
// 输出: cancelled!

// WithTimeout — 超时自动取消（HTTP 请求、DB 查询——覆盖 90% 场景）
ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
defer cancel() // ⚠️ 必须调用——释放 Timer 资源（忘记了就 Timer 泄漏）
select {
case <-doWork(): fmt.Println("done")
case <-ctx.Done(): fmt.Println("timeout:", ctx.Err()) // deadline exceeded
}

// WithValue — 携带元数据（自定义类型防 key 冲突）
type traceIDKey struct{}  // 空 struct 做 key——全局唯一类型
ctx := context.WithValue(ctx, traceIDKey{}, "abc-123")
traceID := ctx.Value(traceIDKey{}).(string)  // "abc-123"`
const propagationCode = `// 取消传播：父取消 → 子全部取消
rootCtx, rootCancel := context.WithCancel(context.Background())
childCtx, _ := context.WithCancel(rootCtx)
grandChild, _ := context.WithTimeout(childCtx, time.Hour)

rootCancel()          // 取消父
<-childCtx.Done()     // 立即返回
<-grandChild.Done()   // 立即返回！

// cancel 是幂等的——多次调用安全
cancel(); cancel()    // 第二次无影响

// 子取消不影响父
childCancel()
<-childCtx.Done()     // 子 cancel 了
<-rootCtx.Done()      // 父不受影响——不会返回

// Done() 返回 close channel → 广播效应
// 所有 <-ctx.Done() 同时收到零值`
const httpCtxCode = `// HTTP 服务中 context 的完整链路
func handler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()                         // ① 请求自带 context
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()

    // ② 传给 DB 层——超时会取消查询
    user, err := db.QueryUser(ctx, userID)
    if err != nil { http.Error(w, "查询超时", 504); return }

    // ③ 传给下游微服务
    posts, err := api.FetchPosts(ctx, user.ID)
    if err != nil { return }

    json.NewEncoder(w).Encode(posts)
}
// 客户端断开 → r.Context() 自动取消
// → DB 查询取消 → goroutine 退出 → 整条链上的 goroutine 安全退出`
const shutdownCode = `// 优雅关闭——收到 SIGINT/Ctrl+C 后等正在处理的请求完成
func main() {
    // signal.NotifyContext: 收到信号自动取消 context
    ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
    defer stop()

    srv := &http.Server{Addr: ":8080", Handler: mux}

    // 在 goroutine 中启动 server
    go func() {
        fmt.Println("server started")
        if err := srv.ListenAndServe(); err != http.ErrServerClosed {
            log.Fatal(err)
        }
    }()

    <-ctx.Done()                         // ① 等待 Ctrl+C
    fmt.Println("shutting down...")

    shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    srv.Shutdown(shutdownCtx)            // ② 优雅关闭：等 10 秒让进行中的请求完成
    fmt.Println("server stopped")
}
// 效果：Ctrl+C → 不再接受新请求 → 等 10 秒让旧请求处理完 → 退出`
</script>
