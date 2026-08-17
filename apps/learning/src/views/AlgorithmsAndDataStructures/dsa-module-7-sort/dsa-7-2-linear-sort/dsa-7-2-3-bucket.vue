<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🪣 桶排序：均匀分布假设与期望复杂度</h1>
          <p class="text-sm text-slate-500 mt-1">把数据丢进桶，桶内排序后再拼接 —— 期望 O(n)</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-2-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">📐</span>
          结构总览：桶排序
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          桶排序把数据<strong>按区间切分成 k 个桶</strong>（类似哈希分桶），先让每个元素落入自己的桶，
          再<strong>桶内各自排序</strong>，最后<strong>按桶序拼接</strong>。
          若数据<strong>均匀分布</strong>，每个桶只有 O(1) 个元素，桶内排序几乎免费，总时间退化为 O(n)。
        </p>

        <!-- 结构图：分桶 → 桶内排序 → 拼接 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="bk-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="18" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">桶排序三步：分桶 → 桶内排序 → 拼接（例 8 个 [0,1) 浮点数，4 个桶）</text>

            <!-- 原数组 -->
            <text x="16" y="42" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">原数组 arr（均匀分布在 [0,1)）</text>
            <rect x="110" y="48" width="52" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="136" y="63" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">0.42</text>
            <rect x="174" y="48" width="52" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="200" y="63" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">0.32</text>
            <rect x="238" y="48" width="52" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="264" y="63" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">0.77</text>
            <rect x="302" y="48" width="52" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="328" y="63" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">0.12</text>
            <rect x="366" y="48" width="52" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="392" y="63" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">0.91</text>
            <rect x="430" y="48" width="52" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="456" y="63" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">0.53</text>
            <rect x="494" y="48" width="52" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="520" y="63" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">0.28</text>
            <rect x="558" y="48" width="52" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="584" y="63" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">0.66</text>
            <text x="136" y="88" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">→1</text>
            <text x="200" y="88" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">→1</text>
            <text x="264" y="88" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">→3</text>
            <text x="328" y="88" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">→0</text>
            <text x="392" y="88" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">→3</text>
            <text x="456" y="88" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">→2</text>
            <text x="520" y="88" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">→1</text>
            <text x="584" y="88" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">→2</text>

            <line x1="360" y1="96" x2="360" y2="110" stroke="#94a3b8" stroke-width="2" marker-end="url(#bk-arr)" />
            <text x="368" y="107" font-size="10" font-family="monospace" fill="#64748b">分桶 idx = floor(v × 4)</text>

            <!-- 4 个桶 -->
            <text x="16" y="124" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">4 个桶（区间 [0,0.25) [0.25,0.5) [0.5,0.75) [0.75,1)，桶内乱序）</text>
            <rect x="56" y="132" width="140" height="76" rx="8" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" />
            <text x="126" y="152" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">0.12</text>
            <rect x="212" y="132" width="140" height="76" rx="8" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" />
            <text x="282" y="152" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">0.42</text>
            <text x="282" y="170" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">0.32</text>
            <text x="282" y="188" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">0.28</text>
            <rect x="368" y="132" width="140" height="76" rx="8" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" />
            <text x="438" y="152" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">0.53</text>
            <text x="438" y="170" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">0.66</text>
            <rect x="524" y="132" width="140" height="76" rx="8" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" />
            <text x="594" y="152" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">0.77</text>
            <text x="594" y="170" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">0.91</text>
            <text x="126" y="220" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">桶 0</text>
            <text x="282" y="220" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">桶 1</text>
            <text x="438" y="220" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">桶 2</text>
            <text x="594" y="220" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">桶 3</text>

            <line x1="360" y1="228" x2="360" y2="242" stroke="#94a3b8" stroke-width="2" marker-end="url(#bk-arr)" />
            <text x="368" y="239" font-size="10" font-family="monospace" fill="#64748b">桶内排序 + 按桶序拼接</text>

            <!-- 收集结果 -->
            <text x="16" y="256" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">结果（每桶排好序后依次拼接）</text>
            <rect x="110" y="262" width="52" height="30" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="136" y="277" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">0.12</text>
            <rect x="174" y="262" width="52" height="30" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="200" y="277" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">0.28</text>
            <rect x="238" y="262" width="52" height="30" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="264" y="277" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">0.32</text>
            <rect x="302" y="262" width="52" height="30" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="328" y="277" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">0.42</text>
            <rect x="366" y="262" width="52" height="30" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="392" y="277" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">0.53</text>
            <rect x="430" y="262" width="52" height="30" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="456" y="277" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">0.66</text>
            <rect x="494" y="262" width="52" height="30" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="520" y="277" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">0.77</text>
            <rect x="558" y="262" width="52" height="30" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="584" y="277" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">0.91</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：桶排序全流程 —— 分桶（桶号 = floor(v × 桶数)）→ 桶内各自排序 → 按桶序拼接</figcaption>
        </figure>

        <!-- 操作示意图：均匀 vs 倾斜 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">核心假设：均匀分布 vs 倾斜分布</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="14" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">均匀分布（假设成立）→ 期望 O(n)</text>
              <rect x="30" y="75" width="40" height="35" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="4" />
              <text x="50" y="87" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="90" y="75" width="40" height="35" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="4" />
              <text x="110" y="87" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="150" y="75" width="40" height="35" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="4" />
              <text x="170" y="87" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="210" y="75" width="40" height="35" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="4" />
              <text x="230" y="87" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <text x="50" y="124" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">桶0</text>
              <text x="110" y="124" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">桶1</text>
              <text x="170" y="124" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">桶2</text>
              <text x="230" y="124" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">桶3</text>
              <text x="14" y="146" font-size="11" font-family="monospace" fill="#16a34a">每桶 ≈ n/k 个 → 桶内排序总代价 O(n) ✅</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">均匀时每个桶只有常数个元素，桶内排序「摊」到 O(n)</figcaption>
          </figure>
          <figure>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="14" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">倾斜分布（假设被打破）→ 最坏 O(n²)</text>
              <rect x="30" y="25" width="40" height="85" fill="#ef4444" stroke="#dc2626" stroke-width="1.5" rx="4" />
              <text x="50" y="42" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="90" y="95" width="40" height="15" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5" rx="4" />
              <text x="110" y="103" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#334155">1</text>
              <rect x="150" y="85" width="40" height="25" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5" rx="4" />
              <text x="170" y="98" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#334155">1</text>
              <rect x="210" y="85" width="40" height="25" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5" rx="4" />
              <text x="230" y="98" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#334155">1</text>
              <text x="50" y="124" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#dc2626" font-weight="bold">桶0</text>
              <text x="110" y="124" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">桶1</text>
              <text x="170" y="124" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">桶2</text>
              <text x="230" y="124" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">桶3</text>
              <text x="14" y="146" font-size="11" font-family="monospace" fill="#dc2626">n 个挤进一桶 → 桶内 O(n²)（插入排序）❌</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">数据不均匀时全部落进同一桶，桶排序退化为桶内排序的复杂度</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 思想 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">1</span>
          思想：分而治之的「分桶 + 桶内排序」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          桶排序的思路非常朴素：<strong>把一个大排序问题，拆成 k 个小排序问题</strong>。
          先用一个<strong>分桶函数</strong>把每个元素映射到它所属的区间桶（保证桶 0 &lt; 桶 1 &lt; … &lt; 桶 k-1），
          每个桶内部再独立排序，最后按桶序拼接——因为桶之间天然有序，拼起来就是整体有序。
        </p>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>执行流程拆解（1→2→3→4）：</strong></p>
          <ol class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span><strong>定桶数与区间：</strong>根据值域和分布选 k 个桶，划分连续区间（如 [0,1) 分成 4 段）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span><strong>分桶：</strong>遍历元素，<code>idx = floor((v - min) / range × k)</code>，放入对应桶（O(n)）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">3.</span><span><strong>桶内排序：</strong>对每个桶分别排序（桶小用插入排序，桶大用快排）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">4.</span><span><strong>拼接：</strong>按桶 0→k-1 依次收集，得到整体有序数组</span></li>
          </ol>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          桶排序 ≈ <strong>「把试卷按分数段丢进不同盒子」</strong>：0-59 一盒、60-79 一盒、80-100 一盒，
          每盒内部再理一遍顺序，最后按盒子顺序倒出来就是全班排名。<br/>
          也像 <strong>hash 分桶 + 桶内排序</strong>：前端做「大数据分页展示」时常把数据先按分类 hash 到不同 Map，
          每个分片内部排序后再 merge——和桶排序的 Map-Reduce 风格一模一样。</p>
        </aside>
      </section>

      <!-- 2. 桶的划分与均匀假设 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">2</span>
          桶的划分与均匀分布假设
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          桶排序的「期望 O(n)」成立的前提是<strong>均匀分布假设</strong>：数据大致均匀地撒满值域，
          这样每个桶只分到 O(n/k) 个元素。分桶函数必须满足：<strong>① 单调</strong>（桶 0 的元素都 ≤ 桶 1 的元素）；
          <strong>② 快速</strong>（O(1) 计算桶号）；<strong>③ 尽可能均匀</strong>。
        </p>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>常见分桶函数：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>[0,1) 浮点数：</strong><code>idx = floor(v × k)</code>——乘以桶数取整</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>任意区间 [min,max]：</strong><code>idx = floor((v - min) / range × k)</code>，先归一化再分桶</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>整数：</strong>按数值区间切桶，或按位数/哈希值取模（后者不均匀但简单）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>字符串：</strong>按首字母分桶（A-M / N-Z）——本质上就是 MSD 基数排序的退化</span></li>
          </ul>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>盲目假设均匀</strong>——真实数据常是倾斜的（幂律分布），直接套桶排序可能全挤进一个桶，复杂度退回 O(n²)。<br/>
          ② <strong>分桶函数越界：</strong>边界值（如 v = max）会算出 <code class="bg-amber-100 px-1 rounded text-xs font-mono">idx = k</code>，必须 clamp 到 <code class="bg-amber-100 px-1 rounded text-xs font-mono">k-1</code> 或单独处理最大值。<br/>
          ③ <strong>桶间不单调：</strong>分桶函数如果按「取模」之类非单调方式划分，桶与桶之间没有大小关系，拼接结果必然是错的。</p>
        </aside>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><br/>
          桶排序与计数排序、基数排序的关系——<br/>
          <strong>计数排序</strong>：每个值一个桶，桶内不排序（值唯一）；<br/>
          <strong>桶排序</strong>：一段区间一个桶，桶内再排序；<br/>
          <strong>基数排序</strong>：每轮按「位」分桶（k 个桶），重复 d 轮。<br/>
          三兄弟都是「分桶派」，区别只在「桶怎么分、要不要桶内排序、排几轮」。</p>
        </aside>
      </section>

      <!-- 3. 实现 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">3</span>
          实现：浮点桶排序与整数桶排序
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          桶内排序选什么？<strong>桶越小越该用插入排序</strong>（常数小、几乎有序时接近 O(n)）；
          <strong>桶大了再用快排/归并</strong>。下面是经典的「[0,1) 均匀浮点」版和「任意整数区间」版。
        </p>

        <div class="mb-4"><Code language="ts" :code="floatBucketCode" title="bucket_sort_float.ts" /></div>

        <div class="mb-4"><Code language="ts" :code="intBucketCode" title="bucket_sort_int.ts" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>桶内排序选错算法：</strong>每个桶就 1~2 个元素还用快排，常数因子比插入排序大得多，白白损失性能。<br/>
          ② <strong>直接修改原数组 vs 返回新数组混用：</strong>桶排序通常返回新数组，调用方若期望原地排序会踩坑。<br/>
          ③ <strong>float 精度问题：</strong>0.1 + 0.2 ≠ 0.3 这类误差可能把元素分到错误的桶，必要时先归一化到整数。</p>
        </aside>
      </section>

      <!-- 4. 复杂度与优缺点 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">4</span>
          复杂度：期望 O(n)、最坏 O(n²)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          桶排序的时间 = 分桶 O(n) + 各桶排序之和 + 拼接 O(n)。均匀分布时每桶有 O(n/k) 个元素，
          桶内排序总代价 ≈ k × O((n/k) log(n/k))，取 k ≈ n 时 ≈ O(n)——这就是<strong>期望 O(n)</strong> 的来源。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">指标</th><th class="px-4 py-2 border border-slate-200 font-semibold">结论</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">平均（期望）</td><td class="px-4 py-2 border font-mono">O(n)</td><td class="px-4 py-2 border">均匀分布 + k ≈ n，每桶 O(1) 个元素</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">最坏</td><td class="px-4 py-2 border font-mono text-red-500">O(n²)</td><td class="px-4 py-2 border">全部元素挤进同一桶 + 桶内插入排序</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">最好</td><td class="px-4 py-2 border font-mono">O(n)</td><td class="px-4 py-2 border">已均匀分布时与平均一致</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">空间</td><td class="px-4 py-2 border font-mono">O(n + k)</td><td class="px-4 py-2 border">k 个桶容器 + 元素本身</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">稳定性</td><td class="px-4 py-2 border font-mono text-emerald-600">稳定 ✅</td><td class="px-4 py-2 border">桶内用稳定排序且按序拼接时稳定</td></tr>
            </tbody>
          </table>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p class="text-sm font-semibold text-emerald-800 mb-2">✅ 优点</p>
            <ul class="space-y-1.5 text-emerald-700 text-sm">
              <li>▸ 期望线性时间 O(n)，适合大数据量</li>
              <li>▸ 桶之间天然可并行（每个桶独立排序）</li>
              <li>▸ 实现直观，适合浮点数（比较排序对浮点不友好）</li>
              <li>▸ 稳定（桶内稳定 + 顺序拼接）</li>
            </ul>
          </div>
          <div class="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <p class="text-sm font-semibold text-rose-800 mb-2">❌ 缺点</p>
            <ul class="space-y-1.5 text-rose-700 text-sm">
              <li>▸ 依赖均匀分布假设，数据倾斜时性能崩塌</li>
              <li>▸ O(n + k) 额外空间，非原地</li>
              <li>▸ 需要事先知道值域/分布来设计分桶函数</li>
              <li>▸ 小数据上常数因子大，不如插入排序</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 5. 适用场景 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">5</span>
          适用场景：浮点数、均匀分布数据与桶数选择
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          桶排序最能发挥威力的场景是<strong>数据量大、值域连续、近似均匀分布</strong>——
          尤其是<strong>浮点数</strong>（比较排序处理浮点很别扭，桶排序直接按区间落桶）。桶数怎么选？看下面的代码。
        </p>

        <div class="mb-4"><Code language="ts" :code="bucketCountCode" title="bucket_count_selection.ts" /></div>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>典型适用场景：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>浮点数排序</strong>：传感器数据、评分（0~5 连续值）、价格区间</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>均匀分布大数据</strong>：随机数、均匀采样的样本排序</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>外部排序的中间层</strong>：磁盘数据先分桶入内存，桶内排完再归并写回</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>并行计算</strong>：每个桶一个 worker 独立排序，最后收集（Map-Reduce 风格）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>近似有序的浮点数据</strong>：桶内几乎不需要移动元素</span></li>
          </ul>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong><br/>
          选型口诀——「<strong>均匀、量大、连续值</strong>」用桶排序：<br/>
          1) 先花 O(n) 扫一遍确认分布（min/max/直方图），别盲目假设均匀；<br/>
          2) 桶数取 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">k ≈ n / 2 ~ n</code>，每桶平均 1~2 个元素最优；<br/>
          3) 桶内排序：桶 ≤ 16 个元素用插入排序，否则用快排；<br/>
          4) 边界值 clamp，分桶函数保持单调，桶内用稳定排序保稳定性。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">🎬</span>
          动画演示：分桶 → 桶内排序 → 拼接
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点击「桶排序」观察三步：<strong>① 分桶</strong>（每个元素按 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">floor(v × 4)</code> 落入 4 个桶之一）→
          <strong>② 桶内排序</strong>（各桶用插入排序）→ <strong>③ 拼接</strong>（按桶序收集到结果行，绿色填充）。
          上方是原数组，中间是 4 个桶，下方是拼接结果。
        </p>

        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ arr.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🪣 桶数: 4</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔢 步骤: {{ steps }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>

        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @click="doBucketSort" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">
            🪣 桶排序
          </button>
          <button @click="resetViz" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100">
            ↺ 重置
          </button>
        </div>

        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 原数组 -->
              <v-text :config="{x:8, y:8, text:'原数组 arr（[0,1) 均匀浮点数）', fontSize:11, fill:C.muted, fontStyle:'bold'}" />
              <template v-for="(v, i) in arr" :key="'a' + i">
                <v-rect :config="arrBar(i, v)" />
                <v-text :config="arrTxt(i, v)" />
              </template>
              <!-- 桶 -->
              <v-text :config="{x:8, y:100, text:'桶 0..3（区间 [0,0.25) [0.25,0.5) [0.5,0.75) [0.75,1)）', fontSize:11, fill:C.muted, fontStyle:'bold'}" />
              <template v-for="(items, b) in buckets" :key="'b' + b">
                <template v-for="(v, k) in items" :key="'bi' + b + '-' + k">
                  <v-rect :config="bucketItemCfg(b, k, v)" />
                  <v-text :config="bucketItemTxt(b, k, v)" />
                </template>
                <v-text :config="bucketIdx(b)" />
              </template>
              <!-- 拼接结果 -->
              <v-text :config="{x:8, y:262, text:'拼接结果（按桶序收集）', fontSize:11, fill:C.muted, fontStyle:'bold'}" />
              <template v-for="(v, i) in result" :key="'r' + i">
                <v-rect :config="resBar(i, v)" />
                <v-text :config="resTxt(i, v)" />
              </template>
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>桶排序三步：</strong>分桶（O(n)）→ 桶内排序 → 按桶序拼接，桶之间天然有序</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>期望 O(n) 依赖均匀分布假设</strong>：每桶只分到 O(1) 个元素；数据倾斜时最坏 O(n²)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>分桶函数三要求：</strong>单调、O(1)、尽可能均匀；边界值要 clamp 防越界</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>桶内排序选择：</strong>小桶用插入排序（常数小），大桶用快排</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度：</strong>平均 O(n)、最坏 O(n²)、空间 O(n+k)、稳定（桶内稳定时）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>适用：</strong>浮点数、均匀分布大数据、并行/外部排序；与计数排序、基数排序同属「分桶派」</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-2-linear-sort/dsa-7-2-2-radix" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：基数排序：LSD/MSD与字符串排序</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-3-select/dsa-7-3-1-quick-select" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：快速选择：O(n)期望第K小 →</RouterLink>
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
  { id: "sec-1", name: "思想：分桶 + 桶内排序" },
  { id: "sec-2", name: "桶的划分与均匀假设" },
  { id: "sec-3", name: "实现" },
  { id: "sec-4", name: "复杂度与优缺点" },
  { id: "sec-5", name: "适用场景" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "📋 小结" },
]

// ===== 🎬 桶排序动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(360), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const BUCKET_COUNT = 4

const arr = reactive<number[]>([])       // ⚠️ splice(0) 清空，不用 length=0
const arrCol = reactive<string[]>([])
const buckets = reactive<number[][]>([]) // 4 个桶
const bucketCol = reactive<string[]>([])
const result = reactive<number[]>([])    // 拼接结果
const resultCol = reactive<string[]>([])
const steps = ref(0)

function cellW(n:number){ return Math.min(56, Math.max(22, Math.floor((W.value - 20) / n - 8))) }
function rowX(i:number, n:number){ const bw = cellW(n); const t = n * (bw + 8) - 8; return Math.max(10, (W.value - t) / 2) + i * (bw + 8) }
function bucketX(b:number){ const bw = Math.min(140, Math.max(60, Math.floor((W.value - 60) / BUCKET_COUNT - 16))); return 30 + b * (bw + 16) }
function bucketW(){ return Math.min(140, Math.max(60, Math.floor((W.value - 60) / BUCKET_COUNT - 16))) }

function initArr(vals:number[] = [0.42, 0.32, 0.77, 0.12, 0.91, 0.53, 0.28, 0.66]) {
  arr.splice(0); arrCol.splice(0)
  buckets.splice(0); bucketCol.splice(0)
  result.splice(0); resultCol.splice(0)
  arr.push(...vals)
  for (let i = 0; i < vals.length; i++) arrCol.push(C.cyan)
  for (let b = 0; b < BUCKET_COUNT; b++) { buckets.push([]); bucketCol.push(C.cyan) }
  steps.value = 0
}

function arrBar(i:number, v:number) {
  const n = arr.length, bw = cellW(n)
  return { x: rowX(i, n), y: 24, width: bw, height: 36, fill: arrCol[i] || C.cyan,
    cornerRadius: [4, 4, 0, 0], stroke: '#0891b2', strokeWidth: 1 }
}
function arrTxt(i:number, v:number) {
  const n = arr.length, bw = cellW(n)
  return { x: rowX(i, n), y: 24, width: bw, height: 36, text: String(v),
    fontSize: Math.min(11, bw * 0.26), fontFamily: 'monospace', fontStyle: 'bold',
    fill: '#fff', align: 'center', verticalAlign: 'middle' }
}
function bucketItemCfg(b:number, k:number, v:number) {
  const bw = bucketW()
  const y = 222 - (k + 1) * 24
  return { x: bucketX(b), y, width: bw, height: 22, fill: bucketCol[b] || C.cyan,
    cornerRadius: 4, stroke: '#0891b2', strokeWidth: 1 }
}
function bucketItemTxt(b:number, k:number, v:number) {
  const bw = bucketW()
  const y = 222 - (k + 1) * 24
  return { x: bucketX(b), y, width: bw, height: 22, text: String(v),
    fontSize: Math.min(10, bw * 0.22), fontFamily: 'monospace', fontStyle: 'bold',
    fill: '#fff', align: 'center', verticalAlign: 'middle' }
}
function bucketIdx(b:number) {
  const bw = bucketW()
  return { x: bucketX(b), y: 238, width: bw, height: 10, text: '桶' + b,
    fontSize: 9, fontFamily: 'monospace', fontStyle: 'bold', fill: C.muted, align: 'center' }
}
function resBar(i:number, v:number) {
  const n = arr.length, bw = cellW(n)
  return { x: rowX(i, n), y: 278, width: bw, height: 36, fill: resultCol[i] || C.ghost,
    cornerRadius: [4, 4, 0, 0], stroke: resultCol[i] === C.green ? '#22c55e' : 'transparent', strokeWidth: 1 }
}
function resTxt(i:number, v:number) {
  const n = arr.length, bw = cellW(n)
  return { x: rowX(i, n), y: 278, width: bw, height: 36, text: String(v),
    fontSize: Math.min(11, bw * 0.26), fontFamily: 'monospace', fontStyle: 'bold',
    fill: resultCol[i] === C.green ? '#0f172a' : C.ghost, align: 'center', verticalAlign: 'middle' }
}

async function act(msg:string, label:string, fn:() => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

async function doBucketSort() {
  await act('桶排序  期望 O(n)', '分桶 → 桶内排序 → 拼接', async () => {
    // ① 分桶
    for (let b = 0; b < BUCKET_COUNT; b++) { buckets[b].splice(0); bucketCol[b] = C.cyan }
    for (let i = 0; i < arr.length; i++) {
      const v = arr[i]
      const idx = Math.min(BUCKET_COUNT - 1, Math.floor(v * BUCKET_COUNT))
      status.value = `① 分桶: ${v} → 桶 ${idx}（floor(${v} × 4)）`
      arrCol[i] = C.orange
      await d(280)
      buckets[idx].push(v)
      bucketCol[idx] = C.orange
      steps.value++
      await d(280)
      arrCol[i] = C.cyan; bucketCol[idx] = C.cyan
    }
    // ② 桶内排序（插入排序）
    status.value = '② 桶内排序：每个桶用插入排序'
    await d(500)
    for (let b = 0; b < BUCKET_COUNT; b++) {
      const items = buckets[b]
      if (items.length <= 1) { if (items.length === 1) { steps.value++; status.value = `桶 ${b} 只有 1 个元素，无需排序`; await d(250) } continue }
      bucketCol[b] = C.orange
      for (let i = 1; i < items.length; i++) {
        const key = items[i]
        let j = i - 1
        while (j >= 0 && items[j] > key) {
          status.value = `② 桶 ${b} 内排序: 移动 ${items[j]} 到后一位`
          items[j + 1] = items[j]
          j--
          steps.value++
          await d(220)
        }
        items[j + 1] = key
        steps.value++
        status.value = `② 桶 ${b} 内排序: 插入 ${key}`
        await d(220)
      }
      bucketCol[b] = C.green
      status.value = `桶 ${b} 排序完成: [${items.join(', ')}]`
      await d(400)
    }
    // ③ 拼接
    status.value = '③ 拼接：按桶序收集'
    await d(500)
    result.splice(0); resultCol.splice(0)
    for (let b = 0; b < BUCKET_COUNT; b++) {
      for (const v of buckets[b]) {
        status.value = `③ 拼接: 桶 ${b} → ${v}`
        result.push(v)
        resultCol.push(C.green)
        steps.value++
        await d(160)
      }
    }
    status.value = '✅ 排序完成: ' + result.join(' ')
    await d(900)
  })
}
function resetViz() { if (busy.value) return; initArr() }

let ro: ResizeObserver | null = null
onMounted(() => {
  initArr()
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例常量 =====
const floatBucketCode = `// ─── 浮点桶排序：[0,1) 均匀分布 ───
// 思想: n 个数均匀落在 [0,1)，分 n 个桶，每个桶期望只有 O(1) 个数
// 分桶: index = floor(v * n)

function bucketSortFloat(arr: number[]): number[] {
    const n = arr.length
    const buckets: number[][] = Array.from({ length: n }, () => [])

    // ① 分桶：v ∈ [0,1) → 桶 floor(v * n)
    for (const v of arr) {
        const idx = Math.floor(v * n)
        buckets[idx].push(v)
    }

    // ② 桶内排序（每个桶期望只有常数个元素 → 插入排序足够）
    for (const b of buckets) {
        insertionSort(b)
    }

    // ③ 依次拼接
    return buckets.flat()
}

function insertionSort(a: number[]): void {
    for (let i = 1; i < a.length; i++) {
        const key = a[i]
        let j = i - 1
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j]
            j--
        }
        a[j + 1] = key
    }
}

// 示例: [0.42, 0.32, 0.77, 0.12, 0.91, 0.53, 0.28, 0.66]，n = 8
// 分桶 floor(v × 8):
//   0.42→3   0.32→2   0.77→6   0.12→0
//   0.91→7   0.53→4   0.28→2   0.66→5
// 桶 2: [0.32, 0.28] → 桶内排序 [0.28, 0.32]
// 拼接: [0.12, 0.28, 0.32, 0.42, 0.53, 0.66, 0.77, 0.91] ✅`

const intBucketCode = `// ─── 整数桶排序：按区间分桶，桶内用快排 ───
// 值域 [min, max] 分成 bucketCount 个区间，元素落入对应区间桶

function bucketSortInt(arr: number[], bucketCount = 4): number[] {
    if (arr.length <= 1) return arr
    const min = Math.min(...arr), max = Math.max(...arr)
    const range = max - min + 1
    const buckets: number[][] = Array.from({ length: bucketCount }, () => [])

    for (const v of arr) {
        // 把 v 映射到桶号 [0, bucketCount-1]，clamp 防止越界
        const idx = Math.min(bucketCount - 1,
            Math.floor(((v - min) / range) * bucketCount))
        buckets[idx].push(v)
    }

    // 桶内元素可能较多 → 用内置快排（V8 的 TimSort 也很稳）
    for (const b of buckets) b.sort((x, y) => x - y)
    return buckets.flat()
}

// 示例: [34, 8, 64, 51, 32, 21, 90, 12, 77, 43]，bucketCount = 4
// min = 8, max = 90, range = 83
// 桶 0: [8, 21, 12]   桶 1: [34, 32, 43]
// 桶 2: [64, 51]      桶 3: [90, 77]
// 桶内排序 + 拼接: [8, 12, 21, 32, 34, 43, 51, 64, 77, 90] ✅`

const bucketCountCode = `// ─── 桶数选择：n 与均匀分布的权衡 ───
// 桶太少 → 每桶元素多，桶内排序代价高
// 桶太多 → 大量空桶浪费空间，但总代价仍是 O(n)
// 经验法则: 均匀数据取 bucketCount ≈ n（每桶平均 1~2 个）

function chooseBucketCount(n: number, dataKind: 'uniform' | 'skewed'): number {
    if (dataKind === 'uniform') {
        return Math.max(1, Math.ceil(n / 2))    // 每桶平均 2 个
    }
    return Math.max(1, Math.ceil(Math.sqrt(n))) // 倾斜数据：桶少些，摊平最坏桶
}

// 极端情况:
// bucketCount = 1        → 退化成「桶内全量排序」O(n log n)
// bucketCount = n 但数据全挤一桶 → 该桶 O(n²)（插入排序），其余空桶
// 数据均匀 + bucketCount ≈ n → 每桶 O(1) → 总期望 O(n)

// 实战: 前端给 10 万条「0~100 的整数」排序——
// 计数排序 k = 101 最合适；桶排序更适合连续浮点区间（如价格、评分）
// 排序 10 万条浮点评分（0~5，均匀）→ 桶排序期望 O(n) 秒杀快排`
</script>
