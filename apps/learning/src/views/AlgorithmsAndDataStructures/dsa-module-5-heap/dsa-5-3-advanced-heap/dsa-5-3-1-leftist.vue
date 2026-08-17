<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌳 左偏树（Leftist Heap）与可并堆</h1>
          <p class="text-sm text-slate-500 mt-1">让「合并两个堆」从 O(n) 降到 O(log n) 的秘诀——一条右路径 + 一次左右交换</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 5-3-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：带「零路径长 npl」的堆
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          左偏树（Leftist Heap）是一种<strong>可并堆（Meldable Heap）</strong>——它最核心的卖点是「两个堆可以在
          <code>O(log n)</code> 内合并成一个」。秘密在于每个节点额外记录一个字段 <strong>npl（Null Path Length，零路径长）</strong>，
          表示「从该节点出发，沿任意路径走到一个 <code>null</code> 空孩子的<strong>最短</strong>距离」，并要求<strong>左孩子的 npl ≥ 右孩子的 npl</strong>
          （左偏性）。这样最短的「右路径」长度就是 <code>O(log n)</code>，合并时只需沿右路径递归。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 340" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="l1-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">左偏树：每个节点标注 npl，且 左孩子 npl ≥ 右孩子 npl（左偏性）</text>

            <!-- 边 -->
            <line x1="360" y1="94" x2="200" y2="146" stroke="#94a3b8" stroke-width="2" marker-end="url(#l1-arr)" />
            <line x1="360" y1="94" x2="520" y2="146" stroke="#94a3b8" stroke-width="2" marker-end="url(#l1-arr)" />
            <line x1="520" y1="194" x2="470" y2="246" stroke="#94a3b8" stroke-width="2" marker-end="url(#l1-arr)" />
            <!-- 空右孩子 -->
            <line x1="520" y1="194" x2="600" y2="246" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="600" cy="270" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="600" y="270" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">null</text>

            <!-- 节点 -->
            <circle cx="360" cy="70" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <text x="360" y="110" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">npl=1</text>

            <circle cx="200" cy="170" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="200" y="170" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">10</text>
            <text x="200" y="210" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">npl=0</text>

            <circle cx="520" cy="170" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="520" y="170" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <text x="520" y="210" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">npl=0</text>

            <circle cx="470" cy="270" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="470" y="270" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">17</text>
            <text x="470" y="310" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">npl=0</text>

            <!-- 图例 -->
            <text x="16" y="322" font-size="11" font-family="monospace" fill="#64748b">npl 定义：叶子 npl=0，null 孩子 npl=-1；npl(node) = 1 + min(npl(左), npl(右))</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：左偏树本体 —— 每个节点旁标注 npl，任意节点满足「左 npl ≥ 右 npl」，因此最短路径就是右路径</figcaption>
        </figure>

        <!-- 操作示意图：合并前 / 合并后 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：merge（合并两堆）—— 比较根 → 递归右子树 → 交换左右</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-slate-500 font-semibold mb-1">合并前：堆 A（根 3）与堆 B（根 4）</p>
            <svg viewBox="0 0 340 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="l2-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <text x="110" y="28" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">堆 A</text>
              <text x="280" y="28" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">堆 B</text>
              <line x1="110" y1="84" x2="60" y2="156" stroke="#94a3b8" stroke-width="2" marker-end="url(#l2-arr)" />
              <line x1="110" y1="84" x2="160" y2="156" stroke="#94a3b8" stroke-width="2" marker-end="url(#l2-arr)" />
              <line x1="160" y1="180" x2="125" y2="236" stroke="#94a3b8" stroke-width="2" marker-end="url(#l2-arr)" />
              <line x1="280" y1="84" x2="240" y2="156" stroke="#94a3b8" stroke-width="2" marker-end="url(#l2-arr)" />
              <circle cx="110" cy="60" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="110" y="60" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <circle cx="60" cy="180" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="60" y="180" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">10</text>
              <circle cx="160" cy="180" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="160" y="180" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <circle cx="125" cy="260" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="125" y="260" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">17</text>
              <circle cx="280" cy="60" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="280" y="60" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <circle cx="240" cy="180" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="240" y="180" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            </svg>
          </div>
          <div>
            <p class="text-xs text-slate-500 font-semibold mb-1">合并后：3 作新根，4 被交换到左边（左 npl 0 &lt; 右 npl 1）</p>
            <svg viewBox="0 0 340 360" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="l3-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <line x1="170" y1="79" x2="95" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#l3-arr)" />
              <line x1="170" y1="79" x2="245" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#l3-arr)" />
              <line x1="95" y1="174" x2="45" y2="221" stroke="#94a3b8" stroke-width="2" marker-end="url(#l3-arr)" />
              <line x1="95" y1="174" x2="145" y2="221" stroke="#94a3b8" stroke-width="2" marker-end="url(#l3-arr)" />
              <line x1="145" y1="269" x2="105" y2="316" stroke="#94a3b8" stroke-width="2" marker-end="url(#l3-arr)" />
              <circle cx="170" cy="55" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="170" y="55" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <text x="170" y="90" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">npl=1</text>
              <circle cx="95" cy="150" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="95" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">4</text>
              <text x="95" y="185" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a">npl=1</text>
              <circle cx="245" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="245" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">10</text>
              <text x="245" y="185" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">npl=0</text>
              <circle cx="45" cy="245" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="45" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <text x="45" y="280" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">npl=0</text>
              <circle cx="145" cy="245" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="145" y="245" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <text x="145" y="280" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">npl=0</text>
              <circle cx="105" cy="340" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="105" y="340" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">17</text>
              <text x="105" y="375" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">npl=0</text>
            </svg>
          </div>
        </div>
        <figcaption class="text-xs text-slate-400 mt-1">图 2：merge 的完整流程 —— 根小的当根；递归合并「右子树」；回程发现左 npl &lt; 右 npl 就交换左右，保证右路径最短</figcaption>
      </section>

      <!-- 1. 为什么需要可并堆 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          为什么普通二叉堆不能高效合并
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          二叉堆（Binary Heap）有个「结构性」硬约束：它必须是一棵<strong>完全二叉树</strong>，靠数组紧凑存储。
          这个约束带来 O(1) 的随机访问和 O(log n) 的插入删除，但也付出代价——<strong>合并两个二叉堆无法只靠「接指针」完成</strong>，
          只能把两个数组拼起来重新 heapify（O(n)），或把一堆元素逐一 insert（O(n log n)）。
        </p>
        <div class="mb-4"><Code language="ts" :code="naiveMergeCode" title="binary_heap_merge.ts" /></div>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">二叉堆合并 O(n)  vs  左偏树合并 O(log n)</p>
          <p class="text-xs text-slate-500 mt-1">「完全二叉树」是二叉堆的枷锁，也是左偏树「松绑」的突破口</p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          可并堆 ≈ <strong>可快速合并的多个「有序集合」</strong>。<br/>
          二叉堆合并像 <code>Array.prototype.concat</code> + 重新排序——要把两个数组的元素全部复制一遍（O(n)）；<br/>
          左偏树合并像<strong>两条已排序链表的归并</strong>——只需沿「右路径」这个最薄的边界做少量指针重连（O(log n)）。<br/>
          再比如：多个 <code>Set</code> 求并集，逐项遍历是 O(n)；而如果每个集合本身维护着「最薄的一条边」，合并就能省到 O(log n)。
          </p>
        </aside>
      </section>

      <!-- 2. 定义与 npl -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          定义：npl（零路径长）与左偏性
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          左偏树是满足<strong>堆序</strong>（父 ≤ 子，小顶堆）的二叉树，外加一条<strong>左偏性质</strong>。理解它的关键只有一个字段：
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">
            npl(node) = 到最近 null 空孩子的最短距离
          </p>
          <p class="text-xs text-cyan-600 text-center">
            边界：null 的 npl = -1；叶子 npl = 0；递归：npl = 1 + min(npl(左), npl(右))
          </p>
        </div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>null（空节点）的 npl 定义为 <strong>-1</strong>（不是 0！这是最常见的坑）</li>
          <li>叶子节点没有孩子，到最近的 null 距离是 0，所以 <strong>npl = 0</strong></li>
          <li>一般节点 <code>npl = 1 + min(npl(left), npl(right))</code>——取更近的那个孩子</li>
          <li><strong>左偏性质</strong>：对任意节点，<code>npl(left) ≥ npl(right)</code>（右孩子总是更「浅」的一边）</li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          左偏性带来的直接推论：<strong>「右路径」（一路沿右孩子走）是整棵树里最短的 null 路径</strong>。
          而一棵有 n 个节点、右路径长度为 r 的左偏树，其节点数至少是 <code>2^r - 1</code>（沿右路径每一层，左子树也必须「够深」才能维持左偏），
          因此 <code>r = O(log n)</code>。合并只需沿右路径走，自然就是 O(log n)。
        </p>
        <div class="mb-4"><Code language="ts" :code="nodeCode" title="leftist_node.ts" /></div>
      </section>

      <!-- 3. merge 合并 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          merge —— 可并堆的灵魂，O(log n)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          merge 是左偏树唯一的「枢纽」操作，insert 和 deleteMin 都是它的特例。递归三步，非常对称：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>选根</strong>：比较两个堆的根，值更小的当新根（另一个当「被并入者」）</li>
          <li><strong>递归</strong>：把「被并入者」和<strong>新根的右子树</strong>递归 merge，结果挂回右子树</li>
          <li><strong>维护左偏</strong>：回程若发现 <code>npl(left) &lt; npl(right)</code>，交换左右；再更新自己的 npl</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="mergeCode" title="leftist_merge.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>为什么「递归右子树」而不是随便递归？
          因为左偏性保证<strong>右路径最短</strong>，沿右路径递归能让递归深度始终是 O(log n)。如果两棵子树 npl 相等，第 3 步不交换，
          树仍然是左偏的——交换只在「左边变得比右边浅」时才发生。</p>
        </aside>
      </section>

      <!-- 4. insert 与 deleteMin -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          insert 与 deleteMin —— 都是 merge 的套壳
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          一旦有了 merge，其余操作都退化成了「合并」：
          <strong>insert</strong> 就是把一个单节点堆 merge 进现有堆；
          <strong>deleteMin</strong> 就是删掉根之后，把它的左右两棵子树再 merge 回去。三者复杂度都是 O(log n)。
        </p>
        <div class="mb-4"><Code language="ts" :code="opsCode" title="leftist_ops.ts" /></div>
        <div class="mb-4"><Code language="ts" :code="usageCode" title="leftist_usage.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>当你需要「频繁两两合并多个优先队列」时（如多路归并、K 个有序流的合并），
          左偏树是比二叉堆更合适的选择——它把「建一个合并堆」的 O(n) 摊薄成了一次次 O(log n) 的 merge。</p>
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
          ① <strong>null 的 npl 记成 0</strong>——正确是 <strong>-1</strong>。若记成 0，叶子的 npl 会错算成 1，左偏性判断全乱，合并复杂度退化。<br/>
          ② <strong>merge 回程忘记「交换左右」</strong>——只递归合并右子树却不维护左偏性，右路径会越拉越长，最终合并从 O(log n) 退化到 O(n)。<br/>
          ③ <strong>把 insert 当成「找位置插入」</strong>——左偏树没有「按大小找坑位」这一步，insert 就是 <code>merge(root, 单节点)</code>，别和 BST 的插入混淆。<br/>
          ④ <strong>忘记在交换左右后更新 npl</strong>——交换后节点的 npl 应取 <code>npl(right) + 1</code>（右孩子已是最浅一侧），不更新会让后续合并判断出错。
          </p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆口诀：</strong>「根小当新根，右子树递归并，左边浅了换左右，npl 取右加一」。把这四步写对，左偏树就稳了。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：合并两堆（递归 + 交换左右）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          橙色 = 正在比较/处理的节点，绿色 = 换位后的子树根。每个节点下方标注 <code>npl</code>，观察回程时「左 npl &lt; 右 npl → 交换」如何把 4 从右边换到左边。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ tNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doMerge" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">🔀 合并两堆 merge</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="'e'+e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="tTextCfg(n)" />
              <v-text v-for="n in tNodes" :key="'n'+n.id" :config="nplCfg(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>动机：</strong>二叉堆是「完全二叉树」，合并只能 O(n) 重建；可并堆要的就是 O(log n) 合并</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>npl：</strong>零路径长 = 到最近 null 孩子的距离；null 为 -1，叶子为 0</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>左偏性：</strong>左孩子 npl ≥ 右孩子 npl → 右路径最短 = O(log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>merge：</strong>根小当根 → 递归合并右子树 → 左浅则交换左右 → 更新 npl</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>insert / deleteMin：</strong>insert = merge 单节点；deleteMin = merge 左右子树</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度：</strong>merge / insert / deleteMin 均为 O(log n)</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-2-priority-queue/dsa-5-2-4-schedule" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：任务调度器</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-3-advanced-heap/dsa-5-3-2-fib-heap" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：斐波那契堆 →</RouterLink>
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
  { id: "sec-1", name: "为什么需要可并堆" },
  { id: "sec-2", name: "定义与 npl" },
  { id: "sec-3", name: "merge 合并" },
  { id: "sec-4", name: "insert/deleteMin" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 左偏树合并动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const R = 24, H = ref(430), W = ref(720)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r,ms))

interface TNode { id:number; val:number; x:number; y:number; color:string; s?:number; npl:number }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{a:number; b:number}[]>([])

type TreeSpec = { nodes: {id:number; val:number; x:number; y:number; npl:number; color?:string}[]; edges: {a:number; b:number}[] }

function drawTree(spec: TreeSpec) {
  tNodes.splice(0); tEdges.splice(0)
  spec.edges.forEach(e => tEdges.push({ a:e.a, b:e.b }))
  spec.nodes.forEach(n => tNodes.push({ id:n.id, val:n.val, x:n.x, y:n.y, color:n.color ?? C.cyan, s:1, npl:n.npl }))
}

// 节点 id：1=3 2=10 3=8 4=17 5=4 6=9
const frame0: TreeSpec = {
  nodes: [
    { id:1, val:3, x:170, y:80, npl:1 }, { id:2, val:10, x:100, y:175, npl:0 },
    { id:3, val:8, x:240, y:175, npl:0 }, { id:4, val:17, x:200, y:270, npl:0 },
    { id:5, val:4, x:560, y:80, npl:0 }, { id:6, val:9, x:510, y:175, npl:0 },
  ],
  edges: [ {a:1,b:2}, {a:1,b:3}, {a:3,b:4}, {a:5,b:6} ],
}
const frame1: TreeSpec = {
  nodes: [
    { id:1, val:3, x:170, y:80, npl:1, color:C.orange }, { id:2, val:10, x:100, y:175, npl:0 },
    { id:3, val:8, x:240, y:175, npl:0 }, { id:4, val:17, x:200, y:270, npl:0 },
    { id:5, val:4, x:560, y:80, npl:0, color:C.orange }, { id:6, val:9, x:510, y:175, npl:0 },
  ],
  edges: [ {a:1,b:2}, {a:1,b:3}, {a:3,b:4}, {a:5,b:6} ],
}
const frame2: TreeSpec = {
  nodes: [
    { id:1, val:3, x:170, y:80, npl:1 }, { id:2, val:10, x:100, y:175, npl:0 },
    { id:3, val:8, x:240, y:175, npl:0, color:C.orange }, { id:4, val:17, x:200, y:270, npl:0 },
    { id:5, val:4, x:560, y:80, npl:0, color:C.orange }, { id:6, val:9, x:510, y:175, npl:0 },
  ],
  edges: [ {a:1,b:2}, {a:1,b:3}, {a:3,b:4}, {a:5,b:6} ],
}
const frame3: TreeSpec = {
  nodes: [
    { id:1, val:3, x:170, y:80, npl:1, color:C.orange }, { id:2, val:10, x:100, y:175, npl:0 },
    { id:5, val:4, x:250, y:175, npl:1, color:C.green }, { id:6, val:9, x:190, y:270, npl:0 },
    { id:3, val:8, x:320, y:270, npl:0 }, { id:4, val:17, x:280, y:360, npl:0 },
  ],
  edges: [ {a:1,b:2}, {a:1,b:5}, {a:5,b:6}, {a:5,b:3}, {a:3,b:4} ],
}
const frame4: TreeSpec = {
  nodes: [
    { id:1, val:3, x:360, y:80, npl:1 }, { id:5, val:4, x:220, y:175, npl:1, color:C.green },
    { id:2, val:10, x:500, y:175, npl:0 }, { id:6, val:9, x:150, y:270, npl:0 },
    { id:3, val:8, x:290, y:270, npl:0 }, { id:4, val:17, x:250, y:360, npl:0 },
  ],
  edges: [ {a:1,b:5}, {a:1,b:2}, {a:5,b:6}, {a:5,b:3}, {a:3,b:4} ],
}

function pos(id:number): TNode { return tNodes.find(n => n.id === id)! }
function edgeCfg(e:{a:number;b:number}) { const pa = pos(e.a), pb = pos(e.b); return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke:'#94a3b8', strokeWidth:2 } }
function circleCfg(n:any) { const s = n.s ?? 1; return { x:n.x, y:n.y, radius:R*s, fill:n.color, stroke:n.color===C.orange?'#d97706':n.color===C.green?'#22c55e':'#64748b', strokeWidth:(n.color===C.orange||n.color===C.green)?3:1.5, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 } }
function tTextCfg(n:any) { const s = n.s ?? 1; return { x:n.x-R, y:n.y-R, width:R*2, height:R*2, text:String(n.val), fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle', scale:{x:s,y:s} } }
function nplCfg(n:any) { return { x:n.x-34, y:n.y+R+2, width:68, text:'npl='+n.npl, fontSize:11, fontFamily:'monospace', fill:n.color===C.green?'#16a34a':C.muted, align:'center' } }

async function act(msg:string, label:string, fn:() => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(300); busy.value = false; status.value = ''; opLabel.value = '' }
}

async function doMerge() {
  act('合并两堆 merge  O(log n)', 'merge O(log n)', async () => {
    drawTree(frame0); status.value = '初始：堆 A 根=3，堆 B 根=4（各自已是左偏树）'; await d(1200)
    drawTree(frame1); status.value = '① 比较根：3 < 4 → 3 作合并后的新根'; await d(1200)
    drawTree(frame2); status.value = '② 递归 merge(3.right=8, 4)：8 > 4 → 交换，4 作子堆根'; await d(1200)
    drawTree(frame3); status.value = '③ 4.right 挂 8，4.left 仍是 9；回到 3：左 npl=0 < 右 npl=1 → 需交换左右'; await d(1400)
    drawTree(frame4); status.value = '④ 交换左右：3.left=4，3.right=10 → 合并完成，仍是左偏树'; await d(1400)
  })
}

function doReset() { drawTree(frame0); status.value = ''; opLabel.value = '' }

let ro: ResizeObserver|null = null
onMounted(() => {
  drawTree(frame0)
  if (box.value) { W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const naiveMergeCode = `// ===== 为什么二叉堆合并是 O(n)？=====
// 二叉堆 = 完全二叉树 + 数组紧凑存储，没有「可拼接」的指针边界
// 合并两个二叉堆，只能退化成以下两种做法：

// 做法 1：拼起来再重新 heapify —— O(n)
function mergeBinaryHeaps(a: number[], b: number[]): number[] {
    const all = [...a, ...b]        // 直接拼成一个数组，O(n)
    buildMinHeap(all)               // 自底向上 heapify，O(n)
    return all
}

// 做法 2：把 b 的元素逐一 insert 进 a —— O(m log n)
function mergeByInsert(a: number[], b: number[]): number[] {
    for (const x of b) {
        a.push(x)                   // 放到末尾
        siftUp(a, a.length - 1)     // 上浮，O(log n)
    }
    return a                        // 总共 O(m log n)
}

// 对比：左偏树的 merge 是 O(log n)！
// 因为左偏树是「任意形状的二叉树」，合并只需沿最薄的右路径重连指针，
// 不需要维持「完全二叉树」这个结构性枷锁。

// 复杂度一览：
//   操作         二叉堆          左偏树
//   insert       O(log n)       O(log n)
//   deleteMin    O(log n)       O(log n)
//   merge        O(n) 或 O(m log n)  O(log n)  ← 关键差异`

const nodeCode = `// ===== 左偏树节点：值 + npl + 左右孩子 =====
class LeftistNode {
    val: number
    npl: number            // 零路径长：到最近 null 孩子的距离
    left: LeftistNode | null
    right: LeftistNode | null
    constructor(val: number) {
        this.val = val
        this.npl = 0       // 单节点（叶子）npl = 0
        this.left = null
        this.right = null
    }
}

// npl 的递归定义：空节点返回 -1（不是 0！）
function npl(node: LeftistNode | null): number {
    return node ? node.npl : -1
}

// 左偏性质检查：左孩子 npl >= 右孩子 npl
// 例子：
//        3 (npl=1)
//       /  \\
//     10    8 (npl=0)
//          /
//         17 (npl=0)
// 3: npl = 1 + min(npl(10), npl(8)) = 1 + min(0, 0) = 1
// 8: npl = 1 + min(npl(17), npl(null)) = 1 + min(0, -1) = 0
// 17: 叶子，npl = 0
// 且 3 满足左偏性：npl(10)=0 >= npl(8)=0  ✓`

const mergeCode = `// ===== merge：可并堆的核心，O(log n) =====
function merge(a: LeftistNode | null, b: LeftistNode | null): LeftistNode | null {
    if (!a) return b
    if (!b) return a
    // ① 保证 a 的根更小（小顶堆）
    if (a.val > b.val) [a, b] = [b, a]
    // ② 递归合并 a 的右子树与 b（沿右路径，长度 O(log n)）
    a.right = merge(a.right, b)
    // ③ 维护左偏性：左 npl < 右 npl 时交换左右
    if (npl(a.left) < npl(a.right)) [a.left, a.right] = [a.right, a.left]
    // ④ 更新 npl = 右孩子 npl + 1（右孩子已是最浅一侧）
    a.npl = npl(a.right) + 1
    return a
}

// 手动模拟 merge(堆A, 堆B)，A 根=3，B 根=4：
// merge(3, 4):
//   3 < 4，3 当根 → 3.right = merge(8, 4)
//     merge(8, 4): 8 > 4 → 交换 → 4.right = merge(null, 8) = 8
//       4 的左孩子 9 (npl=0) 与右孩子 8 (npl=0)：0 >= 0 不交换，npl(4)=1
//   回到 3：左 10(npl=0) < 右 4(npl=1) → 交换左右
//   结果：3.left=4，3.right=10，npl(3)=1
// 输出: 合并后根为 3，4 被换到左边`

const opsCode = `// ===== insert：合并一个单节点，O(log n) =====
function insert(root: LeftistNode | null, val: number): LeftistNode {
    return merge(root, new LeftistNode(val))
}

// ===== deleteMin：删根，合并左右子树，O(log n) =====
function deleteMin(root: LeftistNode | null): LeftistNode | null {
    if (!root) return null
    return merge(root.left, root.right)   // 根被丢弃，左右两堆重新合并
}

// 手动模拟 deleteMin(合并后的堆，根=3)：
// 删掉 3 → merge(4子树, 10)
//   merge(4, 10): 4 < 10 → 4 当根，4.right = merge(4.right, 10)
//   ...最终 4 成为新根
// 输出: 删掉最小值 3 后，剩余节点重新合并成一个左偏树`

const usageCode = `// ===== 实战：动态合并多个有序集合 =====
// 场景：K 台服务器各自维护一个小顶堆，需要定期两两合并做全局归并
// 用左偏树，把「建一个大堆」摊薄成一次次的 O(log n) merge

function meldAll(heaps: (LeftistNode | null)[]): LeftistNode | null {
    let acc: LeftistNode | null = null
    for (const h of heaps) acc = merge(acc, h)   // 每次 O(log n)
    return acc                                    // K 次共 O(K log n)
}

// 等价对比：
//   二叉堆做法：把 K 个数组拼起来 heapify，单次 O(N)，但无法增量合并
//   左偏树做法：随时可以增量 merge，适合「流式」「动态增减」的场景

// 取出全部元素（验证堆序）：
function drainAll(root: LeftistNode | null): number[] {
    const out: number[] = []
    let r = root
    while (r) { out.push(r.val); r = deleteMin(r) }
    return out   // 输出: 递增序列
}`
</script>
