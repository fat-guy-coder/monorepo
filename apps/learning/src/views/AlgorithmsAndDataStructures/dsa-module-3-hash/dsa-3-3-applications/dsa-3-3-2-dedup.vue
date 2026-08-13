<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🧮 去重与计数：Set 与频率统计</h1>
          <p class="text-sm text-slate-500 mt-1">哈希表的日常用法——数组去重、字符计数、变位词判断</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 3-3-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：去重与计数
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          去重（Dedup）与计数（Count）是哈希表最常用的两个场景。<strong>去重</strong>靠 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Set</code>：
          每个元素先查「是否已存在」，存在则丢弃，不存在则保留。<strong>计数</strong>靠 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Map</code>：
          每个元素出现的次数累加。二者的底层都是哈希表，插入/查询都是均摊 O(1)。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 230" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="dd-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- 去重前 -->
            <text x="16" y="24" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">去重前（含重复项，红色标记）</text>
            <rect x="40" y="38" width="60" height="46" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="70" y="61" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="116" y="38" width="60" height="46" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="146" y="61" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="192" y="38" width="60" height="46" rx="6" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
            <text x="222" y="61" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="268" y="38" width="60" height="46" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="298" y="61" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="344" y="38" width="60" height="46" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="374" y="61" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="420" y="38" width="60" height="46" rx="6" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
            <text x="450" y="61" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="496" y="38" width="60" height="46" rx="6" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
            <text x="526" y="61" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="572" y="38" width="60" height="46" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="602" y="61" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>

            <!-- 向下箭头 -->
            <line x1="360" y1="96" x2="360" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#dd-arr)" />
            <text x="376" y="116" font-size="11" font-family="monospace" fill="#64748b">去重</text>

            <!-- 去重后 -->
            <text x="16" y="156" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">去重后（保留首次出现，5 个唯一值）</text>
            <rect x="40" y="168" width="60" height="46" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="70" y="191" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="116" y="168" width="60" height="46" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="146" y="191" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="192" y="168" width="60" height="46" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="222" y="191" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="268" y="168" width="60" height="46" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="298" y="191" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="344" y="168" width="60" height="46" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="374" y="191" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：数组去重 —— 重复项（红）被丢弃，只保留首次出现（O(n)）</figcaption>
        </figure>

        <h3 class="text-sm font-semibold text-slate-700 mb-2">Set 底层是哈希表 —— 为什么 has/add 是 O(1)</h3>
        <figure>
          <svg viewBox="0 0 720 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="dd-arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="22" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">Set（哈希表）：value 通过 hash(v) 定位到桶，插入前先查桶里是否已有相同值</text>

            <!-- 桶 -->
            <rect x="40" y="64" width="108" height="52" rx="6" fill="#e0f2fe" stroke="#0891b2" stroke-width="1.5" />
            <text x="94" y="82" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0e7490" font-weight="bold">桶 0</text>
            <text x="94" y="100" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0e7490">1</text>
            <rect x="168" y="64" width="108" height="52" rx="6" fill="#e0f2fe" stroke="#0891b2" stroke-width="1.5" />
            <text x="222" y="82" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0e7490" font-weight="bold">桶 1</text>
            <text x="222" y="100" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0e7490">2</text>
            <rect x="296" y="64" width="108" height="52" rx="6" fill="#e0f2fe" stroke="#0891b2" stroke-width="1.5" />
            <text x="350" y="82" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0e7490" font-weight="bold">桶 2</text>
            <text x="350" y="100" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0e7490">3</text>
            <rect x="424" y="64" width="108" height="52" rx="6" fill="#e0f2fe" stroke="#0891b2" stroke-width="1.5" />
            <text x="478" y="82" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0e7490" font-weight="bold">桶 3</text>
            <text x="478" y="100" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0e7490">4</text>
            <rect x="552" y="64" width="108" height="52" rx="6" fill="#e0f2fe" stroke="#0891b2" stroke-width="1.5" />
            <text x="606" y="82" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0e7490" font-weight="bold">桶 4</text>
            <text x="606" y="100" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0e7490">5</text>

            <text x="16" y="146" font-size="11" font-family="monospace" fill="#0891b2">hash(v) → 桶下标 → 桶内只有少数元素（甚至 0 个），查找与 n 无关 O(1)</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：Set 的哈希桶 —— 每个值被哈希函数散列到固定桶，插入/查询只需查目标桶 O(1)</figcaption>
        </figure>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          数组去重 —— Set 一行搞定
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          数组去重是最常见的日常需求。用 <code>Set</code> 一行就能完成，且时间复杂度 O(n)。
          注意 <code>Set</code> 会<strong>保留插入顺序</strong>，所以去重后元素的相对顺序不变。
        </p>
        <div class="mb-4"><Code language="ts" :code="dedupCode" title="array_dedup.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          去重就像前端给<strong>标签（tags）数组去重</strong>：<code>[...new Set(tags)]</code> 一行搞定，用户贴了两个相同标签也只会显示一个。<br/>
          <code>Set</code> 的 <code>has()</code> 就像 <code>Array.prototype.includes()</code>，但前者是 O(1)，后者是 O(n)——
          数据量大时差距巨大（详见第 5 节复杂度对比）。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          Set 底层是哈希表 —— O(1) 的真相
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          为什么 <code>Set</code> 的 <code>has()</code>、<code>add()</code>、<code>delete()</code> 都是均摊 O(1)？
          因为 <code>Set</code> 和 <code>Map</code> 在 JS 引擎内部都是<strong>基于哈希表实现</strong>的：
          每个值先经过哈希函数映射到某个「桶」，查找时只需定位到那个桶，而不是遍历所有元素。
        </p>
        <div class="mb-4"><Code language="ts" :code="setHashCode" title="set_under_the_hood.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>O(1) 不是「一次操作」，而是<strong>操作时间不随元素数量增长</strong>。
          Set 里存 10 个元素还是 1000 万个元素，<code>has()</code> 都只查一个桶（哈希定位 + 桶内少数几个元素），所以时间恒定。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          字符频率统计 —— Map 计数
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          计数是哈希表的另一大用途。给定一段文本，统计每个字符（或单词）出现的次数，
          用 <code>Map&lt;字符, 次数&gt;</code> 累加即可，一次遍历 O(n)。
        </p>
        <div class="mb-4"><Code language="ts" :code="freqCode" title="char_count.ts" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">执行流程拆解（以 countChars("hello") 为例）</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><code>h</code>：Map 里没有 → 设 <code>h→1</code></li>
          <li><code>e</code>：Map 里没有 → 设 <code>e→1</code></li>
          <li><code>l</code>：Map 里没有 → 设 <code>l→1</code></li>
          <li><code>l</code>：Map 里已有 → 累加 <code>l→2</code></li>
          <li><code>o</code>：Map 里没有 → 设 <code>o→1</code></li>
        </ol>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          变位词判断 —— 计数的经典应用
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>变位词（Anagram）</strong>：两个字符串的字符种类和数量完全相同，只是排列顺序不同。
          比如 <code>"listen"</code> 和 <code>"silent"</code>。判断方法：统计第一个字符串的字符频率，
          再遍历第二个字符串逐个抵消，全部抵消即为变位词。
        </p>
        <div class="mb-4"><Code language="ts" :code="anagramCode" title="anagram.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 计数模式的通用套路：</strong><br/>
          1. 用 <code>Map&lt;key, count&gt;</code> 记录「每个 key 出现几次」；<br/>
          2. 遍历数据时 <code>set(key, (get(key) ?? 0) + 1)</code> 累加；<br/>
          3. 需要抵消时 <code>set(key, count - 1)</code>，减到 0 即匹配。<br/>
          这套「计数 + 抵消」模式能解决变位词、多数元素、找不同、字符串重排等一大类问题。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          O(n) 去重 vs O(n²) 双循环 —— 复杂度与陷阱
        </h2>
        <div class="mb-4"><Code language="ts" :code="compareCode" title="complexity_pitfalls.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见陷阱：</strong><br/>
          1. <strong>用对象当计数器踩原型链</strong>：<code>freq["constructor"]</code> 等特殊键会读到 <code>Object.prototype</code> 上的属性，行为异常；<br/>
          2. <strong>误以为 Set 能按内容去重对象</strong>：<code>Set</code> 对对象按<strong>引用相等</strong>判断，两个内容相同但引用不同的对象不会被去重；<br/>
          3. <strong>依赖去重后的顺序</strong>：JS 的 <code>Set</code> 保证插入顺序，但这是语言特性，跨语言不成立。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong><br/>
          - 去重优先用 <code>Set</code>（O(n)），别用 <code>indexOf</code>/<code>includes</code> 的循环（O(n²)）；<br/>
          - 计数优先用 <code>Map</code>，字符串键要用对象时选 <code>Object.create(null)</code> 或 <code>Object.hasOwn</code>；<br/>
          - 需要按内容去重对象时，先把对象序列化成字符串键（如 <code>JSON.stringify</code>）再存 Set。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：数组去重
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点击「去重」观察遍历过程：每个元素先高亮（橙色），若已存在于哈希表（顶部绿色 chips）则变红并移除，否则保留并加入哈希表。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 剩余: {{ bars.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status || '点击「去重」开始遍历' }}</span>
          <span v-if="result" class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">{{ result }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @click="doDedup" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">🧹 去重</button>
          <button @click="randomize" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">🎲 随机数据</button>
          <button @click="initData" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-text :config="{x:10, y:8, text:'已见 Set:', fontSize:12, fontFamily:'monospace', fill:C.muted}" />
              <v-rect v-for="(e,i) in seen" :key="'s'+i" :config="seenRect(e)" />
              <v-text v-for="(e,i) in seen" :key="'st'+i" :config="seenText(e)" />
              <v-rect v-for="b in bars" :key="b.id" :config="rectCfg(b)" />
              <v-text v-for="b in bars" :key="'v'+b.id" :config="valCfg(b)" />
              <v-text v-for="(b,i) in bars" :key="'i'+b.id" :config="idxCfg(i)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>去重用 Set</strong>（O(n)），计数用 Map（O(n)），底层都是哈希表</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Set 的 has/add/delete 均摊 O(1)</strong>，因为哈希定位到桶，与元素总量无关</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>字符频率统计</strong>：<code>set(ch, (get(ch) ?? 0) + 1)</code> 累加，一次遍历</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>变位词 = 计数 + 抵消</strong>，字符频率完全一致即互为变位词</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>O(n) 去重 vs O(n²) 双循环</strong>：数据量大时性能差距可达几十倍</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>陷阱：</strong>对象键踩原型链、Set 按引用去重对象、依赖去重顺序</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-3-applications/dsa-3-3-1-two-sum" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：两数之和</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-3-applications/dsa-3-3-3-consistent" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：一致性哈希 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// ===== 🎬 去重动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(320), W = ref(700), BW = 54, G = 9, MXH = 170, BASE = 285
const CHW = 46, CH = 24, CHG = 6, CY = 26
interface Bar { id: number; val: number; color: string; s?: number; _x?: number; _y?: number; _h?: number }
interface Seen { val: number; _x?: number }
const bars = reactive<Bar[]>([])
const seen = reactive<Seen[]>([])
const busy = ref(false), status = ref(''), nid = ref(100)
const result = ref('')
const box = ref<HTMLDivElement>()
const sh = (v: number) => Math.max(4, v)

function layout() {
  const total = bars.length * (BW + G) - G, sx = Math.max(10, (W.value - total) / 2)
  const maxV = Math.max(...bars.map(b => b.val), 1)
  bars.forEach((b, i) => {
    b._x = sx + i * (BW + G)
    b._h = Math.max(30, (b.val / maxV) * MXH)
    b._y = BASE - (b._h || 30)
  })
  seen.forEach((e, i) => { e._x = 10 + i * (CHW + CHG) })
}
function rectCfg(b: any) {
  const s = b.s ?? 1; const isGhost = b.color === C.ghost
  return {
    x: b._x + (BW * (1 - s)) / 2, y: b._y, width: BW * s, height: sh(b._h || 30) * s,
    fill: b.color, cornerRadius: [4, 4, 0, 0],
    stroke: isGhost ? 'transparent' : '#94a3b8', strokeWidth: isGhost ? 0 : 1,
    shadowColor: isGhost ? 'transparent' : 'rgba(0,0,0,0.12)', shadowBlur: isGhost ? 0 : 6, shadowOffsetY: isGhost ? 0 : 2,
    opacity: isGhost ? 0 : 1,
  }
}
function valCfg(b: any) {
  const s = b.s ?? 1; const h = sh(b._h || 30) * s
  return { x: b._x + (BW * (1 - s)) / 2, y: b._y + 2, width: BW * s, height: h - 4, text: h > 20 ? String(b.val) : '', fontSize: Math.round(14 * s), fontFamily: 'monospace', fontStyle: 'bold', fill: h > 32 ? '#fff' : C.text, align: 'center', verticalAlign: 'middle' }
}
function idxCfg(i: number) { return { x: (bars[i] as any)?._x || 0, y: BASE + 6, width: BW, text: '[' + i + ']', fontSize: 10, fontFamily: 'monospace', fill: C.muted, align: 'center' } }
function seenRect(e: any) { return { x: e._x, y: CY, width: CHW, height: CH, fill: '#e0f2fe', cornerRadius: 6, stroke: '#0891b2', strokeWidth: 1.2 } }
function seenText(e: any) { return { x: e._x, y: CY, width: CHW, height: CH, text: String(e.val), fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0e7490', align: 'center', verticalAlign: 'middle' } }
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

function initData() {
  bars.length = 0; seen.length = 0; result.value = ''
  const data = [1, 2, 2, 3, 4, 4, 4, 5]
  data.forEach((v, i) => bars.push({ id: i + 1, val: v, color: C.cyan, s: 1 }))
  layout()
}
function randomize() {
  bars.length = 0; seen.length = 0; result.value = ''
  const n = 9
  for (let i = 0; i < n; i++) bars.push({ id: i + 1, val: Math.floor(Math.random() * 6) + 1, color: C.cyan, s: 1 })
  layout()
}

async function doDedup() {
  if (busy.value) return
  act('去重 O(n)  哈希表查重', async () => {
    const seenSet = new Set<number>()
    seen.length = 0; result.value = ''
    bars.forEach(b => { b.color = C.cyan; b.s = 1 })
    layout()
    let i = 0
    while (i < bars.length) {
      const v = bars[i].val
      bars[i].color = C.orange; bars[i].s = 1.1
      status.value = '检查 ' + v + '，是否已见？'
      layout(); await d(420)

      if (seenSet.has(v)) {
        bars[i].color = C.red; bars[i].s = 1.1
        status.value = v + ' 重复 → 移除'
        layout(); await d(380)
        bars[i].s = 0; layout(); await d(300)
        bars.splice(i, 1); layout()
        // 不移除 i，因为下一个元素左移到了位置 i
      } else {
        seenSet.add(v)
        seen.push({ val: v })
        bars[i].color = C.cyan; bars[i].s = 1
        status.value = v + ' 首次出现 → 保留，加入 seen'
        layout(); await d(280)
        i++
      }
    }
    result.value = '✅ 去重完成：剩 ' + bars.length + ' 个唯一元素'
    bars.forEach(b => { b.s = 1; b.color = C.cyan })
    layout()
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
  { id: "sec-1", name: "数组去重" },
  { id: "sec-2", name: "Set 底层原理" },
  { id: "sec-3", name: "字符频率统计" },
  { id: "sec-4", name: "变位词判断" },
  { id: "sec-5", name: "复杂度与陷阱" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

const dedupCode = `// ─── 数组去重（Dedup）───
const nums = [1, 2, 2, 3, 4, 4, 4, 5]

// 方式一：Set（底层是哈希表，自动去重）
const unique1 = [...new Set(nums)]
console.log(unique1)  // [1, 2, 3, 4, 5]  O(n)

// 方式二：filter + indexOf（也是 O(n²)，不推荐）
const unique2 = nums.filter((v, i) => nums.indexOf(v) === i)
console.log(unique2)  // [1, 2, 3, 4, 5]  O(n²)

// 方式三：手写哈希表（Map）去重，保留首次出现顺序
function dedup<T>(arr: T[]): T[] {
    const seen = new Map<T, boolean>()
    const res: T[] = []
    for (const item of arr) {
        if (!seen.has(item)) {
            seen.set(item, true)
            res.push(item)
        }
    }
    return res
}
console.log(dedup(nums))  // [1, 2, 3, 4, 5]

// Set 的去重依据是"值相等"（SameValueZero 语义）
// NaN 与 NaN 视为相等（与 === 不同！）
// +0 与 -0 视为相等
const tricky = [NaN, NaN, 0, -0]
console.log([...new Set(tricky)])  // [NaN, 0]`

const setHashCode = `// ─── Set 底层是哈希表 ───
// Set 和 Map 都基于哈希表实现（JS 引擎内部用哈希桶存储）
// 这就是为什么 has/add/delete 都是均摊 O(1)

// 对比：数组的 includes 是 O(n)（线性扫描）
//       Set 的 has 是 O(1)（哈希定位）

const set = new Set<number>()
set.add(1)       // O(1)
set.add(2)       // O(1)
set.has(1)       // O(1)：哈希定位到桶，桶内最多几个元素
set.delete(2)    // O(1)
console.log(set.size)  // 1

// ─── 字符频率统计（计数 Count）───
function countChars(s: string): Map<string, number> {
    const freq = new Map<string, number>()
    for (const ch of s) {
        freq.set(ch, (freq.get(ch) ?? 0) + 1)
    }
    return freq
}

const freq = countChars("hello")
console.log(freq)
// 输出: Map { 'h'→1, 'e'→1, 'l'→2, 'o'→1 }

// 等价写法：用普通对象（字符串键）做计数器
function countCharsObj(s: string): Record<string, number> {
    const freq: Record<string, number> = {}
    for (const ch of s) {
        freq[ch] = (freq[ch] ?? 0) + 1
    }
    return freq
}
// 注意：对象键会被转成字符串，且 "__proto__" 等特殊键有坑（见常见错误）`

const freqCode = `// ─── 字符频率统计：Map 计数 ───
function countChars(s: string): Map<string, number> {
    const freq = new Map<string, number>()
    for (const ch of s) {
        freq.set(ch, (freq.get(ch) ?? 0) + 1)
    }
    return freq
}

console.log(countChars("hello"))
// Map { 'h'→1, 'e'→1, 'l'→2, 'o'→1 }

// ─── 扩展：找出出现次数最多的字符（众数）───
function mostFrequent(s: string): [string, number] {
    const freq = countChars(s)
    let maxKey = '', maxVal = 0
    for (const [key, val] of freq) {
        if (val > maxVal) { maxVal = val; maxKey = key }
    }
    return [maxKey, maxVal]
}
console.log(mostFrequent("hello"))  // ['l', 2]

// ─── 扩展：单词计数（词频统计）───
function wordCount(text: string): Map<string, number> {
    const freq = new Map<string, number>()
    for (const word of text.toLowerCase().split(/\\s+/)) {
        if (!word) continue
        freq.set(word, (freq.get(word) ?? 0) + 1)
    }
    return freq
}
console.log(wordCount("the cat and the dog"))
// Map { 'the'→2, 'cat'→1, 'and'→1, 'dog'→1 }`

const anagramCode = `// ─── 变位词判断（Anagram）───
// 变位词：两个字符串的字符种类和数量完全相同，只是顺序不同
// 例如 "listen" 和 "silent" 互为变位词

function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false  // 长度不同必不是

    const freq = new Map<string, number>()
    for (const ch of s) {
        freq.set(ch, (freq.get(ch) ?? 0) + 1)
    }
    for (const ch of t) {
        const c = freq.get(ch) ?? 0
        if (c === 0) return false   // t 中有 s 没有的字符，或数量超了
        freq.set(ch, c - 1)
    }
    return true  // 全部抵消，说明字符集合完全相同
}

console.log(isAnagram("listen", "silent"))  // true
console.log(isAnagram("hello", "world"))    // false
console.log(isAnagram("aacc", "ccac"))      // false

// ─── 扩展：字母异位词分组（LeetCode 49）───
// 把互为变位词的字符串分到同一组
function groupAnagrams(strs: string[]): string[][] {
    const groups = new Map<string, string[]>()
    for (const s of strs) {
        // 排序后的字符串作为"签名"，变位词签名相同
        const key = [...s].sort().join('')
        if (!groups.has(key)) groups.set(key, [])
        groups.get(key)!.push(s)
    }
    return [...groups.values()]
}
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]`

const compareCode = `// ─── O(n) 去重 vs O(n²) 双循环 ───
const n = 10000
const arr = Array.from({ length: n }, (_, i) => i % 1000)  // 大量重复

// 方案 A：Set 去重 O(n)
console.time("Set 去重")
const uniqueSet = [...new Set(arr)]
console.timeEnd("Set 去重")
// 典型输出: ~0.5ms

// 方案 B：双重循环去重 O(n²)
console.time("双循环去重")
const uniqueLoop: number[] = []
for (const v of arr) {
    if (!uniqueLoop.includes(v)) uniqueLoop.push(v)  // includes 是 O(n)
}
console.timeEnd("双循环去重")
// 典型输出: ~20ms（慢 40 倍！）

// ─── 常见错误 1：用对象当计数器踩到原型链 ───
const freq: Record<string, number> = {}
freq["constructor"] = (freq["constructor"] ?? 0) + 1
console.log(freq["constructor"])
// ⚠️ "constructor" 是 Object 原型上的属性，行为异常
// 解决：用 Map，或 Object.create(null)，或用 Object.hasOwn 判断

// ─── 常见错误 2：误以为 Set 能存复杂对象去重 ───
const set = new Set<object>()
set.add({ id: 1 })
set.add({ id: 1 })
console.log(set.size)  // 2！两个对象引用不同，不相等
// Set 对对象按"引用相等"去重，不是按内容

// ─── 常见错误 3：去重后顺序不保证 ───
// Set 的遍历顺序 = 插入顺序（JS 保证），但不要依赖这一点跨语言`
</script>
