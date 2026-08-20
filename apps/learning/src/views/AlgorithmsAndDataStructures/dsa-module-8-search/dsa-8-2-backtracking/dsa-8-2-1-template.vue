<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔙 回溯模板：选择 · 递归 · 撤销</h1>
          <p class="text-sm text-slate-500 mt-1">所有回溯题的骨架——在决策树上暴力搜索，走不通就回头</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 8-2-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：回溯 = 在决策树上暴力搜索
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          回溯算法把每个「选择点」看成<strong>决策树的一个节点</strong>：每走一层就是一个<strong>选择（递归）</strong>，
          碰壁（不满足约束 / 到达叶子）就<strong>撤销</strong>回上一层换条路。整棵树从上到下枚举了<strong>全部候选方案</strong>。
          树的高度 = 递归深度，每个节点的孩子数 = 该位置的候选数。
        </p>

        <!-- 结构图：通用决策树 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 330" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="bt-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- 边（先画） -->
            <line x1="360" y1="104" x2="190" y2="164" stroke="#94a3b8" stroke-width="2" marker-end="url(#bt-arr)" />
            <line x1="360" y1="104" x2="360" y2="164" stroke="#94a3b8" stroke-width="2" marker-end="url(#bt-arr)" />
            <line x1="360" y1="104" x2="530" y2="164" stroke="#94a3b8" stroke-width="2" marker-end="url(#bt-arr)" />
            <line x1="190" y1="212" x2="110" y2="272" stroke="#4ade80" stroke-width="2" marker-end="url(#bt-arr)" />
            <line x1="190" y1="212" x2="270" y2="272" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 3" marker-end="url(#bt-arr)" />
            <line x1="360" y1="212" x2="360" y2="272" stroke="#4ade80" stroke-width="2" marker-end="url(#bt-arr)" />
            <line x1="530" y1="212" x2="530" y2="272" stroke="#4ade80" stroke-width="2" marker-end="url(#bt-arr)" />

            <!-- 分支标注：选择什么 -->
            <text x="265" y="138" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#f59e0b">选择 a</text>
            <text x="375" y="138" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#f59e0b">选择 b</text>
            <text x="452" y="138" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#f59e0b">选择 c</text>

            <!-- 根：初始状态 -->
            <rect x="330" y="56" width="60" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="360" y="72" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">状态</text>
            <text x="360" y="88" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#cffafe">初始 / []</text>

            <!-- 第 1 层状态节点 -->
            <rect x="160" y="168" width="60" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="190" y="184" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">[a]</text>
            <text x="190" y="200" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">深度1</text>
            <rect x="330" y="168" width="60" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="360" y="184" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">[b]</text>
            <text x="360" y="200" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">深度1</text>
            <rect x="500" y="168" width="60" height="44" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="530" y="184" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">[c]</text>
            <text x="530" y="200" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#cffafe">深度1</text>

            <!-- 第 2 层：叶子 -->
            <rect x="80" y="272" width="60" height="44" rx="8" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="110" y="288" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">[a,x]</text>
            <text x="110" y="304" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#166534">解 ✓</text>
            <rect x="240" y="272" width="60" height="44" rx="8" fill="#ef4444" stroke="#dc2626" stroke-width="2" stroke-dasharray="4 3" />
            <text x="270" y="288" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">[a,y]</text>
            <text x="270" y="304" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#fecaca">死胡同 ✗</text>
            <rect x="330" y="272" width="60" height="44" rx="8" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="360" y="288" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">[b,x]</text>
            <text x="360" y="304" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#166534">解 ✓</text>
            <rect x="500" y="272" width="60" height="44" rx="8" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="530" y="288" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">[c,x]</text>
            <text x="530" y="304" text-anchor="middle" dominant-baseline="central" font-size="9" font-family="monospace" fill="#166534">解 ✓</text>

            <!-- 撤销箭头：从死胡同回退 -->
            <line x1="300" y1="288" x2="245" y2="235" stroke="#ef4444" stroke-width="2" marker-end="url(#bt-arr)" />
            <text x="305" y="258" font-size="10" font-family="monospace" fill="#ef4444" font-weight="bold">撤销</text>

            <!-- 图例 -->
            <text x="16" y="28" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">决策树：每个分支是一次「选择」，走到叶子是「解」或「死胡同」，撤销后回头找别的路</text>
            <rect x="16" y="38" width="0" height="0" />
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：回溯 = 在决策树上做 DFS。橙色标注「选择」分支，绿色叶子是解，红色虚线叶子 + 红色向上箭头是「死胡同 → 撤销」</figcaption>
        </figure>

        <!-- 三阶段图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">核心三阶段：选择 → 递归 → 撤销</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <p class="text-sm font-bold text-orange-700 mb-1">① 选择</p>
            <p class="text-xs text-orange-800 leading-relaxed">在当前状态可选的所有候选中，挑一个做决定（如选 2 加入序列），并把状态推进一步。</p>
          </div>
          <div class="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
            <p class="text-sm font-bold text-cyan-700 mb-1">② 递归</p>
            <p class="text-xs text-cyan-800 leading-relaxed">带着新状态进入下一层决策树，重复「选择」；直到叶子（解或死胡同）后自然返回。</p>
          </div>
          <div class="bg-red-50 border border-red-200 rounded-xl p-4">
            <p class="text-sm font-bold text-red-600 mb-1">③ 撤销</p>
            <p class="text-xs text-red-700 leading-relaxed">返回时把上一步的选择还原（弹出元素、清空标记），回到「什么都没做」的状态，准备试下一个候选。</p>
          </div>
        </div>
        <p class="text-xs text-slate-400 mt-3">关键：<strong>撤销必须与选择完全对称</strong>——选了什么、做了什么标记，撤销时就要原样还原，否则状态被污染，后面的分支全错。</p>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          什么是回溯？—— 有「后悔药」的暴力枚举
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          回溯（Backtracking）本质上就是<strong>暴力搜索（穷举）</strong>，但它比朴素穷举多了一个法宝：<strong>撤销</strong>。
          当一条路走到尽头发现走不通（或已得到一组解），就<strong>退回去</strong>，在上一个岔路口换一条没走过的路。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>回溯 vs 朴素穷举：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>朴素穷举</strong>：把所有排列组合全部生成一遍，再逐一过滤 —— 浪费大量内存存储中间结果</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>回溯</strong>：只维护<strong>一条当前路径</strong>，一边走一边检查约束，不满足就<strong>剪枝</strong>，满足就记录并<strong>撤销继续</strong></span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>空间优势</strong>：回溯的空间是 O(深度)，穷举全量存储是 O(方案数 × 方案长度)</span></li>
          </ul>
        </div>
        <div class="mb-4"><Code language="ts" :code="bruteVsBackCode" title="brute_vs_backtrack.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          回溯就像前端表单的<strong>多步向导 + 返回上一步</strong>——每一步填写一个字段（选择），填到一半发现不合规（剪枝），
          点「上一步」清空当前字段（撤销）再重新填。<br/>
          也像 <code>git checkout</code> 回到任意历史分支：试一条路不行，<code>git reset</code> 撤销回到岔路口重来。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          三阶段模板 —— 所有回溯题的骨架
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>任何回溯题都能套进这个骨架</strong>：一个 <code>for</code> 循环遍历候选，循环体内做「选 → 递归 → 撤销」三步。
          区别只在于「候选是什么、合法性怎么判断、结束条件是什么」。
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-sm font-bold text-cyan-800 mb-2 text-center font-mono">for (候选 of 全部候选) → 选择 → 递归 → 撤销</p>
          <p class="text-xs text-cyan-600 text-center">一次循环 = 试完「该位置」的所有可能性，每次循环内部完整走一遍「选 / 递 / 撤」</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="templateCode" title="backtrack_template.ts" /></div>
        <ol class="space-y-1 text-slate-600 mb-4 text-sm leading-relaxed list-decimal list-inside">
          <li><strong>结束条件</strong>（叶子判定）：路径长度达到目标 / 状态无法继续 → 记录结果并 return</li>
          <li><strong>遍历候选</strong>：for 循环枚举当前位置的所有可能取值</li>
          <li><strong>合法性检查 + 剪枝</strong>：不合法（used、越界、冲突）直接 continue，这是性能关键</li>
          <li><strong>选择 + 递归 + 撤销</strong>：更新状态 → 进入下一层 → 还原状态</li>
        </ol>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 三个最容易写错的地方：</strong><br/>
          1. <strong>忘记撤销</strong>：撤销和选择是「买一送一」，只选不撤会污染兄弟分支的状态<br/>
          2. <strong>深拷贝时机</strong>：记录解时用 <code>[...path]</code> 拷贝，直接 push <code>path</code> 会在撤销后变成空数组<br/>
          3. <strong>循环变量传参</strong>：递归时传 <code>start+1</code> 还是 <code>i+1</code>，决定了是子集（可跳）还是组合（不可跳）</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          决策树视角 —— 把模板画成树
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          理解回溯最快的办法：<strong>把每次递归调用画成一个节点，画出整棵决策树</strong>。
          树的三个维度恰好对应模板的三个要素：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">树的维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对应代码</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">高度 / 层数</td><td class="px-4 py-2 border font-mono">递归深度 = path.length</td><td class="px-4 py-2 border">「位置」的数量，如选 k 个数就 k 层</td></tr>
              <tr><td class="px-4 py-2 border font-mono">孩子个数</td><td class="px-4 py-2 border font-mono">for 循环候选数</td><td class="px-4 py-2 border">该位置有几种选择（可能被剪枝缩小）</td></tr>
              <tr><td class="px-4 py-2 border font-mono">叶子</td><td class="px-4 py-2 border font-mono">结束条件分支</td><td class="px-4 py-2 border">一个完整方案：解 或 死胡同</td></tr>
              <tr><td class="px-4 py-2 border font-mono">回溯边</td><td class="px-4 py-2 border font-mono">递归返回后的撤销</td><td class="px-4 py-2 border">从叶子/死胡同原路退回的路径</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 text-sm leading-relaxed">
          以「从 [1,2,3] 中选 2 个组合」为例：根是空序列 <code>[]</code>，第一层三个候选 1 / 2 / 3，
          第二层从每个候选「只选它后面的数」，得到 3 个叶子 <code>[1,2] [1,3] [2,3]</code>——这就是动画演示的树。
        </p>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 画树心法：</strong>拿到一道回溯题，先在纸上画出 n=3 的小决策树，
          就能立刻看清「候选集合怎么取、结束条件是什么、哪里可以剪枝」。画不出树的回溯题，说明题目还没理解透。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          组合示例 —— 套模板写一遍
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          用模板实现「组合 C(3,2)」。组合与排列的区别在于：<strong>组合不在乎顺序</strong>，[1,2] 和 [2,1] 是同一种。
          技巧是让递归只从 <code>i+1</code> 开始往后选，天然避免重复。
        </p>
        <div class="mb-4"><Code language="ts" :code="comboCode" title="combine.ts" /></div>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>执行过程拆解（递归调用顺序 = 决策树 DFS）：</strong></p>
          <ol class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">1.</span><span><code>dfs(1)</code>：path=[]，选 1 → path=[1]，进入 <code>dfs(2)</code></span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">2.</span><span><code>dfs(2)</code>：path=[1]，选 2 → path=[1,2] 满 2 个，记录并撤销 → 选 3 → [1,3] 记录并撤销</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">3.</span><span>回到 <code>dfs(2)</code>，循环结束返回 → 撤销 1，path=[]，进入 <code>dfs(2)</code> 的下一次：选 2</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">4.</span><span><code>dfs(3)</code>：path=[2]，选 3 → [2,3] 记录，回溯结束</span></li>
          </ol>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          组合的 <code>dfs(i+1)</code>「只能往后选」很像 Vue Router 的 <strong>动态路由 + 参数递增</strong>——
          每层路由只允许挂到「编号更大」的下一级，天然避免 <code>/a/b</code> 和 <code>/b/a</code> 重复注册。
          撤销则像表单校验失败后 <code>resetFields()</code>——清空当前输入回到初始态再试下一个校验规则。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          常见错误与复杂度
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：撤销不全 —— 「选」了数组却没「删」回数组。</strong><br/>
          <code>path.push(x)</code> 后递归返回只记得 <code>path.pop()</code>，却忘了 <code>used[i]=false</code> 或忘了还原计数变量。
          结果：兄弟分支看到「残留标记」，产生重复或漏解。铁律：<strong>每一条选择语句，都要配一条对称的撤销语句</strong>。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：结果集里存了「同一份引用」。</strong><br/>
          <code>res.push(path)</code> 而不是 <code>res.push([...path])</code>——path 是唯一的可变数组，之后每次撤销都会把它清空，
          最终 res 里全是空数组。必须<strong>拷贝一份快照</strong>再存入。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：递归深度爆炸（栈溢出）。</strong><br/>
          当解空间极大（如 N! 或 2^N）且没有剪枝，递归会非常深。JS 默认栈约 1 万层，
          候选规模超过十几就容易 <code>RangeError: Maximum call stack size exceeded</code>。务必先剪枝 + 限制规模。</p>
        </aside>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>复杂度速查（常见回溯问题）：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>全排列</strong>：O(n!) 方案数 × O(n) 复制 = O(n·n!)</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>子集</strong>：O(2^n) 个方案 × O(n) 复制 = O(n·2^n)</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>N 皇后</strong>：最坏 O(n!)，剪枝后实际远小于</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>空间</strong>：O(深度)，只存当前一条路径</span></li>
          </ul>
        </div>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：回溯模板跑「组合 C(3,2)」
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          观察<strong>选择（橙色）→ 递归（深入一层）→ 撤销（回到上一层）</strong>的完整过程。
          叶子是解时<strong>变绿</strong>；撤销时当前节点变灰回退到青色，同时橙色的「选择」分支线消失。状态栏实时显示当前路径。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 步骤: {{ stepNo }}/{{ STEPS.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="phase" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⚡ {{ phase }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">⏱️ 组合 C(3,2)=3 个解 · 深度 2</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doRun" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">▶ 自动演示</button>
          <button @mousedown="doStep" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40">👣 单步前进</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-text v-for="e in tEdges" :key="'el'+e.a+e.b" :config="edgeLabelCfg(e)" />
              <v-circle v-for="n in tNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in tNodes" :key="'t'+n.id" :config="txtCfg(n)" />
            </v-layer>
          </v-stage>
        </div>
        <p class="text-xs text-slate-400 mt-2">🟠 选择 / 当前状态 &nbsp; 🟢 解 &nbsp; 🔵 未探索 &nbsp; ⚪ 撤销回退（一闪而过）&nbsp; 分支线橙色 = 正在走的路</p>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>回溯 = 有后悔药的暴力枚举</strong>，在决策树上做 DFS，走不通就撤销回头</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三阶段模板</strong>：for 候选 → ①选择 → ②递归 → ③撤销，一切回溯题皆可套</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>决策树视角</strong>：层数=递归深度，孩子数=候选数，叶子=解/死胡同，回溯边=撤销</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>撤销与选择必须对称</strong>，记录解必须深拷贝 <code>[...path]</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>空间 O(深度)</strong>，时间因问题而异：全排列 O(n·n!)、子集 O(n·2^n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>下一篇把模板应用到<strong>排列 / 子集 / 组合总和</strong>，下一篇的下一篇用<strong>约束传播剪枝</strong>解决 N 皇后</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-1-binary/dsa-8-1-3-rotated" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：旋转数组搜索与变体</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-2-backtracking/dsa-8-2-2-permutation" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：排列组合 →</RouterLink>
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
  { id: "sec-1", name: "什么是回溯" },
  { id: "sec-2", name: "三阶段模板" },
  { id: "sec-3", name: "决策树视角" },
  { id: "sec-4", name: "组合示例" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 回溯决策树动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H = ref(330), W = ref(700)
const R = 26, TOP = 55, LV1 = 150, LV2 = 248
interface BTNode { id: number; label: string; x: number; y: number; color: string; s?: number }
const tNodes = reactive<BTNode[]>([])
const tEdges = reactive<{a:number;b:number}[]>([])
const hlEdge = ref<{a:number;b:number}|null>(null)
const busy = ref(false), status = ref(''), phase = ref(''), stepNo = ref(0)
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

// 组合 C(3,2) 的决策树
// 0=[] , 1=[1], 2=[2], 3=[3], 4=[1,2], 5=[1,3], 6=[2,3]
const TREE: Record<number, number[]> = { 0:[1,2,3], 1:[4,5], 2:[6], 3:[], 4:[], 5:[], 6:[] }
const PARENT: Record<number, number> = { 1:0, 2:0, 3:0, 4:1, 5:1, 6:2 }
const LABELS: Record<number, string> = { 0:'∅', 1:'1', 2:'2', 3:'3', 4:'12', 5:'13', 6:'23' }
const EDGE_VAL: Record<string, string> = { '0-1':'选1','0-2':'选2','0-3':'选3','1-4':'选2','1-5':'选3','2-6':'选3' }

type StepType = 'visit' | 'choose' | 'accept' | 'undo'
interface Step { type: StepType; id?: number; msg: string }
const STEPS: Step[] = [
  { type:'visit', id:0, msg:'从空序列 [] 开始，候选 {1,2,3}' },
  { type:'choose', id:1, msg:'[] → 选择 1 → [1]（递归深入第 1 层）' },
  { type:'choose', id:4, msg:'[1] → 选择 2 → [1,2]（递归深入第 2 层）' },
  { type:'accept', id:4, msg:'[1,2] 长度已满 → 记录解 ✓' },
  { type:'undo', id:4, msg:'撤销选择 2，[1,2] 回退到 [1]' },
  { type:'choose', id:5, msg:'[1] → 选择 3 → [1,3]' },
  { type:'accept', id:5, msg:'[1,3] 长度已满 → 记录解 ✓' },
  { type:'undo', id:5, msg:'撤销选择 3，[1,3] 回退到 [1]' },
  { type:'undo', id:1, msg:'撤销选择 1，[1] 回退到 []' },
  { type:'choose', id:2, msg:'[] → 选择 2 → [2]（递归深入）' },
  { type:'choose', id:6, msg:'[2] → 选择 3 → [2,3]' },
  { type:'accept', id:6, msg:'[2,3] 长度已满 → 记录解 ✓' },
  { type:'undo', id:6, msg:'撤销选择 3，[2,3] 回退到 [2]' },
  { type:'undo', id:2, msg:'撤销选择 2，[2] 回退到 []' },
  { type:'undo', id:0, msg:'全部候选处理完毕，回溯结束' },
]

const node = (id:number) => tNodes.find(n => n.id === id)!

function layout() {
  tNodes.length = 0; tEdges.length = 0
  const fx = (f:number) => W.value * f
  tNodes.push({ id:0, label:LABELS[0], x:fx(0.5), y:TOP, color:C.cyan })
  tNodes.push({ id:1, label:LABELS[1], x:fx(0.22), y:LV1, color:C.cyan })
  tNodes.push({ id:2, label:LABELS[2], x:fx(0.5), y:LV1, color:C.cyan })
  tNodes.push({ id:3, label:LABELS[3], x:fx(0.78), y:LV1, color:C.cyan })
  tNodes.push({ id:4, label:LABELS[4], x:fx(0.09), y:LV2, color:C.cyan })
  tNodes.push({ id:5, label:LABELS[5], x:fx(0.33), y:LV2, color:C.cyan })
  tNodes.push({ id:6, label:LABELS[6], x:fx(0.62), y:LV2, color:C.cyan })
  Object.keys(TREE).forEach(k => {
    TREE[+k].forEach(c => tEdges.push({ a:+k, b:c }))
  })
}

function circleCfg(n:any) {
  const s = n.s ?? 1
  return { x:n.x, y:n.y, radius:R*s, fill:n.color, stroke:n.color===C.ghost ? 'transparent' : '#64748b', strokeWidth:1.5,
    shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2, opacity:n.color===C.ghost ? 0.45 : 1 }
}
function txtCfg(n:any) {
  const s = n.s ?? 1
  return { x:n.x-R*s, y:n.y-R*s, width:R*2*s, height:R*2*s, text:n.label, fontSize:15, fontFamily:'monospace', fontStyle:'bold',
    fill:n.color===C.ghost ? C.muted : '#fff', align:'center', verticalAlign:'middle' }
}
function edgeCfg(e:{a:number;b:number}) {
  const pa = node(e.a), pb = node(e.b)
  const hl = hlEdge.value && hlEdge.value.a===e.a && hlEdge.value.b===e.b
  return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke: hl ? C.orange : '#94a3b8', strokeWidth: hl ? 3.5 : 2, lineCap:'round' as const }
}
function edgeLabelCfg(e:{a:number;b:number}) {
  const pa = node(e.a), pb = node(e.b)
  return { x:(pa.x+pb.x)/2, y:(pa.y+pb.y)/2 - 6, text: EDGE_VAL[e.a+'-'+e.b] || '', fontSize:10,
    fontFamily:'monospace', fill:C.muted, align:'center' }
}

function resetNodes() {
  stepNo.value = 0; phase.value = ''; hlEdge.value = null
  tNodes.forEach(n => { n.color = C.cyan; n.s = 1 })
}

function applyStep(st: Step) {
  stepNo.value++
  status.value = st.msg
  if (st.type === 'visit') {
    phase.value = '开始'; node(st.id!).color = C.orange
  } else if (st.type === 'choose') {
    phase.value = '选择'; node(st.id!).color = C.orange; hlEdge.value = { a:PARENT[st.id!], b:st.id! }
  } else if (st.type === 'accept') {
    phase.value = '解 ✓'; const n = node(st.id!); n.color = C.green; n.s = 1.18
  } else if (st.type === 'undo') {
    phase.value = '撤销'; node(st.id!).color = C.cyan; node(st.id!).s = 1; hlEdge.value = null
  }
}

// 撤销时的小技巧：flash ghost → cyan（放在异步里做，单步则直接归位）
function flashUndo(id:number) { node(id).color = C.ghost; node(id).s = 0.9 }

function doReset() { resetNodes(); status.value = '' }

function doStep() {
  if (busy.value) return
  if (stepNo.value >= STEPS.length) { status.value = '已完成，点「重置」再来一次'; return }
  const st = STEPS[stepNo.value]
  applyStep(st)
  if (st.type === 'undo') node(st.id!).color = C.cyan
  if (stepNo.value >= STEPS.length) {
    phase.value = '完成'; status.value = '找到 3 个组合解：[1,2] [1,3] [2,3]'
    ;[4,5,6].forEach(id => { const n = node(id); n.color = C.green; n.s = 1 })
  }
}

async function doRun() {
  if (busy.value) return
  busy.value = true
  resetNodes()
  for (const st of STEPS) {
    stepNo.value++
    status.value = st.msg
    if (st.type === 'visit') {
      phase.value = '开始'; node(st.id!).color = C.orange; await d(600)
    } else if (st.type === 'choose') {
      phase.value = '选择'; node(st.id!).color = C.orange; hlEdge.value = { a:PARENT[st.id!], b:st.id! }; await d(650)
    } else if (st.type === 'accept') {
      phase.value = '解 ✓'; const n = node(st.id!); n.color = C.green; n.s = 1.18; await d(700); n.s = 1
    } else if (st.type === 'undo') {
      phase.value = '撤销'; flashUndo(st.id!); hlEdge.value = null; await d(420)
      node(st.id!).color = C.cyan; node(st.id!).s = 1; await d(420)
    }
  }
  phase.value = '完成'; status.value = '找到 3 个组合解：[1,2] [1,3] [2,3]'
  ;[4,5,6].forEach(id => { const n = node(id); n.color = C.green; n.s = 1 })
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

const bruteVsBackCode = `// ===== 朴素穷举 vs 回溯 =====
// 目标：从 [1,2,3] 中选 2 个元素的组合

// ① 朴素穷举：先全量生成，再过滤 —— 中间结果全留在内存
function bruteForce(nums: number[]): number[][] {
  const all: number[][] = []
  for (const a of nums)
    for (const b of nums)
      all.push([a, b])          // 先存 9 个候选（含重复）
  return all.filter(([a, b]) => a < b)   // 再过滤掉 [2,1] 这类
}
// 中间曾同时存在 9 个数组 → 内存浪费

// ② 回溯：只维护一条 path，边选边约束
function backtrack(nums: number[]): number[][] {
  const res: number[][] = []
  const path: number[] = []
  const dfs = (start: number) => {
    if (path.length === 2) { res.push([...path]); return }
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i])     // ① 选择
      dfs(i + 1)             // ② 递归（只能往更大的 index 选 → 天然去重）
      path.pop()             // ③ 撤销
    }
  }
  dfs(0)
  return res
}
// 任何时候 path 最多只有 2 个元素 → 空间 O(深度)`

const templateCode = `// ===== 回溯算法通用模板（TypeScript）=====
// 一切回溯题的核心骨架：for 候选 → 选择 → 递归 → 撤销

function backtrack(
  path: number[],      // 已选择的序列（当前路径）
  used: boolean[],     // 元素是否已被使用（标记）
  start: number,       // 可选起点（组合/子集用；排列则不需要）
  res: number[][],     // 结果集
): void {
  // ① 结束条件：到达叶子（path 长度满足要求 / 状态合法终止）
  if (path.length === TARGET) {
    res.push([...path])        // ★ 必须深拷贝！直接 push path 会被后续撤销清空
    return
  }

  // ② 遍历当前层的所有候选
  for (let i = start; i < nums.length; i++) {
    if (used[i]) continue      // 剪枝：已用的跳过（排列）；组合可省去 used

    path.push(nums[i])         // ③ 选择
    used[i] = true             //    标记状态

    backtrack(path, used, start + 1, res)   // ④ 递归：进入下一层决策树

    path.pop()                 // ⑤ 撤销：把选择还原
    used[i] = false            //    把标记还原
  }
}

// 三要素因题而异：
//   - 候选集合：nums 全集 / start 之后的元素 / 每行的可用位置
//   - 合法性检查：used / 冲突检测 / 上界估计
//   - 结束条件：path 长度 / 无候选 / 找到合法解`

const comboCode = `// ===== 组合 C(3,2)：从 [1,2,3] 中选 2 个 =====
// 组合不在乎顺序 → 用 start 控制「只能往后选」，天然去重

function combine(n: number, k: number): number[][] {
  const res: number[][] = []
  const path: number[] = []

  const dfs = (start: number) => {
    // 结束条件：选满 k 个 → 记录解
    if (path.length === k) {
      res.push([...path])
      return
    }
    for (let i = start; i <= n; i++) {
      path.push(i)        // ① 选择
      dfs(i + 1)          // ② 递归：下一位只能选更大的
      path.pop()          // ③ 撤销
    }
  }

  dfs(1)
  return res
}

console.log(combine(3, 2))
// 输出: [[1, 2], [1, 3], [2, 3]]

// 若改成「排列」（顺序算不同）：
//   - 去掉 start 参数，每次从 i=0 开始
//   - 加一个 used 数组，跳过已用的数字
//   - 结果变成 [[1,2],[2,1],[1,3],[3,1],[2,3],[3,2]] —— 6 个`
</script>
