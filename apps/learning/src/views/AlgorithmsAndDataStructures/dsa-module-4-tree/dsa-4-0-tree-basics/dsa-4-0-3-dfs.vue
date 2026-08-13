<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔍 DFS 遍历：前序与后序</h1>
          <p class="text-sm text-slate-500 mt-1">深度优先——一路走到底，无路可走再回溯</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-0-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：前序 vs 后序的访问顺序
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          DFS（深度优先）对一棵树有两种经典顺序。区别只在<strong>「根」什么时候被访问</strong>：
          <strong>前序</strong> = 先访问根，再递归孩子；<strong>后序</strong> = 先递归完所有孩子，最后才访问根。图中橙圈数字是访问次序。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">前序（先根）：1 → 2 → 5 → 6 → 3 → 7 → 4 → 8 → 9</p>
            <svg viewBox="0 0 360 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <line x1="180" y1="84" x2="100" y2="126" stroke="#94a3b8" stroke-width="2" />
              <line x1="180" y1="84" x2="180" y2="126" stroke="#94a3b8" stroke-width="2" />
              <line x1="180" y1="84" x2="260" y2="126" stroke="#94a3b8" stroke-width="2" />
              <line x1="100" y1="174" x2="75" y2="221" stroke="#94a3b8" stroke-width="2" />
              <line x1="100" y1="174" x2="125" y2="221" stroke="#94a3b8" stroke-width="2" />
              <line x1="180" y1="174" x2="180" y2="221" stroke="#94a3b8" stroke-width="2" />
              <line x1="260" y1="174" x2="235" y2="221" stroke="#94a3b8" stroke-width="2" />
              <line x1="260" y1="174" x2="285" y2="221" stroke="#94a3b8" stroke-width="2" />

              <circle cx="180" cy="60" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="180" y="60" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#fff">1</text>
              <text x="180" y="24" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">①</text>

              <circle cx="100" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="100" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#fff">2</text>
              <text x="100" y="114" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">②</text>
              <circle cx="180" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="180" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#fff">3</text>
              <text x="180" y="114" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑤</text>
              <circle cx="260" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="260" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#fff">4</text>
              <text x="260" y="114" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑦</text>

              <circle cx="75" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="75" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
              <text x="75" y="209" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">③</text>
              <circle cx="125" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="125" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">6</text>
              <text x="125" y="209" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">④</text>
              <circle cx="180" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="180" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">7</text>
              <text x="180" y="209" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑥</text>
              <circle cx="235" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="235" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
              <text x="235" y="209" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑧</text>
              <circle cx="285" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="285" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">9</text>
              <text x="285" y="209" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑨</text>
            </svg>
          </figure>

          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">后序（先孩子）：5 → 6 → 2 → 7 → 3 → 8 → 9 → 4 → 1</p>
            <svg viewBox="0 0 360 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <line x1="180" y1="84" x2="100" y2="126" stroke="#94a3b8" stroke-width="2" />
              <line x1="180" y1="84" x2="180" y2="126" stroke="#94a3b8" stroke-width="2" />
              <line x1="180" y1="84" x2="260" y2="126" stroke="#94a3b8" stroke-width="2" />
              <line x1="100" y1="174" x2="75" y2="221" stroke="#94a3b8" stroke-width="2" />
              <line x1="100" y1="174" x2="125" y2="221" stroke="#94a3b8" stroke-width="2" />
              <line x1="180" y1="174" x2="180" y2="221" stroke="#94a3b8" stroke-width="2" />
              <line x1="260" y1="174" x2="235" y2="221" stroke="#94a3b8" stroke-width="2" />
              <line x1="260" y1="174" x2="285" y2="221" stroke="#94a3b8" stroke-width="2" />

              <circle cx="180" cy="60" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="180" y="60" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#fff">1</text>
              <text x="180" y="24" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑨</text>

              <circle cx="100" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="100" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#fff">2</text>
              <text x="100" y="114" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">③</text>
              <circle cx="180" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="180" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#fff">3</text>
              <text x="180" y="114" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑤</text>
              <circle cx="260" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="260" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#fff">4</text>
              <text x="260" y="114" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑧</text>

              <circle cx="75" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="75" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
              <text x="75" y="209" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">①</text>
              <circle cx="125" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="125" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">6</text>
              <text x="125" y="209" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">②</text>
              <circle cx="180" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="180" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">7</text>
              <text x="180" y="209" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">④</text>
              <circle cx="235" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="235" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
              <text x="235" y="209" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑥</text>
              <circle cx="285" cy="245" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="285" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">9</text>
              <text x="285" y="209" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⑦</text>
            </svg>
          </figure>
        </div>
        <p class="text-xs text-slate-400 mt-2">图 1：橙圈数字 = 访问次序。前序根先访问（①在根），后序根最后访问（⑨在根）。</p>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          什么是 DFS？—— 一路走到底，再回溯
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>深度优先搜索 (Depth-First Search, DFS)</strong> 的策略是：从根出发，<strong>沿着一条路径一直往下走</strong>，
          走到叶子（无路可走）后<strong>回溯</strong>到最近的、还有未访问孩子的节点，继续深入。
          它优先「深」，其次才是「广」——所以叫深度优先。
        </p>
        <ol class="space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>1.</strong> 从根节点出发</li>
          <li><strong>2.</strong> 一路向下，优先访问「第一个」未访问的孩子</li>
          <li><strong>3.</strong> 到达叶子后，回溯到最近一个有「其它孩子」的节点</li>
          <li><strong>4.</strong> 重复 2-3，直到所有节点都访问过</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          DFS 就像<strong>Vue 组件的渲染/patch 过程</strong>——先渲染根组件，然后一路向下递归渲染第一个子组件，子组件又递归它的孩子，直到最深的叶子组件，再回溯到兄弟。<br/>
          也像<strong>React Fiber 的「深度优先」diff</strong>，以及 <code>npm install</code> 的依赖解析：装 A → A 依赖 B → B 依赖 C，一路装到底，再回来装 A 的另一个依赖。</p>
        </aside>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed"><strong>树的 DFS 天然无环，不需要 visited 标记</strong>（这是它与「图 DFS」的关键区别）。因为父子关系方向明确、路径唯一。</p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          前序遍历 —— 先访问根，再访问孩子
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          前序（Preorder）的规则：<strong>先访问当前节点（根），再依次递归每个孩子</strong>。
          它天然适合「先处理父、再处理子」的场景，比如<strong>克隆一棵树</strong>、<strong>序列化</strong>、<strong>打印目录结构</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="preorderCode" title="preorder.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 变色时机（前序）：</strong>节点<strong>第一次被遇到（弹出栈）时</strong>就变色为「已访问」。因为前序要求「根最先」，弹出即访问。<br/>
          <strong>迭代压栈关键：</strong>倒序压孩子（最右孩子先压），栈 LIFO 才能让最左孩子先弹出。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          后序遍历 —— 先访问完孩子，最后访问根
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          后序（Postorder）的规则：<strong>先依次递归完所有孩子，最后才访问根</strong>。
          它适合「先处理子、再处理父」的场景：<strong>计算树的高度</strong>、<strong>统计子树大小</strong>、<strong>删除整棵树</strong>（先删子再删父）、<strong>求目录占用空间</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="postorderCode" title="postorder.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 变色时机（后序）—— 最容易错的地方：</strong>后序必须等<strong>所有孩子都处理完</strong>才访问根。
          迭代实现时，同一个节点会<strong>两次进出栈</strong>（第一次「展开」压孩子，第二次「收尾」才访问），所以要用一个 <code>expanded</code> 标记区分。<br/>
          判断是否「孩子都处理完」的另一种写法是「反转前序法」：前序改为「根→右到左孩子」，结果 reverse 即得后序。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          递归 vs 显式栈 —— 递归的本质
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          递归的 DFS 简洁优雅，但依赖<strong>系统调用栈</strong>；显式栈的 DFS 把「栈」掌握在自己手里，可以<strong>暂停、恢复、限制深度</strong>。
          两者本质相同——<strong>递归就是编译器帮你维护了一个隐式栈</strong>。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">特性</th><th class="px-4 py-2 border border-slate-200 font-semibold">递归</th><th class="px-4 py-2 border border-slate-200 font-semibold">显式栈（迭代）</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">代码行数</td><td class="px-4 py-2 border text-emerald-600">3-5 行</td><td class="px-4 py-2 border text-amber-600">10-20 行</td></tr>
              <tr><td class="px-4 py-2 border">栈深度上限</td><td class="px-4 py-2 border text-red-600">~1 万层（引擎限制）</td><td class="px-4 py-2 border text-emerald-600">只受内存限制</td></tr>
              <tr><td class="px-4 py-2 border">可中断/恢复</td><td class="px-4 py-2 border text-red-600">❌</td><td class="px-4 py-2 border text-emerald-600">✅</td></tr>
              <tr><td class="px-4 py-2 border">适用场景</td><td class="px-4 py-2 border">日常开发、算法题</td><td class="px-4 py-2 border">框架源码、深树防爆栈</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          React 16 重写 <strong>Fiber 架构</strong>的核心动机之一：旧的递归协调<strong>无法被中断</strong>，深树遍历会卡住主线程。
          Fiber 改用<strong>链表 + 显式栈 + while 循环</strong>，实现了可中断、可优先级的 DFS——这正是「显式栈」价值的工程体现。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          常见错误与技巧
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：迭代前序的压栈顺序写反。</strong><br/>
          想要「左→右」访问孩子，必须<strong>倒序压栈</strong>（最右先压）。正序压栈会得到「右→左」的错误顺序。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：后序迭代忘了区分「展开」和「访问」。</strong><br/>
          一个节点后序里会两次碰到（先展开、后访问）。不加 <code>expanded</code> 标记会把「展开时」误当「访问时」，得到前序结果。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：把「树 DFS」套到「图 DFS」却漏了 visited。</strong><br/>
          树无环无需 visited，但图有环——DFS 图时必须加 <code>visited</code> 集合，否则死循环。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆：</strong>「<strong>前序 = 处理在递归前，后序 = 处理在递归后</strong>」。
          求高度/子树大小/删树用<strong>后序</strong>（要先拿到孩子的结果）；克隆/序列化/打印路径用<strong>前序</strong>（要先处理父）。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：前序 / 后序的显式栈模拟
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          观察<strong>变色时机</strong>：<strong>前序</strong>在弹出栈顶时立即变绿（先根）；<strong>后序</strong>节点先「展开」（压孩子）保持青色，等孩子都处理完再变绿（后根）。
          栈中 <code>✓</code> 表示「孩子已处理完，等待访问」。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 栈深度: {{ stack.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">📤 输出: [{{ out.join(', ') }}]</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doPreorder" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">🔍 前序遍历（先根）</button>
          <button @mousedown="doPostorder" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40">🔍 后序遍历（后根）</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-text :config="{x:30, y:8, text:'树（DFS）', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-text :config="{x: stackX, y:10, text:'栈 stack', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-text :config="{x:30, y:318, text:'输出', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-line v-for="e in tEdges" :key="e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="txtCfg(n)" />
              <v-rect v-for="(s,i) in stack" :key="'s'+i" :config="stackRect(s,i)" />
              <v-text v-for="(s,i) in stack" :key="'st'+i" :config="stackText(s,i)" />
              <v-rect v-for="(v,i) in out" :key="'o'+v" :config="outRect(v,i)" />
              <v-text v-for="(v,i) in out" :key="'ot'+v" :config="outText(v,i)" />
            </v-layer>
          </v-stage>
        </div>
        <p class="text-xs text-slate-400 mt-2">🟠 当前处理 &nbsp; 🟢 已访问 &nbsp; 🔵 栈中（未展开）&nbsp; 🟡 栈中（已展开，待访问）</p>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>DFS = 一路走到底再回溯</strong>，天然用递归（隐式栈）或显式栈实现</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>前序（先根）</strong>：弹出栈顶即访问；迭代压孩子要<strong>倒序</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>后序（后根）</strong>：孩子都处理完才访问根；迭代需 <code>expanded</code> 标记</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>变色时机是核心</strong>：前序=入栈/弹出时，后序=孩子返回后</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>递归本质 = 隐式栈</strong>，显式栈可中断、可限深，是框架源码的做法</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>树 DFS 无需 visited</strong>（无环），图 DFS 必须有 visited</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-0-tree-basics/dsa-4-0-2-representation" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：树的存储表示</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-0-tree-basics/dsa-4-0-4-bfs" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：BFS 遍历 →</RouterLink>
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
  { id: "sec-1", name: "什么是 DFS" },
  { id: "sec-2", name: "前序遍历" },
  { id: "sec-3", name: "后序遍历" },
  { id: "sec-4", name: "递归 vs 显式栈" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 DFS 栈模拟动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H = ref(360), W = ref(700)
const R = 24, LEVEL_H = 96, TOP = 60
interface TNode { id: number; x: number; y: number; color: string }
interface SEntry { id: number; expanded: boolean }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{a:number;b:number}[]>([])
const stack = reactive<SEntry[]>([])
const out = reactive<number[]>([])
const busy = ref(false), status = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const child: Record<number, number[]> = { 1:[2,3,4], 2:[5,6], 3:[7], 4:[8,9], 5:[], 6:[], 7:[], 8:[], 9:[] }

const node = (id:number) => tNodes.find(n => n.id === id)!
const stackX = computed(() => Math.max(W.value - 84, 360))

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
  const tw = Math.min(W.value * 0.62, 420)
  const cx = tw / 2
  levels.forEach((lv, li) => {
    const y = TOP + li * LEVEL_H
    lv.forEach((id, i) => tNodes.push({ id, x: cx + (i - (lv.length-1)/2) * 78, y, color: C.cyan }))
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
    fontFamily:'monospace', fontStyle:'bold', fill:n.color===C.ghost?C.muted:'#fff', align:'center', verticalAlign:'middle' }
}
function stackRect(s: SEntry, i: number) {
  const isTop = i === stack.length - 1
  const y = 250 - i * 38
  return { x: stackX.value, y, width: 60, height: 32, fill: s.expanded ? C.warn : C.cyan, cornerRadius: 6,
    stroke: isTop ? C.orange : '#64748b', strokeWidth: isTop ? 2.5 : 1.5, shadowColor:'rgba(0,0,0,.1)', shadowBlur:3 }
}
function stackText(s: SEntry, i: number) {
  const y = 250 - i * 38
  return { x: stackX.value, y, width: 60, height: 32, text: s.expanded ? s.id + ' ✓' : String(s.id),
    fontSize: 14, fontFamily:'monospace', fontStyle:'bold', fill: s.expanded ? '#7c2d12' : C.text, align:'center', verticalAlign:'middle' }
}
function outRect(v: number, i: number) {
  return { x: 20 + i*44, y: 322, width: 38, height: 30, fill: C.green, cornerRadius: 6, stroke:'#64748b', strokeWidth: 1, shadowColor:'rgba(0,0,0,.08)', shadowBlur:2 }
}
function outText(v: number, i: number) {
  return { x: 20 + i*44, y: 322, width: 38, height: 30, text: String(v), fontSize: 14, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle' }
}
async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch(_) {}
  finally { await d(300); busy.value = false }
}
function resetState() {
  stack.length = 0
  out.length = 0
  tNodes.forEach(n => { n.color = C.cyan })
}

function doReset() { resetState(); status.value = '' }

async function doPreorder() {
  act('前序遍历  根→孩子  O(n)', async () => {
    resetState()
    const order: number[] = []
    stack.push({ id: 1, expanded: false })
    while (stack.length) {
      const top = stack.pop()!
      const n = node(top.id)
      n.color = C.orange
      status.value = `弹出 ${top.id} → 访问`
      await d(360)
      out.push(top.id); order.push(top.id)
      n.color = C.green
      await d(120)
      const kids = child[top.id]
      for (let i = kids.length - 1; i >= 0; i--) {
        stack.push({ id: kids[i], expanded: false })
        status.value = `倒序压入孩子 ${kids[i]}`
        await d(200)
      }
    }
    status.value = `前序: ${order.join(' → ')}`
  })
}

async function doPostorder() {
  act('后序遍历  孩子→根  O(n)', async () => {
    resetState()
    const order: number[] = []
    stack.push({ id: 1, expanded: false })
    while (stack.length) {
      const top = stack.pop()!
      const n = node(top.id)
      if (top.expanded) {
        n.color = C.orange
        status.value = `孩子都处理完 → 访问 ${top.id}`
        await d(360)
        out.push(top.id); order.push(top.id)
        n.color = C.green
        await d(120)
      } else {
        n.color = C.orange
        status.value = `展开 ${top.id}，压入自身(待访问) + 倒序孩子`
        await d(260)
        stack.push({ id: top.id, expanded: true })
        const kids = child[top.id]
        for (let i = kids.length - 1; i >= 0; i--) {
          stack.push({ id: kids[i], expanded: false })
          await d(160)
        }
        n.color = C.cyan
      }
    }
    status.value = `后序: ${order.join(' → ')}`
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

const preorderCode = `// ===== 前序遍历（Preorder）：根 → 孩子 =====
// 通用多叉树节点
interface TreeNode { val: number; children: TreeNode[] }

// ① 递归版 —— 先访问根，再递归孩子
function preorderRecursive(node: TreeNode | null, res: number[]): void {
    if (!node) return
    res.push(node.val)                     // 先根
    for (const c of node.children) {
        preorderRecursive(c, res)          // 再孩子（从左到右）
    }
}

// ② 迭代版 —— 显式栈
function preorder(root: TreeNode): number[] {
    if (!root) return []
    const res: number[] = []
    const stack: TreeNode[] = [root]

    while (stack.length) {
        const node = stack.pop()!          // 弹出栈顶 = 先访问
        res.push(node.val)

        // ★ 倒序压孩子（最右先压），LIFO 保证最左孩子先弹出
        for (let i = node.children.length - 1; i >= 0; i--) {
            stack.push(node.children[i])
        }
    }
    return res
}
// 示例树结果: [1, 2, 5, 6, 3, 7, 4, 8, 9]

// 典型应用：克隆树、序列化、打印「父路径」（先处理父）`

const postorderCode = `// ===== 后序遍历（Postorder）：孩子 → 根 =====

// ① 递归版 —— 先递归完孩子，最后访问根
function postorderRecursive(node: TreeNode | null, res: number[]): void {
    if (!node) return
    for (const c of node.children) {
        postorderRecursive(c, res)
    }
    res.push(node.val)                     // 后根
}

// ② 迭代版 —— 状态栈（expanded 标记「孩子是否处理完」）
function postorder(root: TreeNode): number[] {
    if (!root) return []
    const res: number[] = []
    const stack: { node: TreeNode; expanded: boolean }[] = [{ node: root, expanded: false }]

    while (stack.length) {
        const top = stack.pop()!
        if (top.expanded) {
            res.push(top.node.val)         // 孩子都处理完 → 访问（后序时机）
        } else {
            // 第一次遇到：压入「展开后待访问」标记 + 倒序压孩子
            stack.push({ node: top.node, expanded: true })
            for (let i = top.node.children.length - 1; i >= 0; i--) {
                stack.push({ node: top.node.children[i], expanded: false })
            }
        }
    }
    return res
}
// 示例树结果: [5, 6, 2, 7, 3, 8, 9, 4, 1]

// ③ 另一种等价写法：反转前序法
// 前序改成「根 → 右到左孩子」，结果 reverse() 即得后序
function postorderByReverse(root: TreeNode): number[] {
    if (!root) return []
    const res: number[] = []
    const stack: TreeNode[] = [root]
    while (stack.length) {
        const node = stack.pop()!
        res.push(node.val)
        for (const c of node.children) stack.push(c)  // 正序压 → 弹出时从右到左
    }
    res.reverse()
    return res
}

// 典型应用：求树高、统计子树大小、删除整棵树（先删子再删父）`
</script>
