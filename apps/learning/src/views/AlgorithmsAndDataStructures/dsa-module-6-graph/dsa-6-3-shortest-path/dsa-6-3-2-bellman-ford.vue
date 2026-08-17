<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔁 Bellman-Ford：负权边与负环检测</h1>
          <p class="text-sm text-slate-500 mt-1">能处理负权边，还能揪出负环</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-3-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：V-1 轮「全边松弛」+ 第 V 轮负环探测
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Bellman-Ford 的武器不是「贪心」，而是<strong>暴力传播</strong>：每一轮把<strong>全部 E 条边</strong>扫一遍做松弛，
          最多重复 <strong>V-1 轮</strong>，dist 一定收敛（若不存在负环）。它不需要「每次确定一个」的假设，
          因此<strong>负权边也能处理</strong>；最后多做一轮，如果<strong>第 V 轮仍能松弛</strong>，就说明存在<strong>负环</strong>——
          那种「越绕越短」的环会让最短路根本不存在。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ov-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="ov-neg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">有向加权图（橙色边 = 负权）：从 A 出发，V-1 = 3 轮后收敛</text>

            <!-- 边 -->
            <line x1="120" y1="70" x2="320" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arrow)" />
            <line x1="120" y1="70" x2="200" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arrow)" />
            <line x1="320" y1="70" x2="200" y2="180" stroke="#f59e0b" stroke-width="3" marker-end="url(#ov-neg)" />
            <line x1="200" y1="180" x2="420" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arrow)" />
            <line x1="320" y1="70" x2="420" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arrow)" />

            <!-- 权重 -->
            <text x="220" y="62" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">4</text>
            <text x="160" y="120" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">5</text>
            <text x="258" y="120" text-anchor="middle" font-size="12" font-family="monospace" fill="#d97706" font-weight="bold">-3</text>
            <text x="310" y="172" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">2</text>
            <text x="375" y="120" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">6</text>

            <!-- 节点 -->
            <circle cx="120" cy="70" r="22" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="120" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="320" cy="70" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="320" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="200" cy="180" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="200" y="180" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <circle cx="420" cy="180" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="420" y="180" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>

            <!-- dist -->
            <text x="120" y="112" text-anchor="middle" font-size="11" font-family="monospace" fill="#f59e0b" font-weight="bold">dist=0</text>
            <text x="320" y="112" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">dist=4</text>
            <text x="200" y="222" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">dist=1</text>
            <text x="420" y="222" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">dist=3</text>

            <text x="360" y="250" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">D 的最短路 A→B→C→D = 4 + (-3) + 2 = 3，绕路反而更短</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Bellman-Ford 演示图。负权边 B→C(-3) 让「绕路」比直连更短——Dijkstra 会在这里出错</figcaption>
        </figure>

        <!-- 操作示意图：松弛 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：松弛一条边 (u → v, w)——dist[v] = min(dist[v], dist[u] + w)</h3>
        <figure class="mb-2">
          <svg viewBox="0 0 720 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="rel-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="rel-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>

            <text x="200" y="28" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">松弛前：dist[v] = 10</text>
            <line x1="130" y1="110" x2="270" y2="110" stroke="#94a3b8" stroke-width="2" marker-end="url(#rel-a)" />
            <text x="200" y="102" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">w = -3</text>
            <circle cx="110" cy="110" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="110" y="110" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">u</text>
            <circle cx="290" cy="110" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="290" y="110" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">v</text>
            <text x="110" y="152" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">dist=1</text>
            <text x="290" y="152" text-anchor="middle" font-size="11" font-family="monospace" fill="#ef4444" font-weight="bold">dist=10</text>

            <text x="360" y="118" text-anchor="middle" font-size="12" font-family="monospace" fill="#f59e0b" font-weight="bold">1 + (-3) = -2 &lt; 10 → 更新</text>

            <text x="570" y="28" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">松弛后：dist[v] = -2</text>
            <line x1="500" y1="110" x2="640" y2="110" stroke="#f59e0b" stroke-width="3" marker-end="url(#rel-b)" />
            <text x="570" y="102" text-anchor="middle" font-size="12" font-family="monospace" fill="#d97706" font-weight="bold">w = -3</text>
            <circle cx="480" cy="110" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="480" y="110" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">u</text>
            <circle cx="660" cy="110" r="22" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
            <text x="660" y="110" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">v</text>
            <text x="480" y="152" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">dist=1</text>
            <text x="660" y="152" text-anchor="middle" font-size="11" font-family="monospace" fill="#16a34a" font-weight="bold">dist=-2</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：负权松弛——dist[u]=1 的节点沿 w=-3 的边把 v 从 10 拉低到 -2。负权越大「性价比」，靠多轮传播逐点压低</figcaption>
        </figure>
      </section>

      <!-- 1. 为什么 Dijkstra 怕负权 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          为什么 Dijkstra 怕负权边？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Dijkstra 每轮「<strong>确定一个 dist 最小的未访问节点</strong>」，并假设它的 dist 从此不再变小。
          这个假设只在<strong>所有边权 ≥ 0</strong> 时成立：任何「绕路」都会加非负的代价，不可能让已确定的节点更短。
          一旦出现<strong>负权边</strong>，就可能出现「绕一大圈反而更近」：一个 dist 更大的节点，顺着负权边走，
          把<strong>已经确定过的节点</strong>反超——而 Dijkstra 不会回头更新，答案就错了。
        </p>
        <div class="mb-4"><Code language="ts" :code="dijkstraFailCode" title="dijkstra_fail.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          把边权想成<strong>费用</strong>，负权 = <strong>「返现/优惠券」</strong>：正常导航不会考虑「先绕远路领 20 元券，再折回来反而更省」——
          但真实世界（优惠、返利、汇率套利）里这种「越绕越便宜」确实存在。<br/>
          Dijkstra 像「只看眼前最近」的贪心司机，Bellman-Ford 则是「把所有绕法都试 V-1 遍」的耐心规划器。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>负权图里继续用 Dijkstra</strong>：结果「看起来有值」但完全错误，而且错得很隐蔽——不是崩溃，是静默算错。<br/>
          ② <strong>把负权边「取反」或加偏移量伪装成正权</strong>：这改变了最短路径本身，得到的是另一道题的答案。
          </p>
        </aside>
      </section>

      <!-- 2. 松弛 V-1 轮的思想 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          Bellman-Ford：把「松弛」暴力重复 V-1 轮
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Bellman-Ford 放弃「一次确定一个」，改为<strong>每一轮遍历全部 E 条边</strong>，对每条边尝试松弛：
          <code>dist[v] = min(dist[v], dist[u] + w)</code>。为什么 <strong>V-1 轮</strong>就够？
        </p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>最短路不可能含环：</strong>如果有正环或零环，删掉环路径不会变差；有负环则最短路不存在（见第 4 节）。所以最短路是<strong>简单路径</strong>。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>简单路径最多 V-1 条边：</strong>一个简单路径经过的节点互不重复，最长也就 V-1 条边。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>归纳传播：</strong>第 k 轮结束时，所有「最多 k 条边」的最短路已经求出——因为第 k 轮会用第 k-1 轮的结果沿第 k 条边再传一次。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>提前终止优化：</strong>如果某一轮<strong>没有任何边被松弛成功</strong>，说明已经收敛，可以直接 break，不用跑满 V-1 轮。</div>
          </li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Bellman-Ford = <strong>「谣言传播」</strong>：第 1 轮，每个人把「我已知的最短距离」沿所有边告诉邻居；第 2 轮，收到新消息的人再告诉下一批……最多 V-1 轮，全网都拿到了可靠信息。<br/>
          也像 <strong>Vue 的依赖更新传播</strong>：一个数据变化沿依赖链逐层派发，第 k 轮正好覆盖「链上第 k 层」的组件。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><br/>
          一轮之内可以<strong>级联传播</strong>：同轮里刚更新过的 dist[u]，立刻可以被后续边继续使用。所以「一轮」是「沿着边数至少前进一格」，而不是「只前进一格」——这正是提前终止优化有效的原因。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>以为必须跑满 V-1 轮才算完</strong>：多数图前几轮就收敛了，白白空转浪费 O(E) 时间——记得加「本轮无更新就 break」。<br/>
          ② <strong>松弛时拷贝了一份「本轮前的 dist」</strong>：这样会阻止级联传播，可能要多花几轮才能收敛（结果仍正确，但浪费）。
          </p>
        </aside>
      </section>

      <!-- 3. 基本实现与手算 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          基本实现与手算
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          代码极短：一个 dist 数组 + 两层循环。外层跑 V-1 轮，内层扫全部边。注意<strong>必须先判 dist[u] 可达</strong>
          （不是 ∞）再参与比较，否则 <code>∞ + w</code> 会污染结果。
        </p>
        <div class="mb-4"><Code language="ts" :code="bellmanFordCode" title="bellman_ford.ts" /></div>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>手算（图 1，源点 A）：</strong></p>
          <div class="overflow-x-auto">
            <table class="w-full text-xs border-collapse">
              <thead>
                <tr class="bg-slate-100 text-left">
                  <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">轮次</th>
                  <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">dist[A]</th>
                  <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">dist[B]</th>
                  <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">dist[C]</th>
                  <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">dist[D]</th>
                  <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">关键松弛</th>
                </tr>
              </thead>
              <tbody class="text-slate-600">
                <tr>
                  <td class="px-3 py-2 border font-mono">初始</td>
                  <td class="px-3 py-2 border font-mono">0</td>
                  <td class="px-3 py-2 border font-mono">∞</td>
                  <td class="px-3 py-2 border font-mono">∞</td>
                  <td class="px-3 py-2 border font-mono">∞</td>
                  <td class="px-3 py-2 border">-</td>
                </tr>
                <tr>
                  <td class="px-3 py-2 border font-mono">第 1 轮</td>
                  <td class="px-3 py-2 border font-mono">0</td>
                  <td class="px-3 py-2 border font-mono">4</td>
                  <td class="px-3 py-2 border font-mono text-amber-700">5 → 1</td>
                  <td class="px-3 py-2 border font-mono text-amber-700">10 → 3</td>
                  <td class="px-3 py-2 border">B→C: 4-3=1；C→D: 1+2=3（级联）</td>
                </tr>
                <tr>
                  <td class="px-3 py-2 border font-mono">第 2 轮</td>
                  <td class="px-3 py-2 border font-mono">0</td>
                  <td class="px-3 py-2 border font-mono">4</td>
                  <td class="px-3 py-2 border font-mono">1</td>
                  <td class="px-3 py-2 border font-mono">3</td>
                  <td class="px-3 py-2 border">无更新 → 提前终止 ✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>漏掉 <code>dist[e.from] !== Infinity</code> 判断</strong>：<code>∞ + w = ∞</code>，在 JS 里 <code>Infinity &lt; Infinity</code> 为 false 看似无害，但一旦用大数替代 ∞，溢出值会「碰巧」通过比较，造成幽灵更新。<br/>
          ② <strong>把边的方向搞反</strong>：有向图只松弛 <code>from → to</code>，无向图要存两条方向相反的边。
          </p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong><br/>
          有负权边 → 用 Bellman-Ford；没有负权 → 用 Dijkstra（O(E log V) 快得多）。<br/>
          Bellman-Ford 的「慢」换来两个能力：<strong>处理负权</strong> 和 <strong>检测负环</strong>——这是 Dijkstra 永远做不到的。</p>
        </aside>
      </section>

      <!-- 4. 负环检测 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          负环检测：第 V 轮仍能松弛 = 有负环
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          如果图里存在<strong>负环</strong>（环上边权之和 &lt; 0），那么每绕一圈，路径总长还能再减一点——<strong>最短路根本不存在</strong>（可以无限小）。
          怎么检测？跑完 V-1 轮后<strong>再做第 V 轮</strong>：如果第 V 轮<strong>仍有一条边能松弛成功</strong>，
          说明还能继续压低，必然存在负环。
        </p>
        <div class="mb-4"><Code language="ts" :code="negativeCycleCode" title="negative_cycle.ts" /></div>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>负环手算（A→B: 1，B→C: -2，C→A: -1）：</strong>环长 1 + (-2) + (-1) = -2 &lt; 0</p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>第 1 轮：dist[B]=1，dist[C]=-1，dist[A]=-2</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>第 2 轮：dist[B]=-1，dist[C]=-3，dist[A]=-4 —— 全部继续变小</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>第 3 轮（V 轮）：还能松弛！→ 报告负环 🚨</span></li>
          </ul>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          负环 = <strong>「无限套利的汇率循环」</strong>：1 美元 → 欧元 → 日元 → 美元，汇率乘积 &gt; 1，每转一圈钱变多。
          现实中汇率市场会立刻修正这种套利机会，但算法世界里它可能存在——Bellman-Ford 就是那个「发现套利漏洞」的审计员。<br/>
          前端里也类似：<strong>依赖图里出现「负环」等价于无限循环更新</strong>（A 变了触发 B，B 变了又触发 A），导致死循环——检测负环就是给依赖图做「环路体检」。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>检测时机错误</strong>：负环检测必须在 <strong>V-1 轮跑完之后</strong>做第 V 轮；在前几轮发现松弛就报负环是误报（前几轮本来就会松弛）。<br/>
          ② <strong>以为负环影响所有节点</strong>：负环只影响<strong>能到达它</strong>的节点的最短路；环之外的节点 dist 依然正确。报告时通常只需说明「存在负环」，不必给出 dist。
          </p>
        </aside>
      </section>

      <!-- 5. 路径重建 + 对比与复杂度 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          路径重建 + 与 Dijkstra/SPFA 对比
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          和 Dijkstra 一样，松弛成功时记录 <code>parent[v] = u</code>，最后从终点回溯即可重建路径。
          <strong>注意：</strong>若检测到负环，parent 链可能绕圈，重建前先确认无负环。
        </p>
        <div class="mb-4"><Code language="ts" :code="bellmanFordPathCode" title="bellman_ford_path.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">算法</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">时间复杂度</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">负权边</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">负环检测</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">适用</th>
              </tr>
            </thead>
            <tbody class="text-slate-600 text-xs">
              <tr>
                <td class="px-4 py-2 border font-semibold text-slate-700">Dijkstra（堆）</td>
                <td class="px-4 py-2 border font-mono">O(E log V)</td>
                <td class="px-4 py-2 border text-red-500">✗</td>
                <td class="px-4 py-2 border text-red-500">✗</td>
                <td class="px-4 py-2 border">非负权，最快</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border font-semibold text-cyan-700">Bellman-Ford</td>
                <td class="px-4 py-2 border font-mono">O(VE)</td>
                <td class="px-4 py-2 border text-emerald-600">✓</td>
                <td class="px-4 py-2 border text-emerald-600">✓</td>
                <td class="px-4 py-2 border">通用、可检测负环</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border font-semibold text-slate-700">SPFA（队列优化）</td>
                <td class="px-4 py-2 border font-mono">平均 O(E)，最坏 O(VE)</td>
                <td class="px-4 py-2 border text-emerald-600">✓</td>
                <td class="px-4 py-2 border text-emerald-600">✓</td>
                <td class="px-4 py-2 border">稀疏图更快，见 6-3-4</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border font-semibold text-slate-700">Floyd-Warshall</td>
                <td class="px-4 py-2 border font-mono">O(V³)</td>
                <td class="px-4 py-2 border text-emerald-600">✓（无负环）</td>
                <td class="px-4 py-2 border">可判断</td>
                <td class="px-4 py-2 border">全源最短路，见 6-3-3</td>
              </tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong><br/>
          <strong>时间复杂度 O(VE)：</strong>V-1 轮 × E 条边 = O(VE)，空间 O(V)（dist + parent）。<br/>
          <strong>选型：</strong>无负权 → Dijkstra；有负权但无负环 → Bellman-Ford / SPFA；需要检测负环 → Bellman-Ford 或 SPFA 判入队次数；全源 → Floyd。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>检测到负环后还想输出最短路径</strong>：负环意味着最短路「不存在」，此时 parent 链会绕圈，重建会死循环——先判负环再重建。<br/>
          ② <strong>稠密图（E ≈ V²）也硬用 Bellman-Ford</strong>：此时是 O(V³)，和 Floyd 一个量级却只求单源——稠密有负权图考虑 SPFA 或按节点数权衡。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：逐轮松弛 + 负环检测
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          有向加权图（橙色边 = 负权）。<strong>节点下方</strong>是 dist（∞ = 未可达）；被松弛的边变<strong>橙色</strong>，
          松弛成功的节点变<strong>绿色</strong>。点「松弛 V-1 轮」逐轮观看 dist 沿链传播；「检测负环」快速跑完 V-1 轮后做第 V 轮探测；
          「切换负环图」换到含负环的 3 节点图再看一次检测效果。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
          <span v-if="distLine" class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">📊 {{ distLine }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @click="doRelaxRounds" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">🌀 松弛 V-1 轮</button>
          <button @click="doDetect" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm">🚨 检测负环</button>
          <button @click="doToggleGraph" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">🔀 切换负环图</button>
          <button @click="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-arrow v-for="e in gEdges" :key="'e'+e.from+'-'+e.to" :config="arrowCfg(e)" />
              <v-text v-for="e in gEdges" :key="'w'+e.from+'-'+e.to" :config="weightCfg(e)" />
              <v-circle v-for="n in gNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in gNodes" :key="'l'+n.id" :config="labelCfg(n)" />
              <v-text v-for="n in gNodes" :key="'d'+n.id" :config="distCfg(n)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 📋 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>核心思想：</strong>把「松弛全部 E 条边」暴力重复 V-1 轮，dist 一定收敛（无负环时）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>为什么 V-1：</strong>最短路是简单路径，最多 V-1 条边；第 k 轮求出「≤k 条边」的最短路</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>负权边：</strong>不依赖贪心假设，负权边也能正确处理（绕路更短也没问题）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>负环检测：</strong>V-1 轮之后再跑第 V 轮，仍能松弛 → 存在负环，最短路不存在</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度：</strong>O(VE) 时间、O(V) 空间；某轮无更新可提前终止</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>选型：</strong>无负权用 Dijkstra；负权/负环检测用 BF 或 SPFA；全源用 Floyd（下一节）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-3-shortest-path/dsa-6-3-1-dijkstra" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Dijkstra：贪心+优先队列O(ElogV)</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-3-shortest-path/dsa-6-3-3-floyd" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Floyd-Warshall：全源最短路径DP →</RouterLink>
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
  { id: "sec-1", name: "为什么 Dijkstra 怕负权" },
  { id: "sec-2", name: "松弛 V-1 轮的思想" },
  { id: "sec-3", name: "基本实现与手算" },
  { id: "sec-4", name: "负环检测" },
  { id: "sec-5", name: "路径重建与对比" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 Bellman-Ford 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(400), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

interface GNode { id: string; label: string; x: number; y: number; color: string; dist?: number | null }
interface GEdge { from: string; to: string; w: number; color: string; directed?: boolean }
const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])
const isCycleGraph = ref(false)
const distLine = computed(() => {
  const parts = gNodes.map(n => n.id + '=' + (n.dist == null ? '∞' : String(n.dist)))
  return parts.join('  ')
})

const MAIN_EDGES = [
  { from:'C', to:'D', w:2 },
  { from:'B', to:'C', w:-3 },
  { from:'A', to:'B', w:4 },
  { from:'S', to:'A', w:5 },
  { from:'S', to:'B', w:10 },
  { from:'B', to:'D', w:5 },
]
const CYCLE_EDGES = [
  { from:'A', to:'B', w:1 },
  { from:'B', to:'C', w:-2 },
  { from:'C', to:'A', w:-1 },
]

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)   // ⚠️ 清空 reactive 数组必须用 splice(0)，禁止 length = 0
  if (isCycleGraph.value) {
    ;[
      { id:'A', label:'A', x:160, y:80 },
      { id:'B', label:'B', x:440, y:80 },
      { id:'C', label:'C', x:300, y:280 },
    ].forEach(n => gNodes.push({ ...n, color: C.cyan, dist: null }))
    CYCLE_EDGES.forEach(e => gEdges.push({ ...e, color:'#94a3b8' }))
  } else {
    ;[
      { id:'S', label:'S', x:110, y:220 },
      { id:'A', label:'A', x:240, y:90 },
      { id:'B', label:'B', x:430, y:90 },
      { id:'C', label:'C', x:430, y:240 },
      { id:'D', label:'D', x:240, y:330 },
    ].forEach(n => gNodes.push({ ...n, color: C.cyan, dist: null }))
    MAIN_EDGES.forEach(e => gEdges.push({ ...e, color:'#94a3b8' }))
  }
  status.value = isCycleGraph.value ? '🌐 负环图：A→B→C→A，环长 -2（负环）' : '🌐 普通负权图：无负环，V-1 = 4 轮可收敛'
}
function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function colorOf(id: string, c: string) { const n = pos(id); if (n) n.color = c }
function srcId(): string { return isCycleGraph.value ? 'A' : 'S' }
function arrowCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { points:[a.x, a.y, b.x, b.y], fill:e.color, stroke:e.color, strokeWidth: e.color==='#94a3b8' ? 2 : 3, pointerLength:10, pointerWidth:8 }
}
function weightCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  const neg = e.w < 0
  return { x:(a.x+b.x)/2, y:(a.y+b.y)/2 - 8, text:String(e.w), fontSize:11, fontFamily:'monospace', fontStyle: neg ? 'bold' : 'normal', fill: neg ? '#d97706' : C.muted, align:'center' }
}
function circleCfg(n: GNode) {
  const stroke = n.color===C.cyan ? '#0891b2' : n.color===C.orange ? '#d97706' : n.color===C.green ? '#16a34a' : n.color===C.red ? '#b91c1c' : '#2563eb'
  const sw = n.color===C.cyan ? 1.5 : 3
  return { x:n.x, y:n.y, radius:22, fill:n.color, stroke, strokeWidth:sw, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
}
function labelCfg(n: GNode) {
  return { x:n.x-22, y:n.y-22, width:44, height:44, text:n.label, fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle' }
}
function distCfg(n: GNode) {
  return { x:n.x-22, y:n.y+22, width:44, height:16, text:n.dist==null ? '∞' : String(n.dist), fontSize:11, fontFamily:'monospace', fill:C.text, align:'center', verticalAlign:'middle' }
}
async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

// 初始化 dist / parent，源点置 0
function initDist(): { dist: Record<string, number>; parent: Record<string, string | null> } {
  const dist: Record<string, number> = {}
  const parent: Record<string, string | null> = {}
  gNodes.forEach(n => { dist[n.id] = Infinity; parent[n.id] = null })
  dist[srcId()] = 0
  pos(srcId()).dist = 0
  return { dist, parent }
}

// 动画：松弛 V-1 轮
async function doRelaxRounds() {
  act('逐轮遍历全部边做松弛', 'V-1 轮', async () => {
    gNodes.forEach(n => n.dist = null)
    const { dist, parent } = initDist()
    colorOf(srcId(), C.orange); await d(500); colorOf(srcId(), C.cyan)
    const V = gNodes.length
    let rounds = 0
    for (let round = 1; round <= V - 1; round++) {
      rounds = round
      let updated = 0
      status.value = `🌀 第 ${round}/${V - 1} 轮：遍历 ${gEdges.length} 条边`
      await d(450)
      for (const e of gEdges) {
        const du = dist[e.from]
        e.color = C.orange
        colorOf(e.from, C.blue); colorOf(e.to, C.blue)
        await d(180)
        const old = dist[e.to]
        if (du !== Infinity && du + e.w < old) {
          dist[e.to] = du + e.w
          parent[e.to] = e.from
          pos(e.to).dist = dist[e.to]
          colorOf(e.to, C.green)
          status.value = `松弛 ${e.from}→${e.to}（w=${e.w}）：${du} + ${e.w} = ${du + e.w} < ${old === Infinity ? '∞' : old} → 更新 dist[${e.to}] = ${du + e.w}`
          updated++
          await d(500)
        } else {
          status.value = `松弛 ${e.from}→${e.to}（w=${e.w}）：不更新`
          await d(180)
        }
        e.color = '#94a3b8'
        colorOf(e.from, C.cyan); colorOf(e.to, C.cyan)
        await d(120)
      }
      if (updated === 0) {
        status.value = `✅ 第 ${round} 轮无更新 → 提前收敛（共 ${round} 轮）`
        await d(600)
        break
      }
      status.value = `第 ${round} 轮结束：${updated} 次更新`
      await d(400)
    }
    status.value = `🏁 松弛完成（${rounds} 轮）→ dist：${distLine.value}`
    await d(400)
  })
}

// 检测负环：快速跑完 V-1 轮，再做第 V 轮
async function doDetect() {
  act('快速跑 V-1 轮，再做第 V 轮探测', '负环检测', async () => {
    gNodes.forEach(n => n.dist = null)
    const { dist, parent } = initDist()
    const V = gNodes.length
    status.value = '⚡ 快速松弛 V-1 轮…'
    await d(400)
    for (let round = 1; round <= V - 1; round++) {
      let updated = 0
      for (const e of gEdges) {
        const du = dist[e.from]
        if (du !== Infinity && du + e.w < dist[e.to]) {
          dist[e.to] = du + e.w
          parent[e.to] = e.from
          pos(e.to).dist = dist[e.to]
          updated++
        }
      }
      if (updated === 0) { status.value = `第 ${round} 轮已收敛`; await d(300); break }
    }
    status.value = `🔍 第 ${V} 轮（检测轮）：还能松弛吗？`
    await d(500)
    let bad: GEdge | null = null
    for (const e of gEdges) {
      const du = dist[e.from]
      if (du !== Infinity && du + e.w < dist[e.to]) { bad = e; break }
    }
    if (bad) {
      // 沿 parent 回溯 V 步找出环
      const seq: string[] = []
      let cur = bad.to
      for (let i = 0; i <= V; i++) { seq.push(cur); cur = parent[cur] ?? cur }
      const m = new Map<string, number>()
      let si = 0
      seq.forEach((id, i) => { if (m.has(id)) si = m.get(id)!; m.set(id, i) })
      const cyc = seq.slice(si)
      bad.color = C.red; colorOf(bad.from, C.red); colorOf(bad.to, C.red)
      status.value = `🚨 第 ${V} 轮仍能松弛 ${bad.from}→${bad.to} → 存在负环！`
      await d(600)
      for (let i = 0; i < cyc.length - 1; i++) {
        const ce = gEdges.find(x => x.from === cyc[i + 1] && x.to === cyc[i])
        if (ce) { ce.color = C.red; colorOf(cyc[i], C.red); await d(350) }
      }
      status.value = `🚨 负环：${cyc.join(' → ')}（每绕一圈路径还能更短）`
    } else {
      gNodes.forEach(n => n.color = C.green)
      status.value = `✅ 第 ${V} 轮无更新 → 图中不存在负环，dist：${distLine.value}`
    }
    await d(500)
  })
}

function doToggleGraph() {
  isCycleGraph.value = !isCycleGraph.value
  initGraph()
}
function doReset() {
  gNodes.forEach(n => { n.color = C.cyan; n.dist = null })
  gEdges.forEach(e => e.color = '#94a3b8')
  status.value = isCycleGraph.value ? '🌐 负环图：A→B→C→A，环长 -2（负环）' : '🌐 普通负权图：无负环，V-1 = 4 轮可收敛'
  opLabel.value = ''
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
const dijkstraFailCode = `// ===== 反例：为什么 Dijkstra 在负权边上会错 =====
// 图（有向）：A→B(4)，A→C(5)，B→C(-3)，C→D(2)，B→D(6)，源点 A
// 用 Dijkstra：
//  1. 确定 A(0)，松弛 → dist[B]=4, dist[C]=5
//  2. 未确定中最小的 B(4) → 「确定」B —— 灾难开始
//  3. 松弛 B 的边：B→C(-3) → dist[C] = 4 + (-3) = 1 ✓（C 还没确定，侥幸）
//  4. 但假如 C 先被确定（若 A→C 权重是 1），之后 B→C 的 -3
//     会把 C 从 1 反超到 -2 —— 而 C 已经被确定，Dijkstra 不会回头！

// 核心问题：Dijkstra 假设「已确定节点的 dist 是最终值」，
// 该假设依赖「所有边权非负」。负权边 = 更大的 dist 也能反超已确定节点。

// 而 Bellman-Ford 没有「确定」操作，任何一轮的松弛都能修正之前的答案，
// 所以负权边它照单全收。`

const bellmanFordCode = `// ===== Bellman-Ford 基本版：V-1 轮全边松弛 =====
interface Edge { from: number; to: number; w: number }

function bellmanFord(n: number, edges: Edge[], s: number): number[] {
    const dist = new Array<number>(n).fill(Infinity)
    dist[s] = 0

    for (let round = 1; round <= n - 1; round++) {   // 最多 V-1 轮
        let updated = false
        for (const e of edges) {                     // 每轮遍历全部 E 条边
            if (dist[e.from] !== Infinity &&          // 起点必须可达
                dist[e.from] + e.w < dist[e.to]) {
                dist[e.to] = dist[e.from] + e.w       // 松弛成功
                updated = true
            }
        }
        if (!updated) break                           // 优化：无更新提前终止
    }
    return dist
}

// 为什么 V-1 轮就够？最短路是简单路径（无环），最多 V-1 条边；
// 第 k 轮结束时，所有「边数 ≤ k」的最短路已被求出（归纳法）。

// 手算（正文图 1，源点 A）：
// 第 1 轮：B=4，C=5→(4-3)=1，D=(1+2)=3（B→C 再 C→D 级联）
// 第 2 轮：无更新 → 提前终止
// 结果 dist = [0, 4, 1, 3]，D 的最短路 A→B→C→D = 3（比直连更短）`

const negativeCycleCode = `// ===== 负环检测：V-1 轮之后做第 V 轮 =====
function hasNegativeCycle(n: number, edges: Edge[], dist: number[]): boolean {
    // 先正常跑完 V-1 轮（dist 由外层传入或此处继续跑）
    // 再做第 V 轮：若还能松弛，说明存在负环
    for (const e of edges) {
        if (dist[e.from] !== Infinity && dist[e.from] + e.w < dist[e.to]) {
            return true                               // 🚨 第 V 轮仍能松弛
        }
    }
    return false
}

// 完整流程：
// const dist = bellmanFord(n, edges, s)
// const bad = hasNegativeCycle(n, edges, dist)   // 负环检测
//
// 直觉：无负环时 V-1 轮已收敛，第 V 轮必然「无事可做」；
// 若第 V 轮还能松弛，说明存在一个环，每绕一圈总长还能减少——
// 最短路「不存在」，只能报告负环。

// 例：A→B(1)，B→C(-2)，C→A(-1)，环长 -2
// 每轮 dist 都在变小，永远收敛不了 → hasNegativeCycle = true`

const bellmanFordPathCode = `// ===== BF + parent：路径重建 =====
function bellmanFordPath(n: number, edges: Edge[], s: number): { dist: number[]; parent: number[] } {
    const dist = new Array<number>(n).fill(Infinity)
    const parent = new Array<number>(n).fill(-1)      // -1 = 无前驱
    dist[s] = 0
    for (let round = 1; round <= n - 1; round++) {
        let updated = false
        for (const e of edges) {
            if (dist[e.from] !== Infinity && dist[e.from] + e.w < dist[e.to]) {
                dist[e.to] = dist[e.from] + e.w
                parent[e.to] = e.from                 // ★ 记录前驱
                updated = true
            }
        }
        if (!updated) break
    }
    return { dist, parent }
}

function reconstruct(parent: number[], t: number): number[] {
    const path: number[] = []
    for (let v = t; v !== -1; v = parent[v]) path.push(v)
    return path.reverse()                             // [s, ..., t]
}

// 使用：图 1 中到 D 的最短路
// const { dist, parent } = bellmanFordPath(4, edges, 0)   // A=0, B=1, C=2, D=3
// reconstruct(parent, 3) → [A, B, C, D]，路径长 4 + (-3) + 2 = 3
//
// ⚠️ 重建前务必先做负环检测：存在负环时 parent 链会绕圈，重建会死循环。`
</script>

<style scoped></style>
