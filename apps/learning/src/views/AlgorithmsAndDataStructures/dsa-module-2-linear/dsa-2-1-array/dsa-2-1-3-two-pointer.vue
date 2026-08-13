<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">👆 双指针技巧：快慢/对撞/滑动窗口</h1>
          <p class="text-sm text-slate-500 mt-1">O(n²) 降 O(n) 的万能钥匙</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-1-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：双指针
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          双指针是一种<strong>解题策略</strong>：在线性结构上放两个指针协同移动。对撞指针把 <strong>left</strong> 放最左、<strong>right</strong> 放最右，
          每次根据条件让一侧向内移动，<strong>每个元素最多被访问常数次</strong>，从而把 O(n²) 降为 O(n)。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 640 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ov-tp-l" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" />
              </marker>
              <marker id="ov-tp-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">有序数组 + 左右两个指针（对撞指针）</text>

            <!-- L 指针 -->
            <line x1="67" y1="50" x2="67" y2="74" stroke="#4ade80" stroke-width="2" marker-end="url(#ov-tp-l)" />
            <text x="67" y="42" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#16a34a">L = 0</text>
            <!-- R 指针 -->
            <line x1="377" y1="50" x2="377" y2="74" stroke="#ef4444" stroke-width="2" marker-end="url(#ov-tp-r)" />
            <text x="377" y="42" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#dc2626">R = 5</text>

            <!-- 元素格子 -->
            <rect x="40" y="80" width="54" height="44" rx="6" fill="#06b6d4" stroke="#4ade80" stroke-width="2.5" />
            <text x="67" y="102" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="102" y="80" width="54" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="129" y="102" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="164" y="80" width="54" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="191" y="102" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="226" y="80" width="54" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="253" y="102" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
            <rect x="288" y="80" width="54" height="44" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="315" y="102" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <rect x="350" y="80" width="54" height="44" rx="6" fill="#06b6d4" stroke="#ef4444" stroke-width="2.5" />
            <text x="377" y="102" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">10</text>

            <!-- 下标 -->
            <text x="67" y="140" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#16a34a" font-weight="bold">[0]</text>
            <text x="129" y="140" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[1]</text>
            <text x="191" y="140" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[2]</text>
            <text x="253" y="140" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[3]</text>
            <text x="315" y="140" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[4]</text>
            <text x="377" y="140" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#dc2626" font-weight="bold">[5]</text>

            <text x="16" y="178" font-size="11" font-family="monospace" fill="#0891b2">left 右移 → · right 左移 ←，直到 left >= right（相遇）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：对撞指针结构 —— left 从 0 出发、right 从 n-1 出发，向中间夹逼</figcaption>
        </figure>

        <!-- 操作示意图：对撞移动 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：对撞指针相向移动（sum &lt; target 则 left++，否则 right--）</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">初始：L=0，R=5</p>
            <svg viewBox="0 0 320 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="40" y="48" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">L →</text>
              <text x="270" y="48" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#dc2626">← R</text>

              <rect x="20" y="60" width="40" height="40" rx="6" fill="#06b6d4" stroke="#4ade80" stroke-width="2.5" />
              <text x="40" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="66" y="60" width="40" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="86" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="112" y="60" width="40" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="132" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="158" y="60" width="40" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="178" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
              <rect x="204" y="60" width="40" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="224" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="250" y="60" width="40" height="40" rx="6" fill="#06b6d4" stroke="#ef4444" stroke-width="2.5" />
              <text x="270" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">10</text>

              <text x="40" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[0]</text>
              <text x="86" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[1]</text>
              <text x="132" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[2]</text>
              <text x="178" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[3]</text>
              <text x="224" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[4]</text>
              <text x="270" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[5]</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">两个指针分居两端，中间是未搜索区间</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">移动后：L=2，R=3</p>
            <svg viewBox="0 0 320 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="132" y="48" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">L →</text>
              <text x="178" y="48" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#dc2626">← R</text>

              <rect x="20" y="60" width="40" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="40" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="66" y="60" width="40" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="86" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="112" y="60" width="40" height="40" rx="6" fill="#06b6d4" stroke="#4ade80" stroke-width="2.5" />
              <text x="132" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="158" y="60" width="40" height="40" rx="6" fill="#06b6d4" stroke="#ef4444" stroke-width="2.5" />
              <text x="178" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
              <rect x="204" y="60" width="40" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="224" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="250" y="60" width="40" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="270" y="80" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">10</text>

              <text x="40" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[0]</text>
              <text x="86" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[1]</text>
              <text x="132" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">[2]</text>
              <text x="178" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#dc2626" font-weight="bold">[3]</text>
              <text x="224" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[4]</text>
              <text x="270" y="112" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[5]</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">left 右移、right 左移，逐步缩小搜索区间直至相遇</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 双指针总览 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          双指针思想 —— 两个指针协同工作
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          双指针不是某个特定的算法，而是一种<strong>通用的解题策略</strong>：用两个指针在线性结构中协同移动，将暴力解法的 O(n²) 优化到 O(n)。
          核心原理：<strong>每个元素最多被指针访问常数次，因此总复杂度为 O(n)。</strong>
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>四大双指针模式：</strong></p>
          <ol class="space-y-2 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">①</span><span><strong>对撞指针 (Opposite)</strong> — 左右各一个指针，向中间移动。适用：有序数组的两数之和、盛水容器、接雨水</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">②</span><span><strong>快慢指针 (Fast/Slow)</strong> — 同向移动，快指针探索，慢指针标记。适用：原地去重、移动零、移除元素</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">③</span><span><strong>滑动窗口 (Sliding Window)</strong> — 左右边界动态伸缩，维护一个满足条件的子数组。适用：最小子数组、最长无重复子串</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">④</span><span><strong>三路分区 (Three-way Partition)</strong> — 三个指针将数组分为三段。适用：荷兰国旗问题、快速排序优化</span></li>
          </ol>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          双指针就像<strong>CSS 的两个参考线</strong>——<code>left</code> 和 <code>right</code>，或 <code>start</code> 和 <code>end</code>。<br/>
          快慢指针 = <code>scrollTop</code> 和 <code>scrollHeight</code>——一个在探索，一个在记录。<br/>
          滑动窗口 = <code>ResizeObserver</code>——窗口大小动态调整，但始终维护一个有效状态。</p>
        </aside>
      </section>

      <!-- 2. 对撞指针 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          对撞指针 —— 左右夹逼，步步缩圈
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          两个指针分别从数组两端出发，根据条件决定左指针右移或右指针左移。核心依赖：<strong>数组有序（或能通过移动指针单调地缩小搜索空间）</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="oppositeCode" title="opposite_pointers.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">LeetCode</th><th class="px-4 py-2 border border-slate-200 font-semibold">题目</th><th class="px-4 py-2 border border-slate-200 font-semibold">难度</th><th class="px-4 py-2 border border-slate-200 font-semibold">关键技巧</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">167</td><td class="px-4 py-2 border">Two Sum II - Input Array Is Sorted</td><td class="px-4 py-2 border">Medium</td><td class="px-4 py-2 border">sum 偏大 → right--，偏小 → left++</td></tr>
              <tr><td class="px-4 py-2 border font-mono">11</td><td class="px-4 py-2 border">Container With Most Water</td><td class="px-4 py-2 border">Medium</td><td class="px-4 py-2 border">移动较矮的边（反证法）</td></tr>
              <tr><td class="px-4 py-2 border font-mono">42</td><td class="px-4 py-2 border">Trapping Rain Water</td><td class="px-4 py-2 border">Hard</td><td class="px-4 py-2 border">维护左右最大高度，移动较矮侧</td></tr>
              <tr><td class="px-4 py-2 border font-mono">15</td><td class="px-4 py-2 border">3Sum</td><td class="px-4 py-2 border">Medium</td><td class="px-4 py-2 border">固定 a，对撞找 b+c = -a</td></tr>
              <tr><td class="px-4 py-2 border font-mono">125</td><td class="px-4 py-2 border">Valid Palindrome</td><td class="px-4 py-2 border">Easy</td><td class="px-4 py-2 border">跳过非字母数字，比较两端</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 3. 快慢指针 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          快慢指针 —— 一个探索，一个锚定
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          两个指针从同一端出发（通常是 0），<strong>fast 指针在前探索，slow 指针标记"已处理区域"的边界</strong>。
          这是<strong>原地修改数组</strong>的标准模板，空间复杂度 O(1)。
        </p>
        <div class="mb-4"><Code language="ts" :code="fastSlowCode" title="fast_slow_pointers.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">LeetCode</th><th class="px-4 py-2 border border-slate-200 font-semibold">题目</th><th class="px-4 py-2 border border-slate-200 font-semibold">难度</th><th class="px-4 py-2 border border-slate-200 font-semibold">关键技巧</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">26</td><td class="px-4 py-2 border">Remove Duplicates from Sorted Array</td><td class="px-4 py-2 border">Easy</td><td class="px-4 py-2 border">slow 指向最后一个不重复的位置</td></tr>
              <tr><td class="px-4 py-2 border font-mono">27</td><td class="px-4 py-2 border">Remove Element</td><td class="px-4 py-2 border">Easy</td><td class="px-4 py-2 border">fast 探索，遇到非 val 就覆盖到 slow</td></tr>
              <tr><td class="px-4 py-2 border font-mono">283</td><td class="px-4 py-2 border">Move Zeroes</td><td class="px-4 py-2 border">Easy</td><td class="px-4 py-2 border">先移非零，再填零（或交换）</td></tr>
              <tr><td class="px-4 py-2 border font-mono">80</td><td class="px-4 py-2 border">Remove Duplicates II（最多保留 2 个）</td><td class="px-4 py-2 border">Medium</td><td class="px-4 py-2 border">判断 nums[fast] !== nums[slow-2]</td></tr>
              <tr><td class="px-4 py-2 border font-mono">141</td><td class="px-4 py-2 border">Linked List Cycle</td><td class="px-4 py-2 border">Easy</td><td class="px-4 py-2 border">快指针走两步，慢指针走一步</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 快慢指针通用模板：</strong><br/>
          <code>slow = 0; for (fast = 0; fast &lt; n; fast++) { if (condition) { arr[slow] = arr[fast]; slow++; } } return slow;</code><br/>
          记住这个模板，LeetCode 上 <strong>80% 的原地数组题</strong>都是它的变体。</p>
        </aside>
      </section>

      <!-- 4. 滑动窗口 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          滑动窗口 —— 动态维护一个"合法区间"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          滑动窗口是双指针的进阶：<strong>left 和 right 指针维护一个子数组 [left, right)，通过动态伸缩窗口来满足条件。</strong>
          通用思想：right 不断扩张（纳入新元素），当窗口不合条件时，left 收缩直至合法。
        </p>
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200 mb-4">
          <p class="text-sm text-cyan-800 mb-2 font-semibold">滑动窗口万能模板：</p>
          <pre class="text-xs text-cyan-700 font-mono leading-relaxed overflow-x-auto">
let left = 0
for (let right = 0; right &lt; n; right++) {
    // 1. 纳入 arr[right]，更新窗口状态
    // 2. while (窗口不满足条件) { 移除 arr[left]; left++ }
    // 3. 更新答案（根据题意，可能在内层 while 前/后）
}</pre>
        </div>
        <div class="mb-4"><Code language="ts" :code="slidingWindowCode" title="sliding_window.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">LeetCode</th><th class="px-4 py-2 border border-slate-200 font-semibold">题目</th><th class="px-4 py-2 border border-slate-200 font-semibold">难度</th><th class="px-4 py-2 border border-slate-200 font-semibold">窗口维护内容</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">209</td><td class="px-4 py-2 border">Minimum Size Subarray Sum</td><td class="px-4 py-2 border">Medium</td><td class="px-4 py-2 border">维护窗口内的 sum >= target</td></tr>
              <tr><td class="px-4 py-2 border font-mono">3</td><td class="px-4 py-2 border">Longest Substring Without Repeating Chars</td><td class="px-4 py-2 border">Medium</td><td class="px-4 py-2 border">维护窗口内无重复字符（Set/Map）</td></tr>
              <tr><td class="px-4 py-2 border font-mono">76</td><td class="px-4 py-2 border">Minimum Window Substring</td><td class="px-4 py-2 border">Hard</td><td class="px-4 py-2 border">维护字符计数，当覆盖所有 target 字符时收缩</td></tr>
              <tr><td class="px-4 py-2 border font-mono">438</td><td class="px-4 py-2 border">Find All Anagrams in a String</td><td class="px-4 py-2 border">Medium</td><td class="px-4 py-2 border">固定大小窗口（长度 = p.length）</td></tr>
              <tr><td class="px-4 py-2 border font-mono">567</td><td class="px-4 py-2 border">Permutation in String</td><td class="px-4 py-2 border">Medium</td><td class="px-4 py-2 border">固定大小窗口，比较字符频率</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 易错点：</strong><br/>
          1. <strong>窗口大小的计算：</strong>right - left + 1（闭区间）或 right - left（[left, right) 半开区间），选一种并保持一致<br/>
          2. <strong>更新答案的位置：</strong>在内层 while 之前还是之后？取决于题目是"最短"还是"最长"<br/>
          3. <strong>固定窗口 vs 可变窗口：</strong>固定窗口用 if（长度够了就收缩），可变窗口用 while（条件满足就一直收缩）</p>
        </aside>
      </section>

      <!-- 5. 三路分区 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          三路分区 —— 三个指针，三段世界
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          三路分区是快排的优化核心，也是<strong>荷兰国旗问题 (Dutch National Flag)</strong>的解法。
          用三个指针将数组分为 <strong>[0, p0) 段 = 小数，[p0, i) 段 = 中数，[p2, n) 段 = 大数</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="threeWayCode" title="three_way_partition.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">LeetCode</th><th class="px-4 py-2 border border-slate-200 font-semibold">题目</th><th class="px-4 py-2 border border-slate-200 font-semibold">难度</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">75</td><td class="px-4 py-2 border">Sort Colors (Dutch National Flag)</td><td class="px-4 py-2 border">Medium</td></tr>
              <tr><td class="px-4 py-2 border font-mono">283</td><td class="px-4 py-2 border">Move Zeroes（两路分区特例）</td><td class="px-4 py-2 border">Easy</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 6. 双指针设计心法 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          双指针设计心法 —— 如何想到用双指针？
        </h2>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>识别双指针题目的信号：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>"原地" (in-place)</strong> → 大概率是快慢指针</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>"有序数组"</strong> → 对撞指针或二分</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>"子数组" / "连续"</strong> → 滑动窗口</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>"不重复" / "去重"</strong> → 快慢指针，slow 标记边界</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>"所有元素分为几类"</strong> → 三路分区</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>暴力法有两层循环</strong> → 看内层循环能否被指针移动替代</span></li>
          </ul>
        </div>
        <div class="mb-4"><Code language="ts" :code="designTipsCode" title="design_patterns.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 面试思路（看到题按这个顺序思考）：</strong><br/>
          1. 暴力法怎么做？（通常是 O(n²) 或 O(n³)）<br/>
          2. 哪一步是重复计算？<br/>
          3. 能否用两个指针各自只前进不后退来消除重复？<br/>
          4. 指针移动的单调性如何保证？（这是正确性证明的关键）</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：对撞指针 & 滑动窗口
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          左：<strong>对撞指针</strong>—有序数组中找两数之和=target。右：<strong>滑动窗口</strong>—找和≥target的最短子数组。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-1 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 {{ tpArr.length }}个元素</span>
          <span v-if="tpSum" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">L={{ tpL }} + R={{ tpR }} = {{ tpSum }}</span>
          <span v-if="tpWinLen>0" class="bg-blue-50 text-blue-700 px-2 py-1 rounded-full">窗口长={{ tpWinLen }}</span>
          <span class="text-slate-400 text-xs ml-auto">⏱️ 对撞 O(n) · 滑动窗口 O(n)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="tpStep" :disabled="tpBusy||tpDone" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40">{{ tpBtn }}</button>
          <button @mousedown="tpSlide" :disabled="tpBusy||tpDone2" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:shadow-sm disabled:opacity-40">滑动窗口 ▶</button>
          <button @mousedown="tpReset" :disabled="tpBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="tpBox" class="w-full relative" :style="{height:tpH+'px'}">
          <v-stage :config="{width:tpW, height:tpH}">
            <v-layer>
              <v-rect v-for="b in tpArr" :key="b.id" :config="tpRect(b)" />
              <v-text v-for="b in tpArr" :key="'v'+b.id" :config="tpVTxt(b)" />
              <v-text v-for="(b,i) in tpArr" :key="'i'+b.id" :config="tpIdx(i)" />
              <!-- 指针标注 -->
              <v-text v-if="tpL>=0" :config="tpPtr('L',tpL,'#4ade80',-38)" />
              <v-text v-if="tpR<tpArr.length" :config="tpPtr('R',tpR,'#ef4444',-24)" />
              <!-- 窗口高亮 -->
              <v-rect v-if="tpWinLen>0" :config="tpWin()" />
              <v-text v-if="tpWinLen>0" :config="{x:tpX(tpWinL)+2,y:265,text:'窗口',fontSize:11,fill:'#3b82f6',align:'center'}" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>双指针不是算法，是策略</strong>——核心是每个元素最多被访问常数次 → O(n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>对撞指针：</strong>有序数组，左右向中，根据条件决定哪端移动</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>快慢指针：</strong>原地修改，fast 探索，slow 锚定"已处理区"边界</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>滑动窗口：</strong>right 扩张纳入，left 收缩排出，维护窗口合法性</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三路分区：</strong>三个指针维护三段区间 [0, p0) / [p0, i) / [p2, n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>刷题路线：</strong>先刷 167/26/27/283/209/3/11/15/75，掌握每种模式的代表题</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-1-array/dsa-2-1-2-dynamic" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：动态数组</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-1-array/dsa-2-1-4-prefix-sum" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：前缀和与差分 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ===== 🎬 双指针动画 =====
const tpC={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b',text:'#1e293b',muted:'#94a3b8',blue:'#3b82f6'}
const tpW=ref(700),tpH=ref(320),tpH2=180; const tpBW=48,tpG=7
interface TB { id:number; val:number; color:string; _x?:number; _y?:number; _h?:number }
const tpArr=reactive<TB[]>([])
const tpBusy=ref(false),tpDone=ref(false),tpDone2=ref(false)
const tpL=ref(-1),tpR=ref(99),tpSum=ref(0),tpWinL=ref(0),tpWinLen=ref(0)
const tpBox=ref<HTMLDivElement>()
const tpBtn=computed(()=>tpDone.value?'✅ 找到!':'对撞指针 ▶')
const d7=(ms:number)=>new Promise(r=>setTimeout(r,ms))
const tpTARGET=14,winTARGET=15

function tpInit(){
  tpArr.length=0; [1,3,4,6,8,10].forEach((v,i)=>tpArr.push({id:i+1,val:v,color:tpC.cyan}))
  layoutTP(); tpL.value=-1;tpR.value=99;tpSum.value=0;tpDone.value=false;tpDone2.value=false
  tpWinL.value=0;tpWinLen.value=0
}
function tpX(i:number){ const t=tpArr.length*(tpBW+tpG)-tpG; const sx=Math.max(10,(tpW.value-t)/2); return sx+i*(tpBW+tpG) }
function layoutTP(){ const t=tpArr.length*(tpBW+tpG)-tpG, sx=Math.max(10,(tpW.value-t)/2), mv=Math.max(...tpArr.map(b=>b.val),1)
  tpArr.forEach((b,i)=>{ b._x=sx+i*(tpBW+tpG); b._h=Math.max(24,(b.val/mv)*100); b._y=120-b._h }) }
function tpRect(b:any){ return {x:b._x,y:b._y,width:tpBW,height:b._h||24,fill:b.color,cornerRadius:[4,4,0,0],stroke:b._x===tpX(tpL.value)||b._x===tpX(tpR.value)?(b.color===tpC.green?tpC.green:tpC.red):'#94a3b8',strokeWidth:b._x===tpX(tpL.value)?2:(b._x===tpX(tpR.value)?2:1),shadowColor:'rgba(0,0,0,.1)',shadowBlur:4,shadowOffsetY:1} }
function tpVTxt(b:any){ return {x:b._x,y:b._y+2,width:tpBW,height:(b._h||24)-4,text:String(b.val),fontSize:13,fontFamily:'monospace',fontStyle:'bold',fill:(b._h||24)>30?'#fff':tpC.text,align:'center',verticalAlign:'middle'} }
function tpIdx(i:number){ return {x:tpX(i),y:125,width:tpBW,text:'['+i+']',fontSize:10,fontFamily:'monospace',fill:tpC.muted,align:'center'} }
function tpPtr(name:string,idx:number,color:string,yOff:number){ return {x:tpX(idx)+tpBW/2,y:128+yOff,text:name,fontSize:11,fontFamily:'monospace',fill:color,align:'center',fontStyle:'bold'} }
function tpWin(){ const lx=tpX(tpWinL.value),rx=tpX(tpWinL.value+tpWinLen.value-1); return {x:lx-2,y:152,width:rx-lx+tpBW+4,height:24,fill:'rgba(59,130,246,.12)',stroke:tpC.blue,strokeWidth:2,cornerRadius:6,dash:[4,3]} }

// 对撞指针：找两数之和=target
async function tpStep(){
  if(tpBusy.value||tpDone.value)return; tpBusy.value=true
  if(tpL.value<0){ tpL.value=0;tpR.value=tpArr.length-1 }
  if(tpL.value>=tpR.value){ tpDone.value=true;tpBusy.value=false; return }
  tpArr[tpL.value].color=tpC.green; tpArr[tpR.value].color=tpC.red
  const s=tpArr[tpL.value].val+tpArr[tpR.value].val; tpSum.value=s
  await d7(600)
  if(s===tpTARGET){ tpArr[tpL.value].color=tpC.green;tpArr[tpR.value].color=tpC.green;tpDone.value=true;tpBusy.value=false;return }
  if(s<tpTARGET){ tpArr[tpL.value].color=tpC.cyan; tpL.value++ }
  else{ tpArr[tpR.value].color=tpC.cyan; tpR.value-- }
  tpBusy.value=false
}

// 滑动窗口：找和≥target的最短子数组
let _wl=0,_wr=0,_ws=0,_best=99, _bestL=0
async function tpSlide(){
  if(tpBusy.value||tpDone2.value)return; tpBusy.value=true
  if(_wr===0){ _wl=0;_wr=0;_ws=0;_best=99;tpWinL.value=0;tpWinLen.value=0;tpArr.forEach(b=>b.color=tpC.cyan) }
  if(_wr>=tpArr.length){
    if(_best===99)tpBusy.value=false; else{tpWinL.value=_bestL;tpWinLen.value=_best;tpDone2.value=true}
    tpBusy.value=false; return
  }
  _ws+=tpArr[_wr].val; _wr++; tpArr[_wr-1].color=tpC.orange
  while(_ws>=winTARGET&&_wl<_wr){
    if(_wr-_wl<_best){ _best=_wr-_wl; _bestL=_wl }
    tpArr[_wl].color=tpC.cyan; _ws-=tpArr[_wl].val; _wl++
  }
  tpWinL.value=_wl;tpWinLen.value=_wr-_wl; await d7(500)
  if(_best<99){ tpWinL.value=_bestL;tpWinLen.value=_best }
  tpBusy.value=false
}
function tpReset(){ tpBusy.value=false;tpInit();_wl=0;_wr=0;_ws=0;_best=99 }
let roTP:ResizeObserver|null=null
onMounted(()=>{ tpInit(); if(tpBox.value){ tpW.value=tpBox.value.clientWidth; layoutTP()
  roTP=new ResizeObserver(e=>{const w=e[0]?.contentRect.width;if(w&&w>200){tpW.value=w;layoutTP()}}); roTP.observe(tpBox.value) }})
onUnmounted(()=>roTP?.disconnect())

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "双指针思想" },
  { id: "sec-2", name: "对撞指针" },
  { id: "sec-3", name: "快慢指针" },
  { id: "sec-4", name: "滑动窗口" },
  { id: "sec-5", name: "三路分区" },
  { id: "sec-6", name: "设计心法" },
  { id: "sec-viz", name: "🎬 双指针动画" },
  { id: "sec-8", name: "小结" },
]

const oppositeCode = `// ─── 对撞指针模板 ───
// 适用条件：数组有序，或能通过指针移动单调地缩小搜索空间

function twoSumSorted(nums: number[], target: number): [number, number] {
    let left = 0
    let right = nums.length - 1
    while (left < right) {
        const sum = nums[left] + nums[right]
        if (sum === target) {
            return [left, right]  // 找到！（LeetCode 167，下标从 1 开始需 +1）
        } else if (sum < target) {
            left++   // 和太小 → 需要更大的数 → 左指针右移
        } else {
            right--  // 和太大 → 需要更小的数 → 右指针左移
        }
    }
    return [-1, -1]
}
// 时间复杂度：O(n)，空间复杂度：O(1)
// 每次循环要么 left++ 要么 right--，最多移动 n 次

// ─── LeetCode 11: Container With Most Water ───
function maxArea(height: number[]): number {
    let left = 0, right = height.length - 1
    let max = 0
    while (left < right) {
        const w = right - left
        const h = Math.min(height[left], height[right])
        max = Math.max(max, w * h)
        // 关键决策：移动较矮的边
        // 因为移动较高的边，宽度减少，高度不会增加 → 面积一定变小
        if (height[left] < height[right]) {
            left++
        } else {
            right--
        }
    }
    return max
}

// ─── LeetCode 42: Trapping Rain Water ───
function trap(height: number[]): number {
    let left = 0, right = height.length - 1
    let leftMax = 0, rightMax = 0
    let water = 0
    while (left < right) {
        leftMax = Math.max(leftMax, height[left])
        rightMax = Math.max(rightMax, height[right])
        // 处理较矮的一侧：
        // 该位置的雨水量 = min(leftMax, rightMax) - height[pos]
        if (leftMax < rightMax) {
            water += leftMax - height[left]
            left++
        } else {
            water += rightMax - height[right]
            right--
        }
    }
    return water
}`

const fastSlowCode = `// ─── 快慢指针通用模板（原地修改数组）───
// slow: 指向下一个"有效元素"应该放置的位置
// fast: 遍历数组的每个元素

// ─── LeetCode 26: 删除有序数组中的重复项 ───
function removeDuplicates(nums: number[]): number {
    if (nums.length === 0) return 0
    let slow = 0  // 指向最后一个不重复元素的位置
    for (let fast = 1; fast < nums.length; fast++) {
        // 遇到新元素 → 放到 slow+1 的位置
        if (nums[fast] !== nums[slow]) {
            slow++
            nums[slow] = nums[fast]
        }
    }
    return slow + 1  // 不重复元素的数量
}
// 示例: [1,1,2,2,3] → [1,2,3,2,3], 返回 3
// fast=1: 1===1 跳过
// fast=2: 2!==1 → slow=1, nums[1]=2 → [1,2,2,2,3]
// fast=3: 2===2 跳过
// fast=4: 3!==2 → slow=2, nums[2]=3 → [1,2,3,2,3]

// ─── LeetCode 27: 移除元素 ───
function removeElement(nums: number[], val: number): number {
    let slow = 0
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== val) {
            nums[slow] = nums[fast]
            slow++
        }
    }
    return slow
}
// 示例: nums=[3,2,2,3], val=3
// fast=0: 3===3 跳过
// fast=1: 2!==3 → nums[0]=2, slow=1
// fast=2: 2!==3 → nums[1]=2, slow=2
// fast=3: 3===3 跳过 → [2,2,2,3], 返回 2

// ─── LeetCode 283: 移动零 ───
function moveZeroes(nums: number[]): void {
    let slow = 0
    // 第一步：把所有非零元素移到前面
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            nums[slow] = nums[fast]
            slow++
        }
    }
    // 第二步：剩余位置填 0
    for (let i = slow; i < nums.length; i++) {
        nums[i] = 0
    }
}
// 优化：一次遍历 + 交换（保持非零元素的相对顺序）
function moveZeroesSwap(nums: number[]): void {
    let slow = 0
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            ;[nums[slow], nums[fast]] = [nums[fast], nums[slow]]
            slow++
        }
    }
}`

const slidingWindowCode = `// ─── 滑动窗口模板 ───
// let left = 0
// for (let right = 0; right < n; right++) {
//     纳入 nums[right]，更新窗口状态
//     while (窗口需要收缩) { 移除 nums[left]; left++ }
//     更新答案
// }

// ─── LeetCode 209: 长度最小的子数组（sum >= target）───
function minSubArrayLen(target: number, nums: number[]): number {
    let left = 0
    let sum = 0
    let minLen = Infinity
    for (let right = 0; right < nums.length; right++) {
        sum += nums[right]
        // 当窗口满足条件时，尝试收缩左边界
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1)
            sum -= nums[left]
            left++
        }
    }
    return minLen === Infinity ? 0 : minLen
}
// 示例: target=7, nums=[2,3,1,2,4,3]
// right=0: sum=2, 不满足
// right=1: sum=5, 不满足
// right=2: sum=6, 不满足
// right=3: sum=8 >=7 → minLen=4, 收缩: left=1, sum=6
// right=4: sum=10>=7 → minLen=3, 收缩: left=2, sum=9 → minLen=3, 再收缩: left=3, sum=7 → minLen=2

// ─── LeetCode 3: 无重复字符的最长子串 ───
function lengthOfLongestSubstring(s: string): number {
    const seen = new Map<string, number>()  // char → 最后出现的位置
    let left = 0
    let maxLen = 0
    for (let right = 0; right < s.length; right++) {
        const char = s[right]
        // 如果当前字符在窗口内出现过，left 跳到重复位置的下一个
        if (seen.has(char) && seen.get(char)! >= left) {
            left = seen.get(char)! + 1
        }
        seen.set(char, right)
        maxLen = Math.max(maxLen, right - left + 1)
    }
    return maxLen
}
// 示例: "abcabcbb"
// right=0 a: {a:0}, maxLen=1
// right=1 b: {a:0,b:1}, maxLen=2
// right=2 c: {a:0,b:1,c:2}, maxLen=3
// right=3 a: a 在位置 0 >= left=0 → left=1, {a:3,b:1,c:2}, maxLen=3

// ─── LeetCode 76: 最小覆盖子串 ───
function minWindow(s: string, t: string): string {
    const need = new Map<string, number>()
    for (const char of t) {
        need.set(char, (need.get(char) || 0) + 1)
    }
    const window = new Map<string, number>()
    let left = 0, right = 0
    let valid = 0  // 已满足条件的字符种类数
    let start = 0, minLen = Infinity

    while (right < s.length) {
        const c = s[right]
        right++
        if (need.has(c)) {
            window.set(c, (window.get(c) || 0) + 1)
            if (window.get(c) === need.get(c)) valid++
        }
        // 当所有字符都满足条件时，收缩窗口
        while (valid === need.size) {
            if (right - left < minLen) {
                start = left
                minLen = right - left
            }
            const d = s[left]
            left++
            if (need.has(d)) {
                if (window.get(d) === need.get(d)) valid--
                window.set(d, window.get(d)! - 1)
            }
        }
    }
    return minLen === Infinity ? "" : s.substring(start, start + minLen)
}`

const threeWayCode = `// ─── LeetCode 75: 荷兰国旗问题 ───
// 数组只含 0,1,2，要求原地排序

function sortColors(nums: number[]): void {
    let p0 = 0                // [0, p0) 全是 0
    let p2 = nums.length - 1  // (p2, n) 全是 2
    let i = 0                 // [p0, i) 全是 1 — 遍历指针

    while (i <= p2) {
        if (nums[i] === 0) {
            // 找到 0 → 交换到 p0 位置，p0 和 i 都右移
            ;[nums[i], nums[p0]] = [nums[p0], nums[i]]
            p0++
            i++
        } else if (nums[i] === 2) {
            // 找到 2 → 交换到 p2 位置，p2 左移
            // 注意：i 不自增！因为换过来的元素还未检查
            ;[nums[i], nums[p2]] = [nums[p2], nums[i]]
            p2--
        } else {
            // 找到 1 → 跳过，1 已经在正确的位置
            i++
        }
    }
}
// 示例: [2,0,1]
// i=0,p0=0,p2=2: nums[0]=2 → 交换[0]和[2] → [1,0,2], p2=1
// i=0,p0=0,p2=1: nums[0]=1 → i=1
// i=1,p0=0,p2=1: nums[1]=0 → 交换[1]和[0] → [0,1,2], p0=1, i=2
// 结束 → [0,1,2]

// ─── 可视化 ───
//   [0, ..., 0 | 1, ..., 1 | ??? | 2, ..., 2]
//    ← p0 →    ←   i   →      ←   p2   →
//    0 区间     1 区间    未处理    2 区间

// ─── 为什么 i 遇到 2 时不自增？───
// 因为交换过来的 nums[p2] 是未检查的元素，需要下一轮处理。
// 而遇到 0 时交换过来的元素是 1（p0 和 i 之间全是 1），所以可以放心 i++。`

const designTipsCode = `// ─── 双指针的正确性证明模板 ───
// 循环不变式（Loop Invariant）—— 证明指针移动不会错过答案：

// 对撞指针的不变式：
//   "如果答案存在，它一定在 [left, right] 区间内"
//   每次移动后，区间缩小，但不变式保持 → 最终找到答案

// 快慢指针的不变式：
//   "[0, slow) 区间满足题目要求，[slow, fast) 已被处理但不满足要求"
//   fast 遍历完毕时，[0, slow) 就是最终答案

// ─── 常见错误与修正 ───

// ❌ 错误 1：对撞指针中，while (left < right) 写成 while (left <= right)
function wrongCondition(nums: number[]) {
    let left = 0, right = nums.length - 1
    while (left <= right) {  // ❌ 会重复处理中间元素
        // ...
        left++
        right--
    }
}
// ✅ 正确：while (left < right)，保证 left 和 right 不交叉

// ❌ 错误 2：滑动窗口中，忘记更新窗口状态就收缩
function wrongSlidingWindow(nums: number[], target: number) {
    let left = 0, sum = 0
    for (let right = 0; right < nums.length; right++) {
        // ❌ 没有先 sum += nums[right] 就开始 while
        while (sum >= target) {
            sum -= nums[left]
            left++
        }
    }
}
// ✅ 正确：先纳入，再判断，再收缩

// ❌ 错误 3：三路分区中，交换 p2 后 i++ 了
// 交换 nums[i] 和 nums[p2] 后，nums[i] 是新的未检查元素 → 必须留在原地再判断一次

// ─── 快慢指针的变体识别 ───
// 几乎所有"原地修改数组"的题都是快慢指针：
// - "删除重复项" → slow 指向最后一个有效位置
// - "移除指定值" → slow 指向下一个有效位置
// - "移动零" → slow 指向下一个非零位置
// - "保留最多 k 个重复" → 判断 nums[fast] !== nums[slow - k]`
</script>
