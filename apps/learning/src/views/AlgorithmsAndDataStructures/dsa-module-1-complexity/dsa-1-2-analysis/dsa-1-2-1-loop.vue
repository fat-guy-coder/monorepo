<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔄 循环分析：单层 / 嵌套 / 对数循环</h1>
          <p class="text-sm text-slate-500 mt-1">一眼看穿循环的时间复杂度——从单层到嵌套，从线性到对数</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 1-2-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 循环分析总框架 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          循环分析的统一框架 —— 一问一答
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          分析任何循环的复杂度，核心问题只有<strong>一个</strong>：
        </p>
        <div class="bg-cyan-50 rounded-xl p-4 border border-cyan-200 mb-4">
          <p class="text-cyan-800 text-lg text-center font-bold">「循环体一共执行了多少次？」</p>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          回答这个问题需要看三个要素：<strong>循环变量的变化规律</strong>、<strong>循环条件</strong>、<strong>嵌套结构</strong>。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">循环模式</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特征</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">示例</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">单层递增</td><td class="px-4 py-2 border"><code class="bg-slate-100 px-1 rounded">i++</code> 或 <code class="bg-slate-100 px-1 rounded">i+=c</code></td><td class="px-4 py-2 border font-mono text-blue-600">O(n)</td><td class="px-4 py-2 border font-mono">for (let i=0; i&lt;n; i++)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">单层倍增</td><td class="px-4 py-2 border"><code class="bg-slate-100 px-1 rounded">i*=2</code> 或 <code class="bg-slate-100 px-1 rounded">i*=k</code></td><td class="px-4 py-2 border font-mono text-emerald-600">O(log n)</td><td class="px-4 py-2 border font-mono">for (let i=1; i&lt;n; i*=2)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">单层倍减</td><td class="px-4 py-2 border"><code class="bg-slate-100 px-1 rounded">i/=2</code> 或 <code class="bg-slate-100 px-1 rounded">i/=k</code></td><td class="px-4 py-2 border font-mono text-emerald-600">O(log n)</td><td class="px-4 py-2 border font-mono">for (let i=n; i>0; i/=2)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">嵌套双循环</td><td class="px-4 py-2 border">内外都走 n 次</td><td class="px-4 py-2 border font-mono text-amber-600">O(n²)</td><td class="px-4 py-2 border font-mono">for (...i) for (...j)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">外层递增+内层倍增</td><td class="px-4 py-2 border">外 O(n) × 内 O(log n)</td><td class="px-4 py-2 border font-mono text-blue-600">O(n log n)</td><td class="px-4 py-2 border font-mono">遍历 + 每步二分</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 2. 单层循环 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          单层循环：线性、对数、平方根
        </h2>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          单层循环的关键是看<strong>循环变量怎么变</strong>——+1、×2、÷2 决定完全不同量级。
        </p>

        <div class="mb-4"><Code language="ts" :code="singleLoopCode" title="single_loop.ts" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见混淆：</strong><code>for (let i = 0; i &lt; n; i += 2)</code> — i 每次 +2，循环执行 n/2 次，<strong>复杂度还是 O(n)，不是 O(n/2)！</strong><br/>
          常数系数（n/2 中的 1/2）在大O中被丢弃。</p>
        </aside>
      </section>

      <!-- 3. 双重嵌套 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          双重嵌套循环 —— 不一定都是 O(n²)！
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          嵌套循环的复杂度是 <strong>外循环次数 × 内循环每次的迭代次数</strong>。关键陷阱：内循环次数<strong>可能不是常数</strong>！
        </p>

        <div class="mb-4"><Code language="ts" :code="nestedCode" title="nested_loop.ts" /></div>
      </section>

      <!-- 4. 内循环递减模式 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          内循环递减模式 —— 等差数列求和
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          这是最常见的"看起来像 O(n²) 但其实还是 O(n²)"的模式，面试必考。
        </p>

        <div class="mb-4"><Code language="ts" :code="decreasingCode" title="decreasing_inner.ts" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 等差数列求和公式：</strong><br/>
          n + (n-1) + (n-2) + ... + 1 = <strong>n(n+1)/2 ≈ n²/2</strong><br/>
          所以这些循环虽然内层递减，但<strong>总执行次数仍然是 Θ(n²)</strong>。<br/>
          常见于：选择排序、冒泡排序、插入排序的最坏情况。</p>
        </aside>
      </section>

      <!-- 5. 多变量循环 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          多变量 / 独立循环 —— 不易归约的情况
        </h2>
        <div class="mb-4"><Code language="ts" :code="multiVarCode" title="multi_variable.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          就像分析一个嵌套渲染组件的成本——外层 map 遍历 rows（m 行），内层 map 遍历 cols（n 列）。<br/>
          复杂度是 O(m × n)，不能说成 O(n²)。因为你改列数不会影响行循环次数。</p>
        </aside>
      </section>

      <!-- 6. 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>单层 +1 递增 → O(n)</strong>；+c 常数值 → 仍为 O(n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>单层 ×2 倍增或 ÷2 倍减 → O(log n)</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>嵌套双循环（内外都是 n）→ O(n²)</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>内循环次数递减但等差求和 → 仍是 Θ(n²)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>独立变量 m × n → O(m × n)，不能写成 O(n²)</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>三/四重嵌套 → O(n³)/O(n⁴)，一般情况下先考虑能否降维</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-1-complexity/dsa-1-1-big-o/dsa-1-1-4-common" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：常见复杂度速查</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-1-complexity/dsa-1-2-analysis/dsa-1-2-2-recursive" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：递归分析与主定理 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-1", name: "循环分析总框架" },
  { id: "sec-2", name: "单层循环" },
  { id: "sec-3", name: "双重嵌套循环" },
  { id: "sec-4", name: "内循环递减模式" },
  { id: "sec-5", name: "多变量/独立循环" },
  { id: "sec-6", name: "小结" },
]

const singleLoopCode = `// ─── 模式1：i++ / i+=常数值 → O(n) ───
for (let i = 0; i < n; i++) {       // n 次
    console.log(i)
}

for (let i = 0; i < n; i += 2) {    // n/2 次 → 仍为 O(n)
    console.log(i)
}
// 常数步长不改变复杂度级别——大O会把 /2 这个常数扔掉

// ─── 模式2：i *= 2（倍增）→ O(log n) ───
for (let i = 1; i < n; i *= 2) {    // log₂ n 次
    console.log(i)                   // i: 1, 2, 4, 8, 16, ... < n
}
// i 以指数速度增长 → 循环次数 = log₂ n

// ─── 模式3：i /= 2（倍减）→ O(log n) ───
for (let i = n; i > 0; i = Math.floor(i / 2)) {
    console.log(i)                   // i: n, n/2, n/4, ... > 0
}                                    // 循环次数 = log₂ n

// ─── 模式4：i *= 3 → 底数是3的对数 → 同样是 O(log n) ───
for (let i = 1; i < n; i *= 3) {    // log₃ n = log₂ n / log₂ 3 ≈ O(log n)
    console.log(i)
}
// 换底公式：logₐ n = log n / log a → 常数因子 → O(log n)

// ─── 模式5：平方根循环 → O(√n) ───
for (let i = 0; i * i < n; i++) {   // i 从 0 到 √n → √n 次
    console.log(i)                   // 用于判断素数等场景
}`

const nestedCode = `// ─── 标准 O(n²)：内外循环都是 n 次 ───
for (let i = 0; i < n; i++) {        // n 次
    for (let j = 0; j < n; j++) {    // 每次内循环 n 次
        console.log(i, j)             // 总计 n × n = n² 次
    }
}

// ─── i 不影响内循环 → 还是 O(n²) ───
for (let i = 0; i < n; i++) {
    for (let j = 0; j < 100; j++) {  // ⚠️ 内循环固定 100 次！
        console.log(i, j)             // 总计 n × 100 = 100n → O(n)
    }
}
// 关键区别：j < n → O(n²)；j < 100 → O(n)！

// ─── O(n log n)：外循环 n 次 × 内循环 log n 次 ───
for (let i = 0; i < n; i++) {        // n 次
    let j = 1
    while (j < n) {                  // log n 次（j 每次 ×2）
        console.log(i, j)
        j *= 2
    }
}
// 总计 n × log n → O(n log n)`

const decreasingCode = `// ─── 内循环递减但等差求和 = Θ(n²) ───

// 模式A：j = i+1 开始
for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {  // 内循环：n-1, n-2, ..., 1 次
        console.log(i, j)
    }
}
// 总计：(n-1)+(n-2)+...+1 = n(n-1)/2 ≈ n²/2 = O(n²)

// 模式B：冒泡排序的内循环
for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) { // n-1, n-2, ..., 1
        if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        }
    }
}
// 总比较次数：n(n-1)/2 = O(n²)

// 模式C：j = 0 到 i
for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {      // 内循环：0, 1, 2, ..., n-1 次
        console.log(i, j)
    }
}
// 总计：0+1+2+...+(n-1) = n(n-1)/2 = O(n²)

// ─── 公式记忆 ───
// 1+2+...+(n-1) = n(n-1)/2 = Θ(n²)
// 0+1+2+...+(n-1) = n(n-1)/2 = Θ(n²)（和上式完全一样）`

const multiVarCode = `// ─── 独立变量：O(m × n) ≠ O(n²) ───
function processMatrix(matrix: number[][]): void {
    const m = matrix.length       // 行数
    const n = matrix[0].length    // 列数
    for (let i = 0; i < m; i++) {      // m 次
        for (let j = 0; j < n; j++) {  // n 次
            console.log(matrix[i][j])   // 总计 m × n 次
        }
    }
}
// ⚠️ 写成 O(n²) 是错的——m 和 n 是独立的量
// 正确：O(m × n)，如果 m=n 才等于 O(n²)

// ─── 多循环顺序执行：取 max ───
function multiPass(arr: number[]): void {
    const n = arr.length
    // 段1：O(n²)
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            doSth(i, j)
    // 段2：O(n log n)
    arr.sort((a, b) => a - b)
    // 段3：O(n)
    for (const x of arr) doSth(x)
}
// O(n² + n log n + n) = O(n²)  ← 加法取max

// ─── 循环内有 O(k) 操作 ───
for (let i = 0; i < n; i++) {
    const sub = arr.slice(i, i + k)  // slice 是 O(k)
    process(sub)
}
// 外循环 n 次 × 每次 O(k) = O(n × k)`
</script>
