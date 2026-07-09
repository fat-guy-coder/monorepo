<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🏗️ Go 并发模式</h1><p class="text-sm text-slate-500 mt-1">Pipeline · Fan-out/in · Worker Pool · Generator — 生产级并发设计</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-9-concurrency-patterns.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-9</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Pipeline（流水线）— channel 串联处理</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">通过 channel 把多个处理阶段串联起来——上游输出是下游输入。每个阶段是独立的 goroutine。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Pipeline ≈ <strong>RxJS pipe</strong>（<code class="bg-purple-100 px-1 rounded text-xs font-mono">Observable.pipe(map(), filter())</code>）≈ <strong>Node.js Stream.pipe()</strong>。每个阶段通过 channel 连接。</p></aside>
        <div class="mb-4"><Code language="go" :code="pipelineCode" title="pipeline.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>Fan-out / Fan-in — 并发的分发与收集</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>Fan-out：</strong>一个 channel 分发给多个 worker 并行处理。<strong>Fan-in：</strong>多个 channel 合并到一个输出 channel。组合使用实现<strong>并行流水线</strong>。</p>
        <div class="mb-4"><Code language="go" :code="fanCode" title="fan_out_in.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>Worker Pool — 控制并发数</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">固定数量的 worker goroutine 从同一个 jobs channel 取任务。控制并发数、避免资源耗尽。</p>
        <div class="mb-4"><Code language="go" :code="workerPoolCode" title="worker_pool.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>Generator — 惰性生成序列</h2>
        <div class="mb-4"><Code language="go" :code="generatorCode" title="generator.go" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Pipeline</strong> = channel 串联多阶段处理 ≈ RxJS pipe / Stream.pipe</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Fan-out/in</strong> = 分发到多个 worker + 收集结果</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Worker Pool</strong> = 固定 worker 数，jobs channel 分发任务</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Generator</strong> = 返回 channel 的函数，惰性生成序列</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-8-context" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Context</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-10-race-detection" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：竞态检测 →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"Pipeline"},{id:"sec-2",name:"Fan-out/in"},{id:"sec-3",name:"Worker Pool"},{id:"sec-4",name:"Generator"},{id:"sec-5",name:"小结"}]
const pipelineCode = `// Pipeline: gen → sq → print，每个阶段通过 channel 连接
gen := func(nums ...int) <-chan int {
    out := make(chan int)
    go func() { for _, n := range nums { out <- n }; close(out) }()
    return out
}
sq := func(in <-chan int) <-chan int {
    out := make(chan int)
    go func() { for n := range in { out <- n * n }; close(out) }()
    return out
}
// 组合：gen(2,3,4) → sq → 输出 4,9,16
for v := range sq(gen(2, 3, 4)) {
    fmt.Println(v)  // 输出: 4, 9, 16
}`
const fanCode = `// Fan-in: 合并多个 channel
func merge(cs ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)
    for _, c := range cs {
        wg.Add(1)
        go func(c <-chan int) {
            for n := range c { out <- n }
            wg.Done()
        }(c)
    }
    go func() { wg.Wait(); close(out) }()
    return out
}
// 使用：多个 sq worker 并行处理，结果合并
in := gen(2, 3, 4, 5, 6, 7, 8)
c1 := sq(in); c2 := sq(in)  // Fan-out: 两个 sq 并行
for n := range merge(c1, c2) { fmt.Println(n) }  // Fan-in: 合并结果`
const workerPoolCode = `// 固定 3 个 worker，缓冲 channel 控制队列长度
const numWorkers = 3
jobs := make(chan int, 100)  // 缓冲 channel 作为任务队列
var wg sync.WaitGroup

// 启动 worker pool
for w := 1; w <= numWorkers; w++ {
    wg.Add(1)
    go func(id int) {
        defer wg.Done()
        for job := range jobs {  // channel 关闭后自动退出
            fmt.Printf("worker %d processing job %d\\n", id, job)
        }
    }(w)
}
// 分发任务
for j := 1; j <= 10; j++ { jobs <- j }
close(jobs)  // 关闭后 worker 处理完剩余任务退出
wg.Wait()
// 输出: worker 1..3 瓜分 10 个 job（顺序随机）`
const generatorCode = `// Generator: 惰性生成无限序列
fib := func() <-chan int {
    ch := make(chan int)
    go func() {
        a, b := 0, 1
        for { ch <- a; a, b = b, a+b }  // 无限生成，但只在有人读时才计算
    }()
    return ch
}
f := fib()
for i := 0; i < 6; i++ { fmt.Print(<-f, " ") }
// 输出: 0 1 1 2 3 5`
</script>
