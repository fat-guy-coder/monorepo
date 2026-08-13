<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🗄️ LRU Cache 实现：HashMap + 双向链表</h1>
          <p class="text-sm text-slate-500 mt-1">最经典的链表工程应用——LeetCode 146</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-2-4</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：LRU Cache
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>HashMap</strong> 负责 O(1) 按 key 找到节点引用；<strong>双向链表</strong> 负责维护访问顺序——越靠 <strong>head 越新</strong>，越靠 <strong>tail 越旧</strong>。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 560 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="lr-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="lr-p" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
              </marker>
              <marker id="lr-map" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- HashMap 容器 -->
            <rect x="140" y="18" width="280" height="66" rx="8" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" />
            <text x="280" y="38" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">HashMap (key → 节点引用)</text>
            <text x="190" y="62" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">1 → n1</text>
            <text x="300" y="62" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">2 → n2</text>

            <!-- HashMap → 链表 映射（虚线） -->
            <line x1="190" y1="86" x2="190" y2="128" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#lr-map)" />
            <line x1="300" y1="86" x2="300" y2="128" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#lr-map)" />

            <!-- next 箭头（上，向右） -->
            <line x1="112" y1="150" x2="156" y2="150" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-n)" />
            <line x1="220" y1="150" x2="266" y2="150" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-n)" />
            <line x1="330" y1="150" x2="376" y2="150" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-n)" />
            <!-- prev 箭头（下，向左） -->
            <line x1="156" y1="170" x2="112" y2="170" stroke="#60a5fa" stroke-width="2" marker-end="url(#lr-p)" />
            <line x1="266" y1="170" x2="220" y2="170" stroke="#60a5fa" stroke-width="2" marker-end="url(#lr-p)" />
            <line x1="376" y1="170" x2="330" y2="170" stroke="#60a5fa" stroke-width="2" marker-end="url(#lr-p)" />

            <!-- head 哨兵 -->
            <rect x="60" y="130" width="52" height="60" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="86" y="150" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">head</text>
            <text x="86" y="172" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">(哨兵)</text>

            <!-- 节点 1 -->
            <rect x="160" y="130" width="60" height="60" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="190" y="146" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">next →</text>
            <text x="190" y="162" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1:A</text>
            <text x="190" y="178" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">← prev</text>

            <!-- 节点 2 -->
            <rect x="270" y="130" width="60" height="60" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="300" y="146" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">next →</text>
            <text x="300" y="162" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">2:B</text>
            <text x="300" y="178" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">← prev</text>

            <!-- tail 哨兵 -->
            <rect x="380" y="130" width="52" height="60" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="406" y="150" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">tail</text>
            <text x="406" y="172" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">(哨兵)</text>

            <!-- 图例 -->
            <text x="16" y="218" font-size="11" font-family="monospace" fill="#94a3b8">HashMap 存 key → 节点引用（O(1) 定位） · 越靠 head 越新，越靠 tail 越旧</text>
            <text x="16" y="238" font-size="11" font-family="monospace" fill="#94a3b8">→ next（灰） · ← prev（蓝） · 虚线 = 哨兵 / 映射</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：LRU 结构——HashMap 负责查找，双向链表负责新旧顺序</figcaption>
        </figure>

        <!-- 操作示意图：get 命中 moveToHead -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：get(2) 命中 —— moveToHead 移到最前</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">访问前（2 在中间）</p>
            <svg viewBox="0 0 340 110" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="lr-g1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <line x1="50" y1="55" x2="66" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-g1)" />
              <line x1="120" y1="55" x2="136" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-g1)" />
              <line x1="190" y1="55" x2="206" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-g1)" />
              <line x1="260" y1="55" x2="276" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-g1)" />
              <rect x="10" y="30" width="40" height="50" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="30" y="55" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">head</text>
              <rect x="70" y="30" width="50" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="95" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1:A</text>
              <rect x="140" y="30" width="50" height="50" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" />
              <text x="165" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">2:B</text>
              <text x="165" y="92" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#f59e0b">命中</text>
              <rect x="210" y="30" width="50" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="235" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">3:C</text>
              <rect x="280" y="30" width="40" height="50" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="300" y="55" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">tail</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">访问后（2 移到最前）</p>
            <svg viewBox="0 0 340 110" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="lr-g2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <line x1="50" y1="55" x2="66" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-g2)" />
              <line x1="120" y1="55" x2="136" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-g2)" />
              <line x1="190" y1="55" x2="206" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-g2)" />
              <line x1="260" y1="55" x2="276" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-g2)" />
              <rect x="10" y="30" width="40" height="50" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="30" y="55" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">head</text>
              <rect x="70" y="30" width="50" height="50" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="95" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">2:B</text>
              <text x="95" y="92" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#16a34a">最新</text>
              <rect x="140" y="30" width="50" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="165" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1:A</text>
              <rect x="210" y="30" width="50" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="235" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">3:C</text>
              <rect x="280" y="30" width="40" height="50" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="300" y="55" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">tail</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">moveToHead = removeNode(2) + addToHead(2)，O(1)</figcaption>
          </figure>
        </div>

        <!-- 操作示意图：put 满淘汰 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：put 满 —— 淘汰 tail 的前驱（最旧）</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">淘汰前（容量满，3 最旧）</p>
            <svg viewBox="0 0 340 110" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="lr-p1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <line x1="50" y1="55" x2="66" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-p1)" />
              <line x1="120" y1="55" x2="136" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-p1)" />
              <line x1="190" y1="55" x2="206" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-p1)" />
              <line x1="260" y1="55" x2="276" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-p1)" />
              <rect x="10" y="30" width="40" height="50" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="30" y="55" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">head</text>
              <rect x="70" y="30" width="50" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="95" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1:A</text>
              <rect x="140" y="30" width="50" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="165" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">2:B</text>
              <rect x="210" y="30" width="50" height="50" rx="6" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
              <text x="235" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">3:C</text>
              <text x="235" y="92" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#dc2626">最旧</text>
              <rect x="280" y="30" width="40" height="50" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="300" y="55" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">tail</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">淘汰后（3 移除，新节点插入头部）</p>
            <svg viewBox="0 0 340 130" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="lr-p2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <line x1="50" y1="55" x2="66" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-p2)" />
              <line x1="120" y1="55" x2="136" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-p2)" />
              <line x1="190" y1="55" x2="206" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-p2)" />
              <line x1="260" y1="55" x2="276" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#lr-p2)" />
              <rect x="10" y="30" width="40" height="50" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="30" y="55" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">head</text>
              <rect x="70" y="30" width="50" height="50" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="95" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">n:D</text>
              <text x="95" y="92" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#16a34a">新插入</text>
              <rect x="140" y="30" width="50" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="165" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1:A</text>
              <rect x="210" y="30" width="50" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="235" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">2:B</text>
              <rect x="280" y="30" width="40" height="50" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="300" y="55" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">tail</text>
              <rect x="250" y="96" width="70" height="26" rx="6" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="285" y="109" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ef4444">3:C 淘汰</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">removeTail = tail.prev，同时从 HashMap 删除该 key</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. LRU 概念 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          LRU 是什么？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>LRU（Least Recently Used，最近最少使用）</strong>是一种缓存淘汰策略。当缓存容量满了需要腾出空间时，它会<strong>淘汰最久没有被访问的数据</strong>。
          核心思想：如果一个数据最近被访问过，那么它将来被访问的概率也更高。
        </p>

        <h3 class="text-md font-semibold text-slate-700 mb-3">LRU 的四个基本操作</h3>
        <ol class="space-y-4 mb-4">
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>get(key)</strong>：如果 key 存在，返回值，并把该数据标记为"最近使用"；不存在返回 -1（或 null）。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>put(key, value)</strong>：如果 key 已存在，更新值并标记为"最近使用"；否则插入新数据。如果容量满了，先淘汰"最久未使用"的，再插入。</div>
          </li>
        </ol>

        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
          <h4 class="font-semibold text-slate-700 mb-2">直观示例（容量=2）</h4>
          <div class="font-mono text-xs space-y-1">
            <div>put(1, "A") → {1}  (最新=1, 最旧=1)</div>
            <div>put(2, "B") → {1, 2} (最新=2, 最旧=1)</div>
            <div>get(1) ["A"] → {2, 1} (最新=1, 最旧=2) ← 访问了1，被移到最新位置</div>
            <div>put(3, "C") → {1, 3} (淘汰最旧的2，插入3) ← 容量满了</div>
            <div>get(2) → -1  ← 已被淘汰</div>
          </div>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          LRU 在浏览器中无处不在——<strong>浏览器的前进/后退历史</strong>就是 LRU 的变体（后退栈 + 前进栈）。<br/>
          <strong>React useEffect 的 cleanup 顺序</strong>也是 LRU 思想：最近 mount 的 effect 的 cleanup 最先执行（prev dependencies 先清理）。<br/>
          <strong>浏览器图片缓存、HTTP 缓存、Service Worker Cache API</strong> 都涉及类似的淘汰策略。
          </p>
        </aside>
      </section>

      <!-- 2. 为什么 HashMap + 双向链表 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          为什么是 HashMap + 双向链表？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          LRU 要求两个看似矛盾的操作都达到 O(1)：
        </p>

        <div class="overflow-x-auto mb-6">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">操作</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">需求</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">HashMap 可以吗</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">链表可以吗</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">get(key) — 查找</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">✅ 天然 O(1)</td>
                <td class="px-4 py-2 border border-slate-200">❌ 需要 O(n) 遍历</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">标记为"最近使用"</td>
                <td class="px-4 py-2 border border-slate-200">O(1) 移到头部</td>
                <td class="px-4 py-2 border border-slate-200">❌ 无法表达顺序</td>
                <td class="px-4 py-2 border border-slate-200">✅ 双向链表 O(1)</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">淘汰最旧的</td>
                <td class="px-4 py-2 border border-slate-200">O(1) 删除尾部</td>
                <td class="px-4 py-2 border border-slate-200">❌ 不知道谁最旧</td>
                <td class="px-4 py-2 border border-slate-200">✅ tail.prev 就是</td>
              </tr>
              <tr>
                <td class="px-4 py-2 border border-slate-200 font-medium">put(key) — 更新</td>
                <td class="px-4 py-2 border border-slate-200">O(1)</td>
                <td class="px-4 py-2 border border-slate-200">✅</td>
                <td class="px-4 py-2 border border-slate-200">❌</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>结论：</strong>HashMap 擅长查找，双向链表擅长按顺序增删移动。两者结合——HashMap 的 value 存的是<strong>链表节点的引用</strong>，
          这样查找、插入、删除、移动全部 O(1)。
        </p>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 一句话总结：</strong>HashMap 提供 O(1) 的"按 key 找到节点"能力，双向链表提供 O(1) 的"按时间顺序增删移动"能力。缺一不可。</p>
        </aside>
      </section>

      <!-- 3. 数据结构设计 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          数据结构设计
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          使用<strong>虚拟头尾哨兵节点</strong>的双向链表，越靠近 head 的数据越"新"，越靠近 tail 的数据越"旧"。
          HashMap 中 value 存储的是链表节点的引用，使得 O(1) 定位后可以直接操作链表。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="codeDesign" title="LRUDesign.ts" />
        </div>

        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
          <h4 class="font-semibold text-slate-700 mb-2">内存布局示意（容量=3）</h4>
          <div class="font-mono text-xs">
            <div>HashMap:  { key1: ref→Node1, key2: ref→Node2, key3: ref→Node3 }</div>
            <div>链表:     head ⟷ [Node1:key1,v1] ⟷ [Node2:key2,v2] ⟷ [Node3:key3,v3] ⟷ tail</div>
            <div class="text-slate-500 mt-1">           ↑ 最新                        ↑ 最旧</div>
            <div class="text-slate-500">          head.next                    tail.prev</div>
          </div>
        </div>
      </section>

      <!-- 4. 完整实现 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          完整实现：get 和 put 都是 O(1)
        </h2>

        <div class="mb-4">
          <Code language="ts" :code="codeLRU" title="LRUCache.ts" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">get(key) 的执行流程</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>HashMap.get(key)：如果不存在，返回 -1</li>
          <li>如果存在，拿到了节点 node</li>
          <li>调用 moveToHead(node)：把该节点从链表中移除再插到头部</li>
          <li>返回 node.val</li>
        </ol>

        <h3 class="text-md font-semibold text-slate-700 mb-3">put(key, val) 的执行流程</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>HashMap.get(key)：检查 key 是否已存在</li>
          <li>如果已存在：更新 node.val，moveToHead(node)</li>
          <li>如果不存在：创建新节点，addToHead(node)，HashMap.set(key, node)</li>
          <li>检查 size > capacity：如果超了，删除 tail.prev（最旧节点），同时从 HashMap 中删除</li>
        </ol>
      </section>

      <!-- 5. 辅助方法详解 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          辅助方法详解 —— 链表的"原子操作"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          LRU Cache 的实现高度依赖三个辅助方法。理清它们是理解整个 LRU 的关键。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">addToHead(node)</h4>
            <p class="text-sm text-slate-600">在虚拟头节点后面插入。因为 head 是哨兵，代码无需判空。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">removeNode(node)</h4>
            <p class="text-sm text-slate-600">从链表中摘除节点（绕过它）。需要改动前后节点的指针。</p>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">moveToHead(node)</h4>
            <p class="text-sm text-slate-600">组合拳：removeNode + addToHead。访问了某个已存在节点时调用。</p>
          </div>
        </div>

        <div class="mb-4">
          <Code language="ts" :code="codeHelpers" title="helperMethods.ts" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱：为什么节点里要存 key？</strong><br/>
          淘汰尾部节点时，需要从 HashMap 中删除对应的 key。如果节点只存了 val，你得遍历整个 HashMap 去找 key——O(n)。<br/>
          节点存 key 后，从 tail.prev 拿到节点，直接用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">node.key</code> 从 HashMap 删除，O(1)。</p>
        </aside>
      </section>

      <!-- 6. 前端类比与实际应用 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          前端中的 LRU —— 不止于面试
        </h2>

        <div class="space-y-4">
          <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
            <p class="text-sm text-purple-800"><strong>🔗 浏览器前进/后退：</strong><br/>
            浏览器维护两个栈（后退栈 + 前进栈）。每次访问新页面，清空前进栈，新页面入后退栈。后退时从后退栈 pop 入前进栈。<br/>
            这本质是 LRU 的变体——最近访问的总在最容易到达的位置。
            </p>
          </aside>

          <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
            <p class="text-sm text-purple-800"><strong>🔗 React useEffect Cleanup：</strong><br/>
            当依赖数组变化时，React 先执行<strong>上一个 effect 的 cleanup</strong>，再执行新的 effect。cleanup 顺序遵循"最新 mount 的最先清理"——和 LRU 中淘汰最旧的正好是对偶思想。
            </p>
          </aside>

          <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
            <p class="text-sm text-purple-800"><strong>🔗 图片懒加载 + 缓存池：</strong><br/>
            前端虚拟列表中的 DOM 复用池、KeepAlive 组件的缓存上限（Vue）、Service Worker 缓存策略——当缓存数量达到上限时，LRU 是默认的淘汰策略。
            </p>
          </aside>
        </div>
      </section>

      <!-- 7. 常见面试追问 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          面试常问的延伸问题
        </h2>

        <div class="space-y-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">Q: 为什么不用数组实现？</h4>
            <p class="text-sm text-slate-600">数组的 unshift/shift 是 O(n)，而链表是 O(1)。即使 JavaScript 的 splice 也是 O(n)。</p>
          </div>

          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">Q: 为什么不用单向链表？</h4>
            <p class="text-sm text-slate-600">删除尾部节点时，单向链表需要 O(n) 找到 tail 的前驱（因为不能从 tail.prev 直接拿）。双向链表 O(1) 就能拿到前驱。</p>
          </div>

          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">Q: LFU（Least Frequently Used）和 LRU 有什么区别？</h4>
            <p class="text-sm text-slate-600">LRU 按"最近使用时间"淘汰，LFU 按"使用频率"淘汰。LRU 适合短期热点（如新闻 feed），LFU 适合长期热点（如热门文章）。LFU 的实现更复杂，通常需要 HashMap + 频次双向链表。</p>
          </div>

          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">Q: 如何让 LRU 线程安全？</h4>
            <p class="text-sm text-slate-600">JavaScript 是单线程的，天然线程安全。在多线程语言（Java/Go）中，需要对 HashMap 和链表操作加读写锁（如 ReentrantReadWriteLock），或使用 ConcurrentHashMap + ConcurrentLinkedDeque。</p>
          </div>
        </div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：LRU 的 get 与 put
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">越靠<strong>左越新</strong>（head 侧），越靠<strong>右越旧</strong>（tail 侧）。<strong>get 命中 → moveToHead</strong>；<strong>put → 插到头部，容量满则淘汰最旧的 tail 前驱</strong>。</p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 数据: {{ lruNodes.length - 2 }} / {{ LRU_CAP }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ lruStatus }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">⏱️ get/put 均 O(1)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="lruGet" :disabled="lruBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:shadow-sm disabled:opacity-40">get(随机key)</button>
          <button @mousedown="lruPut" :disabled="lruBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">put(新key)</button>
          <button @mousedown="lruReset" :disabled="lruBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="lruBox" class="w-full relative overflow-x-auto" :style="{height:lruH+'px'}">
          <v-stage :config="{width:lruW, height:lruH}">
            <v-layer>
              <v-arrow v-for="(n,i) in lruNodes.slice(0,-1)" :key="'a'+n.id" :config="lruArrow(i)" />
              <v-rect v-for="n in lruNodes" :key="n.id" :config="lruR(n)" />
              <v-text v-for="n in lruNodes" :key="'t'+n.id" :config="lruT(n)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 8. 总结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          关键点总结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>LRU = 淘汰最久未使用的数据。</strong>当缓存满时，踢出 tail.prev。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>HashMap → O(1) 查找；双向链表 → O(1) 移动/删除。</strong>两者结合实现全 O(1)。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>使用<strong>虚拟头尾哨兵节点</strong>消除所有边界判断。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>三个辅助方法：addToHead、removeNode、moveToHead（= remove + add）。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>链表节点必须存 key</strong>，才能在淘汰时 O(1) 从 HashMap 删除。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>get 命中后要 moveToHead；put 新数据后要检查容量。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>这是 LeetCode 146，也是前端缓存（KeepAlive、Service Worker、虚拟列表缓存池）的底层原理。</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-3-dummy" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：哑节点技巧</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-2-linkedlist/dsa-2-2-algorithms/dsa-2-2-5-reverse" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：链表算法实战 →</RouterLink>
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
  { id: "sec-1", name: "LRU 是什么" },
  { id: "sec-2", name: "HashMap+双向链表" },
  { id: "sec-3", name: "数据结构设计" },
  { id: "sec-4", name: "完整实现 O(1)" },
  { id: "sec-5", name: "辅助方法详解" },
  { id: "sec-6", name: "前端类比" },
  { id: "sec-7", name: "面试追问" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-8", name: "总结" },
]

// ===== 🎬 LRU 动画 =====
const lruC={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b',text:'#1e293b',muted:'#94a3b8',ghost:'#e2e8f0',blue:'#60a5fa'}
const lruW=ref(700), lruH=ref(200)
const LRW=56, LRH2=34, LRGAP=92, LRNY=100, LRBX=24
const LRU_CAP=3
interface LRNode { id:number; key:number; val:number; kind:'head'|'data'|'tail'; color:string; s:number; x:number }
const lruNodes=reactive<LRNode[]>([])
const lruBusy=ref(false), lruStatus=ref(''), lruNid=ref(10)
const lruBox=ref<HTMLDivElement>()
const d4=(ms:number)=>new Promise(r=>setTimeout(r,ms))
function lruLayout(){ lruNodes.forEach((n,i)=>{ n.x=LRBX+i*LRGAP }) }
function lruInit(){ lruNodes.length=0; lruNodes.push({id:-1,key:-1,val:-1,kind:'head',color:lruC.muted,s:1,x:0}); [{k:1,v:11},{k:2,v:22}].forEach((o,i)=>lruNodes.push({id:i+1,key:o.k,val:o.v,kind:'data',color:lruC.cyan,s:1,x:0})); lruNodes.push({id:-2,key:-1,val:-1,kind:'tail',color:lruC.muted,s:1,x:0}); lruLayout() }
function lruR(n:any){ const s=n.s??1; const isSent=n.kind!=='data'; return {x:n.x+(LRW*(1-s))/2, y:LRNY+(LRH2*(1-s))/2, width:LRW*s, height:LRH2*s, fill:isSent?lruC.ghost:n.color, cornerRadius:6, stroke:isSent?'#94a3b8':'#64748b', strokeWidth:1.5, dash:isSent?[4,3]:undefined, shadowColor:'rgba(0,0,0,.1)', shadowBlur:4, shadowOffsetY:2} }
function lruT(n:any){ const s=n.s??1; const label=n.kind==='head'?'head':n.kind==='tail'?'tail':`${n.key}:${n.val}`; return {x:n.x+(LRW*(1-s))/2, y:LRNY+(LRH2*(1-s))/2, width:LRW*s, height:LRH2*s, text:label, fontSize:n.kind==='data'?13:12, fontFamily:'monospace', fontStyle:n.kind==='data'?'bold':'normal', fill:n.kind==='data'?lruC.text:lruC.muted, align:'center', verticalAlign:'middle'} }
function lruArrow(i:number){ const a=lruNodes[i],b=lruNodes[i+1]; return {points:[a.x+LRW, LRNY, b.x, LRNY], fill:lruC.muted, stroke:lruC.muted, strokeWidth:2, pointerLength:7, pointerWidth:5} }
async function lruAct(msg:string,fn:()=>Promise<void>){ if(lruBusy.value)return; lruBusy.value=true; lruStatus.value=msg; try{await fn()}catch(_){}; await d4(300); lruBusy.value=false; lruStatus.value='' }
function lruGet(){ const data=lruNodes.filter(n=>n.kind==='data'); if(!data.length)return; const pick=data[~~(Math.random()*data.length)]; lruAct(`get(${pick.key}) 命中 → moveToHead  O(1)`, async()=>{ const idx=lruNodes.indexOf(pick); pick.color=lruC.orange; await d4(300); pick.s=0; pick.color=lruC.ghost; lruLayout(); await d4(250); lruNodes.splice(idx,1); const fresh:LRNode={id:lruNid.value++,key:pick.key,val:pick.val,kind:'data',color:lruC.green,s:0,x:0}; lruNodes.splice(1,0,fresh); lruLayout(); await d4(60); fresh.s=1; lruLayout(); await d4(450); fresh.color=lruC.cyan }) }
function lruPut(){ const key=lruNid.value; lruAct(`put(${key}) 插入 → 容量检查  O(1)`, async()=>{ const nb:LRNode={id:lruNid.value++,key,val:~~(Math.random()*90+10),kind:'data',color:lruC.green,s:0,x:0}; lruNodes.splice(1,0,nb); lruLayout(); await d4(60); nb.s=1; lruLayout(); await d4(400); nb.color=lruC.cyan; if(lruNodes.length-2>LRU_CAP){ const old=lruNodes[lruNodes.length-2]; lruStatus.value=`容量满(${LRU_CAP}) 淘汰最旧 key=${old.key}`; old.color=lruC.red; await d4(350); old.s=0; old.color=lruC.ghost; lruLayout(); await d4(250); lruNodes.splice(lruNodes.length-2,1); lruLayout() } }) }
function lruReset(){ lruBusy.value=false; lruInit() }
let roLRU:ResizeObserver|null=null
onMounted(()=>{ lruInit(); if(lruBox.value){ lruW.value=lruBox.value.clientWidth; roLRU=new ResizeObserver(e=>{const w=e[0]?.contentRect.width; if(w&&w>200) lruW.value=Math.max(420,w)}); roLRU.observe(lruBox.value) }})
onUnmounted(()=>roLRU?.disconnect())

const codeDesign = `// 链表节点
class CacheNode {
  key: number
  val: number
  prev: CacheNode | null = null
  next: CacheNode | null = null

  constructor(key: number, val: number) {
    this.key = key
    this.val = val
  }
}

// LRU 结构骨架
class LRUCache {
  private capacity: number
  private map: Map<number, CacheNode>
  private head: CacheNode  // 虚拟头哨兵
  private tail: CacheNode  // 虚拟尾哨兵

  constructor(capacity: number) {
    this.capacity = capacity
    this.map = new Map()

    // 初始化哨兵：head <-> tail
    this.head = new CacheNode(-1, -1)
    this.tail = new CacheNode(-1, -1)
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  // 链表头部 = 最新，尾部 = 最旧
  // head <-> ...新...旧... <-> tail
}`

const codeLRU = `class LRUCache {
  private capacity: number
  private map: Map<number, CacheNode>
  private head: CacheNode
  private tail: CacheNode

  constructor(capacity: number) {
    this.capacity = capacity
    this.map = new Map()
    this.head = new CacheNode(-1, -1)
    this.tail = new CacheNode(-1, -1)
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  get(key: number): number {
    const node = this.map.get(key)
    if (!node) return -1           // 未命中
    this.moveToHead(node)          // 标记为最近使用
    return node.val
  }

  put(key: number, val: number): void {
    const existing = this.map.get(key)
    if (existing) {
      existing.val = val           // 更新值
      this.moveToHead(existing)    // 标记为最近使用
    } else {
      const node = new CacheNode(key, val)
      this.addToHead(node)
      this.map.set(key, node)

      // 容量检查：超了淘汰最旧的
      if (this.map.size > this.capacity) {
        const lru = this.removeTail()
        this.map.delete(lru.key)
      }
    }
  }

  // ========== 辅助方法 ==========

  private addToHead(node: CacheNode): void {
    node.prev = this.head
    node.next = this.head.next
    this.head.next!.prev = node
    this.head.next = node
  }

  private removeNode(node: CacheNode): void {
    node.prev!.next = node.next
    node.next!.prev = node.prev
  }

  private moveToHead(node: CacheNode): void {
    this.removeNode(node)
    this.addToHead(node)
  }

  private removeTail(): CacheNode {
    const node = this.tail.prev!
    this.removeNode(node)
    return node
  }
}
// 所有操作都是 O(1)！
// get O(1):  HashMap.get + moveToHead = O(1)
// put O(1):  HashMap.get/set + addToHead + removeTail = O(1)`

const codeHelpers = `// addToHead(node)：把节点插到虚拟头后面
// 改动 4 个指针 —— 顺序不要错
private addToHead(node: CacheNode): void {
  //       head <-> first
  // 变成: head <-> node <-> first
  node.prev = this.head           // ① node 连 head
  node.next = this.head.next      // ② node 连 first
  this.head.next!.prev = node     // ③ first.prev 指向 node
  this.head.next = node           // ④ head.next 指向 node
}

// removeNode(node)：绕过 node，从链表中摘除
// 改动 2 个指针
private removeNode(node: CacheNode): void {
  // ... prev <-> node <-> next ...
  // 变成: ... prev <-> next ...
  node.prev!.next = node.next     // 前驱跳过 node
  node.next!.prev = node.prev     // 后继指回前驱
  // node.prev 和 node.next 保持原样没关系
  // 反正在被再次 addToHead 时会重新设置
}

// moveToHead(node)：访问已有节点时调用
// = removeNode + addToHead
private moveToHead(node: CacheNode): void {
  this.removeNode(node)
  this.addToHead(node)
}

// removeTail()：淘汰最旧节点（tail 的前驱）
private removeTail(): CacheNode {
  const node = this.tail.prev!
  this.removeNode(node)
  return node  // 返回以便从 map 中删除 key
}`
</script>
