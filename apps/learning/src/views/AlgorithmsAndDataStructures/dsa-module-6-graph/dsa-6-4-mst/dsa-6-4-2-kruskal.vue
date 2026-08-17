<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌲 Kruskal 算法：基于边的贪心 + 并查集</h1>
          <p class="text-sm text-slate-500 mt-1">边按权排序，从小到大「连而不环」</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-4-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：边排好队，一条条「试穿」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Kruskal 与 Prim 思路相反：<strong>不看顶点，只看边</strong>。
          先把所有边<strong>按权值升序排序</strong>（①…⑩ 即考察顺序），再<strong>从小到大逐条试</strong>：
          两端尚未连通就选它（连而不环），两端已连通就跳过（成环）。
          判断「是否连通」交给<strong>并查集</strong>。下图绿色粗边是最终 MST，总权重 15，与 Prim 结果一致。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="16" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">加权无向连通图 —— ①…⑩ = 按权值排序后的考察顺序，绿色粗边 = MST（总权重 15）</text>

            <!-- 非 MST 边 -->
            <line x1="160" y1="55" x2="80" y2="160" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="160" y1="55" x2="515" y2="148" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="320" y1="58" x2="515" y2="148" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="320" y1="58" x2="205" y2="232" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="205" y1="232" x2="405" y2="228" stroke="#94a3b8" stroke-width="1.5" />

            <!-- MST 边 -->
            <line x1="160" y1="55" x2="320" y2="58" stroke="#16a34a" stroke-width="3.5" />
            <line x1="320" y1="58" x2="405" y2="228" stroke="#16a34a" stroke-width="3.5" />
            <line x1="515" y1="148" x2="405" y2="228" stroke="#16a34a" stroke-width="3.5" />
            <line x1="80" y1="160" x2="320" y2="58" stroke="#16a34a" stroke-width="3.5" />
            <line x1="80" y1="160" x2="205" y2="232" stroke="#16a34a" stroke-width="3.5" />

            <!-- 权重 -->
            <text x="240" y="48" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">1</text>
            <text x="362" y="135" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">4</text>
            <text x="460" y="180" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">2</text>
            <text x="200" y="101" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">5</text>
            <text x="142" y="188" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">3</text>
            <text x="120" y="99" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">6</text>
            <text x="337" y="93" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">5</text>
            <text x="417" y="95" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">5</text>
            <text x="262" y="137" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">6</text>
            <text x="300" y="238" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">6</text>

            <!-- 考察顺序徽标 -->
            <circle cx="256" cy="62" r="9" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
            <text x="256" y="62" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#475569">1</text>
            <circle cx="476" cy="194" r="9" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
            <text x="476" y="194" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#475569">2</text>
            <circle cx="158" cy="202" r="9" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
            <text x="158" y="202" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#475569">3</text>
            <circle cx="378" cy="149" r="9" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
            <text x="378" y="149" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#475569">4</text>
            <circle cx="353" cy="107" r="9" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
            <text x="353" y="107" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#475569">5</text>
            <circle cx="216" cy="115" r="9" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
            <text x="216" y="115" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#475569">6</text>
            <circle cx="433" cy="109" r="9" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
            <text x="433" y="109" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#475569">7</text>
            <circle cx="136" cy="113" r="9" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
            <text x="136" y="113" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#475569">8</text>
            <circle cx="278" cy="151" r="9" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
            <text x="278" y="151" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#475569">9</text>
            <circle cx="334" cy="232" r="9" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1" />
            <text x="334" y="232" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#475569">10</text>

            <!-- 节点 -->
            <circle cx="160" cy="55" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="160" y="55" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="80" cy="160" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="80" y="160" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="320" cy="58" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="320" y="58" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <circle cx="515" cy="148" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="515" y="148" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
            <circle cx="205" cy="232" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="205" y="232" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">E</text>
            <circle cx="405" cy="228" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="405" y="228" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">F</text>

            <!-- 图例 -->
            <line x1="16" y1="246" x2="56" y2="246" stroke="#16a34a" stroke-width="3.5" />
            <text x="64" y="250" font-size="10" font-family="monospace" fill="#64748b">入选边</text>
            <line x1="150" y1="246" x2="190" y2="246" stroke="#94a3b8" stroke-width="1.5" />
            <text x="198" y="250" font-size="10" font-family="monospace" fill="#64748b">未入选边</text>
            <line x1="300" y1="246" x2="340" y2="246" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 4" />
            <text x="348" y="250" font-size="10" font-family="monospace" fill="#64748b">成环被跳过的边</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Kruskal 把边按权排序后逐条考察——「连而不环」，最终得到与 Prim 相同的总权重 15</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：一条边要么「连通两端（选中）」，要么「成环（跳过）」</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">考察第 4 条边 C-F(4)：两端分属不同分量 → 选中并合并</p>
            <svg viewBox="0 0 340 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <!-- 左：before -->
              <text x="14" y="18" font-size="10" font-family="monospace" fill="#64748b" font-weight="bold">分量 {A,C} {D,F} {B,E}</text>
              <line x1="48" y1="44" x2="160" y2="44" stroke="#16a34a" stroke-width="3" />
              <line x1="290" y1="120" x2="215" y2="180" stroke="#60a5fa" stroke-width="3" />
              <line x1="120" y1="180" x2="50" y2="190" stroke="#a78bfa" stroke-width="3" />
              <line x1="160" y1="44" x2="215" y2="180" stroke="#f59e0b" stroke-width="3.5" />
              <text x="187" y="104" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#d97706">4</text>
              <circle cx="48" cy="44" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="3" />
              <text x="48" y="44" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">A</text>
              <circle cx="160" cy="44" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="3" />
              <text x="160" y="44" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">C</text>
              <circle cx="290" cy="120" r="18" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
              <text x="290" y="120" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
              <circle cx="215" cy="180" r="18" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
              <text x="215" y="180" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">F</text>
              <circle cx="120" cy="180" r="18" fill="#a78bfa" stroke="#7c3aed" stroke-width="2" />
              <text x="120" y="180" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <circle cx="50" cy="190" r="18" fill="#a78bfa" stroke="#7c3aed" stroke-width="2" />
              <text x="50" y="190" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">E</text>
              <text x="14" y="206" font-size="10" font-family="monospace" fill="#64748b">find(C)=A ≠ find(F)=D → 不构成环</text>
              <!-- 右：after -->
              <text x="178" y="18" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">✅ 合并为 {A,C,D,F}</text>
              <line x1="205" y1="44" x2="300" y2="44" stroke="#16a34a" stroke-width="3" />
              <line x1="300" y1="44" x2="250" y2="185" stroke="#16a34a" stroke-width="4" />
              <line x1="250" y1="185" x2="318" y2="140" stroke="#16a34a" stroke-width="3" />
              <text x="275" y="108" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#16a34a">4</text>
              <circle cx="205" cy="44" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="3" />
              <text x="205" y="44" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">A</text>
              <circle cx="300" cy="44" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="3" />
              <text x="300" y="44" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">C</text>
              <circle cx="318" cy="140" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="3" />
              <text x="318" y="140" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">D</text>
              <circle cx="250" cy="185" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="3" />
              <text x="250" y="185" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">F</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">两端不同分量 → union 合并，边入选（绿加粗）；分量从 3 块减为 2 块</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">考察第 5 条边 A-D(5)：两端已在同一分量 → 成环，跳过</p>
            <svg viewBox="0 0 340 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <!-- 左：before -->
              <text x="14" y="18" font-size="10" font-family="monospace" fill="#64748b" font-weight="bold">同分量 {A,C,D,F}</text>
              <line x1="48" y1="44" x2="160" y2="44" stroke="#16a34a" stroke-width="3" />
              <line x1="160" y1="44" x2="215" y2="180" stroke="#16a34a" stroke-width="3" />
              <line x1="290" y1="120" x2="215" y2="180" stroke="#16a34a" stroke-width="3" />
              <line x1="48" y1="44" x2="290" y2="120" stroke="#f59e0b" stroke-width="3.5" />
              <text x="169" y="76" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#d97706">5</text>
              <circle cx="48" cy="44" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="3" />
              <text x="48" y="44" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">A</text>
              <circle cx="160" cy="44" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="3" />
              <text x="160" y="44" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">C</text>
              <circle cx="290" cy="120" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="3" />
              <text x="290" y="120" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">D</text>
              <circle cx="215" cy="180" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="3" />
              <text x="215" y="180" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">F</text>
              <text x="14" y="206" font-size="10" font-family="monospace" fill="#64748b">find(A) 与 find(D) 相同</text>
              <!-- 右：after -->
              <text x="178" y="18" font-size="10" font-family="monospace" fill="#b91c1c" font-weight="bold">⛔ 成环，跳过 A-D</text>
              <line x1="218" y1="44" x2="318" y2="120" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="5 4" />
              <text x="268" y="76" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#b91c1c">5</text>
              <circle cx="218" cy="44" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="3" />
              <text x="218" y="44" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">A</text>
              <circle cx="318" cy="120" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="3" />
              <text x="318" y="120" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">D</text>
              <text x="190" y="200" font-size="10" font-family="monospace" fill="#b91c1c">再加 A-D 会与 A-C-F-D 构成环 → 不选</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">环性质：环里最重的边不进 MST——已连通的两端再加边必然成环，直接跳过</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 核心思想 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          核心思想：边排序 + 并查集判环
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Kruskal 的贪心非常直白：<strong>全局最小的边一定值得要</strong>（除非它已成环）。
          排序后从小到大逐条考察，用并查集快速回答「两端是否已经连通」。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>排序</strong>：把全部 E 条边按权值升序排列（O(E·logE)）</li>
          <li><strong>初始化</strong>：并查集，每个顶点自成一个集合；已选边数 count = 0，累计权重 total = 0</li>
          <li><strong>逐条考察</strong>：取当前最小边 (u, v, w)，<code>find(u) ≠ find(v)</code> 则 <code>union</code> 并选入（count++，total += w）；否则跳过</li>
          <li><strong>提前结束</strong>：count 达到 V-1 时树已生成，无需再看剩余边</li>
          <li>考察完所有边后 count 仍不足 V-1 → 图不连通，无 MST</li>
        </ol>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">选边 ⇔ 不成环 ⇔ find(u) ≠ find(v)</p>
          <p class="text-xs text-cyan-600 text-center">并查集把「判环」从 O(V) 遍历降到近乎 O(1)，是 Kruskal 的灵魂</p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Kruskal ≈ <strong>「把全国两城之间的光缆造价列表从低到高排序，逐条铺设，只要不成环就铺」</strong>。
          先查最便宜的两城——没通就铺上，通了就跳过，直到所有城市互通为止。<br/>
          其中「判断两城是否已连通」用的是<strong>并查集</strong> ≈ <strong>「朋友圈分组」</strong>：
          每个人只认自己的「群主（根）」，<code>find</code> 找群主、<code>union</code> 合并两个群——群主相同就是同一圈人。
          前端里它也像「两个 DOM 子树是否挂在同一祖先下」的判断。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>等权边出现时，先考察哪条不影响总权重（总权重唯一，边集可能不同）。
          排序时建议加一个「按端点字典序」的次级比较，让结果<strong>可复现</strong>。</p>
        </aside>
      </section>

      <!-- 2. 并查集回顾 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          并查集回顾：路径压缩 + 按秩合并
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          并查集（Union-Find）用一棵<strong>森林</strong>表示若干不相交集合：每个集合一棵树，
          <code>parent[x]</code> 指向父节点，<strong>根代表整个集合</strong>（<code>parent[x] === x</code>）。
          两个优化缺一不可：
        </p>
        <ul class="space-y-2 text-slate-600 mb-4 text-sm leading-relaxed">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>路径压缩</strong>：find 时把沿途节点直接挂到根，查一次、摊平一路</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>按秩合并</strong>：矮树挂到高树，防止退化成长链（树高被压到 O(log n)）</span></li>
        </ul>
        <div class="mb-4"><Code language="ts" :code="unionFindCode" title="union_find.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>路径压缩 + 按秩合并叠加后，m 次操作的总复杂度是 <strong>O(m·α(n))</strong>，
          α(n) 是反阿克曼函数——实际中 &le; 5，可当作常数。这就是为什么 Kruskal 判环几乎免费。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：判连通时直接比较 <code>parent[a] === parent[b]</code></strong><br/>
          必须 <code>find(a) === find(b)</code>。路径压缩前，parent 里存的可能是<strong>中间节点</strong>而不是根，
          直接比较 parent 会把「同集合」误判成「不同集合」。union 时同样要先 <code>find</code> 出两个根再挂接。</p>
        </aside>
      </section>

      <!-- 3. 完整实现 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          完整实现：排序 → 判环 → 收集
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          主循环只有十几行。关键在 <code>uf.union</code> 的返回值——<strong>能合并就说明没成环</strong>，
          一步同时完成「判环 + 选边」。选满 V-1 条边即可提前返回。
        </p>
        <div class="mb-4"><Code language="ts" :code="kruskalCode" title="kruskal.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 1：先 union 再判环</strong><br/>
          若写成「先 <code>uf.union(a, b)</code> 再检查」，union 已经把两个集合合了，
          判环就永远不成立——所有边都会被选进去，得到一个错误的「伪 MST」。
          正确顺序：<strong>union 本身返回 false 即代表成环</strong>，别画蛇添足。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 2：忘了检查「边数不足 V-1」</strong><br/>
          图不连通时，考察完所有边也选不满 V-1 条。不检查就返回，调用方会拿到一个「不连通且缺失边」的结果。
          务必在最后判断 <code>mst.length === n - 1</code>，否则返回 <code>null</code>。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 3：排序比较器写反或没写</strong><br/>
          <code>sort((a, b) =&gt; a.w - b.w)</code> 才是升序；写成 <code>b.w - a.w</code> 就从大到小贪心，
          得到的是<strong>最大</strong>生成树。另外 <code>sort</code> 默认按字符串比较，<code>[10, 2]</code> 会排成 <code>[10, 2]</code>——必须显式传数字比较器。</p>
        </aside>
      </section>

      <!-- 4. 手算示例 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          手算示例：10 条边逐条过一遍
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          对结构总览的图，边排序后为：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">A-C(1)、D-F(2)、B-E(3)、C-F(4)、A-D(5)、B-C(5)、C-D(5)、A-B(6)、C-E(6)、E-F(6)</code>。
          前 4 条全选（互不成环），第 5 条 A-D 开始出现成环。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-xs text-slate-600 border border-slate-200 rounded-lg overflow-hidden">
            <thead class="bg-slate-50 text-slate-500">
              <tr>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">序号</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">边</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">权</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">两端是否连通</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">动作</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">已选和</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2 font-mono">1</td>
                <td class="px-3 py-2 font-mono">A—C</td>
                <td class="px-3 py-2 font-mono">1</td>
                <td class="px-3 py-2">否</td>
                <td class="px-3 py-2 text-green-600 font-medium">✅ 选</td>
                <td class="px-3 py-2 font-mono">1</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2 font-mono">2</td>
                <td class="px-3 py-2 font-mono">D—F</td>
                <td class="px-3 py-2 font-mono">2</td>
                <td class="px-3 py-2">否</td>
                <td class="px-3 py-2 text-green-600 font-medium">✅ 选</td>
                <td class="px-3 py-2 font-mono">3</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2 font-mono">3</td>
                <td class="px-3 py-2 font-mono">B—E</td>
                <td class="px-3 py-2 font-mono">3</td>
                <td class="px-3 py-2">否</td>
                <td class="px-3 py-2 text-green-600 font-medium">✅ 选</td>
                <td class="px-3 py-2 font-mono">6</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2 font-mono">4</td>
                <td class="px-3 py-2 font-mono">C—F</td>
                <td class="px-3 py-2 font-mono">4</td>
                <td class="px-3 py-2">否</td>
                <td class="px-3 py-2 text-green-600 font-medium">✅ 选</td>
                <td class="px-3 py-2 font-mono">10</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2 font-mono">5</td>
                <td class="px-3 py-2 font-mono">A—D</td>
                <td class="px-3 py-2 font-mono">5</td>
                <td class="px-3 py-2 text-red-500">是（A-C-F-D 同组）</td>
                <td class="px-3 py-2 text-red-500 font-medium">⛔ 成环跳过</td>
                <td class="px-3 py-2 font-mono">10</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2 font-mono">6</td>
                <td class="px-3 py-2 font-mono">B—C</td>
                <td class="px-3 py-2 font-mono">5</td>
                <td class="px-3 py-2">否</td>
                <td class="px-3 py-2 text-green-600 font-medium">✅ 选</td>
                <td class="px-3 py-2 font-mono">15</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2 font-mono">7</td>
                <td class="px-3 py-2 font-mono">C—D</td>
                <td class="px-3 py-2 font-mono">5</td>
                <td class="px-3 py-2 text-red-500">是</td>
                <td class="px-3 py-2 text-red-500 font-medium">⛔ 成环跳过</td>
                <td class="px-3 py-2 font-mono">15</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2 font-mono">8</td>
                <td class="px-3 py-2 font-mono">A—B</td>
                <td class="px-3 py-2 font-mono">6</td>
                <td class="px-3 py-2 text-red-500">是</td>
                <td class="px-3 py-2 text-red-500 font-medium">⛔ 成环跳过</td>
                <td class="px-3 py-2 font-mono">15</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2 font-mono">9</td>
                <td class="px-3 py-2 font-mono">C—E</td>
                <td class="px-3 py-2 font-mono">6</td>
                <td class="px-3 py-2 text-red-500">是</td>
                <td class="px-3 py-2 text-red-500 font-medium">⛔ 成环跳过</td>
                <td class="px-3 py-2 font-mono">15</td>
              </tr>
              <tr>
                <td class="px-3 py-2 font-mono">10</td>
                <td class="px-3 py-2 font-mono">E—F</td>
                <td class="px-3 py-2 font-mono">6</td>
                <td class="px-3 py-2 text-red-500">是</td>
                <td class="px-3 py-2 text-red-500 font-medium">⛔ 成环跳过</td>
                <td class="px-3 py-2 font-mono">15</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 leading-relaxed text-sm">
          第 6 条 B-C(5) 选中后已集齐 <strong>V-1 = 5 条边</strong>，可以提前结束（后面的边无需再看）。
          MST 边集：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">A-C(1)、D-F(2)、B-E(3)、C-F(4)、B-C(5)</code>，总权重 <strong>15</strong>——和 Prim 殊途同归。
        </p>
      </section>

      <!-- 5. Prim vs Kruskal -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          Prim vs Kruskal：稀疏还是稠密，答案不一样
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          两者求的是同一个 MST，但切入点和复杂度不同：<strong>Prim 基于顶点、Kruskal 基于边</strong>。
          选择口诀：<strong>稠密图（边多）→ 朴素 Prim O(V²)；稀疏图（边少）→ Kruskal O(E·logE)</strong>。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-xs text-slate-600 border border-slate-200 rounded-lg overflow-hidden">
            <thead class="bg-slate-50 text-slate-500">
              <tr>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">对比项</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">Prim</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">Kruskal</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2">视角</td>
                <td class="px-3 py-2">基于顶点，树逐步生长</td>
                <td class="px-3 py-2">基于边，全局排序逐条选</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2">核心数据结构</td>
                <td class="px-3 py-2 font-mono">dist 数组 / 小顶堆</td>
                <td class="px-3 py-2 font-mono">边排序 + 并查集</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2">时间复杂度</td>
                <td class="px-3 py-2 font-mono">O(V²) 或 O(E·logV)</td>
                <td class="px-3 py-2 font-mono">O(E·logE)</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2">适用场景</td>
                <td class="px-3 py-2">稠密图（E ≈ V²）</td>
                <td class="px-3 py-2">稀疏图（E ≈ V）</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2">边权为负</td>
                <td class="px-3 py-2">可以（无向图取最小边权即可）</td>
                <td class="px-3 py-2">可以（排序照常）</td>
              </tr>
              <tr>
                <td class="px-3 py-2">起点要求</td>
                <td class="px-3 py-2">任意（结果不受影响）</td>
                <td class="px-3 py-2">无需起点</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="pickCode" title="choose_algorithm.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          选算法就像选<strong>前端构建工具</strong>：项目文件（顶点）少但依赖（边）巨多（稠密）→ 用「扫一遍」的朴素思路更划算；
          文件多但依赖稀疏 → 用「按优先级排序逐个处理」的思路更划算。
          工程上没有银弹，<strong>先看规模形态再选工具</strong>，正是「稠密 Prim / 稀疏 Kruskal」的智慧。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：不看数据规模直接套模板</strong><br/>
          顶点少、边极多时硬上 Kruskal，O(E·logE) 的排序开销白白浪费；
          顶点多、边极少时用朴素 Prim，O(V²) 扫描又慢得离谱。
          读题第一步先估算 E 与 V 的关系，再决定用哪个算法。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：Kruskal 按权排序逐条「连而不环」
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          下方色块是<strong>按权值排序后的边序列</strong>：橙 = 正在考察，绿 = 已入选（加粗），红划线 = 成环被跳过。
          观察并查集如何让「成环」一目了然。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">📋 已考察: {{ ei }}/{{ orderEdges.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">✅ 已选边: {{ picked }}/{{ gNodes.length - 1 }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">💰 已选权和: {{ totalW }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🌲 分量数: {{ compCount }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-1 mb-2">
          <span v-for="(e, i) in orderEdges" :key="e.from+e.to"
            class="px-2 py-0.5 rounded-md text-[10px] font-mono border transition-all duration-150"
            :class="chipClass(e, i)">{{ i+1 }}:{{ e.from }}-{{ e.to }}({{ e.w }})</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="runKruskal" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">▶ Kruskal 生成 MST</button>
          <button @mousedown="doStep" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">⏭ 考察下一条边</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in gEdges" :key="'e'+e.from+e.to" :config="edgeCfg(e)" />
              <v-text v-for="e in gEdges" :key="'w'+e.from+e.to" :config="weightCfg(e)" />
              <v-circle v-for="n in gNodes" :key="'c'+n.id" :config="circleCfg(n)" />
              <v-text v-for="n in gNodes" :key="'l'+n.id" :config="labelCfg(n)" />
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
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>本质</strong>：基于边的贪心——边按权升序，逐条「连而不环」（环性质保证正确性）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>判环</strong>：并查集 <code>find(u) ≠ find(v)</code> 才 union；<code>union</code> 返回 false 即成环</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度</strong>：排序 O(E·logE) + 判环 O(E·α(V)) ≈ <strong>O(E·logE)</strong>，空间 O(V + E)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>提前终止</strong>：选满 V-1 条边即可返回；全部考察完仍不足 → 图不连通，无 MST</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>选型</strong>：稠密图 → 朴素 Prim O(V²)；稀疏图 → Kruskal O(E·logE) 或堆优化 Prim O(E·logV)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>应用</strong>：网络布线、城市电网、聚类（单链接聚类即 MST 的剪枝）、近似旅行商</span></li>
        </ul>
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-slate-600 border border-slate-200 rounded-lg overflow-hidden">
            <thead class="bg-slate-50 text-slate-500">
              <tr>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">算法</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">思想</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">复杂度</th>
                <th class="px-3 py-2 text-left font-medium border-b border-slate-200">适用</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2 font-mono">Kruskal</td>
                <td class="px-3 py-2">边排序 + 并查集判环</td>
                <td class="px-3 py-2 font-mono">O(E·logE)</td>
                <td class="px-3 py-2">稀疏图</td>
              </tr>
              <tr class="border-b border-slate-100">
                <td class="px-3 py-2 font-mono">朴素 Prim</td>
                <td class="px-3 py-2">顶点贪心 + 邻接矩阵</td>
                <td class="px-3 py-2 font-mono">O(V²)</td>
                <td class="px-3 py-2">稠密图</td>
              </tr>
              <tr>
                <td class="px-3 py-2 font-mono">堆优化 Prim</td>
                <td class="px-3 py-2">顶点贪心 + 邻接表 + 堆</td>
                <td class="px-3 py-2 font-mono">O(E·logV)</td>
                <td class="px-3 py-2">稀疏图 / 通用</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-4-mst/dsa-6-4-1-prim" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Prim算法：基于顶点的贪心</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-5-network-flow/dsa-6-5-1-max-flow" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：最大流：Ford-Fulkerson/Edmonds-Karp/Dinic →</RouterLink>
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
  { id: "sec-1", name: "核心思想：排序+判环" },
  { id: "sec-2", name: "并查集回顾" },
  { id: "sec-3", name: "完整实现" },
  { id: "sec-4", name: "手算示例" },
  { id: "sec-5", name: "Prim vs Kruskal" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 Kruskal 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(330), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

interface GNode { id: string; label: string; fx: number; y: number; color: string }
interface GEdge { from: string; to: string; w: number; color: string; mst: boolean; skipped: boolean }

// 与 Prim 相同的经典图（6 节点 10 边），便于对比两种算法
const NPOS: Record<string, { fx: number; y: number }> = {
  A: { fx: 160/720, y: 60 },
  B: { fx: 80/720,  y: 165 },
  C: { fx: 320/720, y: 62 },
  D: { fx: 515/720, y: 152 },
  E: { fx: 205/720, y: 236 },
  F: { fx: 405/720, y: 232 },
}
const EDGES: [string, string, number][] = [
  ['A','B',6], ['A','C',1], ['A','D',5],
  ['B','C',5], ['B','E',3],
  ['C','D',5], ['C','E',6], ['C','F',4],
  ['D','F',2], ['E','F',6],
]

const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])
const parentMap = reactive<Record<string, string>>({})
const rankMap = reactive<Record<string, number>>({})
const ei = ref(0)          // 已考察边数（排序序列上的指针）
const picked = ref(0)      // 已选边数
const totalW = ref(0)      // 已选边的权重和

// 按权值升序（含字典序次级比较，保证可复现）
const orderEdges = computed(() =>
  [...gEdges].sort((a, b) => a.w - b.w || (a.from + a.to).localeCompare(b.from + b.to))
)

function px(n: GNode) { return n.fx * W.value }

function rootOf(x: string): string {
  let r = x
  while (parentMap[r] !== r) r = parentMap[r]
  let cur = x
  while (parentMap[cur] !== cur) { const nxt = parentMap[cur]; parentMap[cur] = r; cur = nxt }
  return r
}
function ufUnion(a: string, b: string) {
  const ra = rootOf(a), rb = rootOf(b)
  if (ra === rb) return
  if (rankMap[ra] < rankMap[rb]) parentMap[ra] = rb
  else if (rankMap[ra] > rankMap[rb]) parentMap[rb] = ra
  else { parentMap[rb] = ra; rankMap[ra]++ }
}
const compCount = computed(() => {
  const roots = new Set<string>()
  gNodes.forEach(n => { let r = n.id; while (parentMap[r] !== r) r = parentMap[r]; roots.add(r) })
  return roots.size
})

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)          // ⚠️ 清空 reactive 数组必须用 splice(0)
  Object.entries(NPOS).forEach(([id, p]) => gNodes.push({ id, label: id, fx: p.fx, y: p.y, color: C.cyan }))
  EDGES.forEach(([a, b, w]) => gEdges.push({ from: a, to: b, w, color: '#94a3b8', mst: false, skipped: false }))
  gNodes.forEach(n => { parentMap[n.id] = n.id; rankMap[n.id] = 0 })
  ei.value = 0; picked.value = 0; totalW.value = 0
  status.value = '边已按权排序，点击「Kruskal 生成 MST」或「⏭ 考察下一条边」'
}

function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function allCyan() { gNodes.forEach(n => n.color = C.cyan) }
function edgeCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  const cfg: { points: number[]; stroke: string; strokeWidth: number; lineCap: string; dash?: number[] } =
    { points: [px(a), a.y, px(b), b.y], stroke: e.color, strokeWidth: e.mst ? 4 : (e.color === '#94a3b8' ? 2 : 3), lineCap: 'round' }
  if (e.skipped) cfg.dash = [6, 4]   // 被跳过的边用虚线表示
  return cfg
}
function weightCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { x: (px(a)+px(b))/2, y: (a.y+b.y)/2 - 8, text: String(e.w), fontSize: 11, fontFamily: 'monospace', fontStyle: 'bold', fill: e.mst ? '#16a34a' : (e.skipped ? '#b91c1c' : C.muted), align: 'center' }
}
function circleCfg(n: GNode) {
  const stroke = n.color===C.cyan ? '#0891b2' : n.color===C.orange ? '#d97706' : n.color===C.green ? '#16a34a' : n.color===C.red ? '#b91c1c' : '#2563eb'
  const sw = n.color===C.cyan ? 1.5 : 3
  return { x: px(n), y: n.y, radius: 22, fill: n.color, stroke, strokeWidth: sw, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function labelCfg(n: GNode) {
  return { x: px(n)-22, y: n.y-22, width: 44, height: 44, text: n.label, fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: '#fff', align: 'center', verticalAlign: 'middle' }
}
function chipClass(e: GEdge, i: number) {
  if (e.mst) return 'bg-green-50 text-green-700 border-green-200'
  if (e.skipped) return 'bg-red-50 text-red-500 border-red-200 line-through'
  if (i === ei.value) return 'bg-orange-50 text-orange-600 border-orange-300'
  return 'bg-slate-50 text-slate-400 border-slate-200'
}

// 考察一条边：候选橙色 → 判环 → 选中（绿加粗）/ 跳过（红虚线）
async function kruskalStep(): Promise<boolean> {
  if (picked.value >= gNodes.length - 1 || ei.value >= orderEdges.value.length) {
    status.value = '🎉 MST 完成：已选 ' + picked.value + ' 条边，累计权重 = ' + totalW.value
    return false
  }
  const e = orderEdges.value[ei.value]
  const a = pos(e.from), b = pos(e.to)

  // 1. 高亮候选（保留已入选的绿边）
  allCyan()
  gEdges.forEach(ed => { if (ed.mst) ed.color = '#16a34a' })
  e.color = C.orange
  a.color = C.orange; b.color = C.orange
  status.value = '第 ' + (ei.value + 1) + ' 条边 ' + e.from + '—' + e.to + '（w=' + e.w + '）：find(' + e.from + ')=' + rootOf(e.from) + '，find(' + e.to + ')=' + rootOf(e.to)
  await d(700)

  if (rootOf(e.from) === rootOf(e.to)) {
    // 2a. 成环 → 变红跳过
    e.color = C.red; e.skipped = true
    a.color = C.red; b.color = C.red
    status.value = '⛔ 成环！' + e.from + ' 与 ' + e.to + ' 已连通，跳过（已选和 = ' + totalW.value + '）'
    await d(600)
    a.color = C.cyan; b.color = C.cyan
  } else {
    // 2b. 连通两端 → 选中，边变绿加粗
    ufUnion(e.from, e.to)
    totalW.value += e.w
    picked.value++
    e.color = '#16a34a'; e.mst = true
    a.color = C.green; b.color = C.green
    status.value = '✅ 两端未连通，选中 ' + e.from + '—' + e.to + '（w=' + e.w + '），已选和 = ' + totalW.value
    await d(600)
    a.color = C.cyan; b.color = C.cyan
  }
  ei.value++
  return true
}

async function runKruskal() {
  if (busy.value) return
  busy.value = true; opLabel.value = 'Kruskal O(E·logE)'
  try {
    while (ei.value < orderEdges.value.length) {
      if (!(await kruskalStep())) break
    }
    allCyan()
    gEdges.forEach(ed => { if (ed.mst) ed.color = '#16a34a' })
    status.value = '🎉 MST 完成：累计权重 = ' + totalW.value + '（A-C、D-F、B-E、C-F、B-C）'
  } finally { await d(300); busy.value = false; opLabel.value = '' }
}

async function doStep() {
  if (busy.value) return
  busy.value = true; opLabel.value = '单步'
  try { await kruskalStep() } finally { await d(200); busy.value = false; opLabel.value = '' }
}

function doReset() {
  initGraph()
  opLabel.value = ''
}

let ro: ResizeObserver | null = null
onMounted(() => {
  initGraph()
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 200) W.value = w })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const unionFindCode = `// ===== 并查集：Kruskal 判环的「尺子」 =====
class UnionFind {
    private parent: number[]
    private rank: number[]
    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i)
        this.rank = new Array(n).fill(0)
    }
    // 找根 + 路径压缩：查一次，摊平一路
    find(x: number): number {
        if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x])
        return this.parent[x]
    }
    // 合并两个集合；返回 false 表示两端原本就连通（会成环）
    union(x: number, y: number): boolean {
        const rx = this.find(x), ry = this.find(y)
        if (rx === ry) return false
        if (this.rank[rx] < this.rank[ry]) this.parent[rx] = ry   // 矮树挂高树
        else if (this.rank[rx] > this.rank[ry]) this.parent[ry] = rx
        else { this.parent[ry] = rx; this.rank[rx]++ }
        return true
    }
    connected(x: number, y: number): boolean { return this.find(x) === this.find(y) }
}

// 演示：两组合并 → 数根的数量即连通分量数
const uf = new UnionFind(6)
uf.union(0, 1); uf.union(1, 2)          // {0,1,2}
uf.union(3, 4)                           // {3,4}
console.log(uf.connected(0, 2))          // 输出: true（同集合）
console.log(uf.connected(0, 3))          // 输出: false（不同集合）`

const kruskalCode = `// ===== Kruskal 主循环：排序 + 判环 + 收集边集 =====
interface Edge { from: number; to: number; w: number }

function kruskal(n: number, edges: Edge[]): { total: number; mst: Edge[] } | null {
    // 1. 按权值升序排序 —— 贪心的全部秘密都在这里
    const sorted = [...edges].sort((a, b) => a.w - b.w)
    const uf = new UnionFind(n)
    const mst: Edge[] = []
    let total = 0

    // 2. 从小到大逐条考察
    for (const e of sorted) {
        if (uf.union(e.from, e.to)) {        // 两端未连通 → 不成环 → 选
            mst.push(e)
            total += e.w
            if (mst.length === n - 1) break  // 已集齐 V-1 条边，提前结束
        }
        // union 返回 false → 两端已连通，成环，跳过
    }

    // 3. 边数不足说明图不连通，无 MST
    if (mst.length !== n - 1) return null
    return { total, mst }
}

// 用法（对应结构总览的经典图）
const edges: Edge[] = [
    { from: 0, to: 1, w: 6 }, { from: 0, to: 2, w: 1 }, { from: 0, to: 3, w: 5 },
    { from: 1, to: 2, w: 5 }, { from: 1, to: 4, w: 3 },
    { from: 2, to: 3, w: 5 }, { from: 2, to: 4, w: 6 }, { from: 2, to: 5, w: 4 },
    { from: 3, to: 5, w: 2 }, { from: 4, to: 5, w: 6 },
]
console.log(kruskal(6, edges))  // 输出: { total: 15, mst: [A-C, D-F, B-E, C-F, B-C] }`

const pickCode = `// ===== 选型对比：稠密图 vs 稀疏图 =====
// 稠密图：E 接近 V(V-1)/2（接近完全图）→ 朴素 Prim O(V²)
// 稀疏图：E 接近 V → Kruskal O(E·logE) 或堆优化 Prim O(E·logV)
// 实际工程里 E·logE 的排序常数小、实现简单，Kruskal 往往更常用

function recommend(v: number, e: number): string {
    const complete = v * (v - 1) / 2          // 完全图的边数
    return e >= complete * 0.5 ? '朴素 Prim O(V²)' : 'Kruskal O(E·logE)'
}

console.log(recommend(100, 300))     // 输出: Kruskal O(E·logE)  ← 稀疏（300 条边）
console.log(recommend(100, 4800))    // 输出: 朴素 Prim O(V²)     ← 稠密（4800 条边）

// 记忆口诀：稠密 Prim（矩阵扫），稀疏 Kruskal（边排序）
// 顶点多、边少 → Kruskal；边多到接近完全图 → 朴素 Prim`
</script>
