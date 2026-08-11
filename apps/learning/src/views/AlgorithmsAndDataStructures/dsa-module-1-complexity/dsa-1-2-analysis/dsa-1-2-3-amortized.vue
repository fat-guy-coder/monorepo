<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">💹 均摊分析：聚合 / 记账 / 势能法</h1>
          <p class="text-sm text-slate-500 mt-1">单次操作可能很贵，但多次操作平均便宜——动态数组扩容为什么是 O(1)</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 1-2-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 为什么需要均摊分析 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要均摊分析？—— 有些操作"偶尔很贵，但大部分很便宜"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          看这段代码：动态数组的 push 操作——<strong>99% 的 push 是 O(1)，但偶尔一次扩容需要 O(n)</strong>。
          如果按最坏情况说每次 push 是 O(n)，那完全歪曲了事实。
        </p>

        <div class="mb-4"><Code language="ts" :code="introCode" title="dynamic_array_push.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          就像浏览器重排（reflow）——99% 的 DOM 修改是 O(1)，但偶尔一次触发了整个页面的重排，代价是 O(n)。<br/>
          你不能说"每次 DOM 操作都是 O(n)"——因为触发全页重排的频率非常低。<br/>
          均摊分析告诉你：<strong>平均每次 DOM 操作仍然是 O(1)</strong>。</p>
        </aside>

        <p class="text-slate-600 leading-relaxed">
          <strong>均摊分析 (Amortized Analysis)</strong> 解决的就是这类问题：一系列操作中，<strong>总代价 ÷ 操作次数</strong> 才是真正的单次平均。
        </p>
      </section>

      <!-- 2. 聚合分析 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          方法一：聚合分析 (Aggregate) — "算总账再摊"
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>思路：</strong>执行 n 次操作，算出总代价 T(n)，每次均摊代价 = T(n)/n。</p>

        <div class="mb-4"><Code language="ts" :code="aggregateCode" title="aggregate_analysis.ts" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 聚合分析结论：</strong>动态数组 n 次 push 的总代价 ≤ 3n → <strong>均摊 O(1)</strong>。<br/>
          这就是为什么 JS 的 Array.push() 和 Java 的 ArrayList.add() 都声称 O(1)——是<strong>均摊</strong>含义。</p>
        </aside>
      </section>

      <!-- 3. 记账法 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          方法二：记账法 (Accounting) — "廉价操作存钱，贵操作花存款"
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>思路：</strong>每次廉价操作多收一点"均摊费用"，多余的作为"存款"存起来。<br/>
          当贵的操作发生时，用存款支付。只要存款永远不为负，均摊费用就是有效的。
        </p>

        <div class="mb-4"><Code language="ts" :code="accountingCode" title="accounting_method.ts" /></div>
      </section>

      <!-- 4. 势能法 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          方法三：势能法 (Potential) — "势能差 = 存款变化"
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          记账法的<strong>数学化版本</strong>。定义一个"势能函数" Φ，操作前后的势能差 = 这笔操作的"存款"。
        </p>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700"><strong>核心公式：</strong>均摊代价 = 实际代价 + ΔΦ（势能变化）</p>
          <p class="text-xs text-slate-600 mt-1">Φ = 势能函数（描述数据结构的"紧张程度"）<br/>
          ΔΦ = Φ_after - Φ_before（正 = 存款，负 = 取款）</p>
        </div>

        <div class="mb-4"><Code language="ts" :code="potentialCode" title="potential_method.ts" /></div>
      </section>

      <!-- 5. 三种方法对比 + 其他实例 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          三种方法对比 & 其他均摊分析实例
        </h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">方法</th><th class="px-4 py-2 border border-slate-200 font-semibold">思路</th><th class="px-4 py-2 border border-slate-200 font-semibold">难度</th><th class="px-4 py-2 border border-slate-200 font-semibold">适用场景</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">聚合分析</td><td class="px-4 py-2 border">算 n 次总代价 ÷ n</td><td class="px-4 py-2 border text-emerald-600">★☆☆</td><td class="px-4 py-2 border">大部分场景、面试首选</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">记账法</td><td class="px-4 py-2 border">廉价操作多收费存起来</td><td class="px-4 py-2 border text-amber-600">★★☆</td><td class="px-4 py-2 border">不同操作类型代价差异大</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">势能法</td><td class="px-4 py-2 border">势能函数 + ΔΦ</td><td class="px-4 py-2 border text-red-600">★★★</td><td class="px-4 py-2 border">学术论文、复杂数据结构</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">常见均摊 O(1) 操作速记</h3>
        <ul class="space-y-2 text-slate-600 text-sm">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>动态数组 push：</strong>扩容时复制 O(n)，但扩容频率 ~1/n → 均摊 O(1)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Hash Map 插入：</strong>rehash 时 O(n)，但负载因子触发频率低 → 均摊 O(1)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>并查集 (Union-Find)：</strong>路径压缩的单次操作 → 均摊近 O(α(n)) ≈ 均摊 O(1)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>栈的多连弹出 (multipop)：</strong>每个元素只被 push 和 pop 各一次 → 均摊 O(1)</span></li>
        </ul>
      </section>

      <!-- 6. 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>均摊分析 ≠ 平均情况——</strong>均摊是操作序列的确定性平均，不涉及概率</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>聚合分析</strong>是面试中最实用的方法——算总账除以 n</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>动态数组 push 均摊 O(1)</strong>——扩容次数 ~log n，每次扩容代价 ≤ 2n</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>记住<strong>"懒操作"思维</strong>——贵的操作不经常做，分摊到每次就很便宜</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>面试被问到动态数组复杂度时，<strong>一定要区分"单次最坏 O(n)"和"均摊 O(1)"</strong></span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-1-complexity/dsa-1-2-analysis/dsa-1-2-2-recursive" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：递归分析与主定理</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-1-complexity/dsa-1-2-analysis/dsa-1-2-4-space" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：空间复杂度与原地算法 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-1", name: "为什么需要均摊分析" },
  { id: "sec-2", name: "聚合分析" },
  { id: "sec-3", name: "记账法" },
  { id: "sec-4", name: "势能法" },
  { id: "sec-5", name: "三种方法对比" },
  { id: "sec-6", name: "小结" },
]

const introCode = `// 动态数组 push：为什么均摊 O(1)？

class DynamicArray<T> {
    private data: T[]
    private size: number
    private capacity: number

    constructor() {
        this.data = new Array(1)  // 初始容量 1
        this.size = 0
        this.capacity = 1
    }

    push(item: T): void {
        if (this.size === this.capacity) {
            this.resize()          // ⚠️ 偶然发生的 O(n) 操作
        }
        this.data[this.size++] = item  // ← 99% 的情况：O(1)
    }

    private resize(): void {
        this.capacity *= 2             // 容量翻倍
        const newData = new Array(this.capacity)
        for (let i = 0; i < this.size; i++) {
            newData[i] = this.data[i]  // 复制 n 个元素 → O(n)
        }
        this.data = newData
    }
}
// 插入了 n 次，扩容了约 log n 次
// 每次扩容复制：1+2+4+8+...+n/2 < n 个元素
// 总复制次数 < 2n，加上 n 次 push = 3n → 均摊 O(1)`

const aggregateCode = `// ─── 聚合分析：动态数组 n 次 push ───
//
// 假设 capacity 双倍扩容策略，从 1 开始：
// push #1:  容量1→2，复制 1 个 → 1次复制+1次写入 = 2
// push #2:  容量2→4，复制 2 个 → 2次复制+1次写入 = 3
// push #3:  直接写入 → 1
// push #4:  容量4→8，复制 4 个 → 4次复制+1次写入 = 5
// push #5-7: 直接写入 → 各 1
// push #8:  容量8→16，复制 8 个 → 8次复制+1次写入 = 9
// ...
//
// 扩容的时刻：push #1, 2, 4, 8, 16, ..., n/2
// 扩容次数：log₂ n
// 扩容时复制的总元素数：1+2+4+8+...+n/2 < n
// n 次 push 的总代价 ≤ n(写入) + n(复制) + log₂ n ≈ 3n
// 均摊代价 = 总代价 / n ≈ 3 = O(1) ✓

// 验证代码
function demonstrateAmortized(n: number): void {
    let totalOps = 0
    let capacity = 1
    const arr: number[] = []

    for (let i = 0; i < n; i++) {
        if (arr.length === capacity) {
            totalOps += arr.length        // 扩容复制代价
            capacity *= 2
        }
        arr.push(i)
        totalOps += 1                     // push 写入代价
    }
    console.log(\`n=\${n}, totalOps=\${totalOps}, avg=\${(totalOps/n).toFixed(2)}\`)
}
// n=100:    totalOps≈300,  avg≈3.0  → 均摊 O(1)
// n=10000:  totalOps≈30000, avg≈3.0  → 均摊 O(1)
// 无论 n 多大，平均每次都是 ~3 次操作！`

const accountingCode = `// ─── 记账法：动态数组 push ───
//
// 给每次 push 收取 3 元"均摊费用":
//   - 1 元：支付本次写入
//   - 1 元：支付"未来的自己"被复制
//   - 1 元：支付之前某个"老元素"被复制
//
// 扩容时：复制 k 个元素需要 k 元
//   → 用"存"在那些老元素里的钱支付
//   → 存款永远不会为负！

function accountingView(n: number): void {
    let deposit = 0  // 总存款
    let capacity = 1
    const arr: number[] = []

    for (let i = 0; i < n; i++) {
        deposit += 3           // 每次收 3 元
        if (arr.length === capacity) {
            deposit -= capacity  // 扩容支付 capacity 元
            capacity *= 2
        }
        arr.push(i)
        deposit -= 1           // 写入支付 1 元
        console.log(\`push #\${i+1}, deposit=\${deposit}\`)
    }
}
// 存款始终 ≥ 0 → 3 元是有效均摊上限
// → 均摊代价 = 3 = O(1)`

const potentialCode = `// ─── 势能法：动态数组 push ───
//
// 定义势能函数 Φ = 2 * size - capacity
// Φ 代表"扩容的紧迫程度"：
//   - 刚扩容完: size=capacity → Φ = size（最大值，势能释放完）
//   - 快满了:     size=capacity-1 → Φ = size-2（最小值，势能积累）
//
// 均摊代价 = 实际代价 + ΔΦ
// push（不扩容）: 实际=1, ΔΦ = (2(s+1)-c) - (2s-c) = +2
//   → 均摊 = 1+2 = 3
// push（扩容）: 实际=1+s(s个复制), ΔΦ = (2(s+1)-2s) - (2s-s) ≈ 2-2s
//   → 均摊 = 1+s + (2-2s) = 3-s < 3
// 无论哪种情况，均摊代价 ≤ 3 → O(1) ✓

// 通用势能法模板:
// 1. 选择势能函数 Φ（满足 Φ≥0 且 Φ(初始)=0）
// 2. 计算 ΔΦ = Φ_after - Φ_before
// 3. 均摊代价 = 实际代价 + ΔΦ
// 4. 总均摊代价 = Σ(实际代价) + Φ(n) - Φ(0) ≥ 总实际代价（因为 Φ≥0）`
</script>
