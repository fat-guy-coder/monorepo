<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🎯 选择排序：每次选出最小元素</h1>
          <p class="text-sm text-slate-500 mt-1">每轮从无序区挑最小，放到有序区末尾 —— 交换次数最少的 O(n²) 排序</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-4-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：扫描无序区选最小 → 交换到有序区末尾
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>选择排序</strong>：把数组分成<strong>有序区（绿）</strong>与<strong>无序区（青）</strong>两段，
          每轮<strong>扫描无序区找出最小值</strong>（橙色高亮），把它<strong>交换到无序区队首</strong>（就位变绿），
          有序区 +1。比较次数恒定 O(n²)，但<strong>交换次数最多 n−1 次</strong>——这是它最大的卖点。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="sl-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#0891b2" />
              </marker>
            </defs>
            <text x="16" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">选择排序：每轮从无序区「选出最小」，放到有序区末尾 —— 交换次数最少（≤ n−1）</text>

            <!-- 左：扫描选最小 -->
            <rect x="24" y="52" width="290" height="128" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
            <text x="169" y="70" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">第 3 轮：在无序区 [2..4] 选最小</text>
            <rect x="40" y="148" width="40" height="10" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" rx="3" />
            <text x="60" y="153" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
            <rect x="88" y="138" width="40" height="20" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" rx="3" />
            <text x="108" y="148" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
            <rect x="136" y="94" width="40" height="64" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="156" y="126" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <rect x="184" y="134" width="40" height="24" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" rx="3" />
            <text x="204" y="146" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="232" y="118" width="40" height="40" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="252" y="138" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <text x="169" y="172" text-anchor="middle" font-size="10" font-family="monospace" fill="#d97706" font-weight="bold">扫描完 [8,3,5] → 最小 = 3（橙色）</text>

            <!-- 箭头 -->
            <line x1="318" y1="116" x2="380" y2="116" stroke="#0891b2" stroke-width="2" marker-end="url(#sl-arr)" />

            <!-- 右：交换后 -->
            <rect x="384" y="52" width="312" height="128" rx="10" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5" />
            <text x="540" y="70" text-anchor="middle" font-size="11" font-family="monospace" fill="#16a34a">交换后：3 就位（绿色），有序区 +1</text>
            <rect x="400" y="148" width="40" height="10" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" rx="3" />
            <text x="420" y="153" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>
            <rect x="448" y="138" width="40" height="20" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" rx="3" />
            <text x="468" y="148" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
            <rect x="496" y="134" width="40" height="24" fill="#4ade80" stroke="#16a34a" stroke-width="2" rx="3" />
            <text x="516" y="146" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
            <rect x="544" y="94" width="40" height="64" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="564" y="126" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <rect x="592" y="118" width="40" height="40" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="612" y="138" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <text x="540" y="172" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">下一轮：在 [3..4] 选最小 → 整个排序最多交换 n−1 次</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：第 3 轮 —— 扫描无序区找到最小 3，与队首 8 交换后 3 就位</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：选最小并交换（就位） / 交换导致的稳定性问题</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">选最小并交换：3 就位到队首</p>
            <svg viewBox="0 0 300 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="sl-a1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a" />
                </marker>
              </defs>
              <text x="8" y="16" font-size="10" font-family="monospace" fill="#64748b">交换前（无序区）</text>
              <rect x="10" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="30" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="58" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="78" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <rect x="106" y="26" width="40" height="26" rx="3" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" />
              <text x="126" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <text x="160" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#d97706">↑最小</text>
              <line x1="140" y1="60" x2="140" y2="80" stroke="#16a34a" stroke-width="2" marker-end="url(#sl-a1)" />
              <text x="8" y="96" font-size="10" font-family="monospace" fill="#64748b">交换后（3 就位）</text>
              <rect x="10" y="106" width="40" height="26" rx="3" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="30" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
              <rect x="58" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="78" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="106" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="126" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <text x="8" y="152" font-size="10" font-family="monospace" font-weight="bold" fill="#16a34a">最小就位，有序区 +1 ✓</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">每轮只有 1 次交换 —— 全排序最多 n−1 次</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">为什么不稳定：交换会把相等元素甩到后面</p>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="sl-a2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                </marker>
              </defs>
              <text x="8" y="16" font-size="10" font-family="monospace" fill="#64748b">交换前：5a 在 5b 前面</text>
              <rect x="10" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="30" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">5a</text>
              <rect x="58" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="78" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="106" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="126" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">5b</text>
              <rect x="154" y="26" width="40" height="26" rx="3" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" />
              <text x="174" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <line x1="140" y1="60" x2="140" y2="80" stroke="#ef4444" stroke-width="2" marker-end="url(#sl-a2)" />
              <text x="8" y="96" font-size="10" font-family="monospace" fill="#64748b">最小 2 与队首 5a 交换 → 5a 甩到末尾</text>
              <rect x="10" y="106" width="40" height="26" rx="3" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" />
              <text x="30" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="58" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="78" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="106" y="106" width="40" height="26" rx="3" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
              <text x="126" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">5b</text>
              <rect x="154" y="106" width="40" height="26" rx="3" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
              <text x="174" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">5a</text>
              <text x="8" y="152" font-size="10" font-family="monospace" font-weight="bold" fill="#dc2626">5b 越过 5a ✗（顺序颠倒，不稳定）</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">交换式移动是选择排序不稳定的根源</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 思想 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          思想：每轮选最小，放到有序区末尾
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          与冒泡「边走边换」不同，选择排序<strong>先找到再交换</strong>：每轮只做<strong>一次交换</strong>，
          把无序区的最小元素放到队首。反复 n−1 轮后，整个数组有序——它把「比较」和「交换」彻底分离，
          因此<strong>交换次数恒为 n−1 次</strong>（或更少）。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>把数组分成<strong>有序区</strong> <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[0..i-1]</code> 与<strong>无序区</strong> <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[i..n-1]</code></li>
          <li><strong>扫描无序区</strong>，找出最小值的下标 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">min</code></li>
          <li>若 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">min !== i</code>，把 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">a[min]</code> 与队首 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">a[i]</code> 交换 → 最小就位</li>
          <li><code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i++</code> 重复，直到有序区覆盖全部 n 个元素</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          选择排序 ≈ <strong>从一叠扑克里每次挑最小的一张摆到左边</strong>：先把整叠牌看一遍记住最小的，
          抽出来放到左手边，再看剩下的、再抽最小的……直到全部抽完。<br/>
          「先找再换」≈ <strong>先确定目标再动手</strong>：不像冒泡那样看到相邻的就顺手换，
          而是这一轮只认准「全局最小」这一个目标，一次交换搞定——所以交换次数最少。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 1：把「找最小」和「交换」混在一起</strong><br/>
          有的写法在扫描过程中「见到小的就换」，结果一轮内多次交换——既失去了「交换最少」的优势，
          行为也退化成不彻底的冒泡。正确做法：<strong>先扫描确定 min 下标，循环结束后只交换一次</strong>。</p>
        </aside>
      </section>

      <!-- 2. 实现 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          实现：扫描找最小 + 单次交换
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          外层 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i</code> 是「有序区长度」，
          内层从 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i+1</code> 扫到末尾找最小；
          比较用<strong>严格小于</strong>（<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">&lt;</code>）保证取到「第一个」最小，
          但这并不能让算法变稳定（见第 5 节）。
        </p>
        <div class="mb-4"><Code language="ts" :code="selectionBasicCode" title="selection_basic.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          实现 ≈ <strong>先「看」后「动」的采购流程</strong>：内层循环是「货比三家找出最便宜的」，
          外层交换是「只把这一件搬上货架」——看的过程再长也不搬货，搬货只搬一次。<br/>
          严格小于 ≈ <strong>并列时选「先看到的」</strong>：分数相同取先到先得（虽然这不保证稳定）。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 2：忘记 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">min !== i</code> 判断</strong><br/>
          即使 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">min === i</code>（队首已经是最小），也做一次自我交换——
          没坏处，但白白多一次写操作。在「写代价昂贵」的场景里，<strong>每次无谓交换都是浪费</strong>。</p>
        </aside>
      </section>

      <!-- 3. 复杂度 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          复杂度：恒 O(n²)，空间 O(1)，交换最少 n−1 次，不稳定
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>比较次数恒为 n(n−1)/2</strong>：无论输入有序还是逆序，每轮都必须扫完整个无序区——
          <strong>没有提前终止</strong>，最好、平均、最坏都是 <strong>O(n²)</strong>。<br/>
          <strong>交换次数 ≤ n−1</strong>：每轮至多一次交换，这是所有 O(n²) 简单排序里最少的。<br/>
          <strong>空间 O(1)</strong> 原地；<strong>稳定性 ❌</strong>（交换会把队首元素甩到后面，可能越过相等元素）。
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-2">⏱️ 复杂度</p>
            <ul class="text-xs text-slate-600 space-y-1 font-mono">
              <li>最好：O(n²)（也要全扫）</li>
              <li>平均：O(n²)</li>
              <li>最坏：O(n²)</li>
              <li>比较次数：n(n−1)/2（恒定）</li>
              <li>交换次数：≤ n−1（最少！）</li>
              <li>空间：O(1)；稳定：❌ 不稳定</li>
            </ul>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-2">✅ 三件事</p>
            <ul class="text-xs text-slate-600 space-y-1">
              <li>▸ <strong>每轮</strong>：扫无序区 → 找最小 → 一次交换就位</li>
              <li>▸ <strong>对比冒泡</strong>：交换少（n−1 vs n²/2），比较一样多</li>
              <li>▸ <strong>对比插入</strong>：没有提前终止，近似有序也不快</li>
            </ul>
          </div>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          「交换少」的价值 ≈ <strong>写操作昂贵的存储</strong>：嵌入式设备的 Flash 擦写次数有限、
          数据库更新一页要重写整页——此时「比较免费、写入昂贵」，选择排序的「读多写少」正好对症。<br/>
          「没有提前终止」≈ <strong>每次都要重新检查整个无序区</strong>：就算队伍已经整齐，
          选择排序仍然会老老实实把剩下的人全部比一遍（比较次数恒定）。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：以为选择排序「最好情况更快」</strong><br/>
          选择排序<strong>没有提前终止</strong>：已有序的数组也要跑满 n(n−1)/2 次比较。
          和冒泡/插入（最好 O(n)）不同，它的最好、平均、最坏都是 O(n²)——选它唯一理由是「交换少」，不是「速度快」。</p>
        </aside>
      </section>

      <!-- 4. 优缺点与适用场景 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          优缺点与适用场景：写操作昂贵时的不二之选
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <p class="text-sm font-semibold text-emerald-700 mb-2">👍 优点</p>
            <ul class="text-xs text-emerald-800 space-y-1">
              <li>▸ 交换次数最少（≤ n−1），写代价极低</li>
              <li>▸ 原地 O(1)，不申请额外内存</li>
              <li>▸ 比较次数恒定可预测，无最坏退化</li>
              <li>▸ 实现简单，任何语言两分钟写完</li>
            </ul>
          </div>
          <div class="bg-red-50 rounded-xl p-4 border border-red-200">
            <p class="text-sm font-semibold text-red-600 mb-2">👎 缺点</p>
            <ul class="text-xs text-red-700 space-y-1">
              <li>▸ 恒 O(n²)，无提前终止，大数组不可用</li>
              <li>▸ 不稳定：交换可能颠倒相等元素顺序</li>
              <li>▸ 对近似有序的数据毫无优势（照扫全量）</li>
              <li>▸ 常数比插入排序大，几乎总是更慢</li>
            </ul>
          </div>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>适用场景</strong>：① <strong>写操作昂贵</strong>（嵌入式 Flash、数据库页重写、慢速存储）；
          ② 数据规模小（几百以内）且不要求稳定性；③ 内存极紧、只能原地排。
          前端日常排序用不上它（JS 内置 TimSort 更快更稳），但它是理解「读/写代价分离」的最佳教材。
        </p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          选择排序 ≈ <strong>昂贵的搬运工</strong>：每次搬一件大货要花钱（写代价），所以先仔细看准哪件最便宜/最小，
          一趟只搬一件——看得久没关系，搬得少才省钱。<br/>
          适用场景 ≈ <strong>Flash / SSD 的写放大</strong>：读不磨损、写才磨损；选择排序「读很多、写很少」，
          是磨损均衡友好的选择。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>看到「交换/写入代价高」→ 选选择排序；看到「近似有序」→ 选插入排序；
          看到「要稳定」→ 选归并/插入；只有纯教学或超小数据才考虑冒泡。</p>
        </aside>
      </section>

      <!-- 5. 稳定化讨论 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          稳定化讨论：用「插入」代替「交换」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          选择排序不稳定的根源是<strong>交换</strong>：把最小元素与队首交换时，队首元素被甩到后面，
          可能<strong>越过某个相等的元素</strong>。要稳定，就<strong>别交换，改平移</strong>——
          把 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[i..min-1]</code> 整体右移一格，再把最小值「插入」到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">i</code>。
          这样相等元素只被平移、不被跨越 → 稳定。代价是移动次数从 O(n) 升到 O(n²)。
          另外，<strong>双向选择排序</strong>（每轮同时选最大和最小）能把轮数减半，也是常见变体。
        </p>
        <div class="mb-4"><Code language="ts" :code="selectionDoubleCode" title="selection_double.ts" /></div>
        <div class="mb-4"><Code language="ts" :code="selectionStableCode" title="selection_stable.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          稳定化 ≈ <strong>「平移队伍」而不是「换位置」</strong>：要让最矮的站到队首，不是把他和队首直接对调
          （对调会把队首甩到后面插队），而是让中间的人整体后移一步、他插到最前面——没人被甩过别人。<br/>
          双向选择 ≈ <strong>同时处理队首和队尾</strong>：一趟选出最矮的站队首、最高的站队尾，两头同时收拢，趟数减半。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：双向选择的 max 下标陷阱</strong><br/>
          先交换 min 与 left 后，若 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">max === left</code>（最大值本来在队首），
          队首元素已被 min 换走，必须把 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">max</code> 修正为 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">min</code> 的新位置，
          否则会把错误元素放到队尾。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：选择排序
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          橙色 = 正在扫描/当前最小候选，红色 = 即将与队首交换的最小值，绿色 = 已就位（有序区）。
          注意每轮<strong>只交换一次</strong>，但扫描（比较）始终覆盖整个无序区。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ bars.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔍 比较: {{ cmp }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔁 交换: {{ swp }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
          <span v-if="result" class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">{{ result }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="runSelection" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">🎯 选择排序</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ 重置</button>
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
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>思想</strong>：有序区 + 无序区；每轮扫描无序区找最小，交换到队首就位，有序区 +1</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度</strong>：恒 O(n²)（无提前终止），空间 O(1)，交换 ≤ n−1 次（简单排序中最少）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>稳定性</strong>：❌ 不稳定——交换会把队首元素甩到后面，可能越过相等元素</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>适用场景</strong>：写操作昂贵（Flash/数据库页）、数据小、内存紧；读多写少是最大卖点</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>变体</strong>：双向选择（同时选最大最小，轮数减半）；平移代替交换可实现稳定版（移动升为 O(n²)）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>对比</strong>：比冒泡交换少；比插入无提前终止优势；工程排序请用内置 sort / 快排 / 归并</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-4-more-sorts/dsa-7-4-1-bubble" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：冒泡排序：相邻交换与提前终止优化</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-4-more-sorts/dsa-7-4-3-cocktail" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：鸡尾酒排序：双向冒泡 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "思想：选最小" },
  { id: "sec-2", name: "实现" },
  { id: "sec-3", name: "复杂度与特性" },
  { id: "sec-4", name: "优缺点/适用场景" },
  { id: "sec-5", name: "稳定化讨论" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "📋 小结" },
]

// ===== 🎬 选择排序动画（柱状图）=====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const result = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const cmp = ref(0), swp = ref(0)

interface Bar { id:number; val:number; color:string; s?:number; _x?:number; _y?:number; _h?:number }
const bars = reactive<Bar[]>([])
const BASE = 280, MXH = 220, BW = 46, G = 8

function initArr(vals: number[] = [8, 3, 5, 1, 9, 2, 7, 4]) {
  bars.splice(0)   // ⚠️ splice(0)
  vals.forEach((v, i) => bars.push({ id: i + 1, val: v, color: C.cyan, s: 1 }))
  cmp.value = 0; swp.value = 0; result.value = ''
  layout()
}
function layout() {
  const n = bars.length, bw = Math.min(BW, Math.floor((W.value - 20) / (n || 1) - G))
  const total = n * (bw + G) - G, sx = Math.max(10, (W.value - total) / 2), maxV = Math.max(...bars.map(b => b.val), 1)
  bars.forEach((b, i) => { b._x = sx + i * (bw + G); b._h = Math.max(28, (b.val / maxV) * MXH); b._y = BASE - b._h })
}
function barCfg(b: any) {
  const s = b.s ?? 1, bw = Math.min(BW, Math.floor((W.value - 20) / (bars.length || 1) - G))
  return { x: b._x + (bw * (1 - s)) / 2, y: b._y, width: bw * s, height: b._h * s, fill: b.color, cornerRadius: [4, 4, 0, 0],
    stroke: '#94a3b8', strokeWidth: 1, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function valCfg(b: any) {
  const s = b.s ?? 1, h = b._h * s, bw = Math.min(BW, Math.floor((W.value - 20) / (bars.length || 1) - G))
  return { x: b._x + (bw * (1 - s)) / 2, y: b._y + 2, width: bw * s, height: h - 4, text: String(b.val), fontSize: 14,
    fontFamily: 'monospace', fontStyle: 'bold', fill: h > 30 ? '#fff' : C.text, align: 'center', verticalAlign: 'middle' }
}
function idxCfg(i: number) {
  const bw = Math.min(BW, Math.floor((W.value - 20) / (bars.length || 1) - G))
  return { x: bars[i]._x ?? 0, y: BASE + 6, width: bw, text: '[' + i + ']', fontSize: 10, fontFamily: 'monospace', fill: C.muted, align: 'center' }
}
function colorAt(i: number, c: string) { if (bars[i]) bars[i].color = c }
function allCyan() { bars.forEach(b => b.color = C.cyan) }
async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch (_) { /* 忽略中断 */ }
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

// 选择排序：每轮扫描无序区找最小，一次交换就位
async function selectionSort() {
  for (let i = 0; i < bars.length - 1; i++) {
    let min = i
    colorAt(i, C.orange)
    status.value = `第 ${i + 1} 轮：在 [${i}..${bars.length - 1}] 中找最小`
    await d(400)
    for (let j = i + 1; j < bars.length; j++) {
      cmp.value++
      colorAt(j, C.orange)
      status.value = `比较 [${j}]（${bars[j].val}）与当前最小 [${min}]（${bars[min].val}）`
      await d(230)
      if (bars[j].val < bars[min].val) min = j
      colorAt(j, C.cyan)
    }
    colorAt(min, C.red)
    if (min !== i) {
      status.value = `选到最小 ${bars[min].val}（[${min}]）→ 与队首 [${i}]（${bars[i].val}）交换`
      await d(480)
      const t = { ...bars[min] }
      bars[min] = { ...bars[i] }
      bars[i] = t
      swp.value++
      layout()
      await d(300)
    } else {
      status.value = `队首 [${i}] 已经是最小，无需交换`
      await d(350)
    }
    colorAt(i, C.green)
    status.value = `[${i}] = ${bars[i].val} 就位（有序区 +1）`
    await d(300)
  }
  colorAt(bars.length - 1, C.green)
  result.value = `排序完成：比较 ${cmp.value} 次，交换 ${swp.value} 次（≤ n-1）`
}

function runSelection() { act('选择排序执行中…', '选择 O(n²) / 交换 ≤ n−1', selectionSort) }
function doReset() { if (busy.value) return; initArr() }

let ro: ResizeObserver | null = null
onMounted(() => {
  initArr()
  if (box.value) {
    W.value = box.value.clientWidth; layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const selectionBasicCode = `// ===== 选择排序：每轮选最小，交换到有序区末尾 =====
function selectionSort(arr: number[]): number[] {
  const a = [...arr]
  const n = a.length
  for (let i = 0; i < n - 1; i++) {
    let min = i                        // 假设队首就是最小
    for (let j = i + 1; j < n; j++) {  // 扫描整个无序区
      if (a[j] < a[min]) min = j       // 严格小于 → 更新最小下标
    }
    if (min !== i) {                   // 只在最后交换一次
      const t = a[i]; a[i] = a[min]; a[min] = t
    }
  }
  return a
}
// 比较次数恒为 n(n−1)/2：有序/逆序都一样 → 最好=平均=最坏 O(n²)
// 交换次数 ≤ n−1：所有 O(n²) 简单排序中最少（写代价最低）
console.log(\`选择结果：\${selectionSort([8, 3, 5, 1]).join(',')}\`)
// 输出：选择结果：1,3,5,8`

const selectionDoubleCode = `// ===== 双向选择排序：每轮同时选最大和最小 =====
function selectionSortDouble(arr: number[]): number[] {
  const a = [...arr]
  let left = 0, right = a.length - 1
  while (left < right) {
    let min = left, max = left
    for (let j = left + 1; j <= right; j++) {
      if (a[j] < a[min]) min = j
      if (a[j] > a[max]) max = j
    }
    // 先把最小放到队首 left
    const t1 = a[left]; a[left] = a[min]; a[min] = t1
    // ⚠️ 陷阱：最大值原本在队首 left，被 min 换走了 → 修正 max 下标
    if (max === left) max = min
    // 再把最大放到队尾 right
    const t2 = a[right]; a[right] = a[max]; a[max] = t2
    left++; right--
  }
  return a
}
// 每轮解决两个元素 → 轮数减半；比较次数仍约 n²/2，但常数略降`

const selectionStableCode = `// ===== 稳定化：用「平移插入」代替「交换」 =====
// 不稳定根源：min 与队首交换，队首被甩到后面，可能越过相等元素
// 稳定化思路：把 [i..min-1] 整体右移一格，把最小值插入到 i ——
// 相等元素只被平移、不被跨越 → 稳定
function selectionSortStable(arr: number[]): number[] {
  const a = [...arr]
  const n = a.length
  for (let i = 0; i < n - 1; i++) {
    let min = i
    for (let j = i + 1; j < n; j++) {
      if (a[j] < a[min]) min = j
    }
    const v = a[min]
    for (let k = min; k > i; k--) a[k] = a[k - 1]  // 整体右移
    a[i] = v
  }
  return a
}
// 代价：移动次数从 O(n) 升到 O(n²) —— 稳定要付出代价
// 工程上真需要「稳定 + 简单」，直接用插入排序（稳定且常数更小）`

</script>
