<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📏 动态数组：扩容策略与均摊分析</h1>
          <p class="text-sm text-slate-500 mt-1">JS Array / Java ArrayList 背后的扩容机制</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-1-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：动态数组
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          动态数组 = 静态数组 + 自动扩容。它维护两个字段：<strong>size</strong>（当前元素个数）和 <strong>capacity</strong>（底层分配的容量，capacity ≥ size）。
          当 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">size == capacity</code> 时，分配更大的数组并复制旧元素。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 640 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">动态数组 = 底层数组（实格 = 已有元素，虚格 = 预留空间）</text>

            <!-- 元素格子：前 3 个有数据，后 3 个预留 -->
            <rect x="30" y="64" width="64" height="48" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="62" y="88" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="102" y="64" width="64" height="48" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="134" y="88" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="174" y="64" width="64" height="48" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="206" y="88" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="246" y="64" width="64" height="48" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <rect x="318" y="64" width="64" height="48" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <rect x="390" y="64" width="64" height="48" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />

            <!-- 下标 -->
            <text x="62" y="124" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[0]</text>
            <text x="134" y="124" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[1]</text>
            <text x="206" y="124" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[2]</text>
            <text x="278" y="124" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#94a3b8">[3]</text>
            <text x="350" y="124" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#94a3b8">[4]</text>
            <text x="422" y="124" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#94a3b8">[5]</text>

            <!-- size 标注 -->
            <line x1="30" y1="148" x2="238" y2="148" stroke="#0891b2" stroke-width="1.5" />
            <line x1="30" y1="144" x2="30" y2="152" stroke="#0891b2" stroke-width="1.5" />
            <line x1="238" y1="144" x2="238" y2="152" stroke="#0891b2" stroke-width="1.5" />
            <text x="30" y="164" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">size = 3（已有元素）</text>

            <!-- capacity 标注 -->
            <line x1="30" y1="182" x2="454" y2="182" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <line x1="30" y1="178" x2="30" y2="186" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="454" y1="178" x2="454" y2="186" stroke="#94a3b8" stroke-width="1.5" />
            <text x="30" y="198" font-size="11" font-family="monospace" fill="#64748b">capacity = 6（分配的总空间，含预留）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：动态数组结构 —— size 是逻辑长度，capacity 是物理容量，虚线框 = 预留的未用空间</figcaption>
        </figure>

        <!-- 操作示意图：扩容 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：扩容 —— capacity 4 → 8，复制旧元素 + 写入新元素</h3>
        <figure>
          <svg viewBox="0 0 560 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ov-exp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="22" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">旧数组 capacity=4（已满，push(5) 触发扩容）</text>

            <!-- 旧数组 4 个元素 -->
            <rect x="20" y="44" width="54" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="47" y="65" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="82" y="44" width="54" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="109" y="65" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="144" y="44" width="54" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="171" y="65" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="206" y="44" width="54" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="233" y="65" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>

            <!-- 复制箭头 -->
            <line x1="47" y1="88" x2="47" y2="156" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-exp)" />
            <line x1="109" y1="88" x2="109" y2="156" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-exp)" />
            <line x1="171" y1="88" x2="171" y2="156" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-exp)" />
            <line x1="233" y1="88" x2="233" y2="156" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-exp)" />
            <text x="260" y="122" font-size="10" font-family="monospace" fill="#94a3b8">复制旧元素 O(n)</text>

            <text x="16" y="140" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">新数组 capacity=8（复制 1,2,3,4 后，再写入 5）</text>

            <!-- 新数组 8 个元素 -->
            <rect x="20" y="160" width="54" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="47" y="181" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="82" y="160" width="54" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="109" y="181" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="144" y="160" width="54" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="171" y="181" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="206" y="160" width="54" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="233" y="181" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="268" y="160" width="54" height="42" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="295" y="181" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
            <rect x="330" y="160" width="54" height="42" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <rect x="392" y="160" width="54" height="42" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <rect x="454" y="160" width="54" height="42" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：扩容 —— 分配 2x 新数组，逐个复制旧元素（O(n)），再写入新元素；扩容代价被后续 push 均摊为 O(1)</figcaption>
        </figure>
      </section>

      <!-- 1. 动态数组的概念 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          动态数组的本质 —— 带自动扩容的静态数组
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          动态数组不是一种新的数据结构，而是在<strong>静态数组之上封装了自动扩容逻辑</strong>。
          它维护两个关键字段：<strong>size</strong>（当前元素数量）和 <strong>capacity</strong>（底层数组的总容量）。
          当 size 触及 capacity 时，自动分配更大的数组并复制元素。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>动态数组的三要素：</strong></p>
          <ol class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span><strong>底层数组</strong> — 存储实际元素的连续内存块</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span><strong>size（逻辑长度）</strong> — 用户可见的元素数量</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">3.</span><span><strong>capacity（物理容量）</strong> — 底层数组实际分配的空间，capacity >= size</span></li>
          </ol>
        </div>
        <div class="mb-4"><Code language="ts" :code="conceptCode" title="dynamic_array_concept.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          动态数组就像<strong>浏览器的预分配内存策略</strong>——V8 给 Array 分配的底层内存比实际元素多，预留"缓冲空间"。<br/>
          当你 <code>push</code> 时，如果还有预留空间就直接写入（O(1)），空间用完才申请更大的内存块。<br/>
          这就像 ArrayBuffer 的 grow 操作——能原地扩展就原地，不能就搬家。</p>
        </aside>
      </section>

      <!-- 2. 扩容策略 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          扩容策略 —— 1.5x vs 2x，谁更优？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          扩容的核心问题是：<strong>每次扩多大？</strong>太小则频繁扩容，太大则浪费内存。
          主流实现采用<strong>乘法扩容</strong>（geometric growth），而非加法扩容（arithmetic growth）。
        </p>
        <div class="mb-4"><Code language="ts" :code="growthFactorCode" title="growth_factors.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">语言/库</th><th class="px-4 py-2 border border-slate-200 font-semibold">数据结构</th><th class="px-4 py-2 border border-slate-200 font-semibold">扩容因子</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">Java</td><td class="px-4 py-2 border font-mono">ArrayList</td><td class="px-4 py-2 border font-mono">1.5x</td><td class="px-4 py-2 border">oldCapacity + (oldCapacity >> 1)</td></tr>
              <tr><td class="px-4 py-2 border">C++ STL</td><td class="px-4 py-2 border font-mono">std::vector</td><td class="px-4 py-2 border font-mono">2x (通常)</td><td class="px-4 py-2 border">实现依赖，GCC 用 2x</td></tr>
              <tr><td class="px-4 py-2 border">Go</td><td class="px-4 py-2 border font-mono">slice (append)</td><td class="px-4 py-2 border font-mono">~1.25x~2x</td><td class="px-4 py-2 border">小容量 2x，大容量 1.25x</td></tr>
              <tr><td class="px-4 py-2 border">V8 (JS)</td><td class="px-4 py-2 border font-mono">Array (push)</td><td class="px-4 py-2 border font-mono">~1.5x</td><td class="px-4 py-2 border">具体取决于元素数量和空洞情况</td></tr>
              <tr><td class="px-4 py-2 border">Python</td><td class="px-4 py-2 border font-mono">list</td><td class="px-4 py-2 border font-mono">~1.125x</td><td class="px-4 py-2 border">渐进式，扩容因子随 size 递减</td></tr>
              <tr><td class="px-4 py-2 border">Rust</td><td class="px-4 py-2 border font-mono">Vec</td><td class="px-4 py-2 border font-mono">2x</td><td class="px-4 py-2 border">简单直接</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3">为什么 2x 浪费内存？</h3>
        <p class="text-slate-600 mb-2 text-sm leading-relaxed">
          设扩容因子为 k（k > 1）。每次扩容后，<strong>之前分配的所有内存之和，再乘以 (k-1)</strong> 就是浪费量。
        </p>
        <div class="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-3">
          <p class="text-xs text-slate-600 font-mono leading-relaxed">
            k=2: capacity 序列 → 1, 2, 4, 8, 16, 32, ... → 总分配 = 63, 浪费 = 63 - 32 = 31 (~50%)<br/>
            k=1.5: capacity 序列 → 1, 2, 3, 5, 8, 12, 18, ... → 浪费更少<br/>
            k→1: 扩容频繁，均摊不再是 O(1)，退化为 O(n)
          </p>
        </div>
        <p class="text-slate-600 text-sm leading-relaxed">
          <strong>结论：</strong>1.5x 是空间与时间的甜点——既有 O(1) 均摊，又能复用已释放的内存（下次扩容可能 fit 进刚释放的旧块）。
          这是因为 1.5x 扩容时，旧内存 + 旧内存/2 恰好能装进之前释放的所有内存之和。
        </p>
      </section>

      <!-- 3. 均摊分析 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          均摊分析 —— push 为什么是 O(1)？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          单次扩容需要 O(n) 时间（复制所有元素），但<strong>扩容发生的频率随数组增长而降低</strong>。
          用<strong>聚合分析 (Aggregate Method)</strong> 来证明 push 的均摊复杂度为 O(1)。
        </p>

        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200 mb-4">
          <p class="text-sm text-cyan-800 mb-2 font-semibold">聚合分析（2x 扩容为例）：</p>
          <ol class="space-y-1.5 text-cyan-700 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 font-bold">1.</span><span>插入 n 个元素的总操作次数 = n + (1+2+4+8+...+2^k)，其中 2^k ≈ n</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 font-bold">2.</span><span>等比数列求和：1+2+4+...+2^k = 2^(k+1) - 1 ≈ 2n</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 font-bold">3.</span><span>总操作 = n + 2n = 3n，均摊每次 = 3n / n = 3 → O(1)</span></li>
          </ol>
        </div>

        <div class="mb-4"><Code language="ts" :code="amortizedCode" title="amortized_analysis.ts" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>"均摊 O(1)" 不意味着每次操作都快——扩容那次是 O(n)，但发生频率很低。<br/>
          形象理解：push 100 次，大概只扩容了 7 次（2^7=128），每次扩容复制的工作量被后续的"免费" push 均摊了。</p>
        </aside>
      </section>

      <!-- 4. 实现动态数组 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          手写动态数组 —— 从零实现 ArrayList
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          理解动态数组最好的方式是自己写一个。下面实现一个简化版 <code>ArrayList</code>，支持 push/pop/get/set/insert/remove 操作。
        </p>
        <div class="mb-4"><Code language="ts" :code="implementationCode" title="dynamic_array_impl.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 实现要点：</strong><br/>
          1. <strong>capacity 和 size 是两个概念</strong>——capacity 是物理容量，size 是逻辑长度<br/>
          2. <strong>扩容时创建新数组</strong>——不能原地扩容（JS 中可以用 ArrayBuffer resize，但那是特例）<br/>
          3. <strong>插入/删除中间元素是 O(n)</strong>——需要搬移后续元素<br/>
          4. <strong>pop 不用缩容</strong>（size-- 即可），但长期来看可能浪费内存</p>
        </aside>
      </section>

      <!-- 5. 缩容策略 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          缩容策略 —— 什么时候该"退房"？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          扩容容易，缩容难。频繁缩容会导致<strong>振荡 (thrashing)</strong>——在扩容阈值附近反复 push/pop，每次都重新分配。
          <strong>解决方案：用滞后缩容 (lazy shrinking)</strong>，只在 size 远小于 capacity 时才缩容。
        </p>
        <div class="mb-4"><Code language="ts" :code="shrinkCode" title="shrink_strategies.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 关键陷阱：</strong>不要在扩容阈值的临界点反复 push/pop。<br/>
          例如 capacity=10, size=10，push → 扩容到 20，pop → 如果立即缩容到 10，下次 push 又扩容...<br/>
          <strong>铁律：缩容阈值 &lt; 扩容阈值</strong>，留出"缓冲区"。</p>
        </aside>
      </section>

      <!-- 6. 数组方法复杂度 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          JS 数组方法复杂度速查表
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          知道每个数组操作的时间复杂度，是写出高性能前端代码的前提。以下按类别列出常用方法。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">操作</th><th class="px-4 py-2 border border-slate-200 font-semibold">时间复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold">是否修改原数组</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">arr[i]</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border">否</td><td class="px-4 py-2 border">随机访问</td></tr>
              <tr><td class="px-4 py-2 border font-mono">push(v)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1) 均摊</td><td class="px-4 py-2 border">是</td><td class="px-4 py-2 border">末尾追加，可能触发扩容</td></tr>
              <tr><td class="px-4 py-2 border font-mono">pop()</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border">是</td><td class="px-4 py-2 border">末尾删除，size--</td></tr>
              <tr><td class="px-4 py-2 border font-mono">unshift(v)</td><td class="px-4 py-2 border font-mono text-red-600">O(n)</td><td class="px-4 py-2 border">是</td><td class="px-4 py-2 border">头部插入，所有元素后移</td></tr>
              <tr><td class="px-4 py-2 border font-mono">shift()</td><td class="px-4 py-2 border font-mono text-red-600">O(n)</td><td class="px-4 py-2 border">是</td><td class="px-4 py-2 border">头部删除，所有元素前移</td></tr>
              <tr><td class="px-4 py-2 border font-mono">splice(i, 1)</td><td class="px-4 py-2 border font-mono text-red-600">O(n)</td><td class="px-4 py-2 border">是</td><td class="px-4 py-2 border">删除 i 位置，后续元素前移</td></tr>
              <tr><td class="px-4 py-2 border font-mono">splice(i, 0, v)</td><td class="px-4 py-2 border font-mono text-red-600">O(n)</td><td class="px-4 py-2 border">是</td><td class="px-4 py-2 border">插入到 i 位置，后续元素后移</td></tr>
              <tr><td class="px-4 py-2 border font-mono">indexOf(v)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border">否</td><td class="px-4 py-2 border">线性查找</td></tr>
              <tr><td class="px-4 py-2 border font-mono">includes(v)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border">否</td><td class="px-4 py-2 border">线性查找</td></tr>
              <tr><td class="px-4 py-2 border font-mono">find(fn)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border">否</td><td class="px-4 py-2 border">线性查找，返回第一个满足条件的</td></tr>
              <tr><td class="px-4 py-2 border font-mono">map(fn)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border">否（新数组）</td><td class="px-4 py-2 border">遍历+转换</td></tr>
              <tr><td class="px-4 py-2 border font-mono">filter(fn)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border">否（新数组）</td><td class="px-4 py-2 border">遍历+过滤</td></tr>
              <tr><td class="px-4 py-2 border font-mono">reduce(fn)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border">否</td><td class="px-4 py-2 border">遍历+累积</td></tr>
              <tr><td class="px-4 py-2 border font-mono">sort(fn)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n log n)</td><td class="px-4 py-2 border">是</td><td class="px-4 py-2 border">TimSort（V8）</td></tr>
              <tr><td class="px-4 py-2 border font-mono">slice(i, j)</td><td class="px-4 py-2 border font-mono text-amber-600">O(k)，k=j-i</td><td class="px-4 py-2 border">否（新数组）</td><td class="px-4 py-2 border">浅拷贝一段区间</td></tr>
              <tr><td class="px-4 py-2 border font-mono">concat(arr2)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n+m)</td><td class="px-4 py-2 border">否（新数组）</td><td class="px-4 py-2 border">合并两个数组</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="complexityDemoCode" title="complexity_demonstration.ts" /></div>
      </section>

      <!-- 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：扩容机制
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          连续 Push 直到容量满，触发<strong>自动扩容</strong>。观察容量栏的变化——扩容时底层数组被替换为更大的数组（2x），所有元素被<strong>复制</strong>过去。这就是 Push 均摊 O(1) 的直观原因。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-1">
          <button v-for="btn in ctrlBtns2" :key="btn.label" @mousedown="btn.action" :disabled="busy2"
            :class="[btn.cls, 'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100']">{{ btn.label }}</button>
          <input v-if="showInp2" v-model="inpVal2" type="number" class="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-shadow" placeholder="值" />
          <input v-if="showIdx2" v-model="inpIdx2" type="number" class="w-14 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-shadow" placeholder="索引" />
          <button v-if="showInp2||showIdx2" @click="confirmInp2" :disabled="busy2" class="px-2.5 py-1.5 bg-cyan-500 text-white rounded-lg text-xs font-medium hover:bg-cyan-600 active:scale-95 transition-all duration-150 disabled:opacity-40">确认</button>
          <button v-if="showInp2||showIdx2" @click="cancelInp2" :disabled="busy2" class="px-2 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-500 hover:bg-slate-100 active:scale-95 transition-all duration-150">取消</button>
          <span class="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded-full ml-auto">{{ capText }}</span>
          <span class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{{ status2 }}</span>
        </div>
        <div ref="b2" class="w-full relative" :style="{height: H2+'px'}">
          <v-stage :config="{width: W2, height: H2}">
            <v-layer>
              <v-rect v-for="b in bars2" :key="b.id" :config="rc2(b)" />
              <v-text v-for="b in bars2" :key="'v'+b.id" :config="vc2(b)" />
              <v-text v-for="(b,i) in bars2" :key="'i'+b.id" :config="ic2(i)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 8. 小结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>动态数组 = 静态数组 + 自动扩容</strong>，核心是 size 和 capacity 两个字段</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>扩容因子：</strong>1.5x 是空间与时间的甜点（Java ArrayList），2x 最简单（Rust Vec）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>push 均摊 O(1)：</strong>扩容的 O(n) 成本被大量不扩容的 push 平摊</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>缩容要滞后：</strong>只在 size &lt; capacity/4 时才缩容，避免振荡</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>unshift/shift/splice 是 O(n)：</strong>头部的插入删除需要搬移所有元素</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>JS 开发铁律：</strong>避免在循环中使用 unshift，用 push + reverse 替代</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-1-array/dsa-2-1-1-static" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：静态数组</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-1-array/dsa-2-1-3-two-pointer" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：双指针技巧 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ===== 🎬 动态数组扩容动画 =====
const C2 = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H2=ref(300), W2=ref(700); let BW2=0, G2=9, MXH2=220, BASE2=255
interface B2 { id:number; val:number; color:string; s?:number; _x?:number; _y?:number; _h?:number; capMark?:boolean }
const bars2=reactive<B2[]>([]), busy2=ref(false), status2=ref(''), nid2=ref(100)
const capText = ref('容量: 6')
const b2=ref<HTMLDivElement>()
const sh2=(v:number)=>Math.max(4,v)
function init2(d:number[]=[5,3,8,1,9,4]) { bars2.length=0; d.forEach((v,i)=>bars2.push({id:i+1,val:v,color:C2.cyan,s:1})); layout2() }
function layout2() {
  BW2 = Math.min(54, Math.floor((W2.value-20)/(bars2.length||1)-G2))
  const total=bars2.length*(BW2+G2)-G2, sx=Math.max(10,(W2.value-total)/2)
  const maxV=Math.max(...bars2.map(b=>b.val),1)
  bars2.forEach((b,i)=>{ b._x=sx+i*(BW2+G2); b._h=Math.max(30,(b.val/maxV)*MXH2); b._y=BASE2-(b._h||30) })
}
function rc2(b:any){ const s=b.s??1,gh=b.color===C2.ghost; return {x:b._x+(BW2*(1-s))/2,y:b._y,width:BW2*s,height:sh2(b._h)*s,fill:b.color,cornerRadius:[4,4,0,0],stroke:gh?'transparent':(b.capMark?C2.warn:'#94a3b8'),strokeWidth:gh?0:(b.capMark?2:1),shadowColor:gh?'transparent':'rgba(0,0,0,.12)',shadowBlur:gh?0:6,shadowOffsetY:gh?0:2,opacity:gh?0:1} }
function vc2(b:any){ const s=b.s??1,h=sh2(b._h)*s; return {x:b._x+(BW2*(1-s))/2,y:b._y+2,width:BW2*s,height:h-4,text:h>20?String(b.val):'',fontSize:Math.round(Math.min(14,BW2*0.3)*s),fontFamily:'monospace',fontStyle:'bold',fill:h>32?'#fff':C2.text,align:'center',verticalAlign:'middle' } }
function ic2(i:number){ return {x:(bars2[i]as any)?._x||0,y:BASE2+6,width:BW2,text:'['+i+']',fontSize:Math.min(10,BW2*0.2),fontFamily:'monospace',fill:C2.muted,align:'center'} }
const d2=(ms:number)=>new Promise(r=>setTimeout(r,ms))
async function act2(msg:string,fn:()=>Promise<void>){ if(busy2.value)return; busy2.value=true;status2.value=msg; try{await fn()}catch(_){} finally{await d2(300);busy2.value=false;status2.value=''} }

// 核心：触发扩容演示
async function pushUntilExpand() {
  act2('Push → 触发扩容！capacity 2x', async () => {
    const cap = bars2.length
    // Step1: 标注容量边界
    bars2.forEach(b=>b.capMark=true); capText.value=`容量: ${cap} (已满!)`; layout2(); await d2(700)
    // Step2: 插入触发扩容
    const v=Math.floor(Math.random()*90+10)
    const nb: B2 = {id:nid2.value++,val:v,color:C2.green,s:0}; bars2.push(nb)
    bars2.forEach(b=>b.capMark=false); capText.value=`扩容 → 容量: ${bars2.length*2}`; layout2(); await d2(80)
    nb.s=1; layout2(); await d2(600); nb.color=C2.cyan
    capText.value=`容量: ${bars2.length*2}`
  })
}
function doPush2(){ act2('Push  O(1) 均摊',async()=>{
  if(bars2.length>=12) return pushUntilExpand() // 满了就演示扩容
  const v=Math.floor(Math.random()*90+10); const nb:B2={id:nid2.value++,val:v,color:C2.green,s:0}; bars2.push(nb); layout2()
  await d2(80); nb.s=1; layout2(); await d2(450); nb.color=C2.cyan
})}
function doPop2(){ if(!bars2.length)return; act2('Pop  O(1)',async()=>{
  const lb=bars2[bars2.length-1]; lb.color=C2.red; await d2(350)
  lb.s=0; layout2(); await d2(300); bars2.pop(); layout2()
})}
function askIns2(){ showInp2.value=true; showIdx2.value=true; pend2='ins' }
function askRem2(){ showInp2.value=false; showIdx2.value=true; pend2='rem' }
const showInp2=ref(false),showIdx2=ref(false),inpVal2=ref(0),inpIdx2=ref(0); let pend2=''
async function confirmInp2(){
  showInp2.value=false;showIdx2.value=false
  if(pend2==='ins'){ const v=+inpVal2.value,i=+inpIdx2.value; if(isNaN(v)||isNaN(i)||i<0||i>bars2.length)return
    await act2('Insert  O(n)',async()=>{ const nb:B2={id:nid2.value++,val:v,color:C2.green,s:0}; bars2.splice(i,0,nb); layout2(); await d2(80); nb.s=1; layout2(); await d2(500); nb.color=C2.cyan })}
  else if(pend2==='rem'){ const i=+inpIdx2.value; if(isNaN(i)||i<0||i>=bars2.length)return
    await act2('Remove  O(n)',async()=>{ bars2[i].color=C2.red; await d2(350); bars2[i].color=C2.ghost; bars2[i].s=0; layout2(); await d2(300); bars2.splice(i,1); layout2() })}
}
function cancelInp2(){ showInp2.value=false;showIdx2.value=false }
function doReset2(){ init2(); capText.value='容量: 6' }
const ctrlBtns2=computed(()=>[
  { label:'Push', action:doPush2, cls:'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm' },
  { label:'Pop', action:doPop2, cls:'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm' },
  { label:'Insert', action:askIns2, cls:'bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:border-green-300 hover:shadow-sm' },
  { label:'Remove', action:askRem2, cls:'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm' },
  { label:'↺ Reset', action:doReset2, cls:'bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm' },
])
let ro2:ResizeObserver|null=null
onMounted(()=>{ init2(); if(b2.value){ W2.value=b2.value.clientWidth; layout2(); ro2=new ResizeObserver(e=>{ const w=e[0]?.contentRect.width; if(w&&w>100){W2.value=w;layout2()} }); ro2.observe(b2.value) } })
onUnmounted(()=>ro2?.disconnect())

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "动态数组概念" },
  { id: "sec-2", name: "扩容策略" },
  { id: "sec-3", name: "均摊分析" },
  { id: "sec-4", name: "手写动态数组" },
  { id: "sec-5", name: "缩容策略" },
  { id: "sec-6", name: "方法复杂度速查" },
  { id: "sec-viz", name: "🎬 扩容动画" },
  { id: "sec-8", name: "小结" },
]

const conceptCode = `// ─── 动态数组的核心数据结构 ───
// 逻辑视图（用户看到的）：
//   [1, 2, 3]  size = 3
// 物理视图（内存中实际的）：
//   [1, 2, 3, _, _, _, _, _]  capacity = 8

// ─── 用对象模拟动态数组的内部状态 ───
class ArrayListSimulator<T> {
    private data: T[]           // 底层数组
    private _size: number = 0   // 当前元素数量

    get length(): number { return this._size }  // 用户看到的是 size，不是 capacity
    get capacity(): number { return this.data.length }
}

// 对比：JavaScript 中你无法直接访问 capacity
const arr = [1, 2, 3]
console.log(arr.length)  // 3 —— 用户视角的 length 就是 size
// V8 内部：capacity 可能 = 6 或 8（有预留空间），但你不知道
// 这就是为什么 arr[1000] = 0 不会立即导致扩容
// （虽然它会让数组变稀疏...）`

const growthFactorCode = `// ─── 扩容因子对比 ───

// 1. 加法扩容（每次 +1）：最糟策略
// push N 次：扩容 N 次，每次复制 1,2,3,...,N-1 个元素
// 总复制次数 = 1+2+...+(N-1) = N(N-1)/2 → O(N²) 总时间
// 均摊每次 push = O(N) —— 完全不可接受！

// 2. 2x 扩容：最大浪费
// capacity 序列: 1 → 2 → 4 → 8 → 16 → 32
// 优点：扩容次数最少（约 log₂ N 次）
// 缺点：总分配内存 = 1+2+4+...+N ≈ 2N，但当前只用 N → 约 50% 浪费

// 3. 1.5x 扩容：Java ArrayList 的选择
// capacity 序列: 10 → 15 → 22 → 33 → 49 → 73 → ...
// 优点：浪费比 2x 少，且旧内存碎片能复用
// 数学原理：1.5 + 1.5² + ... + 1.5^(k-1) < 1.5^k * (1.5/(0.5)) ≈ 3 * 1.5^k
// 所以后续扩容可能需要的内存 ≤ 之前所有释放的内存之和

// ─── 扩容开销的数学分析 ───
// 设扩容因子为 k (>1)，push N 次
// 扩容发生在 size = 1, k, k², k³, ..., k^m ≈ N
// 复制次数 = k + k² + ... + k^m ≈ k^(m+1)/(k-1) ≈ N*k/(k-1)
// 总操作 = N + N*k/(k-1) = N * (2k-1)/(k-1)
// 均摊 = (2k-1)/(k-1)
// k=2 → 3N/N = 3 → O(1)
// k=1.5 → 4N/N = 4 → O(1)
// k→1 → 趋于无穷 → O(n)`

const amortizedCode = `// ─── 均摊分析可视化 ───
// 每次 push 的实际代价（以 2x 扩容为例）

class AmortizedTracker {
    private ops: number[] = []

    push(n: number): void {
        let count = 0
        const arr: number[] = []
        for (let i = 0; i < n; i++) {
            const beforePush = arr.length
            arr.push(i)
            const afterCap = this.estimateCapacity(arr, beforePush)
            if (afterCap !== beforePush) {
                count++  // 记录扩容次数
            }
        }
        this.ops.push(count)
        console.log(\`push \${n} 次，扩容了 \${count} 次，比例: \${(count/n*100).toFixed(1)}%\`)
    }

    private estimateCapacity(arr: number[], prevLen: number): number {
        // 简化估算：V8 的行为大致如此
        if (arr.length <= 1) return 1
        return prevLen  // 无法在 JS 中获取 capacity，仅做概念说明
    }
}

// ─── 聚合分析（Aggregate Method）───
// push N 次的总代价 = N + (1 + 2 + 4 + 8 + ... + 2^k)
// 其中 2^k 是最后一次扩容前的容量，2^k ≈ N（在 1x~2x 之间）
// 等比求和：1+2+4+...+2^k = 2^(k+1) - 1 ≈ 2N - 1
// 总代价 = N + (2N - 1) = 3N - 1
// 均摊每次 = (3N - 1) / N ≈ 3 → O(1)

// ─── 记账法（Accounting Method）───
// 每次 push 存 3 元：
//   - 1 元：当前这次 push 的成本
//   - 2 元：预留给未来扩容 —— 当需要扩容时，用这些存款支付复制成本
// 可以证明：余额永远不会为负

// ─── 势能法（Potential Method）───
// 定义势能 Φ = 2 * size - capacity
// push 不扩容：实际代价 1，势能变化 ΔΦ = 2 - 0 = 2 → 均摊代价 = 1+2 = 3
// push 扩容：实际代价 1 + oldCap，ΔΦ = 2*(oldCap+1) - 2*oldCap = 2-2*oldCap
// → 均摊代价 = (1+oldCap) + (2-2*oldCap) = 3 - oldCap ≤ 3
// 无论如何，均摊代价 ≤ 3 → O(1)`

const implementationCode = `// ─── 手写动态数组（TypeScript 实现）───

class ArrayList<T> {
    private data: (T | undefined)[]
    private _size: number

    constructor(initialCapacity: number = 10) {
        this.data = new Array(initialCapacity)
        this._size = 0
    }

    // O(1) 均摊
    push(value: T): void {
        if (this._size === this.data.length) {
            this.resize(this.data.length * 2)  // 2x 扩容
        }
        this.data[this._size] = value
        this._size++
    }

    // O(1)
    pop(): T | undefined {
        if (this._size === 0) return undefined
        this._size--
        const value = this.data[this._size]
        this.data[this._size] = undefined  // 帮助 GC
        // 缩容检查（size < capacity/4 时缩到 capacity/2）
        if (this._size > 0 && this._size === Math.floor(this.data.length / 4)) {
            this.resize(Math.floor(this.data.length / 2))
        }
        return value
    }

    // O(1)
    get(index: number): T | undefined {
        if (index < 0 || index >= this._size) {
            throw new Error(\`Index \${index} out of bounds [0, \${this._size})\`)
        }
        return this.data[index]
    }

    // O(1)
    set(index: number, value: T): void {
        if (index < 0 || index >= this._size) {
            throw new Error(\`Index \${index} out of bounds\`)
        }
        this.data[index] = value
    }

    // O(n) —— 需要搬移 [index, size) 的所有元素
    insert(index: number, value: T): void {
        if (index < 0 || index > this._size) {
            throw new Error(\`Index \${index} out of bounds\`)
        }
        if (this._size === this.data.length) {
            this.resize(this.data.length * 2)
        }
        // 从后往前搬移（避免覆盖）
        for (let i = this._size; i > index; i--) {
            this.data[i] = this.data[i - 1]
        }
        this.data[index] = value
        this._size++
    }

    // O(n) —— 需要搬移 [index+1, size) 的所有元素
    remove(index: number): T | undefined {
        if (index < 0 || index >= this._size) {
            throw new Error(\`Index \${index} out of bounds\`)
        }
        const value = this.data[index]
        // 从前往后搬移
        for (let i = index; i < this._size - 1; i++) {
            this.data[i] = this.data[i + 1]
        }
        this.data[this._size - 1] = undefined  // 帮助 GC
        this._size--
        if (this._size > 0 && this._size === Math.floor(this.data.length / 4)) {
            this.resize(Math.floor(this.data.length / 2))
        }
        return value
    }

    get length(): number { return this._size }

    private resize(newCapacity: number): void {
        const newData = new Array<T | undefined>(newCapacity)
        for (let i = 0; i < this._size; i++) {
            newData[i] = this.data[i]  // 复制旧元素
        }
        this.data = newData
    }
}

// 使用示例
const list = new ArrayList<number>(2)
list.push(1)  // size=1, capacity=2（无需扩容）
list.push(2)  // size=2, capacity=2（满了）
list.push(3)  // size=3, capacity=4（扩容 2→4）
list.push(4)  // size=4, capacity=4（满了）
list.push(5)  // size=5, capacity=8（扩容 4→8）
console.log(list.length)  // 5`

const shrinkCode = `// ─── 缩容策略分析 ───

// ❌ 错误方案：pop 后立即缩容
class BadArrayList<T> {
    pop(): T | undefined {
        if (this._size === 0) return undefined
        this._size--
        const value = this.data[this._size]
        // ❌ 如果 size == capacity/2，马上缩容
        if (this._size === this.data.length / 2) {
            this.resize(this.data.length / 2)
        }
        return value
    }
}
// 问题：在 capacity=10, size=10 时：
// push → size=11, 扩容到 20
// pop  → size=10, 缩容到 10
// push → size=11, 又扩容到 20
// 每次 push/pop 都触发 O(n) 的重新分配 —— 振荡！

// ✅ 正确方案：滞后缩容（只在 size < capacity/4 时缩到一半）
class GoodArrayList<T> {
    pop(): T | undefined {
        if (this._size === 0) return undefined
        this._size--
        const value = this.data[this._size]
        // ✅ 只在利用率 < 25% 时缩容到 50%
        if (this._size > 0 && this._size === Math.floor(this.data.length / 4)) {
            this.resize(Math.floor(this.data.length / 2))
        }
        return value
    }
}
// 这样缩容后有 50% 利用率 → 可以缓冲多次 push/pop 而无需反复扩容

// ─── Java ArrayList 的缩容 ───
// ArrayList 永远不会自动缩容！（需要手动调用 trimToSize()）
// 设计理由：大多数场景下不需要缩容，避免不必要的复制

// ─── JS 数组的 trim ───
// arr.length = n 可以截断数组（丢弃多余元素），但不会释放底层 capacity
// const arr = [1,2,3,4,5]
// arr.length = 3  // [1,2,3]，但 V8 可能不释放底层内存`

const complexityDemoCode = `// ─── 避免 O(n) 操作的常见模式 ───

// ❌ 用 unshift 构建数组（O(n²) 总时间）
function buildWithUnshift(n: number): number[] {
    const arr: number[] = []
    for (let i = 0; i < n; i++) {
        arr.unshift(i)  // 每次 O(n)
    }
    return arr
}

// ✅ 用 push + reverse（O(n) 总时间）
function buildWithPush(n: number): number[] {
    const arr: number[] = []
    for (let i = 0; i < n; i++) {
        arr.push(i)
    }
    arr.reverse()  // 一次 O(n)
    return arr
}

// ─── 避免在循环中 splice ───
// ❌ 删除数组中所有偶数（O(n²)）
function removeEvensBad(arr: number[]): number[] {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            arr.splice(i, 1)  // O(n) 搬移 + 改变了 length
            i--               // 调整索引，更乱了
        }
    }
    return arr
}

// ✅ 用 filter（O(n)）
function removeEvensGood(arr: number[]): number[] {
    return arr.filter(x => x % 2 !== 0)
}
// 或者用双指针原地删除（O(n)，O(1) 空间）—— 见下节"双指针技巧"

// ─── 数组复制的方式与性能 ───
const original = [1, 2, 3]
const copy1 = [...original]           // 浅拷贝，O(n)，推荐
const copy2 = original.slice()        // 浅拷贝，O(n)
const copy3 = Array.from(original)    // 浅拷贝，O(n)
const copy4 = original.concat([])     // 浅拷贝，O(n)
// 以上四种时间复杂度相同，[...arr] 最简洁`
</script>
