<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🏆 锦标赛排序：胜者树选择</h1>
          <p class="text-sm text-slate-500 mt-1">用「淘汰赛」逐轮选出最小 —— 选择排序的 O(n log n) 升级版</p>
        </div>
        <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-4-5</span>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">📐</span>
          结构总览：胜者树（Winner Tree）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          锦标赛排序把 <strong>n 个元素看成 n 个选手</strong>，两两「比赛」（比较大小），较小者晋级，形成一棵
          <strong>完全二叉树</strong>：<strong>叶子 = 元素</strong>，<strong>内部节点 = 该子树的最小值</strong>，<strong>根 = 冠军（全局最小）</strong>。
          取出冠军后，把它换成 +∞ 出局，<strong>只沿冠军路径向上重赛</strong>，下一轮最小值就出现了 —— 每轮只需 O(log n)。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="14" y="20" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">胜者树：叶子 = 元素，内部节点 = 每场比赛胜者（较小者），根 = 冠军（全局最小）</text>

            <!-- 连线：叶子 → 第 1 轮 -->
            <line x1="100" y1="168" x2="60" y2="197" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="100" y1="168" x2="140" y2="197" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="260" y1="168" x2="220" y2="197" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="260" y1="168" x2="300" y2="197" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="420" y1="168" x2="380" y2="197" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="420" y1="168" x2="460" y2="197" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="580" y1="168" x2="540" y2="197" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="580" y1="168" x2="620" y2="197" stroke="#94a3b8" stroke-width="1.5" />
            <!-- 连线：第 1 轮 → 第 2 轮 -->
            <line x1="180" y1="113" x2="100" y2="132" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="180" y1="113" x2="260" y2="132" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="500" y1="113" x2="420" y2="132" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="500" y1="113" x2="580" y2="132" stroke="#94a3b8" stroke-width="1.5" />
            <!-- 连线：第 2 轮 → 冠军 -->
            <line x1="340" y1="58" x2="180" y2="97" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="340" y1="58" x2="500" y2="97" stroke="#94a3b8" stroke-width="1.5" />
            <!-- 冠军路径（虚线橙） -->
            <line x1="340" y1="58" x2="180" y2="97" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 4" />
            <line x1="180" y1="113" x2="260" y2="132" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 4" />
            <line x1="260" y1="168" x2="300" y2="197" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 4" />

            <!-- 行标签 -->
            <text x="14" y="215" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">叶子</text>
            <text x="14" y="150" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">第1轮</text>
            <text x="14" y="95" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">第2轮</text>
            <text x="14" y="42" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">冠军</text>

            <!-- 叶子：5 3 8 1 9 4 2 7 -->
            <circle cx="60" cy="215" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="60" y="215" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <circle cx="140" cy="215" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="140" y="215" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <circle cx="220" cy="215" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="220" y="215" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <circle cx="300" cy="215" r="18" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="300" y="215" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
            <circle cx="380" cy="215" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="380" y="215" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <circle cx="460" cy="215" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="460" y="215" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <circle cx="540" cy="215" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="540" y="215" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <circle cx="620" cy="215" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="620" y="215" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>

            <!-- 第 1 轮胜者：3 1 4 2 -->
            <circle cx="100" cy="150" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="100" y="150" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <circle cx="260" cy="150" r="18" fill="#f59e0b" stroke="#b45309" stroke-width="2" />
            <text x="260" y="150" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <circle cx="420" cy="150" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="420" y="150" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <circle cx="580" cy="150" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="580" y="150" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>

            <!-- 第 2 轮胜者：1 2 -->
            <circle cx="180" cy="95" r="18" fill="#f59e0b" stroke="#b45309" stroke-width="2" />
            <text x="180" y="95" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <circle cx="500" cy="95" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="500" y="95" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>

            <!-- 冠军 -->
            <circle cx="340" cy="40" r="20" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="340" y="40" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：8 个元素建胜者树 —— 第 1 轮 4 场比赛、第 2 轮 2 场、决赛 1 场，冠军 = 1（绿）。橙虚线 = 冠军路径</figcaption>
        </figure>

        <!-- before / after -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：取出冠军 1 → 沿路径重赛</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">取出冠军前：1 是冠军，路径已高亮</p>
            <svg viewBox="0 0 340 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="8" y="16" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">胜者树（8 片叶子）</text>
              <!-- 连线 -->
              <line x1="38" y1="121" x2="20" y2="161" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="38" y1="121" x2="56" y2="161" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="110" y1="121" x2="92" y2="161" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 4" />
              <line x1="110" y1="121" x2="128" y2="161" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 4" />
              <line x1="182" y1="121" x2="164" y2="161" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="182" y1="121" x2="200" y2="161" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="254" y1="121" x2="236" y2="161" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="254" y1="121" x2="272" y2="161" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="74" y1="81" x2="38" y2="107" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 4" />
              <line x1="74" y1="81" x2="110" y2="107" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="218" y1="81" x2="182" y2="107" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="218" y1="81" x2="254" y2="107" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="146" y1="41" x2="74" y2="67" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 4" />
              <line x1="146" y1="41" x2="218" y2="67" stroke="#94a3b8" stroke-width="1.5" />
              <!-- 叶子：5 3 8 1 9 4 2 7 -->
              <circle cx="20" cy="175" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="20" y="175" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <circle cx="56" cy="175" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="56" y="175" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <circle cx="92" cy="175" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="92" y="175" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <circle cx="128" cy="175" r="13" fill="#4ade80" stroke="#22c55e" stroke-width="2" /><text x="128" y="175" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
              <circle cx="164" cy="175" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="164" y="175" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <circle cx="200" cy="175" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="200" y="175" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <circle cx="236" cy="175" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="236" y="175" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <circle cx="272" cy="175" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="272" y="175" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <!-- 第 1 轮：3 1 4 2 -->
              <circle cx="38" cy="121" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="38" y="121" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <circle cx="110" cy="121" r="13" fill="#f59e0b" stroke="#b45309" stroke-width="2" /><text x="110" y="121" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <circle cx="182" cy="121" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="182" y="121" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <circle cx="254" cy="121" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="254" y="121" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <!-- 第 2 轮：1 2 -->
              <circle cx="74" cy="81" r="13" fill="#f59e0b" stroke="#b45309" stroke-width="2" /><text x="74" y="81" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <circle cx="218" cy="81" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="218" y="81" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <!-- 冠军 -->
              <circle cx="146" cy="41" r="15" fill="#4ade80" stroke="#22c55e" stroke-width="2" /><text x="146" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">冠军 = 1（绿）。冠军路径 = 叶子 1 → 第1轮节点 → 第2轮节点 → 根（橙虚线）</figcaption>
          </figure>

          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">取出冠军后：1 变 +∞，只沿路径重赛 → 新冠军 2</p>
            <svg viewBox="0 0 340 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="8" y="16" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">重赛后：新冠军 = 2（绿）</text>
              <!-- 连线 -->
              <line x1="38" y1="121" x2="20" y2="161" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="38" y1="121" x2="56" y2="161" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="110" y1="121" x2="92" y2="161" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 4" />
              <line x1="110" y1="121" x2="128" y2="161" stroke="#ef4444" stroke-width="1.5" />
              <line x1="182" y1="121" x2="164" y2="161" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="182" y1="121" x2="200" y2="161" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="254" y1="121" x2="236" y2="161" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 4" />
              <line x1="254" y1="121" x2="272" y2="161" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="74" y1="81" x2="38" y2="107" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="74" y1="81" x2="110" y2="107" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 4" />
              <line x1="218" y1="81" x2="182" y2="107" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="218" y1="81" x2="254" y2="107" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 4" />
              <line x1="146" y1="41" x2="74" y2="67" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 4" />
              <line x1="146" y1="41" x2="218" y2="67" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 4" />
              <!-- 叶子：5 3 8 ∞ 9 4 2 7 -->
              <circle cx="20" cy="175" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="20" y="175" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <circle cx="56" cy="175" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="56" y="175" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <circle cx="92" cy="175" r="13" fill="#f59e0b" stroke="#b45309" stroke-width="2" /><text x="92" y="175" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <circle cx="128" cy="175" r="13" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" /><text x="128" y="175" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ef4444">∞</text>
              <circle cx="164" cy="175" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="164" y="175" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <circle cx="200" cy="175" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="200" y="175" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <circle cx="236" cy="175" r="13" fill="#f59e0b" stroke="#b45309" stroke-width="2" /><text x="236" y="175" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <circle cx="272" cy="175" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="272" y="175" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <!-- 第 1 轮：3 8 4 2 -->
              <circle cx="38" cy="121" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="38" y="121" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <circle cx="110" cy="121" r="13" fill="#f59e0b" stroke="#b45309" stroke-width="2" /><text x="110" y="121" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <circle cx="182" cy="121" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="182" y="121" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <circle cx="254" cy="121" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="254" y="121" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <!-- 第 2 轮：3 2 -->
              <circle cx="74" cy="81" r="13" fill="#f59e0b" stroke="#b45309" stroke-width="2" /><text x="74" y="81" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <circle cx="218" cy="81" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="218" y="81" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <!-- 新冠军 -->
              <circle cx="146" cy="41" r="15" fill="#4ade80" stroke="#22c55e" stroke-width="2" /><text x="146" y="41" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">8 与 ∞ 比赛 → 8 胜（橙）；3 与 8 → 3 胜；3 与 2 → 新冠军 2（绿）。全程只比较冠军路径上的节点</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1 排序思想 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          排序思想：把「找最小」从 O(n) 降到 O(log n)
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          选择排序慢在<strong>每一轮都要全量扫描</strong>找最小：n 轮 × O(n) = O(n²)。
          锦标赛排序的思路是：<strong>把比较结果用一棵树存下来</strong>，第一轮建树花 O(n)，
          之后每次取最小只重赛 <strong>冠军路径上的 log n 个节点</strong>，于是总代价变成 O(n log n)。
        </p>

        <ol class="space-y-3 text-slate-600 text-sm mb-4 list-none">
          <li class="flex items-start gap-2"><span class="w-6 h-6 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">1</span><span><strong>看成选手：</strong>把 n 个元素当作 n 个选手（叶子），每个选手初始就是自己的「最小」。</span></li>
          <li class="flex items-start gap-2"><span class="w-6 h-6 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">2</span><span><strong>两两比赛：</strong>相邻选手两两比较，<strong>较小者晋级</strong>，晋级者继续与同轮其他胜者比赛，直到决出唯一冠军 —— 冠军就是全局最小。整轮建树共 n - 1 次比较。</span></li>
          <li class="flex items-start gap-2"><span class="w-6 h-6 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">3</span><span><strong>冠军出列：</strong>输出冠军（最小元素），把它在树中的叶子置为 +∞ —— 它以后永远「打不过」任何人。</span></li>
          <li class="flex items-start gap-2"><span class="w-6 h-6 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">4</span><span><strong>沿路径重赛：</strong>只有冠军那条路径上的节点需要重新比较（其他子树结果完全没变！），每轮只花 O(log n)。重复 n 轮，全部有序。</span></li>
        </ol>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          锦标赛排序 ≈ <strong>单败淘汰赛制</strong>：世界杯/电竞联赛就是先分组两两淘汰，冠军出炉后，下一届只补进新队伍、
          <strong>重赛冠军所在的那条对阵线</strong>，而不是把所有比赛重新打一遍。<br/>
          从算法角度看，它是「<strong>选择排序 + 树</strong>」的杂交：选择排序负责「每轮取出最小」，树负责「用 log n 次比较就找到最小」。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>把锦标赛排序理解成「每轮重新全量扫描找最小」——
          那是选择排序，O(n²)。锦标赛排序的关键恰恰是<strong>树保留了所有历史比较结果</strong>，出局一个选手后
          只需重赛一条路径；如果你每轮都重建整棵树，复杂度又会退化回 O(n²)，白费了树的功夫。</p>
        </aside>
      </section>

      <!-- 2 胜者树结构 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          胜者树结构：一棵「记仇」的完全二叉树
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          胜者树是<strong>完全二叉树</strong>，三个角色各司其职：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">角色</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">存储内容</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">数量</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">叶子</td><td class="px-4 py-2 border border-slate-200">元素本身（或其下标）</td><td class="px-4 py-2 border border-slate-200">n</td><td class="px-4 py-2 border border-slate-200">初始选手；冠军出局后置 +∞</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">内部节点</td><td class="px-4 py-2 border border-slate-200">两个孩子的胜者（较小者）</td><td class="px-4 py-2 border border-slate-200">n - 1</td><td class="px-4 py-2 border border-slate-200">「记住」子树的比较结果</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">根</td><td class="px-4 py-2 border border-slate-200">冠军（全局最小）</td><td class="px-4 py-2 border border-slate-200">1</td><td class="px-4 py-2 border border-slate-200">每轮直接读根即可输出最小</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">数组怎么存一棵树？</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          不用指针，用<strong>数组 + 下标公式</strong>就能表示完全二叉树（和堆的存法一样）：
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">tree[p*2]</code> 是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">tree[p]</code> 的左孩子，
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">tree[p*2+1]</code> 是右孩子。数组里存的是<strong>叶子下标</strong>而不是值本身 —— 这样重赛时能沿着下标一路走到根。
        </p>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>下标从 0 开始（<code class="bg-amber-100 px-1 rounded text-xs font-mono">tree[0]</code> 当根），
          那么左孩子是 <code class="bg-amber-100 px-1 rounded text-xs font-mono">2p+1</code>、右孩子是 <code class="bg-amber-100 px-1 rounded text-xs font-mono">2p+2</code>，
          公式容易记混，且 <code class="bg-amber-100 px-1 rounded text-xs font-mono">tree[0]</code> 被浪费。<strong>从 1 开始存内部节点</strong>，父子公式统一为 2p / 2p+1，重赛路径 <code class="bg-amber-100 px-1 rounded text-xs font-mono">pos = Math.floor(pos / 2)</code> 一路向上，代码更不容易出错。</p>
        </aside>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>把 n 向上取整到 <strong>2 的幂</strong>（<code class="bg-emerald-100 px-1 rounded text-xs font-mono">size = 1 &lt;&lt; Math.ceil(Math.log2(n))</code>），
          多出来的叶子填 -1 哨兵（表示空位）。这样树是严格的完全二叉树，重赛路径固定 log n 层，不需要处理「缺一条腿」的边界情况。</p>
        </aside>
      </section>

      <!-- 3 实现 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          实现：数组存胜者树，三步搞定
        </h2>

        <h3 class="text-base font-semibold text-slate-700 mb-3">第 1 步：建树</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          叶子放元素下标，然后<strong>自底向上</strong>两两比较，把较小者的下标写进父节点。一共 n - 1 次比较，O(n)。
        </p>
        <div class="mb-4">
          <Code language="ts" :code="buildWinnerTreeCode" title="buildWinnerTree.ts" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">第 2 步：取出冠军 + 沿路径重赛</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          根就是冠军。输出它之后把叶子置 +∞，然后<strong>只从冠军的父亲开始向上重赛</strong> —— 每条路径只有 log n 层。
        </p>
        <div class="mb-4">
          <Code language="ts" :code="extractMinCode" title="extractMin.ts" />
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          胜者树就是一个<strong>优先级队列</strong>：前端任务调度（如「最早到期先执行」的定时器、Vue 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">nextTick</code> 队列）每次都要取「最小/最紧急」的任务。
          用数组暴力找最小是 O(n)，用胜者树/堆是 O(log n)。<strong>胜者树特别适合「候选集只变一点点」的场景</strong>：k 个有序输入流
          各出一个候选，每次取走冠军后只更新它所在的那一路 —— 这正是<strong>多路归并排序（外部排序）</strong>的底层结构。
          </p>
        </aside>

        <h3 class="text-base font-semibold text-slate-700 mb-3">第 3 步：完整排序 + 与选择排序对比</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          循环 n 次「取冠军」即可。把它和选择排序并排看，差距一目了然：
        </p>
        <div class="mb-4">
          <Code language="ts" :code="selectionCompareCode" title="compare-with-selection.ts" />
        </div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对比项</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">选择排序</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">锦标赛排序</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">每轮找最小</td><td class="px-4 py-2 border border-slate-200">全量扫描 O(n)</td><td class="px-4 py-2 border border-slate-200">沿路径重赛 O(log n)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">历史比较结果</td><td class="px-4 py-2 border border-slate-200">全部丢弃</td><td class="px-4 py-2 border border-slate-200">存在树里复用</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">总时间</td><td class="px-4 py-2 border border-slate-200 text-red-600 font-medium">O(n²)</td><td class="px-4 py-2 border border-slate-200 text-green-600 font-medium">O(n log n)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">额外空间</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">O(n)（树数组）</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>重赛时把整棵胜者树重建一遍。正确做法是<strong>只沿着冠军叶子到根的路径更新</strong>（约 log n 个节点）；
          全树重建会让每轮回到 O(n)，整体退化为 O(n²)。另外，比较时务必写 <code class="bg-amber-100 px-1 rounded text-xs font-mono">&lt;=</code>（左胜）而不是 <code class="bg-amber-100 px-1 rounded text-xs font-mono">&lt;</code>，
          否则相等元素会反复换边，破坏稳定性。</p>
        </aside>
      </section>

      <!-- 4 复杂度 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          复杂度：最坏也是 O(n log n)，但空间要多花 O(n)
        </h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">指标</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">锦标赛排序</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">最好</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200">建树 O(n) + n 轮 × O(log n)，与数据分布无关</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">平均</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200">—</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">最坏</td><td class="px-4 py-2 border border-slate-200 text-green-600 font-medium">O(n log n)</td><td class="px-4 py-2 border border-slate-200">没有快排那种 O(n²) 退化，最坏也有保证</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">空间</td><td class="px-4 py-2 border border-slate-200">O(n)</td><td class="px-4 py-2 border border-slate-200">胜者树数组约 2 × 2^⌈log₂n⌉ 个槽位</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">稳定性</td><td class="px-4 py-2 border border-slate-200">可稳定</td><td class="px-4 py-2 border border-slate-200">用 &lt;= 比较，相等时下标小者胜，等价元素不换位</td></tr>
            </tbody>
          </table>
        </div>

        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>建树代价：</strong>n 个叶子，内部节点 n - 1 个，每节点 1 次比较 → 恰好 n - 1 次比较。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>每轮重赛：</strong>树高 ⌈log₂n⌉，冠军出局后只更新根到冠军叶子的路径 → 每轮 O(log n)。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>总计：</strong>(n - 1) + n × ⌈log₂n⌉ = <strong>O(n log n)</strong>，无论输入是否有序，表现恒定。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>代价对比：</strong>比选择排序快一档，但空间 O(n) 且常数因子比堆排序大 —— 这是它「教学价值高、工程出场率低」的原因。</span></li>
        </ul>
      </section>

      <!-- 5 优缺点与适用场景 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          优缺点与适用场景：教学明星，工程配角
        </h2>

        <h3 class="text-base font-semibold text-slate-700 mb-3">✅ 优点</h3>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span><strong>最坏 O(n log n) 有保证：</strong>不依赖数据分布，没有快排的退化风险。</span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span><strong>可稳定：</strong>用 &lt;= 并让相等时下标小者晋级，就能保持相对顺序。</span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span><strong>天然支持「增量取最小」：</strong>冠军出局后只需更新一条路径，非常适合多路归并、外部排序（置换选择、k 路归并）。</span></li>
          <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span><strong>可并行：</strong>每场比赛相互独立，可以并行建树。</span></li>
        </ul>

        <h3 class="text-base font-semibold text-slate-700 mb-3">❌ 缺点</h3>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>额外 O(n) 空间：</strong>树数组约 2n 槽位，不适合内存受限场景。</span></li>
          <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>常数因子大：</strong>同是 O(n log n)，堆排序/归并排序通常更快，工程上很少用它做全量排序。</span></li>
          <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>实现复杂度：</strong>下标公式、2 的幂补齐、路径重赛，都比插入/选择排序难写对。</span></li>
        </ul>

        <h3 class="text-base font-semibold text-slate-700 mb-3">🎯 适用场景</h3>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>外部排序 / 多路归并：</strong>内存放不下全部数据时，用胜者树在 k 个有序文件块之间反复取最小 —— 这是它最重要的实战舞台。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>需要最坏情况保证 + 可稳定的场景：</strong>不能接受 O(n²) 退化，又没有额外顾虑时。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>「锦标赛」本身：</strong>赛事排程、比较判定问题，结构语义与业务一一对应。</span></li>
        </ul>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 工程建议：</strong>普通内存排序：要稳定选归并、要省内存选堆排、通用选 Timsort/内省排序；<strong>只有当「候选集每次只换一个元素」且要反复取最小</strong>（如 k 路归并的胜者循环）时，胜者树才真正不可替代。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">🎬</span>
          动画演示：建树 → 出冠军 → 沿路径重赛
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          左侧为主区（胜者树中的选手，橙色 = 正在比赛），右侧为已排序区（绿色，按从小到大排列）。
          流程：<strong>① 两两建树（橙色比赛）→ ② 冠军出列（绿色移入已排序区）→ ③ 沿冠军路径重赛，只比较路径上的节点</strong>（胜者不变的组自动跳过）。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ bars.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔍 比较: {{ cmp }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔁 交换: {{ swp }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @click="runTournament" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">🏆 锦标赛排序</button>
          <button @click="resetDemo" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}"><v-stage :config="{width: W, height: H}"><v-layer>
          <v-line :config="zoneDividerCfg()" />
          <v-text :config="zoneLabelCfg()" />
          <v-rect v-for="b in bars" :key="b.id" :config="barCfg(b)" />
          <v-text v-for="b in bars" :key="'vt'+b.id" :config="valCfg(b)" />
          <v-text v-for="(b,i) in bars" :key="'it'+b.id" :config="idxCfg(i)" />
          <v-rect v-for="(v,i) in sorted" :key="'s'+i" :config="sortedCfg(i)" />
          <v-text v-for="(v,i) in sorted" :key="'st'+i" :config="sortedValCfg(i)" />
        </v-layer></v-stage></div>
        <p class="text-xs text-slate-400 mt-2">🔁 交换计数在此处表示「冠军移入已排序区」的次数；锦标赛排序本身不做交换，只有移出操作。</p>
      </section>

      <!-- 📋 小结 -->
      <section id="sec-summary" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>一句话：</strong>把「选最小」组织成一场淘汰赛 —— 建树 O(n)，之后每轮只重赛冠军路径 O(log n)，总 O(n log n)。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>结构：</strong>叶子 = 元素，内部节点 = 胜者下标，根 = 冠军；数组下标 1 起存，父子公式 2p / 2p+1。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>关键操作：</strong>冠军出列 → 叶子置 +∞ → 从父节点沿路径向上重赛（只 log n 层，绝不全树重建）。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>工程定位：</strong>教学价值高、可稳定、最坏有保证；实战舞台是<strong>外部排序的 k 路归并</strong>，普通内存排序选它不如堆排/归并。</span></li>
        </ul>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 记忆钩子：</strong>锦标赛排序 = 「选择排序 + 胜者树」；冠军出局只重赛一条路径；O(n log n) 且可稳定，但空间 O(n) —— 下一节看 <strong>Tim 排序</strong>如何把「数据已部分有序」的红利吃到极致。</p>
        </aside>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-4-more-sorts/dsa-7-4-4-comb" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：梳排序：gap 递减的冒泡改进</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-4-more-sorts/dsa-7-4-6-timsort" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：Tim排序：插入+归并的工业级排序 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "1 排序思想" },
  { id: "sec-2", name: "2 胜者树结构" },
  { id: "sec-3", name: "3 数组实现" },
  { id: "sec-4", name: "4 复杂度" },
  { id: "sec-5", name: "5 优缺点与场景" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-summary", name: "📋 小结" },
]

// ===== 🎬 锦标赛排序动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const cmp = ref(0), swp = ref(0)
interface Bar { id:number; val:number; color:string; s?:number; _x?:number; _y?:number; _h?:number }
const bars = reactive<Bar[]>([])
const sorted = ref<number[]>([])
const BASE = 280, MXH = 220, BW = 46, G = 8
const CAP = 8  // 主区槽位数 = 初始元素数

// —— 布局（主区 8 槽 + 已排序区 8 槽，并排）——
function slotBw() { return Math.min(BW, Math.floor((W.value - 30) / (CAP * 2) - G)) }
function zoneX() { return 10 + CAP * (slotBw() + G) + 14 }
function layout() {
  const bw = slotBw()
  const maxV = Math.max(...bars.map(b => b.val), ...sorted.value, 1)
  bars.forEach((b, i) => {
    b._x = 10 + i * (bw + G)
    b._h = Math.max(28, (b.val / maxV) * MXH)
    b._y = BASE - b._h
  })
}
function barCfg(b:any){ const s=b.s??1, bw=slotBw(); return { x:b._x+(bw*(1-s))/2, y:b._y, width:bw*s, height:b._h*s, fill:b.color, cornerRadius:[4,4,0,0], stroke:'#94a3b8', strokeWidth:1, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 } }
function valCfg(b:any){ const s=b.s??1, h=b._h*s, bw=slotBw(); return { x:b._x+(bw*(1-s))/2, y:b._y+2, width:bw*s, height:h-4, text:String(b.val), fontSize:14, fontFamily:'monospace', fontStyle:'bold', fill:h>30?'#fff':C.text, align:'center', verticalAlign:'middle' } }
function idxCfg(i:number){ const bw=slotBw(); return { x:bars[i]._x??0, y:BASE+6, width:bw, text:'['+i+']', fontSize:10, fontFamily:'monospace', fill:C.muted, align:'center' } }
function sortedCfg(i:number){
  const bw = slotBw()
  const maxV = Math.max(...bars.map(b => b.val), ...sorted.value, 1)
  const h = Math.max(28, (sorted.value[i] / maxV) * MXH)
  return { x: zoneX() + i * (bw + G), y: BASE - h, width: bw, height: h, fill: C.green, cornerRadius: [4,4,0,0], stroke: '#22c55e', strokeWidth: 1, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function sortedValCfg(i:number){
  const bw = slotBw()
  const maxV = Math.max(...bars.map(b => b.val), ...sorted.value, 1)
  const h = Math.max(28, (sorted.value[i] / maxV) * MXH)
  return { x: zoneX() + i * (bw + G), y: BASE - h + 2, width: bw, height: h - 4, text: String(sorted.value[i]), fontSize: 14, fontFamily: 'monospace', fontStyle: 'bold', fill: h > 30 ? '#fff' : C.text, align: 'center', verticalAlign: 'middle' }
}
function zoneDividerCfg(){ const x = zoneX() - 7; return { points: [x, 18, x, BASE + 34], stroke: C.ghost, strokeWidth: 1.5, dash: [4, 4] } }
function zoneLabelCfg(){ return { x: zoneX(), y: 12, text: '已排序区', fontSize: 11, fontFamily: 'monospace', fontStyle: 'bold', fill: C.green } }
function colorAt(i:number, c:string){ if (bars[i]) bars[i].color = c }
function allCyan(){ bars.forEach(b => b.color = C.cyan) }
function initArr(vals:number[] = [5,3,8,1,9,4,2,7]) {
  bars.splice(0)
  sorted.value.splice(0)
  vals.forEach((v, i) => bars.push({ id: i + 1, val: v, color: C.cyan, s: 1 }))
  cmp.value = 0; swp.value = 0
  layout()
}
async function act(msg:string, label:string, fn:()=>Promise<void>){
  if (busy.value) return
  busy.value = true
  status.value = msg
  opLabel.value = label
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

// —— 胜者树（括号结构）——
function bracketLevels(vals: number[]): { idx: number[][]; val: number[][] } {
  const idx: number[][] = []
  const val: number[][] = []
  let group: number[] = []
  for (let i = 0; i < vals.length; i += 2) group.push(i)
  idx.push(group); val.push(group.map(i => vals[i]))
  while (group.length > 1) {
    const next: number[] = []
    for (let i = 0; i < group.length; i += 2) {
      if (i + 1 >= group.length) { next.push(group[i]); continue }
      const a = group[i], b = group[i + 1]
      next.push(vals[a] <= vals[b] ? a : b)
    }
    idx.push(next); val.push(next.map(i => vals[i]))
    group = next
  }
  return { idx, val }
}

// 逐层比赛：prev 为 null 表示建树（全量比赛）；否则只重赛胜者变化的组
async function animateLevels(lev: { idx: number[][]; val: number[][] }, prev: { idx: number[][]; val: number[][] } | null) {
  for (let lv = 0; lv < lev.idx.length; lv++) {
    const group = lev.idx[lv]
    let skipped = 0
    for (let g = 0; g < group.length; g += 2) {
      const a = group[g], b = group[g + 1]
      if (b === undefined) { status.value = '↪️ 轮空：自动晋级'; await d(140); continue }
      // 与上一轮同槽位胜者比较，胜者没变 → 不在冠军路径上，跳过
      if (prev && prev.val[lv] && prev.val[lv][g] === lev.val[lv][g]) { skipped++; continue }
      colorAt(a, C.orange); colorAt(b, C.orange)
      cmp.value++
      status.value = `⚔️ 第 ${lv + 1} 层比赛：${bars[a].val} vs ${bars[b].val}`
      await d(360)
      const win = bars[a].val <= bars[b].val ? a : b
      const lose = win === a ? b : a
      colorAt(lose, C.ghost); await d(150)
      colorAt(win, C.green); await d(280)
      colorAt(a, C.cyan); colorAt(b, C.cyan)
    }
    if (skipped > 0) { status.value = `✔ 第 ${lv + 1} 层有 ${skipped} 组胜者未变，跳过（不在冠军路径上）`; await d(200) }
  }
}

async function runTournament() {
  await act('🏆 锦标赛排序：建树 → 出冠军 → 沿路径重赛', '锦标赛排序', async () => {
    initArr()
    await d(300)
    // ① 建树：全量两两比赛
    status.value = '① 建树：叶子两两比赛，较小者晋级（橙 = 比赛中）'
    const vals = () => bars.map(b => b.val)
    let prev = bracketLevels(vals())
    await animateLevels(prev, null)
    let champ = prev.idx[prev.idx.length - 1][0]
    status.value = `🏆 建树完成：冠军 = ${bars[champ].val}（全局最小）`
    await d(650)

    // ② 输出冠军 + ③ 沿路径重赛，循环到只剩 1 个
    let round = 0
    while (bars.length > 1) {
      round++
      colorAt(champ, C.green)
      status.value = `🏆 第 ${round} 轮：冠军 ${bars[champ].val} 出列 → 已排序区（绿）`
      await d(400)
      sorted.value.push(bars[champ].val)
      swp.value++
      bars.splice(champ, 1)
      layout()
      await d(250)
      // 重赛：只比较冠军路径上的节点
      const cur = bracketLevels(vals())
      status.value = `⏱️ 第 ${round} 轮重赛：沿冠军路径向上比较（未变化的组自动跳过）`
      await animateLevels(cur, prev)
      prev = cur
      champ = cur.idx[cur.idx.length - 1][0]
    }
    // 最后一个元素直接进入已排序区
    sorted.value.push(bars[0].val)
    swp.value++
    bars.splice(0)
    layout()
    status.value = '✅ 排序完成：n 轮 × O(log n) 沿路径重赛 = O(n log n)'
    await d(650)
  })
}

function resetDemo() {
  if (busy.value) return
  initArr()
  status.value = ''
  opLabel.value = ''
}

let ro: ResizeObserver | null = null
onMounted(() => {
  initArr()
  if (box.value) {
    W.value = box.value.clientWidth
    layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 💻 代码示例（展示用，转义内层模板字符串）=====
const buildWinnerTreeCode = `// 建胜者树：叶子 = 元素，内部节点 = 两子中较小者的下标
// 数组：下标 1..2k-1 存内部节点，2k..2k+n-1 存叶子（k = 2 的幂 ≥ n）
function buildWinnerTree(vals: number[]): number[] {
  const n = vals.length
  const size = 1 << Math.ceil(Math.log2(n))   // 补齐到 2 的幂
  const tree: number[] = new Array(size * 2).fill(-1)
  // 1) 叶子层：tree[size + i] = 元素下标 i
  for (let i = 0; i < n; i++) tree[size + i] = i
  // 2) 自底向上两两比赛，胜者（较小者）晋级
  for (let p = size - 1; p >= 1; p--) {
    const l = tree[p * 2], r = tree[p * 2 + 1]
    tree[p] = (r === -1 || vals[l] <= vals[r]) ? l : r
  }
  return tree   // tree[1] = 冠军（最小元素）的下标
}`

const extractMinCode = `// 取出冠军，并沿冠军路径重赛（关键：只重赛 log n 个节点！）
function extractMin(tree: number[], vals: number[], size: number): number {
  let pos = tree[1]            // 冠军叶子下标
  const minVal = vals[pos]
  vals[pos] = Infinity         // 冠军出局：叶子置 +∞，永远不再胜出
  pos = Math.floor((size + pos) / 2)   // 从冠军的父亲开始向上
  while (pos >= 1) {
    const l = tree[pos * 2], r = tree[pos * 2 + 1]
    tree[pos] = (r === -1 || vals[l] <= vals[r]) ? l : r
    pos = Math.floor(pos / 2)          // 只走这一条路径
  }
  return minVal
}

// 完整锦标赛排序：n 次「取冠军」
function tournamentSort(vals: number[]): number[] {
  const size = 1 << Math.ceil(Math.log2(vals.length))
  const tree = buildWinnerTree(vals)
  const result: number[] = []
  for (let i = 0; i < vals.length; i++) {
    result.push(extractMin(tree, vals, size))   // 每轮 O(log n)
  }
  return result
}`

const selectionCompareCode = `// 选择排序：每轮全量扫描找最小 —— 每轮 O(n)
function selectionSort(arr: number[]): void {
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j   // ← 每轮都从头扫到尾
    }
    [arr[i], arr[min]] = [arr[min], arr[i]]
  }
}

// 对比：锦标赛排序把「找最小」从 O(n) 降到 O(log n)
// 选择排序:   n 轮 × O(n) 扫描          = O(n²)
// 锦标赛排序: n 轮 × O(log n) 沿路径重赛 = O(n log n)
// 代价：锦标赛排序需要 O(n) 的胜者树数组存储中间结果`
</script>

<style scoped></style>
