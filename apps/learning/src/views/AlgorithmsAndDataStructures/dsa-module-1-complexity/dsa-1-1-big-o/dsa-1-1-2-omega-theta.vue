<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📐 大Ω与大Θ记号</h1>
          <p class="text-sm text-slate-500 mt-1">下界 (Ω) 和紧确界 (Θ) — 三兄弟各司其职，完整描述算法性能边界</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 1-1-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 三兄弟全景 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          渐近记号三兄弟 —— O / Ω / Θ 各管什么
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          大O 只是"上界"（最差能多慢），要完整描述算法性能还需要两个记号。三者合称<strong>渐近记号 (Asymptotic Notation)</strong>。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">记号</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">读法</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类比</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">使用频率</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border font-mono text-lg font-bold text-cyan-600">O</td>
                <td class="px-4 py-2 border">大O (Big O)</td>
                <td class="px-4 py-2 border"><strong>上界</strong> → 算法<strong>不会比这个更差</strong></td>
                <td class="px-4 py-2 border text-xs">"最多花多久" / 预算上限</td>
                <td class="px-4 py-2 border"><span class="bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full text-xs font-bold">最常用</span></td>
              </tr>
              <tr>
                <td class="px-4 py-2 border font-mono text-lg font-bold text-amber-600">Ω</td>
                <td class="px-4 py-2 border">大Ω (Big Omega)</td>
                <td class="px-4 py-2 border"><strong>下界</strong> → 算法<strong>至少需要这么多</strong></td>
                <td class="px-4 py-2 border text-xs">"最少花多久" / 底线</td>
                <td class="px-4 py-2 border"><span class="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-bold">理论分析</span></td>
              </tr>
              <tr>
                <td class="px-4 py-2 border font-mono text-lg font-bold text-emerald-600">Θ</td>
                <td class="px-4 py-2 border">大Θ (Big Theta)</td>
                <td class="px-4 py-2 border"><strong>紧确界</strong> → 上界=下界，<strong>精确描述</strong></td>
                <td class="px-4 py-2 border text-xs">"不多不少刚好" / 精确报价</td>
                <td class="px-4 py-2 border"><span class="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-bold">精确场景</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          就像评估一个 Web 页面性能：<br/>
          <strong>O (上界)</strong> = "这个页面最慢 3 秒一定能加载完"（给出最坏的保证）<br/>
          <strong>Ω (下界)</strong> = "至少要 200ms 网络延迟，不可能更快"（物理极限/理论下限）<br/>
          <strong>Θ (紧确界)</strong> = "页面加载时间精确在 500ms~550ms 之间"（上下界紧贴）
          </p>
        </aside>
      </section>

      <!-- 2. 大Ω -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          大Ω (Big Omega) — 下界，"至少需要多少"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>定义：</strong>T(n) = Ω(f(n)) 当且仅当存在正常数 c 和 n₀，使得对于所有 n ≥ n₀，有 <strong>T(n) ≥ c·f(n)</strong>。
        </p>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>用人话：</strong>T(n) 的增长速度<strong>至少像 f(n) 那么快</strong>。Ω 告诉你这个问题的"理论下限"。</p>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">Ω 的实战意义：证明"最优"</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          Ω 主要用于<strong>理论分析</strong>，证明某个算法的下界，从而确认它是否"最优"。
        </p>

        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1 font-bold">▸</span><span><strong>比较排序下界 Ω(n log n)：</strong>任何基于"比较"的排序算法（冒泡/快排/归并/堆排序）在最坏情况下至少需要 Ω(n log n) 次比较→ 归并排序和堆排序达到 O(n log n) = Θ(n log n)，所以它们是最优的。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1 font-bold">▸</span><span><strong>查找无序数组下界 Ω(n)：</strong>在没有索引的数组里找一个元素，最坏情况必须扫描全部 n 个→ O(n) 的线性查找已经是最优。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1 font-bold">▸</span><span><strong>矩阵乘法下界 Ω(n²)：</strong>n×n 矩阵乘法至少需要读取 n² 个输入元素——所以 Strassen 算法的 O(n²·⁸¹) 已经接近理论最优。</span></li>
        </ul>

        <div class="mb-4"><Code language="ts" :code="omegaCode" title="omega_example.ts" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>说一个算法是 Ω(n²) 并不意味着它"总是" n² —— 只意味着<strong>存在某种输入</strong>让它至少 n²。Ω 描述<strong>下界</strong>，不是保证每次都是这个。</p>
        </aside>
      </section>

      <!-- 3. 大Θ -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          大Θ (Big Theta) — 紧确界，"不多不少就是它"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>定义：</strong>T(n) = Θ(f(n)) 当且仅当 <strong>T(n) = O(f(n)) 且 T(n) = Ω(f(n))</strong>。即算法时间被 f(n) "夹住"了，上界和下界一致。
        </p>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700"><strong>核心洞察：</strong>Θ 是"最强"的渐近记号——当我们说 Θ(n²)，意味着<strong>既不会比 n² 好太多，也不会比 n² 差太多</strong>。它精确描述了增长趋势。</p>
        </div>

        <div class="mb-4"><Code language="text" :code="thetaConceptCode" title="Θ 的直观理解" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">Θ 适用的场景</h3>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1 font-bold">▸</span><span><strong>数组遍历：Θ(n)</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1 font-bold">▸</span><span><strong>选择排序：Θ(n²)</strong> —— 无论输入什么，都要比较 n(n-1)/2 次</span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1 font-bold">▸</span><span><strong>归并排序：Θ(n log n)</strong> —— O(n log n) 且 Ω(n log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1 font-bold">▸</span><span><strong>线性查找无序数组：Θ(n)</strong></span></li>
        </ul>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么日常用 O 而不是 Θ？</strong><br/>
          1. O 是"保证"——对你承诺最差情况。比你说 Θ(n²) 但实际可能有 O(n) 的优化更安全。<br/>
          2. 很多算法的上界和下界<strong>不一致</strong>——比如快速排序：O(n²) 最坏，Ω(n log n) 最好，不能说 Θ(n log n)。<br/>
          3. O 是业界和面试的通用语言——LeetCode 讨论复杂度几乎只用 O。
          </p>
        </aside>
      </section>

      <!-- 4. O/Ω/Θ 的关系 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          O / Ω / Θ 三者关系 —— 一张图讲清楚
        </h2>

        <div class="mb-4"><Code language="text" :code="relationshipCode" title="O/Ω/Θ 关系图" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">记号</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">不等式</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">一句话</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">什么时候用</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono">O(f)</td><td class="px-4 py-2 border">T ≤ c·f</td><td class="px-4 py-2 border">不会比 f 更差</td><td class="px-4 py-2 border text-xs">日常分析、面试、文档</td></tr>
              <tr><td class="px-4 py-2 border font-mono">Ω(f)</td><td class="px-4 py-2 border">T ≥ c·f</td><td class="px-4 py-2 border">不会比 f 更好</td><td class="px-4 py-2 border text-xs">证明算法最优性、理论下限</td></tr>
              <tr><td class="px-4 py-2 border font-mono">Θ(f)</td><td class="px-4 py-2 border">c₁·f ≤ T ≤ c₂·f</td><td class="px-4 py-2 border">精确就是 f 的级别</td><td class="px-4 py-2 border text-xs">精确描述、上下界一致时</td></tr>
              <tr><td class="px-4 py-2 border font-mono">o(f)</td><td class="px-4 py-2 border">T &lt; c·f (严格)</td><td class="px-4 py-2 border">比 f 严格更优</td><td class="px-4 py-2 border text-xs">极少用，"不紧的上界"</td></tr>
              <tr><td class="px-4 py-2 border font-mono">ω(f)</td><td class="px-4 py-2 border">T &gt; c·f (严格)</td><td class="px-4 py-2 border">比 f 严格更差</td><td class="px-4 py-2 border text-xs">极少用，"不紧的下界"</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆口诀：</strong><br/>
          "O 是天花板（上界），Ω 是地板（下界），Θ 是夹心饼干（紧确界）。<br/>
          面试用 O，理论研究用 Ω，精确描述用 Θ，o 和 ω 可以忘掉。"
          </p>
        </aside>
      </section>

      <!-- 5. 最佳/最坏/平均 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          最佳/最坏/平均情况 —— 和 O/Ω/Θ 不是一回事！
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          初学者最容易混淆的概念：<strong>"最佳/最坏/平均"描述的是输入，O/Ω/Θ 描述的是增长界。</strong>
          两者<strong>正交</strong>——你可以用 O 表达最好情况，也可以用 Ω 表达最坏情况。
        </p>

        <div class="mb-4"><Code language="ts" :code="casesCode" title="cases_vs_notation.ts" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 关键区分：</strong><br/>
          - "最好/最坏/平均情况" = <strong>哪种输入</strong>？<br/>
          - "O/Ω/Θ" = <strong>用什么界来描述</strong>？<br/>
          你可以说"最坏情况的 O(n²)"、"平均情况的 Θ(n log n)"、"最好情况的 Ω(1)"。<br/>
          日常说的"这个算法 O(n²)"，默认指<strong>最坏情况的上界</strong>。
          </p>
        </aside>
      </section>

      <!-- 6. 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>O (上界) = "不会更差"</strong>，Ω (下界) = "至少需要"，Θ (紧确界) = "就是这个级别"</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>日常开发/面试<strong>用 O 就够了</strong>，默认指最坏情况</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Ω 主要用于<strong>理论分析</strong>——证明算法无法被进一步优化</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Θ 用于上下界一致的场景——<strong>精确描述</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>"情况"（输入） ≠ "记号"（描述方式）</strong>——两者正交，不要混淆</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-1-complexity/dsa-1-1-big-o/dsa-1-1-1-big-o" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：大O记号</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-1-complexity/dsa-1-1-big-o/dsa-1-1-3-rules" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：复杂度计算规则 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-1", name: "渐近记号三兄弟" },
  { id: "sec-2", name: "大Ω 下界" },
  { id: "sec-3", name: "大Θ 紧确界" },
  { id: "sec-4", name: "三者关系" },
  { id: "sec-5", name: "情况的区分" },
  { id: "sec-6", name: "小结" },
]

const omegaCode = `// 下界 Ω 的直观例子

function linearSearch(arr: number[], target: number): number {
    /**
     * 线性查找的最坏情况是 Ω(n) —— 至少需要 n 次比较。
     * 为什么？因为如果 target 在最后一个位置（或不存在），
     * 你被迫检查了所有 n 个元素。
     */
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i
        }
    }
    return -1
}
// 最坏情况：target 在最后或不存在 → 必须检查所有 n 个元素
// → Ω(n)：不存在任何算法能在"不检查所有元素"的情况下
//   确认一个元素是否存在于无序数组中

// 比较排序的 Ω(n log n) 来源于决策树模型：
// n 个元素有 n! 种排列 → 决策树高度 ≥ log₂(n!)
// → log₂(n!) ≈ n log₂ n (斯特林公式)
// → 任何基于比较的排序算法需要至少 ~n log n 次比较`

const thetaConceptCode = `T(n) = Θ(f(n)) 的直观理解：

            c₂·f(n)
    ───────────────  （上界 O）
   ╱
  ╱  T(n) 实际曲线
 ╲
  ╲  c₁·f(n)
    ───────────────  （下界 Ω）
            ↑
        n₀ 之后，T(n) 被夹在 c₁·f(n) 和 c₂·f(n) 之间

例子：遍历数组求和
function sumArray(arr: number[]): number {  // T(n) = n 次加法
    let total = 0
    for (const x of arr) {                 // 循环 n 次
        total += x
    }
    return total
}

上界：T(n) ≤ 1 · n  → O(n)
下界：T(n) ≥ 1 · n  → Ω(n)  （因为每个元素至少访问一次）
上界=下界 → Θ(n) ✓

反例：快速排序
最好情况：Θ(n log n) —— 每次 pivot 均匀分割
最坏情况：Θ(n²)      —— 每次 pivot 是最小/最大值（已排序数组）
→ 快速排序不能直接说 Θ(n log n)，只能说 O(n²)，最好 Ω(n log n)`

const casesCode = `// 最佳/最坏/平均情况 vs O/Ω/Θ：两个正交维度

function insertionSort(arr: number[]): number[] {
    /** 插入排序 —— 演示三种情况 */
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i]
        let j = i - 1
        while (j >= 0 && arr[j] > key) {   // 比较+移动
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = key
    }
    return arr
}

// ─── 三种情况 ───
// 最好情况：数组已排好序
//   → 每轮 while 条件 arr[j] > key 立即为 False
//   → 内层循环只比较 1 次（共 n-1 次比较）
//   → 时间复杂度 = O(n) = Ω(n) = Θ(n) ✓

// 最坏情况：数组逆序
//   → 每轮 while 一直走到 j = -1
//   → 内层循环比较 i 次（共 n(n-1)/2 次）
//   → 时间复杂度 = O(n²) = Ω(n²) = Θ(n²) ✓

// 平均情况：随机排列
//   → 每轮平均比较 i/2 次（共 n(n-1)/4 次）
//   → 时间复杂度 = Θ(n²)

// 结论：说"插入排序 O(n²)"默认指最坏情况
// 但面试时如果被问"什么情况下插入排序快"
// → 回答"最好情况 Θ(n)，发生在数组近乎有序时"`

const relationshipCode = `渐近记号家族（按"严格程度"排列）：

o(f)  ⊂  O(f)  ⊂  Θ(f)  ⊂  Ω(f)  ⊂  ω(f)
 ↑        ↑        ↑        ↑        ↑
严格上界  上界    紧确界   下界   严格下界

最常用的是 O 和 Θ，Ω 用于理论分析，o 和 ω 极少用。

关系示例：
T(n) = 3n² + 5n + 100

属于 O(n²)  ？ ✓ 3n²+5n+100 ≤ 4n² 当 n≥n₀ ✓
属于 O(n³)  ？ ✓ 也属于（不紧的上界也行）
属于 O(n)   ？ ✗ n² 增长速度比 n 快
属于 Ω(n²)  ？ ✓ 3n²+5n+100 ≥ 3n² ✓
属于 Ω(n)   ？ ✓ 也属于（不紧的下界）
属于 Θ(n²)  ？ ✓ O(n²) 且 Ω(n²) → Θ(n²) ✓
属于 Θ(n³)  ？ ✗ 不满足 Ω(n³)，增长没到 n³`
</script>
