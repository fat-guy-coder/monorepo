<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🏆 Top-K 问题：堆 vs 快速选择</h1>
          <p class="text-sm text-slate-500 mt-1">找「最大的 K 个」——小顶堆守门 O(n log k)，快速选择分界 O(n)</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 5-2-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：一个 K 大小的小顶堆守门
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Top-K 的堆解法核心是<strong>「小顶堆守门」</strong>：用一个容量为 K 的<strong>小顶堆</strong>装下「目前看到的最大的 K 个」。
          堆顶是这 K 个里<strong>最小的那个</strong>——它就是「门槛」。新元素只要不大于门槛，就说明不够格进 Top-K，直接丢弃；
          一旦比门槛大，就<strong>淘汰门槛（堆顶）、把新元素换进来</strong>，再下沉（siftDown）把新的最小者浮到堆顶。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="t1-e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">小顶堆（K=3）：堆顶 = Top-3 的「门槛」= 目前最大 3 个里最小的</text>

            <!-- 边 -->
            <line x1="360" y1="84" x2="200" y2="176" stroke="#94a3b8" stroke-width="2" marker-end="url(#t1-e)" />
            <line x1="360" y1="84" x2="520" y2="176" stroke="#94a3b8" stroke-width="2" marker-end="url(#t1-e)" />

            <!-- 节点（根是门槛，橙色描边强调） -->
            <circle cx="360" cy="60" r="26" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="360" y="58" text-anchor="middle" dominant-baseline="central" font-size="17" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <text x="360" y="76" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">堆顶=门槛</text>

            <circle cx="200" cy="160" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="200" y="158" text-anchor="middle" dominant-baseline="central" font-size="17" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
            <text x="200" y="176" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">[1]</text>

            <circle cx="520" cy="160" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="520" y="158" text-anchor="middle" dominant-baseline="central" font-size="17" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <text x="520" y="176" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">[2]</text>

            <text x="360" y="226" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">数组存储：[5, 6, 9]　→　Top-3 = {5, 6, 9}</text>
            <text x="16" y="288" font-size="11" font-family="monospace" fill="#64748b">结论：堆里永远只留「够格的 K 个」，堆顶 O(1) 就能读出当前门槛</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：K=3 的小顶堆，堆顶 5 是「门槛」——所有比它小的元素都进不了 Top-3</figcaption>
        </figure>

        <!-- 操作示意图：替换堆顶 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：新元素 8 到来（8 &gt; 门槛 5）→ 替换堆顶 + siftDown</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-slate-500 font-semibold mb-1">替换前：堆 [5,6,9]，新元素 8</p>
            <svg viewBox="0 0 340 180" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="t1-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <line x1="150" y1="74" x2="70" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#t1-b)" />
              <line x1="150" y1="74" x2="230" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#t1-b)" />
              <!-- 被淘汰的堆顶 -->
              <circle cx="150" cy="50" r="24" fill="#ef4444" stroke="#dc2626" stroke-width="2.5" />
              <text x="150" y="50" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
              <circle cx="70" cy="130" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="70" y="130" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
              <circle cx="230" cy="130" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="230" y="130" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <!-- 新元素 -->
              <circle cx="290" cy="50" r="22" fill="#4ade80" stroke="#22c55e" stroke-width="2" stroke-dasharray="4 3" />
              <text x="290" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
              <text x="290" y="120" text-anchor="middle" font-size="11" font-family="monospace" fill="#16a34a">8 &gt; 5，进堆</text>
            </svg>
          </div>
          <div>
            <p class="text-xs text-slate-500 font-semibold mb-1">替换后：siftDown 让 8 下沉，6 浮到堆顶</p>
            <svg viewBox="0 0 340 180" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="t1-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <line x1="150" y1="74" x2="70" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#t1-a)" />
              <line x1="150" y1="74" x2="230" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#t1-a)" />
              <circle cx="150" cy="50" r="24" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
              <text x="150" y="50" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
              <circle cx="70" cy="130" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="70" y="130" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
              <circle cx="230" cy="130" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="230" y="130" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
              <text x="150" y="150" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">新堆 [6,8,9]，门槛升到 6</text>
            </svg>
          </div>
        </div>
        <figcaption class="text-xs text-slate-400 mt-2">图 2：替换堆顶后，8 被 siftDown 压到左孩子，最小的 6 成为新门槛</figcaption>
      </section>

      <!-- 1. 问题与三种解法 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          问题定义与三种解法对比
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          给定数组 <code>nums</code> 和整数 <code>k</code>，求<strong>最大的 K 个元素</strong>（或第 K 大，等价于 Top-K 里的最小值）。
          这是 LeetCode #215（第 K 大）和无数业务场景的母题。三种解法各有胜场：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">解法</th><th class="px-4 py-2 border border-slate-200 font-semibold">思路</th><th class="px-4 py-2 border border-slate-200 font-semibold">复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold">适用</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold text-slate-700">① 全排序</td><td class="px-4 py-2 border">降序排序后取前 K</td><td class="px-4 py-2 border font-mono">O(n log n)</td><td class="px-4 py-2 border">n 不大、需要有序结果</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">② 小顶堆</td><td class="px-4 py-2 border">维护 K 大小的小顶堆守门</td><td class="px-4 py-2 border font-mono">O(n log k)</td><td class="px-4 py-2 border">K ≪ n、数据流式到达</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-emerald-700">③ 快速选择</td><td class="px-4 py-2 border">分区定位第 K 大的分界点</td><td class="px-4 py-2 border font-mono">平均 O(n)</td><td class="px-4 py-2 border">K 接近 n/2、可容忍打乱数组</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Top-K 就像<strong>实时排行榜 Top 100</strong>：服务器不需要把几百万玩家的分数全排序，只要维护一个<strong>「第 100 名」的最低分数线</strong>。
          有人刷新记录 → 和分数线比：超过就挤进榜单、分数线抬升（堆顶替换 + siftDown）；没超过就忽略。<br/>
          也像 <strong>监控告警里只保留「最严重的 10 条」</strong>、或 <code>console</code> 里 <code>Math.max(...arr)</code> 是 K=1 的特例。
          </p>
        </aside>
      </section>

      <!-- 2. 小顶堆解法 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          小顶堆解法 —— O(n log k) 的「守门」算法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          这是堆在 Top-K 里的<strong>招牌应用</strong>。遍历数组，每来一个元素做一次判断：
          堆没满就入堆；堆满了且新元素比堆顶大，就<strong>淘汰堆顶、把新元素换进来并 siftDown</strong>。
          每个元素最多做一次 O(log k) 的堆调整，总复杂度 <strong>O(n log k)</strong>——当 K ≪ n 时远快于全排序。
        </p>
        <div class="mb-4"><Code language="ts" :code="topkHeapCode" title="topk_heap.ts" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>堆未满（size &lt; k）：直接 push，再 siftUp 维持小顶堆</li>
          <li>堆已满且 x &gt; 堆顶：pop 淘汰门槛 → push 新元素 → siftDown</li>
          <li>堆已满且 x &le; 堆顶：不够格进 Top-K，直接丢弃（这是多数情况，省了大量调整）</li>
        </ol>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么用「小顶堆」而不是大顶堆？</strong>因为我们要的是<strong>「最大的 K 个」，但需要快速访问其中「最小的」</strong>来做淘汰判断。
          小顶堆让「门槛」（K 个里最小者）待在堆顶，O(1) 就能读到并淘汰。</p>
        </aside>
      </section>

      <!-- 3. 快速选择 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          快速选择 —— 平均 O(n) 的分界定位
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          快速选择（Quickselect）是快速排序的「只走一半」版本：每次分区把 pivot 放到最终位置，
          然后根据目标下标只递归<strong>一边</strong>。找「第 K 大」等价于找升序排列里下标 <code>n - k</code> 的元素。
          平均 O(n)，但<strong>最坏 O(n²)</strong>（pivot 每次都选到极值时）。
        </p>
        <div class="mb-4"><Code language="ts" :code="quickSelectCode" title="quickselect.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 快速选择的两个坑：</strong><br/>
          ① <strong>最坏 O(n²)</strong>：数组已有序且总选最右 pivot 时会退化；工业实现用「三数取中」或随机 pivot 降低概率。<br/>
          ② <strong>会打乱原数组</strong>：分区会原地交换元素。如果还需要原始顺序，得先拷贝一份。
          </p>
        </aside>
      </section>

      <!-- 4. 复杂度与选型 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          复杂度对比与场景选型
        </h2>
        <div class="mb-4"><Code language="ts" :code="compareCode" title="compare.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong><br/>
          <strong>K 很小</strong>（Top 10 / Top 100）→ 小顶堆 O(n log k)，内存只占 O(k)；<br/>
          <strong>K 接近 n/2</strong>（如中位数）→ 快速选择 O(n) 更快；<br/>
          <strong>数据流式到达</strong>（无法一次读全）→ 只能用堆，见下一节 5-2-2。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>堆顶判断方向反了</strong>：写成 <code>x &gt; 堆顶就丢弃</code>——会丢掉大元素、留下最小的 K 个。牢记「堆顶是最小门槛，比门槛大才进堆」。<br/>
          ② <strong>忽略 k 的边界</strong>：<code>k &gt; nums.length</code> 或 <code>k &le; 0</code> 要提前处理，否则 <code>peek()</code> 返回 <code>undefined</code> 直接抛错。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：小顶堆找 Top-K
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          遍历 <code>[7,10,4,3,20,15,8]</code> 找 Top-3。橙色 = 当前比较/待下沉节点，绿色 = 新入堆/交换后归位，红色 = 被淘汰的堆顶。
          圆圈下方 <code>[i]</code> 是数组下标。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 堆大小: {{ heapArr.length }}/{{ K }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🧮 待处理: {{ remainingCount }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doTopK" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">🏆 小顶堆找 Top-K</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="'e'+e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="tTextCfg(n)" />
              <v-text v-for="n in tNodes" :key="'i'+n.id" :config="idxTextCfg(n)" />
              <!-- 当前元素（漂浮） -->
              <v-circle v-if="curVal != null" :config="curCfg()" />
              <v-text v-if="curVal != null" :config="curTextCfg()" />
              <!-- 画布内标注 -->
              <v-text v-if="annot" :config="{x:14, y:H-40, text:annot, fontSize:13, fontFamily:'monospace', fontStyle:'bold', fill:'#f59e0b'}" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>核心思想：</strong>用 K 大小的小顶堆装「最大的 K 个」，堆顶 = 门槛（K 个里最小的）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>小顶堆解法：</strong>未满就入堆，满了且 x &gt; 堆顶则「淘汰堆顶 + 入堆 + siftDown」，O(n log k)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>快速选择：</strong>分区定位第 K 大分界点，平均 O(n)，最坏 O(n²) 且打乱原数组</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>选型：</strong>K 小 → 堆；K≈n/2 → 快速选择；数据流 → 只能用堆</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>内存：</strong>堆解法只占 O(k)，是大数据场景（几百万条里取 Top 100）的首选</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-1-binary-heap/dsa-5-1-3-heapify" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：建堆 O(n) 与堆排序</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-2-priority-queue/dsa-5-2-2-kth-stream" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：数据流中第 K 大/中位数 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "问题与三种解法" },
  { id: "sec-2", name: "小顶堆 O(n log k)" },
  { id: "sec-3", name: "快速选择 O(n)" },
  { id: "sec-4", name: "复杂度对比" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-5", name: "小结" },
]

// ===== 🎬 Top-K 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const R = 24, LEVEL_H = 92, TOP = 54
const K = 3
const inputArr = [7, 10, 4, 3, 20, 15, 8]
const H = ref(360), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const heapArr = ref<number[]>([])
const curVal = ref<number | null>(null)
const remaining = ref<number[]>([])
const annot = ref('')
const remainingCount = computed(() => remaining.value.length)
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

interface TNode { id: number; val: number; x: number; y: number; color: string; s?: number }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{a: number; b: number}[]>([])

// 把数组渲染成完全二叉树（下标即 id）
function buildTreeNodes(arr: number[]) {
  tNodes.length = 0; tEdges.length = 0
  const n = arr.length
  let level = [0], y = TOP
  while (level.length) {
    const gap = W.value / (level.length + 1)
    level.forEach((idx, i) => {
      tNodes.push({ id: idx, val: arr[idx], x: gap * (i + 1), y, color: C.cyan, s: 1 })
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

function pos(id: number): TNode { return tNodes.find(n => n.id === id) ?? { id, val: 0, x: 0, y: 0, color: C.cyan, s: 1 } }

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
  return { x: n.x - R, y: n.y - R, width: R * 2, height: R * 2, text: String(n.val), fontSize: 16, fontFamily: 'monospace', fontStyle: 'bold', fill: n.color === C.green ? '#0f172a' : '#fff', align: 'center', verticalAlign: 'middle', scale: { x: s, y: s } }
}
function idxTextCfg(n: any) {
  return { x: n.x, y: n.y + R + 8, text: '[' + n.id + ']', fontSize: 11, fontFamily: 'monospace', fill: C.muted, align: 'center' as any }
}
function curCfg() {
  return { x: W.value - 56, y: 52, radius: 24, fill: C.green, stroke: '#22c55e', strokeWidth: 2, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function curTextCfg() {
  return { x: W.value - 80, y: 28, width: 48, height: 48, text: String(curVal.value), fontSize: 16, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0f172a', align: 'center', verticalAlign: 'middle' }
}

async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch (_) {}
  finally { await d(300); busy.value = false; status.value = ''; opLabel.value = '' }
}

function resetAll() {
  heapArr.value = []; curVal.value = null; annot.value = ''
  remaining.value = [...inputArr]
  buildTreeNodes(heapArr.value)
  status.value = ''; opLabel.value = ''
}

async function siftUpAnimated(i: number) {
  while (i > 0) {
    const p = (i - 1) >> 1
    const ni = pos(i), np = pos(p)
    ni.color = C.orange; np.color = C.orange
    annot.value = `siftUp: 比较 ${heapArr.value[i]} 与父 ${heapArr.value[p]}`
    await d(320)
    if (heapArr.value[i] >= heapArr.value[p]) { ni.color = C.cyan; np.color = C.cyan; annot.value = ''; return }
    ;[heapArr.value[i], heapArr.value[p]] = [heapArr.value[p], heapArr.value[i]]
    buildTreeNodes(heapArr.value)
    pos(i).color = C.green; pos(p).color = C.green; await d(280)
    pos(i).color = C.cyan; pos(p).color = C.cyan
    i = p
  }
  annot.value = ''
}

async function siftDownAnimated(i: number) {
  const n = heapArr.value.length
  while (true) {
    const l = 2 * i + 1, r = 2 * i + 2
    let small = i
    if (l < n && heapArr.value[l] < heapArr.value[small]) small = l
    if (r < n && heapArr.value[r] < heapArr.value[small]) small = r
    if (small === i) { pos(i).color = C.cyan; annot.value = ''; return }
    const a = pos(i), b = pos(small)
    a.color = C.orange; b.color = C.orange
    annot.value = `siftDown: ${heapArr.value[i]} 与较小孩子 ${heapArr.value[small]} 交换`
    await d(320)
    ;[heapArr.value[i], heapArr.value[small]] = [heapArr.value[small], heapArr.value[i]]
    buildTreeNodes(heapArr.value)
    pos(i).color = C.green; pos(small).color = C.green; await d(280)
    pos(i).color = C.cyan; pos(small).color = C.cyan
    i = small
  }
}

function doTopK() {
  act('遍历数组，小顶堆守门', 'O(n log k)', async () => {
    resetAll()
    for (const x of inputArr) {
      remaining.value.shift()
      curVal.value = x
      status.value = `读入元素 ${x}`
      await d(350)
      if (heapArr.value.length < K) {
        annot.value = `堆未满，${x} 入堆`
        heapArr.value.push(x)
        buildTreeNodes(heapArr.value)
        const nn = pos(heapArr.value.length - 1)
        nn.color = C.green; nn.s = 0; await d(60); nn.s = 1; await d(260)
        await siftUpAnimated(heapArr.value.length - 1)
        buildTreeNodes(heapArr.value)
      } else {
        const top = heapArr.value[0]
        status.value = `堆满，比较 ${x} 与堆顶 ${top}`
        pos(0).color = C.orange
        annot.value = `${x} vs 门槛 ${top}`
        await d(450)
        if (x <= top) {
          pos(0).color = C.cyan
          annot.value = `${x} ≤ ${top}，丢弃`
          status.value = `${x} 不够格，丢弃`
          await d(450)
        } else {
          annot.value = `替换堆顶 ${top} → ${x}`
          status.value = `替换堆顶 ${top} → ${x}`
          pos(0).color = C.red; await d(450)
          heapArr.value[0] = x
          buildTreeNodes(heapArr.value)
          await siftDownAnimated(0)
          buildTreeNodes(heapArr.value)
        }
      }
      annot.value = ''
      curVal.value = null
    }
    status.value = `完成！Top-${K} = ${[...heapArr.value].sort((a, b) => a - b).join(', ')}（堆内元素）`
    await d(300)
  })
}

function doReset() { resetAll() }

let ro: ResizeObserver | null = null
onMounted(() => {
  resetAll()
  if (box.value) {
    W.value = box.value.clientWidth; buildTreeNodes(heapArr.value)
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; buildTreeNodes(heapArr.value) } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const topkHeapCode = `// ===== 小顶堆：找最大的 K 个元素（LeetCode #215 变体）=====
class MinHeap {
    private data: number[] = []
    get size() { return this.data.length }
    peek(): number | undefined { return this.data[0] }
    push(v: number) {
        this.data.push(v)
        this.siftUp(this.data.length - 1)
    }
    pop(): number | undefined {
        const top = this.data[0]
        const last = this.data.pop()!
        if (this.data.length) { this.data[0] = last; this.siftDown(0) }
        return top
    }
    private siftUp(i: number) {
        while (i > 0) {
            const p = (i - 1) >> 1            // 父下标
            if (this.data[i] >= this.data[p]) break
            ;[this.data[i], this.data[p]] = [this.data[p], this.data[i]]
            i = p
        }
    }
    private siftDown(i: number) {
        const n = this.data.length
        while (true) {
            const l = 2 * i + 1, r = 2 * i + 2
            let small = i
            if (l < n && this.data[l] < this.data[small]) small = l
            if (r < n && this.data[r] < this.data[small]) small = r
            if (small === i) break
            ;[this.data[i], this.data[small]] = [this.data[small], this.data[i]]
            i = small
        }
    }
}

// 核心：维护 K 大小的「小顶堆」，堆顶是 Top-K 的「门槛」
function topK(nums: number[], k: number): number[] {
    const heap = new MinHeap()
    for (const x of nums) {
        if (heap.size < k) {
            heap.push(x)                       // 堆未满：直接入堆
        } else if (x > heap.peek()!) {
            heap.pop()                         // 淘汰当前门槛（堆顶）
            heap.push(x)                       // 新元素入堆 + siftDown
        }
        // 否则 x <= 堆顶：不够格进 Top-K，直接丢弃
    }
    return [...heap.data]                      // 堆里的 K 个就是 Top-K
}

// 手动模拟 topK([7,10,4,3,20,15,8], 3)：
// 7,10,4 入堆 → [4,7,10]（小顶堆，堆顶 4 = 门槛）
// 3：3 <= 4 → 丢弃
// 20：20 > 4 → 淘汰 4，入 20 → 堆 [7,10,20]
// 15：15 > 7 → 淘汰 7，入 15 → 堆 [10,15,20]
// 8：8 <= 10 → 丢弃
// 结果：堆内 {10,15,20} 即 Top-3`

const quickSelectCode = `// ===== 快速选择：平均 O(n)，找「第 K 大」=====
function findKthLargest(nums: number[], k: number): number {
    const n = nums.length
    let left = 0, right = n - 1
    const target = n - k                     // 第 K 大 = 升序第 n-k 个（0-based）
    while (left <= right) {
        const p = partition(nums, left, right)
        if (p === target) return nums[p]     // pivot 正好落在目标位，命中
        if (p < target) left = p + 1         // 目标在右侧
        else right = p - 1                   // 目标在左侧
    }
    return -1
}

// 分区：把 < pivot 的放左边、> pivot 的放右边，返回 pivot 最终下标
function partition(nums: number[], left: number, right: number): number {
    const pivot = nums[right]                // 选最右为基准（可改随机/三数取中）
    let i = left                             // i 左侧都是 < pivot 的元素
    for (let j = left; j < right; j++) {
        if (nums[j] < pivot) {
            ;[nums[i], nums[j]] = [nums[j], nums[i]]
            i++
        }
    }
    ;[nums[i], nums[right]] = [nums[right], nums[i]]  // pivot 归位
    return i
}

// findKthLargest([3,2,1,5,6,4], 2) = 5
// 平均 O(n)：每次只递归一边；最坏 O(n²)：pivot 每次都取到极值（如已排序数组）`

const compareCode = `// ===== 三种解法对比与选型 =====
// ① 全排序：最简单，但做了多余的事
function topKBySort(nums: number[], k: number): number[] {
    return [...nums].sort((a, b) => b - a).slice(0, k)   // O(n log n)
}

// ② 小顶堆：只维护 K 个，适合 K << n 或数据流
//    O(n log k)：每个元素最多做一次 O(log k) 的堆调整，内存 O(k)

// ③ 快速选择：找「第 K 大」分界点，平均 O(n)
//    但会打乱原数组，且结果不保证有序

// ===== 场景选型（经验法则）=====
//   K 很小（Top 10）      → 小顶堆 O(n log k) 稳赢，内存 O(k)
//   K 接近 n/2（中位数）   → 快速选择 O(n) 更快
//   n 不大 + 需要有序      → 直接排序最简单
//   数据流式到达           → 只能用堆（见 5-2-2 数据流）`
</script>
