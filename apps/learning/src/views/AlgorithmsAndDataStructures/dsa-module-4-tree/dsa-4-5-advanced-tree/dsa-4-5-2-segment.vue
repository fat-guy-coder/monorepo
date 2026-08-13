<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌲 线段树 Segment Tree：区间查询与更新</h1>
          <p class="text-sm text-slate-500 mt-1">把数组区间拆成树——区间查询/单点更新都是 O(log n)</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-5-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：线段树
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          线段树是一棵<strong>满二叉树</strong>，每个节点代表数组的一个<strong>区间 [l, r]</strong>，节点里存这个区间的<strong>聚合值</strong>（这里是区间和）。
          根节点覆盖整个数组，每个非叶节点把区间<strong>对半分成左右两半</strong>，直到叶子节点只剩一个元素。
          这样任何区间都能被<strong>至多 O(log n) 个节点</strong>完整拼出来。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 360" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="sg-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">数组 [1,3,5,7] 的线段树（区间和）—— 每个节点 = [区间] : 和</text>

            <!-- 边 -->
            <line x1="360" y1="82" x2="220" y2="156" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-arr)" />
            <line x1="360" y1="82" x2="500" y2="156" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-arr)" />
            <line x1="220" y1="182" x2="120" y2="256" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-arr)" />
            <line x1="220" y1="182" x2="320" y2="256" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-arr)" />
            <line x1="500" y1="182" x2="420" y2="256" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-arr)" />
            <line x1="500" y1="182" x2="580" y2="256" stroke="#94a3b8" stroke-width="2" marker-end="url(#sg-arr)" />

            <!-- 内部节点（cyan rect） -->
            <rect x="306" y="54" width="108" height="48" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="360" y="70" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#cffafe">[0,3]</text>
            <text x="360" y="90" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">16</text>

            <rect x="166" y="158" width="108" height="48" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="220" y="174" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#cffafe">[0,1]</text>
            <text x="220" y="194" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>

            <rect x="446" y="158" width="108" height="48" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="500" y="174" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#cffafe">[2,3]</text>
            <text x="500" y="194" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">12</text>

            <!-- 叶子节点（green rect） -->
            <rect x="66" y="258" width="108" height="48" rx="8" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="120" y="274" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#052e16">[0,0]</text>
            <text x="120" y="294" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">1</text>

            <rect x="266" y="258" width="108" height="48" rx="8" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="320" y="274" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#052e16">[1,1]</text>
            <text x="320" y="294" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>

            <rect x="366" y="258" width="108" height="48" rx="8" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="420" y="274" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#052e16">[2,2]</text>
            <text x="420" y="294" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>

            <rect x="526" y="258" width="108" height="48" rx="8" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <text x="580" y="274" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#052e16">[3,3]</text>
            <text x="580" y="294" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">7</text>

            <!-- 底部数组 -->
            <text x="16" y="340" font-size="11" font-family="monospace" fill="#64748b">原数组: [1, 3, 5, 7]   —— 叶子节点与原数组元素一一对应</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：线段树结构 —— 内部节点存区间聚合值（和），叶子存单个元素</figcaption>
        </figure>

        <!-- 操作示意图：查询 vs 更新 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：区间查询 [1,2] 与 单点更新 arr[2]</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">查询 sum[1,2] —— 拆成两个完全覆盖的节点</p>
            <svg viewBox="0 0 340 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="50" width="120" height="40" rx="8" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="80" y="70" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">[1,1]=3</text>
              <rect x="180" y="50" width="120" height="40" rx="8" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="240" y="70" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">[2,2]=5</text>
              <text x="16" y="120" font-size="11" font-family="monospace" fill="#16a34a">3 + 5 = 8  —— 只需 2 个节点</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">区间被递归分解，完全覆盖的节点直接取值</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">更新 arr[2] = 6 —— 自底向上回溯更新祖先</p>
            <svg viewBox="0 0 340 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="130" y="20" width="120" height="40" rx="8" fill="#ef4444" stroke="#dc2626" stroke-width="1.5" />
              <text x="190" y="40" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">[2,3]=13</text>
              <rect x="20" y="90" width="120" height="40" rx="8" fill="#ef4444" stroke="#dc2626" stroke-width="1.5" />
              <text x="80" y="110" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">[2,2]=6</text>
              <rect x="180" y="90" width="120" height="40" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="240" y="110" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">[3,3]=7</text>
              <text x="16" y="138" font-size="11" font-family="monospace" fill="#dc2626">叶子 5→6，祖先 [2,3] 重算为 13</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">只更新受影响路径上的 O(log n) 个节点</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 为什么需要线段树 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要线段树？前缀和不够用了吗？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          如果只需要<strong>静态的区间和查询</strong>，前缀和（prefix sum）数组就够了：<code>sum(l,r) = pre[r+1] - pre[l]</code>，O(1) 查询。
          但一旦数组需要<strong>动态修改</strong>（单点更新），前缀和就崩了——改一个元素，后面所有前缀和都要重算，更新变成 O(n)。
        </p>
        <p class="text-slate-600 mb-4 leading-relaxed">
          线段树的价值正在于<strong>「查询和更新都要快」</strong>：单点更新 O(log n)、区间查询 O(log n)，而且能扩展支持区间最值、区间修改（懒标记）等更复杂的聚合。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">操作</th><th class="px-4 py-2 border border-slate-200 font-semibold">朴素数组</th><th class="px-4 py-2 border border-slate-200 font-semibold">前缀和</th><th class="px-4 py-2 border border-slate-200 font-semibold">线段树</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">区间查询</td><td class="px-4 py-2 border font-mono text-red-600">O(n)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(log n)</td></tr>
              <tr><td class="px-4 py-2 border">单点更新</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td><td class="px-4 py-2 border font-mono text-red-600">O(n)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(log n)</td></tr>
              <tr><td class="px-4 py-2 border">区间最值/区间修改</td><td class="px-4 py-2 border font-mono text-red-600">O(n)</td><td class="px-4 py-2 border font-mono text-red-600">❌ 不支持</td><td class="px-4 py-2 border font-mono text-emerald-600">✅ 支持</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          线段树就像前端框架的<strong>「按需计算 + 缓存失效」</strong>机制。<br/>
          查询区间和 ≈ <code>useMemo</code>——把计算结果缓存起来，下次直接读。<br/>
          单点更新 ≈ 某个 <code>state</code> 变了之后，<strong>只重算受影响的派生值</strong>（依赖链上的部分），而不是全局重算。<br/>
          线段树的「更新回溯路径」就是一条<strong>依赖链</strong>——叶子变了，只有它到根这条链上的祖先需要重新聚合。
          </p>
        </aside>
      </section>

      <!-- 2. 建树 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          建树：递归对半划分区间
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          线段树常用一个 <code>4×n</code> 大小的数组存储（满二叉树最坏 4n 个节点），
          节点 <code>node</code> 代表区间 <code>[l, r]</code>，左孩子 <code>2·node</code>、右孩子 <code>2·node+1</code>。
          建树用<strong>递归自底向上</strong>：先建左右子树，再合并它们的聚合值。
        </p>
        <div class="mb-4"><Code language="ts" :code="buildCode" title="segment_build.ts" /></div>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>建树执行流程：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>根节点 <code>build(1, 0, n-1)</code> —— 覆盖整个数组</li>
          <li>若 <code>l === r</code>（叶子），直接取 <code>arr[l]</code> 存进去，返回</li>
          <li>否则算中点 <code>mid = (l+r) &gt;&gt; 1</code>，递归建左右子树</li>
          <li>回来后 <code>tree[node] = tree[left] + tree[right]</code> 合并聚合值</li>
        </ol>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 聚合运算可替换：</strong>节点里存的「和」可以换成最大值 <code>max</code>、最小值 <code>min</code>、最大公约数 <code>gcd</code> 等任何<strong>可结合的二元运算</strong>。只要改合并那一行 <code>tree[node] = merge(tree[left], tree[right])</code>，整套框架完全复用。</p>
        </aside>
      </section>

      <!-- 3. 区间查询 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          区间查询：三种重叠情况
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          查询 <code>query(l, r)</code> 从根往下递归，每个节点相对查询区间只有三种情况：
          <strong>完全覆盖</strong>（直接返回节点值）、<strong>完全不重叠</strong>（返回 0 剪枝）、<strong>部分重叠</strong>（继续向下分解）。
        </p>
        <div class="mb-4"><Code language="ts" :code="queryCode" title="segment_query.ts" /></div>

        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>三种重叠情况的判断：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-emerald-500 mt-1">▸</span><span><strong>完全覆盖</strong> <code>l &lt;= nl &amp;&amp; nr &lt;= r</code> —— 节点区间整个在查询区间内，直接返回聚合值</span></li>
            <li class="flex items-start gap-2"><span class="text-red-500 mt-1">▸</span><span><strong>完全不重叠</strong> <code>nr &lt; l || r &lt; nl</code> —— 直接返回单位元（和返回 0，最值返回 -Inf）</span></li>
            <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>部分重叠</strong> —— 其他情况，拆成左右两半分别查询再合并</span></li>
          </ul>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 为什么是 O(log n)：</strong>虽然看起来每个区间都可能分叉，但「部分重叠」的节点每次最多产生两个分支，而完全重叠的节点立刻返回。数学上，任意区间最多被 <strong>O(log n)</strong> 个节点完整覆盖——这就是线段树高效的本质。</p>
        </aside>
      </section>

      <!-- 4. 单点更新 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          单点更新：沿路径回溯
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          更新 <code>arr[idx]</code> 时，先递归找到叶子节点改值，然后<strong>回溯的每一步都重新合并</strong>左右孩子，
          把影响一路传播到根。整条路径长度就是树高 O(log n)。
        </p>
        <div class="mb-4"><Code language="ts" :code="updateCode" title="segment_update.ts" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见陷阱：</strong><br/>
          ① 更新完叶子后<strong>忘记回溯重算</strong>——很多新手只改了叶子，祖先节点还留着旧值。<br/>
          ② 用 <code>diff = newVal - arr[idx]</code> 增量更新时，<strong>必须先更新 arr[idx] 本身</strong>，否则下次 diff 算错。<br/>
          ③ 数组大小开 <code>n</code> 而不是 <code>4×n</code>——最坏情况（n 不是 2 的幂）满二叉树节点数接近 4n，会越界。
          </p>
        </aside>
      </section>

      <!-- 5. 懒标记 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          进阶：懒标记 Lazy Propagation（区间修改）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          如果要对<strong>整个区间</strong>做修改（比如「把 [l, r] 都 +3」），朴素做法要 O(n) 个节点逐一更新。
          <strong>懒标记</strong>的思路是：更新到某个完全覆盖的节点时<strong>先记账不递归</strong>，把「要加的值」存在该节点的 lazy 标记里，
          等<strong>下次真正访问它的孩子时再下放（pushdown）</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="lazyCode" title="segment_lazy.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          懒标记就像 React 的 <strong>批处理更新（batching）</strong> 或 <strong>脏标记（dirty flag）</strong>。<br/>
          你不是立即执行每次修改，而是先<strong>记下「这里有改动」</strong>，等真正需要读结果时再一次性计算。<br/>
          也像数据库的 <strong>Write-Ahead Log</strong>——先把操作记下来，必要时再应用到实际数据。
          </p>
        </aside>
      </section>

      <!-- 6. 常见陷阱 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          完整实现 与 常见陷阱
        </h2>
        <div class="mb-4"><Code language="ts" :code="fullCode" title="segment_full.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱清单：</strong><br/>
          ① <strong>中点用 (l+r)&gt;&gt;1 而非 (l+r)/2</strong>——后者在 l+r 很大时可能溢出（虽然 JS 数字是 64 位浮点，但保持习惯）。<br/>
          ② <strong>递归深度</strong>——树高 O(log n)，递归栈不会溢出，放心用递归。<br/>
          ③ <strong>聚合运算要有单位元</strong>——和是 0，最值是 ±Infinity，GCD 是 0。选错单位元结果就错了。<br/>
          ④ <strong>区间修改必须 pushdown</strong>——懒标记忘记下放，查询会漏掉未应用的修改。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：区间查询分解 与 单点更新回溯
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          上方是线段树（内部节点存区间和，叶子对齐下方数组）。<strong>查询</strong>时橙色=部分重叠（继续分解）、绿色=完全覆盖（直接取）、灰色=不重叠（剪枝）。
          <strong>更新</strong>时红色=被修改的叶子，绿色=回溯重算的祖先。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 数组长度: {{ n }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">🌳 树节点数: {{ sNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <span class="text-xs text-slate-500">查询 [</span>
          <input v-model.number="qlInp" type="number" min="0" :max="n-1"
            class="w-14 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition-shadow" />
          <span class="text-xs text-slate-500">,</span>
          <input v-model.number="qrInp" type="number" min="0" :max="n-1"
            class="w-14 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition-shadow" />
          <span class="text-xs text-slate-500">]</span>
          <button @mousedown="doQuery" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm">🔍 区间查询</button>
          <span class="text-xs text-slate-500 ml-2">更新 idx</span>
          <input v-model.number="upIdxInp" type="number" min="0" :max="n-1"
            class="w-14 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-shadow" />
          <span class="text-xs text-slate-500">=</span>
          <input v-model.number="upValInp" type="number"
            class="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition-shadow" />
          <button @mousedown="doUpdate" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:border-green-300 hover:shadow-sm">✏️ 单点更新</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="(e,i) in sEdges" :key="'e'+i" :config="sEdgeCfg(e)" />
              <v-circle v-for="nd in sNodes" :key="'c'+nd.id" :config="sCircleCfg(nd)" />
              <v-text v-for="nd in sNodes" :key="'t'+nd.id" :config="sTextCfg(nd)" />
              <v-text v-for="nd in sNodes" :key="'r'+nd.id" :config="sRangeCfg(nd)" />
              <v-rect v-for="(b,i) in bars" :key="'b'+i" :config="barCfg(i)" />
              <v-text v-for="(b,i) in bars" :key="'bv'+i" :config="barTextCfg(i)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>线段树 = 满二叉树</strong>，节点代表区间，存聚合值（和/最值/gcd）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三种重叠判断</strong>：完全覆盖（取）/ 不重叠（剪枝）/ 部分重叠（分解）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>区间查询 O(log n)</strong>——任意区间最多被 O(log n) 个节点完整覆盖</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>单点更新 O(log n)</strong>——改叶子后沿路径回溯重算祖先</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>懒标记</strong>让区间修改也变成 O(log n)——先记账，访问时再下放</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>vs 前缀和：</strong>前缀和查询 O(1) 但更新 O(n)；线段树查询更新都是 O(log n)，还能做区间修改/最值</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-5-advanced-tree/dsa-4-5-1-trie" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：字典树 Trie</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-5-advanced-tree/dsa-4-5-3-fenwick" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：树状数组 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// ===== 🎬 线段树动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H = ref(420), W = ref(700), R = 17, LEVEL_H = 74, TOP = 48
const n = 6
const SARR = [1, 3, 5, 7, 9, 11]
const arr = reactive<number[]>([...SARR])
interface SNode { id:number; l:number; r:number; sum:number; depth:number; x:number; y:number; color:string; left:number|null; right:number|null }
const sNodes = reactive<SNode[]>([])
const sEdges = reactive<{a:number; b:number}[]>([])
const bars = reactive<{val:number; color:string}[]>([])
const busy = ref(false), status = ref('')
const qlInp = ref(1), qrInp = ref(3), upIdxInp = ref(2), upValInp = ref(6)
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r,ms))

let maxDepth = 0
function buildTree(l:number, r:number, depth:number): number {
  maxDepth = Math.max(maxDepth, depth)
  const id = sNodes.length
  sNodes.push({ id, l, r, sum:0, depth, x:0, y:0, color:C.cyan, left:null, right:null })
  let sum = 0
  if (l === r) {
    sum = arr[l]
  } else {
    const mid = (l + r) >> 1
    const li = buildTree(l, mid, depth + 1)
    const ri = buildTree(mid + 1, r, depth + 1)
    sNodes[id].left = li; sNodes[id].right = ri
    sEdges.push({ a:id, b:li }); sEdges.push({ a:id, b:ri })
    sum = sNodes[li].sum + sNodes[ri].sum
  }
  sNodes[id].sum = sum
  return id
}
function sLayout() {
  const slot = Math.min(96, (W.value - 60) / n)
  const BX = 30
  for (const nd of sNodes) {
    nd.x = BX + ((nd.l + nd.r) / 2) * slot
    nd.y = TOP + nd.depth * LEVEL_H
  }
}
function barBase() { return TOP + maxDepth * LEVEL_H + 56 }
function barCfg(i:number) {
  const slot = Math.min(96, (W.value - 60) / n)
  const BX = 30
  const base = barBase()
  const maxV = Math.max(...arr, 1)
  const h = Math.max(20, (arr[i] / maxV) * 50)
  return { x: BX + i * slot + 8, y: base - h, width: slot - 16, height: h, fill: bars[i]?.color ?? C.green, cornerRadius: [4,4,0,0], stroke: '#94a3b8', strokeWidth: 1 }
}
function barTextCfg(i:number) {
  const slot = Math.min(96, (W.value - 60) / n)
  const BX = 30
  const base = barBase()
  return { x: BX + i * slot + 8, y: base - 22, width: slot - 16, text: String(arr[i]), fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: '#fff', align: 'center', verticalAlign: 'middle' }
}
function sEdgeCfg(e:{a:number; b:number}) {
  const a = sNodes[e.a], b = sNodes[e.b]
  return { points: [a.x, a.y + R, b.x, b.y - R], stroke: C.muted, strokeWidth: 1.5 }
}
function sCircleCfg(nd:SNode) {
  const isLeaf = nd.l === nd.r
  return { x: nd.x, y: nd.y, radius: R, fill: nd.color, stroke: isLeaf ? '#22c55e' : '#0891b2', strokeWidth: 1.5, shadowColor:'rgba(0,0,0,.1)', shadowBlur:3 }
}
function sTextCfg(nd:SNode) {
  return { x: nd.x - R, y: nd.y - R, width: R*2, height: R*2, text: String(nd.sum), fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: nd.color === C.ghost ? C.muted : '#fff', align: 'center', verticalAlign: 'middle' }
}
function sRangeCfg(nd:SNode) {
  const label = nd.l === nd.r ? `[${nd.l}]` : `[${nd.l},${nd.r}]`
  return { x: nd.x - 40, y: nd.y + R + 2, width: 80, text: label, fontSize: 9, fontFamily: 'monospace', fill: C.muted, align: 'center' }
}

function resetColors() { for (const nd of sNodes) nd.color = C.cyan }

async function doQuery() {
  if (busy.value) return
  const l = qlInp.value, r = qrInp.value
  if (isNaN(l) || isNaN(r) || l < 0 || r >= n || l > r) { status.value = '查询区间无效'; return }
  busy.value = true; resetColors(); status.value = `查询 sum[${l},${r}]...`
  try {
    async function q(nodeId:number, nl:number, nr:number): Promise<number> {
      const nd = sNodes[nodeId]
      if (nr < l || r < nl) { nd.color = C.ghost; return 0 }
      if (l <= nl && nr <= r) {
        nd.color = C.green; status.value = `[${nl},${nr}] 完全覆盖 → +${nd.sum}`; await d(500)
        return nd.sum
      }
      nd.color = C.orange; status.value = `[${nl},${nr}] 部分重叠 → 向下分解`; await d(450)
      const mid = (nl + nr) >> 1
      const ls = await q(nd.left!, nl, mid)
      const rs = await q(nd.right!, mid + 1, nr)
      nd.color = C.cyan
      return ls + rs
    }
    const result = await q(0, 0, n - 1)
    status.value = `✅ sum[${l},${r}] = ${result}`
  } finally {
    await d(300); busy.value = false
  }
}

async function doUpdate() {
  if (busy.value) return
  const idx = upIdxInp.value, val = upValInp.value
  if (isNaN(idx) || isNaN(val) || idx < 0 || idx >= n) { status.value = '更新参数无效'; return }
  busy.value = true; resetColors(); status.value = `更新 arr[${idx}] = ${val}...`
  try {
    async function upd(nodeId:number) {
      const nd = sNodes[nodeId]
      if (nd.l === nd.r) {
        nd.color = C.red; status.value = `修改叶子 [${nd.l}] ${arr[nd.l]} → ${val}`; await d(500)
        arr[nd.l] = val; nd.sum = val; bars[nd.l].color = C.red
        nd.color = C.green; await d(400)
        return
      }
      nd.color = C.orange; await d(200)
      const mid = (nd.l + nd.r) >> 1
      if (idx <= mid) await upd(nd.left!)
      else await upd(nd.right!)
      nd.sum = sNodes[nd.left!].sum + sNodes[nd.right!].sum
      nd.color = C.green; status.value = `回溯重算 [${nd.l},${nd.r}] = ${nd.sum}`; await d(450)
    }
    await upd(0)
    status.value = `✅ 更新完成，根节点和 = ${sNodes[0].sum}`
    for (let i = 0; i < n; i++) bars[i].color = C.green
  } finally {
    await d(300); busy.value = false
  }
}

function doReset() {
  arr.length = 0; arr.push(...SARR)
  bars.length = 0; SARR.forEach(v => bars.push({ val: v, color: C.green }))
  sNodes.length = 0; sEdges.length = 0; maxDepth = 0
  buildTree(0, n - 1, 0); sLayout(); status.value = ''
}

let ro: ResizeObserver|null = null
onMounted(() => {
  doReset()
  if (box.value) { W.value = box.value.clientWidth; sLayout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 200) { W.value = w; sLayout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== navList =====
const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "为什么需要线段树" },
  { id: "sec-2", name: "建树" },
  { id: "sec-3", name: "区间查询" },
  { id: "sec-4", name: "单点更新" },
  { id: "sec-5", name: "懒标记" },
  { id: "sec-6", name: "完整实现与陷阱" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

const buildCode = `// ===== 线段树建树（区间和）=====
class SegmentTree {
    private tree: number[]   // 大小 4*n
    private arr: number[]
    private n: number

    constructor(arr: number[]) {
        this.arr = arr
        this.n = arr.length
        this.tree = new Array(4 * arr.length).fill(0)
        this.build(1, 0, arr.length - 1)   // 根节点编号 1
    }

    // node 是节点编号，[l, r] 是它代表的区间
    private build(node: number, l: number, r: number): void {
        if (l === r) {
            this.tree[node] = this.arr[l]   // 叶子：直接取数组元素
            return
        }
        const mid = (l + r) >> 1
        this.build(node * 2, l, mid)          // 左孩子 2*node
        this.build(node * 2 + 1, mid + 1, r)  // 右孩子 2*node+1
        this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1]  // 合并
    }
}

// 建树时间 O(n)，空间 O(4n)
// 手动模拟 arr=[1,3,5,7]:
//   build(1,0,3) mid=1
//     build(2,0,1) mid=0
//       build(4,0,0)=1  build(5,1,1)=3 → tree[2]=4
//     build(3,2,3) mid=2
//       build(6,2,2)=5  build(7,3,3)=7 → tree[3]=12
//   tree[1] = 4 + 12 = 16`

const queryCode = `// ===== 区间查询 sum(l, r) =====
// 三种情况：完全覆盖 / 完全不重叠 / 部分重叠
private query(node: number, nl: number, nr: number, l: number, r: number): number {
    // 情况2：完全不重叠 → 剪枝，返回单位元 0
    if (nr < l || r < nl) return 0

    // 情况1：完全覆盖 → 直接返回节点聚合值
    if (l <= nl && nr <= r) return this.tree[node]

    // 情况3：部分重叠 → 拆成两半递归
    const mid = (nl + nr) >> 1
    const leftSum  = this.query(node * 2, nl, mid, l, r)
    const rightSum = this.query(node * 2 + 1, mid + 1, nr, l, r)
    return leftSum + rightSum
}

// 对外接口
queryRange(l: number, r: number): number {
    return this.query(1, 0, this.n - 1, l, r)
}

// 模拟查询 sum(1,2) 在 [1,3,5,7] 的树里:
//   query(1,0,3,1,2) 部分重叠 → mid=1
//     query(2,0,1,1,2) 部分重叠 → mid=0
//       query(4,0,0,1,2) 不重叠 → 0
//       query(5,1,1,1,2) 完全覆盖 → 3
//     query(3,2,3,1,2) 部分重叠 → mid=2
//       query(6,2,2,1,2) 完全覆盖 → 5
//       query(7,3,3,1,2) 不重叠 → 0
//   结果: 3 + 5 = 8 ✓  (只用了 2 个完全覆盖节点)`

const updateCode = `// ===== 单点更新 arr[idx] = val =====
private update(node: number, l: number, r: number, idx: number, val: number): void {
    if (l === r) {
        this.tree[node] = val   // 找到叶子，改值
        return
    }
    const mid = (l + r) >> 1
    if (idx <= mid) this.update(node * 2, l, mid, idx, val)
    else            this.update(node * 2 + 1, mid + 1, r, idx, val)

    // ★ 回溯时重新合并（这是最容易漏掉的一步！）
    this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1]
}

// 对外接口
updateAt(idx: number, val: number): void {
    this.update(1, 0, this.n - 1, idx, val)
}

// 模拟更新 arr[2]=6 在 [1,3,5,7] 的树里:
//   update(1,0,3,2,6) mid=1 → idx=2>1 走右
//     update(3,2,3,2,6) mid=2 → idx=2<=2 走左
//       update(6,2,2,2,6) 叶子 → tree[6]=6
//     回溯 tree[3] = tree[6]+tree[7] = 6+7 = 13
//   回溯 tree[1] = tree[2]+tree[3] = 4+13 = 17
// 只更新了 O(log n) = 2 层祖先节点`

const lazyCode = `// ===== 区间修改 + 懒标记（区间每个元素都 +add）=====
class LazySegmentTree {
    private tree: number[]     // 区间和
    private lazy: number[]     // 懒标记：待下放的增量
    private n: number

    // 下放：把当前节点的懒标记传给左右孩子
    private pushdown(node: number, l: number, r: number): void {
        if (this.lazy[node] === 0) return
        const mid = (l + r) >> 1
        // 左孩子累加增量，并更新其区间和
        this.lazy[node * 2] += this.lazy[node]
        this.tree[node * 2] += (mid - l + 1) * this.lazy[node]
        // 右孩子同理
        this.lazy[node * 2 + 1] += this.lazy[node]
        this.tree[node * 2 + 1] += (r - mid) * this.lazy[node]
        this.lazy[node] = 0   // 清空当前标记
    }

    // 区间 [l, r] 每个元素 +add
    private rangeAdd(node: number, nl: number, nr: number, l: number, r: number, add: number): void {
        if (nr < l || r < nl) return
        if (l <= nl && nr <= r) {
            // 完全覆盖：直接更新区间和 + 记账，不下放
            this.tree[node] += (nr - nl + 1) * add
            this.lazy[node] += add
            return
        }
        this.pushdown(node, nl, nr)   // 部分重叠前必须先下放
        const mid = (nl + nr) >> 1
        this.rangeAdd(node * 2, nl, mid, l, r, add)
        this.rangeAdd(node * 2 + 1, mid + 1, nr, l, r, add)
        this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1]
    }
}

// 关键思想：修改停在完全覆盖的节点，懒标记"欠着"它的孩子
// 等到下次查询/更新访问到孩子时，pushdown 把欠账补上`

const fullCode = `// ===== 线段树完整实现（区间和 + 单点更新）=====
class SegmentTree {
    private tree: number[]
    private n: number

    constructor(arr: number[]) {
        this.n = arr.length
        this.tree = new Array(4 * arr.length).fill(0)
        this.build(arr, 1, 0, arr.length - 1)
    }

    private build(arr: number[], node: number, l: number, r: number): void {
        if (l === r) { this.tree[node] = arr[l]; return }
        const mid = (l + r) >> 1
        this.build(arr, node * 2, l, mid)
        this.build(arr, node * 2 + 1, mid + 1, r)
        this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1]
    }

    query(l: number, r: number): number {
        return this._query(1, 0, this.n - 1, l, r)
    }
    private _query(node: number, nl: number, nr: number, l: number, r: number): number {
        if (nr < l || r < nl) return 0
        if (l <= nl && nr <= r) return this.tree[node]
        const mid = (nl + nr) >> 1
        return this._query(node * 2, nl, mid, l, r)
             + this._query(node * 2 + 1, mid + 1, nr, l, r)
    }

    update(idx: number, val: number): void {
        this._update(1, 0, this.n - 1, idx, val)
    }
    private _update(node: number, l: number, r: number, idx: number, val: number): void {
        if (l === r) { this.tree[node] = val; return }
        const mid = (l + r) >> 1
        if (idx <= mid) this._update(node * 2, l, mid, idx, val)
        else            this._update(node * 2 + 1, mid + 1, r, idx, val)
        this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1]
    }
}

// 使用
const st = new SegmentTree([1, 3, 5, 7])
console.log(st.query(1, 2))   // 8
st.update(2, 6)
console.log(st.query(1, 2))   // 9
console.log(st.query(0, 3))   // 17

// 若换最值，只需改两处合并：
//   this.tree[node] = Math.max(this.tree[node*2], this.tree[node*2+1])
//   查询单位元 0 → -Infinity`
</script>
