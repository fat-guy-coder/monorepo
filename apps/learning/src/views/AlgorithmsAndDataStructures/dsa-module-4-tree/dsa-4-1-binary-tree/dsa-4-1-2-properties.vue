<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌳 二叉树性质：数量关系与四种特殊形态</h1>
          <p class="text-sm text-slate-500 mt-1">第 i 层 2^i · 高度 2^h−1 · n0=n2+1 · 满/完全/完美/平衡</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-1-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：满二叉树 vs 完全二叉树 vs 普通二叉树
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          二叉树的"形态"直接影响它的<strong>高度、节点数、存储效率</strong>。下面三种形态是理解所有性质的地基：
          <strong>完美二叉树</strong>（每层全满）、<strong>完全二叉树</strong>（最后一层靠左填）、<strong>普通二叉树</strong>（任意形态）。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 270" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="pr-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <!-- 三个面板标题 -->
            <text x="120" y="22" text-anchor="middle" font-size="12" font-family="monospace" fill="#0891b2" font-weight="bold">完美二叉树（每层全满）</text>
            <text x="360" y="22" text-anchor="middle" font-size="12" font-family="monospace" fill="#0891b2" font-weight="bold">完全二叉树（末层靠左）</text>
            <text x="600" y="22" text-anchor="middle" font-size="12" font-family="monospace" fill="#0891b2" font-weight="bold">普通二叉树（任意）</text>

            <!-- 面板1：完美二叉树（7 节点） -->
            <line x1="120" y1="64" x2="72" y2="104" stroke="#94a3b8" stroke-width="2" marker-end="url(#pr-a)" />
            <line x1="120" y1="64" x2="168" y2="104" stroke="#94a3b8" stroke-width="2" marker-end="url(#pr-a)" />
            <line x1="72" y1="136" x2="40" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#pr-a)" />
            <line x1="72" y1="136" x2="104" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#pr-a)" />
            <line x1="168" y1="136" x2="136" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#pr-a)" />
            <line x1="168" y1="136" x2="200" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#pr-a)" />
            <circle cx="120" cy="48" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="120" y="48" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">1</text>
            <circle cx="72" cy="120" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="72" y="120" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">2</text>
            <circle cx="168" cy="120" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="168" y="120" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">3</text>
            <circle cx="40" cy="196" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="40" y="196" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">4</text>
            <circle cx="104" cy="196" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="104" y="196" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">5</text>
            <circle cx="136" cy="196" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="136" y="196" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">6</text>
            <circle cx="200" cy="196" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="200" y="196" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">7</text>

            <!-- 面板2：完全二叉树（5 节点） -->
            <line x1="360" y1="64" x2="320" y2="104" stroke="#94a3b8" stroke-width="2" marker-end="url(#pr-a)" />
            <line x1="360" y1="64" x2="400" y2="104" stroke="#94a3b8" stroke-width="2" marker-end="url(#pr-a)" />
            <line x1="320" y1="136" x2="296" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#pr-a)" />
            <line x1="320" y1="136" x2="344" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#pr-a)" />
            <circle cx="360" cy="48" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="360" y="48" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">1</text>
            <circle cx="320" cy="120" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="320" y="120" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">2</text>
            <circle cx="400" cy="120" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="400" y="120" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">3</text>
            <circle cx="296" cy="196" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="296" y="196" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">4</text>
            <circle cx="344" cy="196" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="344" y="196" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">5</text>

            <!-- 面板3：普通二叉树（3 节点，根只有右孩子） -->
            <line x1="600" y1="64" x2="648" y2="104" stroke="#94a3b8" stroke-width="2" marker-end="url(#pr-a)" />
            <line x1="648" y1="136" x2="616" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#pr-a)" />
            <line x1="648" y1="136" x2="680" y2="180" stroke="#94a3b8" stroke-width="2" marker-end="url(#pr-a)" />
            <circle cx="600" cy="48" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="600" y="48" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">1</text>
            <circle cx="552" cy="120" r="16" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="552" y="120" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">null</text>
            <circle cx="648" cy="120" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="648" y="120" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">3</text>
            <circle cx="616" cy="196" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="616" y="196" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">6</text>
            <circle cx="680" cy="196" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="680" y="196" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#fff">7</text>

            <!-- 底部说明 -->
            <text x="120" y="246" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">7 节点 = 2³−1（最满）</text>
            <text x="360" y="246" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">5 节点，末层靠左对齐</text>
            <text x="600" y="246" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">根只有右孩子，可退化成链</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：三种形态对比 —— 完美二叉树最紧凑（高度最小），普通二叉树可能退化成链表（高度最大）</figcaption>
        </figure>
      </section>

      <!-- 1. 层与节点数 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          性质一：第 i 层最多 2^i 个节点
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          根节点在第 0 层。每个节点最多产生 2 个孩子，所以每往下走一层，节点数上限<strong>翻一倍</strong>：
          第 0 层 1 个，第 1 层 2 个，第 2 层 4 个…… 第 i 层最多 <code>2^i</code> 个节点。这是指数增长的根源。
        </p>
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 text-center font-mono">第 i 层最多节点数 = 2^i （i 从 0 开始）</p>
          <p class="text-xs text-cyan-600 text-center mt-1">第 0 层 = 1 · 第 1 层 = 2 · 第 2 层 = 4 · 第 3 层 = 8 · …</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="levelCode" title="level_count.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          "每层翻倍"就是<strong>树的指数级分叉</strong>，和 <code>Promise.all</code> 递归拉取、目录树递归展开一个道理。<br/>
          一个经典应用是 <strong>React/Vue 组件树的渲染复杂度</strong>——每多一层嵌套，潜在节点数就乘以 2，这就是为什么"深层次嵌套"会让渲染和 diff 变慢。
          </p>
        </aside>
      </section>

      <!-- 2. 高度与总数 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          性质二：高 h 的二叉树最多 2^h − 1 个节点
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          把每一层的上限加起来（等比数列求和），就是整棵树最多能容纳的节点数：
          <code>1 + 2 + 4 + … + 2^(h−1) = 2^h − 1</code>（h 为层数，即高度 + 1）。
          反过来：n 个节点的二叉树，高度最少为 <code>⌊log₂(n+1)⌋ − 1</code>（完美二叉树时），最多为 <code>n − 1</code>（退化成链表时）。
        </p>
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 text-center font-mono">高 h（共 h 层）最多节点数 = 2^h − 1</p>
          <p class="text-xs text-cyan-600 text-center mt-1">h=1 → 1 · h=2 → 3 · h=3 → 7 · h=4 → 15 · …</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="heightCode" title="height_count.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键推论：</strong>二叉树的很多操作复杂度是 O(h)（h = 高度）。
          完美/平衡树高度 = O(log n)，退化成链的树高度 = O(n)。<strong>这就是"保持平衡"如此重要的原因</strong>——它把 O(n) 拉回到 O(log n)，模块 4-3 的 AVL / 红黑树就是干这件事的。</p>
        </aside>
      </section>

      <!-- 3. n0 = n2 + 1 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          性质三：叶节点数 = 度为 2 的节点数 + 1（n0 = n2 + 1）
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          用 <code>n0</code> 表示<strong>叶节点</strong>（0 个孩子）、<code>n1</code> 表示 1 个孩子、<code>n2</code> 表示 2 个孩子的节点数，那么：
          <strong><code>n0 = n2 + 1</code></strong>——任何二叉树都成立。证明思路：总边数 = 总节点数 − 1，而总边数又等于 <code>n1 + 2·n2</code>，两式联立即得。
        </p>
        <div class="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 text-center font-mono">n0 = n2 + 1</p>
          <p class="text-xs text-cyan-600 text-center mt-1">叶节点数 = 二度节点数 + 1（对任意二叉树成立）</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="n0Code" title="n0_equals_n2_plus_1.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 有什么用：</strong>这个等式经常出现在"已知 n2 求叶节点数"的选择题，也用于估算树结构。
          例如完全二叉树有 1000 个节点时，叶节点数就是 500（因为完全二叉树要么 n1=0 要么 n1=1，且 n = n0+n1+n2 = 2·n2+1+n1）。</p>
        </aside>
      </section>

      <!-- 4. 四种形态定义 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          四种特殊形态：满 / 完全 / 完美 / 平衡
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          这四个词在中文教材和英文资料里经常<strong>混用</strong>，务必分清（本系列统一采用下面的定义）：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">形态</th><th class="px-4 py-2 border border-slate-200 font-semibold">定义</th><th class="px-4 py-2 border border-slate-200 font-semibold">英文</th><th class="px-4 py-2 border border-slate-200 font-semibold">节点数</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">满二叉树</td><td class="px-4 py-2 border">每个节点要么 0 个孩子、要么 2 个孩子（无单孩子节点）</td><td class="px-4 py-2 border font-mono">Full</td><td class="px-4 py-2 border font-mono">任意，但无 n1</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">完全二叉树</td><td class="px-4 py-2 border">除最后一层外全满，最后一层节点<strong>靠左</strong>排列</td><td class="px-4 py-2 border font-mono">Complete</td><td class="px-4 py-2 border font-mono">任意</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">完美二叉树</td><td class="px-4 py-2 border">所有叶子同层，所有内部节点都有 2 个孩子</td><td class="px-4 py-2 border font-mono">Perfect</td><td class="px-4 py-2 border font-mono">2^h − 1</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">平衡二叉树</td><td class="px-4 py-2 border">任意节点左右子树<strong>高度差 ≤ 1</strong>（AVL 标准）</td><td class="px-4 py-2 border font-mono">Balanced</td><td class="px-4 py-2 border font-mono">任意，高度 O(log n)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="shapeCode" title="tree_shapes.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 术语陷阱：</strong><br/>
          中文教材（如严蔚敏版）里的"满二叉树"通常指<strong>每层全满</strong>（即英文 Perfect），但 LeetCode / 英文资料里的 "Full Binary Tree" 指"无单孩子节点"。
          做题时先确认题目用的是哪个定义——本系列把"每层全满"叫<strong>完美二叉树</strong>，把"0 或 2 孩子"叫<strong>满二叉树</strong>，避免歧义。
          </p>
        </aside>
      </section>

      <!-- 5. 陷阱 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          常见陷阱与易错点
        </h2>
        <div class="mb-4"><Code language="ts" :code="pitfallsCode" title="common_pitfalls.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 1 —— 层数从 0 还是 1 开始：</strong><br/>
          不同教材的"第 i 层"定义不同：从 0 开始则第 i 层最多 <code>2^i</code>，从 1 开始则第 i 层最多 <code>2^(i−1)</code>。做题时先统一基准，否则差一错误。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱 2 —— 高度 vs 深度 vs 层数：</strong><br/>
          高度（height）= 该节点到最深叶的边数，深度（depth）= 根到该节点的边数，层数（level）= 深度 + 1。
          一个"高 2"的完美二叉树有 3 层、7 个节点，别把"高 2"当成"2 层"。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆口诀：</strong><br/>
          ① 每层翻倍 <code>2^i</code>；② 全加起来 <code>2^h−1</code>；③ 叶子比二度多一个 <code>n0=n2+1</code>；④ 完美最紧凑、链最稀疏。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：验证 n0 = n2 + 1 与层级上限
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          一棵 7 节点完美二叉树。<strong>「数度」</strong>：绿色 = 叶（度 0）、橙色 = 二度节点，验证 n0 = n2 + 1。
          <strong>「层级上限」</strong>：逐层高亮，展示第 i 层实际节点数不超过 2^i。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ tNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doCountDegrees" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">🔢 数度 n0=n2+1</button>
          <button @mousedown="doLevelLimit" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">📐 层级上限 2^i</button>
          <button @mousedown="resetTree" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in tEdges" :key="'e'+e.a+'-'+e.b" :config="edgeCfg(e)" />
              <v-circle v-for="n in tNodes" :key="'c'+n.id" :config="circleCfg(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>第 i 层最多 2^i 节点</strong>（i 从 0 起），每层翻倍</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>高 h（共 h 层）最多 2^h − 1 节点</strong>，等比数列求和</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>n0 = n2 + 1</strong>：叶节点数 = 二度节点数 + 1，任意二叉树成立</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>满</strong>（0 或 2 孩子）、<strong>完全</strong>（末层靠左）、<strong>完美</strong>（每层全满）、<strong>平衡</strong>（高度差 ≤ 1）四者不同</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>高度决定复杂度</strong>：平衡 O(log n) vs 退化链 O(n)——平衡是后续所有高效树的前提</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>警惕术语</strong>：层数起算点、高度/深度/层数、满 vs 完美——统一基准再做题</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-1-binary-tree/dsa-4-1-1-traversal" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：二叉树遍历</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-1-binary-tree/dsa-4-1-3-construct" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：重建二叉树 →</RouterLink>
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
  { id: "sec-1", name: "第 i 层 2^i" },
  { id: "sec-2", name: "高 h → 2^h−1" },
  { id: "sec-3", name: "n0 = n2 + 1" },
  { id: "sec-4", name: "四种特殊形态" },
  { id: "sec-5", name: "常见陷阱" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 二叉树性质动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const R = 24, LEVEL_H = 92, TOP = 44
const H = ref(320), W = ref(700)
interface TNode { id: number; val: number | string; x: number; y: number; color: string }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{ a: number; b: number }[]>([])
const tChild = reactive<Record<number, { left: number | null; right: number | null }>>({})
const busy = ref(false), status = ref('')
const box = ref<HTMLDivElement>()
const rootId = 1

const TREE: Record<number, { left: number | null; right: number | null }> = {
  1: { left: 2, right: 3 },
  2: { left: 4, right: 5 },
  3: { left: 6, right: 7 },
  4: { left: null, right: null },
  5: { left: null, right: null },
  6: { left: null, right: null },
  7: { left: null, right: null },
}

function makeFixedTree(root: number, child: Record<number, { left: number | null; right: number | null }>) {
  tNodes.length = 0; tEdges.length = 0
  Object.keys(tChild).forEach(k => delete tChild[k])
  Object.assign(tChild, child)
  let level = [root], y = TOP
  while (level.length) {
    const gap = W.value / (level.length + 1)
    level.forEach((id, i) => {
      tNodes.push({ id, val: id, x: gap * (i + 1), y, color: C.cyan })
    })
    const next: number[] = []
    level.forEach(id => {
      const { left, right } = child[id] || {}
      if (left != null) { tEdges.push({ a: id, b: left }); next.push(left) }
      if (right != null) { tEdges.push({ a: id, b: right }); next.push(right) }
    })
    level = next; y += LEVEL_H
  }
}

function pos(id: number) { return tNodes.find(n => n.id === id)! }
function edgeCfg(e: { a: number; b: number }) {
  const pa = pos(e.a), pb = pos(e.b)
  return { points: [pa.x, pa.y + R, pb.x, pb.y - R], stroke: '#94a3b8', strokeWidth: 2 }
}
function circleCfg(n: TNode) {
  return { x: n.x, y: n.y, radius: R, fill: n.color, stroke: '#64748b', strokeWidth: 1.5,
    shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function tTextCfg(n: TNode) {
  return { x: n.x - R, y: n.y - R, width: R * 2, height: R * 2, text: String(n.val),
    fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: '#fff', align: 'center', verticalAlign: 'middle' }
}
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

function resetTree() {
  tNodes.forEach(n => n.color = C.cyan)
  status.value = ''
}

async function doCountDegrees() {
  if (busy.value) return
  resetTree(); busy.value = true
  status.value = '统计每个节点的度…'; await d(400)
  let n0 = 0, n1 = 0, n2 = 0
  for (const n of tNodes) {
    const { left, right } = tChild[n.id] || {}
    const c = (left != null ? 1 : 0) + (right != null ? 1 : 0)
    if (c === 0) { n.color = C.green; n0++; status.value = `${n.id} 是叶节点（度 0）` }
    else if (c === 1) { n.color = C.red; n1++ }
    else { n.color = C.orange; n2++; status.value = `${n.id} 是二度节点（度 2）` }
    await d(320)
  }
  status.value = `n0(叶)=${n0}，n1=${n1}，n2=${n2} → n0 = n2 + 1 = ${n2 + 1} ✓`
  await d(600)
  busy.value = false
}

async function doLevelLimit() {
  if (busy.value) return
  resetTree(); busy.value = true
  // 按 BFS 分组
  const byLevel: number[][] = []
  let level = [rootId]
  while (level.length) {
    byLevel.push([...level])
    const next: number[] = []
    level.forEach(id => {
      const { left, right } = tChild[id] || {}
      if (left != null) next.push(left)
      if (right != null) next.push(right)
    })
    level = next
  }
  for (let i = 0; i < byLevel.length; i++) {
    tNodes.forEach(n => n.color = C.ghost)
    byLevel[i].forEach(id => pos(id).color = C.orange)
    const limit = Math.pow(2, i)
    status.value = `第 ${i} 层：实际 ${byLevel[i].length} 个 ≤ 上限 2^${i} = ${limit} 个`
    await d(850)
  }
  status.value = '完成：完美二叉树每层都达到上限 2^i'
  await d(600)
  busy.value = false
}

let ro: ResizeObserver | null = null
onMounted(() => {
  makeFixedTree(rootId, TREE)
  if (box.value) {
    W.value = box.value.clientWidth; makeFixedTree(rootId, TREE)
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 200) { W.value = w; makeFixedTree(rootId, TREE) } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const levelCode = `// 性质一：第 i 层最多 2^i 个节点（i 从 0 开始）
// 理由：每个节点最多 2 个孩子 → 每层节点数最多翻倍

function maxNodesAtLevel(level: number): number {
    return 2 ** level   // 2^i
}

console.log(maxNodesAtLevel(0))  // 1  根
console.log(maxNodesAtLevel(1))  // 2
console.log(maxNodesAtLevel(2))  // 4
console.log(maxNodesAtLevel(3))  // 8
console.log(maxNodesAtLevel(10)) // 1024
// 指数增长：第 30 层理论上可容纳 2^30 ≈ 10 亿节点
// （现实中内存放不下，这就是"组合爆炸"的直观来源）`

const heightCode = `// 性质二：高 h（共 h 层）的二叉树最多 2^h - 1 个节点
// 等比数列求和：1 + 2 + 4 + ... + 2^(h-1) = 2^h - 1

function maxNodesForHeight(h: number): number {
    return 2 ** h - 1
}

console.log(maxNodesForHeight(1))  // 1  只有根
console.log(maxNodesForHeight(2))  // 3
console.log(maxNodesForHeight(3))  // 7
console.log(maxNodesForHeight(4))  // 15

// 反向：n 个节点，最小高度（完美二叉树）是多少层？
function minLayers(n: number): number {
    return Math.ceil(Math.log2(n + 1))
}
console.log(minLayers(7))    // 3 层（2^3-1 = 7 正好装满）
console.log(minLayers(8))    // 4 层（7 装不下 8，需要第 4 层）

// 退化链：n 个节点最大高度 = n（每层只有 1 个节点）
// 所以操作复杂度 O(h) 在最好时是 O(log n)，最坏时是 O(n)`

const n0Code = `// 性质三：n0 = n2 + 1（叶节点数 = 二度节点数 + 1）
// 证明：
//   总节点数 n = n0 + n1 + n2
//   总边数   e = n - 1          （树的性质：边数 = 节点数 - 1）
//   总边数   e = n1 + 2*n2      （度 1 节点贡献 1 条边，度 2 节点贡献 2 条边）
//   联立：n0 + n1 + n2 - 1 = n1 + 2*n2
//   化简：n0 = n2 + 1  ✓

// 验证：用任意二叉树实测
class TreeNode {
    val: number; left: TreeNode | null; right: TreeNode | null
    constructor(val: number) { this.val = val; this.left = null; this.right = null }
}

function countDegrees(root: TreeNode | null): { n0: number; n1: number; n2: number } {
    if (!root) return { n0: 0, n1: 0, n2: 0 }
    const c = (root.left ? 1 : 0) + (root.right ? 1 : 0)
    const L = countDegrees(root.left)
    const R = countDegrees(root.right)
    return {
        n0: L.n0 + R.n0 + (c === 0 ? 1 : 0),
        n1: L.n1 + R.n1 + (c === 1 ? 1 : 0),
        n2: L.n2 + R.n2 + (c === 2 ? 1 : 0),
    }
}
// 对 7 节点完美树：n0 = 4（节点 4,5,6,7），n2 = 3（节点 1,2,3），4 = 3 + 1 ✓`

const shapeCode = `// 四种特殊形态判定（递归）
class TreeNode {
    val: number; left: TreeNode | null; right: TreeNode | null
    constructor(val: number) { this.val = val; this.left = null; this.right = null }
}

// 满二叉树：每个节点 0 或 2 个孩子
function isFull(root: TreeNode | null): boolean {
    if (!root) return true
    if (!root.left && !root.right) return true            // 叶：OK
    if (root.left && root.right)                          // 双孩子：递归判断
        return isFull(root.left) && isFull(root.right)
    return false                                           // 单孩子：不满足
}

// 完美二叉树：所有叶子同层 → 左右子树都是完美且高度相同
function isPerfect(root: TreeNode | null): boolean {
    const h = (n: TreeNode | null): number => n ? 1 + Math.max(h(n.left), h(n.right)) : 0
    if (!root) return true
    if (h(root.left) !== h(root.right)) return false
    return isPerfect(root.left) && isPerfect(root.right)
}

// 平衡二叉树（AVL 标准）：任意节点左右子树高度差 ≤ 1
function isBalanced(root: TreeNode | null): boolean {
    function height(n: TreeNode | null): number {
        if (!n) return 0
        const lh = height(n.left)
        const rh = height(n.right)
        if (lh === -1 || rh === -1 || Math.abs(lh - rh) > 1) return -1
        return 1 + Math.max(lh, rh)
    }
    return height(root) !== -1
}
// 注意：完全二叉树的判定需要层序编号（数组下标法），见完全二叉树的存储章节`

const pitfallsCode = `// ─── 陷阱 1：层数起算点 ───
// 根在第 0 层：第 i 层最多 2^i
// 根在第 1 层：第 i 层最多 2^(i-1)
// 两者都正确，但混用会"差一倍"，做题先统一

// ─── 陷阱 2：高度/深度/层数 ───
//       1        ← 深度 0，高度 2，第 0 层
//      / \\
//     2   3      ← 深度 1，高度 1，第 1 层
//    / \\
//   4   5        ← 深度 2，高度 0（叶），第 2 层
// 这棵树的"高度"= 2（边数），"层数"= 3

// ─── 陷阱 3：满 vs 完美 ───
// 完美二叉树一定是满二叉树，反过来不一定：
//     1
//    / \\
//   2   3      ← 每层满 → 完美 + 满
//     1
//    / \\
//   2   3
//  / \\
// 4   5        ← 无单孩子节点 → 满，但叶子不同层 → 不是完美

// ─── 陷阱 4：完全二叉树 ≠ 满二叉树 ───
// 完全二叉树只要求"末层靠左"，中间层全满：
//     1
//    / \\
//   2   3
//  /
// 4            ← 完全二叉树（末层靠左），但 2 只有左孩子 → 不是满

// ─── 陷阱 5：n0 = n2 + 1 不涉及 n1 ───
// 公式里没有 n1（单孩子节点）！n1 可以任意变化，不影响 n0 与 n2 的关系`
</script>
