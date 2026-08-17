<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🕸️ 图的表示：邻接表 / 邻接矩阵 / 边列表</h1>
          <p class="text-sm text-slate-500 mt-1">三种存储方式的取舍 —— 空间 vs 时间 vs 编码复杂度</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-1-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：同一张图，三种存储法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          图 <code>G = (V, E)</code> 由<strong>顶点集合 V</strong> 与<strong>边集合 E</strong> 组成。
          存储图的核心问题只有一个：<strong>如何组织「谁和谁相连」这份数据</strong>。
          邻接矩阵、邻接表、边列表是三种最经典的答案——它们回答同样的查询，却付出完全不同的空间与时间代价。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 240" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="16" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">同一张 5 节点无向图，用三种方式存储</text>

            <!-- 左：原图 -->
            <line x1="70" y1="75" x2="190" y2="75" stroke="#94a3b8" stroke-width="2" />
            <line x1="70" y1="75" x2="130" y2="150" stroke="#94a3b8" stroke-width="2" />
            <line x1="190" y1="75" x2="130" y2="150" stroke="#94a3b8" stroke-width="2" />
            <line x1="70" y1="75" x2="70" y2="215" stroke="#94a3b8" stroke-width="2" />
            <line x1="190" y1="75" x2="190" y2="215" stroke="#94a3b8" stroke-width="2" />
            <line x1="130" y1="150" x2="190" y2="215" stroke="#94a3b8" stroke-width="2" />
            <line x1="70" y1="215" x2="190" y2="215" stroke="#94a3b8" stroke-width="2" />
            <circle cx="70" cy="75" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="70" y="75" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="190" cy="75" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="190" y="75" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="130" cy="150" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="130" y="150" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <circle cx="70" cy="215" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="70" y="215" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
            <circle cx="190" cy="215" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="190" y="215" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">E</text>
            <line x1="248" y1="30" x2="248" y2="215" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="4 3" />
            <line x1="472" y1="30" x2="472" y2="215" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="4 3" />

            <!-- 中：邻接表 -->
            <text x="262" y="42" font-size="12" font-family="monospace" fill="#0891b2" font-weight="bold">邻接表（Map&lt;顶点, 邻居[]&gt;）</text>
            <text x="262" y="68" font-size="12" font-family="monospace" fill="#334155">A: [B, C]</text>
            <text x="262" y="92" font-size="12" font-family="monospace" fill="#334155">B: [A, C, D]</text>
            <text x="262" y="116" font-size="12" font-family="monospace" fill="#334155">C: [A, B, E]</text>
            <text x="262" y="140" font-size="12" font-family="monospace" fill="#334155">D: [B, E]</text>
            <text x="262" y="164" font-size="12" font-family="monospace" fill="#334155">E: [C, D]</text>
            <text x="262" y="200" font-size="10" font-family="monospace" fill="#64748b">只存真实存在的边 → 空间 O(V+E)</text>

            <!-- 右：邻接矩阵 -->
            <text x="486" y="42" font-size="12" font-family="monospace" fill="#0891b2" font-weight="bold">邻接矩阵（n × n 二维数组）</text>
            <text x="512" y="60" font-size="11" font-family="monospace" fill="#64748b">A</text>
            <text x="550" y="60" font-size="11" font-family="monospace" fill="#64748b">B</text>
            <text x="588" y="60" font-size="11" font-family="monospace" fill="#64748b">C</text>
            <text x="626" y="60" font-size="11" font-family="monospace" fill="#64748b">D</text>
            <text x="664" y="60" font-size="11" font-family="monospace" fill="#64748b">E</text>
            <text x="496" y="82" font-size="11" font-family="monospace" fill="#64748b">A</text>
            <text x="496" y="104" font-size="11" font-family="monospace" fill="#64748b">B</text>
            <text x="496" y="126" font-size="11" font-family="monospace" fill="#64748b">C</text>
            <text x="496" y="148" font-size="11" font-family="monospace" fill="#64748b">D</text>
            <text x="496" y="170" font-size="11" font-family="monospace" fill="#64748b">E</text>
            <text x="512" y="82" font-size="11" font-family="monospace" fill="#cbd5e1">0</text><text x="550" y="82" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">1</text><text x="588" y="82" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">1</text><text x="626" y="82" font-size="11" font-family="monospace" fill="#cbd5e1">0</text><text x="664" y="82" font-size="11" font-family="monospace" fill="#cbd5e1">0</text>
            <text x="512" y="104" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">1</text><text x="550" y="104" font-size="11" font-family="monospace" fill="#cbd5e1">0</text><text x="588" y="104" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">1</text><text x="626" y="104" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">1</text><text x="664" y="104" font-size="11" font-family="monospace" fill="#cbd5e1">0</text>
            <text x="512" y="126" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">1</text><text x="550" y="126" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">1</text><text x="588" y="126" font-size="11" font-family="monospace" fill="#cbd5e1">0</text><text x="626" y="126" font-size="11" font-family="monospace" fill="#cbd5e1">0</text><text x="664" y="126" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">1</text>
            <text x="512" y="148" font-size="11" font-family="monospace" fill="#cbd5e1">0</text><text x="550" y="148" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">1</text><text x="588" y="148" font-size="11" font-family="monospace" fill="#cbd5e1">0</text><text x="626" y="148" font-size="11" font-family="monospace" fill="#cbd5e1">0</text><text x="664" y="148" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">1</text>
            <text x="512" y="170" font-size="11" font-family="monospace" fill="#cbd5e1">0</text><text x="550" y="170" font-size="11" font-family="monospace" fill="#cbd5e1">0</text><text x="588" y="170" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">1</text><text x="626" y="170" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">1</text><text x="664" y="170" font-size="11" font-family="monospace" fill="#cbd5e1">0</text>
            <text x="486" y="200" font-size="10" font-family="monospace" fill="#64748b">对称矩阵：无向图 (i,j) 与 (j,i) 相同 → 空间 O(V²)</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：同一张 5 节点无向图（6 条边）的三种存储——邻接表只存存在的边，邻接矩阵固定开 n×n 个格子</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：建图 before/after —— 边列表 → 邻接表（无向图必须双向登记）</h3>
        <figure class="mb-2">
          <svg viewBox="0 0 720 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="r1-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">建图 before/after：边列表 → 邻接表</text>

            <text x="40" y="50" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">before：输入边列表</text>
            <text x="40" y="78" font-size="12" font-family="monospace" fill="#d97706" font-weight="bold">[A, B]  ← 正在处理</text>
            <text x="40" y="104" font-size="12" font-family="monospace" fill="#334155">[A, C]</text>
            <text x="40" y="130" font-size="12" font-family="monospace" fill="#334155">[B, C]</text>
            <text x="40" y="156" font-size="12" font-family="monospace" fill="#334155">[B, D]</text>

            <line x1="330" y1="100" x2="392" y2="100" stroke="#94a3b8" stroke-width="2" marker-end="url(#r1-arr)" />
            <text x="330" y="126" font-size="10" font-family="monospace" fill="#64748b">for (u, v)</text>
            <text x="330" y="142" font-size="10" font-family="monospace" fill="#64748b">双向登记</text>

            <text x="420" y="50" font-size="11" font-family="monospace" fill="#64748b" font-weight="bold">after：邻接表</text>
            <text x="420" y="78" font-size="12" font-family="monospace" fill="#16a34a">A: [B, C]</text>
            <text x="420" y="104" font-size="12" font-family="monospace" fill="#16a34a">B: [A, C, D]</text>
            <text x="420" y="130" font-size="12" font-family="monospace" fill="#334155">C: [A, B]</text>
            <text x="420" y="156" font-size="12" font-family="monospace" fill="#334155">D: [B]</text>

            <text x="40" y="196" font-size="11" font-family="monospace" fill="#64748b">每读一条边 (u, v)：adj[u].push(v) 且 adj[v].push(u) —— 一条边要登记两次（无向图！）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：建图操作——读边列表逐条插入邻接表；绿色行是被当前边 (A,B) 更新过的顶点</figcaption>
        </figure>
      </section>

      <!-- 1. 三种表示法 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          三种表示法：本质是「如何组织相邻关系」
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          无论哪种表示法，最终都要支撑两个基本查询：<strong>① u 和 v 相邻吗？② u 的所有邻居是谁？</strong>三种表示法给出了三种不同的组织方式：
        </p>
        <ol class="list-decimal list-inside space-y-2 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>邻接矩阵（Adjacency Matrix）</strong>：开一个 <code>n × n</code> 的二维数组，<code>graph[u][v] = 1</code> 表示 u→v 有边。查询「相邻吗」只需 O(1) 查一个格子。</li>
          <li><strong>邻接表（Adjacency List）</strong>：每个顶点挂一个列表，只存放真实存在的邻居。遍历邻居时只访问实际有边的部分。</li>
          <li><strong>边列表（Edge List）</strong>：把每条边平铺成一行 <code>[u, v]</code>（可带权 <code>[u, v, w]</code>），像一张流水账。</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          邻接矩阵 ≈ <strong>二维数组 / HTML 表格</strong>：像「用户 × 权限」的全量勾选表，查一个格子立刻知道有没有权限；<br/>
          邻接表 ≈ <strong>Map&lt;string, string[]&gt; / 对象 key → 数组</strong>：像路由配置 <code>{ '/home': ['Home', 'About'], ... }</code>，或权限映射 <code>{ admin: ['create', 'edit'], user: ['read'] }</code>；<br/>
          边列表 ≈ <strong>CSV 行记录 / 数据库表</strong>：像订单表里每一行「from, to」两个字段，适合批量导入与按行处理。
          </p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>无向图建邻接表时<strong>只登记了一个方向</strong>（只 push 了 <code>v</code> 进 <code>u</code> 的列表，忘了 push <code>u</code> 进 <code>v</code> 的列表），
          导致遍历时「只见一半邻居」，DFS/BFS 结果全错。</p>
        </aside>
      </section>

      <!-- 2. 复杂度对比 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          时空复杂度对比：一张表看清取舍
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          记 <code>V</code> 为顶点数、<code>E</code> 为边数。三种表示法的差异集中在<strong>空间</strong>与<strong>查询/遍历</strong>两个维度：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">指标</th><th class="px-4 py-2 border border-slate-200 font-semibold">邻接矩阵</th><th class="px-4 py-2 border border-slate-200 font-semibold">邻接表</th><th class="px-4 py-2 border border-slate-200 font-semibold">边列表</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">空间</td><td class="px-4 py-2 border font-mono text-red-500">O(V²)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(V + E)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(E)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">查 u,v 是否相邻</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono">O(degree(u))</td><td class="px-4 py-2 border font-mono text-red-500">O(E)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">遍历 u 的邻居</td><td class="px-4 py-2 border font-mono text-red-500">O(V) 扫整行</td><td class="px-4 py-2 border font-mono text-emerald-600">O(degree(u))</td><td class="px-4 py-2 border font-mono text-red-500">O(E) 扫全表</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">加一条边</td><td class="px-4 py-2 border font-mono">O(1)</td><td class="px-4 py-2 border font-mono">O(1)</td><td class="px-4 py-2 border font-mono">O(1)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">适用场景</td><td class="px-4 py-2 border">稠密图 / 频繁查相邻</td><td class="px-4 py-2 border">稀疏图 / DFS、BFS</td><td class="px-4 py-2 border">扫边算法（Kruskal / Bellman-Ford）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>稀疏图（E ≈ V）却用邻接矩阵——当 V = 10⁵ 时，矩阵要开 10¹⁰ 个格子（约 40 GB），直接内存爆炸；
          而邻接表只需要 O(V + E) ≈ 10⁵ 量级。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>邻接矩阵像<strong>全量状态表</strong>（如把每对组件的依赖都显式记下来），邻接表像<strong>按需索引</strong>（如 Vite 的依赖预构建只记录真实 import）。
          数据越稀疏，「按需索引」越省内存——这也是 React/Vue 依赖收集都倾向「按需」而不是「全量对查」的原因。</p>
        </aside>
      </section>

      <!-- 3. 三种建图代码 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          三种建图代码：从简到难
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          下面用同一张 5 节点无向图分别用三种方式建出来，并演示各自的「相邻查询 / 邻居遍历」写法：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>先定好顶点编号（0 ~ n-1，或 A ~ E 字符串）</li>
          <li>按选定结构初始化空容器（矩阵全 0 / Map 空数组 / 边数组）</li>
          <li>逐条边插入：无向图记住<strong>双向登记</strong></li>
          <li>之后按需做「相邻查询」或「遍历邻居」</li>
        </ol>

        <div class="mb-4"><Code language="ts" :code="matrixCode" title="adj_matrix.ts" /></div>
        <div class="mb-4"><Code language="ts" :code="listCode" title="adj_list.ts" /></div>
        <div class="mb-4"><Code language="ts" :code="edgeListCode" title="edge_list.ts" /></div>
        <div class="mb-4"><Code language="ts" :code="buildCode" title="edge_list_to_adj.ts" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>第 4 个例子是面试高频题「边列表 → 邻接表」：很多题目的输入是 <code>edges</code> 数组，
          而 DFS/BFS 需要邻接表——先用 O(E) 把边转成表，再跑算法。</p>
        </aside>
      </section>

      <!-- 4. 如何选择 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          何时选哪种？——四步决策
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">别背结论，按这四步自己推出来：</p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>数清规模</strong>：V 多大？E 多大？</li>
          <li><strong>判稠密度</strong>：E ≈ V² 是稠密，E ≈ V 是稀疏</li>
          <li><strong>列主要操作</strong>：频繁查相邻？频繁遍历邻居？还是要按边排序/扫全部边？</li>
          <li><strong>查表定案</strong>：看上面的复杂度对比表</li>
        </ol>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">情况</th><th class="px-4 py-2 border border-slate-200 font-semibold">推荐</th><th class="px-4 py-2 border border-slate-200 font-semibold">原因</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">稠密图（E~V²）、频繁查相邻</td><td class="px-4 py-2 border font-mono text-emerald-600">邻接矩阵</td><td class="px-4 py-2 border">查相邻 O(1)，空间浪费可接受</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">稀疏图、DFS/BFS/最短路</td><td class="px-4 py-2 border font-mono text-emerald-600">邻接表</td><td class="px-4 py-2 border">空间 O(V+E)，遍历邻居只碰真实边</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">要按权排序 / 扫全部边</td><td class="px-4 py-2 border font-mono text-emerald-600">边列表</td><td class="px-4 py-2 border">Kruskal、Bellman-Ford 天生按边处理</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>默认无脑用<strong>邻接表</strong>——它在绝大多数场景空间、时间都均衡；
          只有当「必须 O(1) 查相邻」或「图本身就稠密」时才考虑矩阵；需要边排序时再叠加一份边列表。</p>
        </aside>
      </section>

      <!-- 5. 常见错误 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          常见错误与陷阱
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>无向图只 push 一个方向</strong>——遍历时只见一半邻居，连通性判断全错。<br/>
          ② <strong>邻接矩阵忘记对称写</strong>——无向图必须同时写 <code>graph[u][v]</code> 和 <code>graph[v][u]</code>，否则查询不对称。<br/>
          ③ <strong>稀疏图硬开矩阵</strong>——V 到 10⁵ 量级矩阵就是 40 GB，属于「能跑通小样例、一上大数据就爆」的典型。<br/>
          ④ <strong>边列表当邻接表用</strong>——每次遍历邻居都 O(E) 扫全表，复杂度直接翻车；要么建表要么换结构。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆口诀：</strong>「<strong>矩阵查得快、表省空间、边列表喂排序</strong>」；
          无向图建图永远问自己一句：<strong>反向登记了吗？</strong></p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：存储视图切换 + 高亮邻居
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          5 节点无向图固定不变：<strong>点击节点</strong>或点「高亮邻居」可选中顶点并高亮它的邻接边；
          「邻接表视图 / 邻接矩阵视图」在画布下方切换展示对应的存储结构。观察：邻接表只存 6 条真实边，而矩阵要开 25 个格子。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="showAdjList" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">🔍 邻接表视图</button>
          <button @mousedown="showAdjMatrix" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">🔍 邻接矩阵视图</button>
          <button @mousedown="nextNeighbor" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm">🎯 高亮邻居</button>
          <button @mousedown="demoHighlight" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">▶️ 自动演示：逐个高亮</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in gEdges" :key="'e'+e.from+e.to" :config="edgeCfg(e)" />
              <v-circle v-for="n in gNodes" :key="n.id" :config="circleCfg(n)" @mousedown="onNodeClick(n.id)" />
              <v-text v-for="n in gNodes" :key="'t'+n.id" :config="labelCfg(n)" />
            </v-layer>
          </v-stage>
        </div>
        <!-- 存储结构展示 -->
        <div v-if="mode==='adjList'" class="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
          <p class="text-xs font-semibold text-slate-500 mb-2">邻接表 —— Map&lt;string, string[]&gt;（只存真实存在的边，空间 O(V+E)）</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            <div v-for="row in adjListRows" :key="row.id" class="text-xs font-mono px-2 py-1 rounded bg-white border border-slate-200"
                 :class="row.id===selId ? 'border-amber-300 bg-amber-50' : ''">
              <span class="font-bold text-cyan-700">{{ row.id }}</span><span class="text-slate-400">: [</span>{{ row.nbs.join(', ') }}<span class="text-slate-400">]</span>
            </div>
          </div>
        </div>
        <div v-if="mode==='adjMatrix'" class="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
          <p class="text-xs font-semibold text-slate-500 mb-2">邻接矩阵 —— number[n][n]（1 = 有边，0 = 无边，空间 O(V²)）</p>
          <table class="text-xs font-mono border-collapse">
            <thead>
              <tr>
                <th class="px-1.5 py-0.5 text-slate-400"></th>
                <th v-for="c in ids" :key="'h'+c" class="px-1.5 py-0.5 text-cyan-700 font-bold">{{ c }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in adjMatrixRows" :key="'r'+ids[i]">
                <th class="px-1.5 py-0.5 text-cyan-700 font-bold text-right">{{ ids[i] }}</th>
                <td v-for="(v, j) in row" :key="'c'+ids[j]" class="px-1.5 py-0.5 text-center"
                    :class="v === 1 ? 'text-cyan-700 font-bold' : 'text-slate-300'">{{ v }}</td>
              </tr>
            </tbody>
          </table>
          <p class="text-[11px] text-slate-400 mt-1">观察：对角线全 0（无自环），且矩阵关于对角线对称（无向图）</p>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>邻接矩阵：</strong>O(V²) 空间、O(1) 查相邻、O(V) 遍历邻居——稠密图 & 频繁查相邻首选</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>邻接表：</strong>O(V+E) 空间、遍历邻居只碰真实边——稀疏图 & DFS/BFS 默认选择</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>边列表：</strong>O(E) 空间最小，但查询/遍历都要扫全表——喂给 Kruskal、Bellman-Ford</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>无向图建图铁律：</strong>每一条边都要<strong>双向登记</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>决策四步：</strong>数规模 → 判稠密 → 列操作 → 查表定案</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>面试技巧：</strong>题目常给边列表作输入，先 O(E) 转邻接表再跑算法</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-5-heap/dsa-5-3-advanced-heap/dsa-5-3-3-pairing" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：配对堆：实用高效的可并堆</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-1-foundation/dsa-6-1-2-types" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：图分类：有向/无向/加权/二分/DAG →</RouterLink>
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
  { id: "sec-1", name: "三种表示法" },
  { id: "sec-2", name: "复杂度对比表" },
  { id: "sec-3", name: "三种建图代码" },
  { id: "sec-4", name: "如何选择" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 图动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

interface GNode { id: string; label: string; x: number; y: number; color: string }
interface GEdge { from: string; to: string; color: string }
const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])

const ids = ['A', 'B', 'C', 'D', 'E']
const EDGES: Array<[string, string]> = [['A','B'],['A','C'],['B','C'],['B','D'],['C','E'],['D','E']]
const POS: Record<string, [number, number]> = { A:[110,90], B:[290,90], C:[200,190], D:[110,290], E:[290,290] }

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)   // ⚠️ 清空 reactive 数组必须用 splice(0)，禁止 length = 0
  ids.forEach(id => gNodes.push({ id, label: id, x: POS[id][0], y: POS[id][1], color: C.cyan }))
  EDGES.forEach(([u, v]) => gEdges.push({ from: u, to: v, color: '#94a3b8' }))
}

const mode = ref<'graph' | 'adjList' | 'adjMatrix'>('graph')
const selId = ref<string | null>(null)
const cycleIdx = ref(0)

function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function colorOf(id: string, c: string) { const n = pos(id); if (n) n.color = c }
function allCyan() { gNodes.forEach(n => n.color = C.cyan) }

function neighborsOf(id: string): string[] {
  return gEdges.filter(e => e.from === id || e.to === id).map(e => e.from === id ? e.to : e.from)
}

function applySel() {
  allCyan()
  gEdges.forEach(e => e.color = '#94a3b8')
  if (selId.value) {
    colorOf(selId.value, C.orange)
    gEdges.forEach(e => { if (e.from === selId.value || e.to === selId.value) e.color = C.orange })
  }
}

function onNodeClick(id: string) {
  if (busy.value) return
  mode.value = 'graph'
  selId.value = id
  applySel()
  status.value = `${id} 的邻居: [${neighborsOf(id).join(', ')}]`
}

function showAdjList() {
  if (busy.value) return
  mode.value = 'adjList'
  selId.value = null
  applySel()
  status.value = '邻接表：每个顶点一个数组，只存真实存在的边'
}

function showAdjMatrix() {
  if (busy.value) return
  mode.value = 'adjMatrix'
  selId.value = null
  applySel()
  status.value = '邻接矩阵：n×n 二维数组，1 表示有边（无向图对称）'
}

function nextNeighbor() {
  if (busy.value) return
  mode.value = 'graph'
  selId.value = ids[cycleIdx.value % ids.length]
  cycleIdx.value++
  applySel()
  status.value = `高亮 ${selId.value} 的邻接边: [${neighborsOf(selId.value).join(', ')}]`
}

async function demoHighlight() {
  act('自动演示：逐个高亮邻居', '遍历邻接边', async () => {
    mode.value = 'graph'
    for (let i = 0; i < ids.length; i++) {
      selId.value = ids[i]
      applySel()
      status.value = `${ids[i]} 的邻居: [${neighborsOf(ids[i]).join(', ')}]`
      await d(800)
    }
    await d(300)
    doReset()
  })
}

function doReset() {
  mode.value = 'graph'
  selId.value = null
  cycleIdx.value = 0
  allCyan()
  gEdges.forEach(e => e.color = '#94a3b8')
  status.value = ''; opLabel.value = ''
}

async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

// 存储结构（computed 生成，画布下方展示）
const adjListRows = computed(() => ids.map(id => ({ id, nbs: neighborsOf(id) })))
const adjMatrixRows = computed(() => {
  const set = new Set(EDGES.map(([u, v]) => [u, v].sort().join('-')))
  return ids.map(u => ids.map(v => (u === v ? 0 : set.has([u, v].sort().join('-')) ? 1 : 0)))
})

function edgeCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  return { points:[a.x, a.y, b.x, b.y], stroke: e.color, strokeWidth: e.color === '#94a3b8' ? 2 : 3 }
}
function circleCfg(n: GNode) {
  const stroke = n.color === C.cyan ? '#0891b2' : n.color === C.orange ? '#d97706' : '#2563eb'
  const sw = n.color === C.cyan ? 1.5 : 3
  return { x:n.x, y:n.y, radius:22, fill:n.color, stroke, strokeWidth: sw, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
}
function labelCfg(n: GNode) {
  return { x:n.x-22, y:n.y-22, width:44, height:44, text:n.label, fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle' }
}

let ro: ResizeObserver|null = null
onMounted(() => {
  initGraph()
  if (box.value) { W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const matrixCode = `// ===== 邻接矩阵：n × n 二维数组，graph[u][v] 表示 u→v 是否有边 =====
const n = 5
// 初始全 0（无边）
const graph: number[][] = Array.from({ length: n }, () => Array(n).fill(0))

// 无向图加边：必须同时写 graph[u][v] 和 graph[v][u]（对称！）
function addEdge(u: number, v: number) {
    graph[u][v] = 1
    graph[v][u] = 1
}

// 查询 u、v 是否相邻：O(1) —— 矩阵最爽的地方
const isAdj = graph[1][2] === 1

// 遍历 u 的所有邻居：必须扫一整行，O(n)
const neighbors: number[] = []
for (let v = 0; v < n; v++) {
    if (graph[u][v] === 1) neighbors.push(v)
}

// 建 5 节点无向图：边 (0-1, 0-2, 1-2, 1-3, 2-4, 3-4)
;[ [0,1], [0,2], [1,2], [1,3], [2,4], [3,4] ].forEach(([u, v]) => addEdge(u, v))
// 输出: graph[1][2] === 1（1 和 2 相邻）`

const listCode = `// ===== 邻接表：Map<顶点, 邻居数组> —— 空间只与真实边数成正比 =====
const adj = new Map<string, string[]>()

function addVertex(id: string) {
    if (!adj.has(id)) adj.set(id, [])
}

// 无向图加边：两个方向都要登记！（漏一行就错）
function addEdge(u: string, v: string) {
    adj.get(u)!.push(v)
    adj.get(v)!.push(u)
}

// 初始化 5 个顶点 + 6 条边
;['A','B','C','D','E'].forEach(addVertex)
;[ ['A','B'], ['A','C'], ['B','C'], ['B','D'], ['C','E'], ['D','E'] ]
    .forEach(([u, v]) => addEdge(u, v))

// 遍历 A 的邻居：只访问真实存在的边，O(degree(A))
for (const nb of adj.get('A')!) {
    console.log(\`A -> \${nb}\`)
}
// 输出: A -> B
//       A -> C`

const edgeListCode = `// ===== 边列表：每条边一行 [u, v]（可带权 [u, v, w]）=====
type Edge = [number, number, number]   // [起点, 终点, 权值]
const edges: Edge[] = [
    [0, 1, 4], [0, 2, 2], [1, 2, 1],
    [1, 3, 5], [2, 4, 3], [3, 4, 6],
]

// 用途 1：Kruskal 最小生成树 —— 先按权排序，再贪心选边
edges.sort((a, b) => a[2] - b[2])

// 用途 2：Bellman-Ford 最短路 —— 把所有边扫 V-1 轮
function bellmanFord(start: number, V: number): number[] {
    const dist = Array(V).fill(Infinity)
    dist[start] = 0
    for (let i = 0; i < V - 1; i++) {
        for (const [u, v, w] of edges) {
            if (dist[u] + w < dist[v]) dist[v] = dist[u] + w
        }
    }
    return dist
}

// 特点：空间 O(E) 最小，但「查相邻 / 遍历邻居」都要扫全表 O(E)`

const buildCode = `// ===== 面试高频：边列表 → 邻接表（边列表是输入，邻接表是工作结构）=====
// 输入：n 个顶点（0..n-1）+ edges 数组
function buildAdj(n: number, edges: Array<[number, number]>): number[][] {
    const adj: number[][] = Array.from({ length: n }, () => [])
    for (const [u, v] of edges) {
        adj[u].push(v)
        adj[v].push(u)          // 无向图双向登记；有向图删掉这行
    }
    return adj
}

// 使用示例：用邻接表判断图是否连通（DFS）
const adj = buildAdj(5, [[0,1],[0,2],[1,2],[1,3],[2,4],[3,4]])
const seen = new Set<number>()
function dfs(u: number) {
    if (seen.has(u)) return
    seen.add(u)
    for (const v of adj[u]) dfs(v)
}
dfs(0)
console.log(seen.size === 5 ? '连通' : '不连通')
// 输出: 连通`
</script>
