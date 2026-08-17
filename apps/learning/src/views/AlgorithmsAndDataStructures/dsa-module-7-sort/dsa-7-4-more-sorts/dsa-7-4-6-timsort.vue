<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🐍 Tim 排序：插入 + 归并的工业级排序</h1>
          <p class="text-sm text-slate-500 mt-1">Python/Java/V8 的默认排序 —— 抓住「现实数据已部分有序」这一红利</p>
        </div>
        <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-4-6</span>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">📐</span>
          结构总览：run → 补足 minrun → 归并
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Tim 排序的核心洞察：<strong>现实数据往往已经「部分有序」</strong>（数据库按主键插入、日志按时间追加、前端列表常被局部修改）。
          与其无差别地把整个数组当乱序处理，不如先<strong>扫描出天然有序段（run）</strong>，再用<strong>归并</strong>把它们合成一个整体 ——
          数据越接近有序，Tim 排序越快，最好能到 <strong>O(n)</strong>。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="tm-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="14" y="16" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">Tim 排序三步走：识别 run → 反转/补足 minrun → 归并（galloping 加速）</text>

            <!-- 第 1 行：自然 run -->
            <rect x="40" y="42" width="56" height="28" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="68" y="56" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
            <rect x="108" y="42" width="56" height="28" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="136" y="56" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
            <rect x="176" y="42" width="56" height="28" rx="4" fill="#60a5fa" stroke="#3b82f6" stroke-width="1" />
            <text x="204" y="56" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <rect x="244" y="42" width="56" height="28" rx="4" fill="#60a5fa" stroke="#3b82f6" stroke-width="1" />
            <text x="272" y="56" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="312" y="42" width="56" height="28" rx="4" fill="#f59e0b" stroke="#b45309" stroke-width="1" />
            <text x="340" y="56" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <rect x="380" y="42" width="56" height="28" rx="4" fill="#f59e0b" stroke="#b45309" stroke-width="1" />
            <text x="408" y="56" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="448" y="42" width="56" height="28" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
            <text x="476" y="56" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="516" y="42" width="56" height="28" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
            <text x="544" y="56" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>

            <text x="14" y="86" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">① 识别 natural run：升序保留、降序段反转</text>

            <!-- 箭头：第 1 行 → 第 2 行 -->
            <line x1="68" y1="70" x2="68" y2="118" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#tm-a)" />
            <line x1="204" y1="70" x2="204" y2="118" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#tm-a)" />
            <line x1="340" y1="70" x2="340" y2="118" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#tm-a)" />
            <line x1="476" y1="70" x2="476" y2="118" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#tm-a)" />

            <!-- 第 2 行：补足后两个 run -->
            <rect x="40" y="126" width="56" height="28" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="68" y="140" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
            <rect x="108" y="126" width="56" height="28" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="136" y="140" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
            <rect x="176" y="126" width="56" height="28" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="204" y="140" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
            <rect x="244" y="126" width="56" height="28" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="272" y="140" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
            <rect x="312" y="126" width="56" height="28" rx="4" fill="#60a5fa" stroke="#3b82f6" stroke-width="1" />
            <text x="340" y="140" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="380" y="126" width="56" height="28" rx="4" fill="#60a5fa" stroke="#3b82f6" stroke-width="1" />
            <text x="408" y="140" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="448" y="126" width="56" height="28" rx="4" fill="#60a5fa" stroke="#3b82f6" stroke-width="1" />
            <text x="476" y="140" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <rect x="516" y="126" width="56" height="28" rx="4" fill="#60a5fa" stroke="#3b82f6" stroke-width="1" />
            <text x="544" y="140" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>

            <text x="14" y="170" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">② 插入排序补足到 minrun：长度不足的 run 用插入排序扩到 4</text>

            <!-- 箭头：第 2 行 → 第 3 行（归并） -->
            <line x1="142" y1="154" x2="250" y2="206" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#tm-a)" />
            <line x1="414" y1="154" x2="300" y2="206" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#tm-a)" />
            <text x="318" y="186" font-size="11" font-family="monospace" font-weight="bold" fill="#f59e0b">③ 归并（galloping）</text>

            <!-- 第 3 行：结果 -->
            <rect x="40" y="214" width="56" height="28" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="68" y="228" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
            <rect x="108" y="214" width="56" height="28" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="136" y="228" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
            <rect x="176" y="214" width="56" height="28" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="204" y="228" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
            <rect x="244" y="214" width="56" height="28" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="272" y="228" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">4</text>
            <rect x="312" y="214" width="56" height="28" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="340" y="228" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
            <rect x="380" y="214" width="56" height="28" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="408" y="228" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">7</text>
            <rect x="448" y="214" width="56" height="28" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="476" y="228" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
            <rect x="516" y="214" width="56" height="28" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="544" y="228" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">9</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：第一步扫出 4 个 natural run（不同颜色）；第二步用插入排序把每个 run 补足到 minrun；第三步归并两个大 run → 整体有序（绿）</figcaption>
        </figure>

        <!-- before / after -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">核心操作：归并两个有序 run</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">归并前：两个有序 run，头指针指向各自最小</p>
            <svg viewBox="0 0 340 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="10" y="18" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">run1（蓝）与 run2（红），i / j 为头指针</text>
              <!-- run1 头指针 -->
              <polygon points="52,66 58,78 46,78" fill="#f59e0b" />
              <text x="62" y="74" font-size="11" font-family="monospace" font-weight="bold" fill="#b45309">i</text>
              <!-- run2 头指针 -->
              <polygon points="52,142 58,154 46,154" fill="#f59e0b" />
              <text x="62" y="150" font-size="11" font-family="monospace" font-weight="bold" fill="#b45309">j</text>
              <!-- run1 -->
              <rect x="30" y="86" width="44" height="32" rx="4" fill="#60a5fa" stroke="#3b82f6" stroke-width="1" />
              <text x="52" y="102" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="82" y="86" width="44" height="32" rx="4" fill="#60a5fa" stroke="#3b82f6" stroke-width="1" />
              <text x="104" y="102" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="134" y="86" width="44" height="32" rx="4" fill="#60a5fa" stroke="#3b82f6" stroke-width="1" />
              <text x="156" y="102" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="186" y="86" width="44" height="32" rx="4" fill="#60a5fa" stroke="#3b82f6" stroke-width="1" />
              <text x="208" y="102" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <!-- run2 -->
              <rect x="30" y="162" width="44" height="32" rx="4" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
              <text x="52" y="178" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="82" y="162" width="44" height="32" rx="4" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
              <text x="104" y="178" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="134" y="162" width="44" height="32" rx="4" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
              <text x="156" y="178" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <rect x="186" y="162" width="44" height="32" rx="4" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
              <text x="208" y="178" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">每次比较 i 与 j 指向的元素，较小者出列 —— 1 &lt; 2，先出 1</figcaption>
          </figure>

          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">归并后：8 个元素整体有序（绿）</p>
            <svg viewBox="0 0 340 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="10" y="18" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">归并结果：1,2,3,4,5,7,8,9</text>
              <text x="10" y="52" font-size="11" font-family="monospace" fill="#64748b">两路各出最小 → 比较 → 较小者入结果区</text>
              <!-- 归并顺序标注 -->
              <text x="30" y="82" font-size="10" font-family="monospace" fill="#64748b">1←min(1,2)  2←min(3,2)  3←min(3,4)  4←min(5,4)</text>
              <text x="30" y="98" font-size="10" font-family="monospace" fill="#64748b">5←min(5,7)  7←min(8,7)  8←min(8,9)  9←剩余</text>
              <!-- 结果 8 个盒子 -->
              <rect x="30" y="120" width="34" height="32" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
              <text x="47" y="136" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
              <rect x="69" y="120" width="34" height="32" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
              <text x="86" y="136" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
              <rect x="108" y="120" width="34" height="32" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
              <text x="125" y="136" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
              <rect x="147" y="120" width="34" height="32" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
              <text x="164" y="136" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">4</text>
              <rect x="186" y="120" width="34" height="32" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
              <text x="203" y="136" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
              <rect x="225" y="120" width="34" height="32" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
              <text x="242" y="136" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">7</text>
              <rect x="264" y="120" width="34" height="32" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
              <text x="281" y="136" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
              <rect x="303" y="120" width="34" height="32" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
              <text x="320" y="136" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">9</text>
              <!-- 尾注 -->
              <text x="30" y="180" font-size="11" font-family="monospace" font-weight="bold" fill="#059669">✅ 8 次比较完成 —— 因为每个 run 内部已经有序</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">归并利用了「两个 run 各自有序」：只需比较头指针，一路选小即可</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1 动机 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          动机：现实数据大多「已经部分有序」
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          教科书排序（快排/堆排）假设输入是<strong>完全随机</strong>的，但工程里的真实数据几乎从不如此：
        </p>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>增量追加：</strong>日志按时间戳写入、ID 自增、操作记录按序入栈 —— 新数据总是比旧数据大。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>局部修改：</strong>用户改了几行配置、几篇文章被更新 —— 99% 的元素保持原序。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>归并的产物：</strong>数据库归并、上一轮排序的结果，天然存在大量有序段。</span></li>
        </ul>

        <p class="text-slate-600 mb-4 leading-relaxed">
          快排/堆排面对这些输入毫无察觉 —— 它们依然从零开始比较。2002 年 Tim Peters 为 Python 设计的 <strong>TimSort</strong>
          则把这些有序段当成<strong>免费午餐</strong>：先扫出来（O(n)），再归并（O(n log n) 但通常远小于理论值）。
          因为效果好，它被 <strong>Python（list.sort）、Java（Arrays.sort 对象版）、JavaScript（V8 的 Array.prototype.sort）</strong>选为默认排序算法。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Tim ≈ 「<strong>先扫出已排好的一段段（run），再用归并合并</strong>」。就像 V8 对 JS 数组排序的策略 ——
          你 <code class="bg-purple-100 px-1 rounded text-xs font-mono">arr.sort()</code> 时，V8 不会傻乎乎地把接近有序的数组当乱序处理，
          它会先识别有序段，<strong>数据越接近有序，排序越快</strong>。这也是为什么前端大列表排序（如表格二次排序）几乎无感：数据常常本来就接近有序。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>以为 Tim 排序是「插入排序的改良」或「归并排序的改良」—— 都不准确。
          它是<strong>两者组合</strong>：<strong>小规模/补足阶段用插入排序</strong>（常数小、对近似有序友好），<strong>合并阶段用归并</strong>（稳定、O(n log n)）。
          单独任何一方都吃不到「识别 run」这个红利。</p>
        </aside>
      </section>

      <!-- 2 run 与 minrun -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          核心概念：run 与 minrun
        </h2>

        <h3 class="text-base font-semibold text-slate-700 mb-3">run：一段连续有序的区间</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          <strong>run</strong>（有序段）是数组中一段<strong>连续且单调</strong>的区间：
          <strong>升序 run</strong>（非降）直接保留；<strong>降序 run</strong>（严格降）反转成升序 —— 反转是 O(run 长度) 的一次扫描，
          完全免费。扫描完整个数组，我们就得到若干个小有序段。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">minrun：run 的最小长度</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          run 太短时（比如长度 1），归并会失去效率。于是规定一个 <strong>minrun</strong>：
          太短的 run 用<strong>插入排序</strong>向后扩展补足到 minrun（插入排序对小规模 + 近似有序几乎免费）。
          minrun 的取值有个讲究：<strong>让 n / minrun 接近 2 的幂</strong>，这样归并时各 run 规模两两均衡，不会出现「大吞小」的不平衡。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="calcMinRunCode" title="minrun.ts" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>降序 run 判定写成 <code class="bg-amber-100 px-1 rounded text-xs font-mono">a[end] &gt;= a[end + 1]</code>（把相等也算降序）。
          相等元素必须留在<strong>升序</strong>段里 —— 否则反转后变成严格降序再反转，会<strong>破坏相等元素的相对顺序，失去稳定性</strong>。
          正确写法：降序段用严格 <code class="bg-amber-100 px-1 rounded text-xs font-mono">&gt;</code> 判定，这样 <code class="bg-amber-100 px-1 rounded text-xs font-mono">[2,2,3]</code> 会被当成一个升序 run 原样保留。</p>
        </aside>
      </section>

      <!-- 3 算法流程 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          算法流程：找 run → 补足 → 归并
        </h2>

        <h3 class="text-base font-semibold text-slate-700 mb-3">第 1 步：识别 natural run</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          从左到右扫描，找出最长连续非降段；若遇到降序段，反转成升序。一次扫描 O(n)。
        </p>
        <div class="mb-4">
          <Code language="ts" :code="nextRunCode" title="nextRun.ts" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">第 2 步：补足 minrun</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          如果 run 长度 &lt; minrun，用<strong>插入排序</strong>把它向后扩展（顺带把后面的元素也排进去），直到长度 = minrun 或数组末尾。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">第 3 步：归并 run（Z 字形不变量 + galloping）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          用一个<strong>栈</strong>记录已产生的 run。每压入一个新 run，就检查栈顶三个 run 的长度是否满足
          <strong>Z 字形不变量</strong>（倒数第 3 &gt; 倒数第 2 + 倒数第 1，且倒数第 2 &gt; 倒数第 1），不满足就合并，保证归并总是「同量级相碰」。
          归并时若一侧连续获胜（比如 run2 的头一直更小），进入 <strong>galloping（奔袭）</strong>模式，用二分查找一次搬走整段。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="timSortCode" title="timSort.ts" />
        </div>
        <div class="mb-4">
          <Code language="ts" :code="gallopingCode" title="merge-galloping.ts" />
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Z 字形不变量 ≈ <strong>Git 的合并策略</strong>：绝不把「大改动」和「小改动」硬拼，而是保持合并双方体量相近，避免反复拉扯。
          galloping ≈ <strong>前端分页加载的「批量拉取」</strong>：连续命中同一方向时，不再一条一条比较，而是一次二分定位、整段搬走 —— 和批量拼接数据的直觉一致。</p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>归并时总是复制<strong>长的一侧</strong>（或两侧都复制）。
          Tim 排序的工程细节是<strong>只复制较短的一侧</strong>，较长一侧留在原数组 —— 这样内存占用和拷贝量都减半。
          另外，galloping 不能无限使用：连续获胜次数不足阈值（如 7 次）就退回普通逐元素比较，否则二分查找反而更慢。</p>
        </aside>
      </section>

      <!-- 4 复杂度 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          复杂度：最好 O(n)，平均/最坏 O(n log n)
        </h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">指标</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Tim 排序</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">最好</td><td class="px-4 py-2 border border-slate-200 text-green-600 font-medium">O(n)</td><td class="px-4 py-2 border border-slate-200">整个数组已有序：扫出 1 个 run，归并直接完成</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">平均</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200">run 越多，归并代价越接近理论值</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">最坏</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200">完全乱序时退化为普通归并（+ 插入补足）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">空间</td><td class="px-4 py-2 border border-slate-200">O(n)</td><td class="px-4 py-2 border border-slate-200">归并临时数组（只复制较短一侧）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">稳定性</td><td class="px-4 py-2 border border-slate-200 text-green-600 font-medium">✅ 稳定</td><td class="px-4 py-2 border border-slate-200">插入 &lt;= 归并 &lt;=，相等元素不换位</td></tr>
            </tbody>
          </table>
        </div>

        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>识别 run：</strong>一次线性扫描 O(n)，降序反转同样是 O(run 长)。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>插入补足：</strong>每段规模 ≤ minrun（通常 32~64），总代价 O(n × minrun) 中的常数很小，工程上视为 O(n)。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>归并：</strong>Z 字形不变量保证 run 长度按 2 的幂增长，总归并 O(n log n)；已有序时只有一个 run，直接跳过归并 → 最好 O(n)。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>空间：</strong>归并临时数组 O(n) —— 这是它与「原地」快排/堆排相比的代价，换来稳定 + 有序红利。</span></li>
        </ul>
      </section>

      <!-- 5 与快排/归并对比 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          与快排 / 归并排序对比：凭什么它是默认选择
        </h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对比项</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">快排</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">归并</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Tim 排序</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">最好</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200 text-green-600 font-medium">O(n)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">最坏</td><td class="px-4 py-2 border border-slate-200 text-red-600 font-medium">O(n²)</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200 text-green-600 font-medium">O(n log n)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">空间</td><td class="px-4 py-2 border border-slate-200">O(log n)</td><td class="px-4 py-2 border border-slate-200">O(n)</td><td class="px-4 py-2 border border-slate-200">O(n)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">稳定</td><td class="px-4 py-2 border border-slate-200">❌</td><td class="px-4 py-2 border border-slate-200">✅</td><td class="px-4 py-2 border border-slate-200">✅</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">利用有序数据</td><td class="px-4 py-2 border border-slate-200">❌（反而最坏）</td><td class="px-4 py-2 border border-slate-200">❌</td><td class="px-4 py-2 border border-slate-200 text-green-600 font-medium">✅（核心卖点）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">小数组表现</td><td class="px-4 py-2 border border-slate-200">递归开销大</td><td class="px-4 py-2 border border-slate-200">拷贝开销大</td><td class="px-4 py-2 border border-slate-200 text-green-600 font-medium">插入排序收尾</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>结论：</strong>Tim 排序在「最坏不差（O(n log n)）、稳定、吃有序红利」三个维度上全面占优，
          唯一的代价是 O(n) 空间 —— 对语言运行时（Python/Java/V8）而言，为「通用默认排序」花这点空间完全值得。
          <strong>快排（内省排序版）</strong>仍是 C++ <code class="bg-slate-100 px-1 rounded text-xs font-mono">std::sort</code> 的选择，因为它在内存敏感 + 不需要稳定的场景下更快、更省空间。
        </p>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 工程建议：</strong>前端给数组排序直接用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">arr.sort()</code>（V8 已是 TimSort，且对接近有序的列表有奇效）；
          但注意 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">sort()</code> 默认按<strong>字符串</strong>比较，数字数组务必传 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">(a, b) =&gt; a - b</code> 比较器。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">🎬</span>
          动画演示：识别 run → 补足 minrun → 归并
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          左侧为主区，右侧为已排序区（绿色）。流程：<strong>① 扫描识别 natural run（绿段，降序段橙色反转）→ ② 插入排序补足 minrun（橙色插入）
          → ③ 归并两个 run（蓝/红两队比较头部，较小者入已排序区）</strong>。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ bars.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔍 比较: {{ cmp }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔁 交换: {{ swp }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @click="runTim" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">🐍 Tim 排序</button>
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
        <p class="text-xs text-slate-400 mt-2">🔁 交换计数包含插入排序的移位与归并时的「移入已排序区」；Tim 排序本身是稳定算法，演示数组无重复值。</p>
      </section>

      <!-- 📋 小结 -->
      <section id="sec-summary" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>一句话：</strong>先扫出天然有序的 run，小 run 用插入排序补足到 minrun，再用归并（galloping）合并 —— 现实数据越有序越快，最好 O(n)。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三个关键词：</strong>run（有序段）、minrun（最小 run 长度，接近 2 的幂）、galloping（连续胜出时二分批量搬移）。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>工程地位：</strong>Python / Java / V8 的默认排序；稳定 + 最坏 O(n log n) + 吃有序红利，代价是 O(n) 空间。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>对比记忆：</strong>快排怕有序（O(n²)）、归并不看数据脸色、Tim 专吃有序 —— 下一节看 C++ 的 <strong>内省排序</strong>如何用另一套「混合」策略解决问题。</span></li>
        </ul>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 记忆钩子：</strong>Tim 排序 = 「插入排序 + 归并排序 + 有序段识别」。V8 的 <code class="bg-blue-100 px-1 rounded text-xs font-mono">sort()</code> 底层就是它 —— 你天天在用的排序，藏着「现实数据部分有序」这条工程洞察。</p>
        </aside>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-4-more-sorts/dsa-7-4-5-tournament" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：锦标赛排序：胜者树选择</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-4-more-sorts/dsa-7-4-7-introsort" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：内省排序：快排+堆排+插入混合 →</RouterLink>
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
  { id: "sec-1", name: "1 动机" },
  { id: "sec-2", name: "2 run 与 minrun" },
  { id: "sec-3", name: "3 算法流程" },
  { id: "sec-4", name: "4 复杂度" },
  { id: "sec-5", name: "5 与快排/归并对比" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-summary", name: "📋 小结" },
]

// ===== 🎬 Tim 排序动画 =====
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

// 交换两柱的值（橙色闪烁），调用方负责最终着色
async function swapVal(a: number, b: number) {
  if (a === b) return
  const t = bars[a].val; bars[a].val = bars[b].val; bars[b].val = t
  colorAt(a, C.orange); colorAt(b, C.orange)
  layout()
  await d(180)
}

// 插入排序（带动画）：把 [lo..hi] 排好，橙 = 正在插入，红 = 被右移
async function insertionFlash(lo: number, hi: number) {
  for (let i = lo + 1; i <= hi; i++) {
    const key = bars[i].val
    colorAt(i, C.orange)
    status.value = `插入排序：把 ${key} 插入到已排序前缀`
    await d(260)
    let j = i - 1
    while (j >= lo && bars[j].val > key) {
      bars[j + 1].val = bars[j].val
      colorAt(j, C.red)
      cmp.value++; swp.value++
      layout()
      await d(130)
      colorAt(j, C.cyan)
      j--
    }
    bars[j + 1].val = key
    colorAt(j + 1, C.green)
    layout()
    await d(240)
  }
  for (let k = lo; k <= hi; k++) colorAt(k, C.green)
  await d(280)
}

async function runTim() {
  await act('🐍 Tim 排序：识别 run → 补足 minrun → 归并', 'Tim 排序', async () => {
    initArr()
    await d(300)
    // ① 识别 natural run（升序保留、降序反转）
    const runs: { s: number; e: number }[] = []
    status.value = '① 识别 natural run：升序保留、降序反转'
    let idx = 0
    while (idx < bars.length) {
      if (idx >= bars.length - 1) {
        colorAt(idx, C.green)
        runs.push({ s: idx, e: idx })
        idx++
        break
      }
      const desc = bars[idx].val > bars[idx + 1].val
      let end = idx + 1
      while (end < bars.length - 1 && (desc ? bars[end].val > bars[end + 1].val : bars[end].val <= bars[end + 1].val)) end++
      for (let k = idx; k <= end; k++) colorAt(k, C.orange)
      cmp.value++
      status.value = desc ? `发现降序 run [${idx}..${end}] → 反转成升序` : `发现升序 run [${idx}..${end}]`
      await d(420)
      if (desc) {
        for (let a = idx, b = end; a < b; a++, b--) await swapVal(a, b)
        await d(250)
      }
      for (let k = idx; k <= end; k++) colorAt(k, C.green)
      await d(280)
      runs.push({ s: idx, e: end })
      idx = end + 1
    }
    status.value = `✅ 识别出 ${runs.length} 个 run（绿色段）`
    await d(500)

    // ② 补足 minrun = 4
    status.value = '② run 长度 < minrun(4) → 插入排序补足到 4'
    await d(400)
    await insertionFlash(0, 3)
    await insertionFlash(4, 7)
    status.value = '✅ 两个 run 已补足到 minrun = 4'
    await d(500)

    // ③ 归并两个 run
    status.value = '③ 归并：run1（蓝）vs run2（红），比较头部，较小者入已排序区'
    for (let k = 0; k < 4; k++) colorAt(k, C.blue)
    for (let k = 4; k < 8; k++) colorAt(k, C.red)
    await d(500)
    let i = 0, j = 4
    while (i < 4 || j < 8) {
      let pick = -1
      if (i >= 4) { pick = j; j++ }
      else if (j >= 8) { pick = i; i++ }
      else {
        colorAt(i, C.orange); colorAt(j, C.orange)
        cmp.value++
        status.value = `⚖️ 比较头部：${bars[i].val} vs ${bars[j].val}`
        await d(320)
        if (bars[i].val <= bars[j].val) { pick = i; i++ } else { pick = j; j++ }
      }
      status.value = `→ 较小者 ${bars[pick].val} 入已排序区（绿）`
      sorted.value.push(bars[pick].val)
      swp.value++
      colorAt(pick, C.ghost)
      await d(220)
      if (i < 4) colorAt(i, C.blue)
      if (j < 8) colorAt(j, C.red)
    }
    status.value = '✅ 归并完成：整体有序（最好 O(n)，一般 O(n log n)）'
    await d(600)
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
const calcMinRunCode = `// minrun：让 n / minrun 接近 2 的幂，归并时两两规模均衡
// 做法：不断右移 n，同时把移掉的二进制位“或”进 r；n < 64 时停止
function calcMinRun(n: number): number {
  let r = 0
  while (n >= 64) {
    r |= n & 1
    n >>= 1
  }
  return n + r
}
// 例：n = 100 → 100>=64：r=0|0=0，n=50 → 50<64 → minrun = 50
//     n = 63  → 63 < 64  → minrun = 63（整个数组一个 run）
//     n = 65  → 65&1=1 → r=1，n=32 → minrun = 33
// 效果：n/minrun 都落在 [1, 2) 之间，归并树接近满二叉树`

const nextRunCode = `// 识别一个 natural run：找最长连续非降段（或严格降段再反转）
// 返回 run 的结束下标（开区间 [start, end)）
function nextRun(a: number[], start: number): number {
  if (start >= a.length - 1) return a.length        // 只剩一个元素
  let end = start + 1
  if (a[start] <= a[end]) {                          // 升序 run
    while (end < a.length - 1 && a[end] <= a[end + 1]) end++
  } else {                                           // 降序 run → 反转成升序
    while (end < a.length - 1 && a[end] > a[end + 1]) end++
    reverse(a, start, end)
  }
  return end + 1
}

function reverse(a: number[], lo: number, hiExclusive: number): void {
  for (let i = lo, j = hiExclusive - 1; i < j; i++, j--) {
    [a[i], a[j]] = [a[j], a[i]]
  }
}
// 注意：降序判定用严格 >，相等元素留在升序段 → 保证稳定性`

const timSortCode = `// Tim 排序主循环：找 run → 补足 minrun → 维护 run 栈并归并
function timSort(a: number[]): void {
  const n = a.length
  const minRun = calcMinRun(n)
  const stack: Array<[number, number]> = []   // 每个 run 的 [start, end)
  let s = 0
  while (s < n) {
    // ① 找 natural run
    let e = nextRun(a, s)
    // ② 太短 → 插入排序补足到 minrun
    if (e - s < minRun) {
      const limit = Math.min(s + minRun, n)
      insertionSort(a, s, limit)
      e = limit
    }
    stack.push([s, e])
    // ③ Z 字形不变量：保证归并双方体量相近
    while (stack.length >= 2) {
      const [x1, x2] = stack[stack.length - 2]
      const [y1, y2] = stack[stack.length - 1]
      const xLen = x2 - x1, yLen = y2 - y1
      const zLen = stack.length >= 3
        ? stack[stack.length - 3][1] - stack[stack.length - 3][0]
        : Infinity
      if (xLen <= yLen || zLen <= xLen + yLen) {
        merge(a, x1, x2, y2)          // 合并最后两个 run
        stack[stack.length - 2] = [x1, y2]
        stack.pop()
      } else break
    }
    s = e
  }
  // 收尾：把栈里所有 run 合并成一个
  while (stack.length > 1) {
    const [x1, x2] = stack[stack.length - 2]
    const [, y2] = stack[stack.length - 1]
    merge(a, x1, x2, y2)
    stack[stack.length - 2] = [x1, y2]
    stack.pop()
  }
}`

const gallopingCode = `// 归并两个相邻有序段 a[lo..mid) 与 a[mid..hi)
function merge(a: number[], lo: number, mid: number, hi: number): void {
  const left = a.slice(lo, mid)   // 只复制较短一侧（Tim 的工程细节）
  let i = 0, j = mid, k = lo
  while (i < left.length && j < hi) {
    if (left[i] <= a[j]) a[k++] = left[i++]
    else a[k++] = a[j++]
  }
  while (i < left.length) a[k++] = left[i++]
}

// galloping（奔袭）：一侧连续获胜时，用二分查找一次搬走整段
// 把连续 win 的代价从 O(t) 降到 O(log t) —— 对“部分有序”数据极有效
function gallopingFind(a: number[], value: number, from: number, to: number): number {
  let lo = from, hi = to
  while (lo < hi) {
    const mid = (lo + hi) >>> 1
    if (a[mid] <= value) lo = mid + 1
    else hi = mid
  }
  return lo   // 第一个 > value 的位置，整段一起搬
}`
</script>

<style scoped></style>
