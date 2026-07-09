<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">⚛️ atomic 原子操作</h1><p class="text-sm text-slate-500 mt-1">无锁并发 — 比 Mutex 快 10-100x，CPU 指令级别的原子操作</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-7-atomic.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-7</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>atomic — CPU 级别的原子操作</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sync/atomic</code> 提供<strong>无锁</strong>的原子操作——在 CPU 指令级别保证原子性（x86 的 LOCK 前缀）。比 Mutex 快 10-100x，但<strong>只适用于单个变量</strong>。代码块保护还是用 Mutex。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>JS 单线程不需要 atomic。Node.js 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Atomics.add()</code> 是 SharedArrayBuffer 配合多线程用的——和 Go 的 atomic 概念相同。Go 中 atomic 用于<strong>计数器、标志位、状态值</strong>等单个变量的并发安全。</p></aside>
        <div class="mb-4"><Code language="go" :code="atomicBasicCode" title="atomic_basic.go" /></div>
      </section>
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>CAS — 无锁数据结构的基础</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>CAS (Compare-And-Swap)</strong> 是 lock-free 编程的核心原语：先检查值是否等于预期，等于则替换，不等则不做任何事。适用于实现<strong>无锁队列、无锁栈、乐观锁</strong>。</p>
        <div class="mb-4"><Code language="go" :code="casCode" title="cas.go" /></div>
      </section>
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>atomic vs Mutex 选型指南</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">场景</th><th class="px-4 py-2 border font-semibold">用 atomic</th><th class="px-4 py-2 border font-semibold">用 Mutex</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">单个 int64/bool/pointer</td><td class="px-4 py-2 border text-emerald-600">✅</td><td class="px-4 py-2 border">⚠️ 杀鸡用牛刀</td></tr><tr><td class="px-4 py-2 border">多个变量需要原子更新</td><td class="px-4 py-2 border">❌</td><td class="px-4 py-2 border text-emerald-600">✅</td></tr><tr><td class="px-4 py-2 border">复杂数据结构</td><td class="px-4 py-2 border">❌</td><td class="px-4 py-2 border text-emerald-600">✅</td></tr><tr><td class="px-4 py-2 border">计数器、标志位</td><td class="px-4 py-2 border text-emerald-600">✅ 首选</td><td class="px-4 py-2 border">⚠️</td></tr><tr><td class="px-4 py-2 border">高性能要求</td><td class="px-4 py-2 border text-emerald-600">✅ 10-100x 快</td><td class="px-4 py-2 border">—</td></tr></tbody></table></div>
      </section>
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>atomic 比 Mutex 快 10-100x——CPU LOCK 指令级别，无上下文切换</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>CAS</strong> 是无锁数据结构的基础——自旋+CAS 实现 lock-free 队列/栈</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>单个变量用 atomic，多个变量/复杂逻辑用 Mutex</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-6-sync-wg-once" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：WaitGroup/Once</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-8-context" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Context →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"atomic 基础"},{id:"sec-2",name:"CAS"},{id:"sec-3",name:"atomic vs Mutex"},{id:"sec-4",name:"小结"}]
const atomicBasicCode = `var counter int64
// Add — 原子加（比 mu.Lock(); counter++; mu.Unlock() 快 100x）
atomic.AddInt64(&counter, 1)     // counter += 1
atomic.AddInt64(&counter, 5)     // counter += 5
v := atomic.LoadInt64(&counter)  // 原子读（防止读到"写了一半"的值）
fmt.Println(v)                   // 输出: 6

// Store / Swap
atomic.StoreInt64(&counter, 100)       // 原子写
old := atomic.SwapInt64(&counter, 200) // 交换并返回旧值
fmt.Println(old)                        // 输出: 100

// 原子 Bool——用 int32 代替
var flag int32
atomic.StoreInt32(&flag, 1)   // true
if atomic.LoadInt32(&flag) == 1 { /* flag is true */ }

// 原子 Pointer——无锁读-复制-更新（RCU 模式）
var configPtr atomic.Pointer[Config]  // Go 1.19+
configPtr.Store(&Config{Timeout: 30})
cfg := configPtr.Load()  // 原子读取最新配置`
const casCode = `// CAS(addr, old, new): 如果 *addr==old，则设 *addr=new，返回 true
var flag int64
swapped := atomic.CompareAndSwapInt64(&flag, 0, 1) // flag==0 → 设为 1
fmt.Println("swapped:", swapped, "flag:", flag)     // swapped: true  flag: 1
swapped = atomic.CompareAndSwapInt64(&flag, 0, 2)   // flag!=0 → 不修改
fmt.Println("swapped:", swapped, "flag:", flag)     // swapped: false flag: 1

// 实战：CAS 自旋锁（lock-free mutex）
type SpinLock struct{ state int32 }
func (s *SpinLock) Lock() {
    for !atomic.CompareAndSwapInt32(&s.state, 0, 1) {
        runtime.Gosched()  // 让出 CPU，避免忙等待
    }
}
func (s *SpinLock) Unlock() { atomic.StoreInt32(&s.state, 0) }`
</script>
