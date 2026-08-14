<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🏗️ Go 并发模式</h1><p class="text-sm text-slate-500 mt-1">Pipeline · Fan-out/in · Worker Pool · Or-Done · Generator — 拿 channel 搭积木的五种范式</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-9-concurrency-patterns.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-9</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-0" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📌</span>五种模式速览——哪个解决什么问题？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">这些模式不是"学来炫技的"——<strong>每个都对应一个真实的生产场景</strong>。理解了"为什么需要它"，自然就知道怎么用了。</p>
        <div class="overflow-x-auto mb-3"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">模式</th><th class="px-4 py-2 border font-semibold">解决什么问题</th><th class="px-4 py-2 border font-semibold">一句话</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">Pipeline</td><td class="px-4 py-2 border">一个数据需要<strong>多步处理</strong>，每步慢且独立</td><td class="px-4 py-2 border">"流水线——上一步的输出是下一步的输入"</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">Fan-out/in</td><td class="px-4 py-2 border">同一个处理逻辑要<strong>并行跑</strong>很多份</td><td class="px-4 py-2 border">"一个进，多个并行干，结果合一起"</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">Worker Pool</td><td class="px-4 py-2 border"><strong>控制并发数</strong>——别把下游打爆了</td><td class="px-4 py-2 border">"只有 N 个工人，任务排队"</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">Or-Done</td><td class="px-4 py-2 border">消费者<strong>随时可能不想要了</strong>，生产者别泄漏</td><td class="px-4 py-2 border">"不想要了就说，大家都安全退出"</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">Generator</td><td class="px-4 py-2 border">数据量大/无限，<strong>按需生成</strong>不占内存</td><td class="px-4 py-2 border">"要一个才给你算一个"</td></tr></tbody></table></div>
      </section>

      <!-- 📐 结构总览：Pipeline 数据流 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：Pipeline 流水线数据流
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Pipeline 是最核心的模式——<strong>每个阶段是一个独立 goroutine</strong>，通过 channel 串联。数据从上游流向下游，
          各阶段<strong>并发执行</strong>（gen 在生成第 3 个数时，sq 可能在处理第 2 个）。
        </p>
        <figure class="mb-4">
          <svg viewBox="0 0 720 180" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="pl-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- gen 阶段 -->
            <rect x="30" y="50" width="150" height="70" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2" />
            <text x="105" y="76" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0369a1">gen</text>
            <text x="105" y="98" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">生成 2,3,4</text>

            <!-- channel 1 -->
            <line x1="180" y1="85" x2="250" y2="85" stroke="#94a3b8" stroke-width="2" marker-end="url(#pl-arr)" />
            <text x="215" y="72" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">ch</text>

            <!-- sq 阶段 -->
            <rect x="255" y="50" width="150" height="70" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
            <text x="330" y="76" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#b45309">sq</text>
            <text x="330" y="98" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b45309">求平方 n²</text>

            <!-- channel 2 -->
            <line x1="405" y1="85" x2="475" y2="85" stroke="#94a3b8" stroke-width="2" marker-end="url(#pl-arr)" />
            <text x="440" y="72" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">ch</text>

            <!-- print 阶段 -->
            <rect x="480" y="50" width="150" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" />
            <text x="555" y="76" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#15803d">print</text>
            <text x="555" y="98" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#15803d">输出结果</text>

            <!-- 数据流动示例 -->
            <text x="30" y="150" font-size="12" font-family="monospace" fill="#0891b2">数据流：2,3,4 → gen → ch → sq → ch → 4,9,16 → print</text>
            <text x="30" y="168" font-size="11" font-family="monospace" fill="#64748b">各阶段并发：gen 生成 3 时，sq 可能正在算 2² —— 不是串行等待</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Pipeline 三段流水线——gen（生成）→ sq（平方）→ print（输出），通过 channel 串联，各阶段并发执行</figcaption>
        </figure>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Pipeline — 流水线多步处理</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">每个阶段是一个 goroutine，通过 channel 串联——上阶段的输出 channel 是下阶段的输入。关键是<strong>每步都是并发的</strong>：gen 在生成第 3 个数时，sq 可能在处理第 2 个。≈ RxJS pipe / Unix <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">|</code> 管道。</p>
        <div class="mb-4"><Code language="go" :code="pipelineCode" title="pipeline.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>Fan-out / Fan-in — 并行分发 + 合并结果</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>Fan-out：</strong>多个 goroutine 从同一个 channel 读——任务自动瓜分（channel 的 FIFO 保证公平）。<strong>Fan-in：</strong>多个 channel 合并到一个输出 channel——用 merge 函数。</p>
        <div class="mb-4"><Code language="go" :code="fanCode" title="fan_out_in.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>Worker Pool — 控制并发数</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">你有 1000 个 URL 要爬，但不想同时爬太多把对方 IP 封了。Worker Pool 用固定数量的 goroutine 从同一个 jobs channel 取任务——<strong>并发数 = worker 数</strong>。close(jobs) 后 worker 的 range 自动退出。</p>
        <div class="mb-4"><Code language="go" :code="workerPoolCode" title="worker_pool.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>Or-Done — "我不想要了，大家都停"</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">消费者读到第 3 个数据后发现不需要了——但如果直接 break，生产者还在阻塞着往 channel 里塞数据——泄漏。Or-Done 给了一个 done channel 作为<strong>退出信号</strong>，消费者 close(done) 后，orDone 内部 goroutine 退出→上游的 send 没人接收→上游也能检测到并退出。</p>
        <div class="mb-4"><Code language="go" :code="orDoneCode" title="or_done.go" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>Generator — 惰性生成无限序列</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">返回 channel 的函数就是 Generator。内部 goroutine 只在有人读时才计算下一个值（惰性求值）——无限序列也不会占满内存。</p>
        <div class="mb-4"><Code language="go" :code="generatorCode" title="generator.go" /></div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Pipeline</strong>=多步处理串联；<strong>Fan-out/in</strong>=并行+合并；<strong>Worker Pool</strong>=控并发数</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Or-Done</strong>=取消时安全退出防泄漏；<strong>Generator</strong>=惰性求值按需生成</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>这些模式组合使用——Pipeline 的某阶段可以 Fan-out，Worker Pool + Or-Done 更安全</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-8-context" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Context</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-10-race-detection" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：竞态检测 →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-0",name:"五种模式速览"},{id:"sec-overview",name:"📐 Pipeline 结构总览"},{id:"sec-1",name:"Pipeline"},{id:"sec-2",name:"Fan-out/in"},{id:"sec-3",name:"Worker Pool"},{id:"sec-4",name:"Or-Done"},{id:"sec-5",name:"Generator"},{id:"sec-6",name:"小结"}]
const pipelineCode = `// Pipeline: gen → sq → print，每个阶段并发执行
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
// 串联：gen(2,3,4) 的输出 → sq 的输入 → print
for v := range sq(gen(2, 3, 4)) {
    fmt.Println(v)  // 4, 9, 16
}
// 关键：gen 在生成 3 时，sq 可能正在处理 2——两阶段并发运行！`
const fanCode = `// Fan-in: 合并多个 channel
func merge(cs ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)
    for _, c := range cs {
        wg.Add(1)
        go func(c <-chan int) { for n := range c { out <- n }; wg.Done() }(c)
    }
    go func() { wg.Wait(); close(out) }()
    return out
}
// 使用：多个 sq worker 从同一个 in 读（Fan-out），结果合并（Fan-in）
in := gen(2,3,4,5,6,7,8)
c1, c2 := sq(in), sq(in)  // Fan-out: channel 多读——任务自动瓜分
for n := range merge(c1, c2) { fmt.Println(n) }  // Fan-in`
const workerPoolCode = `// 固定 3 个 worker——并发数严格 ≤ 3
const numWorkers = 3
jobs := make(chan int, 100)  // 缓冲队列，平滑突发流量
var wg sync.WaitGroup

for w := 1; w <= numWorkers; w++ {
    wg.Add(1)
    go func(id int) {
        defer wg.Done()
        for job := range jobs {  // close(jobs) → 循环自动退出
            fmt.Printf("worker %d: job %d\\n", id, job)
        }
    }(w)
}
for j := 1; j <= 10; j++ { jobs <- j }
close(jobs); wg.Wait()
// 输出: worker 1..3 瓜分 10 个 job（每次运行顺序不同）`
const orDoneCode = `// Or-Done: "不想等了，安全退出"
func orDone(done <-chan struct{}, in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for {
            select {
            case <-done: return                           // 退出
            case v, ok := <-in:
                if !ok { return }
                select {
                case out <- v:                            // 转发给消费者
                case <-done: return                       // 转发中收到退出
                }
            }
        }
    }()
    return out
}
// 使用：消费者读到 stopValue 后主动关闭 done
done := make(chan struct{})
for v := range orDone(done, dataSource()) {
    if v == stopValue { close(done); break }
    fmt.Println(v)
}
// close(done) → orDone goroutine 退出 → dataSource 不再被阻塞 → 不回泄漏`
const generatorCode = `// Generator: 惰性生成无限序列——"要一个才算一个"
fib := func() <-chan int {
    ch := make(chan int)
    go func() { a, b := 0, 1; for { ch <- a; a, b = b, a+b } }()
    return ch
}
f := fib()
fmt.Println(<-f)  // 0  ← 只计算了 1 个值
fmt.Println(<-f)  // 1  ← 又计算了 1 个值
// 只取需要的——不会一次性算完 100 万个存内存
// 真正"无限——但不占内存"`
</script>
