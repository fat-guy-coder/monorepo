<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌲 DFS 栈实现：二叉树遍历的非递归写法</h1>
          <p class="text-sm text-slate-500 mt-1">用栈模拟递归——前端必会的迭代遍历</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-3-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：二叉树 + 显式栈
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          递归遍历靠<strong>系统调用栈</strong>隐式保存路径；迭代遍历用一个<strong>显式栈 stack</strong> 手动模拟——弹出栈顶访问，再按<strong>先右后左</strong>压入子节点，LIFO 保证左孩子先弹出，从而还原"根→左→右"的前序顺序。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 560 280" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ov-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="140" y="24" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b">二叉树（前序）</text>
            <!-- 边 -->
            <line x1="140" y1="60" x2="80" y2="150" stroke="#94a3b8" stroke-width="2" />
            <line x1="140" y1="60" x2="200" y2="150" stroke="#94a3b8" stroke-width="2" />
            <line x1="80" y1="150" x2="50" y2="230" stroke="#94a3b8" stroke-width="2" />
            <line x1="80" y1="150" x2="110" y2="230" stroke="#94a3b8" stroke-width="2" />
            <!-- 节点 -->
            <circle cx="140" cy="60" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="140" y="60" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <circle cx="80" cy="150" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="80" y="150" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <circle cx="200" cy="150" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="200" y="150" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <circle cx="50" cy="230" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="50" y="230" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <circle cx="110" cy="230" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="110" y="230" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <!-- 显式栈 -->
            <text x="430" y="136" text-anchor="middle" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">stack（显式）</text>
            <rect x="390" y="200" width="80" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="430" y="218" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="390" y="156" width="80" height="36" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
            <text x="430" y="174" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <!-- 连接箭头 -->
            <line x1="300" y1="178" x2="385" y2="178" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#ov-a)" />
            <text x="16" y="270" font-size="11" font-family="monospace" fill="#64748b">先压右孩子 3，再压左孩子 2 → 2 在栈顶，下次先弹左</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：弹出根 1 访问后，栈中先压右 3、再压左 2，LIFO 保证左 2 先弹出</figcaption>
        </figure>

        <!-- 操作示意图：前序压栈顺序 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：前序遍历压栈 —— 先压右孩子，再压左孩子</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">弹出根 1 访问（输出 [1]）</p>
            <svg viewBox="0 0 220 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <path d="M 60 60 L 60 180 L 160 180 L 160 60" fill="none" stroke="#94a3b8" stroke-width="2" />
              <rect x="70" y="60" width="80" height="36" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="110" y="78" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
              <text x="110" y="36" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#f59e0b">弹出 1 → 访问</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">先压右 3，再压左 2（栈顶 = 2）</p>
            <svg viewBox="0 0 220 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <path d="M 60 60 L 60 180 L 160 180 L 160 60" fill="none" stroke="#94a3b8" stroke-width="2" />
              <rect x="70" y="136" width="80" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="110" y="154" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <text x="188" y="154" text-anchor="start" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">右</text>
              <rect x="70" y="98" width="80" height="36" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="110" y="116" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
              <text x="188" y="116" text-anchor="start" dominant-baseline="central" font-size="11" font-family="monospace" fill="#16a34a">左</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">2 在栈顶 → 下次先弹出左孩子，实现"根→左→右"</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. Why iterative DFS -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要迭代 DFS？递归 vs 迭代
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          二叉树遍历首选<strong>递归</strong>（简洁优雅、3 行代码搞定）。但递归有两个致命问题：
        </p>

        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>调用栈溢出</strong>：JS 引擎的调用栈大约能承受 10000 层递归。深度超过 10000 层的树（如退化的链表树），递归会直接抛 <code>Maximum call stack size exceeded</code></li>
          <li><strong>无法精细控制</strong>：递归的执行流是"全自动"的，你无法在中途暂停、无法限制搜索深度、无法在遍历过程中优雅地提前退出</li>
        </ol>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          ① <strong>React 调和（Reconciliation）</strong> 使用 DFS 遍历 Virtual DOM 树来 diff 和 commit。React 16+ 的 Fiber 架构之所以重写，一个关键原因就是：递归流程无法被中断，而 Fiber 用链表 + while 循环实现了<strong>可中断的遍历</strong>。<br/><br/>
          ② <strong>JS 事件循环的调用栈</strong> 本身就是栈结构——<code>foo()</code> 调用 <code>bar()</code> 调用 <code>baz()</code>，就是一层层压栈。递归导致调用栈溢出，等价于"栈太大了"。<br/><br/>
          ③ <strong>Vue 3 的组件树遍历</strong>（patch 过程）本质也是 DFS——用 while 循环 + 显式栈控制遍历，避免了深层嵌套组件导致的递归爆栈。
          </p>
        </aside>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">特性</th><th class="px-4 py-2 border border-slate-200 font-semibold">递归</th><th class="px-4 py-2 border border-slate-200 font-semibold">迭代（栈）</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">代码简洁度</td><td class="px-4 py-2 border text-emerald-600">⭐⭐⭐ 3-5 行</td><td class="px-4 py-2 border text-amber-600">⭐⭐ 10-20 行</td></tr>
              <tr><td class="px-4 py-2 border">栈深度限制</td><td class="px-4 py-2 border text-red-600">~10000 层（引擎限制）</td><td class="px-4 py-2 border text-emerald-600">只受内存限制（百万级）</td></tr>
              <tr><td class="px-4 py-2 border">可中断/恢复</td><td class="px-4 py-2 border text-red-600">❌ 不可中断</td><td class="px-4 py-2 border text-emerald-600">✅ 可暂停、可恢复</td></tr>
              <tr><td class="px-4 py-2 border">提前退出</td><td class="px-4 py-2 border text-amber-600">throw / 全局 flag</td><td class="px-4 py-2 border text-emerald-600">break / return 即可</td></tr>
              <tr><td class="px-4 py-2 border">调试友好</td><td class="px-4 py-2 border text-red-600">难以查看当前栈</td><td class="px-4 py-2 border text-emerald-600">显式 stack 数组随时可查</td></tr>
              <tr><td class="px-4 py-2 border">适用场景</td><td class="px-4 py-2 border">日常开发、算法题</td><td class="px-4 py-2 border">框架源码、生产级库</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 面试陷阱：</strong><br/>
          很多面试官会要求"用迭代方式写二叉树遍历"。不是因为他们不喜欢递归，而是要考察你<strong>是否真正理解递归的底层原理</strong>——递归本身就是用系统的调用栈实现的，把递归翻译成显式栈操作，说明你理解了 LIFO 的本质。
          </p>
        </aside>
      </section>

      <!-- 2. Preorder -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          前序遍历迭代实现（#144）—— 最简单的迭代写法
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>前序遍历（根 → 左 → 右）</strong> 是三种遍历中迭代写法<strong>最简单</strong>的。因为根节点最先访问，不需要额外的状态标记。
        </p>

        <div class="mb-4"><Code language="ts" :code="preorderCode" title="preorder_iterative.ts" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong><br/>
          前序遍历的迭代写法核心只有一句：<strong>先压右孩子，再压左孩子</strong>。这样弹栈时会先弹出左孩子，实现"根→左→右"的顺序。<br/><br/>
          为什么不是"先左后右"？因为栈是 LIFO——后压入的先弹出。想要先访问左子树，左孩子必须后压入。
          </p>
        </aside>
      </section>

      <!-- 3. Inorder -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          中序遍历迭代实现（#94）—— 一路向左
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>中序遍历（左 → 根 → 右）</strong> 稍微复杂一些：需要先把所有左孩子压栈，再弹出一个访问，然后转向其右子树。
          核心策略："一路向左，无左则弹，弹完向右"。
        </p>

        <div class="mb-4"><Code language="ts" :code="inorderCode" title="inorder_iterative.ts" /></div>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>记忆口诀（12 字）：</strong></p>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">一路向左 → 无左则弹 → 弹完向右</p>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 面试技巧：</strong><br/>
          中序遍历迭代是<strong>面试最高频的迭代遍历题</strong>（因为既不太简单也不太复杂）。
          面试时画一棵简单的树（如 [1, null, 2, 3]），手动推演一遍栈的变化，然后写代码——这个过程会让面试官觉得你真的懂了。
          </p>
        </aside>
      </section>

      <!-- 4. Postorder -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          后序遍历迭代实现（#145）—— 最难的迭代遍历
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>后序遍历（左 → 右 → 根）</strong> 是三种迭代中最难的：必须访问完左右子树后才能访问根节点，需要<strong>额外的状态追踪</strong>。
          有两种等价解法，推荐第二种（反转前序法）。
        </p>

        <div class="mb-4"><Code language="ts" :code="postorderCode" title="postorder_iterative.ts" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 解法对比：</strong><br/>
          ① <strong>双栈/反转法</strong>：推荐面试使用——思路简单（前序改左右顺序，再反转），不容易写错。O(n) 时间, O(n) 空间。<br/>
          ② <strong>prev 指针法</strong>：只用一个栈 + 一个 prev 指针追踪上次访问的节点。面试中写错概率很高，但空间利用更好。<br/>
          ③ <strong>Morris 遍历</strong>：O(1) 空间但会修改树结构——除非面试官特别要求不要用。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见陷阱：</strong><br/>
          ① 后序遍历的 <strong>prev 指针法</strong> 最容易漏掉判断：需要同时检查 <code>node.right !== null</code> 和 <code>node.right !== prev</code>，缺一不可。<br/>
          ② 双栈法的输出顺序是 <strong>reverse</strong> 而非直接收集——记得最后 <code>.reverse()</code>。<br/>
          ③ 后序遍历的变体"从右到左的后序"（右→左→根）就是"从右到左的前序"反过来。
          </p>
        </aside>
      </section>

      <!-- 5. Generic DFS template -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          通用 DFS 模板：命令模式（Command Pattern）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          除了三种标准遍历，还有一种<strong>通用的迭代 DFS 模式</strong>——把操作包装成"命令"压入栈中。
          这个模板可以轻松扩展为 N 叉树的任意顺序遍历，甚至在遍历过程中插入自定义操作。
        </p>

        <div class="mb-4"><Code language="ts" :code="genericDFSCode" title="generic_dfs_template.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          命令模式的 DFS 就像 <strong>React Scheduler 的任务调度</strong>。React Fiber 把每个组件渲染变成一个"工作单元"，放入链表队列中，调度器按优先级从中取出执行。命令模式 DFS 把每个操作（visit/process）变成一个"命令对象"放入栈中，然后循环处理。两者本质都是：<strong>把隐式的递归流程变成显式的任务队列</strong>。
          </p>
        </aside>

        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>N 叉树 DFS / 图遍历：</strong></p>
        <div class="mb-4"><Code language="ts" :code="naryCode" title="nary_graph_dfs.ts" /></div>
      </section>

      <!-- 6. DFS vs BFS choice -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          DFS vs BFS：何时选哪种遍历？
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          面试中经常需要选择 DFS 还是 BFS。下面是一个决策矩阵。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">场景</th><th class="px-4 py-2 border border-slate-200 font-semibold">推荐</th><th class="px-4 py-2 border border-slate-200 font-semibold">原因</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">找最短路径（无权图）</td><td class="px-4 py-2 border text-blue-600 font-semibold">BFS</td><td class="px-4 py-2 border">逐层扩展，首次遇到的就是最短</td></tr>
              <tr><td class="px-4 py-2 border">找任意一条路径（树/图）</td><td class="px-4 py-2 border text-cyan-600 font-semibold">DFS</td><td class="px-4 py-2 border">深入到底才回溯，代码简单（递归）</td></tr>
              <tr><td class="px-4 py-2 border">遍历所有节点</td><td class="px-4 py-2 border">均可</td><td class="px-4 py-2 border">DFS(递归简单) vs BFS(层级信息有用)</td></tr>
              <tr><td class="px-4 py-2 border">拓扑排序</td><td class="px-4 py-2 border text-cyan-600 font-semibold">DFS</td><td class="px-4 py-2 border">后序遍历顺序天然满足拓扑序</td></tr>
              <tr><td class="px-4 py-2 border">检测环</td><td class="px-4 py-2 border text-cyan-600 font-semibold">DFS</td><td class="px-4 py-2 border">回溯时能检测"正在访问中"的节点</td></tr>
              <tr><td class="px-4 py-2 border">连通分量</td><td class="px-4 py-2 border text-cyan-600 font-semibold">DFS</td><td class="px-4 py-2 border">递归填色，实现最简洁</td></tr>
              <tr><td class="px-4 py-2 border">层级遍历 / 按层处理</td><td class="px-4 py-2 border text-blue-600 font-semibold">BFS</td><td class="px-4 py-2 border">天然按层，不需要额外记录</td></tr>
              <tr><td class="px-4 py-2 border">树的最大深度</td><td class="px-4 py-2 border text-cyan-600 font-semibold">DFS</td><td class="px-4 py-2 border">沿路径传递深度信息</td></tr>
              <tr><td class="px-4 py-2 border">树的最小深度</td><td class="px-4 py-2 border text-blue-600 font-semibold">BFS</td><td class="px-4 py-2 border">遇到叶子即可返回（DFS 需要遍历到底）</td></tr>
              <tr><td class="px-4 py-2 border">内存受限（深而窄的树）</td><td class="px-4 py-2 border text-cyan-600 font-semibold">DFS</td><td class="px-4 py-2 border">O(h) 栈空间 vs BFS 的 O(w) 队列空间</td></tr>
              <tr><td class="px-4 py-2 border">内存受限（浅而宽的树）</td><td class="px-4 py-2 border text-blue-600 font-semibold">BFS</td><td class="px-4 py-2 border">DFS 递归深度小但 BFS 队列会很大</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong><br/>
          先默认为 DFS（递归），简单可靠。只有在以下情况才考虑 BFS：<br/>
          ① 需要<strong>最短/最少</strong>步数<br/>
          ② 需要<strong>按层处理</strong><br/>
          ③ 树<strong>特别宽但浅</strong>（DFS 递归栈不会溢出的情况下也可用 DFS）<br/>
          ④ <strong>找最近/最短距离</strong>（地图、社交网络度数）
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：前序遍历的栈模拟
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">递归 → 显式栈：<strong>弹出栈顶访问（橙=当前节点），先压右孩子再压左孩子</strong>（LIFO 保证左先弹）。绿色 = 已访问。</p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 栈深度: {{ dfsStack.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ dfsStatus }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">📤 输出: [{{ dfsOut.join(', ') }}]</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="dfsStep" :disabled="dfsBusy || dfsDone" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40">{{ dfsDone ? '✅ 遍历完成' : '▶ 下一步' }}</button>
          <button @mousedown="dfsReset" :disabled="dfsBusy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="dfsBox" class="w-full relative" :style="{height:dfsH+'px'}">
          <v-stage :config="{width:dfsW, height:dfsH}">
            <v-layer>
              <v-text :config="{x:30,y:8,text:'二叉树（前序）',fontSize:11,fontFamily:'monospace',fill:dfsC.muted,fontStyle:'bold'}" />
              <v-text :config="{x:350,y:30,text:'栈 stack',fontSize:11,fontFamily:'monospace',fill:dfsC.muted,fontStyle:'bold'}" />
              <v-text :config="{x:30,y:308,text:'输出 (visited)',fontSize:11,fontFamily:'monospace',fill:dfsC.muted,fontStyle:'bold'}" />
              <v-line v-for="(e,i) in dfsEdges" :key="'e'+i" :config="dfsEdge(e)" />
              <v-circle v-for="n in dfsTreeKeys" :key="'c'+n" :config="dfsCircle(n)" />
              <v-text v-for="n in dfsTreeKeys" :key="'ct'+n" :config="dfsNodeText(n)" />
              <v-rect v-for="v in dfsStack" :key="'s'+v" :config="dfsStackRect(v)" />
              <v-text v-for="v in dfsStack" :key="'st'+v" :config="dfsStackText(v)" />
              <v-rect v-for="v in dfsOut" :key="'o'+v" :config="dfsOutRect(v)" />
              <v-text v-for="v in dfsOut" :key="'ot'+v" :config="dfsOutText(v)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>前序（根→左→右）：</strong>栈先压右再压左（LIFO 保证左先弹出），最简单</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>中序（左→根→右）：</strong>"一路向左"压栈 → 弹出访问 → 转向右子树</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>后序（左→右→根）：</strong>推荐"反转前序"法——根→右→左，结果 reverse。或者 prev 指针法</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>通用模板：</strong>命令模式（visit + process 指令入栈），可扩展任意遍历顺序</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>核心洞察：</strong>递归本身就是用系统的调用栈，手动写栈操作只是让这个隐式过程变得显式</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>DFS vs BFS：</strong>默认选 DFS（递归），最短路径/按层处理选 BFS</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>前端实战：</strong>React Fiber（可中断 DFS）、Vue patch（组件树 DFS）、事件循环调用栈（系统栈）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-3-stack/dsa-2-3-2-expression" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：表达式求值</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-4-queue/dsa-2-4-1-deque" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：双端队列 →</RouterLink>
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
  { id: "sec-1", name: "递归 vs 迭代" },
  { id: "sec-2", name: "前序遍历 #144" },
  { id: "sec-3", name: "中序遍历 #94" },
  { id: "sec-4", name: "后序遍历 #145" },
  { id: "sec-5", name: "通用 DFS 模板" },
  { id: "sec-6", name: "DFS vs BFS" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

// ===== 🎬 前序遍历栈模拟动画 =====
const dfsC={cyan:'#06b6d4',green:'#4ade80',red:'#ef4444',orange:'#f59e0b',text:'#1e293b',muted:'#94a3b8',ghost:'#e2e8f0'}
const dfsW=ref(700), dfsH=ref(380)
const dfsTreeKeys=[1,2,3,4,5]
const dfsTreePos: Record<number,{x:number;y:number}> = {1:{x:150,y:70},2:{x:85,y:160},3:{x:215,y:160},4:{x:45,y:250},5:{x:125,y:250}}
const dfsEdges: [number,number][] = [[1,2],[1,3],[2,4],[2,5]]
const dfsChildren: Record<number,{left:number|null;right:number|null}> = {1:{left:2,right:3},2:{left:4,right:5},3:{left:null,right:null},4:{left:null,right:null},5:{left:null,right:null}}
const dfsStack=reactive<number[]>([])
const dfsOut=reactive<number[]>([])
const dfsCurr=ref<number|null>(null)
const dfsBusy=ref(false), dfsDone=ref(false), dfsStatus=ref('')
const dfsBox=ref<HTMLDivElement>()
const d6=(ms:number)=>new Promise(r=>setTimeout(r,ms))
function dfsEdge(e:[number,number]){ const a=dfsTreePos[e[0]],b=dfsTreePos[e[1]]; return {points:[a.x,a.y+24,b.x,b.y-24],stroke:dfsC.muted,strokeWidth:2} }
function dfsCircle(n:number){ const p=dfsTreePos[n]; const isCurr=dfsCurr.value===n, isOut=dfsOut.includes(n), isIn=dfsStack.includes(n); const fill=isCurr?dfsC.orange:isOut?dfsC.green:isIn?dfsC.cyan:dfsC.ghost; return {x:p.x,y:p.y,radius:24,fill,stroke:'#64748b',strokeWidth:2,shadowColor:'rgba(0,0,0,.1)',shadowBlur:4} }
function dfsNodeText(n:number){ const p=dfsTreePos[n]; return {x:p.x-24,y:p.y-24,width:48,height:48,text:String(n),fontSize:16,fontFamily:'monospace',fontStyle:'bold',fill:dfsC.text,align:'center',verticalAlign:'middle'} }
function dfsStackRect(v:number){ const i=dfsStack.indexOf(v); const isTop=i===dfsStack.length-1; const x=350,y=270-i*40; return {x,y,width:64,height:34,fill:dfsC.cyan,cornerRadius:6,stroke:isTop?dfsC.orange:'#64748b',strokeWidth:isTop?2.5:1.5,shadowColor:'rgba(0,0,0,.1)',shadowBlur:3} }
function dfsStackText(v:number){ const i=dfsStack.indexOf(v); const x=350,y=270-i*40; return {x,y,width:64,height:34,text:String(v),fontSize:15,fontFamily:'monospace',fontStyle:'bold',fill:dfsC.text,align:'center',verticalAlign:'middle'} }
function dfsOutRect(v:number){ const i=dfsOut.indexOf(v); const x=30+i*56,y=330; return {x,y,width:48,height:34,fill:dfsC.green,cornerRadius:6,stroke:'#64748b',strokeWidth:1,shadowColor:'rgba(0,0,0,.08)',shadowBlur:2} }
function dfsOutText(v:number){ const i=dfsOut.indexOf(v); const x=30+i*56,y=330; return {x,y,width:48,height:34,text:String(v),fontSize:15,fontFamily:'monospace',fontStyle:'bold',fill:'#fff',align:'center',verticalAlign:'middle'} }
async function dfsStep(){
  if(dfsBusy.value||dfsDone.value)return; dfsBusy.value=true
  if(!dfsStack.length){ dfsDone.value=true; dfsStatus.value='✅ 遍历完成'; dfsBusy.value=false; return }
  const node=dfsStack.pop()!
  dfsCurr.value=node; dfsStatus.value=`弹出 ${node} → 访问`; await d6(450)
  dfsOut.push(node); dfsCurr.value=null; await d6(200)
  const ch=dfsChildren[node]
  if(ch.right!==null){ dfsStack.push(ch.right); dfsStatus.value=`压入右孩子 ${ch.right}`; await d6(300) }
  if(ch.left!==null){ dfsStack.push(ch.left); dfsStatus.value=`压入左孩子 ${ch.left}`; await d6(300) }
  dfsBusy.value=false
}
function dfsReset(){ dfsBusy.value=false; dfsStack.length=0; dfsOut.length=0; dfsCurr.value=null; dfsDone.value=false; dfsStatus.value=''; dfsStack.push(1) }
let roDFS:ResizeObserver|null=null
onMounted(()=>{ dfsStack.push(1); if(dfsBox.value){ dfsW.value=dfsBox.value.clientWidth; roDFS=new ResizeObserver(e=>{const w=e[0]?.contentRect.width; if(w&&w>200) dfsW.value=Math.max(460,w)}); roDFS.observe(dfsBox.value) }})
onUnmounted(()=>roDFS?.disconnect())

class TreeNode { val: number; left: TreeNode | null; right: TreeNode | null; constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) { this.val = val ?? 0; this.left = left ?? null; this.right = right ?? null } }

const preorderCode = `// ===== LeetCode 144: Binary Tree Preorder Traversal =====
// 顺序: 根 → 左 → 右
// 输入: [1,null,2,3]  输出: [1,2,3]

// ===== 递归版（对比）=====
function preorderRecursive(root: TreeNode | null): number[] {
    const res: number[] = []
    function dfs(node: TreeNode | null) {
        if (!node) return
        res.push(node.val)          // 先根
        dfs(node.left)              // 再左
        dfs(node.right)             // 再右
    }
    dfs(root)
    return res
}

// ===== 迭代版 — 栈实现 =====
function preorderTraversal(root: TreeNode | null): number[] {
    if (!root) return []
    const res: number[] = []
    const stack: TreeNode[] = [root]

    while (stack.length > 0) {
        const node = stack.pop()!   // 弹出栈顶
        res.push(node.val)          // 访问它

        // 先压右孩子，再压左孩子（这样左孩子会先弹出）
        if (node.right) stack.push(node.right)
        if (node.left) stack.push(node.left)
    }
    return res
}

// 手动模拟: root = 1(left=2,right=3)
// stack=[1]
// pop 1 → res=[1], push 3, push 2 → stack=[3,2]
// pop 2 → res=[1,2], push 2.left, 2.right → stack=[3]
// pop 3 → res=[1,2,3], push 3.left, 3.right → stack=[]
// 结果: [1,2,3] ✓`

const inorderCode = `// ===== LeetCode 94: Binary Tree Inorder Traversal =====
// 顺序: 左 → 根 → 右
// 输入: [1,null,2,3]  输出: [1,3,2]

// ===== 递归版（对比）=====
function inorderRecursive(root: TreeNode | null): number[] {
    const res: number[] = []
    function dfs(node: TreeNode | null) {
        if (!node) return
        dfs(node.left)              // 先左
        res.push(node.val)          // 再根
        dfs(node.right)             // 再右
    }
    dfs(root)
    return res
}

// ===== 迭代版：一路向左 =====
function inorderTraversal(root: TreeNode | null): number[] {
    const res: number[] = []
    const stack: TreeNode[] = []
    let curr: TreeNode | null = root

    while (curr || stack.length > 0) {
        // Step 1: 一路向左，把所有左孩子压入栈
        while (curr) {
            stack.push(curr)
            curr = curr.left
        }
        // Step 2: 无左可走 → 弹出栈顶访问
        curr = stack.pop()!
        res.push(curr.val)

        // Step 3: 转向右子树（下一轮会对右子树继续"一路向左"）
        curr = curr.right
    }
    return res
}

// 手动模拟: root = 1(left=2,right=3)
//                          1
//                        /   \\
//                       2     3
//                      / \\
//                     4   5
//
// curr=1 → 压1, curr=2 → 压2, curr=4 → 压4, curr=null
// 弹4, res=[4], curr=4.right=null
// curr=null → 弹2, res=[4,2], curr=2.right=5
// curr=5 → 压5, curr=null
// 弹5, res=[4,2,5], curr=5.right=null
// curr=null → 弹1, res=[4,2,5,1], curr=1.right=3
// curr=3 → 压3, curr=null
// 弹3, res=[4,2,5,1,3], curr=null → 循环结束
// 结果: [4,2,5,1,3] ✓

// ===== 变体：按指针推进（同思路，另一种写法）=====
function inorderTraversal2(root: TreeNode | null): number[] {
    const res: number[] = []
    const stack: TreeNode[] = []
    let curr = root

    while (curr || stack.length > 0) {
        if (curr) {
            stack.push(curr)
            curr = curr.left
        } else {
            curr = stack.pop()!
            res.push(curr.val)
            curr = curr.right
        }
    }
    return res
}
// 这种写法和上面的等价的，但上面的 while-in-while 更易读`

const postorderCode = `// ===== LeetCode 145: Binary Tree Postorder Traversal =====
// 顺序: 左 → 右 → 根
// 输入: [1,null,2,3]  输出: [3,2,1]

// ===== 解法1: 反转前序法（推荐！）=====
// 思路: 前序是"根→左→右"，改成"根→右→左"再做 reverse 就是"左→右→根"！
function postorderTraversal(root: TreeNode | null): number[] {
    if (!root) return []
    const res: number[] = []
    const stack: TreeNode[] = [root]

    while (stack.length > 0) {
        const node = stack.pop()!
        res.push(node.val)                  // 访问根

        // ★ 注意：这里先压 LEFT 再压 RIGHT
        // 因为栈 LIFO → 先弹 RIGHT → 实现"根→右→左"
        if (node.left) stack.push(node.left)
        if (node.right) stack.push(node.right)
    }

    // reverse 得到"左→右→根"
    res.reverse()
    return res
}
// 时间 O(n)  空间 O(n)
// 这个技巧的优雅之处：只用前序代码，改一行压栈顺序 + 一行 reverse

// ===== 解法2: prev 指针法（单栈，更省空间，但更难写）=====
function postorderTraversal2(root: TreeNode | null): number[] {
    const res: number[] = []
    const stack: TreeNode[] = []
    let curr: TreeNode | null = root
    let prev: TreeNode | null = null  // 记录上次访问的节点

    while (curr || stack.length > 0) {
        // 一路向左
        while (curr) {
            stack.push(curr)
            curr = curr.left
        }

        curr = stack[stack.length - 1]  // 查看栈顶，不弹出

        // 条件：右子树为空 或 右子树已经访问过 → 可以访问根了
        if (!curr.right || curr.right === prev) {
            res.push(curr.val)
            stack.pop()         // 访问后才弹出
            prev = curr         // 记录为"已访问"
            curr = null         // ★ 置 null，下一轮会取栈顶
        } else {
            // 右子树还没访问 → 转向右子树
            curr = curr.right
        }
    }
    return res
}

// ===== 解法3: 双栈法（思路清晰）=====
function postorderTraversal3(root: TreeNode | null): number[] {
    if (!root) return []
    const s1: TreeNode[] = [root]  // 处理栈（模拟"根→左→右"）
    const s2: TreeNode[] = []       // 收集栈（暂存结果）

    while (s1.length > 0) {
        const node = s1.pop()!
        s2.push(node)               // 先把根放入 s2

        // s1 先压左再压右（这样弹出根后会先取右）
        if (node.left) s1.push(node.left)
        if (node.right) s1.push(node.right)
    }

    // s2 出栈顺序就是后序
    const res: number[] = []
    while (s2.length > 0) {
        res.push(s2.pop()!.val)
    }
    return res
}
// s1 的出入顺序: 根 → 右 → 左
// s2 的出入顺序: 根先入后出 → 右入 → 左入 → 左出 → 右出 → 根出
// s2 最终出栈就是 左→右→根 ✓`

const genericDFSCode = `// ===== 通用 DFS 模板：命令模式 =====
// 适用场景：需要精细控制遍历流程（暂停/恢复/插入自定义操作）

type Cmd =
    | { type: 'visit'; node: TreeNode }    // "访问"指令
    | { type: 'process'; node: TreeNode }  // "处理"指令（真正输出）

function traverse(root: TreeNode | null, order: 'pre' | 'in' | 'post'): number[] {
    if (!root) return []

    const res: number[] = []
    const stack: Cmd[] = [{ type: 'visit', node: root }]

    while (stack.length > 0) {
        const cmd = stack.pop()!

        if (cmd.type === 'process') {
            res.push(cmd.node.val)
            continue
        }

        // cmd.type === 'visit' → 按遍历顺序压入子指令
        const { node } = cmd

        if (order === 'pre') {
            // 前序: 根, 左, 右 → 压栈顺序: 右, 左, 根(process)
            if (node.right) stack.push({ type: 'visit', node: node.right })
            if (node.left)  stack.push({ type: 'visit', node: node.left })
            stack.push({ type: 'process', node })
        } else if (order === 'in') {
            // 中序: 左, 根, 右 → 压栈顺序: 右, 根, 左
            if (node.right) stack.push({ type: 'visit', node: node.right })
            stack.push({ type: 'process', node })
            if (node.left)  stack.push({ type: 'visit', node: node.left })
        } else if (order === 'post') {
            // 后序: 左, 右, 根 → 压栈顺序: 根, 右, 左
            stack.push({ type: 'process', node })
            if (node.right) stack.push({ type: 'visit', node: node.right })
            if (node.left)  stack.push({ type: 'visit', node: node.left })
        }
    }
    return res
}

// ===== 使用示例 =====
const tree = new TreeNode(1, new TreeNode(2), new TreeNode(3))
console.log(traverse(tree, 'pre'))   // [1, 2, 3]
console.log(traverse(tree, 'in'))    // [2, 1, 3]
console.log(traverse(tree, 'post'))  // [2, 3, 1]

// 这个模式的优势：
// 1. 一种结构支持三种遍历——只需改压栈顺序
// 2. 可扩展：加入自定义指令类型（如 'pause', 'markDepth', 'filter'）
// 3. 可暂停：while 换成 for 加 break 条件，下次从同一 stack 继续
// 4. 思路统一：框架源码中的可中断遍历都用类似模式`

const naryCode = `// ===== N 叉树的前序遍历（迭代）=====
interface NTreeNode { val: number; children: NTreeNode[] }

function preorderNary(root: NTreeNode | null): number[] {
    if (!root) return []
    const res: number[] = []
    const stack = [root]

    while (stack.length > 0) {
        const node = stack.pop()!
        res.push(node.val)

        // 从右往左压入子节点（栈 LIFO，最先压入的最后弹出）
        for (let i = node.children.length - 1; i >= 0; i--) {
            stack.push(node.children[i])
        }
    }
    return res
}

// ===== N 叉树的后序遍历（迭代 — 反转前序法）=====
function postorderNary(root: NTreeNode | null): number[] {
    if (!root) return []
    const res: number[] = []
    const stack = [root]

    while (stack.length > 0) {
        const node = stack.pop()!
        res.push(node.val)

        // 从左往右压入（反转后变成从右往左处理）
        for (const child of node.children) {
            stack.push(child)
        }
    }
    res.reverse()
    return res
}
// 后序: children 从左到右访问 → 根
// =  reverse( 根 → children 从右到左访问 )

// ===== 图的 DFS（迭代，visited 防止重复访问）=====
function graphDFS(graph: Map<number, number[]>, start: number): number[] {
    const res: number[] = []
    const visited = new Set<number>()
    const stack = [start]

    while (stack.length > 0) {
        const node = stack.pop()!
        if (visited.has(node)) continue  // 图可能有环，必须标记！
        visited.add(node)
        res.push(node)

        const neighbors = graph.get(node) || []
        // 从右往左压入（让编号小的邻居先访问）
        for (let i = neighbors.length - 1; i >= 0; i--) {
            if (!visited.has(neighbors[i])) {
                stack.push(neighbors[i])
            }
        }
    }
    return res
}
// 图的 DFS 关键：visited 集合！因为图有环，不加 visited 会死循环。
// 树的 DFS 不需要 visited——树天然无环且父子有明确方向。

// ===== 递归 vs 迭代 —— 栈的对应关系 =====
// 递归版 DFS:
// function dfs(node) {
//     if (!node) return
//     visit(node)       ← 对应 process 指令
//     dfs(node.left)    ← 对应 push visit(left)
//     dfs(node.right)   ← 对应 push visit(right)
// }
// 系统调用栈中的每一帧 = 显式栈中的一个数据结构 { node, state }
// "返回"上一个递归层 = 从显式栈中 pop + 恢复上下文
// 递归的本质就是用系统的栈空间换代码简洁性`;
</script>
