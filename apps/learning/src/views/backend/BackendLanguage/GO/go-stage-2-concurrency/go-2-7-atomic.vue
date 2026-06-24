<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">atomic 原子操作</h1><p class="text-sm text-slate-500 mt-1">无锁并发——比 Mutex 更轻量的共享变量保护</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-2-7-atomic.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-7</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">⚛️</span>atomic vs Mutex——什么时候用原子操作</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>atomic ≈ <strong>JS 的 Atomics API</strong>——对单个变量做原子性的读-改-写，不需要锁。<code class="bg-purple-100 px-1 rounded text-xs font-mono">atomic.AddInt64(&counter, 1)</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">Atomics.add(counter, 1)</code>。比 Mutex 快 <strong>10-100x</strong>——因为 atomic 是 CPU 指令级别的（LOCK 前缀），不需要 OS 调度。</p></aside>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold text-slate-700"></th><th class="px-4 py-2 border font-semibold text-slate-700">Mutex</th><th class="px-4 py-2 border font-semibold text-slate-700">atomic</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">保护范围</td><td class="px-4 py-2 border"><strong>代码块</strong>（临界区）</td><td class="px-4 py-2 border"><strong>单个变量</strong></td></tr><tr><td class="px-4 py-2 border">性能</td><td class="px-4 py-2 border">慢（goroutine 调度开销）</td><td class="px-4 py-2 border text-emerald-600">快（CPU 指令）</td></tr><tr><td class="px-4 py-2 border">适用</td><td class="px-4 py-2 border">多行代码、复杂状态</td><td class="px-4 py-2 border">单个计数器、标志位</td></tr></tbody></table></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>常用原子操作</h2>
        <div class="mb-4"><Code language="go" :code="atomicCode" title="atomic.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>atomic.Value——无锁读写的任意类型</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">适合<strong>读多写少</strong>的配置热更新——比 RWMutex 更轻量。Store 写入新值，Load 读取当前值。</p>
        <div class="mb-4"><Code language="go" :code="valueCode" title="atomic_value.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ atomic.Value 的限制：</strong>存入的类型必须<strong>始终一致</strong>。第一次 Store 了 string，后续只能 Store string——否则 panic。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>单个变量用 atomic</strong>（计数器、标志位），<strong>代码块用 Mutex</strong></span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Add/CAS/Load/Store——比 Mutex 快 10-100x</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>atomic.Value 读多写少</strong>——配置热更新的最佳选择</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-6-sync-wg-once" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：WaitGroup/Once</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-8-context" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Context →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"atomic vs Mutex"},{id:"sec-2",name:"常用操作"},{id:"sec-3",name:"atomic.Value"},{id:"sec-4",name:"小结"}]
const atomicCode = `var counter int64
// Add ——原子加
atomic.AddInt64(&counter, 1)    // counter += 1
// Load ——原子读
v := atomic.LoadInt64(&counter)
// Store ——原子写
atomic.StoreInt64(&counter, 0)
// CAS ——Compare And Swap（无锁数据结构的基础）
swapped := atomic.CompareAndSwapInt64(&counter, 0, 100)
// 如果 counter==0，设为 100，返回 true；否则不修改，返回 false`
const valueCode = `var config atomic.Value
// 写
config.Store(&MyConfig{Host: "localhost", Port: 8080})
// 读（类型断言）
cfg := config.Load().(*MyConfig)
fmt.Println(cfg.Host)
// 热更新：新 goroutine 写入新配置，旧 goroutine 用旧配置——无锁！`
</script>
