<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🧭 内省排序：快排 + 堆排 + 插入混合</h1>
          <p class="text-sm text-slate-500 mt-1">C++ std::sort 的实现 —— 快排为主，递归过深就换堆排，小规模换插入</p>
        </div>
        <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-4-7</span>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">📐</span>
          结构总览：三合一策略
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          内省排序（Introsort）是 <strong>C++ std::sort 的标准实现</strong>：平时按<strong>快排</strong>跑（平均最快），
          一旦发现递归深度超过 <strong>2·⌈log₂n⌉</strong>（说明分区严重失衡，快排要退化成 O(n²)），立刻切换成<strong>堆排序</strong>兜底；
          遇到规模 ≤ 16 的小区间，改用<strong>插入排序</strong>收尾。三种算法各取所长，最坏情况被焊死在 O(n log n)。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="in-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="14" y="16" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">内省排序 = 快排 + 深度监控 + 堆排兜底 + 插入收尾</text>

            <!-- 面板 1：快排 -->
            <text x="14" y="40" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">① 快排分区（默认策略）</text>
            <rect x="14" y="56" width="22" height="26" rx="3" fill="#f59e0b" stroke="#b45309" stroke-width="1" />
            <text x="25" y="69" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="40" y="56" width="22" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
            <text x="51" y="69" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="66" y="56" width="22" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
            <text x="77" y="69" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <rect x="92" y="56" width="22" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
            <text x="103" y="69" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="118" y="56" width="22" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
            <text x="129" y="69" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <rect x="144" y="56" width="22" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
            <text x="155" y="69" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="170" y="56" width="22" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
            <text x="181" y="69" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="196" y="56" width="22" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
            <text x="207" y="69" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <line x1="114" y1="54" x2="114" y2="84" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="60" y="94" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">小</text>
            <text x="175" y="94" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">大</text>
            <text x="14" y="114" font-size="10" font-family="monospace" fill="#64748b">枢轴 5 就位（橙），递归两侧</text>

            <!-- 面板 2：堆排 -->
            <text x="252" y="40" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">② 递归过深 → 堆排兜底</text>
            <line x1="363" y1="75" x2="326" y2="91" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="363" y1="75" x2="400" y2="91" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="326" y1="117" x2="289" y2="133" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="326" y1="117" x2="326" y2="133" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="400" y1="117" x2="363" y2="133" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="400" y1="117" x2="400" y2="133" stroke="#94a3b8" stroke-width="1.5" />
            <circle cx="363" cy="62" r="13" fill="#f59e0b" stroke="#b45309" stroke-width="1.5" />
            <text x="363" y="62" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <circle cx="326" cy="104" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="326" y="104" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <circle cx="400" cy="104" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="400" y="104" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
            <circle cx="289" cy="146" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="289" y="146" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <circle cx="326" cy="146" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="326" y="146" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <circle cx="363" cy="146" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="363" y="146" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <circle cx="400" cy="146" r="13" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="400" y="146" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <text x="252" y="178" font-size="10" font-family="monospace" fill="#64748b">深度 &gt; 2⌈log₂n⌉ 即切换</text>
            <text x="252" y="192" font-size="10" font-family="monospace" font-weight="bold" fill="#059669">最坏 O(n log n) 焊死</text>

            <!-- 面板 3：插入 -->
            <text x="490" y="40" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">③ 小数组 → 插入排序</text>
            <rect x="492" y="56" width="28" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
            <text x="506" y="69" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="528" y="56" width="28" height="26" rx="3" fill="#f59e0b" stroke="#b45309" stroke-width="1" />
            <text x="542" y="69" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="564" y="56" width="28" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
            <text x="578" y="69" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <line x1="546" y1="86" x2="546" y2="102" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#in-a)" />
            <rect x="492" y="108" width="28" height="26" rx="3" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="506" y="121" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
            <rect x="528" y="108" width="28" height="26" rx="3" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="542" y="121" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
            <rect x="564" y="108" width="28" height="26" rx="3" fill="#4ade80" stroke="#22c55e" stroke-width="1" />
            <text x="578" y="121" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">4</text>
            <text x="490" y="152" font-size="10" font-family="monospace" fill="#64748b">规模 ≤ 16 时插入更快</text>

            <!-- 深度监控仪表 -->
            <text x="14" y="202" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">递归深度监控：平均 ≈ ⌈log₂n⌉，超过 2·⌈log₂n⌉ 判定退化 → 切堆排</text>
            <rect x="14" y="212" width="230" height="10" rx="3" fill="#4ade80" />
            <rect x="244" y="212" width="230" height="10" rx="3" fill="#f59e0b" />
            <rect x="474" y="212" width="232" height="10" rx="3" fill="#ef4444" />
            <line x1="474" y1="206" x2="474" y2="228" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 3" />
            <text x="14" y="238" font-size="10" font-family="monospace" fill="#64748b">0</text>
            <text x="238" y="238" font-size="10" font-family="monospace" fill="#64748b">⌈log₂n⌉</text>
            <text x="466" y="238" font-size="10" font-family="monospace" fill="#ef4444">2⌈log₂n⌉</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：三套策略并行不悖 —— 正常跑快排；深度越线（红区）切堆排；小块交给插入排序</figcaption>
        </figure>

        <!-- before / after -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键切换：快排退化时 → 堆排兜底</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">快排分区进行中：枢轴 5（橙），扫描比较（红）</p>
            <svg viewBox="0 0 340 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="12" y="18" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">分区：5 为枢轴，其余逐个与枢轴比较</text>
              <rect x="12" y="100" width="22" height="26" rx="3" fill="#f59e0b" stroke="#b45309" stroke-width="1" />
              <text x="23" y="113" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="39" y="100" width="22" height="26" rx="3" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
              <text x="50" y="113" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="66" y="100" width="22" height="26" rx="3" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
              <text x="77" y="113" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="93" y="100" width="22" height="26" rx="3" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
              <text x="104" y="113" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="120" y="100" width="22" height="26" rx="3" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
              <text x="131" y="113" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <rect x="147" y="100" width="22" height="26" rx="3" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
              <text x="158" y="113" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="174" y="100" width="22" height="26" rx="3" fill="#ef4444" stroke="#b91c1c" stroke-width="1" />
              <text x="185" y="113" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="201" y="100" width="22" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="212" y="113" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <line x1="114" y1="98" x2="114" y2="128" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="60" y="140" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">小</text>
              <text x="175" y="140" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">大</text>
              <text x="12" y="168" font-size="10" font-family="monospace" fill="#64748b">若每轮分区都如此失衡（如已排序 + 末尾枢轴），</text>
              <text x="12" y="184" font-size="10" font-family="monospace" fill="#ef4444">深度将逼近 n → 快排 O(n²) 即将发生</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">快排的隐患：输入越有序，末尾枢轴分区越失衡，递归越深</figcaption>
          </figure>

          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">深度越线 → 切换堆排：堆树兜底（绿）</p>
            <svg viewBox="0 0 340 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="10" y="18" font-size="11" font-family="monospace" font-weight="bold" fill="#64748b">切换后：剩余子区间建大顶堆，逐个取最大</text>
              <line x1="170" y1="75" x2="132" y2="89" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="170" y1="75" x2="208" y2="89" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="132" y1="115" x2="94" y2="129" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="132" y1="115" x2="132" y2="129" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="208" y1="115" x2="170" y2="129" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="208" y1="115" x2="208" y2="129" stroke="#94a3b8" stroke-width="1.5" />
              <circle cx="170" cy="62" r="14" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="170" y="62" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
              <circle cx="132" cy="102" r="14" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="132" y="102" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">4</text>
              <circle cx="208" cy="102" r="14" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="208" y="102" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
              <circle cx="94" cy="142" r="14" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="94" y="142" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
              <circle cx="132" cy="142" r="14" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="132" y="142" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
              <circle cx="170" cy="142" r="14" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="170" y="142" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
              <circle cx="208" cy="142" r="14" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="208" y="142" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
              <text x="10" y="182" font-size="10" font-family="monospace" fill="#64748b">堆排序：建堆 O(m) + m 次取最大 O(m log m)，</text>
              <text x="10" y="198" font-size="10" font-family="monospace" font-weight="bold" fill="#059669">与输入分布无关 → 最坏 O(n log n) 焊死</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">堆排不看数据脸色，稳定兜底 —— 这是内省排序能成为 std::sort 的原因</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1 动机 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          动机：三种算法各有各的痛
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          单独看三大排序，各有致命短板：
        </p>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>快排：</strong>平均最快（常数小、缓存友好），但<strong>最坏 O(n²)</strong> —— 已排序输入 + 末尾枢轴就是典型的退化场景，工程上不可接受。</span></li>
          <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>堆排：</strong>最坏稳定 O(n log n)、O(1) 空间，但<strong>常数因子大</strong>（堆的随机访问缓存不友好），比快排慢 2~3 倍。</span></li>
          <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>插入排序：</strong>小规模（≤ 16）时最快 —— 无递归、常数极小、对近似有序近乎 O(n)；但规模一大就是 O(n²)。</span></li>
        </ul>

        <p class="text-slate-600 mb-4 leading-relaxed">
          1997 年 David Musser 提出 <strong>Introsort（内省排序）</strong>：让快排当主力，但给它装一个<strong>「自我监控」</strong> ——
          递归深度超过 2·⌈log₂n⌉ 就判定「分区失衡，快排要完」，立刻换堆排收场；小区间则直接交给插入排序。
          最终效果：<strong>平均快排的速度 + 最坏堆排的保证</strong>，这也是 C++ <code class="bg-slate-100 px-1 rounded text-xs font-mono">std::sort</code> 的实现方案。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          内省排序 ≈ <strong>智能混合策略</strong>：先用最猛的工具（快排），发现不对劲（递归太深）就换稳妥工具（堆排），
          剩一点点就手工（插入）—— 工程上是「<strong>扬长避短</strong>」的典范。<br/>
          前端里同样的思路比比皆是：<strong>先用 IntersectionObserver，降级到 scroll 监听</strong>；<strong>先用 GPU 动画，降级到 JS</strong>；
          <strong>先走缓存，miss 了再查数据库</strong>。快路径 + 慢路径兜底，是系统设计的基本功。</p>
        </aside>
      </section>

      <!-- 2 三合一策略 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          三合一策略：快排 + 深度限制 + 插入收尾
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          递归进入每个子区间时，按顺序做三个判断：
        </p>
        <ol class="space-y-3 text-slate-600 text-sm mb-4 list-none">
          <li class="flex items-start gap-2"><span class="w-6 h-6 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">1</span><span><strong>快排分区：</strong>默认策略。选枢轴（工程上常用三数取中）、分区、递归两侧，把大问题切成小问题。</span></li>
          <li class="flex items-start gap-2"><span class="w-6 h-6 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">2</span><span><strong>深度监控：</strong>每递归一层深度减 1。初始深度 = 2·⌈log₂n⌉；一旦归零还剩下大区间，说明快排正在 O(n²) 边缘 —— <strong>切换堆排序</strong>，把这个区间彻底排完再返回。</span></li>
          <li class="flex items-start gap-2"><span class="w-6 h-6 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">3</span><span><strong>插入收尾：</strong>子区间长度 ≤ 16 时不再递归，直接插入排序 —— 递归开销省掉，常数最小，还顺带利用了「小区间往往近似有序」。</span></li>
        </ol>

        <p class="text-slate-600 mb-4 leading-relaxed">
          三个判断的顺序很讲究：<strong>先查规模（插入）、再查深度（堆排）、最后才分区（快排）</strong> ——
          小问题永远走最省的路，深度危机永远在分区之前被拦截。
        </p>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>深度限制为什么是 2 倍而不是其他？快排平均递归深度 ≈ ⌈log₂n⌉；给 2 倍的余量，
          正常输入（哪怕略失衡）绝不会触发切换，只有真正病态（如已排序 + 末尾枢轴）才会越线 —— 既要兜底，又不想误伤正常性能。</p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>把深度判断写成「递归层数超过 n」（线性阈值）—— 那样病态输入要递归到 n 层才触发，早就栈溢出了。
          必须是 <strong>2·⌈log₂n⌉</strong> 这样的对数阈值，才能在 O(n²) 酿成大祸前及时刹车。</p>
        </aside>
      </section>

      <!-- 3 实现 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          实现：40 行说清三合一
        </h2>

        <h3 class="text-base font-semibold text-slate-700 mb-3">第 1 步：主框架</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          一个 <code class="bg-slate-100 px-1 rounded text-xs font-mono">introSort</code> 递归函数，三个分支按「插入 → 堆排 → 快排」的顺序判断，就是内省排序的全部骨架。
        </p>
        <div class="mb-4">
          <Code language="ts" :code="introFrameworkCode" title="introsort.ts" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">第 2 步：深度阈值与堆排兜底</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          深度限制把最坏情况「焊死」在 O(n log n)：堆排序的实现细节见模块 7-1-3，这里复用即可。
        </p>
        <div class="mb-4">
          <Code language="ts" :code="depthLimitCode" title="depthLimit-heapSort.ts" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">第 3 步：快排分区 + 插入收尾</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          分区用 Lomuto（或 Hoare）即可；收尾的插入排序是小数组的「秘密武器」。
        </p>
        <div class="mb-4">
          <Code language="ts" :code="partitionCode" title="partition.ts" />
        </div>
        <div class="mb-4">
          <Code language="ts" :code="insertionFinishCode" title="insertionFinish.ts" />
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          三个分支的写法 ≈ <strong>前端错误处理的三层防线</strong>：<code class="bg-purple-100 px-1 rounded text-xs font-mono">try/catch</code>（快排）→
          <code class="bg-purple-100 px-1 rounded text-xs font-mono">onerror</code> 兜底（堆排）→ 默认值/降级 UI（插入收尾）。小问题本地解决、大问题全局兜底，
          和 introsort 的「插入收尾 → 堆排保底」如出一辙。</p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>堆排兜底写成对整个<strong>剩余数组</strong>排序，而不是对<strong>当前子区间 [lo..hi]</strong> 排序。
          <code class="bg-amber-100 px-1 rounded text-xs font-mono">std::sort</code> 的语义是「当前子问题交给堆排」—— 排错区间会把已经就位的枢轴全部打乱，白忙一场。</p>
        </aside>
      </section>

      <!-- 4 复杂度 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          复杂度：最坏 O(n log n)，空间 O(log n)
        </h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">指标</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">内省排序</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">最好</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200">与快排一致（插入收尾进一步降低常数）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">平均</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200">正常输入 = 快排的速度</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">最坏</td><td class="px-4 py-2 border border-slate-200 text-green-600 font-medium">O(n log n)</td><td class="px-4 py-2 border border-slate-200">深度越线后由堆排兜底，与输入分布无关</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">空间</td><td class="px-4 py-2 border border-slate-200">O(log n)</td><td class="px-4 py-2 border border-slate-200">递归栈（堆排分支为 O(1) 迭代）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">稳定性</td><td class="px-4 py-2 border border-slate-200 text-red-600 font-medium">❌ 不稳定</td><td class="px-4 py-2 border border-slate-200">分区交换会打乱相等元素的相对顺序</td></tr>
            </tbody>
          </table>
        </div>

        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>快排路径：</strong>深度 ≤ 2⌈log₂n⌉，最多递归这么多层 → 平均 O(n log n)。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>堆排兜底：</strong>深度一旦归零，剩余区间 O(m log m) 排完即返回 —— 最坏仍 O(n log n)。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>插入收尾：</strong>所有 ≤ 16 的小块合计 O(n × 16) 常数级，工程上视为 O(n)。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>代价对比：</strong>比纯快排多了「深度计数器」（常数开销几乎为零），换来最坏情况从 O(n²) → O(n log n) 的质变。</span></li>
        </ul>
      </section>

      <!-- 5 与 Timsort 对比 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          与 Timsort 对比：两种「混合」的不同哲学
        </h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对比项</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">内省排序（std::sort）</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Tim 排序（Python/Java/V8）</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">组合方式</td><td class="px-4 py-2 border border-slate-200">快排 + 堆排 + 插入</td><td class="px-4 py-2 border border-slate-200">插入 + 归并（识别 run）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">最坏</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">最好</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200 text-green-600 font-medium">O(n)（已有序）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">空间</td><td class="px-4 py-2 border border-slate-200 text-green-600 font-medium">O(log n)</td><td class="px-4 py-2 border border-slate-200">O(n)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">稳定</td><td class="px-4 py-2 border border-slate-200 text-red-600 font-medium">❌</td><td class="px-4 py-2 border border-slate-200 text-green-600 font-medium">✅</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">应对病态输入</td><td class="px-4 py-2 border border-slate-200">深度监控切堆排</td><td class="px-4 py-2 border border-slate-200">天然免疫（归并无退化）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">主要卖点</td><td class="px-4 py-2 border border-slate-200">快排速度 + 最坏保证，省内存</td><td class="px-4 py-2 border border-slate-200">稳定 + 吃「部分有序」红利</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">
          一句话区分：<strong>内省排序对「坏输入」说「我兜底」</strong>（深度监控 + 堆排），
          <strong>Tim 排序对「好输入」说「我加速」</strong>（识别 run + 最好 O(n)）。
          前者是 C++ 的取舍 —— 省内存、不保证稳定、疯狂求快；后者是 Python/Java/V8 的取舍 —— 稳定优先、空间换时间。
        </p>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 工程建议：</strong>JS/TS 里 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">Array.prototype.sort</code> 已经是稳定排序（TimSort 系），
          直接信任它即可；如果手写排序做底层库，<strong>需要稳定选归并/Tim，需要省内存 + 不要求稳定选内省排序</strong> —— 按场景挑工具，而不是一把梭。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">🎬</span>
          动画演示：两种输入下的三合一策略
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          演示跑真实的内省排序逻辑（12 个元素）：<strong>演示 A</strong> 用常规枢轴 —— 快排分区为主（枢轴橙、比较红）、小数组插入收尾（绿）；
          <strong>演示 B</strong> 用末尾枢轴 + 升序输入（经典病态）—— 递归过深时<strong>信息栏提示切换到堆排</strong>兜底（堆顶橙、取最大值绿）。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ bars.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔍 比较: {{ cmp }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔁 交换: {{ swp }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @click="runIntrosort" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">🧭 Introsort</button>
          <button @click="resetDemo" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}"><v-stage :config="{width: W, height: H}"><v-layer>
          <v-rect v-for="b in bars" :key="b.id" :config="barCfg(b)" />
          <v-text v-for="b in bars" :key="'vt'+b.id" :config="valCfg(b)" />
          <v-text v-for="(b,i) in bars" :key="'it'+b.id" :config="idxCfg(i)" />
        </v-layer></v-stage></div>
        <p class="text-xs text-slate-400 mt-2">演示阈值：小数组阈值 = 4、深度上限 = 2·⌈log₂12⌉ ≈ 7（工程实现分别为 16 与 2·⌈log₂n⌉，为在 12 个元素上展示全部三种策略而调小）。</p>
      </section>

      <!-- 📋 小结 -->
      <section id="sec-summary" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>一句话：</strong>快排为主力，递归深度超过 2·⌈log₂n⌉ 就切堆排兜底，小区间（≤ 16）用插入收尾 —— 平均快排速度 + 最坏 O(n log n) 保证。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>判断顺序：</strong>先查规模（插入）→ 再查深度（堆排）→ 最后分区（快排），小问题走最省的路。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>工程地位：</strong>C++ <code class="bg-slate-100 px-1 rounded text-xs font-mono">std::sort</code> 的标准实现；O(log n) 空间、不稳定。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>对比记忆：</strong>内省排序「对坏输入兜底」，Tim 排序「对好输入加速」—— 前者是 C++ 的取舍，后者是 Python/Java/V8 的取舍。</span></li>
        </ul>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 记忆钩子：</strong>内省排序 = 快排 + 深度监控 + 堆排兜底 + 插入收尾。「内省」二字就是自我监控：察觉自己要变慢，主动换赛道。排序模块到此收官 —— 下一章进入 <strong>搜索</strong>：暴力枚举与搜索空间。</p>
        </aside>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-4-more-sorts/dsa-7-4-6-timsort" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：Tim排序：插入+归并的工业级排序</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-0-search-basics/dsa-8-0-1-overview" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：搜索总览：暴力枚举与搜索空间 →</RouterLink>
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
  { id: "sec-2", name: "2 三合一策略" },
  { id: "sec-3", name: "3 实现" },
  { id: "sec-4", name: "4 复杂度" },
  { id: "sec-5", name: "5 与 Timsort 对比" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-summary", name: "📋 小结" },
]

// ===== 🎬 内省排序动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const cmp = ref(0), swp = ref(0)
interface Bar { id:number; val:number; color:string; s?:number; _x?:number; _y?:number; _h?:number }
const bars = reactive<Bar[]>([])
const BASE = 280, MXH = 220, BW = 46, G = 8
const THRESH = 4   // 演示用小数组阈值（工程上为 16）

function layout() {
  const n = bars.length, bw = Math.min(BW, Math.floor((W.value - 20) / (n || 1) - G))
  const maxV = Math.max(...bars.map(b => b.val), 1)
  bars.forEach((b, i) => {
    b._x = 10 + i * (bw + G)
    b._h = Math.max(28, (b.val / maxV) * MXH)
    b._y = BASE - b._h
  })
}
function barCfg(b:any){ const s=b.s??1, bw=Math.min(BW,Math.floor((W.value-20)/(bars.length||1)-G)); return { x:b._x+(bw*(1-s))/2, y:b._y, width:bw*s, height:b._h*s, fill:b.color, cornerRadius:[4,4,0,0], stroke:'#94a3b8', strokeWidth:1, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 } }
function valCfg(b:any){ const s=b.s??1, h=b._h*s, bw=Math.min(BW,Math.floor((W.value-20)/(bars.length||1)-G)); return { x:b._x+(bw*(1-s))/2, y:b._y+2, width:bw*s, height:h-4, text:String(b.val), fontSize:14, fontFamily:'monospace', fontStyle:'bold', fill:h>30?'#fff':C.text, align:'center', verticalAlign:'middle' } }
function idxCfg(i:number){ const bw=Math.min(BW,Math.floor((W.value-20)/(bars.length||1)-G)); return { x:bars[i]._x??0, y:BASE+6, width:bw, text:'['+i+']', fontSize:10, fontFamily:'monospace', fill:C.muted, align:'center' } }
function colorAt(i:number, c:string){ if (bars[i]) bars[i].color = c }
function allCyan(){ bars.forEach(b => b.color = C.cyan) }
function initArr(vals:number[] = [1,2,3,4,5,6,7,8,9,10,11,12]) {
  bars.splice(0)
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

function depthLimitOf(n: number) { return Math.floor(2 * Math.log2(n)) }

// 交换两柱的值（橙色闪烁），调用方负责最终着色
async function swapVal(a: number, b: number) {
  if (a === b) return
  const t = bars[a].val; bars[a].val = bars[b].val; bars[b].val = t
  colorAt(a, C.orange); colorAt(b, C.orange)
  layout()
  await d(120)
  colorAt(a, C.cyan); colorAt(b, C.cyan)
}

// Lomuto 分区（带动画）：枢轴橙、扫描红、就位绿
async function partitionRange(lo: number, hi: number, midPivot: boolean): Promise<number> {
  const pi = midPivot ? lo + Math.floor((hi - lo) / 2) : hi
  const pv = bars[pi].val
  status.value = `⛏️ 分区 [${lo}..${hi}]：枢轴 = ${pv}（橙）`
  await swapVal(pi, hi)
  colorAt(hi, C.orange)
  await d(320)
  let i = lo
  for (let j = lo; j < hi; j++) {
    colorAt(j, C.red)
    cmp.value++
    await d(110)
    if (bars[j].val <= pv) {
      if (i !== j) { await swapVal(i, j); swp.value++ }
      colorAt(i, C.cyan)
      i++
    } else {
      colorAt(j, C.cyan)
    }
  }
  await swapVal(i, hi)
  colorAt(i, C.green)   // 枢轴就位（最终位置）
  status.value = `→ 枢轴 ${pv} 就位于 [${i}]（绿）`
  await d(420)
  return i
}

// 插入排序收尾（带动画）：整段变绿
async function insertionRange(lo: number, hi: number) {
  for (let i = lo + 1; i <= hi; i++) {
    const key = bars[i].val
    colorAt(i, C.orange)
    await d(180)
    let j = i - 1
    while (j >= lo && bars[j].val > key) {
      bars[j + 1].val = bars[j].val
      colorAt(j, C.red)
      cmp.value++; swp.value++
      layout()
      await d(110)
      colorAt(j, C.cyan)
      j--
    }
    bars[j + 1].val = key
    layout()
    await d(140)
  }
  for (let k = lo; k <= hi; k++) colorAt(k, C.green)
  await d(300)
}

// 堆排兜底（带动画）：建堆 + 逐个取最大值锁定
async function heapRange(lo: number, hi: number) {
  const n = hi - lo + 1
  status.value = `⛏️ 堆排：对 [${lo}..${hi}] 建大顶堆`
  for (let i = lo + Math.floor(n / 2) - 1; i >= lo; i--) await siftDown(i, hi, lo)
  for (let end = hi; end > lo; end--) {
    status.value = `⛏️ 堆排：堆顶 ${bars[lo].val} 与末尾交换 → 锁定（绿）`
    await swapVal(lo, end)
    colorAt(end, C.green)
    await siftDown(lo, end - 1, lo)
  }
  colorAt(lo, C.green)
  await d(300)
}

async function siftDown(start: number, end: number, lo: number) {
  let i = start
  while (true) {
    const l = lo + 2 * (i - lo) + 1
    const r = l + 1
    let big = i
    if (l <= end && bars[l].val > bars[big].val) big = l
    if (r <= end && bars[r].val > bars[big].val) big = r
    if (big === i) break
    colorAt(i, C.orange); colorAt(big, C.orange)
    cmp.value++
    status.value = `堆排下沉：${bars[i].val} 与较大孩子 ${bars[big].val} 交换`
    await d(140)
    await swapVal(i, big)
    i = big
  }
}

// 内省排序递归（真实逻辑 + 动画埋点）
async function qs(lo: number, hi: number, depth: number, midPivot: boolean) {
  if (lo >= hi) return
  const size = hi - lo + 1
  if (size <= THRESH) {
    status.value = `📐 子区间 [${lo}..${hi}] 长度 ${size} ≤ ${THRESH} → 插入排序收尾`
    await insertionRange(lo, hi)
    return
  }
  if (depth === 0) {
    status.value = '⚠️ 递归深度达上限（2·⌈log₂n⌉）→ 切换堆排序兜底'
    await heapRange(lo, hi)
    return
  }
  status.value = `⛏️ 快排分区 [${lo}..${hi}]，剩余深度 ${depth}`
  const p = await partitionRange(lo, hi, midPivot)
  await qs(lo, p - 1, depth - 1, midPivot)
  await qs(p + 1, hi, depth - 1, midPivot)
}

async function runIntrosort() {
  await act('🧭 内省排序：两种输入演示三合一策略', 'Introsort', async () => {
    // —— 演示 A：常规输入 → 快排 + 插入收尾 ——
    initArr()
    status.value = '演示 A：常规输入（中间枢轴）→ 快排分区为主，小数组插入收尾'
    await d(900)
    await qs(0, bars.length - 1, depthLimitOf(bars.length), true)
    await d(500)
    // —— 演示 B：病态输入 → 深度耗尽切堆排 ——
    initArr()
    status.value = '演示 B：病态输入（升序 + 末尾枢轴）→ 递归过深，切堆排兜底'
    await d(900)
    await qs(0, bars.length - 1, depthLimitOf(bars.length), false)
    status.value = '✅ 排序完成：快排退化被拦截，整体仍为 O(n log n)'
    await d(700)
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
const introFrameworkCode = `// 内省排序主框架：快排 + 深度限制 + 小数组插入
const THRESHOLD = 16   // 小数组阈值（工程常用 16）

function introSort(arr: number[], lo: number, hi: number, depth: number): void {
  if (hi - lo + 1 <= THRESHOLD) {        // ③ 小数组 → 插入排序（常数最小）
    insertionSort(arr, lo, hi)
    return
  }
  if (depth === 0) {                     // ② 递归过深 → 堆排序兜底
    heapSort(arr, lo, hi)                //    最坏 O(n log n) 焊死
    return
  }
  const p = partition(arr, lo, hi)       // ① 快排分区
  introSort(arr, lo, p - 1, depth - 1)
  introSort(arr, p + 1, hi, depth - 1)
}

// 入口：初始深度 = 2 × ⌈log₂n⌉
function sort(arr: number[]): void {
  const maxDepth = Math.floor(2 * Math.log2(arr.length))
  introSort(arr, 0, arr.length - 1, maxDepth)
}`

const depthLimitCode = `// 深度限制：为什么是 2·⌈log₂n⌉？
// 快排平均递归深度 ≈ ⌈log₂n⌉。若深度超过 2 倍，
// 说明分区严重失衡（如已排序 + 末尾枢轴），继续递归会奔向 O(n²)。
function depthLimit(n: number): number {
  return Math.floor(2 * Math.log2(n))   // 有的实现取 ceil
}
// 例：n = 1_000_000 → 2·⌈log₂10⁶⌉ ≈ 40 层
// 达到 40 层还没排完 → 换堆排序，把最坏情况焊死在 O(n log n)

// 堆排序兜底：对子区间建大顶堆并逐个取出最大值
function heapSort(a: number[], lo: number, hi: number): void {
  const n = hi - lo + 1
  for (let i = lo + Math.floor(n / 2) - 1; i >= lo; i--) siftDown(a, i, hi, lo)
  for (let end = hi; end > lo; end--) {
    [a[lo], a[end]] = [a[end], a[lo]]
    siftDown(a, lo, end - 1, lo)
  }
}`

const partitionCode = `// Lomuto 分区：取末尾元素做枢轴（工程上常用三数取中增强）
function partition(a: number[], lo: number, hi: number): number {
  const pivot = a[hi]
  let i = lo
  for (let j = lo; j < hi; j++) {
    if (a[j] <= pivot) {
      [a[i], a[j]] = [a[j], a[i]]
      i++
    }
  }
  [a[i], a[hi]] = [a[hi], a[i]]
  return i   // 枢轴最终位置：左边都 ≤ pivot，右边都 > pivot
}`

const insertionFinishCode = `// 插入排序收尾：规模 ≤ 16 时，插入排序比快排/归并都快
// 原因：无递归开销、常数极小、对“近似有序”数据近乎 O(n)
function insertionSort(a: number[], lo: number, hi: number): void {
  for (let i = lo + 1; i <= hi; i++) {
    const key = a[i]
    let j = i - 1
    while (j >= lo && a[j] > key) {
      a[j + 1] = a[j]    // 大于 key 的元素右移
      j--
    }
    a[j + 1] = key
  }
}
// 三合一效果：正常输入像快排一样快；病态输入被堆排兜底；
// 尾部小块用插入排序收尾 —— 三者取长补短`
</script>

<style scoped></style>
