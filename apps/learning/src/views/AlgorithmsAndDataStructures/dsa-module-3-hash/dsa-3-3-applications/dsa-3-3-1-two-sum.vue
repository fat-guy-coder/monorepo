<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🎯 两数之和：哈希表的入门第一题</h1>
          <p class="text-sm text-slate-500 mt-1">LeetCode 第 1 题——从 O(n²) 暴力到 O(n) 哈希表一次遍历</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 3-3-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：两数之和
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          两数之和的精髓只有一句话：<strong>对每个元素 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">nums[i]</code>，
          计算它需要的另一半 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">complement = target - nums[i]</code>，
          然后去哈希表里查这个 complement 是否已经出现过</strong>。查到了就命中，没查到就把当前元素存进去，继续向后扫。
          整个过程只遍历一次，每次查询都是 O(1)。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 270" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ts-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
              </marker>
            </defs>

            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">哈希表一次遍历：nums = [2, 7, 11, 15]　target = 9</text>

            <!-- 数组元素 -->
            <text x="75" y="58" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">数组 nums</text>
            <rect x="40" y="70" width="70" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="75" y="95" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
            <rect x="126" y="70" width="70" height="50" rx="6" fill="#06b6d4" stroke="#f59e0b" stroke-width="2.5" />
            <text x="161" y="95" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
            <rect x="212" y="70" width="70" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="247" y="95" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">11</text>
            <rect x="298" y="70" width="70" height="50" rx="6" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
            <text x="333" y="95" text-anchor="middle" dominant-baseline="central" font-size="16" font-family="monospace" font-weight="bold" fill="#ffffff">15</text>

            <text x="75" y="136" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[0]</text>
            <text x="161" y="136" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#f59e0b" font-weight="bold">[1]</text>
            <text x="247" y="136" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[2]</text>
            <text x="333" y="136" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">[3]</text>

            <text x="161" y="164" text-anchor="middle" font-size="10" font-family="monospace" fill="#f59e0b" font-weight="bold">↑ 正在处理 nums[1]</text>

            <!-- 哈希表 seen -->
            <rect x="470" y="62" width="230" height="130" rx="8" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" />
            <text x="585" y="84" text-anchor="middle" font-size="12" font-family="monospace" fill="#334155" font-weight="bold">哈希表 seen（值→下标）</text>
            <rect x="484" y="96" width="202" height="32" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
            <text x="585" y="112" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">2 → 0</text>
            <rect x="484" y="136" width="202" height="32" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1" />
            <text x="585" y="152" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#94a3b8">（空桶）</text>

            <!-- 箭头 nums[1] → seen bucket 0 -->
            <line x1="196" y1="95" x2="484" y2="112" stroke="#f59e0b" stroke-width="2" marker-end="url(#ts-arr)" />
            <text x="340" y="86" text-anchor="middle" font-size="11" font-family="monospace" fill="#f59e0b" font-weight="bold">complement = 9 - 7 = 2</text>

            <text x="16" y="226" font-size="11" font-family="monospace" fill="#0891b2">complement = target - nums[i]　→　查 seen 是否命中 → 命中返回 [0,1]，否则存入 seen</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：两数之和哈希表解法 —— 遍历时计算 complement，查哈希表 O(1) 命中</figcaption>
        </figure>

        <h3 class="text-sm font-semibold text-slate-700 mb-2">执行流程：两步命中</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">第 1 步：nums[0]=2，未命中 → 存入</p>
            <svg viewBox="0 0 320 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <text x="16" y="22" font-size="12" font-family="monospace" fill="#334155" font-weight="bold">第 1 步：nums[0] = 2</text>
              <rect x="40" y="40" width="54" height="44" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="67" y="62" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="150" y="34" width="150" height="60" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" />
              <text x="225" y="54" text-anchor="middle" font-size="11" font-family="monospace" fill="#334155" font-weight="bold">seen（空）</text>
              <text x="225" y="74" text-anchor="middle" font-size="11" font-family="monospace" fill="#94a3b8">还没有 7</text>
              <text x="16" y="122" font-size="11" font-family="monospace" fill="#f59e0b">complement = 9 - 2 = 7 → 未命中</text>
              <text x="16" y="140" font-size="11" font-family="monospace" fill="#0891b2">→ 存入 seen: { 2→0 }</text>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">第 2 步：nums[1]=7，命中 → 返回</p>
            <svg viewBox="0 0 320 150" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ts-arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" />
                </marker>
              </defs>
              <text x="16" y="22" font-size="12" font-family="monospace" fill="#334155" font-weight="bold">第 2 步：nums[1] = 7</text>
              <rect x="40" y="40" width="54" height="44" rx="6" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
              <text x="67" y="62" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">7</text>
              <line x1="94" y1="62" x2="156" y2="58" stroke="#4ade80" stroke-width="2" marker-end="url(#ts-arr2)" />
              <rect x="150" y="34" width="150" height="60" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" />
              <rect x="160" y="46" width="130" height="30" rx="6" fill="#4ade80" stroke="#22c55e" stroke-width="2" />
              <text x="225" y="61" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0f172a">2 → 0</text>
              <text x="16" y="122" font-size="11" font-family="monospace" fill="#f59e0b">complement = 9 - 7 = 2 → 命中！</text>
              <text x="16" y="140" font-size="11" font-family="monospace" fill="#16a34a">→ 返回 [0, 1] ✅</text>
            </svg>
          </figure>
        </div>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          问题描述 —— LeetCode 第 1 题
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>两数之和（Two Sum）</strong>是 LeetCode 上的第 1 道题，也是大多数人刷算法的第一道题。
          题目看起来极其简单，但它完美诠释了哈希表的核心价值——<strong>用空间换时间</strong>。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>题目：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">•</span><span>给定整数数组 <code>nums</code> 和整数目标值 <code>target</code></span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">•</span><span>找出数组中<strong>和等于 target</strong> 的两个整数，返回它们的<strong>下标</strong></span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">•</span><span>假设<strong>每组输入恰好只有一个解</strong>，且同一个元素<strong>不能使用两次</strong></span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">•</span><span>可以按任意顺序返回答案</span></li>
          </ul>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          示例：<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">nums = [2, 7, 11, 15], target = 9</code>，
          因为 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">nums[0] + nums[1] = 2 + 7 = 9</code>，返回 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">[0, 1]</code>。
        </p>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          暴力双重循环 —— O(n²) 的朴素解法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          最直观的解法是<strong>枚举所有数对</strong>：固定第一个数，遍历它后面的所有数，看两数之和是否等于 target。
          这需要两层循环，共检查 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">C(n,2) = n(n-1)/2</code> 对数，时间复杂度 O(n²)。
        </p>
        <div class="mb-4"><Code language="ts" :code="twoSumBruteCode" title="two_sum_brute.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 为什么暴力解不够好：</strong>当 n = 10<sup>4</sup> 时，需要检查约 5000 万对数；n = 10<sup>5</sup> 时接近 50 亿对。<br/>
          对于大数据量，O(n²) 会直接超时。而哈希表解法的 O(n) 能轻松处理百万级数据。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          哈希表一次遍历 —— O(n) 的核心技巧
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          关键洞察：我们不需要「两两比较」。对于当前元素 <code>num</code>，只需要判断
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">target - num</code> 是否已经在前面出现过。
          于是用一个<strong>哈希表记录「值 → 下标」</strong>，每走一步先查后存，一次遍历搞定。
        </p>
        <div class="mb-4"><Code language="ts" :code="twoSumHashCode" title="two_sum_hash.ts" /></div>
        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">执行流程拆解（边查边存）</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>遍历到 <code>nums[i]</code>，计算 <code>complement = target - nums[i]</code></li>
          <li>查哈希表 <code>seen</code>：<code>complement</code> 是否存在？</li>
          <li><strong>存在</strong> → 说明之前遇到过它的「另一半」，直接返回 <code>[seen.get(complement), i]</code></li>
          <li><strong>不存在</strong> → 把当前 <code>nums[i] → i</code> 存入 <code>seen</code>，继续向后扫</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          两数之和的「边查边存」就像前端做<strong>「账号是否已注册」校验</strong>——把已注册邮箱放进一个 <code>Set</code> 里，
          每来一个新邮箱就 O(1) 查一次，而不是遍历整个用户列表逐个比对（O(n)）。<br/>
          也可以类比 <code>useMemo</code>：第一次算出来的结果缓存起来，之后直接命中缓存，不用重复计算。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          变体与扩展 —— 从两数到多数、从下标到布尔
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          两数之和有一大堆变体，面试时经常被追问。核心思想不变，但返回值和数据结构选择会变：
        </p>
        <div class="mb-4"><Code language="ts" :code="variantsCode" title="two_sum_variants.ts" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">变体</th><th class="px-4 py-2 border border-slate-200 font-semibold">返回值</th><th class="px-4 py-2 border border-slate-200 font-semibold">数据结构</th><th class="px-4 py-2 border border-slate-200 font-semibold">复杂度</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">两数之和（经典）</td><td class="px-4 py-2 border">下标 [i, j]</td><td class="px-4 py-2 border font-mono">Map&lt;value, index&gt;</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n)</td></tr>
              <tr><td class="px-4 py-2 border">是否存在</td><td class="px-4 py-2 border">布尔 boolean</td><td class="px-4 py-2 border font-mono">Set&lt;value&gt;</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n)</td></tr>
              <tr><td class="px-4 py-2 border">所有数对</td><td class="px-4 py-2 border">数对数组 [][]</td><td class="px-4 py-2 border font-mono">Map&lt;value, count&gt;</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n)</td></tr>
              <tr><td class="px-4 py-2 border">三数之和（3Sum）</td><td class="px-4 py-2 border">三元组 [][][]</td><td class="px-4 py-2 border font-mono">固定一数 + Set</td><td class="px-4 py-2 border font-mono text-emerald-600">O(n²)</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 经验法则：</strong><br/>
          返回<strong>下标</strong> → 用 <code>Map</code>（必须保留 value→index 映射）；<br/>
          返回<strong>布尔</strong> → 用 <code>Set</code>（最省内存）；<br/>
          返回<strong>所有数对且要处理重复</strong> → 用 <code>Map&lt;value, count&gt;</code> 计数，或用排序 + 双指针。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          常见错误与面试考察点
        </h2>
        <div class="mb-4"><Code language="ts" :code="pitfallsCode" title="two_sum_pitfalls.ts" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见陷阱：</strong><br/>
          1. <strong>先建完整 Map 再查找</strong>，遇到 <code>target = 6, nums = [3]</code> 这类情况会「自己匹配自己」返回 <code>[0, 0]</code>。<br/>
          2. <strong>忽略重复元素</strong>：<code>nums = [3, 3]</code> 的正确解是 <code>[0, 1]</code>，先建 Map 会被覆盖。<br/>
          3. <strong>complement 算错</strong>：记住是 <code>target - nums[i]</code>，不是相加，也不是反着减。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 面试官真正想考察的：</strong><br/>
          1. 能否识别出这是「查找问题」，用哈希表把内层查找从 O(n) 降到 O(1)；<br/>
          2. 是否理解「空间换时间」的权衡——O(n) 时间 + O(n) 空间 vs O(n²) 时间 + O(1) 空间；<br/>
          3. 边查边存 vs 先建后查，能否正确处理重复元素和「自己匹配自己」；<br/>
          4. 追问 3Sum / 4Sum / 返回所有对时，能否平滑扩展思路。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🎬</span>
          动画演示：两数之和
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          点击「两数之和」观察哈希表一次遍历：每个元素先高亮（橙色），计算 complement 后查哈希表（顶部绿色 chips），命中则两个元素同时变绿。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 n: {{ bars.length }}</span>
          <span class="bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-mono">🎯 target = {{ target }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status || '点击「两数之和」看一次遍历' }}</span>
          <span v-if="result" class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">{{ result }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @click="doTwoSum" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">🔍 两数之和</button>
          <button @click="randomize" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">🎲 随机数据</button>
          <button @click="initData" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-text :config="{x:10, y:8, text:'哈希表 seen（值→下标）:', fontSize:12, fontFamily:'monospace', fill:C.muted}" />
              <v-rect v-for="(e,i) in seen" :key="'s'+i" :config="seenRect(e)" />
              <v-text v-for="(e,i) in seen" :key="'st'+i" :config="seenText(e)" />
              <v-rect v-for="b in bars" :key="b.id" :config="rectCfg(b)" />
              <v-text v-for="b in bars" :key="'v'+b.id" :config="valCfg(b)" />
              <v-text v-for="(b,i) in bars" :key="'i'+b.id" :config="idxCfg(i)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>两数之和 = 查找问题</strong>，用哈希表把内层查找从 O(n) 降到 O(1)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>核心公式：</strong><code>complement = target - nums[i]</code>，先查后存、一次遍历 O(n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>暴力解 O(n²)</strong> 枚举所有数对，数据量大时直接超时</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>空间换时间：</strong>O(n) 时间 + O(n) 空间 vs O(n²) 时间 + O(1) 空间</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>变体扩展：</strong>返回下标用 Map，返回布尔用 Set，3Sum 固定一数退化成 Two Sum</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>警惕「自己匹配自己」</strong>和重复元素，务必边查边存</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-2-collision/dsa-3-2-3-robin-hood" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Robin Hood 哈希</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-3-hash/dsa-3-3-applications/dsa-3-3-2-dedup" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：去重与计数 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// ===== 🎬 两数之和动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0' }
const H = ref(320), W = ref(700), BW = 54, G = 9, MXH = 170, BASE = 285
const CHW = 74, CH = 24, CHG = 6, CY = 26
interface Bar { id: number; val: number; color: string; s?: number; _x?: number; _y?: number; _h?: number }
interface Seen { val: number; idx: number; _x?: number }
const bars = reactive<Bar[]>([])
const seen = reactive<Seen[]>([])
const busy = ref(false), status = ref(''), nid = ref(100)
const target = ref(9), result = ref('')
const box = ref<HTMLDivElement>()
const sh = (v: number) => Math.max(4, v)

function layout() {
  const total = bars.length * (BW + G) - G, sx = Math.max(10, (W.value - total) / 2)
  const maxV = Math.max(...bars.map(b => b.val), 1)
  bars.forEach((b, i) => {
    b._x = sx + i * (BW + G)
    b._h = Math.max(30, (b.val / maxV) * MXH)
    b._y = BASE - (b._h || 30)
  })
  seen.forEach((e, i) => { e._x = 10 + i * (CHW + CHG) })
}
function rectCfg(b: any) {
  const s = b.s ?? 1; const isGhost = b.color === C.ghost
  return {
    x: b._x + (BW * (1 - s)) / 2, y: b._y, width: BW * s, height: sh(b._h || 30) * s,
    fill: b.color, cornerRadius: [4, 4, 0, 0],
    stroke: isGhost ? 'transparent' : '#94a3b8', strokeWidth: isGhost ? 0 : 1,
    shadowColor: isGhost ? 'transparent' : 'rgba(0,0,0,0.12)', shadowBlur: isGhost ? 0 : 6, shadowOffsetY: isGhost ? 0 : 2,
    opacity: isGhost ? 0 : 1,
  }
}
function valCfg(b: any) {
  const s = b.s ?? 1; const h = sh(b._h || 30) * s
  return { x: b._x + (BW * (1 - s)) / 2, y: b._y + 2, width: BW * s, height: h - 4, text: h > 20 ? String(b.val) : '', fontSize: Math.round(14 * s), fontFamily: 'monospace', fontStyle: 'bold', fill: h > 32 ? '#fff' : C.text, align: 'center', verticalAlign: 'middle' }
}
function idxCfg(i: number) { return { x: (bars[i] as any)?._x || 0, y: BASE + 6, width: BW, text: '[' + i + ']', fontSize: 10, fontFamily: 'monospace', fill: C.muted, align: 'center' } }
function seenRect(e: any) { return { x: e._x, y: CY, width: CHW, height: CH, fill: '#e0f2fe', cornerRadius: 6, stroke: '#0891b2', strokeWidth: 1.2 } }
function seenText(e: any) { return { x: e._x, y: CY, width: CHW, height: CH, text: e.val + '→' + e.idx, fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: '#0e7490', align: 'center', verticalAlign: 'middle' } }
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

function initData() {
  bars.length = 0; seen.length = 0; result.value = ''
  const data = [2, 7, 11, 15]
  data.forEach((v, i) => bars.push({ id: i + 1, val: v, color: C.cyan, s: 1 }))
  target.value = 9
  layout()
}
function randomize() {
  bars.length = 0; seen.length = 0; result.value = ''
  const n = 6
  for (let i = 0; i < n; i++) bars.push({ id: i + 1, val: Math.floor(Math.random() * 18) + 1, color: C.cyan, s: 1 })
  let i = Math.floor(Math.random() * n), j = Math.floor(Math.random() * n)
  while (j === i) j = Math.floor(Math.random() * n)
  target.value = bars[i].val + bars[j].val
  layout()
}

async function doTwoSum() {
  if (busy.value) return
  act('Two Sum  O(n)  哈希表边查边存', async () => {
    seen.length = 0; result.value = ''
    bars.forEach(b => { b.color = C.cyan; b.s = 1 })
    layout()
    let found = false
    for (let i = 0; i < bars.length; i++) {
      const num = bars[i].val
      const comp = target.value - num
      bars[i].color = C.orange; bars[i].s = 1.1
      status.value = '检查 nums[' + i + ']=' + num + '，complement=' + comp
      layout(); await d(500)

      const hit = seen.find(e => e.val === comp)
      if (hit) {
        bars[i].color = C.green; bars[i].s = 1.1
        bars[hit.idx].color = C.green; bars[hit.idx].s = 1.1
        layout()
        result.value = '✅ 命中：nums[' + hit.idx + '] + nums[' + i + '] = ' + comp + ' + ' + num + ' = ' + target.value
        status.value = ''
        found = true
        break
      }
      seen.push({ val: num, idx: i })
      layout(); await d(250)
      bars[i].color = C.cyan; bars[i].s = 1
      layout(); await d(150)
    }
    if (!found) result.value = '❌ 未找到和为 ' + target.value + ' 的一对数'
    bars.forEach(b => { b.s = 1 })
  })
}

let ro: ResizeObserver | null = null
onMounted(() => {
  initData()
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
  { id: "sec-1", name: "问题描述" },
  { id: "sec-2", name: "暴力双重循环" },
  { id: "sec-3", name: "哈希表一次遍历" },
  { id: "sec-4", name: "变体与扩展" },
  { id: "sec-5", name: "常见错误与面试" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

const twoSumBruteCode = `// ─── 两数之和（Two Sum）─ LeetCode 第 1 题 ───
// 给定数组 nums 和目标值 target，找出两个数，使它们的和等于 target
// 返回这两个数的下标（0-based），每组输入恰好只有一个解

// 示例
// nums = [2, 7, 11, 15], target = 9
// 输出: [0, 1]  因为 nums[0] + nums[1] = 2 + 7 = 9

// ─── 解法一：暴力双重循环  O(n²) / O(1) ───
function twoSumBrute(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }
    return []
}

console.log(twoSumBrute([2, 7, 11, 15], 9))   // [0, 1]

// 复杂度分析：
// 时间 O(n²)：两层循环，一共检查 C(n,2) = n(n-1)/2 对
// 空间 O(1)：只用了几个临时变量
// 当 n = 10^4 时，需要检查约 5000 万对，太慢了`

const twoSumHashCode = `// ─── 解法二：哈希表一次遍历  O(n) / O(n) ───
// 核心思想：对当前元素 num，需要的"另一半"是 complement = target - num
// 如果 complement 已经在哈希表里出现过，就立刻返回答案
// 否则把当前元素 num → index 存入哈希表，继续向后扫

function twoSum(nums: number[], target: number): number[] {
    const seen = new Map<number, number>()  // value → index

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i]

        // 边查边存：先查 complement 是否已经出现
        if (seen.has(complement)) {
            return [seen.get(complement)!, i]
        }
        // 没查到，把当前元素存进去，供后面的元素查询
        seen.set(nums[i], i)
    }
    return []
}

// ─── 执行过程（nums = [2,7,11,15], target = 9）───
// i=0: num=2, complement=7, 查 seen={} 未命中 → seen={2→0}
// i=1: num=7, complement=2, 查 seen={2→0} 命中 → 返回 [0,1] ✅

// 复杂度：
// 时间 O(n)：每个元素只被处理一次，Map 的 get/set 均摊 O(1)
// 空间 O(n)：最坏情况把所有元素都存进 Map

console.log(twoSum([2, 7, 11, 15], 9))   // [0, 1]
console.log(twoSum([3, 2, 4], 6))        // [1, 2]
console.log(twoSum([3, 3], 6))           // [0, 1]（重复元素也能正确处理）`

const variantsCode = `// ─── 变体 1：返回布尔值（是否存在） ───
// 不需要下标时，用 Set 更简洁
function hasTwoSum(nums: number[], target: number): boolean {
    const seen = new Set<number>()
    for (const num of nums) {
        if (seen.has(target - num)) return true
        seen.add(num)
    }
    return false
}

// ─── 变体 2：返回所有不重复的数对（值，非下标） ───
function allTwoSums(nums: number[], target: number): number[][] {
    const res: number[][] = []
    const count = new Map<number, number>()   // 记录每个值出现的次数
    for (const num of nums) {
        const comp = target - num
        if (count.has(comp)) {
            res.push([comp, num])
            // 用掉一个 complement，避免重复配对
            if (count.get(comp)! === 1) count.delete(comp)
            else count.set(comp, count.get(comp)! - 1)
        } else {
            count.set(num, (count.get(num) ?? 0) + 1)
        }
    }
    return res
}

// ─── 变体 3：三数之和（3Sum） O(n²) ───
// 固定一个数，剩下两个数退化成 Two Sum
function threeSum(nums: number[], target: number): number[][] {
    const res: number[][] = []
    for (let i = 0; i < nums.length - 2; i++) {
        const seen = new Set<number>()
        for (let j = i + 1; j < nums.length; j++) {
            const comp = target - nums[i] - nums[j]
            if (seen.has(comp)) res.push([nums[i], nums[j], comp])
            seen.add(nums[j])
        }
    }
    return res
}

// ─── 变体 4：返回值 vs 返回下标 vs 返回布尔 ───
// 返回下标：必须用 Map（value→index），下标信息必须保留
// 返回布尔：用 Set 即可，最省内存
// 返回所有对：需要计数（Map value→count）或排序 + 双指针`

const pitfallsCode = `// ─── 错误 1：先建完整 Map，再找，导致"自己匹配自己" ───
function twoSumWrong(nums: number[], target: number): number[] {
    const map = new Map<number, number>()
    nums.forEach((v, i) => map.set(v, i))  // 先全部存进去

    for (let i = 0; i < nums.length; i++) {
        const comp = target - nums[i]
        // ❌ target=6, nums=[3,...] 时，comp=3，可能返回 [0,0]（自己和自己）
        if (map.has(comp)) return [i, map.get(comp)!]
    }
    return []
}
// 正确做法：边查边存，或先查再加一个 map.get(comp) !== i 的判断

// ─── 错误 2：忽略重复元素 ───
// nums=[3,3], target=6 → 正确答案是 [0,1]
// 如果先建完整 Map，Map 只会保留 3→1（后面的覆盖前面），会漏掉 [0]

// ─── 错误 3：把 complement 算错 ───
// complement = target - nums[i]（不是 target + nums[i]，不是 nums[i] - target）

// ─── 面试考察点 ───
// 1. 能否从 O(n²) 优化到 O(n)？核心是"用空间换时间"
// 2. 为什么哈希表能把查找从 O(n) 降到 O(1)？→ 见模块 3-1 哈希函数
// 3. 一次遍历 vs 两次遍历的边界处理（重复元素、自己匹配自己）
// 4. 变体扩展：3Sum、4Sum、有重复、返回所有对`
</script>
