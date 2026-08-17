<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🎯 快速选择：O(n) 期望第 K 小</h1>
          <p class="text-sm text-slate-500 mt-1">快排分区 + 只往一边递归 —— 找第 K 小不必全排序</p>
        </div>
        <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-3-1</span>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：快速选择
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          快速选择（QuickSelect）解决一类经典问题：<strong>无序数组里只问「第 K 小是多少」</strong>。
          核心只有一句话：<strong>借用快排的「分区」能力，每次分区后只递归包含第 K 小的一侧，另一侧整体丢弃</strong>。
          因为每轮至少扔掉一半（期望）元素，总工作量是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">n + n/2 + n/4 + … ≈ 2n</code>，
          期望时间复杂度 <strong>O(n)</strong> —— 比全排序的 O(n log n) 快一个数量级。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="16" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">快速选择 K=4：分区后只递归含第 4 小的一侧</text>

            <!-- ① 原始数组 -->
            <text x="16" y="46" font-size="11" font-family="monospace" fill="#64748b">① 原始数组</text>
            <rect x="40" y="54" width="70" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="75" y="74" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="120" y="54" width="70" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="155" y="74" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="200" y="54" width="70" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="235" y="74" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <rect x="280" y="54" width="70" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="315" y="74" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="360" y="54" width="70" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="395" y="74" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <rect x="440" y="54" width="70" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="475" y="74" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="520" y="54" width="70" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="555" y="74" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="600" y="54" width="70" height="40" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2.5" />
            <text x="635" y="74" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <text x="75" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[0]</text>
            <text x="155" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[1]</text>
            <text x="235" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[2]</text>
            <text x="315" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[3]</text>
            <text x="395" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[4]</text>
            <text x="475" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[5]</text>
            <text x="555" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[6]</text>
            <text x="635" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#f59e0b" font-weight="bold">[7]</text>

            <text x="16" y="130" font-size="11" font-family="monospace" fill="#f59e0b" font-weight="bold">② Lomuto 分区：pivot = 7（右端，橙色）</text>

            <!-- ③ 分区后 -->
            <text x="16" y="150" font-size="11" font-family="monospace" fill="#64748b">③ 分区后：左侧 5 个 ≤ pivot（绿框=含第 4 小），右侧 2 个被丢弃（灰）</text>
            <rect x="40" y="158" width="70" height="40" rx="6" fill="#06b6d4" stroke="#4ade80" stroke-width="2.5" />
            <text x="75" y="178" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="120" y="158" width="70" height="40" rx="6" fill="#06b6d4" stroke="#4ade80" stroke-width="2.5" />
            <text x="155" y="178" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="200" y="158" width="70" height="40" rx="6" fill="#06b6d4" stroke="#4ade80" stroke-width="2.5" />
            <text x="235" y="178" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="280" y="158" width="70" height="40" rx="6" fill="#06b6d4" stroke="#4ade80" stroke-width="2.5" />
            <text x="315" y="178" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="360" y="158" width="70" height="40" rx="6" fill="#06b6d4" stroke="#4ade80" stroke-width="2.5" />
            <text x="395" y="178" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="440" y="158" width="70" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
            <text x="475" y="178" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <rect x="520" y="158" width="70" height="40" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" />
            <text x="555" y="178" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#64748b">9</text>
            <rect x="600" y="158" width="70" height="40" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" />
            <text x="635" y="178" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#64748b">8</text>
            <text x="75" y="208" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[0]</text>
            <text x="155" y="208" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[1]</text>
            <text x="235" y="208" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[2]</text>
            <text x="315" y="208" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[3]</text>
            <text x="395" y="208" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[4]</text>
            <text x="475" y="208" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#f59e0b" font-weight="bold">[5]</text>
            <text x="555" y="208" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[6]</text>
            <text x="635" y="208" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">[7]</text>

            <text x="16" y="234" font-size="11" font-family="monospace" fill="#16a34a" font-weight="bold">k=3 &lt; pivot 位置 5 → 只递归左侧 [0..4]，右侧 [6..7] 整体丢弃</text>
            <text x="16" y="252" font-size="10" font-family="monospace" fill="#0891b2">每轮至少丢一侧 → 期望 O(n)；这就是「找第 K 小不必全排序」的全部秘密</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：快速选择分区流程 —— 一次 Lomuto 分区后，第 4 小（k=3）落在左侧，右侧直接丢弃</figcaption>
        </figure>

        <h3 class="text-sm font-semibold text-slate-700 mb-2">两种思路：先全排 vs 只选不排</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">方案 A：先全排序 O(n log n) —— 为拿一个数，排好全部</p>
            <svg viewBox="0 0 320 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="16" y="20" font-size="12" font-family="monospace" fill="#334155" font-weight="bold">sorted = [1,2,3,4,5,7,8,9]</text>
              <text x="16" y="38" font-size="10" font-family="monospace" fill="#64748b">排序要处理全部 8 个元素</text>
              <rect x="16" y="48" width="26" height="28" rx="4" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" />
              <text x="29" y="62" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">1</text>
              <rect x="46" y="48" width="26" height="28" rx="4" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" />
              <text x="59" y="62" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">2</text>
              <rect x="76" y="48" width="26" height="28" rx="4" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" />
              <text x="89" y="62" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">3</text>
              <rect x="106" y="48" width="26" height="28" rx="4" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="119" y="62" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">4</text>
              <rect x="136" y="48" width="26" height="28" rx="4" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" />
              <text x="149" y="62" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">5</text>
              <rect x="166" y="48" width="26" height="28" rx="4" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" />
              <text x="179" y="62" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">7</text>
              <rect x="196" y="48" width="26" height="28" rx="4" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" />
              <text x="209" y="62" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">8</text>
              <rect x="226" y="48" width="26" height="28" rx="4" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" />
              <text x="239" y="62" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">9</text>
              <text x="16" y="98" font-size="11" font-family="monospace" fill="#ef4444">✗ 浪费：8 个元素全排好，只为取第 4 个</text>
              <text x="16" y="118" font-size="11" font-family="monospace" fill="#94a3b8">n = 10⁷ 时：7×10⁷ 次比较 vs 2×10⁷ 次</text>
              <text x="16" y="138" font-size="11" font-family="monospace" fill="#94a3b8">差出 3~4 倍的常数，甚至数量级</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">图 2a：全排序方案 —— 排好全部元素后按下标取值</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">方案 B：快速选择 —— 搜索区间 [lo..hi] 逐轮收缩</p>
            <svg viewBox="0 0 320 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="16" y="20" font-size="12" font-family="monospace" fill="#334155" font-weight="bold">第 1 轮：区间 [0..7]（8 个元素）</text>
              <rect x="16" y="30" width="26" height="16" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <rect x="46" y="30" width="26" height="16" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <rect x="76" y="30" width="26" height="16" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <rect x="106" y="30" width="26" height="16" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <rect x="136" y="30" width="26" height="16" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <rect x="166" y="30" width="26" height="16" rx="3" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <rect x="196" y="30" width="26" height="16" rx="3" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" />
              <rect x="226" y="30" width="26" height="16" rx="3" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" />
              <text x="16" y="58" font-size="11" font-family="monospace" fill="#64748b">第 2 轮：区间 [0..4]（丢弃右侧 2 个）</text>
              <rect x="16" y="66" width="26" height="16" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <rect x="46" y="66" width="26" height="16" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <rect x="76" y="66" width="26" height="16" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <rect x="106" y="66" width="26" height="16" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <rect x="136" y="66" width="26" height="16" rx="3" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="16" y="94" font-size="11" font-family="monospace" fill="#64748b">第 3 轮：区间 [2..4]（只剩 3 个）</text>
              <rect x="46" y="102" width="26" height="16" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <rect x="76" y="102" width="26" height="16" rx="3" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <rect x="106" y="102" width="26" height="16" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1" />
              <text x="16" y="130" font-size="11" font-family="monospace" fill="#16a34a" font-weight="bold">… 收敛到 [3..3] → 第 4 小 = 4 ✅</text>
              <text x="16" y="146" font-size="10" font-family="monospace" fill="#0891b2">期望工作量 ≈ 2n → O(n)</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">图 2b：快速选择方案 —— 每轮丢一侧，区间单调收缩到答案</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1 问题 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          问题：第 K 小 / 第 K 大
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          给定一个<strong>无序数组</strong> <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">nums</code> 和整数 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">K</code>，
          问第 K 小的元素是谁（1-based）。例如 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">nums = [5,3,8,1,9,4,2,7]</code> 中：
          第 1 小是 1、第 4 小是 4、第 8 小是 9。<strong>第 K 大</strong>是它的对称问题：第 3 大 = 第 n-K+1 小 = 8。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>与排序的关系：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">•</span><span>排序是「全量输出」：所有元素都要找到自己的位置，至少 O(n log n)</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">•</span><span>选择是「单点查询」：只关心一个位置上的值，理论上可以更快</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">•</span><span>选择问题也常被称为 <strong>Order Statistics（顺序统计量）</strong>，中位数就是 K = n/2 的特例</span></li>
          </ul>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          快速选择利用了排序里的分区能力，却不付出「把两侧都排好」的代价 —— 这正是它能做到期望 O(n) 的原因。
        </p>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：下标体系混淆</strong><br/>
          1. <strong>1-based 与 0-based 混用</strong>：第 K 小（1-based）对应 0-based 下标 <code>k = K - 1</code>。漏减 1 会整体错位一个元素。<br/>
          2. <strong>第 K 大换算错误</strong>：第 K 大 = 第 <code>n - K + 1</code> 小（1-based），不是第 <code>n - K</code> 小。<br/>
          3. <strong>越界</strong>：K &lt; 1 或 K &gt; n 时应提前判非法，否则递归会访问到越界下标。</p>
        </aside>
      </section>

      <!-- 2 思想 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          思想：分区后只递归含 K 的一侧
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          快速选择的思想只有 4 步，每一步都建立在快排的 <strong>partition（分区）</strong>之上：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>选 pivot</strong>：在当前区间里挑一个元素作为基准（常见：随机选、取右端、三数取中）</li>
          <li><strong>分区</strong>：把区间整理成「&lt; pivot ｜ pivot ｜ &gt; pivot」三段，pivot 落到它的最终位置 <code>p</code></li>
          <li><strong>比较</strong>：看要找的下标 <code>k</code> 与 <code>p</code> 的大小关系 —— 相等即答案，小于则去左边，大于则去右边</li>
          <li><strong>只递归一侧</strong>：另一侧元素与答案无关，<strong>整体丢弃</strong>，绝不触碰</li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          丢弃是关键：快排要保证两侧都有序所以两侧都要递归（O(n log n)），而快速选择只关心一侧，
          于是每轮工作量约减半，总和是一个等比数列 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">n + n/2 + n/4 + … ≈ 2n</code>，期望 O(n)。
        </p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          快速选择 ≈ <strong>「二分查找的『缩小搜索区间』思想，用在无序数组的选择上」</strong>。
          二分查找每轮砍掉一半，前提是数组有序；快速选择每轮也砍掉一半（期望），但不要求有序 ——
          它用「分区」替代了「比较」，用「丢弃另一侧」替代了「直接排除一半」。<br/>
          就像前端做 <strong>「排行榜分页」</strong>：要找第 10 万名，你不会把 100 万人全排好序（O(n log n)），
          而是不断把人群分成「比目标大的」和「比目标小的」，每次都丢掉不相关的一大半，只留含目标的那一堆继续筛。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 记忆锚点：</strong><br/>
          快排 = 两侧递归；快速选择 = 一侧递归。一个要「全有序」，一个只要「第 K 位」。
          同一套 partition，两个算法的复杂度差了一个 log —— 这就是「按需计算」的力量。</p>
        </aside>
      </section>

      <!-- 3 实现 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          实现：Lomuto 分区 + 递归版
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          最常用的分区是 <strong>Lomuto 分区</strong>：pivot 取右端元素，用变量 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i</code> 记录「小于区」的右边界，
          用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">j</code> 从左往右扫描，凡是比 pivot 小的元素就换到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i</code> 处并把 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i</code> 右移。
          扫描结束后把 pivot 换到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i</code>，返回 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i</code> 作为 pivot 的最终位置。
        </p>
        <div class="mb-4"><Code language="ts" :code="quickSelectRecCode" title="quick_select_rec.ts" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">执行流程拆解（找第 4 小，k = 3）</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><code>partition([5,3,8,1,9,4,2,7], 0, 7)</code>：pivot = 7，分区后 <code>[5,3,1,4,2,7,9,8]</code>，返回 <code>p = 5</code></li>
          <li><code>k = 3 &lt; 5</code> → 递归 <code>quickSelect(arr, 0, 4, 3)</code>，只处理左侧 5 个元素</li>
          <li>左侧再分区：<code>[1,2,5,4,3]</code> 返回 <code>p = 1</code>；<code>k = 3 &gt; 1</code> → 递归右侧 <code>[2..4]</code></li>
          <li>区间一路收缩到 <code>[3..3]</code>，返回 <code>arr[3] = 4</code> —— 第 4 小就是 4</li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>关于 Hoare 分区：</strong>工程上 Hoare 分区常数更小（交换更少），但它返回的位置 <code>p</code> 不一定就是 pivot 值所在的下标，
          用它实现选择时需要额外的「<code>k</code> 与 <code>p</code> 比较后调整区间」逻辑。学习阶段 Lomuto 更直白，工程阶段可换 Hoare 或
          三数取中 + Lomuto 的组合。两种分区对快速选择的「只递归一侧」框架没有影响。
        </p>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：写成了「快排」而不是「选择」</strong><br/>
          1. <strong>两侧都递归</strong>：分区后同时递归 <code>[lo, p-1]</code> 和 <code>[p+1, hi]</code> —— 那是快速排序 O(n log n)，丢了选择问题的优势。<br/>
          2. <strong>用 <code>&lt;=</code> 比较且数组含大量重复</strong>：Lomuto 会把所有相等元素都归到左侧，pivot 位置偏右，
             重复多时分区严重失衡；无重复数据影响不大，但要意识到这一点。<br/>
          3. <strong>递归出口只写 <code>lo === hi</code>，漏掉 <code>k</code> 恰好等于 <code>p</code> 的分支</strong>：会多递归一层，逻辑仍对但会做无谓分区；正确写法是三个分支：<code>k === p</code> / <code>k &lt; p</code> / <code>k &gt; p</code>。</p>
        </aside>
      </section>

      <!-- 4 迭代版与复杂度 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          迭代版与复杂度分析
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          递归版每次调用栈深 O(log n)；想彻底避免递归，可以用 <strong>while 循环 + 区间收缩</strong> 写成迭代版，
          思路与二分查找完全同构：
        </p>
        <div class="mb-4"><Code language="ts" :code="quickSelectIterCode" title="quick_select_iter.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">指标</th><th class="px-4 py-2 border border-slate-200 font-semibold">递归版</th><th class="px-4 py-2 border border-slate-200 font-semibold">迭代版</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">期望时间</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n)</td></tr>
              <tr><td class="px-4 py-2 border">最坏时间</td><td class="px-4 py-2 border font-mono text-red-500">O(n²)（pivot 总选到极值）</td><td class="px-4 py-2 border font-mono text-red-500">O(n²)（同样退化）</td></tr>
              <tr><td class="px-4 py-2 border">辅助空间</td><td class="px-4 py-2 border font-mono">O(log n)（递归栈）</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
              <tr><td class="px-4 py-2 border">稳定性</td><td class="px-4 py-2 border" colspan="2">不稳定（分区会打乱相等元素顺序）</td></tr>
              <tr><td class="px-4 py-2 border">是否原地</td><td class="px-4 py-2 border" colspan="2">是（交换在原数组上进行）</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>期望 O(n) 的直觉推导：</strong>若 pivot 平均落在区间中部，则 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">T(n) = T(n/2) + O(n)</code>，
          解出 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">T(n) = O(n)</code>。
          <strong>最坏 O(n²)：</strong>若每次 pivot 都是当前区间的最小/最大值（比如「升序数组 + 固定取右端」），
          一侧为空、另一侧只少 1 个元素，递推变成 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">T(n) = T(n-1) + O(n) = O(n²)</code>。
          对策：<strong>随机选 pivot</strong>，让退化概率指数级下降；或三数取中、或干脆用下一节的中位数之中位数（确定性 O(n)）。
        </p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
            <p class="text-sm text-emerald-800"><strong>✅ 优点</strong><br/>
            · 期望 O(n)，比排序 O(n log n) 快一个量级<br/>
            · 原地算法，辅助空间 O(1)（迭代版）<br/>
            · 实现简单，复用快排分区代码<br/>
            · 只找第 K 小/第 K 大/中位数都很自然</p>
          </div>
          <div class="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4">
            <p class="text-sm text-red-800"><strong>❌ 缺点</strong><br/>
            · 最坏 O(n²)，需要随机化兜底<br/>
            · 不稳定（一般不要求，但要知道）<br/>
            · 只适合「单次查询」；多次 Top-K 不如堆<br/>
            · 无法增量维护：新数据来了要重跑</p>
          </div>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：忽视退化输入</strong><br/>
          1. <strong>固定取末尾当 pivot + 升序/降序输入</strong>：直接命中最坏 O(n²)，百万数据也会卡到怀疑人生 —— 一定随机化。<br/>
          2. <strong>以为「期望」等于「保证」</strong>：随机化只让最坏概率极小（约 e<sup>-n</sup> 量级），理论上仍非确定性；
             对抗性评测/安全场景才需要下一节的确定性算法。<br/>
          3. <strong>重复元素 + 固定 pivot</strong>：全相同数组时分区极不平衡，退化风险同样存在。</p>
        </aside>
      </section>

      <!-- 5 与堆的对比 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          与堆的 Top-K 对比
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          面试里 quick-select 几乎总是和 <strong>「Top-K 用堆」</strong> 一起出现。两者的差别本质是：
          <strong>单次查询 vs 持续维护</strong>。只问一次第 K 小，quick-select 期望 O(n) 完胜；
          要一直维护「最大的 K 个」，堆支持 O(log k) 增量更新，quick-select 每次都要全量重跑。
        </p>
        <div class="mb-4"><Code language="ts" :code="kthLargestTopKCode" title="kth_largest_topk.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">场景</th><th class="px-4 py-2 border border-slate-200 font-semibold">推荐</th><th class="px-4 py-2 border border-slate-200 font-semibold">复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold">原因</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">只问一次「第 K 小/大」</td><td class="px-4 py-2 border font-mono">quickSelect</td><td class="px-4 py-2 border font-mono text-emerald-600">期望 O(n)</td><td class="px-4 py-2 border">堆要先把 n 个元素过一遍 O(n log k)</td></tr>
              <tr><td class="px-4 py-2 border">流式数据持续 Top-K</td><td class="px-4 py-2 border font-mono">最小堆</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n log k) / 增量 O(log k)</td><td class="px-4 py-2 border">quick-select 无法增量</td></tr>
              <tr><td class="px-4 py-2 border">K 很小（Top-10）且 n 巨大</td><td class="px-4 py-2 border font-mono">堆</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n log 10) ≈ O(n)</td><td class="px-4 py-2 border">堆常数小，实现还更简单</td></tr>
              <tr><td class="px-4 py-2 border">需要 Top-K 有序输出</td><td class="px-4 py-2 border font-mono">堆弹出</td><td class="px-4 py-2 border font-mono text-emerald-600">O(k log k) 追加</td><td class="px-4 py-2 border">quick-select 拿到的 K 个仍无序</td></tr>
              <tr><td class="px-4 py-2 border">需要「第 K 大」但数组只读</td><td class="px-4 py-2 border font-mono">堆</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n log k)</td><td class="px-4 py-2 border">quick-select 会改动原数组（可拷贝但费空间）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          排行榜就是活的 Top-K：<strong>「微博热搜 Top 50」</strong>每秒钟都有新数据进来，必须用<strong>堆/有序结构增量维护</strong>（O(log k) 更新），
          不可能每来一条就全量 quick-select 一次。<br/>
          反过来，<strong>「一次性选出全场 MVP」</strong>（只问一次第 1 名）或「一次查询中位数」，
          用 quick-select 期望 O(n) 比建堆 O(n log k) 更省 —— 类比：<strong>临时要用才现筛，长期维护才建索引。</strong></p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 工程选型速记：</strong><br/>
          · 问一次 → quickSelect（期望 O(n)）；<br/>
          · 常驻维护 → 堆（O(n log k) + 增量 O(log k)）；<br/>
          · K ≈ n/2（中位数）→ quickSelect 或 nth_element；<br/>
          · 只读数组 + 可接受 O(n) 空间 → 堆最省心。<br/>
          <code class="bg-white px-1.5 py-0.5 rounded text-xs">Array.prototype.sort</code> 底层的 <code>nth_element</code> 就是 quick-select 的工程化版本。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：快速选择 K=4
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点击「快速选择 K=4」：橙色为 pivot，蓝色为正在比较的元素；每次分区后，<strong>不含第 4 小的一侧会变灰被丢弃</strong>，
          只高亮含 K 的一侧继续递归，最终第 4 小变绿。留意「比较/交换」计数 —— 它远小于排序。
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
          <button @click="runQuickSelect" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">⚡ 快速选择 K=4</button>
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>快速选择 = 分区 + 只递归一侧</strong>，找第 K 小不必全排序，期望 O(n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>4 步框架：</strong>选 pivot → 分区 → 比较 k 与 p → 丢弃另一侧只进含 K 的一侧</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>与二分查找同构：</strong>都在「缩小搜索区间」，一个靠有序，一个靠分区</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度：</strong>期望 O(n)、最坏 O(n²)（随机化兜底）、空间 O(1)/O(log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>第 K 大 = 第 n-K+1 小</strong>；1-based 转 0-based 记得 <code>k = K - 1</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>vs 堆：</strong>单次查询用 quick-select，流式/常驻 Top-K 用堆 O(n log k)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下一步：</strong>quick-select 的最坏 O(n²) 能否根治？→ 下一节「中位数之中位数」给出确定性 O(n) 答案</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-2-linear-sort/dsa-7-2-3-bucket" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：桶排序：均匀分布假设与期望复杂度</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-3-select/dsa-7-3-2-median-of-medians" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：中位数之中位数：O(n)确定性选择 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

// ===== 🎬 快速选择动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const cmp = ref(0), swp = ref(0)
interface Bar { id:number; val:number; color:string; s?:number; _x?:number; _y?:number; _h?:number }
const bars = reactive<Bar[]>([])
const BASE = 280, MXH = 220, BW = 46, G = 8

const K = ref(3)                       // 0-based：第 4 小
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

async function qs(lo:number, hi:number, k:number) {
  seg.value = `范围 [${lo}..${hi}] · 找第 ${k + 1} 小`
  if (lo === hi) {
    colorAt(lo, C.green); bars[lo].s = 1.18; layout()
    result.value = `第 ${k + 1} 小 = ${bars[lo].val}`
    status.value = `🎯 第 ${k + 1} 小 = ${bars[lo].val}（区间只剩一个元素）`
    await d(1000)
    return
  }
  const pivot = bars[hi].val
  colorAt(hi, C.orange); bars[hi].s = 1.15; layout()
  status.value = `选 pivot = ${pivot}（橙色，取区段右端）`
  await d(650)

  let i = lo
  for (let j = lo; j < hi; j++) {
    cmp.value++
    bars[j].color = C.blue; bars[j].s = 1.06; layout()
    status.value = `比较 ${bars[j].val} 与 pivot ${pivot}`
    await d(300)
    if (bars[j].val <= pivot) {
      if (i !== j) {
        swp.value++
        const a = bars[i].val, b = bars[j].val
        ;[bars[i].val, bars[j].val] = [b, a]
        bars[i].color = C.orange; bars[i].s = 1.12
        layout(); status.value = `交换 ${a} ↔ ${b}（小于 pivot，换到左侧）`
        await d(350)
        bars[i].color = C.cyan; bars[i].s = 1
      }
      i++
    }
    bars[j].color = C.cyan; bars[j].s = 1
    layout(); await d(180)
  }
  if (i !== hi) {
    swp.value++
    ;[bars[i].val, bars[hi].val] = [bars[hi].val, bars[i].val]
  }
  bars[hi].color = C.cyan; bars[hi].s = 1
  bars[i].color = C.orange; bars[i].s = 1.15; layout()
  status.value = `pivot ${pivot} 就位在 [${i}]：左侧 ≤ ${pivot}，右侧 > ${pivot}`
  await d(700)

  if (k === i) {
    bars[i].color = C.green; bars[i].s = 1.18; layout()
    result.value = `第 ${k + 1} 小 = ${bars[i].val}`
    status.value = `🎯 第 ${k + 1} 小 = ${bars[i].val}（pivot 恰好在第 ${k + 1} 位）`
    await d(1100)
    return
  }
  if (k < i) {
    for (let x = i; x <= hi; x++) { bars[x].color = C.ghost; bars[x].s = 0.9 }
    layout(); status.value = `第 ${k + 1} 小在左侧 [${lo}..${i - 1}] → 右侧整体丢弃，只递归左半`
    await d(700)
    await qs(lo, i - 1, k)
  } else {
    for (let x = lo; x <= i; x++) { bars[x].color = C.ghost; bars[x].s = 0.9 }
    layout(); status.value = `第 ${k + 1} 小在右侧 [${i + 1}..${hi}] → 左侧整体丢弃，只递归右半`
    await d(700)
    await qs(i + 1, hi, k)
  }
}

async function runQuickSelect() {
  if (busy.value) return
  act('快速选择 · 期望 O(n)', 'QuickSelect K=4', async () => {
    initArr(); allCyan(); result.value = ''
    seg.value = `范围 [0..${bars.length - 1}] · 找第 ${K.value + 1} 小`
    await qs(0, bars.length - 1, K.value)
  })
}

let ro:ResizeObserver|null=null
onMounted(()=>{ initArr(); if(box.value){ W.value=box.value.clientWidth; layout(); ro=new ResizeObserver(e=>{const w=e[0]?.contentRect.width; if(w&&w>100){W.value=w;layout()}}); ro.observe(box.value) }})
onUnmounted(()=>ro?.disconnect())

// ===== navList =====
const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "问题：第 K 小 / 第 K 大" },
  { id: "sec-2", name: "思想：只递归含 K 的一侧" },
  { id: "sec-3", name: "实现：Lomuto 分区递归版" },
  { id: "sec-4", name: "迭代版与复杂度" },
  { id: "sec-5", name: "与堆的 Top-K 对比" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "📋 小结" },
]

// ===== 代码示例 =====
const quickSelectRecCode = `// ─── 快速选择 QuickSelect：找第 K 小（k 为 0-based 下标） ───
// 思想：Lomuto 分区后，只递归包含第 k 小的一侧，另一侧直接丢弃
// 期望 O(n)，最坏 O(n²)，递归栈 O(log n)

// Lomuto 分区：返回 pivot 的最终下标
function partition(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi]                 // 取右端元素作 pivot
    let i = lo                             // i 是「小于区」的右边界
    for (let j = lo; j < hi; j++) {
        if (arr[j] < pivot) {              // 小于 pivot 就换到左边
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
            i++
        }
    }
    ;[arr[i], arr[hi]] = [arr[hi], arr[i]] // pivot 就位
    return i
}

// 递归版：找第 k 小（k 为 0-based 下标，第 1 小是 k=0）
function quickSelect(arr: number[], lo: number, hi: number, k: number): number {
    if (lo === hi) return arr[lo]          // 只剩一个元素，就是答案
    const p = partition(arr, lo, hi)       // p = pivot 的最终下标
    if (k === p) return arr[p]             // pivot 正好是第 k 小
    if (k < p) return quickSelect(arr, lo, p - 1, k)  // 只递归左半
    return quickSelect(arr, p + 1, hi, k)  // 只递归右半
}

console.log(quickSelect([5, 3, 8, 1, 9, 4, 2, 7], 0, 7, 3))  // 4（第 4 小）
console.log(quickSelect([5, 3, 8, 1, 9, 4, 2, 7], 0, 7, 0))  // 1（最小值）
console.log(quickSelect([5, 3, 8, 1, 9, 4, 2, 7], 0, 7, 7))  // 9（最大值）

// 复杂度：
// 期望 O(n)：T(n) = T(n/2) + O(n)
// 最坏 O(n²)：T(n) = T(n-1) + O(n)（pivot 总选到极值）
// 对策：随机选 pivot / 三数取中 / 下一节的中位数之中位数`

const quickSelectIterCode = `// ─── 迭代版：用 while 收缩搜索区间，避免递归栈 ───
// 每次分区后，区间 [lo, hi] 至少丢掉一侧，单调收缩
function quickSelectIter(arr: number[], k: number): number {
    let lo = 0
    let hi = arr.length - 1
    while (lo <= hi) {
        const p = partition(arr, lo, hi)   // 复用上面的 Lomuto 分区
        if (k === p) return arr[p]         // 命中：pivot 就是第 k 小
        if (k < p) hi = p - 1              // 收缩到左半
        else lo = p + 1                    // 收缩到右半
    }
    return -1                              // 理论不可达
}

// ─── 与二分查找对照 ───
// 二分查找：数组有序，比较后区间折半收缩
// 快速选择：数组无序，分区后区间"期望"折半收缩
// 共同点：每次迭代都丢弃一大块不可能含答案的区域

console.log(quickSelectIter([5, 3, 8, 1, 9, 4, 2, 7], 3))  // 4（第 4 小）

// 辅助空间：
// 递归版 O(log n)（调用栈），迭代版 O(1)`

const kthLargestTopKCode = `// ─── 第 K 大 = 第 (n - K + 1) 小（1-based） ───
// 例：n = 8，第 3 大 = 第 8-3+1 = 6 小 = 第 5 小（0-based 下标 n - K = 5）
function kthLargest(nums: number[], k: number): number {
    const n = nums.length
    return quickSelect(nums, 0, n - 1, n - k)  // k 为 1-based，转 0-based 下标
}
console.log(kthLargest([5, 3, 8, 1, 9, 4, 2, 7], 3))  // 8（第 3 大）

// ─── Top-K 用最小堆：O(n log k) ───
// 维护一个大小恒为 k 的最小堆，堆顶就是当前第 k 大
// 每个元素与堆顶比较：更大就替换堆顶并下沉（堆实现见模块 5-1）
class MinHeap<T> {
    push(x: T): void { /* 插入 + 上浮 */ }
    pop(): T | undefined { /* 弹出堆顶 + 下沉 */ return undefined }
    peek(): T { return undefined as any }
    size(): number { return 0 }
    toArray(): T[] { return [] }
}

function topK(nums: number[], k: number): number[] {
    const heap = new MinHeap<number>()            // 最小堆，容量恒为 k
    for (const x of nums) {
        if (heap.size() < k) { heap.push(x); continue }
        if (x > heap.peek()) { heap.pop(); heap.push(x) }  // 只保留最大的 k 个
    }
    return heap.toArray().sort((a, b) => b - a)   // 降序输出前 K 大
}

// ─── 选型结论 ───
// 场景 A：只问一次「第 K 小」         → quickSelect 期望 O(n) 完胜
// 场景 B：流式数据持续维护 Top-K      → 堆 O(n log k)，支持增量 O(log k)
// 场景 C：需要 Top-K 有序输出          → 堆弹出 k 次 O(k log k)
// 场景 D：K 很小（如 Top-10）且 n 巨大 → 堆几乎总是更好`
</script>
