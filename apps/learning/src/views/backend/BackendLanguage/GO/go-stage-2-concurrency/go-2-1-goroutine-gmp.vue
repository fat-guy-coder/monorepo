<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">goroutine 与 GMP 调度</h1><p class="text-sm text-slate-500 mt-1">Go 的轻量级并发——比线程更轻、比 Promise 更自然的并发模型</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-2-1-goroutine-gmp.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-1</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">⚡</span>goroutine = 用户态轻量线程</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>goroutine ≈ <strong>比 Promise 更自然的异步</strong>——不用 async/await 关键字，写起来像同步代码，却是并发的。<br/>JS: <code class="bg-purple-100 px-1 rounded text-xs font-mono">await Promise.all([fetch1(), fetch2()])</code> · Go: <code class="bg-purple-100 px-1 rounded text-xs font-mono">go fetch1(); go fetch2()</code>—— <strong>go 关键字</strong> 就是"启动一个并发的协程"。<br/>Node.js: 一个 Worker Thread ~几MB 内存 · Go: 一个 goroutine ~<strong>2KB 栈</strong>——可以轻松启动<strong>百万级</strong> goroutine。</p></aside>
        <div class="mb-4"><Code language="go" :code="basicCode" title="goroutine_basic.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>GMP 调度模型——goroutine 如何运行</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Go runtime 使用 <strong>GMP 模型</strong> 调度 goroutine 到操作系统线程上：</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">组件</th><th class="px-4 py-2 border font-semibold text-slate-700">全称</th><th class="px-4 py-2 border font-semibold text-slate-700">职责</th><th class="px-4 py-2 border font-semibold text-slate-700">类比</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-semibold font-mono text-xs">G</td><td class="px-4 py-2 border">Goroutine</td><td class="px-4 py-2 border">用户态的轻量级执行单元——包含栈、PC、状态</td><td class="px-4 py-2 border">JS 的 Task/Callback</td></tr><tr><td class="px-4 py-2 border font-semibold font-mono text-xs">M</td><td class="px-4 py-2 border">Machine (OS Thread)</td><td class="px-4 py-2 border">操作系统线程——真正执行代码的内核资源</td><td class="px-4 py-2 border">Worker Thread</td></tr><tr><td class="px-4 py-2 border font-semibold font-mono text-xs">P</td><td class="px-4 py-2 border">Processor</td><td class="px-4 py-2 border"><strong>逻辑处理器</strong>——持有 G 的本地队列。P 的数量 = GOMAXPROCS（默认=CPU核数）</td><td class="px-4 py-2 border">Event Loop 实例</td></tr></tbody></table></div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">调度流程</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 text-sm mb-4 leading-relaxed"><li>每个 <strong>P</strong> 有一个<strong>本地 goroutine 队列</strong>（runq），P 从队列中取出 G 交给 M 执行</li><li>G 执行系统调用阻塞时 → M 和 P 分离，P 找新 M（或新 P 找 M），G 被挂起</li><li>G 执行完成或主动让出（channel 等待、time.Sleep）→ P 从队列取下一个 G</li><li><strong>工作窃取（Work Stealing）：</strong>如果 P 的本地队列空了，从<strong>全局队列</strong>或<strong>其他 P 的队列</strong>偷一半 G</li></ol>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ GMP 的核心优势：</strong>M:N 调度——N 个 goroutine 映射到 M 个 OS 线程。goroutine 切换<strong>只在用户态</strong>（几 ns），不需要陷入内核。这就是为什么 Go 能跑百万 goroutine。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>goroutine 的栈——可增长</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">每个 goroutine 初始只有 <strong>2KB 栈</strong>（Go 1.4+）。栈不够时 runtime <strong>自动分配新栈</strong>（2x），把旧数据<strong>复制</strong>过去，指针自动更新。这对比 OS 线程的<strong>固定 1-8MB 栈</strong>是革命性的——让百万 goroutine 成为可能。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 对比：</strong>Node.js 单线程 Event Loop 处理并发 I/O，但 CPU 密集任务会阻塞。Go 的 GMP 既能<strong>并行执行</strong>（多核），又能<strong>并发 I/O</strong>（goroutine 阻塞时自动切换）。≈ Node.js 的 Event Loop + Worker Threads 的<strong>统一高效版</strong>。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>goroutine 的生命周期与泄漏</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">goroutine <strong>不会自动结束</strong>——函数执行完毕才退出。如果 goroutine 在等待一个<strong>永远不会到来的 channel 消息</strong>，它就永远阻塞——这就是 <strong>goroutine 泄漏</strong>。</p>
        <div class="mb-4"><Code language="go" :code="leakCode" title="goroutine_leak.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">检测泄漏</h3>
        <p class="text-slate-600 text-sm mb-3">用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">runtime.NumGoroutine()</code> 在测试前后比较 goroutine 数量。或者用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">go.uber.org/goleak</code> 自动检测。</p>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>WaitGroup——等待 goroutine 完成</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">sync.WaitGroup</code> 等待一组 goroutine 执行完毕——比 time.Sleep 靠谱得多。</p>
        <div class="mb-4"><Code language="go" :code="wgCode" title="waitgroup.go" /></div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>常见问题</h2>
        <div class="space-y-3 text-slate-600 text-sm"><div class="bg-slate-50 rounded-lg p-3"><strong>Q: goroutine 和线程有什么区别？</strong><br/>A: goroutine 是<strong>用户态</strong>，由 Go runtime 调度，2KB 栈可增长。线程是<strong>内核态</strong>，由 OS 调度，1-8MB 固定栈。goroutine 切换 ~几十 ns，线程切换 ~几 μs（~100x差距）。</div><div class="bg-slate-50 rounded-lg p-3"><strong>Q: GOMAXPROCS 设多少？</strong><br/>A: 默认 = CPU 核数。I/O 密集可以设大一点（让阻塞的 P 被替换），CPU 密集不需要改。</div><div class="bg-slate-50 rounded-lg p-3"><strong>Q: 主 goroutine 退出了，其他 goroutine 会怎样？</strong><br/>A: <strong>全部强制终止。</strong>main 函数返回 → 整个进程退出。所以需要用 WaitGroup/channel 等主 goroutine。</div></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">go func()</code> 启动一个 goroutine——初始 2KB 栈，百万级并发</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>GMP = G（goroutine）+ M（OS线程）+ P（逻辑处理器）</strong>——M:N 调度</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>工作窃取</strong>——P 的队列空了从其他 P 偷 G，负载均衡</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>GOMAXPROCS 默认 = CPU 核数，控制并行度</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-19-testing" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：单元测试</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-2-channels" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Channel 通道 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"goroutine基础"},{id:"sec-2",name:"GMP模型"},{id:"sec-3",name:"可增长栈"},{id:"sec-4",name:"泄漏与检测"},{id:"sec-5",name:"WaitGroup"},{id:"sec-6",name:"常见问题"},{id:"sec-7",name:"小结"}]
const leakCode = `// ❌ goroutine 泄漏：永远阻塞，永不退出
func leak() {
    ch := make(chan int)
    go func() { <-ch }()   // 永远等一个没人发的 channel
    // 这个 goroutine 永远不会被 GC——泄漏！
}
// ✅ 正确：用 context 或 close(ch) 给 goroutine 退出信号
func noLeak(ctx context.Context) {
    go func() {
        select {
        case <-ctx.Done(): return   // 收到取消信号，退出
        case v := <-ch: handle(v)
        }
    }()
}`
const wgCode = `var wg sync.WaitGroup
for i := 0; i < 5; i++ {
    wg.Add(1)               // 计数器 +1
    go func(n int) {
        defer wg.Done()     // 完成时 -1
        fmt.Println(n)
    }(i)
}
wg.Wait()                   // 阻塞直到计数器归零
fmt.Println("all done")`
const basicCode = `package main
import ("fmt"; "time")
func main() {
    go say("world")  // 启动 goroutine——不阻塞！
    say("hello")     // 主 goroutine
    time.Sleep(100 * time.Millisecond) // 等 goroutine 执行完
}
func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(50 * time.Millisecond)
        fmt.Println(s)
    }
}
// 输出: hello world hello world ...（交错输出）`
</script>
