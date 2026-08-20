<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔀 排列组合：全排列 / 子集 / 组合总和</h1>
          <p class="text-sm text-slate-500 mt-1">一个模板打天下——used 标记、选/不选、start 去重三种变体</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 8-2-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：全排列 [1,2,3] 的决策树（6 个叶子）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          全排列要求<strong>每个数字必须用且只能用一次</strong>，所以每层都要用 <strong>used 数组</strong>排除已选的数字。
          下图是 [1,2,3] 的完整决策树：根为空序列，第 1 层 3 种选法，第 2 层每种有 2 种选法，
          第 3 层每种只有 1 种选法——<strong>共 3×2×1 = 6 个绿色叶子 = 6 个全排列</strong>。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 330" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <!-- 边 -->
            <line x1="360" y1="68" x2="120" y2="98" stroke="#94a3b8" stroke-width="1.8" />
            <line x1="360" y1="68" x2="360" y2="98" stroke="#94a3b8" stroke-width="1.8" />
            <line x1="360" y1="68" x2="600" y2="98" stroke="#94a3b8" stroke-width="1.8" />
            <line x1="120" y1="138" x2="40" y2="168" stroke="#94a3b8" stroke-width="1.8" />
            <line x1="120" y1="138" x2="200" y2="168" stroke="#94a3b8" stroke-width="1.8" />
            <line x1="360" y1="138" x2="280" y2="168" stroke="#94a3b8" stroke-width="1.8" />
            <line x1="360" y1="138" x2="440" y2="168" stroke="#94a3b8" stroke-width="1.8" />
            <line x1="600" y1="138" x2="520" y2="168" stroke="#94a3b8" stroke-width="1.8" />
            <line x1="600" y1="138" x2="680" y2="168" stroke="#94a3b8" stroke-width="1.8" />
            <line x1="40" y1="208" x2="40" y2="238" stroke="#94a3b8" stroke-width="1.8" />
            <line x1="200" y1="208" x2="200" y2="238" stroke="#94a3b8" stroke-width="1.8" />
            <line x1="280" y1="208" x2="280" y2="238" stroke="#94a3b8" stroke-width="1.8" />
            <line x1="440" y1="208" x2="440" y2="238" stroke="#94a3b8" stroke-width="1.8" />
            <line x1="520" y1="208" x2="520" y2="238" stroke="#94a3b8" stroke-width="1.8" />
            <line x1="680" y1="208" x2="680" y2="238" stroke="#94a3b8" stroke-width="1.8" />

            <!-- 根 -->
            <circle cx="360" cy="48" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="48" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">∅</text>

            <!-- 第 1 层 -->
            <circle cx="120" cy="118" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="120" y="118" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#fff">1</text>
            <circle cx="360" cy="118" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="118" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#fff">2</text>
            <circle cx="600" cy="118" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="600" y="118" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#fff">3</text>

            <!-- 第 2 层 -->
            <circle cx="40" cy="188" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="40" y="188" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">12</text>
            <circle cx="200" cy="188" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="200" y="188" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">13</text>
            <circle cx="280" cy="188" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="280" y="188" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">21</text>
            <circle cx="440" cy="188" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="440" y="188" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">23</text>
            <circle cx="520" cy="188" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="520" y="188" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">31</text>
            <circle cx="680" cy="188" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="680" y="188" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#fff">32</text>

            <!-- 第 3 层：绿色叶子（6 个解） -->
            <circle cx="40" cy="258" r="20" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="40" y="258" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">123</text>
            <circle cx="200" cy="258" r="20" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="200" y="258" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">132</text>
            <circle cx="280" cy="258" r="20" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="280" y="258" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">213</text>
            <circle cx="440" cy="258" r="20" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="440" y="258" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">231</text>
            <circle cx="520" cy="258" r="20" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="520" y="258" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">312</text>
            <circle cx="680" cy="258" r="20" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="680" y="258" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">321</text>

            <text x="360" y="304" text-anchor="middle" font-size="11" font-family="monospace" fill="#16a34a" font-weight="bold">6 个叶子 = 3! = 6 个全排列 ✓</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：全排列 [1,2,3] 决策树。每个节点 = 当前已选序列；第 k 层的孩子数 = n-k（剩下的未用数字个数），所以第 3 层每个节点只有 1 个孩子</figcaption>
        </figure>

        <!-- used 机制示意 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">used 数组如何工作</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">走到 [1] 时：used=[✓,·,·]，下层只能选 2 或 3</p>
            <svg viewBox="0 0 340 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="30" y="44" width="46" height="40" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="53" y="64" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">1</text>
              <text x="53" y="98" text-anchor="middle" font-size="10" font-family="monospace" fill="#ef4444">used ✗</text>
              <rect x="120" y="44" width="46" height="40" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="143" y="64" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">2</text>
              <text x="143" y="98" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a">可用 ✓</text>
              <rect x="210" y="44" width="46" height="40" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="233" y="64" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
              <text x="233" y="98" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a">可用 ✓</text>
              <text x="170" y="20" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">used[1] = true → 下层跳过 1</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">撤销后回 [1]：used=[✓,·,·] 依旧，试下一个候选 3</p>
            <svg viewBox="0 0 340 120" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="30" y="44" width="46" height="40" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="53" y="64" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#64748b">1</text>
              <text x="53" y="98" text-anchor="middle" font-size="10" font-family="monospace" fill="#ef4444">used ✗</text>
              <rect x="120" y="44" width="46" height="40" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="143" y="64" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <text x="143" y="98" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">已试</text>
              <rect x="210" y="44" width="46" height="40" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
              <text x="233" y="64" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
              <text x="233" y="98" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a">下一个 ✓</text>
              <text x="170" y="20" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">for 循环继续 → 选 3，used[3]=true</text>
            </svg>
          </figure>
        </div>
        <p class="text-xs text-slate-400 mt-2">关键：撤销就是 <code>used[i]=false</code>——把数字「还回去」，让下一个兄弟分支能用。漏掉它，兄弟分支就少一个候选。</p>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          全排列 —— used 数组标记已用
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          排列是「<strong>有序</strong>」的组合：<code>[1,2,3]</code> 和 <code>[2,1,3]</code> 是两个不同的解。
          因此每个位置都可以从<strong>全部数字</strong>里选，但<strong>不能重复选同一个数字</strong>——用 <code>used</code> 数组标记。
        </p>
        <div class="mb-4"><Code language="ts" :code="permuteCode" title="permute.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ used 撤销是排列题的头号杀手：</strong><br/>
          <code>path.pop()</code> 和 <code>used[i] = false</code> 必须<strong>成对出现</strong>。
          只弹出 path 而忘了还原 used，会在兄弟分支看到「幽灵占用」，导致漏解（该出现的排列没出现）。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          子集 —— 「选 / 不选」的二叉决策
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          子集（幂集）的决策树是<strong>二叉树</strong>：对每个元素只有「加入」或「不加入」两种选择。
          走到数组末尾时，当前 path 就是一个子集。<code>[1,2,3]</code> 有 <code>2^3 = 8</code> 个子集。
        </p>
        <div class="mb-4"><Code language="ts" :code="subsetCode" title="subsets.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          子集的「选/不选」就像<strong>给权限位打勾</strong>——每个 feature flag 只有 enabled / disabled 两态，
          一个项目 3 个 flag 就有 2³ = 8 种组合配置。<code>path</code> 就是当前勾选的 flag 集合，
          回溯就是在「勾上→试试→取消勾」之间切换。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          组合总和 —— 可重复选取 + 累加剪枝
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          组合总和在组合基础上多了两个变化：<strong>数字可重复使用</strong>（递归传 <code>i</code> 而不是 <code>i+1</code>），
          以及<strong>累计和剪枝</strong>（和超过 target 就 return，不再深入）。
        </p>
        <div class="mb-4"><Code language="ts" :code="combSumCode" title="combination_sum.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 为什么传 i 而不是 i+1：</strong><br/>
          组合总和允许重复取同一个数，所以下一层仍从 <code>i</code> 开始（不是 i+1）。<br/>
          但为了去重（避免 [2,3] 和 [3,2] 都出现），起点用 <code>start</code> 锁死「只能往后选」——组合的通用去重法。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          三类问题一张表 —— 区别只在「候选怎么定」
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">全排列</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">组合 / 组合总和</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">子集</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">顺序是否重要</td><td class="px-4 py-2 border text-red-600 font-bold">重要（1,2 ≠ 2,1）</td><td class="px-4 py-2 border">不重要</td><td class="px-4 py-2 border">不重要</td></tr>
              <tr><td class="px-4 py-2 border font-mono">候选起点</td><td class="px-4 py-2 border">每层都从 i=0 开始</td><td class="px-4 py-2 border font-mono">从 start 开始</td><td class="px-4 py-2 border font-mono">从 start 开始</td></tr>
              <tr><td class="px-4 py-2 border font-mono">去重手段</td><td class="px-4 py-2 border font-mono">used 数组</td><td class="px-4 py-2 border font-mono">start 下标</td><td class="px-4 py-2 border font-mono">start 下标 / 选不选</td></tr>
              <tr><td class="px-4 py-2 border font-mono">可重复取</td><td class="px-4 py-2 border">否</td><td class="px-4 py-2 border">组合总和：递归传 i</td><td class="px-4 py-2 border">否</td></tr>
              <tr><td class="px-4 py-2 border font-mono">结束条件</td><td class="px-4 py-2 border font-mono">path.length === n</td><td class="px-4 py-2 border font-mono">sum === target</td><td class="px-4 py-2 border font-mono">i === n</td></tr>
              <tr><td class="px-4 py-2 border font-mono">解的数量</td><td class="px-4 py-2 border font-mono">n!</td><td class="px-4 py-2 border font-mono">C(n,k) / 子问题</td><td class="px-4 py-2 border font-mono">2^n</td></tr>
              <tr><td class="px-4 py-2 border font-mono">时间复杂度</td><td class="px-4 py-2 border font-mono">O(n·n!)</td><td class="px-4 py-2 border font-mono">O(n·2^n) 等</td><td class="px-4 py-2 border font-mono">O(n·2^n)</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 记法：</strong>问自己三个问题——<strong>顺序重要吗？</strong>（重要→used）<strong>能重复取吗？</strong>（能→传 i）<strong>要不要固定起点？</strong>（固定→start）。三个问题答完，模板自然成形。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          常见错误
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：把「排列」写成「组合」。</strong><br/>
          排列必须用 <code>used</code>（每层从 0 开始）；误用 <code>start</code> 会得到「只往后选」的结果，
          输出变成 C(n,k) 的组合而非 n! 排列，数量对不上。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：组合总和漏了去重。</strong><br/>
          <code>candidates</code> 含重复数字时，直接回溯会产生重复组合。
          解法：先排序，循环里 <code>if (i &gt; start &amp;&amp; nums[i] === nums[i-1]) continue</code> 跳过同层相同数字。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：子集「选/不选」两分支只撤销了「选」的分支。</strong><br/>
          不选分支没有 push，不需要 pop；但如果写成了 <code>if(选) push ...</code> 包住递归，要确认两个分支递归参数 <code>i+1</code> 都一致，否则某分支死循环。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 调试小技巧：</strong>结果数量不对时，先打印 <code>path</code> 看它是否被重复/缺失——重复多半是 start 写错，缺失多半是 used 撤销漏了。画出 n=3 的决策树逐条对照最直观。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：全排列决策树逐步展开
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          左上角是 <strong>used 标记条</strong>：走到某节点时，已选数字变灰（<code>used=true</code>），下层候选只剩未灰的数字。
          橙色节点 = 当前选择，绿色 = 记录的排列，撤销时节点变回青色、标记条里的灰块恢复。<strong>重点观察 used 标记的选择与撤销。</strong>
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 步骤: {{ stepNo }}/{{ STEPS.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="phase" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⚡ {{ phase }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">⏱️ 全排列 n! = 6 个 · 深度 3</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doRun" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">▶ 完整展开</button>
          <button @mousedown="doStep" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40">👣 单步前进</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-text :config="{x:24, y:8, text:'used 标记（灰=已用）', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-rect v-for="(u,i) in usedFlags" :key="'u'+i" :config="usedRect(i)" />
              <v-text v-for="(u,i) in usedFlags" :key="'ut'+i" :config="usedText(i)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="txtCfg(n)" />
            </v-layer>
          </v-stage>
        </div>
        <p class="text-xs text-slate-400 mt-2">🟠 当前选择 &nbsp; 🟢 已记录的排列 &nbsp; 🔵 未探索 &nbsp; 分支线橙色 = 正在走的路径 &nbsp; 灰块 = used=true（该数字当前不可选）</p>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>全排列</strong>：顺序重要 → <code>used</code> 数组 + 每层从 0 开始，解数 n!，O(n·n!)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>子集</strong>：「选/不选」二叉决策树 或 start 法，解数 2^n，O(n·2^n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>组合总和</strong>：可重复取传 <code>i</code>，累加超 target 剪枝，含重复数字先排序去重</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三问定模板</strong>：顺序重要吗 → used；能重复取吗 → 传 i；要固定起点吗 → start</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>used 撤销成对</strong>：<code>path.pop()</code> ↔ <code>used[i]=false</code>，漏一个就漏解</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>下一篇用<strong>约束传播剪枝</strong>做 N 皇后 / 数独 / 括号生成</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-2-backtracking/dsa-8-2-1-template" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：回溯模板</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-2-backtracking/dsa-8-2-3-n-queens" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：N皇后/数独/括号生成 →</RouterLink>
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
  { id: "sec-1", name: "全排列" },
  { id: "sec-2", name: "子集" },
  { id: "sec-3", name: "组合总和" },
  { id: "sec-4", name: "三类问题对比" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 全排列决策树动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H = ref(350), W = ref(700)
const R = 20
const YS = [50, 128, 206, 284]        // 四层 y
const XF: Record<number, number> = {   // 各节点的 x 比例
  0:0.5, 1:0.17, 2:0.5, 3:0.83,
  4:0.06, 5:0.28, 6:0.39, 7:0.61, 8:0.72, 9:0.94,
  10:0.06, 11:0.28, 12:0.39, 13:0.61, 14:0.72, 15:0.94,
}
const DEPTH: Record<number, number> = { 0:0, 1:1, 2:1, 3:1, 4:2, 5:2, 6:2, 7:2, 8:2, 9:2, 10:3, 11:3, 12:3, 13:3, 14:3, 15:3 }
const TREE: Record<number, number[]> = {
  0:[1,2,3], 1:[4,5], 2:[6,7], 3:[8,9],
  4:[10], 5:[11], 6:[12], 7:[13], 8:[14], 9:[15],
  10:[], 11:[], 12:[], 13:[], 14:[], 15:[],
}
const VAL: Record<number, number> = { 1:1, 2:2, 3:3, 4:2, 5:3, 6:1, 7:3, 8:1, 9:2, 10:3, 11:2, 12:3, 13:1, 14:2, 15:1 }
const PARENT: Record<number, number> = { 1:0, 2:0, 3:0, 4:1, 5:1, 6:2, 7:2, 8:3, 9:3, 10:4, 11:5, 12:6, 13:7, 14:8, 15:9 }
const LABELS: Record<number, string> = {
  0:'∅', 1:'1', 2:'2', 3:'3', 4:'12', 5:'13', 6:'21', 7:'23', 8:'31', 9:'32',
  10:'123', 11:'132', 12:'213', 13:'231', 14:'312', 15:'321',
}
const LEAVES = [10, 11, 12, 13, 14, 15]

interface BTNode { id: number; label: string; x: number; y: number; color: string; s?: number }
const tNodes = reactive<BTNode[]>([])
const tEdges = reactive<{a:number;b:number}[]>([])
const usedFlags = reactive<boolean[]>([false, false, false])
const hlEdge = ref<{a:number;b:number}|null>(null)
const busy = ref(false), status = ref(''), phase = ref(''), stepNo = ref(0)
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

interface Step { type:'start'|'choose'|'accept'|'undo'; id:number; val:number; path:number[]; used:boolean[]; msg:string }
const STEPS: Step[] = []
function buildSteps() {
  const path:number[] = [], used = [false, false, false]
  STEPS.push({ type:'start', id:0, val:0, path:[], used:[...used], msg:'[] 开始，全排列 [1,2,3]，used=[·,·,·]' })
  const dfs = (id:number) => {
    for (const c of TREE[id]) {
      const val = VAL[c]
      path.push(val); used[val-1] = true
      STEPS.push({ type:'choose', id:c, val, path:[...path], used:[...used],
        msg:`选择 ${val} → [${path.join(',')}]  used=${used.map(x=>x?'✓':'·').join(' ')}` })
      if (path.length === 3) {
        STEPS.push({ type:'accept', id:c, val, path:[...path], used:[...used],
          msg:`[${path.join(',')}] 长度满 → 记录排列 ✓` })
      } else {
        dfs(c)
      }
      path.pop(); used[val-1] = false
      STEPS.push({ type:'undo', id:c, val, path:[...path], used:[...used],
        msg:`撤销 ${val} → [${path.join(',')}]  used=${used.map(x=>x?'✓':'·').join(' ')}` })
    }
  }
  dfs(0)
}
buildSteps()

const node = (id:number) => tNodes.find(n => n.id === id)!

function layout() {
  tNodes.length = 0; tEdges.length = 0
  Object.keys(TREE).forEach(k => {
    const id = +k
    tNodes.push({ id, label:LABELS[id], x: W.value * XF[id], y: YS[DEPTH[id]], color: C.cyan })
    TREE[id].forEach(c => tEdges.push({ a:id, b:c }))
  })
}

function circleCfg(n:any) {
  const s = n.s ?? 1
  return { x:n.x, y:n.y, radius:R*s, fill:n.color, stroke:'#64748b', strokeWidth:1.5,
    shadowColor:'rgba(0,0,0,.12)', shadowBlur:4, shadowOffsetY:2, opacity:n.color===C.ghost ? 0.4 : 1 }
}
function txtCfg(n:any) {
  const s = n.s ?? 1
  return { x:n.x-R*s, y:n.y-R*s, width:R*2*s, height:R*2*s, text:n.label, fontSize:11, fontFamily:'monospace', fontStyle:'bold',
    fill:n.color===C.green ? '#0f172a' : '#fff', align:'center', verticalAlign:'middle' }
}
function edgeCfg(e:{a:number;b:number}) {
  const pa = node(e.a), pb = node(e.b)
  const hl = hlEdge.value && hlEdge.value.a===e.a && hlEdge.value.b===e.b
  return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke: hl ? C.orange : '#94a3b8', strokeWidth: hl ? 3 : 1.8, lineCap:'round' as const }
}
function usedRect(i:number) {
  const on = usedFlags[i]
  return { x:30 + i*50, y:32, width:42, height:26, fill: on ? C.ghost : C.cyan, cornerRadius:6,
    stroke:'#64748b', strokeWidth:1, shadowColor: on ? 'transparent' : 'rgba(0,0,0,.1)', shadowBlur:3 }
}
function usedText(i:number) {
  const on = usedFlags[i]
  return { x:30 + i*50, y:32, width:42, height:26, text: String(i+1) + (on ? ' ✗' : ' ✓'), fontSize:12,
    fontFamily:'monospace', fontStyle:'bold', fill: on ? C.muted : '#fff', align:'center', verticalAlign:'middle' }
}

function syncUsed(u:boolean[]) { usedFlags.splice(0, 3, ...u) }
function resetNodes() {
  stepNo.value = 0; phase.value = ''; hlEdge.value = null
  tNodes.forEach(n => { n.color = C.cyan; n.s = 1 })
  syncUsed([false, false, false])
}

function applyStep(st: Step) {
  stepNo.value++
  status.value = st.msg
  if (st.type === 'start') {
    phase.value = '开始'; node(0).color = C.orange; syncUsed(st.used)
  } else if (st.type === 'choose') {
    phase.value = '选择'; node(st.id).color = C.orange; hlEdge.value = { a:PARENT[st.id], b:st.id }; syncUsed(st.used)
  } else if (st.type === 'accept') {
    phase.value = '排列 ✓'; const n = node(st.id); n.color = C.green; n.s = 1.2; syncUsed(st.used)
  } else if (st.type === 'undo') {
    phase.value = '撤销'; const n = node(st.id); n.color = C.cyan; n.s = 1; hlEdge.value = null; syncUsed(st.used)
  }
}

function doReset() { resetNodes(); status.value = '' }

function doStep() {
  if (busy.value) return
  if (stepNo.value >= STEPS.length) { status.value = '已完成 6 个排列，点「重置」再来'; return }
  applyStep(STEPS[stepNo.value])
  if (stepNo.value >= STEPS.length) {
    phase.value = '完成'; status.value = '找到 6 个全排列：[123] [132] [213] [231] [312] [321]'
    LEAVES.forEach(id => { const n = node(id); n.color = C.green; n.s = 1 })
  }
}

async function doRun() {
  if (busy.value) return
  busy.value = true
  resetNodes()
  for (const st of STEPS) {
    stepNo.value++
    status.value = st.msg
    if (st.type === 'start') {
      phase.value = '开始'; node(0).color = C.orange; syncUsed(st.used); await d(450)
    } else if (st.type === 'choose') {
      phase.value = '选择'; node(st.id).color = C.orange; hlEdge.value = { a:PARENT[st.id], b:st.id }; syncUsed(st.used); await d(330)
    } else if (st.type === 'accept') {
      phase.value = '排列 ✓'; const n = node(st.id); n.color = C.green; n.s = 1.2; syncUsed(st.used); await d(560); n.s = 1
    } else if (st.type === 'undo') {
      phase.value = '撤销'; const n = node(st.id); n.color = C.ghost; hlEdge.value = null; syncUsed(st.used); await d(240)
      n.color = C.cyan; n.s = 1; await d(300)
    }
  }
  phase.value = '完成'; status.value = '找到 6 个全排列：[123] [132] [213] [231] [312] [321]'
  LEAVES.forEach(id => { const n = node(id); n.color = C.green; n.s = 1 })
  await d(900)
  busy.value = false
}

let ro: ResizeObserver | null = null
onMounted(() => {
  layout()
  if (box.value) {
    W.value = box.value.clientWidth
    layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const permuteCode = `// ===== 全排列 [1,2,3] —— used 数组标记已用 =====
// 排列：顺序重要 → 每层都从 i=0 遍历，但跳过已用数字

function permute(nums: number[]): number[][] {
  const res: number[][] = []
  const path: number[] = []
  const used: boolean[] = new Array(nums.length).fill(false)

  const dfs = () => {
    if (path.length === nums.length) {   // 叶子：3 个数全用上
      res.push([...path])
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue              // ★ 剪枝：数字已在当前路径中
      path.push(nums[i])                 // 选择
      used[i] = true                     // 标记
      dfs()                              // 递归
      path.pop()                         // 撤销选择
      used[i] = false                    // 撤销标记 ← 和上面成对，绝不能漏
    }
  }

  dfs()
  return res
}

console.log(permute([1, 2, 3]))
// 输出 6 个： [1,2,3] [1,3,2] [2,1,3] [2,3,1] [3,1,2] [3,2,1]

// ===== 变体：交换法（不建 used，直接在 nums 上 swap）=====
function permuteSwap(nums: number[]): number[][] {
  const res: number[][] = []
  const dfs = (i: number) => {
    if (i === nums.length) { res.push([...nums]); return }
    for (let j = i; j < nums.length; j++) {
      [nums[i], nums[j]] = [nums[j], nums[i]]   // 选择：交换
      dfs(i + 1)                                 // 递归
      [nums[i], nums[j]] = [nums[j], nums[i]]   // 撤销：换回来
    }
  }
  dfs(0)
  return res
}`

const subsetCode = `// ===== 子集 [1,2,3] —— 「选 / 不选」二叉决策树 =====
// 每个元素只有两种选择：加入 或 不加入 → 2^n 个子集

function subsets(nums: number[]): number[][] {
  const res: number[][] = []
  const path: number[] = []

  const dfs = (i: number) => {
    if (i === nums.length) {          // 遍历完所有元素，path 即一个子集
      res.push([...path])
      return
    }
    dfs(i + 1)                        // 分支 A：不选 nums[i]

    path.push(nums[i])                // 分支 B：选 nums[i]
    dfs(i + 1)
    path.pop()                        // 撤销（A 分支没有 push，无需 pop）
  }

  dfs(0)
  return res
}

console.log(subsets([1, 2, 3]))
// 输出 8 个（顺序与实现相关）：
// [], [3], [2], [2,3], [1], [1,3], [1,2], [1,2,3]

// ===== 另一种写法：for + start（每个节点都是合法子集）=====
function subsetsByStart(nums: number[]): number[][] {
  const res: number[][] = []
  const path: number[] = []
  const dfs = (start: number) => {
    res.push([...path])                // 任意长度的 path 都是子集
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i])
      dfs(i + 1)
      path.pop()
    }
  }
  dfs(0)
  return res
}`

const combSumCode = `// ===== 组合总和：candidates=[2,3,5], target=8 =====
// 每个数字可重复使用 → 递归传 i（不 +1）；起点 start 锁死「只往后选」去重

function combinationSum(candidates: number[], target: number): number[][] {
  const res: number[][] = []
  const path: number[] = []

  const dfs = (start: number, sum: number) => {
    if (sum > target) return                 // 剪枝：已超过目标和
    if (sum === target) { res.push([...path]); return }   // 解
    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i])               // 选择
      dfs(i, sum + candidates[i])            // 递归：i 不变 → 允许重复取
      path.pop()                             // 撤销
    }
  }

  dfs(0, 0)
  return res
}

console.log(combinationSum([2, 3, 5], 8))
// 输出: [[2,2,2,2], [2,3,3], [3,5]]

// ===== 进阶：组合总和 II（每个数字只能用一次 + 数组含重复）=====
function combinationSum2(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b)           // ① 先排序，让重复数字相邻
  const res: number[][] = []
  const path: number[] = []
  const dfs = (start: number, sum: number) => {
    if (sum > target) return
    if (sum === target) { res.push([...path]); return }
    for (let i = start; i < candidates.length; i++) {
      if (i > start && candidates[i] === candidates[i-1]) continue   // ② 跳过同层重复
      path.push(candidates[i])
      dfs(i + 1, sum + candidates[i])        // ③ 传 i+1 → 每个只能用一次
      path.pop()
    }
  }
  dfs(0, 0)
  return res
}`
</script>
