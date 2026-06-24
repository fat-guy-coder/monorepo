<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">sync.Pool 对象复用</h1><p class="text-sm text-slate-500 mt-1">临时对象池——减少 GC 压力，提升性能</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-2-11-sync-pool.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-11</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">♻️</span>Pool = 借-用-还 的对象池</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>sync.Pool ≈ <strong>数据库连接池 / HTTP Keep-Alive 连接池</strong>——不每次都创建新对象，而是复用旧对象。<code class="bg-purple-100 px-1 rounded text-xs font-mono">pool.Get()</code> ≈ 从连接池取连接，用完 <code class="bg-purple-100 px-1 rounded text-xs font-mono">pool.Put(obj)</code> ≈ 还回连接池。</p></aside>
        <p class="text-slate-600 mb-3 leading-relaxed">sync.Pool 的关键特性：<strong>GC 时自动清空</strong>——不适合存持久对象。适合存<strong>临时、高频创建、用完即弃</strong>的对象（如 bytes.Buffer、JSON encoder）。</p>
        <div class="mb-4"><Code language="go" :code="poolCode" title="sync_pool.go" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>使用场景与反模式</h2>
        <div class="space-y-2 text-slate-600 text-sm mb-3"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>✅ 高频创建/销毁的临时对象：</strong>bytes.Buffer、encoding/json.Encoder、正则匹配结果</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>✅ fmt 包大量使用 sync.Pool</strong>来复用打印缓冲区</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>❌ 不要存持久对象：</strong>GC 会清空 Pool。socket、文件句柄等存 Pool 会意外丢失</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>❌ 不要依赖 Pool 中的对象数量：</strong>GC 随时可能清空，不能做容量规划</span></li></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4"><p class="text-sm text-emerald-800"><strong>✅ 性能收益：</strong><code class="bg-emerald-100 px-1 rounded text-xs font-mono">json.NewEncoder</code> 内部就用 sync.Pool 复用 encoder。benchmark 显示使用 Pool 后内存分配减少 80-90%。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Pool = 借-用-还。Get() 取对象（无则 New），Put() 归还</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>GC 时清空</strong>——只存临时对象，不存 socket/文件句柄</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>适合 bytes.Buffer、JSON encoder 等高频临时对象</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-10-race-detection" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：竞态检测</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-12-errgroup" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：errgroup →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"Pool基础"},{id:"sec-2",name:"使用场景"},{id:"sec-3",name:"小结"}]
const poolCode = `var bufPool = sync.Pool{
    New: func() any { return new(bytes.Buffer) },
}
// 取
buf := bufPool.Get().(*bytes.Buffer)
buf.Reset()
buf.WriteString("hello")
fmt.Println(buf.String())
// 还
bufPool.Put(buf)

// 下一个 goroutine 复用时拿去直接用——无需分配新内存`
</script>
