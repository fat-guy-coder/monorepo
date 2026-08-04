<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">⚛️ atomic 原子操作</h1><p class="text-sm text-slate-500 mt-1">无锁并发 — CPU 指令级别的原子保障，比 Mutex 快 10-100 倍</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-7-atomic.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-7</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 为什么需要 atomic -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>为什么 counter++ 不安全？— atomic 解决了什么</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">counter++</code> 在 CPU 上是<strong>三条指令</strong>：LOAD(读) → ADD(加) → STORE(写)。如果两个 CPU 核心同时执行这三步，它们可能读到同一个旧值——导致两次 ++ 只生效一次。这就是<strong>竞态条件</strong>。</p>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>atomic 的做法：</strong>用一条<strong>带 LOCK 前缀的 CPU 指令</strong>（如 x86 的 LOCK XADD）完成整个读-改-写操作。LOCK 前缀<strong>锁住内存总线</strong>——在这条指令完成之前，其他 CPU 核心无法访问这块内存。CPU 级别的保证，比 Mutex（软件锁+上下文切换）快 10-100 倍。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 JS 类比：</strong>JS 单线程不需要 atomic（Event Loop 保证原子性）。Node.js 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Atomics.add()</code> 配合 SharedArrayBuffer/Worker Threads 使用的——和 Go 的 atomic 完全同概念。Go 中 atomic 用于<strong>计数器、标志位、状态值</strong>等单个变量的并发安全。</p></aside>
        <div class="mb-4"><Code language="go" :code="whyCode" title="why_atomic.go" /></div>
      </section>

      <!-- 2. 基本 API -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>atomic 基本 API — Add/Load/Store/Swap</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">atomic 包为 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">int32/int64/uint32/uint64/uintptr/unsafe.Pointer</code> 提供了原子操作。Go 1.19+ 增加了泛型 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">atomic.Pointer[T]</code> 和 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">atomic.Bool</code>。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">操作</th><th class="px-4 py-2 border font-semibold">说明</th><th class="px-4 py-2 border font-semibold">等价于（非原子）</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">AddInt64(&amp;v, n)</td><td class="px-4 py-2 border">原子加 n，返回新值</td><td class="px-4 py-2 border"><code class="text-xs">v += n</code></td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">LoadInt64(&amp;v)</td><td class="px-4 py-2 border"><strong>原子读</strong>——防止读到"写一半"的脏数据</td><td class="px-4 py-2 border"><code class="text-xs">v</code></td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">StoreInt64(&amp;v, n)</td><td class="px-4 py-2 border">原子写——保证整值写入</td><td class="px-4 py-2 border"><code class="text-xs">v = n</code></td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">SwapInt64(&amp;v, n)</td><td class="px-4 py-2 border">原子交换——设新值，返回旧值</td><td class="px-4 py-2 border"><code class="text-xs">old=v; v=n</code></td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">CompareAndSwapInt64(&amp;v, old, new)</td><td class="px-4 py-2 border"><strong>CAS</strong>——v==old 才设为 new</td><td class="px-4 py-2 border">—</td></tr>
        </tbody></table></div>
        <div class="mb-4"><Code language="go" :code="atomicBasicCode" title="atomic_basic.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ atomic 和 Mutex 不能混用保护同一个变量！</strong>要么全用 atomic，要么全用 Mutex。混用时 atomic 操作不受锁保护——你以为安全了，其实有竞态。</p></aside>
      </section>

      <!-- 3. CAS -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>CAS — 无锁编程的基石</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm"><strong>Compare-And-Swap（比较并交换）</strong>是 lock-free 编程的核心原语。它的逻辑很简单：<strong>"如果你还是我认识的那个值，我就换成新的；如果已经变了，我什么都不做"</strong>。这让你可以在无锁的情况下实现"先检查再修改"的模式——失败了就重试（自旋）。</p>
        <div class="mb-4"><Code language="go" :code="casCode" title="cas.go" /></div>
      </section>

      <!-- 4. atomic.Value / Pointer -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>实战：atomic.Value + RCU 模式（配置热更新）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">很多服务需要在运行时<strong>热更新配置</strong>——多个 goroutine 读取配置，偶尔一个 goroutine 写新配置。用 Mutex 会导致"读配置"也要排队。用 atomic 可以让读操作<strong>完全无锁</strong>——这就是 <strong>RCU（Read-Copy-Update）模式</strong>。</p>
        <div class="mb-4"><Code language="go" :code="rcuCode" title="rcu_pattern.go" /></div>
      </section>

      <!-- 5. 选型 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>atomic vs Mutex 选型指南</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">场景</th><th class="px-4 py-2 border font-semibold">用 atomic</th><th class="px-4 py-2 border font-semibold">用 Mutex</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">单个 int64/bool/pointer</td><td class="px-4 py-2 border text-emerald-600">✅ 首选</td><td class="px-4 py-2 border">⚠️ 杀鸡用牛刀</td></tr><tr><td class="px-4 py-2 border">多个变量需原子更新</td><td class="px-4 py-2 border">❌ 无法保证</td><td class="px-4 py-2 border text-emerald-600">✅</td></tr><tr><td class="px-4 py-2 border">复杂数据结构</td><td class="px-4 py-2 border">❌</td><td class="px-4 py-2 border text-emerald-600">✅</td></tr><tr><td class="px-4 py-2 border">计数器、标志位</td><td class="px-4 py-2 border text-emerald-600">✅ 首选</td><td class="px-4 py-2 border">⚠️ 计数器用 Mutex 太重</td></tr><tr><td class="px-4 py-2 border">配置热更新（读多写少）</td><td class="px-4 py-2 border text-emerald-600">✅ Value/Pointer</td><td class="px-4 py-2 border">⚠️ RWMutex 也可</td></tr></tbody></table></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 性能对比数据（参考）：</strong>原子加 1 ≈ 5ns（CPU LOCK XADD 一条指令）。Mutex Lock+Unlock+加 1 ≈ 25-100ns（包含 CAS + 可能的 futex 休眠）。在高并发争用下差距可能更大——atomic 不会引发上下文切换。</p></aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>atomic = CPU LOCK 指令</strong>——锁内存总线，一条指令完成读-改-写</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>CAS + 自旋</strong> = lock-free 编程——适用于锁持有时间极短的场景</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>atomic.Value / Pointer</strong> = RCU 读无锁模式（配置热更新、单例替换）</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>单个变量用 atomic，多个变量/复杂结构用 Mutex——别混用</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-6-sync-wg-once" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：WaitGroup/Once</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-8-context" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Context →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"为什么需要atomic"},{id:"sec-2",name:"基本API"},{id:"sec-3",name:"CAS"},{id:"sec-4",name:"RCU实战"},{id:"sec-5",name:"选型指南"},{id:"sec-6",name:"小结"}]
const whyCode = `// ❌ 这有竞态条件——counter++ = LOAD+ADD+STORE 三条 CPU 指令
var counter int64
go func() { counter++ }() // goroutine A: LOAD=5
go func() { counter++ }() // goroutine B: LOAD=5 → 两个都读到了 5！
// 最终 counter 可能是 6——应该是 7 才对。少了一次 ++

// ✅ atomic: 一条 LOCK XADD 指令完成全部
var safe int64
go func() { atomic.AddInt64(&safe, 1) }() // LOCK XADD——内存总线锁住
go func() { atomic.AddInt64(&safe, 1) }() // B 等 A 的指令完成 → 读=6 → 写=7
// safe == 7 ✅`
const atomicBasicCode = `var counter int64
// Add — 原子加（x86: LOCK XADD 一条指令）
atomic.AddInt64(&counter, 1)     // counter += 1
atomic.AddInt64(&counter, 5)     // counter += 5
v := atomic.LoadInt64(&counter)  // 原子读（防止读到"写了一半"的值）
fmt.Println(v)                   // 输出: 6

// Store / Swap
atomic.StoreInt64(&counter, 100)       // 原子写
old := atomic.SwapInt64(&counter, 200) // 交换并返回旧值
fmt.Println(old)                        // 输出: 100

// 原子 Bool——Go 1.19+ 有 atomic.Bool
var ready atomic.Bool
ready.Store(true)
if ready.Load() { fmt.Println("ready!") }

// 原子 Pointer——Go 1.19+ 泛型版本
var cfg atomic.Pointer[Config]
cfg.Store(&Config{Timeout: 30})
current := cfg.Load()  // 原子读取最新配置——完全无锁！`
const casCode = `// CAS: "如果你还是旧值，就换新的；否则什么都不做"
var flag int64
swapped := atomic.CompareAndSwapInt64(&flag, 0, 1)
fmt.Println("swapped:", swapped, "flag:", flag)   // true  flag: 1
swapped = atomic.CompareAndSwapInt64(&flag, 0, 2)
fmt.Println("swapped:", swapped, "flag:", flag)   // false flag: 1（flag 不是 0 了）

// 实战①：CAS 自旋锁（比 Mutex 更轻量，适合临界区极短的场景）
type SpinLock struct{ state int32 }
func (s *SpinLock) Lock() {
    for !atomic.CompareAndSwapInt32(&s.state, 0, 1) {
        runtime.Gosched()  // 没抢到 → 让出 CPU（避免空转浪费）
    }
}
func (s *SpinLock) Unlock() { atomic.StoreInt32(&s.state, 0) }

// 实战②：CAS 实现"一次性初始化"（不用 sync.Once）
var initialized int32
if atomic.CompareAndSwapInt32(&initialized, 0, 1) {
    setup()  // 只有第一个执行到这里，其余看到 initialized=1 就跳过
}`
const rcuCode = `// RCU 模式（Read-Copy-Update）——读无锁，写全量替换
type Config struct{ Timeout time.Duration; Debug bool }

// 用 atomic.Value 存指针——读完全无锁！
var globalConfig atomic.Value  // 或者 atomic.Pointer[Config] (Go 1.19+)

func LoadConfig() *Config {
    return globalConfig.Load().(*Config)
}
func UpdateConfig(newCfg *Config) {
    globalConfig.Store(newCfg)  // 原子替换——所有读者立即看到新配置
}

func main() {
    globalConfig.Store(&Config{Timeout: 30, Debug: false})
    // 100 个 goroutine 同时读——完全无锁，无竞争！
    for i := 0; i < 100; i++ {
        go func() {
            cfg := LoadConfig()
            fmt.Println(cfg.Timeout)  // 30
        }()
    }
    // 热更新配置——即时生效
    UpdateConfig(&Config{Timeout: 60, Debug: true})
}
// 这就是 Etcd/ZooKeeper 客户端本地缓存的简化版——RCU 模式`
</script>
