<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🎯 标准二分查找：精确 / 左边界 / 右边界</h1>
          <p class="text-sm text-slate-500 mt-1">每次排除一半候选——三个模板，一个循环不变式</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 8-1-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">📐</span>
          结构总览：low / mid / high 的收敛过程
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          二分在<strong>有序数组</strong>上维护三个指针：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">low</code>（区间左端，绿）、
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">high</code>（区间右端，红）、
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">mid = ⌊(low+high)/2⌋</code>（每次试探的中点，橙）。
          每比较一次，就<strong>扔掉一半</strong>不可能的区域，区间不断收缩直到命中或为空。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 380" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <!-- 图例 -->
            <text x="16" y="20" font-size="11" font-family="monospace" fill="#16a34a" font-weight="bold">low 绿</text>
            <text x="84" y="20" font-size="11" font-family="monospace" fill="#f59e0b" font-weight="bold">mid 橙</text>
            <text x="152" y="20" font-size="11" font-family="monospace" fill="#ef4444" font-weight="bold">high 红</text>
            <text x="224" y="20" font-size="11" font-family="monospace" fill="#64748b">数组 [1,3,5,7,9,11,13]，查找 target=11</text>

            <!-- ===== 第 1 行：初始 ===== -->
            <text x="16" y="72" font-size="11" font-family="monospace" fill="#334155" font-weight="bold">初始</text>
            <rect x="78" y="52" width="58" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="107" y="73" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">1</text>
            <rect x="156" y="52" width="58" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="185" y="73" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">3</text>
            <rect x="234" y="52" width="58" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="263" y="73" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">5</text>
            <rect x="312" y="52" width="58" height="42" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" /><text x="341" y="73" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">7</text>
            <rect x="390" y="52" width="58" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="419" y="73" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">9</text>
            <rect x="468" y="52" width="58" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="497" y="73" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">11</text>
            <rect x="546" y="52" width="58" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="575" y="73" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">13</text>
            <text x="107" y="106" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">low=0</text>
            <text x="341" y="106" text-anchor="middle" font-size="10" font-family="monospace" fill="#f59e0b" font-weight="bold">mid=3</text>
            <text x="575" y="106" text-anchor="middle" font-size="10" font-family="monospace" fill="#ef4444" font-weight="bold">high=6</text>
            <text x="16" y="130" font-size="10" font-family="monospace" fill="#64748b">mid=(0+6)/2=3 → arr[3]=7</text>

            <!-- ===== 第 2 行：第 1 步 ===== -->
            <text x="16" y="196" font-size="11" font-family="monospace" fill="#334155" font-weight="bold">第1步</text>
            <rect x="78" y="176" width="58" height="42" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" /><text x="107" y="197" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#94a3b8">1</text>
            <rect x="156" y="176" width="58" height="42" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" /><text x="185" y="197" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#94a3b8">3</text>
            <rect x="234" y="176" width="58" height="42" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" /><text x="263" y="197" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#94a3b8">5</text>
            <rect x="312" y="176" width="58" height="42" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" /><text x="341" y="197" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#94a3b8">7</text>
            <rect x="390" y="176" width="58" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="419" y="197" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">9</text>
            <rect x="468" y="176" width="58" height="42" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" /><text x="497" y="197" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">11</text>
            <rect x="546" y="176" width="58" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="575" y="197" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">13</text>
            <text x="419" y="230" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">low=4</text>
            <text x="497" y="230" text-anchor="middle" font-size="10" font-family="monospace" fill="#f59e0b" font-weight="bold">mid=5</text>
            <text x="575" y="230" text-anchor="middle" font-size="10" font-family="monospace" fill="#ef4444" font-weight="bold">high=6</text>
            <text x="16" y="254" font-size="10" font-family="monospace" fill="#64748b">7&lt;11 → 左半全部排除，low=mid+1=4</text>

            <!-- ===== 第 3 行：第 2 步 ===== -->
            <text x="16" y="320" font-size="11" font-family="monospace" fill="#334155" font-weight="bold">第2步</text>
            <rect x="78" y="300" width="58" height="42" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" /><text x="107" y="321" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#94a3b8">1</text>
            <rect x="156" y="300" width="58" height="42" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" /><text x="185" y="321" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#94a3b8">3</text>
            <rect x="234" y="300" width="58" height="42" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" /><text x="263" y="321" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#94a3b8">5</text>
            <rect x="312" y="300" width="58" height="42" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" /><text x="341" y="321" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" fill="#94a3b8">7</text>
            <rect x="390" y="300" width="58" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="419" y="321" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">9</text>
            <rect x="468" y="300" width="58" height="42" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" /><text x="497" y="321" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">11</text>
            <rect x="546" y="300" width="58" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.2" /><text x="575" y="321" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">13</text>
            <text x="419" y="354" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">low=4</text>
            <text x="497" y="354" text-anchor="middle" font-size="10" font-family="monospace" fill="#f59e0b" font-weight="bold">mid=5</text>
            <text x="575" y="354" text-anchor="middle" font-size="10" font-family="monospace" fill="#ef4444" font-weight="bold">high=6</text>
            <text x="16" y="378" font-size="10" font-family="monospace" fill="#16a34a">mid=5 → arr[5]=11 命中 → 返回 5 ✅</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：二分收敛过程 —— 7 个元素最多 3 次比较，每次排除一半，区间 [low,high] 不断收缩</figcaption>
        </figure>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">1</span>
          前提与思想 —— 为什么能对半砍
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          二分不是万能的，它依赖一条硬前提：<strong>数组有序（或判定函数单调）</strong>。
          有了有序性，比较 <code>arr[mid]</code> 和 <code>target</code> 就能一次性知道：
          如果 <code>arr[mid] &lt; target</code>，那么<strong>mid 左边所有元素都小于 target</strong>，全部排除；
          如果 <code>arr[mid] &gt; target</code>，则右边全部排除。一次比较，杀掉一半。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>为什么每次能排除一半？</strong></p>
          <ol class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span>比较 <code>arr[mid]</code> 与 <code>target</code>，只有三种结果：小于 / 等于 / 大于</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span>小于 → 由有序性推出 mid 左侧全部小于 target，<strong>左侧作废</strong></span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">3.</span><span>大于 → 右侧作废；等于 → 命中（或继续收缩找边界）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">4.</span><span>区间每轮长度减半：n → n/2 → n/4 → … → 最多 log₂n 轮</span></li>
          </ol>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          二分查找就像<strong>猜数字游戏</strong>（每次回答大了/小了），也像 <code>git bisect</code> 找「第一个出错的提交」——
          一次只问「出错在这之前的区间吗？」，每问一次范围缩一半。<br/>
          还像二分法在 <code>Array.prototype.sort</code> 的归并里用到的思想：有序的东西才能安全地做「分而治之」。</p>
        </aside>
        <div class="mb-4"><Code language="ts" :code="exactCode" title="binary_search.ts" /></div>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">2</span>
          循环不变式 —— 二分正确性的根基
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          背模板没用，因为变体会改边界。真正不变的是<strong>循环不变式</strong>：
          <em>「target 若存在，一定落在闭区间 [low, high] 内」</em>。
          只要每次移动 low/high 时<strong>不越过 target 可能存在的位置</strong>，循环结束时答案就一定在掌握之中。
        </p>
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">循环不变式：target ∈ [low, high]（若存在）</p>
          <p class="text-xs text-cyan-600 text-center">每轮要么命中，要么排除「必然不含 target 的一半」，区间保持不变量 → 终止时 low &gt; high，答案要么已返回要么不存在</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="invariantCode" title="loop_invariant.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 三个模板的唯一区别：</strong><br/>
          精确、左边界、右边界的循环结构一模一样，唯一不同的就是<strong>「命中 target 之后怎么办」</strong>：
          精确查找直接 <code>return mid</code>；左边界继续 <code>high = mid - 1</code> 向左收；
          右边界继续 <code>low = mid + 1</code> 向右收。把这一点想透，模板自然就记住了。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">3</span>
          精确查找 —— 最基本的模板
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          最朴素的场景：数组<strong>没有重复元素</strong>，只问「target 在不在、在哪」。
          用 <code>while (low &lt;= high)</code> 闭区间写法，命中即返回，区间空（low &gt; high）则返回 -1。
        </p>
        <div class="mb-4"><Code language="ts" :code="exactCode" title="binary_search_exact.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>闭区间模板用 <code>while (low &lt;= high)</code> 且 <code>low = mid+1 / high = mid-1</code>。
          如果用 <code>while (low &lt; high)</code> 而不处理 <code>low==high</code> 时元素恰好是 target 的情况，会漏判最后一个候选。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">4</span>
          左边界 —— 找第一个等于 target 的位置
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          数组<strong>有重复元素</strong>时，精确查找可能返回任意一个 target。要拿「第一个」，
          就在命中后<strong>不 return，先记录 ans = mid，再 high = mid - 1 继续向左收缩</strong>——不断逼近最左的那个。
        </p>
        <div class="mb-4"><Code language="ts" :code="leftCode" title="lower_bound.ts" /></div>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>执行过程（nums=[1,3,3,5,5,5,7,9], target=5）：</strong></p>
          <ol class="space-y-1 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">1.</span><span>low=0 high=7 mid=3，arr[3]=5 命中 → <strong>ans=3，high=2</strong>（向右全排除）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">2.</span><span>low=0 high=2 mid=1，arr[1]=3&lt;5 → low=2</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">3.</span><span>low=2 high=2 mid=2，arr[2]=3&lt;5 → low=3</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">4.</span><span>low=3 &gt; high=2 结束，返回 ans=<strong>3</strong>（第一个 5）</span></li>
          </ol>
        </div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">5</span>
          右边界 —— 找最后一个等于 target 的位置
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          和左边界完全对称：命中后记录 <code>ans = mid</code>，然后 <code>low = mid + 1</code>
          <strong>向右收缩</strong>，不断逼近最右的那个 target。
        </p>
        <div class="mb-4"><Code language="ts" :code="rightCode" title="upper_bound.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left">
              <th class="px-4 py-2 border border-slate-200 font-semibold">模板</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold">循环</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold">命中后</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold">返回</th>
            </tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">精确</td><td class="px-4 py-2 border font-mono">low &lt;= high</td><td class="px-4 py-2 border font-mono text-emerald-600">return mid</td><td class="px-4 py-2 border">下标 或 -1</td></tr>
              <tr><td class="px-4 py-2 border font-mono">左边界</td><td class="px-4 py-2 border font-mono">low &lt;= high</td><td class="px-4 py-2 border font-mono text-amber-600">ans=mid; high=mid-1</td><td class="px-4 py-2 border">第一个 target</td></tr>
              <tr><td class="px-4 py-2 border font-mono">右边界</td><td class="px-4 py-2 border font-mono">low &lt;= high</td><td class="px-4 py-2 border font-mono text-amber-600">ans=mid; low=mid+1</td><td class="px-4 py-2 border">最后一个 target</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">6</span>
          边界与死循环 —— 高频翻车点
        </h2>
        <div class="mb-4"><Code language="ts" :code="pitfallsCode" title="binary_pitfalls.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 死循环元凶：</strong>区间只剩 1 个元素时，若 <code>mid</code> 落在它身上但 <code>low/high</code> 都不前进
          （比如 <code>low = mid</code> 且 <code>mid</code> 一直等于 <code>low</code>），循环就卡死。<br/>
          <strong>铁律：</strong>每轮 low 和 high 至少要有一个前进。闭区间模板用 <code>low=mid+1 / high=mid-1</code>，永远不会卡住。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 面试心法：</strong><br/>
          1. 先问「数组有序吗？有没有重复？」再动手；<br/>
          2. 心里默念循环不变式，边写边验证 low/high 的移动会不会漏答案；<br/>
          3. mid 用 <code>low + ((high-low)&gt;&gt;1)</code> 防溢出；<br/>
          4. 写完跑三个 case：答案在左端 / 在右端 / 不存在，三个边界都过才算对。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">🎬</span>
          动画演示：三指针二分查找
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          数据 <code>[1,3,3,5,5,5,7,9,11,13]</code>（含重复 3 和 5）。先选模式，再点「开始搜索」：
          绿色 low、橙色 mid、红色 high 三条指针轨道在 bar 下方收缩区间；被排除的区域变灰（ghost）。
          <strong>左/右边界模式下，命中 target 后不会返回，而是继续收缩继续找。</strong>
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ bars.length }}</span>
          <span class="bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-mono">🧭 {{ modeLabel }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ ptrStr }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full font-mono">🔢 比较 {{ compareCount }} 次</span>
          <span class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono min-w-[140px] text-center">{{ status || '就绪' }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @click="setMode('exact')" :disabled="busy"
            :class="[modeBtnCls('exact'), 'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100']">精确查找</button>
          <button @click="setMode('left')" :disabled="busy"
            :class="[modeBtnCls('left'), 'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100']">左边界</button>
          <button @click="setMode('right')" :disabled="busy"
            :class="[modeBtnCls('right'), 'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100']">右边界</button>
          <label class="flex items-center gap-1 text-xs text-slate-500">
            🎯 目标
            <input v-model.number="targetVal" type="number"
              class="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-shadow" />
          </label>
          <button @click="runSearch" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">▶ 开始搜索</button>
          <button @click="randomTarget" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">🎲 随机目标</button>
          <button @click="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-rect v-for="b in bars" :key="b.id" :config="rectCfg(b)" />
              <v-text v-for="b in bars" :key="'v'+b.id" :config="valCfg(b)" />
              <v-text v-for="(b,i) in bars" :key="'i'+b.id" :config="idxCfg(i)" />
              <!-- 三指针轨道 -->
              <v-arrow v-if="low>=0" :config="ptrArrow(low, C.green, 0)" />
              <v-text v-if="low>=0" :config="ptrText(low, 'low', C.green, 0)" />
              <v-arrow v-if="mid>=0" :config="ptrArrow(mid, C.orange, 18)" />
              <v-text v-if="mid>=0" :config="ptrText(mid, 'mid', C.orange, 18)" />
              <v-arrow v-if="high>=0" :config="ptrArrow(high, C.red, 36)" />
              <v-text v-if="high>=0" :config="ptrText(high, 'high', C.red, 36)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>二分前提是单调性</strong>：数组有序或判定单调，才能一次排除一半 O(log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>循环不变式</strong>：target 若存在必在 [low,high] 内——移动指针时绝不越过它</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三个模板同构</strong>，唯一区别是命中后：return / high=mid-1 / low=mid+1</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>防死循环</strong>：闭区间 while(low&lt;=high) + 每次 ±1；mid 用 low+((high-low)&gt;&gt;1)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>左/右边界 = 精确查找的延伸</strong>：有重复元素时拿「第一个 / 最后一个」</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-0-search-basics/dsa-8-0-1-overview" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：搜索总览</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-1-binary/dsa-8-1-2-answer" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：二分答案 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ===== 🎬 三指针二分动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H = ref(340), W = ref(700), G = 9, MXH = 180, BASE = 235
interface Bar { id:number; val:number; color:string; s?:number; _x?:number; _y?:number; _h?:number }
const bars = reactive<Bar[]>([])
const busy = ref(false), status = ref(''), nid = ref(100)
const low = ref(-1), high = ref(-1), mid = ref(-1)          // 指针索引，-1 表示隐藏
const mode = ref<'exact'|'left'|'right'>('exact')
const targetVal = ref(5), compareCount = ref(0), foundAt = ref(-1)
const box = ref<HTMLDivElement>()
const sh = (v:number)=>Math.max(4,v)
const d = (ms:number)=>new Promise(r=>setTimeout(r,ms))

const modeLabel = computed(() => mode.value==='exact' ? '精确查找' : mode.value==='left' ? '左边界' : '右边界')
const ptrStr = computed(() => {
  const l = low.value, m = mid.value, h = high.value
  return 'low=' + (l<0?'—':l) + ' · mid=' + (m<0?'—':m) + ' · high=' + (h<0?'—':h)
})

function bwNow() { return Math.min(54, Math.floor((W.value-20)/(bars.length||1)-G)) }
function barCx(i:number) { return ((bars[i] as any)?._x || 0) + bwNow()/2 }
function layout() {
  const bw = bwNow(), total = bars.length*(bw+G)-G, sx = Math.max(10,(W.value-total)/2)
  const maxV = Math.max(...bars.map(b=>b.val),1)
  bars.forEach((b,i)=>{ b._x = sx+i*(bw+G); b._h = Math.max(30,(b.val/maxV)*MXH); b._y = BASE-(b._h||30) })
}
function rectCfg(b:any) {
  const bw = bwNow(); const s = b.s ?? 1; const isGhost = b.color === C.ghost
  return {
    x: b._x+(bw*(1-s))/2, y: b._y, width: bw*s, height: sh(b._h||30)*s,
    fill: b.color, cornerRadius: [4,4,0,0],
    stroke: isGhost?'transparent':'#94a3b8', strokeWidth: isGhost?0:1,
    shadowColor: isGhost?'transparent':'rgba(0,0,0,0.12)', shadowBlur: isGhost?0:6, shadowOffsetY: isGhost?0:2,
    opacity: isGhost?0:1,
  }
}
function valCfg(b:any) {
  const bw = bwNow(); const s = b.s ?? 1; const h = sh(b._h||30)*s
  return { x: b._x+(bw*(1-s))/2, y: b._y+2, width: bw*s, height: h-4, text: h>20?String(b.val):'',
    fontSize: Math.round(Math.min(14,bw*.3)*s), fontFamily:'monospace', fontStyle:'bold',
    fill: h>32?'#fff':C.text, align:'center', verticalAlign:'middle' }
}
function idxCfg(i:number) {
  const bw = bwNow()
  return { x:(bars[i]as any)?._x||0, y:BASE+6, width:bw, text:'['+i+']',
    fontSize: Math.min(10,bw*.2), fontFamily:'monospace', fill:C.muted, align:'center' }
}
function ptrArrow(idx:number, color:string, lane:number) {
  const cx = barCx(idx)
  return { points:[cx, BASE+lane+14, cx, BASE+lane+4], stroke:color, fill:color, pointerLength:6, pointerWidth:6 }
}
function ptrText(idx:number, name:string, color:string, lane:number) {
  const cx = barCx(idx)
  return { x: cx-44, y: BASE+lane+16, width: 88, text: name+'='+idx, fontSize: 10,
    fontFamily:'monospace', fontStyle:'bold', fill: color, align:'center' }
}

function initData(arr:number[] = [1,3,3,5,5,5,7,9,11,13]) {
  bars.length = 0
  arr.forEach((v,i)=>bars.push({id:i+1,val:v,color:C.cyan,s:1}))
  reset()
}
function reset() {
  bars.forEach(b=>{ b.color=C.cyan; b.s=1 })
  low.value=-1; high.value=-1; mid.value=-1
  foundAt.value=-1; compareCount.value=0; status.value=''
  layout()
}
function setMode(m:'exact'|'left'|'right') { if (busy.value) return; mode.value = m; reset() }
function randomTarget() { if (busy.value) return; targetVal.value = bars[Math.floor(Math.random()*bars.length)].val; reset() }
function doReset() { reset() }
const modeBtnCls = (m:string) => m===mode.value
  ? 'bg-cyan-500 text-white border-cyan-500 shadow-sm'
  : 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300'

async function act(msg:string, fn:()=>Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

async function runSearch() {
  const t = +targetVal.value
  if (isNaN(t) || busy.value) return
  act(modeLabel.value + '  O(log n)', async () => {
    reset()
    let lo = 0, hi = bars.length - 1, ans = -1
    low.value = lo; high.value = hi
    while (lo <= hi) {
      const m = Math.floor((lo + hi) / 2)
      mid.value = m; compareCount.value++
      bars[m].color = C.orange; bars[m].s = 1.12; layout()
      status.value = 'mid=' + m + '，比较 ' + bars[m].val + ' vs ' + t
      await d(650)

      if (bars[m].val === t) {
        bars[m].color = C.green; bars[m].s = 1.12; ans = m; foundAt.value = m; layout()
        status.value = mode.value==='exact' ? ('✅ 找到 ' + t + ' @ ' + m) : ('🎯 候选 ' + t + ' @ ' + m)
        await d(550)
        if (mode.value === 'exact') break
        if (mode.value === 'left') {
          // 命中后继续向左收缩：右侧全部排除，high=m-1
          for (let i = m+1; i <= hi; i++) bars[i].color = C.ghost
          hi = m - 1; high.value = hi
          bars[m].color = C.green
          status.value = '左边界：命中不返回，舍弃右侧 → high=m-1=' + hi
          await d(550)
        } else {
          for (let i = lo; i <= m-1; i++) bars[i].color = C.ghost
          lo = m + 1; low.value = lo
          bars[m].color = C.green
          status.value = '右边界：命中不返回，舍弃左侧 → low=m+1=' + lo
          await d(550)
        }
      } else if (bars[m].val < t) {
        for (let i = lo; i <= m; i++) bars[i].color = C.ghost
        lo = m + 1; low.value = lo
        bars[m].s = 1
        status.value = bars[m].val + ' < ' + t + ' → 舍弃左半，low=m+1=' + lo
        await d(500)
      } else {
        for (let i = m; i <= hi; i++) bars[i].color = C.ghost
        hi = m - 1; high.value = hi
        bars[m].s = 1
        status.value = bars[m].val + ' > ' + t + ' → 舍弃右半，high=m-1=' + hi
        await d(500)
      }
      mid.value = -1
      layout()
    }
    mid.value = -1
    if (mode.value === 'exact' && ans < 0) {
      status.value = '❌ 未找到 ' + t
    } else if (ans >= 0 && mode.value !== 'exact') {
      bars[ans].color = C.green; bars[ans].s = 1.18; layout()
      status.value = '🏁 答案 = ' + ans + '（' + (mode.value==='left'?'最左':'最右') + '的 ' + t + '）'
    }
    await d(400)
  })
}

let ro: ResizeObserver | null = null
onMounted(() => {
  initData()
  if (box.value) {
    W.value = box.value.clientWidth; layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== navList =====
const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "前提与思想" },
  { id: "sec-2", name: "循环不变式" },
  { id: "sec-3", name: "精确查找模板" },
  { id: "sec-4", name: "左边界模板" },
  { id: "sec-5", name: "右边界模板" },
  { id: "sec-6", name: "边界与死循环" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

const exactCode = `// ─── 精确查找：返回 target 的下标，找不到返回 -1 ───
// 循环不变式：target 若存在，必在闭区间 [low, high] 内

function binarySearch(nums: number[], target: number): number {
    let low = 0, high = nums.length - 1

    while (low <= high) {                        // 闭区间，low/high 都可能指向答案
        const mid = low + ((high - low) >> 1)    // 防溢出，等价于 (low+high)/2
        if (nums[mid] === target) return mid
        else if (nums[mid] < target) low = mid + 1   // 舍弃左半
        else high = mid - 1                           // 舍弃右半
    }
    return -1                                    // 区间为空，未找到
}

// 执行过程（nums=[1,3,5,7,9,11], target=11）：
// low=0 high=5 mid=2 arr=5 < 11 → low=3
// low=3 high=5 mid=4 arr=9 < 11 → low=5
// low=5 high=5 mid=5 arr=11 命中 → 返回 5`

const invariantCode = `// ─── 循环不变式：二分正确性的核心 ───
// 不变式：target 若存在，一定在闭区间 [low, high] 内
// 每轮都不破坏它：
//   arr[mid] < target → target 必在 mid 右侧 → low=mid+1 安全
//   arr[mid] > target → target 必在 mid 左侧 → high=mid-1 安全
//   arr[mid] = target → 命中（精确返回；边界变体继续收缩找端点）
// 终止：low > high → 区间为空，答案要么已返回、要么不存在

// 三个模板的唯一区别 = 「命中后怎么处理」：
//   精确查找 → return mid
//   左边界   → high = mid - 1（继续向左，找最左的 target）
//   右边界   → low  = mid + 1（继续向右，找最右的 target）`

const leftCode = `// ─── 左边界：返回第一个 === target 的下标（有重复元素时）───
// 命中后不返回，继续向左收缩：high = mid - 1

function lowerBound(nums: number[], target: number): number {
    let low = 0, high = nums.length - 1
    let ans = -1

    while (low <= high) {
        const mid = low + ((high - low) >> 1)
        if (nums[mid] === target) {
            ans = mid          // 记录候选
            high = mid - 1     // 关键：继续往左找更早的 target
        } else if (nums[mid] < target) low = mid + 1
        else high = mid - 1
    }
    return ans
}

// nums=[1,3,3,5,5,5,7,9], target=5 → 返回 3（第一个 5）`

const rightCode = `// ─── 右边界：返回最后一个 === target 的下标 ───
// 命中后不返回，继续向右收缩：low = mid + 1

function upperBound(nums: number[], target: number): number {
    let low = 0, high = nums.length - 1
    let ans = -1

    while (low <= high) {
        const mid = low + ((high - low) >> 1)
        if (nums[mid] === target) {
            ans = mid          // 记录候选
            low = mid + 1      // 关键：继续往右找更靠后的 target
        } else if (nums[mid] < target) low = mid + 1
        else high = mid - 1
    }
    return ans
}

// nums=[1,3,3,5,5,5,7,9], target=5 → 返回 5（最后一个 5）`

const pitfallsCode = `// ─── 常见错误与修复 ───

// ❌ 错误 1：mid = (low + high) / 2 可能溢出
const mid = low + ((high - low) >> 1)     // ✅ 防溢出写法

// ❌ 错误 2：while (low < high) 且区间收敛时不前进 → 死循环
// 闭区间模板统一用 while (low <= high)，且 low=mid+1 / high=mid-1 每轮必前进

// ❌ 错误 3：边界变体命中后直接 return
// 左/右边界必须「记录候选 + 继续收缩」，否则拿不到端点，和精确查找没区别

// ❌ 错误 4：单调方向判断反了
// arr[mid] < target → target 在右半 → low=mid+1，别写成 high=mid-1`
</script>
