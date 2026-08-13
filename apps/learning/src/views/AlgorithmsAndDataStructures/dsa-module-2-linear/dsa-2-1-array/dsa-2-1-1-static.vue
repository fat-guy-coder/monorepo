<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📏 静态数组：寻址公式与缓存友好性</h1>
          <p class="text-sm text-slate-500 mt-1">连续内存的王者——O(1)随机访问的秘密</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-1-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：静态数组
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          数组是<strong>一块连续内存</strong>，元素类型相同、按固定字节数紧挨排列。只要知道<strong>基地址 base</strong> 和<strong>下标 i</strong>，
          就能用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">base + i × size</code> 一步算出目标地址 —— 这就是 O(1) 随机访问。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 640 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">一块连续内存：元素紧挨排列，类型相同（int32 = 4 字节）</text>

            <!-- 地址标注 -->
            <text x="75" y="64" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">0x1000</text>
            <text x="161" y="64" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">0x1004</text>
            <text x="247" y="64" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">0x1008</text>
            <text x="333" y="64" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">0x100C</text>

            <!-- 元素格子 -->
            <rect x="40" y="76" width="70" height="52" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="75" y="102" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">42</text>
            <rect x="126" y="76" width="70" height="52" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="161" y="102" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">17</text>
            <rect x="212" y="76" width="70" height="52" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="247" y="102" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">99</text>
            <rect x="298" y="76" width="70" height="52" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="333" y="102" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>

            <!-- 下标 -->
            <text x="75" y="142" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[0]</text>
            <text x="161" y="142" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[1]</text>
            <text x="247" y="142" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[2]</text>
            <text x="333" y="142" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[3]</text>

            <!-- 底部公式 -->
            <text x="16" y="178" font-size="11" font-family="monospace" fill="#0891b2">arr[2] 地址 = 0x1000 + 2 × 4 = 0x1008  →  O(1) 随机访问</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：静态数组结构 —— 连续内存 + base + i × size 寻址，下标与地址一一对应</figcaption>
        </figure>

        <!-- 操作示意图：随机访问 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：随机访问 arr[2] —— 数组 O(1) vs 链表 O(n)</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">数组：arr[2] 一步直达</p>
            <svg viewBox="0 0 320 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ra-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
              </defs>
              <line x1="175" y1="16" x2="175" y2="44" stroke="#f59e0b" stroke-width="2" marker-end="url(#ra-arr)" />
              <text x="175" y="10" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#f59e0b">arr[2]</text>

              <rect x="24" y="54" width="54" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="51" y="76" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">42</text>
              <rect x="86" y="54" width="54" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="113" y="76" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">17</text>
              <rect x="148" y="54" width="54" height="44" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2.5" />
              <text x="175" y="76" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">99</text>
              <rect x="210" y="54" width="54" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="237" y="76" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>

              <text x="51" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[0]</text>
              <text x="113" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[1]</text>
              <text x="175" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#f59e0b" font-weight="bold">[2]</text>
              <text x="237" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[3]</text>

              <text x="16" y="140" font-size="11" font-family="monospace" fill="#0891b2">base + 2×4 一次乘加直达</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">arr[2] 直接算地址命中，与数组长度无关 O(1)</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">链表：要逐个遍历 3 步</p>
            <svg viewBox="0 0 320 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ll-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <line x1="66" y1="76" x2="82" y2="76" stroke="#94a3b8" stroke-width="2" marker-end="url(#ll-arr)" />
              <line x1="134" y1="76" x2="150" y2="76" stroke="#94a3b8" stroke-width="2" marker-end="url(#ll-arr)" />
              <line x1="202" y1="76" x2="218" y2="76" stroke="#94a3b8" stroke-width="2" marker-end="url(#ll-arr)" />

              <rect x="16" y="54" width="48" height="44" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="40" y="76" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">42</text>
              <rect x="84" y="54" width="48" height="44" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="108" y="76" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">17</text>
              <rect x="152" y="54" width="48" height="44" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="176" y="76" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">99</text>
              <rect x="220" y="54" width="48" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="244" y="76" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>

              <text x="40" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">0</text>
              <text x="108" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">1</text>
              <text x="176" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">2</text>
              <text x="244" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">3</text>

              <text x="16" y="140" font-size="11" font-family="monospace" fill="#64748b">head → 0 → 1 → 2 逐个跳转</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">链表节点分散存储，只能沿指针逐个遍历到第 3 个 O(n)</figcaption>
          </figure>
        </div>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          数组的本质 —— 一块连续内存
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          数组是计算机科学中最基础的数据结构。它的核心特征只有两个字：<strong>连续</strong>。
          操作系统在内存中分配一整块<strong>连续的地址空间</strong>，每个元素紧挨着排列，就像一排整齐的储物柜。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>数组的三大特征：</strong></p>
          <ol class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span><strong>连续内存</strong> — 所有元素存储在物理上相邻的地址</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span><strong>相同类型</strong> — 每个元素占用相同的字节数（静态类型语言）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">3.</span><span><strong>固定大小</strong> — 创建时确定容量，无法动态扩容（静态数组）</span></li>
          </ol>
        </div>
        <div class="mb-4"><Code language="ts" :code="memoryLayoutCode" title="memory_layout.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          数组的连续内存就像 CSS Flexbox 的 <code>flex-direction: row</code>——所有子元素紧挨着排成一行。<br/>
          相比之下，链表就像各自独立的 <code>div</code>，每个只知道下一个在哪。<br/>
          <code>arr[3]</code> 就像 <code>:nth-child(4)</code>——直接定位到第 4 个位置，无需遍历。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          寻址公式 —— O(1) 随机访问的数学原理
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          为什么 <code>arr[i]</code> 是 O(1)？因为 CPU 只需一次乘法和一次加法就能算出目标地址。
          这就是<strong>随机访问 (Random Access)</strong> 的底层原理。
        </p>
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">
            address(arr[i]) = base_address + i × element_size
          </p>
          <p class="text-xs text-cyan-600 text-center">寻址公式：基地址 + 索引 × 每个元素占用字节数</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="addressingCode" title="addressing_formula.ts" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">为什么下标从 0 开始？</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">
          历史上有过从 1 开始的语言（如 Pascal、Fortran），但 C 语言确立了 0-based 索引的传统。<br/>
          <strong>核心原因：</strong>从 0 开始时，寻址公式就是 <code>base + i × size</code>，无需多一次减法。<br/>
          如果从 1 开始，公式变成 <code>base + (i-1) × size</code>，每次访问多一次运算。<br/>
          在 1970 年代，这就是性能——如今已成约定俗成。
        </p>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>O(1) 不是因为"快"，而是因为<strong>访问时间不随数据规模增长</strong>——无论 arr[0] 还是 arr[999999]，都是同一套乘加运算。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          CPU 缓存与缓存友好性 —— 数组的真正性能优势
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          数组相比链表的性能优势，不只在于 O(1) 随机访问。<strong>真正的杀手锏是 CPU 缓存友好性。</strong>
          现代 CPU 的 L1/L2/L3 缓存利用了<strong>空间局部性 (Spatial Locality)</strong> 原理：访问某个地址时，CPU 把<strong>相邻的一整块内存（Cache Line，通常 64 字节）</strong>一起加载到缓存。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>内存访问速度层级（数量级对比）：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span><strong>L1 缓存</strong>：~1 ns（寄存器级别）</span></li>
            <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span><strong>L2 缓存</strong>：~4 ns</span></li>
            <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span><strong>L3 缓存</strong>：~12 ns</span></li>
            <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>主内存 (RAM)</strong>：~100 ns（比 L1 慢 100 倍！）</span></li>
          </ul>
        </div>
        <div class="mb-4"><Code language="ts" :code="cacheCode" title="cache_locality.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          CPU 缓存就像浏览器的<strong>资源预加载 (preload/prefetch)</strong>——访问一个 JS 文件时，浏览器把同目录下可能用到的资源也提前下载。<br/>
          数组遍历 = 所有资源在同一个 bundle 里，一路顺畅。<br/>
          链表遍历 = 每个节点是一个独立请求，每次都要等网络响应。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          行优先 vs 列优先 —— 遍历顺序决定性能
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          二维数组在内存中按<strong>行优先 (Row-Major)</strong> 顺序存储（C/Java/JS/Go 都如此）。
          按行遍历时，访问的地址是连续的；按列遍历时，每次跳一整行——缓存完全失效。<strong>同样的逻辑，性能差距可达 10 倍以上。</strong>
        </p>
        <div class="mb-4"><Code language="ts" :code="rowColumnCode" title="row_major_vs_column_major.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">语言</th><th class="px-4 py-2 border border-slate-200 font-semibold">存储顺序</th><th class="px-4 py-2 border border-slate-200 font-semibold">高效遍历</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">C / C++ / Go / JS / Java / Python</td><td class="px-4 py-2 border">行优先 (Row-Major)</td><td class="px-4 py-2 border font-mono text-emerald-600">for i for j → arr[i][j]</td></tr>
              <tr><td class="px-4 py-2 border">Fortran / MATLAB / R</td><td class="px-4 py-2 border">列优先 (Column-Major)</td><td class="px-4 py-2 border font-mono text-emerald-600">for j for i → arr[i][j]</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见陷阱：</strong>在 JS/TS 中处理大矩阵（如图像处理、神经网络）时，<strong>必须按行遍历，绝不能按列遍历</strong>。性能差距不是几毫秒，而是<strong>数量级差异</strong>。写双层循环时，外层循环对应第一维，内层对应第二维——缓存命中率决定一切。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          静态数组 vs 动态数组 —— 确定性与灵活性
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>静态数组</strong>在编译时/创建时确定大小，不可改变；<strong>动态数组</strong>可在运行时扩容。
          JS 中所有数组都是动态的，但在 C/Go/Java 中二者是不同的概念。
        </p>
        <div class="mb-4"><Code language="ts" :code="staticVsDynamicCode" title="static_vs_dynamic.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">特性</th><th class="px-4 py-2 border border-slate-200 font-semibold">静态数组 (C/Go)</th><th class="px-4 py-2 border border-slate-200 font-semibold">动态数组 (JS/ArrayList)</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">大小</td><td class="px-4 py-2 border">固定，编译时确定</td><td class="px-4 py-2 border">可变，运行时扩容</td></tr>
              <tr><td class="px-4 py-2 border">内存</td><td class="px-4 py-2 border">栈上或数据段</td><td class="px-4 py-2 border">堆上，含 capacity 字段</td></tr>
              <tr><td class="px-4 py-2 border">访问速度</td><td class="px-4 py-2 border font-mono text-emerald-600">最快（无间接层）</td><td class="px-4 py-2 border font-mono text-emerald-600">很快（一次指针解引用）</td></tr>
              <tr><td class="px-4 py-2 border">扩容</td><td class="px-4 py-2 border font-mono text-amber-600">不支持</td><td class="px-4 py-2 border font-mono text-emerald-600">支持（均摊 O(1)）</td></tr>
              <tr><td class="px-4 py-2 border">越界检查</td><td class="px-4 py-2 border font-mono text-red-600">无（UB）</td><td class="px-4 py-2 border font-mono text-emerald-600">有（抛出异常）</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          常见陷阱 —— 数组用法的坑与避坑指南
        </h2>
        <div class="mb-4"><Code language="ts" :code="pitfallsCode" title="common_pitfalls.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 索引越界 —— 万恶之源：</strong><br/>
          大部分安全漏洞（Buffer Overflow）都源于数组越界。C 语言中越界写入会导致任意代码执行。<br/>
          即使在 JS 中，访问 <code>arr[arr.length]</code> 也只会返回 <code>undefined</code> 而不会报错——这是一种<strong>静默失败</strong>，调试极其困难。<br/>
          <strong>铁律：</strong>任何数组访问前，确认 <code>0 &lt;= index &lt; arr.length</code>。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong><br/>
          1. 遍历用 <code>for...of</code> 或 <code>forEach</code>，避免手写索引<br/>
          2. 需要下标时，边界条件用三元/可选链兜底<br/>
          3. 处理用户输入的索引时，先 clamp 到合法范围<br/>
          4. 大数组遍历时注意行优先顺序<br/>
          5. 不要假设 <code>[]</code> 创建的数组元素连续（JS 稀疏数组是 Hash Map）</p>
        </aside>
      </section>

      <!-- 动画演示 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：数组操作
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点击下方按钮观察数组操作的动画。注意 Push/Pop 只在<strong>末尾</strong>操作（O(1)），Insert/Remove 需要<strong>移动元素</strong>（O(n)）。
        </p>
        <!-- 控制按钮 -->
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button v-for="btn in ctrlBtns" :key="btn.label" @mousedown="btn.action" :disabled="busy"
            :class="[btn.cls, 'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150',
                     'active:scale-95 active:shadow-inner',
                     'disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100']">{{ btn.label }}</button>
          <input v-if="showInp" v-model="inpVal" type="number"
            class="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-shadow" placeholder="值" />
          <input v-if="showIdx" v-model="inpIdx" type="number"
            class="w-14 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-shadow" placeholder="索引" />
          <button v-if="showInp||showIdx" @click="confirmInp" :disabled="busy"
            class="px-2.5 py-1.5 bg-cyan-500 text-white rounded-lg text-xs font-medium hover:bg-cyan-600 active:scale-95 transition-all duration-150 disabled:opacity-40">确认</button>
          <button v-if="showInp||showIdx" @click="cancelInp" :disabled="busy"
            class="px-2 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-500 hover:bg-slate-100 active:scale-95 transition-all duration-150 disabled:opacity-40">取消</button>
          <span class="text-xs text-slate-500 ml-auto bg-slate-100 px-2 py-1 rounded-full min-w-[60px] text-center">{{ status }}</span>
        </div>
        <!-- Canvas -->
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-rect v-for="b in bars" :key="b.id" :config="rectCfg(b)" />
              <v-text v-for="b in bars" :key="'v'+b.id" :config="valCfg(b)" />
              <v-text v-for="(b,i) in bars" :key="'i'+b.id" :config="idxCfg(i)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>数组 = 连续内存块</strong>，元素类型相同、紧密排列</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>寻址公式：</strong><code>address = base + i × size</code> → O(1) 随机访问</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>缓存友好是数组最强优势</strong>——CPU Cache Line 预取相邻数据</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>行优先遍历</strong>比列优先快一个数量级（空间局部性）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>静态数组不可扩容</strong>，动态数组自动扩容（下一节详解）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>警惕越界和稀疏数组</strong>，它们是 Bug 的温床</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-1-complexity/dsa-1-2-analysis/dsa-1-2-4-space" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：空间复杂度</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-1-array/dsa-2-1-2-dynamic" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：动态数组 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ===== 🎬 数组动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(300), W = ref(700), BW = 54, G = 9, MXH = 220, BASE = 255
interface Bar { id: number; val: number; color: string; s?: number; _x?: number; _y?: number; _h?: number }
const bars = reactive<Bar[]>([])
const busy = ref(false), status = ref(''), nid = ref(100)
const showInp = ref(false), showIdx = ref(false), inpVal = ref(0), inpIdx = ref(0)
let pend = ''
const box = ref<HTMLDivElement>()
const sh = (v: number) => Math.max(4, v)

function init(d: number[] = [5,3,8,1,9,4]) {
  bars.length = 0; d.forEach((v,i) => bars.push({id:i+1, val:v, color:C.cyan, s:1}))
  layout()
}
function layout() {
  const total = bars.length*(BW+G)-G, sx = Math.max(10,(W.value-total)/2)
  const maxV = Math.max(...bars.map(b=>b.val),1)
  bars.forEach((b,i) => {
    b._x = sx+i*(BW+G)
    b._h = Math.max(30,(b.val/maxV)*MXH)
    b._y = BASE-(b._h||30)
  })
}
function rectCfg(b: any) {
  const s = b.s ?? 1; const isGhost = b.color===C.ghost
  return {
    x: b._x+(BW*(1-s))/2, y: b._y, width: BW*s, height: sh(b._h||30)*s,
    fill: b.color, cornerRadius: [4,4,0,0],
    stroke: isGhost?'transparent':'#94a3b8', strokeWidth: isGhost?0:1,
    shadowColor: isGhost?'transparent':'rgba(0,0,0,0.12)',
    shadowBlur: isGhost?0:6, shadowOffsetY: isGhost?0:2,
    opacity: isGhost?0:1,
  }
}
function valCfg(b: any) {
  const s = b.s ?? 1; const h = sh(b._h||30)*s
  return { x:b._x+(BW*(1-s))/2, y:b._y+2, width:BW*s, height:h-4, text:h>20?String(b.val):'', fontSize:Math.round(14*s), fontFamily:'monospace', fontStyle:'bold', fill:h>32?'#fff':C.text, align:'center', verticalAlign:'middle' }
}
function idxCfg(i: number) { return { x:(bars[i]as any)?._x||0, y:BASE+6, width:BW, text:'['+i+']', fontSize:10, fontFamily:'monospace', fill:C.muted, align:'center' } }
const d = (ms:number) => new Promise(r => setTimeout(r,ms))

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value=true; status.value=msg
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value=false; status.value='' }
}

// Push — 新 bar scale 0→1 弹出
function doPush() { act('Push  O(1)', async () => {
  const v = Math.floor(Math.random()*90+10)
  const nb: Bar = { id:nid.value++, val:v, color:C.green, s:0 }; bars.push(nb); layout()
  await d(80); nb.s=1; layout(); await d(500); nb.color=C.cyan
})}
// Pop — scale 1→0 消失
function doPop() { if (!bars.length) return; act('Pop  O(1)', async () => {
  const lb = bars[bars.length-1]; lb.color=C.red; await d(400)
  lb.s=0; layout(); await d(350); bars.pop(); layout()
})}
function askIns() { showInp.value=true; showIdx.value=true; pend='ins' }
function askRem() { showInp.value=false; showIdx.value=true; pend='rem' }
function askSea() { showInp.value=true; showIdx.value=false; pend='sea' }

async function confirmInp() {
  showInp.value=false; showIdx.value=false
  if (pend==='ins') {
    const v = +inpVal.value, i = +inpIdx.value
    if (isNaN(v)||isNaN(i)||i<0||i>bars.length) return
    await act('Insert  O(n)', async () => {
      const nb:Bar={id:nid.value++,val:v,color:C.green,s:0}; bars.splice(i,0,nb); layout()
      await d(80); nb.s=1; layout(); await d(600); nb.color=C.cyan
    })
  } else if (pend==='rem') {
    const i = +inpIdx.value
    if (isNaN(i)||i<0||i>=bars.length) return
    await act('Remove  O(n)', async () => {
      bars[i].color=C.red; await d(400)
      bars[i].color=C.ghost; bars[i].s=0; layout(); await d(350); bars.splice(i,1); layout()
    })
  } else if (pend==='sea') {
    const t = +inpVal.value; if (isNaN(t)) return
    await act('Search  O(n)', async () => {
      for (let i=0;i<bars.length;i++) {
        bars[i].color=C.orange; bars[i].s=1.08; await d(280)
        if (bars[i].val===t) { bars[i].color=C.green; bars[i].s=1; return }
        bars[i].color=C.cyan; bars[i].s=1
    }})
  }
}
function cancelInp() { showInp.value=false; showIdx.value=false }
function doReset() { init(); status.value='' }

const ctrlBtns = computed(() => [
  { label:'Push', action:doPush, cls:'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm' },
  { label:'Pop', action:doPop, cls:'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm' },
  { label:'Insert', action:askIns, cls:'bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:border-green-300 hover:shadow-sm' },
  { label:'Remove', action:askRem, cls:'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm' },
  { label:'Search', action:askSea, cls:'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm' },
  { label:'↺ Reset', action:doReset, cls:'bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm' },
])

let ro: ResizeObserver|null = null
onMounted(() => {
  init()
  if (box.value) { W.value = box.value.clientWidth; layout()
    ro = new ResizeObserver(e => { const w=e[0]?.contentRect.width; if(w&&w>100){W.value=w;layout()} })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== navList =====
const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "数组的本质" },
  { id: "sec-2", name: "寻址公式" },
  { id: "sec-3", name: "CPU缓存友好性" },
  { id: "sec-4", name: "行优先vs列优先" },
  { id: "sec-5", name: "静态vs动态数组" },
  { id: "sec-6", name: "常见陷阱" },
  { id: "sec-7", name: "🎬 动画演示" },
  { id: "sec-8", name: "小结" },
]

const memoryLayoutCode = `// 数组的连续内存布局（概念模型）
// 假设 int32 占 4 字节，基地址 = 0x1000

// ┌─────────┬─────────┬─────────┬─────────┬─────────┐
// │  arr[0] │  arr[1] │  arr[2] │  arr[3] │  arr[4] │
// │ 0x1000  │ 0x1004  │ 0x1008  │ 0x100C  │ 0x1010  │
// │   42    │   17    │   99    │   3     │   56    │
// └─────────┴─────────┴─────────┴─────────┴─────────┘

// 在 TypeScript 中，数组在 V8 引擎中的实际存储：
// - 密集数组（所有元素存在）：底层是 FixedArray，连续内存
// - 稀疏数组（有空位）：底层退化为 Hash Map（Dictionary Mode）
// - JS 数组自动在两种模式间切换，但性能差距巨大

const dense = [1, 2, 3, 4, 5]        // ✅ 密集 → 连续内存，快速
const sparse = [1, , , , 5]          // ⚠️ 稀疏 → Dictionary Mode，慢
sparse[1000000] = 6                  // ⚠️ 现在变成完全的 Hash Map

// 判断 V8 是否把数组视为密集：
// 用 node --allow-natives-syntax 然后 %HasFastProperties(arr)
// 前端开发中可用 console.time 比较遍历速度来间接判断`

const addressingCode = `// 寻址公式的 TypeScript 模拟
// address(arr[i]) = base + i * elementSize

function simulateAddressing(base: number, index: number, elementSize: number): number {
    return base + index * elementSize
}

const INT32_SIZE = 4  // int32 占 4 字节

// 模拟 5 个元素的 int32 数组（基地址 0x1000）
const base = 0x1000
for (let i = 0; i < 5; i++) {
    const addr = simulateAddressing(base, i, INT32_SIZE)
    console.log(\`arr[\${i}] → 地址 0x\${addr.toString(16).toUpperCase()}\`)
}
// 输出:
// arr[0] → 地址 0x1000
// arr[1] → 地址 0x1004
// arr[2] → 地址 0x1008
// arr[3] → 地址 0x100C
// arr[4] → 地址 0x1010

// ─── 为什么是 O(1) 而不是 O(log n) 或 O(n)？ ───
// 因为只需要 1 次乘法 + 1 次加法，与数组长度 n 无关
// n = 10 时是 1 乘 1 加，n = 10^9 时也是 1 乘 1 加

// ─── 对比链表：找到第 i 个元素 ───
// 链表：需要从 head 开始，逐个跳转 i 次 → O(n)
// 数组：直接 base + i * size → O(1)

// ─── 二维数组的寻址（行优先）───
// arr[row][col] → base + (row * numCols + col) * elementSize
function matrixAddress(base: number, row: number, col: number,
                       numCols: number, elemSize: number): number {
    return base + (row * numCols + col) * elemSize
}`

const cacheCode = `// ─── CPU Cache Line 与空间局部性 ───
// 典型 Cache Line = 64 字节，一次加载连续 64B 的数据

// 一个 int32 占 4 字节 → 一个 Cache Line 能装 16 个 int32
// 访问 arr[0] 时，CPU 自动把 arr[0]~arr[15] 一起拖进 L1
// 之后访问 arr[1]~arr[15] → 缓存命中（~1ns）而不是访存（~100ns）

// ─── 实验：数组遍历 vs 链表遍历（性能差异演示）───
function benchmarkArrayVsLinkedList(): void {
    const N = 1_000_000

    // 数组：连续遍历
    const arr = new Array(N).fill(0).map((_, i) => i)
    console.time("数组遍历")
    let sumArr = 0
    for (let i = 0; i < N; i++) {
        sumArr += arr[i]  // 每次访问都是缓存命中（除开头几次）
    }
    console.timeEnd("数组遍历")
    // 典型输出: 数组遍历: ~2ms

    // 模拟链表：随机访问（破坏空间局部性）
    console.time("随机访问（模拟链表）")
    let sumRand = 0
    const indices = new Array(N).fill(0).map((_, i) => i)
    // Fisher-Yates 洗牌
    for (let i = N - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[indices[i], indices[j]] = [indices[j], indices[i]]
    }
    for (const idx of indices) {
        sumRand += arr[idx]  // 大部分是缓存未命中 → ~100ns
    }
    console.timeEnd("随机访问（模拟链表）")
    // 典型输出: 随机访问（模拟链表）: ~20ms（慢 10 倍！）
}

// ─── 为什么链表遍历慢？───
// 链表节点分散在堆上，每次 node = node.next
// CPU 无法预取下一个节点（不知道地址），缓存命中率极低
// 这就是"缓存不友好"(cache-unfriendly) 数据结构

// ─── 数组插入头部为什么也慢？───
// unshift(0) 需要把所有元素向后搬一位
// 但这利用了缓存友好性——连续的 memmove 很快
// 真正慢的是触发扩容时：分配新内存 + 全部复制 + 释放旧内存`

const rowColumnCode = `// ─── 行优先遍历 vs 列优先遍历 ───
// 关键：JS 中二维数组 = 数组的数组，内存布局是行优先

const COLS = 10000
const ROWS = 10000

// 创建 10000 × 10000 的二维数组（1 亿个元素）
const matrix: number[][] = []
for (let i = 0; i < ROWS; i++) {
    matrix[i] = new Array(COLS).fill(0)
}

// ─── 行优先遍历（外层 i 行，内层 j 列）───
console.time("行优先遍历 (i→j)")
let sum1 = 0
for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
        sum1 += matrix[i][j]  // arr[i] 是同一行，连续访问
    }
}
console.timeEnd("行优先遍历 (i→j)")
// 典型输出: ~50ms

// ─── 列优先遍历（外层 j 列，内层 i 行）───
console.time("列优先遍历 (j→i)")
let sum2 = 0
for (let j = 0; j < COLS; j++) {
    for (let i = 0; i < ROWS; i++) {
        sum2 += matrix[i][j]  // 每次跳一整行！缓存完全失效
    }
}
console.timeEnd("列优先遍历 (j→i)")
// 典型输出: ~500ms（慢 10 倍！）

// ─── 图示 ───
// 行优先:  [0][0]→[0][1]→[0][2]→[0][3]→...  地址连续递增
// 列优先:  [0][0]→[1][0]→[2][0]→[3][0]→...  每次跳 10000 个元素

// ─── 实践建议 ───
// 1. 遍历二维数组永远用行优先（外层 i，内层 j）
// 2. 如果必须按列访问，考虑先转置矩阵
// 3. 图像处理、矩阵运算中，这个优化是必须的`

const staticVsDynamicCode = `// ─── 静态数组模拟（TypeScript 没有真正的静态数组）───

// 方式一：用 TypedArray 模拟固定大小数组
const fixedArr = new Int32Array(10)  // 10 个 int32，大小固定
fixedArr[0] = 42
fixedArr[1] = 17
// fixedArr[10] = 99  // 越界写入，不抛异常但被忽略
console.log(fixedArr.length)  // 10（永远是 10）

// 方式二：用 Object.seal 模拟
const sealed = Object.seal(new Array(5).fill(0))
sealed[0] = 1       // ✅ 可以修改已有元素
// sealed[5] = 2    // ❌ 不能添加新元素（严格模式下抛 TypeError）
// sealed.push(3)   // ❌ push 也失败

// TypedArray 的寻址也是 O(1)，且内存连续（底层 ArrayBuffer）
// 但 TypedArray 的元素类型固定，这是为性能做的权衡

// ─── 动态数组（JS 原生数组）───
const dynamicArr: number[] = []
dynamicArr.push(1)   // capacity 1
dynamicArr.push(2)   // capacity 2（扩容）
dynamicArr.push(3)   // capacity 4（扩容）
dynamicArr.push(4)   // capacity 4（无需扩容）
dynamicArr.push(5)   // capacity 8（扩容）

// 扩容规律（V8 引擎）：
// 初始容量 → 扩容因子约 1.5x，保证均摊 O(1) 的 push 操作
// 详细分析见下一节：动态数组与均摊分析

// ─── 对比总结 ───
// 特性              静态数组           动态数组(JS)
// 大小              编译时固定         运行时可变
// 内存              栈/数据段          堆（GC 管理）
// 扩容              不支持             自动扩容
// 越界访问          UB（C）/ 抛异常    返回 undefined
// 额外开销          无                 capacity + length 字段
// 适用场景          嵌入式/性能关键    日常开发/业务逻辑`

const pitfallsCode = `// ─── 陷阱 1：稀疏数组 —— 看起来是数组，其实是 Hash Map ───
const sparseArr: number[] = []
sparseArr[999999] = 42  // 只存了一个元素，但 length = 1000000！
console.log(sparseArr.length)  // 1000000
console.log(sparseArr[0])      // undefined（中间全是"空洞"）

// V8 检测到空洞太多 → 切换为 Dictionary Mode
// forEach/map/filter 会跳过空洞，但 for 循环不会
sparseArr.forEach(x => console.log(x))  // 只输出 42（跳过 999999 个空洞）

// ─── 陷阱 2：越界访问不报错（JS 独有）───
const arr = [1, 2, 3]
console.log(arr[5])       // undefined —— 静默失败！
console.log(arr[-1])      // undefined —— 负数索引不报错！
// Java 中 arr[5] → ArrayIndexOutOfBoundsException

// ─── 陷阱 3：delete 造成空洞 ───
const arr2 = [1, 2, 3, 4, 5]
delete arr2[2]            // ⚠️ 变成 [1, 2, empty, 4, 5]
console.log(arr2.length)  // 5（length 不变！）
// 正确做法：用 splice
arr2.splice(2, 1)         // ✅ [1, 2, 4, 5]，length = 4

// ─── 陷阱 4：数组方法的时间复杂度 ───
const arr3 = [1, 2, 3, 4, 5]
arr3.push(6)              // O(1) 均摊
arr3.pop()                // O(1)
arr3.unshift(0)           // O(n) —— 所有元素后移一位！
arr3.shift()              // O(n) —— 所有元素前移一位！
arr3.splice(2, 1)         // O(n) —— 后面元素前移
arr3.indexOf(3)           // O(n) —— 线性查找
arr3.includes(3)          // O(n) —— 线性查找
arr3.sort()               // O(n log n) —— TimSort

// ─── 陷阱 5：用 new Array(n) 创建数组 ───
const arr4 = new Array(5)         // [empty × 5] —— 稀疏数组！
const arr5 = new Array(5).fill(0) // [0,0,0,0,0] —— ✅ 密集数组
const arr6 = Array.from({ length: 5 }, (_, i) => i)  // [0,1,2,3,4] ✅

// ─── 陷阱 6：sort 默认按字符串排序 ───
const nums = [1, 2, 10, 20, 100]
nums.sort()               // ⚠️ [1,10,100,2,20] —— 字符串序！
nums.sort((a, b) => a - b) // ✅ [1,2,10,20,100] —— 数字序`
</script>
