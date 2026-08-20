<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌿 分支限界原理：活结点 · 扩展结点 · 死结点</h1>
          <p class="text-sm text-slate-500 mt-1">在解空间树上用「队列 + 限界函数」逼近最优解</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 8-3-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：搜索树上的三类结点 + 限界剪枝
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>分支限界 (Branch and Bound, B&amp;B)</strong> 把待求的最优化问题组织成一棵<strong>解空间树</strong>，用<strong>队列</strong>逐层扩展（BFS），
          每生成一个结点就计算它的<strong>界值</strong>（上界或下界）。界值<strong>无法超越当前最优</strong>的结点直接变「死结点」不再扩展——
          这就是「剪枝」。整个过程围绕三种结点的状态流转展开。
        </p>

        <!-- 结构图：搜索树 + 三类结点 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 380" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="360" y="22" text-anchor="middle" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">分支限界搜索树 —— 三类结点的生命周期</text>

            <!-- 边 -->
            <line x1="360" y1="108" x2="236" y2="170" stroke="#94a3b8" stroke-width="2" />
            <line x1="360" y1="108" x2="484" y2="170" stroke="#94a3b8" stroke-width="2" />
            <line x1="236" y1="222" x2="168" y2="284" stroke="#94a3b8" stroke-width="2" />
            <line x1="236" y1="222" x2="304" y2="284" stroke="#94a3b8" stroke-width="2" />
            <line x1="484" y1="222" x2="416" y2="284" stroke="#94a3b8" stroke-width="2" />
            <line x1="484" y1="222" x2="576" y2="284" stroke="#94a3b8" stroke-width="2" />

            <!-- 根（已扩展/完成） -->
            <circle cx="360" cy="82" r="26" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="360" y="78" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">根</text>
            <text x="360" y="94" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#14532d">已扩展</text>

            <!-- 扩展结点（橙色） -->
            <circle cx="236" cy="196" r="26" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" />
            <text x="236" y="196" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#fff">扩展中</text>
            <text x="236" y="234" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#f59e0b" font-weight="bold">▲ 当前扩展</text>

            <!-- 活结点（cyan） -->
            <circle cx="484" cy="196" r="26" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="484" y="196" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#fff">活结点</text>
            <text x="484" y="234" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0891b2">排队中</text>

            <!-- 死结点（红 ✕） -->
            <circle cx="168" cy="310" r="24" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
            <text x="168" y="310" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#fff">✕</text>
            <text x="168" y="340" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#dc2626" font-weight="bold">死结点(剪枝)</text>

            <!-- 活结点 -->
            <circle cx="304" cy="310" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="304" y="310" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" font-weight="bold" fill="#fff">活结点</text>
            <text x="416" y="310" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" font-weight="bold" fill="#fff">活结点</text>

            <!-- 未生成（虚线） -->
            <circle cx="576" cy="310" r="24" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="576" y="310" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#64748b">未生成</text>

            <text x="360" y="368" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">活结点(已生成未扩展) → 出队变扩展结点 → 扩展完变已扩展 / 被剪枝变死结点</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：搜索树上结点的四种状态。死结点（✕）是分支限界「剪枝」的产物，其整棵子树都不用再访问。</figcaption>
        </figure>

        <!-- 操作示意：队列 + 限界函数 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">机制：队列逐层扩展 + 限界函数剪枝</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">队列（FIFO）：出队一个 → 孩子入队</p>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="bb-q" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <line x1="56" y1="64" x2="76" y2="64" stroke="#ef4444" stroke-width="2" marker-end="url(#bb-q)" />
              <text x="20" y="92" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ef4444" font-weight="bold">出队扩展</text>
              <rect x="40" y="46" width="46" height="36" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="63" y="64" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#fff">界15</text>
              <rect x="94" y="46" width="46" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="117" y="64" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#fff">界11</text>
              <rect x="148" y="46" width="46" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="171" y="64" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#fff">界8</text>
              <rect x="202" y="46" width="46" height="36" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="225" y="64" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">入队…</text>
              <text x="20" y="140" font-size="11" font-family="monospace" fill="#64748b">孩子按「先到先出」依次从队尾入队，界值越大越可能在前面</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">队列保证按 BFS 逐层推进；界值写在结点里，作为剪枝依据。</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">限界函数：界值比不过当前最优 → 剪枝</p>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="20" y="30" width="300" height="46" rx="8" fill="#ecfdf5" stroke="#4ade80" stroke-width="1.5" />
              <text x="170" y="48" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#059669">上界 bound = 已装价值 + 剩余容量按密度贪心</text>
              <text x="170" y="66" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#065f46">bound ≥ 该子树任意真正解 → 安全的「上限」</text>
              <rect x="20" y="96" width="300" height="46" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5" />
              <text x="170" y="114" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#dc2626">bound ≤ 当前最优 best → 剪枝（死结点 ✕）</text>
              <text x="170" y="132" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#991b1b">整棵子树不可能更优，无需再生成</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">最大化问题用上界：界值 ≤ best 的子树整棵剪掉。这是 B&amp;B 效率的来源。</figcaption>
          </figure>
        </div>

        <!-- 与回溯对比表 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2 mt-2">分支限界 vs 回溯（两者都用剪枝，但搜索方向不同）</h3>
        <div class="overflow-x-auto mb-2">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left">
              <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">回溯 (Backtracking)</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">分支限界 (B&amp;B)</th>
            </tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-medium">搜索顺序</td><td class="px-4 py-2 border">DFS（一路到底，再回溯）</td><td class="px-4 py-2 border">BFS / 优先队列（逐层或按界值）</td></tr>
              <tr><td class="px-4 py-2 border font-medium">剪枝依据</td><td class="px-4 py-2 border">约束函数（可行性：超界/冲突）</td><td class="px-4 py-2 border">限界函数（最优性：界 vs best）+ 约束函数</td></tr>
              <tr><td class="px-4 py-2 border font-medium">数据结构</td><td class="px-4 py-2 border font-mono">栈（递归）</td><td class="px-4 py-2 border font-mono">队列 / 优先队列</td></tr>
              <tr><td class="px-4 py-2 border font-medium">能否提前终止</td><td class="px-4 py-2 border text-amber-600">不能，要遍历完解空间</td><td class="px-4 py-2 border text-emerald-600">能——界值无法超越 best 就停</td></tr>
              <tr><td class="px-4 py-2 border font-medium">空间复杂度</td><td class="px-4 py-2 border font-mono">O(树深)</td><td class="px-4 py-2 border font-mono">O(树宽)（最坏 O(2^n)）</td></tr>
              <tr><td class="px-4 py-2 border font-medium">目标</td><td class="px-4 py-2 border">找所有解 / 判断解是否存在</td><td class="px-4 py-2 border">求最优解（最大化 / 最小化）</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-xs text-slate-400">同一棵解空间树，回溯是「先深挖一条路」的深度优先 + 约束剪枝；分支限界是「逐层铺开 + 界值剪枝」的广度优先 + 最优性剪枝。</p>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          解空间树 —— 把「穷举」组织成一棵树
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          很多最优化问题的解是一个<strong>决策序列</strong>：0/1 背包的「每件物品选/不选」、TSP 的「城市访问顺序」、N 皇后的「每一行放哪一列」。
          把所有可能的决策路径画出来，就是一棵<strong>解空间树 (Solution Space Tree)</strong>——根到叶子的每条路径就是一个<strong>候选解</strong>。
        </p>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          以 0/1 背包为例：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">n</code> 件物品，第 1 层决定物品 1 选不选，第 2 层决定物品 2，依此类推。
          每层分两叉，共 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">2^n</code> 个叶子 = 2^n 个候选解。这就是指数爆炸的来源：
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>为什么必须「聪明地搜索」？</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="font-mono">n=20</code> → 约 100 万候选解，还能硬搜</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="font-mono">n=30</code> → 10 亿候选解，已经要按秒数了</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="font-mono">n=60</code> → 10^18 个解，宇宙的年龄也算不完</span></li>
          </ul>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          分支限界和回溯的差别<strong>不在于是否遍历这棵树，而在于怎么走、能不能砍掉大半棵树</strong>。
          回溯靠「可行性」砍，分支限界靠「最优性」砍。
        </p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          解空间树就像前端做<strong>配置组合穷举</strong>——一个弹窗有「主题 × 尺寸 × 圆角 × 动画」4 个开关，全组合就是 <code>2^4 = 16</code> 种样式。<br/>
          而「穷举所有主题方案再挑最好看」就是朴素搜索；分支限界相当于<strong>先按某种评分剪掉明显不好看的组合</strong>，再在剩下的里挑。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          三个关键角色 —— 活结点 · 扩展结点 · 死结点
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          分支限界的术语源于「结点」的生命周期。理解这三个角色，就理解了算法的骨架：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left">
              <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">角色</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">去向</th>
            </tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-medium text-cyan-700">🔵 活结点 (Live)</td><td class="px-4 py-2 border">已经生成、但<strong>还没扩展</strong>的结点</td><td class="px-4 py-2 border">在队列里排队等待出队</td></tr>
              <tr><td class="px-4 py-2 border font-medium text-orange-500">🟠 扩展结点 (E-node)</td><td class="px-4 py-2 border">正在被扩展（生成它的孩子）的结点</td><td class="px-4 py-2 border">扩展完变「已扩展」</td></tr>
              <tr><td class="px-4 py-2 border font-medium text-red-500">🔴 死结点 (Dead)</td><td class="px-4 py-2 border">被限界函数或约束条件判定<strong>不可能产生更优解</strong>，或已扩展完毕的结点</td><td class="px-4 py-2 border">永久放弃，不再入队</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          整个算法就是一个循环：<strong>活结点出队 → 变扩展结点 → 生成孩子（孩子按界值决定成为活结点还是死结点）→ 原结点变为已扩展。</strong>
        </p>
        <div class="mb-4"><Code language="ts" :code="stateCode" title="node_states.ts" /></div>
        <ol class="space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>1.</strong> 根结点入队，成为第一个活结点</li>
          <li><strong>2.</strong> 队头活结点出队 → 成为<strong>扩展结点</strong>，生成它的所有孩子</li>
          <li><strong>3.</strong> 每个孩子先判断<strong>约束</strong>（是否可行）：不可行 → 死结点；可行 → 算<strong>界值</strong></li>
          <li><strong>4.</strong> 界值能超越当前最优 → 入队成为活结点；否则 → 死结点</li>
          <li><strong>5.</strong> 重复 2~4，直到队列为空</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          活结点 ≈ 任务队列（Task Queue）里的<strong>待办任务</strong>；扩展结点 ≈ 正在执行的<strong>当前任务</strong>；死结点 ≈ 被<strong>取消/合并</strong>的任务。<br/>
          前端事件循环就是这样「出队一个 → 执行 → 派发新任务」的；而「某任务优先级太低直接丢」就是剪枝。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          限界函数 —— 分支限界的「剪刀」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          限界函数 (Bounding Function) 给每个结点算出一个<strong>界值</strong>：<strong>最大化问题</strong>算<strong>上界</strong>（该子树能达到价值的<strong>天花板</strong>），
          <strong>最小化问题</strong>算<strong>下界</strong>（该子树费用最低能低到多少）。只要 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">界值 ≤ 当前最优 best</code>，
          就说明这棵子树<strong>再搜也追不上 best</strong>——整棵剪掉。
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">bound = 已获得的收益 + 剩余空间的最佳可能收益</p>
          <p class="text-xs text-cyan-600 text-center">求上界：用「贪心 + 放宽约束」估计剩余部分的最大潜力（下一节详述 0/1 背包上界公式）</p>
        </div>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed"><strong>界值要满足两个性质：</strong></p>
        <ul class="space-y-2 text-slate-600 mb-4 text-sm">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>可比较</strong>：界值必须能跟 <code class="font-mono">best</code> 直接比大小，所以是同一量纲</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>是安全的界</strong>：上界 ≥ 子树内任意真正解的收益；下界 ≤ 子树内任意真正解的费用。<strong>一旦不安全，剪枝就会剪掉正确答案</strong>——这是最常见的错误来源</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>尽量紧</strong>：界越紧（接近真实值），剪掉的越多，搜索越快。界太松退化成暴力搜索</span></li>
        </ul>
        <div class="mb-4"><Code language="ts" :code="boundCode" title="upper_bound.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 最危险的坑：界值不安全。</strong><br/>
          上界<strong>算小了</strong>会把明明能产生更优解的子树剪掉，答案是错的（下界算大了同理）。<br/>
          检验方法：先关闭剪枝跑一遍小数据，再开剪枝对比最优解是否一致。<br/>
          经验：用「放宽约束」得到的界天然安全（放松约束只会扩大可行域），而启发式猜测往往不安全。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          限界函数就像前端渲染里的<strong>提前短路</strong>——<code>if (score &lt;= best) return</code> 相当于 React 的 <code>React.memo</code> 或 Vue 的 <code>computed</code> 依赖检查：<br/>
          「这个分支的数据根本不可能改变结果，直接跳过，别浪费时间渲染」。<strong>界越紧 = 缓存命中率越高，性能越好。</strong></p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          分支限界 vs 回溯 —— BFS + 界 对 DFS + 约束
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          回溯和分支限界是解决同一类问题的两大搜索框架。一句话区分：<strong>回溯是「深挖 + 约束剪枝」；分支限界是「逐层铺开 + 界值剪枝」。</strong>
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>核心差异的直觉：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>回溯</strong>：一路走到叶子才知道「这条路行不行」，剪枝靠「此路已不可能满足约束」</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>分支限界</strong>：在<strong>中间结点</strong>就能用界值判断「这棵子树注定不是最优」，早砍早省</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>回溯更省空间</strong>（一条路走到底）；分支限界要拿队列装整层，<strong>空间换时间</strong></span></li>
          </ul>
        </div>
        <div class="mb-4"><Code language="ts" :code="compareCode" title="backtracking_vs_bb.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 怎么选：</strong>只求「有没有解 / 有几个解」用回溯；求「最优解」且能构造出紧的界，用分支限界。
          分支限界可以看作<strong>回溯的加强版</strong>——大多数回溯问题加一个限界函数，就升级成了分支限界。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          DFS 就像<strong>递归组件渲染整棵组件树</strong>——一路探到底再返回；BFS 就像 <code>document.querySelectorAll</code> 按 DOM 层级扫。<br/>
          而「界值剪枝」就像<strong>路由懒加载 + 无效 chunk 不预取</strong>：Vite/Rollup 靠依赖分析跳过不可能用到的模块，分支限界靠界值跳过不可能更优的子树。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          两种队列实现 —— 队列式 与 优先队列式
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          分支限界用<strong>队列</strong>管理活结点，但「下一个扩展谁」有两种策略：
        </p>
        <ul class="space-y-2 text-slate-600 mb-4 text-sm">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>队列式（FIFO，BFS）</strong>：严格先进先出，逐层推进。实现最简单，但会扩展很多界值很差的结点。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>优先队列式（LC 搜索，Best-First）</strong>：界值最大（最小化问题是最小）的优先扩展。优先扑向「最有希望」的分支，通常最快收敛，还能提前终止。</span></li>
        </ul>
        <div class="mb-4"><Code language="ts" :code="pqueueCode" title="lc_search.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 实战建议：</strong>优先队列式是主流。优先队列的「提前终止」条件——<strong>队头（界值最好的活结点）都超不过 best 了，后面的更不行</strong>——这一条往往能提前结束整个搜索。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑：JS 数组当优先队列别用 sort。</strong><br/>
          <code>pq.sort((a,b) =&gt; b.bound - a.bound)</code> 每次 O(n log n)，大数据会卡。工程上用<strong>二叉堆 / 优先队列</strong>（<code>heapq</code> 思路）让插入删除都 O(log n)。<br/>
          学习阶段用 sort 无妨，但要清楚它的代价。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：队列扩展 + 限界剪枝
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          3 件物品 <strong>X(w=2,v=6) · Y(w=3,v=9) · Z(w=1,v=2)</strong>，背包容量 <strong>5</strong>。初始最优 <strong>best=9</strong>（贪心只选 Y）。
          观察：活结点（🔵）出队变扩展结点（🟠），生成孩子；<strong>界值 ≤ best 的孩子直接变死结点（🔴 ✕）</strong>；
          到达叶子更新 best。圆圈里的数字是上界界值。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 活结点队列: {{ queue.length }}</span>
          <span class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">🏆 当前最优: {{ best }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @mousedown="doRun" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">▶ 分支限界（队列+剪枝）</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-text :config="{x:20, y:14, text:'活结点队列 (FIFO)', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-text :config="{x:230, y:14, text:'解空间树（决策 X→Y→Z · 圆圈数字=上界）', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-line v-for="e in bbEdges" :key="'e'+e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in bb" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in bb" :key="'t'+n.id" :config="txtCfg(n)" />
              <v-text v-for="n in bb" :key="'p'+n.id" :config="pathCfg(n)" />
              <v-text :config="{x:20, y:44, text:'↑ front 出队', fontSize:9, fontFamily:'monospace', fill:C.orange, fontStyle:'bold'}" />
              <v-rect v-for="(id,i) in queue" :key="'q'+id+'-'+i" :config="qRect(id,i)" />
              <v-text v-for="(id,i) in queue" :key="'qt'+id+'-'+i" :config="qText(id,i)" />
              <v-text v-if="!queue.length" :config="{x:20, y:64, width:94, height:36, text:'（空）', fontSize:10, fontFamily:'monospace', fill:C.muted, align:'center', verticalAlign:'middle'}" />
              <v-text :config="{x:20, y:290, text:'↓ rear 入队', fontSize:9, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
            </v-layer>
          </v-stage>
        </div>
        <p class="text-xs text-slate-400 mt-2">🟢 已扩展 &nbsp; 🔵 活结点(队列中) &nbsp; 🟠 扩展结点(正在处理) &nbsp; 🔴 死结点✕(剪枝/超重) &nbsp; ⚪ 未生成(虚线，被剪掉的子树) &nbsp; 叶子圆圈显示「v值」</p>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>分支限界 = 解空间树 + 队列扩展 + 限界函数剪枝</strong>，专门求解最优化问题</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三类结点：</strong>活结点（已生成未扩展）→ 扩展结点（正在扩展）→ 已扩展 / 死结点</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>限界函数：</strong>最大化算上界、最小化算下界；<strong>界值比不过 best → 剪枝</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>vs 回溯：</strong>回溯是 DFS + 约束剪枝（找所有解）；分支限界是 BFS/优先队列 + 界值剪枝（求最优解）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>优先队列式更快：</strong>优先扩展界值最好的结点，还能提前终止</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>界的质量决定效率：</strong>界要安全（不剪错）且尽量紧（多剪）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-2-backtracking/dsa-8-2-4-pruning" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：剪枝策略</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-3-branch-bound/dsa-8-3-2-tsp" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：TSP 与背包 →</RouterLink>
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
  { id: "sec-1", name: "解空间树" },
  { id: "sec-2", name: "三种结点" },
  { id: "sec-3", name: "限界函数" },
  { id: "sec-4", name: "vs 回溯" },
  { id: "sec-5", name: "队列实现" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 分支限界动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H = ref(430), W = ref(700)
const R = 16
interface BbN {
  id: number; path: string
  w: number; v: number; bound: number
  x: number; y: number
  st: 'hidden'|'live'|'expanding'|'done'|'dead'|'sol'
  leaf?: boolean; infeas?: boolean
  children: number[]
}
const bb = reactive<BbN[]>([])
const bbEdges = reactive<{a:number;b:number}[]>([])
const queue = reactive<number[]>([])
const best = ref(9)
const busy = ref(false), status = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const node = (id:number) => bb.find(n => n.id === id)!

function seedTree() {
  bb.length = 0
  const mk = (id:number, path:string, w:number, v:number, bound:number, ex?: Partial<BbN>) => {
    bb.push({ id, path, w, v, bound, x:0, y:0, st:'hidden', children:[], ...ex })
  }
  mk(0,  '根',           0, 0, 15)
  mk(1,  '选X',          2, 6, 15)
  mk(2,  '不选X',        0, 0, 11)
  mk(3,  '选X·选Y',      5, 15, 15)
  mk(4,  '选X·不选Y',    2, 6, 8)
  mk(5,  '不选X·选Y',    3, 9, 11)
  mk(6,  '不选X·不选Y',  0, 0, 2)
  mk(7,  '选X·选Y·选Z',  6, 17, 0, { infeas: true })
  mk(8,  '选X·选Y·不选Z',5, 15, 0, { leaf: true })
  mk(9,  '选X·不选Y·选Z',3, 8, 0,  { leaf: true })
  mk(10, '选X·不选Y·不选Z',2, 6, 0, { leaf: true })
  mk(11, '不选X·选Y·选Z',4, 11, 0, { leaf: true })
  mk(12, '不选X·选Y·不选Z',3, 9, 0, { leaf: true })
  mk(13, '不选X·不选Y·选Z',1, 2, 0, { leaf: true })
  mk(14, '不选X·不选Y·不选Z',0, 0, 0, { leaf: true })
  node(0).children=[1,2]; node(1).children=[3,4]; node(2).children=[5,6]
  node(3).children=[7,8]; node(4).children=[9,10]; node(5).children=[11,12]; node(6).children=[13,14]
  bbEdges.length = 0
  bb.forEach(n => n.children.forEach(c => bbEdges.push({ a:n.id, b:c })))
}
function layout() {
  const levels: number[][] = [[0],[1,2],[3,4,5,6],[7,8,9,10,11,12,13,14]]
  const X0 = 240, XW = 460
  levels.forEach((lv, li) => {
    const y = 70 + li * 78
    lv.forEach((id, i) => { node(id).x = X0 + XW*(i+1)/(lv.length+1); node(id).y = y })
  })
}
function resetAll() {
  bb.forEach(n => { n.st = 'hidden' })
  queue.length = 0
  best.value = 9
  status.value = ''
}
function edgeCfg(e: {a:number;b:number}) {
  const pa = node(e.a), pb = node(e.b)
  const on = pa.st !== 'hidden' && pb.st !== 'hidden'
  return { points:[pa.x, pa.y+R, pb.x, pb.y-R],
    stroke: on ? '#94a3b8' : '#cbd5e1', strokeWidth: on ? 2 : 1,
    dash: on ? undefined : [4,3], lineCap:'round' as const }
}
function circleCfg(n: any) {
  const base: any = { x:n.x, y:n.y, radius:R, stroke:'#64748b', strokeWidth:1.5,
    shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
  if (n.st==='hidden') return { ...base, fill:'#ffffff', stroke:'#cbd5e1', strokeWidth:1, strokeDasharray:[4,3], opacity:0.45, shadowBlur:0, shadowOffsetY:0 }
  if (n.st==='dead') return { ...base, fill:C.red, stroke:C.red }
  if (n.st==='expanding') return { ...base, fill:C.orange, stroke:C.text, strokeWidth:3 }
  if (n.st==='sol' || n.st==='done') return { ...base, fill:C.green, stroke:'#22c55e', strokeWidth: n.st==='sol' ? 3 : 1.5 }
  return { ...base, fill:C.cyan, stroke:'#0891b2' }
}
function txtCfg(n: any) {
  let text = ''
  if (n.st !== 'hidden') {
    if (n.st === 'dead') text = '✕'
    else if (n.leaf) text = 'v' + n.v
    else text = String(n.bound)
  }
  const dark = n.st === 'done' || n.st === 'sol'
  return { x:n.x-R, y:n.y-R, width:R*2, height:R*2, text, fontSize: n.leaf ? 10 : 11,
    fontFamily:'monospace', fontStyle:'bold', fill: dark ? C.text : '#fff',
    align:'center' as const, verticalAlign:'middle' as const }
}
function pathCfg(n: any) {
  const show = !n.leaf && !n.infeas && n.st !== 'hidden' && n.id > 0
  return { x:n.x-45, y:n.y+R+2, width:90, text: show ? n.path : '',
    fontSize:8, fontFamily:'monospace', fill:C.muted, align:'center' as const }
}
function qRect(id: number, i: number) {
  const front = i === 0
  return { x:20, y:64+i*42, width:94, height:36, fill:'#fff', cornerRadius:6,
    stroke: front ? C.orange : C.cyan, strokeWidth: front ? 2.5 : 1.5,
    shadowColor:'rgba(0,0,0,.08)', shadowBlur:3 }
}
function qText(id: number, i: number) {
  const n = node(id)
  return { x:20, y:64+i*42, width:94, height:36, text: n.path + '\n界 ' + n.bound,
    fontSize:9, fontFamily:'monospace', fill:C.text, align:'center' as const, verticalAlign:'middle' as const }
}
async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch(_) {}
  finally { await d(200); busy.value = false; status.value = '' }
}
function doReset() { resetAll() }

async function doRun() {
  act('分支限界  队列+界值剪枝  最坏 O(2^n)', async () => {
    resetAll()
    status.value = '初始可行解 best=9（贪心：只选 Y，价值 9）'
    await d(700)
    node(0).st = 'live'; queue.push(0)
    status.value = '根结点入队（界值 15）'
    await d(500)
    while (queue.length) {
      const id = queue.shift()!
      const n = node(id)
      n.st = 'expanding'
      status.value = `扩展结点 #${id}「${n.path}」（界值 ${n.bound}）`
      await d(550)
      for (const c of n.children) {
        const cn = node(c)
        if (cn.infeas) {
          cn.st = 'dead'
          status.value = `#${c}「${cn.path}」 超重 w=${cn.w} > 容量5 → 死结点`
          await d(480)
        } else if (cn.leaf) {
          cn.st = 'sol'
          if (cn.v > best.value) {
            best.value = cn.v
            status.value = `叶子 #${c} 价值 ${cn.v} > best=${best.value} → 当前最优更新！`
          } else {
            status.value = `叶子 #${c} 价值 ${cn.v} ≤ best=${best.value}，不更新`
          }
          await d(520)
        } else if (cn.bound <= best.value) {
          cn.st = 'dead'
          status.value = `#${c}「${cn.path}」界值 ${cn.bound} ≤ best=${best.value} → 剪枝（死结点）`
          await d(520)
        } else {
          cn.st = 'live'; queue.push(c)
          status.value = `#${c}「${cn.path}」界值 ${cn.bound} > best → 入队成为活结点`
          await d(460)
        }
      }
      n.st = 'done'
      await d(220)
    }
    status.value = `搜索结束 · 最优解 = ${best.value}（选 X + 选 Y）`
  })
}

let ro: ResizeObserver | null = null
onMounted(() => {
  seedTree(); layout()
  if (box.value) {
    W.value = box.value.clientWidth
    layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码常量 =====
const stateCode = `// 分支限界的状态机（以 0/1 背包为例）
type NodeState = '活结点' | '扩展结点' | '死结点'

interface BbNode {
  level: number      // 已经决策了几件物品
  weight: number     // 当前已装重量
  value: number      // 当前已装价值
  bound: number      // 上界 = value + 剩余容量按密度贪心
}

const queue: BbNode[] = []   // 活结点队列（FIFO）

while (queue.length) {
  const node = queue.shift()!      // 出队 → 成为扩展结点
  for (const child of genChildren(node)) {
    if (!feasible(child)) continue             // 约束：超重 → 死结点
    child.bound = upperBound(child)
    if (child.bound > best) queue.push(child)  // 能超越最优 → 活结点
    else /* 死结点 */ drop(child)              // 否则剪枝
  }
}
// 队列为空 → 搜索结束，best 即最优解`

const boundCode = `// 0/1 背包的限界函数（上界）
// 前提：物品已按价值密度 v/w 降序排列
// 思路：把「剩余容量」用贪心尽量装满（最后一件允许拿一部分），
//       这是对 0/1 约束的"放松" → 得到的安全上界

interface Item { w: number; v: number }

function upperBound(curV: number, curW: number,
                    items: Item[], cap: number): number {
  let bound = curV
  let left = cap - curW
  for (const it of items) {
    if (left <= 0) break
    if (it.w <= left) {                 // 整件放得下
      bound += it.v
      left -= it.w
    } else {                            // 最后一件：只按比例计入
      bound += (left / it.w) * it.v
      left = 0
    }
  }
  return bound
}

// 例：剩余容量 3，剩余物品 [(w2,v6),(w1,v2)] → 6 + 2 = 8
// 例：剩余容量 2，剩余物品 [(w3,v9),(w1,v2)] → (2/3)*9 + 2 = 8
// 注意：分数部分只是"上界估计"，并不对应真正可行的装法`

const compareCode = `// 同一棵解空间树上的两种走法
// ── 回溯（DFS + 约束剪枝）──
function backtrack(i: number, curW: number, curV: number) {
  if (i === n) { best = Math.max(best, curV); return }
  // 选 i：先检查可行性（约束函数）
  if (curW + w[i] <= cap) {
    backtrack(i + 1, curW + w[i], curV + v[i])
  }
  // 不选 i
  backtrack(i + 1, curW, curV)
}
// 只有"超重/冲突"这类可行性问题能剪

// ── 分支限界（BFS + 限界函数剪枝）──
function bb() {
  const q: BbNode[] = [{ i: 0, w: 0, v: 0 }]
  while (q.length) {
    const node = q.shift()!
    if (upperBound(node) <= best) continue   // 最优性剪枝：整棵子树没戏
    if (node.i === n) { best = Math.max(best, node.v); continue }
    if (node.w + w[node.i] <= cap) q.push({ i: node.i+1, w: node.w+w[node.i], v: node.v+v[node.i] })
    q.push({ i: node.i+1, w: node.w, v: node.v })
  }
}
// 在中间结点就用界值判断"注定不是最优"，砍得更早更狠`

const pqueueCode = `// 优先队列式分支限界（LC 搜索 / Best-First）
// 界值最大的活结点优先扩展 —— 优先扑向最有希望的分支

class MaxHeap { /* 上界优先的二叉堆：插入/删除 O(log n) */ }

function lcSearch(root: BbNode): number {
  const pq = new MaxHeap()          // 按 bound 从大到小
  pq.push(root)
  let best = greedyFeasible()       // 先求一个可行解作初始下界

  while (pq.size) {
    const node = pq.pop()!          // ★ 弹出界值最大的结点
    if (node.bound <= best) break   // ★ 队头都比不过 best → 提前终止
    if (node.level === n) {
      best = Math.max(best, node.v)
      continue
    }
    for (const child of genChildren(node)) {
      if (child.bound > best) pq.push(child)   // 只保留有希望的
    }
  }
  return best
}
// 相比 FIFO 队列式：不一定逐层推进，而是"哪里希望大先往哪去"
// 终止更快，通常少扩展大量"界值平庸"的结点`
</script>
