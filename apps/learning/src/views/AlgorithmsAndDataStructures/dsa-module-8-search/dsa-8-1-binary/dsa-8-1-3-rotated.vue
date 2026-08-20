<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌀 旋转数组搜索与变体</h1>
          <p class="text-sm text-slate-500 mt-1">整体无序，拆成两段各自有序——先找旋转点，再二分</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 8-1-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">📐</span>
          结构总览：两段有序的旋转数组
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          升序数组 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[0,1,2,4,5,6,7]</code>
          向右轮转 4 位得到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[4,5,6,7,0,1,2]</code>：
          整体不再有序，但<strong>从最小值（旋转点）处切成两段，每段各自升序</strong>。二分的关键就是利用「任意 mid，至少一侧有序」这个性质。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 380" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="16" y="22" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">升序数组向右轮转 k=4 位 → 旋转数组（两段有序）</text>

            <!-- 第 1 行：原数组 -->
            <text x="16" y="60" font-size="11" font-family="monospace" fill="#64748b">原数组</text>
            <rect x="90" y="42" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="118" y="62" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">0</text>
            <rect x="154" y="42" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="182" y="62" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">1</text>
            <rect x="218" y="42" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="246" y="62" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">2</text>
            <rect x="282" y="42" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="310" y="62" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">4</text>
            <rect x="346" y="42" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="374" y="62" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">5</text>
            <rect x="410" y="42" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="438" y="62" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">6</text>
            <rect x="474" y="42" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="502" y="62" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">7</text>

            <!-- 旋转箭头 -->
            <text x="560" y="64" font-size="12" font-family="monospace" fill="#f59e0b" font-weight="bold">—— 轮转 k=4 →</text>

            <!-- 第 2 行：旋转后 -->
            <text x="16" y="142" font-size="11" font-family="monospace" fill="#64748b">旋转后</text>
            <rect x="90" y="124" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="118" y="144" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">4</text>
            <rect x="154" y="124" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="182" y="144" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">5</text>
            <rect x="218" y="124" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="246" y="144" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">6</text>
            <rect x="282" y="124" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="310" y="144" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">7</text>
            <line x1="346" y1="124" x2="346" y2="164" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 3" />
            <rect x="352" y="124" width="56" height="40" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" /><text x="380" y="144" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">0</text>
            <rect x="416" y="124" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="444" y="144" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">1</text>
            <rect x="480" y="124" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="508" y="144" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">2</text>
            <!-- 段标注 -->
            <text x="200" y="180" text-anchor="middle" font-size="10" font-family="monospace" fill="#0891b2" font-weight="bold">段1：升序 [4,5,6,7]</text>
            <text x="380" y="180" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">旋转点 = 最小值</text>
            <text x="480" y="180" text-anchor="middle" font-size="10" font-family="monospace" fill="#0891b2" font-weight="bold">段2：升序 [1,2]</text>

            <!-- 第 3 行：关键性质 -->
            <text x="16" y="230" font-size="11" font-family="monospace" fill="#334155" font-weight="bold">关键性质：任意取 mid，两侧至少有一侧「完全有序」</text>
            <rect x="60" y="248" width="290" height="38" rx="8" fill="#e0f2fe" stroke="#06b6d4" stroke-width="1.2" />
            <text x="205" y="267" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0e7490">nums[low] ≤ nums[mid] → 左半 [low,mid] 有序</text>
            <rect x="380" y="248" width="290" height="38" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.2" />
            <text x="525" y="267" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">nums[mid] &lt; nums[low] → 右半 [mid,high] 有序</text>

            <!-- 第 4 行：一次二分的归属判断 -->
            <text x="16" y="318" font-size="11" font-family="monospace" fill="#334155" font-weight="bold">一次二分（无重复时）：</text>
            <text x="16" y="344" font-size="11" font-family="monospace" fill="#64748b">左半有序 → target ∈ [low,mid] ? 是→high=mid-1 : 否→low=mid+1</text>
            <text x="16" y="366" font-size="11" font-family="monospace" fill="#64748b">右半有序 → target ∈ [mid,high] ? 是→low=mid+1 : 否→high=mid-1</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：旋转数组结构 —— 最小值 = 旋转点 = 断点，把数组切成两段升序；一次二分的核心是「先判哪侧有序，再判 target 归属」</figcaption>
        </figure>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">1</span>
          问题定义 —— 旋转数组长什么样
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          把升序数组<strong>末尾若干元素搬到开头</strong>（或开头搬到末尾），就得到旋转数组。
          典型例子：<code>[0,1,2,4,5,6,7]</code> 向右轮转 4 位 → <code>[4,5,6,7,0,1,2]</code>。
          它整体无序，但有两个关键特征：
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span><strong>两段升序：</strong>从最小值处切开，左右两段各自单调递增</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span><strong>唯一断点：</strong>旋转点（最小值）是唯一「小于左侧元素」的位置——7 到 0 是下降</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">3.</span><span><strong>轮转 0 次</strong> = 完全升序，是旋转数组的退化情形</span></li>
          </ul>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          旋转数组就像 <code>RingBuffer</code> 读指针越界后回绕到开头，或者轮播图<b>「首尾相接」</b>——图片从最后一张滚回第一张，中间断了，但断点两侧各自有序。<br/>
          也像 CSS <code>array.slice(k).concat(array.slice(0,k))</code> 做循环偏移后的产物。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">2</span>
          找旋转点 —— 最小值就是断点
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          找到最小值就等于找到了旋转点和两段升序的分界。关键是<strong>用 <code>nums[mid]</code> 与 <code>nums[high]</code> 比较</strong>：
          如果 <code>nums[mid] &gt; nums[high]</code>，说明 mid 落在左段、最小值在右半；
          否则 mid 落在右段、最小值在 <code>[low..mid]</code>（mid 自己可能是最小值）。
        </p>
        <div class="mb-4"><Code language="ts" :code="findMinCode" title="find_min_rotated.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 为什么跟 high 比而不是 low？</strong><br/>
          旋转后最小值可能出现在数组任意位置。若用 <code>nums[mid] vs nums[low]</code>，
          当 low 已经落在右段时，比较结果无法可靠区分左右段。<strong>high 永远是最「靠右」的参照</strong>，
          <code>nums[mid] &gt; nums[high]</code> 必然说明 mid 在左段——这是这个模板正确性的根基。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">3</span>
          两段二分 —— 先找旋转点，再搜目标段
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          最直观的思路分三步：① 用上面的模板找到旋转点 k；② 根据 <code>target vs nums[0]</code> 判断它落在左段还是右段；
          ③ 对那段做一次标准二分。逻辑最清晰，面试时最好讲。
        </p>
        <div class="mb-4"><Code language="ts" :code="twoPhaseCode" title="search_two_phase.ts" /></div>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>执行过程（nums=[4,5,6,7,0,1,2], target=6）：</strong></p>
          <ol class="space-y-1 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">1.</span><span>找最小值：mid=3 arr=7 &gt; arr[6]=2 → low=4；mid=5 arr=1 ≤ arr[6]=2 → high=5；mid=4 arr=0 ≤ arr[5]=1 → high=4；k=4</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">2.</span><span>target=6 ≥ nums[0]=4 → 落在左段 [0,3]</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">3.</span><span>对 [0,3]=[4,5,6,7] 二分：mid=1 arr=5&lt;6 → low=2；mid=2 arr=6 命中 → 返回 2</span></li>
          </ol>
        </div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">4</span>
          一次二分 —— 边判断段边收缩
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          也可以不显式找旋转点，在<strong>一轮循环里同时完成「判断 mid 在哪段」和「缩区间」</strong>：
          先看 <code>nums[low] ≤ nums[mid]</code> 确定哪半有序，再判断 target 是否落在那半，据此移动 low/high。
        </p>
        <div class="mb-4"><Code language="ts" :code="onePassCode" title="search_one_pass.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 两种写法对比：</strong>两段二分思路清晰、每段代码简单；一次二分少一次遍历、代码紧凑。
          复杂度都是 O(log n)。<strong>推荐先用两段二分把思路讲清楚</strong>，再在代码上优化成一次二分。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">5</span>
          重复元素变体 —— 无法判断时的退让
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          数组含重复时（如 <code>[1,1,1,0,1]</code>），可能出现 <code>nums[low] == nums[mid] == nums[high]</code>，
          此时既不能说左半有序也不能说右半有序。退让策略：<strong>low++ 和 high-- 各收缩一位</strong>，多花一点时间但保证正确。
        </p>
        <div class="mb-4"><Code language="ts" :code="dupCode" title="search_with_dup.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 复杂度退化：</strong>全是相同元素时（如 <code>[1,1,1,...,1]</code>），每轮只能收缩一位，
          最坏 O(n)。所以 LeetCode 81 的期望是 <strong>O(log n) 平均、O(n) 最坏</strong>——面试要主动点出这一点。</p>
        </aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">6</span>
          常见误区 —— 旋转数组的坑
        </h2>
        <div class="mb-4"><Code language="ts" :code="pitfallsCode" title="rotated_pitfalls.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 面试心法：</strong><br/>
          1. 先问「有重复吗？」——有重复会退化，先说明权衡；<br/>
          2. 找最小值永远拿 <code>nums[mid] vs nums[high]</code>；<br/>
          3. 两段二分记得特判 <code>k===0</code>（未旋转）；<br/>
          4. 一次二分的归属判断要写闭区间条件（含等号），最容易漏。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">🎬</span>
          动画演示：找旋转点 + 目标搜索（两阶段）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          阶段 1：用 <code>nums[mid] vs nums[high]</code> 收敛到<strong>旋转点（最小值）</strong>（绿色）；
          阶段 2：判断 target 落入哪段，对该段做标准二分（灰 = 已排除）。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ bars.length }}</span>
          <span class="bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-mono">🧭 {{ phaseLabel }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ ptrStr }}</span>
          <span class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono min-w-[150px] text-center">{{ status || '就绪' }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @click="runTwoPhase" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">▶ 两阶段搜索</button>
          <label class="flex items-center gap-1 text-xs text-slate-500">
            🎯 目标
            <input v-model.number="targetVal" type="number"
              class="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-shadow" />
          </label>
          <button @click="randomRotate" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">🎲 随机旋转</button>
          <button @click="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-rect v-for="b in bars" :key="b.id" :config="rectCfg(b)" />
              <v-text v-for="b in bars" :key="'v'+b.id" :config="valCfg(b)" />
              <v-text v-for="(b,i) in bars" :key="'i'+b.id" :config="idxCfg(i)" />
              <v-arrow v-if="low>=0" :config="ptrArrow(low, C.green, 0)" />
              <v-text v-if="low>=0" :config="ptrText(low, 'low', C.green, 0)" />
              <v-arrow v-if="mid>=0" :config="ptrArrow(mid, C.orange, 18)" />
              <v-text v-if="mid>=0" :config="ptrText(mid, 'mid', C.orange, 18)" />
              <v-arrow v-if="high>=0" :config="ptrArrow(high, C.red, 36)" />
              <v-text v-if="high>=0" :config="ptrText(high, 'high', C.red, 36)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>旋转数组 = 两段升序</strong>，最小值（旋转点）是唯一断点</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>找最小值</strong>用 <code>nums[mid] vs nums[high]</code>：mid&gt;high → 右半找，否则左半找（含 mid）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>两段二分：</strong>先找旋转点 k → 按 <code>target vs nums[0]</code> 选段 → 标准二分</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>一次二分：</strong>先判 <code>nums[low]≤nums[mid]</code> 哪侧有序，再判 target 归属，O(log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>重复元素</strong>导致三相等无法判断 → low++/high-- 退让，最坏 O(n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>别忘 k=0</strong>（完全有序）的退化情形</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-1-binary/dsa-8-1-2-answer" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：二分答案</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-2-backtracking/dsa-8-2-1-template" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：回溯模板 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ===== 🎬 旋转数组两阶段动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H = ref(340), W = ref(700), G = 9, MXH = 180, BASE = 235
interface Bar { id:number; val:number; color:string; s?:number; _x?:number; _y?:number; _h?:number }
const bars = reactive<Bar[]>([])
const busy = ref(false), status = ref(''), nid = ref(100)
const low = ref(-1), high = ref(-1), mid = ref(-1)
const phase = ref<'idle'|'find-min'|'search'>('idle')
const targetVal = ref(6)
const box = ref<HTMLDivElement>()
const sh = (v:number)=>Math.max(4,v)
const d = (ms:number)=>new Promise(r=>setTimeout(r,ms))

const baseSorted = [0, 1, 2, 4, 5, 6, 7]
const phaseLabel = computed(() =>
  phase.value==='find-min' ? '阶段1 找旋转点' : phase.value==='search' ? '阶段2 目标搜索' : '就绪')
const ptrStr = computed(() => {
  const l = low.value, m = mid.value, h = high.value
  return 'low=' + (l<0?'—':l) + ' · mid=' + (m<0?'—':m) + ' · high=' + (h<0?'—':h)
})

function bwNow() { return Math.min(54, Math.floor((W.value-20)/(bars.length||1)-G)) }
function barCx(i:number) { return ((bars[i] as any)?._x || 0) + bwNow()/2 }
function layout() {
  const bw = bwNow(), total = bars.length*(bw+G)-G, sx = Math.max(10,(W.value-total)/2)
  const maxV = Math.max(...bars.map(b=>b.val),1)
  bars.forEach((b,i)=>{ b._x = sx+i*(bw+G); b._h = Math.max(30,(b.val/maxV)*MXH); b._y = BASE-(b._h||30) })
}
function rectCfg(b:any) {
  const bw = bwNow(); const s = b.s ?? 1; const isGhost = b.color === C.ghost
  return {
    x: b._x+(bw*(1-s))/2, y: b._y, width: bw*s, height: sh(b._h||30)*s,
    fill: b.color, cornerRadius: [4,4,0,0],
    stroke: isGhost?'transparent':'#94a3b8', strokeWidth: isGhost?0:1,
    shadowColor: isGhost?'transparent':'rgba(0,0,0,0.12)', shadowBlur: isGhost?0:6, shadowOffsetY: isGhost?0:2,
    opacity: isGhost?0:1,
  }
}
function valCfg(b:any) {
  const bw = bwNow(); const s = b.s ?? 1; const h = sh(b._h||30)*s
  return { x: b._x+(bw*(1-s))/2, y: b._y+2, width: bw*s, height: h-4, text: h>20?String(b.val):'',
    fontSize: Math.round(Math.min(14,bw*.3)*s), fontFamily:'monospace', fontStyle:'bold',
    fill: h>32?'#fff':C.text, align:'center', verticalAlign:'middle' }
}
function idxCfg(i:number) {
  const bw = bwNow()
  return { x:(bars[i]as any)?._x||0, y:BASE+6, width:bw, text:'['+i+']',
    fontSize: Math.min(10,bw*.2), fontFamily:'monospace', fill:C.muted, align:'center' }
}
function ptrArrow(idx:number, color:string, lane:number) {
  const cx = barCx(idx)
  return { points:[cx, BASE+lane+14, cx, BASE+lane+4], stroke:color, fill:color, pointerLength:6, pointerWidth:6 }
}
function ptrText(idx:number, name:string, color:string, lane:number) {
  const cx = barCx(idx)
  return { x: cx-44, y: BASE+lane+16, width: 88, text: name+'='+idx, fontSize: 10,
    fontFamily:'monospace', fontStyle:'bold', fill: color, align:'center' }
}

function setData(arr:number[]) {
  bars.length = 0
  arr.forEach((v,i)=>bars.push({id:i+1,val:v,color:C.cyan,s:1}))
  reset()
}
function reset() {
  bars.forEach(b=>{ b.color=C.cyan; b.s=1 })
  low.value=-1; high.value=-1; mid.value=-1; phase.value='idle'; status.value=''
  layout()
}
function randomRotate() {
  if (busy.value) return
  const k = Math.floor(Math.random()*7)                  // 0..6，0 = 完全有序
  const arr = baseSorted.slice(k).concat(baseSorted.slice(0, k))
  setData(arr)
  targetVal.value = arr[Math.floor(Math.random()*arr.length)]
}
function doReset() { reset() }

async function act(msg:string, fn:()=>Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

async function runTwoPhase() {
  const t = +targetVal.value
  if (isNaN(t) || busy.value) return
  act('旋转数组搜索  O(log n)', async () => {
    reset()
    const n = bars.length

    // ===== 阶段 1：找旋转点（最小值）=====
    phase.value = 'find-min'
    let lo = 0, hi = n - 1
    low.value = lo; high.value = hi
    while (lo < hi) {
      const m = Math.floor((lo + hi) / 2)
      mid.value = m
      bars[m].color = C.orange; bars[m].s = 1.12; layout()
      status.value = 'mid=' + m + '，比较 nums[' + m + ']=' + bars[m].val + ' vs nums[high]=' + bars[hi].val
      await d(700)
      if (bars[m].val > bars[hi].val) {
        // mid 在左段，最小值在右半
        for (let i = lo; i <= m; i++) bars[i].color = C.ghost
        lo = m + 1; low.value = lo
        status.value = bars[m].val + ' > ' + bars[hi].val + ' → mid 在左段，向右找：low=' + lo
      } else {
        // mid 在右段，最小值在 [lo..m]
        for (let i = m + 1; i <= hi; i++) bars[i].color = C.ghost
        hi = m; high.value = hi
        status.value = bars[m].val + ' ≤ ' + bars[hi].val + ' → mid 在右段，向左找：high=' + hi
      }
      bars[m].s = 1
      mid.value = -1
      await d(500)
    }
    const k = lo
    bars[k].color = C.green; bars[k].s = 1.15; layout()
    status.value = '🎯 旋转点 = 最小值 ' + bars[k].val + ' @ ' + k + '（断点处两段有序）'
    await d(700)

    // ===== 阶段 2：目标搜索 =====
    phase.value = 'search'
    let segLo = 0, segHi = n - 1
    if (k > 0) {
      if (t >= bars[0].val) { segLo = 0; segHi = k - 1 }
      else { segLo = k; segHi = n - 1 }
    }
    for (let i = 0; i < n; i++) {
      if (i < segLo || i > segHi) bars[i].color = C.ghost
      else if (i !== k) bars[i].color = C.cyan
      bars[i].s = 1
    }
    low.value = segLo; high.value = segHi; mid.value = -1
    status.value = 'target=' + t + ' 落入 ' + (t >= bars[0].val ? '左段' : '右段') + ' [' + segLo + ',' + segHi + ']'
    await d(700)

    let l = segLo, h = segHi, ans = -1
    while (l <= h) {
      const m = Math.floor((l + h) / 2)
      mid.value = m
      bars[m].color = C.orange; bars[m].s = 1.12; layout()
      status.value = '二分 mid=' + m + '：比较 ' + bars[m].val + ' vs ' + t
      await d(650)
      if (bars[m].val === t) {
        bars[m].color = C.green; bars[m].s = 1.18; layout()
        ans = m
        status.value = '✅ 找到 ' + t + ' @ ' + m
        break
      } else if (bars[m].val < t) {
        for (let i = l; i <= m; i++) bars[i].color = C.ghost
        l = m + 1; low.value = l
        status.value = bars[m].val + ' < ' + t + ' → 舍弃左半，low=' + l
        await d(450)
      } else {
        for (let i = m; i <= h; i++) bars[i].color = C.ghost
        h = m - 1; high.value = h
        status.value = bars[m].val + ' > ' + t + ' → 舍弃右半，high=' + h
        await d(450)
      }
      mid.value = -1
    }
    mid.value = -1
    if (ans < 0) status.value = '❌ 未找到 ' + t
    await d(400)
  })
}

let ro: ResizeObserver | null = null
onMounted(() => {
  setData([4, 5, 6, 7, 0, 1, 2])
  if (box.value) {
    W.value = box.value.clientWidth; layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== navList =====
const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "问题定义" },
  { id: "sec-2", name: "找旋转点" },
  { id: "sec-3", name: "两段二分" },
  { id: "sec-4", name: "一次二分" },
  { id: "sec-5", name: "重复元素变体" },
  { id: "sec-6", name: "常见误区" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

const findMinCode = `// ─── 找旋转点 = 找最小值 ───
// 用 nums[mid] 与 nums[high] 比较（不要用 low）：
//   nums[mid] > nums[high]  → mid 在左段，最小值在右半 → low = mid + 1
//   nums[mid] <= nums[high] → mid 在右段，最小值在 [low..mid] → high = mid
function findMin(nums: number[]): number {
    let low = 0, high = nums.length - 1
    while (low < high) {
        const mid = low + ((high - low) >> 1)
        if (nums[mid] > nums[high]) low = mid + 1
        else high = mid
    }
    return nums[low]          // low 就是旋转点（最小值下标）
}
// findMin([4,5,6,7,0,1,2]) → 0`

const twoPhaseCode = `// ─── 两段二分：先找旋转点，再对目标段标准二分 ───
function searchTwoPhase(nums: number[], target: number): number {
    // 1) 找旋转点 k（最小值下标）
    let low = 0, high = nums.length - 1
    while (low < high) {
        const mid = low + ((high - low) >> 1)
        if (nums[mid] > nums[high]) low = mid + 1
        else high = mid
    }
    const k = low

    // 2) 判断 target 落在哪一段
    let lo: number, hi: number
    if (k === 0) { lo = 0; hi = nums.length - 1 }        // 未旋转
    else if (target >= nums[0]) { lo = 0; hi = k - 1 }  // 左段
    else { lo = k; hi = nums.length - 1 }               // 右段

    // 3) 标准二分
    while (lo <= hi) {
        const mid = lo + ((hi - lo) >> 1)
        if (nums[mid] === target) return mid
        else if (nums[mid] < target) lo = mid + 1
        else hi = mid - 1
    }
    return -1
}
// searchTwoPhase([4,5,6,7,0,1,2], 6) → 2
// searchTwoPhase([4,5,6,7,0,1,2], 1) → 5`

const onePassCode = `// ─── 一次二分：一轮循环里同时「判段」和「收缩」───
function searchOnePass(nums: number[], target: number): number {
    let low = 0, high = nums.length - 1
    while (low <= high) {
        const mid = low + ((high - low) >> 1)
        if (nums[mid] === target) return mid

        if (nums[low] <= nums[mid]) {            // mid 在左段 → 左半有序
            if (nums[low] <= target && target < nums[mid]) high = mid - 1
            else low = mid + 1
        } else {                                  // mid 在右段 → 右半有序
            if (nums[mid] < target && target <= nums[high]) low = mid + 1
            else high = mid - 1
        }
    }
    return -1
}
// searchOnePass([4,5,6,7,0,1,2], 6) → 2
// 复杂度同为 O(log n)，且无需额外找旋转点`

const dupCode = `// ─── 重复元素变体（LeetCode 81）───
// 难点：nums[low]==nums[mid]==nums[high] 时无法判断 mid 在哪段
// 退让：low++ 和 high-- 各收缩一位，保证不丢答案
function searchWithDup(nums: number[], target: number): number {
    let low = 0, high = nums.length - 1
    while (low <= high) {
        const mid = low + ((high - low) >> 1)
        if (nums[mid] === target) return mid

        if (nums[low] === nums[mid] && nums[mid] === nums[high]) {
            high--; low++                        // 三相等，无法判断，各缩一位
        } else if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) high = mid - 1
            else low = mid + 1
        } else {
            if (nums[mid] < target && target <= nums[high]) low = mid + 1
            else high = mid - 1
        }
    }
    return -1
}
// searchWithDup([1,1,1,0,1], 0) → 3
// 最坏情况（全相等）退化为 O(n)`

const pitfallsCode = `// ─── 常见错误 ───

// ❌ 错误 1：找最小值用 nums[mid] vs nums[low]
// low 可能已经落在右段，无法可靠区分左右段
// 正确：nums[mid] > nums[high] → mid 必在左段

// ❌ 错误 2：忽略「未旋转」（k=0）的情形
// 完全有序时 target 必在 [0,n-1]，两段二分必须特判 k===0

// ❌ 错误 3：一次二分的归属判断漏等号
// 左段有序判定 nums[low] <= nums[mid]（含等号）
// target 归属判断是闭区间条件，别把 < 写成 <= 或漏掉

// ❌ 错误 4：重复元素还硬要 O(log n)
// 三相等时只能 low++/high--，最坏退化成 O(n)，先讲清权衡`
</script>
