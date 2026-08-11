<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔁 递推式与主定理</h1>
          <p class="text-sm text-slate-500 mt-1">递归算法的复杂度分析利器——不用展开递归树，套公式 10 秒出结果</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 1-2-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 什么是递推式 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          什么是递推式？—— 用数学描述递归
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          循环的复杂度可以直接"数循环次数"，但<strong>递归</strong>不行——递归是函数调用自身，需要先写出<strong>递推式 (Recurrence Relation)</strong>，再求解。
        </p>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>递推式的标准形式：</strong></p>
          <p class="text-base text-center font-mono text-cyan-700 mb-2">T(n) = a · T(n/b) + f(n)</p>
          <div class="text-xs text-slate-600 space-y-1">
            <p><strong>a</strong> = 递归分了多少支（子问题个数）</p>
            <p><strong>n/b</strong> = 每个子问题的规模（原问题的 1/b）</p>
            <p><strong>f(n)</strong> = 分解 + 合并的代价（非递归部分）</p>
          </div>
        </div>

        <div class="mb-4"><Code language="ts" :code="recurrenceCode" title="recurrence_examples.ts" /></div>
      </section>

      <!-- 2. 递归树法 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          递归树法 —— 最直观的手算方法
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          把递归展开成一棵树：<strong>总代价 = 每一层的工作量 × 层数</strong>。
        </p>

        <div class="mb-4"><Code language="text" :code="recursionTreeCode" title="递归树分析" /></div>

        <div class="mb-4"><Code language="ts" :code="treeExampleCode" title="merge_sort_tree.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          递归树分析就像分析虚拟 DOM 的 patch 过程——<strong>每一层都遍历了所有节点</strong>（O(n)），<br/>
          而树的深度是 <strong>log n 层</strong>（每次分裂减半），所以总代价 = n × log n = O(n log n)。</p>
        </aside>
      </section>

      <!-- 3. 主定理 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          主定理 (Master Theorem) — 10 秒出结果
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          对于形如 <strong>T(n) = a·T(n/b) + f(n)</strong> 且 f(n) 是<strong>多项式</strong>的递推式，主定理直接给出答案。
        </p>

        <div class="bg-amber-50 rounded-xl p-4 border border-amber-200 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 前提条件：</strong>主定理只适用于 <strong>a ≥ 1, b &gt; 1</strong>，且 f(n) 的形式相对规则。不规则的递推式（如 T(n) = T(n-1) + n）不能用主定理。</p>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">三步法：先算 log_b(a)，再和 f(n) 比较</h3>

        <div class="space-y-4 mb-4">
          <div class="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <strong class="text-blue-800 text-sm">情况1：f(n) 增长更慢（f(n) = O(n^{log_b(a) - ε})）</strong>
            <p class="text-blue-700 text-sm mt-1">→ <strong>T(n) = Θ(n^{log_b(a)})</strong> —— 叶子节点主导</p>
          </div>
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <strong class="text-emerald-800 text-sm">情况2：f(n) 增长相同（f(n) = Θ(n^{log_b(a)} · log^k n)）</strong>
            <p class="text-emerald-700 text-sm mt-1">→ <strong>T(n) = Θ(n^{log_b(a)} · log^{k+1} n)</strong> —— 每层平均分摊</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <strong class="text-amber-800 text-sm">情况3：f(n) 增长更快（f(n) = Ω(n^{log_b(a) + ε})）且满足正则条件</strong>
            <p class="text-amber-700 text-sm mt-1">→ <strong>T(n) = Θ(f(n))</strong> —— 根节点主导</p>
          </div>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 记忆口诀：</strong>"比 n^{log_b(a)} 谁大"。f(n) 小 → 叶子赢；一样大 → 多一个 log；f(n) 大 → 根赢。</p>
        </aside>
      </section>

      <!-- 4. 主定理实战 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          主定理实战 —— 最常考的 6 个递推式
        </h2>

        <div class="mb-4"><Code language="ts" :code="masterTheoremCode" title="master_theorem.ts" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">递推式</th><th class="px-4 py-2 border border-slate-200 font-semibold">log_b(a)</th><th class="px-4 py-2 border border-slate-200 font-semibold">f(n)</th><th class="px-4 py-2 border border-slate-200 font-semibold">谁大？</th><th class="px-4 py-2 border border-slate-200 font-semibold">结果</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">T(n)=2T(n/2)+n</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">n</td><td class="px-4 py-2 border">一样大</td><td class="px-4 py-2 border font-bold text-cyan-600">Θ(n log n)</td></tr>
              <tr><td class="px-4 py-2 border font-mono">T(n)=2T(n/2)+1</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">n 更大</td><td class="px-4 py-2 border font-bold text-cyan-600">Θ(n)</td></tr>
              <tr><td class="px-4 py-2 border font-mono">T(n)=2T(n/2)+n²</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">n²</td><td class="px-4 py-2 border">f(n) 更大</td><td class="px-4 py-2 border font-bold text-cyan-600">Θ(n²)</td></tr>
              <tr><td class="px-4 py-2 border font-mono">T(n)=T(n/2)+1</td><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">1</td><td class="px-4 py-2 border">一样大</td><td class="px-4 py-2 border font-bold text-cyan-600">Θ(log n)</td></tr>
              <tr><td class="px-4 py-2 border font-mono">T(n)=4T(n/2)+n</td><td class="px-4 py-2 border">2</td><td class="px-4 py-2 border">n</td><td class="px-4 py-2 border">n² 更大</td><td class="px-4 py-2 border font-bold text-cyan-600">Θ(n²)</td></tr>
              <tr><td class="px-4 py-2 border font-mono">T(n)=T(n/2)+n</td><td class="px-4 py-2 border">0</td><td class="px-4 py-2 border">n</td><td class="px-4 py-2 border">f(n) 更大</td><td class="px-4 py-2 border font-bold text-cyan-600">Θ(n)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 5. 不能用主定理的情况 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          不能用主定理时怎么办 —— 递归树 + 代入法
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          不是所有递归都适合主定理。常见特殊情况需要手推。
        </p>

        <div class="mb-4"><Code language="ts" :code="noMasterCode" title="no_master_examples.ts" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 自检清单：</strong><br/>
          1. 先尝试写出递推式 T(n) = a·T(n/b) + f(n)<br/>
          2. 计算 log_b(a) 和 f(n) 的增长级别<br/>
          3. 能用主定理就套公式<br/>
          4. 不能用就画递归树 + 手算每层工作量求和</p>
        </aside>
      </section>

      <!-- 6. 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>递推式 = 递归算法的数学表达</strong>：T(n) = a·T(n/b) + f(n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>递归树法</strong>：直观展开，每层代价 × 层数 = 总代价</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>主定理三步</strong>：算 log_b(a) → 和 f(n) 比大小 → 套三种情况之一</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>归并排序 T(n)=2T(n/2)+n → <strong>Θ(n log n)</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>二分查找 T(n)=T(n/2)+1 → <strong>Θ(log n)</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>不规则的递推式 → 画递归树 + 逐层求和</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-1-complexity/dsa-1-2-analysis/dsa-1-2-1-loop" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：循环嵌套分析</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-1-complexity/dsa-1-2-analysis/dsa-1-2-3-amortized" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：均摊分析 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-1", name: "什么是递推式" },
  { id: "sec-2", name: "递归树法" },
  { id: "sec-3", name: "主定理" },
  { id: "sec-4", name: "主定理实战" },
  { id: "sec-5", name: "不能用主定理时" },
  { id: "sec-6", name: "小结" },
]

const recurrenceCode = `// ─── 从递归代码到递推式 ───

// 例1：归并排序
function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr
    const mid = arr.length >> 1
    const left = mergeSort(arr.slice(0, mid))   // T(n/2)
    const right = mergeSort(arr.slice(mid))      // T(n/2)
    return merge(left, right)                    // O(n) 合并
}
// → T(n) = 2·T(n/2) + O(n)
//   a=2 (分两路)  b=2 (规模减半)  f(n)=n (合并代价)

// 例2：二分查找
function binarySearch(arr: number[], target: number, lo=0, hi=arr.length-1): number {
    if (lo > hi) return -1
    const mid = (lo + hi) >> 1
    if (arr[mid] === target) return mid
    if (arr[mid] < target) return binarySearch(arr, target, mid+1, hi)  // T(n/2)
    return binarySearch(arr, target, lo, mid-1)                          // T(n/2)
}
// → T(n) = 1·T(n/2) + O(1)
//   a=1 (只递归一侧)  b=2 (规模减半)  f(n)=1 (常数比较)`

const recursionTreeCode = `递归树示例：T(n) = 2T(n/2) + n

                   n                     ← 第0层：合计 n
                 /     \\
              n/2       n/2              ← 第1层：合计 n
             /   \\     /   \\
           n/4   n/4 n/4   n/4           ← 第2层：合计 n
           / \\   / \\ / \\   / \\
          ...   ...  ...   ...   ...     ← ...
           ↑                            ← 叶子层：n 个叶节点，每个 O(1)
深度 = log₂ n 层
每层工作量 = n
总工作量 = n × log₂ n = O(n log n)

核心洞察：
1. 层数 = log_b(n) — 递归 log n 次到底
2. 第 k 层有 a^k 个节点，每个节点处理 n/b^k 大小的子问题
3. 每层合计工作量 = a^k × f(n/b^k)
4. 总工作量 = 所有层的合计量之和`

const treeExampleCode = `// 归并排序 → T(n) = 2T(n/2) + n
function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr       // 基本情况：O(1)
    const mid = arr.length >> 1
    const left = mergeSort(arr.slice(0, mid))   // T(n/2) 左半
    const right = mergeSort(arr.slice(mid))      // T(n/2) 右半
    return merge(left, right)                    // O(n) 合并
}
// 递归树：
//   第0层: 1个节点，工作量 n
//   第1层: 2个节点，工作量 n/2 + n/2 = n
//   第2层: 4个节点，工作量 n/4 × 4 = n
//   ...
//   第log n 层: n个节点，工作量 1 × n = n
// 总共 log n 层，每层 n → Θ(n log n)

// 二分查找 → T(n) = T(n/2) + 1
function binarySearch(arr: number[], target: number): number {
    let lo = 0, hi = arr.length - 1
    while (lo <= hi) {
        const mid = (lo + hi) >> 1
        if (arr[mid] === target) return mid
        else if (arr[mid] < target) lo = mid + 1   // 每次丢弃一半
        else hi = mid - 1
    }
    return -1
}
// 没有分叉(a=1)，只有一条路往下走
// 递归树是一条链：每层工作量 1，深度 log n → Θ(log n)`

const masterTheoremCode = `// ─── 主定理速查表 — 6 个最常考的递推式 ───

// 1. 归并排序：T(n) = 2T(n/2) + n
//    log₂(2) = 1, f(n) = n = n¹ → 一样大 (情况2, k=0)
//    → Θ(n log n)

// 2. 二叉树遍历：T(n) = 2T(n/2) + 1
//    log₂(2) = 1, f(n) = 1 = n⁰ → n¹ 比 1 大 (情况1)
//    → Θ(n)

// 3. 快排最坏？？：T(n) = 2T(n/2) + n²
//    log₂(2) = 1, f(n) = n² → f(n) 更大 (情况3)
//    → Θ(n²)

// 4. 二分查找：T(n) = T(n/2) + 1
//    log₂(1) = 0, f(n) = 1 = n⁰ → 一样大 (情况2, k=0)
//    → Θ(log n)

// 5. Strassen 矩阵乘法：T(n) = 7T(n/2) + n²
//    log₂(7) ≈ 2.81, f(n) = n² → n²·⁸¹ 更大 (情况1)
//    → Θ(n^{log₂7}) ≈ Θ(n²·⁸¹)

// 6. 线性时间选择：T(n) = T(n/2) + n
//    log₂(1) = 0, f(n) = n → f(n) 更大 (情况3)
//    → Θ(n)`

const noMasterCode = `// ─── 不能用主定理的常见情况 ───

// 情况A：子问题大小不是 n/b（如 T(n) = T(n-1) + n）
function factorial(n: number): number {
    if (n <= 1) return 1
    return n * factorial(n - 1)         // T(n) = T(n-1) + 1
}
// 递推式：T(n) = T(n-1) + O(1)
// 不是 n/b 形式 → 主定理不适用
// 解法：展开 T(n) = T(n-1)+1 = T(n-2)+2 = ... = T(0)+n → O(n)

// 情况B：子问题大小不同
// T(n) = T(n/2) + T(n/3) + n
// 主定理要求所有子问题大小一样 → 不适用
// 解法：画递归树，找最深的路径主导 → O(n)

// 情况C：T(n) = T(n-1) + T(n-2) + 1（类似斐波那契）
// 不能用主定理，用特征方程或递归树
// → Θ(φⁿ) ≈ Θ(1.618ⁿ)（指数级！这也是递归求斐波那契低效的原因）

// 情况D: 快速排序平均情况 T(n) = 2T(n/2) + n → Θ(n log n) ✓
// 快速排序最坏情况 T(n) = T(n-1) + n → Θ(n²)（不能用于主定理，是 T(n-1)）
// → 这就是为什么快排需要随机化 pivot！`
</script>
