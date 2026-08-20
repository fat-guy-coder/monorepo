<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">👑 N 皇后 / 数独 / 括号生成</h1>
          <p class="text-sm text-slate-500 mt-1">约束传播与剪枝——用「规则」提前砍掉不可能的分支</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 8-2-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：4 皇后逐步放置 + 冲突剪枝
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          N 皇后：在 N×N 棋盘上放 N 个皇后，要求<strong>任意两个不互相攻击</strong>（不同行、不同列、不同对角线）。
          关键技巧是<strong>按行递归</strong>——每行只放一个，就天然避开了「行冲突」，只需检查列和对角线。
          下图演示第 2 行的 4 个候选：只有第 0 列安全（绿），其余三格分别被列 / 对角线冲突剪枝（红 / 橙）。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="nq-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
              <marker id="nq-arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f97316" />
              </marker>
            </defs>

            <!-- 攻击线 -->
            <line x1="96" y1="62" x2="96" y2="150" stroke="#ef4444" stroke-width="2.5" marker-end="url(#nq-arr)" />
            <line x1="184" y1="84" x2="140" y2="150" stroke="#f97316" stroke-width="2.5" stroke-dasharray="6 4" marker-end="url(#nq-arr2)" />

            <!-- 棋盘网格 -->
            <rect x="30" y="40" width="176" height="176" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
            <rect x="30" y="40" width="176" height="176" fill="#f0f9ff" opacity="0.35" />
            <g stroke="#cbd5e1" stroke-width="1">
              <line x1="74" y1="40" x2="74" y2="216" />
              <line x1="118" y1="40" x2="118" y2="216" />
              <line x1="162" y1="40" x2="162" y2="216" />
              <line x1="30" y1="84" x2="206" y2="84" />
              <line x1="30" y1="128" x2="206" y2="128" />
              <line x1="30" y1="172" x2="206" y2="172" />
            </g>

            <!-- 第 0 行：Q 已在 (0,1) -->
            <rect x="74" y="40" width="44" height="44" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <circle cx="96" cy="62" r="13" fill="#7c3aed" stroke="#5b21b6" stroke-width="1.5" />
            <text x="96" y="62" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">Q</text>

            <!-- 第 1 行：Q 已在 (1,3) -->
            <rect x="162" y="84" width="44" height="44" fill="#4ade80" stroke="#22c55e" stroke-width="1.5" />
            <circle cx="184" cy="106" r="13" fill="#7c3aed" stroke="#5b21b6" stroke-width="1.5" />
            <text x="184" y="106" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#ffffff">Q</text>

            <!-- 第 2 行候选：0 安全 / 1 列冲突 / 2 斜冲突 / 3 列冲突 -->
            <rect x="30" y="128" width="44" height="44" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="52" y="144" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#166534">✓</text>
            <text x="52" y="164" text-anchor="middle" font-size="9" font-family="monospace" fill="#166534">安全</text>

            <rect x="74" y="128" width="44" height="44" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
            <text x="96" y="144" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">✗</text>
            <text x="96" y="164" text-anchor="middle" font-size="9" font-family="monospace" fill="#ffffff">列</text>

            <rect x="118" y="128" width="44" height="44" fill="#f97316" stroke="#ea580c" stroke-width="2" />
            <text x="140" y="144" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">✗</text>
            <text x="140" y="164" text-anchor="middle" font-size="9" font-family="monospace" fill="#ffffff">斜</text>

            <rect x="162" y="128" width="44" height="44" fill="#ef4444" stroke="#dc2626" stroke-width="2" />
            <text x="184" y="144" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">✗</text>
            <text x="184" y="164" text-anchor="middle" font-size="9" font-family="monospace" fill="#ffffff">列</text>

            <!-- 行标签 -->
            <text x="18" y="62" text-anchor="end" font-size="10" font-family="monospace" fill="#64748b">0</text>
            <text x="18" y="106" text-anchor="end" font-size="10" font-family="monospace" fill="#64748b">1</text>
            <text x="18" y="150" text-anchor="end" font-size="10" font-family="monospace" fill="#64748b">2</text>
            <text x="18" y="194" text-anchor="end" font-size="10" font-family="monospace" fill="#64748b">3</text>

            <!-- 右侧说明 -->
            <text x="250" y="56" font-size="12" font-family="monospace" font-weight="bold" fill="#1e293b">冲突判断三条件</text>
            <rect x="250" y="68" width="150" height="30" rx="6" fill="#fee2e2" stroke="#fca5a5" stroke-width="1.5" />
            <text x="325" y="83" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#dc2626">行：同行已有皇后</text>
            <rect x="250" y="104" width="150" height="30" rx="6" fill="#fee2e2" stroke="#fca5a5" stroke-width="1.5" />
            <text x="325" y="119" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#dc2626">列：同列已有皇后</text>
            <rect x="250" y="140" width="150" height="30" rx="6" fill="#ffedd5" stroke="#fdba74" stroke-width="1.5" />
            <text x="325" y="155" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#ea580c">对角：|Δ行| = |Δ列|</text>

            <text x="250" y="200" font-size="11" font-family="monospace" fill="#64748b">按行递归 → 每行 1 个皇后</text>
            <text x="250" y="220" font-size="11" font-family="monospace" fill="#64748b">→ 天然避开「行冲突」</text>
            <text x="250" y="248" font-size="11" font-family="monospace" fill="#0891b2" font-weight="bold">只用检查：列 + 两条对角线</text>
            <text x="250" y="276" font-size="10" font-family="monospace" fill="#64748b">主对角 r+c 相同 · 副对角 r-c 相同</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：4 皇后。第 2 行只有 col=0 安全；红 = 列冲突（竖线攻击），橙 = 对角线冲突（斜线攻击）→ 直接剪枝</figcaption>
        </figure>

        <!-- 操作示意：冲突判断公式 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">核心操作：判断 (r,c) 能否放皇后</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">暴力检查法（O(n)）</p>
            <svg viewBox="0 0 340 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="16" y="24" width="308" height="56" rx="8" fill="#eef2ff" stroke="#c7d2fe" stroke-width="1.5" />
              <text x="22" y="46" font-size="12" font-family="monospace" fill="#4338ca">for i in 0..r-1 :</text>
              <text x="22" y="68" font-size="12" font-family="monospace" fill="#4338ca">  board[i]==c → 列冲突 ✗</text>
              <text x="22" y="122" font-size="11" font-family="monospace" fill="#0891b2">Math.abs(r-i) === Math.abs(c-ci) → 斜冲突 ✗</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">逐个对比已放的 r 个皇后，O(n) 判一次冲突</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">数组标记法（O(1)）</p>
            <svg viewBox="0 0 340 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect x="16" y="24" width="308" height="56" rx="8" fill="#ecfeff" stroke="#a5f3fc" stroke-width="1.5" />
              <text x="22" y="46" font-size="12" font-family="monospace" fill="#0e7490">cols[c]  → 列被占？</text>
              <text x="22" y="68" font-size="12" font-family="monospace" fill="#0e7490">d1[r+c] → 主对角线被占？</text>
              <text x="22" y="122" font-size="11" font-family="monospace" fill="#0891b2">d2[r-c+n-1] → 副对角线被占？O(1)</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">三条数组 O(1) 判冲突，总体 O(n!) → O(可放数)</figcaption>
          </figure>
        </div>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          N 皇后 —— 按行递归 + 冲突剪枝
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          N 皇后是回溯的经典代表：<strong>按行放皇后</strong>，每行尝试每一列；某一列与已有皇后冲突就<strong>剪枝</strong>跳过；
          放满 N 行记录一个解，然后撤销继续。
        </p>
        <div class="mb-4"><Code language="ts" :code="nQueensCode" title="n_queens.ts" /></div>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>为什么按行递归就能避开「行冲突」？</strong></p>
          <p class="text-sm text-slate-600 leading-relaxed">因为递归深度 r 恰好就是「行号」，<code>dfs(r)</code> 只在第 r 行放一个皇后，
          放完立即 <code>dfs(r+1)</code> 进入下一行——<strong>同行的两个皇后根本不可能出现</strong>。
          于是冲突判断从「行/列/对角」三个条件简化成「列 + 两条对角线」两个条件。</p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          N 皇后的「按行递归」就像<strong>排班系统</strong>——一天（一行）只能安排一个人值班（一个皇后），
          安排后立即排下一天；冲突判断就像查「这人当天有没有班、他负责的频道/时间段有没有重」。
          回溯 = 排到某天发现后面全冲突，就撤销今天的人选，换一个人试试。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          数独 —— 约束传播（行 / 列 / 3×3 宫）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          数独是回溯的进阶版：约束从「皇后之间」变成<strong>行、列、九宫格三组约束</strong>。
          每填一个数字就要检查它是否违反三组规则，违反就换数字，全不行就回溯。这种「一边填一边更新约束」的思想叫<strong>约束传播</strong>。
        </p>
        <div class="mb-4"><Code language="ts" :code="sudokuCode" title="sudoku.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 剪枝力度决定快慢：</strong><br/>
          每次从<strong>候选数字最少</strong>的格子开始填（MRV 启发式），能把搜索空间砍掉几个数量级——
          因为「可选项越少，越早暴露冲突」。这是从「纯回溯」走向「约束满足问题 (CSP)」的关键优化。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          括号生成 —— 一对计数约束
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          生成 n 对合法括号：任意前缀中<strong>左括号数量 ≥ 右括号数量</strong>，且各恰有 n 个。
          这个「前缀平衡」约束就是剪枝条件——一旦右括号超过左括号，直接不再深入。
          合法括号组合的数量是<strong>卡特兰数</strong> <code>C(2n,n)/(n+1)</code>。
        </p>
        <div class="mb-4"><Code language="ts" :code="parenthesisCode" title="generate_parenthesis.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          括号生成的前缀平衡约束，就是 <strong>JSX / HTML 标签闭合校验</strong>的简化版——
          解析器维护一个栈，遇到 <code>&lt;div&gt;</code> 入栈、<code>&lt;/div&gt;</code> 出栈，
          任何时刻出栈多于入栈 = 非法标签结构。回溯生成合法括号 ≈ 生成合法嵌套的 JSX 树。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          冲突判断三条件 —— 核心公式
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">约束</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">判断式</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">N皇后是否需检查</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">行冲突</td><td class="px-4 py-2 border font-mono">r 相同</td><td class="px-4 py-2 border font-mono text-emerald-600">否（按行递归天然避免）</td></tr>
              <tr><td class="px-4 py-2 border">列冲突</td><td class="px-4 py-2 border font-mono">board[i] === c</td><td class="px-4 py-2 border font-mono text-red-600">是</td></tr>
              <tr><td class="px-4 py-2 border">主对角线（↘）</td><td class="px-4 py-2 border font-mono">r+c 相同</td><td class="px-4 py-2 border font-mono text-red-600">是（|Δr|===|Δc| 的另一写法）</td></tr>
              <tr><td class="px-4 py-2 border">副对角线（↗）</td><td class="px-4 py-2 border font-mono">r-c 相同</td><td class="px-4 py-2 border font-mono text-red-600">是（|Δr|===|Δc|）</td></tr>
            </tbody>
          </table>
        </div>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>两条对角线的判断直觉：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>主对角线 ↘</strong>：同一条 ↘ 线上的格子 <code>r+c</code> 恒相等（左上到右下）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>副对角线 ↗</strong>：同一条 ↗ 线上的格子 <code>r-c</code> 恒相等（右上到左下）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>统一式</strong>：<code>|Δr| === |Δc|</code> 两格在同一对角线上</span></li>
          </ul>
        </div>
        <div class="mb-4"><Code language="ts" :code="markArrayCode" title="mark_array.ts" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          常见错误
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：对角线判断写成 <code>r+i === c+ci</code>。</strong><br/>
          正确是 <code>Math.abs(r-i) === Math.abs(c-ci)</code>（或 <code>r+c</code> / <code>r-c</code> 标号法）。
          用错公式会把「无关」格子误判为冲突，导致合法解被剪掉。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：撤销皇后时忘了清三条标记数组。</strong><br/>
          用了 <code>cols / diag1 / diag2</code> 加速判断，就必须在 <code>board[r]=-1</code> 时同步把它们归 false。
          漏清一条，后续行会看到「幽灵皇后」误剪枝。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：数独/括号的剪枝条件反写。</strong><br/>
          数独 <code>isValid</code> 九宫格边界 <code>Math.floor(r/3)*3</code> 写错会越界；
          括号生成把 <code>close &lt; open</code> 写成 <code>close &lt;= open</code> 会生成非法前缀。剪枝条件是程序的「宪法」，写错满盘皆输。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验：</strong>N 皇后 n ≤ 10 直接回溯可接受；n 大时用标记数组 + MRV 启发式。
          数独先填候选最少的格子；括号生成这种「前缀约束」问题先画小 n 的前缀树再写码。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：4 皇后逐行放置与冲突剪枝
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          橙色 = 正在尝试的格子；<strong>红色（列冲突）/ 橙色深（对角线冲突）</strong> = 剪枝掉的格子，带攻击连线说明被谁攻击；
          <strong>绿色 + 紫色 Q</strong> = 放置成功。回溯时皇后被移除、格子复位。状态栏实时显示当前棋盘 <code>[列号,...]</code>。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 皇后: {{ queenCount }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="phase" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⚡ {{ phase }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">⏱️ 最坏 O(4!) · 剪枝后大幅缩小</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doRun" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40">▶ 演示第一解</button>
          <button @mousedown="doRunAll" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40">⏩ 完整回溯</button>
          <button @mousedown="doStep" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">👣 单步前进</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-rect v-for="cell in cells" :key="cell.id" :config="cellCfg(cell)" />
              <v-circle v-for="r in qRings" :key="'q'+r" :config="queenCfg(r)" />
              <v-text v-for="r in qRings" :key="'qt'+r" :config="queenText(r)" />
              <v-line v-if="attackLine" :config="attackCfg" />
              <v-text :config="{x: X0, y: Y0 + N*STEPX + 18, text: boardLabel, fontSize: 12, fontFamily: 'monospace', fill: C.text, fontStyle: 'bold'}" />
            </v-layer>
          </v-stage>
        </div>
        <p class="text-xs text-slate-400 mt-2">🟠 尝试中 &nbsp; 🔴 列冲突剪枝 &nbsp; 🟠深 对角线冲突剪枝 &nbsp; 🟢 放置成功 &nbsp; — 攻击连线</p>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>N 皇后</strong>：按行递归天然避开行冲突，只需判列 + 两条对角线</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>对角线公式</strong>：主对角 <code>r+c</code> 相同 / 副对角 <code>r-c</code> 相同 / 统一式 <code>|Δr|===|Δc|</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>数独</strong> = 三组约束（行/列/宫）传播，MRV 启发式先填候选最少的格子</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>括号生成</strong> = 前缀平衡约束 <code>close &lt; open</code> 剪枝，数量 = 卡特兰数</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>约束越早、剪枝越狠</strong>——冲突判断与撤销必须对称</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>下一篇系统总结<strong>可行性 / 最优性 / 对称性剪枝</strong>策略</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-2-backtracking/dsa-8-2-2-permutation" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：排列组合</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-2-backtracking/dsa-8-2-4-pruning" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：剪枝策略 →</RouterLink>
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
  { id: "sec-1", name: "N 皇后" },
  { id: "sec-2", name: "数独" },
  { id: "sec-3", name: "括号生成" },
  { id: "sec-4", name: "冲突判断三条件" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 4 皇后回溯动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const DIAG = '#f97316'        // 对角线冲突色（深橙）
const N = 4, CELL = 54, STEPX = 58, X0 = 48, Y0 = 30
const H = ref(360), W = ref(700)
const EMPTY = '#ffffff'
interface GCell { id:string; r:number; c:number; color:string }
const cells = reactive<GCell[]>([])
const qboard = reactive<number[]>([-1, -1, -1, -1])   // qboard[r] = 第 r 行皇后列号
const attackLine = ref<{x1:number;y1:number;x2:number;y2:number;diag:boolean}|null>(null)
const busy = ref(false), status = ref(''), phase = ref(''), stepNo = ref(0)
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

const queenCount = computed(() => qboard.filter(c => c >= 0).length)
const boardLabel = computed(() => 'board = [' + qboard.join(', ') + ']')
const qRings = computed(() => [0,1,2,3].filter(r => qboard[r] >= 0))

function initCells() {
  cells.length = 0
  for (let r = 0; r < N; r++)
    for (let c = 0; c < N; c++)
      cells.push({ id: r + '-' + c, r, c, color: EMPTY })
}
function cellAt(r:number, c:number) { return cells.find(x => x.r === r && x.c === c)! }
function cellCfg(g:GCell) {
  return { x: X0 + g.c*STEPX, y: Y0 + g.r*STEPX, width: CELL, height: CELL, fill: g.color,
    cornerRadius: 4, stroke: '#cbd5e1', strokeWidth: 1 }
}
function queenCfg(r:number) {
  return { x: X0 + qboard[r]*STEPX + CELL/2, y: Y0 + r*STEPX + CELL/2, radius: 15, fill: '#7c3aed',
    stroke: '#5b21b6', strokeWidth: 1.5, shadowColor: 'rgba(0,0,0,.2)', shadowBlur: 4 }
}
function queenText(r:number) {
  return { x: X0 + qboard[r]*STEPX, y: Y0 + r*STEPX, width: CELL, height: CELL, text: 'Q',
    fontSize: 16, fontFamily: 'monospace', fontStyle: 'bold', fill: '#ffffff', align: 'center', verticalAlign: 'middle' }
}
const attackCfg = computed(() => {
  const a = attackLine.value
  if (!a) return { points: [] }
  return { points: [a.x1, a.y1, a.x2, a.y2], stroke: a.diag ? DIAG : C.red, strokeWidth: 2.5,
    dash: a.diag ? [6, 5] : undefined, lineCap: 'round' as const }
})

// ===== 生成 4 皇后回溯的全部步骤 =====
interface NQStep { type:'probe'|'prune'|'place'|'undo'|'done'; r:number; c:number; board:number[]; isCol?:boolean; ar?:number; ac?:number; msg:string }
const STEPS: NQStep[] = []
let firstDoneIdx = -1
function buildSteps() {
  const board = [-1, -1, -1, -1]
  const cols = [false, false, false, false]
  const d1 = new Array(2*N-1).fill(false)   // r+c
  const d2 = new Array(2*N-1).fill(false)   // r-c+N-1
  const can = (r:number, c:number) => !cols[c] && !d1[r+c] && !d2[r-c+N-1]
  const dfs = (r:number) => {
    if (r === N) {
      STEPS.push({ type:'done', r:-1, c:-1, board:[...board], msg:`解出！board = [${board.join(', ')}]` })
      if (firstDoneIdx < 0) firstDoneIdx = STEPS.length - 1
      return
    }
    for (let c = 0; c < N; c++) {
      STEPS.push({ type:'probe', r, c, board:[...board], msg:`第 ${r} 行尝试列 ${c}…` })
      if (!can(r, c)) {
        let isCol = false, ar = -1
        if (cols[c]) { isCol = true; ar = board.findIndex(x => x === c) }
        else if (d1[r+c]) { ar = board.findIndex((x, rr) => rr + x === r + c) }
        else { ar = board.findIndex((x, rr) => rr - x === r - c) }
        const ac = ar >= 0 ? board[ar] : -1
        const why = isCol ? `列 ${c} 已被 (${ar},${ac}) 占用` : `对角线冲突（被 (${ar},${ac}) 攻击）`
        STEPS.push({ type:'prune', r, c, board:[...board], isCol, ar, ac, msg:`(${r},${c}) → ${why}，剪枝 ✗` })
        continue
      }
      STEPS.push({ type:'place', r, c, board:[...board], msg:`(${r},${c}) 安全 → 放置皇后 ✓` })
      board[r] = c; cols[c] = true; d1[r+c] = true; d2[r-c+N-1] = true
      dfs(r + 1)
      board[r] = -1; cols[c] = false; d1[r+c] = false; d2[r-c+N-1] = false
      STEPS.push({ type:'undo', r, c, board:[...board], msg:`回溯：移除 (${r},${c}) 皇后，换列继续` })
    }
  }
  dfs(0)
}
buildSteps()

function resetAll() {
  stepNo.value = 0; phase.value = ''; attackLine.value = null
  qboard.forEach((_, i) => { qboard[i] = -1 })
  cells.forEach(g => { g.color = EMPTY })
}
function syncBoard(b:number[]) { b.forEach((v, i) => { qboard[i] = v }) }

function applyStep(st: NQStep) {
  stepNo.value++
  status.value = st.msg
  syncBoard(st.board)
  if (st.type === 'probe') {
    phase.value = '尝试'; attackLine.value = null; cellAt(st.r, st.c).color = C.orange
  } else if (st.type === 'prune') {
    phase.value = '剪枝 ✗'; cellAt(st.r, st.c).color = st.isCol ? C.red : DIAG
    if (st.ar >= 0 && st.ac >= 0) {
      attackLine.value = {
        x1: X0 + st.ac*STEPX + CELL/2, y1: Y0 + st.ar*STEPX + CELL/2,
        x2: X0 + st.c*STEPX + CELL/2, y2: Y0 + st.r*STEPX + CELL/2, diag: !st.isCol,
      }
    }
  } else if (st.type === 'place') {
    phase.value = '放置 ✓'; cellAt(st.r, st.c).color = C.green; attackLine.value = null
  } else if (st.type === 'undo') {
    phase.value = '撤销'; cellAt(st.r, st.c).color = EMPTY; attackLine.value = null
  } else if (st.type === 'done') {
    phase.value = '解 ✓'; attackLine.value = null
  }
}

function doReset() { resetAll(); status.value = '' }

function doStep() {
  if (busy.value) return
  if (stepNo.value >= STEPS.length) { status.value = '回溯结束（共 2 个解），点「重置」再来'; return }
  applyStep(STEPS[stepNo.value])
  if (stepNo.value >= STEPS.length) { phase.value = '完成'; status.value = '4 皇后共 2 个解：[1,3,0,2] 与 [2,0,3,1]' }
}

async function runSteps(limitFirst: boolean) {
  if (busy.value) return
  busy.value = true
  resetAll()
  const limit = limitFirst ? firstDoneIdx : STEPS.length - 1
  for (let i = 0; i <= limit; i++) {
    const st = STEPS[i]
    stepNo.value = i + 1
    status.value = st.msg
    syncBoard(st.board)
    if (st.type === 'probe') {
      phase.value = '尝试'; attackLine.value = null; cellAt(st.r, st.c).color = C.orange; await d(240)
    } else if (st.type === 'prune') {
      phase.value = '剪枝 ✗'; cellAt(st.r, st.c).color = st.isCol ? C.red : DIAG
      if (st.ar >= 0 && st.ac >= 0) {
        attackLine.value = {
          x1: X0 + st.ac*STEPX + CELL/2, y1: Y0 + st.ar*STEPX + CELL/2,
          x2: X0 + st.c*STEPX + CELL/2, y2: Y0 + st.r*STEPX + CELL/2, diag: !st.isCol,
        }
      }
      await d(480)
    } else if (st.type === 'place') {
      phase.value = '放置 ✓'; cellAt(st.r, st.c).color = C.green; attackLine.value = null; await d(420)
    } else if (st.type === 'undo') {
      phase.value = '撤销'; cellAt(st.r, st.c).color = EMPTY; attackLine.value = null; await d(300)
    } else if (st.type === 'done') {
      phase.value = '解 ✓'; attackLine.value = null; await d(700)
    }
  }
  phase.value = '完成'
  if (limitFirst) status.value = '找到第 1 个解：[1,3,0,2] —— 点「⏩ 完整回溯」看第二个解'
  else status.value = '4 皇后共 2 个解：[1,3,0,2] 与 [2,0,3,1]'
  await d(800)
  busy.value = false
}
function doRun() { runSteps(true) }
function doRunAll() { runSteps(false) }

let ro: ResizeObserver | null = null
onMounted(() => {
  initCells()
  resetAll()
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

const nQueensCode = `// ===== N 皇后：按行递归 + 列/对角线剪枝 =====

function solveNQueens(n: number): string[][] {
  const res: string[][] = []
  const board: number[] = new Array(n).fill(-1)   // board[r] = 第 r 行的列号

  // 冲突判断：对已放置的 0..r-1 行逐一检查
  function canPlace(r: number, c: number): boolean {
    for (let i = 0; i < r; i++) {
      const ci = board[i]
      if (ci === c) return false                        // ① 列冲突
      if (Math.abs(r - i) === Math.abs(c - ci)) return false   // ② 对角线冲突
    }
    return true
  }

  const dfs = (r: number) => {
    if (r === n) {                                // 放满 n 行 → 一个解
      res.push(board.map(c =>
        '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1)))
      return
    }
    for (let c = 0; c < n; c++) {
      if (!canPlace(r, c)) continue               // 剪枝：冲突位置直接跳过
      board[r] = c                                // 选择：放置皇后
      dfs(r + 1)                                  // 递归：下一行
      board[r] = -1                               // 撤销：移除皇后
    }
  }

  dfs(0)
  return res
}

const boards = solveNQueens(4)
boards.forEach(b => console.log(b.join('\\n') + '\\n'))
// 输出 2 个解（每个 4 行 = 4×4 棋盘）：
//  .Q..        （Q 在 row0-col1, row1-col3, row2-col0, row3-col2）
//  ...Q
//  Q...
//  ..Q.
//
//  ..Q.
//  Q...
//  ...Q
//  .Q..`

const sudokuCode = `// ===== 数独：行 / 列 / 3×3 宫 三组约束 =====

function solveSudoku(board: string[][]): boolean {
  const isValid = (r: number, c: number, ch: string) => {
    for (let i = 0; i < 9; i++) {
      if (board[r][i] === ch) return false        // 行约束
      if (board[i][c] === ch) return false        // 列约束
    }
    const br = Math.floor(r / 3) * 3              // 3×3 宫左上角
    const bc = Math.floor(c / 3) * 3
    for (let i = br; i < br + 3; i++)
      for (let j = bc; j < bc + 3; j++)
        if (board[i][j] === ch) return false      // 宫约束
    return true
  }

  const dfs = (): boolean => {
    for (let r = 0; r < 9; r++)
      for (let c = 0; c < 9; c++)
        if (board[r][c] === '.') {                // 找一个空格
          for (let n = 1; n <= 9; n++) {
            const ch = String(n)
            if (!isValid(r, c, ch)) continue      // 剪枝：违反三组约束
            board[r][c] = ch                      // 选择：填数字
            if (dfs()) return true                // 递归：继续填下一个空格
            board[r][c] = '.'                     // 撤销：恢复空格
          }
          return false                            // 1-9 都不行 → 回溯
        }
    return true                                   // 没有空格 → 解出
  }

  return dfs()
}
// 进阶优化：每次选「候选数字最少」的空格先填（MRV），可把搜索砍到几百节点`

const parenthesisCode = `// ===== 括号生成：前缀平衡约束 close < open =====
// 合法前缀：任何时刻 '(' 数量 >= ')' 数量

function generateParenthesis(n: number): string[] {
  const res: string[] = []
  const dfs = (open: number, close: number, s: string) => {
    if (s.length === 2 * n) { res.push(s); return }   // 左右各 n 个 → 解
    if (open < n) dfs(open + 1, close, s + '(')        // 还能加左括号
    if (close < open) dfs(open, close + 1, s + ')')    // 右括号不能超过左括号 ← 剪枝
  }
  dfs(0, 0, '')
  return res
}

console.log(generateParenthesis(3))
// 输出（卡特兰数 C(6,3)/4 = 5 个）：
// ["((()))", "(()())", "(())()", "()(())", "()()()"]
// 这就是合法的嵌套结构总数：等价于「n 对括号的所有合法嵌套」`

const markArrayCode = `// ===== 标记数组法：O(1) 判冲突 =====
// 用三组布尔数组记住「哪些列 / 对角线已被占用」

function solveNQueensFast(n: number): number {
  let count = 0
  const cols = new Array(n).fill(false)             // 列 c 是否被占
  const diag1 = new Array(2*n - 1).fill(false)      // 主对角线 r+c
  const diag2 = new Array(2*n - 1).fill(false)      // 副对角线 r-c+n-1

  const dfs = (r: number) => {
    if (r === n) { count++; return }
    for (let c = 0; c < n; c++) {
      if (cols[c] || diag1[r+c] || diag2[r-c+n-1]) continue   // 三查 O(1)
      cols[c] = diag1[r+c] = diag2[r-c+n-1] = true   // 选择：占位
      dfs(r + 1)
      cols[c] = diag1[r+c] = diag2[r-c+n-1] = false  // 撤销：释放
    }
  }

  dfs(0)
  return count
}

console.log(solveNQueensFast(8))   // 输出: 92
// 8 皇后共 92 种摆法；9 皇后 352；10 皇后 724 —— 用标记数组才跑得动`
</script>
