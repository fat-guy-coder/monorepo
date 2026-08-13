<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">⚖️ AVL 树：平衡因子与四种旋转</h1>
          <p class="text-sm text-slate-500 mt-1">最严格的自平衡二叉树——插入后 O(1) 旋转即可恢复平衡</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-3-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：AVL 树的平衡因子
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          AVL 树是<strong>第一种被发明的自平衡二叉搜索树</strong>（1962 年，Adelson-Velsky 和 Landis 三人命名）。
          它的核心约束只有一条：<strong>任意节点的左右子树高度差不超过 1</strong>。这个差值就是<strong>平衡因子 (Balance Factor)</strong>。
          一旦插入导致某个节点失衡（|bf| &gt; 1），就用一次或两次<strong>旋转</strong>把树拉回平衡。
        </p>

        <!-- 结构图：平衡因子标注 -->
        <figure class="mb-6">
          <svg viewBox="0 0 560 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="av-st" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="20" y="24" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">平衡因子 bf = 左子树高度 − 右子树高度（合法范围 −1 / 0 / +1）</text>

            <!-- 边 -->
            <line x1="280" y1="74" x2="150" y2="150" stroke="#94a3b8" stroke-width="2" marker-end="url(#av-st)" />
            <line x1="280" y1="74" x2="410" y2="150" stroke="#94a3b8" stroke-width="2" marker-end="url(#av-st)" />
            <line x1="410" y1="150" x2="360" y2="220" stroke="#94a3b8" stroke-width="2" marker-end="url(#av-st)" />

            <!-- 节点 -->
            <circle cx="280" cy="50" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="280" y="50" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">30</text>
            <circle cx="150" cy="130" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="150" y="130" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">20</text>
            <circle cx="410" cy="130" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="410" y="130" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">40</text>
            <circle cx="360" cy="220" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="220" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">35</text>

            <!-- 平衡因子标注 -->
            <rect x="304" y="14" width="46" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="327" y="23" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">bf=-1</text>
            <rect x="172" y="96" width="40" height="18" rx="4" fill="#ecfdf5" stroke="#10b981" stroke-width="1" />
            <text x="192" y="105" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#065f46">bf=0</text>
            <rect x="432" y="96" width="40" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="452" y="105" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">bf=+1</text>
            <rect x="382" y="186" width="40" height="18" rx="4" fill="#ecfdf5" stroke="#10b981" stroke-width="1" />
            <text x="402" y="195" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#065f46">bf=0</text>

            <text x="20" y="242" font-size="11" font-family="monospace" fill="#0891b2">30 右子树高 2、左子树高 1 → bf=−1；所有 |bf| ≤ 1 → 树平衡</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：AVL 树结构 —— 每个节点标注平衡因子，任意节点 |bf| ≤ 1 即平衡</figcaption>
        </figure>

        <!-- 操作示意图：四种旋转 before/after -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">核心操作：四种旋转（失衡 → 旋转 → 平衡）</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- LL -->
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">LL 型（左左）：一次右旋</p>
            <svg viewBox="0 0 440 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs><marker id="av-ll" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker></defs>
              <line x1="115" y1="58" x2="80" y2="118" stroke="#94a3b8" stroke-width="2" />
              <line x1="80" y1="118" x2="50" y2="168" stroke="#94a3b8" stroke-width="2" />
              <circle cx="115" cy="40" r="18" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
              <text x="115" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">30</text>
              <circle cx="80" cy="112" r="18" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="80" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">20</text>
              <circle cx="50" cy="166" r="18" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="50" y="166" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">10</text>
              <text x="155" y="44" font-size="11" font-family="monospace" fill="#ef4444" font-weight="bold">bf=+2</text>
              <line x1="230" y1="40" x2="268" y2="40" stroke="#94a3b8" stroke-width="2" marker-end="url(#av-ll)" />
              <text x="249" y="28" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">右旋</text>
              <line x1="330" y1="58" x2="295" y2="118" stroke="#94a3b8" stroke-width="2" />
              <line x1="330" y1="58" x2="365" y2="118" stroke="#94a3b8" stroke-width="2" />
              <circle cx="330" cy="40" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="330" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">20</text>
              <circle cx="295" cy="112" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="295" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">10</text>
              <circle cx="365" cy="112" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="365" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">30</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">根 30 左左失衡 → 以 20 为轴右旋，20 上浮为根</figcaption>
          </figure>
          <!-- RR -->
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">RR 型（右右）：一次左旋</p>
            <svg viewBox="0 0 440 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs><marker id="av-rr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker></defs>
              <line x1="115" y1="58" x2="150" y2="118" stroke="#94a3b8" stroke-width="2" />
              <line x1="150" y1="118" x2="180" y2="168" stroke="#94a3b8" stroke-width="2" />
              <circle cx="115" cy="40" r="18" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
              <text x="115" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">10</text>
              <circle cx="150" cy="112" r="18" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="150" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">20</text>
              <circle cx="180" cy="166" r="18" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="180" y="166" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">30</text>
              <text x="155" y="44" font-size="11" font-family="monospace" fill="#ef4444" font-weight="bold">bf=-2</text>
              <line x1="230" y1="40" x2="268" y2="40" stroke="#94a3b8" stroke-width="2" marker-end="url(#av-rr)" />
              <text x="249" y="28" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">左旋</text>
              <line x1="330" y1="58" x2="295" y2="118" stroke="#94a3b8" stroke-width="2" />
              <line x1="330" y1="58" x2="365" y2="118" stroke="#94a3b8" stroke-width="2" />
              <circle cx="330" cy="40" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="330" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">20</text>
              <circle cx="295" cy="112" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="295" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">10</text>
              <circle cx="365" cy="112" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="365" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">30</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">根 10 右右失衡 → 以 20 为轴左旋，20 上浮为根</figcaption>
          </figure>
          <!-- LR -->
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">LR 型（左右）：先左旋再右旋</p>
            <svg viewBox="0 0 440 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs><marker id="av-lr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker></defs>
              <line x1="115" y1="58" x2="80" y2="118" stroke="#94a3b8" stroke-width="2" />
              <line x1="80" y1="118" x2="115" y2="168" stroke="#94a3b8" stroke-width="2" />
              <circle cx="115" cy="40" r="18" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
              <text x="115" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">30</text>
              <circle cx="80" cy="112" r="18" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="80" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">10</text>
              <circle cx="115" cy="166" r="18" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="115" y="166" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">20</text>
              <text x="155" y="44" font-size="11" font-family="monospace" fill="#ef4444" font-weight="bold">bf=+2</text>
              <line x1="230" y1="40" x2="268" y2="40" stroke="#94a3b8" stroke-width="2" marker-end="url(#av-lr)" />
              <text x="249" y="28" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">双旋</text>
              <line x1="330" y1="58" x2="295" y2="118" stroke="#94a3b8" stroke-width="2" />
              <line x1="330" y1="58" x2="365" y2="118" stroke="#94a3b8" stroke-width="2" />
              <circle cx="330" cy="40" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="330" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">20</text>
              <circle cx="295" cy="112" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="295" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">10</text>
              <circle cx="365" cy="112" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="365" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">30</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">30 左右失衡 → 先对 10 左旋成 LL，再对 30 右旋</figcaption>
          </figure>
          <!-- RL -->
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">RL 型（右左）：先右旋再左旋</p>
            <svg viewBox="0 0 440 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs><marker id="av-rl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker></defs>
              <line x1="115" y1="58" x2="150" y2="118" stroke="#94a3b8" stroke-width="2" />
              <line x1="150" y1="118" x2="115" y2="168" stroke="#94a3b8" stroke-width="2" />
              <circle cx="115" cy="40" r="18" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
              <text x="115" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">10</text>
              <circle cx="150" cy="112" r="18" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="150" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">30</text>
              <circle cx="115" cy="166" r="18" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="115" y="166" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">20</text>
              <text x="155" y="44" font-size="11" font-family="monospace" fill="#ef4444" font-weight="bold">bf=-2</text>
              <line x1="230" y1="40" x2="268" y2="40" stroke="#94a3b8" stroke-width="2" marker-end="url(#av-rl)" />
              <text x="249" y="28" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">双旋</text>
              <line x1="330" y1="58" x2="295" y2="118" stroke="#94a3b8" stroke-width="2" />
              <line x1="330" y1="58" x2="365" y2="118" stroke="#94a3b8" stroke-width="2" />
              <circle cx="330" cy="40" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="330" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">20</text>
              <circle cx="295" cy="112" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="295" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">10</text>
              <circle cx="365" cy="112" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="365" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">30</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">10 右左失衡 → 先对 30 右旋成 RR，再对 10 左旋</figcaption>
          </figure>
        </div>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要平衡？BST 的退化
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          普通二叉搜索树 (BST) 的查找/插入/删除复杂度是 <code>O(h)</code>（h = 树高）。
          理想情况下树高 h = ⌊log₂n⌋，但<strong>最坏情况</strong>——按升序依次插入 1、2、3、4、5——树会退化成一条<strong>单链</strong>，h = n，所有操作暴跌到 O(n)。
          AVL 树通过<strong>旋转</strong>强制树高始终维持在 O(log n)，用一点插入时的开销换来稳定的查找性能。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">结构</th><th class="px-4 py-2 border border-slate-200 font-semibold">高度</th><th class="px-4 py-2 border border-slate-200 font-semibold">查找复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold">平衡维护成本</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">普通 BST（最坏）</td><td class="px-4 py-2 border font-mono text-red-600">O(n)</td><td class="px-4 py-2 border font-mono text-red-600">O(n)</td><td class="px-4 py-2 border">无</td></tr>
              <tr><td class="px-4 py-2 border">AVL 树</td><td class="px-4 py-2 border font-mono text-emerald-600">≤ 1.44 log₂n</td><td class="px-4 py-2 border font-mono text-emerald-600">O(log n)</td><td class="px-4 py-2 border">插入 O(log n) + 旋转 O(1)</td></tr>
              <tr><td class="px-4 py-2 border">红黑树</td><td class="px-4 py-2 border font-mono text-emerald-600">≤ 2 log₂n</td><td class="px-4 py-2 border font-mono text-emerald-600">O(log n)</td><td class="px-4 py-2 border">插入 O(log n) + 至多 2 次旋转</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          AVL 树就像<strong>React 的严格模式</strong>——宁愿每次插入多花一点成本做自检（旋转），也要保证运行时行为<strong>绝对可预测</strong>。<br/>
          普通 BST 就像放任不管的 DOM 嵌套，最坏时页面结构深到浏览器递归爆栈；AVL 树强制「树高始终可控」，等价于给组件树设了一个「最大嵌套深度」的护栏。
          </p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          平衡因子：失衡的唯一判定标准
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          每个节点维护一个<strong>高度 height</strong> 字段，<strong>平衡因子 bf = height(left) − height(right)</strong>。
          AVL 的不变量是 <code>-1 ≤ bf ≤ +1</code>。一旦某个节点 bf 越界（+2 或 −2），它就是<strong>失衡节点</strong>，必须旋转。
        </p>
        <div class="mb-4"><Code language="ts" :code="bfCode" title="balance_factor.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见陷阱：</strong><br/>
          ① <strong>bf 不是缓存字段，是计算值</strong>——旋转或插入后必须<strong>自底向上重新计算</strong>高度，否则后续判断全错。<br/>
          ② 高度定义为「叶子节点高度 = 1」还是「空节点高度 = -1」必须全程统一，混用会导致 bf 差 1。<br/>
          ③ 失衡点只可能是<strong>插入路径上的祖先</strong>——不用全局扫描，沿插入路径回溯即可。
          </p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          LL 型：一次右旋（Right Rotation）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          当失衡节点 A 的 bf=+2 且其左孩子 B 的 bf=+1（都在<strong>左-左</strong>方向），只需<strong>一次右旋</strong>：
          把 B 提上去当新根，A 变成 B 的右孩子，B 的右子树（如果有）挂到 A 的左子树上。
        </p>
        <div class="mb-4"><Code language="ts" :code="rotateCode" title="rotations.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 旋转的本质：</strong>旋转不改变中序序列（BST 性质不变），只改变<strong>父子关系的指向</strong>。
          右旋 = 左孩子上位，左旋 = 右孩子上位。旋转是 O(1) 操作，只改写常量个指针。
          </p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          RR 型：一次左旋（Left Rotation）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          RR 型是 LL 型的<strong>镜像</strong>：失衡节点 A 的 bf=-2 且右孩子 B 的 bf=-1（都在<strong>右-右</strong>方向），
          一次<strong>左旋</strong>——B 上位为新根，A 变成 B 的左孩子，B 的左子树挂到 A 的右子树。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>LL 与 RR 的对称记忆法：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>LL → 右旋</strong>：左重往右掰（「左左」谐音「拉拉」往右拉）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>RR → 左旋</strong>：右重往左掰</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>判断口诀</strong>：哪边重，就往<strong>反方向</strong>旋——左边重右旋，右边重左旋</span></li>
          </ul>
        </div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          LR 型：先左旋再右旋（双旋）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          当失衡节点 A 的 bf=+2 但左孩子 B 的 bf=-1（插入在 B 的<strong>右子树</strong>，即「左-右」方向），
          单次右旋无法修复——必须<strong>先对 B 左旋</strong>（把 LR 掰成 LL），<strong>再对 A 右旋</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="doubleRotateCode" title="double_rotation.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 双旋的本质：</strong>LR 双旋 = 「左旋 + 右旋」的组合拳。
          第一步左旋把「折线」拉直成「直线」(LL)，第二步右旋就能用单旋解决。
          <strong>记忆：</strong>看中间节点 20 的位置——它先被转到外侧，再被转到根。
          </p>
        </aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          RL 型：先右旋再左旋（双旋）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          RL 型是 LR 型的镜像：失衡节点 A 的 bf=-2 但右孩子 B 的 bf=+1（插入在 B 的<strong>左子树</strong>，即「右-左」方向），
          需<strong>先对 B 右旋</strong>（拉成 RR），<strong>再对 A 左旋</strong>。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">失衡形态</th><th class="px-4 py-2 border border-slate-200 font-semibold">判定条件</th><th class="px-4 py-2 border border-slate-200 font-semibold">修复操作</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">LL</td><td class="px-4 py-2 border">bf(A)=+2 且 bf(B)=+1</td><td class="px-4 py-2 border font-mono text-emerald-600">右旋 A 一次</td></tr>
              <tr><td class="px-4 py-2 border font-mono">RR</td><td class="px-4 py-2 border">bf(A)=-2 且 bf(B)=-1</td><td class="px-4 py-2 border font-mono text-emerald-600">左旋 A 一次</td></tr>
              <tr><td class="px-4 py-2 border font-mono">LR</td><td class="px-4 py-2 border">bf(A)=+2 且 bf(B)=-1</td><td class="px-4 py-2 border font-mono text-emerald-600">左旋 B → 右旋 A</td></tr>
              <tr><td class="px-4 py-2 border font-mono">RL</td><td class="px-4 py-2 border">bf(A)=-2 且 bf(B)=+1</td><td class="px-4 py-2 border font-mono text-emerald-600">右旋 B → 左旋 A</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          插入与再平衡：完整算法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          插入分两步：先像普通 BST 一样把新节点放到底部，再<strong>沿插入路径回溯</strong>，
          更新每个祖先的高度并检查平衡因子，遇到第一个失衡节点就做对应旋转。旋转后该子树高度恢复，祖先自然也不再失衡。
        </p>
        <div class="mb-4"><Code language="ts" :code="insertCode" title="avl_insert.ts" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-4">插入的执行流程拆解</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>按 BST 规则递归/迭代找到空位，插入新节点（高度初始为 1）</li>
          <li>回溯路径，自底向上更新每个节点的高度：<code>h = 1 + max(h左, h右)</code></li>
          <li>计算 bf，若 |bf| ≤ 1 则继续向上回溯</li>
          <li>若 bf=+2：看左孩子 bf 符号决定 LL（右旋）还是 LR（双旋）</li>
          <li>若 bf=-2：看右孩子 bf 符号决定 RR（左旋）还是 RL（双旋）</li>
          <li>旋转后该子树高度恢复原值，可以直接结束（至多旋转 1~2 次）</li>
        </ol>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键结论：</strong>AVL 的插入<strong>最多需要 1~2 次旋转</strong>就能恢复全局平衡。
          这是 AVL 比红黑树「更严格平衡」的代价——查找稍快（树更矮），但插入旋转次数更多。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：四种旋转
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点击按钮观察四种旋转。红 = 失衡节点（bf=±2），橙 = 旋转轴三节点。注意观察<strong>中间的节点如何「转」到根的位置</strong>。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">🌳 节点数: {{ aNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ aStatus }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ 旋转 O(1)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button v-for="b in rotBtns" :key="b.label" @mousedown="b.action" :disabled="aBusy"
            :class="[b.cls, 'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100']">{{ b.label }}</button>
        </div>
        <div ref="aBox" class="w-full relative" :style="{height:aH+'px'}">
          <v-stage :config="{width:aW, height:aH}">
            <v-layer>
              <v-line v-for="(e,i) in aEdges" :key="'e'+i" :config="aEdge(e)" />
              <v-circle v-for="n in aNodes" :key="n.id" :config="aCircle(n)" />
              <v-text v-for="n in aNodes" :key="'t'+n.id" :config="aText(n)" />
              <v-text v-for="n in aNodes.filter(x=>x.bf)" :key="'b'+n.id" :config="aBf(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>AVL 树是严格平衡的 BST</strong>，任意节点 |bf| ≤ 1，树高 ≤ 1.44 log₂n</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>平衡因子</strong> bf = height(left) − height(right)，越界（±2）即失衡</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>LL / RR 单旋</strong>：一次右旋 / 左旋；<strong>LR / RL 双旋</strong>：先拉直再单旋</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>旋转不改变中序</strong>（BST 性质保持），只改写 O(1) 个指针</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>插入后沿路径回溯</strong>，至多 1~2 次旋转恢复全局平衡</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>适用场景</strong>：读多写少（频繁查找、极少修改），如数据库索引、字典</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-2-bst/dsa-4-2-3-kth" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：第 K 小元素</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-3-balanced/dsa-4-3-2-rb-tree" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：红黑树 →</RouterLink>
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
  { id: "sec-1", name: "为什么需要平衡" },
  { id: "sec-2", name: "平衡因子" },
  { id: "sec-3", name: "LL 右旋" },
  { id: "sec-4", name: "RR 左旋" },
  { id: "sec-5", name: "LR 双旋" },
  { id: "sec-6", name: "RL 双旋" },
  { id: "sec-7", name: "插入与再平衡" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-8", name: "小结" },
]

// ===== 🎬 AVL 旋转动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const R = 24
const aW = ref(700), aH = ref(310)
const aBusy = ref(false), aStatus = ref('')
const aBox = ref<HTMLDivElement>()

interface ANode { id: number; val: number; x: number; y: number; color: string; s?: number; bf?: string }
const aNodes = reactive<ANode[]>([])
const aEdges = reactive<{ a: number; b: number }[]>([])
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

type Pt = { x: number; y: number }
interface Scene {
  nodes: { id: number; val: number; bf: string }[]
  from: Record<number, Pt>
  mid?: Record<number, Pt>
  to: Record<number, Pt>
  edgesFrom: [number, number][]
  edgesMid?: [number, number][]
  edgesTo: [number, number][]
  imbalanced: number
  midLabel: string
  finalLabel: string
}

const P = (x: number, y: number): Pt => ({ x, y })
const SC: Record<'LL' | 'RR' | 'LR' | 'RL', Scene> = {
  LL: {
    nodes: [{ id: 30, val: 30, bf: '+2' }, { id: 20, val: 20, bf: '+1' }, { id: 10, val: 10, bf: '0' }],
    from: { 30: P(300, 55), 20: P(210, 150), 10: P(130, 245) },
    to:   { 30: P(390, 150), 20: P(300, 55), 10: P(210, 150) },
    edgesFrom: [[30, 20], [20, 10]],
    edgesTo: [[20, 10], [20, 30]],
    imbalanced: 30,
    midLabel: '右旋：20 上浮为根',
    finalLabel: '平衡恢复',
  },
  RR: {
    nodes: [{ id: 10, val: 10, bf: '-2' }, { id: 20, val: 20, bf: '-1' }, { id: 30, val: 30, bf: '0' }],
    from: { 10: P(300, 55), 20: P(390, 150), 30: P(470, 245) },
    to:   { 10: P(210, 150), 20: P(300, 55), 30: P(390, 150) },
    edgesFrom: [[10, 20], [20, 30]],
    edgesTo: [[20, 10], [20, 30]],
    imbalanced: 10,
    midLabel: '左旋：20 上浮为根',
    finalLabel: '平衡恢复',
  },
  LR: {
    nodes: [{ id: 30, val: 30, bf: '+2' }, { id: 10, val: 10, bf: '-1' }, { id: 20, val: 20, bf: '0' }],
    from: { 30: P(300, 55), 10: P(210, 150), 20: P(300, 245) },
    mid:  { 30: P(300, 55), 10: P(130, 245), 20: P(210, 150) },
    to:   { 30: P(390, 150), 10: P(210, 150), 20: P(300, 55) },
    edgesFrom: [[30, 10], [10, 20]],
    edgesMid: [[30, 20], [20, 10]],
    edgesTo: [[20, 10], [20, 30]],
    imbalanced: 30,
    midLabel: '第一步：对 10 左旋 → 变成 LL',
    finalLabel: '第二步：对 30 右旋 → 平衡',
  },
  RL: {
    nodes: [{ id: 10, val: 10, bf: '-2' }, { id: 30, val: 30, bf: '+1' }, { id: 20, val: 20, bf: '0' }],
    from: { 10: P(300, 55), 30: P(390, 150), 20: P(300, 245) },
    mid:  { 10: P(300, 55), 30: P(470, 245), 20: P(390, 150) },
    to:   { 10: P(210, 150), 30: P(390, 150), 20: P(300, 55) },
    edgesFrom: [[10, 30], [30, 20]],
    edgesMid: [[10, 20], [20, 30]],
    edgesTo: [[20, 10], [20, 30]],
    imbalanced: 10,
    midLabel: '第一步：对 30 右旋 → 变成 RR',
    finalLabel: '第二步：对 10 左旋 → 平衡',
  },
}

function aEdge(e: { a: number; b: number }) {
  const pa = aNodes.find(n => n.id === e.a), pb = aNodes.find(n => n.id === e.b)
  return { points: [pa?.x ?? 0, (pa?.y ?? 0) + R, pb?.x ?? 0, (pb?.y ?? 0) - R], stroke: C.muted, strokeWidth: 2 }
}
function aCircle(n: ANode) {
  const s = n.s ?? 1
  return { x: n.x, y: n.y, radius: R * s, fill: n.color, stroke: '#475569', strokeWidth: 2,
    shadowColor: 'rgba(0,0,0,.14)', shadowBlur: 6, shadowOffsetY: 2 }
}
function aText(n: ANode) {
  return { x: n.x - R, y: n.y - R, width: R * 2, height: R * 2, text: String(n.val),
    fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: '#ffffff', align: 'center', verticalAlign: 'middle' }
}
function aBf(n: ANode) {
  return { x: n.x + R + 6, y: n.y - R, text: n.bf ?? '', fontSize: 12, fontFamily: 'monospace',
    fontStyle: 'bold', fill: C.warn }
}

async function move(from: Record<number, Pt>, to: Record<number, Pt>, steps = 8) {
  for (let s = 1; s <= steps; s++) {
    const k = s / steps
    for (const n of aNodes) {
      const a = from[n.id], b = to[n.id]
      if (a && b) { n.x = a.x + (b.x - a.x) * k; n.y = a.y + (b.y - a.y) * k }
    }
    await d(55)
  }
  for (const n of aNodes) { const b = to[n.id]; if (b) { n.x = b.x; n.y = b.y } }
}

function loadScene(sc: Scene, stage: 'from' | 'mid' | 'to') {
  const pos = stage === 'from' ? sc.from : stage === 'mid' ? (sc.mid ?? sc.to) : sc.to
  aNodes.length = 0
  sc.nodes.forEach(nd => {
    const p = pos[nd.id]
    const col = stage === 'from' ? (nd.id === sc.imbalanced ? C.red : C.orange) : (stage === 'to' ? C.green : C.orange)
    aNodes.push({ id: nd.id, val: nd.val, x: p.x, y: p.y, color: col, s: 1, bf: stage === 'to' ? '0' : nd.bf })
  })
  aEdges.length = 0
  const edges = stage === 'from' ? sc.edgesFrom : stage === 'mid' ? (sc.edgesMid ?? sc.edgesTo) : sc.edgesTo
  edges.forEach(e => aEdges.push({ a: e[0], b: e[1] }))
}

async function doRotate(type: 'LL' | 'RR' | 'LR' | 'RL') {
  if (aBusy.value) return
  aBusy.value = true
  try {
    const sc = SC[type]
    aStatus.value = `插入导致 ${sc.imbalanced} 失衡（bf=${type === 'RR' || type === 'RL' ? '-2' : '+2'}）`
    loadScene(sc, 'from')
    await d(900)

    if (sc.mid) {
      aStatus.value = sc.midLabel
      await move(sc.from, sc.mid!)
      loadScene(sc, 'mid')
      await d(600)
      aStatus.value = sc.finalLabel
      await move(sc.mid!, sc.to)
    } else {
      aStatus.value = sc.midLabel
      await move(sc.from, sc.to)
    }
    loadScene(sc, 'to')
    aStatus.value = `${type} 旋转完成：所有 |bf| ≤ 1，树恢复平衡`
    await d(900)
    aNodes.forEach(n => { n.color = C.cyan })
  } finally {
    aBusy.value = false
    aStatus.value = ''
  }
}

const rotBtns = [
  { label: 'LL 右旋', action: () => doRotate('LL'), cls: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm' },
  { label: 'RR 左旋', action: () => doRotate('RR'), cls: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm' },
  { label: 'LR 双旋', action: () => doRotate('LR'), cls: 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:border-green-300 hover:shadow-sm' },
  { label: 'RL 双旋', action: () => doRotate('RL'), cls: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm' },
  { label: '↺ Reset', action: () => { loadScene(SC.LL, 'from'); aStatus.value = '' }, cls: 'bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm' },
]

let roA: ResizeObserver | null = null
onMounted(() => {
  loadScene(SC.LL, 'from')
  if (aBox.value) {
    aW.value = aBox.value.clientWidth
    roA = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 200) aW.value = Math.max(460, w) })
    roA.observe(aBox.value)
  }
})
onUnmounted(() => roA?.disconnect())

// ===== 代码示例 =====
const bfCode = `// ===== AVL 节点与平衡因子 =====
class AVLNode {
    val: number
    left: AVLNode | null
    right: AVLNode | null
    height: number          // 关键字段：以本节点为根的子树高度

    constructor(val: number) {
        this.val = val
        this.left = null
        this.right = null
        this.height = 1      // 叶子节点高度 = 1
    }
}

function height(node: AVLNode | null): number {
    return node ? node.height : 0   // 空节点高度 = 0
}

// 平衡因子 = 左子树高度 − 右子树高度
function balanceFactor(node: AVLNode): number {
    return height(node.left) - height(node.right)
}

// 更新高度：1 + 左右子树较高者
function updateHeight(node: AVLNode): void {
    node.height = 1 + Math.max(height(node.left), height(node.right))
}

// 判断是否失衡：|bf| > 1
function isUnbalanced(node: AVLNode): boolean {
    const bf = balanceFactor(node)
    return bf > 1 || bf < -1
}

// 手动模拟一棵树的平衡因子
//        30(bf=-1)
//       /  \\
//     20(0) 40(+1)
//             \\
//             35(0)
// 40 的 bf = height(null) - height(35) = 0 - 1 = ... 实际应为 +1
// 30 的 bf = height(20) - height(40) = 1 - 2 = -1
// 所有 |bf| ≤ 1 → 平衡`

const rotateCode = `// ===== 右旋（LL 型）=====
// 以 y 为轴右旋，返回新的子树根 x
function rotateRight(y: AVLNode): AVLNode {
    const x = y.left!            // x 是 y 的左孩子
    const t = x.right            // x 的右子树（要挪给 y 当左子树）

    x.right = y                  // 1. y 变成 x 的右孩子
    y.left = t                   // 2. x 原来的右子树挂到 y 的左子树

    updateHeight(y)              // 先更新下面的节点
    updateHeight(x)              // 再更新上面的节点
    return x
}

// ===== 左旋（RR 型）=====
// 以 x 为轴左旋，返回新的子树根 y
function rotateLeft(x: AVLNode): AVLNode {
    const y = x.right!           // y 是 x 的右孩子
    const t = y.left             // y 的左子树（要挪给 x 当右子树）

    y.left = x                   // 1. x 变成 y 的左孩子
    x.right = t                  // 2. y 原来的左子树挂到 x 的右子树

    updateHeight(x)
    updateHeight(y)
    return y
}

// 旋转前后中序序列不变：以 LL 为例
// 前: [10, 20, 30]  后: [10, 20, 30]  —— BST 性质保持
// 变化的只是父子关系：30 从根降为右孩子，20 从左孩子升为根`

const doubleRotateCode = `// ===== LR 双旋：先左旋左孩子，再右旋根 =====
// 场景：失衡节点 y（bf=+2），左孩子 x 的右子树更重（bf=-1）
function rebalanceLR(y: AVLNode): AVLNode {
    y.left = rotateLeft(y.left!)   // 第一步：对 x 左旋 → 变成 LL 型
    return rotateRight(y)          // 第二步：对 y 右旋
}

// ===== RL 双旋：先右旋右孩子，再左旋根 =====
function rebalanceRL(y: AVLNode): AVLNode {
    y.right = rotateRight(y.right!) // 第一步：对 x 右旋 → 变成 RR 型
    return rotateLeft(y)            // 第二步：对 y 左旋
}

// 双旋的本质：把「折线」先拉直成「直线」，再单旋解决
// LR:  30 → 30 → 20
//     /    /    / \\
//    10   20   10 30
//     \\  /
//      20 10
// 中间的 20 最终被转到根的位置`

const insertCode = `// ===== AVL 插入 + 再平衡（完整）=====
function insert(root: AVLNode | null, val: number): AVLNode {
    // 1) 普通 BST 插入
    if (root === null) return new AVLNode(val)
    if (val < root.val) root.left = insert(root.left, val)
    else if (val > root.val) root.right = insert(root.right, val)
    else return root               // 已存在，不处理

    // 2) 自底向上更新高度
    updateHeight(root)

    // 3) 检查平衡因子，失衡则旋转
    const bf = balanceFactor(root)

    // LL 型：左左
    if (bf > 1 && val < root.left!.val) {
        return rotateRight(root)
    }
    // RR 型：右右
    if (bf < -1 && val > root.right!.val) {
        return rotateLeft(root)
    }
    // LR 型：左右
    if (bf > 1 && val > root.left!.val) {
        root.left = rotateLeft(root.left!)
        return rotateRight(root)
    }
    // RL 型：右左
    if (bf < -1 && val < root.right!.val) {
        root.right = rotateRight(root.right!)
        return rotateLeft(root)
    }

    return root                     // 平衡，直接返回
}

// ===== 使用示例：依次插入 10, 20, 30 =====
// insert(null, 10) → [10]
// insert(root, 20) → 10 右孩子 20（bf=-1，仍平衡）
// insert(root, 30) → 10 的 bf=-2（RR 型）→ 左旋 → 20 成根
// 最终:   20
//         / \\
//       10   30   （平衡）
//
// 复杂度：插入 O(log n)（BST 查找）+ 旋转 O(1)
// 关键：旋转后子树高度恢复，祖先不会再失衡，至多 1~2 次旋转`
</script>
