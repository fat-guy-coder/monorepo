<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔁 双端队列 (Deque)：两头都能操作</h1>
          <p class="text-sm text-slate-500 mt-1">Stack + Queue = Deque —— 一端进另一端出的灵活结构</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-4-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：双端队列
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>Deque（双端队列）</strong> 两端都能插入和删除：左侧 <strong>front</strong> 支持 <strong>addFirst / removeFirst</strong>，右侧 <strong>rear</strong> 支持 <strong>addLast / removeLast</strong>，全部 O(1)。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="dq0-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              <marker id="dq0-in" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" /></marker>
              <marker id="dq0-out" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" /></marker>
              <marker id="dq0-down" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
            </defs>
            <text x="20" y="26" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">双端队列：两端都能插入 / 删除（front ⇄ rear）</text>
            <text x="20" y="48" font-size="11" font-family="monospace" fill="#94a3b8">绿=插入 · 红=删除 · 灰=数据流动 · 青=数据节点</text>

            <!-- 数据节点 -->
            <rect x="220" y="82" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="248" y="104" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="320" y="82" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="348" y="104" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="420" y="82" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="448" y="104" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>

            <!-- 数据流动 -->
            <line x1="276" y1="104" x2="318" y2="104" stroke="#94a3b8" stroke-width="2" marker-end="url(#dq0-n)" />
            <line x1="376" y1="104" x2="418" y2="104" stroke="#94a3b8" stroke-width="2" marker-end="url(#dq0-n)" />

            <!-- 左侧：头部操作 -->
            <line x1="130" y1="88" x2="216" y2="88" stroke="#4ade80" stroke-width="2" marker-end="url(#dq0-in)" />
            <text x="168" y="70" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#16a34a">addFirst</text>
            <line x1="216" y1="120" x2="130" y2="120" stroke="#ef4444" stroke-width="2" marker-end="url(#dq0-out)" />
            <text x="168" y="138" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ef4444">removeFirst</text>

            <!-- 右侧：尾部操作 -->
            <line x1="480" y1="88" x2="566" y2="88" stroke="#4ade80" stroke-width="2" marker-end="url(#dq0-in)" />
            <text x="528" y="70" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#16a34a">addLast</text>
            <line x1="566" y1="120" x2="480" y2="120" stroke="#ef4444" stroke-width="2" marker-end="url(#dq0-out)" />
            <text x="528" y="138" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ef4444">removeLast</text>

            <!-- front / rear -->
            <line x1="248" y1="128" x2="248" y2="142" stroke="#94a3b8" stroke-width="2" marker-end="url(#dq0-down)" />
            <text x="248" y="158" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">front</text>
            <line x1="448" y1="128" x2="448" y2="142" stroke="#94a3b8" stroke-width="2" marker-end="url(#dq0-down)" />
            <text x="448" y="158" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">rear</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：双端队列结构——front / rear 两端都能插入（绿）和删除（红）</figcaption>
        </figure>

        <!-- 操作示意图：头部 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">头部操作：addFirst（头插）—— O(1)</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">插入前</p>
            <svg viewBox="0 0 340 130" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="dqaf-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <line x1="142" y1="62" x2="148" y2="62" stroke="#94a3b8" stroke-width="2" marker-end="url(#dqaf-n)" />
              <rect x="90" y="44" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="116" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="150" y="44" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="176" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <text x="116" y="116" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#f59e0b">▲ front</text>
              <text x="176" y="116" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#60a5fa">▲ rear</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">front 指向队头 2</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">插入后（新节点 1 放到 front 左侧）</p>
            <svg viewBox="0 0 340 130" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="dqaf2-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <line x1="82" y1="62" x2="88" y2="62" stroke="#94a3b8" stroke-width="2" marker-end="url(#dqaf2-n)" />
              <line x1="142" y1="62" x2="148" y2="62" stroke="#94a3b8" stroke-width="2" marker-end="url(#dqaf2-n)" />
              <rect x="30" y="44" width="52" height="36" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="56" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
              <rect x="90" y="44" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="116" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="150" y="44" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="176" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <text x="56" y="116" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#f59e0b">▲ front</text>
              <text x="176" y="116" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#60a5fa">▲ rear</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">addFirst：新节点 1 成为新的 front；removeFirst 同理（从左侧摘除）</figcaption>
          </figure>
        </div>

        <!-- 操作示意图：尾部 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">尾部操作：removeLast（尾删）—— O(1)</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">删除前</p>
            <svg viewBox="0 0 340 130" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="dqrl-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <line x1="82" y1="62" x2="88" y2="62" stroke="#94a3b8" stroke-width="2" marker-end="url(#dqrl-n)" />
              <line x1="142" y1="62" x2="148" y2="62" stroke="#94a3b8" stroke-width="2" marker-end="url(#dqrl-n)" />
              <rect x="30" y="44" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="56" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="90" y="44" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="116" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="150" y="44" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="176" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <text x="56" y="116" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#f59e0b">▲ front</text>
              <text x="176" y="116" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#60a5fa">▲ rear</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">rear 指向队尾 3</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">删除后（摘除 rear 节点 3）</p>
            <svg viewBox="0 0 340 130" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="dqrl2-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <line x1="82" y1="62" x2="88" y2="62" stroke="#94a3b8" stroke-width="2" marker-end="url(#dqrl2-n)" />
              <rect x="30" y="44" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="56" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="90" y="44" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="116" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="150" y="44" width="52" height="36" rx="6" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="176" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ef4444">3</text>
              <text x="56" y="116" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#f59e0b">▲ front</text>
              <text x="116" y="116" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#60a5fa">▲ rear</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">removeLast：rear 左移指向 2；addLast 同理（追加到右侧）</figcaption>
          </figure>
        </div>
      </section>

      <!-- Section 1: 概述 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          什么是双端队列（Deque）
        </h2>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          双端队列就像<strong>浏览器的历史记录</strong>——前进（forward）和后退（back）就是从两端操作。你按"后退"从队尾取出上一个页面，按"前进"从另一头取出下一个页面。这正是栈（后退）和反向栈（前进）的组合。<br/>
          另一个例子：<strong>Undo/Redo</strong> —— undo 从栈顶弹出，redo 从另一个方向恢复，整体来看就是一个双端队列。
          </p>
        </aside>

        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>Deque</strong>（Double-Ended Queue，发音 "deck"）是一种允许在<strong>两端</strong>进行插入和删除的线性数据结构。它融合了栈（LIFO）和队列（FIFO）的能力：
        </p>

        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>pushFront / pushBack</strong> — 在头部/尾部插入元素</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>popFront / popBack</strong> — 从头部/尾部移除元素</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>peekFront / peekBack</strong> — 查看头部/尾部元素（不删除）</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>isEmpty / size</strong> — 判空和获取大小</span>
          </li>
        </ul>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">操作</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">链表实现</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">数组实现</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">pushFront()</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">头部插入</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">pushBack()</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">尾部插入</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">popFront()</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">头部删除</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">popBack()</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">尾部删除</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">peekFront()</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">查看头部</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">peekBack()</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">查看尾部</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-3 leading-relaxed">
          核心特点：<strong>所有操作都是 O(1)</strong>。Deque 不像普通队列那样只能一头进一头出，它把两端的灵活性发挥到了极致。这使得它成为<strong>滑动窗口</strong>和<strong>单调队列</strong>问题的核心数据结构。
        </p>
      </section>

      <!-- Section 2: 双向链表实现 Deque -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          双向链表实现 Deque（全操作 O(1)）
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          双向链表是 Deque 最天然的实现方式。每个节点有 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">prev</code> 和 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">next</code> 指针，从两端操作都只需修改相邻指针，不需要移动任何元素。配合 <strong>dummy head</strong> 和 <strong>dummy tail</strong> 哨兵节点，代码简洁且无边界判断。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">节点定义 + 完整实现</h3>
        <div class="mb-4">
          <Code language="ts" :code="linkedDequeCode" title="LinkedListDeque.ts" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：哨兵节点模式</strong><br/>
          使用 dummy head 和 dummy tail 两个哨兵，所有操作都不需要判断 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">null</code>。插入时总是把新节点放在两个已有节点之间，逻辑统一。空 deque 时 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">dummyHead.next === dummyTail</code>。
          </p>
        </aside>

        <h3 class="text-base font-semibold text-slate-700 mb-3">链表实现的时间复杂度分析</h3>
        <ul class="space-y-1 text-slate-600 mb-4 text-sm">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>时间复杂度：</strong>所有 8 个操作都是 O(1)，因为链表插入/删除只需要修改指针</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>空间复杂度：</strong>O(n)，每个元素一个节点，比数组实现多消耗指针的存储空间</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>优势：</strong>不需要预分配，不需要扩容，不存在"满"的概念</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>劣势：</strong>内存不连续，缓存不友好；每个节点额外存储两个指针（16 字节开销）</span>
          </li>
        </ul>
      </section>

      <!-- Section 3: 循环数组实现 Deque -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          循环数组实现 Deque（Ring Buffer）
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          用数组实现 Deque 的核心是<strong>循环数组</strong>（环形缓冲区）。用两个指针 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">front</code> 和 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">rear</code> 标记头部和尾部，通过取模运算在数组末尾"绕回"到开头，避免元素移动。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          循环数组就像 <strong>JavaScript 的 Array 作为队列使用</strong> —— 但 JS 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">arr.shift()</code> 是 O(n)（需要移动所有元素），而循环数组通过移动指针实现 O(1)。Node.js 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Buffer</code> 就是一种固定大小的环形缓冲区。<br/>
          另一个前端例子：<strong>requestAnimationFrame 的回调队列</strong>——浏览器内部就是用环形缓冲区来管理帧回调的。
          </p>
        </aside>

        <h3 class="text-base font-semibold text-slate-700 mb-3">完整 TS 实现</h3>
        <div class="mb-4">
          <Code language="ts" :code="arrayDequeCode" title="CircularDeque.ts" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑：空 vs 满的区分</strong><br/>
          当 <code class="bg-amber-100 px-1 rounded text-xs font-mono">front === rear</code> 时，既可能是空也可能是满。常见解决方案：<br/>
          1. <strong>size 计数器</strong>（代码中用的方式）—— 最简单安全<br/>
          2. <strong>预留一个空位</strong>—— 当 <code class="bg-amber-100 px-1 rounded text-xs font-mono">(rear + 1) % capacity === front</code> 时认为满了，牺牲一个格子的空间<br/>
          3. <strong>布尔标志</strong> —— 额外一个 boolean 标记是否为空
          </p>
        </aside>
      </section>

      <!-- Section 4: 滑动窗口最大值 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          经典应用：滑动窗口最大值（LeetCode #239）
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>题目：</strong>给定数组 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">nums</code> 和窗口大小 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">k</code>，返回每个窗口的最大值。
        </p>
        <p class="text-slate-600 mb-4 leading-relaxed">
          暴力法每次扫描窗口需要 O(k)，总共 O(n*k)。使用 <strong>单调递减双端队列</strong> 可以将复杂度降到 O(n)。核心思路：维护一个<strong>从大到小</strong>的 deque，存的是<strong>下标</strong>（不是值），窗口滑动时：
        </p>

        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>移除队头：如果队头下标已滑出窗口范围（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">index &lt;= i - k</code>），弹出</li>
          <li>维护单调性：从队尾开始，如果新来的值 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">nums[i]</code> 大于队尾对应的值，弹出队尾（这些值在之后绝不会成为最大值）</li>
          <li>压入新下标：将 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">i</code> 放入队尾</li>
          <li>输出答案：当 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">i &gt;= k - 1</code> 时，队头就是当前窗口最大值</li>
        </ol>

        <div class="mb-4">
          <Code language="ts" :code="slidingWindowCode" title="slidingWindowMax.ts" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">执行过程演示（nums=[1,3,-1,-3,5,3,6,7], k=3）</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">步骤 i</th>
                <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">nums[i]</th>
                <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">窗口范围</th>
                <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">deque（存下标）</th>
                <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">队头值</th>
                <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">输出</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-3 py-2 border border-slate-200">0</td><td class="px-3 py-2 border border-slate-200">1</td><td class="px-3 py-2 border border-slate-200">[1]</td><td class="px-3 py-2 border border-slate-200">[0]</td><td class="px-3 py-2 border border-slate-200">1</td><td class="px-3 py-2 border border-slate-200">—</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">1</td><td class="px-3 py-2 border border-slate-200">3</td><td class="px-3 py-2 border border-slate-200">[1,3]</td><td class="px-3 py-2 border border-slate-200">[1]（弹出0，因为3>1）</td><td class="px-3 py-2 border border-slate-200">3</td><td class="px-3 py-2 border border-slate-200">—</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">2</td><td class="px-3 py-2 border border-slate-200">-1</td><td class="px-3 py-2 border border-slate-200">[1,3,-1]</td><td class="px-3 py-2 border border-slate-200">[1,2]</td><td class="px-3 py-2 border border-slate-200" style="font-weight:bold;color:#0891b2">3</td><td class="px-3 py-2 border border-slate-200" style="font-weight:bold">3</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">3</td><td class="px-3 py-2 border border-slate-200">-3</td><td class="px-3 py-2 border border-slate-200">[3,-1,-3]</td><td class="px-3 py-2 border border-slate-200">[1,2,3]</td><td class="px-3 py-2 border border-slate-200" style="font-weight:bold;color:#0891b2">3</td><td class="px-3 py-2 border border-slate-200" style="font-weight:bold">3</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">4</td><td class="px-3 py-2 border border-slate-200">5</td><td class="px-3 py-2 border border-slate-200">[-1,-3,5]</td><td class="px-3 py-2 border border-slate-200">[4]（弹出0,1,2,3，5最大）</td><td class="px-3 py-2 border border-slate-200" style="font-weight:bold;color:#0891b2">5</td><td class="px-3 py-2 border border-slate-200" style="font-weight:bold">5</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">5</td><td class="px-3 py-2 border border-slate-200">3</td><td class="px-3 py-2 border border-slate-200">[-3,5,3]</td><td class="px-3 py-2 border border-slate-200">[4,5]</td><td class="px-3 py-2 border border-slate-200" style="font-weight:bold;color:#0891b2">5</td><td class="px-3 py-2 border border-slate-200" style="font-weight:bold">5</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">6</td><td class="px-3 py-2 border border-slate-200">6</td><td class="px-3 py-2 border border-slate-200">[5,3,6]</td><td class="px-3 py-2 border border-slate-200">[6]（弹出4,5，6最大）</td><td class="px-3 py-2 border border-slate-200" style="font-weight:bold;color:#0891b2">6</td><td class="px-3 py-2 border border-slate-200" style="font-weight:bold">6</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">7</td><td class="px-3 py-2 border border-slate-200">7</td><td class="px-3 py-2 border border-slate-200">[3,6,7]</td><td class="px-3 py-2 border border-slate-200">[7]（弹出6，7最大）</td><td class="px-3 py-2 border border-slate-200" style="font-weight:bold;color:#0891b2">7</td><td class="px-3 py-2 border border-slate-200" style="font-weight:bold">7</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 技巧：为什么要存下标而不是值？</strong><br/>
          因为需要判断"元素是否还在窗口内"。如果存值，无法知道这个值对应的位置是否已经滑出窗口。存下标可以通过 <code class="bg-blue-100 px-1 rounded text-xs font-mono">deque[0] &lt;= i - k</code> 精确判断。
          </p>
        </aside>

        <p class="text-slate-600 mb-3 leading-relaxed">
          <strong>复杂度分析：</strong>每个元素最多入队一次、出队一次，所以平摊时间复杂度 <strong>O(n)</strong>。空间复杂度 O(k)（队列中最多存 k 个下标）。
        </p>
      </section>

      <!-- Section 5: 设计循环双端队列 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          设计循环双端队列（LeetCode #641）
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          这是对 Deque 实现能力的直接考察。要求实现一个<strong>固定容量</strong>的循环双端队列，所有操作 O(1)。核心考点就是循环数组 + 取模运算。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="designCircularDequeCode" title="MyCircularDeque.ts" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 易错点汇总：</strong><br/>
          1. <strong>insertFront 时 front 要先减再赋值</strong>，不是先赋值再减<br/>
          2. <strong>deleteLast 后</strong>如果 deque 变空，需要重置 front 和 rear（否则后续 insertFront/insertLast 位置不对）<br/>
          3. <strong>下标计算要加 capacity 再取模</strong>，否则在 JS/TS 中负数取模会得到负数（JS 的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">-1 % 5 = -1</code>，不是 4）
          </p>
        </aside>
      </section>

      <!-- Section 6: Deque vs Stack vs Queue 对比 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          Deque vs Stack vs Queue 全面对比
        </h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Stack（栈）</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Queue（队列）</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Deque（双端队列）</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">操作模式</td>
                <td class="px-4 py-2 border border-slate-200">一端进，同一端出（LIFO）</td>
                <td class="px-4 py-2 border border-slate-200">一端进，另一端出（FIFO）</td>
                <td class="px-4 py-2 border border-slate-200">两端都可进出</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">核心操作</td>
                <td class="px-4 py-2 border border-slate-200">push / pop / peek</td>
                <td class="px-4 py-2 border border-slate-200">enqueue / dequeue</td>
                <td class="px-4 py-2 border border-slate-200">pushFront / pushBack / popFront / popBack</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">典型场景</td>
                <td class="px-4 py-2 border border-slate-200">函数调用、括号匹配、DFS</td>
                <td class="px-4 py-2 border border-slate-200">BFS、任务调度、消息队列</td>
                <td class="px-4 py-2 border border-slate-200">滑动窗口、Undo/Redo、回文检查</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">受限程度</td>
                <td class="px-4 py-2 border border-slate-200">最强（仅一端操作）</td>
                <td class="px-4 py-2 border border-slate-200">较强（固定方向）</td>
                <td class="px-4 py-2 border border-slate-200">最弱（最灵活）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">用 Deque 模拟</td>
                <td class="px-4 py-2 border border-slate-200">pushBack + popBack</td>
                <td class="px-4 py-2 border border-slate-200">pushBack + popFront</td>
                <td class="px-4 py-2 border border-slate-200">本身就是 Deque</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 一句话总结：</strong>Deque 是 Stack 和 Queue 的<strong>超集</strong>。Java 的 <code class="bg-blue-100 px-1 rounded text-xs font-mono">ArrayDeque</code> 官方推荐替代 <code class="bg-blue-100 px-1 rounded text-xs font-mono">Stack</code>（因为 Stack 基于 Vector，有同步开销），也推荐替代 <code class="bg-blue-100 px-1 rounded text-xs font-mono">LinkedList</code> 做 Queue（内存更紧凑、缓存更友好）。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：双端队列操作
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">FIFO 队列：Enqueue 从右入，Dequeue 从左出。双端队列两端都可操作。</p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ q.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ qStatus }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full ml-auto text-slate-500">⏱️ Enq O(1) · Deq O(1)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="qEnqR" :disabled="qBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">Enq →</button>
          <button @mousedown="qDeqL" :disabled="qBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:shadow-sm disabled:opacity-40">← Deq</button>
          <button @mousedown="doQReset" :disabled="qBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="qBox" class="w-full relative" :style="{height:qH+'px'}">
          <v-stage :config="{width:qW, height:qH}">
            <v-layer>
              <v-rect v-for="b in q" :key="b.id" :config="qBar(b)" />
              <v-text v-for="b in q" :key="'t'+b.id" :config="qTxt(b)" />
              <v-text v-if="!q.length" :config="{x:qW/2-60,y:60,text:'队列为空',fontSize:14,fill:qC.muted,align:'center'}" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- Section 8: 小结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          小结与 LeetCode 推荐
        </h2>

        <h3 class="text-base font-semibold text-slate-700 mb-2">核心要点</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>Deque 两端都可 push/pop，所有操作 O(1)，是栈和队列的<strong>超集</strong></span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>双向链表</strong>实现最直观，配合哨兵节点代码简洁无边界判断</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>循环数组</strong>实现内存紧凑、缓存友好，是 Java ArrayDeque 的底层方案</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>滑动窗口最大值是 Deque 的<strong>经典应用</strong>，通过维护单调递减队列达到 O(n)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>Deque 中存<strong>下标</strong>比存值更有用——能同时获取值和位置信息</span>
          </li>
        </ul>

        <h3 class="text-base font-semibold text-slate-700 mb-2">LeetCode 刷题路线</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">题号</th>
                <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">题目</th>
                <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">难度</th>
                <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">知识点</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-3 py-2 border border-slate-200">641</td><td class="px-3 py-2 border border-slate-200">Design Circular Deque</td><td class="px-3 py-2 border border-slate-200">🟡 Medium</td><td class="px-3 py-2 border border-slate-200">Deque 实现（循环数组）</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">239</td><td class="px-3 py-2 border border-slate-200">Sliding Window Maximum</td><td class="px-3 py-2 border border-slate-200">🔴 Hard</td><td class="px-3 py-2 border border-slate-200">单调 Deque</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">1438</td><td class="px-3 py-2 border border-slate-200">Longest Continuous Subarray With Absolute Diff ≤ Limit</td><td class="px-3 py-2 border border-slate-200">🟡 Medium</td><td class="px-3 py-2 border border-slate-200">两个 Deque 维护最大/最小</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">995</td><td class="px-3 py-2 border border-slate-200">Minimum Number of K Consecutive Bit Flips</td><td class="px-3 py-2 border border-slate-200">🔴 Hard</td><td class="px-3 py-2 border border-slate-200">Deque 做延迟标记</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">933</td><td class="px-3 py-2 border border-slate-200">Number of Recent Calls</td><td class="px-3 py-2 border border-slate-200">🟢 Easy</td><td class="px-3 py-2 border border-slate-200">Deque 做滑动窗口</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">1670</td><td class="px-3 py-2 border border-slate-200">Design Front Middle Back Queue</td><td class="px-3 py-2 border border-slate-200">🟡 Medium</td><td class="px-3 py-2 border border-slate-200">双 Deque 实现</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-3-stack/dsa-2-3-3-dfs-stack" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：栈模拟递归与 DFS 迭代实现</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-4-queue/dsa-2-4-2-mono-queue" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：单调队列 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const qC={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b',muted:'#94a3b8',text:'#1e293b'}
const qW=ref(700),qH=ref(200),qId=ref(10)
const qBusy=ref(false),qStatus=ref('')
interface QB { id:number; val:number; color:string; s:number }
const q=reactive<QB[]>([])
const qBox=ref<HTMLDivElement>()
const d6=(ms:number)=>new Promise(r=>setTimeout(r,ms))
function qInit(vals:number[]=[5,3,8]){ q.length=0; vals.forEach((v,i)=>q.push({id:i+1,val:v,color:qC.cyan,s:1})) }
async function qAct(msg:string,fn:()=>Promise<void>){ if(qBusy.value)return;qBusy.value=true;qStatus.value=msg;try{await fn()}catch(_){};await d6(250);qBusy.value=false;qStatus.value='' }
function qBar(b:QB){ const bw=60,bh=36,x=60+q.indexOf(b)*80,y=100; return {x:x+(bw*(1-b.s))/2,y:y+(bh*(1-b.s))/2,width:bw*b.s,height:bh*b.s,fill:b.color,cornerRadius:6,stroke:'#64748b',strokeWidth:1.5,shadowColor:'rgba(0,0,0,.1)',shadowBlur:3} }
function qTxt(b:QB){ const bw=60,bh=36,x=60+q.indexOf(b)*80,y=100; return {x:x+(bw*(1-b.s))/2,y:y+(bh*(1-b.s))/2,width:bw*b.s,height:bh*b.s,text:String(b.val),fontSize:14,fontFamily:'monospace',fontStyle:'bold',fill:qC.text,align:'center',verticalAlign:'middle'} }
function qEnqR(){ qAct('Enqueue  O(1)',async()=>{ const v=~~(Math.random()*90+10); const nb:QB={id:qId.value++,val:v,color:qC.green,s:0}; q.push(nb); await d6(60); nb.s=1; await d6(400); nb.color=qC.cyan })}
function qDeqL(){ if(!q.length)return; qAct('Dequeue  O(1)',async()=>{ q[0].color=qC.red;await d6(400);q[0].s=0;await d6(300);q.shift()})}
function doQReset(){ qBusy.value=false; qInit() }
let roQ:ResizeObserver|null=null
onMounted(()=>{ qInit(); if(qBox.value){ qW.value=qBox.value.clientWidth; roQ=new ResizeObserver(e=>{const w=e[0]?.contentRect.width;if(w&&w>200)qW.value=Math.max(300,w)}); roQ.observe(qBox.value) }})
onUnmounted(()=>roQ?.disconnect())

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "什么是双端队列" },
  { id: "sec-2", name: "链表实现 Deque" },
  { id: "sec-3", name: "循环数组实现 Deque" },
  { id: "sec-4", name: "滑动窗口最大值" },
  { id: "sec-5", name: "设计循环双端队列" },
  { id: "sec-6", name: "Deque vs Stack vs Queue" },
  { id: "sec-viz", name: "🎬 队列动画" },
  { id: "sec-8", name: "小结" },
]

const linkedDequeCode = `// ==========================================
// 双向链表节点
// ==========================================
class DequeNode<T> {
  val: T
  prev: DequeNode<T> | null = null
  next: DequeNode<T> | null = null

  constructor(val: T) {
    this.val = val
  }
}

// ==========================================
// 双向链表 Deque（带哨兵节点）
// ==========================================
class LinkedListDeque<T> {
  private dummyHead: DequeNode<T>
  private dummyTail: DequeNode<T>
  private _size: number = 0

  constructor() {
    // 两个哨兵节点互相连接，形成空 deque
    this.dummyHead = new DequeNode<T>(null as T)
    this.dummyTail = new DequeNode<T>(null as T)
    this.dummyHead.next = this.dummyTail
    this.dummyTail.prev = this.dummyHead
  }

  // ---------- 头部操作 ----------
  pushFront(val: T): void {
    const node = new DequeNode(val)
    const first = this.dummyHead.next!
    // 新节点插入 dummyHead 和 first 之间
    node.prev = this.dummyHead
    node.next = first
    this.dummyHead.next = node
    first.prev = node
    this._size++
  }

  popFront(): T | undefined {
    if (this.isEmpty()) return undefined
    const node = this.dummyHead.next!
    const next = node.next!
    this.dummyHead.next = next
    next.prev = this.dummyHead
    this._size--
    return node.val
  }

  peekFront(): T | undefined {
    return this.isEmpty() ? undefined : this.dummyHead.next!.val
  }

  // ---------- 尾部操作 ----------
  pushBack(val: T): void {
    const node = new DequeNode(val)
    const last = this.dummyTail.prev!
    // 新节点插入 last 和 dummyTail 之间
    node.prev = last
    node.next = this.dummyTail
    last.next = node
    this.dummyTail.prev = node
    this._size++
  }

  popBack(): T | undefined {
    if (this.isEmpty()) return undefined
    const node = this.dummyTail.prev!
    const prev = node.prev!
    prev.next = this.dummyTail
    this.dummyTail.prev = prev
    this._size--
    return node.val
  }

  peekBack(): T | undefined {
    return this.isEmpty() ? undefined : this.dummyTail.prev!.val
  }

  // ---------- 通用操作 ----------
  isEmpty(): boolean {
    return this._size === 0
  }

  get size(): number {
    return this._size
  }
}

// 使用示例
const deque = new LinkedListDeque<number>()
deque.pushBack(1)   // deque: [1]
deque.pushBack(2)   // deque: [1, 2]
deque.pushFront(0)  // deque: [0, 1, 2]
deque.popBack()     // 返回 2, deque: [0, 1]
deque.popFront()    // 返回 0, deque: [1]
// 所有操作 O(1)，哨兵节点让代码零边界判断！`

const arrayDequeCode = `// ==========================================
// 循环数组 Deque（Ring Buffer）
// ==========================================
class CircularArrayDeque<T> {
  private arr: (T | undefined)[]
  private front: number = 0   // 指向队头元素
  private rear: number = 0    // 指向队尾元素的**下一个位置**（插入位置）
  private _size: number = 0
  private capacity: number

  constructor(capacity: number = 16) {
    this.capacity = capacity
    this.arr = new Array(capacity)
  }

  // ---------- 扩容 ----------
  private resize(newCap: number): void {
    const newArr = new Array<T | undefined>(newCap)
    // 按顺序复制：从 front 开始，依次拷贝 size 个元素
    for (let i = 0; i < this._size; i++) {
      newArr[i] = this.arr[(this.front + i) % this.capacity]
    }
    this.arr = newArr
    this.front = 0
    this.rear = this._size         // 元素在 [0, size) 区域
    this.capacity = newCap
  }

  // ---------- 头部操作 ----------
  pushFront(val: T): void {
    if (this._size === this.capacity) {
      this.resize(this.capacity * 2)
    }
    // front 向前移动（JS 负数取模需要加 capacity）
    this.front = (this.front - 1 + this.capacity) % this.capacity
    this.arr[this.front] = val
    this._size++
  }

  popFront(): T | undefined {
    if (this.isEmpty()) return undefined
    const val = this.arr[this.front]
    this.arr[this.front] = undefined  // 帮助 GC
    this.front = (this.front + 1) % this.capacity
    this._size--
    // 缩容：使用率低于 1/4 时
    if (this._size > 0 && this._size === Math.floor(this.capacity / 4)) {
      this.resize(Math.floor(this.capacity / 2))
    }
    return val
  }

  peekFront(): T | undefined {
    return this.isEmpty() ? undefined : this.arr[this.front]
  }

  // ---------- 尾部操作 ----------
  pushBack(val: T): void {
    if (this._size === this.capacity) {
      this.resize(this.capacity * 2)
    }
    this.arr[this.rear] = val
    this.rear = (this.rear + 1) % this.capacity
    this._size++
  }

  popBack(): T | undefined {
    if (this.isEmpty()) return undefined
    // rear 指向下一个空位，所以队尾在 rear - 1
    this.rear = (this.rear - 1 + this.capacity) % this.capacity
    const val = this.arr[this.rear]
    this.arr[this.rear] = undefined
    this._size--
    if (this._size > 0 && this._size === Math.floor(this.capacity / 4)) {
      this.resize(Math.floor(this.capacity / 2))
    }
    return val
  }

  peekBack(): T | undefined {
    if (this.isEmpty()) return undefined
    return this.arr[(this.rear - 1 + this.capacity) % this.capacity]
  }

  // ---------- 通用操作 ----------
  isEmpty(): boolean { return this._size === 0 }
  get size(): number { return this._size }

  // 调试：按顺序返回元素
  toArray(): T[] {
    const result: T[] = []
    for (let i = 0; i < this._size; i++) {
      result.push(this.arr[(this.front + i) % this.capacity]!)
    }
    return result
  }
}

// 使用示例
const cd = new CircularArrayDeque<number>(4)
cd.pushBack(1); cd.pushBack(2); cd.pushFront(0)
// 内存布局: arr=[1, 2, _, 0], front=3, rear=2
console.log(cd.toArray())  // [0, 1, 2]
// 扩容：arr=[0, 1, 2, _, _, _, _, _], front=0, rear=3`

const slidingWindowCode = `// ==========================================
// LeetCode 239: 滑动窗口最大值
// 时间复杂度 O(n)，单调递减 Deque
// ==========================================
function maxSlidingWindow(nums: number[], k: number): number[] {
  const n = nums.length
  if (n === 0 || k === 0) return []

  const result: number[] = new Array(n - k + 1)
  // deque 存的是**下标**，对应的值是**递减**的
  const deque: number[] = []

  for (let i = 0; i < n; i++) {
    // 步骤1: 移除窗口外的元素（队头下标已过期）
    if (deque.length > 0 && deque[0] <= i - k) {
      deque.shift()
    }

    // 步骤2: 维护单调递减——新来的值比队尾大，队尾永无出头之日
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop()
    }

    // 步骤3: 当前元素入队（存下标）
    deque.push(i)

    // 步骤4: 窗口形成后，队头就是当前窗口最大值
    if (i >= k - 1) {
      result[i - k + 1] = nums[deque[0]]
    }
  }

  return result
}

// 测试
maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)
// 输出: [3, 3, 5, 5, 6, 7]

// ==========================================
// 为什么用 shift()？——用数组模拟 Deque
// 生产级优化：用双指针模拟 Deque 的 head/tail，避免 shift O(n)
// ==========================================
function maxSlidingWindowOptimized(nums: number[], k: number): number[] {
  const n = nums.length
  if (n === 0 || k === 0) return []

  const result: number[] = new Array(n - k + 1)
  const deque: number[] = new Array(n)  // 预分配
  let head = 0, tail = 0               // deque 的 [head, tail) 区间

  for (let i = 0; i < n; i++) {
    // 移除过期元素（操作 head，O(1)）
    if (head < tail && deque[head] <= i - k) {
      head++
    }
    // 维护单调递减（操作 tail，O(1)）
    while (head < tail && nums[deque[tail - 1]] < nums[i]) {
      tail--
    }
    deque[tail++] = i
    // 输出
    if (i >= k - 1) {
      result[i - k + 1] = nums[deque[head]]
    }
  }
  return result
}

// 每个元素最多入队一次、出队一次：O(n)
// 对比：暴力法 for 每个窗口 + Math.max → O(n*k)`

const designCircularDequeCode = `// ==========================================
// LeetCode 641: 设计循环双端队列
// 使用 size 计数器区分空/满
// ==========================================
class MyCircularDeque {
  private arr: number[]
  private front: number = 0
  private rear: number = 0
  private _size: number = 0
  private readonly cap: number

  constructor(k: number) {
    this.cap = k
    this.arr = new Array(k)
  }

  // 头部插入：front 前移一位，放入元素
  insertFront(value: number): boolean {
    if (this.isFull()) return false
    this.front = (this.front - 1 + this.cap) % this.cap
    this.arr[this.front] = value
    this._size++
    return true
  }

  // 尾部插入：rear 位置放入，rear 后移
  insertLast(value: number): boolean {
    if (this.isFull()) return false
    this.arr[this.rear] = value
    this.rear = (this.rear + 1) % this.cap
    this._size++
    return true
  }

  // 头部删除：front 后移
  deleteFront(): boolean {
    if (this.isEmpty()) return false
    this.front = (this.front + 1) % this.cap
    this._size--
    return true
  }

  // 尾部删除：rear 前移
  deleteLast(): boolean {
    if (this.isEmpty()) return false
    this.rear = (this.rear - 1 + this.cap) % this.cap
    this._size--
    return true
  }

  getFront(): number {
    return this.isEmpty() ? -1 : this.arr[this.front]
  }

  getRear(): number {
    if (this.isEmpty()) return -1
    return this.arr[(this.rear - 1 + this.cap) % this.cap]
  }

  isEmpty(): boolean { return this._size === 0 }
  isFull(): boolean  { return this._size === this.cap }
  get size(): number { return this._size }
}

// 测试
const dq = new MyCircularDeque(3)
dq.insertLast(1)   // [1]
dq.insertLast(2)   // [1, 2]
dq.insertFront(3)  // [3, 1, 2]
dq.insertFront(4)  // false（满了）
dq.getRear()       // 2
dq.isFull()        // true
dq.deleteLast()    // [3, 1]
dq.insertFront(4)  // [4, 3, 1]
dq.getFront()      // 4

// ==========================================
// 变体：用"预留空位"区分空/满（Java ArrayDeque 的做法）
// front === rear  → 空
// (rear + 1) % cap === front → 满（始终浪费一个位置）
// ==========================================
class MyCircularDequeV2 {
  private arr: number[]
  private front: number = 0
  private rear: number = 0
  private readonly cap: number

  constructor(k: number) {
    this.cap = k + 1  // 多申请一个位置
    this.arr = new Array(this.cap)
  }

  insertFront(value: number): boolean {
    if (this.isFull()) return false
    this.front = (this.front - 1 + this.cap) % this.cap
    this.arr[this.front] = value
    return true
  }

  insertLast(value: number): boolean {
    if (this.isFull()) return false
    this.arr[this.rear] = value
    this.rear = (this.rear + 1) % this.cap
    return true
  }

  deleteFront(): boolean {
    if (this.isEmpty()) return false
    this.front = (this.front + 1) % this.cap
    return true
  }

  deleteLast(): boolean {
    if (this.isEmpty()) return false
    this.rear = (this.rear - 1 + this.cap) % this.cap
    return true
  }

  getFront(): number {
    return this.isEmpty() ? -1 : this.arr[this.front]
  }

  getRear(): number {
    if (this.isEmpty()) return -1
    return this.arr[(this.rear - 1 + this.cap) % this.cap]
  }

  isEmpty(): boolean { return this.front === this.rear }
  isFull(): boolean  { return (this.rear + 1) % this.cap === this.front }
}`
</script>
