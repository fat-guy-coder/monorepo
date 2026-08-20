<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📈 二分答案：把最优化转判定</h1>
          <p class="text-sm text-slate-500 mt-1">当「求最大/最小 X」算不出时，改成「给定 X 判断可行吗」——单调性让二分再次生效</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 8-1-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">📐</span>
          结构总览：单调判定曲线与可行分界
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          二分答案的骨架：把「求最优解」转成<strong>「判断一个候选值是否可行」</strong>。
          判定函数 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">check(mid)</code> 沿 x 轴<strong>单调</strong>——前半段可行、后半段不可行（或反过来），
          于是「可行」与「不可行」之间存在一条清晰的分界线，二分就是在找这条<strong>分界线</strong>。
        </p>

        <figure class="mb-6">
          <svg viewBox="0 0 720 320" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ax-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <text x="16" y="24" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">check(x)：x 越大越难可行（如「切出 x 米木棍 ≥ k 根」）</text>

            <!-- 可行/不可行阴影 -->
            <rect x="60" y="120" width="330" height="110" fill="#4ade80" opacity="0.12" />
            <rect x="390" y="50" width="220" height="180" fill="#ef4444" opacity="0.10" />

            <!-- 坐标轴 -->
            <line x1="60" y1="230" x2="660" y2="230" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ax-arr)" />
            <line x1="60" y1="230" x2="60" y2="40" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ax-arr)" />
            <text x="645" y="222" font-size="10" font-family="monospace" fill="#64748b">候选值 x</text>
            <text x="42" y="46" font-size="10" font-family="monospace" fill="#64748b">check</text>

            <!-- x 刻度 0..10 -->
            <text x="60" y="246" text-anchor="middle" font-size="10" font-family="monospace" fill="#94a3b8">0</text>
            <text x="170" y="246" text-anchor="middle" font-size="10" font-family="monospace" fill="#94a3b8">2</text>
            <text x="280" y="246" text-anchor="middle" font-size="10" font-family="monospace" fill="#94a3b8">4</text>
            <text x="390" y="246" text-anchor="middle" font-size="10" font-family="monospace" fill="#94a3b8">6</text>
            <text x="500" y="246" text-anchor="middle" font-size="10" font-family="monospace" fill="#94a3b8">8</text>
            <text x="610" y="246" text-anchor="middle" font-size="10" font-family="monospace" fill="#94a3b8">10</text>

            <!-- 分界线 -->
            <line x1="390" y1="50" x2="390" y2="230" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 4" />
            <text x="390" y="272" text-anchor="middle" font-size="11" font-family="monospace" fill="#f59e0b" font-weight="bold">最大可行值 = 6</text>

            <!-- 单调阶梯曲线：可行 → 不可行 -->
            <line x1="60" y1="200" x2="385" y2="200" stroke="#4ade80" stroke-width="3" />
            <line x1="390" y1="200" x2="390" y2="120" stroke="#f59e0b" stroke-width="3" />
            <line x1="390" y1="120" x2="610" y2="120" stroke="#ef4444" stroke-width="3" />

            <!-- 区域标注 -->
            <text x="225" y="170" text-anchor="middle" font-size="11" font-family="monospace" fill="#16a34a" font-weight="bold">可行区 check=true</text>
            <text x="500" y="96" text-anchor="middle" font-size="11" font-family="monospace" fill="#dc2626" font-weight="bold">不可行区 check=false</text>
            <text x="225" y="296" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">check(5)=true → 答案 ≥ 5，向右二分</text>
            <text x="500" y="296" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">check(7)=false → 答案 &lt; 7，向左二分</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：单调判定函数 —— 绿色可行区 / 红色不可行区 / 橙色分界线 = 最优答案</figcaption>
        </figure>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">1</span>
          核心思想 —— 最优化问题变成判定问题
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          很多题长这样：「求<strong>最大</strong>的 X，使得条件成立」。直接算 X 常常很难，
          但<strong>验证「给定一个 X，条件成立吗？」</strong>却很简单（一次 O(n) 扫描）。
          于是我们<strong>在答案的取值范围内二分</strong>：每次猜一个 mid，问 check(mid) 行不行，
          根据回答缩小答案范围，直到锁定最优值。
        </p>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>关键转变：</strong></p>
          <ul class="space-y-1.5 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">•</span><span>普通二分：对<strong>数组下标</strong>二分，check 是「比较数组元素」</span></li>
            <li class="flex items-start gap-2"><span class="text-amber-500 mt-1 font-bold">•</span><span>二分答案：对<strong>答案取值</strong>二分，check 是「判断这个取值是否可行」</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1 font-bold">•</span><span>时间 = O(log(答案范围) × check 的代价)，通常 O(log range × n)</span></li>
          </ul>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          二分答案就像前端做<strong>「视频画质自适应」</strong>——直接选最优码率很难，但「给定码率 R，能不能 3 秒内缓冲完」
          很好判断。于是对码率做二分：太高就调低，太低就调高，几次就逼近最优。<br/>
          也像 <code>lodash</code> 的 <code>throttle</code> 调参：每次改一半，逼近「不卡顿的最小间隔」。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">2</span>
          单调性 —— 二分答案的前提
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          二分答案<strong>必须满足单调性</strong>：存在某个分界值 b，使得「所有 x ≤ b 都可行」且「所有 x &gt; b 都不可行」（或反过来）。
          只有这样，「可行/不可行」才是一段连续的区间，二分才不会漏答案。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left">
              <th class="px-4 py-2 border border-slate-200 font-semibold">判定函数</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold">含义</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold">可行区</th>
              <th class="px-4 py-2 border border-slate-200 font-semibold">要找</th>
            </tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">check(x) 单调递减</td><td class="px-4 py-2 border">x 越大越难可行（切木棍、分配额度）</td><td class="px-4 py-2 border font-mono text-emerald-600">x ≤ b</td><td class="px-4 py-2 border font-mono">最大可行值 b</td></tr>
              <tr><td class="px-4 py-2 border font-mono">check(x) 单调递增</td><td class="px-4 py-2 border">x 越大越可行（给更多时间/速度）</td><td class="px-4 py-2 border font-mono text-emerald-600">x ≥ b</td><td class="px-4 py-2 border font-mono">最小可行值 b</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 没有单调性就别二分：</strong>如果 check 是「x 取偶数才可行」，可行区断断续续，
          二分中间一砍就可能把答案切掉。先用 <strong>O(n) 扫一遍验证单调性</strong>，再决定要不要用二分答案。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">3</span>
          模板一 —— 求「最大可行值」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          check 单调递减（x 越大越难可行），找<strong>最大的 x 使 check(x)=true</strong>。
          命中后记下 <code>ans=mid</code>，然后 <code>low=mid+1</code> 向右找更大——和左边界模板如出一辙。
        </p>
        <div class="mb-4"><Code language="ts" :code="maxCode" title="binary_answer_max.ts" /></div>
        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-4">
          <p class="text-sm text-slate-700 mb-2"><strong>执行过程（范围 [0,10]，最大可行 = 6）：</strong></p>
          <ol class="space-y-1 text-slate-600 text-sm">
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">1.</span><span>low=0 high=10 mid=5，check(5)=true → ans=5，low=6</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">2.</span><span>low=6 high=10 mid=8，check(8)=false → high=7</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">3.</span><span>low=6 high=7 mid=6，check(6)=true → ans=6，low=7</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">4.</span><span>low=7 high=7 mid=7，check(7)=false → high=6</span></li>
            <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">5.</span><span>low=7 &gt; high=6 结束，返回 ans=<strong>6</strong></span></li>
          </ol>
        </div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">4</span>
          模板二 —— 求「最小可行值」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          check 单调递增（x 越大越可行），找<strong>最小的 x 使 check(x)=true</strong>。
          命中后记下 <code>ans=mid</code>，然后 <code>high=mid-1</code> 向左找更小——和右边界模板对应。
        </p>
        <div class="mb-4"><Code language="ts" :code="minCode" title="binary_answer_min.ts" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 记忆诀窍：</strong>「最大可行值」= 命中后向右找更大（low 前进）；
          「最小可行值」= 命中后向左找更小（high 前进）。<strong>和中序的左右边界模板一一对应</strong>，
          只是把「比较数组元素」换成「check(mid)」而已。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">5</span>
          经典例题 —— 一题一模式
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          三道高频题覆盖三种二分答案的「味道」：整数平方根（求最大可行）、木棍切割（求最大可行）、
          Koko 吃香蕉（求最小可行）。吃透这三道，套路就通了。
        </p>
        <div class="mb-4"><Code language="ts" :code="examplesCode" title="classic_examples.ts" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 识别信号：</strong>题目出现「最大/最小」「至少/至多」「在范围内」，
          且能写出 <code>check(x)</code> 判断可行性 → 大概率是二分答案。<br/>
          再确认两件事：① check 单调；② 答案范围已知（从 lo 到 hi 能圈住答案）。</p>
        </aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">6</span>
          常见误区 —— 二分答案的翻车点
        </h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 误区 1：check 不单调还用二分。</strong>可行区不是连续的一段，二分会直接切掉答案。<br/>
          <strong>误区 2：范围没圈住答案。</strong>hi 小于真实答案、lo 大于真实答案，二分结果必错。取范围时往宽了取（0 到 2^31 都行）。<br/>
          <strong>误区 3：死循环。</strong>和普通二分一样，命中后不推进 low/high 就卡死——统一用 <code>ans=mid</code> + <code>low=mid+1</code> / <code>high=mid-1</code>。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 误区 4：check 里又套了暴力。</strong>整体复杂度 = O(log range) × O(check)。
          若 check 是 O(n²)，数据一大就超时。学会把 check 优化到 O(n) 或 O(n log n)。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 自测 checklist：</strong>① 手动跑 mid=lo、mid=hi 两个极端；② 验证答案恰好在分界线上；
          ③ 没有 target 时返回什么（ans 初值）；④ 用一个小样例把二分过程走一遍，确认每次都前进。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">🎬</span>
          动画演示：判定曲线上的二分
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          bar 高度表示候选值大小，绿 = 可行、红 = 不可行。橙色 mid 每次「试探」一个候选，
          check 通过就把答案候选右移/左移，被排除的区域变灰——区间一步步收敛到<strong>可行/不可行分界线</strong>。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 候选范围 [0, 10]</span>
          <span class="bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-mono">🎯 {{ modeLabel }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ ptrStr }}</span>
          <span class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono min-w-[140px] text-center">{{ status || '就绪' }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <button @click="setMode('max')" :disabled="busy"
            :class="[modeBtnCls('max'), 'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100']">最大可行值</button>
          <button @click="setMode('min')" :disabled="busy"
            :class="[modeBtnCls('min'), 'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100']">最小可行值</button>
          <button @click="runSearch" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">▶ 开始二分</button>
          <button @click="randomBoundary" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">🎲 随机分界</button>
          <button @click="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-text :config="{x:10, y:8, text:'候选值 x（绿=可行 · 红=不可行 · 灰=已排除）:', fontSize:12, fontFamily:'monospace', fill:C.muted}" />
              <v-rect v-for="b in bars" :key="b.id" :config="rectCfg(b)" />
              <v-text v-for="b in bars" :key="'v'+b.id" :config="valCfg(b)" />
              <v-text v-for="(b,i) in bars" :key="'i'+b.id" :config="idxCfg(i)" />
              <v-arrow v-if="low>=0" :config="ptrArrow(low, C.green, 0)" />
              <v-text v-if="low>=0" :config="ptrText(low, 'low', C.green, 0)" />
              <v-arrow v-if="mid>=0" :config="ptrArrow(mid, C.orange, 18)" />
              <v-text v-if="mid>=0" :config="ptrText(mid, 'mid', C.orange, 18)" />
              <v-arrow v-if="high>=0" :config="ptrArrow(high, C.red, 36)" />
              <v-text v-if="high>=0" :config="ptrText(high, 'high', C.red, 36)" />
            </v-layer>
          </v-stage>
        </div>
      </section>

      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>二分答案</strong> = 对答案取值二分，把「求最优化」换成「给定 X 判断可行」（check）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>前提是 check 单调</strong>：可行区必须连续，否则二分会切掉答案</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>两个模板：</strong>最大可行值命中后 low=mid+1；最小可行值命中后 high=mid-1</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度</strong> = O(log range) × O(check)，check 尽量做到 O(n)</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>经典题：</strong>sqrt、木棍切割（最大可行）、Koko 吃香蕉（最小可行）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-1-binary/dsa-8-1-1-classic" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：标准二分查找</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-8-search/dsa-8-1-binary/dsa-8-1-3-rotated" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：旋转数组搜索 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ===== 🎬 二分答案动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', text:'#1e293b', muted:'#64748b', ghost:'#e2e8f0', warn:'#fbbf24' }
const H = ref(340), W = ref(700), G = 8, MXH = 175, BASE = 235, MAX_X = 10
interface Bar { id:number; val:number; color:string; s?:number; _x?:number; _y?:number; _h?:number }
const bars = reactive<Bar[]>([])
const busy = ref(false), status = ref(''), nid = ref(100)
const low = ref(-1), high = ref(-1), mid = ref(-1)
const mode = ref<'max'|'min'>('max')
const maxB = ref(6), minB = ref(4)
const ans = ref(-1)
const box = ref<HTMLDivElement>()
const sh = (v:number)=>Math.max(4,v)
const d = (ms:number)=>new Promise(r=>setTimeout(r,ms))

const modeLabel = computed(() => mode.value==='max' ? '最大可行值（check 递减）' : '最小可行值（check 递增）')
const ptrStr = computed(() => {
  const l = low.value, m = mid.value, h = high.value
  return 'low=' + (l<0?'—':l) + ' · mid=' + (m<0?'—':m) + ' · high=' + (h<0?'—':h)
})

function isFeasible(x:number) {
  return mode.value === 'max' ? x <= maxB.value : x >= minB.value
}
function bwNow() { return Math.min(54, Math.floor((W.value-20)/(bars.length||1)-G)) }
function barCx(i:number) { return ((bars[i] as any)?._x || 0) + bwNow()/2 }
function layout() {
  const bw = bwNow(), total = bars.length*(bw+G)-G, sx = Math.max(10,(W.value-total)/2)
  bars.forEach((b,i)=>{
    b._x = sx + i*(bw+G)
    b._h = Math.max(20,(b.val/MAX_X)*MXH)
    b._y = BASE - b._h
  })
}
function rectCfg(b:any) {
  const bw = bwNow(); const s = b.s ?? 1; const isGhost = b.color === C.ghost
  return {
    x: b._x+(bw*(1-s))/2, y: b._y, width: bw*s, height: sh(b._h||30)*s,
    fill: b.color, cornerRadius: [4,4,0,0],
    stroke: isGhost?'transparent':'#94a3b8', strokeWidth: isGhost?0:1,
    shadowColor: isGhost?'transparent':'rgba(0,0,0,0.12)', shadowBlur: isGhost?0:6, shadowOffsetY: isGhost?0:2,
    opacity: isGhost?0:1,
  }
}
function valCfg(b:any) {
  const bw = bwNow(); const s = b.s ?? 1; const h = sh(b._h||30)*s
  return { x: b._x+(bw*(1-s))/2, y: b._y+2, width: bw*s, height: h-4, text: h>20?String(b.val):'',
    fontSize: Math.round(Math.min(14,bw*.3)*s), fontFamily:'monospace', fontStyle:'bold',
    fill: h>32?'#fff':C.text, align:'center', verticalAlign:'middle' }
}
function idxCfg(i:number) {
  const bw = bwNow()
  return { x:(bars[i]as any)?._x||0, y:BASE+6, width:bw, text:'x='+i,
    fontSize: Math.min(10,bw*.2), fontFamily:'monospace', fill:C.muted, align:'center' }
}
function ptrArrow(idx:number, color:string, lane:number) {
  const cx = barCx(idx)
  return { points:[cx, BASE+lane+14, cx, BASE+lane+4], stroke:color, fill:color, pointerLength:6, pointerWidth:6 }
}
function ptrText(idx:number, name:string, color:string, lane:number) {
  const cx = barCx(idx)
  return { x: cx-44, y: BASE+lane+16, width: 88, text: name+'='+idx, fontSize: 10,
    fontFamily:'monospace', fontStyle:'bold', fill: color, align:'center' }
}

function paint() {
  bars.forEach(b => { b.color = isFeasible(b.val) ? C.green : C.red; b.s = 1 })
}
function initData() {
  bars.length = 0
  for (let i = 0; i <= MAX_X; i++) bars.push({ id: i+1, val: i, color: C.cyan, s: 1 })
  reset()
}
function reset() {
  paint()
  low.value=-1; high.value=-1; mid.value=-1; ans.value=-1; status.value=''
  layout()
}
function setMode(m:'max'|'min') { if (busy.value) return; mode.value = m; reset() }
function randomBoundary() { if (busy.value) return; maxB.value = Math.floor(Math.random()*6)+3; minB.value = Math.floor(Math.random()*6)+2; reset() }
function doReset() { reset() }
const modeBtnCls = (m:string) => m===mode.value
  ? 'bg-cyan-500 text-white border-cyan-500 shadow-sm'
  : 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300'

async function act(msg:string, fn:()=>Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false; status.value = '' }
}

async function runSearch() {
  act('二分答案  O(log range × O(check))', async () => {
    reset()
    let lo = 0, hi = MAX_X, a = -1
    low.value = lo; high.value = hi
    while (lo <= hi) {
      const m = Math.floor((lo + hi) / 2)
      mid.value = m
      bars[m].color = C.orange; bars[m].s = 1.12; layout()
      const ok = isFeasible(m)
      status.value = '试探 mid=' + m + ' → check(' + m + ') = ' + (ok ? '可行 ✅' : '不可行 ❌')
      await d(650)

      if (ok) {
        if (mode.value === 'max') {
          for (let i = lo; i <= m-1; i++) bars[i].color = C.ghost
          a = m; lo = m + 1; low.value = lo
          bars[m].color = C.green; bars[m].s = 1.06
          status.value = '可行 → 答案 ≥ ' + m + '，向右找更大：low=' + lo
        } else {
          for (let i = m+1; i <= hi; i++) bars[i].color = C.ghost
          a = m; hi = m - 1; high.value = hi
          bars[m].color = C.green; bars[m].s = 1.06
          status.value = '可行 → 答案 ≤ ' + m + '，向左找更小：high=' + hi
        }
        await d(500)
      } else {
        if (mode.value === 'max') {
          for (let i = m; i <= hi; i++) bars[i].color = C.ghost
          hi = m - 1; high.value = hi
          status.value = '不可行 → 答案 < ' + m + '，high=' + hi
        } else {
          for (let i = lo; i <= m; i++) bars[i].color = C.ghost
          lo = m + 1; low.value = lo
          status.value = '不可行 → 答案 > ' + m + '，low=' + lo
        }
        bars[m].color = C.red; bars[m].s = 1
        await d(500)
      }
      mid.value = -1
      layout()
    }
    if (a >= 0) {
      ans.value = a
      bars[a].color = C.green; bars[a].s = 1.2; layout()
      status.value = '🏁 分界 = ' + a + '（' + (mode.value==='max'?'最大':'最小') + '可行值）'
    } else {
      status.value = '❌ 无可行值'
    }
    await d(400)
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
  { id: "sec-1", name: "最优化→判定" },
  { id: "sec-2", name: "单调性" },
  { id: "sec-3", name: "最大可行值模板" },
  { id: "sec-4", name: "最小可行值模板" },
  { id: "sec-5", name: "经典例题" },
  { id: "sec-6", name: "常见误区" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-7", name: "小结" },
]

const maxCode = `// ─── 模板一：找「最大可行值」（check 单调递减）───
// 命中后不返回，low=mid+1 向右继续找更大的可行值

function maxFeasible(lo: number, hi: number, check: (x: number) => boolean): number {
    let ans = lo - 1                      // 一个小于所有候选的初值

    while (lo <= hi) {
        const mid = lo + ((hi - lo) >> 1)
        if (check(mid)) {
            ans = mid                     // mid 可行，答案至少是 mid
            lo = mid + 1                  // 向右找更大
        } else {
            hi = mid - 1                  // mid 不可行，答案必须小于 mid
        }
    }
    return ans
}

// 例：范围 [0,10]，最大可行 = 6
// low=0 high=10 mid=5 check(5)=true → ans=5 low=6
// low=6 high=10 mid=8 check(8)=false → high=7
// low=6 high=7  mid=6 check(6)=true  → ans=6 low=7
// low=7 high=7  mid=7 check(7)=false → high=6
// low=7 > high=6 结束，返回 6`

const minCode = `// ─── 模板二：找「最小可行值」（check 单调递增）───
// 命中后不返回，high=mid-1 向左继续找更小的可行值

function minFeasible(lo: number, hi: number, check: (x: number) => boolean): number {
    let ans = hi + 1                      // 一个大于所有候选的初值

    while (lo <= hi) {
        const mid = lo + ((hi - lo) >> 1)
        if (check(mid)) {
            ans = mid                     // mid 可行，答案至多是 mid
            hi = mid - 1                  // 向左找更小
        } else {
            lo = mid + 1                  // mid 不可行，答案必须大于 mid
        }
    }
    return ans
}

// 例：范围 [1,10]，最小可行 = 4
// low=1 high=10 mid=5 check(5)=true  → ans=5 high=4
// low=1 high=4  mid=2 check(2)=false → low=3
// low=3 high=4  mid=3 check(3)=false → low=4
// low=4 high=4  mid=4 check(4)=true  → ans=4 high=3
// low=4 > high=3 结束，返回 4`

const examplesCode = `// ─── 例 1：整数平方根 floor(sqrt(x)) ───
// check(m) = m*m <= x 单调递增 → 求「最大可行」
function mySqrt(x: number): number {
    let lo = 0, hi = x, ans = -1
    while (lo <= hi) {
        const mid = lo + ((hi - lo) >> 1)
        if (mid * mid <= x) { ans = mid; lo = mid + 1 }
        else hi = mid - 1
    }
    return ans
}
// mySqrt(8) → 2（2²=4<=8，3²=9>8）

// ─── 例 2：木棍切割 ───
// 把 wood[i] 切成若干 len 长木棍，总数 >= k，求最大 len
// check(len) 单调递减 → 最大可行
function maxCutLen(wood: number[], k: number): number {
    const check = (len: number) => {
        let cnt = 0
        for (const w of wood) cnt += Math.floor(w / len)
        return cnt >= k
    }
    let lo = 1, hi = Math.max(...wood), ans = 0
    while (lo <= hi) {
        const mid = lo + ((hi - lo) >> 1)
        if (check(mid)) { ans = mid; lo = mid + 1 }
        else hi = mid - 1
    }
    return ans
}
// maxCutLen([7,8,6], 3) → 6（7/6+8/6+6/6=1+1+1=3>=3；len=7 时只有 2 根）

// ─── 例 3：Koko 吃香蕉（LeetCode 875）───
// 求能在 h 小时内吃完的最小速度，check(speed) 单调递增 → 最小可行
function minEatingSpeed(piles: number[], h: number): number {
    const check = (speed: number) => {
        let hours = 0
        for (const p of piles) hours += Math.ceil(p / speed)
        return hours <= h
    }
    let lo = 1, hi = Math.max(...piles), ans = hi
    while (lo <= hi) {
        const mid = lo + ((hi - lo) >> 1)
        if (check(mid)) { ans = mid; hi = mid - 1 }
        else lo = mid + 1
    }
    return ans
}
// minEatingSpeed([3,6,7,11], 8) → 4`

const pitfallsCode = `// ─── 常见错误 ───

// ❌ 错误 1：check 不单调
// check(x) = x 是偶数 → 可行区 [偶,偶,偶,偶] 断断续续，二分会切掉答案
// 先 O(n) 验证单调性再二分

// ❌ 错误 2：范围没圈住答案
// hi = 100 但真实答案是 200 → 永远找不到。范围往宽取（0 ~ 2^31）

// ❌ 错误 3：死循环
// 命中后 low/high 不前进 → 卡死。统一 ans=mid + low=mid+1 / high=mid-1

// ❌ 错误 4：check 太慢
// 整体 = O(log range) × O(check)。check 写成 O(n²) 直接超时，尽量 O(n)`
</script>
