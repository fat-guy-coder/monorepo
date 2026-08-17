<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📊 排序总览：稳定性与分类</h1>
          <p class="text-sm text-slate-500 mt-1">一张表看懂 17 种排序 —— 复杂度、稳定性、适用场景</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 7-0-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：把「无序」重排为「有序」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>排序</strong>：把一组元素按某个<strong>关键字（key）</strong>从小到大（或从大到小）重排，
          不增删元素、只改变顺序。下图展示排序的输入输出模型：乱序数组 → 排序算法（比较/非比较/混合）
          → 有序数组；底部示意<strong>稳定性</strong>——两条 key 相等的记录（柱高相同，标签 A/B），
          稳定排序保持 A 在 B 前，不稳定排序可能让 B 跑到 A 前。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ov-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#0891b2" />
              </marker>
            </defs>
            <text x="16" y="20" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">排序的本质：把「无序」重排为「有序」—— 不增删元素，只改变顺序</text>

            <!-- 输入：无序数组 -->
            <rect x="24" y="58" width="180" height="92" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
            <text x="114" y="76" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">输入：无序数组</text>
            <rect x="42" y="96" width="34" height="40" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="59" y="116" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">5</text>
            <rect x="88" y="112" width="34" height="24" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="105" y="124" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">3</text>
            <rect x="134" y="72" width="34" height="64" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="151" y="104" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>

            <!-- 箭头 -->
            <line x1="206" y1="104" x2="272" y2="104" stroke="#0891b2" stroke-width="2" marker-end="url(#ov-arr)" />

            <!-- 排序算法 -->
            <rect x="276" y="56" width="176" height="96" rx="10" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.5" />
            <text x="364" y="76" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#0891b2">排序算法</text>
            <text x="364" y="94" text-anchor="middle" font-size="10" font-family="monospace" fill="#334155">比较：冒泡 / 快排 / 归并 / 堆</text>
            <text x="364" y="108" text-anchor="middle" font-size="10" font-family="monospace" fill="#334155">非比较：计数 / 基数 / 桶</text>
            <text x="364" y="122" text-anchor="middle" font-size="10" font-family="monospace" fill="#334155">混合：TimSort / 内省排序</text>

            <!-- 箭头 -->
            <line x1="454" y1="104" x2="520" y2="104" stroke="#0891b2" stroke-width="2" marker-end="url(#ov-arr)" />

            <!-- 输出：有序数组 -->
            <rect x="524" y="58" width="180" height="92" rx="10" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5" />
            <text x="614" y="76" text-anchor="middle" font-size="11" font-family="monospace" fill="#16a34a">输出：有序数组</text>
            <rect x="542" y="112" width="34" height="24" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" rx="3" />
            <text x="559" y="124" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">3</text>
            <rect x="588" y="96" width="34" height="40" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" rx="3" />
            <text x="605" y="116" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">5</text>
            <rect x="634" y="72" width="34" height="64" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" rx="3" />
            <text x="651" y="104" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">8</text>

            <!-- 稳定性 -->
            <text x="16" y="176" font-size="11" font-family="monospace" fill="#64748b">稳定性：key 相等的记录，排序后相对顺序不变（柱高相同 = key 相等，标签 A/B 区分身份）</text>
            <rect x="34" y="186" width="40" height="52" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="54" y="212" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">3A</text>
            <rect x="84" y="186" width="40" height="52" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" rx="3" />
            <text x="104" y="212" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">3B</text>
            <line x1="128" y1="206" x2="192" y2="206" stroke="#16a34a" stroke-width="2" marker-end="url(#ov-arr)" />
            <line x1="128" y1="228" x2="396" y2="228" stroke="#ef4444" stroke-width="2" marker-end="url(#ov-arr)" />
            <rect x="196" y="176" width="170" height="60" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5" />
            <text x="281" y="206" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#16a34a">稳定排序：A 仍在 B 前 ✓</text>
            <rect x="400" y="176" width="170" height="60" rx="8" fill="#fef2f2" stroke="#ef4444" stroke-width="1.5" />
            <text x="485" y="206" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#dc2626">不稳定：B 可能跑到 A 前 ✗</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：排序的输入/输出模型 —— 同一份数据，不同算法给出相同的有序结果，但「稳定性」与「复杂度」不同</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：比较/交换（或计数/桶）→ 有序输出，稳定性决定相等 key 的命运</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">稳定排序（插入排序）：相等 key 保持原先后顺序</p>
            <svg viewBox="0 0 300 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ov-a1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a" />
                </marker>
              </defs>
              <text x="8" y="16" font-size="10" font-family="monospace" fill="#64748b">排序前</text>
              <rect x="10" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="30" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">3A</text>
              <rect x="58" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="78" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="106" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="126" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">3B</text>
              <rect x="154" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="174" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <line x1="140" y1="60" x2="140" y2="80" stroke="#16a34a" stroke-width="2" marker-end="url(#ov-a1)" />
              <text x="8" y="96" font-size="10" font-family="monospace" fill="#64748b">排序后</text>
              <rect x="10" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="30" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="58" y="106" width="40" height="26" rx="3" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" />
              <text x="78" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">3A</text>
              <rect x="106" y="106" width="40" height="26" rx="3" fill="#4ade80" stroke="#16a34a" stroke-width="1.5" />
              <text x="126" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#0f172a">3B</text>
              <rect x="154" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="174" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <text x="8" y="152" font-size="10" font-family="monospace" font-weight="bold" fill="#16a34a">3A 仍在 3B 前面 ✓（顺序保持）</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">稳定排序：相等 key 的 3A / 3B 保持原来的先后顺序</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">不稳定排序（选择排序）：交换时可能打乱相等 key 的顺序</p>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ov-a2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                </marker>
              </defs>
              <text x="8" y="16" font-size="10" font-family="monospace" fill="#64748b">排序前</text>
              <rect x="10" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="30" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">3A</text>
              <rect x="58" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="78" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <rect x="106" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="126" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">3B</text>
              <rect x="154" y="26" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="174" y="39" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <line x1="140" y1="60" x2="140" y2="80" stroke="#ef4444" stroke-width="2" marker-end="url(#ov-a2)" />
              <text x="8" y="96" font-size="10" font-family="monospace" fill="#64748b">排序后</text>
              <rect x="10" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="30" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">2</text>
              <rect x="58" y="106" width="40" height="26" rx="3" fill="#ef4444" stroke="#dc2626" stroke-width="1.5" />
              <text x="78" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">3B</text>
              <rect x="106" y="106" width="40" height="26" rx="3" fill="#ef4444" stroke="#dc2626" stroke-width="1.5" />
              <text x="126" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">3A</text>
              <rect x="154" y="106" width="40" height="26" rx="3" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5" />
              <text x="174" y="119" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" font-weight="bold" fill="#ffffff">8</text>
              <text x="8" y="152" font-size="10" font-family="monospace" font-weight="bold" fill="#dc2626">3B 跑到 3A 前面 ✗（顺序颠倒）</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">不稳定排序：交换式移动可能让后面的 3B 越过 3A</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 为什么排序重要 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          为什么排序重要
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          排序是计算机科学里<strong>最基础也最常用</strong>的操作之一。它的价值不止于「把列表排整齐」——
          排序让很多难题瞬间变简单：<strong>二分查找</strong>要求有序、<strong>Top-K</strong> 可以只排一部分、
          <strong>去重</strong>在有序数组上只需扫一遍、<strong>归并</strong>把两个有序段线性合并。
          数据库的 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">ORDER BY</code>、
          前端的表格列排序、排行榜、日志按时间倒序，全都是排序的日常应用。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>排序是<strong>二分查找 / 去重 / 归并 / Top-K</strong> 等算法的前置条件（有序才能 O(log n) 查找）</li>
          <li>排序是理解<strong>复杂度分析、分治、堆、稳定性、算法下界</strong>的最佳入门素材</li>
          <li>排序是<strong>前端高频操作</strong>：表格列排序、下拉选项、消息按时间倒序、拖拽后重排</li>
          <li>排序是<strong>面试必考</strong>：手写快排/归并，辨析稳定性与最坏情况</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          排序 ≈ <strong>整理书架 / 洗扑克牌</strong>：把打乱的书按高度摆齐（升序）或按借阅频率排（自定义 key）。<br/>
          有序之后的好处 ≈ <strong>图书馆检索</strong>：书按编号排好，找一本书才能「对半翻」——这就是二分查找。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>JavaScript 内置的 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">Array.prototype.sort()</code>
          在 V8 中用的是 TimSort（稳定、混合排序）；但默认按<strong>字符串</strong>比较——数字排序必须传比较函数 <code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono">(a,b) =&gt; a - b</code>。</p>
        </aside>
      </section>

      <!-- 2. 三大分类 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          排序的三大分类：比较 / 非比较 / 混合
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>比较排序</strong>：任意两个元素都能两两比大小，通过比较+交换（或移动）完成排序——冒泡、快排、归并、堆都属于这一类。
          一个深刻的结论：<strong>比较排序的平均复杂度下界是 O(n log n)</strong>（决策树模型），不可能更快。<br/>
          <strong>非比较排序</strong>：不靠「比大小」，而是利用 key 的<strong>取值结构</strong>——计数排序用「值→下标」直接落位、
          基数排序按位分桶、桶排序把值散进若干个桶——在整数/小数分布已知时可达<strong>线性 O(n+k)</strong>。<br/>
          <strong>混合排序</strong>：把两种思路（或多种比较排序）结合，取长补短——TimSort（插入+归并）是 Python/Java/JS 的内置排序，
          内省排序（快排+堆+插入）是 C++ <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">std::sort</code> 的默认实现。
        </p>
        <div class="mb-4"><Code language="ts" :code="sortClassCode" title="sort_classification.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          比较排序 ≈ <strong>两两猜拳决定名次</strong>：任何人之间都能比出高下，但每比一次都有成本（比较开销）。<br/>
          非比较排序 ≈ <strong>按身高直接站队</strong>：不看「谁比谁高」，直接量身高放进对应刻度——量一次（O(1)）就定位，
          所以能线性完成。<br/>
          混合排序 ≈ <strong>先粗分再精排</strong>：像教务先把学生按班级分组（桶），组内再用插值排序（比较）收尾。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 1：以为「非比较排序一定更快」</strong><br/>
          计数/基数/桶排序的线性复杂度依赖<strong>key 的取值范围与结构</strong>：整数小范围、定长位数、分布均匀。
          对任意随机浮点数、字符串，非比较排序无法直接使用——此时比较排序（快排/归并）才是正解。
          复杂度公式里的 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">k</code>（值域）可能远大于 n，O(n+k) 并不总是优于 O(n log n)。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 2：把「选择类算法」当成排序</strong><br/>
          快速选择（QuickSelect）、中位数之中位数（Median of Medians）是<strong>选择算法</strong>：只找出第 k 小/中位数，
          并不把整个数组排好（部分有序）。它们的平均复杂度是 O(n)，比任何排序都快——但要的是「第 k 小」，不是「全排序」。</p>
        </aside>
      </section>

      <!-- 3. 稳定性 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          稳定性：相等 key 的相对顺序是否保持
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>稳定</strong>：排序前后，key 相等的元素<strong>相对顺序不变</strong>。判断口诀——
          看算法在比较相等时<strong>会不会把两个相等的元素交换或远距离移动</strong>：<br/>
          冒泡/插入/归并/计数/基数/桶 → 稳定（相等不交换，逐个搬运）；<br/>
          选择/希尔/快排/堆/梳 → 不稳定（交换式移动可能跨过相等的元素）。<br/>
          稳定性的意义在于<strong>多关键字排序</strong>：先按主 key 排，再按次 key 排——只有稳定排序才能让第二次排序「不破坏」第一次的结果。
        </p>
        <div class="mb-4"><Code language="ts" :code="stableVsUnstableCode" title="stability_demo.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          稳定排序 ≈ <strong>「先到先得」的排队</strong>：两个同分选手，先来的排前面，后来者绝不插队。<br/>
          不稳定排序 ≈ <strong>「后来者插队」</strong>：同样的分数，后来的可能因为一次远距离交换冲到前面。<br/>
          多关键字排序 ≈ <strong>Excel 多列排序</strong>：先按「部门」排，再按「入职时间」排——第二列排序不能打乱第一列的分组顺序，
          这正是稳定性的用武之地（前端表格点列头多级排序同理）。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：以为「相等时不交换就稳定」</strong><br/>
          选择排序即使只在 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">r[j] &lt; r[min]</code>（严格小于）时才更新最小值，
          仍可能不稳定：把最小元素与队首交换时，会把队首元素<strong>甩到数组后面</strong>，恰好越过某个相等元素——顺序被颠倒。
          稳定性要看<strong>整体移动模式</strong>，不是单看比较条件。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：需要稳定却选错算法</strong><br/>
          场景「按销量降序，销量相同保持上架先后」必须用<strong>稳定排序</strong>（归并/TimSort）。
          选了快排或堆排，同销量的商品顺序会随机乱跳，用户会看到列表「不稳定地闪动」。</p>
        </aside>
      </section>

      <!-- 4. 复杂度全景对比表 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          复杂度全景对比表（本模块 17 种算法）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          下表覆盖本模块全部算法。n 为元素个数，k 为非比较排序的<strong>值域</strong>（计数/桶）或<strong>最大位数×进制</strong>（基数）。
          「稳定」列打勾表示相等 key 相对顺序不变。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-xs text-slate-600">
            <thead>
              <tr class="bg-slate-100 text-slate-700">
                <th class="px-2 py-2 text-left font-semibold rounded-l-lg">算法</th>
                <th class="px-2 py-2 text-left font-semibold">最好</th>
                <th class="px-2 py-2 text-left font-semibold">平均</th>
                <th class="px-2 py-2 text-left font-semibold">最坏</th>
                <th class="px-2 py-2 text-left font-semibold">空间</th>
                <th class="px-2 py-2 text-left font-semibold">稳定</th>
                <th class="px-2 py-2 text-left font-semibold rounded-r-lg">一句话点评</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-cyan-50/60">
                <td colspan="7" class="px-2 py-1.5 font-semibold text-cyan-800">🆚 比较排序（平均下界 O(n log n)）</td>
              </tr>
              <tr class="border-b border-slate-100"><td class="px-2 py-1.5">冒泡排序</td><td class="px-2 py-1.5 font-mono">O(n)</td><td class="px-2 py-1.5 font-mono">O(n²)</td><td class="px-2 py-1.5 font-mono">O(n²)</td><td class="px-2 py-1.5 font-mono">O(1)</td><td class="px-2 py-1.5">✅</td><td class="px-2 py-1.5">简单直观，可提前终止</td></tr>
              <tr class="border-b border-slate-100"><td class="px-2 py-1.5">鸡尾酒排序</td><td class="px-2 py-1.5 font-mono">O(n)</td><td class="px-2 py-1.5 font-mono">O(n²)</td><td class="px-2 py-1.5 font-mono">O(n²)</td><td class="px-2 py-1.5 font-mono">O(1)</td><td class="px-2 py-1.5">✅</td><td class="px-2 py-1.5">双向冒泡，改善「乌龟」问题</td></tr>
              <tr class="border-b border-slate-100"><td class="px-2 py-1.5">梳排序</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">≈O(n log n)</td><td class="px-2 py-1.5 font-mono">O(n²)</td><td class="px-2 py-1.5 font-mono">O(1)</td><td class="px-2 py-1.5">❌</td><td class="px-2 py-1.5">gap 递减的冒泡，跨距消逆序</td></tr>
              <tr class="border-b border-slate-100"><td class="px-2 py-1.5">选择排序</td><td class="px-2 py-1.5 font-mono">O(n²)</td><td class="px-2 py-1.5 font-mono">O(n²)</td><td class="px-2 py-1.5 font-mono">O(n²)</td><td class="px-2 py-1.5 font-mono">O(1)</td><td class="px-2 py-1.5">❌</td><td class="px-2 py-1.5">交换最少（n−1 次），写代价低</td></tr>
              <tr class="border-b border-slate-100"><td class="px-2 py-1.5">插入排序</td><td class="px-2 py-1.5 font-mono">O(n)</td><td class="px-2 py-1.5 font-mono">O(n²)</td><td class="px-2 py-1.5 font-mono">O(n²)</td><td class="px-2 py-1.5 font-mono">O(1)</td><td class="px-2 py-1.5">✅</td><td class="px-2 py-1.5">近似有序时近乎线性</td></tr>
              <tr class="border-b border-slate-100"><td class="px-2 py-1.5">希尔排序</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">≈O(n^1.3)</td><td class="px-2 py-1.5 font-mono">O(n²)</td><td class="px-2 py-1.5 font-mono">O(1)</td><td class="px-2 py-1.5">❌</td><td class="px-2 py-1.5">插入排序 + gap 分组</td></tr>
              <tr class="border-b border-slate-100"><td class="px-2 py-1.5">快速排序</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">O(n²)</td><td class="px-2 py-1.5 font-mono">O(log n)</td><td class="px-2 py-1.5">❌</td><td class="px-2 py-1.5">工程首选，随机化防退化</td></tr>
              <tr class="border-b border-slate-100"><td class="px-2 py-1.5">归并排序</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">O(n)</td><td class="px-2 py-1.5">✅</td><td class="px-2 py-1.5">稳定、可外排、链表友好</td></tr>
              <tr class="border-b border-slate-100"><td class="px-2 py-1.5">堆排序</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">O(1)</td><td class="px-2 py-1.5">❌</td><td class="px-2 py-1.5">原地且最坏最优，常数较大</td></tr>
              <tr class="border-b border-slate-100"><td class="px-2 py-1.5">锦标赛排序</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">O(n)</td><td class="px-2 py-1.5">✅</td><td class="px-2 py-1.5">胜者树，比较次数接近理论下界</td></tr>
              <tr class="bg-emerald-50/60">
                <td colspan="7" class="px-2 py-1.5 font-semibold text-emerald-800">⚡ 非比较排序（线性，但受 key 结构限制）</td>
              </tr>
              <tr class="border-b border-slate-100"><td class="px-2 py-1.5">计数排序</td><td class="px-2 py-1.5 font-mono">O(n+k)</td><td class="px-2 py-1.5 font-mono">O(n+k)</td><td class="px-2 py-1.5 font-mono">O(n+k)</td><td class="px-2 py-1.5 font-mono">O(k)</td><td class="px-2 py-1.5">✅</td><td class="px-2 py-1.5">整数小范围，线性且稳定</td></tr>
              <tr class="border-b border-slate-100"><td class="px-2 py-1.5">基数排序</td><td class="px-2 py-1.5 font-mono">O(d·(n+k))</td><td class="px-2 py-1.5 font-mono">O(d·(n+k))</td><td class="px-2 py-1.5 font-mono">O(d·(n+k))</td><td class="px-2 py-1.5 font-mono">O(n+k)</td><td class="px-2 py-1.5">✅</td><td class="px-2 py-1.5">按位桶排，位数 d 小时近线性</td></tr>
              <tr class="border-b border-slate-100"><td class="px-2 py-1.5">桶排序</td><td class="px-2 py-1.5 font-mono">O(n+k)</td><td class="px-2 py-1.5 font-mono">O(n+k)</td><td class="px-2 py-1.5 font-mono">O(n²)</td><td class="px-2 py-1.5 font-mono">O(n)</td><td class="px-2 py-1.5">✅</td><td class="px-2 py-1.5">分布均匀时近线性，桶内再排</td></tr>
              <tr class="bg-indigo-50/60">
                <td colspan="7" class="px-2 py-1.5 font-semibold text-indigo-800">🔀 混合排序（组合多种策略）</td>
              </tr>
              <tr class="border-b border-slate-100"><td class="px-2 py-1.5">TimSort</td><td class="px-2 py-1.5 font-mono">O(n)</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">O(n)</td><td class="px-2 py-1.5">✅</td><td class="px-2 py-1.5">插入+归并，JS/Python/Java 内置</td></tr>
              <tr class="border-b border-slate-100"><td class="px-2 py-1.5">内省排序</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">O(n log n)</td><td class="px-2 py-1.5 font-mono">O(log n)</td><td class="px-2 py-1.5">❌</td><td class="px-2 py-1.5">快排+堆+插入，杜绝最坏退化</td></tr>
              <tr class="bg-orange-50/60">
                <td colspan="7" class="px-2 py-1.5 font-semibold text-orange-800">🎯 选择算法（不排全序，只找第 k 小）</td>
              </tr>
              <tr class="border-b border-slate-100"><td class="px-2 py-1.5">快速选择</td><td class="px-2 py-1.5 font-mono">O(n)</td><td class="px-2 py-1.5 font-mono">O(n)</td><td class="px-2 py-1.5 font-mono">O(n²)</td><td class="px-2 py-1.5 font-mono">O(1)</td><td class="px-2 py-1.5">—</td><td class="px-2 py-1.5">快排分区 + 只递归一侧</td></tr>
              <tr><td class="px-2 py-1.5">中位数之中位数</td><td class="px-2 py-1.5 font-mono">O(n)</td><td class="px-2 py-1.5 font-mono">O(n)</td><td class="px-2 py-1.5 font-mono">O(n)</td><td class="px-2 py-1.5 font-mono">O(n)</td><td class="px-2 py-1.5">—</td><td class="px-2 py-1.5">确定性最坏线性（常数大）</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：只看平均复杂度选算法</strong><br/>
          快排平均 O(n log n) 最优秀，但<strong>有序数组 + 固定基准</strong>会退化到 O(n²)；堆排序最坏也是 O(n log n)，
          但常数大、缓存不友好，实际往往跑不过快排。<strong>选型要看最坏情况、稳定性、空间、常数与数据特征</strong>，不能只看一行公式。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>计数排序要求 key 是<strong>非负整数</strong>且值域 k 不能太大；负数要整体平移偏移量。桶排序在<strong>分布均匀</strong>时桶内元素少、近乎线性；分布集中时桶内退化成 O(m²)。</p>
        </aside>
      </section>

      <!-- 5. 如何选择 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          如何选择：决策树与工程实践
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          选排序不是「背一个最好的」，而是按<strong>数据特征 × 需求</strong>走决策树：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>key 是小范围整数</strong>（如 0~9）→ 计数排序，直接 O(n+k) 线性碾压</li>
          <li><strong>近似有序</strong>（增量更新）→ 插入排序 / TimSort，最好情况 O(n)</li>
          <li><strong>要求稳定</strong> → 归并 / TimSort（多关键字排序必备）</li>
          <li><strong>写操作昂贵</strong>（嵌入式 Flash / 数据库页）→ 选择排序，交换次数最少</li>
          <li><strong>大数组、内存吃紧</strong> → 原地快排（随机化）或堆排序</li>
          <li><strong>不知道怎么办</strong> → 直接 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">Array.prototype.sort()</code>（TimSort，稳且快）</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="chooseSortCode" title="choose_sort.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          选型 ≈ <strong>挑交通工具</strong>：赶时间+近 → 步行（插入排序，小数据最快）；带大件 → 货车（归并，稳定大容量）；
          长途+省钱 → 高铁（快排，平均最优）；批量搬运整数零件 → 传送带（计数排序，线性）。<br/>
          决策树 ≈ <strong>客服分流话术</strong>：先问「值域小吗」→ 再问「要求稳定吗」→ 再问「内存够吗」，逐层过滤出唯一答案。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>工程排序四问 —— ① 值域结构能用非比较吗？② 要稳定吗？③ 数据近似有序吗？④ 内存受限吗？
          四问之后答案基本唯一；再不确定，就用语言内置排序（它已经过千锤百炼）。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：稳定 vs 不稳定排序
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          柱高相同 = key 相等；3A 与 3B 两条记录 key 都是 3，柱高相同、标签不同。
          「稳定排序」用<strong>插入排序</strong>（相等不交换，逐个搬运）；「不稳定排序」用<strong>选择排序</strong>（交换最小元素时可能越过相等元素）。
          橙色 = 正在比较，红色 = 正在交换，绿色 = 已就位。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 长度: {{ bars.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔍 比较: {{ cmp }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔁 交换: {{ swp }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
          <span v-if="result" class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">{{ result }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="runStable" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">✅ 稳定排序（插入排序）</button>
          <button @mousedown="runUnstable" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:shadow-sm">❌ 不稳定排序（选择排序）</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-rect v-for="b in bars" :key="b.id" :config="barCfg(b)" />
              <v-text v-for="b in bars" :key="'vt'+b.id" :config="valCfg(b)" />
              <v-text v-for="(b,i) in bars" :key="'it'+b.id" :config="idxCfg(i)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <!-- 📋 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>排序本质</strong>：把无序重排为有序，不增删元素；有序是二分查找、去重、归并、Top-K 的前置</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三大分类</strong>：比较排序（下界 O(n log n)）/ 非比较排序（计数/基数/桶，线性但受限）/ 混合排序（Tim、内省）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>稳定性</strong>：相等 key 相对顺序不变；稳定：冒泡/插入/归并/计数/基数/桶；不稳定：选择/希尔/快排/堆/梳</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>稳定性的价值</strong>：多关键字排序（先主 key 后次 key）只有稳定排序才不破坏第一次结果</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>选型四问</strong>：值域结构？稳定性？近似有序？内存？—— 答完选型唯一；不确定就用内置 sort</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>本模块路线</strong>：7-1 比较排序三巨头（快排/归并/堆）→ 7-2 线性排序 → 7-3 选择算法 → 7-4 更多排序（冒泡/选择/鸡尾酒/梳/锦标赛/Tim/内省）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-6-connectivity/dsa-6-6-3-euler" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：欧拉路径与欧拉回路：Hierholzer算法</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-1-compare/dsa-7-1-1-quick" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：快速排序：分区策略/随机化/三路快排 →</RouterLink>
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
  { id: "sec-1", name: "为什么排序重要" },
  { id: "sec-2", name: "三大分类" },
  { id: "sec-3", name: "稳定性定义" },
  { id: "sec-4", name: "复杂度全景表" },
  { id: "sec-5", name: "如何选择" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "📋 小结" },
]

// ===== 🎬 稳定性动画（柱状图）=====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const result = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))
const cmp = ref(0), swp = ref(0)

interface Bar { id:number; val:number; tag?:string; color:string; s?:number; _x?:number; _y?:number; _h?:number }
const bars = reactive<Bar[]>([])
const BASE = 280, MXH = 220, BW = 46, G = 8

// 两条相等 key（val=3）记录：标签 A 在前、B 在后
const INIT: [number, string][] = [[3,'A'],[8,''],[3,'B'],[2,''],[6,''],[1,'']]

function initArr() {
  bars.splice(0)   // ⚠️ splice(0)
  INIT.forEach(([v, tag], i) => bars.push({ id: i + 1, val: v, tag: tag || undefined, color: C.cyan, s: 1 }))
  cmp.value = 0; swp.value = 0; result.value = ''
  layout()
}
function layout() {
  const n = bars.length, bw = Math.min(BW, Math.floor((W.value - 20) / (n || 1) - G))
  const total = n * (bw + G) - G, sx = Math.max(10, (W.value - total) / 2), maxV = Math.max(...bars.map(b => b.val), 1)
  bars.forEach((b, i) => { b._x = sx + i * (bw + G); b._h = Math.max(28, (b.val / maxV) * MXH); b._y = BASE - b._h })
}
function barCfg(b: any) {
  const s = b.s ?? 1, bw = Math.min(BW, Math.floor((W.value - 20) / (bars.length || 1) - G))
  return { x: b._x + (bw * (1 - s)) / 2, y: b._y, width: bw * s, height: b._h * s, fill: b.color, cornerRadius: [4, 4, 0, 0],
    stroke: '#94a3b8', strokeWidth: 1, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function valCfg(b: any) {
  const s = b.s ?? 1, h = b._h * s, bw = Math.min(BW, Math.floor((W.value - 20) / (bars.length || 1) - G))
  return { x: b._x + (bw * (1 - s)) / 2, y: b._y + 2, width: bw * s, height: h - 4, text: b.val + (b.tag ?? ''), fontSize: 14,
    fontFamily: 'monospace', fontStyle: 'bold', fill: h > 30 ? '#fff' : C.text, align: 'center', verticalAlign: 'middle' }
}
function idxCfg(i: number) {
  const bw = Math.min(BW, Math.floor((W.value - 20) / (bars.length || 1) - G))
  return { x: bars[i]._x ?? 0, y: BASE + 6, width: bw, text: '[' + i + ']', fontSize: 10, fontFamily: 'monospace', fill: C.muted, align: 'center' }
}
function colorAt(i: number, c: string) { if (bars[i]) bars[i].color = c }
function allCyan() { bars.forEach(b => b.color = C.cyan) }
async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch (_) { /* 忽略中断 */ }
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

// 检查 A / B 的相对顺序
function orderStable(): string {
  const ia = bars.findIndex(b => b.tag === 'A')
  const ib = bars.findIndex(b => b.tag === 'B')
  const ok = ia >= 0 && ib >= 0 && ia < ib
  return ok
    ? `✅ 稳定：A（[${ia}]）仍在 B（[${ib}]）前面，相等 key 顺序未变`
    : `❌ 不稳定：A（[${ia}]）跑到了 B（[${ib}]）后面，顺序被颠倒`
}
function finishGreen() { bars.forEach(b => b.color = C.green) }

// 稳定排序：插入排序（相等 key 不交换，逐个搬运）
async function stableInsertion() {
  for (let i = 1; i < bars.length; i++) {
    const key = { ...bars[i] }
    colorAt(i, C.orange)
    status.value = `取出 [${i}]（key=${key.val}），向左找插入位置`
    await d(450)
    let j = i - 1
    while (j >= 0 && bars[j].val > key.val) {   // 严格大于才挪：相等不交换 → 稳定
      cmp.value++
      colorAt(j, C.orange); await d(280)
      bars[j + 1] = { ...bars[j] }
      swp.value++
      layout()          // 挪位后重算几何（柱子按新下标摆放）
      colorAt(j + 1, C.red)
      status.value = `key=${key.val} 比 [${j}] 小 → 把 [${j}] 向右挪到 [${j + 1}]`
      await d(380)
      j--
    }
    bars[j + 1] = key
    swp.value++
    layout()            // 插入后重算几何
    colorAt(j + 1, C.cyan)
    status.value = `key=${key.val} 插入 [${j + 1}]`
    await d(320)
    for (let k = 0; k <= i; k++) colorAt(k, C.cyan)
  }
  finishGreen()
  result.value = orderStable()
}

// 不稳定排序：选择排序（交换最小元素时可能越过相等元素）
async function unstableSelection() {
  for (let i = 0; i < bars.length - 1; i++) {
    let min = i
    colorAt(i, C.orange)
    status.value = `第 ${i + 1} 轮：在 [${i}..${bars.length - 1}] 找最小`
    await d(400)
    for (let j = i + 1; j < bars.length; j++) {
      cmp.value++
      colorAt(j, C.orange)
      status.value = `比较 [${j}]（${bars[j].val}）与当前最小 [${min}]（${bars[min].val}）`
      await d(240)
      if (bars[j].val < bars[min].val) min = j
      colorAt(j, C.cyan)
    }
    colorAt(min, C.red)
    if (min !== i) {
      status.value = `把最小 ${bars[min].val}（[${min}]）与 [${i}]（${bars[i].val}）交换 —— 可能越过相等元素！`
      await d(480)
      const t = { ...bars[min] }
      bars[min] = { ...bars[i] }
      bars[i] = t
      swp.value++
      layout()
      await d(320)
    }
    colorAt(i, C.green)
    status.value = `[${i}] = ${bars[i].val} 就位`
    await d(320)
  }
  finishGreen()
  result.value = orderStable()
}

function runStable() { act('稳定排序（插入排序）执行中…', '稳定：相等 key 不交换', stableInsertion) }
function runUnstable() { act('不稳定排序（选择排序）执行中…', '不稳定：远距离交换可能颠倒顺序', unstableSelection) }
function doReset() { if (busy.value) return; initArr() }

let ro: ResizeObserver | null = null
onMounted(() => {
  initArr()
  if (box.value) {
    W.value = box.value.clientWidth; layout()
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w; layout() } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const sortClassCode = `// ===== 排序的三大分类 =====
type SortKind = 'compare' | 'linear' | 'hybrid'

interface SortInfo {
  name: string
  kind: SortKind
  avg: string
  stable: boolean
}

const CLASS = {
  compare: '比较排序：任意两两比大小，基于「比较」决策，平均下界 O(n log n)',
  linear:  '非比较排序：借助计数/桶/位，利用 key 的结构，可达线性 O(n+k)',
  hybrid:  '混合排序：比较 + 非比较（或多种比较策略）结合，兼顾速度与稳定',
} as const

const catalog: SortInfo[] = [
  { name: '冒泡排序', kind: 'compare', avg: 'O(n²)',    stable: true  },
  { name: '快速排序', kind: 'compare', avg: 'O(n log n)', stable: false },
  { name: '归并排序', kind: 'compare', avg: 'O(n log n)', stable: true  },
  { name: '堆排序',   kind: 'compare', avg: 'O(n log n)', stable: false },
  { name: '计数排序', kind: 'linear',  avg: 'O(n+k)',   stable: true  },
  { name: '基数排序', kind: 'linear',  avg: 'O(d(n+k))', stable: true  },
  { name: 'TimSort',  kind: 'hybrid',  avg: 'O(n log n)', stable: true  },
  { name: '内省排序', kind: 'hybrid',  avg: 'O(n log n)', stable: false },
]

// 关键结论：任何基于「比较」的排序，平均至少需要 n log n 次比较（决策树下界）
// 想突破 O(n log n)，只能利用 key 的取值结构 —— 这就是非比较排序的动机`

const stableVsUnstableCode = `// ===== 稳定性演示：对象按 key 排序 =====
type Rec = { key: number; name: string }
const data: Rec[] = [
  { key: 3, name: '张三' },
  { key: 1, name: '李四' },
  { key: 3, name: '王五' },   // 与张三 key 相等
  { key: 2, name: '赵六' },
]

// 稳定排序（插入排序）：严格大于才挪，相等 key 保持原顺序
function stableInsert(a: Rec[]): Rec[] {
  const r = a.map(x => ({ ...x }))
  for (let i = 1; i < r.length; i++) {
    const cur = r[i]
    let j = i - 1
    while (j >= 0 && r[j].key > cur.key) { r[j + 1] = r[j]; j-- }
    r[j + 1] = cur
  }
  return r
}
console.log(\`稳定结果：\${stableInsert(data).map(x => x.name + '(' + x.key + ')').join(' ')}\`)
// 输出：李四(1) 赵六(2) 张三(3) 王五(3)   ← 张三仍在王五前面 ✓

// 不稳定排序（选择排序）：把最小元素与队首交换，
// 队首被甩到后面，可能越过某个相等元素 → 顺序颠倒
function unstableSelect(a: Rec[]): Rec[] {
  const r = a.map(x => ({ ...x }))
  for (let i = 0; i < r.length - 1; i++) {
    let min = i
    for (let j = i + 1; j < r.length; j++) if (r[j].key < r[min].key) min = j
    const t = r[i]; r[i] = r[min]; r[min] = t
  }
  return r
}
console.log(\`不稳定结果：\${unstableSelect(data).map(x => x.name + '(' + x.key + ')').join(' ')}\`)
// 输出：李四(1) 赵六(2) 王五(3) 张三(3)   ← 王五跑到张三前面 ✗（顺序被颠倒）`

const chooseSortCode = `// ===== 排序选型函数：按数据特征走决策树 =====
function chooseSort(
  n: number,
  range: number | null,      // key 取值范围，null 表示未知/很大
  nearlySorted: boolean,     // 是否近似有序
  writeCostHigh: boolean,    // 写（交换/赋值）代价是否昂贵
  needStable: boolean,       // 是否要求稳定
): string {
  // ① 值域小 → 非比较排序，线性碾压
  if (range !== null && range <= n * 2) return '计数排序 O(n+k)'
  // ② 近似有序 → 插入排序家族，最好 O(n)
  if (nearlySorted) return needStable ? '插入排序 / TimSort（稳定）' : '插入排序'
  // ③ 写代价高 → 选择排序（交换次数最少，n-1 次）
  if (writeCostHigh) return '选择排序（写次数最少）'
  // ④ 要求稳定 → 归并家族
  if (needStable) return '归并排序 / TimSort（稳定 O(n log n)）'
  // ⑤ 兜底 → 快排（平均最快，原地，但不稳定）
  return '快速排序（随机化基准）'
}

// 使用示例
const pick = chooseSort(1_000_000, 10, false, false, true)
console.log(\`推荐：\${pick}\`)     // → 计数排序 O(n+k)
// 例：商品按销量排序且同销量保持上架顺序 → 归并/TimSort（稳定）
// 例：嵌入式 Flash 频繁写入 → 选择排序，减少写放大`

</script>
