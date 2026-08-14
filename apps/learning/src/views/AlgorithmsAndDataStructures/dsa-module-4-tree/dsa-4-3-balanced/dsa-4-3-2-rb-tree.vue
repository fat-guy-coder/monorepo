<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌲 红黑树：5条性质 / 插入修复 / 删除修复</h1>
          <p class="text-sm text-slate-500 mt-1">用「红/黑」两种颜色约束树高——插入删除旋转更少，工业界的自平衡首选</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-3-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：一棵「带颜色」的自平衡 BST
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          红黑树（Red-Black Tree）是一种<strong>自平衡二叉搜索树</strong>，它的平衡不是靠「高度差 ≤ 1」这种硬指标（那是 AVL），
          而是靠<strong>给每个节点涂上红/黑两种颜色</strong>，再用 5 条性质约束颜色分布，间接把树高压到 <code>O(log n)</code>。
          代价是树比 AVL 稍高（≤ 2·log₂n），但插入/删除需要的<strong>旋转更少</strong>——这正是它统治工业界的原因。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 360" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="rb-st" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">红黑树：红节点 #ef4444 / 黑节点 #1e293b / NIL 叶 = 黑哨兵</text>

            <!-- 边 -->
            <line x1="360" y1="74" x2="200" y2="116" stroke="#94a3b8" stroke-width="2" marker-end="url(#rb-st)" />
            <line x1="360" y1="74" x2="520" y2="116" stroke="#94a3b8" stroke-width="2" marker-end="url(#rb-st)" />
            <line x1="200" y1="164" x2="110" y2="206" stroke="#94a3b8" stroke-width="2" marker-end="url(#rb-st)" />
            <line x1="200" y1="164" x2="290" y2="206" stroke="#94a3b8" stroke-width="2" marker-end="url(#rb-st)" />
            <line x1="520" y1="164" x2="430" y2="206" stroke="#94a3b8" stroke-width="2" marker-end="url(#rb-st)" />
            <line x1="520" y1="164" x2="610" y2="206" stroke="#94a3b8" stroke-width="2" marker-end="url(#rb-st)" />

            <!-- NIL 叶节点（黑哨兵，虚线） -->
            <line x1="110" y1="254" x2="80" y2="296" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="80" cy="320" r="16" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="80" y="320" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">NIL</text>
            <line x1="110" y1="254" x2="140" y2="296" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="140" cy="320" r="16" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="140" y="320" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">NIL</text>
            <line x1="430" y1="254" x2="400" y2="296" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="400" cy="320" r="16" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="400" y="320" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">NIL</text>
            <line x1="430" y1="254" x2="460" y2="296" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="460" cy="320" r="16" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="460" y="320" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">NIL</text>

            <!-- 节点（黑 #1e293b / 红 #ef4444） -->
            <circle cx="360" cy="50" r="24" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
            <text x="360" y="50" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">13</text>
            <circle cx="200" cy="140" r="24" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
            <text x="200" y="140" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <circle cx="520" cy="140" r="24" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
            <text x="520" y="140" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">17</text>
            <circle cx="110" cy="230" r="24" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
            <text x="110" y="230" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <circle cx="290" cy="230" r="24" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
            <text x="290" y="230" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">11</text>
            <circle cx="430" cy="230" r="24" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
            <text x="430" y="230" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">15</text>
            <circle cx="610" cy="230" r="24" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
            <text x="610" y="230" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">25</text>

            <text x="16" y="352" font-size="11" font-family="monospace" fill="#64748b">黑高验证：任一路径黑节点数都相等（如 13→8→1→NIL 与 13→17→25→NIL 都是 3 个黑）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：红黑树结构 —— 根黑、红节点孩子皆黑、所有 NIL 叶为黑哨兵、黑高一致</figcaption>
        </figure>

        <!-- 操作示意图：插入修复两种情况 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">核心操作：插入导致的「红-红」冲突如何修复</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- 叔叔红 → 变色 -->
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">Case 1：叔叔红 → 变色（不旋转）</p>
            <svg viewBox="0 0 440 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs><marker id="rb-c1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker></defs>
              <line x1="115" y1="58" x2="80" y2="94" stroke="#94a3b8" stroke-width="2" />
              <line x1="115" y1="58" x2="150" y2="94" stroke="#94a3b8" stroke-width="2" />
              <line x1="80" y1="130" x2="50" y2="148" stroke="#94a3b8" stroke-width="2" />
              <circle cx="115" cy="40" r="18" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
              <text x="115" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">10</text>
              <circle cx="80" cy="112" r="18" fill="#ef4444" stroke="#f59e0b" stroke-width="3" />
              <text x="80" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">5</text>
              <circle cx="150" cy="112" r="18" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
              <text x="150" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">20</text>
              <circle cx="50" cy="166" r="18" fill="#ef4444" stroke="#4ade80" stroke-width="3" />
              <text x="50" y="166" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">1</text>
              <text x="120" y="188" text-anchor="middle" font-size="10" font-family="monospace" fill="#ef4444">插入 1(红)：5、1 红红冲突</text>
              <line x1="230" y1="40" x2="268" y2="40" stroke="#94a3b8" stroke-width="2" marker-end="url(#rb-c1)" />
              <text x="249" y="28" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">变色</text>
              <line x1="330" y1="58" x2="295" y2="94" stroke="#94a3b8" stroke-width="2" />
              <line x1="330" y1="58" x2="365" y2="94" stroke="#94a3b8" stroke-width="2" />
              <line x1="295" y1="130" x2="265" y2="148" stroke="#94a3b8" stroke-width="2" />
              <circle cx="330" cy="40" r="18" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
              <text x="330" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">10</text>
              <circle cx="295" cy="112" r="18" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
              <text x="295" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">5</text>
              <circle cx="365" cy="112" r="18" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
              <text x="365" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">20</text>
              <circle cx="265" cy="166" r="18" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
              <text x="265" y="166" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">1</text>
              <text x="330" y="188" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a">5、20 变黑，10 保持黑</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">叔叔 20 是红 → 父 5、叔 20 变黑，祖父 10 变红（根再染回黑）</figcaption>
          </figure>
          <!-- 叔叔黑 → 旋转+变色 -->
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">Case 2：叔叔黑 → 旋转 + 变色</p>
            <svg viewBox="0 0 440 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs><marker id="rb-c2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker></defs>
              <line x1="115" y1="58" x2="80" y2="94" stroke="#94a3b8" stroke-width="2" />
              <line x1="80" y1="130" x2="50" y2="148" stroke="#94a3b8" stroke-width="2" />
              <line x1="115" y1="58" x2="150" y2="94" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <circle cx="150" cy="112" r="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="150" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">NIL</text>
              <circle cx="115" cy="40" r="18" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
              <text x="115" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">10</text>
              <circle cx="80" cy="112" r="18" fill="#ef4444" stroke="#f59e0b" stroke-width="3" />
              <text x="80" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">5</text>
              <circle cx="50" cy="166" r="18" fill="#ef4444" stroke="#4ade80" stroke-width="3" />
              <text x="50" y="166" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">3</text>
              <text x="115" y="188" text-anchor="middle" font-size="10" font-family="monospace" fill="#ef4444">叔叔 NIL(黑) → 右旋+变色</text>
              <line x1="230" y1="40" x2="268" y2="40" stroke="#94a3b8" stroke-width="2" marker-end="url(#rb-c2)" />
              <text x="249" y="28" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">右旋</text>
              <line x1="330" y1="58" x2="295" y2="94" stroke="#94a3b8" stroke-width="2" />
              <line x1="330" y1="58" x2="365" y2="94" stroke="#94a3b8" stroke-width="2" />
              <circle cx="330" cy="40" r="18" fill="#1e293b" stroke="#0f172a" stroke-width="2" />
              <text x="330" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">5</text>
              <circle cx="295" cy="112" r="18" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
              <text x="295" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">3</text>
              <circle cx="365" cy="112" r="18" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
              <text x="365" y="112" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">10</text>
              <text x="330" y="188" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a">5 上位变黑，10 降位变红</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">叔叔 NIL（黑）→ 右旋（LL）把 5 浮到根，再变色：5 黑、10 红</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 5 条性质 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          5 条性质 —— 全部要背下来
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          红黑树的名字就来自这 5 条性质。它们共同保证「树不会太高」，其中<strong>性质 4（不能红红相邻）+ 性质 5（黑高一致）</strong>是核心，
          合起来推出一个漂亮的上界：<strong>最长路径 ≤ 2 × 最短路径</strong>，进而树高 h ≤ 2·log₂(n+1)。
        </p>
        <div class="bg-linear-to-r from-rose-50 to-slate-50 rounded-xl p-5 border border-rose-200 mb-4">
          <p class="text-xs text-slate-500 font-semibold mb-3 text-center">红黑树 5 条性质（RB 不变量）</p>
          <ol class="list-decimal list-inside space-y-1.5 text-slate-700 text-sm leading-relaxed">
            <li><strong>节点二色性</strong>：每个节点非红即黑</li>
            <li><strong>根黑</strong>：根节点必须是黑色</li>
            <li><strong>叶黑</strong>：每个叶节点（NIL 哨兵）是黑色</li>
            <li><strong>红不邻红</strong>：红节点的两个孩子都是黑色（不能出现连续的红色）</li>
            <li><strong>黑高一致</strong>：从任一节点到其所有后代叶子的路径上，黑色节点数相同</li>
          </ol>
        </div>
        <div class="mb-4"><Code language="ts" :code="nodeDefCode" title="rb_node.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          红黑树是「数据库 B+ 树之外」另一种经典有序实现——C++ 的 <code>std::map</code>、Java 的 <code>TreeMap</code> 底层都是红黑树。<br/>
          它更像 <strong>React 的「重平衡」哲学</strong>：React 16 的 Fiber 用「可中断的增量渲染」牺牲一点点单帧峰值，换取整段动画帧率的<strong>可预测性</strong>；
          红黑树也允许树比 AVL 稍高（≤2·log₂n），换取插入/删除时更少的旋转，让「最坏情况的维护成本」更可控。<br/>
          一句话：<strong>AVL 追求极致平衡，红黑树追求稳定可预测。</strong>
          </p>
        </aside>
      </section>

      <!-- 2. 为什么优于 AVL -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          为什么红黑树比 AVL 更适合工业
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          AVL 是「严格平衡」：任意节点高度差 ≤ 1，所以查找最快（树最矮），但<strong>写操作贵</strong>——每次插入最多要做 1~2 次旋转。
          红黑树是「宽松平衡」：允许树高到 2·log₂n，但插入<strong>至多 2 次旋转</strong>（叔叔黑时旋转 1~2 次后必终止）、变色则零旋转。
          现实系统中<strong>读写都频繁</strong>，红黑树用「稍高的树」换「更少的旋转」，整体吞吐更高。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold">AVL 树</th><th class="px-4 py-2 border border-slate-200 font-semibold">红黑树</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">平衡标准</td><td class="px-4 py-2 border">|平衡因子| ≤ 1（严格）</td><td class="px-4 py-2 border">红黑颜色约束（宽松）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">树高上界</td><td class="px-4 py-2 border font-mono">≤ 1.44 log₂n</td><td class="px-4 py-2 border font-mono">≤ 2 log₂n</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">插入旋转</td><td class="px-4 py-2 border font-mono text-amber-600">至多 2 次（较频繁）</td><td class="px-4 py-2 border font-mono text-emerald-600">至多 2 次（叔叔红时 0 次）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">删除旋转</td><td class="px-4 py-2 border font-mono text-amber-600">O(log n) 次</td><td class="px-4 py-2 border font-mono text-emerald-600">O(log n) 次（至多 3 次/层）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">查找速度</td><td class="px-4 py-2 border font-mono text-emerald-600">更快（树更矮）</td><td class="px-4 py-2 border font-mono">略慢（树稍高）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">适用场景</td><td class="px-4 py-2 border">读多写少</td><td class="px-4 py-2 border font-mono text-emerald-600">读写均衡（工业默认）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 一句话总结：</strong>AVL 是为「读」优化的，红黑树是为「读写平衡」优化的。
          Java/C++ 的标准有序容器选红黑树，正是因为「大多数系统的写操作不比读少」。</p>
        </aside>
      </section>

      <!-- 3. 节点与旋转 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          节点定义 + 左旋 / 右旋
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          红黑树节点比普通 BST 多一个 <code>color</code> 字段，还多一个 <code>parent</code> 指针——修复过程需要<strong>自底向上回溯</strong>。
          左旋/右旋本身<strong>与 AVL 完全一致</strong>，红黑树只是「复用了」旋转这个工具，配合变色一起修复。
        </p>
        <div class="mb-4"><Code language="ts" :code="rotateCode" title="rb_rotate.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 旋转的本质（再强调一次）：</strong>旋转不改变中序序列（BST 性质不变），只改变父子指向，O(1)。
          红黑树里旋转<strong>本身不动颜色</strong>，颜色是旋转之后单独重染的。</p>
        </aside>
      </section>

      <!-- 4. 插入与修复 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          插入与修复：叔叔红 → 变色，叔叔黑 → 旋转
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          红黑树插入分两步：先像普通 BST 一样把新节点放到底部并<strong>涂成红色</strong>（涂黑会破坏黑高，修复更麻烦），
          然后自底向上检查——只要出现「<strong>父红子红</strong>」就违反性质 4，必须修复。修复只看<strong>叔叔节点</strong>的颜色：
        </p>
        <div class="mb-4"><Code language="ts" :code="insertFixCode" title="rb_insert_fix.ts" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-4">插入修复的两种分支</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>叔叔红</strong> → 父、叔变黑，祖父变红；然后把指针上移到祖父，继续检查（可能引发新的红红冲突）</li>
          <li><strong>叔叔黑（含 NIL）</strong> → 分 LL / RR / LR / RL 四种形态做 1~2 次旋转，旋转后<strong>原父染黑、原祖父染红</strong>，修复即终止</li>
        </ol>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>新节点涂成黑色</strong>——这样从根到叶的黑高立刻 +1，违背性质 5，修复会连锁反应，比红色方案复杂得多。<br/>
          ② <strong>用 null 代替 NIL 哨兵</strong>——「叔叔是黑」的判断里，NIL 也算黑节点；用 null 会漏判，导致黑高计算错误。<br/>
          ③ <strong>变色后忘记继续向上检查</strong>——祖父染红后，它和它的父可能又形成红红冲突，必须循环继续。<br/>
          ④ <strong>旋转后忘记重染色</strong>——只旋转不变色（原父黑、原祖父红）仍然违反性质 4，等于白旋。
          </p>
        </aside>
      </section>

      <!-- 5. 删除修复概述 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          删除修复（概述）—— 插入的镜像
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          删除比插入复杂得多，因此这里只讲<strong>思想</strong>不贴完整代码。核心难点是：<strong>删掉一个黑节点会破坏「黑高一致」（性质 5）</strong>。
          修复思路是把这个「少掉的黑」上移给替代者，形成「<strong>双黑节点</strong>」，再按兄弟节点的颜色分 4 种 case 消解。
        </p>
        <div class="mb-4"><Code language="ts" :code="deleteCode" title="rb_delete_overview.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">Case</th><th class="px-4 py-2 border border-slate-200 font-semibold">兄弟 w 的状态</th><th class="px-4 py-2 border border-slate-200 font-semibold">操作</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">1</td><td class="px-4 py-2 border">w 是红色</td><td class="px-4 py-2 border">旋转 + 变色，转化为兄弟黑的情况</td></tr>
              <tr><td class="px-4 py-2 border font-mono">2</td><td class="px-4 py-2 border">w 黑，w 两个孩子都黑</td><td class="px-4 py-2 border">兄弟染红，把「双黑」上移给父节点</td></tr>
              <tr><td class="px-4 py-2 border font-mono">3</td><td class="px-4 py-2 border">w 黑，w 左红右黑</td><td class="px-4 py-2 border">旋转 + 变色，转化为 Case 4</td></tr>
              <tr><td class="px-4 py-2 border font-mono">4</td><td class="px-4 py-2 border">w 黑，w 右红</td><td class="px-4 py-2 border">旋转 + 变色，修复终止</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么删除更复杂：</strong>插入只会破坏「红红相邻」（性质 4），修复条件简单、至多 2 次旋转；
          删除可能破坏「黑高一致」（性质 5），需要「双黑」这种更抽象的状态，旋转次数 O(log n)。
          这正是红黑树「插入比 AVL 简单、删除比 AVL 复杂」的由来。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：插入 → 违反性质 → 变色 / 旋转修复
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          黑节点深色、红节点红色；橙圈 = 正在冲突的红红节点，绿圈 = 新插入节点。观察「变色」和「旋转+变色」两种修复如何让性质恢复。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ rbNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ rbStatus }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ 修复 O(1)~O(log n)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doRecolor" :disabled="rbBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">🎨 叔叔红 → 变色</button>
          <button @mousedown="doRotateFix" :disabled="rbBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">🔄 叔叔黑 → 旋转+变色</button>
          <button @mousedown="doRbReset" :disabled="rbBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="rbBox" class="w-full relative" :style="{height: rbH+'px'}">
          <v-stage :config="{width: rbW, height: rbH}">
            <v-layer>
              <v-line v-for="(e,i) in rbEdges" :key="'e'+i" :config="rbEdge(e)" />
              <v-circle v-for="n in rbNodes" :key="n.id" :config="rbCircle(n)" />
              <v-text v-for="n in rbNodes" :key="'t'+n.id" :config="rbText(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>红黑树 = BST + 颜色约束</strong>，靠 5 条性质（根黑、叶黑、红不邻红、黑高一致、二色性）间接保证树高 ≤ 2·log₂n</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>性质 4 + 5 推出核心结论</strong>：最长路径 ≤ 2 × 最短路径 → 查找/插入/删除 O(log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>插入修复只分两种</strong>：叔叔红 → 变色（不旋转）；叔叔黑 → 旋转 1~2 次 + 变色</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>新节点必须涂红</strong>，涂黑会破坏黑高、修复更复杂</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>删除比插入难</strong>：删黑节点破坏黑高 → 用「双黑」状态分 4 种 case 修复（思想即可）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>为什么工业首选</strong>：读写均衡下，用「稍高的树」换「更少的旋转」，整体吞吐高于 AVL</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-3-balanced/dsa-4-3-1-avl" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：AVL 树</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-3-balanced/dsa-4-3-3-treap" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Treap →</RouterLink>
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
  { id: "sec-1", name: "5 条性质" },
  { id: "sec-2", name: "为什么优于 AVL" },
  { id: "sec-3", name: "节点与旋转" },
  { id: "sec-4", name: "插入与修复" },
  { id: "sec-5", name: "删除修复概述" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 红黑树动画 =====
const RED = '#ef4444', BLK = '#1e293b'
const rbR = 24
const rbW = ref(700), rbH = ref(320)
const rbBusy = ref(false), rbStatus = ref('')
const rbBox = ref<HTMLDivElement>()
const rbD = (ms: number) => new Promise(r => setTimeout(r, ms))

interface RBNode { id: number; val: number; x: number; y: number; isRed: boolean; s?: number; glow?: string }
const rbNodes = reactive<RBNode[]>([])
const rbEdges = reactive<{ a: number; b: number }[]>([])

function rbFind(id: number): RBNode { return rbNodes.find(n => n.id === id)! }

function rbBuild(nodes: { id: number; val: number; x: number; y: number; isRed: boolean }[], edges: [number, number][]) {
  rbNodes.length = 0; rbEdges.length = 0
  nodes.forEach(n => rbNodes.push({ id: n.id, val: n.val, x: n.x, y: n.y, isRed: n.isRed, s: 1 }))
  edges.forEach(e => rbEdges.push({ a: e[0], b: e[1] }))
}

function rbEdge(e: { a: number; b: number }) {
  const pa = rbFind(e.a), pb = rbFind(e.b)
  return { points: [pa.x, pa.y + rbR, pb.x, pb.y - rbR], stroke: '#94a3b8', strokeWidth: 2 }
}
function rbCircle(n: RBNode) {
  const s = n.s ?? 1
  return { x: n.x, y: n.y, radius: rbR * s, fill: n.isRed ? RED : BLK, stroke: n.glow ?? '#334155',
    strokeWidth: n.glow ? 3 : 1.5, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function rbText(n: RBNode) {
  const s = n.s ?? 1
  return { x: n.x - rbR, y: n.y - rbR, width: rbR * 2, height: rbR * 2, text: String(n.val),
    fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: '#fff', align: 'center', verticalAlign: 'middle', scale: { x: s, y: s } }
}

async function rbMove(from: Record<number, { x: number; y: number }>, to: Record<number, { x: number; y: number }>, steps = 8) {
  for (let s = 1; s <= steps; s++) {
    const k = s / steps
    for (const n of rbNodes) {
      const a = from[n.id], b = to[n.id]
      if (a && b) { n.x = a.x + (b.x - a.x) * k; n.y = a.y + (b.y - a.y) * k }
    }
    await rbD(55)
  }
  for (const n of rbNodes) { const b = to[n.id]; if (b) { n.x = b.x; n.y = b.y } }
}

// 场景一：叔叔红 → 变色
async function doRecolor() {
  if (rbBusy.value) return
  rbBusy.value = true
  try {
    rbStatus.value = '初始：10 黑根，5 / 20 红'
    rbBuild(
      [{ id: 10, val: 10, x: 360, y: 55, isRed: false }, { id: 5, val: 5, x: 220, y: 165, isRed: true }, { id: 20, val: 20, x: 500, y: 165, isRed: true }],
      [[10, 5], [10, 20]],
    )
    await rbD(900)

    rbStatus.value = '插入 1（红）到 5 的左孩子'
    rbNodes.push({ id: 1, val: 1, x: 130, y: 275, isRed: true, s: 0 })
    rbEdges.push({ a: 5, b: 1 })
    await rbD(80); rbFind(1).s = 1; await rbD(500)

    rbStatus.value = '违反性质4：5 和 1 都是红（红-红冲突）'
    rbFind(5).glow = '#f59e0b'; rbFind(1).glow = '#f59e0b'; await rbD(900)

    rbStatus.value = '叔叔 20 是红 → 变色：5、20 变黑'
    rbFind(5).isRed = false; rbFind(20).isRed = false; await rbD(700)

    rbStatus.value = '变色完成，性质恢复（根 10 保持黑）'
    rbFind(5).glow = undefined; rbFind(1).glow = undefined; await rbD(900)
  } finally { rbBusy.value = false; rbStatus.value = '' }
}

// 场景二：叔叔黑 → 右旋 + 变色
async function doRotateFix() {
  if (rbBusy.value) return
  rbBusy.value = true
  try {
    rbStatus.value = '初始：10 黑根，5 红左孩子'
    rbBuild(
      [{ id: 10, val: 10, x: 360, y: 55, isRed: false }, { id: 5, val: 5, x: 260, y: 165, isRed: true }],
      [[10, 5]],
    )
    await rbD(900)

    rbStatus.value = '插入 3（红）到 5 的左孩子'
    rbNodes.push({ id: 3, val: 3, x: 170, y: 275, isRed: true, s: 0 })
    rbEdges.push({ a: 5, b: 3 })
    await rbD(80); rbFind(3).s = 1; await rbD(500)

    rbStatus.value = '红-红冲突，叔叔是 NIL（黑）→ 右旋'
    rbFind(5).glow = '#f59e0b'; rbFind(3).glow = '#f59e0b'; await rbD(800)

    rbStatus.value = '右旋：5 上浮为根，10 降为右孩子'
    await rbMove(
      { 10: { x: 360, y: 55 }, 5: { x: 260, y: 165 }, 3: { x: 170, y: 275 } },
      { 10: { x: 470, y: 165 }, 5: { x: 360, y: 55 }, 3: { x: 250, y: 165 } },
    )
    rbEdges.length = 0
    rbEdges.push({ a: 5, b: 3 }, { a: 5, b: 10 })
    await rbD(300)

    rbStatus.value = '变色：5 变黑，10 变红'
    rbFind(5).isRed = false; rbFind(10).isRed = true; await rbD(700)

    rbStatus.value = '修复完成：根 5 黑，3 / 10 红'
    rbFind(5).glow = undefined; rbFind(3).glow = undefined; await rbD(900)
  } finally { rbBusy.value = false; rbStatus.value = '' }
}

function doRbReset() {
  rbBuild(
    [{ id: 10, val: 10, x: 360, y: 55, isRed: false }, { id: 5, val: 5, x: 220, y: 165, isRed: true }, { id: 20, val: 20, x: 500, y: 165, isRed: true }],
    [[10, 5], [10, 20]],
  )
  rbStatus.value = ''
}

let roRb: ResizeObserver | null = null
onMounted(() => {
  doRbReset()
  if (rbBox.value) {
    rbW.value = rbBox.value.clientWidth
    roRb = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 200) { rbW.value = w } })
    roRb.observe(rbBox.value)
  }
})
onUnmounted(() => roRb?.disconnect())

// ===== 代码示例 =====
const nodeDefCode = `// ===== 红黑树节点：比 BST/AVL 多一个 color 字段 =====
enum Color { Red = 'red', Black = 'black' }

class RBNode {
    val: number
    left: RBNode | null
    right: RBNode | null
    parent: RBNode | null   // 修复需要自底向上回溯父节点
    color: Color

    constructor(val: number, color: Color = Color.Red) {
        this.val = val
        this.left = null
        this.right = null
        this.parent = null
        this.color = color     // 新节点默认红色（关键！见插入修复）
    }
}

// ===== 红黑树 5 条性质（背下来）=====
// 1. 每个节点非红即黑
// 2. 根节点是黑色
// 3. 每个叶节点（NIL 哨兵）是黑色
// 4. 红节点的两个孩子都是黑色（不能出现「红-红」相邻）
// 5. 从任一节点到其所有后代叶子的路径上，黑节点数相同（黑高一致）
//
// 由 4 + 5 推出核心结论：
//   最长路径（红黑交替）长度 ≤ 2 × 最短路径（全黑）
//   → 树高 h ≤ 2·log₂(n+1)，查找/插入/删除均为 O(log n)
//
// 注意：性质 3 的「叶节点」指 NIL 哨兵，不是真正的数据叶子。
// 实现时所有 null 指针可统一指向一个共享的黑色 NIL 哨兵，简化边界。`

const rotateCode = `// ===== 左旋 / 右旋（与 AVL 完全一致，红黑树复用）=====
// 旋转不改变中序序列（BST 性质保持），只改 O(1) 个指针，颜色不动

function rotateLeft(x: RBNode): RBNode {
    const y = x.right!            // y 是 x 的右孩子，将上位
    x.right = y.left              // y 的左子树挂给 x 当右子树
    if (y.left) y.left.parent = x
    y.parent = x.parent           // y 接管 x 的父
    if (!x.parent) { /* y 成为新根 */ }
    else if (x === x.parent.left) x.parent.left = y
    else x.parent.right = y
    y.left = x
    x.parent = y
    return y
}

function rotateRight(y: RBNode): RBNode {
    const x = y.left!             // x 是 y 的左孩子，将上位
    y.left = x.right              // x 的右子树挂给 y 当左子树
    if (x.right) x.right.parent = y
    x.parent = y.parent
    if (!y.parent) { /* x 成为新根 */ }
    else if (y === y.parent.right) y.parent.right = x
    else y.parent.left = x
    x.right = y
    y.parent = x
    return x
}

// 旋转 O(1)：只改写常量个指针，不影响中序
// 红黑树里「旋转」和「变色」是两件独立的事：先旋转变结构，再染色满足性质`

const insertFixCode = `// ===== 插入：先 BST 插入，再修复「红-红」冲突 =====
function insert(root: RBNode | null, val: number): RBNode {
    // 1) 标准 BST 插入（找到 parent 挂上新节点，此处略去二分下行）
    const node = new RBNode(val, Color.Red)  // 新节点一定是红色
    // ... 二分找到空位，node.parent = parent ...

    // 2) 修复红红冲突
    fixInsert(node)

    // 3) 确保根是黑色（修复可能把根染红）
    let r = node
    while (r.parent) r = r.parent
    r.color = Color.Black
    return r
}

// ===== 插入修复：核心 =====
function fixInsert(z: RBNode): void {
    // 只要 z 的父是红色，就存在「红-红」冲突
    while (z.parent && z.parent.color === Color.Red) {
        const p = z.parent                       // 父（红）
        const g = p.parent!                      // 祖父（必黑，否则之前就冲突了）
        const u = (p === g.left) ? g.right : g.left   // 叔叔

        if (u && u.color === Color.Red) {
            // ① 叔叔红 → 只变色，不旋转
            p.color = Color.Black
            u.color = Color.Black
            g.color = Color.Red
            z = g                                 // 祖父变红，可能又和它的父冲突 → 继续向上
        } else {
            // ② 叔叔黑（含 NIL）→ 旋转 + 变色，修复后直接结束
            if (p === g.left) {
                if (z === p.right) {              // LR：先左旋 p 变 LL
                    rotateLeft(p)
                    z = p
                    p = z.parent!
                }
                rotateRight(g)                    // LL：右旋 g
                p.color = Color.Black             // 原父变黑
                g.color = Color.Red               // 原祖父变红
            } else {
                if (z === p.left) {               // RL：先右旋 p 变 RR
                    rotateRight(p)
                    z = p
                    p = z.parent!
                }
                rotateLeft(g)                     // RR：左旋 g
                p.color = Color.Black
                g.color = Color.Red
            }
            break                                 // 旋转后该子树黑高恢复，无需再向上
        }
    }
}

// 手动模拟：依次插入 10, 5, 20, 1
// 插入 10(黑根) → 插入 5(红，父黑 OK) → 插入 20(红，父黑 OK)
// 插入 1(红)：父 5 是红 → 冲突；叔叔 20 是红 → 变色
//   5、20 变黑，10 变红（10 是根，再染回黑）
// 结果：
//        10(黑)
//       /      \\
//      5(黑)   20(黑)
//     /
//    1(红)`

const deleteCode = `// ===== 删除修复（概述，代码量过大，理解思想即可）=====
// 删除比插入复杂：删掉一个「黑节点」会破坏黑高一致（性质 5）
//
// 思想：被删节点 z 若为黑色，相当于「少了一个黑」，
// 把这个「额外黑」上移给替代者 x，形成「双黑节点」，再分 4 种 case：
//
//  Case 1: 兄弟 w 是红色 → 旋转 + 变色，把问题转成兄弟黑
//  Case 2: 兄弟 w 黑且 w 两个孩子都黑 → 兄弟染红，把「双黑」上移给父
//  Case 3: 兄弟 w 黑、w 左红右黑 → 旋转 + 变色，转成 Case 4
//  Case 4: 兄弟 w 黑、w 右红 → 旋转 + 变色，修复终止
//
// 删除的三种情况（同 BST）：
//  ① 叶子 → 直接删（若删的是黑，触发修复）
//  ② 单孩子 → 孩子顶替（若删的是黑，孩子继承「额外黑」）
//  ③ 双孩子 → 找中序后继顶替，转成删后继（后继至多一个右孩子）
//
// 删除修复旋转次数 O(log n)，这也是红黑树「删除比插入复杂」的根源。
// 面试/学习时先吃透插入修复，删除修复掌握思想即可。`
</script>
