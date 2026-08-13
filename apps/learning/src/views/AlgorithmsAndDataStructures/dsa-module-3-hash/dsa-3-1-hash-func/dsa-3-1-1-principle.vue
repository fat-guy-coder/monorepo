<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🗂️ 哈希表原理：key → value 的 O(1) 魔法</h1>
          <p class="text-sm text-slate-500 mt-1">数组 + 哈希函数 = 近乎 O(1) 的查找，面试与工程的双料核心</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 3-1-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：key → hash() → index → 数组桶
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          哈希表 = <strong>一个数组（桶）</strong> + <strong>一个哈希函数</strong>。哈希函数把任意 key 换算成一个整数下标，
          直接定位到数组的某个格子。全程<strong>不遍历、不比较</strong>，所以平均复杂度是 O(1)。
          下面这张图展示了 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">key=24</code> 如何落到
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">桶[3]</code>。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ov-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- 阶段 1：key -->
            <rect x="40" y="30" width="80" height="44" rx="8" fill="#e0f2fe" stroke="#0891b2" stroke-width="1.5" />
            <text x="80" y="52" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">key=24</text>

            <!-- 阶段 2：hash() -->
            <line x1="120" y1="52" x2="166" y2="52" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <rect x="170" y="30" width="92" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="216" y="46" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">hash()</text>
            <text x="216" y="64" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">24 % 7</text>

            <!-- 阶段 3：index -->
            <line x1="262" y1="52" x2="305" y2="52" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <rect x="309" y="30" width="102" height="44" rx="8" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="360" y="52" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">index=3</text>

            <!-- 阶段 4：落到桶 -->
            <line x1="360" y1="74" x2="360" y2="116" stroke="#f59e0b" stroke-width="2" marker-end="url(#ov-arr)" />
            <text x="372" y="98" font-size="11" font-family="monospace" fill="#d97706">定位桶[3]</text>

            <!-- 数组桶 -->
            <rect x="90" y="150" width="70" height="52" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <rect x="168" y="150" width="70" height="52" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <rect x="246" y="150" width="70" height="52" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <rect x="324" y="150" width="70" height="52" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2.5" />
            <text x="359" y="176" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">24</text>
            <rect x="402" y="150" width="70" height="52" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <rect x="480" y="150" width="70" height="52" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <rect x="558" y="150" width="70" height="52" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />

            <!-- 下标 -->
            <text x="125" y="218" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[0]</text>
            <text x="203" y="218" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[1]</text>
            <text x="281" y="218" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[2]</text>
            <text x="359" y="218" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#f59e0b" font-weight="bold">[3]</text>
            <text x="437" y="218" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[4]</text>
            <text x="515" y="218" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[5]</text>
            <text x="593" y="218" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[6]</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：哈希表结构 —— key 经哈希函数压缩成下标，直接定位到数组桶（无需遍历）</figcaption>
        </figure>

        <!-- 操作示意图：哈希查找 vs 线性查找 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：查找 key —— 哈希 O(1) vs 数组线性扫描 O(n)</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">哈希表：1 步命中</p>
            <svg viewBox="0 0 320 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ov-lk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
              </defs>
              <line x1="160" y1="20" x2="160" y2="46" stroke="#f59e0b" stroke-width="2" marker-end="url(#ov-lk)" />
              <text x="160" y="14" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#f59e0b">get(key)</text>
              <text x="30" y="88" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">hash(key)</text>
              <text x="160" y="88" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0891b2">→ 下标</text>
              <rect x="120" y="54" width="80" height="44" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2.5" />
              <text x="160" y="76" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">value</text>
              <text x="280" y="88" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#16a34a">O(1)</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">算出下标直接读，和表的大小无关</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">数组：逐个比较</p>
            <svg viewBox="0 0 320 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="40" width="44" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="42" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#ffffff">a</text>
              <rect x="72" y="40" width="44" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="94" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#ffffff">b</text>
              <rect x="124" y="40" width="44" height="40" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="146" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">c</text>
              <rect x="176" y="40" width="44" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="198" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#ffffff">d</text>
              <rect x="228" y="40" width="44" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="250" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#ffffff">e</text>
              <text x="42" y="94" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#f59e0b">1</text>
              <text x="94" y="94" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#f59e0b">2</text>
              <text x="146" y="94" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#16a34a">3</text>
              <text x="30" y="14" font-size="11" font-family="monospace" fill="#64748b">找 "c" 要比较 3 次 → O(n)</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">线性扫描逐个比较，最坏要扫全表</figcaption>
          </figure>
        </div>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          哈希表是什么 —— 一个「按名索址」的字典
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          哈希表（Hash Table，也叫散列表）是一种 <strong>key → value</strong> 的存储结构。它解决的核心问题是：
          <strong>给我一个 key，我能在 O(1) 时间里拿到对应的 value</strong>，无论表里存了 10 条还是 1000 万条数据。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>哈希表的核心操作与复杂度：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>插入 set(key, value)</strong> — 平均 O(1)</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>查找 get(key)</strong> — 平均 O(1)</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>删除 delete(key)</strong> — 平均 O(1)</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>判断存在 has(key)</strong> — 平均 O(1)</span></li>
          </ul>
        </div>
        <div class="mb-4"><Code language="ts" :code="basicCode" title="simple_hash_table.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          哈希表就是 JS 里你天天在用的 <code>Map</code> 和对象字面量。<code>const user = {'alice': 18}</code> 之后，
          写 <code>user['alice']</code> 就能立刻拿到 18 —— 引擎底层就是用哈希表实现的。<br/>
          就像一本<strong>按姓氏首字母分区的通讯录</strong>：查「李四」直接翻到 L 区，而不是从头翻到尾。
          </p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          哈希函数 —— 把 key 压缩成数组下标
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          数组的致命弱点是「下标只能是 0、1、2…这样的整数」。但我们的 key 可能是 <code>"alice"</code>、
          <code>"user@mail.com"</code> 甚至整个对象。<strong>哈希函数（hash function）的职责</strong>，就是把任意 key
          转换成一个固定范围内的整数下标：
        </p>
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-1 text-center font-mono">index = hash(key) % arrayLength</p>
          <p class="text-xs text-cyan-600 text-center">先算出 key 的哈希值，再取模缩放到数组下标范围内</p>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一个好哈希函数要满足三条铁律：<strong>确定性</strong>（同一个 key 永远同一个结果）、<strong>均匀性</strong>（结果尽量分散，减少冲突）、
          <strong>高效性</strong>（计算要快）。下面用一个最朴素的「求和哈希」演示映射过程。
        </p>
        <div class="mb-4"><Code language="ts" :code="hashCode" title="hash_function.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>哈希函数只是「搬运工」——它不负责解决冲突，只负责<strong>尽量把 key 均匀撒到各个桶</strong>。
          上面示例里 <code>alice</code> 和 <code>bob</code> 撞到了同一个桶 6，这就是<strong>哈希冲突</strong>，下一模块专门讲怎么处理。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          底层结构 —— 数组 + 桶（bucket）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          哈希表外表是「key → value」，<strong>内里其实就是一个数组</strong>。数组的每个格子叫一个<strong>桶（bucket）</strong>。
          哈希函数算出的下标，就是桶的数组下标。因为底层是数组，所以才能享受 O(1) 的随机访问能力。
        </p>
        <div class="mb-4"><Code language="ts" :code="bucketCode" title="array_of_buckets.ts" /></div>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          这张「数组桶」的抽象非常关键——它解释了哈希表后续所有设计：
        </p>
        <ol class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span><strong>为什么能 O(1)？</strong> 因为底层数组支持 O(1) 随机访问，哈希函数只是把 key 翻译成下标。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span><strong>为什么有冲突？</strong> 桶数量有限，key 无限，「鸽子笼原理」注定两个 key 可能落到同一个桶。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">3.</span><span><strong>为什么要扩容？</strong> 装得越满冲突越多，所以桶快满时要把数组翻倍、重新散列所有元素。</span></li>
        </ol>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          为什么比数组 / 链表快 —— 复杂度对比
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          数组的随机访问是 O(1)，但<strong>按值查找</strong>（比如「找等于 42 的元素」）是 O(n)；
          链表按位置访问是 O(n)。哈希表则把「按值查找」也变成了 O(1)——只要把「值」当成 key 交给哈希函数即可。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">操作</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">数组</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">链表</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">哈希表</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">按下标访问</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border font-mono text-slate-400">—（无下标概念）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">按值查找</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1) 平均</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">插入</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)（搬移）</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)（已知位置）</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1) 平均</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">删除</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1) 平均</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意「平均」二字：</strong>哈希表的 O(1) 是<strong>平均/均摊</strong>复杂度。
          最坏情况下（所有 key 都撞进一个桶）会退化到 O(n)。所以「哈希函数好 + 负载因子低」是维持 O(1) 的两大前提。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          负载因子 —— 哈希表健康的「体温计」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          负载因子（Load Factor，记作 α）是<strong>已存元素数 n 与桶数量 m 的比值</strong>：
        </p>
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-1 text-center font-mono">α = n / m</p>
          <p class="text-xs text-cyan-600 text-center">α 越小冲突越少，性能越接近 O(1)；α 越大越拥挤</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="loadFactorCode" title="load_factor.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>一般把扩容阈值设在 <code>α ≈ 0.75</code>。
          超过就翻倍扩容 + 重新散列（rehash）。Java 的 <code>HashMap</code> 默认阈值就是 0.75，这是工程上平衡「空间」与「冲突率」的甜点值。</p>
        </aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          与 JS 的 Map / Object 的关系 —— 你其实一直在用
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          前端几乎每天都在跟哈希表打交道：<code>Map</code>、<code>Set</code>、对象字面量、甚至 <code>localStorage</code> 内部都是哈希结构。
          理解它们的差异，能帮你在真实场景里选对容器。
        </p>
        <div class="mb-4"><Code language="ts" :code="mapObjectCode" title="map_vs_object.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <code>Map</code> 是一个「专门强化过的哈希表」，而普通对象更像「附带原型链的简化哈希表」。<br/>
          <code>obj['name']</code> 和 <code>map.get('name')</code> 在功能上类似，但 Map 对 <strong>任意类型 key、插入顺序、高频增删</strong> 都更友好——这就是 V8 引擎为什么给它单独做了优化。
          </p>
        </aside>
      </section>

      <!-- 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：哈希表插入 / 查找
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          下方是 7 个桶的哈希表，哈希函数用 <code>h(k) = k mod 7</code>。点「插入」随机生成 key，观察它如何
          <strong>算哈希 → 定位桶 → 写入</strong>；点「查找」观察它如何一步命中（或发现不存在）。注意整个过程<strong>没有遍历</strong>。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-3 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 桶数量: {{ buckets.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status || 'h(k) = k mod 7' }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ 平均 O(1)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button v-for="btn in ctrlBtns" :key="btn.label" @mousedown="btn.action" :disabled="busy"
            :class="[btn.cls, 'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150',
                     'active:scale-95 active:shadow-inner',
                     'disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100']">{{ btn.label }}</button>
          <span class="text-xs text-slate-500 ml-auto bg-slate-100 px-2 py-1 rounded-full min-w-[60px] text-center">{{ status }}</span>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-rect v-for="b in buckets" :key="b.id" :config="rectCfg(b)" />
              <v-text v-for="b in buckets" :key="'v'+b.id" :config="valCfg(b)" />
              <v-text v-for="(b,i) in buckets" :key="'i'+b.id" :config="idxCfg(i)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>哈希表 = 数组（桶） + 哈希函数</strong>，把 key 映射成下标实现 O(1) 增删查</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>哈希函数</strong>满足确定性、均匀性、高效性；<code>index = hash(key) % m</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>底层是数组</strong>——O(1) 随机访问是哈希表速度的来源</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>负载因子 α = n / m</strong>，α 越大冲突越多；工程上 0.75 触发扩容</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>O(1) 是平均复杂度</strong>，最坏退化 O(n)——好哈希函数 + 低负载因子是前提</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>JS 的 Map/Set/Object 底层都是哈希表</strong>，你每天都在用</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-5-skiplist/dsa-2-5-3-redis-zset" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：跳表与 Redis ZSet</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-1-hash-func/dsa-3-1-2-methods" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：哈希函数构造方法 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// ===== 🎬 哈希表动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const EMPTY = '#f1f5f9'
const H = ref(300), W = ref(700), BW = 54, G = 9, MXH = 220, BASE = 255
interface Bucket { id: number; val: number; color: string; s?: number; _x?: number; _y?: number; _h?: number }
const buckets = reactive<Bucket[]>([])
const M = 7   // 桶数量（取素数）
const busy = ref(false), status = ref('')
const box = ref<HTMLDivElement>()
const sh = (v: number) => Math.max(4, v)
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

function hash(k: number) { return ((k % M) + M) % M }   // 除留余数法

function init() {
  buckets.length = 0
  for (let i = 0; i < M; i++) buckets.push({ id: i, val: 0, color: EMPTY, s: 1 })
  layout()
}
function layout() {
  const total = buckets.length*(BW+G)-G, sx = Math.max(10, (W.value-total)/2)
  const maxV = Math.max(...buckets.map(b => b.val), 1)
  buckets.forEach((b, i) => {
    b._x = sx + i*(BW+G)
    b._h = b.val === 0 ? 30 : Math.max(30, (b.val/maxV)*MXH)
    b._y = BASE-(b._h||30)
  })
}
function rectCfg(b: any) {
  const s = b.s ?? 1
  return {
    x: b._x+(BW*(1-s))/2, y: b._y, width: BW*s, height: sh(b._h||30)*s,
    fill: b.color, cornerRadius: [4,4,0,0],
    stroke: '#94a3b8', strokeWidth: 1,
    shadowColor: 'rgba(0,0,0,0.12)', shadowBlur: 6, shadowOffsetY: 2,
  }
}
function valCfg(b: any) {
  const s = b.s ?? 1, h = sh(b._h||30)*s
  return { x: b._x+(BW*(1-s))/2, y: b._y+2, width: BW*s, height: h-4,
    text: b.val > 0 ? String(b.val) : '', fontSize: Math.round(14*s),
    fontFamily: 'monospace', fontStyle: 'bold', fill: h>32?'#fff':C.text,
    align: 'center', verticalAlign: 'middle' }
}
function idxCfg(i: number) {
  return { x: (buckets[i] as any)?._x||0, y: BASE+6, width: BW, text: '['+i+']',
    fontSize: 10, fontFamily: 'monospace', fill: C.muted, align: 'center' }
}
function restore(i: number) {
  buckets[i].s = 1
  buckets[i].color = buckets[i].val > 0 ? C.cyan : EMPTY
  layout()
}
async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false }
}

function doInsert() {
  act('Insert  O(1)', async () => {
    const key = Math.floor(Math.random()*90+10)
    const idx = hash(key)
    status.value = `插入 key=${key} → h = ${key} mod 7 = ${idx}`
    buckets[idx].color = C.orange; buckets[idx].s = 1.12; layout(); await d(500)
    const old = buckets[idx].val
    buckets[idx].val = key
    buckets[idx].color = C.green; buckets[idx].s = 1; layout(); await d(450)
    restore(idx)
    status.value = old > 0 ? `✅ 桶[${idx}] = ${key}（覆盖旧值 ${old}，冲突！）` : `✅ 桶[${idx}] = ${key}`
  })
}
function doSearch() {
  act('Search  O(1)', async () => {
    const key = Math.floor(Math.random()*90+10)
    const idx = hash(key)
    status.value = `查找 key=${key} → h = ${key} mod 7 = ${idx}`
    buckets[idx].color = C.orange; buckets[idx].s = 1.12; layout(); await d(550)
    if (buckets[idx].val === key) {
      buckets[idx].color = C.green; buckets[idx].s = 1.15; layout()
      status.value = `✅ 命中！桶[${idx}] = ${key}`
    } else if (buckets[idx].val === 0) {
      buckets[idx].color = C.red; buckets[idx].s = 1; layout()
      status.value = `❌ 桶[${idx}] 为空，key=${key} 不存在`
    } else {
      buckets[idx].color = C.red; buckets[idx].s = 1; layout()
      status.value = `❌ 桶[${idx}] 存的是 ${buckets[idx].val}，key=${key} 不存在`
    }
    await d(600); restore(idx)
  })
}
function doReset() { init(); status.value = '' }

const ctrlBtns = [
  { label: '插入', action: doInsert, cls: 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm' },
  { label: '查找', action: doSearch, cls: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm' },
  { label: '↺ Reset', action: doReset, cls: 'bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm' },
]

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
  { id: "sec-1", name: "哈希表是什么" },
  { id: "sec-2", name: "哈希函数映射" },
  { id: "sec-3", name: "数组+桶结构" },
  { id: "sec-4", name: "为什么这么快" },
  { id: "sec-5", name: "负载因子" },
  { id: "sec-6", name: "与Map/Object" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

const basicCode = `// 哈希表 = 数组 + 哈希函数
// 接口层面：key → value，支持 O(1) 的增删查改

// 用 TypeScript 模拟一个极简哈希表（字符串 key，冲突暂按直接覆盖处理）
class SimpleHashTable<V> {
    private buckets: (V | undefined)[]   // 底层数组（桶）
    private _size = 0

    constructor(capacity = 16) {
        this.buckets = new Array(capacity).fill(undefined)
    }

    // 哈希函数：把 key 转成 [0, buckets.length-1] 的下标
    private hash(key: string): number {
        let h = 0
        for (let i = 0; i < key.length; i++) {
            h = (h * 31 + key.charCodeAt(i)) % this.buckets.length
        }
        return h
    }

    set(key: string, value: V): void {
        const idx = this.hash(key)
        this.buckets[idx] = value   // 简化：直接写入（真实实现要处理冲突）
        this._size++
    }

    get(key: string): V | undefined {
        const idx = this.hash(key)
        return this.buckets[idx]    // O(1)：直接算出下标命中，无需遍历
    }

    get size(): number { return this._size }
}

const table = new SimpleHashTable<number>()
table.set('age', 18)
table.set('score', 99)

console.log(table.get('age'))    // 18  —— 直接定位，不比较
console.log(table.get('score'))  // 99
console.log(table.get('none'))   // undefined —— key 不存在时按同样规则算出空桶

// 时间复杂度的本质：
// 不管表里存 10 条还是 10^6 条，get 都是「算一次哈希 + 读一次数组」两步搞定
// 所以是 O(1)（平均），与数据规模无关`

const hashCode = `// 哈希函数的本质：把任意 key 压缩到 [0, N-1] 的整数下标
// 好哈希函数的三个铁律：
//   1. 确定性 —— 同一个 key 永远得到同一个结果
//   2. 均匀性 —— 不同 key 尽量分散，减少冲突
//   3. 高效性 —— 计算要快

// 简单求和哈希（仅演示用，实际质量较差，容易冲突）
function sumHash(key: string): number {
    let sum = 0
    for (let i = 0; i < key.length; i++) {
        sum += key.charCodeAt(i)   // 累加字符的 ASCII 码
    }
    return sum
}

const N = 7   // 数组长度（桶数量）
const keys = ['alice', 'bob', 'carol', 'dave', 'eve']

for (const key of keys) {
    const index = sumHash(key) % N
    console.log(\`key=\${key.padEnd(6)} sum=\${sumHash(key).toString().padStart(3)} index=\${index}\`)
}
// 输出:
// key=alice  sum=510 index=6
// key=bob    sum=307 index=6   ← 与 alice 撞到同一个桶（哈希冲突！）
// key=carol  sum=529 index=4
// key=dave   sum=416 index=3
// key=eve    sum=320 index=5
//
// 关键观察：
// 1. 无论 key 多长，最终都落到 [0, N-1] 的固定范围
// 2. 'alice' 和 'bob' 都算出 index=6 —— 这就是「哈希冲突」
//    （如何优雅处理冲突，见下一模块「冲突处理」）`

const bucketCode = `// 哈希表的底层：一个装满「桶」的数组
// 桶 = 数组的一个格子，存的是 value（冲突场景下还会存链表/键）

// 用 Int32Array 模拟 7 个桶（-1 表示空桶）
const buckets = new Int32Array(7).fill(-1)

// 每个桶的「下标」就是哈希函数算出来的 index
// 桶 [0]  桶 [1]  桶 [2]  桶 [3]  桶 [4]  桶 [5]  桶 [6]
//  [-1]   [-1]   [-1]   [ 24]   [-1]   [-1]   [-1]
//                        ↑ key=24 → 24 % 7 = 3 落在这里

const put = (key: number) => {
    const index = ((key % 7) + 7) % 7
    buckets[index] = key    // 写入桶
}
const has = (key: number): boolean => {
    const index = ((key % 7) + 7) % 7
    return buckets[index] === key   // O(1) 判断
}

put(24)
put(10)   // 10 % 7 = 3 —— 又撞桶 3，覆盖了 24（冲突！）

console.log(has(24))  // false（被 10 覆盖了）
console.log(has(10))  // true

// 这个极简版本暴露了哈希表的根本矛盾：
// 桶数量有限（7 个），key 无限 → 必然冲突
// 真实实现用「链地址法 / 开放寻址法」解决（见下一模块）`

const loadFactorCode = `// ─── 负载因子 (Load Factor) ───
// α = n / m  （n = 已存元素数，m = 桶数量）
// α 越小越稀疏，冲突越少；α 越大越拥挤，性能越差

function report(n: number, m: number) {
    const alpha = n / m
    console.log(\`n=\${n}, m=\${m}, 负载因子 α=\${alpha.toFixed(2)}\`)
    if (alpha < 0.7)      console.log('✅ α < 0.7 → 冲突少，接近 O(1)')
    else if (alpha < 1.0) console.log('⚠️ 0.7 ≤ α < 1 → 冲突开始变多')
    else                  console.log('❌ α ≥ 1 → 桶不够用，必须扩容')
    console.log('---')
}

report(5, 16)    // α=0.31 ✅
report(12, 16)   // α=0.75 ⚠️（Java HashMap 的默认扩容阈值）
report(20, 16)   // α=1.25 ❌

// 为什么阈值取 0.75 而不是 1.0？
// α 接近 1 时，即使还没装满，冲突概率也急剧上升（生日悖论）。
// 提前在 0.75 扩容，用「更多空桶」换「更低冲突率」——
// 空间换时间，是哈希表设计的一贯思路。`

const mapObjectCode = `// ─── JS 的 Map：专门强化过的哈希表 ───
const m = new Map<string, number>()
m.set('a', 1)
m.set('b', 2)
m.has('a')        // O(1)
m.get('a')        // O(1)
m.delete('a')     // O(1)
m.size            // O(1) 拿到元素个数（对象要 Object.keys(o).length）

// Map 的优势：任意类型 key、严格按插入顺序遍历、高频增删友好
const byObjectKey = new Map<object, string>()
const k1 = { id: 1 }, k2 = { id: 2 }
byObjectKey.set(k1, 'first')   // 对象也能当 key
byObjectKey.set(k2, 'second')

// ─── Object：带原型链的简化哈希表 ───
const obj: Record<string, number> = {}
obj['name'] = 1
obj['age'] = 2

// ⚠️ 原型链陷阱：某些 key 会命中原型上的属性
console.log(obj['constructor'])   // 不是 undefined，是 Function！
console.log(obj['toString'])      // 原型方法

// 解法：用无原型对象做纯 key-value 容器
const pure = Object.create(null)
pure['constructor'] = 'safe'
console.log(pure['constructor'])  // 'safe'（不会命中原型）

// ─── 选型建议 ───
// Map   ：key 非字符串 / 需要保持顺序 / 高频增删 / 需要 size
// Object：结构固定 / 需要 JSON 序列化 / 少量字段 / 点号访问方便`
</script>
