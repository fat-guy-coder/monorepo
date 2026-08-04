<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🔍 竞态检测（Race Detector）</h1><p class="text-sm text-slate-500 mt-1">go run -race — 不用等到线上崩溃才发现并发 bug，编译时就能找到</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-10-race-detection.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-10</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Race Detector 是什么？怎么工作的？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">Go 的 Race Detector 是基于 Google 的 <strong>ThreadSanitizer (TSan)</strong>——编译时在每次内存访问前后<strong>自动插入检查代码</strong>，运行时追踪每个内存地址的"最后一次读/写"来自哪个 goroutine。如果两个 goroutine 同时访问同一块内存且<strong>至少一个是写</strong>→ 报 DATA RACE。</p>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">底层用 <strong>Shadow Memory（影子内存）+ Vector Clock（向量时钟）</strong>：每 8 字节应用内存对应一块 shadow memory，记录"上次谁写的、上次谁读的"。检测到冲突时，通过向量时钟追溯到两个冲突的 goroutine 的创建位置。</p>
        <div class="mb-4"><Code language="bash" :code="raceCmdCode" title="CLI 命令" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>三个典型竞态场景 + 检测输出</h2>
        <div class="space-y-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">场景①: counter++（最常见）</h4>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="badCode" title="❌ race.go" /></div><div><Code language="text" :code="raceOutputCode" title="📟 -race 输出" /></div></div>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">场景②: 并发写 map（fatal error！）</h4>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="mapRaceCode" title="map_race.go" /></div><div class="text-sm text-slate-600"><p class="mb-2">并发写 map 导致的 <strong>fatal error——不是 panic，无法 recover！</strong></p><Code language="text" :code="mapRaceOutput" title="fatal error 输出" /></div></div>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">场景③: 循环变量捕获（闭包陷阱）</h4>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="loopRaceCode" title="loop_race.go" /></div><div class="text-sm text-slate-600"><p class="mb-2">循环变量被多个 goroutine 同时读写——Go &lt; 1.22 的经典 bug。</p><Code language="go" :code="loopFixCode" title="修复" /></div></div>
          </div>
        </div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>修复方案速查</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">场景</th><th class="px-4 py-2 border font-semibold">修复方案</th><th class="px-4 py-2 border font-semibold">性能</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border">单个 int 计数</td><td class="px-4 py-2 border font-mono text-xs">atomic.AddInt64</td><td class="px-4 py-2 border">最快（CPU 指令级）</td></tr>
          <tr><td class="px-4 py-2 border">单个 bool 标志</td><td class="px-4 py-2 border font-mono text-xs">atomic.Bool</td><td class="px-4 py-2 border">最快</td></tr>
          <tr><td class="px-4 py-2 border">多变量/复杂结构</td><td class="px-4 py-2 border font-mono text-xs">sync.Mutex</td><td class="px-4 py-2 border">中等</td></tr>
          <tr><td class="px-4 py-2 border">读多写少</td><td class="px-4 py-2 border font-mono text-xs">sync.RWMutex</td><td class="px-4 py-2 border">读快、写中等</td></tr>
          <tr><td class="px-4 py-2 border">goroutine 间传数据</td><td class="px-4 py-2 border font-mono text-xs">Channel</td><td class="px-4 py-2 border">有锁开销但语义清晰</td></tr>
          <tr><td class="px-4 py-2 border">并发写 map</td><td class="px-4 py-2 border font-mono text-xs">sync.Mutex 或 sync.Map</td><td class="px-4 py-2 border">—</td></tr>
        </tbody></table></div>
        <div class="mb-4"><Code language="go" :code="fixCode" title="fix.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>生产级 CI 配置 + 重要限制</h2>
        <h3 class="text-md font-semibold text-slate-700 mb-2">GitHub Actions / CI 示例</h3>
        <div class="mb-4"><Code language="yaml" :code="ciCode" title="ci.yml" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-2 mt-4">重要限制——Race Detector 不能做什么</h3>
        <ul class="space-y-2 text-slate-600 text-sm mb-3"><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">⚠️</span><span><strong>只检测实际发生的竞态</strong>——如果两个 goroutine 在测试中恰好没有同时执行，检测不到。增加并发度、多次运行提高覆盖率。</span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">⚠️</span><span><strong>~10x 性能 + ~5-10x 内存开销</strong>——只用于开发/测试，<strong>生产绝不开</strong></span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">⚠️</span><span><strong>不能检测"逻辑竞态"</strong>——如两个 goroutine 修改不同的变量但应该保持某种不变量——这不是它管的事</span></li><li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✅</span><span><strong>CI 标配：</strong>每个 PR 都应该跑 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">go test -race ./...</code></span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-9-concurrency-patterns" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：并发模式</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-11-sync-pool" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：sync.Pool →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"Race Detector原理"},{id:"sec-2",name:"三个典型场景"},{id:"sec-3",name:"修复方案速查"},{id:"sec-4",name:"CI配置+限制"}]
const raceCmdCode = `# 运行竞态检测
go run -race main.go

# 测试（CI 标配！每个 PR 都该跑）
go test -race ./...

# 测试指定包，增加并发度提高检出率
go test -race -count=10 -cpu=4 ./pkg/...

# 编译带 race 的二进制（仅测试——生产绝不用！）
go build -race -o myapp_race ./cmd/server`
const badCode = `// ❌ 竞态条件：counter++ 读-改-写三步非原子
func main() {
    var counter int
    var wg sync.WaitGroup
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() { counter++; wg.Done() }()
    }
    wg.Wait()
    fmt.Println(counter)  // 可能 < 100
}`
const raceOutputCode = `$ go run -race main.go
==================
WARNING: DATA RACE
Read at 0x00c000124018 by goroutine 8:
  main.main.func1() at main.go:15

Previous write at 0x00c000124018 by goroutine 7:
  main.main.func1() at main.go:15

Goroutine 8 (running) created at:
  main.main() at main.go:14
==================
100
Found 1 data race(s)`
const mapRaceCode = `// ❌ 并发写 map——fatal error, 不可 recover!
func main() {
    m := make(map[int]int)
    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1)
        go func(n int) { m[n] = n; wg.Done() }(i)
    }
    wg.Wait()
}`
const mapRaceOutput = `fatal error: concurrent map writes

goroutine 6 [running]:
  main.main.func1() at main.go:9
  main.main.func1() at main.go:9

// ⚠️ 这不是 panic——不能 recover！程序直接崩溃`
const loopRaceCode = `// ❌ Go < 1.22: 循环变量被多个 goroutine 共享
var urls = []string{"a", "b", "c"}
for _, url := range urls {
    go func() {
        resp, _ := http.Get(url)  // url 的值在不断变化！
        // 三个 goroutine 可能都读到 "c"
    }()
}`
const loopFixCode = `// ✅ 修复: 传参或局部副本
for _, url := range urls {
    url := url  // Go < 1.22 必须加这行
    go func() { http.Get(url) }()
}
// 或
for _, url := range urls {
    go func(u string) { http.Get(u) }(url)  // 传参`
const fixCode = `// ✅ 修复一：atomic（最快——适合单个变量）
var counter int64
atomic.AddInt64(&counter, 1)

// ✅ 修复二：Mutex（适合多变量/复杂结构）
var mu sync.Mutex
mu.Lock(); counter++; mu.Unlock()

// ✅ 修复三：Channel（"通过通信共享数据"）
ch := make(chan int, 1)
go func() { ch <- result }()
result := <-ch`
const ciCode = `# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with: { go-version: '1.22' }
      - run: go test -race -count=3 ./...  # count=3 多次运行提高检出率`
</script>
