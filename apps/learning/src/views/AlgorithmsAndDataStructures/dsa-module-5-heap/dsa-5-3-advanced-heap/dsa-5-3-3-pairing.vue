<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🤝 配对堆：实用高效的可并堆</h1>
          <p class="text-sm text-slate-500 mt-1">实现简单、实际速度常胜——用「child + sibling」两个指针，靠「两两配对」合并</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 5-3-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：左孩子-右兄弟的堆
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          配对堆（Pairing Heap）也是<strong>可并堆</strong>的一种，但比左偏树更简单：节点只需要 <code>val</code>、
          <code>child</code>（第一个孩子）、<code>sibling</code>（下一个兄弟）三个字段，用「左孩子-右兄弟」表示法把一棵多叉树压成二叉树。
          它的核心操作 <code>deleteMin</code> 靠<strong>两两配对（pairing）</strong>把根的所有孩子高效合并——这也是名字的由来。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="p1-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">配对堆：child 指向第一个孩子，sibling 串起后面的兄弟（左孩子-右兄弟表示）</text>

            <!-- child 边（实线） -->
            <line x1="360" y1="84" x2="80" y2="146" stroke="#06b6d4" stroke-width="2" marker-end="url(#p1-arr)" />
            <text x="150" y="120" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">child →</text>

            <!-- sibling 边（虚线） -->
            <line x1="104" y1="170" x2="176" y2="170" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#p1-arr)" />
            <line x1="224" y1="170" x2="296" y2="170" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#p1-arr)" />
            <line x1="344" y1="170" x2="416" y2="170" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#p1-arr)" />
            <line x1="464" y1="170" x2="536" y2="170" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#p1-arr)" />
            <text x="120" y="195" font-size="10" font-family="monospace" fill="#64748b">sibling</text>

            <!-- 节点 -->
            <circle cx="360" cy="60" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="60" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <circle cx="80" cy="170" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="80" y="170" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <circle cx="200" cy="170" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="200" y="170" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <circle cx="320" cy="170" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="320" y="170" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">11</text>
            <circle cx="440" cy="170" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="440" y="170" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">13</text>
            <circle cx="560" cy="170" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="560" y="170" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">15</text>

            <!-- 图例 -->
            <text x="16" y="234" font-size="11" font-family="monospace" fill="#64748b">堆序：父 ≤ 子；根 5 的孩子是 7,9,11,13,15（7 是第一个孩子，其余是它的兄弟）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：配对堆用「左孩子-右兄弟」表示多叉树——每个节点只有 child + sibling 两个指针，结构极简</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：deleteMin 的「两两配对」—— 先配对，再从左到右合并</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-slate-500 font-semibold mb-1">删除根 5 后：5 个孩子成为待合并的一组堆</p>
            <svg viewBox="0 0 340 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="p2-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <line x1="62" y1="60" x2="98" y2="60" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#p2-arr)" />
              <line x1="122" y1="60" x2="158" y2="60" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#p2-arr)" />
              <line x1="182" y1="60" x2="218" y2="60" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#p2-arr)" />
              <line x1="242" y1="60" x2="278" y2="60" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#p2-arr)" />
              <circle cx="50" cy="60" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="50" y="60" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <circle cx="110" cy="60" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="110" y="60" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <circle cx="170" cy="60" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="170" y="60" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">11</text>
              <circle cx="230" cy="60" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="230" y="60" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">13</text>
              <circle cx="290" cy="60" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="290" y="60" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">15</text>
            </svg>
          </div>
          <div>
            <p class="text-xs text-slate-500 font-semibold mb-1">两两配对 + 从左到右合并 → 新根 7</p>
            <svg viewBox="0 0 340 320" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="p3-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <line x1="170" y1="79" x2="120" y2="146" stroke="#06b6d4" stroke-width="2" marker-end="url(#p3-arr)" />
              <line x1="144" y1="220" x2="276" y2="220" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#p3-arr)" />
              <line x1="324" y1="220" x2="426" y2="220" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#p3-arr)" />
              <line x1="300" y1="244" x2="260" y2="291" stroke="#06b6d4" stroke-width="2" marker-end="url(#p3-arr)" />
              <circle cx="170" cy="55" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="170" y="55" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">7</text>
              <circle cx="120" cy="220" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="120" y="220" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <circle cx="300" cy="220" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="300" y="220" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">11</text>
              <circle cx="450" cy="220" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="450" y="220" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">15</text>
              <circle cx="260" cy="315" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="260" y="315" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">13</text>
            </svg>
          </div>
        </div>
        <figcaption class="text-xs text-slate-400 mt-1">图 2：deleteMin = 删根 → 孩子两两配对合并（7↔9、11↔13）→ 幸存者从左到右再合并 → 新根 7</figcaption>
      </section>

      <!-- 1. 是什么 / 为什么实用 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          是什么？为什么它「实用」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          配对堆由 Fredman 等人提出，被广泛认为是<strong>「实现简单」和「实际性能」的最佳平衡点</strong>：
          它没有斐波那契堆那套复杂的 <code>marked</code> 级联切断和循环链表，却在实际基准测试里常常跑赢斐波那契堆，
          甚至逼近二叉堆。<strong>均摊</strong>上，insert / merge / decrease-key 是 O(1)，deleteMin 是 O(log n)。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">操作</th><th class="px-4 py-2 border border-slate-200 font-semibold">配对堆（均摊）</th><th class="px-4 py-2 border border-slate-200 font-semibold">斐波那契堆（均摊）</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">insert / merge</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono">O(1)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">deleteMin</td><td class="px-4 py-2 border font-mono">O(log n)</td><td class="px-4 py-2 border font-mono">O(log n)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">decrease-key</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono">O(1)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">实现难度</td><td class="px-4 py-2 border font-mono text-emerald-600">低</td><td class="px-4 py-2 border font-mono">高</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          配对堆 ≈ <strong>分组合并（两两归并）</strong>。<br/>
          deleteMin 的「两两配对」就像 <strong>归并排序的分治</strong>——先把大问题拆成两两一组的小问题（配对），再自底向上合并；<br/>
          也像<strong>淘汰赛的「两两对决」</strong>（tournament bracket），每一轮把相邻选手配对、胜者晋级，最终决出冠军（新根）。<br/>
          甚至像 <strong>React 的并发渲染 / 任务分批</strong>：先分批处理（pairing），再汇总（left-to-right merge）。
          </p>
        </aside>
      </section>

      <!-- 2. 结构与 merge -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          节点结构与 merge（O(1)）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          配对堆用<strong>「左孩子-右兄弟」</strong>表示多叉树：一个节点的所有孩子用 <code>sibling</code> 指针串成一条链，
          父节点只需 <code>child</code> 指向第一个孩子。merge 极其简单：<strong>根小的当新根，根大的那个整体挂到它下面当第一个孩子</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="nodeCode" title="pairing_node.ts" /></div>
        <div class="mb-4"><Code language="ts" :code="mergeCode" title="pairing_merge.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>merge 只比较一次根、改两个指针（<code>b.sibling = a.child; a.child = b</code>），
          所以是 O(1)。这比左偏树（要递归右路径 + 交换左右）更简洁——配对堆用「懒」换来了 merge 的极致简单。</p>
        </aside>
      </section>

      <!-- 3. deleteMin 两两配对 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          deleteMin 与「两两配对」—— 核心操作
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          删除根之后，根的所有孩子「失去了父亲」，需要重新合并成一棵堆。配对堆的经典做法是<strong>两遍扫描（two-pass）</strong>：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>第一遍（配对）</strong>：把孩子们从左到右<strong>两两配对</strong>，每对做一次 merge（落单的那个原样保留）</li>
          <li><strong>第二遍（合并）</strong>：把配对后的「幸存者」<strong>从左到右</strong>依次 merge，得到最终新堆</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="deleteMinCode" title="pairing_deleteMin.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>「两两配对」是 deleteMin 均摊 O(log n) 的关键。若偷懒改成「从左到右一路 merge」，
          虽然实现更简单，但会退化成 O(n)。别省这「配对」的一步。</p>
        </aside>
      </section>

      <!-- 4. 复杂度与对比 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          复杂度与三种可并堆的对比
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          配对堆的 deleteMin 均摊界是 O(log n)，但<strong>最坏</strong>单次可能 O(n)。它的优势在于：
          <strong>常数小、代码少、decrease-key 均摊 O(1)</strong>，工程上极受欢迎。下面把本模块的三个可并堆和二叉堆放一起对比：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">结构</th><th class="px-4 py-2 border border-slate-200 font-semibold">merge</th><th class="px-4 py-2 border border-slate-200 font-semibold">deleteMin</th><th class="px-4 py-2 border border-slate-200 font-semibold">decrease-key</th><th class="px-4 py-2 border border-slate-200 font-semibold">实现难度</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">二叉堆</td><td class="px-4 py-2 border font-mono">O(n)</td><td class="px-4 py-2 border font-mono">O(log n)</td><td class="px-4 py-2 border font-mono">O(log n)</td><td class="px-4 py-2 border">低</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">左偏树</td><td class="px-4 py-2 border font-mono">O(log n)</td><td class="px-4 py-2 border font-mono">O(log n)</td><td class="px-4 py-2 border font-mono">——</td><td class="px-4 py-2 border">中</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">斐波那契堆</td><td class="px-4 py-2 border font-mono">O(1)</td><td class="px-4 py-2 border font-mono">O(log n)</td><td class="px-4 py-2 border font-mono">O(1)</td><td class="px-4 py-2 border">高</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-emerald-700">配对堆</td><td class="px-4 py-2 border font-mono">O(1)</td><td class="px-4 py-2 border font-mono">O(log n)</td><td class="px-4 py-2 border font-mono">O(1)</td><td class="px-4 py-2 border font-semibold text-emerald-700">低~中</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>需要「可并堆 + 好实现 + 跑得快」，先考虑<strong>配对堆</strong>；
          只需要「稳定的 O(log n) 最坏界」选左偏树；要「理论最优复杂度证明」才轮到斐波那契堆。</p>
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
          ① <strong>混淆 child 与 sibling</strong>——「左孩子-右兄弟」里 <code>child</code> 只指向第一个孩子，其余孩子靠 <code>sibling</code> 串起来；把两者搞混会让整棵树断裂。<br/>
          ② <strong>配对时漏掉「落单」的孩子</strong>——孩子总数是奇数时，最后一个没有配对对象，必须原样保留进幸存者列表，否则会丢节点。<br/>
          ③ <strong>把 deleteMin 的合并写成「从左到右一路 merge」</strong>——虽然能跑，但会退化成 O(n)，「两两配对」才是均摊 O(log n) 的关键。<br/>
          ④ <strong>merge 忘记把较大者挂为 child 后断开它原来的 sibling</strong>——会残留悬空的 sibling 指针，破坏链表结构。
          </p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆口诀：</strong>「merge 根小当爹 O(1)；deleteMin 删根后『两两配对 + 从左到右』」。
          把握这两个操作，配对堆就写对了。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：deleteMin 两两配对
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          红色 = 被删根；绿色 = 新根。实线 = child（父→第一个孩子），虚线 = sibling（兄弟链）。
          观察删除根 5 后，孩子们如何「两两配对」再「从左到右」合并出新根 7。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ tNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doDeleteMin" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">🗑️ deleteMin 两两配对</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="'e'+e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-line v-for="l in tSib" :key="'s'+l.a+'-'+l.b" :config="sibCfg(l)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>本质：</strong>用「左孩子-右兄弟」表示多叉树的可并堆，节点只有 val + child + sibling</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>merge：</strong>根小的当根，另一个挂为第一个孩子，O(1)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>insert：</strong>merge(root, 单节点)，O(1)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>deleteMin：</strong>删根 → 孩子两两配对合并 → 幸存者从左到右合并，均摊 O(log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>decrease-key：</strong>均摊 O(1)，工程上极受欢迎</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>定位：</strong>实现简单 + 实际性能常胜 → 「实用高效的可并堆」首选</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-3-advanced-heap/dsa-5-3-2-fib-heap" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：斐波那契堆</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-1-foundation/dsa-6-1-1-repr" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：图的表示 →</RouterLink>
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
  { id: "sec-1", name: "是什么 / 为什么实用" },
  { id: "sec-2", name: "结构与 merge" },
  { id: "sec-3", name: "deleteMin 两两配对" },
  { id: "sec-4", name: "复杂度对比" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 配对堆动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const R = 24, H = ref(360), W = ref(720)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r,ms))

interface PNode { id:number; val:number; x:number; y:number; color:string; s?:number }
const tNodes = reactive<PNode[]>([])
const tEdges = reactive<{a:number; b:number}[]>([])   // child 边（实线）
const tSib = reactive<{a:number; b:number}[]>([])     // sibling 边（虚线）

type PairSpec = { nodes: {id:number; val:number; x:number; y:number; color?:string}[]; edges?: {a:number; b:number}[]; sib?: {a:number; b:number}[] }

function drawPair(spec: PairSpec) {
  tNodes.splice(0); tEdges.splice(0); tSib.splice(0)
  (spec.edges ?? []).forEach(e => tEdges.push({ a:e.a, b:e.b }))
  (spec.sib ?? []).forEach(l => tSib.push({ a:l.a, b:l.b }))
  spec.nodes.forEach(n => tNodes.push({ id:n.id, val:n.val, x:n.x, y:n.y, color:n.color ?? C.cyan, s:1 }))
}

// 节点 id：1=5 2=7 3=9 4=11 5=13 6=15
const pairInit: PairSpec = {
  nodes: [
    { id:1, val:5, x:360, y:70 }, { id:2, val:7, x:80, y:180 }, { id:3, val:9, x:200, y:180 },
    { id:4, val:11, x:320, y:180 }, { id:5, val:13, x:440, y:180 }, { id:6, val:15, x:560, y:180 },
  ],
  edges: [ {a:1,b:2} ],
  sib: [ {a:2,b:3}, {a:3,b:4}, {a:4,b:5}, {a:5,b:6} ],
}
const pairRootRed: PairSpec = {
  nodes: [
    { id:1, val:5, x:360, y:70, color:C.red }, { id:2, val:7, x:80, y:180 }, { id:3, val:9, x:200, y:180 },
    { id:4, val:11, x:320, y:180 }, { id:5, val:13, x:440, y:180 }, { id:6, val:15, x:560, y:180 },
  ],
  edges: [ {a:1,b:2} ],
  sib: [ {a:2,b:3}, {a:3,b:4}, {a:4,b:5}, {a:5,b:6} ],
}
const pairChildren: PairSpec = {
  nodes: [
    { id:2, val:7, x:80, y:90 }, { id:3, val:9, x:200, y:90 }, { id:4, val:11, x:320, y:90 },
    { id:5, val:13, x:440, y:90 }, { id:6, val:15, x:560, y:90 },
  ],
  sib: [ {a:2,b:3}, {a:3,b:4}, {a:4,b:5}, {a:5,b:6} ],
}
const pairFirstPass: PairSpec = {
  nodes: [
    { id:2, val:7, x:140, y:90, color:C.orange }, { id:3, val:9, x:140, y:200 },
    { id:4, val:11, x:380, y:90, color:C.orange }, { id:5, val:13, x:380, y:200 },
    { id:6, val:15, x:560, y:90 },
  ],
  edges: [ {a:2,b:3}, {a:4,b:5} ],
  sib: [ {a:2,b:4}, {a:4,b:6} ],
}
const pairSecondPass: PairSpec = {
  nodes: [
    { id:2, val:7, x:240, y:90, color:C.orange }, { id:3, val:9, x:100, y:200 },
    { id:4, val:11, x:300, y:200 }, { id:5, val:13, x:260, y:310 },
    { id:6, val:15, x:540, y:90 },
  ],
  edges: [ {a:2,b:3}, {a:4,b:5} ],
  sib: [ {a:3,b:4}, {a:2,b:6} ],
}
const pairFinal: PairSpec = {
  nodes: [
    { id:2, val:7, x:360, y:90, color:C.green }, { id:3, val:9, x:140, y:200 },
    { id:4, val:11, x:300, y:200 }, { id:5, val:13, x:260, y:310 },
    { id:6, val:15, x:460, y:200 },
  ],
  edges: [ {a:2,b:3}, {a:4,b:5} ],
  sib: [ {a:3,b:4}, {a:4,b:6} ],
}

function pos(id:number): PNode { return tNodes.find(n => n.id === id)! }
function edgeCfg(e:{a:number;b:number}) { const pa = pos(e.a), pb = pos(e.b); return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke:'#0891b2', strokeWidth:2 } }
function sibCfg(l:{a:number;b:number}) { const pa = pos(l.a), pb = pos(l.b); return { points:[pa.x+R, pa.y, pb.x-R, pb.y], stroke:'#94a3b8', strokeWidth:1.5, dash:[4,3] } }
function circleCfg(n:any) { const s = n.s ?? 1; return { x:n.x, y:n.y, radius:R*s, fill:n.color, stroke:n.color===C.orange?'#d97706':n.color===C.red?'#dc2626':n.color===C.green?'#22c55e':'#64748b', strokeWidth:(n.color===C.orange||n.color===C.red||n.color===C.green)?3:1.5, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 } }
function tTextCfg(n:any) { const s = n.s ?? 1; return { x:n.x-R, y:n.y-R, width:R*2, height:R*2, text:String(n.val), fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:n.color===C.green?'#0f172a':'#fff', align:'center', verticalAlign:'middle', scale:{x:s,y:s} } }

async function act(msg:string, label:string, fn:() => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(300); busy.value = false; status.value = ''; opLabel.value = '' }
}

async function doDeleteMin() {
  act('deleteMin 两两配对', 'deleteMin O(log n) 均摊', async () => {
    drawPair(pairInit); status.value = '初始：根 5，孩子链 7→9→11→13→15（实线 child，虚线 sibling）'; await d(1300)
    drawPair(pairRootRed); status.value = '① 删除根 5（红色）'; await d(1100)
    drawPair(pairChildren); status.value = '② 5 的孩子「提升」成 5 个待合并的小堆'; await d(1200)
    drawPair(pairFirstPass); status.value = '③ 两两配对：merge(7,9)→7（9 挂 7）；merge(11,13)→11（13 挂 11）；15 落单'; await d(1700)
    drawPair(pairSecondPass); status.value = '④ 从左到右合并：merge(7,11)→7，7 的孩子是 9、11（11 仍带 13）'; await d(1700)
    drawPair(pairFinal); status.value = '⑤ merge(7,15)→7 → 最终新根为 7，孩子 9、11、15'; await d(1600)
  })
}

function doReset() { drawPair(pairInit); status.value = ''; opLabel.value = '' }

let ro: ResizeObserver|null = null
onMounted(() => {
  drawPair(pairInit)
  if (box.value) { W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const nodeCode = `// ===== 配对堆节点：child + sibling（左孩子-右兄弟）=====
class PairingNode {
    val: number
    child: PairingNode | null    // 第一个孩子
    sibling: PairingNode | null  // 下一个兄弟
    constructor(val: number) {
        this.val = val
        this.child = null
        this.sibling = null
    }
}

// 一棵多叉树如何压成「左孩子-右兄弟」：
//   根 5 有孩子 7, 9, 11, 13, 15
//   表示成：5.child -> 7, 7.sibling -> 9, 9.sibling -> 11, ...
//   即：child 只指向第一个孩子，其余靠 sibling 串成链`

const mergeCode = `// ===== merge：根小的当根，另一个挂为第一个孩子，O(1) =====
function merge(a: PairingNode | null, b: PairingNode | null): PairingNode | null {
    if (!a) return b
    if (!b) return a
    if (a.val > b.val) [a, b] = [b, a]   // 保证 a 是更小的根
    b.sibling = a.child                  // b 顶到孩子链的最前面
    a.child = b                          // b 成为 a 的第一个孩子
    return a
}

// 手动模拟 merge(7, 9)：
//   7 < 9，7 当根
//   9.sibling = 7.child（当前为 null）
//   7.child = 9
// 结果：7 是根，9 是 7 的第一个孩子`

const deleteMinCode = `// ===== insert：merge 一个单节点，O(1) =====
function insert(root: PairingNode | null, val: number): PairingNode {
    return merge(root, new PairingNode(val))
}

// ===== deleteMin：删根 → 两两配对 → 从左到右合并 =====
function deleteMin(root: PairingNode | null): PairingNode | null {
    if (!root) return null
    return twoPass(root.child)           // 根被丢弃，处理它的孩子们
}

// 两遍扫描（two-pass pairing）——「配对堆」名字的由来
function twoPass(first: PairingNode | null): PairingNode | null {
    if (!first) return null
    if (!first.sibling) return first     // 只剩一个，直接返回（处理「落单」）
    // 第一遍：从左到右两两配对
    const a = first
    const b = first.sibling!
    const rest = b.sibling               // 剩余未配对的部分
    a.sibling = null
    b.sibling = null
    // 第二遍：当前配对的合并结果，再与剩余部分（递归同样处理）合并
    return merge(merge(a, b), twoPass(rest))
}

// 手动模拟 deleteMin(根=5)，孩子链 7→9→11→13→15：
// twoPass(7,9,11,13,15):
//   配对(7,9) -> merge -> 7；剩 (11,13,15)
//     配对(11,13) -> merge -> 11；剩 (15)
//       15 落单 -> 返回 15
//     返回 merge(11, 15) -> 11（孩子 13、15）
//   返回 merge(7, 11) -> 7（孩子 9、11、15，其中 11 带 13）
// 输出: 新根 7`

const usageCode = `// ===== 为什么配对堆「实用高效」？=====
// 1. 实现简单：只有 child + sibling 两个指针，无 marked/循环链表
// 2. 常数小：deleteMin 的两两配对做的是「相邻合并」，缓存友好
// 3. 实际快：基准测试常快于斐波那契堆，逼近甚至超过二叉堆

// 均摊复杂度（最坏单次可能更高，但均摊很稳）：
//   insert / merge / decrease-key: O(1)
//   deleteMin: O(log n)

// 使用场景：
//   - 需要可并堆 + 频繁 decrease-key（如 Dijkstra、Prim）
//   - 想要「斐波那契堆的复杂度」但「二叉堆的实现成本」
//   - 通用优先队列（Python 的 heapq 用的是二叉堆，但不少高性能库选配对堆）`
</script>
