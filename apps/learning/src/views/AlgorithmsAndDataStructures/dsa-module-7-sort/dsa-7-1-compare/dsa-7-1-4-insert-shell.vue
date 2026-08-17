<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🃏 插入排序与希尔排序</h1>
          <p class="text-sm text-slate-500 mt-1">从「打牌理牌」到「跨步插入」—— 小规模与部分有序的利器</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-1-4</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：一张张插牌 vs 跨步分组精修
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>插入排序</strong>：把数组分成「已排序前缀 + 未排序后缀」，每轮把后缀的第一个元素<strong>向左插入</strong>到正确位置——就像打扑克一张张理牌。
          <strong>希尔排序</strong>：是插入排序的「跨步升级」——先按 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">gap</code> 分组做插入排序（远距离元素先大体归位），再缩小 gap 精修，最后 gap=1 退化为普通插入。
        </p>

        <!-- 插入排序 before / after -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="is1-l" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" /></marker>
            </defs>
            <text x="20" y="26" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">插入排序：新牌 1 向左找位（绿 = 已排序前缀，橙 = 新牌，红 = 被后移）</text>

            <!-- 排序前 -->
            <text x="20" y="56" font-size="12" font-family="monospace" fill="#64748b">排序前</text>
            <rect x="90"  y="40" width="56" height="40" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" /><text x="118" y="60" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
            <rect x="158" y="40" width="56" height="40" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" /><text x="186" y="60" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
            <rect x="226" y="40" width="56" height="40" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" /><text x="254" y="60" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
            <rect x="294" y="40" width="56" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" /><text x="322" y="60" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="362" y="40" width="56" height="40" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1" /><text x="390" y="60" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" fill="#94a3b8">?</text>
            <text x="322" y="96" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#d97706">新牌 1</text>

            <!-- 后移过程 -->
            <line x1="322" y1="112" x2="322" y2="136" stroke="#ef4444" stroke-width="2" marker-end="url(#is1-l)" />
            <text x="20" y="150" font-size="12" font-family="monospace" fill="#ef4444">后移：8→[3] 5→[2] 3→[1]（腾出位置）</text>
            <rect x="90"  y="134" width="56" height="40" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 3" /><text x="118" y="154" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" fill="#94a3b8">3</text>
            <rect x="158" y="134" width="56" height="40" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 3" /><text x="186" y="154" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" fill="#94a3b8">3</text>
            <rect x="226" y="134" width="56" height="40" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 3" /><text x="254" y="154" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" fill="#94a3b8">5</text>
            <rect x="294" y="134" width="56" height="40" rx="6" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 3" /><text x="322" y="154" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" fill="#94a3b8">8</text>
            <rect x="362" y="134" width="56" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" /><text x="390" y="154" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>

            <!-- 排序后 -->
            <line x1="322" y1="190" x2="322" y2="210" stroke="#4ade80" stroke-width="2" />
            <text x="20" y="212" font-size="12" font-family="monospace" fill="#16a34a">排序后（1 落位到最前）</text>
            <rect x="90"  y="196" width="56" height="40" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="118" y="216" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
            <rect x="158" y="196" width="56" height="40" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="186" y="216" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
            <rect x="226" y="196" width="56" height="40" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="254" y="216" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
            <rect x="294" y="196" width="56" height="40" rx="6" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="322" y="216" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：插入排序 —— 新牌向左比较，比它大的逐格后移，最后落位（虚拟「空位」从右往左移动）</figcaption>
        </figure>

        <!-- 希尔排序 gap 分组 -->
        <figure>
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="is2-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" /></marker>
            </defs>
            <text x="20" y="26" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">希尔排序：按 gap 分组，每组做插入排序，gap 递减到 1</text>
            <!-- gap=4 -->
            <text x="20" y="58" font-size="12" font-family="monospace" fill="#2563eb">gap=4：4 组（同色为一组），组内跨 4 步插入</text>
            <rect x="120" y="36" width="48" height="36" rx="5" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" /><text x="144" y="54" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="180" y="36" width="48" height="36" rx="5" fill="#06b6d4" stroke="#4ade80" stroke-width="2" /><text x="204" y="54" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="240" y="36" width="48" height="36" rx="5" fill="#06b6d4" stroke="#60a5fa" stroke-width="2" /><text x="264" y="54" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <rect x="300" y="36" width="48" height="36" rx="5" fill="#06b6d4" stroke="#ef4444" stroke-width="2" /><text x="324" y="54" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="360" y="36" width="48" height="36" rx="5" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" /><text x="384" y="54" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <rect x="420" y="36" width="48" height="36" rx="5" fill="#06b6d4" stroke="#4ade80" stroke-width="2" /><text x="444" y="54" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="480" y="36" width="48" height="36" rx="5" fill="#06b6d4" stroke="#60a5fa" stroke-width="2" /><text x="504" y="54" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="540" y="36" width="48" height="36" rx="5" fill="#06b6d4" stroke="#ef4444" stroke-width="2" /><text x="564" y="54" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <line x1="144" y1="76" x2="384" y2="76" stroke="#f59e0b" stroke-width="2" marker-end="url(#is2-a)" />
            <line x1="204" y1="76" x2="444" y2="76" stroke="#4ade80" stroke-width="2" marker-end="url(#is2-a)" />
            <line x1="264" y1="76" x2="504" y2="76" stroke="#60a5fa" stroke-width="2" marker-end="url(#is2-a)" />
            <line x1="324" y1="76" x2="564" y2="76" stroke="#ef4444" stroke-width="2" marker-end="url(#is2-a)" />
            <!-- gap=2 -->
            <text x="20" y="112" font-size="12" font-family="monospace" fill="#16a34a">gap=2：2 组（奇/偶位），组内跨 2 步插入</text>
            <rect x="120" y="92" width="48" height="36" rx="5" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" /><text x="144" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="180" y="92" width="48" height="36" rx="5" fill="#06b6d4" stroke="#4ade80" stroke-width="2" /><text x="204" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="240" y="92" width="48" height="36" rx="5" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" /><text x="264" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="300" y="92" width="48" height="36" rx="5" fill="#06b6d4" stroke="#4ade80" stroke-width="2" /><text x="324" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="360" y="92" width="48" height="36" rx="5" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" /><text x="384" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <rect x="420" y="92" width="48" height="36" rx="5" fill="#06b6d4" stroke="#4ade80" stroke-width="2" /><text x="444" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <rect x="480" y="92" width="48" height="36" rx="5" fill="#06b6d4" stroke="#f59e0b" stroke-width="2" /><text x="504" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <rect x="540" y="92" width="48" height="36" rx="5" fill="#06b6d4" stroke="#4ade80" stroke-width="2" /><text x="564" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <line x1="144" y1="132" x2="264" y2="132" stroke="#f59e0b" stroke-width="2" marker-end="url(#is2-a)" />
            <line x1="264" y1="132" x2="384" y2="132" stroke="#f59e0b" stroke-width="2" marker-end="url(#is2-a)" />
            <line x1="384" y1="132" x2="504" y2="132" stroke="#f59e0b" stroke-width="2" marker-end="url(#is2-a)" />
            <line x1="204" y1="132" x2="324" y2="132" stroke="#4ade80" stroke-width="2" marker-end="url(#is2-a)" />
            <line x1="324" y1="132" x2="444" y2="132" stroke="#4ade80" stroke-width="2" marker-end="url(#is2-a)" />
            <line x1="444" y1="132" x2="564" y2="132" stroke="#4ade80" stroke-width="2" marker-end="url(#is2-a)" />
            <!-- gap=1 -->
            <text x="20" y="176" font-size="12" font-family="monospace" fill="#ef4444">gap=1：整组就是普通插入排序 —— 此时数组已接近有序，几乎 O(n)</text>
            <rect x="120" y="158" width="48" height="36" rx="5" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="144" y="176" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
            <rect x="180" y="158" width="48" height="36" rx="5" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="204" y="176" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
            <rect x="240" y="158" width="48" height="36" rx="5" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="264" y="176" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
            <rect x="300" y="158" width="48" height="36" rx="5" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="324" y="176" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">4</text>
            <rect x="360" y="158" width="48" height="36" rx="5" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="384" y="176" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
            <rect x="420" y="158" width="48" height="36" rx="5" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="444" y="176" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">7</text>
            <rect x="480" y="158" width="48" height="36" rx="5" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="504" y="176" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
            <rect x="540" y="158" width="48" height="36" rx="5" fill="#4ade80" stroke="#16a34a" stroke-width="2" /><text x="564" y="176" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">9</text>
            <text x="360" y="232" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#16a34a">最终：[1,2,3,4,5,7,8,9] ✓</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：希尔排序的三轮 —— 每轮「跨步」让元素大体归位，最后一轮几乎零后移</figcaption>
        </figure>
      </section>

      <!-- 1. 插入排序思想 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          插入排序思想：把新牌插进已排序区
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          插入排序（Insertion Sort）模拟<strong>打扑克理牌</strong>：手里的牌已经排好序，摸到新牌就<strong>从右往左</strong>和已排序的牌比较，
          把比新牌大的逐张后移，找到合适位置插入。数组视角：<strong>前缀 [0..i-1] 已有序</strong>，把 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">arr[i]</code> 插入前缀。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>从 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">i=1</code> 开始，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">arr[i]</code> 是「新牌」</li>
          <li>用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">j = i-1</code> 从右往左扫描已排序前缀</li>
          <li>只要 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">arr[j] &gt; 新牌</code>，就把 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">arr[j]</code> 后移一位（腾出空位）</li>
          <li>找到第一个 ≤ 新牌的位置，把新牌落位 —— 前缀 [0..i] 恢复有序</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          插入排序就是 <strong>打扑克时一张张把新牌插到正确位置</strong>——左手拿着的牌永远有序，右手摸一张、插一张。<br/>
          它也是<strong>浏览器/V8 引擎排序的「小规模加速器」</strong>：数组长度 &lt; 10 时，V8 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Array.prototype.sort</code> 直接改用插入排序——因为 n 小时它的常数因子最小。<br/>
          <strong>希尔排序</strong> ≈ <strong>先粗略分组整好，再缩小 gap 精修</strong>——像整理一堆文件：先按「首字母」粗分几堆各自理好，再按「第二个字母」细分，逐步逼近全序。
          </p>
        </aside>
      </section>

      <!-- 2. 插入实现与复杂度 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          插入排序实现与复杂度
        </h2>
        <div class="mb-4"><Code language="ts" :code="insertionSortCode" title="insertion_sort.ts" /></div>
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
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">最好</td><td class="px-4 py-2 border border-slate-200">O(n)</td><td class="px-4 py-2 border border-slate-200">数组已有序——内层循环一次都不走</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">平均</td><td class="px-4 py-2 border border-slate-200">O(n²)</td><td class="px-4 py-2 border border-slate-200">每个新牌平均后移一半前缀</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">最坏</td><td class="px-4 py-2 border border-slate-200">O(n²)</td><td class="px-4 py-2 border border-slate-200">逆序数组——每个元素都要移到最前</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">空间</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">原地后移，只用一个临时变量</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">稳定性</td><td class="px-4 py-2 border border-slate-200">✅ 稳定</td><td class="px-4 py-2 border border-slate-200">后移条件是 &gt;（严格大于），相等的不动</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>后移方向写反</strong>——必须从右往左（<code>j = i-1</code> 递减），写成从左往右会覆盖未处理元素。<br/>
          ② <strong>循环退出后落位位置写错</strong>——退出时 <code>j</code> 已经指向「第一个 ≤ 新牌」的位置，落位要写 <code>arr[j+1] = cur</code>，写 <code>arr[j]</code> 会覆盖掉不该动的前缀元素。<br/>
          ③ <strong>把 <code>&gt;</code> 写成 <code>&gt;=</code></strong>——相等时也后移会破坏稳定性，且白白多搬数据。
          </p>
        </aside>
      </section>

      <!-- 3. 希尔排序思想 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          希尔排序思想：gap 分组插入
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          插入排序慢的原因：新牌只能<strong>一格一格</strong>往左挪，一个很小的元素在最右边时，要挪 n-1 步才到位（O(n) 一次）。
          <strong>希尔排序</strong>（Shell Sort）的洞察：先让元素<strong>大步快跑</strong>——按 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">gap</code> 分组，
          每组内做插入排序（间隔 gap 步移动），一轮下来「小元素已经大体靠左」；然后 gap 减半再排，最后 gap=1 就是普通插入排序，此时数组已接近有序 → 几乎 O(n)。
        </p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>分组规则</strong>：下标对 gap 取模相同的元素同组（如 gap=4：{0,4}、{1,5}、{2,6}、{3,7}）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>组内插入</strong>：完全复用插入排序逻辑，只是「相邻」变成「相隔 gap」</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>gap 递减</strong>：通常每次减半（gap = gap &gt;&gt; 1），直到 1</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>关键性质</strong>：前面的轮次让数组「部分有序」，最后一轮插入排序的移动量大幅减少</span></li>
        </ul>
        <div class="mb-4"><Code language="ts" :code="shellSortCode" title="shell_sort.ts" /></div>
      </section>

      <!-- 4. gap 序列 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          gap 序列：Hibbard / Sedgewick
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          希尔排序的复杂度<strong>完全取决于 gap 序列</strong>的选择——gap 选得好，元素更快到达「大致位置」。常见序列：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">序列</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">生成公式</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">例子</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">最坏复杂度</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">Shell 原始</td><td class="px-4 py-2 border border-slate-200">n/2, n/4, …, 1</td><td class="px-4 py-2 border border-slate-200">4, 2, 1</td><td class="px-4 py-2 border border-slate-200">O(n²)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">Hibbard</td><td class="px-4 py-2 border border-slate-200">2ᵏ−1</td><td class="px-4 py-2 border border-slate-200">…, 15, 7, 3, 1</td><td class="px-4 py-2 border border-slate-200">O(n^1.5)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">Sedgewick</td><td class="px-4 py-2 border border-slate-200">9·4ᵏ−9·2ᵏ+1 等</td><td class="px-4 py-2 border border-slate-200">…, 109, 41, 19, 5, 1</td><td class="px-4 py-2 border border-slate-200">O(n^(4/3))</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么 gap 互质（或接近互质）更好？</strong>若 gap 都是 2 的倍数，前一轮的「部分有序」在后一轮可能被破坏。
          Hibbard/Sedgewick 序列交错奇偶，让每轮都能复用前一轮的部分有序性——这也是它们能突破 O(n²) 的原因。</p>
        </aside>
      </section>

      <!-- 5. 复杂度与稳定性 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          复杂度与稳定性：希尔不稳定
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">插入排序</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">希尔排序</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">最好</td><td class="px-4 py-2 border border-slate-200">O(n)</td><td class="px-4 py-2 border border-slate-200">O(n log n) 左右（gap 递减）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">平均</td><td class="px-4 py-2 border border-slate-200">O(n²)</td><td class="px-4 py-2 border border-slate-200">取决于 gap 序列，约 O(n^1.3)~O(n^1.5)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">最坏</td><td class="px-4 py-2 border border-slate-200">O(n²)</td><td class="px-4 py-2 border border-slate-200">Shell 序列 O(n²)；Hibbard O(n^1.5)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">空间</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">O(1)（原地）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-semibold">稳定性</td><td class="px-4 py-2 border border-slate-200">✅ 稳定</td><td class="px-4 py-2 border border-slate-200">❌ 不稳定（跨组交换）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见误区：</strong><br/>
          ① <strong>以为希尔只是「快一点的插入」所以也稳定</strong>——错！分组后相等的元素可能被分到不同组、被跨组交换，相对顺序无法保证，<strong>希尔排序不稳定</strong>。<br/>
          ② <strong>把希尔复杂度记成固定的 O(n log n)</strong>——希尔的时间复杂度<strong>没有闭式结论</strong>，随 gap 序列变化（O(n^1.3)~O(n²)），面试别答死一个值。
          </p>
        </aside>
      </section>

      <!-- 6. 小规模混合排序 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">6</span>
          小规模混合排序：插入排序的用武之地（Tim 铺垫）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          插入排序 O(n²) 看起来很弱，但它的<strong>常数因子是所有比较排序里最小的</strong>。因此真实世界的引擎几乎都是「混合策略」：
          <strong>规模小 → 插入排序；规模大 → 快排/归并</strong>。这正是 V8 的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Array.prototype.sort</code>（长度 &lt; 10 用插入）、
          Python TimSort（run 长度 ≤ 32 用插入）的做法。
        </p>
        <div class="mb-4"><Code language="ts" :code="hybridSortCode" title="hybrid_sort.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 前端实践：</strong>排序「长度 &lt; 20 的下拉选项数组」「几十条的通知列表」时，直接写插入排序往往比调复杂算法更快——
          没有递归、没有临时数组、对几乎有序的数据接近 O(n)。TimSort（7-4-6）正是「插入 + 归并」的集大成者。</p>
        </aside>
      </section>

      <!-- 7. 优缺点与适用场景 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">7</span>
          优缺点与适用场景
        </h2>
        <h3 class="text-base font-semibold text-slate-700 mb-2">插入排序</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>优点：</strong>稳定、空间 O(1)、对<strong>部分有序/小规模</strong>数据几乎 O(n)、实现最简单</span></li>
          <li class="flex items-start gap-2"><span class="text-red-400 mt-1">▸</span><span><strong>缺点：</strong>大规模乱序数据 O(n²)，远慢于快排/归并</span></li>
        </ul>
        <h3 class="text-base font-semibold text-slate-700 mb-2">希尔排序</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>优点：</strong>原地 O(1) 空间、中等规模（几千~几万）明显快于插入/冒泡，实现也简单</span></li>
          <li class="flex items-start gap-2"><span class="text-red-400 mt-1">▸</span><span><strong>缺点：</strong>不稳定、复杂度无闭式结论、大数据量仍不如快排/归并/堆排序</span></li>
        </ul>
        <h3 class="text-base font-semibold text-slate-700 mb-2">适用场景</h3>
        <div class="mb-4"><Code language="ts" :code="useCaseCode" title="use_cases.ts" /></div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：插入排序 与 希尔排序
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          橙 = 正在比较/找位 · 红 = 后移（交换）· 绿 = 已排序区/落位 · 蓝 = 希尔当前分组。插入排序一张张向左插；希尔按 gap 分组跨步插入。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ bars.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔍 比较: {{ cmp }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔁 交换: {{ swp }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doInsertion" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">🃏 插入排序</button>
          <button @mousedown="doShell" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">⛰️ 希尔排序</button>
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>插入排序：</strong>新牌向左找位——最好 O(n) / 平均最坏 O(n²) / 空间 O(1) / <strong>稳定</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>希尔排序：</strong>gap 分组做插入，gap 递减到 1——<strong>不稳定</strong>，复杂度取决于 gap 序列</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>gap 序列：</strong>Shell 原始 O(n²) / Hibbard O(n^1.5) / Sedgewick O(n^(4/3))</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>坑：</strong>后移方向、落位 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">arr[j+1]=cur</code>、稳定条件 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">&gt;</code> 严格大于</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>价值：</strong>插入排序常数最小——V8/Python 的混合排序（TimSort）都用它处理小规模</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下一步：</strong>7-2 线性排序（计数/基数/桶）——用空间换时间，突破 O(n log n) 下界</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-1-compare/dsa-7-1-3-heap-sort" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：堆排序：建堆/排序/性能对比</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-2-linear-sort/dsa-7-2-1-counting" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：计数排序：稳定排序与适用范围 →</RouterLink>
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
  { id: "sec-1", name: "插入排序思想" },
  { id: "sec-2", name: "插入实现与复杂度" },
  { id: "sec-3", name: "希尔排序思想" },
  { id: "sec-4", name: "gap 序列" },
  { id: "sec-5", name: "复杂度与稳定性" },
  { id: "sec-6", name: "小规模混合排序" },
  { id: "sec-7", name: "优缺点与场景" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-8", name: "小结" },
]

// ===== 🎬 插入/希尔排序柱状图动画 =====
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

// 插入排序动画：新牌向左找位
async function insertionAni() {
  const n = bars.length
  for (let i = 1; i < n; i++) {
    allCyan()
    for (let t = 0; t < i; t++) colorAt(t, C.green)       // 已排序前缀
    const cur = bars[i].val
    colorAt(i, C.orange)
    status.value = `第 ${i} 张牌 ${cur}：向左找位`
    await d(450)
    let j = i - 1
    while (j >= 0) {
      cmp.value++
      colorAt(j, C.orange)
      status.value = `比较 ${bars[j].val} 与 ${cur}`
      await d(320)
      if (bars[j].val > cur) {
        swp.value++
        colorAt(j, C.red)
        status.value = `${bars[j].val} > ${cur} → 后移 [${j}]→[${j+1}]`
        await d(300)
        bars[j + 1].val = bars[j].val
        layout()
        colorAt(j + 1, C.cyan)
        await d(300)
        j--
      } else break
    }
    bars[j + 1].val = cur
    layout()
    colorAt(j + 1, C.green)
    status.value = `${cur} 落位 [${j+1}]`
    await d(350)
  }
  bars.forEach(b => b.color = C.green)
  status.value = '✅ 插入排序完成：[1,2,3,4,5,7,8,9]'
}

// 希尔排序动画：gap 分组跨步插入
async function shellAni() {
  const n = bars.length
  let gap = n >> 1                                     // 4 → 2 → 1
  while (gap >= 1) {
    status.value = `gap = ${gap}：按组做插入排序`
    await d(500)
    for (let i = gap; i < n; i++) {
      allCyan()
      for (let g = i % gap; g < n; g += gap) colorAt(g, C.blue)   // 标出当前 gap 组
      const cur = bars[i].val
      colorAt(i, C.orange)
      status.value = `gap=${gap}：组内元素标蓝，插入 ${cur}（下标 [${i}]）`
      await d(420)
      let j = i - gap
      while (j >= 0) {
        cmp.value++
        colorAt(j, C.orange)
        status.value = `比较 ${bars[j].val} 与 ${cur}（相隔 ${gap}）`
        await d(300)
        if (bars[j].val > cur) {
          swp.value++
          colorAt(j + gap, C.red)
          status.value = `${bars[j].val} > ${cur} → 后移 [${j}]→[${j+gap}]`
          await d(280)
          bars[j + gap].val = bars[j].val
          layout()
          await d(280)
          j -= gap
        } else break
      }
      bars[j + gap].val = cur
      layout()
      colorAt(j + gap, C.green)
      await d(320)
    }
    gap >>= 1
  }
  bars.forEach(b => b.color = C.green)
  status.value = '✅ 希尔排序完成：[1,2,3,4,5,7,8,9]'
}

function doInsertion() {
  act('插入排序', '最好 O(n) / 最坏 O(n²)', async () => { await insertionAni() })
}
function doShell() {
  act('希尔排序', '约 O(n^1.3) 平均', async () => { await shellAni() })
}
function doReset(){ initArr(); status.value=''; opLabel.value='' }

// ===== 代码示例 =====
const insertionSortCode = `// ===== 插入排序：把新牌插进已排序区 =====
function insertionSort(arr: number[]): void {
    const n = arr.length
    for (let i = 1; i < n; i++) {          // 从第 2 张开始
        const cur = arr[i]                 // 摸到的新牌
        let j = i - 1
        while (j >= 0 && arr[j] > cur) {   // 已排序区中比新牌大的
            arr[j + 1] = arr[j]            // 逐个后移，腾出空位
            j--
        }
        arr[j + 1] = cur                   // 新牌落位（注意是 j+1）
    }
}

// 手动模拟：[5,3,8,1]
// i=1 cur=3: 5>3 → 5 后移 → [5,5,8,1] → 3 落位 [0] → [3,5,8,1]
// i=2 cur=8: 5<8 → 不动                 → [3,5,8,1]
// i=3 cur=1: 8>1→后移, 5>1→后移, 3>1→后移 → [3,3,5,8] → 1 落位 [0] → [1,3,5,8] ✓
//
// 复杂度：最好 O(n)（已有序，内层一次不走）/
//         平均 O(n²)、最坏 O(n²)（逆序）/
//         空间 O(1) / 稳定（条件是严格 >，相等不搬）`

const shellSortCode = `// ===== 希尔排序：按 gap 分组做插入排序，gap 递减到 1 =====
function shellSort(arr: number[]): void {
    const n = arr.length
    let gap = n >> 1                       // 初始 gap = n/2（Shell 原始序列）
    while (gap >= 1) {
        for (let i = gap; i < n; i++) {    // 对每个 gap 组做插入排序
            const cur = arr[i]
            let j = i - gap
            while (j >= 0 && arr[j] > cur) {
                arr[j + gap] = arr[j]      // 跨 gap 步后移
                j -= gap
            }
            arr[j + gap] = cur
        }
        gap >>= 1                          // 缩小 gap
    }
}

// gap=4 分组示意（n=8）：组1 {0,4} 组2 {1,5} 组3 {2,6} 组4 {3,7}
// 每轮组内有序后，下一轮 gap 减半；最后一轮 gap=1 就是普通插入排序
// 关键：前面的轮次让数组「接近有序」，
//       最后一轮插入排序的移动量从 O(n²) 降到接近 O(n)

// 更好的 gap 序列（Hibbard）：3, 7, 15, 31, …
//   for (gap = 1; gap < n; gap = gap * 2 + 1);   // 先求最大 gap
//   for (; gap > 0; gap = (gap - 1) >> 1) { … }  // 递减使用`

const hybridSortCode = `// ===== 小规模混合排序：插入排序的用武之地（TimSort 铺垫）=====
function hybridQuickSort(arr: number[], lo = 0, hi = arr.length - 1): void {
    // ① 规模小（< 16）→ 插入排序：常数最小，避免递归/临时数组开销
    if (hi - lo < 16) {
        for (let i = lo + 1; i <= hi; i++) {
            const cur = arr[i]
            let j = i - 1
            while (j >= lo && arr[j] > cur) { arr[j + 1] = arr[j]; j-- }
            arr[j + 1] = cur
        }
        return
    }
    // ② 规模大 → 快排（partition 省略，见 7-1-1）
    const p = partitionLomuto(arr, lo, hi)
    hybridQuickSort(arr, lo, p - 1)
    hybridQuickSort(arr, p + 1, hi)
}

// 真实世界：
//   V8   Array.prototype.sort：长度 < 10 用插入排序
//   Python TimSort：run 长度 ≤ 32 用插入排序 + 归并
//   C++  std::sort（Introsort）：< 16 用插入排序
// 前端启示：排序「下拉选项数组 / 通知列表」这类小数据，
//   直接插入排序往往比调通用 sort 更划算`

const useCaseCode = `// ===== 插入 / 希尔排序适用场景速查 =====
// ✅ 插入排序：小规模（n < 50）、几乎有序的数据（增量更新）、
//    在线插入（每来一个元素插一次）、作为混合排序的「地基」
// ✅ 希尔排序：中等规模（几千~几万）且内存受限（空间 O(1)）、
//    嵌入式环境不想引入递归
// ❌ 回避：大规模乱序数据（快排/归并/堆排序完胜）、
//    需要稳定排序（希尔不稳定，插入虽稳定但慢）
//
// 前端案例：在「已排序的榜单」里插入一条新记录 ——
//   插入排序从尾部找位，几乎 O(n) 完成，正是它的高光场景`
</script>
