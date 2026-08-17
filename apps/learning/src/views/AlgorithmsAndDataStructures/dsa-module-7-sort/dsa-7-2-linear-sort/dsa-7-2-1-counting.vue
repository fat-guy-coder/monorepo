<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔢 计数排序：稳定排序与适用范围</h1>
          <p class="text-sm text-slate-500 mt-1">不比较元素，直接按「值出现的次数」排 —— O(n + k)</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-2-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">📐</span>
          结构总览：计数排序
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          计数排序 <strong>不比较元素大小</strong>，而是利用「值域有限」这个前提：先统计每个值出现多少次（直方图），
          再通过<strong>前缀和</strong>算出每个值在输出中的落点区间，最后<strong>反向遍历回填</strong>，
          从而在 O(n + k) 内完成排序，并且是<strong>稳定</strong>的。
        </p>

        <!-- 结构图：三步走全流程 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ct-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="18" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">计数排序三步走：统计 → 前缀和定位 → 反向回填（例 [4,2,2,8,3,3,1]）</text>

            <!-- 原数组 -->
            <text x="16" y="42" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">原数组 arr</text>
            <rect x="136" y="48" width="52" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="162" y="65" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="202" y="48" width="52" height="34" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2.5" />
            <text x="228" y="65" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="268" y="48" width="52" height="34" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2.5" />
            <text x="294" y="65" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="334" y="48" width="52" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="360" y="65" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <rect x="400" y="48" width="52" height="34" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2.5" />
            <text x="426" y="65" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="466" y="48" width="52" height="34" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2.5" />
            <text x="492" y="65" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="532" y="48" width="52" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="558" y="65" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <text x="162" y="92" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[0]</text>
            <text x="228" y="92" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">[1]</text>
            <text x="294" y="92" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">[2]</text>
            <text x="360" y="92" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[3]</text>
            <text x="426" y="92" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">[4]</text>
            <text x="492" y="92" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">[5]</text>
            <text x="558" y="92" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[6]</text>

            <line x1="360" y1="98" x2="360" y2="114" stroke="#94a3b8" stroke-width="2" marker-end="url(#ct-arr)" />
            <text x="368" y="109" font-size="10" font-family="monospace" fill="#64748b">① 统计 count[v]++</text>

            <!-- 计数数组 -->
            <text x="16" y="126" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">计数数组 count（每个值出现几次）</text>
            <rect x="148" y="132" width="40" height="34" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="168" y="149" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">0</text>
            <rect x="196" y="132" width="40" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="216" y="149" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="244" y="132" width="40" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="264" y="149" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="292" y="132" width="40" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="312" y="149" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="340" y="132" width="40" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="360" y="149" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="388" y="132" width="40" height="34" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="408" y="149" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">0</text>
            <rect x="436" y="132" width="40" height="34" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="456" y="149" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">0</text>
            <rect x="484" y="132" width="40" height="34" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="504" y="149" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">0</text>
            <rect x="532" y="132" width="40" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="552" y="149" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <text x="168" y="176" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">0</text>
            <text x="216" y="176" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">1</text>
            <text x="264" y="176" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">2</text>
            <text x="312" y="176" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">3</text>
            <text x="360" y="176" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">4</text>
            <text x="408" y="176" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">5</text>
            <text x="456" y="176" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">6</text>
            <text x="504" y="176" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">7</text>
            <text x="552" y="176" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">8</text>

            <line x1="360" y1="182" x2="360" y2="198" stroke="#94a3b8" stroke-width="2" marker-end="url(#ct-arr)" />
            <text x="368" y="193" font-size="10" font-family="monospace" fill="#64748b">② 前缀和 → ③ 反向回填</text>

            <!-- 输出 -->
            <text x="16" y="210" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">输出 out（按值从小到大；等值保持原序 → 稳定）</text>
            <rect x="136" y="216" width="52" height="34" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="162" y="233" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
            <rect x="202" y="216" width="52" height="34" rx="6" fill="#4ade80" stroke="#f59e0b" stroke-width="2.5" />
            <text x="228" y="233" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
            <rect x="268" y="216" width="52" height="34" rx="6" fill="#4ade80" stroke="#f59e0b" stroke-width="2.5" />
            <text x="294" y="233" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
            <rect x="334" y="216" width="52" height="34" rx="6" fill="#4ade80" stroke="#f59e0b" stroke-width="2.5" />
            <text x="360" y="233" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
            <rect x="400" y="216" width="52" height="34" rx="6" fill="#4ade80" stroke="#f59e0b" stroke-width="2.5" />
            <text x="426" y="233" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
            <rect x="466" y="216" width="52" height="34" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="492" y="233" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">4</text>
            <rect x="532" y="216" width="52" height="34" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="558" y="233" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：计数排序全流程 —— 统计 count 直方图 → 前缀和定位 → 反向回填；橙框为重复值，回填后相对顺序不变（稳定）</figcaption>
        </figure>

        <!-- 操作示意图：前缀和定位 vs 回填结果 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：前缀和给出落点区间 → 反向回填保证稳定</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="14" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">① 前缀和：count[i] = 值 ≤ i 的个数</text>
              <rect x="15" y="26" width="30" height="30" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="30" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">0</text>
              <rect x="50" y="26" width="30" height="30" rx="5" fill="#06b6d4" stroke="#f59e0b" stroke-width="2.5" />
              <text x="65" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="85" y="26" width="30" height="30" rx="5" fill="#06b6d4" stroke="#f59e0b" stroke-width="2.5" />
              <text x="100" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="120" y="26" width="30" height="30" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="135" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="155" y="26" width="30" height="30" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="170" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
              <rect x="190" y="26" width="30" height="30" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="205" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">6</text>
              <rect x="225" y="26" width="30" height="30" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="240" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">6</text>
              <rect x="260" y="26" width="30" height="30" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="275" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">6</text>
              <rect x="295" y="26" width="30" height="30" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="310" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <text x="30" y="66" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">0</text>
              <text x="65" y="66" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#d97706" font-weight="bold">1</text>
              <text x="100" y="66" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#d97706" font-weight="bold">2</text>
              <text x="135" y="66" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">3</text>
              <text x="170" y="66" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">4</text>
              <text x="205" y="66" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#94a3b8">5</text>
              <text x="240" y="66" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#94a3b8">6</text>
              <text x="275" y="66" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#94a3b8">7</text>
              <text x="310" y="66" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">8</text>
              <line x1="50" y1="76" x2="115" y2="76" stroke="#f59e0b" stroke-width="2" />
              <text x="14" y="94" font-size="11" font-family="monospace" fill="#64748b">值 2 → 落点区间 [1, 3)（占 out[1]、out[2]）</text>
              <text x="14" y="114" font-size="11" font-family="monospace" fill="#0891b2">count[2] − count[1] = 3 − 1 = 2 个「2」</text>
              <text x="14" y="134" font-size="11" font-family="monospace" fill="#64748b">回填时 --count[v] 依次给出下一个空位</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">前缀和：count[i] 是「值 ≤ i 的元素个数」，相邻差就是每个值的落点区间</figcaption>
          </figure>
          <figure>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="14" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">② 反向回填：out[--count[v]] = v（稳定）</text>
              <rect x="19" y="26" width="38" height="30" rx="5" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="38" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
              <rect x="63" y="26" width="38" height="30" rx="5" fill="#4ade80" stroke="#f59e0b" stroke-width="2.5" />
              <text x="82" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
              <rect x="107" y="26" width="38" height="30" rx="5" fill="#4ade80" stroke="#f59e0b" stroke-width="2.5" />
              <text x="126" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
              <rect x="151" y="26" width="38" height="30" rx="5" fill="#4ade80" stroke="#f59e0b" stroke-width="2.5" />
              <text x="170" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
              <rect x="195" y="26" width="38" height="30" rx="5" fill="#4ade80" stroke="#f59e0b" stroke-width="2.5" />
              <text x="214" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
              <rect x="239" y="26" width="38" height="30" rx="5" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="258" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">4</text>
              <rect x="283" y="26" width="38" height="30" rx="5" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="302" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
              <text x="14" y="78" font-size="11" font-family="monospace" fill="#64748b">反向遍历 arr，保证等值元素顺序不变：</text>
              <text x="14" y="98" font-size="11" font-family="monospace" fill="#d97706">arr[1] = 2（先出现）→ out[1]</text>
              <text x="14" y="118" font-size="11" font-family="monospace" fill="#d97706">arr[2] = 2（后出现）→ out[2]</text>
              <text x="14" y="138" font-size="11" font-family="monospace" fill="#16a34a">先出现的 2 依然在前面 → 稳定 ✅</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">反向遍历 + 前缀和右边界 = 相同值保持原相对顺序（稳定排序的关键）</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 思想 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">1</span>
          思想：统计直方图，跳过比较
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          前面学的快排、归并、堆排都有一个共同动作——<strong>比较两个元素的大小</strong>。
          计数排序 <strong>完全不比较</strong>：只要知道元素是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[0, k)</code> 范围内的整数，
          就先数一数每个值出现了几次（构建<strong>直方图</strong>），再按值从小到大「展开」成有序序列。
          这把复杂度从 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">O(n log n)</code> 降到了 <strong>O(n + k)</strong>，
          代价是 O(k) 的额外空间——典型的<strong>空间换时间</strong>。
        </p>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>执行流程拆解（1→2→3→4）：</strong></p>
          <ol class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span><strong>确定值域：</strong>扫描一遍求出 max，确定 k（值 ∈ [0, k)，k = max + 1）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span><strong>统计次数：</strong>遍历原数组，<code>count[v]++</code> 记录每个值出现几次</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">3.</span><span><strong>前缀和定位：</strong><code>count[i] += count[i-1]</code>，得到每个值在输出中的落点区间（稳定版）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">4.</span><span><strong>反向回填：</strong>从右往左遍历原数组，<code>out[--count[v]] = v</code>，保证稳定性</span></li>
          </ol>
        </div>

        <div class="mb-4"><Code language="ts" :code="countingCode" title="counting_sort_basic.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          计数排序 ≈ <strong>「按成绩分桶后按桶点名」</strong>：老师先统计每个分数段有多少人（直方图），再按分数从低到高挨个点名，
          而不是让同学两两比身高。<br/>
          也像 <strong>统计直方图再展开</strong>——你在前端用 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Map&lt;string, number&gt;</code> 统计各分类出现次数，
          最后按 key 排序输出，就是计数排序的思想。<br/>
          适合 key 范围小的场景，例如 <strong>按年龄 / 按等级排序用户列表</strong>（0~100 岁 vs 上亿条无序数据）。</p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>值域 k 很大时硬上计数排序</strong>——k = 2³¹ 时 count 数组要开 40 亿个格子（约 16GB 内存），直接 OOM。<br/>
          ② <strong>以为计数排序能排任意数据</strong>——它只能排「能映射成小范围整数 key」的数据；排序浮点数、字符串要先做映射。<br/>
          ③ <strong>不预处理负数</strong>——直接 <code class="bg-amber-100 px-1 rounded text-xs font-mono">count[v]++</code>，v 为负时下标越界。</p>
        </aside>
      </section>

      <!-- 2. 稳定版实现 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">2</span>
          稳定版实现：前缀和 + 反向遍历
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          实际业务里要排序的往往是<strong>带卫星数据的记录</strong>（对象、行数据）。此时「稳定」很重要：
          <strong>key 相同的记录，排序后要保留原来的先后顺序</strong>。做法是：
          先用<strong>前缀和</strong>把 count 数组变成「每个值在输出中的右边界」，
          再<strong>反向遍历</strong>原数组回填——后出现的先落位在右边，先出现的自然留在左边，顺序就被保留了。
        </p>

        <div class="mb-4"><Code language="ts" :code="stableCode" title="counting_sort_stable.ts" /></div>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>为什么「反向遍历」是稳定的关键？</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>前缀和后 <code>count[v]</code> = 「值 ≤ v 的元素总数」= 值 v 的<strong>右边界</strong></span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code>--count[v]</code> 先减 1 再当下标 → 从右往左填，后遇到的先落位在右边</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>最早遇到的那个值 v 最后落位在最左 → 顺序与原来一致 ✅</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>若<strong>正向</strong>遍历，相同 key 会整体逆序 → 变成不稳定排序</span></li>
          </ul>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          稳定排序 ≈ <strong>表格多列排序</strong>：先按「日期」排，再按「优先级」稳定排，
          结果里优先级相同的记录仍按日期有序——这正是 Excel / antd Table 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">stable</code> 行为。<br/>
          反向遍历 ≈ <strong>从数组末尾往回收栈</strong>：像 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Array.prototype.reduceRight</code>，
          处理顺序与 push 相反，恰好配合「右边界递减」的填充逻辑。</p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>把反向遍历写成正向遍历</strong>——结果虽然「看起来有序」，但相同 key 的记录顺序被翻转，不稳定。<br/>
          ② <strong>忘了先减 1：</strong>写成 <code class="bg-amber-100 px-1 rounded text-xs font-mono">out[count[v]] = v</code> 或 <code class="bg-amber-100 px-1 rounded text-xs font-mono">out[count[v]--]</code> 的顺序搞反，
          会越界或覆盖已放置的元素。<br/>
          ③ <strong>前缀和下标从 0 开始</strong>——<code class="bg-amber-100 px-1 rounded text-xs font-mono">for (let i = 1; i &lt; k; i++)</code>，漏掉 i=0 或写成 <code class="bg-amber-100 px-1 rounded text-xs font-mono">i &lt;= k</code> 都会错位。</p>
        </aside>
      </section>

      <!-- 3. 复杂度与优缺点 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">3</span>
          复杂度：O(n + k) 与稳定性
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          计数排序的时间只与 <strong>n（元素个数）</strong> 和 <strong>k（值域大小）</strong> 有关，与数据是否接近有序无关——最好、平均、最坏都是 O(n + k)。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">指标</th><th class="px-4 py-2 border border-slate-200 font-semibold">结论</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">最好 / 平均 / 最坏</td><td class="px-4 py-2 border font-mono">O(n + k)</td><td class="px-4 py-2 border">统计 O(n) + 前缀和 O(k) + 回填 O(n)，与输入顺序无关</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">空间</td><td class="px-4 py-2 border font-mono">O(n + k)</td><td class="px-4 py-2 border">count 数组 O(k) + 输出数组 O(n)；可改成「边统计边压缩」省掉输出数组</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">稳定性</td><td class="px-4 py-2 border font-mono text-emerald-600">稳定 ✅</td><td class="px-4 py-2 border">前缀和 + 反向遍历，等值保持原序</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">适用前提</td><td class="px-4 py-2 border font-mono">k 与 n 同量级</td><td class="px-4 py-2 border">k 远大于 n 时退化为 O(k)，不如快排</td></tr>
            </tbody>
          </table>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <p class="text-sm font-semibold text-emerald-800 mb-2">✅ 优点</p>
            <ul class="space-y-1.5 text-emerald-700 text-sm">
              <li>▸ 突破比较排序 O(n log n) 下界，可达线性 O(n + k)</li>
              <li>▸ 稳定排序，适合作为基数排序的内层引擎</li>
              <li>▸ 实现简单、无递归、无交换</li>
              <li>▸ 数据分布不影响性能（不像快排怕最坏情况）</li>
            </ul>
          </div>
          <div class="bg-rose-50 border border-rose-200 rounded-xl p-4">
            <p class="text-sm font-semibold text-rose-800 mb-2">❌ 缺点</p>
            <ul class="space-y-1.5 text-rose-700 text-sm">
              <li>▸ 只能排整数 / 可映射成小范围整数 key 的数据</li>
              <li>▸ k 大时空间爆炸，甚至无法分配内存</li>
              <li>▸ 额外 O(k) 空间，非原地排序</li>
              <li>▸ 需要先知道/扫描出值域，流式数据不友好</li>
            </ul>
          </div>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><br/>
          <code class="bg-blue-100 px-1 rounded text-xs font-mono">k</code> 才是判断用不用计数排序的标尺：<br/>
          当 k ≈ n（如 1 万人的年龄、0~100 的考试分数）→ 计数排序 ≈ O(n)，碾压快排；<br/>
          当 k &gt;&gt; n（如 10 个元素但值域 0~10⁹）→ O(k) 的开销毫无意义，直接用快排/插入排序。</p>
        </aside>
      </section>

      <!-- 4. 适用场景与限制 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">4</span>
          适用场景与限制：负数偏移与 key 映射
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          计数排序的三大限制——<strong>① 只能排整数 key；② k 不能太大；③ 下标不能为负</strong>。
          前两条是理论边界，第三条可以轻松绕过：把最小值偏移到 0，排序后再加回来，负数就变成了普通场景。
        </p>

        <div class="mb-4"><Code language="ts" :code="negativeCode" title="counting_sort_with_negative.ts" /></div>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>典型适用场景：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>按年龄/等级排序</strong>：0~120 岁、A~F 等级，k 极小</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>成绩分段统计</strong>：0~100 分，输出各分数段人数 + 排序</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>字节排序</strong>：字符/字节值域 0~255，k = 256 固定</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>基数排序的内层引擎</strong>：按位分桶时 k = 10（见下一节 dsa-7-2-2）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>去重统计 + 有序输出</strong>：一次遍历同时得到频次直方图和有序 key 列表</span></li>
          </ul>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong><br/>
          通用决策链——先问三个问题：<br/>
          1) key 能否映射为 <strong>小范围整数</strong>？（否 → 快排/归并）<br/>
          2) k 是否与 n 同量级或更小？（否 → 快排/基数排序）<br/>
          3) 需要稳定吗？（需要 → 前缀和 + 反向遍历；不需要 → 直方图展开即可）<br/>
          三个都是「是」→ 放心用计数排序，O(n + k) 且稳定。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">🎬</span>
          动画演示：统计 → 前缀和 → 回填
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点击「计数排序」观察三步过程：<strong>① 统计</strong>（每个元素使对应 count 柱 +1）→ <strong>② 前缀和</strong>（count 变成落点右边界）→
          <strong>③ 反向回填</strong>（元素落到输出数组的正确位置，等值保持原序）。上方是原数组，中间是输出数组，下方是计数直方图。
        </p>

        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ arr.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🗄️ 值域: 0~{{ kVal - 1 }} (k={{ kVal }})</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔢 步骤: {{ steps }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>

        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @click="doCountingSort" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">
            🔢 计数排序
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
              <v-text :config="{x:8, y:8, text:'原数组 arr', fontSize:11, fill:C.muted, fontStyle:'bold'}" />
              <template v-for="(v, i) in arr" :key="'a' + i">
                <v-rect :config="rowBar(i, v, 26, 40, arrCol[i])" />
                <v-text :config="rowTxt(i, v, 26, 40, arrCol[i])" />
              </template>
              <!-- 输出数组 -->
              <v-text :config="{x:8, y:100, text:'输出 out（回填目标）', fontSize:11, fill:C.muted, fontStyle:'bold'}" />
              <template v-for="(v, i) in out" :key="'o' + i">
                <v-rect :config="rowBar(i, v, 118, 40, outCol[i])" />
                <v-text :config="rowTxt(i, v, 118, 40, outCol[i])" />
              </template>
              <!-- 计数直方图 -->
              <v-text :config="{x:8, y:206, text:'计数 count[0..' + (kVal - 1) + ']', fontSize:11, fill:C.muted, fontStyle:'bold'}" />
              <template v-for="(c, i) in counts" :key="'c' + i">
                <v-rect :config="histBar(i, c, countCol[i])" />
                <v-text :config="histVal(i, c)" />
                <v-text :config="histIdx(i)" />
              </template>
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>计数排序不比较元素</strong>，而是统计值出现的次数（直方图）后按值展开——O(n + k)，可突破比较排序下界</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>稳定版三件套：</strong>统计 <code>count[v]++</code> → 前缀和 <code>count[i] += count[i-1]</code> → 反向回填 <code>out[--count[v]] = v</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>稳定性靠反向遍历</strong>：前缀和给出右边界，从右往左放，等值保持原序</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三大限制：</strong>只能排整数 key、k 不能太大、下标不能为负（负数用偏移解决）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>空间换时间：</strong>O(n + k) 空间，非原地；k ≈ n 时才划算</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>经典用法：</strong>年龄/等级/分数等小值域排序，以及<strong>基数排序的内层引擎</strong>（下一节）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-1-compare/dsa-7-1-4-insert-shell" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：插入排序与希尔排序</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-2-linear-sort/dsa-7-2-2-radix" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：基数排序：LSD/MSD与字符串排序 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "思想：统计直方图" },
  { id: "sec-2", name: "稳定版实现" },
  { id: "sec-3", name: "复杂度与优缺点" },
  { id: "sec-4", name: "适用场景与限制" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-5", name: "📋 小结" },
]

// ===== 🎬 计数排序动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(360), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

const arr = reactive<number[]>([])       // ⚠️ splice(0) 清空，不用 length=0
const arrCol = reactive<string[]>([])
const counts = reactive<number[]>([])    // 计数数组
const countCol = reactive<string[]>([])
const out = reactive<number[]>([])       // 输出（-1 表示未填充的占位）
const outCol = reactive<string[]>([])
const steps = ref(0)
const kVal = computed(() => Math.max(...arr, 0) + 1)

function cellW(n:number){ return Math.min(56, Math.max(22, Math.floor((W.value - 20) / n - 8))) }
function cellC(k:number){ return Math.min(54, Math.max(16, Math.floor((W.value - 20) / k - 6))) }
function rowX(i:number, n:number){ const bw = cellW(n); const t = n * (bw + 8) - 8; return Math.max(10, (W.value - t) / 2) + i * (bw + 8) }
function histX(i:number){ const k = Math.max(counts.length, 1); const bw = cellC(k); const t = k * (bw + 6) - 6; return Math.max(10, (W.value - t) / 2) + i * (bw + 6) }

function initArr(vals:number[] = [4, 2, 2, 8, 3, 3, 1]) {
  arr.splice(0); arrCol.splice(0)
  out.splice(0); outCol.splice(0)
  counts.splice(0); countCol.splice(0)
  arr.push(...vals)
  for (let i = 0; i < vals.length; i++) {
    arrCol.push(C.cyan)
    out.push(-1); outCol.push(C.ghost)
  }
  const k = Math.max(...vals, 0) + 1
  for (let v = 0; v < k; v++) { counts.push(0); countCol.push(C.cyan) }
  steps.value = 0
}

function rowBar(i:number, v:number, y:number, h:number, col:string) {
  const n = Math.max(arr.length, out.length), bw = cellW(n)
  const empty = v < 0
  return { x: rowX(i, n), y, width: bw, height: h, fill: empty ? C.ghost : (col || C.cyan),
    cornerRadius: [4, 4, 0, 0], stroke: empty ? 'transparent' : '#0891b2', strokeWidth: 1 }
}
function rowTxt(i:number, v:number, y:number, h:number, col:string) {
  const n = Math.max(arr.length, out.length), bw = cellW(n)
  return { x: rowX(i, n), y, width: bw, height: h, text: v < 0 ? '' : String(v),
    fontSize: Math.min(12, bw * 0.3), fontFamily: 'monospace', fontStyle: 'bold',
    fill: '#fff', align: 'center', verticalAlign: 'middle' }
}
function histBar(i:number, c:number, col:string) {
  const k = Math.max(counts.length, 1), bw = cellC(k)
  const maxC = Math.max(...counts, 1)
  const h = Math.max(3, (c / maxC) * 108)
  return { x: histX(i), y: 328 - h, width: bw, height: h, fill: col || C.cyan,
    cornerRadius: [3, 3, 0, 0], stroke: '#0891b2', strokeWidth: 1 }
}
function histVal(i:number, c:number) {
  const k = Math.max(counts.length, 1), bw = cellC(k)
  const maxC = Math.max(...counts, 1)
  const h = Math.max(3, (c / maxC) * 108)
  return { x: histX(i), y: 328 - h - 13, width: bw, height: 10, text: String(c),
    fontSize: 9, fontFamily: 'monospace', fontStyle: 'bold', fill: C.muted, align: 'center' }
}
function histIdx(i:number) {
  const k = Math.max(counts.length, 1), bw = cellC(k)
  return { x: histX(i), y: 342, width: bw, height: 10, text: '[' + i + ']',
    fontSize: 8, fontFamily: 'monospace', fill: C.muted, align: 'center' }
}

async function act(msg:string, label:string, fn:() => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

async function doCountingSort() {
  await act('计数排序  O(n+k)', '统计 → 前缀和 → 回填', async () => {
    const k = kVal.value
    // ① 统计
    for (let v = 0; v < k; v++) { counts[v] = 0; countCol[v] = C.cyan }
    for (let i = 0; i < arr.length; i++) {
      const v = arr[i]
      status.value = `① 统计: arr[${i}] = ${v} → count[${v}]++`
      arrCol[i] = C.orange
      await d(280)
      counts[v]++; countCol[v] = C.green
      steps.value++
      await d(280)
      arrCol[i] = C.cyan; countCol[v] = C.cyan
    }
    // ② 前缀和
    status.value = '② 前缀和: count[i] += count[i-1]（落点右边界）'
    await d(500)
    for (let i = 1; i < k; i++) {
      counts[i] += counts[i - 1]
      countCol[i] = C.orange
      steps.value++
      status.value = `② 前缀和: count[${i}] = ${counts[i]}（值 ≤ ${i} 共 ${counts[i]} 个）`
      await d(320)
      countCol[i] = C.cyan
    }
    // ③ 反向回填（稳定）
    status.value = '③ 回填: 反向遍历 arr，out[--count[v]] = v'
    await d(500)
    for (let i = arr.length - 1; i >= 0; i--) {
      const v = arr[i]
      const pos = --counts[v]
      out[pos] = v; outCol[pos] = C.green
      countCol[v] = C.orange; arrCol[i] = C.orange
      steps.value++
      status.value = `③ 回填: arr[${i}] = ${v} → out[${pos}]（count[${v}] 减到 ${counts[v]}）`
      await d(320)
      arrCol[i] = C.cyan; countCol[v] = C.cyan
    }
    status.value = '✅ 排序完成: ' + out.join(' ')
    await d(900)
    for (let i = 0; i < out.length; i++) outCol[i] = C.green
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
const countingCode = `// ─── 基础计数排序：统计直方图后按值展开（不稳定版）───
// 前提: 元素是非负整数且值域 [0, k) 已知且不大
// 思想: 不比较元素大小，直接数「每个值出现了几次」

function countingSortBasic(arr: number[], k: number): number[] {
    const count = new Array(k).fill(0)   // count[v] = 值 v 出现的次数

    // ① 统计
    for (const v of arr) {
        count[v]++
    }

    // ② 按值从小到大展开（直方图 → 有序数组）
    const out: number[] = []
    for (let v = 0; v < k; v++) {
        for (let t = 0; t < count[v]; t++) {
            out.push(v)
        }
    }
    return out
}

// 示例: arr = [4, 2, 2, 8, 3, 3, 1], k = 9
// ① 统计: count = [0, 1, 2, 2, 1, 0, 0, 0, 1]
//          值:     0  1  2  3  4  5  6  7  8
// ② 展开:
//   值 1 出现 1 次 → 1
//   值 2 出现 2 次 → 2, 2
//   值 3 出现 2 次 → 3, 3
//   值 4 出现 1 次 → 4
//   值 8 出现 1 次 → 8
// 结果: [1, 2, 2, 3, 3, 4, 8] ✅

// ─── 统计结果打印（演示模板字符串写法）───
function printCounts(count: number[], k: number): void {
    for (let v = 0; v < k; v++) {
        console.log(\`值 \${v} 出现 \${count[v]} 次\`)
    }
}
// 输出示例（k = 9 时）:
// 值 0 出现 0 次
// 值 1 出现 1 次
// 值 2 出现 2 次
// ...

// ─── 复杂度 ───
// 统计: O(n)    展开: O(n + k)    合计: O(n + k)
// 空间: O(k)（count 数组）
// ⚠️ 这个版本不稳定——它只按「值」输出，
//    排序「带卫星数据的记录」时会丢失等值元素的原始相对顺序`

const stableCode = `// ─── 稳定版计数排序：前缀和 + 反向遍历 ───
// 为什么需要稳定? 排序对象常是「记录」，key 相同但携带其他字段
// 稳定 = key 相同的记录，排序后保持原有先后顺序

interface Record { key: number; name: string }

function countingSortStable(records: Record[], k: number): Record[] {
    const n = records.length
    const count = new Array(k).fill(0)

    // ① 统计每个 key 出现次数
    for (const r of records) {
        count[r.key]++
    }

    // ② 前缀和: count[i] = key ≤ i 的记录总数
    //    也就是 key = i 的记录在输出中的「右边界 + 1」
    for (let i = 1; i < k; i++) {
        count[i] += count[i - 1]
    }

    // ③ 反向遍历 + 回填: 从右往左放，相同 key 后出现者先落位
    const out = new Array<Record>(n)
    for (let i = n - 1; i >= 0; i--) {
        const r = records[i]
        out[--count[r.key]] = r   // 先减 1 再作为下标
    }
    return out
}

// 示例: 三条 key = 2 的记录，顺序为 A → B → C
// records: [{2,A}, {1,X}, {2,B}, {0,P}, {2,C}]
// ① count:  [1, 1, 3]
// ② 前缀和: [1, 2, 5]
// ③ 反向回填:
//   i=4: key=2 → out[--5=4] = {2,C}
//   i=3: key=0 → out[--1=0] = {0,P}
//   i=2: key=2 → out[--4=3] = {2,B}
//   i=1: key=1 → out[--2=1] = {1,X}
//   i=0: key=2 → out[--3=2] = {2,A}
// 结果: [{0,P}, {1,X}, {2,A}, {2,B}, {2,C}] ✅
// 三条 key=2 的相对顺序 A→B→C 保持不变 → 稳定!

// ─── 为什么必须反向遍历? ───
// 前缀和给出的是「右边界」，从右往左放：
//   最后遇到的 key=2 放在最右，最早遇到的放在最左
// 若正向遍历，相同 key 会整体逆序 → 不稳定

// ─── 复杂度 ───
// 时间 O(n + k)  空间 O(n + k)（count O(k) + 输出 O(n)）  稳定 ✅`

const negativeCode = `// ─── 负数偏移处理：把值域平移到非负 ───
// 计数排序要求下标非负，遇到负数先把最小值偏移到 0
// 排序后再把偏移加回来

function countingSortWithNegative(arr: number[]): number[] {
    if (arr.length === 0) return arr

    const min = Math.min(...arr)     // 可能为负
    const max = Math.max(...arr)
    const k = max - min + 1          // 值域大小（含平移后）
    const count = new Array(k).fill(0)

    // ① 统计: 用 v - min 作为下标
    for (const v of arr) {
        count[v - min]++
    }

    // ② 前缀和（稳定版）
    for (let i = 1; i < k; i++) count[i] += count[i - 1]

    // ③ 反向回填 + 还原真实值
    const out = new Array(arr.length)
    for (let i = arr.length - 1; i >= 0; i--) {
        const v = arr[i]
        out[--count[v - min]] = v
    }
    return out
}

// 示例: [-3, 5, 0, -3, 2, 5]
// min = -3, max = 5, k = 9
// 映射: -3→0, 5→8, 0→3, -3→0, 2→5, 5→8
// 结果: [-3, -3, 0, 2, 5, 5] ✅

// ─── 通用化: 任意可映射为整数的 key ───
// 字符计数:  key = charCodeAt(0) - 97（小写字母 → 0..25）
// 按天计数:  key = Math.floor(timestamp / 86400000)
// 只要 key 是「值域有限的整数」，计数排序就适用`
</script>
