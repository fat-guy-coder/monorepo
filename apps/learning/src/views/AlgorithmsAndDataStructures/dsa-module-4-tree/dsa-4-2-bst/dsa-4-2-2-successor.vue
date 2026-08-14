<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌳 前驱与后继节点（中序遍历的邻居）</h1>
          <p class="text-sm text-slate-500 mt-1">前驱 = 比它小的最大节点，后继 = 比它大的最小节点——删除双子的关键</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-2-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：中序遍历里的「前一个」和「后一个」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          把 BST 做<strong>中序遍历</strong>会得到严格递增序列。对任意节点 <code>node</code>：
          <strong>前驱（predecessor）</strong>是序列里紧挨在它<strong>前面</strong>的那个（比它小的最大节点），
          <strong>后继（successor）</strong>是紧挨在它<strong>后面</strong>的那个（比它大的最小节点）。
          这两个「邻居」正是删除双子节点时的救兵。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 400" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="s1-e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">中序遍历：1 → 3 → 6 → 7 → 8 → 10 → 14（每两个相邻节点互为前驱/后继）</text>

            <!-- 边 -->
            <line x1="360" y1="74" x2="185" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#s1-e)" />
            <line x1="360" y1="74" x2="535" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#s1-e)" />
            <line x1="185" y1="174" x2="90" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#s1-e)" />
            <line x1="185" y1="174" x2="280" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#s1-e)" />
            <line x1="280" y1="274" x2="345" y2="326" stroke="#94a3b8" stroke-width="2" marker-end="url(#s1-e)" />
            <line x1="535" y1="174" x2="620" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#s1-e)" />

            <!-- 空子节点 -->
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

            <!-- 高亮 8 的前驱 7（绿）与后继 10（橙） -->
            <circle cx="345" cy="350" r="24" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="345" y="350" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">7</text>
            <circle cx="620" cy="250" r="24" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
            <text x="620" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">14</text>
            <circle cx="535" cy="150" r="24" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
            <text x="535" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#0f172a">10</text>
            <circle cx="360" cy="50" r="24" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
            <text x="360" y="50" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>

            <!-- 图例 -->
            <text x="16" y="388" font-size="11" font-family="monospace" fill="#16a34a">绿色 = 8 的前驱（7）</text>
            <text x="260" y="388" font-size="11" font-family="monospace" fill="#d97706">橙色 = 8 的后继（10）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：BST 结构 —— 中序序列里 7、8、10 相邻，7 是 8 的前驱、10 是 8 的后继</figcaption>
        </figure>

        <!-- 操作示意图：后继的两种情形 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">后继的两种情形：有右子树 vs 无右子树</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">① 有右子树 → 右子树最左</p>
            <svg viewBox="0 0 340 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="s2a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
                </marker>
              </defs>
              <!-- 边 -->
              <line x1="120" y1="72" x2="40" y2="128" stroke="#94a3b8" stroke-width="2" marker-end="url(#s2a)" />
              <line x1="120" y1="72" x2="230" y2="128" stroke="#4ade80" stroke-width="2.5" />
              <line x1="230" y1="172" x2="290" y2="208" stroke="#94a3b8" stroke-width="2" />
              <line x1="230" y1="172" x2="170" y2="208" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <circle cx="170" cy="230" r="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
              <text x="170" y="230" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">null</text>
              <!-- 节点 -->
              <circle cx="120" cy="50" r="22" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
              <text x="120" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
              <circle cx="40" cy="150" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
              <text x="40" y="150" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#64748b">1</text>
              <circle cx="230" cy="150" r="22" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="230" y="150" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">6</text>
              <circle cx="290" cy="230" r="20" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
              <text x="290" y="230" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#64748b">7</text>
              <text x="16" y="252" font-size="11" font-family="monospace" fill="#16a34a">3 的后继 = 6：右走一步，再一路向左</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">3 有右子树，后继 = 右子树 {6,7} 的最左节点 6</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">② 无右子树 → 向上回溯</p>
            <svg viewBox="0 0 340 280" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="s2b-up" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
              </defs>
              <!-- 边 -->
              <line x1="70" y1="62" x2="70" y2="88" stroke="#94a3b8" stroke-width="2" />
              <line x1="70" y1="132" x2="70" y2="158" stroke="#94a3b8" stroke-width="2" />
              <line x1="70" y1="202" x2="70" y2="228" stroke="#94a3b8" stroke-width="2" />
              <!-- 左右标签 -->
              <text x="84" y="76" font-size="10" font-family="monospace" fill="#64748b">L</text>
              <text x="84" y="146" font-size="10" font-family="monospace" fill="#64748b">R</text>
              <text x="84" y="216" font-size="10" font-family="monospace" fill="#64748b">R</text>
              <!-- 向上回溯虚线 -->
              <line x1="92" y1="248" x2="92" y2="52" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#s2b-up)" />
              <text x="108" y="150" font-size="11" font-family="monospace" fill="#d97706">向上回溯</text>
              <!-- 节点 -->
              <circle cx="70" cy="40" r="22" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="70" y="40" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>
              <circle cx="70" cy="110" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
              <text x="70" y="110" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#64748b">3</text>
              <circle cx="70" cy="180" r="22" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2" />
              <text x="70" y="180" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#64748b">6</text>
              <circle cx="70" cy="250" r="22" fill="#06b6d4" stroke="#f59e0b" stroke-width="3" />
              <text x="70" y="250" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <text x="16" y="276" font-size="11" font-family="monospace" fill="#d97706">7 的后继 = 8：向上走到「父的左孩子」处</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">7 无右子树，回溯到「自己是父的左孩子」的父节点 8</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 定义 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          定义：中序遍历里的两个邻居
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          对 BST 做中序遍历得到一个严格递增序列 <code>v[0] &lt; v[1] &lt; ... &lt; v[n-1]</code>。对其中某个节点 <code>x</code>：
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">前驱 = 序列里 x 左边那个（比 x 小的最大值）</p>
          <p class="text-lg font-bold text-cyan-800 text-center font-mono">后继 = 序列里 x 右边那个（比 x 大的最小值）</p>
          <p class="text-xs text-cyan-600 text-center mt-2">最大节点没有后继，最小节点没有前驱（返回 null）</p>
        </div>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>中序序列 <code>1, 3, 6, 7, 8, 10, 14</code> 里，<code>8</code> 的前驱是 <code>7</code>、后继是 <code>10</code>。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>树里找前驱/后继不需要先做完整中序遍历——利用 BST 有序性可以在 <strong>O(h)</strong> 内定位。</span></li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          前驱/后继就是「<strong>有序数组里相邻元素</strong>」在树上的等价物——数组里 <code>arr[i]</code> 的前一个元素是 <code>arr[i-1]</code>，树里因为不是线性的，才需要一套「右子树最左 / 向上回溯」的定位规则。<br/>
          也像 <strong>DOM 树</strong>：找某个节点的「下一个兄弟」要分「有子节点先深入」和「没有就向上找祖先的兄弟」，本质都是「<strong>先下后上</strong>」的定位策略。
          </p>
        </aside>
      </section>

      <!-- 2. 后继 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          找后继 successor(node) —— 两分支
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          找 <code>node</code> 的后继，只看它的「结构位置」分两种情形：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>有右子树</strong>：后继 = 右子树的最左节点（一路向左，右子树里的最小值）。</li>
          <li><strong>无右子树</strong>：从 node 向上回溯，找到第一个「<strong>当前节点是父的左孩子</strong>」的父节点——这个父就是后继。一路回溯到根都没有，说明 node 是最大值，后继为 null。</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="successorCode" title="bst_successor.ts" /></div>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">有右子树 → 右子树最左；无右子树 → 向上找「是父左孩子」的祖先</p>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么「右子树最左」就是后继？</strong>右子树里的值都比 node 大，其中<strong>最小值</strong>正好是「比 node 大里最小的」；又因为中序顺序是「左中右」，右子树最左节点恰好排在中序里 node 之后的第一位。</p>
        </aside>
      </section>

      <!-- 3. 前驱 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          找前驱 predecessor(node) —— 完全对称
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          前驱和后继是镜像关系，把「右」换成「左」、「左孩子」换成「右孩子」即可：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>有左子树</strong>：前驱 = 左子树的最右节点（一路向右，左子树里的最大值）。</li>
          <li><strong>无左子树</strong>：向上回溯，找到第一个「<strong>当前节点是父的右孩子</strong>」的父节点。回溯到根都没有，说明 node 是最小值，前驱为 null。</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="predecessorCode" title="bst_predecessor.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆技巧：</strong>「前驱往左、后继往右；有子树先下探，没子树向上找『拐弯处』」。两个函数除了左右互换，逻辑一模一样，理解一个另一个自然就会。</p>
        </aside>
      </section>

      <!-- 4. 无 parent + 删除 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          无 parent 指针怎么写 + 为什么删除双子要后继
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          上面两段代码依赖 <code>parent</code> 指针。很多树（如 LeetCode 的 <code>TreeNode</code>）<strong>没有 parent 指针</strong>，此时「无右子树」的向上回溯可以改成「<strong>从根出发搜索，沿途记录最后一次向左拐的节点</strong>」：
        </p>
        <div class="mb-4"><Code language="ts" :code="noParentCode" title="bst_successor_noparent.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          删除双子节点就像<strong>团队「交接离职」</strong>——要删的人不能立刻走，先让<strong>继任者（后继）</strong>把工作内容（值）复制过来，再让继任者离开原岗位。<br/>
          为什么必须用后继？因为后继<strong>比左子树全大、比右子树（除自己）全小</strong>，顶替后整棵树依然满足 BST 有序性，而且只需要「改值 + 删一个至多带一个右孩子的节点」，结构改动最小。
          </p>
        </aside>
      </section>

      <!-- 5. 常见错误 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          常见错误
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 三个高频坑：</strong><br/>
          ① <strong>后继写成「右子树最右」</strong>——后继是右子树的<strong>最小值</strong>（一路向左），前驱才是左子树的最大值（一路向右）。左右搞反是最常见的错误。<br/>
          ② <strong>无右子树时只回退一层就停</strong>——必须一路向上，直到「当前是父的左孩子」才停。例如 <code>7</code> 的后继是 <code>8</code> 而不是 <code>6</code>（7 是 6 的<strong>右</strong>孩子，得继续向上）。<br/>
          ③ <strong>删除双子时忘处理后继的右孩子</strong>——后继（右子树最左）可能还带着一个右孩子，删除时要把这个右孩子接到后继的父上，否则会丢节点。
          </p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>凡是「找邻居 / 找上下界 / 找排名」的树题，先翻译成中序序列上的「上一个 / 下一个」，再用「有子树先下探、没子树向上回溯」两分支套模板，几乎不用背。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：找后继 / 找前驱
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          橙色 = 目标节点，灰色 = 路径上的中间节点，绿色 = 命中的前驱/后继。有右子树走「右→左」；无右子树向上回溯到「父的左孩子」处。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ tNodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🌳 高度: {{ dynHeight }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <input v-model.number="targetKey" type="number" class="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-400 transition-shadow" placeholder="节点值" />
          <button @mousedown="doSuccessor" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm">🔍 找后继</button>
          <button @mousedown="doPredecessor" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">🔍 找前驱</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm">↺ 重置</button>
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>定义：</strong>前驱 = 中序序列里比 node 小的最大节点；后继 = 比 node 大的最小节点</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>后继两分支：</strong>有右子树 → 右子树最左；无右子树 → 向上回溯到「是父左孩子」的父</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>前驱对称：</strong>有左子树 → 左子树最右；无左子树 → 向上回溯到「是父右孩子」的父</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>无 parent 指针：</strong>从根搜索，记录「最后一次向左拐」的祖先即后继</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>删除双子的关键：</strong>用后继顶替保序、结构改动最小；复杂度 O(h)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>最大/最小节点：</strong>最大值无后继，最小值无前驱（返回 null）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-2-bst/dsa-4-2-1-basic" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：二叉搜索树</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-2-bst/dsa-4-2-3-kth" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：第 K 小元素 →</RouterLink>
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
  { id: "sec-1", name: "前驱与后继" },
  { id: "sec-2", name: "找后继 successor" },
  { id: "sec-3", name: "找前驱 predecessor" },
  { id: "sec-4", name: "无 parent 与删除" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 前驱/后继动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const R = 22, LEVEL_H = 90, TOP = 50
const H = ref(380), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref(''), nid = ref(100)
const box = ref<HTMLDivElement>()
const targetKey = ref(7)
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
function parentOf(id:number): number|null { for (const k of Object.keys(tChild)) { const c = tChild[+k]; if (c.left === id || c.right === id) return +k } return null }
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

function doSuccessor() {
  const key = targetKey.value; if (isNaN(key)) return
  act(`找 ${key} 的后继`, '后继 O(h)', async () => {
    resetTree()
    const tid = findIdByVal(key)
    if (tid == null) { status.value = `${key} 不在树中`; return }
    const t = pos(tid); t.color = C.orange; t.s = 1.12; await d(500)
    const right = tChild[tid].right
    if (right != null) {
      status.value = `${key} 有右子树 → 去右子树最左`; await d(300)
      let cur: number | null = right
      while (cur != null) {
        const n = pos(cur); n.color = C.orange; await d(380)
        const l = tChild[cur].left
        if (l == null) { n.color = C.green; n.s = 1.15; status.value = `✅ ${key} 的后继 = ${vals[cur]}`; return }
        n.color = C.ghost; cur = l
      }
    } else {
      status.value = `${key} 无右子树 → 向上回溯`; await d(300)
      let cur = tid, p = parentOf(cur)
      while (p != null && tChild[p].right === cur) {
        const pn = pos(p); pn.color = C.orange; await d(380); pn.color = C.ghost
        cur = p; p = parentOf(cur)
      }
      if (p == null) { status.value = `❌ ${key} 是最大节点，无后继`; return }
      const sn = pos(p); sn.color = C.green; sn.s = 1.15
      status.value = `✅ ${key} 的后继 = ${vals[p]}（回溯到「父的左孩子」${vals[p]}）`
    }
  })
}

function doPredecessor() {
  const key = targetKey.value; if (isNaN(key)) return
  act(`找 ${key} 的前驱`, '前驱 O(h)', async () => {
    resetTree()
    const tid = findIdByVal(key)
    if (tid == null) { status.value = `${key} 不在树中`; return }
    const t = pos(tid); t.color = C.orange; t.s = 1.12; await d(500)
    const left = tChild[tid].left
    if (left != null) {
      status.value = `${key} 有左子树 → 去左子树最右`; await d(300)
      let cur: number | null = left
      while (cur != null) {
        const n = pos(cur); n.color = C.orange; await d(380)
        const r = tChild[cur].right
        if (r == null) { n.color = C.green; n.s = 1.15; status.value = `✅ ${key} 的前驱 = ${vals[cur]}`; return }
        n.color = C.ghost; cur = r
      }
    } else {
      status.value = `${key} 无左子树 → 向上回溯`; await d(300)
      let cur = tid, p = parentOf(cur)
      while (p != null && tChild[p].left === cur) {
        const pn = pos(p); pn.color = C.orange; await d(380); pn.color = C.ghost
        cur = p; p = parentOf(cur)
      }
      if (p == null) { status.value = `❌ ${key} 是最小节点，无前驱`; return }
      const pn = pos(p); pn.color = C.green; pn.s = 1.15
      status.value = `✅ ${key} 的前驱 = ${vals[p]}（回溯到「父的右孩子」${vals[p]}）`
    }
  })
}

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
const successorCode = `// ===== 带 parent 指针的 TreeNode =====
class TreeNode {
    val: number
    left: TreeNode | null = null
    right: TreeNode | null = null
    parent: TreeNode | null = null   // 便于「向上回溯」
    constructor(val: number) {
        this.val = val
    }
}

// ===== 后继：中序遍历中「比 node 大的最小节点」=====
function successor(node: TreeNode): TreeNode | null {
    // ① 有右子树：后继 = 右子树的最左节点（最小值）
    if (node.right) {
        let cur = node.right
        while (cur.left) cur = cur.left   // 一路向左
        return cur
    }
    // ② 无右子树：向上回溯，找第一个「当前是父的左孩子」的父
    let cur: TreeNode = node
    let p = cur.parent
    while (p && p.right === cur) {        // 当前是父的右孩子 → 继续向上
        cur = p
        p = p.parent
    }
    return p                              // p 为 null 说明没有后继（node 是最大节点）
}

// 模拟 successor(7)，树结构见结构图：
//   7 无右子树 → 向上：
//     7 是 6 的右孩子 → 继续；6 是 3 的右孩子 → 继续；3 是 8 的左孩子 → 停
// 输出: 8（7 的后继）`

const predecessorCode = `// ===== 前驱：中序遍历中「比 node 小的最大节点」=====
function predecessor(node: TreeNode): TreeNode | null {
    // ① 有左子树：前驱 = 左子树的最右节点（最大值）
    if (node.left) {
        let cur = node.left
        while (cur.right) cur = cur.right  // 一路向右
        return cur
    }
    // ② 无左子树：向上回溯，找第一个「当前是父的右孩子」的父
    let cur: TreeNode = node
    let p = cur.parent
    while (p && p.left === cur) {          // 当前是父的左孩子 → 继续向上
        cur = p
        p = p.parent
    }
    return p                               // p 为 null 说明没有前驱（node 是最小节点）
}

// 模拟 predecessor(10)，树结构见结构图：
//   10 无左子树 → 向上：10 是 8 的右孩子 → 8 是「父的左孩子」? 否，直接停
// 输出: 8（10 的前驱）`

const noParentCode = `// ===== 无 parent 指针：从根搜索，记录「最后一次向左拐」的祖先 =====
function successorNoParent(root: TreeNode | null, node: TreeNode): TreeNode | null {
    if (node.right) {                       // 有右子树：右子树最左
        let cur = node.right
        while (cur.left) cur = cur.left
        return cur
    }
    let successor: TreeNode | null = null
    let cur = root
    while (cur) {
        if (node.val < cur.val) {           // 向左走：cur 可能是后继，先记下
            successor = cur
            cur = cur.left
        } else if (node.val > cur.val) {
            cur = cur.right                  // 向右走：不会成为后继
        } else {
            break                            // 命中 node
        }
    }
    return successor
}

// ===== 为什么删除双子要后继？=====
// 删一个有两个孩子的节点，不能直接拔掉（两个孩子没处放）。
// 用「中序后继」顶替能保证：后继比左子树全大、比右子树（除自己）全小，
// 替换后整棵树仍然是有序 BST，且结构改动最小。
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
    if (!root) return null
    if (key < root.val) root.left = deleteNode(root.left, key)
    else if (key > root.val) root.right = deleteNode(root.right, key)
    else {
        if (!root.left) return root.right            // ① 叶子 / 只有右孩子
        if (!root.right) return root.left            // ② 只有左孩子
        const succ = successorNoParent(root, root)   // ③ 双孩子：找后继
        root.val = succ!.val                          // 复制后继的值
        root.right = deleteNode(root.right, succ!.val) // 删掉原后继（至多一个右孩子）
    }
    return root
}`
</script>
