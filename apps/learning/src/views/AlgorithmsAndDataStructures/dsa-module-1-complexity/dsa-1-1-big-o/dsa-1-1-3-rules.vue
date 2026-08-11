<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📐 复杂度计算规则：加 / 乘 / 忽略常数</h1>
          <p class="text-sm text-slate-500 mt-1">三条铁律搞定 90% 的复杂度推算——不需要数学系学位</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 1-1-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 三条铁律总览 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          三条铁律总览 —— 复杂度计算的"公理"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          分析任何一段代码的时间复杂度，只需记住<strong>三条规则</strong>。它们来源于大O的数学定义，但用起来就像算术一样简单。
        </p>

        <div class="space-y-4 mb-4">
          <div class="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
            <strong class="text-cyan-800 text-sm">🔢 规则1：只保留最高阶项</strong>
            <p class="text-cyan-700 text-sm mt-1">T(n) = 3n² + 5n + 100 → O(n²)。n 很大时，n² 主导一切，n 和常数可以忽略。</p>
          </div>
          <div class="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <strong class="text-blue-800 text-sm">➕ 规则2：加法规则（顺序执行 → 取最大值）</strong>
            <p class="text-blue-700 text-sm mt-1">两段代码顺序执行：O(f(n)) + O(g(n)) = <strong>O(max(f(n), g(n)))</strong>。</p>
          </div>
          <div class="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
            <strong class="text-indigo-800 text-sm">✖️ 规则3：乘法规则（嵌套执行 → 相乘）</strong>
            <p class="text-indigo-700 text-sm mt-1">循环嵌套或递归分支：O(f(n)) × O(g(n)) = <strong>O(f(n) × g(n))</strong>。</p>
          </div>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          就像分析一个 React 组件的渲染成本：<br/>
          <strong>规则1</strong> = 一个组件里 map 了 1000 项（O(n)），又 map 了 100 项（O(m)）→ 取最大 O(max(n, m))<br/>
          <strong>规则2</strong> = &lt;Header /&gt; + &lt;List /&gt; + &lt;Footer /&gt; 顺序渲染 → 总复杂度 = max(各自的复杂度)<br/>
          <strong>规则3</strong> = &lt;List&gt; 里每一项又嵌套了 &lt;Card&gt; → 复杂度相乘
          </p>
        </aside>
      </section>

      <!-- 2. 规则1详解 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          规则1：只保留最高阶项 —— "常数、系数、低阶项全扔掉"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          这是大O的<strong>核心精神</strong>：关心的是 n → ∞ 时的行为，所以一切"不够快"的东西都可以丢弃。
        </p>

        <div class="mb-4"><Code language="ts" :code="rule1Code" title="rule1_drop_lower.ts" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">原始 T(n)</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">扔掉常数系数</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">扔掉低阶项</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">最终 O(?)</th>
              </tr>
            </thead>
            <tbody class="text-slate-600 font-mono text-xs">
              <tr><td class="px-4 py-2 border">3n² + 5n + 100</td><td class="px-4 py-2 border">n² + n + 1</td><td class="px-4 py-2 border">n²</td><td class="px-4 py-2 border font-bold text-cyan-600">O(n²)</td></tr>
              <tr><td class="px-4 py-2 border">5n³ + 2n²</td><td class="px-4 py-2 border">n³ + n²</td><td class="px-4 py-2 border">n³</td><td class="px-4 py-2 border font-bold text-cyan-600">O(n³)</td></tr>
              <tr><td class="px-4 py-2 border">1000000n</td><td class="px-4 py-2 border">n</td><td class="px-4 py-2 border">n</td><td class="px-4 py-2 border font-bold text-cyan-600">O(n)</td></tr>
              <tr><td class="px-4 py-2 border">n log n + n</td><td class="px-4 py-2 border">n log n + n</td><td class="px-4 py-2 border">n log n</td><td class="px-4 py-2 border font-bold text-cyan-600">O(n log n)</td></tr>
              <tr><td class="px-4 py-2 border">log n + 100</td><td class="px-4 py-2 border">log n + 1</td><td class="px-4 py-2 border">log n</td><td class="px-4 py-2 border font-bold text-cyan-600">O(log n)</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 为什么可以扔掉 1000000 的系数？</strong><br/>
          因为对大O来说，1000000n 和 n 的增长趋势<strong>完全相同</strong>——都是线性。<br/>
          当 n 从 100 万涨到 1 亿时，两个都增长了 100 倍。系数不影响增长速度。<br/>
          <strong>但是！</strong>实际工程中常数因子很重要——O(n) 的 1000000n 在小数据上不如 O(n²) 的 n²。</p>
        </aside>
      </section>

      <!-- 3. 规则2详解 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          规则2：加法规则 —— 顺序执行取最大
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          两段代码<strong>先后</strong>执行：总时间 = T₁(n) + T₂(n) → O(max(f(n), g(n)))。
          取较大的复杂度，因为增长慢的那一项会被"淹没"。
        </p>

        <div class="mb-4"><Code language="ts" :code="addRuleCode" title="add_rule.ts" /></div>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700"><strong>记忆技巧：</strong>就像往瓶子里装石头和沙子——先装大石头（高复杂度），沙子（低复杂度）填缝。<br/>
          最后瓶子的总重量 ≈ 大石头的重量。O(n² + n) ≈ O(n²)。</p>
        </div>
      </section>

      <!-- 4. 规则3详解 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          规则3：乘法规则 —— 嵌套执行相乘
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一段代码<strong>嵌套在</strong>另一段代码里面：外循环 m 次 × 内操作 n 次 = O(m × n)。
        </p>

        <div class="mb-4"><Code language="ts" :code="mulRuleCode" title="multiply_rule.ts" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 乘法规则是复杂度分析中最关键的一条：</strong><br/>
          当你看到嵌套循环，第一反应就是"外循环次数 × 内循环每次的工作量"。<br/>
          这是 O(n²)、O(n³)、O(n log n) 等复杂度的来源。</p>
        </aside>
      </section>

      <!-- 5. 综合实战 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          综合实战 —— 三条规则一起用
        </h2>
        <div class="mb-4"><Code language="ts" :code="combinedCode" title="combined_example.ts" /></div>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>逐段分析——</strong>先把代码拆成独立段落，分别算出每段的复杂度</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>嵌套用乘法——</strong>遇到循环嵌套，外循环 × 内循环</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>顺序用加法——</strong>上下排列的段落，取 max</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>最后化简——</strong>扔掉系数、去掉低阶项</div>
          </li>
        </ol>
      </section>

      <!-- 6. 易错点 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>
          常见陷阱
        </h2>

        <div class="space-y-3">
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <strong class="text-amber-800 text-sm">❌ 陷阱1：for 循环不一定是 O(n)</strong>
            <p class="text-amber-700 text-sm mt-1"><code class="bg-amber-100 text-amber-700 px-1 rounded text-xs">for (let i = 0; i &lt; n; i *= 2)</code> — i 每次 ×2 翻倍，循环次数是 log₂ n，复杂度 O(log n) 不是 O(n)！</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <strong class="text-amber-800 text-sm">❌ 陷阱2：并列循环不一定是 O(n²)</strong>
            <p class="text-amber-700 text-sm mt-1">两个<strong>并列</strong>的 for 循环（不是嵌套！）是 O(2n) = O(n)，不是 O(n²)。</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <strong class="text-amber-800 text-sm">❌ 陷阱3：m 和 n 不要轻易合并</strong>
            <p class="text-amber-700 text-sm mt-1">如果 m 和 n 是两个<strong>独立的变量</strong>（如矩阵的行列），复杂度是 O(m × n)，不能写成 O(n²)。</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <strong class="text-amber-800 text-sm">❌ 陷阱4：递归不能直接用乘法规则</strong>
            <p class="text-amber-700 text-sm mt-1">递归需要用到递推式和主定理（下一节讲），不能简单地把每一层的复杂度乘上递归深度。</p>
          </div>
        </div>
      </section>

      <!-- 7. 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>规则1：去掉常数系数和低阶项</strong>，只保留最高阶 → 3n² + 5n → O(n²)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>规则2：加法取 max</strong>——顺序执行 → O(f + g) = O(max(f, g))</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>规则3：乘法相乘</strong>——嵌套执行 → O(f × g)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>分析步骤：<strong>拆段 → 嵌套用乘 → 顺序用加 → 化简</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>小心：for 循环不一定是 O(n)、并列 ≠ 嵌套、独立变量勿合并</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-1-complexity/dsa-1-1-big-o/dsa-1-1-2-omega-theta" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：大Ω与大Θ记号</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-1-complexity/dsa-1-1-big-o/dsa-1-1-4-common" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：常见复杂度速查 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-1", name: "三条铁律总览" },
  { id: "sec-2", name: "规则1：只保留最高阶" },
  { id: "sec-3", name: "规则2：加法取最大" },
  { id: "sec-4", name: "规则3：乘法相乘" },
  { id: "sec-5", name: "综合实战" },
  { id: "sec-6", name: "常见陷阱" },
  { id: "sec-7", name: "小结" },
]

const rule1Code = `// 规则1：扔掉系数、低阶项、常数

function example(n: number): void {
    // ──── 以下每个步骤产生 T(n) 的一项 ────

    // 步骤A：双重循环 → n² 次操作
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            console.log(i + j)           // n² 次
        }
    }

    // 步骤B：单层循环 → 3n 次操作
    for (let i = 0; i < n; i++) {
        console.log(i)                   // n 次
        console.log(i * 2)               // n 次
        console.log(i * 3)               // n 次
    }

    // 步骤C：常数操作 → 5 次
    const a = 1
    const b = 2
    const c = a + b
}

// T(n) = n² + 3n + 5
// 扔掉常数系数 → n² + n + 1
// 扔掉低阶项    → n²
// 最终：O(n²)
//
// 为什么 3n 可以扔？因为 n=1000 时，n²=1,000,000，3n=3,000
// n² 是 3n 的 333 倍，且 n 越大差距越大 → n² 主导`

const addRuleCode = `// 规则2：加法规则 = 顺序执行 → 取 max

function processData(arr: number[]): void {
    const n = arr.length

    // 操作1：排序 → O(n log n)
    arr.sort((a, b) => a - b)            // JS 的 sort 是 O(n log n)

    // 操作2：遍历查找 → O(n)
    for (let i = 0; i < n; i++) {
        if (arr[i] > 100) break
    }

    // 操作3：常数输出 → O(1)
    console.log("done")
}

// 总复杂度 = O(n log n + n + 1) = O(n log n)
// 加法取 max → n log n 最大
// 就像：1000 元 + 10 元 + 1 元 ≈ 1000 元

function threePasses(arr: number[]): void {
    const n = arr.length

    // 第一遍 → O(n)
    for (let i = 0; i < n; i++) { console.log(arr[i]) }

    // 第二遍 → O(n)
    for (let i = 0; i < n; i++) { console.log(arr[i] * 2) }

    // 第三遍 → O(n)
    for (let i = 0; i < n; i++) { console.log(arr[i] * 3) }
}
// 三遍并列 → O(n) + O(n) + O(n) = O(3n) = O(n)
// ⚠️ 注意：不是 O(n³)！并列循环 ≠ 嵌套循环`

const mulRuleCode = `// 规则3：乘法规则 = 嵌套执行 → 相乘

function printPairs(arr: number[]): void {
    const n = arr.length

    // 外循环 n 次 × 内循环 n 次 = O(n²)
    for (let i = 0; i < n; i++) {        // 外循环：n 次
        for (let j = 0; j < n; j++) {    // 内循环：n 次
            console.log(i, j)             // 总计 n × n = n² 次
        }
    }
}

function printTriplets(arr: number[]): void {
    const n = arr.length

    // 外 × 中 × 内 = n³ → O(n³)
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                console.log(i, j, k)
            }
        }
    }
}

// 不一定是同一个 n——使用不同变量时
function crossJoin(A: number[], B: number[]): void {
    // 外循环：m 次，内循环：n 次 → O(m × n)
    for (const a of A) {                 // m 次
        for (const b of B) {             // n 次
            console.log(a, b)             // 总计 m × n 次
        }
    }
}
// ⚠️ O(m × n) 不能写成 O(n²)，除非明确 m = n`

const combinedCode = `// 综合实战：分析这段代码的复杂度

function analyzeThis(arr: number[], target: number): number[][] {
    const n = arr.length
    const result: number[][] = []

    // ─── 段落1：双重循环 → O(n²) ───
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (arr[i] + arr[j] === target) {
                result.push([i, j])       // 最坏 O(n²) 次 push
            }
        }
    }

    // ─── 段落2：排序 → O(n log n) ───
    arr.sort((a, b) => a - b)

    // ─── 段落3：单层循环 + 嵌套二分查找 → O(n) × O(log n) = O(n log n) ───
    for (let i = 0; i < n; i++) {
        // 二分查找 → O(log n)
        let lo = 0, hi = n - 1
        while (lo <= hi) {
            const mid = (lo + hi) >> 1
            if (arr[mid] === target - arr[i]) break
            else if (arr[mid] < target - arr[i]) lo = mid + 1
            else hi = mid - 1
        }
    }

    return result
}

// 拆段分析：
//   段落1: O(n²)
//   段落2: O(n log n)
//   段落3: n × log n = O(n log n)
// 加法取 max: max(n², n log n, n log n) = O(n²)
//
// 最终复杂度: O(n²)
// 优化方向：段落1 的双重循环是瓶颈`
</script>
