<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌊 BFS：最短路径(无权)、层序遍历</h1>
          <p class="text-sm text-slate-500 mt-1">一圈一圈往外扩 —— 广度优先搜索</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-2-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：一圈一圈往外扩
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          BFS 用<strong>队列</strong>按「层」扩展：先访问起点（第 0 层），再访问它所有邻居（第 1 层），然后是邻居的邻居（第 2 层）……
          节点下方是 <strong>dist（距离起点的最少步数）</strong>，橙色数字是访问次序。BFS 的天然性质：<strong>第一次遇到某个节点时，走的路径一定最短</strong>（无权图）。
          图中绿色加粗的 S→A→B→C→G 就是 S 到 G 的最短路径（4 步）。
        </p>
        <figure class="mb-4">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <line x1="90" y1="70" x2="240" y2="60" stroke="#4ade80" stroke-width="3" />
            <line x1="90" y1="70" x2="140" y2="205" stroke="#94a3b8" stroke-width="2" />
            <line x1="240" y1="60" x2="390" y2="60" stroke="#4ade80" stroke-width="3" />
            <line x1="240" y1="60" x2="310" y2="215" stroke="#94a3b8" stroke-width="2" />
            <line x1="390" y1="60" x2="540" y2="70" stroke="#4ade80" stroke-width="3" />
            <line x1="390" y1="60" x2="480" y2="215" stroke="#94a3b8" stroke-width="2" />
            <line x1="540" y1="70" x2="620" y2="195" stroke="#4ade80" stroke-width="3" />
            <line x1="140" y1="205" x2="310" y2="215" stroke="#94a3b8" stroke-width="2" />
            <line x1="310" y1="215" x2="480" y2="215" stroke="#94a3b8" stroke-width="2" />
            <line x1="480" y1="215" x2="620" y2="195" stroke="#94a3b8" stroke-width="2" />

            <circle cx="90" cy="70" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="90" y="70" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">S</text>
            <text x="90" y="42" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">①</text>
            <text x="90" y="108" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">dist=0</text>

            <circle cx="240" cy="60" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="240" y="60" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <text x="240" y="32" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">②</text>
            <text x="240" y="98" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">dist=1</text>

            <circle cx="390" cy="60" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="390" y="60" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <text x="390" y="32" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">④</text>
            <text x="390" y="98" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">dist=2</text>

            <circle cx="540" cy="70" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="540" y="70" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <text x="540" y="42" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑥</text>
            <text x="540" y="108" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">dist=3</text>

            <circle cx="140" cy="205" r="22" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
            <text x="140" y="205" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">D</text>
            <text x="140" y="177" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">③</text>
            <text x="140" y="243" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">dist=1</text>

            <circle cx="310" cy="215" r="22" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
            <text x="310" y="215" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">E</text>
            <text x="310" y="187" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑤</text>
            <text x="310" y="253" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">dist=2</text>

            <circle cx="480" cy="215" r="22" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
            <text x="480" y="215" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">F</text>
            <text x="480" y="187" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑦</text>
            <text x="480" y="253" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">dist=3</text>

            <circle cx="620" cy="195" r="22" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" />
            <text x="620" y="195" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">G</text>
            <text x="620" y="167" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑧</text>
            <text x="620" y="233" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">dist=4</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：BFS 从 S 出发按层扩散，访问次序 S→A→D→B→E→C→F→G；dist 标注层数（最少步数）。绿色边 = 最短路径 S→A→B→C→G（4 步）。</figcaption>
        </figure>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <figure>
            <svg viewBox="0 0 340 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="170" y="18" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">Before：出队 S（橙色）</text>
              <line x1="90" y1="110" x2="230" y2="60" stroke="#94a3b8" stroke-width="2" />
              <line x1="90" y1="110" x2="230" y2="170" stroke="#94a3b8" stroke-width="2" />
              <circle cx="90" cy="110" r="20" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="90" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">S</text>
              <text x="90" y="146" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">dist=0</text>
              <circle cx="230" cy="60" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 3" />
              <text x="230" y="60" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">A</text>
              <circle cx="230" cy="170" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 3" />
              <text x="230" y="170" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">D</text>
              <rect x="28" y="196" width="86" height="30" rx="6" fill="#06b6d4" />
              <text x="71" y="211" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">队列: [S]</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">Before：队列 [S]，S 出队准备扩展，邻居 A/D 尚未访问（虚线）。</figcaption>
          </figure>
          <figure>
            <svg viewBox="0 0 340 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="bf-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
              </defs>
              <text x="170" y="18" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">After：A、D 入队，dist=1</text>
              <line x1="90" y1="110" x2="230" y2="60" stroke="#4ade80" stroke-width="3" />
              <line x1="90" y1="110" x2="230" y2="170" stroke="#4ade80" stroke-width="3" />
              <circle cx="90" cy="110" r="20" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="90" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">S</text>
              <text x="90" y="146" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">dist=0</text>
              <circle cx="230" cy="60" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="230" y="60" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <text x="230" y="98" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">dist=1</text>
              <circle cx="230" cy="170" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="230" y="170" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
              <text x="230" y="208" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">dist=1</text>
              <rect x="28" y="196" width="118" height="30" rx="6" fill="#06b6d4" />
              <text x="87" y="211" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">队列: [A, D]</text>
              <line x1="196" y1="182" x2="148" y2="199" stroke="#f59e0b" stroke-width="2" marker-end="url(#bf-arr)" />
              <text x="200" y="172" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#f59e0b">队头</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">After：S 标记已访问（绿），邻居 A、D 入队并标注 dist=1 —— 队头 A 下一个出队。</figcaption>
          </figure>
        </div>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          BFS 思想与队列实现
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          广度优先搜索（Breadth-First Search）用<strong>先进先出的队列</strong>保证「先来先扩展」：
          起点先入队；循环<strong>出队</strong>队头、访问它、把<strong>未访问的邻居入队</strong>。
          因为队列 FIFO，同一层的节点总是先于下一层被出队，所以天然按「层」推进。
        </p>
        <ol class="space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>1.</strong> 起点入队并标记 visited</li>
          <li><strong>2.</strong> 出队队头 u，访问 u</li>
          <li><strong>3.</strong> u 的所有未访问邻居入队并标记（入队即标记，防重复）</li>
          <li><strong>4.</strong> 队列空 → 遍历完成</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="bfsCode" title="bfs.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          往水面扔石头，<strong>涟漪一圈一圈往外扩</strong>就是 BFS。<strong>网页加载资源</strong>时浏览器也倾向按层调度（首屏先渲染、再按需加载更深层的资源）；社交网络的<strong>「六度人脉」</strong>正是从你出发做 6 层 BFS。CSS 选择器的<strong>层叠/继承</strong>也常被理解为逐层扩散。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：出队时才标记 visited。</strong><br/>
          图有环时（如 S-A-B-A），A 入队后还没出队，B 又把它入队一次——同一节点重复入队，可能无限增长。正确做法是<strong>入队的那一刻就标记</strong>。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          层序遍历：按层分组输出
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          很多场景需要「知道每一层有哪些节点」：用<strong>frontier（当前层集合）</strong>代替单个队列，
          每轮把 frontier 中所有节点展开成 next 层，一层一层收集。这也是「多源 BFS」「BFS 扩散模拟」的基础。
        </p>
        <div class="mb-4"><Code language="ts" :code="levelOrderCode" title="bfs-level.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <strong>Vue 组件树按层渲染</strong>（先渲染兄弟组件，再往下渲染嵌套子组件）、<strong>懒加载</strong>按层调度资源、论坛「广播扩散到 N 层好友」——都是层序遍历。DOM 的 <code>querySelectorAll</code> 在语义上也是按文档树逐层匹配。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          无权图最短路径：dist 数组 + parent 回溯
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          BFS 的核心定理：<strong>第一次「发现」节点 v 时，从起点到 v 的路径就是最短路径</strong>（无权图，所有边权为 1）。
          记录两个辅助数组：<code>dist[v]</code>（起点到 v 的最少步数）、<code>parent[v]</code>（v 由谁首次发现）。
          找到目标后沿着 parent<strong>从目标回溯到起点</strong>，反转即得完整路径。
        </p>
        <ol class="space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>1.</strong> dist[S]=0，S 入队</li>
          <li><strong>2.</strong> 出队 u；对每个未访问邻居 v：dist[v]=dist[u]+1，parent[v]=u，入队</li>
          <li><strong>3.</strong> 队列空时所有节点 dist 已确定</li>
          <li><strong>4.</strong> 从 target 沿 parent 回溯，reverse 得到路径</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="shortestPathCode" title="bfs-shortest-path.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          「<strong>最少点击次数</strong>到达某个页面」「<strong>最短的依赖链</strong>从入口到某个 chunk」「地图上最少换乘」——这类「步数最少」的问题在无权图里都归约到 BFS。路由的 <code>to</code> 解析、<strong>构建工具的依赖图分析</strong>也常用 BFS 做层分析。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：把 BFS 用到带权图上。</strong><br/>
          边权不同时（如 A→B 代价 1、A→C 代价 9），BFS 的「先发现即最短」不成立。带权最短路必须用 Dijkstra（6-3-1）或 SPFA/Bellman-Ford（6-3-2/6-3-4）。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          BFS vs DFS 对比
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold">BFS（队列）</th><th class="px-4 py-2 border border-slate-200 font-semibold">DFS（栈/递归）</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">数据结构</td><td class="px-4 py-2 border">先进先出队列 FIFO</td><td class="px-4 py-2 border">后进先出栈 LIFO / 递归</td></tr>
              <tr><td class="px-4 py-2 border">遍历顺序</td><td class="px-4 py-2 border">按层扩散（先广后深）</td><td class="px-4 py-2 border">一条路走到底（先深后广）</td></tr>
              <tr><td class="px-4 py-2 border">无权最短路</td><td class="px-4 py-2 border text-emerald-600">✅ 第一次发现即最短</td><td class="px-4 py-2 border text-red-600">❌ 不行</td></tr>
              <tr><td class="px-4 py-2 border">空间（稠密图）</td><td class="px-4 py-2 border text-amber-600">O(V)（队列可能很大）</td><td class="px-4 py-2 border text-emerald-600">O(最长路径) 通常更小</td></tr>
              <tr><td class="px-4 py-2 border">典型应用</td><td class="px-4 py-2 border">最短路、层序、二分图染色</td><td class="px-4 py-2 border">连通分量、拓扑排序、环检测</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>要「<strong>步数/层数</strong>」用 BFS（队列），要「<strong>路径/深度/分量</strong>」用 DFS（栈）。两者复杂度都是 O(V+E)。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          复杂度分析与常见错误
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">操作</th><th class="px-4 py-2 border border-slate-200 font-semibold">时间复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold">空间复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">BFS 遍历</td><td class="px-4 py-2 border">O(V+E)</td><td class="px-4 py-2 border">O(V)</td><td class="px-4 py-2 border">每个顶点入队一次，每条边看一次</td></tr>
              <tr><td class="px-4 py-2 border">层序遍历</td><td class="px-4 py-2 border">O(V+E)</td><td class="px-4 py-2 border">O(V)</td><td class="px-4 py-2 border">frontier 逐层收集</td></tr>
              <tr><td class="px-4 py-2 border">无权最短路</td><td class="px-4 py-2 border">O(V+E)</td><td class="px-4 py-2 border">O(V)</td><td class="px-4 py-2 border">dist + parent 数组</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：JS 的 <code>queue.shift()</code> 是 O(n)。</strong><br/>
          数组头部出队会让后面所有元素前移，百万节点时整体退化为 O(V²)。大量数据时用<strong>链表队列 / 环形数组 / 双端队列</strong>，或维护 head 指针避免 shift。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：BFS 记录「顺序」与「层」混淆。</strong><br/>
          单队列的 BFS 访问顺序 ≠ 严格按层分组输出。要输出 <code>[[S],[A,D],[B,E],...]</code> 这样的分层结构，必须用 frontier/next 两层循环（见示例 2），否则分不清边界。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>「<strong>入队即标记</strong>」；BFS 四件套 = visited + 队列 + dist + parent。记住：BFS 只对<strong>无权图</strong>保证最短。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：BFS 遍历 与 无权最短路径
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          观察<strong>队列的变化</strong>（底部条）：出队节点🟠 → 它的未访问邻居入队🔵 → 出队节点访问完成🟢。
          节点下方的数字是 <strong>dist 层数</strong>。点击「无权最短路径」会额外演示 S→G 的 parent 回溯过程。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">📤 顺序: [{{ order.join(' → ') }}]</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doBfsTraverse" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">🌊 BFS 遍历</button>
          <button @mousedown="doShortestPath" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">🛤️ 无权最短路径 S→G</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-text :config="{x:30, y:8, text:'无向图（无权）', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-line v-for="e in gEdges" :key="e.from+'-'+e.to" :config="edgeCfg(e)" />
              <v-circle v-for="n in gNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in gNodes" :key="'t'+n.id" :config="labelCfg(n)" />
              <v-text v-for="n in gNodes" :key="'d'+n.id" :config="distCfg(n)" />
              <v-text :config="{x:20, y:288, text:'队列 queue（队头在左）', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-rect v-for="(s,i) in queue" :key="'q'+i" :config="queueRect(s,i)" />
              <v-text v-for="(s,i) in queue" :key="'qt'+i" :config="queueText(s,i)" />
            </v-layer>
          </v-stage>
        </div>
        <p class="text-xs text-slate-400 mt-2">🟠 当前出队 &nbsp; 🔵 已入队待访问 &nbsp; 🟢 访问完成 &nbsp; ⬜ 下方数字 = dist 层数</p>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>BFS = 队列 + visited</strong>，入队即标记，先来先扩展</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>层序遍历</strong>用 frontier/next 分组，能输出 <code>[[S],[A,D],...]</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>无权最短路</strong> = BFS + dist + parent，首次发现即最短，parent 回溯还原路径</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>复杂度 <strong>O(V+E)</strong> 时间、O(V) 空间；JS 慎用 <code>shift()</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>BFS 只对<strong>无权图</strong>保证最短；带权用 Dijkstra / SPFA</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>工程类比：涟漪扩散、资源按层加载、社交六度人脉</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-2-traversal/dsa-6-2-1-dfs" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：DFS：递归/迭代、连通分量、环检测</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-2-traversal/dsa-6-2-3-bipartite" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：二分图判定与最大匹配(匈牙利算法) →</RouterLink>
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
  { id: "sec-1", name: "BFS 思想与队列实现" },
  { id: "sec-2", name: "层序遍历" },
  { id: "sec-3", name: "无权图最短路径" },
  { id: "sec-4", name: "BFS vs DFS" },
  { id: "sec-5", name: "复杂度与常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ================= 代码示例 =================
const bfsCode = `// ===== BFS：队列 + visited =====
const graph: Record<string, string[]> = {
  S: ['A', 'D'], A: ['S', 'B', 'E'], B: ['A', 'C', 'F'],
  C: ['B', 'G'], D: ['S', 'E'], E: ['A', 'D', 'F'],
  F: ['B', 'E', 'G'], G: ['C', 'F'],
}

function bfs(g: Record<string, string[]>, start: string): string[] {
  const visited = new Set<string>([start])
  const order: string[] = []
  const queue: string[] = [start]

  while (queue.length) {
    const u = queue.shift()!          // 出队队头
    order.push(u)
    for (const v of g[u] ?? []) {
      if (!visited.has(v)) {
        visited.add(v)                // 入队即标记（防重复入队）
        queue.push(v)
      }
    }
  }
  return order
}
// bfs(graph, 'S') => ['S','A','D','B','E','C','F','G']`

const levelOrderCode = `// ===== 层序遍历：按层分组输出 =====
function levelOrder(g: Record<string, string[]>, start: string): string[][] {
  const visited = new Set<string>([start])
  const levels: string[][] = []
  let frontier: string[] = [start]    // 当前层

  while (frontier.length) {
    levels.push(frontier)
    const next: string[] = []
    for (const u of frontier) {       // 把当前层全部展开
      for (const v of g[u] ?? []) {
        if (!visited.has(v)) {
          visited.add(v)
          next.push(v)
        }
      }
    }
    frontier = next                   // 进入下一层
  }
  return levels
}
// levelOrder(graph, 'S')
// => [['S'], ['A','D'], ['B','E'], ['C','F'], ['G']]
// 应用：Vue 组件树按层渲染、懒加载按层调度、扩散模拟`

const shortestPathCode = `// ===== 无权图最短路径：dist + parent 回溯 =====
function shortestPath(
  g: Record<string, string[]>,
  start: string,
  target: string,
): string[] | null {
  const dist: Record<string, number> = { [start]: 0 }
  const parent: Record<string, string> = {}
  const visited = new Set<string>([start])
  const queue: string[] = [start]

  while (queue.length) {
    const u = queue.shift()!
    for (const v of g[u] ?? []) {
      if (!visited.has(v)) {
        visited.add(v)
        dist[v] = dist[u] + 1         // 第一次发现 = 最短步数
        parent[v] = u                 // 记录「由谁发现」
        queue.push(v)
      }
    }
  }
  if (target !== start && parent[target] === undefined) return null

  // 从 target 沿 parent 回溯到起点
  const path: string[] = [target]
  let cur = target
  while (cur !== start) {
    cur = parent[cur]
    path.push(cur)
  }
  return path.reverse()
}
// shortestPath(graph, 'S', 'G') => ['S','A','B','C','G']（4 步）
// 注意：只适用于无权图；带权图请用 Dijkstra（6-3-1）`

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
const queue = reactive<string[]>([])
const order = reactive<string[]>([])

const adj: Record<string, string[]> = {
  S: ['A','D'], A: ['S','B','E'], B: ['A','C','F'],
  C: ['B','G'], D: ['S','E'], E: ['A','D','F'],
  F: ['B','E','G'], G: ['C','F'],
}

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)
  ;[
    {id:'S',label:'S',x:90,y:70,color:C.cyan},
    {id:'A',label:'A',x:240,y:60,color:C.cyan},
    {id:'B',label:'B',x:390,y:60,color:C.cyan},
    {id:'C',label:'C',x:540,y:70,color:C.cyan},
    {id:'D',label:'D',x:140,y:205,color:C.cyan},
    {id:'E',label:'E',x:310,y:215,color:C.cyan},
    {id:'F',label:'F',x:480,y:215,color:C.cyan},
    {id:'G',label:'G',x:620,y:195,color:C.cyan},
  ].forEach(n => gNodes.push({ ...n }))
  ;[
    {from:'S',to:'A',w:1,color:'#94a3b8'},
    {from:'S',to:'D',w:1,color:'#94a3b8'},
    {from:'A',to:'B',w:1,color:'#94a3b8'},
    {from:'A',to:'E',w:1,color:'#94a3b8'},
    {from:'B',to:'C',w:1,color:'#94a3b8'},
    {from:'B',to:'F',w:1,color:'#94a3b8'},
    {from:'C',to:'G',w:1,color:'#94a3b8'},
    {from:'D',to:'E',w:1,color:'#94a3b8'},
    {from:'E',to:'F',w:1,color:'#94a3b8'},
    {from:'F',to:'G',w:1,color:'#94a3b8'},
  ].forEach(e => gEdges.push({ ...e }))
}
function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function edgeCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { points:[a.x, a.y, b.x, b.y], stroke:e.color, strokeWidth: e.color==='#94a3b8' ? 2 : 3 }
}
function circleCfg(n: GNode) {
  const stroke = n.color===C.cyan ? '#0891b2' : n.color===C.orange ? '#d97706' : n.color===C.green ? '#16a34a' : n.color===C.blue ? '#2563eb' : '#64748b'
  const sw = n.color===C.cyan ? 1.5 : 3
  return { x:n.x, y:n.y, radius:22, fill:n.color, stroke, strokeWidth:sw, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
}
function labelCfg(n: GNode) {
  return { x:n.x-22, y:n.y-22, width:44, height:44, text:n.label, fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle' }
}
function distCfg(n: GNode) {
  return { x:n.x-22, y:n.y+22, width:44, height:16, text:n.dist==null ? '∞' : String(n.dist), fontSize:11, fontFamily:'monospace', fill:C.text, align:'center', verticalAlign:'middle' }
}
function queueRect(s: string, i: number) {
  const x = 20 + i * 42
  return { x, y: 300, width: 36, height: 30, fill: i === 0 ? C.orange : C.blue, cornerRadius: 6,
    stroke: i === 0 ? '#d97706' : '#2563eb', strokeWidth: 1.5, shadowColor:'rgba(0,0,0,.1)', shadowBlur:3 }
}
function queueText(s: string, i: number) {
  return { x: 20 + i * 42, y: 300, width: 36, height: 30, text: s, fontSize: 13, fontFamily:'monospace', fontStyle:'bold',
    fill: i === 0 ? '#7c2d12' : '#fff', align:'center', verticalAlign:'middle' }
}
function resetGraph() {
  gNodes.forEach(n => { n.color = C.cyan; n.dist = null })
  gEdges.forEach(e => { e.color = '#94a3b8' })
  queue.splice(0); order.splice(0)
}
async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false }
}

function doReset() { resetGraph(); status.value = ''; opLabel.value = '' }

// ---- BFS 遍历 ----
async function doBfsTraverse() {
  await act('BFS 遍历', 'BFS（队列）', async () => {
    resetGraph()
    const visited = new Set<string>(['S'])
    queue.splice(0); order.splice(0)
    pos('S').dist = 0; pos('S').color = C.blue
    queue.push('S')
    await d(400)
    while (queue.length) {
      const u = queue.shift()!
      const un = pos(u)
      un.color = C.orange
      status.value = '出队 ' + u + '（dist=' + un.dist + '）'
      await d(420)
      for (const v of adj[u]) {
        if (visited.has(v)) continue
        visited.add(v)
        const vn = pos(v)
        vn.dist = (un.dist ?? 0) + 1
        vn.color = C.blue
        queue.push(v)
        status.value = '邻居 ' + v + ' 入队（dist=' + vn.dist + '）'
        await d(280)
      }
      un.color = C.green
      order.push(u)
      status.value = '访问完成 ' + u
      await d(180)
    }
    status.value = 'BFS 顺序: ' + order.join(' → ')
  })
}

// ---- 无权最短路径 S→G ----
async function doShortestPath() {
  await act('无权最短路径', 'BFS 最短路 S→G', async () => {
    resetGraph()
    const visited = new Set<string>(['S'])
    const parent: Record<string, string | null> = { S: null }
    queue.splice(0); order.splice(0)
    pos('S').dist = 0; pos('S').color = C.blue
    queue.push('S')
    await d(350)
    while (queue.length) {
      const u = queue.shift()!
      const un = pos(u)
      un.color = C.orange
      status.value = '出队 ' + u + '，扩展邻居'
      await d(360)
      for (const v of adj[u]) {
        if (visited.has(v)) continue
        visited.add(v)
        parent[v] = u
        const vn = pos(v)
        vn.dist = (un.dist ?? 0) + 1
        vn.color = C.blue
        queue.push(v)
        await d(220)
      }
      un.color = C.green
      order.push(u)
      await d(140)
    }
    // parent 回溯还原路径
    const path: string[] = []
    let cur: string | null = 'G'
    while (cur) {
      path.push(cur)
      cur = parent[cur] ?? null
    }
    path.reverse()
    gEdges.forEach(e => { e.color = '#94a3b8' })
    for (let i = 0; i < path.length; i++) {
      pos(path[i]).color = C.orange
      if (i > 0) {
        const e = gEdges.find(e2 => (e2.from===path[i-1] && e2.to===path[i]) || (e2.from===path[i] && e2.to===path[i-1]))
        if (e) e.color = C.green
      }
      status.value = '回溯路径: ' + path.slice(0, i + 1).join(' → ')
      await d(320)
    }
    path.forEach(p => { pos(p).color = C.green })
    status.value = '最短路径 S→G: ' + path.join(' → ') + '（' + (path.length - 1) + ' 步）'
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
