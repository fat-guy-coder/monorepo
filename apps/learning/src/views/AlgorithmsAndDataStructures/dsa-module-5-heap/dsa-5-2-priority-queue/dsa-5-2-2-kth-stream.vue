<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌊 数据流中第 K 大 / 中位数</h1>
          <p class="text-sm text-slate-500 mt-1">元素逐个到达、无法整体排序——用堆「增量」维护答案</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 5-2-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：两个「堆」解决两类数据流问题
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          数据流的本质是<strong>元素一个个来、总量未知、无法一次性排序</strong>，所以只能「增量维护」。
          两类经典问题各用一个堆技巧：<strong>第 K 大</strong>用「K 大小的小顶堆守门」（同 Top-K），
          <strong>中位数</strong>用「双堆」——大顶堆存较小一半、小顶堆存较大一半，中位数就藏在两个堆顶之间。
        </p>

        <!-- 图1：第 K 大 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">① 第 K 大：K 大小的小顶堆守门</h3>
        <figure class="mb-6">
          <svg viewBox="0 0 720 210" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="s2-e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">数据流逐个到达 → 只留「最大的 K 个」，堆顶 = 第 K 大</text>
            <!-- 流 -->
            <rect x="40" y="52" width="46" height="36" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="63" y="70" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
            <rect x="96" y="52" width="46" height="36" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="119" y="70" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" fill="#64748b">15</text>
            <rect x="152" y="52" width="46" height="36" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="175" y="70" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" fill="#64748b">1</text>
            <text x="212" y="70" font-size="14" font-family="monospace" fill="#94a3b8">…</text>
            <line x1="230" y1="70" x2="290" y2="70" stroke="#94a3b8" stroke-width="2" marker-end="url(#s2-e)" />

            <!-- 小顶堆 K=3 -->
            <line x1="360" y1="84" x2="300" y2="146" stroke="#94a3b8" stroke-width="2" marker-end="url(#s2-e)" />
            <line x1="360" y1="84" x2="420" y2="146" stroke="#94a3b8" stroke-width="2" marker-end="url(#s2-e)" />
            <circle cx="360" cy="60" r="26" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="360" y="58" text-anchor="middle" dominant-baseline="central" font-size="17" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <text x="360" y="76" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">第K大</text>
            <circle cx="300" cy="140" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="300" y="140" text-anchor="middle" dominant-baseline="central" font-size="17" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <circle cx="420" cy="140" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="420" y="140" text-anchor="middle" dominant-baseline="central" font-size="17" font-family="monospace" font-weight="bold" fill="#ffffff">10</text>
            <text x="360" y="196" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">add() 每次 O(log k)，比「每次重排全流」快得多</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：第 K 大 = 小顶堆堆顶；新元素比堆顶大才替换，否则丢弃</figcaption>
        </figure>

        <!-- 图2：双堆中位数 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">② 中位数：双堆各存一半，中位数藏在两堆顶之间</h3>
        <figure>
          <svg viewBox="0 0 720 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="s2-m" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">大顶堆 lo 存「较小一半」，小顶堆 hi 存「较大一半」，两堆大小差 ≤ 1</text>

            <!-- 左：lo 大顶堆 -->
            <text x="200" y="52" text-anchor="middle" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">lo（大顶堆·较小一半）</text>
            <line x1="200" y1="76" x2="150" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#s2-m)" />
            <line x1="200" y1="76" x2="250" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#s2-m)" />
            <circle cx="200" cy="52" r="26" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="200" y="52" text-anchor="middle" dominant-baseline="central" font-size="17" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <circle cx="150" cy="130" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="150" y="130" text-anchor="middle" dominant-baseline="central" font-size="17" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <circle cx="250" cy="130" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="250" y="130" text-anchor="middle" dominant-baseline="central" font-size="17" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>

            <!-- 右：hi 小顶堆 -->
            <text x="520" y="52" text-anchor="middle" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">hi（小顶堆·较大一半）</text>
            <line x1="520" y1="76" x2="470" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#s2-m)" />
            <line x1="520" y1="76" x2="570" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#s2-m)" />
            <circle cx="520" cy="52" r="26" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="520" y="52" text-anchor="middle" dominant-baseline="central" font-size="17" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <circle cx="470" cy="130" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="470" y="130" text-anchor="middle" dominant-baseline="central" font-size="17" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <circle cx="570" cy="130" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="570" y="130" text-anchor="middle" dominant-baseline="central" font-size="17" font-family="monospace" font-weight="bold" fill="#ffffff">15</text>

            <!-- 中位数 -->
            <line x1="360" y1="60" x2="360" y2="120" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 3" />
            <text x="360" y="150" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#d97706">中位数 = (lo.top + hi.top) / 2 = (3+5)/2 = 4</text>
            <text x="360" y="236" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">平衡规则：lo 永远比 hi 多 0 或 1 个 → 奇数时中位数 = lo.top</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：双堆让中位数变成「看两个堆顶」O(1)，addNum 只需 O(log n) 平衡</figcaption>
        </figure>
      </section>

      <!-- 1. 第 K 大 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          数据流第 K 大 —— KthLargest
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          这是 Top-K 的<strong>数据流版本</strong>（LeetCode #703）：元素通过 <code>add(val)</code> 一个个到来，每次都要求返回「当前的第 K 大」。
          思路与 Top-K 完全一致——维护一个 K 大小的<strong>小顶堆</strong>，堆顶就是第 K 大。关键是 <code>add</code> 每次只做 O(log k)，不用重排整个流。
        </p>
        <div class="mb-4"><Code language="ts" :code="kthLargestCode" title="kth_largest.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          数据流就像<strong>实时日志 / 监控流</strong>：日志一条条刷屏，你不可能等全部刷完再分析，只能边到边统计。
          比如「实时给出当前 QPS 的 top 10 接口」= 数据流 Top-K；「实时给出响应时间的 P50（中位数）」= 数据流中位数。<br/>
          也像 <strong>WebSocket 推送的实时行情</strong>，前端用一个定长缓存只保留「最活跃的 N 只股票」，思路同款。
          </p>
        </aside>
      </section>

      <!-- 2. 中位数双堆 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          数据流中位数 —— MedianFinder 双堆技巧
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          中位数（LeetCode #295）不能用单堆解决，因为中位数藏在「中间」，既不是最大也不是最小。
          经典解法是<strong>双堆</strong>：<strong>大顶堆 lo</strong> 存较小的一半，<strong>小顶堆 hi</strong> 存较大的一半，
          并始终维持 <code>lo 元素 ≤ hi 元素</code> 且 <code>lo.size - hi.size ∈ {0, 1}</code>。
          这样中位数只需看两个堆顶。
        </p>
        <div class="mb-4"><Code language="ts" :code="heapImplCode" title="heap_impl.ts" /></div>
        <div class="mb-4"><Code language="ts" :code="medianFinderCode" title="median_finder.ts" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>新元素先进 lo（较小一半），再弹出 lo 最大值挪到 hi —— 保证 lo 里都 ≤ hi 里</li>
          <li>若 hi 比 lo 多（大小失衡），把 hi 最小值挪回 lo —— 维持 lo ≥ hi</li>
          <li>查中位数：lo 多一个 → lo.top；一样多 → (lo.top + hi.top) / 2</li>
        </ol>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>两堆类型弄反</strong>：lo 必须是<strong>大顶堆</strong>（要取较小一半的最大值），hi 必须是小顶堆——写反后堆顶拿到的就是错的「中位数候选」。<br/>
          ② <strong>平衡条件写反</strong>：只判断 <code>hi.size &gt; lo.size</code> 就回挪，忘了处理奇数个元素时 lo 应该多一个；应保证 <code>lo ≥ hi</code> 且差 ≤ 1。
          </p>
        </aside>
      </section>

      <!-- 3. 复杂度与选型 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          复杂度与使用演示
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">操作</th><th class="px-4 py-2 border border-slate-200 font-semibold">复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">KthLargest.add()</td><td class="px-4 py-2 border font-mono">O(log k)</td><td class="px-4 py-2 border">最多一次堆调整</td></tr>
              <tr><td class="px-4 py-2 border font-mono">MedianFinder.addNum()</td><td class="px-4 py-2 border font-mono">O(log n)</td><td class="px-4 py-2 border">最多 3 次堆操作（入 lo、lo→hi、hi→lo）</td></tr>
              <tr><td class="px-4 py-2 border font-mono">MedianFinder.findMedian()</td><td class="px-4 py-2 border font-mono">O(1)</td><td class="px-4 py-2 border">只看两个堆顶</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="usageCode" title="usage.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>凡是「数据流 + 要实时查某个统计量」的问题，先想「能不能用堆增量维护」。
          维护「第 K 大」→ 单堆守门；维护「中位数 / 任意分位数」→ 双堆；维护「滑动窗口最大/最小」→ 单调队列（模块 5-3 前再看）。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：第 K 大流 / 中位数双堆
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          橙色 = 当前比较/移动的堆顶，绿色 = 新入堆元素，红色 = 被替换/淘汰的元素。
          「中位数双堆」里左右两棵树分别是大顶堆 lo（较小一半）和小顶堆 hi（较大一半），注意观察两堆大小如何保持平衡。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 K: {{ K }}</span>
          <span v-if="mode==='median'" class="bg-slate-100 px-2 py-1 rounded-full">⚖️ lo={{ loArr.length }} hi={{ hiArr.length }}</span>
          <span v-if="mode==='kth'" class="bg-slate-100 px-2 py-1 rounded-full">📏 堆大小: {{ heapArr.length }}/{{ K }}</span>
          <span v-if="kthVal != null" class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">🎯 第 {{ K }} 大 = {{ kthVal }}</span>
          <span v-if="medianVal != null" class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">🎯 中位数 = {{ medianVal }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doKthStream" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">🌊 第 K 大流</button>
          <button @mousedown="doMedian" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">⚖️ 中位数双堆</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="'e'+e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="tTextCfg(n)" />
              <template v-if="mode==='kth'">
                <v-text v-for="n in tNodes" :key="'i'+n.id" :config="idxTextCfg(n)" />
              </template>
              <v-text v-if="mode==='median'" :config="loHeaderCfg()" />
              <v-text v-if="mode==='median'" :config="hiHeaderCfg()" />
              <v-circle v-if="curVal != null" :config="curCfg()" />
              <v-text v-if="curVal != null" :config="curTextCfg()" />
              <v-text v-if="annot" :config="{x:14, y:H-40, text:annot, fontSize:13, fontFamily:'monospace', fontStyle:'bold', fill:'#f59e0b'}" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>数据流本质：</strong>元素逐个到达、总量未知，只能「增量维护」不能整体重排</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>第 K 大：</strong>K 大小的小顶堆守门，add() O(log k)，堆顶即答案</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>中位数：</strong>双堆技巧——大顶堆 lo 存较小一半 + 小顶堆 hi 存较大一半，平衡后两堆顶给出中位数</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>平衡规则：</strong>先入 lo 再 lo→hi，若 hi 更大则 hi→lo，保证 lo 比 hi 多 0 或 1 个</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度：</strong>addNum O(log n)，findMedian O(1)——这是双堆的核心价值</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-2-priority-queue/dsa-5-2-1-topk" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Top-K 问题</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-2-priority-queue/dsa-5-2-3-merge-k" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：合并 K 个有序链表/数组 →</RouterLink>
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
  { id: "sec-1", name: "第 K 大 O(log k)" },
  { id: "sec-2", name: "中位数双堆" },
  { id: "sec-3", name: "复杂度与演示" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-4", name: "小结" },
]

// ===== 🎬 数据流动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const R = 24, LEVEL_H = 92, TOP = 64
const K = 3
const H = ref(360), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const mode = ref<'kth' | 'median'>('kth')
const heapArr = ref<number[]>([])       // 第 K 大：小顶堆
const loArr = ref<number[]>([])          // 中位数：大顶堆（较小一半）
const hiArr = ref<number[]>([])          // 中位数：小顶堆（较大一半）
const curVal = ref<number | null>(null)
const kthVal = ref<number | null>(null)
const medianVal = ref<number | null>(null)
const annot = ref('')
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

interface TNode { id: number; val: number; x: number; y: number; color: string; s?: number }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{a: number; b: number}[]>([])

function pos(id: number): TNode { return tNodes.find(n => n.id === id) ?? { id, val: 0, x: 0, y: 0, color: C.cyan, s: 1 } }

// 在 [x0, x1] 横向区间内，按完全二叉树排布一个堆数组（id = idBase + idx）
function layoutHeapIn(arr: number[], idBase: number, x0: number, x1: number) {
  const n = arr.length
  const span = x1 - x0
  let level = [0], y = TOP
  while (level.length) {
    const gap = span / (level.length + 1)
    level.forEach((idx, i) => {
      tNodes.push({ id: idBase + idx, val: arr[idx], x: x0 + gap * (i + 1), y, color: C.cyan, s: 1 })
    })
    const next: number[] = []
    level.forEach(idx => {
      const l = 2 * idx + 1, r = 2 * idx + 2
      if (l < n) { tEdges.push({ a: idBase + idx, b: idBase + l }); next.push(l) }
      if (r < n) { tEdges.push({ a: idBase + idx, b: idBase + r }); next.push(r) }
    })
    level = next; y += LEVEL_H
  }
}

function layoutKth() { tNodes.length = 0; tEdges.length = 0; layoutHeapIn(heapArr.value, 0, 20, W.value - 20) }
function layoutDual() {
  tNodes.length = 0; tEdges.length = 0
  layoutHeapIn(loArr.value, 0, 20, W.value / 2 - 20)
  layoutHeapIn(hiArr.value, 100, W.value / 2 + 20, W.value - 20)
}
function render() { if (mode.value === 'kth') layoutKth(); else layoutDual() }

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
function loHeaderCfg() { return { x: W.value / 4, y: 12, text: '较小一半 lo（大顶堆）', fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: C.muted, align: 'center' as any } }
function hiHeaderCfg() { return { x: W.value * 3 / 4, y: 12, text: '较大一半 hi（小顶堆）', fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: C.muted, align: 'center' as any } }
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

async function siftUp(arr: number[], i: number, isMax: boolean, idBase: number) {
  while (i > 0) {
    const p = (i - 1) >> 1
    const go = isMax ? arr[i] > arr[p] : arr[i] < arr[p]
    annot.value = `siftUp: 比较 ${arr[i]} 与父 ${arr[p]}`
    pos(idBase + i).color = C.orange; pos(idBase + p).color = C.orange
    await d(280)
    if (!go) { pos(idBase + i).color = C.cyan; pos(idBase + p).color = C.cyan; return }
    ;[arr[i], arr[p]] = [arr[p], arr[i]]
    render()
    pos(idBase + i).color = C.green; pos(idBase + p).color = C.green; await d(240)
    pos(idBase + i).color = C.cyan; pos(idBase + p).color = C.cyan
    i = p
  }
}

async function siftDown(arr: number[], i: number, isMax: boolean, idBase: number) {
  const n = arr.length
  while (true) {
    const l = 2 * i + 1, r = 2 * i + 2
    let best = i
    if (l < n && (isMax ? arr[l] > arr[best] : arr[l] < arr[best])) best = l
    if (r < n && (isMax ? arr[r] > arr[best] : arr[r] < arr[best])) best = r
    if (best === i) { pos(idBase + i).color = C.cyan; return }
    annot.value = `siftDown: 交换 ${arr[i]} ↔ ${arr[best]}`
    pos(idBase + i).color = C.orange; pos(idBase + best).color = C.orange
    await d(280)
    ;[arr[i], arr[best]] = [arr[best], arr[i]]
    render()
    pos(idBase + i).color = C.green; pos(idBase + best).color = C.green; await d(240)
    pos(idBase + i).color = C.cyan; pos(idBase + best).color = C.cyan
    i = best
  }
}

function resetAll() {
  heapArr.value = []; loArr.value = []; hiArr.value = []
  curVal.value = null; kthVal.value = null; medianVal.value = null; annot.value = ''
  mode.value = 'kth'; layoutKth()
  status.value = ''; opLabel.value = ''
}

function doKthStream() {
  act('数据流第 K 大', 'add O(log k)', async () => {
    mode.value = 'kth'
    heapArr.value = []; kthVal.value = null; annot.value = ''
    layoutKth()
    const stream = [4, 5, 8, 2, 3, 5, 10, 9]
    for (const x of stream) {
      curVal.value = x
      status.value = `add(${x})`
      await d(320)
      if (heapArr.value.length < K) {
        annot.value = `堆未满，${x} 入堆`
        heapArr.value.push(x)
        layoutKth()
        const id = heapArr.value.length - 1
        pos(id).color = C.green; pos(id).s = 0; await d(60); pos(id).s = 1; await d(220)
        await siftUp(heapArr.value, id, false, 0)
      } else if (x > heapArr.value[0]) {
        const oldTop = heapArr.value[0]
        annot.value = `${x} > 门槛 ${oldTop}，替换堆顶`
        pos(0).color = C.orange; await d(400)
        heapArr.value[0] = x
        layoutKth()
        await siftDown(heapArr.value, 0, false, 0)
        annot.value = `淘汰旧门槛 ${oldTop}`
      } else {
        annot.value = `${x} ≤ 门槛 ${heapArr.value[0]}，丢弃`
        await d(420)
      }
      layoutKth()
      kthVal.value = heapArr.value[0]
      annot.value = `第 ${K} 大 = ${heapArr.value[0]}`
      status.value = `第 ${K} 大 = ${heapArr.value[0]}`
      await d(420)
      annot.value = ''
      curVal.value = null
    }
    status.value = `完成！数据流第 ${K} 大 = ${heapArr.value[0]}`
  })
}

function doMedian() {
  act('中位数双堆', 'addNum O(log n)', async () => {
    mode.value = 'median'
    loArr.value = []; hiArr.value = []; medianVal.value = null; annot.value = ''
    layoutDual()
    const stream = [5, 15, 1, 3, 2, 8, 7]
    for (const x of stream) {
      curVal.value = x
      status.value = `addNum(${x})`
      await d(300)

      // 1. 入 lo（大顶堆）
      loArr.value.push(x)
      layoutDual()
      let id = loArr.value.length - 1
      pos(id).color = C.green; pos(id).s = 0; await d(60); pos(id).s = 1; await d(180)
      await siftUp(loArr.value, id, true, 0)

      // 2. lo 最大值 → hi
      if (loArr.value.length) {
        const top = loArr.value[0]
        annot.value = `把较小一半的最大值 ${top} 挪到较大一半`
        pos(0).color = C.orange; await d(350)
        const last = loArr.value.pop()!
        if (loArr.value.length) { loArr.value[0] = last; layoutDual(); await siftDown(loArr.value, 0, true, 0) }
        hiArr.value.push(top)
        layoutDual()
        id = hiArr.value.length - 1
        pos(100 + id).color = C.green; pos(100 + id).s = 0; await d(60); pos(100 + id).s = 1; await d(180)
        await siftUp(hiArr.value, id, false, 100)
      }

      // 3. 若 hi 更大，hi 最小值 → lo（保持 lo ≥ hi）
      if (hiArr.value.length > loArr.value.length) {
        const top = hiArr.value[0]
        annot.value = `较大一半更大，把 ${top} 挪回较小一半`
        pos(100).color = C.orange; await d(350)
        const last = hiArr.value.pop()!
        if (hiArr.value.length) { hiArr.value[0] = last; layoutDual(); await siftDown(hiArr.value, 0, false, 100) }
        loArr.value.push(top)
        layoutDual()
        id = loArr.value.length - 1
        pos(id).color = C.green; pos(id).s = 0; await d(60); pos(id).s = 1; await d(180)
        await siftUp(loArr.value, id, true, 0)
      }

      layoutDual()
      let median: number
      if (loArr.value.length > hiArr.value.length) median = loArr.value[0]
      else median = (loArr.value[0] + hiArr.value[0]) / 2
      medianVal.value = median
      annot.value = `lo.size=${loArr.value.length} hi.size=${hiArr.value.length} → 中位数=${median}`
      status.value = `中位数 = ${median}`
      await d(450)
      annot.value = ''
      curVal.value = null
    }
    status.value = `完成！当前中位数 = ${medianVal.value}`
  })
}

function doReset() { resetAll() }

let ro: ResizeObserver | null = null
onMounted(() => {
  resetAll()
  if (box.value) {
    W.value = box.value.clientWidth; layoutKth()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; render() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const kthLargestCode = `// ===== KthLargest：数据流中第 K 大（LeetCode #703）=====
// 数据流：元素一个个 add 进来，无法一次性排序，只能增量维护
class MinHeap {
    private data: number[] = []
    get size() { return this.data.length }
    peek(): number | undefined { return this.data[0] }
    push(v: number) {
        this.data.push(v); this.siftUp(this.data.length - 1)
    }
    pop(): number | undefined {
        const top = this.data[0]
        const last = this.data.pop()!
        if (this.data.length) { this.data[0] = last; this.siftDown(0) }
        return top
    }
    private siftUp(i: number) {
        while (i > 0) {
            const p = (i - 1) >> 1
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

class KthLargest {
    private heap = new MinHeap()       // 小顶堆：只保留最大的 K 个
    private k: number
    constructor(k: number, nums: number[]) {
        this.k = k
        for (const x of nums) this.add(x)   // 复用 add 逻辑初始化
    }
    add(val: number): number {
        if (this.heap.size < this.k) {
            this.heap.push(val)
        } else if (val > this.heap.peek()!) {
            this.heap.pop()                // 淘汰旧门槛
            this.heap.push(val)
        }
        return this.heap.peek()!           // 堆顶 = 当前第 K 大
    }
}
// const k = new KthLargest(3, [4, 5, 8, 2])
// k.add(3)  → 4    k.add(5) → 5    k.add(10) → 5
// 每次 add 只 O(log k)，无需重排整个流`

const heapImplCode = `// ===== 双堆需要的大小顶堆（复用同一份实现，靠比较方向区分）=====
class MaxHeap {
    private data: number[] = []
    get size() { return this.data.length }
    peek(): number | undefined { return this.data[0] }
    push(v: number) { this.data.push(v); this.siftUp(this.data.length - 1) }
    pop(): number | undefined {
        const top = this.data[0]
        const last = this.data.pop()!
        if (this.data.length) { this.data[0] = last; this.siftDown(0) }
        return top
    }
    private siftUp(i: number) {
        while (i > 0) {
            const p = (i - 1) >> 1
            if (this.data[i] <= this.data[p]) break   // 大顶堆：父要 ≥ 子
            ;[this.data[i], this.data[p]] = [this.data[p], this.data[i]]
            i = p
        }
    }
    private siftDown(i: number) {
        const n = this.data.length
        while (true) {
            const l = 2 * i + 1, r = 2 * i + 2
            let big = i
            if (l < n && this.data[l] > this.data[big]) big = l
            if (r < n && this.data[r] > this.data[big]) big = r
            if (big === i) break
            ;[this.data[i], this.data[big]] = [this.data[big], this.data[i]]
            i = big
        }
    }
}
// MinHeap 与 5-2-1 一致：siftUp/siftDown 里把 > 换成 < 即可（小顶堆父 ≤ 子）`

const medianFinderCode = `// ===== MedianFinder：数据流中位数（LeetCode #295）=====
// 双堆技巧：大顶堆 lo 存「较小一半」，小顶堆 hi 存「较大一半」
// 中位数 = 两堆堆顶（平衡时取均值，lo 多一个时取 lo 顶）
class MedianFinder {
    private lo = new MaxHeap()   // 较小一半，堆顶 = 最大值
    private hi = new MinHeap()   // 较大一半，堆顶 = 最小值

    addNum(x: number): void {
        this.lo.push(x)                     // 1. 先入较小一半
        this.hi.push(this.lo.pop()!)        // 2. 把 lo 最大值挪到 hi，保证 lo ≤ hi
        if (this.hi.size > this.lo.size) {  // 3. 若 hi 更大，挪一个回 lo（保持 lo ≥ hi）
            this.lo.push(this.hi.pop()!)
        }
    }
    findMedian(): number {
        if (this.lo.size > this.hi.size) return this.lo.peek()!
        return (this.lo.peek()! + this.hi.peek()!) / 2
    }
}

// 手动模拟 addNum(5,15,1,3)：
// add 5  → lo=[5] hi=[]          → 中位数 5
// add 15 → lo=[5] hi=[15]        → 中位数 (5+15)/2 = 10
// add 1  → lo=[1,5] hi=[15]      → 中位数 5
// add 3  → lo=[3,1] hi=[5,15]    → 中位数 (3+5)/2 = 4
// addNum 每次 O(log n)：最多 3 次堆操作，findMedian O(1)`

const usageCode = `// ===== 使用演示 =====
const kth = new KthLargest(3, [4, 5, 8, 2])
console.log(kth.add(3))    // 输出: 4
console.log(kth.add(5))    // 输出: 5   （5 挤掉 4，堆变 [5,8,10]... 依实现）
console.log(kth.add(10))   // 输出: 5   （10 挤掉 8 的场景）

const mf = new MedianFinder()
mf.addNum(1); mf.addNum(2)
console.log(mf.findMedian())   // 输出: 1.5
mf.addNum(3)
console.log(mf.findMedian())   // 输出: 2

// 对比：如果不维护堆，每次 add 后重新排序查询是 O(n log n)
// 而堆把「每次查询」压到 O(log n) + O(1)，是数据流场景的核心收益`
</script>
