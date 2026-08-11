<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📊 常见复杂度速查：O(1) / O(log n) / O(n) / O(n log n) / O(n²)</h1>
          <p class="text-sm text-slate-500 mt-1">七大常见复杂度——从最快到最慢，看到代码一眼认出</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 1-1-4</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 复杂度全景排名 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          复杂度全景排名 —— 从最快到最慢
        </h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">级别</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">记号</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">名称</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">n=10⁶ 时操作数</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">评价</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr class="bg-emerald-50"><td class="px-4 py-2 border font-mono text-xs font-bold">🟢</td><td class="px-4 py-2 border font-mono text-sm text-emerald-600 font-bold">O(1)</td><td class="px-4 py-2 border">常数</td><td class="px-4 py-2 border font-mono text-xs">1</td><td class="px-4 py-2 border text-emerald-700 text-xs">完美</td></tr>
              <tr class="bg-emerald-50"><td class="px-4 py-2 border font-mono text-xs font-bold">🟢</td><td class="px-4 py-2 border font-mono text-sm text-emerald-600 font-bold">O(log n)</td><td class="px-4 py-2 border">对数</td><td class="px-4 py-2 border font-mono text-xs">~20</td><td class="px-4 py-2 border text-emerald-700 text-xs">非常好</td></tr>
              <tr class="bg-blue-50"><td class="px-4 py-2 border font-mono text-xs font-bold">🔵</td><td class="px-4 py-2 border font-mono text-sm text-blue-600 font-bold">O(√n)</td><td class="px-4 py-2 border">平方根</td><td class="px-4 py-2 border font-mono text-xs">1,000</td><td class="px-4 py-2 border text-blue-700 text-xs">好</td></tr>
              <tr class="bg-blue-50"><td class="px-4 py-2 border font-mono text-xs font-bold">🔵</td><td class="px-4 py-2 border font-mono text-sm text-blue-600 font-bold">O(n)</td><td class="px-4 py-2 border">线性</td><td class="px-4 py-2 border font-mono text-xs">10⁶</td><td class="px-4 py-2 border text-blue-700 text-xs">标准</td></tr>
              <tr class="bg-amber-50"><td class="px-4 py-2 border font-mono text-xs font-bold">🟡</td><td class="px-4 py-2 border font-mono text-sm text-amber-600 font-bold">O(n log n)</td><td class="px-4 py-2 border">线性对数</td><td class="px-4 py-2 border font-mono text-xs">~2×10⁷</td><td class="px-4 py-2 border text-amber-700 text-xs">可接受</td></tr>
              <tr class="bg-orange-50"><td class="px-4 py-2 border font-mono text-xs font-bold">🟠</td><td class="px-4 py-2 border font-mono text-sm text-orange-600 font-bold">O(n²)</td><td class="px-4 py-2 border">平方</td><td class="px-4 py-2 border font-mono text-xs">10¹²</td><td class="px-4 py-2 border text-orange-700 text-xs">n &gt; 10⁴ 不可用</td></tr>
              <tr class="bg-red-50"><td class="px-4 py-2 border font-mono text-xs font-bold">🔴</td><td class="px-4 py-2 border font-mono text-sm text-red-600 font-bold">O(2ⁿ)</td><td class="px-4 py-2 border">指数</td><td class="px-4 py-2 border font-mono text-xs">2¹⁰⁰⁰⁰⁰⁰</td><td class="px-4 py-2 border text-red-700 text-xs">n &gt; 20 不可用</td></tr>
              <tr class="bg-red-50"><td class="px-4 py-2 border font-mono text-xs font-bold">🔴</td><td class="px-4 py-2 border font-mono text-sm text-red-600 font-bold">O(n!)</td><td class="px-4 py-2 border">阶乘</td><td class="px-4 py-2 border font-mono text-xs">10⁶!</td><td class="px-4 py-2 border text-red-700 text-xs">n &gt; 10 不可用</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 刷题目标：</strong>绝大多数算法题，<strong>O(n log n) 是及格线，O(n) 是优秀，O(log n) 是极品。</strong><br/>
          面试中写出 O(n²) 的解法通常只能得"思路分"，O(2ⁿ) 和 O(n!) 只能当暴力解提一嘴然后立刻优化。</p>
        </aside>
      </section>

      <!-- 2. O(1) 和 O(log n) -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          O(1) 常数 & O(log n) 对数 — "王炸"组合
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-2">O(1) — 常数时间</h3>
        <p class="text-slate-600 text-sm mb-3">无论输入多大，操作次数<strong>不变</strong>。这是算法的终极目标。</p>
        <div class="mb-4"><Code language="ts" :code="constantCode" title="O(1)_examples.ts" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-2 mt-6">O(log n) — 对数时间</h3>
        <p class="text-slate-600 text-sm mb-3">每次操作后，问题规模<strong>减半</strong>（或除以一个常数）。"规模翻倍只需要多一步"。</p>
        <div class="mb-4"><Code language="ts" :code="logCode" title="O(log_n)_examples.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          O(log n) 就像在 1000 页的词典里查一个单词——每次翻到中间，排除一半，最多翻 <strong>10 次</strong>（log₂ 1000 ≈ 10）就能找到。<br/>
          Vue 虚拟 DOM 的 Diff 算法也是 O(n)（同级比较），而不是 O(n²)——因为做了"同层比较"的启发式优化。</p>
        </aside>
      </section>

      <!-- 3. O(n) 和 O(n log n) -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          O(n) 线性 & O(n log n) 线性对数 — "及格线"
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-2">O(n) — 线性时间</h3>
        <p class="text-slate-600 text-sm mb-3">处理每个元素<strong>一次</strong>（或常数次）。数据翻10倍，时间翻10倍。</p>
        <div class="mb-4"><Code language="ts" :code="linearCode" title="O(n)_examples.ts" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-2 mt-6">O(n log n) — 线性对数时间</h3>
        <p class="text-slate-600 text-sm mb-3"><strong>排序算法的最优复杂度</strong>。n 次"log n 级操作"，或 log n 层每层 n 次。</p>
        <div class="mb-4"><Code language="ts" :code="nlognCode" title="O(n_log_n)_examples.ts" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 O(n log n) 的直觉：</strong>归并排序的分治——分成 log n 层，每层合并所有元素（n 次）→ n × log n。<br/>
          大多数「排序 + 贪心」的题都是 O(n log n)。</p>
        </aside>
      </section>

      <!-- 4. O(n²) 及以上 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          O(n²) / O(2ⁿ) / O(n!) — "危险区"
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-2">O(n²) — 平方时间</h3>
        <p class="text-slate-600 text-sm mb-3"><strong>双重循环的标配</strong>。n=10⁴ 时 ≈ 1 亿次操作，在 LeetCode 通常是 TLE 边界。</p>
        <div class="mb-4"><Code language="ts" :code="quadraticCode" title="O(n²)_examples.ts" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-2 mt-6">O(2ⁿ) — 指数时间 & O(n!) — 阶乘时间</h3>
        <p class="text-slate-600 text-sm mb-3"><strong>O(2ⁿ) = 子集枚举/回溯</strong>。n=20 已经百万级，n=30 不可接受。<br/>
        <strong>O(n!) = 全排列</strong>。n=10 是 360 万，n=11 就翻 11 倍。只在 n≤10 时可用。</p>
        <div class="mb-4"><Code language="ts" :code="exponentialCode" title="O(2ⁿ)_O(n!)_examples.ts" /></div>
      </section>

      <!-- 5. 数据结构操作速查 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          日常算法操作的复杂度速查
        </h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">数据结构 / 操作</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">访问</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">查找</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">插入</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">删除</th>
              </tr>
            </thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold text-slate-700">Array (数组)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-slate-700">Linked List</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-slate-700">Stack / Queue</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-slate-700">Hash Map / Set</td><td class="px-4 py-2 border font-mono text-slate-400">—</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-slate-700">BST (平衡)</td><td class="px-4 py-2 border font-mono text-slate-400">—</td><td class="px-4 py-2 border font-mono text-blue-600">O(log n)</td><td class="px-4 py-2 border font-mono text-blue-600">O(log n)</td><td class="px-4 py-2 border font-mono text-blue-600">O(log n)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-slate-700">Heap (堆)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border font-mono text-blue-600">O(log n)</td><td class="px-4 py-2 border font-mono text-blue-600">O(log n)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 6. 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>O(1)</strong> ≡ 数组下标、Hash 查增删、数学公式</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>O(log n)</strong> ≡ 二分查找、平衡树、堆操作、快速幂</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>O(n)</strong> ≡ 单层循环、线性扫描、双指针、前缀和</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>O(n log n)</strong> ≡ 排序、归并/快排/堆排、分治+归并</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>O(n²)</strong> ≡ 双重循环、基础 DP、选择/冒泡/插入排序</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>O(2ⁿ)</strong> ≡ 子集枚举、递归树蛮力、回溯</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>O(n!)</strong> ≡ 全排列暴力，n≤10 才安全</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-1-complexity/dsa-1-1-big-o/dsa-1-1-3-rules" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：复杂度计算规则</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-1-complexity/dsa-1-2-analysis/dsa-1-2-1-loop" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：循环嵌套分析 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-1", name: "复杂度全景排名" },
  { id: "sec-2", name: "O(1) 和 O(log n)" },
  { id: "sec-3", name: "O(n) 和 O(n log n)" },
  { id: "sec-4", name: "O(n²) 及以上" },
  { id: "sec-5", name: "操作复杂度速查表" },
  { id: "sec-6", name: "小结" },
]

const constantCode = `// O(1)：无论数据多大，操作次数不变

// 数组下标访问
const val = arr[42]            // 1 次操作，O(1)

// Hash Map 读写
const map = new Map<number, string>()
map.set(1, "hello")            // O(1) 平均
const v = map.get(1)           // O(1) 平均

// 数学公式
const sum = n * (n + 1) / 2    // 1 次操作 = O(1)
// vs 用循环累加 → O(n)

// Stack 操作
stack.push(42)                 // O(1)
stack.pop()                    // O(1)

// 判断奇偶
if (n % 2 === 0) { /* ... */ }  // O(1)`

const logCode = `// O(log n)：每次操作后问题规模减半

// ─── 二分查找（最经典的 O(log n)）───
function binarySearch(arr: number[], target: number): number {
    let lo = 0, hi = arr.length - 1
    while (lo <= hi) {
        const mid = (lo + hi) >> 1  // 整数除法 取中间
        if (arr[mid] === target) return mid
        else if (arr[mid] < target) lo = mid + 1  // ← 排除左半
        else hi = mid - 1                          // ← 排除右半
    }
    return -1
}
// 每次循环，搜索区间减半 → log₂ n 次循环

// ─── 快速幂：计算 xⁿ 只用 O(log n) ───
function fastPow(x: number, n: number): number {
    let result = 1
    while (n > 0) {
        if (n & 1) result *= x   // 当前二进制位为 1 时乘
        x *= x                    // x → x² → x⁴ → x⁸ ...
        n >>= 1                   // n 除以 2
    }
    return result
}

// ─── 跳表 / 平衡树查找 ─── 都是 O(log n)
// for (let i = 1; i < n; i *= 2) { ... }  ← 也是 O(log n)`

const linearCode = `// O(n)：遍历每个元素一次（或常数次）

// 单层循环 —— 最基础的 O(n)
function findMax(arr: number[]): number {
    let maxVal = -Infinity
    for (let i = 0; i < arr.length; i++) {  // 每个元素访问 1 次
        if (arr[i] > maxVal) maxVal = arr[i]
    }
    return maxVal
}

// 多个并列循环 —— 注意：不是嵌套！
function process(arr: number[]): void {
    for (const x of arr) { doA(x) }   // O(n)
    for (const x of arr) { doB(x) }   // O(n)
    for (const x of arr) { doC(x) }   // O(n)
}
// O(n) + O(n) + O(n) = O(3n) = O(n)  ← 不是 O(n³)！

// 双指针 —— 也是 O(n)，每个元素只访问常数次
function twoSumSorted(arr: number[], target: number): boolean {
    let lo = 0, hi = arr.length - 1
    while (lo < hi) {
        const sum = arr[lo] + arr[hi]
        if (sum === target) return true
        else if (sum < target) lo++
        else hi--
    }
    return false
}
// 看似双重指针，实际每个元素最多访问 1 次 → O(n)`

const nlognCode = `// O(n log n)：最经典的排序复杂度

// ─── 归并排序（分治的典型）───
function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr
    const mid = arr.length >> 1
    const left = mergeSort(arr.slice(0, mid))   // 递归左半
    const right = mergeSort(arr.slice(mid))      // 递归右半
    return merge(left, right)                    // O(n) 合并
}
// 递归树深度 = log n 层，每层合并 n 个元素 → n × log n

function merge(a: number[], b: number[]): number[] {
    const res: number[] = []
    let i = 0, j = 0
    while (i < a.length && j < b.length) {
        res.push(a[i] < b[j] ? a[i++] : b[j++])
    }
    return res.concat(a.slice(i), b.slice(j))
}

// ─── 常见 O(n log n) 操作 ───
arr.sort((a, b) => a - b)           // JS sort = O(n log n)
// 堆的 build-heap                  // O(n log n) 或 O(n)
// for 循环里做 O(log n) 操作        // O(n log n)`

const quadraticCode = `// O(n²)：双重循环 / 基础排序

// ─── 经典双重循环 ───
function findAllPairs(arr: number[]): [number, number][] {
    const result: [number, number][] = []
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            result.push([arr[i], arr[j]])       // 约 n²/2 次
        }
    }
    return result
}

// ─── 选择排序 O(n²) ───
function selectionSort(arr: number[]): void {
    const n = arr.length
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i
        for (let j = i + 1; j < n; j++) {       // 内循环递减
            if (arr[j] < arr[minIdx]) minIdx = j
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
    }
}
// 比较次数 = (n-1)+(n-2)+...+1 = n(n-1)/2 ≈ n²/2 → O(n²)`

const exponentialCode = `// O(2ⁿ)：子集枚举 / 回溯（不剪枝）

// ─── 生成全部子集 ───
function subsets(nums: number[]): number[][] {
    const res: number[][] = []
    function backtrack(start: number, path: number[]): void {
        res.push([...path])              // 每个子集记录一次
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i])
            backtrack(i + 1, path)       // 分支 ×2
            path.pop()
        }
    }
    backtrack(0, [])
    return res                            // 共 2ⁿ 个子集
}

// ─── O(n!)：全排列 ───
function permute(nums: number[]): number[][] {
    const res: number[][] = []
    const used = new Array(nums.length).fill(false)
    function backtrack(path: number[]): void {
        if (path.length === nums.length) {
            res.push([...path])
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue
            used[i] = true
            path.push(nums[i])
            backtrack(path)
            path.pop()
            used[i] = false
        }
    }
    backtrack([])
    return res                            // n! 个排列
}
// O(2ⁿ) vs O(n!)：n=10 时，2¹⁰=1024，10!=3,628,800
// O(n!) 比 O(2ⁿ) 爆炸快得多！`
</script>
