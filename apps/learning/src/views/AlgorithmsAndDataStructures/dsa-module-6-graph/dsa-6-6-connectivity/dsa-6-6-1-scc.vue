<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔗 强连通分量(SCC)：Tarjan / Kosaraju 算法</h1>
          <p class="text-sm text-slate-500 mt-1">有向图里「互相可达」的极大子图</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-6-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：互相可达的「极大子图」分组
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          在<strong>有向图</strong>里，若 u 能走到 v 且 v 也能走到 u，称 u、v <strong>互相可达</strong>。
          把所有互相可达的节点聚成一个<strong>极大</strong>集合，就得到<strong>强连通分量（Strongly Connected Component, SCC）</strong>——
          分量内任意两点双向可达，分量之间只可能有单向边。下图有两个 SCC：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">{A,B,C}</code> 与 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">{D,E}</code>。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ov-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="22" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">有向图 G —— 虚线框内是互相可达的极大子图（SCC）</text>

            <!-- SCC 分组虚线框 -->
            <rect x="35" y="36" width="240" height="170" rx="14" fill="none" stroke="#0284c7" stroke-dasharray="6 4" stroke-width="1.5" />
            <rect x="380" y="36" width="230" height="170" rx="14" fill="none" stroke="#db2777" stroke-dasharray="6 4" stroke-width="1.5" />

            <!-- 边（有向箭头） -->
            <line x1="155" y1="70" x2="75" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <line x1="75" y1="180" x2="235" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <line x1="235" y1="180" x2="155" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <line x1="235" y1="180" x2="440" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <line x1="440" y1="70" x2="530" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <line x1="530" y1="180" x2="440" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />

            <!-- SCC1 节点 -->
            <circle cx="155" cy="70" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="155" y="70" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="75" cy="180" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="75" y="180" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="235" cy="180" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="235" y="180" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <text x="155" y="224" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0284c7" font-weight="bold">SCC₁ = {A,B,C}</text>

            <!-- SCC2 节点 -->
            <circle cx="440" cy="70" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="440" y="70" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
            <circle cx="530" cy="180" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="530" y="180" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">E</text>
            <text x="495" y="224" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#db2777" font-weight="bold">SCC₂ = {D,E}</text>

            <text x="16" y="248" font-size="11" font-family="monospace" fill="#64748b">只有单向边 C→D 连接两个分量；缩点后变成一条 SCC₁ → SCC₂ 的边（DAG）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：有向图的 SCC —— 分量内任意两点双向可达，分量之间至多单向可达</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：SCC 缩点（condensation）—— 分量合并成「超节点」</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">缩点前：两个 SCC 之间的边 C→D</p>
            <svg viewBox="0 0 300 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ct1-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <rect x="8" y="18" width="170" height="126" rx="10" fill="none" stroke="#0284c7" stroke-dasharray="6 4" stroke-width="1.5" />
              <line x1="93" y1="45" x2="35" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#ct1-arr)" />
              <line x1="35" y1="120" x2="150" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#ct1-arr)" />
              <line x1="150" y1="120" x2="93" y2="45" stroke="#94a3b8" stroke-width="2" marker-end="url(#ct1-arr)" />
              <line x1="150" y1="120" x2="225" y2="66" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#ct1-arr)" />
              <circle cx="93" cy="45" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="93" y="45" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <circle cx="35" cy="120" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="35" y="120" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <circle cx="150" cy="120" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="150" y="120" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
              <circle cx="225" cy="45" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="225" y="45" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
              <text x="93" y="154" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0284c7">SCC₁={A,B,C}　SCC₂={D}</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">同一分量内是环（强连通），跨分量只有单向边</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">缩点后：每个 SCC 变成一个超节点，得到 DAG</p>
            <svg viewBox="0 0 300 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ct2-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a" />
                </marker>
              </defs>
              <line x1="140" y1="85" x2="190" y2="85" stroke="#16a34a" stroke-width="3" marker-end="url(#ct2-arr)" />
              <circle cx="100" cy="85" r="32" fill="#0284c7" stroke="#075985" stroke-width="2.5" />
              <text x="100" y="85" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">S1</text>
              <circle cx="225" cy="85" r="28" fill="#db2777" stroke="#9d174d" stroke-width="2.5" />
              <text x="225" y="85" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">S2</text>
              <text x="100" y="130" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0284c7">S1 = {A,B,C}</text>
              <text x="225" y="130" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#db2777">S2 = {D}</text>
              <text x="16" y="160" font-size="10" font-family="monospace" fill="#16a34a">有向无环图 → 可拓扑排序（构建顺序）</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">缩点后原图必为 DAG，这是 2-SAT、循环依赖检测的基础</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 定义 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          强连通与 SCC 的定义 —— 「互相可达」的极大子图
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          设 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">u ⇝ v</code> 表示 u 沿有向边可走到 v。
          若 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">u ⇝ v</code> 且 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">v ⇝ u</code>，称 u、v <strong>互相可达</strong>。
          <strong>强连通分量</strong>是「互相可达」关系下的<strong>极大</strong>等价类：往集合里再加任何一个节点，都会破坏两两可达。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>单向图的一个节点自成一个 SCC</strong>（单个节点 trivially 互相可达）</li>
          <li>同一个 SCC 内，从任意节点出发能到达分量内所有其他节点</li>
          <li>不同 SCC 之间的边<strong>不可能成环</strong>（否则它们会并成一个 SCC）</li>
          <li>把每个 SCC 看成一个点 → 原图变成 <strong>DAG</strong>（这是缩点的理论保证）</li>
        </ol>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">SCC ⇔ 极大集合 S，∀u,v ∈ S：u ⇝ v 且 v ⇝ u</p>
          <p class="text-xs text-cyan-600 text-center">有向图找 SCC 的两个主流算法：Kosaraju（两次 DFS）与 Tarjan（一次 DFS + 栈），复杂度都是 O(V+E)</p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          SCC ≈ <strong>社交圈里互相都认识的小团体</strong>。微信里 A 认识 B、B 认识 C、C 认识 A，这三个人就能拉一个群；群里任何两人都互相认识（双向好友关系）。<br/>
          反过来，单向关注不算：微博上你关注了明星、明星不关注你，你们不在一个 SCC 里。<br/>
          前端里也很像 <strong>npm 包之间的循环依赖</strong>：A 依赖 B、B 依赖 C、C 又依赖 A，三个包形成一个「依赖环」——这就是一个 SCC，构建工具必须识别它。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：把无向图的「连通分量」思路直接套到有向图</strong><br/>
          无向图里「能走到」是双向的，只要边连通就算一个分量；有向图必须<strong>双向可达</strong>才算同一分量。
          例如 A→B 但 B 到不了 A：无向视角它们连通，有向视角它们是<strong>两个</strong> SCC。用 BFS/DFS 随便走一遍就分组，在有向图上会得出错误答案。</p>
        </aside>
      </section>

      <!-- 2. Kosaraju -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          Kosaraju 算法 —— 两次 DFS + 逆图
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Kosaraju 用一个漂亮的观察：<strong>缩点后的 DAG 上按「完成时间」逆序处理，每次在逆图上 DFS 恰好圈出一个 SCC</strong>。
          它的正确性依赖：原图里从 SCC₁ 指向 SCC₂ 的边，在逆序处理时保证「先处理出度大的分量」，从而逆图 DFS 不会串到别的分量。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>建逆图</strong>：把每条边 u→v 反向成 v→u</li>
          <li><strong>第一次 DFS</strong>（在 G 上）：记录每个节点「完成」的顺序（后序 order）</li>
          <li><strong>按 order 的逆序</strong>依次取未访问节点，在<strong>逆图</strong>上 DFS</li>
          <li>每次逆图 DFS 访问到的整组节点 = 一个 SCC</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="kosarajuCode" title="kosaraju.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          逆图 ≈ <strong>把关注关系反转</strong>：微博的「我关注谁」反转成「谁关注我」。<br/>
          完成顺序 ≈ <strong>会议散场的时间戳</strong>：先开完的会议先散场。Kosaraju 说：从「散场最晚」的那个会开始，在反向关系里顺藤摸瓜，就能把同一圈子的人一次全捞出来。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 1：第二次 DFS 没按「逆完成序」处理</strong><br/>
          必须 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">for i = order.length-1 … 0</code>。按正序处理会在逆图上把多个分量串在一起，得到错误的合并结果。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 2：逆图建反 / 忘建逆图</strong><br/>
          第二次 DFS 必须跑在<strong>逆图</strong>上。若还在原图上跑，无法把「出边指向已处理分量」的节点隔离，分组会错。<br/>
          另外逆图的边数与原图相同，只是方向反转：<code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">rg[v].push(u)</code>。</p>
        </aside>
      </section>

      <!-- 3. Tarjan -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          Tarjan 算法 —— dfn / low + 显式栈，一次 DFS 搞定
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Tarjan 只跑<strong>一次 DFS</strong>，核心是两个时间戳：
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">dfn[u]</code>（访问次序）与
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">low[u]</code>（u 及其子树经「回边/横叉边」能回溯到的最小 dfn）。
          当 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">low[u] === dfn[u]</code> 时，栈顶到 u 之间所有节点就构成一个 SCC。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>进入 u：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">dfn[u] = low[u] = ++timer</code>，u 入栈</li>
          <li>遍历邻居 v：未访问 → 递归；递归回来 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">low[u] = min(low[u], low[v])</code>（树边）</li>
          <li>v 已访问且在栈内（回边）→ <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">low[u] = min(low[u], dfn[v])</code>（⚠️ 用 dfn[v] 不是 low[v]）</li>
          <li>u 处理完：若 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">low[u] === dfn[u]</code>，弹栈到 u 为止，整段就是一个 SCC</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="tarjanCode" title="tarjan.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <code class="bg-slate-100 text-purple-800 px-1.5 py-0.5 rounded text-xs font-mono">low[u]</code> ≈ <strong>「能回溯到的最早祖先」</strong>，类似 Git 里找两个分支的 <strong>merge-base（共同祖先）</strong>。<br/>
          如果 u 的整个子树里有人能通过「绕路」（回边）连到 u 的祖先，low 就被拉低，u 就不是分量的「根」；一旦 low 拉不低（等于自己的 dfn），说明 u 的子树是独立王国 → 弹栈收编。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：回边更新 low 时用了 low[v] 而不是 dfn[v]</strong><br/>
          对回边 v（已在栈内）必须写 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">low[u] = Math.min(low[u], dfn[v])</code>。
          用 low[v] 会把「还没走完的子树」的 low 传回来，导致 low 值虚低、SCC 合并时机错乱。只有<strong>树边</strong>（v 未访问）递归返回后才用 low[v]。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：忘了「多起点」——图不连通时从每个未访问节点出发</strong><br/>
          外层必须 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">for u of V: if (!dfn[u]) dfs(u)</code>。
          只从一个点开始，漏掉其他连通片的节点，会得到不完整的 SCC 集合。</p>
        </aside>
      </section>

      <!-- 4. 缩点 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          缩点成 DAG —— 把问题搬到「无环图」上解决
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          得到所有 SCC 后，把每个分量缩成一个<strong>超节点</strong>，跨分量的边保留（去重）——
          缩点后的图一定是 <strong>DAG</strong>（否则环上的分量早该合并）。于是很多「有环图难题」变成「DAG 上可做的题」：
          <strong>拓扑排序、最长链、2-SAT、循环依赖检测</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="condenseCode" title="condense.ts" /></div>
        <ul class="space-y-2 text-slate-600 mb-4 text-sm">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>循环依赖检测</strong>：构建工具（webpack/vite）报的 Circular Dependency，就是在一个 SCC 里</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>2-SAT</strong>：判不可满足 ⇔ 变量与其否定在同一 SCC（经典归约）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>可达性/最长路径</strong>：缩点成 DAG 后按拓扑序 DP</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>缩点数量</strong> = SCC 数量；每个原节点记下归属（comp[u]）即可</span></li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          缩点 ≈ <strong>把一组紧密耦合的模块打包成一个 npm 包</strong>。包里任意两个文件互相 import（强连通），但对外只暴露一个入口；<br/>
          包与包之间构成<strong>依赖 DAG</strong>，构建工具按拓扑序打包，谁先谁后一目了然——这就是把「乱成一团的有向环」整理成「有序无环依赖图」。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：缩点时重边没去重</strong><br/>
          两个分量之间可能有<strong>多条</strong>原边（如 A→D、B→D、C→D 都指向 D），缩点后应只保留一条 S1→S2。
          不去重会污染后续拓扑排序的入度统计或最长链 DP。用 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">Set</code> 去重（见上方代码）。</p>
        </aside>
      </section>

      <!-- 5. 复杂度与应用 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          复杂度 O(V+E) 与选型
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-2">⏱️ 时间复杂度</p>
            <ul class="text-xs text-slate-600 space-y-1 font-mono">
              <li>Kosaraju：2 次 DFS → O(V+E)</li>
              <li>Tarjan：1 次 DFS → O(V+E)</li>
              <li>缩点：遍历边一次 → O(V+E)</li>
              <li>空间：邻接表 + 栈/逆图 → O(V+E)</li>
            </ul>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-2">⚖️ 怎么选</p>
            <ul class="text-xs text-slate-600 space-y-1">
              <li>▸ 追求<strong>简洁好写</strong> → Kosaraju（两次 DFS，直觉性强）</li>
              <li>▸ 追求<strong>一次遍历 / 省内存</strong> → Tarjan（无需逆图）</li>
              <li>▸ 递归爆栈风险大时 → Tarjan 迭代栈版，或 Kosaraju 显式栈</li>
              <li>▸ 稠密图注意邻接矩阵 vs 邻接表的内存取舍</li>
            </ul>
          </div>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>两个算法都只需要 <code class="bg-slate-100 text-blue-800 px-1.5 py-0.5 rounded text-xs font-mono">O(V+E)</code> 的线性时间，是「图论里少有的线性可解难题之一」——这也是它们能用于超大图（如全站循环依赖扫描）的原因。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：Tarjan 与 Kosaraju 求 SCC
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          固定有向图：<strong>A→B→C→A</strong> 与 <strong>D→E→D</strong>，C→D 单向连接。
          橙 = 当前访问，绿 = 已完成；节点下方标注 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">dfn:low</code>（Tarjan）或 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">fin:n</code>（Kosaraju 完成序）。
          找到的每个 SCC 用同一种颜色分组高亮。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔗 边数: {{ edgeCount }}</span>
          <span v-if="stackInfo" class="bg-violet-50 text-violet-700 px-2 py-1 rounded-full font-mono">🗂️ 栈: {{ stackInfo }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="runTarjan" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">🔵 Tarjan 求 SCC</button>
          <button @mousedown="runKosaraju" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">🟣 Kosaraju 求 SCC</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-arrow v-for="e in gEdges" :key="'e'+e.from+e.to" :config="edgeCfg(e)" />
              <v-circle v-for="n in gNodes" :key="'c'+n.id" :config="circleCfg(n)" />
              <v-text v-for="n in gNodes" :key="'t'+n.id" :config="labelCfg(n)" />
              <v-text v-for="n in gNodes" :key="'m'+n.id" :config="metaCfg(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>定义</strong>：SCC = 有向图中互相可达的极大子图；分量间至多单向可达</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Kosaraju</strong>：正图 DFS 记完成序 → 逆图按逆序 DFS，每次圈出一个 SCC</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Tarjan</strong>：一次 DFS，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">low[u] === dfn[u]</code> 时弹栈得 SCC；回边更新用 dfn[v]</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>缩点</strong>：分量合并为超节点，原图变成 DAG，可拓扑排序</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度</strong>：两算法均 O(V+E)，空间 O(V+E)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>应用</strong>：循环依赖检测、2-SAT、缩点 + DAG DP</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-5-network-flow/dsa-6-5-3-bipartite-match" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：二分图最大匹配与最大流归约</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-6-connectivity/dsa-6-6-2-bridge-cut" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：桥与割点：Tarjan求无向图连通性 →</RouterLink>
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
  { id: "sec-1", name: "强连通与 SCC 定义" },
  { id: "sec-2", name: "Kosaraju：两次 DFS" },
  { id: "sec-3", name: "Tarjan：dfn/low + 栈" },
  { id: "sec-4", name: "缩点成 DAG" },
  { id: "sec-5", name: "复杂度与应用" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 SCC 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
// SCC 分组色板（深色系，保证白字可读）
const SCC = ['#0284c7', '#db2777', '#7c3aed', '#059669', '#d97706']
const H = ref(360), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const stackInfo = ref('')
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

interface GNode { id: string; label: string; x: number; y: number; color: string }
interface GEdge { from: string; to: string; color: string }
const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])
const meta = reactive<Record<string, string>>({ A:'', B:'', C:'', D:'', E:'' })

const NODES = ['A', 'B', 'C', 'D', 'E']
const POS: Record<string, { x: number; y: number }> = {
  A: { x: 150, y: 80 }, B: { x: 70, y: 190 }, C: { x: 230, y: 190 },
  D: { x: 430, y: 95 }, E: { x: 540, y: 190 },
}
const EDGES: [string, string][] = [['A','B'], ['B','C'], ['C','A'], ['C','D'], ['D','E'], ['E','D']]

const edgeCount = computed(() => gEdges.length)

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)
  NODES.forEach(id => gNodes.push({ id, label: id, x: POS[id].x, y: POS[id].y, color: C.cyan }))
  EDGES.forEach(([a, b]) => gEdges.push({ from: a, to: b, color: '#94a3b8' }))
  for (const id of NODES) meta[id] = ''
}
function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function colorOf(id: string, c: string) { const n = pos(id); if (n) n.color = c }
function allCyan() { gNodes.forEach(n => n.color = C.cyan) }
function colorEdge(a: string, b: string, c: string) {
  const e = gEdges.find(x => x.from === a && x.to === b)
  if (e) e.color = c
}
function succOf(id: string): string[] { return gEdges.filter(e => e.from === id).map(e => e.to) }
function revOf(id: string): string[] { return gEdges.filter(e => e.to === id).map(e => e.from) }
function resetAll() {
  allCyan()
  gEdges.forEach(e => e.color = '#94a3b8')
  for (const id of NODES) meta[id] = ''
  stackInfo.value = ''
  status.value = ''; opLabel.value = ''
}
function edgeCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  const hot = e.color !== '#94a3b8'
  return { points: [a.x, a.y, b.x, b.y], stroke: e.color, fill: e.color, strokeWidth: hot ? 3 : 2, pointerLength: 10, pointerWidth: 8 }
}
function circleCfg(n: GNode) {
  let stroke = '#0891b2', sw = 1.5
  if (n.color === C.orange) { stroke = '#d97706'; sw = 3 }
  else if (n.color === C.green) { stroke = '#16a34a'; sw = 3 }
  else if (n.color === C.red) { stroke = '#b91c1c'; sw = 3 }
  else if (n.color !== C.cyan) { stroke = '#334155'; sw = 2.5 }   // SCC 分组色
  return { x: n.x, y: n.y, radius: 22, fill: n.color, stroke, strokeWidth: sw, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function labelCfg(n: GNode) {
  return { x: n.x - 22, y: n.y - 22, width: 44, height: 44, text: n.label, fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: n.color === C.green ? C.text : '#fff', align: 'center', verticalAlign: 'middle' }
}
function metaCfg(n: GNode) {
  return { x: n.x - 30, y: n.y + 24, width: 60, height: 14, text: meta[n.id] || '', fontSize: 10, fontFamily: 'monospace', fill: C.muted, align: 'center', verticalAlign: 'middle' }
}

async function runTarjan() {
  if (busy.value) return
  busy.value = true; opLabel.value = 'Tarjan O(V+E)'
  resetAll()
  const dfn: Record<string, number> = {}
  const low: Record<string, number> = {}
  const onStack: Record<string, boolean> = {}
  const stk: string[] = []
  const sccs: string[][] = []
  let timer = 0
  try {
    const syncMeta = () => { for (const id of NODES) meta[id] = dfn[id] ? dfn[id] + ':' + low[id] : '' }
    const dfs = async (u: string) => {
      dfn[u] = low[u] = ++timer
      onStack[u] = true
      stk.push(u)
      stackInfo.value = stk.join('→')
      colorOf(u, C.orange)
      syncMeta()
      status.value = `进入 ${u}：dfn=${dfn[u]}，low=${low[u]}，压栈`
      await d(500)
      for (const v of succOf(u)) {
        if (dfn[v] === undefined) {
          colorEdge(u, v, C.blue)
          status.value = `树边 ${u}→${v}`
          await d(420)
          await dfs(v)
          low[u] = Math.min(low[u], low[v])
          syncMeta()
          status.value = `回填 low[${u}] = min(low[${u}], low[${v}]) = ${low[u]}`
          await d(500)
        } else if (onStack[v]) {
          colorEdge(u, v, C.orange)
          status.value = `回边 ${u}→${v}：low[${u}] = min(low[${u}], dfn[${v}]=${dfn[v]})`
          await d(500)
          low[u] = Math.min(low[u], dfn[v])
          syncMeta()
          colorEdge(u, v, '#94a3b8')
        }
      }
      if (low[u] === dfn[u]) {
        const comp: string[] = []
        while (stk.length) {
          const w = stk.pop()!
          onStack[w] = false
          comp.push(w)
          if (w === u) break
        }
        stackInfo.value = stk.join('→')
        sccs.push(comp)
        const col = SCC[(sccs.length - 1) % SCC.length]
        comp.forEach(w => colorOf(w, col))
        status.value = `low[${u}] === dfn[${u}]，弹出 SCC {${[...comp].reverse().join(',')}}`
        await d(700)
      }
    }
    for (const id of NODES) if (dfn[id] === undefined) await dfs(id)
    status.value = `✅ Tarjan 完成：${sccs.length} 个 SCC —— ` + sccs.map(c => '{' + [...c].reverse().join(',') + '}').join('  ')
  } finally {
    await d(400); busy.value = false; opLabel.value = ''
  }
}

async function runKosaraju() {
  if (busy.value) return
  busy.value = true; opLabel.value = 'Kosaraju O(V+E)'
  resetAll()
  const visited: Record<string, boolean> = {}
  const order: string[] = []
  const sccs: string[][] = []
  try {
    // 第一遍：正图 DFS，记录完成序
    const dfs1 = async (u: string) => {
      visited[u] = true
      colorOf(u, C.orange)
      status.value = `第 1 次 DFS：访问 ${u}`
      await d(420)
      for (const v of succOf(u)) {
        if (!visited[v]) await dfs1(v)
      }
      order.push(u)
      meta[u] = 'fin:' + order.length
      colorOf(u, C.green)
      status.value = `完成 ${u}，完成序第 ${order.length} 位`
      await d(420)
    }
    for (const id of NODES) if (!visited[id]) await dfs1(id)
    status.value = `完成序(后序): ${order.join(' → ')}；逆序处理: ${[...order].reverse().join(' → ')}`
    await d(900)

    // 第二遍：逆图上按逆完成序 DFS
    allCyan()
    for (const id of NODES) meta[id] = ''
    const visited2: Record<string, boolean> = {}
    const dfs2 = async (u: string, comp: string[]) => {
      visited2[u] = true
      comp.push(u)
      colorOf(u, C.orange)
      status.value = `逆图 DFS：从 ${u} 出发收集 SCC`
      await d(420)
      for (const v of revOf(u)) {
        if (!visited2[v]) await dfs2(v, comp)
      }
    }
    for (const u of [...order].reverse()) {
      if (visited2[u]) continue
      const comp: string[] = []
      await dfs2(u, comp)
      const col = SCC[sccs.length % SCC.length]
      comp.forEach(w => colorOf(w, col))
      sccs.push(comp)
      status.value = `✅ 逆图上圈出一个 SCC {${comp.join(',')}}`
      await d(700)
    }
    status.value = `✅ Kosaraju 完成：${sccs.length} 个 SCC —— ` + sccs.map(c => '{' + c.join(',') + '}').join('  ')
  } finally {
    await d(400); busy.value = false; opLabel.value = ''
  }
}

function doReset() {
  if (busy.value) return
  resetAll()
}

let ro: ResizeObserver | null = null
onMounted(() => {
  initGraph()
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const kosarajuCode = `// ===== Kosaraju：两次 DFS + 逆图 =====
// 思路：第一次 DFS 记录"完成顺序"，第二次按完成顺序的逆序在逆图上 DFS
function kosaraju(n: number, g: number[][]): number[][] {
    // 1. 建逆图：所有边反向
    const rg: number[][] = Array.from({ length: n }, () => [])
    for (let u = 0; u < n; u++) {
        for (const v of g[u]) rg[v].push(u)
    }

    // 2. 第一次 DFS（原图）：按"完成时间"收集后序
    const visited = new Array<boolean>(n).fill(false)
    const order: number[] = []
    const dfs1 = (u: number) => {
        visited[u] = true
        for (const v of g[u]) if (!visited[v]) dfs1(v)
        order.push(u)                       // 完成时才记录
    }
    for (let u = 0; u < n; u++) if (!visited[u]) dfs1(u)

    // 3. 第二次 DFS（逆图）：按 order 的逆序遍历
    //    每次 DFS 圈出的整组节点就是一个 SCC
    const sccs: number[][] = []
    visited.fill(false)
    for (let i = n - 1; i >= 0; i--) {
        const u = order[i]
        if (visited[u]) continue
        const comp: number[] = []
        const dfs2 = (x: number) => {
            visited[x] = true
            comp.push(x)
            for (const v of rg[x]) if (!visited[v]) dfs2(v)
        }
        dfs2(u)
        sccs.push(comp)
    }
    return sccs
}

// 例：0→1→2→0（环），2→3，3→4→3（环）
// g = [[1], [2], [0, 3], [4], [3]]
// 结果: [[0,1,2], [3,4]] —— 两个 SCC
// 复杂度: O(V+E) 时间，O(V+E) 空间（含逆图）`

const tarjanCode = `// ===== Tarjan：dfn / low + 显式栈，一次 DFS 求 SCC =====
// dfn[u] = 访问次序；low[u] = u 及其子树能回溯到的最小 dfn
function tarjan(n: number, g: number[][]): number[][] {
    const dfn = new Array<number>(n).fill(0)
    const low = new Array<number>(n).fill(0)
    const onStack = new Array<boolean>(n).fill(false)
    const stack: number[] = []
    const sccs: number[][] = []
    let timer = 0

    const dfs = (u: number) => {
        dfn[u] = low[u] = ++timer
        stack.push(u); onStack[u] = true
        for (const v of g[u]) {
            if (dfn[v] === 0) {                 // 树边：继续 DFS
                dfs(v)
                low[u] = Math.min(low[u], low[v])
            } else if (onStack[v]) {            // 回边：v 还在栈内
                low[u] = Math.min(low[u], dfn[v])   // ⚠️ 用 dfn[v]，不是 low[v]
            }
        }
        // u 是 SCC 的"根"：low[u] === dfn[u]，弹栈收编整个分量
        if (low[u] === dfn[u]) {
            const comp: number[] = []
            while (true) {
                const w = stack.pop()!
                onStack[w] = false
                comp.push(w)
                if (w === u) break
            }
            sccs.push(comp)
        }
    }
    for (let u = 0; u < n; u++) if (dfn[u] === 0) dfs(u)   // 多起点
    return sccs
}

// 复杂度：每个点每条边只访问一次 → O(V+E)，比 Kosaraju 少建一张逆图`

const condenseCode = `// ===== 缩点：每个 SCC 合并成一个"超节点"，得到 DAG =====
interface Condensed {
    dag: number[][]   // 缩点后的有向无环图（超节点编号 = SCC 下标）
    comp: number[]    // 每个原节点属于哪个超节点
}

function condense(n: number, g: number[][], sccs: number[][]): Condensed {
    const comp = new Array<number>(n).fill(-1)
    sccs.forEach((group, i) => group.forEach(u => (comp[u] = i)))

    const m = sccs.length
    const dag: number[][] = Array.from({ length: m }, () => [])
    const seen = new Set<string>()          // ⚠️ 去重：同一对超节点只留一条边
    for (let u = 0; u < n; u++) {
        for (const v of g[u]) {
            const cu = comp[u], cv = comp[v]
            if (cu !== cv) {
                const key = cu + '->' + cv
                if (!seen.has(key)) { seen.add(key); dag[cu].push(cv) }
            }
        }
    }
    return { dag, comp }
}

// 缩点后一定是 DAG → 可拓扑排序
// 应用：循环依赖检测、2-SAT（变量与其否定同 SCC 即矛盾）、DAG 上 DP`
</script>
