<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🚀 SPFA：队列优化的 Bellman-Ford</h1>
          <p class="text-sm text-slate-500 mt-1">只松弛「可能变化」的节点，期望 O(kE)</p>
        </div>
        <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-3-4</span>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">📐</span>
          结构总览：脏队列 + 按需松弛
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Bellman-Ford 每轮<strong>无差别地松弛所有边</strong>，但很多边早就收敛、纯属白做。
          SPFA 只把<strong>「dist 被更新的节点」</strong>放进队列（脏队列），出队时只松弛它的出边——
          边 <code>u→v</code> 只有在 <code>dist[u]</code> 变小时才可能再次成功，这就是 SPFA 的全部优化。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="sp-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="sp-arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
              </marker>
            </defs>
            <!-- 左侧：脏队列 -->
            <text x="170" y="26" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">核心：只把 dist 被更新的节点入队</text>
            <circle cx="90" cy="95" r="22" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
            <text x="90" y="95" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">u</text>
            <circle cx="250" cy="95" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="250" y="95" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">v</text>
            <line x1="114" y1="95" x2="226" y2="95" stroke="#4ade80" stroke-width="3" marker-end="url(#sp-arr2)" />
            <text x="170" y="80" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#16a34a">w = -6</text>
            <text x="170" y="140" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">松弛成功：dist[v] = dist[u] + w</text>
            <!-- 队列条 -->
            <rect x="60" y="172" width="240" height="52" rx="10" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" />
            <text x="76" y="198" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">队列</text>
            <circle cx="130" cy="198" r="17" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="130" y="198" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">S</text>
            <circle cx="185" cy="198" r="17" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="185" y="198" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="240" cy="198" r="17" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="240" y="198" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <text x="170" y="244" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">脏队列：谁的距离变了，谁进队（用入队标记去重）</text>
            <!-- 右侧：伪代码 -->
            <text x="540" y="30" text-anchor="middle" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">SPFA = 按需松弛的 Bellman-Ford</text>
            <rect x="400" y="48" width="280" height="118" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
            <text x="420" y="74" font-size="12" font-family="monospace" fill="#1e293b">while 队列非空:</text>
            <text x="420" y="96" font-size="12" font-family="monospace" fill="#1e293b">  u = 出队()   // 清除入队标记</text>
            <text x="420" y="118" font-size="12" font-family="monospace" fill="#1e293b">  for 边 (u→v, w):</text>
            <text x="420" y="140" font-size="12" font-family="monospace" fill="#0891b2">    if dist[u]+w &lt; dist[v]:</text>
            <text x="420" y="158" font-size="12" font-family="monospace" fill="#16a34a">      更新 dist[v]；v 入队</text>
            <text x="540" y="192" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">期望 O(kE)，最坏退化为 O(VE)</text>
            <text x="540" y="214" text-anchor="middle" font-size="11" font-family="monospace" fill="#0891b2">负环检测：同一节点入队 ≥ V 次</text>
            <text x="540" y="236" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">与 BF 相同：能处理负权边</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：SPFA 的思想——「脏队列」只装 dist 被更新的节点，按需松弛</figcaption>
        </figure>

        <!-- 操作示意图：弹出 + 松弛 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：弹出 A → 松弛 A 的出边 → 被更新的 B、D 入队</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">第 1 步：弹出 A（变橙），准备松弛它的出边</p>
            <svg viewBox="0 0 320 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="sp-b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <circle cx="110" cy="100" r="22" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" />
              <text x="110" y="100" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <text x="110" y="128" text-anchor="middle" font-size="11" font-family="monospace" fill="#0891b2">dist=0</text>
              <circle cx="270" cy="55" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="270" y="55" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#64748b">B</text>
              <circle cx="270" cy="150" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="270" y="150" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#64748b">D</text>
              <line x1="132" y1="92" x2="248" y2="60" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#sp-b)" />
              <text x="196" y="62" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">4</text>
              <line x1="132" y1="108" x2="248" y2="142" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#sp-b)" />
              <text x="196" y="142" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">2</text>
              <rect x="90" y="168" width="140" height="26" rx="13" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" />
              <text x="160" y="181" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">队列: [A]</text>
              <text x="160" y="25" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">弹出 A：dist[A] = 0 已知</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">第 2 步：松弛 A→B、A→D → B、D 入队（dist 被更新）</p>
            <svg viewBox="0 0 320 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="sp-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
                </marker>
              </defs>
              <circle cx="110" cy="100" r="22" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5" />
              <text x="110" y="100" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <text x="110" y="128" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">dist=0</text>
              <circle cx="270" cy="55" r="20" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
              <text x="270" y="55" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <text x="270" y="82" text-anchor="middle" font-size="11" font-family="monospace" fill="#2563eb">dist=4</text>
              <circle cx="270" cy="150" r="20" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
              <text x="270" y="150" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
              <text x="270" y="177" text-anchor="middle" font-size="11" font-family="monospace" fill="#2563eb">dist=2</text>
              <line x1="132" y1="92" x2="248" y2="60" stroke="#4ade80" stroke-width="3" marker-end="url(#sp-a)" />
              <text x="196" y="62" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">4 ✓</text>
              <line x1="132" y1="108" x2="248" y2="142" stroke="#4ade80" stroke-width="3" marker-end="url(#sp-a)" />
              <text x="196" y="142" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">2 ✓</text>
              <rect x="90" y="168" width="140" height="26" rx="13" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5" />
              <text x="160" y="181" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">队列: [B, D]</text>
              <text x="160" y="25" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">B、D 入队，等待被弹出</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">只有被更新过的节点才进队——这就是 SPFA 相对 BF 的全部优化</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 为什么 BF 有冗余 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">1</span>
          为什么 Bellman-Ford 有冗余？
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          Bellman-Ford 每轮<strong>把所有边全部松弛一遍</strong>，共 V-1 轮。但仔细想：一条边 <code>u→v</code> 什么时候需要再次松弛？
          ——只有 <code>dist[u]</code> 变小的时候。如果 <code>dist[u]</code> 没变，<code>dist[u] + w</code> 必然没变，松弛必然失败。
        </p>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>举个反例（链式图 S→A→B→C）：</strong>
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>第 1 轮：松弛 S→A、A→B、B→C，dist 全部确定（距离就是边权和）</li>
          <li>第 2 轮：所有边再松弛一遍——但 dist 一个都没变，白做</li>
          <li>第 3..V-1 轮：继续白做……一共浪费了 V-2 轮</li>
          <li>结论：大多数情况下，真正「有意义的松弛」集中在少数几条边、少数几轮里</li>
        </ol>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          BF 的冗余就像<strong>每次数据变化都重渲染整棵组件树</strong>——明明只有几个组件的状态变了。
          React 的解决办法是只重渲染 state 变化的组件；Vue 的响应式系统只在依赖变化时触发更新。
          SPFA 就是这个思想在图算法上的翻版：<strong>只处理「dist 变了」的节点（脏节点）</strong>，而不是无差别扫描全部边。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① 误以为「BF 每轮都必须跑满 V-1 轮才正确」——V-1 是<strong>上界</strong>，链式图第 1 轮就收敛了<br/>
          ② 误以为 BF 每轮所有边「一定都会成功松弛」——大部分边大部分时候都是失败松弛，纯浪费<br/>
          ③ 误以为 SPFA 改进了 BF 的<strong>正确性</strong>——没有，它只改进了<strong>速度</strong>，判定条件一模一样
          </p>
        </aside>
      </section>

      <!-- 2. SPFA 队列思想 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">2</span>
          SPFA 的队列思想：脏标记 + 按需松弛
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          SPFA（Shortest Path Faster Algorithm，队列优化的 BF）用一个<strong>队列</strong>管理「待处理节点」：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>起点 s 入队，dist[s] = 0</li>
          <li>弹出队首 u，松弛 u 的<strong>所有出边</strong> u→v</li>
          <li>若 <code>dist[u] + w &lt; dist[v]</code> 成立：更新 dist[v]，若 v 不在队列则<strong>入队</strong>（inQueue 标记去重）</li>
          <li>重复 2-3 直到队列为空——此时所有 dist 都收敛了</li>
        </ol>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          注意两点：<strong>①</strong> 一个节点可以多次入队（每次 dist 又被更新就重新入队）；
          <strong>②</strong> 用 <code>inQueue[]</code> 布尔数组保证同一时刻队列里没有重复节点，避免无意义的重复处理。
        </p>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><br/>
          SPFA 是 BFS 的「表兄弟」：同样用队列，但 BFS 每个节点最多入队一次、按层扩展；
          SPFA 的节点可能<strong>多次入队</strong>（每次距离被改善就再来一次），所以它不是严格按层推进的。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>忘记 inQueue 标记</strong>——同一时刻队列里出现大量重复节点，直接退化成暴力<br/>
          ② <strong>出队时不清除 inQueue[u]</strong>——节点永远「在队」，之后再也无法重新入队，结果错误<br/>
          ③ 用「只松弛一次」的思维理解 SPFA——它允许反复松弛，这正是它处理负权边的底气
          </p>
        </aside>
      </section>

      <!-- 3. 实现与入队标记 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">3</span>
          SPFA 标准实现与入队标记
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          模板极短：<strong>队列 + inQueue 数组 + dist 数组</strong>，核心就是「松弛成功才入队」。
        </p>
        <div class="mb-4"><Code language="ts" :code="spfaCode" title="spfa.ts" /></div>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>SPFA vs Bellman-Ford 一句话对比：</strong></p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">算法</th><th class="px-4 py-2 border border-slate-200 font-semibold">每轮做什么</th><th class="px-4 py-2 border border-slate-200 font-semibold">轮数</th><th class="px-4 py-2 border border-slate-200 font-semibold">时间</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">Bellman-Ford</td><td class="px-4 py-2 border">无差别松弛<strong>全部</strong> E 条边</td><td class="px-4 py-2 border font-mono">V-1 轮（固定）</td><td class="px-4 py-2 border font-mono">O(VE)</td></tr>
              <tr><td class="px-4 py-2 border">SPFA</td><td class="px-4 py-2 border">只松弛<strong>出队节点</strong>的出边</td><td class="px-4 py-2 border font-mono">直到队列空（按需）</td><td class="px-4 py-2 border font-mono text-emerald-600">期望 O(kE)，k 通常很小</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          inQueue 标记就像 React 的 <code>batched updates</code> / Vue 的<strong>异步更新队列</strong>：
          同一个组件在同一个 tick 里改了 10 次 state，只进一次更新队列，只在队列里出现一次。
          SPFA 的 <code>inQueue[]</code> 就是这张「待更新名单」，保证每个节点同一时刻最多出现一次，
          避免无意义的重复计算——<strong>去重是这类「脏队列」优化的灵魂</strong>。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① 用 <code>queue.shift()</code> 出队——数组头删是 O(n)，图大时会拖慢整体；工程上建议<strong>手写循环数组/队列</strong><br/>
          ② 把「松弛次数」和「入队次数」混为一谈——负环检测数的是<strong>入队次数</strong>，不是松弛次数<br/>
          ③ 起点入队时忘了初始化 <code>inQueue[s] = true</code>——起点会被重复入队
          </p>
        </aside>
      </section>

      <!-- 4. 负环检测 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">4</span>
          负环检测：入队次数 ≥ V
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          SPFA 检测负环和 Bellman-Ford 同理：<strong>一条最短路径最多经过 V-1 条边</strong>。
          如果某个节点 <code>v</code> 的 dist 被改善了 V 次以上，说明它被一条「无限变短的路径」反复命中——必然存在负环。
          实现上用一个 <code>cnt[]</code> 数组统计<strong>入队次数</strong>。
        </p>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>为什么是「入队次数」而不是「松弛次数」：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>每次入队 = 该节点的 dist 被更新了一次（松弛成功且不在队中）</li>
          <li>若 v 入队 ≥ V 次，说明 dist[v] 被更新 ≥ V 次</li>
          <li>而最短路径最多 V-1 条边，dist 最多只能被「正经地」更新 V-1 次</li>
          <li>第 V 次更新只能来自负环——立即返回「存在负环」</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="spfaNegCode" title="spfa_neg_cycle.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          负环像一段<strong>永远触发不完的 useEffect 依赖链</strong>：A 更新 → B 更新 → A 又更新 → B 又更新……
          每次「绕一圈」状态都变得更差，程序永远无法收敛。前端调试这种循环更新时，
          给「每个组件被更新的次数」加个计数上限（类似 React 的 update depth limit），
          超过阈值立刻报警——和 SPFA 的 <code>cnt[v] &gt;= V</code> 是同一个套路。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① 检测到负环后还继续跑 while——队列永远清不空，<strong>死循环</strong>，必须立刻 return<br/>
          ② 只数了「入队次数」但忘了在松弛成功时才计数——把失败的松弛也算进去会误报负环<br/>
          ③ 阈值写错：是 <code>cnt[v] &gt;= V</code>（节点总数），不是 V-1 也不是 E
          </p>
        </aside>
      </section>

      <!-- 5. 退化风险与 Dijkstra 对比 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">5</span>
          SPFA 的退化风险：最坏 O(VE)
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          SPFA 的期望复杂度是 <strong>O(kE)</strong>（k 是平均入队次数，通常很小），但<strong>最坏情况是 O(VE)</strong>——
          精心构造的图（比如网格图、菊花图、负数链）可以让每个节点反复入队，退化到和 Bellman-Ford 一样慢，
          甚至被「卡常」卡死。所以：<strong>无负权时首选 Dijkstra，SPFA 只在有负权边时使用</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="spfaVsDijkstraCode" title="spfa_vs_dijkstra.ts" /></div>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>三种算法对比：</strong></p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">算法</th><th class="px-4 py-2 border border-slate-200 font-semibold">时间</th><th class="px-4 py-2 border border-slate-200 font-semibold">负权边</th><th class="px-4 py-2 border border-slate-200 font-semibold">工程推荐度</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">Dijkstra（堆）</td><td class="px-4 py-2 border font-mono">O((V+E)logV)</td><td class="px-4 py-2 border text-red-600">✗</td><td class="px-4 py-2 border text-emerald-600">无负权 → 首选</td></tr>
              <tr><td class="px-4 py-2 border">SPFA</td><td class="px-4 py-2 border font-mono">期望 O(kE)，最坏 O(VE)</td><td class="px-4 py-2 border text-emerald-600">✓</td><td class="px-4 py-2 border">有负权且图随机时可用</td></tr>
              <tr><td class="px-4 py-2 border">Bellman-Ford</td><td class="px-4 py-2 border font-mono">O(VE) 稳定</td><td class="px-4 py-2 border text-emerald-600">✓</td><td class="px-4 py-2 border">教学/小图/要确定性</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① 竞赛/工程里「无负权图却用 SPFA」——会被刻意构造的数据卡到 O(VE)，直接 TLE。<strong>无负权 = Dijkstra</strong><br/>
          ② 以为 SPFA「一定比 Bellman-Ford 快」——最坏一样慢，SPFA 只是<strong>期望</strong>更快<br/>
          ③ 负权图里图省事用 Dijkstra——负权边会让 Dijkstra 的「已确定节点」作废，答案错误
          </p>
        </aside>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong><br/>
          「<strong>无负权用 Dijkstra，有负权用 SPFA，要确定性用 Bellman-Ford，全源用 Floyd</strong>」——
          这四句把单源/全源、正权/负权、快慢/稳定全串起来了，面试直接背这个决策树。
          </p>
        </aside>
      </section>

      <!-- 6. 复杂度与适用场景 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">6</span>
          复杂度分析与适用场景
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">指标</th><th class="px-4 py-2 border border-slate-200 font-semibold">值</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">时间（期望）</td><td class="px-4 py-2 border font-mono text-emerald-600">O(kE)</td><td class="px-4 py-2 border">k = 平均入队次数，随机图通常 &lt; 5</td></tr>
              <tr><td class="px-4 py-2 border">时间（最坏）</td><td class="px-4 py-2 border font-mono text-red-600">O(VE)</td><td class="px-4 py-2 border">网格/菊花等构造图会退化</td></tr>
              <tr><td class="px-4 py-2 border">空间</td><td class="px-4 py-2 border font-mono">O(V + E)</td><td class="px-4 py-2 border">dist + cnt + inQueue + 队列</td></tr>
              <tr><td class="px-4 py-2 border">适用</td><td class="px-4 py-2 border">有负权边、无负环的图</td><td class="px-4 py-2 border">比 BF 快，比 Dijkstra 通用</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><br/>
          SPFA 是「<strong>用队列换轮数</strong>」的典型：BF 固定 V-1 轮全量松弛，SPFA 把松弛「摊」到队列里按需做。
          很多单源负权问题用 SPFA 就够了；但记住它的最坏复杂度，别在无负权的大图上用它。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">🎬</span>
          动画演示：队列松弛 + 负环检测
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          下方是含<strong>负权边 D→C: -6</strong> 的有向图。<strong>「SPFA 松弛」</strong>从 A 出发：
          弹出节点变橙 → 松弛它的出边（成功时边变绿、dist 刷新）→ 被更新的节点入队（变蓝）。
          观察 C、E 的 dist 如何被负权边「二次改善」——这正是 SPFA 比 Dijkstra 强的场景。
          <strong>「检测负环」</strong>切换到负环三角图，演示 <code>入队次数 ≥ V</code> 触发报警。
        </p>

        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>

        <div class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 mb-3 font-mono text-xs text-slate-600 flex items-center gap-1">
          <span class="text-slate-400">队列:</span>
          <span v-if="!queueArr.length" class="text-slate-400">（空）</span>
          <template v-else>
            <span v-for="(id, qi) in queueArr" :key="qi" class="inline-block bg-cyan-100 text-cyan-800 border border-cyan-200 px-2 py-0.5 rounded-full">{{ id }}</span>
          </template>
        </div>

        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @click="runSpfa" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">▶ SPFA 松弛</button>
          <button @click="runNegDetect" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300">⚠ 检测负环</button>
          <button @click="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100">↺ 重置</button>
        </div>

        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-arrow v-for="e in gEdges" :key="e.from + e.to" :config="arrowCfg(e)" />
              <v-text v-for="e in gEdges" :key="'w' + e.from + e.to" :config="weightCfg(e)" />
              <v-circle v-for="n in gNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in gNodes" :key="'l' + n.id" :config="labelCfg(n)" />
              <v-text v-for="n in gNodes" :key="'d' + n.id" :config="distCfg(n)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 📋 小结 -->
      <section id="sec-summary" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>BF 的冗余</strong>：大部分边大部分时候松弛失败；只有 dist 变小的节点才值得再处理</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>SPFA 核心</strong>：脏队列只装 dist 被更新的节点，出队只松弛它的出边，松弛成功才入队</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>入队标记</strong>：inQueue 去重，同一时刻队列无重复节点；出队必须清除标记</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>负环检测</strong>：cnt[v] ≥ V（入队次数 ≥ 节点数）即存在负环，立刻返回</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度</strong>：期望 O(kE)、最坏 O(VE)；有负权边才用它，无负权用 Dijkstra</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>工程注意</strong>：queue.shift() 是 O(n)，大图用手写队列；别在无负权大图上用 SPFA 找 TLE</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-3-shortest-path/dsa-6-3-3-floyd" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Floyd-Warshall：全源最短路径DP</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-3-shortest-path/dsa-6-3-5-a-star" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：A*搜索与启发式函数 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// ================= 动画状态 =================
const C = { cyan: '#06b6d4', green: '#4ade80', red: '#ef4444', orange: '#f59e0b', blue: '#60a5fa', violet: '#a78bfa', muted: '#64748b', ghost: '#e2e8f0', text: '#1e293b' }
const H = ref(360), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

interface GNode { id: string; label: string; x: number; y: number; color: string; dist: number | null }
interface GEdge { from: string; to: string; w: number; color: string }
const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])
const queueArr = reactive<string[]>([])
const inQ = reactive<Record<string, boolean>>({})
const INF = 999

function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function colorOf(id: string, c: string) { const n = pos(id); if (n) n.color = c }
function edgeColor(from: string, to: string, c: string) { const e = gEdges.find(x => x.from === from && x.to === to); if (e) e.color = c }
function distVal(id: string): number { const n = pos(id); return n.dist == null ? INF : n.dist }
function setDist(id: string, v: number) { const n = pos(id); if (n) n.dist = v }

function loadMainGraph() {
  gNodes.splice(0); gEdges.splice(0); queueArr.splice(0)
  Object.keys(inQ).forEach(k => delete inQ[k])
  ;[{ id: 'A', label: 'A', x: 130, y: 100, color: C.cyan, dist: 0 }, { id: 'B', label: 'B', x: 400, y: 100, color: C.cyan, dist: null }, { id: 'C', label: 'C', x: 400, y: 260, color: C.cyan, dist: null }, { id: 'D', label: 'D', x: 130, y: 260, color: C.cyan, dist: null }, { id: 'E', label: 'E', x: 265, y: 312, color: C.cyan, dist: null }].forEach(n => gNodes.push({ ...n }))
  ;[{ from: 'A', to: 'B', w: 4, color: '#94a3b8' }, { from: 'A', to: 'D', w: 2, color: '#94a3b8' }, { from: 'B', to: 'C', w: 2, color: '#94a3b8' }, { from: 'B', to: 'D', w: 3, color: '#94a3b8' }, { from: 'D', to: 'C', w: -6, color: '#94a3b8' }, { from: 'C', to: 'E', w: 2, color: '#94a3b8' }, { from: 'D', to: 'E', w: 5, color: '#94a3b8' }].forEach(e => gEdges.push({ ...e }))
}

function loadNegGraph() {
  gNodes.splice(0); gEdges.splice(0); queueArr.splice(0)
  Object.keys(inQ).forEach(k => delete inQ[k])
  ;[{ id: 'A', label: 'A', x: 180, y: 110, color: C.cyan, dist: 0 }, { id: 'B', label: 'B', x: 430, y: 110, color: C.cyan, dist: null }, { id: 'C', label: 'C', x: 305, y: 290, color: C.cyan, dist: null }].forEach(n => gNodes.push({ ...n }))
  ;[{ from: 'A', to: 'B', w: 1, color: '#94a3b8' }, { from: 'B', to: 'C', w: -1, color: '#94a3b8' }, { from: 'C', to: 'A', w: -2, color: '#94a3b8' }].forEach(e => gEdges.push({ ...e }))
}

function arrowCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  const c = e.color
  return { points: [a.x, a.y, b.x, b.y], fill: c, stroke: c, strokeWidth: c === '#94a3b8' ? 2 : 3, pointerLength: 10, pointerWidth: 8 }
}
function weightCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 - 10, text: String(e.w), fontSize: 11, fontFamily: 'monospace', fill: C.muted, align: 'center' }
}
function circleCfg(n: GNode) {
  const stroke = n.color === C.cyan ? '#0891b2' : n.color === C.orange ? '#d97706' : n.color === C.green ? '#16a34a' : n.color === C.red ? '#b91c1c' : '#2563eb'
  const sw = n.color === C.cyan ? 1.5 : 3
  return { x: n.x, y: n.y, radius: 22, fill: n.color, stroke, strokeWidth: sw, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function labelCfg(n: GNode) {
  return { x: n.x - 22, y: n.y - 22, width: 44, height: 44, text: n.label, fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: '#fff', align: 'center', verticalAlign: 'middle' }
}
function distCfg(n: GNode) {
  return { x: n.x - 22, y: n.y + 22, width: 44, height: 16, text: n.dist == null ? '∞' : String(n.dist), fontSize: 11, fontFamily: 'monospace', fill: C.text, align: 'center', verticalAlign: 'middle' }
}

async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch (_) { /* ignore */ }
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

async function runSpfa() {
  await act('SPFA 松弛中…', 'SPFA 期望 O(kE)', async () => {
    loadMainGraph()
    queueArr.push('A'); inQ['A'] = true
    colorOf('A', C.blue)
    status.value = '起点 A 入队，dist[A] = 0'
    await d(600)
    let guard = 0
    while (queueArr.length > 0 && guard++ < 40) {
      const u = queueArr.shift()!
      delete inQ[u]
      colorOf(u, C.orange)
      status.value = '弹出 ' + u + '（dist[' + u + '] = ' + distVal(u) + '），松弛它的出边'
      await d(500)
      for (const e of gEdges.filter(x => x.from === u)) {
        const v = e.to
        const nd = distVal(u) + e.w
        if (nd < distVal(v)) {
          const old = distVal(v)
          setDist(v, nd)
          edgeColor(u, v, C.green)
          colorOf(v, C.blue)
          status.value = '松弛 ' + u + '→' + v + '（' + (e.w >= 0 ? '+' : '') + e.w + '）：dist[' + v + '] ' + (old >= INF ? '∞' : old) + ' → ' + nd
          await d(620)
          if (!inQ[v]) {
            queueArr.push(v); inQ[v] = true
            status.value = v + ' 入队（dist 被更新，可能影响它的后继）'
            await d(450)
          } else {
            status.value = v + ' 已在队列中 → 不重复入队（脏队列去重）'
            await d(450)
          }
          edgeColor(u, v, '#94a3b8')
        }
      }
      colorOf(u, C.cyan)
      await d(200)
    }
    status.value = '队列空 → SPFA 结束！dist: ' + gNodes.map(n => n.id + '=' + (n.dist == null ? '∞' : n.dist)).join('  ')
    await d(1500)
  })
}

async function runNegDetect() {
  await act('负环检测中…', '检测负环', async () => {
    loadNegGraph()
    queueArr.push('A'); inQ['A'] = true
    const cnt = reactive<Record<string, number>>({ A: 0, B: 0, C: 0 })
    colorOf('A', C.blue)
    status.value = '负环三角图：A→B(1), B→C(-1), C→A(-2)，从 A 出发检测'
    await d(800)
    let found = false
    let guard = 0
    while (queueArr.length > 0 && !found && guard++ < 40) {
      const u = queueArr.shift()!
      delete inQ[u]
      colorOf(u, C.orange)
      status.value = '弹出 ' + u
      await d(380)
      for (const e of gEdges.filter(x => x.from === u)) {
        const v = e.to
        const nd = distVal(u) + e.w
        if (nd < distVal(v)) {
          const old = distVal(v)
          setDist(v, nd)
          edgeColor(u, v, C.green)
          status.value = '松弛 ' + u + '→' + v + '：dist[' + v + '] ' + (old >= INF ? '∞' : old) + ' → ' + nd
          await d(450)
          if (!inQ[v]) {
            queueArr.push(v); inQ[v] = true
            cnt[v] = (cnt[v] ?? 0) + 1
            status.value = v + ' 入队（第 ' + cnt[v] + ' 次）'
            colorOf(v, cnt[v] >= 3 ? C.red : C.blue)
            await d(420)
            if (cnt[v] >= 3) {
              found = true
              status.value = '⚠ ' + v + ' 入队次数 = ' + cnt[v] + ' ≥ 节点数 3 → 存在负环！'
              await d(1700)
              break
            }
          } else {
            status.value = v + ' 已在队列中'
            await d(300)
          }
          edgeColor(u, v, '#94a3b8')
        }
      }
      if (found) break
      colorOf(u, C.cyan)
      await d(180)
    }
    if (!found) { status.value = '未检测到负环 ✓'; await d(1000) }
  })
}

function doReset() { loadMainGraph() }

let ro: ResizeObserver | null = null
onMounted(() => { loadMainGraph(); if (box.value) { W.value = box.value.clientWidth; ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w }); ro.observe(box.value) } })
onUnmounted(() => ro?.disconnect())

// ================= 目录 =================
const navList = [
  { id: 'sec-overview', name: '📐 结构总览' },
  { id: 'sec-1', name: '为什么 BF 有冗余' },
  { id: 'sec-2', name: 'SPFA 队列思想' },
  { id: 'sec-3', name: '实现与入队标记' },
  { id: 'sec-4', name: '负环检测' },
  { id: 'sec-5', name: '退化风险与对比' },
  { id: 'sec-6', name: '复杂度与适用场景' },
  { id: 'sec-viz', name: '🎬 动画演示' },
  { id: 'sec-summary', name: '📋 小结' },
]

// ================= 代码示例 =================
const spfaCode = `// ===== SPFA 标准实现（邻接表）=====
// graph[u] = [ [v, w], ... ]  表示边 u→v 权重 w
function spfa(graph: [number, number][][], start: number): number[] {
    const n = graph.length
    const dist = new Array(n).fill(Infinity)
    dist[start] = 0

    const queue: number[] = [start]
    const inQueue = new Array(n).fill(false)   // 入队标记：防止重复入队
    inQueue[start] = true

    while (queue.length > 0) {
        const u = queue.shift()!               // 出队
        inQueue[u] = false                     // 出队即清除标记（可能再次入队）

        for (const [v, w] of graph[u]) {
            if (dist[u] + w < dist[v]) {       // 松弛成功 → v 的距离变了
                dist[v] = dist[u] + w
                if (!inQueue[v]) {             // 只把"可能影响别人"的节点入队
                    queue.push(v)
                    inQueue[v] = true
                }
            }
        }
    }
    return dist
}

// 与 Bellman-Ford 的区别：
// BF：每轮无差别松弛所有边，共 V-1 轮 → O(VE)
// SPFA：只有 dist 变化的节点才重新松弛它的出边 → 期望 O(kE)
// 相同点：都能处理负权边；负环检测规则一样（入队次数 ≥ V）`

const spfaNegCode = `// ===== SPFA 负环检测（cnt 数组）=====
// 原理：最短路径最多经过 V-1 条边。若某节点入队 ≥ V 次，
// 说明它被反复"变短"，一定是掉进了负环
function spfaNegativeCycle(graph: [number, number][][], start: number): number[] | null {
    const n = graph.length
    const dist = new Array(n).fill(Infinity)
    const cnt = new Array(n).fill(0)           // 每个节点的入队次数
    const inQueue = new Array(n).fill(false)
    dist[start] = 0

    const queue: number[] = [start]
    inQueue[start] = true

    while (queue.length > 0) {
        const u = queue.shift()!
        inQueue[u] = false

        for (const [v, w] of graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w
                if (!inQueue[v]) {
                    queue.push(v)
                    inQueue[v] = true
                    cnt[v]++                    // 入队一次记一次
                    if (cnt[v] >= n) return null // 入队 ≥ V 次 → 有负环
                }
            }
        }
    }
    return dist   // 正常收敛 → 返回最短距离数组
}

// 手动模拟负环三角 A→B(1), B→C(-1), C→A(-2)，起点 A：
//  弹出 A → B 入队(cnt[B]=1) → 弹出 B → C 入队(cnt[C]=1)
//  → 弹出 C → A 入队(cnt[A]=1) → 弹出 A → B 入队(cnt[B]=2)
//  → 弹出 B → C 入队(cnt[C]=2) → 弹出 C → A 入队(cnt[A]=2)
//  → 弹出 A → B 入队(cnt[B]=3) ≥ 3 → 返回 null（负环！）`

const spfaVsDijkstraCode = `// ===== SPFA vs Dijkstra：无负权时该用谁？=====
// 答案：Dijkstra（二叉堆版）。SPFA 只在有负权边时使用。

function dijkstra(graph: [number, number][][], start: number): number[] {
    const n = graph.length
    const dist = new Array(n).fill(Infinity)
    dist[start] = 0
    const pq: [number, number][] = [[0, start]]   // [距离, 节点]

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0])            // 简易堆：每次取最小
        const [du, u] = pq.shift()!
        if (du > dist[u]) continue                // 过期条目，跳过

        for (const [v, w] of graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w
                pq.push([dist[v], v])             // 允许重复入堆，用过期判断兜底
            }
        }
    }
    return dist
}

// ===== 对比结论 =====
//               时间              负权边   适用场景
// Dijkstra      O((V+E)logV)      不支持   无负权 → 首选
// SPFA          期望 O(kE)         支持     负权图；最坏 O(VE) 会退化
// Bellman-Ford  O(VE)             支持     小图/教学/要稳定复杂度
//
// 工程经验：无负权一律 Dijkstra；只有负权才用 SPFA/BF。
// SPFA 的最坏情况（网格图/菊花图等构造数据）能让它退化到 O(VE)。`
</script>

<style scoped></style>
