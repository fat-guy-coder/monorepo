<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">竞态检测</h1><p class="text-sm text-slate-500 mt-1">go run -race——发现并发 bug 的利器</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/basics/go-2-10-race-detection.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-10</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🔍</span>-race 是什么</h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 rounded text-xs font-mono">go run -race</code> ≈ <strong>TypeScript 的 strict mode</strong>——编译时/运行时检测潜在的问题。只不过 -race 专门检测并发竞态。</p></aside>
        <p class="text-slate-600 mb-3 leading-relaxed">Go 的竞态检测器（基于 Google 的 <strong>ThreadSanitizer v2</strong>）在编译时插入额外代码，<strong>运行时</strong>检测到并发读写冲突立即报告：哪个 goroutine 改了什么、哪个 goroutine 同时读了什么。</p>
        <div class="mb-4"><Code language="bash" :code="cliCode" title="cli.sh" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>读竞态报告</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">竞态报告包含：哪个 goroutine 写、哪个 goroutine 读/写、冲突的内存地址、调用栈。关键行是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Write at 0x... by goroutine 7</code> 和 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Previous read at 0x... by goroutine 6</code>。</p>
        <div class="mb-4"><Code language="text" :code="reportCode" title="race_report.txt" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>-race 的性能代价与最佳实践</h2>
        <ul class="space-y-2 text-slate-600 text-sm mb-3"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>内存开销 ~10x，CPU 开销 ~2-20x。</strong>只在测试/开发环境使用</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>CI 标配：</strong><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">go test -race ./...</code> 加入 CI pipeline</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>编译二进制：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">go build -race</code> 用于压力测试环境</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>生产环境不需要 -race</strong>——性能开销太大</span></li></ul>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>所有并发代码的测试都加 -race——CI 标配</strong></span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>报告显示"谁写了什么、谁读了什么、在哪一行"</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>10x 内存开销——只测试用，不生产用</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-9-concurrency-patterns" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：并发模式</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-11-sync-pool" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：sync.Pool →</RouterLink></nav></footer>
  </div>
</template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore(); import { RouterLink } from 'vue-router'
const navList = [{id:"sec-1",name:"-race是什么"},{id:"sec-2",name:"读报告"},{id:"sec-3",name:"最佳实践"},{id:"sec-4",name:"小结"}]
const cliCode = `# 运行检测
go run -race main.go
# 测试检测
go test -race ./...
# 编译带检测的二进制（用于压测环境）
go build -race -o myapp`
const reportCode = `WARNING: DATA RACE
Write at 0x00c0000a0120 by goroutine 7:
  main.main.func1() at main.go:12

Previous read at 0x00c0000a0120 by goroutine 6:
  main.main.func2() at main.go:18

# 解读：goroutine7 在第12行写，goroutine6 在第18行读——冲突！`
</script>
