<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">⚙️ 建堆 O(n) 算法与堆排序</h1>
          <p class="text-sm text-slate-500 mt-1">自底向上 heapify 把建堆从 O(n log n) 降到 O(n)，堆排序原地 O(n log n)</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 5-1-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：从「杂乱数组」到「大顶堆」，再到「有序数组」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          建堆有两种方式：<strong>① 逐个插入（O(n log n)）</strong>；<strong>② 自底向上 heapify（O(n)）</strong>——从最后一个非叶节点 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">(n&gt;&gt;1)-1</code> 开始逐个 siftDown。
          而<strong>堆排序</strong> = 建堆 + 反复「取堆顶（与末尾交换）+ siftDown」，最终原地得到有序数组。
        </p>

        <!-- heapify 示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">自底向上 heapify：从最后一个非叶节点逐个 siftDown</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <figure>
            <svg viewBox="0 0 360 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">建堆前：普通数组</text>
              <line x1="180" y1="64" x2="95" y2="142" stroke="#94a3b8" stroke-width="2" />
              <line x1="180" y1="64" x2="265" y2="142" stroke="#94a3b8" stroke-width="2" />
              <line x1="95" y1="142" x2="50" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="95" y1="142" x2="140" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="265" y1="142" x2="230" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="265" y1="142" x2="320" y2="220" stroke="#94a3b8" stroke-width="2" />
              <circle cx="180" cy="40" r="18" fill="#ef4444" stroke="#b91c1c" stroke-width="2.5" />
              <text x="180" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <circle cx="95" cy="142" r="18" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
              <text x="95" y="142" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">10</text>
              <circle cx="265" cy="142" r="18" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
              <text x="265" y="142" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <circle cx="50" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="50" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <circle cx="140" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="140" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <circle cx="230" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="230" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <circle cx="320" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="320" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <text x="16" y="242" font-size="10" font-family="monospace" fill="#64748b">[4,10,3,5,1,8,2] 不是堆</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">建堆前：根 4 违反堆序，需要逐个 siftDown 非叶节点 [2][1][0]</figcaption>
          </figure>
          <figure>
            <svg viewBox="0 0 360 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="20" font-size="12" font-family="monospace" fill="#16a34a" font-weight="bold">建堆后：大顶堆</text>
              <line x1="180" y1="64" x2="95" y2="142" stroke="#94a3b8" stroke-width="2" />
              <line x1="180" y1="64" x2="265" y2="142" stroke="#94a3b8" stroke-width="2" />
              <line x1="95" y1="142" x2="50" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="95" y1="142" x2="140" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="265" y1="142" x2="230" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="265" y1="142" x2="320" y2="220" stroke="#94a3b8" stroke-width="2" />
              <circle cx="180" cy="40" r="18" fill="#4ade80" stroke="#f59e0b" stroke-width="3" />
              <text x="180" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">10</text>
              <circle cx="95" cy="142" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="95" y="142" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <circle cx="265" cy="142" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="265" y="142" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <circle cx="50" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="50" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <circle cx="140" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="140" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <circle cx="230" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="230" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <circle cx="320" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="320" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <text x="16" y="242" font-size="10" font-family="monospace" fill="#16a34a">[10,5,8,4,1,3,2] 大顶堆</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">建堆后：堆顶 = 10（最大），每个父 ≥ 子</figcaption>
          </figure>
        </div>

        <!-- 堆排序示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">堆排序：反复「取堆顶 + siftDown」，输出序列逐步生成</h3>
        <figure>
          <svg viewBox="0 0 720 270" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="h1-e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">第 1 步：堆顶 10 与末尾 2 交换 → 10 进入「已排序区」（绿色）</text>
            <line x1="180" y1="72" x2="95" y2="150" stroke="#94a3b8" stroke-width="2" />
            <line x1="180" y1="72" x2="265" y2="150" stroke="#94a3b8" stroke-width="2" />
            <line x1="95" y1="150" x2="50" y2="228" stroke="#94a3b8" stroke-width="2" />
            <line x1="95" y1="150" x2="140" y2="228" stroke="#94a3b8" stroke-width="2" />
            <line x1="265" y1="150" x2="230" y2="228" stroke="#94a3b8" stroke-width="2" />
            <line x1="265" y1="150" x2="320" y2="228" stroke="#94a3b8" stroke-width="2" />
            <circle cx="180" cy="48" r="18" fill="#f59e0b" stroke="#d97706" stroke-width="3" />
            <text x="180" y="48" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">10</text>
            <circle cx="95" cy="150" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="95" y="150" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <circle cx="265" cy="150" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="265" y="150" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <circle cx="50" cy="228" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="50" y="228" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <circle cx="140" cy="228" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="140" y="228" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <circle cx="230" cy="228" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="230" y="228" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <circle cx="320" cy="228" r="18" fill="#ef4444" stroke="#b91c1c" stroke-width="2.5" />
            <text x="320" y="228" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <path d="M 200 48 C 320 40, 420 60, 500 90" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#h1-e)" />
            <rect x="500" y="100" width="56" height="36" rx="5" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="528" y="118" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">10</text>
            <text x="528" y="148" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a">已排序区</text>
            <text x="16" y="262" font-size="11" font-family="monospace" fill="#64748b">交换后对剩余 6 个元素做 siftDown，恢复大顶堆，再取下一个堆顶 8 …</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图：堆排序反复把堆顶（最大）搬到末尾，末尾逐渐形成「已排序区」</figcaption>
        </figure>
      </section>

      <!-- 1. 逐个插入建堆 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          建堆方式①：逐个插入 O(n log n)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          最直观的建堆方式：从空堆开始，把元素<strong>一个一个插进去</strong>，每次插入做一次 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">siftUp</code>。
          第 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i</code> 次插入代价是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">O(log i)</code>，总计 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">O(n log n)</code>。
        </p>
        <div class="mb-4"><Code language="ts" :code="insertBuildCode" title="build_heap_insert.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么慢：</strong>逐个插入时，<strong>后面的元素要跨越整棵树高度</strong>上浮，越到后面越深。而且「插入到一半」的堆必须始终保持合法，被迫做大量冗余调整。</p>
        </aside>
      </section>

      <!-- 2. 自底向上 heapify -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          建堆方式②：自底向上 heapify O(n)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          更聪明的做法：<strong>先把数组原样当完全二叉树</strong>（不必先合法），然后<strong>从最后一个非叶节点开始，自底向上逐个 siftDown</strong>。
          因为每个子树在 siftDown 之前，它的左右子树<strong>已经</strong>是合法堆了，所以一次 siftDown 就能让当前子树变合法。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>最后一个非叶节点下标：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">(n&gt;&gt;1) - 1</code>（叶子无需下沉，天然是堆）</li>
          <li>从它开始向前遍历到根 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">0</code>，每个都 siftDown</li>
          <li>因为自底向上，处理到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i</code> 时它的孩子已经是堆</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="heapifyCode" title="build_heap_linear.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          heapify 的 O(n) 就像<strong>「自底向上的批量优化」</strong>——与其在构建过程中反复微调（逐个插入，每插一次全量调整），不如先把原料堆好，
          再从底层往上<strong>一次性</strong>把每一层「夯实」。<br/>
          也像 <strong>React 的批量 setState</strong> 或 <strong>打包时的 tree-shaking</strong>：一次自底向上的扫描，比「每来一个就重新处理全部」更高效。
          </p>
        </aside>
      </section>

      <!-- 3. 为什么 O(n) -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          为什么 heapify 是 O(n)？—— 数学推导
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          关键直觉：<strong>树里的节点大多在底层</strong>，而底层的节点<strong>下沉距离很短</strong>。只有少数顶层节点会下沉很远，所以总代价被「摊薄」了。
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-base font-bold text-cyan-800 mb-2 text-center font-mono">总代价 = Σ (每层节点数 × 该层最大下沉高度)</p>
          <div class="overflow-x-auto">
            <table class="w-full text-sm border-collapse bg-white rounded-lg">
              <thead><tr class="bg-cyan-50 text-left"><th class="px-3 py-2 border border-cyan-100 font-semibold">层（从底往上）</th><th class="px-3 py-2 border border-cyan-100 font-semibold">节点数</th><th class="px-3 py-2 border border-cyan-100 font-semibold">最大下沉高度</th><th class="px-3 py-2 border border-cyan-100 font-semibold">本层代价</th></tr></thead>
              <tbody class="text-slate-600 text-xs">
                <tr><td class="px-3 py-2 border">第 0 层（叶子）</td><td class="px-3 py-2 border font-mono">≈ n/2</td><td class="px-3 py-2 border font-mono">0</td><td class="px-3 py-2 border font-mono">0</td></tr>
                <tr><td class="px-3 py-2 border">第 1 层</td><td class="px-3 py-2 border font-mono">≈ n/4</td><td class="px-3 py-2 border font-mono">1</td><td class="px-3 py-2 border font-mono">n/4</td></tr>
                <tr><td class="px-3 py-2 border">第 2 层</td><td class="px-3 py-2 border font-mono">≈ n/8</td><td class="px-3 py-2 border font-mono">2</td><td class="px-3 py-2 border font-mono">n/4</td></tr>
                <tr><td class="px-3 py-2 border">…</td><td class="px-3 py-2 border font-mono">…</td><td class="px-3 py-2 border font-mono">…</td><td class="px-3 py-2 border font-mono">…</td></tr>
                <tr><td class="px-3 py-2 border">顶层（根）</td><td class="px-3 py-2 border font-mono">1</td><td class="px-3 py-2 border font-mono">log n</td><td class="px-3 py-2 border font-mono">log n</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-xs text-cyan-600 text-center mt-3">总和 = n/4 + n/4 + … &lt; 2n，即 O(n)。而逐个插入是 Σ log i = O(n log n)。</p>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>用 siftUp 从前往后建堆</strong>——很多人写「for i 从 0 到 n：siftUp(i)」，这正是 O(n log n) 的逐个插入，不是 O(n)。heapify 必须<strong>从 (n&gt;&gt;1)-1 往前 siftDown</strong>。<br/>
          ② <strong>误以为堆排序第一遍建堆也是 O(n log n) 的总价</strong>——建堆本身 O(n)，只有「反复取堆顶」那段才是 O(n log n)，所以堆排序总价 = O(n) + O(n log n) = O(n log n)。
          </p>
        </aside>
      </section>

      <!-- 4. 堆排序 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          堆排序 —— O(n log n) 原地排序
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          堆排序（Heap Sort）利用大顶堆「堆顶是最大值」的性质，把数组排成升序：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>建大顶堆</strong> O(n)：heapify</li>
          <li><strong>反复取堆顶</strong>：堆顶（最大）与「当前末尾」交换，末尾进入已排序区</li>
          <li>对剩余部分 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">siftDown</code> 恢复堆 O(log n)</li>
          <li>重复直到只剩 1 个元素</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="heapSortCode" title="heap_sort.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">特性</th><th class="px-4 py-2 border border-slate-200 font-semibold">堆排序</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">时间复杂度</td><td class="px-4 py-2 border font-mono">O(n log n)（建堆 O(n) + n 次取堆顶 O(log n)）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">空间复杂度</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1) 原地，不需要额外数组</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">稳定性</td><td class="px-4 py-2 border font-mono text-red-600">不稳定（交换会打乱相等元素相对顺序）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>堆排序的优势是<strong>原地 O(1) 空间 + 最坏 O(n log n)</strong>（不像快排最坏 O(n²)）；但常数较大、不稳定，实际工程里常被快排/归并替代。它是「原地排序」和「最坏对数复杂度」之间的经典折中。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：自底向上建堆 / 堆排序
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          节点标注「值 + [下标]」。橙色 = 当前 siftDown 节点，绿色 = 比较的孩子，紫色 = 右孩子，红色 = 即将交换。「自底向上建堆」标注<strong>累计比较次数</strong>（体现 O(n)）；「堆排序」标注<strong>输出序列</strong>逐步生成（绿色 = 已就位的最大值）。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ heap.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔢 累计比较: {{ cmpCount }}</span>
          <span v-if="outSeq.length" class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">📤 已就位(从大到小): {{ outSeq.join(' ') }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doHeapify" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">🔨 自底向上建堆</button>
          <button @mousedown="doHeapSort" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">📊 堆排序</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="'e'+e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'vt'+n.id" :config="valTextCfg(n)" />
              <v-text v-for="n in tNodes" :key="'it'+n.id" :config="idxTextCfg(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>建堆①逐个插入：</strong>每插一次 siftUp，O(n log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>建堆②自底向上 heapify：</strong>从 <code>(n&gt;&gt;1)-1</code> 逐个 siftDown，O(n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>O(n) 的直觉：</strong>节点大多在底层，下沉距离短，总代价 &lt; 2n</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>堆排序：</strong>建堆 + 反复取堆顶交换 + siftDown，O(n log n) 原地</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>坑：</strong>heapify 要从后往前 siftDown，别用 siftUp 从前往后</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下一步：</strong>5-2 用堆解决优先队列与 Top-K 等实战问题</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-1-binary-heap/dsa-5-1-2-sift" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：上浮(siftUp)与下沉(siftDown)</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-2-priority-queue/dsa-5-2-1-topk" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Top-K问题 →</RouterLink>
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
  { id: "sec-1", name: "逐个插入 O(n log n)" },
  { id: "sec-2", name: "自底向上 heapify" },
  { id: "sec-3", name: "为什么 O(n)" },
  { id: "sec-4", name: "堆排序" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-5", name: "小结" },
]

// ===== 🎬 heapify / 堆排序 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0' }
const R = 22, LEVEL_H = 92, TOP = 50
const H = ref(360), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const cmpCount = ref(0), outSeq = ref<number[]>([])
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

interface TNode { id:number; val:number; x:number; y:number; color:string }
const heap = reactive<number[]>([])
const sortedFlags = reactive<boolean[]>([])
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{a:number; b:number}[]>([])

function setH() {
  const n = heap.length
  const levels = Math.ceil(Math.log2(n + 1))
  H.value = TOP + levels * LEVEL_H + 50
}

function layout() {
  tNodes.length = 0; tEdges.length = 0
  const n = heap.length
  let level = [0], y = TOP
  while (level.length) {
    const gap = W.value / (level.length + 1)
    level.forEach((id, i) => tNodes.push({ id, val: heap[id], x: gap*(i+1), y, color: sortedFlags[id] ? C.green : C.cyan }))
    const next: number[] = []
    level.forEach(id => {
      const l = 2*id+1, r = 2*id+2
      if (l < n) { tEdges.push({a:id, b:l}); next.push(l) }
      if (r < n) { tEdges.push({a:id, b:r}); next.push(r) }
    })
    level = next; y += LEVEL_H
  }
  setH()
}

function load(arr:number[]) {
  heap.length = 0
  heap.push(...arr)
  sortedFlags.length = 0
  arr.forEach(() => sortedFlags.push(false))
  layout()
}

function pos(id:number): TNode { return tNodes.find(n => n.id === id)! }
function colorOf(id:number, c:string) { const n = pos(id); if (n) n.color = c }
function allCyan() { tNodes.forEach(n => { n.color = sortedFlags[n.id] ? C.green : C.cyan }) }
function swap(i:number, j:number) { const t = heap[i]; heap[i] = heap[j]; heap[j] = t; layout() }

function edgeCfg(e:{a:number;b:number}) {
  const pa = pos(e.a), pb = pos(e.b)
  return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke:'#94a3b8', strokeWidth:2 }
}
function circleCfg(n:any) {
  const stroke = n.color === C.cyan ? '#0891b2' : n.color === C.orange ? '#d97706' : n.color === C.green ? '#16a34a' : n.color === C.red ? '#b91c1c' : '#7c3aed'
  const sw = (n.color === C.cyan || n.color === C.green) ? 1.5 : 3
  return { x:n.x, y:n.y, radius:R, fill:n.color, stroke, strokeWidth:sw, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
}
function valTextCfg(n:any) {
  return { x:n.x-R, y:n.y-R-7, width:R*2, height:R*2, text:String(n.val), fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:n.color === C.green ? '#0f172a' : '#fff', align:'center', verticalAlign:'middle' }
}
function idxTextCfg(n:any) {
  return { x:n.x-R, y:n.y+R-15, width:R*2, height:14, text:'['+n.id+']', fontSize:9, fontFamily:'monospace', fill:n.color === C.green ? '#14532d' : '#cffafe', align:'center', verticalAlign:'middle' }
}

async function act(msg:string, label:string, fn:() => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

// 一次 siftDown，带动画 + 比较计数；n 为有效范围（堆排序时缩小）
async function siftDownAnimated(i:number, n:number) {
  while (true) {
    const l = 2*i+1, r = 2*i+2
    colorOf(i, C.orange)
    if (l < n) colorOf(l, C.green)
    if (r < n) colorOf(r, C.violet)
    if (l < n) cmpCount.value++
    if (r < n) cmpCount.value++
    status.value = `siftDown[${i}]=${heap[i]}：左 ${l<n ? heap[l]+'['+l+']' : '—'} / 右 ${r<n ? heap[r]+'['+r+']' : '—'}（累计 ${cmpCount.value} 次）`
    await d(720)
    let largest = i
    if (l < n && heap[l] > heap[largest]) largest = l
    if (r < n && heap[r] > heap[largest]) largest = r
    if (largest === i) { await d(280); allCyan(); break }
    status.value = `${heap[i]} < ${heap[largest]} → 交换 [${i}]↔[${largest}]`
    colorOf(i, C.red); colorOf(largest, C.red)
    await d(380)
    swap(i, largest)
    await d(380)
    allCyan()
    i = largest
  }
}

function doHeapify() {
  act('自底向上建堆', 'O(n)', async () => {
    cmpCount.value = 0
    load([4,10,3,5,1,8,2])
    status.value = '从最后一个非叶 (n>>1)-1 = 2 开始逐个 siftDown'
    await d(800)
    const n = heap.length
    for (let i = (n >> 1) - 1; i >= 0; i--) {
      status.value = `处理非叶节点 [${i}]=${heap[i]}（累计比较 ${cmpCount.value} 次）`
      await d(650)
      await siftDownAnimated(i, n)
    }
    status.value = `建堆完成，累计比较 ${cmpCount.value} 次（< 2n=${2*n}）→ O(n)`
  })
}

function doHeapSort() {
  act('堆排序', 'O(n log n)', async () => {
    cmpCount.value = 0
    outSeq.value = []
    load([10,5,8,4,1,3,2])
    status.value = '已建好大顶堆，开始「反复取堆顶」'
    await d(700)
    let end = heap.length - 1
    while (end > 0) {
      colorOf(0, C.orange); colorOf(end, C.red)
      status.value = `交换堆顶 ${heap[0]}[0] ↔ 末尾 ${heap[end]}[${end}]`
      await d(520)
      swap(0, end)
      sortedFlags[end] = true
      colorOf(end, C.green)
      outSeq.value.push(heap[end])
      status.value = `最大值 ${heap[end]} 就位，输出序列: ${outSeq.value.join(', ')}`
      await d(560)
      end--
      await siftDownAnimated(0, end + 1)
    }
    outSeq.value.push(heap[0])
    status.value = `排序完成：升序 [${[...outSeq.value].reverse().join(', ')}]`
  })
}

function doReset() { cmpCount.value = 0; outSeq.value = []; load([4,10,3,5,1,8,2]); status.value = ''; opLabel.value = '' }

let ro: ResizeObserver|null = null
onMounted(() => {
  load([4,10,3,5,1,8,2])
  if (box.value) {
    W.value = box.value.clientWidth
    layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const insertBuildCode = `// ===== 建堆方式①：逐个插入 O(n log n) =====
// 从空堆开始，每次 push 一个元素 + siftUp
function buildHeapByInsert(nums: number[]): number[] {
    const heap: number[] = []
    for (const v of nums) {
        heap.push(v)
        siftUp(heap, heap.length - 1)   // 每次 O(log n)
    }
    return heap
}

// 复杂度：第 i 次插入代价 O(log i)
//   总代价 = Σ_{i=1}^{n} log i = O(n log n)

// 过程（nums = [4,10,3,5,1,8,2]）：
//   push 4    → [4]
//   push 10   → [10,4]           (10 上浮)
//   push 3    → [10,4,3]
//   push 5    → [10,5,3,4]       (5 上浮)
//   ... 每次都维护合法堆，代价较高`

const heapifyCode = `// ===== 建堆方式②：自底向上 heapify O(n) =====
// 从最后一个非叶节点 (n>>1)-1 开始，逐个 siftDown
function buildHeap(nums: number[]): void {
    const n = nums.length
    for (let i = (n >> 1) - 1; i >= 0; i--) {
        siftDown(nums, i, n)   // 每个非叶节点向下沉降
    }
}

// 为什么是 O(n) 而非 O(n log n)？
// 设树高 h，从底往上第 k 层有 2^k 个节点，每个最多下沉 (h-k) 层：
//   总代价 = Σ 2^k · (h-k) ≈ 2n（级数收敛，趋近 2n，不是 n log n）
// 而逐个插入是 Σ log i = O(n log n)，因为每次都可能跨越整个树高。

// 手动模拟 nums = [4,10,3,5,1,8,2]，n=7，最后一个非叶 = (7>>1)-1 = 2：
// i=2: siftDown(2) → 3 与 8 交换 → [4,10,8,5,1,3,2]
// i=1: siftDown(1) → 10 已是最大，不动
// i=0: siftDown(0) → 4 与 10 交换，再与 5 交换 → [10,5,8,4,1,3,2]
// 结果就是大顶堆`

const heapSortCode = `// ===== 堆排序：建堆 + 反复取堆顶，O(n log n) 原地 =====
function siftDown(arr: number[], i: number, n: number): void {
    while (true) {
        const l = 2 * i + 1, r = 2 * i + 2
        let largest = i
        if (l < n && arr[l] > arr[largest]) largest = l
        if (r < n && arr[r] > arr[largest]) largest = r
        if (largest === i) break
        ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
        i = largest
    }
}

function heapSort(arr: number[]): void {
    const n = arr.length
    // 1) 建大顶堆 O(n)
    for (let i = (n >> 1) - 1; i >= 0; i--) siftDown(arr, i, n)
    // 2) 反复：堆顶(最大)与末尾交换，缩小范围，siftDown O(log n)
    for (let end = n - 1; end > 0; end--) {
        ;[arr[0], arr[end]] = [arr[end], arr[0]]  // 最大到末尾（已排序区）
        siftDown(arr, 0, end)                      // 恢复剩余部分的堆
    }
}

// 手动模拟（继续上面的堆 [10,5,8,4,1,3,2]）：
// end=6: 10↔2 → siftDown → [8,5,3,4,1,2,10]   (10 已就位)
// end=5: 8↔2  → siftDown → [5,4,3,2,1,8,10]   (8 已就位)
// ... 最终 [1,2,3,4,5,8,10] 升序，原地 O(1) 空间`
</script>
