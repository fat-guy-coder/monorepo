<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌉 桥与割点：Tarjan 求无向图连通性</h1>
          <p class="text-sm text-slate-500 mt-1">找出「一旦断了就散架」的关键边与关键点</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-6-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：桥是边，割点是点，断了都「散架」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          在<strong>无向连通图</strong>中：<strong>桥（割边）</strong>是删除后连通块数量 +1 的边；
          <strong>割点（关节点）</strong>是删除它<strong>及其所有关联边</strong>后连通块数量 +1 的顶点。
          下图三角形 A-B-C 通过链 C-D-E 连接：红色边 C—D、D—E 是<strong>桥</strong>，红色虚线环内的 C、D 是<strong>割点</strong>。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="16" y="22" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">连通无向图 G —— 红边 = 桥（割边）；红色虚线环 = 割点（关节点）</text>

            <!-- 普通边 -->
            <line x1="120" y1="70" x2="60" y2="190" stroke="#94a3b8" stroke-width="2" />
            <line x1="120" y1="70" x2="190" y2="190" stroke="#94a3b8" stroke-width="2" />
            <line x1="60" y1="190" x2="190" y2="190" stroke="#94a3b8" stroke-width="2" />
            <!-- 桥（红色加粗） -->
            <line x1="190" y1="190" x2="430" y2="110" stroke="#ef4444" stroke-width="3.5" />
            <line x1="430" y1="110" x2="570" y2="110" stroke="#ef4444" stroke-width="3.5" />
            <text x="300" y="150" text-anchor="middle" font-size="11" font-family="monospace" fill="#ef4444" font-weight="bold">桥 C—D</text>
            <text x="505" y="128" text-anchor="middle" font-size="11" font-family="monospace" fill="#ef4444" font-weight="bold">桥 D—E</text>

            <!-- 割点虚线环 -->
            <circle cx="190" cy="190" r="30" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="6 4" />
            <circle cx="430" cy="110" r="30" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="6 4" />

            <!-- 节点 -->
            <circle cx="120" cy="70" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="120" y="70" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="60" cy="190" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="60" y="190" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="190" cy="190" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="190" y="190" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <circle cx="430" cy="110" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="430" y="110" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
            <circle cx="570" cy="110" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="570" y="110" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">E</text>

            <text x="16" y="248" font-size="11" font-family="monospace" fill="#64748b">删掉桥 C—D → 图裂成 {A,B,C} 与 {D,E}；删掉割点 C → 图裂成 {A,B} 与 {D,E}</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：桥与割点 —— 都是「连通性单点故障」，Tarjan 一次 DFS 全找出来</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作 before/after：删桥 vs 删割点</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">删桥前 → 删桥后（连通块 1 → 2）</p>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <!-- before -->
              <line x1="40" y1="45" x2="15" y2="110" stroke="#94a3b8" stroke-width="2" />
              <line x1="15" y1="110" x2="70" y2="110" stroke="#94a3b8" stroke-width="2" />
              <line x1="70" y1="110" x2="40" y2="45" stroke="#94a3b8" stroke-width="2" />
              <line x1="70" y1="110" x2="140" y2="70" stroke="#ef4444" stroke-width="3" />
              <circle cx="40" cy="45" r="17" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="40" y="45" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <circle cx="15" cy="110" r="17" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="15" y="110" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <circle cx="70" cy="110" r="17" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="70" y="110" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
              <circle cx="140" cy="70" r="17" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="140" y="70" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
              <text x="78" y="30" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">before</text>
              <!-- after -->
              <line x1="215" y1="45" x2="190" y2="110" stroke="#94a3b8" stroke-width="2" />
              <line x1="190" y1="110" x2="245" y2="110" stroke="#94a3b8" stroke-width="2" />
              <line x1="245" y1="110" x2="215" y2="45" stroke="#94a3b8" stroke-width="2" />
              <circle cx="215" cy="45" r="17" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="215" y="45" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <circle cx="190" cy="110" r="17" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="190" y="110" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <circle cx="245" cy="110" r="17" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="245" y="110" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
              <circle cx="315" cy="70" r="17" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="315" y="70" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">D</text>
              <text x="255" y="30" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">after</text>
              <text x="330" y="140" text-anchor="end" font-size="10" font-family="monospace" fill="#64748b">分裂为 {A,B,C} | {D}</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">桥：唯一通道，删掉即断联（连通块数 +1）</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">删割点前 → 删割点后（连带它的所有边）</p>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <!-- before -->
              <line x1="65" y1="75" x2="20" y2="35" stroke="#94a3b8" stroke-width="2" />
              <line x1="65" y1="75" x2="20" y2="118" stroke="#94a3b8" stroke-width="2" />
              <line x1="65" y1="75" x2="120" y2="75" stroke="#94a3b8" stroke-width="2" />
              <circle cx="65" cy="75" r="17" fill="#ef4444" stroke="#b91c1c" stroke-width="2.5" />
              <text x="65" y="75" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
              <circle cx="20" cy="35" r="17" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="20" y="35" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <circle cx="20" cy="118" r="17" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="20" y="118" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <circle cx="120" cy="75" r="17" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="120" y="75" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
              <text x="68" y="30" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">before</text>
              <!-- after -->
              <circle cx="205" cy="75" r="17" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="205" y="75" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">C</text>
              <text x="205" y="100" text-anchor="middle" font-size="9" font-family="monospace" fill="#ef4444">已删除</text>
              <circle cx="185" cy="35" r="17" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="185" y="35" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <circle cx="185" cy="118" r="17" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="185" y="118" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <circle cx="290" cy="75" r="17" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="290" y="75" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
              <text x="238" y="30" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">after</text>
              <text x="330" y="140" text-anchor="end" font-size="10" font-family="monospace" fill="#64748b">分裂为 {A} {B} {D}</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">割点：删它 + 删它的边，全网断成几片</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 定义 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          桥（割边）与割点（关节点）的定义
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          设删除操作使无向图的<strong>连通分量数量增加</strong>，则：
          <strong>桥</strong> = 删除<strong>这条边</strong>后连通块数 +1 的边；
          <strong>割点</strong> = 删除<strong>这个顶点及其全部关联边</strong>后连通块数 +1 的顶点。
          叶子节点删掉后剩下的图仍连通，所以叶子不是割点；只有「必经之路」才算。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>连通图里每条边都是桥当且仅当该边<strong>不在任何环上</strong>（环上有备用路线）</li>
          <li>割点可能属于多条桥的端点，但<strong>不是</strong>所有桥的端点都是割点（删端点可能只断一条分支）</li>
          <li>无向图的 DFS 生成树只有<strong>树边</strong>和<strong>回边</strong>两种边（没有横叉边）——这是 Tarjan 能线性求解的关键</li>
          <li>暴力法：枚举每条边/每个点，删除后 DFS 数连通块 → O(E·(V+E))，太慢；Tarjan 一次 DFS 搞定</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          桥 ≈ <strong>唯一连接两个园区的独木桥</strong>：桥一断，两个园区彻底失联；<br/>
          割点 ≈ <strong>停机就全网断联的关键路由节点</strong>：某台核心交换机挂了，整个内网按区域分崩离析。<br/>
          在微服务架构里，<strong>单点依赖的中间件</strong>（唯一的消息队列、唯一的鉴权服务）就是系统的「桥/割点」——高可用设计（主备、多副本）本质上就是在给这些「必经之路」加回边。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：割点不是「删除边」，叶子也不是割点</strong><br/>
          割点要删除<strong>顶点及其所有关联边</strong>。很多人只删点不删边，或以为叶子节点是割点——删掉叶子后剩余部分依然连通，连通块数没变，所以叶子<strong>不是</strong>割点。<br/>
          同理，桥必须「删掉后连通块数 +1」：如果图本身就不连通，孤立块之间的边不算「桥」。</p>
        </aside>
      </section>

      <!-- 2. dfn/low 思想 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          dfn / low：Tarjan 的「最早出口」思想
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          在 DFS 生成树上定义两个值：
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">dfn[u]</code>（u 被访问的次序）与
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">low[u]</code>
          （u 的子树里，经<strong>一条回边</strong>能到达的最小 dfn）。
          若 v 的子树没有任何回边能越过边 u—v，这条边就是桥；若连 u 自己都越不过，u 就是割点。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>进入 u：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">dfn[u] = low[u] = ++timer</code></li>
          <li>遍历邻居 v：跳过<strong>父边</strong>（无向图必须，否则把父边当回边）</li>
          <li>v 未访问 → 树边，递归；返回后 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">low[u] = min(low[u], low[v])</code></li>
          <li>v 已访问（非父）→ 回边，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">low[u] = min(low[u], dfn[v])</code></li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <code class="bg-slate-100 text-purple-800 px-1.5 py-0.5 rounded text-xs font-mono">dfn</code> ≈ <strong>进入大楼的打卡顺序</strong>；<code class="bg-slate-100 text-purple-800 px-1.5 py-0.5 rounded text-xs font-mono">low</code> ≈ <strong>「最早能坐电梯/走地下通道到达的楼层」</strong>。<br/>
          一个区域的 low 值越接近自己的 dfn，说明它越是「死胡同」——没有第二条逃生通道。回边就是那部隐藏电梯，树边是走廊。</p>
        </aside>
      </section>

      <!-- 3. 求桥 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          求桥：low[v] &gt; dfn[u] —— 严格大于
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          对<strong>树边</strong> u—v：若 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">low[v] &gt; dfn[u]</code>，
          说明 v 的子树<strong>没有回边</strong>连到 u 或 u 的祖先，删掉 u—v 后 v 侧彻底孤立 → <strong>桥</strong>。
          注意是<strong>严格大于</strong>：等号（low[v] === dfn[u]）表示有回边至少连回 u 自己，边 u—v 还在环上，不是桥。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>跑 DFS，维护 dfn/low（父边跳过）</li>
          <li>对每条树边 u—v，子树 v 处理完回填 low[v]</li>
          <li>判断 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">low[v] &gt; dfn[u]</code> → 加入桥集合</li>
          <li>所有边判断完，得到全部桥；复杂度 O(V+E)</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="findBridgesCode" title="find_bridges.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          桥 = <strong>没有第二条路/没有备份线路</strong>的链路。low[v] 就是「v 侧能找到的最早备用出口」——出口比 u 还早，说明 v 侧自成体系，主链路 u—v 断不得。<br/>
          和 CDN/容灾里的「单一运营商专线」一样：一旦那条专线挂了，整个区域掉线。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：无向图忘了跳过父边（v === parent）</strong><br/>
          不跳过父边时，父边会被当成回边，把 low 全部拉成 1，导致<strong>任何边都判不成桥</strong>（或结果全错）。<br/>
          必须 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">if (v === parent) continue</code>。但注意：<strong>有平行边（重边）</strong>时不能只按顶点跳过，否则另一条平行边被误当回边，把桥判没——见第 5 节完整模板（按边的编号跳过）。</p>
        </aside>
      </section>

      <!-- 4. 求割点 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          求割点：low[v] &gt;= dfn[u] —— 且根节点特判
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          对<strong>非根</strong>节点 u：存在一个<strong>子节点</strong> v 满足 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">low[v] &gt;= dfn[u]</code>，则 u 是割点。
          为什么放宽到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">&gt;=</code>：等号表示 v 侧最多只能连回 u 自己，删掉 u 后 v 侧与 u 上方彻底断开。<br/>
          <strong>根节点特判</strong>：根没有「上方」，只要根在 DFS 生成树里有 <strong>&gt;= 2 个子树</strong>，删掉根后这些子树互相断开 → 根是割点（1 个子树则不是）。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>跑 DFS，维护 dfn/low 与每个节点的<strong>子树个数 children</strong></li>
          <li>非根 u：任一子 v 满足 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">low[v] &gt;= dfn[u]</code> → u 是割点</li>
          <li>根 r：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">children[r] &gt;= 2</code> → r 是割点</li>
          <li>复杂度 O(V+E)，一次 DFS 同时可求出桥与割点</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="findCutVerticesCode" title="find_cut_vertices.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          割点 ≈ <strong>关键路由节点</strong>：核心路由器/负载均衡器挂掉，集群按区域分裂。<br/>
          也像 <strong>单点登录的认证中心</strong>：所有服务都依赖它；它一停，所有子系统「各自为政」——所以要做高可用（主备切换），给这个「割点」加冗余。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 1：割点条件写成 low[v] &gt; dfn[u]（那是桥的）</strong><br/>
          割点必须用 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">&gt;=</code>。
          等号情形（low[v] === dfn[u]）意味着 v 侧通过回边最多连回 u——删掉 u，v 侧照样断开，u 是割点。用严格大于会漏掉这类割点。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 2：根节点漏特判</strong><br/>
          根 r 即使有子 v 满足 low[v] &gt;= dfn[r] 也不能据此判割点（r 没有上方节点），必须单独数子树个数。
          反之，根只有 1 个子树时<strong>不是</strong>割点——删掉根只是让树少一个点，不会分裂。<br/>
          另外，割点判断只看<strong>子节点</strong>，回边邻居不参与该判断。</p>
        </aside>
      </section>

      <!-- 5. 复杂度与完整模板 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          复杂度 O(V+E) 与重边安全模板
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-2">⏱️ 复杂度对比</p>
            <ul class="text-xs text-slate-600 space-y-1 font-mono">
              <li>暴力：删边/删点 + DFS → O(E·(V+E))</li>
              <li>Tarjan：一次 DFS → O(V+E)</li>
              <li>空间：dfn + low + 邻接表 → O(V+E)</li>
              <li>桥与割点可一趟同时求出</li>
            </ul>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-2">💡 使用要点</p>
            <ul class="text-xs text-slate-600 space-y-1">
              <li>▸ 无重边时按「父顶点」跳过即可</li>
              <li>▸ 有重边时按「边编号」跳过（见下方模板）</li>
              <li>▸ 图可能不连通：外层对每个未访问点起 DFS</li>
              <li>▸ 递归深度大时改用显式栈迭代版</li>
            </ul>
          </div>
        </div>
        <div class="mb-4"><Code language="ts" :code="tarjanFullCode" title="tarjan_bridges_cuts.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>桥与割点判断口诀——<strong>桥：low[v] &gt; dfn[u]（严格大于）；割点：low[v] &gt;= dfn[u]（非根，等号也算）；根看子树个数。</strong> 记忆技巧：桥是「边」，要求更苛刻（v 侧必须完全独立）；割点是「点」，要求宽松一格。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：平行边把桥「判没」</strong><br/>
          u—v 之间有两条平行边时，其中任意一条都不是桥（删一条还有另一条）。若按「父顶点」跳过，DFS 会把第二条平行边当成回边，导致 low 被拉低、真正的桥漏判。<br/>
          解法：给每条边编号，递归时传 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">parentEdge</code>，只跳过「来路那一条边」。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：Tarjan 找桥 / 找割点
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          固定连通无向图：三角形 A-B-C + 链 C-D-E。蓝边 = DFS 生成树边，橙闪 = 回边；
          节点下方标注 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">dfn:low</code>。
          「找桥」把桥边变红加粗，「找割点」把割点变红。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔗 边数: {{ edgeCount }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="runFindBridges" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">🌉 找桥</button>
          <button @mousedown="runFindCuts" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">🔺 找割点</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in gEdges" :key="'e'+e.from+e.to" :config="edgeCfg(e)" />
              <v-circle v-for="n in gNodes" :key="'c'+n.id" :config="circleCfg(n)" />
              <v-text v-for="n in gNodes" :key="'t'+n.id" :config="labelCfg(n)" />
              <v-text v-for="n in gNodes" :key="'m'+n.id" :config="metaCfg(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>桥</strong> = 删除后连通块数 +1 的<strong>边</strong>；<strong>割点</strong> = 删除（连同其边）后连通块数 +1 的<strong>顶点</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>dfn/low</strong>：dfn 是访问次序，low 是子树经回边能到的最早 dfn；无向图只有树边与回边</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>桥</strong>：树边 u—v 满足 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">low[v] &gt; dfn[u]</code>（严格大于）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>割点</strong>：非根 u 存在子 v 使 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">low[v] &gt;= dfn[u]</code>；<strong>根节点</strong>看子树个数 &gt;= 2</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>重边</strong>：按边编号跳过父边，否则平行边会误当回边把桥判没</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度</strong>：一次 DFS O(V+E)，远优于暴力的 O(E(V+E))</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-6-connectivity/dsa-6-6-1-scc" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：强连通分量(SCC)：Tarjan/Kosaraju算法</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-6-connectivity/dsa-6-6-3-euler" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：欧拉路径与欧拉回路：Hierholzer算法 →</RouterLink>
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
  { id: "sec-1", name: "桥与割点的定义" },
  { id: "sec-2", name: "dfn/low：Tarjan 思想" },
  { id: "sec-3", name: "求桥：low[v] > dfn[u]" },
  { id: "sec-4", name: "求割点：low[v] >= dfn[u]" },
  { id: "sec-5", name: "复杂度与常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 桥与割点动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(360), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

interface GNode { id: string; label: string; x: number; y: number; color: string }
interface GEdge { from: string; to: string; color: string }
const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])
const meta = reactive<Record<string, string>>({ A:'', B:'', C:'', D:'', E:'' })

const NODES = ['A', 'B', 'C', 'D', 'E']
const POS: Record<string, { x: number; y: number }> = {
  A: { x: 120, y: 70 }, B: { x: 60, y: 190 }, C: { x: 190, y: 190 },
  D: { x: 430, y: 110 }, E: { x: 570, y: 110 },
}
// 无向边，按字典序规范化存储
const EDGES: [string, string][] = [['A','B'], ['A','C'], ['B','C'], ['C','D'], ['D','E']]

const edgeCount = computed(() => gEdges.length)

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)
  NODES.forEach(id => gNodes.push({ id, label: id, x: POS[id].x, y: POS[id].y, color: C.cyan }))
  EDGES.forEach(([a, b]) => gEdges.push({ from: a, to: b, color: '#94a3b8' }))
  for (const id of NODES) meta[id] = ''
}
function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function colorOf(id: string, c: string) { const n = pos(id); if (n) n.color = c }
function allCyan() { gNodes.forEach(n => n.color = C.cyan) }
function edgeOf(a: string, b: string): GEdge | undefined {
  return gEdges.find(e => (e.from === a && e.to === b) || (e.from === b && e.to === a))
}
function colorEdge(a: string, b: string, c: string) { const e = edgeOf(a, b); if (e) e.color = c }
function neighOf(id: string): string[] {
  const out: string[] = []
  for (const e of gEdges) {
    if (e.from === id) out.push(e.to)
    else if (e.to === id) out.push(e.from)
  }
  return out
}
function resetAll() {
  allCyan()
  gEdges.forEach(e => e.color = '#94a3b8')
  for (const id of NODES) meta[id] = ''
  status.value = ''; opLabel.value = ''
}
function edgeCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  const hot = e.color !== '#94a3b8'
  return { points: [a.x, a.y, b.x, b.y], stroke: e.color, strokeWidth: hot ? 3.5 : 2, lineCap: 'round' as const }
}
function circleCfg(n: GNode) {
  let stroke = '#0891b2', sw = 1.5
  if (n.color === C.orange) { stroke = '#d97706'; sw = 3 }
  else if (n.color === C.green) { stroke = '#16a34a'; sw = 3 }
  else if (n.color === C.red) { stroke = '#b91c1c'; sw = 3 }
  return { x: n.x, y: n.y, radius: 22, fill: n.color, stroke, strokeWidth: sw, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function labelCfg(n: GNode) {
  return { x: n.x - 22, y: n.y - 22, width: 44, height: 44, text: n.label, fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: n.color === C.green ? C.text : '#fff', align: 'center', verticalAlign: 'middle' }
}
function metaCfg(n: GNode) {
  return { x: n.x - 30, y: n.y + 24, width: 60, height: 14, text: meta[n.id] || '', fontSize: 10, fontFamily: 'monospace', fill: C.muted, align: 'center', verticalAlign: 'middle' }
}
const finish = (u: string) => { const n = pos(u); if (n.color === C.cyan || n.color === C.orange) n.color = C.green }

async function runFindBridges() {
  if (busy.value) return
  busy.value = true; opLabel.value = 'Tarjan 求桥 O(V+E)'
  resetAll()
  const dfn: Record<string, number> = {}
  const low: Record<string, number> = {}
  const bridges: string[][] = []
  let timer = 0
  try {
    const sync = (u: string) => { meta[u] = dfn[u] + ':' + low[u] }
    const dfs = async (u: string, parent: string | null) => {
      dfn[u] = low[u] = ++timer
      sync(u)
      colorOf(u, C.orange)
      status.value = `访问 ${u}：dfn=${dfn[u]}，low=${low[u]}`
      await d(500)
      for (const v of neighOf(u)) {
        if (v === parent) continue
        if (dfn[v] === undefined) {
          colorEdge(u, v, C.blue)
          status.value = `树边 ${u}—${v}`
          await d(420)
          await dfs(v, u)
          low[u] = Math.min(low[u], low[v])
          sync(u)
          status.value = `回填 low[${u}] = min(low[${u}], low[${v}]) = ${low[u]}`
          await d(480)
          if (low[v] > dfn[u]) {
            colorEdge(u, v, C.red)
            colorOf(u, C.red); colorOf(v, C.red)
            bridges.push([u, v])
            status.value = `🔴 桥！low[${v}]=${low[v]} > dfn[${u}]=${dfn[u]} → 边 ${u}—${v}`
            await d(650)
          } else {
            status.value = `low[${v}]=${low[v]} <= dfn[${u}]=${dfn[u]} → 边 ${u}—${v} 不是桥`
            await d(450)
          }
        } else {
          colorEdge(u, v, C.orange)
          low[u] = Math.min(low[u], dfn[v])
          sync(u)
          status.value = `回边 ${u}—${v}：low[${u}] = min(low[${u}], dfn[${v}]=${dfn[v]}) = ${low[u]}`
          await d(480)
          colorEdge(u, v, '#94a3b8')
        }
      }
      finish(u)
    }
    for (const id of NODES) if (dfn[id] === undefined) await dfs(id, null)
    status.value = `✅ 找到 ${bridges.length} 条桥：` + (bridges.length ? bridges.map(b => b.join('—')).join('、') : '无')
  } finally {
    await d(400); busy.value = false; opLabel.value = ''
  }
}

async function runFindCuts() {
  if (busy.value) return
  busy.value = true; opLabel.value = 'Tarjan 求割点 O(V+E)'
  resetAll()
  const dfn: Record<string, number> = {}
  const low: Record<string, number> = {}
  const children: Record<string, number> = {}
  const isCut: Record<string, boolean> = {}
  const cuts: string[] = []
  let timer = 0
  try {
    const sync = (u: string) => { meta[u] = dfn[u] + ':' + low[u] }
    const dfs = async (u: string, parent: string | null) => {
      dfn[u] = low[u] = ++timer
      sync(u)
      children[u] = 0
      colorOf(u, C.orange)
      status.value = `访问 ${u}：dfn=${dfn[u]}，low=${low[u]}`
      await d(500)
      for (const v of neighOf(u)) {
        if (v === parent) continue
        if (dfn[v] === undefined) {
          children[u]++
          colorEdge(u, v, C.blue)
          status.value = `树边 ${u}—${v}（${u} 的子树 ${children[u]}）`
          await d(420)
          await dfs(v, u)
          low[u] = Math.min(low[u], low[v])
          sync(u)
          await d(480)
          if (parent !== null && low[v] >= dfn[u] && !isCut[u]) {
            isCut[u] = true
            cuts.push(u)
            colorOf(u, C.red)
            status.value = `🔴 割点！${u} 的子 ${v}：low[${v}]=${low[v]} >= dfn[${u}]=${dfn[u]}`
            await d(650)
          } else if (parent !== null) {
            status.value = `low[${v}]=${low[v]} < dfn[${u}]=${dfn[u]} → ${u} 暂不满足割点条件`
            await d(420)
          }
        } else {
          colorEdge(u, v, C.orange)
          low[u] = Math.min(low[u], dfn[v])
          sync(u)
          status.value = `回边 ${u}—${v}：low[${u}] = min(low[${u}], dfn[${v}]=${dfn[v]}) = ${low[u]}`
          await d(460)
          colorEdge(u, v, '#94a3b8')
        }
      }
      if (parent === null) {
        if (children[u] >= 2) {
          isCut[u] = true
          cuts.push(u)
          colorOf(u, C.red)
          status.value = `🔴 根节点 ${u} 有 ${children[u]} 个子树 → 是割点`
        } else {
          status.value = `根节点 ${u} 只有 ${children[u]} 个子树 → 不是割点`
          finish(u)
        }
        await d(600)
      } else if (!isCut[u]) {
        finish(u)
      }
    }
    for (const id of NODES) if (dfn[id] === undefined) await dfs(id, null)
    status.value = `✅ 找到 ${cuts.length} 个割点：` + (cuts.length ? cuts.join('、') : '无')
  } finally {
    await d(400); busy.value = false; opLabel.value = ''
  }
}

function doReset() {
  if (busy.value) return
  resetAll()
}

let ro: ResizeObserver | null = null
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
const findBridgesCode = `// ===== 求桥（割边）：low[v] > dfn[u] =====
// 对树边 u—v：若 v 的子树没有回边连到 u 或 u 的祖先，
// 即 low[v] > dfn[u]，则 u—v 是桥（删掉它图就分裂）
function findBridges(n: number, g: number[][]): [number, number][] {
    const dfn = new Array<number>(n).fill(0)
    const low = new Array<number>(n).fill(0)
    const bridges: [number, number][] = []
    let timer = 0

    const dfs = (u: number, parent: number) => {
        dfn[u] = low[u] = ++timer
        for (const v of g[u]) {
            if (v === parent) continue        // ⚠️ 无向图：跳过父边
            if (dfn[v] === 0) {               // 树边
                dfs(v, u)
                low[u] = Math.min(low[u], low[v])
                if (low[v] > dfn[u]) bridges.push([u, v])   // 🔴 桥！
            } else {
                low[u] = Math.min(low[u], dfn[v])   // 回边
            }
        }
    }
    for (let u = 0; u < n; u++) if (dfn[u] === 0) dfs(u, -1)   // 多起点
    return bridges
}
// 直观理解：桥 = 删除后连通块数量 +1 的边，即"不在任何环上的边"`

const findCutVerticesCode = `// ===== 求割点（关节点）：low[v] >= dfn[u] + 根节点特判 =====
function findCutVertices(n: number, g: number[][]): number[] {
    const dfn = new Array<number>(n).fill(0)
    const low = new Array<number>(n).fill(0)
    const isCut = new Array<boolean>(n).fill(false)
    let timer = 0

    const dfs = (u: number, parent: number) => {
        dfn[u] = low[u] = ++timer
        let children = 0                      // 根节点特判用
        for (const v of g[u]) {
            if (v === parent) continue
            if (dfn[v] === 0) {
                children++
                dfs(v, u)
                low[u] = Math.min(low[u], low[v])
                // 非根节点：存在子 v 回不到 u 以上 → u 是割点（⚠️ >= 不是 >）
                if (parent !== -1 && low[v] >= dfn[u]) isCut[u] = true
            } else {
                low[u] = Math.min(low[u], dfn[v])
            }
        }
        // 根节点：>= 2 个 DFS 子树才可能是割点
        if (parent === -1 && children >= 2) isCut[u] = true
    }
    for (let u = 0; u < n; u++) if (dfn[u] === 0) dfs(u, -1)
    return dfn.map((_, u) => u).filter(u => isCut[u])
}
// 为什么割点是 >= 而桥是 >：
// low[v] === dfn[u] 表示 v 侧最多只能连回 u 自己——删掉 u，v 侧照样断开`

const tarjanFullCode = `// ===== 完整模板：一次 DFS 同时求桥 + 割点（含重边处理）=====
// 重边问题：u—v 有两条平行边时，按"父顶点"跳过会把第二条误当回边，
// 把真正的桥判没。正确做法：按"边的编号"跳过，只跳过来路那一条边。
interface Edge2 { to: number; id: number }

function tarjanBiconnected(n: number, g: Edge2[][]) {
    const dfn = new Array<number>(n).fill(0)
    const low = new Array<number>(n).fill(0)
    const bridges: [number, number][] = []
    const isCut = new Array<boolean>(n).fill(false)
    let timer = 0

    const dfs = (u: number, parentEdge: number) => {
        dfn[u] = low[u] = ++timer
        let children = 0
        for (const e of g[u]) {
            if (e.id === parentEdge) continue    // 只跳过"来路"那条边
            if (dfn[e.to] === 0) {
                children++
                dfs(e.to, e.id)
                low[u] = Math.min(low[u], low[e.to])
                if (low[e.to] > dfn[u]) bridges.push([u, e.to])        // 桥
                if (parentEdge !== -1 && low[e.to] >= dfn[u]) isCut[u] = true  // 割点
            } else {
                low[u] = Math.min(low[u], dfn[e.to])
            }
        }
        if (parentEdge === -1 && children >= 2) isCut[u] = true         // 根特判
    }
    for (let u = 0; u < n; u++) if (dfn[u] === 0) dfs(u, -1)
    return {
        bridges,
        cutVertices: dfn.map((_, u) => u).filter(u => isCut[u]),
    }
}

// 口诀：
//   桥   : low[v] >  dfn[u]   （严格大于，等号说明有回边兜底）
//   割点 : low[v] >= dfn[u]   （非根；等号也算，u 自身断开两半）
//   根   : 子树个数 >= 2`
</script>
