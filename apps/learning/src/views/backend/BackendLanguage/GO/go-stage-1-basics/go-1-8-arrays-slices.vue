<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div><h1 class="text-2xl font-bold text-slate-800">数组与切片</h1><p class="text-sm text-slate-500 mt-1">Go 语言的核心集合类型</p></div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-8-arrays-slices.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-8</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📦</span>概述</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">Go 提供两种核心集合类型：<strong>数组</strong>（固定长度，值类型）和 <strong>切片</strong>（动态长度，引用底层数组）。日常开发中切片的使用频率远超数组。</p>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>数组：</strong>长度固定，是类型的一部分（[3]int 和 [5]int 是不同类型），值传递会复制整个数组</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>切片：</strong>动态长度，引用底层数组，是 Go 中最常用的数据结构</span></li>
        </ul>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>数组（Array）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">数组长度<strong>编译时确定</strong>且不可改变。由于长度是类型的一部分，[3]int 和 [5]int 是不同的类型，不能互相赋值。</p>
        <div class="mb-4"><Code language="go" :code="arrayCode" title="array.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>数组是<strong>值类型</strong>——赋值和传参会复制整个数组。大数组的复制开销很高，需要使用指针。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>切片（Slice）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">切片是 Go 中最常用的数据结构。它不存储数据，只是对底层数组的<strong>引用</strong>。每个切片包含三个信息：指针、长度（len）和容量（cap）。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-3">创建切片</h3>
        <div class="mb-4"><Code language="go" :code="sliceCreateCode" title="slice_create.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-3">切片操作（共享底层数组）</h3>
        <div class="mb-4"><Code language="go" :code="sliceShareCode" title="slice_share.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>append 与 copy</h2>
        <h3 class="text-base font-semibold text-slate-700 mb-3">append 追加</h3>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">append</code> 向切片追加元素。如果容量不够会自动扩容（通常是翻倍），并返回新的切片<strong>（务必接收返回值！）</strong>。</p>
        <div class="mb-4"><Code language="go" :code="appendCode" title="append.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-3">copy 拷贝</h3>
        <div class="mb-4"><Code language="go" :code="copyCode" title="copy.go" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>nil 切片 vs 空切片</h2>
        <p class="text-slate-600 mb-3 leading-relaxed">两者 len 和 cap 都是 0，但 <strong>nil 切片等于 nil</strong>，空切片不等于 nil。JSON 序列化时 nil 切片变成 null，空切片变成 []。</p>
        <div class="mb-4"><Code language="go" :code="nilVsEmptyCode" title="nil_vs_empty.go" /></div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>常见错误</h2>
        <div class="space-y-4">
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">1. 不接收 append 的返回值</h3>
            <div class="mb-3"><Code language="go" :code="appendErrCode" title="append_error.go" /></div>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">2. 切片越界</h3>
            <p class="text-slate-600 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">s[5]</code> 当 len(s)=3 时触发 panic。操作前检查 len 或使用 range 遍历。</p>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">3. 多个切片共享底层数组导致的意外修改</h3>
            <p class="text-slate-600 leading-relaxed">从一个切片创建子切片时，它们<strong>共享同一底层数组</strong>。修改一个会影响另一个。需要独立副本时用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">copy</code>。</p>
          </div>
        </div>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>数组</strong>长度固定，值类型；<strong>切片</strong>动态长度，引用类型</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>创建切片优先用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">make([]T, len, cap)</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>append 必须接收返回值：</strong><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">s = append(s, v)</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>切片共享底层数组，修改需谨慎；需要独立副本用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">copy</code></span></li>
        </ul>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-7-functions-advanced" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：函数进阶</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-9-maps" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：Map 映射 →</RouterLink>
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
    { id: "sec-1", name: "概述" },
    { id: "sec-2", name: "数组（Array）" },
    { id: "sec-3", name: "切片（Slice）" },
    { id: "sec-4", name: "append 与 copy" },
    { id: "sec-5", name: "nil 切片 vs 空切片" },
    { id: "sec-6", name: "常见错误" },
    { id: "sec-7", name: "小结" }
  ]
const arrayCode = `// 声明（零值初始化）
var arr1 [3]int           // [0, 0, 0]
// 字面量
arr2 := [4]string{"Go", "Rust", "Python", "Java"}
// 自动推导长度
arr3 := [...]float64{1.1, 2.2, 3.3}
// 稀疏初始化
arr4 := [5]int{0: 100, 4: 500}  // [100, 0, 0, 0, 500]
// 值类型：赋值会复制整个数组
orig := [3]int{1, 2, 3}
cp := orig; cp[0] = 999
// orig=[1,2,3], cp=[999,2,3]`

const sliceCreateCode = `// 字面量
s1 := []int{1, 2, 3, 4, 5}
// make([]T, len, cap)
s2 := make([]int, 3, 5) // len=3, cap=5
s3 := make([]int, 3)    // len=cap=3
// 从数组/切片创建
arr := [5]int{10, 20, 30, 40, 50}
s4 := arr[1:4] // [20, 30, 40], len=3, cap=4（从索引1到数组末尾）`

const sliceShareCode = `arr := [5]int{10, 20, 30, 40, 50}
s := arr[1:4]        // [20, 30, 40]
s[0] = 999           // 修改切片
fmt.Println(arr)     // [10, 999, 30, 40, 50] ← 底层数组也被改了！
// 截取操作: s[2:5], s[:4], s[6:], s[:]`

const appendCode = `s := []int{1, 2, 3}        // len=3, cap=3
s = append(s, 4, 5)        // len=5, cap=6（自动扩容）
s = append(s, []int{6,7}...) // 合并另一个切片
// 扩容规律（Go 1.18+）：
// 容量<256 时翻倍，>=256 时增长约 25%`

const copyCode = `src := []int{1, 2, 3, 4, 5}
dst := make([]int, 3)
n := copy(dst, src)  // n=3, dst=[1,2,3]
// copy 只会拷贝 min(len(dst), len(src)) 个元素`

const nilVsEmptyCode = `var nilS []int       // nil 切片
emptyS := []int{}     // 空切片
// 两者 len=0, cap=0
// nilS == nil  → true（JSON: null）
// emptyS == nil → false（JSON: []）`

const appendErrCode = `// ❌ 错误：append 不改变原切片
s := []int{1, 2, 3}
append(s, 4)          // 编译错误：未使用返回值
// ✅ 正确
s = append(s, 4)      // s = [1,2,3,4]`
</script>
