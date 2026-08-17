<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">⚡ Dijkstra：贪心 + 优先队列 O(ElogV)</h1>
          <p class="text-sm text-slate-500 mt-1">单源最短路 —— 每次「确定」一个最近未访问节点</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-3-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：逐点「点亮」+ 贪心松弛
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Dijkstra 求<strong>单源最短路</strong>（所有边权非负）：维护 <code>dist[]</code>，每一轮
          <strong>贪心地「确定」一个 dist 最小的未访问节点 u</strong>，再用 u 去<strong>松弛</strong>它的所有邻接边
          （<code>dist[v] = min(dist[v], dist[u] + w)</code>）。因为边权非负，被「确定」的节点的 dist 就再也不会变小——
          「确定即最终」，这就是它比 Bellman-Ford 快的原因。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 320" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="16" y="20" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">加权无向图：从 A 出发求到各点的最短路径（节点下方为最终 dist，橙色 = 源点）</text>

            <!-- 边（无向） -->
            <line x1="200" y1="55" x2="80" y2="130" stroke="#94a3b8" stroke-width="2" />
            <line x1="200" y1="55" x2="320" y2="130" stroke="#94a3b8" stroke-width="2" />
            <line x1="80" y1="130" x2="320" y2="130" stroke="#94a3b8" stroke-width="2" />
            <line x1="80" y1="130" x2="140" y2="220" stroke="#94a3b8" stroke-width="2" />
            <line x1="320" y1="130" x2="140" y2="220" stroke="#94a3b8" stroke-width="2" />
            <line x1="320" y1="130" x2="260" y2="220" stroke="#94a3b8" stroke-width="2" />
            <line x1="140" y1="220" x2="260" y2="220" stroke="#94a3b8" stroke-width="2" />
            <line x1="140" y1="220" x2="200" y2="275" stroke="#94a3b8" stroke-width="2" />
            <line x1="260" y1="220" x2="200" y2="275" stroke="#94a3b8" stroke-width="2" />

            <!-- 权重 -->
            <text x="140" y="86" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">4</text>
            <text x="260" y="86" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">2</text>
            <text x="200" y="122" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">1</text>
            <text x="110" y="168" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">5</text>
            <text x="230" y="168" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">8</text>
            <text x="292" y="168" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">10</text>
            <text x="200" y="212" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">2</text>
            <text x="170" y="236" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">6</text>
            <text x="230" y="236" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">3</text>

            <!-- 节点 -->
            <circle cx="200" cy="55" r="22" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="200" y="55" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="80" cy="130" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="80" y="130" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="320" cy="130" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="320" y="130" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <circle cx="140" cy="220" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="140" y="220" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
            <circle cx="260" cy="220" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="260" y="220" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">E</text>
            <circle cx="200" cy="275" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="200" y="275" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">F</text>

            <!-- dist -->
            <text x="200" y="97" text-anchor="middle" font-size="11" font-family="monospace" fill="#f59e0b" font-weight="bold">dist=0</text>
            <text x="80" y="170" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">dist=3</text>
            <text x="320" y="170" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">dist=2</text>
            <text x="140" y="260" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">dist=8</text>
            <text x="260" y="260" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">dist=10</text>
            <text x="200" y="315" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">dist=13</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Dijkstra 演示图（A 为源点）。最终 dist：B=3（A→C→B）、D=8（A→C→B→D）、F=13（A→C→B→D→E→F）</figcaption>
        </figure>

        <!-- 操作示意图：确定 C -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：确定最小未访问节点 C → 松弛其邻接边</h3>
        <figure class="mb-2">
          <svg viewBox="0 0 720 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <!-- 左：确定前 -->
            <text x="150" y="26" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">① 确定前：C 是 dist 最小的未访问节点</text>
            <line x1="90" y1="80" x2="70" y2="160" stroke="#94a3b8" stroke-width="2" />
            <line x1="90" y1="80" x2="190" y2="160" stroke="#94a3b8" stroke-width="2" />
            <line x1="70" y1="160" x2="190" y2="160" stroke="#94a3b8" stroke-width="2" />
            <text x="80" y="110" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">4</text>
            <text x="140" y="110" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">2</text>
            <text x="130" y="152" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">1</text>
            <circle cx="90" cy="80" r="22" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
            <text x="90" y="80" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">A</text>
            <circle cx="70" cy="160" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="70" y="160" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="190" cy="160" r="22" fill="#f59e0b" stroke="#d97706" stroke-width="3" />
            <text x="190" y="160" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <text x="90" y="120" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a">0</text>
            <text x="70" y="200" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">4</text>
            <text x="190" y="200" text-anchor="middle" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">2（最小）</text>

            <!-- 中间说明 -->
            <text x="330" y="100" text-anchor="middle" font-size="12" font-family="monospace" fill="#f59e0b" font-weight="bold">① 确定 C</text>
            <text x="330" y="122" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">② 松弛 C 的邻边</text>

            <!-- 右：确定后 -->
            <text x="560" y="26" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">② 确定后：B 被 C 更新为 3</text>
            <line x1="470" y1="80" x2="450" y2="160" stroke="#94a3b8" stroke-width="2" />
            <line x1="470" y1="80" x2="590" y2="160" stroke="#94a3b8" stroke-width="2" />
            <line x1="450" y1="160" x2="590" y2="160" stroke="#f59e0b" stroke-width="3" />
            <text x="460" y="110" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">4</text>
            <text x="530" y="110" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">2</text>
            <text x="520" y="152" text-anchor="middle" font-size="11" font-family="monospace" fill="#d97706">1（被松弛）</text>
            <circle cx="470" cy="80" r="22" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
            <text x="470" y="80" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">A</text>
            <circle cx="450" cy="160" r="22" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
            <text x="450" y="160" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">B</text>
            <circle cx="590" cy="160" r="22" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
            <text x="590" y="160" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">C</text>
            <text x="470" y="120" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a">0</text>
            <text x="450" y="200" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">3（4→3）</text>
            <text x="590" y="200" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a">2</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：确定 C 并松弛后，dist[B] 从 4 被更新为 2+1=3——这就是「确定 + 松弛」的一轮</figcaption>
        </figure>
      </section>

      <!-- 1. 问题定义与贪心思想 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          问题定义与贪心思想
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>单源最短路（SSSP）</strong>：给定带权图 <code>G = (V, E)</code> 和源点 <code>s</code>，求出 s 到<strong>每个可达节点</strong>的
          <strong>最短路径长度</strong>（路径上边权之和最小）。Dijkstra 的适用前提是<strong>所有边权非负</strong>。
        </p>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>初始化：</strong><code>dist[s] = 0</code>，其余节点 <code>dist = ∞</code>；所有节点「未确定」。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>贪心选择：</strong>在未确定节点中挑 <code>dist</code> 最小的 <code>u</code>（这就是「最近未访问节点」）。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>确定并松弛：</strong>标记 <code>u</code> 已确定；对 u 的每条出边 <code>(u, v, w)</code> 做 <code>dist[v] = min(dist[v], dist[u] + w)</code>。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>循环：</strong>重复 ②③，直到所有可达节点都被确定（或剩余节点 dist = ∞）。</div>
          </li>
        </ol>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">节点</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">A</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">B</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">C</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">D</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">E</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">F</th>
              </tr>
            </thead>
            <tbody class="text-slate-600 text-xs">
              <tr>
                <td class="px-4 py-2 border font-semibold text-slate-700">最终 dist</td>
                <td class="px-4 py-2 border font-mono">0</td>
                <td class="px-4 py-2 border font-mono">3</td>
                <td class="px-4 py-2 border font-mono">2</td>
                <td class="px-4 py-2 border font-mono">8</td>
                <td class="px-4 py-2 border font-mono">10</td>
                <td class="px-4 py-2 border font-mono">13</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border font-semibold text-slate-700">最短路径</td>
                <td class="px-4 py-2 border font-mono">-</td>
                <td class="px-4 py-2 border font-mono">A→C→B</td>
                <td class="px-4 py-2 border font-mono">A→C</td>
                <td class="px-4 py-2 border font-mono">A→C→B→D</td>
                <td class="px-4 py-2 border font-mono">A→C→B→D→E</td>
                <td class="px-4 py-2 border font-mono">A→C→B→D→E→F</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Dijkstra 就像<strong>导航软件按距离「由近到远」逐座点亮城市</strong>：每次只敢说「离起点最近的下一站已确定」，点亮它之后，再顺带更新它周边的邻居距离。<br/>
          也像<strong>浏览器资源加载的层级依赖</strong>：先确定代价最小的依赖，再级联刷新下游——每轮只推进「当前最便宜」的一步，绝不回头。</p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>忘了非负权前提</strong>：只要出现负权边，「确定即最终」就失效（见第 4 节反例）。<br/>
          ② <strong>把「贪心」当成「暴力」</strong>：Dijkstra 不是每轮重新全图扫描松弛，而是「确定一个 + 只松弛它的邻居」——这是它高效的关键。
          </p>
        </aside>
      </section>

      <!-- 2. 朴素 O(V²) -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          朴素实现：O(V²) 的「数组找最小」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          不用任何高级数据结构：每轮用<strong>线性扫描</strong>在未确定节点里找 dist 最小的那个（O(V)），
          再用邻接矩阵松弛一整行（O(V)）。主循环 V 轮，总复杂度 <strong>O(V² + E) = O(V²)</strong>。
          对于<strong>稠密图</strong>（E ≈ V²），它反而比堆优化版更快，因为省去了堆操作的对数开销。
        </p>

        <div class="mb-4"><Code language="ts" :code="naiveDijkstraCode" title="dijkstra_naive.ts" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么「确定」后就不用再改？</strong><br/>
          因为所有边权 ≥ 0：任何「绕路」路径 = <code>dist[u] + 非负增量 ≥ dist[u]</code>，不可能比已确定的 dist[u] 更小。
          用<strong>反证法</strong>：假设 u 被确定后还能通过某条路径 <code>u → … → x → u</code> 变得更小，那 x 到 u 的最后一条边权为负——与非负权矛盾。</p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>忘了 used 标记</strong>：不标记「已确定」，同一个节点会被反复选中、反复松弛，甚至死循环。<br/>
          ② <strong>dist[u] = ∞ 时不 break</strong>：剩余节点不可达还继续扫描，纯属浪费时间；正确做法是直接跳出主循环。<br/>
          ③ <strong>无向图只存一半边</strong>：邻接矩阵要对 <code>g[u][v]</code> 和 <code>g[v][u]</code> 都赋值，否则松弛漏边。
          </p>
        </aside>
      </section>

      <!-- 3. 堆优化 O(E log V) -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          堆优化：O(E log V) 的「优先队列」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          把「找最小」从 O(V) 降为 O(log V)：用<strong>最小堆</strong>维护 <code>(dist, 节点)</code> 对，每次弹出 dist 最小的。
          松弛成功时把新 <code>(dist[v], v)</code> <strong>重复入堆</strong>，弹出时用<strong>惰性删除</strong>（<code>d &gt; dist[u]</code> 则跳过）忽略过期记录。
          每条边最多导致一次成功松弛 → <strong>O(E) 次 push/pop × O(log V) = O(E log V)</strong>。
        </p>

        <div class="mb-4"><Code language="ts" :code="heapDijkstraCode" title="dijkstra_heap.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          优先队列 = <strong>「待办事项」按优先级从小到大的最小堆</strong>：最紧急（dist 最小）的永远最先弹出。
          就像事件循环里的<strong>微任务队列</strong>——新任务可以随时插入，但永远先处理「当前最紧迫」的那个。<br/>
          惰性删除则像 <strong>React 的过期更新丢弃</strong>：入队时版本号旧了，弹出时发现已过期就扔掉。</p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>没有惰性删除会死循环</strong>：重复入堆后，旧记录 <code>d &gt; dist[u]</code> 必须被跳过，否则会反复弹出同一个节点。<br/>
          ② <strong>比较器写反</strong>：堆是「最小堆」——距离小的优先；写成大根堆（距离大的优先）答案全错。<br/>
          ③ <strong>稠密图无脑用堆</strong>：E ≈ V² 时堆版是 O(V² log V)，反而比朴素 O(V²) 慢，要先看图的稀疏程度。
          </p>
        </aside>
      </section>

      <!-- 4. 为什么不能处理负权边 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          为什么不能处理负权边？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Dijkstra 的核心假设是「<strong>dist 最小的未确定节点，其 dist 就是最终值</strong>」。
          一旦出现负权边，这个假设崩塌：一个 dist 更大的节点，可能通过负权边「抄近道」把已经确定的节点反超。
          <strong>被确定过的节点 Dijkstra 不会再更新</strong>，于是答案就错了。
        </p>

        <figure class="mb-4">
          <svg viewBox="0 0 720 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="neg-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="neg-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">反例：S→B(1)，S→A(5)，A→B(-10)</text>

            <line x1="90" y1="80" x2="170" y2="160" stroke="#94a3b8" stroke-width="2" marker-end="url(#neg-a)" />
            <line x1="90" y1="80" x2="250" y2="80" stroke="#94a3b8" stroke-width="2" marker-end="url(#neg-a)" />
            <line x1="250" y1="80" x2="170" y2="160" stroke="#f59e0b" stroke-width="3" marker-end="url(#neg-b)" />

            <text x="122" y="112" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">1</text>
            <text x="170" y="72" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">5</text>
            <text x="222" y="112" text-anchor="middle" font-size="12" font-family="monospace" fill="#d97706" font-weight="bold">-10</text>

            <circle cx="90" cy="80" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="90" y="80" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">S</text>
            <circle cx="250" cy="80" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="250" y="80" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="170" cy="160" r="22" fill="#ef4444" stroke="#dc2626" stroke-width="2.5" />
            <text x="170" y="160" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>

            <text x="250" y="122" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">dist=5（后确定）</text>
            <text x="170" y="198" text-anchor="middle" font-size="10" font-family="monospace" fill="#dc2626" font-weight="bold">dist=1（已确定·错！）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 3：Dijkstra 先确定 B（dist=1），之后 A→B 的 -10 却给出 5+(-10) = -5，可惜 B 已「确定」无法回头</figcaption>
        </figure>

        <div class="mb-4"><Code language="ts" :code="negativeEdgeCode" title="dijkstra_negative.ts" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>负权图直接套 Dijkstra</strong>：结果「看起来有值」，其实是错的，而且错得很隐蔽（只差少数节点）。<br/>
          ② <strong>用「访问过就不再看」的 visited 集合</strong>：负权场景下被确定节点可能被反超，visited 集合会彻底堵死修正机会。<br/>
          ③ <strong>把负权「取反」骗过算法</strong>：对边权取绝对值是错的——那会改变最短路径本身，不是同一问题。
          </p>
        </aside>
      </section>

      <!-- 5. 路径重建 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          路径重建：用 parent 数组回溯
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          光有 dist 只能知道「多短」，不知道「怎么走」。解法：<strong>每次松弛成功时记录前驱</strong>
          <code>parent[v] = u</code>（dist[v] 是从 u 更新来的）。全部跑完后，从终点 t 沿 parent
          一路回溯到源点 s，再反转，就是完整最短路径。
        </p>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>初始化：</strong><code>parent[s] = -1</code>（源点无前驱），其余 <code>parent = -1</code>。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>松弛时记录：</strong>只要 <code>dist[v]</code> 被更新为 <code>dist[u]+w</code>，就令 <code>parent[v] = u</code>。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>回溯：</strong>从终点 t 出发：<code>v = t → parent[v] → parent[parent[v]] → …</code> 直到 -1。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>反转：</strong>回溯得到的是 <code>[t, …, s]</code>，<code>reverse()</code> 后即 <code>[s, …, t]</code>。</div>
          </li>
        </ol>

        <div class="mb-4"><Code language="ts" :code="pathCode" title="dijkstra_path.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          parent 回溯 = <strong>浏览器历史栈的前进/后退</strong>：每个页面记一个「我从哪来的」（parent），
          想回起点就一路 <code>history.back()</code>。也像 <strong>编辑器的撤销链</strong>——记录每一步的前驱，才能把操作回放/撤销成一条完整路径。</p>
        </aside>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><br/>
          路径重建与算法本身解耦：<strong>任何最短路算法（Dijkstra / Bellman-Ford / SPFA）都共用同一套 parent 思路</strong>。
          学会一次，三个算法都会了。进阶：只求「一点到一点」时可用<strong>双向 Dijkstra</strong> 从两端同时搜，速度翻倍（见 6-3-5 A*）。</p>
        </aside>
      </section>

      <!-- 6. 复杂度分析 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">6</span>
          复杂度分析与选型
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">实现</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">提取最小</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">松弛一条边</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">总时间</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">适用场景</th>
              </tr>
            </thead>
            <tbody class="text-slate-600 text-xs">
              <tr>
                <td class="px-4 py-2 border font-semibold text-slate-700">朴素（数组）</td>
                <td class="px-4 py-2 border font-mono">O(V)</td>
                <td class="px-4 py-2 border font-mono">O(1)</td>
                <td class="px-4 py-2 border font-mono">O(V² + E) = O(V²)</td>
                <td class="px-4 py-2 border">稠密图（E ≈ V²）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border font-semibold text-cyan-700">二叉堆</td>
                <td class="px-4 py-2 border font-mono">O(log V)</td>
                <td class="px-4 py-2 border font-mono">O(log V)</td>
                <td class="px-4 py-2 border font-mono">O((V + E) log V) = O(E log V)</td>
                <td class="px-4 py-2 border">稀疏图（默认选择）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border font-semibold text-emerald-700">斐波那契堆</td>
                <td class="px-4 py-2 border font-mono">O(log V)</td>
                <td class="px-4 py-2 border font-mono">O(1) 摊还</td>
                <td class="px-4 py-2 border font-mono">O(V log V + E)</td>
                <td class="px-4 py-2 border">理论最优，常数大实现难</td>
              </tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong><br/>
          <strong>非负权 + 单源最短路 → 默认堆优化 Dijkstra</strong>（O(E log V)）；<br/>
          <strong>稠密小图（如 n ≤ 10⁴ 且 E 接近 n²）→ 朴素 O(V²)</strong>；<br/>
          <strong>出现负权边 → 换 Bellman-Ford（6-3-2）或 SPFA（6-3-4）</strong>，Dijkstra 直接出局。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>空间复杂度记错</strong>：邻接矩阵 O(V²) 在 V = 10⁵ 时是 10¹⁰ 个格子，直接爆内存——大图必须用邻接表 O(V + E)。<br/>
          ② <strong>堆优化版里仍写邻接矩阵</strong>：堆优化的意义建立在稀疏图 + 邻接表之上，矩阵 + 堆 = 又慢又占内存。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：Dijkstra 求单源最短路
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          固定加权无向图（与图 1 相同，源点 A）。<strong>橙色</strong> = 当前被确定的节点，
          <strong>蓝色</strong> = 正在被松弛的邻接节点，<strong>绿色</strong> = 已确定；节点下方的数字是 dist（∞ = 尚未可达）。
          边变橙色表示正在被松弛；「重建路径」会把 A→F 的最短路边点亮为绿色。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">✅ 已确定: {{ doneCount }}/{{ gNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
          <span v-if="result" class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">📊 {{ result }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @click="doNaive" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">🧮 朴素 Dijkstra（O(V²)）</button>
          <button @click="doHeap" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">⏫ 堆优化 Dijkstra（O(E log V)）</button>
          <button @click="doReconstruct" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">🔗 重建路径（A→F）</button>
          <button @click="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in gEdges" :key="'e'+e.from+'-'+e.to" :config="edgeCfg(e)" />
              <v-text v-for="e in gEdges" :key="'w'+e.from+'-'+e.to" :config="weightCfg(e)" />
              <v-circle v-for="n in gNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in gNodes" :key="'l'+n.id" :config="labelCfg(n)" />
              <v-text v-for="n in gNodes" :key="'d'+n.id" :config="distCfg(n)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 📋 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>核心思想：</strong>每轮「确定」dist 最小的未访问节点，再用它松弛邻接边——贪心 + 松弛</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>正确性前提：</strong>所有边权非负，「确定即最终」才成立；有负权必须换 Bellman-Ford/SPFA</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>朴素实现 O(V²)</strong>：线性扫描找最小，适合稠密图</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>堆优化 O(E log V)</strong>：最小堆 + 惰性删除，稀疏图默认选择</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>路径重建：</strong>松弛时记录 parent[v] = u，终点回溯 + reverse 即得完整路径</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>进阶：</strong>双向 Dijkstra / A*（6-3-5）进一步加速「一点到一点」查询</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-2-traversal/dsa-6-2-4-topo-sort" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：拓扑排序：Kahn算法/DFS后序, AOV网</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-3-shortest-path/dsa-6-3-2-bellman-ford" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Bellman-Ford：负权边与负环检测 →</RouterLink>
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
  { id: "sec-1", name: "问题定义与贪心思想" },
  { id: "sec-2", name: "朴素实现 O(V²)" },
  { id: "sec-3", name: "堆优化 O(E log V)" },
  { id: "sec-4", name: "为什么怕负权边" },
  { id: "sec-5", name: "路径重建 parent" },
  { id: "sec-6", name: "复杂度分析" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

// ===== 🎬 Dijkstra 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(360), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref(''), result = ref('')
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))
const fmt = (x: number) => x === Infinity ? '∞' : String(x)

interface GNode { id: string; label: string; x: number; y: number; color: string; dist?: number | null }
interface GEdge { from: string; to: string; w: number; color: string; directed?: boolean }
const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])
const doneCount = computed(() => gNodes.filter(n => n.color === C.green).length)

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)
  ;[
    { id:'A', label:'A', x:200, y:30 },
    { id:'B', label:'B', x:70, y:130 },
    { id:'C', label:'C', x:330, y:130 },
    { id:'D', label:'D', x:120, y:230 },
    { id:'E', label:'E', x:280, y:230 },
    { id:'F', label:'F', x:200, y:320 },
  ].forEach(n => gNodes.push({ ...n, color: C.cyan, dist: null }))
  ;[
    { from:'A', to:'B', w:4 },
    { from:'A', to:'C', w:2 },
    { from:'B', to:'C', w:1 },
    { from:'B', to:'D', w:5 },
    { from:'C', to:'D', w:8 },
    { from:'C', to:'E', w:10 },
    { from:'D', to:'E', w:2 },
    { from:'D', to:'F', w:6 },
    { from:'E', to:'F', w:3 },
  ].forEach(e => gEdges.push({ ...e, color:'#94a3b8' }))
}
function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function colorOf(id: string, c: string) { const n = pos(id); if (n) n.color = c }
function allCyan() { gNodes.forEach(n => n.color = C.cyan) }
function resetState() {
  gNodes.forEach(n => { n.color = C.cyan; n.dist = null })
  gEdges.forEach(e => e.color = '#94a3b8')
  result.value = ''
}
function edgeCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { points:[a.x, a.y, b.x, b.y], stroke:e.color, strokeWidth: e.color==='#94a3b8' ? 2 : 3 }
}
function weightCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { x:(a.x+b.x)/2, y:(a.y+b.y)/2 - 8, text:String(e.w), fontSize:11, fontFamily:'monospace', fill:C.muted, align:'center' }
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

// 静默计算（供「重建路径」使用）：堆优化 Dijkstra 纯计算，不带动画
function computeDistances(): { dist: Record<string, number>; parent: Record<string, string | null> } {
  const dist: Record<string, number> = {}
  const parent: Record<string, string | null> = {}
  gNodes.forEach(n => { dist[n.id] = Infinity; parent[n.id] = null })
  dist['A'] = 0
  const pq: [number, string][] = [[0, 'A']]
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0])
    const [dd, u] = pq.shift()!
    if (dd > dist[u]) continue
    for (const e of gEdges) {
      if (e.from === u || e.to === u) {
        const v = e.from === u ? e.to : e.from
        if (dist[u] + e.w < dist[v]) {
          dist[v] = dist[u] + e.w
          parent[v] = u
          pq.push([dist[v], v])
        }
      }
    }
  }
  return { dist, parent }
}

// 核心动画：跑一遍 Dijkstra（朴素 / 堆优化两版共用）
async function runDijkstra(useHeap: boolean) {
  resetState()
  const dist: Record<string, number> = {}
  const parent: Record<string, string | null> = {}
  gNodes.forEach(n => { dist[n.id] = Infinity; parent[n.id] = null })
  dist['A'] = 0; pos('A').dist = 0
  const visited = new Set<string>()
  const pq: [number, string][] = [[0, 'A']]
  colorOf('A', C.orange); status.value = useHeap ? '⏫ 最小堆：弹出 A（dist=0）' : '🔍 扫描：A 的 dist=0 最小，确定 A'
  await d(600)

  const pick = (): string => {
    if (useHeap) {
      while (pq.length) {
        pq.sort((a, b) => a[0] - b[0])
        const [dd, u] = pq.shift()!
        if (dd === dist[u] && !visited.has(u)) return u   // 有效记录
      }
      return ''
    }
    let u = '', best = Infinity
    for (const n of gNodes) {
      if (!visited.has(n.id) && dist[n.id] < best) { best = dist[n.id]; u = n.id }
    }
    return u
  }

  while (visited.size < gNodes.length) {
    const u = pick()
    if (u === '') break
    colorOf(u, C.orange)
    status.value = useHeap
      ? `⏫ 堆优化：弹出 ${u}（dist=${dist[u]}）`
      : `🧮 朴素：未确定中 ${u} 的 dist=${dist[u]} 最小，确定它`
    await d(600)
    for (const e of gEdges) {
      if (e.from === u || e.to === u) {
        const v = e.from === u ? e.to : e.from
        if (visited.has(v)) continue
        e.color = C.orange
        colorOf(v, C.blue)
        status.value = `松弛 ${u}—${v}（w=${e.w}）：${dist[u]} + ${e.w} = ${dist[u] + e.w} vs dist[${v}]=${fmt(dist[v])}`
        await d(450)
        if (dist[u] + e.w < dist[v]) {
          dist[v] = dist[u] + e.w
          parent[v] = u
          pos(v).dist = dist[v]
          colorOf(v, C.green)
          status.value = `✅ 更新 dist[${v}] = ${dist[v]}（经 ${u}）`
          if (useHeap) pq.push([dist[v], v])
          await d(450)
        }
        e.color = '#94a3b8'
        colorOf(v, visited.has(v) ? C.green : C.cyan)
        await d(300)
      }
    }
    visited.add(u)
    colorOf(u, C.green)
    status.value = `🏁 ${u} 已确定（dist=${dist[u]}），加入已确定集合`
    await d(450)
  }
  result.value = 'dist：' + gNodes.map(n => n.id + '=' + fmt(dist[n.id])).join(' ')
}

function doNaive() { act('朴素 Dijkstra：每轮线性扫描找最小', 'O(V²)', () => runDijkstra(false)) }
function doHeap() { act('堆优化 Dijkstra：最小堆弹出 + 惰性删除', 'O(E log V)', () => runDijkstra(true)) }

async function doReconstruct() {
  act('回溯 parent 重建最短路径', '路径重建', async () => {
    const { dist, parent } = computeDistances()
    gNodes.forEach(n => { n.dist = dist[n.id]; n.color = C.cyan })
    gEdges.forEach(e => e.color = '#94a3b8')
    await d(400)
    const path: string[] = []
    let v = 'F'
    while (v) {
      path.unshift(v)
      const p = parent[v]
      if (!p) break
      const e = gEdges.find(x => (x.from === v && x.to === p) || (x.from === p && x.to === v))
      colorOf(v, C.orange); await d(350); colorOf(v, C.green)
      if (e) { e.color = C.green; await d(350) }
      v = p
    }
    colorOf('A', C.green)
    result.value = `路径 A→F：${path.join(' → ')}，总长 ${dist['F']}`
    status.value = '🔗 最短路边已点亮为绿色'
    await d(400)
  })
}

function doReset() { resetState() }

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
const naiveDijkstraCode = `// ===== 朴素 Dijkstra：O(V²)，适合稠密图 =====
// 邻接矩阵 g[u][v] 存边权，0 表示无边
function dijkstraNaive(n: number, g: number[][], s: number): number[] {
    const dist = new Array<number>(n).fill(Infinity)   // dist[v]：当前已知最短距离
    const used = new Array<boolean>(n).fill(false)     // used[v]：是否已「确定」
    dist[s] = 0

    for (let i = 0; i < n; i++) {
        // ① 在未确定的节点中挑 dist 最小的（贪心！）—— O(V)
        let u = -1
        for (let v = 0; v < n; v++) {
            if (!used[v] && (u === -1 || dist[v] < dist[u])) u = v
        }
        if (u === -1 || dist[u] === Infinity) break    // 剩余节点都不可达

        // ② 确定 u：dist[u] 从此不再改变（非负权保证）
        used[u] = true

        // ③ 用 u 松弛所有邻接边 —— O(V)（邻接矩阵要扫一整行）
        for (let v = 0; v < n; v++) {
            if (g[u][v] > 0 && dist[u] + g[u][v] < dist[v]) {
                dist[v] = dist[u] + g[u][v]            // 松弛：发现更短路径
            }
        }
    }
    return dist
}

// 主循环 V 轮 × (找最小 O(V) + 松弛 O(V)) → 总复杂度 O(V² + E) = O(V²)
// 稠密图（E ≈ V²）时，O(V²) 反而优于堆优化的 O(E log V)`

const heapDijkstraCode = `// ===== 堆优化 Dijkstra：O(E log V)，适合稀疏图 =====
// 最小堆直接存 (dist, 节点)，每次 O(log V) 弹出当前最小者

class MinHeap<T> {
    private data: T[] = []
    constructor(private less: (a: T, b: T) => boolean) {}
    get size() { return this.data.length }
    isEmpty() { return this.data.length === 0 }
    push(v: T) {
        this.data.push(v)
        let i = this.data.length - 1
        while (i > 0) {
            const p = (i - 1) >> 1
            if (!this.less(this.data[i], this.data[p])) break
            ;[this.data[i], this.data[p]] = [this.data[p], this.data[i]]
            i = p
        }
    }
    pop(): T | undefined {
        const top = this.data[0]
        const last = this.data.pop()!
        if (this.data.length) { this.data[0] = last; this.siftDown(0) }
        return top
    }
    private siftDown(i: number) {
        const n = this.data.length
        while (true) {
            const l = 2 * i + 1, r = 2 * i + 2
            let m = i
            if (l < n && this.less(this.data[l], this.data[m])) m = l
            if (r < n && this.less(this.data[r], this.data[m])) m = r
            if (m === i) break
            ;[this.data[i], this.data[m]] = [this.data[m], this.data[i]]
            i = m
        }
    }
}

function dijkstraHeap(n: number, adj: [number, number][][], s: number): number[] {
    const dist = new Array<number>(n).fill(Infinity)
    const pq = new MinHeap<[number, number]>((a, b) => a[0] < b[0])   // 按距离的小根堆
    dist[s] = 0
    pq.push([0, s])

    while (!pq.isEmpty()) {
        const [d, u] = pq.pop()!
        if (d > dist[u]) continue              // 惰性删除：过期的旧记录，直接跳过
        for (const [v, w] of adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w
                pq.push([dist[v], v])          // 允许重复入堆，靠 d > dist[u] 兜底
            }
        }
    }
    return dist
}

// 每条边最多成功松弛一次 → E 次 push/pop，每次 O(log V) → O(E log V)
// 注意：稠密图 E ≈ V² 时是 O(V² log V)，反而不如朴素版！`

const pathCode = `// ===== 路径重建：parent 数组 + 回溯 =====
// 松弛 dist[v] 的同时记录「从谁来的」：parent[v] = u
function dijkstraPath(n: number, adj: [number, number][][], s: number): { dist: number[]; parent: number[] } {
    const dist = new Array<number>(n).fill(Infinity)
    const parent = new Array<number>(n).fill(-1)      // -1 表示无前驱（起点）
    const used = new Array<boolean>(n).fill(false)
    dist[s] = 0
    for (let i = 0; i < n; i++) {
        let u = -1
        for (let v = 0; v < n; v++) {
            if (!used[v] && (u === -1 || dist[v] < dist[u])) u = v
        }
        if (u === -1 || dist[u] === Infinity) break
        used[u] = true
        for (const [v, w] of adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w
                parent[v] = u                 // ★ 记录前驱
            }
        }
    }
    return { dist, parent }
}

// 从终点 t 沿 parent 一路回溯到起点，再反转
function reconstructPath(parent: number[], t: number): number[] {
    const path: number[] = []
    for (let v = t; v !== -1; v = parent[v]) path.push(v)
    return path.reverse()                      // [s, ..., t]
}

// 手算（正文图 1）：到 F 的最短路
// parent: B←C, C←A, D←B, E←D, F←E
// reconstructPath(parent, 5) = [A, C, B, D, E, F]，总长 2+1+5+2+3 = 13`

const negativeEdgeCode = `// ===== 反例：负权边让 Dijkstra 的贪心失效 =====
// 图：S→B(1), S→A(5), A→B(-10)
//       1        -10
//   S ------> B <------ A
//   |                  ↑
//   └────── 5 ─────────┘
const edges = [
    { from: 0, to: 1, w: 1 },    // S → B
    { from: 0, to: 2, w: 5 },    // S → A
    { from: 2, to: 1, w: -10 },  // A → B（负权！）
]

// Dijkstra 执行过程：
// 1. dist = [0, ∞, ∞]；松弛 S 的邻边 → dist = [0, 1, 5]
// 2. 未确定中最小是 B(1) → 「确定」B —— 灾难从这里开始
// 3. 之后确定 A(5)，松弛 A→B：5 + (-10) = -5 < 1
//    —— 但 B 已经被「确定」了！贪心不允许回头更新
// 结果：dist[B] = 1（错误）；正确答案是 -5（S→A→B）

// 根因：负权边意味着「dist 更大」的节点仍可能通过负权
// 产生「更短的完整路径」——「确定即最终」的假设被打破
// 处理负权 → 用 Bellman-Ford（下一节 6-3-2）`
</script>

<style scoped></style>
