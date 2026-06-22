<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div><h1 class="text-2xl font-bold text-slate-800">指针</h1><p class="text-sm text-slate-500 mt-1">内存地址操作 · 值传递与引用</p></div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-10-pointers.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-10</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📍</span>核心要点</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">&T</code> 取地址返回 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">*T</code>，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">*p</code> 解引用。零值是 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">nil</code>。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>无指针运算</strong>（除非 unsafe），但保留值/指针语义的明确选择。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>所有参数都是值传递。</strong>传指针时复制指针本身（8字节），但可通过它修改原值。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>结构体指针访问字段时 Go <strong>自动解引用</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">p.field</code> 而非 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">(*p).field</code>。</span></li>
        </ul>
      </section>
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>基本用法</h2>
        <div class="mb-4"><Code language="go" :code="basicCode" title="pointer_basic.go" /></div>
      </section>
<section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>指针与函数——传值 vs 传指针</h2>
        <p class="text-slate-600 mb-3 leading-relaxed"><strong>Go 所有参数都是值传递。</strong>传结构体 → 复制整个结构体。传指针 → 复制指针（8字节）。这就是为什么修改需要指针：</p>
        <div class="mb-4"><Code language="go" :code="passByCode" title="pass_by.go" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 JS/Python 对比：</strong>JS 中对象是引用传递，函数内修改会影响外部。Go 中<strong>一切都是值传递</strong>——但 slice/map/chan 的内部指针让它们"看起来像引用"（这些类型的变量本身就是指针包装）。</p></aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>常见陷阱</h2>
        <div class="space-y-4">
          <div><h3 class="text-base font-semibold text-slate-700 mb-2">nil 指针解引用 → panic</h3>
            <div class="mb-3"><Code language="go" :code="nilCode" title="nil_ptr.go" /></div></div>
          <div><h3 class="text-base font-semibold text-slate-700 mb-2">循环中取地址（Go &lt;1.22）</h3>
            <p class="text-slate-600 mb-2">for-range 的循环变量在迭代间复用同一地址。Go 1.22+ 每次迭代创建新变量。</p>
            <div class="mb-3"><Code language="go" :code="loopCode" title="loop_ptr.go" /></div></div>
          <div><h3 class="text-base font-semibold text-slate-700 mb-2">map 元素不可取地址</h3>
            <p class="text-slate-600"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">&m[k]</code> 编译错误——因为 map 扩容时元素会移动地址。</p></div>
        </div>
      </section>
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>指针 vs 值选择</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用指针</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用值</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border border-slate-200">需要<strong>修改</strong>传入的变量</td><td class="px-4 py-2 border border-slate-200">不需要修改</td></tr><tr><td class="px-4 py-2 border border-slate-200">结构体较大（&gt; 几个字段）</td><td class="px-4 py-2 border border-slate-200">小类型（int, string, ...）</td></tr><tr><td class="px-4 py-2 border border-slate-200">需要表达"可选/空"语义</td><td class="px-4 py-2 border border-slate-200">map/slice/chan/interface 本身是引用</td></tr></tbody></table>
        </div>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-9-maps" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：Map</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-11-structs" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：结构体 →</RouterLink>
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
    { id: "sec-1", name: "核心要点" },{ id: "sec-2", name: "基本用法" },
    { id: "sec-3", name: "传值 vs 传指针" },{ id: "sec-4", name: "常见陷阱" },
    { id: "sec-5", name: "指针 vs 值选择" }
  ]
const passByCode = `func modifyVal(p Point) { p.X = 999 }     // ❌ 改的是副本
func modifyPtr(p *Point) { p.X = 999 }    // ✅ 改的是原值

pt := Point{X: 1}
modifyVal(pt); fmt.Println(pt.X)   // 1（没变！）
modifyPtr(&pt); fmt.Println(pt.X)  // 999（变了！）

// 为什么 slice 传参却能修改？
func appendTo(s []int) { s[0] = 99 }        // ✅ slice 内部是指针
// slice header 是值拷贝，但底层数组是共享的`
const basicCode = `x := 42
p := &x          // *int
*p = 99          // 通过指针修改 x
fmt.Println(x)   // 99

// new(T) — 分配零值，返回 *T
ptr := new(int)  // *int，指向 0

// 指针与结构体（自动解引用）
type P struct { Name string; Age int }
pp := &P{Name: "A", Age: 30}
pp.Age = 31      // 即 (*pp).Age，Go 自动解引用

// nil 指针
var np *int       // np == nil`

const nilCode = `var p *int
// *p = 42       // panic!
if p != nil { *p = 42 }  // ✅`

const loopCode = `// Go < 1.22 陷阱：循环变量地址不变
var ptrs []*int
for _, v := range []int{1,2,3} {
    // ptrs = append(ptrs, &v)   // ❌ 全指向同一个 v 的地址
    v := v                       // ✅ 创建副本
    ptrs = append(ptrs, &v)
}`
</script>
