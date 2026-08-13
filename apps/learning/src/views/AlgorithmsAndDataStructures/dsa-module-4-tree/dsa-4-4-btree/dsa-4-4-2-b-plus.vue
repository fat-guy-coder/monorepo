<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌳 B+ 树：数据库索引的首选结构</h1>
          <p class="text-sm text-slate-500 mt-1">数据全在叶子 + 链表串联 —— 范围查询的利器</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-4-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：B+ 树（叶子链表横向串联）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          B+ 树是 B 树的变体，核心差异只有一条：<strong>数据（value）只存在叶子节点</strong>，内部节点只存「索引 key」用于导航。
          所有叶子节点用一个<strong>横向链表（next 指针）</strong>按顺序串联——这使得「找出 [20, 70] 之间的所有记录」只要
          先定位到 20，再顺着链表一路读，直到越过 70，<strong>天然支持高效范围查询</strong>。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 760 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="bp-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="bp-next" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>
            <text x="16" y="22" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">内部节点只存索引 key，数据全在叶子；叶子用 next 指针串联成有序链表</text>

            <!-- 内部节点到叶子的边 -->
            <line x1="360" y1="66" x2="180" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#bp-arr)" />
            <line x1="360" y1="66" x2="540" y2="120" stroke="#94a3b8" stroke-width="2" marker-end="url(#bp-arr)" />
            <line x1="180" y1="150" x2="60" y2="204" stroke="#94a3b8" stroke-width="2" marker-end="url(#bp-arr)" />
            <line x1="180" y1="150" x2="180" y2="204" stroke="#94a3b8" stroke-width="2" marker-end="url(#bp-arr)" />
            <line x1="180" y1="150" x2="300" y2="204" stroke="#94a3b8" stroke-width="2" marker-end="url(#bp-arr)" />
            <line x1="540" y1="150" x2="420" y2="204" stroke="#94a3b8" stroke-width="2" marker-end="url(#bp-arr)" />
            <line x1="540" y1="150" x2="540" y2="204" stroke="#94a3b8" stroke-width="2" marker-end="url(#bp-arr)" />
            <line x1="540" y1="150" x2="660" y2="204" stroke="#94a3b8" stroke-width="2" marker-end="url(#bp-arr)" />

            <!-- 内部节点（浅色填充表示只存索引） -->
            <rect x="338" y="30" width="44" height="36" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="360" y="48" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#334155">50</text>
            <rect x="142" y="114" width="76" height="36" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="167" y="132" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#334155">20</text>
            <text x="193" y="132" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#334155">35</text>
            <rect x="518" y="114" width="44" height="36" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
            <text x="540" y="132" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#334155">70</text>

            <!-- 叶子链表 next 箭头（横向） -->
            <line x1="104" y1="222" x2="152" y2="222" stroke="#f59e0b" stroke-width="2" marker-end="url(#bp-next)" />
            <line x1="224" y1="222" x2="272" y2="222" stroke="#f59e0b" stroke-width="2" marker-end="url(#bp-next)" />
            <line x1="344" y1="222" x2="392" y2="222" stroke="#f59e0b" stroke-width="2" marker-end="url(#bp-next)" />
            <line x1="464" y1="222" x2="512" y2="222" stroke="#f59e0b" stroke-width="2" marker-end="url(#bp-next)" />
            <line x1="584" y1="222" x2="632" y2="222" stroke="#f59e0b" stroke-width="2" marker-end="url(#bp-next)" />

            <!-- 叶子节点（深色，存数据） -->
            <rect x="38" y="204" width="44" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="60" y="222" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">10</text>
            <rect x="152" y="204" width="72" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="173" y="222" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">15,19</text>
            <rect x="266" y="204" width="72" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="302" y="222" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">25,30</text>
            <rect x="386" y="204" width="72" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="422" y="222" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">40,45</text>
            <rect x="506" y="204" width="72" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="542" y="222" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">60,69</text>
            <rect x="626" y="204" width="72" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="662" y="222" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">80,90</text>

            <text x="16" y="278" font-size="11" font-family="monospace" fill="#f59e0b">—— 叶子 next 链表（升序）：定位起点后一路右扫即可完成范围查询</text>
            <text x="16" y="292" font-size="11" font-family="monospace" fill="#64748b">内部节点 key 只是「路标」，叶子节点里才有完整数据</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：B+ 树 —— 内部节点（浅色）只存索引，叶子（深色）存数据并用 next 链表串联成有序序列</figcaption>
        </figure>

        <!-- 操作示意图：范围查询 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：范围查询 range(20, 70) —— 定位起点 + 顺链表右扫</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">步骤 1：沿索引下探到起点 20 所在的叶子</p>
            <svg viewBox="0 0 240 130" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="bq-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
              </defs>
              <rect x="98" y="16" width="44" height="30" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
              <text x="120" y="31" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#334155">50</text>
              <line x1="120" y1="46" x2="80" y2="82" stroke="#f59e0b" stroke-width="2" marker-end="url(#bq-a)" />
              <line x1="120" y1="46" x2="160" y2="82" stroke="#94a3b8" stroke-width="2" />
              <rect x="58" y="82" width="44" height="30" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="80" y="97" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">20</text>
              <rect x="138" y="82" width="44" height="30" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
              <text x="160" y="97" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#334155">70</text>
              <text x="16" y="122" font-size="10" font-family="monospace" fill="#d97706">20 &lt; 50 → 走左孩子</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">步骤 2：沿叶子 next 链表一路右扫到 &gt; 70 为止</p>
            <svg viewBox="0 0 240 100" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="bq-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
              </defs>
              <line x1="74" y1="52" x2="102" y2="52" stroke="#f59e0b" stroke-width="2" marker-end="url(#bq-n)" />
              <line x1="138" y1="52" x2="166" y2="52" stroke="#f59e0b" stroke-width="2" marker-end="url(#bq-n)" />
              <line x1="202" y1="52" x2="230" y2="52" stroke="#f59e0b" stroke-width="2" marker-end="url(#bq-n)" />
              <rect x="16" y="36" width="44" height="32" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="38" y="52" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">20</text>
              <rect x="82" y="36" width="44" height="32" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="104" y="52" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">35</text>
              <rect x="148" y="36" width="44" height="32" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="170" y="52" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">50</text>
              <rect x="214" y="36" width="44" height="32" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="236" y="52" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">60</text>
              <text x="16" y="90" font-size="10" font-family="monospace" fill="#16a34a">命中 20,35,50,60，扫到 80 &gt; 70 停止</text>
            </svg>
          </figure>
        </div>
      </section>

      <!-- 1. 与 B 树对比 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          B+ 树 vs B 树：数据只放叶子
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          B+ 树保留了 B 树的「多路、绝对平衡、分裂合并」全部优点，只改了一个设计决策：
          <strong>内部节点不再存数据，只存索引 key</strong>，所有数据（key-value 记录）都下沉到叶子。
          这个改动带来连锁收益——内部节点更「瘦」，同样一页能塞更多索引，树更矮；叶子串成链表后，范围查询、全表扫描都变得顺理成章。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">对比项</th><th class="px-4 py-2 border border-slate-200 font-semibold">B 树</th><th class="px-4 py-2 border border-slate-200 font-semibold">B+ 树</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">数据存放</td><td class="px-4 py-2 border">所有节点都存数据</td><td class="px-4 py-2 border">只在叶子存数据</td></tr>
              <tr><td class="px-4 py-2 border">内部节点</td><td class="px-4 py-2 border">存 key + 数据</td><td class="px-4 py-2 border">只存索引 key（更瘦）</td></tr>
              <tr><td class="px-4 py-2 border">叶子链表</td><td class="px-4 py-2 border">无</td><td class="px-4 py-2 border font-mono text-emerald-600">next 指针串联</td></tr>
              <tr><td class="px-4 py-2 border">单点查询</td><td class="px-4 py-2 border">O(log n)，命中内部节点即返回</td><td class="px-4 py-2 border">O(log n)，必须走到叶子</td></tr>
              <tr><td class="px-4 py-2 border">范围查询</td><td class="px-4 py-2 border text-amber-600">中序遍历（需回溯）</td><td class="px-4 py-2 border text-emerald-600">定位起点 + 顺链表右扫</td></tr>
              <tr><td class="px-4 py-2 border">分支因子</td><td class="px-4 py-2 border">较小（节点含数据）</td><td class="px-4 py-2 border text-emerald-600">更大（节点只含索引）</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="nodeCode" title="bplus_node.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          B+ 树的内部节点就像<strong>目录（TOC）</strong>，叶子就像<strong>正文页</strong>——目录里只有章节标题（索引 key）和页码（指针），
          真正的内容在正文页（叶子）。查一个词：先翻目录定位到页，再翻到正文。<br/>
          叶子链表就像<strong>书籍的「连续页码」</strong>——要读第 3 章到第 5 章，从第 3 章首页开始一页页往后翻即可，不用每次回到目录。
          </p>
        </aside>
      </section>

      <!-- 2. 范围查询 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          范围查询 —— B+ 树的杀手锏
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          数据库最常见的查询不是「查一条」，而是 <code>WHERE id BETWEEN 100 AND 500</code> 这种<strong>范围查询</strong>。
          B+ 树做范围查询只需两步：<strong>① 沿索引下探到起点</strong>；<strong>② 沿叶子 next 链表一路右扫</strong>，直到越过终点。
          整个过程顺序访问磁盘，配合预读（sequential read）比随机 IO 快一个数量级。
        </p>
        <div class="mb-4"><Code language="ts" :code="rangeCode" title="range_query.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>范围查询的复杂度是 <code>O(log n + k)</code>——log n 是定位起点的下探成本，k 是命中的记录数。
          一旦起点定位好，扫叶子是<strong>纯顺序 IO</strong>，这比 B 树「中序遍历 + 反复回溯内部节点」快得多。这也是 MySQL 的 InnoDB 选择 B+ 树作为聚簇索引的根本原因。</p>
        </aside>
      </section>

      <!-- 3. 插入与分裂 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          插入：分裂时「叶子保留副本，索引上提」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          B+ 树的插入同样「先插叶子、满了分裂」，但有个关键区别：<strong>分裂时中间 key 既留在叶子，又上提为父节点的索引</strong>。
          叶子是数据容器，一个 key 都不能丢；内部节点只是路标，存它的副本。
        </p>
        <div class="mb-4"><Code language="ts" :code="insertCode" title="bplus_insert.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>B+ 树分裂时，很多人把中间 key <strong>从叶子删掉</strong>再上提——这错了！
          B 树是「中间 key 上提、离开原节点」，B+ 树是「中间 key 上提、<strong>同时保留</strong>在叶子」。
          内部节点的索引是<strong>副本</strong>，叶子的数据才是<strong>正本</strong>，二者不能混淆。</p>
        </aside>
      </section>

      <!-- 4. 聚簇索引 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          实战：InnoDB 的聚簇索引与二级索引
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          MySQL InnoDB 把表按 B+ 树组织：<strong>聚簇索引（主键索引）</strong>的叶子节点直接存<strong>整行数据</strong>；
          <strong>二级索引</strong>的叶子节点存的是<strong>主键值</strong>，查到主键后还要「回表」再去聚簇索引查一次整行数据。
          这就是为什么主键要选单调递增的整数——避免随机插入导致频繁分裂。
        </p>
        <div class="mb-4"><Code language="ts" :code="clusteredCode" title="innodb_index.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          聚簇索引就像 <strong>Vue 的 v-for key</strong>——用一个稳定的唯一 id（主键）作为「身份」，diff 时直接按 key 定位到对应的真实 DOM（整行数据）。<br/>
          二级索引就像 <strong>一个「id 映射表」</strong>（如 Map&lt;email, userId&gt;），先查到 userId，再「回表」去主列表里取完整对象——两次查找，所以设计表时尽量让常用查询走主键，避免回表。
          </p>
        </aside>
      </section>

      <!-- 5. 陷阱 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          常见陷阱与避坑指南
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 1：内部节点与叶子 key 重复</strong><br/>
          同一 key 会同时出现在内部节点和叶子节点。查找时<strong>不能像 B 树那样「命中内部节点即返回」</strong>——内部节点的 key 只是索引副本，不代表数据，必须一路下探到叶子才算找到。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 2：删除后内部索引残留</strong><br/>
          删除叶子里的 key 后，内部节点里对应的索引 key <strong>可以不急着删</strong>（它只是路标，找不到数据也无妨）。但工程实现里往往要维护「删除后若叶子下溢则借/合并」，合并时注意同步更新父节点的分隔 key。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 3：忽略叶子链表的维护成本</strong><br/>
          分裂/合并时要<strong>同时维护 next 指针</strong>：新叶子要接到链表正确位置，合并时要摘掉多余节点。漏掉任何一处，范围查询就会断链或重复。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong><br/>
          ① 需要大量<strong>范围查询 / 排序 / 全表扫描</strong> → 选 B+ 树（数据库默认）；<br/>
          ② 需要<strong>高频单点查询</strong>且数据能全放内存 → B 树或哈希表更直接；<br/>
          ③ 主键优先选<strong>单调递增整数</strong>，减少分裂与页分裂；<br/>
          ④ 二级索引查出的主键要「回表」，能用<strong>覆盖索引</strong>（索引里带上所需列）就避免回表。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：插入 + 叶子链表范围查询
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">上半部分是<strong>叶子链表</strong>（升序数据），下半部分是<strong>内部索引</strong>。点「插入」观察新 key 进叶子并保持链表有序；点「范围查询」观察「定位起点 + 顺链表右扫」。</p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 叶子数: {{ bnodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔑 key 数: {{ keyCount }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @mousedown="doInsert" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">插入 key</button>
          <button @mousedown="doRange" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:shadow-sm disabled:opacity-40">范围查询 [lo, hi]</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-text :config="{x:16,y:10,text:'叶子链表（升序数据，next 指针 →）',fontSize:11,fontFamily:'monospace',fill:C.muted,fontStyle:'bold'}" />
              <v-line v-for="(n,i) in bnodes.slice(0,-1)" :key="'ln'+n.id" :config="linkCfg(i)" />
              <v-rect v-for="n in bnodes" :key="n.id" :config="leafRectCfg(n)" />
              <v-text v-for="n in bnodes" :key="'t'+n.id" :config="leafTextCfg(n)" />
              <v-text :config="{x:16,y:118,text:'内部索引节点（路标，指向叶子区间）',fontSize:11,fontFamily:'monospace',fill:C.muted,fontStyle:'bold'}" />
              <v-line v-for="(e,i) in indexEdges" :key="'ie'+i" :config="idxEdgeCfg(e)" />
              <v-rect v-for="i in indexNodes" :key="'i'+i.id" :config="idxRectCfg(i)" />
              <v-text v-for="i in indexNodes" :key="'it'+i.id" :config="idxTextCfg(i)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>B+ 树 = B 树 + 数据全放叶子 + 叶子链表</strong>——内部节点只存索引 key</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>范围查询 O(log n + k)</strong>：定位起点（log n）+ 顺链表右扫（k 条，顺序 IO）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>分裂时中间 key 既上提又留在叶子</strong>——内部是索引副本，叶子是数据正本</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>查找必须走到叶子</strong>：内部命中不是真命中，只是「路过路标」</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>InnoDB 聚簇索引</strong>叶子存整行；二级索引存主键，需「回表」</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>选型</strong>：范围查询/排序/扫描选 B+ 树，纯单点内存查询选 B 树或哈希</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下一步</strong>：LSM 树放弃原地更新，用「日志追加 + 分层合并」换取极致写吞吐</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-4-btree/dsa-4-4-1-b-tree" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：B 树</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-4-btree/dsa-4-4-3-lsm" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：LSM 树 →</RouterLink>
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
  { id: "sec-1", name: "vs B 树" },
  { id: "sec-2", name: "范围查询" },
  { id: "sec-3", name: "插入分裂" },
  { id: "sec-4", name: "InnoDB 索引" },
  { id: "sec-5", name: "常见陷阱" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 B+ 树叶子链表 + 范围查询动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const W = ref(760), H = ref(220)
const LEAF_W = 46, LEAF_H = 40, LEAF_Y = 40, IDX_Y = 156
const GAP = 10

interface Leaf { id: number; val: number; color: string }
const bnodes = reactive<Leaf[]>([])
const busy = ref(false), status = ref('')
let nextId = 100
const box = ref<HTMLDivElement>()

const keyCount = computed(() => bnodes.length)

function resetTree() {
  bnodes.length = 0
  ;[10, 20, 35, 50, 70].forEach(v => bnodes.push({ id: nextId++, val: v, color: C.cyan }))
  layout()
}

function layout() {
  const total = bnodes.length * (LEAF_W + GAP) - GAP
  const sx = Math.max(16, (W.value - total) / 2)
  bnodes.forEach((n, i) => { (n as any).x = sx + i * (LEAF_W + GAP) })
}

function leafRectCfg(n: any) {
  const x = n.x ?? 0
  return { x, y: LEAF_Y, width: LEAF_W, height: LEAF_H, fill: n.color, cornerRadius: 6,
    stroke: '#0891b2', strokeWidth: 1.5, shadowColor: 'rgba(0,0,0,.1)', shadowBlur: 4, shadowOffsetY: 2 }
}
function leafTextCfg(n: any) {
  const x = n.x ?? 0
  return { x, y: LEAF_Y, width: LEAF_W, height: LEAF_H, text: String(n.val), fontSize: 15,
    fontFamily: 'monospace', fontStyle: 'bold', fill: '#fff', align: 'center', verticalAlign: 'middle' }
}
function linkCfg(i: number) {
  const a = bnodes[i] as any, b = bnodes[i + 1] as any
  return { points: [a.x + LEAF_W, LEAF_Y + LEAF_H / 2, b.x, LEAF_Y + LEAF_H / 2],
    stroke: '#f59e0b', strokeWidth: 2, pointerLength: 7, pointerWidth: 6, fill: '#f59e0b' }
}

// 内部索引节点：把叶子按区间分组，每组产生一个「路标」节点
const indexNodes = computed(() => {
  const res: { id: number; label: string; x: number; lo: number; hi: number; color: string }[] = []
  const n = bnodes.length
  if (n === 0) return res
  const span = (W.value - 32)
  let i = 0, gid = 0
  while (i < n) {
    const size = i + 2 <= n ? 2 : 1
    const lo = bnodes[i].val
    const hi = bnodes[i + size - 1].val
    const mid = bnodes[i + Math.floor(size / 2)].val
    const x = 32 + span * ((i + size / 2) / n)
    res.push({ id: gid++, label: String(mid), x, lo, hi, color: C.ghost })
    i += size
  }
  return res
})
const indexEdges = computed(() => {
  const res: { from: number; to: number; color: string }[] = []
  let i = 0
  indexNodes.value.forEach(idx => {
    const size = i + 2 <= bnodes.length ? 2 : 1
    const target = bnodes[i] as any
    res.push({ from: idx.x, to: target.x + LEAF_W / 2, color: C.ghost })
    i += size
  })
  return res
})

function idxRectCfg(i: any) {
  const w = 40
  return { x: i.x - w / 2, y: IDX_Y, width: w, height: 32, fill: i.color, cornerRadius: 6, stroke: '#94a3b8', strokeWidth: 1.5 }
}
function idxTextCfg(i: any) {
  const w = 40
  return { x: i.x - w / 2, y: IDX_Y, width: w, height: 32, text: i.label, fontSize: 14,
    fontFamily: 'monospace', fontStyle: 'bold', fill: '#334155', align: 'center', verticalAlign: 'middle' }
}
function idxEdgeCfg(e: { from: number; to: number; color: string }) {
  return { points: [e.from, IDX_Y + 32, e.to, LEAF_Y + LEAF_H], stroke: '#94a3b8', strokeWidth: 1.5, dash: [4, 3] }
}

const d = (ms: number) => new Promise(r => setTimeout(r, ms))

async function doInsert() {
  if (busy.value) return
  busy.value = true
  const val = Math.floor(Math.random() * 90 + 5)
  status.value = `插入 ${val}`
  const nb: Leaf = { id: nextId++, val, color: C.green }
  bnodes.push(nb)
  bnodes.sort((a, b) => a.val - b.val)
  layout()
  await d(400)
  nb.color = C.cyan
  status.value = `插入 ${val} 完成（链表保持有序）`
  busy.value = false
}

async function doRange() {
  if (busy.value || bnodes.length === 0) return
  busy.value = true
  const lo = bnodes[Math.floor(bnodes.length * 0.2)].val
  const hi = bnodes[Math.floor(bnodes.length * 0.7)].val
  status.value = `范围查询 [${lo}, ${hi}]`
  // 步骤1：定位起点（顺链表找到第一个 >= lo）
  let start = 0
  while (start < bnodes.length && bnodes[start].val < lo) {
    bnodes[start].color = C.ghost
    await d(120)
    start++
  }
  if (start >= bnodes.length) { status.value = `未找到 >= ${lo} 的元素`; resetColors(); busy.value = false; return }
  bnodes[start].color = C.orange
  await d(300)
  // 步骤2：顺链表右扫，收集命中项
  const hit: number[] = []
  let j = start
  while (j < bnodes.length && bnodes[j].val <= hi) {
    bnodes[j].color = C.green
    hit.push(bnodes[j].val)
    await d(300)
    j++
  }
  status.value = `命中 [${hit.join(', ')}]，扫到 > ${hi} 停止`
  await d(900)
  resetColors()
  busy.value = false
}

function resetColors() { bnodes.forEach(n => { n.color = C.cyan }) }
function doReset() { busy.value = false; resetTree(); status.value = '' }

let ro: ResizeObserver | null = null
onMounted(() => {
  resetTree()
  if (box.value) {
    W.value = box.value.clientWidth
    layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const nodeCode = `// ===== B+ 树节点定义 =====
// 关键区别：内部节点只存索引 key，叶子节点存数据 + next 指针

interface BPNode {
  keys: number[]           // 内部节点：索引 key；叶子节点：数据 key
  children: BPNode[]       // 内部节点：孩子；叶子节点：空数组
  values: (string | null)[]  // 仅叶子节点存 value（数据）
  next: BPNode | null      // 仅叶子节点：指向下一个叶子
  isLeaf: boolean
}

// 查找：必须一路下探到叶子，命中内部节点不算命中
function search(node: BPNode, key: number): string | null {
  while (!node.isLeaf) {
    let i = 0
    while (i < node.keys.length && key >= node.keys[i]) i++
    node = node.children[i]
  }
  const i = node.keys.indexOf(key)
  return i >= 0 ? node.values[i] : null
}
// 为什么内部命中不算数？因为内部节点的 key 只是「副本/路标」，
// 真正的数据只存在于叶子，值(value)也只在叶子里。`

const rangeCode = `// ===== 范围查询：定位起点 + 顺链表右扫 =====
function rangeQuery(root: BPNode, lo: number, hi: number): string[] {
  // 步骤1：沿内部索引下探，找到第一个 >= lo 的叶子
  let node = root
  while (!node.isLeaf) {
    let i = 0
    while (i < node.keys.length && lo >= node.keys[i]) i++
    node = node.children[i]
  }

  // 步骤2：沿叶子 next 链表一路右扫，收集 [lo, hi] 内的数据
  const res: string[] = []
  while (node !== null) {
    for (let i = 0; i < node.keys.length; i++) {
      if (node.keys[i] > hi) return res      // 越过终点，提前结束
      if (node.keys[i] >= lo) res.push(node.values[i]!)
    }
    node = node.next                         // 跳到下一个叶子
  }
  return res
}
// 复杂度 O(log n + k)：
//   log n —— 定位起点的下探成本（索引高度）
//   k     —— 命中的记录数（顺链表扫描，顺序 IO）
// 对比 B 树：B 树做范围查询要中序遍历 + 反复回溯内部节点，随机 IO 多，更慢`

const insertCode = `// ===== B+ 树插入：先插叶子，满了分裂（中间 key 既上提又留在叶子）=====
function insert(root: BPNode | null, key: number, value: string): BPNode {
  if (!root) return { keys: [key], children: [], values: [value], next: null, isLeaf: true }

  insertIn(root, key, value)

  if (root.keys.length > MAX_KEYS) {
    // 根分裂：树长高
    const mid = Math.floor(root.keys.length / 2)
    const newRoot: BPNode = { keys: [root.keys[mid]], children: [], values: [], next: null, isLeaf: false }
    const right = splitLeaf(root, mid)  // 拆出右半叶子
    newRoot.children = [root, right]
    return newRoot
  }
  return root
}

function splitLeaf(leaf: BPNode, mid: number): BPNode {
  // 叶子分裂：右半搬走，中间 key 既留在原叶子又作为父索引
  const right: BPNode = {
    keys: leaf.keys.slice(mid),          // ⚠️ 从 mid 开始（含 mid），中间 key 保留在叶子
    children: [],
    values: leaf.values.slice(mid),
    next: leaf.next,
    isLeaf: true,
  }
  leaf.keys = leaf.keys.slice(0, mid)    // ⚠️ 原叶子仍含中间 key
  leaf.values = leaf.values.slice(0, mid)
  leaf.next = right                      // 维护 next 链表
  return right
}
// 对比 B 树：B 树分裂是 keys.slice(0, mid) + keys.slice(mid+1)，中间 key 离开叶子
//           B+ 树分裂是 keys.slice(0, mid) + keys.slice(mid)，中间 key 同时留在叶子
// 记忆：B 树「提走」，B+ 树「提一份副本，原处留底」`

const clusteredCode = `// ===== MySQL InnoDB 的 B+ 树索引（概念模型）=====
// 聚簇索引（主键索引）：叶子节点直接存「整行数据」
// ┌─────────────────────────────────────────┐
// │  内部节点: [id=100] [id=200] ...        │  ← 只存主键索引
// └──────────────┬──────────────┬───────────┘
//        ┌───────▼──────┐ ┌────▼────────┐
//        │ 叶子: id=100 │ │ 叶子: id=200 │  ← 叶子存整行
//        │ {id:100,     │ │ {id:200,     │     {id, name, age, email...}
//        │  name:'Alice'}│ │  name:'Bob'}│
//        │ next →       │ │ next →       │
//        └──────────────┘ └──────────────┘

// 二级索引（如 email 索引）：叶子存「主键值」，要回表
// 查找 WHERE email = 'a@x.com' 的完整行：
// 1) 走 email 二级索引 → 叶子命中，拿到主键 id=100
// 2) 回表：用 id=100 去聚簇索引查一次 → 拿到整行 {id:100, name:'Alice', ...}

// 为什么主键要选「单调递增整数」？
// - 顺序插入只会追加到最右叶子，几乎不触发分裂
// - 随机主键（如 UUID）插入位置随机，频繁分裂 → 页分裂 + 碎片
// 所以：自增主键 = 写入友好 + 空间紧凑 + 回表快

// 覆盖索引（covering index）：二级索引里直接带上查询所需的列
// SELECT id FROM users WHERE email = 'a@x.com'
// 二级索引(email) 的叶子已存 id，不用回表，少一次 IO`
</script>
