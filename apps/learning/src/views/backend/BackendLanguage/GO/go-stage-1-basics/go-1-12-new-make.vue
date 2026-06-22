<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div><h1 class="text-2xl font-bold text-slate-800">new 与 make</h1><p class="text-sm text-slate-500 mt-1">Go 的两种分配原语</p></div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-12-new-make.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-12</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🔢</span>核心区别</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">特性</th><th class="px-4 py-2 border border-slate-200 font-semibold font-mono text-cyan-700">new(T)</th><th class="px-4 py-2 border border-slate-200 font-semibold font-mono text-cyan-700">make(T, ...)</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">适用类型</td><td class="px-4 py-2 border"><strong>所有类型</strong></td><td class="px-4 py-2 border">仅 <strong>slice / map / chan</strong></td></tr><tr><td class="px-4 py-2 border">返回值</td><td class="px-4 py-2 border font-mono">*T（指针）</td><td class="px-4 py-2 border font-mono">T（非指针）</td></tr><tr><td class="px-4 py-2 border">初始化</td><td class="px-4 py-2 border">填零值，不分配底层结构</td><td class="px-4 py-2 border">初始化内部数据结构，可直接使用</td></tr></tbody></table>
        </div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>为什么 Go 有两种分配函数？</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">这是历史原因。Go 的三个内置引用类型——<strong>slice、map、chan</strong>——底层都是结构体指针，需要 Go runtime 初始化内部字段（如 slice 的底层数组指针、map 的哈希桶）。<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">new</code> 只能填零值，不知道 slice 需要配底层数组、map 需要初始化桶——所以需要 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">make</code> 来完成这些"幕后工作"。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 rounded text-xs font-mono">new(T)</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">Object.create(T.prototype)</code>——只分配内存。<code class="bg-purple-100 px-1 rounded text-xs font-mono">make(T)</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">new Array(3)</code> 或 <code class="bg-purple-100 px-1 rounded text-xs font-mono">new Map()</code>——分配内存<strong>并初始化内部结构</strong>使其可用。</p></aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>深入理解 nil map panic</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>这是面试最高频考点之一。</strong>理解它需要知道 Go 的 map 内部是一个指向 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">hmap</code> 结构体的指针。</p>
        <div class="mb-4"><Code language="go" :code="nilMapCode" title="nil_map.go" /></div>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">关键点：<strong>nil map 可以读</strong>（返回零值），但<strong>不能写</strong>（panic）。这和 JS 的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">undefined.key = val</code> 不一样——JS 静默失败，Go 直接 panic 让你发现问题。</p>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>new 基本没用——用 &amp;T{} 代替</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">在实践中 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">new</code> 极少使用。原因是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">&amp;T{}</code> 不仅分配了内存，还能<strong>同时初始化字段</strong>：</p>
        <div class="mb-4"><Code language="go" :code="ampersandCode" title="ampersand_vs_new.go" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>make 的三个参数</h2>
        <div class="mb-4"><Code language="go" :code="code" title="new_vs_make.go" /></div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>new 很少用</strong>——用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">&amp;T{}</code> 代替，可以同时赋初值</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>make 仅用于 slice/map/chan</strong>——初始化内部结构使其可用</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>nil map 可读不可写</strong>——写入 nil map 直接 panic</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>make slice 可指定 len 和 cap 两个参数</span></li></ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-11-structs" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：结构体</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-13-methods-interfaces" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：方法与接口 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
import { RouterLink } from 'vue-router'

const navList = [
    { id: "sec-1", name: "核心区别" },
    { id: "sec-2", name: "为什么两种分配" },
    { id: "sec-3", name: "nil map panic" },
    { id: "sec-4", name: "&T{} 替代 new" },
    { id: "sec-5", name: "make 详解" },
    { id: "sec-6", name: "小结" },
  ]
const nilMapCode = `// nil map 的行为
var m1 map[string]int        // nil map
_ = m1["key"]                 // ✅ 返回 0（零值）——可以读！
// m1["key"] = 1              // ❌ panic! nil map 不能写

m2 := make(map[string]int)   // 空但已初始化的 map
m2["key"] = 1                 // ✅ 可以写

// nil map 的 len 为 0
fmt.Println(len(m1))          // 0`

const ampersandCode = `// &T{} vs new(T)——都是指针，但 &T{} 更灵活
type Point struct { X, Y int }

p1 := new(Point)          // *Point，p1.X=0, p1.Y=0
p2 := &Point{}            // *Point，p2.X=0, p2.Y=0——等价
p3 := &Point{X: 10, Y: 20} // *Point，可以直接赋初值！
// new(Point{X: 10})       // ❌ 编译错误——new 不能带初值

// 结论：永远用 &T{} 代替 new(T)`
const code = `// make ——仅 slice/map/chan，返回已初始化的 T
// make([]T, len, cap)
s1 := make([]int, 3)      // len=3, cap=3
s2 := make([]int, 3, 5)   // len=3, cap=5——可 append 2 个不扩容
s3 := make([]int, 0, 10)  // len=0, cap=10——空切片，预分配容量

// make(map[T]U) ——不需要大小参数
m := make(map[string]int)
m["a"] = 1

// make(chan T, bufSize) ——0 或无 = 无缓冲
ch1 := make(chan int)     // 无缓冲 channel
ch2 := make(chan int, 10) // 缓冲 10 个`
</script>
