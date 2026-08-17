<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌱 Prim 算法：基于顶点的贪心</h1>
          <p class="text-sm text-slate-500 mt-1">从一点出发，每次「长」出最便宜的边</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-4-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：一颗「从种子长成」的最小生成树
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          最小生成树（MST）用 <strong>V-1 条边</strong>把所有顶点连通、且<strong>总权重最小</strong>。
          Prim 的思路是<strong>基于顶点</strong>的贪心：从任意一个顶点出发，把树看作一个整体，
          每轮在「树内 ↔ 树外」的<strong>割</strong>上挑<strong>最小权边</strong>，把新顶点并入树，直到树包含全部顶点。
          下图是 6 个顶点的加权连通图，绿色粗边就是最小生成树（总权重 15）。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="16" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">加权无向连通图（10 条边）—— 绿色粗边 = 最小生成树，总权重 15</text>

            <!-- 非 MST 边 -->
            <line x1="160" y1="55" x2="80" y2="160" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="160" y1="55" x2="515" y2="148" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="320" y1="58" x2="515" y2="148" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="320" y1="58" x2="205" y2="232" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="205" y1="232" x2="405" y2="228" stroke="#94a3b8" stroke-width="1.5" />

            <!-- MST 边 -->
            <line x1="160" y1="55" x2="320" y2="58" stroke="#16a34a" stroke-width="3.5" />
            <line x1="320" y1="58" x2="405" y2="228" stroke="#16a34a" stroke-width="3.5" />
            <line x1="515" y1="148" x2="405" y2="228" stroke="#16a34a" stroke-width="3.5" />
            <line x1="80" y1="160" x2="320" y2="58" stroke="#16a34a" stroke-width="3.5" />
            <line x1="80" y1="160" x2="205" y2="232" stroke="#16a34a" stroke-width="3.5" />

            <!-- 权重 -->
            <text x="240" y="48" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">1</text>
            <text x="362" y="135" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">4</text>
            <text x="460" y="180" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">2</text>
            <text x="200" y="101" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">5</text>
            <text x="142" y="188" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">3</text>
            <text x="120" y="99" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">6</text>
            <text x="337" y="93" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">5</text>
            <text x="417" y="95" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">5</text>
            <text x="262" y="137" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">6</text>
            <text x="305" y="236" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">6</text>

            <!-- 节点 -->
            <circle cx="160" cy="55" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="160" y="55" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="80" cy="160" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="80" y="160" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="320" cy="58" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="320" y="58" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <circle cx="515" cy="148" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="515" y="148" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
            <circle cx="205" cy="232" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="205" y="232" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">E</text>
            <circle cx="405" cy="228" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="405" y="228" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">F</text>

            <!-- 图例 -->
            <line x1="16" y1="246" x2="56" y2="246" stroke="#16a34a" stroke-width="3.5" />
            <text x="64" y="250" font-size="10" font-family="monospace" fill="#64748b">MST 边（总权重 15）</text>
            <line x1="220" y1="246" x2="260" y2="246" stroke="#94a3b8" stroke-width="1.5" />
            <text x="268" y="250" font-size="10" font-family="monospace" fill="#64748b">非 MST 边</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：MST 是「连满全部顶点 + 无环 + 总权重最小」的生成树；Prim 从任一顶点出发逐步长出它</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：每一轮「选最小割边」→「新顶点入树并刷新 dist」</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">第 1 轮：树 = {A}，候选 A-B(6)、A-C(1)、A-D(5)</p>
            <svg viewBox="0 0 340 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="18" font-size="10" font-family="monospace" fill="#64748b" font-weight="bold">树 = {A}，候选三条边，橙 = 候选</text>
              <line x1="70" y1="48" x2="42" y2="172" stroke="#f59e0b" stroke-width="1.5" />
              <line x1="70" y1="48" x2="185" y2="48" stroke="#f59e0b" stroke-width="3" />
              <line x1="70" y1="48" x2="300" y2="172" stroke="#f59e0b" stroke-width="1.5" />
              <text x="56" y="103" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#d97706">6</text>
              <text x="127" y="40" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#d97706">1</text>
              <text x="185" y="103" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#d97706">5</text>
              <circle cx="70" cy="48" r="20" fill="#4ade80" stroke="#16a34a" stroke-width="3" />
              <text x="70" y="48" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">A</text>
              <circle cx="42" cy="172" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="42" y="172" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <circle cx="185" cy="48" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="185" y="48" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
              <circle cx="300" cy="172" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="300" y="172" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
              <text x="14" y="206" font-size="10" font-family="monospace" fill="#d97706">最小候选 = A-C(1)，下一轮 C 入树</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">切分定理：跨割的最小边必属于某个 MST，所以「贪最小」不会错</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">第 1 轮后：C 入树，用 C 的边刷新 dist（B:5、D:5、E:6、F:4）</p>
            <svg viewBox="0 0 340 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="18" font-size="10" font-family="monospace" fill="#64748b" font-weight="bold">树 = {A,C}，新候选来自 C，dist 被刷新</text>
              <line x1="70" y1="48" x2="185" y2="48" stroke="#16a34a" stroke-width="3.5" />
              <line x1="185" y1="48" x2="42" y2="172" stroke="#f59e0b" stroke-width="1.5" />
              <line x1="185" y1="48" x2="300" y2="172" stroke="#f59e0b" stroke-width="1.5" />
              <line x1="185" y1="48" x2="115" y2="190" stroke="#f59e0b" stroke-width="1.5" />
              <line x1="185" y1="48" x2="255" y2="188" stroke="#f59e0b" stroke-width="2" />
              <line x1="70" y1="48" x2="300" y2="172" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4" />
              <text x="240" y="40" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#16a34a">1</text>
              <text x="113" y="105" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#d97706">5</text>
              <text x="242" y="105" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#d97706">5</text>
              <text x="150" y="115" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706">6</text>
              <text x="220" y="113" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#d97706">4</text>
              <circle cx="70" cy="48" r="20" fill="#4ade80" stroke="#16a34a" stroke-width="3" />
              <text x="70" y="48" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">A</text>
              <circle cx="185" cy="48" r="20" fill="#4ade80" stroke="#16a34a" stroke-width="3" />
              <text x="185" y="48" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">C</text>
              <circle cx="42" cy="172" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="42" y="172" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <text x="42" y="194" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">5</text>
              <circle cx="300" cy="172" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="300" y="172" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
              <text x="300" y="194" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">5</text>
              <circle cx="115" cy="190" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="115" y="190" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">E</text>
              <text x="115" y="212" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">6</text>
              <circle cx="255" cy="188" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="255" y="188" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">F</text>
              <text x="255" y="210" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">4</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">每入树一个顶点，就立刻用它刷新全部树外邻居的 dist</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. MST 定义与性质 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          最小生成树：定义 与 三条重要性质
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          一个带权无向连通图，<strong>生成树</strong>是满足两个条件的子图：① 连通全部顶点；② 无环。
          由树的性质，它恰好含 <strong>V-1 条边</strong>。所有生成树中<strong>边权和最小</strong>的那棵，就是<strong>最小生成树（MST）</strong>。
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">MST ⇔ 连通 + 无环 + 恰好 V-1 条边 + 总权重最小</p>
          <p class="text-xs text-cyan-600 text-center">「环性质」保证：任意环里最重的边永远不进 MST；「切分定理」保证：任意割里最轻的边一定属于某个 MST</p>
        </div>
        <ul class="space-y-2 text-slate-600 mb-4 text-sm leading-relaxed">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>切分定理（cut property）</strong>：把顶点集分成任意两半（一个割），跨越割的<strong>最小权边</strong>一定属于某个 MST。Prim 每一轮都在「树内/树外」这个割上挑最小边——所以贪心正确。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>环性质（cycle property）</strong>：任意环中<strong>权值最大</strong>的边不可能出现在任何 MST 里。Kruskal 的「成环跳过」正是它的直接应用。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>唯一性</strong>：若所有边权互不相同，MST 唯一；有权值相等时可能有多棵 MST，但<strong>总权重相同</strong>。</span></li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          最小生成树 ≈ 前端的<strong>「局域网最省布线」</strong>问题：公司有 N 个办公室，任意两个之间都能拉网线，但造价不同。
          你要让<strong>所有办公室互通</strong>（连通）、<strong>不拉多余线</strong>（无环）、<strong>总造价最低</strong>（权重最小）——
          这正是 MST。也可以用「城市电网 / 地铁线路 / 芯片引脚连线」来理解：目标是「连通且最省」。</p>
        </aside>
      </section>

      <!-- 2. 贪心思想 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          Prim 的贪心思想：dist[v] = 「到树的最小边权」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Prim 维护两个集合：<strong>树内 inTree</strong> 与 <strong>树外 outside</strong>。
          关键数组 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">dist[v]</code> 记录「树外顶点 v 与当前生成树之间<strong>最小的一条边</strong>的权值」——
          注意它<strong>不是</strong>到某个起点的距离，而是「到整个树」的最小边权。
        </p>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">dist[v] = min { w(u, v) | u ∈ inTree }&nbsp;&nbsp;（v 在树外）</p>
          <p class="text-xs text-slate-500 mt-1">每轮取出 dist 最小的树外顶点 u：u 入树，总权重 += dist[u]，再用 u 的每条边刷新邻居的 dist</p>
        </div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>初始化</strong>：任选起点 s 入树，dist[s] = 0，其余 dist = ∞</li>
          <li><strong>选点</strong>：在树外顶点中找 dist 最小者 u（第一个自然是 s）</li>
          <li><strong>入树</strong>：把 u 标记为树内，累计权重 += dist[u]</li>
          <li><strong>松弛</strong>：遍历 u 的所有边，若边权 w(u,v) 比 dist[v] 更小，就更新 dist[v] = w(u,v)</li>
          <li>重复 2-4 直到所有顶点入树（共 V-1 轮加边）</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Prim ≈ <strong>「从公司总部出发，每次选一根最便宜的网线把新办公室接入现有局域网」</strong>。
          总部（起点 A）先通网；每接入一个办公室，它就成了「已联网」的一员，能贡献新的候选网线。
          所有办公室连完时，用掉的网线就是最省的方案。<br/>
          它的 <code>dist</code> 数组长得像 Dijkstra，但<strong>含义完全不同</strong>：
          Dijkstra 的 dist 是「到源点的最短距离」，Prim 的 dist 是「到生成树的最小边权」——这正是第 6 节要对比的重点。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>起点可以<strong>任意选</strong>，MST 结果不受影响（总权重相同，边集可能因等权边不同）。
          通常选 0 号顶点，也可以选「度数最大」的顶点减少扫描次数（小优化）。</p>
        </aside>
      </section>

      <!-- 3. 朴素 O(V²) -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          朴素实现：O(V²)，稠密图的王者
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          用<strong>邻接矩阵</strong>存图，每轮线性扫描 <code>dist</code> 数组找最小（O(V)），
          再用矩阵行做松弛（O(V)），共 V 轮，总复杂度 <strong>O(V² + E) ≈ O(V²)</strong>。
          当图很稠密（E 接近 V²）时，这就是最优选择——比堆优化反而快。
        </p>
        <div class="mb-4"><Code language="ts" :code="naiveCode" title="prim_naive.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 1：把 Prim 抄成 Dijkstra 的松弛式</strong><br/>
          Dijkstra 是 <code>dist[to] = dist[u] + w</code>（距离累加），而 Prim 是 <code>dist[to] = w</code>（<strong>直接取边权</strong>）。
          用 Dijkstra 模板改 Prim 却忘了这一行，得到的是「从源点出发的最短路径树」，不是最小生成树。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 2：松弛时连「已入树」的顶点也更新</strong><br/>
          更新的目的只是刷新<strong>树外</strong>顶点的候选边。虽然多更新树内顶点一般不会出错（它们不会再被选中），
          但若把「已入树」的判断写反（<code>inTree[v]</code> 写成 <code>!inTree[v]</code>），
          可能导致一个顶点被重复选入、边数超 V-1，结果完全错误。</p>
        </aside>
      </section>

      <!-- 4. 堆优化 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          堆优化：O(E·logV)，稀疏图的好朋友
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          朴素版的瓶颈是「线性扫描找最小」。<strong>邻接表 + 小顶堆</strong>可以把找最小压到 O(logV)：
          堆里存 <code>[dist, 顶点]</code>，弹出堆顶即当前最小候选；每条边至多入堆一次，出堆一次，总复杂度 <strong>O(E·logV)</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="heapCode" title="prim_heap.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：堆里会有「过期条目」。</strong>同一个顶点可能被多条边松弛、入堆多次；
          弹出时用 <code>inTree[u] || d &gt; dist[u]</code> 判断是否过期即可（懒删除）。这是「可删堆」的廉价替代。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：在稠密图上迷信堆优化</strong><br/>
          稠密图 E ≈ V²，堆优化变成 O(V²·logV)，比朴素 O(V²) 更慢。
          选型口诀：<strong>边多（稠密）用矩阵朴素 Prim；边少（稀疏）用堆优化 Prim 或 Kruskal</strong>。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>稠密图（E 接近 V(V-1)/2）→ 朴素 Prim O(V²)，实现简单且最快；
          稀疏图（E 接近 V）→ Kruskal O(E·logE) 或堆优化 Prim O(E·logV)；
          绝大多数竞赛题数据「边多但没到完全图」，堆优化 Prim 是最稳妥的万金油。</p>
        </aside>
      </section>

      <!-- 5. 手算示例 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          手算示例：从 A 出发跑完整轮 Prim
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          用结构总览里的经典图（10 条边）手动执行一遍。起点 A 入树后，dist 初始为：
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">B:6, C:1, D:5, E:∞, F:∞</code>。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-xs text-slate-600 border border-slate-200 rounded-lg overflow-hidden">
            <thead class="bg-slate-50 text-slate-500">
              <tr>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">轮次</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">树内集合</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">本轮最小割边</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">dist 变化 (B,C,D,E,F)</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">累计权重</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2 font-mono">1</td>
                <td class="px-3 py-2 font-mono">{A}</td>
                <td class="px-3 py-2 font-mono text-cyan-700">A—C (1)</td>
                <td class="px-3 py-2 font-mono">6→5, 1, 5→5, ∞→6, ∞→4</td>
                <td class="px-3 py-2 font-mono">1</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2 font-mono">2</td>
                <td class="px-3 py-2 font-mono">{A,C}</td>
                <td class="px-3 py-2 font-mono text-cyan-700">C—F (4)</td>
                <td class="px-3 py-2 font-mono">5, 5, 5→2, 6, 4</td>
                <td class="px-3 py-2 font-mono">5</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2 font-mono">3</td>
                <td class="px-3 py-2 font-mono">{A,C,F}</td>
                <td class="px-3 py-2 font-mono text-cyan-700">F—D (2)</td>
                <td class="px-3 py-2 font-mono">5, 5, 2, 6, 4</td>
                <td class="px-3 py-2 font-mono">7</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2 font-mono">4</td>
                <td class="px-3 py-2 font-mono">{A,C,F,D}</td>
                <td class="px-3 py-2 font-mono text-cyan-700">C—B (5)</td>
                <td class="px-3 py-2 font-mono">5, 5, 2, 6→3, 4</td>
                <td class="px-3 py-2 font-mono">12</td>
              </tr>
              <tr>
                <td class="px-3 py-2 font-mono">5</td>
                <td class="px-3 py-2 font-mono">{A,C,F,D,B}</td>
                <td class="px-3 py-2 font-mono text-cyan-700">B—E (3)</td>
                <td class="px-3 py-2 font-mono">5, 5, 2, 3, 4</td>
                <td class="px-3 py-2 font-mono">15</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          最终 MST 边集：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">A-C(1)、C-F(4)、F-D(2)、C-B(5)、B-E(3)</code>，
          总权重 <strong>1+4+2+5+3 = 15</strong>。注意第 4 轮 B 的 dist 是 5（经 C），
          而不是初始的 6（经 A）——这就是「每入树一个点就刷新一次」的效果。
        </p>
        <div class="mb-4"><Code language="ts" :code="edgesCode" title="prim_edges.ts" /></div>
      </section>

      <!-- 6. 与 Dijkstra 对比 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">6</span>
          与 Dijkstra 的异同：长得像，不是一回事
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Prim 和 Dijkstra 的<strong>代码骨架几乎一模一样</strong>（贪心 + dist + 松弛 + 堆），
          但<strong>目标函数不同</strong>，导致 dist 的语义和松弛规则都不同。混用是面试和笔试的高频翻车点。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-xs text-slate-600 border border-slate-200 rounded-lg overflow-hidden">
            <thead class="bg-slate-50 text-slate-500">
              <tr>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">对比项</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">Prim（MST）</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">Dijkstra（最短路）</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2">dist 含义</td>
                <td class="px-3 py-2 font-mono">到「生成树」的最小边权</td>
                <td class="px-3 py-2 font-mono">到「源点」的最短距离</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2">松弛规则</td>
                <td class="px-3 py-2 font-mono">dist[to] = w(u,to)</td>
                <td class="px-3 py-2 font-mono">dist[to] = dist[u] + w(u,to)</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2">结果</td>
                <td class="px-3 py-2">最小生成树（无向图）</td>
                <td class="px-3 py-2">单源最短路径树</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2">图的限制</td>
                <td class="px-3 py-2">无向带权（负权也无妨）</td>
                <td class="px-3 py-2">边权须非负</td>
              </tr>
              <tr>
                <td class="px-3 py-2">复杂度</td>
                <td class="px-3 py-2 font-mono">O(V²) / O(E·logV)</td>
                <td class="px-3 py-2 font-mono">O(V²) / O(E·logV)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：用「最短路径」的直觉解释 Prim 的 dist</strong><br/>
          写注释时把 dist 写成「到起点的距离」，或者把松弛式写成 <code>dist[u] + w</code>，结果就是「最短路径树」。
          记住一句口诀：<strong>Dijkstra 加边权（累计距离），Prim 比边权（取最小）</strong>。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：不处理「图不连通」</strong><br/>
          朴素版扫描完仍可能选不出点（u === -1 或 dist[u] === ∞），堆优化版结束时入树顶点数不足 V——
          这时应返回「无 MST」而非一个残缺结果。连通分量 ≥ 2 时最小生成树不存在。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：Prim 从 A 出发逐步生长 MST
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          绿 = 已入树，橙 = 当前候选最小割边，蓝 = 新加入的顶点。节点下方的数字是 <strong>dist[v]</strong>（到生成树的最小边权，∞ 表示暂不可达）。
          观察每轮「选最小割边 → 新点入树 → 刷新 dist」的过程。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">✅ 已入树: {{ inTree.size }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">💰 累计权重: {{ totalW }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="runPrim" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">▶ Prim 生成 MST</button>
          <button @mousedown="doStep" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">⏭ 单步执行</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in gEdges" :key="'e'+e.from+e.to" :config="edgeCfg(e)" />
              <v-text v-for="e in gEdges" :key="'w'+e.from+e.to" :config="weightCfg(e)" />
              <v-circle v-for="n in gNodes" :key="'c'+n.id" :config="circleCfg(n)" />
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
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>本质</strong>：基于顶点的贪心，每轮在「树内/树外」割上挑最小边（切分定理保证正确性）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>dist[v]</strong>：树外顶点 v 到生成树的<strong>最小边权</strong>——不是到起点的距离，松弛取 <code>w</code> 而非 <code>dist[u]+w</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>朴素 O(V²)</strong>：邻接矩阵 + 线性扫 min，稠密图首选</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>堆优化 O(E·logV)</strong>：邻接表 + 小顶堆 + 懒删除，稀疏图友好</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>边界</strong>：图不连通时无 MST；起点任意；等权边可能产生多棵 MST 但总权重相同</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>与 Dijkstra</strong>：骨架相同、目标不同——一个求最小生成树，一个求单源最短路</span></li>
        </ul>
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-slate-600 border border-slate-200 rounded-lg overflow-hidden">
            <thead class="bg-slate-50 text-slate-500">
              <tr>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">版本</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">数据结构</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">时间复杂度</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">适用场景</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2 font-mono">朴素 Prim</td>
                <td class="px-3 py-2 font-mono">邻接矩阵</td>
                <td class="px-3 py-2 font-mono">O(V²)</td>
                <td class="px-3 py-2">稠密图</td>
              </tr>
              <tr>
                <td class="px-3 py-2 font-mono">堆优化 Prim</td>
                <td class="px-3 py-2 font-mono">邻接表 + 堆</td>
                <td class="px-3 py-2 font-mono">O(E·logV)</td>
                <td class="px-3 py-2">稀疏图 / 通用</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-3-shortest-path/dsa-6-3-5-a-star" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：A*搜索与启发式函数</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-4-mst/dsa-6-4-2-kruskal" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Kruskal算法：基于边的贪心+并查集 →</RouterLink>
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
  { id: "sec-1", name: "MST 定义与性质" },
  { id: "sec-2", name: "贪心思想" },
  { id: "sec-3", name: "朴素 O(V²)" },
  { id: "sec-4", name: "堆优化 O(E·logV)" },
  { id: "sec-5", name: "手算示例" },
  { id: "sec-6", name: "与 Dijkstra 对比" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

// ===== 🎬 Prim 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

interface GNode { id: string; label: string; fx: number; y: number; color: string }
interface GEdge { from: string; to: string; w: number; color: string; mst: boolean }

// 固定加权无向图（与结构总览一致）：6 节点 10 边，MST 总权重 15
const NPOS: Record<string, { fx: number; y: number }> = {
  A: { fx: 160/720, y: 60 },
  B: { fx: 80/720,  y: 165 },
  C: { fx: 320/720, y: 62 },
  D: { fx: 515/720, y: 152 },
  E: { fx: 205/720, y: 236 },
  F: { fx: 405/720, y: 232 },
}
const EDGES: [string, string, number][] = [
  ['A','B',6], ['A','C',1], ['A','D',5],
  ['B','C',5], ['B','E',3],
  ['C','D',5], ['C','E',6], ['C','F',4],
  ['D','F',2], ['E','F',6],
]

const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])
const inTree = reactive(new Set<string>())
const dist = reactive<Record<string, number>>({})
const totalW = ref(0)
const stepsDone = ref(0)

function px(n: GNode) { return n.fx * W.value }

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)          // ⚠️ 清空 reactive 数组必须用 splice(0)
  Object.entries(NPOS).forEach(([id, p]) => gNodes.push({ id, label: id, fx: p.fx, y: p.y, color: C.cyan }))
  EDGES.forEach(([a, b, w]) => gEdges.push({ from: a, to: b, w, color: '#94a3b8', mst: false }))
  inTree.clear(); inTree.add('A')
  gNodes.forEach(n => { dist[n.id] = Infinity })
  dist['A'] = 0
  for (const e of gEdges) {
    if (e.from === 'A' && !inTree.has(e.to)) dist[e.to] = e.w
    if (e.to === 'A' && !inTree.has(e.from)) dist[e.from] = e.w
  }
  totalW.value = 0; stepsDone.value = 0
  status.value = '起点 A 已入树（累计 0）'
}

function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function colorOf(id: string, c: string) { const n = pos(id); if (n) n.color = c }
function allCyan() { gNodes.forEach(n => n.color = C.cyan) }
function edgeCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { points: [px(a), a.y, px(b), b.y], stroke: e.color, strokeWidth: e.mst ? 4 : (e.color === '#94a3b8' ? 2 : 3), lineCap: 'round' }
}
function weightCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { x: (px(a)+px(b))/2, y: (a.y+b.y)/2 - 8, text: String(e.w), fontSize: 11, fontFamily: 'monospace', fontStyle: 'bold', fill: e.mst ? '#16a34a' : C.muted, align: 'center' }
}
function circleCfg(n: GNode) {
  const stroke = n.color===C.cyan ? '#0891b2' : n.color===C.orange ? '#d97706' : n.color===C.green ? '#16a34a' : n.color===C.red ? '#b91c1c' : '#2563eb'
  const sw = n.color===C.cyan ? 1.5 : 3
  return { x: px(n), y: n.y, radius: 22, fill: n.color, stroke, strokeWidth: sw, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function labelCfg(n: GNode) {
  return { x: px(n)-22, y: n.y-22, width: 44, height: 44, text: n.label, fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: '#fff', align: 'center', verticalAlign: 'middle' }
}
function distCfg(n: GNode) {
  const v = dist[n.id]
  return { x: px(n)-24, y: n.y+24, width: 48, height: 14, text: v === Infinity ? '∞' : String(v), fontSize: 10, fontFamily: 'monospace', fill: v === Infinity ? '#94a3b8' : C.text, align: 'center', verticalAlign: 'middle' }
}

// 执行一轮 Prim：找最小割边 → 新点入树 → 刷新 dist
async function primStep(): Promise<boolean> {
  let best: GEdge | null = null
  let bestNode = ''
  for (const e of gEdges) {
    const aIn = inTree.has(e.from), bIn = inTree.has(e.to)
    if (aIn !== bIn && (!best || e.w < best.w)) { best = e; bestNode = aIn ? e.to : e.from }
  }
  if (!best) {
    status.value = inTree.size === gNodes.length ? '🎉 MST 已完成（累计 ' + totalW.value + '）' : '⚠️ 图不连通，无法生成 MST'
    return false
  }
  // 1. 高亮候选：树内绿色，最小割边与目标点橙色
  allCyan()
  gNodes.forEach(n => { if (inTree.has(n.id)) n.color = C.green })
  best.color = C.orange
  colorOf(bestNode, C.orange)
  status.value = '候选最小边 ' + best.from + '—' + best.to + '（w=' + best.w + '）'
  await d(700)

  // 2. 新点入树：先蓝后绿，边变绿加粗
  inTree.add(bestNode)
  totalW.value += best.w
  stepsDone.value++
  best.color = '#16a34a'; best.mst = true
  colorOf(bestNode, C.blue); await d(420)
  colorOf(bestNode, C.green)

  // 3. 用新点的边刷新树外邻居的 dist
  for (const e of gEdges) {
    if (e.from === bestNode && !inTree.has(e.to) && e.w < dist[e.to]) dist[e.to] = e.w
    if (e.to === bestNode && !inTree.has(e.from) && e.w < dist[e.from]) dist[e.from] = e.w
  }
  status.value = '✅ 加入 ' + bestNode + '（w=' + best.w + '），累计 = ' + totalW.value + '，dist 已刷新'
  await d(620)
  return true
}

async function runPrim() {
  if (busy.value) return
  busy.value = true; opLabel.value = 'Prim O(E·logV)'
  try {
    while (stepsDone.value < gNodes.length - 1) {
      if (!(await primStep())) break
    }
    allCyan()
    gNodes.forEach(n => { if (inTree.has(n.id)) n.color = C.green })
    status.value = '🎉 MST 完成：累计权重 = ' + totalW.value + '（A-C、C-F、F-D、C-B、B-E）'
  } finally { await d(300); busy.value = false; opLabel.value = '' }
}

async function doStep() {
  if (busy.value) return
  busy.value = true; opLabel.value = '单步'
  try { await primStep() } finally { await d(200); busy.value = false; opLabel.value = '' }
}

function doReset() {
  initGraph()
  opLabel.value = ''
}

let ro: ResizeObserver | null = null
onMounted(() => {
  initGraph()
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 200) W.value = w })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const naiveCode = `// ===== 朴素 Prim：O(V²)，稠密图首选 =====
// 邻接矩阵 matrix[u][v] = 边权（无边记 Infinity）
// dist[v] = 树外顶点 v 到「当前生成树」的最小边权
function primNaive(n: number, matrix: number[][]): number {
    const inTree = new Array<boolean>(n).fill(false)  // 是否已加入生成树
    const dist = new Array<number>(n).fill(Infinity)  // 到树的最小边权
    const parent = new Array<number>(n).fill(-1)      // 生成树中每个点的父节点
    dist[0] = 0                                       // 任选顶点 0 作起点
    let total = 0

    for (let i = 0; i < n; i++) {
        // 1. 在树外顶点中找 dist 最小者（线性扫描）
        let u = -1
        for (let v = 0; v < n; v++) {
            if (!inTree[v] && (u === -1 || dist[v] < dist[u])) u = v
        }
        if (u === -1 || dist[u] === Infinity) return -1  // 图不连通，无 MST

        // 2. 把 u 收进生成树
        inTree[u] = true
        total += dist[u]

        // 3. 用 u 的边松弛树外邻居
        for (let v = 0; v < n; v++) {
            if (!inTree[v] && matrix[u][v] < dist[v]) {
                dist[v] = matrix[u][v]   // 注意：直接取边权，不是 dist[u] + w
                parent[v] = u
            }
        }
    }
    return total   // 最小生成树总权重
}

// 示例：A=0, B=1, C=2, D=3, E=4, F=5 的经典图
// 结果 total = 15，MST 边集 = {A-C, C-F, F-D, C-B, B-E}`

const heapCode = `// ===== 堆优化 Prim：O(E·logV)，稀疏图友好 =====
// 邻接表 adj[u] = [{ to, w }, ...]；小顶堆存 [权值, 顶点]

// 简易二叉小顶堆（完整实现见模块 5「堆」专题）
class MinHeap {
    private h: [number, number][] = []
    get size(): number { return this.h.length }
    push(x: [number, number]): void {
        this.h.push(x)
        let i = this.h.length - 1
        while (i > 0) {
            const p = (i - 1) >> 1
            if (this.h[p][0] <= this.h[i][0]) break
            ;[this.h[p], this.h[i]] = [this.h[i], this.h[p]]
            i = p
        }
    }
    pop(): [number, number] {
        const top = this.h[0]
        const last = this.h.pop()!
        if (this.h.length) {
            this.h[0] = last
            let i = 0
            while (true) {
                let m = i, l = i * 2 + 1, r = l + 1
                if (l < this.h.length && this.h[l][0] < this.h[m][0]) m = l
                if (r < this.h.length && this.h[r][0] < this.h[m][0]) m = r
                if (m === i) break
                ;[this.h[m], this.h[i]] = [this.h[i], this.h[m]]
                i = m
            }
        }
        return top
    }
}

function primHeap(n: number, adj: { to: number; w: number }[][]): number {
    const inTree = new Array<boolean>(n).fill(false)
    const dist = new Array<number>(n).fill(Infinity)
    dist[0] = 0
    const heap = new MinHeap()
    heap.push([0, 0])
    let total = 0

    while (heap.size > 0) {
        const [d, u] = heap.pop()
        // 懒删除：已入树或过期的旧条目直接丢弃
        if (inTree[u] || d > dist[u]) continue
        inTree[u] = true
        total += d

        for (const { to, w } of adj[u]) {
            if (!inTree[to] && w < dist[to]) {
                dist[to] = w
                heap.push([w, to])   // 可能残留旧条目，靠上面的 continue 过滤
            }
        }
    }
    return total
}

// 稀疏图 E≈V：O(E·logV)；稠密图 E≈V²：反而比朴素 O(V²) 慢，慎用`

const edgesCode = `// ===== 收集 MST 边集：布线场景要的是「具体哪几条线」 =====
// MinHeap 见上一个代码块
interface MstEdge { from: number; to: number; w: number }

function primEdges(n: number, adj: { to: number; w: number }[][]): MstEdge[] {
    const inTree = new Array<boolean>(n).fill(false)
    const dist = new Array<number>(n).fill(Infinity)
    const parent = new Array<number>(n).fill(-1)
    const heap = new MinHeap()
    dist[0] = 0
    heap.push([0, 0])
    const mst: MstEdge[] = []

    while (heap.size > 0 && mst.length < n - 1) {
        const [d, u] = heap.pop()
        if (inTree[u] || d > dist[u]) continue
        inTree[u] = true
        // 被选中的 u 是通过边 (parent[u], u) 入树的，记下这条边
        if (parent[u] !== -1) mst.push({ from: parent[u], to: u, w: d })

        for (const { to, w } of adj[u]) {
            if (!inTree[to] && w < dist[to]) {
                dist[to] = w
                parent[to] = u
                heap.push([w, to])
            }
        }
    }
    return mst   // mst.length < n-1 说明图不连通（无 MST）
}

// 应用：城市电网/局域网布线 —— 报告「铺哪几条线、总造价多少」，
// 而不只是总权重一个数字`
</script>
