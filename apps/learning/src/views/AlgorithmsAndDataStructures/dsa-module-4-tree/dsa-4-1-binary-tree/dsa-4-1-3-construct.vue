<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🌳 从遍历序列构造二叉树</h1>
          <p class="text-sm text-slate-500 mt-1">前序/后序定「根」，中序定「左右」——递归分治把两个数组拼回一棵树</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 4-1-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：两条序列「还原」一棵树
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          给定一棵二叉树的<strong>前序遍历</strong>和<strong>中序遍历</strong>，可以<strong>唯一确定</strong>这棵树。
          核心一句话：<strong>前序第一个元素是根；在中序里定位这个根，它左边是左子树、右边是右子树</strong>——然后对左右子树<strong>递归</strong>重复即可。
        </p>

        <!-- 结构图：重建结果 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="c3-e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="16" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">输入：前序 [3,9,20,15,7] · 中序 [9,3,15,20,7] → 唯一重建出这棵树</text>

            <!-- 边 -->
            <line x1="360" y1="94" x2="180" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#c3-e)" />
            <line x1="360" y1="94" x2="540" y2="136" stroke="#94a3b8" stroke-width="2" marker-end="url(#c3-e)" />
            <line x1="540" y1="184" x2="300" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#c3-e)" />
            <line x1="540" y1="184" x2="420" y2="226" stroke="#94a3b8" stroke-width="2" marker-end="url(#c3-e)" />

            <!-- 9 的空子节点（虚线） -->
            <line x1="180" y1="184" x2="135" y2="220" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <line x1="180" y1="184" x2="225" y2="220" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="135" cy="244" r="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="135" y="244" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">null</text>
            <circle cx="225" cy="244" r="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <text x="225" y="244" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">null</text>

            <!-- 节点 -->
            <circle cx="360" cy="70" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="360" y="70" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <circle cx="180" cy="160" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="180" y="160" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <circle cx="540" cy="160" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="540" y="160" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">20</text>
            <circle cx="300" cy="250" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="300" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">15</text>
            <circle cx="420" cy="250" r="24" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="420" y="250" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>

            <text x="16" y="290" font-size="11" font-family="monospace" fill="#64748b">前序 = 根在前（3→9→20→15→7）；中序 = 根居中（左 | 根 | 右）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：由前序 + 中序唯一重建出的二叉树</figcaption>
        </figure>

        <!-- 操作示意图：取根 + 切分 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">操作：取根（橙）→ 中序切分左右（绿=左 / 蓝=右）→ 递归</h3>
        <figure>
          <svg viewBox="0 0 720 320" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="c3-s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- 前序 -->
            <text x="16" y="26" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">前序 preorder（第一个 = 根）</text>
            <rect x="16" y="40" width="44" height="36" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
            <text x="38" y="58" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="66" y="40" width="44" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="88" y="58" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">9</text>
            <rect x="116" y="40" width="44" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="138" y="58" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">20</text>
            <rect x="166" y="40" width="44" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="188" y="58" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">15</text>
            <rect x="216" y="40" width="44" height="36" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="238" y="58" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <text x="38" y="92" text-anchor="middle" font-size="11" font-family="monospace" fill="#f59e0b" font-weight="bold">根</text>

            <!-- 中序 -->
            <text x="16" y="126" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">中序 inorder（根左边 = 左子树，右边 = 右子树）</text>
            <rect x="16" y="140" width="44" height="36" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="38" y="158" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">9</text>
            <rect x="66" y="140" width="44" height="36" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
            <text x="88" y="158" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="116" y="140" width="44" height="36" rx="6" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
            <text x="138" y="158" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">15</text>
            <rect x="166" y="140" width="44" height="36" rx="6" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
            <text x="188" y="158" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">20</text>
            <rect x="216" y="140" width="44" height="36" rx="6" fill="#60a5fa" stroke="#2563eb" stroke-width="2" />
            <text x="238" y="158" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <text x="38" y="192" text-anchor="middle" font-size="11" font-family="monospace" fill="#16a34a" font-weight="bold">左</text>
            <text x="88" y="192" text-anchor="middle" font-size="11" font-family="monospace" fill="#f59e0b" font-weight="bold">根</text>
            <text x="188" y="192" text-anchor="middle" font-size="11" font-family="monospace" fill="#2563eb" font-weight="bold">右</text>

            <!-- 递归切分结果 -->
            <rect x="16" y="216" width="320" height="54" rx="8" fill="#f0fdf4" stroke="#4ade80" stroke-width="1.5" />
            <text x="176" y="238" text-anchor="middle" font-size="12" font-family="monospace" fill="#16a34a" font-weight="bold">左子树：pre=[9] in=[9]</text>
            <text x="176" y="258" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">→ 根 9（叶子，递归终止）</text>

            <rect x="360" y="216" width="344" height="54" rx="8" fill="#eff6ff" stroke="#60a5fa" stroke-width="1.5" />
            <text x="532" y="238" text-anchor="middle" font-size="12" font-family="monospace" fill="#2563eb" font-weight="bold">右子树：pre=[20,15,7] in=[15,20,7]</text>
            <text x="532" y="258" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">→ 根 20，继续递归切出 15 / 7</text>

            <text x="16" y="308" font-size="11" font-family="monospace" fill="#64748b">切分后左右子树的长度由「中序里根的位置」决定，前序据此截取对应长度的子数组</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：一次递归——前序取根 3，中序定位 3 把序列切成「左 [9] / 右 [15,20,7]」</figcaption>
        </figure>
      </section>

      <!-- 1. 为什么必须有中序 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          为什么「必须有中序」——前序 + 后序无法唯一确定
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          先回答一个面试高频追问：<strong>为什么前序 + 中序能唯一确定，但前序 + 后序不行？</strong>
          关键在「<strong>谁是左子树、谁是右子树</strong>」这道分界线。
        </p>
        <div class="bg-linear-to-r from-cyan-50 to-blue-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-2 text-center font-mono">
            前序/后序只告诉你「根在哪」，中序才告诉你「左右的分界在哪」
          </p>
          <p class="text-xs text-cyan-600 text-center">前序：根在最前；后序：根在最后。两者都无法区分剩余节点哪些属于左、哪些属于右。</p>
        </div>
        <div class="mb-4"><Code language="ts" :code="whyNeedInorderCode" title="why_need_inorder.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          重建二叉树就像 <strong>JSON.parse</strong> 的递归下降解析：你拿到一段「扁平序列」，要靠<strong>结构标记</strong>才能还原嵌套对象。
          前序 ≈ 先序读到「根 key」的顺序；中序 ≈ 提供<strong>「左括号/右括号配对」</strong>这样的边界信息。
          只有前序没有中序，就像只拿到一串 key 却没有括号配对——<strong>分不清哪个 key 是哪个对象的子节点</strong>，就会还原出多棵不同的树。<br/>
          也像 <strong>React/Vue 从 JSX 递归构建组件树</strong>：父组件先渲染（前序），而「哪些 children 归左、哪些归右」需要额外的结构信息才能确定。
          </p>
        </aside>
      </section>

      <!-- 2. 前序 + 中序：递归分治 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          前序 + 中序：递归分治（LeetCode #105）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          算法只有三步，递归地套在每个子区间上：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>取根</strong>：当前前序区间的第一个元素就是根节点</li>
          <li><strong>切分</strong>：在中序区间里定位这个根，左边 = 左子树，右边 = 右子树（两者长度由此确定）</li>
          <li><strong>递归</strong>：用「左子树长度」在前序里截出左右两部分，分别递归重建左右子树</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="buildTreeCode" title="build_tree_recursive.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键洞察：</strong>左右子树的<strong>元素集合</strong>在「前序」和「中序」里是<strong>完全相同</strong>的，只是排列顺序不同。
          所以一旦知道「左子树有 k 个节点」（由中序根的位置算出来），就能在前序里精确截出这 k 个节点。
          </p>
        </aside>
      </section>

      <!-- 3. HashMap 优化 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          HashMap 优化：O(n) 一步到位
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          上面用 <code>indexOf</code> 每次 O(n) 找根、用 <code>slice</code> 每次 O(n) 拷贝数组，整体退化到 <strong>O(n²)</strong>。
          优化两招：<strong>① 用 Map 预存「值 → 中序下标」</strong>，定位根变 O(1)；<strong>② 用下标区间 [left, right] 代替 slice</strong>，避免数组拷贝。
        </p>
        <div class="mb-4"><Code language="ts" :code="buildTreeFastCode" title="build_tree_hashmap.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">版本</th><th class="px-4 py-2 border border-slate-200 font-semibold">定位根</th><th class="px-4 py-2 border border-slate-200 font-semibold">切分数组</th><th class="px-4 py-2 border border-slate-200 font-semibold">总复杂度</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-semibold">朴素递归</td><td class="px-4 py-2 border font-mono">indexOf → O(n)</td><td class="px-4 py-2 border font-mono">slice → O(n)</td><td class="px-4 py-2 border font-mono text-red-600">O(n²)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">Map + 区间</td><td class="px-4 py-2 border font-mono text-emerald-600">Map.get → O(1)</td><td class="px-4 py-2 border font-mono text-emerald-600">下标指针 → O(1)</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n)</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>面试写重建二叉树，<strong>默认直接写 Map + 下标区间的 O(n) 版</strong>。朴素版只用于「讲清楚思路」，不是最终答案。</p>
        </aside>
      </section>

      <!-- 4. 后序 + 中序 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          后序 + 中序：只换「根的位置」（LeetCode #106）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          后序 + 中序的重建逻辑<strong>几乎一模一样</strong>，唯一区别：<strong>后序的<code>最后一个</code>元素是根</strong>（前序是第一个）。
          切分、递归、Map 优化全部照搬。
        </p>
        <div class="mb-4"><Code language="ts" :code="buildTreePostCode" title="build_tree_postorder.ts" /></div>
        <div class="bg-slate-50 rounded-lg p-4 mb-4 text-center">
          <p class="text-lg text-cyan-700 font-mono font-bold">前序首元素 = 根 · 后序末元素 = 根 · 中序负责「左右切分」</p>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>后序版最容易在<strong>下标截取</strong>上算错。左子树在后序里占据 <code>[postL .. postL+leftSize-1]</code>，右子树是 <code>[postL+leftSize .. postR-1]</code>（<strong>末位 postR 是根，要跳过</strong>）。记住：切分后「左子树长度」在两种序列里都一样，先算 <code>leftSize = mid - inL</code>，再据此切。</p>
        </aside>
      </section>

      <!-- 5. 常见错误 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          常见错误与经验法则
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 三个高频坑：</strong><br/>
          ① <strong>用前序 + 后序去重建</strong>——这是错的，无法唯一确定（除非树是严格满二叉树）。面试官问「为什么」要能答出「缺左右边界」。<br/>
          ② <strong>每次递归 slice 数组</strong>——时间 O(n²)、空间 O(n²)（每层都复制）。改用下标区间 + Map 才是 O(n)。<br/>
          ③ <strong>左子树长度算错</strong>——正确的 <code>leftSize = mid - inL</code>（不是 <code>mid - inL + 1</code>，也不是 <code>mid</code>）。前序左子树范围是 <code>[preL+1, preL+leftSize]</code>，右子树从 <code>preL+leftSize+1</code> 开始。<br/>
          ④ <strong>忘判空</strong>——当 <code>preL &gt; preR</code>（或空数组）必须返回 null，否则会无限递归/下标越界。
          </p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>凡是「序列 → 树」的重建题，先问自己：<strong>根在哪里？（前序首 / 后序末）左右边界在哪里？（中序）</strong>。这两点锁定后，剩下的就是递归切分 + 下标计算。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：取根 → 切分 → 递归重建
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          给定 <code>preorder=[3,9,20,15,7]</code>、<code>inorder=[9,3,15,20,7]</code>，橙色 = 当前正在构建的根，绿色 = 刚挂上的新节点，青色 = 已完成。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ dynCount }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🧱 进度: {{ step }}/5</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doNext" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm">▶️ 下一步</button>
          <button @mousedown="doRebuild" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">🔁 重建</button>
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>核心口诀：</strong>前序首元素（或后序末元素）是根，中序里「根左边 = 左子树、右边 = 右子树」</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>为什么必须有中序：</strong>前序/后序只给「根的位置」，中序才给「左右的分界」——前序 + 后序无法唯一确定</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>递归分治：</strong>取根 → 中序切分 → 按 leftSize 截取前后序子数组 → 递归</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>优化：</strong>Map 预存「值→中序下标」+ 下标区间代替 slice，O(n²) → O(n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>后序版：</strong>只把「根」从首元素换成末元素，其余切分逻辑完全相同</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-1-binary-tree/dsa-4-1-2-properties" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：二叉树性质</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-4-tree/dsa-4-1-binary-tree/dsa-4-1-4-lca" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：最近公共祖先 LCA →</RouterLink>
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
  { id: "sec-1", name: "为什么必须有中序" },
  { id: "sec-2", name: "前序+中序递归分治" },
  { id: "sec-3", name: "HashMap 优化 O(n)" },
  { id: "sec-4", name: "后序+中序" },
  { id: "sec-5", name: "常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 重建动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const R = 22, LEVEL_H = 90, TOP = 50
const H = ref(320), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref(''), step = ref(0)
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

interface TNode { id:number; val:number; x:number; y:number; color:string; s?:number }
const tNodes = reactive<TNode[]>([])
const tEdges = reactive<{a:number;b:number}[]>([])
const col = reactive<Record<number,string>>({})

// 完整目标树（前序 [3,9,20,15,7] + 中序 [9,3,15,20,7] 的唯一结果）
const fullChild: Record<number,{left:number|null;right:number|null}> = {
  1:{left:2,right:3}, 2:{left:null,right:null}, 3:{left:4,right:5}, 4:{left:null,right:null}, 5:{left:null,right:null},
}
const fullVals: Record<number,number> = { 1:3, 2:9, 3:20, 4:15, 5:7 }
const buildOrder = [1,2,3,4,5]
const buildMsg: Record<number,string> = {
  1: '取根 3（pre[0]）；中序切分 [9] | 3 | [15,20,7]',
  2: '左子树 pre=[9] in=[9] → 根 9（叶子）',
  3: '右子树 pre=[20,15,7] in=[15,20,7] → 根 20',
  4: '20 左子树 pre=[15] in=[15] → 根 15',
  5: '20 右子树 pre=[7] in=[7] → 根 7',
}
const posMap = reactive<Record<number,{x:number;y:number}>>({})
const revealed = reactive<number[]>([])

const dynCount = computed(() => tNodes.length)

function layoutFull() {
  Object.keys(posMap).forEach(k => delete posMap[k])
  let level = [1], y = TOP
  while (level.length) {
    const gap = W.value / (level.length + 1)
    level.forEach((id, i) => { posMap[id] = { x: gap*(i+1), y } })
    const next:number[] = []
    level.forEach(id => { const c = fullChild[id] || {}; if (c.left != null) next.push(c.left); if (c.right != null) next.push(c.right) })
    level = next; y += LEVEL_H
  }
}

function renderVisible() {
  tNodes.length = 0; tEdges.length = 0
  revealed.forEach(id => {
    const p = posMap[id]
    tNodes.push({ id, val: fullVals[id], x: p.x, y: p.y, color: col[id] || C.cyan, s: 1 })
  })
  revealed.forEach(id => {
    const c = fullChild[id] || {}
    if (c.left != null && revealed.includes(c.left)) tEdges.push({ a:id, b:c.left })
    if (c.right != null && revealed.includes(c.right)) tEdges.push({ a:id, b:c.right })
  })
}

function pos(id:number): TNode { return tNodes.find(n => n.id === id)! }
function edgeCfg(e:{a:number;b:number}) { const pa = pos(e.a), pb = pos(e.b); return { points:[pa.x, pa.y+R, pb.x, pb.y-R], stroke:'#94a3b8', strokeWidth:2 } }
function circleCfg(n:any) { const s = n.s ?? 1; const stroke = n.color===C.orange?'#d97706':n.color===C.green?'#16a34a':'#0891b2'; return { x:n.x, y:n.y, radius:R*s, fill:n.color, stroke, strokeWidth:n.color===C.orange?3:1.5, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 } }
function tTextCfg(n:any) { const s = n.s ?? 1; return { x:n.x-R, y:n.y-R, width:R*2, height:R*2, text:String(n.val), fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle', scale:{x:s,y:s} } }

function doReset() {
  revealed.length = 0; step.value = 0
  Object.keys(col).forEach(k => delete col[k])
  renderVisible()
  status.value = '点「下一步」逐步重建，或「重建」一键播放'
  opLabel.value = ''
}

async function revealStep(id:number, msg:string, dur = 480) {
  revealed.push(id); col[id] = C.orange; renderVisible()
  status.value = msg; await d(dur)
  col[id] = C.green; renderVisible(); await d(280)
  col[id] = C.cyan; renderVisible()
}

async function doNext() {
  if (busy.value) return
  if (step.value >= buildOrder.length) { status.value = '✅ 重建完成（前序+中序唯一确定）'; return }
  busy.value = true; opLabel.value = '分治 O(n)'
  await revealStep(buildOrder[step.value], `Step ${step.value+1}/5：${buildMsg[buildOrder[step.value]]}`)
  step.value++
  busy.value = false; opLabel.value = ''
  if (step.value >= buildOrder.length) status.value = '✅ 重建完成（前序+中序唯一确定）'
}

async function doRebuild() {
  if (busy.value) return
  busy.value = true; opLabel.value = '分治 O(n)'
  doReset()
  status.value = '重建：逐步取根 → 切分 → 递归'
  await d(400)
  for (let i = 0; i < buildOrder.length; i++) {
    await revealStep(buildOrder[i], `Step ${i+1}/5：${buildMsg[buildOrder[i]]}`)
    step.value = i + 1
  }
  busy.value = false; opLabel.value = ''
  status.value = '✅ 重建完成（前序+中序唯一确定）'
}

let ro: ResizeObserver|null = null
onMounted(() => {
  layoutFull(); doReset()
  if (box.value) {
    W.value = box.value.clientWidth; layoutFull(); renderVisible()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layoutFull(); renderVisible() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const whyNeedInorderCode = `// ===== 为什么「必须有中序」？前序 + 后序无法唯一确定 =====
// 反例：两棵不同的树，拥有相同的前序和后序
//
//   树 A：        树 B：
//      1             1
//     /               \\
//    2                 2
//
// preorder  A = [1, 2]，postorder A = [2, 1]
// preorder  B = [1, 2]，postorder B = [2, 1]   ← 完全一样！

// 原因：
// 前序 = 根 + 左子树 + 右子树（根在最前）
// 后序 = 左子树 + 右子树 + 根（根在最后）
// 两者都只知道「根是谁」，却无法区分「剩余节点哪些在左、哪些在右」。
// 只有中序能给出「根左边 = 左子树、根右边 = 右子树」的明确分界。

// 结论：
//   前序 + 中序  → 唯一确定 ✅
//   后序 + 中序  → 唯一确定 ✅
//   前序 + 后序  → 不唯一 ❌（除非树是严格满二叉树，每个节点要么 0 要么 2 个孩子）

// 面试追问：那「前序 + 后序」是不是完全没用？
// 不是——它虽不能唯一确定树的形状，但能确定「哪些节点在一条链上」，
// 在某些场景（如括号嵌套、嵌套列表扁平化）仍然有用。`

const buildTreeCode = `// ===== 前序 + 中序 重建二叉树（LeetCode #105）=====
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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (preorder.length === 0) return null           // 空区间 → 空树

    const rootVal = preorder[0]                      // ① 前序第一个 = 根
    const root = new TreeNode(rootVal)

    const mid = inorder.indexOf(rootVal)             // ② 中序定位根（切分点）
    const leftIn = inorder.slice(0, mid)             //    根左边 → 左子树中序
    const rightIn = inorder.slice(mid + 1)           //    根右边 → 右子树中序

    const leftPre = preorder.slice(1, 1 + leftIn.length)   // ③ 前序左子树（长度与中序一致）
    const rightPre = preorder.slice(1 + leftIn.length)     //    前序右子树

    root.left = buildTree(leftPre, leftIn)           // ④ 递归重建左右
    root.right = buildTree(rightPre, rightIn)
    return root
}

// 手动模拟 buildTree([3,9,20,15,7], [9,3,15,20,7])：
// 根 = 3；中序 3 在 index=1 → 左 in=[9] 右 in=[15,20,7]
//   左子树 pre=[9]  in=[9]        → 根 9（叶子）
//   右子树 pre=[20,15,7] in=[15,20,7] → 根 20
//     左 pre=[15] in=[15] → 根 15（叶子）
//     右 pre=[7]  in=[7]  → 根 7（叶子）
//
// 结果：
//       3
//      / \\
//     9   20
//        /  \\
//       15   7
//
// 复杂度：每个节点访问一次 O(n)，但 indexOf + slice 会退化为 O(n²)（见下一节优化）`

const buildTreeFastCode = `// ===== HashMap 优化：O(n) 一步到位 =====
// 两个优化点：
//   ① Map 预存「值 → 中序下标」，定位切分点 O(1)
//   ② 用下标区间 [L..R] 代替 slice，避免 O(n) 的数组拷贝
function buildTreeFast(preorder: number[], inorder: number[]): TreeNode | null {
    // 预存中序「值 → 下标」
    const idxMap = new Map<number, number>()
    inorder.forEach((v, i) => idxMap.set(v, i))

    // [preL..preR] 当前前序区间，[inL..inR] 当前中序区间
    function build(preL: number, preR: number, inL: number, inR: number): TreeNode | null {
        if (preL > preR) return null                  // 空区间

        const rootVal = preorder[preL]
        const root = new TreeNode(rootVal)
        const mid = idxMap.get(rootVal)!              // O(1) 定位中序切分点

        const leftSize = mid - inL                    // ★ 左子树节点数
        root.left  = build(preL + 1, preL + leftSize, inL, mid - 1)
        root.right = build(preL + leftSize + 1, preR, mid + 1, inR)
        return root
    }

    return build(0, preorder.length - 1, 0, inorder.length - 1)
}

// 复杂度：每个节点访问一次 O(n)；空间 O(n)（Map + 递归栈）
// 下标关系（以根在 preL 为例）：
//   左子树前序：[preL+1 .. preL+leftSize]     右子树前序：[preL+leftSize+1 .. preR]
//   左子树中序：[inL .. mid-1]                右子树中序：[mid+1 .. inR]`

const buildTreePostCode = `// ===== 后序 + 中序 重建二叉树（LeetCode #106）=====
// 与前序版唯一区别：后序「最后一个」元素是根（前序是第一个）
function buildTreePost(postorder: number[], inorder: number[]): TreeNode | null {
    const idxMap = new Map<number, number>()
    inorder.forEach((v, i) => idxMap.set(v, i))

    function build(postL: number, postR: number, inL: number, inR: number): TreeNode | null {
        if (postL > postR) return null

        const rootVal = postorder[postR]             // ★ 后序最后一个 = 根
        const root = new TreeNode(rootVal)
        const mid = idxMap.get(rootVal)!

        const leftSize = mid - inL
        // 后序：左子树 [postL .. postL+leftSize-1]，右子树 [postL+leftSize .. postR-1]（末位是根）
        root.left  = build(postL, postL + leftSize - 1, inL, mid - 1)
        root.right = build(postL + leftSize, postR - 1, mid + 1, inR)
        return root
    }
    return build(0, postorder.length - 1, 0, inorder.length - 1)
}

// 后序 [9,15,7,20,3] + 中序 [9,3,15,20,7] → 得到与前面完全相同的树
// 口诀：前序首元素是根、后序末元素是根；中序负责「左右切分」`
</script>
