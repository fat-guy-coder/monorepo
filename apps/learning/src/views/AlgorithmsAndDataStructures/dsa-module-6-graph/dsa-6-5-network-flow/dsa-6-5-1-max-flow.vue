<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">💧 最大流：Ford-Fulkerson / Edmonds-Karp / Dinic</h1>
          <p class="text-sm text-slate-500 mt-1">增广路 + 反向边 —— 流量网络的「水管调度」</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-5-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：一张「只进不出 / 只出不进」的输水管道图
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          流网络（flow network）是一张<strong>有向图</strong>：每条边是一根单向输水管道，边上的数字是<strong>容量</strong>（最多能输送多少）。
          水从<strong>源点 s</strong> 注入，流经中间的节点，最终从<strong>汇点 t</strong> 排出。<strong>最大流问题</strong>就是问：
          这套管网<strong>最多能输送多少水</strong>？答案靠「反复找增广路 + 反向边纠错」来逼近。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="nf-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">流网络：有向边 = 单向管道，数字 = 容量 c(u,v)（最多输送多少）</text>

            <line x1="92" y1="120" x2="208" y2="60" stroke="#94a3b8" stroke-width="2" marker-end="url(#nf-arr)" />
            <line x1="92" y1="120" x2="208" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#nf-arr)" />
            <line x1="230" y1="82" x2="230" y2="158" stroke="#94a3b8" stroke-width="2" marker-end="url(#nf-arr)" />
            <line x1="252" y1="60" x2="398" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#nf-arr)" />
            <line x1="252" y1="180" x2="398" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#nf-arr)" />
            <line x1="442" y1="120" x2="558" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#nf-arr)" />

            <text x="148" y="80" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">3</text>
            <text x="148" y="164" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">3</text>
            <text x="246" y="112" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">3</text>
            <text x="324" y="80" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">2</text>
            <text x="324" y="164" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">2</text>
            <text x="500" y="104" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">4</text>

            <circle cx="70" cy="120" r="22" fill="#a78bfa" stroke="#7c3aed" stroke-width="2" />
            <text x="70" y="120" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">s</text>
            <circle cx="230" cy="60" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="230" y="60" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="230" cy="180" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="230" y="180" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="420" cy="120" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="420" y="120" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <circle cx="580" cy="120" r="22" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
            <text x="580" y="120" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">t</text>

            <text x="70" y="158" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">源点 s</text>
            <text x="580" y="158" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">汇点 t</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：流网络 —— s 只出不进、t 只进不出；本模块动画用这张 5 节点网络（最大流 = 4）</figcaption>
        </figure>

        <!-- 关键操作 before/after -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：沿增广路输送，并长出「反向边」</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <svg viewBox="0 0 360 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="bf-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
              </defs>
              <text x="16" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">增广前：流量全 0，找一条 s→t 路</text>
              <line x1="62" y1="110" x2="108" y2="50" stroke="#f59e0b" stroke-width="3" marker-end="url(#bf-arr)" />
              <line x1="152" y1="50" x2="208" y2="110" stroke="#f59e0b" stroke-width="3" marker-end="url(#bf-arr)" />
              <line x1="252" y1="110" x2="308" y2="110" stroke="#f59e0b" stroke-width="3" marker-end="url(#bf-arr)" />
              <text x="85" y="66" text-anchor="middle" font-size="11" font-family="monospace" fill="#f59e0b">0/3</text>
              <text x="180" y="66" text-anchor="middle" font-size="11" font-family="monospace" fill="#f59e0b">0/2</text>
              <text x="280" y="96" text-anchor="middle" font-size="11" font-family="monospace" fill="#f59e0b">0/4</text>
              <circle cx="40" cy="110" r="20" fill="#a78bfa" stroke="#7c3aed" stroke-width="2" />
              <text x="40" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">s</text>
              <circle cx="130" cy="50" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="130" y="50" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <circle cx="230" cy="110" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="230" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
              <circle cx="330" cy="110" r="20" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
              <text x="330" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">t</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">增广前：s→A→C→t 残余容量 = min(3, 2, 4) = 2</figcaption>
          </figure>
          <figure>
            <svg viewBox="0 0 360 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="af-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" />
                </marker>
                <marker id="af-rarr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <text x="16" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">增广后：沿路径 +2，长出反向边（灰虚线）</text>
              <line x1="62" y1="110" x2="108" y2="50" stroke="#4ade80" stroke-width="3" marker-end="url(#af-arr)" />
              <line x1="152" y1="50" x2="208" y2="110" stroke="#4ade80" stroke-width="3" marker-end="url(#af-arr)" />
              <line x1="252" y1="110" x2="308" y2="110" stroke="#4ade80" stroke-width="3" marker-end="url(#af-arr)" />
              <line x1="108" y1="50" x2="62" y2="110" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#af-rarr)" />
              <line x1="208" y1="110" x2="152" y2="50" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#af-rarr)" />
              <line x1="308" y1="110" x2="252" y2="110" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#af-rarr)" />
              <text x="85" y="66" text-anchor="middle" font-size="11" font-family="monospace" fill="#16a34a">2/3</text>
              <text x="180" y="66" text-anchor="middle" font-size="11" font-family="monospace" fill="#16a34a">2/2</text>
              <text x="280" y="96" text-anchor="middle" font-size="11" font-family="monospace" fill="#16a34a">2/4</text>
              <text x="85" y="100" text-anchor="middle" font-size="10" font-family="monospace" fill="#94a3b8">2</text>
              <text x="180" y="100" text-anchor="middle" font-size="10" font-family="monospace" fill="#94a3b8">2</text>
              <text x="280" y="128" text-anchor="middle" font-size="10" font-family="monospace" fill="#94a3b8">2</text>
              <circle cx="40" cy="110" r="20" fill="#a78bfa" stroke="#7c3aed" stroke-width="2" />
              <text x="40" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">s</text>
              <circle cx="130" cy="50" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="130" y="50" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <circle cx="230" cy="110" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="230" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
              <circle cx="330" cy="110" r="20" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
              <text x="330" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">t</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">增广后：总流量 2；有流量的边都长出反向边（虚线，容量 = 当前流量，可退回）</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 流网络定义 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          流网络：源点 / 汇点 / 容量
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          流网络（flow network）由四个要素定义：
        </p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>有向图 G = (V, E)</strong>：每条边 (u, v) 都带方向，水只能顺着方向流。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>容量 c(u, v) ≥ 0</strong>：边 (u, v) 最多能输送的量，相当于管道的粗细。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>源点 s</strong>：水的唯一入口，只出不进。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>汇点 t</strong>：水的唯一出口，只进不出。</span></li>
        </ul>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          一个<strong>可行流（feasible flow）f</strong> 是给每条边分配一个流量 f(u,v)，并且满足两条规则（见下一节）。
          <strong>最大流 = 满足规则的前提下，f 能达到的最大总流量</strong>，即从 s 出发（或进入 t 的）流量总和最大。
        </p>
        <div class="mb-4"><Code language="ts" :code="flowNetCode" title="flow_network.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          最大流就像<strong>城市水管网络最多能输送多少水</strong>——自来水厂（源点 s）通过粗细不同的管道（容量）供给千家万户（汇点 t）。
          也像<strong> CDN 带宽调度</strong>：源站（s）→ 各层级缓存节点 → 用户（t），每条链路的带宽上限就是容量，
          你要算的是「整张网络最多能扛住多少并发下载」。
          </p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① 把「容量」和「流量」混为一谈——容量是管道上限（固定不变），流量是当前实际输送量（会变化，且永远 ≤ 容量）。<br/>
          ② 在无向图上直接套最大流——流网络要求<strong>有向边</strong>；无向图必须拆成两条有向边（各自容量相同）再处理。
          </p>
        </aside>
      </section>

      <!-- 2. 可行流 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          可行流的两条铁律：容量约束 + 流量守恒
        </h2>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>容量约束（capacity constraint）</strong>：任意边 (u,v) 上 0 ≤ f(u,v) ≤ c(u,v)。流量不能超过管道粗细，也不能为负。</li>
          <li><strong>流量守恒（flow conservation）</strong>：除 s、t 外，每个节点「流入总量 = 流出总量」。水不能在中间节点凭空消失或产生。</li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          两条规则合起来，就保证了「水从 s 进来多少，最终必然从 t 出去多少」——这就是最大流问题的<strong>守恒结构</strong>：
          所有算法的本质都是在这个守恒约束下，一点点把流量从 s 推到 t。
        </p>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-sm text-cyan-700 font-mono font-bold">总流量 = Σ f(s, v) = Σ f(v, t)　（从 s 出的 = 进 t 的）</p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          流量守恒就像<strong>一个中转路由器的流量日志</strong>：进来的请求数必须等于转发出去的请求数（丢包不算）。
          也像 <strong>React 单向数据流</strong>——数据从顶层 store 分发下去，每个中间组件只是「过路」，不能凭空多造或少掉 props。
          </p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① 只检查容量约束、忘记流量守恒——那样「每个节点都往里灌」也能得出很大的假流量，但根本不是可行流。<br/>
          ② 给反向边也设容量约束——反向边不是真实管道，它的「容量」就是正向边的当前流量，不要手工另设容量。
          </p>
        </aside>
      </section>

      <!-- 3. 增广路与反向边 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          增广路与反向边：残余网络是「后悔药」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>残余容量（residual capacity）</strong> = 容量 − 当前流量，表示这条边还能再送多少。
          由所有「还有残余容量的正向边」+「反向边」组成的图叫<strong>残余网络（residual network）</strong>。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>增广路（augmenting path）</strong>：残余网络中从 s 到 t 的一条路径，路径上每条边都还有残余容量。</li>
          <li><strong>增广（augment）</strong>：取路径上最小的残余容量 δ，把路径上每条正向边流量 +δ，反向边流量 −δ。</li>
          <li><strong>反向边（reverse edge）</strong>：每条有流量的正向边都对应一条反向边，残余容量 = 当前流量，作用是把之前「走错」的流量退回去。</li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          为什么需要反向边？贪心会犯错：某条增广路可能占了别的路更需要的管道。反向边允许算法<strong>撤销先前的分配</strong>，
          把流量改道。这正是最大流算法与普通贪心最本质的区别。
        </p>
        <div class="mb-4"><Code language="ts" :code="residualCode" title="residual_network.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          反向边就是<strong>撤销按钮 / 后悔药</strong>——像 <code>Ctrl+Z</code>、像 Redux 里的 <code>dispatch</code> 回滚、
          像 git 的 <code>revert</code>：先按某个方案分配了流量，发现堵死了别人，就沿反向边走回去，把流量改道。
          </p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>忘记加反向边</strong>——只沿正向边找增广路，贪心一旦分配错就无法纠正，结果不是最大流。<br/>
          ② 反向边容量算错——反向边残余 = 正向边<strong>当前流量</strong>，不是正向边容量，也不是 ∞。
          </p>
        </aside>
      </section>

      <!-- 4. Ford-Fulkerson -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          Ford-Fulkerson：最朴素的「反复找增广路」框架
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Ford-Fulkerson 是一个<strong>框架</strong>而不是具体算法——它只规定「反复做」，不规定怎么找路：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>初始化：所有边流量为 0。</li>
          <li>在残余网络中找一条 s→t 的增广路（本框架用 DFS 任意找一条）。</li>
          <li>找不到 → 结束，当前流量就是最大流；找得到 → 沿路径增广 δ，回到第 2 步。</li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          用 DFS 找路实现简单，但最坏情况可能增广很多次（每条增广路只 +1 也可能），理论上界很松（依赖容量大小）。
          代码里用 <code>flow[v][u] -= d</code> 统一处理反向边，避免显式建反向边结构。
        </p>
        <div class="mb-4"><Code language="ts" :code="fordFulkersonCode" title="ford_fulkerson.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① DFS 找路时忘了 <code>visited</code> 数组——会在残余网络里绕圈死循环。<br/>
          ② 认为 Ford-Fulkerson 一定很快——DFS 可能反复走「1 容量瓶颈」路径，复杂度可达 O(E·|f*|)，f* 很大时极慢，工程上请用 EK 或 Dinic。
          </p>
        </aside>
      </section>

      <!-- 5. Edmonds-Karp -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          Edmonds-Karp：用 BFS 找「最短」增广路
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Edmonds-Karp 只是把 Ford-Fulkerson 里的「任意找路」换成 <strong>BFS 找边数最少的增广路</strong>，
          却把复杂度从「依赖容量」变成<strong>严格多项式 O(V·E²)</strong>。直觉：每次 BFS 都走最短路，残余网络里
          s 到 t 的最短距离单调不减，而每次增广至少让一条边饱和，总轮数 ≤ O(V·E)。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>BFS 从 s 出发，只沿残余容量 &gt; 0 的边扩展，记录每个点的「父节点」，直到碰到 t。</li>
          <li>沿父链回溯出整条增广路，δ = 路径上最小残余容量。</li>
          <li>正向边 +δ、反向边 −δ；重复直到 BFS 到不了 t。</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="edmondsKarpCode" title="edmonds_karp.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          BFS 找最短增广路，就像<strong>外卖调度总是先派最近的外卖员</strong>——宁可多派几单，也要保证每单都尽快送达；
          相比「随便找个能送的人」的贪心（DFS），BFS 保证了整体轮数可控。
          </p>
        </aside>
      </section>

      <!-- 6. Dinic -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">6</span>
          Dinic：分层图 + 阻塞流，一次 BFS 送出一大批
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Dinic 在 EK 之上做了两个关键优化：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>分层图（level graph）</strong>：BFS 给每个节点标层号 level[v] = s 到 v 的最短边数；DFS 只沿 level 恰好 +1 的边前进（保证不走回头路）。</li>
          <li><strong>阻塞流（blocking flow）</strong>：在当前分层图上用 DFS 一口气送出所有能送的流量（多路增广），直到该分层图上 s 到 t 再也推不动为止。</li>
          <li>重新 BFS 分层，重复，直到 t 不可达。</li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>当前弧优化（current arc）</strong>是 Dinic 提速的关键：DFS 中某条边被榨干后，下次直接从下一条开始，
          避免反复扫描已饱和的边。整体复杂度 O(V²·E)，是竞赛与工程中最常用的最大流实现。
        </p>
        <div class="mb-4"><Code language="ts" :code="dinicCode" title="dinic.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>面试/竞赛/工程里最大流首选 <strong>Dinic</strong>（O(V²E)）；
          网络规模小、图简单时用 Edmonds-Karp 就够；Ford-Fulkerson 只用于讲原理。判断「该用哪个」时看 V 和 E 的量级即可。
          </p>
        </aside>
      </section>

      <!-- 7. 复杂度对比 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">7</span>
          三种算法复杂度对比
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">算法</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">找增广路</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特点</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">Ford-Fulkerson</td><td class="px-4 py-2 border font-mono">DFS 任意一条</td><td class="px-4 py-2 border font-mono">O(E · |f*|)</td><td class="px-4 py-2 border">依赖容量值，最坏极慢；只讲原理</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">Edmonds-Karp</td><td class="px-4 py-2 border font-mono">BFS 最短一条</td><td class="px-4 py-2 border font-mono">O(V·E²)</td><td class="px-4 py-2 border">多项式上界，实现简单</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">Dinic</td><td class="px-4 py-2 border font-mono">分层图 + 阻塞流</td><td class="px-4 py-2 border font-mono">O(V²·E)</td><td class="px-4 py-2 border">当前弧优化，实际最快，工程首选</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>对二分图最大匹配（6-5-3），Dinic 甚至能跑到 O(E·√V) 的更好界；
          对单位容量图，所有算法的实际表现都会远好于理论最坏情况。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：Edmonds-Karp 找增广路 → 增广 → 反向边
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          边上的标签是 <strong>流量/容量</strong>。「增广路 BFS」找一条最短增广路（路径边变橙），沿路增广后
          流量更新、反向边以<strong>灰色虚线</strong>出现（容量 = 当前流量）。「计算最大流」反复执行直到无路可走。
          这张网络的最大流是 <strong>4</strong>。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full">📊 总流量: {{ totalFlow }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doAugment" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm">🔍 增广路 BFS</button>
          <button @mousedown="doMaxFlow" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">⚡ 计算最大流</button>
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
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>流网络</strong>：有向图 + 容量，s 只出不进、t 只进不出；最大流 = 满足约束的最大总流量</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>可行流铁律</strong>：容量约束（0 ≤ f ≤ c）+ 流量守恒（流入 = 流出）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>残余网络</strong>：正向残余 = c − f，反向边残余 = f（后悔药，允许撤销/改道）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>增广路</strong>：残余网络中 s→t 的一条路；反复增广直到无路可走即得最大流</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三件套</strong>：FF（DFS，O(E·f*)）→ EK（BFS，O(V·E²)）→ Dinic（分层+阻塞流，O(V²·E)）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下一步</strong>：6-5-2 用最大流求最小割（max-flow = min-cut 定理）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-4-mst/dsa-6-4-2-kruskal" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Kruskal算法：基于边的贪心+并查集</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-5-network-flow/dsa-6-5-2-min-cut" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：最小割与最大流-最小割定理 →</RouterLink>
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
  { id: "sec-1", name: "流网络定义" },
  { id: "sec-2", name: "可行流两条铁律" },
  { id: "sec-3", name: "增广路与反向边" },
  { id: "sec-4", name: "Ford-Fulkerson" },
  { id: "sec-5", name: "Edmonds-Karp" },
  { id: "sec-6", name: "Dinic" },
  { id: "sec-7", name: "复杂度对比" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-8", name: "小结" },
]

// ===== 🎬 最大流动画（Edmonds-Karp BFS 增广）=====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(330), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

interface GNode { id: string; label: string; x: number; y: number; color: string }
interface GEdge { from: string; to: string; w: number; flow: number; color: string; rev?: boolean; dashed?: boolean }
const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])

const totalFlow = computed(() => gEdges.filter(e => !e.rev && e.to === 'T').reduce((s, e) => s + e.flow, 0))

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)
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
  const rf = fwd(v, u)               // 无正向边 → 可能是反向边：可退回 v→u 上的流量
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
    status.value = '❌ 无增广路 —— 当前流量已是最大流'
    await d(900)
    return false
  }
  let delta = Infinity
  for (let i = 0; i < path.length - 1; i++) delta = Math.min(delta, residual(path[i], path[i+1]))
  restoreNodes(); paintFlowEdges()
  for (let i = 0; i < path.length - 1; i++) {
    const e = edgeFor(path[i], path[i+1])
    if (e) e.color = C.orange
    colorOf(path[i], C.orange)
  }
  colorOf('T', C.orange)
  status.value = '🔍 增广路: ' + path.join(' → ') + '，δ = ' + delta
  await d(950)

  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i], v = path[i+1]
    const f = fwd(u, v)
    if (f) f.flow += delta
    else { const rf = fwd(v, u); if (rf) rf.flow -= delta }   // 沿反向边走：退回流量
  }
  syncRevEdges()
  restoreNodes(); paintFlowEdges()
  status.value = '✅ 增广完成：总流量 = ' + totalFlow.value + '（反向边 ' + gEdges.filter(e => e.rev).length + ' 条）'
  await d(950)
  restoreNodes()
  return true
}

function colorOf(id: string, c: string) { const n = pos(id); if (n) n.color = c }

async function doAugment() {
  await act('寻找一条增广路并增广', 'BFS 增广', async () => { await augmentOnce(true) })
}

async function doMaxFlow() {
  await act('反复增广直到无路可走', 'Edmonds-Karp', async () => {
    initGraph()
    let guard = 0
    while (guard++ < 20) {
      const more = await augmentOnce(true)
      if (!more) break
    }
    status.value = '🏁 最大流 = ' + totalFlow.value + '（min-cut = 4，见 6-5-2）'
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
const flowNetCode = `// ===== 流网络 Flow Network =====
// 有向图 G = (V, E)：每条边 (u, v) 有一个非负容量 c(u, v)
// 两个特殊节点：源点 s（只出不进）、汇点 t（只进不出）
interface FlowEdge {
  from: string
  to: string
  capacity: number   // 容量 c(u,v)：该边最多能输送多少
  flow: number       // 当前流量 f(u,v)：已经输送了多少
}

// 用邻接表存网络
class FlowNetwork {
  adj = new Map<string, FlowEdge[]>()
  addEdge(from: string, to: string, capacity: number) {
    const e: FlowEdge = { from, to, capacity, flow: 0 }
    if (!this.adj.has(from)) this.adj.set(from, [])
    this.adj.get(from)!.push(e)
  }
  outEdges(u: string): FlowEdge[] {
    return this.adj.get(u) ?? []
  }
}

// 例：S → A 容量 3，S → B 容量 3，A → C 容量 2，C → T 容量 4
const net = new FlowNetwork()
net.addEdge('S', 'A', 3)
net.addEdge('S', 'B', 3)
net.addEdge('A', 'C', 2)
net.addEdge('B', 'C', 2)
net.addEdge('C', 'T', 4)`

const residualCode = `// ===== 残余网络 Residual Network =====
// 对每条边 (u→v, 容量 c, 流量 f)：
//   ① 正向残余：还能再送 c - f
//   ② 反向残余：能「退回去」f（这就是反向边，容量 = 当前流量 f）
// 残余网络 = 所有正向残余边 + 所有反向边 组成的图

interface ResEdge {
  from: string
  to: string
  residual: number     // 残余容量
  isReverse: boolean   // 是否反向边
}

// 由原边生成对应的两条残余边
function residualEdges(e: { from: string; to: string; capacity: number; flow: number }): ResEdge[] {
  const out: ResEdge[] = []
  if (e.capacity - e.flow > 0) {
    out.push({ from: e.from, to: e.to, residual: e.capacity - e.flow, isReverse: false })
  }
  if (e.flow > 0) {
    out.push({ from: e.to, to: e.from, residual: e.flow, isReverse: true })  // 反向边
  }
  return out
}

// 例：边 S→A 容量 3 已流 2
// → 正向残余 S→A = 1；反向残余 A→S = 2（可退回 2 单位 = 后悔药）
const edges = residualEdges({ from: 'S', to: 'A', capacity: 3, flow: 2 })
// edges = [ {S→A, residual 1}, {A→S, residual 2, 反向} ]`

const fordFulkersonCode = `// ===== Ford-Fulkerson：DFS 找增广路 =====
// 反复：在残余网络中找一条 s→t 路径（增广路），
//       把路径上最小残余容量 δ 加进去，直到找不到为止。
// 注意：DFS 找路是「随便找一条」，路径选择影响效率（最坏可能很慢）。

function fordFulkerson(
  n: number,
  s: number,
  t: number,
  cap: number[][]          // cap[u][v] = u→v 的容量（含反向边槽位）
): number {
  const flow = Array.from({ length: n }, () => new Array<number>(n).fill(0))
  let total = 0

  const dfs = (u: number, pushed: number, visited: boolean[]): number => {
    if (u === t) return pushed
    visited[u] = true
    for (let v = 0; v < n; v++) {
      if (visited[v]) continue
      const residual = cap[u][v] - flow[u][v]   // 正向 + 反向边统一用这个公式
      if (residual <= 0) continue
      const d = dfs(v, Math.min(pushed, residual), visited)
      if (d > 0) {
        flow[u][v] += d
        flow[v][u] -= d       // 反向边扣流量（等于加反向流量）
        return d
      }
    }
    return 0
  }

  while (true) {
    const d = dfs(s, Infinity, new Array(n).fill(false))
    if (d === 0) break
    total += d
  }
  return total
}`

const edmondsKarpCode = `// ===== Edmonds-Karp：BFS 找「最短」增广路 =====
// 与 Ford-Fulkerson 唯一区别：每次用 BFS 找边数最少的增广路。
// 这保证了 O(V·E²) 的多项式上界，不会像纯 DFS 那样退化。

function edmondsKarp(
  n: number,
  s: number,
  t: number,
  cap: number[][]
): { maxFlow: number; flows: number[][] } {
  const flow = Array.from({ length: n }, () => new Array<number>(n).fill(0))

  const bfs = (): { parent: number[]; delta: number } | null => {
    const parent = new Array<number>(n).fill(-1)
    const delta = new Array<number>(n).fill(0)
    const q: number[] = [s]
    parent[s] = s
    delta[s] = Infinity
    while (q.length) {
      const u = q.shift()!
      if (u === t) break
      for (let v = 0; v < n; v++) {
        const residual = cap[u][v] - flow[u][v]
        if (residual > 0 && parent[v] === -1) {
          parent[v] = u
          delta[v] = Math.min(delta[u], residual)
          q.push(v)
        }
      }
    }
    return parent[t] === -1 ? null : { parent, delta: delta[t] }
  }

  let maxFlow = 0
  while (true) {
    const found = bfs()
    if (!found) break
    const { parent, delta } = found
    maxFlow += delta
    let v = t
    while (v !== s) {
      const u = parent[v]
      flow[u][v] += delta
      flow[v][u] -= delta
      v = u
    }
  }
  return { maxFlow, flows: flow }
}`

const dinicCode = `// ===== Dinic：分层图 + 阻塞流 =====
// 阶段：
//   ① BFS 建分层图（level[]，DFS 只走 level 恰好 +1 的边）
//   ② DFS 一口气送出当前分层图上的「阻塞流」（多路增广 + 当前弧优化）
//   ③ 重复 ①②，直到 t 不可达
// 复杂度 O(V²·E)

function dinic(n: number, s: number, t: number, cap: number[][]): number {
  const flow = Array.from({ length: n }, () => new Array<number>(n).fill(0))
  const level = new Array<number>(n).fill(-1)
  const it = new Array<number>(n).fill(0)

  const bfsLevel = (): boolean => {
    level.fill(-1)
    const q: number[] = [s]
    level[s] = 0
    while (q.length) {
      const u = q.shift()!
      for (let v = 0; v < n; v++) {
        if (level[v] === -1 && cap[u][v] - flow[u][v] > 0) {
          level[v] = level[u] + 1
          q.push(v)
        }
      }
    }
    return level[t] !== -1
  }

  const dfs = (u: number, pushed: number): number => {
    if (u === t) return pushed
    for (; it[u] < n; it[u]++) {          // 当前弧优化：跳过已榨干的边
      const v = it[u]
      const residual = cap[u][v] - flow[u][v]
      if (residual <= 0 || level[v] !== level[u] + 1) continue
      const d = dfs(v, Math.min(pushed, residual))
      if (d > 0) {
        flow[u][v] += d
        flow[v][u] -= d
        return d
      }
    }
    return 0
  }

  let maxFlow = 0
  while (bfsLevel()) {
    it.fill(0)
    while (true) {
      const d = dfs(s, Infinity)
      if (d === 0) break
      maxFlow += d
    }
  }
  return maxFlow
}`
</script>

<style scoped></style>
