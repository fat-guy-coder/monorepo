<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🧭 DFS：递归 / 迭代、连通分量、环检测</h1>
          <p class="text-sm text-slate-500 mt-1">一条路走到底，走不通再回头 —— 深度优先搜索</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-2-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：访问 → 深入 → 回溯
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          DFS 由三个动作组成：<strong>访问当前节点</strong>（记录发现顺序）→ <strong>深入第一个未访问的邻居</strong>（递归/压栈）→
          <strong>无路可走时回溯</strong>。左边图中橙色数字是 <strong>发现顺序</strong>：从 A 出发
          A→B→C→D→E→F，再处理第二个连通分量 X→Y。右边两图展示迭代实现的关键一步「标记已访问 + 倒序压入邻居」。
        </p>
        <figure class="mb-4">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <line x1="140" y1="70" x2="300" y2="50" stroke="#94a3b8" stroke-width="2" />
            <line x1="300" y1="50" x2="460" y2="90" stroke="#94a3b8" stroke-width="2" />
            <line x1="460" y1="90" x2="430" y2="215" stroke="#94a3b8" stroke-width="2" />
            <line x1="430" y1="215" x2="280" y2="235" stroke="#94a3b8" stroke-width="2" />
            <line x1="280" y1="235" x2="130" y2="175" stroke="#94a3b8" stroke-width="2" />
            <line x1="130" y1="175" x2="140" y2="70" stroke="#94a3b8" stroke-width="2" />
            <line x1="140" y1="70" x2="460" y2="90" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 4" />
            <line x1="620" y1="120" x2="620" y2="215" stroke="#94a3b8" stroke-width="2" />

            <circle cx="140" cy="70" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="140" y="70" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <text x="140" y="42" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">①</text>

            <circle cx="300" cy="50" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="300" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <text x="300" y="22" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">②</text>

            <circle cx="460" cy="90" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="460" y="90" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <text x="460" y="62" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">③</text>

            <circle cx="430" cy="215" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="430" y="215" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
            <text x="430" y="187" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">④</text>

            <circle cx="280" cy="235" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="280" y="235" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">E</text>
            <text x="280" y="207" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑤</text>

            <circle cx="130" cy="175" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="130" y="175" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">F</text>
            <text x="130" y="147" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑥</text>

            <circle cx="620" cy="120" r="22" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
            <text x="620" y="120" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">X</text>
            <text x="620" y="92" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑦</text>

            <circle cx="620" cy="215" r="22" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
            <text x="620" y="215" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">Y</text>
            <text x="620" y="187" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑧</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：DFS 从 A 出发的发现顺序 A→B→C→D→E→F（橙色虚线是弦边 A-C，A-B-C 与 A-B-C-D-E-F-A 都是环），第二个连通分量 X→Y 由外层循环兜底访问。</figcaption>
        </figure>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <figure>
            <svg viewBox="0 0 340 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="170" y="18" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">Before：访问 A（橙色）</text>
              <line x1="110" y1="120" x2="225" y2="55" stroke="#94a3b8" stroke-width="2" />
              <line x1="110" y1="120" x2="225" y2="120" stroke="#94a3b8" stroke-width="2" />
              <line x1="110" y1="120" x2="225" y2="185" stroke="#94a3b8" stroke-width="2" />
              <circle cx="110" cy="120" r="20" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="110" y="120" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <circle cx="225" cy="55" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 3" />
              <text x="225" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">B</text>
              <circle cx="225" cy="120" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 3" />
              <text x="225" y="120" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">C</text>
              <circle cx="225" cy="185" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 3" />
              <text x="225" y="185" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">D</text>
              <rect x="28" y="196" width="86" height="30" rx="6" fill="#06b6d4" />
              <text x="71" y="211" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">栈: [A]</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">Before：递归进入 A，A 变橙、压栈，邻居 B/C/D 尚未访问（虚线）。</figcaption>
          </figure>
          <figure>
            <svg viewBox="0 0 340 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="aft-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
              </defs>
              <text x="170" y="18" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">After：A 已访问，邻居倒序入栈</text>
              <line x1="110" y1="120" x2="225" y2="55" stroke="#94a3b8" stroke-width="2" />
              <line x1="110" y1="120" x2="225" y2="120" stroke="#94a3b8" stroke-width="2" />
              <line x1="110" y1="120" x2="225" y2="185" stroke="#94a3b8" stroke-width="2" />
              <circle cx="110" cy="120" r="20" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="110" y="120" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">A</text>
              <circle cx="225" cy="55" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="225" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <circle cx="225" cy="120" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="225" y="120" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
              <circle cx="225" cy="185" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="225" y="185" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
              <rect x="28" y="196" width="118" height="30" rx="6" fill="#06b6d4" />
              <text x="87" y="211" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">栈: [D, C, B]</text>
              <line x1="196" y1="182" x2="148" y2="199" stroke="#f59e0b" stroke-width="2" marker-end="url(#aft-arr)" />
              <text x="200" y="172" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#f59e0b">栈顶</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">After：A 标记为已访问（绿），邻居 D、C、B 倒序压栈 —— 栈顶 B 下一个被访问（LIFO）。</figcaption>
          </figure>
        </div>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          DFS 思想与递归实现
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          深度优先搜索（Depth-First Search）的策略是：<strong>沿着一条路径一直走到头</strong>，走不动了再<strong>回溯</strong>到最近一个
          「还有未访问邻居」的节点继续深入。与树不同，<strong>图可能有环</strong>，所以必须用
          <code class="text-cyan-700">visited</code> 集合标记已访问节点，否则会无限循环。
        </p>
        <ol class="space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>1.</strong> 访问起点，加入 visited</li>
          <li><strong>2.</strong> 遍历邻居，找到第一个未访问的邻居，递归进入它</li>
          <li><strong>3.</strong> 从更深层回溯回来后，继续找下一个未访问的邻居</li>
          <li><strong>4.</strong> 所有邻居都访问过 → 当前节点完成，返回上一层</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="dfsRecursiveCode" title="dfs-recursive.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          浏览器工具栏的<strong>「前进/后退」历史</strong>就是一条 DFS 路径：你在 A 页面点开链接到 B，再从 B 点开 C，后退一步回到 B——这就是「深入 + 回溯」。<br/>
          前端也很常见：<strong>递归遍历 DOM 树</strong>（先访问父元素再深入第一个子元素）、<strong>文件系统递归扫描文件夹</strong>（进到最深的子目录再一层层退出来）。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：忘记 visited。</strong><br/>
          图有环时（如 A-B-C-A），不带 visited 的递归会 A→B→C→A→B→… 无限循环直到栈溢出。<strong>访问节点的那一刻就要标记</strong>，而不是「处理完再标记」——否则同一帧内可能重复入栈。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          迭代实现（显式栈）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          递归的本质是<strong>编译器帮你维护了一个调用栈</strong>。把栈显式地写出来，就能
          <strong>暂停 / 恢复 / 限制深度</strong>，还能避免深图时系统栈溢出（V8 递归深度约 1 万层）。
          迭代版要注意：弹出栈顶时节点可能<strong>已被压入多次</strong>，需要再判一次 visited。
        </p>
        <div class="mb-4"><Code language="ts" :code="dfsIterativeCode" title="dfs-iterative.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：压栈顺序写反。</strong><br/>
          想要「从左到右」访问邻居，必须<strong>倒序压栈</strong>（最右的先压）。正序压栈 + LIFO 弹出会得到「从右到左」的错误访问顺序，与递归版不一致。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          React 16 用 <strong>Fiber 架构</strong>重写协调器的核心动机之一：旧的递归遍历<strong>无法被中断</strong>，深树 diff 会卡住主线程。Fiber 改用「链表 + 显式栈 + while 循环」实现<strong>可中断、可恢复、带优先级</strong>的遍历——这正是显式栈在工程上的价值。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          连通分量统计
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          一次 DFS 只能覆盖<strong>一个连通分量</strong>。要统计整张图的分量数，需要<strong>外层循环兜底</strong>：
          遍历所有节点，遇到未访问的就启动一次新的 DFS，计数 +1。孤岛（孤立节点）也是一个分量。
        </p>
        <div class="mb-4"><Code language="ts" :code="ccCode" title="count-components.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          社交网络里的「<strong>朋友圈分组</strong>」就是连通分量：A 认识 B、B 认识 C，则 A/B/C 在同一个圈子里；互不认识的两个人分属不同圈子。组件库的依赖图、<strong>微前端的应用拓扑</strong>也用它判断哪些模块互相可达。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：只从单个起点 DFS。</strong><br/>
          图不连通时，从 A 出发的 DFS 只能访问 A 所在的分量，其余分量（如 X、Y）永远访问不到。统计分量、遍历全图都必须加外层循环。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          环检测：无向图（父指针）与有向图（三色标记）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>无向图</strong>：DFS 遇到「已访问且不是父节点」的邻居就说明有环——但要排除掉<strong>回父边</strong>（A→B 后立刻从 B 看到 A，这不是环）。<br/>
          <strong>有向图</strong>：光靠 visited 不够，必须区分三种状态——<strong>白色</strong>（未访问）、<strong>灰色</strong>（在递归栈中）、<strong>黑色</strong>（已完成）。
          遇到灰色节点 = 回到递归栈中某个祖先 = 有环。
        </p>
        <ol class="space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>1.</strong> 进入节点：白 → 灰，压入递归栈</li>
          <li><strong>2.</strong> 遍历邻居：遇到灰 → 有环；遇到白 → 递归；遇到黑 → 跳过</li>
          <li><strong>3.</strong> 所有邻居处理完：灰 → 黑，弹出递归栈</li>
          <li><strong>4.</strong> 全部节点无「遇灰」→ 无环</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="cycleCode" title="detect-cycle.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 1：无向图把「回父边」当成环。</strong><br/>
          B 的邻居 A 已经被访问，但 A 是 B 的父节点——这是「回父边」，不是环。无向图必须传入 <code>parent</code> 参数排除它。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 2：有向图只用 visited（黑白两态）。</strong><br/>
          有向图里「已访问」可能是<strong>另一条分支</strong>完成的节点（黑色），它不代表当前路径成环。必须用三色标记区分「在栈中（灰）」与「已完成（黑）」。这也是拓扑排序判环（6-2-4）的原理。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <code>npm install</code> / webpack 解析依赖时必须检测<strong>依赖环</strong>（A 依赖 B、B 又依赖 A），否则无法确定构建顺序。Vue 的 <strong>effect 依赖收集</strong>也会报「循环依赖」警告，用的正是类似的三色/栈判定思想。</p>
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
              <tr><td class="px-4 py-2 border">递归 DFS</td><td class="px-4 py-2 border">O(V+E)</td><td class="px-4 py-2 border">O(V)</td><td class="px-4 py-2 border">递归栈最深 = 最长路径</td></tr>
              <tr><td class="px-4 py-2 border">迭代 DFS</td><td class="px-4 py-2 border">O(V+E)</td><td class="px-4 py-2 border">O(V)</td><td class="px-4 py-2 border">显式栈，可限深可中断</td></tr>
              <tr><td class="px-4 py-2 border">连通分量</td><td class="px-4 py-2 border">O(V+E)</td><td class="px-4 py-2 border">O(V)</td><td class="px-4 py-2 border">外层循环 + 单次 DFS</td></tr>
              <tr><td class="px-4 py-2 border">环检测</td><td class="px-4 py-2 border">O(V+E)</td><td class="px-4 py-2 border">O(V)</td><td class="px-4 py-2 border">无向传父节点，有向用三色</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：深图递归爆栈。</strong><br/>
          1 万层以上的链式图（如超长依赖链）用递归 DFS 会触发 RangeError。改用显式栈，或把栈放到堆上（可承受百万级）。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：迭代 DFS 不判「重复入栈」。</strong><br/>
          同一个节点可能被多个邻居压入栈多次，弹出时若不重新检查 visited，会重复访问、破坏发现顺序。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>「<strong>访问即标记、邻居倒序压</strong>」；无向图判环记得传父节点，有向图判环用三色。能写递归先写递归（简单），深图/需要中断再换显式栈。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：递归 / 迭代 DFS、连通分量、环检测
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          观察<strong>变色规律</strong>：当前节点🟠 → 访问完成🟢；<strong>发现顺序</strong>显示在节点下方。
          图含两个连通分量（A~F 与 X~Y），且 A-B-C 与六边形 A-B-C-D-E-F-A 构成环。底部条显示递归/显式栈的内容。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">📤 顺序: [{{ order.join(' → ') }}]</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doDfsRecursive" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">🔍 递归 DFS</button>
          <button @mousedown="doDfsIterative" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">🔍 迭代 DFS（显式栈）</button>
          <button @mousedown="doCountCC" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">🧩 统计连通分量</button>
          <button @mousedown="doDetectCycle" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">🔄 检测环</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-text :config="{x:30, y:8, text:'无向图（两个连通分量 + 环）', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-line v-for="e in gEdges" :key="e.from+'-'+e.to" :config="edgeCfg(e)" />
              <v-circle v-for="n in gNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in gNodes" :key="'t'+n.id" :config="labelCfg(n)" />
              <v-text v-for="n in gNodes" :key="'d'+n.id" :config="distCfg(n)" />
              <v-text :config="{x:20, y:288, text:'递归栈 / 显式栈', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-rect v-for="(s,i) in stack" :key="'s'+i" :config="stackRect(s,i)" />
              <v-text v-for="(s,i) in stack" :key="'st'+i" :config="stackText(s,i)" />
            </v-layer>
          </v-stage>
        </div>
        <p class="text-xs text-slate-400 mt-2">🟠 当前节点 &nbsp; 🟢 已访问 &nbsp; 🔵 已压栈待访问 &nbsp; 🔴 环上节点 &nbsp; ⬜ 数字 = 发现顺序</p>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>DFS = 访问 → 深入 → 回溯</strong>，递归版简洁，显式栈版可中断、可限深</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>图必须有 visited</strong>（树无环不需要），访问即标记</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>连通分量</strong> = 外层循环兜底，每次启动新 DFS 计数 +1</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>无向图判环</strong>传父节点排除回父边；<strong>有向图判环</strong>用白/灰/黑三色标记</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>复杂度均为 <strong>O(V+E)</strong> 时间、O(V) 空间</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>工程类比：浏览器前进/后退、DOM 递归遍历、npm 依赖环检测、React Fiber 可中断遍历</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-1-foundation/dsa-6-1-3-degree" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：度/入度/出度与握手定理</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-2-traversal/dsa-6-2-2-bfs" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：BFS：最短路径(无权)、层序遍历 →</RouterLink>
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
  { id: "sec-1", name: "DFS 思想与递归实现" },
  { id: "sec-2", name: "迭代实现（显式栈）" },
  { id: "sec-3", name: "连通分量统计" },
  { id: "sec-4", name: "环检测" },
  { id: "sec-5", name: "复杂度与常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ================= 代码示例 =================
const dfsRecursiveCode = `// ===== 递归 DFS：邻接表 + visited =====
// 邻接表表示：每个节点记录它的邻居列表
const graph: Record<string, string[]> = {
  A: ['B', 'F', 'C'], B: ['A', 'C'], C: ['B', 'D', 'A'],
  D: ['C', 'E'], E: ['D', 'F'], F: ['E', 'A'],
  X: ['Y'], Y: ['X'],
}

function dfsRecursive(g: Record<string, string[]>, start: string): string[] {
  const visited = new Set<string>()
  const order: string[] = []

  function dfs(u: string): void {
    visited.add(u)                 // 访问即标记（防环）
    order.push(u)                  // 记录发现顺序
    for (const v of g[u] ?? []) {
      if (!visited.has(v)) dfs(v)  // 未访问才深入
    }
  }

  dfs(start)
  return order
}
// dfsRecursive(graph, 'A') => ['A','B','C','D','E','F']
// 注意：X、Y 在另一个连通分量，单次 dfs 访问不到`

const dfsIterativeCode = `// ===== 迭代 DFS：显式栈，避免递归爆栈 =====
function dfsIterative(g: Record<string, string[]>, start: string): string[] {
  const visited = new Set<string>()
  const order: string[] = []
  const stack: string[] = [start]

  while (stack.length) {
    const u = stack.pop()!           // 弹出栈顶
    if (visited.has(u)) continue     // 可能被压入多次，再判一次
    visited.add(u)
    order.push(u)

    // 倒序压入邻居：LIFO 保证正序访问，与递归一致
    const ns = g[u] ?? []
    for (let i = ns.length - 1; i >= 0; i--) {
      if (!visited.has(ns[i])) stack.push(ns[i])
    }
  }
  return order
}
// dfsIterative(graph, 'A') => ['A','B','C','D','E','F']`

const ccCode = `// ===== 统计连通分量：外层循环兜底 =====
function countComponents(g: Record<string, string[]>): number {
  const visited = new Set<string>()
  let count = 0

  for (const u of Object.keys(g)) {   // 遍历所有节点
    if (visited.has(u)) continue      // 已属于某个分量
    count++                           // 新的连通分量
    const stack = [u]
    visited.add(u)
    while (stack.length) {
      const cur = stack.pop()!
      for (const v of g[cur] ?? []) {
        if (!visited.has(v)) {
          visited.add(v)
          stack.push(v)
        }
      }
    }
  }
  return count
}
// countComponents(graph) => 2  （分量1: A~F，分量2: X~Y）
// 应用：社交网络朋友圈分组、判断图是否连通（结果 === 1）`

const cycleCode = `// ===== 无向图环检测：DFS + 父节点 =====
function hasCycleUndirected(g: Record<string, string[]>): boolean {
  const visited = new Set<string>()

  function dfs(u: string, parent: string): boolean {
    visited.add(u)
    for (const v of g[u] ?? []) {
      if (v === parent) continue      // 回父边不算环
      if (visited.has(v)) return true // 遇到已访问的「非父」节点 = 环
      if (dfs(v, u)) return true
    }
    return false
  }
  for (const u of Object.keys(g)) {
    if (!visited.has(u) && dfs(u, '')) return true
  }
  return false
}

// ===== 有向图环检测：三色标记（0 白 / 1 灰 / 2 黑） =====
function hasCycleDirected(g: Record<string, string[]>): boolean {
  const color: Record<string, number> = {}   // 0=未访问 1=递归栈中 2=完成

  function dfs(u: string): boolean {
    color[u] = 1                             // 进入：白 -> 灰
    for (const v of g[u] ?? []) {
      if (color[v] === 1) return true        // 遇灰 = 回到栈中祖先 = 环
      if (color[v] === undefined && dfs(v)) return true
    }
    color[u] = 2                             // 退出：灰 -> 黑
    return false
  }
  for (const u of Object.keys(g)) {
    if (color[u] === undefined && dfs(u)) return true
  }
  return false
}
// 关键区别：无向图排除回父边；有向图必须区分「灰(栈中)」与「黑(完成)」`

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
const stack = reactive<string[]>([])
const order = reactive<string[]>([])

const adj: Record<string, string[]> = {
  A: ['B','F','C'], B: ['A','C'], C: ['B','D','A'],
  D: ['C','E'], E: ['D','F'], F: ['E','A'],
  X: ['Y'], Y: ['X'],
}

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)
  ;[
    {id:'A',label:'A',x:140,y:70,color:C.cyan},
    {id:'B',label:'B',x:300,y:50,color:C.cyan},
    {id:'C',label:'C',x:460,y:90,color:C.cyan},
    {id:'D',label:'D',x:430,y:215,color:C.cyan},
    {id:'E',label:'E',x:280,y:235,color:C.cyan},
    {id:'F',label:'F',x:130,y:175,color:C.cyan},
    {id:'X',label:'X',x:620,y:120,color:C.cyan},
    {id:'Y',label:'Y',x:620,y:215,color:C.cyan},
  ].forEach(n => gNodes.push({ ...n }))
  ;[
    {from:'A',to:'B',w:1,color:'#94a3b8'},
    {from:'B',to:'C',w:1,color:'#94a3b8'},
    {from:'C',to:'D',w:1,color:'#94a3b8'},
    {from:'D',to:'E',w:1,color:'#94a3b8'},
    {from:'E',to:'F',w:1,color:'#94a3b8'},
    {from:'F',to:'A',w:1,color:'#94a3b8'},
    {from:'A',to:'C',w:1,color:'#94a3b8'},
    {from:'X',to:'Y',w:1,color:'#94a3b8'},
  ].forEach(e => gEdges.push({ ...e }))
}
function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function edgeCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { points:[a.x, a.y, b.x, b.y], stroke:e.color, strokeWidth: e.color==='#94a3b8' ? 2 : 3 }
}
function circleCfg(n: GNode) {
  const stroke = n.color===C.cyan ? '#0891b2' : n.color===C.orange ? '#d97706' : n.color===C.green ? '#16a34a' : n.color===C.red ? '#b91c1c' : n.color===C.blue ? '#2563eb' : n.color===C.violet ? '#7c3aed' : '#64748b'
  const sw = n.color===C.cyan ? 1.5 : 3
  return { x:n.x, y:n.y, radius:22, fill:n.color, stroke, strokeWidth:sw, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
}
function labelCfg(n: GNode) {
  return { x:n.x-22, y:n.y-22, width:44, height:44, text:n.label, fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle' }
}
function distCfg(n: GNode) {
  return { x:n.x-22, y:n.y+22, width:44, height:16, text:n.dist==null ? '∞' : String(n.dist), fontSize:11, fontFamily:'monospace', fill:C.text, align:'center', verticalAlign:'middle' }
}
function stackRect(s: string, i: number) {
  const x = 20 + i * 42
  return { x, y: 300, width: 36, height: 30, fill: i === stack.length - 1 ? C.orange : C.cyan, cornerRadius: 6,
    stroke: i === stack.length - 1 ? '#d97706' : '#64748b', strokeWidth: 1.5, shadowColor:'rgba(0,0,0,.1)', shadowBlur:3 }
}
function stackText(s: string, i: number) {
  return { x: 20 + i * 42, y: 300, width: 36, height: 30, text: s, fontSize: 13, fontFamily:'monospace', fontStyle:'bold',
    fill: i === stack.length - 1 ? '#7c2d12' : '#fff', align:'center', verticalAlign:'middle' }
}
function resetGraph() {
  gNodes.forEach(n => { n.color = C.cyan; n.dist = null })
  gEdges.forEach(e => { e.color = '#94a3b8' })
  stack.splice(0); order.splice(0)
}
async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false }
}

function doReset() { resetGraph(); status.value = ''; opLabel.value = '' }

// ---- 递归 DFS（用帧栈模拟系统调用栈） ----
async function dfsRec(start: string, counter: number): Promise<number> {
  stack.splice(0); stack.push(start)
  const frames: { id: string; next: number }[] = [{ id: start, next: 0 }]
  const n0 = pos(start)
  n0.color = C.orange; n0.dist = ++counter; order.push(start)
  status.value = '递归进入 ' + start + '（发现顺序 ' + counter + '）'
  await d(520)
  while (frames.length) {
    const top = frames[frames.length - 1]
    const u = pos(top.id)
    if (top.next >= adj[top.id].length) {
      frames.pop(); stack.pop()
      u.color = C.green
      status.value = '回溯：' + top.id + ' 的邻居全部处理完'
      await d(340)
    } else {
      const v = adj[top.id][top.next++]
      const vn = pos(v)
      if (vn.color === C.green) continue
      vn.color = C.orange; vn.dist = ++counter
      order.push(v); frames.push({ id: v, next: 0 }); stack.push(v)
      status.value = '递归进入 ' + v + '（发现顺序 ' + counter + '）'
      await d(460)
    }
  }
  return counter
}
async function doDfsRecursive() {
  await act('递归 DFS', '递归 DFS', async () => {
    resetGraph()
    let counter = 0
    for (const id of ['A','B','C','D','E','F','X','Y']) {
      if (pos(id).color !== C.green) counter = await dfsRec(id, counter)
    }
    status.value = '递归 DFS 顺序: ' + order.join(' → ')
  })
}

// ---- 迭代 DFS（显式栈） ----
async function doDfsIterative() {
  await act('迭代 DFS', '迭代 DFS（显式栈）', async () => {
    resetGraph()
    let counter = 0
    for (const start of ['A','B','C','D','E','F','X','Y']) {
      if (pos(start).color === C.green) continue
      stack.splice(0); stack.push(start)
      while (stack.length) {
        const u = stack.pop()!
        const un = pos(u)
        if (un.color === C.green) continue
        un.color = C.orange; un.dist = ++counter; order.push(u)
        status.value = '弹出 ' + u + ' → 访问（顺序 ' + counter + '）'
        await d(420)
        const ns = adj[u].filter(v => pos(v).color !== C.green && pos(v).color !== C.blue)
        for (let i = ns.length - 1; i >= 0; i--) {
          stack.push(ns[i]); pos(ns[i]).color = C.blue
        }
        if (ns.length) status.value = '倒序压入未访问邻居: ' + [...ns].reverse().join(', ')
        await d(320)
        un.color = C.green
        await d(180)
      }
    }
    status.value = '迭代 DFS 顺序: ' + order.join(' → ')
  })
}

// ---- 统计连通分量 ----
async function doCountCC() {
  await act('统计连通分量', '连通分量', async () => {
    resetGraph()
    let cc = 0
    const parts: string[] = []
    const palette = [C.green, C.blue, C.violet]
    for (const start of ['A','B','C','D','E','F','X','Y']) {
      if (pos(start).color !== C.cyan) continue
      cc++
      const members: string[] = []
      const st: string[] = [start]
      pos(start).color = C.orange
      while (st.length) {
        const u = st.pop()!
        const un = pos(u)
        if (un.color === C.green) continue
        un.color = C.orange
        members.push(u)
        status.value = '第 ' + cc + ' 个连通分量扩散中: ' + members.join(' → ')
        await d(300)
        for (const v of adj[u]) {
          const vn = pos(v)
          if (vn.color === C.cyan) { vn.color = C.orange; st.push(v) }
        }
        un.color = C.green
        await d(160)
      }
      const c = palette[(cc - 1) % palette.length]
      members.forEach(m => { pos(m).color = c; pos(m).dist = null })
      parts.push('[' + members.join(', ') + ']')
      status.value = '第 ' + cc + ' 个连通分量: ' + parts[parts.length - 1]
      await d(600)
    }
    status.value = '共 ' + cc + ' 个连通分量: ' + parts.join('  ')
  })
}

// ---- 环检测（三色标记） ----
async function doDetectCycle() {
  await act('检测环', '环检测（三色标记）', async () => {
    resetGraph()
    let counter = 0
    let found = false
    const color3: Record<string, number> = {}
    const path: string[] = []
    async function dfs(u: string): Promise<void> {
      color3[u] = 1
      path.push(u)
      const un = pos(u)
      un.color = C.orange; un.dist = ++counter
      status.value = '进入 ' + u + '（灰色：在递归栈中）'
      await d(400)
      for (const v of adj[u]) {
        if (found) return
        if (color3[v] === 1) {
          found = true
          const idx = path.indexOf(v)
          const cyc = path.slice(idx).concat(v)
          for (let i = 0; i < cyc.length - 1; i++) {
            const e = gEdges.find(e2 => (e2.from===cyc[i] && e2.to===cyc[i+1]) || (e2.from===cyc[i+1] && e2.to===cyc[i]))
            if (e) e.color = C.red
          }
          cyc.forEach(c => { const cn = pos(c); cn.color = C.red; cn.dist = null })
          status.value = '⚠️ 发现环: ' + cyc.join(' → ')
          await d(700)
          return
        }
        if (color3[v] === undefined) await dfs(v)
      }
      color3[u] = 2
      un.color = C.green
      status.value = '完成 ' + u + '（黑色：已出栈）'
      await d(250)
      path.pop()
    }
    for (const start of ['A','B','C','D','E','F','X','Y']) {
      if (color3[start] === undefined) await dfs(start)
      if (found) break
    }
    if (!found) status.value = '✅ 无环'
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
