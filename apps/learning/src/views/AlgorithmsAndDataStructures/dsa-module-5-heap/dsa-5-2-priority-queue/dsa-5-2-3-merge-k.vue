<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔗 合并 K 个有序链表/数组</h1>
          <p class="text-sm text-slate-500 mt-1">K 个头节点进最小堆，每次取最小、接结果、补下一个——O(n log k)</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 5-2-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：K 路归并的「最小堆」调度
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          合并 K 个有序链表（LeetCode #23）的堆解法：把<strong>K 个链表的头节点</strong>全部塞进一个<strong>最小堆</strong>，
          之后反复做三步——<strong>① 弹出堆顶（当前全局最小）接到结果 ② 该节点所在链表的下一个节点入堆 ③ 维持最小堆</strong>。
          堆里永远只存 K 个「候选头」，每个节点进出堆一次 O(log k)，总共 O(n log k)。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="m3-e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">三个有序链表 → K 个头节点入最小堆 → 堆顶永远是「当前最小候选」</text>

            <!-- 三个链表 -->
            <text x="16" y="58" font-size="11" font-family="monospace" fill="#64748b">L0</text>
            <rect x="48" y="44" width="40" height="28" rx="5" fill="#06b6d4" stroke="#f59e0b" stroke-width="2.5" />
            <text x="68" y="58" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="92" y="44" width="40" height="28" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="112" y="58" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" fill="#64748b">4</text>
            <rect x="136" y="44" width="40" height="28" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="156" y="58" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" fill="#64748b">5</text>

            <text x="16" y="108" font-size="11" font-family="monospace" fill="#64748b">L1</text>
            <rect x="48" y="94" width="40" height="28" rx="5" fill="#06b6d4" stroke="#f59e0b" stroke-width="2.5" />
            <text x="68" y="108" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <rect x="92" y="94" width="40" height="28" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="112" y="108" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" fill="#64748b">3</text>
            <rect x="136" y="94" width="40" height="28" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="156" y="108" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" fill="#64748b">4</text>

            <text x="16" y="158" font-size="11" font-family="monospace" fill="#64748b">L2</text>
            <rect x="48" y="144" width="40" height="28" rx="5" fill="#06b6d4" stroke="#f59e0b" stroke-width="2.5" />
            <text x="68" y="158" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="92" y="144" width="40" height="28" rx="5" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="112" y="158" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" fill="#64748b">6</text>

            <!-- 箭头到堆 -->
            <line x1="200" y1="70" x2="360" y2="70" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#m3-e)" />
            <text x="230" y="58" font-size="11" font-family="monospace" fill="#64748b">K 个头入堆</text>

            <!-- 最小堆 -->
            <line x1="520" y1="84" x2="460" y2="146" stroke="#94a3b8" stroke-width="2" marker-end="url(#m3-e)" />
            <line x1="520" y1="84" x2="580" y2="146" stroke="#94a3b8" stroke-width="2" marker-end="url(#m3-e)" />
            <circle cx="520" cy="60" r="26" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="520" y="58" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <text x="520" y="76" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">L0</text>
            <circle cx="460" cy="140" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="460" y="138" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <text x="460" y="156" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">L1</text>
            <circle cx="580" cy="140" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="580" y="138" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <text x="580" y="156" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">L2</text>

            <text x="16" y="228" font-size="11" font-family="monospace" fill="#64748b">堆里永远只有 K 个「候选头」，堆顶 = 全局最小 → 弹出去接结果</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：K 个头节点入最小堆，堆顶即「当前所有链表里最小的节点」</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：弹出堆顶 1(L0) 接结果 → 把 L0 下一个 4 入堆</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-slate-500 font-semibold mb-1">弹出前：堆 [1(L0), 1(L1), 2(L2)]，结果 []</p>
            <svg viewBox="0 0 340 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="m3-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <line x1="150" y1="84" x2="90" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#m3-b)" />
              <line x1="150" y1="84" x2="210" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#m3-b)" />
              <circle cx="150" cy="60" r="24" fill="#ef4444" stroke="#dc2626" stroke-width="2.5" />
              <text x="150" y="58" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <text x="150" y="76" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#fecaca">L0</text>
              <circle cx="90" cy="130" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="90" y="128" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <text x="90" y="146" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">L1</text>
              <circle cx="210" cy="130" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="210" y="128" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <text x="210" y="146" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">L2</text>
              <text x="280" y="170" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">结果 []</text>
            </svg>
          </div>
          <div>
            <p class="text-xs text-slate-500 font-semibold mb-1">弹出后：结果 [1]，4(L0) 入堆</p>
            <svg viewBox="0 0 340 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="m3-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <line x1="150" y1="84" x2="90" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#m3-a)" />
              <line x1="150" y1="84" x2="210" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#m3-a)" />
              <circle cx="150" cy="60" r="24" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
              <text x="150" y="58" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <text x="150" y="76" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">L1</text>
              <circle cx="90" cy="130" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="90" y="128" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">4</text>
              <text x="90" y="146" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#16a34a">L0</text>
              <circle cx="210" cy="130" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="210" y="128" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <text x="210" y="146" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">L2</text>
              <text x="60" y="180" text-anchor="middle" font-size="11" font-family="monospace" fill="#16a34a">结果 [1]</text>
            </svg>
          </div>
        </div>
        <figcaption class="text-xs text-slate-400 mt-2">图 2：弹出最小 1(L0) 接结果，再补 L0 的下一个 4 入堆（保持堆里每链一个候选）</figcaption>
      </section>

      <!-- 1. 最小堆解法 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          最小堆解法 —— O(n log k) 的「多路归并」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          这是堆解决「多路归并」的标准范式：K 个头节点入堆后，<strong>每次弹出堆顶接到结果，再把该链表的下一个节点入堆</strong>。
          因为每条链表本身有序，堆顶一定等于「当前所有候选头里的最小值」，所以弹出的顺序就是最终合并顺序。
        </p>
        <div class="mb-4"><Code language="ts" :code="mergeKListsCode" title="merge_k_lists.ts" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>建堆：把 K 个链表的头节点全部 push 进最小堆</li>
          <li>循环：弹出堆顶 min → 接到 tail.next → tail 前进</li>
          <li>补位：若 min.next 存在，把它 push 进堆（维持「每链一个候选」）</li>
          <li>堆空即完成，返回 dummy.next（哨兵头节点省去判空）</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          合并 K 路就像<strong>归并排序的多路归并 / 外部排序</strong>：归并排序的两路 <code>merge</code> 是「两个指针比大小取小的」，
          K 路归并则把「两两比较」升级成「K 个候选里取最小」——这正好是堆的强项。<br/>
          也像 <strong>多个按时间排序的日志流合成一条时间线</strong>：每条流一个游标，每次取时间戳最小的那条、游标前进。
          </p>
        </aside>
      </section>

      <!-- 2. 分治归并对比 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          分治归并 —— 同为 O(n log k) 的另一种思路
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          不用堆也可以：把 K 条链表<strong>两两合并</strong>，一层层缩成一半，共 log k 层。每层合计比较 O(n) 次，总复杂度也是 O(n log k)。
          和堆解法同复杂度，但<strong>实现上堆更「流式」</strong>——无需递归分层，尤其适合数据流场景。
        </p>
        <div class="mb-4"><Code language="ts" :code="divideConquerCode" title="merge_k_divide.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 对比要点：</strong>堆解法的空间是 O(k)（堆里始终 K 个节点），分治递归栈 O(log k)。
          两者时间同 O(n log k)，但堆解法更直观、天然适配「元素逐个到达」的流式合并。</p>
        </aside>
      </section>

      <!-- 3. 数组版与复杂度 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          数组版实现与复杂度对比
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          若换成<strong>合并 K 个有序数组</strong>（无链表指针），思路一模一样：维护每个数组的<strong>读指针</strong>，
          堆里存「(值, 来自哪个数组)」，弹出后把该数组指针后移的元素入堆。
        </p>
        <div class="mb-4"><Code language="ts" :code="mergeArraysCode" title="merge_k_arrays.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">解法</th><th class="px-4 py-2 border border-slate-200 font-semibold">复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold text-red-600">① 逐个合并</td><td class="px-4 py-2 border font-mono">O(k · n)</td><td class="px-4 py-2 border">第 i 次合并要扫描前 i-1 条的总长度，重复比较</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-emerald-600">② 分治归并</td><td class="px-4 py-2 border font-mono">O(n log k)</td><td class="px-4 py-2 border">两两合并，log k 层</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">③ 最小堆</td><td class="px-4 py-2 border font-mono">O(n log k)</td><td class="px-4 py-2 border">堆里恒 K 个候选，空间 O(k)</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>补位逻辑漏写</strong>：只弹出、不把 <code>min.next</code> 入堆，会导致堆越来越小、只合并出每个链表的头节点。<br/>
          ② <strong>空链表没跳过</strong>：初始化时若某个链表是 <code>null</code>，直接 <code>heap.push(null)</code> 会在比较 <code>.val</code> 时抛错，必须 <code>if (head) push</code>。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：最小堆合并 K 路
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          上方的树是最小堆（节点 = 各链表的候选头，圈下 <code>Lx</code> 标注来自哪条链表），下方绿色是逐步生成的合并结果。
          橙色 = 即将弹出的堆顶，红色 = 弹出，绿色 = 新入堆的节点。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 堆大小: {{ heapElts.length }}/{{ listCount }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">📦 结果长度: {{ result.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doMerge" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">🔗 最小堆合并 K 路</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 剩余链表（左上角） -->
              <v-text v-for="(lst, li) in listsRemain" :key="'lr'+li" :config="listRowCfg(li)" />
              <!-- 堆 -->
              <v-line v-for="e in tEdges" :key="'e'+e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="tTextCfg(n)" />
              <v-text v-for="n in tNodes" :key="'li'+n.id" :config="liTextCfg(n)" />
              <!-- 合并结果 -->
              <v-rect v-for="(v, i) in result" :key="'r'+i" :config="resRectCfg(i)" />
              <v-text v-for="(v, i) in result" :key="'rt'+i" :config="resTextCfg(i, v)" />
              <v-text v-if="annot" :config="{x:14, y:H-30, text:annot, fontSize:13, fontFamily:'monospace', fontStyle:'bold', fill:'#f59e0b'}" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>核心范式：</strong>K 个头节点入最小堆，反复「弹堆顶接结果 + 该链下一个入堆」</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度：</strong>n 个节点每个进出堆一次 O(log k)，总 O(n log k)，空间 O(k)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>对比：</strong>逐个合并 O(k·n) 最慢；分治归并 O(n log k) 但需递归分层；堆最流式</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>数组版：</strong>每个数组维护读指针，堆里存「(值, 数组下标)」，逻辑一致</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>易错点：</strong>补位别漏、空链表别入堆</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-2-priority-queue/dsa-5-2-2-kth-stream" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：数据流中第 K 大/中位数</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-2-priority-queue/dsa-5-2-4-schedule" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：任务调度与 Dijkstra 优化 →</RouterLink>
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
  { id: "sec-1", name: "最小堆 O(n log k)" },
  { id: "sec-2", name: "分治归并" },
  { id: "sec-3", name: "数组版与对比" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-4", name: "小结" },
]

// ===== 🎬 合并 K 路动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const R = 22, LEVEL_H = 84, TOP = 96, RES_Y = 292
const H = ref(380), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

const inputLists = [[1, 4, 5], [1, 3, 4], [2, 6]]
const listCount = inputLists.length
const listsRemain = ref<number[][]>([])
const heapElts = ref<{val: number; li: number}[]>([])
const result = ref<number[]>([])
const annot = ref('')

interface TNode { id: number; val: number; x: number; y: number; color: string; s?: number; li?: number }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{a: number; b: number}[]>([])

function pos(id: number): TNode { return tNodes.find(n => n.id === id) ?? { id, val: 0, x: 0, y: 0, color: C.cyan, s: 1 } }

function layoutHeap() {
  tNodes.length = 0; tEdges.length = 0
  const arr = heapElts.value
  const n = arr.length
  let level = [0], y = TOP
  while (level.length) {
    const gap = W.value / (level.length + 1)
    level.forEach((idx, i) => {
      tNodes.push({ id: idx, val: arr[idx].val, li: arr[idx].li, x: gap * (i + 1), y, color: C.cyan, s: 1 })
    })
    const next: number[] = []
    level.forEach(idx => {
      const l = 2 * idx + 1, r = 2 * idx + 2
      if (l < n) { tEdges.push({ a: idx, b: l }); next.push(l) }
      if (r < n) { tEdges.push({ a: idx, b: r }); next.push(r) }
    })
    level = next; y += LEVEL_H
  }
}

function edgeCfg(e: {a: number; b: number}) {
  const pa = pos(e.a), pb = pos(e.b)
  return { points: [pa.x, pa.y + R, pb.x, pb.y - R], stroke: '#94a3b8', strokeWidth: 2 }
}
function circleCfg(n: any) {
  const s = n.s ?? 1
  return { x: n.x, y: n.y, radius: R * s, fill: n.color, stroke: n.color === C.orange ? '#d97706' : '#64748b', strokeWidth: n.color === C.orange ? 3 : 1.5, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function tTextCfg(n: any) {
  const s = n.s ?? 1
  return { x: n.x - R, y: n.y - R, width: R * 2, height: R * 2, text: String(n.val), fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: n.color === C.green ? '#0f172a' : '#fff', align: 'center', verticalAlign: 'middle', scale: { x: s, y: s } }
}
function liTextCfg(n: any) {
  return { x: n.x, y: n.y + R + 8, text: 'L' + (n.li ?? ''), fontSize: 11, fontFamily: 'monospace', fill: C.muted, align: 'center' as any }
}
function listRowCfg(li: number) {
  return { x: 14, y: 20 + li * 20, text: 'L' + li + ': [' + (listsRemain.value[li] ?? []).join(', ') + ']', fontSize: 12, fontFamily: 'monospace', fill: C.muted }
}
function resRectCfg(i: number) {
  const isLast = i === result.value.length - 1
  return { x: 20 + i * 38, y: RES_Y, width: 32, height: 32, cornerRadius: 6, fill: isLast ? C.green : C.cyan, stroke: isLast ? '#22c55e' : '#64748b', strokeWidth: 1.5, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 4, shadowOffsetY: 2 }
}
function resTextCfg(i: number, v: number) {
  return { x: 20 + i * 38, y: RES_Y, width: 32, height: 32, text: String(v), fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: i === result.value.length - 1 ? '#0f172a' : '#fff', align: 'center', verticalAlign: 'middle' }
}

async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch (_) {}
  finally { await d(300); busy.value = false; status.value = ''; opLabel.value = '' }
}

async function heapSiftUp(i: number) {
  while (i > 0) {
    const p = (i - 1) >> 1
    const a = heapElts.value[i], b = heapElts.value[p]
    pos(i).color = C.orange; pos(p).color = C.orange
    annot.value = `比较 ${a.val} 与父 ${b.val}`
    await d(280)
    if (a.val >= b.val) { pos(i).color = C.cyan; pos(p).color = C.cyan; return }
    ;[heapElts.value[i], heapElts.value[p]] = [heapElts.value[p], heapElts.value[i]]
    layoutHeap()
    pos(i).color = C.green; pos(p).color = C.green; await d(240)
    pos(i).color = C.cyan; pos(p).color = C.cyan
    i = p
  }
}

async function heapSiftDown(i: number) {
  const n = heapElts.value.length
  while (true) {
    const l = 2 * i + 1, r = 2 * i + 2
    let small = i
    if (l < n && heapElts.value[l].val < heapElts.value[small].val) small = l
    if (r < n && heapElts.value[r].val < heapElts.value[small].val) small = r
    if (small === i) { pos(i).color = C.cyan; return }
    annot.value = `siftDown: ${heapElts.value[i].val} 下沉`
    pos(i).color = C.orange; pos(small).color = C.orange
    await d(280)
    ;[heapElts.value[i], heapElts.value[small]] = [heapElts.value[small], heapElts.value[i]]
    layoutHeap()
    pos(i).color = C.green; pos(small).color = C.green; await d(240)
    pos(i).color = C.cyan; pos(small).color = C.cyan
    i = small
  }
}

function resetAll() {
  listsRemain.value = inputLists.map(l => [...l])
  heapElts.value = []; result.value = []; annot.value = ''
  layoutHeap()
  status.value = ''; opLabel.value = ''
}

function doMerge() {
  act('最小堆合并 K 路', 'O(n log k)', async () => {
    listsRemain.value = inputLists.map(l => [...l])
    heapElts.value = []; result.value = []; annot.value = ''
    layoutHeap()

    // 初始化：K 个头节点入堆
    status.value = 'K 个头节点入堆'
    for (let li = 0; li < listsRemain.value.length; li++) {
      const v = listsRemain.value[li].shift()!
      heapElts.value.push({ val: v, li })
      layoutHeap()
      const id = heapElts.value.length - 1
      pos(id).color = C.green; pos(id).s = 0; await d(60); pos(id).s = 1; await d(180)
      await heapSiftUp(id)
      layoutHeap()
      annot.value = ''
    }

    // 主循环：弹堆顶 → 接结果 → 补下一个
    while (heapElts.value.length) {
      const top = heapElts.value[0]
      annot.value = `取最小 ${top.val}（来自 L${top.li}）`
      status.value = `弹出堆顶 ${top.val}`
      pos(0).color = C.orange; await d(360)
      pos(0).color = C.red; await d(240)

      // 弹出（移除根，末元素补位）
      const last = heapElts.value.pop()!
      if (heapElts.value.length) { heapElts.value[0] = last; layoutHeap(); await heapSiftDown(0) }
      else layoutHeap()

      // 接结果
      result.value.push(top.val)
      annot.value = `结果追加 ${top.val}`
      await d(280)

      // 该链表下一个入堆
      if (listsRemain.value[top.li].length) {
        const nv = listsRemain.value[top.li].shift()!
        heapElts.value.push({ val: nv, li: top.li })
        layoutHeap()
        const id = heapElts.value.length - 1
        annot.value = `L${top.li} 下一个 ${nv} 入堆`
        pos(id).color = C.green; pos(id).s = 0; await d(60); pos(id).s = 1; await d(180)
        await heapSiftUp(id)
        layoutHeap()
      }
      annot.value = ''
      await d(220)
    }
    status.value = `完成！合并结果: [${result.value.join(', ')}]`
    await d(300)
  })
}

function doReset() { resetAll() }

let ro: ResizeObserver | null = null
onMounted(() => {
  resetAll()
  if (box.value) {
    W.value = box.value.clientWidth; layoutHeap()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layoutHeap() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const mergeKListsCode = `// ===== 合并 K 个有序链表（LeetCode #23）=====
class ListNode {
    val: number
    next: ListNode | null
    constructor(val = 0, next: ListNode | null = null) { this.val = val; this.next = next }
}

// 最小堆：按节点值比较
class MinHeap {
    private data: ListNode[] = []
    get size() { return this.data.length }
    push(n: ListNode) { this.data.push(n); this.siftUp(this.data.length - 1) }
    pop(): ListNode | undefined {
        const top = this.data[0]
        const last = this.data.pop()!
        if (this.data.length) { this.data[0] = last; this.siftDown(0) }
        return top
    }
    private siftUp(i: number) {
        while (i > 0) {
            const p = (i - 1) >> 1
            if (this.data[i].val >= this.data[p].val) break
            ;[this.data[i], this.data[p]] = [this.data[p], this.data[i]]
            i = p
        }
    }
    private siftDown(i: number) {
        const n = this.data.length
        while (true) {
            const l = 2 * i + 1, r = 2 * i + 2
            let small = i
            if (l < n && this.data[l].val < this.data[small].val) small = l
            if (r < n && this.data[r].val < this.data[small].val) small = r
            if (small === i) break
            ;[this.data[i], this.data[small]] = [this.data[small], this.data[i]]
            i = small
        }
    }
}

function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
    const heap = new MinHeap()
    const dummy = new ListNode(-1)            // 哨兵头，省去空结果判空
    let tail = dummy
    for (const head of lists) if (head) heap.push(head)  // K 个头入堆
    while (heap.size) {
        const min = heap.pop()!               // 弹出当前全局最小
        tail.next = min                       // 接到结果尾部
        tail = min
        if (min.next) heap.push(min.next)     // 该链下一个节点入堆
    }
    return dummy.next
}
// n 个节点每个进出堆一次 O(log k)，总复杂度 O(n log k)`

const divideConquerCode = `// ===== 分治归并：两两合并，O(n log k) =====
function mergeKListsDC(lists: (ListNode | null)[]): ListNode | null {
    if (!lists.length) return null
    return mergeRange(lists, 0, lists.length - 1)
}

function mergeRange(lists: (ListNode | null)[], l: number, r: number): ListNode | null {
    if (l === r) return lists[l]                 // 只剩一条，直接返回
    const m = (l + r) >> 1
    return mergeTwo(
        mergeRange(lists, l, m),                 // 左半合并结果
        mergeRange(lists, m + 1, r),             // 右半合并结果
    )
}

function mergeTwo(a: ListNode | null, b: ListNode | null): ListNode | null {
    const dummy = new ListNode(-1)
    let tail = dummy
    while (a && b) {
        if (a.val <= b.val) { tail.next = a; a = a.next }
        else { tail.next = b; b = b.next }
        tail = tail.next
    }
    tail.next = a ?? b                           // 剩余整段接上
    return dummy.next
}
// 每次 mergeTwo O(长度)，共 log k 层，总 O(n log k)
// 和堆同复杂度，但堆更流式：无需递归分层，天然适配数据流`

const mergeArraysCode = `// ===== 合并 K 个有序数组（数组版，无链表指针）=====
type Item = { val: number; arr: number }

class ItemHeap {
    private data: Item[] = []
    get size() { return this.data.length }
    push(it: Item) { this.data.push(it); this.siftUp(this.data.length - 1) }
    pop(): Item | undefined {
        const top = this.data[0]
        const last = this.data.pop()!
        if (this.data.length) { this.data[0] = last; this.siftDown(0) }
        return top
    }
    private siftUp(i: number) {
        while (i > 0) {
            const p = (i - 1) >> 1
            if (this.data[i].val >= this.data[p].val) break
            ;[this.data[i], this.data[p]] = [this.data[p], this.data[i]]
            i = p
        }
    }
    private siftDown(i: number) {
        const n = this.data.length
        while (true) {
            const l = 2 * i + 1, r = 2 * i + 2
            let small = i
            if (l < n && this.data[l].val < this.data[small].val) small = l
            if (r < n && this.data[r].val < this.data[small].val) small = r
            if (small === i) break
            ;[this.data[i], this.data[small]] = [this.data[small], this.data[i]]
            i = small
        }
    }
}

function mergeKArrays(arrays: number[][]): number[] {
    const heap = new ItemHeap()
    const idx = new Array(arrays.length).fill(0)      // 每个数组的读指针
    for (let i = 0; i < arrays.length; i++) {
        if (arrays[i].length) heap.push({ val: arrays[i][0], arr: i })
    }
    const res: number[] = []
    while (heap.size) {
        const { val, arr } = heap.pop()!
        res.push(val)
        idx[arr]++
        if (idx[arr] < arrays[arr].length) {
            heap.push({ val: arrays[arr][idx[arr]], arr })   // 该数组下一个入堆
        }
    }
    return res
}
// mergeKArrays([[1,4,5],[1,3,4],[2,6]]) = [1,1,2,3,4,4,5,6]
// 复杂度 O(n log k)：n = 总元素数，k = 数组个数`
</script>
