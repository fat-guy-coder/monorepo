<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">✂️ 最小割与最大流-最小割定理</h1>
          <p class="text-sm text-slate-500 mt-1">max-flow = min-cut —— 两个问题一个答案</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-5-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：把网络切成两半，代价最小的那一刀
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>割（cut）</strong>就是把顶点集分成两份：<strong>S 侧</strong>（含源点 s）和 <strong>T 侧</strong>（含汇点 t）。
          <strong>割容量</strong> = 所有「从 S 侧指向 T 侧」的边的容量之和。最小割就是<strong>代价最小的那一刀</strong>——
          而最大流-最小割定理告诉我们：<strong>最大流的值 = 最小割的容量</strong>，一个算法的输出直接就是另一个问题的答案。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="16" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">割：虚线把网络分成 S 侧 {s,A,B} 与 T 侧 {C,t}；红色 = 跨割边（S→T 方向）</text>

            <!-- 非跨割边（浅灰） -->
            <line x1="92" y1="120" x2="208" y2="60" stroke="#cbd5e1" stroke-width="2" />
            <line x1="92" y1="120" x2="208" y2="180" stroke="#cbd5e1" stroke-width="2" />
            <line x1="230" y1="82" x2="230" y2="158" stroke="#cbd5e1" stroke-width="2" />
            <line x1="442" y1="120" x2="558" y2="120" stroke="#cbd5e1" stroke-width="2" />
            <!-- 跨割边（红色加粗） -->
            <line x1="252" y1="60" x2="398" y2="120" stroke="#ef4444" stroke-width="3.5" />
            <line x1="252" y1="180" x2="398" y2="120" stroke="#ef4444" stroke-width="3.5" />
            <!-- 割线 -->
            <line x1="500" y1="34" x2="500" y2="206" stroke="#64748b" stroke-width="2" stroke-dasharray="7 5" />
            <text x="500" y="26" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">割 δ(S)</text>

            <text x="324" y="80" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#ef4444">2</text>
            <text x="324" y="164" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#ef4444">2</text>

            <!-- S 侧节点 -->
            <circle cx="70" cy="120" r="22" fill="#a78bfa" stroke="#7c3aed" stroke-width="2" />
            <text x="70" y="120" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">s</text>
            <circle cx="230" cy="60" r="22" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
            <text x="230" y="60" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">A</text>
            <circle cx="230" cy="180" r="22" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
            <text x="230" y="180" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">B</text>
            <!-- T 侧节点 -->
            <circle cx="420" cy="120" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="420" y="120" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#64748b">C</text>
            <circle cx="580" cy="120" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="580" y="120" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#64748b">t</text>

            <text x="70" y="158" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">源点 s</text>
            <text x="580" y="158" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">汇点 t</text>
            <text x="16" y="232" font-size="12" font-family="monospace" fill="#64748b">割容量 = 2 + 2 = 4 —— 只统计 S→T 方向，反向边（T→S）不计数</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：s-t 割 —— 切断 A→C 和 B→C 两条管道，s 与 t 彻底断联，代价 = 4</figcaption>
        </figure>

        <!-- 关键操作 before/after -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：先算最大流，再沿残余网络圈出最小割</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <svg viewBox="0 0 360 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="16" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">最大流 = 4 后：从 s 沿残余网络 BFS</text>
              <line x1="62" y1="110" x2="108" y2="50" stroke="#94a3b8" stroke-width="2" />
              <line x1="152" y1="50" x2="208" y2="110" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4" />
              <line x1="62" y1="110" x2="108" y2="170" stroke="#94a3b8" stroke-width="2" />
              <line x1="152" y1="170" x2="208" y2="110" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4" />
              <circle cx="40" cy="110" r="20" fill="#f59e0b" stroke="#d97706" stroke-width="3" />
              <text x="40" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">s</text>
              <circle cx="130" cy="50" r="20" fill="#f59e0b" stroke="#d97706" stroke-width="3" />
              <text x="130" y="50" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <circle cx="130" cy="170" r="20" fill="#f59e0b" stroke="#d97706" stroke-width="3" />
              <text x="130" y="170" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <circle cx="230" cy="110" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="230" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">C</text>
              <circle cx="330" cy="110" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="330" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">t</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">可达集 S = {s,A,B}（橙色）——A→C、B→C 已饱和，t 不可达</figcaption>
          </figure>
          <figure>
            <svg viewBox="0 0 360 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="16" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">最小割 = 跨割边容量和 = 4 = 最大流 ✓</text>
              <line x1="62" y1="110" x2="108" y2="50" stroke="#cbd5e1" stroke-width="2" />
              <line x1="62" y1="110" x2="108" y2="170" stroke="#cbd5e1" stroke-width="2" />
              <line x1="152" y1="50" x2="208" y2="110" stroke="#ef4444" stroke-width="3.5" />
              <line x1="152" y1="170" x2="208" y2="110" stroke="#ef4444" stroke-width="3.5" />
              <text x="180" y="70" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#ef4444">2</text>
              <text x="180" y="158" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#ef4444">2</text>
              <circle cx="40" cy="110" r="20" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="40" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">s</text>
              <circle cx="130" cy="50" r="20" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="130" y="50" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">A</text>
              <circle cx="130" cy="170" r="20" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="130" y="170" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">B</text>
              <circle cx="230" cy="110" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="230" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">C</text>
              <circle cx="330" cy="110" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="330" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">t</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">S 侧 = {s,A,B}（绿）、T 侧 = {C,t}（灰）；跨割边 A→C、B→C（红）</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 割的定义 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          割（s-t cut）的定义与容量
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          给定流网络 G = (V, E) 与源点 s、汇点 t：把顶点集 V 分成<strong>两个不相交的集合 S 和 T = V \ S</strong>，
          要求 <strong>s ∈ S</strong> 且 <strong>t ∈ T</strong>。这样的划分叫一个 <strong>s-t 割</strong>。
        </p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>割 δ(S)</strong>：所有「起点在 S、终点在 T」的边的集合。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>割容量 c(S, T)</strong> = δ(S) 中所有边的容量之和。<strong>反向边（T→S）不计数</strong>，因为切断只需阻止 S→T 方向。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>最小割</strong>：所有 s-t 割中容量最小的那个。物理意义：<strong>花最少的代价（容量）把 s 和 t 彻底断开</strong>。</span></li>
        </ul>
        <div class="mb-4"><Code language="ts" :code="cutCapacityCode" title="cut_capacity.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          最小割就像<strong>掐断最关键的几条网线让 A/B 两个机房断联，成本最低</strong>——你不需要剪掉所有线缆，
          只要找到「把两区隔开的那一刀」，剪断跨越这一刀的几条线（容量即成本）就够了。
          </p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① 把「T→S 的反向边」也算进割容量——割只统计 <strong>S→T</strong> 方向，反向边在割中毫无意义。<br/>
          ② 以为割容量和「边数」有关——容量是<strong>容量之和</strong>，一条容量 100 的边可能比三条容量 1 的边代价大得多。
          </p>
        </aside>
      </section>

      <!-- 2. 定理 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          最大流-最小割定理：直观理解与证明思路
        </h2>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">最大流的值 = 最小割的容量（max-flow = min-cut）</p>
          <p class="text-xs text-cyan-600 text-center">对任意流网络：max |f| = min c(S, T)</p>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm"><strong>为什么「任意可行流 ≤ 任意割容量」？</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>水从 s 流到 t，<strong>必经每一刀</strong>：任何 S→T 割都是 s→t 的「收费站」，所有流量都得从 S 侧穿到 T 侧。</li>
          <li>而能穿过的总量 ≤ 这刀的容量之和（容量约束）。所以 <strong>任意流的流量 ≤ 任意割的容量</strong>（弱对偶）。</li>
          <li>于是：最大流 ≤ 最小割。要证明相等，只需构造一个「流量 = 割容量」的配对。</li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm"><strong>为什么当算法停住时两者相等？</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>Ford-Fulkerson 类算法结束的条件：<strong>残余网络中 s 到 t 不可达</strong>。</li>
          <li>取 S = 残余网络中从 s 能到达的所有节点，T = 其余节点。这是一个合法的 s-t 割。</li>
          <li>对任意跨割边 (u∈S, v∈T)：若残余容量 &gt; 0，v 就该被 BFS 到达，矛盾 → 每条跨割边<strong>都被流量填满</strong>（f = c）。</li>
          <li>对任意反向边 (v∈T, u∈S)：若流量 &gt; 0，则反向残余 &gt; 0，矛盾 → 它的流量必为 0。因此 <strong>总流量 = Σ 跨割边容量 = 割容量</strong>。</li>
          <li>于是该割的容量 ≤ 任意割 → 它就是最小割；同时流的值 = 它 → 它就是最大流。定理得证。</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          定理就像<strong>水管最大流量 = 最窄瓶颈处截面积</strong>——无论水管网络多复杂，总流量永远被「最细的那一段」卡住；
          找到最细瓶颈（最小割），就等于知道了最大输水量（最大流）。也像 <strong>Web 应用的吞吐上限</strong>：
          整体并发再高，卡在关键链路（割）上的处理能力就是天花板。
          </p>
        </aside>
      </section>

      <!-- 3. 用最大流求最小割 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          用最大流求最小割：残量网络可达集 S
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          定理的证明本身就是<strong>求最小割的算法</strong>——跑完最大流后，再从 s 沿残余网络 BFS 一遍：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>先跑一遍最大流（Edmonds-Karp 或 Dinic），得到流量矩阵 flow。</li>
          <li>在残余网络（cap − flow &gt; 0 的边）中从 s 做 BFS，把可达节点收进集合 S。</li>
          <li>最小割边 = 所有「起点在 S、终点不在 S」的原图边；割容量 = 它们的容量之和 = 最大流值。</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="minCutCode" title="min_cut.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>BFS 用的是<strong>残余网络</strong>而不是原网络——饱和边（流量 = 容量）在残余网络里已经「消失」，
          这正是为什么 S 集合恰好停在最小割的另一侧。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① 忘了先算最大流就直接 BFS 原图——那样 S 可能是全图，割不是最小的。<br/>
          ② 用「流量 = 0 的边」或「容量 = 流量的边」当判断依据，而不是用<strong>残余容量 &gt; 0</strong>。
          </p>
        </aside>
      </section>

      <!-- 4. 应用场景 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          应用场景：网络脆弱点与图像分割
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">场景</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">怎么建模</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">割的物理意义</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">网络脆弱点</td><td class="px-4 py-2 border">服务器 = 节点，链路 = 边（容量 = 带宽/成本）</td><td class="px-4 py-2 border">把全网断开成两半的最小割断成本；逐边模拟断链可定位「最关键链路」</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">图像分割</td><td class="px-4 py-2 border">像素 = 节点，相邻像素 = 边（容量 = 相似度），前景连 s、背景连 t</td><td class="px-4 py-2 border">把图片切成前景/背景的最小代价（能量函数全局最优，即 Graph Cut）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">二分图最大匹配</td><td class="px-4 py-2 border">见 6-5-3：加超级源汇、容量全 1</td><td class="px-4 py-2 border">最小割 = 最小点覆盖，与最大匹配互为对偶（König 定理）</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="vulnerableCode" title="critical_links.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>凡是问题里出现「<strong>把图分成两块、代价最小</strong>」或「<strong>找最关键的几条边/节点</strong>」，
          先想想能不能建模成 s-t 割——最大流算法已经帮你把最难的优化部分做完了。</p>
        </aside>
      </section>

      <!-- 5. 复杂度 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          复杂度与实现要点
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">步骤</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">操作</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">复杂度</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">①</td><td class="px-4 py-2 border">跑最大流（Dinic）</td><td class="px-4 py-2 border font-mono">O(V²·E)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">②</td><td class="px-4 py-2 border">残余网络从 s 做 BFS 求可达集 S</td><td class="px-4 py-2 border font-mono">O(V + E)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">③</td><td class="px-4 py-2 border">枚举跨割边、累加容量</td><td class="px-4 py-2 border font-mono">O(V + E)</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          整体复杂度就是最大流那一步的复杂度，后两步都是线性扫描——所以「求最小割」和「求最大流」<strong>成本完全相同</strong>，
          这正是定理最实用的地方：一个算法，两个答案。
        </p>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>求「最小割边集合」时漏了<strong>原图中起点在 S、终点不在 S 的边</strong>——判断标准永远是
          「原图边 + 方向 S→T」，而不是「残余网络里有边」。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：最大流 = 最小割
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          和 6-5-1 同一张网络。「求最大流」先算出 max-flow = 4；「标出最小割」再从源点沿<strong>残余网络</strong> BFS：
          可达节点变绿（S 侧）、不可达变灰（T 侧），跨割边变红加粗，状态栏显示 min-cut 与 max-flow 相等。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">📊 总流量: {{ totalFlow }}</span>
          <span v-if="cutVal !== null" class="bg-red-50 text-red-600 px-2 py-1 rounded-full">✂️ 最小割: {{ cutVal }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doMaxFlow" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">⚡ 求最大流</button>
          <button @mousedown="doMinCut" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm">✂️ 标出最小割</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-arrow v-for="e in gEdges" :key="e.from+e.to+(e.rev?'r':'')" :config="arrowCfg(e)" />
              <v-text v-for="e in gEdges" :key="'w'+e.from+e.to+(e.rev?'r':'')" :config="weightCfg(e)" />
              <v-circle v-for="n in gNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in gNodes" :key="'t'+n.id" :config="labelCfg(n)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>割</strong>：s∈S、t∈T 的顶点二分；割容量 = S→T 方向边容量之和（反向不计数）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>弱对偶</strong>：任意可行流 ≤ 任意割容量（水必经每一刀，通过量 ≤ 刀的容量）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>定理</strong>：max-flow = min-cut；算法停住时残量网络 s 不可达 t，可达集 S 就是最小割</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>算法</strong>：跑最大流 → 残余网络 BFS 求 S → 枚举跨割边，总复杂度 = 最大流复杂度</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>应用</strong>：网络脆弱点、图像分割（Graph Cut）、二分图最小点覆盖</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下一步</strong>：6-5-3 把二分图最大匹配归约为最大流</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-5-network-flow/dsa-6-5-1-max-flow" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：最大流：Ford-Fulkerson/Edmonds-Karp/Dinic</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-5-network-flow/dsa-6-5-3-bipartite-match" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：二分图最大匹配与最大流归约 →</RouterLink>
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
  { id: "sec-1", name: "割的定义与容量" },
  { id: "sec-2", name: "最大流-最小割定理" },
  { id: "sec-3", name: "用最大流求最小割" },
  { id: "sec-4", name: "应用场景" },
  { id: "sec-5", name: "复杂度" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 最小割动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(330), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const cutVal = ref<number | null>(null)
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

interface GNode { id: string; label: string; x: number; y: number; color: string }
interface GEdge { from: string; to: string; w: number; flow: number; color: string; rev?: boolean; dashed?: boolean }
const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])

const totalFlow = computed(() => gEdges.filter(e => !e.rev && e.to === 'T').reduce((s, e) => s + e.flow, 0))

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)
  cutVal.value = null
  ;[
    { id:'S', label:'s', x:80, y:165, color:C.violet },
    { id:'A', label:'A', x:230, y:85, color:C.cyan },
    { id:'B', label:'B', x:230, y:245, color:C.cyan },
    { id:'C', label:'C', x:420, y:165, color:C.cyan },
    { id:'T', label:'t', x:590, y:165, color:C.blue },
  ].forEach(n => gNodes.push({ ...n }))
  ;[
    { from:'S', to:'A', w:3 }, { from:'S', to:'B', w:3 }, { from:'A', to:'B', w:3 },
    { from:'A', to:'C', w:2 }, { from:'B', to:'C', w:2 }, { from:'C', to:'T', w:4 },
  ].forEach(e => gEdges.push({ ...e, flow:0, color:'#94a3b8' }))
}

function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function fwd(u: string, v: string): GEdge | undefined { return gEdges.find(e => !e.rev && e.from === u && e.to === v) }
function residual(u: string, v: string): number {
  const f = fwd(u, v)
  if (f) return f.w - f.flow
  const rf = fwd(v, u)
  return rf ? rf.flow : 0
}
function edgeFor(u: string, v: string): GEdge | undefined { return gEdges.find(e => e.from === u && e.to === v) }

function syncRevEdges() {
  for (let i = gEdges.length - 1; i >= 0; i--) if (gEdges[i].rev) gEdges.splice(i, 1)
  gEdges.filter(e => !e.rev && e.flow > 0).forEach(e => {
    gEdges.push({ from: e.to, to: e.from, w: e.flow, flow: 0, color: '#94a3b8', rev: true, dashed: true })
  })
}

function findAugPath(): string[] | null {
  const prev: Record<string, string> = {}
  const visited = new Set<string>(['S'])
  const q: string[] = ['S']
  while (q.length) {
    const u = q.shift()!
    if (u === 'T') break
    for (const n of gNodes) {
      const v = n.id
      if (visited.has(v)) continue
      if (residual(u, v) > 0) { visited.add(v); prev[v] = u; q.push(v) }
    }
  }
  if (!visited.has('T')) return null
  const path: string[] = ['T']
  let cur = 'T'
  while (cur !== 'S') { cur = prev[cur]; path.unshift(cur) }
  return path
}

function restoreNodes() {
  gNodes.forEach(n => {
    if (n.id === 'S') n.color = C.violet
    else if (n.id === 'T') n.color = C.blue
    else n.color = C.cyan
  })
}

function paintFlowEdges() {
  gEdges.forEach(e => { if (!e.rev) e.color = e.flow > 0 ? C.green : '#94a3b8' })
}

async function augmentOnce(animate: boolean): Promise<boolean> {
  const path = findAugPath()
  if (!path) {
    status.value = '❌ 无增广路 —— 已是最大流'
    await d(800)
    return false
  }
  let delta = Infinity
  for (let i = 0; i < path.length - 1; i++) delta = Math.min(delta, residual(path[i], path[i+1]))
  restoreNodes(); paintFlowEdges()
  for (let i = 0; i < path.length - 1; i++) {
    const e = edgeFor(path[i], path[i+1])
    if (e) e.color = C.orange
    const n = pos(path[i]); if (n) n.color = C.orange
  }
  const nt = pos('T'); if (nt) nt.color = C.orange
  status.value = '🔍 增广路: ' + path.join(' → ') + '，δ = ' + delta
  await d(800)

  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i], v = path[i+1]
    const f = fwd(u, v)
    if (f) f.flow += delta
    else { const rf = fwd(v, u); if (rf) rf.flow -= delta }
  }
  syncRevEdges()
  restoreNodes(); paintFlowEdges()
  status.value = '✅ 总流量 = ' + totalFlow.value
  await d(800)
  restoreNodes()
  return true
}

async function doMaxFlow() {
  await act('计算最大流', 'Dinic / EK', async () => {
    initGraph()
    let guard = 0
    while (guard++ < 20) {
      const more = await augmentOnce(true)
      if (!more) break
    }
    status.value = '🏁 max-flow = ' + totalFlow.value
    await d(600)
  })
}

async function doMinCut() {
  await act('沿残余网络从 s 做 BFS', 'min-cut', async () => {
    // 若还没算最大流，先快速算完
    let guard = 0
    while (guard++ < 20) {
      const more = await augmentOnce(false)
      if (!more) break
    }
    // BFS 残余网络，求可达集
    const sSet = new Set<string>(['S'])
    const q: string[] = ['S']
    while (q.length) {
      const u = q.shift()!
      for (const n of gNodes) {
        const v = n.id
        if (sSet.has(v)) continue
        if (residual(u, v) > 0) { sSet.add(v); q.push(v) }
      }
    }
    // 上色：S 侧绿、T 侧灰
    gNodes.forEach(n => { n.color = sSet.has(n.id) ? C.green : C.ghost })
    // 跨割边：S→T 方向的原图边变红
    let sum = 0
    const crossed: string[] = []
    gEdges.forEach(e => {
      if (e.rev) return
      if (sSet.has(e.from) && !sSet.has(e.to)) {
        e.color = C.red
        crossed.push(e.from + '→' + e.to + '(' + e.w + ')')
        sum += e.w
      }
    })
    cutVal.value = sum
    status.value = '✂️ 最小割 = ' + sum + ' = max-flow(' + totalFlow.value + ') ✓  ' + crossed.join('  ')
    await d(1600)
  })
}

function doReset() { initGraph(); status.value = ''; opLabel.value = '' }

async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

function arrowCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  const base = { points:[a.x, a.y, b.x, b.y], pointerLength:10, pointerWidth:8 }
  if (e.rev || e.dashed) return { ...base, fill:'#cbd5e1', stroke:'#cbd5e1', strokeWidth:1.5, dash:[6,4] }
  if (e.color !== '#94a3b8') return { ...base, fill:e.color, stroke:e.color, strokeWidth:3 }
  return { ...base, fill:'#94a3b8', stroke:'#94a3b8', strokeWidth:2 }
}
function weightCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  const label = e.rev ? String(e.w) : (e.flow + '/' + e.w)
  return { x:(a.x+b.x)/2 - 30, y:(a.y+b.y)/2 - 10, width:60, text:label, fontSize:11, fontFamily:'monospace', fill:e.rev ? '#94a3b8' : C.muted, align:'center' }
}
function circleCfg(n: GNode) {
  let stroke = '#0891b2', sw = 1.5
  if (n.color === C.orange) { stroke = '#d97706'; sw = 3 }
  else if (n.color === C.green) { stroke = '#16a34a'; sw = 3 }
  else if (n.color === C.red) { stroke = '#b91c1c'; sw = 3 }
  else if (n.color === C.violet) { stroke = '#7c3aed'; sw = 2 }
  else if (n.color === C.blue) { stroke = '#2563eb'; sw = 2 }
  else if (n.color === C.ghost) { stroke = '#94a3b8'; sw = 1.5 }
  return { x:n.x, y:n.y, radius:22, fill:n.color, stroke, strokeWidth:sw, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
}
function labelCfg(n: GNode) {
  return { x:n.x-22, y:n.y-22, width:44, height:44, text:n.label, fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle' }
}

let ro: ResizeObserver|null = null
onMounted(() => {
  initGraph()
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const cutCapacityCode = `// ===== 割（s-t cut）的定义与容量 =====
// 把顶点集 V 分成两份：S（含源点 s）和 T（含汇点 t）
// 割 = 所有「从 S 出发指向 T」的边的集合 δ(S)
// 割容量 c(S, T) = 这些边的容量之和（反向边 T→S 不计数）

interface Edge { from: string; to: string; cap: number }

// 给定顶点划分（isS: 顶点是否在 S 侧），计算割容量
function cutCapacity(edges: Edge[], isS: (v: string) => boolean): { value: number; crossed: Edge[] } {
  let value = 0
  const crossed: Edge[] = []
  for (const e of edges) {
    if (isS(e.from) && !isS(e.to)) {   // 只统计 S → T 方向
      value += e.cap
      crossed.push(e)
    }
  }
  return { value, crossed }
}

// 例：S 侧 = {s, A, B}，T 侧 = {C, t}
// 跨割边只有 A→C(2) 和 B→C(2) → 割容量 = 4
const edges: Edge[] = [
  { from: 'S', to: 'A', cap: 3 }, { from: 'S', to: 'B', cap: 3 },
  { from: 'A', to: 'B', cap: 3 }, { from: 'A', to: 'C', cap: 2 },
  { from: 'B', to: 'C', cap: 2 }, { from: 'C', to: 'T', cap: 4 },
]
const isS = (v: string) => v === 'S' || v === 'A' || v === 'B'
console.log(cutCapacity(edges, isS).value)   // 输出: 4`

const minCutCode = `// ===== 用最大流求最小割 =====
// 步骤：
//   ① 先跑一遍最大流（Edmonds-Karp / Dinic）
//   ② 在「残余网络」中从源点 s 出发 BFS，
//      能到达的节点集合记为 S —— 这就是最小割的源侧
//   ③ 最小割 = 从 S 指向 V-S 的所有正向边，容量之和 = 最大流值

function minCut(
  n: number,
  s: number,
  t: number,
  cap: number[][],
  flow: number[][]
): { sSet: boolean[]; cutEdges: [number, number][]; cutValue: number } {
  // 1) BFS 在残余网络（cap - flow）中找可达集
  const sSet = new Array<boolean>(n).fill(false)
  const q: number[] = [s]
  sSet[s] = true
  while (q.length) {
    const u = q.shift()!
    for (let v = 0; v < n; v++) {
      const residual = cap[u][v] - flow[u][v]
      if (residual > 0 && !sSet[v]) {
        sSet[v] = true
        q.push(v)
      }
    }
  }
  // 2) 枚举所有从 S 侧跨到 T 侧的边
  const cutEdges: [number, number][] = []
  let cutValue = 0
  for (let u = 0; u < n; u++) {
    if (!sSet[u]) continue
    for (let v = 0; v < n; v++) {
      if (sSet[v]) continue
      if (cap[u][v] > 0) {
        cutEdges.push([u, v])
        cutValue += cap[u][v]
      }
    }
  }
  return { sSet, cutEdges, cutValue }
}

// 用法：先 edmondsKarp(n, s, t, cap) 得到 flows，
// 再 minCut(n, s, t, cap, flows) 即得最小割（cutValue === maxFlow）`

const vulnerableCode = `// ===== 应用：网络脆弱点 =====
// 通信网（服务器 = 节点，链路 = 边）：哪条链路断了影响最大？
// ① 算全局最小割：把全网断开成两半的最小割断成本
// ② 对每条边临时把容量改成 0（模拟断链），再算最大流
//    最大流下降最多的边 = 最关键链路

function criticalLinks(
  n: number,
  edges: { u: number; v: number; cap: number }[]
): { cutValue: number; bottleneck: { u: number; v: number; drop: number } } {
  const maxFlowOf = (cap: number[][]) => { /* 跑 Dinic，返回最大流 */ return 0 }
  const full = Array.from({ length: n }, () => new Array<number>(n).fill(0))
  edges.forEach(e => { full[e.u][e.v] = e.cap })
  const base = maxFlowOf(full)

  let best = { u: -1, v: -1, drop: -1 }
  for (const e of edges) {
    const tmp = full.map(r => [...r])
    tmp[e.u][e.v] = 0                      // 模拟该链路断开
    const after = maxFlowOf(tmp)
    const drop = base - after
    if (drop > best.drop) best = { u: e.u, v: e.v, drop }
  }
  return { cutValue: base, bottleneck: best }
}

// 图像分割（Graph Cut）同理：像素连 s（前景先验）/ t（背景先验），
// 相邻像素连边（容量 = 相似度），最小割 = 分割代价最小的全局最优解`
</script>

<style scoped></style>
