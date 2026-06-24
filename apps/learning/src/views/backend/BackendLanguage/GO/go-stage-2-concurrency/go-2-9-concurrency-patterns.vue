<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Go 并发模式</h1><p class="text-sm text-slate-500 mt-1">扇入/扇出 · 流水线 · Worker Pool——生产级并发设计模式</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-2-9-concurrency-patterns.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-9</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🏭</span>四种核心并发模式</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Fan-out ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">Promise.all(urls.map(fetch))</code> · Fan-in ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">Promise.race()</code> · Pipeline ≈ <strong>RxJS pipe</strong>（数据流经多个操作符） · Worker Pool ≈ <strong>Thread Pool</strong>（固定数量 worker 处理任务队列）。</p></aside>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700">模式</th><th class="px-4 py-2 border font-semibold text-slate-700">结构</th><th class="px-4 py-2 border font-semibold text-slate-700">适用场景</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-semibold">Fan-out</td><td class="px-4 py-2 border">1 个输入 → 多个 goroutine 并行处理</td><td class="px-4 py-2 border">并行 HTTP 请求、批量文件处理</td></tr><tr><td class="px-4 py-2 border font-semibold">Fan-in</td><td class="px-4 py-2 border">多个 goroutine → 1 个 channel 汇聚</td><td class="px-4 py-2 border">多数据源合并、搜索结果聚合</td></tr><tr><td class="px-4 py-2 border font-semibold">Pipeline</td><td class="px-4 py-2 border">数据流经多个 stage，每个 stage 并发</td><td class="px-4 py-2 border">ETL 数据处理、图像处理管线</td></tr><tr><td class="px-4 py-2 border font-semibold">Worker Pool</td><td class="px-4 py-2 border">固定 N 个 worker 从 channel 取任务</td><td class="px-4 py-2 border">限制并发数、资源池</td></tr></tbody></table></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Fan-out / Fan-in——扇出扇入</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>Fan-out：</strong>启动多个 goroutine 给它们<strong>同一个 channel</strong>，它们竞争读取。<strong>Fan-in：</strong>多个 goroutine 把结果发到<strong>同一个 channel</strong>，用 sync.WaitGroup 等所有完成。</p>
        <div class="mb-4"><Code language="go" :code="fanCode" title="fan_out_in.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>Pipeline——流水线模式</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">数据通过一系列 stage——每个 stage 是一个 goroutine，从上游 channel 读，处理后发到下游 channel。≈ <strong>JS 的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">array.map().filter().reduce()</code> 并发版</strong>。</p>
        <div class="mb-4"><Code language="go" :code="pipeCode" title="pipeline.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>Worker Pool——工作池</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">固定数量的 goroutine 从任务 channel 取任务执行。<strong>限制并发数</strong>，防止 goroutine 爆炸。</p>
        <div class="mb-4"><Code language="go" :code="workerCode" title="worker_pool.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ Worker Pool 比无限 goroutine 好在哪：</strong>控制并发数（防止打爆下游服务）、goroutine 复用（减少栈分配开销）、背压控制（任务队列满了阻塞生产者）。≈ <strong>数据库连接池</strong> 的设计思想。</p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>Generator——生成器模式</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">函数返回一个 channel，goroutine 在后台生成数据发送到 channel。≈ <strong>JS Generator / Python yield</strong> 的并发版。</p>
        <div class="mb-4"><Code language="go" :code="genCode" title="generator.go" /></div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>选型指南</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>并行 I/O → Fan-out + Fan-in：</strong>并发请求多个 API，汇总结果</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>数据流处理 → Pipeline：</strong>生成→过滤→转换→聚合，每步并发</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>限制并发数 → Worker Pool：</strong>爬虫/API调用，控制并发量</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>惰性生成 → Generator：</strong>斐波那契、随机数流</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-8-context" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Context</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-10-race-detection" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：竞态检测 →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"四种模式总览"},{id:"sec-2",name:"Fan-out/in"},{id:"sec-3",name:"Pipeline"},{id:"sec-4",name:"Worker Pool"},{id:"sec-5",name:"Generator"},{id:"sec-6",name:"选型指南"}]
const fanCode = `// Fan-out: 多个 worker 从同一个 channel 取任务
func fanOut(tasks <-chan int, workers int) <-chan int {
    results := make(chan int)
    var wg sync.WaitGroup
    for i := 0; i < workers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for t := range tasks { results <- t * 2 }
        }()
    }
    go func() { wg.Wait(); close(results) }()
    return results
}`
const pipeCode = `// Pipeline: gen → square → print
func gen(nums ...int) <-chan int {
    out := make(chan int)
    go func() { for _, n := range nums { out <- n }; close(out) }()
    return out
}
func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() { for n := range in { out <- n * n }; close(out) }()
    return out
}
// 串联: gen(2,3,4) → square → 打印 4,9,16`
const workerCode = `func workerPool(tasks []string, workerCount int) {
    jobs := make(chan string, len(tasks))
    var wg sync.WaitGroup
    for w := 0; w < workerCount; w++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for job := range jobs { process(job) }
        }()
    }
    for _, t := range tasks { jobs <- t }
    close(jobs); wg.Wait()
}`
const genCode = `// Generator: 返回 channel，后台生成
func fibonacci() <-chan int {
    ch := make(chan int)
    go func() {
        a, b := 0, 1
        for { ch <- a; a, b = b, a+b }
    }()
    return ch
}
// fib := fibonacci()
// fmt.Println(<-fib, <-fib, <-fib) // 0, 1, 1`
</script>
