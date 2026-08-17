<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">⛰️ 堆排序：建堆 / 排序 / 性能对比</h1>
          <p class="text-sm text-slate-500 mt-1">原地 + O(n log n) + 常数空间 —— 没有递归栈的排序</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-1-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：建大顶堆 → 反复取堆顶换到末尾
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          堆排序只有两步：<strong>① 建堆</strong>——把数组整理成<strong>大顶堆</strong>（父 ≥ 子，堆顶是最大值），O(n)；
          <strong>② 排序</strong>——反复把堆顶（当前最大）与末尾交换，堆的长度减 1，再对新堆顶 siftDown 恢复堆序。
          整个过程<strong>原地进行</strong>，额外空间 O(1)（没有递归栈、没有辅助数组）。
        </p>

        <!-- 大顶堆结构示意 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="hp1-e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
            </defs>
            <text x="20" y="26" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">大顶堆：父 ≥ 子，堆顶 = 最大值；数组下标：左孩子 2i+1、右孩子 2i+2</text>
            <text x="20" y="46" font-size="11" font-family="monospace" fill="#94a3b8">青 = 堆节点（值） · 灰线 = 父子关系 · 下方 = 数组下标</text>

            <!-- 边 -->
            <line x1="300" y1="84" x2="170" y2="142" stroke="#94a3b8" stroke-width="2" marker-end="url(#hp1-e)" />
            <line x1="300" y1="84" x2="430" y2="142" stroke="#94a3b8" stroke-width="2" marker-end="url(#hp1-e)" />
            <line x1="170" y1="180" x2="100" y2="222" stroke="#94a3b8" stroke-width="2" marker-end="url(#hp1-e)" />
            <line x1="170" y1="180" x2="240" y2="222" stroke="#94a3b8" stroke-width="2" marker-end="url(#hp1-e)" />
            <line x1="430" y1="180" x2="360" y2="222" stroke="#94a3b8" stroke-width="2" marker-end="url(#hp1-e)" />
            <line x1="430" y1="180" x2="500" y2="222" stroke="#94a3b8" stroke-width="2" marker-end="url(#hp1-e)" />

            <!-- 根 [0]=9 -->
            <rect x="266" y="44" width="68" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="300" y="66" text-anchor="middle" dominant-baseline="central" font-size="18" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <text x="300" y="104" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[0]</text>
            <!-- 第二层 [1]=5 [2]=8 -->
            <rect x="136" y="144" width="68" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="170" y="166" text-anchor="middle" dominant-baseline="central" font-size="18" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <text x="170" y="204" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[1]</text>
            <rect x="396" y="144" width="68" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="430" y="166" text-anchor="middle" dominant-baseline="central" font-size="18" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <text x="430" y="204" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[2]</text>
            <!-- 第三层 [3]=3 [4]=4 [5]=7 [6]=1 -->
            <rect x="66"  y="224" width="68" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="100" y="240" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="206" y="224" width="68" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="240" y="240" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="326" y="224" width="68" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="360" y="240" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <rect x="466" y="224" width="68" height="32" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="500" y="240" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <text x="100" y="262" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[3]</text>
            <text x="240" y="262" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[4]</text>
            <text x="360" y="262" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[5]</text>
            <text x="500" y="262" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[6]</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：大顶堆的树形结构与数组下标一一对应（完全二叉树 → 数组，无需指针）</figcaption>
        </figure>

        <!-- 排序过程：before / after -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="hp2-swap" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <text x="20" y="28" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">第 1 轮：取堆顶 9（红）与末尾 1（橙）交换</text>
              <!-- 数组 [9,5,8,3,4,7,1] -->
              <rect x="60"  y="90" width="64" height="44" rx="6" fill="#ef4444" stroke="#b91c1c" stroke-width="2" /><text x="92"  y="112" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <rect x="136" y="90" width="64" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="168" y="112" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="212" y="90" width="64" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="244" y="112" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="288" y="90" width="64" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="320" y="112" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="364" y="90" width="64" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="396" y="112" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="440" y="90" width="64" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="472" y="112" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <rect x="516" y="90" width="64" height="44" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" /><text x="548" y="112" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <text x="92" y="152" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ef4444">堆顶（最大）</text>
              <text x="548" y="152" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#d97706">末尾（堆界）</text>
              <line x1="92" y1="168" x2="548" y2="168" stroke="#94a3b8" stroke-width="2" marker-end="url(#hp2-swap)" stroke-dasharray="5 3" />
              <text x="320" y="196" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">交换 → 9 进入已排序区（绿色）</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">交换后 9 固定到末尾，堆的有效长度 n 减 1（虚线右端不再参与）</figcaption>
          </figure>

          <figure>
            <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="hp2-down" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" /></marker>
              </defs>
              <text x="20" y="28" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">交换后：1 在堆顶（违反堆序），siftDown 下沉恢复大顶堆</text>
              <!-- 交换后数组 [1,5,8,3,4,7,9] -->
              <rect x="60"  y="90" width="64" height="44" rx="6" fill="#ef4444" stroke="#b91c1c" stroke-width="2" /><text x="92"  y="112" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="136" y="90" width="64" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="168" y="112" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="212" y="90" width="64" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="244" y="112" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="288" y="90" width="64" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="320" y="112" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="364" y="90" width="64" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="396" y="112" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="440" y="90" width="64" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="472" y="112" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <rect x="516" y="90" width="64" height="44" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="548" y="112" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">9</text>
              <!-- 下沉路径 -->
              <line x1="92" y1="134" x2="92" y2="170" stroke="#ef4444" stroke-width="2" marker-end="url(#hp2-down)" />
              <line x1="92" y1="182" x2="168" y2="182" stroke="#94a3b8" stroke-width="2" />
              <rect x="60" y="176" width="64" height="28" rx="6" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="92" y="190" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ef4444">1</text>
              <text x="168" y="190" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#16a34a">与较大孩子 8 交换</text>
              <text x="320" y="228" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#16a34a">siftDown 后：[8,5,7,3,4,1 | 9] —— 堆序恢复，进入第 2 轮</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">siftDown 沿「较大孩子」路径下沉，O(log n) 恢复堆序——下一轮取新堆顶 8</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 核心思想 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          核心思想：建大顶堆 → 反复取堆顶换到末尾
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          堆排序把「选择排序」的「找最小值」用<strong>堆</strong>加速：选择排序每轮要 O(n) 扫描找最小，而大顶堆的堆顶<strong>恒为最大值</strong>，
          取堆顶 O(1)，恢复堆序 O(log n)。于是每轮 O(log n)，n 轮 → O(n log n)，且完全原地。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>建堆</strong>：从最后一个非叶子节点 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">(n&gt;&gt;1)-1</code> 开始，自底向上逐个 siftDown，把数组整理成大顶堆</li>
          <li><strong>取堆顶</strong>：堆顶 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">arr[0]</code> 是当前最大值</li>
          <li><strong>交换</strong>：把堆顶与当前堆的末尾交换，最大值固定到已排序区（绿色）</li>
          <li><strong>缩堆 + 修堆</strong>：堆长度减 1，对新堆顶 siftDown 恢复堆序，回到第 2 步，直到堆只剩 1 个元素</li>
        </ol>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">建堆 O(n) + n 轮 × 取顶/交换 O(1) + siftDown O(log n) = O(n log n)</p>
          <p class="text-xs text-slate-500 mt-1">没有递归、没有辅助数组 —— 空间 O(1)，任何数据形态都稳定 O(n log n)</p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          堆排序 ≈ <strong>「优先队列反复弹出最大值」</strong>——priority queue（如 <code class="bg-purple-100 px-1 rounded text-xs font-mono">PriorityQueue</code>、React 调度器的小顶堆）弹出最大/最小的同时自动重排，堆排序就是把「弹 n 次」的结果直接写回原数组。<br/>
          空间 O(1) 意味着<strong>适合嵌入式/内存受限环境</strong>——单片机、游戏引擎的实体列表排序，不想为排序多开一块内存时，堆排序是硬道理。
          </p>
        </aside>
      </section>

      <!-- 2. siftDown 核心操作 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          siftDown：堆排序唯一的核心操作
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          siftDown（下沉）是堆排序<strong>唯一</strong>的维护操作：从节点 i 出发，与<strong>较大的孩子</strong>比较，
          若孩子更大就交换并继续下沉，直到没有更大的孩子。注意它必须接收参数 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">n</code>（堆的有效长度）——
          排序过程中堆不断缩小，写死 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">arr.length</code> 会把已排序区的元素也拉回来。
        </p>
        <div class="mb-4"><Code language="ts" :code="siftDownCode" title="sift_down.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>忘记传 n / 写死 arr.length</strong>——堆排序中已排序区在数组尾部，siftDown 若越界访问会把绿色已排序元素重新卷进堆，排序结果错乱；必须用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">n</code> 参数限定。<br/>
          ② <strong>比较方向写反</strong>——大顶堆找<strong>较大</strong>孩子（<code>arr[l] &gt; arr[largest]</code>），小顶堆找<strong>较小</strong>孩子；方向反了会把堆「越修越坏」。
          </p>
        </aside>
      </section>

      <!-- 3. 建堆 O(n) -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          建堆：为什么是 O(n) 而不是 O(n log n)？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          直觉上对 n 个节点各做一次 O(log n) 的 siftDown，应该是 O(n log n)。但注意：<strong>越靠下的节点越多，可下沉的高度却越短</strong>——
          叶子节点（一半元素）高度为 0，根本不用下沉；倒数第二层（1/4 元素）最多下沉 1 层……
        </p>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">Σ (第 h 层节点数 × h) = O(n)</p>
          <p class="text-xs text-slate-500 mt-1">n/2 个节点高度 0 + n/4 个高度 1 + n/8 个高度 2 + … = n·(0/2 + 1/4 + 2/8 + …) = O(n)</p>
        </div>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>自底向上</strong>：从最后一个非叶子开始往前，保证处理某节点时它的子树已经是堆</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>算术级数</strong>：总下沉步数收敛到 n，而不是 n·log n</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>对比</strong>：若从堆顶自上而下「插入式」建堆则是 O(n log n)——白多一个 log</span></li>
        </ul>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 记忆点：</strong>「<strong>向上建堆慢，向下建堆快</strong>」——从叶子往上冒泡（siftUp）是 O(n log n)，
          从非叶子往下沉（siftDown）是 O(n)。面试常考，别忘了这个区分。</p>
        </aside>
      </section>

      <!-- 4. 排序过程 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          排序过程：取堆顶 ↔ 末尾，缩堆修堆
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          建好大顶堆后，<strong>堆顶就是当前最大值</strong>。把它与堆的末尾交换，最大值就「定居」在数组尾部（绿色已排序区），
          然后把堆的有效长度减 1，对新堆顶做一次 siftDown。重复 n-1 轮，数组就完全有序了。
        </p>
        <div class="mb-4"><Code language="ts" :code="heapSortCode" title="heap_sort.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>交换后忘记 siftDown</strong>——末尾元素（通常很小）被换到堆顶后堆序被破坏，不修堆直接进入下一轮，取到的「堆顶」根本不是最大值。<br/>
          ② <strong>堆边界不减</strong>——每轮后 <code>end</code> 必须递减，否则已排序区又被当作堆的一部分参与 siftDown，前功尽弃。
          </p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 与选择排序对照：</strong>选择排序每轮线性扫描 O(n) 找最小 → 总 O(n²)；
          堆排序用堆把「找最小」加速到 O(log n) → 总 O(n log n)。本质是同一思想，堆只是加速器。</p>
        </aside>
      </section>

      <!-- 5. 复杂度与对比 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          复杂度与三大 O(n log n) 排序对比
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">情况</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">时间</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">最好</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200">与输入顺序无关（但常数较大）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">平均</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200">建堆 O(n) + n 轮 siftDown</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">最坏</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200">不会像快排退化到 O(n²)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">空间</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">原地交换，无递归栈、无辅助数组</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">稳定性</td><td class="px-4 py-2 border border-slate-200">❌ 不稳定</td><td class="px-4 py-2 border border-slate-200">堆内长距离交换打乱相等元素顺序</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="compareCode" title="compare.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 一句话选型：</strong>要稳定选归并，要最快选快排，要 <strong>O(1) 空间 + 无退化风险</strong> 选堆排序——
          嵌入式、内存受限、实时系统（不允许出现 O(n²) 尖峰）优先堆排序。</p>
        </aside>
      </section>

      <!-- 6. 优缺点与适用场景 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">6</span>
          优缺点与适用场景
        </h2>
        <h3 class="text-base font-semibold text-slate-700 mb-2">优点</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>空间 O(1)</strong>——不需要额外数组和递归栈，内存受限环境的王者</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>恒 O(n log n)</strong>——不退化，最坏情况和平均一样好</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>支持在线求最值</strong>——堆本身是优先队列，可边插入边排序（TopK、定时器）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>无需随机访问优化</strong>——数组和链表形态都能实现</span></li>
        </ul>
        <h3 class="text-base font-semibold text-slate-700 mb-2">缺点</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-red-400 mt-1">▸</span><span><strong>缓存不友好</strong>——访问是「跳着」的（父子下标 2i+1），常数因子比快排大，实际往往更慢</span></li>
          <li class="flex items-start gap-2"><span class="text-red-400 mt-1">▸</span><span><strong>不稳定</strong>——相等元素相对顺序会被长距离交换打乱</span></li>
          <li class="flex items-start gap-2"><span class="text-red-400 mt-1">▸</span><span><strong>不适合部分有序</strong>——不管输入多有序都得跑满 O(n log n)</span></li>
        </ul>
        <h3 class="text-base font-semibold text-slate-700 mb-2">适用场景</h3>
        <div class="mb-4"><Code language="ts" :code="useCaseCode" title="use_cases.ts" /></div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：堆排序（建堆 + 排序）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          橙 = siftDown 当前节点 · 蓝 = 正在比较的孩子 · 红 = 交换（取堆顶 / 下沉交换）· 绿 = 已排序区。先建大顶堆，再反复「取堆顶 → 换末尾 → 修堆」。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ bars.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔍 比较: {{ cmp }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔁 交换: {{ swp }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doHeapSort" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">⛰️ 堆排序</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-rect v-for="b in bars" :key="b.id" :config="barCfg(b)" />
              <v-text v-for="b in bars" :key="'vt'+b.id" :config="valCfg(b)" />
              <v-text v-for="(b,i) in bars" :key="'it'+b.id" :config="idxCfg(i)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 📋 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>思想：</strong>建大顶堆 → 反复取堆顶换到末尾 → siftDown 修堆</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>建堆 O(n)：</strong>自底向上 siftDown（向下沉快）；自顶向下 siftUp 是 O(n log n) 别用</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>siftDown 必须传 n</strong>——堆边界随排序缩小，防止越界拉回已排序区</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度：</strong>恒 O(n log n) / 空间 O(1) / <strong>不稳定</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>对比：</strong>要稳定选归并，要最快选快排，要 O(1) 空间 + 无退化选堆排序</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下一步：</strong>7-1-4 插入排序与希尔排序——小规模与部分有序的利器</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-1-compare/dsa-7-1-2-merge" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：归并排序：分治/原地归并/外排序</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-1-compare/dsa-7-1-4-insert-shell" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：插入排序与希尔排序 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "核心思想" },
  { id: "sec-2", name: "siftDown" },
  { id: "sec-3", name: "建堆 O(n)" },
  { id: "sec-4", name: "排序过程" },
  { id: "sec-5", name: "复杂度与对比" },
  { id: "sec-6", name: "优缺点与场景" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

// ===== 🎬 堆排序柱状图动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const cmp = ref(0), swp = ref(0)
interface Bar { id:number; val:number; color:string; s?:number; _x?:number; _y?:number; _h?:number }
const bars = reactive<Bar[]>([])
const BASE = 280, MXH = 220, BW = 46, G = 8
function initArr(vals:number[]=[5,3,8,1,9,4,2,7]) { bars.splice(0); vals.forEach((v,i)=>bars.push({id:i+1,val:v,color:C.cyan,s:1})); cmp.value=0; swp.value=0; layout() }
function layout() { const n=bars.length, bw=Math.min(BW,Math.floor((W.value-20)/(n||1)-G)), total=n*(bw+G)-G, sx=Math.max(10,(W.value-total)/2), maxV=Math.max(...bars.map(b=>b.val),1); bars.forEach((b,i)=>{ b._x=sx+i*(bw+G); b._h=Math.max(28,(b.val/maxV)*MXH); b._y=BASE-b._h }) }
function barCfg(b:any){ const s=b.s??1, bw=Math.min(BW,Math.floor((W.value-20)/(bars.length||1)-G)); return { x:b._x+(bw*(1-s))/2, y:b._y, width:bw*s, height:b._h*s, fill:b.color, cornerRadius:[4,4,0,0], stroke:'#94a3b8', strokeWidth:1, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 } }
function valCfg(b:any){ const s=b.s??1, h=b._h*s, bw=Math.min(BW,Math.floor((W.value-20)/(bars.length||1)-G)); return { x:b._x+(bw*(1-s))/2, y:b._y+2, width:bw*s, height:h-4, text:String(b.val), fontSize:14, fontFamily:'monospace', fontStyle:'bold', fill:h>30?'#fff':C.text, align:'center', verticalAlign:'middle' } }
function idxCfg(i:number){ const bw=Math.min(BW,Math.floor((W.value-20)/(bars.length||1)-G)); return { x:bars[i]._x??0, y:BASE+6, width:bw, text:'['+i+']', fontSize:10, fontFamily:'monospace', fill:C.muted, align:'center' } }
function colorAt(i:number,c:string){ if(bars[i]) bars[i].color=c }
function allCyan(){ bars.forEach(b=>b.color=C.cyan) }
async function act(msg:string,label:string,fn:()=>Promise<void>){ if(busy.value) return; busy.value=true; status.value=msg; opLabel.value=label; try{await fn()}catch(_){} finally{ await d(250); busy.value=false; status.value=''; opLabel.value='' } }
let ro:ResizeObserver|null=null
onMounted(()=>{ initArr(); if(box.value){ W.value=box.value.clientWidth; layout(); ro=new ResizeObserver(e=>{const w=e[0]?.contentRect.width; if(w&&w>100){W.value=w;layout()}}); ro.observe(box.value) }})
onUnmounted(()=>ro?.disconnect())

function swapBars(i:number, j:number){ const t=bars[i]; bars[i]=bars[j]; bars[j]=t }

// siftDown 动画：把 [i] 下沉到合适位置（堆有效长度为 n）
async function siftDownAni(i:number, n:number) {
  while (true) {
    const l = 2 * i + 1, r = 2 * i + 2
    colorAt(i, C.orange)
    if (l < n) colorAt(l, C.blue)
    if (r < n) colorAt(r, C.blue)
    status.value = `siftDown [${i}]=${bars[i].val}：与孩子比较`
    await d(380)
    let largest = i
    if (l < n) { cmp.value++; if (bars[l].val > bars[largest].val) largest = l }
    if (r < n) { cmp.value++; if (bars[r].val > bars[largest].val) largest = r }
    if (largest === i) {
      status.value = `${bars[i].val} ≥ 所有孩子 → 下沉结束`
      colorAt(i, C.cyan)
      await d(320)
      break
    }
    swp.value++
    colorAt(i, C.red); colorAt(largest, C.red)
    status.value = `与较大孩子 ${bars[largest].val}[${largest}] 交换`
    await d(340)
    swapBars(i, largest)
    colorAt(i, C.cyan)
    await d(340)
    i = largest
  }
}

// 建堆动画：从最后一个非叶子开始逐个 siftDown
async function buildHeapAni() {
  const n = bars.length
  status.value = `建堆：从最后一个非叶子 [${(n >> 1) - 1}] 开始逐个 siftDown`
  await d(500)
  for (let i = (n >> 1) - 1; i >= 0; i--) {
    status.value = `siftDown 节点 [${i}]`
    await d(320)
    await siftDownAni(i, n)
  }
  allCyan()
  status.value = '✅ 大顶堆建立完成，堆顶 = 最大值'
  await d(450)
}

// 排序动画：反复取堆顶换到末尾
async function heapSortAni() {
  await buildHeapAni()
  const n = bars.length
  for (let end = n - 1; end > 0; end--) {
    colorAt(0, C.red); colorAt(end, C.orange)
    status.value = `取堆顶 ${bars[0].val}[0] 与末尾 [${end}] 交换`
    await d(450)
    swapBars(0, end)
    colorAt(end, C.green)                       // 已排序区
    await d(380)
    status.value = `对堆 [0..${end - 1}] 重新 siftDown`
    await siftDownAni(0, end)
  }
  colorAt(0, C.green)
  status.value = '✅ 堆排序完成'
}

function doHeapSort() {
  act('堆排序', '恒 O(n log n) · 空间 O(1)', async () => {
    await heapSortAni()
    bars.forEach(b => b.color = C.green)
    status.value = '✅ 排序完成：[1,2,3,4,5,7,8,9]'
  })
}
function doReset(){ initArr(); status.value=''; opLabel.value='' }

// ===== 代码示例 =====
const siftDownCode = `// ===== siftDown：把节点 i 下沉到合适位置（大顶堆）=====
// n = 堆的有效长度（堆排序中逐步缩小，防越界）
function siftDown(arr: number[], i: number, n: number): void {
    while (true) {
        const l = 2 * i + 1, r = 2 * i + 2
        let largest = i
        if (l < n && arr[l] > arr[largest]) largest = l   // 左孩子更大
        if (r < n && arr[r] > arr[largest]) largest = r   // 右孩子更大
        if (largest === i) break                          // 没有更大的孩子，就位
        ;[arr[i], arr[largest]] = [arr[largest], arr[i]]  // 与较大孩子交换
        i = largest                                       // 继续向下
    }
}

// 手动模拟：[3,9,8,7,6,4,1] 对根 i=0, n=7
// 左[1]=9 右[2]=8 → 较大=9 → 3<9 交换 → 3 到 [1]
// 左[3]=7 右[4]=6 → 较大=7 → 3<7 交换 → 3 到 [3]
// 孩子越界 → 停止 → 结果 [9,7,8,3,6,4,1] ✓`

const heapSortCode = `// ===== 堆排序：建堆 + 反复取堆顶 =====
function heapSort(arr: number[]): void {
    const n = arr.length

    // ① 建堆：从最后一个非叶子 (n>>1)-1 开始，自底向上 siftDown
    //    总下沉步数 ≈ n → 建堆 O(n)
    for (let i = (n >> 1) - 1; i >= 0; i--) {
        siftDown(arr, i, n)
    }

    // ② 排序：堆顶（最大）与末尾交换，堆缩小 1，再修堆
    for (let end = n - 1; end > 0; end--) {
        ;[arr[0], arr[end]] = [arr[end], arr[0]]   // 最大值就位（已排序区）
        siftDown(arr, 0, end)                      // ⚠️ 堆边界是 end，不是 arr.length
    }
}

// 手动模拟：[4,10,3,5,1]
// 建堆：i=1 → 10 与孩子 5、1 比，已最大，不动
//       i=0 → 4 与左[1]=10 交换 → [10,4,3,5,1]
//             4 与左[3]=5 交换 → [10,5,3,4,1] 建堆完成
// 排序：取 10 与末尾 1 交换 → [1,5,3,4 | 10]
//       siftDown(0,4) → [5,4,3,1 | 10]
//       取 5 与末尾 1 交换 → [1,4,3 | 5,10] … 最终 [1,3,4,5,10] ✓`

const compareCode = `// ===== 三大 O(n log n) 排序对比 =====
// ┌────────┬──────────┬──────────┬─────────┬────────┐
// │ 算法    │ 平均时间  │ 最坏时间  │ 额外空间 │ 稳定   │
// ├────────┼──────────┼──────────┼─────────┼────────┤
// │ 快排    │ O(nlogn) │ O(n²)    │ O(logn) │ 否     │
// │ 归并    │ O(nlogn) │ O(nlogn) │ O(n)    │ 是     │
// │ 堆排序  │ O(nlogn) │ O(nlogn) │ O(1)    │ 否     │
// └────────┴──────────┴──────────┴─────────┴────────┘
//
// 选型口诀：
//   要稳定 + 数据大        → 归并（外排序也靠它）
//   要原地 + 内存紧张       → 堆排序（嵌入式/单片机）
//   通用最快 + 缓存友好     → 快排（V8 等引擎的 sort 就是快排+插入混合）
//
// 堆排序的隐藏代价：数组访问是「跳着」的（2i+1 / 2i+2），
//   缓存命中率低，常数因子比快排大 —— 理论同阶，实际常更慢`

const useCaseCode = `// ===== 堆排序的适用场景速查 =====
// ✅ 推荐：内存极度受限（空间 O(1)）、不允许最坏退化
//    （实时/安全系统）、TopK 与优先队列（配合堆结构）
// ❌ 回避：需要稳定排序、追求极致速度（快排更快）、
//    小规模数据（插入排序常数更小）
//
// 前端案例：React 调度器用「小顶堆」维护任务优先级
//   ——不排序整个数组，只保证堆顶是最高优先级，
//   与堆排序共享同一套 siftUp/siftDown 基础设施`
</script>
