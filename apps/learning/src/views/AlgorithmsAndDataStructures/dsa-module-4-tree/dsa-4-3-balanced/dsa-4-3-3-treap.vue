<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🎲 Treap 与随机化平衡</h1>
          <p class="text-sm text-slate-500 mt-1">Tree + Heap：随机优先级同时满足 BST 序与堆序，期望 O(log n)</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-3-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：一棵同时满足两种序的树
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Treap = <strong>Tree</strong>（二叉搜索树）+ <strong>Heap</strong>（堆）。每个节点除了值 <code>val</code>，还带一个<strong>随机优先级 <code>priority</code></strong>。
          整棵树同时满足两条序：按 <code>val</code> 满足<strong>BST 序</strong>（左小右大），按 <code>priority</code> 满足<strong>堆序</strong>（这里是「父优先级 ≤ 子优先级」的最小堆）。
          随机优先级让树「平均意义上」接近一棵随机 BST，从而<strong>期望高度 O(log n)</strong>，不需要红黑树那套复杂的颜色规则。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="tp-st" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">Treap：按 val 满足 BST 序（左小右大），按 priority 满足堆序（父 ≤ 子，最小堆）</text>

            <!-- 边 -->
            <line x1="360" y1="79" x2="220" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#tp-st)" />
            <line x1="360" y1="79" x2="500" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#tp-st)" />
            <line x1="220" y1="174" x2="130" y2="221" stroke="#94a3b8" stroke-width="2" marker-end="url(#tp-st)" />
            <line x1="220" y1="174" x2="310" y2="221" stroke="#94a3b8" stroke-width="2" marker-end="url(#tp-st)" />
            <line x1="500" y1="174" x2="450" y2="221" stroke="#94a3b8" stroke-width="2" marker-end="url(#tp-st)" />

            <!-- 空子节点（15 的右孩子 NIL） -->
            <line x1="500" y1="174" x2="560" y2="221" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="560" cy="245" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="560" y="245" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">null</text>

            <!-- 节点（圆：val；上方徽章：priority） -->
            <!-- 根 7 p=10 -->
            <rect x="330" y="6" width="60" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="360" y="15" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">p=10</text>
            <circle cx="360" cy="55" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="55" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <!-- 3 p=20 -->
            <rect x="190" y="102" width="60" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="220" y="111" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">p=20</text>
            <circle cx="220" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="220" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <!-- 15 p=30 -->
            <rect x="470" y="102" width="60" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="500" y="111" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">p=30</text>
            <circle cx="500" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="500" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">15</text>
            <!-- 1 p=40 -->
            <rect x="100" y="197" width="60" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="130" y="206" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">p=40</text>
            <circle cx="130" cy="245" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="130" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <!-- 5 p=50 -->
            <rect x="280" y="197" width="60" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="310" y="206" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">p=50</text>
            <circle cx="310" cy="245" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="310" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <!-- 12 p=60 -->
            <rect x="420" y="197" width="60" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="450" y="206" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">p=60</text>
            <circle cx="450" cy="245" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="450" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">12</text>

            <text x="16" y="292" font-size="11" font-family="monospace" fill="#64748b">校验堆序：p(7)=10 &lt; p(3)=20 &lt; p(1)=40 —— 每条父→子链的 priority 都递增</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Treap 结构 —— 圆内是 val，上方黄色徽章是随机 priority；BST 序 + 堆序同时成立</figcaption>
        </figure>

        <!-- 操作示意图：插入上浮旋转 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">核心操作：插入 → 堆序被破坏 → 旋转上浮</h3>
        <figure>
          <svg viewBox="0 0 720 230" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs><marker id="tp-op" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker></defs>
            <!-- before -->
            <text x="120" y="24" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">插入前</text>
            <line x1="180" y1="79" x2="120" y2="126" stroke="#94a3b8" stroke-width="2" />
            <line x1="180" y1="79" x2="240" y2="126" stroke="#94a3b8" stroke-width="2" />
            <line x1="120" y1="174" x2="170" y2="196" stroke="#4ade80" stroke-width="2" stroke-dasharray="4 3" />
            <rect x="150" y="6" width="60" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="180" y="15" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">p=5</text>
            <circle cx="180" cy="55" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="180" y="55" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#fff">10</text>
            <rect x="90" y="102" width="60" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="120" y="111" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">p=20</text>
            <circle cx="120" cy="150" r="22" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="120" y="150" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#fff">4</text>
            <rect x="210" y="102" width="60" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="240" y="111" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">p=30</text>
            <circle cx="240" cy="150" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="240" y="150" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#fff">15</text>
            <rect x="140" y="192" width="60" height="18" rx="4" fill="#bbf7d0" stroke="#4ade80" stroke-width="1" />
            <text x="170" y="201" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#166534">p=8</text>
            <circle cx="170" cy="218" r="22" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="170" y="218" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">6</text>
            <text x="120" y="228" text-anchor="middle" font-size="10" font-family="monospace" fill="#ef4444">6(p=8) 是 4 的右孩子，8 &lt; 20 破坏堆序</text>

            <line x1="350" y1="55" x2="388" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#tp-op)" />
            <text x="369" y="38" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">左旋</text>

            <!-- after -->
            <text x="550" y="24" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">插入后（6 上浮）</text>
            <line x1="560" y1="79" x2="470" y2="126" stroke="#94a3b8" stroke-width="2" />
            <line x1="560" y1="79" x2="650" y2="126" stroke="#94a3b8" stroke-width="2" />
            <line x1="470" y1="174" x2="430" y2="196" stroke="#94a3b8" stroke-width="2" />
            <rect x="530" y="6" width="60" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="560" y="15" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">p=5</text>
            <circle cx="560" cy="55" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="560" y="55" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#fff">10</text>
            <rect x="440" y="102" width="60" height="18" rx="4" fill="#bbf7d0" stroke="#4ade80" stroke-width="1" />
            <text x="470" y="111" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#166534">p=8</text>
            <circle cx="470" cy="150" r="22" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="470" y="150" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">6</text>
            <rect x="620" y="102" width="60" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="650" y="111" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">p=30</text>
            <circle cx="650" cy="150" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="650" y="150" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#fff">15</text>
            <rect x="400" y="192" width="60" height="18" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" />
            <text x="430" y="201" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">p=20</text>
            <circle cx="430" cy="218" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="430" y="218" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#fff">4</text>
            <text x="560" y="228" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a">左旋后：6 上浮、4 下沉，堆序恢复</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：插入 (6, p=8) 后 8 &lt; 父 20 破坏堆序 → 以 4 为轴左旋，6 上浮为 4 的父，堆序恢复</figcaption>
        </figure>
      </section>

      <!-- 1. 双序 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          双序：BST 序 + 堆序
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Treap 的巧妙之处在于<strong>一个结构同时满足两条序</strong>：
        </p>
        <ul class="space-y-2 text-slate-600 mb-4 text-sm leading-relaxed">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>BST 序（按 val）</strong>：左子树所有 val &lt; 根 val &lt; 右子树所有 val → 支持 O(log n) 查找、有序遍历</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>堆序（按 priority）</strong>：父节点的 priority ≤ 子节点（最小堆）→ 保证「根是全树 priority 最小的节点」</span></li>
        </ul>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          一个有趣的结论：给定一组 (val, priority) 对，<strong>满足这两条序的 Treap 形状是唯一的</strong>——
          它等价于「按 priority 从小到大依次插入」得到的普通 BST。这个等价性正是随机化平衡的关键。
        </p>
        <div class="mb-4"><Code language="ts" :code="nodeCode" title="treap_node.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Treap 就像给一棵 BST 的每个节点<strong>随机发一张「优先级彩票」</strong>，再用堆序强制「彩票号最小的当树根」。<br/>
          这类似 <strong>Redis 的跳表（Skip List）</strong>——跳表给每个节点随机一个「层数」，用随机性把链表「拔高」成 O(log n)；
          Treap 用随机优先级把 BST「压扁」成期望 O(log n)。两者都靠<strong>随机化代替复杂的确定性规则</strong>。<br/>
          也像 <strong>React 的 <code>key</code> 打散列表</strong>：不给 key 时 React 按位置 diff 可能退化，给了稳定随机 key 才能正确复用节点——随机/稳定的标识让结构保持「健康」。
          </p>
        </aside>
      </section>

      <!-- 2. 为什么随机化能保证平衡 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          为什么随机化能保证平衡
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          关键等价关系：<strong>「按随机 priority 建 Treap」 == 「按随机顺序建 BST」</strong>。
          因为 priority 最小的节点成为根，递归地，左右子树分别由剩余节点中 priority 最小的当根……
          这恰好等价于「随机打乱插入顺序，每次新插入的都作为当前根/子树根」。
        </p>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          而「<strong>随机顺序插入的 BST，期望高度是 O(log n)</strong>」是经典结论：每次插入，新元素有约 1/2 的概率落在两侧较平衡的位置，
          累积起来树不会长成单链。所以 Treap 的<strong>期望高度是 O(log n)</strong>——不是「最坏 O(log n)」（那是 AVL/红黑树），
          而是「<strong>期望</strong> O(log n)」，极端运气差（priority 恰好有序）仍会退化成链，但概率极小。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">结构</th><th class="px-4 py-2 border border-slate-200 font-semibold">平衡保证</th><th class="px-4 py-2 border border-slate-200 font-semibold">高度</th><th class="px-4 py-2 border border-slate-200 font-semibold">平衡手段</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">AVL 树</td><td class="px-4 py-2 border text-emerald-600 font-semibold">最坏 O(log n)</td><td class="px-4 py-2 border font-mono">≤ 1.44 log₂n</td><td class="px-4 py-2 border">平衡因子 + 旋转</td></tr>
              <tr><td class="px-4 py-2 border font-mono">红黑树</td><td class="px-4 py-2 border text-emerald-600 font-semibold">最坏 O(log n)</td><td class="px-4 py-2 border font-mono">≤ 2 log₂n</td><td class="px-4 py-2 border">颜色约束 + 旋转/变色</td></tr>
              <tr><td class="px-4 py-2 border font-mono">Treap</td><td class="px-4 py-2 border text-amber-600 font-semibold">期望 O(log n)</td><td class="px-4 py-2 border font-mono">期望 ≈ 2.1 log₂n</td><td class="px-4 py-2 border">随机优先级 + 堆序旋转</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 权衡：</strong>Treap 牺牲了「最坏情况保证」换来了<strong>实现极简</strong>——
          没有 AVL 的平衡因子、没有红黑树的分 case 变色，只有「插入后一直往上旋转」一件事。
          代码量是三种平衡树里最少的，非常适合竞赛或快速实现。</p>
        </aside>
      </section>

      <!-- 3. 旋转与插入 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          左旋 / 右旋 + 插入上浮
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Treap 的插入比红黑树简单得多：先像普通 BST 一样把新节点挂到底部，然后<strong>只要子节点的 priority 比父小，就旋转把子节点「浮」上去</strong>，
          直到堆序恢复。左旋/右旋与 AVL/红黑树的旋转完全一样，只是这里用旋转来<strong>维护堆序</strong>而不是高度差。
        </p>
        <div class="mb-4"><Code language="ts" :code="insertCode" title="treap_insert.ts" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-4">插入的执行流程拆解</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>为 val 生成一个随机 priority（范围足够大，避免碰撞）</li>
          <li>按 BST 规则（val 左小右大）递归找到空位，挂上新节点</li>
          <li>回溯时比较：左孩子 priority &lt; 父 → 右旋；右孩子 priority &lt; 父 → 左旋</li>
          <li>每旋转一次，破坏堆序的节点就「上浮」一层，直到堆序恢复</li>
        </ol>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 关键洞察：</strong>旋转<strong>不改变 BST 序</strong>（中序不变），只改变父子层级。
          所以「为了堆序而旋转」不会破坏「按 val 的有序性」——这正是 Treap 能同时满足双序的根本原因。</p>
        </aside>
      </section>

      <!-- 4. 删除 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          删除：旋转下沉到叶子
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Treap 的删除思路很直观：要删的节点<strong>通过旋转不断「下沉」成叶子，再直接摘掉</strong>。
          每次旋转都让 priority 更小的孩子上浮、让目标节点下沉，直到它没有孩子，摘除即可。
        </p>
        <div class="mb-4"><Code language="ts" :code="removeCode" title="treap_remove.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>priority 碰撞</strong>——如果两个节点 priority 相同，堆序「≤」允许相等但会破坏唯一性；务必用足够大的随机范围（如 1e9）降低碰撞概率。<br/>
          ② <strong>用固定 priority（如按 val 或插入序）</strong>——那就退化成普通 BST 或退化成链，随机化平衡失效。<br/>
          ③ <strong>旋转方向搞反</strong>——左孩子 priority 更小要<strong>右旋</strong>（左孩子上浮），右孩子 priority 更小要<strong>左旋</strong>；记「哪边孩子小，就往哪边转上来」。
          </p>
        </aside>
      </section>

      <!-- 5. 对比 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          三种平衡树怎么选
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          三种自平衡 BST 各有取舍，一句话记忆：<strong>AVL 读最快、红黑树读写均衡、Treap 实现最简单</strong>。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold">AVL</th><th class="px-4 py-2 border border-slate-200 font-semibold">红黑树</th><th class="px-4 py-2 border border-slate-200 font-semibold">Treap</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">实现难度</td><td class="px-4 py-2 border">中（4 种旋转）</td><td class="px-4 py-2 border text-red-600">高（插入/删除多 case）</td><td class="px-4 py-2 border text-emerald-600">低（就一个上浮旋转）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">最坏复杂度</td><td class="px-4 py-2 border font-mono text-emerald-600">O(log n)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(log n)</td><td class="px-4 py-2 border font-mono text-amber-600">期望 O(log n)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">额外空间</td><td class="px-4 py-2 border">height 字段</td><td class="px-4 py-2 border">color 字段</td><td class="px-4 py-2 border">priority 字段</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">适用场景</td><td class="px-4 py-2 border">读多写少</td><td class="px-4 py-2 border">读写均衡（工业）</td><td class="px-4 py-2 border">竞赛/快速原型</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 延伸：</strong>Treap 的「随机优先级 + 旋转」思想还能扩展成<strong>隐式 Treap（Implicit Treap）</strong>，
          用子树大小 <code>size</code> 作为 BST 序，能在 O(log n) 内完成「区间翻转 / 区间查询 / 按位置插入删除」，
          是平衡树处理「序列/数组问题」的利器。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：插入 → 上浮旋转恢复堆序
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          圆内是 val，上方徽章是 priority。插入 (6, p=8) 后，8 &lt; 父 20 破坏堆序 → 左旋让 6 上浮、4 下沉。绿色 = 新节点，橙圈 = 破坏堆序的父节点。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ tpNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ tpStatus }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ 插入期望 O(log n)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doInsert" :disabled="tpBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">➕ 插入 (6, p=8)</button>
          <button @mousedown="doReset" :disabled="tpBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="tpBox" class="w-full relative" :style="{height: tpH+'px'}">
          <v-stage :config="{width: tpW, height: tpH}">
            <v-layer>
              <v-line v-for="(e,i) in tpEdges" :key="'e'+i" :config="tpEdge(e)" />
              <v-circle v-for="n in tpNodes" :key="n.id" :config="tpCircle(n)" />
              <v-text v-for="n in tpNodes" :key="'t'+n.id" :config="tpText(n)" />
              <v-text v-for="n in tpNodes" :key="'p'+n.id" :config="tpPri(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Treap = Tree + Heap</strong>：按 val 满足 BST 序，按随机 priority 满足堆序</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>随机化保证平衡</strong>：随机 priority 建树 == 随机顺序建 BST，期望高度 O(log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>插入</strong>：BST 插入 + 上浮旋转恢复堆序（左孩子小右旋、右孩子小左旋）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>删除</strong>：旋转下沉到叶子再摘除，O(log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>旋转不改变 BST 序</strong>，所以「为堆序旋转」不会破坏「按 val 的有序性」</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>对比</strong>：AVL 读最快、红黑树读写均衡、Treap 实现最简单（代价是「期望」而非「最坏」O(log n)）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-3-balanced/dsa-4-3-2-rb-tree" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：红黑树</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-4-btree/dsa-4-4-1-b-tree" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：B 树 →</RouterLink>
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
  { id: "sec-1", name: "双序：BST + 堆" },
  { id: "sec-2", name: "为什么随机化平衡" },
  { id: "sec-3", name: "旋转与插入" },
  { id: "sec-4", name: "删除下沉" },
  { id: "sec-5", name: "三种平衡树对比" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 Treap 动画 =====
const tpR = 24
const tpW = ref(700), tpH = ref(320)
const tpBusy = ref(false), tpStatus = ref('')
const tpBox = ref<HTMLDivElement>()
const tpD = (ms: number) => new Promise(r => setTimeout(r, ms))

interface TPNode { id: number; val: number; pri: number; x: number; y: number; s?: number; glow?: string }
const tpNodes = reactive<TPNode[]>([])
const tpEdges = reactive<{ a: number; b: number }[]>([])

function tpFind(id: number): TPNode { return tpNodes.find(n => n.id === id)! }

function tpBuild(nodes: { id: number; val: number; pri: number; x: number; y: number }[], edges: [number, number][]) {
  tpNodes.length = 0; tpEdges.length = 0
  nodes.forEach(n => tpNodes.push({ id: n.id, val: n.val, pri: n.pri, x: n.x, y: n.y, s: 1 }))
  edges.forEach(e => tpEdges.push({ a: e[0], b: e[1] }))
}

function tpEdge(e: { a: number; b: number }) {
  const pa = tpFind(e.a), pb = tpFind(e.b)
  return { points: [pa.x, pa.y + tpR, pb.x, pb.y - tpR], stroke: '#94a3b8', strokeWidth: 2 }
}
function tpCircle(n: TPNode) {
  const s = n.s ?? 1
  return { x: n.x, y: n.y, radius: tpR * s, fill: '#06b6d4', stroke: n.glow ?? '#0891b2',
    strokeWidth: n.glow ? 3 : 2, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function tpText(n: TPNode) {
  const s = n.s ?? 1
  return { x: n.x - tpR, y: n.y - tpR, width: tpR * 2, height: tpR * 2, text: String(n.val),
    fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: '#fff', align: 'center', verticalAlign: 'middle', scale: { x: s, y: s } }
}
function tpPri(n: TPNode) {
  const s = n.s ?? 1
  return { x: n.x - 30, y: n.y - tpR - 24, width: 60, height: 16, text: 'p=' + n.pri,
    fontSize: 11, fontFamily: 'monospace', fill: '#92400e', align: 'center', verticalAlign: 'middle', scale: { x: s, y: s } }
}

async function tpMove(from: Record<number, { x: number; y: number }>, to: Record<number, { x: number; y: number }>, steps = 8) {
  for (let s = 1; s <= steps; s++) {
    const k = s / steps
    for (const n of tpNodes) {
      const a = from[n.id], b = to[n.id]
      if (a && b) { n.x = a.x + (b.x - a.x) * k; n.y = a.y + (b.y - a.y) * k }
    }
    await tpD(55)
  }
  for (const n of tpNodes) { const b = to[n.id]; if (b) { n.x = b.x; n.y = b.y } }
}

async function doInsert() {
  if (tpBusy.value) return
  tpBusy.value = true
  try {
    tpStatus.value = '初始 Treap：10(p=5) 根，4(p=20)、15(p=30)'
    tpBuild(
      [{ id: 10, val: 10, pri: 5, x: 360, y: 60 }, { id: 4, val: 4, pri: 20, x: 230, y: 170 }, { id: 15, val: 15, pri: 30, x: 490, y: 170 }],
      [[10, 4], [10, 15]],
    )
    await tpD(900)

    tpStatus.value = '插入 (6, p=8)：按 BST 序挂在 4 的右孩子'
    tpNodes.push({ id: 6, val: 6, pri: 8, x: 305, y: 280, s: 0 })
    tpEdges.push({ a: 4, b: 6 })
    await tpD(80); tpFind(6).s = 1; await tpD(500)

    tpStatus.value = '堆序被破坏：6 的 p=8 < 父 4 的 p=20'
    tpFind(6).glow = '#f59e0b'; tpFind(4).glow = '#f59e0b'; await tpD(900)

    tpStatus.value = '左旋：6 上浮，4 下沉为 6 的左孩子'
    await tpMove(
      { 10: { x: 360, y: 60 }, 4: { x: 230, y: 170 }, 15: { x: 490, y: 170 }, 6: { x: 305, y: 280 } },
      { 10: { x: 360, y: 60 }, 4: { x: 145, y: 280 }, 15: { x: 490, y: 170 }, 6: { x: 230, y: 170 } },
    )
    tpEdges.length = 0
    tpEdges.push({ a: 10, b: 6 }, { a: 10, b: 15 }, { a: 6, b: 4 })
    await tpD(300)

    tpStatus.value = '堆序恢复：p(6)=8 > p(10)=5 → 满足父 ≤ 子，停止上浮'
    tpFind(6).glow = undefined; tpFind(4).glow = undefined; await tpD(900)
  } finally { tpBusy.value = false; tpStatus.value = '' }
}

function doReset() {
  tpBuild(
    [{ id: 10, val: 10, pri: 5, x: 360, y: 60 }, { id: 4, val: 4, pri: 20, x: 230, y: 170 }, { id: 15, val: 15, pri: 30, x: 490, y: 170 }],
    [[10, 4], [10, 15]],
  )
  tpStatus.value = ''
}

let roTp: ResizeObserver | null = null
onMounted(() => {
  doReset()
  if (tpBox.value) {
    tpW.value = tpBox.value.clientWidth
    roTp = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 200) { tpW.value = w } })
    roTp.observe(tpBox.value)
  }
})
onUnmounted(() => roTp?.disconnect())

// ===== 代码示例 =====
const nodeCode = `// ===== Treap 节点：val + 随机 priority =====
class TreapNode {
    val: number
    priority: number      // 随机优先级，越小越靠上（最小堆）
    left: TreapNode | null
    right: TreapNode | null

    constructor(val: number, priority: number) {
        this.val = val
        this.priority = priority
        this.left = null
        this.right = null
    }
}

// ===== 双序（同时成立）=====
// BST 序（按 val）：左子树所有 val < 根 val < 右子树所有 val
// 堆序（按 priority，最小堆）：父 priority ≤ 子 priority
//
// 等价结论：给定一组 (val, priority) 对，满足双序的 Treap 形状唯一，
// 它等价于「按 priority 从小到大依次插入」得到的普通 BST。
//
// 随机生成 priority（范围越大，碰撞概率越低）
function randomPriority(): number {
    return Math.floor(Math.random() * 1e9)   // 0 ~ 999,999,999
}`

const insertCode = `// ===== 左旋 / 右旋（与 AVL/红黑树一致）=====
function rotateLeft(x: TreapNode): TreapNode {
    const y = x.right!      // 右孩子上浮
    x.right = y.left
    y.left = x
    return y
}
function rotateRight(y: TreapNode): TreapNode {
    const x = y.left!       // 左孩子上浮
    y.left = x.right
    x.right = y
    return x
}

// ===== 插入：BST 插入 + 上浮旋转恢复堆序 =====
function insert(root: TreapNode | null, val: number, priority: number): TreapNode {
    if (!root) return new TreapNode(val, priority)

    if (val < root.val) {
        root.left = insert(root.left, val, priority)
        // 左孩子 priority 更小 → 破坏堆序 → 右旋把左孩子浮上来
        if (root.left.priority < root.priority) {
            root = rotateRight(root)
        }
    } else if (val > root.val) {
        root.right = insert(root.right, val, priority)
        // 右孩子 priority 更小 → 左旋把右孩子浮上来
        if (root.right.priority < root.priority) {
            root = rotateLeft(root)
        }
    }
    return root
}

// 手动模拟：插入 (6, p=8) 到 {10(p=5), 4(p=20), 15(p=30)}
// 6 > 4 → 挂到 4 的右孩子；8 < 20 → 破坏堆序 → 左旋
// 左旋后 6 上浮为 4 的父；6 的父是 10，8 < 5 不成立 → 停止
// 结果：
//        10(p=5)
//       /        \\
//    6(p=8)    15(p=30)
//    /
//  4(p=20)
// 复杂度：期望 O(log n)（BST 查找深度 + 期望 O(log n) 次旋转）`

const removeCode = `// ===== 删除：旋转下沉到叶子，再摘掉 =====
function remove(root: TreapNode | null, val: number): TreapNode | null {
    if (!root) return null
    if (val < root.val) {
        root.left = remove(root.left, val)
    } else if (val > root.val) {
        root.right = remove(root.right, val)
    } else {
        // 找到了目标节点
        if (!root.left) return root.right      // 无左孩子，直接用右孩子顶替
        if (!root.right) return root.left      // 无右孩子，直接用左孩子顶替
        // 双孩子：让 priority 更小的孩子上浮，目标节点继续下沉
        if (root.left.priority < root.right.priority) {
            root = rotateRight(root)           // 左孩子上浮
            root.right = remove(root.right, val)
        } else {
            root = rotateLeft(root)            // 右孩子上浮
            root.left = remove(root.left, val)
        }
    }
    return root
}

// 删除思路：目标节点被旋转「挤」到叶子位置后，直接返回 null 摘除。
// 每次旋转让 priority 更小的孩子上位，把目标往下压。
// 复杂度：期望 O(log n)。`
</script>
