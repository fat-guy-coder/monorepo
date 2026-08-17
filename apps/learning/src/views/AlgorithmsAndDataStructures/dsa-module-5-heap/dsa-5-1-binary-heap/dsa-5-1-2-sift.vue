<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔄 上浮(siftUp)与下沉(siftDown)</h1>
          <p class="text-sm text-slate-500 mt-1">堆的两个核心维护操作 —— 一条路径上的「冒泡」，O(log n)</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 5-1-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：上浮(向上冒泡) 与 下沉(向下沉降)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          堆的插入和删除都会破坏堆序，需要两个「修复」操作把它拉回正轨：<strong>siftUp（上浮）</strong>——新元素从末尾向上冒泡，用于<strong>插入</strong>；
          <strong>siftDown（下沉）</strong>——根/某个节点向下沉降，用于<strong>删除堆顶</strong>和<strong>建堆</strong>。两者都只沿树的一条路径走，因此是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">O(log n)</code>。
        </p>

        <!-- siftUp 示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">siftUp：插入 10 向上冒泡（绿色 = 新节点，橙色 = 冒泡路径）</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <figure>
            <svg viewBox="0 0 360 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">插入前（10 在末尾）</text>
              <line x1="180" y1="64" x2="95" y2="142" stroke="#f59e0b" stroke-width="2.5" />
              <line x1="180" y1="64" x2="265" y2="142" stroke="#94a3b8" stroke-width="2" />
              <line x1="95" y1="220" x2="50" y2="220" stroke="#f59e0b" stroke-width="2.5" />
              <line x1="95" y1="142" x2="140" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="265" y1="142" x2="230" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="265" y1="142" x2="320" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="50" y1="244" x2="40" y2="282" stroke="#f59e0b" stroke-width="2.5" />
              <circle cx="180" cy="40" r="18" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
              <text x="180" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <circle cx="95" cy="142" r="18" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
              <text x="95" y="142" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <circle cx="265" cy="142" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="265" y="142" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <circle cx="50" cy="220" r="18" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
              <text x="50" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <circle cx="140" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="140" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
              <circle cx="230" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="230" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <circle cx="320" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="320" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <circle cx="40" cy="282" r="18" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="40" y="282" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">10</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">10 &gt; 父 3 → 上浮到 [3]；10 &gt; 7 → 上浮到 [1]；10 &gt; 9 → 上浮到 [0]</figcaption>
          </figure>
          <figure>
            <svg viewBox="0 0 360 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="20" font-size="12" font-family="monospace" fill="#16a34a" font-weight="bold">插入后（10 到堆顶）</text>
              <line x1="180" y1="64" x2="95" y2="142" stroke="#94a3b8" stroke-width="2" />
              <line x1="180" y1="64" x2="265" y2="142" stroke="#94a3b8" stroke-width="2" />
              <line x1="95" y1="142" x2="50" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="95" y1="142" x2="140" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="265" y1="142" x2="230" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="265" y1="142" x2="320" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="50" y1="244" x2="40" y2="282" stroke="#94a3b8" stroke-width="2" />
              <circle cx="180" cy="40" r="18" fill="#4ade80" stroke="#f59e0b" stroke-width="3" />
              <text x="180" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">10</text>
              <circle cx="95" cy="142" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="95" y="142" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <circle cx="265" cy="142" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="265" y="142" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <circle cx="50" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="50" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <circle cx="140" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="140" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
              <circle cx="230" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="230" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <circle cx="320" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="320" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <circle cx="40" cy="282" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="40" y="282" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">数组：[10, 9, 8, 7, 6, 4, 1, 3]，堆序恢复</figcaption>
          </figure>
        </div>

        <!-- siftDown 示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">siftDown：根 3 向下沉降（与较大孩子交换）</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <svg viewBox="0 0 360 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="20" font-size="12" font-family="monospace" fill="#ef4444" font-weight="bold">下沉前（根 3 违反堆序）</text>
              <line x1="180" y1="64" x2="95" y2="142" stroke="#f59e0b" stroke-width="2.5" />
              <line x1="180" y1="64" x2="265" y2="142" stroke="#94a3b8" stroke-width="2" />
              <line x1="95" y1="142" x2="50" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="95" y1="142" x2="140" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="265" y1="142" x2="230" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="265" y1="142" x2="320" y2="220" stroke="#94a3b8" stroke-width="2" />
              <circle cx="180" cy="40" r="18" fill="#ef4444" stroke="#b91c1c" stroke-width="2.5" />
              <text x="180" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <circle cx="95" cy="142" r="18" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
              <text x="95" y="142" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <circle cx="265" cy="142" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="265" y="142" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <circle cx="50" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="50" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <circle cx="140" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="140" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
              <circle cx="230" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="230" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <circle cx="320" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="320" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">3 &lt; 左孩子 9 → 与较大孩子 9 交换</figcaption>
          </figure>
          <figure>
            <svg viewBox="0 0 360 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="14" y="20" font-size="12" font-family="monospace" fill="#16a34a" font-weight="bold">下沉后（堆序恢复）</text>
              <line x1="180" y1="64" x2="95" y2="142" stroke="#94a3b8" stroke-width="2" />
              <line x1="180" y1="64" x2="265" y2="142" stroke="#94a3b8" stroke-width="2" />
              <line x1="95" y1="142" x2="50" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="95" y1="142" x2="140" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="265" y1="142" x2="230" y2="220" stroke="#94a3b8" stroke-width="2" />
              <line x1="265" y1="142" x2="320" y2="220" stroke="#94a3b8" stroke-width="2" />
              <circle cx="180" cy="40" r="18" fill="#4ade80" stroke="#22c55e" stroke-width="2.5" />
              <text x="180" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">9</text>
              <circle cx="95" cy="142" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="95" y="142" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <circle cx="265" cy="142" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="265" y="142" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <circle cx="50" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="50" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <circle cx="140" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="140" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
              <circle cx="230" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="230" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <circle cx="320" cy="220" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="320" y="220" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">数组：[9, 7, 8, 3, 6, 4, 1]，堆序恢复</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. siftUp -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          siftUp 上浮 —— 插入用
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          插入时，先把新元素放到数组<strong>末尾</strong>（完全二叉树的最后位置），再让它<strong>向上冒泡</strong>：只要比父节点大（大顶堆），就与父交换，直到满足堆序或到达根。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>新元素放到数组末尾 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">arr[n]</code>（下标 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">n-1</code>）</li>
          <li>计算父节点 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">p = (i-1)&gt;&gt;1</code></li>
          <li>若 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">arr[i] &gt; arr[p]</code>，交换父子，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i = p</code> 继续</li>
          <li>否则（父 ≥ 子）停止，堆序已满足</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="siftUpCode" title="sift_up.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          siftUp 就像<strong>冒泡排序里的「相邻交换」</strong>——但它只在「从叶子到根的这一条路径」上冒泡，而不是遍历整个数组。
          也像 <strong>CSS 的 <code>z-index</code> 提升</strong>：一个新元素不断「挤掉」优先级更低的父元素，直到它到达合适的位置。<br/>
          React 调度器里新任务的 <code>expirationTime</code> 越小越紧急，插进来后就在最小堆里这样「浮」到靠前的位置。
          </p>
        </aside>
      </section>

      <!-- 2. siftDown -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          siftDown 下沉 —— 删除 / 建堆用
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          删除堆顶时，把<strong>最后一个元素</strong>搬到堆顶（否则树会出现空洞），此时堆顶往往太小（大顶堆），需要它<strong>向下沉降</strong>：
          每次与<strong>较大的孩子</strong>交换，直到没有更大的孩子。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>从节点 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i</code> 出发，找左右孩子中<strong>较大</strong>的那个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">largest</code></li>
          <li>若 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">arr[i] &lt; arr[largest]</code>，交换，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i = largest</code> 继续</li>
          <li>否则（没有更大的孩子）停止</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="siftDownCode" title="sift_down.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>忘记边界</strong>——siftDown 必须用 <code>n</code> 参数限定有效范围，右孩子 <code>2i+2</code> 可能越界（<code>r &lt; n</code> 才比较）。建堆/堆排序时 n 会逐步缩小，写死 <code>arr.length</code> 会踩越界。<br/>
          ② <strong>比较方向写反</strong>——大顶堆找<strong>较大</strong>孩子（<code>arr[l] &gt; arr[largest]</code>），小顶堆找<strong>较小</strong>孩子；方向写反会把堆「越修越坏」。
          </p>
        </aside>
      </section>

      <!-- 3. 手动模拟 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          手动模拟 —— 追踪数组下标变化
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          纸上模拟是面试必考，追踪<strong>数组下标</strong>的每一步变化即可。下面用大顶堆演示一次插入和一次删除：
        </p>
        <div class="mb-4"><Code language="ts" :code="simulateCode" title="simulate.ts" /></div>
      </section>

      <!-- 4. 复杂度 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          复杂度分析 —— 一条路径 = O(log n)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          siftUp 和 siftDown 每次都只沿树的一条路径移动一层，最多走<strong>树的高度</strong>那么多次。
          完全二叉树高度是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">⌊log₂n⌋</code>，所以两者都是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">O(log n)</code>。
        </p>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">siftUp  O(log n)　·　siftDown  O(log n)</p>
          <p class="text-xs text-slate-500 mt-1">堆高 = ⌊log₂n⌋，每层只比较 O(1) 次，共 O(log n)</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="pushPopCode" title="max_heap_push_pop.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>插入 = <code>push 末尾 + siftUp</code>；删除堆顶 = <code>末尾顶替根 + siftDown</code>。抓住这两条，任何堆操作都能推出。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：上浮 / 下沉
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          节点标注「值 + [下标]」。橙色 = 当前节点，蓝色 = 父节点，绿色/紫色 = 左右孩子，红色 = 即将交换。「上浮」在末尾插入 10 并冒泡到堆顶；「下沉」让根 3 与较大孩子交换沉降。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ heap.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doSiftUp" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">⬆️ 上浮（插入 10）</button>
          <button @mousedown="doSiftDown" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">⬇️ 下沉（根 3 沉降）</button>
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
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>siftUp 上浮：</strong>新元素从末尾向上冒泡，插入用；父 <code>(i-1)&gt;&gt;1</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>siftDown 下沉：</strong>从堆顶向下沉降，删除/建堆用；与较大孩子交换</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度：</strong>两者都只走一条路径，O(log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>插入 = push + siftUp；删除堆顶 = 末尾顶替 + siftDown</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>坑：</strong>siftDown 要传 <code>n</code> 防越界；大小顶堆比较方向别写反</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下一步：</strong>5-1-3 用 siftDown 批量建堆（O(n)）+ 堆排序</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-1-binary-heap/dsa-5-1-1-structure" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：完全二叉树与数组表示</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-1-binary-heap/dsa-5-1-3-heapify" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：建堆 O(n) 算法与堆排序 →</RouterLink>
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
  { id: "sec-1", name: "siftUp 上浮" },
  { id: "sec-2", name: "siftDown 下沉" },
  { id: "sec-3", name: "手动模拟" },
  { id: "sec-4", name: "复杂度 O(log n)" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-5", name: "小结" },
]

// ===== 🎬 siftUp / siftDown 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0' }
const R = 22, LEVEL_H = 92, TOP = 50
const H = ref(360), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

interface TNode { id:number; val:number; x:number; y:number; color:string }
const heap = reactive<number[]>([])
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{a:number; b:number}[]>([])

function setH() {
  const n = heap.length
  const levels = Math.ceil(Math.log2(n + 1))
  H.value = TOP + levels * LEVEL_H + 50
}

function layout() {
  tNodes.splice(0); tEdges.splice(0)
  const n = heap.length
  let level = [0], y = TOP
  while (level.length) {
    const gap = W.value / (level.length + 1)
    level.forEach((id, i) => tNodes.push({ id, val: heap[id], x: gap*(i+1), y, color: C.cyan }))
    const next: number[] = []
    level.forEach(id => {
      const l = 2*id+1, r = 2*id+2
      if (l < n) { tEdges.push({a:id, b:l}); next.push(l) }
      if (r < n) { tEdges.push({a:id, b:r}); next.push(r) }
    })
    level = next; y += LEVEL_H
  }
  setH()
}

function load(arr:number[]) {
  heap.splice(0)
  heap.push(...arr)
  layout()
}

function pos(id:number): TNode { return tNodes.find(n => n.id === id)! }
function colorOf(id:number, c:string) { const n = pos(id); if (n) n.color = c }
function allCyan() { tNodes.forEach(n => n.color = C.cyan) }
function swap(i:number, j:number) { const t = heap[i]; heap[i] = heap[j]; heap[j] = t; layout() }

function edgeCfg(e:{a:number;b:number}) {
  const pa = pos(e.a), pb = pos(e.b)
  return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke:'#94a3b8', strokeWidth:2 }
}
function circleCfg(n:any) {
  const stroke = n.color === C.cyan ? '#0891b2' : n.color === C.orange ? '#d97706' : n.color === C.green ? '#16a34a' : n.color === C.red ? '#b91c1c' : '#2563eb'
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

function doSiftUp() {
  act('siftUp 上浮', 'O(log n)', async () => {
    load([9,7,8,3,6,4,1])
    status.value = '在末尾插入 10（下标 7）'
    heap.push(10); layout()
    let i = heap.length - 1
    colorOf(i, C.green)
    await d(650)
    colorOf(i, C.orange)
    while (i > 0) {
      const p = (i - 1) >> 1
      colorOf(i, C.orange); colorOf(p, C.blue)
      status.value = `比较：当前 ${heap[i]}[${i}] vs 父 ${heap[p]}[${p}]`
      await d(700)
      if (heap[i] > heap[p]) {
        status.value = `${heap[i]} > ${heap[p]} → 交换 [${i}]↔[${p}]`
        colorOf(i, C.red); colorOf(p, C.red)
        await d(420)
        swap(i, p)
        await d(420)
        i = p
      } else {
        status.value = `${heap[i]} ≤ ${heap[p]} → 停止上浮`
        await d(500)
        break
      }
    }
    allCyan()
    status.value = '上浮完成：10 到达堆顶 [0]'
  })
}

function doSiftDown() {
  act('siftDown 下沉', 'O(log n)', async () => {
    load([3,9,8,7,6,4,1])
    status.value = '根 [0]=3 违反大顶堆，开始下沉'
    await d(500)
    let i = 0
    const n = heap.length
    while (true) {
      const l = 2*i+1, r = 2*i+2
      colorOf(i, C.orange)
      if (l < n) colorOf(l, C.green)
      if (r < n) colorOf(r, C.violet)
      status.value = `比较：当前 ${heap[i]}[${i}] vs 左 ${l<n ? heap[l]+'['+l+']' : '—'} / 右 ${r<n ? heap[r]+'['+r+']' : '—'}`
      await d(750)
      let largest = i
      if (l < n && heap[l] > heap[largest]) largest = l
      if (r < n && heap[r] > heap[largest]) largest = r
      if (largest === i) {
        status.value = '没有更大的孩子 → 下沉结束'
        colorOf(i, C.green)
        await d(600)
        break
      }
      status.value = `与较大孩子 ${heap[largest]}[${largest}] 交换 [${i}]↔[${largest}]`
      colorOf(i, C.red); colorOf(largest, C.red)
      await d(420)
      swap(i, largest)
      await d(420)
      allCyan()
      i = largest
    }
    allCyan()
    status.value = '下沉完成：堆序恢复 [9,7,8,3,6,4,1]'
  })
}

function doReset() { load([9,7,8,3,6,4,1]); status.value = ''; opLabel.value = '' }

let ro: ResizeObserver|null = null
onMounted(() => {
  load([9,7,8,3,6,4,1])
  if (box.value) {
    W.value = box.value.clientWidth
    layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const siftUpCode = `// ===== siftUp 上浮：新元素从末尾向上冒泡（插入用）=====
// 大顶堆：只要 arr[i] > 父节点 arr[p]，就交换，直到满足堆序或到根
function siftUp(arr: number[], i: number): void {
    while (i > 0) {
        const p = (i - 1) >> 1                 // 父节点下标
        if (arr[p] >= arr[i]) break            // 父 >= 我 → 堆序已满足，停
        ;[arr[p], arr[i]] = [arr[i], arr[p]]   // 交换父子
        i = p                                  // 我上浮到父的位置，继续
    }
}

// 手动模拟：向大顶堆 [9,7,8,3,6,4,1] 插入 10
// 初始 [9,7,8,3,6,4,1,10]   ← 10 在末尾下标 7
// i=7: 父 (7-1)>>1=3 → arr[3]=3 < 10 → 交换 → 10 到 [3]
// i=3: 父 (3-1)>>1=1 → arr[1]=7 < 10 → 交换 → 10 到 [1]
// i=1: 父 0          → arr[0]=9 < 10 → 交换 → 10 到 [0]
// i=0: 停止
// 结果 [10,9,8,7,6,4,1,3]
//
// 优化：可改用「挖洞法」——记住 val，把父节点依次下移，最后一次性落位，
// 比每次交换少一半的写入次数（动画里用交换版更直观）。`

const siftDownCode = `// ===== siftDown 下沉：从堆顶向下沉降（删除/建堆用）=====
// 大顶堆：与「较大的孩子」交换，直到没有更大的孩子
// n 参数用于限定有效范围（建堆/堆排序时 n 会逐步缩小，防越界）
function siftDown(arr: number[], i: number, n: number = arr.length): void {
    while (true) {
        const l = 2 * i + 1, r = 2 * i + 2
        let largest = i
        if (l < n && arr[l] > arr[largest]) largest = l   // 左孩子更大
        if (r < n && arr[r] > arr[largest]) largest = r   // 右孩子更大
        if (largest === i) break                          // 没有更大的孩子，已就位
        ;[arr[i], arr[largest]] = [arr[largest], arr[i]]  // 与较大孩子交换
        i = largest
    }
}

// 手动模拟：根 3 太小，向下沉降
// [3,9,8,7,6,4,1]
// i=0: 左[1]=9 右[2]=8，较大=9 → 3<9 交换 → 3 到 [1]
// i=1: 左[3]=7 右[4]=6，较大=7 → 3<7 交换 → 3 到 [3]
// i=3: 左[7]、右[8] 均越界 → 停止
// 结果 [9,7,8,3,6,4,1]`

const simulateCode = `// ===== 插入：siftUp 下标追踪 =====
const h1 = [9, 7, 8, 3, 6, 4, 1]
// push(10)：先放末尾
h1.push(10)                 // [9,7,8,3,6,4,1,10]
// siftUp(7)：10 与父[3]=3 比 → 交换 → 10 到 [3]
// siftUp(3)：10 与父[1]=7 比 → 交换 → 10 到 [1]
// siftUp(1)：10 与父[0]=9 比 → 交换 → 10 到 [0]
console.log(h1)             // [10,9,8,7,6,4,1,3]

// ===== 删除堆顶：siftDown 下标追踪 =====
const h2 = [9, 7, 8, 3, 6, 4, 1]
const top = h2[0]           // 9（要返回的最大值）
h2[0] = h2[h2.length - 1]   // 末尾 1 顶替根 → [1,7,8,3,6,4,1]
h2.pop()                    // [1,7,8,3,6,4]
// siftDown(0)：1 与左[1]=7 右[2]=8 较大 8 交换 → 1 到 [2]
// siftDown(2)：1 的左[5]=4 右[6]越界，较大 4 → 1<4 交换 → 1 到 [5]
// siftDown(5)：孩子越界 → 停止
console.log(top, h2)        // 9  [8,7,4,3,6,1]`

const pushPopCode = `// ===== 用 siftUp / siftDown 实现插入与删除 =====
class MaxHeap {
    private data: number[] = []
    get size() { return this.data.length }
    peek(): number | undefined { return this.data[0] }

    // 插入：先放末尾，再 siftUp
    push(v: number): void {
        this.data.push(v)
        this.siftUp(this.data.length - 1)
    }

    // 删除堆顶：把末尾元素挪到堆顶，再 siftDown
    pop(): number | undefined {
        const n = this.data.length
        if (n === 0) return undefined
        const top = this.data[0]
        this.data[0] = this.data[n - 1]   // 末尾元素顶替堆顶
        this.data.pop()
        this.siftDown(0)                  // 从根开始下沉
        return top
    }

    private siftUp(i: number): void { /* 见上例 siftUp */ }
    private siftDown(i: number): void { /* 见上例 siftDown */ }
}

// 复杂度：
//   push: O(log n) —— siftUp 最多走树高
//   pop : O(log n) —— siftDown 最多走树高
//   peek: O(1)    —— 直接读 arr[0]`
</script>
