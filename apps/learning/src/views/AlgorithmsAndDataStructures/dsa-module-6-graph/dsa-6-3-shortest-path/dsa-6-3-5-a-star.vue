<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🎯 A* 搜索与启发式函数</h1>
          <p class="text-sm text-slate-500 mt-1">带着「方向感」的最短路 —— f = g + h</p>
        </div>
        <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">模块 6-3-5</span>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">📐</span>
          结构总览：f = g + h 的「带方向」搜索
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          Dijkstra 按 <strong>g（已走代价）</strong>均匀向外扩展——像一个以起点为圆心的<strong>圆</strong>，完全没有方向感。
          A* 多算一个 <strong>h（到终点的估计代价）</strong>，按 <strong>f = g + h</strong> 优先扩展，
          扩展区域变成<strong>偏向终点的椭圆</strong>，节点数大幅减少。<strong>h = 0 时 A* 退化为 Dijkstra。</strong>
        </p>

        <!-- 结构图 -->
        <figure class="mb-6">
          <svg viewBox="0 0 720 260" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <!-- 顶部公式 -->
            <text x="215" y="34" text-anchor="middle" font-size="16" font-family="monospace" font-weight="bold" fill="#a78bfa">f(n)</text>
            <text x="295" y="34" text-anchor="middle" font-size="16" font-family="monospace" font-weight="bold" fill="#64748b">=</text>
            <text x="360" y="34" text-anchor="middle" font-size="16" font-family="monospace" font-weight="bold" fill="#06b6d4">g(n)</text>
            <text x="445" y="34" text-anchor="middle" font-size="16" font-family="monospace" font-weight="bold" fill="#64748b">+</text>
            <text x="510" y="34" text-anchor="middle" font-size="16" font-family="monospace" font-weight="bold" fill="#f59e0b">h(n)</text>
            <text x="360" y="56" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">g = 起点→n 实际代价 · h = n→终点估计 · h 可采纳(h≤真实) 才保证最优</text>
            <!-- 左：Dijkstra -->
            <text x="175" y="92" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">Dijkstra：按 g 圆环扩展</text>
            <circle cx="120" cy="180" r="22" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
            <text x="120" y="180" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">S</text>
            <circle cx="290" cy="120" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
            <text x="290" y="120" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#14532d">G</text>
            <circle cx="120" cy="180" r="50" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="120" cy="180" r="90" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="120" cy="180" r="130" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" />
            <circle cx="120" cy="130" r="3.5" fill="#94a3b8" />
            <circle cx="170" cy="180" r="3.5" fill="#94a3b8" />
            <circle cx="60" cy="160" r="3.5" fill="#94a3b8" />
            <circle cx="205" cy="135" r="3.5" fill="#94a3b8" />
            <circle cx="95" cy="95" r="3.5" fill="#94a3b8" />
            <circle cx="150" cy="245" r="3.5" fill="#94a3b8" />
            <circle cx="235" cy="210" r="3.5" fill="#94a3b8" />
            <circle cx="60" cy="235" r="3.5" fill="#94a3b8" />
            <text x="175" y="250" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">逐层圆环，无方向感</text>
            <!-- 右：A* -->
            <text x="535" y="92" text-anchor="middle" font-size="12" font-family="monospace" font-weight="bold" fill="#0f172a">A*：按 f 偏向终点扩展</text>
            <circle cx="440" cy="185" r="22" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
            <text x="440" y="185" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#ffffff">S</text>
            <circle cx="640" cy="110" r="18" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
            <text x="640" y="110" text-anchor="middle" dominant-baseline="central" font-family="monospace" font-weight="bold" fill="#14532d">G</text>
            <ellipse cx="540" cy="145" rx="115" ry="48" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="5 3" />
            <circle cx="475" cy="120" r="3.5" fill="#f59e0b" />
            <circle cx="510" cy="105" r="3.5" fill="#f59e0b" />
            <circle cx="555" cy="100" r="3.5" fill="#f59e0b" />
            <circle cx="600" cy="115" r="3.5" fill="#f59e0b" />
            <circle cx="620" cy="140" r="3.5" fill="#f59e0b" />
            <circle cx="510" cy="175" r="3.5" fill="#f59e0b" />
            <circle cx="565" cy="185" r="3.5" fill="#f59e0b" />
            <circle cx="605" cy="168" r="3.5" fill="#f59e0b" />
            <circle cx="450" cy="150" r="3.5" fill="#f59e0b" />
            <text x="535" y="250" text-anchor="middle" font-size="11" font-family="monospace" fill="#64748b">椭圆偏向终点，节点更少</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Dijkstra 是「无方向圆」，A* 是「有方向椭圆」——h 给搜索装上了指南针</figcaption>
        </figure>

        <!-- 操作示意图：选 f 最小 -->
        <h3 class="text-sm font-semibold text-slate-700 mb-2">关键操作：每次从 open 里选 f 最小的节点扩展（f = g + h）</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">扩展前：open 集合里 f 最小的是 (1,1)，f=4</p>
            <svg viewBox="0 0 320 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <g font-family="monospace">
                <!-- 网格 -->
                <rect x="46" y="34" width="220" height="132" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
                <line x1="90" y1="34" x2="90" y2="166" stroke="#cbd5e1" stroke-width="1" />
                <line x1="134" y1="34" x2="134" y2="166" stroke="#cbd5e1" stroke-width="1" />
                <line x1="178" y1="34" x2="178" y2="166" stroke="#cbd5e1" stroke-width="1" />
                <line x1="222" y1="34" x2="222" y2="166" stroke="#cbd5e1" stroke-width="1" />
                <line x1="46" y1="78" x2="266" y2="78" stroke="#cbd5e1" stroke-width="1" />
                <line x1="46" y1="122" x2="266" y2="122" stroke="#cbd5e1" stroke-width="1" />
                <!-- 起点 S (0,1) -->
                <rect x="46" y="78" width="44" height="44" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
                <text x="68" y="100" text-anchor="middle" dominant-baseline="central" font-size="15" font-weight="bold" fill="#fff">S</text>
                <!-- 终点 G (4,1) -->
                <rect x="222" y="78" width="44" height="44" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
                <text x="244" y="100" text-anchor="middle" dominant-baseline="central" font-size="15" font-weight="bold" fill="#14532d">G</text>
                <!-- open 节点 -->
                <rect x="90" y="34" width="44" height="44" fill="#bae6fd" stroke="#38bdf8" stroke-width="1.5" />
                <text x="112" y="52" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1">5</text>
                <text x="112" y="68" text-anchor="middle" font-size="9" fill="#64748b">2,3</text>
                <rect x="90" y="78" width="44" height="44" fill="#bae6fd" stroke="#f59e0b" stroke-width="3" />
                <text x="112" y="96" text-anchor="middle" font-size="12" font-weight="bold" fill="#c2410c">4</text>
                <text x="112" y="112" text-anchor="middle" font-size="9" fill="#64748b">2,2</text>
                <rect x="90" y="122" width="44" height="44" fill="#bae6fd" stroke="#38bdf8" stroke-width="1.5" />
                <text x="112" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1">5</text>
                <text x="112" y="156" text-anchor="middle" font-size="9" fill="#64748b">2,3</text>
                <rect x="134" y="78" width="44" height="44" fill="#bae6fd" stroke="#38bdf8" stroke-width="1.5" />
                <text x="156" y="96" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1">5</text>
                <text x="156" y="112" text-anchor="middle" font-size="9" fill="#64748b">3,2</text>
                <text x="160" y="186" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">选 f=4 的 (1,1) 扩展</text>
              </g>
            </svg>
          </figure>
          <figure>
            <p class="text-xs text-slate-500 font-semibold mb-1">扩展后：(1,1) 变 closed，邻格以新 f 值加入 open</p>
            <svg viewBox="0 0 320 200" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <g font-family="monospace">
                <rect x="46" y="34" width="220" height="132" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
                <line x1="90" y1="34" x2="90" y2="166" stroke="#cbd5e1" stroke-width="1" />
                <line x1="134" y1="34" x2="134" y2="166" stroke="#cbd5e1" stroke-width="1" />
                <line x1="178" y1="34" x2="178" y2="166" stroke="#cbd5e1" stroke-width="1" />
                <line x1="222" y1="34" x2="222" y2="166" stroke="#cbd5e1" stroke-width="1" />
                <line x1="46" y1="78" x2="266" y2="78" stroke="#cbd5e1" stroke-width="1" />
                <line x1="46" y1="122" x2="266" y2="122" stroke="#cbd5e1" stroke-width="1" />
                <rect x="46" y="78" width="44" height="44" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
                <text x="68" y="100" text-anchor="middle" dominant-baseline="central" font-size="15" font-weight="bold" fill="#fff">S</text>
                <rect x="222" y="78" width="44" height="44" fill="#4ade80" stroke="#16a34a" stroke-width="2" />
                <text x="244" y="100" text-anchor="middle" dominant-baseline="central" font-size="15" font-weight="bold" fill="#14532d">G</text>
                <!-- (1,1) 已扩展 closed -->
                <rect x="90" y="78" width="44" height="44" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5" />
                <text x="112" y="96" text-anchor="middle" font-size="12" font-weight="bold" fill="#94a3b8">4</text>
                <text x="112" y="112" text-anchor="middle" font-size="9" fill="#94a3b8">2,2</text>
                <!-- 剩余 open -->
                <rect x="90" y="34" width="44" height="44" fill="#bae6fd" stroke="#38bdf8" stroke-width="1.5" />
                <text x="112" y="52" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1">5</text>
                <text x="112" y="68" text-anchor="middle" font-size="9" fill="#64748b">2,3</text>
                <rect x="90" y="122" width="44" height="44" fill="#bae6fd" stroke="#38bdf8" stroke-width="1.5" />
                <text x="112" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1">5</text>
                <text x="112" y="156" text-anchor="middle" font-size="9" fill="#64748b">2,3</text>
                <!-- 新加入的邻格 -->
                <rect x="134" y="34" width="44" height="44" fill="#bae6fd" stroke="#38bdf8" stroke-width="1.5" />
                <text x="156" y="52" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1">5</text>
                <text x="156" y="68" text-anchor="middle" font-size="9" fill="#64748b">3,2</text>
                <rect x="134" y="78" width="44" height="44" fill="#bae6fd" stroke="#38bdf8" stroke-width="1.5" />
                <text x="156" y="96" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1">5</text>
                <text x="156" y="112" text-anchor="middle" font-size="9" fill="#64748b">3,2</text>
                <rect x="134" y="122" width="44" height="44" fill="#bae6fd" stroke="#38bdf8" stroke-width="1.5" />
                <text x="156" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1">6</text>
                <text x="156" y="156" text-anchor="middle" font-size="9" fill="#64748b">3,3</text>
                <text x="160" y="186" text-anchor="middle" font-size="11" font-family="monospace" font-weight="bold" fill="#0f172a">(1,1) 收进 closed，邻格 f=5/5/6</text>
              </g>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">open 里永远选 f 最小的扩展——这就是 A* 的全部「魔法」</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. Dijkstra 的盲目性 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">1</span>
          Dijkstra 的盲目性：没有方向感的搜索
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          Dijkstra 每次扩展 <strong>g（距起点的已走代价）最小的节点</strong>。它保证正确，但完全<strong>无视终点在哪</strong>——
          起点在左上、终点在右下，它照样先扩展一堆「远离终点」的节点。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>扩展区域是以起点为圆心的「同心圆」，所有方向一视同仁</li>
          <li>在大型网格（游戏地图、导航路网）上，终点方向的节点和反方向的节点被<strong>同等待遇</strong>地扩展</li>
          <li>结果：大量「注定不会走」的节点也被算了 g、进了优先队列</li>
          <li>Dijkstra 的正确性没问题，问题是<strong>效率浪费在无关方向</strong>上</li>
        </ol>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Dijkstra 像<strong>不看目的地的打车软件</strong>：只按「已行驶里程」挨个检查路口，东南西北全都查一遍。
          你会觉得它很笨——明明终点在正东，为什么还要先去西边转一圈？
          A* 就是给司机装了个指南针：优先朝「直线距离近」的方向找。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① 以为 Dijkstra「会绕远」——不会，它保证最短；只是<strong>扩展得多</strong>、慢<br/>
          ② 以为 A* 一定比 Dijkstra 快——<strong>h 选得差时两者扩展量几乎一样</strong>，h 的质量决定快慢<br/>
          ③ 无负权时把 A* 当 Dijkstra 用——A* 本身也不支持负权边，别拿它处理负权图
          </p>
        </aside>
      </section>

      <!-- 2. A* 的估价函数 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">2</span>
          A* 的估价函数：f(n) = g(n) + h(n)
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          A* 在 Dijkstra 的基础上给每个节点多算一个 <strong>启发式 h</strong>，用 <strong>f = g + h</strong> 作为扩展优先级：
        </p>
        <div class="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200">
          <p class="text-sm font-mono text-slate-700 leading-relaxed">
            g(n) = 起点到 n 的<strong>实际已走代价</strong>（已确定）<br/>
            h(n) = n 到终点的<strong>估计代价</strong>（启发式，可以猜）<br/>
            f(n) = g(n) + h(n) = 「经过 n 的这条路，总代价的下界估计」<br/>
            open 集合 = 待扩展节点；每次弹出 <strong>f 最小</strong>的节点扩展
          </p>
        </div>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>执行步骤：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>起点入 open：g=0，h=估到终点的距离，f=g+h</li>
          <li>从 open 中取出 <strong>f 最小</strong>的节点 cur，移入 closed（已扩展）</li>
          <li>若 cur 是终点 → 沿 parent 回溯路径，结束</li>
          <li>对 cur 的每个邻居：算出 ng=g(cur)+w；若 ng 比邻居当前 g 更小 → 更新 g、h、f，记录 parent，加入 open</li>
        </ol>

        <div class="mb-4"><Code language="ts" :code="aStarCode" title="a_star.ts" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><br/>
          g 是「确定性信息」，h 是「猜测信息」。A* 聪明在<strong>把两种信息加权成一个 f</strong>：
          完全没把握时 h=0，退化成 Dijkstra；把握十足时 h=真实距离，A* 直接沿着最优路径「一步到位」。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① 只用 <code>h</code> 排序（忘了加 g）——变成贪心搜索，可能绕进死胡同<br/>
          ② 只用 <code>g</code> 排序（忘了加 h）——那就是 Dijkstra，白加了启发式<br/>
          ③ 用 <code>f</code> 更新了 g 值——f 只用于<strong>排序</strong>，g 才是路径代价，两者别混
          </p>
        </aside>
      </section>

      <!-- 3. 启发式 h 的选择 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">3</span>
          启发式 h 的选择：曼哈顿 / 欧氏距离 / 可采纳性
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          h 的质量直接决定 A* 的效率。两个关键性质：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">性质</th><th class="px-4 py-2 border border-slate-200 font-semibold">定义</th><th class="px-4 py-2 border border-slate-200 font-semibold">后果</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border font-mono">可采纳 Admissible</td><td class="px-4 py-2 border">h(n) ≤ 真实最短距离</td><td class="px-4 py-2 border text-emerald-600">保证 A* 找到最优路径</td></tr>
              <tr><td class="px-4 py-2 border font-mono">一致性 Consistent</td><td class="px-4 py-2 border">h(u) ≤ w(u,v) + h(v)</td><td class="px-4 py-2 border">保证节点最多扩展一次（效率更高）</td></tr>
              <tr><td class="px-4 py-2 border font-mono">高估</td><td class="px-4 py-2 border">h(n) &gt; 真实距离</td><td class="px-4 py-2 border text-red-600">可能错过最优解</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>常用启发式（网格寻路）：</strong></p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">启发式</th><th class="px-4 py-2 border border-slate-200 font-semibold">公式</th><th class="px-4 py-2 border border-slate-200 font-semibold">适用</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">曼哈顿距离</td><td class="px-4 py-2 border font-mono">|dx| + |dy|</td><td class="px-4 py-2 border">只允许上下左右移动（4 方向）</td></tr>
              <tr><td class="px-4 py-2 border">欧氏距离</td><td class="px-4 py-2 border font-mono">√(dx² + dy²)</td><td class="px-4 py-2 border">允许任意方向移动</td></tr>
              <tr><td class="px-4 py-2 border">切比雪夫距离</td><td class="px-4 py-2 border font-mono">max(|dx|, |dy|)</td><td class="px-4 py-2 border">8 方向移动（含斜向）</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          h(n) 就像<strong>项目估时的「乐观下限」</strong>：你估「最快也要 3 天」，实际只会 ≥ 3 天——这就是可采纳。
          只要每个任务都用乐观下限排优先级，总工期一定是最优的；一旦有人「拍脑袋」往低估（乐观过头）或高估，
          排期就会出错。曼哈顿距离/欧氏距离就是网格寻路里那两个「乐观下限」。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① <strong>h 高估 = 丢掉最优性</strong>：比如允许 8 方向移动（可斜走）却用曼哈顿距离——斜走一步的代价可能低于「先横再竖」两步，曼哈顿就会高估真实距离，A* 可能错过最优路径<br/>
          ② 启发式与移动规则不匹配：4 方向用欧氏距离虽然<strong>可采纳</strong>（√(dx²+dy²) ≤ |dx|+|dy|），但太「乐观」，扩展量大；正确做法是<strong>4 方向用曼哈顿、8 方向用切比雪夫</strong><br/>
          ③ 障碍物不是问题：h 允许「穿过墙」来低估（那是合法的乐观估计），但别因此把 h 调成 0 去「求稳」——那就退回 Dijkstra 了
          </p>
        </aside>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong><br/>
          「<strong>h 越接近真实距离，A* 扩展越少；h=真实距离，A* 只走最优路径；h=0，退化成 Dijkstra；h 高估，答案可能错</strong>」。
          面试常考：曼哈顿距离在 4 方向网格上是可采纳的，因为任何路径的步数 ≥ |dx|+|dy|。
          </p>
        </aside>
      </section>

      <!-- 4. 与 Dijkstra 的关系 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">4</span>
          与 Dijkstra 的关系：h = 0 就是退化版
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          把 A* 的启发式设为常量 0，<code>f = g + 0 = g</code>——每一步都扩展 g 最小的节点，<strong>和 Dijkstra 完全一样</strong>。
          所以 Dijkstra 是 A* 的一个特例；A* 是「用启发式给 Dijkstra 装方向感」。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>h = 0</strong>：退化为 Dijkstra，扩展成圆，正确但最慢</li>
          <li><strong>h = 真实距离</strong>：A* 只扩展最优路径上的节点，最快且仍最优</li>
          <li><strong>0 &lt; h &lt; 真实</strong>：可采纳区间，扩展量介于两者之间，答案仍最优</li>
          <li><strong>h &gt; 真实</strong>：更快但可能非最优——除非你用 A* 的变体（如 Weighted A*）故意换速度</li>
        </ol>

        <div class="mb-4"><Code language="ts" :code="dijkstraCompareCode" title="dijkstra_compare.ts" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><br/>
          面试里被问「Dijkstra 和 A* 什么关系」——答「<strong>A* 是 Dijkstra + 启发式</strong>」拿基础分，
          再补一句「<strong>h=0 时 A* ≡ Dijkstra</strong>」拿加分。两个算法共用一个模板，区别只在 f 里多不多一个 h。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① 以为「A* 一定比 Dijkstra 快」——h 选 0 就一样慢，h 选得差也差不多<br/>
          ② 以为「A* 能处理负权边」——不能！A* 的启发式分析建立在非负边权上，负权图请用 SPFA/Bellman-Ford<br/>
          ③ 用 A* 求「所有点对最短路」——A* 是单源带目标点的搜索，全源请回到 Floyd
          </p>
        </aside>
      </section>

      <!-- 5. 网格寻路示例 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">5</span>
          网格寻路示例：曼哈顿距离 + 障碍物
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          游戏地图的自动寻路是 A* 最经典的应用：网格 = 图、格子 = 节点、上下左右 = 边（代价 1）。
          障碍物就是「不可达节点」。启发式用<strong>曼哈顿距离</strong>（4 方向移动下可采纳）。
        </p>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>实现要点：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>用 <code>"r,c"</code> 字符串作为格子 id，存进 gScore/fScore/cameFrom 三个 Map</li>
          <li>open 集合用优先队列（演示用数组 + sort 简化），每次取 f 最小</li>
          <li>h 用曼哈顿：<code>|r-goal.r| + |c-goal.c|</code>，永不越过障碍物（穿过墙只是低估，合法）</li>
          <li>找到终点后沿 cameFrom 回溯，得到完整路径</li>
        </ol>
        <div class="mb-4"><Code language="ts" :code="gridCode" title="grid_a_star.ts" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          这就是<strong>游戏里的寻路</strong>（《星际争霸》《文明》的格子寻路、Google Maps 的驾车导航都用 A* 家族算法）。
          前端也能见到：<strong>迷宫小游戏</strong>、<strong>流程图自动布线</strong>、<strong>画布上避开元素的连线</strong>——
          「从 A 点连到 B 点、不能穿过其他组件」就是标准的网格 A*。
          </p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong><br/>
          ① key 拼接用 <code>r + ',' + c</code> 却忘了分隔符——<code>1,11</code> 和 <code>11,1</code> 会撞 key<br/>
          ② 忘了检查越界/障碍——邻居生成时先判 <code>r,c</code> 是否在网格内、是否 <code>grid==1</code><br/>
          ③ 把 h 当 g 用：<code>tentative = h + 1</code> 而不是 <code>g + 1</code>——g 必须来自已走路径
          </p>
        </aside>
      </section>

      <!-- 6. 复杂度与适用场景 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">6</span>
          复杂度与适用场景
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">指标</th><th class="px-4 py-2 border border-slate-200 font-semibold">值</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">时间（最坏）</td><td class="px-4 py-2 border font-mono text-red-600">O(b^d)</td><td class="px-4 py-2 border">b = 分支因子，d = 解深度；h 差时接近全图</td></tr>
              <tr><td class="px-4 py-2 border">时间（实际）</td><td class="px-4 py-2 border font-mono text-emerald-600">远小于 Dijkstra</td><td class="px-4 py-2 border">h 越准，扩展节点越少</td></tr>
              <tr><td class="px-4 py-2 border">空间</td><td class="px-4 py-2 border font-mono">O(b^d)</td><td class="px-4 py-2 border">需要存 open/closed 和 parent</td></tr>
              <tr><td class="px-4 py-2 border">适用</td><td class="px-4 py-2 border">单源 → 单目标、有启发式信息</td><td class="px-4 py-2 border">寻路、导航、游戏 AI</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>选型速查：</strong></p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">问题</th><th class="px-4 py-2 border border-slate-200 font-semibold">推荐</th></tr></thead>
            <tbody class="text-slate-600 text-xs">
              <tr><td class="px-4 py-2 border">「一个起点 → 一个终点」且能估计距离</td><td class="px-4 py-2 border font-mono text-emerald-600">A*</td></tr>
              <tr><td class="px-4 py-2 border">「一个起点 → 所有点」</td><td class="px-4 py-2 border font-mono">Dijkstra</td></tr>
              <tr><td class="px-4 py-2 border">「所有点 → 所有点」</td><td class="px-4 py-2 border font-mono">Floyd</td></tr>
              <tr><td class="px-4 py-2 border">有负权边</td><td class="px-4 py-2 border font-mono">SPFA / Bellman-Ford</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong><br/>
          ① 寻路问题先问「能不能估计剩余距离」——能，就 A*；不能，Dijkstra 兜底<br/>
          ② h 的选择顺序：<strong>先用可采纳的简单启发式（曼哈顿/欧氏），不够快再升级</strong>（如预计算的 landmark 距离）<br/>
          ③ 一致性比可采纳更强：满足一致性时节点不会重复扩展，效率更稳
          </p>
        </aside>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><br/>
          本页动画用 8×5 网格演示 A* 与 Dijkstra 的扩展差异——注意 A* 的「椭圆」和 Dijkstra 的「圆」。
          想更直观的话，把动画里的「Dijkstra 对比」多跑几次，数一数两边扩展的格子数。
          </p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">🎬</span>
          动画演示：A* vs Dijkstra 网格寻路
        </h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          8×5 网格，起点 S 在左上、终点 G 在右下，灰色格子是障碍。
          <strong>「A* 搜索」</strong>用曼哈顿距离做启发式（每格显示 f，下方小字 g,h）；<strong>「Dijkstra 对比」</strong>用 h=0 跑同一张图。
          对比两者扩展的格子数：A* 偏向终点（浅蓝 open 更集中），Dijkstra 均匀铺开。找到路径后最优路径高亮为青色。
        </p>

        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">📏 网格: {{ GRID_COLS }}×{{ GRID_ROWS }}</span>
          <span class="bg-sky-100 text-sky-700 px-2 py-1 rounded-full">🟦 open: {{ countState('open') }}</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">⬜ closed: {{ countState('closed') }}</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
          <span v-if="opLabel" class="bg-amber-50 text-amber-700 px-2 py-1 rounded-full">⏱️ {{ opLabel }}</span>
        </div>

        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @click="doAStar" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">🎯 A* 搜索</button>
          <button @click="doDijkstra" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:border-amber-300">📏 Dijkstra 对比</button>
          <button @click="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100">↺ 重置</button>
        </div>

        <div ref="box" class="w-full relative" :style="{height: H + 'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-rect v-for="r in gridRects" :key="r.key" :config="r.cfg" />
              <v-text v-for="t in gridTexts" :key="t.key" :config="t.cfg" />
            </v-layer>
          </v-stage>
        </div>

        <div class="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-500">
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-orange-400 inline-block"></span>起点 S</span>
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-green-400 inline-block"></span>终点 G</span>
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-slate-300 inline-block"></span>障碍</span>
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-sky-200 inline-block"></span>open（待扩展）</span>
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-slate-200 inline-block"></span>closed（已扩展）</span>
          <span class="flex items-center gap-1"><span class="w-3 h-3 rounded-sm bg-cyan-500 inline-block"></span>最优路径</span>
        </div>
      </section>

      <!-- 📋 小结 -->
      <section id="sec-summary" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>f = g + h</strong>：g 是已走实际代价，h 是到终点的启发式估计，f 决定扩展顺序</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>可采纳性</strong>：h ≤ 真实距离才保证最优；h 越接近真实，扩展越少</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>曼哈顿/欧氏/切比雪夫</strong>：对应 4 方向、任意方向、8 方向移动</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>h=0 退化</strong>：A* ≡ Dijkstra；h=真实距离时只走最优路径</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>网格寻路</strong>：格子=节点，上下左右=边，障碍=不可达，parent 回溯出路径</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复杂度</strong>：最坏 O(b^d)；单源单目标 + 有启发式信息时才用 A*</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>不适用</strong>：负权边（用 SPFA/BF）、全源（用 Floyd）、无权图 BFS 更快</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-3-shortest-path/dsa-6-3-4-spfa" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：SPFA：队列优化的Bellman-Ford</RouterLink>
        <RouterLink to="/AlgorithmsAndDataStructures/dsa-module-6-graph/dsa-6-4-mst/dsa-6-4-1-prim" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Prim算法：基于顶点的贪心 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

// ================= 动画状态 =================
const C = { cyan: '#06b6d4', green: '#4ade80', red: '#ef4444', orange: '#f59e0b', blue: '#60a5fa', violet: '#a78bfa', muted: '#64748b', ghost: '#e2e8f0', text: '#1e293b' }
const H = ref(340), W = ref(700)
const busy = ref(false), status = ref(''), opLabel = ref('')
const box = ref<HTMLDivElement>()
const d = (ms: number) => new Promise(r => setTimeout(r, ms))

// 网格
const GRID_COLS = 8, GRID_ROWS = 5, CELL = 54, GX0 = 48, GY0 = 36
const TR = GRID_ROWS - 1, TC = GRID_COLS - 1
const KEY_S = '0,0', KEY_T = TR + ',' + TC
const WALLS = ['2,2', '2,3', '2,4', '3,4']
const DIRS4: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]]

const cellState = reactive<Record<string, string>>({})
const gMap = reactive<Record<string, number>>({})
const hMap = reactive<Record<string, number>>({})
const fMap = reactive<Record<string, number>>({})
const pathCells = reactive<string[]>([])

function manhattan(k: string): number {
  const [r, c] = k.split(',').map(Number)
  return Math.abs(r - TR) + Math.abs(c - TC)
}
function neighbors(k: string): string[] {
  const [r, c] = k.split(',').map(Number)
  const out: string[] = []
  for (const [dr, dc] of DIRS4) {
    const nr = r + dr, nc = c + dc
    if (nr < 0 || nr >= GRID_ROWS || nc < 0 || nc >= GRID_COLS) continue
    out.push(nr + ',' + nc)
  }
  return out
}
function countState(s: string): number {
  return Object.values(cellState).filter(v => v === s).length
}

function resetGrid() {
  Object.keys(cellState).forEach(k => delete cellState[k])
  Object.keys(gMap).forEach(k => delete gMap[k])
  Object.keys(hMap).forEach(k => delete hMap[k])
  Object.keys(fMap).forEach(k => delete fMap[k])
  pathCells.splice(0)
  for (const w of WALLS) cellState[w] = 'wall'
  cellState[KEY_S] = 'start'
  cellState[KEY_T] = 'goal'
  gMap[KEY_S] = 0
  hMap[KEY_S] = manhattan(KEY_S)
  fMap[KEY_S] = gMap[KEY_S] + hMap[KEY_S]
  status.value = '就绪：S = (0,0)，G = (' + TR + ',' + TC + ')，曼哈顿启发式'
}

function cellCfg(r: number, c: number) {
  const k = r + ',' + c
  const st = cellState[k] ?? 'blank'
  const fill = st === 'wall' ? '#cbd5e1' : st === 'start' ? '#f59e0b' : st === 'goal' ? '#4ade80' : st === 'open' ? '#bae6fd' : st === 'closed' ? '#e2e8f0' : st === 'path' ? '#06b6d4' : '#f8fafc'
  const stroke = st === 'path' || st === 'start' || st === 'goal' ? (st === 'start' ? '#d97706' : st === 'goal' ? '#16a34a' : '#0891b2') : '#cbd5e1'
  const sw = st === 'path' || st === 'start' || st === 'goal' ? 2.5 : 1
  return { x: GX0 + c * CELL, y: GY0 + r * CELL, width: CELL - 2, height: CELL - 2, fill, stroke, strokeWidth: sw, cornerRadius: 4 }
}

const gridRects = computed(() => {
  const arr: { key: string; cfg: Record<string, unknown> }[] = []
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      arr.push({ key: r + ',' + c, cfg: cellCfg(r, c) })
    }
  }
  return arr
})

const gridTexts = computed(() => {
  const arr: { key: string; cfg: Record<string, unknown> }[] = []
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      const k = r + ',' + c
      const st = cellState[k] ?? 'blank'
      const x = GX0 + c * CELL, y = GY0 + r * CELL
      if (st === 'start') {
        arr.push({ key: k + '-s', cfg: { x, y, width: CELL, height: CELL, text: 'S', fontSize: 16, fontFamily: 'monospace', fontStyle: 'bold', fill: '#fff', align: 'center', verticalAlign: 'middle' } })
      } else if (st === 'goal') {
        arr.push({ key: k + '-g', cfg: { x, y, width: CELL, height: CELL, text: 'G', fontSize: 16, fontFamily: 'monospace', fontStyle: 'bold', fill: '#14532d', align: 'center', verticalAlign: 'middle' } })
      } else if (st !== 'wall' && fMap[k] != null) {
        const dim = st === 'closed' ? '#94a3b8' : '#0284c7'
        arr.push({ key: k + '-f', cfg: { x, y: y + 8, width: CELL, height: 18, text: String(fMap[k]), fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill: dim, align: 'center', verticalAlign: 'middle' } })
        if (gMap[k] != null && hMap[k] != null) {
          arr.push({ key: k + '-gh', cfg: { x, y: y + 28, width: CELL, height: 14, text: gMap[k] + ',' + hMap[k], fontSize: 10, fontFamily: 'monospace', fill: dim, align: 'center', verticalAlign: 'middle' } })
        }
      }
    }
  }
  return arr
})

async function act(msg: string, label: string, fn: () => Promise<void>) {
  if (busy.value) return
  busy.value = true; status.value = msg; opLabel.value = label
  try { await fn() } catch (_) { /* ignore */ }
  finally { await d(250); busy.value = false; status.value = ''; opLabel.value = '' }
}

async function runSearch(withH: boolean) {
  const name = withH ? 'A*（f=g+h）' : 'Dijkstra（h=0）'
  await act(name + ' 搜索中…', name, async () => {
    resetGrid()
    const open: string[] = [KEY_S]
    const inOpen = new Set<string>([KEY_S])
    const came = new Map<string, string>()
    cellState[KEY_S] = 'open'
    let found = false
    let guard = 0
    while (open.length > 0 && !found && guard++ < 300) {
      open.sort((a, b) => (fMap[a] ?? 0) - (fMap[b] ?? 0))
      const cur = open.shift()!
      inOpen.delete(cur)
      cellState[cur] = 'closed'
      status.value = '扩展 ' + cur + '：f=' + fMap[cur] + ' g=' + gMap[cur] + ' h=' + hMap[cur]
      await d(130)
      if (cur === KEY_T) { found = true; break }
      for (const nb of neighbors(cur)) {
        if (cellState[nb] === 'wall') continue
        const ng = (gMap[cur] ?? 0) + 1
        if (ng < (gMap[nb] ?? Infinity)) {
          came.set(nb, cur)
          gMap[nb] = ng
          hMap[nb] = withH ? manhattan(nb) : 0
          fMap[nb] = ng + hMap[nb]
          if (!inOpen.has(nb) && cellState[nb] !== 'closed') {
            open.push(nb); inOpen.add(nb)
          }
          cellState[nb] = 'open'
        }
      }
    }
    if (found) {
      pathCells.splice(0)
      let k = KEY_T
      while (k) { pathCells.push(k); k = came.get(k) ?? '' }
      pathCells.reverse()
      for (const p of pathCells) cellState[p] = 'path'
      cellState[KEY_S] = 'start'
      cellState[KEY_T] = 'goal'
      status.value = '找到最短路径！长度 = ' + (pathCells.length - 1) + '，扩展节点 = ' + countState('closed') + ' 个'
      await d(1600)
    } else {
      status.value = '未找到路径'
      await d(1000)
    }
  })
}

function doAStar() { runSearch(true) }
function doDijkstra() { runSearch(false) }
function doReset() { resetGrid() }

let ro: ResizeObserver | null = null
onMounted(() => { resetGrid(); if (box.value) { W.value = box.value.clientWidth; ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w }); ro.observe(box.value) } })
onUnmounted(() => ro?.disconnect())

// ================= 目录 =================
const navList = [
  { id: 'sec-overview', name: '📐 结构总览' },
  { id: 'sec-1', name: 'Dijkstra 的盲目性' },
  { id: 'sec-2', name: '估价函数 f=g+h' },
  { id: 'sec-3', name: '启发式 h 的选择' },
  { id: 'sec-4', name: '与 Dijkstra 的关系' },
  { id: 'sec-5', name: '网格寻路示例' },
  { id: 'sec-6', name: '复杂度与适用场景' },
  { id: 'sec-viz', name: '🎬 动画演示' },
  { id: 'sec-summary', name: '📋 小结' },
]

// ================= 代码示例 =================
const aStarCode = `// ===== A* 通用框架（open/closed + f = g + h）=====
interface AStarNode<T> {
    data: T
    g: number        // 起点到当前节点的实际代价
    h: number        // 当前节点到终点的估计代价（启发式）
    parent: AStarNode<T> | null
}

function aStar<T>(
    start: T,
    goal: T,
    neighbors: (node: T) => T[],          // 相邻节点
    edgeCost: (a: T, b: T) => number,     // 实际边权
    heuristic: (node: T) => number,       // 到终点的估计 h
    isGoal: (node: T) => boolean
): T[] | null {
    const open: AStarNode<T>[] = []        // 待扩展（按 f 排序）
    const closed = new Set<T>()            // 已扩展
    const bestG = new Map<T, number>()     // 每个节点目前最优 g

    const snode: AStarNode<T> = { data: start, g: 0, h: heuristic(start), parent: null }
    open.push(snode)
    bestG.set(start, 0)

    while (open.length > 0) {
        // 取 f 最小的节点（完整实现用二叉堆/优先队列）
        open.sort((a, b) => (a.g + a.h) - (b.g + b.h))
        const cur = open.shift()!

        if (isGoal(cur.data)) {            // 找到终点 → 回溯路径
            const path: T[] = []
            let p: AStarNode<T> | null = cur
            while (p) { path.push(p.data); p = p.parent }
            return path.reverse()
        }

        closed.add(cur.data)

        for (const nb of neighbors(cur.data)) {
            if (closed.has(nb)) continue   // 已扩展，跳过
            const ng = cur.g + edgeCost(cur.data, nb)
            if (bestG.has(nb) && ng >= bestG.get(nb)!) continue  // 不更优，跳过
            bestG.set(nb, ng)
            open.push({ data: nb, g: ng, h: heuristic(nb), parent: cur })
        }
    }
    return null                            // open 耗尽 → 无路径
}

// 模板一句话：open 弹 f 最小 → 是终点就回溯 → 否则扩展邻居、更新 g/f`

const gridCode = `// ===== 网格 A*（曼哈顿距离，4 方向移动）=====
// grid[r][c]：0 = 空地，1 = 障碍
type Pt = { r: number; c: number }
const DIRS: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]]

function gridAStar(grid: number[][], start: Pt, goal: Pt): Pt[] | null {
    const rows = grid.length, cols = grid[0].length
    const h = (p: Pt) => Math.abs(p.r - goal.r) + Math.abs(p.c - goal.c)  // 曼哈顿
    const gScore = new Map<string, number>()
    const fScore = new Map<string, number>()
    const cameFrom = new Map<string, string>()
    const key = (p: Pt) => p.r + ',' + p.c   // 注意分隔符，避免 1,11 撞 11,1

    const open: Pt[] = [start]
    const inOpen = new Set<string>([key(start)])
    gScore.set(key(start), 0)
    fScore.set(key(start), h(start))

    while (open.length > 0) {
        // 每次取 f 最小（工程上用二叉堆）
        open.sort((a, b) => fScore.get(key(a))! - fScore.get(key(b))!)
        const cur = open.shift()!
        inOpen.delete(key(cur))

        if (cur.r === goal.r && cur.c === goal.c) {
            const path: Pt[] = []
            let k: string = key(cur)
            while (k) {
                const [r, c] = k.split(',').map(Number)
                path.push({ r, c })
                k = cameFrom.get(k) ?? ''
            }
            return path.reverse()
        }

        for (const [dr, dc] of DIRS) {
            const nr = cur.r + dr, nc = cur.c + dc
            if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue
            if (grid[nr][nc] === 1) continue              // 障碍
            const nb: Pt = { r: nr, c: nc }
            const tentative = gScore.get(key(cur))! + 1   // 每格代价 1
            if (tentative < (gScore.get(key(nb)) ?? Infinity)) {
                cameFrom.set(key(nb), key(cur))
                gScore.set(key(nb), tentative)
                fScore.set(key(nb), tentative + h(nb))    // f = g + h
                if (!inOpen.has(key(nb))) { open.push(nb); inOpen.add(nb) }
            }
        }
    }
    return null
}

// 为什么曼哈顿可采纳？
// 任何路径从 (r1,c1) 到 (r2,c2) 至少要走 |r1-r2| + |c1-c2| 步（每步横或竖一格）
// 所以 h = 曼哈顿距离 ≤ 真实步数 → 可采纳 → 保证最优`

const dijkstraCompareCode = `// ===== Dijkstra = A* 的 h(n) ≡ 0 的特例 =====
// 把上面 gridAStar 里的 h 换成常量 0，f = g，就是标准 Dijkstra：
const h0 = (p: { r: number; c: number }) => 0   // 不估计终点距离

// 对比效果（起点左上 → 终点右下，20×20 网格）：
//   Dijkstra: 按"圆环"均匀扩展，几乎扫遍整个网格
//   A* 曼哈顿: 扩展区域拉成"椭圆"，只扫约 1/3 的格子
//   A* 直线距离: 扩展更少（但要求允许任意方向移动才可采纳）

// ===== 选型总结 =====
// 单源单目标 + 可估计距离  → A*（曼哈顿/欧氏）
// 单源全部目标            → Dijkstra
// 全源全部目标            → Floyd
// 负权边                  → SPFA / Bellman-Ford
// 无权图                  → BFS（O(V+E)，比 A* 更简单）`
</script>

<style scoped></style>
