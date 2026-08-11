<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📚 单调栈：O(n) 解决 Next Greater Element</h1>
          <p class="text-sm text-slate-500 mt-1">单调递增/递减栈——比暴力 O(n²) 快 n 倍</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-3-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 单调栈概念 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          什么是单调栈？核心思想与模板
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>单调栈（Monotonic Stack）</strong> 是一种特殊的栈结构，栈内元素始终保持<strong>单调递增</strong>或<strong>单调递减</strong>的顺序。
          每当新元素入栈前，如果它违反了单调性，就不断弹出栈顶元素直到满足单调性为止。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          单调栈就像 CSS 的 <code>z-index</code> 层叠上下文——当你有一个更高的元素（更大的值），它会"遮挡"（弹出）所有比它低的元素。
          就像在画布上从左到右画柱子，每次新画的柱子如果比右边的矮就会被"挡掉"，只有保持递增的柱子才能被看到。React 的 Virtual DOM diff 也有类似思想——遍历过程中不断"淘汰"不需要的旧节点。
          </p>
        </aside>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>两类单调栈：</strong>
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">类型</th><th class="px-4 py-2 border border-slate-200 font-semibold">栈顶→栈底</th><th class="px-4 py-2 border border-slate-200 font-semibold">典型应用</th><th class="px-4 py-2 border border-slate-200 font-semibold">形象理解</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border"><strong>单调递增栈</strong></td><td class="px-4 py-2 border font-mono">小→大（栈顶最小）</td><td class="px-4 py-2 border">Next Greater Element、柱状图最大矩形</td><td class="px-4 py-2 border">每次弹出一个元素时，当前元素就是它的"下一个更大元素"</td></tr>
              <tr><td class="px-4 py-2 border"><strong>单调递减栈</strong></td><td class="px-4 py-2 border font-mono">大→小（栈顶最大）</td><td class="px-4 py-2 border">接雨水、视野问题</td><td class="px-4 py-2 border">每次弹出一个元素时，当前元素就是它的"下一个更小元素"</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>万能模板（单调递增栈版本）：</strong>
        </p>
        <div class="mb-4"><Code language="ts" :code="templateCode" title="monotonic_stack_template.ts" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 记忆技巧：</strong><br/>
          单调栈里存的是<strong>索引</strong>而不是值。因为我们需要知道"距离"（索引差）来计算宽度/跨度。
          值可以通过 <code>arr[stack[top]]</code> 随时取到，但反过来不行。
          </p>
        </aside>
      </section>

      <!-- 2. Next Greater Element -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          Next Greater Element I & II（#496, #503）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>Next Greater Element（NGE）</strong> 是单调栈最经典的应用。对于数组中每个元素，找它<strong>右侧第一个比它大的元素</strong>。
          暴力法需要 O(n²)，单调栈只需 O(n)。
        </p>
        <div class="mb-4"><Code language="ts" :code="ngeCode" title="next_greater_element.ts" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见陷阱：</strong><br/>
          ① #503 中循环遍历<strong>两倍长度</strong>（2n），但结果数组长度是 n，取模时用 <code>i % n</code><br/>
          ② 遍历顺序是从右往左还是从左往右？<strong>两种写法都可以</strong>，关键是方向统一。从右往左代码更直观（因为要找"右边第一个"），但从左往右在某些场景更方便（如接雨水需要左右两侧信息）<br/>
          ③ 初始化结果数组时用 <code>-1</code> 作为默认值（表示右侧没有更大元素）
          </p>
        </aside>
      </section>

      <!-- 3. Daily Temperatures -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          每日温度 Daily Temperatures（#739）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          #739 是 NGE 问题的一个变体：不是找"下一个更大的值"，而是找"下一个更高温度出现的<strong>天数差</strong>"。
          本质完全一样——单调递减栈（或者说从右向左的递增），每次弹出的栈顶元素，就用当前元素索引减去栈顶索引。
        </p>
        <div class="mb-4"><Code language="ts" :code="dailyTempCode" title="daily_temperatures.ts" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong><br/>
          Daily Temperatures 是面试高频题（Amazon、Google 都喜欢考）。这道题用单调栈可以让面试官看到你懂"空间换时间"和"利用单调性剪枝"。<br/><br/>
          <strong>三句话讲清楚：</strong><br/>
          ① 栈里存的是"还没找到更高温度"的那些天的索引<br/>
          ② 新的一天如果比栈顶温度高，意味着栈顶那天找到了答案——弹出并计算距离<br/>
          ③ 栈始终从底到顶递减温度（越往右温度越低），所以叫单调递减栈
          </p>
        </aside>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>暴力 vs 单调栈 对比（n = 1000 规模）：</strong>
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">方法</th><th class="px-4 py-2 border border-slate-200 font-semibold">时间</th><th class="px-4 py-2 border border-slate-200 font-semibold">空间</th><th class="px-4 py-2 border border-slate-200 font-semibold">核心操作</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">暴力</td><td class="px-4 py-2 border font-mono text-red-600">O(n²)</td><td class="px-4 py-2 border">O(1)</td><td class="px-4 py-2 border">每个元素往右扫描直到找到更大的</td></tr>
              <tr><td class="px-4 py-2 border">单调栈</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n)</td><td class="px-4 py-2 border">O(n)</td><td class="px-4 py-2 border">每个元素入栈/出栈各一次</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 4. Largest Rectangle in Histogram -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          柱状图中最大的矩形（#84）—— 单调栈最难的一道
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>LeetCode #84 Largest Rectangle in Histogram</strong> 是单调栈的终极考验。
          给定一个柱状图，找出其中能画出的<strong>最大矩形面积</strong>。这道题的巧妙之处在于：每个柱子能"扩展"的宽度由它左右两边<strong>第一个比它矮的柱子</strong>决定。
        </p>

        <div class="mb-4"><Code language="ts" :code="largestRectCode" title="largest_rectangle.ts" /></div>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>核心直觉：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>以柱子 <code>heights[i]</code> 为高的矩形，宽度 = 右边第一个比它矮的索引 - 左边第一个比它矮的索引 - 1</li>
          <li>用单调递增栈：遍历时遇到比栈顶矮的柱子，说明栈顶柱子的"右边界"找到了</li>
          <li>弹出栈顶，计算以该柱子为高的矩形面积。此时新栈顶是"左边界"，当前元素是"右边界"</li>
          <li>数组末尾加一个哨兵 0（保证所有柱子都能弹出计算），同时处理栈中剩余元素</li>
        </ol>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          柱状图最大矩形就像在做一个"自适应宽度布局"：每个柱子的高度固定，但它能向左向右延伸多远，取决于相邻柱子是否比它高。
          这类似于 CSS Grid 中的 <code>span</code>——只要左右两边没有"更矮的列"，就可以一直合并单元格。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见陷阱：</strong><br/>
          ① 忘记在 heights 末尾加哨兵 <code>0</code>——会导致栈中剩余元素无法被弹出计算<br/>
          ② 宽度计算：<code>i - stack[stack.length - 1] - 1</code>，注意减 1<br/>
          ③ 栈为空时，说明当前柱子左边没有更矮的柱子，左边界就是 <code>-1</code>（即宽度 = i）<br/>
          ④ 这道题最容易在面试中卡壳——建议画图手推一遍 <code>[2,1,5,6,2,3]</code>
          </p>
        </aside>
      </section>

      <!-- 5. Trapping Rain Water -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          接雨水（#42）— 三种解法对比
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>Trapping Rain Water（#42）</strong> 是另一道可以用单调栈解决的经典题。虽然双指针法是最优解（O(n) 时间 + O(1) 空间），
          但单调栈解法思路独特，面试中展示多种解法能加分。
        </p>

        <div class="mb-4"><Code language="ts" :code="rainWaterCode" title="trapping_rain_water.ts" /></div>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>三种解法对比：</strong></p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">方法</th><th class="px-4 py-2 border border-slate-200 font-semibold">时间</th><th class="px-4 py-2 border border-slate-200 font-semibold">空间</th><th class="px-4 py-2 border border-slate-200 font-semibold">核心思路</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">暴力</td><td class="px-4 py-2 border font-mono">O(n²)</td><td class="px-4 py-2 border">O(1)</td><td class="px-4 py-2 border">每个位置向左右找最高点</td></tr>
              <tr><td class="px-4 py-2 border">动态规划（前缀/后缀最大值）</td><td class="px-4 py-2 border font-mono">O(n)</td><td class="px-4 py-2 border">O(n)</td><td class="px-4 py-2 border">预计算 leftMax[] 和 rightMax[]</td></tr>
              <tr><td class="px-4 py-2 border">双指针</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n)</td><td class="px-4 py-2 border text-emerald-600">O(1)</td><td class="px-4 py-2 border">左右指针相向移动，谁矮谁动</td></tr>
              <tr><td class="px-4 py-2 border">单调递减栈</td><td class="px-4 py-2 border font-mono">O(n)</td><td class="px-4 py-2 border">O(n)</td><td class="px-4 py-2 border">按"层"计算水量，遇到凹槽就出栈算面积</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 面试技巧：</strong><br/>
          接雨水的<strong>双指针解法</strong>是面试官最想看到的（空间 O(1)），但建议先用 DP 解法讲思路，再说可以优化到双指针。
          单调栈解法可以作为"补充思路"提一下——它按层计算，思路与按列计算不同，展示思维广度。
          </p>
        </aside>
      </section>

      <!-- 6. Remove K Digits -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          移掉 K 位数字（#402）+ 其他单调栈变体
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>Remove K Digits（#402）</strong> 展示了单调栈的另一面——不是用来找"更大/更小"元素，而是用来<strong>构造最优解</strong>。
          贪心 + 单调递增栈：要使得剩下的数字最小，就要让高位的数字尽可能小。
        </p>

        <div class="mb-4"><Code language="ts" :code="removeKCode" title="remove_k_digits.ts" /></div>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>更多单调栈变体题目：</strong></p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">题目</th><th class="px-4 py-2 border border-slate-200 font-semibold">LeetCode</th><th class="px-4 py-2 border border-slate-200 font-semibold">核心思路</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">132 模式</td><td class="px-4 py-2 border font-mono">#456</td><td class="px-4 py-2 border">从右向左维护单调递减栈，找"次大值"作为潜在的 2</td></tr>
              <tr><td class="px-4 py-2 border">子数组最小值的和</td><td class="px-4 py-2 border font-mono">#907</td><td class="px-4 py-2 border">单调递增栈找"左右第一个更小元素"，计算贡献区间</td></tr>
              <tr><td class="px-4 py-2 border">最大宽度坡</td><td class="px-4 py-2 border font-mono">#962</td><td class="px-4 py-2 border">先建递减栈，再从右向左扫描</td></tr>
              <tr><td class="px-4 py-2 border">股票价格跨度</td><td class="px-4 py-2 border font-mono">#901</td><td class="px-4 py-2 border">在线单调栈（边输入边查询）</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：栈的 Push / Pop
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">LIFO：后进先出。栈元素从底部往上堆，Push 添加到顶部，Pop 从顶部移除。</p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 深度: {{ stk.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ stkStatus }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500 ml-auto">⏱️ Push O(1) · Pop O(1)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doPushS" :disabled="stkBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">Push</button>
          <button @mousedown="doPopS" :disabled="stkBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:shadow-sm disabled:opacity-40">Pop</button>
          <button @mousedown="doPeekS" :disabled="stkBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:shadow-sm disabled:opacity-40">Peek</button>
          <button @mousedown="doResetS" :disabled="stkBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="stkBox" class="w-full relative" :style="{height:stkH+'px'}">
          <v-stage :config="{width:stkW, height:stkH}">
            <v-layer>
              <v-rect v-for="b in stk" :key="b.id" :config="sBar(b)" />
              <v-text v-for="b in stk" :key="'t'+b.id" :config="sTxt(b)" />
              <v-text v-if="!stk.length" :config="{x:stkW/2-40,y:100,text:'栈为空',fontSize:14,fill:stkC.muted,align:'center'}" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>单调递增栈</strong>（栈顶最小）→ Next Greater Element，找"第一个更大的"</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>单调递减栈</strong>（栈顶最大）→ 接雨水，找"第一个更小的"</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>万能模板：</strong>遍历数组 → 违反单调性就弹栈 → 弹栈时计算结果 → 入栈</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>栈里存索引，不存值</strong>——宽度计算需要位置信息</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>#84 柱状图最大矩形</strong>是单调栈最难的一道，需要理解"左右边界"概念</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>#42 接雨水</strong>有三种解法，面试最好展示双指针 O(1) 空间 + 单调栈思路</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>#402 移掉K位数字</strong>展示了单调栈的"贪心构造"用法</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>时间复杂度通常为 <strong>O(n)</strong>，因为每个元素最多入栈一次、出栈一次</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-algorithms/dsa-2-2-7-merge" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：链表合并与排序</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-3-stack/dsa-2-3-2-expression" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：表达式求值 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const stkC={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b',muted:'#94a3b8'}
const stkW=ref(700),stkH=ref(320),stkId=ref(10)
const stkBusy=ref(false),stkStatus=ref('')
interface SB { id:number; val:number; color:string; s:number }
const stk=reactive<SB[]>([])
const stkBox=ref<HTMLDivElement>()
const d5=(ms:number)=>new Promise(r=>setTimeout(r,ms))
function stkInit(vals:number[]=[5,3,8]){ stk.length=0; vals.forEach((v,i)=>stk.push({id:i+1,val:v,color:stkC.cyan,s:1})) }
async function stkAct(msg:string,fn:()=>Promise<void>){ if(stkBusy.value)return; stkBusy.value=true;stkStatus.value=msg; try{await fn()}catch(_){};await d5(250);stkBusy.value=false;stkStatus.value='' }
function sBar(b:SB){ const bw=120,bh=32,x=stkW.value/2-bw/2,y=200-(stk.indexOf(b)+1)*38; return {x:x+(bw*(1-b.s))/2,y:y+(bh*(1-b.s))/2,width:bw*b.s,height:bh*b.s,fill:b.color,cornerRadius:6,stroke:'#64748b',strokeWidth:1.5,shadowColor:'rgba(0,0,0,.1)',shadowBlur:3} }
function sTxt(b:SB){ const bw=120,bh=32,x=stkW.value/2-bw/2,y=200-(stk.indexOf(b)+1)*38; return {x:x+(bw*(1-b.s))/2,y:y+(bh*(1-b.s))/2,width:bw*b.s,height:bh*b.s,text:String(b.val),fontSize:14,fontFamily:'monospace',fontStyle:'bold',fill:'#1e293b',align:'center',verticalAlign:'middle'} }
function doPushS(){ stkAct('Push  O(1)',async()=>{ const v=~~(Math.random()*90+10); const nb:SB={id:stkId.value++,val:v,color:stkC.green,s:0}; stk.push(nb); await d5(60); nb.s=1; await d5(400); nb.color=stkC.cyan })}
function doPopS(){ if(!stk.length)return; stkAct('Pop  O(1)',async()=>{ const top=stk[stk.length-1]; top.color=stkC.red;await d5(400);top.s=0;await d5(300);stk.pop()})}
function doPeekS(){ if(!stk.length)return; stkAct('Peek  O(1)',async()=>{ stk[stk.length-1].color=stkC.orange;await d5(600);stk[stk.length-1].color=stkC.cyan})}
function doResetS(){ stkBusy.value=false; stkInit() }
let roSK:ResizeObserver|null=null
onMounted(()=>{ stkInit(); if(stkBox.value){ stkW.value=stkBox.value.clientWidth; roSK=new ResizeObserver(e=>{const w=e[0]?.contentRect.width;if(w&&w>200)stkW.value=Math.max(300,w)}); roSK.observe(stkBox.value) }})
onUnmounted(()=>roSK?.disconnect())

const navList = [
  { id: "sec-1", name: "概念与模板" },
  { id: "sec-2", name: "Next Greater Element" },
  { id: "sec-3", name: "每日温度 #739" },
  { id: "sec-4", name: "柱状图最大矩形 #84" },
  { id: "sec-5", name: "接雨水 #42" },
  { id: "sec-6", name: "移掉K位数字 #402" },
  { id: "sec-viz", name: "🎬 栈动画" },
  { id: "sec-8", name: "小结" },
]

const templateCode = `// ===== 单调递增栈模板（栈顶最小，找 Next Greater）=====
function monotonicStack(arr: number[]): number[] {
    const n = arr.length
    const result = new Array(n).fill(-1)   // 默认 -1 表示没有更大元素
    const stack: number[] = []              // 存索引！

    // 从左往右遍历（或从右往左，两种写法等价）
    for (let i = 0; i < n; i++) {
        // 违反单调递增（当前值 > 栈顶值），弹出并记录结果
        while (stack.length > 0 && arr[i] > arr[stack[stack.length - 1]]) {
            const popped = stack.pop()!     // 被弹出的索引
            result[popped] = arr[i]         // i 就是 popped 的 Next Greater
        }
        stack.push(i)                       // 当前索引入栈，等待它的 NGE
    }
    return result
}

// ===== 单调递减栈模板（栈顶最大，找 Next Smaller）=====
function nextSmallerElement(arr: number[]): number[] {
    const n = arr.length
    const result = new Array(n).fill(-1)
    const stack: number[] = []

    for (let i = 0; i < n; i++) {
        // 违反单调递减（当前值 < 栈顶值），弹出并记录
        while (stack.length > 0 && arr[i] < arr[stack[stack.length - 1]]) {
            const popped = stack.pop()!
            result[popped] = arr[i]        // i 就是 popped 的 Next Smaller
        }
        stack.push(i)
    }
    return result
}

// ===== 从右往左版本（更直观地找"右边第一个更大"）=====
function nextGreaterFromRight(nums: number[]): number[] {
    const n = nums.length
    const res = new Array(n).fill(-1)
    const stack: number[] = []

    for (let i = n - 1; i >= 0; i--) {
        // 栈顶元素比当前小？没用了，弹掉
        while (stack.length > 0 && stack[stack.length - 1] <= nums[i]) {
            stack.pop()
        }
        // 此时栈顶就是当前元素的 Next Greater（如果栈非空）
        res[i] = stack.length > 0 ? stack[stack.length - 1] : -1
        stack.push(nums[i])                // 这里存的是值
    }
    return res
}
// 两种方向的关键差异：
// 从左往右：存索引，弹出时计算结果
// 从右往左：存值，入栈时计算结果
// 选一种你更顺手的记住即可`

const ngeCode = `// ===== LeetCode 496: Next Greater Element I =====
// nums1 是 nums2 的子集，对 nums1 每个元素找在 nums2 中的 Next Greater
function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    const map = new Map<number, number>()  // 值 → Next Greater
    const stack: number[] = []

    // 遍历 nums2，用单调递减栈（栈顶最小）找每个值的 NGE
    for (const num of nums2) {
        while (stack.length > 0 && num > stack[stack.length - 1]) {
            map.set(stack.pop()!, num)     // 被弹出的值遇到更大的了
        }
        stack.push(num)
    }
    // 栈中剩余元素没有 Next Greater，map 中不存在则返回 -1
    return nums1.map(num => map.get(num) ?? -1)
}
// 时间 O(n)  空间 O(n)

// ===== 手动模拟 nums2 = [1, 3, 4, 2] =====
// i=0 num=1: stack=[1]
// i=1 num=3: 3>1, pop 1 → map{1:3}, stack=[], push 3 → stack=[3]
// i=2 num=4: 4>3, pop 3 → map{1:3, 3:4}, stack=[], push 4 → stack=[4]
// i=3 num=2: 2<4, 不弹, push 2 → stack=[4,2]
// 最终: 4和2没有NGE → 查map返回-1
// 结果: nums1=[4,1,2] → [ -1, 3, -1 ]

// ===== LeetCode 503: Next Greater Element II（循环数组）=====
function nextGreaterElements(nums: number[]): number[] {
    const n = nums.length
    const res = new Array(n).fill(-1)
    const stack: number[] = []  // 存索引

    // 遍历两遍（模拟循环）—— i % n 取实际索引
    for (let i = 0; i < 2 * n; i++) {
        const idx = i % n
        while (stack.length > 0 && nums[idx] > nums[stack[stack.length - 1]]) {
            res[stack.pop()!] = nums[idx]
        }
        // 只在第一轮入栈（避免重复处理）
        if (i < n) stack.push(idx)
    }
    return res
}
// 时间 O(n)  空间 O(n)
// 关键：遍历 2n 次，但只在第一轮 push 索引`

const dailyTempCode = `// ===== LeetCode 739: Daily Temperatures =====
// 输入: [73,74,75,71,69,72,76,73]
// 输出: [1, 1, 4, 2, 1, 1, 0, 0]
// 含义: 第0天等1天变暖, 第1天等1天, 第2天等4天...

function dailyTemperatures(temperatures: number[]): number[] {
    const n = temperatures.length
    const answer = new Array(n).fill(0)   // 默认 0 = 之后没有更高温度
    const stack: number[] = []             // 存索引，栈中温度递减

    for (let i = 0; i < n; i++) {
        // 当前温度比栈顶高 → 栈顶元素找到了"下一个更高温度"
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevDay = stack.pop()!
            answer[prevDay] = i - prevDay  // 天数差 = 当前索引 - 之前索引
        }
        stack.push(i)
    }
    return answer
}

// ===== 手动模拟 temperatures = [73, 74, 75, 71, 69, 72, 76, 73] =====
// i=0 t=73: stack=[] → push 0, stack=[0]
// i=1 t=74: 74>73(t[0]), pop 0, answer[0]=1-0=1, push 1, stack=[1]
// i=2 t=75: 75>74(t[1]), pop 1, answer[1]=2-1=1, push 2, stack=[2]
// i=3 t=71: 71<75(t[2]), push 3, stack=[2,3]
// i=4 t=69: 69<71(t[3]), push 4, stack=[2,3,4]
// i=5 t=72: 72>69(t[4]), pop 4, answer[4]=5-4=1
//           72>71(t[3]), pop 3, answer[3]=5-3=2
//           72<75(t[2]), push 5, stack=[2,5]
// i=6 t=76: 76>72(t[5]), pop 5, answer[5]=6-5=1
//           76>75(t[2]), pop 2, answer[2]=6-2=4, push 6, stack=[6]
// i=7 t=73: 73<76(t[6]), push 7, stack=[6,7]
// 最终: answer = [1, 1, 4, 2, 1, 1, 0, 0] ✓

// ===== 暴力法对比（不要这样写）=====
function dailyTemperaturesBrute(temp: number[]): number[] {
    const n = temp.length
    const ans = new Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (temp[j] > temp[i]) {
                ans[i] = j - i
                break
            }
        }
    }
    return ans
}
// 最坏 O(n²) — 如果温度一直递减 [76,75,74,...]，每次都要扫到底`

const largestRectCode = `// ===== LeetCode 84: Largest Rectangle in Histogram =====
// 输入: [2, 1, 5, 6, 2, 3]
// 输出: 10（5和6组成的 5×2=10 的矩形）

function largestRectangleArea(heights: number[]): number {
    // 末尾加哨兵 0，保证最后所有柱子都能被弹出计算
    const h = [...heights, 0]
    const stack: number[] = []  // 单调递增栈，存索引
    let maxArea = 0

    for (let i = 0; i < h.length; i++) {
        // 当前柱子比栈顶矮 → 栈顶柱子的右边界找到了
        while (stack.length > 0 && h[i] < h[stack[stack.length - 1]]) {
            const height = h[stack.pop()!]                // 弹出柱子的高度

            // 宽度 = 右边界(i) - 左边界(新栈顶或-1) - 1
            const left = stack.length > 0 ? stack[stack.length - 1] : -1
            const width = i - left - 1

            maxArea = Math.max(maxArea, height * width)
        }
        stack.push(i)
    }
    return maxArea
}

// ===== 手动模拟 heights = [2, 1, 5, 6, 2, 3, 0(哨兵)] =====
// i=0 h=2: 栈空 → push 0, stack=[0]           # 索引0(高2)入栈等待
// i=1 h=1: 1<2(h[0])→ pop 0, height=2
//          left=-1(栈空), width=1-(-1)-1=1
//          area=2×1=2, maxArea=2
//          push 1, stack=[1]                    # 索引1(高1)入栈
// i=2 h=5: 5>1(h[1])→ push 2, stack=[1,2]     # 递增，直接入栈
// i=3 h=6: 6>5(h[2])→ push 3, stack=[1,2,3]   # 递增，直接入栈
// i=4 h=2: 2<6(h[3])→ pop 3, height=6
//          left=2(新栈顶), width=4-2-1=1
//          area=6×1=6, maxArea=6
//          2<5(h[2])→ pop 2, height=5
//          left=1(新栈顶), width=4-1-1=2
//          area=5×2=10, maxArea=10              # ★ 关键！
//          2>=1 → 停止弹出, push 4, stack=[1,4]
// i=5 h=3: 3>2 → push 5, stack=[1,4,5]
// i=6 h=0(哨兵): 0<3→pop 5,height=3,left=4,width=6-4-1=1,area=3
//          0<2→pop 4,height=2,left=1,width=6-1-1=4,area=8
//          0<1→pop 1,height=1,left=-1,width=6-(-1)-1=6,area=6
// 最终 maxArea = 10 ✓

// ===== 暴力法（O(n²)，理解用）=====
function largestRectangleBrute(heights: number[]): number {
    let maxArea = 0
    for (let i = 0; i < heights.length; i++) {
        let minH = heights[i]
        for (let j = i; j < heights.length; j++) {
            minH = Math.min(minH, heights[j])      // 当前区间最小高度
            maxArea = Math.max(maxArea, minH * (j - i + 1))
        }
    }
    return maxArea
}
// 暴力法的直觉：固定左端点 i，向右扩展 j，维护区间内最小高度
// 单调栈优化：对于每个柱子，找它能"管辖"的区间（左右第一个更矮柱子界定的范围）`

const rainWaterCode = `// ===== LeetCode 42: Trapping Rain Water =====
// 输入: [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出: 6

// ===== 解法1: 双指针（最优解 O(n) / O(1)）=====
function trap(height: number[]): number {
    let left = 0, right = height.length - 1
    let leftMax = 0, rightMax = 0
    let water = 0

    while (left < right) {
        if (height[left] < height[right]) {
            // 左边较矮 → 处理 left 指针
            leftMax = Math.max(leftMax, height[left])
            water += leftMax - height[left]  // leftMax 就是左边的"墙"
            left++
        } else {
            // 右边较矮 → 处理 right 指针
            rightMax = Math.max(rightMax, height[right])
            water += rightMax - height[right]
            right--
        }
    }
    return water
}
// 核心思想：水量由较矮的一侧决定。谁矮谁动，用 max 记录一路上的最高墙。

// ===== 解法2: DP 前缀/后缀最大值（O(n) / O(n)，最容易理解）=====
function trapDP(height: number[]): number {
    const n = height.length
    const leftMax = new Array(n).fill(0)
    const rightMax = new Array(n).fill(0)

    // 从左往右：leftMax[i] = max(height[0..i])
    leftMax[0] = height[0]
    for (let i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i])
    }

    // 从右往左：rightMax[i] = max(height[i..n-1])
    rightMax[n - 1] = height[n - 1]
    for (let i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i])
    }

    // 每个位置的接水量 = min(左边最高, 右边最高) - 自身高度
    let water = 0
    for (let i = 0; i < n; i++) {
        water += Math.min(leftMax[i], rightMax[i]) - height[i]
    }
    return water
}

// ===== 解法3: 单调递减栈（O(n) / O(n)，按层计算）=====
function trapStack(height: number[]): number {
    const stack: number[] = []   // 单调递减栈（存索引）
    let water = 0

    for (let i = 0; i < height.length; i++) {
        // 当前高度 > 栈顶 → 形成凹槽，可以积水
        while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
            const bottom = stack.pop()!  // 凹槽底部
            if (stack.length === 0) break  // 左边没有墙，无法积水

            const left = stack[stack.length - 1]  // 左墙
            const h = Math.min(height[left], height[i]) - height[bottom]
            const w = i - left - 1                 // 宽度
            water += h * w                         // 这一层的积水量
        }
        stack.push(i)
    }
    return water
}
// 单调栈的关键理解：是按"横向的层"计算水量，不是按"纵向的列"
// 每次弹出 bottom 时，left 和 i 之间、高度在 h[bottom] ~ min(h[left],h[i]) 之间的"层"就积水了
// 这是理解单调栈思维的绝佳例子——不只用于"找下一个更大/更小"`

const removeKCode = `// ===== LeetCode 402: Remove K Digits =====
// 输入: num = "1432219", k = 3  →  输出: "1219"
// 解释: 移除 4,3,2 得到 1219（最小）
//
// 核心直觉：高位数字越小，整个数越小
// 贪心策略：从左往右，如果遇到"下降"（即当前数字 < 前面的数字），
//          就把前面较大的数字弹掉（移除）

function removeKdigits(num: string, k: number): string {
    const stack: string[] = []
    let removed = 0

    for (const digit of num) {
        // 维护单调递增栈：当前数字比栈顶小，说明栈顶应该被移除
        while (stack.length > 0 && digit < stack[stack.length - 1] && removed < k) {
            stack.pop()
            removed++
        }
        stack.push(digit)
    }

    // 还没移除够 k 个？从末尾移除（此时栈是递增的，末尾最大）
    while (removed < k) {
        stack.pop()
        removed++
    }

    // 去除前导零 + 处理全空的情况
    const result = stack.join('').replace(/^0+/, '')
    return result || '0'
}

// 手动模拟: num="1432219", k=3
// i=0 d=1: stack=[] → push 1, stack=[1]
// i=1 d=4: 4>1 → push 4, stack=[1,4]
// i=2 d=3: 3<4(栈顶) & removed(0)<k(3) → pop 4, removed=1
//          push 3, stack=[1,3]
// i=3 d=2: 2<3 & removed(1)<3 → pop 3, removed=2
//          push 2, stack=[1,2]
// i=4 d=2: 2>=2 → push 2, stack=[1,2,2]
// i=5 d=1: 1<2 & removed(2)<3 → pop 2, removed=3 (已达k!)
//          停止弹出, push 1, stack=[1,2,1]
// i=6 d=9: push 9, stack=[1,2,1,9]
// 最终: "1219" → 结果 "1219" ✓

// ===== LeetCode 316: Remove Duplicate Letters（进阶）=====
// 要求：去重 + 字典序最小 + 保持相对顺序
function removeDuplicateLetters(s: string): string {
    const lastIndex = new Map<string, number>()
    for (let i = 0; i < s.length; i++) lastIndex.set(s[i], i)

    const seen = new Set<string>()
    const stack: string[] = []

    for (let i = 0; i < s.length; i++) {
        const ch = s[i]
        if (seen.has(ch)) continue  // 已经在栈中，跳过

        while (stack.length > 0 && ch < stack[stack.length - 1]
               && lastIndex.get(stack[stack.length - 1])! > i) {
            // 栈顶字符在后面还会出现 → 可以移除
            seen.delete(stack.pop()!)
        }

        stack.push(ch)
        seen.add(ch)
    }
    return stack.join('')
}
// 与 #402 的核心相似性：都是用单调栈 + 贪心构造最优解
// 区别：#316 用了 seen 集合去重 + lastIndex 保证每个字符至少出现一次`
</script>
