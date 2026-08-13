<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔄 循环队列：用数组实现 O(1) 的 FIFO</h1>
          <p class="text-sm text-slate-500 mt-1">环形缓冲区——Kafka/Netty/操作系统的高性能队列</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-4-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：循环队列
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          循环队列用一个<strong>固定大小数组</strong> + <strong>front / rear 两个指针</strong>，指针走到数组末尾后通过 <strong>取模（% capacity）绕回开头</strong>，出队只移动指针、不移动元素，做到 O(1)。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="cq0-wrap" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" /></marker>
            </defs>
            <text x="20" y="24" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">循环队列：环形数组 + front / rear 指针</text>
            <text x="20" y="44" font-size="11" font-family="monospace" fill="#94a3b8">青=已占用 · 虚线=空槽 · 橙=front · 蓝=rear · 虚线弧=取模绕回</text>

            <!-- 取模绕回弧线（rear 从末尾绕回开头） -->
            <path d="M 560 78 C 560 40, 70 40, 70 78" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#cq0-wrap)" />
            <text x="315" y="56" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#f59e0b">取模绕回 (rear+1) % 8</text>

            <!-- 8 个槽位 -->
            <rect x="40" y="86" width="60" height="44" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <rect x="110" y="86" width="60" height="44" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <rect x="180" y="86" width="60" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="210" y="108" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="250" y="86" width="60" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="280" y="108" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <rect x="320" y="86" width="60" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="350" y="108" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="390" y="86" width="60" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="420" y="108" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="460" y="86" width="60" height="44" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <rect x="530" y="86" width="60" height="44" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />

            <!-- 下标 -->
            <text x="70" y="146" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[0]</text>
            <text x="140" y="146" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[1]</text>
            <text x="210" y="146" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[2]</text>
            <text x="280" y="146" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[3]</text>
            <text x="350" y="146" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[4]</text>
            <text x="420" y="146" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[5]</text>
            <text x="490" y="146" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[6]</text>
            <text x="560" y="146" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[7]</text>

            <!-- front / rear -->
            <text x="210" y="172" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#f59e0b">▲ front=2</text>
            <text x="490" y="172" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#60a5fa">▲ rear=6</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：循环队列——front 指向队头 2，rear 指向下一空位 6，指针越过末尾后绕回</figcaption>
        </figure>

        <!-- 操作示意图：rear 绕回 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：rear 越过数组末尾 → 绕回开头（% capacity）</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">写入末尾：rear=7</p>
            <svg viewBox="0 0 340 130" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="cqr-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <rect x="20" y="36" width="36" height="34" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <rect x="60" y="36" width="36" height="34" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <rect x="100" y="36" width="36" height="34" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="118" y="53" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="140" y="36" width="36" height="34" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="158" y="53" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="180" y="36" width="36" height="34" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="198" y="53" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="220" y="36" width="36" height="34" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="238" y="53" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="260" y="36" width="36" height="34" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <rect x="300" y="36" width="36" height="34" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="118" y="100" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#f59e0b">▲ front</text>
              <text x="318" y="100" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#60a5fa">▲ rear</text>
              <text x="318" y="118" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#60a5fa">(空槽 7)</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">rear 指向数组末尾空槽 7，下一步写入</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">写入后：rear 绕回 0</p>
            <svg viewBox="0 0 340 130" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="cqr2-wrap" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" /></marker>
              </defs>
              <path d="M 318 20 C 318 8, 38 8, 38 20" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#cqr2-wrap)" />
              <rect x="20" y="36" width="36" height="34" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <rect x="60" y="36" width="36" height="34" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <rect x="100" y="36" width="36" height="34" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="118" y="53" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="140" y="36" width="36" height="34" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="158" y="53" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="180" y="36" width="36" height="34" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="198" y="53" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="220" y="36" width="36" height="34" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="238" y="53" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="260" y="36" width="36" height="34" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <rect x="300" y="36" width="36" height="34" rx="5" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="318" y="53" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">9</text>
              <text x="118" y="100" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#f59e0b">▲ front</text>
              <text x="38" y="100" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#60a5fa">▲ rear</text>
              <text x="38" y="118" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#60a5fa">(7+1)%8=0</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">写入 9 后 rear=(7+1)%8=0，绕回开头</figcaption>
          </figure>
        </div>
      </section>

      <!-- Section 1: 为什么需要循环队列 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要循环队列
        </h2>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          循环队列就像 <strong>浏览器事件循环中的微任务队列</strong>——当你在一个微任务中又添加新的微任务，它们会追加到环形缓冲区的尾部，在下一次"绕回"时被处理。JS 引擎用固定大小的环形缓冲区来管理这些任务，避免每次创建/销毁数组元素的开销。<br/>
          另一个例子：<strong>requestAnimationFrame 回调队列</strong>——浏览器预先分配固定大小的环形缓冲区，新帧回调从 tail 追加，执行完从 head 移除，永远不需要移动元素。
          </p>
        </aside>

        <h3 class="text-base font-semibold text-slate-700 mb-3">普通数组做队列的问题</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          用普通数组实现队列时，每次 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">dequeue()</code>（出队）都需要：
        </p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>方案A（移动所有元素）：</strong>取出 arr[0]，然后把 arr[1..n] 全部向前移动一位——O(n)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>方案B（移动头指针）：</strong>用一个 head 指针，但数组前面会留下"空洞"，空间越来越大——内存浪费</span>
          </li>
        </ul>

        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>循环队列</strong>解决了这个问题：用一个<strong>固定大小的数组</strong> + 两个指针（front/rear）+ <strong>取模运算</strong>，让指针在数组末尾"绕回"到开头。出队只移动指针，不移动元素——O(1)。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">核心图示</h3>
        <div class="mb-4">
          <Code language="text" :code="circularQueueDiagram" :hiddenToolbar="true" />
        </div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">普通数组队列</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">链表队列</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">循环队列（数组）</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">enqueue</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">dequeue</td>
                <td class="px-4 py-2 border border-slate-200">O(n) ← 痛点</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">O(1) ✓</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">内存连续性</td>
                <td class="px-4 py-2 border border-slate-200">连续</td>
                <td class="px-4 py-2 border border-slate-200">不连续（节点遍布堆）</td>
                <td class="px-4 py-2 border border-slate-200">连续 ✓</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">缓存友好</td>
                <td class="px-4 py-2 border border-slate-200">好</td>
                <td class="px-4 py-2 border border-slate-200">差（指针跳转）</td>
                <td class="px-4 py-2 border border-slate-200">好 ✓</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">容量限制</td>
                <td class="px-4 py-2 border border-slate-200">无（动态扩容）</td>
                <td class="px-4 py-2 border border-slate-200">无（动态分配）</td>
                <td class="px-4 py-2 border border-slate-200"><strong>固定</strong>（或需扩容）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">额外空间</td>
                <td class="px-4 py-2 border border-slate-200">无</td>
                <td class="px-4 py-2 border border-slate-200">每个节点 2 个指针（16B）</td>
                <td class="px-4 py-2 border border-slate-200">无 ✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section 2: 循环队列的基本实现 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          循环队列的基本实现（front/rear + 取模）
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          循环队列的<strong>核心要素</strong>：
        </p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>arr:</strong> 固定大小的底层数组</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>front:</strong> 指向<strong>队头元素</strong>的索引</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>rear:</strong> 指向<strong>下一个可插入位置</strong>的索引（队尾元素是 rear-1）</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>取模运算:</strong> <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">(index) % capacity</code>，让指针绕回</span>
          </li>
        </ul>

        <h3 class="text-base font-semibold text-slate-700 mb-3">基础版本（用 size 区分空/满）</h3>
        <div class="mb-4">
          <Code language="ts" :code="basicCircularQueueCode" title="CircularQueue.ts" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ JS/TS 特有关：负数取模陷阱</strong><br/>
          在 JavaScript 中，<code class="bg-amber-100 px-1 rounded text-xs font-mono">-1 % 5</code> 的结果是 <strong>-1</strong>，不是 4！<br/>
          所以在计算 <code class="bg-amber-100 px-1 rounded text-xs font-mono">(rear - 1)</code> 时必须写成：<br/>
          <code class="bg-amber-100 px-1 rounded text-xs font-mono">(rear - 1 + capacity) % capacity</code><br/>
          这和 Python 的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">-1 % 5 == 4</code> 不同。
          </p>
        </aside>
      </section>

      <!-- Section 3: 空与满的三种区分策略 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          区分空与满的三种策略
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          当 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">front === rear</code> 时，队列到底是空还是满？这是循环队列最经典的实现问题。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="emptyFullStrategiesCode" title="emptyFullStrategies.ts" />
        </div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">策略</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">判断空</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">判断满</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">空间利用率</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">复杂度</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">1. size 计数器</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">size === 0</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">size === capacity</td>
                <td class="px-4 py-2 border border-slate-200">100%</td>
                <td class="px-4 py-2 border border-slate-200">最简单，推荐教学使用</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">2. 浪费一个位置</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">front === rear</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">(rear+1) % cap === front</td>
                <td class="px-4 py-2 border border-slate-200">(n-1)/n</td>
                <td class="px-4 py-2 border border-slate-200">Java ArrayDeque 的做法</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">3. 布尔标志</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">isEmpty === true</td>
                <td class="px-4 py-2 border border-slate-200 font-mono text-xs">isFull === true</td>
                <td class="px-4 py-2 border border-slate-200">100%</td>
                <td class="px-4 py-2 border border-slate-200">简练但不常见</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 选哪个？</strong><br/>
          <strong>LeetCode 题目</strong>（#622 循环队列、#641 循环双端队列）通常要求用 size 计数器——最简单直观，不会有"浪费一个位置"的容量损失困惑。<br/>
          <strong>生产环境</strong>（如 Java ArrayDeque、Kafka RecordAccumulator）倾向选择"浪费一个位置"——无需维护额外的 size 变量，全部通过指针运算判断，性能最优。
          </p>
        </aside>
      </section>

      <!-- Section 4: 设计循环队列 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          设计循环队列（LeetCode #622）
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          LeetCode #622 是循环队列的<strong>标准实现题</strong>。要求实现固定大小 k 的循环队列，支持 enQueue、deQueue、Front、Rear、isEmpty、isFull 六个操作，全部 O(1)。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="designCircularQueueCode" title="MyCircularQueue.ts" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ LeetCode 通过检查清单：</strong><br/>
          1. enQueue 时：判满（size === k）<br/>
          2. deQueue 时：判空（size === 0），front 前移<br/>
          3. Front/Rear 时：判空，返回 -1<br/>
          4. Rear 位置 = (rear - 1 + k) % k（注意 JS 负数取模）<br/>
          5. 所有指针移动都取模
          </p>
        </aside>
      </section>

      <!-- Section 5: 真实世界的循环队列应用 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          真实世界：高性能系统中的循环队列
        </h2>

        <h3 class="text-base font-semibold text-slate-700 mb-3">1. Kafka Producer 的 RecordAccumulator</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          Kafka 的生产者在发送消息前，将消息批量存入 <strong>RecordAccumulator</strong>。每个分区的消息批次（ProducerBatch）存储在一个 <strong>双端队列（ArrayDeque）</strong> 中，底层就是循环数组。当 batch 满了或时间到了，就从队头取出整批发送。
        </p>
        <div class="mb-4">
          <Code language="ts" :code="kafkaLikeCode" title="kafkaProducerBuffer.ts" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">2. Netty 的 ByteBuf（池化缓冲区）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          Netty 的 <strong>PooledByteBufAllocator</strong> 使用环形缓冲区管理内存块。每个线程持有一个 ThreadLocal 的环形队列，分配和释放内存块都在 O(1) 时间内完成，避免了锁竞争。底层用数组 + 指针 + 原子操作（CAS）实现无锁环形队列。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">3. LMAX Disruptor —— 终极环形队列</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          <strong>LMAX Disruptor</strong> 是一个超高性能的线程间消息传递库，核心就是一个<strong>预分配大小的环形缓冲区（RingBuffer）</strong>。它的设计理念：
        </p>
        <ul class="space-y-1 text-slate-600 mb-4 text-sm">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>预分配：</strong>环形数组在启动时就分配好，运行时零 GC</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>Sequence：</strong>使用递增的序列号（取模定位）替代指针，天然支持多生产者</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>缓存行填充：</strong>Sequence 前后填充 64 字节，避免伪共享（False Sharing）</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>性能：</strong>单线程可达每秒 600 万+ 的吞吐量</span>
          </li>
        </ul>

        <div class="mb-4">
          <Code language="ts" :code="ringBufferCode" title="RingBuffer.ts" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">4. 音视频流缓冲</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          音视频播放器的缓冲区（如 Web Audio API 的 AudioBuffer）本质就是环形缓冲区。生产者（解码线程）向 buffer 尾部写入 PCM 数据，消费者（音频硬件）从头部读取。因为是实时流，buffer 满了生产者需要等待（背压），buffer 空了消费者会听到卡顿（underflow）。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">5. 操作系统内核的 kfifo</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          Linux 内核的 <strong>kfifo</strong> 是一个通用的环形缓冲区实现，广泛应用于内核各子系统中：网络数据包队列、磁盘 IO 请求队列、进程间通信（pipe 的缓冲区）等。它用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">unsigned int</code> 的<strong>自然溢出</strong>特性替代取模运算——因为 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">unsigned int</code> 溢出后自动归零，天然取模。
        </p>
      </section>

      <!-- Section 6: 常见陷阱与最佳实践 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          常见陷阱与最佳实践
        </h2>

        <div class="space-y-5">
          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">1. 忘记"绕回"——dequeue 后不移动 front</h3>
            <p class="text-slate-600 mb-2 leading-relaxed">初学者常在 dequeue 时把 arr[0] 之后所有元素左移——这是 O(n)。正确做法是只移动 front 指针。</p>
            <div class="mb-3">
              <Code language="ts" :code="trap1Code" title="trap1.ts" />
            </div>
          </div>

          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">2. JS 负数取模——最隐蔽的坑</h3>
            <p class="text-slate-600 mb-2 leading-relaxed">计算 rear - 1 时需要考虑 rear === 0 的情况。JS 中 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">-1 % 5 === -1</code>。</p>
            <div class="mb-3">
              <Code language="ts" :code="trap2Code" title="trap2.ts" />
            </div>
          </div>

          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">3. 在多线程/异步环境下忘记同步</h3>
            <p class="text-slate-600 mb-2 leading-relaxed">JS 单线程，但在其他语言中环形缓冲区常被多线程使用。生产者和消费者同时修改 front/rear 会导致数据竞争。解决方案：CAS（Lock-Free）、互斥锁、或 Disruptor 的 Sequence 机制。</p>
          </div>

          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">4. 扩容时机与复制顺序</h3>
            <p class="text-slate-600 mb-2 leading-relaxed">循环队列扩容时，必须从 front 开始顺序拷贝到新数组，否则元素顺序会乱。扩容后有 front=0, rear=size。</p>
          </div>

          <div>
            <h3 class="text-base font-semibold text-slate-700 mb-2">5. 容量选择——2 的幂</h3>
            <p class="text-slate-600 mb-2 leading-relaxed">将容量设为 2 的幂（如 16, 32, 64），取模操作可以优化为<strong>位运算</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">index & (capacity - 1)</code> 比 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">index % capacity</code> 更快。Disruptor、Netty 都用了这个优化。</p>
          </div>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mt-4">
          <p class="text-sm text-emerald-800"><strong>✅ 生产线最佳实践：</strong><br/>
          1. <strong>固定容量</strong>优先——预分配避免 GC，很多场景（如网络缓冲）天然有上限<br/>
          2. 容量用 <strong>2 的幂</strong>——取模变位运算，性能优化<br/>
          3. 区分<strong>有界</strong>和<strong>无界</strong>——有界队列满了要么阻塞、要么丢弃（背压策略）<br/>
          4. 考虑<strong>内存屏障</strong>——多线程环境下 front/rear 需要用 volatile 或原子变量
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：循环队列的 front/rear 指针
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">容量 6。<strong>入队写入 rear 位置，出队从 front 移除</strong>，指针移动后 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">% 6</code> 绕回。F=front（橙），R=rear（蓝）。</p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 size: {{ cqSize }} / {{ cqCap }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🚪 front={{ cqFront }} · rear={{ cqRear }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ cqStatus }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="cqEnqueue" :disabled="cqBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">入队 Enqueue</button>
          <button @mousedown="cqDequeue" :disabled="cqBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:shadow-sm disabled:opacity-40">出队 Dequeue</button>
          <button @mousedown="cqReset" :disabled="cqBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="cqBox" class="w-full relative overflow-x-auto" :style="{height:cqH+'px'}">
          <v-stage :config="{width:cqW, height:cqH}">
            <v-layer>
              <v-rect v-for="(v,i) in cqArr" :key="'c'+i" :config="cqCellRect(i)" />
              <v-text v-for="(v,i) in cqArr" :key="'ct'+i" :config="cqCellText(i)" />
              <v-text v-for="(v,i) in cqArr" :key="'ci'+i" :config="cqCellIdx(i)" />
              <v-text :config="cqFrontLabel()" />
              <v-text :config="cqRearLabel()" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- Section 7: 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          小结与 LeetCode 刷题推荐
        </h2>

        <h3 class="text-base font-semibold text-slate-700 mb-2">核心要点</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>循环队列通过 <strong>front/rear 指针 + 取模运算</strong>，让数组可以"绕回"复用空间</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>相比普通数组队列，<strong>dequeue 从 O(n) 降到 O(1)</strong>——只移动指针，不移动元素</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>相比链表队列，<strong>内存连续、缓存友好</strong>——没有指针跳转的开销</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>空/满区分</strong>是核心设计决策：size 计数器（简单）、浪费一个位置（高效）、布尔标志（简练）</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>真实应用</strong>遍布现代计算机系统：Kafka、Netty、Disruptor、Linux kfifo、音视频缓冲</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>JS/TS 中注意<strong>负数取模</strong>——必须用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">(index + capacity) % capacity</code></span>
          </li>
        </ul>

        <h3 class="text-base font-semibold text-slate-700 mb-2">LeetCode 刷题路线</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">顺序</th>
                <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">题号</th>
                <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">题目</th>
                <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">难度</th>
                <th class="px-3 py-2 border border-slate-200 font-semibold text-slate-700">考点</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-3 py-2 border border-slate-200">1</td><td class="px-3 py-2 border border-slate-200">622</td><td class="px-3 py-2 border border-slate-200">Design Circular Queue</td><td class="px-3 py-2 border border-slate-200">🟡 Medium</td><td class="px-3 py-2 border border-slate-200">循环队列入门，全部 O(1)</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">2</td><td class="px-3 py-2 border border-slate-200">641</td><td class="px-3 py-2 border border-slate-200">Design Circular Deque</td><td class="px-3 py-2 border border-slate-200">🟡 Medium</td><td class="px-3 py-2 border border-slate-200">双向操作 + 循环数组</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">3</td><td class="px-3 py-2 border border-slate-200">239</td><td class="px-3 py-2 border border-slate-200">Sliding Window Maximum</td><td class="px-3 py-2 border border-slate-200">🔴 Hard</td><td class="px-3 py-2 border border-slate-200">单调 Deque（循环数组版）</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">4</td><td class="px-3 py-2 border border-slate-200">1670</td><td class="px-3 py-2 border border-slate-200">Design Front Middle Back Queue</td><td class="px-3 py-2 border border-slate-200">🟡 Medium</td><td class="px-3 py-2 border border-slate-200">双 Deque 组合</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">5</td><td class="px-3 py-2 border border-slate-200">933</td><td class="px-3 py-2 border border-slate-200">Number of Recent Calls</td><td class="px-3 py-2 border border-slate-200">🟢 Easy</td><td class="px-3 py-2 border border-slate-200">队列做时间窗口</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">6</td><td class="px-3 py-2 border border-slate-200">353</td><td class="px-3 py-2 border border-slate-200">Design Snake Game</td><td class="px-3 py-2 border border-slate-200">🟡 Medium</td><td class="px-3 py-2 border border-slate-200">Deque 作为贪吃蛇身体</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-2">队列专题三篇文档关系</h3>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>Deque（2-4-1）：</strong>基础数据结构，双端都可操作。掌握链表和数组两种实现，会做滑动窗口</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>单调队列（2-4-2）：</strong>Deque 的应用模式。掌握"去过期-弹破坏-入新值-取答案"四步模板</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>循环队列（2-4-3）：</strong>Deque 的工程实现。掌握取模运算、空/满判断、真实系统应用</span>
          </li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-4-queue/dsa-2-4-2-mono-queue" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：单调队列</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-5-skiplist/dsa-2-5-1-principle" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：跳表原理 →</RouterLink>
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
  { id: "sec-1", name: "为什么需要循环队列" },
  { id: "sec-2", name: "基本实现（front/rear+取模）" },
  { id: "sec-3", name: "空与满的三种区分策略" },
  { id: "sec-4", name: "设计循环队列（#622）" },
  { id: "sec-5", name: "真实世界的循环队列" },
  { id: "sec-6", name: "常见陷阱与最佳实践" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结与刷题推荐" },
]

// ===== 🎬 循环队列动画 =====
const cqC={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b',text:'#1e293b',muted:'#94a3b8',ghost:'#e2e8f0',blue:'#60a5fa'}
const cqW=ref(700), cqH=ref(210)
const cqCap=6
const cqArr=reactive<(number|null)[]>([null,null,null,null,null,null])
const cqFront=ref(0), cqRear=ref(0), cqSize=ref(0), cqBusy=ref(false), cqStatus=ref('')
const cqFlash=ref(-1), cqFlashColor=ref(cqC.green)
const cqBox=ref<HTMLDivElement>()
const d8=(ms:number)=>new Promise(r=>setTimeout(r,ms))
function cqCellRect(i:number){ const has=cqArr[i]!==null; const isFlash=i===cqFlash.value; const fill=isFlash?cqFlashColor.value:has?cqC.cyan:cqC.ghost; return {x:40+i*62,y:80,width:54,height:44,fill,cornerRadius:6,stroke:'#94a3b8',strokeWidth:1.5} }
function cqCellText(i:number){ const v=cqArr[i]; return {x:40+i*62,y:80,width:54,height:44,text:v===null?'':String(v),fontSize:16,fontFamily:'monospace',fontStyle:'bold',fill:cqC.text,align:'center',verticalAlign:'middle'} }
function cqCellIdx(i:number){ return {x:40+i*62,y:126,width:54,text:'['+i+']',fontSize:10,fontFamily:'monospace',fill:cqC.muted,align:'center'} }
function cqFrontLabel(){ return {x:40+cqFront.value*62+27,y:156,text:'▲ F',fontSize:12,fontFamily:'monospace',fontStyle:'bold',fill:cqC.orange,align:'center'} }
function cqRearLabel(){ return {x:40+cqRear.value*62+27,y:178,text:'▲ R',fontSize:12,fontFamily:'monospace',fontStyle:'bold',fill:cqC.blue,align:'center'} }
async function cqEnqueue(){
  if(cqBusy.value)return
  if(cqSize.value>=cqCap){ cqStatus.value='⚠️ 队列已满'; return }
  cqBusy.value=true
  const v=~~(Math.random()*90+10)
  const oldRear=cqRear.value
  cqStatus.value=`入队 ${v} → 写入 rear=${oldRear}`
  cqFlash.value=oldRear; cqFlashColor.value=cqC.green
  cqArr[oldRear]=v; await d8(400)
  cqFlash.value=-1
  cqRear.value=(oldRear+1)%cqCap; cqSize.value++
  cqStatus.value=cqRear.value<oldRear?`rear 从 ${oldRear} 绕回 ${cqRear.value} (%${cqCap})`:`rear 后移 → ${cqRear.value}`
  await d8(400)
  cqBusy.value=false
}
async function cqDequeue(){
  if(cqBusy.value)return
  if(cqSize.value===0){ cqStatus.value='⚠️ 队列已空'; return }
  cqBusy.value=true
  const oldFront=cqFront.value
  cqStatus.value=`出队 → 移除 front=${oldFront} 的值 ${cqArr[oldFront]}`
  cqFlash.value=oldFront; cqFlashColor.value=cqC.red; await d8(400)
  cqArr[oldFront]=null; cqFlash.value=-1
  cqFront.value=(oldFront+1)%cqCap; cqSize.value--
  cqStatus.value=`front 后移 → ${cqFront.value}`
  await d8(400)
  cqBusy.value=false
}
function cqReset(){ cqBusy.value=false; for(let i=0;i<cqCap;i++) cqArr[i]=null; cqFront.value=0; cqRear.value=0; cqSize.value=0; cqStatus.value=''; cqFlash.value=-1 }
let roCQ:ResizeObserver|null=null
onMounted(()=>{ if(cqBox.value){ cqW.value=cqBox.value.clientWidth; roCQ=new ResizeObserver(e=>{const w=e[0]?.contentRect.width; if(w&&w>200) cqW.value=Math.max(440,w)}); roCQ.observe(cqBox.value) }})
onUnmounted(()=>roCQ?.disconnect())

const circularQueueDiagram = `   0   1   2   3   4   5   6   7
┌───┬───┬───┬───┬─────┬───┬───┬───┐
│   │   │   │   │     │   │   │   │   容量 = 8
└───┴───┴───┴───┴─────┴───┴───┴───┘
              ▲                   ▲
              │                   │
            front               rear
         (队头元素)         (下一个空位)

     [front, rear) 区间是非空的元素

  当 rear 越过 7 时：
    rear = (rear + 1) % 8 → rear = 0  ← "绕回"`

const basicCircularQueueCode = `// ==========================================
// 循环队列 —— 用 size 区分空/满
// ==========================================
class CircularQueue<T> {
  private arr: (T | undefined)[]
  private front: number = 0
  private rear: number = 0
  private _size: number = 0
  private readonly capacity: number

  constructor(capacity: number) {
    this.capacity = capacity
    this.arr = new Array(capacity)
  }

  // ========== 入队 ==========
  enqueue(val: T): boolean {
    if (this.isFull()) return false
    this.arr[this.rear] = val                    // 放在 rear 位置
    this.rear = (this.rear + 1) % this.capacity   // rear 后移（取模绕回）
    this._size++
    return true
  }

  // ========== 出队 ==========
  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined
    const val = this.arr[this.front]
    this.arr[this.front] = undefined              // 帮助 GC
    this.front = (this.front + 1) % this.capacity // front 后移
    this._size--
    return val
  }

  // ========== 查看队头 ==========
  peek(): T | undefined {
    return this.isEmpty() ? undefined : this.arr[this.front]
  }

  // ========== 查看队尾 ==========
  // rear 指向下一个空位，所以队尾是 rear - 1
  peekRear(): T | undefined {
    if (this.isEmpty()) return undefined
    // JS 负数取模需要 +capacity
    return this.arr[(this.rear - 1 + this.capacity) % this.capacity]
  }

  // ========== 判空 / 判满 ==========
  isEmpty(): boolean { return this._size === 0 }
  isFull(): boolean  { return this._size === this.capacity }
  get size(): number { return this._size }

  // ========== 调试：顺序遍历 ==========
  toArray(): T[] {
    const result: T[] = []
    for (let i = 0; i < this._size; i++) {
      result.push(this.arr[(this.front + i) % this.capacity]!)
    }
    return result
  }
}

// ========== 使用示例 ==========
const cq = new CircularQueue<number>(5)

// 入队 1,2,3
cq.enqueue(1)   // arr=[1,_,_,_,_], front=0, rear=1, size=1
cq.enqueue(2)   // arr=[1,2,_,_,_], front=0, rear=2, size=2
cq.enqueue(3)   // arr=[1,2,3,_,_], front=0, rear=3, size=3
console.log(cq.toArray())  // [1, 2, 3]

// 出队 1
cq.dequeue()    // arr=[_,2,3,_,_], front=1, rear=3, size=2
console.log(cq.toArray())  // [2, 3]

// 入队 4,5,6（让 rear 绕回）
cq.enqueue(4)   // arr=[_,2,3,4,_], front=1, rear=4, size=3
cq.enqueue(5)   // arr=[_,2,3,4,5], front=1, rear=0, size=4 ← rear 绕回
cq.enqueue(6)   // arr=[6,2,3,4,5], front=1, rear=1, size=5 ← 满了！
console.log(cq.toArray())  // [2, 3, 4, 5, 6]
// 注意：toArray 从 front(1) 开始读才得到正确顺序`

const emptyFullStrategiesCode = `// ==========================================
// 策略1: size 计数器（推荐教学用）
// ==========================================
class CQWithSize<T> {
  private _size = 0
  isEmpty() { return this._size === 0 }
  isFull()  { return this._size === this.cap }
}

// ==========================================
// 策略2: 浪费一个位置（推荐生产用）
// capacity 设为 k+1，始终留一个空位
// ==========================================
class CQWithWaste<T> {
  private arr: (T | undefined)[]
  private front = 0
  private rear = 0
  private cap: number  // 实际容量 = k + 1

  constructor(k: number) {
    this.cap = k + 1  // ← 多申请一个
    this.arr = new Array(this.cap)
  }

  enqueue(val: T): boolean {
    if (this.isFull()) return false
    this.arr[this.rear] = val
    this.rear = (this.rear + 1) % this.cap
    return true
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined
    const val = this.arr[this.front]
    this.front = (this.front + 1) % this.cap
    return val
  }

  // 空：front 追上 rear
  isEmpty(): boolean {
    return this.front === this.rear
  }

  // 满：rear 差一步追上 front（中间隔一个空位）
  isFull(): boolean {
    return (this.rear + 1) % this.cap === this.front
  }

  // 注意：有效容量是 k（cal - 1）
  // k=5 时 cap=6，最多存 5 个元素
}

// 图示（k=5, cap=6）：
// 空:  front=0, rear=0
//      [_][_][_][_][_][_]
//       f/r
//
// 满(5个): front=0, rear=5  → (5+1)%6=0 === front ✓
//      [A][B][C][D][E][_]
//       f              r
//
// 满(绕回): front=2, rear=1  → (1+1)%6=2 === front ✓
//      [D][_][A][B][C][E]
//           r  f

// ==========================================
// 策略3: 布尔标志（简洁但不常见）
// ==========================================
class CQWithFlag<T> {
  private isEmptyFlag = true
  private isFullFlag = false

  enqueue(val: T): boolean {
    if (this.isFullFlag) return false
    // ... 插入操作 ...
    this.isEmptyFlag = false
    if (/* 满了 */) this.isFullFlag = true
    return true
  }

  dequeue(): T | undefined {
    if (this.isEmptyFlag) return undefined
    // ... 删除操作 ...
    this.isFullFlag = false
    if (/* 空了 */) this.isEmptyFlag = true
    return undefined
  }

  isEmpty() { return this.isEmptyFlag }
  isFull()  { return this.isFullFlag }
}`

const designCircularQueueCode = `// ==========================================
// LeetCode 622: 设计循环队列
// 实现 MyCircularQueue 类
// ==========================================
class MyCircularQueue {
  private arr: number[]
  private front: number = 0
  private rear: number = 0
  private _size: number = 0
  private readonly k: number

  constructor(k: number) {
    this.k = k
    this.arr = new Array(k)
  }

  // 入队：放在 rear，rear 后移取模
  enQueue(value: number): boolean {
    if (this.isFull()) return false
    this.arr[this.rear] = value
    this.rear = (this.rear + 1) % this.k
    this._size++
    return true
  }

  // 出队：front 后移取模
  deQueue(): boolean {
    if (this.isEmpty()) return false
    this.front = (this.front + 1) % this.k
    this._size--
    return true
  }

  // 队头：arr[front]
  Front(): number {
    return this.isEmpty() ? -1 : this.arr[this.front]
  }

  // 队尾：arr[rear - 1]（注意负数取模）
  Rear(): number {
    if (this.isEmpty()) return -1
    return this.arr[(this.rear - 1 + this.k) % this.k]
  }

  isEmpty(): boolean { return this._size === 0 }
  isFull(): boolean  { return this._size === this.k }
}

// ========== 测试用例 ==========
const myCQ = new MyCircularQueue(3)
console.log(myCQ.enQueue(1))   // true  — [1, _, _]
console.log(myCQ.enQueue(2))   // true  — [1, 2, _]
console.log(myCQ.enQueue(3))   // true  — [1, 2, 3]
console.log(myCQ.enQueue(4))   // false — 满了
console.log(myCQ.Rear())       // 3
console.log(myCQ.isFull())     // true
console.log(myCQ.deQueue())    // true  — [_, 2, 3]
console.log(myCQ.enQueue(4))   // true  — [4, 2, 3]（rear 绕回 0）
console.log(myCQ.Rear())       // 4
console.log(myCQ.Front())      // 2     — front 现在指向 index 1

// ==========================================
// 变体：用"浪费一个位置"法（capacity = k + 1）
// ==========================================
class MyCircularQueueV2 {
  private arr: number[]
  private front: number = 0
  private rear: number = 0
  private readonly cap: number  // k + 1

  constructor(k: number) {
    this.cap = k + 1
    this.arr = new Array(this.cap)
  }

  enQueue(value: number): boolean {
    if (this.isFull()) return false
    this.arr[this.rear] = value
    this.rear = (this.rear + 1) % this.cap
    return true
  }

  deQueue(): boolean {
    if (this.isEmpty()) return false
    this.front = (this.front + 1) % this.cap
    return true
  }

  Front(): number {
    return this.isEmpty() ? -1 : this.arr[this.front]
  }

  Rear(): number {
    if (this.isEmpty()) return -1
    return this.arr[(this.rear - 1 + this.cap) % this.cap]
  }

  isEmpty(): boolean { return this.front === this.rear }
  isFull(): boolean  { return (this.rear + 1) % this.cap === this.front }
}`

const kafkaLikeCode = `// ==========================================
// 模拟 Kafka Producer 的 RecordAccumulator
// 每个分区的消息 batch 存在 Deque 中
// ==========================================
interface ProducerBatch {
  partition: number
  messages: string[]
  size: number           // 当前字节大小
  createdAt: number      // 创建时间戳
}

class RecordAccumulator {
  // 每个分区一个 Deque<ProducerBatch>
  private batches: Map<number, ProducerBatch[]>
  private head: Map<number, number>  // 每个分区的 head 指针
  private tail: Map<number, number>  // 每个分区的 tail 指针

  private readonly batchSize: number       // 批次大小阈值
  private readonly lingerMs: number        // 最大等待时间
  private readonly bufferCapacity: number  // 每个分区最多缓存多少 batch

  constructor(batchSize: number, lingerMs: number, bufferCapacity: number) {
    this.batchSize = batchSize
    this.lingerMs = lingerMs
    this.bufferCapacity = bufferCapacity
    this.batches = new Map()
    this.head = new Map()
    this.tail = new Map()
  }

  // 追加消息到对应分区的当前 batch
  append(partition: number, message: string): boolean {
    // 初始化该分区
    if (!this.batches.has(partition)) {
      this.batches.set(partition, new Array(this.bufferCapacity))
      this.head.set(partition, 0)
      this.tail.set(partition, 0)
    }

    const deque = this.batches.get(partition)!
    const t = this.tail.get(partition)!
    const h = this.head.get(partition)!

    // 环形队列满了 → 要么阻塞等待发送，要么拒绝
    if ((t + 1) % this.bufferCapacity === h) {
      return false  // 缓冲区满，拒绝新消息（背压）
    }

    // 获取队尾的 batch（如果存在且未满，追加）
    const lastIdx = (t - 1 + this.bufferCapacity) % this.bufferCapacity
    const lastBatch = t !== h ? deque[lastIdx] : null

    if (lastBatch && lastBatch.size < this.batchSize) {
      lastBatch.messages.push(message)
      lastBatch.size += message.length
    } else {
      // 创建新 batch
      deque[t] = {
        partition,
        messages: [message],
        size: message.length,
        createdAt: Date.now(),
      }
      this.tail.set(partition, (t + 1) % this.bufferCapacity)
    }
    return true
  }

  // 准备发送：从队头取出就绪的 batch
  readyBatches(partition: number): ProducerBatch[] {
    const deque = this.batches.get(partition)!
    let h = this.head.get(partition)!
    const t = this.tail.get(partition)!
    const now = Date.now()
    const result: ProducerBatch[] = []

    // 收集所有"已满"或"超时"的 batch
    while (h !== t) {
      const batch = deque[h]
      if (batch.size >= this.batchSize || (now - batch.createdAt) >= this.lingerMs) {
        result.push(batch)
        deque[h] = undefined as any
        h = (h + 1) % this.bufferCapacity
      } else {
        break  // 队头 batch 还没就绪，后面的也不急
      }
    }

    this.head.set(partition, h)
    return result
  }
}

// 这就是 Kafka Producer 的核心缓冲区逻辑的简化版！`

const ringBufferCode = `// ==========================================
// Disruptor 风格的环形缓冲区（简化版）
// 预分配 + 原子序列号 = 零 GC 高性能队列
// ==========================================

// 事件槽位
interface EventSlot<T> {
  value: T | null
  sequence: number  // 已发布的最高序列号
}

class RingBuffer<T> {
  private buffer: EventSlot<T>[]
  private readonly mask: number       // capacity - 1（2的幂）
  private cursor: number = -1         // 当前已发布的最大序列号

  constructor(capacity: number) {
    // 确保容量是 2 的幂
    let actualCap = 1
    while (actualCap < capacity) actualCap <<= 1
    this.mask = actualCap - 1
    this.buffer = new Array(actualCap)

    // 预分配所有槽位
    for (let i = 0; i < actualCap; i++) {
      this.buffer[i] = { value: null, sequence: i }
    }
  }

  // 生产者：申请下一个可用的序列号
  next(): number {
    const nextSeq = this.cursor + 1
    // 检查是否追上消费者（简化：假设无限消费）
    // 实际 Disruptor 需要 gatingSequences 追踪消费者进度
    return nextSeq
  }

  // 生产者：在指定位置发布数据
  publish(sequence: number, value: T): void {
    const index = sequence & this.mask  // 等价于 sequence % capacity（位运算更快！）
    this.buffer[index].value = value
    this.buffer[index].sequence = sequence
    this.cursor = sequence
  }

  // 消费者：获取指定位置的数据
  get(sequence: number): T | null {
    const index = sequence & this.mask
    const slot = this.buffer[index]
    if (slot.sequence !== sequence) return null  // 还没发布
    return slot.value
  }

  // 获取容量
  getCapacity(): number {
    return this.buffer.length
  }
}

// ========== 使用示例 ==========
const rb = new RingBuffer<number>(8)  // 实际容量 = 8（2^3）

// 生产者
const seq1 = rb.next(); rb.publish(seq1, 100)
const seq2 = rb.next(); rb.publish(seq2, 200)
const seq3 = rb.next(); rb.publish(seq3, 300)

// 消费者
console.log(rb.get(0))  // 100
console.log(rb.get(1))  // 200
console.log(rb.get(2))  // 300

// 关键优化：index = sequence & mask (位运算替代取模)
// mask = 7 (0b0111)
// sequence=0 → 0 & 7 = 0
// sequence=7 → 7 & 7 = 7
// sequence=8 → 8 & 7 = 0 ← 绕回！
// 只有 capacity 是 2 的幂时才能用这个技巧`

const trap1Code = `// ❌ 错误：dequeue 移动所有元素
class BadQueue<T> {
  private arr: T[] = []
  dequeue(): T | undefined { return this.arr.shift() } // shift 是 O(n)!
}

// ✅ 正确：只移动指针
class GoodQueue<T> {
  private arr: (T | undefined)[] = new Array(10)
  private front = 0
  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined
    const val = this.arr[this.front]
    this.front = (this.front + 1) % this.arr.length // O(1)!
    return val
  }
}`

const trap2Code = `// ❌ JavaScript 的负数取模陷阱
const idx = -1 % 5
console.log(idx)  // -1  ← 不是 4！

// ✅ 正确写法：确保正数
function mod(n: number, m: number): number {
  return ((n % m) + m) % m
}
console.log(mod(-1, 5))  // 4 ✓

// 在循环队列中：
getRear(): T | undefined {
  // ❌ 错误
  // return this.arr[(this.rear - 1) % this.capacity]
  // 当 rear === 0 时就是 -1 % cap = -1（数组越界!）

  // ✅ 正确
  return this.arr[(this.rear - 1 + this.capacity) % this.capacity]
}`
</script>
