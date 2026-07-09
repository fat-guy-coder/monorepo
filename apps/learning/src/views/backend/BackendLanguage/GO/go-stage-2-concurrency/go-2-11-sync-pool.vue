<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">♻️ sync.Pool 对象复用</h1><p class="text-sm text-slate-500 mt-1">临时对象池 — 减少 GC 压力，提升性能</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-11-sync-pool.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-11</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>sync.Pool — 复用临时对象，减轻 GC</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">高频创建和销毁同一类型的对象会产生大量 GC 压力。<strong>sync.Pool 缓存已分配的对象</strong>，Get 取一个（没有则 New），Put 归还。对象在<strong>两次 GC 之间</strong>存活——GC 时会清空 Pool。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>sync.Pool ≈ <strong>对象池/连接池</strong>（如 MySQL connection pool）。≈ JS 的 <strong>ArrayBuffer pool</strong>——复用已分配的内存。但 Go 的 Pool 是<strong>临时</strong>的——GC 会清空，不能做持久缓存。</p></aside>
        <div class="mb-4"><Code language="go" :code="basicCode" title="pool_basic.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>典型场景与陷阱</h2>
        <h3 class="text-md font-semibold text-slate-700 mb-2">✅ 适合用 Pool</h3><ul class="space-y-1 text-sm text-slate-600 mb-3"><li class="flex items-start gap-2"><span class="text-emerald-500">▸</span><span>高频创建/销毁的临时对象（bytes.Buffer、JSON encoder、网络缓冲区）</span></li><li class="flex items-start gap-2"><span class="text-emerald-500">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">fmt.Sprintf</code> 内部就用 Pool 复用 buffer</span></li></ul>
        <h3 class="text-md font-semibold text-slate-700 mb-2">❌ 不适合 Pool</h3><ul class="space-y-1 text-sm text-slate-600"><li class="flex items-start gap-2"><span class="text-red-500">▸</span><span>需要持久缓存的数据——GC 会清空 Pool</span></li><li class="flex items-start gap-2"><span class="text-red-500">▸</span><span>有状态的对象——Put 回 Pool 前要<strong>重置</strong>（Reset），否则下次 Get 拿到脏数据</span></li></ul>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 核心陷阱：</strong>Pool 里的对象随时会被 GC 清除。不要把 Pool 当成<strong>持久缓存</strong>——它只是<strong>临时减 GC</strong>的工具。另：Put 前必须重置对象状态！</p></aside>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-10-race-detection" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：竞态检测</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-12-errgroup" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：errgroup →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"sync.Pool 基础"},{id:"sec-2",name:"场景与陷阱"}]
const basicCode = `// 创建 Pool，指定 New 函数（Pool 为空时调用）
var bufPool = sync.Pool{
    New: func() any { return new(bytes.Buffer) },
}

// Get — 从池中取（没有则 New）
buf := bufPool.Get().(*bytes.Buffer)
buf.WriteString("hello")
fmt.Println(buf.String())  // 输出: hello

// Put — 归还前必须重置！
buf.Reset()
bufPool.Put(buf)

// 实战：JSON encoder 复用
var encoderPool = sync.Pool{
    New: func() any { return json.NewEncoder(nil) },
}
// 注意：encoder 本身不贵，但内部的 buffer 复用确实减少了分配

// 标准库中的用例：fmt.Printf 内部用 Pool 管理缓冲区
// 每次 fmt.Sprintf 不需要 new(bytes.Buffer) ——从 Pool 取一个即可`
</script>
