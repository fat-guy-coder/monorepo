<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌲 并查集：路径压缩 / 按秩合并 / 带权</h1>
          <p class="text-sm text-slate-500 mt-1">管理「不相交集合」的森林 —— 近乎 O(α(n)) 的合并与查询</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-5-4</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：一片「向上指的森林」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          并查集（Union-Find / Disjoint Set）用一棵<strong>森林</strong>表示若干<strong>不相交集合</strong>：
          每个集合是一棵树，<strong>根节点代表整个集合</strong>。数组 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">parent[x]</code> 存 x 的父节点，
          根节点满足 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">parent[x] === x</code>。下图是 3 个集合：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">{0,1,2}</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">{3,4}</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">{5,6}</code>。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="uf-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">3 个不相交集合 —— 箭头从子指向父，绿圈 = 根（集合代表）</text>

            <!-- 边（子 → 父，箭头向上） -->
            <line x1="110" y1="196" x2="110" y2="154" stroke="#94a3b8" stroke-width="2" marker-end="url(#uf-arr)" />
            <line x1="110" y1="106" x2="150" y2="66" stroke="#94a3b8" stroke-width="2" marker-end="url(#uf-arr)" />
            <line x1="360" y1="106" x2="360" y2="68" stroke="#94a3b8" stroke-width="2" marker-end="url(#uf-arr)" />
            <line x1="560" y1="106" x2="560" y2="68" stroke="#94a3b8" stroke-width="2" marker-end="url(#uf-arr)" />

            <!-- 集合 A -->
            <circle cx="160" cy="44" r="24" fill="#06b6d4" stroke="#22c55e" stroke-width="3" />
            <text x="160" y="44" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <circle cx="110" cy="130" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="110" y="130" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <circle cx="110" cy="220" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="110" y="220" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">0</text>
            <text x="160" y="14" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#16a34a" font-weight="bold">集合 A = {0,1,2}</text>

            <!-- 集合 B -->
            <circle cx="360" cy="44" r="24" fill="#06b6d4" stroke="#22c55e" stroke-width="3" />
            <text x="360" y="44" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <circle cx="360" cy="130" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="130" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <text x="360" y="14" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#16a34a" font-weight="bold">集合 B = {3,4}</text>

            <!-- 集合 C -->
            <circle cx="560" cy="44" r="24" fill="#06b6d4" stroke="#22c55e" stroke-width="3" />
            <text x="560" y="44" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
            <circle cx="560" cy="130" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="560" y="130" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <text x="560" y="14" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#16a34a" font-weight="bold">集合 C = {5,6}</text>

            <text x="16" y="286" font-size="11" font-family="monospace" fill="#64748b">parent = [1, 2, 2, 4, 4, 6, 6] —— 根节点 parent[x] === x（2、4、6）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：并查集结构 —— 每棵树是一个集合，根是集合代表，判断「是否同集合」= 判断「根是否相同」</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：路径压缩（find 摊平链） 与 按秩合并（union 挂小树）</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">find(0)：沿链上溯到根 2，再把路径节点直接挂到根</p>
            <svg viewBox="0 0 340 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="uf-pc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
              </defs>
              <!-- before -->
              <line x1="80" y1="156" x2="80" y2="118" stroke="#f59e0b" stroke-width="2" marker-end="url(#uf-pc)" />
              <line x1="80" y1="86" x2="108" y2="50" stroke="#f59e0b" stroke-width="2" marker-end="url(#uf-pc)" />
              <circle cx="80" cy="176" r="20" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="80" y="176" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">0</text>
              <circle cx="80" cy="100" r="20" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="80" y="100" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <circle cx="118" cy="32" r="20" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="118" y="32" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
              <!-- after -->
              <line x1="250" y1="176" x2="272" y2="56" stroke="#16a34a" stroke-width="2" marker-end="url(#uf-pc)" />
              <line x1="290" y1="176" x2="282" y2="56" stroke="#16a34a" stroke-width="2" marker-end="url(#uf-pc)" />
              <circle cx="250" cy="176" r="20" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="250" y="176" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">0</text>
              <circle cx="290" cy="176" r="20" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="290" y="176" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
              <circle cx="280" cy="32" r="20" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="280" y="32" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
              <text x="16" y="184" font-size="10" font-family="monospace" fill="#16a34a">压缩后：0 和 1 都直接指向根 2（深度 1）</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">路径压缩把链「摊平」，摊还后近乎 O(α(n))</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">union(2,4)：按秩合并，rank 小的根挂到 rank 大的根</p>
            <svg viewBox="0 0 340 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="uf-un" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <!-- before -->
              <circle cx="90" cy="50" r="22" fill="#06b6d4" stroke="#22c55e" stroke-width="3" />
              <text x="90" y="50" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <text x="90" y="86" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">rank=2</text>
              <circle cx="230" cy="50" r="22" fill="#06b6d4" stroke="#22c55e" stroke-width="3" />
              <text x="230" y="50" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <text x="230" y="86" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">rank=1</text>
              <!-- after -->
              <line x1="230" y1="58" x2="122" y2="58" stroke="#16a34a" stroke-width="2.5" marker-end="url(#uf-un)" />
              <circle cx="90" cy="140" r="22" fill="#06b6d4" stroke="#22c55e" stroke-width="3" />
              <text x="90" y="140" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <circle cx="230" cy="140" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="230" y="140" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <text x="16" y="176" font-size="10" font-family="monospace" fill="#16a34a">rank[2] &gt; rank[4]，故 parent[4] = 2（小树挂大树）</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">按秩合并防止树退化成长链</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 概念 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          parent 数组 与 find 找根 —— 两个元素同集合吗？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          并查集只回答一个核心问题：<strong>x 和 y 是否属于同一个集合</strong>？答案藏在「根」里——
          一路沿 <code>parent</code> 爬到顶，<strong>根相同则同集合</strong>。初始每个元素各自为根（<code>parent[i] = i</code>），
          随着 <code>union</code> 逐渐合并成森林。
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">同集合 ⇔ find(x) === find(y)</p>
          <p class="text-xs text-cyan-600 text-center">find(x) 一路向上爬到根；union(x,y) 让两个根「合二为一」</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="unionFindCode" title="union_find.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          并查集 ≈ 前端的<strong>「组件归属 / 集合合并」</strong>问题。<br/>
          <code>find(x)</code> ≈ 找一个组件<strong>最终归属哪个父级容器</strong>（一路 <code>parentElement</code> 爬到顶）；<br/>
          <code>union(x,y)</code> ≈ <strong>把两个独立模块合并成一个</strong>（比如两个 feature flag 合并成同一组，或两个 DOM 分支挂到同一父节点）。<br/>
          也像 <strong>社交软件的好友合并</strong>——判断「A 和 B 是不是一个圈子」，就是比较他们各自圈子的「群主（根）」是不是同一个人。
          </p>
        </aside>
      </section>

      <!-- 2. 路径压缩 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          路径压缩 —— 为什么能把链「摊平」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          如果 union 时总是把新元素挂到某条链的末尾，树会退化成长链，find 变 O(n)。
          <strong>路径压缩</strong>的妙处：在 find(x) 的过程中，顺手把<strong>沿途每个节点直接指向根</strong>。
          这样「查一次，摊平一路」，后续查询就短了。它是<strong>摊还分析</strong>的经典案例。
        </p>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">递归一行：parent[x] = find(parent[x]) —— 返回根的同时，把 x 挂到根</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="pathCompressionCode" title="path_compression.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 为什么是摊还近常数：</strong>单次 find 可能 O(log n) 甚至 O(n)，但每次压缩都「买一送一」——高代价的深链被摊平后，后续大量查询都变成 O(1)。配合按秩合并，总复杂度摊还后是<strong>反阿克曼函数 α(n)</strong>，实际中 &le; 5，可视为常数。</p>
        </aside>
      </section>

      <!-- 3. 按秩合并 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          按秩 / 按大小合并 —— 防止树退化
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          只做路径压缩还不够——若 union 总是「大树挂到小树」，树高仍会增大。
          <strong>按秩（rank，近似树高）合并</strong>的规则很朴素：<strong>矮树挂到高树</strong>，
          只有两树等高时新树高度才 +1。这样树高被严格控制在 O(log n)。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>找到两个根 <code>rx</code>、<code>ry</code></li>
          <li><code>rank[rx] &lt; rank[ry]</code> → <code>parent[rx] = ry</code>（矮的挂到高的）</li>
          <li><code>rank[rx] &gt; rank[ry]</code> → <code>parent[ry] = rx</code></li>
          <li>相等 → 任选一个挂过去，并把新根的 rank +1</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="unionByRankCode" title="union_by_rank.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 按大小 vs 按秩：</strong>也可以用<strong>集合大小 size</strong>（小集合并入大集合），效果等价。但「rank」只在相等时 +1、且<strong>只在根节点上维护</strong>——合并后非根节点的 rank 不再更新，这是刻意的优化，别误以为 rank 始终等于真实高度。</p>
        </aside>
      </section>

      <!-- 4. 带权并查集 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          带权并查集 —— 在边上附加「关系」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          普通并查集只知道「在不在同一集合」。<strong>带权并查集</strong>在节点上额外存一个<strong>权值</strong>（相对父节点的关系，如「吃/被吃」「距离」「差值」），
          路径压缩时把沿途权值<strong>累加</strong>，union 时<strong>推导</strong>新权值。典型应用是<strong>食物链</strong>问题。
        </p>
        <div class="mb-4"><Code language="ts" :code="weightedCode" title="weighted_union_find.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>带权并查集把「关系」压成一个可合并的数值。路径压缩时 <code>weight[x] += weight[parent[x]]</code> 把「x→父」和「父→根」两条边合并成「x→根」，和树状数组的「前缀和累积」是同一套「路径上信息合并」的思想。</p>
        </aside>
      </section>

      <!-- 5. 应用与常见错误 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          应用场景 与 常见错误
        </h2>
        <div class="mb-4"><Code language="ts" :code="appCode" title="union_find_applications.ts" /></div>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>连通分量</strong>——无向图里有多少个连通块（根的数量）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>最小生成树 Kruskal</strong>——按边权升序，用并查集判环（两端已连通则跳过）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>朋友圈问题</strong>（#547）——本质就是数连通分量</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>等价关系 / 动态连通性</strong>——网络连通、岛屿合并、账户合并等</span></li>
        </ul>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 1：union 时直接改 parent 而不找根</strong><br/>
          合并必须是<strong>「两个根」之间</strong>发生：<code>parent[find(x)] = find(y)</code>。若写 <code>parent[x] = y</code>，会把 x 从原集合里「拽」出来，破坏树结构。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 2：路径压缩后忘了递归返回的是根</strong><br/>
          递归版 <code>find</code> 必须 <code>return parent[x]</code>（压缩后父节点就是根）。漏了 return，或返回 <code>x</code>，会拿到错误的结果。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 3：只看「连接了」就认为同集合</strong><br/>
          必须用 <code>find</code> 到根再比较。中途的 <code>parent</code> 值可能还没被压缩（是中间节点），直接比较 <code>parent[a] === parent[b]</code> 会误判。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：union 合并 与 find 路径压缩
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          橙 = 正在上溯的路径，绿 = 根 / 被压缩的节点，绿圈 = 根。观察 <strong>union 挂小树</strong> 和 <strong>find 摊平链</strong>。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 元素数: {{ unodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🌲 集合数: {{ setCount }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status || '试试合并或查找' }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <span class="text-xs text-slate-500">union(</span>
          <input v-model.number="ua" type="number" min="0" max="6" class="w-12 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-shadow" />
          <span class="text-xs text-slate-500">,</span>
          <input v-model.number="ub" type="number" min="0" max="6" class="w-12 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-shadow" />
          <span class="text-xs text-slate-500">)</span>
          <button @mousedown="doUnion" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:border-green-300 hover:shadow-sm">🔗 合并</button>
          <span class="text-xs text-slate-500 ml-2">find(</span>
          <input v-model.number="fx" type="number" min="0" max="6" class="w-12 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition-shadow" />
          <span class="text-xs text-slate-500">)</span>
          <button @mousedown="doFind" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm">🔍 查找(压缩)</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-arrow v-for="e in uEdges" :key="'e'+e.a+'-'+e.b" :config="uEdgeCfg(e)" />
              <v-circle v-for="n in unodes" :key="'c'+n.id" :config="uCircleCfg(n)" />
              <v-text v-for="n in unodes" :key="'t'+n.id" :config="uTextCfg(n)" />
              <v-text v-for="n in unodes" :key="'l'+n.id" :config="uLabelCfg(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>本质</strong>：用森林表示不相交集合，根 = 集合代表，同集合 ⇔ 根相同</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>find</strong>：一路向上找根；<strong>路径压缩</strong>把沿途节点直接挂到根，摊平链</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>union</strong>：<strong>按秩合并</strong>——矮树挂高树，防止退化成链</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度</strong>：两优化叠加后摊还近乎 <strong>O(α(n))</strong>，实际视为常数</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>带权并查集</strong>：边上附加「关系」，路径压缩时累加权值（食物链问题）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>应用</strong>：连通分量、最小生成树 Kruskal、朋友圈、动态连通性</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-5-advanced-tree/dsa-4-5-3-fenwick" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：树状数组 BIT</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-1-binary-heap/dsa-5-1-1-structure" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：堆的结构 →</RouterLink>
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
  { id: "sec-1", name: "parent 与 find" },
  { id: "sec-2", name: "路径压缩" },
  { id: "sec-3", name: "按秩合并" },
  { id: "sec-4", name: "带权并查集" },
  { id: "sec-5", name: "应用与常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 并查集动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#0f172a', muted:'#64748b', ghost:'#e2e8f0' }
const R = 24
const H = ref(300), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const ua = ref(2), ub = ref(4), fx = ref(0)
const box = ref<HTMLDivElement>()

const PARENT0 = [1, 2, 2, 4, 4, 6, 6]
const RANK0 = [0, 0, 2, 0, 1, 0, 1]
const parent = reactive<number[]>([...PARENT0])
const rank = reactive<number[]>([...RANK0])

interface UNode { id: number; x: number; y: number; color: string; s: number }
const unodes = reactive<UNode[]>([])
const uEdges = reactive<{ a: number; b: number }[]>([])

// 固定坐标（x 用比例，y 固定）
const UPOS: { fx: number; y: number }[] = [
  { fx: 110 / 720, y: 220 },  // 0
  { fx: 110 / 720, y: 130 },  // 1
  { fx: 160 / 720, y: 44 },   // 2
  { fx: 360 / 720, y: 130 },  // 3
  { fx: 360 / 720, y: 44 },   // 4
  { fx: 560 / 720, y: 130 },  // 5
  { fx: 560 / 720, y: 44 },   // 6
]

const d = (ms: number) => new Promise(r => setTimeout(r, ms))
const pos = (id: number) => unodes.find(n => n.id === id)!

function isRoot(id: number) { return parent[id] === id }
const setCount = computed(() => { let c = 0; for (let i = 0; i < parent.length; i++) if (parent[i] === i) c++; return c })

function layout() {
  unodes.length = 0
  for (let id = 0; id < UPOS.length; id++) {
    unodes.push({ id, x: UPOS[id].fx * W.value, y: UPOS[id].y, color: C.cyan, s: 1 })
  }
  syncEdges()
}
function syncEdges() {
  uEdges.length = 0
  for (let id = 0; id < parent.length; id++) {
    if (parent[id] !== id) uEdges.push({ a: id, b: parent[id] })
  }
}
function uEdgeCfg(e: { a: number; b: number }) {
  const a = pos(e.a), b = pos(e.b)
  const dx = b.x - a.x, dy = b.y - a.y
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len, uy = dy / len
  return { points: [a.x + ux * R, a.y + uy * R, b.x - ux * R, b.y - uy * R], stroke: '#94a3b8', fill: '#94a3b8', strokeWidth: 2, pointerLength: 8, pointerWidth: 6 }
}
function uCircleCfg(n: UNode) {
  const root = isRoot(n.id)
  const stroke = n.color === C.orange ? '#d97706' : (root ? '#22c55e' : '#64748b')
  const sw = n.color === C.orange ? 3 : (root ? 2.5 : 1.5)
  return { x: n.x, y: n.y, radius: R * n.s, fill: n.color, stroke, strokeWidth: sw, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function uTextCfg(n: UNode) {
  return { x: n.x - R, y: n.y - R, width: R * 2, height: R * 2, text: String(n.id), fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: n.color === C.green ? C.text : '#fff', align: 'center', verticalAlign: 'middle', scale: { x: n.s, y: n.s } }
}
function uLabelCfg(n: UNode) {
  const text = isRoot(n.id) ? '根' : ('p→' + parent[n.id])
  return { x: n.x - 30, y: n.y + R + 4, width: 60, text, fontSize: 9, fontFamily: 'monospace', fill: isRoot(n.id) ? '#16a34a' : C.muted, align: 'center' }
}

function rootOf(x: number): number { while (parent[x] !== x) x = parent[x]; return x }
function resetColors() { for (const n of unodes) n.color = C.cyan }

async function doUnion() {
  if (busy.value) return
  const a = ua.value, b = ub.value
  if (isNaN(a) || isNaN(b) || a < 0 || a > 6 || b < 0 || b > 6) { status.value = '参数无效（需 0..6）'; return }
  busy.value = true; opLabel.value = 'union O(α(n))'; resetColors()
  try {
    const ra = rootOf(a), rb = rootOf(b)
    if (ra === rb) { status.value = `${a} 和 ${b} 已在同一集合（根 ${ra}）`; return }
    pos(ra).color = C.orange; pos(rb).color = C.orange
    status.value = `根：${ra}(rank=${rank[ra]}) vs ${rb}(rank=${rank[rb]})`; await d(500)
    if (rank[ra] < rank[rb]) {
      parent[ra] = rb
      status.value = `rank[${ra}] < rank[${rb}]，${ra} 挂到 ${rb}`
    } else if (rank[ra] > rank[rb]) {
      parent[rb] = ra
      status.value = `rank[${ra}] > rank[${rb}]，${rb} 挂到 ${ra}`
    } else {
      parent[rb] = ra; rank[ra]++
      status.value = `rank 相等，${rb} 挂到 ${ra}，rank[${ra}] = ${rank[ra]}`
    }
    syncEdges(); await d(550)
    resetColors()
    status.value = `✅ 合并完成，集合数 = ${setCount.value}`
  } finally {
    await d(300); busy.value = false; opLabel.value = ''
  }
}

async function doFind() {
  if (busy.value) return
  const x = fx.value
  if (isNaN(x) || x < 0 || x > 6) { status.value = '参数无效（需 0..6）'; return }
  busy.value = true; opLabel.value = 'find O(α(n))'; resetColors()
  try {
    const path: number[] = []
    let cur = x
    while (parent[cur] !== cur) {
      pos(cur).color = C.orange
      status.value = `沿 parent 上溯: ${cur} → ${parent[cur]}`; await d(450)
      path.push(cur)
      cur = parent[cur]
    }
    pos(cur).color = C.green
    status.value = `找到根 ${cur}`; await d(500)
    for (const nd of path) {
      parent[nd] = cur
      pos(nd).color = C.green
    }
    syncEdges(); await d(500)
    status.value = `✅ 路径压缩：${path.length ? path.join('、') + ' 直接指向根' : x + ' 本身就是根'} ${cur}`
  } finally {
    await d(300); busy.value = false; opLabel.value = ''
  }
}

function doReset() {
  parent.length = 0; parent.push(...PARENT0)
  rank.length = 0; rank.push(...RANK0)
  resetColors(); syncEdges(); status.value = ''; opLabel.value = ''
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
const unionFindCode = `// ===== 并查集：parent 数组 + find(路径压缩) + union(按秩) =====
class UnionFind {
    private parent: number[]
    private rank: number[]    // 近似树高，用于按秩合并

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i)  // 初始各自为根
        this.rank = new Array(n).fill(0)
    }

    // find：找根 + 路径压缩（递归版，一行摊平链）
    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x])  // 把 x 直接挂到根
        }
        return this.parent[x]
    }

    // union：按秩合并，小树挂到大树
    union(x: number, y: number): void {
        const rx = this.find(x), ry = this.find(y)
        if (rx === ry) return                     // 已在同一集合
        if (this.rank[rx] < this.rank[ry]) {
            this.parent[rx] = ry                  // rx 树矮，挂到 ry 下
        } else if (this.rank[rx] > this.rank[ry]) {
            this.parent[ry] = rx
        } else {
            this.parent[ry] = rx
            this.rank[rx]++                       // 一样高，合并后高度 +1
        }
    }

    connected(x: number, y: number): boolean { return this.find(x) === this.find(y) }
}

// 演示
const uf = new UnionFind(7)
uf.union(0, 1); uf.union(1, 2)   // {0,1,2}
uf.union(3, 4)                    // {3,4}
uf.union(5, 6)                    // {5,6}
console.log(uf.connected(0, 2))   // true
console.log(uf.connected(0, 3))   // false`

const pathCompressionCode = `// ===== 路径压缩：为什么能摊平链 =====
// 没有压缩的 find：每次都从头爬到底，链越长越慢
function findNaive(parent: number[], x: number): number {
    while (parent[x] !== x) x = parent[x]
    return x
}
// 若 0→1→2→3（链），find(0) 要爬 3 步，n 个元素退化成 O(n)

// 有压缩的 find：查一次，把沿途节点全部直接挂到根
function find(parent: number[], x: number): number {
    if (parent[x] !== x) {
        parent[x] = find(parent, parent[x])
    }
    return parent[x]
}
// find(0) 在 0→1→2 的链上执行后：
//   parent[0] = 2, parent[1] = 2
// 结果：0 和 1 都直接指向根 2，后续 find 变成 O(1)

// 迭代版（避免递归栈，路径压缩同样生效）：
function findIter(parent: number[], x: number): number {
    let root = x
    while (parent[root] !== root) root = parent[root]   // 先找根
    while (parent[x] !== x) {                            // 再把路径压缩
        const next = parent[x]
        parent[x] = root
        x = next
    }
    return root
}

// 摊还分析：单次可能慢，但每次压缩都让后续大量查询变快，
// 总代价摊还后 ≈ O(α(n))，α 是增长极慢的反阿克曼函数`

const unionByRankCode = `// ===== 按秩合并：防止树退化 =====
// 若每次都把大树挂到小树（或总是往同一条链上挂），树会越来越高
// 规则：矮树挂到高树，只有等高时新树高度才 +1

function union(parent: number[], rank: number[], x: number, y: number): void {
    const rx = find(parent, x), ry = find(parent, y)
    if (rx === ry) return

    if (rank[rx] < rank[ry]) {
        parent[rx] = ry          // rx 更矮 → 挂到 ry
    } else if (rank[rx] > rank[ry]) {
        parent[ry] = rx          // ry 更矮 → 挂到 rx
    } else {
        parent[ry] = rx          // 一样高，任选方向
        rank[rx]++               // 只有这种情况新树高度 +1
    }
}

// 为什么树高被压到 O(log n)？
// rank 为 k 的树，其下至少挂着 2^k 个节点（归纳可得）
// → 有 n 个节点时，最大 rank ≤ log n
// → find 路径长度 ≤ log n，再叠加路径压缩，摊还后近乎常数`

const weightedCode = `// ===== 带权并查集：边上附加「关系」=====
// weight[x] = x 相对 parent[x] 的权值（如食物链中的 0/1/2 三类关系）
class WeightedUnionFind {
    private parent: number[]
    private weight: number[]

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i)
        this.weight = new Array(n).fill(0)
    }

    // 带权 find：路径压缩时，把「x→父」和「父→根」两条边合并
    find(x: number): number {
        if (this.parent[x] !== x) {
            const root = this.find(this.parent[x])
            this.weight[x] += this.weight[this.parent[x]]  // 累加沿途权值
            this.parent[x] = root
        }
        return this.parent[x]
    }

    // 带权 union：给定 x 相对 y 的关系 d
    union(x: number, y: number, d: number): void {
        const rx = this.find(x), ry = this.find(y)
        if (rx === ry) return   // 已在同集合，可校验关系是否矛盾
        this.parent[rx] = ry
        this.weight[rx] = d + this.weight[y] - this.weight[x]  // 推导新权值
    }

    // 查询 x 相对 y 的关系
    relation(x: number, y: number): number {
        return this.weight[x] - this.weight[y]
    }
}

// 应用：食物链（#1182）——「A 吃 B」三种关系构成环，
// 用带权并查集维护相对关系，检测新增关系是否与已有关系矛盾`

const appCode = `// ===== 应用 1：无向图连通分量个数 =====
function countComponents(n: number, edges: [number, number][]): number {
    const uf = new UnionFind(n)
    for (const [a, b] of edges) uf.union(a, b)
    const roots = new Set<number>()
    for (let i = 0; i < n; i++) roots.add(uf.find(i))
    return roots.size
}
console.log(countComponents(4, [[0, 1], [2, 3]]))  // 输出: 2

// ===== 应用 2：最小生成树 Kruskal（用并查集判环）=====
// 按边权升序，两端未连通则加入（否则会成环，跳过）
function kruskal(n: number, edges: { a: number; b: number; w: number }[]): number {
    edges.sort((x, y) => x.w - y.w)
    const uf = new UnionFind(n)
    let total = 0
    for (const e of edges) {
        if (uf.find(e.a) !== uf.find(e.b)) {
            uf.union(e.a, e.b)
            total += e.w
        }
    }
    return total
}

// ===== 应用 3：朋友圈（#547）=====
// n 个人，M[i][j]=1 表示 i 和 j 是朋友，求朋友圈数量
// 本质 = 连通分量个数，并查集是标准解法：
// 遍历 M 的上三角，M[i][j]===1 就 union(i,j)，最后数根的数量`

</script>
