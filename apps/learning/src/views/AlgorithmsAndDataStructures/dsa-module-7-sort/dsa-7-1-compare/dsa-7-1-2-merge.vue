<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔀 归并排序：分治 / 原地归并 / 外排序</h1>
          <p class="text-sm text-slate-500 mt-1">先分后合 —— 稳定且性能可预期的 O(n log n)</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-1-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：先拆到单个，再两两合并
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          归并排序的核心是<strong>「先拆后合，合必有序」</strong>：<strong>① 拆</strong>——把区间对半拆，直到每个子区间只剩 1 个元素（天然有序）；
          <strong>② 合</strong>——把两个<strong>已有序</strong>的子区间用「双指针」扫一遍合并成一个更大的有序区间。
          每层合并总代价 O(n)，共 log₂n 层，因此<strong>最好/平均/最坏都是 O(n log n)</strong>。
        </p>

        <!-- 分治树：拆分下行 / 合并上行 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="mg1-down" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              <marker id="mg1-up" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" /></marker>
            </defs>
            <text x="20" y="26" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">归并分治树：灰蓝下行 = 拆分（Divide），绿色上行 = 合并（Conquer）</text>
            <text x="20" y="46" font-size="11" font-family="monospace" fill="#94a3b8">每层把两个「有序段」扫一遍合并成一个「有序段」——共 log₂n 层，每层 O(n)</text>

            <!-- 第一层：[8,1,3,5] -->
            <rect x="300" y="64" width="120" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="360" y="84" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">8 1 3 5</text>
            <!-- 下行 -->
            <line x1="330" y1="104" x2="190" y2="142" stroke="#60a5fa" stroke-width="2" marker-end="url(#mg1-down)" />
            <line x1="390" y1="104" x2="530" y2="142" stroke="#60a5fa" stroke-width="2" marker-end="url(#mg1-down)" />
            <text x="262" y="128" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#2563eb">拆</text>
            <text x="460" y="128" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#2563eb">拆</text>
            <!-- 第二层 -->
            <rect x="130" y="144" width="120" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="190" y="164" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">8 1</text>
            <rect x="470" y="144" width="120" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="530" y="164" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3 5</text>
            <!-- 上行（合并）：[8,1]→[1,8]  [3,5]→[3,5] -->
            <line x1="250" y1="144" x2="330" y2="104" stroke="#4ade80" stroke-width="2" marker-end="url(#mg1-up)" />
            <line x1="590" y1="144" x2="420" y2="104" stroke="#4ade80" stroke-width="2" marker-end="url(#mg1-up)" />
            <text x="212" y="186" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#16a34a">合并：[1,8]</text>
            <text x="552" y="186" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#16a34a">合并：[3,5]</text>
            <!-- 最终合并 -->
            <line x1="330" y1="206" x2="360" y2="224" stroke="#4ade80" stroke-width="2" marker-end="url(#mg1-up)" />
            <line x1="390" y1="206" x2="360" y2="224" stroke="#4ade80" stroke-width="2" marker-end="url(#mg1-up)" />
            <text x="360" y="246" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#16a34a">最终合并：[1,3,5,8] ✓</text>
            <text x="700" y="80" text-anchor="end" dominant-baseline="central" font-size="11" font-family="monospace" fill="#2563eb">下行 = 拆分（Divide）</text>
            <text x="700" y="98" text-anchor="end" dominant-baseline="central" font-size="11" font-family="monospace" fill="#16a34a">上行 = 合并（Conquer）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：先拆到单个（递归出口），返回路上两两合并，每层都是「两个有序段的线性扫描」</figcaption>
        </figure>

        <!-- 合并两个有序数组：before / after -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="20" y="28" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">合并前：两个已有序的子数组（i / j 指针从头开始）</text>
              <!-- 左段 [1,3,5] -->
              <rect x="60"  y="80" width="62" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="91"  y="101" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="134" y="80" width="62" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="165" y="101" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="208" y="80" width="62" height="42" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="239" y="101" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <text x="91" y="142" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#f59e0b">▲ i</text>
              <text x="175" y="176" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">左段 [1,3,5]（青）</text>
              <!-- 右段 [2,4,6] -->
              <rect x="380" y="80" width="62" height="42" rx="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5" /><text x="411" y="101" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="454" y="80" width="62" height="42" rx="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5" /><text x="485" y="101" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="528" y="80" width="62" height="42" rx="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5" /><text x="559" y="101" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
              <text x="411" y="142" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#f59e0b">▲ j</text>
              <text x="495" y="176" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">右段 [2,4,6]（蓝）</text>
              <text x="330" y="101" text-anchor="middle" dominant-baseline="central" font-size="18" font-family="monospace" fill="#94a3b8">+</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">两段各自有序，只差一次「线性扫描」把它们串起来</figcaption>
          </figure>

          <figure>
            <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="20" y="28" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">合并后：结果数组完全有序（绿色 = 新写入，橙 = 指针移动轨迹）</text>
              <rect x="60"  y="80" width="62" height="42" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="91"  y="101" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
              <rect x="134" y="80" width="62" height="42" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="165" y="101" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
              <rect x="208" y="80" width="62" height="42" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="239" y="101" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
              <rect x="282" y="80" width="62" height="42" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="313" y="101" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">4</text>
              <rect x="356" y="80" width="62" height="42" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="387" y="101" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
              <rect x="430" y="80" width="62" height="42" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="461" y="101" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">6</text>
              <text x="260" y="158" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">比较轨迹：1←左 2←右 3←左 4←右 5←左 6←右</text>
              <text x="260" y="184" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#16a34a">结果：[1,2,3,4,5,6] ✓</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">「两指针取小」：每轮从两段头部取较小者写入，剩余段整体接上</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 核心思想 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          核心思想：拆到单个，再两两合并
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          归并排序是分治法（Divide and Conquer）的另一个经典。与快排「边拆边定序」不同，它<strong>先无条件拆到底，再在合并的路上完成排序</strong>——
          因为「两个有序数组合并成一个有序数组」是一个 O(n) 的简单操作，而「拆」只是机械地对半切，不比较任何元素。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>拆（Divide）</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">mid = (lo+hi)&gt;&gt;1</code>，把 [lo, hi] 对半拆成 [lo, mid] 与 [mid+1, hi]</li>
          <li><strong>递归到底</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">lo &gt;= hi</code> 时停止——单个元素<strong>天然有序</strong></li>
          <li><strong>合（Conquer）</strong>：把两个有序段用双指针扫一遍，合成一个更大的有序段</li>
          <li><strong>写回</strong>：合并结果写回原数组对应位置，供上一层继续合并</li>
        </ol>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">T(n) = 2·T(n/2) + O(n) → O(n log n)</p>
          <p class="text-xs text-slate-500 mt-1">拆分永远对半 → 最好/平均/最坏都是 O(n log n)，性能可预期</p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          归并的合并 = <strong>把两摞已排好的牌合并成一摞</strong>——每次比较两摞最上面的牌，小的拿走；一摞空了，另一摞直接叠上去。<br/>
          归并的分治 = <strong>Git 的二分定位 bug</strong>——先把历史对半拆，缩小嫌疑范围，再在另一半里继续拆，最后定位到单次提交。<br/>
          它的核心优势是 <strong>稳定 + 恒 O(n log n)</strong>：老版本 V8 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Array.prototype.sort</code> 就曾用归并排序来保证稳定性（现改 TimSort）。
          </p>
        </aside>
      </section>

      <!-- 2. 自顶向下递归 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          自顶向下：递归版归并排序
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          自顶向下（Top-down）从整个数组出发，递归对半拆分，是最直观的写法。两个要点：
          <strong>全程复用同一份辅助数组 tmp</strong>（避免每层新建导致空间 O(n log n)），以及<strong>合并完必须写回原数组</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="mergeRecursiveCode" title="merge_recursive.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>忘记写回原数组</strong>——合并结果只写进了 <code class="bg-amber-100 px-1 rounded text-xs font-mono">tmp</code>，不执行 <code class="bg-amber-100 px-1 rounded text-xs font-mono">arr[t]=tmp[t]</code> 写回，上层合并读到的还是旧数据，排序结果必然错乱。<br/>
          ② <strong>每层递归都新建辅助数组</strong>——看起来更「干净」，但空间复杂度从 O(n) 膨胀到 O(n log n)，大数组直接内存翻车；<strong>全程复用一份 tmp</strong> 才是标准写法。
          </p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 稳定性的秘密就一个符号：</strong>合并时比较条件写 <code class="bg-blue-100 px-1 rounded text-xs font-mono">arr[i] &lt;= arr[j]</code>（相等时取左段）。
          因为左段元素在原数组中<strong>永远在右段元素前面</strong>，相等时优先取左，相等元素的相对顺序就被保住了 —— 这就是归并稳定的全部原理。</p>
        </aside>
      </section>

      <!-- 3. 自底向上迭代 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          自底向上：迭代版归并（无递归栈）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          自底向上（Bottom-up）反过来做：先合并长度为 1 的相邻段，再合并长度为 2 的段……<strong>段宽 width 每轮翻倍</strong>，直到整个数组有序。
          它没有递归栈，空间更可控，也天然适合<strong>链表归并排序</strong>（链表无法随机访问，但迭代归并只需要顺序走）。
        </p>
        <div class="mb-4"><Code language="ts" :code="mergeIterativeCode" title="merge_iterative.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>段边界越界</strong>——最后一组可能不足 <code>width*2</code> 个元素，<code>mid</code> 与 <code>hi</code> 必须用 <code>Math.min(…, n-1)</code> 夹住，否则数组越界或漏合并。<br/>
          ② <strong>空右段硬合并</strong>——当 <code>mid &gt;= hi</code>（右段不存在）时这一组不用处理；不判断直接调用 merge 会下标越界。
          </p>
        </aside>
      </section>

      <!-- 4. 合并两个有序数组 / K 个 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          合并两个有序数组 → 合并 K 个有序数组
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          归并的「原子操作」是<strong>合并两个有序数组</strong>（LeetCode 88 / 21）。把它推广到 <strong>合并 K 个有序数组</strong>（K-way merge），
          就是外排序的核心：每轮从 K 个「段头」里取最小，用<strong>最小堆</strong>把「找最小」从 O(K) 降到 O(log K)。
        </p>
        <div class="mb-4"><Code language="ts" :code="mergeTwoSortedCode" title="merge_two_sorted.ts" /></div>
        <div class="mb-4"><Code language="ts" :code="mergeKCode" title="merge_k.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么要推广到 K 路？</strong>外排序时内存装不下整个数据，先把数据切成能进内存的块、块内排序写回磁盘，
          得到 K 个「有序段」（run），最后多路归并成一个大文件——<strong>归并的顺序读特性让它成为外排序的不二之选</strong>。</p>
        </aside>
      </section>

      <!-- 5. 原地归并 + 外排序 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          原地归并思路 与 外排序应用
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          归并的「痛」是额外 O(n) 空间。能不能<strong>原地归并</strong>（in-place）？理论可以，但都有代价：
        </p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>旋转法 / 循环移位</strong>：发现右段某元素小于左段当前元素，把它「滚」到前面——省了空间，多了 O(n²) 的最坏交换</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>局部倒置合并</strong>：利用「左段尾部 ≤ 右段头部」时无需移动的特性，最坏情况仍是 O(n log n) 但常数变大</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>工程结论</strong>：原地归并的常数太大，实际几乎都用 O(n) 辅助空间版本——<strong>用空间换简单与稳定</strong></span></li>
        </ul>
        <div class="mb-4"><Code language="ts" :code="externalSortCode" title="external_sort.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 一句话总结归并 vs 快排的选型：</strong>内存内排序，快排更快（缓存友好、常数小）；内存外排序（磁盘/SSD），归并必胜（顺序读）。
          需要稳定 + 性能可预期，也选归并。</p>
        </aside>
      </section>

      <!-- 6. 复杂度 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">6</span>
          复杂度：恒 O(n log n)，空间 O(n)，稳定
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">情况</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">时间</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">最好</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200">拆分永远对半，与输入无关</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">平均</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200">每层合并 O(n)，共 log₂n 层</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">最坏</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200">不会像快排退化到 O(n²)——性能「可预期」</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">空间</td><td class="px-4 py-2 border border-slate-200">O(n)</td><td class="px-4 py-2 border border-slate-200">辅助数组 O(n) + 递归栈 O(log n)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">稳定性</td><td class="px-4 py-2 border border-slate-200">✅ 稳定</td><td class="px-4 py-2 border border-slate-200">合并时相等取左段，相对顺序不丢</td></tr>
            </tbody>
          </table>
        </div>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">恒 O(n log n)　·　空间 O(n)　·　稳定</p>
          <p class="text-xs text-slate-500 mt-1">「快排最快但会退化，归并不最快但绝不退化」——确定性是它的名片</p>
        </div>
      </section>

      <!-- 7. 优缺点与适用场景 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">7</span>
          优缺点与适用场景
        </h2>
        <h3 class="text-base font-semibold text-slate-700 mb-2">优点</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>稳定</strong>——多关键字排序（先按时间再按价格）直接可用</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>性能可预期</strong>——最好/最坏都是 O(n log n)，无退化风险</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>天然支持外排序</strong>——顺序读磁盘，大数据集的不二之选</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>适合链表</strong>——迭代版归并无需随机访问，可原地合并链表</span></li>
        </ul>
        <h3 class="text-base font-semibold text-slate-700 mb-2">缺点</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-red-400 mt-1">▸</span><span><strong>额外空间 O(n)</strong>——大数组内存翻倍，是它输给快排/堆排序的主因</span></li>
          <li class="flex items-start gap-2"><span class="text-red-400 mt-1">▸</span><span><strong>常数因子较大</strong>——数组场景通常比快排慢（快排缓存友好）</span></li>
          <li class="flex items-start gap-2"><span class="text-red-400 mt-1">▸</span><span><strong>小数组不划算</strong>——递归+临时数组开销大，工程上小规模切插入排序</span></li>
        </ul>
        <h3 class="text-base font-semibold text-slate-700 mb-2">适用场景</h3>
        <div class="mb-4"><Code language="ts" :code="useCaseCode" title="use_cases.ts" /></div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：自顶向下归并排序
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          蓝 = 正在拆分的子区间 · 橙 = 合并时正在比较/写入的位置 · 绿 = 合并完成的区间。先一路拆到单个，再两两合并，最终全部变绿。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ bars.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔍 比较: {{ cmp }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔁 交换: {{ swp }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doMerge" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">🔀 归并排序</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ 重置</button>
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
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>思想：</strong>先拆到单个（天然有序），再两两合并——合必有序</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>两种实现：</strong>自顶向下（递归，直观）/ 自底向上（迭代，无递归栈，适合链表）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>稳定性：</strong>合并用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">&lt;=</code>（相等取左段）即稳定</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度：</strong>恒 O(n log n) / 空间 O(n) / 稳定 —— 确定性是它的名片</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>坑：</strong>忘记写回原数组；每层新建辅助数组；迭代版段边界要 Math.min 夹住</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>延伸：</strong>合并两个有序数组 → 合并 K 个（最小堆）→ 外排序（多路归并）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下一步：</strong>7-1-3 堆排序——O(1) 空间的 O(n log n)，但不稳定</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-1-compare/dsa-7-1-1-quick" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：快速排序：分区策略/随机化/三路快排</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-1-compare/dsa-7-1-3-heap-sort" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：堆排序：建堆/排序/性能对比 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "核心思想" },
  { id: "sec-2", name: "自顶向下递归" },
  { id: "sec-3", name: "自底向上迭代" },
  { id: "sec-4", name: "合并两段 / K 段" },
  { id: "sec-5", name: "原地归并与外排序" },
  { id: "sec-6", name: "复杂度" },
  { id: "sec-7", name: "优缺点与场景" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-8", name: "小结" },
]

// ===== 🎬 归并排序柱状图动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const cmp = ref(0), swp = ref(0)
interface Bar { id:number; val:number; color:string; s?:number; _x?:number; _y?:number; _h?:number }
const bars = reactive<Bar[]>([])
const BASE = 280, MXH = 220, BW = 46, G = 8
function initArr(vals:number[]=[5,3,8,1,9,4,2,7]) { bars.splice(0); vals.forEach((v,i)=>bars.push({id:i+1,val:v,color:C.cyan,s:1})); cmp.value=0; swp.value=0; layout() }
function layout() { const n=bars.length, bw=Math.min(BW,Math.floor((W.value-20)/(n||1)-G)), total=n*(bw+G)-G, sx=Math.max(10,(W.value-total)/2), maxV=Math.max(...bars.map(b=>b.val),1); bars.forEach((b,i)=>{ b._x=sx+i*(bw+G); b._h=Math.max(28,(b.val/maxV)*MXH); b._y=BASE-b._h }) }
function barCfg(b:any){ const s=b.s??1, bw=Math.min(BW,Math.floor((W.value-20)/(bars.length||1)-G)); return { x:b._x+(bw*(1-s))/2, y:b._y, width:bw*s, height:b._h*s, fill:b.color, cornerRadius:[4,4,0,0], stroke:'#94a3b8', strokeWidth:1, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 } }
function valCfg(b:any){ const s=b.s??1, h=b._h*s, bw=Math.min(BW,Math.floor((W.value-20)/(bars.length||1)-G)); return { x:b._x+(bw*(1-s))/2, y:b._y+2, width:bw*s, height:h-4, text:String(b.val), fontSize:14, fontFamily:'monospace', fontStyle:'bold', fill:h>30?'#fff':C.text, align:'center', verticalAlign:'middle' } }
function idxCfg(i:number){ const bw=Math.min(BW,Math.floor((W.value-20)/(bars.length||1)-G)); return { x:bars[i]._x??0, y:BASE+6, width:bw, text:'['+i+']', fontSize:10, fontFamily:'monospace', fill:C.muted, align:'center' } }
function colorAt(i:number,c:string){ if(bars[i]) bars[i].color=c }
function allCyan(){ bars.forEach(b=>b.color=C.cyan) }
async function act(msg:string,label:string,fn:()=>Promise<void>){ if(busy.value) return; busy.value=true; status.value=msg; opLabel.value=label; try{await fn()}catch(_){} finally{ await d(250); busy.value=false; status.value=''; opLabel.value='' } }
let ro:ResizeObserver|null=null
onMounted(()=>{ initArr(); if(box.value){ W.value=box.value.clientWidth; layout(); ro=new ResizeObserver(e=>{const w=e[0]?.contentRect.width; if(w&&w>100){W.value=w;layout()}}); ro.observe(box.value) }})
onUnmounted(()=>ro?.disconnect())

// 合并动画：把 [lo..mid] 与 [mid+1..hi] 两个有序段合并
async function mergeAni(lo:number, mid:number, hi:number) {
  const left: number[] = [], right: number[] = []
  for (let i = lo; i <= mid; i++) left.push(bars[i].val)
  for (let i = mid + 1; i <= hi; i++) right.push(bars[i].val)
  for (let i = lo; i <= hi; i++) colorAt(i, C.blue)
  status.value = `合并：[${left.join(',')}] + [${right.join(',')}]`
  await d(450)
  let i = 0, j = 0, k = lo
  while (i < left.length && j < right.length) {
    cmp.value++
    colorAt(k, C.orange)
    status.value = `比较 ${left[i]} 与 ${right[j]}`
    await d(330)
    if (left[i] <= right[j]) { bars[k].val = left[i]; i++ } else { bars[k].val = right[j]; j++ }
    swp.value++
    layout()
    await d(330)
    k++
  }
  while (i < left.length) { bars[k].val = left[i++]; colorAt(k, C.orange); swp.value++; layout(); await d(180); k++ }
  while (j < right.length) { bars[k].val = right[j++]; colorAt(k, C.orange); swp.value++; layout(); await d(180); k++ }
  for (let t = lo; t <= hi; t++) colorAt(t, C.green)
  status.value = `[${lo}..${hi}] 合并完成`
  await d(400)
}

// 分治动画：拆 → 拆 → 合
async function mergeSortAni(lo:number, hi:number) {
  if (lo >= hi) return
  const mid = (lo + hi) >> 1
  for (let i = lo; i <= mid; i++) colorAt(i, C.blue)
  status.value = `拆分 [${lo}..${hi}] → [${lo}..${mid}] 与 [${mid+1}..${hi}]`
  await d(450)
  await mergeSortAni(lo, mid)
  await mergeSortAni(mid + 1, hi)
  await mergeAni(lo, mid, hi)
}

function doMerge() {
  act('归并排序（自顶向下）', '恒 O(n log n) 稳定', async () => {
    await mergeSortAni(0, bars.length - 1)
    bars.forEach(b => b.color = C.green)
    status.value = '✅ 排序完成：[1,2,3,4,5,7,8,9]'
  })
}
function doReset(){ initArr(); status.value=''; opLabel.value='' }

// ===== 代码示例 =====
const mergeRecursiveCode = `// ===== 自顶向下归并：递归拆分 + 合并 =====
function merge(arr: number[], lo: number, mid: number, hi: number, tmp: number[]): void {
    let i = lo, j = mid + 1, k = lo
    while (i <= mid && j <= hi) {
        if (arr[i] <= arr[j]) tmp[k++] = arr[i++]   // 相等取左段 → 稳定
        else                  tmp[k++] = arr[j++]
    }
    while (i <= mid) tmp[k++] = arr[i++]            // 左段剩余
    while (j <= hi)  tmp[k++] = arr[j++]            // 右段剩余
    for (let t = lo; t <= hi; t++) arr[t] = tmp[t]  // ⚠️ 必须写回原数组
}

function mergeSortRec(arr: number[]): void {
    const tmp: number[] = new Array(arr.length)     // 全程复用同一份 tmp
    const sort = (lo: number, hi: number): void => {
        if (lo >= hi) return                        // 单个元素：天然有序（递归出口）
        const mid = (lo + hi) >> 1
        sort(lo, mid)                               // 拆左
        sort(mid + 1, hi)                           // 拆右
        merge(arr, lo, mid, hi, tmp)                // 合
    }
    sort(0, arr.length - 1)
}

// 手动模拟 [3,1]：
// sort(0,1) → sort(0,0) 与 sort(1,1) 直接返回
// merge: i=0(3) j=1(1) → 1<=3 否 → tmp[0]=1, j=2
//        左段剩 3 → tmp[1]=3 → 写回 [1,3] ✓`

const mergeIterativeCode = `// ===== 自底向上归并：迭代版，无递归栈 =====
function mergeSortIter(arr: number[]): void {
    const n = arr.length
    const tmp: number[] = new Array(n)
    for (let width = 1; width < n; width <<= 1) {       // 段宽 1→2→4→…
        for (let lo = 0; lo < n; lo += width * 2) {     // 每对相邻段
            const mid = Math.min(lo + width - 1, n - 1) // ⚠️ 右段左边界（夹住）
            const hi  = Math.min(lo + width * 2 - 1, n - 1)
            if (mid < hi) merge(arr, lo, mid, hi, tmp)  // 右段存在才合并
        }
    }
}
// 理解：第一轮合并相邻的 1 个元素 → 长度 2 的有序段
//       第二轮合并相邻的 2 个元素 → 长度 4 的有序段
//       ……直到 width ≥ n，整个数组有序
// 优点：无递归栈、空间可控；链表排序用它可原地完成`

const mergeTwoSortedCode = `// ===== 合并两个有序数组（归并的原子操作）=====
function mergeTwoSorted(a: number[], b: number[]): number[] {
    const res: number[] = new Array(a.length + b.length)
    let i = 0, j = 0, k = 0
    while (i < a.length && j < b.length) {
        res[k++] = a[i] <= b[j] ? a[i++] : b[j++]   // 相等取左 → 稳定
    }
    while (i < a.length) res[k++] = a[i++]          // 剩余左段
    while (j < b.length) res[k++] = b[j++]          // 剩余右段
    return res
}
console.log(mergeTwoSorted([1, 3, 5], [2, 4, 6]))   // [1,2,3,4,5,6]

// LeetCode 88：原地合并（nums1 预留了末尾空位）
//   技巧：从后往前填，避免覆盖 nums1 中还没处理的元素`

const mergeKCode = `// ===== 合并 K 个有序数组：最小堆版本（K-way merge）=====
// 两路合并每次只比 2 个头；K 路合并每轮要从 K 个头里取最小
// 用最小堆把「找最小」从 O(K) 降到 O(log K)
class MinHeap<T> { /* 最小堆：push O(log K)，pop 取最小值 O(log K) */ }

function mergeKSorted(lists: number[][]): number[] {
    const heap = new MinHeap<{ val: number; list: number; idx: number }>()
    for (let i = 0; i < lists.length; i++) {
        if (lists[i].length) heap.push({ val: lists[i][0], list: i, idx: 0 })
    }
    const res: number[] = []
    while (heap.size > 0) {
        const top = heap.pop()!                        // 取 K 个头里最小的
        res.push(top.val)
        if (top.idx + 1 < lists[top.list].length) {    // 该段还有下一个元素
            heap.push({ val: lists[top.list][top.idx + 1], list: top.list, idx: top.idx + 1 })
        }
    }
    return res
}
// 复杂度：O(N log K)，N = 总元素数
// 应用：外排序的多路归并、合并多个有序日志流`

const externalSortCode = `// ===== 外排序：内存装不下时的归并应用 =====
// 场景：10 GB 日志按时间排序，内存只有 1 GB
// 步骤：
//   1. 分块读入内存（每块 ~512 MB），块内快排/归并，写回磁盘
//      → 得到约 20 个已排序的小文件（run）
//   2. 多路归并（K-way merge）：同时打开所有 run，
//      用最小堆每次取最小记录写到大文件 —— 即上面的 mergeKCode
// 为什么归并适合外排序？
//   归并只需「顺序读」每个 run —— 磁盘顺序 IO 最快；
//   而快排需要随机访问 —— 磁盘随机 IO 慢百倍
// 一句话：内存内选快排（缓存友好），内存外选归并（顺序读友好）`

const useCaseCode = `// ===== 归并排序的适用场景速查 =====
// ✅ 推荐：需要稳定排序（多关键字）、大数据外排序、
//    链表排序（迭代归并原地完成）、性能必须可预期的场景
// ❌ 回避：内存极度受限（O(n) 空间是硬伤）、
//    超大规模数组且不要求稳定（快排更快）
//
// 前端案例：老版 V8 的 Array.prototype.sort 用归并保证稳定；
//   新 V8 改用 TimSort（归并 + 插入排序混合，见 7-4-6）`
</script>
