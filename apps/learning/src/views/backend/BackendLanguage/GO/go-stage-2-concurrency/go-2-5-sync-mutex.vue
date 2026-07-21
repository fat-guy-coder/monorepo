<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🔒 Mutex 互斥锁</h1><p class="text-sm text-slate-500 mt-1">sync.Mutex / RWMutex — 保护共享数据、防止竞态条件的核心原语</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-5-sync-mutex.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-5</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>竞态条件 — 为什么 Go 也需要锁？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">counter++</code> 看似一行代码，实际上是<strong>三步操作</strong>：读 counter → 加 1 → 写回。两个 goroutine 同时执行 → 两次加 1 可能只生效一次。这就是<strong>竞态条件（Race Condition）</strong>。Go 的 goroutine 是多核并行的——不只是"并发"——所以<strong>比 JS 更需要锁</strong>。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 JS 单线程不需要锁</strong>——Event Loop 保证同一时刻只执行一段代码。但 Go 的多个 goroutine 可能<strong>同时在不同 CPU 核心上运行</strong>，共享内存必须用锁或 channel 保护。</p></aside>
        <div class="mb-4"><Code language="go" :code="raceCode" title="race_condition.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>Mutex 基本用法 — Lock/Unlock</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sync.Mutex</code> 保证同一时刻只有一个 goroutine 进入<strong>临界区</strong>。标准模式：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">mu.Lock(); defer mu.Unlock()</code>。</p>
        <div class="mb-4"><Code language="go" :code="mutexCode" title="mutex_basic.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ Mutex 不可复制！</strong>Go 的 Mutex 内部有状态字段——复制后新旧两份各管各的，互斥完全失效。<code class="bg-amber-100 px-1 rounded text-xs font-mono">go vet</code> 会检测。传参必须用<strong>指针</strong>。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>RWMutex — 读写锁（读多写少的利器）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>读远多于写</strong>时，Mutex 是性能瓶颈——因为读也会互斥。RWMutex 允许多个 reader <strong>同时</strong>持有读锁（RLock），writer 独占写锁（Lock）。写锁被持有时，新的读者阻塞。</p>
        <div class="mb-4"><Code language="go" :code="rwCode" title="rwmutex.go" /></div>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold"></th><th class="px-4 py-2 border font-semibold">Mutex</th><th class="px-4 py-2 border font-semibold">RWMutex</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">读-读并发</td><td class="px-4 py-2 border">❌ 互斥</td><td class="px-4 py-2 border text-emerald-600">✅ 多读并发</td></tr><tr><td class="px-4 py-2 border">读-写关系</td><td class="px-4 py-2 border">互斥</td><td class="px-4 py-2 border">写阻塞所有读</td></tr><tr><td class="px-4 py-2 border">性能差距</td><td class="px-4 py-2 border">—</td><td class="px-4 py-2 border">读多写少时<strong>10-100x</strong> 吞吐</td></tr></tbody></table></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>死锁三场景 + 检测</h2>
        <div class="space-y-3 text-sm mb-4"><div class="bg-amber-50 rounded-xl p-3 border border-amber-200"><strong>1. Lock 两次（不可重入）：</strong>Go 的 Mutex 不可重入——同一个 goroutine Lock 两次 = <strong>死锁</strong>。需要重入锁时用 channel 或重构代码。</div><div class="bg-amber-50 rounded-xl p-3 border border-amber-200"><strong>2. 忘记 Unlock：</strong>Lock 后 if err != nil { return } 但没 Unlock → 其他 goroutine 永久阻塞。defer 解决。</div><div class="bg-amber-50 rounded-xl p-3 border border-amber-200"><strong>3. 锁顺序不一致：</strong>A: Lock(a)→Lock(b)；B: Lock(b)→Lock(a) → 死锁。统一获取顺序。</div></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ go run -race</strong> 检测竞态（~10x 开销，仅测试用）。<strong>CI 标配：</strong><code class="bg-emerald-100 px-1 rounded text-xs font-mono">go test -race ./...</code></p></aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Lock + defer Unlock</strong>——标准模式，defer 保证解锁</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>RWMutex</strong>——读多写少用 RLock/Unlock，写用 Lock/Unlock</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>不可重入</strong>——Lock 两次 = 死锁；<strong>不可复制</strong>——传参用指针</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>go test -race</strong> 检测竞态——CI 必须跑</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-4-timer-ticker" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Timer/Ticker</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-6-sync-wg-once" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：WaitGroup/Once →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"竞态条件"},{id:"sec-2",name:"Mutex 用法"},{id:"sec-3",name:"RWMutex"},{id:"sec-4",name:"死锁+检测"},{id:"sec-5",name:"小结"}]
const raceCode = `// ❌ 竞态条件：counter++ = 读→加→写，三步不原子
var counter int
for i := 0; i < 1000; i++ {
    go func() { counter++ }()     // counter 可能 < 1000！
}
time.Sleep(time.Second)
fmt.Println(counter)              // 输出: 982 (每次不同)

// ✅ Mutex 保护临界区
var mu sync.Mutex; counter = 0
for i := 0; i < 1000; i++ {
    go func() { mu.Lock(); counter++; mu.Unlock() }()
}
// counter == 1000 ✅`
const mutexCode = `type SafeCounter struct {
    mu sync.Mutex          // ⚠️ 不能复制！传参用指针
    v  map[string]int
}
func (c *SafeCounter) Inc(key string) {
    c.mu.Lock()
    defer c.mu.Unlock()    // defer 保证 panic 也解锁
    c.v[key]++             // 临界区——同一时刻只有一个 goroutine 在此
}
func (c *SafeCounter) Value(key string) int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.v[key]
}`
const rwCode = `type Cache struct {
    mu   sync.RWMutex
    data map[string]string
}
// 读——多 goroutine 可同时 RLock（不会互相阻塞！）
func (c *Cache) Get(key string) string {
    c.mu.RLock()            // 读锁——允许多个 reader
    defer c.mu.RUnlock()
    return c.data[key]
}
// 写——独占，阻塞所有读者和其他写者
func (c *Cache) Set(key, val string) {
    c.mu.Lock()             // 写锁——独占
    defer c.mu.Unlock()
    c.data[key] = val
}`
</script>
