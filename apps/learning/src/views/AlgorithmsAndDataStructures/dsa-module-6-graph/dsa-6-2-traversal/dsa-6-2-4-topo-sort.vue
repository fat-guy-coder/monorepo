<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">📐 拓扑排序：Kahn算法 / DFS后序, AOV网</h1>
          <p class="text-sm text-slate-500 mt-1">把「依赖关系」排成一条合法的先后顺序</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-2-4</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📐</span>
          结构总览：把「先决条件」排成合法顺序
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          边 <code>A → B</code> 表示「A 必须在 B 之前」。<strong>拓扑排序</strong>就是把所有节点排成一个线性序列，使每条边的起点都排在终点前面。
          左边 DAG（有向无环图）的一个合法拓扑序是 <strong>A → C → F → B → D → E</strong>（不唯一）。
          右边两图演示 <strong>Kahn 算法</strong>的一步：弹出入度为 0 的节点，让它的后继入度 −1。
        </p>
        <figure class="mb-4">
          <svg viewBox="0 0 720 280" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ov-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <line x1="150" y1="72" x2="84" y2="140" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <line x1="166" y1="72" x2="294" y2="140" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <line x1="92" y1="162" x2="118" y2="208" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <line x1="288" y1="162" x2="122" y2="208" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <line x1="312" y1="162" x2="344" y2="208" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <line x1="132" y1="252" x2="214" y2="252" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />
            <line x1="338" y1="252" x2="246" y2="252" stroke="#94a3b8" stroke-width="2" marker-end="url(#ov-arr)" />

            <circle cx="150" cy="50" r="22" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" />
            <text x="150" y="50" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
            <text x="150" y="84" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">入度:0</text>

            <circle cx="80" cy="140" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="80" y="140" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
            <text x="80" y="174" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">入度:1</text>

            <circle cx="300" cy="140" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="300" y="140" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
            <text x="300" y="174" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">入度:1</text>

            <circle cx="120" cy="230" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="120" y="230" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
            <text x="120" y="264" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">入度:2</text>

            <circle cx="220" cy="230" r="22" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
            <text x="220" y="230" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#0f172a">E</text>
            <text x="220" y="264" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">入度:2</text>

            <circle cx="340" cy="230" r="22" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
            <text x="340" y="230" text-anchor="middle" dominant-baseline="central" font-size="15" font-family="monospace" font-weight="bold" fill="#ffffff">F</text>
            <text x="340" y="264" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">入度:1</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：AOV 网（Activity On Vertex）—— 顶点是活动，边是依赖。入度为 0 的节点随时可以开工（橙色 A 最先出队）。</figcaption>
        </figure>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <figure>
            <svg viewBox="0 0 340 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="kb-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <text x="120" y="18" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">Before：A 入度为 0，准备出队</text>
              <line x1="120" y1="68" x2="70" y2="148" stroke="#94a3b8" stroke-width="2" marker-end="url(#kb-arr)" />
              <line x1="134" y1="68" x2="176" y2="148" stroke="#94a3b8" stroke-width="2" marker-end="url(#kb-arr)" />
              <line x1="82" y1="168" x2="114" y2="228" stroke="#94a3b8" stroke-width="2" marker-end="url(#kb-arr)" />
              <line x1="164" y1="168" x2="126" y2="228" stroke="#94a3b8" stroke-width="2" marker-end="url(#kb-arr)" />
              <circle cx="120" cy="50" r="20" fill="#f59e0b" stroke="#d97706" stroke-width="2.5" />
              <text x="120" y="50" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">A</text>
              <text x="120" y="84" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">in:0</text>
              <circle cx="70" cy="150" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="70" y="150" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <text x="70" y="182" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">in:1</text>
              <circle cx="170" cy="150" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="170" y="150" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
              <text x="170" y="182" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">in:1</text>
              <circle cx="120" cy="230" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="120" y="230" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
              <text x="120" y="252" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">in:2</text>
              <rect x="215" y="70" width="105" height="26" rx="6" fill="#06b6d4" />
              <text x="267" y="83" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">队列: [A]</text>
              <text x="267" y="120" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">入度表</text>
              <text x="267" y="138" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">A:0 B:1 C:1 D:2</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">Before：只有入度为 0 的 A 在队列中；B/C 的入度 1 来自 A，D 的入度 2 来自 B+C。</figcaption>
          </figure>
          <figure>
            <svg viewBox="0 0 340 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="ka-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                </marker>
              </defs>
              <text x="120" y="18" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#64748b">After：A 出队，B/C 入度归 0 入队</text>
              <line x1="120" y1="68" x2="70" y2="148" stroke="#94a3b8" stroke-width="2" marker-end="url(#ka-arr)" />
              <line x1="134" y1="68" x2="176" y2="148" stroke="#94a3b8" stroke-width="2" marker-end="url(#ka-arr)" />
              <line x1="82" y1="168" x2="114" y2="228" stroke="#94a3b8" stroke-width="2" marker-end="url(#ka-arr)" />
              <line x1="164" y1="168" x2="126" y2="228" stroke="#94a3b8" stroke-width="2" marker-end="url(#ka-arr)" />
              <circle cx="120" cy="50" r="20" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
              <text x="120" y="50" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#0f172a">A</text>
              <text x="120" y="84" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">输出 ①</text>
              <circle cx="70" cy="150" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="70" y="150" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">B</text>
              <text x="70" y="182" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#16a34a">in:0 ✓</text>
              <circle cx="170" cy="150" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="170" y="150" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">C</text>
              <text x="170" y="182" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#16a34a">in:0 ✓</text>
              <circle cx="120" cy="230" r="20" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="120" y="230" text-anchor="middle" dominant-baseline="central" font-size="14" font-family="monospace" font-weight="bold" fill="#ffffff">D</text>
              <text x="120" y="252" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">in:2→0</text>
              <rect x="215" y="70" width="105" height="26" rx="6" fill="#06b6d4" />
              <text x="267" y="83" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" font-weight="bold" fill="#ffffff">队列: [B, C]</text>
              <text x="267" y="120" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#64748b">入度表</text>
              <text x="267" y="138" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">A:0 B:0 C:0 D:0</text>
              <text x="267" y="156" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#64748b">输出: [A]</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">After：A 出队输出；A 的后继 B、C 入度 −1 归 0，立即入队 —— 队头 B 下一个输出。</figcaption>
          </figure>
        </div>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">1</span>
          拓扑排序定义与 AOV 网
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <strong>AOV 网（Activity On Vertex）</strong>：用<strong>有向无环图（DAG）</strong>表示活动之间的依赖，
          顶点 = 活动，有向边 <code>u → v</code> = 「u 必须在 v 之前完成」。
          <strong>拓扑排序</strong>：把 DAG 的所有顶点排成一个线性序列，使得对每条边 <code>u → v</code>，u 都出现在 v 前面。
        </p>
        <ol class="space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>1.</strong> 拓扑序<strong>不唯一</strong>：只要满足所有依赖约束即可</li>
          <li><strong>2.</strong> 有环的图<strong>不存在</strong>拓扑序（A 依赖 B、B 又依赖 A，谁先谁后都矛盾）</li>
          <li><strong>3.</strong> 判环与拓扑排序是一体两面：排不出来 = 有环</li>
          <li><strong>4.</strong> 两种经典实现：Kahn（入度表 + 队列）与 DFS 后序</li>
        </ol>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <strong>npm / yarn / pnpm</strong> 解析依赖时按拓扑序安装：先装依赖再装依赖它的包；<strong>webpack / Vite 构建</strong>按依赖图确定 chunk 的编译与加载顺序；<strong>CI 构建系统</strong>（如 Jenkins 流水线、Makefile）先编译被依赖的模块，再编译依赖它的模块——全是 AOV 网拓扑排序。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">2</span>
          Kahn 算法：入度表 + 队列
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          入度 = 指向该节点的边数。入度为 0 意味着「所有前置都已完成」，可以放心输出。
          Kahn 算法反复「<strong>弹出入度为 0 的节点 → 输出 → 让它的后继入度 −1</strong>」。
        </p>
        <ol class="space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>1.</strong> 统计所有节点入度，入度为 0 的节点入队</li>
          <li><strong>2.</strong> 出队 u，输出 u</li>
          <li><strong>3.</strong> 对 u 的每个后继 v：入度 −1；减到 0 就入队</li>
          <li><strong>4.</strong> 队列空：输出数 = 节点数 → 拓扑序；否则有环</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="kahnCode" title="kahn.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          像<strong>排队做体检</strong>：先处理所有「不需要等别人」的项目（入度 0），做完一项后，后面等着它的项目排队资格就少了一项；全部清空 = 体检顺序搞定。也像 <strong>npm install</strong>：先装没依赖的包，再装依赖它们的包。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：判环条件写错。</strong><br/>
          队列空时，若 <strong>输出的节点数 &lt; 总节点数</strong>，说明剩余节点入度永远大于 0 —— 它们构成环。用「输出数是否等于总数」判环，而不是「队列是否为空」。</p>
        </aside>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">3</span>
          DFS 后序法：后序逆序 = 拓扑序
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          对 DAG 做 DFS：一个节点的所有后继都完成后（<strong>后序时机</strong>）才把它记入序列，得到的是
          <strong>逆拓扑序</strong>——因为「被依赖的节点（后继）先被记录」。把序列 <code>reverse()</code> 就是拓扑序。
          同时用<strong>三色标记</strong>（白/灰/黑）可以在遍历中直接判环。
        </p>
        <ol class="space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>1.</strong> 从任意未访问节点开始递归 DFS</li>
          <li><strong>2.</strong> 节点标记灰色（在递归栈中）；遇到灰色邻居 = 有环</li>
          <li><strong>3.</strong> 所有后继完成后标记黑色，并<strong>后序记录</strong>该节点</li>
          <li><strong>4.</strong> 全部完成：后序序列 reverse() 即拓扑序</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="dfsTopoCode" title="topo-dfs.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <strong>Git 提交图</strong>的「祖先先于后代」本质是 DAG 拓扑序；<strong>Vue 组件的生命周期</strong>中「先父后子挂载、先子后父卸载」也对应前序/后序两种时机——后序恰好用于「先完成所有依赖（子组件）再处理自己（父组件）」。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：忘了逆序，或只用黑白两态。</strong><br/>
          后序序列本身是<strong>逆拓扑序</strong>，不 reverse 直接当答案就错了；而且判环必须区分「灰（栈中）」与「黑（已完成）」，只用 visited 会漏判环。</p>
        </aside>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">4</span>
          判环与拓扑序应用：课程表 / 依赖解析
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          拓扑排序最经典的工程应用是<strong>课程表</strong>（LeetCode 207/210）：<code>prerequisites[i] = [a, b]</code> 表示「先修 b 才能修 a」。
          用 Kahn 算法排课，如果输出的课程数不足 <code>numCourses</code>，就说明先修关系成环，无法完成全部课程。
        </p>
        <div class="mb-4"><Code language="ts" :code="courseCode" title="course-schedule.ts" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <strong>依赖解析器</strong>（npm/webpack/yarn）处理「循环依赖」时报错、<strong>lerna/turborepo 多包构建</strong>按依赖图排序任务、<strong>Vite 的模块图</strong>决定预构建顺序——都是 Kahn/DFS 拓扑序 + 判环。浏览器渲染的「样式表与脚本执行顺序」也常被建模为拓扑排序。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>需要<strong>输出顺序</strong>用 Kahn（直观、可边做边输出）；需要<strong>同时判环</strong>或递归风格用 DFS 后序。两者都是 O(V+E)。</p>
        </aside>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">5</span>
          复杂度分析与常见错误
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">算法</th><th class="px-4 py-2 border border-slate-200 font-semibold">时间复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold">空间复杂度</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">Kahn 算法</td><td class="px-4 py-2 border">O(V+E)</td><td class="px-4 py-2 border">O(V)</td><td class="px-4 py-2 border">入度表 + 队列，边各减一次</td></tr>
              <tr><td class="px-4 py-2 border">DFS 后序</td><td class="px-4 py-2 border">O(V+E)</td><td class="px-4 py-2 border">O(V)</td><td class="px-4 py-2 border">三色标记 + 后序逆序</td></tr>
              <tr><td class="px-4 py-2 border">课程表（判环）</td><td class="px-4 py-2 border">O(V+E)</td><td class="px-4 py-2 border">O(V+E)</td><td class="px-4 py-2 border">Kahn 的变体</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：边方向建反。</strong><br/>
          把「A 依赖 B」建成 <code>A → B</code> 还是 <code>B → A</code> 必须统一。方向建反，拓扑序完全错误（Webpack 循环依赖报错通常就是方向理解的坑）。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：Kahn 的队列用 <code>shift()</code> 造成 O(V²)。</strong><br/>
          同 BFS：数组头部队列在大图上退化。工程实现用链表队列或双端队列；「按字典序输出」的需求只要把队列换成<strong>优先队列/最小堆</strong>即可。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆口诀：</strong>「<strong>入度为零就出队，后继减一归零再入队；排不完就是有环</strong>」。DFS 法记住「后序逆序」四个字。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">🎬</span>
          动画演示：Kahn 排序 与 DFS 后序
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          「Kahn 排序」：入度为 0 的节点变🟠 → 出队变🟢，其后继入度 −1（节点右侧 <code>in:</code> 徽标实时更新），归 0 即入队。
          「DFS 后序」：递归进入变🟠、后序记录变🟣，最后整体逆序高亮为最终拓扑序🟢。
          注意本图是 DAG，两种算法都会得到合法拓扑序。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 节点数: {{ gNodes.length }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full text-slate-500">📤 输出: [{{ order.join(' → ') }}]</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doKahn" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">⚙️ Kahn 排序</button>
          <button @mousedown="doDfsTopo" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:shadow-sm">🔍 DFS 后序</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:shadow-sm">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-text :config="{x:30, y:8, text:'DAG（AOV 网，箭头 = 依赖方向）', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-arrow v-for="e in gEdges" :key="e.from+'-'+e.to" :config="arrowCfg(e)" />
              <v-circle v-for="n in gNodes" :key="n.id" :config="circleCfg(n)" />
              <v-text v-for="n in gNodes" :key="'t'+n.id" :config="labelCfg(n)" />
              <v-text v-for="n in gNodes" :key="'i'+n.id" :config="indegCfg(n)" />
              <v-text :config="{x:20, y:406, text:'队列 queue（入度为 0 待输出）', fontSize:11, fontFamily:'monospace', fill:C.muted, fontStyle:'bold'}" />
              <v-rect v-for="(s,i) in queue" :key="'q'+i" :config="queueRect(s,i)" />
              <v-text v-for="(s,i) in queue" :key="'qt'+i" :config="queueText(s,i)" />
            </v-layer>
          </v-stage>
        </div>
        <p class="text-xs text-slate-400 mt-2">🟠 当前处理 &nbsp; 🟢 已输出 &nbsp; 🔵 入队待输出 &nbsp; 🟣 后序记录 &nbsp; 右侧 <code>in:n</code> = 当前入度</p>
      </section>

      <!-- 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center font-bold">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>拓扑排序</strong>只存在于 DAG；有环则无解，判环 = 排不完</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Kahn</strong>：入度表 + 队列，入度归 0 即入队；输出数 &lt; 节点数 = 有环</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>DFS 后序</strong>：三色标记判环，后序序列 reverse() 即拓扑序</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>复杂度均为 <strong>O(V+E)</strong>；工程上慎用 <code>shift()</code>，需要字典序时队列换成最小堆</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>工程类比：npm/webpack 依赖解析、CI 任务编排、课程表（LeetCode 207/210）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-2-traversal/dsa-6-2-3-bipartite" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：二分图判定与最大匹配(匈牙利算法)</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-3-shortest-path/dsa-6-3-1-dijkstra" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Dijkstra：贪心+优先队列O(ElogV) →</RouterLink>
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
  { id: "sec-1", name: "拓扑排序定义与 AOV 网" },
  { id: "sec-2", name: "Kahn 算法" },
  { id: "sec-3", name: "DFS 后序法" },
  { id: "sec-4", name: "判环与拓扑序应用" },
  { id: "sec-5", name: "复杂度与常见错误" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ================= 代码示例 =================
const kahnCode = `// ===== Kahn 算法：入度表 + 队列 =====
function topoKahn(g: Record<string, string[]>): string[] {
  // 1. 统计入度
  const indeg: Record<string, number> = {}
  for (const u of Object.keys(g)) indeg[u] = 0
  for (const u of Object.keys(g)) {
    for (const v of g[u] ?? []) indeg[v] = (indeg[v] ?? 0) + 1
  }

  // 2. 入度为 0 的节点入队
  const queue: string[] = Object.keys(indeg).filter(u => indeg[u] === 0)
  const order: string[] = []

  // 3. 反复弹出 + 后继入度 -1
  while (queue.length) {
    const u = queue.shift()!
    order.push(u)
    for (const v of g[u] ?? []) {
      indeg[v]--
      if (indeg[v] === 0) queue.push(v)
    }
  }

  // 4. 判环：输出数不足 = 有环
  return order.length === Object.keys(g).length ? order : []
}
// topoKahn({ A:['B','C'], B:['D'], C:['D','F'], D:['E'], F:['E'], E:[] })
// => ['A','B','C','D','F','E']（不唯一，符合依赖即可）`

const dfsTopoCode = `// ===== DFS 后序法：后序逆序 = 拓扑序 =====
function topoDfs(g: Record<string, string[]>): string[] {
  const color: Record<string, number> = {}   // 0/undefined=白 1=灰 2=黑
  const order: string[] = []

  function dfs(u: string): void {
    color[u] = 1                              // 进入：灰
    for (const v of g[u] ?? []) {
      if (color[v] === 1) throw new Error('有环，无拓扑序！')  // 遇灰 = 环
      if (color[v] === undefined) dfs(v)
    }
    color[u] = 2
    order.push(u)                             // 后序记录（所有后继已完成）
  }

  for (const u of Object.keys(g)) {
    if (color[u] === undefined) dfs(u)
  }
  return order.reverse()                      // 后序逆序 = 拓扑序
}
// 对 AOV 网：被依赖者（后继）先记录 → 逆序后依赖者在前`

const courseCode = `// ===== 应用：课程表判环（LeetCode 207/210） =====
// prerequisites[i] = [a, b] 表示「先修 b 才能修 a」
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const g: number[][] = Array.from({ length: numCourses }, () => [])
  const indeg = new Array(numCourses).fill(0)
  for (const [a, b] of prerequisites) {
    g[b].push(a)               // 边 b -> a
    indeg[a]++
  }

  const queue: number[] = []
  for (let i = 0; i < numCourses; i++) {
    if (indeg[i] === 0) queue.push(i)
  }

  let done = 0
  while (queue.length) {
    const u = queue.shift()!
    done++
    for (const v of g[u]) {
      if (--indeg[v] === 0) queue.push(v)
    }
  }
  return done === numCourses   // 完成的课程数不足 => 先修关系成环
}
// 工程映射：npm 依赖解析、webpack 模块构建顺序、CI 任务编排`

// ================= 🎬 图动画 =================
const C = { cyan:'#06b6d4', green:'#4ade80', red:'#ef4444', orange:'#f59e0b', blue:'#60a5fa', violet:'#a78bfa', muted:'#64748b', ghost:'#e2e8f0', text:'#1e293b' }
const H = ref(470), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms:number) => new Promise(r => setTimeout(r, ms))

interface GNode { id: string; label: string; x: number; y: number; color: string; dist?: number | null; indeg?: number }
interface GEdge { from: string; to: string; w: number; color: string }
const gNodes = reactive<GNode[]>([])
const gEdges = reactive<GEdge[]>([])
const queue = reactive<string[]>([])
const order = reactive<string[]>([])

const adj: Record<string, string[]> = { A: ['B','C'], B: ['D'], C: ['D','F'], D: ['E'], F: ['E'], E: [] }
const indegInit: Record<string, number> = { A: 0, B: 1, C: 1, D: 2, E: 2, F: 1 }

function initGraph() {
  gNodes.splice(0); gEdges.splice(0)
  ;[
    {id:'A',label:'A',x:150,y:90,color:C.cyan,indeg:0},
    {id:'B',label:'B',x:70,y:230,color:C.cyan,indeg:1},
    {id:'C',label:'C',x:290,y:230,color:C.cyan,indeg:1},
    {id:'D',label:'D',x:100,y:370,color:C.cyan,indeg:2},
    {id:'E',label:'E',x:220,y:370,color:C.cyan,indeg:2},
    {id:'F',label:'F',x:340,y:370,color:C.cyan,indeg:1},
  ].forEach(n => gNodes.push({ ...n }))
  ;[
    {from:'A',to:'B',w:1,color:'#94a3b8'},
    {from:'A',to:'C',w:1,color:'#94a3b8'},
    {from:'B',to:'D',w:1,color:'#94a3b8'},
    {from:'C',to:'D',w:1,color:'#94a3b8'},
    {from:'C',to:'F',w:1,color:'#94a3b8'},
    {from:'D',to:'E',w:1,color:'#94a3b8'},
    {from:'F',to:'E',w:1,color:'#94a3b8'},
  ].forEach(e => gEdges.push({ ...e }))
}
function pos(id: string): GNode { return gNodes.find(n => n.id === id)! }
function arrowCfg(e: GEdge) {
  const a = pos(e.from), b = pos(e.to)
  const dx = b.x - a.x, dy = b.y - a.y
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len, uy = dy / len
  return { points: [a.x + ux*24, a.y + uy*24, b.x - ux*24, b.y - uy*24],
    fill: e.color, stroke: e.color, strokeWidth: e.color === '#94a3b8' ? 2 : 3, pointerLength: 10, pointerWidth: 8 }
}
function circleCfg(n: GNode) {
  const stroke = n.color===C.cyan ? '#0891b2' : n.color===C.orange ? '#d97706' : n.color===C.green ? '#16a34a' : n.color===C.blue ? '#2563eb' : n.color===C.violet ? '#7c3aed' : '#64748b'
  const sw = n.color===C.cyan ? 1.5 : 3
  return { x:n.x, y:n.y, radius:22, fill:n.color, stroke, strokeWidth:sw, shadowColor:'rgba(0,0,0,.12)', shadowBlur:5, shadowOffsetY:2 }
}
function labelCfg(n: GNode) {
  return { x:n.x-22, y:n.y-22, width:44, height:44, text:n.label, fontSize:15, fontFamily:'monospace', fontStyle:'bold', fill:'#fff', align:'center', verticalAlign:'middle' }
}
function indegCfg(n: GNode) {
  return { x:n.x + 30, y:n.y - 26, text:'in:' + (n.indeg ?? 0), fontSize:11, fontFamily:'monospace', fill:C.muted, align:'center' }
}
function queueRect(s: string, i: number) {
  const x = 20 + i * 42
  return { x, y: 420, width: 36, height: 30, fill: i === 0 ? C.orange : C.blue, cornerRadius: 6,
    stroke: i === 0 ? '#d97706' : '#2563eb', strokeWidth: 1.5, shadowColor:'rgba(0,0,0,.1)', shadowBlur:3 }
}
function queueText(s: string, i: number) {
  return { x: 20 + i * 42, y: 420, width: 36, height: 30, text: s, fontSize: 13, fontFamily:'monospace', fontStyle:'bold',
    fill: i === 0 ? '#7c2d12' : '#fff', align:'center', verticalAlign:'middle' }
}
function resetGraph() {
  gNodes.forEach(n => { n.color = C.cyan; n.indeg = indegInit[n.id] ?? 0 })
  gEdges.forEach(e => { e.color = '#94a3b8' })
  queue.splice(0); order.splice(0)
}
async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch(_) {}
  finally { await d(250); busy.value = false }
}

function doReset() { resetGraph(); status.value = ''; opLabel.value = '' }

// ---- Kahn 算法 ----
async function doKahn() {
  await act('Kahn 排序', 'Kahn（入度表+队列）', async () => {
    resetGraph()
    const indeg: Record<string, number> = { ...indegInit }
    queue.splice(0); order.splice(0)
    Object.keys(indeg).forEach(id => { if (indeg[id] === 0) queue.push(id) })
    status.value = '初始：入度为 0 的节点入队 → A'
    await d(450)
    while (queue.length) {
      const u = queue.shift()!
      const un = pos(u)
      un.color = C.orange
      status.value = '出队 ' + u + '（入度 0）→ 输出'
      await d(420)
      order.push(u)
      un.color = C.green
      await d(200)
      for (const v of adj[u]) {
        indeg[v]--
        pos(v).indeg = indeg[v]
        pos(v).color = C.blue
        const e = gEdges.find(e2 => e2.from === u && e2.to === v)
        if (e) e.color = C.orange
        status.value = u + ' → ' + v + '：入度 ' + (indeg[v] + 1) + ' → ' + indeg[v]
        await d(360)
        if (e) e.color = '#94a3b8'
        if (indeg[v] === 0) {
          queue.push(v)
          status.value = v + ' 入度归 0 → 入队'
          await d(320)
        }
      }
    }
    if (order.length === gNodes.length) {
      status.value = '✅ 拓扑序: ' + order.join(' → ')
    } else {
      status.value = '⚠️ 图中存在环，剩余 ' + (gNodes.length - order.length) + ' 个节点无法入队'
    }
    opLabel.value = '序列 ' + order.join('')
  })
}

// ---- DFS 后序 ----
async function doDfsTopo() {
  await act('DFS 后序', 'DFS 后序（逆序=拓扑序）', async () => {
    resetGraph()
    const color3: Record<string, number> = {}
    const out: string[] = []
    async function dfs(u: string): Promise<void> {
      color3[u] = 1
      const un = pos(u)
      un.color = C.orange
      status.value = '进入 ' + u + '（递归）'
      await d(400)
      for (const v of adj[u]) {
        if (color3[v] === undefined) {
          const e = gEdges.find(e2 => e2.from === u && e2.to === v)
          if (e) e.color = C.orange
          await dfs(v)
          if (e) e.color = '#94a3b8'
        }
      }
      color3[u] = 2
      out.push(u)
      un.color = C.violet
      status.value = '后序记录 ' + u + '（出栈）'
      await d(320)
    }
    for (const start of ['A','B','C','D','E','F']) {
      if (color3[start] === undefined) await dfs(start)
    }
    const topo = [...out].reverse()          // 后序逆序 = 拓扑序
    for (let i = 0; i < topo.length; i++) {
      pos(topo[i]).color = C.green
      status.value = '拓扑序（后序逆序）: ' + topo.slice(0, i + 1).join(' → ')
      await d(300)
    }
    status.value = '✅ 拓扑序: ' + topo.join(' → ')
    opLabel.value = '序列 ' + topo.join('')
  })
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
</script>
