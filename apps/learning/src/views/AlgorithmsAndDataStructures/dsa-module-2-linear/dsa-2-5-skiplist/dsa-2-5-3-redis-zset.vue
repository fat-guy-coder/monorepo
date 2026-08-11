<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔴 Redis ZSet 中的跳表：工业级应用</h1>
          <p class="text-sm text-slate-500 mt-1">为什么 Redis 选跳表而不是红黑树——简单、范围查询快、实现容易</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-5-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- Redis Sorted Set 概述 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          Redis 有序集合（ZSet）概述
        </h2>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Redis ZSet 就像一个<strong>自带排名的有序 Map</strong>——<br/>
          <code class="bg-purple-100 px-1 rounded text-xs font-mono">ZSet</code> ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">Map&lt;member, score&gt;</code>（通过 member 查 score）+ <code class="bg-purple-100 px-1 rounded text-xs font-mono">Array&lt;{member, score}&gt;</code>（按 score 排序，支持范围查询和排名）。<br/>
          前者用<strong>哈希表</strong>实现 O(1) 查询，后者用<strong>跳表</strong>实现 O(log n) 有序操作。
          </p>
        </aside>

        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>有序集合（Sorted Set，简称 ZSet）</strong>是 Redis 五种核心数据类型之一。与普通 Set 不同，ZSet 中每个元素（member）都关联一个<strong>分数（score）</strong>，Redis 按 score 自动排序。典型应用场景包括排行榜、延迟队列、带权重的集合等。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">ZSet 的双重数据结构</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          Redis ZSet 内部使用了<strong>两种数据结构</strong>，各司其职：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">数据结构</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用途</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">时间复杂度</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200"><strong>哈希表（dict）</strong></td><td class="px-4 py-2 border border-slate-200">member → score 映射</td><td class="px-4 py-2 border border-slate-200">O(1)</td><td class="px-4 py-2 border border-slate-200">快速获取某个成员的分数、判断成员是否存在</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><strong>跳表（skiplist）</strong></td><td class="px-4 py-2 border border-slate-200">按 score 排序，维护有序性</td><td class="px-4 py-2 border border-slate-200">O(log n)</td><td class="px-4 py-2 border border-slate-200">范围查询、排名查询、按分数范围获取成员</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-3 leading-relaxed">
          为什么不用单一数据结构？因为<strong>没有一种数据结构能同时做到 O(1) 查 score 和 O(log n) 有序操作</strong>。哈希表查找快但不能排序，跳表能排序但查单个 member 的 score 也需要 O(log n)。Redis 的策略是<strong>两者结合</strong>，各取所长——这是典型的"空间换时间"。
        </p>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 内存代价：</strong>每个 ZSet 元素同时存在于 dict 和 skiplist 中，内存占用大约是普通 Set 的两倍（加上指针开销）。但对于 Redis 的典型场景（百万级 ZSet），这个代价在可接受范围内。</p>
        </aside>
      </section>

      <!-- 为什么选跳表不选红黑树 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          为什么 Redis 选跳表而不是红黑树？
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          这是 Redis 面试的经典问题。Redis 的作者 antirez 在源码和博客中都给出过解释。核心原因有三：
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">原因 1：范围查询更简单高效</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          ZSet 最常见的操作之一是 <strong>ZRANGE</strong>（按分数范围获取成员列表）。跳表的底层是有序链表，找到起点后直接<strong>顺序遍历</strong>即可，时间复杂度 O(log n + k)，k 是返回的元素数。
        </p>
        <p class="text-slate-600 mb-4 leading-relaxed">
          红黑树要做范围查询，需要用<strong>中序遍历</strong>，涉及递归或手动维护栈——代码更复杂，且因为有旋转操作，迭代器的实现在边界情况更棘手。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">原因 2：实现简单，代码量少</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          平衡树（红黑树/AVL）的插入和删除需要处理<strong>旋转、颜色翻转、双红/双黑修正</strong>等多种情况。而跳表的插入/删除只是<strong>链表指针改写</strong> + 随机层数生成，核心逻辑不到 100 行 C 代码。
        </p>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Redis 追求的就是"简单且稳定"——一个更简单的实现意味着更少 bug。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">原因 3：无需全局重平衡</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          红黑树每次插入/删除都可能触发<strong>级联旋转</strong>，最坏情况下影响 O(log n) 个节点的颜色和父子关系。跳表的插入/删除只影响<strong>局部</strong>（每层一条边的改写），没有级联效应。这在并发场景下意义重大——锁粒度可以更细。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">决策维度</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">跳表</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">红黑树</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Redis 的选择</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">范围查询</td><td class="px-4 py-2 border border-slate-200 text-green-600">简单——顺序遍历底层链表</td><td class="px-4 py-2 border border-slate-200">需中序遍历，代码更复杂</td><td class="px-4 py-2 border border-slate-200">跳表胜</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">实现复杂度</td><td class="px-4 py-2 border border-slate-200 text-green-600">~100 行核心代码</td><td class="px-4 py-2 border border-slate-200">~300+ 行（含各种旋转 case）</td><td class="px-4 py-2 border border-slate-200">跳表胜</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">性能确定性</td><td class="px-4 py-2 border border-slate-200">期望 O(log n)，极小概率退化</td><td class="px-4 py-2 border border-slate-200 text-green-600">严格 O(log n)</td><td class="px-4 py-2 border border-slate-200">红黑树胜（但实际差异可忽略）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">内存占用</td><td class="px-4 py-2 border border-slate-200">稍高（多层指针）</td><td class="px-4 py-2 border border-slate-200 text-green-600">紧凑（固定 2 指针 + 颜色）</td><td class="px-4 py-2 border border-slate-200">红黑树胜</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">并发友好度</td><td class="px-4 py-2 border border-slate-200 text-green-600">局部修改，可无锁实现</td><td class="px-4 py-2 border border-slate-200">旋转影响面大</td><td class="px-4 py-2 border border-slate-200">跳表胜</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          选择跳表 ≈ 选择 <strong>Vite</strong> 而不是 Webpack——不是因为 Vite"功能更强"，而是因为它<strong>简单、开发体验好、够用</strong>。<br/>
          Redis 选跳表不是因为跳表"理论上更优"，而是因为它在<strong>Redis 的场景下</strong>（大量范围查询、追求实现简单）是更好的工程选择。
          </p>
        </aside>
      </section>

      <!-- Redis 的跳表改造 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          Redis 对跳表的定制改造
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          Redis 并没有直接使用标准跳表，而是在上面加了三个关键改造：<strong>span 字段（排名查询）</strong>、<strong>backward 指针（反向遍历）</strong>和<strong>score 相同时按 member 字典序排序</strong>。这些改造让跳表能高效支持 ZRANK、ZREVRANGE 等 Redis 特有操作。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">改造 1：span 字段 —— 支持排名查询（ZRANK）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          这是最关键的改造。每个节点的每个 forward 指针旁边多了一个 <strong>span</strong> 值，记录当前指针<strong>跨越了多少个节点</strong>（不含自身，不含目标节点本身，仅中间节点数）。
        </p>
        <div class="mb-4">
          <Code language="ts" :code="spanConcept" title="span 字段的概念" />
        </div>

        <p class="text-slate-600 mb-3 leading-relaxed">
          ZRANK 操作（查询某个 member 的排名）就利用 span 值的<strong>累加</strong>：从最高层向下查找目标时，每向右移动一步，就把该层的 span 值累加。到达目标后，累加值 + 1 就是排名（从 1 开始）。
        </p>
        <div class="mb-4">
          <Code language="ts" :code="zrankAlgo" title="ZRANK 的 span 累加原理" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">改造 2：backward 指针 —— 支持反向遍历（ZREVRANGE）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          标准跳表是单向的（只有 forward 指针）。Redis 在每个节点加了一个 <strong>backward</strong> 指针，指向<strong>底层链表中的前一个节点</strong>。这意味着反向遍历不需要倒着搜索跳表——只需在底层链表中沿着 backward 指针走。
        </p>
        <div class="mb-4">
          <Code language="ts" :code="backwardPointer" title="backward 指针" />
        </div>

        <p class="text-slate-600 mb-3 leading-relaxed">
          注意 backward 指针只在<strong>底层（Level 1）</strong>有效——高层索引不需要反向遍历。ZREVRANGE（反向范围查询）的实现：先在跳表中找到范围的<strong>最右端点</strong>（O(log n)），然后沿着 backward 指针反向收集 k 个元素（O(k)）。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">改造 3：score 相同时按 member 字典序排序</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          ZSet 中所有 member 必须唯一，且按 score 排序。当 score 相同时，Redis 按 member 的<strong>字典序</strong>排序。这要求跳表的比较逻辑不是简单的数值比较，而是<strong>复合比较</strong>：先比 score，score 相同再比 member 字符串。
        </p>
        <div class="mb-4">
          <Code language="ts" :code="compositeCompare" title="复合比较逻辑" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">Redis 跳表参数总览</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">参数</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Redis 默认值</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">ZSKIPLIST_MAXLEVEL</td><td class="px-4 py-2 border border-slate-200">32</td><td class="px-4 py-2 border border-slate-200">最大层数。2^32 ≈ 42 亿元素，足以容纳任何规模的 ZSet</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">ZSKIPLIST_P</td><td class="px-4 py-2 border border-slate-200">0.25</td><td class="px-4 py-2 border border-slate-200">层数增长概率。比 0.5 更稀疏（省内存），每层期望步数 4</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">元素上限</td><td class="px-4 py-2 border border-slate-200">2^32 - 1</td><td class="px-4 py-2 border border-slate-200">理论可容纳约 42 亿个 member</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验之谈：</strong>Redis 选 P = 0.25 而非 0.5 是深思熟虑的。P 越小 → 层数期望越小 → 空间占用越小，但每层期望步数变多（1/P = 4）。0.25 是 Redis 团队在实践中找到的<strong>空间与时间的最佳平衡点</strong>。</p>
        </aside>
      </section>

      <!-- ZSet 核心命令与跳表操作的对应关系 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          ZSet 核心命令与跳表操作的对应
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          下面将 Redis ZSet 的常用命令映射到跳表的底层操作，让你看到"命令"是如何翻译成"数据结构操作"的。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Redis 命令</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">底层操作</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">时间</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">涉及的数据结构</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ZADD key score member</code></td><td class="px-4 py-2 border border-slate-200">1. dict 中存 member→score；2. skiplist.insert(member, score)</td><td class="px-4 py-2 border border-slate-200">O(log n)</td><td class="px-4 py-2 border border-slate-200">dict + skiplist 同时插入</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ZSCORE key member</code></td><td class="px-4 py-2 border border-slate-200">dict.get(member) → score</td><td class="px-4 py-2 border border-slate-200"><strong>O(1)</strong></td><td class="px-4 py-2 border border-slate-200">只用 dict，不走跳表</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ZRANK key member</code></td><td class="px-4 py-2 border border-slate-200">skiplist 中查找 member + 累加 span</td><td class="px-4 py-2 border border-slate-200">O(log n)</td><td class="px-4 py-2 border border-slate-200">只用 skiplist</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ZRANGE key start stop</code></td><td class="px-4 py-2 border border-slate-200">1. 按排名在 skiplist 中定位起点（累加 span）；2. 顺序遍历底层链表</td><td class="px-4 py-2 border border-slate-200">O(log n + k)</td><td class="px-4 py-2 border border-slate-200">只用 skiplist</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ZREVRANGE key start stop</code></td><td class="px-4 py-2 border border-slate-200">同上 + 利用 backward 指针反向收集</td><td class="px-4 py-2 border border-slate-200">O(log n + k)</td><td class="px-4 py-2 border border-slate-200">只用 skiplist</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ZREM key member</code></td><td class="px-4 py-2 border border-slate-200">1. dict.delete(member)；2. skiplist.delete(member)</td><td class="px-4 py-2 border border-slate-200">O(log n)</td><td class="px-4 py-2 border border-slate-200">dict + skiplist 同时删除</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ZRANGEBYSCORE key min max</code></td><td class="px-4 py-2 border border-slate-200">1. skiplist 定位 score=min 的节点；2. 顺序遍历直到 score > max</td><td class="px-4 py-2 border border-slate-200">O(log n + k)</td><td class="px-4 py-2 border border-slate-200">只用 skiplist</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">
          关键洞察：<strong>dict 只负责 O(1) 的精确查询</strong>（ZSCORE、判断 member 是否存在），所有与顺序相关的操作（ZRANK、ZRANGE、ZRANGEBYSCORE）都走跳表。这种"双结构"设计让 ZSet 同时具备了哈希表和有序链表的优势。
        </p>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>ZADD 需要<strong>同时更新 dict 和 skiplist</strong>，且两者必须保持<strong>一致性</strong>。如果跳表插入成功但 dict 写入失败（或反之），ZSet 就损坏了。Redis 是单线程的，天然避免了这个问题；但在多线程/Lua 脚本中需要额外注意。</p>
        </aside>
      </section>

      <!-- 性能对比 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          性能对比：Redis ZSet vs MySQL 有序查询
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          很多团队用 MySQL 的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">ORDER BY score DESC LIMIT 100</code> 实现排行榜。我们来对比 Redis ZSet 和 MySQL 在同一场景下的差异。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">场景：实时排行榜 Top 100</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          一个典型的游戏排行榜：100 万玩家，实时更新分数，查询 Top 100。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Redis ZSet</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">MySQL (InnoDB, 索引)</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200"><strong>更新分数</strong></td><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ZADD</code> — O(log n) ≈ 20 次比较</td><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">UPDATE ... SET score = ?</code> — B+Tree 页内二分 + 可能的页分裂，约 0.1~1ms</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><strong>查询 Top 100</strong></td><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ZREVRANGE 0 99</code> — O(log n + 100)</td><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">SELECT ... ORDER BY score DESC LIMIT 100</code> — 利用索引反向扫描，O(log n + 100)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><strong>QPS</strong></td><td class="px-4 py-2 border border-slate-200">单机 10 万~50 万 QPS（纯内存）</td><td class="px-4 py-2 border border-slate-200">单机 1000~5000 QPS（磁盘 IO 瓶颈）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><strong>延迟</strong></td><td class="px-4 py-2 border border-slate-200">&lt; 1ms</td><td class="px-4 py-2 border border-slate-200">1~10ms</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><strong>持久化</strong></td><td class="px-4 py-2 border border-slate-200">RDB/AOF 异步持久化，断电可能丢数据</td><td class="px-4 py-2 border border-slate-200">Redo Log + Binlog，ACID 保证</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><strong>数据容量</strong></td><td class="px-4 py-2 border border-slate-200">受限于内存大小</td><td class="px-4 py-2 border border-slate-200">TB 级，几乎无上限</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">ZSet 内存占用对比</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          100 万条 ZSet 数据（每条 member 约 20 字节 + score 8 字节）的内存占用：
        </p>
        <div class="mb-4">
          <Code language="text" :code="memoryEstimation" :hiddenToolbar="true" />
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Redis ZSet（内存排名）≈ 浏览器 <strong>IndexedDB</strong> —— 数据在客户端内存中，读写极快（微秒级），但容量有限。<br/>
          MySQL（数据库排名）≈ 后端的 <strong>PostgreSQL</strong> —— 数据在磁盘，通过索引加速，容量近乎无限。<br/>
          实际架构中两者常配合使用：Redis 做<strong>热数据缓存</strong>（近实时排行榜），MySQL 做<strong>冷数据持久化</strong>（历史排名回查）。
          </p>
        </aside>
      </section>

      <!-- 其他工业应用 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          其他工业级跳表应用
        </h2>

        <h3 class="text-base font-semibold text-slate-700 mb-3">LevelDB / RocksDB 的 MemTable</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Google 的 LevelDB（以及 FaceBook 的 RocksDB）在内存中使用<strong>跳表作为 MemTable</strong>（内存中的写缓冲）。写入的数据先进入跳表 MemTable（按 key 排序），达到一定大小后转为不可变的 SSTable 写入磁盘。
        </p>
        <p class="text-slate-600 mb-3 leading-relaxed">
          选择跳表的原因与 Redis 类似：<strong>并发写友好</strong>（LevelDB 支持多线程压缩，跳表的局部修改特性减少了锁竞争）和<strong>范围扫描高效</strong>（LSM-Tree 的 compaction 需要大量有序遍历）。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">Apache HBase 的 MemStore</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          HBase 的 MemStore（内存写缓冲）使用 <strong>ConcurrentSkipListMap</strong>（Java 的并发跳表实现），保证多线程写入时的线程安全和有序性。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">Java ConcurrentSkipListMap</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">
          JDK 1.6 引入了 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">java.util.concurrent.ConcurrentSkipListMap</code>，是<strong>线程安全的有序 Map</strong>。它的存在本身就是一个强烈的信号：跳表在并发场景下的优势足以让 JDK 核心库为其提供一个专门实现。
        </p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          跳表在存储系统中的作用 ≈ 前端框架中的 <strong>Virtual DOM</strong>——都是<strong>在内存中维护一个快速查找/更新的中间层</strong>，最终同步到慢速介质（磁盘/真实 DOM）。<br/>
          LevelDB 的跳表 MemTable ≈ React 的 Virtual DOM diff buffer——攒一波变更，一次性高效地刷到"真实存储"。
          </p>
        </aside>
      </section>

      <!-- 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Redis ZSet = dict + skiplist：</strong>哈希表负责 O(1) 精确查询，跳表负责 O(log n) 有序操作。两者结合达到最优</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>为什么不用红黑树：</strong>范围查询更简单 + 实现更短（~100 行 vs ~300 行）+ 无需全局重平衡 + 并发更友好</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Redis 的三大改造：</strong>span（排名查询）、backward 指针（反向遍历）、复合比较（score + member 字典序）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Redis 参数：</strong>MAX_LEVEL = 32, P = 0.25（比 0.5 更省内存，每层期望步数 4）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>性能优势：</strong>纯内存操作，单机 10 万+ QPS，延迟 &lt; 1ms，完胜磁盘型数据库</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>局限性：</strong>受限于内存容量，不适合 TB 级持久化存储。常与 MySQL 配合（Redis 热数据 + MySQL 冷数据）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>工业案例：</strong>除了 Redis，LevelDB、RocksDB、HBase、JDK ConcurrentSkipListMap 都在使用跳表</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-5-skiplist/dsa-2-5-2-implement" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：跳表实现</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-1-hash-func/dsa-3-1-1-principle" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：哈希函数原理 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-1", name: "Redis ZSet 概述" },
  { id: "sec-2", name: "为什么选跳表" },
  { id: "sec-3", name: "Redis 的定制改造" },
  { id: "sec-4", name: "命令与操作对应" },
  { id: "sec-5", name: "性能对比" },
  { id: "sec-6", name: "其他工业应用" },
  { id: "sec-7", name: "小结" },
]

const spanConcept = `// Redis 跳表节点的 C 结构体（简化）
// typedef struct zskiplistNode {
//     robj *obj;                        // member 对象（字符串）
//     double score;                      // 分数
//     struct zskiplistNode *backward;    // 底层链表的前驱指针
//     struct zskiplistLevel {
//         struct zskiplistNode *forward; // 前向指针
//         unsigned int span;             // 该层指针跨越的节点数
//     } level[];                         // 变长数组，每层一个
// } zskiplistNode;

// span 的含义（底层，即 level[0]）：
// 相邻节点之间的 span = 1

// span 的含义（高层）：
// head.level[2].forward = 19, span = 3
//   表示从 head 到 19，中间跨越了 3 个节点（3, 7, 11）

// span 示意图（P = 0.5 示例）：
// Level 3: [head] —— span=3 ——→ [19] —— span=3 ——→ null
//            │                    │
// Level 2: [head] —— span=2 → [7] —— span=2 → [19] — span=2 → [29] — span=1 → [37]
//            │                  │               │              │               │
// Level 1: [head]—s=1→[3]—s=1→[7]—s=1→[11]—s=1→[19]—s=1→[22]—s=1→[29]—s=1→[37]
//          (s = span，底层相邻节点 span = 1)`

const zrankAlgo = `// ZRANK 的简化实现——通过 span 累加计算排名
function zrank(member: string): number {
  let rank = 0
  let current = head

  // 从最高层向下查找 member
  for (let i = level - 1; i >= 0; i--) {
    while (
      current.forward[i] !== null &&
      compare(current.forward[i], member) < 0  // 当前节点 < 目标 member
    ) {
      rank += current.level[i].span  // 累加跨越的节点数
      current = current.forward[i]
    }
    // 如果找到了目标
    if (current.forward[i] !== null && compare(current.forward[i], member) === 0) {
      rank += current.level[i].span
      return rank  // rank 从 1 开始（包含了到目标节点自身的 span）
    }
  }

  return -1  // 未找到
}

// 示例：查找 member = "player_A" 的排名（假设它在 score 排序下排第 5）
// 查找过程中累加的 span 值之和 = 4（前面的 4 个节点）
// 最终 rank = 4 + 1 = 5（排名从 1 开始）

// 关键理解：span 让 ZRANK 和 ZRANGE 的复杂度都是 O(log n) + O(k)
// 而不是 O(log n) + O(n)（如果每步都需重新计数的话）`

const backwardPointer = `// backward 指针仅在节点底层（Level 1）时使用
// 标准跳表只有 forward[] 数组（单向右行）
// Redis 在每个节点加了一个 backward 指针

// 结构示意：
// [head] ←→ [3] ←→ [7] ←→ [11] ←→ [19] ←→ [22] ←→ [29] ←→ [37]
//    ↕        ↕        ↕        ↕        ↕         ↕         ↕
//   双向链表（底层，通过 backward + forward[0] 实现）

// backward 指针让反向遍历变成 O(k)：
// ZREVRANGE 0 9（取分数最高的前 10 名）：
//   1. 先找到最高分的节点（跳表最右端）— O(log n)
//   2. 沿 backward 往回走 9 步 — O(9)
//   总复杂度: O(log n + k)`

const compositeCompare = `// Redis 的复合比较逻辑（简化 TypeScript）
interface ZSetElement {
  member: string
  score: number
}

function compareZSetElements(a: ZSetElement, b: ZSetElement): number {
  // 首先按 score 排序
  if (a.score !== b.score) {
    return a.score - b.score
  }
  // score 相同时，按 member 字典序排序
  // member 是 SDS 字符串（Simple Dynamic String）
  return a.member.localeCompare(b.member)
}

// 示例：
// ZADD leaderboard 100 "Alice"
// ZADD leaderboard 100 "Bob"
// ZADD leaderboard 100 "Charlie"
//
// 三者 score 相同，在跳表中的顺序为：
// "Alice" < "Bob" < "Charlie"（按 member 字典序）
//
// ZRANK leaderboard "Bob" → 2（排名从 1 开始）

// 注意：因为 member 唯一且参与排序，
// 跳表的查找需要比较 score 和 member 两个字段，
// 不能只比较数值`

const memoryEstimation = `// 100 万条 ZSet 数据的内存占用估算（Redis 7.x）

// 单个 zskiplistNode 内存构成：
//   - 节点结构体: ~32 bytes
//   - member SDS 字符串: ~20 bytes（平均）
//   - score (double): 8 bytes
//   - level 数组（期望 1/(1-0.25) = 1.33 层）:
//       每层: forward 指针(8) + span(4) = 12 bytes
//       期望: 12 × 1.33 ≈ 16 bytes
//   - backward 指针: 8 bytes
//   ==============================
//   合计: ~84 bytes/节点

// dict 中的额外开销:
//   - dictEntry: ~24 bytes
//   - key (member SDS): 共享，不计入
//   - value (score): 8 bytes
//   ==============================
//   合计: ~32 bytes/节点

// 总内存 ≈ 100万 × (84 + 32) ≈ 116 MB

// 对比：
// MySQL 相同数据（含索引）: ~50 MB（磁盘）
// Redis 内存占用约是 MySQL 磁盘占用的 2-3 倍
// 但 Redis 的 QPS 是 MySQL 的 50-100 倍
// 这是典型的"空间换时间"`
</script>