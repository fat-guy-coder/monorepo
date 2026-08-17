<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🖋️ 欧拉路径与欧拉回路：Hierholzer 算法</h1>
          <p class="text-sm text-slate-500 mt-1">一笔画问题 —— 每条边恰好走一次</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-6-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：一笔画 —— 每条边恰好走一次
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>欧拉路径</strong>：恰好经过<strong>每条边一次</strong>的路径（顶点可重复）；
          <strong>欧拉回路</strong>：起点 = 终点的欧拉路径。下图的「8 字图」每个顶点度数都是偶数，
          因此存在欧拉回路，比如 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">A→B→C→A→D→E→A</code>（橙色数字是行走顺序 1→6）。
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <text x="16" y="22" font-size="12" font-family="monospace" fill="#64748b" font-weight="bold">无向图 G（8 字图）—— 每个顶点度数为偶数，可一笔画成回路</text>

            <!-- 边 -->
            <line x1="330" y1="105" x2="180" y2="215" stroke="#94a3b8" stroke-width="2" />
            <line x1="180" y1="215" x2="480" y2="215" stroke="#94a3b8" stroke-width="2" />
            <line x1="480" y1="215" x2="330" y2="105" stroke="#94a3b8" stroke-width="2" />
            <line x1="330" y1="105" x2="470" y2="45" stroke="#94a3b8" stroke-width="2" />
            <line x1="470" y1="45" x2="585" y2="105" stroke="#94a3b8" stroke-width="2" />
            <line x1="585" y1="105" x2="330" y2="105" stroke="#94a3b8" stroke-width="2" />

            <!-- 行走顺序标注 -->
            <text x="248" y="152" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#f59e0b">1</text>
            <text x="330" y="205" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#f59e0b">2</text>
            <text x="412" y="152" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#f59e0b">3</text>
            <text x="396" y="68" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#f59e0b">4</text>
            <text x="530" y="68" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#f59e0b">5</text>
            <text x="457" y="95" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#f59e0b">6</text>

            <!-- 节点 -->
            <circle cx="330" cy="105" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="330" y="105" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <circle cx="180" cy="215" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="180" y="215" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <circle cx="480" cy="215" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="480" y="215" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <circle cx="470" cy="45" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="470" y="45" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
            <circle cx="585" cy="105" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="585" y="105" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">E</text>

            <text x="16" y="248" font-size="11" font-family="monospace" fill="#64748b">度数：A=4, B=2, C=2, D=2, E=2 —— 全部偶数 ⇒ 存在欧拉回路（从任意点出发均可）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：8 字图 —— 两个三角形共享顶点 A，每条边恰好走一次的一笔画路线</figcaption>
        </figure>

        <!-- 操作示意图 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：判定（数奇偶度） → Hierholzer（拆边走环）</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">判定：统计每个顶点的度数，数奇度点</p>
            <svg viewBox="0 0 300 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <line x1="150" y1="55" x2="80" y2="130" stroke="#94a3b8" stroke-width="2" />
              <line x1="80" y1="130" x2="220" y2="130" stroke="#94a3b8" stroke-width="2" />
              <line x1="220" y1="130" x2="150" y2="55" stroke="#94a3b8" stroke-width="2" />
              <line x1="150" y1="55" x2="215" y2="30" stroke="#94a3b8" stroke-width="2" />
              <line x1="215" y1="30" x2="265" y2="80" stroke="#94a3b8" stroke-width="2" />
              <line x1="265" y1="80" x2="150" y2="55" stroke="#94a3b8" stroke-width="2" />
              <circle cx="150" cy="55" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="150" y="55" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <text x="150" y="85" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">deg=4</text>
              <circle cx="80" cy="130" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="80" y="130" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <text x="80" y="158" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">deg=2</text>
              <circle cx="220" cy="130" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="220" y="130" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
              <text x="220" y="158" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">deg=2</text>
              <circle cx="215" cy="30" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="215" y="30" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
              <text x="215" y="8" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">deg=2</text>
              <circle cx="265" cy="80" r="18" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="265" y="80" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">E</text>
              <text x="265" y="108" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">deg=2</text>
              <text x="150" y="168" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">奇度点 = 0 → 欧拉回路 ✓</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">判定口诀：0 个奇度点 → 回路；恰 2 个 → 路径；否则无解</figcaption>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">Hierholzer：贪心拆边走环，得到一笔画顺序</p>
            <svg viewBox="0 0 340 170" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="eh-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a" />
                </marker>
              </defs>
              <line x1="45" y1="60" x2="59" y2="60" stroke="#16a34a" stroke-width="2.5" marker-end="url(#eh-arr)" />
              <line x1="95" y1="60" x2="109" y2="60" stroke="#16a34a" stroke-width="2.5" marker-end="url(#eh-arr)" />
              <line x1="145" y1="60" x2="159" y2="60" stroke="#16a34a" stroke-width="2.5" marker-end="url(#eh-arr)" />
              <line x1="195" y1="60" x2="209" y2="60" stroke="#16a34a" stroke-width="2.5" marker-end="url(#eh-arr)" />
              <line x1="245" y1="60" x2="259" y2="60" stroke="#16a34a" stroke-width="2.5" marker-end="url(#eh-arr)" />
              <line x1="295" y1="60" x2="309" y2="60" stroke="#16a34a" stroke-width="2.5" marker-end="url(#eh-arr)" />
              <circle cx="35" cy="60" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="35" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <circle cx="85" cy="60" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="85" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <circle cx="135" cy="60" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="135" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
              <circle cx="185" cy="60" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="185" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <circle cx="235" cy="60" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="235" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
              <circle cx="285" cy="60" r="16" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="285" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#ffffff">E</text>
              <circle cx="320" cy="60" r="16" fill="#4ade80" stroke="#16a34a" stroke-width="2.5" />
              <text x="320" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">A</text>
              <text x="170" y="100" text-anchor="middle" font-size="10" font-family="monospace" fill="#16a34a" font-weight="bold">A→B→C→A→D→E→A（6 条边恰好一次）</text>
              <text x="16" y="130" font-size="10" font-family="monospace" fill="#64748b">终点 = 起点 → 欧拉回路 ✓</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">Hierholzer 输出完整回路：起点终点重合，每条边恰好一次</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 定义与判定 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          欧拉路径 / 回路的定义与判定（度数奇偶条件）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>一笔画</strong>问题的答案是确定的：<strong>无向连通图</strong>（忽略孤立点）中——
          所有顶点度数为偶数 ⇒ 存在<strong>欧拉回路</strong>；恰好 2 个顶点度数为奇数 ⇒ 存在<strong>欧拉路径</strong>
          （必须从其中一个奇度点出发、在另一个奇度点结束）；其他情况既无回路也无路径。
          判定只需<strong>数一遍度数</strong>，O(V+E)。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>统计每个顶点的度数（无向图 = 关联边数）</li>
          <li>数奇度点个数：0 → 回路；2 → 路径；其余 → 无解</li>
          <li>检查<strong>连通性</strong>（忽略孤立点）——不连通则条件失效</li>
          <li>有向图版本：入度 = 出度 → 回路；恰一个「出−入=1」与一个「入−出=1」→ 路径</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="eulerJudgeCode" title="euler_judge.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          欧拉回路 ≈ <strong>快递员遍历每条街道恰好一次回到起点</strong>：路线设计要保证每条街道都被投递且不重复。<br/>
          奇偶条件 ≈ <strong>十字路口的进出平衡</strong>：一个路口「进来的路」必须等于「出去的路」（偶数），否则要么卡在路口进不来、要么出不去——只有起点和终点可以例外（2 个奇度点）。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 1：只数度数，忘了判连通</strong><br/>
          两个互不相连的环：每个点度数都是 2（全偶），却不存在欧拉回路——边不在同一个连通块里。
          判定前必须先确认<strong>忽略孤立点后图连通</strong>。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误 2：把「边不重复」和「点不重复」混为一谈</strong><br/>
          欧拉路径要求<strong>边</strong>不重复（顶点可重复）；哈密顿路径要求<strong>点</strong>不重复。
          这是两个不同问题：欧拉有简洁的度数判定，哈密顿是 NP 难——别用欧拉的判定去判哈密顿。</p>
        </aside>
      </section>

      <!-- 2. Hierholzer 原理 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          Hierholzer 算法 —— 贪心删边 + 回路拼接
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          核心思想：从任意点出发，<strong>有边就走、走一条删一条</strong>（把边「拆掉」）；
          走到一个没有剩余边的死胡同时，<strong>弹栈</strong>把该点记入答案——弹栈顺序天然把走过的<strong>子环拼接进主环</strong>，
          因为中间那些「绕回来的环」已经在栈里等待。无需回溯搜索，正确性由「度数全偶」保证。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>建<strong>多重集邻接表</strong>（每条边在两端各存一次）</li>
          <li>从起点压栈；栈顶 u 还有未走边 → 任取一条 (u,v)，<strong>同时删除 v 侧的反向边</strong>，v 入栈</li>
          <li>栈顶 u 无未走边 → 弹栈，把 u 加入答案路径</li>
          <li>栈空结束：答案就是欧拉路径/回路</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Hierholzer ≈ <strong>边走边拆桥，走不通就回头把子环拼进主环</strong>。<br/>
          像在迷宫/景区里走「不留回头路」的路线：遇到岔路先钻进去，走完一个环回到主路继续走；
          最后把所有走过的路拼起来，恰好覆盖全部街道一次。栈就是你的「走过的路清单」。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：删除边不同步（只删了单向）</strong><br/>
          无向图每条边在两端各存一次，走 (u,v) 时必须同时把 v 邻接表里的 u 删掉。
          只删一边会导致同一物理边被<strong>走两次</strong>，破坏「恰好一次」的语义。</p>
        </aside>
      </section>

      <!-- 3. 实现 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          实现：栈 + 邻接表 multiset
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          邻接表就是天然的 <strong>multiset</strong>（允许重复边）。用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">pop()</code>
          取最后一条边（任意一条都行，<strong>选边顺序不影响正确性</strong>），再用 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">indexOf + splice</code>
          删掉反向边。栈顶无路可走时弹栈入答案，栈空即完成。
        </p>
        <div class="mb-4"><Code language="ts" :code="hierholzerCode" title="hierholzer.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          栈 ≈ <strong>浏览器前进后退记录</strong>：走到死路（无链接可点）就后退一步，退到有路的地方继续走。
          最终把「前进后退的历史」整理成一条完整路线。<br/>
          邻接表 multiset ≈ <strong>每条边一张「票」</strong>：走过就撕票，票根在对面端点也同步撕掉，保证不会重复用同一张票。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：递归版忘了 reverse</strong><br/>
          递归版是「后序入列」，得到的是<strong>逆序</strong>，必须 <code class="bg-slate-100 text-amber-700 px-1.5 py-0.5 rounded text-xs font-mono">reverse()</code>；
          本文的<strong>迭代栈版</strong>弹栈顺序即正确顺序，无需反转。两种写法别混着用。</p>
        </aside>
      </section>

      <!-- 4. 应用 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          应用：一笔画、DNA 拼接与 de Bruijn 序列
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          欧拉路径最大的舞台是 <strong>de Bruijn 图</strong>：把每个 k-mer（长度 k 的 DNA 片段）看成一条边
          「前 k−1 碱基 → 后 k−1 碱基」，整段 DNA 就是一条<strong>经过所有 k-mer 边恰好一次的欧拉路径</strong>。
          测序仪吐出的海量短读段（reads）拼回完整基因组，正是靠这个模型。前端里，一笔画也出现在
          <strong>SVG/Canvas 路径遍历、动画关键帧顺序</strong>等场景。
        </p>
        <div class="mb-4"><Code language="ts" :code="eulerAppCode" title="euler_applications.ts" /></div>
        <ul class="space-y-2 text-slate-600 mb-4 text-sm">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>一笔画游戏</strong>（「一笔画完」类 APP）：判定 + Hierholzer 直接给出画法</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>DNA 测序组装</strong>：de Bruijn 图上求欧拉路径，拼接完整基因组</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>中国邮递员问题</strong>：先求最短路径补边，再在补边后的图上求欧拉回路</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>词链/成语接龙</strong>：以首尾字母建边，求欧拉路径</span></li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          de Bruijn ≈ <strong>k-mer 拼图</strong>：把长序列切成一个个重叠的小片段，像拼图一样让相邻片段重叠 k−1 位，
          拼出一条长序列——欧拉路径保证「每片只用一次、顺序恰好还原」。<br/>
          一笔画 ≈ 前端里<strong>遍历所有连线恰好一次</strong>的路径规划，比如 SVG 描边动画的绘制顺序。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>路径型（恰 2 个奇度点）时，Hierholzer 的起点必须选在<strong>奇度点</strong>上，否则可能走不完所有边；回路型任意起点皆可。</p>
        </aside>
      </section>

      <!-- 5. 复杂度与总结 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          复杂度 O(E) 与要点回顾
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-2">⏱️ 复杂度</p>
            <ul class="text-xs text-slate-600 space-y-1 font-mono">
              <li>判定（数度数 + 连通性）：O(V+E)</li>
              <li>Hierholzer：每条边恰好进出一回 → O(E)</li>
              <li>总：O(V+E)，线性</li>
              <li>空间：邻接表 multiset O(V+E)</li>
            </ul>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-2">✅ 三件事</p>
            <ul class="text-xs text-slate-600 space-y-1">
              <li>▸ <strong>判定</strong>：0 奇度 → 回路；2 奇度 → 路径；否则无解</li>
              <li>▸ <strong>前提</strong>：忽略孤立点后图必须连通</li>
              <li>▸ <strong>求解</strong>：Hierholzer 贪心拆边 + 弹栈拼接</li>
            </ul>
          </div>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：路径型从「任意点」出发</strong><br/>
          恰有 2 个奇度点时，只有从<strong>奇度点</strong>出发、在另一个奇度点结束才能用完所有边。
          从偶度点出发会提前走进死胡同，剩下的边走不完。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>先数奇偶度做判定，再跑 Hierholzer；遇到「每条边恰好一次」的描述，第一反应就是欧拉路径家族（无向判定 + de Bruijn 图是两大高频考法）。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：判定 + Hierholzer 求欧拉回路
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          固定 8 字图（含欧拉回路）。「判定」统计度数、标出奇度点（红色）；
          「Hierholzer 求回路」逐步拆边走环：当前边橙色 → 走过的边变绿，节点下方标注当前度数，
          最终在底部展示完整一笔画路径序列。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🔗 边数: {{ edgeCount }}</span>
          <span v-if="pathSeq" class="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-mono">🧵 {{ pathSeq }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="runJudge" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300 hover:shadow-sm">🧭 判定</button>
          <button @mousedown="runHierholzer" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">🖋️ Hierholzer 求回路</button>
          <button @mousedown="doReset" :disabled="busy"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ 重置</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-line v-for="e in gEdges" :key="'e'+e.from+e.to" :config="edgeCfg(e)" />
              <v-circle v-for="n in gNodes" :key="'c'+n.id" :config="circleCfg(n)" />
              <v-text v-for="n in gNodes" :key="'t'+n.id" :config="labelCfg(n)" />
              <v-text v-for="n in gNodes" :key="'m'+n.id" :config="metaCfg(n)" />
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
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>定义</strong>：欧拉路径 = 每条边恰好一次的路径；欧拉回路 = 起点终点的欧拉路径</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>判定</strong>：0 奇度点 → 回路；恰 2 奇度点 → 路径（奇度点为起终点）；其余无解</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>前提</strong>：忽略孤立点后图必须连通，否则判定失效</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Hierholzer</strong>：贪心拆边走环 + 死胡同弹栈拼接；同步删反向边</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>实现</strong>：栈 + 邻接表 multiset；迭代栈版无需 reverse，递归版需要</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度</strong>：O(V+E) 线性；应用：一笔画、DNA 拼接（de Bruijn 图）、邮递员问题</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-6-connectivity/dsa-6-6-2-bridge-cut" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：桥与割点：Tarjan求无向图连通性</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-7-sort/dsa-7-0-sort-basics/dsa-7-0-1-overview" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：排序总览：稳定性与分类 →</RouterLink>
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
  { id: "sec-1", name: "定义与判定" },
  { id: "sec-2", name: "Hierholzer 原理" },
  { id: "sec-3", name: "栈实现" },
  { id: "sec-4", name: "应用：一笔画/DNA" },
  { id: "sec-5", name: "复杂度与总结" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 欧拉回路动画 =====
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(360), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const pathSeq = ref('')
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

interface GNode { id: string; label: string; x: number; y: number; color: string }
interface GEdge { from: string; to: string; color: string }
const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])
const meta = reactive<Record<string, string>>({ A:'', B:'', C:'', D:'', E:'' })

const NODES = ['A', 'B', 'C', 'D', 'E']
const POS: Record<string, { x: number; y: number }> = {
  A: { x: 330, y: 105 }, B: { x: 180, y: 215 }, C: { x: 480, y: 215 },
  D: { x: 470, y: 45 }, E: { x: 585, y: 105 },
}
// 无向边（8 字图：两个三角形共享顶点 A），全部顶点度数偶数
const EDGES: [string, string][] = [['A','B'], ['B','C'], ['C','A'], ['A','D'], ['D','E'], ['E','A']]

const edgeCount = computed(() => gEdges.length)

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)
  NODES.forEach(id => gNodes.push({ id, label: id, x: POS[id].x, y: POS[id].y, color: C.cyan }))
  EDGES.forEach(([a, b]) => gEdges.push({ from: a, to: b, color: '#94a3b8' }))
  for (const id of NODES) meta[id] = ''
}
function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function colorOf(id: string, c: string) { const n = pos(id); if (n) n.color = c }
function allCyan() { gNodes.forEach(n => n.color = C.cyan) }
function edgeOf(a: string, b: string): GEdge | undefined {
  return gEdges.find(e => (e.from === a && e.to === b) || (e.from === b && e.to === a))
}
function resetAll() {
  allCyan()
  gEdges.forEach(e => e.color = '#94a3b8')
  for (const id of NODES) meta[id] = ''
  pathSeq.value = ''
  status.value = ''; opLabel.value = ''
}
function edgeCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  const hot = e.color !== '#94a3b8'
  return { points: [a.x, a.y, b.x, b.y], stroke: e.color, strokeWidth: hot ? 3.5 : 2, lineCap: 'round' as const }
}
function circleCfg(n: GNode) {
  let stroke = '#0891b2', sw = 1.5
  if (n.color === C.orange) { stroke = '#d97706'; sw = 3 }
  else if (n.color === C.green) { stroke = '#16a34a'; sw = 3 }
  else if (n.color === C.red) { stroke = '#b91c1c'; sw = 3 }
  return { x: n.x, y: n.y, radius: 22, fill: n.color, stroke, strokeWidth: sw, shadowColor: 'rgba(0,0,0,.12)', shadowBlur: 5, shadowOffsetY: 2 }
}
function labelCfg(n: GNode) {
  return { x: n.x - 22, y: n.y - 22, width: 44, height: 44, text: n.label, fontSize: 15, fontFamily: 'monospace', fontStyle: 'bold', fill: n.color === C.green ? C.text : '#fff', align: 'center', verticalAlign: 'middle' }
}
function metaCfg(n: GNode) {
  return { x: n.x - 30, y: n.y + 24, width: 60, height: 14, text: meta[n.id] || '', fontSize: 10, fontFamily: 'monospace', fill: C.muted, align: 'center', verticalAlign: 'middle' }
}

async function runJudge() {
  if (busy.value) return
  busy.value = true; opLabel.value = '判定 O(V+E)'
  resetAll()
  try {
    const deg: Record<string, number> = {}
    for (const n of gNodes) deg[n.id] = 0
    for (const e of gEdges) { deg[e.from]++; deg[e.to]++ }
    const odd: string[] = []
    for (const id of NODES) {
      meta[id] = 'deg:' + deg[id]
      if (deg[id] % 2 === 1) { odd.push(id); colorOf(id, C.red) }
    }
    await d(700)
    status.value = odd.length === 0
      ? '✅ 所有顶点度数均为偶数 → 存在欧拉回路'
      : odd.length === 2
        ? '🟠 恰好 2 个奇度点 ' + odd.join('、') + ' → 存在欧拉路径（从奇度点出发）'
        : '❌ 奇度点 ' + odd.length + ' 个 → 既无回路也无路径'
  } finally {
    await d(400); busy.value = false; opLabel.value = ''
  }
}

async function runHierholzer() {
  if (busy.value) return
  busy.value = true; opLabel.value = 'Hierholzer O(E)'
  resetAll()
  try {
    // 多重集邻接表：每条边在两端各存一次
    const adj: Record<string, string[]> = {}
    for (const n of gNodes) adj[n.id] = []
    for (const e of gEdges) { adj[e.from].push(e.to); adj[e.to].push(e.from) }
    const stack: string[] = ['A']
    const path: string[] = []
    while (stack.length) {
      const u = stack[stack.length - 1]
      colorOf(u, C.orange)
      if (adj[u].length) {
        const v = adj[u].pop()!
        const idx = adj[v].indexOf(u)
        if (idx >= 0) adj[v].splice(idx, 1)          // 同步删除反向边
        const e = edgeOf(u, v)
        if (e) e.color = C.orange
        status.value = `从 ${u} 贪心走边 ${u}—${v}（拆掉这条边）`
        await d(550)
        if (e) e.color = C.green                     // 走过的边变绿
        stack.push(v)
      } else {
        stack.pop()
        path.push(u)
        colorOf(u, C.green)
        pathSeq.value = path.join('→')
        status.value = `${u} 无路可走，弹栈拼入路径：${path.join('→')}`
        await d(550)
      }
    }
    status.value = `✅ 欧拉回路：${path.join(' → ')}（每条边恰好一次）`
  } finally {
    await d(400); busy.value = false; opLabel.value = ''
  }
}

function doReset() {
  if (busy.value) return
  resetAll()
}

let ro: ResizeObserver | null = null
onMounted(() => {
  initGraph()
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) { W.value = w } })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const eulerJudgeCode = `// ===== 欧拉路径/回路的判定（度数奇偶条件）=====
// 无向图（忽略孤立点）：
//   所有点度数为偶数     → 存在欧拉回路
//   恰好 2 个点度数为奇数 → 存在欧拉路径（奇度点为起点和终点）
//   其他                 → 都不存在
function eulerType(n: number, adj: number[][]): 'circuit' | 'path' | 'none' {
    const deg = new Array<number>(n).fill(0)
    for (let u = 0; u < n; u++) for (const v of adj[u]) deg[u]++
    const odd = deg.filter(d => d % 2 === 1).length
    if (odd === 0) return 'circuit'
    if (odd === 2) return 'path'
    return 'none'
}
// ⚠️ 前提：忽略孤立点后图必须连通！
// 例：两个互不相连的环，每个点度数都是 2（全偶），却没有欧拉回路

// 有向图版本：
//   入度 === 出度（每个点）         → 欧拉回路
//   恰一个点 出-入=1，恰一个点 入-出=1 → 欧拉路径
//   其余                             → 无解
// 判定复杂度：O(V+E)，只需数一遍度数`

const hierholzerCode = `// ===== Hierholzer：贪心走边 + 死胡同弹栈（栈实现）=====
// 核心：有边就走（走一条删一条），走到死胡同就弹栈入路径——
// 弹栈顺序天然把子环拼进主环，无需回溯搜索。
function hierholzer(n: number, adj0: number[][]): number[] {
    const adj = adj0.map(list => [...list])   // 复制邻接表（multiset）
    const stack: number[] = [0]               // 回路型：任意起点
    const path: number[] = []
    while (stack.length) {
        const u = stack[stack.length - 1]
        if (adj[u].length) {
            const v = adj[u].pop()!               // 贪心取一条未走边
            const idx = adj[v].indexOf(u)         // 同步删除反向边
            if (idx >= 0) adj[v].splice(idx, 1)
            stack.push(v)
        } else {
            path.push(stack.pop()!)               // 死胡同：弹栈拼接
        }
    }
    return path   // 迭代栈版得到的顺序就是正确回路，无需 reverse
}
// 例：三角形 0-1-2-0 → 返回 [0,1,2,0]
// ⚠️ 递归版（后序入列）需要 reverse(ans)；迭代栈版不需要，别混用
// 复杂度：每条边恰好进出一回 → O(E)`

const eulerAppCode = `// ===== 应用：判定 + 起终点 + 完整求解 =====
function hierholzerFrom(n: number, adj0: number[][], start: number): number[] {
    const adj = adj0.map(list => [...list])
    const stack: number[] = [start]
    const path: number[] = []
    while (stack.length) {
        const u = stack[stack.length - 1]
        if (adj[u].length) {
            const v = adj[u].pop()!
            const idx = adj[v].indexOf(u)
            if (idx >= 0) adj[v].splice(idx, 1)
            stack.push(v)
        } else {
            path.push(stack.pop()!)
        }
    }
    return path
}

function solveEuler(n: number, adj: number[][]): number[] {
    const deg = adj.map(list => list.length)
    const odd = deg.map((d, u) => (d % 2 === 1 ? u : -1)).filter(u => u >= 0)
    if (odd.length !== 0 && odd.length !== 2) return []   // 无解
    // 路径型必须从奇度点出发；回路型任意起点
    const start = odd.length === 2 ? odd[0] : 0
    return hierholzerFrom(n, adj, start)
}

// 应用 1：一笔画游戏 —— 先 solveEuler 判定/求解，直接给出画法
// 应用 2：DNA 拼接（de Bruijn 图）——
//   每个 k-mer 是边「前 k-1 碱基 → 后 k-1 碱基」
//   整段 DNA = 经过所有 k-mer 恰好一次的欧拉路径
// 应用 3：中国邮递员问题 —— 最短路径补边后再求欧拉回路`
</script>
