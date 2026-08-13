<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌳 二叉搜索树（BST）：查找、插入与删除</h1>
          <p class="text-sm text-slate-500 mt-1">左 &lt; 根 &lt; 右——把「二分查找」长成一棵树</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-2-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：一棵有序的树
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          二叉搜索树（Binary Search Tree, BST）的核心只有一条规则：对任意节点，<strong>左子树所有值 &lt; 节点值 &lt; 右子树所有值</strong>。
          这条「有序性」让查找每次都砍掉一半候选——就像对排序数组做二分查找，只是把「有序数组」折叠成了「树」。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 400" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="b1-e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">BST：左子树 &lt; 根 &lt; 右子树（中序遍历 = 递增序列）</text>

            <!-- 边 -->
            <line x1="360" y1="74" x2="185" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#b1-e)" />
            <line x1="360" y1="74" x2="535" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#b1-e)" />
            <line x1="185" y1="174" x2="90" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#b1-e)" />
            <line x1="185" y1="174" x2="280" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#b1-e)" />
            <line x1="280" y1="274" x2="345" y2="326" stroke="#94a3b8" stroke-width="2" marker-end="url(#b1-e)" />
            <line x1="535" y1="174" x2="620" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#b1-e)" />

            <!-- 空子节点（虚线 + null） -->
            <line x1="535" y1="174" x2="465" y2="226" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="465" cy="250" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="465" y="250" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">null</text>
            <line x1="280" y1="274" x2="235" y2="326" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="235" cy="350" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="235" y="350" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">null</text>

            <!-- 节点 -->
            <circle cx="360" cy="50" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="50" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <circle cx="185" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="185" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <circle cx="535" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="535" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">10</text>
            <circle cx="90" cy="250" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="90" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <circle cx="280" cy="250" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="280" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
            <circle cx="620" cy="250" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="620" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">14</text>
            <circle cx="345" cy="350" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="345" y="350" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>

            <!-- 图例 -->
            <text x="16" y="388" font-size="11" font-family="monospace" fill="#64748b">中序输出：1 → 3 → 6 → 7 → 8 → 10 → 14（严格递增）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：BST 结构 —— 每个节点左小右大，中序遍历天然得到递增序列</figcaption>
        </figure>

        <!-- 操作示意图：查找 + 插入 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：查找 7（橙色路径） 与 插入 5（绿色空位）</h3>
        <figure>
          <svg viewBox="0 0 720 400" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="b1-o" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <!-- 边 -->
            <line x1="360" y1="74" x2="185" y2="126" stroke="#f59e0b" stroke-width="2.5" />
            <line x1="360" y1="74" x2="535" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#b1-o)" />
            <line x1="185" y1="174" x2="90" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#b1-o)" />
            <line x1="185" y1="174" x2="280" y2="226" stroke="#f59e0b" stroke-width="2.5" />
            <line x1="280" y1="274" x2="345" y2="326" stroke="#f59e0b" stroke-width="2.5" />
            <line x1="535" y1="174" x2="620" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#b1-o)" />
            <!-- 插入空位 -->
            <line x1="280" y1="274" x2="235" y2="326" stroke="#4ade80" stroke-width="2" stroke-dasharray="4 3" />
            <circle cx="235" cy="350" r="22" fill="#4ade80" stroke="#22c55e" stroke-width="2" stroke-dasharray="4 3" />
            <text x="235" y="350" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">5?</text>
            <!-- 节点 -->
            <circle cx="360" cy="50" r="24" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="360" y="50" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
            <circle cx="185" cy="150" r="24" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="185" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <circle cx="535" cy="150" r="24" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
            <text x="535" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#64748b">10</text>
            <circle cx="90" cy="250" r="24" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
            <text x="90" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#64748b">1</text>
            <circle cx="280" cy="250" r="24" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="280" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
            <circle cx="620" cy="250" r="24" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
            <text x="620" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#64748b">14</text>
            <circle cx="345" cy="350" r="24" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="345" y="350" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <text x="16" y="388" font-size="11" font-family="monospace" fill="#f59e0b">查找 7：8→3→6→7，每次左小右大砍一半</text>
            <text x="440" y="388" font-size="11" font-family="monospace" fill="#16a34a">插入 5：落在 6 的左空位</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：查找沿「左小右大」折半下行；插入定位到最近的空子节点（新节点必为叶子）</figcaption>
        </figure>
      </section>

      <!-- 1. 定义 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          定义与有序性 —— 一条规则撑起整个结构
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          二叉搜索树是一棵满足<strong>有序性</strong>的二叉树：对任意节点 <code>node</code>，
          <strong>左子树所有值 &lt; node.val &lt; 右子树所有值</strong>。注意是「整棵子树」，不是「左孩子 / 右孩子」——
          这是新手最容易偷懒的地方（见第 5 节的验证陷阱）。
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">
            左子树全 &lt; 根 &lt; 右子树全（递归定义）
          </p>
          <p class="text-xs text-cyan-600 text-center">由此推出两大黄金性质：① 中序遍历 = 严格递增序列 ② 查找每层砍一半 → O(h)</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="bstClassCode" title="bst_definition.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          BST 就像<strong>排序数组 + 二分查找</strong>的「树形化」。排序数组里 <code>binarySearch</code> 靠下标取中点砍一半；
          BST 把「中点」变成节点、把「左右半区」变成左右子树。<br/>
          也像 <strong>JS 对象/Map 的键排序</strong>，以及<strong>Vue 的虚拟 DOM diff</strong>中利用 key 有序做二分定位——
          核心都是「<strong>利用有序性跳过一半候选</strong>」。
          </p>
        </aside>
      </section>

      <!-- 2. 查找 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          查找 —— 一路折半下行
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          查找是 BST 的灵魂操作。从根出发，<strong>目标更小走左、更大走右、相等命中</strong>，
          每次比较把搜索范围缩小一半。平衡情况下树高 <code>h ≈ log₂n</code>，查找复杂度 <code>O(h)</code>。
        </p>
        <div class="mb-4"><Code language="ts" :code="searchInsertCode" title="bst_search_insert.ts" /></div>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">更小走左 → 更大走右 → 相等命中 → null 未找到</p>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 退化陷阱：</strong>如果按 <code>1,2,3,4,5</code> 的顺序插入，BST 会退化成一条<strong>只有右孩子的链表</strong>，查找从 O(log n) 恶化到 O(n)。
          这就是后续 <strong>AVL / 红黑树</strong> 要解决的「平衡」问题——本模块 4-3 会讲。</p>
        </aside>
      </section>

      <!-- 3. 插入 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          插入 —— 先找位置，再挂叶子
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          插入和查找共用同一条「折半下行」路径：走到某个节点时，如果目标更小且左孩子为空，就挂到左；更大且右孩子为空，就挂到右。
          <strong>新节点永远是叶子</strong>，插入不移动任何已有节点，所以也是 O(h)。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>从根开始，目标 &lt; 当前 → 看左；目标 &gt; 当前 → 看右</li>
          <li>目标 == 当前 → 已存在，不重复插入（或按业务覆盖）</li>
          <li>走到 null 空位 → 在此新建叶子节点挂上</li>
        </ol>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>插入 = 查找失败的那个位置。查找没找到的地方，正是新节点该待的位置。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>自平衡 BST（AVL/红黑树）会在插入后做<strong>旋转</strong>维持平衡，但「先按 BST 规则插叶子」这一步不变——所以插入逻辑是后续所有平衡树的基础。</p>
        </aside>
      </section>

      <!-- 4. 删除 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          删除 —— 三种情况，难度递增
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          删除是 BST 最复杂的操作，按被删节点的孩子数量分三种情况，核心思想是<strong>「找人顶替」</strong>：
        </p>
        <div class="mb-4"><Code language="ts" :code="deleteCode" title="bst_delete.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">情况</th><th class="px-4 py-2 border border-slate-200 font-semibold">描述</th><th class="px-4 py-2 border border-slate-200 font-semibold">做法</th><th class="px-4 py-2 border border-slate-200 font-semibold">复杂度</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold text-emerald-600">① 无孩子（叶子）</td><td class="px-4 py-2 border">左右皆空</td><td class="px-4 py-2 border">直接删除</td><td class="px-4 py-2 border font-mono">O(1)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-amber-600">② 单孩子</td><td class="px-4 py-2 border">只有一个孩子</td><td class="px-4 py-2 border">用孩子顶替（子承父位）</td><td class="px-4 py-2 border font-mono">O(1)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-red-600">③ 双孩子</td><td class="px-4 py-2 border">左右都有</td><td class="px-4 py-2 border">找中序后继（右子树最左）复制值，再删后继</td><td class="px-4 py-2 border font-mono">O(h)</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          删除双子节点就像<strong>团队里的「交接离职」</strong>——要删掉的人不能立刻走，先让他的<strong>继任者（后继）</strong>把工作内容（值）复制过来，再让继任者离开原岗位。<br/>
          也像 <strong>React 列表删除中间项</strong>：不能留下「空位」破坏结构，要么用相邻项顶替，要么重排（对应旋转/平衡）。
          </p>
        </aside>
      </section>

      <!-- 5. 验证与陷阱 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          验证合法性 —— 最容易写错的判断
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          判断一棵树是不是合法 BST（LeetCode #98）是高频面试题。正确做法是<strong>上下界约束</strong>或<strong>中序递增</strong>，而不是只比较父子。
        </p>
        <div class="mb-4"><Code language="ts" :code="validateCode" title="bst_validate.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见陷阱：</strong><br/>
          ① <strong>只比较「左孩子 &lt; 根 &lt; 右孩子」不够</strong>——右子树深处可能出现比根还小的值，必须约束「整棵子树」范围。<br/>
          ② 相等值：严格 BST 通常不允许重复值（<code>&lt;=</code> 就非法）；需要支持重复时要么改成「左 &le; 根」，要么用计数节点。<br/>
          ③ 用 <code>Number.MIN_SAFE_INTEGER / MAX_SAFE_INTEGER</code> 做初始边界，别用 0 或 -1（值可能超界）。
          </p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>凡是涉及 BST 的题，先问自己「<strong>有序性能不能帮我跳过一半</strong>」。能 → 用 O(h) 的树形搜索；不能 → 可能只是把数组逻辑搬到了树上。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：查找 / 插入 / 删除三情况
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          橙色 = 当前比较节点，灰色 = 已比较过、可排除；绿色 = 命中 / 新插入 / 后继。删除双子会先<strong>找后继再顶替</strong>。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ tNodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🌳 高度: {{ dynHeight }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <input v-model.number="searchKey" type="number" class="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-shadow" placeholder="查找" />
          <button @mousedown="doSearch" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm">🔍 查找</button>
          <input v-model.number="insertKey" type="number" class="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-shadow" placeholder="插入" />
          <button @mousedown="doInsert" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">➕ 插入</button>
          <button @mousedown="() => doDelete(1)" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm">删除叶子 1</button>
          <button @mousedown="() => doDelete(10)" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm">删除单子 10</button>
          <button @mousedown="() => doDelete(8)" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm">删除双子 8</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="'e'+e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="tTextCfg(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>核心性质：</strong>左子树 &lt; 根 &lt; 右子树 → 中序递增、查找折半</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>查找：</strong>更小走左、更大走右，O(h)；平衡时 h ≈ log n</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>插入：</strong>查找失败位置挂新叶子，不移动已有节点，O(h)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>删除三情况：</strong>叶子直接删 / 单孩子顶替 / 双子找后继（右子树最左）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>验证：</strong>必须用上下界或中序递增，不能只比较父子</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>最大隐患：</strong>顺序插入会退化成链表 → 平衡树（AVL/红黑）登场</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-1-binary-tree/dsa-4-1-4-lca" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：最近公共祖先 LCA</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-2-bst/dsa-4-2-2-successor" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：前驱与后继 →</RouterLink>
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
  { id: "sec-1", name: "定义与有序性" },
  { id: "sec-2", name: "查找 O(h)" },
  { id: "sec-3", name: "插入 O(h)" },
  { id: "sec-4", name: "删除三情况" },
  { id: "sec-5", name: "验证与陷阱" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 BST 动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const R = 22, LEVEL_H = 90, TOP = 50
const H = ref(380), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref(''), nid = ref(100)
const box = ref<HTMLDivElement>()
const searchKey = ref(7), insertKey = ref(5)
const d = (ms:number) => new Promise(r => setTimeout(r,ms))

interface TNode { id:number; val:number; x:number; y:number; color:string; s?:number }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{a:number;b:number}[]>([])
const tChild = reactive<Record<number,{left:number|null;right:number|null}>>({})
const vals = reactive<Record<number,number>>({})
let rootId = 1

function resetTree() {
  Object.keys(tChild).forEach(k => delete tChild[k])
  Object.keys(vals).forEach(k => delete vals[k])
  Object.assign(tChild, { 1:{left:2,right:3}, 2:{left:4,right:5}, 3:{left:null,right:6}, 4:{left:null,right:null}, 5:{left:null,right:7}, 6:{left:null,right:null}, 7:{left:null,right:null} })
  Object.assign(vals, { 1:8, 2:3, 3:10, 4:1, 5:6, 6:14, 7:7 })
  rootId = 1
  layout()
}

function layout() {
  tNodes.length = 0; tEdges.length = 0
  let level = [rootId], y = TOP
  while (level.length) {
    const gap = W.value / (level.length + 1)
    level.forEach((id, i) => { tNodes.push({ id, val: vals[id], x: gap*(i+1), y, color: C.cyan, s:1 }) })
    const next: number[] = []
    level.forEach(id => {
      const ch = tChild[id] || { left:null, right:null }
      if (ch.left != null) { tEdges.push({ a:id, b:ch.left }); next.push(ch.left) }
      if (ch.right != null) { tEdges.push({ a:id, b:ch.right }); next.push(ch.right) }
    })
    level = next; y += LEVEL_H
  }
}

function pos(id:number): TNode { return tNodes.find(n => n.id === id)! }
function findIdByVal(key:number): number|null { for (const k of Object.keys(vals)) { if (vals[+k] === key) return +k } return null }
function treeHeight(id:number|null = rootId): number { if (id == null) return 0; const c = tChild[id]; if (!c) return 0; return 1 + Math.max(treeHeight(c.left), treeHeight(c.right)) }
const dynHeight = computed(() => treeHeight())

function edgeCfg(e:{a:number;b:number}) { const pa = pos(e.a), pb = pos(e.b); return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke:'#94a3b8', strokeWidth:2 } }
function circleCfg(n:any) { const s = n.s ?? 1; return { x:n.x, y:n.y, radius:R*s, fill:n.color, stroke:n.color===C.orange?'#d97706':'#64748b', strokeWidth:n.color===C.orange?3:1.5, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 } }
function tTextCfg(n:any) { const s = n.s ?? 1; return { x:n.x-R, y:n.y-R, width:R*2, height:R*2, text:String(n.val), fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:n.color===C.ghost?C.muted:'#fff', align:'center', verticalAlign:'middle', scale:{x:s,y:s} } }

async function act(msg:string, label:string, fn:() => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(300); busy.value = false; status.value = ''; opLabel.value = '' }
}

// 查找：沿根→叶路径高亮（当前橙，已比较变 ghost）
function doSearch() { const key = searchKey.value; if (isNaN(key)) return; act(`查找 ${key}`, '查找 O(h)', async () => {
  resetTree()
  let id:number|null = rootId
  while (id != null) {
    const n = pos(id); n.color = C.orange; n.s = 1.08; await d(400)
    if (vals[id] === key) { n.color = C.green; n.s = 1; status.value = `✅ 找到 ${key}`; return }
    n.color = C.ghost; n.s = 1
    const ch = tChild[id]
    id = key < vals[id] ? ch.left : ch.right
  }
  status.value = `❌ 未找到 ${key}（会落在某个空子节点）`
})}

// 插入：找位置 + 新节点绿色弹出
function doInsert() { const key = insertKey.value; if (isNaN(key)) return; act(`插入 ${key}`, '插入 O(h)', async () => {
  resetTree()
  if (findIdByVal(key) != null) { status.value = `${key} 已存在，不重复插入`; return }
  let cur:number|null = rootId, parent:number|null = null
  while (cur != null) {
    const n = pos(cur); n.color = C.orange; await d(320)
    n.color = C.ghost
    parent = cur
    const ch = tChild[cur]
    cur = key < vals[cur] ? ch.left : ch.right
  }
  const newId = nid.value++
  vals[newId] = key; tChild[newId] = { left:null, right:null }
  const pc = tChild[parent!]
  if (key < vals[parent!]) pc.left = newId; else pc.right = newId
  layout()
  const nn = pos(newId); nn.color = C.green; nn.s = 0; await d(80); nn.s = 1; await d(550); nn.color = C.cyan
  status.value = `✅ 已插入 ${key}（新叶子）`
})}

// 删除三情况
function doDelete(key:number) { act(`删除 ${key}`, '删除 O(h)', async () => {
  resetTree()
  const tid = findIdByVal(key)
  if (tid == null) { status.value = `${key} 不存在`; return }
  let cur:number|null = rootId, parent:number|null = null
  while (cur != null && cur !== tid) {
    pos(cur).color = C.orange; await d(260); pos(cur).color = C.ghost
    parent = cur
    const ch = tChild[cur]
    cur = key < vals[cur] ? ch.left : ch.right
  }
  pos(tid).color = C.red; await d(450)
  const ch = tChild[tid], left = ch.left, right = ch.right
  if (left == null && right == null) {
    status.value = `情况①：${key} 无孩子，直接删除`; await d(600)
    if (parent == null) { rootId = 0 } else { const pc = tChild[parent]; if (pc.left === tid) pc.left = null; else pc.right = null }
    delete tChild[tid]; delete vals[tid]; layout()
  } else if (left == null || right == null) {
    const child = left != null ? left : right!
    status.value = `情况②：${key} 单孩子 ${vals[child]}，子承父位`; await d(600)
    if (parent == null) rootId = child
    else { const pc = tChild[parent]; if (pc.left === tid) pc.left = child; else pc.right = child }
    delete tChild[tid]; delete vals[tid]; layout()
  } else {
    status.value = `情况③：${key} 双子，找后继（右子树最左）`; await d(600)
    let succ = right!, succParent = tid
    while (tChild[succ].left != null) { pos(succ).color = C.orange; await d(280); pos(succ).color = C.ghost; succParent = succ; succ = tChild[succ].left! }
    pos(succ).color = C.green; await d(400)
    const succVal = vals[succ]
    status.value = `后继 = ${succVal}，复制值到 ${key}`; await d(550)
    vals[tid] = succVal
    const succRight = tChild[succ].right
    if (succParent === tid) tChild[tid].right = succRight; else tChild[succParent].left = succRight
    delete tChild[succ]; delete vals[succ]; layout()
  }
})}

function doReset() { resetTree(); status.value = ''; opLabel.value = '' }

let ro: ResizeObserver|null = null
onMounted(() => {
  resetTree()
  if (box.value) { W.value = box.value.clientWidth; layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const bstClassCode = `// ===== BST 节点定义 =====
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.val = val
        this.left = left
        this.right = right
    }
}

// ===== BST 核心性质：左 < 根 < 右 =====
// 对任意节点 node：
//   1. 左子树所有节点的值 < node.val
//   2. 右子树所有节点的值 > node.val
//   3. 左右子树本身也都是 BST（递归定义）
//
// 由此推出两个黄金性质：
//   ★ 中序遍历 BST 得到严格递增序列（排序性）
//   ★ 查找每层可排除一半子树（折半），复杂度 O(h)

// ===== 构造一棵 BST =====
//        8
//       / \\
//      3   10
//     / \\    \\
//    1   6    14
//         \\
//          7
const root = new TreeNode(8,
    new TreeNode(3,
        new TreeNode(1),
        new TreeNode(6, null, new TreeNode(7)),
    ),
    new TreeNode(10, null, new TreeNode(14)),
)

// ===== 中序遍历：输出严格递增序列 =====
function inorder(node: TreeNode | null, out: number[] = []): number[] {
    if (!node) return out
    inorder(node.left, out)
    out.push(node.val)   // 左 → 根 → 右
    inorder(node.right, out)
    return out
}
console.log(inorder(root))
// 输出: [1, 3, 6, 7, 8, 10, 14]  ← 严格递增，这就是 BST 的排序性`

const searchInsertCode = `// ===== 查找：一路折半，O(h) =====
function search(root: TreeNode | null, target: number): TreeNode | null {
    let cur = root
    while (cur) {
        if (cur.val === target) return cur                 // 命中
        cur = target < cur.val ? cur.left : cur.right      // 左小右大，每次砍一半
    }
    return null                                            // 走到 null，未找到
}

// 手动模拟 search(root, 7)：
// 8 > 7 → 走左 → 3 < 7 → 走右 → 6 < 7 → 走右 → 7 命中
// 路径: 8 → 3 → 6 → 7，只比较 4 次（7 个节点，砍到 4 次）

// ===== 插入：先查位置，再挂新叶子，O(h) =====
function insert(root: TreeNode | null, val: number): TreeNode {
    if (!root) return new TreeNode(val)                    // 空树：新节点即根
    let cur = root
    while (true) {
        if (val === cur.val) return root                   // 已存在，不重复插入
        if (val < cur.val) {
            if (!cur.left) { cur.left = new TreeNode(val); break }
            cur = cur.left
        } else {
            if (!cur.right) { cur.right = new TreeNode(val); break }
            cur = cur.right
        }
    }
    return root
}
// 新节点一定是叶子：插入不会移动任何已有节点，所以是 O(h)`

const deleteCode = `// ===== 删除：三种情况 =====
// 情况① 无孩子（叶子）：直接删
// 情况② 单孩子：用孩子顶替
// 情况③ 双孩子：用「中序后继」顶替（右子树的最小值）
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
    if (!root) return null
    if (key < root.val) {
        root.left = deleteNode(root.left, key)
    } else if (key > root.val) {
        root.right = deleteNode(root.right, key)
    } else {
        // 找到了要删除的节点 root
        if (!root.left && !root.right) return null          // ① 叶子
        if (!root.left) return root.right                   // ② 只有右孩子
        if (!root.right) return root.left                   // ② 只有左孩子
        const succ = minNode(root.right)                    // ③ 双孩子
        root.val = succ.val                                 // 复制后继的值
        root.right = deleteNode(root.right, succ.val)       // 递归删除后继（至多一个右孩子）
    }
    return root
}

// 右子树最小值 = 一路向左
function minNode(node: TreeNode): TreeNode {
    while (node.left) node = node.left
    return node
}

// 删除 8（双子）：后继 = 右子树 {10,14} 的最小值 = 10
// 复制 10 到根 → 再删原 10（单孩子，14 顶替）
// 结果树：
//        10
//       /  \\
//      3    14
//     / \\
//    1   6
//         \\
//          7`

const validateCode = `// ===== 验证是否合法 BST（LeetCode #98）=====

// 方法一：中序遍历递增（简洁直观）
function isValidBST(root: TreeNode | null): boolean {
    let prev: number | null = null
    function inorder(node: TreeNode | null): boolean {
        if (!node) return true
        if (!inorder(node.left)) return false
        if (prev !== null && node.val <= prev) return false  // 必须严格递增
        prev = node.val
        return inorder(node.right)
    }
    return inorder(root)
}

// 方法二：上下界约束（更通用，面试常考）
function isValidBST2(node: TreeNode | null, low = -Infinity, high = Infinity): boolean {
    if (!node) return true
    if (node.val <= low || node.val >= high) return false    // 越界非法
    return isValidBST2(node.left, low, node.val)             // 左子树都 < node.val
        && isValidBST2(node.right, node.val, high)           // 右子树都 > node.val
}

// ⚠️ 常见错误：只检查「左孩子 < 根 < 右孩子」是不够的！
// 反例：
//       5
//      / \\
//     1   6
//        / \\
//       4   7     ← 4 在右子树，但 4 < 5，整棵树不是 BST
// 只看「1 < 5 < 6」会误判合法；必须用上下界约束「整棵子树」范围`
</script>
