<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🧭 图分类：有向 / 无向 / 加权 / 二分 / DAG</h1>
          <p class="text-sm text-slate-500 mt-1">先认清图的类型，才能选对算法</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-1-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：一张图，五个分类维度
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          图的分类不是互斥的——同一张图可以<strong>同时</strong>是「有向 + 加权 + DAG」，也可以是「无向 + 无权 + 二分」。
          每个分类维度都直接决定<strong>能用哪些算法</strong>：二分图可跑匈牙利匹配，DAG 才能拓扑排序，无向无权图用 BFS 就够最短路……
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="t2-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="t5-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">五个分类维度：无向 / 有向 / 加权 / 二分 / DAG</text>

            <!-- 1 无向图 -->
            <line x1="60" y1="85" x2="130" y2="85" stroke="#94a3b8" stroke-width="2" />
            <line x1="60" y1="85" x2="95" y2="165" stroke="#94a3b8" stroke-width="2" />
            <line x1="130" y1="85" x2="95" y2="165" stroke="#94a3b8" stroke-width="2" />
            <circle cx="60" cy="85" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="60" y="85" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="130" cy="85" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="130" y="85" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="95" cy="165" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="95" y="165" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <text x="95" y="212" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">无向图</text>

            <!-- 2 有向图 -->
            <line x1="225" y1="85" x2="295" y2="85" stroke="#94a3b8" stroke-width="2" marker-end="url(#t2-arr)" />
            <line x1="225" y1="85" x2="260" y2="165" stroke="#94a3b8" stroke-width="2" marker-end="url(#t2-arr)" />
            <line x1="295" y1="85" x2="260" y2="165" stroke="#94a3b8" stroke-width="2" marker-end="url(#t2-arr)" />
            <circle cx="225" cy="85" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="225" y="85" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="295" cy="85" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="295" y="85" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="260" cy="165" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="260" y="165" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <text x="260" y="212" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">有向图</text>

            <!-- 3 加权图 -->
            <line x1="390" y1="85" x2="460" y2="85" stroke="#94a3b8" stroke-width="2" />
            <line x1="390" y1="85" x2="425" y2="165" stroke="#94a3b8" stroke-width="2" />
            <line x1="460" y1="85" x2="425" y2="165" stroke="#94a3b8" stroke-width="2" />
            <text x="425" y="70" font-size="10" font-family="monospace" fill="#64748b">2</text>
            <text x="398" y="132" font-size="10" font-family="monospace" fill="#64748b">5</text>
            <text x="450" y="132" font-size="10" font-family="monospace" fill="#64748b">3</text>
            <circle cx="390" cy="85" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="390" y="85" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="460" cy="85" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="460" y="85" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="425" cy="165" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="425" y="165" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <text x="425" y="212" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">加权图</text>

            <!-- 4 二分图 -->
            <line x1="555" y1="85" x2="615" y2="85" stroke="#94a3b8" stroke-width="2" />
            <line x1="555" y1="85" x2="615" y2="165" stroke="#94a3b8" stroke-width="2" />
            <line x1="555" y1="165" x2="615" y2="85" stroke="#94a3b8" stroke-width="2" />
            <circle cx="555" cy="85" r="20" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
            <text x="555" y="85" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">L1</text>
            <circle cx="555" cy="165" r="20" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
            <text x="555" y="165" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">L2</text>
            <circle cx="615" cy="85" r="20" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
            <text x="615" y="85" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">R1</text>
            <circle cx="615" cy="165" r="20" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
            <text x="615" y="165" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">R2</text>
            <text x="585" y="212" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">二分图</text>

            <!-- 5 DAG -->
            <line x1="655" y1="70" x2="700" y2="115" stroke="#94a3b8" stroke-width="2" marker-end="url(#t5-arr)" />
            <line x1="700" y1="115" x2="655" y2="160" stroke="#94a3b8" stroke-width="2" marker-end="url(#t5-arr)" />
            <circle cx="655" cy="70" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="655" y="70" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="700" cy="115" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="700" y="115" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="655" cy="160" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="655" y="160" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <text x="678" y="212" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">DAG</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：五个分类维度——同一份顶点布局，不同的「方向 / 权值 / 划分 / 环」属性</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：二分图判定 before/after —— BFS 双色染色</h3>
        <figure class="mb-2">
          <svg viewBox="0 0 720 230" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="t6-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">二分图判定 before/after：BFS 双色染色</text>

            <text x="40" y="50" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">before：未着色</text>
            <line x1="70" y1="95" x2="150" y2="95" stroke="#94a3b8" stroke-width="2" />
            <line x1="70" y1="95" x2="150" y2="165" stroke="#94a3b8" stroke-width="2" />
            <line x1="70" y1="165" x2="150" y2="95" stroke="#94a3b8" stroke-width="2" />
            <circle cx="70" cy="95" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 2" />
            <text x="70" y="95" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#475569">L1</text>
            <circle cx="70" cy="165" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 2" />
            <text x="70" y="165" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#475569">L2</text>
            <circle cx="150" cy="95" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 2" />
            <text x="150" y="95" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#475569">R1</text>
            <circle cx="150" cy="165" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 2" />
            <text x="150" y="165" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#475569">R2</text>

            <line x1="330" y1="120" x2="392" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#t6-arr)" />
            <text x="330" y="146" font-size="10" font-family="monospace" fill="#64748b">BFS 双色</text>

            <text x="420" y="50" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">after：染色成功 → 是二分图</text>
            <line x1="370" y1="95" x2="450" y2="95" stroke="#94a3b8" stroke-width="2" />
            <line x1="370" y1="95" x2="450" y2="165" stroke="#94a3b8" stroke-width="2" />
            <line x1="370" y1="165" x2="450" y2="95" stroke="#94a3b8" stroke-width="2" />
            <circle cx="370" cy="95" r="20" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
            <text x="370" y="95" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">L1</text>
            <circle cx="370" cy="165" r="20" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
            <text x="370" y="165" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">L2</text>
            <circle cx="450" cy="95" r="20" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
            <text x="450" y="95" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">R1</text>
            <circle cx="450" cy="165" r="20" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
            <text x="450" y="165" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">R2</text>

            <text x="40" y="205" font-size="11" font-family="monospace" fill="#64748b">若某条边两端被染成同色 ⇒ 冲突 ⇒ 不是二分图（存在奇环）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：二分图判定操作——相邻顶点必须异色，全图无冲突即二分</figcaption>
        </figure>
      </section>

      <!-- 1. 有向 vs 无向 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          有向图 vs 无向图
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>无向图</strong>的边没有方向：A-B 与 B-A 是同一条边，从 A 能到 B 就一定能从 B 回 A（双向可达）。
          <strong>有向图</strong>的边是单行道：A→B 只保证从 A 走到 B，不一定能原路返回。
        </p>
        <ul class="list-disc list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>无向图适合：社交好友关系、道路网（双向）、对称耦合关系</li>
          <li>有向图适合：关注/粉丝、页面跳转、资金流向、编译依赖</li>
          <li>代码差异只有一行：加边时无向图要<strong>双向登记</strong>，有向图只登记一次</li>
        </ul>
        <div class="mb-4"><Code language="ts" :code="buildAdjCode" title="directed_vs_undirected.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>有向图 ≈ <strong>路由跳转</strong>——<code>router.push('/home')</code> 是从 A 页走到 B 页的单向动作，
          浏览器地址栏记录的是「跳转历史」（一条有向链），而不是「谁和谁互相链接」。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>把有向图当无向图建（多补了反向边），或反过来（漏了反向边）。
          判定方法：写加边代码时问一句「从 v 能回 u 吗？」——能回 = 无向。</p>
        </aside>
      </section>

      <!-- 2. 加权 vs 无权 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          加权图 vs 无权图
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>无权图</strong>只回答「能不能到」；<strong>加权图</strong>在每条边上挂一个数字（距离 / 成本 / 容量 / 时间），回答「花多少代价到」。
          无权图可看成「所有边权 = 1」的加权图特例。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">性质</th><th class="px-4 py-2 border border-slate-200 font-semibold">无权图</th><th class="px-4 py-2 border border-slate-200 font-semibold">加权图</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">最短路径算法</td><td class="px-4 py-2 border font-mono text-emerald-600">BFS O(V+E)</td><td class="px-4 py-2 border font-mono">Dijkstra / Bellman-Ford / Floyd</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">最小生成树</td><td class="px-4 py-2 border font-mono">任意生成树</td><td class="px-4 py-2 border font-mono">Prim / Kruskal</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">边权为负</td><td class="px-4 py-2 border font-mono">——</td><td class="px-4 py-2 border font-mono">Dijkstra 失效 → Bellman-Ford / SPFA</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">边列表形状</td><td class="px-4 py-2 border font-mono">[u, v]</td><td class="px-4 py-2 border font-mono">[u, v, w]</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="weightedCode" title="weighted_adj.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>无权图 ≈ 判断「A 组件是否依赖 B 组件」；加权图 ≈ 给依赖加上「体积 / 加载耗时」权重，
          于是打包优化就从「依赖能不能拆」变成「先拆掉最重的依赖」——这是 webpack 拆包报告的核心思路。</p>
        </aside>
      </section>

      <!-- 3. 稀疏 vs 稠密 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          稀疏图 vs 稠密图
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          V 个顶点的无向图最多有 <code>V(V-1)/2</code> 条边。边数 <code>E ≈ V</code> 是<strong>稀疏图</strong>（如社交网络、网页链接），
          <code>E ≈ V²</code> 是<strong>稠密图</strong>（如棋盘两两可走、完全图）。
          稠密度直接决定选邻接矩阵还是邻接表（见 6-1-1），也影响算法复杂度：
        </p>
        <ul class="list-disc list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>邻接表 + DFS/BFS：O(V + E)，稀疏图极快</li>
          <li>邻接矩阵：O(V²) 空间，稠密图查相邻 O(1)</li>
          <li>Prim 稠密版 O(V²)、稀疏版 O(E log V)——同一算法两种实现对应两种稠密度</li>
        </ul>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>只按「顶点数」选算法，不看边数。
          V=10⁴ 但 E=10⁷ 的稠密图用 O(E log V) 的堆优化 Dijkstra 反而不如 O(V²) 朴素版——先算 E 再选实现。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>拿不准稠密度时，先算 <code>E / (V²/2)</code>；比值 &lt; 0.1 按稀疏图对待，&gt; 0.5 按稠密图对待。</p>
        </aside>
      </section>

      <!-- 4. 二分图 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          二分图（Bipartite Graph）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>二分图</strong>的顶点能分成两组 U、V，使得<strong>所有边都只连接 U 与 V 之间</strong>，组内没有边。
          判定方法：BFS 双色染色——相邻顶点必须异色，出现同色即失败。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>从任意未染色顶点出发，染颜色 0，入队</li>
          <li>BFS：出队顶点 u 的所有邻居染成 <code>1 - color[u]</code>（未染则染并入队）</li>
          <li>若邻居已染色且与 u 同色 → 冲突 → 不是二分图</li>
          <li>所有连通分量处理完仍无冲突 → 是二分图</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="bipartiteCode" title="is_bipartite.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>二分图 ≈ <strong>「用户 - 商品」二部推荐图</strong>：用户只连商品、商品只连用户，
          用户之间不直接连边。推荐系统、标签分配、任务-工人匹配都是二分图模型。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>二分图 ⇔ 无奇环。判定染色冲突等价于发现「长度为奇数的环」。</p>
        </aside>
      </section>

      <!-- 5. DAG -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          DAG 及其意义
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>DAG（有向无环图）</strong>= 有向图 + 无环。它的意义在于<strong>存在拓扑序</strong>：能把所有顶点排成一条线，
          使得每条边的起点都排在终点之前——「依赖」可以被排序、被串行执行、被分层处理。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>所有入度为 0 的顶点入队（它们不依赖任何人，先执行）</li>
          <li>出队一个顶点 u，把它从图中「删掉」：u 的所有后继入度减 1</li>
          <li>入度变为 0 的后继立刻入队</li>
          <li>重复直到队空：出队顺序 = 一个合法拓扑序；若出队数 &lt; V，说明图中有环，不是 DAG</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="dagCode" title="is_dag.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>DAG ≈ <strong>npm 依赖树 / React 组件树</strong>——
          <code>package.json</code> 的依赖必须无环，否则安装顺序无解；组件树也只能是 DAG（父组件依赖子组件，不能互相依赖成环）。
          打包器（Rollup/Vite）按拓扑序决定模块的打包与执行顺序。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>把「有向无环」拆开理解——只记住「有方向」忘了「无环」。
          DAG 的两个条件缺一不可：无向但有环不是 DAG，有向有环也不是 DAG。</p>
        </aside>
      </section>

      <!-- 6. 类型判定 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">6</span>
          类型判定：拿到图先回答三个问题
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          实际做题/工程里，图的类型常常「隐含在输入格式里」。动手前先问三连：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>有向吗？</strong>——看建表语义：登记一次 = 有向，登记两次 = 无向</li>
          <li><strong>带权吗？</strong>——看边形状：<code>[u, v]</code> 无权，<code>[u, v, w]</code> 带权</li>
          <li><strong>是 DAG 吗？</strong>——有向图跑拓扑排序，排得完 = 无环 = DAG</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="detectCode" title="detect_type.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>图的「类型」不是猜出来的，而是<strong>建图时选择出来的</strong>——
          选错类型（如把有向建成无向）比选错算法更致命，因为它会让所有后续算法在错误的数据上跑。</p>
        </aside>
      </section>

      <!-- 7. 常见错误 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">7</span>
          常见错误与陷阱
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>有向/无向建错</strong>——多登记或少登记反向边，连通性、最短路全错。<br/>
          ② <strong>无权图用 Dijkstra</strong>——BFS 的 O(V+E) 就能算最短路，Dijkstra 反而多一个堆的 log。<br/>
          ③ <strong>带负权边还用 Dijkstra</strong>——负权边会破坏「已确定」的贪心性质，必须换 Bellman-Ford / SPFA。<br/>
          ④ <strong>二分判定忘了处理多个连通分量</strong>——只从 0 号顶点 BFS，会把另一个分量的图漏判。<br/>
          ⑤ <strong>把 DAG 当成普通有向图</strong>——DAG 能拓扑排序，普通有向图有环则不能，别混用。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆口诀：</strong>「<strong>有向看登记、带权看三元、DAG 跑拓扑、二分染双色</strong>」——
          四个判定，各有一招。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：同一顶点布局，四种图类型
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          顶点位置完全不变，只改「边的性质」：<strong>无向图</strong>用直线、<strong>有向图</strong>用箭头、<strong>加权图</strong>在边上标数字、
          <strong>DAG</strong> 用箭头展示单向且无环的依赖链。点击按钮切换，观察同一批顶点如何变成不同类型的图。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="switchMode('undirected')" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">🔀 无向图</button>
          <button @mousedown="switchMode('directed')" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">➡️ 有向图</button>
          <button @mousedown="switchMode('weighted')" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">⚖️ 加权图</button>
          <button @mousedown="switchMode('dag')" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">📐 DAG</button>
          <button @mousedown="autoCycle" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">▶️ 自动轮播</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in undEdges" :key="'l'+e.from+e.to" :config="edgeCfg(e)" />
              <v-arrow v-for="e in dirEdges" :key="'a'+e.from+e.to" :config="arrowCfg(e)" />
              <v-text v-for="e in weightedEdges" :key="'w'+e.from+e.to" :config="weightCfg(e)" />
              <v-circle v-for="n in gNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in gNodes" :key="'t'+n.id" :config="labelCfg(n)" />
            </v-layer>
          </v-stage>
        </div>
        <p class="text-xs text-slate-400 mt-1">图例：直线 = 无向边；箭头 = 有向边；边上数字 = 权值。DAG 中 A→B→D→E 与 A→C→E 均为单向无环链。</p>
      </section>

      <!-- 小结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>有向 vs 无向：</strong>看登记次数——一次 = 有向，两次 = 无向</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>加权 vs 无权：</strong>无权 BFS 即最短路；加权选 Dijkstra / Bellman-Ford / Floyd</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>稀疏 vs 稠密：</strong>E≈V 稀疏、E≈V² 稠密，先算 E 再选数据结构与算法实现</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>二分图：</strong>BFS 双色、相邻异色，冲突 = 有奇环；可跑匹配类算法</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>DAG：</strong>有向 + 无环 = 可拓扑排序 = 依赖可排序，npm / React 组件树都是 DAG</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>判定口诀：</strong>有向看登记、带权看三元、DAG 跑拓扑、二分染双色</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-1-foundation/dsa-6-1-1-repr" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：图的表示：邻接表/邻接矩阵/边列表</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-1-foundation/dsa-6-1-3-degree" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：度/入度/出度与握手定理 →</RouterLink>
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
  { id: "sec-1", name: "有向 vs 无向" },
  { id: "sec-2", name: "加权 vs 无权" },
  { id: "sec-3", name: "稀疏 vs 稠密" },
  { id: "sec-4", name: "二分图" },
  { id: "sec-5", name: "DAG 及其意义" },
  { id: "sec-6", name: "类型判定代码" },
  { id: "sec-7", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-8", name: "小结" },
]

// ===== 🎬 图动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

interface GNode { id: string; label: string; x: number; y: number; color: string }
interface GEdge { from: string; to: string; w: number; color: string; directed: boolean }
const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])

const ids = ['A', 'B', 'C', 'D', 'E']
const POS: Record<string, [number, number]> = { A:[110,90], B:[290,90], C:[200,190], D:[110,290], E:[290,290] }

type GraphMode = 'undirected' | 'directed' | 'weighted' | 'dag'
const mode = ref<GraphMode>('undirected')

const MODE_DESC: Record<GraphMode, string> = {
  undirected: '无向图：边没有方向，A-B 与 B-A 是同一条边',
  directed: '有向图：边有方向，A→B 只能从 A 走到 B',
  weighted: '加权图：每条边带权值（距离/成本/容量）',
  dag: 'DAG：有向且无环，存在拓扑序，依赖可排序',
}

const EDGE_SPEC: Record<GraphMode, Array<[string, string, number]>> = {
  undirected: [['A','B',0],['A','C',0],['B','C',0],['B','D',0],['C','E',0],['D','E',0]],
  directed:   [['A','B',0],['A','C',0],['B','C',0],['B','D',0],['C','E',0],['D','E',0]],
  weighted:   [['A','B',4],['A','C',2],['B','C',1],['B','D',5],['C','E',3],['D','E',6]],
  dag:        [['A','B',0],['A','C',0],['B','D',0],['C','D',0],['C','E',0],['D','E',0]],
}

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)   // ⚠️ 清空 reactive 数组必须用 splice(0)，禁止 length = 0
  ids.forEach(id => gNodes.push({ id, label: id, x: POS[id][0], y: POS[id][1], color: C.cyan }))
  applyMode('undirected')
}

function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function allCyan() { gNodes.forEach(n => n.color = C.cyan) }

function applyMode(m: GraphMode) {
  mode.value = m
  gEdges.splice(0)
  const directed = m === 'directed' || m === 'dag'
  EDGE_SPEC[m].forEach(([u, v, w]) => gEdges.push({ from: u, to: v, w, color: '#94a3b8', directed }))
  allCyan()
  status.value = MODE_DESC[m]
}

function switchMode(m: GraphMode) {
  if (busy.value) return
  applyMode(m)
}

async function autoCycle() {
  act('自动轮播四种图类型', '轮播', async () => {
    for (const m of ['undirected', 'directed', 'weighted', 'dag'] as GraphMode[]) {
      applyMode(m)
      await d(1500)
    }
  })
}

function doReset() {
  applyMode('undirected')
  opLabel.value = ''
}

async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

const undEdges = computed(() => gEdges.filter(e => !e.directed))
const dirEdges = computed(() => gEdges.filter(e => e.directed))
const weightedEdges = computed(() => gEdges.filter(e => e.w > 0))

function edgeCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { points:[a.x, a.y, b.x, b.y], stroke:'#94a3b8', strokeWidth:2 }
}
function arrowCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { points:[a.x, a.y, b.x, b.y], fill:'#94a3b8', stroke:'#94a3b8', strokeWidth:2, pointerLength:12, pointerWidth:9 }
}
function weightCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { x:(a.x+b.x)/2 - 12, y:(a.y+b.y)/2 - 8, width:24, text:String(e.w), fontSize:11, fontFamily:'monospace', fill:C.muted, align:'center' }
}
function circleCfg(n: GNode) {
  return { x:n.x, y:n.y, radius:22, fill:n.color, stroke:'#0891b2', strokeWidth:1.5, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
}
function labelCfg(n: GNode) {
  return { x:n.x-22, y:n.y-22, width:44, height:44, text:n.label, fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle' }
}

let ro: ResizeObserver|null = null
onMounted(() => {
  initGraph()
  if (box.value) { W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const buildAdjCode = `// ===== 有向 vs 无向：区别只在「登记几次」=====
// 有向图加边：只 push 一次（u → v，单向可达）
// 无向图加边：push 两次（u ↔ v，双向可达）

function buildAdj(
    n: number,
    edges: Array<[number, number]>,
    directed: boolean,
): number[][] {
    const adj: number[][] = Array.from({ length: n }, () => [])
    for (const [u, v] of edges) {
        adj[u].push(v)
        if (!directed) adj[v].push(u)   // 无向才补反向
    }
    return adj
}

// 有向图：A→B、A→C  →  adj[A] = [B, C]，但 adj[B] 不含 A
// 无向图：A-B、A-C   →  adj[A] = [B, C]，且 adj[B] 含 A

// 自检：从 v 能回到 u 吗？能回 = 无向`

const weightedCode = `// ===== 加权图：邻接表里每个邻居带一个权值 =====
// 无权图：adj[u] = [v1, v2]（邻居列表）
// 加权图：adj[u] = [[v1, w1], [v2, w2]]（邻居 + 权值）

type WeightedAdj = Map<number, Array<[number, number]>>

function buildWeighted(edges: Array<[number, number, number]>): WeightedAdj {
    const adj: WeightedAdj = new Map()
    for (const [u, v, w] of edges) {
        if (!adj.has(u)) adj.set(u, [])
        adj.get(u)!.push([v, w])
        if (!adj.has(v)) adj.set(v, [])
        adj.get(v)!.push([u, w])       // 无向加权；有向删掉这行
    }
    return adj
}

// 用途：Dijkstra / Prim / Floyd 都需要权值
// 特例：无权图 = 所有边权都是 1 → BFS 就是最短路`

const bipartiteCode = `// ===== 二分图判定：BFS 双色法 =====
// 思路：起点染 0，邻居必须染 1，下一层再染 0……
// 若某顶点被迫和邻居同色 ⇒ 冲突 ⇒ 不是二分图
function isBipartite(n: number, adj: number[][]): boolean {
    const color = Array(n).fill(-1)          // -1 未染色；0 / 1 两种颜色
    for (let s = 0; s < n; s++) {            // 处理多个连通分量！
        if (color[s] !== -1) continue
        color[s] = 0
        const q = [s]
        while (q.length) {
            const u = q.shift()!
            for (const v of adj[u]) {
                if (color[v] === -1) { color[v] = 1 - color[u]; q.push(v) }
                else if (color[v] === color[u]) return false   // 冲突！
            }
        }
    }
    return true
}

// 关键结论：二分图 ⇔ 图中没有「奇数长度的环」
// 应用：用户-商品匹配、任务分配、棋盘黑白染色`

const dagCode = `// ===== DAG 判定：拓扑排序（入度法）=====
// 思路：反复删「入度为 0」的顶点；删不完 ⇒ 有环 ⇒ 不是 DAG
function isDAG(n: number, edges: Array<[number, number]>): boolean {
    const adj: number[][] = Array.from({ length: n }, () => [])
    const indeg = Array(n).fill(0)
    for (const [u, v] of edges) { adj[u].push(v); indeg[v]++ }

    const q: number[] = []
    for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i)

    let cnt = 0
    while (q.length) {
        const u = q.shift()!
        cnt++
        for (const v of adj[u]) if (--indeg[v] === 0) q.push(v)
    }
    return cnt === n          // 全部出队 ⇒ 无环 ⇒ DAG
}

// DAG 的价值：存在拓扑序 → 依赖可排序 → 任务可串行
// 前端：npm 依赖树、打包器模块图都必须是 DAG`

const detectCode = `// ===== 类型判定三连问：拿到图先回答三个问题 =====
// ① 有向吗？ → 建表时 push 一次（有向）还是两次（无向）？
// ② 带权吗？ → 边是 [u, v] 还是 [u, v, w]？
// ③ 是 DAG？→ 有向图跑拓扑排序，排得完 = 无环 = DAG

type RawEdge = [number, number] | [number, number, number]

// 从边的形状判断「是否带权」：三元组就是带权
const isWeighted = (edges: RawEdge[]) => edges.some(e => e.length === 3)

// 判断「有向与否」要看建表语义，而不是边本身：
// 同样的 [[0,1],[1,2]]，登记一次是 0→1→2 链，登记两次成无向链
function build(n: number, edges: RawEdge[], directed: boolean): number[][] {
    const adj: number[][] = Array.from({ length: n }, () => [])
    for (const e of edges) {
        const [u, v] = e
        adj[u].push(v)
        if (!directed) adj[v].push(u)
    }
    return adj
}

// 是否 DAG：复用拓扑排序（见 DAG 一节）
// 结论：图的「类型」不是猜出来的，而是建图时「选择」出来的`
</script>
