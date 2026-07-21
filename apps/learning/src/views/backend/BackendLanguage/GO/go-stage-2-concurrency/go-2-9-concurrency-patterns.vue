<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🏗️ Go 并发模式</h1><p class="text-sm text-slate-500 mt-1">Pipeline · Fan-out/in · Worker Pool · Or-Done · Generator — channel 组合的六种范式</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-9-concurrency-patterns.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-9</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Pipeline — channel 串联多阶段处理</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">通过 channel 把多个处理阶段串联。每个阶段是独立 goroutine，上游输出是下游输入。≈ RxJS pipe / Stream.pipe。</p>
        <div class="mb-4"><Code language="go" :code="pipelineCode" title="pipeline.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>Fan-out / Fan-in — 并行分发 + 合并结果</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>Fan-out：</strong>一个 channel 分给多个 worker 并行。<strong>Fan-in：</strong>多 channel 合并到一个输出。</p>
        <div class="mb-4"><Code language="go" :code="fanCode" title="fan_out_in.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>Worker Pool — 固定并发数的任务队列</h2>
        <div class="mb-4"><Code language="go" :code="workerPoolCode" title="worker_pool.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>Or-Done — 优雅取消 channel 消费</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">当外部不再需要 channel 的数据时，消费者需要安全退出——否则生产者 goroutine 会<strong>永远阻塞在 send 上</strong>（泄漏）。Or-Done 模式给消费者一个退出路径。</p>
        <div class="mb-4"><Code language="go" :code="orDoneCode" title="or_done.go" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>Generator — 惰性生成无限序列</h2>
        <div class="mb-4"><Code language="go" :code="generatorCode" title="generator.go" /></div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Pipeline</strong> = channel 串联阶段；<strong>Fan-out/in</strong> = 并行+合并</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Worker Pool</strong> = 固定 worker，jobs chan；<strong>Or-Done</strong> = 取消时安全退出防泄漏</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Generator</strong> = 返回 channel 的函数——惰性求值，按需生成</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-8-context" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Context</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-10-race-detection" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：竞态检测 →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"Pipeline"},{id:"sec-2",name:"Fan-out/in"},{id:"sec-3",name:"Worker Pool"},{id:"sec-4",name:"Or-Done"},{id:"sec-5",name:"Generator"},{id:"sec-6",name:"小结"}]
const pipelineCode = `// Pipeline: gen → sq → print
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
for v := range sq(gen(2, 3, 4)) { fmt.Println(v) }  // 4, 9, 16`
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
// Fan-out + Fan-in: 多个 sq 并行
in := gen(2,3,4,5,6,7,8)
c1, c2 := sq(in), sq(in)  // Fan-out: 两个 sq 并行处理
for n := range merge(c1, c2) { fmt.Println(n) }  // Fan-in`
const workerPoolCode = `const numWorkers = 3
jobs := make(chan int, 100)
var wg sync.WaitGroup

for w := 1; w <= numWorkers; w++ {
    wg.Add(1)
    go func(id int) {
        defer wg.Done()
        for job := range jobs {  // close(jobs) 后自动退出
            fmt.Printf("worker %d: job %d\\n", id, job)
        }
    }(w)
}
for j := 1; j <= 10; j++ { jobs <- j }
close(jobs); wg.Wait()  // worker 1..3 瓜分 10 个 job`
const orDoneCode = `// Or-Done: 消费者想退出时通知生产者
func orDone(done <-chan struct{}, in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for {
            select {
            case <-done: return                           // 退出信号
            case v, ok := <-in:
                if !ok { return }                         // 上游关闭
                select {
                case out <- v:                            // 成功发送
                case <-done: return                       // 发送过程中收到退出
                }
            }
        }
    }()
    return out
}
// 使用：
done := make(chan struct{})
for v := range orDone(done, dataSource()) {
    if v == stopValue { close(done); break }
}
// close(done) → orDone 的 goroutine 退出 → dataSource 的 goroutine 不会被泄漏`
const generatorCode = `// Generator: 惰性生成无限序列
fib := func() <-chan int {
    ch := make(chan int)
    go func() { a, b := 0, 1; for { ch <- a; a, b = b, a+b } }()
    return ch
}
f := fib()
for i := 0; i < 6; i++ { fmt.Print(<-f, " ") }  // 0 1 1 2 3 5`
</script>
