<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🔍 竞态检测</h1><p class="text-sm text-slate-500 mt-1">go run -race — 发现并发 bug 的利器</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-10-race-detection.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-10</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>go run -race — 竞态检测器</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Go 内置<strong>竞态检测器（Race Detector）</strong>——编译时插入额外检查代码，运行时检测到并发读写冲突立即报告。所有并发代码<strong>必须过 -race</strong>。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>≈ <strong>TypeScript 的 strict mode</strong> 或 <strong>ESLint</strong>——编译/运行时检测潜在 bug。但 race detector 更强大：它能检测到那些<strong>只有高并发场景下才会出现</strong>的竞态条件。</p></aside>
        <div class="mb-4"><Code language="bash" :code="raceCmdCode" title="CLI 命令" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>竞态条件示例与检测输出</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div><h4 class="font-semibold text-slate-700 mb-2">❌ 有竞态的代码</h4><Code language="go" :code="badCode" title="race.go" /></div>
          <div><h4 class="font-semibold text-slate-700 mb-2">📟 -race 输出</h4><Code language="text" :code="raceOutputCode" title="race_output.txt" /></div>
        </div>
        <div class="mb-4"><h4 class="font-semibold text-slate-700 mb-2">✅ 修复方案</h4><Code language="go" :code="fixCode" title="fix.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>重要注意事项</h2>
        <ul class="space-y-2 text-slate-600 text-sm"><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">⚠️</span><span><strong>~10x 性能开销</strong>——只在测试/开发环境用，生产环境<strong>不要加 -race</strong></span></li><li class="flex items-start gap-2"><span class="text-amber-500 mt-1">⚠️</span><span><strong>内存开销 ~5-10x</strong>——小项目 OK，大项目测试时间显著延长</span></li><li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✅</span><span><strong>CI 标配：</strong><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">go test -race ./...</code> 应该加入 CI pipeline</span></li><li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">✅</span><span><strong>不能检测所有竞态</strong>——只能检测实际发生的。增加测试并发度、运行多次提高覆盖率</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-9-concurrency-patterns" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：并发模式</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-11-sync-pool" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：sync.Pool →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-1",name:"-race 检测器"},{id:"sec-2",name:"竞态示例与修复"},{id:"sec-3",name:"注意事项"}]
const raceCmdCode = `# 运行竞态检测
go run -race main.go

# 测试竞态检测（CI 标配！）
go test -race ./...

# 编译带 race 检测的二进制（仅测试用）
go build -race -o myapp_race ./cmd/server`
const badCode = `// ❌ 竞态条件：两个 goroutine 同时修改 counter
func main() {
    var counter int
    var wg sync.WaitGroup
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func() {
            counter++  // ⚠️ 读-改-写 三步，不是原子操作
            wg.Done()
        }()
    }
    wg.Wait()
    fmt.Println(counter)
}`
const raceOutputCode = `$ go run -race main.go
==================
WARNING: DATA RACE
Read at 0x00c000124018 by goroutine 8:
  main.main.func1() at main.go:15

Previous write at 0x00c000124018 by goroutine 7:
  main.main.func1() at main.go:15

Goroutine 8 (running) created at:
  main.main() at main.go:14
==================`
const fixCode = `// ✅ 修复一：Mutex
var mu sync.Mutex
mu.Lock(); counter++; mu.Unlock()

// ✅ 修复二：atomic（更快）
var counter int64
atomic.AddInt64(&counter, 1)

// ✅ 修复三：channel（通过通信共享数据）
ch := make(chan int, 1)
ch <- <-ch + 1`
</script>
