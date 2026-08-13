<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔗 双向链表与哨兵节点</h1>
          <p class="text-sm text-slate-500 mt-1">前后都能走——Java LinkedList / LRU 的底层结构</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-2-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：双向链表
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          每个节点有 <strong>prev + next</strong> 两个指针，可双向遍历。带上 <strong>head / tail 哨兵</strong>（虚线框）后，头尾操作无需判空。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 560 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ov-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="ov-p" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
              </marker>
            </defs>
            <text x="16" y="28" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">head ↔ n1 ↔ n2 ↔ n3 ↔ tail</text>
            <text x="16" y="50" font-size="11" font-family="monospace" fill="#94a3b8">→ next（灰）  ·  ← prev（蓝）  ·  虚线框 = 哨兵节点</text>

            <!-- next 箭头（上，向右） -->
            <line x1="72" y1="90" x2="120" y2="90" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-n)" />
            <line x1="180" y1="90" x2="230" y2="90" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-n)" />
            <line x1="290" y1="90" x2="340" y2="90" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-n)" />
            <line x1="400" y1="90" x2="450" y2="90" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-n)" />
            <!-- prev 箭头（下，向左） -->
            <line x1="120" y1="120" x2="72" y2="120" stroke="#60a5fa" stroke-width="2" marker-end="url(#ov-p)" />
            <line x1="230" y1="120" x2="180" y2="120" stroke="#60a5fa" stroke-width="2" marker-end="url(#ov-p)" />
            <line x1="340" y1="120" x2="290" y2="120" stroke="#60a5fa" stroke-width="2" marker-end="url(#ov-p)" />
            <line x1="450" y1="120" x2="400" y2="120" stroke="#60a5fa" stroke-width="2" marker-end="url(#ov-p)" />

            <!-- head 哨兵 -->
            <rect x="20" y="70" width="52" height="60" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="46" y="92" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">head</text>
            <text x="46" y="115" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">(哨兵)</text>

            <!-- 数据节点 1 -->
            <rect x="120" y="70" width="60" height="60" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="150" y="86" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">next →</text>
            <text x="150" y="103" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <text x="150" y="120" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">← prev</text>

            <!-- 数据节点 2 -->
            <rect x="230" y="70" width="60" height="60" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="260" y="86" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">next →</text>
            <text x="260" y="103" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <text x="260" y="120" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">← prev</text>

            <!-- 数据节点 3 -->
            <rect x="340" y="70" width="60" height="60" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="370" y="86" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">next →</text>
            <text x="370" y="103" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <text x="370" y="120" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">← prev</text>

            <!-- tail 哨兵 -->
            <rect x="450" y="70" width="52" height="60" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="476" y="92" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">tail</text>
            <text x="476" y="115" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">(哨兵)</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：双向链表结构——每个数据节点都存 prev + next 两个指针</figcaption>
        </figure>

        <!-- 操作示意图：插入 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：在 node2 后插入 newNode —— 改 4 个指针 O(1)</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">插入前</p>
            <svg viewBox="0 0 300 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ins-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
                <marker id="ins-p" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" /></marker>
              </defs>
              <line x1="90" y1="52" x2="210" y2="52" stroke="#94a3b8" stroke-width="2" marker-end="url(#ins-n)" />
              <line x1="210" y1="74" x2="90" y2="74" stroke="#60a5fa" stroke-width="2" marker-end="url(#ins-p)" />
              <rect x="30" y="40" width="60" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="60" y="65" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <text x="60" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">node2</text>
              <rect x="210" y="40" width="60" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="240" y="65" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <text x="240" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">node3</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">插入后（x 为 newNode）</p>
            <svg viewBox="0 0 300 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ins2-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
                <marker id="ins2-p" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" /></marker>
              </defs>
              <line x1="80" y1="52" x2="120" y2="52" stroke="#94a3b8" stroke-width="2" marker-end="url(#ins2-n)" />
              <line x1="180" y1="52" x2="220" y2="52" stroke="#94a3b8" stroke-width="2" marker-end="url(#ins2-n)" />
              <line x1="120" y1="74" x2="80" y2="74" stroke="#60a5fa" stroke-width="2" marker-end="url(#ins2-p)" />
              <line x1="220" y1="74" x2="180" y2="74" stroke="#60a5fa" stroke-width="2" marker-end="url(#ins2-p)" />
              <rect x="20" y="40" width="60" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="50" y="65" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <text x="50" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">node2</text>
              <rect x="120" y="40" width="60" height="50" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="150" y="65" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">x</text>
              <text x="150" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#16a34a">newNode</text>
              <rect x="220" y="40" width="60" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="250" y="65" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <text x="250" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">node3</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">newNode.prev=node2 · newNode.next=node3 · node2.next=x · node3.prev=x</figcaption>
          </figure>
        </div>

        <!-- 操作示意图：删除 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：删除 node2 —— 改 2 个指针 O(1)</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">删除前</p>
            <svg viewBox="0 0 300 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="del-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
                <marker id="del-p" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" /></marker>
              </defs>
              <line x1="70" y1="52" x2="120" y2="52" stroke="#94a3b8" stroke-width="2" marker-end="url(#del-n)" />
              <line x1="180" y1="52" x2="230" y2="52" stroke="#94a3b8" stroke-width="2" marker-end="url(#del-n)" />
              <line x1="120" y1="74" x2="70" y2="74" stroke="#60a5fa" stroke-width="2" marker-end="url(#del-p)" />
              <line x1="230" y1="74" x2="180" y2="74" stroke="#60a5fa" stroke-width="2" marker-end="url(#del-p)" />
              <rect x="10" y="40" width="60" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="40" y="65" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <text x="40" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">node1</text>
              <rect x="120" y="40" width="60" height="50" rx="6" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
              <text x="150" y="65" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <text x="150" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#dc2626">node2</text>
              <rect x="230" y="40" width="60" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="260" y="65" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <text x="260" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">node3</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">删除后（node2 已摘除）</p>
            <svg viewBox="0 0 300 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="del2-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
                <marker id="del2-p" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" /></marker>
              </defs>
              <line x1="70" y1="52" x2="230" y2="52" stroke="#94a3b8" stroke-width="2" marker-end="url(#del2-n)" />
              <line x1="230" y1="74" x2="70" y2="74" stroke="#60a5fa" stroke-width="2" marker-end="url(#del2-p)" />
              <rect x="10" y="40" width="60" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="40" y="65" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <text x="40" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">node1</text>
              <rect x="230" y="40" width="60" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="260" y="65" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <text x="260" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">node3</text>
              <rect x="120" y="40" width="60" height="50" rx="6" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="150" y="65" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" fill="#ef4444">2</text>
              <text x="150" y="100" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#ef4444">(GC)</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">node1.next=node3 · node3.prev=node1，node2 指针置空后被 GC 回收</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 为什么需要双向链表 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要双向链表？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          单向链表只有 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">next</code>，只能往前走。双向链表新增了 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">prev</code> 指针，
          让每个节点<strong>同时知道前驱和后继</strong>，从而实现了前后双向遍历。虽然多占了一个指针的内存（64 位系统 8 字节），但换来了巨大的灵活性。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">单链表节点</h4>
            <div class="font-mono text-xs bg-white border border-slate-300 rounded p-2 text-center">
              [prev=无 | data | next=→]
            </div>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">双链表节点</h4>
            <div class="font-mono text-xs bg-white border border-slate-300 rounded p-2 text-center">
              [prev=← | data | next=→]
            </div>
          </div>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          双向链表就像<strong>浏览器的前进/后退历史</strong>——每个页面同时记住"上一页"和"下一页"。<br/>
          单向链表 = 只有"前进"按钮；双向链表 = 前进 + 后退按钮都有。<br/>
          JS 的 WeakMap 也是理解链表"指针"概念的好桥梁：WeakMap 中的 key 像指针一样指向对象，当对象没其他引用时自动被回收——
          正如链表中节点被"断开"后自动 GC。
          </p>
        </aside>
      </section>

      <!-- 2. DoublyListNode 定义 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          DoublyListNode 定义与基本操作
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          双向链表节点多了 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">prev: DoublyListNode | null</code>。<strong>head 的 prev 和 tail 的 next 都是 null。</strong>
        </p>

        <div class="mb-4">
          <Code language="ts" :code="codeNode" title="DoublyListNode.ts" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">双向遍历</h3>
        <div class="mb-4">
          <Code language="ts" :code="codeTraverse" title="traverse.ts" />
        </div>
      </section>

      <!-- 3. 插入与删除 O(1) -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          插入与删除 —— 真正的 O(1)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          双向链表的杀手锏：<strong>给定任一节点的引用，可以在 O(1) 时间内在它前面插入或在它后面插入，也可以 O(1) 删除自身。</strong>
          单向链表删除需要前驱（O(n) 查找），双向链表通过 prev 直接就能找到。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">在节点前后插入 O(1)</h3>
        <div class="mb-4">
          <Code language="ts" :code="codeInsert" title="insertBeforeAfter.ts" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">删除指定节点 O(1)</h3>
        <div class="mb-4">
          <Code language="ts" :code="codeRemove" title="removeNode.ts" />
        </div>

        <div class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：忘记更新相邻节点的指针！</strong><br/>
          插入/删除双向链表节点时，需要改动<strong>4 个指针</strong>（新节点的 prev 和 next + 前驱的 next + 后继的 prev）。少改一个就会产生断链或死循环（如果形成环）。<br/>
          操作顺序建议：<strong>先处理新节点的两个指针，再改前驱的 next，最后改后继的 prev。</strong></p>
        </div>
      </section>

      <!-- 4. 哨兵节点 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          哨兵节点 —— 消除边界判断的利器
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          哨兵节点（Sentinel Node）是不存储实际数据的<strong>虚拟节点</strong>，放在链表的头部和/或尾部。
          有了哨兵节点，就<strong>不再需要判断 head 是否为 null 或操作是否在边界</strong>——因为始终存在前驱和后继。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="codeSentinel" title="sentinel.ts" />
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">
          有了虚拟头尾后，插入和删除代码变得极其简洁：
        </p>
        <div class="mb-4">
          <Code language="ts" :code="codeSentinelOps" title="sentinelOps.ts" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 哨兵的好处：</strong><br/>
          • 不再需要检查 head === null 或 tail === null。<br/>
          • 插入/删除逻辑统一——头、尾、中间都一样。<br/>
          • LRU Cache、Java LinkedList、C++ std::list 都使用了这一模式。<br/>
          • 代价极小：只多了 2 个节点（16 字节 x 2 = 32 字节）。
          </p>
        </aside>
      </section>

      <!-- 5. 循环双向链表 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          循环双向链表
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          循环双向链表中，<strong>head.prev 指向 tail，tail.next 指向 head</strong>，形成一个闭环。这个结构在实现轮询调度（Round-Robin）等场景中非常有用。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="codeCircular" title="circular.ts" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 实际应用：</strong>Node.js 的 timer 队列和 Linux 内核的任务调度都用到了循环双向链表。因为调度器需要不断循环遍历就绪进程——转完一圈继续下一圈。</p>
        </aside>
      </section>

      <!-- 6. 实现一个 Deque -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          实战：用双向链表实现 Deque（双端队列）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Deque 要求<strong>头部和尾部都能 O(1) 插入/删除</strong>。双向链表天然适合。我们用哨兵节点来简化实现。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="codeDeque" title="Deque.ts" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">使用示例</h3>
        <div class="mb-4">
          <Code language="ts" :code="codeDequeUsage" title="dequeUsage.ts" />
        </div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方法</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">复杂度</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">addFirst</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">头部插入</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">addLast</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">尾部插入</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">removeFirst</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">头部删除</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">removeLast</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">尾部删除</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">peekFirst</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">查看头部</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">peekLast</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">查看尾部</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：双向链表的前后指针
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">因为每个节点都有 <strong>prev + next</strong> 两个指针，前插/后插/删除都只需改指针、O(1)。上半部灰箭头 = next，下半部蓝箭头 = prev。</p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ dlNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ dlStatus }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">⏱️ 前插/后插/删除均 O(1)</span>
          <span class="flex items-center gap-1 text-slate-500"><span class="inline-block w-4 h-0 border-t-2 border-slate-400"></span>next</span>
          <span class="flex items-center gap-1 text-slate-500"><span class="inline-block w-4 h-0 border-t-2 border-blue-400"></span>prev</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="dlAddFirst" :disabled="dlBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">头插 O(1)</button>
          <button @mousedown="dlAddLast" :disabled="dlBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">尾插 O(1)</button>
          <button @mousedown="dlInsertBefore" :disabled="dlBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">前插 O(1)</button>
          <button @mousedown="dlRemoveNode" :disabled="dlBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:shadow-sm disabled:opacity-40">删除 O(1)</button>
          <button @mousedown="dlBackward" :disabled="dlBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:shadow-sm disabled:opacity-40">反向遍历</button>
          <button @mousedown="dlReset" :disabled="dlBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="dlBox" class="w-full relative overflow-x-auto" :style="{height:dlH+'px'}">
          <v-stage :config="{width:dlW, height:dlH}">
            <v-layer>
              <v-arrow v-for="(n,i) in dlNodes.slice(0,-1)" :key="'n'+n.id" :config="dlNextArrow(i)" />
              <v-arrow v-for="(n,i) in dlNodes.slice(0,-1)" :key="'p'+n.id" :config="dlPrevArrow(i)" />
              <v-rect v-for="n in dlNodes" :key="n.id" :config="dlR(n)" />
              <v-text v-for="n in dlNodes" :key="'t'+n.id" :config="dlT(n)" />
              <v-text v-if="!dlNodes.length" :config="{x:24,y:dlNY,text:'null',fontSize:16,fill:dlC.muted}" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 7. 总结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          关键点总结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>双向链表节点 = <strong>prev + data + next</strong>，每个节点多占 8 字节（一个指针）。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>给定节点引用时，<strong>前插/后插/删除都是 O(1)</strong>——这是相对于单向链表的质变。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>哨兵节点（虚拟头尾）</strong>消除边界判断，让所有位置的插入/删除逻辑完全统一。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>循环双向链表中 head.prev = tail, tail.next = head。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>插入/删除需要改<strong>4 个指针</strong>，缺一不可。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Java LinkedList、C++ std::list、LRU Cache 底层都是双向链表 + 哨兵节点。</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-1-singly" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：单向链表</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-3-dummy" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：哑节点技巧 →</RouterLink>
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
  { id: "sec-1", name: "为什么需要双向链表" },
  { id: "sec-2", name: "节点定义与遍历" },
  { id: "sec-3", name: "插入与删除 O(1)" },
  { id: "sec-4", name: "哨兵节点" },
  { id: "sec-5", name: "循环双向链表" },
  { id: "sec-6", name: "实战：实现 Deque" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "总结" },
]

// ===== 🎬 双向链表动画 =====
const dlC={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b',text:'#1e293b',muted:'#94a3b8',ghost:'#e2e8f0',blue:'#60a5fa'}
const dlW=ref(700), dlH=ref(230)
const DLW=52, DLH2=34, DLGAP=92, dlNY=105, DLBX=24
interface DN { id:number; val:number; color:string; s:number; x:number }
const dlNodes=reactive<DN[]>([])
const dlBusy=ref(false), dlStatus=ref(''), dlNid=ref(10)
const dlBox=ref<HTMLDivElement>()
const d4=(ms:number)=>new Promise(r=>setTimeout(r,ms))
function dlLayout(){ dlNodes.forEach((n,i)=>{ n.x=DLBX+i*DLGAP }) }
function dlInit(){ dlNodes.length=0; [1,2,3,4].forEach((v,i)=>dlNodes.push({id:i+1,val:v,color:dlC.cyan,s:1,x:0})); dlLayout() }
function dlR(n:any){ const s=n.s??1; return {x:n.x+(DLW*(1-s))/2, y:dlNY+(DLH2*(1-s))/2, width:DLW*s, height:DLH2*s, fill:n.color, cornerRadius:6, stroke:'#64748b', strokeWidth:1.5, shadowColor:'rgba(0,0,0,.1)', shadowBlur:4, shadowOffsetY:2} }
function dlT(n:any){ const s=n.s??1; return {x:n.x+(DLW*(1-s))/2, y:dlNY+(DLH2*(1-s))/2, width:DLW*s, height:DLH2*s, text:String(n.val), fontSize:16, fontFamily:'monospace', fontStyle:'bold', fill:dlC.text, align:'center', verticalAlign:'middle'} }
function dlNextArrow(i:number){ const a=dlNodes[i],b=dlNodes[i+1]; return {points:[a.x+DLW, dlNY-11, b.x, dlNY-11], fill:dlC.muted, stroke:dlC.muted, strokeWidth:2, pointerLength:7, pointerWidth:5} }
function dlPrevArrow(i:number){ const a=dlNodes[i],b=dlNodes[i+1]; return {points:[b.x, dlNY+11, a.x+DLW, dlNY+11], fill:dlC.blue, stroke:dlC.blue, strokeWidth:2, pointerLength:7, pointerWidth:5} }
async function dlAct(msg:string,fn:()=>Promise<void>){ if(dlBusy.value)return; dlBusy.value=true; dlStatus.value=msg; try{await fn()}catch(_){}; await d4(300); dlBusy.value=false; dlStatus.value='' }
function dlAddFirst(){ dlAct('头插  O(1)', async()=>{ const v=~~(Math.random()*90+10); const nb:DN={id:dlNid.value++,val:v,color:dlC.green,s:0,x:0}; dlNodes.unshift(nb); dlLayout(); await d4(60); nb.s=1; dlLayout(); await d4(450); nb.color=dlC.cyan }) }
function dlAddLast(){ dlAct('尾插  O(1)', async()=>{ const v=~~(Math.random()*90+10); const nb:DN={id:dlNid.value++,val:v,color:dlC.green,s:0,x:0}; dlNodes.push(nb); dlLayout(); await d4(60); nb.s=1; dlLayout(); await d4(450); nb.color=dlC.cyan }) }
function dlInsertBefore(){ if(dlNodes.length<2)return; dlAct('前插  O(1) — 靠 prev 直取前驱', async()=>{ const i=Math.max(1,~~(dlNodes.length/2)); const v=~~(Math.random()*90+10); const nb:DN={id:dlNid.value++,val:v,color:dlC.green,s:0,x:0}; dlNodes.splice(i,0,nb); dlLayout(); await d4(60); nb.s=1; dlLayout(); await d4(450); nb.color=dlC.cyan }) }
function dlRemoveNode(){ if(dlNodes.length<2)return; dlAct('删除  O(1) — prev.next = next', async()=>{ const i=~~(dlNodes.length/2); dlNodes[i].color=dlC.red; await d4(400); dlNodes[i].color=dlC.ghost; dlNodes[i].s=0; dlLayout(); await d4(300); dlNodes.splice(i,1); dlLayout() }) }
function dlBackward(){ if(!dlNodes.length)return; dlAct('反向遍历  O(n) — 沿 prev 走', async()=>{ for(let i=dlNodes.length-1;i>=0;i--){ dlNodes.forEach((n,idx)=>n.color=idx===i?dlC.orange:dlC.cyan); await d4(350) } dlNodes.forEach(n=>n.color=dlC.cyan) }) }
function dlReset(){ dlBusy.value=false; dlInit() }
let roDL:ResizeObserver|null=null
onMounted(()=>{ dlInit(); if(dlBox.value){ dlW.value=dlBox.value.clientWidth; roDL=new ResizeObserver(e=>{const w=e[0]?.contentRect.width; if(w&&w>200) dlW.value=Math.max(420,w)}); roDL.observe(dlBox.value) }})
onUnmounted(()=>roDL?.disconnect())

const codeNode = `class DoublyListNode<T> {
  val: T
  prev: DoublyListNode<T> | null
  next: DoublyListNode<T> | null

  constructor(
    val: T,
    prev: DoublyListNode<T> | null = null,
    next: DoublyListNode<T> | null = null
  ) {
    this.val = val
    this.prev = prev
    this.next = next
  }
}

// 创建: null <- 1 <-> 2 <-> 3 -> null
const node3 = new DoublyListNode(3)
const node2 = new DoublyListNode(2, null, node3)
node3.prev = node2
const node1 = new DoublyListNode(1, null, node2)
node2.prev = node1
const head = node1

console.log(head.next!.val)            // 2
console.log(head.next!.prev!.val)      // 1（能走回来！）
console.log(head.next!.next!.prev!.val) // 2`

const codeTraverse = `// 正向遍历（和单链表一样）
function forward(head: DoublyListNode<number> | null): void {
  let curr = head
  while (curr !== null) {
    console.log(curr.val)
    curr = curr.next
  }
}

// 反向遍历（从 tail 出发）
function backward(tail: DoublyListNode<number> | null): void {
  let curr = tail
  while (curr !== null) {
    console.log(curr.val)
    curr = curr.prev  // 沿着 prev 往回走
  }
}

// 查找节点 O(n)
function find(
  head: DoublyListNode<number> | null,
  val: number
): DoublyListNode<number> | null {
  let curr = head
  while (curr !== null) {
    if (curr.val === val) return curr
    curr = curr.next
  }
  return null
}`

const codeInsert = `// 在 node 后面插入 newNode O(1)
function insertAfter(
  node: DoublyListNode<number>,
  newNode: DoublyListNode<number>
): void {
  newNode.prev = node
  newNode.next = node.next

  if (node.next !== null) {
    node.next.prev = newNode   // 后继的 prev 指向新节点
  }
  node.next = newNode          // 前驱的 next 指向新节点
}

// 在 node 前面插入 newNode O(1)
function insertBefore(
  node: DoublyListNode<number>,
  newNode: DoublyListNode<number>
): void {
  newNode.next = node
  newNode.prev = node.prev

  if (node.prev !== null) {
    node.prev.next = newNode   // 前驱的 next 指向新节点
  }
  node.prev = newNode          // 后继的 prev 指向新节点
}

// 注意：以上在首尾操作时需要判空 (node.prev !== null 等)
// 使用哨兵节点后可以去掉所有判空（见下一节）`

const codeRemove = `// 删除 node 自身 O(1) —— 单链表做不到！
function removeNode(node: DoublyListNode<number>): void {
  const prev = node.prev
  const next = node.next

  // 跳过 node
  if (prev !== null) {
    prev.next = next
  }
  if (next !== null) {
    next.prev = prev
  }

  // 清除 node 的指针（帮助 GC）
  node.prev = null
  node.next = null
}

// 对比单链表的删除（同样 O(1) 但需要知道前驱）：
// 单链表: prev.next = node.next（需要先 O(n) 找 prev）
// 双链表: node.prev.next = node.next（直接拿到！）`

const codeSentinel = `// 带哨兵的双向链表
class SentinelLinkedList<T> {
  // 虚拟头尾节点（不存数据）
  private head: DoublyListNode<T>
  private tail: DoublyListNode<T>
  private _size: number = 0

  constructor() {
    // 用占位符值创建哨兵，类型安全由使用者保证
    this.head = new DoublyListNode<T>(null as unknown as T)
    this.tail = new DoublyListNode<T>(null as unknown as T)
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  get size(): number { return this._size }

  get first(): DoublyListNode<T> | null {
    const node = this.head.next
    return node !== this.tail ? node : null
  }

  get last(): DoublyListNode<T> | null {
    const node = this.tail.prev
    return node !== this.head ? node : null
  }
}

// 初始状态:
// head(sentinel) <-> tail(sentinel)
// 插入第一个节点后:
// head(sentinel) <-> node1 <-> tail(sentinel)`

const codeSentinelOps = `// 在链表头部插入 O(1)
addFirst(val: T): void {
  const node = new DoublyListNode(val)
  const next = this.head.next!

  node.prev = this.head
  node.next = next
  this.head.next = node
  next.prev = node

  this._size++
}

// 在链表尾部插入 O(1)
addLast(val: T): void {
  const node = new DoublyListNode(val)
  const prev = this.tail.prev!

  node.next = this.tail
  node.prev = prev
  prev.next = node
  this.tail.prev = node

  this._size++
}

// 删除节点 O(1) —— 不需要任何判空！
remove(node: DoublyListNode<T>): void {
  // 注意：不要删除哨兵节点
  const prev = node.prev!
  const next = node.next!

  prev.next = next
  next.prev = prev

  this._size--
}

// 删除头部 O(1)
removeFirst(): T | null {
  if (this._size === 0) return null
  const node = this.head.next!
  this.remove(node)
  return node.val
}

// 删除尾部 O(1)
removeLast(): T | null {
  if (this._size === 0) return null
  const node = this.tail.prev!
  this.remove(node)
  return node.val
}`

const codeCircular = `// 循环双向链表（无哨兵版本）
class CircularLinkedList<T> {
  head: DoublyListNode<T> | null = null

  append(val: T): void {
    const node = new DoublyListNode(val)
    if (!this.head) {
      this.head = node
      node.next = node   // 自己指向自己
      node.prev = node   // 自己指向自己
    } else {
      const tail = this.head.prev!  // 在循环链表中 head.prev 就是 tail
      node.next = this.head
      node.prev = tail
      tail.next = node
      this.head.prev = node
    }
  }

  traverse(): void {
    if (!this.head) return
    let curr = this.head
    do {
      console.log(curr.val)
      curr = curr.next!
    } while (curr !== this.head)  // 回到起点停止
  }
}

// 结构示意:
// 空: (无)
// 1个: ←→ [1] ←→  (prev和next都指向自己)
// 2个: ←→ [1] ←→ [2] ←→
//      ↑_____________|`

const codeDeque = `class Deque<T> {
  private head: DoublyListNode<T>
  private tail: DoublyListNode<T>
  private _size: number = 0

  constructor() {
    this.head = new DoublyListNode<T>(null as unknown as T)
    this.tail = new DoublyListNode<T>(null as unknown as T)
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  get size(): number { return this._size }

  isEmpty(): boolean { return this._size === 0 }

  // 头部插入 O(1)
  addFirst(val: T): void {
    const node = new DoublyListNode(val)
    const next = this.head.next!
    node.prev = this.head
    node.next = next
    this.head.next = node
    next.prev = node
    this._size++
  }

  // 尾部插入 O(1)
  addLast(val: T): void {
    const node = new DoublyListNode(val)
    const prev = this.tail.prev!
    node.next = this.tail
    node.prev = prev
    prev.next = node
    this.tail.prev = node
    this._size++
  }

  // 头部删除 O(1)
  removeFirst(): T | null {
    if (this.isEmpty()) return null
    const node = this.head.next!
    node.next!.prev = this.head
    this.head.next = node.next
    this._size--
    return node.val
  }

  // 尾部删除 O(1)
  removeLast(): T | null {
    if (this.isEmpty()) return null
    const node = this.tail.prev!
    node.prev!.next = this.tail
    this.tail.prev = node.prev
    this._size--
    return node.val
  }

  // 查看头部 O(1)
  peekFirst(): T | null {
    if (this.isEmpty()) return null
    return this.head.next!.val
  }

  // 查看尾部 O(1)
  peekLast(): T | null {
    if (this.isEmpty()) return null
    return this.tail.prev!.val
  }
}`

const codeDequeUsage = `const deque = new Deque<number>()

deque.addFirst(2)   // [2]
deque.addFirst(1)   // [1, 2]
deque.addLast(3)    // [1, 2, 3]
deque.addLast(4)    // [1, 2, 3, 4]

console.log(deque.peekFirst())  // 1
console.log(deque.peekLast())   // 4

console.log(deque.removeFirst()) // 1 → [2, 3, 4]
console.log(deque.removeLast())  // 4 → [2, 3]

// Deque 的本质 = 栈 + 队列的结合体
// addFirst + removeFirst = 栈 (push/pop)
// addLast + removeFirst  = 队列 (enqueue/dequeue)
// addFirst + removeLast  = 反向队列`
</script>
