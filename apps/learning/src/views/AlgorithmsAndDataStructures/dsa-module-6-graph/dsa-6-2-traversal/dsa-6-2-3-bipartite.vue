<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🎨 二分图判定与最大匹配(匈牙利算法)</h1>
          <p class="text-sm text-slate-500 mt-1">两种颜色就能染完的图，藏着「匹配」的奥妙</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-2-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：两列节点 + 红蓝染色 + 匹配边
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>二分图</strong> = 顶点分成左右两列（左部 U / 右部 V），所有边只连接 U 与 V。
          左边图展示<strong>染色结果</strong>：红蓝两色交替，任意边两端颜色不同 ⇔ 是二分图。
          右边两张图演示<strong>匈牙利算法</strong>：从空匹配出发，不断找「增广路」并取反，最终得到覆盖全部节点的<strong>完美匹配</strong>（3 条绿色匹配边）。
        </p>
        <figure class="mb-4">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <line x1="130" y1="60" x2="580" y2="60" stroke="#94a3b8" stroke-width="2" />
            <line x1="130" y1="60" x2="580" y2="145" stroke="#94a3b8" stroke-width="2" />
            <line x1="130" y1="145" x2="580" y2="60" stroke="#94a3b8" stroke-width="2" />
            <line x1="130" y1="145" x2="580" y2="230" stroke="#94a3b8" stroke-width="2" />
            <line x1="130" y1="230" x2="580" y2="145" stroke="#94a3b8" stroke-width="2" />
            <line x1="130" y1="230" x2="580" y2="230" stroke="#94a3b8" stroke-width="2" />

            <text x="130" y="20" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b91c1c">左部 U（任务）</text>
            <text x="580" y="20" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#2563eb">右部 V（工人）</text>

            <circle cx="130" cy="60" r="22" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
            <text x="130" y="60" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">u1</text>
            <circle cx="130" cy="145" r="22" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
            <text x="130" y="145" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">u2</text>
            <circle cx="130" cy="230" r="22" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
            <text x="130" y="230" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">u3</text>

            <circle cx="580" cy="60" r="22" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
            <text x="580" y="60" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">v1</text>
            <circle cx="580" cy="145" r="22" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
            <text x="580" y="145" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">v2</text>
            <circle cx="580" cy="230" r="22" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
            <text x="580" y="230" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">v3</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：二分图染色结果 —— 左部全部红色、右部全部蓝色，每条边的两端颜色都不同（红↔蓝），因此它是二分图。</figcaption>
        </figure>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <figure>
            <svg viewBox="0 0 340 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="170" y="16" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">Before：匹配为空，L2 尝试匹配</text>
              <line x1="85" y1="60" x2="260" y2="60" stroke="#94a3b8" stroke-width="2" />
              <line x1="85" y1="60" x2="260" y2="150" stroke="#94a3b8" stroke-width="2" />
              <line x1="85" y1="150" x2="260" y2="60" stroke="#94a3b8" stroke-width="2" />
              <line x1="85" y1="150" x2="260" y2="230" stroke="#94a3b8" stroke-width="2" />
              <line x1="85" y1="230" x2="260" y2="150" stroke="#94a3b8" stroke-width="2" />
              <line x1="85" y1="230" x2="260" y2="230" stroke="#94a3b8" stroke-width="2" />
              <circle cx="85" cy="60" r="20" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
              <text x="85" y="60" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">u1</text>
              <circle cx="85" cy="150" r="20" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" />
              <text x="85" y="150" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">u2</text>
              <circle cx="85" cy="230" r="20" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
              <text x="85" y="230" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">u3</text>
              <circle cx="260" cy="60" r="20" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
              <text x="260" y="60" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">v1</text>
              <circle cx="260" cy="150" r="20" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
              <text x="260" y="150" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">v2</text>
              <circle cx="260" cy="230" r="20" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
              <text x="260" y="230" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">v3</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">Before：还没有任何匹配边（全部灰色），橙色 u2 正在尝试第一个右部邻居。</figcaption>
          </figure>
          <figure>
            <svg viewBox="0 0 340 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="170" y="16" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">After：完美匹配（3 条绿色匹配边）</text>
              <line x1="85" y1="60" x2="260" y2="60" stroke="#4ade80" stroke-width="3.5" />
              <line x1="85" y1="60" x2="260" y2="150" stroke="#e2e8f0" stroke-width="2" />
              <line x1="85" y1="150" x2="260" y2="60" stroke="#e2e8f0" stroke-width="2" />
              <line x1="85" y1="150" x2="260" y2="230" stroke="#4ade80" stroke-width="3.5" />
              <line x1="85" y1="230" x2="260" y2="150" stroke="#4ade80" stroke-width="3.5" />
              <line x1="85" y1="230" x2="260" y2="230" stroke="#e2e8f0" stroke-width="2" />
              <circle cx="85" cy="60" r="20" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
              <text x="85" y="60" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">u1</text>
              <circle cx="85" cy="150" r="20" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
              <text x="85" y="150" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">u2</text>
              <circle cx="85" cy="230" r="20" fill="#ef4444" stroke="#b91c1c" stroke-width="2" />
              <text x="85" y="230" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">u3</text>
              <circle cx="260" cy="60" r="20" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
              <text x="260" y="60" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">v1</text>
              <circle cx="260" cy="150" r="20" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
              <text x="260" y="150" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">v2</text>
              <circle cx="260" cy="230" r="20" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
              <text x="260" y="230" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">v3</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">After：完美匹配 u1↔v1、u2↔v3、u3↔v2 —— 每个左部/右部节点都被一条匹配边覆盖。</figcaption>
          </figure>
        </div>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          二分图定义与性质
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>二分图（Bipartite Graph）</strong>：顶点集可以划分成两个不相交的子集 U 和 V，使得<strong>每条边都连接 U 与 V</strong>（U 内部、V 内部都没有边）。
          它等价于「<strong>可以用两种颜色给所有顶点染色，且相邻顶点颜色不同</strong>」。
        </p>
        <ul class="space-y-2 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>性质 1：</strong>二分图 ⇔ 可二染色 ⇔ <strong>没有奇环</strong>（长度为奇数的环）</li>
          <li><strong>性质 2：</strong>树、偶环、完全二分图 K<sub>m,n</sub> 都是二分图；三角形 K<sub>3</sub> 不是</li>
          <li><strong>性质 3：</strong>二分图上的「最大匹配」问题有高效算法（匈牙利算法，O(V·E)），而一般图最大匹配（开花算法）复杂得多</li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <strong>「任务-工人」分配表</strong>（每个任务只能由会做它的工人完成）、<strong>「用户-商品」推荐二部图</strong>（用户与商品之间才可能有边）、<strong>课程-教室排课</strong>（课程与时段/教室之间才可能有边）——这些都是天然的二分图建模。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          染色法判定（BFS / DFS 二染色）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          用 BFS（或 DFS）给图染色：起点染 0，邻居必须染 1，再邻居必须染 0……
          如果过程中发现<strong>相邻两个节点被染成同色</strong>，说明存在奇环，图不是二分图。
        </p>
        <ol class="space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>1.</strong> 遍历所有节点（外层循环，处理不连通的情况），未染色就设为起点</li>
          <li><strong>2.</strong> 起点染 0，入队</li>
          <li><strong>3.</strong> 出队 u：每个未染色的邻居染 1−color[u]；已染色的邻居若与 u 同色 → 返回 false</li>
          <li><strong>4.</strong> 全部染色完成无冲突 → 是二分图</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="isBipartiteCode" title="is-bipartite.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <strong>座位安排</strong>（朋友之间不能坐同桌 → 社交关系图的二染色）、<strong>广告位冲突检测</strong>（互斥的广告不能同屏）、<strong>编译器寄存器分配</strong>（冲突图二染色）——都是「能不能用两色染完」的问题。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：忘记外层循环。</strong><br/>
          图可能不连通（多个分量）。只从一个起点 BFS，其他分量的节点根本没被染色，冲突检测也会漏掉。必须遍历所有节点作为起点兜底。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          匈牙利算法：增广路思想（邻接矩阵版）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>匹配</strong> = 一组互不相邻（不共享端点）的边。<strong>最大匹配</strong> = 边数最多的匹配。
          匈牙利算法的核心是<strong>增广路</strong>：一条「从未匹配左部点出发，交替经过未匹配边、匹配边，终点是未匹配右部点」的路径。
          把增广路上的<strong>匹配/未匹配状态取反</strong>，匹配边数就 +1。不断找增广路直到找不到，就是最大匹配。
        </p>
        <ol class="space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>1.</strong> 从空匹配开始，依次为每个左部点 u 寻找匹配</li>
          <li><strong>2.</strong> 对 u 的每个右部邻居 v：v 空闲 → 直接匹配；v 已被 u' 占据 → 递归尝试给 u' 重新找匹配（本轮已试过的右部点标记 seen，防止死循环）</li>
          <li><strong>3.</strong> 递归成功 → 取反增广路，匹配数 +1</li>
          <li><strong>4.</strong> 所有左部点处理完，匹配数即最大匹配</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="hungarianMatrixCode" title="hungarian-matrix.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          像<strong>相亲配对</strong>：先尽量给每个人找对象；某人看中的对象已有主时，就试着让「现任」换一个——现任换成功了，新人上位，配对总数 +1。也像<strong>双十一优惠券与商品匹配</strong>：让每张券尽量兑换到商品，必要时把已占用的商品「腾」给更合适的券。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：seen 数组写成全局共享。</strong><br/>
          <code>seen</code>（本轮已尝试的右部点）必须在<strong>每个左部点开始新一轮时重置</strong>。全局共享会让递归提前「放弃」某些右部点，错过增广路，得到错误的最大匹配。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          邻接表版匈牙利算法与复杂度
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          稀疏图（边少）用<strong>邻接表</strong>更好：每个左部点只遍历它实际存在的边，复杂度从 O(n³) 降到 O(V·E)。
          还可以用 <code>matchL</code> 数组同时记录左部点的匹配对象，方便输出完整匹配方案。
        </p>
        <div class="mb-4"><Code language="ts" :code="hungarianListCode" title="hungarian-list.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">算法</th><th class="px-4 py-2 border border-slate-200 font-semibold">时间复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold">空间复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold">适用</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">染色判定（BFS/DFS）</td><td class="px-4 py-2 border">O(V+E)</td><td class="px-4 py-2 border">O(V)</td><td class="px-4 py-2 border">任意图</td></tr>
              <tr><td class="px-4 py-2 border">匈牙利（邻接矩阵）</td><td class="px-4 py-2 border">O(n³)</td><td class="px-4 py-2 border">O(n²)</td><td class="px-4 py-2 border">稠密小图</td></tr>
              <tr><td class="px-4 py-2 border">匈牙利（邻接表）</td><td class="px-4 py-2 border">O(V·E)</td><td class="px-4 py-2 border">O(V+E)</td><td class="px-4 py-2 border">稀疏图（推荐）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>先<strong>染色判定</strong>确认是二分图（O(V+E)），再用<strong>匈牙利算法</strong>求最大匹配；稀疏图用邻接表版。输出完整方案时维护 <code>matchL</code> 与 <code>matchR</code> 两个数组。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          常见错误
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：染色时把「已染色且异色」也当成冲突。</strong><br/>
          邻居已染色且颜色<strong>不同</strong>是正常的（这正是期望），只有<strong>同色</strong>才是冲突。判定条件写反会误报「不是二分图」。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：匈牙利算法忘记递归「现任」重匹配。</strong><br/>
          看到 v 已被占据就直接跳过 → 得到的是<strong>贪心匹配</strong>而不是最大匹配。必须递归尝试 <code>tryKuhn(matchR[v])</code>，这就是「增广路」的由来。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：把匈牙利算法用在非二分图上。</strong><br/>
          匈牙利算法依赖二分图结构（左右部 + seen 的简化假设）。非二分图求最大匹配需要<strong>开花算法（Blossom）</strong>，复杂度高得多。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆口诀：</strong>「<strong>染色判二分，增广找最大</strong>」——冲突即奇环；每轮 seen 重置，占据就递归让位。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：染色判定 与 匈牙利匹配
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          「染色判定」用 BFS 给左右两列交替染红/蓝；「匈牙利匹配」为每个左部点找增广路：
          尝试的边🟠，匹配成功边🟢，被让位的旧匹配边恢复灰色。观察 u2 让位、u1 换配、最终 3 条匹配边的完整过程。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doColoring" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">🎨 染色判定</button>
          <button @mousedown="doHungarian" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">💞 匈牙利匹配</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-text :config="{x:30, y:8, text:'左部 U（任务）', fontSize:11, fontFamily:'monospace', fill:C.red, fontStyle:'bold'}" />
              <v-text :config="{x:Math.max(W-150, 520), y:8, text:'右部 V（工人）', fontSize:11, fontFamily:'monospace', fill:C.blue, fontStyle:'bold'}" />
              <v-line v-for="e in gEdges" :key="e.from+'-'+e.to" :config="edgeCfg(e)" />
              <v-circle v-for="n in gNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in gNodes" :key="'t'+n.id" :config="labelCfg(n)" />
            </v-layer>
          </v-stage>
        </div>
        <p class="text-xs text-slate-400 mt-2">🟠 正在尝试 &nbsp; 🟢 匹配成功（匹配边加粗变绿）&nbsp; 🔴 左部 / 🔵 右部</p>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>二分图</strong>：顶点分 U/V 两列，边只跨列；⇔ 可二染色 ⇔ 无奇环</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>染色判定</strong>：BFS/DFS 交替染 0/1，相邻同色 = 冲突 = 不是二分图（O(V+E)）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>匈牙利算法</strong>：增广路取反，匹配数 +1，直到找不到增广路</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>每轮 <code>seen</code> 重置；被占则<strong>递归让现任重配</strong>；稀疏图用邻接表版 O(V·E)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>工程类比：任务-工人分配、用户-商品推荐、相亲配对、排课表</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-2-traversal/dsa-6-2-2-bfs" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：BFS：最短路径(无权)、层序遍历</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-2-traversal/dsa-6-2-4-topo-sort" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：拓扑排序：Kahn算法/DFS后序, AOV网 →</RouterLink>
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
  { id: "sec-1", name: "二分图定义与性质" },
  { id: "sec-2", name: "染色法判定" },
  { id: "sec-3", name: "匈牙利算法（邻接矩阵）" },
  { id: "sec-4", name: "邻接表版与复杂度" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ================= 代码示例 =================
const isBipartiteCode = `// ===== 二分图判定：BFS 二染色 =====
// 用 0 和 1 两种颜色，相邻节点必须异色
function isBipartite(g: Record<string, string[]>): boolean {
  const color: Record<string, number> = {}
  const queue: string[] = []

  for (const start of Object.keys(g)) {   // 外层循环：图可能不连通
    if (color[start] !== undefined) continue
    color[start] = 0
    queue.push(start)

    while (queue.length) {
      const u = queue.shift()!
      for (const v of g[u] ?? []) {
        if (color[v] === undefined) {
          color[v] = 1 - color[u]         // 邻居染相反色
          queue.push(v)
        } else if (color[v] === color[u]) {
          return false                    // 相邻同色 = 有奇环 = 不是二分图
        }
      }
    }
  }
  return true
}
// 判定 U1/V1 那张图 => true（可二染色）`

const hungarianMatrixCode = `// ===== 匈牙利算法：邻接矩阵版（O(n^3)） =====
// matchR[j] = 右部第 j 个点匹配的左部点下标，-1 表示未匹配
function hungarianMatrix(n: number, m: number, adj: boolean[][]): number {
  const matchR = new Array(m).fill(-1)
  let result = 0

  // 尝试为左部点 u 找匹配（增广路搜索）
  function tryKuhn(u: number, seen: boolean[]): boolean {
    for (let v = 0; v < m; v++) {
      if (!adj[u][v] || seen[v]) continue
      seen[v] = true                      // 本轮已尝试，防死循环
      if (matchR[v] === -1 || tryKuhn(matchR[v], seen)) {
        matchR[v] = u                     // v 空闲 或 现任让位成功 → 增广
        return true
      }
    }
    return false
  }

  for (let u = 0; u < n; u++) {
    const seen = new Array(m).fill(false) // 每轮重置 seen！
    if (tryKuhn(u, seen)) result++
  }
  return result
}
// 核心：增广路 = 未匹配边/匹配边交替、两端都未匹配的路径，取反后匹配数 +1`

const hungarianListCode = `// ===== 匈牙利算法：邻接表版（稀疏图更快 O(V*E)） =====
function hungarianList(
  n: number,             // 左部点数
  m: number,             // 右部点数
  adjList: number[][],   // adjList[u] = u 的右部邻居下标
): { count: number; matchL: number[] } {
  const matchR = new Array(m).fill(-1)
  const matchL = new Array(n).fill(-1)    // 额外记录左部匹配，方便输出方案
  let count = 0

  function tryKuhn(u: number, seen: boolean[]): boolean {
    for (const v of adjList[u]) {         // 只遍历真实存在的边
      if (seen[v]) continue
      seen[v] = true
      if (matchR[v] === -1 || tryKuhn(matchR[v], seen)) {
        matchR[v] = u
        matchL[u] = v
        return true
      }
    }
    return false
  }

  for (let u = 0; u < n; u++) {
    if (tryKuhn(u, new Array(m).fill(false))) count++
  }
  return { count, matchL }
}
// 应用：任务-工人分配、课程-教室排课、用户-商品推荐`

// ================= 🎬 图动画 =================
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(360), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

interface GNode { id: string; label: string; x: number; y: number; color: string; dist?: number | null }
interface GEdge { from: string; to: string; w: number; color: string }
const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])

const adj: Record<string, string[]> = {
  L1: ['R1','R2'], L2: ['R1','R3'], L3: ['R2','R3'],
  R1: ['L1','L2'], R2: ['L1','L3'], R3: ['L2','L3'],
}

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)
  ;[
    {id:'L1',label:'L1',x:120,y:80,color:C.cyan},
    {id:'L2',label:'L2',x:120,y:180,color:C.cyan},
    {id:'L3',label:'L3',x:120,y:280,color:C.cyan},
    {id:'R1',label:'R1',x:580,y:70,color:C.cyan},
    {id:'R2',label:'R2',x:580,y:170,color:C.cyan},
    {id:'R3',label:'R3',x:580,y:270,color:C.cyan},
  ].forEach(n => gNodes.push({ ...n }))
  ;[
    {from:'L1',to:'R1',w:1,color:'#94a3b8'},
    {from:'L1',to:'R2',w:1,color:'#94a3b8'},
    {from:'L2',to:'R1',w:1,color:'#94a3b8'},
    {from:'L2',to:'R3',w:1,color:'#94a3b8'},
    {from:'L3',to:'R2',w:1,color:'#94a3b8'},
    {from:'L3',to:'R3',w:1,color:'#94a3b8'},
  ].forEach(e => gEdges.push({ ...e }))
}
function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function edgeCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { points:[a.x, a.y, b.x, b.y], stroke:e.color, strokeWidth: e.color==='#94a3b8' ? 2 : e.color===C.orange ? 3 : 3.5 }
}
function circleCfg(n: GNode) {
  const stroke = n.color===C.cyan ? '#0891b2' : n.color===C.orange ? '#d97706' : n.color===C.green ? '#16a34a' : n.color===C.red ? '#b91c1c' : n.color===C.blue ? '#2563eb' : '#64748b'
  const sw = n.color===C.cyan ? 1.5 : 3
  return { x:n.x, y:n.y, radius:22, fill:n.color, stroke, strokeWidth:sw, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
}
function labelCfg(n: GNode) {
  return { x:n.x-22, y:n.y-22, width:44, height:44, text:n.label, fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle' }
}
function resetGraph() {
  gNodes.forEach(n => { n.color = C.cyan })
  gEdges.forEach(e => { e.color = '#94a3b8' })
}
async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false }
}

function doReset() { resetGraph(); status.value = ''; opLabel.value = '' }

// ---- 染色判定（BFS 二染色） ----
async function doColoring() {
  await act('染色判定', '染色法（BFS 二染色）', async () => {
    resetGraph()
    const color: Record<string, number> = {}
    const queue: string[] = ['L1']
    color['L1'] = 0
    pos('L1').color = C.red
    status.value = 'L1 染红色（0）'
    await d(450)
    let ok = true
    while (queue.length && ok) {
      const u = queue.shift()!
      const cu = color[u]
      for (const v of adj[u]) {
        if (color[v] === undefined) {
          color[v] = 1 - cu
          pos(v).color = color[v] === 0 ? C.red : C.blue
          queue.push(v)
          status.value = v + ' 染' + (color[v] === 0 ? '红色' : '蓝色') + '（与 ' + u + ' 相反）'
          await d(380)
        } else if (color[v] === cu) {
          ok = false
          pos(u).color = C.orange; pos(v).color = C.orange
          status.value = '⚠️ 冲突：' + u + ' 与 ' + v + ' 同色 → 不是二分图'
          await d(700)
        }
      }
    }
    if (ok) status.value = '✅ 染色成功：任意边两端颜色不同 → 是二分图（等价于无奇环）'
  })
}

// ---- 匈牙利算法（增广路） ----
async function doHungarian() {
  await act('匈牙利匹配', '匈牙利算法（增广路）', async () => {
    resetGraph()
    const matchR: Record<string, string | null> = { R1: null, R2: null, R3: null }
    const matchL: Record<string, string | null> = { L1: null, L2: null, L3: null }
    let matched = 0

    async function tryKuhn(l: string, seen: Set<string>): Promise<boolean> {
      const ln = pos(l)
      ln.color = C.orange
      for (const r of adj[l]) {
        if (seen.has(r)) continue
        seen.add(r)
        const rn = pos(r)
        const e = gEdges.find(e2 => (e2.from===l && e2.to===r) || (e2.from===r && e2.to===l))!
        const occ = matchR[r]
        e.color = C.orange
        rn.color = C.orange
        status.value = l + ' 尝试 ' + r + (occ ? '（已被 ' + occ + ' 占据）' : '（空闲）')
        await d(420)
        if (!occ || await tryKuhn(occ, seen)) {
          if (occ) {
            const old = gEdges.find(e2 => (e2.from===occ && e2.to===r) || (e2.from===r && e2.to===occ))!
            old.color = '#94a3b8'
            status.value = occ + ' 让出 ' + r + '，递归寻找新的空闲右部'
            await d(350)
          }
          matchR[r] = l
          matchL[l] = r
          e.color = C.green
          rn.color = C.blue
          ln.color = C.red
          status.value = '✅ 匹配 ' + l + ' ↔ ' + r
          await d(500)
          return true
        } else {
          e.color = '#94a3b8'
          rn.color = C.cyan
          status.value = r + ' 无法增广，换下一个邻居'
          await d(320)
        }
      }
      ln.color = C.cyan
      return false
    }

    for (const l of ['L1','L2','L3']) {
      status.value = '== 为 ' + l + ' 寻找增广路 =='
      await d(420)
      if (await tryKuhn(l, new Set<string>())) matched++
      else status.value = l + ' 无法匹配'
      await d(300)
    }
    status.value = '最大匹配数 = ' + matched + '（完美匹配，覆盖全部左部节点）'
    opLabel.value = '匹配数 ' + matched
  })
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
</script>
