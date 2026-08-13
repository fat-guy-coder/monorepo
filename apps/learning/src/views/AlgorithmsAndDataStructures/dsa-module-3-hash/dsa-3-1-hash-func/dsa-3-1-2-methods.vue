<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔢 哈希函数构造方法：四种把 key 变下标的套路</h1>
          <p class="text-sm text-slate-500 mt-1">除留余数法 / 乘法哈希 / 平方取中法 / 折叠法——各怀绝技</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 3-1-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：四种哈希函数构造方法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          哈希函数的目标只有一个：<strong>把任意整数 key 均匀地映射到 [0, m-1] 的桶下标</strong>。
          四种经典构造方法各有所长，下面四张小图分别演示它们的计算过程（均以映射到 7 个桶为例）。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">① 除留余数法</p>
            <svg viewBox="0 0 340 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="14" y="12" width="132" height="24" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="80" y="24" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">h(k) = k mod m</text>
              <rect x="20" y="52" width="100" height="40" rx="6" fill="#e0f2fe" stroke="#0891b2" stroke-width="1.5" />
              <text x="70" y="72" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">k=1234</text>
              <line x1="120" y1="72" x2="176" y2="72" stroke="#94a3b8" stroke-width="2" marker-end="url(#m1-arr)" />
              <rect x="180" y="52" width="130" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="245" y="72" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">1234%7 = 2</text>
              <text x="20" y="106" font-size="10" font-family="monospace" fill="#64748b">m 取素数，一次取模最快</text>
            </svg>
          </figure>

          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">② 乘法哈希</p>
            <svg viewBox="0 0 340 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="14" y="12" width="190" height="24" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="109" y="24" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">⌊m·(k·A mod 1)⌋</text>
              <rect x="20" y="52" width="100" height="40" rx="6" fill="#e0f2fe" stroke="#0891b2" stroke-width="1.5" />
              <text x="70" y="66" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">k·A 小数</text>
              <text x="70" y="82" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">A≈0.618</text>
              <line x1="120" y1="72" x2="176" y2="72" stroke="#94a3b8" stroke-width="2" marker-end="url(#m2-arr)" />
              <rect x="180" y="52" width="130" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="245" y="72" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">⌊7×0.612⌋=4</text>
              <text x="20" y="106" font-size="10" font-family="monospace" fill="#64748b">m 不敏感，2 的幂也行</text>
            </svg>
          </figure>

          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">③ 平方取中法</p>
            <svg viewBox="0 0 340 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="14" y="12" width="150" height="24" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="89" y="24" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">k² 取中间位</text>
              <rect x="20" y="52" width="130" height="40" rx="6" fill="#e0f2fe" stroke="#0891b2" stroke-width="1.5" />
              <text x="85" y="66" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">1234² = 1522756</text>
              <text x="85" y="82" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">中间 3 位高亮</text>
              <line x1="150" y1="72" x2="188" y2="72" stroke="#94a3b8" stroke-width="2" marker-end="url(#m3-arr)" />
              <rect x="192" y="52" width="110" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="247" y="72" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">227</text>
              <text x="20" y="106" font-size="10" font-family="monospace" fill="#64748b">历史悠久，现代很少用</text>
            </svg>
          </figure>

          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">④ 折叠法</p>
            <svg viewBox="0 0 340 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="14" y="12" width="150" height="24" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="89" y="24" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">分段后相加</text>
              <rect x="20" y="52" width="120" height="40" rx="6" fill="#e0f2fe" stroke="#0891b2" stroke-width="1.5" />
              <text x="80" y="72" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">12|34|56</text>
              <line x1="140" y1="72" x2="184" y2="72" stroke="#94a3b8" stroke-width="2" marker-end="url(#m4-arr)" />
              <rect x="188" y="52" width="120" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="248" y="72" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">12+34+56=102</text>
              <text x="20" y="106" font-size="10" font-family="monospace" fill="#64748b">适合身份证等超长 key</text>
            </svg>
          </figure>
        </div>
        <p class="text-xs text-slate-400 mt-2">图 1：四种哈希函数构造方法的计算示意 —— 共同目标是把 key 均匀映射到桶下标</p>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          除留余数法 —— 最简单也最常用的「取模」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          除留余数法（Division Method）就是取余数：
        </p>
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-1 text-center font-mono">h(k) = k mod m</p>
          <p class="text-xs text-cyan-600 text-center">把 key 除以 m，取余数作为桶下标（范围 [0, m-1]）</p>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          它只需要<strong>一次取模运算</strong>，性能最好，是绝大多数语言哈希表的首选。唯一的关键是——<strong>m 不能乱选</strong>，
          选得好分布均匀，选得差一半桶空着。
        </p>
        <div class="mb-4"><Code language="ts" :code="divisionCode" title="division_method.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          取模就像 CSS 栅格的 <code>col % 12</code>——把任意数值折进 12 列之内。<br/>
          又像「哈希轮盘赌」：key 是投进去的球，<code>% m</code> 是转盘，余数决定球落在哪个格子。
          </p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          为什么 m 要取素数 —— 除留余数法的命门
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          如果 m 取 2 的幂（如 8、16、32），<code>k mod m</code> 就等于取 k 的<strong>低几位二进制位</strong>——高位信息完全被丢弃。
          如果 key 恰好都是偶数（如所有 key 都是 12 的倍数），就会集中撞进少数桶。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>m = 8（2 的幂）vs m = 7（素数）的分布对比：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>m=8</strong>：key 12/24/36/48/60/72 全部只落到桶 0 和 4 —— 一半桶空着</span></li>
            <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span><strong>m=7</strong>：同样的 key 均匀落到桶 1~6 —— 分布好得多</span></li>
          </ul>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          取素数能让 key 和 m 的公约数最小化，从而避免「周期性聚集」。这就是为什么你常看到哈希表容量取
          <code>7、13、31、97、10007</code> 这类素数。
        </p>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>直接取 <code>m = 100</code>（10 的幂）或 <code>m = 2^k</code> 是很糟的选择。
          如果 key 尾数有规律（如学号后几位相同），取模会集中落到少数桶。工程中要么 m 取素数，要么配合乘法哈希消除对 m 的依赖。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          乘法哈希 —— 对 m 不敏感的「打散器」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          乘法哈希（Multiplication Method）用一个无理数把 key「打散」，再取小数部分映射到桶：
        </p>
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-1 text-center font-mono">h(k) = ⌊ m · ( (k · A) mod 1 ) ⌋</p>
          <p class="text-xs text-cyan-600 text-center">A 取黄金分割倒数 (√5 − 1)/2 ≈ 0.6180339887</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="mulCode" title="multiplication_method.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么是黄金分割倒数？</strong>因为它是最「无理」的常数之一，乘出来的小数部分在 [0,1) 上分布最均匀。
          这也是 <code>Math.random</code> 类库内部常用 A 值的原因——它能让连续的 key 也分散开。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          平方取中法 —— 来自计算机先驱的经典
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          平方取中法（Mid-Square Method）由冯·诺依曼在 1946 年提出：<strong>把 key 平方，取结果中间若干位作为哈希值</strong>。
          它曾在早期的伪随机数生成器中大放异彩，但因为分布质量不稳定，现代哈希表中已很少单独使用。
        </p>
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-1 text-center font-mono">1234² = 1522756 → 取中间 3 位 → 227</p>
          <p class="text-xs text-cyan-600 text-center">平方让每一位数字都参与进来，中间位受 key 整体影响</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="midCode" title="mid_square.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>平方取中法容易「退化」——某些 key 平方后中间位全是 0（如 key 以 0 结尾时），
          导致大量冲突。它更适合作为<strong>历史知识</strong>了解，实际开发请优先用除留余数法或乘法哈希。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          折叠法 —— 超长 key 的救星
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          折叠法（Folding Method）把超长的 key<strong>切成若干段，段内相加</strong>得到哈希值。它特别适合身份证号、
          学号、订单号这类「多位数字」的场景——因为这些 key 本身太长，没法直接当一个整数来取模。
        </p>
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-1 text-center font-mono">123456 → 12 + 34 + 56 = 102 → 102 mod m</p>
          <p class="text-xs text-cyan-600 text-center">每 2 位切一段，段内数字相加，再取模缩放到桶范围</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="foldCode" title="folding_method.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          折叠法就像把长字符串 <code>"hello world"</code> 按空格 <code>split(' ')</code> 成几段再分别处理——
          把「一整个大 key」拆成「多个小片段」分别参与运算，避免单个数字过大溢出。
          </p>
        </aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          四种方法优劣对比 —— 该选谁？
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方法</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">公式</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">优点</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">缺点</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">适用</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">除留余数法</td><td class="px-4 py-2 border font-mono">k mod m</td><td class="px-4 py-2 border">最快、最简单、分布好</td><td class="px-4 py-2 border">m 必须选好（素数）</td><td class="px-4 py-2 border text-emerald-600 font-semibold">最通用 ✅</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">乘法哈希</td><td class="px-4 py-2 border font-mono">⌊m·(kA mod 1)⌋</td><td class="px-4 py-2 border">对 m 不敏感</td><td class="px-4 py-2 border">浮点运算略慢</td><td class="px-4 py-2 border">语言内置实现</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">平方取中法</td><td class="px-4 py-2 border font-mono">k² 取中间位</td><td class="px-4 py-2 border">历史意义</td><td class="px-4 py-2 border">分布差、易退化</td><td class="px-4 py-2 border">教学了解</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">折叠法</td><td class="px-4 py-2 border font-mono">分段相加</td><td class="px-4 py-2 border">适合超长 key</td><td class="px-4 py-2 border">段划分有讲究</td><td class="px-4 py-2 border">身份证/学号</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>实际开发中<strong>几乎都用除留余数法</strong>（配合 m 取素数）或乘法哈希。
          对于字符串 key，先用多项式哈希转成数字（下一节讲），再用取模落到桶范围。平方取中法和折叠法了解思路即可。</p>
        </aside>
      </section>

      <!-- 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：除留余数法 h(k) = k mod 7
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          输入一个 key，观察它如何通过 <code>k mod 7</code> 算出桶下标，再写入对应桶。换个 key 试试，
          体会「余数决定落点」的映射过程。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-3 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 桶数量: {{ buckets.length }}（m=7 素数）</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status || 'h(k) = k mod 7' }}</span>
          <span class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ O(1)</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <input v-model="inpKey" type="number"
            class="w-24 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-shadow" placeholder="key" />
          <button @click="doCalc" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">计算 &amp; 插入</button>
          <button @click="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>除留余数法 h(k) = k mod m</strong> 是最常用方法，一次取模最快，但 <strong>m 要取素数</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>乘法哈希 ⌊m·(kA mod 1)⌋</strong> 用黄金分割倒数打散，对 m 不敏感</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>平方取中法</strong> 是历史经典，现代已很少用</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>折叠法</strong> 把超长 key 分段相加，适合身份证/学号</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>共同目标</strong>：均匀映射到桶，减少冲突，维持 O(1)</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-1-hash-func/dsa-3-1-1-principle" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：哈希表原理</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-1-hash-func/dsa-3-1-3-string-hash" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：字符串哈希 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// ===== 🎬 除留余数法动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const EMPTY = '#f1f5f9'
const H = ref(300), W = ref(700), BW = 54, G = 9, MXH = 220, BASE = 255
interface Bucket { id: number; val: number; color: string; s?: number; _x?: number; _y?: number; _h?: number }
const buckets = reactive<Bucket[]>([])
const M = 7
const busy = ref(false), status = ref('')
const inpKey = ref(24)
const box = ref<HTMLDivElement>()
const sh = (v: number) => Math.max(4, v)
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

function hash(k: number) { return ((k % M) + M) % M }

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

function doCalc() {
  const k = Math.floor(+inpKey.value)
  if (isNaN(k)) return
  act(`h(${k}) = ${k} mod 7`, async () => {
    const idx = hash(k)
    status.value = `h(${k}) = ${k} mod 7 = ${idx}`
    buckets[idx].color = C.orange; buckets[idx].s = 1.12; layout(); await d(550)
    const old = buckets[idx].val
    buckets[idx].val = k
    buckets[idx].color = C.green; buckets[idx].s = 1; layout(); await d(450)
    restore(idx)
    status.value = old > 0 ? `✅ 桶[${idx}] = ${k}（覆盖旧值 ${old}）` : `✅ 桶[${idx}] = ${k}`
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
  { id: "sec-1", name: "除留余数法" },
  { id: "sec-2", name: "m取素数" },
  { id: "sec-3", name: "乘法哈希" },
  { id: "sec-4", name: "平方取中法" },
  { id: "sec-5", name: "折叠法" },
  { id: "sec-6", name: "优劣对比" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

const divisionCode = `// ─── 除留余数法（Division Method）───
// h(k) = k mod m
// 最常用、最简单、性能最好（一次取模运算即可）

const divisionHash = (k: number, m: number): number => ((k % m) + m) % m

// 为什么 m 取素数？看 m=8 vs m=7 的差异
const keys = [12, 24, 36, 48, 60, 72]

console.log('m = 8（2 的幂，糟糕选择）:')
for (const k of keys) console.log(\`  \${k} % 8 = \${divisionHash(k, 8)}\`)
// 12%8=4  24%8=0  36%8=4  48%8=0  60%8=4  72%8=0
// ← 只落到 0 和 4 两个桶，一半桶空着，严重不均！

console.log('m = 7（素数，正确选择）:')
for (const k of keys) console.log(\`  \${k} % 7 = \${divisionHash(k, 7)}\`)
// 12%7=5  24%7=3  36%7=1  48%7=6  60%7=4  72%7=2
// ← 均匀撒到 1~6 六个桶，好得多

// 结论：
// 1. m 取素数时，key 与 m 的公约数最少，避免「周期性聚集」
// 2. 实际工程常用素数：7、13、31、97、10007、99991...
// 3. 注意负数 key 要先转正：((k % m) + m) % m`

const mulCode = `// ─── 乘法哈希（Multiplication Method）───
// h(k) = floor( m * ( (k * A) mod 1 ) )
// A 取黄金分割倒数 (√5 - 1) / 2 ≈ 0.6180339887
// 优点：对 m 不敏感，m 不需要是素数（2 的幂也行）

const A = (Math.sqrt(5) - 1) / 2   // ≈ 0.6180339887

function mulHash(k: number, m: number): number {
    const frac = (k * A) % 1        // 取 k*A 的小数部分（[0,1) 之间）
    return Math.floor(m * frac)     // 乘 m 后向下取整 → [0, m-1]
}

for (const k of [12, 24, 36, 48, 60, 72]) {
    const frac = (k * A) % 1
    console.log(\`k=\${k} → k·A 小数=\${frac.toFixed(3)} → ⌊7×小数⌋ = 桶 \${mulHash(k, 7)}\`)
}
// 原理：
// 1. 乘一个无理数再取小数，能把任意整数「打散」到 [0,1) 均匀分布
// 2. 再乘 m 取整，就得到均匀的桶下标
// 3. 因为 A 是无理数，key 的微小差异不会导致小数部分对齐

// 实用场景：Go/Java 等语言的 hashMap 内部，
// 常用位运算优化版本（把乘法换成移位 + 异或），但数学本质相同`

const midCode = `// ─── 平方取中法（Mid-Square Method）───
// 取 key 的平方，再取中间的若干位作为哈希值
// 由冯·诺依曼 1946 年提出，历史上曾用于伪随机数生成

function midSquare(k: number, digits = 3): number {
    const s = (k * k).toString()
    // 若位数不足，左侧补 0
    const padded = s.padStart(digits * 2, '0')
    const start = Math.floor(padded.length / 2) - Math.floor(digits / 2)
    return parseInt(padded.slice(Math.max(0, start), start + digits)) || 0
}

console.log(midSquare(1234))      // 1234² = 1522756 → 取中间 3 位 = 227
console.log(midSquare(42))        // 42² = 1764 → 补 0 后 = 001764 → 取 176

// 为什么取「中间位」而不是「开头/结尾」？
// - 开头位：主要由 key 的高位决定，低位信息丢失
// - 结尾位：主要由 key 的低位决定，高位信息丢失
// - 中间位：受 key 整体影响最大，分布相对均匀
// 但注意：key 以 0 结尾时，平方中间位容易退化 → 现代已少用`

const foldCode = `// ─── 折叠法（Folding Method）───
// 把超长 key 切成若干段，段内数字相加
// 适合身份证号、学号、订单号等多位数字场景

function foldHash(key: string, m: number, chunk = 2): number {
    let sum = 0
    for (let i = 0; i < key.length; i += chunk) {
        sum += parseInt(key.slice(i, i + chunk))   // 每 chunk 位一段
    }
    return sum % m
}

console.log(foldHash('12345678', 7))   // 12+34+56+78 = 180 → 180 % 7 = 5
console.log(foldHash('110105199001011234', 97))
// 身份证 18 位 → 每 2 位一段 = 9 段 → 段内相加 → 再 mod 97

// 折叠法的「折叠方式」有多种：
// 1. 移位折叠：12 | 34 | 56 → 12 + 34 + 56 = 102
// 2. 边界折叠：12 | 34 | 56 → 12 + 43 + 56 = 111（奇偶段反向）
//    反向相加能打散「相邻段数字相近」带来的聚集

// 适用场景：key 是超长数字串，无法直接作为整数取模`
</script>
