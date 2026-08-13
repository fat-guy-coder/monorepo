<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌊 BFS 遍历：层序遍历</h1>
          <p class="text-sm text-slate-500 mt-1">广度优先——逐层扩展，用队列一层层「扫」过去</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-0-4</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：层序遍历与分层
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          BFS（广度优先）按<strong>层</strong>推进：先访问根（第 1 层），再访问根的所有孩子（第 2 层），再访问所有孙子（第 3 层）……
          同一层的节点<strong>全部处理完</strong>，才进入下一层。层序遍历结果：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9</code>。
        </p>

        <figure class="mb-4">
          <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="360" y="20" text-anchor="middle" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">按层推进：第 1 层 → 第 2 层 → 第 3 层</text>

            <!-- 层分组虚线框 -->
            <rect x="320" y="40" width="80" height="52" rx="10" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 3" />
            <rect x="150" y="130" width="420" height="52" rx="10" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <rect x="100" y="225" width="520" height="52" rx="10" fill="none" stroke="#16a34a" stroke-width="1.5" stroke-dasharray="4 3" />

            <!-- 边 -->
            <line x1="360" y1="84" x2="200" y2="126" stroke="#94a3b8" stroke-width="2" />
            <line x1="360" y1="84" x2="360" y2="126" stroke="#94a3b8" stroke-width="2" />
            <line x1="360" y1="84" x2="520" y2="126" stroke="#94a3b8" stroke-width="2" />
            <line x1="200" y1="174" x2="150" y2="221" stroke="#94a3b8" stroke-width="2" />
            <line x1="200" y1="174" x2="250" y2="221" stroke="#94a3b8" stroke-width="2" />
            <line x1="360" y1="174" x2="360" y2="221" stroke="#94a3b8" stroke-width="2" />
            <line x1="520" y1="174" x2="470" y2="221" stroke="#94a3b8" stroke-width="2" />
            <line x1="520" y1="174" x2="570" y2="221" stroke="#94a3b8" stroke-width="2" />

            <!-- 节点 -->
            <circle cx="360" cy="60" r="24" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="360" y="60" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <circle cx="200" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="200" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <circle cx="360" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <circle cx="520" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="520" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <circle cx="150" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="150" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
            <circle cx="250" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="250" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">6</text>
            <circle cx="360" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="360" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">7</text>
            <circle cx="470" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="470" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
            <circle cx="570" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="570" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">9</text>

            <!-- 层标注 -->
            <text x="96" y="66" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#f59e0b" font-weight="bold">层 1</text>
            <text x="96" y="156" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">层 2</text>
            <text x="96" y="251" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#16a34a">层 3</text>
            <text x="630" y="60" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">深度 0</text>
            <text x="630" y="150" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">深度 1</text>
            <text x="630" y="245" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">深度 2</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：虚线框 = 层。BFS 用队列保证「同一层全部出队后，才进入下一层」。</figcaption>
        </figure>

        <!-- 队列机制示意 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">机制：队列 —— 出队一个，它的孩子就入队</h3>
        <figure>
          <svg viewBox="0 0 720 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="bfs-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="20" y="28" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">队列（front → rear）</text>
            <!-- 出队侧 -->
            <line x1="52" y1="70" x2="72" y2="70" stroke="#ef4444" stroke-width="2" marker-end="url(#bfs-arr)" />
            <text x="20" y="96" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ef4444" font-weight="bold">出队</text>
            <rect x="60" y="52" width="44" height="36" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="82" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#fff">1</text>
            <rect x="110" y="52" width="44" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="132" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#fff">2</text>
            <rect x="160" y="52" width="44" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="182" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#fff">3</text>
            <rect x="210" y="52" width="44" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="232" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#fff">4</text>
            <!-- 入队侧 -->
            <line x1="290" y1="70" x2="310" y2="70" stroke="#16a34a" stroke-width="2" marker-end="url(#bfs-arr)" />
            <text x="340" y="70" text-anchor="start" dominant-baseline="central" font-size="12" font-family="monospace" fill="#16a34a" font-weight="bold">入队：1 的孩子 [2,3,4]</text>
            <text x="20" y="126" font-size="11" font-family="monospace" fill="#64748b">出队 1（访问）→ 1 的孩子 2,3,4 依次入队 → 下一轮出队 2 → … 逐层扩展</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：FIFO 队列——从队头出队访问，其孩子从队尾入队，天然实现「逐层」。</figcaption>
        </figure>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          什么是 BFS？—— 逐层扩展
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>广度优先搜索 (Breadth-First Search, BFS)</strong> 的策略：先访问根，然后访问根<strong>同一层</strong>的所有孩子，
          再访问下一层的所有孙子…… 它是「<strong>先广后深</strong>」，用<strong>队列 (FIFO)</strong> 天然实现「先进先出 → 逐层」。
        </p>
        <ol class="space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>1.</strong> 根节点入队</li>
          <li><strong>2.</strong> 队头出队 → 访问它</li>
          <li><strong>3.</strong> 把它的所有孩子<strong>按顺序从队尾入队</strong></li>
          <li><strong>4.</strong> 重复 2-3，直到队列为空</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          BFS 就像<strong>组织架构的「逐级」遍历</strong>——先 CEO（第 1 层），再所有 VP（第 2 层），再所有总监（第 3 层）……<br/>
          也像<strong>社交网络的「朋友的朋友」搜索</strong>：先问所有一级好友，再问二级好友，天然适合找「最近的连接」。<br/>
          CSS 选择器里 <code>:scope &gt; *</code> 取直接子元素，也是「一层」的概念——BFS 就是把每一层都取出来。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          层序遍历 —— 队列实现（BFS 无递归）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          BFS <strong>没有自然的递归写法</strong>（递归隐含的是栈/LIFO，与「逐层」矛盾），必须用<strong>队列</strong>显式模拟。
          这也是「DFS vs BFS」最直观的实现差异。
        </p>
        <div class="mb-4"><Code language="ts" :code="bfsCode" title="level_order.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>为什么队列能保证「逐层」？因为<strong>先进先出</strong>——第 1 层的节点先入队就先出队，它们的下一层孩子后入队就后出队。
          顺序天然就是「层 1 → 层 2 → 层 3 …」。换成栈（LIFO）就变成了 DFS。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          逐层处理 —— 用「层大小」切分每一层
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          很多题目需要<strong>按层分组</strong>（如 LeetCode 429 N 叉树层序遍历、102 二叉树层序遍历）。
          技巧：每一轮开始前先记录<strong>当前队列长度 size</strong>，只处理这 size 个节点，就正好是一层。
        </p>
        <div class="mb-4"><Code language="ts" :code="levelGroupCode" title="level_group.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆：</strong><code>size = queue.length</code> 必须在<strong>内层 for 之前取</strong>，且内层循环里<strong>不要重新读 queue.length</strong>（它在变）。
          这一行是「按层处理」的灵魂。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          BFS 求树的深度与应用
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          每处理完一层，深度就 +1。BFS 求「最小深度」尤其高效——<strong>遇到的第一个叶子，其所在层就是最小深度</strong>（DFS 求最小深度则可能走到底再回溯）。
        </p>
        <div class="mb-4"><Code language="ts" :code="depthApplyCode" title="bfs_depth.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          BFS 求「最短路径/最近距离」就像<strong>路由器的「跳数」</strong>——从你出发，1 跳内可达的设备，2 跳内可达的设备……<br/>
          也像<strong>npm 包的「依赖深度」</strong>：直接依赖是深度 1，传递依赖是深度 2+。找「最近」的东西，BFS 是首选。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          DFS vs BFS 与常见错误
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold">DFS（栈）</th><th class="px-4 py-2 border border-slate-200 font-semibold">BFS（队列）</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">数据结构</td><td class="px-4 py-2 border font-mono">栈（递归/显式）</td><td class="px-4 py-2 border font-mono">队列</td></tr>
              <tr><td class="px-4 py-2 border">顺序</td><td class="px-4 py-2 border">一路到底再回溯</td><td class="px-4 py-2 border">逐层扩展</td></tr>
              <tr><td class="px-4 py-2 border">空间</td><td class="px-4 py-2 border font-mono">O(高)</td><td class="px-4 py-2 border font-mono">O(宽)（最坏 O(n)）</td></tr>
              <tr><td class="px-4 py-2 border">递归写法</td><td class="px-4 py-2 border text-emerald-600">天然支持</td><td class="px-4 py-2 border text-red-600">无（必须队列）</td></tr>
              <tr><td class="px-4 py-2 border">最短路径/最小深度</td><td class="px-4 py-2 border text-amber-600">需走到底</td><td class="px-4 py-2 border text-emerald-600">首遇即最优</td></tr>
              <tr><td class="px-4 py-2 border">最大深度/拓扑/路径枚举</td><td class="px-4 py-2 border text-emerald-600">更自然</td><td class="px-4 py-2 border text-amber-600">不自然</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：用栈实现 BFS。</strong><br/>
          把队列换成栈，遍历就变回 DFS。BFS 必须用 <code>shift()</code>（队头出）配合 <code>push()</code>（队尾入）的 FIFO 语义。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：按层分组时在内层循环里读 queue.length。</strong><br/>
          内层循环中 queue 在不断增长，必须用外层记录好的 <code>size</code>，否则会把「下一层的节点」也当成本层处理。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：JS 里 shift() 是 O(n)。</strong><br/>
          数组 <code>shift()</code> 要把所有元素前移一位，是 O(n)。工程中大数据量用<strong>双端队列</strong>（如用两个数组模拟、或链表队列）把出队降到 O(1)。学习阶段用 <code>shift()</code> 无妨，但要知其代价。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：队列逐层扩展
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          观察<strong>逐层扩展</strong>：队头（橙框）出队变绿，它的孩子从队尾入队；同一层的节点全部处理完，才进入下一层。
          注意<strong>front / rear</strong> 的移动。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 队列长度: {{ queue.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">📤 层序: [{{ out.join(', ') }}]</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doBfs" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">▶ 层序遍历</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-text :config="{x:30, y:8, text:'树（BFS 层序）', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-text :config="{x:30, y:288, text:'队列 queue', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-text :config="{x:20, y:332, text:'front', fontSize:10, fontFamily:'monospace', fill:C.orange, fontStyle:'bold'}" />
              <v-text v-if="queue.length > 1" :config="{x:20+(queue.length-1)*46, y:332, text:'rear', fontSize:10, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-text :config="{x:30, y:372, text:'输出', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-line v-for="e in tEdges" :key="e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="txtCfg(n)" />
              <v-rect v-for="(v,i) in queue" :key="'q'+v+'-'+i" :config="queueRect(v,i)" />
              <v-text v-for="(v,i) in queue" :key="'qt'+v+'-'+i" :config="queueText(v,i)" />
              <v-rect v-for="(v,i) in out" :key="'o'+v" :config="outRect(v,i)" />
              <v-text v-for="(v,i) in out" :key="'ot'+v" :config="outText(v,i)" />
            </v-layer>
          </v-stage>
        </div>
        <p class="text-xs text-slate-400 mt-2">🟠 队头（出队中）&nbsp; 🔵 队列中 &nbsp; 🟢 已访问 &nbsp; 出队后其孩子从 rear 入队</p>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>BFS = 逐层扩展</strong>，用队列（FIFO）实现，<strong>无递归写法</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>出队访问 → 孩子入队</strong>，队列顺序天然就是「层 1 → 层 2 → 层 3」</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>按层分组：</strong>每轮先取 <code>size = queue.length</code>，只处理本层</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>BFS 求最短路径/最小深度</strong>：首遇叶子即最优；求最大深度/拓扑用 DFS</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>空间 O(宽)</strong>，浅而宽的树 BFS 队列会很大；深而窄的树 DFS 更省</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-0-tree-basics/dsa-4-0-3-dfs" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：DFS 遍历</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-1-binary-tree/dsa-4-1-1-traversal" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：二叉树遍历 →</RouterLink>
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
  { id: "sec-1", name: "什么是 BFS" },
  { id: "sec-2", name: "层序遍历" },
  { id: "sec-3", name: "逐层处理" },
  { id: "sec-4", name: "BFS 求深度" },
  { id: "sec-5", name: "DFS vs BFS" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 BFS 队列动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H = ref(410), W = ref(700)
const R = 24, LEVEL_H = 100, TOP = 56
interface TNode { id: number; x: number; y: number; color: string }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{a:number;b:number}[]>([])
const queue = reactive<number[]>([])
const out = reactive<number[]>([])
const busy = ref(false), status = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const child: Record<number, number[]> = { 1:[2,3,4], 2:[5,6], 3:[7], 4:[8,9], 5:[], 6:[], 7:[], 8:[], 9:[] }

const node = (id:number) => tNodes.find(n => n.id === id)!

function layout() {
  tNodes.length = 0; tEdges.length = 0
  const levels: number[][] = []
  let frontier = [1]
  while (frontier.length) {
    levels.push(frontier)
    const next: number[] = []
    frontier.forEach(id => child[id].forEach(c => { tEdges.push({a:id, b:c}); next.push(c) }))
    frontier = next
  }
  levels.forEach((lv, li) => {
    const y = TOP + li * LEVEL_H
    lv.forEach((id, i) => tNodes.push({ id, x: W.value*(i+1)/(lv.length+1), y, color: C.cyan }))
  })
}
function edgeCfg(e:{a:number;b:number}) {
  const pa = node(e.a), pb = node(e.b)
  return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke:'#94a3b8', strokeWidth:2 }
}
function circleCfg(n:any) {
  return { x:n.x, y:n.y, radius:R, fill:n.color, stroke:'#64748b', strokeWidth:1.5,
    shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
}
function txtCfg(n:any) {
  return { x:n.x-R, y:n.y-R, width:R*2, height:R*2, text:String(n.id), fontSize:15,
    fontFamily:'monospace', fontStyle:'bold', fill:n.color===C.green?C.text:'#fff', align:'center', verticalAlign:'middle' }
}
function queueRect(v: number, i: number) {
  const isFront = i === 0
  return { x: 20 + i*46, y: 296, width: 40, height: 32, fill: C.cyan, cornerRadius: 6,
    stroke: isFront ? C.orange : '#64748b', strokeWidth: isFront ? 2.5 : 1.5, shadowColor:'rgba(0,0,0,.1)', shadowBlur:3 }
}
function queueText(v: number, i: number) {
  return { x: 20 + i*46, y: 296, width: 40, height: 32, text: String(v), fontSize: 14,
    fontFamily:'monospace', fontStyle:'bold', fill: C.text, align:'center', verticalAlign:'middle' }
}
function outRect(v: number, i: number) {
  return { x: 20 + i*44, y: 382, width: 38, height: 26, fill: C.green, cornerRadius: 6, stroke:'#64748b', strokeWidth: 1, shadowColor:'rgba(0,0,0,.08)', shadowBlur:2 }
}
function outText(v: number, i: number) {
  return { x: 20 + i*44, y: 382, width: 38, height: 26, text: String(v), fontSize: 13, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle' }
}
async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch(_) {}
  finally { await d(300); busy.value = false }
}
function resetState() {
  queue.length = 0
  out.length = 0
  tNodes.forEach(n => { n.color = C.cyan })
}

function doReset() { resetState(); status.value = '' }

async function doBfs() {
  act('层序遍历  队列逐层  O(n)', async () => {
    resetState()
    const order: number[] = []
    queue.push(1)
    let level = 0
    while (queue.length) {
      const size = queue.length
      level++
      status.value = `第 ${level} 层（${size} 个节点）`
      await d(420)
      for (let k = 0; k < size; k++) {
        const id = queue.shift()!
        const n = node(id)
        n.color = C.orange
        status.value = `出队 ${id} → 访问`
        await d(340)
        out.push(id); order.push(id)
        n.color = C.green
        await d(120)
        for (const c of child[id]) {
          queue.push(c)
          status.value = `子节点 ${c} 从 rear 入队`
          await d(180)
        }
      }
    }
    status.value = `层序: ${order.join(' → ')}`
  })
}

let ro: ResizeObserver | null = null
onMounted(() => {
  layout()
  if (box.value) {
    W.value = box.value.clientWidth
    layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const bfsCode = `// ===== 层序遍历（BFS）：队列实现 =====
interface TreeNode { val: number; children: TreeNode[] }

function levelOrder(root: TreeNode): number[] {
    if (!root) return []
    const res: number[] = []
    const queue: TreeNode[] = [root]   // 队列：FIFO

    while (queue.length) {
        const node = queue.shift()!    // 队头出队 → 访问
        res.push(node.val)

        // 所有孩子从队尾入队（按顺序）
        for (const c of node.children) {
            queue.push(c)
        }
    }
    return res
}
// 示例树结果: [1, 2, 3, 4, 5, 6, 7, 8, 9]  ← 层序

// 为什么 BFS 没有递归写法？
// 递归隐含的是「栈」(LIFO)，天然做 DFS；
// BFS 需要「队列」(FIFO)，必须显式维护。
// 所以「BFS 只能迭代」——记住这个差异，面试常问。`

const levelGroupCode = `// ===== 逐层处理：按层分组（记录每层的节点）=====
function levelOrderGroup(root: TreeNode): number[][] {
    if (!root) return []
    const res: number[][] = []
    const queue: TreeNode[] = [root]

    while (queue.length) {
        const size = queue.length        // ★ 关键：先记录本层节点数
        const level: number[] = []
        for (let i = 0; i < size; i++) {  // ★ 内层只处理 size 个（不读 queue.length）
            const node = queue.shift()!
            level.push(node.val)
            for (const c of node.children) queue.push(c)
        }
        res.push(level)                  // 一层一组
    }
    return res
}
// 示例树结果: [[1], [2, 3, 4], [5, 6, 7, 8, 9]]

// 对应 LeetCode 429 N 叉树层序遍历 / 102 二叉树层序遍历
// 记忆：size = queue.length 放在 for 前，内层循环别重新读 queue.length`

const depthApplyCode = `// ===== BFS 求树的深度（= 层数）=====
function treeDepth(root: TreeNode): number {
    if (!root) return 0
    const queue: TreeNode[] = [root]
    let depth = 0

    while (queue.length) {
        const size = queue.length
        depth++                          // 每处理完一层，深度 +1
        for (let i = 0; i < size; i++) {
            const node = queue.shift()!
            for (const c of node.children) queue.push(c)
        }
    }
    return depth
}
console.log(treeDepth(root))   // 3（三层）

// ===== BFS 求最小深度（首遇叶子即最优）=====
function minDepth(root: TreeNode): number {
    if (!root) return 0
    const queue: TreeNode[] = [root]
    let depth = 0

    while (queue.length) {
        const size = queue.length
        depth++
        for (let i = 0; i < size; i++) {
            const node = queue.shift()!
            if (node.children.length === 0) {
                return depth            // ★ 第一个叶子 → 最小深度
            }
            for (const c of node.children) queue.push(c)
        }
    }
    return depth
}

// ===== BFS 求「到每个节点的最短距离」（无权图的单源最短路）=====
// 从根出发，BFS 首次访问某节点时，其层数就是「最短距离」
// 这也是 Dijkstra 在「边权全为 1」时的退化形式
function shortestDist(root: TreeNode): Map<TreeNode, number> {
    const dist = new Map<TreeNode, number>()
    const queue: TreeNode[] = [root]
    dist.set(root, 0)
    while (queue.length) {
        const node = queue.shift()!
        for (const c of node.children) {
            if (!dist.has(c)) {          // 首次遇到 = 最短
                dist.set(c, dist.get(node)! + 1)
                queue.push(c)
            }
        }
    }
    return dist
}`
</script>
