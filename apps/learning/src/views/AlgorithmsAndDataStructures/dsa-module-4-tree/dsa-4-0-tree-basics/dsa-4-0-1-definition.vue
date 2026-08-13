<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌳 树的定义与基本术语</h1>
          <p class="text-sm text-slate-500 mt-1">节点/根/叶子/度/深度/高度/森林——树模块的地基词汇表</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-0-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：一棵普通树（多叉树）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          树是一类<strong>非线性</strong>数据结构：节点按<strong>父子关系</strong>层层相连，每个节点可以有<strong>任意多个孩子</strong>（本模块地基是「多叉树」，二叉树是它的特例）。
          下面这棵示例树贯穿整个模块：根 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">1</code> 有 3 个孩子，叶子（绿）有 5 个，最大深度（=树的高度）为 2。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 330" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="360" y="20" text-anchor="middle" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">一棵普通树：每个父节点连多个孩子（多叉）</text>

            <!-- 边 -->
            <line x1="360" y1="84" x2="200" y2="126" stroke="#94a3b8" stroke-width="2" />
            <line x1="360" y1="84" x2="360" y2="126" stroke="#94a3b8" stroke-width="2" />
            <line x1="360" y1="84" x2="520" y2="126" stroke="#94a3b8" stroke-width="2" />
            <line x1="200" y1="174" x2="150" y2="221" stroke="#94a3b8" stroke-width="2" />
            <line x1="200" y1="174" x2="250" y2="221" stroke="#94a3b8" stroke-width="2" />
            <line x1="360" y1="174" x2="360" y2="221" stroke="#94a3b8" stroke-width="2" />
            <line x1="520" y1="174" x2="470" y2="221" stroke="#94a3b8" stroke-width="2" />
            <line x1="520" y1="174" x2="570" y2="221" stroke="#94a3b8" stroke-width="2" />

            <!-- 节点 -->
            <circle cx="360" cy="60" r="24" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="360" y="60" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>

            <circle cx="200" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="200" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <circle cx="360" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <circle cx="520" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="520" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>

            <circle cx="150" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="150" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
            <circle cx="250" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="250" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">6</text>
            <circle cx="360" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="360" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">7</text>
            <circle cx="470" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="470" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
            <circle cx="570" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="570" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">9</text>

            <!-- 术语标注 -->
            <text x="360" y="36" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#f59e0b" font-weight="bold">根 root</text>
            <text x="58" y="245" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#16a34a">叶 leaf</text>

            <!-- 深度 / 高度 / 层 -->
            <text x="96" y="60" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">深度 0</text>
            <text x="96" y="150" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">深度 1</text>
            <text x="96" y="245" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">深度 2</text>

            <text x="632" y="60" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">高度 2</text>
            <text x="632" y="150" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">高度 1</text>
            <text x="632" y="245" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">高度 0</text>

            <!-- 度标注 -->
            <text x="360" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0891b2">度(1)=3</text>

            <text x="16" y="298" font-size="11" font-family="monospace" fill="#64748b">根=无父的节点；父→子=一条边；兄弟 sibling=同一父节点的节点（2、3、4）；度=孩子个数（度(1)=3）</text>
            <text x="16" y="318" font-size="11" font-family="monospace" fill="#64748b">深度：根→该节点的边数（自上而下）；高度：该节点→最远叶子的边数（自下而上）；层 = 深度 + 1</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：根（橙描边）、内部节点（青）、叶子（绿）——深度自上而下，高度自下而上</figcaption>
        </figure>

        <!-- 森林示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">概念：森林 (Forest) —— 去掉根，就得到一片森林</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">一棵树（含根）</p>
            <svg viewBox="0 0 320 180" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <line x1="160" y1="66" x2="80" y2="120" stroke="#94a3b8" stroke-width="2" />
              <line x1="160" y1="66" x2="240" y2="120" stroke="#94a3b8" stroke-width="2" />
              <circle cx="160" cy="45" r="20" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="160" y="45" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <circle cx="80" cy="140" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="80" y="140" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <circle cx="240" cy="140" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="240" y="140" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">去掉根 → 两棵独立子树 = 森林</p>
            <svg viewBox="0 0 320 180" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="30" y="115" width="110" height="50" rx="8" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <rect x="180" y="115" width="110" height="50" rx="8" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <circle cx="85" cy="140" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="85" y="140" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <circle cx="235" cy="140" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="235" y="140" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <text x="160" y="40" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">m 棵互不相交的树 = 森林</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">森林是 m(m≥0) 棵互不相交的树的集合</figcaption>
          </figure>
        </div>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          树的定义 —— 递归定义的「非线性」结构
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          树 (Tree) 是 <strong>n (n ≥ 0) 个结点的有限集合</strong>。当 n = 0 时称为<strong>空树</strong>；当 n &gt; 0 时满足：
        </p>
        <ol class="space-y-2 text-slate-600 mb-4 text-sm">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span>有且仅有一个特定的结点，称为<strong>根 (root)</strong>。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span>其余结点可分成 <strong>m (m ≥ 0) 个互不相交的有限集合</strong>，每个集合本身又是一棵树，称为根的<strong>子树 (subtree)</strong>。</span></li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          注意「互不相交」四个字：树<strong>不允许有环</strong>，也不允许两个父节点共享同一个孩子。任意两个节点之间<strong>有且仅有一条路径</strong>。
          这是它与「图 (Graph)」最本质的区别（下一模块会展开）。
        </p>
        <div class="mb-4"><Code language="ts" :code="treeNodeCode" title="tree_node.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          树的递归定义就像 Vue 的<strong>组件树</strong>——<code>App</code> 是根组件，它的每个子组件（<code>Header</code>、<code>Sidebar</code>、<code>Main</code>）各自又是一棵子树，内部可以继续嵌套。<br/>
          也像 DOM 树：<code>&lt;html&gt;</code> 是根，<code>&lt;body&gt;</code> 是子树，每个元素都可以有多个子元素——这正是<strong>多叉树</strong>（每个节点孩子数量不限）。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          基本术语 —— 一张表吃透所有词汇
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          树的术语很多且容易混淆（尤其<strong>深度 vs 高度</strong>）。下表按「节点关系」和「度量」两类整理，配合上面的结构图理解。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">术语</th><th class="px-4 py-2 border border-slate-200 font-semibold">含义</th><th class="px-4 py-2 border border-slate-200 font-semibold">示例树中的取值</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">节点 (node)</td><td class="px-4 py-2 border">树中的一个元素，含数据 + 指向孩子的指针</td><td class="px-4 py-2 border">1 ~ 9 共 9 个</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">根 (root)</td><td class="px-4 py-2 border">唯一没有父节点的节点，树的起点</td><td class="px-4 py-2 border">节点 1</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">叶子 (leaf)</td><td class="px-4 py-2 border">度为 0（没有孩子）的节点</td><td class="px-4 py-2 border">5, 6, 7, 8, 9</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">父 (parent)</td><td class="px-4 py-2 border">直接指向某节点的上层节点</td><td class="px-4 py-2 border">2 是 5、6 的父</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">子 (child)</td><td class="px-4 py-2 border">某节点直接指向的下层节点</td><td class="px-4 py-2 border">1 的子是 2、3、4</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">兄弟 (sibling)</td><td class="px-4 py-2 border">拥有同一个父节点的节点</td><td class="px-4 py-2 border">2、3、4 互为兄弟</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">祖先/后代</td><td class="px-4 py-2 border">从根到该节点路径上的所有节点 / 该节点子树中所有节点</td><td class="px-4 py-2 border">5 的祖先是 2、1；1 的后代是 2~9</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">度 (degree)</td><td class="px-4 py-2 border">一个节点拥有的孩子数量</td><td class="px-4 py-2 border">度(1)=3，度(2)=2，度(3)=1，度(4)=2</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">树的度</td><td class="px-4 py-2 border">所有节点度的最大值</td><td class="px-4 py-2 border">3（多叉树）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">深度 (depth)</td><td class="px-4 py-2 border">从根到该节点的<strong>边数</strong>（根=0）</td><td class="px-4 py-2 border">depth(1)=0，depth(5)=2</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">高度 (height)</td><td class="px-4 py-2 border">从该节点到最远叶子的<strong>边数</strong>（叶=0）</td><td class="px-4 py-2 border">height(1)=2，height(5)=0</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">层 (level)</td><td class="px-4 py-2 border">根在第 1 层（= 深度 + 1）</td><td class="px-4 py-2 border">第 1/2/3 层</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">森林 (forest)</td><td class="px-4 py-2 border">m 棵互不相交的树的集合</td><td class="px-4 py-2 border">去掉根 1 得到 3 棵子树</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 深度 vs 高度 —— 最容易搞混的一对：</strong><br/>
          ① <strong>深度</strong>：从<strong>根往下数</strong>到该节点（根深度 = 0）；<br/>
          ② <strong>高度</strong>：从<strong>该节点往下数</strong>到最远的叶子（叶子高度 = 0）。<br/>
          <strong>树的高度 = 根的高度 = 树的最大深度</strong>。很多人把「节点高度」和「节点深度」当成一个东西——它们数值可能恰好相同，但方向相反、基准不同。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          树的性质 —— 几条「边」与「度」的铁律
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          树有两个不变量，很多算法（如并查集、最小生成树）都建立在这之上：
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <ul class="space-y-2 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">①</span><span><strong>n 个节点的树恰好有 n-1 条边</strong>——每个节点（除根）都恰有一条指向父节点的边。</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">②</span><span><strong>任意两个节点之间有且仅有一条路径</strong>——所以树无环、且连通。</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">③</span><span><strong>所有节点度数之和 = 2 × 边数 = 2(n-1)</strong>——这由「每条边贡献 2 个度」直接得出（握手定理）。</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">④</span><span><strong>度为 k 的树，叶子数 ≥ 非叶子数</strong>的推论很多，最常见的特例：二叉树中叶子数 = 度为 2 的节点数 + 1。</span></li>
          </ul>
        </div>
        <div class="mb-4"><Code language="ts" :code="degreeCode" title="degree_and_leaves.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>n-1 条边是「树」的<strong>判定条件</strong>——一个连通图有 n 个节点、n-1 条边，就一定是树；n 条边及以上必有环，n-2 条边及以下必不连通。图论中的「最小生成树」本质上就是在图中挑 n-1 条边凑成树。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          递归定义与子树 —— 树的灵魂是递归
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          树的定义是<strong>递归</strong>的：一棵树 = 根 + 若干子树。因此几乎所有树算法（遍历、求高度、求叶子数）都用递归书写，
          天然地「化整为零」。反过来，<strong>森林加一个根，就变回一棵树</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="depthHeightCode" title="depth_height.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          递归求高度就像 <code>Array.prototype.reduce</code>——每个节点先递归算出所有孩子的值，再「归并」成自己的结果。<br/>
          求高度 = 孩子高度的 <code>max</code> 再 <code>+1</code>；求叶子数 = 孩子叶子数的 <code>sum</code>。<br/>
          这也解释了为什么 React/Vue 的组件树能通过 <code>render()</code> 递归调用把整棵树渲染出来。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>写树算法时先想清三件事——<strong>递归出口</strong>（空树/叶子）、<strong>单层逻辑</strong>（处理当前节点）、<strong>如何合并孩子的结果</strong>（max/sum/…）。想清这三点，90% 的树题都能写出来。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          常见错误 —— 术语与实现的双重坑
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：深度/高度的基准记反。</strong><br/>
          有的教材规定根深度 = 1、高度 = 0（把「深度」当成「层号」）。不同资料不一致，<strong>读题时先确认基准</strong>。本文统一采用：深度根=0，高度叶=0（LeetCode 惯例）。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：把「树的度」和「节点的度」混用。</strong><br/>
          节点的度 = 孩子个数；树的度 = 所有节点度的<strong>最大值</strong>。说「这棵树的度是 3」不等于「每个节点都有 3 个孩子」。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：误以为「空树」也有根。</strong><br/>
          空树 n=0，<strong>没有根</strong>。递归函数处理树时，第一步永远是判空（<code>if (!root) return</code>），否则会空指针崩溃。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆口诀：</strong>「<strong>深度从根往下，高度从叶往上；树高等于根高，也等于最大深度。</strong>」一句话覆盖所有易混点。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：深度 / 高度 / 叶子统计
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点击按钮观察三者的计算方向：<strong>深度自上而下</strong>（根=0 向下 +1）、<strong>高度自下而上</strong>（叶=0 向上 +1）、<strong>叶子</strong>是度为 0 的节点（绿色）。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ tNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">🌳 高度: {{ treeHeight }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">🍃 叶子: {{ leafCount }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doDepth" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">🪜 计算深度</button>
          <button @mousedown="doHeight" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40">📏 计算高度</button>
          <button @mousedown="doLeaves" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:shadow-sm disabled:opacity-40">🍃 统计叶子</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="txtCfg(n)" />
              <v-text v-for="n in tNodes" :key="'s'+n.id" :config="subCfg(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>树是递归定义的：</strong>根 + 若干互不相交的子树，无环、节点间路径唯一</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>n 个节点的树恰有 n-1 条边</strong>，这是判定「树」的充要条件</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>深度自上而下（根=0），高度自下而上（叶=0）</strong>，树高=根高=最大深度</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>度 = 孩子数量</strong>，叶子是度为 0 的节点，树的度 = 节点度的最大值</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>森林 + 根 = 树</strong>，去掉根 = 森林，二者可以互相转换</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>二叉树是「度 ≤ 2」的多叉树特例</strong>，下一节开始先讲通用树的存储与遍历</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-3-applications/dsa-3-3-4-bloom" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：布隆过滤器</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-0-tree-basics/dsa-4-0-2-representation" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：树的存储表示 →</RouterLink>
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
  { id: "sec-1", name: "树的定义" },
  { id: "sec-2", name: "基本术语" },
  { id: "sec-3", name: "树的性质" },
  { id: "sec-4", name: "递归与森林" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 深度/高度/叶子动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H = ref(340), W = ref(700)
const R = 24, LEVEL_H = 100, TOP = 56
interface TNode { id: number; x: number; y: number; color: string; d?: number|null; h?: number|null; leaf?: boolean }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{a:number;b:number}[]>([])
const busy = ref(false), status = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const child: Record<number, number[]> = { 1:[2,3,4], 2:[5,6], 3:[7], 4:[8,9], 5:[], 6:[], 7:[], 8:[], 9:[] }

const treeHeight = computed(() => { const r = tNodes.find(n=>n.id===1); return r?.h ?? 2 })
const leafCount = computed(() => tNodes.filter(n => child[n.id].length === 0).length)
const node = (id:number) => tNodes.find(n => n.id === id)!

function layout() {
  tNodes.length = 0; tEdges.length = 0
  const levels: number[][] = []
  let frontier = [1]
  while (frontier.length) {
    levels.push(frontier)
    const next: number[] = []
    frontier.forEach(id => child[id].forEach(c => { tEdges.push({a:id, b:c}); next.push(c) }))
    frontier = next
  }
  levels.forEach((lv, li) => {
    const y = TOP + li * LEVEL_H, n = lv.length
    lv.forEach((id, i) => tNodes.push({ id, x: W.value*(i+1)/(n+1), y, color: C.cyan }))
  })
}
function edgeCfg(e:{a:number;b:number}) {
  const pa = node(e.a), pb = node(e.b)
  return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke:'#94a3b8', strokeWidth:2 }
}
function circleCfg(n:any) {
  return { x:n.x, y:n.y, radius:R, fill:n.color, stroke:'#64748b', strokeWidth:1.5,
    shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
}
function txtCfg(n:any) {
  return { x:n.x-R, y:n.y-R, width:R*2, height:R*2, text:String(n.id), fontSize:15,
    fontFamily:'monospace', fontStyle:'bold', fill:n.color===C.green?C.text:'#fff', align:'center', verticalAlign:'middle' }
}
function subCfg(n:any) {
  const parts: string[] = []
  if (n.d != null) parts.push(`d=${n.d}`)
  if (n.h != null) parts.push(`h=${n.h}`)
  if (n.leaf) parts.push('叶')
  return { x:n.x-34, y:n.y+R+8, width:68, text:parts.join(' '), fontSize:12, fontFamily:'monospace', fill:C.muted, align:'center' }
}
async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false }
}

function doReset() { layout(); status.value = '' }

async function doDepth() {
  act('计算深度 O(n)  根=0 向下+1', async () => {
    layout()
    let frontier = [1], depth = 0
    while (frontier.length) {
      status.value = `第 ${depth+1} 层（深度 ${depth}）`
      for (const id of frontier) { const n = node(id); n.d = depth; n.color = C.orange; await d(200) }
      for (const id of frontier) node(id).color = C.cyan
      const next: number[] = []
      frontier.forEach(id => child[id].forEach(c => next.push(c)))
      frontier = next; depth++
      await d(100)
    }
    status.value = `最大深度 = ${depth-1}`
  })
}

async function doHeight() {
  act('计算高度 O(n)  叶=0 向上+1', async () => {
    layout()
    const res = await postHeight(1)
    status.value = `树的高度 = ${res}`
  })
}
async function postHeight(id: number): Promise<number> {
  const kids = child[id]
  if (kids.length === 0) {
    const n = node(id); n.h = 0; n.color = C.orange
    status.value = `叶子 ${id} → 高度 0`; await d(220); n.color = C.green
    return 0
  }
  let mh = 0
  for (const c of kids) mh = Math.max(mh, await postHeight(c))
  const n = node(id); n.h = mh + 1; n.color = C.orange
  status.value = `节点 ${id} → max(孩子)+1 = ${mh+1}`; await d(300); n.color = C.green
  return mh + 1
}

async function doLeaves() {
  act('统计叶子  度为 0 的节点', async () => {
    layout()
    let cnt = 0
    for (const n of tNodes) {
      if (child[n.id].length === 0) { n.color = C.green; n.leaf = true; cnt++ }
    }
    status.value = `叶子共 ${cnt} 个（5,6,7,8,9）`
  })
}

let ro: ResizeObserver | null = null
onMounted(() => {
  layout()
  if (box.value) {
    W.value = box.value.clientWidth
    layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const treeNodeCode = `// 多叉树（普通树）节点定义 —— 每个节点可拥有任意多个孩子
interface TreeNode {
    val: number
    children: TreeNode[]   // 孩子指针数组，长度不固定（多叉的关键）
}

// 构造示例树：
//         1
//       / | \\
//      2  3  4
//     /|  |  /\\
//    5 6  7 8  9
const root: TreeNode = {
    val: 1,
    children: [
        { val: 2, children: [
            { val: 5, children: [] },
            { val: 6, children: [] },
        ]},
        { val: 3, children: [
            { val: 7, children: [] },
        ]},
        { val: 4, children: [
            { val: 8, children: [] },
            { val: 9, children: [] },
        ]},
    ],
}

// 二叉树是「多叉树的特例」——每个节点最多两个孩子
interface BinaryTreeNode {
    val: number
    left: BinaryTreeNode | null
    right: BinaryTreeNode | null
}
// 度 ≤ 2 的多叉树，就是二叉树；本模块先掌握通用树，二叉树是它的特化`

const degreeCode = `// ===== 度（degree）：一个节点拥有的孩子数量 =====
function degree(node: TreeNode): number {
    return node.children.length
}
// 示例树各节点的度：1→3, 2→2, 3→1, 4→2, 5~9→0
// 树的度 = max(所有节点度) = 3

// ===== 叶子（leaf）：度为 0 的节点 =====
function isLeaf(node: TreeNode): boolean {
    return node.children.length === 0
}

function countLeaves(node: TreeNode): number {
    if (node.children.length === 0) return 1      // 叶子
    return node.children.reduce((sum, c) => sum + countLeaves(c), 0)
}
console.log(countLeaves(root))  // 5（叶子：5,6,7,8,9）

// ===== 性质验证：节点数 n 与边数 e =====
// 示例树 n = 9，边 = 8 = n - 1 ✓
// 度之和 = 3+2+1+2+0×5 = 8 = 2 × 边数 ✓（握手定理）

// ===== 性质：度与叶子数量的关系（以二叉树为例）=====
// 设 n0=叶子数, n1=度为1节点数, n2=度为2节点数
// 总节点 n = n0 + n1 + n2
// 边数 n-1 = n1 + 2*n2（每个度为1的节点贡献1条边，度为2贡献2条）
// 联立可得：n0 = n2 + 1  ← 二叉树的经典结论`

const depthHeightCode = `// ===== 深度（depth）：从根到该节点经过的边数，根=0 =====
function computeDepth(root: TreeNode): Map<TreeNode, number> {
    const depth = new Map<TreeNode, number>()
    function dfs(node: TreeNode, d: number) {
        depth.set(node, d)                        // 先记当前深度
        for (const c of node.children) dfs(c, d + 1)  // 往下 +1
    }
    dfs(root, 0)
    return depth
}

// ===== 高度（height）：从该节点到最远叶子的边数，叶=0 =====
function computeHeight(node: TreeNode): number {
    if (node.children.length === 0) return 0      // 叶子高度 0
    let maxH = 0
    for (const c of node.children) {
        maxH = Math.max(maxH, computeHeight(c))   // 取孩子高度最大值
    }
    return maxH + 1                                // 自身 +1
}

// ===== 树的高度 = 根的高度 = 最大深度 =====
console.log(computeHeight(root))   // 2（1 → 2 → 5 共 2 条边）

// ===== 常见写法：带深度参数的 DFS（求最大深度）=====
function maxDepth(node: TreeNode | null): number {
    if (!node) return 0
    let m = 0
    for (const c of node.children) m = Math.max(m, maxDepth(c))
    return m + 1
}
// 对比：maxDepth 用「深度」思路（往下+1），computeHeight 用「高度」思路（叶子=0 往上）
// 两者结果相同——因为「根的高度」与「最大深度」是同一个量`

// 这个文件还用到 interface TreeNode 与 root，定义见 tree_node.ts
</script>
