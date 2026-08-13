<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔍 布隆过滤器（Bloom Filter）</h1>
          <p class="text-sm text-slate-500 mt-1">用几位比特，换「一定不存在」的快速判定——空间换时间的极致</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 3-3-4</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：位数组 + k 个哈希函数
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          布隆过滤器用一个长度为 <strong>m</strong> 的位数组（全是 0）加 <strong>k</strong> 个独立的哈希函数。
          插入一个 key 时，k 个哈希函数各自算出 key 对应的位，把那些位<strong>置 1</strong>；
          查询时看这 k 个位是否<strong>全为 1</strong>——全为 1 说明「可能存在」，只要有一个是 0，就「一定不存在」。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 640 230" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="bf-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- key -->
            <rect x="290" y="14" width="60" height="32" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="320" y="30" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">apple</text>

            <!-- 3 个哈希函数 -->
            <line x1="300" y1="46" x2="136" y2="82" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#bf-arr)" />
            <line x1="320" y1="46" x2="320" y2="82" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#bf-arr)" />
            <line x1="340" y1="46" x2="504" y2="82" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#bf-arr)" />

            <rect x="106" y="86" width="60" height="28" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="136" y="100" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">h1(x)</text>
            <rect x="290" y="86" width="60" height="28" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="320" y="100" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">h2(x)</text>
            <rect x="474" y="86" width="60" height="28" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="504" y="100" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">h3(x)</text>

            <!-- 箭头指向位 -->
            <line x1="136" y1="114" x2="136" y2="150" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#bf-arr)" />
            <line x1="320" y1="114" x2="320" y2="150" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#bf-arr)" />
            <line x1="504" y1="114" x2="504" y2="150" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#bf-arr)" />

            <!-- 位数组（12 位示例，第 2/6/10 位为 1） -->
            <g font-family="monospace" font-weight="bold" font-size="14">
              <!-- 0 -->
              <rect x="24" y="152" width="40" height="40" rx="5" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
              <text x="44" y="172" text-anchor="middle" dominant-baseline="central" fill="#64748b">0</text>
              <!-- 1 -->
              <rect x="70" y="152" width="40" height="40" rx="5" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
              <text x="90" y="172" text-anchor="middle" dominant-baseline="central" fill="#64748b">0</text>
              <!-- 2 (h1) -->
              <rect x="116" y="152" width="40" height="40" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="136" y="172" text-anchor="middle" dominant-baseline="central" fill="#ffffff">1</text>
              <!-- 3 -->
              <rect x="162" y="152" width="40" height="40" rx="5" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
              <text x="182" y="172" text-anchor="middle" dominant-baseline="central" fill="#64748b">0</text>
              <!-- 4 -->
              <rect x="208" y="152" width="40" height="40" rx="5" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
              <text x="228" y="172" text-anchor="middle" dominant-baseline="central" fill="#64748b">0</text>
              <!-- 5 -->
              <rect x="254" y="152" width="40" height="40" rx="5" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
              <text x="274" y="172" text-anchor="middle" dominant-baseline="central" fill="#64748b">0</text>
              <!-- 6 (h2) -->
              <rect x="300" y="152" width="40" height="40" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="320" y="172" text-anchor="middle" dominant-baseline="central" fill="#ffffff">1</text>
              <!-- 7 -->
              <rect x="346" y="152" width="40" height="40" rx="5" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
              <text x="366" y="172" text-anchor="middle" dominant-baseline="central" fill="#64748b">0</text>
              <!-- 8 -->
              <rect x="392" y="152" width="40" height="40" rx="5" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
              <text x="412" y="172" text-anchor="middle" dominant-baseline="central" fill="#64748b">0</text>
              <!-- 9 -->
              <rect x="438" y="152" width="40" height="40" rx="5" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
              <text x="458" y="172" text-anchor="middle" dominant-baseline="central" fill="#64748b">0</text>
              <!-- 10 (h3) -->
              <rect x="484" y="152" width="40" height="40" rx="5" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="504" y="172" text-anchor="middle" dominant-baseline="central" fill="#ffffff">1</text>
              <!-- 11 -->
              <rect x="530" y="152" width="40" height="40" rx="5" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
              <text x="550" y="172" text-anchor="middle" dominant-baseline="central" fill="#64748b">0</text>
            </g>
            <text x="24" y="210" font-size="11" font-family="monospace" fill="#64748b">插入 "apple" → h1/h2/h3 算出位 2、6、10 → 置 1</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：布隆过滤器结构 —— 一个 key 经 k 个哈希函数散列到 m 位数组中的 k 个位</figcaption>
        </figure>

        <!-- 查询示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">查询：两种情况 —— 「可能存在」 vs 「一定不存在」</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">查询 "apple"：3 个位全为 1 → 可能存在</p>
            <svg viewBox="0 0 340 90" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <g font-family="monospace" font-weight="bold" font-size="13">
                <rect x="20" y="20" width="22" height="34" rx="4" fill="#f1f5f9" stroke="#cbd5e1" /><text x="31" y="37" text-anchor="middle" fill="#64748b">0</text>
                <rect x="48" y="20" width="22" height="34" rx="4" fill="#f1f5f9" stroke="#cbd5e1" /><text x="59" y="37" text-anchor="middle" fill="#64748b">0</text>
                <rect x="76" y="20" width="22" height="34" rx="4" fill="#f59e0b" stroke="#d97706" /><text x="87" y="37" text-anchor="middle" fill="#ffffff">1</text>
                <rect x="104" y="20" width="22" height="34" rx="4" fill="#f1f5f9" stroke="#cbd5e1" /><text x="115" y="37" text-anchor="middle" fill="#64748b">0</text>
                <rect x="132" y="20" width="22" height="34" rx="4" fill="#f1f5f9" stroke="#cbd5e1" /><text x="143" y="37" text-anchor="middle" fill="#64748b">0</text>
                <rect x="160" y="20" width="22" height="34" rx="4" fill="#f1f5f9" stroke="#cbd5e1" /><text x="171" y="37" text-anchor="middle" fill="#64748b">0</text>
                <rect x="188" y="20" width="22" height="34" rx="4" fill="#f59e0b" stroke="#d97706" /><text x="199" y="37" text-anchor="middle" fill="#ffffff">1</text>
                <rect x="216" y="20" width="22" height="34" rx="4" fill="#f1f5f9" stroke="#cbd5e1" /><text x="227" y="37" text-anchor="middle" fill="#64748b">0</text>
                <rect x="244" y="20" width="22" height="34" rx="4" fill="#f1f5f9" stroke="#cbd5e1" /><text x="255" y="37" text-anchor="middle" fill="#64748b">0</text>
                <rect x="272" y="20" width="22" height="34" rx="4" fill="#f1f5f9" stroke="#cbd5e1" /><text x="283" y="37" text-anchor="middle" fill="#64748b">0</text>
                <rect x="300" y="20" width="22" height="34" rx="4" fill="#f59e0b" stroke="#d97706" /><text x="311" y="37" text-anchor="middle" fill="#ffffff">1</text>
              </g>
              <text x="20" y="76" font-size="11" font-family="monospace" fill="#16a34a">k 个位全是 1 → 可能存在 ✓</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">查询 "grape"：有一个位为 0 → 一定不存在</p>
            <svg viewBox="0 0 340 90" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <g font-family="monospace" font-weight="bold" font-size="13">
                <rect x="20" y="20" width="22" height="34" rx="4" fill="#f1f5f9" stroke="#cbd5e1" /><text x="31" y="37" text-anchor="middle" fill="#64748b">0</text>
                <rect x="48" y="20" width="22" height="34" rx="4" fill="#f59e0b" stroke="#d97706" /><text x="59" y="37" text-anchor="middle" fill="#ffffff">1</text>
                <rect x="76" y="20" width="22" height="34" rx="4" fill="#f1f5f9" stroke="#cbd5e1" /><text x="87" y="37" text-anchor="middle" fill="#64748b">0</text>
                <rect x="104" y="20" width="22" height="34" rx="4" fill="#f1f5f9" stroke="#cbd5e1" /><text x="115" y="37" text-anchor="middle" fill="#64748b">0</text>
                <rect x="132" y="20" width="22" height="34" rx="4" fill="#ef4444" stroke="#dc2626" /><text x="143" y="37" text-anchor="middle" fill="#ffffff">0</text>
                <rect x="160" y="20" width="22" height="34" rx="4" fill="#f1f5f9" stroke="#cbd5e1" /><text x="171" y="37" text-anchor="middle" fill="#64748b">0</text>
                <rect x="188" y="20" width="22" height="34" rx="4" fill="#f59e0b" stroke="#d97706" /><text x="199" y="37" text-anchor="middle" fill="#ffffff">1</text>
                <rect x="216" y="20" width="22" height="34" rx="4" fill="#f1f5f9" stroke="#cbd5e1" /><text x="227" y="37" text-anchor="middle" fill="#64748b">0</text>
                <rect x="244" y="20" width="22" height="34" rx="4" fill="#f1f5f9" stroke="#cbd5e1" /><text x="255" y="37" text-anchor="middle" fill="#64748b">0</text>
                <rect x="272" y="20" width="22" height="34" rx="4" fill="#f1f5f9" stroke="#cbd5e1" /><text x="283" y="37" text-anchor="middle" fill="#64748b">0</text>
                <rect x="300" y="20" width="22" height="34" rx="4" fill="#f1f5f9" stroke="#cbd5e1" /><text x="311" y="37" text-anchor="middle" fill="#64748b">0</text>
              </g>
              <text x="20" y="76" font-size="11" font-family="monospace" fill="#dc2626">有一个位为 0 → 一定不存在 ✗</text>
            </svg>
          </figure>
        </div>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          概率型数据结构 —— 允许误判，但不漏判
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          布隆过滤器是<strong>概率型数据结构（Probabilistic Data Structure）</strong>。它牺牲掉一部分精确性，
          换来了<strong>极小的内存占用</strong>和<strong>O(k) 的查询速度</strong>（k 是哈希函数个数，通常是常数）。
          它只回答两个答案之一：
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1 font-bold">✓</span><span><strong>「一定不存在」</strong> —— 100% 准确，绝无漏判（无假阴性）</span></li>
            <li class="flex items-start gap-2"><span class="text-amber-500 mt-1 font-bold">?</span><span><strong>「可能存在」</strong> —— 可能误判，有假阳性（false positive）</span></li>
          </ul>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          因为位会被多个 key 共享置 1，一个从未插入过的 key，它的 k 个位可能恰好都被别的 key 置成了 1，
          于是被误判为「可能存在」。但只要有一个位是 0，就能<strong>铁定</strong>判断「一定不存在」——这就是它最有价值的特性。
        </p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          布隆过滤器就像<strong>浏览器缓存控制里的 ETag / 内容哈希</strong>——用很小的「指纹」判断内容有没有变。
          又像<strong>拼写检查器</strong>：一个词如果不在词典的哈希集合里，直接标红；如果在，也只是「可能拼对」，仍可能有误报。<br/>
          核心哲学：<strong>用一点点误判，换取一个绝对可靠的「否」</strong>。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          插入 —— 把 k 个位翻成 1
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          插入一个元素，就是跑 k 个哈希函数，得到 k 个位下标，把它们<strong>全部置 1</strong>。
          位只会从 0 变 1，<strong>永远不会变回 0</strong>（这也是布隆过滤器不支持删除的原因——见「常见陷阱」）。
        </p>
        <div class="mb-4"><Code language="ts" :code="bloomBasicsCode" title="bloom_filter.ts" /></div>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <p class="text-sm text-slate-700 mb-2"><strong>插入执行流程：</strong></p>
          <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
            <li>拿到 key，跑 <code>h1(key)</code> → 位下标 p1</li>
            <li>跑 <code>h2(key)</code> → 位下标 p2，…… 直到 <code>hk(key)</code> → pk</li>
            <li>把 bits[p1]、bits[p2] ... bits[pk] 全部置 1</li>
          </ol>
        </div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          查询 —— k 个位全为 1 才「可能存在」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          查询也是跑同样的 k 个哈希函数，然后检查对应的 k 个位：
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <ol class="space-y-2 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span>任意一个位是 <strong>0</strong> → 返回 <code>false</code>，<strong>一定不存在</strong>（绝对正确）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span>k 个位<strong>全为 1</strong> → 返回 <code>true</code>，<strong>可能存在</strong>（有假阳性）</span></li>
          </ol>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          为什么「全为 1」只能是「可能」？因为这些位可能是被<strong>其它不同的 key</strong>共同置 1 的。
          例如 key A 置了位 {2, 6, 10}，key B 置了位 {3, 6, 11}，那么一个从未插入的 key C 若散列到 {2, 6, 11}，
          三个位全是 1，就会被误判为存在。这就是<strong>假阳性</strong>的来源。
        </p>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>布隆过滤器<strong>只会多报（假阳性），不会漏报（假阴性）</strong>。
          如果它说「不存在」，那这个 key 一定没插入过。这一条「可靠的否」在很多场景下价值千金。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          假阳性率与参数选择 —— m、k 怎么定
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          假阳性率由三个参数决定：<strong>m</strong>（位数组长度）、<strong>k</strong>（哈希函数个数）、<strong>n</strong>（预计插入的元素个数）。
          假设哈希函数均匀分布，插入 n 个元素后，某一位仍是 0 的概率是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">(1 - 1/m)^(kn)</code>，
          于是假阳性率约等于：
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">p ≈ (1 - e^(-kn/m))^k</p>
          <p class="text-xs text-cyan-600 text-center">最优哈希函数个数 k = (m/n) · ln2 ≈ 0.693 · m/n</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="falsePositiveCode" title="false_positive_rate.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">参数</th><th class="px-4 py-2 border border-slate-200 font-semibold">调大</th><th class="px-4 py-2 border border-slate-200 font-semibold">调小</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">m（位数）</td><td class="px-4 py-2 border text-emerald-600">假阳性率↓，内存↑</td><td class="px-4 py-2 border text-amber-600">假阳性率↑，内存↓</td></tr>
              <tr><td class="px-4 py-2 border font-mono">k（哈希数）</td><td class="px-4 py-2 border text-amber-600">过高→位更快填满，假阳性↑</td><td class="px-4 py-2 border text-amber-600">过低→区分度不足，假阳性↑</td></tr>
              <tr><td class="px-4 py-2 border font-mono">n（元素数）</td><td class="px-4 py-2 border text-amber-600">固定 m 下假阳性↑</td><td class="px-4 py-2 border text-emerald-600">假阳性↓</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>先估算 n，再定一个可接受的假阳性率 p（如 1%），
          由 <code>m = -n·ln p / (ln2)²</code> 反推位数组大小，<code>k = (m/n)·ln2</code>。常用组合：10 亿元素 + 1% 误判 ≈ 1.2 GB 位数组 + 7 个哈希。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          空间优势与缓存穿透防护 —— 布隆过滤器的杀手锏
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>空间优势：</strong>布隆过滤器只存「位」，不存元素本身。存 100 万个字符串，HashSet 要几十 MB（每个字符串对象开销巨大），
          而布隆过滤器只需约 1.2 MB 位数组就能达到 1% 误判率。<strong>内存相差 10~100 倍</strong>，且查询是 O(k)（常数时间）。
        </p>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>缓存穿透防护：</strong>这是布隆过滤器最经典的应用。缓存穿透指攻击者用大量<strong>不存在的 key</strong>请求，
          每个都穿透缓存直达数据库，把 DB 打挂。布隆过滤器在缓存前面挡一道：<strong>不存在的 key 直接被拦截</strong>，根本到不了数据库。
        </p>
        <div class="mb-4"><Code language="ts" :code="cacheCode" title="cache_penetration.ts" /></div>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>垃圾邮件过滤</strong>——Gmail 用布隆过滤器快速判定「是不是已知的垃圾特征」</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>数据库存储引擎</strong>——LevelDB/RocksDB 的 SSTable 用布隆过滤器避免无谓的磁盘查找</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Web 爬虫去重</strong>——判断 URL 是否已抓取，用极小内存跟踪几十亿 URL</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>推荐系统</strong>——快速排除「用户已经看过的内容」</span></li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          缓存穿透防护就像<strong>前端表单的本地校验</strong>——在发请求前先用极低成本把「明显无效」的输入挡掉，
          只有「可能有效」的请求才真正打到后端。布隆过滤器就是那层「廉价的第一道防线」。</p>
        </aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          常见陷阱 —— 布隆过滤器的坑与避坑指南
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 1：不能删除元素。</strong><br/>
          位一旦被置 1 就不知道是哪个 key 置的，删一个 key 如果把它占的位清零，可能误伤别的 key。
          要支持删除，得用<strong>计数布隆过滤器（Counting Bloom Filter）</strong>——每个位改成计数器，删的时候减一。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 2：低估元素规模 n。</strong><br/>
          如果实际插入的元素远超预估值，位数组被迅速填满，假阳性率飙升。建布隆过滤器前务必<strong>准确估算 n</strong>，
          或预留安全余量（n 按 2 倍估）。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 3：把「可能存在」当「一定存在」。</strong><br/>
          布隆过滤器返回 <code>true</code> 不代表 key 真的在，必须<strong>再查一次权威数据源兜底</strong>（缓存/数据库）。
          它只是帮你在「一定不存在」时省掉这次查询。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>用成熟哈希（MurmurHash3 / FNV / 双哈希派生 k 个），
          位数组用 Redis 的 bitmap 或 Guava 的 BloomFilter 实现；元素数动态增长的场景，用<strong>可伸缩布隆过滤器（Scalable Bloom Filter）</strong>，
          超过阈值就叠加一个新的、更大的布隆过滤器。</p>
        </aside>
      </section>

      <!-- 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：插入与查询
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          输入一个词点「插入」，看它被 k=3 个哈希函数散列到 3 个位并翻成 1；点「查询」看它是否存在（注意假阳性可能）。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 位数组 m: {{ M }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔢 哈希 k: {{ K }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔢 已置位: {{ popcount }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <!-- 控制按钮 -->
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <input v-model="word" type="text"
            class="px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-shadow w-40" placeholder="输入 key（如 apple）" />
          <button @mousedown="doInsert" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:border-green-300 hover:shadow-sm">➕ 插入</button>
          <button @mousedown="doQuery" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm">🔍 查询</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <!-- Canvas -->
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-rect v-for="b in bits" :key="b.id" :config="bitCfg(b)" />
              <v-text v-for="b in bits" :key="'v'+b.id" :config="bitText(b)" />
              <v-text v-for="(b,i) in bits" :key="'i'+b.id" :config="idxCfg(i)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>布隆过滤器 = 位数组(m) + k 个哈希函数</strong>，是概率型数据结构</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>插入</strong>：k 个位翻成 1；<strong>查询</strong>：k 个位全为 1 才「可能存在」</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>无假阴性</strong>：说「一定不存在」就 100% 正确；有假阳性：说「可能存在」可能是误判</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>空间换时间</strong>：比 HashSet 省 10~100 倍内存，查询 O(k) 常数时间</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>参数选择</strong>：p ≈ (1 - e^(-kn/m))^k，最优 k = (m/n)·ln2</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>典型应用</strong>：缓存穿透防护、垃圾邮件过滤、LSM 存储、爬虫去重</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-3-applications/dsa-3-3-3-consistent" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：一致性哈希</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-1-binary-tree/dsa-4-1-1-traversal" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：二叉树遍历 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ===== 🎬 布隆过滤器动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(240), W = ref(700)
const M = 20, K = 3
const SALTS = [17, 31, 47]
const BY = 80, BH = 44, GAP = 6
const cw = ref(30)

interface Bit { id:number; val:0|1; hl?:string; _x:number }
const bits = reactive<Bit[]>([])
const busy = ref(false), status = ref(''), word = ref('apple')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const popcount = computed(() => bits.filter(b => b.val === 1).length)

function h(word:string, salt:number): number {
  let x = salt
  for (let i = 0; i < word.length; i++) x = (x * 31 + word.charCodeAt(i)) >>> 0
  return x % M
}
function positions(w:string): number[] {
  return SALTS.map(s => h(w, s))
}
function layout() {
  cw.value = Math.min(34, Math.floor((W.value - 20) / M - GAP))
  const total = M * (cw.value + GAP) - GAP
  const sx = Math.max(10, (W.value - total) / 2)
  bits.forEach((b, i) => { b._x = sx + i * (cw.value + GAP) })
}
function bitCfg(b:any) {
  const fill = b.hl ?? (b.val ? C.cyan : '#f1f5f9')
  return { x:b._x, y:BY, width:cw.value, height:BH, cornerRadius:6,
    fill, stroke:'#94a3b8', strokeWidth:1.5,
    shadowColor:'rgba(0,0,0,.08)', shadowBlur:4, shadowOffsetY:2 }
}
function bitText(b:any) {
  return { x:b._x, y:BY, width:cw.value, height:BH, text:String(b.val), fontSize:15, fontFamily:'monospace', fontStyle:'bold',
    fill: b.hl ? '#ffffff' : (b.val ? '#ffffff' : C.muted), align:'center', verticalAlign:'middle' }
}
function idxCfg(i:number) {
  return { x:(bits[i] as any)?._x || 0, y: BY + BH + 6, width: cw.value, text: String(i), fontSize: 9, fontFamily:'monospace', fill: C.muted, align:'center' }
}

function init() {
  bits.length = 0
  for (let i = 0; i < M; i++) bits.push({ id:i, val:0, _x:0 })
  // 预插入两个示例词，方便演示「可能存在」
  for (const w of ['apple', 'banana']) positions(w).forEach(p => { bits[p].val = 1 })
  layout()
}

async function act(msg:string, fn:() => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

function doInsert() {
  const w = word.value.trim()
  if (!w) return
  act(`插入 "${w}"  O(k)`, async () => {
    const pos = positions(w)
    for (const p of pos) {
      bits[p].hl = C.green; await d(200)
      bits[p].val = 1; await d(150)
      bits[p].hl = undefined
    }
    status.value = `已插入 "${w}"：位 ${pos.join(', ')} 置 1`
    await d(600)
  })
}
function doQuery() {
  const w = word.value.trim()
  if (!w) return
  act(`查询 "${w}"  O(k)`, async () => {
    const pos = positions(w)
    let miss = -1
    for (const p of pos) {
      bits[p].hl = C.orange; await d(220)
      if (bits[p].val === 0 && miss < 0) { miss = p; bits[p].hl = C.red }
    }
    if (miss >= 0) status.value = `"${w}" 一定不存在（位 ${miss} 为 0）`
    else status.value = `"${w}" 可能存在（k 位全为 1，注意假阳性）`
    await d(1400)
    pos.forEach(p => { bits[p].hl = undefined })
  })
}
function doReset() { init(); status.value = '' }

let ro: ResizeObserver|null = null
onMounted(() => {
  init()
  if (box.value) { W.value = box.value.clientWidth; layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== navList =====
const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "概率型数据结构" },
  { id: "sec-2", name: "插入" },
  { id: "sec-3", name: "查询与假阳性" },
  { id: "sec-4", name: "参数选择" },
  { id: "sec-5", name: "空间优势与缓存穿透" },
  { id: "sec-6", name: "常见陷阱" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

const bloomBasicsCode = `// ─── 布隆过滤器核心：位数组 + k 个哈希函数 ───

class BloomFilter {
    private bits: Uint8Array
    private m: number   // 位数组长度
    private k: number   // 哈希函数个数
    private salts: number[]

    constructor(m: number, k: number) {
        this.m = m
        this.k = k
        this.bits = new Uint8Array(m)  // 全部初始为 0
        // 用 k 个不同的盐值派生出 k 个「不同」的哈希函数
        this.salts = Array.from({ length: k }, (_, i) => i * 31 + 17)
    }

    // 第 j 个哈希函数：把字符串散列到 [0, m)
    private hash(key: string, j: number): number {
        let h = this.salts[j]
        for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
        return h % this.m
    }

    // 插入：把 k 个位全部置 1
    add(key: string): void {
        for (let j = 0; j < this.k; j++) {
            this.bits[this.hash(key, j)] = 1
        }
    }

    // 查询：k 个位全为 1 → 可能存在；任一为 0 → 一定不存在
    maybeContains(key: string): boolean {
        for (let j = 0; j < this.k; j++) {
            if (this.bits[this.hash(key, j)] === 0) return false
        }
        return true
    }
}

const bf = new BloomFilter(1000, 3)
bf.add('apple')
bf.add('banana')

console.log(bf.maybeContains('apple'))  // true  （可能存在）
console.log(bf.maybeContains('grape'))  // false （一定不存在）
// 注意：maybeContains 返回 true 不保证一定在，只是「可能」`

const falsePositiveCode = `// ─── 假阳性率与参数选择 ───
// n 个元素插入后，某一位仍为 0 的概率 = (1 - 1/m)^(kn) ≈ e^(-kn/m)
// 假阳性率 p = (1 - (1 - 1/m)^(kn))^k ≈ (1 - e^(-kn/m))^k
// 最优哈希函数个数 k = (m/n) * ln2 ≈ 0.693 * m/n

function falsePositiveRate(m: number, k: number, n: number): number {
    return Math.pow(1 - Math.exp(-k * n / m), k)
}

function optimalK(m: number, n: number): number {
    return Math.round((m / n) * Math.LN2)
}

// ─── 反推位数组大小 ───
// 给定 n 和目标假阳性率 p，m = -n * ln(p) / (ln2)^2
function bitSizeFor(n: number, p: number): number {
    return Math.ceil(-n * Math.log(p) / (Math.LN2 ** 2))
}

// 场景：预计 100 万个元素，假阳性率控制在 1%
const n = 1_000_000
const m = bitSizeFor(n, 0.01)
const k = optimalK(m, n)

console.log('m =', m, '位 ≈', (m / 8 / 1024 / 1024).toFixed(2), 'MB')
console.log('k =', k)
console.log('实际假阳性率 =', falsePositiveRate(m, k, n).toFixed(4))
// 输出（近似）:
// m = 9585059 位 ≈ 1.14 MB
// k = 7
// 实际假阳性率 = 0.0082

// 对比：存 100 万字符串的 HashSet 至少几十 MB，差 10~100 倍`

const cacheCode = `// ─── 缓存穿透防护：布隆过滤器挡住不存在的 key ───
// 攻击者用海量随机不存在的 id 请求，若每个都打到数据库，DB 会挂

class CacheWithBloom {
    private bf: BloomFilter
    private cache = new Map<string, string>()

    constructor() {
        // 按 1000 万元素、1% 误判率预分配位数组
        this.bf = new BloomFilter(10_000_000, 7)
    }

    get(key: string): string | null {
        // 第一道防线：布隆过滤器说「一定不存在」→ 直接拦截
        if (!this.bf.maybeContains(key)) {
            return null  // 绝不打数据库
        }
        // 第二道防线：查缓存
        const hit = this.cache.get(key)
        if (hit) return hit
        // 第三道防线：布隆误判或缓存未命中，查库兜底
        const val = queryDatabase(key)
        if (val) this.cache.set(key, val)
        return val
    }

    add(key: string, value: string): void {
        this.bf.add(key)
        this.cache.set(key, value)
    }
}

function queryDatabase(key: string): string | null {
    // 只有「可能存在」的 key 才会走到这里，数据库压力骤减
    return null
}

// 布隆过滤器用几 MB 内存挡住绝大多数无效请求
// 即使有假阳性（误判为可能存在），最多也就是多查一次库，不会漏判
// BloomFilter 类的实现见上一段代码`

// 供 cacheCode 引用的 BloomFilter 定义（此处复用）
class BloomFilter {
    private bits: Uint8Array
    private m: number
    private k: number
    private salts: number[]
    constructor(m: number, k: number) {
        this.m = m; this.k = k
        this.bits = new Uint8Array(m)
        this.salts = Array.from({ length: k }, (_, i) => i * 31 + 17)
    }
    private hash(key: string, j: number): number {
        let h = this.salts[j]
        for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0
        return h % this.m
    }
    add(key: string): void { for (let j = 0; j < this.k; j++) this.bits[this.hash(key, j)] = 1 }
    maybeContains(key: string): boolean {
        for (let j = 0; j < this.k; j++) if (this.bits[this.hash(key, j)] === 0) return false
        return true
    }
}
</script>
