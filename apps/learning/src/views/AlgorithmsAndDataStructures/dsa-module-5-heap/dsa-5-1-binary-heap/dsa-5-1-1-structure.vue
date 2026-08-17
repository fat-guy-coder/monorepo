<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌳 完全二叉树与数组表示</h1>
          <p class="text-sm text-slate-500 mt-1">用「层序编号」把一棵树无空洞地塞进数组 —— 堆的存储基石</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 5-1-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：一棵树 ↔ 一个数组
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          堆不用指针、不用节点对象，只用<strong>一个数组</strong>就存下整棵完全二叉树。关键在于<strong>层序编号</strong>：
          根是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">0</code>，节点 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i</code> 的左孩子是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">2i+1</code>、右孩子是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">2i+2</code>、父节点是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">(i-1)&gt;&gt;1</code>。
        </p>

        <!-- 结构图：树 ↔ 数组 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 400" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="s1-e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">完全二叉树（层序编号 0..6）←→ 数组 arr[0..6]</text>

            <!-- 树边 -->
            <line x1="360" y1="72" x2="240" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#s1-e)" />
            <line x1="360" y1="72" x2="480" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#s1-e)" />
            <line x1="240" y1="172" x2="144" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#s1-e)" />
            <line x1="240" y1="172" x2="288" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#s1-e)" />
            <line x1="480" y1="172" x2="432" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#s1-e)" />
            <line x1="480" y1="172" x2="576" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#s1-e)" />

            <!-- 下标公式标注 -->
            <text x="288" y="88" font-size="10" font-family="monospace" fill="#f59e0b">left=2·0+1</text>
            <text x="440" y="88" font-size="10" font-family="monospace" fill="#f59e0b">right=2·0+2</text>
            <text x="176" y="148" font-size="10" font-family="monospace" fill="#f59e0b">2·1+1=3</text>
            <text x="318" y="148" font-size="10" font-family="monospace" fill="#f59e0b">2·1+2=4</text>

            <!-- 节点 -->
            <circle cx="360" cy="48" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="42" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <text x="360" y="60" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">[0]</text>
            <circle cx="240" cy="148" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="240" y="142" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <text x="240" y="160" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">[1]</text>
            <circle cx="480" cy="148" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="480" y="142" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <text x="480" y="160" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">[2]</text>
            <circle cx="144" cy="248" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="144" y="242" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <text x="144" y="260" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">[3]</text>
            <circle cx="288" cy="248" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="288" y="242" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
            <text x="288" y="260" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">[4]</text>
            <circle cx="432" cy="248" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="432" y="242" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <text x="432" y="260" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">[5]</text>
            <circle cx="576" cy="248" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="576" y="242" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <text x="576" y="260" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">[6]</text>

            <!-- 虚线映射 -->
            <line x1="480" y1="272" x2="452" y2="306" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#s1-e)" />
            <line x1="576" y1="272" x2="592" y2="306" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#s1-e)" />

            <!-- 数组 -->
            <rect x="152" y="308" width="56" height="38" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <rect x="212" y="308" width="56" height="38" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <rect x="272" y="308" width="56" height="38" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <rect x="332" y="308" width="56" height="38" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <rect x="392" y="308" width="56" height="38" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <rect x="452" y="308" width="56" height="38" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <rect x="512" y="308" width="56" height="38" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="180" y="327" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <text x="240" y="327" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <text x="300" y="327" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <text x="360" y="327" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <text x="420" y="327" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
            <text x="480" y="327" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <text x="540" y="327" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <text x="180" y="362" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">0</text>
            <text x="240" y="362" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">1</text>
            <text x="300" y="362" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">2</text>
            <text x="360" y="362" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">3</text>
            <text x="420" y="362" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">4</text>
            <text x="480" y="362" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">5</text>
            <text x="540" y="362" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">6</text>
            <text x="660" y="330" font-size="11" font-family="monospace" fill="#64748b">arr</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：完全二叉树按层序编号 → 按下标直接填入数组，父子关系由公式计算得出</figcaption>
        </figure>

        <!-- 操作示意图：有空洞 vs 无空洞 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">为什么「完全」这么重要？—— 空洞会让数组稀疏</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="20" font-size="12" font-family="monospace" fill="#ef4444" font-weight="bold">普通二叉树（有空缺）</text>
              <line x1="120" y1="64" x2="70" y2="112" stroke="#94a3b8" stroke-width="2" />
              <line x1="120" y1="64" x2="170" y2="112" stroke="#94a3b8" stroke-width="2" />
              <line x1="170" y1="130" x2="210" y2="130" stroke="#94a3b8" stroke-width="2" />
              <circle cx="120" cy="42" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="120" y="42" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <circle cx="70" cy="128" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="70" y="128" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <circle cx="170" cy="128" r="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="170" y="128" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">null</text>
              <text x="230" y="40" font-size="10" font-family="monospace" fill="#64748b">层序数组：</text>
              <text x="230" y="60" font-size="11" font-family="monospace" fill="#ef4444">[5, 8, null, ...]</text>
              <text x="230" y="80" font-size="10" font-family="monospace" fill="#64748b">中间出现 null 空洞</text>
              <text x="230" y="98" font-size="10" font-family="monospace" fill="#64748b">浪费空间、下标错位</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">图 2a：非完全二叉树有空缺 → 数组中间出现 null 空洞</figcaption>
          </figure>
          <figure>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="20" font-size="12" font-family="monospace" fill="#16a34a" font-weight="bold">完全二叉树（无空洞）</text>
              <line x1="120" y1="64" x2="70" y2="112" stroke="#94a3b8" stroke-width="2" />
              <line x1="120" y1="64" x2="170" y2="112" stroke="#94a3b8" stroke-width="2" />
              <line x1="70" y1="130" x2="30" y2="130" stroke="#94a3b8" stroke-width="2" />
              <line x1="70" y1="130" x2="110" y2="130" stroke="#94a3b8" stroke-width="2" />
              <circle cx="120" cy="42" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="120" y="42" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <circle cx="70" cy="128" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="70" y="128" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <circle cx="170" cy="128" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="170" y="128" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <circle cx="30" cy="128" r="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="30" y="128" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">·</text>
              <circle cx="110" cy="128" r="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="110" y="128" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">·</text>
              <text x="230" y="40" font-size="10" font-family="monospace" fill="#64748b">层序数组：</text>
              <text x="230" y="60" font-size="11" font-family="monospace" fill="#16a34a">[5, 3, 2, ...]</text>
              <text x="230" y="80" font-size="10" font-family="monospace" fill="#64748b">连续无空洞</text>
              <text x="230" y="98" font-size="10" font-family="monospace" fill="#64748b">下标 = 层序编号</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">图 2b：完全二叉树层序编号连续 → 数组紧凑无空洞</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 完全二叉树的性质 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          完全二叉树的性质 —— 「满」与「靠左」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          完全二叉树（Complete Binary Tree）有两个特征，缺一不可：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>除最后一层外，每一层都填满</strong>——第 0 层 1 个、第 1 层 2 个、第 2 层 4 个……呈 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">2^h</code> 增长。</li>
          <li><strong>最后一层靠左填</strong>——最后一层的节点从左到右连续排列，中间不留空位。</li>
        </ol>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">高度 h 的完全二叉树节点数 ∈ [2^h, 2^(h+1) - 1]</p>
          <p class="text-xs text-slate-500 mt-1">所以完全二叉树的高度是 O(log n)，这是堆所有操作 O(log n) 的根源</p>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>完全二叉树「满 + 靠左」这两个约束，恰好让它的<strong>层序编号</strong>变成连续的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">0, 1, 2, …, n-1</code>——这是它能塞进数组的根本原因。</p>
        </aside>
      </section>

      <!-- 2. 数组下标映射 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          数组下标映射 —— 三个公式记住一切
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          堆用数组 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">arr</code> 存储，<strong>下标从 0 开始</strong>，父子关系全部由算术算出：
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center font-mono">
            <div class="bg-white rounded-lg p-3 border border-cyan-100">
              <p class="text-xs text-slate-500">父节点</p>
              <p class="text-lg font-bold text-cyan-700">(i-1) &gt;&gt; 1</p>
            </div>
            <div class="bg-white rounded-lg p-3 border border-cyan-100">
              <p class="text-xs text-slate-500">左孩子</p>
              <p class="text-lg font-bold text-cyan-700">2i + 1</p>
            </div>
            <div class="bg-white rounded-lg p-3 border border-cyan-100">
              <p class="text-xs text-slate-500">右孩子</p>
              <p class="text-lg font-bold text-cyan-700">2i + 2</p>
            </div>
          </div>
          <p class="text-xs text-cyan-600 text-center mt-2">「&gt;&gt; 1」等价于「除以 2 向下取整」，位运算更快</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="parentChildCode" title="index_mapping.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>下标起点混淆</strong>——有些教材/语言用「下标从 1 开始」：父 = <code>i&gt;&gt;1</code>、左 = <code>2i</code>、右 = <code>2i+1</code>。而本模块（和 JS/TS）统一<strong>下标从 0 开始</strong>：父 = <code>(i-1)&gt;&gt;1</code>、左 = <code>2i+1</code>、右 = <code>2i+2</code>。两套公式别混用。<br/>
          ② <strong>误用普通除法</strong>——父节点要用<strong>向下取整</strong>（<code>(i-1)&gt;&gt;1</code> 或 <code>Math.floor((i-1)/2)</code>），写 <code>(i-1)/2</code> 会得到小数下标。
          </p>
        </aside>
      </section>

      <!-- 3. 为什么能这样存 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          为什么能这样存？—— 完全二叉树「无空洞」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          普通二叉树如果用数组存，遇到「某个节点只有右孩子没有左孩子」之类的情况，层序编号就会出现<strong>空号</strong>，
          数组里被迫塞进 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">null</code>，浪费空间还让下标计算错位。
          而完全二叉树的「满 + 靠左」保证了层序编号<strong>连续</strong>，所以能紧凑存储。
        </p>
        <div class="mb-4"><Code language="ts" :code="whyNoHolesCode" title="why_no_holes.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">存储方式</th><th class="px-4 py-2 border border-slate-200 font-semibold">内存</th><th class="px-4 py-2 border border-slate-200 font-semibold">父子定位</th><th class="px-4 py-2 border border-slate-200 font-semibold">适用</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">链式（left/right 指针）</td><td class="px-4 py-2 border">每节点存 2 个指针</td><td class="px-4 py-2 border">跟随指针 O(1)</td><td class="px-4 py-2 border">任意二叉树</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">数组（层序下标）</td><td class="px-4 py-2 border text-emerald-600">只存数据，无指针</td><td class="px-4 py-2 border text-emerald-600">纯算术 O(1)</td><td class="px-4 py-2 border text-emerald-600">完全二叉树（堆）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          用数组存堆，就像 <strong>React 把组件树拍平成扁平化的 Fiber 链表/数组</strong>——树形结构逻辑上还是「树」，但物理存储用连续内存，
          省掉对象指针、利于缓存和遍历。<br/>
          也像 <strong>用一维数组存二维矩阵</strong>（<code>arr[i*n+j]</code>）——靠公式把「二维/树的层级」映射到「一维下标」，本质都是<strong>用下标公式替代指针</strong>。
          </p>
        </aside>
      </section>

      <!-- 4. 代码：数组表示 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          代码：数组表示 + 判满 / 判空
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          用数组表示堆的最小骨架：一个数组 + 父子访问函数 + 判满/判空。这里<strong>还没有</strong>插入/删除的维护逻辑（那是 5-1-2 的 siftUp/siftDown），先把「存储层」搭好。
        </p>
        <div class="mb-4"><Code language="ts" :code="arrayHeapClassCode" title="binary_heap_array.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>堆的数组通常<strong>动态增长</strong>（<code>push</code> 即可），无需固定容量；只有当你用「固定容量数组 + 判满」实现优先级队列时，才需要 <code>isFull()</code>。绝大多数场景只关心 <code>size</code> 和 <code>isEmpty</code>。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：树 ↔ 数组下标映射
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          上面是树（节点标注「值 + [下标]」），下面是数组 <code>arr</code>。点「逐个演示」会依次选中节点 <code>i</code>，用不同颜色标出它的父节点（蓝）、左孩子（绿）、右孩子（紫），并在状态栏写出下标公式。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ tNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doMap" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">🔢 逐个演示下标映射</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="'e'+e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'vt'+n.id" :config="valTextCfg(n)" />
              <v-text v-for="n in tNodes" :key="'it'+n.id" :config="idxTextCfg(n)" />
              <v-rect v-for="b in bars" :key="'b'+b.id" :config="barRectCfg(b)" />
              <v-text v-for="b in bars" :key="'bt'+b.id" :config="barTextCfg(b)" />
              <v-text v-for="b in bars" :key="'bi'+b.id" :config="barIdxCfg(b)" />
              <v-text :config="{x:8, y: ARR_Y+14, text:'arr', fontSize:12, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>完全二叉树：</strong>除最后一层外全满，最后一层靠左 → 层序编号连续无空洞</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下标映射（从 0 开始）：</strong>父 <code>(i-1)&gt;&gt;1</code>、左 <code>2i+1</code>、右 <code>2i+2</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>为什么用数组：</strong>省指针、缓存友好、父子定位 O(1) 纯算术</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>堆的骨架：</strong>一个数组 + <code>parent/left/right</code> + <code>size/isEmpty/isFull</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>坑：</strong>下标从 0 还是 1 开始的两套公式别混用；父节点要向下取整</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下一步：</strong>5-1-2 用这套下标做 siftUp / siftDown，真正维护堆序</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-0-heap-basics/dsa-5-0-1-heap-concept" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：堆的概念与性质</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-1-binary-heap/dsa-5-1-2-sift" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：上浮(siftUp)与下沉(siftDown) →</RouterLink>
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
  { id: "sec-1", name: "完全二叉树的性质" },
  { id: "sec-2", name: "数组下标映射" },
  { id: "sec-3", name: "为什么能这样存" },
  { id: "sec-4", name: "数组表示与判满判空" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-5", name: "小结" },
]

// ===== 🎬 树 ↔ 数组映射动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0' }
const R = 20, LEVEL_H = 82, TOP = 46, ARR_Y = 262, BAR_H = 38
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

interface TNode { id:number; val:number; x:number; y:number; color:string }
interface Bar { id:number; val:number; x:number; y:number; w:number; color:string }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{a:number; b:number}[]>([])
const bars = reactive<Bar[]>([])
const vals = [9, 7, 8, 3, 6, 4, 1]
const tChild: Record<number, {left:number|null; right:number|null}> = {
  0:{left:1,right:2}, 1:{left:3,right:4}, 2:{left:5,right:6},
  3:{left:null,right:null}, 4:{left:null,right:null}, 5:{left:null,right:null}, 6:{left:null,right:null},
}

function layoutTree() {
  tNodes.splice(0); tEdges.splice(0)
  let level = [0], y = TOP
  while (level.length) {
    const gap = W.value / (level.length + 1)
    level.forEach((id, i) => tNodes.push({ id, val: vals[id], x: gap*(i+1), y, color: C.cyan }))
    const next: number[] = []
    level.forEach(id => {
      const ch = tChild[id]
      if (ch.left != null) { tEdges.push({a:id, b:ch.left}); next.push(ch.left) }
      if (ch.right != null) { tEdges.push({a:id, b:ch.right}); next.push(ch.right) }
    })
    level = next; y += LEVEL_H
  }
}

function layoutBars() {
  const n = bars.length
  const w = Math.min(52, Math.floor((W.value - 56) / n - 8))
  const g = 8
  const total = n*w + (n-1)*g
  const sx = Math.max(48, (W.value - total) / 2)
  bars.forEach((b, i) => { b.x = sx + i*(w+g); b.y = ARR_Y; b.w = w })
}

function init() {
  bars.splice(0)
  vals.forEach((v, i) => bars.push({ id: i, val: v, x: 0, y: ARR_Y, w: 0, color: C.cyan }))
  layoutTree()
  layoutBars()
}

function pos(id:number): TNode { return tNodes.find(n => n.id === id)! }
function colorNode(id:number, c:string) { const n = pos(id); if (n) n.color = c }
function colorBar(id:number, c:string) { const b = bars.find(x => x.id === id); if (b) b.color = c }
function allCyan() { tNodes.forEach(n => n.color = C.cyan); bars.forEach(b => b.color = C.cyan) }

function edgeCfg(e:{a:number;b:number}) {
  const pa = pos(e.a), pb = pos(e.b)
  return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke:'#94a3b8', strokeWidth:2 }
}
function circleCfg(n:any) {
  const stroke = n.color === C.cyan ? '#0891b2' : '#1e293b'
  const sw = n.color === C.cyan ? 1.5 : 3
  return { x:n.x, y:n.y, radius:R, fill:n.color, stroke, strokeWidth:sw, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
}
function valTextCfg(n:any) {
  return { x:n.x-R, y:n.y-R-6, width:R*2, height:R*2, text:String(n.val), fontSize:14, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle' }
}
function idxTextCfg(n:any) {
  return { x:n.x-R, y:n.y+R-14, width:R*2, height:14, text:'['+n.id+']', fontSize:8, fontFamily:'monospace', fill:'#cffafe', align:'center', verticalAlign:'middle' }
}
function barRectCfg(b:any) {
  const stroke = b.color === C.cyan ? '#0891b2' : '#1e293b'
  const sw = b.color === C.cyan ? 1 : 2.5
  return { x:b.x, y:b.y, width:b.w, height:BAR_H, fill:b.color, cornerRadius:5, stroke, strokeWidth:sw }
}
function barTextCfg(b:any) {
  return { x:b.x, y:b.y, width:b.w, height:BAR_H, text:String(b.val), fontSize:14, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle' }
}
function barIdxCfg(b:any) {
  return { x:b.x, y:b.y+BAR_H+4, width:b.w, text:String(b.id), fontSize:10, fontFamily:'monospace', fill:C.muted, align:'center' }
}

async function act(msg:string, label:string, fn:() => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

function doMap() {
  act('下标映射演示', 'parent/left/right', async () => {
    allCyan()
    const n = vals.length
    for (let i = 0; i < n; i++) {
      colorNode(i, C.orange); colorBar(i, C.orange)
      const p = (i-1)>>1, l = 2*i+1, r = 2*i+2
      let msg = `i=${i}：`
      if (i > 0) { colorNode(p, C.blue); colorBar(p, C.blue); msg += `父=(${i}-1)>>1=${p}  ` }
      if (l < n) { colorNode(l, C.green); colorBar(l, C.green); msg += `左=2·${i}+1=${l}  ` }
      if (r < n) { colorNode(r, C.violet); colorBar(r, C.violet); msg += `右=2·${i}+2=${r}` }
      status.value = msg
      await d(1050)
      allCyan()
    }
    status.value = '演示完成：父子定位全靠下标算术，O(1)'
  })
}

function doReset() { allCyan(); status.value = ''; opLabel.value = '' }

let ro: ResizeObserver|null = null
onMounted(() => {
  init()
  if (box.value) {
    W.value = box.value.clientWidth
    layoutTree(); layoutBars()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layoutTree(); layoutBars() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const parentChildCode = `// ===== 完全二叉树 → 数组下标映射（下标从 0 开始）=====
// 数组 arr[0..n-1] 存一棵完全二叉树：
//   节点 i 的左孩子：  2i + 1
//   节点 i 的右孩子：  2i + 2
//   节点 i 的父节点：  (i - 1) >> 1   // 等价 Math.floor((i-1)/2)
//   根节点下标：      0（没有父节点）

function parent(i: number): number {
    return (i - 1) >> 1     // i=0 时得 -1，表示无父节点
}
function left(i: number): number {
    return 2 * i + 1
}
function right(i: number): number {
    return 2 * i + 2
}

// 手动验证（对应结构图那棵大顶堆）：
const heap = [9, 7, 8, 3, 6, 4, 1]
// i=1 的左孩子 = 2*1+1 = 3 → heap[3]=3
// i=1 的右孩子 = 2*1+2 = 4 → heap[4]=6
// i=4 的父节点 = (4-1)>>1 = 1 → heap[1]=7
console.log(heap[left(1)])    // 3
console.log(heap[right(1)])   // 6
console.log(heap[parent(4)])  // 7
// 输出:
// 3
// 6
// 7`

const whyNoHolesCode = `// ===== 为什么完全二叉树能「无空洞」塞进数组？ =====
// 普通二叉树可能有「空洞」（某层跳号），数组会浪费大量空位；
// 完全二叉树按「层序」编号时，编号是连续的 0,1,2,...,n-1。
//
// 层序编号规则：
//   根 = 0；左孩子 = 2i+1；右孩子 = 2i+2
// 因为「除最后一层外全满、最后一层靠左」，层序编号天然连续，没有空号。
//
// 反例：一棵「左子树空、右子树有节点」的树，用数组存会这样：
//        [5, null, 8, null, null, 7, ...]   ← 大量 null 空洞
// 而完全二叉树永远是：
//        [9, 7, 8, 3, 6, 4, 1]              ← 连续无空洞

// 好处总结：
// 1) 省内存：没有 left/right 指针
// 2) 缓存友好：元素在内存中连续，遍历快
// 3) 父子定位 O(1)：纯算术，不需要跟随指针`

const arrayHeapClassCode = `// ===== 用数组表示堆：没有指针、没有节点对象 =====
class BinaryHeap {
    private data: number[] = []                     // 数据就存在数组里

    get size(): number { return this.data.length }  // 堆大小 = 数组长度
    isEmpty(): boolean { return this.data.length === 0 }
    isFull(): boolean { return this.data.length >= this.capacity }

    constructor(private capacity = Infinity) {}     // 动态数组默认不设容量上限

    // 父子访问：直接算下标，不需要任何指针/引用
    private parent(i: number): number { return (i - 1) >> 1 }
    private left(i: number): number   { return 2 * i + 1 }
    private right(i: number): number  { return 2 * i + 2 }

    // 堆顶 = arr[0]，O(1)
    peek(): number | undefined { return this.data[0] }
}

// 对比：链式二叉树需要每个节点存 left/right 指针（对象 + 引用），
// 堆只需要一个数组，省掉所有指针开销、缓存也更友好。
// 下一步（5-1-2）会在 push/pop 里用 parent/left/right 做 siftUp/siftDown。`
</script>
