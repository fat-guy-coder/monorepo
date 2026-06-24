<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">Mutex 互斥锁</h1><p class="text-sm text-slate-500 mt-1">sync.Mutex / RWMutex——保护共享资源的核心原语</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-2-5-sync-mutex.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-5</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🔒</span>竞态条件——为什么需要锁</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Mutex ≈ <strong>JS 的互斥访问</strong>——两个函数同时修改一个变量导致结果不可预测。JS 单线程不需要锁（Event Loop 保证原子性），但 Go 多 goroutine 同时运行，<strong>必须用锁保护共享数据</strong>。</p></aside>
        <p class="text-slate-600 mb-3 leading-relaxed">当多个 goroutine <strong>同时读写同一个变量</strong>时，结果不可预测——这就是<strong>竞态条件（Race Condition）</strong>。Go 的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">sync.Mutex</code> 提供<strong>互斥访问</strong>：同一时刻只有一个 goroutine 能进入临界区。</p>
        <div class="mb-4"><Code language="go" :code="raceCode" title="race_condition.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Mutex 基本用法</h2>
        <div class="mb-4"><Code language="go" :code="mutexCode" title="mutex_basic.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">为什么 defer Unlock？</h3>
        <p class="text-slate-600 text-sm mb-3">如果临界区中发生 panic，没有 defer 的 Unlock 永远不会执行 → <strong>死锁</strong>。defer 保证 Unlock 一定会执行。</p>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ Mutex 不可复制！</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">go vet</code> 会检查。传参用<strong>指针</strong>。如果结构体包含 Mutex，该结构体也必须用指针传递。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>RWMutex——读写锁</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>读多写少</strong>的场景用 RWMutex——多个 goroutine 可以<strong>同时读</strong>（RLock），但写时<strong>独占</strong>（Lock）。比 Mutex 性能高得多。</p>
        <div class="mb-4"><Code language="go" :code="rwCode" title="rwmutex.go" /></div>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700"></th><th class="px-4 py-2 border font-semibold text-slate-700">Mutex</th><th class="px-4 py-2 border font-semibold text-slate-700">RWMutex</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">读并发</td><td class="px-4 py-2 border">❌ 互斥——读也互斥</td><td class="px-4 py-2 border text-emerald-600">✅ 多读者并发</td></tr><tr><td class="px-4 py-2 border">写互斥</td><td class="px-4 py-2 border">✅</td><td class="px-4 py-2 border">✅——写时阻塞所有读者</td></tr><tr><td class="px-4 py-2 border">适用</td><td class="px-4 py-2 border">读写均衡</td><td class="px-4 py-2 border"><strong>读 >> 写</strong>（如配置、缓存）</td></tr></tbody></table></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>常见死锁场景</h2>
        <div class="space-y-3 text-slate-600 text-sm"><div class="bg-slate-50 rounded-lg p-3"><strong>1. Lock 两次（不可重入）：</strong>Go 的 Mutex <strong>不可重入</strong>——同一个 goroutine Lock 两次 → 死锁。需要重入锁用 <code class="bg-slate-200 text-cyan-700 px-1 rounded text-xs font-mono">sync.RecursiveMutex</code>（第三方库）或用 channel 代替。</div><div class="bg-slate-50 rounded-lg p-3"><strong>2. 忘记 Unlock：</strong>用 defer 解决。如果不用 defer，每个 return 分支都要 Unlock。</div><div class="bg-slate-50 rounded-lg p-3"><strong>3. 锁顺序不一致：</strong>A 持有锁1 等锁2，B 持有锁2 等锁1 → 死锁。解决方案：统一锁的获取顺序。</div></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>竞态检测——go run -race</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Go 内置<strong>竞态检测器</strong>——编译时插入额外检查代码，运行时检测到竞态访问立即报告。</p>
        <div class="mb-4"><Code language="bash" :code="raceDetectCode" title="race_detect.sh" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 所有并发代码都要过 -race！</strong>race 检测器有 ~10x 性能开销，<strong>只在测试环境用</strong>。CI 中 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">go test -race ./...</code> 应该成为标配。</p></aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">mu.Lock(); defer mu.Unlock()</code>——标准模式</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>RWMutex 读多写少</strong>——RLock 允许多读者，Lock 独占写</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Go 的 Mutex <strong>不可重入</strong>——Lock 两次 = 死锁</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>go run -race</strong>——所有并发代码的必检项。CI 标配</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-4-timer-ticker" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Timer/Ticker</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-6-sync-wg-once" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：WaitGroup/Once →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"竞态条件"},{id:"sec-2",name:"Mutex用法"},{id:"sec-3",name:"RWMutex"},{id:"sec-4",name:"死锁场景"},{id:"sec-5",name:"-race检测"},{id:"sec-6",name:"小结"}]
const raceCode = `// ❌ 竞态条件：两个 goroutine 同时修改 counter
var counter int
for i := 0; i < 1000; i++ {
    go func() { counter++ }()  // 不是原子操作！读→加→写 三步
}
time.Sleep(time.Second)
fmt.Println(counter)  // 可能 < 1000！每次结果不同

// ✅ 修复：用 Mutex 保护
var mu sync.Mutex
var counter int
for i := 0; i < 1000; i++ {
    go func() { mu.Lock(); counter++; mu.Unlock() }()
}`
const mutexCode = `type SafeCounter struct {
    mu sync.Mutex
    v  map[string]int
}
func (c *SafeCounter) Inc(key string) {
    c.mu.Lock()
    defer c.mu.Unlock()  // defer 保证解锁，即使 panic
    c.v[key]++
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
func (c *Cache) Get(key string) string {
    c.mu.RLock()          // 读锁——允许多个 goroutine 同时读
    defer c.mu.RUnlock()
    return c.data[key]
}
func (c *Cache) Set(key, val string) {
    c.mu.Lock()           // 写锁——独占，阻塞所有读和写
    defer c.mu.Unlock()
    c.data[key] = val
}`
const raceDetectCode = `# 运行竞态检测
go run -race main.go
# 测试竞态检测
go test -race ./...
# 输出示例：
# WARNING: DATA RACE
# Write at 0x00c000... by goroutine 7:
#   main.main.func1() at main.go:15`
</script>
