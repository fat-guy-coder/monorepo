<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">👫 二分图最大匹配与最大流归约</h1>
          <p class="text-sm text-slate-500 mt-1">把「匹配」问题改造成「最大流」问题</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-5-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：加一个总闸、一个总出水口，匹配就变成了水流
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>二分图</strong>的顶点分成左右两列，边只连接左右两侧。给左侧每个节点接一个<strong>超级源点 s</strong>、
          右侧每个节点接一个<strong>超级汇点 t</strong>，所有边容量设为 <strong>1</strong>，就得到一个流网络。
          此时「一个单位的流」恰好对应「一对匹配」，<strong>最大流 = 最大匹配数</strong>——这就是归约（reduction）的力量：
          新问题没发明新算法，直接复用旧算法。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 340" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="bm-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">归约三步：s→左（1）+ 左→右（1）+ 右→t（1）—— 所有容量都是 1</text>

            <!-- s → 左 -->
            <line x1="340" y1="40" x2="220" y2="87" stroke="#94a3b8" stroke-width="2" marker-end="url(#bm-arr)" />
            <line x1="344" y1="47" x2="216" y2="160" stroke="#94a3b8" stroke-width="2" marker-end="url(#bm-arr)" />
            <line x1="347" y1="50" x2="213" y2="237" stroke="#94a3b8" stroke-width="2" marker-end="url(#bm-arr)" />
            <!-- 左 → 右（允许的匹配边） -->
            <line x1="222" y1="95" x2="498" y2="95" stroke="#94a3b8" stroke-width="2" marker-end="url(#bm-arr)" />
            <line x1="221" y1="100" x2="499" y2="170" stroke="#94a3b8" stroke-width="2" marker-end="url(#bm-arr)" />
            <line x1="222" y1="175" x2="498" y2="175" stroke="#94a3b8" stroke-width="2" marker-end="url(#bm-arr)" />
            <line x1="221" y1="180" x2="499" y2="250" stroke="#94a3b8" stroke-width="2" marker-end="url(#bm-arr)" />
            <line x1="220" y1="245" x2="500" y2="105" stroke="#94a3b8" stroke-width="2" marker-end="url(#bm-arr)" />
            <!-- 右 → t -->
            <line x1="507" y1="113" x2="373" y2="287" stroke="#94a3b8" stroke-width="2" marker-end="url(#bm-arr)" />
            <line x1="503" y1="189" x2="377" y2="291" stroke="#94a3b8" stroke-width="2" marker-end="url(#bm-arr)" />
            <line x1="499" y1="262" x2="381" y2="298" stroke="#94a3b8" stroke-width="2" marker-end="url(#bm-arr)" />

            <!-- 容量标签 1 -->
            <text x="280" y="58" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">1</text>
            <text x="282" y="100" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">1</text>
            <text x="284" y="140" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">1</text>
            <text x="360" y="82" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">1</text>
            <text x="410" y="120" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">1</text>
            <text x="360" y="162" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">1</text>
            <text x="410" y="200" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">1</text>
            <text x="360" y="222" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">1</text>
            <text x="440" y="160" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">1</text>
            <text x="440" y="240" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">1</text>

            <!-- 节点 -->
            <circle cx="360" cy="32" r="22" fill="#a78bfa" stroke="#7c3aed" stroke-width="2" />
            <text x="360" y="32" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">s</text>
            <circle cx="200" cy="95" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="200" y="95" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">u1</text>
            <circle cx="200" cy="175" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="200" y="175" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">u2</text>
            <circle cx="200" cy="255" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="200" y="255" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">u3</text>
            <circle cx="520" cy="95" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="520" y="95" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">v1</text>
            <circle cx="520" cy="175" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="520" y="175" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">v2</text>
            <circle cx="520" cy="255" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="520" y="255" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">v3</text>
            <circle cx="360" cy="305" r="22" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
            <text x="360" y="305" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">t</text>

            <text x="360" y="336" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">最大流 = 最大匹配数；流量 = 1 的「左→右」边就是匹配边</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：二分图 → 流网络的归约 —— 本模块动画例子：u1:{v1,v2} u2:{v2,v3} u3:{v1}，最大匹配 = 3</figcaption>
        </figure>

        <!-- 关键操作 before/after -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：沿增广路「腾挪」匹配</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <svg viewBox="0 0 360 230" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="16" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">贪心匹配 2 条，u3 卡住</text>
              <line x1="92" y1="55" x2="268" y2="55" stroke="#4ade80" stroke-width="3.5" />
              <line x1="88" y1="66" x2="272" y2="114" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="92" y1="125" x2="268" y2="125" stroke="#4ade80" stroke-width="3.5" />
              <line x1="88" y1="136" x2="272" y2="184" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="88" y1="184" x2="272" y2="66" stroke="#94a3b8" stroke-width="1.5" />
              <circle cx="70" cy="55" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="70" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">u1</text>
              <circle cx="70" cy="125" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="70" y="125" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">u2</text>
              <circle cx="70" cy="195" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="70" y="195" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">u3</text>
              <circle cx="290" cy="55" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="290" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">v1</text>
              <circle cx="290" cy="125" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="290" y="125" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">v2</text>
              <circle cx="290" cy="195" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="290" y="195" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">v3</text>
              <text x="180" y="224" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">匹配数 = 2（u1-v1, u2-v2）</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">匹配前：u3 只能连 v1，但 v1 已被 u1 占走</figcaption>
          </figure>
          <figure>
            <svg viewBox="0 0 360 230" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="16" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">沿增广路腾挪 → 3 条全匹配</text>
              <line x1="92" y1="55" x2="268" y2="55" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="88" y1="66" x2="272" y2="114" stroke="#4ade80" stroke-width="3.5" />
              <line x1="92" y1="125" x2="268" y2="125" stroke="#94a3b8" stroke-width="1.5" />
              <line x1="88" y1="136" x2="272" y2="184" stroke="#4ade80" stroke-width="3.5" />
              <line x1="88" y1="184" x2="272" y2="66" stroke="#4ade80" stroke-width="3.5" />
              <circle cx="70" cy="55" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="70" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">u1</text>
              <circle cx="70" cy="125" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="70" y="125" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">u2</text>
              <circle cx="70" cy="195" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="70" y="195" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">u3</text>
              <circle cx="290" cy="55" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="290" y="55" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">v1</text>
              <circle cx="290" cy="125" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="290" y="125" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">v2</text>
              <circle cx="290" cy="195" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="290" y="195" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">v3</text>
              <text x="180" y="224" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">匹配数 = 3（u3-v1, u1-v2, u2-v3）</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">匹配后：增广路 u3→v1→u1→v2→u2→v3 依次腾挪，达成完美匹配</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 匹配定义 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          匹配 / 最大匹配 / 完美匹配
        </h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>匹配（matching）</strong>：一组「两两不相邻」的边——即任何两条匹配边<strong>不共享端点</strong>。每个点最多被一条匹配边覆盖。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>最大匹配（maximum matching）</strong>：边数最多的匹配。注意它不一定唯一。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>完美匹配（perfect matching）</strong>：覆盖<strong>所有顶点</strong>的匹配。只有左右两侧顶点数相等时才可能存在。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>增广路（augmenting path）</strong>：起点和终点都是<strong>未匹配点</strong>、路径上「未匹配边 / 匹配边」交替出现的路径。把这条路上的匹配状态取反（匹配 ↔ 不匹配），匹配数 +1。</span></li>
        </ul>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-sm text-cyan-700 font-mono font-bold">最大匹配 ⇔ 不存在增广路（Berge 引理）—— 增广路是最大匹配的核心判据</p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          二分图最大匹配就是<strong>把 N 个任务分给 M 个工人，每个工人只能做部分任务，最多能同时开工多少</strong>——
          工人是左列、任务是右列、边 = 「这个工人会做这个任务」。也像 <strong>浏览器渲染的合成器分配</strong>：
          多个图层分配给多个合成层，一个层不能重复占位。
          </p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① 用贪心直接配对——「每个左边节点挑第一个空闲右边」可能不是最大匹配，需要增广路来纠正（见动画）。<br/>
          ② 把「最大匹配」和「最大权匹配」混淆——本课只讲无权（每条边价值相同）；带权重的是匈牙利算法扩展（Kuhn-Munkres）。
          </p>
        </aside>
      </section>

      <!-- 2. 归约 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          归约为最大流：加源点/汇点，容量全为 1
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          把二分图 G = (U ∪ V, E) 变成流网络的<strong>归约（reduction）</strong>只需要三步：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>加<strong>超级源点 s</strong>，连到每个左侧节点 u∈U，容量 1（每个工人最多接一个任务）。</li>
          <li>原二分边 <strong>u→v 方向统一为左到右</strong>，容量 1。</li>
          <li>加<strong>超级汇点 t</strong>，每个右侧节点 v∈V 连到 t，容量 1（每个任务最多分给一个人）。</li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>为什么成立？</strong>容量 1 保证每个 u 最多流出 1、每个 v 最多流入 1——这正是「匹配」的两条约束。
          于是任何可行流都对应一个匹配（流量为 1 的 u→v 边就是匹配边），反之任何匹配都能写成可行流。
          所以 <strong>最大流值 = 最大匹配数</strong>，并且最大流的残余网络 BFS 还能顺带求出最小点覆盖（König 定理）。
        </p>
        <div class="mb-4"><Code language="ts" :code="buildFlowCode" title="build_bipartite_flow.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          归约就像<strong>加一个虚拟总闸和总出水口</strong>——问题本身没变，只是换了个「插头」：
          相当于给 API 加一层适配器（adapter），让旧客户端（最大流算法）直接消费新数据源（匹配问题）。
          </p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① 漏掉 s→u 或 v→t 的边——只把左右之间的边建出来，流根本到不了 t，结果恒为 0。<br/>
          ② 把容量设成「匹配数」或 ∞——容量必须 <strong>1</strong>，否则一个工人可能被分配多个任务，匹配约束被破坏。
          </p>
        </aside>
      </section>

      <!-- 3. 匈牙利 vs 最大流 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          匈牙利算法 vs 最大流解法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>匈牙利算法（Kuhn 版）</strong>是二分图最大匹配的经典专用算法：对每个左侧节点 DFS 找增广路，
          遇到已被占用的右侧节点，就沿它的匹配边「退回」去给它的原匹配者找新出路——这本质上是<strong>手工实现的残余网络回溯</strong>。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">匈牙利（Kuhn）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">归约成最大流</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">思路</td><td class="px-4 py-2 border">逐个左侧点找增广路</td><td class="px-4 py-2 border">建流网络跑 Dinic</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">复杂度</td><td class="px-4 py-2 border font-mono">O(V·E)</td><td class="px-4 py-2 border font-mono">O(V²·E)，单位容量图实际更快</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">实现难度</td><td class="px-4 py-2 border">简单，几十行</td><td class="px-4 py-2 border">需先写好 Dinic，但更通用</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">扩展性</td><td class="px-4 py-2 border">只解二分匹配</td><td class="px-4 py-2 border">能套所有网络流问题（多源汇、容量 > 1…）</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="maxMatchViaFlowCode" title="max_match_via_flow.ts" /></div>
        <div class="mb-4"><Code language="ts" :code="hungarianCode" title="hungarian.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>只做纯二分匹配 → 匈牙利最省事；问题带「多对一 / 容量限制 / 多源多汇」等变体 → 直接建流网络跑 Dinic，一套代码通吃。</p>
        </aside>
      </section>

      <!-- 4. 应用 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          应用场景：任务分配与稳定婚姻
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">场景</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">左侧 / 右侧</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">匹配的含义</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">任务分配</td><td class="px-4 py-2 border">工人 / 任务</td><td class="px-4 py-2 border">同时开工的任务数最多</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">课程/教室排课</td><td class="px-4 py-2 border">课程 / 时间段</td><td class="px-4 py-2 border">不冲突地排下最多课程</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">稳定婚姻（铺垫）</td><td class="px-4 py-2 border">男生 / 女生</td><td class="px-4 py-2 border">匹配数最多之外还要求「稳定」（无一对想私奔）；用 Gale-Shapley，不是最大流</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>稳定婚姻问题</strong>是匹配的「加料版」：除了要一个完美匹配，还要求任何两人不能同时认为对方优于现任。
          它不能用最大流解决，而是用 <strong>Gale-Shapley 延迟接受算法</strong>——这说明「归约」不是万能的，选对工具比套模板更重要。
        </p>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>最大匹配只回答「最多能配多少对」；一旦问题变成「配对后整体满意度最高」（带权），就需要
          最小费用最大流或 KM 算法，这属于网络流的进阶话题。</p>
        </aside>
      </section>

      <!-- 5. 复杂度 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          复杂度对比
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方法</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">备注</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">匈牙利（Kuhn）</td><td class="px-4 py-2 border font-mono">O(V·E)</td><td class="px-4 py-2 border">DFS 每个左侧点找增广路</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">归约 + Dinic</td><td class="px-4 py-2 border font-mono">O(V²·E)</td><td class="px-4 py-2 border">单位容量图上实际更优（O(E·√V)）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">Hopcroft-Karp</td><td class="px-4 py-2 border font-mono">O(E·√V)</td><td class="px-4 py-2 border">二分匹配专用最优实现（了解即可）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>把匈牙利算法的 <code>visited</code> 数组放在递归外层复用——必须每个左侧节点新建一份，
          否则增广路搜索会「看不到」已被本回合标记的右节点，导致漏配。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：归约建图 → 最大流求最大匹配
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          「归约建图」加上超级源点 s 与超级汇点 t（容量全 1）；「跑最大流」依次增广：
          增广路变橙（含灰色虚线=反向边回溯），匹配边变绿加粗。第 3 轮会出现经典<strong>腾挪</strong>：
          u3→v1→u1→v2→u2→v3，把 2 条匹配变成 3 条（完美匹配）。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">👫 匹配数: {{ matchCount }}/3</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doReduce" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">🏗️ 归约建图</button>
          <button @mousedown="doMaxFlow" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">🚀 跑最大流</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <!-- 归约前：二分图本体（无向灰线） -->
              <v-line v-if="!reduced" v-for="e in gEdges" :key="'l'+e.from+e.to" :config="biLineCfg(e)" />
              <!-- 归约后：有向流网络 -->
              <template v-if="reduced">
                <v-arrow v-for="e in gEdges" :key="'a'+e.from+e.to+(e.rev?'r':'')" :config="arrowCfg(e)" />
                <v-text v-for="e in gEdges" :key="'w'+e.from+e.to+(e.rev?'r':'')" :config="weightCfg(e)" />
              </template>
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>匹配</strong>：两两不相邻的边集；最大匹配 = 边数最多；完美匹配 = 覆盖全部顶点</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Berge 引理</strong>：匹配是最大的 ⇔ 不存在增广路（起点终点均未匹配、边交替）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>归约</strong>：s→左(1) + 左→右(1) + 右→t(1) 建流网络，最大流 = 最大匹配数</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>对比</strong>：匈牙利 O(V·E) 实现简单；归约+最大流更通用；Hopcroft-Karp O(E√V) 最优</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>应用</strong>：任务分配、排课；稳定婚姻需 Gale-Shapley，不是最大流</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下一步</strong>：模块 6-6 连通性——强连通分量（Tarjan/Kosaraju）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-5-network-flow/dsa-6-5-2-min-cut" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：最小割与最大流-最小割定理</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-6-connectivity/dsa-6-6-1-scc" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：强连通分量(SCC)：Tarjan/Kosaraju算法 →</RouterLink>
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
  { id: "sec-1", name: "匹配/最大匹配/完美匹配" },
  { id: "sec-2", name: "归约为最大流" },
  { id: "sec-3", name: "匈牙利 vs 最大流" },
  { id: "sec-4", name: "应用场景" },
  { id: "sec-5", name: "复杂度对比" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 二分匹配动画（最大流归约）=====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(490), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const reduced = ref(false)
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

interface GNode { id: string; label: string; x: number; y: number; color: string }
interface GEdge { from: string; to: string; w: number; flow: number; color: string; rev?: boolean; dashed?: boolean }
const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])

const matchCount = computed(() => gEdges.filter(e => !e.rev && e.to === 'T').reduce((s, e) => s + e.flow, 0))

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)
  reduced.value = false
  ;[
    { id:'u1', label:'u1', x:190, y:150, color:C.cyan },
    { id:'u2', label:'u2', x:190, y:250, color:C.cyan },
    { id:'u3', label:'u3', x:190, y:350, color:C.cyan },
    { id:'v1', label:'v1', x:510, y:150, color:C.cyan },
    { id:'v2', label:'v2', x:510, y:250, color:C.cyan },
    { id:'v3', label:'v3', x:510, y:350, color:C.cyan },
  ].forEach(n => gNodes.push({ ...n }))
  ;[
    { from:'u1', to:'v1' }, { from:'u1', to:'v2' },
    { from:'u2', to:'v2' }, { from:'u2', to:'v3' },
    { from:'u3', to:'v1' },
  ].forEach(e => gEdges.push({ ...e, w:1, flow:0, color:'#94a3b8' }))
}

function buildReduced() {
  if (reduced.value) return
  gNodes.push({ id:'S', label:'s', x:350, y:40, color:C.violet })
  gNodes.push({ id:'T', label:'t', x:350, y:450, color:C.blue })
  ;['u1','u2','u3'].forEach(id => gEdges.push({ from:'S', to:id, w:1, flow:0, color:'#94a3b8' }))
  ;['v1','v2','v3'].forEach(id => gEdges.push({ from:id, to:'T', w:1, flow:0, color:'#94a3b8' }))
  reduced.value = true
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
    gEdges.push({ from: e.to, to: e.from, w: e.flow, flow: 0, color: '#cbd5e1', rev: true, dashed: true })
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

function paintMatched() {
  gEdges.forEach(e => {
    if (e.rev) { e.color = '#cbd5e1'; return }
    e.color = e.flow > 0 ? C.green : '#94a3b8'
  })
}

async function augmentOnce(animate: boolean): Promise<boolean> {
  const path = findAugPath()
  if (!path) {
    status.value = '❌ 无增广路 —— 匹配数 = ' + matchCount.value + '，已是最大匹配'
    await d(900)
    return false
  }
  restoreNodes(); paintMatched()
  for (let i = 0; i < path.length - 1; i++) {
    const e = edgeFor(path[i], path[i+1])
    if (e) e.color = C.orange
    const n = pos(path[i]); if (n) n.color = C.orange
  }
  const nt = pos('T'); if (nt) nt.color = C.orange
  status.value = '🔍 增广路: ' + path.join(' → ')
  await d(1100)

  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i], v = path[i+1]
    const f = fwd(u, v)
    if (f) f.flow += 1
    else { const rf = fwd(v, u); if (rf) rf.flow -= 1 }   // 沿反向边走：解除旧匹配（腾挪）
  }
  syncRevEdges()
  restoreNodes(); paintMatched()
  status.value = '✅ 匹配数 = ' + matchCount.value
  await d(1000)
  restoreNodes()
  return true
}

async function doReduce() {
  await act('把二分图改造成流网络', '归约建图', async () => {
    if (reduced.value) return
    gNodes.push({ id:'S', label:'s', x:350, y:40, color:C.green })
    status.value = '① 加超级源点 s，容量 1 连到每个左侧节点'
    await d(700)
    ;['u1','u2','u3'].forEach(id => gEdges.push({ from:'S', to:id, w:1, flow:0, color:'#94a3b8' }))
    await d(500)
    gNodes.push({ id:'T', label:'t', x:350, y:450, color:C.blue })
    status.value = '② 加超级汇点 t，每个右侧节点容量 1 连到 t'
    await d(700)
    ;['v1','v2','v3'].forEach(id => gEdges.push({ from:id, to:'T', w:1, flow:0, color:'#94a3b8' }))
    reduced.value = true
    status.value = '✅ 归约完成：s→左(1) + 左→右(1) + 右→t(1) → 最大流 = 最大匹配数'
    await d(800)
  })
}

async function doMaxFlow() {
  await act('在流网络上跑最大流', '归约 + Dinic', async () => {
    if (!reduced.value) buildReduced()
    let guard = 0
    while (guard++ < 10) {
      const more = await augmentOnce(true)
      if (!more) break
    }
    const perfect = matchCount.value === 3
    status.value = '🏁 最大匹配 = ' + matchCount.value + (perfect ? '（完美匹配 ✓）' : '')
    await d(700)
  })
}

function doReset() { initGraph(); status.value = ''; opLabel.value = '' }

async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

function biLineCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  const w = e.color === C.green ? 4 : 2
  return { points:[a.x, a.y, b.x, b.y], stroke:e.color === C.green ? C.green : '#94a3b8', strokeWidth:w }
}
function arrowCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  const base = { points:[a.x, a.y, b.x, b.y], pointerLength:9, pointerWidth:7 }
  if (e.rev || e.dashed) return { ...base, fill:'#cbd5e1', stroke:'#cbd5e1', strokeWidth:1.5, dash:[6,4] }
  if (e.color !== '#94a3b8') return { ...base, fill:e.color, stroke:e.color, strokeWidth:3 }
  return { ...base, fill:'#94a3b8', stroke:'#94a3b8', strokeWidth:1.5 }
}
function weightCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  const label = e.rev ? String(e.w) : (e.flow + '/' + e.w)
  return { x:(a.x+b.x)/2 - 20, y:(a.y+b.y)/2 - 8, width:40, text:label, fontSize:10, fontFamily:'monospace', fill:e.rev ? '#94a3b8' : C.muted, align:'center' }
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
  return { x:n.x-22, y:n.y-22, width:44, height:44, text:n.label, fontSize:14, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle' }
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
const buildFlowCode = `// ===== 把二分图归约为最大流 =====
// 归约三步曲：
//   ① 加超级源点 s：s → 每个左侧节点，容量 1
//   ② 左侧 → 右侧：允许匹配的边，容量 1（方向统一左→右）
//   ③ 加超级汇点 t：每个右侧节点 → t，容量 1
// 最大流 = 最大匹配数；流经 (u→v) 且流量 = 1 的边 = 匹配边

function buildBipartiteFlow(
  left: string[],                      // 左侧节点（工人）
  right: string[],                     // 右侧节点（任务）
  allowed: [string, string][]          // 允许的匹配关系
): { nodes: string[]; cap: number[][] } {
  const id = new Map<string, number>()
  const nodes: string[] = ['s']
  const ids = (x: string) => { if (!id.has(x)) { id.set(x, nodes.length); nodes.push(x) } return id.get(x)! }
  left.forEach(ids); right.forEach(ids)
  const tId = nodes.length
  nodes.push('t')

  const cap = Array.from({ length: nodes.length + 1 }, () => new Array<number>(nodes.length + 1).fill(0))
  const sId = 0
  left.forEach(x => { cap[sId][ids(x)] = 1 })          // s → 左，容量 1
  allowed.forEach(([l, r]) => { cap[ids(l)][ids(r)] = 1 })  // 左 → 右，容量 1
  right.forEach(x => { cap[ids(x)][tId] = 1 })         // 右 → t，容量 1
  return { nodes: [...nodes, 't'], cap }
}

// 例：3 个工人 × 3 个任务
const left = ['u1', 'u2', 'u3']
const right = ['v1', 'v2', 'v3']
const allowed: [string, string][] = [
  ['u1','v1'], ['u1','v2'],
  ['u2','v2'], ['u2','v3'],
  ['u3','v1'],
]
const { nodes, cap } = buildBipartiteFlow(left, right, allowed)
// nodes = ['s', 'u1','u2','u3', 'v1','v2','v3', 't']`

const maxMatchViaFlowCode = `// ===== 用 Dinic 求二分图最大匹配 =====
// 建好流网络后直接跑最大流：流值 = 最大匹配数
// 匹配方案：流量 = 1 的「左→右」边就是匹配边

function maxBipartiteMatch(
  left: string[],
  right: string[],
  allowed: [string, string][]
): { size: number; matching: [string, string][] } {
  const { nodes, cap } = buildBipartiteFlow(left, right, allowed)
  const s = 0, t = nodes.length - 1
  // 复用 6-5-1 的 dinic(n, s, t, cap)，并拿到流量矩阵 flows
  const flows = runDinicWithFlows(nodes.length, s, t, cap)
  const maxFlow = flows.maxFlow

  // 流量为 1 的左→右边 = 匹配边
  const matching: [string, string][] = []
  for (const [l, r] of allowed) {
    const li = nodes.indexOf(l), ri = nodes.indexOf(r)
    if (flows.flow[li][ri] === 1) matching.push([l, r])
  }
  return { size: maxFlow, matching }
}

// runDinicWithFlows = dinic + 返回 flow 矩阵（见 6-5-1 的 dinic 实现）
// 对本例：最大匹配 = 3，匹配边 = [u3-v1, u1-v2, u2-v3]`

const hungarianCode = `// ===== 匈牙利算法（Kuhn 版，对照）=====
// 思路：逐个左侧节点找增广路（DFS）
//   已匹配的右节点 → 尝试「腾挪」：走反向边回到它的左匹配，再找新出路
// 复杂度 O(V·E)，对稠密图通常比最大流实现更简单直接

function hungarian(
  leftCount: number,
  rightCount: number,
  adj: number[][]        // adj[u] = u 能匹配的右节点列表
): { size: number; matchR: number[] } {
  const matchR = new Array<number>(rightCount).fill(-1)   // matchR[v] = 匹配的左节点

  const tryKuhn = (u: number, visited: boolean[]): boolean => {
    for (const v of adj[u]) {
      if (visited[v]) continue
      visited[v] = true
      if (matchR[v] === -1 || tryKuhn(matchR[v], visited)) {
        matchR[v] = u      // 直接匹配，或腾出 v 再匹配
        return true
      }
    }
    return false
  }

  let size = 0
  for (let u = 0; u < leftCount; u++) {
    // ⚠️ 每个左侧节点必须新建 visited，不能复用
    if (tryKuhn(u, new Array(rightCount).fill(false))) size++
  }
  return { size, matchR }
}

// 例：u1:{v1,v2} u2:{v2,v3} u3:{v1}
// u1→v1；u2→v2；u3 想占 v1 → 腾挪 v1 的 u1 去 v2 → v2 的 u2 去 v3
// 最终匹配：u1-v2, u2-v3, u3-v1，size = 3（完美匹配）`
</script>

<style scoped></style>
