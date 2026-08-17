<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🧮 Floyd-Warshall：全源最短路径 DP</h1>
          <p class="text-sm text-slate-500 mt-1">三重循环，一次算清「所有点对」的最短距离</p>
        </div>
        <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-3-3</span>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">📐</span>
          结构总览：DP 矩阵 + 三重循环
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          左图是一个 <strong>4 节点加权有向图</strong>。Floyd 用一张 <strong>dist 矩阵</strong>存「所有点对」的当前最短距离，
          然后让 <strong>k</strong> 依次充当「允许的中转点」：第 k 轮后，<code>dist[i][j]</code> 表示只允许经过前 k 个点时的最短路。
          负环检测：全部跑完后，如果某个 <code>dist[i][i] &lt; 0</code>，说明存在负环。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ov-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="ov-arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="170" y="26" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">加权有向图 G（4 节点）</text>
            <!-- 节点 -->
            <circle cx="120" cy="70" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="120" y="70" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="310" cy="70" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="310" y="70" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="310" cy="210" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="310" y="210" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <circle cx="120" cy="210" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="120" y="210" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
            <!-- 边 -->
            <line x1="142" y1="70" x2="286" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <text x="213" y="56" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">3</text>
            <line x1="310" y1="92" x2="310" y2="186" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <text x="324" y="140" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">2</text>
            <line x1="288" y1="210" x2="142" y2="210" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <text x="213" y="224" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">1</text>
            <line x1="120" y1="92" x2="120" y2="186" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <text x="106" y="140" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">10</text>
            <line x1="142" y1="84" x2="286" y2="196" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <text x="188" y="118" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">8</text>
            <line x1="286" y1="84" x2="142" y2="196" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <text x="240" y="162" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">9</text>
            <!-- 右侧：DP 转移 -->
            <text x="525" y="30" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">Floyd 的 DP 转移</text>
            <text x="525" y="56" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#0891b2">d[i][j] = min(d[i][j], d[i][k] + d[k][j])</text>
            <circle cx="440" cy="118" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="440" y="118" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#64748b">i</text>
            <circle cx="540" cy="118" r="22" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="540" y="118" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">k</text>
            <circle cx="640" cy="118" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="640" y="118" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#64748b">j</text>
            <line x1="462" y1="118" x2="516" y2="118" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr2)" />
            <line x1="562" y1="118" x2="616" y2="118" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr2)" />
            <text x="540" y="160" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">k = 当前允许的中转点（橙色）</text>
            <text x="525" y="196" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">第 k 轮后：只允许经过前 k 个点</text>
            <text x="525" y="216" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">负环：跑完后对角线 dist[i][i] &lt; 0</text>
            <text x="525" y="240" text-anchor="middle" font-size="11" font-family="monospace" fill="#0891b2">三重循环 O(V³) · 空间 O(V²)</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Floyd 的 DP 思想——k 依次当「中转点」，dist 矩阵逐轮收缩</figcaption>
        </figure>

        <!-- 操作示意图：k=B 前后 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：k = B 时，A→C 的 8 被「经过 B」的 3+2=5 击败</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">k=B 之前（dist[A][C] = 8，直达）</p>
            <svg viewBox="0 0 320 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="fw-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <circle cx="60" cy="100" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="60" y="100" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <circle cx="160" cy="45" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="160" y="45" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <circle cx="280" cy="100" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="280" y="100" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
              <line x1="80" y1="96" x2="136" y2="57" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#fw-b)" />
              <text x="104" y="62" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">3</text>
              <line x1="180" y1="55" x2="256" y2="92" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#fw-b)" />
              <text x="222" y="62" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">2</text>
              <line x1="80" y1="104" x2="256" y2="104" stroke="#ef4444" stroke-width="2.5" marker-end="url(#fw-b)" />
              <text x="168" y="92" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#ef4444">8</text>
              <text x="160" y="168" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">k=B 之前：dist[A][C] = 8（直达）</text>
              <text x="160" y="190" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">另一条路 A→B→C = 3+2 = 5 更短，但还没算</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">k=B 之后（dist[A][C] = 3+2 = 5）</p>
            <svg viewBox="0 0 320 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="fw-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
                </marker>
              </defs>
              <circle cx="60" cy="100" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="60" y="100" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <circle cx="160" cy="45" r="20" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="160" y="45" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <circle cx="280" cy="100" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="280" y="100" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
              <line x1="80" y1="96" x2="136" y2="57" stroke="#4ade80" stroke-width="2.5" marker-end="url(#fw-a)" />
              <text x="104" y="62" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">3</text>
              <line x1="180" y1="55" x2="256" y2="92" stroke="#4ade80" stroke-width="2.5" marker-end="url(#fw-a)" />
              <text x="222" y="62" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">2</text>
              <line x1="80" y1="104" x2="256" y2="104" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#fw-a)" />
              <text x="168" y="92" text-anchor="middle" font-size="12" font-family="monospace" fill="#ef4444">8 ✗</text>
              <text x="160" y="168" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">k=B 之后：dist[A][C] = 5 ✓</text>
              <text x="160" y="190" text-anchor="middle" font-size="11" font-family="monospace" fill="#16a34a">经过中间点 B：3+2=5 &lt; 8，更新矩阵</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">这就是 Floyd 的核心动作：用「中转」打败「直达」，逐轮刷矩阵</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 全源最短路问题 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">1</span>
          全源最短路问题（All-Pairs Shortest Path）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          前几节学的 <strong>Dijkstra / Bellman-Ford / SPFA 都是单源算法</strong>：给定一个起点 s，求 s 到所有点的最短距离。
          而 <strong>全源最短路</strong> 要求输出一张 <strong>V × V 的 dist 矩阵</strong>，里面是<strong>任意点对 (i, j)</strong> 的最短距离。
        </p>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>朴素思路：把单源算法跑 V 遍。</strong>
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>跑 V 遍 Dijkstra（二叉堆）：<code class="font-mono">O(V × (E + V) log V)</code>，稠密图（E≈V²）下是 <code class="font-mono">O(V³ log V)</code></li>
          <li>跑 V 遍 Bellman-Ford：<code class="font-mono">O(V × VE) = O(V²E)</code>，稠密图下 <code class="font-mono">O(V⁴)</code>，太慢</li>
          <li>而且 Dijkstra 遇到<strong>负权边直接失效</strong>——即使跑 V 遍也没用</li>
          <li>Floyd-Warshall 用动态规划一次搞定：<code class="font-mono">O(V³)</code> 时间 + <code class="font-mono">O(V²)</code> 空间，还支持负权边</li>
        </ol>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">算法</th><th class="px-4 py-2 border border-slate-200 font-semibold">求解范围</th><th class="px-4 py-2 border border-slate-200 font-semibold">时间（稠密图）</th><th class="px-4 py-2 border border-slate-200 font-semibold">负权</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">Dijkstra × V</td><td class="px-4 py-2 border">全源</td><td class="px-4 py-2 border font-mono">O(V³ log V)</td><td class="px-4 py-2 border text-red-600">✗</td></tr>
              <tr><td class="px-4 py-2 border">Bellman-Ford × V</td><td class="px-4 py-2 border">全源</td><td class="px-4 py-2 border font-mono">O(V⁴)</td><td class="px-4 py-2 border text-emerald-600">✓（无负环）</td></tr>
              <tr><td class="px-4 py-2 border">Floyd-Warshall</td><td class="px-4 py-2 border">全源</td><td class="px-4 py-2 border font-mono text-emerald-600">O(V³)</td><td class="px-4 py-2 border text-emerald-600">✓（无负环）</td></tr>
              <tr><td class="px-4 py-2 border">SPFA × V</td><td class="px-4 py-2 border">全源</td><td class="px-4 py-2 border font-mono">期望 O(kV²)</td><td class="px-4 py-2 border text-emerald-600">✓</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Floyd 就像一次性地<strong>预计算任意两座城市之间的最短里程表</strong>——查表 O(1)，不用每次现算。
          前端里可以这样想：把 npm 包依赖图当成有向图，<strong>预计算任意两个组件之间的「最短依赖距离」</strong>，
          判断「A 是否间接依赖 B」或「改动 C 会影响哪些组件」时直接查表，O(1) 出结果。
          代价就是建表要 O(V³)——但「一次建表、无数次查询」在依赖分析、构建拓扑里非常划算。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① 误以为「跑 V 遍 Dijkstra 就够了」——图里只要有<strong>一条负权边</strong>，Dijkstra 就跑不出正确结果<br/>
          ② 误以为 Floyd 只能处理正权图——其实只要<strong>没有负环</strong>，负权边完全没问题<br/>
          ③ 忘记 Floyd 的适用边界：V 很大（比如 V &gt; 500）时 O(V³) 会直接爆炸，优先考虑「按需单源」方案
          </p>
        </aside>
      </section>

      <!-- 2. DP 状态与转移 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">2</span>
          DP 状态与转移：经过「前 k 个中间点」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Floyd 是<strong>区间式动态规划</strong>。关键是把「中间点集合」从大到小逐步放开，每放开一个点就做一次全局松弛。
          定义状态：<strong>d(k)[i][j] = 只允许使用编号 1..k 的节点作为中间点时，i 到 j 的最短距离</strong>。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200">
          <p class="text-sm font-mono text-slate-700 leading-relaxed">
            边界：d(0)[i][j] = graph[i][j]（一条边都不中转，直接用边权）<br/>
            转移：d(k)[i][j] = min( d(k-1)[i][j] , d(k-1)[i][k] + d(k-1)[k][j] )
          </p>
        </div>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>推导步骤（为什么这样转移）：</strong>
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>考虑 i → j 的最短路，<strong>要么不经过 k</strong>：那它本来就在 d(k-1)[i][j] 里</li>
          <li>要么<strong>经过 k</strong>：那就拆成两段 i → k 和 k → j，两段都只经过前 k-1 个点，即 d(k-1)[i][k] + d(k-1)[k][j]</li>
          <li>两种情况取 min，就是 d(k)[i][j]</li>
          <li>k 从 0 滚到 V-1，最终 d(V)[i][j] = 允许经过所有点的最短路 = 真正答案</li>
        </ol>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          想象你规划地铁换乘：一开始只允许坐 0 条线（只能直达），然后放开「只允许用 1 号线」，
          再放开「允许 1、2 号线」……每多放开一条线，就重新检查「所有站点对」是否能靠这条新线更近。
          Floyd 就是这个「逐条放开线路」的过程——k 就是「当前放开到第几条线路」，
          dist 矩阵就是实时更新的「任意两站最短换乘表」。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>k 必须在最外层循环！</strong>i、j 谁内谁外无所谓，但 k 不在最外层 = 直接算错。<br/>
          ② 把 <code>dist[i][k] + dist[k][j]</code> 写成 <code>dist[i][j] + dist[k][k]</code> 之类的变体，混淆下标<br/>
          ③ 初始矩阵忘记把 <code>dist[i][i]</code> 设为 0（自己到自己一定是 0，不是无穷大）
          </p>
        </aside>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：为什么可以「原地更新」不新开三维数组？</strong><br/>
          第 k 轮的转移只依赖 <code>d[i][k]</code> 和 <code>d[k][j]</code>。而 i→k 的最短路「不需要经过 k 自己」
          （经过 k 自己只会更差，路径不会重复同一个点），所以这两个值在第 k 轮中<strong>不会被本轮改写</strong>。
          于是放心地在同一个二维矩阵上原地更新，省下 O(V³) 的空间。
          </p>
        </aside>
      </section>

      <!-- 3. 三重循环实现 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">3</span>
          三重循环实现：全代码只有十几行
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          Floyd 的实现极短——<strong>三重 for + 一个 if</strong>。核心就一句：<code>if (dist[i][k] + dist[k][j] &lt; dist[i][j]) dist[i][j] = ...</code>。
        </p>
        <div class="mb-4"><Code language="ts" :code="floydCode" title="floyd_warshall.ts" /></div>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>复杂度分析：</strong>
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">指标</th><th class="px-4 py-2 border border-slate-200 font-semibold">值</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">时间</td><td class="px-4 py-2 border font-mono text-emerald-600">O(V³)</td><td class="px-4 py-2 border">k、i、j 各一层，无论图多稀疏都是 V³</td></tr>
              <tr><td class="px-4 py-2 border">空间</td><td class="px-4 py-2 border font-mono text-emerald-600">O(V²)</td><td class="px-4 py-2 border">一张 dist 矩阵（原地更新，不存三维）</td></tr>
              <tr><td class="px-4 py-2 border">数据结构要求</td><td class="px-4 py-2 border font-mono">邻接矩阵</td><td class="px-4 py-2 border">需要 O(1) 随机访问 dist[i][k]，邻接表不合适</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>INF 设太小</strong>：比如 10⁶，而真实最短路可能超过它，导致「绕路」被误判为「更短」。建议用 <code>Infinity</code> 或 10¹⁵ 级大数<br/>
          ② 直接修改传入的 graph 矩阵——调用方可能还要用原始图，先 <code>map(row =&gt; [...row])</code> 拷贝一份<br/>
          ③ 输入有「重边」时直接覆盖——应保留 <code>min</code>（多条边取最短的一条）
          </p>
        </aside>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          前端构建工具里经常要算「包 A 是否传递依赖包 B」：依赖图可能有几千个包，对每个包做一次 DFS 太慢。
          用 Floyd 的思维<strong>预计算一张「可达性/最短距离表」</strong>，之后任意查询都是查表 O(1)。
          Vite/Rollup 的依赖预构建、monorepo 的 affected 分析，本质都是「全源关系预计算」。
          </p>
        </aside>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong><br/>
          记忆口诀：「<strong>k 在最外，i j 任意排，min 里套中转</strong>」。
          写完后用 3~4 个点的图手推一遍（本页动画就是这个图），比背任何模板都管用。
          </p>
        </aside>
      </section>

      <!-- 4. 路径重建 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">4</span>
          路径重建：next 矩阵
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          dist 矩阵只回答「<strong>多长</strong>」，不回答「<strong>怎么走</strong>」。要输出具体路径，加一张 <strong>next 矩阵</strong>：
          <code>next[i][j]</code> 记录 i → j 最短路径上的<strong>第一站</strong>。每次 dist 被更新时同步更新 next。
        </p>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>重建步骤：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>初始化：有直达边（或 i==j）时 <code>next[i][j] = j</code>，否则 <code>-1</code></li>
          <li>三重循环里：一旦 <code>via &lt; dist[i][j]</code>，同步执行 <code>next[i][j] = next[i][k]</code>（先走到 k 那条路的第一站）</li>
          <li>查询时从 i 出发，反复 <code>i = next[i][j]</code> 直到 j，收集沿途节点就是最短路径</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="pathCode" title="floyd_with_path.ts" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① dist 更新了但 <strong>忘了同步 next</strong>——路径和距离对不上<br/>
          ② 写成 <code>next[i][j] = k</code>——应该是 <code>next[i][k]</code>！因为 i→k 本身也可能有中转<br/>
          ③ 重建循环没写终止条件，遇到 -1 死循环——先判断 <code>next[i][j] === -1</code> 返回不可达
          </p>
        </aside>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><br/>
          存「下一跳」而不是存整条路径，内存从 O(V³) 降到 O(V²)，而且支持「改个起点也能复用 next 表」。
          这也是很多「记录最优决策」的 DP 题的通用技巧（如背包问题记录 chosen 数组）。
          </p>
        </aside>
      </section>

      <!-- 5. 负环检测 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">5</span>
          负环检测：对角线出现负值
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          如果图里存在<strong>负环</strong>（总权重为负的环），任意最短路径都可以绕环无限变短，「最短路」本身失去意义。
          Floyd 的一个额外红利：<strong>跑完三重循环后检查对角线</strong>——若 <code>dist[i][i] &lt; 0</code>，说明存在负环。
        </p>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>原理步骤：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><code>dist[i][i]</code> 初始为 0（i 到 i 不绕圈）</li>
          <li>若存在负环，i 绕环一圈回到自己，代价 = 负环总权重 &lt; 0</li>
          <li>Floyd 会把这个「绕圈」当作一条更短路径写入 <code>dist[i][i]</code></li>
          <li>所以最后扫一遍对角线，出现负数即负环</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="negCycleCode" title="floyd_neg_cycle.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          负环就像<strong>有漏洞的优惠券系统</strong>：买 A 返券、用券买 B 又返券、再买回 A 还倒赚——「成本」每次绕一圈反而更低，可以无限刷。
          前端工程里类似的「坏味道」是<strong>循环依赖</strong>：A 依赖 B、B 依赖 A，打包器检测到就该报警。
          Floyd 的「对角线为负」就是给这种「越绕越划算」的异常结构发警报。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① 检测到负环后仍把 dist 当「最短距离」用——<strong>负环下最短路无定义</strong>，只能报告「存在负环」<br/>
          ② 用 Floyd 专门做负环检测——它要 O(V³)，而 SPFA 检测负环期望 O(kE)，快得多；Floyd 适合「顺手检测」<br/>
          ③ 忘了负环会传染：负环经过的每个点，其对角线都可能变负，别只查某一个点
          </p>
        </aside>
      </section>

      <!-- 6. 复杂度与适用场景 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">6</span>
          复杂度与适用场景
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          Floyd 是「<strong>暴力中的优雅</strong>」：代码最短、思路最直白，但 O(V³) 注定它只适合<strong>小图（V ≤ 500 左右）</strong>。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">场景</th><th class="px-4 py-2 border border-slate-200 font-semibold">推荐算法</th><th class="px-4 py-2 border border-slate-200 font-semibold">原因</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">V ≤ 500，稠密图，要全源</td><td class="px-4 py-2 border font-mono text-emerald-600">Floyd</td><td class="px-4 py-2 border">O(V³) 可接受，代码简单不易错</td></tr>
              <tr><td class="px-4 py-2 border">V 很大（万级），只查少量点对</td><td class="px-4 py-2 border font-mono">Dijkstra × k</td><td class="px-4 py-2 border">按需计算，不建全表</td></tr>
              <tr><td class="px-4 py-2 border">有负权边但无负环</td><td class="px-4 py-2 border font-mono">Floyd / SPFA</td><td class="px-4 py-2 border">Dijkstra 失效；Floyd 小图、SPFA 大图</td></tr>
              <tr><td class="px-4 py-2 border">只要单源</td><td class="px-4 py-2 border font-mono">Dijkstra / SPFA</td><td class="px-4 py-2 border">全源是大材小用，白花 O(V³)</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong><br/>
          ① 面试/比赛里见到「<strong>求所有点对最短路</strong>」且 V ≤ 500 → 直接上 Floyd，几分钟写完<br/>
          ② Floyd 是「<strong>先确认负环、再给答案</strong>」：跑完先扫对角线，别急着用结果<br/>
          ③ 需要具体路径时别改口供——连 next 矩阵一起维护，别只算长度
          </p>
        </aside>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><br/>
          Floyd 还能顺便解决「传递闭包」问题：把加法换成「或」、把 min 换成「或」，<code>reach[i][j] |= reach[i][k] &amp;&amp; reach[k][j]</code>，
          就能 O(V³) 求出任意两点是否可达——很多连通性问题都能用它秒杀。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">🎬</span>
          动画演示：dist 矩阵逐 k 更新 + 负环检测
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          下方画布是 4 节点加权有向图。<strong>「Floyd 迭代」</strong>让 k 依次扮演中间点（节点变橙），每次 dist 被改进时
          相关的 i、j 节点与经过的边会高亮，画布下方的 dist 矩阵同步刷新（绿 = 本轮更新、黄 = 当前 k 的行/列）。
          <strong>「检测负环」</strong>切换到含负环的三角图（A→B: 1, B→C: -1, C→A: -2），演示对角线如何变负。
        </p>

        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
          <span v-if="kIdx >= 0" class="bg-orange-50 text-orange-700 px-2 py-1 rounded-full">🔑 中间点 k = {{ nameOf(kIdx) }}</span>
        </div>

        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @click="runFloyd" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">▶ Floyd 迭代</button>
          <button @click="runNegCycle" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300">⚠ 检测负环</button>
          <button @click="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100">↺ 重置</button>
        </div>

        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-arrow v-for="e in gEdges" :key="e.from + e.to" :config="edgeCfg(e)" />
              <v-text v-for="e in gEdges" :key="'w' + e.from + e.to" :config="weightCfg(e)" />
              <v-circle v-for="n in gNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in gNodes" :key="'l' + n.id" :config="labelCfg(n)" />
            </v-layer>
          </v-stage>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 p-3 mt-3 overflow-x-auto" v-if="dist.length">
          <p class="text-xs font-semibold text-slate-500 mb-2 font-mono">dist 矩阵（∞ = 不可达 · 绿 = 本轮更新 · 黄 = 当前 k 行/列）</p>
          <table class="text-xs font-mono border-collapse">
            <thead>
              <tr>
                <th class="px-2 py-1 border border-slate-200 bg-slate-50 text-slate-400"></th>
                <th v-for="j in dist.length" :key="'h' + j" class="px-2 py-1 border border-slate-200 bg-slate-50 text-slate-500">{{ nameOf(j - 1) }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in dist.length" :key="'r' + i">
                <th class="px-2 py-1 border border-slate-200 bg-slate-50 text-slate-500">{{ nameOf(i - 1) }}</th>
                <td v-for="j in dist.length" :key="i + '-' + j" :class="cellClass(i - 1, j - 1)" class="px-2 py-1 border border-slate-200 text-center">{{ fmt(dist[i - 1][j - 1]) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 📋 小结 -->
      <section id="sec-summary" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>全源最短路</strong>：Floyd 一次算出所有点对最短距离，输出 V×V 的 dist 矩阵</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>DP 状态</strong>：d(k)[i][j] = 只允许经过前 k 个点时的最短路；转移 = 「经过 k」或「不经过 k」取 min</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三重循环</strong>：<code>k</code> 必须在最外层；原地更新合法（d[i][k]、d[k][j] 本轮不变）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>路径重建</strong>：加 next 矩阵，dist 更新时同步 <code>next[i][j] = next[i][k]</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>负环检测</strong>：跑完扫对角线，<code>dist[i][i] &lt; 0</code> 即负环；负环下最短路无意义</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度</strong>：时间 O(V³)、空间 O(V²)，适合 V ≤ 500 的稠密图；单源问题别用 Floyd</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>支持负权边</strong>（只要无负环），这是 Dijkstra 做不到的</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-3-shortest-path/dsa-6-3-2-bellman-ford" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Bellman-Ford：负权边与负环检测</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-3-shortest-path/dsa-6-3-4-spfa" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：SPFA：队列优化的Bellman-Ford →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// ================= 动画状态 =================
const C = { cyan: '#06b6d4', green: '#4ade80', red: '#ef4444', orange: '#f59e0b', blue: '#60a5fa', violet: '#a78bfa', muted: '#64748b', ghost: '#e2e8f0', text: '#1e293b' }
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

interface GNode { id: string; label: string; x: number; y: number; color: string }
interface GEdge { from: string; to: string; w: number; color: string }
const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])
const names = ['A', 'B', 'C', 'D']
const INF = 999
const dist = reactive<number[][]>([])
const kIdx = ref(-1)
const cellFlash = reactive<Record<string, string>>({})

function initGraph() {
  gNodes.splice(0); gEdges.splice(0); dist.splice(0)
  kIdx.value = -1; busy.value = false; status.value = ''; opLabel.value = ''
  ;[{ id: 'A', label: 'A', x: 130, y: 110, color: C.cyan }, { id: 'B', label: 'B', x: 400, y: 110, color: C.cyan }, { id: 'C', label: 'C', x: 400, y: 270, color: C.cyan }, { id: 'D', label: 'D', x: 130, y: 270, color: C.cyan }].forEach(n => gNodes.push({ ...n }))
  ;[{ from: 'A', to: 'B', w: 3, color: '#94a3b8' }, { from: 'A', to: 'D', w: 10, color: '#94a3b8' }, { from: 'A', to: 'C', w: 8, color: '#94a3b8' }, { from: 'B', to: 'C', w: 2, color: '#94a3b8' }, { from: 'B', to: 'D', w: 9, color: '#94a3b8' }, { from: 'C', to: 'D', w: 1, color: '#94a3b8' }].forEach(e => gEdges.push({ ...e }))
  for (let i = 0; i < 4; i++) { const row: number[] = []; for (let j = 0; j < 4; j++) row.push(i === j ? 0 : INF); dist.push(row) }
  dist[0][1] = 3; dist[0][3] = 10; dist[0][2] = 8; dist[1][2] = 2; dist[1][3] = 9; dist[2][3] = 1
}

function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function colorOf(id: string, c: string) { const n = pos(id); if (n) n.color = c }
function edgeColor(from: string, to: string, c: string) { const e = gEdges.find(x => x.from === from && x.to === to); if (e) e.color = c }
function allGray() { gEdges.forEach(e => e.color = '#94a3b8') }

function nameOf(i: number): string { return names[i] ?? String.fromCharCode(65 + i) }
function fmt(v: number): string { return v >= INF ? '∞' : String(v) }
function cellClass(i: number, j: number): string {
  const parts: string[] = []
  if (i === kIdx.value || j === kIdx.value) parts.push('bg-amber-50')
  const f = cellFlash[i + '-' + j]
  if (f === 'green') parts.push('bg-emerald-100 text-emerald-700 font-bold')
  if (f === 'red') parts.push('bg-red-100 text-red-700 font-bold')
  return parts.join(' ')
}

function edgeCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { points: [a.x, a.y, b.x, b.y], fill: e.color, stroke: e.color, strokeWidth: e.color === '#94a3b8' ? 2 : 3, pointerLength: 10, pointerWidth: 8 }
}
function weightCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  const dx = (e.from === 'A' && e.to === 'C') ? -18 : (e.from === 'B' && e.to === 'D') ? 18 : 0
  const dy = (e.from === 'A' && e.to === 'C') ? 6 : (e.from === 'B' && e.to === 'D') ? 6 : -10
  return { x: (a.x + b.x) / 2 + dx, y: (a.y + b.y) / 2 + dy, text: String(e.w), fontSize: 11, fontFamily: 'monospace', fill: C.muted, align: 'center' }
}
function circleCfg(n: GNode) {
  const stroke = n.color === C.cyan ? '#0891b2' : n.color === C.orange ? '#d97706' : n.color === C.green ? '#16a34a' : n.color === C.red ? '#b91c1c' : '#2563eb'
  const sw = n.color === C.cyan ? 1.5 : 3
  return { x: n.x, y: n.y, radius: 22, fill: n.color, stroke, strokeWidth: sw, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function labelCfg(n: GNode) {
  return { x: n.x - 22, y: n.y - 22, width: 44, height: 44, text: n.label, fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: '#fff', align: 'center', verticalAlign: 'middle' }
}

async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch (_) { /* ignore */ }
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

async function runFloyd() {
  await act('Floyd 迭代中…', 'Floyd O(V³)', async () => {
    for (let k = 0; k < 4; k++) {
      kIdx.value = k
      colorOf(nameOf(k), C.orange)
      status.value = '第 ' + (k + 1) + ' 轮：允许经过中间点 ' + nameOf(k)
      await d(800)
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const via = dist[i][k] + dist[k][j]
          if (via < dist[i][j]) {
            const old = dist[i][j]
            dist[i][j] = via
            cellFlash[i + '-' + j] = 'green'
            colorOf(nameOf(i), C.violet)
            colorOf(nameOf(j), C.green)
            edgeColor(nameOf(i), nameOf(k), C.green)
            edgeColor(nameOf(k), nameOf(j), C.green)
            status.value = 'dist[' + nameOf(i) + '][' + nameOf(j) + ']: ' + old + ' → ' + via
            await d(650)
            cellFlash[i + '-' + j] = ''
            colorOf(nameOf(i), C.cyan)
            colorOf(nameOf(j), C.cyan)
            allGray()
            await d(150)
          }
        }
      }
      colorOf(nameOf(k), C.cyan)
      kIdx.value = -1
      await d(300)
    }
    status.value = '完成！dist 矩阵已收敛（∞ 表示不可达）'
    await d(1200)
  })
}

async function runNegCycle() {
  await act('负环检测中…', '检测负环', async () => {
    gNodes.splice(0); gEdges.splice(0); dist.splice(0)
    kIdx.value = -1
    ;[{ id: 'A', label: 'A', x: 180, y: 110, color: C.cyan }, { id: 'B', label: 'B', x: 430, y: 110, color: C.cyan }, { id: 'C', label: 'C', x: 305, y: 285, color: C.cyan }].forEach(n => gNodes.push({ ...n }))
    ;[{ from: 'A', to: 'B', w: 1, color: '#94a3b8' }, { from: 'B', to: 'C', w: -1, color: '#94a3b8' }, { from: 'C', to: 'A', w: -2, color: '#94a3b8' }].forEach(e => gEdges.push({ ...e }))
    for (let i = 0; i < 3; i++) { const row: number[] = []; for (let j = 0; j < 3; j++) row.push(i === j ? 0 : INF); dist.push(row) }
    dist[0][1] = 1; dist[1][2] = -1; dist[2][0] = -2
    status.value = '负环三角图：A→B(1), B→C(-1), C→A(-2)'
    await d(900)
    for (let k = 0; k < 3; k++) {
      kIdx.value = k
      colorOf(nameOf(k), C.orange)
      status.value = '第 ' + (k + 1) + ' 轮：中间点 ' + nameOf(k)
      await d(650)
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const via = dist[i][k] + dist[k][j]
          if (via < dist[i][j]) {
            const old = dist[i][j]
            dist[i][j] = via
            cellFlash[i + '-' + j] = 'green'
            status.value = 'dist[' + nameOf(i) + '][' + nameOf(j) + ']: ' + old + ' → ' + via
            await d(480)
            cellFlash[i + '-' + j] = ''
          }
        }
      }
      colorOf(nameOf(k), C.cyan)
      kIdx.value = -1
      await d(220)
    }
    let neg = -1
    for (let i = 0; i < 3; i++) if (dist[i][i] < 0) neg = i
    if (neg >= 0) {
      cellFlash[neg + '-' + neg] = 'red'
      colorOf(nameOf(neg), C.red)
      status.value = '发现负环！dist[' + nameOf(neg) + '][' + nameOf(neg) + '] = ' + dist[neg][neg] + ' < 0'
      await d(1700)
      cellFlash[neg + '-' + neg] = ''
      colorOf(nameOf(neg), C.cyan)
    } else {
      status.value = '未发现负环 ✓'
      await d(900)
    }
  })
}

function doReset() { initGraph() }

let ro: ResizeObserver | null = null
onMounted(() => { initGraph(); if (box.value) { W.value = box.value.clientWidth; ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w }); ro.observe(box.value) } })
onUnmounted(() => ro?.disconnect())

// ================= 目录 =================
const navList = [
  { id: 'sec-overview', name: '📐 结构总览' },
  { id: 'sec-1', name: '全源最短路问题' },
  { id: 'sec-2', name: 'DP 状态与转移' },
  { id: 'sec-3', name: '三重循环实现' },
  { id: 'sec-4', name: '路径重建' },
  { id: 'sec-5', name: '负环检测' },
  { id: 'sec-6', name: '复杂度与适用场景' },
  { id: 'sec-viz', name: '🎬 动画演示' },
  { id: 'sec-summary', name: '📋 小结' },
]

// ================= 代码示例 =================
const floydCode = `// ===== Floyd-Warshall 标准实现（邻接矩阵）=====
// graph[i][j] = i→j 的边权；无边 = Infinity；i == j = 0
function floydWarshall(graph: number[][]): number[][] {
    const n = graph.length
    const dist = graph.map(row => [...row])   // 拷贝一份，别改入参

    // k：本轮"允许使用的中间点集合"的上界（1..k 号点）
    // ⚠️ k 必须在最外层！i、j 谁内谁外无所谓
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const via = dist[i][k] + dist[k][j]   // i→k→j
                if (via < dist[i][j]) dist[i][j] = via
            }
        }
    }
    return dist
}

// ===== 手动模拟（对应本页动画的 4 节点图）=====
// 初始 dist:
//        A   B   C   D
//   A    0   3   8  10
//   B    ∞   0   2   9
//   C    ∞   ∞   0   1
//   D    ∞   ∞   ∞   0
//
// k=B（允许经过 B）:  A→C 由 8 缩到 3+2 = 5
// k=C（允许经过 C）:  A→D 由 10 缩到 5+1 = 6；B→D 由 9 缩到 2+1 = 3
// 最终:
//        A   B   C   D
//   A    0   3   5   6
//   B    ∞   0   2   3
//   C    ∞   ∞   0   1
//   D    ∞   ∞   ∞   0
//
// 为什么可以原地更新？
// 第 k 轮只用 d[i][k]、d[k][j]，它们"不经过 k 自己"，
// 所以本轮不会被改写 → 放心原地更新，省 O(V³) 空间`

const pathCode = `// ===== Floyd + 路径重建（next 矩阵）=====
// next[i][j]：i→j 最短路径上，i 的"下一站"是谁
function floydWithPath(graph: number[][]): { dist: number[][]; next: number[][] } {
    const n = graph.length
    const dist = graph.map(row => [...row])
    const next: number[][] = []

    for (let i = 0; i < n; i++) {
        const row: number[] = []
        for (let j = 0; j < n; j++) {
            // 有直达边（或 i==j）→ 下一站就是 j；否则 -1 表示不可达
            row.push(dist[i][j] < Infinity ? j : -1)
        }
        next.push(row)
    }

    for (let k = 0; k < n; k++)
        for (let i = 0; i < n; i++)
            for (let j = 0; j < n; j++) {
                const via = dist[i][k] + dist[k][j]
                if (via < dist[i][j]) {
                    dist[i][j] = via
                    next[i][j] = next[i][k]   // 关键：路径改走"先到 k 那条路"的第一站
                }
            }
    return { dist, next }
}

// 回溯路径：不断跳 next，直到到达终点
function reconstruct(next: number[][], i: number, j: number): number[] {
    if (next[i][j] === -1) return []          // 不可达
    const path: number[] = [i]
    while (i !== j) {
        i = next[i][j]                        // 跳到下一站
        if (i === -1) return []
        path.push(i)
    }
    return path
}

// 例子（本页图）：reconstruct(next, A, D) → [A, B, C, D]
// 因为 A→D 的最优路径是 A→B→C→D（3+2+1=6），而不是直达的 10`

const negCycleCode = `// ===== 负环检测：跑完 Floyd 看对角线 =====
// 若存在负环，点 i 绕环一圈回到自己会更短 → dist[i][i] < 0
function hasNegativeCycle(graph: number[][]): boolean {
    const n = graph.length
    const dist = graph.map(row => [...row])

    for (let k = 0; k < n; k++)
        for (let i = 0; i < n; i++)
            for (let j = 0; j < n; j++)
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j]

    for (let i = 0; i < n; i++)
        if (dist[i][i] < 0) return true       // 自己到自己的最短距离为负
    return false
}

// 负环例子（本页动画「检测负环」的三角图）：
//   A→B: 1   B→C: -1   C→A: -2
//   环 A→B→C→A 总权重 = 1 + (-1) + (-2) = -2 < 0 → 负环
// 跑完 Floyd 后 dist[A][A] = -2 < 0 → 检测成功

// ⚠️ 注意：有负环时"最短路径"本身无意义（可以无限绕圈变短）
// Floyd 只负责"检测"，不负责给出最短路径结果`
</script>

<style scoped></style>
