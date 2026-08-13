<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🏃 快慢指针技巧全集</h1>
          <p class="text-sm text-slate-500 mt-1">链表中点 / 环检测 / 环入口 / 链表交点 / 删除倒数第N / 重排链表——一双快慢指针解决一切</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：快慢指针
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          快慢指针 = <strong>fast 每次走 2 步、slow 每次走 1 步</strong>，速度差恒为 1。fast 到末尾时 slow 恰在中点；有环时二者必然相遇。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 620 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="tp-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              <marker id="tp-o" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" /></marker>
              <marker id="tp-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" /></marker>
            </defs>

            <text x="16" y="28" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">fast 每次 +2（蓝） · slow 每次 +1（橙）— 走 2 步后 slow=3, fast=5</text>

            <!-- slow 指针 -->
            <text x="216" y="58" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#f59e0b">slow</text>
            <line x1="216" y1="64" x2="216" y2="96" stroke="#f59e0b" stroke-width="2" marker-end="url(#tp-o)" />
            <!-- fast 指针 -->
            <text x="376" y="58" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#60a5fa">fast</text>
            <line x1="376" y1="64" x2="376" y2="96" stroke="#60a5fa" stroke-width="2" marker-end="url(#tp-b)" />

            <!-- 节点 1 -->
            <rect x="30" y="100" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="56" y="120" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <line x1="82" y1="120" x2="106" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#tp-a)" />
            <!-- 节点 2 -->
            <rect x="110" y="100" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="136" y="120" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <line x1="162" y1="120" x2="186" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#tp-a)" />
            <!-- 节点 3 -->
            <rect x="190" y="100" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="216" y="120" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <line x1="242" y1="120" x2="266" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#tp-a)" />
            <!-- 节点 4 -->
            <rect x="270" y="100" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="296" y="120" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <line x1="322" y1="120" x2="346" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#tp-a)" />
            <!-- 节点 5 -->
            <rect x="350" y="100" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="376" y="120" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <line x1="402" y1="120" x2="426" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#tp-a)" />
            <!-- 节点 6 -->
            <rect x="430" y="100" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="456" y="120" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
            <line x1="482" y1="120" x2="506" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#tp-a)" />
            <!-- 节点 7 -->
            <rect x="510" y="100" width="52" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="536" y="120" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <text x="592" y="120" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#94a3b8">null</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：快慢指针结构——同一链表上两个指针，速度差为 1</figcaption>
        </figure>

        <!-- 操作示意图 1：找中点 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：找中点 —— fast 到末尾，slow 停在中点</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">开始</p>
            <svg viewBox="0 0 320 110" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs><marker id="fm-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker></defs>
              <text x="32" y="22" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#f59e0b">slow=fast</text>
              <line x1="32" y1="28" x2="32" y2="36" stroke="#f59e0b" stroke-width="1.5" />
              <line x1="50" y1="57" x2="74" y2="57" stroke="#94a3b8" stroke-width="2" marker-end="url(#fm-a)" />
              <line x1="114" y1="57" x2="138" y2="57" stroke="#94a3b8" stroke-width="2" marker-end="url(#fm-a)" />
              <line x1="178" y1="57" x2="202" y2="57" stroke="#94a3b8" stroke-width="2" marker-end="url(#fm-a)" />
              <line x1="242" y1="57" x2="266" y2="57" stroke="#94a3b8" stroke-width="2" marker-end="url(#fm-a)" />
              <rect x="14" y="40" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="32" y="57" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="78" y="40" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="96" y="57" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="142" y="40" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="160" y="57" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="206" y="40" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="224" y="57" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="270" y="40" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="288" y="57" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <text x="312" y="57" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#94a3b8">null</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">开始：slow = fast = head，都在节点 1</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">结束</p>
            <svg viewBox="0 0 320 110" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs><marker id="fm2-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker></defs>
              <text x="160" y="22" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#f59e0b">slow（中点）</text>
              <line x1="160" y1="28" x2="160" y2="36" stroke="#f59e0b" stroke-width="1.5" />
              <text x="290" y="22" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#60a5fa">fast=null</text>
              <line x1="50" y1="57" x2="74" y2="57" stroke="#94a3b8" stroke-width="2" marker-end="url(#fm2-a)" />
              <line x1="114" y1="57" x2="138" y2="57" stroke="#94a3b8" stroke-width="2" marker-end="url(#fm2-a)" />
              <line x1="178" y1="57" x2="202" y2="57" stroke="#94a3b8" stroke-width="2" marker-end="url(#fm2-a)" />
              <line x1="242" y1="57" x2="266" y2="57" stroke="#94a3b8" stroke-width="2" marker-end="url(#fm2-a)" />
              <rect x="14" y="40" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="32" y="57" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="78" y="40" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="96" y="57" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="142" y="40" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="160" y="57" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="206" y="40" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="224" y="57" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="270" y="40" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="288" y="57" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <text x="312" y="57" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#94a3b8">null</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">结束：fast 到 null，slow 正好停在中点（节点 3）</figcaption>
          </figure>
        </div>

        <!-- 操作示意图 2：环检测 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：环检测 —— 有环则 fast/slow 必然相遇</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">无环</p>
            <svg viewBox="0 0 320 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs><marker id="cy-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker></defs>
              <text x="160" y="22" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#f59e0b">slow</text>
              <line x1="160" y1="28" x2="160" y2="36" stroke="#f59e0b" stroke-width="1.5" />
              <text x="290" y="22" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#60a5fa">fast=null</text>
              <line x1="50" y1="57" x2="74" y2="57" stroke="#94a3b8" stroke-width="2" marker-end="url(#cy-a)" />
              <line x1="114" y1="57" x2="138" y2="57" stroke="#94a3b8" stroke-width="2" marker-end="url(#cy-a)" />
              <line x1="178" y1="57" x2="202" y2="57" stroke="#94a3b8" stroke-width="2" marker-end="url(#cy-a)" />
              <line x1="242" y1="57" x2="266" y2="57" stroke="#94a3b8" stroke-width="2" marker-end="url(#cy-a)" />
              <rect x="14" y="40" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="32" y="57" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="78" y="40" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="96" y="57" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="142" y="40" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="160" y="57" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="206" y="40" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="224" y="57" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="270" y="40" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="288" y="57" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <text x="312" y="57" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#94a3b8">null</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">无环：fast 走到 null，循环退出，返回 false</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">有环（5→3）</p>
            <svg viewBox="0 0 320 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs><marker id="cy2-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker></defs>
              <text x="224" y="18" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">fast=slow 相遇</text>
              <line x1="224" y1="24" x2="224" y2="32" stroke="#16a34a" stroke-width="1.5" />
              <line x1="50" y1="47" x2="74" y2="47" stroke="#94a3b8" stroke-width="2" marker-end="url(#cy2-a)" />
              <line x1="114" y1="47" x2="138" y2="47" stroke="#94a3b8" stroke-width="2" marker-end="url(#cy2-a)" />
              <line x1="178" y1="47" x2="202" y2="47" stroke="#94a3b8" stroke-width="2" marker-end="url(#cy2-a)" />
              <line x1="242" y1="47" x2="266" y2="47" stroke="#94a3b8" stroke-width="2" marker-end="url(#cy2-a)" />
              <!-- 环：5 → 3 -->
              <path d="M 288 64 L 288 86 L 160 86 L 160 66" fill="none" stroke="#94a3b8" stroke-width="2" marker-end="url(#cy2-a)" />
              <rect x="14" y="30" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="32" y="47" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="78" y="30" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="96" y="47" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="142" y="30" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="160" y="47" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="206" y="30" width="36" height="34" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2.5" />
              <text x="224" y="47" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="270" y="30" width="36" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="288" y="47" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">有环：5.next 指回 3，fast 与 slow 在节点 4 相遇，返回 true</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 快慢指针原理 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          快慢指针的本质 —— 相对速度差
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>快慢指针 (Fast & Slow Pointer)</strong> 也叫做龟兔赛跑算法。核心思想：
          两指针同向移动，<strong>快指针每次走 2 步，慢指针每次走 1 步</strong>。由于速度差为 1，
          两者距离每一步缩小 1，永不相撞……除非有环！
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">应用</th><th class="px-4 py-2 border border-slate-200 font-semibold">LeetCode</th><th class="px-4 py-2 border border-slate-200 font-semibold">核心思路</th><th class="px-4 py-2 border border-slate-200 font-semibold">复杂度</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">链表中点</td><td class="px-4 py-2 border font-mono">#876</td><td class="px-4 py-2 border">fast 走到头 → slow 在中点</td><td class="px-4 py-2 border">O(n) O(1)</td></tr>
              <tr><td class="px-4 py-2 border">是否有环</td><td class="px-4 py-2 border font-mono">#141</td><td class="px-4 py-2 border">fast/slow 相遇 → 有环</td><td class="px-4 py-2 border">O(n) O(1)</td></tr>
              <tr><td class="px-4 py-2 border">环的入口</td><td class="px-4 py-2 border font-mono">#142</td><td class="px-4 py-2 border">相遇后一个回起点，同步走 → 再次相遇为入口</td><td class="px-4 py-2 border">O(n) O(1)</td></tr>
              <tr><td class="px-4 py-2 border">链表交点</td><td class="px-4 py-2 border font-mono">#160</td><td class="px-4 py-2 border">双指针消除长度差，走完自己走对方</td><td class="px-4 py-2 border">O(n) O(1)</td></tr>
              <tr><td class="px-4 py-2 border">删除倒数第N</td><td class="px-4 py-2 border font-mono">#19</td><td class="px-4 py-2 border">fast 先走 N 步，然后同步走到尾</td><td class="px-4 py-2 border">O(n) O(1)</td></tr>
              <tr><td class="px-4 py-2 border">重排链表</td><td class="px-4 py-2 border font-mono">#143</td><td class="px-4 py-2 border">中点 + 反转 + 交叉合并</td><td class="px-4 py-2 border">O(n) O(1)</td></tr>
              <tr><td class="px-4 py-2 border">旋转链表</td><td class="px-4 py-2 border font-mono">#61</td><td class="px-4 py-2 border">连成环 + 找断点</td><td class="px-4 py-2 border">O(n) O(1)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 2. 链表中点 + 删除倒数第N -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          链表中点 & 删除倒数第 N 个 — 基础用法
        </h2>
        <div class="mb-4"><Code language="ts" :code="basicsCode" title="middle_and_remove_nth.ts" /></div>
      </section>

      <!-- 3. 环检测 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          环检测 & 环入口 — Floyd 判圈算法
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          这是快慢指针最经典的应用。<strong>有环 → 快慢指针必然相遇；找到入口需要一点数学。</strong>
        </p>
        <div class="mb-4"><Code language="ts" :code="cycleCode" title="cycle_detection.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 环入口公式推导（面试可能追问）：</strong><br/>
          设起点到入口 = a，入口到相遇点 = b，相遇点到入口 = c。<br/>
          slow 路程 = a + b；fast 路程 = a + b + n(b + c)。fast 速度 2x → 2(a+b) = a+b+n(b+c) → a = (n-1)(b+c) + c。<br/>
          n=1 时 a = c，即起点到入口 = 相遇点到入口。让一个指针从起点走，一个从相遇点走，同速相遇即入口。</p>
        </aside>
      </section>

      <!-- 4. 链表交点 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          链表交点 — 消除长度差的浪漫双指针
        </h2>
        <div class="mb-4"><Code language="ts" :code="intersectionCode" title="intersection_of_two_lists.ts" /></div>
      </section>

      <!-- 5. 重排链表 + 旋转链表 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          重排链表 & 旋转链表 — 组合技
        </h2>
        <div class="mb-4"><Code language="ts" :code="reorderCode" title="reorder_rotate.ts" /></div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：快慢指针找中点
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>slow</strong>（橙）每次走 1 步，<strong>fast</strong>（蓝）每次走 2 步。当 fast 到末尾时，slow 恰好在<strong>中点</strong>。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ tpNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ tpStatus }}</span>
          <span v-if="tpMid>=0" class="bg-green-50 text-green-700 px-2 py-1 rounded-full">🎯 中点: 节点 {{ tpNodes[tpMid]?.val }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500 ml-auto">⏱️ O(n)</span>
        </div>
        <div class="flex items-center gap-4 mb-1 text-xs text-slate-500">
          <span><span class="inline-block w-3 h-3 rounded-full bg-amber-500 align-middle mr-1"></span>slow</span>
          <span><span class="inline-block w-3 h-3 rounded-full bg-blue-400 align-middle mr-1"></span>fast</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doFindMid" :disabled="tpBusy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed">🏃 找中点</button>
          <button @mousedown="doTPReset" :disabled="tpBusy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed">↺ Reset</button>
        </div>
        <div ref="tpBox" class="w-full relative overflow-x-auto" :style="{height: tpH+'px'}">
          <v-stage :config="{width: tpW, height: tpH}">
            <v-layer>
              <v-arrow v-for="(n,i) in tpNodes.slice(0,-1)" :key="'a'+n.id" :config="tpArrow(i)" />
              <v-rect v-for="n in tpNodes" :key="n.id" :config="tpR(n)" />
              <v-text v-for="n in tpNodes" :key="'t'+n.id" :config="tpT(n)" />
              <v-text v-for="(p,i) in tpPtrs" :key="'p'+i" :config="tpLabel(p)" />
              <v-text :config="{x:tpNodes.length*90+NX+NW-80,y:NMY+NH/2-8,text:'null',fontSize:13,fontFamily:'monospace',fill:revC2.muted}" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>快慢指针 = fast 走2步，slow 走1步</strong>，速度差为1保证相遇</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>链表中点</strong> = fast 到末尾，slow 在中点（偶数时偏右）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>环检测</strong> = fast/slow 相遇 → 有环；相遇后同步走 → 再次相遇 = 入口</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>链表交点</strong> = 双双走完自己走对方，消除长度差后必然相遇</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>删除倒数第N</strong> = fast 先走 N 步拉开差距，然后同步走到尾</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>重排链表</strong> = 找中点 → 反转后半 → 交叉合并（三道题的组合）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-algorithms/dsa-2-2-5-reverse" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：链表反转全家桶</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-algorithms/dsa-2-2-7-merge" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：链表合并与排序 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ===== 🎬 快慢指针动画 =====
const revC2={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b',blue:'#60a5fa',text:'#1e293b',muted:'#94a3b8'}
const tpW=ref(700),tpH=ref(240),tpMid=ref(-1)
const tpBusy=ref(false),tpStatus=ref(''); let _slow=0,_fast=0
interface TPN { id:number; val:number; color:string }
const tpNodes=reactive<TPN[]>([])
const tpPtrs=ref<{name:string;idx:number;color:string;yOff:number}[]>([])
const tpBox=ref<HTMLDivElement>()
const d2=(ms:number)=>new Promise(r=>setTimeout(r,ms))

function tpInit(vals:number[]=[1,2,3,4,5,6,7]){
  tpNodes.length=0; vals.forEach((v,i)=>tpNodes.push({id:i+1,val:v,color:revC2.cyan}))
  tpPtrs.value=[]; tpMid.value=-1; tpStatus.value=''
}
function tpR(n:any){ return {x:20+n.id*90-90,y:100,width:52,height:38,fill:n.color,cornerRadius:6,stroke:'#64748b',strokeWidth:1.5,shadowColor:'rgba(0,0,0,.1)',shadowBlur:4,shadowOffsetY:2} }
function tpT(n:any){ return {x:20+n.id*90-90,y:100,width:52,height:38,text:String(n.val),fontSize:16,fontFamily:'monospace',fontStyle:'bold',fill:revC2.text,align:'center',verticalAlign:'middle'} }
function tpArrow(i:number){ const a=tpNodes[i],b=tpNodes[i+1]; return {points:[a.id*90-90+20+52,119,b.id*90-90+20,119],fill:revC2.muted,stroke:revC2.muted,strokeWidth:2,pointerLength:8,pointerWidth:6} }
function tpLabel(p:{name:string;idx:number;color:string;yOff:number}){
  return {x:p.idx<0?10:20+p.idx*90-90+26,y:100+p.yOff,text:p.name,fontSize:11,fontFamily:'monospace',fill:p.color,align:'center',fontStyle:'bold'}
}

async function doFindMid(){
  if(tpBusy.value)return; tpBusy.value=true; _slow=0;_fast=0; tpMid.value=-1
  tpStatus.value='开始…'; await d2(300)
  while(_fast<tpNodes.length-1){
    tpPtrs.value=[{name:'slow',idx:_slow,color:revC2.orange,yOff:-30},{name:'fast',idx:_fast,color:revC2.blue,yOff:-15}]
    tpNodes[_slow].color=revC2.orange; tpNodes[_fast].color=revC2.blue
    tpStatus.value=`slow=①, fast=①`; await d2(500)
    // 前进一步
    _slow++; _fast+=2
    if(_fast>=tpNodes.length){_fast=tpNodes.length-1; tpPtrs.value[1].idx=_fast}
    // 恢复之前节点的颜色
    if(_slow>1) tpNodes[_slow-2].color=revC2.cyan
    if(_fast>1&&_fast-2>=0&&_fast-2!==_slow-1) tpNodes[_fast-2].color=revC2.cyan
  }
  tpPtrs.value=[{name:'mid!',idx:_slow,color:revC2.green,yOff:-30}]
  tpNodes[_slow].color=revC2.green; tpStatus.value=`✅ 中点 = 节点${tpNodes[_slow].val}`; tpMid.value=_slow
  tpBusy.value=false
}
function doTPReset(){ tpBusy.value=false; tpInit(); _slow=0;_fast=0 }
let roTP:ResizeObserver|null=null
onMounted(()=>{ tpInit(); if(tpBox.value){ tpW.value=tpBox.value.clientWidth
  roTP=new ResizeObserver(e=>{const w=e[0]?.contentRect.width;if(w&&w>200)tpW.value=Math.max(500,w)})
  roTP.observe(tpBox.value) }})
onUnmounted(()=>roTP?.disconnect())

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "快慢指针原理" },
  { id: "sec-2", name: "中点 & 删除倒数第N" },
  { id: "sec-3", name: "环检测 & 环入口" },
  { id: "sec-4", name: "链表交点" },
  { id: "sec-5", name: "重排 & 旋转链表" },
  { id: "sec-viz", name: "🎬 快慢指针动画" },
  { id: "sec-7", name: "小结" },
]

class ListNode { val: number; next: ListNode | null; constructor(val?: number, next?: ListNode | null) { this.val = val ?? 0; this.next = next ?? null } }

const basicsCode = `// ===== 链表中点（LeetCode 876）=====
function middleNode(head: ListNode | null): ListNode | null {
    let slow = head, fast = head
    while (fast && fast.next) {
        slow = slow!.next        // 走 1 步
        fast = fast.next.next    // 走 2 步
    }
    return slow  // 偶数个时返回第二个中点
}
// 示例: 1→2→3→4→5  → slow 停在 3
//        1→2→3→4    → slow 停在 3（第二个中点）

// 如果偶数时要第一个中点（常用于拆分链表）：
function middleNodeFirst(head: ListNode | null): ListNode | null {
    let slow = head, fast = head
    while (fast && fast.next && fast.next.next) {
        slow = slow!.next
        fast = fast.next.next
    }
    return slow  // 偶数时在第一个中点
}

// ===== 删除链表的倒数第 N 个节点（LeetCode 19）=====
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0, head)
    let fast: ListNode | null = dummy
    let slow: ListNode | null = dummy

    // 1. fast 先走 n+1 步（让 slow 停在要删节点的前一个）
    for (let i = 0; i <= n; i++) fast = fast!.next

    // 2. 同步走到 fast 到达末尾
    while (fast) {
        slow = slow!.next
        fast = fast.next
    }

    // 3. 删除 slow.next
    slow!.next = slow!.next!.next
    return dummy.next
}
// 示例: 1→2→3→4→5, n=2
// fast 先走 3 步到 3, slow 在 dummy
// 同步走: fast 到 null, slow 在 3 → 删除 4
// 结果: 1→2→3→5`

const cycleCode = `// ===== 检测是否有环（LeetCode 141）=====
function hasCycle(head: ListNode | null): boolean {
    let slow = head, fast = head
    while (fast && fast.next) {
        slow = slow!.next
        fast = fast.next.next
        if (slow === fast) return true  // 相遇 = 有环
    }
    return false  // fast 到 null = 无环
}
// 时间 O(n)  空间 O(1)

// ===== 找环的入口（LeetCode 142）=====
function detectCycle(head: ListNode | null): ListNode | null {
    let slow: ListNode | null = head
    let fast: ListNode | null = head

    // Phase 1: 判断是否有环 + 找相遇点
    while (fast && fast.next) {
        slow = slow!.next
        fast = fast.next.next
        if (slow === fast) break
    }
    if (!fast || !fast.next) return null  // 无环

    // Phase 2: 一个回起点，同步走，再次相遇 = 入口
    slow = head
    while (slow !== fast) {
        slow = slow!.next
        fast = fast!.next
    }
    return slow  // 环的入口
}

// 入口公式推导（记忆版）：
// 设 head→入口 = a，入口→相遇点 = b，相遇点→入口(绕环) = c
// slow 路程 = a + b
// fast 路程 = a + b + n(b+c) = 2(a+b)  (fast 速度是 slow 两倍)
// → a = (n-1)(b+c) + c
// n=1 时 a = c → head到入口 = 相遇点到入口
// 所以一个指针从 head 走，一个从相遇点走，相遇 = 入口

// ===== 找环的长度 =====
function cycleLength(head: ListNode | null): number {
    const entry = detectCycle(head)
    if (!entry) return 0
    let len = 1, curr = entry.next
    while (curr !== entry) {
        len++
        curr = curr!.next
    }
    return len
}`

const intersectionCode = `// ===== 链表交点（LeetCode 160）=====
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    let pA = headA, pB = headB

    while (pA !== pB) {
        pA = pA ? pA.next : headB  // A 走完走 B
        pB = pB ? pB.next : headA  // B 走完走 A
    }
    return pA  // 要么是交点，要么都是 null（不相交）
}
// 时间 O(m+n)  空间 O(1)
//
// 为什么这样能消除长度差？
// A 链路: a1→a2→c1→c2→c3  (长度 5)
// B 链路: b1→b2→b3→c1→c2→c3 (长度 6)
// pA 走完 A(5步) 后走 B(从头), pB 走完 B(6步) 后走 A(从头)
// 当 pA 走了 5+1=6 步到 b1 时, pB 走了 6 步到 a1
// 继续走: 两人在 c1 相遇 (各走了 5+3=8 和 6+2=8)
// → 双方走过的总长度相等 = len(A) + len(B)

// ===== 哈希表法（简单但 O(n) 空间）=====
function getIntersectionNodeHash(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    const seen = new Set<ListNode>()
    let curr = headA
    while (curr) { seen.add(curr); curr = curr.next }
    curr = headB
    while (curr) {
        if (seen.has(curr)) return curr
        curr = curr.next
    }
    return null
}`

const reorderCode = `// ===== 重排链表 L0→Ln→L1→Ln-1...（LeetCode 143）=====
function reorderList(head: ListNode | null): void {
    if (!head || !head.next) return

    // Step 1: 快慢指针找中点（偏左）
    let slow: ListNode | null = head
    let fast: ListNode | null = head
    while (fast.next && fast.next.next) {
        slow = slow!.next
        fast = fast.next.next
    }

    // Step 2: 反转后半段
    let prev: ListNode | null = null, curr = slow!.next
    slow!.next = null  // 断开前后
    while (curr) {
        const next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    }

    // Step 3: 交叉合并
    let first: ListNode | null = head
    let second: ListNode | null = prev
    while (second) {
        const next1 = first!.next
        const next2 = second.next
        first!.next = second
        second.next = next1
        first = next1
        second = next2
    }
}
// 示例: 1→2→3→4  →  1→4→2→3
// 找中点: slow=2, 后半=3→4
// 反转: 4→3
// 合并: 1→4→2→3

// ===== 旋转链表（LeetCode 61）=====
function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (!head || !head.next || k === 0) return head

    // 1. 计算长度，同时把链表连成环
    let len = 1, tail: ListNode = head
    while (tail.next) { tail = tail.next; len++ }
    tail.next = head  // 成环

    // 2. 找新的断点：倒数第 (k % len) 个的前一个
    k = k % len
    let stepsToNewTail = len - k
    let newTail: ListNode = head
    for (let i = 1; i < stepsToNewTail; i++) {
        newTail = newTail.next!
    }

    // 3. 断开环
    const newHead = newTail.next
    newTail.next = null
    return newHead
}
// 示例: 1→2→3→4→5, k=2
// len=5, k=2, stepsToNewTail=3
// newTail=3, newHead=4→5→1→2→3→(null)
// 结果: 4→5→1→2→3`
</script>
