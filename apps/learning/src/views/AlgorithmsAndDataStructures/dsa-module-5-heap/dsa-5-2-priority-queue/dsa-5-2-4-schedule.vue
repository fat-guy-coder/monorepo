<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">⏰ 任务调度与 Dijkstra 优先队列优化</h1>
          <p class="text-sm text-slate-500 mt-1">优先队列两大应用：贪心调度取最急任务，Dijkstra 取最近节点</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 5-2-4</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：优先队列的两大「贪心」应用
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          优先队列（堆）的精华在于「<strong>总是快速拿到最优先的元素</strong>」。这一节的两大经典应用都在做同一件事：
          <strong>任务调度</strong>每次取「优先级最高（或 deadline 最近）」的任务；<strong>Dijkstra</strong>每次取「距离最小」的未确定节点。
          一个用大顶堆取最大，一个用小顶堆取最小。
        </p>

        <!-- 图1：任务调度 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">① 任务调度：大顶堆取「优先级最高」</h3>
        <figure class="mb-6">
          <svg viewBox="0 0 720 190" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="s4-e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">大顶堆：堆顶 = 优先级最高（或 deadline 最近）的任务 → 每次调度 O(log n)</text>

            <line x1="360" y1="74" x2="210" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#s4-e)" />
            <line x1="360" y1="74" x2="510" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#s4-e)" />

            <circle cx="360" cy="50" r="28" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="360" y="44" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <text x="360" y="62" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">优先级 10</text>

            <circle cx="210" cy="130" r="28" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="210" y="124" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <text x="210" y="142" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">优先级 7</text>

            <circle cx="510" cy="130" r="28" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="510" y="124" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <text x="510" y="142" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">优先级 5</text>

            <text x="16" y="178" font-size="11" font-family="monospace" fill="#64748b">调度顺序：B(10) → C(7) → A(5)，新任务可随时 push 插入</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：任务调度 = 反复「弹堆顶」，贪心选出最急任务</figcaption>
        </figure>

        <!-- 图2：Dijkstra -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">② Dijkstra：小顶堆取「距离最小」的未确定节点</h3>
        <figure>
          <svg viewBox="0 0 720 230" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="s4-d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">小顶堆存 (节点, dist)：每次弹「距离最小」，松弛邻居后把更短距离入堆</text>

            <!-- 图（左） -->
            <line x1="120" y1="90" x2="240" y2="60" stroke="#94a3b8" stroke-width="2" marker-end="url(#s4-d)" />
            <text x="180" y="60" font-size="11" font-family="monospace" fill="#64748b">4</text>
            <line x1="120" y1="90" x2="120" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#s4-d)" />
            <text x="100" y="138" font-size="11" font-family="monospace" fill="#64748b">1</text>
            <line x1="240" y1="60" x2="120" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#s4-d)" />
            <text x="210" y="120" font-size="11" font-family="monospace" fill="#64748b">2</text>
            <line x1="240" y1="60" x2="360" y2="130" stroke="#94a3b8" stroke-width="2" marker-end="url(#s4-d)" />
            <text x="300" y="82" font-size="11" font-family="monospace" fill="#64748b">1</text>
            <line x1="120" y1="180" x2="360" y2="130" stroke="#94a3b8" stroke-width="2" marker-end="url(#s4-d)" />
            <text x="220" y="180" font-size="11" font-family="monospace" fill="#64748b">5</text>

            <circle cx="120" cy="70" r="22" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="120" y="70" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">0</text>
            <text x="120" y="110" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a">dist=0</text>

            <circle cx="240" cy="40" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="240" y="40" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <text x="240" y="90" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">dist=3</text>

            <circle cx="120" cy="180" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="120" y="180" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <text x="120" y="220" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">dist=1</text>

            <circle cx="360" cy="130" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="360" y="130" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#64748b">3</text>
            <text x="360" y="170" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">dist=∞</text>

            <!-- 堆（右） -->
            <text x="530" y="52" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">小顶堆</text>
            <line x1="560" y1="84" x2="520" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#s4-d)" />
            <line x1="560" y1="84" x2="600" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#s4-d)" />
            <circle cx="560" cy="60" r="24" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="560" y="58" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <text x="560" y="76" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">节点2</text>
            <circle cx="520" cy="130" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="520" y="128" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <text x="520" y="146" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">节点1</text>
            <circle cx="600" cy="130" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="600" y="128" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">0</text>
            <text x="600" y="146" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">节点0</text>

            <text x="16" y="218" font-size="11" font-family="monospace" fill="#64748b">堆顶 = 距离最小 (节点2, dist=1)；已确定节点 0 绿色，堆里是待松弛的候选</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：Dijkstra 每轮弹堆顶取最近节点，松弛邻居后把更短距离入堆（可能产生过期条目）</figcaption>
        </figure>
      </section>

      <!-- 1. 任务调度 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          任务调度 —— 贪心 + 大顶堆
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          调度问题的核心是「<strong>每次挑一个最该做的任务先做</strong>」。用<strong>大顶堆</strong>按优先级（或 deadline 的紧迫度）排序，
          调度 = 反复弹堆顶。相比「每次线性扫描找最大」的 O(n)，堆把「找最大」压到 O(log n)，且<strong>新任务可随时插入</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="taskScheduleCode" title="task_schedule.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          任务调度就像<strong>浏览器事件循环的任务队列优先级</strong>：宏任务/微任务各自入队，事件循环每轮挑「优先级最高」的微任务先执行，
          而不是按先进先出的顺序。<br/>
          也像 <strong>setTimeout 的定时器堆</strong>：引擎内部用一个最小堆按「到期时间」排序，每次只检查堆顶的最近到期定时器。
          </p>
        </aside>
      </section>

      <!-- 2. Dijkstra 堆优化 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          Dijkstra 堆优化 —— 用最小堆找最近节点
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          朴素 Dijkstra 每轮要<strong>线性扫描</strong>所有未确定节点找「dist 最小」的那个，这一步 O(V)，总 O(V²)。
          堆优化用<strong>最小堆</strong>维护「待确定节点及其当前最短距离」，弹堆顶即最近节点 O(log V)，
          每条边松弛一次、可能入堆一次，总复杂度 <strong>O((V+E) log V)</strong>——稀疏图上快得多。
        </p>
        <div class="mb-4"><Code language="ts" :code="dijkstraCode" title="dijkstra_heap.ts" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>初始化 dist[src]=0，其余 ∞；把 (src, 0) 入最小堆</li>
          <li>弹堆顶 (u, d)：若 u 已确定（d &gt; dist[u]）则是<strong>过期条目</strong>，跳过（lazy deletion）</li>
          <li>确定 u，遍历邻居 v：d + w &lt; dist[v] 则更新 dist[v] 并把 (v, nd) 入堆</li>
          <li>堆空即完成</li>
        </ol>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么堆里有「过期条目」？</strong>因为普通二叉堆没有 decrease-key，
          松弛时只能<strong>再 push 一个更短的新条目</strong>，旧条目留在堆里，等它被弹出时发现 <code>d &gt; dist[u]</code> 就跳过。这叫 lazy deletion。</p>
        </aside>
      </section>

      <!-- 3. 复杂度与对比 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          朴素 vs 堆优化 与使用演示
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">实现</th><th class="px-4 py-2 border border-slate-200 font-semibold">找最近节点</th><th class="px-4 py-2 border border-slate-200 font-semibold">总复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold">适用</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold text-slate-700">朴素</td><td class="px-4 py-2 border font-mono">线性扫描 O(V)</td><td class="px-4 py-2 border font-mono">O(V²)</td><td class="px-4 py-2 border">稠密图 E≈V²</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">堆优化</td><td class="px-4 py-2 border font-mono">弹堆顶 O(log V)</td><td class="px-4 py-2 border font-mono">O((V+E) log V)</td><td class="px-4 py-2 border">稀疏图 E≈V</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="dijkstraCompareCode" title="compare.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>负权边</strong>：Dijkstra 依赖「已确定节点的最短距离不会再变」，负权边会破坏这个前提，必须用 Bellman-Ford。<br/>
          ② <strong>忘记 lazy deletion</strong>：弹出堆顶后不判断 <code>done[u]</code>，会把同一个节点重复确定、输出错误距离。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：Dijkstra 堆优化
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          上图为图（节点 0 为起点），下方是最小堆（圆圈显示 dist，圈下 <code>v?</code> 标注节点）。
          绿色 = 已确定最短距离，青色 = 在堆里的候选，橙色 = 正在处理，虚线灰 = 尚未到达（∞）。
          观察松弛邻居时如何把更短距离推入堆。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 堆大小: {{ heapElts.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">✅ 已确定: {{ settledCount }}/{{ GNODES.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doDijkstra" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">🧭 Dijkstra 堆优化</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 图的边 + 权重 -->
              <v-line v-for="e in GEDGES" :key="'ge'+e.a+'-'+e.b" :config="gEdgeCfg(e)" />
              <v-text v-for="e in GEDGES" :key="'gw'+e.a+'-'+e.b" :config="gWeightCfg(e)" />
              <!-- 图节点 -->
              <v-circle v-for="n in GNODES" :key="'g'+n.id" :config="gCircleCfg(n)" />
              <v-text v-for="n in GNODES" :key="'gt'+n.id" :config="gTextCfg(n)" />
              <v-text v-for="n in GNODES" :key="'gd'+n.id" :config="gDistCfg(n)" />
              <!-- 堆 -->
              <v-line v-for="e in tEdges" :key="'e'+e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="tTextCfg(n)" />
              <v-text v-for="n in tNodes" :key="'vid'+n.id" :config="vidTextCfg(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>共同点：</strong>优先队列的精髓是「反复取最优先元素」——调度取最高优先级，Dijkstra 取最小距离</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>任务调度：</strong>大顶堆存 (任务, 优先级)，调度 = 弹堆顶，push O(log n) 支持动态插入</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Dijkstra：</strong>最小堆存 (节点, dist)，弹堆顶找最近节点，松弛邻居后把更短距离入堆</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度：</strong>堆优化 O((V+E) log V)，稀疏图完胜朴素的 O(V²)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>两个坑：</strong>Dijkstra 不能处理负权边；堆里的过期条目要用 lazy deletion 跳过</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-2-priority-queue/dsa-5-2-3-merge-k" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：合并 K 个有序链表/数组</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-3-advanced-heap/dsa-5-3-1-leftist" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：左偏堆 →</RouterLink>
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
  { id: "sec-1", name: "任务调度（大顶堆）" },
  { id: "sec-2", name: "Dijkstra 堆优化" },
  { id: "sec-3", name: "复杂度与对比" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-4", name: "小结" },
]

// ===== 🎬 Dijkstra 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const INF = 9999
const GR = 22, HEAP_R = 20, HEAP_TOP = 250, LEVEL_H = 70
const H = ref(470), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

// 图
const GNODES = [
  { id: 0, x: 120, y: 70 },
  { id: 1, x: 340, y: 40 },
  { id: 2, x: 120, y: 190 },
  { id: 3, x: 340, y: 190 },
  { id: 4, x: 520, y: 115 },
]
const GEDGES = [
  { a: 0, b: 1, w: 4 },
  { a: 0, b: 2, w: 1 },
  { a: 2, b: 1, w: 2 },
  { a: 1, b: 3, w: 1 },
  { a: 2, b: 3, w: 5 },
  { a: 3, b: 4, w: 3 },
]

const dist = ref<number[]>([])
const settled = ref<boolean[]>([])
const gCur = ref<number | null>(null)
const heapElts = ref<{node: number; dist: number}[]>([])
const annot = ref('')
const settledCount = computed(() => settled.value.filter(Boolean).length)

interface TNode { id: number; val: number; x: number; y: number; color: string; s?: number; vid?: number }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{a: number; b: number}[]>([])

function pos(id: number): TNode { return tNodes.find(n => n.id === id) ?? { id, val: 0, x: 0, y: 0, color: C.cyan, s: 1 } }

function gNodeById(id: number) { return GNODES.find(n => n.id === id) ?? GNODES[0] }

function gColor(id: number): string {
  if (gCur.value === id) return C.orange
  if (settled.value[id]) return C.green
  if (dist.value[id] < INF) return C.cyan
  return C.ghost
}

function gEdgeCfg(e: {a: number; b: number}) {
  const a = gNodeById(e.a), b = gNodeById(e.b)
  return { points: [a.x, a.y, b.x, b.y], stroke: '#94a3b8', strokeWidth: 2 }
}
function gWeightCfg(e: {a: number; b: number}) {
  const a = gNodeById(e.a), b = gNodeById(e.b)
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 - 8, text: String(e.w), fontSize: 12, fontFamily: 'monospace', fill: C.muted }
}
function gCircleCfg(n: {id: number; x: number; y: number}) {
  const c = gColor(n.id)
  const dash = c === C.ghost ? [4, 3] : undefined
  return { x: n.x, y: n.y, radius: GR, fill: c, stroke: c === C.orange ? '#d97706' : c === C.ghost ? '#94a3b8' : '#64748b', strokeWidth: c === C.orange ? 3 : 1.5, strokeDasharray: dash, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 4, shadowOffsetY: 2 }
}
function gTextCfg(n: {id: number; x: number; y: number}) {
  return { x: n.x - GR, y: n.y - GR, width: GR * 2, height: GR * 2, text: String(n.id), fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: gColor(n.id) === C.ghost ? C.muted : '#fff', align: 'center', verticalAlign: 'middle' }
}
function gDistCfg(n: {id: number; x: number; y: number}) {
  const dval = dist.value[n.id]
  return { x: n.x, y: n.y + GR + 10, text: dval < INF ? 'dist=' + dval : 'dist=∞', fontSize: 11, fontFamily: 'monospace', fill: settled.value[n.id] ? '#16a34a' : C.muted, align: 'center' as any }
}

function layoutHeap() {
  tNodes.splice(0); tEdges.splice(0)
  const arr = heapElts.value
  const n = arr.length
  let level = [0], y = HEAP_TOP
  while (level.length) {
    const gap = W.value / (level.length + 1)
    level.forEach((idx, i) => {
      tNodes.push({ id: idx, val: arr[idx].dist, vid: arr[idx].node, x: gap * (i + 1), y, color: C.cyan, s: 1 })
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
  return { points: [pa.x, pa.y + HEAP_R, pb.x, pb.y - HEAP_R], stroke: '#94a3b8', strokeWidth: 2 }
}
function circleCfg(n: any) {
  const s = n.s ?? 1
  return { x: n.x, y: n.y, radius: HEAP_R * s, fill: n.color, stroke: n.color === C.orange ? '#d97706' : '#64748b', strokeWidth: n.color === C.orange ? 3 : 1.5, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 4, shadowOffsetY: 2 }
}
function tTextCfg(n: any) {
  const s = n.s ?? 1
  return { x: n.x - HEAP_R, y: n.y - HEAP_R, width: HEAP_R * 2, height: HEAP_R * 2, text: String(n.val), fontSize: 14, fontFamily: 'monospace', fontStyle: 'bold', fill: n.color === C.green ? '#0f172a' : '#fff', align: 'center', verticalAlign: 'middle', scale: { x: s, y: s } }
}
function vidTextCfg(n: any) {
  return { x: n.x, y: n.y + HEAP_R + 8, text: 'v' + (n.vid ?? ''), fontSize: 11, fontFamily: 'monospace', fill: C.muted, align: 'center' as any }
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
    annot.value = `堆调整：比较 ${a.dist} 与父 ${b.dist}`
    await d(260)
    if (a.dist >= b.dist) { pos(i).color = C.cyan; pos(p).color = C.cyan; return }
    ;[heapElts.value[i], heapElts.value[p]] = [heapElts.value[p], heapElts.value[i]]
    layoutHeap()
    pos(i).color = C.green; pos(p).color = C.green; await d(220)
    pos(i).color = C.cyan; pos(p).color = C.cyan
    i = p
  }
}

async function heapSiftDown(i: number) {
  const n = heapElts.value.length
  while (true) {
    const l = 2 * i + 1, r = 2 * i + 2
    let small = i
    if (l < n && heapElts.value[l].dist < heapElts.value[small].dist) small = l
    if (r < n && heapElts.value[r].dist < heapElts.value[small].dist) small = r
    if (small === i) { pos(i).color = C.cyan; return }
    annot.value = `堆调整：${heapElts.value[i].dist} 下沉`
    pos(i).color = C.orange; pos(small).color = C.orange
    await d(260)
    ;[heapElts.value[i], heapElts.value[small]] = [heapElts.value[small], heapElts.value[i]]
    layoutHeap()
    pos(i).color = C.green; pos(small).color = C.green; await d(220)
    pos(i).color = C.cyan; pos(small).color = C.cyan
    i = small
  }
}

function resetAll() {
  dist.value = GNODES.map(() => INF)
  dist.value[0] = 0
  settled.value = GNODES.map(() => false)
  gCur.value = null
  heapElts.value = []; annot.value = ''
  layoutHeap()
  status.value = ''; opLabel.value = ''
}

function doDijkstra() {
  act('Dijkstra 堆优化', 'O((V+E) log V)', async () => {
    dist.value = GNODES.map(() => INF)
    dist.value[0] = 0
    settled.value = GNODES.map(() => false)
    gCur.value = null
    heapElts.value = []; annot.value = ''
    layoutHeap()

    // 起点入堆
    status.value = '起点 0 入堆 (dist=0)'
    heapElts.value.push({ node: 0, dist: 0 })
    layoutHeap()
    pos(0).color = C.green; pos(0).s = 0; await d(60); pos(0).s = 1; await d(250)
    pos(0).color = C.cyan

    while (heapElts.value.length) {
      // 弹堆顶
      const top = heapElts.value[0]
      gCur.value = top.node
      annot.value = `取出距离最小 (v${top.node}, ${top.dist})`
      status.value = `弹出 (v${top.node}, ${top.dist})`
      pos(0).color = C.orange; await d(350)

      // 移除根，末元素补位
      const last = heapElts.value.pop()!
      if (heapElts.value.length) { heapElts.value[0] = last; layoutHeap(); await heapSiftDown(0) }
      else layoutHeap()

      const u = top.node
      gCur.value = null

      // 过期条目检测
      if (settled.value[u]) {
        annot.value = `(v${u}, ${top.dist}) 是过期条目，跳过`
        await d(400)
        annot.value = ''
        continue
      }

      // 确定节点
      settled.value[u] = true
      status.value = `确定 v${u} 最短距离 = ${dist.value[u]}`
      await d(400)

      // 松弛邻居
      for (const e of GEDGES) {
        let v = -1, w = 0
        if (e.a === u) { v = e.b; w = e.w }
        else if (e.b === u) { v = e.a; w = e.w }
        if (v === -1 || settled.value[v]) continue
        const nd = dist.value[u] + w
        if (nd < dist.value[v]) {
          const old = dist.value[v] < INF ? dist.value[v] : '∞'
          dist.value[v] = nd
          annot.value = `松弛 v${u}→v${v}: ${dist.value[u]}+${w}=${nd} < ${old}，入堆`
          heapElts.value.push({ node: v, dist: nd })
          layoutHeap()
          const id = heapElts.value.length - 1
          pos(id).color = C.green; pos(id).s = 0; await d(60); pos(id).s = 1; await d(180)
          await heapSiftUp(id)
          layoutHeap()
          annot.value = ''
        }
      }
      await d(200)
    }

    gCur.value = null
    annot.value = `最短距离: [${dist.value.map(x => x < INF ? x : '∞').join(', ')}]`
    status.value = '完成！所有可达节点已确定最短距离'
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
const taskScheduleCode = `// ===== 任务调度：贪心 + 大顶堆 =====
// 场景：CPU 每时刻只能跑一个任务，任务带优先级，
// 每次调度「优先级最高」的任务（也可换成 deadline 最近）
interface Task { name: string; priority: number }

class MaxHeap {
    private data: Task[] = []
    get size() { return this.data.length }
    push(t: Task) { this.data.push(t); this.siftUp(this.data.length - 1) }
    pop(): Task | undefined {
        const top = this.data[0]
        const last = this.data.pop()!
        if (this.data.length) { this.data[0] = last; this.siftDown(0) }
        return top
    }
    private siftUp(i: number) {
        while (i > 0) {
            const p = (i - 1) >> 1
            if (this.data[i].priority <= this.data[p].priority) break
            ;[this.data[i], this.data[p]] = [this.data[p], this.data[i]]
            i = p
        }
    }
    private siftDown(i: number) {
        const n = this.data.length
        while (true) {
            const l = 2 * i + 1, r = 2 * i + 2
            let big = i
            if (l < n && this.data[l].priority > this.data[big].priority) big = l
            if (r < n && this.data[r].priority > this.data[big].priority) big = r
            if (big === i) break
            ;[this.data[i], this.data[big]] = [this.data[big], this.data[i]]
            i = big
        }
    }
}

function schedule(tasks: Task[]): Task[] {
    const heap = new MaxHeap()
    for (const t of tasks) heap.push(t)        // 建堆 O(n)
    const order: Task[] = []
    while (heap.size) order.push(heap.pop()!)  // 按优先级从高到低弹出
    return order
}
// schedule([{name:'A',priority:5},{name:'B',priority:10},{name:'C',priority:7}])
// 输出: B(10) → C(7) → A(5)
// 若任务动态到达，heap.push O(log n) 远胜每次重排 O(n log n)`

const dijkstraCode = `// ===== Dijkstra 堆优化（LeetCode #743 网络延迟变体）=====
// 朴素版每轮线性扫「未确定且 dist 最小」→ O(V²)
// 堆优化用最小堆直接取最近节点 → O((V+E) log V)
type Edge = { to: number; w: number }
type HeapItem = { node: number; dist: number }

class MinHeap {
    private data: HeapItem[] = []
    get size() { return this.data.length }
    push(it: HeapItem) { this.data.push(it); this.siftUp(this.data.length - 1) }
    pop(): HeapItem | undefined {
        const top = this.data[0]
        const last = this.data.pop()!
        if (this.data.length) { this.data[0] = last; this.siftDown(0) }
        return top
    }
    private siftUp(i: number) {
        while (i > 0) {
            const p = (i - 1) >> 1
            if (this.data[i].dist >= this.data[p].dist) break
            ;[this.data[i], this.data[p]] = [this.data[p], this.data[i]]
            i = p
        }
    }
    private siftDown(i: number) {
        const n = this.data.length
        while (true) {
            const l = 2 * i + 1, r = 2 * i + 2
            let small = i
            if (l < n && this.data[l].dist < this.data[small].dist) small = l
            if (r < n && this.data[r].dist < this.data[small].dist) small = r
            if (small === i) break
            ;[this.data[i], this.data[small]] = [this.data[small], this.data[i]]
            i = small
        }
    }
}

function dijkstra(n: number, adj: Edge[][], src: number): number[] {
    const dist = new Array(n).fill(Infinity)
    dist[src] = 0
    const done = new Array(n).fill(false)
    const heap = new MinHeap()
    heap.push({ node: src, dist: 0 })

    while (heap.size) {
        const { node: u, dist: d } = heap.pop()!
        if (done[u]) continue                    // 过期条目（lazy deletion）
        done[u] = true
        for (const { to, w } of adj[u]) {
            const nd = d + w
            if (nd < dist[to]) {
                dist[to] = nd
                heap.push({ node: to, dist: nd })  // 直接 push，不做 decrease-key
            }
        }
    }
    return dist
}
// 每个节点出堆一次 O(log V)，每条边最多入堆一次 → O((V+E) log V)`

const dijkstraCompareCode = `// ===== 朴素 Dijkstra vs 堆优化 =====
// 朴素：每轮线性扫描找「未确定且 dist 最小」→ O(V²)
// 堆优化：最小堆取堆顶 → O((V+E) log V)

// 选型：
//   稠密图（E ≈ V²）→ 朴素 O(V²) 简单够用
//   稀疏图（E ≈ V）→ 堆优化 ≈ O(V log V) 完胜

// 演示（无向图邻接表）：
//   n = 5, edges = [[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5],[3,4,3]]
//   dijkstra(5, buildAdj(5, edges), 0) → [0, 3, 1, 4, 7]
//   路径：0→2 距离 1；2→1 距离 3；1→3 距离 4；3→4 距离 7

function buildAdj(n: number, edges: [number, number, number][]): Edge[][] {
    const adj: Edge[][] = Array.from({ length: n }, () => [])
    for (const [a, b, w] of edges) {
        adj[a].push({ to: b, w })
        adj[b].push({ to: a, w })   // 无向图加双向边
    }
    return adj
}`
</script>
