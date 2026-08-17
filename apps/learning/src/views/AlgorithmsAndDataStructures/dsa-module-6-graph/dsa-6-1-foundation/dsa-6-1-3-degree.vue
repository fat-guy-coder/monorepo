<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔢 度 / 入度 / 出度与握手定理</h1>
          <p class="text-sm text-slate-500 mt-1">图的「度」是最朴素也最有用的统计量</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-1-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：度 = 连了几条边；∑度 = 2 × 边数
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>度（degree）</strong>是图论里最朴素也最强大的统计量：无向图中顶点 v 的度 = 与它相连的边数；
          有向图拆成<strong>入度</strong>（被谁指向）与<strong>出度</strong>（指向谁）。
          而<strong>握手定理</strong>把「所有顶点的度之和」和「边数」钉死在一个等式上：<code>∑deg = 2E</code>。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 285" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="16" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">无向图：每个顶点标注度数，∑deg = 2E（握手定理）</text>

            <line x1="110" y1="70" x2="290" y2="70" stroke="#94a3b8" stroke-width="2" />
            <line x1="110" y1="70" x2="200" y2="150" stroke="#94a3b8" stroke-width="2" />
            <line x1="290" y1="70" x2="200" y2="150" stroke="#94a3b8" stroke-width="2" />
            <line x1="110" y1="70" x2="110" y2="220" stroke="#94a3b8" stroke-width="2" />
            <line x1="290" y1="70" x2="290" y2="220" stroke="#94a3b8" stroke-width="2" />
            <line x1="200" y1="150" x2="290" y2="220" stroke="#94a3b8" stroke-width="2" />
            <line x1="110" y1="220" x2="290" y2="220" stroke="#94a3b8" stroke-width="2" />

            <!-- 奇度顶点：红色虚线圈 -->
            <circle cx="290" cy="70" r="28" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 3" />
            <circle cx="200" cy="150" r="28" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 3" />

            <circle cx="110" cy="70" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="110" y="70" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="290" cy="70" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="290" y="70" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="200" cy="150" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="200" y="150" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <circle cx="110" cy="220" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="110" y="220" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
            <circle cx="290" cy="220" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="290" y="220" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">E</text>

            <text x="110" y="102" font-size="11" font-family="monospace" fill="#64748b" text-anchor="middle">deg = 2</text>
            <text x="290" y="102" font-size="11" font-family="monospace" fill="#ef4444" text-anchor="middle">deg = 3</text>
            <text x="200" y="182" font-size="11" font-family="monospace" fill="#ef4444" text-anchor="middle">deg = 3</text>
            <text x="110" y="252" font-size="11" font-family="monospace" fill="#64748b" text-anchor="middle">deg = 2</text>
            <text x="290" y="252" font-size="11" font-family="monospace" fill="#64748b" text-anchor="middle">deg = 2</text>

            <text x="16" y="266" font-size="11" font-family="monospace" fill="#64748b">红色虚线圈 = 奇度顶点（共 2 个，偶数 ⇒ 握手定理推论成立）</text>
            <text x="16" y="282" font-size="12" font-family="monospace" fill="#0891b2" font-weight="bold">∑deg = 2+3+3+2+2 = 12 = 2 × 6 条边 ✓（握手定理）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：无向图度数标注——每个顶点的度 = 相连边数，所有度之和恰好等于两倍边数</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：有向图入度/出度 before/after —— 数箭头</h3>
        <figure class="mb-2">
          <svg viewBox="0 0 720 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="dg-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">有向图入度/出度 before/after：数一数每个顶点的箭头</text>

            <text x="40" y="48" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">before：只画边，不标数字</text>
            <line x1="92" y1="70" x2="168" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#dg-arr)" />
            <line x1="83" y1="88" x2="117" y2="132" stroke="#94a3b8" stroke-width="2" marker-end="url(#dg-arr)" />
            <line x1="177" y1="88" x2="143" y2="132" stroke="#94a3b8" stroke-width="2" marker-end="url(#dg-arr)" />
            <line x1="176" y1="87" x2="84" y2="193" stroke="#94a3b8" stroke-width="2" marker-end="url(#dg-arr)" />
            <line x1="146" y1="166" x2="174" y2="194" stroke="#94a3b8" stroke-width="2" marker-end="url(#dg-arr)" />
            <line x1="92" y1="210" x2="168" y2="210" stroke="#94a3b8" stroke-width="2" marker-end="url(#dg-arr)" />
            <circle cx="70" cy="70" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="70" y="70" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="190" cy="70" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="190" y="70" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="130" cy="150" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="130" y="150" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <circle cx="70" cy="210" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="70" y="210" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
            <circle cx="190" cy="210" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="190" y="210" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">E</text>

            <line x1="330" y1="120" x2="392" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#dg-arr)" />
            <text x="330" y="146" font-size="10" font-family="monospace" fill="#64748b">数箭头</text>

            <text x="420" y="48" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">after：标注入度 / 出度</text>
            <text x="420" y="76" font-size="12" font-family="monospace" fill="#334155">A: 入0 出2</text>
            <text x="420" y="102" font-size="12" font-family="monospace" fill="#334155">B: 入1 出2</text>
            <text x="420" y="128" font-size="12" font-family="monospace" fill="#334155">C: 入2 出1</text>
            <text x="420" y="154" font-size="12" font-family="monospace" fill="#334155">D: 入1 出1</text>
            <text x="420" y="180" font-size="12" font-family="monospace" fill="#334155">E: 入2 出0</text>
            <text x="420" y="214" font-size="12" font-family="monospace" fill="#16a34a" font-weight="bold">∑入 = 6 = ∑出 = 边数 ✓</text>

            <text x="40" y="242" font-size="11" font-family="monospace" fill="#64748b">出度 = 指向别人的箭头数；入度 = 指向自己的箭头数</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：有向图入度/出度统计操作——出度「向外数」，入度「向内数」，总和都等于边数</figcaption>
        </figure>
      </section>

      <!-- 1. 无向图的度 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          无向图的度
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          无向图中，顶点 v 的度 <code>deg(v)</code> = 与 v 相连的<strong>边数</strong>。
          一条边连接两个端点，所以<strong>每条边给两个端点各贡献 1 度</strong>——这是握手定理的直觉来源。
          用邻接表表示时，<code>deg(v) = adj[v].length</code>，一次遍历即可统计全部度数。
        </p>
        <ul class="list-disc list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>孤立点：deg = 0</li>
          <li>悬挂点（只连一条边）：deg = 1</li>
          <li>完全图 K_n：每个顶点 deg = n - 1</li>
          <li>自环（若有）：无向图自环贡献 <strong>2</strong> 度</li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>度 ≈ <strong>社交网络里某人的好友数</strong>——
          微信好友 500 人 = 你连着 500 条「好友边」；「认识的人多」在图中就是「度数高」，社区里的「热门节点」往往度数最高。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>把无向图的<strong>自环算成 1 度</strong>——自环从 v 出发又回到 v，一条边应贡献 <strong>2</strong> 度
          （严格定义下），否则求和会与握手定理对不上。</p>
        </aside>
      </section>

      <!-- 2. 有向图的入度/出度 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          有向图的入度 / 出度
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          有向图里「度」要拆成两个方向：<strong>出度 out(v)</strong> = v 指向别人的边数（箭头向外），
          <strong>入度 in(v)</strong> = 别人指向 v 的边数（箭头向内）。总度 = in + out。
          邻接表里 <code>out(v) = adj[v].length</code>，但入度必须<strong>遍历所有边</strong>统计「被指向次数」。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>初始化所有顶点 <code>[入度=0, 出度=0]</code></li>
          <li>遍历每个顶点 u 的邻居列表：<code>出度[u]++</code></li>
          <li>对邻居列表里的每个 v：<code>入度[v]++</code>（u 指向了 v）</li>
          <li>结果满足 <code>∑入 = ∑出 = E</code>，可用来校验统计是否正确</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>出度 ≈ <strong>关注数</strong>，入度 ≈ <strong>粉丝数</strong>——
          微博大 V 的粉丝数（入度）爆表、关注数（出度）很少；刷「僵尸粉」就是批量买入度。推荐算法常用入度衡量账号影响力。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>有向图里直接拿 <code>adj[v].length</code> 当「度」——
          它只是<strong>出度</strong>！入度要扫全图数「被指向」次数，二者混用会让拓扑排序、环检测全部跑偏。</p>
        </aside>
      </section>

      <!-- 3. 握手定理 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          握手定理（Handshaking Lemma）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>定理：</strong>任何无向图中，所有顶点的度之和等于边数的两倍：<code>∑deg(v) = 2E</code>。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>把每条边想象成一次「握手」：它连接两个端点</li>
          <li>统计度数 = 让每个端点把自己参与的握手各数一次</li>
          <li>于是每一条边被数了<strong>恰好两次</strong>（两个端点各一次）</li>
          <li>所以 ∑deg = 2E，两边都是偶数 → <strong>推论：奇度顶点个数必为偶数</strong></li>
        </ol>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">图</th><th class="px-4 py-2 border border-slate-200 font-semibold">度数</th><th class="px-4 py-2 border border-slate-200 font-semibold">∑deg</th><th class="px-4 py-2 border border-slate-200 font-semibold">2E</th><th class="px-4 py-2 border border-slate-200 font-semibold">验证</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">本页示例图</td><td class="px-4 py-2 border font-mono">2,3,3,2,2</td><td class="px-4 py-2 border font-mono">12</td><td class="px-4 py-2 border font-mono">2×6=12</td><td class="px-4 py-2 border font-mono text-emerald-600">✓</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">三角形 K₃</td><td class="px-4 py-2 border font-mono">2,2,2</td><td class="px-4 py-2 border font-mono">6</td><td class="px-4 py-2 border font-mono">2×3=6</td><td class="px-4 py-2 border font-mono text-emerald-600">✓</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">一条边 + 孤立点</td><td class="px-4 py-2 border font-mono">1,1,0</td><td class="px-4 py-2 border font-mono">2</td><td class="px-4 py-2 border font-mono">2×1=2</td><td class="px-4 py-2 border font-mono text-emerald-600">✓</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="handshakeCode" title="handshake.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>握手定理 ≈ <strong>聚会握手统计</strong>——每握一次手都被<strong>两个人</strong>同时记住，
          所以「所有人记住的握手次数之和」必然等于「握手总次数 × 2」。推论（奇度偶数个）就像「握过奇数次手的人一定成对出现」。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>统计度数时<strong>每条边只算了一次</strong>（∑deg = E），
          导致校验永远对不上——统计「度」必须数<strong>端点视角</strong>，一条边要贡献两次。</p>
        </aside>
      </section>

      <!-- 4. 度在算法中的应用 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          度在算法里的应用
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">度数看似简单，却是许多算法「启动」的钥匙：</p>
        <ul class="list-disc list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>判欧拉图（一笔画）</strong>：无向连通图——所有度数为偶 ⇒ 欧拉回路；恰好 2 个奇度 ⇒ 欧拉路径；否则不能一笔画</li>
          <li><strong>拓扑排序</strong>：先统计入度，入度为 0 的顶点（不依赖任何人）先出队</li>
          <li><strong>二分图着色辅助</strong>：贪心着色时先给度数大的顶点染色，冲突发现得更早</li>
          <li><strong>社交网络</strong>：度中心性（degree centrality）——「连接最多的节点最可能关键」</li>
          <li><strong>数据校验</strong>：用 ∑deg = 2E 检查读入的图数据是否自洽</li>
        </ul>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>判欧拉图时<strong>只数奇度顶点，忘了检查连通性</strong>——
          一个「两个孤立的三角形」所有顶点度数都是偶数，但它根本不是欧拉图（不连通，画不完）。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>看到「一笔画 / 奇偶度数 / 入度排序」类问题，第一步永远是<strong>O(V+E) 扫一遍统计度数</strong>，
          然后再决定用欧拉、拓扑还是其它算法。</p>
        </aside>
      </section>

      <!-- 5. 代码实战 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          代码实战：四种统计姿势
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          从「邻接表数邻居」到「矩阵行列求和」再到「一笔画判定」，度数统计的复杂度始终是 O(V + E)：
        </p>
        <div class="mb-4"><Code language="ts" :code="degreeCode" title="degree_list.ts" /></div>
        <div class="mb-4"><Code language="ts" :code="matrixDegreeCode" title="degree_matrix.ts" /></div>
        <div class="mb-4"><Code language="ts" :code="eulerCode" title="one_stroke.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>「一笔画」就是经典的<strong>欧拉路径问题</strong>（模块 6-6-3 会深入）。
          用度数做初步判定只需要 O(V+E)，连图都不用真正搜一遍——这就是「度」的价值。</p>
        </aside>
      </section>

      <!-- 6. 常见错误 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">6</span>
          常见错误与陷阱
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>有向图拿 adj[v].length 当入度</strong>——那是出度；入度必须扫全图统计被指向次数。<br/>
          ② <strong>自环度数算错</strong>——无向自环贡献 2 度、有向自环入/出各 1 度。<br/>
          ③ <strong>判欧拉图忘查连通性</strong>——度数全偶但图不连通，照样不能一笔画。<br/>
          ④ <strong>求和时每条边只算一次</strong>——∑deg 应该是 2E 而不是 E，统计的是「端点视角」。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆口诀：</strong>「<strong>无向度 = 邻居数；有向拆入出；∑度 = 2E；奇度必成双</strong>」——
          四个数字，握手定理全包。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：统计度数 / 高亮奇偶 / 有向切换
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          固定顶点布局，观察「度」的统计全过程：<strong>统计度数</strong>逐个标注 deg；<strong>高亮最大度</strong>标出最热门顶点；
          <strong>高亮奇数度</strong>用红色标出奇度顶点（B、C 两个，偶数个 ⇒ 握手定理推论）；
          <strong>切换有向图</strong>后每个顶点改为标注 出度/入度。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="statDegrees" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">📊 统计度数</button>
          <button @mousedown="highlightMax" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm">🎯 高亮最大度</button>
          <button @mousedown="highlightOdd" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm">🔴 高亮奇数度</button>
          <button @mousedown="toggleDir" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">{{ isDir ? '⬅️ 切回无向图' : '🔀 切换有向图（出/入度）' }}</button>
          <button @mousedown="autoDemo" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">▶️ 自动演示</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in undEdges" :key="'l'+e.from+e.to" :config="edgeCfg(e)" />
              <v-arrow v-for="e in dirEdges" :key="'a'+e.from+e.to" :config="arrowCfg(e)" />
              <v-circle v-for="n in gNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in gNodes" :key="'t'+n.id" :config="labelCfg(n)" />
              <v-text v-for="n in gNodes" :key="'s'+n.id" :config="subCfg(n)" />
            </v-layer>
          </v-stage>
        </div>
        <p class="text-xs text-slate-400 mt-1">说明：无向图每个节点下方标注 deg；有向图标注「出/入」。橙色 = 当前/最大度，红色 = 奇度顶点。</p>
      </section>

      <!-- 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>无向图的度：</strong>deg(v) = 相连边数，邻接表中 = adj[v].length，统计 O(V+E)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>有向图：</strong>出度 = 指向别人，入度 = 被指向；∑入 = ∑出 = E</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>握手定理：</strong>∑deg = 2E；推论：奇度顶点个数为偶数</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>应用：</strong>判欧拉图（一笔画）、拓扑排序的入度、二分着色启发、度中心性</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>常见坑：</strong>入度 ≠ adj.length；自环度数 ×2；欧拉判定要查连通性</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>口诀：</strong>无向度 = 邻居数；有向拆入出；∑度 = 2E；奇度必成双</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-1-foundation/dsa-6-1-2-types" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：图分类：有向/无向/加权/二分/DAG</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-2-traversal/dsa-6-2-1-dfs" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：DFS：递归/迭代、连通分量、环检测 →</RouterLink>
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
  { id: "sec-1", name: "无向图的度" },
  { id: "sec-2", name: "入度 / 出度" },
  { id: "sec-3", name: "握手定理" },
  { id: "sec-4", name: "度的应用" },
  { id: "sec-5", name: "代码实战" },
  { id: "sec-6", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

// ===== 🎬 图动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(360), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

interface GNode { id: string; label: string; x: number; y: number; color: string; sub?: string }
interface GEdge { from: string; to: string; directed: boolean; color: string }
const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])

const ids = ['A', 'B', 'C', 'D', 'E']
const POS: Record<string, [number, number]> = { A:[110,90], B:[290,90], C:[200,190], D:[110,290], E:[290,290] }
const EDGE_PAIRS: Array<[string, string]> = [['A','B'],['A','C'],['B','C'],['B','D'],['C','E'],['D','E']]

const isDir = ref(false)

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)   // ⚠️ 清空 reactive 数组必须用 splice(0)，禁止 length = 0
  ids.forEach(id => gNodes.push({ id, label: id, x: POS[id][0], y: POS[id][1], color: C.cyan }))
  rebuildEdges()
}

function rebuildEdges() {
  gEdges.splice(0)
  EDGE_PAIRS.forEach(([u, v]) => gEdges.push({ from: u, to: v, directed: isDir.value, color: '#94a3b8' }))
}

function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function colorOf(id: string, c: string) { const n = pos(id); if (n) n.color = c }
function allCyan() { gNodes.forEach(n => n.color = C.cyan) }
function clearSubs() { gNodes.forEach(n => n.sub = '') }

function degOf(id: string): number {
  return gEdges.filter(e => e.from === id || e.to === id).length
}
function inOutOf(id: string): { inn: number; out: number } {
  let inn = 0, out = 0
  gEdges.forEach(e => {
    if (e.to === id) inn++
    if (e.from === id) out++
  })
  return { inn, out }
}
function totalOf(id: string): number {
  return isDir.value ? inOutOf(id).inn + inOutOf(id).out : degOf(id)
}

async function statDegrees() {
  act('统计度数', 'O(V+E)', async () => {
    allCyan(); clearSubs()
    if (isDir.value) {
      let sumIn = 0, sumOut = 0
      for (const id of ids) {
        colorOf(id, C.orange)
        const { inn, out } = inOutOf(id)
        sumIn += inn; sumOut += out
        pos(id).sub = `出${out}/入${inn}`
        await d(550)
        colorOf(id, C.cyan)
      }
      status.value = `∑入 = ${sumIn} = ∑出 = ${sumOut} = 边数 ${gEdges.length} ✓`
    } else {
      let sum = 0
      for (const id of ids) {
        colorOf(id, C.orange)
        const dg = degOf(id)
        sum += dg
        pos(id).sub = `deg ${dg}`
        await d(550)
        colorOf(id, C.cyan)
      }
      status.value = `∑deg = ${sum} = 2 × ${gEdges.length} ✓（握手定理）`
    }
    await d(1500)
  })
}

async function highlightMax() {
  act('高亮最大度顶点', '统计', async () => {
    allCyan(); clearSubs()
    let max = -1
    const totals = new Map<string, number>()
    for (const id of ids) {
      const t = totalOf(id)
      totals.set(id, t)
      max = Math.max(max, t)
    }
    await d(300)
    const winners = ids.filter(id => totals.get(id) === max)
    for (const id of winners) {
      colorOf(id, C.orange)
      pos(id).sub = `deg ${max}`
    }
    status.value = `最大度 = ${max}：${winners.join('、')}（最「热门」的顶点）`
    await d(1500)
  })
}

async function highlightOdd() {
  act('高亮奇度顶点', '统计', async () => {
    allCyan(); clearSubs()
    const odds: string[] = []
    for (const id of ids) {
      const t = totalOf(id)
      if (t % 2 === 1) {
        odds.push(id)
        colorOf(id, C.red)
        pos(id).sub = `deg ${t}`
      }
    }
    status.value = `奇度顶点：${odds.join('、')}（共 ${odds.length} 个，偶数 ⇒ 握手定理推论成立）`
    await d(1500)
  })
}

async function toggleDir() {
  act(isDir.value ? '切回无向图' : '切换为有向图', '重建边', async () => {
    isDir.value = !isDir.value
    rebuildEdges()
    allCyan(); clearSubs()
    await d(400)
    if (isDir.value) {
      for (const id of ids) {
        const { inn, out } = inOutOf(id)
        pos(id).sub = `出${out}/入${inn}`
        colorOf(id, C.orange)
        await d(450)
        colorOf(id, C.cyan)
      }
      status.value = '有向图：出度 = 箭头向外数，入度 = 箭头向内数；∑入 = ∑出 = 边数'
    } else {
      for (const id of ids) {
        pos(id).sub = `deg ${degOf(id)}`
        colorOf(id, C.orange)
        await d(450)
        colorOf(id, C.cyan)
      }
      status.value = '无向图：度 = 邻居数；每条边给两个端点各贡献 1 度'
    }
    await d(1200)
  })
}

async function autoDemo() {
  act('自动演示', '统计 → 高亮奇度', async () => {
    isDir.value = false
    rebuildEdges()
    allCyan(); clearSubs()
    for (const id of ids) {
      colorOf(id, C.orange)
      pos(id).sub = `deg ${degOf(id)}`
      await d(500)
      colorOf(id, C.cyan)
    }
    await d(500)
    for (const id of ids) if (degOf(id) % 2 === 1) colorOf(id, C.red)
    status.value = '奇度顶点 B、C 标红：共 2 个（偶数）—— 一笔画的起点与终点候选！'
    await d(1700)
    doReset()
  })
}

function doReset() {
  isDir.value = false
  rebuildEdges()
  allCyan()
  clearSubs()
  status.value = ''; opLabel.value = ''
}

async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

const undEdges = computed(() => gEdges.filter(e => !e.directed))
const dirEdges = computed(() => gEdges.filter(e => e.directed))

function edgeCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { points:[a.x, a.y, b.x, b.y], stroke:'#94a3b8', strokeWidth:2 }
}
function arrowCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { points:[a.x, a.y, b.x, b.y], fill:'#94a3b8', stroke:'#94a3b8', strokeWidth:2, pointerLength:12, pointerWidth:9 }
}
function circleCfg(n: GNode) {
  const stroke = n.color === C.cyan ? '#0891b2' : n.color === C.orange ? '#d97706' : n.color === C.red ? '#dc2626' : '#2563eb'
  const sw = n.color === C.cyan ? 1.5 : 3
  return { x:n.x, y:n.y, radius:22, fill:n.color, stroke, strokeWidth: sw, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
}
function labelCfg(n: GNode) {
  return { x:n.x-22, y:n.y-22, width:44, height:44, text:n.label, fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle' }
}
function subCfg(n: GNode) {
  return { x:n.x-36, y:n.y+26, width:72, height:16, text:n.sub ?? '', fontSize:11, fontFamily:'monospace', fill:C.text, align:'center', verticalAlign:'middle' }
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
const degreeCode = `// ===== 邻接表统计度数 =====
// 无向图：deg(v) = adj[v].length（每条边两端各贡献 1 度）
function degrees(adj: Map<number, number[]>): number[] {
    const deg = Array(adj.size).fill(0)
    for (const [u, nbs] of adj) deg[u] = nbs.length
    return deg
}

// 有向图：出度 = adj[v].length；入度 = 被指向的次数
function inOutDegrees(adj: Map<number, number[]>): Array<[number, number]> {
    const res: Array<[number, number]> = Array.from({ length: adj.size }, () => [0, 0])  // [入度, 出度]
    for (const [u, nbs] of adj) {
        res[u][1] = nbs.length            // 出度：u 指向了 nbs 里的每个 v
        for (const v of nbs) res[v][0]++  // 入度：v 被 u 指向了一次
    }
    return res
}

// 复杂度：O(V + E) 一次遍历统计全图
// 校验：有向图 ∑入 === ∑出 === 边数`

const matrixDegreeCode = `// ===== 邻接矩阵：行和 = 出度，列和 = 入度 =====
function rowColDegrees(graph: number[][]): { out: number[]; in_: number[] } {
    const n = graph.length
    const out = Array(n).fill(0)
    const in_ = Array(n).fill(0)
    for (let u = 0; u < n; u++) {
        for (let v = 0; v < n; v++) {
            if (graph[u][v] === 1) {
                out[u]++     // 第 u 行出现 1 → u 指向 v → 出度 +1
                in_[v]++     // 第 v 列被 1 命中 → v 被指向 → 入度 +1
            }
        }
    }
    return { out, in: in_ }
}

// 无向图：矩阵对称 → out === in，且 out[u] 就是 deg(u)
// 复杂度：O(V²)（矩阵本身的规模）`

const eulerCode = `// ===== 用度判断无向图能否一笔画（欧拉路径）=====
// 前提：图必须连通（忽略孤立点）
// 规则：所有顶点度数为偶  → 欧拉回路（从任一点出发能画回原点）
//       恰好 2 个奇度顶点 → 欧拉路径（一个奇度点出发，另一个结束）
//       奇度顶点 > 2      → 不能一笔画
function canDrawInOneStroke(n: number, edges: Array<[number, number]>): string {
    const deg = Array(n).fill(0)
    for (const [u, v] of edges) { deg[u]++; deg[v]++ }
    const odd = deg.filter(x => x % 2 === 1).length
    if (odd === 0) return '欧拉回路：从任意点出发能一笔画回原点'
    if (odd === 2) return '欧拉路径：从一个奇度点出发，到另一个奇度点结束'
    return \`不能一笔画：奇度顶点 \${odd} 个（必须 0 或 2 个）\`
}

// 示例：五角星的 10 个顶点度数全是 4（偶）→ 一笔画出五角星成立
// 注：欧拉定理（6-6-3）要求先验证连通性，本函数只负责度数部分`

const handshakeCode = `// ===== 握手定理验证：∑deg = 2E =====
function verifyHandshake(edges: Array<[number, number]>, adj: Map<number, number[]>): boolean {
    let sum = 0
    for (const [, nbs] of adj) sum += nbs.length   // 每个顶点的度累加
    return sum === 2 * edges.length                // 每条边被数了两次
}
// 推论：奇度顶点个数必为偶数（只有偶数个奇数相加才可能得到偶数 2E）

// ===== 有向版：∑入 = ∑出 = E —— 拓扑排序的起点 =====
function topoByIndegree(n: number, adj: number[][]): number[] {
    const indeg = Array(n).fill(0)
    for (const nbs of adj) for (const v of nbs) indeg[v]++
    const q: number[] = []
    for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i)
    const res: number[] = []
    while (q.length) {
        const u = q.shift()!
        res.push(u)
        for (const v of adj[u]) if (--indeg[v] === 0) q.push(v)
    }
    return res.length === n ? res : []   // 有环 → 返回空数组`
</script>
