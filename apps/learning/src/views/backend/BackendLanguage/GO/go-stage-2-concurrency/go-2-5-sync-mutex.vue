<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🔒 Mutex 互斥锁</h1><p class="text-sm text-slate-500 mt-1">sync.Mutex / RWMutex — 保护共享数据，Go 的 goroutine 是并行的，所以需要锁</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-5-sync-mutex.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-5</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 竞态条件 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>竞态条件 — 为什么 Go 也需要锁？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">假设你和小明<strong>同时</strong>去银行取钱——你看到余额 100 块，小明也看到 100 块。你取 100，小明也取 100，两人都成功了——钱翻倍了！这就是<strong>竞态条件（Race Condition）</strong>——两个操作同时读→改→写同一个数据，结果不可预测。</p>
        <p class="text-slate-600 mb-4 leading-relaxed">在 Go 里，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">counter++</code> 不是一步操作——它是<strong>三步骤</strong>：①从内存读 counter 到 CPU 寄存器 ②寄存器加 1 ③写回内存。两个 goroutine 同时执行 → 两次 ++ 可能只生效一次。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 为什么 JS 不需要锁？</strong> JS 的 Event Loop 保证同一时刻只执行一段代码（单线程），不用担心两个函数同时改一个变量。但 Go 的 goroutine 是真正<strong>多核并行</strong>运行的——不同 CPU 核心上的 goroutine 确实同时在操作内存。你用 channel 通信时不需要锁（channel 自己带锁），但直接共享变量就必须用 Mutex 或 atomic。</p></aside>
        <div class="mb-4"><Code language="go" :code="raceCode" title="race_condition.go" /></div>
      </section>

      <!-- 2. Mutex 原理与用法 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>Mutex 是怎么工作的？— 原子 CAS + 休眠排队</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Mutex 内部用了一个<strong>int32 state 标志位</strong>——0 表示未锁定，1 表示已锁定。Lock 时用 <strong>atomic CAS</strong>（CPU 原子指令）尝试把 0 改成 1。改成功了→进入临界区；失败了→说明别人持有锁→<strong>自旋等一会</strong>，还是拿不到就→<strong>操作系统休眠排队</strong>（futex）。Unlock 时把 1 改回 0，唤醒一个排队者。</p>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>标准模式就一句话：</strong><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">mu.Lock(); defer mu.Unlock()</code>——<strong>defer 保证即使 panic 也会解锁</strong>，防止死锁。</p>
        <div class="mb-4"><Code language="go" :code="mutexCode" title="mutex_basic.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ Mutex 不可复制！</strong>Mutex 内部有 state 字段。如果你复制了 Mutex（如值传递），新旧两份各管各的锁状态——互斥完全失效。<code class="bg-amber-100 px-1 rounded text-xs font-mono">go vet</code> 能检测。传参必须用<strong>指针</strong>。结构体包含 Mutex 时，该结构体也要用指针传递。</p></aside>
      </section>

      <!-- 3. Mutex vs Channel -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>什么时候用 Mutex，什么时候用 Channel？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">Go 社区有一句话："<strong>不要通过共享内存来通信，而要通过通信来共享内存。</strong>"——意思是优先用 channel。但不是所有场景都适合 channel。下面这张表帮你决策：</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">场景</th><th class="px-4 py-2 border font-semibold">推荐方案</th><th class="px-4 py-2 border font-semibold">原因</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">多个 goroutine 读写<strong>同一个变量</strong></td><td class="px-4 py-2 border">Mutex</td><td class="px-4 py-2 border">channel 传递"数据"，不是保护"变量"</td></tr><tr><td class="px-4 py-2 border">goroutine 之间<strong>传递消息/数据</strong></td><td class="px-4 py-2 border text-emerald-600">Channel</td><td class="px-4 py-2 border">channel 天然就是用来传数据的</td></tr><tr><td class="px-4 py-2 border"><strong>有状态的服务</strong>（如计数器、缓存）</td><td class="px-4 py-2 border">Mutex 或 单 goroutine+channel</td><td class="px-4 py-2 border">"一个 goroutine 拥有数据，别人通过 channel 请求"——Go 的 actor model</td></tr><tr><td class="px-4 py-2 border"><strong>缓存/配置</strong>（读多写少）</td><td class="px-4 py-2 border text-emerald-600">RWMutex</td><td class="px-4 py-2 border">多个 reader 可同时读，writer 独占——完美适配</td></tr></tbody></table></div>
      </section>

      <!-- 4. RWMutex -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>RWMutex — 读多写少的神器</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Mutex 的问题是<strong>读也会互斥</strong>——100 个 goroutine 同时读一个不变量，还得排队。RWMutex 解决了这个问题：RLock 允许多个 reader 同时持有读锁，Lock 独占写锁（阻塞所有 reader）。<strong>读多写少时性能提升 10-100 倍</strong>。</p>
        <div class="mb-4"><Code language="go" :code="rwCode" title="rwmutex.go" /></div>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold"></th><th class="px-4 py-2 border font-semibold">Mutex</th><th class="px-4 py-2 border font-semibold">RWMutex</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">读-读并发</td><td class="px-4 py-2 border">❌ 互斥（读也排队）</td><td class="px-4 py-2 border text-emerald-600">✅ 多读并发（不排队）</td></tr><tr><td class="px-4 py-2 border">读-写</td><td class="px-4 py-2 border">互斥</td><td class="px-4 py-2 border">写阻塞读（写完就读）</td></tr><tr><td class="px-4 py-2 border">写-写</td><td class="px-4 py-2 border">互斥</td><td class="px-4 py-2 border">互斥</td></tr></tbody></table></div>
      </section>

      <!-- 5. 死锁 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>死锁三场景 — 新手最容易踩的坑</h2>
        <div class="space-y-3 text-sm mb-4">
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-semibold text-amber-700 mb-1">① Lock 两次（不可重入）——最常见！</h4>
            <p class="text-amber-600">同一个 goroutine 里 Lock 了再 Lock → 第二次 Lock 永远等不到第一次 Unlock（因为自己在等自己）→ <strong>死锁</strong>。<br/>Go 故意设计不可重入——重入锁掩盖代码问题。需要重入时用 channel 或重构代码。</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-semibold text-amber-700 mb-1">② 忘记 Unlock</h4>
            <p class="text-amber-600">Lock 后 if err != nil { return } 但没 Unlock → 锁永远不会释放 → 其他 goroutine 永久阻塞。用 <strong>defer mu.Unlock()</strong> 彻底解决。</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <h4 class="font-semibold text-amber-700 mb-1">③ 锁顺序不一致（交叉锁）</h4>
            <p class="text-amber-600">Goroutine A: Lock(a)→Lock(b)，Goroutine B: Lock(b)→Lock(a)。A 拿到 a 等 b，B 拿到 b 等 a → <strong>互相等 → 死锁</strong>。解决方案：所有 goroutine 按<strong>同一顺序</strong>获取锁。</p>
          </div>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 检测利器：go run -race</strong>（编译时插入竞态检查）和 <strong>go vet</strong>（锁拷贝检查）。CI 标配：<code class="bg-emerald-100 px-1 rounded text-xs font-mono">go test -race ./...</code></p></aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Mutex = 原子 CAS + futex 休眠排队。Lock+defer Unlock 记住这四个单词</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>传递数据用 channel，保护共享变量用 Mutex，读多写少用 RWMutex</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Mutex 不可重入、不可复制——传参用指针</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>go test -race</strong> 必须跑——很多竞态在低并发时根本不出现</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-4-timer-ticker" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Timer/Ticker</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-6-sync-wg-once" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：WaitGroup/Once →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"竞态条件"},{id:"sec-2",name:"Mutex原理+用法"},{id:"sec-3",name:"Mutex vs Channel"},{id:"sec-4",name:"RWMutex"},{id:"sec-5",name:"死锁三场景"},{id:"sec-6",name:"小结"}]
const raceCode = `// ❌ 竞态条件——counter++ = 读→加→写，三步不原子
var counter int
var wg sync.WaitGroup
for i := 0; i < 1000; i++ {
    wg.Add(1)
    go func() { counter++; wg.Done() }()  // 每个 goroutine 都做这三步
}
wg.Wait()
fmt.Println(counter)  // 输出: 982（每次不同，永远 < 1000！）
// 原因：goroutineA 读了 counter=5，goroutineB 也读了 counter=5
//      两人都加 1 写回 6——本应该变成 7 的！

// ✅ Mutex 保护：同一时刻只有一个 goroutine 在临界区
var mu sync.Mutex; counter = 0
for i := 0; i < 1000; i++ {
    wg.Add(1)
    go func() { mu.Lock(); counter++; mu.Unlock(); wg.Done() }()
}
wg.Wait()
fmt.Println(counter)  // 输出: 1000 ✅`
const mutexCode = `// Lock + defer Unlock — 记住这四个单词就够了
type SafeCounter struct {
    mu sync.Mutex          // ⚠️ 不能复制！传参用指针 *SafeCounter
    v  map[string]int
}
func (c *SafeCounter) Inc(key string) {
    c.mu.Lock()
    defer c.mu.Unlock()    // defer 保证：panic、提前 return 都解锁
    c.v[key]++             // 临界区——同一时刻只有一个 goroutine 能进
}
func (c *SafeCounter) Value(key string) int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.v[key]        // 读也必须加锁！否则可能读到"写到一半"的值
}`
const rwCode = `type Cache struct {
    mu   sync.RWMutex
    data map[string]string
}
// 读——多 goroutine 可同时 RLock（完全不阻塞对方！）
func (c *Cache) Get(key string) string {
    c.mu.RLock()            // 读锁——多个 reader 同时持有
    defer c.mu.RUnlock()
    return c.data[key]
}
// 写——独占（RLock 全部阻塞，等 Unlock 后才恢复）
func (c *Cache) Set(key, val string) {
    c.mu.Lock()             // 写锁——阻塞所有 reader 和 writer
    defer c.mu.Unlock()
    c.data[key] = val
}
// 实战：1000 个 reader + 1 个 writer
// Mutex：读者必须排队——吞吐量 ≈ 1/读耗时
// RWMutex：读者完全不排队——吞吐量 ≈ 1000/读耗时（1000x 差距！）`
</script>
