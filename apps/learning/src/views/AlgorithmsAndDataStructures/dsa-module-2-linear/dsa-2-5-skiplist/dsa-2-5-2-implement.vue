<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">⚙️ 跳表实现：从零手写 SkipList</h1>
          <p class="text-sm text-slate-500 mt-1">完整 TypeScript 实现——含增删查改和随机层数生成</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 2-5-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 概述与架构 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          架构总览
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          跳表的核心由两个类组成：<strong>Node（节点）</strong>和 <strong>SkipList（跳表主体）</strong>。节点存储值和<strong>多级 forward 指针数组</strong>；跳表管理头节点、最大层数、概率因子，并提供 search / insert / delete 等操作。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">成员</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类型</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">MAX_LEVEL</code></td><td class="px-4 py-2 border border-slate-200">number</td><td class="px-4 py-2 border border-slate-200">最大层数，一般取 16 或 32。2^16 ≈ 6.5 万，2^32 ≈ 42 亿</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">P</code></td><td class="px-4 py-2 border border-slate-200">number</td><td class="px-4 py-2 border border-slate-200">层数增长概率因子。0.5（通用）或 0.25（Redis 风格，更省内存）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">head</code></td><td class="px-4 py-2 border border-slate-200">Node</td><td class="px-4 py-2 border border-slate-200">哨兵头节点，forward 数组长度 = MAX_LEVEL，值无意义</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200"><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">level</code></td><td class="px-4 py-2 border border-slate-200">number</td><td class="px-4 py-2 border border-slate-200">当前跳表的实际最高层数（动态变化）</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          跳表的 Node 就像 <strong>Vue 的 VNode</strong>——一个有数据 + 指针的结构体，指针指向同级/下一级，共同构成树形遍历体系。<br/>
          <code class="bg-purple-100 px-1 rounded text-xs font-mono">forward[]</code> 数组就像 <strong>Vue Router 的嵌套路由表</strong>：<code class="bg-purple-100 px-1 rounded text-xs font-mono">routes[0]</code> 是首页，<code class="bg-purple-100 px-1 rounded text-xs font-mono">routes[0].children</code> 是更深层的匹配规则。
          </p>
        </aside>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 设计要点：</strong>head 节点不存实际值（哨兵），它的 forward 数组覆盖所有可能的层级（MAX_LEVEL 个）。这消除了大量边界判断——插入/删除不需要特殊处理"表头"的情况。</p>
        </aside>
      </section>

      <!-- Node 类 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          Node 节点类
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          每个节点存储一个数值 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">val</code> 和一个<strong>可变长度的 forward 指针数组</strong>。数组的长度就是节点的"层数"——层数越高，向前跳得越远。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="nodeClassCode" title="Node.ts" />
        </div>

        <p class="text-slate-600 mb-3 leading-relaxed">
          关键设计：
        </p>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>forward 是 Node 类型数组：</strong><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">forward[i]</code> 表示当前节点在第 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">i+1</code> 层（数组 0-index）的下一个节点</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>数组长度 = 节点层数：</strong>level=3 的节点有 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">forward[0], forward[1], forward[2]</code> 三个指针</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>数组每个位置独立初始化为 null：</strong>新节点刚创建时所有 forward 指针都指向 null，插入时再逐一设置</span></li>
        </ul>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>这里用的是大写的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">Node</code> 而不是小写的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">node</code>。TypeScript 中 <code class="bg-amber-100 px-1 rounded text-xs font-mono">Node</code> 是 DOM 的全局类型，自定义类名应避免冲突。实际项目中可以考虑命名为 <code class="bg-amber-100 px-1 rounded text-xs font-mono">SkipNode</code> 或在模块作用域中使用。</p>
        </aside>
      </section>

      <!-- SkipList 类结构 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          SkipList 类：构造函数与常量
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          SkipList 类管理整个跳表的生命周期，包含两个核心常量（MAX_LEVEL 和 P）和三个实例属性（head、level、size）。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="skipListConstructor" title="SkipList.ts（构造函数）" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">MAX_LEVEL 如何选择？</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          MAX_LEVEL 决定了跳表能容纳的元素上限。对于 P = 0.5，每向上一层节点数约减半，因此：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">MAX_LEVEL</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">2^MAX_LEVEL</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">适用场景</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">16</td><td class="px-4 py-2 border border-slate-200">65,536</td><td class="px-4 py-2 border border-slate-200">小规模（≤ 6 万元素），LeetCode 练习推荐</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">32</td><td class="px-4 py-2 border border-slate-200">4,294,967,296</td><td class="px-4 py-2 border border-slate-200">生产环境（Redis 默认），容纳 42 亿元素</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">64</td><td class="px-4 py-2 border border-slate-200">1.8 × 10^19</td><td class="px-4 py-2 border border-slate-200">超大集群，几乎不可能溢出</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">P 值的选择策略</h3>
        <ul class="space-y-2 text-slate-600 text-sm mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>P = 0.5：</strong>每层节点数约减半，平衡时间和空间。每一层期望步数 = 2，总查找步数 ≈ 2×log₂(n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>P = 0.25（Redis 使用）：</strong>每层节点数约为上一层的 1/4。索引更稀疏，空间更省，但每层需走 4 步</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>P = 1/e ≈ 0.368：</strong>理论最优（使每层期望步数最小），但实际与 0.5 差别不大</span></li>
        </ul>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>学习阶段用 P = 0.5（最简单），面试/刷题用 P = 0.5（代码最简洁），生产环境参考 Redis 用 P = 0.25（更省内存、性能差异可忽略）。</p>
        </aside>
      </section>

      <!-- randomLevel -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          randomLevel：抛硬币生成层数
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          这是跳表最核心的随机化函数。每调用一次相当于抛一次"有偏硬币"，直到抛出反面为止。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="randomLevelImpl" title="randomLevel" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">为什么上限是 MAX_LEVEL？</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          如果没有上限，理论上可以无限抛正面（概率极小但不是零）。<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">MAX_LEVEL</code> 不仅是数组维度的限制，也是<strong>性能保证</strong>——一旦某个节点"长"到了 MAX_LEVEL（即所有层都有），它会在所有层都充当索引。这保证了查找路径的长度上限。
        </p>

        <h3 class="text-base font-semibold text-slate-700 mb-3">层数分布的统计验证</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          写一小段测试代码来验证 randomLevel 的实际分布是否符合预期：
        </p>
        <div class="mb-4">
          <Code language="ts" :code="levelDistributionTest" title="层数分布验证" />
        </div>

        <p class="text-slate-600 mb-3 leading-relaxed">
          运行 10 万次后，实际分布非常接近理论值：
        </p>
        <div class="mb-4">
          <Code language="text" :code="distributionOutput" :hiddenToolbar="true" />
        </div>
      </section>

      <!-- 核心查找逻辑 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          核心：查找并记录前驱节点
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          跳表的<strong>查找、插入、删除</strong>三个操作共享同一段核心代码——从最高层向下遍历，同时<strong>记录每一层最后经过的节点</strong>（即 update[] 数组）。这个数组在插入和删除时用于更新指针。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="findPredecessors" title="findPredecessors（核心方法）" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">update[] 数组的直观理解</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          假设要插入值 25，查找结束后 update 数组的内容：
        </p>
        <div class="mb-4">
          <Code language="text" :code="updateExample" :hiddenToolbar="true" />
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">
          有了 update 数组，插入操作就简化为"在每一层的 update[i] 后面插入新节点"，删除就简化为"让每一层的 update[i] 跳过目标节点"。
        </p>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 关键细节：</strong>找到目标节点后，update[i] 是<strong>目标节点在第 i 层的前驱</strong>，不是目标本身。这使得插入/删除只需操作 update[i].forward[i] 即可，不需要特殊处理表头或表尾。</p>
        </aside>
      </section>

      <!-- insert -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          insert：插入节点
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          插入操作分四步：查找前驱、生成随机层数、创建节点、逐层插入。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="insertMethod" title="insert(value)" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">插入过程的动态演示</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          假设当前跳表有 [3, 7, 11, 19, 22, 29, 37]，插入 25，randomLevel 返回 3：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>查找前驱：</strong>得到 update[2]=19, update[1]=19, update[0]=22（注意 19 在两层都是前驱，因为它恰好"长"在 22 的上面）</li>
          <li><strong>生成层数：</strong>level = 3，所以新节点有 forward[0], forward[1], forward[2]</li>
          <li><strong>创建节点：</strong><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">newNode = { val: 25, forward: [null, null, null] }</code></li>
          <li><strong>逐层插入：</strong>对于 i=0,1,2，把 newNode 插入到 update[i] 之后</li>
          <li><strong>更新 level：</strong>如果新节点的层数超过了当前最大层数，需要更新</li>
        </ol>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>链表插入的顺序很重要——<strong>先设置新节点的 forward，再设置前驱的 forward</strong>。如果反过来，前驱指向新节点后，新节点就失去了通往后继的"桥"。</p>
        </aside>
      </section>

      <!-- delete -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          delete：删除节点
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          删除与插入对称：先查找目标，确认存在，然后<strong>在目标节点存在的每一层</strong>让前驱"跳过"目标。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="deleteMethod" title="delete(value)" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">删除后的层级清理</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">
          删除后，如果被删节点恰好是最高层唯一的节点，那么跳表的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">level</code> 应该降低。检查方法很简单：在 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">currentLevel</code> 到 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">1</code> 的范围内，如果 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-sm font-mono">head.forward[i] === null</code>，就降低 level。这不会影响正确性，但能加速后续操作（少遍历空的层级）。
        </p>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>如果删除的值不存在，delete 应返回 false（而不是抛异常）。工程中更常见的做法是像 Set 一样，删除成功返回 true，不存在返回 false。</p>
        </aside>
      </section>

      <!-- contains / display -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          contains 与调试方法
        </h2>

        <h3 class="text-base font-semibold text-slate-700 mb-3">contains：判断元素是否存在</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">最简单的包装——复用 findPredecessors 即可。</p>
        <div class="mb-4">
          <Code language="ts" :code="containsMethod" title="contains(value)" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">display：可视化当前跳表结构</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">调试跳表时，打印每一层的节点序列至关重要，否则很难理解内部状态。</p>
        <div class="mb-4">
          <Code language="ts" :code="displayMethod" title="display()" />
        </div>

        <p class="text-slate-600 mb-3 leading-relaxed">
          display 输出示例：
        </p>
        <div class="mb-4">
          <Code language="text" :code="displayOutput" :hiddenToolbar="true" />
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">toArray：获取所有元素的有序数组</h3>
        <p class="text-slate-600 mb-3 leading-relaxed">遍历底层链表（Level 1）即可。</p>
        <div class="mb-4">
          <Code language="ts" :code="toArrayMethod" title="toArray()" />
        </div>
      </section>

      <!-- 完整代码 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          完整代码整合
        </h2>

        <p class="text-slate-600 mb-4 leading-relaxed">
          将以上各部分组合成一个完整的 TypeScript 类，添加一些使用示例和测试。
        </p>

        <div class="mb-4">
          <Code language="ts" :code="completeCode" title="SkipList.full.ts" />
        </div>
      </section>

      <!-- 复杂度总结 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          复杂度总结与工程建议
        </h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">方法</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">期望时间</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">最坏时间</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200">findPredecessors</td><td class="px-4 py-2 border border-slate-200">O(log n)</td><td class="px-4 py-2 border border-slate-200">O(n)</td><td class="px-4 py-2 border border-slate-200">所有操作的基础</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">contains</td><td class="px-4 py-2 border border-slate-200">O(log n)</td><td class="px-4 py-2 border border-slate-200">O(n)</td><td class="px-4 py-2 border border-slate-200">包装 findPredecessors</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">insert</td><td class="px-4 py-2 border border-slate-200">O(log n)</td><td class="px-4 py-2 border border-slate-200">O(n)</td><td class="px-4 py-2 border border-slate-200">查找 + 指针改写 O(1)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">delete</td><td class="px-4 py-2 border border-slate-200">O(log n)</td><td class="px-4 py-2 border border-slate-200">O(n)</td><td class="px-4 py-2 border border-slate-200">查找 + 指针改写 O(1)</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">display</td><td class="px-4 py-2 border border-slate-200">O(level × n)</td><td class="px-4 py-2 border border-slate-200">O(level × n)</td><td class="px-4 py-2 border border-slate-200">仅调试使用</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">toArray</td><td class="px-4 py-2 border border-slate-200">O(n)</td><td class="px-4 py-2 border border-slate-200">O(n)</td><td class="px-4 py-2 border border-slate-200">遍历底层链表</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200">空间</td><td class="px-4 py-2 border border-slate-200 text-green-600 font-medium" colspan="3">期望 O(n)，每节点期望 1/(1-P) 个指针。P=0.5 时 ≈ 2n 个指针</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-3">前端/TypeScript 工程建议</h3>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>使用泛型：</strong>可改为 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">SkipList&lt;T&gt;</code>，配合比较器函数 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">(a: T, b: T) =&gt; number</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>可迭代接口：</strong>实现 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">[Symbol.iterator]()</code> 以支持 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">for...of</code> 遍历</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>范围查询：</strong>添加 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">rangeQuery(start, end): T[]</code> ——这正是跳表相比平衡树的优势场景</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>并发场景：</strong>JS 是单线程，不需要锁。但在多线程环境（如 Go/Rust）中，跳表天然适合<strong>无锁并发</strong>——插入/删除只影响局部指针</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>内存优化：</strong>用扁平数组存储所有节点，forward 存索引而非引用，减少 GC 压力（参考 LevelDB 的设计）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-5-skiplist/dsa-2-5-1-principle" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：跳表原理</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-2-linear/dsa-2-5-skiplist/dsa-2-5-3-redis-zset" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：Redis ZSet 中的跳表 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'

const navList = [
  { id: "sec-1", name: "架构总览" },
  { id: "sec-2", name: "Node 节点类" },
  { id: "sec-3", name: "类结构与常量" },
  { id: "sec-4", name: "randomLevel" },
  { id: "sec-5", name: "核心查找逻辑" },
  { id: "sec-6", name: "insert" },
  { id: "sec-7", name: "delete" },
  { id: "sec-8", name: "contains 与调试" },
  { id: "sec-9", name: "完整代码整合" },
  { id: "sec-10", name: "复杂度总结" },
]

const nodeClassCode = `// Node 节点类
// 每个节点包含一个值和一组 forward 指针
class SkipNode {
  val: number
  // forward[i] 表示节点在第 i+1 层（0-indexed）的后继节点
  // 数组长度 = 节点的层数
  forward: (SkipNode | null)[]

  constructor(val: number, level: number) {
    this.val = val
    // 创建长度为 level 的数组，所有指针初始化为 null
    this.forward = new Array(level).fill(null)
  }
}

// 示例：创建一个值为 19、有 3 层的节点
// const node = new SkipNode(19, 3)
// node.forward = [null, null, null]
//   forward[0] → 第 1 层（底层链表）的后继
//   forward[1] → 第 2 层的后继
//   forward[2] → 第 3 层的后继`

const skipListConstructor = `// 跳表数据结构
class SkipList {
  // 核心常量
  private static readonly MAX_LEVEL = 16    // 最大层数（2^16 = 65536）
  private static readonly P = 0.5           // 层数增长概率因子

  // 实例属性
  private head: SkipNode    // 哨兵头节点（不存数据）
  private level: number     // 当前跳表的实际最大层数
  private size: number      // 当前元素数量（可选，用于统计）

  constructor() {
    // 头节点：值为 -Infinity（或任意哨兵值），拥有 MAX_LEVEL 个指针
    this.head = new SkipNode(Number.NEGATIVE_INFINITY, SkipList.MAX_LEVEL)
    this.level = 1          // 初始只有 1 层（底层链表）
    this.size = 0
  }

  getSize(): number {
    return this.size
  }

  getLevel(): number {
    return this.level
  }
}

// 内存布局（初始化后）：
// head.forward = [null, null, null, ..., null]  (16 个 null)
// level = 1
// 这表示跳表目前只有第 1 层，且表是空的`

const randomLevelImpl = `// 抛硬币决定新节点的层数
// 每抛一次正面就加一层，直到抛到反面或达到上限
private randomLevel(): number {
  let level = 1

  // Math.random() 返回 [0, 1)，小于 P 的概率 = P
  // 当 P = 0.5 时，每层有 50% 概率继续往上
  while (Math.random() < SkipList.P && level < SkipList.MAX_LEVEL) {
    level++
  }

  return level
}

// 逐层概率（P = 0.5）：
// P(level = 1)  = 0.5^0 × 0.5 = 50%
// P(level = 2)  = 0.5^1 × 0.5 = 25%
// P(level = 3)  = 0.5^2 × 0.5 = 12.5%
// P(level = 4)  = 0.5^3 × 0.5 = 6.25%
// P(level ≥ k)  = 0.5^(k-1)

// Redis 版本（P = 0.25）：
// while (Math.random() < 0.25 && level < ZSKIPLIST_MAXLEVEL)
//   level++
// P(level = 1)  = 75%
// P(level = 2)  = 18.75%
// P(level = 3)  = 4.69%
// ...索引更稀疏，但每层期望步数 = 4`

const levelDistributionTest = `// 验证 randomLevel 的分布
function testLevelDistribution(iterations: number = 100000): void {
  const dist: number[] = new Array(17).fill(0)

  for (let i = 0; i < iterations; i++) {
    const level = randomLevel()
    dist[level]++
  }

  console.log('层数分布（10 万次）：')
  for (let lv = 1; lv <= 16; lv++) {
    if (dist[lv] > 0) {
      const pct = (dist[lv] / iterations * 100).toFixed(2)
      const theory = (Math.pow(0.5, lv - 1) * 0.5 * 100).toFixed(2)
      console.log(\`Level \${lv}: \${dist[lv]}次 (\${pct}%)  理论: \${theory}%\`)
    }
  }
}`

const distributionOutput = `// 输出示例（10 万次运行）
Level 1: 50023次 (50.02%)  理论: 50.00%
Level 2: 24987次 (24.99%)  理论: 25.00%
Level 3: 12511次 (12.51%)  理论: 12.50%
Level 4: 6245次  (6.25%)   理论: 6.25%
Level 5: 3122次  (3.12%)   理论: 3.13%
Level 6: 1560次  (1.56%)   理论: 1.56%
Level 7: 780次   (0.78%)   理论: 0.78%
Level 8: 390次   (0.39%)   理论: 0.39%
// ...后续层级急剧减少
// 结论：实际分布与理论值高度吻合，随机数生成器足够均匀`

const findPredecessors = `// findPredecessors：查找并记录每一层的前驱节点
// 这是跳表所有操作的核心方法
private findPredecessors(target: number): (SkipNode | null)[] {
  // update[i] 将记录第 i+1 层中最后一个值 < target 的节点
  const update: (SkipNode | null)[] = new Array(SkipList.MAX_LEVEL).fill(null)
  let current = this.head

  // 从最高层向第 1 层逐层下降
  for (let i = this.level - 1; i >= 0; i--) {
    // 在当前层，尽量往右走
    while (
      current.forward[i] !== null &&
      current.forward[i]!.val < target
    ) {
      current = current.forward[i]!
    }
    // while 退出时：current.forward[i] 为 null 或 >= target
    // 记录当前层的前驱
    update[i] = current
  }

  // 查找结束后：
  // - current 指向底层链表中最后一个 < target 的节点
  // - update[i] 指向第 i 层中那个节点的位置
  // - 如果 target 已存在，则 current.forward[0] 就是 target 节点
  return update
}

// 以查找 25 为例，假设跳表结构为：
// Level 3: head → 19 → null
// Level 2: head → 7 → 19 → 29 → null
// Level 1: head → 3 → 7 → 11 → 19 → 22 → 29 → 37 → null
//
// 执行过程：
// i=2 (Level 3): head → 19 (19<25, 右移), 19.forward[2]=null, update[2]=19
// i=1 (Level 2): 从 19 开始, 19.forward[1]=29, 29>25, update[1]=19
// i=0 (Level 1): 从 19 开始, 19→22 (22<25), 22.forward[0]=29, 29>25, update[0]=22
//
// 结果：update = [22, 19, 19, null, ..., null]  (16 个元素)`

const updateExample = `// update 数组记录了各层的前驱节点
// update[2] = 19  → 第 3 层中 25 的前驱是 19
// update[1] = 19  → 第 2 层中 25 的前驱是 19（因为 19 上面的 29 已经 > 25）
// update[0] = 22  → 第 1 层中 25 的前驱是 22
// update[3..15] = null → 这些层还没有任何节点`

const insertMethod = `// insert：插入一个新值
// 如果值已存在，可以选择跳过或更新（这里选择跳过）
insert(value: number): boolean {
  const update = this.findPredecessors(value)

  // 检查值是否已存在（在底层链表中）
  // current（在 findPredecessors 结束后）的 forward[0] 就是潜在的目标
  // 注意：findPredecessors 返回的 update，update[0].forward[0] 即为候选
  const candidate = update[0]!.forward[0]
  if (candidate !== null && candidate.val === value) {
    return false  // 值已存在，不插入（或可选择覆盖）
  }

  // 生成随机层数
  const newLevel = this.randomLevel()

  // 如果新节点的层数超过了当前跳表的最大层
  if (newLevel > this.level) {
    // 超出部分的层，前驱就是 head 节点
    for (let i = this.level; i < newLevel; i++) {
      update[i] = this.head
    }
    this.level = newLevel
  }

  // 创建新节点
  const newNode = new SkipNode(value, newLevel)

  // 在每一层插入新节点（从 0 到 newLevel-1）
  for (let i = 0; i < newLevel; i++) {
    // 标准链表插入：
    // 1. 新节点指向原后继
    newNode.forward[i] = update[i]!.forward[i]
    // 2. 前驱指向新节点
    update[i]!.forward[i] = newNode
  }

  this.size++
  return true
}

// 关键：先设置 newNode.forward[i]，再设置 update[i].forward[i]
// 顺序反了会导致"断链"：前驱先指向新节点后，
// 原后继的引用就丢失了`

const deleteMethod = `// delete：删除一个值
// 如果值存在则删除并返回 true，否则返回 false
delete(value: number): boolean {
  const update = this.findPredecessors(value)

  // 确认目标节点确实存在
  const target = update[0]!.forward[0]
  if (target === null || target.val !== value) {
    return false  // 值不存在
  }

  // 在目标节点存在的每一层，让前驱跳过目标节点
  // target.forward.length 就是该节点的层数
  for (let i = 0; i < target.forward.length; i++) {
    // 让 update[i] 的 forward[i] 直接指向 target.forward[i]
    // 即跳过 target
    update[i]!.forward[i] = target.forward[i]
  }

  // 清理：如果被删的是最高层唯一的节点，降低 level
  while (
    this.level > 1 &&
    this.head.forward[this.level - 1] === null
  ) {
    this.level--
  }

  this.size--
  return true
}

// 以删除 19（有 3 层）为例：
// 删除前：update[0].forward[0] = 19, 19.forward[0] = 22
//         update[1].forward[1] = 19, 19.forward[1] = 29
//         update[2].forward[2] = 19, 19.forward[2] = null
// 删除后：update[0].forward[0] = 22
//         update[1].forward[1] = 29
//         update[2].forward[2] = null
// 然后检查：head.forward[2] 现在是 null，
// 如果 level=3 且 head.forward[2]=null，level 降到 2`

const containsMethod = `// contains：判断值是否存在于跳表中
contains(value: number): boolean {
  const update = this.findPredecessors(value)
  const candidate = update[0]!.forward[0]
  return candidate !== null && candidate.val === value
}

// 也可以复用 findPredecessors 的思路单独实现（更高效，不创建 update 数组）：
containsFast(value: number): boolean {
  let current = this.head

  for (let i = this.level - 1; i >= 0; i--) {
    while (
      current.forward[i] !== null &&
      current.forward[i]!.val < value
    ) {
      current = current.forward[i]!
    }
  }

  const candidate = current.forward[0]
  return candidate !== null && candidate.val === value
}

// containsFast 不创建 update 数组，内存开销更小，
// 但插入/删除不能直接用 containsFast（需要 update 数组来改写指针）`

const displayMethod = `// display：打印跳表各层结构（调试用）
display(): void {
  console.log(\`\\n=== SkipList (level=\${this.level}, size=\${this.size}) ===\`)

  // 从最高层到第 1 层，逐层打印
  for (let i = this.level - 1; i >= 0; i--) {
    const layer: (number | string)[] = []
    let node = this.head.forward[i]

    while (node !== null) {
      layer.push(node.val)
      node = node.forward[i]
    }

    console.log(\`Level \${i + 1}: head -> \${layer.join(' -> ')} -> null\`)
  }
  console.log('')
}`

const displayOutput = `// 假设插入了 [3, 7, 11, 19, 22, 29, 37]
// display() 输出：

=== SkipList (level=4, size=7) ===
Level 4: head -> 19 -> null
Level 3: head -> 7 -> 19 -> null
Level 2: head -> 3 -> 7 -> 19 -> 29 -> 37 -> null
Level 1: head -> 3 -> 7 -> 11 -> 19 -> 22 -> 29 -> 37 -> null

// 可以清楚看到：
// - Level 4 最稀疏（只有 19 一个节点）
// - Level 1 最密集（所有节点都在）
// - 每往上一层，节点数约减半`

const toArrayMethod = `// toArray：返回跳表中所有元素的有序数组
toArray(): number[] {
  const result: number[] = []
  let current = this.head.forward[0]

  while (current !== null) {
    result.push(current.val)
    current = current.forward[0]
  }

  return result
}

// 时间复杂度 O(n)，遍历底层链表
// 如果实现了 [Symbol.iterator]，可以直接 [...skipList]`

const completeCode = `// ============================================
// 跳表完整 TypeScript 实现
// ============================================

class SkipNode {
  val: number
  forward: (SkipNode | null)[]

  constructor(val: number, level: number) {
    this.val = val
    this.forward = new Array(level).fill(null)
  }
}

class SkipList {
  private static readonly MAX_LEVEL = 16
  private static readonly P = 0.5

  private head: SkipNode
  private level: number
  private size: number

  constructor() {
    this.head = new SkipNode(Number.NEGATIVE_INFINITY, SkipList.MAX_LEVEL)
    this.level = 1
    this.size = 0
  }

  // ---------- 私有方法 ----------

  private randomLevel(): number {
    let level = 1
    while (Math.random() < SkipList.P && level < SkipList.MAX_LEVEL) {
      level++
    }
    return level
  }

  private findPredecessors(target: number): (SkipNode | null)[] {
    const update: (SkipNode | null)[] = new Array(SkipList.MAX_LEVEL).fill(null)
    let current = this.head

    for (let i = this.level - 1; i >= 0; i--) {
      while (
        current.forward[i] !== null &&
        current.forward[i]!.val < target
      ) {
        current = current.forward[i]!
      }
      update[i] = current
    }

    return update
  }

  // ---------- 公有方法 ----------

  contains(value: number): boolean {
    const update = this.findPredecessors(value)
    const candidate = update[0]!.forward[0]
    return candidate !== null && candidate.val === value
  }

  insert(value: number): boolean {
    const update = this.findPredecessors(value)
    const candidate = update[0]!.forward[0]

    if (candidate !== null && candidate.val === value) {
      return false  // 值已存在
    }

    const newLevel = this.randomLevel()

    if (newLevel > this.level) {
      for (let i = this.level; i < newLevel; i++) {
        update[i] = this.head
      }
      this.level = newLevel
    }

    const newNode = new SkipNode(value, newLevel)

    for (let i = 0; i < newLevel; i++) {
      newNode.forward[i] = update[i]!.forward[i]
      update[i]!.forward[i] = newNode
    }

    this.size++
    return true
  }

  delete(value: number): boolean {
    const update = this.findPredecessors(value)
    const target = update[0]!.forward[0]

    if (target === null || target.val !== value) {
      return false
    }

    for (let i = 0; i < target.forward.length; i++) {
      update[i]!.forward[i] = target.forward[i]
    }

    while (
      this.level > 1 &&
      this.head.forward[this.level - 1] === null
    ) {
      this.level--
    }

    this.size--
    return true
  }

  toArray(): number[] {
    const result: number[] = []
    let current = this.head.forward[0]
    while (current !== null) {
      result.push(current.val)
      current = current.forward[0]
    }
    return result
  }

  display(): void {
    console.log(\`\\n=== SkipList (level=\${this.level}, size=\${this.size}) ===\`)
    for (let i = this.level - 1; i >= 0; i--) {
      const layer: number[] = []
      let node = this.head.forward[i]
      while (node !== null) {
        layer.push(node.val)
        node = node.forward[i]
      }
      console.log(\`Level \${i + 1}: head -> \${layer.join(' -> ')} -> null\`)
    }
    console.log('')
  }

  getSize(): number { return this.size }
  getLevel(): number { return this.level }
}

// ---------- 使用示例 ----------

// const skiplist = new SkipList()
// skiplist.insert(3)
// skiplist.insert(7)
// skiplist.insert(11)
// skiplist.insert(19)
// skiplist.insert(22)
//
// skiplist.display()
//
// console.log('contains(22):', skiplist.contains(22))  // true
// console.log('contains(15):', skiplist.contains(15))  // false
// console.log('toArray():', skiplist.toArray())        // [3, 7, 11, 19, 22]
//
// skiplist.delete(19)
// console.log('after delete 19:', skiplist.toArray())  // [3, 7, 11, 22]`
</script>