<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🔍 竞态检测（Race Detector）</h1><p class="text-sm text-slate-500 mt-1">go run -race — 不用等到线上崩溃才发现并发 bug，编译时就能找到</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-10-race-detection.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-10</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-guide" class="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
        <h2 class="text-lg font-semibold text-indigo-900 mb-3 flex items-center gap-2"><span class="w-8 h-8 bg-indigo-200 text-indigo-800 rounded-lg flex items-center justify-center text-sm">🧭</span>本章怎么学（先看这里）</h2>
        <p class="text-sm text-indigo-900 leading-relaxed mb-3">竞态检测不难，但要分清<strong>两层</strong>：第一层是<strong>看得懂竞态报告</strong>（-race 报错长什么样、谁和谁抢了哪块内存）——排查线上 bug 的第一步；第二层是<strong>会修</strong>（锁、原子操作、通道）。第一层必须会，第二层能写就行。</p>
        <div class="overflow-x-auto">
          <table class="w-full text-sm border-collapse bg-white rounded-xl overflow-hidden">
            <thead><tr class="bg-indigo-100 text-left"><th class="px-3 py-2 border font-semibold">内容</th><th class="px-3 py-2 border font-semibold">难度</th><th class="px-3 py-2 border font-semibold">怎么学</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-3 py-2 border">为什么会有竞态（读-改-写）</td><td class="px-3 py-2 border">⭐</td><td class="px-3 py-2 border">先看结构图，5 分钟懂本质</td></tr>
              <tr><td class="px-3 py-2 border">看懂 -race 报告</td><td class="px-3 py-2 border">⭐⭐</td><td class="px-3 py-2 border">必学，排查实际问题的第一步</td></tr>
              <tr><td class="px-3 py-2 border">三个典型场景</td><td class="px-3 py-2 border">⭐⭐</td><td class="px-3 py-2 border">counter++ / map / 循环变量，工作都会遇到</td></tr>
              <tr><td class="px-3 py-2 border">修复方案 + CI 配置</td><td class="px-3 py-2 border">⭐</td><td class="px-3 py-2 border">会用速查表里那 4 种锁就够</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-sm text-indigo-900 leading-relaxed mt-3"><strong>✅ 达标线：</strong>给你一段并发代码，你能判断"这里会不会竞态、用 -race 怎么验证、该用哪种锁修"。</p>
      </section>

      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：数据竞态长什么样
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>生活类比：两个收银员共用同一本账本。</strong>收银员 A 看了一眼余额（读到 0），收银员 B 也看了一眼（读到 0），A 先写下 1，B 后写下 1——<strong>两个人都 +1，账上却只有 1</strong>。
          代码里 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">counter++</code> 就是这么丢数据的：它不是一步，而是"<strong>读 → 改 → 写</strong>"三步，两个 goroutine 交错执行会让写互相覆盖。
        </p>
        <figure class="mb-4">
          <svg viewBox="0 0 720 275" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="rd-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="20" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">数据竞态：两个 goroutine 同时访问同一块内存（至少一个是写）</text>

            <!-- goroutine 1 -->
            <rect x="50" y="44" width="130" height="70" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2" />
            <text x="115" y="70" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0369a1">goroutine 1</text>
            <text x="115" y="92" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">counter++</text>
            <line x1="180" y1="79" x2="260" y2="79" stroke="#94a3b8" stroke-width="2" marker-end="url(#rd-arr)" />
            <text x="220" y="66" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">读+写</text>

            <!-- 共享内存 -->
            <rect x="265" y="44" width="170" height="70" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="2" />
            <text x="350" y="70" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#b91c1c">counter</text>
            <text x="350" y="92" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b91c1c">共享内存 0x00c0...</text>

            <!-- goroutine 2 -->
            <line x1="445" y1="79" x2="545" y2="79" stroke="#94a3b8" stroke-width="2" marker-end="url(#rd-arr)" />
            <text x="495" y="66" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">读+写</text>
            <rect x="550" y="44" width="130" height="70" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2" />
            <text x="615" y="70" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0369a1">goroutine 2</text>
            <text x="615" y="92" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">counter++</text>

            <!-- 时间线：读-改-写 交错 -->
            <text x="20" y="140" font-size="12" font-family="monospace" fill="#0891b2">counter++ 的"读-改-写"三步被交错执行 → 丢失更新</text>
            <text x="20" y="156" font-size="10" font-family="monospace" fill="#64748b">⏱ 时间推进 →</text>

            <rect x="20" y="168" width="150" height="62" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" />
            <text x="95" y="192" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#15803d">G1：读 counter</text>
            <text x="95" y="214" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#15803d">读到 0</text>

            <rect x="182" y="168" width="150" height="62" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" />
            <text x="257" y="192" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#15803d">G2：读 counter</text>
            <text x="257" y="214" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#15803d">读到 0</text>

            <rect x="344" y="168" width="150" height="62" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2" />
            <text x="419" y="192" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0369a1">G1：写 counter</text>
            <text x="419" y="214" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">写成 1</text>

            <rect x="506" y="168" width="150" height="62" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="2" />
            <text x="581" y="192" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b91c1c">G2：写 counter</text>
            <text x="581" y="214" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b91c1c">写成 1（覆盖!）</text>

            <text x="174" y="200" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">→</text>
            <text x="336" y="200" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">→</text>
            <text x="498" y="200" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">→</text>

            <text x="20" y="252" font-size="12" font-family="monospace" fill="#ef4444">最终 counter = 1，应该 = 2 —— G2 的写把 G1 的 +1 覆盖了（丢失一次更新）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">竞态的本质：同一块内存被多个 goroutine 并发访问且至少一个在写、且没有同步；counter++ 的"读-改-写"三步交错就会丢更新</figcaption>
        </figure>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Race Detector 是什么？怎么工作的？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">Go 的 Race Detector 是基于 Google 的 <strong>ThreadSanitizer (TSan)</strong>——编译时在每次内存访问前后<strong>自动插入检查代码</strong>，运行时追踪每个内存地址的"最后一次读/写"来自哪个 goroutine。如果两个 goroutine 同时访问同一块内存且<strong>至少一个是写</strong>→ 报 DATA RACE。</p>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">底层用 <strong>Shadow Memory（影子内存）+ Vector Clock（向量时钟）</strong>：每 8 字节应用内存对应一块 shadow memory，记录"上次谁写的、上次谁读的"。检测到冲突时，通过向量时钟追溯到两个冲突的 goroutine 的创建位置。</p>

        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">竞态 = 两个 goroutine 同时碰同一块内存 + 至少一个在写 + 没有锁/通道同步</p>
          <p class="text-xs text-cyan-600 text-center">三个条件缺一不可，就是数据竞态 —— 和语言无关，是并发编程的通用问题</p>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-900 mb-2"><strong>🤔 新手必看：为什么 counter++ 不是一步？</strong></p>
          <p class="text-sm text-amber-800 leading-relaxed"><code class="bg-amber-100 px-1 rounded text-xs font-mono">counter++</code> 在 CPU 眼里是三步：<strong>① 读</strong> counter 当前值 → <strong>② 改</strong>（+1）→ <strong>③ 写</strong>回内存。<br/>
          两个 goroutine 同时执行时，可能 A 读完还没写、B 也读了旧值 → 两个人都把自己的结果写回去 → 只 +1 了一次。<br/>
          <strong>锁的作用就是让"读-改-写"这三步变成不可分割的一整块</strong>——B 必须等 A 写完才能读。</p>
          <p class="text-sm text-amber-800 leading-relaxed mt-2"><strong>竞态 (race condition) vs 数据竞态 (data race)：</strong>前者泛指"结果依赖执行顺序"；后者特指<strong>同时访问同一内存</strong>这种情况。Race Detector 只抓后者，这是它的边界。</p>
        </aside>

        <div class="mb-4"><Code language="bash" :code="raceCmdCode" title="CLI 命令" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>三个典型竞态场景 + 检测输出</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">下面三个场景是工作里最常见的竞态，每个都配了 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">-race</code> 的原始输出——<strong>先猜猜哪里会错，再对照输出验证</strong>，以后看到报错就能秒懂。</p>
        <div class="space-y-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">场景①: counter++（最常见）</h4>
            <p class="text-xs text-slate-500 mb-2">为什么错：counter++ 是"读-改-写"三步，100 个 goroutine 并发执行互相覆盖 → 结果小于 100</p>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="badCode" title="❌ race.go" /></div><div><Code language="text" :code="raceOutputCode" title="📟 -race 输出" /></div></div>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">场景②: 并发写 map（fatal error！）</h4>
            <p class="text-xs text-slate-500 mb-2">为什么错：Go 的 map 并发写"不设防"——直接 fatal error，而且不是 panic，recover 救不了</p>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-3"><div><Code language="go" :code="mapRaceCode" title="map_race.go" /></div><div class="text-sm text-slate-600"><p class="mb-2">并发写 map 导致的 <strong>fatal error——不是 panic，无法 recover！</strong></p><Code language="text" :code="mapRaceOutput" title="fatal error 输出" /></div></div>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">场景③: 循环变量捕获（闭包陷阱）</h4>
            <p class="text-xs text-slate-500 mb-2">为什么错：Go 1.22 之前循环变量只分配一次地址，三个 goroutine 读的是同一个 url</p>
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
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 决策口诀：</strong>单个变量 → atomic（最快）；一组操作要"整体原子" → Mutex；读多写少 → RWMutex；goroutine 间"传递数据" → Channel；并发写 map → 加锁或 sync.Map。</p>
        </aside>
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
const navList = [{id:"sec-guide",name:"🧭 本章怎么学"},{id:"sec-overview",name:"📐 竞态长什么样"},{id:"sec-1",name:"Race Detector原理"},{id:"sec-2",name:"三个典型场景"},{id:"sec-3",name:"修复方案速查"},{id:"sec-4",name:"CI配置+限制"}]
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
WARNING: DATA RACE                          ← 竞态报告头
Read at 0x00c000124018 by goroutine 8:      ← 冲突方 1：goroutine 8 在读这个地址
  main.main.func1() at main.go:15           ←   它正在执行 main.go:15 的 counter++（读那一步）

Previous write at 0x00c000124018 by goroutine 7:  ← 冲突方 2：goroutine 7 之前写过
  main.main.func1() at main.go:15                  ←   同一行、同一个变量 counter

Goroutine 8 (running) created at:           ← 顺着 created at 找源头
  main.main() at main.go:14                 ←   goroutine 8 是在 main.go:14 用 go 启动的
==================
100                                        ← 程序照常跑完，打印 counter
Found 1 data race(s)                       ← 结论：发现 1 处数据竞态`
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
