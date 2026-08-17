<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔟 基数排序：LSD / MSD 与字符串排序</h1>
          <p class="text-sm text-slate-500 mt-1">按「位」从低位到高位逐轮稳定排序 —— O(d·(n+k))</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-2-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">📐</span>
          结构总览：基数排序
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          基数排序把一个大问题拆成 <strong>d 轮小问题</strong>：每一轮只看数字的<strong>某一位</strong>，
          用<strong>稳定排序</strong>（通常是计数排序）按该位的值分桶再收集。
          LSD（Least Significant Digit）从<strong>个位</strong>开始逐位往高位做，d 轮后整体有序。
        </p>

        <!-- 结构图：按个位分桶 → 收集 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="rd-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="18" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">LSD 第 1 轮：按个位分桶 → 按桶序收集（例 [170,45,75,90,802,24,2,66]）</text>

            <!-- 原数组 -->
            <text x="16" y="42" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">原数组（下方标注个位）</text>
            <rect x="110" y="48" width="52" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="136" y="63" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">170</text>
            <rect x="174" y="48" width="52" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="200" y="63" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">45</text>
            <rect x="238" y="48" width="52" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="264" y="63" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">75</text>
            <rect x="302" y="48" width="52" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="328" y="63" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">90</text>
            <rect x="366" y="48" width="52" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="392" y="63" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">802</text>
            <rect x="430" y="48" width="52" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="456" y="63" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">24</text>
            <rect x="494" y="48" width="52" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="520" y="63" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="558" y="48" width="52" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="584" y="63" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">66</text>
            <text x="136" y="86" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">0</text>
            <text x="200" y="86" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">5</text>
            <text x="264" y="86" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">5</text>
            <text x="328" y="86" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">0</text>
            <text x="392" y="86" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">2</text>
            <text x="456" y="86" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">4</text>
            <text x="520" y="86" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">2</text>
            <text x="584" y="86" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">6</text>

            <line x1="360" y1="94" x2="360" y2="108" stroke="#94a3b8" stroke-width="2" marker-end="url(#rd-arr)" />
            <text x="368" y="105" font-size="10" font-family="monospace" fill="#64748b">分桶 digit = v % 10</text>

            <!-- 10 个桶 -->
            <text x="16" y="122" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">桶 0..9（元素按个位落入，桶内保持原顺序）</text>
            <rect x="84" y="130" width="48" height="64" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" />
            <text x="108" y="150" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">170</text>
            <text x="108" y="170" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">90</text>
            <rect x="140" y="130" width="48" height="64" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <rect x="196" y="130" width="48" height="64" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" />
            <text x="220" y="150" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">802</text>
            <text x="220" y="170" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="252" y="130" width="48" height="64" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <rect x="308" y="130" width="48" height="64" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" />
            <text x="332" y="150" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">24</text>
            <rect x="364" y="130" width="48" height="64" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" />
            <text x="388" y="150" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">45</text>
            <text x="388" y="170" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">75</text>
            <rect x="420" y="130" width="48" height="64" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" />
            <text x="444" y="150" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">66</text>
            <rect x="476" y="130" width="48" height="64" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <rect x="532" y="130" width="48" height="64" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <rect x="588" y="130" width="48" height="64" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="108" y="206" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">0</text>
            <text x="164" y="206" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">1</text>
            <text x="220" y="206" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">2</text>
            <text x="276" y="206" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">3</text>
            <text x="332" y="206" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">4</text>
            <text x="388" y="206" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">5</text>
            <text x="444" y="206" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">6</text>
            <text x="500" y="206" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">7</text>
            <text x="556" y="206" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">8</text>
            <text x="612" y="206" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">9</text>

          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：LSD 第 1 轮 —— 按个位分桶（桶内保持原顺序）；随后按 0→9 收集得到「个位有序」的新序列（见下方示意图）</figcaption>
        </figure>

        <!-- 操作示意图：三轮迭代 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：逐轮稳定排序，低位次序被高位继承</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="14" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">第 1 轮后：个位有序</text>
              <rect x="14" y="24" width="36" height="28" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="32" y="38" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">170</text>
              <rect x="54" y="24" width="36" height="28" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="72" y="38" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">90</text>
              <rect x="94" y="24" width="36" height="28" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="112" y="38" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">802</text>
              <rect x="134" y="24" width="36" height="28" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="152" y="38" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="174" y="24" width="36" height="28" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="192" y="38" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">24</text>
              <rect x="214" y="24" width="36" height="28" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="232" y="38" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">45</text>
              <rect x="254" y="24" width="36" height="28" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="272" y="38" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">75</text>
              <rect x="294" y="24" width="36" height="28" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="312" y="38" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">66</text>
              <text x="32" y="62" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#d97706" font-weight="bold">0</text>
              <text x="72" y="62" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#d97706" font-weight="bold">0</text>
              <text x="112" y="62" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#d97706" font-weight="bold">2</text>
              <text x="152" y="62" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#d97706" font-weight="bold">2</text>
              <text x="192" y="62" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#d97706" font-weight="bold">4</text>
              <text x="232" y="62" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#d97706" font-weight="bold">5</text>
              <text x="272" y="62" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#d97706" font-weight="bold">5</text>
              <text x="312" y="62" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#d97706" font-weight="bold">6</text>
              <text x="14" y="88" font-size="11" font-family="monospace" fill="#64748b">第 2 轮按十位（个位次序被保留）：</text>
              <text x="14" y="106" font-size="11" font-family="monospace" fill="#0891b2">[802, 2, 24, 45, 66, 170, 75, 90]</text>
              <text x="14" y="130" font-size="11" font-family="monospace" fill="#64748b">稳定性让「相同十位」内部仍按个位有序</text>
              <text x="14" y="150" font-size="11" font-family="monospace" fill="#64748b">（如 170 在 75 前：十位都是 7，个位 0 &lt; 5）</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">逐轮迭代：低位已经排好的顺序，在高位排序时被完整继承</figcaption>
          </figure>
          <figure>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="14" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">第 3 轮（百位）后：完全有序 ✅</text>
              <rect x="14" y="24" width="36" height="28" rx="5" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="32" y="38" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
              <rect x="54" y="24" width="36" height="28" rx="5" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="72" y="38" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">24</text>
              <rect x="94" y="24" width="36" height="28" rx="5" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="112" y="38" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">45</text>
              <rect x="134" y="24" width="36" height="28" rx="5" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="152" y="38" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">66</text>
              <rect x="174" y="24" width="36" height="28" rx="5" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="192" y="38" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">75</text>
              <rect x="214" y="24" width="36" height="28" rx="5" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="232" y="38" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">90</text>
              <rect x="254" y="24" width="36" height="28" rx="5" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="272" y="38" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">170</text>
              <rect x="294" y="24" width="36" height="28" rx="5" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="312" y="38" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">802</text>
              <text x="14" y="74" font-size="11" font-family="monospace" fill="#64748b">三轮 LSD 过程：</text>
              <text x="14" y="94" font-size="11" font-family="monospace" fill="#0891b2">第 1 轮（个位）: [170, 90, 802, 2, 24, 45, 75, 66]</text>
              <text x="14" y="114" font-size="11" font-family="monospace" fill="#0891b2">第 2 轮（十位）: [802, 2, 24, 45, 66, 170, 75, 90]</text>
              <text x="14" y="134" font-size="11" font-family="monospace" fill="#16a34a">第 3 轮（百位）: [2, 24, 45, 66, 75, 90, 170, 802]</text>
              <text x="14" y="154" font-size="11" font-family="monospace" fill="#64748b">d = 最大位数（802 有 3 位）→ 3 轮结束</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">d 轮之后，最高位也有序 → 整体完全有序；轮数与最大位数成正比</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 思想 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">1</span>
          思想：把「比较大小」拆成「逐位稳定排序」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          基数排序的关键洞察：<strong>一个多位数的大小，由最高位决定，但最高位相同的数要再看次高位……</strong>
          与其直接比较，不如<strong>从低位到高位（LSD）逐轮做稳定排序</strong>：
          每轮只处理一个位（个位、十位、百位…），用计数排序按位的值 0~9 分桶再收集。
          因为每轮都<strong>稳定</strong>，上一轮排好的低位顺序会被完整继承，d 轮后整体有序。
        </p>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>执行流程拆解（1→2→3→4）：</strong></p>
          <ol class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span><strong>确定轮数 d：</strong>找到最大值，d = 最大值的位数（如 802 → 3 位）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span><strong>逐轮取位：</strong>exp 从 1 开始，每轮 <code>digit = floor(v / exp) % 10</code>，exp *= 10</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">3.</span><span><strong>按位分桶：</strong>用计数排序（10 个桶）把元素按 digit 稳定排列</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">4.</span><span><strong>收集回填：</strong>按桶 0→9 收集作为下一轮输入；d 轮后结束</span></li>
          </ol>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          基数排序 ≈ <strong>「按年月日三级排序」</strong>：先按日稳定排，再按月，最后按年——
          月份相同的记录内部仍然按日有序，年份相同的记录内部按「月日」有序。<br/>
          也像 <strong>表格多列排序的稳定归并</strong>：antd Table 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">sorter</code> 支持多列，
          实现上就是「先按次要列稳定排，再按主要列稳定排」——和 LSD 逐位处理完全同构。</p>
        </aside>
      </section>

      <!-- 2. LSD 实现 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">2</span>
          LSD 实现：每轮一个计数排序
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          LSD（Least Significant Digit，最低有效位）从<strong>个位</strong>开始。
          每一轮就是一次<strong>k = 10 的计数排序</strong>：按 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">digit = floor(v / exp) % 10</code> 分桶，
          前缀和 + 反向回填保证本轮稳定。把上一节学的计数排序当「引擎」，复用 d 次即可。
        </p>

        <div class="mb-4"><Code language="ts" :code="lsdCode" title="radix_sort_lsd.ts" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>每轮必须稳定排序</strong>——若用不稳定排序（如简单选择排序）按位排，上一轮的低位顺序被破坏，整体结果错误。<br/>
          ② <strong>位数 d 算错：</strong>对负数直接 <code class="bg-amber-100 px-1 rounded text-xs font-mono">String(max).length</code> 会把负号算进位数；超大数要小心 <code class="bg-amber-100 px-1 rounded text-xs font-mono">exp</code> 溢出。<br/>
          ③ <strong>取位公式写错：</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">v % exp</code> 而不是 <code class="bg-amber-100 px-1 rounded text-xs font-mono">floor(v / exp) % 10</code>，或漏了 <code class="bg-amber-100 px-1 rounded text-xs font-mono">% 10</code> 取到整段高位。</p>
        </aside>
      </section>

      <!-- 3. MSD 与字符串排序 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">3</span>
          MSD 与字符串排序
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          LSD 从低位往高位，<strong>MSD（Most Significant Digit）从最高位开始</strong>。
          MSD 更贴近人的阅读习惯，特别适合<strong>字符串字典序</strong>：先按首字母分桶，再递归地对每个桶按第二个字符分桶……
          而 <strong>LSD 处理等长字符串</strong>更简单——从最后一个字符往前逐位稳定排序，d 轮后就是字典序。
        </p>

        <div class="mb-4"><Code language="ts" :code="stringCode" title="radix_sort_string_lsd.ts" /></div>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>LSD vs MSD：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>LSD</strong>：从低位到高位，迭代 d 轮，实现简单、稳定、适合等长 key（整数、定长字符串）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>MSD</strong>：从高位到低位，递归分桶，天然处理<strong>变长字符串</strong>（先按首字母分桶，桶内再排）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>变长字符串用 LSD：</strong>先 padStart 补齐到等长（如不足补最小字符），否则短的串要特殊处理</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>字典序本质</strong>：第一个不同字符决定大小 → MSD 一轮就能把大部分元素分到不同桶</span></li>
          </ul>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>字符串不等长直接用 LSD</strong>——"ab" 和 "abc" 第 2 位一个是 'b' 一个是 'c'，直接比较会得到错误结果，需要先补位。<br/>
          ② <strong>桶数量算错：</strong>数字只有 10 个桶，字母是 26 个，<strong>字母+数字混合要 36 个</strong>；下标映射公式（ASCII 偏移）写错会越界或错桶。<br/>
          ③ <strong>MSD 忘记递归终止条件</strong>——桶里只剩 1 个元素或到达字符串末尾时必须停止，否则死循环。</p>
        </aside>
      </section>

      <!-- 4. 复杂度与优缺点 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">4</span>
          复杂度：O(d·(n+k)) 与稳定性
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          d 轮，每轮都是一次 k=10 的计数排序（O(n + k)），所以总时间 <strong>O(d·(n+k))</strong>。
          当 d 是常数（如 32 位整数 d ≤ 10）时，等价于<strong>线性时间</strong>。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">指标</th><th class="px-4 py-2 border border-slate-200 font-semibold">结论</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">最好 / 平均 / 最坏</td><td class="px-4 py-2 border font-mono">O(d·(n+k))</td><td class="px-4 py-2 border">d 轮 × 每轮计数排序 O(n+k)；k = 10（十进制桶）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">空间</td><td class="px-4 py-2 border font-mono">O(n+k)</td><td class="px-4 py-2 border">每轮的输出数组 O(n) + count 数组 O(k)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">稳定性</td><td class="px-4 py-2 border font-mono text-emerald-600">稳定 ✅</td><td class="px-4 py-2 border">每轮都是稳定的计数排序，低位顺序被继承</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">适用数据</td><td class="px-4 py-2 border font-mono">整数 / 定长字符串</td><td class="px-4 py-2 border">能拆成「位」的数据；变长字符串需补位或用 MSD</td></tr>
            </tbody>
          </table>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p class="text-sm font-semibold text-emerald-800 mb-2">✅ 优点</p>
            <ul class="space-y-1.5 text-emerald-700 text-sm">
              <li>▸ 线性时间（d 为常数时），突破比较排序下界</li>
              <li>▸ 稳定排序，可排序「带卫星数据」的记录</li>
              <li>▸ 每轮逻辑完全一样，非常适合向量化 / GPU 并行</li>
              <li>▸ 对数据「接近有序与否」不敏感</li>
            </ul>
          </div>
          <div class="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <p class="text-sm font-semibold text-rose-800 mb-2">❌ 缺点</p>
            <ul class="space-y-1.5 text-rose-700 text-sm">
              <li>▸ 只能排「能拆位」的数据（整数/定长字符串），浮点数需改造</li>
              <li>▸ d 大时（如 64 位整数）常数因子高，可能不如快排</li>
              <li>▸ 每轮 O(n) 额外空间，非原地</li>
              <li>▸ 实现比快排/归并复杂，小数据上没优势</li>
            </ul>
          </div>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><br/>
          负数不能直接 LSD——<code class="bg-blue-100 px-1 rounded text-xs font-mono">floor(v / exp) % 10</code> 对负数取模会得到负数下标。
          统一套路：<strong>先整体偏移到非负</strong>（见下节代码），排序后再还原。<br/>
          浮点数同理：先乘 10^m 变成整数，或按 IEEE 754 的符号/指数/尾数位做基数排序。</p>
        </aside>
      </section>

      <!-- 5. 适用场景 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">5</span>
          适用场景：整数、定长字符串与多关键字
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          基数排序的舞台是<strong>「值域分散但位数有限」</strong>的数据——值域可能大到 10⁹，但位数只有 10 位，
          计数排序开不下 10⁹ 的数组，基数排序却只需要每轮 10 个桶。下面代码演示负数处理。
        </p>

        <div class="mb-4"><Code language="ts" :code="negCode" title="radix_sort_with_negative.ts" /></div>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>典型适用场景：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>大整数排序</strong>：电话号码、学号、订单号（位数固定，值域巨大）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>定长字符串</strong>：车牌、日期 "2024-01-05"、UUID 前缀、身份证号</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>多关键字稳定排序</strong>：先按次要 key 排，再按主要 key 稳定排（等价于 LSD）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>GPU/并行场景</strong>：每轮分桶+收集天然可并行（Map-Reduce 风格）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>字节序排序</strong>：对字节数组排序（如 IP 地址的 4 字节）</span></li>
          </ul>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong><br/>
          选型口诀——「<strong>位少、量多、要稳定</strong>」用基数排序：<br/>
          位数 d 小（≤ 10）且 n 大 → O(d·(n+k)) 赢过 O(n log n)；<br/>
          需要稳定 + 等长 key → LSD 最顺手；变长字符串 → MSD 或先补位再 LSD；<br/>
          n 很小或 d 很大 → 直接快排/插入排序，别为常数因子纠结。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">🎬</span>
          动画演示：LSD 逐轮分桶与收集
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点击「基数排序(LSD)」观察每一轮：上方数组中的元素<strong>按当前位落入下方对应桶</strong>（橙色高亮），
          随后<strong>按桶 0→9 收集</strong>回数组（绿色）。三轮（个位 → 十位 → 百位）后数组完全有序。
        </p>

        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ arr.length }}</span>
          <span v-if="curDigit" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full font-mono">🔢 当前位: {{ curDigit }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔢 步骤: {{ steps }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>

        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @click="doRadixSort" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">
            🔟 基数排序(LSD)
          </button>
          <button @click="resetViz" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100">
            ↺ 重置
          </button>
        </div>

        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 数组 -->
              <v-text :config="{x:8, y:8, text:'数组 arr（每轮按当前位稳定排序）', fontSize:11, fill:C.muted, fontStyle:'bold'}" />
              <template v-for="(v, i) in arr" :key="'a' + i">
                <v-rect :config="arrBar(i, v)" />
                <v-text :config="arrTxt(i, v)" />
              </template>
              <!-- 桶 -->
              <v-text :config="{x:8, y:104, text:'桶 0..9（按当前位的值分桶）', fontSize:11, fill:C.muted, fontStyle:'bold'}" />
              <template v-for="(items, b) in buckets" :key="'b' + b">
                <v-text :config="bucketLabel(b, items.length)" />
                <template v-for="(v, k) in items" :key="'bi' + b + '-' + k">
                  <v-rect :config="bucketItemCfg(b, k, v)" />
                  <v-text :config="bucketItemTxt(b, k, v)" />
                </template>
                <v-text :config="bucketIdx(b)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>基数排序 = d 轮稳定排序</strong>：每轮按一位分桶（计数排序）+ 收集，d 轮后整体有序</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>LSD（个位 → 高位）</strong>：迭代实现，适合整数和等长字符串；<strong>MSD（高位 → 低位）</strong>：递归实现，适合变长字符串</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>稳定性是生命线</strong>：每轮必须稳定，上一轮的低位顺序才能被高位继承</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度 O(d·(n+k))</strong>，空间 O(n+k)，稳定；d 为常数时是线性排序</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>负数/浮点需预处理</strong>：偏移到非负、放大成整数，或按位改造</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>经典场景</strong>：大整数、定长字符串、多关键字稳定排序——值域再大，位就那么多</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-2-linear-sort/dsa-7-2-1-counting" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：计数排序：稳定排序与适用范围</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-2-linear-sort/dsa-7-2-3-bucket" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：桶排序：均匀分布假设与期望复杂度 →</RouterLink>
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
  { id: "sec-1", name: "思想：逐位稳定排序" },
  { id: "sec-2", name: "LSD 实现" },
  { id: "sec-3", name: "MSD 与字符串排序" },
  { id: "sec-4", name: "复杂度与优缺点" },
  { id: "sec-5", name: "适用场景" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "📋 小结" },
]

// ===== 🎬 基数排序动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(360), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const curDigit = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

const arr = reactive<number[]>([])       // ⚠️ splice(0) 清空，不用 length=0
const arrCol = reactive<string[]>([])
const buckets = reactive<number[][]>([]) // 10 个桶，每个桶是一个数组
const bucketCol = reactive<string[]>([])
const steps = ref(0)

function cellW(n:number){ return Math.min(56, Math.max(22, Math.floor((W.value - 20) / n - 8))) }
function rowX(i:number, n:number){ const bw = cellW(n); const t = n * (bw + 8) - 8; return Math.max(10, (W.value - t) / 2) + i * (bw + 8) }
function bucketX(b:number){ const bw = Math.min(56, Math.max(18, Math.floor((W.value - 40) / 10 - 6))); return 20 + b * (bw + 6) }
function bucketW(){ return Math.min(56, Math.max(18, Math.floor((W.value - 40) / 10 - 6))) }

function initArr(vals:number[] = [170, 45, 75, 90, 802, 24, 2, 66]) {
  arr.splice(0); arrCol.splice(0)
  buckets.splice(0); bucketCol.splice(0)
  arr.push(...vals)
  for (let i = 0; i < vals.length; i++) arrCol.push(C.cyan)
  for (let b = 0; b < 10; b++) { buckets.push([]); bucketCol.push(C.cyan) }
  steps.value = 0; curDigit.value = ''
}

function arrBar(i:number, v:number) {
  const n = arr.length, bw = cellW(n)
  return { x: rowX(i, n), y: 26, width: bw, height: 40, fill: arrCol[i] || C.cyan,
    cornerRadius: [4, 4, 0, 0], stroke: '#0891b2', strokeWidth: 1 }
}
function arrTxt(i:number, v:number) {
  const n = arr.length, bw = cellW(n)
  return { x: rowX(i, n), y: 26, width: bw, height: 40, text: String(v),
    fontSize: Math.min(12, bw * 0.3), fontFamily: 'monospace', fontStyle: 'bold',
    fill: '#fff', align: 'center', verticalAlign: 'middle' }
}
function bucketLabel(b:number, cnt:number) {
  const bw = bucketW()
  return { x: bucketX(b), y: 116, width: bw, height: 12, text: '桶' + b + '(' + cnt + ')',
    fontSize: 9, fontFamily: 'monospace', fontStyle: 'bold', fill: C.muted, align: 'center' }
}
function bucketItemCfg(b:number, k:number, v:number) {
  const bw = bucketW()
  const y = 252 - (k + 1) * 26
  return { x: bucketX(b), y, width: bw, height: 24, fill: bucketCol[b] || C.cyan,
    cornerRadius: 4, stroke: '#0891b2', strokeWidth: 1 }
}
function bucketItemTxt(b:number, k:number, v:number) {
  const bw = bucketW()
  const y = 252 - (k + 1) * 26
  return { x: bucketX(b), y, width: bw, height: 24, text: String(v),
    fontSize: Math.min(11, bw * 0.26), fontFamily: 'monospace', fontStyle: 'bold',
    fill: '#fff', align: 'center', verticalAlign: 'middle' }
}
function bucketIdx(b:number) {
  const bw = bucketW()
  return { x: bucketX(b), y: 270, width: bw, height: 10, text: String(b),
    fontSize: 9, fontFamily: 'monospace', fill: C.muted, align: 'center' }
}

async function act(msg:string, label:string, fn:() => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

async function doRadixSort() {
  await act('基数排序 LSD  O(d·(n+k))', '按位分桶 → 收集', async () => {
    const digitNames = ['个位', '十位', '百位', '千位']
    const max = Math.max(...arr)
    const digitCount = Math.max(1, String(max).length)
    let exp = 1
    for (let round = 0; round < digitCount; round++, exp *= 10) {
      // 清空桶
      buckets.splice(0); bucketCol.splice(0)
      for (let b = 0; b < 10; b++) { buckets.push([]); bucketCol.push(C.cyan) }
      curDigit.value = digitNames[round]
      status.value = `第 ${round + 1}/${digitCount} 轮：按${digitNames[round]}分桶 (exp = ${exp})`
      await d(500)
      // 分桶
      for (let i = 0; i < arr.length; i++) {
        const v = arr[i]
        const digit = Math.floor(v / exp) % 10
        status.value = `arr[${i}] = ${v} → 桶 ${digit}`
        arrCol[i] = C.orange
        await d(260)
        buckets[digit].push(v)
        bucketCol[digit] = C.orange
        steps.value++
        await d(260)
        arrCol[i] = C.cyan; bucketCol[digit] = C.cyan
      }
      // 收集
      status.value = `第 ${round + 1} 轮：按桶序收集 (0 → 9)`
      await d(400)
      const collected: number[] = []
      for (let b = 0; b < 10; b++) {
        for (const v of buckets[b]) {
          status.value = `收集桶 ${b}: ${v}`
          bucketCol[b] = C.green
          await d(120)
          collected.push(v)
          steps.value++
        }
        if (buckets[b].length) bucketCol[b] = C.cyan
      }
      // 写回数组
      for (let i = 0; i < arr.length; i++) {
        arr[i] = collected[i]
        arrCol[i] = C.green
      }
      status.value = `第 ${round + 1} 轮完成：${arr.join(' ')}`
      await d(600)
      for (let i = 0; i < arr.length; i++) arrCol[i] = C.cyan
    }
    curDigit.value = ''
    status.value = '✅ 排序完成: ' + arr.join(' ')
    await d(800)
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
const lsdCode = `// ─── LSD 基数排序：逐位稳定排序 ───
// LSD = Least Significant Digit，从个位开始，每轮按某一位稳定排序
// 每轮用「计数排序」按位分桶（10 个桶 0~9），再按桶序收集

function radixSortLSD(arr: number[]): number[] {
    const max = Math.max(...arr)
    const maxDigit = String(max).length   // 需要轮数 d

    let exp = 1   // 10^轮次：个位 exp=1，十位 exp=10，百位 exp=100
    for (let round = 0; round < maxDigit; round++, exp *= 10) {
        // ① 计数排序按「当前位」分桶（10 个桶）
        const count = new Array(10).fill(0)
        for (const v of arr) {
            const digit = Math.floor(v / exp) % 10
            count[digit]++
        }
        // ② 前缀和（右边界）
        for (let i = 1; i < 10; i++) count[i] += count[i - 1]

        // ③ 反向回填 → 本轮稳定
        const out = new Array(arr.length)
        for (let i = arr.length - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10
            out[--count[digit]] = arr[i]
        }
        arr = out
    }
    return arr
}

// 示例: [170, 45, 75, 90, 802, 24, 2, 66]（最大 802 → 3 位，d = 3）
// 第 1 轮按个位: [170, 90, 802, 2, 24, 45, 75, 66]
// 第 2 轮按十位: [802, 2, 24, 45, 66, 170, 75, 90]
// 第 3 轮按百位: [2, 24, 45, 66, 75, 90, 170, 802] ✅
// 关键: 每轮必须稳定 —— 上一轮的低位顺序在本轮保持`

const stringCode = `// ─── 字符串 LSD：从最后一个字符往前稳定排序 ───
// 适用: 等长字符串（学号、车牌、日期 "2024-01-05" 等）
// 每轮按「第 pos 个字符」分桶（0-9 → 桶 0..9，a-z → 桶 10..35）

function radixSortStringLSD(arr: string[], len: number): string[] {
    // 从最后一个字符倒着往前，逐位稳定排序
    for (let pos = len - 1; pos >= 0; pos--) {
        const buckets: string[][] = Array.from({ length: 36 }, () => [])

        for (const s of arr) {
            const ch = s[pos]
            const idx = (ch >= '0' && ch <= '9')
                ? ch.charCodeAt(0) - 48        // '0' → 0
                : ch.charCodeAt(0) - 87        // 'a' → 10
            buckets[idx].push(s)
        }
        arr = buckets.flat()   // 按桶序收集，桶内保持上一轮顺序 → 稳定
    }
    return arr
}

// 示例: ["dab", "cab", "add", "bad", "cad"]（len = 3）
// 第 1 轮（末位 b/b/d/d/d）: [dab, cab, bad, add, cad]
// 第 2 轮（中间位 a/a/a/d/a）: [dab, cab, bad, cad, add]
// 第 3 轮（首位 d/c/b/c/a）: [add, bad, cab, cad, dab] ✅ 字典序
// 注意: 每轮都稳定，低位的次序才不会被破坏`

const negCode = `// ─── 负数处理：偏移到非负后再排 ───
// 方案: 先把所有数减去 min，得到非负数，LSD 排序后再加回 min

function radixSortWithNegative(nums: number[]): number[] {
    if (nums.length === 0) return nums
    const min = Math.min(...nums)
    // 偏移（负数 → 非负），排序后还原
    const shifted = nums.map(v => v - min)
    const sorted = radixSortLSD(shifted)
    return sorted.map(v => v + min)
}

// 示例: [170, -45, 75, -90, 802, -24, 2, -66]
// min = -90 → 偏移后: [260, 45, 165, 0, 892, 66, 92, 24]
// LSD 排序:   [0, 24, 45, 66, 92, 165, 260, 892]
// 还原:       [-90, -66, -45, -24, 2, 75, 170, 802] ✅`
</script>
