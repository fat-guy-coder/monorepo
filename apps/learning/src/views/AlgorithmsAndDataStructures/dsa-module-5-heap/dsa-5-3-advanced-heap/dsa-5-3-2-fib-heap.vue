<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌀 斐波那契堆：理论分析</h1>
          <p class="text-sm text-slate-500 mt-1">均摊复杂度之巅——insert/merge 懒到 O(1)，deleteMin 才整理，decrease-key 均摊 O(1)</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 5-3-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：一堆「树」组成的森林
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          斐波那契堆不是「一棵树」，而是<strong>一组满足堆序的树的集合（森林）</strong>。所有树的根用一条
          <strong>双向循环链表（根链表）</strong>串起来，并有一个 <code>min</code> 指针指向最小根。它的名字来自：
          <strong>度数为 k 的节点，其子树规模至少是斐波那契数 F(k)</strong>，这保证了节点度数只有 O(log n) 种——
          这是「deleteMin 整理（consolidate）均摊 O(log n)」的数学根基。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 360" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="f1-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="f1-arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">斐波那契堆：根链表（循环）+ min 指针 + 每棵树的根标注度数 degree</text>

            <!-- min 指针 -->
            <line x1="200" y1="30" x2="200" y2="44" stroke="#16a34a" stroke-width="2" marker-end="url(#f1-arr2)" />
            <text x="200" y="22" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#16a34a">min</text>

            <!-- 根链表（循环，双向） -->
            <line x1="224" y1="70" x2="376" y2="70" stroke="#94a3b8" stroke-width="1.5" marker-start="url(#f1-arr)" marker-end="url(#f1-arr)" />
            <line x1="424" y1="70" x2="576" y2="70" stroke="#94a3b8" stroke-width="1.5" marker-start="url(#f1-arr)" marker-end="url(#f1-arr)" />
            <path d="M 600 46 Q 660 24 620 8 Q 560 0 560 24" fill="none" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#f1-arr2)" />
            <text x="660" y="16" font-size="10" font-family="monospace" fill="#64748b">循环</text>

            <!-- 树边 -->
            <line x1="200" y1="94" x2="150" y2="156" stroke="#94a3b8" stroke-width="2" marker-end="url(#f1-arr2)" />
            <line x1="200" y1="94" x2="260" y2="156" stroke="#94a3b8" stroke-width="2" marker-end="url(#f1-arr2)" />
            <line x1="150" y1="180" x2="110" y2="246" stroke="#94a3b8" stroke-width="2" marker-end="url(#f1-arr2)" />
            <line x1="600" y1="94" x2="560" y2="156" stroke="#94a3b8" stroke-width="2" marker-end="url(#f1-arr2)" />

            <!-- 根节点 -->
            <circle cx="200" cy="70" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="200" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <text x="200" y="112" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">d=2</text>
            <circle cx="400" cy="70" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="400" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">17</text>
            <text x="400" y="112" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">d=0</text>
            <circle cx="600" cy="70" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="600" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">24</text>
            <text x="600" y="112" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">d=1</text>

            <!-- 孩子 -->
            <circle cx="150" cy="180" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="150" y="180" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">18</text>
            <text x="150" y="222" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">d=1</text>
            <circle cx="260" cy="180" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="260" y="180" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">23</text>
            <text x="260" y="222" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">d=0</text>
            <circle cx="110" cy="270" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="110" y="270" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">39</text>
            <text x="110" y="312" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">d=0</text>
            <circle cx="560" cy="180" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="560" y="180" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">26</text>
            <text x="560" y="222" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">d=0</text>

            <!-- 图例 -->
            <text x="16" y="344" font-size="11" font-family="monospace" fill="#64748b">每棵树的根满足堆序（父 ≤ 子）；度数 d = 孩子数，d 只有 O(log n) 种取值</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：斐波那契堆 = 根链表串起的森林 + min 指针；根 3 的度数 d=2（两个孩子 18、23）</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：deleteMin 的 consolidate（整理）—— 合并同度数树</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-slate-500 font-semibold mb-1">整理前：根链表有 4 棵度数为 0 的树</p>
            <svg viewBox="0 0 340 160" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="70" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="50" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <text x="50" y="112" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">d=0</text>
              <circle cx="130" cy="70" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="130" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">17</text>
              <text x="130" y="112" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">d=0</text>
              <circle cx="210" cy="70" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="210" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">21</text>
              <text x="210" y="112" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">d=0</text>
              <circle cx="290" cy="70" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="290" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">23</text>
              <text x="290" y="112" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">d=0</text>
            </svg>
          </div>
          <div>
            <p class="text-xs text-slate-500 font-semibold mb-1">整理后：合并成 1 棵度数为 2 的树</p>
            <svg viewBox="0 0 340 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="f2-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <line x1="170" y1="79" x2="90" y2="151" stroke="#94a3b8" stroke-width="2" marker-end="url(#f2-arr)" />
              <line x1="170" y1="79" x2="250" y2="151" stroke="#94a3b8" stroke-width="2" marker-end="url(#f2-arr)" />
              <line x1="250" y1="199" x2="200" y2="251" stroke="#94a3b8" stroke-width="2" marker-end="url(#f2-arr)" />
              <circle cx="170" cy="55" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="170" y="55" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <text x="170" y="97" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">d=2</text>
              <circle cx="90" cy="175" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="90" y="175" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">17</text>
              <text x="90" y="217" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">d=0</text>
              <circle cx="250" cy="175" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="250" y="175" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">21</text>
              <text x="250" y="217" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">d=1</text>
              <circle cx="200" cy="275" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="200" y="275" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">23</text>
              <text x="200" y="317" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">d=0</text>
            </svg>
          </div>
        </div>
        <figcaption class="text-xs text-slate-400 mt-1">图 2：consolidate 用「度数数组」做桶排序式归并——度数相同的树合并，key 小的当根，最终每个度数至多一棵树</figcaption>
      </section>

      <!-- 1. 是什么 / 均摊复杂度 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          是什么？均摊复杂度一览
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          斐波那契堆（Fibonacci Heap）由 Fredman 和 Tarjan 在 1984 年提出，是<strong>理论最优的优先队列</strong>。
          它的杀手锏是 <code>decrease-key</code>（把某个元素的优先级调高）<strong>均摊 O(1)</strong>——这让
          <strong>Dijkstra 最短路</strong>和 <strong>Prim 最小生成树</strong>达到理论上最优的 <code>O(m + n log n)</code>（二叉堆只能做到 O(m log n)）。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">操作</th><th class="px-4 py-2 border border-slate-200 font-semibold">二叉堆</th><th class="px-4 py-2 border border-slate-200 font-semibold">斐波那契堆（均摊）</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">insert</td><td class="px-4 py-2 border font-mono">O(log n)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">merge（合并）</td><td class="px-4 py-2 border font-mono">O(n)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">deleteMin</td><td class="px-4 py-2 border font-mono">O(log n)</td><td class="px-4 py-2 border font-mono">O(log n)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">decrease-key</td><td class="px-4 py-2 border font-mono">O(log n)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          斐波那契堆 ≈ <strong>懒更新（lazy evaluation）</strong>——<br/>
          插入/合并时<strong>不做任何整理</strong>（O(1)），把「脏活」攒到 <code>deleteMin</code> 时一次性 consolidate（整理）。<br/>
          就像 <strong>React 的批量 state 更新</strong>：多次 <code>setState</code> 不立即渲染，而是攒到一轮再统一 commit；<br/>
          也像 <strong>虚拟 DOM diff 的延迟计算</strong>、<strong>垃圾回收的「标记-清除」</strong>（标记很快，回收时再整理）。
          </p>
        </aside>
      </section>

      <!-- 2. 节点结构与懒合并 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          节点结构与「懒」insert / merge（O(1)）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          斐波那契堆的节点比二叉堆复杂得多：除了 <code>key</code>，还要记录 <code>degree</code>（孩子数）、
          <code>marked</code>（是否失过孩子，供 decrease-key 级联切断用），以及 <code>child / left / right / parent</code>。
          根链表和兄弟链表都是<strong>双向循环链表</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="nodeCode" title="fib_node.ts" /></div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          「懒」体现在 <strong>insert 和 merge 都不整理结构</strong>：新节点直接挂进根链表，或两个根链表首尾相接，最后更新一下 <code>min</code> 指针即可。
        </p>
        <div class="mb-4"><Code language="ts" :code="insertMergeCode" title="fib_insert_merge.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>「懒」不是偷懒，而是一种<strong>均摊策略</strong>——
          把昂贵的「维护平衡」工作推迟并集中到 deleteMin，靠「度数只有 O(log n) 种」这个斐波那契性质保证摊销下来仍然 O(log n)。</p>
        </aside>
      </section>

      <!-- 3. deleteMin 与 consolidate -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          deleteMin 与 consolidate —— 懒账的「清算时刻」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          deleteMin 是唯一需要「干活」的操作，分三步：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>摘除 min</strong>：把最小根从根链表移除</li>
          <li><strong>晋升孩子</strong>：把 min 的所有孩子「切断父子关系」并挂进根链表（它们各自成为一棵新树）</li>
          <li><strong>consolidate 整理</strong>：用「度数数组」遍历根链表，遇到<strong>同度数</strong>的两棵树就合并（key 小的当根，大的降为孩子），直到每个度数至多一棵树</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="deleteMinCode" title="fib_deleteMin.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 均摊直觉：</strong>consolidate 虽然单次可能 O(n)，但每次合并都会「消灭」一棵树。
          n 次 insert 制造 n 棵树，deleteMin 总共只能做 O(n) 次合并——把这笔账摊到每次操作上，deleteMin 仍是<strong>均摊 O(log n)</strong>。</p>
        </aside>
      </section>

      <!-- 4. decrease-key 与均摊分析 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          decrease-key 与「均摊」到底是什么意思
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>decrease-key</strong>（把某元素的 key 调小）是斐波那契堆区别于其他堆的最大亮点：调小后如果破坏了堆序，
          就把它<strong>从父节点「切」下来</strong>挂到根链表，并更新 min。配合 <code>marked</code> 标记做「级联切断」，
          避免树被切得七零八落，最终保证<strong>均摊 O(1)</strong>。这里只讲概念，不展开级联切断的实现细节。
        </p>
        <div class="bg-slate-50 rounded-lg p-4 mb-4">
          <p class="text-sm text-slate-600 leading-relaxed">
            <strong>均摊复杂度 ≠ 平均复杂度 ≠ 期望复杂度：</strong><br/>
            均摊分析考虑的是<strong>「最坏情况下的一个操作序列」</strong>的总代价，除以操作次数。
            它保证：无论对手怎么出招，平均每次都不会超界（而「平均复杂度」通常假设输入随机分布）。
            「懒插入 O(1) + 偶尔昂贵的 deleteMin」就是典型的均摊场景——偶尔付一笔大的，摊到平时就显得便宜。
          </p>
        </div>
        <div class="mb-4"><Code language="ts" :code="amortizedCode" title="fib_amortized.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 实践忠告：</strong>斐波那契堆是「<strong>理论上</strong>」的最优，常数非常大（双向链表、大量指针），
          实际运行往往打不过精心实现的二叉堆甚至配对堆。它的价值在<strong>算法复杂度分析</strong>（Dijkstra/Prim 的最优界），
          工程上很少直接实现。</p>
        </aside>
      </section>

      <!-- 5. 常见错误 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          常见错误与陷阱
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>把「均摊 O(1)」当成「每次都是 O(1)」</strong>——单次 decrease-key 可能触发级联切断，最坏 O(log n)；均摊保证的是<strong>一串操作的均值</strong>。<br/>
          ② <strong>decrease-key 忘记处理 marked / 级联切断</strong>——直接切孩子却不标记、不级联，会让树的度数失衡，均摊界失效。<br/>
          ③ <strong>consolidate 忘记录入孩子的 degree</strong>——合并两棵同度数树后，新根的 degree 要 +1，漏掉会导致度数数组逻辑全错。<br/>
          ④ <strong>以为斐波那契堆工程上更快</strong>——它常数大、实现难，实际常被配对堆或二叉堆反超；它的价值在<strong>理论最优界</strong>。
          </p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆要点：</strong>「insert/merge 懒 O(1)、deleteMin 整理 O(log n) 均摊、decrease-key O(1) 均摊」；
          用途 = Dijkstra/Prim 的最优复杂度证明，而非日常工程首选。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：懒插入 + deleteMin 整理
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          绿色 = 新插入 / min 指针；红色 = 被删的最小值。每个根节点旁标注 <code>d=度数</code>。
          观察「懒插入」直接挂根链表，而 deleteMin 才 consolidate 合并同度数树。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ tNodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🌲 树数: {{ treeCount }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doInsert" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">➕ 插入（懒）O(1)</button>
          <button @mousedown="doDeleteMin" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm">🗑️ deleteMin（整理）</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="'e'+e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-line v-for="l in tLinks" :key="'l'+l.a+'-'+l.b" :config="linkCfg(l)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="tTextCfg(n)" />
              <v-text v-for="n in tNodes" :key="'d'+n.id" :config="degCfg(n)" />
              <v-text v-for="n in minNodes" :key="'m'+n.id" :config="minCfg(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>本质：</strong>一组堆序树组成的森林，根链表（双向循环）串起 + min 指针指向最小根</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>懒策略：</strong>insert / merge 不做整理，直接挂根链表，均摊 O(1)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>清算时刻：</strong>deleteMin 才 consolidate，用度数数组合并同度数树，均摊 O(log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>杀手锏：</strong>decrease-key 均摊 O(1) → Dijkstra/Prim 达到理论最优 O(m + n log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>名字由来：</strong>度数 k 的节点子树 ≥ 斐波那契数 F(k) → 度数只有 O(log n) 种</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>现实：</strong>理论最优但常数大，工程上常被配对堆/二叉堆反超</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-3-advanced-heap/dsa-5-3-1-leftist" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：左偏树与可并堆</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-3-advanced-heap/dsa-5-3-3-pairing" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：配对堆 →</RouterLink>
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
  { id: "sec-1", name: "均摊复杂度" },
  { id: "sec-2", name: "懒 insert/merge" },
  { id: "sec-3", name: "deleteMin 整理" },
  { id: "sec-4", name: "decrease-key 与均摊" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 斐波那契堆动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const R = 24, H = ref(360), W = ref(720)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r,ms))

interface FNode { id:number; val:number; x:number; y:number; color:string; deg:number; min?:boolean; s?:number }
const tNodes = reactive<FNode[]>([])
const tEdges = reactive<{a:number; b:number}[]>([])
const tLinks = reactive<{a:number; b:number}[]>([])

type FibSpec = { nodes: {id:number; val:number; x:number; y:number; deg:number; min?:boolean; color?:string}[]; edges: {a:number; b:number}[]; links?: {a:number; b:number}[] }

function drawFib(spec: FibSpec) {
  tNodes.length = 0; tEdges.length = 0; tLinks.length = 0
  spec.edges.forEach(e => tEdges.push({ a:e.a, b:e.b }))
  (spec.links ?? []).forEach(l => tLinks.push({ a:l.a, b:l.b }))
  spec.nodes.forEach(n => tNodes.push({ id:n.id, val:n.val, x:n.x, y:n.y, color:n.color ?? C.cyan, deg:n.deg, min:n.min, s:1 }))
}

// 节点 id：1=3 2=17 3=21 4=23 5=2
const fibInit: FibSpec = {
  nodes: [
    { id:1, val:3, x:120, y:90, deg:0, min:true }, { id:2, val:17, x:280, y:90, deg:0 },
    { id:3, val:21, x:440, y:90, deg:0 }, { id:4, val:23, x:600, y:90, deg:0 },
  ],
  edges: [],
  links: [ {a:1,b:2}, {a:2,b:3}, {a:3,b:4} ],
}
const fibInserted: FibSpec = {
  nodes: [
    { id:5, val:2, x:80, y:90, deg:0, min:true, color:C.green }, { id:1, val:3, x:200, y:90, deg:0 },
    { id:2, val:17, x:320, y:90, deg:0 }, { id:3, val:21, x:440, y:90, deg:0 }, { id:4, val:23, x:560, y:90, deg:0 },
  ],
  edges: [],
  links: [ {a:5,b:1}, {a:1,b:2}, {a:2,b:3}, {a:3,b:4} ],
}
const fibDelMark: FibSpec = {
  nodes: [
    { id:5, val:2, x:80, y:90, deg:0, min:true, color:C.red }, { id:1, val:3, x:200, y:90, deg:0 },
    { id:2, val:17, x:320, y:90, deg:0 }, { id:3, val:21, x:440, y:90, deg:0 }, { id:4, val:23, x:560, y:90, deg:0 },
  ],
  edges: [],
  links: [ {a:5,b:1}, {a:1,b:2}, {a:2,b:3}, {a:3,b:4} ],
}
const fibRemoved: FibSpec = {
  nodes: [
    { id:1, val:3, x:120, y:90, deg:0, min:true }, { id:2, val:17, x:280, y:90, deg:0 },
    { id:3, val:21, x:440, y:90, deg:0 }, { id:4, val:23, x:600, y:90, deg:0 },
  ],
  edges: [],
  links: [ {a:1,b:2}, {a:2,b:3}, {a:3,b:4} ],
}
const fibConsol1: FibSpec = {
  nodes: [
    { id:1, val:3, x:150, y:90, deg:1, min:true, color:C.orange }, { id:2, val:17, x:110, y:200, deg:0 },
    { id:3, val:21, x:430, y:90, deg:1, color:C.orange }, { id:4, val:23, x:390, y:200, deg:0 },
  ],
  edges: [ {a:1,b:2}, {a:3,b:4} ],
}
const fibConsol2: FibSpec = {
  nodes: [
    { id:1, val:3, x:280, y:90, deg:2, min:true, color:C.orange }, { id:2, val:17, x:140, y:200, deg:0 },
    { id:3, val:21, x:420, y:200, deg:1 }, { id:4, val:23, x:370, y:300, deg:0 },
  ],
  edges: [ {a:1,b:2}, {a:1,b:3}, {a:3,b:4} ],
}
const fibFinal: FibSpec = {
  nodes: [
    { id:1, val:3, x:280, y:90, deg:2, min:true }, { id:2, val:17, x:140, y:200, deg:0 },
    { id:3, val:21, x:420, y:200, deg:1 }, { id:4, val:23, x:370, y:300, deg:0 },
  ],
  edges: [ {a:1,b:2}, {a:1,b:3}, {a:3,b:4} ],
}

const treeCount = computed(() => {
  const hasParent = new Set(tEdges.map(e => e.b))
  return tNodes.filter(n => !hasParent.has(n.id)).length
})
const minNodes = computed(() => tNodes.filter(n => n.min))

function pos(id:number): FNode { return tNodes.find(n => n.id === id)! }
function edgeCfg(e:{a:number;b:number}) { const pa = pos(e.a), pb = pos(e.b); return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke:'#94a3b8', strokeWidth:2 } }
function linkCfg(l:{a:number;b:number}) { const pa = pos(l.a), pb = pos(l.b); return { points:[pa.x+R, pa.y, pb.x-R, pb.y], stroke:'#94a3b8', strokeWidth:1.5, dash:[4,3] } }
function circleCfg(n:any) { const s = n.s ?? 1; return { x:n.x, y:n.y, radius:R*s, fill:n.color, stroke:n.color===C.orange?'#d97706':n.color===C.red?'#dc2626':n.color===C.green?'#22c55e':'#64748b', strokeWidth:(n.color===C.orange||n.color===C.red||n.color===C.green)?3:1.5, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 } }
function tTextCfg(n:any) { const s = n.s ?? 1; return { x:n.x-R, y:n.y-R, width:R*2, height:R*2, text:String(n.val), fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle', scale:{x:s,y:s} } }
function degCfg(n:any) { return { x:n.x-30, y:n.y+R+2, width:60, text:'d='+n.deg, fontSize:11, fontFamily:'monospace', fill:n.color===C.green?'#16a34a':C.muted, align:'center' } }
function minCfg(n:any) { return { x:n.x-30, y:n.y-R-20, width:60, text:'min', fontSize:11, fontFamily:'monospace', fontStyle:'bold', fill:'#16a34a', align:'center' } }

async function act(msg:string, label:string, fn:() => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(300); busy.value = false; status.value = ''; opLabel.value = '' }
}

async function doInsert() {
  act('插入 2（懒） O(1)', 'insert O(1) 均摊', async () => {
    drawFib(fibInit); status.value = '初始：根链表 [3,17,21,23]，min=3'; await d(1000)
    drawFib(fibInserted); status.value = '懒插入：2 直接挂根链表（虚线），不整理任何树，min 更新为 2'; await d(1600)
  })
}

async function doDeleteMin() {
  act('deleteMin 删除 2 并整理', 'deleteMin O(log n) 均摊', async () => {
    drawFib(fibInserted); status.value = '准备 deleteMin：当前 min=2'; await d(900)
    drawFib(fibDelMark); status.value = '① 标记最小根 2（红色），准备摘除'; await d(1100)
    drawFib(fibRemoved); status.value = '② 2 无孩子，直接摘除 → 根链表剩 [3,17,21,23]'; await d(1200)
    drawFib(fibConsol1); status.value = '③ consolidate：3 与 17 同度(0) → 17 挂 3；21 与 23 同度(0) → 23 挂 21'; await d(1600)
    drawFib(fibConsol2); status.value = '④ 3(度1) 与 21(度1) 再合并 → 21 挂 3，3 度变 2'; await d(1600)
    drawFib(fibFinal); status.value = '⑤ 整理完成：根链表只剩 3（度 2），min=3'; await d(1400)
  })
}

function doReset() { drawFib(fibInit); status.value = ''; opLabel.value = '' }

let ro: ResizeObserver|null = null
onMounted(() => {
  drawFib(fibInit)
  if (box.value) { W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const nodeCode = `// ===== 斐波那契堆节点：比二叉堆复杂得多 =====
class FibNode {
    key: number
    degree: number          // 孩子数量（consolidate 时用来匹配「同度数」）
    marked: boolean         // 是否「失掉过一个孩子」（decrease-key 级联切断用）
    parent: FibNode | null
    child: FibNode | null   // 指向第一个孩子
    left: FibNode | null    // 根链表 / 兄弟链表是「双向循环链表」
    right: FibNode | null
    constructor(key: number) {
        this.key = key
        this.degree = 0
        this.marked = false
        this.parent = null
        this.child = null
        this.left = this
        this.right = this     // 单节点自成一个循环
    }
}

// 关键性质（名字的由来）：
// 一个度数为 k 的节点，其子树规模至少是斐波那契数 F(k+2)
//   F(2)=1, F(3)=2, F(4)=3, F(5)=5, F(6)=8, ...
// 所以度数 d 满足 F(d+2) <= n  =>  d = O(log n)
// 这就是 consolidate 均摊 O(log n) 的数学根基`

const insertMergeCode = `// ===== 懒 insert / merge：都是 O(1)，不整理结构 =====
function concatRootList(a: FibNode, b: FibNode): void {
    // 双向循环链表：把 b 插到 a 的右边（首尾相接）
    const aRight = a.right!
    a.right = b; b.left = a
    aRight.left = b; b.right = aRight
}

function insert(min: FibNode | null, key: number): FibNode {
    const n = new FibNode(key)
    if (!min) return n
    concatRootList(min, n)              // 直接挂进根链表，O(1)
    return n.key < min.key ? n : min    // 只需更新 min 指针
}

function merge(h1: FibNode | null, h2: FibNode | null): FibNode | null {
    if (!h1) return h2
    if (!h2) return h1
    concatRootList(h1, h2)              // 两个根链表首尾相接，O(1)
    return h1.key < h2.key ? h1 : h2
}

// 对比二叉堆：
//   二叉堆 insert O(log n)（要上浮），merge O(n)（要重建）
//   斐波那契堆 insert / merge 都是 O(1)——代价是 deleteMin 时才「补账」`

const deleteMinCode = `// ===== deleteMin：晋升孩子 + consolidate 合并同度数树（示意）=====
function deleteMin(min: FibNode): FibNode | null {
    // ① 把 min 的所有孩子「晋升」到根链表（切断父子关系）
    if (min.child) {
        let c: FibNode | null = min.child
        do {
            const next = c!.right!
            c!.parent = null                    // 切断父指针
            concatRootList(min, c!)             // 挂进根链表
            c = next
        } while (c !== min.child)
    }
    // ② 从根链表摘除 min（简化为直接返回剩下的链表头）
    // ③ consolidate：用度数数组，把同度数树合并
    return consolidate(min.right!)
}

// consolidate：按 degree 归并，最终每个度数至多一棵树
function consolidate(head: FibNode): FibNode {
    // buckets[d] = 当前度数为 d 的树的根
    const buckets: (FibNode | null)[] = []
    let newMin: FibNode = head
    let cur: FibNode | null = head
    do {
        let x = cur!
        let d = x.degree
        // 桶里已经有同度数的树 → 合并（key 小的当根）
        while (buckets[d]) {
            let y = buckets[d]!
            if (x.key > y.key) [x, y] = [y, x]   // 保证 x 更小
            link(y, x)                            // y 变成 x 的孩子
            buckets[d] = null
            d++
        }
        buckets[d] = x
        cur = x.right
    } while (cur !== head)
    // 从 buckets 重建根链表 + 重新找 min
    newMin = null as any
    for (const b of buckets) {
        if (b && (!newMin || b.key < newMin.key)) newMin = b
    }
    return newMin
}

function link(child: FibNode, root: FibNode): void {
    // 把 child 从根链表摘下，挂为 root 的孩子，root.degree++
    child.parent = root
    child.left = child; child.right = child
    if (!root.child) { root.child = child }
    else { concatRootList(root.child, child) }
    root.degree++
}`

const amortizedCode = `// ===== 均摊分析：用「势能法」直觉理解 =====
// 把「懒」攒下的工作量看成一笔「势能」：每 insert 一次，势能 +1
// deleteMin 的 consolidate 就是「释放势能」的过程

// 直观账本（势能法）：
//   insert(k):     实际代价 O(1)，势能 +1        => 均摊 O(1)
//   merge(h1,h2):  实际代价 O(1)，势能不变        => 均摊 O(1)
//   deleteMin:     实际代价 O(trees + degree)
//                  - consolidate 每次合并消灭一棵树（-1 势能）
//                  - 度数上界 O(log n)（斐波那契性质）
//                  => 均摊 O(log n)
//   decrease-key:  切下节点可能级联，但势能下降抵消 => 均摊 O(1)

// 关键结论：均摊是「最坏序列的平均」，不是随机平均
// 无论对手如何出招，一串 m 次操作的总代价 <= m * (每次的均摊上界)`
</script>
