<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔍 搜索总览：暴力枚举与搜索空间</h1>
          <p class="text-sm text-slate-500 mt-1">先把「找」的学问想清楚——结构内查找 vs 组合优化搜索</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 8-0-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">📐</span>
          结构总览：搜索问题的分类
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          「搜索」这个词覆盖了<strong>两大类</strong>问题：一是<strong>在已有的数据结构里找元素</strong>（数组查数、树里找节点），
          二是<strong>在巨大的解空间里找满足条件的解</strong>（枚举组合、走迷宫、排日程）。
          前者考验数据结构与有序性，后者考验对<strong>搜索空间</strong>的理解与裁剪能力——这是本模块的总纲。
        </p>

        <!-- 分类树 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 300" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <!-- 根节点 -->
            <rect x="300" y="14" width="120" height="40" rx="8" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="360" y="34" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">搜索问题</text>
            <!-- 分支线 -->
            <line x1="360" y1="54" x2="240" y2="94" stroke="#94a3b8" stroke-width="2" />
            <line x1="360" y1="54" x2="510" y2="94" stroke="#94a3b8" stroke-width="2" />

            <!-- 左：结构内查找 -->
            <rect x="140" y="94" width="200" height="36" rx="8" fill="#e0f2fe" stroke="#06b6d4" stroke-width="1.5" />
            <text x="240" y="112" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0e7490">① 在结构内查找</text>
            <!-- 右：组合优化 -->
            <rect x="400" y="94" width="220" height="36" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5" />
            <text x="510" y="112" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#92400e">② 组合优化（解空间搜索）</text>

            <!-- 左子节点连线 -->
            <line x1="240" y1="130" x2="120" y2="158" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="240" y1="130" x2="280" y2="158" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="240" y1="130" x2="120" y2="210" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="240" y1="130" x2="280" y2="210" stroke="#94a3b8" stroke-width="1.5" />
            <!-- 右子节点连线 -->
            <line x1="510" y1="130" x2="445" y2="158" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="510" y1="130" x2="590" y2="158" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="510" y1="130" x2="445" y2="210" stroke="#94a3b8" stroke-width="1.5" />
            <line x1="510" y1="130" x2="590" y2="210" stroke="#94a3b8" stroke-width="1.5" />

            <!-- 左叶子（2x2） -->
            <rect x="60" y="158" width="120" height="36" rx="7" fill="#f1f5f9" stroke="#06b6d4" stroke-width="1.2" />
            <text x="120" y="176" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0e7490">线性扫描 O(n)</text>
            <rect x="220" y="158" width="120" height="36" rx="7" fill="#f1f5f9" stroke="#06b6d4" stroke-width="1.2" />
            <text x="280" y="176" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0e7490">二分查找 O(log n)</text>
            <rect x="60" y="210" width="120" height="36" rx="7" fill="#f1f5f9" stroke="#06b6d4" stroke-width="1.2" />
            <text x="120" y="228" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0e7490">哈希查找 O(1)</text>
            <rect x="220" y="210" width="120" height="36" rx="7" fill="#f1f5f9" stroke="#06b6d4" stroke-width="1.2" />
            <text x="280" y="228" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#0e7490">树 / 图遍历</text>

            <!-- 右叶子（2x2） -->
            <rect x="380" y="158" width="130" height="36" rx="7" fill="#f1f5f9" stroke="#f59e0b" stroke-width="1.2" />
            <text x="445" y="176" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">暴力枚举 2ⁿ</text>
            <rect x="530" y="158" width="130" height="36" rx="7" fill="#f1f5f9" stroke="#f59e0b" stroke-width="1.2" />
            <text x="595" y="176" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">回溯 DFS + 剪枝</text>
            <rect x="380" y="210" width="130" height="36" rx="7" fill="#f1f5f9" stroke="#f59e0b" stroke-width="1.2" />
            <text x="445" y="228" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">分支限界（带界 BFS）</text>
            <rect x="530" y="210" width="130" height="36" rx="7" fill="#f1f5f9" stroke="#f59e0b" stroke-width="1.2" />
            <text x="595" y="228" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#92400e">启发式 / 近似</text>

            <!-- 底部本质 -->
            <rect x="90" y="264" width="540" height="28" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3" />
            <text x="360" y="278" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#334155">搜索的本质 = 在搜索空间 S 中枚举 / 裁剪，找出满足条件 P 的解</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：搜索问题分类树 —— 左边「查已有结构」，右边「搜解空间」，本模块 8 全部围绕这两类展开</figcaption>
        </figure>

        <!-- 范式对比表 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">四大搜索范式速查</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left">
              <th class="px-4 py-2 border border-slate-200 font-semibold">范式</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold">数据结构前提</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold">复杂度</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold">典型场景</th>
            </tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">线性扫描</td><td class="px-4 py-2 border">无</td><td class="px-4 py-2 border font-mono text-amber-600">O(n)</td><td class="px-4 py-2 border">无序数组 / 链表查找</td></tr>
              <tr><td class="px-4 py-2 border font-mono">二分查找</td><td class="px-4 py-2 border">有序 / 单调性</td><td class="px-4 py-2 border font-mono text-emerald-600">O(log n)</td><td class="px-4 py-2 border">有序数组、二分答案（本模块重点）</td></tr>
              <tr><td class="px-4 py-2 border font-mono">回溯</td><td class="px-4 py-2 border">解空间树</td><td class="px-4 py-2 border font-mono text-amber-600">指数级 + 剪枝</td><td class="px-4 py-2 border">排列组合、N 皇后（8-2）</td></tr>
              <tr><td class="px-4 py-2 border font-mono">分支限界</td><td class="px-4 py-2 border">可估上下界</td><td class="px-4 py-2 border font-mono text-amber-600">指数级 + 界剪枝</td><td class="px-4 py-2 border">TSP 等最优化（8-3）</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">1</span>
          两类搜索问题 —— 别把它们混为一谈
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          面试里说「搜索」，可能指完全不同的两件事。先分清它们，才能选对工具：
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <ul class="space-y-2 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">A.</span><span><strong>结构内查找：</strong>数据已经组织好（数组/链表/树/图/哈希表），我们的任务是<strong>「查」</strong>——找某个 key 是否存在、在哪个位置。复杂度取决于数据结构的性质（有序？可哈希？）。</span></li>
            <li class="flex items-start gap-2"><span class="text-amber-500 mt-1 font-bold">B.</span><span><strong>组合优化搜索：</strong>没有现成结构，解是一堆<strong>「选择组合」</strong>（选哪些物品、皇后放哪、任务排什么顺序）。我们的任务是<strong>「生成 + 检查」</strong>——在指数级候选解里找出满足约束/最优的一个。</span></li>
          </ul>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          结构内查找 ≈ 从 <code>Map</code> 里 <code>get(key)</code>——数据已经摆好了，直接取；<br/>
          组合优化搜索 ≈ 前端实现「购物车最优优惠券组合」——所有可能的凑单方式都要试一遍，从成千上万种里挑最划算的。<br/>
          一个是「打开抽屉找东西」，一个是「从所有排列里挑最好的」，复杂度天差地别。</p>
        </aside>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">
          <strong>判断口诀：</strong>问自己一句「<em>答案是一个位置，还是一个方案？</em>」答案是位置 → A 类；
          答案是「哪几个元素 / 什么顺序 / 怎么分配」→ B 类。
        </p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">2</span>
          暴力枚举与搜索空间 —— 组合爆炸是第一课
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>搜索空间 (Search Space)</strong> = 所有可能候选解组成的集合。B 类搜索的第一步就是估算它有多大——
          如果只有几百个，直接暴力枚举；如果有 2<sup>100</sup> 个，宇宙毁灭都枚举不完，必须裁剪。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left">
              <th class="px-4 py-2 border border-slate-200 font-semibold">问题</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold">搜索空间</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold">n=10</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold">n=20</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold">n=30</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold">判定</th>
            </tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">n 个元素的子集</td><td class="px-4 py-2 border font-mono">2ⁿ</td><td class="px-4 py-2 border font-mono">1024</td><td class="px-4 py-2 border font-mono text-amber-600">10⁶</td><td class="px-4 py-2 border font-mono text-red-600">10⁹</td><td class="px-4 py-2 border">n ≤ 20~22 可暴力</td></tr>
              <tr><td class="px-4 py-2 border">n 个元素的排列</td><td class="px-4 py-2 border font-mono">n!</td><td class="px-4 py-2 border font-mono">3.6×10⁶</td><td class="px-4 py-2 border font-mono text-red-600">2.4×10¹⁸</td><td class="px-4 py-2 border font-mono text-red-600">—</td><td class="px-4 py-2 border">n ≤ 10~11 才敢枚举</td></tr>
              <tr><td class="px-4 py-2 border">从 n 选 k</td><td class="px-4 py-2 border font-mono">C(n,k)</td><td class="px-4 py-2 border font-mono">252</td><td class="px-4 py-2 border font-mono">1.8×10⁵</td><td class="px-4 py-2 border font-mono text-amber-600">5.9×10⁷</td><td class="px-4 py-2 border">依 k 而定</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="ts" :code="subsetsCode" title="brute_force_subsets.ts" /></div>
        <div class="mb-4"><Code language="ts" :code="combineCode" title="brute_force_combine.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 组合爆炸：</strong>2ⁿ 增长有多快？2<sup>10</sup>=1024，2<sup>20</sup>≈100万，2<sup>30</sup>≈10亿，2<sup>60</sup>≈10<sup>18</sup>。
          每次枚举多一个元素，工作量直接翻倍。所以<strong>暴力枚举永远不是终点</strong>——它只是理解问题的起点，真正的算法都在「少枚举」上做文章。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">3</span>
          四大范式的关系 —— 从暴力到高效的一条主线
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          四个范式不是并列的四个孤立算法，而是<strong>同一条「减少搜索空间」主线上的不同层次</strong>：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>线性扫描</strong>：完全不裁剪，从第一个找到最后一个，O(n)。</li>
          <li><strong>二分查找</strong>：利用「有序」这一条额外信息，每步<strong>排除一半</strong>，O(n) → O(log n)。</li>
          <li><strong>回溯</strong>：在解空间树上做 DFS，走到不满足约束的分支就<strong>剪枝</strong>退回，避免枚举完整子树。</li>
          <li><strong>分支限界</strong>：回溯 + 一个「当前最优值」的<strong>界限</strong>，估计某分支的最好情况都打不过最优，就直接放弃。</li>
        </ol>
        <p class="text-slate-600 mb-4 text-sm leading-relaxed">
          一句话概括：<strong>二分是利用有序性把搜索空间对半砍；回溯和分支限界是利用约束和界限把解空间树砍掉一大片。</strong>
          它们都在回答同一个问题——「哪些候选解<em>一定不是答案</em>，可以直接扔掉？」
        </p>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 认识捷径：</strong><br/>
          排序 + 二分 = 把「结构内查找」的复杂度从 O(n) 压到 O(log n)；<br/>
          排序 + 回溯剪枝 = 把「组合优化」的可行空间从 2ⁿ 压到可接受范围。<br/>
          所以<strong>「排序」是模块 7 给模块 8 铺的路</strong>——没有有序性，二分无从谈起。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">4</span>
          如何选择搜索策略 —— 一张决策清单
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          拿到搜索题，按下面这张清单走，90% 的题能在 30 秒内定位范式：
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <ol class="space-y-2 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">1.</span><span>答案是一个<strong>位置/存在性</strong>？→ 结构内查找：有序就二分，无序就线性或哈希。</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">2.</span><span>答案是一个<strong>「最大/最小可行值」</strong>，且可行性随值单调？→ <strong>二分答案</strong>（8-1-2）。</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">3.</span><span>答案是一个<strong>方案/组合</strong>，解空间树不大或剪枝很强？→ 回溯（8-2）。</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">4.</span><span>求<strong>最优解</strong>且每步都能估界？→ 分支限界 / 动态规划 / 贪心。</span></li>
          </ol>
        </div>
        <div class="mb-4"><Code language="ts" :code="strategyCode" title="choose_strategy.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          选搜索策略就像选 Vue 的响应式方案——<code>ref</code> 简单直接（线性扫描），
          <code>computed</code> 有缓存有依赖追踪（二分：知道什么条件下能复用），
          <code>watch + deep</code> 精确控制触发面（回溯剪枝：只跟踪关心的依赖）。<br/>
          工具没有绝对好坏，<strong>匹配问题特征</strong>才是关键。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">5</span>
          常见误区 —— 搜索概念最容易踩的坑
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 误区 1：「搜索空间」不等于「数据量」。</strong><br/>
          数组里有 10<sup>5</sup> 个元素，但「选一个子集」的搜索空间是 2<sup>100000</sup>。
          说「数据量小所以暴力没问题」前，先算的是<strong>候选解的个数</strong>，不是输入元素个数。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 误区 2：二分只能用在数组上。</strong><br/>
          二分的本质是「在<strong>单调</strong>的判定序列上对半找分界」，数组有序只是最常见的触发条件。
          单调函数上的「二分答案」、单调栈里隐式存在的单调性，都是同一思想。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 误区 3：回溯 = 纯暴力枚举。</strong><br/>
          回溯是「枚举 + <strong>剪枝</strong>」。没有剪枝的回溯确实等于暴力，
          但剪枝（提前判断「这棵子树不可能有解」）正是它和暴力拉开差距的地方。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 建立正确直觉：</strong>刷题时先问「这道题我在搜什么空间？」——
          搜位置（线性/二分/哈希）、搜值（二分答案）、还是搜方案（回溯/分支限界）。空间定错，算法必错。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">🎬</span>
          动画演示：暴力枚举与搜索空间增长
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          用二进制掩码枚举集合的全部子集。被选中的元素变绿，未选中的变灰——每一步是一个候选解。
          观察从 n=3 切到 n=4，<strong>搜索空间 2ⁿ 从 8 直接翻倍到 16</strong>。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 元素数 n = {{ n }}</span>
          <span class="bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-mono">🧮 搜索空间 = 2^{{ n }} = {{ space }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status || '点击「枚举全部子集」' }}</span>
          <span v-if="curSub" class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">第 {{ step }} 个候选：{{ curSub }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @click="doEnumerate" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">▶ 枚举全部子集</button>
          <button @click="setN(3)" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">n = 3（8 个候选）</button>
          <button @click="setN(4)" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">n = 4（16 个候选）</button>
          <button @click="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-text :config="{x:10, y:8, text:'集合 S 的每个元素（子集枚举时选中的变绿）:', fontSize:12, fontFamily:'monospace', fill:C.muted}" />
              <v-rect v-for="b in bars" :key="b.id" :config="chipCfg(b)" />
              <v-text v-for="b in bars" :key="'v'+b.id" :config="chipText(b)" />
              <v-text v-for="(b,i) in bars" :key="'i'+b.id" :config="chipIdx(i)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>两类搜索：</strong>结构内查找（查位置）vs 组合优化（搜方案），先分清再选工具</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>搜索空间</strong> = 候选解总数，组合爆炸（2ⁿ / n!）是 B 类搜索的敌人</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>四大范式</strong>是同一主线：线性（不裁剪）→ 二分（对半砍）→ 回溯（剪枝）→ 分支限界（加界剪枝）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>二分的前提是单调性</strong>，不限于数组——为 8-1 二分答案埋下伏笔</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>定位搜索空间是第一步</strong>：搜位置、搜值、还是搜方案，直接决定算法选型</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-4-more-sorts/dsa-7-4-7-introsort" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Timsort 与 Introsort</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-1-binary/dsa-8-1-1-classic" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：标准二分查找 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// ===== 🎬 暴力枚举动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H = ref(300), W = ref(700)
const G = 16, CW = 96, CH = 84, CY = 54
interface Chip { id: number; val: number; color: string; s?: number; _x?: number }
const bars = reactive<Chip[]>([])
const busy = ref(false), status = ref(''), nid = ref(100)
const n = ref(3), step = ref(0), space = ref(0), curSub = ref('')
const box = ref<HTMLDivElement>()

function setN(k: number) {
  if (busy.value) return
  n.value = k
  bars.length = 0
  for (let i = 1; i <= k; i++) bars.push({ id: i, val: i, color: C.cyan, s: 1 })
  step.value = 0; space.value = 1 << k; curSub.value = ''; status.value = ''
  layout()
}
function layout() {
  const bw = Math.min(CW, Math.floor((W.value - 30) / (bars.length || 1) - G))
  const total = bars.length * (bw + G) - G, sx = Math.max(10, (W.value - total) / 2)
  bars.forEach((b, i) => { b._x = sx + i * (bw + G) })
}
function chipCfg(b: any) {
  const bw = Math.min(CW, Math.floor((W.value - 30) / (bars.length || 1) - G))
  const isGhost = b.color === C.ghost
  return {
    x: b._x, y: CY, width: bw, height: CH, fill: b.color, cornerRadius: 10,
    stroke: isGhost ? 'transparent' : '#94a3b8', strokeWidth: 1,
    opacity: isGhost ? 0.35 : 1, scaleX: b.s ?? 1, scaleY: b.s ?? 1,
    shadowColor: isGhost ? 'transparent' : 'rgba(0,0,0,0.10)', shadowBlur: 4, shadowOffsetY: 2,
  }
}
function chipText(b: any) {
  const bw = Math.min(CW, Math.floor((W.value - 30) / (bars.length || 1) - G))
  return { x: b._x, y: CY, width: bw, height: CH, text: String(b.val), fontSize: 22,
    fontFamily: 'monospace', fontStyle: 'bold', fill: b.color === C.ghost ? '#94a3b8' : '#ffffff',
    align: 'center', verticalAlign: 'middle' }
}
function chipIdx(i: number) {
  const bw = Math.min(CW, Math.floor((W.value - 30) / (bars.length || 1) - G))
  return { x: (bars[i] as any)?._x || 0, y: CY + CH + 10, width: bw, text: 'S[' + i + ']',
    fontSize: 10, fontFamily: 'monospace', fill: C.muted, align: 'center' }
}
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

async function doEnumerate() {
  act('暴力枚举全部子集  O(2ⁿ)', async () => {
    const k = bars.length, total = 1 << k
    space.value = total
    for (let mask = 0; mask < total; mask++) {
      const sub: number[] = []
      bars.forEach((b, i) => {
        if (mask & (1 << i)) { b.color = C.green; b.s = 1.06; sub.push(b.val) }
        else { b.color = C.ghost; b.s = 0.92 }
      })
      step.value = mask + 1
      curSub.value = '{' + sub.join(', ') + '}'
      status.value = '枚举第 ' + (mask + 1) + ' / ' + total + ' 个候选'
      await d(240)
    }
    bars.forEach(b => { b.color = C.green; b.s = 1 })
    status.value = '搜索空间 = 2^' + k + ' = ' + total + ' 个候选全部枚举完成'
  })
}
function doReset() { setN(n.value) }

let ro: ResizeObserver | null = null
onMounted(() => {
  setN(3)
  if (box.value) {
    W.value = box.value.clientWidth; layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== navList =====
const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "两类搜索问题" },
  { id: "sec-2", name: "暴力枚举与搜索空间" },
  { id: "sec-3", name: "四大范式关系" },
  { id: "sec-4", name: "如何选择策略" },
  { id: "sec-5", name: "常见误区" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

const subsetsCode = `// ─── 暴力枚举：找出数组的所有子集（搜索空间 = 2^n）───
// 用 n 位二进制掩码表示「每个元素选或不选」
// mask 从 0 到 2^n-1，每个 mask 对应一个子集

function subsets(nums: number[]): number[][] {
    const res: number[][] = []
    const n = nums.length
    const total = 1 << n                  // 2^n 个子集

    for (let mask = 0; mask < total; mask++) {
        const cur: number[] = []
        for (let i = 0; i < n; i++) {
            if (mask & (1 << i)) cur.push(nums[i])  // 第 i 位是 1 → 选
        }
        res.push(cur)
    }
    return res
}

console.log(subsets([1, 2, 3]).length)     // 8
console.log(subsets([1, 2, 3, 4]).length)  // 16

// 输出：
// 8
// 16
// 元素从 3 变到 4，搜索空间从 8 翻倍到 16 —— 这就是 2^n 的爆炸式增长`

const combineCode = `// ─── 暴力枚举：从 n 个里选 k 个（组合 C(n,k)）───
// 经典做法：递归时只从 start 之后取值，保证不重不漏

function combine(n: number, k: number): number[][] {
    const res: number[][] = []

    function dfs(start: number, path: number[]) {
        if (path.length === k) {           // 凑够 k 个，记录一个候选
            res.push([...path])
            return
        }
        for (let i = start; i <= n; i++) { // 从 start 开始，避免出现重复组合
            path.push(i)
            dfs(i + 1, path)
            path.pop()                     // 回溯：撤销刚才的选择
        }
    }
    dfs(1, [])
    return res
}

console.log(combine(4, 2).length)  // C(4,2) = 6
console.log(combine(6, 3).length)  // C(6,3) = 20

// 输出：
// 6
// 20
// 注意：这里其实已经用到「回溯」的思想了 —— 见 8-2 回溯模板`

const strategyCode = `// ─── 如何选择搜索策略：决策清单 ───

// 1. 答案是一个位置 / 存在性？ → 结构内查找
//    - 无序线性结构  → 线性扫描 O(n)
//    - 有序 + 单调   → 二分 O(log n)
//    - 只问"是否存在" → 哈希 O(1)
// 2. 答案是"最大/最小可行值"且单调？ → 二分答案（8-1-2）
// 3. 答案是一个方案 / 组合？        → 回溯 DFS + 剪枝（8-2）
// 4. 求最优解且可估界？             → 分支限界（8-3）

type SearchContext = {
    isStructure: boolean   // 是否在已有结构里找
    sorted: boolean        // 结构是否有序 / 判定是否单调
    needOpt: boolean       // 是否要求最优解
    spaceSize: number      // 解空间规模估计
}

function chooseStrategy(ctx: SearchContext): string {
    if (ctx.isStructure) {
        return ctx.sorted ? '二分查找 O(log n)' : '线性扫描 O(n)'
    }
    if (!ctx.needOpt) return '暴力枚举 / 回溯（DFS + 剪枝）'
    if (ctx.spaceSize < 1_000_000) return '回溯 / 分支限界'
    return '贪心 / 启发式近似'
}`
</script>
