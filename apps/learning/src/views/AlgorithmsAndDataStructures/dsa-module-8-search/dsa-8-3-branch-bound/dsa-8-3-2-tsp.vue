<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🎒 TSP 与背包：分支限界的两个经典战场</h1>
          <p class="text-sm text-slate-500 mt-1">0/1 背包算上界 · 旅行商算下界 · 界值剪枝步步逼近最优</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 8-3-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：背包决策树 + 上界标注 + 背包示意
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          本章把上一节的<strong>分支限界框架</strong>落到两个著名 NP-Hard 问题上：
          <strong>0/1 背包</strong>（决策树 + <strong>上界</strong>）与 <strong>TSP 旅行商</strong>（排列树 + <strong>下界</strong>）。
          核心一句话：<strong>每生成一个结点就算界值，界值比不过当前最优就整棵剪掉</strong>。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">0/1 背包问题：容量内价值最大化</p>
            <svg viewBox="0 0 340 270" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="bb2-in" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <rect x="18" y="38" width="150" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="93" y="53" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">A · w2 · v6 · 密度3</text>
              <rect x="18" y="80" width="150" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="93" y="95" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">B · w3 · v9 · 密度3</text>
              <rect x="18" y="122" width="150" height="30" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="93" y="137" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">C · w2 · v8 · 密度4</text>
              <line x1="168" y1="53" x2="208" y2="88" stroke="#94a3b8" stroke-width="2" marker-end="url(#bb2-in)" />
              <line x1="168" y1="95" x2="208" y2="98" stroke="#94a3b8" stroke-width="2" marker-end="url(#bb2-in)" />
              <line x1="168" y1="137" x2="208" y2="108" stroke="#94a3b8" stroke-width="2" marker-end="url(#bb2-in)" />
              <rect x="212" y="58" width="112" height="66" rx="10" fill="#0f172a" stroke="#334155" stroke-width="2" />
              <text x="268" y="86" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#4ade80">背包</text>
              <text x="268" y="106" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#94a3b8">容量 C=6</text>
              <text x="20" y="186" font-size="11" font-family="monospace" fill="#64748b">目标：装下总价值最大 · 密度 = v/w（上界计算按密度降序）</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">背包问题示意：每件物品要么整件装、要么不装（0/1）。价值密度越高越"划算"。</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">决策树标注上界：界值比不过 best 就剪</p>
            <svg viewBox="0 0 340 270" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <line x1="170" y1="60" x2="88" y2="118" stroke="#94a3b8" stroke-width="2" />
              <line x1="170" y1="60" x2="252" y2="118" stroke="#94a3b8" stroke-width="2" />
              <line x1="88" y1="166" x2="48" y2="200" stroke="#94a3b8" stroke-width="2" />
              <line x1="88" y1="166" x2="128" y2="200" stroke="#94a3b8" stroke-width="2" />
              <line x1="252" y1="166" x2="212" y2="200" stroke="#94a3b8" stroke-width="2" />
              <line x1="252" y1="166" x2="292" y2="200" stroke="#94a3b8" stroke-width="2" />
              <circle cx="170" cy="36" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="170" y="36" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#fff">界20</text>
              <circle cx="88" cy="142" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="88" y="138" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#fff">选A</text>
              <text x="88" y="152" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">界20</text>
              <circle cx="252" cy="142" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="252" y="138" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#fff">不选A</text>
              <text x="252" y="152" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">界17</text>
              <circle cx="48" cy="220" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="48" y="216" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" font-weight="bold" fill="#fff">选B</text>
              <text x="48" y="230" text-anchor="middle" dominant-baseline="central" font-size="8" font-family="monospace" fill="#cffafe">界19</text>
              <circle cx="128" cy="220" r="20" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
              <text x="128" y="220" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#fff">✕</text>
              <circle cx="212" cy="220" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="212" y="216" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" font-weight="bold" fill="#fff">选B</text>
              <text x="212" y="230" text-anchor="middle" dominant-baseline="central" font-size="8" font-family="monospace" fill="#cffafe">界17</text>
              <circle cx="292" cy="220" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="292" y="220" text-anchor="middle" dominant-baseline="central" font-size="8" font-family="monospace" fill="#64748b">未生成</text>
              <text x="170" y="260" text-anchor="middle" font-size="10" font-family="monospace" fill="#dc2626" font-weight="bold">✕ = 界值14 ≤ best → 整棵子树剪掉</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">每个结点标注「上界界值」。界值 ≤ 当前最优 best 的结点（✕）及其子树不再访问。</figcaption>
          </figure>
        </div>

        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200 mb-4">
          <p class="text-sm font-bold text-cyan-800 mb-1 text-center font-mono">上界 bound = 当前价值 + 剩余容量按「价值密度」贪心（最后一件按比例）</p>
          <p class="text-xs text-cyan-600 text-center">下界 bound = 已走费用 + 剩余城市的「最小出边和」 —— 两个界都是对约束的"放松"，保证剪枝安全</p>
        </div>

        <h3 class="text-sm font-semibold text-slate-700 mb-2">两个问题的「界」对比</h3>
        <div class="overflow-x-auto mb-2">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left">
              <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">0/1 背包（最大化）</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">TSP（最小化）</th>
            </tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-medium">解空间树</td><td class="px-4 py-2 border">决策树（每层两叉：选/不选）</td><td class="px-4 py-2 border">排列树（每层多叉：下一站选谁）</td></tr>
              <tr><td class="px-4 py-2 border font-medium">界的类型</td><td class="px-4 py-2 border text-cyan-700 font-bold">上界</td><td class="px-4 py-2 border text-orange-600 font-bold">下界</td></tr>
              <tr><td class="px-4 py-2 border font-medium">界的求法</td><td class="px-4 py-2 border">剩余容量按密度贪心装（可拆分）</td><td class="px-4 py-2 border">剩余城市最小出边之和</td></tr>
              <tr><td class="px-4 py-2 border font-medium">剪枝条件</td><td class="px-4 py-2 border font-mono">bound ≤ best</td><td class="px-4 py-2 border font-mono">bound ≥ best</td></tr>
              <tr><td class="px-4 py-2 border font-medium">初始 best</td><td class="px-4 py-2 border">一个可行解（贪心下界）</td><td class="px-4 py-2 border">一个可行回路（贪心上界）</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          0/1 背包问题 —— 上界的计算
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>0/1 背包</strong>：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">n</code> 件物品，第 <code class="font-mono">i</code> 件重 <code class="font-mono">w[i]</code>、值 <code class="font-mono">v[i]</code>，
          背包容量 <code class="font-mono">C</code>。每件<strong>要么整件装、要么不装</strong>，求总价值最大的装法。
          这是分支限界最经典的入门例题，因为它有漂亮的上界函数。
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-base font-bold text-cyan-800 mb-2 text-center font-mono">价值密度 ρ = v / w　→　按 ρ 降序装剩余容量</p>
          <p class="text-xs text-cyan-600 text-center">上界 = 已装价值 + 把剩余容量按密度从高到低"能装多少装多少"（最后一件允许拆成比例）</p>
        </div>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">
          为什么这个界是<strong>安全的（上界）</strong>？因为它把「0/1」约束<strong>放松</strong>成「分数背包」——允许装物品的一部分。
          分数背包的解 ≥ 真正 0/1 的解（可行域变大了，最大值只增不减），所以它一定不会低估任何子树的真实价值。
        </p>
        <div class="mb-4"><Code language="ts" :code="densityCode" title="upper_bound.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          上界就像<strong>预算的乐观估计</strong>——「剩余预算按最划算的买法花光」就是上界；真正的购买方案受「每样必须整件买」限制，只可能更差。<br/>
          也像 CDN 的<strong>命中率上限</strong>：假设所有请求都命中缓存（放松约束）得到理想上界，实际命中率一定 ≤ 它。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          背包的分支限界 —— 完整流程
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          决策树第 <code class="font-mono">k</code> 层决定第 <code class="font-mono">k</code> 件物品选不选。每个结点存 <code class="font-mono">(level, w, v, bound)</code>：
          左孩子「选」（先查超重），右孩子「不选」。孩子算完上界，<strong>界值 ≤ best 就剪</strong>。
        </p>
        <ol class="space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>1.</strong> 物品按密度降序排序（保证上界计算正确）</li>
          <li><strong>2.</strong> 用贪心求一个可行解作初始 <code class="font-mono">best</code>（也可以从 0 开始）</li>
          <li><strong>3.</strong> 活结点出队 → 生成「选/不选」两个孩子</li>
          <li><strong>4.</strong> 「选」的孩子超重 → 死结点；否则算上界</li>
          <li><strong>5.</strong> 上界 ≤ best → 死结点；上界 &gt; best → 入队</li>
          <li><strong>6.</strong> 到达叶子（全部决策完）→ 更新 best；队列空 → 结束</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="knapsackCode" title="knapsack_bb.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 关键点：</strong>物品必须<strong>按密度降序</strong>排序，上界公式才成立。
          否则贪心装剩余容量的顺序错了，界值可能低估（不安全）→ 剪错答案。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：把分数部分当成了真实解。</strong><br/>
          上界里「最后一件按比例」只是<strong>估计天花板</strong>，并不是真正可执行的装法。最终答案必须是<strong>整数件</strong>的组合。
          写代码时只拿 <code class="font-mono">bound</code> 做剪枝比较，叶子才更新 best——不要直接用分数界当答案。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          TSP 问题 —— 下界的计算
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>TSP（旅行商问题）</strong>：一个商人要从家出发，<strong>恰好访问每个城市一次</strong>再回家，求总路程最短的回路。
          对称 TSP 有 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">(n-1)!/2</code> 种回路——12 个城市就有约 2000 万种，14 个城市约 30 亿种。
        </p>
        <div class="bg-linear-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-base font-bold text-amber-700 mb-2 text-center font-mono">下界 = 已走费用 + 剩余城市「最小出边」之和</p>
          <p class="text-xs text-amber-600 text-center">任何回路里每个城市都恰好贡献一条出边 → 每条出边 ≥ 该城市的最小出边 → 总和是安全下界</p>
        </div>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">
          直觉：无论回路怎么走，<strong>每个城市都要「出去」一次</strong>。出去的代价至少是它所有出边里最短的那条。
          把「当前所在城市 + 所有未访问城市」的最小出边加起来，一定 ≤ 真正完成回路还需要的代价——所以是<strong>安全的（下界）</strong>。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>4 城实例（对称距离矩阵）：</strong></p>
          <div class="overflow-x-auto">
            <table class="text-sm border-collapse text-slate-600">
              <tbody>
                <tr><td class="px-3 py-1 font-bold">dist</td><td class="px-3 py-1">A</td><td class="px-3 py-1">B</td><td class="px-3 py-1">C</td><td class="px-3 py-1">D</td></tr>
                <tr><td class="px-3 py-1 font-bold">A</td><td class="px-3 py-1">0</td><td class="px-3 py-1">3</td><td class="px-3 py-1">4</td><td class="px-3 py-1">2</td></tr>
                <tr><td class="px-3 py-1 font-bold">B</td><td class="px-3 py-1">3</td><td class="px-3 py-1">0</td><td class="px-3 py-1">5</td><td class="px-3 py-1">6</td></tr>
                <tr><td class="px-3 py-1 font-bold">C</td><td class="px-3 py-1">4</td><td class="px-3 py-1">5</td><td class="px-3 py-1">0</td><td class="px-3 py-1">1</td></tr>
                <tr><td class="px-3 py-1 font-bold">D</td><td class="px-3 py-1">2</td><td class="px-3 py-1">6</td><td class="px-3 py-1">1</td><td class="px-3 py-1">0</td></tr>
              </tbody>
            </table>
          </div>
          <p class="text-xs text-slate-500 mt-2">最小出边：A→2(D) · B→3(A) · C→1(D) · D→1(C)　→　根下界 = 2+3+1+1 = <strong>7</strong></p>
        </div>
        <div class="mb-4"><Code language="ts" :code="tspBoundCode" title="tsp_lower_bound.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          TSP 下界就像<strong>外卖配送路线的最低估价</strong>——不知道具体路线，但「每送一单至少要走它最近的那条路」，
          把每单的最小可能路程加起来，就是整趟配送的<strong>乐观下限</strong>。<br/>
          也像 Git 的「最短提交图路径」：任何提交图遍历每条 commit 至少要走它的最短边，先估个下界再搜。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          TSP 的分支限界 —— 完整流程
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          结点表示<strong>部分回路</strong>（已访问的城市序列）。根结点从家出发；每扩展一次就尝试把「下一个未访问城市」接到末尾。
          到达叶子（访问完所有城市 + 回到起点）就是一个<strong>完整回路</strong>，更新 best。<strong>下界 ≥ best 就剪</strong>。
        </p>
        <ol class="space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>1.</strong> 用「最近邻贪心」求一个可行回路作初始 <code class="font-mono">best</code>（上界）</li>
          <li><strong>2.</strong> 活结点出队 → 对每个未访问城市生成一个孩子（把该城市接到路径末尾）</li>
          <li><strong>3.</strong> 每个孩子算下界：<code class="font-mono">已走费用 + 剩余城市最小出边和</code></li>
          <li><strong>4.</strong> 下界 ≥ best → 死结点（剪枝）；否则入队</li>
          <li><strong>5.</strong> 叶子（n 个城市都走完）→ 补上回程，更新 best</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="tspCode" title="tsp_bb.ts" /></div>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">
          <strong>小推演</strong>：家 A，最近邻贪心回路 <code class="font-mono">A→D→C→B→A = 2+1+5+3 = 11</code>，令 best=11。
          根下界 7 &lt; 11 入队；扩展「A→D」结点：下界 <code class="font-mono">2 + min出边D(1) + min出边B(3) + min出边C(1) = 7</code> &lt; 11 继续；
          再接 B 成「A→D→B」：下界 <code class="font-mono">(2+6) + min出边C(1) = 9</code> &lt; 11 继续；接 C 成完整回路 <code class="font-mono">A→D→B→C→A = 2+6+5+4 = 17</code> ≥ 11 不更新。
          另一支「A→D→C」→「A→D→C→B」→ 回路 <code class="font-mono">A→D→C→B→A = 11</code>，等于 best 不更新。最终最优 11。
        </p>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么分支限界能做 TSP：</strong>朴素枚举 14 个城市要试 30 亿种回路；下界函数在<strong>中间结点</strong>就证明「这条路注定 ≥ 当前最优」，
          砍掉绝大部分排列。最优的 TSP 精确算法（分支限界/分支定界）至今仍是求解大规模 TSP 的主力。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>对称 TSP 只扩展 <code class="font-mono">(cur, other)</code> 且 <code class="font-mono">cur &lt; other</code> 的孩子（双向同价，只走一遍）；
          对 1-2-3 个城市规模的回路直接枚举判优，减少叶层开销。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          TSP 分支限界就是<strong>地图 App 的路线优化</strong>——先给一个「当前最短路线」，然后尝试换序，一旦某条路径的估算
          已经超过当前最优就<strong>整支放弃</strong>，绝不浪费时间展开它。和「剪枝 K 短路、A* 用下界剪枝」是同一个思想。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          上界 vs 下界 —— 最大化与最小化的统一视角
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          背包求最大用<strong>上界</strong>，TSP 求最小用<strong>下界</strong>。方向相反，本质相同——都是<strong>「放宽约束」得到的乐观估计</strong>：
        </p>
        <ul class="space-y-2 text-slate-600 mb-4 text-sm">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>上界（最大化）</strong>：放宽「0/1 只能整件」→ 允许分数 → 乐观天花板。剪枝：<code class="font-mono">bound ≤ best</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>下界（最小化）</strong>：放宽「必须恰好构成一个环」→ 只要求每条出边 ≥ 最小值 → 乐观地板。剪枝：<code class="font-mono">bound ≥ best</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>同一个抽象</strong>：界值和 best 比较，决定「剪」还是「继续」——这就是分支限界的全部秘密</span></li>
        </ul>
        <div class="mb-4"><Code language="ts" :code="boundCompareCode" title="bound_unified.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 方向记反是高频 Bug：</strong><br/>
          最大化剪枝用 <code class="font-mono">&lt;=</code>（界值 ≤ best 剪）；最小化剪枝用 <code class="font-mono">&gt;=</code>（界值 ≥ best 剪）。<br/>
          建议先写注释标明「最大化 / 最小化」，再把比较符抄在注释旁边，避免在背代码时写反。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆口诀：</strong>「求大剪小、求小剪大」——求最大值时，界值比不过 best（小）就剪；求最小值时，界值比 best 还大就剪。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：0/1 背包分支限界逐步
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          3 件物品 <strong>A(w=2·v=6·密度3) · B(w=3·v=9·密度3) · C(w=2·v=8·密度4)</strong>，容量 <strong>6</strong>，决策顺序 A→B→C，初始 best=0。
          观察<strong>每个结点怎么算上界</strong>：剩余容量按密度（C→A→B）贪心，最后一件按比例。<strong>上界 ≤ 当前最优就剪枝（🔴 ✕）</strong>。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 活结点队列: {{ queue.length }}</span>
          <span class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">🏆 当前最优: {{ best }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @mousedown="doRun" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">▶ 0/1 背包分支限界</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-text :config="{x:20, y:14, text:'活结点队列 (FIFO)', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-text :config="{x:230, y:14, text:'决策树（决策 A→B→C · 圆圈数字=上界）', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
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
        <p class="text-xs text-slate-400 mt-2">🟢 已扩展 &nbsp; 🔵 活结点(队列中) &nbsp; 🟠 扩展结点(正在处理) &nbsp; 🔴 死结点✕(剪枝/超重) &nbsp; ⚪ 未生成(虚线) &nbsp; 叶子显示「v值」&nbsp; 上界按密度 C→A→B 贪心计算</p>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>0/1 背包</strong>：决策树 + <strong>上界</strong>（剩余容量按密度贪心，最后一件按比例）；剪枝 <code class="font-mono">bound ≤ best</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>TSP</strong>：排列树 + <strong>下界</strong>（已走费用 + 剩余城市最小出边和）；剪枝 <code class="font-mono">bound ≥ best</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>界必须安全</strong>：上界是放宽约束后的乐观天花板、下界是乐观地板——算错方向会把最优解剪丢</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>界要尽量紧</strong>：界越接近真实值，剪得越多，搜索越快</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>初始 best</strong> 用贪心可行解，能大幅提升剪枝效率</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>统一视角</strong>：最大化用上界、最小化用下界——「求大剪小、求小剪大」</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-3-branch-bound/dsa-8-3-1-principle" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：分支限界原理</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-9-dp/dsa-9-1-fundamentals/dsa-9-1-1-principle" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：动态规划原理 →</RouterLink>
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
  { id: "sec-1", name: "背包上界" },
  { id: "sec-2", name: "背包分支限界" },
  { id: "sec-3", name: "TSP 下界" },
  { id: "sec-4", name: "TSP 分支限界" },
  { id: "sec-5", name: "上界vs下界" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 0/1 背包分支限界动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H = ref(430), W = ref(700)
const R = 16
interface KpN {
  id: number; path: string
  w: number; v: number; bound: number
  exp: string                       // 上界的计算过程（用于状态栏展示）
  x: number; y: number
  st: 'hidden'|'live'|'expanding'|'done'|'dead'|'sol'
  leaf?: boolean; infeas?: boolean
  children: number[]
}
const bb = reactive<KpN[]>([])
const bbEdges = reactive<{a:number;b:number}[]>([])
const queue = reactive<number[]>([])
const best = ref(0)
const busy = ref(false), status = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const node = (id:number) => bb.find(n => n.id === id)!

function seedTree() {
  bb.length = 0
  const mk = (id:number, path:string, w:number, v:number, bound:number, exp:string, ex?: Partial<KpN>) => {
    bb.push({ id, path, w, v, bound, exp, x:0, y:0, st:'hidden', children:[], ...ex })
  }
  mk(0,  '根',           0, 0, 20, '0 + 8 + 6 + (2/3)×9 = 20')
  mk(1,  '选A',          2, 6, 20, '6 + 8 + (2/3)×9 = 20')
  mk(2,  '不选A',        0, 0, 17, '0 + 8 + 9 = 17')
  mk(3,  '选A·选B',      5, 15, 19, '15 + (1/2)×8 = 19')
  mk(4,  '选A·不选B',    2, 6, 14, '6 + 8 = 14')
  mk(5,  '不选A·选B',    3, 9, 17, '9 + 8 = 17')
  mk(6,  '不选A·不选B',  0, 0, 8,  '0 + 8 = 8')
  mk(7,  '选A·选B·选C',  7, 23, 0, '', { infeas: true })
  mk(8,  '选A·选B·不选C',5, 15, 0, '', { leaf: true })
  mk(9,  '选A·不选B·选C',4, 14, 0, '', { leaf: true })
  mk(10, '选A·不选B·不选C',2, 6, 0, '', { leaf: true })
  mk(11, '不选A·选B·选C',5, 17, 0, '', { leaf: true })
  mk(12, '不选A·选B·不选C',3, 9, 0, '', { leaf: true })
  mk(13, '不选A·不选B·选C',2, 8, 0, '', { leaf: true })
  mk(14, '不选A·不选B·不选C',0, 0, 0, '', { leaf: true })
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
  best.value = 0
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
  act('0/1 背包分支限界  队列+上界剪枝  最坏 O(2^n)', async () => {
    resetAll()
    status.value = 'best=0 开始（本例贪心刚好等于最优，先不预置）'
    await d(650)
    node(0).st = 'live'; queue.push(0)
    status.value = `根入队：上界 = ${node(0).exp}`
    await d(550)
    while (queue.length) {
      const id = queue.shift()!
      const n = node(id)
      n.st = 'expanding'
      status.value = `扩展结点 #${id}「${n.path}」`
      await d(480)
      for (const c of n.children) {
        const cn = node(c)
        if (cn.infeas) {
          cn.st = 'dead'
          status.value = `#${c}「${cn.path}」 超重 w=${cn.w} > 容量6 → 死结点`
          await d(480)
        } else if (cn.leaf) {
          cn.st = 'sol'
          if (cn.v > best.value) {
            best.value = cn.v
            status.value = `叶子 #${c}「${cn.path}」价值 ${cn.v} > best → 当前最优更新为 ${cn.v}！`
          } else {
            status.value = `叶子 #${c}「${cn.path}」价值 ${cn.v} ≤ best=${best.value}，不更新`
          }
          await d(520)
        } else if (cn.bound <= best.value) {
          cn.st = 'dead'
          status.value = `#${c}「${cn.path}」上界 = ${cn.exp} = ${cn.bound} ≤ 当前最优 ${best.value} → 剪枝`
          await d(560)
        } else {
          cn.st = 'live'; queue.push(c)
          status.value = `#${c}「${cn.path}」上界 = ${cn.exp} = ${cn.bound} > best=${best.value} → 入队`
          await d(560)
        }
      }
      n.st = 'done'
      await d(220)
    }
    status.value = `搜索结束 · 最优解 = ${best.value}（不选A + 选B + 选C = 9+8）`
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
const densityCode = `// 0/1 背包的上界：按价值密度贪心装剩余容量（最后一件按比例）
// 价值密度 = v / w，密度越高越"划算"

interface Item { w: number; v: number }
interface Node { level: number; w: number; v: number; bound: number }

// ① 物品按密度降序 —— 上界公式成立的前提
items.sort((a, b) => b.v / b.w - a.v / a.w)

// ② 上界函数
function upperBound(node: Node, items: Item[], cap: number): number {
  let { level, w, v } = node
  let bound = v
  let left = cap - w
  while (level < items.length && items[level].w <= left) {
    bound += items[level].v       // 整件装下
    left -= items[level].w
    level++
  }
  if (level < items.length) {
    bound += (left / items[level].w) * items[level].v  // 最后一件按比例
  }
  return bound
}
// 例：剩余容量 2，剩余物品按密度 [(w2,v8),(w3,v9),(w2,v6)]
//    → 先装 v8（剩 0）→ bound = 当前价值 + 8
// 例：剩余容量 1 → 8 装不下，按比例 (1/2)*8 = 4 → bound = 当前价值 + 4`

const knapsackCode = `// ===== 0/1 背包分支限界（优先队列式，最大堆）=====
class MaxHeap { /* 按 bound 降序的二叉堆 */ }

function knapsackBB(items: Item[], cap: number): number {
  items.sort((a, b) => b.v / b.w - a.v / a.w)   // 密度降序

  // 贪心求初始可行解作 best（下界）
  let best = 0
  let { w: gw, v: gv } = { w: 0, v: 0 }
  for (const it of items) {
    if (gw + it.w <= cap) { gw += it.w; gv += it.v }
  }
  best = gv

  const root: Node = { level: 0, w: 0, v: 0, bound: upperBound({level:0,w:0,v:0}, items, cap) }
  const pq = new MaxHeap()
  pq.push(root)

  while (!pq.empty()) {
    const node = pq.pop()!
    if (node.bound <= best) break            // ★ 队头都不行 → 提前终止
    if (node.level === items.length) {       // 叶子：完整方案
      best = Math.max(best, node.v)
      continue
    }
    const it = items[node.level]
    // 左孩子：选 it（先查可行性）
    if (node.w + it.w <= cap) {
      const c = { level: node.level+1, w: node.w+it.w, v: node.v+it.v, bound: 0 }
      c.bound = upperBound(c, items, cap)
      if (c.bound > best) pq.push(c)
    }
    // 右孩子：不选 it
    const s = { level: node.level+1, w: node.w, v: node.v, bound: 0 }
    s.bound = upperBound(s, items, cap)
    if (s.bound > best) pq.push(s)
  }
  return best
}
// 复杂度：最坏 O(2^n)；界越紧，实际访问结点越少`

const tspBoundCode = `// ===== TSP 的下界：最小出边和 =====
// 任何回路里每个城市都恰好贡献一条"出边"。
// 所以完成回路的总代价 ≥ 每个城市最小出边之和（安全下界）。

const dist: number[][] = [
  [0, 3, 4, 2],
  [3, 0, 5, 6],
  [4, 5, 0, 1],
  [2, 6, 1, 0],
]

function minOutEdge(c: number): number {
  let m = Infinity
  for (let j = 0; j < dist.length; j++) {
    if (j !== c) m = Math.min(m, dist[c][j])
  }
  return m
}

// 已走路径到 cur（费用 costSoFar），visited 已访问集合
function tspLowerBound(cur: number, costSoFar: number, visited: Set<number>): number {
  let bound = costSoFar
  bound += minOutEdge(cur)              // 当前城市还要"出去"一次
  for (let c = 0; c < dist.length; c++) {
    if (!visited.has(c) && c !== cur) {
      bound += minOutEdge(c)            // 每个未访问城市至少出一条边
    }
  }
  return bound
}
// 例：4 城实例，根下界 = min出边(A..D) = 2+3+1+1 = 7 ≤ 最优回路 11`

const tspCode = `// ===== TSP 分支限界（队列式示意）=====
interface TspNode {
  tour: number[]      // 已访问城市序列
  cost: number        // 已走费用
  bound: number       // 下界
}

function tspBB(start: number): number {
  const n = dist.length
  let best = nearestNeighborTour(start)      // 贪心回路（上界）

  const root: TspNode = { tour: [start], cost: 0, bound: 0 }
  root.bound = tspLowerBound(start, 0, new Set([start]))
  const q: TspNode[] = [root]

  while (q.length) {
    const node = q.shift()!
    if (node.bound >= best) continue          // 下界超不过 best → 剪枝
    if (node.tour.length === n) {
      // 回起点，得到完整回路
      const total = node.cost + dist[node.tour[n-1]][start]
      best = Math.min(best, total)
      continue
    }
    for (let c = 0; c < n; c++) {
      if (node.tour.includes(c)) continue     // 城市已访问
      const cost = node.cost + dist[node.tour[node.tour.length-1]][c]
      const visited = new Set(node.tour); visited.add(c)
      const bound = tspLowerBound(c, cost, visited)
      if (bound < best) q.push({ tour: [...node.tour, c], cost, bound })
    }
  }
  return best
}
// 叶子补回程；bound ≥ best 的子树整棵放弃`

const boundCompareCode = `// 上界与下界：一个抽象，两种方向
// ─────────────────────────────────────────
//  目标        最大化（背包）      最小化（TSP）
//  界的性质    上界 (天花板)        下界 (地板)
//  放宽什么    "0/1只能整件"→可分数  "必须成环"→只取最小出边
//  剪枝条件    bound <= best       bound >= best
// ─────────────────────────────────────────

// 统一伪代码：
function branchAndBound(root, isMaximize: boolean) {
  const better = isMaximize
    ? (b: number, best: number) => b > best    // 上界能超越 best 才继续
    : (b: number, best: number) => b < best    // 下界能低于 best 才继续
  const prune = isMaximize
    ? (b: number, best: number) => b <= best
    : (b: number, best: number) => b >= best

  const q: Node[] = [root]
  let best = isMaximize ? -Infinity : Infinity
  while (q.length) {
    const node = q.shift()!
    if (prune(node.bound, best)) continue   // 剪枝
    if (isLeaf(node)) { best = better(node.val, best) ? node.val : best; continue }
    for (const child of children(node)) q.push(child)
  }
  return best
}
// 记忆：「求大剪小、求小剪大」`
</script>
