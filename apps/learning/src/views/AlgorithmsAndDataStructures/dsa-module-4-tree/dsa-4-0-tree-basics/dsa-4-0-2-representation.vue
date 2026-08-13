<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">💾 树的存储表示</h1>
          <p class="text-sm text-slate-500 mt-1">链式 / 邻接表 / 父节点数组 / 孩子兄弟——四种表示法的取舍</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-0-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：同一棵树，四种存法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          存储树的方式取决于<strong>要频繁做什么操作</strong>——是「从父找孩子」，还是「从孩子找父」。
          下面同一棵示例树用三种主流方式对照（第四种「孩子兄弟」在正文 + 动画详解）。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure class="border border-slate-100 rounded-xl p-3">
            <p class="text-xs text-slate-500 font-semibold mb-1">① 链式存储：每个节点存孩子指针数组</p>
            <svg viewBox="0 0 320 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="rep-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <rect x="10" y="26" width="46" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="33" y="42" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">1</text>
              <line x1="56" y1="42" x2="84" y2="42" stroke="#94a3b8" stroke-width="2" marker-end="url(#rep-arr)" />
              <text x="100" y="42" text-anchor="start" dominant-baseline="central" font-size="13" font-family="monospace" fill="#1e293b">[2, 3, 4]</text>

              <rect x="10" y="74" width="46" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="33" y="90" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">2</text>
              <line x1="56" y1="90" x2="84" y2="90" stroke="#94a3b8" stroke-width="2" marker-end="url(#rep-arr)" />
              <text x="100" y="90" text-anchor="start" dominant-baseline="central" font-size="13" font-family="monospace" fill="#1e293b">[5, 6]</text>

              <rect x="10" y="122" width="46" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="33" y="138" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">3</text>
              <line x1="56" y1="138" x2="84" y2="138" stroke="#94a3b8" stroke-width="2" marker-end="url(#rep-arr)" />
              <text x="100" y="138" text-anchor="start" dominant-baseline="central" font-size="13" font-family="monospace" fill="#1e293b">[7]</text>

              <rect x="10" y="170" width="46" height="32" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="33" y="186" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
              <line x1="56" y1="186" x2="84" y2="186" stroke="#94a3b8" stroke-width="2" marker-end="url(#rep-arr)" />
              <text x="100" y="186" text-anchor="start" dominant-baseline="central" font-size="13" font-family="monospace" fill="#1e293b">[]  叶子</text>
            </svg>
          </figure>

          <figure class="border border-slate-100 rounded-xl p-3">
            <p class="text-xs text-slate-500 font-semibold mb-1">② 邻接表：Map 存孩子列表</p>
            <svg viewBox="0 0 320 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="20" width="300" height="30" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
              <text x="20" y="35" text-anchor="start" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">Map&lt;number, number[]&gt;</text>
              <text x="20" y="65" text-anchor="start" dominant-baseline="central" font-size="13" font-family="monospace" fill="#1e293b">1 → [2, 3, 4]</text>
              <text x="20" y="89" text-anchor="start" dominant-baseline="central" font-size="13" font-family="monospace" fill="#1e293b">2 → [5, 6]</text>
              <text x="20" y="113" text-anchor="start" dominant-baseline="central" font-size="13" font-family="monospace" fill="#1e293b">3 → [7]</text>
              <text x="20" y="137" text-anchor="start" dominant-baseline="central" font-size="13" font-family="monospace" fill="#1e293b">4 → [8, 9]</text>
              <text x="20" y="161" text-anchor="start" dominant-baseline="central" font-size="13" font-family="monospace" fill="#64748b">5/6/7/8/9 → []</text>
              <text x="20" y="185" text-anchor="start" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0891b2">O(1) 取孩子的完整列表</text>
            </svg>
          </figure>

          <figure class="border border-slate-100 rounded-xl p-3">
            <p class="text-xs text-slate-500 font-semibold mb-1">③ 父节点数组：每个节点只记「爸爸」</p>
            <svg viewBox="0 0 320 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="16" y="22" font-size="11" font-family="monospace" fill="#64748b">parent[]（下标 = 节点，值 = 父）</text>
              <!-- index row -->
              <text x="30" y="52" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">i</text>
              <text x="30" y="120" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#1e293b" font-weight="bold">p</text>
              <rect x="44" y="34" width="30" height="30" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
              <text x="59" y="49" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">1</text>
              <rect x="74" y="34" width="30" height="30" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
              <text x="89" y="49" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">2</text>
              <rect x="104" y="34" width="30" height="30" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
              <text x="119" y="49" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">3</text>
              <rect x="134" y="34" width="30" height="30" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
              <text x="149" y="49" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">4</text>
              <rect x="164" y="34" width="30" height="30" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
              <text x="179" y="49" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">5</text>
              <rect x="194" y="34" width="30" height="30" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
              <text x="209" y="49" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">6</text>
              <rect x="224" y="34" width="30" height="30" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
              <text x="239" y="49" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">7</text>
              <rect x="254" y="34" width="30" height="30" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
              <text x="269" y="49" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">8</text>
              <rect x="284" y="34" width="30" height="30" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
              <text x="299" y="49" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">9</text>
              <!-- value row -->
              <rect x="44" y="70" width="30" height="30" rx="4" fill="#f59e0b" stroke="#d97706" stroke-width="1" />
              <text x="59" y="85" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">-1</text>
              <rect x="74" y="70" width="30" height="30" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="89" y="85" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">1</text>
              <rect x="104" y="70" width="30" height="30" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="119" y="85" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">1</text>
              <rect x="134" y="70" width="30" height="30" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="149" y="85" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">1</text>
              <rect x="164" y="70" width="30" height="30" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="179" y="85" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">2</text>
              <rect x="194" y="70" width="30" height="30" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="209" y="85" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">2</text>
              <rect x="224" y="70" width="30" height="30" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="239" y="85" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">3</text>
              <rect x="254" y="70" width="30" height="30" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="269" y="85" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">4</text>
              <rect x="284" y="70" width="30" height="30" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="299" y="85" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">4</text>
              <text x="16" y="120" font-size="11" font-family="monospace" fill="#0891b2">parent[1] = -1（根）</text>
            </svg>
          </figure>

          <figure class="border border-slate-100 rounded-xl p-3">
            <p class="text-xs text-slate-500 font-semibold mb-1">④ 孩子兄弟表示法：firstChild + nextSibling</p>
            <svg viewBox="0 0 320 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="cs-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a" />
                </marker>
                <marker id="cs-arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
              </defs>
              <line x1="160" y1="70" x2="95" y2="120" stroke="#16a34a" stroke-width="2" marker-end="url(#cs-arr)" />
              <line x1="95" y1="120" x2="60" y2="150" stroke="#16a34a" stroke-width="2" marker-end="url(#cs-arr)" />
              <line x1="95" y1="120" x2="160" y2="150" stroke="#f59e0b" stroke-width="2" marker-end="url(#cs-arr2)" />
              <circle cx="160" cy="50" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="160" y="50" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">1</text>
              <circle cx="95" cy="104" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="95" y="104" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#fff">2</text>
              <circle cx="60" cy="134" r="16" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="60" y="134" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
              <circle cx="160" cy="134" r="16" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="160" y="134" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">3</text>
              <text x="220" y="80" text-anchor="start" dominant-baseline="central" font-size="11" font-family="monospace" fill="#16a34a">↓ firstChild(左)</text>
              <text x="220" y="100" text-anchor="start" dominant-baseline="central" font-size="11" font-family="monospace" fill="#f59e0b">→ nextSibling(右)</text>
            </svg>
          </figure>
        </div>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          链式存储 —— 每个节点存孩子指针数组
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          最直观的存法：每个节点维护一个 <code>children</code> 数组，存放指向所有孩子的指针。
          <strong>「父 → 孩子」查询是 O(1)</strong>，但「孩子 → 父」查询需要遍历整棵树，是 O(n)。
        </p>
        <div class="mb-4"><Code language="ts" :code="chainCode" title="linked_children.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          链式存储就是 DOM 的 <code>element.children</code>——一个 <code>HTMLCollection</code> 数组，元素通过它拿到所有子元素。<br/>
          但 DOM 里 <code>element.parentElement</code> 是 O(1) 的，因为浏览器<strong>额外存了反向指针</strong>——这正是「链式存储」缺父指针的代价。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          邻接表 —— Map 存孩子列表（图也这么存）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          邻接表把「节点 → 孩子列表」的映射集中放进一个 <code>Map</code>。它和链式存储<strong>本质等价</strong>，
          但更适合<strong>节点编号不连续</strong>、或需要「按 id 快速定位某个节点」的场景，也是下一模块「图」的标准存储方式。
        </p>
        <div class="mb-4"><Code language="ts" :code="adjacencyCode" title="adjacency_list.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>树的邻接表 = 图的邻接表的「无向、无环」特例。树天然无环，所以遍历时<strong>不需要 visited 集合</strong>（图必须有，否则死循环）。记住这点，学图遍历时会轻松很多。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          父节点数组 —— 并查集 (Union-Find) 的基础
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          只用一个数组 <code>parent[]</code>：<code>parent[i]</code> 存节点 i 的<strong>父亲</strong>，根的父亲记为 <code>-1</code>（或自身）。
          「孩子 → 父」是 O(1)，但「父 → 孩子」很慢。它<strong>极省内存</strong>，是并查集、最小生成树（Kruskal）的底层结构。
        </p>
        <div class="mb-4"><Code language="ts" :code="parentCode" title="parent_array.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          父节点数组就像 <code>git</code> 的提交历史——每个 commit 只存一个 <code>parent</code> 指针，从当前 commit 往上找祖先 O(1)，但要列出「这个 commit 的所有后代」就难了。<br/>
          也像 React 的 <code>fiber.return</code> 指针：每个 fiber 只指向父节点，配合 <code>child</code>/<code>sibling</code> 才能双向遍历。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          孩子兄弟表示法 —— 多叉树变二叉树的魔法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          每个节点只保留<strong>两个指针</strong>：<code>firstChild</code>（第一个孩子）和 <code>nextSibling</code>（下一个兄弟）。
          于是<strong>任意多叉树都能用二叉树结构表示</strong>——这是很多「用二叉树处理任意树」算法的基石（如文件系统、B 树的扁平化）。
        </p>
        <div class="mb-4"><Code language="ts" :code="childSiblingCode" title="child_sibling.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 转换规则（死记）：</strong><br/>
          ① 每个节点的<strong>第一个孩子</strong> = 它的 <code>左孩子 (left)</code>；<br/>
          ② 每个节点的<strong>下一个兄弟</strong> = 它的 <code>右孩子 (right)</code>。<br/>
          于是「左指针 = 纵向子孙，右指针 = 横向兄弟」，一棵多叉树被「拍平」成二叉树。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>转换后的二叉树<strong>通常高度更大、形状更偏</strong>（因为兄弟全挂在右链上），这是「用统一结构换空间/算法统一」的代价，不代表多叉树退化。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          四种表示法对比与选择
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">表示法</th><th class="px-4 py-2 border border-slate-200 font-semibold">父→孩子</th><th class="px-4 py-2 border border-slate-200 font-semibold">孩子→父</th><th class="px-4 py-2 border border-slate-200 font-semibold">内存</th><th class="px-4 py-2 border border-slate-200 font-semibold">典型用途</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">链式 children[]</td><td class="px-4 py-2 border text-emerald-600">O(1)</td><td class="px-4 py-2 border text-red-600">O(n)</td><td class="px-4 py-2 border">中（每节点一个数组）</td><td class="px-4 py-2 border">通用树、文件系统</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">邻接表 Map</td><td class="px-4 py-2 border text-emerald-600">O(1)</td><td class="px-4 py-2 border text-red-600">O(n)</td><td class="px-4 py-2 border">中</td><td class="px-4 py-2 border">图、稀疏邻接关系</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">父节点数组</td><td class="px-4 py-2 border text-red-600">O(n)</td><td class="px-4 py-2 border text-emerald-600">O(1)</td><td class="px-4 py-2 border text-emerald-600">最小（一个数组）</td><td class="px-4 py-2 border">并查集、LCA、Kruskal</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">孩子兄弟</td><td class="px-4 py-2 border text-emerald-600">O(1)</td><td class="px-4 py-2 border text-red-600">O(n)</td><td class="px-4 py-2 border">小（每节点 2 指针）</td><td class="px-4 py-2 border">多叉转二叉、统一算法</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 选择法则：</strong>看<strong>主操作</strong>——经常「父找孩子」选链式/邻接表；经常「孩子找父」选父数组；要<strong>统一用二叉树算法处理多叉树</strong>选孩子兄弟。工程中「链式 + 额外父指针」（双亲表示法）最常用。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：邻接表查询 + 孩子兄弟转换
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>邻接表查询</strong>：逐个高亮节点，展示它的孩子列表。<strong>孩子兄弟转换</strong>：把多叉树「拍平」成二叉树——<span class="text-green-600 font-semibold">绿边=首孩子(左)</span>，<span class="text-amber-600 font-semibold">橙边=右兄弟(右)</span>。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ tNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">{{ mode === 'tree' ? '🌲 普通树' : '🌿 孩子兄弟(二叉)' }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doAdjacency" :disabled="busy || mode!=='tree'" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">🔍 邻接表查询</button>
          <button @mousedown="doConvert" :disabled="busy || mode!=='tree'" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40">🌿 孩子兄弟转换</button>
          <button @mousedown="doRestore" :disabled="busy || mode!=='bin'" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:shadow-sm disabled:opacity-40">↩ 还原为普通树</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="e.a+'-'+e.b+'-'+(e.kind||'')" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="txtCfg(n)" />
            </v-layer>
          </v-stage>
        </div>
        <div class="mt-2 bg-slate-50 rounded-lg p-3 border border-slate-200">
          <p class="text-xs text-slate-500 font-semibold mb-1">邻接表（当前示例）：</p>
          <p class="text-xs font-mono text-slate-600 leading-relaxed">1 → [2, 3, 4]&nbsp;&nbsp; 2 → [5, 6]&nbsp;&nbsp; 3 → [7]&nbsp;&nbsp; 4 → [8, 9]&nbsp;&nbsp; 5/6/7/8/9 → []</p>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>链式存储 children[]</strong>：父找孩子 O(1)，最直观通用</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>邻接表 Map</strong>：与链式等价，适合编号不连续/图结构</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>父节点数组 parent[]</strong>：孩子找父 O(1)，并查集的基础</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>孩子兄弟 firstChild+nextSibling</strong>：把多叉树拍平成二叉树</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>选择由主操作决定</strong>：父→孩子 vs 孩子→父 vs 内存 vs 算法统一</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-0-tree-basics/dsa-4-0-1-definition" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：树的定义与基本术语</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-0-tree-basics/dsa-4-0-3-dfs" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：DFS 遍历 →</RouterLink>
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
  { id: "sec-1", name: "链式存储" },
  { id: "sec-2", name: "邻接表" },
  { id: "sec-3", name: "父节点数组" },
  { id: "sec-4", name: "孩子兄弟" },
  { id: "sec-5", name: "对比与选择" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 表示法动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H = ref(340), W = ref(700)
const R = 24, LEVEL_H = 100, TOP = 56
interface TNode { id: number; x: number; y: number; color: string }
interface Edge { a: number; b: number; kind?: 'fc'|'ns' }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<Edge[]>([])
const busy = ref(false), status = ref(''), mode = ref<'tree'|'bin'>('tree')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

const child: Record<number, number[]> = { 1:[2,3,4], 2:[5,6], 3:[7], 4:[8,9], 5:[], 6:[], 7:[], 8:[], 9:[] }
const binChild: Record<number, [number|null, number|null]> = {
  1: [2, null], 2: [5, 3], 5: [null, 6], 3: [7, 4], 4: [8, null], 8: [null, 9],
  6: [null, null], 7: [null, null], 9: [null, null],
}

const node = (id:number) => tNodes.find(n => n.id === id)!

function treeTarget(): Record<number,{x:number;y:number}> {
  const target: Record<number,{x:number;y:number}> = {}
  const levels: number[][] = []
  let frontier = [1]
  while (frontier.length) {
    levels.push(frontier)
    const next: number[] = []
    frontier.forEach(id => child[id].forEach(c => next.push(c)))
    frontier = next
  }
  levels.forEach((lv, li) => {
    const y = TOP + li * LEVEL_H
    lv.forEach((id, i) => { target[id] = { x: W.value*(i+1)/(lv.length+1), y } })
  })
  return target
}
function binTarget(): Record<number,{x:number;y:number}> {
  const unit = (W.value - 80) / 8
  const target: Record<number,{x:number;y:number}> = {}
  let nextX = 0
  ;(function assign(id: number, depth: number) {
    const [l, r] = binChild[id]
    if (l != null) assign(l, depth+1)
    target[id] = { x: 40 + nextX*unit, y: 40 + depth*68 }
    nextX++
    if (r != null) assign(r, depth+1)
  })(1, 0)
  return target
}
function buildTreeEdges() {
  tEdges.length = 0
  for (const id of Object.keys(child)) {
    child[+id].forEach(c => tEdges.push({ a: +id, b: c }))
  }
}
function buildBinEdges() {
  tEdges.length = 0
  for (const id of Object.keys(binChild)) {
    const [l, r] = binChild[+id]
    if (l != null) tEdges.push({ a: +id, b: l, kind: 'fc' })
    if (r != null) tEdges.push({ a: +id, b: r, kind: 'ns' })
  }
}
function layout() {
  tNodes.length = 0
  const target = mode.value === 'tree' ? treeTarget() : binTarget()
  for (const id of Object.keys(target)) {
    const t = target[+id]
    tNodes.push({ id: +id, x: t.x, y: t.y, color: C.cyan })
  }
  if (mode.value === 'tree') buildTreeEdges(); else buildBinEdges()
}
function edgeCfg(e: Edge) {
  const pa = node(e.a), pb = node(e.b)
  const col = e.kind === 'fc' ? C.green : e.kind === 'ns' ? C.orange : '#94a3b8'
  return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke: col, strokeWidth: 2 }
}
function circleCfg(n:any) {
  return { x:n.x, y:n.y, radius:R, fill:n.color, stroke:'#64748b', strokeWidth:1.5,
    shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
}
function txtCfg(n:any) {
  return { x:n.x-R, y:n.y-R, width:R*2, height:R*2, text:String(n.id), fontSize:15,
    fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle' }
}
async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false }
}
async function animateMove(target: Record<number,{x:number;y:number}>) {
  const start = tNodes.map(n => ({ id: n.id, x: n.x, y: n.y }))
  const steps = 16
  for (let s = 1; s <= steps; s++) {
    const t = s / steps
    for (const n of tNodes) {
      const st = start.find(o => o.id === n.id)!
      const tg = target[n.id]
      n.x = st.x + (tg.x - st.x) * t
      n.y = st.y + (tg.y - st.y) * t
    }
    await d(26)
  }
}

function doReset() {
  mode.value = 'tree'; H.value = 340; layout(); status.value = ''
}

async function doAdjacency() {
  act('邻接表查询 O(1)', async () => {
    doReset()
    const order = [1,2,3,4,5,6,7,8,9]
    for (const id of order) {
      const n = node(id); n.color = C.orange
      status.value = `adj[${id}] = [${child[id].join(', ') || '∅'}]`
      await d(380)
      n.color = child[id].length ? C.cyan : C.green
    }
    status.value = '邻接表遍历完成'
  })
}

async function doConvert() {
  act('孩子兄弟转换  首孩子=左  右兄弟=右', async () => {
    mode.value = 'bin'; H.value = 440
    buildBinEdges()
    await animateMove(binTarget())
    status.value = '转换完成：左指针=首孩子(绿)，右指针=右兄弟(橙)'
  })
}

async function doRestore() {
  act('还原为普通树', async () => {
    mode.value = 'tree'; H.value = 340
    await animateMove(treeTarget())
    buildTreeEdges()
    status.value = '已还原为普通树'
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

const chainCode = `// ===== 链式存储：每个节点存孩子指针数组 =====
interface TreeNode {
    val: number
    children: TreeNode[]   // 孩子数组，长度不定
}

// 构造示例树（与结构图一致）
const root: TreeNode = {
    val: 1,
    children: [
        { val: 2, children: [{ val: 5, children: [] }, { val: 6, children: [] }] },
        { val: 3, children: [{ val: 7, children: [] }] },
        { val: 4, children: [{ val: 8, children: [] }, { val: 9, children: [] }] },
    ],
}

// 优点：父 → 孩子 O(1)，直观
// 缺点：孩子 → 父 O(n)（要遍历整棵树找父）
// 工程中常加一个 parent 指针，变成「双亲表示法」：
interface TreeNodeWithParent {
    val: number
    children: TreeNodeWithParent[]
    parent: TreeNodeWithParent | null   // 额外父指针，反向查询也 O(1)
}`

const adjacencyCode = `// ===== 邻接表：Map 存「节点 → 孩子列表」 =====
// 节点用编号表示，children 用数组存编号
const adj: Map<number, number[]> = new Map([
    [1, [2, 3, 4]],
    [2, [5, 6]],
    [3, [7]],
    [4, [8, 9]],
    [5, []],
    [6, []],
    [7, []],
    [8, []],
    [9, []],
])

// 取节点 2 的所有孩子：O(1)
console.log(adj.get(2))   // [5, 6]

// 邻接表 vs 链式：本质等价，区别在于
// 1) 节点用「编号」而非「对象引用」，方便序列化/存文件
// 2) 适合节点编号不连续（如 id = 100, 200, 300）
// 3) 图（下一模块）也用邻接表存：Map<节点, 邻居列表[]>

// 邻接表的遍历（DFS 递归版）
function dfs(adj: Map<number, number[]>, node: number): void {
    console.log(node)                     // 访问
    for (const c of adj.get(node) ?? []) dfs(adj, c)
}
dfs(adj, 1)   // 1 2 5 6 3 7 4 8 9`

const parentCode = `// ===== 父节点数组：每个节点只记「爸爸」 =====
// parent[i] = 节点 i 的父亲；根的父亲 = -1
const parent = [-1, 1, 1, 1, 2, 2, 3, 4, 4]  // 下标 1~9 有意义，parent[0] 占位
//              1  2  3  4  5  6  7  8  9   （节点编号）

// 孩子 → 父：O(1)
function findParent(node: number): number {
    return parent[node]
}
console.log(findParent(5))   // 2

// 从节点 9 一路向上找根（祖先链）
function ancestors(node: number): number[] {
    const path: number[] = []
    while (node !== -1) {
        path.push(node)
        node = parent[node]
    }
    return path
}
console.log(ancestors(9))    // [9, 4, 1]

// ===== 并查集：父数组 + 路径压缩 =====
// find：沿父指针找根（带路径压缩，均摊 O(α(n)) ≈ O(1)）
function find(x: number): number {
    if (parent[x] === -1 || parent[x] === x) return x
    parent[x] = find(parent[x])   // 路径压缩
    return parent[x]
}
// 注意：并查集里根的 parent 常指向自身（x），而非 -1，两种约定皆可`

const childSiblingCode = `// ===== 孩子兄弟表示法：firstChild + nextSibling =====
// 每个节点只有两个指针，把多叉树「拍平」成二叉树
interface CSNode {
    val: number
    firstChild: CSNode | null   // 第一个孩子 → 二叉树左孩子
    nextSibling: CSNode | null  // 下一个兄弟 → 二叉树右孩子
}

// 转换规则（与结构图/动画一致）：
//   节点的「第一个孩子」 = 它的 left
//   节点的「下一个兄弟」 = 它的 right
// 示例树转换后（左 = firstChild，右 = nextSibling）：
//      1.left = 2
//      2.left = 5, 2.right = 3
//      5.right = 6
//      3.left = 7, 3.right = 4
//      4.left = 8
//      8.right = 9

// ===== 从「链式 children[]」自动转「孩子兄弟」=====
function toChildSibling(root: TreeNode): CSNode {
    const conv = (node: TreeNode): CSNode => {
        const cs: CSNode = { val: node.val, firstChild: null, nextSibling: null }
        // 孩子们首尾相连：firstChild = children[0]，逐个挂 nextSibling
        let prev: CSNode | null = null
        for (const c of node.children) {
            const cc = conv(c)
            if (prev === null) cs.firstChild = cc
            else prev.nextSibling = cc
            prev = cc
        }
        return cs
    }
    return conv(root)
}

// 意义：任意多叉树都能用「二叉树的算法」处理（统一左=纵向、右=横向）
// 代价：转换后的二叉树通常更深、更偏（兄弟都挂在右链上）`
</script>
