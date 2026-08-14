<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔢 树状数组(BIT)：单点更新 / 区间查询</h1>
          <p class="text-sm text-slate-500 mt-1">一个 lowbit 技巧撑起的「前缀和神器」—— 更新与查询都是 O(log n)</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-5-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：树状数组的「覆盖范围」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          树状数组（Fenwick Tree / Binary Indexed Tree）用一个数组 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">tree</code> 存「前缀和的分段」：
          每个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">tree[i]</code> 管辖一段长度为 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">lowbit(i)</code> 的区间
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[i-lowbit(i)+1, i]</code>。下图的节点编号就是下标 i，节点存的是它覆盖区间的和。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 380" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="fw-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">数组 [1,3,5,7,9,11,13,15] 的树状数组 —— 节点 i 管辖 [i-lowbit(i)+1, i]</text>

            <!-- 边（父 → 子，向下） -->
            <line x1="360" y1="70" x2="170" y2="106" stroke="#94a3b8" stroke-width="2" marker-end="url(#fw-arr)" />
            <line x1="360" y1="70" x2="420" y2="106" stroke="#94a3b8" stroke-width="2" marker-end="url(#fw-arr)" />
            <line x1="360" y1="70" x2="560" y2="106" stroke="#94a3b8" stroke-width="2" marker-end="url(#fw-arr)" />
            <line x1="170" y1="158" x2="90" y2="194" stroke="#94a3b8" stroke-width="2" marker-end="url(#fw-arr)" />
            <line x1="170" y1="158" x2="260" y2="194" stroke="#94a3b8" stroke-width="2" marker-end="url(#fw-arr)" />
            <line x1="90" y1="246" x2="90" y2="282" stroke="#94a3b8" stroke-width="2" marker-end="url(#fw-arr)" />
            <line x1="420" y1="158" x2="420" y2="194" stroke="#94a3b8" stroke-width="2" marker-end="url(#fw-arr)" />

            <!-- 节点（圆 = 下标 i） -->
            <circle cx="360" cy="44" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="44" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <text x="360" y="80" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">16 · [1,8]</text>

            <circle cx="170" cy="132" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="170" y="132" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <text x="170" y="168" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">16 · [1,4]</text>

            <circle cx="420" cy="132" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="420" y="132" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
            <text x="420" y="168" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">20 · [5,6]</text>

            <circle cx="560" cy="132" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="560" y="132" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <text x="560" y="168" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">13 · [7,7]</text>

            <circle cx="90" cy="220" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="90" y="220" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <text x="90" y="256" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">4 · [1,2]</text>

            <circle cx="260" cy="220" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="260" y="220" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <text x="260" y="256" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">5 · [3,3]</text>

            <circle cx="420" cy="220" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="420" y="220" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <text x="420" y="256" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">9 · [5,5]</text>

            <circle cx="90" cy="308" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="90" y="308" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <text x="90" y="344" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">1 · [1,1]</text>

            <text x="16" y="372" font-size="11" font-family="monospace" fill="#64748b">更新向上跳 lowbit（3→4→8）；查询向下跳 lowbit（6→4→0）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：树状数组结构 —— 每个节点存一段区间和，节点编号 = 下标，覆盖范围由 lowbit 决定</figcaption>
        </figure>

        <!-- 操作示意图：更新 vs 查询 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：单点更新 arr[3]+=2（向上跳） 与 前缀和查询 prefix(6)（向下跳）</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">查询 prefix(6)：向下跳 lowbit，累加不重叠的区间</p>
            <svg viewBox="0 0 340 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="fw-q" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
              </defs>
              <line x1="90" y1="66" x2="90" y2="98" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#fw-q)" />
              <circle cx="90" cy="44" r="22" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="90" y="44" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
              <text x="120" y="44" text-anchor="start" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">tree[6]=20 · [5,6]</text>
              <circle cx="90" cy="122" r="22" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="90" y="122" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <text x="120" y="122" text-anchor="start" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">tree[4]=16 · [1,4]</text>
              <text x="16" y="170" font-size="11" font-family="monospace" fill="#16a34a">6→4→0：20 + 16 = 36 = sum(1..6)</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">前缀和 = 沿「i -= lowbit(i)」累加不重叠区间</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">更新 arr[3]+=2：向上跳 lowbit，更新覆盖 3 的节点</p>
            <svg viewBox="0 0 340 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="fw-u" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a" />
                </marker>
              </defs>
              <line x1="220" y1="154" x2="220" y2="116" stroke="#16a34a" stroke-width="2.5" marker-end="url(#fw-u)" />
              <line x1="220" y1="86" x2="220" y2="48" stroke="#16a34a" stroke-width="2.5" marker-end="url(#fw-u)" />
              <circle cx="220" cy="170" r="22" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="220" y="170" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
              <circle cx="220" cy="100" r="22" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="220" y="100" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">4</text>
              <circle cx="220" cy="32" r="22" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="220" y="32" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
              <text x="16" y="184" font-size="11" font-family="monospace" fill="#16a34a">3→4→8：tree[3]+2, tree[4]+2, tree[8]+2</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">更新沿「i += lowbit(i)」把所有覆盖 3 的节点都 +delta</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. lowbit -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          lowbit 技巧 —— 为什么 x & -x 能「跳」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          树状数组的全部魔法都藏在一个位运算里：<strong><code>x &amp; -x</code></strong>，它取出 x 二进制里<strong>最低位的 1</strong>。
          负数用<strong>补码</strong>表示（<code>-x = ~x + 1</code>），所以 <code>x &amp; -x</code> 恰好保留「最低位 1 及其后的 0」。
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">tree[i] 管辖的区间 = [i - lowbit(i) + 1, i]，长度 = lowbit(i)</p>
          <p class="text-xs text-cyan-600 text-center">lowbit 是 2 的幂，所以每个下标 i 恰好被「log n 个节点」覆盖，这就是 O(log n) 的来源</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="lowbitCode" title="lowbit.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          树状数组 ≈ 前端做<strong>「区间统计缓存」</strong>时的<strong>分段前缀和</strong>。<br/>
          就像把 1 天的数据按 <strong>「小时 / 半天 / 全天」</strong>三档预聚合，查「今天累计」时直接读全天档、再补几个小时档即可，不用从头加。<br/>
          lowbit 就是那个「决定每个缓存桶管多大范围」的规则——桶大小是 1、2、4、8 这样的 2 的幂，恰好能让「更新」和「查询」都只碰 O(log n) 个桶。
          </p>
        </aside>
      </section>

      <!-- 2. 单点更新 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          单点更新 update —— 向上跳 lowbit
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          修改 <code>arr[i]</code> 时，所有<strong>覆盖了 i 的节点</strong>都要跟着改。这些节点怎么找？
          从 i 开始，<strong>不断加 lowbit(i)</strong> 往上跳：<code>i += lowbit(i)</code>。
          因为每个节点都被它「头顶」的若干祖先覆盖，这个跳法恰好遍历了整条覆盖链。
        </p>
        <div class="mb-4"><Code language="ts" :code="bitCode" title="fenwick.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 直觉：</strong>lowbit 越大，节点「管得越宽」。所以更新一个点，只会碰到「管得宽且覆盖它」的少量祖先——下标每次至少翻倍（+lowbit），最多跳 O(log n) 次。</p>
        </aside>
      </section>

      <!-- 3. 前缀和查询 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          前缀和查询 query —— 向下跳 lowbit
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          查询 <code>sum(1..i)</code> 时，用<strong>「不重叠的区间」拼出整个前缀</strong>：从 i 开始，
          累加 <code>tree[i]</code>，然后<strong>减去 lowbit(i)</strong> 跳到下一个不重叠的区间，直到 i 归 0。
        </p>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">sum(1..i) = tree[i] + tree[i-lowbit(i)] + tree[i-lowbit(i)-lowbit(...)] ...</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="appCode" title="fenwick_applications.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 区间和：</strong>任意区间 <code>[l, r]</code> 的和 = <code>sum(r) - sum(l-1)</code>，两次前缀和相减即可。树状数组本身只能算「前缀和」，但配合相减就覆盖了所有区间和需求。</p>
        </aside>
      </section>

      <!-- 4. 对比与陷阱 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          对比线段树 与 常见错误
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">对比项</th><th class="px-4 py-2 border border-slate-200 font-semibold">树状数组 BIT</th><th class="px-4 py-2 border border-slate-200 font-semibold">线段树 Segment Tree</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">代码量</td><td class="px-4 py-2 border font-mono text-emerald-600">极短（~10 行）</td><td class="px-4 py-2 border font-mono text-amber-600">较长（~50 行）</td></tr>
              <tr><td class="px-4 py-2 border">单点更新 / 前缀和</td><td class="px-4 py-2 border font-mono text-emerald-600">O(log n)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(log n)</td></tr>
              <tr><td class="px-4 py-2 border">区间最值</td><td class="px-4 py-2 border font-mono text-red-600">❌ 不支持（只能前缀和）</td><td class="px-4 py-2 border font-mono text-emerald-600">✅ 支持</td></tr>
              <tr><td class="px-4 py-2 border">区间修改（懒标记）</td><td class="px-4 py-2 border font-mono text-amber-600">需差分变形</td><td class="px-4 py-2 border font-mono text-emerald-600">✅ 原生支持</td></tr>
              <tr><td class="px-4 py-2 border">空间</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n)</td><td class="px-4 py-2 border font-mono text-amber-600">O(4n)</td></tr>
              <tr><td class="px-4 py-2 border">适用</td><td class="px-4 py-2 border">前缀和、逆序对、离散化统计</td><td class="px-4 py-2 border">任意区间聚合 + 区间修改</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 1：下标从 0 开始</strong><br/>
          lowbit 依赖「<code>i &amp; -i</code>」的二进制性质，<strong>下标必须从 1 开始</strong>（0 的 lowbit 是 0，会死循环）。
          所以建树时把数组统一后移一格：<code>arr[0]</code> 留空，第 k 个元素对应下标 <code>k+1</code>。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 2：更新/查询的跳方向搞反</strong><br/>
          <strong>更新向上</strong>（<code>i += lowbit(i)</code>），<strong>查询向下</strong>（<code>i -= lowbit(i)</code>）。
          写反了会漏节点或重复累加。口诀：<strong>「改上加、查下减」</strong>。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 3：把树状数组当线段树用</strong><br/>
          BIT 只支持<strong>可减</strong>的聚合（前缀和相减），不支持区间最值。需要「区间最大值 + 区间修改」时，老实上线段树，别硬套 BIT。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：单点更新（向上跳） 与 前缀和查询（向下跳）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          绿 = 被更新/累加的节点，橙 = 当前正在处理的节点。观察更新沿「向上 +lowbit」、查询沿「向下 -lowbit」的路径。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 数组长度: {{ N }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🌳 节点数: {{ fnodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status || '试试更新或查询' }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <span class="text-xs text-slate-500">更新 idx</span>
          <input v-model.number="upIdx" type="number" min="1" :max="N" class="w-14 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-shadow" />
          <span class="text-xs text-slate-500">+=</span>
          <input v-model.number="upDelta" type="number" class="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-shadow" />
          <button @mousedown="doUpdate" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:border-green-300 hover:shadow-sm">✏️ 更新</button>
          <span class="text-xs text-slate-500 ml-2">查询 prefix(</span>
          <input v-model.number="qIdx" type="number" min="1" :max="N" class="w-14 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition-shadow" />
          <span class="text-xs text-slate-500">)</span>
          <button @mousedown="doQuery" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm">🔍 查询</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in fEdges" :key="'e'+e.a+'-'+e.b" :config="fEdgeCfg(e)" />
              <v-circle v-for="n in fnodes" :key="'c'+n.id" :config="fCircleCfg(n)" />
              <v-text v-for="n in fnodes" :key="'t'+n.id" :config="fValCfg(n)" />
              <v-text v-for="n in fnodes" :key="'l'+n.id" :config="fLabelCfg(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>核心是 lowbit</strong>：<code>x &amp; -x</code> 取最低位 1，决定 tree[i] 管辖的区间长度</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>更新向上跳</strong>：<code>i += lowbit(i)</code>，更新覆盖 i 的所有祖先，O(log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>查询向下跳</strong>：<code>i -= lowbit(i)</code>，累加不重叠区间拼出前缀和，O(log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>区间和</strong> = 两次前缀和相减 <code>sum(r) - sum(l-1)</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>vs 线段树</strong>：BIT 更简单、代码短、空间 O(n)，但只能做前缀和；线段树能做区间最值/区间修改</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下标从 1 开始</strong>：0 的 lowbit 是 0 会死循环，这是最容易踩的坑</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-5-advanced-tree/dsa-4-5-2-segment" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：线段树</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-5-advanced-tree/dsa-4-5-4-union-find" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：并查集 →</RouterLink>
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
  { id: "sec-1", name: "lowbit 技巧" },
  { id: "sec-2", name: "单点更新" },
  { id: "sec-3", name: "前缀和查询" },
  { id: "sec-4", name: "对比线段树与陷阱" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-5", name: "小结" },
]

// ===== 🎬 BIT 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const N = 8
const R = 24
const H = ref(360), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const upIdx = ref(3), upDelta = ref(2), qIdx = ref(6)
const box = ref<HTMLDivElement>()

const ARR = [0, 1, 3, 5, 7, 9, 11, 13, 15]  // 下标从 1 开始，ARR[0] 留空
const tree = reactive<number[]>([...ARR])
interface FNode { id: number; x: number; y: number; color: string; s: number }
const fnodes = reactive<FNode[]>([])
const fEdges = reactive<{ a: number; b: number }[]>([])

const d = (ms: number) => new Promise(r => setTimeout(r, ms))
function lowbit(x: number) { return x & -x }

// 节点坐标（x 用比例，y 固定层高）
const POS: Record<number, { fx: number; y: number }> = {
  8: { fx: 0.5, y: 44 },
  4: { fx: 0.24, y: 132 }, 6: { fx: 0.58, y: 132 }, 7: { fx: 0.78, y: 132 },
  2: { fx: 0.13, y: 220 }, 3: { fx: 0.36, y: 220 }, 5: { fx: 0.58, y: 220 },
  1: { fx: 0.13, y: 308 },
}
const EDGES: [number, number][] = [[8, 4], [8, 6], [8, 7], [4, 2], [4, 3], [2, 1], [6, 5]]

function layout() {
  fnodes.length = 0; fEdges.length = 0
  for (const [a, b] of EDGES) fEdges.push({ a, b })
  for (const k of Object.keys(POS)) {
    const id = +k
    fnodes.push({ id, x: POS[id].fx * W.value, y: POS[id].y, color: C.cyan, s: 1 })
  }
}
function pos(id: number): FNode { return fnodes.find(n => n.id === id)! }
function rangeOf(i: number) { return `[${i - lowbit(i) + 1},${i}]` }
function fEdgeCfg(e: { a: number; b: number }) {
  const a = pos(e.a), b = pos(e.b)
  return { points: [a.x, a.y + R, b.x, b.y - R], stroke: '#94a3b8', strokeWidth: 2 }
}
function fCircleCfg(n: FNode) {
  return { x: n.x, y: n.y, radius: R * n.s, fill: n.color, stroke: n.color === C.orange ? '#d97706' : '#64748b', strokeWidth: n.color === C.orange ? 3 : 1.5, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function fValCfg(n: FNode) {
  return { x: n.x - R, y: n.y - R, width: R * 2, height: R * 2, text: String(tree[n.id]), fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: n.color === C.green ? C.text : '#fff', align: 'center', verticalAlign: 'middle', scale: { x: n.s, y: n.s } }
}
function fLabelCfg(n: FNode) {
  return { x: n.x - 40, y: n.y + R + 4, width: 80, text: `${n.id} ${rangeOf(n.id)}`, fontSize: 9, fontFamily: 'monospace', fill: C.muted, align: 'center' }
}

function resetColors() { for (const n of fnodes) n.color = C.cyan }

async function doUpdate() {
  if (busy.value) return
  const i = upIdx.value, delta = upDelta.value
  if (isNaN(i) || isNaN(delta) || i < 1 || i > N) { status.value = '更新参数无效（idx 需在 1..8）'; return }
  busy.value = true; opLabel.value = '更新 O(log n)'; resetColors()
  try {
    let x = i
    const path: number[] = []
    while (x <= N) {
      const n = pos(x)
      n.color = C.orange; status.value = `更新 tree[${x}]（覆盖 [${x - lowbit(x) + 1},${x}]）+= ${delta}`; await d(400)
      tree[x] += delta
      path.push(x)
      n.color = C.green; await d(250)
      x += lowbit(x)
    }
    status.value = `✅ 更新 arr[${i}]+=${delta}，受影响节点: ${path.join(' → ')}`
  } finally {
    await d(400); busy.value = false; opLabel.value = ''
  }
}

async function doQuery() {
  if (busy.value) return
  const i = qIdx.value
  if (isNaN(i) || i < 1 || i > N) { status.value = '查询参数无效（idx 需在 1..8）'; return }
  busy.value = true; opLabel.value = '查询 O(log n)'; resetColors()
  try {
    let sum = 0, x = i
    const path: number[] = []
    while (x > 0) {
      const n = pos(x)
      n.color = C.orange; status.value = `累加 tree[${x}] = ${tree[x]}（覆盖 [${x - lowbit(x) + 1},${x}]）`; await d(400)
      sum += tree[x]
      path.push(x)
      n.color = C.green; await d(250)
      x -= lowbit(x)
    }
    status.value = `✅ 前缀和 prefix(${i}) = ${sum}，累加节点: ${path.join(' + ')}`
  } finally {
    await d(400); busy.value = false; opLabel.value = ''
  }
}

function doReset() {
  tree.length = 0; tree.push(...ARR)
  resetColors(); status.value = ''; opLabel.value = ''
}

let ro: ResizeObserver | null = null
onMounted(() => {
  layout()
  if (box.value) {
    W.value = box.value.clientWidth
    layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 200) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const lowbitCode = `// ===== lowbit：取二进制最低位的 1 =====
// x & -x 是树状数组的灵魂操作。
// 负数用补码表示：-x = ~x + 1
// 所以 x & -x = x 的最低位的 1 及其后的 0

function lowbit(x: number): number {
    return x & -x
}

// 例子（8 位二进制）：
//   6  = 00000110
//  -6  = 11111010   （补码）
//  6 & -6 = 00000010 = 2  ← 最低位 1 的权重
//
// 对应到树状数组：
//   tree[i] 覆盖 [i - lowbit(i) + 1, i]，长度 = lowbit(i)
//   tree[6] 覆盖 [5,6]，长度 2
//   tree[4] 覆盖 [1,4]，长度 4

for (let i = 1; i <= 8; i++) {
    console.log('lowbit(' + i + ') =', lowbit(i))
}
// 输出:
// lowbit(1) = 1
// lowbit(2) = 2
// lowbit(3) = 1
// lowbit(4) = 4
// lowbit(5) = 1
// lowbit(6) = 2
// lowbit(7) = 1
// lowbit(8) = 8
// 规律：lowbit(i) 是 2 的幂，等于 i 的「管辖长度」`

const bitCode = `// ===== 树状数组：单点更新 + 前缀和查询 =====
class BIT {
    private tree: number[]
    private n: number

    constructor(arr: number[]) {
        // 下标从 1 开始，arr[0] 留空，方便位运算
        this.n = arr.length
        this.tree = new Array(this.n + 1).fill(0)
        for (let i = 0; i < this.n; i++) {
            this.add(i + 1, arr[i])   // O(n log n) 建树
        }
    }

    private static lowbit(x: number): number { return x & -x }

    // 单点更新：arr[i] += delta，沿「向上跳 lowbit」更新所有覆盖 i 的节点
    add(i: number, delta: number): void {
        while (i <= this.n) {
            this.tree[i] += delta
            i += BIT.lowbit(i)   // 跳到覆盖自己的下一个祖先
        }
    }

    // 前缀和：sum(1..i)，沿「向下跳 lowbit」累加不重叠区间
    sum(i: number): number {
        let s = 0
        while (i > 0) {
            s += this.tree[i]
            i -= BIT.lowbit(i)   // 跳到下一个不重叠区间
        }
        return s
    }

    // 区间和 [l, r] = 前缀和之差
    rangeSum(l: number, r: number): number {
        return this.sum(r) - this.sum(l - 1)
    }
}

const bit = new BIT([1, 3, 5, 7, 9, 11, 13, 15])
console.log(bit.sum(6))           // 前缀和 1..6 = 1+3+5+7+9+11 = 36
console.log(bit.rangeSum(2, 5))   // 3+5+7+9 = 24
bit.add(3, 2)                     // arr[3] 5 -> 7
console.log(bit.rangeSum(2, 5))   // 3+7+7+9 = 26

// 手动模拟 sum(6)：向下跳 lowbit
// 6 累加 tree[6]([5,6]) → 6-2=4
// 4 累加 tree[4]([1,4]) → 4-4=0 停
// 结果 tree[6]+tree[4] = 20+16 = 36 ✓

// 手动模拟 add(3,2)：向上跳 lowbit
// 3 更新 tree[3]([3,3]) → 3+1=4
// 4 更新 tree[4]([1,4]) → 4+4=8
// 8 更新 tree[8]([1,8]) → 8+8=16 停
// 恰好是「覆盖了 3」的所有节点：3, 4, 8`

const appCode = `// ===== 应用 1：求逆序对（统计左边比当前大的个数）=====
// 逆序对：i < j 但 arr[i] > arr[j] 的数对个数
function countInversions(arr: number[]): number {
    const sorted = [...new Set(arr)].sort((a, b) => a - b)   // 离散化
    const rank = (v: number) => sorted.indexOf(v) + 1
    const bit = new BIT(new Array(sorted.length).fill(0))
    let count = 0
    for (let i = arr.length - 1; i >= 0; i--) {
        const r = rank(arr[i])
        count += bit.sum(r - 1)     // 已处理过的、比 arr[i] 小的个数
        bit.add(r, 1)               // 标记 arr[i] 出现
    }
    return count
}
console.log(countInversions([3, 1, 2]))  // 输出: 2  (3>1, 3>2)

// ===== 应用 2：区间更新 + 单点查询（差分数组 + BIT）=====
// 对 [l, r] 每个元素都 +v：diff[l] += v, diff[r+1] -= v
// 查询单点 arr[i] = 前缀和 diff(1..i)
// 「区间加、单点查」复用同一个 BIT，只是语义从「前缀和」变成「差分」
class RangeAddBIT {
    private bit: BIT
    constructor(n: number) { this.bit = new BIT(new Array(n).fill(0)) }
    rangeAdd(l: number, r: number, v: number) {
        this.bit.add(l, v)
        this.bit.add(r + 1, -v)
    }
    pointQuery(i: number) { return this.bit.sum(i) }
}
// 这是「前缀和」技巧的逆用：差分把「区间修改」降级成「两个单点修改」`
</script>
