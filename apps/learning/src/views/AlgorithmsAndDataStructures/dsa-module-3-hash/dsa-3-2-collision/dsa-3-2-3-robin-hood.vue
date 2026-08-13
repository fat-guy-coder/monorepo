<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🏹 Robin Hood 哈希：劫富济贫的开放寻址</h1>
          <p class="text-sm text-slate-500 mt-1">让「走得远的元素」优先占坑，把探测距离压到最均匀</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 3-2-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：Robin Hood 哈希
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Robin Hood 哈希是<strong>开放寻址的改进版</strong>：每个槽记录它的<strong>位移距离 DIB（Distance from Initial Bucket）</strong>——即元素从「家」（初始哈希位置）走了多远。
          插入时若新元素 DIB 更大（更可怜），就<strong>劫富济贫</strong>：新元素占槽，把原住客挤去继续探测。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">每个槽显示值 + DIB（位移距离），DIB 越大越「远」，插入时被优先照顾</text>

            <!-- 槽 0 -->
            <rect x="20" y="44" width="78" height="56" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="59" y="66" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">16</text>
            <text x="59" y="86" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">dib:0</text>
            <!-- 槽 1 -->
            <rect x="106" y="44" width="78" height="56" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="145" y="66" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">24</text>
            <text x="145" y="86" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">dib:1</text>
            <!-- 槽 2 -->
            <rect x="192" y="44" width="78" height="56" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="231" y="66" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <text x="231" y="86" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#ffffff">dib:2</text>
            <!-- 槽 3 -->
            <rect x="278" y="44" width="78" height="56" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="317" y="66" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <text x="317" y="86" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#ffffff">dib:2</text>
            <!-- 槽 4（空） -->
            <rect x="364" y="44" width="78" height="56" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <!-- 槽 5 -->
            <rect x="450" y="44" width="78" height="56" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="489" y="66" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <text x="489" y="86" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">dib:0</text>
            <!-- 槽 6（空） -->
            <rect x="536" y="44" width="78" height="56" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <!-- 槽 7（空） -->
            <rect x="622" y="44" width="78" height="56" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />

            <text x="59" y="114" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[0]</text>
            <text x="145" y="114" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[1]</text>
            <text x="231" y="114" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[2]</text>
            <text x="317" y="114" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[3]</text>
            <text x="403" y="114" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[4]</text>
            <text x="489" y="114" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[5]</text>
            <text x="575" y="114" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[6]</text>
            <text x="661" y="114" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[7]</text>

            <text x="16" y="150" font-size="11" font-family="monospace" fill="#0891b2">hash(v) = v % 8，橙色槽 = DIB 为 2 的「远道而来」元素</text>
            <text x="16" y="172" font-size="11" font-family="monospace" fill="#64748b">16%8=0 · 24%8=0→dib1 · 8%8=0→dib2 · 9%8=1→dib2 · 5%8=5</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Robin Hood 哈希——每个槽记录 DIB，最大 DIB 被压到很小（这里仅为 2）</figcaption>
        </figure>

        <!-- 操作示意图：劫富济贫交换 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：插入 8（DIB=2）遇到 9（DIB=1）—— 劫富济贫交换</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">交换前：8 到达槽[2]，发现 9 的 DIB 更小</p>
            <svg viewBox="0 0 300 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="40" width="80" height="52" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="60" y="60" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <text x="60" y="80" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">dib:1</text>
              <rect x="120" y="40" width="80" height="52" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="60" y="108" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[2]</text>
              <text x="160" y="108" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[3]</text>
              <text x="240" y="66" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#d97706">8 到槽[2]<br/>DIB=2 &gt; 1</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">交换后：8 占槽[2]，9 被挤到槽[3]（DIB 变 2）</p>
            <svg viewBox="0 0 300 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="40" width="80" height="52" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="60" y="60" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
              <text x="60" y="80" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#16a34a">dib:2</text>
              <rect x="120" y="40" width="80" height="52" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="160" y="60" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <text x="160" y="80" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">dib:2</text>
              <text x="60" y="108" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#16a34a">[2]</text>
              <text x="160" y="108" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">[3]</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">「我走得更远（DIB=2），我该占这个坑」——8 抢走槽[2]，9 带着 DIB=2 继续找家</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. Robin Hood 思想 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          Robin Hood 思想：劫富济贫
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Robin Hood（罗宾汉）是英国传说中<strong>劫富济贫</strong>的侠盗。Robin Hood 哈希借用了这个精神：
          在开放寻址的探测过程中，<strong>「走了更远路的元素」（DIB 更大）比「刚到的元素」（DIB 更小）更可怜</strong>，
          所以插入时，新元素如果发现自己比当前槽里的原住客走得更远，就「劫」走这个槽，把原住客挤去继续探测。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>核心规则（插入时的判断）：</strong></p>
          <ol class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span>新元素到达槽 <code class="bg-white border border-slate-200 rounded px-1 py-0.5 font-mono">cur</code>，它的 DIB = <code class="bg-white border border-slate-200 rounded px-1 py-0.5 font-mono">dib</code></span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span>若槽为空 → 直接写入，DIB 记为 <code class="bg-white border border-slate-200 rounded px-1 py-0.5 font-mono">dib</code></span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">3.</span><span>若槽被占，且 <code class="bg-white border border-slate-200 rounded px-1 py-0.5 font-mono">新DIB &gt; 原DIB</code> → <strong>交换</strong>，被挤走的元素 DIB+1 继续探测</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">4.</span><span>否则（新DIB ≤ 原DIB）→ 新元素 DIB+1，继续探测下一个槽</span></li>
          </ol>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Robin Hood 就像<strong>排队办理业务</strong>——普通线性探测是「新来的排到队尾，越排越长」。<br/>
          Robin Hood 是<strong>让「等了最久的人」插到前面</strong>：谁排得久（DIB 大），谁就优先办理。<br/>
          结果每个人的等待时间趋于平均，不会出现「最倒霉的人排 2 小时」的极端情况。
          </p>
        </aside>
      </section>

      <!-- 2. DIB -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          位移距离 DIB（Distance from Initial Bucket）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          DIB 是 Robin Hood 哈希的<strong>灵魂指标</strong>：元素从它的「家」（初始哈希位置）被挤走了多远。
          公式很简单——当前下标减去初始哈希位置（模容量）：
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-1 text-center font-mono">DIB = (currentIndex − homeIndex) mod m</p>
          <p class="text-xs text-cyan-600 text-center">DIB 越大 = 被挤得越远 = 越「可怜」，插入时优先级越高</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="codeDIB" title="dib.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>Robin Hood 的目标不是「避免冲突」，而是<strong>让最大 DIB 尽可能小</strong>。因为查找时间正比于最大探测距离，最大 DIB 越小，最坏情况的查找就越快。</p>
        </aside>
      </section>

      <!-- 3. 插入时交换 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          插入：交换 + 继续探测
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          完整的 Robin Hood 哈希表实现。插入的核心是<strong>交换</strong>：新元素 DIB 更大时抢槽，被挤走的元素带着 DIB+1 继续探测。
          查找还有一个巧妙优化：<strong>当查找元素的 DIB 超过槽内元素的 DIB 时，可以提前终止</strong>（不可能再找到）。
        </p>
        <div class="mb-4"><Code language="ts" :code="codeRobinHood" title="RobinHoodHashTable.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          1. <strong>交换后忘记给被挤走的元素 DIB+1</strong>——它被推远了一格，DIB 必须加 1。<br/>
          2. <strong>查找时漏掉提前终止条件</strong>——若查找 DIB 已大于槽内 DIB，说明目标元素不可能在更远处，应立即返回 false。<br/>
          3. <strong>DIB 比较用 ≤ 而非 &lt;</strong>——相等时不该交换（否则死循环），应继续探测。
          </p>
        </aside>
      </section>

      <!-- 4. 更均匀分布 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          为什么更均匀？—— 最大探测距离 O(log n)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          普通线性探测的悲剧在于：<strong>先来的元素占着好位置，后来的元素被越挤越远</strong>，DIB 分布极度不均匀，
          最坏情况一个元素被挤到表的另一头。Robin Hood 通过「劫富济贫」，把探测距离<strong>重新分配</strong>——
          走得远的元素优先占坑，于是<strong>最大 DIB 从 O(n) 收敛到 O(log n)</strong>。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>DIB 分布对比（概念示意）：</strong></p>
          <div class="font-mono text-xs text-slate-600 space-y-2">
            <p class="text-red-600">线性探测（不均匀）: DIB = [0,0,0,1,2,3,4,5,6,7]  ← 最坏 O(n)</p>
            <p class="text-emerald-600">Robin Hood（均匀）: DIB = [0,1,0,1,1,0,1,1,0,1]  ← 最坏 O(log n)</p>
          </div>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 关键收益：</strong>均匀分布带来的是<strong>稳定的最坏情况</strong>。哈希表最怕的不是平均慢，而是偶发的极慢（长探测链）。Robin Hood 削掉了这条「长尾」，让 P99 延迟也接近 O(1)。</p>
        </aside>
      </section>

      <!-- 5. vs 线性探测 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          Robin Hood vs 普通线性探测
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold">普通线性探测</th><th class="px-4 py-2 border border-slate-200 font-semibold">Robin Hood</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-medium">插入策略</td><td class="px-4 py-2 border">新元素一直向后找空槽</td><td class="px-4 py-2 border">DIB 更大则交换</td></tr>
              <tr><td class="px-4 py-2 border font-medium">DIB 分布</td><td class="px-4 py-2 border text-red-600">极不均匀，有长尾</td><td class="px-4 py-2 border text-emerald-600">均匀，最大 DIB ≈ O(log n)</td></tr>
              <tr><td class="px-4 py-2 border font-medium">最坏查找</td><td class="px-4 py-2 border text-red-600">O(n)</td><td class="px-4 py-2 border text-emerald-600">O(log n)</td></tr>
              <tr><td class="px-4 py-2 border font-medium">缓存友好</td><td class="px-4 py-2 border text-emerald-600">好（连续探测）</td><td class="px-4 py-2 border text-emerald-600">好（仍连续探测）</td></tr>
              <tr><td class="px-4 py-2 border font-medium">额外开销</td><td class="px-4 py-2 border">无</td><td class="px-4 py-2 border">每槽多存一个 DIB（几 bit）</td></tr>
              <tr><td class="px-4 py-2 border font-medium">实现复杂度</td><td class="px-4 py-2 border text-emerald-600">简单</td><td class="px-4 py-2 border text-amber-600">中等（多一个交换判断）</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="codeVsLinear" title="robin_hood_advantage.ts" /></div>
      </section>

      <!-- 6. Swiss Table -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          性能优势与 Swiss Table
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Robin Hood 不只是理论玩具，它是<strong>现代高性能哈希表的基石</strong>。最著名的例子是 Google 的
          <strong>Swiss Table</strong>——它把 Robin Hood 的 DIB 思想 + <strong>SIMD 并行探测</strong>结合，
          一次 CPU 指令就能并行检查 16 个槽的元数据，是当前业界最快的哈希表实现之一。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>采用 Robin Hood / 类似思想的生产级实现：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Rust 标准库 HashMap</strong>——开放寻址 + Robin Hood</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>V8 引擎 OrderedHashMap</strong>（JS Map/Set 底层）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Google Swiss Table</strong>（C++ abseil::flat_hash_map）—— Robin Hood + SIMD</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Python dict</strong>——开放寻址 + 变体策略</span></li>
          </ul>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Swiss Table 的 SIMD 并行探测就像<strong>虚拟滚动 + 批量渲染</strong>——一次比较 16 个槽，而不是一个一个看。<br/>
          普通哈希表 = 逐个 <code>dom</code> 查询；Swiss Table = 用 <code>document.querySelectorAll</code> 一次拿到整批，再细看。<br/>
          引擎之所以偏爱开放寻址（而非链地址法），正是因为它<strong>缓存友好、内存紧凑、无指针跳转</strong>，配合 SIMD 能榨干 CPU。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：Robin Hood 插入（劫富济贫）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          观察插入时新元素探测 → 遇到 DIB 更小的元素 → <strong>交换</strong>（劫富济贫）→ 被挤走的元素 DIB+1 继续探测。哈希函数固定为 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">hash(v) = v % 10</code>。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 元素 n: {{ filledCount }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">📐 容量 m: {{ M }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ α = n/m = {{ loadFactor.toFixed(2) }}</span>
          <span class="bg-purple-50 text-purple-700 px-2 py-1 rounded-full">🏹 最大 DIB: {{ maxDib }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doInsert" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">插入</button>
          <button @mousedown="doSearch" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">查找</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-rect v-for="s in slots" :key="s.id" :config="slotCfg(s)" />
              <v-text v-for="s in slots" :key="'v'+s.id" :config="slotValCfg(s)" />
              <v-text v-for="s in slots" :key="'d'+s.id" :config="slotDibCfg(s)" />
              <v-text v-for="(s,i) in slots" :key="'i'+s.id" :config="slotIdxCfg(i)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Robin Hood = 劫富济贫</strong>：让 DIB（走得远的）元素优先占坑</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>DIB = (当前下标 − 初始哈希位置) mod m</strong>，衡量被挤了多远</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>插入时<strong>新 DIB &gt; 原 DIB 就交换</strong>，被挤走的元素 DIB+1 继续探测</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>结果：DIB 分布<strong>均匀</strong>，最大探测距离从 O(n) 降到 <strong>O(log n)</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>查找可<strong>提前终止</strong>：查找 DIB &gt; 槽内 DIB 时返回 false</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>是 Rust HashMap、V8 Map、Google Swiss Table 的底层思想</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-2-collision/dsa-3-2-2-open" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：开放寻址法</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-3-applications/dsa-3-3-1-two-sum" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：两数之和 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ===== 🎬 Robin Hood 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(170), W = ref(700)
const M = 10                    // 容量
const BOXH = 58, GAP = 8        // 槽高、槽间距
const BOXY = 56                 // 槽顶部

interface Slot { id: number; val: number | null; dib: number; color: string; s?: number; _x?: number; _w?: number }
const slots = reactive<Slot[]>([])
const busy = ref(false), status = ref(''), nid = ref(100)
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const hashOf = (v: number) => ((v % M) + M) % M
const filledCount = computed(() => slots.filter(s => s.val !== null).length)
const loadFactor = computed(() => filledCount.value / M)
const maxDib = computed(() => slots.reduce((mx, s) => (s.val !== null ? Math.max(mx, s.dib) : mx), 0))

function baseColor(s: Slot) {
  return s.val !== null ? C.cyan : C.ghost
}

function layout() {
  const bw = Math.min(58, Math.floor((W.value - 20) / M - GAP))
  const total = M * (bw + GAP) - GAP
  const sx = Math.max(10, (W.value - total) / 2)
  slots.forEach((s, i) => { s._x = sx + i * (bw + GAP); s._w = bw })
}

function rawInsert(val: number) {
  let dib = 0
  let cur = hashOf(val)
  for (let step = 0; step < M; step++) {
    const slot = slots[cur]
    if (slot.val === null) { slot.val = val; slot.dib = dib; slot.color = C.cyan; return }
    if (dib > slot.dib) {
      const dv = slot.val!
      const dd = slot.dib
      slot.val = val; slot.dib = dib
      val = dv; dib = dd + 1
    } else {
      dib++
    }
    cur = (cur + 1) % M
  }
}

function init() {
  slots.length = 0
  for (let i = 0; i < M; i++) slots.push({ id: nid.value++, val: null, dib: 0, color: C.ghost, s: 1 })
  ;[12, 22, 32, 5, 15].forEach(v => rawInsert(v))
  layout()
  status.value = ''
}

function resetColors() { slots.forEach(s => { s.color = baseColor(s); s.s = 1 }) }

function slotCfg(s: Slot) {
  const sc = s.s ?? 1
  const w = (s._w || 50) * sc
  const isEmpty = s.val === null
  const cfg: any = {
    x: (s._x || 0) + ((s._w || 50) - w) / 2, y: BOXY + (BOXH * (1 - sc)) / 2,
    width: w, height: BOXH * sc, fill: s.color, cornerRadius: 6,
    stroke: isEmpty ? '#94a3b8' : '#0891b2', strokeWidth: 1.5,
    shadowColor: isEmpty ? 'transparent' : 'rgba(0,0,0,.08)', shadowBlur: isEmpty ? 0 : 3,
  }
  if (isEmpty) { cfg.dash = [4, 3]; cfg.dashEnabled = true }
  return cfg
}

function slotValCfg(s: Slot) {
  return { x: s._x || 0, y: BOXY + 12, width: s._w || 50,
    text: s.val !== null ? String(s.val) : '', fontSize: 15,
    fontFamily: 'monospace', fontStyle: 'bold', fill: '#0f172a', align: 'center' }
}

function slotDibCfg(s: Slot) {
  return { x: s._x || 0, y: BOXY + 38, width: s._w || 50,
    text: s.val !== null ? 'dib:' + s.dib : '', fontSize: 10,
    fontFamily: 'monospace', fill: s.dib >= 2 ? '#d97706' : '#64748b', align: 'center' }
}

function slotIdxCfg(i: number) {
  const s = slots[i]
  return { x: s._x || 0, y: BOXY + BOXH + 8, width: s._w || 50,
    text: '[' + i + ']', fontSize: 10, fontFamily: 'monospace', fill: C.muted, align: 'center' }
}

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

function doInsert() {
  act('Robin Hood 插入', async () => {
    if (filledCount.value >= M) { status.value = '表满，无法插入'; return }
    let val = Math.floor(Math.random() * 90 + 10)
    let dib = 0
    let cur = hashOf(val)
    status.value = `插入 ${val}：home = ${cur}，DIB = 0`
    await d(300)
    for (let step = 0; step < M; step++) {
      const slot = slots[cur]
      slot.color = C.orange
      slot.s = 1.08
      await d(420)
      if (slot.val === null) {
        slot.val = val; slot.dib = dib; slot.color = C.green
        status.value = `写入空槽[${cur}]，DIB = ${dib}`
        await d(650)
        resetColors()
        return
      }
      if (dib > slot.dib) {
        const dv = slot.val!
        const dd = slot.dib
        status.value = `劫富济贫：${val}(DIB=${dib}) 挤走 ${dv}(DIB=${dd})`
        slot.val = val; slot.dib = dib; slot.color = C.green
        await d(650)
        slot.color = C.cyan
        val = dv
        dib = dd + 1
      } else {
        status.value = `槽[${cur}] 的 ${slot.val}(DIB=${slot.dib}) 更可怜，${val} 继续探测`
        slot.color = C.cyan
        slot.s = 1
        dib++
      }
      cur = (cur + 1) % M
    }
    status.value = '表满，插入失败'
    resetColors()
  })
}

function doSearch() {
  act('Robin Hood 查找', async () => {
    const v = Math.floor(Math.random() * 90 + 10)
    let dib = 0
    let cur = hashOf(v)
    status.value = `查找 ${v}：home = ${cur}`
    await d(300)
    for (let step = 0; step < M; step++) {
      const slot = slots[cur]
      slot.color = C.orange
      slot.s = 1.08
      await d(420)
      if (slot.val === null) {
        slot.color = C.red
        status.value = `遇空槽[${cur}]，${v} 不存在`
        await d(600)
        resetColors()
        return
      }
      if (slot.val === v) {
        slot.color = C.green
        status.value = `找到 ${v}！探测 ${step} 次`
        await d(600)
        resetColors()
        return
      }
      if (dib > slot.dib) {
        slot.color = C.red
        status.value = `查找 DIB(${dib}) > 槽内 DIB(${slot.dib})，提前终止，${v} 不存在`
        await d(600)
        resetColors()
        return
      }
      status.value = `比较槽[${cur}] 的 ${slot.val}(DIB=${slot.dib})`
      slot.color = C.cyan
      slot.s = 1
      dib++
      cur = (cur + 1) % M
    }
    status.value = '整表扫描，未找到'
    resetColors()
  })
}

function doReset() { busy.value = false; init() }

let ro: ResizeObserver | null = null
onMounted(() => {
  init()
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "Robin Hood 思想" },
  { id: "sec-2", name: "位移距离 DIB" },
  { id: "sec-3", name: "插入时交换" },
  { id: "sec-4", name: "更均匀分布" },
  { id: "sec-5", name: "vs 线性探测" },
  { id: "sec-6", name: "Swiss Table" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

const codeDIB = `// DIB = 元素从「家」被挤走多远
function distanceFromHome(hash: number, current: number, capacity: number): number {
  return (current - hash + capacity) % capacity
}

// 示例：capacity = 10，key = 22 → hash = 22 % 10 = 2
// 线性探测把 22 一路挤到槽 5 → DIB = (5 - 2) % 10 = 3
console.log(distanceFromHome(2, 5, 10))  // 3（走了 3 格，很可怜）

// Robin Hood 的目标：让所有元素的 DIB 尽量小且均匀
// 普通线性探测  DIB 分布: [0,0,0,1,2,3,4,5,6,7]  ← 长尾
// Robin Hood    DIB 分布: [0,1,0,1,1,0,1,1,0,1]  ← 均匀

// 为什么 DIB 重要？
// 查找一个元素的时间 ∝ 它的 DIB（要探测 DIB 次）
// 所以「最大 DIB」越小，最坏情况查找越快
// Robin Hood 把最大 DIB 从 O(n) 压到 O(log n)`

const codeRobinHood = `// Robin Hood 哈希表：劫富济贫
interface Entry { key: number; dib: number }

class RobinHoodHashTable {
  private slots: Array<Entry | null>

  constructor(private capacity: number = 16) {
    this.slots = new Array(capacity).fill(null)
  }

  private hash(key: number): number {
    return ((key % this.capacity) + this.capacity) % this.capacity
  }

  insert(key: number): void {
    let dib = 0
    let cur = this.hash(key)
    for (let step = 0; step < this.capacity; step++) {
      const slot = this.slots[cur]
      if (slot === null) {                      // 空槽 → 写入
        this.slots[cur] = { key, dib }
        return
      }
      if (slot.key === key) return              // 已存在
      if (dib > slot.dib) {                     // 🔥 劫富济贫
        const displaced = slot                  // 保存被挤走的元素
        this.slots[cur] = { key, dib }          // 新元素占坑
        key = displaced.key                     // 被挤走的继续找家
        dib = displaced.dib + 1                 // 它的 DIB 加 1
      } else {
        dib++                                   // 没资格抢，继续走
      }
      cur = (cur + 1) % this.capacity
    }
    throw new Error('表已满')
  }

  search(key: number): boolean {
    let dib = 0
    let cur = this.hash(key)
    for (let step = 0; step < this.capacity; step++) {
      const slot = this.slots[cur]
      if (slot === null) return false           // 遇空槽 → 不存在
      if (slot.key === key) return true
      if (dib > slot.dib) return false          // 🔥 提前终止
      dib++
      cur = (cur + 1) % this.capacity
    }
    return false
  }
}

// 关键细节：
// 1. 交换时被挤走的元素 DIB 必须 +1（它被推远了一格）
// 2. 查找时「dib > slot.dib」可提前终止——目标不可能在更远处
// 3. 比较用 > 而非 >=，相等时不交换，避免死循环`

const codeVsLinear = `// ─── 为什么 Robin Hood 更快、更稳？───
// 普通线性探测：先来的占好位置，后来的被越挤越远
// 插入 10 个都哈希到桶 0 的元素：
//   [0]:k1  [1]:k2  [2]:k3  ...  [9]:k10
//   DIB:     0      1      2    ...      9   ← 最坏 O(n)！
//   查找 k10 要探测 10 次，且每次都缓存未命中

// Robin Hood：走得远的元素优先占坑，DIB 被摊平
//   DIB 最大值收敛到约 O(log n)，查找次数稳定
//   查找 k10 只需约 log(10) ≈ 3~4 次

// ─── 生产级应用 ───
// 1. Rust std::collections::HashMap —— Robin Hood 开放寻址
// 2. V8 的 OrderedHashMap（Map/Set 底层）—— 开放寻址变体
// 3. Google Swiss Table（abseil::flat_hash_map）
//    —— Robin Hood 元数据 + SIMD 一次并行探测 16 个槽
//    —— 当前业界最快的通用哈希表之一

// ─── 一句话总结 ───
// Robin Hood 用「每槽多存几个 bit 的 DIB」这个微小代价，
// 换来了「最坏情况从 O(n) 降到 O(log n)」的巨大收益。
// 这正是现代引擎放弃链地址法、拥抱开放寻址变体的根本原因`
</script>
