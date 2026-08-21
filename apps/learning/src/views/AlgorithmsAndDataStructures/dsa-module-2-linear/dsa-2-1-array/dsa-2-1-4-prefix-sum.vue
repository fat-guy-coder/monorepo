<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">➕ 前缀和与差分数组</h1>
          <p class="text-sm text-slate-500 mt-1">区间查询从 O(n) 到 O(1) 的魔法</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-1-4</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：前缀和
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          前缀和是一种<strong>预处理技术</strong>：用 O(n) 构建辅助数组 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">prefix</code>，
          其中 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">prefix[i] = arr[0] + ... + arr[i-1]</code>（多一个哨兵 prefix[0]=0）。
          之后任意区间和都能用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">prefix[R+1] - prefix[L]</code> 在 O(1) 内算出。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 520 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">原数组 + 前缀和数组（上下对应，prefix 多一个哨兵）</text>

            <!-- 原数组 -->
            <rect x="88" y="44" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="116" y="66" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="152" y="44" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="180" y="66" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="216" y="44" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="244" y="66" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="280" y="44" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="308" y="66" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="344" y="44" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="372" y="66" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="408" y="44" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="436" y="66" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>

            <text x="116" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[0]</text>
            <text x="180" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[1]</text>
            <text x="244" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[2]</text>
            <text x="308" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[3]</text>
            <text x="372" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[4]</text>
            <text x="436" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[5]</text>

            <text x="16" y="118" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">前缀和 prefix（prefix[i] = 前 i 个元素之和，prefix[0]=0 哨兵）</text>

            <!-- 前缀和数组（哨兵 + n 个） -->
            <rect x="24" y="138" width="56" height="44" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="52" y="160" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">0</text>
            <rect x="88" y="138" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="116" y="160" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="152" y="138" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="180" y="160" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="216" y="138" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="244" y="160" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <rect x="280" y="138" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="308" y="160" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <rect x="344" y="138" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="372" y="160" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">14</text>
            <rect x="408" y="138" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="436" y="160" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">23</text>

            <text x="52" y="194" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[0]</text>
            <text x="116" y="194" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[1]</text>
            <text x="180" y="194" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[2]</text>
            <text x="244" y="194" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[3]</text>
            <text x="308" y="194" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[4]</text>
            <text x="372" y="194" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[5]</text>
            <text x="436" y="194" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[6]</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：前缀和结构 —— prefix[i+1] 与 arr[i] 上下对齐，prefix[i+1] = arr[0..i] 之和</figcaption>
        </figure>

        <!-- 操作示意图：区间和 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：区间和 sum[2..4] = prefix[5] - prefix[2] = 14 - 4 = 10</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">原数组区间 [2,4]（直接累加 O(n)）</p>
            <svg viewBox="0 0 320 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="14" y="60" width="40" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="34" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="60" y="60" width="40" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="80" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="106" y="60" width="40" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="126" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="152" y="60" width="40" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="172" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="198" y="60" width="40" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="218" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="244" y="60" width="40" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="264" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>

              <text x="34" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[0]</text>
              <text x="80" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[1]</text>
              <text x="126" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">[2]</text>
              <text x="172" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">[3]</text>
              <text x="218" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">[4]</text>
              <text x="264" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[5]</text>

              <text x="14" y="136" font-size="11" font-family="monospace" fill="#64748b">arr[2]+arr[3]+arr[4] = 4+1+5 = 10</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">朴素做法：逐个累加区间元素，查询次数多时是 O(n) 每次</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">前缀和查表（O(1)）</p>
            <svg viewBox="0 0 320 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="14" y="60" width="36" height="40" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="32" y="80" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">0</text>
              <rect x="54" y="60" width="36" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="72" y="80" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="94" y="60" width="36" height="40" rx="6" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
              <text x="112" y="80" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="134" y="60" width="36" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="152" y="80" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="174" y="60" width="36" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="192" y="80" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <rect x="214" y="60" width="36" height="40" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="232" y="80" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">14</text>
              <rect x="254" y="60" width="36" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="272" y="80" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">23</text>

              <text x="32" y="112" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#94a3b8">[0]</text>
              <text x="72" y="112" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">[1]</text>
              <text x="112" y="112" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#dc2626" font-weight="bold">[2]</text>
              <text x="152" y="112" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">[3]</text>
              <text x="192" y="112" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">[4]</text>
              <text x="232" y="112" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#16a34a" font-weight="bold">[5]</text>
              <text x="272" y="112" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">[6]</text>

              <text x="14" y="136" font-size="11" font-family="monospace" fill="#0891b2">sum = prefix[5] − prefix[2] = 14 − 4 = 10</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">预处理一次 O(n)，之后每次区间查询只做一次减法 O(1)</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 前缀和概念 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          前缀和 —— 空间换时间的经典案例
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          前缀和 (Prefix Sum) 是一种<strong>预处理技术</strong>：用 O(n) 时间构建一个辅助数组，之后任何区间求和查询都能在 <strong>O(1)</strong> 时间内完成。
          代价是额外的 O(n) 空间。
        </p>

        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">
            prefix[i] = arr[0] + arr[1] + ... + arr[i-1]
          </p>
          <p class="text-xs text-cyan-600 text-center">prefix[i] 表示前 i 个元素的和（prefix[0] = 0 作为哨兵）</p>
        </div>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>核心公式：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">▸</span><span><strong>构建：</strong><code>prefix[i] = prefix[i-1] + arr[i-1]</code>（i 从 1 到 n）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">▸</span><span><strong>查询：</strong><code>sum(L, R) = prefix[R+1] - prefix[L]</code>（半开区间 [L, R+1)）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">▸</span><span><strong>单点：</strong><code>sum(0, i) = prefix[i+1] - prefix[0] = prefix[i+1]</code></span></li>
          </ul>
        </div>

        <div class="mb-4"><Code language="ts" :code="conceptCode" title="prefix_sum_basics.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          前缀和就像 React/Vue 的<strong>计算属性 (computed)</strong>——用 O(n) 的空间缓存中间结果，之后 O(1) 获取。<br/>
          <code>prefix[i]</code> 就像 <code>computed(() => arr.slice(0, i).reduce(sum))</code>，但只算一次。<br/>
          类比 CSS：前缀和 = <code>cumulative layout shift</code>——每个元素的偏移 = 前面所有元素偏移之和。</p>
        </aside>
      </section>

      <!-- 2. 区间查询与变体 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          区间查询实战 —— 不只是求和
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          前缀和的思想可以推广到任何<strong>可逆运算</strong>，不只是加法。只要运算有"逆运算"，就能用前缀和实现 O(1) 区间查询。
        </p>
        <div class="mb-4"><Code language="ts" :code="variantsCode" title="prefix_variants.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">类型</th><th class="px-4 py-2 border border-slate-200 font-semibold">运算</th><th class="px-4 py-2 border border-slate-200 font-semibold">逆运算</th><th class="px-4 py-2 border border-slate-200 font-semibold">构建公式</th><th class="px-4 py-2 border border-slate-200 font-semibold">查询公式</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">前缀和</td><td class="px-4 py-2 border font-mono">+</td><td class="px-4 py-2 border font-mono">-</td><td class="px-4 py-2 border font-mono">pre[i] = pre[i-1] + arr[i-1]</td><td class="px-4 py-2 border font-mono">sum = pre[R+1] - pre[L]</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">前缀积</td><td class="px-4 py-2 border font-mono">×</td><td class="px-4 py-2 border font-mono">÷</td><td class="px-4 py-2 border font-mono">pre[i] = pre[i-1] * arr[i-1]</td><td class="px-4 py-2 border font-mono">prod = pre[R+1] / pre[L]</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">前缀异或</td><td class="px-4 py-2 border font-mono">^</td><td class="px-4 py-2 border font-mono">^</td><td class="px-4 py-2 border font-mono">pre[i] = pre[i-1] ^ arr[i-1]</td><td class="px-4 py-2 border font-mono">xor = pre[R+1] ^ pre[L]</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">前缀最大值</td><td class="px-4 py-2 border font-mono">max</td><td class="px-4 py-2 border font-mono text-red-500">❌ 无</td><td class="px-4 py-2 border font-mono">pre[i] = max(pre[i-1], arr[i-1])</td><td class="px-4 py-2 border font-mono text-slate-400">只能求前缀 max，不能求区间 max</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么前缀最大值不能做区间查询？</strong><br/>
          <code>max</code> 运算没有逆运算——知道 <code>max(arr[0..R])</code> 和 <code>max(arr[0..L-1])</code> 无法反推出 <code>max(arr[L..R])</code>。<br/>
          <strong>可逆性是前缀和技巧的前提。</strong>不可逆的运算需要用线段树（O(log n) 查询）。</p>
        </aside>
      </section>

      <!-- 3. 差分数组 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          差分数组 —— 区间更新的 O(1) 魔法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          差分数组 (Difference Array) 是前缀和的<strong>逆运算</strong>，用于高效处理<strong>频繁的区间增减操作</strong>。
          一句话先记住它：<strong>它存的不是"值"，而是每个元素相对上一个元素的"变化量"（落差）</strong>。
          核心思想：不对区间内每个元素逐一修改，而是只标记区间的<strong>起点和终点</strong>，最后通过前缀和"恢复"出最终结果。
        </p>

        <!-- 📦 结构：diff 长什么样 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">📦 结构：diff 长什么样</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">
          差分数组和原数组<strong>等长</strong>，每个位置存的是"这个元素比上一个元素大了 / 小了多少"：
        </p>
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200 mb-4">
          <p class="text-sm text-cyan-800 mb-1 font-semibold text-center font-mono">diff[0] = arr[0]；diff[i] = arr[i] - arr[i-1]（i ≥ 1）</p>
          <p class="text-xs text-cyan-600 text-center">反过来：arr[i] = diff[0] + diff[1] + … + diff[i] —— 对 diff 做前缀和就能还原出原数组</p>
        </div>

        <figure class="mb-4">
          <svg viewBox="0 0 520 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="16" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">原数组 arr 与差分数组 diff（上下对应，diff[i] = arr[i] - arr[i-1]）</text>

            <!-- 原数组 -->
            <rect x="60" y="44" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="88" y="66" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="134" y="44" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="162" y="66" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="208" y="44" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="236" y="66" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <rect x="282" y="44" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="310" y="66" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="356" y="44" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="384" y="66" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>

            <text x="88" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[0]</text>
            <text x="162" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[1]</text>
            <text x="236" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[2]</text>
            <text x="310" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[3]</text>
            <text x="384" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[4]</text>

            <!-- 相邻两数的落差 -->
            <text x="16" y="126" font-size="11" font-family="monospace" fill="#64748b">落差:</text>
            <text x="125" y="126" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ef4444">-2</text>
            <text x="199" y="126" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#22c55e">+4</text>
            <text x="273" y="126" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ef4444">-5</text>
            <text x="347" y="126" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#22c55e">+6</text>

            <!-- 对应虚线 -->
            <line x1="88" y1="84" x2="88" y2="158" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3" />
            <line x1="162" y1="84" x2="162" y2="158" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3" />
            <line x1="236" y1="84" x2="236" y2="158" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3" />
            <line x1="310" y1="84" x2="310" y2="158" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3" />
            <line x1="384" y1="84" x2="384" y2="158" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3" />

            <text x="16" y="176" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">差分数组 diff（存落差：正=上升绿 / 负=下降红）</text>

            <!-- 差分数组 -->
            <rect x="60" y="158" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="88" y="180" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="134" y="158" width="56" height="40" rx="6" fill="#ef4444" stroke="#dc2626" stroke-width="1.5" />
            <text x="162" y="180" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">-2</text>
            <rect x="208" y="158" width="56" height="40" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="236" y="180" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">4</text>
            <rect x="282" y="158" width="56" height="40" rx="6" fill="#ef4444" stroke="#dc2626" stroke-width="1.5" />
            <text x="310" y="180" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">-5</text>
            <rect x="356" y="158" width="56" height="40" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="384" y="180" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">6</text>

            <text x="88" y="220" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[0]</text>
            <text x="162" y="220" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[1]</text>
            <text x="236" y="220" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[2]</text>
            <text x="310" y="220" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[3]</text>
            <text x="384" y="220" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[4]</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">diff 与 arr 等长：diff[i] 是 arr[i] 相对 arr[i-1] 的落差（正=上升绿、负=下降红），diff[0]=arr[0] 是起点；把 diff 从头累加就能还原出 arr</figcaption>
        </figure>

        <!-- 🔁 操作：区间加为什么是 O(1) -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">🔁 操作：区间加为什么是 O(1)</h3>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>差分数组核心操作：</strong></p>
          <ol class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span><strong>构建：</strong><code>diff[0] = arr[0]; diff[i] = arr[i] - arr[i-1]</code>（i 从 1 开始）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span><strong>区间加 val：</strong><code>diff[L] += val; diff[R+1] -= val</code> —— 区间里每个元素都 +val，体现在 diff 上只有"起点 +val、终点后一位 -val"</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">3.</span><span><strong>恢复：</strong>对 diff 做前缀和，即得最终数组</span></li>
          </ol>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">① 区间 [1,3] +10：只改 diff 的两个点</p>
            <svg viewBox="0 0 340 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="10" y="18" font-size="11" font-family="monospace" fill="#64748b">朴素要改 3 个元素；差分只改 2 个点</text>
              <!-- 原数组（区间高亮） -->
              <text x="10" y="30" font-size="10" font-family="monospace" fill="#0891b2" font-weight="bold">arr:</text>
              <rect x="34" y="36" width="48" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="58" y="54" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="88" y="36" width="48" height="36" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="112" y="54" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="142" y="36" width="48" height="36" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="166" y="54" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <rect x="196" y="36" width="48" height="36" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="220" y="54" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="250" y="36" width="48" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="274" y="54" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <!-- diff 操作后 -->
              <text x="10" y="106" font-size="10" font-family="monospace" fill="#0891b2" font-weight="bold">diff:</text>
              <rect x="34" y="110" width="48" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="58" y="128" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="88" y="110" width="48" height="36" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="112" y="128" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="142" y="110" width="48" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="166" y="128" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="196" y="110" width="48" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="220" y="128" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">-5</text>
              <rect x="250" y="110" width="48" height="36" rx="6" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
              <text x="274" y="128" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">-4</text>
              <!-- 标注 -->
              <text x="112" y="106" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#d97706">+10</text>
              <text x="274" y="106" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#dc2626">-10</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">对 [1,3] 加 10：只在 diff[1] 记 +10（起点）、diff[4] 记 -10（终点后一位），O(1)</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">② 前缀和还原：一次性得到最终数组</p>
            <svg viewBox="0 0 340 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="df-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <text x="10" y="18" font-size="11" font-family="monospace" fill="#64748b">从左到右累加 diff（前缀和）</text>
              <!-- diff（改后） -->
              <text x="10" y="30" font-size="10" font-family="monospace" fill="#0891b2" font-weight="bold">diff:</text>
              <rect x="34" y="36" width="48" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="58" y="54" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="88" y="36" width="48" height="36" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="112" y="54" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="142" y="36" width="48" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="166" y="54" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="196" y="36" width="48" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="220" y="54" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">-5</text>
              <rect x="250" y="36" width="48" height="36" rx="6" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
              <text x="274" y="54" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">-4</text>
              <!-- 累加箭头 -->
              <line x1="10" y1="84" x2="10" y2="124" stroke="#94a3b8" stroke-width="2" marker-end="url(#df-arr)" />
              <text x="20" y="104" font-size="10" font-family="monospace" fill="#64748b">前缀和</text>
              <!-- arr（还原后，[1..3] 被 +10） -->
              <text x="10" y="130" font-size="10" font-family="monospace" fill="#0891b2" font-weight="bold">arr:</text>
              <rect x="34" y="136" width="48" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="58" y="154" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="88" y="136" width="48" height="36" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="112" y="154" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">13</text>
              <rect x="142" y="136" width="48" height="36" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="166" y="154" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">17</text>
              <rect x="196" y="136" width="48" height="36" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="220" y="154" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">12</text>
              <rect x="250" y="136" width="48" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="274" y="154" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">累加 diff 得 [5, 13, 17, 12, 8] —— 中间三个都 +10 了、两头不变，O(n) 一次收尾</figcaption>
          </figure>
        </div>

        <!-- ⭐ 特点 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">⭐ 特点：记住这 4 点就够了</h3>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">▸</span><span><strong>存的是"变化量"不是"值"：</strong>diff[i] 只关心"比上一个数大/小了多少"，正号=上升、负号=下降，所以数字通常很小</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">▸</span><span><strong>与前缀和互为逆运算：</strong>arr → diff 是差分（相邻相减），diff → arr 是前缀和（累加）。前缀和管"查询"、差分管"更新"，一对搭档</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">▸</span><span><strong>区间更新 O(1)，还原 O(n)：</strong>改一个区间只动 diff 的两个点；但想读出最终数组，必须对 diff 做一遍前缀和</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">▸</span><span><strong>适合"先批量改、最后统一看"：</strong>如果每次改完立刻查某个位置，还原的 O(n) 就白花了 —— 那种"边改边查"的场景要用线段树 / 树状数组</span></li>
          </ul>
        </div>

        <!-- 🎯 用途 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">🎯 用来做什么：典型场景</h3>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>批量区间加减 + 最后一次输出：</strong>反复执行"下标 [L,R] 整体 +k"，最后返回最终数组 —— 把每次 O(区间长度) 降成 O(1)</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>LeetCode 1109 航班预订：</strong>每条预订"第 L..R 天各 +seats"，最后输出每天总座位数 —— 差分数组的教科书题</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>LeetCode 1094 拼车：</strong>乘客在 start 上车（+n）、end 下车（-n），还原后看任意时刻车上人数是否超载</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>区间重叠统计（会议室）：</strong>每个时间段 +1、结束点 -1，还原后任意时刻的峰值 = 同时进行的任务数</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>批量业务调整：</strong>整体加价、批量扣库存、区间温度波动 —— 改差分两头，最后统一结算</span></li>
          </ul>
        </div>

        <div class="mb-4"><Code language="ts" :code="differenceCode" title="difference_array.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          差分数组就像 <strong>React 的 Virtual DOM diff</strong>——不是直接修改整个 DOM 树，而是标记哪些节点发生了变化，最后一次性 patch。<br/>
          也像 <strong>CSS 的 box-shadow spread</strong>——只定义起点和终点，浏览器自动计算中间过渡。<br/>
          还像 <strong>Redux/Event Sourcing</strong>——不存储最终状态，而是存储变化序列，通过 reduce 推出最终状态。</p>
        </aside>
      </section>

      <!-- 4. 二维前缀和 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          二维前缀和 —— 矩阵区域和 O(1) 查询
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          二维前缀和是一维前缀和的自然推广：<strong><code>pre[i][j]</code> 表示从 (0,0) 到 (i-1, j-1) 的矩形区域和。</strong>
          通过容斥原理（加减重叠区域），实现 O(1) 的任意矩形区域查询。
        </p>

        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200 mb-4">
          <p class="text-sm text-cyan-800 mb-2 font-semibold">二维前缀和公式：</p>
          <p class="text-xs text-cyan-700 font-mono leading-relaxed">
            构建: pre[i][j] = pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1] + matrix[i-1][j-1]<br/>
            查询 (r1,c1)~(r2,c2): pre[r2+1][c2+1] - pre[r1][c2+1] - pre[r2+1][c1] + pre[r1][c1]
          </p>
        </div>

        <div class="mb-4"><Code language="ts" :code="twoDCode" title="2d_prefix_sum.ts" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 易错点：</strong>二维前缀和的容斥部分容易写错符号。<br/>
          记忆技巧：<strong>"加两边，减对角"</strong>——pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1]（构建时）<br/>
          查询时同理：<strong>"加主对角，减两个角落"</strong>——+ pre[r1][c1] - pre[r1][c2+1] - pre[r2+1][c1] + 待查项。</p>
        </aside>
      </section>

      <!-- 5. 前缀和 + 哈希表 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          前缀和 + 哈希表 —— 和为 K 的子数组
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          前缀和与哈希表的组合是高频考点。核心公式：<strong>如果 prefix[j] - prefix[i] = K，那么 arr[i..j-1] 的和为 K。</strong>
          用哈希表记录每个前缀和出现的次数，在遍历时查找 <code>prefix[j] - K</code> 是否存在。
        </p>
        <div class="mb-4"><Code language="ts" :code="hashMapCode" title="prefix_sum_with_hashmap.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">LeetCode</th><th class="px-4 py-2 border border-slate-200 font-semibold">题目</th><th class="px-4 py-2 border border-slate-200 font-semibold">难度</th><th class="px-4 py-2 border border-slate-200 font-semibold">关键公式</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">560</td><td class="px-4 py-2 border">Subarray Sum Equals K</td><td class="px-4 py-2 border">Medium</td><td class="px-4 py-2 border font-mono">map[pre-K] 的累加</td></tr>
              <tr><td class="px-4 py-2 border font-mono">523</td><td class="px-4 py-2 border">Continuous Subarray Sum (multiple of K)</td><td class="px-4 py-2 border">Medium</td><td class="px-4 py-2 border font-mono">pre%K 相同的出现位置差 >= 2</td></tr>
              <tr><td class="px-4 py-2 border font-mono">525</td><td class="px-4 py-2 border">Contiguous Array (equal 0 and 1)</td><td class="px-4 py-2 border">Medium</td><td class="px-4 py-2 border font-mono">0→-1, 前缀和相同的最远距离</td></tr>
              <tr><td class="px-4 py-2 border font-mono">974</td><td class="px-4 py-2 border">Subarray Sums Divisible by K</td><td class="px-4 py-2 border">Medium</td><td class="px-4 py-2 border font-mono">pre%K 的计数组合（同余定理）</td></tr>
              <tr><td class="px-4 py-2 border font-mono">1248</td><td class="px-4 py-2 border">Count Nice Subarrays (K odd nums)</td><td class="px-4 py-2 border">Medium</td><td class="px-4 py-2 border font-mono">奇数→1, 偶数→0, 转化为 560</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 6. 实际应用 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          实际应用场景 —— 不只是算法题
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          前缀和/差分在实际工程中有大量应用，以下列举前端开发中可能遇到的场景。
        </p>
        <div class="mb-4"><Code language="ts" :code="applicationsCode" title="real_world_applications.ts" /></div>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>前端中的前缀和/差分应用：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>虚拟滚动</strong> — 前缀和缓存每项的偏移量，O(1) 定位滚动位置对应的 item</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>文本编辑器</strong> — 差分数组实现批量替换/插入的批处理</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Canvas 像素操作</strong> — 二维差分实现区域亮度/对比度调整</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>时间区间重叠</strong> — 差分数组统计任意时刻的重叠区间数（会议室问题）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>数据面板/仪表盘</strong> — 前缀和 O(1) 查询任意日期范围的聚合数据</span></li>
          </ul>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 决策指南：什么时候用前缀和/差分？</strong><br/>
          用前缀和：<strong>多次查询 → 一次预处理。</strong>查询次数 >> n 时，预处理 O(n) + 每次 O(1) 优于每次 O(n)。<br/>
          用差分：<strong>多次区间更新 → 最后一次性还原。</strong>更新次数 >> n 时，差分 O(1)/次 + 还原 O(n) 优于每次 O(n)。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：前缀和区间查询 O(1)
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          上排：原数组。下排：前缀和数组。选择一个<strong>区间 [L, R]</strong>，观察 <code>sum = prefix[R+1] - prefix[L]</code> 的 O(1) 计算。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ psArr.length }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full font-mono" v-if="psL>=0">
            sum[{{ psL }},{{ psR }}] = {{ psSum !== null ? psSum : '?' }}
          </span>
          <span class="bg-green-50 text-green-700 px-2 py-1 rounded-full font-mono" v-if="psL>=0">
            prefix[{{ psR+1 }}]-prefix[{{ psL }}]
          </span>
          <span class="text-slate-400 text-xs ml-auto">⏱️ 预处理 O(n) · 查询 O(1)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="r.action" :disabled="psBusy" v-for="r in psRanges" :key="r.label"
            :class="['px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95', r.cls]">{{ r.label }}</button>
          <button @mousedown="psReset" :disabled="psBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="psBox" class="w-full relative" :style="{height:psH+'px'}">
          <v-stage :config="{width:psW, height:psH}">
            <v-layer>
              <!-- 原数组 -->
              <v-text :config="{x:8,y:6,text:'原数组:',fontSize:11,fill:psC.muted,fontStyle:'bold'}" />
              <v-rect v-for="b in psArr" :key="'a'+b.id" :config="psRect(b)" />
              <v-text v-for="b in psArr" :key="'va'+b.id" :config="psVTxt(b)" />
              <!-- 前缀和数组 -->
              <v-text :config="{x:8,y:130,text:'前缀和:',fontSize:11,fill:psC.cyan,fontStyle:'bold'}" />
              <v-rect v-for="b in psPref" :key="'p'+b.id" :config="psPRect(b)" />
              <v-text v-for="b in psPref" :key="'vp'+b.id" :config="psPV(b)" />
              <!-- 区间高亮 -->
              <v-rect v-if="psL>=0" :config="psHL()" />
              <v-rect v-if="psL>=0" :config="psHL2()" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>前缀和 = 空间换时间：</strong>O(n) 预处理 → 每次区间查询 O(1)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>核心公式：</strong><code>sum(L,R) = prefix[R+1] - prefix[L]</code>（半开区间）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>推广到任何可逆运算：</strong>加法（减法）、乘法（除法）、异或（异或）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>差分数组 = 区间更新的 O(1)：</strong><code>diff[L] += val, diff[R+1] -= val</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>二维前缀和 = 容斥原理</strong>，构建和查询都是 O(1)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>前缀和 + 哈希表：</strong>统计"和为 K 的子数组个数"的标准解法</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>刷题路线：</strong>303 → 304 → 560 → 523 → 974 → 525 → 1109 → 1094</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-1-array/dsa-2-1-3-two-pointer" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：双指针技巧</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-1-singly" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：单向链表 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const psC={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b',text:'#1e293b',muted:'#94a3b8',blue:'#3b82f6'}
const psW=ref(700),psH=ref(310); const psBW=48,psG=7
interface PB { id:number; val:number; color:string; _x?:number; _y?:number; _h?:number }
const psArr=reactive<PB[]>([]),psPref=reactive<PB[]>([])
const psBusy=ref(false),psL=ref(-1),psR=ref(-1),psSum=ref<number|null>(null)
const psBox=ref<HTMLDivElement>()
const d8=(ms:number)=>new Promise(r=>setTimeout(r,ms))
const psRanges=computed(()=>[
  {label:'区间 [0,2]', action:()=>psQueryR(0,2), cls:'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm'},
  {label:'区间 [1,4]', action:()=>psQueryR(1,4), cls:'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm'},
  {label:'区间 [3,5]', action:()=>psQueryR(3,5), cls:'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:shadow-sm'},
])

function psInit(){ psArr.length=0;psPref.length=0; [3,1,4,1,5,9].forEach((v,i)=>psArr.push({id:i+1,val:v,color:psC.cyan}))
  let s=0; psArr.forEach((b,i)=>{ s+=b.val; psPref.push({id:i+1,val:s,color:psC.cyan}) })
  layoutPS(); psL.value=-1;psR.value=-1;psSum.value=null }
function psX(i:number){ const t=psArr.length*(psBW+psG)-psG; return Math.max(10,(psW.value-t)/2)+i*(psBW+psG) }
function layoutPS(){ const t=psArr.length*(psBW+psG)-psG, sx=Math.max(10,(psW.value-t)/2), mv=Math.max(...psArr.map(b=>b.val),1)
  psArr.forEach((b,i)=>{ b._x=sx+i*(psBW+psG); b._h=Math.max(20,(b.val/mv)*60); b._y=80-b._h })
  const mv2=Math.max(...psPref.map(b=>b.val),1)
  psPref.forEach((b,i)=>{ b._x=sx+i*(psBW+psG); b._h=Math.max(20,(b.val/mv2)*60); b._y=210-b._h }) }
function psRect(b:any){ return {x:b._x,y:b._y,width:psBW,height:b._h||20,fill:b.color,cornerRadius:[4,4,0,0],stroke:'#94a3b8',strokeWidth:1,shadowColor:'rgba(0,0,0,.08)',shadowBlur:3} }
function psVTxt(b:any){ return {x:b._x,y:b._y+2,width:psBW,height:(b._h||20)-4,text:String(b.val),fontSize:12,fontFamily:'monospace',fontStyle:'bold',fill:(b._h||20)>28?'#fff':psC.text,align:'center',verticalAlign:'middle'} }
function psPRect(b:any){ return {x:b._x,y:b._y,width:psBW,height:b._h||20,fill:b.color,cornerRadius:[4,4,0,0],stroke:'#06b6d4',strokeWidth:1.5,shadowColor:'rgba(0,0,0,.08)',shadowBlur:3} }
function psPV(b:any){ return {x:b._x,y:b._y+2,width:psBW,height:(b._h||20)-4,text:String(b.val),fontSize:12,fontFamily:'monospace',fontStyle:'bold',fill:psC.cyan,align:'center',verticalAlign:'middle'} }
function psHL(){ const l=psX(psL.value),r=psX(psR.value); return {x:l-2,y:75,width:r-l+psBW+4,height:50,fill:'rgba(245,158,11,.15)',stroke:psC.orange,strokeWidth:2,cornerRadius:6,dash:[4,3]} }
function psHL2(){ const lp=psX(psL.value),rp=psX(psR.value+1); return {x:lp-2,y:205,width:rp-lp+4,height:50,fill:'rgba(6,182,212,.12)',stroke:psC.cyan,strokeWidth:2,cornerRadius:6,dash:[4,3]} }
async function psQueryR(L:number,R:number){ if(psBusy.value)return;psBusy.value=true
  psL.value=L;psR.value=R; await d8(100)
  psSum.value=psArr[psL.value].val; // will compute below
  for(let i=psL.value;i<=psR.value;i++)psArr[i].color=psC.orange
  await d8(500)
  const sum=psPref[R].val-(L>0?psPref[L-1].val:0)
  psSum.value=sum
  // Highlight prefix elements used
  if(L>0)psPref[L-1].color=psC.red
  psPref[R].color=psC.green
  await d8(1500)
  for(let i=psL.value;i<=psR.value;i++)psArr[i].color=psC.cyan
  if(L>0)psPref[L-1].color=psC.cyan; psPref[R].color=psC.cyan
  psSum.value=sum; psBusy.value=false
}
function psReset(){ psBusy.value=false; psInit() }
let roPS:ResizeObserver|null=null
onMounted(()=>{ psInit(); if(psBox.value){ psW.value=psBox.value.clientWidth; layoutPS()
  roPS=new ResizeObserver(e=>{const w=e[0]?.contentRect.width;if(w&&w>200){psW.value=w;layoutPS()}}); roPS.observe(psBox.value) }})
onUnmounted(()=>roPS?.disconnect())

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "前缀和概念" },
  { id: "sec-2", name: "区间查询与变体" },
  { id: "sec-3", name: "差分数组" },
  { id: "sec-4", name: "二维前缀和" },
  { id: "sec-5", name: "前缀和+哈希表" },
  { id: "sec-6", name: "实际应用" },
  { id: "sec-viz", name: "🎬 区间查询动画" },
  { id: "sec-8", name: "小结" },
]

const conceptCode = `// ─── 前缀和的定义与构建 ───
// prefix[i] = arr[0] + arr[1] + ... + arr[i-1]  (前 i 个元素的和)
// prefix[0] = 0  (哨兵，方便处理从头开始的区间)

const arr = [3, 1, 4, 1, 5, 9, 2, 6]
// 索引:     0  1  2  3  4  5  6  7

function buildPrefixSum(arr: number[]): number[] {
    const n = arr.length
    const prefix = new Array(n + 1).fill(0)
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + arr[i]
    }
    return prefix
}
// arr:    [3, 1, 4, 1, 5, 9, 2, 6]
// prefix: [0, 3, 4, 8, 9,14,23,25,31]
// 索引:    0  1  2  3  4  5  6  7  8

// ─── 区间查询：[L, R] 的和 ───
function rangeSum(prefix: number[], L: number, R: number): number {
    // [L, R] 的和 = 前 R+1 个元素的和 - 前 L 个元素的和
    return prefix[R + 1] - prefix[L]
}

const prefix = buildPrefixSum(arr)
console.log(rangeSum(prefix, 2, 4))  // arr[2]+arr[3]+arr[4] = 4+1+5 = 10
// prefix[5] - prefix[2] = 14 - 4 = 10 ✅

console.log(rangeSum(prefix, 0, 3))  // arr[0..3] = 3+1+4+1 = 9
// prefix[4] - prefix[0] = 9 - 0 = 9 ✅

// ─── 可视化对比 ───
// 无前缀和：每次查询 O(n)
//    for (let i = L; i <= R; i++) sum += arr[i]
// 有前缀和：每次查询 O(1)
//    sum = prefix[R+1] - prefix[L]

// 当有 q 次查询时：
// 无优化：O(q × n) — 查询多时不可接受
// 前缀和：O(n + q) — 预处理 O(n) + q × O(1) = O(n + q)`

const variantsCode = `// ─── 变体 1：前缀积 ───
function buildPrefixProduct(arr: number[]): number[] {
    const n = arr.length
    const prefix = new Array(n + 1).fill(1)  // 注意：初始化为 1
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] * arr[i]
    }
    return prefix
}

function rangeProduct(prefix: number[], L: number, R: number): number {
    return prefix[R + 1] / prefix[L]
}

// 示例：
const arr2 = [2, 3, 4, 5]
const preProd = buildPrefixProduct(arr2)
// [1, 2, 6, 24, 120]
console.log(rangeProduct(preProd, 1, 2))  // arr[1]*arr[2] = 3*4 = 12
// prefix[3] / prefix[1] = 24 / 2 = 12 ✅

// ─── 变体 2：前缀异或 ───
function buildPrefixXor(arr: number[]): number[] {
    const n = arr.length
    const prefix = new Array(n + 1).fill(0)
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] ^ arr[i]
    }
    return prefix
}

function rangeXor(prefix: number[], L: number, R: number): number {
    return prefix[R + 1] ^ prefix[L]
}
// 原理：a ^ a = 0, a ^ 0 = a
// prefix[R+1] ^ prefix[L] = (arr[0..R]的异或) ^ (arr[0..L-1]的异或) = arr[L..R]的异或

// ─── 变体 3：LeetCode 238 - 除自身以外数组的乘积 ───
// 用前缀积 + 后缀积，O(n) 时间 O(1) 额外空间（不算输出数组）
function productExceptSelf(nums: number[]): number[] {
    const n = nums.length
    const answer = new Array(n).fill(1)

    // 前缀积（从左到右）
    let prefix = 1
    for (let i = 0; i < n; i++) {
        answer[i] = prefix       // answer[i] = nums[0]×...×nums[i-1]
        prefix *= nums[i]
    }

    // 后缀积（从右到左），同时乘上前缀积
    let suffix = 1
    for (let i = n - 1; i >= 0; i--) {
        answer[i] *= suffix      // answer[i] *= nums[i+1]×...×nums[n-1]
        suffix *= nums[i]
    }

    return answer
}
// 示例: [1,2,3,4] → [24,12,8,6]`

const differenceCode = `// ─── 差分数组的构建 ───
// diff[i] = arr[i] - arr[i-1]  (i>=1), diff[0] = arr[0]

function buildDiff(arr: number[]): number[] {
    const n = arr.length
    const diff = new Array(n).fill(0)
    diff[0] = arr[0]
    for (let i = 1; i < n; i++) {
        diff[i] = arr[i] - arr[i - 1]
    }
    return diff
}

// arr:  [5, 3, 7, 2, 8]
// diff: [5,-2, 4,-5, 6]
// 含义:
//   diff[0]=5  → arr[0]=5（初始值）
//   diff[1]=-2 → arr[1]=arr[0]+(-2)=3
//   diff[2]=4  → arr[2]=arr[1]+4=7
//   以此类推...

// ─── 区间更新：对 [L, R] 区间加 val ───
function rangeAdd(diff: number[], L: number, R: number, val: number): void {
    diff[L] += val       // 从 L 开始，所有元素 +val
    if (R + 1 < diff.length) {
        diff[R + 1] -= val  // 从 R+1 开始，取消 +val 的效果
    }
}
// 可视化：
// 对 [1, 3] 区间加 10：
//   diff[1] += 10  → arr[1..n-1] 都 +10
//   diff[4] -= 10  → arr[4..n-1] 恢复（减去 10）

// ─── 从差分数组恢复原数组 ───
function restoreFromDiff(diff: number[]): number[] {
    const n = diff.length
    const arr = new Array(n).fill(0)
    arr[0] = diff[0]
    for (let i = 1; i < n; i++) {
        arr[i] = arr[i - 1] + diff[i]
    }
    return arr
}

// ─── 完整示例：多次航班预订 ───
// LeetCode 1109: Corporate Flight Bookings
// 输入: bookings = [[1,2,10],[2,3,20],[2,5,25]], n = 5
// 含义: 航班 1-2 预订 10 座, 航班 2-3 预订 20 座, 航班 2-5 预订 25 座

function corpFlightBookings(bookings: number[][], n: number): number[] {
    const diff = new Array(n + 2).fill(0)  // +2 防止 R+1 越界

    for (const [L, R, seats] of bookings) {
        diff[L] += seats      // L 是 1-based，不需要 -1
        diff[R + 1] -= seats
    }

    const answer = new Array(n)
    let cur = 0
    for (let i = 1; i <= n; i++) {
        cur += diff[i]         // 前缀和恢复
        answer[i - 1] = cur
    }
    return answer
}
// 输出: [10, 55, 45, 25, 25]`

const twoDCode = `// ─── 二维前缀和 ───
// LeetCode 304: Range Sum Query 2D - Immutable

class NumMatrix {
    private pre: number[][]
    private rows: number
    private cols: number

    constructor(matrix: number[][]) {
        this.rows = matrix.length
        this.cols = matrix[0].length

        // pre[i][j] = 从 (0,0) 到 (i-1, j-1) 的矩形和
        this.pre = Array.from({ length: this.rows + 1 },
            () => new Array(this.cols + 1).fill(0))

        for (let i = 1; i <= this.rows; i++) {
            for (let j = 1; j <= this.cols; j++) {
                this.pre[i][j] = this.pre[i-1][j]          // + 上方矩形
                               + this.pre[i][j-1]          // + 左方矩形
                               - this.pre[i-1][j-1]        // - 重复计算的对角
                               + matrix[i-1][j-1]          // + 当前元素
            }
        }
    }

    // 查询 (r1,c1) 到 (r2,c2) 的矩形和（0-based）
    sumRegion(r1: number, c1: number, r2: number, c2: number): number {
        return this.pre[r2+1][c2+1]          // 大矩形 (0,0)~(r2,c2)
             - this.pre[r1][c2+1]            // - 上方矩形 (0,0)~(r1-1,c2)
             - this.pre[r2+1][c1]            // - 左方矩形 (0,0)~(r2,c1-1)
             + this.pre[r1][c1]              // + 被减两次的对角 (0,0)~(r1-1,c1-1)
    }
}

// ─── 可视化（3×3 矩阵）───
// matrix:       pre（含哨兵）:
// [1, 2, 3]     [0, 0, 0, 0]
// [4, 5, 6]     [0, 1, 3, 6]
// [7, 8, 9]     [0, 5,12,21]
//               [0,12,27,45]

// 查询 (1,1)~(2,2): 即 [5,6; 8,9] 的和 = 28
// pre[3][3] - pre[1][3] - pre[3][1] + pre[1][1]
//   45     -     6      -    12      +    1     = 28 ✅

// ─── 二维差分（选学）───
// 对矩形 (r1,c1)~(r2,c2) 加 val:
// diff[r1][c1] += val
// diff[r2+1][c1] -= val
// diff[r1][c2+1] -= val
// diff[r2+1][c2+1] += val

// 然后对 diff 做二维前缀和即可恢复最终矩阵`

const hashMapCode = `// ─── LeetCode 560: 和为 K 的子数组个数 ───
// 核心公式: prefix[j] - prefix[i] = K  →  prefix[i] = prefix[j] - K

function subarraySum(nums: number[], k: number): number {
    // map: 前缀和 → 出现次数
    const map = new Map<number, number>()
    map.set(0, 1)  // prefix = 0 出现 1 次（空数组，处理从头开始的子数组）

    let prefix = 0
    let count = 0

    for (const num of nums) {
        prefix += num
        // 查找是否存在 prefix[j] - K，即之前的某个前缀和
        const target = prefix - k
        if (map.has(target)) {
            count += map.get(target)!  // 以当前位置结尾的、和为 K 的子数组个数
        }
        // 记录当前前缀和
        map.set(prefix, (map.get(prefix) || 0) + 1)
    }
    return count
}

// 示例: nums=[1,1,1], k=2
// i=0: prefix=1, target=1-2=-1(不存在), map={0:1, 1:1}, count=0
// i=1: prefix=2, target=2-2=0(存在,1次), map={0:1,1:1,2:1}, count=1
//      → 子数组 [1,1] 和为 2
// i=2: prefix=3, target=3-2=1(存在,1次), map={0:1,1:1,2:1,3:1}, count=2
//      → 子数组 [1,1] (后两个) 和为 2
// 返回 2 ✅

// ─── LeetCode 525: 连续数组（相同数量的 0 和 1）───
function findMaxLength(nums: number[]): number {
    // 把 0 视为 -1，问题转化为"前缀和为 0 的最长子数组"
    const map = new Map<number, number>()
    map.set(0, -1)  // prefix=0 第一次出现在索引 -1

    let prefix = 0
    let maxLen = 0

    for (let i = 0; i < nums.length; i++) {
        prefix += (nums[i] === 0 ? -1 : 1)
        if (map.has(prefix)) {
            maxLen = Math.max(maxLen, i - map.get(prefix)!)
        } else {
            map.set(prefix, i)  // 只记录第一次出现的位置（为了求最长）
        }
    }
    return maxLen
}

// ─── LeetCode 974: 和可被 K 整除的子数组 ───
function subarraysDivByK(nums: number[], k: number): number {
    const map = new Map<number, number>()
    map.set(0, 1)

    let prefix = 0
    let count = 0

    for (const num of nums) {
        prefix += num
        // 注意：JS 中负数取模可能得负数，需要修正
        let mod = ((prefix % k) + k) % k
        if (map.has(mod)) {
            count += map.get(mod)!
        }
        map.set(mod, (map.get(mod) || 0) + 1)
    }
    return count
}
// 核心：如果 prefix[i] % K == prefix[j] % K，那么
// (prefix[j] - prefix[i]) % K == 0 → 子数组和可被 K 整除`

const applicationsCode = `// ─── 应用 1：虚拟滚动（前缀和缓存偏移量）───
// 场景：渲染 10000 条可变高度的列表，计算滚动位置对应的 item index

interface ListItem { id: number; height: number }
const items: ListItem[] = [
    { id: 1, height: 50 },
    { id: 2, height: 80 },
    { id: 3, height: 30 },
    { id: 4, height: 100 },
    // ... 10000 条
]

// 构建前缀和：prefixHeights[i] = 前 i 项的累计高度
const prefixHeights = [0]  // prefix[0] = 0
for (const item of items) {
    prefixHeights.push(prefixHeights[prefixHeights.length - 1] + item.height)
}

// O(log n) 二分查找 vs O(1) 前缀和 + 二分
function findItemAtScroll(scrollTop: number): number {
    // 二分查找 prefixHeights 中第一个 > scrollTop 的位置
    let lo = 0, hi = prefixHeights.length - 1
    while (lo < hi) {
        const mid = (lo + hi) >> 1
        if (prefixHeights[mid] <= scrollTop) {
            lo = mid + 1
        } else {
            hi = mid
        }
    }
    return lo - 1  // 0-based item index
}
// 没有前缀和缓存的话，每次查找都要累加 → O(n) vs O(log n)

// ─── 应用 2：会议室问题（差分数组统计重叠）───
// 给定会议时间区间，求任意时刻最多有多少会议同时进行
// LeetCode 1094: Car Pooling（拼车问题，同样思路）

function minMeetingRooms(intervals: number[][]): number {
    if (intervals.length === 0) return 0

    // 找到最大时间点
    let maxTime = 0
    for (const [start, end] of intervals) {
        maxTime = Math.max(maxTime, end)
    }

    // 差分数组
    const diff = new Array(maxTime + 2).fill(0)
    for (const [start, end] of intervals) {
        diff[start] += 1   // 开始时间增加一个会议室需求
        diff[end] -= 1     // 结束时间减少一个会议室需求
    }

    // 前缀和恢复，找最大值
    let cur = 0, maxRooms = 0
    for (let t = 0; t <= maxTime; t++) {
        cur += diff[t]
        maxRooms = Math.max(maxRooms, cur)
    }
    return maxRooms
}

// ─── 应用 3：数据面板日期范围查询 ───
// 每天的用户活跃数据，需要支持任意日期范围的 SUM/AVG 查询
class DailyMetrics {
    private prefix: number[]

    constructor(dailyValues: number[]) {
        this.prefix = [0]
        for (const v of dailyValues) {
            this.prefix.push(this.prefix[this.prefix.length - 1] + v)
        }
    }

    sumRange(startDay: number, endDay: number): number {
        return this.prefix[endDay + 1] - this.prefix[startDay]
    }

    avgRange(startDay: number, endDay: number): number {
        const count = endDay - startDay + 1
        return this.sumRange(startDay, endDay) / count
    }
}
// 如果前端需要渲染折线图的任意区间数据，前缀和避免了每次从后端重新查询`
</script>
