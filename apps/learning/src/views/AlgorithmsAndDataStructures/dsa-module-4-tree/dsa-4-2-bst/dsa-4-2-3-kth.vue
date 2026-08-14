<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌳 第 K 小/大的元素与 BST 统计</h1>
          <p class="text-sm text-slate-500 mt-1">中序计数 O(n) 简单粗暴，size 子树统计 O(h) 化查找为二分</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-2-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：给节点挂一个「子树计数」size
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          BST 的中序遍历天然有序，所以「第 K 小」就是<strong>中序序列的第 K 个</strong>。
          但要更快，可以给每个节点存一个 <code>size</code> 字段——<strong>以它为根的子树里共有多少个节点</strong>。
          有了 size，找第 K 小就像做<strong>二分查找</strong>：看左子树有多少个，决定往左、命中、还是往右。
        </p>

        <!-- 结构图：带 size 的树 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 400" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="k1-e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">节点上的灰字 = size（子树节点数），如根 8 的 size=7</text>

            <!-- 边 -->
            <line x1="360" y1="74" x2="185" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#k1-e)" />
            <line x1="360" y1="74" x2="535" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#k1-e)" />
            <line x1="185" y1="174" x2="90" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#k1-e)" />
            <line x1="185" y1="174" x2="280" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#k1-e)" />
            <line x1="280" y1="274" x2="345" y2="326" stroke="#94a3b8" stroke-width="2" marker-end="url(#k1-e)" />
            <line x1="535" y1="174" x2="620" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#k1-e)" />

            <!-- 空子节点 -->
            <line x1="535" y1="174" x2="465" y2="226" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="465" cy="250" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="465" y="250" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">null</text>
            <line x1="280" y1="274" x2="235" y2="326" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="235" cy="350" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="235" y="350" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">null</text>

            <!-- size 标注（灰字） -->
            <text x="360" y="16" text-anchor="middle" font-size="11" font-family="monospace" fill="#94a3b8">size 7</text>
            <text x="185" y="116" text-anchor="middle" font-size="11" font-family="monospace" fill="#94a3b8">size 4</text>
            <text x="535" y="116" text-anchor="middle" font-size="11" font-family="monospace" fill="#94a3b8">size 2</text>
            <text x="90" y="216" text-anchor="middle" font-size="11" font-family="monospace" fill="#94a3b8">size 1</text>
            <text x="280" y="216" text-anchor="middle" font-size="11" font-family="monospace" fill="#94a3b8">size 2</text>
            <text x="620" y="216" text-anchor="middle" font-size="11" font-family="monospace" fill="#94a3b8">size 1</text>
            <text x="345" y="316" text-anchor="middle" font-size="11" font-family="monospace" fill="#94a3b8">size 1</text>

            <!-- 节点 -->
            <circle cx="360" cy="50" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="50" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <circle cx="185" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="185" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <circle cx="535" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="535" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">10</text>
            <circle cx="90" cy="250" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="90" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <circle cx="280" cy="250" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="280" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
            <circle cx="620" cy="250" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="620" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">14</text>
            <circle cx="345" cy="350" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="345" y="350" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>

            <text x="16" y="388" font-size="11" font-family="monospace" fill="#64748b">中序序列：1 → 3 → 6 → 7 → 8 → 10 → 14（第 4 小 = 7）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：带 size 的 BST —— 每个节点记录子树节点数，找排名时靠左子树 size 砍掉一半</figcaption>
        </figure>

        <!-- 操作示意图：size 下行 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：size 下行找第 4 小（橙色路径）</h3>
        <figure>
          <svg viewBox="0 0 720 400" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="k2-o" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>
            <!-- 边（路径橙色） -->
            <line x1="360" y1="74" x2="185" y2="126" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#k2-o)" />
            <line x1="185" y1="174" x2="280" y2="226" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#k2-o)" />
            <line x1="280" y1="274" x2="345" y2="326" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#k2-o)" />
            <line x1="360" y1="74" x2="535" y2="126" stroke="#94a3b8" stroke-width="2" />
            <line x1="185" y1="174" x2="90" y2="226" stroke="#94a3b8" stroke-width="2" />
            <line x1="535" y1="174" x2="620" y2="226" stroke="#94a3b8" stroke-width="2" />
            <line x1="535" y1="174" x2="465" y2="226" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="465" cy="250" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="465" y="250" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">null</text>
            <line x1="280" y1="274" x2="235" y2="326" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="235" cy="350" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="235" y="350" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">null</text>

            <!-- 节点：路径橙框，命中绿 -->
            <circle cx="360" cy="50" r="24" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="360" y="50" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <circle cx="185" cy="150" r="24" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="185" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <circle cx="535" cy="150" r="24" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
            <text x="535" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#64748b">10</text>
            <circle cx="90" cy="250" r="24" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
            <text x="90" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#64748b">1</text>
            <circle cx="280" cy="250" r="24" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="280" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
            <circle cx="620" cy="250" r="24" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
            <text x="620" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#64748b">14</text>
            <circle cx="345" cy="350" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="345" y="350" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">7</text>

            <text x="16" y="388" font-size="11" font-family="monospace" fill="#d97706">8(leftSize=4)→3(leftSize=1, k=2)→6(leftSize=0, k=1)→7 命中</text>
            <text x="430" y="388" font-size="11" font-family="monospace" fill="#16a34a">第 4 小 = 7</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：size 下行 —— 每次比较左子树 size，砍掉一半候选，O(h)</figcaption>
        </figure>
      </section>

      <!-- 1. 问题定义 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          问题定义：什么是「第 K 小」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          在一棵 BST 里找<strong>第 K 小</strong>的元素（K 从 1 开始），即所有节点值排序后排在<strong>第 K 位</strong>的值。
          因为 BST 中序遍历就是递增序列，所以「第 K 小」=「中序序列第 K 个访问到的节点」。
          第 K 大 = 第 <code>(n - k + 1)</code> 小（n 是总节点数），只需反向换算。
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">第 K 小 = 中序遍历的第 K 个节点</p>
          <p class="text-xs text-cyan-600 text-center">第 K 大 = 第 (n - k + 1) 小，两种问法一个答案</p>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          本文给两种解法：① <strong>中序遍历计数 O(n)</strong>，② <strong>节点存 size 子树计数 O(h)</strong>（平衡时 O(log n)）。
          最后再和数组的「快速选择 O(n)」对比，讲清什么时候用哪种。
        </p>
      </section>

      <!-- 2. 中序计数 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          解法①：中序遍历计数 O(n)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          最直接的想法：中序遍历，每访问一个节点 <code>count++</code>，当 <code>count === k</code> 时命中。
          找到后用一个标志提前剪枝，避免继续遍历。时间复杂度 <strong>O(n)</strong>——最坏要访问到第 K 个，K 接近 n 时接近全遍历。
        </p>
        <div class="mb-4"><Code language="ts" :code="kthInorderCode" title="kth_inorder.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          中序遍历计数就像 <code>arr.sort()</code> 后取 <code>arr[k-1]</code>——排序结果和中序序列一模一样，只是 BST 把「排序」提前在了<strong>建树时的有序性</strong>里，查询时只需按中序走一遍。<br/>
          也像 <strong>分页取第 K 条记录</strong>：一条条数过去，数到第 K 条停下；如果每次都从头数就太慢，所以才需要 size 优化（见下一节）。
          </p>
        </aside>
      </section>

      <!-- 3. size 统计 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          解法②：size 子树计数 O(h)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          给每个节点加一个 <code>size</code> 字段，表示<strong>以它为根的子树共有多少个节点</strong>。
          找第 K 小时，站在某个节点上先看左子树有多少个（<code>leftSize</code>）：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><code>k &le; leftSize</code> → 第 K 小在左子树里，向左走（k 不变）</li>
          <li><code>k === leftSize + 1</code> → 当前节点正好是第 K 小，命中</li>
          <li><code>k &gt; leftSize + 1</code> → 在右子树里，向右走，k 缩小为 <code>k - leftSize - 1</code></li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="kthSizeCode" title="kth_size.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 本质：</strong>这就是在 BST 上做<strong>二分查找</strong>——每次根据左子树 size 决定往左、命中还是往右，把候选砍掉一半。平衡时树高 O(log n)，查询降到 <strong>O(log n)</strong>。</p>
        </aside>
      </section>

      <!-- 4. size 维护 + 第K大 + 对比 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          size 的维护、第 K 大 与数组快速选择对比
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          size 不是白拿的——<strong>插入/删除时要沿途更新</strong>。好在只有「根到插入/删除位置」这条路径上的节点 size 会变，
          在递归回溯时顺手 <code>+1/-1</code> 即可，仍是 O(h)。
        </p>
        <div class="mb-4"><Code language="ts" :code="kthMaintainCode" title="kth_size_maintain.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">方案</th><th class="px-4 py-2 border border-slate-200 font-semibold">查询第 K 小</th><th class="px-4 py-2 border border-slate-200 font-semibold">动态插入/删除</th><th class="px-4 py-2 border border-slate-200 font-semibold">适用场景</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold text-emerald-600">数组 + 排序</td><td class="px-4 py-2 border font-mono">O(1)（排序后下标）</td><td class="px-4 py-2 border font-mono">O(n)（重排）</td><td class="px-4 py-2 border">静态、只查不改</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-amber-600">数组 + 快速选择</td><td class="px-4 py-2 border font-mono">平均 O(n)</td><td class="px-4 py-2 border font-mono">O(n)</td><td class="px-4 py-2 border">静态、单次查询</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-600">BST 中序计数</td><td class="px-4 py-2 border font-mono">O(n)</td><td class="px-4 py-2 border font-mono">O(h)</td><td class="px-4 py-2 border">实现简单、数据不大</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-600">BST + size</td><td class="px-4 py-2 border font-mono">O(h) / 平衡 O(log n)</td><td class="px-4 py-2 border font-mono">O(h)</td><td class="px-4 py-2 border">动态频繁增删查、要排名</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          数组快速选择 ≈ 在前端「排行榜里找第 K 名」的一次性算法；而 <strong>BST + size ≈ 一个实时更新的排行榜数据库</strong>——每次有人涨分（插入/更新）只动 O(h) 个节点的 size，查第 K 名就是 O(h)。<br/>
          这正对应现实里的<strong>有序集合（如 Redis 的 ZSET）</strong>，其内部用跳表 + 跨度做「第 K 名」查询，思想和 size 子树计数如出一辙。
          </p>
        </aside>
      </section>

      <!-- 5. 常见错误 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          常见错误
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 三个高频坑：</strong><br/>
          ① <strong>K 的起点搞错</strong>——本文约定第 K 小从 1 开始，命中条件是 <code>k === leftSize + 1</code>；若题目给 0 基下标，<code>leftSize</code> 不加 1。<br/>
          ② <strong>忘记维护 size</strong>——size 只在每次插入/删除后有效，漏更新会让后续排名查询全部算错，而且错误很隐蔽。<br/>
          ③ <strong>size 更新的位置写错</strong>——要放在<strong>递归回溯</strong>（返回前）更新 <code>root.size = 1 + left + right</code>，而不是进入前，否则子树的 size 还是旧值。
          </p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>只查一次 → 快速选择/排序即可；要<strong>动态维护 + 反复查排名</strong> → 用 size 子树统计（可结合 AVL/红黑树保证平衡，见模块 4-3）。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：找第 K 小
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          每个节点上方灰字是 size。「找第 K 小」用中序计数逐个点亮；「size 下行」则沿左子树 size 二分，绿色为命中。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ tNodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🌳 高度: {{ dynHeight }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <label class="text-xs text-slate-500">K =</label>
          <input v-model.number="kthKey" type="number" class="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-shadow" placeholder="K" />
          <button @mousedown="doKth" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm">找第 K 小（中序 O(n)）</button>
          <button @mousedown="doSizeKth" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">size 下行（O(h)）</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="'e'+e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="tTextCfg(n)" />
              <v-text v-for="n in tNodes" :key="'s'+n.id" :config="sizeBadgeCfg(n)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>定义：</strong>第 K 小 = 中序序列第 K 个节点；第 K 大 = 第 (n-k+1) 小</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>中序计数 O(n)：</strong>遍历计数，count===k 命中，简单但每次 O(n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>size 统计 O(h)：</strong>节点存子树节点数，按 leftSize 二分下行，平衡时 O(log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>size 维护：</strong>插入/删除时沿路径回溯 +1/-1，仍是 O(h)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>对比：</strong>静态单查用快速选择 O(n)；动态频繁排名用 BST+size</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>进阶：</strong>size 版配合 AVL/红黑树保持平衡（模块 4-3），避免退化成 O(n)</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-2-bst/dsa-4-2-2-successor" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：前驱与后继节点</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-3-balanced/dsa-4-3-1-avl" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：AVL 树 →</RouterLink>
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
  { id: "sec-1", name: "问题定义" },
  { id: "sec-2", name: "中序计数 O(n)" },
  { id: "sec-3", name: "size 统计 O(h)" },
  { id: "sec-4", name: "第K大与对比" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 第 K 小动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const R = 22, LEVEL_H = 90, TOP = 50
const H = ref(400), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref(''), nid = ref(100)
const box = ref<HTMLDivElement>()
const kthKey = ref(4)
const d = (ms:number) => new Promise(r => setTimeout(r,ms))

interface TNode { id:number; val:number; x:number; y:number; color:string; s?:number }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{a:number;b:number}[]>([])
const tChild = reactive<Record<number,{left:number|null;right:number|null}>>({})
const vals = reactive<Record<number,number>>({})
let rootId = 1

function resetTree() {
  Object.keys(tChild).forEach(k => delete tChild[k])
  Object.keys(vals).forEach(k => delete vals[k])
  Object.assign(tChild, { 1:{left:2,right:3}, 2:{left:4,right:5}, 3:{left:null,right:6}, 4:{left:null,right:null}, 5:{left:null,right:7}, 6:{left:null,right:null}, 7:{left:null,right:null} })
  Object.assign(vals, { 1:8, 2:3, 3:10, 4:1, 5:6, 6:14, 7:7 })
  rootId = 1
  layout()
}

function layout() {
  tNodes.length = 0; tEdges.length = 0
  let level = [rootId], y = TOP
  while (level.length) {
    const gap = W.value / (level.length + 1)
    level.forEach((id, i) => { tNodes.push({ id, val: vals[id], x: gap*(i+1), y, color: C.cyan, s:1 }) })
    const next: number[] = []
    level.forEach(id => {
      const ch = tChild[id] || { left:null, right:null }
      if (ch.left != null) { tEdges.push({ a:id, b:ch.left }); next.push(ch.left) }
      if (ch.right != null) { tEdges.push({ a:id, b:ch.right }); next.push(ch.right) }
    })
    level = next; y += LEVEL_H
  }
}

function pos(id:number): TNode { return tNodes.find(n => n.id === id)! }
function sizeOf(id:number|null): number { if (id == null) return 0; const c = tChild[id]; if (!c) return 1; return 1 + sizeOf(c.left) + sizeOf(c.right) }
function treeHeight(id:number|null = rootId): number { if (id == null) return 0; const c = tChild[id]; if (!c) return 0; return 1 + Math.max(treeHeight(c.left), treeHeight(c.right)) }
const dynHeight = computed(() => treeHeight())

function edgeCfg(e:{a:number;b:number}) { const pa = pos(e.a), pb = pos(e.b); return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke:'#94a3b8', strokeWidth:2 } }
function circleCfg(n:any) { const s = n.s ?? 1; return { x:n.x, y:n.y, radius:R*s, fill:n.color, stroke:n.color===C.orange?'#d97706':'#64748b', strokeWidth:n.color===C.orange?3:1.5, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 } }
function tTextCfg(n:any) { const s = n.s ?? 1; return { x:n.x-R, y:n.y-R, width:R*2, height:R*2, text:String(n.val), fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:n.color===C.ghost?C.muted:'#fff', align:'center', verticalAlign:'middle', scale:{x:s,y:s} } }
function sizeBadgeCfg(n:any) { return { x:n.x-24, y:n.y-R-16, width:48, text:'size ' + sizeOf(n.id), fontSize:10, fontFamily:'monospace', fill:'#94a3b8', align:'center' } }

async function act(msg:string, label:string, fn:() => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(300); busy.value = false; status.value = ''; opLabel.value = '' }
}

function doKth() {
  const k = kthKey.value; if (isNaN(k) || k < 1) return
  act(`找第 ${k} 小`, '中序遍历 O(n)', async () => {
    resetTree()
    const stack: number[] = []
    let cur: number | null = rootId
    let count = 0
    while (cur != null || stack.length) {
      while (cur != null) { stack.push(cur); cur = tChild[cur].left }
      cur = stack.pop()!
      count++
      const n = pos(cur)
      n.color = C.orange
      status.value = `中序访问第 ${count} 个：${vals[cur]}`
      await d(480)
      if (count === k) { n.color = C.green; n.s = 1.15; status.value = `✅ 第 ${k} 小 = ${vals[cur]}`; return }
      n.color = C.ghost
      cur = tChild[cur].right
    }
    status.value = `❌ K=${k} 超出节点数`
  })
}

function doSizeKth() {
  const k = kthKey.value; if (isNaN(k) || k < 1) return
  act(`size 下行找第 ${k} 小`, 'O(h)', async () => {
    resetTree()
    let cur: number | null = rootId
    let kk = k
    while (cur != null) {
      const n = pos(cur)
      n.color = C.orange
      await d(450)
      const leftSize = tChild[cur].left != null ? sizeOf(tChild[cur].left!) : 0
      status.value = `节点 ${vals[cur]}：左子树 size=${leftSize}，比较 k=${kk}`
      if (kk <= leftSize) {
        n.color = C.ghost; cur = tChild[cur].left
      } else if (kk === leftSize + 1) {
        n.color = C.green; n.s = 1.15; status.value = `✅ 第 ${k} 小 = ${vals[cur]}（k === leftSize+1）`; return
      } else {
        kk = kk - leftSize - 1; n.color = C.ghost; cur = tChild[cur].right
      }
      await d(250)
    }
    status.value = `❌ K=${k} 超出节点数`
  })
}

function doReset() { resetTree(); status.value = ''; opLabel.value = '' }

let ro: ResizeObserver|null = null
onMounted(() => {
  resetTree()
  if (box.value) { W.value = box.value.clientWidth; layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const kthInorderCode = `// ===== 解法①：中序遍历计数（简单，O(n)）=====
function kthSmallest(root: TreeNode | null, k: number): number {
    let count = 0
    let ans = -1
    function inorder(node: TreeNode | null) {
        if (!node || ans !== -1) return   // 命中后提前剪枝
        inorder(node.left)
        count++                            // 中序第 count 个 = 第 count 小
        if (count === k) { ans = node.val; return }
        inorder(node.right)
    }
    inorder(root)
    return ans
}

// 手动模拟 kthSmallest(root, 4)：
// 中序序列 1,3,6,7,8,10,14 → 第 4 小 = 7
// 访问顺序：1(count=1) → 3(2) → 6(3) → 7(4) 命中
// 缺点：每次查询都要遍历，O(n)，数据大时慢`

const kthSizeCode = `// ===== 解法②：节点存 size（子树节点数），O(h) 优化 =====
class SizeTreeNode {
    val: number
    left: SizeTreeNode | null = null
    right: SizeTreeNode | null = null
    size: number = 1                    // 以本节点为根的子树节点数
    constructor(val: number) { this.val = val }
}

// 更新 size：size = 1 + 左子树 size + 右子树 size
function refreshSize(node: SizeTreeNode | null): number {
    if (!node) return 0
    node.size = 1 + refreshSize(node.left) + refreshSize(node.right)
    return node.size
}

// 找第 K 小：利用左子树 size 一次砍掉一半，O(h)
function kthSmallestBySize(node: SizeTreeNode | null, k: number): number {
    if (!node) return -1
    const leftSize = node.left ? node.left.size : 0
    if (k <= leftSize) {
        return kthSmallestBySize(node.left, k)              // 在左子树里
    } else if (k === leftSize + 1) {
        return node.val                                      // 就是当前节点
    } else {
        return kthSmallestBySize(node.right, k - leftSize - 1) // 在右子树，k 缩小
    }
}

// 模拟 kthSmallestBySize(root, 4)：
// 根 8：leftSize=4 → k=4<=4 → 走左 3
// 节点 3：leftSize=1 → k=4>1 → k=4-1-1=2 → 走右 6
// 节点 6：leftSize=0 → k=2>0 → k=2-0-1=1 → 走右 7
// 节点 7：leftSize=0 → k===0+1 → 命中 7
// 输出: 7（平衡时 O(log n)，退化成链表仍 O(n)）`

const kthMaintainCode = `// ===== size 字段的维护：插入 / 删除时更新 =====
// 关键：只有「从根到插入/删除位置」这条路径上的节点 size 会变化，
// 沿途 +1（插入）或 -1（删除），不需要整棵树重算。

function insert(root: SizeTreeNode | null, val: number): SizeTreeNode {
    if (!root) return new SizeTreeNode(val)
    if (val < root.val) root.left = insert(root.left, val)
    else if (val > root.val) root.right = insert(root.right, val)
    root.size = 1 + (root.left?.size ?? 0) + (root.right?.size ?? 0) // 回溯时更新
    return root
}

// 第 K 大 = 第 (n - k + 1) 小（n = root.size 总节点数）
function kthLargest(root: SizeTreeNode, k: number): number {
    return kthSmallestBySize(root, root.size - k + 1)
}

// ===== 对比数组「快速选择」=====
// 数组第 K 小用 quickselect（分治 + 随机 pivot），平均 O(n)。
// BST size 版在平衡时 O(log n)，且支持动态插入删除，代价是要维护 size。
// 静态只查一次 → 数组 quickselect；动态频繁增删查 → BST size。`
</script>
