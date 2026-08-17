<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🫧 冒泡排序：相邻交换与提前终止优化</h1>
          <p class="text-sm text-slate-500 mt-1">相邻两两比较，把最大值「冒」到队尾</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-4-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：相邻比较 + 交换，大数逐轮「冒」到队尾
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>冒泡排序</strong>：从头到尾<strong>相邻两两比较</strong>，前大后小就交换，
          一轮扫描后<strong>最大值沉到末尾（就位）</strong>；下一轮扫描范围减 1，重复直到只剩 1 个元素。
          下图左侧展示第 1 轮扫描（橙色高亮正在比较的相邻对），右侧展示一轮之后的结果——最大值 8 冒到队尾变绿。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="bb-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#0891b2" />
              </marker>
              <marker id="bb-bub" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>
            <text x="16" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">冒泡排序：相邻两两比较，大数「冒」到队尾 —— 每轮确定一个最大值就位</text>

            <!-- 左：扫描与交换 -->
            <rect x="24" y="52" width="290" height="128" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
            <text x="169" y="70" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">第 1 轮扫描（范围 0..3）</text>
            <rect x="40" y="108" width="44" height="50" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" rx="3" />
            <text x="62" y="133" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="96" y="128" width="44" height="30" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" rx="3" />
            <text x="118" y="143" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <text x="88" y="92" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#f59e0b">⇄</text>
            <rect x="152" y="78" width="44" height="80" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="174" y="118" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <rect x="208" y="148" width="44" height="10" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="230" y="153" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <text x="169" y="172" text-anchor="middle" font-size="10" font-family="monospace" fill="#f59e0b" font-weight="bold">5 &gt; 3 → 交换（大数上浮）</text>

            <!-- 中：气泡 -->
            <circle cx="350" cy="150" r="16" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
            <text x="350" y="150" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#d97706">冒</text>
            <line x1="350" y1="132" x2="350" y2="104" stroke="#f59e0b" stroke-width="2" marker-end="url(#bb-bub)" />
            <text x="368" y="116" font-size="10" font-family="monospace" fill="#d97706">上浮</text>

            <!-- 右：一轮后 -->
            <rect x="420" y="52" width="284" height="128" rx="10" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5" />
            <text x="562" y="70" text-anchor="middle" font-size="11" font-family="monospace" fill="#16a34a">一轮之后：最大值冒到队尾</text>
            <rect x="436" y="128" width="44" height="30" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" rx="3" />
            <text x="458" y="143" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
            <rect x="492" y="108" width="44" height="50" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" rx="3" />
            <text x="514" y="133" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
            <rect x="548" y="148" width="44" height="10" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" rx="3" />
            <text x="570" y="153" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
            <rect x="604" y="78" width="44" height="80" fill="#4ade80" stroke="#16a34a" stroke-width="2.5" rx="3" />
            <text x="626" y="118" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
            <text x="562" y="172" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">8 已就位（绿色）→ 下一轮扫描范围缩小为 0..2</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：第 1 轮扫描 —— 相邻对 (5,3) 交换后 5 继续与 8、1 比较，最终 8 冒到队尾</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：一轮冒泡（最大值就位） / 提前终止（无交换即有序）</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">一轮冒泡：最大值 8 沉到末尾</p>
            <svg viewBox="0 0 300 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="bb-a1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a" />
                </marker>
              </defs>
              <text x="8" y="16" font-size="10" font-family="monospace" fill="#64748b">冒泡前</text>
              <rect x="10" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" />
              <text x="30" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="58" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" />
              <text x="78" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="106" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="126" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="154" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="174" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <line x1="140" y1="60" x2="140" y2="80" stroke="#16a34a" stroke-width="2" marker-end="url(#bb-a1)" />
              <text x="8" y="96" font-size="10" font-family="monospace" fill="#64748b">一轮后</text>
              <rect x="10" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="30" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="58" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="78" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="106" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="126" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="154" y="106" width="40" height="26" rx="3" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="174" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
              <text x="8" y="152" font-size="10" font-family="monospace" font-weight="bold" fill="#16a34a">8 冒到末尾就位 ✓</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">一轮扫描后最大值到达正确位置，下一轮范围 −1</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">提前终止：某轮无交换 → 数组已有序</p>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="bb-a2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a" />
                </marker>
              </defs>
              <text x="8" y="16" font-size="10" font-family="monospace" fill="#64748b">几乎有序：第一轮扫一遍</text>
              <rect x="10" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="30" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="58" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="78" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="106" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="126" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="154" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="174" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="202" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="222" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <line x1="140" y1="60" x2="140" y2="80" stroke="#16a34a" stroke-width="2" marker-end="url(#bb-a2)" />
              <text x="8" y="96" font-size="10" font-family="monospace" fill="#64748b">无任何交换 → flag=false</text>
              <rect x="10" y="106" width="40" height="26" rx="3" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" />
              <text x="30" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
              <rect x="58" y="106" width="40" height="26" rx="3" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" />
              <text x="78" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
              <rect x="106" y="106" width="40" height="26" rx="3" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" />
              <text x="126" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
              <rect x="154" y="106" width="40" height="26" rx="3" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" />
              <text x="174" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">4</text>
              <rect x="202" y="106" width="40" height="26" rx="3" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" />
              <text x="222" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
              <text x="8" y="152" font-size="10" font-family="monospace" font-weight="bold" fill="#16a34a">break 直接结束 —— 最好情况 O(n) ✓</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">flag 优化：一轮无交换说明已有序，立即终止（最好 O(n)）</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 思想 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          思想：相邻两两比较，大的冒到后面
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          冒泡的思路最符合直觉：像水里的气泡一样，<strong>大的元素逐轮「浮」到数组末尾</strong>。
          每一轮从第 0 位开始，把相邻两两比较，前大后小就交换；扫完一轮，<strong>本轮最大值必定到达数组末尾</strong>（它一路被交换「顶」到队尾）。
          下一轮范围缩小 1（末尾已就位），直到只剩 1 个元素——此时整个数组有序。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>从下标 0 开始，<strong>相邻两两比较</strong>：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">a[j] vs a[j+1]</code></li>
          <li>前大后小（<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">a[j] &gt; a[j+1]</code>）→ <strong>交换</strong>，大数向后「冒」一步</li>
          <li>一轮结束：<strong>最大值到达本轮末尾</strong>（就位，不再参与后续比较）</li>
          <li>扫描范围 −1，重复 1~3，直到只剩 1 个元素 → 有序</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          冒泡 ≈ <strong>气泡上浮</strong>：轻的在前、重的在后，重的每轮沉一格。<br/>
          也更像 <strong>每次把最大的一件行李搬到队尾</strong>：先扫一眼队伍，把最重的箱子一路换到末尾放好，
          再对剩下的队伍重复——每轮只确定一个「最重的」，n−1 轮全部放好。<br/>
          相邻交换 ≈ <strong>只和旁边的人比身高</strong>：高的人依次和右边的人换位，一路「冒」到最后。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 1：内层循环上界写错</strong><br/>
          第 i 轮末尾已有 i 个元素就位，内层只需扫到 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">n-1-i</code>。
          写成 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">n-1</code> 不会出错但会多做无效比较（性能浪费）；
          写成 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">n-i</code> 则会越界访问 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">a[j+1]</code>。</p>
        </aside>
      </section>

      <!-- 2. 基础实现 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          基础实现：双重循环
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          外层循环控制<strong>轮数</strong>（最多 n−1 轮），内层循环控制<strong>本轮扫描范围</strong>（逐轮缩小）。
          交换必须用<strong>临时变量</strong>承接，否则前一个值会被覆盖。
        </p>
        <div class="mb-4"><Code language="ts" :code="bubbleBasicCode" title="bubble_basic.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          双重循环 ≈ <strong>搬行李的轮次安排</strong>：外层是「搬几趟」（n−1 趟），内层是「这一趟从队头扫到哪个位置」（逐趟缩短）。<br/>
          临时变量交换 ≈ <strong>两人换杯子</strong>：先把左手杯子放桌上（temp），再把右手杯子放到左手，最后把桌上的杯子放到右手——没有「桌子」就会洒。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 2：交换不用临时变量（或用了数组解构却忘记处理引用）</strong><br/>
          <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">a[j] = a[j+1]; a[j+1] = a[j]</code> 会把两个元素都变成原来的 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">a[j+1]</code>——数据丢失！
          必须 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">const t = a[j]; a[j] = a[j+1]; a[j+1] = t</code>。</p>
        </aside>
      </section>

      <!-- 3. 提前终止优化 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          提前终止优化：本轮无交换 → 已有序（flag）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          若某一轮扫描<strong>一次交换都没发生</strong>，说明任意相邻对都已前小后大——数组已经有序，
          无需再跑剩下的轮次。<strong>用 flag 标记本轮是否交换过</strong>，没交换就 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">break</code>。
          这个优化让冒泡在<strong>最好情况（已有序）降到 O(n)</strong>，只需扫一遍确认。
        </p>
        <div class="mb-4"><Code language="ts" :code="bubbleFlagCode" title="bubble_flag.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          flag ≈ <strong>巡检打卡</strong>：每轮巡逻带一张签到表，只要有人交换就打个勾；整轮没人勾 → 一切就绪，提前收工。<br/>
          提前终止 ≈ <strong>检查行李是否已排好</strong>：如果检查一遍发现队伍已经整齐，就不用再搬 n−1 趟了——省下的轮次就是优化收益。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：flag 声明位置错误</strong><br/>
          把 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">let swapped = false</code> 写到<strong>两层循环之外</strong>：一旦某轮交换过，
          后续所有轮次都认为「交换过」，提前终止永远不触发——优化失效。<strong>flag 必须在外层循环体内、内层循环前</strong>每轮重置。</p>
        </aside>
      </section>

      <!-- 4. 复杂度与特性 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          复杂度：最好 O(n) / 平均最坏 O(n²)，空间 O(1)，稳定
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>最好情况</strong>：数组已有序（带 flag）→ 第一轮扫 n−1 次发现无交换 → <strong>O(n)</strong>。<br/>
          <strong>最坏情况</strong>：数组逆序 → 每轮都要交换，比较 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">n(n−1)/2</code> 次、
          交换同样次数 → <strong>O(n²)</strong>。<br/>
          <strong>空间</strong>：只用一个临时变量 → <strong>O(1)</strong> 原地。<br/>
          <strong>稳定性</strong>：比较条件是严格大于（<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">&gt;</code>），
          相等元素不交换、只做相邻移动 → <strong>稳定 ✅</strong>。<br/>
          一个有趣的性质：冒泡的<strong>交换次数恰好等于逆序对数量</strong>（每次交换消掉一个逆序对）。
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-2">⏱️ 复杂度</p>
            <ul class="text-xs text-slate-600 space-y-1 font-mono">
              <li>最好（已有序+flag）：O(n)</li>
              <li>平均：O(n²)</li>
              <li>最坏（逆序）：O(n²)</li>
              <li>比较次数：n(n−1)/2（最坏）</li>
              <li>空间：O(1) 原地</li>
              <li>稳定性：✅ 稳定（相等不交换）</li>
            </ul>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-2">✅ 三件事</p>
            <ul class="text-xs text-slate-600 space-y-1">
              <li>▸ <strong>每轮</strong>：相邻比较 + 交换，最大值冒到队尾</li>
              <li>▸ <strong>每轮后</strong>：扫描范围 −1（末尾就位）</li>
              <li>▸ <strong>优化</strong>：flag 提前终止；lastSwap 记录最后交换位置收窄范围</li>
            </ul>
          </div>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>冒泡是「稳定 + 原地 + 提前终止」的入门排序——数据量小（几百）或近似有序时完全够用；
          数据量大请换快排/归并，别让 O(n²) 拖垮页面。</p>
        </aside>
      </section>

      <!-- 5. 优缺点与适用场景 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          优缺点、适用场景与最后一层优化（lastSwap）
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <p class="text-sm font-semibold text-emerald-700 mb-2">👍 优点</p>
            <ul class="text-xs text-emerald-800 space-y-1">
              <li>▸ 代码最简单，最符合直觉，教学首选</li>
              <li>▸ 稳定 ✅，空间 O(1) 原地</li>
              <li>▸ 可提前终止，近似有序时近乎线性</li>
              <li>▸ 交换次数 = 逆序对数，可顺带统计</li>
            </ul>
          </div>
          <div class="bg-red-50 rounded-xl p-4 border border-red-200">
            <p class="text-sm font-semibold text-red-600 mb-2">👎 缺点</p>
            <ul class="text-xs text-red-700 space-y-1">
              <li>▸ O(n²) 太慢，大数组不可用</li>
              <li>▸ 交换频繁（最坏 n²/2 次），写放大严重</li>
              <li>▸ 「乌龟问题」：小元素每次只能挪一步，很慢</li>
              <li>▸ 常数大于插入排序，几乎总被插入/选择压过</li>
            </ul>
          </div>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>最后一层优化——记录最后交换位置（lastSwap）</strong>：一轮中最后一次交换发生在下标 k，
          说明 k 之后的元素都已就位，下一轮只需扫到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">k</code>——
          比「每轮固定 −1」收窄得更快，与 flag 叠加效果更好。
        </p>
        <div class="mb-4"><Code language="ts" :code="bubbleLastSwapCode" title="bubble_last_swap.ts" /></div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>适用场景</strong>：教学演示、<strong>小规模数据</strong>（如几十个元素）、<strong>近似有序</strong>的增量数据、
          以及「数组已基本有序、只差几个逆序对」的修正场景。真实工程里，
          更推荐同族的<strong>插入排序</strong>（常数更小）或<strong>鸡尾酒排序</strong>（缓解乌龟问题，见下一节）。
        </p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          lastSwap ≈ <strong>搬行李时记住「最后一个需要调整的位置」</strong>：后半段已经整齐的行李不用再检查，
          下一趟直接从这个位置开始——省掉无效巡检。<br/>
          乌龟问题 ≈ <strong>最小的元素在队尾</strong>：冒泡每轮只能把它往前挪一格（相邻交换），n 个元素要 n 轮才能到队头——
          这就是「乌龟」。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：大数组直接上冒泡</strong><br/>
          10 万条数据冒泡排序约需 50 亿次比较——浏览器直接卡死。看到「排序大数据」，第一反应应该是
          <strong>快排 / 归并 / 内置 sort</strong>，而不是冒泡。冒泡只属于小数据与教学场景。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：冒泡排序（flag 提前终止 + lastSwap 收窄）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          橙色 = 正在比较的相邻对，红色 = 正在交换，绿色 = 已就位（冒到队尾）。
          算法带 <strong>flag 提前终止</strong>：若某轮无交换，剩余柱子直接全部变绿并停止。
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
          <button @mousedown="runBubble" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">🫧 冒泡排序（带提前终止）</button>
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>思想</strong>：相邻两两比较，前大后小就交换；每轮最大值冒到队尾，扫描范围 −1</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>优化 1（flag）</strong>：某轮无交换 → 已有序，提前终止，最好情况 O(n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>优化 2（lastSwap）</strong>：记录最后交换位置 k，下一轮只扫到 k，收窄更快</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度</strong>：平均/最坏 O(n²)，空间 O(1)，稳定 ✅；交换次数 = 逆序对数</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>优缺点</strong>：简单稳定但慢；适合小数据、近似有序；大数组必须换快排/归并</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>缺陷</strong>：乌龟问题——小元素每轮只挪一格；鸡尾酒排序（下一节）可缓解</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-3-select/dsa-7-3-2-median-of-medians" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：中位数之中位数：O(n)确定性选择</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-4-more-sorts/dsa-7-4-2-selection" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：选择排序：每次选出最小元素 →</RouterLink>
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
  { id: "sec-1", name: "思想：相邻比较" },
  { id: "sec-2", name: "基础实现" },
  { id: "sec-3", name: "提前终止优化" },
  { id: "sec-4", name: "复杂度与特性" },
  { id: "sec-5", name: "优缺点/适用/lastSwap" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "📋 小结" },
]

// ===== 🎬 冒泡排序动画（柱状图）=====
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

// 冒泡排序：flag 提前终止 + lastSwap 收窄范围
async function bubbleSort() {
  let end = bars.length - 1
  let pass = 0
  while (end > 0) {
    pass++
    let swapped = false
    let last = 0
    for (let i = 0; i < end; i++) {
      cmp.value++
      colorAt(i, C.orange); colorAt(i + 1, C.orange)
      status.value = `第 ${pass} 轮：比较 [${i}] 与 [${i + 1}]（${bars[i].val} vs ${bars[i + 1].val}）`
      await d(320)
      if (bars[i].val > bars[i + 1].val) {
        swp.value++
        colorAt(i, C.red); colorAt(i + 1, C.red)
        status.value = `${bars[i].val} > ${bars[i + 1].val} → 交换`
        await d(340)
        const t = { ...bars[i] }
        bars[i] = { ...bars[i + 1] }
        bars[i + 1] = t
        layout()
        swapped = true
        last = i
        await d(280)
      }
      colorAt(i, C.cyan)
    }
    colorAt(end, C.green)
    status.value = `第 ${pass} 轮结束：最大值 ${bars[end].val} 冒到 [${end}] 就位`
    await d(450)
    if (!swapped) {
      for (let k = 0; k < bars.length; k++) colorAt(k, C.green)   // 已全部有序 → 全绿
      status.value = `✅ 第 ${pass} 轮没有任何交换 → 数组已有序，提前终止！`
      await d(600)
      result.value = `提前终止：只跑了 ${pass} 轮（远少于 n-1 轮）`
      return
    }
    end = last   // lastSwap 优化：last 之后已就位
    await d(250)
  }
  for (let k = 0; k < bars.length; k++) colorAt(k, C.green)   // 补全剩余就位色
  result.value = `排序完成：比较 ${cmp.value} 次，交换 ${swp.value} 次`
}

function runBubble() { act('冒泡排序（带提前终止）执行中…', '冒泡 O(n²) / 最好 O(n)', bubbleSort) }
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
const bubbleBasicCode = `// ===== 冒泡排序：基础版 =====
function bubbleSort(arr: number[]): number[] {
  const a = [...arr]
  const n = a.length
  for (let i = 0; i < n - 1; i++) {           // 外层：最多 n-1 轮
    for (let j = 0; j < n - 1 - i; j++) {     // 内层：每轮少扫一个（末尾已就位）
      if (a[j] > a[j + 1]) {                  // 严格大于才交换 → 稳定
        const t = a[j]; a[j] = a[j + 1]; a[j + 1] = t
      }
    }
  }
  return a
}
// 例：bubbleSort([5, 3, 8, 1]) → [1, 3, 5, 8]
// 第 i 轮结束后，末尾 i+1 个元素已经就位（最大值冒到队尾）
console.log(\`冒泡结果：\${bubbleSort([5, 3, 8, 1]).join(',')}\`)
// 输出：冒泡结果：1,3,5,8`

const bubbleFlagCode = `// ===== 冒泡排序：提前终止优化（flag）=====
function bubbleSortFlag(arr: number[]): number[] {
  const a = [...arr]
  const n = a.length
  for (let i = 0; i < n - 1; i++) {
    let swapped = false            // ⚠️ flag 必须在每轮开始前重置
    for (let j = 0; j < n - 1 - i; j++) {
      if (a[j] > a[j + 1]) {
        const t = a[j]; a[j] = a[j + 1]; a[j + 1] = t
        swapped = true
      }
    }
    if (!swapped) break            // 本轮无交换 → 已有序，直接结束
  }
  return a
}
// 对 [1,2,3,4,5]：第一轮扫完发现无交换，立即返回 → 最好情况 O(n)
// 对 [5,4,3,2,1]：每轮都必须交换 → 最坏情况 O(n²)`

const bubbleLastSwapCode = `// ===== 冒泡排序：记录最后交换位置（lastSwap）=====
function bubbleSortLast(arr: number[]): number[] {
  const a = [...arr]
  let end = a.length - 1           // 无序区右边界
  while (end > 0) {
    let last = 0                   // 本轮最后一次交换的位置
    for (let j = 0; j < end; j++) {
      if (a[j] > a[j + 1]) {
        const t = a[j]; a[j] = a[j + 1]; a[j + 1] = t
        last = j                   // 记录：last 之后的元素都已就位
      }
    }
    end = last                     // 下一轮只需扫到 last
  }
  return a
}
// 例：[5,1,2,3,4] —— 第一轮后 [1,2,3,4,5]，last=0，循环直接结束
// 比「每轮固定 -1」收窄得更快，叠加 flag 效果更好
// 附赠：冒泡的交换次数 = 逆序对数量（每次交换恰好消掉一个逆序对）`

</script>
