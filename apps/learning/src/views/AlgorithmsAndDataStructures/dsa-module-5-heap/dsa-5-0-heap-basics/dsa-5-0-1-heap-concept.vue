<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📦 堆的概念与性质</h1>
          <p class="text-sm text-slate-500 mt-1">堆 = 完全二叉树 + 堆序性 —— 一种「部分有序」的树</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 5-0</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：一棵「只有父子有序」的完全二叉树
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          堆（Heap）的本质只有两句话：<strong>① 它是一棵完全二叉树</strong>（除最后一层外全满，最后一层靠左填）；
          <strong>② 它满足堆序性</strong>——大顶堆中任意父节点 <strong>≥</strong> 所有子节点，小顶堆中任意父节点 <strong>≤</strong> 所有子节点。
          注意堆<strong>不要求</strong>兄弟节点之间有序，也不要求整棵树像 BST 那样「左小右大」，所以堆是「部分有序」而非「完全有序」。
        </p>

        <!-- 结构图：大顶堆 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 330" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="c1-e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">大顶堆：任意父节点 ≥ 子节点（兄弟之间无顺序要求）</text>

            <!-- 边 -->
            <line x1="360" y1="74" x2="240" y2="131" stroke="#94a3b8" stroke-width="2" marker-end="url(#c1-e)" />
            <line x1="360" y1="74" x2="480" y2="131" stroke="#94a3b8" stroke-width="2" marker-end="url(#c1-e)" />
            <line x1="240" y1="179" x2="144" y2="236" stroke="#94a3b8" stroke-width="2" marker-end="url(#c1-e)" />
            <line x1="240" y1="179" x2="288" y2="236" stroke="#94a3b8" stroke-width="2" marker-end="url(#c1-e)" />
            <line x1="480" y1="179" x2="432" y2="236" stroke="#94a3b8" stroke-width="2" marker-end="url(#c1-e)" />
            <line x1="480" y1="179" x2="576" y2="236" stroke="#94a3b8" stroke-width="2" marker-end="url(#c1-e)" />

            <!-- 节点 -->
            <circle cx="360" cy="50" r="24" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="360" y="44" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <text x="360" y="62" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">[0]</text>
            <circle cx="240" cy="155" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="240" y="149" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <text x="240" y="167" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">[1]</text>
            <circle cx="480" cy="155" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="480" y="149" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <text x="480" y="167" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">[2]</text>
            <circle cx="144" cy="260" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="144" y="254" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <text x="144" y="272" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">[3]</text>
            <circle cx="288" cy="260" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="288" y="254" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
            <text x="288" y="272" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">[4]</text>
            <circle cx="432" cy="260" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="432" y="254" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <text x="432" y="272" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">[5]</text>
            <circle cx="576" cy="260" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="576" y="254" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <text x="576" y="272" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">[6]</text>

            <!-- 图例 -->
            <text x="16" y="318" font-size="11" font-family="monospace" fill="#64748b">堆顶 arr[0] = 9 是最大值；父[1]=7 ≥ 子[3]=3、子[4]=6；父[2]=8 ≥ 子[5]=4、子[6]=1</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：大顶堆结构 —— 节点标注「值」和「数组下标 [i]」，橙色描边 = 堆顶（最大值）</figcaption>
        </figure>

        <!-- 操作示意图：大顶堆 vs 小顶堆 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">同一组数字，两种堆序 → 堆顶完全不同</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <svg viewBox="0 0 360 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="16" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">大顶堆：父 ≥ 子</text>
              <line x1="180" y1="62" x2="90" y2="116" stroke="#94a3b8" stroke-width="2" />
              <line x1="180" y1="62" x2="270" y2="116" stroke="#94a3b8" stroke-width="2" />
              <line x1="90" y1="158" x2="42" y2="210" stroke="#94a3b8" stroke-width="2" />
              <line x1="90" y1="158" x2="138" y2="210" stroke="#94a3b8" stroke-width="2" />
              <line x1="270" y1="158" x2="222" y2="210" stroke="#94a3b8" stroke-width="2" />
              <line x1="270" y1="158" x2="318" y2="210" stroke="#94a3b8" stroke-width="2" />
              <circle cx="180" cy="40" r="18" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
              <text x="180" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <circle cx="90" cy="140" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="90" y="140" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <circle cx="270" cy="140" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="270" y="140" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <circle cx="42" cy="226" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="42" y="226" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <circle cx="138" cy="226" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="138" y="226" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
              <circle cx="222" cy="226" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="222" y="226" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <circle cx="318" cy="226" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="318" y="226" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">堆顶 = 9（最大值），用于「取最大」</figcaption>
          </figure>
          <figure>
            <svg viewBox="0 0 360 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="16" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">小顶堆：父 ≤ 子</text>
              <line x1="180" y1="62" x2="90" y2="116" stroke="#94a3b8" stroke-width="2" />
              <line x1="180" y1="62" x2="270" y2="116" stroke="#94a3b8" stroke-width="2" />
              <line x1="90" y1="158" x2="42" y2="210" stroke="#94a3b8" stroke-width="2" />
              <line x1="90" y1="158" x2="138" y2="210" stroke="#94a3b8" stroke-width="2" />
              <line x1="270" y1="158" x2="222" y2="210" stroke="#94a3b8" stroke-width="2" />
              <line x1="270" y1="158" x2="318" y2="210" stroke="#94a3b8" stroke-width="2" />
              <circle cx="180" cy="40" r="18" fill="#4ade80" stroke="#f59e0b" stroke-width="3" />
              <text x="180" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
              <circle cx="90" cy="140" r="18" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="90" y="140" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
              <circle cx="270" cy="140" r="18" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="270" y="140" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">4</text>
              <circle cx="42" cy="226" r="18" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="42" y="226" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">7</text>
              <circle cx="138" cy="226" r="18" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="138" y="226" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">6</text>
              <circle cx="222" cy="226" r="18" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="222" y="226" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
              <circle cx="318" cy="226" r="18" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="318" y="226" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">9</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">堆顶 = 1（最小值），用于「取最小」</figcaption>
          </figure>
        </div>
        <figcaption class="text-xs text-slate-400 mt-1">图 2：同一组数字 {1,3,4,6,7,8,9}，只是比较方向相反，堆顶就从「最大」变成「最小」</figcaption>
      </section>

      <!-- 1. 堆是什么 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          堆是什么 —— 两条规则撑起一个结构
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          堆（Heap）是一种<strong>基于完全二叉树</strong>的抽象数据结构，它只靠两条规则定义自己：
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">① 完全二叉树　② 堆序性（父 ≥ 子 / 父 ≤ 子）</p>
          <p class="text-xs text-cyan-600 text-center">完全二叉树保证「没有空洞」，可以用数组紧凑存储；堆序性保证「堆顶永远是最值」</p>
        </div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>完全二叉树</strong>：除最后一层外每层都填满，最后一层的节点都靠左对齐。这保证它能被「无空洞」地塞进数组（详见 5-1-1）。</li>
          <li><strong>堆序性（heap property）</strong>：大顶堆中父节点 ≥ 子节点；小顶堆中父节点 ≤ 子节点。这是堆唯一的价值来源。</li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          正因为堆只约束「父子」而不管「兄弟」，所以它<strong>牺牲了全局有序</strong>，换来了极低成本的「取最值 + 维护最值」。
          你不需要像排序数组那样花 O(n log n) 去整体排序，就能在 O(1) 拿到最大/最小值、在 O(log n) 内完成插入和删除。
        </p>
        <div class="mb-4"><Code language="ts" :code="heapConceptCode" title="heap_concept.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          堆就像 <strong>React 调度器（scheduler）里的任务优先级队列</strong>——它内部用<strong>最小堆</strong>按任务的
          <code>expirationTime</code>（过期时间）排序，每次都能 O(1) 取出「最紧急」（时间戳最小）的任务去执行，而不需要对所有任务全局排序。<br/>
          也像 <strong>浏览器的事件循环</strong>：宏任务/微任务队列总是先处理「优先级最高」的那一项，而不是按插入顺序严格 FIFO。
          核心思想一致——<strong>只关心「谁最优先」，不关心「整体谁先谁后」</strong>。
          </p>
        </aside>
      </section>

      <!-- 2. 大顶堆 vs 小顶堆 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          大顶堆 vs 小顶堆 —— 只是「大于号」换「小于号」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          大顶堆（max-heap）和小顶堆（min-heap）是堆的两种镜像形态，唯一的区别是<strong>比较方向</strong>。
          实现上只需要一个可替换的比较函数，其余操作（插入、删除、建堆）完全一致。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold">大顶堆 max-heap</th><th class="px-4 py-2 border border-slate-200 font-semibold">小顶堆 min-heap</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">堆序性</td><td class="px-4 py-2 border">父 ≥ 所有子节点</td><td class="px-4 py-2 border">父 ≤ 所有子节点</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">堆顶 arr[0]</td><td class="px-4 py-2 border text-emerald-600 font-semibold">最大值</td><td class="px-4 py-2 border text-emerald-600 font-semibold">最小值</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">典型用途</td><td class="px-4 py-2 border">堆排序、求第 K 大</td><td class="px-4 py-2 border">优先队列、Dijkstra、任务调度</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">实现差异</td><td class="px-4 py-2 border font-mono" colspan="2">只是 <code>a &gt; b</code> 和 <code>a &lt; b</code> 的区别</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="maxMinHeapCode" title="max_min_heap.ts" /></div>
      </section>

      <!-- 3. 澄清易混概念 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          澄清四个极易混淆的「堆」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          「堆」这个词在计算机里有多个完全不同的含义，新手最容易张冠李戴：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">名称</th><th class="px-4 py-2 border border-slate-200 font-semibold">是什么</th><th class="px-4 py-2 border border-slate-200 font-semibold">和本模块的「堆」关系</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">堆（Heap）</td><td class="px-4 py-2 border">完全二叉树 + 堆序性，本模块主角</td><td class="px-4 py-2 border text-cyan-700 font-semibold">✓ 就是这个</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">内存堆（memory heap）</td><td class="px-4 py-2 border">进程内存中「动态分配」的区域，与栈（stack）相对</td><td class="px-4 py-2 border text-red-600">✗ 无关，只是同名</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">二叉堆（binary heap）</td><td class="px-4 py-2 border">用「完全二叉树」实现的堆（最常见实现）</td><td class="px-4 py-2 border text-amber-600">是堆的一种实现，本模块 5-1 讲它</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">优先队列（priority queue）</td><td class="px-4 py-2 border">抽象数据类型 ADT：每次弹出优先级最高元素</td><td class="px-4 py-2 border text-amber-600">堆是优先队列的典型实现，5-2 讲</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 一句话区分：</strong><br/>
          ① 堆（Heap）= 数据结构；② 内存堆 = 内存区域；③ 二叉堆 = 堆的「完全二叉树 + 数组」实现；④ 优先队列 = 抽象接口，堆是实现它最常用的底层结构。<br/>
          <code>new Array(n).fill(0)</code> 里的 <code>Array</code> 对象分配在<strong>内存堆</strong>上，而它可能被用来实现一个<strong>二叉堆</strong>——两者恰好同名而已。
          </p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① 面试时说「堆就是优先队列」——不严谨。优先队列是<strong>接口</strong>，堆是<strong>实现</strong>；优先队列也可以用有序数组、平衡树实现。<br/>
          ② 把「堆内存」和「堆排序」混为一谈——「堆排序」用的是堆数据结构，「堆内存」只是内存区域命名，两者毫无关联。
          </p>
        </aside>
      </section>

      <!-- 4. 堆的性质 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          堆的三大性质 —— 记住「它不是什么」
        </h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>性质① 堆顶是最值：</strong>大顶堆堆顶是最大值、小顶堆堆顶是最小值——这是堆最核心的用途，O(1) 即可拿到。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>性质② 部分有序：</strong>堆只保证「父 ≥ 子」这一条路径上的顺序，<strong>兄弟节点之间没有任何顺序</strong>。所以堆里取出的是「相对最值」，不是全局有序序列。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>性质③ 不是搜索结构：</strong>堆不像 BST 那样支持 O(log n) 查找任意值；找一个普通值只能 O(n) 遍历。堆擅长的是「找最值、删最值、加新值」。</span></li>
        </ul>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">堆 = 「取最值」专家，不是「查任意值」专家</p>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>误以为堆整体有序</strong>——把大顶堆层序遍历出来 <code>[9,7,8,3,6,4,1]</code> 并不是降序，中间有 <code>7 &gt; 8</code> 的「乱序」。堆排序还得靠反复「取堆顶 + 重建」才能得到有序序列（见 5-1-3）。<br/>
          ② <strong>拿堆去做「查找某值」</strong>——堆没有 BST 的左小右大性质，查找任意值只能 O(n) 遍历，这是用错了工具。
          </p>
        </aside>
      </section>

      <!-- 5. 应用场景 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          应用场景总览 —— 哪里需要「反复取最值」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          凡是需要「<strong>反复取最大/最小</strong>」或「<strong>动态维护前 K 大/小</strong>」的场景，堆都是首选：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">场景</th><th class="px-4 py-2 border border-slate-200 font-semibold">用哪个堆</th><th class="px-4 py-2 border border-slate-200 font-semibold">复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">优先队列</td><td class="px-4 py-2 border">小顶堆</td><td class="px-4 py-2 border font-mono">入 O(log n) / 出 O(log n)</td><td class="px-4 py-2 border">任务调度、消息队列、Dijkstra</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">Top-K</td><td class="px-4 py-2 border">求最大 K 用小顶堆</td><td class="px-4 py-2 border font-mono">O(n log K)</td><td class="px-4 py-2 border">维护固定大小 K 的堆，淘汰堆顶</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">堆排序</td><td class="px-4 py-2 border">大顶堆</td><td class="px-4 py-2 border font-mono">O(n log n)</td><td class="px-4 py-2 border">原地排序，5-1-3 详解</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">Dijkstra 最短路</td><td class="px-4 py-2 border">小顶堆</td><td class="px-4 py-2 border font-mono">O(E log V)</td><td class="px-4 py-2 border">每次取「当前距离最小」的节点</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">求中位数</td><td class="px-4 py-2 border">双堆（大顶 + 小顶）</td><td class="px-4 py-2 border font-mono">O(log n)</td><td class="px-4 py-2 border">数据流中位数，5-2 会讲</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="appScenarioCode" title="heap_scenarios.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>拿到一个问题先问自己——「我是不是只需要反复拿到<strong>当前最值</strong>，而不关心整体顺序？」如果是，堆就是答案；如果还要支持任意值查找，才考虑 BST / 平衡树。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：大顶堆 / 小顶堆切换 + 堆序性校验
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          节点同时标注「值」和「数组下标 [i]」。点「堆序性校验」会逐个检查父节点是否 ≥（大顶堆）或 ≤（小顶堆）其子节点，橙色 = 当前父节点、绿色 = 正在比较的孩子、红色 = 违反堆序。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ tNodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🌳 堆类型: {{ mode === 'max' ? '大顶堆' : '小顶堆' }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doMax" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">⬆️ 大顶堆</button>
          <button @mousedown="doMin" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 hover:shadow-sm">⬇️ 小顶堆</button>
          <button @mousedown="doValidate" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm">🔍 堆序性校验</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="'e'+e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'vt'+n.id" :config="valTextCfg(n)" />
              <v-text v-for="n in tNodes" :key="'it'+n.id" :config="idxTextCfg(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>定义：</strong>堆 = 完全二叉树 + 堆序性（大顶堆父 ≥ 子 / 小顶堆父 ≤ 子）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>堆序性：</strong>只约束父子，不约束兄弟 → 堆是「部分有序」而非「全局有序」</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>核心价值：</strong>O(1) 取最值、O(log n) 插入/删除，适合「反复取最值」的场景</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>澄清概念：</strong>堆 ≠ 内存堆 ≠ 优先队列；二叉堆是堆的实现，优先队列是堆的用途</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>应用：</strong>优先队列、Top-K、堆排序、Dijkstra、数据流中位数</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下一步：</strong>5-1 深入「完全二叉树如何用数组存储」</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-5-advanced-tree/dsa-4-5-4-union-find" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：并查集</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-1-binary-heap/dsa-5-1-1-structure" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：完全二叉树与数组表示 →</RouterLink>
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
  { id: "sec-1", name: "堆是什么" },
  { id: "sec-2", name: "大顶堆 vs 小顶堆" },
  { id: "sec-3", name: "澄清易混概念" },
  { id: "sec-4", name: "堆的三大性质" },
  { id: "sec-5", name: "应用场景总览" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 堆序性动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const R = 22, LEVEL_H = 96, TOP = 50
const H = ref(360), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

interface TNode { id:number; val:number; x:number; y:number; color:string }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{a:number; b:number}[]>([])
const vals = reactive<Record<number, number>>({})
const mode = ref<'max'|'min'>('max')
const tChild: Record<number, {left:number|null; right:number|null}> = {
  0:{left:1,right:2}, 1:{left:3,right:4}, 2:{left:5,right:6},
  3:{left:null,right:null}, 4:{left:null,right:null}, 5:{left:null,right:null}, 6:{left:null,right:null},
}
const MAX_VALS: Record<number, number> = { 0:9, 1:7, 2:8, 3:3, 4:6, 5:4, 6:1 }
const MIN_VALS: Record<number, number> = { 0:1, 1:3, 2:4, 3:7, 4:6, 5:8, 6:9 }

function load(m:'max'|'min') {
  mode.value = m
  Object.keys(vals).forEach(k => delete vals[k])
  const src = m === 'max' ? MAX_VALS : MIN_VALS
  Object.assign(vals, src)
  layout()
}

function layout() {
  tNodes.splice(0); tEdges.splice(0)
  let level = [0], y = TOP
  while (level.length) {
    const gap = W.value / (level.length + 1)
    level.forEach((id, i) => {
      tNodes.push({ id, val: vals[id], x: gap*(i+1), y, color: C.cyan })
    })
    const next: number[] = []
    level.forEach(id => {
      const ch = tChild[id]
      if (ch.left != null) { tEdges.push({a:id, b:ch.left}); next.push(ch.left) }
      if (ch.right != null) { tEdges.push({a:id, b:ch.right}); next.push(ch.right) }
    })
    level = next; y += LEVEL_H
  }
}

function pos(id:number): TNode { return tNodes.find(n => n.id === id)! }
function colorOf(id:number, c:string) { const n = pos(id); if (n) n.color = c }

function edgeCfg(e:{a:number;b:number}) {
  const pa = pos(e.a), pb = pos(e.b)
  return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke:'#94a3b8', strokeWidth:2 }
}
function circleCfg(n:any) {
  const stroke = n.color === C.orange ? '#d97706' : n.color === C.green ? '#16a34a' : n.color === C.red ? '#b91c1c' : '#0891b2'
  const sw = n.color === C.cyan ? 1.5 : 3
  return { x:n.x, y:n.y, radius:R, fill:n.color, stroke, strokeWidth:sw, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
}
function valTextCfg(n:any) {
  return { x:n.x-R, y:n.y-R-7, width:R*2, height:R*2, text:String(n.val), fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle' }
}
function idxTextCfg(n:any) {
  return { x:n.x-R, y:n.y+R-15, width:R*2, height:14, text:'['+n.id+']', fontSize:9, fontFamily:'monospace', fill:'#cffafe', align:'center', verticalAlign:'middle' }
}

async function act(msg:string, label:string, fn:() => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

function doMax() { act('切换到大顶堆', '父 ≥ 子', async () => { load('max'); await d(400); status.value = '大顶堆：堆顶 [0]=9 是最大值' }) }
function doMin() { act('切换到小顶堆', '父 ≤ 子', async () => { load('min'); await d(400); status.value = '小顶堆：堆顶 [0]=1 是最小值' }) }

function doValidate() {
  act('堆序性校验', '遍历父节点', async () => {
    load(mode.value)
    const isMax = mode.value === 'max'
    const n = Object.keys(vals).length
    let cmp = 0
    for (let i = 0; i < (n-1)>>1; i++) {
      colorOf(i, C.orange)
      status.value = `检查父节点 [${i}]=${vals[i]}`
      await d(480)
      const left = 2*i+1, right = 2*i+2
      colorOf(left, C.green); cmp++
      const okL = isMax ? vals[i] >= vals[left] : vals[i] <= vals[left]
      status.value = `父[${i}]=${vals[i]} vs 左[${left}]=${vals[left]} → ${okL?'✓ 满足':'✗ 违反'}`
      if (!okL) colorOf(left, C.red)
      await d(560)
      colorOf(left, C.cyan)
      if (right < n) {
        colorOf(right, C.green); cmp++
        const okR = isMax ? vals[i] >= vals[right] : vals[i] <= vals[right]
        status.value = `父[${i}]=${vals[i]} vs 右[${right}]=${vals[right]} → ${okR?'✓ 满足':'✗ 违反'}`
        if (!okR) colorOf(right, C.red)
        await d(560)
        colorOf(right, C.cyan)
      }
      colorOf(i, C.cyan)
    }
    status.value = `校验完成：共比较 ${cmp} 次（n-1=${n-1} 条父子边）`
    await d(300)
  })
}

function doReset() { load('max'); status.value = ''; opLabel.value = '' }

let ro: ResizeObserver|null = null
onMounted(() => {
  load('max')
  if (box.value) {
    W.value = box.value.clientWidth
    layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const heapConceptCode = `// ===== 堆的定义（以大顶堆为例）=====
// 堆 = 完全二叉树 + 堆序性：
//   大顶堆：任意父节点的值 >= 所有子节点的值
//   小顶堆：任意父节点的值 <= 所有子节点的值
//
// 关键：堆只约束「父子」之间的相对大小，不约束「兄弟」之间。
// 所以堆是「部分有序」，不是「全局有序」。

// ===== 堆序性判断：遍历所有非叶节点 =====
// 非叶节点的下标范围是 [0, (n-1)>>1)：
//   最后一个非叶节点下标 = (n-2)>>1，所以循环上界用 (n-1)>>1
function isMaxHeap(arr: number[]): boolean {
    const n = arr.length
    for (let i = 0; i < (n - 1) >> 1; i++) {
        const left = 2 * i + 1
        const right = 2 * i + 2
        if (arr[i] < arr[left]) return false               // 父 < 左孩子 → 违反堆序
        if (right < n && arr[i] < arr[right]) return false  // 父 < 右孩子 → 违反堆序
    }
    return true
}

const maxHeap = [9, 7, 8, 3, 6, 4, 1]   // 合法大顶堆
const notHeap = [5, 9, 3, 2, 1]         // 根 5 < 左孩子 9 → 非法
console.log(isMaxHeap(maxHeap))
console.log(isMaxHeap(notHeap))
// 输出:
// true
// false`

const maxMinHeapCode = `// ===== 大顶堆 vs 小顶堆：只有比较方向相反 =====
type Cmp = (a: number, b: number) => boolean

const maxCmp: Cmp = (a, b) => a > b   // 大顶堆：父 > 子，堆顶 = 最大值
const minCmp: Cmp = (a, b) => a < b   // 小顶堆：父 < 子，堆顶 = 最小值

// 同一个完全二叉树，换上不同堆序，就得到不同堆：
//
// 大顶堆 maxHeap = [9, 7, 8, 3, 6, 4, 1]
//       9            ← 堆顶是最大
//      / \\
//     7   8
//    / \\ / \\
//   3  6 4  1
//
// 小顶堆 minHeap = [1, 3, 4, 7, 6, 8, 9]
//       1            ← 堆顶是最小
//      / \\
//     3   4
//    / \\ / \\
//   7  6 8  9
//
// 同一组数字 {1,3,4,6,7,8,9}，按不同堆序组织，堆顶完全不同

function top(arr: number[]): number {
    return arr[0]  // 堆顶永远是 arr[0]：O(1)
}
console.log(top([9, 7, 8, 3, 6, 4, 1]))  // 9   (大顶堆取最大)
console.log(top([1, 3, 4, 7, 6, 8, 9]))  // 1   (小顶堆取最小)`

const appScenarioCode = `// ===== 堆的四大应用场景 =====
// 1) 优先队列：每次取「优先级最高」的元素        O(log n)
// 2) Top-K：维护一个大小为 K 的堆               O(n log K)
// 3) 堆排序：建堆 + 反复取堆顶                  O(n log n) 原地
// 4) Dijkstra：用小顶堆维护「当前最近」的节点     O(E log V)

// 以「优先队列」为例（用最小堆抽象，具体 sift 在 5-1-2 实现）：
class MinHeap {
    private data: number[] = []
    get size() { return this.data.length }
    peek(): number { return this.data[0] }   // O(1)：取最小
    push(v: number) { /* siftUp，O(log n) —— 5-1-2 实现 */ }
    pop(): number { /* 取堆顶 + siftDown，O(log n) —— 5-1-2 实现 */ return 0 }
}

// 任务调度：每次弹出耗时最短的任务（模拟）
const pq = new MinHeap()
;[3, 1, 4, 1, 5].forEach(t => pq.push(t))  // 插入任务耗时
while (pq.size > 0) {
    console.log('处理耗时', pq.pop())
}
// 输出（按耗时从小到大）:
// 处理耗时 1
// 处理耗时 1
// 处理耗时 3
// 处理耗时 4
// 处理耗时 5`
</script>
