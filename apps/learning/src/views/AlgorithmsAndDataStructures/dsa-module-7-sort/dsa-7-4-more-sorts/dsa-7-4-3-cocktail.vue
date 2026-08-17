<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🍸 鸡尾酒排序：双向冒泡</h1>
          <p class="text-sm text-slate-500 mt-1">正向冒最大、反向冒最小 —— 摇酒器式的双向交替</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-4-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：正反向交替，两端同时收拢
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>鸡尾酒排序</strong>（双向冒泡）：一轮内先<strong>从左到右</strong>把最大值冒到右端（橙色箭头），
          再<strong>从右到左</strong>把最小值冒到左端（蓝色箭头）——两端各就位一个元素，边界 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[left, right]</code> 同时收拢。
          相比冒泡，「最小值在尾部」时不用等 n 轮，一趟反向就能把它送回家。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ck-fwd" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
              <marker id="ck-back" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#60a5fa" />
              </marker>
            </defs>
            <text x="16" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">鸡尾酒排序：正向冒最大（橙）、反向冒最小（蓝）—— 一轮两端各就位一个</text>

            <!-- 左：一轮往返 -->
            <rect x="24" y="52" width="290" height="132" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
            <text x="169" y="70" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">一轮往返（正向 + 反向）</text>
            <line x1="40" y1="92" x2="290" y2="92" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#ck-fwd)" />
            <text x="300" y="90" font-size="10" font-family="monospace" fill="#d97706">正向</text>
            <rect x="40" y="104" width="44" height="50" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="62" y="129" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="92" y="144" width="44" height="10" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="114" y="149" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="144" y="114" width="44" height="40" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="166" y="134" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="196" y="134" width="44" height="20" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="218" y="144" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="248" y="74" width="44" height="80" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="270" y="114" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <line x1="290" y1="160" x2="40" y2="160" stroke="#60a5fa" stroke-width="2.5" marker-end="url(#ck-back)" />
            <text x="300" y="164" font-size="10" font-family="monospace" fill="#3b82f6">反向</text>
            <text x="169" y="178" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">left → 正向 → right；right → 反向 → left</text>

            <!-- 右：一轮后 -->
            <rect x="384" y="52" width="312" height="132" rx="10" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5" />
            <text x="540" y="70" text-anchor="middle" font-size="11" font-family="monospace" fill="#16a34a">一轮之后：两端同时就位</text>
            <rect x="400" y="144" width="44" height="10" fill="#4ade80" stroke="#16a34a" stroke-width="2" rx="3" />
            <text x="422" y="149" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
            <rect x="452" y="134" width="44" height="20" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="474" y="144" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="504" y="114" width="44" height="40" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="526" y="134" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="556" y="104" width="44" height="50" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="578" y="129" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="608" y="74" width="44" height="80" fill="#4ade80" stroke="#16a34a" stroke-width="2" rx="3" />
            <text x="630" y="114" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
            <text x="540" y="178" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">1 冒到左端、8 冒到右端 → 边界 [1,3] 继续下一轮</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：一轮 = 正向（最大到右端）+ 反向（最小到左端），两端边界同时收拢</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：一轮往返（两端就位） / 反向解决「最小值在尾部」</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">一轮往返：1 与 8 同时就位</p>
            <svg viewBox="0 0 300 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ck-a1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a" />
                </marker>
              </defs>
              <text x="8" y="16" font-size="10" font-family="monospace" fill="#64748b">一轮前</text>
              <rect x="10" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="30" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="58" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="78" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="106" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="126" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="154" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="174" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="202" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="222" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <line x1="140" y1="60" x2="140" y2="80" stroke="#16a34a" stroke-width="2" marker-end="url(#ck-a1)" />
              <text x="8" y="96" font-size="10" font-family="monospace" fill="#64748b">一轮后（双向）</text>
              <rect x="10" y="106" width="40" height="26" rx="3" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="30" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
              <rect x="58" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="78" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="106" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="126" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="154" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="174" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="202" y="106" width="40" height="26" rx="3" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="222" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
              <text x="8" y="152" font-size="10" font-family="monospace" font-weight="bold" fill="#16a34a">1、8 同时就位，边界各收一格 ✓</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">一轮处理两个元素 —— 比冒泡「一轮一个」翻倍</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">加速场景：最小值在尾部，反向一趟送回家</p>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ck-a2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a" />
                </marker>
              </defs>
              <text x="8" y="16" font-size="10" font-family="monospace" fill="#64748b">几乎有序，只有最小值 1 在尾部</text>
              <rect x="10" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="30" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="58" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="78" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="106" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="126" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="154" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="174" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="202" y="26" width="40" height="26" rx="3" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" />
              <text x="222" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <line x1="140" y1="60" x2="140" y2="80" stroke="#16a34a" stroke-width="2" marker-end="url(#ck-a2)" />
              <text x="8" y="96" font-size="10" font-family="monospace" fill="#64748b">冒泡：1 每轮只挪一格 → 要 5 轮</text>
              <rect x="10" y="106" width="40" height="26" rx="3" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="30" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
              <rect x="58" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="78" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="106" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="126" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="154" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="174" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="202" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="222" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <text x="8" y="152" font-size="10" font-family="monospace" font-weight="bold" fill="#16a34a">鸡尾酒：反向一趟把 1 送回家 → 只要 1 轮 ✓</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">反向扫描专门解决「乌龟」（尾部小元素走得慢）</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 思想 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          思想：冒泡的正反向交替
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          冒泡的「乌龟问题」：<strong>小元素每轮只能向前挪一格</strong>——如果最小值在数组尾部，
          要跑 n 轮才能到队头。鸡尾酒排序的改进很简单：<strong>一轮里来回两趟</strong>——
          正向把最大值冒到右端，反向把最小值冒到左端。这样<strong>每一轮两端各就位一个元素</strong>，
          轮数约为冒泡的一半，且「最小值在尾部」的场景一趟反向就解决。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>维护双边界 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">left</code>（左端已就位）与 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">right</code>（右端已就位）</li>
          <li><strong>正向趟</strong>：从 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">left</code> 扫到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">right</code>，相邻前大后小就交换 → 最大值到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">right</code></li>
          <li><strong>反向趟</strong>：从 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">right</code> 扫回 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">left</code>，相邻前大后小就交换 → 最小值到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">left</code></li>
          <li><code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">left++ / right--</code> 收拢边界，重复直到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">left ≥ right</code></li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          鸡尾酒 ≈ <strong>摇酒器来回晃动</strong>：调酒师把酒液从这边晃到那边、再晃回来——双向搅拌，比单向更快混合均匀。<br/>
          双向的意义 ≈ <strong>队伍两头同时安排</strong>：既把最重的放到队尾，又把最轻的放到队头，
          一趟处理两个「极端」——而不是像冒泡那样只照顾队尾。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 1：反向趟的上界写错</strong><br/>
          反向趟从 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">right</code> 扫到 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">left+1</code>（比较 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">a[i]</code> 与 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">a[i-1]</code>）。
          写成 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">i &gt; left</code> 没错，但若写成 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">i &gt;= left</code>，
          会访问 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">a[left-1]</code>（越界）或把已就位的 left 又拉进比较。</p>
        </aside>
      </section>

      <!-- 2. 实现 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          实现：双边界 left / right 收缩
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          主体是一个 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">while (left &lt; right)</code> 循环，
          内部先正向、后反向各一趟。正向趟结束后 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">right--</code>，
          反向趟结束后 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">left++</code>——边界像两张对开的门同时合拢。
        </p>
        <div class="mb-4"><Code language="ts" :code="cocktailBasicCode" title="cocktail_basic.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          双边界 ≈ <strong>双指针打扫卫生</strong>：左指针从左往右扫、右指针从右往左扫，两头干净的区间越来越大，
          中间待打扫的区间越来越小，直到两个指针相遇。<br/>
          先正向再反向 ≈ <strong>来回擦拭桌面</strong>：先从左擦到右（把大颗粒推到右边），
          再从右擦到左（把小碎屑推到左边），一趟顶两趟。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 2：忘了同步更新两个边界</strong><br/>
          只 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">right--</code> 却忘了 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">left++</code>（或反过来），
          边界就只收拢一头——退化成单向冒泡还多跑一趟，既没有速度优势还更慢。</p>
        </aside>
      </section>

      <!-- 3. 带提前终止的双向 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          带提前终止的双向版本（flag）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          与冒泡一样，鸡尾酒也能用 <strong>flag</strong> 提前终止：某一趟<strong>没有任何交换</strong>就说明数组已有序，
          立即跳出。注意要<strong>两趟各一个 flag</strong>：正向趟无交换可以立刻结束（数组已有序）；
          反向趟无交换同样结束。叠加「记录最后交换位置」还能让边界收缩更快（见第 5 节）。
        </p>
        <div class="mb-4"><Code language="ts" :code="cocktailFlagCode" title="cocktail_flag.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          双向 flag ≈ <strong>两边巡检都打卡</strong>：从左边查到右边没人违规、从右边查到左边也没人违规——
          两边都太平，就可以收工了。<br/>
          提前终止 ≈ <strong>摇酒器里已经摇匀</strong>：晃过去没变化、晃回来也没变化，说明液体已经均匀，
          不用再浪费时间继续晃。</p>
        </aside>
      </section>

      <!-- 4. 复杂度与特性 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          复杂度：最坏 O(n²)，空间 O(1)，稳定
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>最好情况</strong>：近似有序（带 flag）→ O(n)。<br/>
          <strong>最坏情况</strong>：逆序 → 每趟都要交换，比较约 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">n²/2</code> 次 → <strong>O(n²)</strong>，
          但轮数约为冒泡的一半（每轮解决两端两个元素）。<br/>
          <strong>空间 O(1)</strong> 原地；<strong>稳定性 ✅</strong>（相邻交换 + 相等不交换，与冒泡同理）。<br/>
          典型加速场景：<strong>几乎有序但最小值在尾部</strong>（如 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[2,3,4,5,1]</code>）——
          冒泡要 n 轮，鸡尾酒 1 轮反向就完成。
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-2">⏱️ 复杂度</p>
            <ul class="text-xs text-slate-600 space-y-1 font-mono">
              <li>最好（近似有序+flag）：O(n)</li>
              <li>平均：O(n²)</li>
              <li>最坏（逆序）：O(n²)</li>
              <li>轮数：约 n/2（每轮两端各就位一个）</li>
              <li>空间：O(1) 原地</li>
              <li>稳定性：✅ 稳定（相邻交换）</li>
            </ul>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-2">✅ 三件事</p>
            <ul class="text-xs text-slate-600 space-y-1">
              <li>▸ <strong>一轮</strong>：正向冒最大 + 反向冒最小</li>
              <li>▸ <strong>边界</strong>：left++ / right-- 同时收拢</li>
              <li>▸ <strong>优化</strong>：双向 flag 提前终止；lastSwap 加速收边</li>
            </ul>
          </div>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>「几乎有序 + 有元素明显在错误的一端」→ 鸡尾酒排序一轮就能修正；
          数据杂乱的大数组别指望它——它仍是 O(n²)，快排/归并才是正解。</p>
        </aside>
      </section>

      <!-- 5. 优缺点 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          优缺点与边界优化（lastSwap 收边）
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <p class="text-sm font-semibold text-emerald-700 mb-2">👍 优点</p>
            <ul class="text-xs text-emerald-800 space-y-1">
              <li>▸ 缓解「乌龟问题」：尾部小元素一趟反向就位</li>
              <li>▸ 每轮两端各就位一个 → 轮数约为冒泡一半</li>
              <li>▸ 稳定 ✅、原地 O(1)、可提前终止</li>
              <li>▸ 对「几乎有序 + 两端有错位」数据非常快</li>
            </ul>
          </div>
          <div class="bg-red-50 rounded-xl p-4 border border-red-200">
            <p class="text-sm font-semibold text-red-600 mb-2">👎 缺点</p>
            <ul class="text-xs text-red-700 space-y-1">
              <li>▸ 最坏仍是 O(n²)，常数比冒泡略大（来回两趟）</li>
              <li>▸ 对随机数据提升有限，远不如快排/归并</li>
              <li>▸ 比冒泡多一倍代码量，教学上稍复杂</li>
              <li>▸ 仍无法解决「中间元素来回摆」的抖动</li>
            </ul>
          </div>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>边界优化（记录每趟最后交换位置）</strong>：与冒泡的 lastSwap 同理——
          正向趟记录最后交换的下标 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">lastR</code>，反向趟记录 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">lastL</code>，
          下一轮边界直接收到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">lastR</code> / <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">lastL</code>——
          两端同时跳过已有序的区间，省掉无效扫描。
        </p>
        <div class="mb-4"><Code language="ts" :code="cocktailBoundCode" title="cocktail_bound.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          lastSwap 收边 ≈ <strong>两头同时「截短」队伍</strong>：正向趟发现后面一段已经整齐，右边界直接收到最后混乱处；
          反向趟发现前面一段整齐，左边界同样收到最右的混乱处——两头夹击，无效检查越来越少。<br/>
          适用场景 ≈ <strong>修正「两端错位」的列表</strong>：比如成绩单大体有序、只有第一名掉到末尾，鸡尾酒一趟搞定。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：把鸡尾酒当成快排的替代品</strong><br/>
          鸡尾酒只是冒泡的改良，复杂度量级没变（O(n²)）。看到 10 万级数据、随机分布，
          请直接快排 / 归并 / 内置 sort——鸡尾酒在随机数据上依然会卡死。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：鸡尾酒排序（双向冒泡）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          橙色 = 正向趟扫描（从左到右），蓝色 = 反向趟扫描（从右到左），红色 = 正在交换，
          绿色 = 两端已就位。一轮结束后左右边界同时收拢。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ bars.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔍 比较: {{ cmp }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔁 交换: {{ swp }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
          <span v-if="result" class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">{{ result }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="runCocktail" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">🍸 鸡尾酒排序</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-rect v-for="b in bars" :key="b.id" :config="barCfg(b)" />
              <v-text v-for="b in bars" :key="'vt'+b.id" :config="valCfg(b)" />
              <v-text v-for="(b,i) in bars" :key="'it'+b.id" :config="idxCfg(i)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 📋 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>思想</strong>：正向冒最大到右端 + 反向冒最小到左端，一轮两端各就位一个</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>边界</strong>：left++ / right-- 双边界同时收拢；可加 lastSwap 跳过有序区间</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度</strong>：最好 O(n)（flag），平均/最坏 O(n²)，空间 O(1)，稳定 ✅</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>优势</strong>：解决冒泡的「乌龟问题」——最小值在尾部时，反向一趟就位，冒泡要 n 轮</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>局限</strong>：仍是 O(n²)，随机大数据用快排/归并；只适合小数据与「两端错位」场景</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>路线</strong>：下一节「梳排序」用更大的 gap 一步消除长距离逆序，进一步摆脱 O(n²)</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-4-more-sorts/dsa-7-4-2-selection" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：选择排序：每次选出最小元素</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-4-more-sorts/dsa-7-4-4-comb" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：梳排序：gap 递减的冒泡改进 →</RouterLink>
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
  { id: "sec-1", name: "思想：双向交替" },
  { id: "sec-2", name: "双边界实现" },
  { id: "sec-3", name: "带提前终止" },
  { id: "sec-4", name: "复杂度与特性" },
  { id: "sec-5", name: "优缺点/lastSwap" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "📋 小结" },
]

// ===== 🎬 鸡尾酒排序动画（柱状图）=====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const result = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const cmp = ref(0), swp = ref(0)

interface Bar { id:number; val:number; color:string; s?:number; _x?:number; _y?:number; _h?:number }
const bars = reactive<Bar[]>([])
const BASE = 280, MXH = 220, BW = 46, G = 8

function initArr(vals: number[] = [5, 3, 8, 1, 9, 4, 2, 7]) {
  bars.splice(0)   // ⚠️ splice(0)
  vals.forEach((v, i) => bars.push({ id: i + 1, val: v, color: C.cyan, s: 1 }))
  cmp.value = 0; swp.value = 0; result.value = ''
  layout()
}
function layout() {
  const n = bars.length, bw = Math.min(BW, Math.floor((W.value - 20) / (n || 1) - G))
  const total = n * (bw + G) - G, sx = Math.max(10, (W.value - total) / 2), maxV = Math.max(...bars.map(b => b.val), 1)
  bars.forEach((b, i) => { b._x = sx + i * (bw + G); b._h = Math.max(28, (b.val / maxV) * MXH); b._y = BASE - b._h })
}
function barCfg(b: any) {
  const s = b.s ?? 1, bw = Math.min(BW, Math.floor((W.value - 20) / (bars.length || 1) - G))
  return { x: b._x + (bw * (1 - s)) / 2, y: b._y, width: bw * s, height: b._h * s, fill: b.color, cornerRadius: [4, 4, 0, 0],
    stroke: '#94a3b8', strokeWidth: 1, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function valCfg(b: any) {
  const s = b.s ?? 1, h = b._h * s, bw = Math.min(BW, Math.floor((W.value - 20) / (bars.length || 1) - G))
  return { x: b._x + (bw * (1 - s)) / 2, y: b._y + 2, width: bw * s, height: h - 4, text: String(b.val), fontSize: 14,
    fontFamily: 'monospace', fontStyle: 'bold', fill: h > 30 ? '#fff' : C.text, align: 'center', verticalAlign: 'middle' }
}
function idxCfg(i: number) {
  const bw = Math.min(BW, Math.floor((W.value - 20) / (bars.length || 1) - G))
  return { x: bars[i]._x ?? 0, y: BASE + 6, width: bw, text: '[' + i + ']', fontSize: 10, fontFamily: 'monospace', fill: C.muted, align: 'center' }
}
function colorAt(i: number, c: string) { if (bars[i]) bars[i].color = c }
function allCyan() { bars.forEach(b => b.color = C.cyan) }
async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch (_) { /* 忽略中断 */ }
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

// 鸡尾酒排序：双向冒泡 + flag 提前终止
async function cocktailSort() {
  let left = 0, right = bars.length - 1
  let round = 0
  while (left < right) {
    round++
    let swapped = false
    // 正向趟：把最大值冒到 right（橙色）
    for (let i = left; i < right; i++) {
      cmp.value++
      colorAt(i, C.orange); colorAt(i + 1, C.orange)
      status.value = `第 ${round} 轮正向 [${left}→${right}]：比较 [${i}] 与 [${i + 1}]`
      await d(290)
      if (bars[i].val > bars[i + 1].val) {
        swp.value++
        colorAt(i, C.red); colorAt(i + 1, C.red)
        status.value = `${bars[i].val} > ${bars[i + 1].val} → 交换`
        await d(300)
        const t = { ...bars[i] }; bars[i] = { ...bars[i + 1] }; bars[i + 1] = t
        layout()
        swapped = true
        await d(260)
      }
      colorAt(i, C.cyan)
    }
    colorAt(right, C.green)
    right--
    if (!swapped) {
      for (let k = 0; k <= right; k++) colorAt(k, C.green)
      status.value = `✅ 正向趟无交换 → 已有序，提前终止（共 ${round} 轮）`
      await d(600)
      result.value = `提前终止：共 ${round} 轮`
      return
    }
    await d(220)
    // 反向趟：把最小值冒到 left（蓝色）
    swapped = false
    for (let i = right; i > left; i--) {
      cmp.value++
      colorAt(i, C.blue); colorAt(i - 1, C.blue)
      status.value = `第 ${round} 轮反向 [${right}←${left}]：比较 [${i}] 与 [${i - 1}]`
      await d(290)
      if (bars[i].val < bars[i - 1].val) {
        swp.value++
        colorAt(i, C.red); colorAt(i - 1, C.red)
        status.value = `${bars[i].val} < ${bars[i - 1].val} → 交换`
        await d(300)
        const t = { ...bars[i] }; bars[i] = { ...bars[i - 1] }; bars[i - 1] = t
        layout()
        swapped = true
        await d(260)
      }
      colorAt(i, C.cyan)
    }
    colorAt(left, C.green)
    left++
    if (!swapped) {
      for (let k = left; k <= right; k++) colorAt(k, C.green)
      status.value = `✅ 反向趟无交换 → 已有序，提前终止（共 ${round} 轮）`
      await d(600)
      result.value = `提前终止：共 ${round} 轮`
      return
    }
    await d(220)
  }
  result.value = `排序完成：比较 ${cmp.value} 次，交换 ${swp.value} 次`
}

function runCocktail() { act('鸡尾酒排序执行中…', '双向冒泡 O(n²) / 最好 O(n)', cocktailSort) }
function doReset() { if (busy.value) return; initArr() }

let ro: ResizeObserver | null = null
onMounted(() => {
  initArr()
  if (box.value) {
    W.value = box.value.clientWidth; layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const cocktailBasicCode = `// ===== 鸡尾酒排序：双向冒泡（基础版）=====
function cocktailSort(arr: number[]): number[] {
  const a = [...arr]
  let left = 0, right = a.length - 1
  while (left < right) {
    // 正向趟：最大值冒到 right
    for (let i = left; i < right; i++) {
      if (a[i] > a[i + 1]) {
        const t = a[i]; a[i] = a[i + 1]; a[i + 1] = t
      }
    }
    right--                                    // 右边界收一格
    // 反向趟：最小值冒到 left
    for (let i = right; i > left; i--) {
      if (a[i] < a[i - 1]) {
        const t = a[i]; a[i] = a[i - 1]; a[i - 1] = t
      }
    }
    left++                                     // 左边界收一格
  }
  return a
}
// 一轮 = 正向 + 反向：两端各就位一个元素
// 例：[2,3,4,5,1] —— 冒泡要 5 轮，鸡尾酒反向一趟就完成
console.log(\`鸡尾酒结果：\${cocktailSort([5, 1, 4, 2, 8]).join(',')}\`)
// 输出：鸡尾酒结果：1,2,4,5,8`

const cocktailFlagCode = `// ===== 鸡尾酒排序：带提前终止（双向 flag）=====
function cocktailSortFlag(arr: number[]): number[] {
  const a = [...arr]
  let left = 0, right = a.length - 1
  while (left < right) {
    let swapped = false
    for (let i = left; i < right; i++) {       // 正向趟
      if (a[i] > a[i + 1]) {
        const t = a[i]; a[i] = a[i + 1]; a[i + 1] = t
        swapped = true
      }
    }
    right--
    if (!swapped) break                        // 正向无交换 → 已有序
    swapped = false
    for (let i = right; i > left; i--) {       // 反向趟
      if (a[i] < a[i - 1]) {
        const t = a[i]; a[i] = a[i - 1]; a[i - 1] = t
        swapped = true
      }
    }
    left++
    if (!swapped) break                        // 反向无交换 → 已有序
  }
  return a
}
// 最好情况 O(n)（近似有序 + flag）；最坏仍 O(n²)
// ⚠️ flag 必须在每趟开始前重置（写在趟外会失效）`

const cocktailBoundCode = `// ===== 鸡尾酒排序：记录最后交换位置（双边界收缩）=====
function cocktailSortBound(arr: number[]): number[] {
  const a = [...arr]
  let left = 0, right = a.length - 1
  while (left < right) {
    let last = left
    for (let i = left; i < right; i++) {       // 正向趟
      if (a[i] > a[i + 1]) {
        const t = a[i]; a[i] = a[i + 1]; a[i + 1] = t
        last = i                               // 最后交换处
      }
    }
    right = last                               // 右边界直接收到 last
    if (left >= right) break
    last = right
    for (let i = right; i > left; i--) {       // 反向趟
      if (a[i] < a[i - 1]) {
        const t = a[i]; a[i] = a[i - 1]; a[i - 1] = t
        last = i
      }
    }
    left = last                                // 左边界直接收到 last
  }
  return a
}
// 双向 lastSwap：两端同时跳过已有序区间，无效扫描最少
// 与冒泡的 lastSwap 同理，但左右两端都能收拢`

</script>
