<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">💾 空间复杂度与原地算法</h1>
          <p class="text-sm text-slate-500 mt-1">内存是稀缺资源——分析算法需要多少"额外"空间，以及如何省到极致</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 1-2-4</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 空间复杂度定义 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          空间复杂度的定义 —— 不算输入，只算"额外"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>空间复杂度 = 算法运行时的"额外"内存占用量</strong>（不含输入数据本身）。也用大O表示。
          和时间复杂度一样，关心的是<strong>随 n 增长的趋势</strong>。
        </p>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>空间复杂度的四大来源：</strong></p>
          <ol class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span><strong>变量/常量</strong> — 固定数量的变量 → O(1)</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span><strong>数组/集合</strong> — 大小随 n 增长的辅助数据结构 → O(n)</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">3.</span><span><strong>递归调用栈</strong> — 每次递归占用栈帧 → 深度 × 每帧大小</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">4.</span><span><strong>输入数据本身不算！</strong> — 只看"额外"分配的内存</span></li>
          </ol>
        </div>

        <div class="mb-4"><Code language="ts" :code="definitionCode" title="space_complexity_basics.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          空间复杂度就像分析一个 React 组件的内存占用——<br/>
          O(1) = 只用了几个局部变量（如 <code>const [count, setCount] = useState(0)</code>）<br/>
          O(n) = 渲染了 n 个 DOM 节点的列表（每个节点都占内存）<br/>
          O(n²) = 渲染了 n×n 的表格（每个单元格都是独立 DOM）</p>
        </aside>
      </section>

      <!-- 2. 常见空间复杂度模式 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          常见空间复杂度模式 —— O(1) / O(n) / O(log n) / O(n²)
        </h2>
        <div class="mb-4"><Code language="ts" :code="commonSpaceCode" title="common_space_patterns.ts" /></div>
      </section>

      <!-- 3. 递归的栈空间 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          递归的栈空间 —— 被忽略的内存深渊
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          递归函数每次调用都会在调用栈上压入一个<strong>栈帧（含参数、局部变量、返回地址）</strong>。
          递归深度 = 空间复杂度（不看堆分配，<strong>只看栈深度</strong>）。
        </p>

        <div class="mb-4"><Code language="ts" :code="recursionSpaceCode" title="recursion_stack_space.ts" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 关键区分：</strong><br/>
          <strong>时间复杂度分析递归</strong> → 看递归树的所有节点数（分支 + 深度）<br/>
          <strong>空间复杂度分析递归</strong> → 只看调用栈的<strong>最大深度</strong>（栈不会同时持有所有分支）<br/>
          归并排序：时间 O(n log n)，空间 O(n)——因为合并需要辅助数组。<br/>
          二叉树遍历：时间 O(n)，空间 O(h)——h 为树高，最坏 O(n)。</p>
        </aside>
      </section>

      <!-- 4. 原地算法 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          原地算法 (In-place) — 把空间压到 O(1) 的艺术
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>原地算法 = 空间复杂度 O(1)（或 O(log n) 递归栈）</strong>，在输入数据本身的存储空间上操作，<strong>几乎不分配额外内存</strong>。
        </p>

        <div class="mb-4"><Code language="ts" :code="inplaceCode" title="inplace_algorithms.ts" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">常见原地算法一览</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">操作</th><th class="px-4 py-2 border border-slate-200 font-semibold">原地方案</th><th class="px-4 py-2 border border-slate-200 font-semibold">空间</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">数组反转</td><td class="px-4 py-2 border">双指针交换</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border">快排</td><td class="px-4 py-2 border">分区在原数组上交换（递归栈 O(log n)）</td><td class="px-4 py-2 border font-mono text-emerald-600">O(log n)</td></tr>
              <tr><td class="px-4 py-2 border">堆排</td><td class="px-4 py-2 border">直接在原数组建堆+排序</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border">矩阵转置</td><td class="px-4 py-2 border">对角线对称交换</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border">链表反转</td><td class="px-4 py-2 border">三指针迭代</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border">归并排序</td><td class="px-4 py-2 border">❌ 需要 O(n) 辅助数组（非原地）</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 面试提示：</strong>被问"能不能不用额外空间" → 考察你是否能用原地算法。<br/>
          常见套路：双指针、原地哈希（用数组索引做标记）、位运算、原地旋转。</p>
        </aside>
      </section>

      <!-- 5. 时空权衡 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          时间 vs 空间 —— 永恒的权衡 (Trade-off)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          算法设计中，<strong>时间和空间往往可以互换</strong>。用空间换时间（缓存/索引），或用时间换空间（原地操作）。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">策略</th><th class="px-4 py-2 border border-slate-200 font-semibold">时间</th><th class="px-4 py-2 border border-slate-200 font-semibold">空间</th><th class="px-4 py-2 border border-slate-200 font-semibold">实例</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">空间换时间</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border">Hash Map 替代双重循环（Two Sum）</td></tr>
              <tr><td class="px-4 py-2 border">空间换时间</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n²)</td><td class="px-4 py-2 border">DP 表 vs 重复递归（斐波那契 memo）</td></tr>
              <tr><td class="px-4 py-2 border">时间换空间</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border">原地算法：快排(原地) vs 归并(O(n)空间)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="mb-4"><Code language="ts" :code="tradeoffCode" title="space_time_tradeoff.ts" /></div>
      </section>

      <!-- 6. 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>空间复杂度看"额外"内存——</strong>输入数据本身不计算</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>递归的空间 = 调用栈深度</strong>（不是节点总数！）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>原地算法 = O(1) 额外空间</strong>——双指针、交换、位运算</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>时间空间常可互换</strong>——Hash Map 用 O(n) 空间换 O(n) 时间</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>面试必问：分析复杂度时<strong>同时分析时间 + 空间</strong></span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-1-complexity/dsa-1-2-analysis/dsa-1-2-3-amortized" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：均摊分析</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-1-array/dsa-2-1-1-static" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：静态数组与缓存友好性 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-1", name: "空间复杂度定义" },
  { id: "sec-2", name: "常见空间复杂度" },
  { id: "sec-3", name: "递归的栈空间" },
  { id: "sec-4", name: "原地算法" },
  { id: "sec-5", name: "时间 vs 空间权衡" },
  { id: "sec-6", name: "小结" },
]

const definitionCode = `// 空间复杂度：只算"额外"分配的内存

// O(1)：只用了固定几个变量
function sum(arr: number[]): number {
    let total = 0                         // 1 个变量
    for (const x of arr) {
        total += x                        // 无额外分配
    }
    return total
}
// 额外空间：total (1个int) → O(1)

// O(n)：创建了大小为 n 的辅助数组
function doubleArray(arr: number[]): number[] {
    const doubled = new Array(arr.length) // ← 额外分配 n 个元素
    for (let i = 0; i < arr.length; i++) {
        doubled[i] = arr[i] * 2
    }
    return doubled                        // 返回新数组（不算在额外空间中
}                                         //   → 取决于调用者是否视为"输出"还是"输入"）
// 额外空间：doubled (n个int) → O(n)

// O(1) vs O(n)：关键看"是否创建了随 n 增长的数据结构"
function hasDuplicate(arr: number[]): boolean {
    const seen = new Set<number>()        // ← 额外分配！最坏 O(n) 空间
    for (const x of arr) {
        if (seen.has(x)) return true
        seen.add(x)
    }
    return false
}
// 额外空间：Set 最多存 n 个元素 → O(n)`

const commonSpaceCode = `// ─── O(1)：固定额外空间 ───
function findMin(arr: number[]): number {
    let minVal = Infinity              // 1 个变量
    for (const x of arr) {
        if (x < minVal) minVal = x
    }
    return minVal
}
// 额外空间：minVal (1个int) → O(1)

// ─── O(n)：辅助数组/Set/Map ───
function removeDuplicates(arr: number[]): number[] {
    const seen = new Set<number>()     // 辅助 Set → O(n) 空间
    const result: number[] = []        // 结果数组 → O(n) 空间
    for (const x of arr) {
        if (!seen.has(x)) {
            seen.add(x)
            result.push(x)
        }
    }
    return result
}
// 额外空间：seen (n) + result (n) = O(2n) = O(n)

// ─── O(n²)：二维辅助数组 ───
function pascalTriangle(n: number): number[][] {
    const triangle: number[][] = []
    for (let i = 0; i < n; i++) {
        triangle[i] = new Array(i + 1).fill(1)  // 每行分配 i+1 个
    }
    return triangle
}
// 额外空间：1+2+...+n = n(n+1)/2 ≈ n²/2 → O(n²)`

const recursionSpaceCode = `// ─── 递归的空间 = 调用栈深度！───

// 阶乘递归：深度 n → O(n) 空间
function factorial(n: number): number {
    if (n <= 1) return 1
    return n * factorial(n - 1)
}
// 调用栈：factorial(n) → factorial(n-1) → ... → factorial(1)
// 深度 = n，每层占用 O(1) → O(n) 空间

// 二分查找：深度 log n → O(log n) 空间
function binarySearch(arr: number[], target: number, lo=0, hi=arr.length-1): number {
    if (lo > hi) return -1
    const mid = (lo + hi) >> 1
    if (arr[mid] === target) return mid
    if (arr[mid] < target) return binarySearch(arr, target, mid+1, hi)
    return binarySearch(arr, target, lo, mid-1)
}
// 调用栈深度 = log₂ n → O(log n) 空间

// 归并排序：递归栈 O(log n) + 合并数组 O(n) → O(n)
function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr
    const mid = arr.length >> 1
    const left = mergeSort(arr.slice(0, mid))   // slice 分配新数组
    const right = mergeSort(arr.slice(mid))
    return merge(left, right)                   // merge 分配临时数组
}
// 递归栈深度 = log n
// 但 merge 每层分配临时数组 → 总空间 = O(n)（不是 O(n log n)！）
// 原因：递归栈会释放，每层 merge 的同时只在栈上有一层`

const inplaceCode = `// ─── 原地反转数组：O(1) 空间 ───
function reverseInPlace(arr: number[]): void {
    let left = 0, right = arr.length - 1
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]]
        left++
        right--
    }
}
// 不创建新数组，在原数组上交换 → O(1) 额外空间

// ─── 原地删除重复项（有序数组）：O(1) 空间 ───
function removeDuplicatesInPlace(arr: number[]): number {
    if (arr.length === 0) return 0
    let writeIdx = 0                     // 写指针
    for (let readIdx = 1; readIdx < arr.length; readIdx++) {
        if (arr[readIdx] !== arr[writeIdx]) {
            writeIdx++
            arr[writeIdx] = arr[readIdx] // 原地覆盖
        }
    }
    return writeIdx + 1
}
// 双指针，在原数组上操作 → O(1) 额外空间

// ─── 快排的原地分区：O(1) 空间（不算递归栈）───
function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi]
    let i = lo - 1
    for (let j = lo; j < hi; j++) {
        if (arr[j] <= pivot) {
            i++
            [arr[i], arr[j]] = [arr[j], arr[i]]  // 原地交换
        }
    }
    [arr[i+1], arr[hi]] = [arr[hi], arr[i+1]]
    return i + 1
}
// 所有操作都在 arr 本身进行 → O(1) 额外空间
// 递归栈最多 log n 层 → 总空间 O(log n)`

const tradeoffCode = `// ─── 空间换时间的经典案例：Two Sum ───

// 方案A：暴力双重循环 → O(n²) 时间，O(1) 空间
function twoSumBrute(nums: number[], target: number): [number, number] {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) return [i, j]
        }
    }
    return [-1, -1]
}
// 时间 O(n²) ← 差，空间 O(1) ← 好

// 方案B：Hash Map → O(n) 时间，O(n) 空间
function twoSumHash(nums: number[], target: number): [number, number] {
    const map = new Map<number, number>()
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]
        if (map.has(complement)) return [map.get(complement)!, i]
        map.set(nums[i], i)
    }
    return [-1, -1]
}
// 时间 O(n) ← 好，空间 O(n) ← "贵"

// 面试话术："用 O(n) 额外空间将时间从 O(n²) 降到 O(n)"
// 是否值得？n=10⁶ 时 O(n²) 不可接受 → 值得！`
</script>
