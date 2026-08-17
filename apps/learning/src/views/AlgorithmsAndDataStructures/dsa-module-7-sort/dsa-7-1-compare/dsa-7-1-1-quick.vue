<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">⚡ 快速排序：分区策略 / 随机化 / 三路快排</h1>
          <p class="text-sm text-slate-500 mt-1">分治 + 分区 —— 平均最快的比较排序</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-1-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：选 pivot → 分区 → 递归左右
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          快速排序只有三句话：<strong>① 选一个基准 pivot</strong> → <strong>② 把数组分成「小于 pivot / pivot / 大于 pivot」三块（分区）</strong> → <strong>③ 对左右两块递归快排</strong>。
          分区的妙处：pivot 一趟之后<strong>永久就位</strong>，之后再也不参与排序。平均 O(n log n) 让它成为「比较排序里的速度之王」。
        </p>

        <!-- 一趟分区：before / after -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <figure>
            <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="qk1-down" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <text x="20" y="26" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">一趟 Lomuto 分区（pivot 取最右 = 7）</text>
              <text x="20" y="46" font-size="11" font-family="monospace" fill="#94a3b8">青 = 待分区元素 · 橙 = pivot（最右）· 下一行 = 分区结果</text>
              <!-- 分区前 -->
              <rect x="30"  y="70" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="58"  y="90" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="98"  y="70" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="126" y="90" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="166" y="70" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="194" y="90" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="234" y="70" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="262" y="90" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="302" y="70" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="330" y="90" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <rect x="370" y="70" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="398" y="90" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="438" y="70" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="466" y="90" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="506" y="70" width="56" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" /><text x="534" y="90" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <text x="534" y="126" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#d97706">▲ pivot</text>
              <line x1="300" y1="140" x2="300" y2="160" stroke="#94a3b8" stroke-width="2" marker-end="url(#qk1-down)" />
              <!-- 分区后 -->
              <rect x="30"  y="172" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="58"  y="192" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="98"  y="172" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="126" y="192" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <rect x="166" y="172" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="194" y="192" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <rect x="234" y="172" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="262" y="192" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
              <rect x="302" y="172" width="56" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" /><text x="330" y="192" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="370" y="172" width="56" height="40" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="398" y="192" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">7</text>
              <rect x="438" y="172" width="56" height="40" rx="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5" /><text x="466" y="192" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <rect x="506" y="172" width="56" height="40" rx="6" fill="#60a5fa" stroke="#2563eb" stroke-width="1.5" /><text x="534" y="192" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <text x="168" y="240" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#0e7490">小于 7</text>
              <text x="398" y="240" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#16a34a">pivot 就位</text>
              <text x="496" y="240" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#2563eb">大于 7</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">一趟分区后 7 永久就位：左边全 < 7，右边全 ≥ 7（比较排序核心：每次固定一个元素）</figcaption>
          </figure>

          <figure>
            <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="qk2-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
                <marker id="qk2-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <text x="20" y="26" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">分治递归：分区之后，左右两块各自再分区</text>
              <text x="20" y="46" font-size="11" font-family="monospace" fill="#94a3b8">每次递归让一个新 pivot 永久就位（绿）· 直到每个子区间只剩一个元素</text>
              <!-- 根 -->
              <rect x="250" y="70" width="220" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="360" y="92" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">quickSort(0,7)</text>
              <!-- 边 -->
              <line x1="360" y1="114" x2="220" y2="148" stroke="#94a3b8" stroke-width="2" marker-end="url(#qk2-a)" />
              <line x1="360" y1="114" x2="500" y2="148" stroke="#94a3b8" stroke-width="2" marker-end="url(#qk2-b)" />
              <!-- 左子 -->
              <rect x="70" y="150" width="300" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="220" y="172" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">quickSort(0,4) [5,3,1,4,2]</text>
              <!-- 右子 -->
              <rect x="420" y="150" width="160" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="500" y="172" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">quickSort(6,7) [9,8]</text>
              <!-- 就位的 pivot -->
              <rect x="300" y="216" width="120" height="34" rx="8" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="360" y="233" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">7 已就位 [5]</text>
              <line x1="220" y1="194" x2="330" y2="214" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <line x1="500" y1="194" x2="410" y2="214" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">递归树：每个节点只关心「让 pivot 就位」，其余交给左右子问题 —— 这就是分治</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 核心思想 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          核心思想：选 pivot → 分区 → 递归左右
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          快速排序是<strong>分治法</strong>（Divide and Conquer）的教科书案例。它不像归并那样「先拆再合」，而是<strong>边拆边定序</strong>：
          每次挑一个 pivot，把数组一分为二，pivot 自己立刻站到最终位置，然后左右两边各自再重复这个过程。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>选 pivot</strong>：从区间里挑一个基准值（最右 / 最左 / 中点 / 随机）</li>
          <li><strong>分区</strong>：一趟扫描，把「小于 pivot 的」换到左边、「大于 pivot 的」换到右边，pivot 落位到中间</li>
          <li><strong>递归左半</strong>：对 [lo, p-1] 重复 ① ②，让左边区间的元素各自就位</li>
          <li><strong>递归右半</strong>：对 [p+1, hi] 重复 ① ②，直到每个子区间长度 ≤ 1</li>
        </ol>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">T(n) = T(k) + T(n-k-1) + O(n)</p>
          <p class="text-xs text-slate-500 mt-1">分区消耗 O(n)；k 是小于 pivot 的元素个数 —— 递归树越平衡越快</p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          快排 ≈ <strong>「二分查找的递归版」</strong>——二分查找每次砍掉一半，快排每次把数组「砍成两堆」再各自处理。<br/>
          更生活化的版本：像<strong>整理书架</strong>——先随手拿一本书当基准，把比它薄的放左边、厚的放右边，然后左右两堆再各自重复「拿一本、分两堆」。<br/>
          前端实例：V8 / JavaScriptCore 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Array.prototype.sort</code> 底层就是「快排 + 插入排序」的混合（Introsort），小数组切到插入排序。
          </p>
        </aside>
      </section>

      <!-- 2. Lomuto 分区 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          Lomuto 分区 —— 最直观的写法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Lomuto 分区的思路：pivot 取<strong>最右元素</strong>，维护指针 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i</code> 指向「已确认小于 pivot 区」的末尾，
          用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">j</code> 从左扫到右：遇到小于 pivot 的，先 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i++</code> 再交换。
          扫描结束，把 pivot 换到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i+1</code>，它就是最终位置。
        </p>
        <div class="mb-4"><Code language="ts" :code="lomutoCode" title="lomuto.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>pivot 取最右 + 数组已有序 = 灾难</strong>——对 <code class="bg-amber-100 px-1 rounded text-xs font-mono">[1,2,3,4,5,6,7]</code>，每次 pivot 都是最大，分区退化成「一个元素 + 剩下全部」，递归深度 O(n)，总时间退化为 <strong>O(n²)</strong>。<br/>
          ② <strong>i 的初值写错</strong>——必须是 <code class="bg-amber-100 px-1 rounded text-xs font-mono">lo - 1</code>（小于区初始为空），写成 <code class="bg-amber-100 px-1 rounded text-xs font-mono">lo</code> 会漏掉第一个小于 pivot 的元素；最后落位用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">i + 1</code>，别写成 <code class="bg-amber-100 px-1 rounded text-xs font-mono">i</code>。
          </p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 记忆口诀：</strong>「小就换、大就等」——<code>j</code> 扫到小于 pivot 的元素就把它送进小于区（与 <code>i+1</code> 交换），大于等于 pivot 的原地不动。一趟结束 pivot 落在 <code>i+1</code>。</p>
        </aside>
      </section>

      <!-- 3. Hoare 分区 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          Hoare 分区 —— 双指针相向，交换更少
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Hoare 分区用<strong>左右双指针相向而行</strong>：左指针找「≥ pivot」的，右指针找「≤ pivot」的，找到一对就交换。
          它的交换次数约为 Lomuto 的 <strong>1/3</strong>，且 pivot 常取<strong>中点</strong>——对近乎有序的数组天然更抗退化。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Lomuto</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Hoare</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">pivot 选取</td><td class="px-4 py-2 border border-slate-200">最右（或任意换到最右）</td><td class="px-4 py-2 border border-slate-200">中点（推荐）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">指针移动</td><td class="px-4 py-2 border border-slate-200">单指针 j 从左往右</td><td class="px-4 py-2 border border-slate-200">i 从左、j 从右，相向而行</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">交换次数</td><td class="px-4 py-2 border border-slate-200">较多（每个小于 pivot 的都要换）</td><td class="px-4 py-2 border border-slate-200">约 1/3（只换「逆序对」）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">返回位置</td><td class="px-4 py-2 border border-slate-200">pivot 最终下标 i+1</td><td class="px-4 py-2 border border-slate-200">相遇点 j（pivot 不一定在 j）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">递归区间</td><td class="px-4 py-2 border border-slate-200">[lo, p-1] 与 [p+1, hi]</td><td class="px-4 py-2 border border-slate-200">[lo, j] 与 [j+1, hi]（j 含在左半）</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="hoareCode" title="hoare.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>递归区间照抄 Lomuto</strong>——Hoare 返回的 <code>j</code> 是<strong>分界点</strong>而不是 pivot 的位置，pivot 可能仍在中间某处。左半必须递归到 <code>[lo, j]</code>（含 j），写成 <code>[lo, j-1]</code> 会漏元素、还可能死循环。<br/>
          ② <strong>指针越界</strong>——必须用 <code>do…while</code> 先移动再判断，否则 <code>i</code>、<code>j</code> 可能停在原地导致死循环；退出条件 <code>i &gt;= j</code>，用 <code>i &gt; j</code> 会多交换一次。
          </p>
        </aside>
      </section>

      <!-- 4. 随机化 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          随机化：把「最坏情况」变成概率事件
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          固定取最右（或最左）pivot 有一个致命弱点：<strong>攻击者（或恰好有序的输入）可以让每次分区都极度不平衡</strong>，复杂度稳定退化为 O(n²)。
          解法很简单——<strong>随机选 pivot</strong>：任何固定输入下，选到「接近中位数的 pivot」的概率都很高。
        </p>
        <div class="mb-4"><Code language="ts" :code="randomizedCode" title="randomized.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 数学直觉：</strong>随机化之后，<strong>期望</strong>复杂度是 O(n log n)，且与输入分布无关。
          出现 O(n²) 的概率随 n 增大指数级下降（≈ 1/n！量级）——工程上可以当它「不会发生」。
          </p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 前端最佳实践：</strong>用户上传的榜单、服务端下发的配置数组「几乎有序」是常态，<strong>随机化是零成本保险</strong>。
          另一个工程技巧：递归深度 > 阈值（如 2log₂n）时切换为堆排序 —— 这就是 Introsort（C++ std::sort、V8 sort 的兜底策略）。</p>
        </aside>
      </section>

      <!-- 5. 三路快排 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          三路快排：大量重复元素的救星
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          普通快排遇到<strong>大量重复元素</strong>会退化：比如 10 万元素只有 3 种取值，分区后「等于 pivot 的」被左右两半各分一半，递归仍然很忙。
          <strong>三路快排</strong>（荷兰国旗问题）把数组分成三块：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">&lt; pivot</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">== pivot</code>、<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">&gt; pivot</code>，
          <strong>等于区直接跳过不递归</strong>——全相同数组一趟搞定，O(n)。
        </p>
        <div class="mb-4"><Code language="ts" :code="threeWayCode" title="three_way.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 适用提示：</strong>按<strong>分数排序学生记录</strong>（大量同分）、按键值<strong>分桶</strong>、前端按「优先级等级」排序任务列表——凡是<strong>取值种类远小于 n</strong> 的场景，三路快排从 O(n log n) 降到接近 O(n)。</p>
        </aside>
      </section>

      <!-- 6. 复杂度 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">6</span>
          复杂度：平均 O(n log n)，最坏 O(n²)
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">情况</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">时间</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">触发条件</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">最好</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200">每次分区都恰好对半（pivot 是中位数）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">平均</td><td class="px-4 py-2 border border-slate-200">O(n log n)</td><td class="px-4 py-2 border border-slate-200">随机/任意输入下的期望（随机化保证）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">最坏</td><td class="px-4 py-2 border border-slate-200">O(n²)</td><td class="px-4 py-2 border border-slate-200">pivot 恒为最大/最小，分区 1 : n-1（已有序 + 固定端点 pivot）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">空间</td><td class="px-4 py-2 border border-slate-200">O(log n)</td><td class="px-4 py-2 border border-slate-200">递归栈深度（原地交换，无额外数组）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">稳定性</td><td class="px-4 py-2 border border-slate-200">❌ 不稳定</td><td class="px-4 py-2 border border-slate-200">分区交换会打乱相等元素的相对顺序</td></tr>
            </tbody>
          </table>
        </div>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">平均 O(n log n)　·　最坏 O(n²)　·　空间 O(log n)　·　不稳定</p>
          <p class="text-xs text-slate-500 mt-1">「平均最快」的秘密：常数因子小 + 顺序访问缓存友好（不像堆排序那样跳着访问）</p>
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>平均最快的通用排序</strong>——常数因子小，实际跑赢堆排序/归并</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>原地排序</strong>——额外空间只有递归栈 O(log n)，几乎不占内存</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>缓存友好</strong>——分区是顺序扫描，比堆排序的跳访问快得多</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>分治扩展性强</strong>——可并行、可配三路/随机化/Introsort 组合拳</span></li>
        </ul>
        <h3 class="text-base font-semibold text-slate-700 mb-2">缺点</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-red-400 mt-1">▸</span><span><strong>最坏 O(n²)</strong>——固定 pivot + 有序输入直接退化（随机化可救）</span></li>
          <li class="flex items-start gap-2"><span class="text-red-400 mt-1">▸</span><span><strong>不稳定</strong>——需要稳定排序时不能用（如按「价格升序 + 上架时间升序」多关键字）</span></li>
          <li class="flex items-start gap-2"><span class="text-red-400 mt-1">▸</span><span><strong>递归栈</strong>——极端情况下 O(n) 深，栈溢出风险（Introsort 用堆排序兜底）</span></li>
        </ul>
        <h3 class="text-base font-semibold text-slate-700 mb-2">适用场景</h3>
        <div class="mb-4"><Code language="ts" :code="useCaseCode" title="use_cases.ts" /></div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：Lomuto 快速排序（pivot 取最右）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          橙 = pivot（最右）· 蓝 = 正在比较 · 红 = 即将交换 · 绿 = 已就位（pivot 落位 / 排序完成）。每趟分区让一个 pivot 永久就位，然后递归左右。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ bars.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔍 比较: {{ cmp }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔁 交换: {{ swp }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doQuick" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">⚡ 快速排序</button>
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三步核心：</strong>选 pivot → 分区 → 递归左右；每趟一个元素永久就位</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Lomuto</strong>：pivot 取最右、单指针扫，最好理解；<strong>Hoare</strong>：双指针相向，交换少 2/3，递归区间 [lo, j] 别写错</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>随机化</strong>把最坏 O(n²) 变成概率事件；<strong>三路快排</strong>把大量重复的 O(n log n) 降到接近 O(n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度：</strong>平均 O(n log n) / 最坏 O(n²) / 空间 O(log n) / <strong>不稳定</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>坑：</strong>固定 pivot + 有序输入退化；Hoare 返回分界点而非 pivot 位置；稳定需求别用快排</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下一步：</strong>7-1-2 归并排序 —— 稳定且恒 O(n log n)，但空间 O(n)</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-0-sort-basics/dsa-7-0-1-overview" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：排序总览：稳定性与分类</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-1-compare/dsa-7-1-2-merge" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：归并排序：分治/原地归并/外排序 →</RouterLink>
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
  { id: "sec-2", name: "Lomuto 分区" },
  { id: "sec-3", name: "Hoare 分区" },
  { id: "sec-4", name: "随机化" },
  { id: "sec-5", name: "三路快排" },
  { id: "sec-6", name: "复杂度" },
  { id: "sec-7", name: "优缺点与场景" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-8", name: "小结" },
]

// ===== 🎬 快速排序柱状图动画 =====
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

function swapBars(i:number, j:number){ const t=bars[i]; bars[i]=bars[j]; bars[j]=t }

// Lomuto 分区（动画版，pivot 取最右）
async function partitionAni(lo:number, hi:number): Promise<number> {
  const pivot = bars[hi].val
  colorAt(hi, C.orange)
  status.value = `选 pivot = ${pivot}（下标 [${hi}]，橙色）`
  await d(500)
  let i = lo - 1
  for (let j = lo; j < hi; j++) {
    cmp.value++
    colorAt(j, C.blue)
    status.value = `比较 ${bars[j].val} 与 pivot ${pivot}`
    await d(330)
    if (bars[j].val < pivot) {
      i++
      swp.value++
      colorAt(i, C.red); colorAt(j, C.red)
      status.value = `${bars[j].val} < ${pivot} → 交换 [${i}]↔[${j}]`
      await d(330)
      swapBars(i, j)
      await d(330)
    } else {
      status.value = `${bars[j].val} ≥ ${pivot} → 留在原地`
      await d(260)
    }
    colorAt(j, C.cyan)
    if (i >= lo) colorAt(i, C.cyan)
  }
  swp.value++
  colorAt(i + 1, C.red); colorAt(hi, C.red)
  status.value = `pivot ${pivot} 落位 [${i + 1}]`
  await d(350)
  swapBars(i + 1, hi)
  colorAt(i + 1, C.green)
  await d(420)
  return i + 1
}

async function quickSortAni(lo:number, hi:number) {
  if (lo >= hi) return
  const p = await partitionAni(lo, hi)
  await quickSortAni(lo, p - 1)
  await quickSortAni(p + 1, hi)
}

function doQuick() {
  act('快速排序（Lomuto）', '平均 O(n log n)', async () => {
    await quickSortAni(0, bars.length - 1)
    bars.forEach(b => b.color = C.green)
    status.value = '✅ 排序完成：[1,2,3,4,5,7,8,9]'
  })
}
function doReset(){ initArr(); status.value=''; opLabel.value='' }

// ===== 代码示例 =====
const lomutoCode = `// ===== Lomuto 分区：pivot 取最右，单指针扫描 =====
// i 指向「已确认小于 pivot 区」的末尾；j 从左扫到右
function partitionLomuto(arr: number[], lo: number, hi: number): number {
    const pivot = arr[hi]            // 取最右为 pivot
    let i = lo - 1                   // 小于区末尾（初始为空）
    for (let j = lo; j < hi; j++) {
        if (arr[j] < pivot) {        // 小于 pivot 的送到左边
            i++
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
        }
    }
    ;[arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]]   // pivot 落位
    return i + 1
}

function quickSortLomuto(arr: number[], lo = 0, hi = arr.length - 1): void {
    if (lo >= hi) return
    const p = partitionLomuto(arr, lo, hi)
    quickSortLomuto(arr, lo, p - 1)    // 递归左半（不含已就位的 pivot）
    quickSortLomuto(arr, p + 1, hi)    // 递归右半
}

// 手动模拟：arr = [5,3,8,1,9,4,2,7]，pivot = 7
// j=0: 5<7 → i=0 交换 [0]↔[0]（原地）
// j=1: 3<7 → i=1 交换 [1]↔[1]
// j=2: 8≥7 → 不动
// j=3: 1<7 → i=2 交换 [2]↔[3] → [5,3,1,8,9,4,2,7]
// j=4: 9≥7 → 不动
// j=5: 4<7 → i=3 交换 [3]↔[5] → [5,3,1,4,9,8,2,7]
// j=6: 2<7 → i=4 交换 [4]↔[6] → [5,3,1,4,2,8,9,7]
// 最后 pivot 落位：交换 [5]↔[7] → [5,3,1,4,2,7,9,8]，返回 p=5
// 结果：7 左边全 < 7，右边全 ≥ 7 —— 一趟分区完成`

const hoareCode = `// ===== Hoare 分区：左右双指针相向而行（交换更少）=====
function partitionHoare(arr: number[], lo: number, hi: number): number {
    const pivot = arr[lo + ((hi - lo) >> 1)]   // 取中点为 pivot（抗有序输入）
    let i = lo - 1, j = hi + 1
    while (true) {
        do { i++ } while (arr[i] < pivot)      // 左指针找 ≥ pivot 的
        do { j-- } while (arr[j] > pivot)      // 右指针找 ≤ pivot 的
        if (i >= j) return j                   // 相遇 → 返回分界点
        ;[arr[i], arr[j]] = [arr[j], arr[i]]   // 交换一对「逆序」
    }
}

function quickSortHoare(arr: number[], lo = 0, hi = arr.length - 1): void {
    if (lo >= hi) return
    const p = partitionHoare(arr, lo, hi)
    quickSortHoare(arr, lo, p)        // ⚠️ 左半含 p（Hoare 返回的是分界点，不是 pivot 位置）
    quickSortHoare(arr, p + 1, hi)
}

// 与 Lomuto 的三大差异：
//   1. pivot 取中点 → 对已排序数组也不退化为 O(n²)
//   2. 双指针相向 → 交换次数约为 Lomuto 的 1/3
//   3. 返回的 j 是分界点 → 左半递归 [lo, j]（含 j），别照抄 Lomuto 的 [lo, p-1]`

const randomizedCode = `// ===== 随机化快排：把最坏情况变成概率事件 =====
function partitionRand(arr: number[], lo: number, hi: number): number {
    // 随机挑一个下标当 pivot，换到最右，再走 Lomuto 分区
    const r = lo + Math.floor(Math.random() * (hi - lo + 1))
    ;[arr[r], arr[hi]] = [arr[hi], arr[r]]
    return partitionLomuto(arr, lo, hi)
}

function quickSortRand(arr: number[], lo = 0, hi = arr.length - 1): void {
    if (lo >= hi) return
    const p = partitionRand(arr, lo, hi)
    quickSortRand(arr, lo, p - 1)
    quickSortRand(arr, p + 1, hi)
}

// 数学事实：随机化后，任何固定输入出现 O(n²) 的概率 ≤ 1/n！
// 期望复杂度 = O(n log n)，且不依赖输入分布
// 前端场景：用户上传的「近乎有序」数组是常态，
//   固定取端点 pivot 会稳定踩中 O(n²) —— 随机化是零成本保险`

const threeWayCode = `// ===== 三路快排：处理大量重复元素（荷兰国旗问题）=====
// 三块： [lo..lt-1] < pivot | [lt..gt] == pivot | [gt+1..hi] > pivot
function partition3Way(arr: number[], lo: number, hi: number): [number, number] {
    const pivot = arr[lo]
    let lt = lo, i = lo + 1, gt = hi
    while (i <= gt) {
        if (arr[i] < pivot) {
            ;[arr[i], arr[lt]] = [arr[lt], arr[i]]   // 小于 → 换到左边
            lt++; i++
        } else if (arr[i] > pivot) {
            ;[arr[i], arr[gt]] = [arr[gt], arr[i]]   // 大于 → 换到右边
            gt--
        } else {
            i++                                      // 等于 → 不动
        }
    }
    return [lt, gt]                                  // 返回等于区的 [起点, 终点]
}

function quickSort3Way(arr: number[], lo = 0, hi = arr.length - 1): void {
    if (lo >= hi) return
    const [lt, gt] = partition3Way(arr, lo, hi)
    quickSort3Way(arr, lo, lt - 1)   // 只递归小于区
    quickSort3Way(arr, gt + 1, hi)   // 只递归大于区 —— 等于区整块跳过
}

// 场景：排序大量相同分数的记录、按键值分桶
// 效果：n 个全相同元素 → 一趟搞定，O(n)`

const useCaseCode = `// ===== 快排的适用场景速查 =====
// ✅ 推荐：通用大数据排序（随机数据）、求第 k 大（快选）、
//    Introsort 混合（V8 / std::sort 的做法）
// ❌ 回避：需要稳定（多关键字排序）、元素高度重复（用三路）、
//    内存极端受限且怕递归栈（用堆排序）

// 前端真实案例：V8 的 Array.prototype.sort
//   长度 < 10        → 插入排序（常数小）
//   长度 < 1000      → 快速排序（三路 + 随机 pivot）
//   递归过深         → 切换到堆排序（Introsort 兜底）`
</script>
