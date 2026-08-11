<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">⏩ 跳表原理：多层索引加速查找</h1>
          <p class="text-sm text-slate-500 mt-1">链表 + 二分 = 跳表 —— O(log n) 查找的随机化数据结构</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-5-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 为什么需要跳表 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要跳表？
        </h2>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          跳表的多层索引就像文章的<strong>多级目录（TOC）</strong>——H1 是大章节标题，H2 是子章节，正文是原始链表。<br/>
          要找某个小节时，你不会从第一行逐字读，而是先扫 H1 定位大章节，再扫 H2 定位小节，最后在正文里找到具体内容。<br/>
          跳表就是这个思路：高层索引做"粗定位"，底层做"精确定位"。
          </p>
        </aside>

        <p class="text-slate-600 mb-4 leading-relaxed">
          假设你有一个<strong>有序链表</strong>，里面存了 100 万个排好序的数字。如果要查找某个值，你只能从头遍历——平均走 50 万步，最坏 100 万步。<strong>时间复杂度 O(n)</strong>。
        </p>

        <p class="text-slate-600 mb-4 leading-relaxed">
          有序数组可以用<strong>二分查找 O(log n)</strong>，但数组插入/删除需要移动元素（O(n)）。能不能在链表上也做到类似二分的查找效率，同时保持插入/删除的 O(1) 指针操作？<strong>跳表（Skip List）</strong>就是答案。
        </p>

        <div class="mb-4">
          <Code language="text" :code="problemCode" title="有序链表查找的困境" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 核心思想：</strong>给链表"加层"——像给马路修了高架桥，高架桥上的车可以跳过很多路口，直达目标附近再下桥。这就是"跳"表的含义。</p>
        </aside>
      </section>

      <!-- 内存存储 -->
      <section id="sec-mem" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">💾</span>跳表在内存中怎么存？</h2>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">
          跳表节点与链表节点不同——<strong>每个节点有多个 next 指针</strong>（forward 数组），具体数量由 randomLevel() 随机决定。这就是空间换时间。
        </p>
        <div class="mb-3"><Code language="text" :code="skipMemCode" title="跳表节点内存布局" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-2">空间复杂度分析</h3>
        <p class="text-slate-600 text-sm mb-3">
          每个节点有随机层数（概率 p，通常 0.25 或 0.5）。第 k 层的期望节点数 = n × pᵏ。<br/>
          所有层的期望指针总数 = n + n·p + n·p² + ... = <strong>n/(1-p)</strong>。<br/>
          当 p=0.5 → 期望 ~2n 个指针 → <strong>O(n)</strong> 空间。当 p=0.25 → ~1.33n → 更省但更慢。
        </p>
        <div class="overflow-x-auto mb-3">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">p 值</th><th class="px-4 py-2 border font-semibold">期望指针数</th><th class="px-4 py-2 border font-semibold">vs 平衡树</th><th class="px-4 py-2 border font-semibold">Redis 选择</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">0.5</td><td class="px-4 py-2 border">~2n</td><td class="px-4 py-2 border">红黑树：3 指针/节点（left/right/parent）</td><td class="px-4 py-2 border">❌ 指针太多</td></tr>
              <tr><td class="px-4 py-2 border font-mono">0.25</td><td class="px-4 py-2 border">~1.33n</td><td class="px-4 py-2 border">红黑树：3n 指针</td><td class="px-4 py-2 border text-emerald-600">✅ Redis 使用</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 对比：</strong>红黑树每节点固定 3 个指针（left/right/parent）= 3n。跳表 p=0.25 时 ~1.33n 指针，<strong>更省空间</strong>。且跳表不需要存储颜色位和 parent 指针，节点结构更简洁。</p>
        </aside>
      </section>

      <!-- 多层索引概念 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          多层索引：快车道与慢车道
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          跳表的核心结构是在原始有序链表之上建立<strong>多层索引</strong>。每一层索引都是下一层的"快车道"——索引层中的节点数约为下一层的一半（随机决定），搜索时从最高层开始，逐层下降，最后在底层精确定位。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">跳表的层状结构（ASCII 示意图）</h3>
        <div class="mb-4">
          <Code language="text" :code="asciiArt" :hiddenToolbar="true" />
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">
          上图展示了一个包含 7 个元素（3, 7, 11, 19, 22, 29, 37）的跳表，共 4 层：
        </p>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Level 3（最高层，快车道）：</strong>只有头节点和 19，非常稀疏——一次跳跃跨过半个链表</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Level 2：</strong>头 → 7 → 19 → 29 → 37，更密一些——作为"中速车道"</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Level 1：</strong>头 → 3 → 7 → 11 → 19 → 22 → 29 → 37，即原始有序链表——"慢车道"</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Level 0：</strong>通常指底层数据节点本身（具体实现可能从 Level 0 或 Level 1 开始编号）</span></li>
        </ul>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          这就像前端路由的<strong>嵌套结构</strong>——<code class="bg-purple-100 px-1 rounded text-xs font-mono">/products/electronics/laptops/thinkpad</code>。<br/>
          先匹配 <code class="bg-purple-100 px-1 rounded text-xs font-mono">/products</code>（Level 3），再 <code class="bg-purple-100 px-1 rounded text-xs font-mono">/electronics</code>（Level 2），最后定位到具体页面（Level 1）。每深入一层，匹配范围就更精确。
          </p>
        </aside>
      </section>

      <!-- 查找算法 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          查找算法：自上而下，从左到右
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          跳表的查找遵循一个简单的规则：<strong>从最高层开始，能往右走就往右走，不能走了就下降一层，直到在底层找到目标或确认不存在</strong>。这就像开车去一个地方：先上高速（高层）开到离目的地最近的出口，然后换普通公路（下层）继续靠近。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">查找 22 的完整演示</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">以上面那个跳表为例，查找 22 的过程：</p>
        <ol class="list-decimal list-inside space-y-2 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>Level 3：</strong>从头节点出发，右边是 19。19 &lt; 22，向右移动到 19。19 的右边是 nil，无路可走，<strong>下降</strong>到 Level 2。</li>
          <li><strong>Level 2：</strong>在 19 的位置，右边是 29。29 &gt; 22，太大了不能走，<strong>下降</strong>到 Level 1。</li>
          <li><strong>Level 1：</strong>在 19 的位置，右边是 22。22 == 22，<strong>找到了！</strong></li>
        </ol>

        <div class="mb-4">
          <Code language="text" :code="searchWalkthrough" title="查找 22 的路径追踪" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">查找伪代码</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">核心逻辑：从最高层向右移动的循环，搭配逐层下降的外层循环。</p>
        <div class="mb-4">
          <Code language="ts" :code="searchPseudo" title="查找伪代码" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">查找 15 的反面案例（不存在）</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">查找 15 的路径：</p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>Level 3：head → 19。19 &gt; 15，不能走，下降。</li>
          <li>Level 2：head → 7。7 &lt; 15，走到 7。7 右边是 19，19 &gt; 15，下降。</li>
          <li>Level 1：7 → 11。11 &lt; 15，走到 11。11 右边是 19，19 &gt; 15，下降。</li>
          <li>Level 0（或遍历到链表末尾）：11 右边是 19，19 &gt; 15。<strong>确认 15 不存在</strong>。</li>
        </ol>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 关键理解：</strong>查找过程中每次"下降"不是回到链表头！是从<strong>当前节点</strong>的下一层指针继续走。这是跳表比每层从头扫描高效的关键——已经走过的不重复走。</p>
        </aside>
      </section>

      <!-- 插入操作 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          插入操作：抛硬币决定层数
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          插入是跳表最精妙的设计——新节点应该"长"多少层？答案是用<strong>随机化</strong>：抛硬币，正面就加一层，反面就停。这种随机化的性质保证了跳表在期望情况下始终保持 O(log n) 的效率，无需像平衡二叉树那样手动旋转。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">randomLevel 核心算法</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">最经典的实现以概率 P（通常取 0.5 或 0.25）逐层递增：</p>
        <div class="mb-4">
          <Code language="ts" :code="randomLevelCode" title="randomLevel 算法" />
        </div>

        <p class="text-slate-600 mb-3 leading-relaxed">
          以 P = 0.5 为例：每个节点有 50% 概率只有 1 层，25% 概率有 2 层，12.5% 概率有 3 层……层数越高，节点越少。这正是跳表"多层稀疏索引"的本质来源——<strong>不是手动维护，而是概率自然产生</strong>。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">插入 25 的完整流程</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          假设随机函数为节点 25 生成了 level = 2（即它有 2 层索引）。插入步骤：
        </p>
        <ol class="list-decimal list-inside space-y-2 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>记录前驱：</strong>从最高层开始查找，记录下<strong>每一层</strong>中最后一个小于 25 的节点（即 25 的前驱节点）。这些节点是插入时更新指针的位置。查找结束后得到 update[] 数组。</li>
          <li><strong>创建节点：</strong>用随机生成的 level 新建节点（值为 25，forward 指针数组长度为 level）。</li>
          <li><strong>更新指针：</strong>对于 level 1 到 level 2 的每一层，把新节点插入到前驱节点后面（类似链表插入，但要更新多层）。</li>
          <li><strong>高于新节点层数的层：</strong>不需更新前驱指针，因为新节点没"长"那么高。</li>
        </ol>

        <div class="mb-4">
          <Code language="text" :code="insertWalkthrough" title="插入 25 的前驱节点（update[] 数组）" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 为什么用随机化？</strong>手动维护完美的"每上一层就减半"在插入/删除时会非常复杂（类似平衡二叉树的旋转）。随机化让维护成本降到几乎为零，而概率论保证了大数定律下的 O(log n) 期望性能。</p>
        </aside>
      </section>

      <!-- 删除操作 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          删除操作
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          删除与插入类似，也是先查找找到目标节点在各层的前驱节点，然后更新前驱的 forward 指针<strong>跳过</strong>被删除的节点。如果目标处于多个层级，需要在所有层级都做这个"跳过"操作。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">删除 19 的流程</h3>
        <div class="mb-4">
          <Code language="text" :code="deleteWalkthrough" title="删除 19 后的跳表结构" />
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">
          执行步骤：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>查找 + 记录前驱：</strong>从最高层开始找 19，同时记录各层的前驱节点到 update[]。</li>
          <li><strong>检查目标：</strong>update[0].forward[0] 是否为 19。如果是，执行删除。</li>
          <li><strong>逐层删除：</strong>对于节点 19 的每一层（假设它有 3 层），让 update[i].forward[i] = 19.forward[i]，即从前驱直接指向 19 的后继。</li>
          <li><strong>清理空层：</strong>如果最高层只剩头节点了，可以降低跳表的 maxLevel（并非必需，但有助于优化）。</li>
        </ol>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>删除操作的复杂度期望也是 O(log n)。但和平衡树不同，跳表删除<strong>不需要重平衡</strong>——删除后结构可能变得不均匀，但概率保证长期下仍然是 O(log n)。这是随机化数据结构的一大优势。</p>
        </aside>
      </section>

      <!-- 复杂度分析 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          复杂度证明概要
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          下面给出一个直观的复杂度分析，不做严谨数学推导。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">空间复杂度：O(n)</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          每个节点的期望层数是 1/(1-P)。当 P = 0.5 时，期望层数 ≈ 2。所以 n 个节点的总指针数期望为 2n，即<strong>期望空间 O(n)</strong>。对比平衡二叉树（每个节点存 2 个指针 + 平衡因子），实际常数稍大但不影响量级。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">时间复杂度：期望 O(log n)</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          分析的两个关键观察：
        </p>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>期望层数：</strong>跳表的期望层数约为 log<sub>1/P</sub>(n)。当 P = 0.5 时，约 log₂(n) 层。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>每层步数：</strong>在某一层，向前遍历期望经过 1/P 个节点就会下降（因为该层每个节点有 P 概率在上一层也存在，呈几何分布）。当 P = 0.5 时，每层期望走 2 步。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>总步数：</strong>层数 × 每层步数 ≈ log₂(n) × (1/P) = O(log n)。</span></li>
        </ul>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">操作</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">期望时间</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">最坏时间</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">查找</td><td class="px-4 py-2 border border-slate-200">O(log n)</td><td class="px-4 py-2 border border-slate-200">O(n)</td><td class="px-4 py-2 border border-slate-200">极端情况：所有节点都在同一层</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">插入</td><td class="px-4 py-2 border border-slate-200">O(log n)</td><td class="px-4 py-2 border border-slate-200">O(n)</td><td class="px-4 py-2 border border-slate-200">查找 O(log n) + 插入 O(1)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">删除</td><td class="px-4 py-2 border border-slate-200">O(log n)</td><td class="px-4 py-2 border border-slate-200">O(n)</td><td class="px-4 py-2 border border-slate-200">查找 O(log n) + 删除 O(1)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">空间</td><td class="px-4 py-2 border border-slate-200 text-green-600 font-medium" colspan="3">O(n) 期望，每个节点期望 1/(1-P) 个指针</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>最坏 O(n) 发生概率极低——相当于抛 n 次硬币都是正面（所有节点都在同一层）。在实际工程中，跳表的平均性能非常稳定，这也是 Redis 选它的重要原因。</p>
        </aside>
      </section>

      <!-- 与平衡BST对比 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          跳表 vs 平衡二叉搜索树
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          两者都能实现 O(log n) 的有序集合操作，但设计哲学完全不同。跳表用<strong>随机化 + 空间换时间</strong>，平衡树用<strong>严格的旋转 + 颜色/平衡因子约束</strong>。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对比维度</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">跳表 (Skip List)</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">红黑树 / AVL</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200"><strong>实现复杂度</strong></td><td class="px-4 py-2 border border-slate-200 text-green-600">简单——核心逻辑约 100 行</td><td class="px-4 py-2 border border-slate-200">复杂——插入/删除需要旋转和重着色</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><strong>平衡方式</strong></td><td class="px-4 py-2 border border-slate-200">随机化——抛硬币</td><td class="px-4 py-2 border border-slate-200">确定性——旋转/染色规则</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><strong>并发友好度</strong></td><td class="px-4 py-2 border border-slate-200 text-green-600">高——局部修改，无全局重平衡</td><td class="px-4 py-2 border border-slate-200">低——旋转可能影响大量节点</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><strong>范围查询</strong></td><td class="px-4 py-2 border border-slate-200 text-green-600">极快——底层链表顺序遍历</td><td class="px-4 py-2 border border-slate-200">需中序遍历，实现更复杂</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><strong>内存占用</strong></td><td class="px-4 py-2 border border-slate-200">稍高——每节点多几个指针</td><td class="px-4 py-2 border border-slate-200">紧凑——每节点固定 2 指针 + 颜色</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><strong>性能确定性</strong></td><td class="px-4 py-2 border border-slate-200">期望 O(log n)，有极小概率退化</td><td class="px-4 py-2 border border-slate-200 text-green-600">严格 O(log n)，无概率性退化</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          跳表 ≈ 前端路由的<strong>懒加载 + 嵌套路由</strong>：先加载顶层路由（高层索引），匹配到子路由后才加载具体组件（底层数据）。<br/>
          平衡树 ≈ <strong>虚拟 DOM diff</strong>：每次更新都要重新计算最优树结构（旋转/重平衡），保证整体平衡。跳表的"随机化"更接近<strong>概率性算法</strong>（如 Bloom Filter），牺牲一点点确定性换取极大的实现简化。
          </p>
        </aside>
      </section>

      <!-- 小结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>跳表 = 有序链表 + 多层索引</strong>——通过给链表建立"快车道"实现 O(log n) 查找</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>查找：自上而下，从左到右</strong>——从最高层出发，能右移就右移，不能就下降</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>插入：随机层数 + 更新前驱指针</strong>——用抛硬币决定新节点"长"多高，概率保证平衡</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>删除：逐层跳过目标节点</strong>——类似插入的逆操作，复杂度也是 O(log n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>期望 O(log n)，不需重平衡</strong>——随机化替代了平衡树的旋转操作，实现简单很多</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>工程优势：</strong>实现简单、并发友好、范围查询快——所以被 Redis 和 LevelDB 选用</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-4-queue/dsa-2-4-3-circular" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：循环队列</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-5-skiplist/dsa-2-5-2-implement" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：跳表实现 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const skipMemCode = `// 跳表节点内存布局（4 层结构, p=0.25）
//
// Level 3（高架）: head ──────────────────→ [99] → null
// Level 2:         head ──────→ [42] ──────→ [99] → null
// Level 1:         head → [17] → [42] → [55] → [99] → null
// Level 0（底层）:  head → [5]→[17]→[25]→[42]→[55]→[78]→[99]→null
//
// 每个节点的 forward[] 数组长度 = randomLevel()
// [5]  只有 Level 0（底层）→ forward[0] 指向 [17]，forward[1]不存在
// [42] 有 Level 0,1,2   → forward[0]→[55], forward[1]→[99], forward[2]→[99]
// [99] 有全部 4 层      → 所有 forward[i] → null
//
// 每个节点额外内存 = forward 数组长度 × 8 字节（64位指针）
// 期望总指针数 ≈ n/(1-p) = n/0.75 ≈ 1.33n
// 对比红黑树：3 个指针/节点 = 3n → 跳表更省`

const navList = [
  { id: "sec-1", name: "为什么需要跳表" },
  { id: "sec-mem", name: "💾 内存存储" },
  { id: "sec-2", name: "多层索引概念" },
  { id: "sec-3", name: "查找算法" },
  { id: "sec-4", name: "插入操作" },
  { id: "sec-5", name: "删除操作" },
  { id: "sec-6", name: "复杂度分析" },
  { id: "sec-7", name: "跳表 vs 平衡树" },
  { id: "sec-8", name: "小结" },
]

const problemCode = `// 有序链表查找 37——必须从头走到尾
// head -> 3 -> 7 -> 11 -> 19 -> 22 -> 29 -> 37 -> null
//  ↑                                ↑              ↑
//  step 1                      step 6        step 8 (找到！)
//
// 总共走了 8 步。如果有 100 万个元素，最坏要走 100 万步。

// 数组二分查找——O(log n)，但插入要移动所有后面的元素：
// arr = [3, 7, 11, 19, 22, 29, 37]
// 插入 5 → arr = [3, 5, 7, 11, 19, 22, 29, 37]
//           需要将 [7, 11, 19, 22, 29, 37] 整体后移！`

const asciiArt = `跳表的多层结构（P = 0.5，即抛硬币决定）

Level 3: [head] ──────────────────→ [19] ──────────→ null
             │                        │
Level 2: [head] ─────→ [7] ─────→ [19] ───→ [29] ──→ [37] → null
             │          │           │         │         │
Level 1: [head] → [3] → [7] → [11] → [19] → [22] → [29] → [37] → null
             ↑
           哨兵节点（不存数据，方便边界处理）

图例：
  每一行是一个"层级"，从左到右是单向链表
  │ 表示节点的 forward 指针指向上一个层级中同一节点
  数字表示该节点存的值`

const searchWalkthrough = `// 查找 22 的完整路径
//
// Level 3: [head] ──→ [19]          (19 < 22，右移)
//                       │           (19.forward[3] = null，无路可走，下降)
// Level 2:             [19] ──→ [29] (29 > 22，不能走，下降)
//                       │
// Level 1:             [19] → [22] ✓ (找到了！)
//
// 总共走了 3 步（对比原始链表需要 6 步），
// 在大数据量下这个加速效果是指数级的。`

const searchPseudo = `// 跳表查找的伪代码
function search(target: number): Node | null {
  let current = head

  // 从最高层往下逐层查找
  for (let level = maxLevel - 1; level >= 0; level--) {
    // 在当前层尽量往右走（直到下一个节点值 >= target）
    while (
      current.forward[level] !== null &&
      current.forward[level].val < target
    ) {
      current = current.forward[level]  // 向右移动
    }
    // while 退出时：current.forward[level] 为 null 或 >= target
    // 循环继续，level 自减（下降一层）
  }

  // 循环结束后 current 指向底层链表中最后一个 < target 的节点
  // 检查 current 的下一个节点是否就是目标
  const candidate = current.forward[0]
  if (candidate !== null && candidate.val === target) {
    return candidate
  }
  return null  // 未找到
}

// 关键理解：
// 1. "下降"不是回到 head——是从当前节点继续
// 2. 向左从不发生——每一层都是单向的
// 3. 查找结束时 current 不是目标节点本身，而是其"前一个"节点`

const randomLevelCode = `// 抛硬币决定新节点的层数
// P = 0.5 时每层有 50% 概率继续往上升
const P = 0.5
const MAX_LEVEL = 16  // 对于 2^16 ≈ 65000 个元素足够

function randomLevel(): number {
  let level = 1
  // 当随机数 < P 且还没到最大层数时，level 加 1
  while (Math.random() < P && level < MAX_LEVEL) {
    level++
  }
  return level
}

// 概率分布（P = 0.5）：
// P(level = 1) = 1 - P          = 50%
// P(level = 2) = P * (1 - P)    = 25%
// P(level = 3) = P^2 * (1 - P)  = 12.5%
// P(level = k) = P^(k-1) * (1-P) = 0.5^k
//
// 这意味着：每往上一层，节点数约减半。
// 这正是"多层稀疏索引"的数学基础——不需要手动维护！`

const insertWalkthrough = `// 插入 25（随机 level = 2）
//
// Step 1: 查找并记录各层前驱节点（update 数组）
//
// Level 3: head → 19            (19 < 25, 19.forward[3]=null)
//          update[3] = 19       ← 第 3 层的前驱是 19
//
// Level 2: 19 → 29              (29 > 25, 不能走)
//          update[2] = 19       ← 第 2 层的前驱是 19
//
// Level 1: 19 → 22 → 29         (22 < 25, 29 > 25)
//          update[1] = 22       ← 第 1 层的前驱是 22
//
// Step 2: 创建节点 25，level=2
//   25.forward = [null, null]   (长度为 2 的指针数组)
//
// Step 3: 逐层插入
//   Level 1: 25.forward[1] = update[1].forward[1] (= 29)
//            update[1].forward[1] = 25
//            → 22 → 25 → 29
//
//   Level 2: 25.forward[2] = update[2].forward[2] (= 29)
//            update[2].forward[2] = 25
//            → 19 → 25 → 29
//
// Level 3 及以上：25 没"长"那么高，不需要改写指针`

const deleteWalkthrough = `// 删除 19 后的跳表结构（19 在 Level 1-3 都有）

// 删除前：
// Level 3: [head] ──→ [19] ──→ null
// Level 2: [head] → [7] → [19] → [29] → [37] → null
// Level 1: [head] → [3] → [7] → [11] → [19] → [22] → [29] → [37] → null

// 删除后：
// Level 3: [head] ──→ null             (19 消失，head 直连 null)
// Level 2: [head] → [7] ──→ [29] → [37] → null   (7 跳过 19 直连 29)
// Level 1: [head] → [3] → [7] → [11] → [22] → [29] → [37] → null
//                                (11 跳过 19 直连 22)

// 关键：每一层都做一次"链表删除"操作——前驱节点的 forward 指针跳过目标。`
</script>