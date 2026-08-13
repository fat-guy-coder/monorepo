<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📊 单调队列：滑动窗口的最值守护者</h1>
          <p class="text-sm text-slate-500 mt-1">O(n) 时间维护滑动窗口的最大/最小值</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-4-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：单调队列
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          单调队列是一种特殊的 <strong>双端队列</strong>：元素始终保持 <strong>单调</strong>（递减或递增）。求<strong>滑动窗口最大值</strong>用单调递减队列——<strong>队头（front）是当前窗口最大</strong>，队尾（back）最小。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="mq0-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              <marker id="mq0-down" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
            </defs>
            <text x="20" y="26" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">单调递减队列：队头最大，队尾最小（大 → 小）</text>
            <text x="20" y="48" font-size="11" font-family="monospace" fill="#94a3b8">青=数据节点 · 灰箭头=递减方向 · 队头出答案，队尾维护单调</text>

            <!-- 递减方向标注 -->
            <line x1="250" y1="66" x2="440" y2="66" stroke="#94a3b8" stroke-width="2" marker-end="url(#mq0-n)" />
            <text x="345" y="56" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#94a3b8">递减 →</text>

            <!-- 数据节点（递减） -->
            <rect x="220" y="82" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="248" y="104" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="320" y="82" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="348" y="104" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="420" y="82" width="56" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="448" y="104" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>

            <line x1="276" y1="104" x2="318" y2="104" stroke="#94a3b8" stroke-width="2" marker-end="url(#mq0-n)" />
            <line x1="376" y1="104" x2="418" y2="104" stroke="#94a3b8" stroke-width="2" marker-end="url(#mq0-n)" />

            <!-- front / back -->
            <line x1="248" y1="128" x2="248" y2="142" stroke="#94a3b8" stroke-width="2" marker-end="url(#mq0-down)" />
            <text x="248" y="160" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">front · 最大</text>
            <line x1="448" y1="128" x2="448" y2="142" stroke="#94a3b8" stroke-width="2" marker-end="url(#mq0-down)" />
            <text x="448" y="160" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">back · 最小</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：单调递减队列——队头 5 是当前窗口最大值</figcaption>
        </figure>

        <!-- 操作示意图：滑动窗口四步 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：滑动窗口最大值四步（nums=[1,3,-1,-3,5,3,6,7], k=3，处理 i=4 值 5）</h3>
        <p class="text-slate-500 text-xs mb-3">口诀：<strong>去过期 → 弹破坏 → 入新值 → 取答案</strong>。处理前 deque 存下标 [1,2,3]（值 3,-1,-3）。</p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">① 去过期：队头滑出窗口</p>
            <svg viewBox="0 0 340 130" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="mqs1-out" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" /></marker>
                <marker id="mqs1-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <line x1="56" y1="62" x2="16" y2="62" stroke="#ef4444" stroke-width="2" marker-end="url(#mqs1-out)" />
              <rect x="30" y="44" width="52" height="36" rx="6" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="56" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ef4444">3</text>
              <rect x="130" y="44" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="156" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">-1</text>
              <rect x="190" y="44" width="52" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="216" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">-3</text>
              <line x1="182" y1="62" x2="188" y2="62" stroke="#94a3b8" stroke-width="2" marker-end="url(#mqs1-n)" />
              <text x="156" y="116" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#f59e0b">▲ front</text>
              <text x="216" y="116" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#60a5fa">▲ back</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">队头下标 1 ≤ i-k=1 → 过期弹出，front 右移到 -1</figcaption>
          </figure>

          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">② 弹破坏：队尾弹出 ≤ 新值的</p>
            <svg viewBox="0 0 340 130" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="mqs2-out" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" /></marker>
              </defs>
              <line x1="56" y1="62" x2="16" y2="62" stroke="#ef4444" stroke-width="2" marker-end="url(#mqs2-out)" />
              <line x1="116" y1="62" x2="76" y2="62" stroke="#ef4444" stroke-width="2" marker-end="url(#mqs2-out)" />
              <rect x="30" y="44" width="52" height="36" rx="6" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="56" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ef4444">-3</text>
              <rect x="90" y="44" width="52" height="36" rx="6" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="116" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ef4444">-1</text>
              <rect x="230" y="44" width="52" height="36" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="256" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
              <text x="256" y="116" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#16a34a">新值 5</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">队尾 -3、-1 均 ≤ 5 → 从队尾依次弹出（单调性破坏）</figcaption>
          </figure>

          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">③ 入新值：push 下标 4</p>
            <svg viewBox="0 0 340 130" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="mqs3-in" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" /></marker>
              </defs>
              <line x1="110" y1="62" x2="124" y2="62" stroke="#4ade80" stroke-width="2" marker-end="url(#mqs3-in)" />
              <rect x="130" y="44" width="52" height="36" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="156" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
              <text x="156" y="116" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#16a34a">deque=[4]</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">push 下标 4（值 5），此时 deque 只剩它一个</figcaption>
          </figure>

          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">④ 取答案：队头=窗口最大</p>
            <svg viewBox="0 0 340 130" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="mqs4-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <rect x="110" y="44" width="52" height="36" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2.5" />
              <text x="136" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <text x="136" y="116" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#f59e0b">▲ front</text>
              <line x1="166" y1="62" x2="210" y2="62" stroke="#94a3b8" stroke-width="2" marker-end="url(#mqs4-n)" />
              <rect x="212" y="44" width="52" height="36" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="238" y="62" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <text x="238" y="116" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#16a34a">输出</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">i=4 ≥ k-1=2 → 队头 5 即当前窗口最大，输出 5</figcaption>
          </figure>
        </div>
      </section>

      <!-- Section 1: 单调队列概念 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          什么是单调队列
        </h2>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          单调队列就像 <strong>React 的虚拟 DOM diff 中的"最长递增子序列"</strong>——维护一个有序结构，不满足单调性的元素直接"淘汰"。<br/>
          另一个类比：<strong>浏览器事件循环的微任务队列</strong>——微任务总是按顺序一次性清空，而单调队列维护的是某个方向上的"极值优势"，不是时间顺序。
          </p>
        </aside>

        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>单调队列</strong>（Monotonic Queue）是一种特殊的双端队列，它维护了队列中元素的<strong>单调性</strong>——要么单调递增，要么单调递减。在入队时，会从队尾弹出所有"破坏单调性"的元素，确保队列始终有序。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">两种形式</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>单调递减队列</strong>（队头最大）：用于求<strong>滑动窗口最大值</strong>。入队时，如果新元素大于队尾元素，弹出队尾——因为那些较小的值永远不可能成为窗口最大值</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span><strong>单调递增队列</strong>（队头最小）：用于求<strong>滑动窗口最小值</strong>。入队时，如果新元素小于队尾元素，弹出队尾</span>
          </li>
        </ul>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">单调栈</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">单调队列</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">典型问题</td>
                <td class="px-4 py-2 border border-slate-200">下一个更大元素、接雨水、柱状图</td>
                <td class="px-4 py-2 border border-slate-200">滑动窗口最值</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">操作端点</td>
                <td class="px-4 py-2 border border-slate-200">只在一端进出（LIFO）</td>
                <td class="px-4 py-2 border border-slate-200">两端——头部移除过期元素，尾部维护单调</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">"过期"概念</td>
                <td class="px-4 py-2 border border-slate-200">没有过期——只看值大小</td>
                <td class="px-4 py-2 border border-slate-200"><strong>有</strong>——队头元素可能滑出窗口</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">数据结构</td>
                <td class="px-4 py-2 border border-slate-200">数组（栈）</td>
                <td class="px-4 py-2 border border-slate-200">Deque（双端队列）</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">时间复杂度</td>
                <td class="px-4 py-2 border border-slate-200">O(n)</td>
                <td class="px-4 py-2 border border-slate-200">O(n)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 一句话区分：</strong><br/>
          <strong>单调栈</strong> = "下一个更大元素"问题（全局范围，无窗口）<br/>
          <strong>单调队列</strong> = "滑动窗口的最值"问题（有窗口限制，需要考虑"过期"）<br/>
          单调栈只需要一端操作（栈顶），单调队列需要两端（队头移除过期，队尾维护单调）。
          </p>
        </aside>
      </section>

      <!-- Section 2: 滑动窗口最大值详解 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          滑动窗口最大值 —— 从暴力到单调队列
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>LeetCode #239：</strong>给定数组 nums 和窗口大小 k，返回每个滑动窗口的最大值。这是单调队列的<strong>入门必做题</strong>。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">解法演进</h3>
        <div class="mb-4">
          <Code language="ts" :code="slidingWindowApproachesCode" title="approaches.ts" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">单调队列标准模板</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">这是解决<strong>几乎所有滑动窗口最值问题</strong>的通用模板，请牢记：</p>
        <div class="mb-4">
          <Code language="ts" :code="monoQueueTemplateCode" title="monoQueueTemplate.ts" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 模板记忆口诀："去过期、弹破坏、入新值、取答案"</strong><br/>
          这四步是单调队列问题的<strong>固定流程</strong>，任何相关题目都是这个模式的变体。<br/>
          关键：<strong>存下标</strong>（不是值）——因为需要判断"是否过期"。
          </p>
        </aside>

        <h3 class="text-base font-semibold text-slate-700 mb-3">执行过程可视化</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          以 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3</code> 为例：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-xs border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-2 py-1.5 border border-slate-200 font-semibold text-slate-700">i</th>
                <th class="px-2 py-1.5 border border-slate-200 font-semibold text-slate-700">值</th>
                <th class="px-2 py-1.5 border border-slate-200 font-semibold text-slate-700">操作</th>
                <th class="px-2 py-1.5 border border-slate-200 font-semibold text-slate-700">deque（下标）</th>
                <th class="px-2 py-1.5 border border-slate-200 font-semibold text-slate-700">deque（值）</th>
                <th class="px-2 py-1.5 border border-slate-200 font-semibold text-slate-700">窗口</th>
                <th class="px-2 py-1.5 border border-slate-200 font-semibold text-slate-700">输出</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-2 py-1.5 border border-slate-200">0</td><td class="px-2 py-1.5 border border-slate-200">1</td><td class="px-2 py-1.5 border border-slate-200">入队</td><td class="px-2 py-1.5 border border-slate-200">[0]</td><td class="px-2 py-1.5 border border-slate-200">[1]</td><td class="px-2 py-1.5 border border-slate-200">[1]</td><td class="px-2 py-1.5 border border-slate-200">—</td></tr>
              <tr><td class="px-2 py-1.5 border border-slate-200">1</td><td class="px-2 py-1.5 border border-slate-200">3</td><td class="px-2 py-1.5 border border-slate-200">3>1,弹出0;入队</td><td class="px-2 py-1.5 border border-slate-200">[1]</td><td class="px-2 py-1.5 border border-slate-200">[3]</td><td class="px-2 py-1.5 border border-slate-200">[1,3]</td><td class="px-2 py-1.5 border border-slate-200">—</td></tr>
              <tr><td class="px-2 py-1.5 border border-slate-200">2</td><td class="px-2 py-1.5 border border-slate-200">-1</td><td class="px-2 py-1.5 border border-slate-200">-1&lt;3(队尾),入队</td><td class="px-2 py-1.5 border border-slate-200">[1,2]</td><td class="px-2 py-1.5 border border-slate-200">[3,-1]</td><td class="px-2 py-1.5 border border-slate-200">[1,3,-1]</td><td class="px-2 py-1.5 border border-slate-200 font-bold">3</td></tr>
              <tr><td class="px-2 py-1.5 border border-slate-200">3</td><td class="px-2 py-1.5 border border-slate-200">-3</td><td class="px-2 py-1.5 border border-slate-200">-3&lt;-1,入队</td><td class="px-2 py-1.5 border border-slate-200">[1,2,3]</td><td class="px-2 py-1.5 border border-slate-200">[3,-1,-3]</td><td class="px-2 py-1.5 border border-slate-200">[3,-1,-3]</td><td class="px-2 py-1.5 border border-slate-200 font-bold">3</td></tr>
              <tr><td class="px-2 py-1.5 border border-slate-200">4</td><td class="px-2 py-1.5 border border-slate-200">5</td><td class="px-2 py-1.5 border border-slate-200">5>所有队尾,全弹出;入队</td><td class="px-2 py-1.5 border border-slate-200">[4]</td><td class="px-2 py-1.5 border border-slate-200">[5]</td><td class="px-2 py-1.5 border border-slate-200">[-1,-3,5]</td><td class="px-2 py-1.5 border border-slate-200 font-bold">5</td></tr>
              <tr><td class="px-2 py-1.5 border border-slate-200">5</td><td class="px-2 py-1.5 border border-slate-200">3</td><td class="px-2 py-1.5 border border-slate-200">3&lt;5,入队</td><td class="px-2 py-1.5 border border-slate-200">[4,5]</td><td class="px-2 py-1.5 border border-slate-200">[5,3]</td><td class="px-2 py-1.5 border border-slate-200">[-3,5,3]</td><td class="px-2 py-1.5 border border-slate-200 font-bold">5</td></tr>
              <tr><td class="px-2 py-1.5 border border-slate-200">6</td><td class="px-2 py-1.5 border border-slate-200">6</td><td class="px-2 py-1.5 border border-slate-200">6>5,弹出4;6>3,弹出5;入队</td><td class="px-2 py-1.5 border border-slate-200">[6]</td><td class="px-2 py-1.5 border border-slate-200">[6]</td><td class="px-2 py-1.5 border border-slate-200">[5,3,6]</td><td class="px-2 py-1.5 border border-slate-200 font-bold">6</td></tr>
              <tr><td class="px-2 py-1.5 border border-slate-200">7</td><td class="px-2 py-1.5 border border-slate-200">7</td><td class="px-2 py-1.5 border border-slate-200">7>6,弹出6;入队</td><td class="px-2 py-1.5 border border-slate-200">[7]</td><td class="px-2 py-1.5 border border-slate-200">[7]</td><td class="px-2 py-1.5 border border-slate-200">[3,6,7]</td><td class="px-2 py-1.5 border border-slate-200 font-bold">7</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见坑：为什么要弹出"小于等于"而不是"小于"？</strong><br/>
          如果两个相等的元素，后来者在下标上更靠右，会<strong>更晚过期</strong>。所以前面那个相等的值可以安全淘汰。弹出条件写 <code class="bg-amber-100 px-1 rounded text-xs font-mono">&lt;=</code>（或 <code class="bg-amber-100 px-1 rounded text-xs font-mono">&gt;=</code>）能保证等值元素也"后来居上"。
          </p>
        </aside>
      </section>

      <!-- Section 3: 最短子数组和至少为 K -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          最短子数组和至少为 K（LeetCode #862）
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>题目：</strong>给定数组 nums（含负数）和整数 k，返回和至少为 k 的<strong>最短</strong>非空子数组的长度。如果不存在返回 -1。
        </p>

        <p class="text-slate-600 mb-4 leading-relaxed">
          这道题的难点在于<strong>数组包含负数</strong>，所以不能用滑动窗口（增加右边界不一定增加和）。关键思路：<strong>前缀和 + 单调递增队列</strong>。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">核心思路</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>计算前缀和 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">prefix[i] = nums[0] + ... + nums[i-1]</code></li>
          <li>子数组 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">nums[i..j]</code> 的和 = <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">prefix[j+1] - prefix[i]</code></li>
          <li>问题转化为：找最小的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">j - i</code> 满足 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">prefix[j] - prefix[i] &#62;= k</code>（j > i）</li>
          <li>用<strong>单调递增队列</strong>维护候选的 i（前缀和较小的下标）</li>
        </ol>

        <div class="mb-4">
          <Code language="ts" :code="shortestSubarrayCode" title="shortestSubarray.ts" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么用单调递增队列？</strong><br/>
          对于后面的 j，如果 <code class="bg-blue-100 px-1 rounded text-xs font-mono">prefix[i1] &#60;= prefix[i2]</code> 且 <code class="bg-blue-100 px-1 rounded text-xs font-mono">i1 &#60; i2</code>，那么 <code class="bg-blue-100 px-1 rounded text-xs font-mono">i2</code> 永远不可能比 <code class="bg-blue-100 px-1 rounded text-xs font-mono">i1</code> 更好——i1 前缀和更小意味着更容易满足 ≥k，而且 i1 更左意味着子数组更短。<br/>
          所以维护<strong>单调递增</strong>的队列：队头最小前缀和，可以淘汰那些"既不靠左、前缀和还大"的下标。
          </p>
        </aside>
      </section>

      <!-- Section 4: Jump Game VI -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          Jump Game VI（LeetCode #1696）
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>题目：</strong>从下标 0 开始，每次最多跳 k 步，经过的每个位置得分是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">nums[i]</code>，求到达终点的最大得分。
        </p>

        <p class="text-slate-600 mb-4 leading-relaxed">
          这是 <strong>DP + 单调队列</strong> 的经典组合。定义 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">dp[i]</code> 为到达位置 i 的最大得分。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="jumpGameCode" title="jumpGameVI.ts" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 模式识别：DP + 滑动窗口最值 = 单调队列</strong><br/>
          当你写出 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">dp[i] = nums[i] + max(dp[i-k..i-1])</code> 这样的递推式时，暴力是 O(n*k)，用单调队列维护窗口最大 dp 值可以降到 O(n)。这正是"滑动窗口 DP"的标准套路。
          </p>
        </aside>
      </section>

      <!-- Section 5: Constrained Subsequence Sum -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          带限制的子序列和（LeetCode #1425）
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>题目：</strong>给定数组 nums 和整数 k，选择子序列（不要求连续），要求相邻被选元素的下标差 ≤ k，求最大子序列和。
        </p>

        <p class="text-slate-600 mb-4 leading-relaxed">
          这道题和 Jump Game VI 几乎一样，区别在于<strong>可以跳过某些元素</strong>（子序列可以不连续）。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="constrainedSubsequenceSumCode" title="constrainedSubsequenceSum.ts" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">三题对比</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">题目</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">DP 定义</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">转移范围</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">单调队列存什么</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200">#239 滑动窗口最大值</td>
                <td class="px-4 py-2 border border-slate-200">无 DP</td>
                <td class="px-4 py-2 border border-slate-200">直接维护窗口内最大值</td>
                <td class="px-4 py-2 border border-slate-200">nums 下标</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">#1696 Jump Game VI</td>
                <td class="px-4 py-2 border border-slate-200">dp[i] = 到 i 的最大得分</td>
                <td class="px-4 py-2 border border-slate-200">dp[i-k..i-1]</td>
                <td class="px-4 py-2 border border-slate-200">dp 值对应的下标</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">#1425 受限子序列和</td>
                <td class="px-4 py-2 border border-slate-200">dp[i] = 以 i 结尾的最大和</td>
                <td class="px-4 py-2 border border-slate-200">dp[i-k..i-1]</td>
                <td class="px-4 py-2 border border-slate-200">dp 值对应的下标</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200">#862 最短子数组和≥k</td>
                <td class="px-4 py-2 border border-slate-200">无 DP</td>
                <td class="px-4 py-2 border border-slate-200">前缀和 + 单调递增</td>
                <td class="px-4 py-2 border border-slate-200">前缀和下标</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section 6: 单调队列 vs 单调栈 深度对比 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          单调队列 vs 单调栈 —— 何时用哪个？
        </h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">判别维度</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用单调栈</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用单调队列</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">问题特征</td>
                <td class="px-4 py-2 border border-slate-200">"下一个更大/更小"、"左右边界"</td>
                <td class="px-4 py-2 border border-slate-200">"滑动窗口内的最值"</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">范围限制</td>
                <td class="px-4 py-2 border border-slate-200">无窗口（全局范围）</td>
                <td class="px-4 py-2 border border-slate-200"><strong>有窗口大小限制 k</strong></td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">元素淘汰方向</td>
                <td class="px-4 py-2 border border-slate-200">仅从栈顶淘汰（一端）</td>
                <td class="px-4 py-2 border border-slate-200">队头淘汰过期元素 + 队尾淘汰破坏单调的</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-semibold">典型题目</td>
                <td class="px-4 py-2 border border-slate-200">#496, #503, #739, #84</td>
                <td class="px-4 py-2 border border-slate-200">#239, #862, #1696, #1425, #1438</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mb-4">
          <Code language="ts" :code="monoStackVsQueueCode" title="comparison.ts" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 终极判断法则：</strong><br/>
          看到"滑动窗口"四个字 → 单调队列。<br/>
          看到"下一个更大/更小/更高/更矮" → 单调栈。<br/>
          看到 DP 递推式里有 <code class="bg-blue-100 px-1 rounded text-xs font-mono">max(dp[i-k..i-1])</code> → 单调队列做 DP 优化。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：滑动窗口最大值（单调递减队列）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">nums=[1,3,-1,-3,5,3,6,7], k=3</code>。四步：<strong>去过期 → 弹破坏 → 入新值 → 取答案</strong>。橙=当前入队，青=窗口内，灰=已过期。</p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 窗口 k={{ mqK }} · 进度 {{ mqI }}/{{ mqNums.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ mqStatus }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">📤 结果: [{{ mqOut.join(', ') }}]</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="mqStep" :disabled="mqBusy || mqDone" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40">{{ mqDone ? '✅ 完成' : '▶ 下一步' }}</button>
          <button @mousedown="mqReset" :disabled="mqBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="mqBox" class="w-full relative overflow-x-auto" :style="{height:mqH+'px'}">
          <v-stage :config="{width:mqW, height:mqH}">
            <v-layer>
              <v-text :config="{x:30,y:12,text:'nums（橙=当前 · 青=窗口）',fontSize:11,fontFamily:'monospace',fill:mqC.muted,fontStyle:'bold'}" />
              <v-rect v-for="(v,j) in mqNums" :key="'n'+j" :config="mqNumRect(j)" />
              <v-text v-for="(v,j) in mqNums" :key="'nt'+j" :config="mqNumText(j)" />
              <v-text v-for="(v,j) in mqNums" :key="'ni'+j" :config="mqNumIdx(j)" />
              <v-text :config="{x:30,y:108,text:'单调队列（front→back，存下标）',fontSize:11,fontFamily:'monospace',fill:mqC.muted,fontStyle:'bold'}" />
              <v-rect v-for="(v,pos) in mqDeque" :key="'d'+v" :config="mqDequeRect(v,pos)" />
              <v-text v-for="(v,pos) in mqDeque" :key="'dv'+v" :config="mqDequeVal(v,pos)" />
              <v-text v-for="(v,pos) in mqDeque" :key="'di'+v" :config="mqDequeIdx(v,pos)" />
              <v-text :config="{x:30,y:205,text:'输出（各窗口最大值）',fontSize:11,fontFamily:'monospace',fill:mqC.muted,fontStyle:'bold'}" />
              <v-rect v-for="(v,pos) in mqOut" :key="'o'+pos" :config="mqOutRect(v,pos)" />
              <v-text v-for="(v,pos) in mqOut" :key="'ot'+pos" :config="mqOutText(v,pos)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- Section 7: 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          小结与 LeetCode 刷题路线
        </h2>

        <h3 class="text-base font-semibold text-slate-700 mb-2">核心要点</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>单调队列 = <strong>Deque + 单调性约束</strong>，队头取最值，队尾维护单调</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>四步模板：<strong>去过期 → 弹破坏 → 入新值 → 取答案</strong></span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>存<strong>下标</strong>而非存值——同时获取值和位置，判断是否过期</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>单调栈 = "下一更大"（无窗口），单调队列 = "滑动窗口最值"（有窗口）</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>DP 中的 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">max(dp[i-k..i-1])</code> 模式 → 单调队列 O(n) 优化</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-cyan-500 mt-1">▸</span>
            <span>所有元素最多入队一次、出队一次 → 平摊 O(n)</span>
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
              <tr><td class="px-3 py-2 border border-slate-200">1</td><td class="px-3 py-2 border border-slate-200">239</td><td class="px-3 py-2 border border-slate-200">Sliding Window Maximum</td><td class="px-3 py-2 border border-slate-200">🔴 Hard</td><td class="px-3 py-2 border border-slate-200">单调队列入门</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">2</td><td class="px-3 py-2 border border-slate-200">1438</td><td class="px-3 py-2 border border-slate-200">Longest Subarray With Abs Diff ≤ Limit</td><td class="px-3 py-2 border border-slate-200">🟡 Medium</td><td class="px-3 py-2 border border-slate-200">双单调队列（最大+最小）</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">3</td><td class="px-3 py-2 border border-slate-200">1696</td><td class="px-3 py-2 border border-slate-200">Jump Game VI</td><td class="px-3 py-2 border border-slate-200">🟡 Medium</td><td class="px-3 py-2 border border-slate-200">DP + 单调队列</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">4</td><td class="px-3 py-2 border border-slate-200">1425</td><td class="px-3 py-2 border border-slate-200">Constrained Subsequence Sum</td><td class="px-3 py-2 border border-slate-200">🔴 Hard</td><td class="px-3 py-2 border border-slate-200">DP + 单调队列（变体）</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">5</td><td class="px-3 py-2 border border-slate-200">862</td><td class="px-3 py-2 border border-slate-200">Shortest Subarray with Sum ≥ K</td><td class="px-3 py-2 border border-slate-200">🔴 Hard</td><td class="px-3 py-2 border border-slate-200">前缀和 + 单调队列</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">6</td><td class="px-3 py-2 border border-slate-200">1499</td><td class="px-3 py-2 border border-slate-200">Max Value of Equation</td><td class="px-3 py-2 border border-slate-200">🔴 Hard</td><td class="px-3 py-2 border border-slate-200">yi + yj + |xi - xj| 变形</td></tr>
              <tr><td class="px-3 py-2 border border-slate-200">7</td><td class="px-3 py-2 border border-slate-200">2071</td><td class="px-3 py-2 border border-slate-200">Max Number of Tasks You Can Assign</td><td class="px-3 py-2 border border-slate-200">🔴 Hard</td><td class="px-3 py-2 border border-slate-200">二分 + 单调队列</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-4-queue/dsa-2-4-1-deque" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：双端队列 (Deque)</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-4-queue/dsa-2-4-3-circular" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：循环队列 →</RouterLink>
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
  { id: "sec-1", name: "什么是单调队列" },
  { id: "sec-2", name: "滑动窗口最大值详解" },
  { id: "sec-3", name: "最短子数组和至少为K" },
  { id: "sec-4", name: "Jump Game VI" },
  { id: "sec-5", name: "受限子序列和" },
  { id: "sec-6", name: "单调队列 vs 单调栈" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结与刷题路线" },
]

// ===== 🎬 单调队列动画 =====
const mqC={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b',text:'#1e293b',muted:'#94a3b8',ghost:'#e2e8f0'}
const mqW=ref(700), mqH=ref(270)
const mqNums=[1,3,-1,-3,5,3,6,7]
const mqK=3
const mqDeque=reactive<number[]>([])  // 存下标
const mqOut=reactive<number[]>([])    // 结果
const mqI=ref(0), mqCur=ref(-1), mqDone=ref(false), mqBusy=ref(false), mqStatus=ref('')
const mqBox=ref<HTMLDivElement>()
const d7=(ms:number)=>new Promise(r=>setTimeout(r,ms))
function mqNumRect(j:number){ const i=mqI.value; const isCur=j===mqCur.value; const inWin=j>=i-mqK&&j<i; const fill=isCur?mqC.orange:inWin?mqC.cyan:mqC.ghost; const opacity=(j>=i&&!isCur)?0.35:1; return {x:30+j*62,y:40,width:52,height:36,fill,cornerRadius:6,stroke:isCur?mqC.orange:'#94a3b8',strokeWidth:isCur?2.5:1,opacity} }
function mqNumText(j:number){ const x=30+j*62; return {x,y:40,width:52,height:36,text:String(mqNums[j]),fontSize:16,fontFamily:'monospace',fontStyle:'bold',fill:mqC.text,align:'center',verticalAlign:'middle'} }
function mqNumIdx(j:number){ return {x:30+j*62,y:78,width:52,text:'['+j+']',fontSize:10,fontFamily:'monospace',fill:mqC.muted,align:'center'} }
function mqDequeRect(v:number,pos:number){ const isFront=pos===0; const x=30+pos*62,y=132; return {x,y,width:52,height:36,fill:mqC.cyan,cornerRadius:6,stroke:isFront?mqC.orange:'#64748b',strokeWidth:isFront?2.5:1.5,shadowColor:'rgba(0,0,0,.08)',shadowBlur:2} }
function mqDequeVal(v:number,pos:number){ const x=30+pos*62,y=132; return {x,y,width:52,height:36,text:String(mqNums[v]),fontSize:16,fontFamily:'monospace',fontStyle:'bold',fill:mqC.text,align:'center',verticalAlign:'middle'} }
function mqDequeIdx(v:number,pos:number){ return {x:30+pos*62,y:170,width:52,text:'['+v+']',fontSize:10,fontFamily:'monospace',fill:mqC.muted,align:'center'} }
function mqOutRect(v:number,pos:number){ const x=30+pos*62,y=228; return {x,y,width:52,height:36,fill:mqC.green,cornerRadius:6,stroke:'#64748b',strokeWidth:1,shadowColor:'rgba(0,0,0,.08)',shadowBlur:2} }
function mqOutText(v:number,pos:number){ const x=30+pos*62,y=228; return {x,y,width:52,height:36,text:String(v),fontSize:16,fontFamily:'monospace',fontStyle:'bold',fill:'#fff',align:'center',verticalAlign:'middle'} }
async function mqStep(){
  if(mqBusy.value||mqDone.value)return; mqBusy.value=true
  const i=mqI.value
  if(i>=mqNums.length){ mqDone.value=true; mqStatus.value='✅ 完成'; mqBusy.value=false; return }
  mqCur.value=i
  mqStatus.value=`i=${i} 值=${mqNums[i]}：处理开始`; await d7(250)
  if(mqDeque.length && mqDeque[0] <= i-mqK){ const old=mqDeque.shift()!; mqStatus.value=`去过期：队头 [${old}] 滑出窗口`; await d7(350) }
  while(mqDeque.length && mqNums[mqDeque[mqDeque.length-1]] <= mqNums[i]){ const old=mqDeque.pop()!; mqStatus.value=`弹破坏：队尾值 ${mqNums[old]} ≤ ${mqNums[i]}`; await d7(320) }
  mqDeque.push(i); mqStatus.value=`入新值：[${i}]=${mqNums[i]}`; await d7(320)
  if(i>=mqK-1){ const max=mqNums[mqDeque[0]]; mqOut.push(max); mqStatus.value=`取答案：窗口最大值 = ${max}`; await d7(320) }
  mqI.value++
  mqBusy.value=false
}
function mqReset(){ mqBusy.value=false; mqDeque.length=0; mqOut.length=0; mqI.value=0; mqCur.value=-1; mqDone.value=false; mqStatus.value='' }
let roMQ:ResizeObserver|null=null
onMounted(()=>{ if(mqBox.value){ mqW.value=mqBox.value.clientWidth; roMQ=new ResizeObserver(e=>{const w=e[0]?.contentRect.width; if(w&&w>200) mqW.value=Math.max(520,w)}); roMQ.observe(mqBox.value) }})
onUnmounted(()=>roMQ?.disconnect())

const slidingWindowApproachesCode = `// ==========================================
// 解法1: 暴力法 — O(n*k)
// ==========================================
function maxSlidingWindowBrute(nums: number[], k: number): number[] {
  const n = nums.length
  const result: number[] = []
  for (let i = 0; i <= n - k; i++) {
    let max = -Infinity
    for (let j = i; j < i + k; j++) {
      max = Math.max(max, nums[j])
    }
    result.push(max)
  }
  return result
}

// ==========================================
// 解法2: 大顶堆 — O(n log k)
// 堆中存 [value, index]，惰性删除过期元素
// ==========================================
function maxSlidingWindowHeap(nums: number[], k: number): number[] {
  // 大顶堆：按值降序，值相同按下标降序
  const heap: [number, number][] = [] // [value, index]
  const result: number[] = []

  for (let i = 0; i < nums.length; i++) {
    heap.push([nums[i], i])
    heap.sort((a, b) => b[0] - a[0] || b[1] - a[1]) // 模拟堆

    if (i >= k - 1) {
      // 惰性删除：如果堆顶已过期，弹出
      while (heap[0][1] <= i - k) {
        heap.shift()
      }
      result.push(heap[0][0])
    }
  }
  return result
}

// ==========================================
// 解法3: 单调递减队列 — O(n) ✓ 最优
// ==========================================
function maxSlidingWindowDeque(nums: number[], k: number): number[] {
  const n = nums.length
  const result: number[] = new Array(n - k + 1)
  const deque: number[] = []  // 存下标，对应值递减
  let head = 0, tail = 0      // 双指针模拟出队（避免 shift O(n)）

  for (let i = 0; i < n; i++) {
    // 1. 去过期：队头已滑出窗口
    if (head < tail && deque[head] <= i - k) head++

    // 2. 弹破坏：新值大于队尾，队尾永无用武之地
    while (head < tail && nums[deque[tail - 1]] <= nums[i]) tail--

    // 3. 入新值
    deque[tail++] = i

    // 4. 取答案
    if (i >= k - 1) {
      result[i - k + 1] = nums[deque[head]]
    }
  }
  return result
}`

const monoQueueTemplateCode = `// ==========================================
// 单调队列通用模板（滑动窗口最大值/最小值）
// ==========================================

// --- 求滑动窗口最大值（单调递减） ---
function slidingWindowMax(nums: number[], k: number): number[] {
  const n = nums.length
  const res: number[] = []
  const dq: number[] = []  // Deque 存下标
  let h = 0, t = 0         // head, tail 指针

  for (let i = 0; i < n; i++) {
    // 步骤1: 去掉过期元素（窗口外）
    if (h < t && dq[h] <= i - k) h++

    // 步骤2: 维护单调递减（从队尾弹出小于等于新值的）
    while (h < t && nums[dq[t - 1]] <= nums[i]) t--

    // 步骤3: 入队
    dq[t++] = i

    // 步骤4: 窗口形成，记录答案
    if (i >= k - 1) res.push(nums[dq[h]])
  }
  return res
}

// --- 求滑动窗口最小值（单调递增） ---
function slidingWindowMin(nums: number[], k: number): number[] {
  const n = nums.length
  const res: number[] = []
  const dq: number[] = []
  let h = 0, t = 0

  for (let i = 0; i < n; i++) {
    if (h < t && dq[h] <= i - k) h++
    // 唯一区别：>=
    while (h < t && nums[dq[t - 1]] >= nums[i]) t--
    dq[t++] = i
    if (i >= k - 1) res.push(nums[dq[h]])
  }
  return res
}

// --- DP 优化模板：dp[i] = nums[i] + max(dp[i-k..i-1]) ---
function dpWithMonoQueue(nums: number[], k: number): number {
  const n = nums.length
  const dp: number[] = new Array(n)
  const dq: number[] = []  // 存下标，dp 值递减
  let h = 0, t = 0

  dp[0] = nums[0]
  dq[t++] = 0

  for (let i = 1; i < n; i++) {
    // 去过期
    if (h < t && dq[h] < i - k) h++
    // 队头就是窗口内最大 dp 值
    dp[i] = nums[i] + Math.max(0, dp[dq[h]])
    // 维护单调递减（存 dp 值大的）
    while (h < t && dp[dq[t - 1]] <= dp[i]) t--
    dq[t++] = i
  }
  return Math.max(...dp)
}`

const shortestSubarrayCode = `// ==========================================
// LeetCode 862: 最短子数组和至少为 K
// 前缀和 + 单调递增队列
// ==========================================
function shortestSubarray(nums: number[], k: number): number {
  const n = nums.length

  // prefix[i] = nums[0] + ... + nums[i-1]，prefix[0] = 0
  const prefix: number[] = new Array(n + 1)
  prefix[0] = 0
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + nums[i]
  }

  let result = Infinity
  const dq: number[] = []  // 单调递增队列，存 prefix 的下标
  let h = 0, t = 0

  for (let j = 0; j <= n; j++) {
    // 步骤1: 队头检查——前缀和够大了就记录答案并弹出
    // prefix[j] - prefix[dq[h]] >= k → 这是一个可行解
    while (h < t && prefix[j] - prefix[dq[h]] >= k) {
      result = Math.min(result, j - dq[h])
      h++  // 弹出队头：更短的子数组不会再用到这个起点
    }

    // 步骤2: 维护单调递增——新前缀和 ≤ 队尾的，队尾更没竞争力
    // 因为：队尾下标更左、前缀和更大 →
    //       对于未来的 j，队尾永远不会比新下标更好
    while (h < t && prefix[dq[t - 1]] >= prefix[j]) {
      t--
    }

    // 步骤3: 入队
    dq[t++] = j
  }

  return result === Infinity ? -1 : result
}

// 测试
console.log(shortestSubarray([2, -1, 2], 3))  // 3 — [2,-1,2] 整个数组
console.log(shortestSubarray([1, 2], 4))       // -1 — 不存在
console.log(shortestSubarray([84,-37,32,40,95], 167)) // 3

// ==========================================
// 为什么不能用滑动窗口（双指针）？
// 因为有负数！右指针右移不保证和增加
// 例如：nums=[2, -1, 2], k=3
//   l=0,r=2: sum=3 ≥3, 长度=3 ✓
//   如果左边收缩 l=1,r=2: sum=1 <3
//   不能右移 r 因为已经到末尾
// 双指针失效 → 需要前缀和 + 单调队列
// ==========================================`

const jumpGameCode = `// ==========================================
// LeetCode 1696: Jump Game VI
// dp[i] = nums[i] + max(dp[j])  where max(0, i-k) ≤ j < i
// 暴力 O(n*k) → 单调队列 O(n)
// ==========================================
function maxResult(nums: number[], k: number): number {
  const n = nums.length
  const dp: number[] = new Array(n)
  const dq: number[] = []  // 单调递减队列，存下标（按 dp 值递减）
  let h = 0, t = 0

  dp[0] = nums[0]
  dq[t++] = 0

  for (let i = 1; i < n; i++) {
    // 去过期：超出跳跃范围
    if (h < t && dq[h] < i - k) h++

    // dp[i] = 当前得分 + 窗口内最大 dp 值
    dp[i] = nums[i] + dp[dq[h]]

    // 维护单调递减：新 dp 值 ≥ 队尾的 dp 值 → 弹出队尾
    while (h < t && dp[dq[t - 1]] <= dp[i]) t--

    dq[t++] = i
  }

  return dp[n - 1]
}

// 测试
console.log(maxResult([1, -1, -2, 4, -7, 3], 2))  // 7
// 路径: 1 → -1 → 4 → 3 (跳过 -2 和 -7)
//      0    1    3   5
// 解释: dp = [1, 0, -1, 4, -3, 7]

console.log(maxResult([10, -5, -2, 4, 0, 3], 3))  // 17
// dp = [10, 5, 8, 14, 14, 17]
// 路径: 10 → 4 → 3

// ==========================================
// 执行过程（nums=[1,-1,-2,4,-7,3], k=2）:
// i=0: dq=[0], dp[0]=1
// i=1: dq=[0]未过期, dp[1]=-1+dp[0]=0
//      0≤0 → pop 0, dq变为[1]
// i=2: dq=[1]未过期, dp[2]=-2+dp[1]=-2
//      -2≤0 → 不弹, dq=[1,2]
// i=3: dq[0]=1 未过期(i-k=1, 1≥1 仍在), dp[3]=4+dp[1]=4
//      4>0, 弹出1; 4>-2, 弹出2; dq=[3]
// i=4: dq[0]=3 未过期(3≥2), dp[4]=-7+4=-3
//      -3≤4, dq=[3,4]
// i=5: dq[0]=3 过期了(3<3)? 不, 3>=3 刚好在 !
//      等等 i=5, k=2 → i-k=3, dq[0]=3 刚好在
//      dp[5]=3+4=7 ✓
// ==========================================`

const constrainedSubsequenceSumCode = `// ==========================================
// LeetCode 1425: 带限制的子序列和
// dp[i] = nums[i] + max(0, max(dp[j]))  where i-k ≤ j < i
// 和 Jump Game VI 的区别：可以跳过某些位置（max(0, ...)）
// ==========================================
function constrainedSubsetSum(nums: number[], k: number): number {
  const n = nums.length
  const dp: number[] = new Array(n)
  const dq: number[] = []  // 存下标，dp 值递减
  let h = 0, t = 0
  let result = -Infinity

  for (let i = 0; i < n; i++) {
    // 去过期
    if (h < t && dq[h] < i - k) h++

    // dp[i]：当前值 + (前面最好的 dp 或 0)
    const bestPrev = h < t ? Math.max(0, dp[dq[h]]) : 0
    dp[i] = nums[i] + bestPrev

    result = Math.max(result, dp[i])

    // 维护递减
    while (h < t && dp[dq[t - 1]] <= dp[i]) t--
    dq[t++] = i
  }

  return result
}

// 测试
console.log(constrainedSubsetSum([10, 2, -10, 5, 20], 2))  // 37
// 路径: 10 + 5 + 20 = 35? 不对...
// dp = [10, 12, 2, 17, 37] ✓

console.log(constrainedSubsetSum([-1, -2, -3], 1))  // -1
// dp = [-1, -2, -3]，result = max(-1, -2, -3) = -1

console.log(constrainedSubsetSum([10, -2, -10, -5, 20], 2))  // 23
// dp = [10, 8, 0, 5, 25]? 不对...
// 实际: dp[0]=10, dp[1]=max(-2, -2+10)=8,
//       dp[2]=max(-10, -10+max(10,8))=-10+10=0,
//       dp[3]=max(-5, -5+max(8,0))=-5+8=3,
//       dp[4]=max(20, 20+max(0,3))=23 ✓

// ==========================================
// 与 #1696 Jump Game VI 的关键区别：
// Jump Game VI: 必须连续跳到终点，dp[i]=nums[i]+dp[bestPrev]
// 本题: 可以跳过不选，dp[i]=nums[i]+max(0, dp[bestPrev])
//       这意味着可以从任意位置"重新开始"
// ==========================================`

const monoStackVsQueueCode = `// ==========================================
// 单调栈 vs 单调队列 — 代码层面的一目了然对比
// ==========================================

// --- 单调栈（递减）：下一个更大元素 ---
function nextGreaterElement(nums: number[]): number[] {
  const n = nums.length
  const result = new Array(n).fill(-1)
  const stack: number[] = []  // 存储下标

  for (let i = 0; i < n; i++) {
    // ← 只有一种淘汰：从栈顶弹出比当前小的
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      const idx = stack.pop()!
      result[idx] = nums[i]  // 下一个更大元素
    }
    stack.push(i)
  }
  return result
}

// --- 单调队列（递减）：滑动窗口最大值 ---
function maxSlidingWindow(nums: number[], k: number): number[] {
  const result: number[] = []
  const dq: number[] = []
  let h = 0, t = 0

  for (let i = 0; i < nums.length; i++) {
    // ← 第一种淘汰：队头过期（窗口滑出）
    if (h < t && dq[h] <= i - k) h++
    // ← 第二种淘汰：队尾不满足单调（和单调栈一样）
    while (h < t && nums[dq[t - 1]] <= nums[i]) t--
    dq[t++] = i
    if (i >= k - 1) result.push(nums[dq[h]])
  }
  return result
}

// 差异总结：
// 单调栈 = 1种淘汰（破坏单调的从栈顶出）
// 单调队列 = 2种淘汰（过期从队头出 + 破坏单调的从队尾出）
// 本质：单调队列 = 单调栈 + 滑动窗口过期机制`
</script>
