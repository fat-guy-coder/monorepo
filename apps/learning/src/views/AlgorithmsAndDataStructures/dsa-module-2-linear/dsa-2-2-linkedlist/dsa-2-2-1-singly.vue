<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔗 单向链表：插入/删除/反转/环检测</h1>
          <p class="text-sm text-slate-500 mt-1">不连续内存的数据结构——每个节点只知道下一个是谁</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-2-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：单向链表
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          每个节点只有 <strong>data + next</strong> 一个指针，只能从 <strong>head</strong> 一路向后遍历，最后一个节点的 next 指向 <strong>null</strong>。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 560 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="sg-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="28" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">head → [data|next] → [data|next] → [data|next] → null</text>
            <text x="16" y="50" font-size="11" font-family="monospace" fill="#94a3b8">每个节点只有 next 指针，单向遍历 O(n)</text>

            <!-- head 指针 -->
            <text x="30" y="100" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">head</text>
            <line x1="50" y1="100" x2="96" y2="100" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-n)" />

            <!-- 连线 -->
            <line x1="170" y1="100" x2="226" y2="100" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-n)" />
            <line x1="300" y1="100" x2="356" y2="100" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-n)" />
            <line x1="430" y1="100" x2="478" y2="100" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-n)" />

            <!-- 节点 1 -->
            <rect x="100" y="70" width="70" height="60" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="135" y="86" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">data</text>
            <text x="135" y="103" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <text x="135" y="120" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">next →</text>

            <!-- 节点 2 -->
            <rect x="230" y="70" width="70" height="60" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="265" y="86" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">data</text>
            <text x="265" y="103" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <text x="265" y="120" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">next →</text>

            <!-- 节点 3 -->
            <rect x="360" y="70" width="70" height="60" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="395" y="86" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">data</text>
            <text x="395" y="103" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <text x="395" y="120" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">next →</text>

            <!-- null -->
            <text x="488" y="100" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">null</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：单向链表结构——每个节点存 data 和 next，单向遍历直到 null</figcaption>
        </figure>

        <!-- 操作示意图：头插 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：头插 O(1) —— 新节点指向原 head</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">插入前</p>
            <svg viewBox="0 0 240 110" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="sg-ins1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <text x="12" y="50" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">head</text>
              <line x1="28" y1="50" x2="52" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-ins1)" />
              <line x1="112" y1="50" x2="136" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-ins1)" />
              <line x1="196" y1="50" x2="220" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-ins1)" />
              <rect x="56" y="25" width="56" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="84" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <text x="84" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">head</text>
              <rect x="140" y="25" width="56" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="168" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <text x="228" y="50" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">null</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">插入后（x 为新节点）</p>
            <svg viewBox="0 0 330 110" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="sg-ins2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <text x="12" y="50" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">head</text>
              <line x1="28" y1="50" x2="52" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-ins2)" />
              <line x1="112" y1="50" x2="136" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-ins2)" />
              <line x1="196" y1="50" x2="220" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-ins2)" />
              <line x1="280" y1="50" x2="304" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-ins2)" />
              <rect x="56" y="25" width="56" height="50" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="84" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">x</text>
              <text x="84" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#16a34a">new</text>
              <rect x="140" y="25" width="56" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="168" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <text x="168" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">原head</text>
              <rect x="224" y="25" width="56" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="252" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <text x="314" y="50" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">null</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">newNode.next = 原head，然后 head = newNode（改 2 个指针）</figcaption>
          </figure>
        </div>

        <!-- 操作示意图：删除 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：删除节点 —— 前驱的 next 跳过被删节点</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">删除前</p>
            <svg viewBox="0 0 330 110" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="sg-del1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <text x="12" y="50" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">head</text>
              <line x1="28" y1="50" x2="52" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-del1)" />
              <line x1="112" y1="50" x2="136" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-del1)" />
              <line x1="196" y1="50" x2="220" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-del1)" />
              <line x1="280" y1="50" x2="304" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-del1)" />
              <rect x="56" y="25" width="56" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="84" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <text x="84" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">前驱 prev</text>
              <rect x="140" y="25" width="56" height="50" rx="6" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
              <text x="168" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <text x="168" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#dc2626">被删</text>
              <rect x="224" y="25" width="56" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="252" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <text x="314" y="50" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">null</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">删除后（prev.next 指向 node3）</p>
            <svg viewBox="0 0 300 110" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="sg-del2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <text x="12" y="50" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">head</text>
              <line x1="28" y1="50" x2="52" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-del2)" />
              <line x1="112" y1="50" x2="172" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-del2)" />
              <line x1="232" y1="50" x2="256" y2="50" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-del2)" />
              <rect x="56" y="25" width="56" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="84" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <text x="84" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">前驱 prev</text>
              <rect x="116" y="25" width="56" height="50" rx="6" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="144" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" fill="#ef4444">2</text>
              <text x="144" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#ef4444">(GC)</text>
              <rect x="176" y="25" width="56" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="204" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <text x="264" y="50" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">null</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">prev.next = 被删.next，被删节点无人引用后被 GC 回收</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 什么是链表 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          什么是链表？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          链表是一种<strong>线性数据结构</strong>，由一系列<strong>节点（Node）</strong>组成。每个节点包含<strong>数据域</strong>和<strong>指针域</strong>（指向下一个节点）。
          与数组不同，链表的节点在内存中<strong>不必连续存储</strong>——它们通过指针串联在一起，就像一列手拉手的人。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">📦 数组（连续内存）</h4>
            <p class="text-sm text-slate-600 mb-2">元素紧挨着存储在连续的内存地址中。</p>
            <div class="font-mono text-xs bg-white border border-slate-300 rounded p-2 text-center">
              [0] [1] [2] [3] &rarr; 一块整内存
            </div>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">🔗 链表（离散内存）</h4>
            <p class="text-sm text-slate-600 mb-2">节点散落各处，通过 next 指针串联。</p>
            <div class="font-mono text-xs bg-white border border-slate-300 rounded p-2 text-center">
              [data|next] &rarr; [data|next] &rarr; [data|next] &rarr; null
            </div>
          </div>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          链表就像<strong>React Fiber 架构</strong>中的 Fiber 节点——每个 Fiber 通过 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">child</code>、<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">sibling</code>、<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">return</code> 指针串联成一棵可中断的遍历树。
          React 的可中断渲染（Concurrent Mode）本质上就是在遍历一条 Fiber 链表，随时可以暂停并恢复。
          <br/>另外，JS 原型链 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">obj.__proto__</code> 也是单向链表——每个对象只知道自己的原型，一路追溯到 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">null</code>。
          </p>
        </aside>
      </section>

      <!-- 内存存储 -->
      <section id="sec-mem" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">💾</span>链表在内存中怎么存？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          数组是<strong>一整块连续内存</strong>，而链表的每个节点是<strong>独立分配在堆上</strong>的，节点之间通过指针串联。这正是二者性能差异的根源。
        </p>
        <div class="mb-4"><Code language="text" :code="memLayoutCode" title="内存布局对比" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-3">JS/V8 中的实际存储</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">
          在 V8 引擎中，JS 对象存储在<strong>堆（Heap）</strong>上，每个 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">ListNode</code> 是一个独立的堆对象。<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">next</code> 属性存储的是<strong>堆地址引用</strong>（类似指针，但由 GC 管理）。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">维度</th><th class="px-4 py-2 border font-semibold">数组</th><th class="px-4 py-2 border font-semibold">链表</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">内存布局</td><td class="px-4 py-2 border">一整块连续内存</td><td class="px-4 py-2 border">节点分散在堆各处</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">每个元素开销</td><td class="px-4 py-2 border">仅数据本身（如 4 字节 int32）</td><td class="px-4 py-2 border">数据 + next 指针（64位系统 8 字节）+ 对象头</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">CPU 缓存</td><td class="px-4 py-2 border text-emerald-600">✅ 极好（预读相邻元素）</td><td class="px-4 py-2 border text-red-600">❌ 差（节点随机跳跃）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">随机访问</td><td class="px-4 py-2 border text-emerald-600">O(1) 按偏移计算</td><td class="px-4 py-2 border text-red-600">O(n) 逐个遍历</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">扩容</td><td class="px-4 py-2 border text-amber-600">需整块复制 O(n)</td><td class="px-4 py-2 border text-emerald-600">天然动态，无扩容</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">GC 压力</td><td class="px-4 py-2 border">一个对象，GC 轻</td><td class="px-4 py-2 border text-amber-600">N 个对象，GC 遍历链表</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键结论：</strong>数组的优势来自<strong>连续内存 → CPU 缓存友好 + O(1) 寻址</strong>。链表的优势来自<strong>分散节点 → O(1) 插入删除（有引用时）</strong>。选哪个取决于你的操作模式是「频繁随机访问」还是「频繁增删」。</p>
        </aside>
      </section>

      <!-- 2. ListNode 定义与遍历 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          ListNode 类定义与基本遍历
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          链表的起点是<strong>头节点（head）</strong>。拿到 head，就可以沿着 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">next</code> 遍历整条链。
          最后节点的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">next</code> 指向 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">null</code>，表示终点。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="codeListNode" title="ListNode.ts" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">遍历链表 O(n)</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          遍历是链表最基本的操作。用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">while (curr !== null)</code> 从头到尾走一遍。
        </p>
        <div class="mb-4">
          <Code language="ts" :code="codeTraverse" title="traverse.ts" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 记忆技巧：</strong>遍历链表就像坐火车——你在 head 站上车，每到一个节点就处理该站的数据，然后通过 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">next</code> "铁轨"去下一站，直到终点站 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">null</code>。</p>
        </aside>
      </section>

      <!-- 3. 插入操作 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          插入操作 —— 链表的最大优势
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          链表插入的核心优势是<strong>不需要移动其他元素</strong>。只要你有目标位置的引用，插入就是 O(1)。
          数组插入需要把后面所有元素往后挪一格，是 O(n)。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">头插法 O(1) —— 最容易</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          在头部插入新节点只需要两步：让新节点的 next 指向原 head，再把 head 改成新节点。
        </p>
        <div class="mb-4">
          <Code language="ts" :code="codeInsertHead" title="insertHead.ts" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">尾插法 O(n) —— 需要找到最后一个节点</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          要先遍历到尾部（next === null 的节点），再把它指向新节点。如果维护了 tail 引用，则是 O(1)。
        </p>
        <div class="mb-4">
          <Code language="ts" :code="codeInsertTail" title="insertTail.ts" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">中间插入 O(n) 查找 + O(1) 插入</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          在指定节点 <strong>后面</strong> 插入：新节点的 next 指向目标节点的 next，目标节点的 next 指向新节点。<strong>注意顺序不能反！</strong>
        </p>
        <div class="mb-4">
          <Code language="ts" :code="codeInsertMiddle" title="insertMiddle.ts" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 关键陷阱：单链表不能 O(1) 在前驱节点之前插入！</strong><br/>
          单向链表只知道 next，不知道 prev。如果你需要在某个节点<strong>前面</strong>插入，必须先从头遍历找到它的前驱节点，这需要 O(n)。这就是双向链表存在的意义（见下一篇）。</p>
        </aside>
      </section>

      <!-- 4. 删除操作 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          删除操作 O(n) 查找 + O(1) 移除
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          删除节点 = 找到它的<strong>前驱节点</strong>，把前驱的 next 跳过被删节点，指向被删节点的 next。<br/>
          JavaScript/TypeScript 中，被跳过的节点自动被 GC 回收（没有引用指向它了）。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="codeDelete" title="deleteNode.ts" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 删除头节点：</strong><code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">head = head.next</code> 即可。删除中间/尾节点才需要前驱。后一章的<strong>哑节点（Dummy Node）</strong>可以统一所有场景。</p>
        </aside>
      </section>

      <!-- 5. 反转链表 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          反转链表 —— 经典三指针法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          反转是面试最高频的链表题目。核心思路：用三个指针 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">prev</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">curr</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">next</code> 逐节点翻转指针方向。
        </p>

        <p class="text-slate-600 mb-2 leading-relaxed"><strong>执行流程：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>初始化：<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">prev = null</code>（新链表的尾部），<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">curr = head</code></li>
          <li>保存 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">next = curr.next</code>（在断链之前记住下一个节点）</li>
          <li>翻转：<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">curr.next = prev</code>（当前节点指向前一个）</li>
          <li>前移：<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">prev = curr</code>，<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">curr = next</code></li>
          <li>重复步骤 2-4，直到 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">curr === null</code></li>
          <li>返回 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">prev</code> 作为新头节点</li>
        </ol>

        <div class="mb-4">
          <Code language="ts" :code="codeReverse" title="reverseList.ts" />
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          反转链表就像 <strong>Array.prototype.reduce</strong> 从右向左累积：<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">[1,2,3].reduce((acc, v) => v -> acc, null)</code> 产生 3->2->1->null。<br/>
          CSS 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">flex-direction: row-reverse</code> 在视觉上实现了"反转"——类似的逻辑。
          </p>
        </aside>
      </section>

      <!-- 6. 环检测 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          环检测 —— 快慢指针（Floyd 判圈算法）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          如果链表中有环（某节点的 next 指回了前面的节点），遍历将无限循环。快慢指针是检测环的经典方法：
          <strong>慢指针每次走一步，快指针每次走两步。如果有环，两者必定相遇。</strong>
        </p>

        <div class="mb-4">
          <Code language="ts" :code="codeCycleDetect" title="hasCycle.ts" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">为什么快慢指针一定相遇？</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          假设 slow 进入环时，fast 已经在环中。每次迭代，fast 和 slow 之间的距离<strong>减少 1</strong>。
          因为二者在同一条环中，距离最终会减到 0，即相遇。
        </p>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 扩展：找到环的入口</strong><br/>
          相遇后，把一个指针移回 head，两个指针都以步长 1 前进。再次相遇的点就是<strong>环的入口</strong>。这基于数学推导：head 到入口的距离 = 相遇点到入口的距离。</p>
        </aside>
      </section>

      <!-- 7. 数组 vs 链表对比 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          数组 vs 链表 —— 何时用什么？
        </h2>

        <div class="overflow-x-auto mb-6">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">操作</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">数组</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">链表</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">随机访问</td>
                <td class="px-4 py-2 border border-slate-200">O(1) ✅</td>
                <td class="px-4 py-2 border border-slate-200">O(n) ❌</td>
                <td class="px-4 py-2 border border-slate-200">数组通过下标直接定位；链表必须从头遍历</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">头部插入/删除</td>
                <td class="px-4 py-2 border border-slate-200">O(n) ❌</td>
                <td class="px-4 py-2 border border-slate-200">O(1) ✅</td>
                <td class="px-4 py-2 border border-slate-200">数组需要移动所有元素</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">尾部插入/删除</td>
                <td class="px-4 py-2 border border-slate-200">O(1) ✅</td>
                <td class="px-4 py-2 border border-slate-200">O(n)/O(1)*</td>
                <td class="px-4 py-2 border border-slate-200">*有 tail 引用时 O(1)</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">中间插入/删除</td>
                <td class="px-4 py-2 border border-slate-200">O(n)</td>
                <td class="px-4 py-2 border border-slate-200">O(n)查找+O(1)操作</td>
                <td class="px-4 py-2 border border-slate-200">数组移元素；链表只改指针</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">内存占用</td>
                <td class="px-4 py-2 border border-slate-200">紧凑 ✅</td>
                <td class="px-4 py-2 border border-slate-200">额外指针开销 ❌</td>
                <td class="px-4 py-2 border border-slate-200">链表每个节点多存一个指针（8 字节）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">缓存友好</td>
                <td class="px-4 py-2 border border-slate-200">高 ✅</td>
                <td class="px-4 py-2 border border-slate-200">低 ❌</td>
                <td class="px-4 py-2 border border-slate-200">数组连续内存利于 CPU 缓存预取</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong><br/>
          • 需要频繁随机访问（如 arr[i]）→ 用数组。<br/>
          • 需要频繁头部增删 → 用链表。<br/>
          • 前端开发中 90% 的场景数组就够了——JavaScript 数组本身是动态的。<br/>
          • 面试中链表题考察的是指针操作和边界处理能力，而不是实际工程价值。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：链表节点操作
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">头插 O(1) / 尾插 O(n) / 删除 O(n) 查找 + O(1) 改指针。</p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ slNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ slStatus }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">⏱️ 插入O(1)·删除O(n)·查找O(n)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="slAddHead" :disabled="slBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">头插</button>
          <button @mousedown="slAddTail" :disabled="slBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">尾插</button>
          <button @mousedown="slDelHead" :disabled="slBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:shadow-sm disabled:opacity-40">删头</button>
          <button @mousedown="slReset" :disabled="slBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="slBox" class="w-full relative overflow-x-auto" :style="{height:slH+'px'}">
          <v-stage :config="{width:slW, height:slH}">
            <v-layer>
              <v-arrow v-for="(n,i) in slNodes.slice(0,-1)" :key="'a'+n.id" :config="slArrow(i)" />
              <v-rect v-for="n in slNodes" :key="n.id" :config="slR(n)" />
              <v-text v-for="n in slNodes" :key="'t'+n.id" :config="slT(n)" />
              <v-text :config="{x:Math.max(160,slNodes.length*70+30),y:60,text:slNodes.length?'null':'null',fontSize:13,fontFamily:'monospace',fill:slC.muted}" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 9. 总结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          关键点总结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>链表节点 = data + next，最后一个节点 next === null。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>遍历 O(n)，随机访问 O(n)。</strong>链表不支持下标访问。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>头插/头删 O(1)</strong>，这是链表相比数组最大的优势。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>删除节点需要前驱——单向链表中只能从前驱删。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>反转：三指针迭代法</strong>（prev/curr/next），O(n) 时间 O(1) 空间。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>环检测：快慢指针</strong>，slow 走一步 fast 走两步，相遇则有环。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>React Fiber、JS 原型链、浏览器 History 都是链表的实际应用。</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-1-array/dsa-2-1-4-prefix-sum" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：前缀和</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-2-doubly" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：双向链表与哨兵节点 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const memLayoutCode = `// ===== 数组 vs 链表内存布局 =====

// 数组：一整块连续内存
// 地址:  0x1000  0x1004  0x1008  0x100C  0x1010
//        ┌──────┬──────┬──────┬──────┬──────┐
//        │  42  │  17  │  99  │  3   │  56  │
//        └──────┴──────┴──────┴──────┴──────┘
// 访问 arr[2] → base + 2 * 4 = 0x1008 → O(1) ✓
// 每个元素仅占 4 字节（int32），空间效率极高

// 链表：节点散落在堆上
//  堆地址       节点内容
//  0x2000  ┌────┬──────┐
//          │ 42 │0x3400│──→ 到 0x3400
//          └────┴──────┘
//  0x3400  ┌────┬──────┐
//          │ 17 │0x1A00│──→ 到 0x1A00
//          └────┴──────┘
//  0x1A00  ┌────┬──────┐
//          │ 99 │ null │  ← 最后一个节点
//          └────┴──────┘
// 访问第 3 个节点 → 必须从 head 开始遍历 0→1→2 → O(n) ✗
// 每个节点额外占用 8 字节（64位指针）+ 对象头 ~12-16 字节

// JS/V8 中：
// - 数组（密集型）：底层是 FixedArray，连续内存，类似 C 数组
// - 数组（稀疏型）：底层退化为 Hash Map（Dictionary Mode），性能骤降
// - 链表节点：每个是独立堆对象，GC 需遍历整个对象图
// - 结论：JS 中频繁遍历用数组，频繁头部插入/删除用链表`

// ===== 🎬 链表操作动画 =====
const slC={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b',text:'#1e293b',muted:'#94a3b8',ghost:'#e2e8f0'}
const slW=ref(700),slH=ref(180)
interface SN { id:number; val:number; color:string; s:number }
const slNodes=reactive<SN[]>([])
const slBusy=ref(false),slStatus=ref(''),slNid=ref(10)
const slBox=ref<HTMLDivElement>()
const d4=(ms:number)=>new Promise(r=>setTimeout(r,ms))
function slInit(){ slNodes.length=0; [1,2,3].forEach((v,i)=>slNodes.push({id:i+1,val:v,color:slC.cyan,s:1})) }
function slR(n:any){ return {x:30+n.id*70-70+(50*(1-(n.s||1)))/2,y:50+(30*(1-(n.s||1)))/2,width:50*(n.s||1),height:30*(n.s||1),fill:n.color,cornerRadius:6,stroke:'#64748b',strokeWidth:1.5,shadowColor:'rgba(0,0,0,.1)',shadowBlur:3} }
function slT(n:any){ return {x:30+n.id*70-70+(50*(1-(n.s||1)))/2,y:50+(30*(1-(n.s||1)))/2,width:50*(n.s||1),height:30*(n.s||1),text:String(n.val),fontSize:14,fontFamily:'monospace',fontStyle:'bold',fill:slC.text,align:'center',verticalAlign:'middle'} }
function slArrow(i:number){ const a=slNodes[i],b=slNodes[i+1]; return {points:[a.id*70-70+30+50,65,b.id*70-70+30,65],fill:slC.muted,stroke:slC.muted,strokeWidth:2,pointerLength:7,pointerWidth:5} }
async function slAct(msg:string,fn:()=>Promise<void>){ if(slBusy.value)return;slBusy.value=true;slStatus.value=msg;try{await fn()}catch(_){};await d4(300);slBusy.value=false;slStatus.value='' }
function slAddHead(){ slAct('头插  O(1)',async()=>{ const v=~~(Math.random()*90+10); const nb:SN={id:slNid.value++,val:v,color:slC.green,s:0}; slNodes.unshift(nb); await d4(60); nb.s=1; await d4(450); nb.color=slC.cyan })}
function slAddTail(){ slAct('尾插  O(n)',async()=>{ const v=~~(Math.random()*90+10); const nb:SN={id:slNid.value++,val:v,color:slC.green,s:0}; slNodes.push(nb); await d4(60); nb.s=1; await d4(450); nb.color=slC.cyan })}
function slDelHead(){ if(!slNodes.length)return; slAct('删头  O(1)',async()=>{ slNodes[0].color=slC.red; await d4(400); slNodes[0].color=slC.ghost;slNodes[0].s=0; await d4(300); slNodes.shift() })}
function slReset(){ slBusy.value=false; slInit() }
let roSL:ResizeObserver|null=null
onMounted(()=>{ slInit(); if(slBox.value){ slW.value=slBox.value.clientWidth; roSL=new ResizeObserver(e=>{const w=e[0]?.contentRect.width;if(w&&w>200)slW.value=Math.max(400,w)}); roSL.observe(slBox.value) }})
onUnmounted(()=>roSL?.disconnect())

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "什么是链表" },
  { id: "sec-mem", name: "💾 内存中的存储" },
  { id: "sec-2", name: "ListNode 与遍历" },
  { id: "sec-3", name: "插入操作" },
  { id: "sec-4", name: "删除操作" },
  { id: "sec-5", name: "反转链表" },
  { id: "sec-6", name: "环检测" },
  { id: "sec-7", name: "数组 vs 链表" },
  { id: "sec-viz", name: "🎬 链表操作动画" },
  { id: "sec-9", name: "总结" },
]

const codeListNode = `class ListNode<T> {
  val: T
  next: ListNode<T> | null

  constructor(val: T, next: ListNode<T> | null = null) {
    this.val = val
    this.next = next
  }
}

// 创建 1 -> 2 -> 3 -> null
const node3 = new ListNode(3)
const node2 = new ListNode(2, node3)
const head = new ListNode(1, node2)

console.log(head.val)          // 1
console.log(head.next!.val)    // 2
console.log(head.next!.next!.val) // 3
console.log(head.next!.next!.next) // null`

const codeTraverse = `// 遍历链表 O(n)
function printList(head: ListNode<number> | null): void {
  let curr: ListNode<number> | null = head
  while (curr !== null) {
    console.log(curr.val)
    curr = curr.next
  }
}

// 获取链表长度 O(n)
function getLength(head: ListNode<number> | null): number {
  let len = 0
  let curr = head
  while (curr !== null) {
    len++
    curr = curr.next
  }
  return len
}

// 访问第 k 个节点（从 0 开始）O(n)
function getNode(
  head: ListNode<number> | null,
  k: number
): ListNode<number> | null {
  let curr = head
  for (let i = 0; i < k && curr !== null; i++) {
    curr = curr.next
  }
  return curr // 越界返回 null
}`

const codeInsertHead = `// 头插法 O(1)
function insertHead(
  head: ListNode<number> | null,
  val: number
): ListNode<number> {
  const newNode = new ListNode(val)
  newNode.next = head
  return newNode  // 新节点成为新的 head
}

// 使用: head = insertHead(head, 0)
// 调用前: 1 -> 2 -> 3
// 调用后: 0 -> 1 -> 2 -> 3`

const codeInsertTail = `// 尾插法 O(n) —— 需遍历到末尾
function insertTail(
  head: ListNode<number> | null,
  val: number
): ListNode<number> {
  const newNode = new ListNode(val)

  // 空链表 → 新节点就是 head
  if (head === null) return newNode

  // 遍历到最后一个节点
  let curr = head
  while (curr.next !== null) {
    curr = curr.next
  }
  curr.next = newNode
  return head
}

// 优化: 维护 tail 引用可实现尾插 O(1)
class LinkedList {
  head: ListNode<number> | null = null
  tail: ListNode<number> | null = null

  append(val: number): void {
    const node = new ListNode(val)
    if (!this.head) {
      this.head = node
      this.tail = node
    } else {
      this.tail!.next = node
      this.tail = node
    }
  }
}`

const codeInsertMiddle = `// 在目标节点 target 之后插入 O(1)（已有 target 引用）
function insertAfter(
  target: ListNode<number>,
  val: number
): void {
  const newNode = new ListNode(val)
  // ⚠️ 顺序不能反！
  newNode.next = target.next   // 第1步: 新节点先连接到后继
  target.next = newNode        // 第2步: 前驱再连接到新节点
}

// 在指定位置（索引）后插入 O(n)查找 + O(1)插入
function insertAt(
  head: ListNode<number> | null,
  index: number,
  val: number
): ListNode<number> {
  if (index === 0) return insertHead(head, val)

  const prev = getNode(head, index - 1)
  if (prev === null) return head! // 索引越界

  insertAfter(prev, val)
  return head!
}`

const codeDelete = `// 删除指定值的第一个节点 O(n)
function removeFirst(
  head: ListNode<number> | null,
  val: number
): ListNode<number> | null {
  // 删除的是头节点
  if (head !== null && head.val === val) {
    return head.next  // 跳过 head
  }

  let curr = head
  // 找被删节点的前驱
  while (curr !== null && curr.next !== null) {
    if (curr.next.val === val) {
      curr.next = curr.next.next  // 跳过被删节点
      return head
    }
    curr = curr.next
  }
  return head
}

// 删除指定节点（给定节点引用，但不能访问前驱）
// 技巧: 把下一个节点的值复制过来，然后跳过下一个节点
function deleteNode(node: ListNode<number>): void {
  if (node.next === null) return // 尾节点无法这样删
  node.val = node.next.val       // 把下一个节点的值搬过来
  node.next = node.next.next     // 跳过下一个节点
}`

const codeReverse = `// 迭代法反转链表 O(n) O(1)
function reverseList(
  head: ListNode<number> | null
): ListNode<number> | null {
  let prev: ListNode<number> | null = null
  let curr = head

  while (curr !== null) {
    const next = curr.next  // 1. 先记住下一个节点
    curr.next = prev        // 2. 翻转指针方向
    prev = curr             // 3. prev 前移
    curr = next             // 4. curr 前移
  }
  return prev  // prev 就是新 head
}

// 示例: 1->2->3->null → 3->2->1->null
// 第1次迭代: null<-1  2->3->null, prev=1, curr=2
// 第2次迭代: null<-1<-2  3->null, prev=2, curr=3
// 第3次迭代: null<-1<-2<-3, prev=3, curr=null
// 返回 prev=3 ✅

// 递归法（理解即可）
function reverseRecursive(
  head: ListNode<number> | null
): ListNode<number> | null {
  if (head === null || head.next === null) return head
  const newHead = reverseRecursive(head.next)
  head.next.next = head
  head.next = null
  return newHead
}`

const codeCycleDetect = `// 快慢指针检测环 O(n) O(1)
function hasCycle(head: ListNode<number> | null): boolean {
  if (head === null || head.next === null) return false

  let slow: ListNode<number> | null = head
  let fast: ListNode<number> | null = head

  while (fast !== null && fast.next !== null) {
    slow = slow!.next          // 慢指针走一步
    fast = fast.next.next      // 快指针走两步

    if (slow === fast) {
      return true  // 相遇 = 有环！
    }
  }
  return false  // fast 走到 null = 无环
}

// 找到环的入口节点
function detectCycle(
  head: ListNode<number> | null
): ListNode<number> | null {
  let slow: ListNode<number> | null = head
  let fast: ListNode<number> | null = head

  // 第1阶段: 快慢指针相遇
  while (fast !== null && fast.next !== null) {
    slow = slow!.next
    fast = fast.next.next
    if (slow === fast) {
      // 第2阶段: 一个回到 head，两个同步走
      let ptr1: ListNode<number> | null = head
      let ptr2: ListNode<number> | null = slow
      while (ptr1 !== ptr2) {
        ptr1 = ptr1!.next
        ptr2 = ptr2!.next
      }
      return ptr1  // 再次相遇 = 环入口
    }
  }
  return null
}`
</script>
