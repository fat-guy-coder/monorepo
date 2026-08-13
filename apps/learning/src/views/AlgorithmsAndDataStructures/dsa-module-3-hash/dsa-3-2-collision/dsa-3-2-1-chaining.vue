<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔗 链地址法（Chaining）：冲突元素挂进链表</h1>
          <p class="text-sm text-slate-500 mt-1">桶数组 + 每个桶一条链表——哈希冲突最直观的解决方式</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 3-2-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：链地址法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          链地址法不把冲突元素挤到别处，而是<strong>让每个桶挂一条链表</strong>：所有哈希到同一个桶的元素，按顺序追加到该桶的链表尾部。
          桶本身是一格数组槽，链表节点才是真正存放键值对的地方。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ch-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">桶数组（下标 0..4）+ 每个桶挂一条链表，冲突元素追加到链尾</text>

            <!-- 桶 0 -->
            <rect x="30" y="42" width="90" height="44" rx="6" fill="#e2e8f0" stroke="#0891b2" stroke-width="1.5" />
            <text x="75" y="64" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0891b2">[0]</text>
            <!-- 桶 1 -->
            <rect x="170" y="42" width="90" height="44" rx="6" fill="#e2e8f0" stroke="#0891b2" stroke-width="1.5" />
            <text x="215" y="64" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0891b2">[1]</text>
            <!-- 桶 2 -->
            <rect x="310" y="42" width="90" height="44" rx="6" fill="#e2e8f0" stroke="#0891b2" stroke-width="1.5" />
            <text x="355" y="64" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0891b2">[2]</text>
            <!-- 桶 3 -->
            <rect x="450" y="42" width="90" height="44" rx="6" fill="#e2e8f0" stroke="#0891b2" stroke-width="1.5" />
            <text x="495" y="64" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0891b2">[3]</text>
            <!-- 桶 4 -->
            <rect x="590" y="42" width="90" height="44" rx="6" fill="#e2e8f0" stroke="#0891b2" stroke-width="1.5" />
            <text x="635" y="64" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0891b2">[4]</text>

            <!-- 桶 0 → 10 -->
            <line x1="75" y1="86" x2="75" y2="104" stroke="#94a3b8" stroke-width="2" marker-end="url(#ch-arr)" />
            <rect x="30" y="106" width="90" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="75" y="123" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">10</text>

            <!-- 桶 1 → 21 → 16 -->
            <line x1="215" y1="86" x2="215" y2="104" stroke="#94a3b8" stroke-width="2" marker-end="url(#ch-arr)" />
            <rect x="170" y="106" width="90" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="215" y="123" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">21</text>
            <line x1="215" y1="140" x2="215" y2="158" stroke="#94a3b8" stroke-width="2" marker-end="url(#ch-arr)" />
            <rect x="170" y="160" width="90" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="215" y="177" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">16</text>

            <!-- 桶 2 → 7 -->
            <line x1="355" y1="86" x2="355" y2="104" stroke="#94a3b8" stroke-width="2" marker-end="url(#ch-arr)" />
            <rect x="310" y="106" width="90" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="355" y="123" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>

            <!-- 桶 3 → 13 → 28 -->
            <line x1="495" y1="86" x2="495" y2="104" stroke="#94a3b8" stroke-width="2" marker-end="url(#ch-arr)" />
            <rect x="450" y="106" width="90" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="495" y="123" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">13</text>
            <line x1="495" y1="140" x2="495" y2="158" stroke="#94a3b8" stroke-width="2" marker-end="url(#ch-arr)" />
            <rect x="450" y="160" width="90" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="495" y="177" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">28</text>

            <!-- 桶 4 → 24 -->
            <line x1="635" y1="86" x2="635" y2="104" stroke="#94a3b8" stroke-width="2" marker-end="url(#ch-arr)" />
            <rect x="590" y="106" width="90" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="635" y="123" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">24</text>

            <text x="16" y="232" font-size="11" font-family="monospace" fill="#0891b2">10%5=0 · 21%5=1 · 16%5=1(冲突) · 7%5=2 · 13%5=3 · 28%5=3(冲突) · 24%5=4</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：链地址法结构——5 个桶，桶[1] 和桶[3] 各发生了 1 次冲突，冲突元素追加到链尾</figcaption>
        </figure>

        <!-- 操作示意图：插入 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：插入 16 到桶[1] —— 追加到链表尾部</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">插入前（桶[1] 只有 21）</p>
            <svg viewBox="0 0 300 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ch-ins1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <rect x="30" y="20" width="80" height="40" rx="6" fill="#e2e8f0" stroke="#0891b2" stroke-width="1.5" />
              <text x="70" y="40" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0891b2">[1]</text>
              <line x1="70" y1="60" x2="70" y2="76" stroke="#94a3b8" stroke-width="2" marker-end="url(#ch-ins1)" />
              <rect x="30" y="78" width="80" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="70" y="95" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">21</text>
              <text x="70" y="126" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">链尾 = 21</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">插入后（16 追加到链尾，绿色）</p>
            <svg viewBox="0 0 300 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ch-ins2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
              </defs>
              <rect x="30" y="20" width="80" height="40" rx="6" fill="#e2e8f0" stroke="#0891b2" stroke-width="1.5" />
              <text x="70" y="40" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0891b2">[1]</text>
              <line x1="70" y1="60" x2="70" y2="76" stroke="#94a3b8" stroke-width="2" marker-end="url(#ch-ins2)" />
              <rect x="30" y="78" width="80" height="34" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="70" y="95" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">21</text>
              <line x1="70" y1="112" x2="70" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#ch-ins2)" />
              <rect x="30" y="128" width="80" height="34" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="70" y="145" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">16</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">21.next = 16，只需改 1 个指针，O(1)</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 哈希冲突 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          哈希冲突是什么？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          哈希函数把<strong>无限可能的键</strong>映射到<strong>有限个桶</strong>。当两个不同的键算出同一个桶号时，就发生了<strong>哈希冲突（Hash Collision）</strong>。
          这是<strong>必然发生</strong>的——根据<strong>鸽巢原理</strong>，把 6 只鸽子塞进 5 个笼子，至少有 1 个笼子有 2 只鸽子。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>冲突示例（capacity = 5，hash = key % 5）：</strong></p>
          <div class="font-mono text-xs text-slate-600 space-y-1">
            <p><code class="bg-white border border-slate-200 rounded px-1.5 py-0.5">10 % 5 = 0</code> → 桶[0]</p>
            <p><code class="bg-white border border-slate-200 rounded px-1.5 py-0.5">15 % 5 = 0</code> → 桶[0] <span class="text-red-500 font-bold">← 冲突！10 和 15 撞在一起</span></p>
            <p><code class="bg-white border border-slate-200 rounded px-1.5 py-0.5">21 % 5 = 1</code> → 桶[1]</p>
          </div>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          哈希冲突就像<strong>CSS 类名冲突</strong>——两个组件都写了 <code>.btn</code>，样式就"撞车"了。<br/>
          链地址法相当于给每个 <code>.btn</code> 加命名空间前缀（如 <code>.header .btn</code>、<code>.footer .btn</code>），
          冲突的样式各归各的，互不干扰。
          </p>
        </aside>
      </section>

      <!-- 2. 链地址法原理 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          链地址法（Chaining）的原理
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          链地址法是解决哈希冲突<strong>最直观</strong>的方案：数组里每个槽位不是存单个元素，而是存<strong>一条链表的头指针</strong>。
          所有哈希到同一个桶的元素，都追加到这条链表的尾部。这样冲突元素既不会丢失，也不会互相覆盖。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>链地址法的执行流程：</strong></p>
          <ol class="list-decimal list-inside space-y-1 text-slate-600 text-sm leading-relaxed">
            <li>对键 key 计算桶号 <code class="bg-white border border-slate-200 rounded px-1 py-0.5 font-mono">idx = hash(key)</code></li>
            <li>定位到 <code class="bg-white border border-slate-200 rounded px-1 py-0.5 font-mono">buckets[idx]</code> 这条链表</li>
            <li>插入：追加到链表尾部；查找/删除：从头遍历这条链表</li>
            <li>链表为空时，桶就是一个"空指针"（null），不占额外空间</li>
          </ol>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>链地址法把「哈希冲突」降级成了「链表遍历」问题。只要链表足够短（负载因子低），遍历成本就接近 O(1)。</p>
        </aside>
      </section>

      <!-- 3. 增删查实现 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          插入 / 删除 / 查找的实现
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          下面是一个完整的链地址法哈希表。每个操作都分成两步：<strong>① 算桶号（O(1)）② 遍历该桶链表（O(链表长度)）</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="codeHashTable" title="HashTable.ts" /></div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">使用示例：观察冲突</h3>
        <div class="mb-4"><Code language="ts" :code="codeDemo" title="demo.ts" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          1. <strong>插入时忘记查重</strong>——同一个 key 被插入两次，链尾会多出一个重复节点，查找时返回第一个，删除却可能删错。<br/>
          2. <strong>删除时误删</strong>——用 <code>splice</code> 删除时索引算错，或删了链头却没更新桶指针。<br/>
          3. <strong>链头插 vs 链尾插混淆</strong>——插链头是 O(1)，插链尾若没维护 tail 指针则是 O(n)。链地址法通常插链尾以保持插入顺序。
          </p>
        </aside>
      </section>

      <!-- 4. 负载因子 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          负载因子 α = n / m
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          负载因子（Load Factor）是衡量哈希表「拥挤程度」的关键指标：<strong>α = 元素数量 n ÷ 桶数量 m</strong>。
          它直接决定了链地址法的性能——α 越大，每条链表的平均长度越长，遍历成本越高。
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-1 text-center font-mono">α = n / m</p>
          <p class="text-xs text-cyan-600 text-center">负载因子 = 元素总数 ÷ 桶总数 = 每条链表平均长度</p>
        </div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">α 值</th><th class="px-4 py-2 border border-slate-200 font-semibold">含义</th><th class="px-4 py-2 border border-slate-200 font-semibold">性能</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">α &lt; 1</td><td class="px-4 py-2 border">元素少于桶，链表很短</td><td class="px-4 py-2 border text-emerald-600">✅ 接近 O(1)</td></tr>
              <tr><td class="px-4 py-2 border font-mono">α ≈ 1</td><td class="px-4 py-2 border">元素与桶数量相当</td><td class="px-4 py-2 border text-emerald-600">✅ 仍很快，平均链长 1</td></tr>
              <tr><td class="px-4 py-2 border font-mono">α &gt;&gt; 1</td><td class="px-4 py-2 border">元素远多于桶，链表变长</td><td class="px-4 py-2 border text-red-600">❌ 退化为 O(n)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="codeLoadFactor" title="load_factor.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>当 α 超过阈值（Java 的 HashMap 是 0.75），就<strong>扩容</strong>——把桶数量翻倍，重新哈希所有元素，让链表重新变短。这保证均摊 O(1)。</p>
        </aside>
      </section>

      <!-- 5. 性能分析 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          性能分析：平均 O(1 + α)
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          在<strong>均匀分布假设</strong>（哈希函数把键均匀撒到各桶）下，每条链表的平均长度就是 α。
          所以一次操作的时间 = <strong>算桶号的 O(1)</strong> + <strong>遍历链表的 O(α)</strong>，即 <strong>O(1 + α)</strong>。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>各操作复杂度（均匀分布下）：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>插入</strong>（先查重再插尾）：平均 O(1 + α)，最坏 O(n)</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>查找成功</strong>：平均 O(1 + α/2)（平均找到一半）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>查找失败</strong>：平均 O(1 + α)（遍历完整条链表）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>删除</strong>：平均 O(1 + α)，最坏 O(n)</span></li>
          </ul>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          因为 α 通常被控制在常数级（如 0.75），所以<strong>实际使用中链地址法就是 O(1) 均摊</strong>。
          但要警惕<strong>最坏情况</strong>：如果哈希函数很烂（比如所有 key 都映射到同一个桶），所有元素挤进一条链表，性能退化成 O(n)——等价于线性查找。
        </p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          负载因子 α 就像<strong>Webpack 的 bundle 分包</strong>——桶数量是「分出的 chunk 数」，元素是「模块数」。<br/>
          chunk 太少（m 小），每个 chunk 塞一堆模块（链表长），首屏加载慢；chunk 太多（m 大），请求数量爆炸。<br/>
          哈希表扩容 = 重新分包，让每个 chunk 保持在合理的体积。
          </p>
        </aside>
      </section>

      <!-- 6. vs 开放寻址 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          链地址法 vs 开放寻址法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          两种冲突解决方案各有千秋。链地址法用链表容纳冲突，开放寻址法则在数组内部「找下一个空槽」。下一篇会详细讲开放寻址。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold">链地址法</th><th class="px-4 py-2 border border-slate-200 font-semibold">开放寻址法</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-medium">冲突存储位置</td><td class="px-4 py-2 border">桶外挂链表</td><td class="px-4 py-2 border">数组内找空槽</td></tr>
              <tr><td class="px-4 py-2 border font-medium">负载因子上限</td><td class="px-4 py-2 border text-emerald-600">可 &gt; 1（链表可无限长）</td><td class="px-4 py-2 border text-amber-600">必须 &lt; 1（槽位有限）</td></tr>
              <tr><td class="px-4 py-2 border font-medium">额外内存</td><td class="px-4 py-2 border text-amber-600">链表节点指针开销</td><td class="px-4 py-2 border text-emerald-600">无额外指针</td></tr>
              <tr><td class="px-4 py-2 border font-medium">缓存友好性</td><td class="px-4 py-2 border text-amber-600">差（节点分散堆上）</td><td class="px-4 py-2 border text-emerald-600">好（数据在数组内）</td></tr>
              <tr><td class="px-4 py-2 border font-medium">删除复杂度</td><td class="px-4 py-2 border text-emerald-600">简单（改指针）</td><td class="px-4 py-2 border text-amber-600">需墓碑标记（lazy deletion）</td></tr>
              <tr><td class="px-4 py-2 border font-medium">典型实现</td><td class="px-4 py-2 border">Java HashMap</td><td class="px-4 py-2 border">Python dict / V8 Map</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 记忆口诀：</strong>链地址法「宽容」（能塞很多），开放寻址法「紧凑」（省内存、快缓存）。现代高性能场景（如引擎、缓存）越来越偏爱开放寻址的变体，这是下两篇的主题。</p>
        </aside>
      </section>

      <!-- 7. JS Map -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          JS 的 Map —— 前端最常用的哈希表
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          前端开发中最常用的哈希表就是 JS 内置的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Map</code>（以及对象字面量）。
          它们对外都提供「键 → 值」的 O(1) 平均操作。虽然 V8 引擎内部的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Map</code> 其实用的是开放寻址 + Robin Hood（后两篇会讲），但对使用者来说接口和性能感受一致。
        </p>
        <div class="mb-4"><Code language="ts" :code="codeJSMap" title="js_map.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <code>Map</code> 就像一个<strong>无限容量的对象</strong>，但 key 可以是任意类型（对象、函数、NaN），且不会像普通对象那样被 <code>__proto__</code> 原型链污染。<br/>
          当你需要「任意类型 key → value」的映射、又要稳定 O(1) 性能时，<strong>优先用 Map，而不是把对象当字典用</strong>。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：链地址法操作
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          观察插入时新元素<strong>追加到对应桶的链表尾部</strong>，查找时<strong>沿链表逐个比较</strong>。哈希函数固定为 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">hash(v) = v % 5</code>。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 元素 n: {{ totalCount }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">📐 桶数 m: {{ MH }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ α = n/m = {{ loadFactor.toFixed(2) }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doInsert" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">插入</button>
          <button @mousedown="doSearch" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">查找</button>
          <button @mousedown="doDelete" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">删除</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-rect v-for="(b,i) in buckets" :key="'bk'+i" :config="bucketCfg(i)" />
              <v-text v-for="(b,i) in buckets" :key="'bt'+i" :config="bucketLabelCfg(i)" />
              <template v-for="(b,i) in buckets" :key="'chain'+i">
                <v-arrow v-for="(n,d) in b" :key="'ar'+n.id" :config="chainArrowCfg(i,d)" />
                <v-rect v-for="(n,d) in b" :key="'nr'+n.id" :config="nodeCfg(n,i,d)" />
                <v-text v-for="(n,d) in b" :key="'nt'+n.id" :config="nodeTextCfg(n,i,d)" />
              </template>
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>哈希冲突必然发生</strong>（鸽巢原理），链地址法是解决它最直观的方案</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>结构 = <strong>桶数组 + 每个桶一条链表</strong>，冲突元素追加到链尾</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>操作 = 算桶号 O(1) + 遍历链表 O(α)，<strong>平均 O(1 + α)</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>负载因子 α = n/m</strong>，是性能晴雨表，超过阈值就扩容</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>最坏情况 O(n)：哈希函数烂 → 全部挤进一条链表</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Java HashMap 用链地址法；JS 的 Map 也是哈希表（底层是开放寻址变体）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-1-hash-func/dsa-3-1-3-string-hash" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：字符串哈希</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-2-collision/dsa-3-2-2-open" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：开放寻址法 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ===== 🎬 链地址法动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(250), W = ref(700)
const MH = 5                       // 桶数量 m
const BBW = 64, BGAP = 14          // 桶宽、桶间距
const BY = 34, BH = 40             // 桶顶、桶高
const NW = 64, NH = 30, NG = 8     // 节点宽、高、纵向间距
const NY0 = 100                    // 第一个节点顶部
const BX0 = 24                     // 左偏移

interface CN { id: number; val: number; color: string; s?: number }
const buckets = reactive<CN[][]>(Array.from({ length: MH }, () => []))
const busy = ref(false), status = ref(''), nid = ref(100)
const activeBucket = ref(-1)
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const hashOf = (v: number) => ((v % MH) + MH) % MH
const bx = (i: number) => BX0 + i * (BBW + BGAP)
const ny = (depth: number) => NY0 + depth * (NH + NG)

const totalCount = computed(() => buckets.reduce((s, b) => s + b.length, 0))
const loadFactor = computed(() => totalCount.value / MH)

function init() {
  buckets.forEach(b => b.length = 0)
  ;[10, 21, 7, 13, 24, 16, 28].forEach(v => {
    buckets[hashOf(v)].push({ id: nid.value++, val: v, color: C.cyan, s: 1 })
  })
  activeBucket.value = -1
  status.value = ''
}

function bucketCfg(i: number) {
  const active = activeBucket.value === i
  return {
    x: bx(i), y: BY, width: BBW, height: BH,
    fill: active ? '#fde68a' : C.ghost, cornerRadius: 6,
    stroke: active ? C.orange : '#0891b2', strokeWidth: active ? 2.5 : 1.5,
  }
}
function bucketLabelCfg(i: number) {
  return { x: bx(i), y: BY, width: BBW, height: BH, text: '[' + i + ']',
    fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold',
    fill: activeBucket.value === i ? '#b45309' : '#0891b2', align: 'center', verticalAlign: 'middle' }
}
function chainArrowCfg(i: number, depth: number) {
  const x = bx(i) + BBW / 2
  const fromY = depth === 0 ? BY + BH : ny(depth - 1) + NH
  const toY = ny(depth)
  return { points: [x, fromY, x, toY], fill: '#94a3b8', stroke: '#94a3b8', strokeWidth: 2, pointerLength: 6, pointerWidth: 5 }
}
function nodeCfg(n: CN, i: number, depth: number) {
  const s = n.s ?? 1
  return { x: bx(i) + (BBW * (1 - s)) / 2, y: ny(depth) + (NH * (1 - s)) / 2,
    width: BBW * s, height: NH * s, fill: n.color, cornerRadius: 6,
    stroke: '#0891b2', strokeWidth: 1.5, shadowColor: 'rgba(0,0,0,.08)', shadowBlur: 3 }
}
function nodeTextCfg(n: CN, i: number, depth: number) {
  const s = n.s ?? 1
  return { x: bx(i) + (BBW * (1 - s)) / 2, y: ny(depth) + (NH * (1 - s)) / 2,
    width: BBW * s, height: NH * s, text: String(n.val), fontSize: 14,
    fontFamily: 'monospace', fontStyle: 'bold', fill: '#0f172a', align: 'center', verticalAlign: 'middle' }
}

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

function doInsert() {
  act('插入  O(1 + α)', async () => {
    const v = Math.floor(Math.random() * 90 + 10)
    const i = hashOf(v)
    activeBucket.value = i
    status.value = `hash(${v}) = ${v} % ${MH} = ${i}`
    await d(500)
    const nb: CN = { id: nid.value++, val: v, color: C.green, s: 0 }
    buckets[i].push(nb)
    await d(80); nb.s = 1
    status.value = `${v} 追加到桶[${i}] 链尾`
    await d(500); nb.color = C.cyan
    activeBucket.value = -1
  })
}

function doSearch() {
  act('查找  O(1 + α)', async () => {
    const v = Math.floor(Math.random() * 90 + 10)
    const i = hashOf(v)
    activeBucket.value = i
    status.value = `查找 ${v}：hash = ${i}`
    await d(450)
    const list = buckets[i]
    let found = false
    for (let k = 0; k < list.length; k++) {
      list[k].color = C.orange
      status.value = `比较桶[${i}]第${k + 1}个：${list[k].val}`
      await d(450)
      if (list[k].val === v) {
        list[k].color = C.green
        status.value = `找到 ${v}！`
        found = true
        break
      }
      list[k].color = C.cyan
    }
    if (!found) status.value = `桶[${i}] 无 ${v}，返回 undefined`
    await d(600)
    list.forEach(n => n.color = C.cyan)
    activeBucket.value = -1
  })
}

function doDelete() {
  act('删除  O(1 + α)', async () => {
    const nonEmpty = buckets.map((b, i) => b.length ? i : -1).filter(i => i >= 0)
    if (!nonEmpty.length) { status.value = '无元素可删'; return }
    const i = nonEmpty[Math.floor(Math.random() * nonEmpty.length)]
    const list = buckets[i]
    activeBucket.value = i
    const last = list[list.length - 1]
    status.value = `删除桶[${i}] 链尾的 ${last.val}`
    last.color = C.red
    await d(400)
    last.s = 0
    await d(300)
    buckets[i].splice(list.length - 1, 1)
    activeBucket.value = -1
  })
}

function doReset() { busy.value = false; init() }

let ro: ResizeObserver | null = null
onMounted(() => {
  init()
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "哈希冲突" },
  { id: "sec-2", name: "链地址法原理" },
  { id: "sec-3", name: "增删查实现" },
  { id: "sec-4", name: "负载因子 α" },
  { id: "sec-5", name: "性能分析" },
  { id: "sec-6", name: "vs 开放寻址" },
  { id: "sec-7", name: "JS Map 原理" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-8", name: "小结" },
]

const codeHashTable = `// 链地址法哈希表：桶数组 + 每个桶一条链表
class HashTable<K, V> {
  private buckets: Array<Array<[K, V]>>  // 桶数组，每个桶是一个链表（用数组模拟）
  private size: number                    // 已存键值对数量

  constructor(private capacity: number = 8) {
    this.buckets = Array.from({ length: capacity }, () => [])
    this.size = 0
  }

  // 哈希函数：取模（这里假定 key 是 number）
  private hash(key: K): number {
    const n = typeof key === 'number' ? key : Number(key)
    return ((n % this.capacity) + this.capacity) % this.capacity
  }

  // 插入：算桶号 → 查重 → 追加到链表尾部
  set(key: K, value: V): void {
    const idx = this.hash(key)
    const chain = this.buckets[idx]
    for (const pair of chain) {
      if (pair[0] === key) { pair[1] = value; return }  // 已存在 → 覆盖
    }
    chain.push([key, value])  // 新键 → 追加链尾
    this.size++
  }

  // 查找：算桶号 → 遍历该桶链表
  get(key: K): V | undefined {
    const chain = this.buckets[this.hash(key)]
    for (const pair of chain) {
      if (pair[0] === key) return pair[1]
    }
    return undefined
  }

  // 删除：算桶号 → 找到并移除
  delete(key: K): boolean {
    const chain = this.buckets[this.hash(key)]
    const i = chain.findIndex(p => p[0] === key)
    if (i === -1) return false
    chain.splice(i, 1)
    this.size--
    return true
  }

  // 负载因子 α = 元素数 / 桶数
  get loadFactor(): number { return this.size / this.capacity }
}`

const codeDemo = `const table = new HashTable<number, string>(5)

table.set(10, 'apple')   // 10 % 5 = 0 → 桶[0]
table.set(21, 'banana')  // 21 % 5 = 1 → 桶[1]
table.set(7, 'cherry')   // 7 % 5 = 2  → 桶[2]
table.set(16, 'date')    // 16 % 5 = 1  → 桶[1]（与 21 冲突！追加到链尾）
table.set(28, 'fig')     // 28 % 5 = 3  → 桶[3]

console.log(table.get(16))   // 'date'（遍历桶[1]：21 → 16）
console.log(table.get(99))   // undefined（桶[4] 为空链表）

console.log(table.loadFactor)  // 5 / 5 = 1.0

// 内部结构（可视化）：
// [0]: 10
// [1]: 21 → 16        ← 冲突链
// [2]: 7
// [3]: 28
// [4]: (空)`

const codeLoadFactor = `// 负载因子 α 决定性能：α = n / m
function measureChainLength(table: HashTable<number, string>): void {
  // 假设均匀分布，每条链平均长度 = α
  const alpha = table.loadFactor
  console.log(\`负载因子 α = \${alpha.toFixed(2)}\`)
  console.log(\`平均链长 ≈ \${alpha.toFixed(2)} 个节点\`)

  // α 越小 → 链表越短 → 越接近 O(1)
  // α 越大 → 链表越长 → 越接近 O(n)

  // Java HashMap 默认 α 阈值 = 0.75
  // 当 size / capacity > 0.75 时触发扩容：
  //   1. 新建 2 倍容量的桶数组
  //   2. 重新哈希所有元素（rehash）
  //   3. 均摊后，每次插入仍是 O(1)
}

// 最坏情况演示：哈希函数退化成常数
// 若 hash(key) 永远返回 0，所有元素都进桶[0]
// 此时查找 = 遍历一条长 n 的链表 = O(n)（等价于线性查找）
// 结论：哈希函数的「均匀性」是链地址法性能的前提`

const codeJSMap = `// JS 原生的 Map —— 前端最常用的哈希表
const map = new Map<string, number>()

map.set('alice', 30)     // hash('alice') → 桶 → O(1) 均摊
map.set('bob', 25)
map.get('alice')         // 30
map.has('carol')         // false
map.delete('bob')        // true
map.size                 // 1

// ─── Map 相比普通对象的优势 ───
// 1. key 可以是任意类型（对象、函数、NaN、Symbol）
const objKey = { id: 1 }
map.set(objKey, 'value')       // ✅ 对象也能当 key

// 2. 保持插入顺序（对象的数字键会被自动排序）
// 3. 有 size 属性，无需 Object.keys(obj).length
// 4. 无原型链污染风险（obj['__proto__'] 是特殊键）

// ⚠️ 对象作为 key 是按「引用」比较的
const k1 = { id: 1 }
const k2 = { id: 1 }
map.set(k1, 'a')
map.get(k2)   // undefined —— k1 和 k2 是不同的引用

// ─── V8 内部实现 ───
// 虽然接口表现像链地址法，但 V8 的 Map/Set 底层是
// OrderedHashMap：开放寻址 + Robin Hood（后面两篇会详解）
// 引擎更偏爱开放寻址，因为它缓存友好、内存紧凑、无指针开销`
</script>
</template>
