<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">✂️ 剪枝策略：可行性 / 最优性 / 对称性</h1>
          <p class="text-sm text-slate-500 mt-1">搜索性能的分水岭——提前砍掉不可能的分支，少走弯路</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 8-2-4</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：决策树上被剪掉的子树
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          剪枝 = 在回溯的 <code>for</code> 循环里加一个「<strong>不值得继续</strong>」的判断，一旦成立就 <code>continue</code>，
          整棵子树（虚线部分）根本不展开。<strong>三种策略对应三种「不值得」的理由</strong>：
          违反约束（红）、上界打不过最优（灰）、结构重复（紫）。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <!-- 主干边 -->
            <line x1="360" y1="84" x2="150" y2="124" stroke="#94a3b8" stroke-width="2" />
            <line x1="360" y1="84" x2="290" y2="124" stroke="#94a3b8" stroke-width="2" />
            <line x1="360" y1="84" x2="430" y2="124" stroke="#94a3b8" stroke-width="2" />
            <line x1="360" y1="84" x2="570" y2="124" stroke="#94a3b8" stroke-width="2" />
            <line x1="150" y1="164" x2="110" y2="204" stroke="#94a3b8" stroke-width="2" />
            <line x1="150" y1="164" x2="190" y2="204" stroke="#94a3b8" stroke-width="2" />
            <!-- 被剪的子树（虚线） -->
            <line x1="290" y1="164" x2="290" y2="204" stroke="#ef4444" stroke-width="2" stroke-dasharray="6 4" />
            <line x1="430" y1="164" x2="430" y2="204" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 4" />
            <line x1="570" y1="164" x2="570" y2="204" stroke="#a855f7" stroke-width="2" stroke-dasharray="6 4" />

            <!-- 根 -->
            <circle cx="360" cy="60" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="60" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#fff">开始</text>

            <!-- 第 1 层 -->
            <circle cx="150" cy="144" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="150" y="144" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">A</text>
            <circle cx="290" cy="144" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="290" y="144" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">B</text>
            <circle cx="430" cy="144" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="430" y="144" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">C</text>
            <circle cx="570" cy="144" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="570" y="144" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">D</text>

            <!-- 第 2 层：解 / 三种剪枝 -->
            <circle cx="110" cy="224" r="18" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="110" y="224" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">✓</text>
            <circle cx="190" cy="224" r="18" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="190" y="224" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">✓</text>

            <circle cx="290" cy="224" r="18" fill="#ef4444" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 3" />
            <text x="290" y="224" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#fff">✗</text>
            <circle cx="430" cy="224" r="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3" />
            <text x="430" y="224" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">上界</text>
            <circle cx="570" cy="224" r="18" fill="#a855f7" stroke="#7c3aed" stroke-width="2" stroke-dasharray="4 3" />
            <text x="570" y="224" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#fff">✗</text>

            <!-- 策略标注 -->
            <text x="205" y="250" font-size="10" font-family="monospace" fill="#16a34a">可行分支 → 解</text>
            <text x="278" y="250" font-size="10" font-family="monospace" fill="#dc2626">可行性剪枝</text>
            <text x="402" y="250" font-size="10" font-family="monospace" fill="#64748b">最优性剪枝</text>
            <text x="556" y="250" font-size="10" font-family="monospace" fill="#7c3aed">对称性剪枝</text>

            <!-- 图例 -->
            <text x="16" y="28" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">虚线 = 被剪掉的子树：根本不会创建节点，直接跳过</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：决策树上的三类剪枝。实线 = 实际搜索路径；虚线 + ✗ / 上界标注 = 被剪掉的分支，其下所有子树都不展开</figcaption>
        </figure>

        <!-- 三策略卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-red-50 border border-red-200 rounded-xl p-4">
            <p class="text-sm font-bold text-red-600 mb-1">① 可行性剪枝</p>
            <p class="text-xs text-red-700 leading-relaxed">违反<strong>硬约束</strong>（越界 / 冲突 / 超过目标）→ 继续也是死路，直接 <code>continue</code>。</p>
          </div>
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p class="text-sm font-bold text-slate-600 mb-1">② 最优性剪枝</p>
            <p class="text-xs text-slate-600 leading-relaxed">计算分支的<strong>上界估计</strong>，上界 ≤ 当前最优 → 砍掉。用于最值 / 背包 / TSP。</p>
          </div>
          <div class="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <p class="text-sm font-bold text-purple-700 mb-1">③ 对称性剪枝</p>
            <p class="text-xs text-purple-700 leading-relaxed">等价的结构（重复数字、对称摆法）<strong>只搜一次</strong>，跳过其余同类。</p>
          </div>
        </div>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          剪枝的本质 —— 正确且更快的暴力
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          回溯本身是暴力枚举；<strong>剪枝</strong>是给暴力加「<strong>早停</strong>」——在分支长出大量子树之前，就判断它不可能产生有用结果并跳过。
          <strong>剪枝必须满足两条铁律：</strong>
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <ol class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">1.</span><span><strong>正确性（不剪错）</strong>：被剪掉的分支里绝不包含「我们需要的解」。可行性剪枝剪掉的是必然违规的；最优性剪枝的上界必须 ≥ 该分支真实最大值</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">2.</span><span><strong>效率（剪得多）</strong>：剪枝判断本身的成本要远小于被剪子树的展开成本。O(1) 判断换掉一整棵子树，才是好买卖</span></li>
          </ol>
        </div>
        <div class="mb-4"><Code language="ts" :code="essenceCode" title="pruning_essence.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          剪枝就像 <strong>React 的 PureComponent / memo</strong>——判断「这个子树的 props 没变，结果必然和上次一样」，就跳过重新渲染整棵组件树。<br/>
          也像构建工具里的 <strong>tree-shaking</strong>：发现某个分支不可能被引用（不可达），直接把它从产物里剪掉，而不是构建出来再删。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          可行性剪枝 —— 违反约束，直接砍
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>可行性剪枝</strong>是最直观也最常用的一种：在生成新分支前，先检查它是否<strong>违背了题目给定的硬性约束</strong>。
          N 皇后检查列/对角线、组合总和检查是否超 target、迷宫检查是否出界——都属此类。
        </p>
        <div class="mb-4"><Code language="ts" :code="feasCode" title="feasibility_pruning.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意「剪枝点」的位置：</strong><br/>
          可行性检查<strong>必须在递归调用之前</strong>做（在 for 循环里 <code>continue</code>），而不是在递归函数开头。
          若放到开头，虽然结果一样，但你已经先创建了这层状态、再进入下一层才发现违规——浪费了递归调用本身的开销。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          最优性剪枝（分支限界）—— 上界打不过当前最优
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          对于<strong>最优化问题</strong>（求最大值 / 最小值），我们维护一个「当前已找到的最优解 <code>best</code>」。
          每进一个分支，先估算它能达到的<strong>上界（最大值）</strong>；如果上界 ≤ <code>best</code>，
          说明这个分支再努力也超不过已有的结果 → <strong>整棵子树剪掉</strong>。这就是<strong>分支限界法 (Branch & Bound)</strong> 的核心。
        </p>
        <div class="mb-4"><Code language="ts" :code="boundCode" title="branch_and_bound.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 上界估计的两个要求：</strong><br/>
          1. <strong>必须乐观（≥ 真实最大）</strong>：低估会误剪最优解——上界是「理论上限」，宁高勿低；<br/>
          2. <strong>尽量紧（接近真实）</strong>：上界越紧，越早触发剪枝。背包问题常用「按价值密度贪心装满」作为紧上界。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          对称性剪枝 —— 等价结构只搜一次
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          当多个分支在结构上<strong>完全等价</strong>时（只是元素顺序不同、或棋盘旋转/翻转后相同），它们会产出重复解。
          <strong>对称性剪枝</strong>通过「只允许第一个同类候选」的规则，把这些等价分支剪掉，把 6 个结果压成 3 个。
        </p>
        <div class="mb-4"><Code language="ts" :code="symCode" title="symmetry_pruning.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          对称性剪枝就像 <strong>React 列表的 key + 去重</strong>——<code>[a,b]</code> 和 <code>[b,a]</code> 渲染结果是同一份 UI，
          你不希望 Diff 把等价节点算两遍。也像 <strong>CSS 合并重复规则</strong>：相同样式只保留一份，删掉等价副本。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          三种策略对比与常见错误
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">可行性剪枝</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">最优性剪枝</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对称性剪枝</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">剪枝理由</td><td class="px-4 py-2 border">违反硬约束</td><td class="px-4 py-2 border">上界 ≤ 当前最优</td><td class="px-4 py-2 border">结构等价重复</td></tr>
              <tr><td class="px-4 py-2 border font-mono">适用问题</td><td class="px-4 py-2 border">所有回溯题</td><td class="px-4 py-2 border">最优化（背包/TSP）</td><td class="px-4 py-2 border">去重/棋盘对称</td></tr>
              <tr><td class="px-4 py-2 border font-mono">判断成本</td><td class="px-4 py-2 border font-mono">O(1)~O(n)</td><td class="px-4 py-2 border font-mono">需要估计函数</td><td class="px-4 py-2 border font-mono">排序 + O(1) 比较</td></tr>
              <tr><td class="px-4 py-2 border font-mono">典型代码</td><td class="px-4 py-2 border font-mono">if (sum &gt; target) continue</td><td class="px-4 py-2 border font-mono">if (upper &lt;= best) return</td><td class="px-4 py-2 border font-mono">if (i&gt;start &amp;&amp; a[i]===a[i-1]) continue</td></tr>
              <tr><td class="px-4 py-2 border font-mono">风险</td><td class="px-4 py-2 border">判断漏了约束</td><td class="px-4 py-2 border">上界低估误剪</td><td class="px-4 py-2 border">忘记排序/去重</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：上界估计过低，剪掉了最优解。</strong><br/>
          上界是「乐观上限」，必须 ≥ 该分支任何可能结果。若为了省事把上界估得太紧（接近实际、甚至低估），
          <code>upper &lt;= best</code> 就会误伤——最优解藏在你剪掉的那棵子树里，结果永远不对。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：对称性剪枝忘了先排序。</strong><br/>
          去重的条件是「重复数字相邻」——<code>nums[i]===nums[i-1]</code> 要求数组先 <code>sort()</code>。
          不排序，相等的元素隔着十万八千里，去重条件永远不触发，剪了个寂寞。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：剪枝条件与撤销顺序颠倒。</strong><br/>
          <code>continue</code> 前若改了状态（如 <code>sum += x</code>），跳过时没还原 sum，后续分支的可行性判断全部错乱。
          铁律：<strong>状态修改与撤销永远成对，剪枝跳过的分支不能留任何状态痕迹。</strong></p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：剪枝前后搜索空间对比
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          先点「▶ 展开完整搜索空间」看完整树（29 个节点）；再逐个点亮三个剪枝按钮——
          <strong>红 = 可行性剪枝，灰 = 最优性剪枝，紫 = 对称性剪枝</strong>，被剪节点变暗打 ✗、进入边变虚线。
          右上角实时对比「完整 vs 剪枝后」的搜索节点数。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 搜索节点: {{ exploredCount }}/29</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="pct > 0" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">✂️ 剪掉 {{ pct }}%</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doExpand" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">▶ 展开完整搜索空间</button>
          <button @mousedown="toggleFeat" :class="['px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95',
            featOn ? 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200' : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100']">✂️ 可行性剪枝</button>
          <button @mousedown="toggleOpt" :class="['px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95',
            optOn ? 'bg-slate-200 text-slate-700 border-slate-300 hover:bg-slate-300' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100']">✂️ 最优性剪枝</button>
          <button @mousedown="toggleSym" :class="['px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95',
            symOn ? 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200' : 'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100']">✂️ 对称性剪枝</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="txtCfg(n)" />
              <v-text v-for="n in cutNodes" :key="'x'+n.id" :config="cutMark(n)" />
            </v-layer>
          </v-stage>
        </div>
        <p class="text-xs text-slate-400 mt-2">🔵 正常搜索 &nbsp; 🔴 可行性剪枝 &nbsp; ⚪ 最优性剪枝 &nbsp; 🟣 对称性剪枝 &nbsp; ✗ 被剪节点 &nbsp; 虚线 = 被剪分支的边</p>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>剪枝本质</strong>：在生成子树前判断「不值得」，跳过整个分支——正确且更快</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>可行性剪枝</strong>：违反硬约束（超限/冲突/越界）直接 <code>continue</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>最优性剪枝</strong>：上界 ≤ 当前最优则剪；上界必须乐观且尽量紧（分支限界法）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>对称性剪枝</strong>：重复数字先排序，同层只试第一个；棋盘对称问题用旋转等价去重</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>剪枝铁律</strong>：不剪错（上界乐观）、剪得多（判断成本低）、状态修改与撤销成对</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>下一篇进入<strong>分支限界法专题</strong>：活结点、扩展、限界函数（含 TSP）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-2-backtracking/dsa-8-2-3-n-queens" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：N皇后/数独/括号生成</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-3-branch-bound/dsa-8-3-1-principle" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：分支限界原理 →</RouterLink>
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
  { id: "sec-1", name: "剪枝的本质" },
  { id: "sec-2", name: "可行性剪枝" },
  { id: "sec-3", name: "最优性剪枝" },
  { id: "sec-4", name: "对称性剪枝" },
  { id: "sec-5", name: "对比与常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 剪枝前后搜索空间对比动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const SYM_COL = '#a855f7'
const OPT_COL = '#94a3b8'
const H = ref(340), W = ref(700)
const YS = [45, 115, 185, 255]

// 搜索树（抽象）：0=根，1-4 第1层，5-12 第2层，13-28 叶子
const CHILD: Record<number, number[]> = {
  0:[1,2,3,4],
  1:[5,6], 2:[7,8], 3:[9,10], 4:[11,12],
  5:[13,14], 6:[15,16], 7:[17,18], 8:[19,20], 9:[21,22], 10:[23,24], 11:[25,26], 12:[27,28],
}
const DEPTH: Record<number, number> = { 0: 0 }
{
  const q: number[] = [0]
  while (q.length) {
    const id = q.shift()!
    CHILD[id].forEach(c => { DEPTH[c] = DEPTH[id] + 1; q.push(c) })
  }
}
// 各策略剪掉的节点（子树整体，互不重叠）
const FEAS = new Set([8, 9, 19, 20, 21, 22])
const OPT = new Set([6, 10, 15, 16, 23, 24])
const SYM = new Set([11, 12, 25, 26, 27, 28])
const TOTAL = 29

interface PNode { id: number; x: number; y: number }
const tNodes = reactive<PNode[]>([])
const tEdges = reactive<{a:number;b:number}[]>([])
const revealed = reactive<boolean[]>(new Array(TOTAL).fill(false))
const featOn = ref(false), optOn = ref(false), symOn = ref(false)
const busy = ref(false), status = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

function xfFor(id:number) {
  if (id === 0) return 0.5
  if (id <= 4) return id / 5          // 1..4 → 0.2..0.8
  if (id <= 12) return (id - 4) / 9   // 5..12 → 1/9..8/9
  return (id - 12) / 17               // 13..28 → 1/17..16/17
}

function layout() {
  tNodes.length = 0; tEdges.length = 0
  for (let id = 0; id < TOTAL; id++) {
    tNodes.push({ id, x: W.value * xfFor(id), y: YS[DEPTH[id]] })
  }
  Object.keys(CHILD).forEach(k => {
    CHILD[+k].forEach(c => tEdges.push({ a:+k, b:c }))
  })
}

// 节点在当前开关下的状态
function stateOf(id:number) {
  if (featOn.value && FEAS.has(id)) return { fill:C.red, cut:true, edge:C.red }
  if (optOn.value && OPT.has(id)) return { fill:OPT_COL, cut:true, edge:OPT_COL }
  if (symOn.value && SYM.has(id)) return { fill:SYM_COL, cut:true, edge:SYM_COL }
  return { fill:C.cyan, cut:false, edge:'#94a3b8' }
}
function radiusOf(id:number) { return DEPTH[id] === 3 ? 13 : 15 }

function circleCfg(n:any) {
  const st = stateOf(n.id)
  const vis = revealed[n.id]
  return { x:n.x, y:n.y, radius:radiusOf(n.id), fill: vis ? st.fill : '#f1f5f9',
    stroke: vis ? (st.cut ? st.edge : '#64748b') : '#e2e8f0', strokeWidth: vis ? (st.cut ? 2 : 1.5) : 1,
    strokeDashEnabled: vis && st.cut, dash: vis && st.cut ? [4,3] : undefined,
    shadowColor: vis && !st.cut ? 'rgba(0,0,0,.1)' : 'transparent', shadowBlur:3,
    opacity: vis ? 1 : 0.5 }
}
function txtCfg(n:any) {
  const vis = revealed[n.id]
  return { x:n.x-12, y:n.y-12, width:24, height:24, text:String(n.id), fontSize: DEPTH[n.id]===3 ? 8 : 10,
    fontFamily:'monospace', fontStyle:'bold', fill: vis ? '#fff' : C.muted, align:'center', verticalAlign:'middle' }
}
function cutMark(n:any) {
  const st = stateOf(n.id)
  if (!st.cut || !revealed[n.id]) return { x:0, y:0, text:'' }
  return { x:n.x-8, y:n.y-26, width:16, height:16, text:'✗', fontSize:14, fontFamily:'monospace', fontStyle:'bold',
    fill: st.edge, align:'center', verticalAlign:'middle' }
}
const cutNodes = computed(() => tNodes.filter(n => {
  const st = stateOf(n.id)
  return st.cut && revealed[n.id]
}))

function edgeCfg(e:{a:number;b:number}) {
  const pa = tNodes.find(n => n.id===e.a)!, pb = tNodes.find(n => n.id===e.b)!
  const st = stateOf(e.b)
  const vis = revealed[e.a] || revealed[e.b]
  return { points:[pa.x, pa.y+radiusOf(e.a), pb.x, pb.y-radiusOf(e.b)],
    stroke: vis ? (st.cut ? st.edge : '#94a3b8') : '#e2e8f0', strokeWidth: st.cut ? 2 : 1.8,
    dash: vis && st.cut ? [6,4] : undefined, lineCap:'round' as const }
}

const prunedTotal = computed(() => {
  let s = 0
  if (featOn.value) s += FEAS.size
  if (optOn.value) s += OPT.size
  if (symOn.value) s += SYM.size
  return s
})
const exploredCount = computed(() => {
  const r = revealed.filter(Boolean).length
  return Math.max(0, r - prunedTotal.value)
})
const pct = computed(() => Math.round(prunedTotal.value / TOTAL * 100))

function doReset() {
  busy.value = false
  revealed.fill(false)
  featOn.value = false; optOn.value = false; symOn.value = false
  status.value = ''
}

async function doExpand() {
  if (busy.value) return
  busy.value = true
  for (let id = 0; id < TOTAL; id++) {
    revealed[id] = true
    status.value = `展开节点 ${id}…（第 ${DEPTH[id]} 层）`
    await d(42)
  }
  status.value = '完整搜索空间 = 29 个节点。现在开启剪枝开关对比 ↓'
  await d(500)
  busy.value = false
}
function toggleFeat() { featOn.value = !featOn.value; syncStatus() }
function toggleOpt() { optOn.value = !optOn.value; syncStatus() }
function toggleSym() { symOn.value = !symOn.value; syncStatus() }
function syncStatus() {
  if (prunedTotal.value === 0) { status.value = '完整搜索：29 个节点全要探索' }
  else { status.value = `剪枝后只需探索 ${exploredCount.value} 个节点（省 ${pct.value}%）` }
}

let ro: ResizeObserver | null = null
onMounted(() => {
  layout()
  if (box.value) {
    W.value = box.value.clientWidth
    layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const essenceCode = `// ===== 剪枝的本质：模板里的两个 continue 位 =====

function backtrack(path: number[], sum: number) {
  if (isSolution(path)) { record(path); return }

  for (const cand of candidates) {
    // ── 剪枝位 1：可行性 ── 违反约束，直接跳过
    if (sum + cand > LIMIT) continue

    // ── 剪枝位 2：最优性 ── 上界打不过当前最优，跳过
    if (upperBound(path, cand) <= best) continue

    path.push(cand)              // 选择
    backtrack(path, sum + cand)  // 递归
    path.pop()                   // 撤销
  }
}

// 剪枝正确性验证：
//   ❌ 剪错（损失解） = 把「可能产生解」的分支误删
//   ✅ 正确  = 被剪分支的任意结果都不可能优于已有解/满足约束
// 代价账本：
//   剪枝判断 O(1)  <  被剪子树的 2^k 次展开成本  →  才值得剪`

const feasCode = `// ===== 可行性剪枝：违反硬约束，直接砍 =====
// 例：子集和 —— 从 [3,4,5] 中选数，和恰好 = 9

function subsetSum(candidates: number[], target: number): number[][] {
  const res: number[][] = []
  const path: number[] = []

  const dfs = (start: number, sum: number) => {
    if (sum === target) { res.push([...path]); return }    // 解
    for (let i = start; i < candidates.length; i++) {
      // ★ 可行性剪枝：sum 已超目标，继续只会更大 → 直接跳过
      if (sum + candidates[i] > target) continue
      path.push(candidates[i])
      dfs(i, sum + candidates[i])      // 允许重复选
      path.pop()
    }
  }

  dfs(0, 0)
  return res
}

console.log(subsetSum([3, 4, 5], 9))
// 输出: [[3,3,3], [4,5]]
// 剪枝效果：sum 达到 10/11/12… 的分支根本不会被创建，
// 少探索约一半的节点 —— 这就是「可行域之外一步不踩」`

const boundCode = `// ===== 最优性剪枝（分支限界）：上界 ≤ 当前最优 → 剪 =====
// 例：0/1 背包 —— 容量 W 内价值最大化

interface Item { w: number; v: number }

function knapsack(items: Item[], W: number): number {
  // 按价值密度降序（供上界估计用）
  items.sort((a, b) => b.v/b.w - a.v/a.w)
  let best = 0

  const dfs = (i: number, w: number, val: number) => {
    if (i === items.length) { best = Math.max(best, val); return }

    // 上界估计：剩下的物品按密度「尽量装满」能拿到的价值
    const upper = val + greedyUpper(i, W - w, items)
    if (upper <= best) return            // ★ 最优性剪枝：上界都打不过 best

    if (w + items[i].w <= W) dfs(i + 1, w + items[i].w, val + items[i].v)   // 选
    dfs(i + 1, w, val)                                                       // 不选
  }

  dfs(0, 0, 0)
  return best
}

// 上界估计：乐观地把剩余空间按密度装满（允许装一部分）
function greedyUpper(i: number, remain: number, items: Item[]): number {
  let r = remain, v = 0
  for (let k = i; k < items.length; k++) {
    if (items[k].w <= r) { v += items[k].v; r -= items[k].w }
    else { v += items[k].v * (r / items[k].w); break }   // 可拆分，取比例
  }
  return v
}
// 上界必须 ≥ 真实最大（乐观），否则会误剪最优解`

const symCode = `// ===== 对称性剪枝：等价结构只搜一次 =====
// 例：含重复数字的全排列 —— [1,1,2] 只有 3 个排列而非 6 个

function permuteUnique(nums: number[]): number[][] {
  nums.sort((a, b) => a - b)          // ★ 先排序，让重复数字相邻
  const res: number[][] = []
  const path: number[] = []
  const used = new Array(nums.length).fill(false)

  const dfs = () => {
    if (path.length === nums.length) { res.push([...path]); return }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue
      // ★ 对称性剪枝：同层相同数字，只允许第一个出现
      // !used[i-1] 保证「上一层刚撤销的相同数字」不再被重新选入
      if (i > 0 && nums[i] === nums[i-1] && !used[i-1]) continue
      path.push(nums[i]); used[i] = true
      dfs()
      path.pop(); used[i] = false
    }
  }

  dfs()
  return res
}

console.log(permuteUnique([1, 1, 2]))
// 输出 3 个（不是 6 个）：[1,1,2] [1,2,1] [2,1,1]
// 等价分支（如两个 1 互换位置）被合并为一次搜索`
</script>
