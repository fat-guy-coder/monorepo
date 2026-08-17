<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🎓 中位数之中位数：O(n) 确定性选择</h1>
          <p class="text-sm text-slate-500 mt-1">用「分组取中位数」选出一个好 pivot，把最坏也压到 O(n)</p>
        </div>
        <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-3-2</span>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：Median of Medians
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          上一节的快速选择期望 O(n)，但<strong>最坏可能退化到 O(n²)</strong> —— 只要 pivot 每次都选到极值。
          中位数之中位数（Median of Medians，简称 MoM）给出一个<strong>确定性</strong>答案：
          先把数组<strong>每 5 个一组</strong>，每组取中位数；再在约 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">n/5</code> 个中位数里
          <strong>递归取中位数</strong>，把这个「中位数的中位数」当 pivot。数学上可证明这个 pivot 两边都至少有
          <strong>3/10 的元素</strong>，于是每轮至少稳定淘汰 30% —— 最坏也是 O(n)。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="16" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">Median of Medians：分组取中位数 → 中位数的中位数当 pivot</text>

            <!-- ① 分组 -->
            <text x="16" y="46" font-size="11" font-family="monospace" fill="#64748b">① 每 5 个一组：每组取中位数（橙色）</text>
            <rect x="10" y="48" width="260" height="52" rx="8" fill="none" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="5 4" />
            <rect x="16" y="54" width="46" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
            <text x="39" y="74" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="68" y="54" width="46" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="91" y="74" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="120" y="54" width="46" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="143" y="74" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <rect x="172" y="54" width="46" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="195" y="74" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="224" y="54" width="46" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="247" y="74" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <text x="140" y="116" text-anchor="middle" font-size="11" font-family="monospace" fill="#f59e0b" font-weight="bold">组 1 中位数 = 5</text>

            <rect x="294" y="48" width="156" height="52" rx="8" fill="none" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="5 4" />
            <rect x="300" y="54" width="46" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
            <text x="323" y="74" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="352" y="54" width="46" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="375" y="74" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="404" y="54" width="46" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="427" y="74" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <text x="372" y="116" text-anchor="middle" font-size="11" font-family="monospace" fill="#f59e0b" font-weight="bold">组 2 中位数 = 4</text>

            <text x="16" y="140" font-size="11" font-family="monospace" fill="#f59e0b" font-weight="bold">② 组中位数 [5, 4] → 中位数的中位数 = 4（pivot，橙色）</text>

            <!-- ③ 分区 -->
            <text x="16" y="160" font-size="11" font-family="monospace" fill="#64748b">③ 以 pivot=4 分区：第 6 小（k=5）落在右侧（绿框）</text>
            <rect x="40" y="168" width="70" height="40" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" />
            <text x="75" y="188" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#64748b">3</text>
            <rect x="120" y="168" width="70" height="40" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" />
            <text x="155" y="188" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#64748b">1</text>
            <rect x="200" y="168" width="70" height="40" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" />
            <text x="235" y="188" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#64748b">2</text>
            <rect x="280" y="168" width="70" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
            <text x="315" y="188" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="360" y="168" width="70" height="40" rx="6" fill="#06b6d4" stroke="#4ade80" stroke-width="2.5" />
            <text x="395" y="188" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <rect x="440" y="168" width="70" height="40" rx="6" fill="#06b6d4" stroke="#4ade80" stroke-width="2.5" />
            <text x="475" y="188" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <rect x="520" y="168" width="70" height="40" rx="6" fill="#06b6d4" stroke="#4ade80" stroke-width="2.5" />
            <text x="555" y="188" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <rect x="600" y="168" width="70" height="40" rx="6" fill="#06b6d4" stroke="#4ade80" stroke-width="2.5" />
            <text x="635" y="188" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <text x="75" y="218" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[0]</text>
            <text x="155" y="218" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[1]</text>
            <text x="235" y="218" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[2]</text>
            <text x="315" y="218" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#f59e0b" font-weight="bold">[3]</text>
            <text x="395" y="218" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[4]</text>
            <text x="475" y="218" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[5]</text>
            <text x="555" y="218" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[6]</text>
            <text x="635" y="218" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[7]</text>

            <text x="16" y="242" font-size="11" font-family="monospace" fill="#16a34a" font-weight="bold">k=5 &gt; pivot 位置 3 → 只递归右侧 [4..7]；pivot 保证两侧都不少于 3/10 的元素</text>
            <text x="16" y="258" font-size="10" font-family="monospace" fill="#0891b2">确定性：无论输入多「坏」，每轮都稳定淘汰 ≥ 30% → 最坏 O(n)</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Median of Medians 全流程 —— 分组取中位数 → 中位数的中位数当 pivot → 分区后只递归含 K 的一侧</figcaption>
        </figure>

        <h3 class="text-sm font-semibold text-slate-700 mb-2">两张图：思想来源与工程现实</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">思想来源：先分组取代表，再在代表里取代表</p>
            <svg viewBox="0 0 320 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="mom-arr1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
                <marker id="mom-arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" />
                </marker>
              </defs>
              <text x="16" y="18" font-size="12" font-family="monospace" fill="#334155" font-weight="bold">像抽样调查：每组派 1 个代表</text>
              <text x="16" y="36" font-size="10" font-family="monospace" fill="#64748b">3 组 → 3 个组中位数 → 中位数的中位数</text>
              <!-- 3 groups of 3 cells -->
              <rect x="16" y="46" width="26" height="26" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="29" y="59" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="46" y="46" width="26" height="26" rx="4" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="59" y="59" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="76" y="46" width="26" height="26" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="89" y="59" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="120" y="46" width="26" height="26" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="133" y="59" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="150" y="46" width="26" height="26" rx="4" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="163" y="59" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="180" y="46" width="26" height="26" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="193" y="59" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <rect x="224" y="46" width="26" height="26" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="237" y="59" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="254" y="46" width="26" height="26" rx="4" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="267" y="59" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
              <rect x="284" y="46" width="26" height="26" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="297" y="59" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <!-- reps -->
              <line x1="59" y1="72" x2="59" y2="86" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#mom-arr1)" />
              <line x1="163" y1="72" x2="163" y2="86" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#mom-arr1)" />
              <line x1="267" y1="72" x2="267" y2="86" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#mom-arr1)" />
              <rect x="46" y="86" width="26" height="26" rx="4" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="59" y="99" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="150" y="86" width="26" height="26" rx="4" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="163" y="99" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="254" y="86" width="26" height="26" rx="4" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="267" y="99" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
              <!-- final -->
              <line x1="163" y1="112" x2="163" y2="124" stroke="#4ade80" stroke-width="1.5" marker-end="url(#mom-arr2)" />
              <rect x="150" y="124" width="26" height="26" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="163" y="137" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">图 2a：抽样思想 —— 组中位数 [5,4,6] 的中位数是 5，代表不会太偏</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">工程现实：理论保底 vs 实际快慢</p>
            <svg viewBox="0 0 320 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="16" y="20" font-size="12" font-family="monospace" fill="#334155" font-weight="bold">理论价值大，工程很少直接用</text>
              <rect x="16" y="30" width="288" height="42" rx="6" fill="#f0fdf4" stroke="#4ade80" stroke-width="1.5" />
              <text x="160" y="46" text-anchor="middle" font-size="11" font-family="monospace" fill="#166534" font-weight="bold">✅ 确定性：最坏也保证 O(n)</text>
              <text x="160" y="62" text-anchor="middle" font-size="10" font-family="monospace" fill="#166534">抗对抗输入，不靠运气</text>
              <rect x="16" y="82" width="288" height="42" rx="6" fill="#eff6ff" stroke="#60a5fa" stroke-width="1.5" />
              <text x="160" y="98" text-anchor="middle" font-size="11" font-family="monospace" fill="#1d4ed8" font-weight="bold">⚙️ 工程：随机化 + 三数取中就够</text>
              <text x="160" y="114" text-anchor="middle" font-size="10" font-family="monospace" fill="#1d4ed8">std::nth_element 底层即如此</text>
              <text x="16" y="140" font-size="11" font-family="monospace" fill="#64748b">结论：MoM 用于证明上限，随机化用于日常</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">图 2b：理论 vs 工程 —— 保证最坏 O(n) 的代价是常数大 10 倍</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1 为什么退化 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          为什么 quick-select 会退化
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          quick-select 的复杂度完全取决于 pivot 的质量：<strong>pivot 越接近区间中位数，每轮丢弃的越多，越快</strong>。
          如果 pivot 每次恰好是当前区间的<strong>最小值或最大值</strong>，一侧为空、另一侧只少一个元素，
          递推变成 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">T(n) = T(n-1) + O(n) = O(n²)</code> —— 和冒泡排序一个水平。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>退化现场（升序数组 + 固定取末尾）：</strong></p>
          <p class="text-sm text-slate-600 font-mono mb-1">[1, 2, 3, 4, …, n]　pivot = n（最大值）</p>
          <p class="text-sm text-slate-600 font-mono mb-1">→ 分区结果：左侧 [1..n-1]，右侧空</p>
          <p class="text-sm text-slate-600 font-mono mb-1">→ 下一轮区间只缩小 1：n → n-1 → n-2 → …</p>
          <p class="text-sm text-slate-600">→ 总工作量 n + (n-1) + (n-2) + … = O(n²) 💥</p>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>随机化只是缓解，不是保证。</strong>随机选 pivot 后，退化概率约 e<sup>-n</sup> 量级，日常完全够用；
          但在<strong>对抗场景</strong>（在线评测、安全审计、恶意构造输入）里，「概率极小」不等于「不可能」。
          于是问题来了：<strong>能不能选出一个「保证不差」的 pivot？</strong> —— 这就是本节的动机。
        </p>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：把「期望」当「保证」</strong><br/>
          1. <strong>面试答「随机化所以最坏 O(n)」</strong>：错。随机化只把最坏概率压到指数级小，最坏仍是 O(n²)。<br/>
          2. <strong>固定取末尾/取中间当 pivot</strong>：数据被构造时（如升序、降序、重复）会稳定触发退化。<br/>
          3. <strong>误以为「三数取中」= 确定性 O(n)</strong>：三数取中只是工程技巧，只能缓解，最坏仍是 O(n²)。</p>
        </aside>
      </section>

      <!-- 2 思想 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          思想：分组取中位数，再取中位数的中位数
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          MoM 的思路是：<strong>与其随便选一个 pivot，不如花一点钱「选一个好的 pivot」</strong>。
          具体分 4 步：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>分组</strong>：把当前区间每 5 个元素一组（最后不足 5 个也自成一组）</li>
          <li><strong>组内取中位数</strong>：每组排序（常数级），取中间值作为该组「代表」，共约 <code>n/5</code> 个代表</li>
          <li><strong>递归取中位数的中位数</strong>：在约 <code>n/5</code> 个代表里递归调用 MoM，得到 pivot（这一步是名字的来源）</li>
          <li><strong>分区 + 只递归一侧</strong>：用这个 pivot 做 Lomuto 分区，然后照常只进含第 K 小的一侧</li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          为什么能保证「pivot 不差」？因为 <strong>至少一半的组</strong>，其中位数 ≤ pivot（pivot 是代表们的中位数）；
          而每组 5 个元素里，至少 3 个 ≤ 该组中位数。合起来：<strong>至少 3/10 的元素 ≤ pivot</strong>，
          对称地至少 3/10 的元素 ≥ pivot。也就是说 pivot 把数组切在 <strong>30% ~ 70%</strong> 之间 —— 永远不偏。
        </p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          MoM ≈ <strong>「抽样调查」——先分组取代表，再在代表里取代表</strong>。做用户满意度调研时，
          你不会问全部 1000 万用户（成本太高），而是把用户按城市/年龄段分层，每层抽几个代表，
          再在代表里综合出一个「代表值」—— 这个值不会太偏，因为<strong>每一层都参与了提名</strong>。<br/>
          类比到算法：直接随机选 pivot 像「随手抓一个路人问」—— 运气差就碰到极值；
          MoM 像「层层推举代表再选代表」—— 各层都露过脸，选出来的 pivot 天生「居中」，不依赖运气。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 3/10 是怎么来的（记忆锚点）：</strong><br/>
          ① 中位数们的中位数 → <strong>≥ 一半</strong>的组中位数 ≤ pivot；<br/>
          ② 每组 5 个元素 → <strong>≥ 3 个</strong> ≤ 该组中位数；<br/>
          ③ 所以 ≥ (1/2) × (3/5) = <strong>3/10</strong> 的元素 ≤ pivot。对称地也有 3/10 ≥ pivot。<br/>
          于是每次递归最多处理 <strong>7/10</strong> 的元素 —— 这就是最坏 O(n) 的数学基础。</p>
        </aside>
      </section>

      <!-- 3 实现 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          实现：5 分组 + Median of Medians 选择
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          先看两个子过程：<strong>5 个一组取中位数</strong>（常数级小操作），以及把整个数组变成「代表数组」。
        </p>
        <div class="mb-4"><Code language="ts" :code="median5Code" title="median_of_five.ts" /></div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          有了「中位数的中位数」当 pivot，整体选择就和 quick-select 几乎一样，只是 pivot 的获取方式不同：
        </p>
        <div class="mb-4"><Code language="ts" :code="medianOfMediansCode" title="median_of_medians.ts" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">实现要点</h3>
        <ul class="space-y-1.5 text-slate-600 text-sm mb-4 leading-relaxed">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">•</span><span><strong>分组是「值切片」不是「复制重排」</strong>：按下标每 5 个一组，组间顺序无关紧要</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">•</span><span><strong>中位数返回的是「下标」</strong>：方便直接交换到区段末尾做 Lomuto 分区</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">•</span><span><strong>段长 ≤ 5 时不再分组</strong>：直接排序取中间，作为递归出口</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">•</span><span><strong>第 3 步是真正的递归</strong>：在约 n/5 个代表上再次调用 MoM，直到代表数 ≤ 5</span></li>
        </ul>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：把 MoM 写「残」</strong><br/>
          1. <strong>忘掉第 3 步递归</strong>：直接用「第一组的中位数」当 pivot —— 那还是随机水平，最坏照样 O(n²)，白写了。<br/>
          2. <strong>分组大小用 4 或 6（偶数）</strong>：偶数组的「中位数」定义含糊，3/10 的证明会塌；必须用奇数，5 是最优选择。<br/>
          3. <strong>段长 ≤ 5 时还继续分组</strong>：会造成无限递归或栈溢出；小段直接排序取中位数即可。<br/>
          4. <strong>用值去数组里 indexOf 找 pivot 下标时重复值串位</strong>：建议在分组时直接记录「值 + 下标」，别依赖 indexOf。</p>
        </aside>
      </section>

      <!-- 4 复杂度 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          复杂度证明思路：最坏 O(n)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          MoM 的时间递推由三部分组成（<strong>这是本算法最经典的证明</strong>）：
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4 font-mono text-sm text-slate-700">
          <p>T(n) ≤ T(⌈n/5⌉) + O(n) + T(7n/10)</p>
          <p class="text-xs text-slate-500 mt-2">└─ 递归取中位数的中位数　└─ 分组+排序+分区　└─ 递归含 K 的一侧（最多 7n/10）</p>
        </div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><code>T(⌈n/5⌉)</code>：在约 n/5 个组中位数里，递归再选一次中位数</li>
          <li><code>O(n)</code>：分组、每组 5 个元素排序（常数）、Lomuto 分区 —— 都是线性</li>
          <li><code>T(7n/10)</code>：因为 pivot 两侧都 ≥ 3/10，含 K 的一侧至多 7n/10 个元素</li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>解递推：</strong>设 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">T(n) = T(n/5) + T(7n/10) + c·n</code>。
          相邻两层总工作量 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">c·n · (1 + 9/10 + (9/10)² + …) = c·n · 10 = O(n)</code>。
          关键在 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">1/5 + 7/10 = 9/10 &lt; 1</code>：
          每层总规模严格衰减，等比求和收敛到常数倍 —— 这就是最坏 O(n) 的数学本质。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">指标</th><th class="px-4 py-2 border border-slate-200 font-semibold">Median of Medians</th><th class="px-4 py-2 border border-slate-200 font-semibold">随机化 QuickSelect</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">最坏时间</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n)（保证）</td><td class="px-4 py-2 border font-mono text-red-500">O(n²)（概率 ≈ 0）</td></tr>
              <tr><td class="px-4 py-2 border">期望时间</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n)</td></tr>
              <tr><td class="px-4 py-2 border">辅助空间</td><td class="px-4 py-2 border font-mono">O(log n)（递归栈，含两层递归）</td><td class="px-4 py-2 border font-mono">O(log n) / O(1)</td></tr>
              <tr><td class="px-4 py-2 border">常数因子</td><td class="px-4 py-2 border font-mono text-amber-600">大（约 10× 随机化）</td><td class="px-4 py-2 border font-mono text-emerald-600">小</td></tr>
              <tr><td class="px-4 py-2 border">稳定性</td><td class="px-4 py-2 border" colspan="2">不稳定（分区交换）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：复杂度推导翻车</strong><br/>
          1. <strong>把「中位数的中位数」当成 O(1)</strong>：它是一次完整的递归调用 T(n/5)，漏掉这一项递推就解不出 O(n)。<br/>
          2. <strong>忘记 <code>1/5 + 7/10 &lt; 1</code> 是关键</strong>：如果分组用偶数或每组取 1 个，等比公比 ≥ 1，递推直接发散成 O(n²)。<br/>
          3. <strong>以为「O(n) 就代表快」</strong>：O(n) 说的是渐近上界，MoM 的真实常数约是随机化的 10 倍 —— n 不够大时反而更慢。</p>
        </aside>
      </section>

      <!-- 5 实用性与对比 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          实用性与对比：理论 vs 工程
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          MoM 是「教科书级」的算法：它<strong>第一次证明了选择问题可以确定性 O(n)</strong>，
          但工程实现里几乎没人用它。对比代码最能说明问题：
        </p>
        <div class="mb-4"><Code language="ts" :code="compareCode" title="mom_vs_random.ts" /></div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
            <p class="text-sm text-emerald-800"><strong>✅ MoM 的价值</strong><br/>
            · 确定性最坏 O(n)：不靠运气、不可被对抗<br/>
            · 理论基石：证明「选择 = O(n)」的下界可达<br/>
            · 适合安全/评测等对抗输入场景<br/>
            · 递归结构清晰，是分治思想的典范</p>
          </div>
          <div class="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4">
            <p class="text-sm text-red-800"><strong>❌ MoM 的代价</strong><br/>
            · 常数大：分组 + 排序 + 两层递归 ≈ 10×<br/>
            · 递归栈更深，小数据反而慢<br/>
            · 需要额外数组存中位数（可原地但麻烦）<br/>
            · 99% 场景随机化又快又简单，完全够用</p>
          </div>
        </div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold">随机化 QuickSelect</th><th class="px-4 py-2 border border-slate-200 font-semibold">Median of Medians</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">pivot 选择</td><td class="px-4 py-2 border">随机 / 三数取中</td><td class="px-4 py-2 border">分组取中位数（确定性）</td></tr>
              <tr><td class="px-4 py-2 border">实现成本</td><td class="px-4 py-2 border">★（30 行内）</td><td class="px-4 py-2 border">★★★（递归嵌套，易写错）</td></tr>
              <tr><td class="px-4 py-2 border">对抗输入</td><td class="px-4 py-2 border">可被构造退化</td><td class="px-4 py-2 border">免疫</td></tr>
              <tr><td class="px-4 py-2 border">实际速度</td><td class="px-4 py-2 border text-emerald-600">快（常数小）</td><td class="px-4 py-2 border text-amber-600">慢（常数 ~10×）</td></tr>
              <tr><td class="px-4 py-2 border">典型用途</td><td class="px-4 py-2 border">日常 Top-K / 中位数</td><td class="px-4 py-2 border">理论证明 / 对抗环境</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          就像工程里的「<strong>快排 vs 归并</strong>」之争：理论上归并稳定且最坏 O(n log n)，但工程默认用快排（优化后），
          因为<strong>实际更快、缓存更友好</strong>。MoM 同理 —— 它的确定性保证像「保险」：
          平时用不上，但遇到<strong>恶意流量（对抗输入）</strong>时，随机化可能被刷爆，确定性方案才兜得住底。<br/>
          选择口诀：<strong>普通业务用随机化；对抗/安全场景才上确定性。</strong></p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 工程事实速查：</strong><br/>
          · C++ <code class="bg-white px-1.5 py-0.5 rounded text-xs">std::nth_element</code>：内省式选择（快排 + 堆兜底），不用 MoM；<br/>
          · Java <code class="bg-white px-1.5 py-0.5 rounded text-xs">Arrays.sort</code>：双基准快排 / TimSort，都不用 MoM；<br/>
          · Python：没有内置 nth_element，Top-K 用 <code class="bg-white px-1.5 py-0.5 rounded text-xs">heapq.nlargest</code>；<br/>
          · 结论：MoM 的价值在「理论」和「对抗」，工程选型第一顺位永远是随机化。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：Median of Medians（K=6）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点击「Median of Medians」观察完整流程：① 蓝色扫过分组（5 个一组）→ ② 每组中位数变橙 → ③ 中位数的中位数成为 pivot →
          ④ Lomuto 分区 → ⑤ 只递归含第 6 小的一侧（另一侧变灰丢弃），最终答案变绿。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ bars.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔍 比较: {{ cmp }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔁 交换: {{ swp }}</span>
          <span class="bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-mono">🎯 {{ kLabel }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
          <span v-if="result" class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">{{ result }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @click="runMoM" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">🧪 Median of Medians</button>
          <button @click="reset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-text :config="{x: 10, y: 6, text: seg, fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: C.text}" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>退化根源：</strong>pivot 总选到极值 → quick-select 最坏 O(n²)，随机化只是缓解不是保证</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>MoM 三步：</strong>每 5 个一组取中位数 → 递归取中位数的中位数 → 用它分区、只递归含 K 的一侧</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>3/10 保证：</strong>pivot 两侧各 ≥ 3/10 元素，含 K 一侧 ≤ 7n/10 → 递推 <code>T(n) = T(n/5) + T(7n/10) + O(n)</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>关键不等式：</strong><code>1/5 + 7/10 = 9/10 &lt; 1</code>，层间规模严格衰减 → 最坏 O(n)（确定性）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>工程现实：</strong>常数大 ~10×、实现复杂，日常用随机化；MoM 用于对抗输入与理论证明</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>为什么是 5：</strong>奇数保证严格中位数，且 3/10 的淘汰率让递推收敛；4、6 都破坏证明</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下一步：</strong>选择/分区讲完了，回到排序本身 —— 下一节「冒泡排序」看相邻交换与提前终止优化</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-3-select/dsa-7-3-1-quick-select" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：快速选择：O(n)期望第K小</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-4-more-sorts/dsa-7-4-1-bubble" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：冒泡排序：相邻交换与提前终止优化 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

// ===== 🎬 Median of Medians 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const cmp = ref(0), swp = ref(0)
interface Bar { id:number; val:number; color:string; s?:number; _x?:number; _y?:number; _h?:number }
const bars = reactive<Bar[]>([])
const BASE = 280, MXH = 220, BW = 46, G = 8

const K = ref(5)                       // 0-based：第 6 小
const kLabel = computed(() => `K = ${K.value + 1}（第 ${K.value + 1} 小）`)
const seg = ref(''), result = ref('')

function initArr(vals:number[]=[5,3,8,1,9,4,2,7]) { bars.splice(0); vals.forEach((v,i)=>bars.push({id:i+1,val:v,color:C.cyan,s:1})); cmp.value=0; swp.value=0; layout() }
function layout() { const n=bars.length, bw=Math.min(BW,Math.floor((W.value-20)/(n||1)-G)), total=n*(bw+G)-G, sx=Math.max(10,(W.value-total)/2), maxV=Math.max(...bars.map(b=>b.val),1); bars.forEach((b,i)=>{ b._x=sx+i*(bw+G); b._h=Math.max(28,(b.val/maxV)*MXH); b._y=BASE-b._h }) }
function barCfg(b:any){ const s=b.s??1, bw=Math.min(BW,Math.floor((W.value-20)/(bars.length||1)-G)); return { x:b._x+(bw*(1-s))/2, y:b._y, width:bw*s, height:b._h*s, fill:b.color, cornerRadius:[4,4,0,0], stroke:'#94a3b8', strokeWidth:1, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 } }
function valCfg(b:any){ const s=b.s??1, h=b._h*s, bw=Math.min(BW,Math.floor((W.value-20)/(bars.length||1)-G)); return { x:b._x+(bw*(1-s))/2, y:b._y+2, width:bw*s, height:h-4, text:String(b.val), fontSize:14, fontFamily:'monospace', fontStyle:'bold', fill:h>30?'#fff':C.text, align:'center', verticalAlign:'middle' } }
function idxCfg(i:number){ const bw=Math.min(BW,Math.floor((W.value-20)/(bars.length||1)-G)); return { x:bars[i]._x??0, y:BASE+6, width:bw, text:'['+i+']', fontSize:10, fontFamily:'monospace', fill:C.muted, align:'center' } }
function colorAt(i:number,c:string){ if(bars[i]) bars[i].color=c }
function allCyan(){ bars.forEach(b=>b.color=C.cyan) }
async function act(msg:string,label:string,fn:()=>Promise<void>){ if(busy.value) return; busy.value=true; status.value=msg; opLabel.value=label; try{await fn()}catch(_){} finally{ await d(250); busy.value=false; status.value=''; opLabel.value='' } }

function reset(){ initArr(); seg.value=''; result.value=''; status.value='' }

// 小段（≤5）直接线性选择
async function bruteSmall(lo:number, hi:number, k:number) {
  const n = hi - lo + 1
  status.value = `段长 ${n} ≤ 5：直接线性选择（小段内排序即可）`
  for (let x = lo; x <= hi; x++) { bars[x].color = C.blue; bars[x].s = 1.08; layout(); await d(250) }
  const items: { v: number; x: number }[] = []
  for (let x = lo; x <= hi; x++) items.push({ v: bars[x].val, x })
  items.sort((a, b) => a.v - b.v)
  const ans = items[k - lo]
  for (let x = lo; x <= hi; x++) if (x !== ans.x) { bars[x].color = C.ghost; bars[x].s = 0.9 }
  bars[ans.x].color = C.green; bars[ans.x].s = 1.18; layout()
  result.value = `第 ${k + 1} 小 = ${ans.v}`
  status.value = `🎯 第 ${k + 1} 小 = ${ans.v}`
  await d(1100)
}

// Median of Medians 选择主流程
async function moM(lo:number, hi:number, k:number) {
  const n = hi - lo + 1
  seg.value = `范围 [${lo}..${hi}]（长度 ${n}）· 找第 ${k + 1} 小`
  if (n <= 5) { await bruteSmall(lo, hi, k); return }

  // ① 分组（每 5 个一组）
  const groups: number[][] = []
  for (let s = lo; s <= hi; s += 5) {
    const g: number[] = []
    for (let x = s; x <= Math.min(s + 4, hi); x++) g.push(x)
    groups.push(g)
  }
  status.value = `① 每 5 个一组：共 ${groups.length} 组（蓝色扫过为当前组）`
  for (const g of groups) {
    g.forEach(x => { bars[x].color = C.blue; bars[x].s = 1.05 })
    layout(); await d(300)
    g.forEach(x => { bars[x].color = C.cyan; bars[x].s = 1 })
    layout(); await d(120)
  }

  // ② 每组取中位数
  const meds: { val: number; at: number; gid: number }[] = []
  for (let gi = 0; gi < groups.length; gi++) {
    const g = groups[gi]
    const sorted = g.map(x => bars[x].val).sort((a, b) => a - b)
    const med = sorted[Math.floor((sorted.length - 1) / 2)]
    const at = g.find(x => bars[x].val === med) ?? g[Math.floor(g.length / 2)]
    meds.push({ val: med, at, gid: gi })
    g.forEach(x => { if (x !== at) { bars[x].color = C.ghost; bars[x].s = 0.9 } })
    bars[at].color = C.orange; bars[at].s = 1.15
    layout(); status.value = `② 第 ${gi + 1} 组中位数 = ${med}（橙色）`
    await d(550)
  }

  // ③ 中位数的中位数 → pivot
  meds.sort((a, b) => a.val - b.val)
  const mo = meds[Math.floor((meds.length - 1) / 2)]
  meds.forEach(m => { if (m !== mo) { bars[m.at].color = C.ghost; bars[m.at].s = 0.9 } })
  bars[mo.at].color = C.orange; bars[mo.at].s = 1.2; layout()
  status.value = `③ 中位数的中位数 = ${mo.val}（来自第 ${mo.gid + 1} 组）→ 作为 pivot`
  await d(750)

  // ④ pivot 换到区段末尾，Lomuto 分区
  allCyan()
  if (mo.at !== hi) {
    swp.value++
    ;[bars[mo.at].val, bars[hi].val] = [bars[hi].val, bars[mo.at].val]
  }
  layout(); await d(300)
  const pivot = bars[hi].val
  bars[hi].color = C.orange; bars[hi].s = 1.15; layout()
  status.value = `④ 以 pivot = ${pivot} 做 Lomuto 分区`
  await d(600)

  let i = lo
  for (let j = lo; j < hi; j++) {
    cmp.value++
    bars[j].color = C.blue; bars[j].s = 1.06; layout()
    status.value = `比较 ${bars[j].val} 与 pivot ${pivot}`
    await d(260)
    if (bars[j].val <= pivot) {
      if (i !== j) {
        swp.value++
        const a = bars[i].val, b = bars[j].val
        ;[bars[i].val, bars[j].val] = [b, a]
        bars[i].color = C.orange; bars[i].s = 1.12
        layout(); status.value = `交换 ${a} ↔ ${b}（小于 pivot，换到左侧）`
        await d(300)
        bars[i].color = C.cyan; bars[i].s = 1
      }
      i++
    }
    bars[j].color = C.cyan; bars[j].s = 1
    layout(); await d(160)
  }
  if (i !== hi) {
    swp.value++
    ;[bars[i].val, bars[hi].val] = [bars[hi].val, bars[i].val]
  }
  bars[hi].color = C.cyan; bars[hi].s = 1
  bars[i].color = C.orange; bars[i].s = 1.15; layout()
  status.value = `⑤ pivot ${pivot} 就位在 [${i}]`
  await d(650)

  if (k === i) {
    bars[i].color = C.green; bars[i].s = 1.18; layout()
    result.value = `第 ${k + 1} 小 = ${bars[i].val}`
    status.value = `🎯 第 ${k + 1} 小 = ${bars[i].val}（pivot 恰好在第 ${k + 1} 位）`
    await d(1100)
    return
  }
  if (k < i) {
    for (let x = i; x <= hi; x++) { bars[x].color = C.ghost; bars[x].s = 0.9 }
    layout(); status.value = `第 ${k + 1} 小在左侧 [${lo}..${i - 1}]，只递归左半`
    await d(650)
    await moM(lo, i - 1, k)
  } else {
    for (let x = lo; x <= i; x++) { bars[x].color = C.ghost; bars[x].s = 0.9 }
    layout(); status.value = `第 ${k + 1} 小在右侧 [${i + 1}..${hi}]，只递归右半`
    await d(650)
    await moM(i + 1, hi, k)
  }
}

async function runMoM() {
  if (busy.value) return
  act('Median of Medians · 确定性 O(n)', 'MoM K=6', async () => {
    initArr(); allCyan(); result.value = ''
    seg.value = `范围 [0..${bars.length - 1}] · 找第 ${K.value + 1} 小`
    await moM(0, bars.length - 1, K.value)
  })
}

let ro:ResizeObserver|null=null
onMounted(()=>{ initArr(); if(box.value){ W.value=box.value.clientWidth; layout(); ro=new ResizeObserver(e=>{const w=e[0]?.contentRect.width; if(w&&w>100){W.value=w;layout()}}); ro.observe(box.value) }})
onUnmounted(()=>ro?.disconnect())

// ===== navList =====
const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "为什么 quick-select 会退化" },
  { id: "sec-2", name: "思想：分组取中位数" },
  { id: "sec-3", name: "实现：Median of Medians" },
  { id: "sec-4", name: "复杂度证明思路" },
  { id: "sec-5", name: "理论 vs 工程" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "📋 小结" },
]

// ===== 代码示例 =====
const median5Code = `// ─── 5 个一组取中位数：核心子过程 ───
// 为什么是 5？
// （1）奇数：保证组内存在严格的"中间位置"；
// （2）证明需要"至少 3/10"的淘汰率，4 或 6 都会让递推 T(n)=T(n/5)+T(7n/10)
//      变成不收敛，最坏无法保证 O(n)。

// 排序 5 个元素取中间：常数级操作
function medianOfFive(a: number[]): number {
    const s = [...a].sort((x, y) => x - y)
    return s[2]
}

// 把数组每 5 个一组，返回每组中位数组成的数组（长度约 n/5）
function groupMedians(arr: number[]): number[] {
    const medians: number[] = []
    for (let i = 0; i < arr.length; i += 5) {
        const group = arr.slice(i, i + 5)
        medians.push(medianOfFive(group))
    }
    return medians
}

console.log(groupMedians([5, 3, 8, 1, 9, 4, 2, 7]))   // [5, 4]
// 第一组 [5,3,8,1,9] 排序后 [1,3,5,8,9] → 中位数 5
// 第二组 [4,2,7]     排序后 [2,4,7]    → 中位数 4`

const medianOfMediansCode = `// ─── Median of Medians：确定性 O(n) 选择 ───
// 三步：① 每 5 个一组取中位数
//       ② 递归取"中位数的中位数"当 pivot
//       ③ 用该 pivot 分区，只递归含 k 的一侧

// 在 [lo, hi] 里找"好 pivot"（返回下标）
function medianOfMedians(arr: number[], lo: number, hi: number): number {
    const n = hi - lo + 1
    if (n <= 5) {                             // 小段：直接排序取中位数（递归出口）
        const s = arr.slice(lo, hi + 1).sort((a, b) => a - b)
        const v = s[Math.floor((s.length - 1) / 2)]
        return arr.indexOf(v, lo)             // 返回该值在数组中的下标
    }
    const medians: number[] = []
    for (let s = lo; s <= hi; s += 5) {
        const g = arr.slice(s, Math.min(s + 5, hi + 1)).sort((a, b) => a - b)
        medians.push(g[Math.floor((g.length - 1) / 2)])
    }
    // 递归：在中位数的数组里再取中位数 —— "中位数之中位数"
    const mo = medianOfMedians(medians, 0, medians.length - 1)
    return arr.indexOf(mo, lo)
}

// 完整选择：循环分区 + 只进含 k 的一侧
function selectMoM(arr: number[], k: number): number {
    let lo = 0, hi = arr.length - 1
    while (lo < hi) {
        const pIdx = medianOfMedians(arr, lo, hi)    // 好 pivot 的下标
        ;[arr[pIdx], arr[hi]] = [arr[hi], arr[pIdx]] // 换到末尾方便 Lomuto
        const p = partition(arr, lo, hi)             // 复用 quickSelect 的分区
        if (k === p) return arr[p]
        if (k < p) hi = p - 1
        else lo = p + 1
    }
    return arr[lo]
}

console.log(selectMoM([5, 3, 8, 1, 9, 4, 2, 7], 3))  // 4（第 4 小）
console.log(selectMoM([5, 3, 8, 1, 9, 4, 2, 7], 5))  // 7（第 6 小）

// 复杂度：T(n) = T(n/5) + T(7n/10) + O(n) → O(n)（最坏也是）`

const compareCode = `// ─── MoM vs 随机化 QuickSelect：理论 vs 工程 ───
// 相同点：都靠"好 pivot"只递归含 k 的一侧，把复杂度压到 O(n)
// 不同点：pivot 怎么选 —— 确定性分组 vs 随机抽取

// 随机化：期望 O(n)，最坏 O(n²)，但最坏概率指数级小
function quickSelectRandom(arr: number[], lo: number, hi: number, k: number): number {
    if (lo === hi) return arr[lo]
    const r = lo + Math.floor(Math.random() * (hi - lo + 1))  // 随机 pivot
    ;[arr[r], arr[hi]] = [arr[hi], arr[r]]
    const p = partition(arr, lo, hi)
    if (k === p) return arr[p]
    if (k < p) return quickSelectRandom(arr, lo, p - 1, k)
    return quickSelectRandom(arr, p + 1, hi, k)
}

// ─── 对比表 ───
//                随机化 QuickSelect        Median of Medians
// pivot 选择      随机 / 三数取中           分组取中位数（确定性）
// 期望时间        O(n)                     O(n)
// 最坏时间        O(n²)（概率≈0）          O(n)（保证）
// 常数            小（一次随机+一次分区）   大（分组+排序+递归取中位数）
// 实现难度        ★                        ★★★
// 抗对抗输入      否（可被构造退化）        是

// ─── 工程结论 ───
// 1. 绝大多数库（std::nth_element 等）用随机化 + 三数取中，不用 MoM
// 2. MoM 的价值是"理论上限的证明"和"对抗环境下的确定性保证"
// 3. 若必须确定性且常数可接受：小段用插入选择，大段才启用 MoM 分层`
</script>
