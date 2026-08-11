<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📐 大O记号：定义与直观理解</h1>
          <p class="text-sm text-slate-500 mt-1">衡量算法效率的通用语言——最坏情况下的增长趋势</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 1-1-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 为什么需要复杂度分析 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要复杂度分析？—— "事后统计" 的三大死穴
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          判断一个算法好不好，直觉会让我们去<strong>实测运行时间</strong>。但这种方法有三个致命问题：
        </p>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>依赖硬件——</strong>同一段代码，i9 跑 0.1 秒，树莓派跑 3 秒。哪个是"真实"时间？</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>依赖数据——</strong>排序算法在"几乎有序"和"完全逆序"的数组上表现天差地别。测一次不能代表全部。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>没法预测——</strong>当数据量从 100 涨到 100 万时，算法会多慢？实测回答不了。</div>
          </li>
        </ol>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          就像你不会在用户浏览器里跑 benchmark 来决定用哪种虚拟滚动方案——你分析 O(n) DOM 节点 vs O(visible_count) DOM 节点的<strong>增长趋势</strong>。<br/>
          复杂度分析就是让你在<strong>写代码之前</strong>就知道：数据翻 10 倍后会不会卡。
          </p>
        </aside>

        <p class="text-slate-600 leading-relaxed">
          我们需要一个<strong>不依赖硬件、不依赖具体数据、能预测大规模行为</strong>的度量方式——
          这就是<strong>渐近分析 (Asymptotic Analysis)</strong>，大O记号是其核心工具。
        </p>
      </section>

      <!-- 2. 大O的数学定义 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          大O的数学定义 —— 上界 (Upper Bound)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>定义：</strong>T(n) = O(f(n)) 当且仅当存在正常数 c 和 n₀，使得对于所有 n ≥ n₀，有 T(n) ≤ c·f(n)。
        </p>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>用人话翻译：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>T(n) = 实际运行时间（随输入规模 n 增长）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>f(n) = 一个简单的比较函数（如 n, n², log n）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>c·f(n) = 把 f(n) 放大 c 倍，让它"盖住"T(n)——只要 n 足够大 (n ≥ n₀) 就永远成立</span></li>
          </ul>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">
          简单说：<strong>大O 描述的是"最坏情况下，随着输入规模增长，算法性能的上界"。</strong>
          O(n²) 的意思是："当 n 足够大时，运行时间不会比 c·n² 更差"。
        </p>

        <div class="mb-4"><Code language="ts" :code="bigOMathCode" title="大O的直观例子" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 关键误区澄清：</strong><br/>
          1. O 不是"等于"，是"属于"—— O(n²) 是一个<strong>函数集合</strong>，5n² 和 100n² 都属于 O(n²)。<br/>
          2. O 描述的是<strong>增长趋势</strong>，不是具体时间——O(n) 的算法在数据少时可能比 O(log n) 的快。<br/>
          3. O 默认指<strong>最坏情况</strong>（面试/工作默认含义）——除非特别说明平均/最好。
          </p>
        </aside>
      </section>

      <!-- 3. 增长数量级的直观感受 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          增长数量级的直观感受 —— 把时间"可视化"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          假设 CPU 每秒处理 10⁸ 次操作，看看不同复杂度在不同数据量下的<strong>实际耗时</strong>：
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">n =</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">O(1)</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">O(log n)</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">O(n)</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">O(n log n)</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">O(n²)</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">O(2ⁿ)</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr class="hover:bg-slate-50">
                <td class="px-4 py-2 border font-mono text-xs">10</td>
                <td class="px-4 py-2 border">10ns</td>
                <td class="px-4 py-2 border">33ns</td>
                <td class="px-4 py-2 border">100ns</td>
                <td class="px-4 py-2 border">330ns</td>
                <td class="px-4 py-2 border">1μs</td>
                <td class="px-4 py-2 border">10μs</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-4 py-2 border font-mono text-xs">100</td>
                <td class="px-4 py-2 border">10ns</td>
                <td class="px-4 py-2 border">66ns</td>
                <td class="px-4 py-2 border">1μs</td>
                <td class="px-4 py-2 border">6.6μs</td>
                <td class="px-4 py-2 border">100μs</td>
                <td class="px-4 py-2 border text-red-500 font-bold">4×10¹⁶ 年</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-4 py-2 border font-mono text-xs">1,000</td>
                <td class="px-4 py-2 border">10ns</td>
                <td class="px-4 py-2 border">100ns</td>
                <td class="px-4 py-2 border">10μs</td>
                <td class="px-4 py-2 border">100μs</td>
                <td class="px-4 py-2 border">10ms</td>
                <td class="px-4 py-2 border text-red-500 font-bold">∞</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-4 py-2 border font-mono text-xs">10⁶</td>
                <td class="px-4 py-2 border">10ns</td>
                <td class="px-4 py-2 border">200ns</td>
                <td class="px-4 py-2 border">10ms</td>
                <td class="px-4 py-2 border">200ms</td>
                <td class="px-4 py-2 border text-amber-600 font-bold">~11.5 天</td>
                <td class="px-4 py-2 border text-red-500 font-bold">∞</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="px-4 py-2 border font-mono text-xs">10⁹</td>
                <td class="px-4 py-2 border">10ns</td>
                <td class="px-4 py-2 border">300ns</td>
                <td class="px-4 py-2 border">10s</td>
                <td class="px-4 py-2 border">300s</td>
                <td class="px-4 py-2 border text-red-500 font-bold">~31,688 年</td>
                <td class="px-4 py-2 border text-red-500 font-bold">∞</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 关键结论：</strong><br/>
          1. <strong>O(n²) 是算法界的"分水岭"</strong>——n 到 10⁶ 时一个 O(n²) 算法要跑 11 天，完全不可接受。<br/>
          2. O(n log n) 和 O(n) 在 n=10⁶ 时差距只有 20 倍——<strong>可以接受</strong>。<br/>
          3. O(2ⁿ) 在 n>20 就爆炸了——<strong>指数级算法只适用于 n 很小的场景</strong>。<br/>
          4. 10⁸ 次/秒的 CPU 在 O(n²) 面前也<strong>不堪一击</strong>——复杂度才是天花板，硬件升级没用。
          </p>
        </aside>

        <div class="mb-4"><Code language="ts" :code="orderDemoCode" title="order_demo.ts" /></div>
      </section>

      <!-- 4. 大O的实际意义 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          大O在实际开发中的意义 —— LeetCode 为什么会 TLE
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          刷题的核心就是<strong>分析数据规模，选择合适复杂度的算法</strong>。根据经验法则：
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">数据规模 n</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">可接受的复杂度</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">常见算法</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">n ≤ 10</td><td class="px-4 py-2 border">O(n!), O(2ⁿ)</td><td class="px-4 py-2 border">回溯、暴力全排列</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">n ≤ 20</td><td class="px-4 py-2 border">O(2ⁿ)</td><td class="px-4 py-2 border">状态压缩 DP、子集枚举</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">n ≤ 100</td><td class="px-4 py-2 border">O(n³)</td><td class="px-4 py-2 border">Floyd-Warshall、区间 DP</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">n ≤ 1,000</td><td class="px-4 py-2 border">O(n²)</td><td class="px-4 py-2 border">基础 DP、冒泡/选择/插入排序</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">n ≤ 10⁵</td><td class="px-4 py-2 border">O(n log n)</td><td class="px-4 py-2 border">排序、贪心 + 排序</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">n ≤ 10⁶</td><td class="px-4 py-2 border">O(n)</td><td class="px-4 py-2 border">线性扫描、前缀和、双指针</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">n ≤ 10⁷</td><td class="px-4 py-2 border">O(n) 或更优</td><td class="px-4 py-2 border">O(log n) 二分、O(1) 公式</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">n ≥ 10⁸</td><td class="px-4 py-2 border">O(log n) 或 O(1)</td><td class="px-4 py-2 border">数学公式、位运算</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 刷题口诀：</strong>"n 过万，O(n log n) 是极限；n 过十万，O(n) 是标配；n 过百万，O(n) 也要仔细写。"<br/>
          <strong>你的首要技能：</strong>看到数据范围 → 立刻判断允许什么复杂度的算法 → 排除不可行的方向。</p>
        </aside>
      </section>

      <!-- 5. 常见误区 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          常见误区 —— 大O 不是什么
        </h2>

        <div class="space-y-3">
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <strong class="text-amber-800 text-sm">❌ 误区1：O(n) 一定比 O(1) 慢</strong>
            <p class="text-amber-700 text-sm mt-1">错。—— n 很小的时候，O(n) 的"常数因子"可能让它更快。大O 比较的是<strong>增长趋势</strong>，不是绝对值。<br/>
            比如：O(1) 每次固定耗时 1 秒；O(n) 每次 n 纳秒。n=100 时 O(n) 才 100ns，远快于 O(1) 的 1 秒。
            </p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <strong class="text-amber-800 text-sm">❌ 误区2：O(n²) 的双重循环一定比 O(n) 的慢</strong>
            <p class="text-amber-700 text-sm mt-1">错。——如果 O(n²) 里 n=10 而 O(n) 里 n=10⁷，O(n²) 的 100 次操作远快于 O(n) 的 1000 万次。<br/>
            <strong>必须在相同 n 的前提下比较复杂度。</strong></p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <strong class="text-amber-800 text-sm">❌ 误区3：算法执行时间短 = 复杂度低</strong>
            <p class="text-amber-700 text-sm mt-1">错。——用小数据测试 O(n²) 和 O(n log n) 可能看不出区别。一定要<strong>用大数据验证</strong>。</p>
          </div>
          <div class="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <strong class="text-amber-800 text-sm">❌ 误区4：大O表示精确运行时间</strong>
            <p class="text-amber-700 text-sm mt-1">错。——O(n) 只告诉你增长是"线性的"，不告诉你具体是 2n 还是 100n。1000000n 和 0.00001n 都是 O(n)。</p>
          </div>
        </div>
      </section>

      <!-- 6. 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>大O = 最坏情况的上界</strong>——描述输入规模 n 趋于无穷时，运行时间的<strong>增长趋势</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>大O 忽略常数因子、低阶项和系数——只保留<strong>增长最快的一项</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>O(n²) 是分水岭</strong>—— n=10⁶ 时 O(n²) 要跑 11 天，不可接受</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>刷题铁律：<strong>先看数据范围 n → 推允许的复杂度 → 选算法方向</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>复杂度是软件性能的<strong>天花板</strong>——硬件升级不能弥补指数级复杂度</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-learning-path" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：学习路线图</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-1-complexity/dsa-1-1-big-o/dsa-1-1-2-omega-theta" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：大Ω与大Θ记号 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-1", name: "为什么需要复杂度分析" },
  { id: "sec-2", name: "大O的数学定义" },
  { id: "sec-3", name: "增长数量级的直观感受" },
  { id: "sec-4", name: "刷题实战意义" },
  { id: "sec-5", name: "常见误区" },
  { id: "sec-6", name: "小结" },
]

const bigOMathCode = `// 大O的直观理解：三个函数都属于 O(n²)

function algoA(n: number): number {
    // T(n) = 5n² + 3n + 100
    let count = 0
    for (let i = 0; i < n; i++) {      // n 次
        for (let j = 0; j < n; j++) {  // n 次 → n²
            count++                      // 这行执行了 n² 次
        }
    }
    // + 额外的 n 次循环和常数操作
    for (let i = 0; i < n; i++) {
        count++                          // n 次
    }
    count += 100                         // 常数 100 次
    return count
}

function algoB(n: number): number {
    // T(n) = 0.5n² - 2n
    let count = 0
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {   // n + (n-1) + ... + 1 = n(n+1)/2
            count++                      // ≈ 0.5n² 次
        }
    }
    return count
}

function algoC(n: number): number {
    // T(n) = 100n² —— 常数最大的一个
    let count = 0
    for (let k = 0; k < 100; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                count++                  // 100n² 次
            }
        }
    }
    return count
}

// 三者复杂度都是 O(n²)
// 因为大O只看增长趋势：n 很大时，n² 主导一切
// algoC (100n²) vs algoA (5n²)：对 O(n²) 来说只是 20 倍常数差异`

const orderDemoCode = `// 不同复杂度的实际增长演示

function demonstrateGrowth(nValues: number[]): void {
    /** 打印不同 n 下各复杂度的操作次数 */
    for (const n of nValues) {
        console.log(\`\\nn = \${n.toLocaleString()}\`)
        console.log(\`  O(1)      = \${1}\`)                          // 常数
        console.log(\`  O(log n)  = \${Math.floor(Math.log2(n))}\`)   // 对数
        console.log(\`  O(n)      = \${n.toLocaleString()}\`)         // 线性
        console.log(\`  O(n log n)= \${Math.floor(n * Math.log2(n)).toLocaleString()}\`) // 线性对数
        console.log(\`  O(n²)     = \${(n ** 2).toLocaleString()}\`)  // 平方
        console.log(\`  O(2ⁿ)     = \${2 ** Math.min(n, 10)}\`)       // 指数(截断)
    }
}

demonstrateGrowth([10, 100, 1000, 10000, 100000])

// 输出:
// n = 10:        O(1)=1  O(log n)=3  O(n)=10  O(n²)=100
// n = 100:       O(1)=1  O(log n)=6  O(n)=100  O(n²)=10,000
// n = 1,000:     O(1)=1  O(log n)=9  O(n)=1,000  O(n²)=1,000,000
// n = 10,000:    O(1)=1  O(log n)=13 O(n)=10,000  O(n²)=100,000,000
// n = 100,000:   O(1)=1  O(log n)=16 O(n)=100,000  O(n²)=10,000,000,000
// ↑ 注意 O(n²) 的增长速度——n 每 ×10，操作次数 ×100`
</script>
