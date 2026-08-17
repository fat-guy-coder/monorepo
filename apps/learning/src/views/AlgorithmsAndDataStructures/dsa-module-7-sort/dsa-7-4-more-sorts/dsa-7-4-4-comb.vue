<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🪮 梳排序：gap 递减的冒泡改进</h1>
          <p class="text-sm text-slate-500 mt-1">先用大步距消除远距离逆序，再逐步缩小 gap 精修</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-4-4</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：大步距比较交换，gap 逐轮缩小到 1
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>梳排序</strong>：冒泡的相邻比较只解决「相邻逆序」，小元素每轮只挪一格（乌龟问题）。
          梳排序让<strong>比较的两个元素相隔 gap</strong>（初始 gap = n，每轮 ÷1.3 收缩），
          先<strong>大步消除远距离逆序</strong>，最后 gap=1 时退化为冒泡精修。下图左侧展示 gap=5 时的比较配对（橙色弧线），
          右侧展示 gap 收缩序列 5→3→2→1。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="cb-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#0891b2" />
              </marker>
            </defs>
            <text x="16" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">梳排序：比较相隔 gap 的元素 —— 大步消逆序（gap=5），再小步精修（gap→1）</text>

            <!-- 左：gap=5 的比较配对 -->
            <rect x="24" y="52" width="300" height="136" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
            <text x="174" y="70" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">gap = 5：相隔 5 位两两比较</text>
            <path d="M 57 96 Q 157 60 257 96" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3" />
            <path d="M 97 96 Q 197 60 297 96" fill="none" stroke="#60a5fa" stroke-width="2" stroke-dasharray="4 3" />
            <rect x="40" y="98" width="34" height="56" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="57" y="126" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <rect x="80" y="150" width="34" height="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="97" y="152" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="120" y="138" width="34" height="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="137" y="146" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="160" y="126" width="34" height="28" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="177" y="140" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="200" y="92" width="34" height="62" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="217" y="123" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <rect x="240" y="146" width="34" height="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="257" y="150" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="280" y="110" width="34" height="44" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="297" y="132" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <text x="174" y="180" text-anchor="middle" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">配对 (0,5)(1,6)：8 与 2 交换、1 与 7 比较 → 长距离移动</text>

            <!-- 右：gap 收缩序列 -->
            <rect x="348" y="52" width="348" height="136" rx="10" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5" />
            <text x="522" y="70" text-anchor="middle" font-size="11" font-family="monospace" fill="#16a34a">gap 收缩序列（每轮 ÷1.3 向下取整）</text>
            <rect x="380" y="104" width="52" height="44" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="406" y="126" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="452" y="110" width="52" height="38" rx="6" fill="#fbbf24" stroke="#d97706" stroke-width="1.5" />
            <text x="478" y="129" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="524" y="116" width="52" height="32" rx="6" fill="#fcd34d" stroke="#d97706" stroke-width="1.5" />
            <text x="550" y="132" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="596" y="122" width="52" height="26" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" />
            <text x="622" y="135" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
            <line x1="434" y1="126" x2="450" y2="129" stroke="#64748b" stroke-width="2" marker-end="url(#cb-arr)" />
            <line x1="506" y1="129" x2="522" y2="132" stroke="#64748b" stroke-width="2" marker-end="url(#cb-arr)" />
            <line x1="578" y1="132" x2="594" y2="135" stroke="#64748b" stroke-width="2" marker-end="url(#cb-arr)" />
            <text x="522" y="180" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">gap=1 时退化为冒泡（带 flag 提前终止）→ 完成排序</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：gap=5 时元素一次能跨 5 位移动 —— 这正是解决「乌龟问题」的关键</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：gap 大步交换（长距离移动） / gap 收缩到 1（冒泡精修）</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">gap=4 一趟：9 向右跳 4 位、4 向左跳 4 位</p>
            <svg viewBox="0 0 300 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="cb-a1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a" />
                </marker>
              </defs>
              <text x="8" y="16" font-size="10" font-family="monospace" fill="#64748b">gap=4 比较前</text>
              <rect x="6" y="26" width="34" height="26" rx="3" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" />
              <text x="23" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <rect x="44" y="26" width="34" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="61" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="82" y="26" width="34" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="99" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <rect x="120" y="26" width="34" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="137" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
              <rect x="158" y="26" width="34" height="26" rx="3" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" />
              <text x="175" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="196" y="26" width="34" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="213" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <line x1="140" y1="60" x2="140" y2="80" stroke="#16a34a" stroke-width="2" marker-end="url(#cb-a1)" />
              <text x="8" y="96" font-size="10" font-family="monospace" fill="#64748b">交换后（9 与 5 换、8 与 4 换）</text>
              <rect x="6" y="106" width="34" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="23" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="44" y="106" width="34" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="61" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="82" y="106" width="34" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="99" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <rect x="120" y="106" width="34" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="137" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
              <rect x="158" y="106" width="34" height="26" rx="3" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="175" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">9</text>
              <rect x="196" y="106" width="34" height="26" rx="3" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="213" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
              <text x="8" y="152" font-size="10" font-family="monospace" font-weight="bold" fill="#16a34a">一次交换跨 4 位 —— 冒泡要 4 轮，梳排序 1 步 ✓</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">大步距交换：把「远距离逆序」一次性消除</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">gap 收缩：5 → 3 → 2 → 1（收缩因子 1.3）</p>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="cb-a2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                </marker>
              </defs>
              <text x="8" y="16" font-size="10" font-family="monospace" fill="#64748b">gap 从 n 逐轮收缩（每次 ÷1.3 向下取整）</text>
              <rect x="14" y="44" width="56" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="42" y="64" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="96" y="50" width="56" height="34" rx="6" fill="#fbbf24" stroke="#d97706" stroke-width="1.5" />
              <text x="124" y="67" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="178" y="56" width="56" height="28" rx="6" fill="#fcd34d" stroke="#d97706" stroke-width="1.5" />
              <text x="206" y="70" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="260" y="62" width="56" height="22" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" />
              <text x="288" y="73" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
              <line x1="72" y1="64" x2="94" y2="67" stroke="#64748b" stroke-width="2" marker-end="url(#cb-a2)" />
              <line x1="154" y1="67" x2="176" y2="70" stroke="#64748b" stroke-width="2" marker-end="url(#cb-a2)" />
              <line x1="236" y1="70" x2="258" y2="73" stroke="#64748b" stroke-width="2" marker-end="url(#cb-a2)" />
              <text x="8" y="110" font-size="10" font-family="monospace" fill="#64748b">为什么 1.3？实验统计：收缩因子 ≈ 1.3 时比较次数最少</text>
              <text x="8" y="130" font-size="10" font-family="monospace" fill="#64748b">gap = 1 时：比较相邻元素 → 退化为带 flag 的冒泡</text>
              <text x="8" y="152" font-size="10" font-family="monospace" font-weight="bold" fill="#16a34a">先粗后细：大步打散逆序，小步精修到位 ✓</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">gap 序列决定性能：1.3 是经验最优收缩因子</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 思想 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          思想：用大步距解决「乌龟问题」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          冒泡有两个著名缺陷：<strong>乌龟</strong>（小元素每次只挪一格，慢）与<strong>兔子</strong>（大元素每轮能冒很多格，快）。
          梳排序的洞察：如果比较<strong>相隔 gap</strong> 的两个元素，一次交换就能让元素<strong>跨过 gap 个位置</strong>——
          逆序被「批量」消除。gap 从 n 开始逐轮除以 1.3 收缩，最后缩到 1 时就是普通冒泡；
          此时数组已经「基本有序」，冒泡只需很少的交换就能收尾。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>令 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">gap = n</code>，每轮 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">gap = max(1, ⌊gap / 1.3⌋)</code> 收缩</li>
          <li>对每个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i</code>，比较 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">a[i]</code> 与 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">a[i+gap]</code>，前大后小就交换</li>
          <li>gap 较大的轮次：元素<strong>一次跨 gap 位</strong>，远距离逆序快速消除</li>
          <li>gap=1 时退化为冒泡：此时数组接近有序，很快结束（可加 flag 提前终止）</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          梳排序 ≈ <strong>先用粗齿梳子梳理长头发，再换细齿</strong>：粗齿一梳带过一大片打结，细齿再逐根理顺——
          而不是用细齿从头到尾一点一点抠（那就是冒泡）。<br/>
          大步距 ≈ <strong>批量搬货</strong>：与其每次只把「最大的」挪一格，不如让两个相隔很远的元素直接对调，
          一次顶冒泡好几轮。<br/>
          收缩因子 ≈ <strong>梳齿越来越密</strong>：先疏后密，最后密齿把每一根都理直。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 1：gap 收缩太快 / 太慢</strong><br/>
          收缩因子小于 1.25：gap 缩得太慢，浪费轮次；大于 1.3 太多（比如 ÷2）：gap 跳过关键间距，
          大步的「打散效果」打折扣，反而变慢。<strong>工程上就用 1.3</strong>（实验最优区间 1.25~1.33）。</p>
        </aside>
      </section>

      <!-- 2. gap 收缩因子 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          gap 收缩因子 1.3：为什么是它
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          gap 序列直接决定梳排序的性能。经验研究表明：<strong>收缩因子在 1.3 附近时比较次数最少</strong>。
          每次 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">gap = max(1, ⌊gap / 1.3⌋)</code>，
          从 n 出发大约 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">log₁.₃(n)</code> 轮收缩到 1——
          对 n=1000 约 22 轮。注意：gap 是<strong>向下取整</strong>，且最后一轮必须等于 1（否则无法保证完全有序）。
        </p>
        <div class="mb-4"><Code language="ts" :code="combGapCode" title="comb_gap_sequence.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          gap 序列 ≈ <strong>梳子的齿距表</strong>：齿距 5mm → 3mm → 2mm → 1mm，逐级加密；
          如果直接跳到 1mm，前面的大结根本没被打开，细齿会卡住（退化成冒泡）。<br/>
          「最后必须到 1」≈ <strong>最后一步必须逐根检查</strong>：不管之前齿距多大，
          最后用 1 的齿距从头到尾过一遍，才能保证每一处都理顺。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>有的实现用 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">⌊gap × 10 / 13⌋</code> 代替 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">⌊gap / 1.3⌋</code>，
          两者等价（避免浮点）；还有变体用 1.3 的幂序列或斐波那契 gap，都属于「先粗后细」的同一个思想。</p>
        </aside>
      </section>

      <!-- 3. 实现 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          实现：gap 循环 + 比较交换 + flag
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          外层 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">while (gap &gt; 1 || swapped)</code>：
          gap 大于 1 时必须继续（大步消除逆序）；gap 等于 1 时若某一轮没有交换（swapped 为 false）就结束。
          内层从 0 扫到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">n-gap-1</code>，
          比较 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">a[i]</code> 与 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">a[i+gap]</code>。
        </p>
        <div class="mb-4"><Code language="ts" :code="combBasicCode" title="comb_basic.ts" /></div>
        <div class="mb-4"><Code language="ts" :code="combFlagCode" title="comb_flag.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          实现 ≈ <strong>先疏后密的两次清扫</strong>：第一遍用大笤帚把大块垃圾扫到该去的区域（gap 大），
          第二遍用细扫帚逐寸检查（gap=1）。<br/>
          flag ≈ <strong>清扫后的检查</strong>：gap=1 的某一遍扫完发现没有任何东西需要挪动——整条街已经干净，收工。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 2：循环条件写成 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">while (gap &gt; 1)</code></strong><br/>
          这样 gap=1 后循环直接退出——<strong>最后一轮相邻冒泡根本没跑</strong>，数组可能仍含相邻逆序，排序结果错误！
          必须 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">while (gap &gt; 1 || swapped)</code>，保证 gap=1 后继续直到无交换。</p>
        </aside>
      </section>

      <!-- 4. 复杂度 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          复杂度：最坏约 O(n²)，平均接近 O(n log n)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>平均/最好</strong>：gap 大步距让数组快速接近有序，实用上<strong>接近 O(n log n)</strong> 的表现
          （比冒泡快一个量级）。<br/>
          <strong>最坏</strong>：约 <strong>O(n²)</strong>（退化分析：每轮交换次数随 gap 收缩而累积，常数项远小于冒泡）。<br/>
          <strong>空间 O(1)</strong> 原地；<strong>稳定性 ❌</strong>——gap &gt; 1 时交换的是<strong>相隔很远</strong>的元素，
          必然可能越过相等元素（这也是它比冒泡快却牺牲了稳定性的原因）。
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-2">⏱️ 复杂度</p>
            <ul class="text-xs text-slate-600 space-y-1 font-mono">
              <li>最好：接近 O(n log n)（实用）</li>
              <li>平均：接近 O(n log n)</li>
              <li>最坏：约 O(n²)（常数远小于冒泡）</li>
              <li>gap 轮数：≈ log₁.₃(n)</li>
              <li>空间：O(1) 原地</li>
              <li>稳定性：❌ 不稳定（远距离交换）</li>
            </ul>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-2">✅ 三件事</p>
            <ul class="text-xs text-slate-600 space-y-1">
              <li>▸ <strong>每轮</strong>：gap ÷1.3，比较相隔 gap 的元素并交换</li>
              <li>▸ <strong>关键</strong>：gap=1 后必须继续到无交换（flag）</li>
              <li>▸ <strong>对比冒泡</strong>：大步距 → 乌龟问题消失，平均快一个量级</li>
            </ul>
          </div>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>梳排序是「不额外开数组、又想摆脱 O(n²)」的轻量选择——内存极紧且数据量中等时可用；
          但它不稳定、最坏仍 O(n²)，追求稳定/最坏保证请用归并，追求常数请用快排。</p>
        </aside>
      </section>

      <!-- 5. 优缺点 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          优缺点与适用场景
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <p class="text-sm font-semibold text-emerald-700 mb-2">👍 优点</p>
            <ul class="text-xs text-emerald-800 space-y-1">
              <li>▸ 大步距一次性消除远距离逆序，摆脱「乌龟问题」</li>
              <li>▸ 平均接近 O(n log n)，比冒泡/选择快一个量级</li>
              <li>▸ 原地 O(1)，内存极紧时可用</li>
              <li>▸ 实现简单（只比冒泡多一个 gap 变量）</li>
            </ul>
          </div>
          <div class="bg-red-50 rounded-xl p-4 border border-red-200">
            <p class="text-sm font-semibold text-red-600 mb-2">👎 缺点</p>
            <ul class="text-xs text-red-700 space-y-1">
              <li>▸ 不稳定：远距离交换会颠倒相等元素顺序</li>
              <li>▸ 最坏仍是 O(n²)（退化分析存在）</li>
              <li>▸ 平均不如快排/归并/TimSort，常数无优势</li>
              <li>▸ gap 收缩因子靠经验，理论分析不严格</li>
            </ul>
          </div>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>适用场景</strong>：内存极紧（不能开 O(n) 辅助数组）且数据量中等、不要求稳定性的场景；
          或者作为「比冒泡强一点点」的教学进阶——它和鸡尾酒、希尔一起构成了
          「如何用简单思路逐步改进 O(n²) 算法」的完整谱系。真实工程排序首选仍是快排 / 归并 / 内置 sort。
        </p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          适用场景 ≈ <strong>理发店里的粗梳打底</strong>：头发打结严重时先用粗齿梳大面积梳开（gap 大），
          再用细齿梳造型（gap=1）——但真要精致的发型（稳定、严格保证），还得靠理发师手工（归并/快排）。<br/>
          谱系关系 ≈ <strong>从冒泡到梳排序</strong>：冒泡（相邻）→ 鸡尾酒（双向）→ 梳排序（大步距）→ 希尔（gap 分组插入）——
          每一步都在解决上一步的「慢」。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>需要稳定时别用梳排序——换归并/插入；
          需要最坏情况保证时也别用——换堆排序或内省排序。梳排序的价值在于「简单 + 快于 O(n²)」这个组合。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：梳排序（gap 递减）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          橙色 = 正在比较的相隔 gap 的一对柱子，红色 = 正在交换，绿色 = 完成。
          信息栏实时显示<strong>当前 gap</strong>：观察 gap 从大到小收缩，元素一次能跨越多格移动。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ bars.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔍 比较: {{ cmp }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔁 交换: {{ swp }}</span>
          <span v-if="gapSeq" class="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-mono">🪮 gap: {{ gapSeq }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
          <span v-if="result" class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">{{ result }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="runComb" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">🪮 梳排序</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-rect v-for="b in bars" :key="b.id" :config="barCfg(b)" />
              <v-text v-for="b in bars" :key="'vt'+b.id" :config="valCfg(b)" />
              <v-text v-for="(b,i) in bars" :key="'it'+b.id" :config="idxCfg(i)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 📋 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>思想</strong>：比较相隔 gap 的元素并交换，gap 从 n 逐轮 ÷1.3 收缩到 1 —— 先粗后细</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>解决的问题</strong>：冒泡的「乌龟问题」—— 大步距让元素一次跨多格，远距离逆序批量消除</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>收缩因子</strong>：1.3（实验最优）；gap=1 后必须继续到无交换（flag），否则结果错误</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度</strong>：平均接近 O(n log n)，最坏约 O(n²)，空间 O(1)，不稳定 ❌</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>优缺点</strong>：简单、原地、摆脱 O(n²) 平均表现；但不稳定、最坏无保证，工程首选仍是快排/归并</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>路线</strong>：下一节「锦标赛排序」用胜者树把选择最小优化到 O(log n)，比较次数接近理论下界</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-4-more-sorts/dsa-7-4-3-cocktail" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：鸡尾酒排序：双向冒泡</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-4-more-sorts/dsa-7-4-5-tournament" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：锦标赛排序：胜者树选择 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "思想：大步距" },
  { id: "sec-2", name: "gap 收缩因子 1.3" },
  { id: "sec-3", name: "实现" },
  { id: "sec-4", name: "复杂度与特性" },
  { id: "sec-5", name: "优缺点/适用场景" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "📋 小结" },
]

// ===== 🎬 梳排序动画（柱状图）=====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const result = ref('')
const gapSeq = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const cmp = ref(0), swp = ref(0)

interface Bar { id:number; val:number; color:string; s?:number; _x?:number; _y?:number; _h?:number }
const bars = reactive<Bar[]>([])
const BASE = 280, MXH = 220, BW = 46, G = 8

function initArr(vals: number[] = [9, 4, 8, 1, 6, 3, 7, 2, 5]) {
  bars.splice(0)   // ⚠️ splice(0)
  vals.forEach((v, i) => bars.push({ id: i + 1, val: v, color: C.cyan, s: 1 }))
  cmp.value = 0; swp.value = 0; result.value = ''; gapSeq.value = ''
  layout()
}
function layout() {
  const n = bars.length, bw = Math.min(BW, Math.floor((W.value - 20) / (n || 1) - G))
  const total = n * (bw + G) - G, sx = Math.max(10, (W.value - total) / 2), maxV = Math.max(...bars.map(b => b.val), 1)
  bars.forEach((b, i) => { b._x = sx + i * (bw + G); b._h = Math.max(28, (b.val / maxV) * MXH); b._y = BASE - b._h })
}
function barCfg(b: any) {
  const s = b.s ?? 1, bw = Math.min(BW, Math.floor((W.value - 20) / (bars.length || 1) - G))
  return { x: b._x + (bw * (1 - s)) / 2, y: b._y, width: bw * s, height: b._h * s, fill: b.color, cornerRadius: [4, 4, 0, 0],
    stroke: '#94a3b8', strokeWidth: 1, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function valCfg(b: any) {
  const s = b.s ?? 1, h = b._h * s, bw = Math.min(BW, Math.floor((W.value - 20) / (bars.length || 1) - G))
  return { x: b._x + (bw * (1 - s)) / 2, y: b._y + 2, width: bw * s, height: h - 4, text: String(b.val), fontSize: 14,
    fontFamily: 'monospace', fontStyle: 'bold', fill: h > 30 ? '#fff' : C.text, align: 'center', verticalAlign: 'middle' }
}
function idxCfg(i: number) {
  const bw = Math.min(BW, Math.floor((W.value - 20) / (bars.length || 1) - G))
  return { x: bars[i]._x ?? 0, y: BASE + 6, width: bw, text: '[' + i + ']', fontSize: 10, fontFamily: 'monospace', fill: C.muted, align: 'center' }
}
function colorAt(i: number, c: string) { if (bars[i]) bars[i].color = c }
function allCyan() { bars.forEach(b => b.color = C.cyan) }
async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch (_) { /* 忽略中断 */ }
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

// 梳排序：gap ÷1.3 递减，gap=1 后继续到无交换（flag）
async function combSort() {
  let gap = bars.length
  let swapped = false
  let round = 0
  while (gap > 1 || swapped) {
    gap = Math.max(1, Math.floor(gap / 1.3))
    round++
    swapped = false
    gapSeq.value = gapSeq.value ? `${gapSeq.value} → ${gap}` : String(gap)
    status.value = `第 ${round} 轮：gap = ${gap}（收缩因子 1.3）`
    await d(500)
    for (let i = 0; i + gap < bars.length; i++) {
      cmp.value++
      colorAt(i, C.orange); colorAt(i + gap, C.orange)
      status.value = `比较相隔 ${gap} 的 [${i}] 与 [${i + gap}]（${bars[i].val} vs ${bars[i + gap].val}）`
      await d(300)
      if (bars[i].val > bars[i + gap].val) {
        swp.value++
        colorAt(i, C.red); colorAt(i + gap, C.red)
        status.value = `${bars[i].val} > ${bars[i + gap].val} → 交换（一次跨 ${gap} 位）`
        await d(320)
        const t = { ...bars[i] }
        bars[i] = { ...bars[i + gap] }
        bars[i + gap] = t
        layout()
        swapped = true
        await d(250)
      }
      colorAt(i, C.cyan); colorAt(i + gap, C.cyan)
    }
  }
  bars.forEach(b => b.color = C.green)
  result.value = `排序完成：gap 序列 ${gapSeq.value}，比较 ${cmp.value} 次，交换 ${swp.value} 次`
}

function runComb() { act('梳排序执行中…', '梳排序 ≈O(n log n) / 最坏 O(n²)', combSort) }
function doReset() { if (busy.value) return; initArr() }

let ro: ResizeObserver | null = null
onMounted(() => {
  initArr()
  if (box.value) {
    W.value = box.value.clientWidth; layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const combGapCode = `// ===== gap 收缩序列可视化（收缩因子 1.3）=====
function gapSequence(n: number, shrink = 1.3): number[] {
  const seq: number[] = []
  let gap = n
  while (gap > 1) {
    gap = Math.max(1, Math.floor(gap / shrink))   // 向下取整，保证最终到 1
    seq.push(gap)
  }
  return seq
}
console.log(\`gap 序列：\${gapSequence(1000).join(' → ')}\`)
// 输出：gap 序列：769 → 591 → 454 → 349 → 268 → 206 → 158 → 121 → 93
//      → 71 → 54 → 41 → 31 → 23 → 17 → 13 → 10 → 7 → 5 → 3 → 2 → 1
// 观察：先大步（几百）快速打散远距离逆序，后小步精修
// 为什么 1.3：实验统计，收缩因子在 1.25~1.33 之间时比较次数最少`

const combBasicCode = `// ===== 梳排序：gap 递减的冒泡（基础版）=====
function combSort(arr: number[]): number[] {
  const a = [...arr]
  let gap = a.length
  let swapped = false
  while (gap > 1 || swapped) {              // ⚠️ gap=1 后必须继续到无交换
    gap = Math.max(1, Math.floor(gap / 1.3)) // 收缩因子 1.3
    swapped = false
    for (let i = 0; i + gap < a.length; i++) {
      if (a[i] > a[i + gap]) {              // 比较相隔 gap 的元素
        const t = a[i]; a[i] = a[i + gap]; a[i + gap] = t
        swapped = true
      }
    }
  }
  return a
}
// 例：combSort([9, 4, 8, 1, 6, 3, 7, 2, 5]) → [1, 2, 3, 4, 5, 6, 7, 8, 9]
// gap 从 n 缩到 1：先大步消除远距离逆序，最后退化为冒泡精修
// 复杂度：平均接近 O(n log n)，最坏约 O(n²)，不稳定（远距离交换）`

const combFlagCode = `// ===== 梳排序：带提前终止（flag）=====
function combSortFlag(arr: number[]): number[] {
  const a = [...arr]
  let gap = a.length
  let swapped = true
  while (gap > 1 || swapped) {
    gap = Math.max(1, Math.floor(gap / 1.3))
    swapped = false
    for (let i = 0; i + gap < a.length; i++) {
      if (a[i] > a[i + gap]) {
        const t = a[i]; a[i] = a[i + gap]; a[i + gap] = t
        swapped = true
      }
    }
  }
  return a
}
// 循环条件 (gap > 1 || swapped) 就是天然的提前终止：
//   gap > 1 时：必须继续（大步消除逆序）
//   gap === 1 且本轮无交换：swapped 为 false → 循环结束
// 对近似有序数据：gap 快速缩到 1，一两轮 flag 就终止 —— 几乎线性`

</script>
