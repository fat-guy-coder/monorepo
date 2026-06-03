<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div><h1 class="text-2xl font-bold text-slate-800">数组与切片</h1><p class="text-sm text-slate-500 mt-1">Go 语言最重要的数据结构——深入理解内存模型</p></div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-8-arrays-slices.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-8</span>
        </div>
      </div>
    </header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 概述 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📦</span>概述</h2>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Go 的数组 ≈ JS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">new Array(5).fill(0)</code>——长度固定的连续内存块。<br/>
          Go 的切片 ≈ JS 的普通数组 <code class="bg-purple-100 px-1 rounded text-xs font-mono">[1,2,3]</code>——动态长度、可以 append、可以 slice 截取。<br/>
          关键区别：Go 切片底层是<strong>共享内存</strong>的，两个切片可能指向同一块底层数组——这既是性能优势（零拷贝截取），也是 bug 来源（意外修改）。
          </p>
        </aside>

        <p class="text-slate-600 mb-3 leading-relaxed">Go 提供两种集合类型：<strong>数组</strong>（编译时定长，值类型）和 <strong>切片</strong>（运行时动态，引用语义）。日常开发中 99% 的情况都在用切片——数组主要出现在底层实现和内存布局优化中。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse">
          <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">数组 [N]T</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">切片 []T</th></tr></thead>
          <tbody class="text-slate-600">
            <tr><td class="px-4 py-2 border border-slate-200">长度</td><td class="px-4 py-2 border border-slate-200">编译时固定，是类型一部分</td><td class="px-4 py-2 border border-slate-200">运行时可变</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200">传递方式</td><td class="px-4 py-2 border border-slate-200"><strong>值拷贝</strong>——整个数组复制</td><td class="px-4 py-2 border border-slate-200"><strong>引用</strong>——只复制 header（24 字节）</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200">内存位置</td><td class="px-4 py-2 border border-slate-200">栈上（小数组）或作为结构体字段</td><td class="px-4 py-2 border border-slate-200">header 在栈上，数据在堆上</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200">零值</td><td class="px-4 py-2 border border-slate-200">每个元素都是零值</td><td class="px-4 py-2 border border-slate-200"><strong>nil</strong></td></tr>
            <tr><td class="px-4 py-2 border border-slate-200">使用频率</td><td class="px-4 py-2 border border-slate-200">低</td><td class="px-4 py-2 border border-slate-200"><strong>极高</strong></td></tr>
          </tbody>
        </table></div>
      </section>

      <!-- 数组 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>数组（Array）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">数组长度<strong>编译时确定</strong>且不可改变。长度是类型的一部分——<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">[3]int</code> 和 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">[5]int</code> 是不同的类型，不能互相赋值。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-3">声明与初始化</h3>
        <div class="mb-4"><Code language="go" :code="arrayCode" title="array.go" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">数组是值类型——这很重要</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">Go 的数组和 C 不一样，<strong>不是首元素指针</strong>。赋值和传参会<strong>复制整个数组</strong>。</p>
        <div class="mb-4"><Code language="go" :code="arrayValueCode" title="array_value.go" /></div>
        <p class="text-slate-600 mb-3 leading-relaxed">这个设计有它的道理：数组通常在<strong>栈上分配</strong>，小数组的值拷贝比堆分配+GC 更快。但大数组（如 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">[100000]byte</code>）传参应该用指针 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">*[100000]byte</code> 或直接用切片。</p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">什么时候用数组而不是切片？</h3>
        <ul class="space-y-1 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>长度是<strong>编译期常量</strong>且不会变的场景（如 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">[32]byte</code> 做 SHA256 哈希）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>作为<strong>结构体字段</strong>，让整个结构体的内存在栈上连续分配</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>需要<strong>固定大小的缓冲区</strong>（如 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">var buf [4096]byte</code>）</span></li>
        </ul>
      </section>

      <!-- 切片内部结构 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>切片内部结构（Slice Header）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">理解切片的内存模型是正确使用它的关键。切片本身是一个<strong>24 字节的 struct</strong>（在 64 位系统上）：</p>

        <div class="mb-4"><Code language="go" :code="sliceHeaderCode" title="slice_header.go" /></div>

        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse">
          <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">字段</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类型</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th></tr></thead>
          <tbody class="text-slate-600">
            <tr><td class="px-4 py-2 border border-slate-200">Pointer</td><td class="px-4 py-2 border border-slate-200">unsafe.Pointer</td><td class="px-4 py-2 border border-slate-200">指向底层数组中<strong>第一个可用元素</strong>的指针</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200">Len</td><td class="px-4 py-2 border border-slate-200">int</td><td class="px-4 py-2 border border-slate-200">切片当前包含的元素个数（<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">len(s)</code>）</td></tr>
            <tr><td class="px-4 py-2 border border-slate-200">Cap</td><td class="px-4 py-2 border border-slate-200">int</td><td class="px-4 py-2 border border-slate-200">从 Pointer 到<strong>底层数组末尾</strong>的元素个数（<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">cap(s)</code>）</td></tr>
          </tbody>
        </table></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          切片的 header 就像 JS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">{ data: ArrayBuffer, offset: number, length: number }</code> ——比如 Node.js 的 Buffer 或浏览器的 TypedArray。<br/>
          <code class="bg-purple-100 px-1 rounded text-xs font-mono">s[1:3]</code> 不复制数据，只是新建一个 header，Pointer 偏移 1 个元素，Len=2，Cap=原来的 Cap-1。这就是"零拷贝截取"。
          </p>
        </aside>
      </section>

      <!-- 切片操作 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>创建与截取切片</h2>

        <h3 class="text-base font-semibold text-slate-700 mb-3">创建方式</h3>
        <div class="mb-4"><Code language="go" :code="sliceCreateCode" title="slice_create.go" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">截取操作（共享底层数组！）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">对切片截取（<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">s[low:high]</code>）<strong>不复制数据</strong>——新旧切片共享同一底层数组。这意味着修改子切片会影响原切片。</p>
        <div class="mb-4"><Code language="go" :code="sliceShareCode" title="slice_share.go" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">截取对 Cap 的影响</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">截取后的 cap 是从 low 到<strong>原切片底层数组末尾</strong>的长度，不是到 high。这个"多余的容量"是 append 关键行为的基础。</p>
        <div class="mb-4"><Code language="go" :code="sliceCapCode" title="slice_cap.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑：</strong>截取后 append 可能<strong>覆盖</strong>原切片后面的元素。如果你不确定后续会不会 append，用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">s[low:high:high]</code>（三索引截取）限制 cap。</p>
        </aside>
      </section>

      <!-- append 深入 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>append 深入</h2>

        <h3 class="text-base font-semibold text-slate-700 mb-3">基本用法</h3>
        <p class="text-slate-600 mb-3 leading-relaxed"><code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">append</code> 接收一个切片和若干元素，返回新的切片。<strong>必须接收返回值</strong>——append 不修改原切片 header，而是返回更新后的 header。</p>
        <div class="mb-4"><Code language="go" :code="appendCode" title="append.go" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">append 的扩容机制</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">当 len == cap 时 append 需要<strong>分配新底层数组</strong>。Go 的扩容策略（1.18+）：</p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>cap &lt; 256</strong> 时：新 cap ≈ 旧 cap × 2（翻倍）</li>
          <li><strong>cap ≥ 256</strong> 时：新 cap ≈ 旧 cap + (旧 cap + 3×256) / 4（约增长 25%）</li>
          <li>实际分配还会<strong>对齐内存</strong>——runtime 会向上取整到合适的内存大小类别</li>
        </ol>
        <div class="mb-4"><Code language="go" :code="appendGrowCode" title="append_grow.go" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">append 后新旧切片的关系</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">这是最容易出错的点：</p>
        <ul class="space-y-1 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>cap 够用时</strong>：append 在原底层数组上追加，新旧切片<strong>共享底层数组</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>cap 不够时</strong>：append 分配新数组、复制数据，新旧切片<strong>不再共享</strong></span></li>
        </ul>
        <div class="mb-4"><Code language="go" :code="appendSharedCode" title="append_shared.go" /></div>
      </section>

      <!-- copy 与切片技巧 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>copy 与切片技巧</h2>

        <h3 class="text-base font-semibold text-slate-700 mb-3">copy 拷贝</h3>
        <div class="mb-4"><Code language="go" :code="copyCode" title="copy.go" /></div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">实用切片操作</h3>
        <div class="mb-4"><Code language="go" :code="sliceTricksCode" title="slice_tricks.go" /></div>
      </section>

      <!-- nil vs empty -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>nil 切片 vs 空切片</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">这是一个<strong>面试常考题</strong>。两者 len 和 cap 都是 0，行为也基本一样（都可以 append、range 遍历 0 次），但有细微差别：</p>
        <div class="mb-4"><Code language="go" :code="nilVsEmptyCode" title="nil_vs_empty.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 指南：</strong>声明变量用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">var s []int</code>（nil）。返回空集合用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">return []int{}, nil</code>（空切片）——调用方拿到的是 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">[]</code> 而不是 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">null</code>。</p>
        </aside>
      </section>

      <!-- 常见错误 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>常见错误与陷阱</h2>
        <div class="space-y-5">
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">1. 忘记接收 append 返回值</h3>
            <div class="mb-3"><Code language="go" :code="appendErrCode" title="append_error.go" /></div>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">2. 截取后 append 覆盖原切片数据</h3>
            <div class="mb-3"><Code language="go" :code="sliceOverlapCode" title="slice_overlap.go" /></div>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">3. range 遍历时取地址</h3>
            <div class="mb-3"><Code language="go" :code="rangeAddrCode" title="range_addr.go" /></div>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">4. 循环中往切片 append — 每次扩容都复制</h3>
            <p class="text-slate-600 leading-relaxed">如果知道最终长度，用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">make([]T, 0, expectedLen)</code> 预分配 cap，避免多次扩容的内存分配。</p>
          </div>
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">5. 函数内 append 后外部看不到变化</h3>
            <p class="text-slate-600 leading-relaxed">append <strong>可能</strong>分配新数组。如果函数内 append 触发了扩容，函数外部的原切片仍然指向旧数组。解决方案：传指针 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">*[]int</code> 或返回新切片。</p>
          </div>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>切片不是数组的引用——它是一个 24 字节的 header</strong>（Pointer+Len+Cap），值传递只复制 header</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>截取不复制数据——新旧切片<strong>共享底层数组</strong>，修改互相可见</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>append 必须接收返回值</strong>（扩容时 header 变了）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>append 在 cap 够用时在原数组上追加（<strong>小心覆盖</strong>），不够时分配新数组</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>预知长度时用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">make([]T, 0, cap)</code> 避免多次扩容</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>返回空集合用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">[]int{}</code> 而不是 nil（JSON 友好）</span></li>
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
  { id: "sec-3", name: "切片内部结构" },
  { id: "sec-4", name: "创建与截取切片" },
  { id: "sec-5", name: "append 深入" },
  { id: "sec-6", name: "copy 与切片技巧" },
  { id: "sec-7", name: "nil vs 空切片" },
  { id: "sec-8", name: "常见错误" },
  { id: "sec-9", name: "小结" },
]

const arrayCode = `var arr1 [3]int                        // [0,0,0] 零值
arr2 := [4]string{"Go","Rust","Python","Java"}
arr3 := [...]float64{1.1, 2.2, 3.3}   // ... 自动推导长度
arr4 := [5]int{0: 100, 4: 500}        // [100,0,0,0,500] 稀疏初始化
for i, v := range arr2 { fmt.Println(i, v) }
// [3]int 和 [5]int 是不同类型，不能互相赋值`

const arrayValueCode = `orig := [3]int{1, 2, 3}
cp := orig; cp[0] = 999
// orig = [1, 2, 3], cp = [999, 2, 3] ← 值拷贝，互不影响！

func modify(arr [3]int) { arr[0] = 999 } // 修改的是副本
a := [3]int{1, 2, 3}; modify(a)
// a = [1, 2, 3] ← 没变！

// 要大数组传参不复制？用指针
func modifyPtr(arr *[3]int) { arr[0] = 999 }  // 或直接用切片 []int`

const sliceHeaderCode = `// 切片在运行时的内部表示（reflect.SliceHeader）
type SliceHeader struct {
    Data uintptr  // 指向底层数组的指针
    Len  int      // 当前元素个数
    Cap  int      // 容量（底层数组从 Data 开始可用的元素数）
}
// s := make([]int, 3, 5) 的内存布局：
//   Data ──→ [0][0][0][_][_]   ← 底层数组（5 个 int）
//   Len  = 3                    ← 前 3 个是有效的
//   Cap  = 5                    ← 总共可以放 5 个

// 传切片给函数：只复制 header（24 字节），不复制数据
func process(s []int) { s[0] = 99 } // 改动对外部可见！`

const sliceCreateCode = `// 字面量
s1 := []int{1, 2, 3, 4, 5}
// make([]T, len, cap) — 最常用的创建方式
s2 := make([]int, 3, 5)  // len=3, cap=5 → [0,0,0]，可 append 2 个不扩容
s3 := make([]int, 3)     // len=cap=3 → [0,0,0]
// 从数组/切片创建 — 共享底层数组！
arr := [5]int{10, 20, 30, 40, 50}
s4 := arr[1:4]           // [20,30,40], len=3, cap=4（从 arr[1] 到 arr 末尾）
s5 := []int{}            // 空切片（非 nil）
var s6 []int             // nil 切片`

const sliceShareCode = `arr := [5]int{10, 20, 30, 40, 50}
s := arr[1:4]          // [20, 30, 40]
s[0] = 999             // ← 修改切片元素
fmt.Println(arr)       // [10, 999, 30, 40, 50] ← 底层数组也被改了！

// 截取语法: s[low:high]
// low  ≤ high ≤ cap（不是 len！）
// 省略 low 默认 0，省略 high 默认 len(s)
sub := s[1:3]          // [30, 40]`

const sliceCapCode = `arr := [5]int{10, 20, 30, 40, 50}
s := arr[1:3]          // [20, 30], len=2, cap=4
// cap=4 是因为从 arr[1] 到 arr 末尾还有 4 个元素
s = append(s, 99)      // cap 够用，在底层数组 arr[3] 位置写 99
fmt.Println(arr)       // [10, 20, 30, 99, 50] ← arr[3] 被覆盖！

// 三索引截取 s[low:high:max] — 限制 cap = max - low
s2 := arr[1:3:3]       // [20, 30], len=2, cap=2
// s2 = append(s2, 99) // cap 不够，分配新数组，不影响 arr`

const appendCode = `s := []int{1, 2, 3}           // len=3, cap=3
s = append(s, 4)              // len=4, cap=6（扩容了）
s = append(s, 5, 6, 7)        // 一次追加多个
s = append(s, []int{8,9}...)  // 合并另一个切片（... 展开）
// ⚠️ append 必须接收返回值——header 可能改变（扩容时）`

const appendGrowCode = `// 观察扩容行为
var s []int
for i := 0; i < 10; i++ {
    s = append(s, i)
    fmt.Printf("len=%d cap=%d\n", len(s), cap(s))
}
// len=1 cap=1
// len=2 cap=2
// len=3 cap=4   ← 翻倍
// len=5 cap=8   ← 翻倍
// len=9 cap=16  ← 翻倍（cap<256 时）`

const appendSharedCode = `s1 := make([]int, 0, 3)
s1 = append(s1, 1, 2)
s2 := s1                    // s1 和 s2 共享底层数组

s2 = append(s2, 3)          // cap 还够（cap=3, len=2→3），在原数组追加
fmt.Println(s1) // [1, 2]   ← len 没变
fmt.Println(s2) // [1, 2, 3]

s2 = append(s2, 4)          // cap 不够了，分配新数组
s2[0] = 999                 // 修改 s2 不影响 s1
fmt.Println(s1) // [1, 2]   ← s1 还是指向旧数组
fmt.Println(s2) // [999, 2, 3, 4]`

const copyCode = `src := []int{1, 2, 3, 4, 5}
dst := make([]int, 3)
n := copy(dst, src)          // n=3, dst=[1,2,3]
// copy 拷贝 min(len(dst), len(src)) 个元素，返回拷贝数量

// 深拷贝切片：先 make 再 copy
orig := []int{1, 2, 3}
clone := make([]int, len(orig))
copy(clone, orig)            // clone 和 orig 完全独立`

const sliceTricksCode = `// 删除索引 i 的元素（保持顺序）
s = append(s[:i], s[i+1:]...)
// 删除索引 i 的元素（不保持顺序，更高效）
s[i] = s[len(s)-1]; s = s[:len(s)-1]
// 删除 [i, j) 范围的元素
s = append(s[:i], s[j:]...)
// 过滤（保留符合条件的）
filtered := s[:0]
for _, v := range s { if v > 0 { filtered = append(filtered, v) } }
// 反转
for i := len(s)/2-1; i >= 0; i-- { j := len(s)-1-i; s[i], s[j] = s[j], s[i] }
// 去重（已排序）
uniq := s[:1]; for i := 1; i < len(s); i++ { if s[i] != s[i-1] { uniq = append(uniq, s[i]) } }`

const nilVsEmptyCode = `var nilS []int             // nil 切片
emptyS := []int{}           // 空切片（非 nil）
madeS := make([]int, 0)     // 空切片（非 nil）
// 三者 len=0, cap=0
// nilS == nil  → true   (JSON: null)
// emptyS == nil → false  (JSON: [])
// madeS == nil  → false  (JSON: [])
// 都可以 append，都可以 range（0 次）
// 区别在于 JSON 序列化和 nil 判断`

const appendErrCode = `// ❌ 错误
s := []int{1, 2, 3}
append(s, 4)       // 编译错误：append 返回值未使用
// ✅ 正确
s = append(s, 4)   // 必须接收返回值`

const sliceOverlapCode = `orig := []int{1, 2, 3, 4, 5}
sub := orig[:3]        // [1, 2, 3], cap=5（注意 cap！）
sub = append(sub, 99)  // cap 够，在原数组上追加
fmt.Println(orig)      // [1, 2, 3, 99, 5] ← orig[3] 被改了！
// 解决方案：限制 cap
sub := orig[:3:3]      // cap=3，后续 append 必扩容分配新数组`

const rangeAddrCode = `// ❌ range 的循环变量地址是同一个！
var ptrs []*int
for _, v := range []int{1, 2, 3} {
    ptrs = append(ptrs, &v)  // ← 都是 &v，而 v 在每次迭代被覆盖
}
for _, p := range ptrs { fmt.Println(*p) }
// 输出: 3 3 3（全是最后一个值！）
// ✅ 正确：用临时变量
for _, v := range []int{1, 2, 3} {
    v := v // 创建新变量
    ptrs = append(ptrs, &v)
}
// 或直接用索引访问原始切片
for i := range items { ptrs = append(ptrs, &items[i]) }`
</script>
import { Code, EditorLink, Nav } from 'components'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-1", name: "概述" },
  { id: "sec-2", name: "数组（Array）" },
  { id: "sec-3", name: "切片内部结构" },
  { id: "sec-4", name: "创建与截取切片" },
  { id: "sec-5", name: "append 深入" },
  { id: "sec-6", name: "copy 与切片技巧" },
  { id: "sec-7", name: "nil vs 空切片" },
  { id: "sec-8", name: "常见错误" },
  { id: "sec-9", name: "小结" },
]

const arrayCode = `// 声明与初始化
var arr1 [3]int                        // [0, 0, 0] — 零值
arr2 := [4]string{"Go", "Rust", "Python", "Java"}
arr3 := [...]float64{1.1, 2.2, 3.3}   // ... 自动推导长度
arr4 := [5]int{0: 100, 4: 500}        // [100, 0, 0, 0, 500] 稀疏初始化

// 遍历
for i, v := range arr2 { fmt.Printf("arr[%d] = %s\n", i, v) }

// 长度是类型的一部分 — 下面两行编译错误！
// var a [3]int; var b [5]int; a = b  // ❌ 不同类型`