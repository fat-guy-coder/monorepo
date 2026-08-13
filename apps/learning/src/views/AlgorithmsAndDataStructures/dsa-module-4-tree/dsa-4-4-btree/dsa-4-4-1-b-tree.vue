<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌲 B 树：磁盘友好的多路平衡树</h1>
          <p class="text-sm text-slate-500 mt-1">一个节点存多个 key —— 数据库索引的底层基石</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-4-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：3 阶 B 树（2-3 树）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          B 树是一棵<strong>多路自平衡搜索树</strong>：每个节点可容纳多个 key 和多个孩子指针，所有叶子在同一层，树始终保持「矮胖」。
          以 <strong>m = 3 阶（2-3 树）</strong>为例：每个节点最多 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">m-1 = 2</code> 个 key、
          至少 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">⌈m/2⌉-1 = 1</code> 个 key（根除外）。分支因子大 → 高度极低 → 磁盘 IO 次数少。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="bt-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="22" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">3 阶 B 树：每个节点 1~2 个 key、2~3 个孩子，叶子全在同一层</text>

            <!-- 边（先画边，节点后画覆盖端点） -->
            <line x1="360" y1="74" x2="180" y2="142" stroke="#94a3b8" stroke-width="2" marker-end="url(#bt-arr)" />
            <line x1="360" y1="74" x2="540" y2="142" stroke="#94a3b8" stroke-width="2" marker-end="url(#bt-arr)" />
            <line x1="180" y1="178" x2="50" y2="234" stroke="#94a3b8" stroke-width="2" marker-end="url(#bt-arr)" />
            <line x1="180" y1="178" x2="180" y2="234" stroke="#94a3b8" stroke-width="2" marker-end="url(#bt-arr)" />
            <line x1="180" y1="178" x2="310" y2="234" stroke="#94a3b8" stroke-width="2" marker-end="url(#bt-arr)" />
            <line x1="540" y1="178" x2="470" y2="234" stroke="#94a3b8" stroke-width="2" marker-end="url(#bt-arr)" />
            <line x1="540" y1="178" x2="610" y2="234" stroke="#94a3b8" stroke-width="2" marker-end="url(#bt-arr)" />

            <!-- 根 [50] -->
            <rect x="338" y="38" width="44" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="360" y="56" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">50</text>

            <!-- 第二层 [20,35] [70] -->
            <rect x="142" y="142" width="76" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="167" y="160" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">20</text>
            <text x="193" y="160" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">35</text>
            <rect x="518" y="142" width="44" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="540" y="160" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">70</text>

            <!-- 叶子层 -->
            <rect x="28" y="234" width="44" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="50" y="252" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">10</text>
            <rect x="142" y="234" width="76" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="167" y="252" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">25</text>
            <text x="193" y="252" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">30</text>
            <rect x="272" y="234" width="76" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="297" y="252" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">40</text>
            <text x="323" y="252" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">45</text>
            <rect x="448" y="234" width="44" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="470" y="252" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">60</text>
            <rect x="572" y="234" width="76" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="597" y="252" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">80</text>
            <text x="623" y="252" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">90</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：3 阶 B 树结构 —— 叶子全在同一层，中间节点同时存 key 和孩子指针，key 之间保持有序</figcaption>
        </figure>

        <!-- 操作示意图：分裂 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：节点溢出 → 分裂（上提中间 key）</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">分裂前：叶子满 3 个 key（m=3 溢出）</p>
            <svg viewBox="0 0 240 110" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="36" width="200" height="40" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="55" y="56" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">10</text>
              <text x="120" y="56" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">20</text>
              <text x="185" y="56" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">30</text>
              <text x="120" y="20" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#d97706" font-weight="bold">中间 key = 20（要上提）</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">分裂后：20 上提为父，10/30 各成一节点</p>
            <svg viewBox="0 0 240 130" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="bt-sp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <line x1="120" y1="52" x2="60" y2="92" stroke="#94a3b8" stroke-width="2" marker-end="url(#bt-sp)" />
              <line x1="120" y1="52" x2="180" y2="92" stroke="#94a3b8" stroke-width="2" marker-end="url(#bt-sp)" />
              <rect x="98" y="16" width="44" height="36" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="120" y="34" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">20</text>
              <rect x="38" y="92" width="44" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="60" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">10</text>
              <rect x="158" y="92" width="44" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="180" y="110" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">30</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">中间 key 上提，左右两半各自成节点，树长高一层</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 定义 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          m 阶 B 树的严格定义
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一棵 <strong>m 阶（m-way）B 树</strong>满足以下五条性质，每一条都指向同一个目标——<strong>让树又矮又宽</strong>：
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <ol class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span>每个节点<strong>最多 m-1 个 key</strong>、最多 m 个孩子（key 之间、孩子之间都保持升序）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span>除根外的每个节点<strong>至少 ⌈m/2⌉-1 个 key</strong>、至少 ⌈m/2⌉ 个孩子（不能太「空」）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">3.</span><span><strong>所有叶子在同一层</strong>（绝对平衡，树高恒定）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">4.</span><span>根节点若非叶子，至少有 2 个孩子；根节点可以是 0 个 key（空树）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">5.</span><span>若某节点有 k 个 key，则它有 k+1 个孩子：第 i 个孩子子树的所有 key 都落在父节点第 i-1 与第 i 个 key 之间</span></li>
          </ol>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          关键数量关系：<strong>孩子数 = key 数 + 1</strong>。一个存满 2 个 key 的 3 阶节点，恰好有 3 个孩子指针，
          把整棵树的 key 划分成三个区间。
        </p>
        <div class="mb-4"><Code language="ts" :code="nodeCode" title="btree_node.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          B 树节点就像 <strong>React 的「列表虚拟化（windowing）」</strong>——每个「节点」一次性加载多个 item（key），
          减少滚动/翻页（磁盘 IO）次数。<br/>
          也像 <strong>分页接口</strong>：一页（一个 B 树节点）返回多条记录（多个 key），而不是每次只取一条；
          页内用二分查找，页与页之间靠指针跳转。节点装得越多（m 越大），翻页（磁盘 IO）就越少。
          </p>
        </aside>
      </section>

      <!-- 2. 插入与分裂 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          插入与分裂 —— 满节点上提中间 key
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          B 树插入永远<strong>先插入叶子</strong>，再从下往上「修复」：若某个节点 key 数超过 <code>m-1</code> 就<strong>分裂</strong>。
          分裂的规则固定且漂亮——把满节点的 <strong>中间 key 上提给父节点</strong>，左右两半各成一个孩子。
          如果父节点也被撑满，就继续向上分裂，最坏一直裂到根，树长高一层。
        </p>
        <div class="mb-4"><Code language="ts" :code="insertCode" title="btree_insert.ts" /></div>
        <h3 class="text-sm font-semibold text-slate-700 mb-2">插入 10, 20, 30, 40, 50 的过程推演</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">插入</th><th class="px-4 py-2 border border-slate-200 font-semibold">树结构变化</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">10</td><td class="px-4 py-2 border font-mono">[10]</td></tr>
              <tr><td class="px-4 py-2 border">20</td><td class="px-4 py-2 border font-mono">[10,20]</td></tr>
              <tr><td class="px-4 py-2 border">30</td><td class="px-4 py-2 border font-mono">[10,20,30] 溢出 → 分裂：根=[20]，左=[10] 右=[30]</td></tr>
              <tr><td class="px-4 py-2 border">40</td><td class="px-4 py-2 border font-mono">根=[20]，右=[30,40]</td></tr>
              <tr><td class="px-4 py-2 border">50</td><td class="px-4 py-2 border font-mono">右=[30,40,50] 溢出 → 分裂：根=[20,40]，孩子 [10] [30] [50]</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>插入时<strong>不要先往内部节点塞 key 再想怎么分</strong>——B 树的 key 是「分裂时被推上去的」，不是主动插进内部的。
          正确心智模型是：<strong>永远只往叶子插，满了就裂，中间 key 顺带往上一格</strong>。递归向上时，每个满节点都只把「自己的中间 key」上提，别把整块搬上去。</p>
        </aside>
      </section>

      <!-- 3. 删除 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          删除 —— 下溢时的「借」与「合并」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          删除是插入的镜像，难点在<strong>下溢（underflow）</strong>：删掉 key 后若某节点 key 数少于 <code>⌈m/2⌉-1</code>，必须修复。
          修复手段只有两种——<strong>向富余的兄弟借</strong>（旋转），或<strong>和兄弟合并</strong>。规则和插入一样，逐层向上。
        </p>
        <div class="mb-4"><Code language="ts" :code="deleteCode" title="btree_delete.ts" /></div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
            <p class="text-sm text-emerald-800"><strong>✅ 借（旋转）：</strong>左兄弟或右兄弟 key 数 &gt; 最小值时，把父节点的分隔 key 沉下来补位，再把兄弟最边上的 key 上提当新分隔 key。节点数不变，只在兄弟间「匀一匀」。</p>
          </aside>
          <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
            <p class="text-sm text-blue-800"><strong>💡 合并：</strong>兄弟也只剩最小 key 时，借不动了，就把当前节点 + 父节点的分隔 key + 兄弟<strong>三份并成一个节点</strong>，父节点少一个 key。这可能让父节点继续下溢，一路合并上去，树会变矮一层。</p>
          </aside>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          「借」就像 <strong>数组扩容时的均摊拷贝</strong>——容量不够时向旁边腾一腾位置，整体结构不变；<br/>
          「合并」就像 <strong>React 的树 diff 后卸载空子树</strong>——某个分支空了，就把它并回父级，避免留一堆稀疏的空壳节点。B 树用这两招保证节点永远不「空转」。
          </p>
        </aside>
      </section>

      <!-- 4. 为什么 B 树 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          为什么需要 B 树？—— 磁盘 IO 才是瓶颈
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          AVL/红黑树在<strong>内存</strong>里是王者，但数据库索引活在<strong>磁盘</strong>上。磁盘一次随机 IO 约 10ms，
          而内存访问是纳秒级——<strong>磁盘 IO 比内存慢 10 万倍以上</strong>。所以数据库优化指标不是「比较了多少次」，
          而是「<strong>读了几次磁盘</strong>」。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">对比项</th><th class="px-4 py-2 border border-slate-200 font-semibold">二叉搜索树（AVL/红黑树）</th><th class="px-4 py-2 border border-slate-200 font-semibold">B 树（m 阶）</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">每节点 key 数</td><td class="px-4 py-2 border font-mono">1</td><td class="px-4 py-2 border font-mono">⌈m/2⌉-1 ~ m-1（如 500~1000）</td></tr>
              <tr><td class="px-4 py-2 border">高度（100 万条）</td><td class="px-4 py-2 border font-mono text-red-600">~20 层</td><td class="px-4 py-2 border font-mono text-emerald-600">~3 层（m=1024 时）</td></tr>
              <tr><td class="px-4 py-2 border">磁盘 IO 次数</td><td class="px-4 py-2 border font-mono text-red-600">~20 次</td><td class="px-4 py-2 border font-mono text-emerald-600">~3 次</td></tr>
              <tr><td class="px-4 py-2 border">关键瓶颈</td><td class="px-4 py-2 border">树高 = IO 次数</td><td class="px-4 py-2 border">节点越大 IO 越少</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="ioCode" title="disk_io.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>一个 B 树节点的大小通常被设计成恰好填满<strong>一个磁盘页（Page，常见 4KB 或 16KB）</strong>。
          这样读一次磁盘 = 读一整页 = 读一个完整节点，把「查找路径上的节点数」压到最小。m 越大树越矮，但 m 太大也会让单个节点的内存内二分查找变慢——实践中按页大小反推 m，是工程上的最优解。</p>
        </aside>
      </section>

      <!-- 5. 陷阱 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          常见陷阱与避坑指南
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 1：搞混「孩子数」和「key 数」</strong><br/>
          一个节点的孩子数 = key 数 + 1，且孩子指针<strong>比 key 多一个</strong>。写分裂代码时最容易漏掉：满节点 m-1 个 key 时有 m 个孩子，分裂后左节点要带走左半边孩子、右节点带走右半边孩子，<strong>中间 key 不放任何孩子，它是上提的那一个</strong>。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 2：把 B 树当「平衡」来记却忘了「所有叶子同层」</strong><br/>
          B 树不是「大致平衡」，是<strong>绝对平衡</strong>——它只在「根分裂」时统一长高一层。任何一条从根到叶的路径长度都完全相同。面试/实现时若发现某条路径更短，说明分裂或合并写错了。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 3：删除只删 key 不处理下溢</strong><br/>
          删除后若节点 key 数跌破 ⌈m/2⌉-1，树就「失衡」了。很多人写完「借」忘了「合并」，结果遇到「兄弟也穷」时程序死循环或崩溃。正确顺序：先看兄弟能不能借，不能借才合并，合并后要记得递归检查父节点。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong><br/>
          1. 用「插入后分裂」「删除前合并」的预判法（preemptive）实现更简单、不易越界；<br/>
          2. 始终维护 <code>keys</code> 有序 + <code>children.length === keys.length + 1</code> 不变式；<br/>
          3. 分裂/合并只动「局部三个节点」（本节点、父、兄弟），别重排整棵树；<br/>
          4. 单元测试优先覆盖：连续升序插入（最坏路径）、随机删除到空、根分裂/根合并。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：插入导致分裂（中间 key 上提）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">逐次插入 key 到一棵 3 阶 B 树，观察<strong>满节点如何分裂</strong>：中间 key 变<strong>绿（上提）</strong>，左右两半各成一节点，满节点先标<strong>红</strong>。</p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ bnodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔑 已插入: {{ qi }}/{{ insertQueue.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @mousedown="doInsertNext" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">插入下一个 key</button>
          <button @mousedown="doAuto" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40">▶ 自动演示</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <template v-for="n in bnodes" :key="'e'+n.id">
                <v-line v-for="c in n.children" :key="'el'+n.id+'-'+c" :config="edgeCfg(n.id, c)" />
              </template>
              <v-rect v-for="n in bnodes" :key="n.id" :config="nodeRectCfg(n)" />
              <template v-for="n in bnodes" :key="'t'+n.id">
                <v-text v-for="k in n.keys" :key="n.id+'-'+k" :config="keyTextCfg(n, k)" />
              </template>
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>m 阶 B 树</strong>：每节点最多 m-1 个 key、至少 ⌈m/2⌉-1 个（根除外），孩子数 = key 数 + 1</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>绝对平衡</strong>：所有叶子同层，只在「根分裂」时统一长高</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>插入</strong>：只往叶子插，满了分裂，<strong>中间 key 上提</strong>给父节点，可能递归向上</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>删除</strong>：下溢时先「借」兄弟（旋转），借不动才「合并」，同样递归向上</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>核心价值</strong>：为磁盘而生——分支因子大 → 树极矮 → 磁盘 IO 次数少（100 万条只要 3 层）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>工程约定</strong>：节点大小 = 一个磁盘页大小，读一次 IO 读完一个完整节点</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下一步</strong>：B+ 树把「数据」全放叶子并用链表串联，进一步优化范围查询</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-3-balanced/dsa-4-3-3-treap" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Treap</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-4-btree/dsa-4-4-2-b-plus" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：B+ 树 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "m 阶定义" },
  { id: "sec-2", name: "插入与分裂" },
  { id: "sec-3", name: "删除借/合并" },
  { id: "sec-4", name: "为什么 B 树" },
  { id: "sec-5", name: "常见陷阱" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 B 树插入分裂动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const W = ref(760), H = ref(340)
const NODE_H = 44, KEY_W = 30, LEVEL_H = 100, TOP = 56

interface BNode {
  id: number
  keys: number[]
  children: number[]
  parent: number | null
  x: number
  y: number
  color: string
}
const bnodes = reactive<BNode[]>([])
let nextId = 100
const busy = ref(false), status = ref('')
const insertQueue = [10, 20, 30, 40, 50, 60, 70, 5, 15]
let qi = 0
const box = ref<HTMLDivElement>()

const nodeById = (id: number) => bnodes.find(n => n.id === id)!
const rootNode = () => bnodes.find(n => n.parent === null)

function resetTree() {
  bnodes.length = 0
  qi = 0
  bnodes.push({ id: nextId++, keys: [], children: [], parent: null, x: 0, y: TOP, color: C.cyan })
  layout()
}

function leafCount(n: BNode): number {
  if (n.children.length === 0) return 1
  return n.children.reduce((s, c) => s + leafCount(nodeById(c)), 0)
}
function nodeWidth(n: BNode) { return Math.max(56, n.keys.length * KEY_W + 16) }

function layout() {
  const root = rootNode()
  if (!root) return
  const place = (n: BNode, left: number, right: number, y: number) => {
    n.x = (left + right) / 2
    n.y = y
    if (n.children.length === 0) return
    const total = right - left
    let cur = left
    n.children.forEach(cid => {
      const c = nodeById(cid)
      const w = total * leafCount(c) / leafCount(n)
      place(c, cur, cur + w, y + LEVEL_H)
      cur += w
    })
  }
  place(root, 40, W.value - 40, TOP)
}

function nodeRectCfg(n: BNode) {
  const w = nodeWidth(n)
  return { x: n.x - w / 2, y: n.y - NODE_H / 2, width: w, height: NODE_H,
    fill: n.color, cornerRadius: 6, stroke: '#0891b2', strokeWidth: 1.5,
    shadowColor: 'rgba(0,0,0,.1)', shadowBlur: 4, shadowOffsetY: 2 }
}
function keyTextCfg(n: BNode, k: number) {
  const w = nodeWidth(n)
  const ki = n.keys.indexOf(k)
  return { x: n.x - w / 2 + 8 + ki * KEY_W, y: n.y - NODE_H / 2, width: KEY_W, height: NODE_H,
    text: String(k), fontSize: 14, fontFamily: 'monospace', fontStyle: 'bold', fill: '#fff',
    align: 'center', verticalAlign: 'middle' }
}
function edgeCfg(a: number, b: number) {
  const pa = nodeById(a), pb = nodeById(b)
  return { points: [pa.x, pa.y + NODE_H / 2, pb.x, pb.y - NODE_H / 2], stroke: '#94a3b8', strokeWidth: 2 }
}

const d = (ms: number) => new Promise(r => setTimeout(r, ms))

async function findLeaf(root: BNode, key: number): Promise<BNode> {
  let n = root
  while (n.children.length > 0) {
    n.color = C.orange
    status.value = `定位 ${key}：经过节点 [${n.keys.join(',')}]`
    await d(360)
    n.color = C.cyan
    let i = 0
    while (i < n.keys.length && key > n.keys[i]) i++
    n = nodeById(n.children[i])
  }
  n.color = C.orange
  await d(200)
  return n
}

function insertSorted(arr: number[], k: number) { arr.push(k); arr.sort((a, b) => a - b) }

async function splitNode(n: BNode) {
  const mid = 1
  const midKey = n.keys[mid]
  status.value = `节点 [${n.keys.join(',')}] 满 3 个 key → 上提中间 key ${midKey}`
  n.color = C.red
  await d(650)

  const leftKeys = n.keys.slice(0, mid)
  const rightKeys = n.keys.slice(mid + 1)
  const leftChildren = n.children.slice(0, mid + 1)
  const rightChildren = n.children.slice(mid + 1)

  const right: BNode = { id: nextId++, keys: rightKeys, children: rightChildren, parent: n.parent, x: 0, y: 0, color: C.green }
  rightChildren.forEach(cid => { nodeById(cid).parent = right.id })
  n.keys = leftKeys
  n.children = leftChildren
  bnodes.push(right)

  if (n.parent === null) {
    const newRoot: BNode = { id: nextId++, keys: [midKey], children: [n.id, right.id], parent: null, x: 0, y: 0, color: C.orange }
    n.parent = newRoot.id
    right.parent = newRoot.id
    bnodes.push(newRoot)
  } else {
    const parent = nodeById(n.parent)
    let i = 0
    while (i < parent.keys.length && parent.keys[i] < midKey) i++
    parent.keys.splice(i, 0, midKey)
    parent.children.splice(i + 1, 0, right.id)
    right.parent = parent.id
    parent.color = C.orange
  }
  layout()
  await d(520)
  n.color = C.cyan
  right.color = C.cyan
  if (n.parent !== null) nodeById(n.parent).color = C.cyan
}

async function insertOne(key: number) {
  const root = rootNode()!
  const leaf = await findLeaf(root, key)
  insertSorted(leaf.keys, key)
  leaf.color = C.green
  layout()
  await d(380)
  leaf.color = C.cyan
  let cur: BNode | null = leaf
  while (cur && cur.keys.length > 2) {
    const parentId = cur.parent
    await splitNode(cur)
    cur = parentId !== null ? nodeById(parentId) : null
  }
  layout()
}

async function doInsertNext() {
  if (busy.value) return
  if (qi >= insertQueue.length) { status.value = '已全部插入，点击 ↺ 重置'; return }
  busy.value = true
  const key = insertQueue[qi++]
  status.value = `插入 ${key}`
  await insertOne(key)
  await d(150)
  status.value = `插入 ${key} 完成`
  busy.value = false
}

async function doAuto() {
  if (busy.value) return
  busy.value = true
  while (qi < insertQueue.length) {
    const key = insertQueue[qi++]
    status.value = `插入 ${key}`
    await insertOne(key)
    await d(100)
  }
  status.value = '✅ 全部插入完成，注意观察每次分裂时中间 key 上提'
  busy.value = false
}

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
const nodeCode = `// ===== m 阶 B 树节点定义（以 m=3 即 2-3 树为例）=====
const M = 3                        // 阶数
const MAX_KEYS = M - 1             // 每个节点最多 2 个 key
const MIN_KEYS = Math.ceil(M / 2) - 1  // 非根节点至少 1 个 key

interface BTreeNode {
  keys: number[]          // 有序 key 数组（升序）
  children: BTreeNode[]   // 孩子数组，长度 = keys.length + 1
  isLeaf: boolean         // 叶子节点没有孩子
}

// 不变式（写任何操作都要守住）：
// 1) keys 严格升序
// 2) children.length === keys.length + 1
// 3) 第 i 个孩子子树的所有 key 落在 (keys[i-1], keys[i]) 开区间内
// 4) 所有叶子在同一层

// ===== 查找：沿根到叶，节点内二分 =====
function search(node: BTreeNode | null, key: number): boolean {
  if (!node) return false
  let i = 0
  // 找到第一个 >= key 的下标
  while (i < node.keys.length && key > node.keys[i]) i++
  if (i < node.keys.length && key === node.keys[i]) return true
  // 没命中就顺着指针下沉到对应孩子
  return node.isLeaf ? false : search(node.children[i], key)
}
// 复杂度 O(log_m n)：分支因子 m 越大，树越矮，磁盘 IO 越少`

const insertCode = `// ===== 插入：先插叶子，再向上分裂 =====
function insert(root: BTreeNode | null, key: number): BTreeNode {
  if (!root) return { keys: [key], children: [], isLeaf: true }

  insertNonFull(root, key)

  // 根节点也满了 → 分裂根，树长高一层
  if (root.keys.length > MAX_KEYS) {
    const oldRoot = root
    const mid = Math.floor(oldRoot.keys.length / 2)
    const newRoot: BTreeNode = { keys: [oldRoot.keys[mid]], children: [], isLeaf: false }
    // 拆成左右两半挂到新根下
    const left: BTreeNode = { keys: oldRoot.keys.slice(0, mid), children: oldRoot.children.slice(0, mid + 1), isLeaf: oldRoot.isLeaf }
    const right: BTreeNode = { keys: oldRoot.keys.slice(mid + 1), children: oldRoot.children.slice(mid + 1), isLeaf: oldRoot.isLeaf }
    newRoot.children = [left, right]
    return newRoot
  }
  return root
}

// 往「未满」的节点里插（保证 node.keys.length <= MAX_KEYS 再进来）
function insertNonFull(node: BTreeNode, key: number): void {
  let i = node.keys.length - 1

  if (node.isLeaf) {
    // 叶子：找到位置，直接插入（保持有序）
    node.keys.push(key)
    node.keys.sort((a, b) => a - b)
  } else {
    // 内部节点：定位到孩子下标，递归插入
    while (i >= 0 && key < node.keys[i]) i--
    i++
    // 若目标孩子已满，先分裂它，再决定往左半还是右半走
    if (node.children[i].keys.length > MAX_KEYS) {
      splitChild(node, i)
      if (key > node.keys[i]) i++
    }
    insertNonFull(node.children[i], key)
  }
}

// 分裂父节点的第 i 个满孩子：中间 key 上提到父节点
function splitChild(parent: BTreeNode, i: number): void {
  const full = parent.children[i]
  const mid = Math.floor(full.keys.length / 2)
  const midKey = full.keys[mid]

  // 右兄弟拿走 mid 右边的 key 和孩子
  const right: BTreeNode = { keys: full.keys.slice(mid + 1), children: full.children.slice(mid + 1), isLeaf: full.isLeaf }
  // 左节点（full 原地）只保留 mid 左边的部分
  full.keys = full.keys.slice(0, mid)
  full.children = full.children.slice(0, mid + 1)

  // 中间 key 上提到父节点，右兄弟插到 parent.children[i+1]
  parent.keys.splice(i, 0, midKey)
  parent.children.splice(i + 1, 0, right)
}

// 手动推演：插入 10,20,30
// 插 10 → 根=[10]
// 插 20 → 根=[10,20]
// 插 30 → 根=[10,20,30] 溢出 → 新根=[20]，左=[10]，右=[30]
// 关键：中间 key=20 上提，左右各成一个节点`

const deleteCode = `// ===== 删除：删叶子，下溢时「借」或「合并」=====
function remove(root: BTreeNode, key: number): BTreeNode | null {
  if (!root) return null
  removeIn(root, key)
  // 根空了但有孩子 → 用唯一的孩子当新根（树变矮）
  if (root.keys.length === 0 && !root.isLeaf) {
    return root.children[0]
  }
  return root
}

function removeIn(node: BTreeNode, key: number): void {
  let i = 0
  while (i < node.keys.length && key > node.keys[i]) i++

  if (i < node.keys.length && key === node.keys[i]) {
    if (node.isLeaf) {
      node.keys.splice(i, 1)           // 情况1：key 在叶子，直接删
    } else {
      // 情况2：key 在内部节点 → 用前驱（左子树最大）替换，转成删叶子
      const pred = maxKey(node.children[i])
      node.keys[i] = pred
      removeIn(node.children[i], pred)
    }
  } else if (!node.isLeaf) {
    // 情况3：key 不在本节点，递归到孩子
    removeIn(node.children[i], key)
  }

  // 修复下溢：非根节点 key 数 < MIN_KEYS
  if (!node.isLeaf && node.keys.length < MIN_KEYS) {
    rebalance(node, i)
  }
}

function rebalance(node: BTreeNode, idx: number): void {
  const left = node.children[idx - 1]
  const right = node.children[idx + 1]

  // 优先借：右边兄弟富余 → 旋转（父 key 下沉，右兄弟最左 key 上提）
  if (right && right.keys.length > MIN_KEYS) {
    const borrow = right.keys.shift()!
    node.keys[idx] = ... // 交换父子分隔 key
  }
  // 左边兄弟富余 → 对称旋转
  else if (left && left.keys.length > MIN_KEYS) {
    // 对称处理
  }
  // 都借不动 → 合并：本节点 + 父分隔 key + 兄弟，三份并成一个
  else {
    // merge 后父节点少一个 key，可能继续上溢，交给上层递归修复
  }
}

function maxKey(node: BTreeNode): number {
  while (!node.isLeaf) node = node.children[node.children.length - 1]
  return node.keys[node.keys.length - 1]
}
// 记忆口诀：删叶子 → 下溢就借（兄弟富余）→ 借不动就合并（并父子兄三份）→ 递归向上`

const ioCode = `// ===== 为什么 B 树比 BST 更适合磁盘 =====
// 假设：磁盘页 4KB，一个 key + 孩子指针共占 16 字节
const PAGE_SIZE = 4096
const ENTRY_SIZE = 16
const m = Math.floor(PAGE_SIZE / ENTRY_SIZE)  // 每页可存约 256 个 key

// 满二叉树高度 vs m 阶 B 树高度（100 万条记录）
const n = 1_000_000
const bstHeight = Math.ceil(Math.log2(n + 1))      // ≈ 20 层
const btreeHeight = Math.ceil(Math.log(n + 1) / Math.log(m))  // ≈ 4 层

console.log(\`BST 高度 ≈ \${bstHeight} 层 → 每次查找约 \${bstHeight} 次磁盘 IO\`)
console.log(\`B  树高度 ≈ \${btreeHeight} 层 → 每次查找约 \${btreeHeight} 次磁盘 IO\`)
// 输出:
// BST 高度 ≈ 20 层 → 每次查找约 20 次磁盘 IO
// B  树高度 ≈ 4 层 → 每次查找约 4 次磁盘 IO
// 20 次 × 10ms = 200ms vs 4 次 × 10ms = 40ms —— 5 倍差距，且随数据量拉大

// ─── 心智模型 ───
// 内存里：比较次数决定性能 → 用低高度的 AVL/红黑树
// 磁盘里：IO 次数决定性能     → 用大分支因子的 B 树
// 一次磁盘 IO ≈ 10ms，一次内存访问 ≈ 100ns，差了 10 万倍
// 所以「少读几次盘」远比「少比较几次」重要`
</script>
