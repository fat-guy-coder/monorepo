<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌲 二叉树遍历：前 / 中 / 后 / 层序</h1>
          <p class="text-sm text-slate-500 mt-1">递归 + 迭代栈 + 队列 —— 四种顺序一次吃透</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-1-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：7 节点二叉树 + 四种遍历顺序
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          一棵二叉树由<strong>节点</strong>和<strong>边</strong>组成，每个节点最多两个子节点（左 / 右）。遍历就是按照某种约定"访问每个节点恰好一次"。
          "访问顺序"不同，得到的序列就不同——这正是<strong>前序 / 中序 / 后序 / 层序</strong>四种遍历的核心区别。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 340" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="tr1-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="360" y="22" text-anchor="middle" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">一棵 7 节点的完全二叉树（高度 = 3）</text>

            <!-- 边 -->
            <line x1="360" y1="84" x2="220" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#tr1-a)" />
            <line x1="360" y1="84" x2="500" y2="126" stroke="#94a3b8" stroke-width="2" marker-end="url(#tr1-a)" />
            <line x1="220" y1="174" x2="130" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#tr1-a)" />
            <line x1="220" y1="174" x2="300" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#tr1-a)" />
            <line x1="500" y1="174" x2="420" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#tr1-a)" />
            <line x1="500" y1="174" x2="590" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#tr1-a)" />

            <!-- 节点 -->
            <circle cx="360" cy="60" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="60" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">1</text>
            <circle cx="220" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="220" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <circle cx="500" cy="150" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="500" y="150" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <circle cx="130" cy="250" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="130" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">4</text>
            <circle cx="300" cy="250" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="300" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <circle cx="420" cy="250" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="420" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">6</text>
            <circle cx="590" cy="250" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="590" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>

            <!-- 四种遍历顺序 -->
            <text x="16" y="302" font-size="12" font-family="monospace" fill="#0891b2" font-weight="bold">前序（根→左→右）:</text>
            <text x="220" y="302" font-size="12" font-family="monospace" fill="#1e293b">1 → 2 → 4 → 5 → 3 → 6 → 7</text>
            <text x="16" y="322" font-size="12" font-family="monospace" fill="#0891b2" font-weight="bold">中序（左→根→右）:</text>
            <text x="220" y="322" font-size="12" font-family="monospace" fill="#1e293b">4 → 2 → 5 → 1 → 6 → 3 → 7</text>
            <text x="430" y="302" font-size="12" font-family="monospace" fill="#0891b2" font-weight="bold">后序（左→右→根）:</text>
            <text x="614" y="302" font-size="12" font-family="monospace" fill="#1e293b">4 → 5 → 2 → 6 → 7 → 3 → 1</text>
            <text x="430" y="322" font-size="12" font-family="monospace" fill="#0891b2" font-weight="bold">层序（逐层从左到右）:</text>
            <text x="614" y="322" font-size="12" font-family="monospace" fill="#1e293b">1 → 2 → 3 → 4 → 5 → 6 → 7</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：同一棵树，四种遍历产生四种不同的访问序列 —— 顺序的本质是"根"在左、右子树之间出现的时机</figcaption>
        </figure>
      </section>

      <!-- 1. 基本概念 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          二叉树基本概念 —— 遍历前先认识术语
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          二叉树（Binary Tree）是每个节点<strong>最多有两个子节点</strong>的树，分别叫<strong>左孩子</strong>和<strong>右孩子</strong>。
          下面这些术语贯穿后续所有章节：
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">▸</span><span><strong>根 (root)</strong>：最顶层的节点，整棵树的入口</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">▸</span><span><strong>叶 (leaf)</strong>：没有孩子的节点（图 1 里的 4、5、6、7）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">▸</span><span><strong>子树 (subtree)</strong>：任意节点 + 它的所有后代，又构成一棵树</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">▸</span><span><strong>高度 (height)</strong>：从根到最深叶的边数（图 1 高度 = 2，层数 = 3）</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">▸</span><span><strong>深度 (depth)</strong>：从根到某节点的边数（根的深度 = 0）</span></li>
          </ul>
        </div>
        <div class="mb-4"><Code language="ts" :code="treeNodeCode" title="tree_node.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          二叉树的节点就像 <strong>DOM 节点</strong>——每个 DOM 元素有一个 <code>parentNode</code>、若干 <code>childNodes</code>。
          二叉树限制每个节点最多 2 个子节点，就像 Vue 的 <code>&lt;template&gt;</code> 里，每个节点的 <code>left</code>/<code>right</code> 对应"第一个孩子 / 第二个孩子"。<br/>
          而"遍历"就是 <code>document.querySelectorAll('*')</code> 的访问顺序——是先访问父元素还是先访问子元素，决定了你拿到的是哪种序列。
          </p>
        </aside>
      </section>

      <!-- 2. 前序 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          前序遍历（Preorder）—— 根 → 左 → 右
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          前序遍历的规则：<strong>先访问根，再遍历左子树，最后遍历右子树</strong>。根在"最前面"，所以叫"前序"。
          它天然适合"复制一棵树"——因为你先创建根，再递归创建左右子树，序列化的结构信息是完整的。
        </p>
        <div class="mb-4"><Code language="ts" :code="preorderCode" title="preorder.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 前序的直觉：</strong>"遇到谁就先把谁记下来"——从上往下、从左往右扫一遍，路过根就输出。迭代版用栈，<strong>先压右孩子、再压左孩子</strong>（LIFO 让左先弹出）。</p>
        </aside>
      </section>

      <!-- 3. 中序 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          中序遍历（Inorder）—— 左 → 根 → 右
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          中序遍历的规则：<strong>先遍历左子树，再访问根，最后遍历右子树</strong>。根夹在中间，所以叫"中序"。
          它的特殊价值：对<strong>二叉搜索树 (BST)</strong> 做中序遍历，会得到<strong>升序序列</strong>——这是很多 BST 题目的关键（模块 4-2 详解）。
        </p>
        <div class="mb-4"><Code language="ts" :code="inorderCode" title="inorder.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 中序的直觉：</strong>"先一路钻到最左，再回头处理，处理完再往右钻"。迭代版口诀：<strong>一路向左 → 无左则弹 → 弹完向右</strong>。</p>
        </aside>
      </section>

      <!-- 4. 后序 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          后序遍历（Postorder）—— 左 → 右 → 根
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          后序遍历的规则：<strong>先遍历左子树，再遍历右子树，最后访问根</strong>。根在"最后面"，所以叫"后序"。
          它天然适合<strong>自底向上</strong>的计算——比如删除一棵树（先删孩子再删父）、计算子树大小、表达式树求值。
        </p>
        <div class="mb-4"><Code language="ts" :code="postorderCode" title="postorder.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 后序的直觉：</strong>"把左右都处理干净了，才轮到自己"。迭代版推荐<strong>反转前序法</strong>——前序改"根→右→左"，结果 reverse 即得"左→右→根"。</p>
        </aside>
      </section>

      <!-- 5. 层序 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          层序遍历（Level-order）—— 队列 BFS
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          层序遍历<strong>逐层、从左到右</strong>访问节点。前三种遍历靠<strong>栈</strong>（递归/显式），层序靠<strong>队列</strong>：出队一个节点访问它，再把它的左右孩子入队。
          它是<strong>广度优先搜索 (BFS)</strong> 在树上的体现，适合"按层处理"（每层右视图、层平均值等）。
        </p>
        <div class="mb-4"><Code language="ts" :code="levelorderCode" title="levelorder.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          层序遍历就像 <strong>DOM 的广度优先遍历</strong>——先访问根元素，再访问它的所有直接子元素，再访问所有孙元素。
          前端做"按层级渲染菜单"、"计算树的宽度"时，用的就是这种"一层层铺开"的队列思维，等价于 React 早期 <code>ReactDOM.render</code> 同步遍历同级节点。
          </p>
        </aside>
      </section>

      <!-- 6. Morris + 复杂度 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">6</span>
          Morris 遍历 + 复杂度对比
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong>Morris 遍历</strong>是一种<strong>O(1) 额外空间</strong>的遍历技巧：它利用叶子节点的空 <code>right</code> 指针，临时"搭桥"指向前驱，用完再拆掉，
          从而不借助栈/递归就完成中序（也可扩展到前序）。代价是<strong>会临时修改树结构</strong>，且代码复杂，面试一般不要求手写，但提到它是加分项。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">遍历方式</th><th class="px-4 py-2 border border-slate-200 font-semibold">数据结构</th><th class="px-4 py-2 border border-slate-200 font-semibold">时间复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold">空间复杂度</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">前 / 中 / 后序（递归）</td><td class="px-4 py-2 border">系统调用栈</td><td class="px-4 py-2 border font-mono">O(n)</td><td class="px-4 py-2 border font-mono">O(h) 平均 / O(n) 最坏</td></tr>
              <tr><td class="px-4 py-2 border">前 / 中 / 后序（迭代）</td><td class="px-4 py-2 border">显式栈</td><td class="px-4 py-2 border font-mono">O(n)</td><td class="px-4 py-2 border font-mono">O(h) 平均 / O(n) 最坏</td></tr>
              <tr><td class="px-4 py-2 border">层序</td><td class="px-4 py-2 border">队列</td><td class="px-4 py-2 border font-mono">O(n)</td><td class="px-4 py-2 border font-mono">O(w)（w = 最大层宽）</td></tr>
              <tr><td class="px-4 py-2 border">Morris 遍历</td><td class="px-4 py-2 border">无（改指针）</td><td class="px-4 py-2 border font-mono">O(n)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(1)</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见陷阱：</strong><br/>
          ① 退化成"链表"的树，递归深度 = n，会直接 <code>Maximum call stack size exceeded</code>——生产环境深树务必用迭代。<br/>
          ② 层序队列空间是 O(w)，宽树（如完美二叉树的最后一层 w≈n/2）内存开销大。<br/>
          ③ Morris 遍历会改动树，遍历途中<strong>不能并发读取</strong>、不能用在只读/共享结构上。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：四种遍历顺序
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点击按钮观察四种遍历。注意<strong>变色的时机</strong>：前序 = 第一次遇到就访问；中序 = 左子树返回后才访问；后序 = 左右子树都返回后才访问；层序 = 出队时访问。
          <span class="text-amber-600 font-medium">橙色 = 正在访问</span>，<span class="text-emerald-600 font-medium">绿色 = 已访问</span>。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ tNodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🌳 高度: 2</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doPreorder" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">前序 根→左→右</button>
          <button @mousedown="doInorder" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">中序 左→根→右</button>
          <button @mousedown="doPostorder" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">后序 左→右→根</button>
          <button @mousedown="doLevelorder" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">层序 逐层</button>
          <button @mousedown="resetTree" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
          <span class="text-xs text-slate-500 ml-auto bg-slate-100 px-2 py-1 rounded-full min-w-[120px] text-center font-mono">[{{ visited.join(' ') }}]</span>
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
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>前序（根→左→右）</strong>：先根后孩子，适合复制/序列化树</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>中序（左→根→右）</strong>：BST 中序得升序，面试最高频</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>后序（左→右→根）</strong>：自底向上，适合删除/求值</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>层序</strong>：队列 BFS，按层处理</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>本质</strong>：三种 DFS 的区别只在"根"访问的时机；迭代就是显式栈/队列</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Morris</strong>：O(1) 空间但改结构，面试提一句即可</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-3-applications/dsa-3-3-4-bloom" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：布隆过滤器</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-1-binary-tree/dsa-4-1-2-properties" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：二叉树性质 →</RouterLink>
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
  { id: "sec-1", name: "基本概念" },
  { id: "sec-2", name: "前序遍历" },
  { id: "sec-3", name: "中序遍历" },
  { id: "sec-4", name: "后序遍历" },
  { id: "sec-5", name: "层序遍历" },
  { id: "sec-6", name: "Morris + 复杂度" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

// ===== 🎬 树遍历动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const R = 24, LEVEL_H = 92, TOP = 44
const H = ref(320), W = ref(700)
interface TNode { id: number; val: number | string; x: number; y: number; color: string }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{ a: number; b: number }[]>([])
const tChild = reactive<Record<number, { left: number | null; right: number | null }>>({})
const tCurr = ref<number | null>(null)
const visited = reactive<number[]>([])
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
  tCurr.value = null
  visited.length = 0
  status.value = ''
}
async function mark(id: number, note: string, out: number[]) {
  const n = pos(id)
  n.color = C.orange; tCurr.value = id; status.value = note; await d(420)
  out.push(id); visited.push(id); n.color = C.green; await d(140)
}

async function doPreorder() {
  if (busy.value) return
  resetTree(); busy.value = true
  const out: number[] = []
  async function walk(id: number) {
    await mark(id, `前序访问 ${id}（第一次遇到根即访问）`, out)
    const { left, right } = tChild[id] || {}
    if (left != null) await walk(left)
    if (right != null) await walk(right)
  }
  await walk(rootId)
  status.value = `前序: ${out.join(' → ')}`; await d(600)
  busy.value = false
}

async function doInorder() {
  if (busy.value) return
  resetTree(); busy.value = true
  const out: number[] = []
  async function walk(id: number) {
    const { left, right } = tChild[id] || {}
    if (left != null) await walk(left)
    await mark(id, `中序访问 ${id}（左子树返回后才访问）`, out)
    if (right != null) await walk(right)
  }
  await walk(rootId)
  status.value = `中序: ${out.join(' → ')}`; await d(600)
  busy.value = false
}

async function doPostorder() {
  if (busy.value) return
  resetTree(); busy.value = true
  const out: number[] = []
  async function walk(id: number) {
    const { left, right } = tChild[id] || {}
    if (left != null) await walk(left)
    if (right != null) await walk(right)
    await mark(id, `后序访问 ${id}（左右子树都返回后才访问）`, out)
  }
  await walk(rootId)
  status.value = `后序: ${out.join(' → ')}`; await d(600)
  busy.value = false
}

async function doLevelorder() {
  if (busy.value) return
  resetTree(); busy.value = true
  const out: number[] = []
  const q = [rootId]
  while (q.length) {
    const id = q.shift()!
    await mark(id, `层序出队访问 ${id}`, out)
    const { left, right } = tChild[id] || {}
    if (left != null) q.push(left)
    if (right != null) q.push(right)
  }
  status.value = `层序: ${out.join(' → ')}`; await d(600)
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
const treeNodeCode = `// 二叉树节点定义（TypeScript）
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null

    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.left = (left === undefined ? null : left)
        this.right = (right === undefined ? null : right)
    }
}

// 构造图 1 的树
//        1
//       / \\
//      2   3
//     / \\ / \\
//    4  5 6  7
const root = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3, new TreeNode(6), new TreeNode(7)),
)`

const preorderCode = `// ===== 前序遍历：根 → 左 → 右 =====
// 输入 root，输出 [1,2,4,5,3,6,7]

// 递归版（3 行核心）
function preorderRecursive(root: TreeNode | null): number[] {
    const res: number[] = []
    function dfs(node: TreeNode | null) {
        if (!node) return
        res.push(node.val)      // ① 先访问根
        dfs(node.left)          // ② 再左子树
        dfs(node.right)         // ③ 再右子树
    }
    dfs(root)
    return res
}

// 迭代版（栈）
function preorderIterative(root: TreeNode | null): number[] {
    if (!root) return []
    const res: number[] = []
    const stack: TreeNode[] = [root]
    while (stack.length > 0) {
        const node = stack.pop()!
        res.push(node.val)                  // 弹栈即访问
        if (node.right) stack.push(node.right)  // ★ 先压右
        if (node.left)  stack.push(node.left)   // ★ 再压左 → 左先弹出
    }
    return res
}

// 应用：序列化一棵树（前序天然携带结构信息）
function serialize(root: TreeNode | null): string {
    if (!root) return 'null'
    return \`\${root.val},\${serialize(root.left)},\${serialize(root.right)}\`
}`

const inorderCode = `// ===== 中序遍历：左 → 根 → 右 =====
// 输出 [4,2,5,1,6,3,7]

function inorderRecursive(root: TreeNode | null): number[] {
    const res: number[] = []
    function dfs(node: TreeNode | null) {
        if (!node) return
        dfs(node.left)          // ① 先左子树
        res.push(node.val)      // ② 再访问根
        dfs(node.right)         // ③ 再右子树
    }
    dfs(root)
    return res
}

// 迭代版：一路向左
function inorderIterative(root: TreeNode | null): number[] {
    const res: number[] = []
    const stack: TreeNode[] = []
    let curr: TreeNode | null = root
    while (curr || stack.length > 0) {
        while (curr) {          // 一路向左，全压栈
            stack.push(curr)
            curr = curr.left
        }
        curr = stack.pop()!     // 无左可走 → 弹栈访问
        res.push(curr.val)
        curr = curr.right       // 转向右子树
    }
    return res
}

// 价值：对二叉搜索树(BST)中序遍历 → 得到升序序列
// 这就是"验证 BST"（LeetCode 98）的经典解法之一`

const postorderCode = `// ===== 后序遍历：左 → 右 → 根 =====
// 输出 [4,5,2,6,7,3,1]

function postorderRecursive(root: TreeNode | null): number[] {
    const res: number[] = []
    function dfs(node: TreeNode | null) {
        if (!node) return
        dfs(node.left)          // ① 先左
        dfs(node.right)         // ② 再右
        res.push(node.val)      // ③ 最后访问根
    }
    dfs(root)
    return res
}

// 迭代版：反转前序法（推荐，不易写错）
function postorderIterative(root: TreeNode | null): number[] {
    if (!root) return []
    const res: number[] = []
    const stack: TreeNode[] = [root]
    while (stack.length > 0) {
        const node = stack.pop()!
        res.push(node.val)
        if (node.left)  stack.push(node.left)   // ★ 先压左
        if (node.right) stack.push(node.right)  // ★ 再压右 → 右先弹出
    }
    res.reverse()   // "根→右→左" 反转 → "左→右→根"
    return res
}

// 应用：自底向上计算 —— 求子树节点总数
function subtreeSize(root: TreeNode | null): Map<TreeNode, number> {
    const size = new Map<TreeNode, number>()
    function dfs(node: TreeNode | null): number {
        if (!node) return 0
        const s = dfs(node.left) + dfs(node.right) + 1  // 后序：孩子先算好
        size.set(node, s)
        return s
    }
    dfs(root)
    return size
}`

const levelorderCode = `// ===== 层序遍历：逐层从左到右 =====
// 输出 [1,2,3,4,5,6,7]

function levelOrder(root: TreeNode | null): number[] {
    if (!root) return []
    const res: number[] = []
    const queue: TreeNode[] = [root]
    while (queue.length > 0) {
        const node = queue.shift()!   // 出队
        res.push(node.val)            // 访问
        if (node.left)  queue.push(node.left)   // 左孩子入队
        if (node.right) queue.push(node.right)  // 右孩子入队
    }
    return res
}

// 进阶：按层分组（每层一个数组）—— 面试高频
function levelOrderGrouped(root: TreeNode | null): number[][] {
    if (!root) return []
    const res: number[][] = []
    const queue: TreeNode[] = [root]
    while (queue.length > 0) {
        const levelSize = queue.length      // 当前层节点数
        const level: number[] = []
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!
            level.push(node.val)
            if (node.left)  queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
        res.push(level)
    }
    return res   // [[1],[2,3],[4,5,6,7]]
}`
</script>
