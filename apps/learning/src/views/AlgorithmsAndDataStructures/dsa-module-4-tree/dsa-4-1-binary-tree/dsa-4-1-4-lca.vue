<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌳 最近公共祖先（LCA）问题</h1>
          <p class="text-sm text-slate-500 mt-1">找两个节点「往上最近」的共同祖先——递归分治 / 父指针回溯 / 树上倍增</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-1-4</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：两个节点的「最近公共祖先」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          最近公共祖先（Lowest Common Ancestor, <strong>LCA</strong>）：在一棵有根树里，节点 <code>p</code> 和 <code>q</code> 的 LCA 是
          <strong>同时是 p、q 祖先的节点中，深度最深的那个</strong>。通俗说：从 p、q 各自向上走，<strong>第一次「汇合」的那个节点</strong>。
          一个节点可以是自己的祖先，所以「p 是 q 的祖先」时，LCA 就是 p 本身。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 360" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="lca-e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">一棵普通二叉树（无排序要求，LCA 适用于任意有根树）</text>

            <!-- 边 -->
            <line x1="360" y1="74" x2="180" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#lca-e)" />
            <line x1="360" y1="74" x2="540" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#lca-e)" />
            <line x1="180" y1="174" x2="90" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#lca-e)" />
            <line x1="180" y1="174" x2="270" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#lca-e)" />
            <line x1="540" y1="174" x2="450" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#lca-e)" />
            <line x1="540" y1="174" x2="630" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#lca-e)" />
            <line x1="270" y1="274" x2="200" y2="326" stroke="#94a3b8" stroke-width="2" marker-end="url(#lca-e)" />
            <line x1="270" y1="274" x2="340" y2="326" stroke="#94a3b8" stroke-width="2" marker-end="url(#lca-e)" />

            <!-- 节点 -->
            <circle cx="360" cy="50" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="50" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <circle cx="180" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="180" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <circle cx="540" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="540" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <circle cx="90" cy="250" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="90" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
            <circle cx="270" cy="250" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="270" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <circle cx="450" cy="250" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="450" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <circle cx="630" cy="250" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="630" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <circle cx="200" cy="350" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="200" y="350" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <circle cx="340" cy="350" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="340" y="350" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：普通二叉树 —— LCA 不依赖任何排序性质，只依赖「树形 + 祖先关系」</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：LCA(5, 1) = 3（橙）—— p、q 分居左右子树</h3>
        <figure>
          <svg viewBox="0 0 720 360" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="lca-o" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <!-- 边 -->
            <line x1="360" y1="74" x2="180" y2="126" stroke="#f59e0b" stroke-width="2.5" />
            <line x1="360" y1="74" x2="540" y2="126" stroke="#f59e0b" stroke-width="2.5" />
            <line x1="180" y1="174" x2="90" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#lca-o)" />
            <line x1="180" y1="174" x2="270" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#lca-o)" />
            <line x1="540" y1="174" x2="450" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#lca-o)" />
            <line x1="540" y1="174" x2="630" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#lca-o)" />
            <line x1="270" y1="274" x2="200" y2="326" stroke="#94a3b8" stroke-width="2" marker-end="url(#lca-o)" />
            <line x1="270" y1="274" x2="340" y2="326" stroke="#94a3b8" stroke-width="2" marker-end="url(#lca-o)" />

            <!-- LCA 节点（橙） -->
            <circle cx="360" cy="50" r="24" fill="#f59e0b" stroke="#d97706" stroke-width="3" />
            <text x="360" y="50" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <text x="360" y="6" text-anchor="middle" font-size="11" font-family="monospace" fill="#f59e0b" font-weight="bold">LCA</text>

            <!-- 目标节点（绿） -->
            <circle cx="180" cy="150" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="3" />
            <text x="180" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
            <circle cx="540" cy="150" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="3" />
            <text x="540" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>

            <!-- 其余节点变灰 -->
            <circle cx="90" cy="250" r="24" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="90" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#64748b">6</text>
            <circle cx="270" cy="250" r="24" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="270" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#64748b">2</text>
            <circle cx="450" cy="250" r="24" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="450" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#64748b">9</text>
            <circle cx="630" cy="250" r="24" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="630" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#64748b">8</text>
            <circle cx="200" cy="350" r="24" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="200" y="350" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#64748b">7</text>
            <circle cx="340" cy="350" r="24" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="340" y="350" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#64748b">4</text>

            <text x="16" y="348" font-size="11" font-family="monospace" fill="#f59e0b">LCA(5,1)=3：5 在左子树、1 在右子树 → 根 3 是第一次分叉处</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：递归分治——p、q 分别落在左右子树时，当前节点就是 LCA</figcaption>
        </figure>
      </section>

      <!-- 1. 定义 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          定义与「祖先」的边界
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          三个必须记住的边界，缺一个都会写错代码：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>节点是它自己的祖先</strong>——所以 LCA(p, p) = p，LCA(p, q) 当 p 是 q 的祖先时 = p</li>
          <li>LCA 要求<strong>同时是两者的祖先</strong>，且<strong>深度最深</strong>（离它们最近）</li>
          <li>「普通二叉树」和「BST」不同——普通树必须遍历 O(n)；BST 可以利用大小关系降到 O(h)（本模块 4-2 会讲 #235）</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          LCA 就像 <strong>DOM 树里两个节点最近的公共容器</strong>——事件从两个目标向上冒泡，第一个「能同时到达两者的节点」就是 LCA，
          这正是事件委托里 <code>e.target.closest('.card')</code> 的树形版。<br/>
          也像 <strong>React 里「状态提升到最近公共父组件」</strong>——两个子组件要共享状态，就把状态放到它们的 <strong>LCA 组件</strong>上。
          （后端里 <code>git merge-base</code> 找两个分支的最近公共提交，是同一概念。）
          </p>
        </aside>
      </section>

      <!-- 2. 递归分治（重点） -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          递归分治（重点，LeetCode #236）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          这是最优雅的解法，本质是<strong>后序遍历自底向上</strong>：先探完左右子树，再根据「左右各找到什么」判断当前节点是不是 LCA。
          返回值语义很关键——返回的是<strong>「当前子树里找到的 p / q / 或已经确定的 LCA」</strong>，不是布尔值。
        </p>
        <div class="mb-4"><Code language="ts" :code="lcaRecursiveCode" title="lca_recursive.ts" /></div>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">命中 p/q 直接返回 → 左右都非空 = 当前是 LCA → 否则传单边</p>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>递归版的精髓在 <code>if (root === p || root === q) return root</code> 这一行——
          它天然覆盖了「p 是 q 的祖先」这种情况：一旦遇到 p，就返回 p 不再向下，p 会一路被「传上去」成为最终答案。</p>
        </aside>
      </section>

      <!-- 3. 父指针回溯 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          父指针向上回溯
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          思路更直白：先 DFS 一遍给每个节点记下<strong>父亲</strong>，然后把 p 的<strong>所有祖先</strong>装进集合，
          再从 q 向上走，<strong>第一个出现在集合里的就是 LCA</strong>。适合「同一棵树、多次查询」的场景——父指针表只需建一次。
        </p>
        <div class="mb-4"><Code language="ts" :code="lcaParentCode" title="lca_parent_pointer.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>只查一次 → 用递归分治（O(n)，代码短）；<strong>同一棵树查很多次</strong> → 用父指针回溯或树上倍增（预处理一次，查询更快）。</p>
        </aside>
      </section>

      <!-- 4. 树上倍增（进阶） -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          树上倍增（进阶）：单次查询 O(log n)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          父指针回溯单次查询最坏仍要 O(h)（退化成链表时 O(n)）。<strong>树上倍增</strong>预处理出每个节点的
          <code>2^k</code> 级祖先（<code>up[k][node]</code>），查询时<strong>先对齐深度、再一起向上跳</strong>，单次 O(log n)。
          竞赛/多查询场景的标配。
        </p>
        <div class="mb-4"><Code language="ts" :code="lcaBinaryLiftingCode" title="lca_binary_lifting.ts" /></div>
        <div class="mb-4"><Code language="ts" :code="lcaDistanceCode" title="lca_application_distance.ts" /></div>
      </section>

      <!-- 5. 常见错误 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          常见错误与经验法则
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 三个高频坑：</strong><br/>
          ① <strong>漏掉「p 是 q 的祖先」</strong>——错误写法「必须左右都找到才算 LCA」会把这种情况漏掉。递归版靠 <code>root === p || root === q</code> 直接返回天然解决。<br/>
          ② <strong>把返回值当布尔值</strong>——递归版返回的是「子树里找到的节点引用（p/q/LCA）」，写成 <code>return left && right</code>（布尔）会丢失节点，最后只能拿到 true/false。<br/>
          ③ <strong>父指针版死循环</strong>——根节点的父亲若没做特殊标记（指 null 或指自己），向上回溯会 <code>parent.get(root)</code> 得到 undefined，越界崩溃。<br/>
          ④ <strong>混淆 BST 与普通树</strong>——普通二叉树必须 O(n) 遍历；只有 BST 才能利用大小关系 O(h)（#235）。
          </p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>写 LCA 前先问：<strong>① 这棵树是不是 BST？② 要查一次还是多次？</strong>——普通树查一次用递归分治；BST 用大小比较 O(h)；多次查询用父指针/倍增。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：父指针向上回溯定位 LCA
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          绿色 = 目标节点 p、q；橙色 = p 向上回溯的祖先；蓝色 = q 向上回溯的路径；放大绿 = 命中的 LCA。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ tNodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🌳 高度: {{ dynHeight }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="() => doLCA(5, 1)" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">🔍 找 LCA(5, 1)</button>
          <button @mousedown="() => doLCA(5, 4)" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">🔍 找 LCA(5, 4) 祖先情况</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="'e'+e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="tTextCfg(n)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>LCA：</strong>p、q 向上走第一次「汇合」的节点；节点是自己的祖先，p 是 q 祖先时 LCA = p</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>递归分治：</strong>后序自底向上，命中 p/q 直接返回；左右都非空 = 当前是 LCA；否则传单边。O(n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>父指针回溯：</strong>记父亲 → p 祖先入集合 → q 向上找第一个交集。建表一次、多查询友好</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>树上倍增：</strong>预处理 2^k 级祖先，对齐深度后一起跳，单次 O(log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>坑：</strong>别漏「祖先情况」、别把返回值当布尔、别把 BST 的 O(h) 优化套到普通树上</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-1-binary-tree/dsa-4-1-3-construct" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：从遍历序列构造二叉树</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-2-bst/dsa-4-2-1-basic" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：二叉搜索树 BST →</RouterLink>
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
  { id: "sec-1", name: "定义与边界" },
  { id: "sec-2", name: "递归分治 O(n)" },
  { id: "sec-3", name: "父指针回溯" },
  { id: "sec-4", name: "树上倍增 O(log n)" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 LCA 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const R = 22, LEVEL_H = 92, TOP = 50
const H = ref(390), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

interface TNode { id:number; val:number; x:number; y:number; color:string; s?:number }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{a:number;b:number}[]>([])
const tChild = reactive<Record<number,{left:number|null;right:number|null}>>({})
const vals = reactive<Record<number,number>>({})
const parent: Record<number,number|null> = { 1:null, 2:1, 3:1, 4:2, 5:2, 6:3, 7:3, 8:5, 9:5 }
let rootId = 1

function resetTree() {
  Object.keys(tChild).forEach(k => delete tChild[k])
  Object.keys(vals).forEach(k => delete vals[k])
  Object.assign(tChild, {
    1:{left:2,right:3}, 2:{left:4,right:5}, 3:{left:6,right:7},
    4:{left:null,right:null}, 5:{left:8,right:9}, 6:{left:null,right:null},
    7:{left:null,right:null}, 8:{left:null,right:null}, 9:{left:null,right:null},
  })
  Object.assign(vals, { 1:3, 2:5, 3:1, 4:6, 5:2, 6:9, 7:8, 8:7, 9:4 })
  rootId = 1
  layout()
  tNodes.forEach(n => { n.color = C.cyan; n.s = 1 })
}

function layout() {
  tNodes.length = 0; tEdges.length = 0
  let level = [rootId], y = TOP
  while (level.length) {
    const gap = W.value / (level.length + 1)
    level.forEach((id, i) => { tNodes.push({ id, val: vals[id], x: gap*(i+1), y, color: C.cyan, s:1 }) })
    const next:number[] = []
    level.forEach(id => {
      const ch = tChild[id] || { left:null, right:null }
      if (ch.left != null) { tEdges.push({ a:id, b:ch.left }); next.push(ch.left) }
      if (ch.right != null) { tEdges.push({ a:id, b:ch.right }); next.push(ch.right) }
    })
    level = next; y += LEVEL_H
  }
}

function pos(id:number): TNode { return tNodes.find(n => n.id === id)! }
function findIdByVal(key:number): number|null { for (const k of Object.keys(vals)) { if (vals[+k] === key) return +k } return null }
function treeHeight(id:number|null = rootId): number { if (id == null) return 0; const c = tChild[id]; if (!c) return 0; return 1 + Math.max(treeHeight(c.left), treeHeight(c.right)) }
const dynHeight = computed(() => treeHeight())

function edgeCfg(e:{a:number;b:number}) { const pa = pos(e.a), pb = pos(e.b); return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke:'#94a3b8', strokeWidth:2 } }
function circleCfg(n:any) { const s = n.s ?? 1; const stroke = n.color===C.orange?'#d97706':n.color===C.green?'#16a34a':n.color===C.blue?'#2563eb':'#0891b2'; return { x:n.x, y:n.y, radius:R*s, fill:n.color, stroke, strokeWidth:n.color===C.orange||n.color===C.green?3:1.5, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 } }
function tTextCfg(n:any) { const s = n.s ?? 1; return { x:n.x-R, y:n.y-R, width:R*2, height:R*2, text:String(n.val), fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:n.color===C.green?'#0f172a':'#fff', align:'center', verticalAlign:'middle', scale:{x:s,y:s} } }

async function doLCA(pVal:number, qVal:number) {
  if (busy.value) return
  busy.value = true; opLabel.value = '父指针回溯 O(n)'
  resetTree()
  const pid = findIdByVal(pVal), qid = findIdByVal(qVal)
  if (pid == null || qid == null) { status.value = '节点不存在'; busy.value = false; opLabel.value = ''; return }

  // ① 标记两个目标节点
  pos(pid).color = C.green; pos(qid).color = C.green
  status.value = `目标节点：p=${pVal}、q=${qVal}（绿色）`; await d(700)

  // ② 从 p 向上回溯，记录祖先
  const ancestors = new Set<number>()
  let cur:number|null = pid
  status.value = `① 从 p=${pVal} 向上回溯，标记祖先`
  while (cur != null) {
    ancestors.add(cur)
    if (cur !== pid) pos(cur).color = C.orange
    await d(380)
    cur = parent[cur]
  }

  // ③ 从 q 向上回溯，找第一个公共祖先
  status.value = `② 从 q=${qVal} 向上回溯，找第一个交集`
  cur = qid
  while (cur != null) {
    if (ancestors.has(cur)) {
      pos(cur).color = C.green; pos(cur).s = 1.18
      status.value = `✅ LCA = ${vals[cur]}（${pVal} 与 ${qVal} 的最近公共祖先）`
      await d(900)
      pos(cur).s = 1
      break
    }
    if (cur !== qid) pos(cur).color = C.blue
    await d(380)
    cur = parent[cur]
  }
  busy.value = false; opLabel.value = ''
}

function doReset() { resetTree(); status.value = ''; opLabel.value = '' }

let ro: ResizeObserver|null = null
onMounted(() => {
  resetTree()
  if (box.value) { W.value = box.value.clientWidth; layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const lcaRecursiveCode = `// ===== 递归分治求 LCA（LeetCode #236）=====
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val
        this.left = left
        this.right = right
    }
}

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
    // 边界：空 / 命中 p / 命中 q —— 直接返回当前节点（命中本身就是答案候选）
    if (root === null || root === p || root === q) return root

    const left  = lowestCommonAncestor(root.left, p, q)   // 左子树里找
    const right = lowestCommonAncestor(root.right, p, q)  // 右子树里找

    if (left && right) return root     // ① p、q 分居左右 → 当前节点就是 LCA
    return left ?? right               // ② 只在一边找到 → 把结果向上传递
}

// 复杂度：每个节点访问一次 O(n)；递归栈最坏 O(h)（退化成链表时 O(n)）
//
// 关键理解：这是「后序遍历」式的自底向上——先探完左右，再根据左右结果判断。
//   情况① p、q 在 root 的两侧 → root 是第一个（最低的）公共祖先。
//   情况② p、q 都在左子树 → left 已经是 LCA，直接返回；右同理。
//   边界 root === p 或 q 时直接返回，天然覆盖「p 是 q 的祖先」。
//
// 手动模拟 LCA(5, 1)，树：
//        3
//       / \\
//      5   1
//     / \\ / \\
//    6  2 9  8
//      / \\
//     7   4
// 根 3：左子树含 5（返回 5），右子树含 1（返回 1）→ 左右都非空 → LCA = 3`

const lcaParentCode = `// ===== 父指针向上回溯求 LCA =====
// 思路：DFS 记父亲 → p 的祖先入集合 → q 向上找第一个交集
function lowestCommonAncestor2(root: TreeNode, p: TreeNode, q: TreeNode): TreeNode {
    // ① DFS 建父指针表
    const parent = new Map<TreeNode, TreeNode>()
    const stack: TreeNode[] = [root]
    parent.set(root, root)                 // 根的父亲指向自己（避免向上回溯越界）
    while (stack.length) {
        const node = stack.pop()!
        if (node.left)  { parent.set(node.left, node);  stack.push(node.left) }
        if (node.right) { parent.set(node.right, node); stack.push(node.right) }
    }

    // ② p 的祖先集合
    const ancestors = new Set<TreeNode>()
    let cur: TreeNode = p
    while (cur !== root) {                 // 从 p 走到根
        ancestors.add(cur)
        cur = parent.get(cur)!
    }
    ancestors.add(root)

    // ③ 从 q 向上走，第一个出现在 p 祖先集合里的就是 LCA
    cur = q
    while (!ancestors.has(cur)) {
        cur = parent.get(cur)!
    }
    return cur
}

// 复杂度：建表 O(n) + 两次向上回溯 O(h)；空间 O(n)（存整棵树的父指针）
// 适合：同一棵树上「多次查询」不同 (p,q)——父指针表只需建一次`

const lcaBinaryLiftingCode = `// ===== 树上倍增求 LCA（进阶：单次 O(log n)）=====
// 思想：预处理每个节点的第 2^k 级祖先 up[k][node]，
//       查询时先「对齐深度」，再「一起向上跳」。
const LOG = 20                              // 覆盖 n ≤ 10^6（2^20 ≈ 100 万）
const up: number[][] = []                   // up[k][node] = node 的第 2^k 级祖先
const depth: number[] = []

function dfsPreprocess(node: number, par: number, graph: number[][]) {
    up[0][node] = par
    for (let k = 1; k < LOG; k++) {
        up[k][node] = up[k-1][ up[k-1][node] ]   // 2^k 祖先 = 2^(k-1) 祖先的 2^(k-1) 祖先
    }
    for (const next of graph[node]) {
        if (next === par) continue
        depth[next] = depth[node] + 1
        dfsPreprocess(next, node, graph)
    }
}

function lca(a: number, b: number): number {
    if (depth[a] < depth[b]) [a, b] = [b, a]     // 让 a 更深
    // ① 把 a 抬到和 b 同深度（按二进制拆 diff）
    let diff = depth[a] - depth[b]
    for (let k = 0; k < LOG; k++) {
        if ((diff >> k) & 1) a = up[k][a]
    }
    if (a === b) return a                        // 已经是祖先关系
    // ② 一起向上跳（从大到小），跳到 LCA 的下一层
    for (let k = LOG - 1; k >= 0; k--) {
        if (up[k][a] !== up[k][b]) { a = up[k][a]; b = up[k][b] }
    }
    return up[0][a]                              // 再上一级就是 LCA
}

// 复杂度：预处理 O(n log n)，单次查询 O(log n)——查询次数多时远快于 O(n)
// 适用：树是静态的、查询很多（竞赛 / 树上路径问题）`

const lcaDistanceCode = `// ===== 应用：LCA 求树上两节点距离 =====
// dist(a, b) = depth[a] + depth[b] - 2 * depth[lca(a, b)]
function treeDistance(a: number, b: number): number {
    return depth[a] + depth[b] - 2 * depth[lca(a, b)]
}

// 原理：a→b 的路径 = a 上到 LCA + LCA 下到 b
//   a 到 LCA 的边数 = depth[a] - depth[lca]
//   b 到 LCA 的边数 = depth[b] - depth[lca]
//   相加即上式。这是「树上最短路径 / 路径边数」类问题的核心预处理。`
</script>
