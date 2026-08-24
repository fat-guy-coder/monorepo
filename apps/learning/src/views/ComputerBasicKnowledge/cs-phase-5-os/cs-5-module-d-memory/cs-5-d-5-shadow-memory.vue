<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">影子内存（Shadow Memory）</h1><p class="text-sm text-slate-500 mt-1">检测工具的"平行宇宙"——给每一段应用内存配一份元数据</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">操作系统 5-d-5</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：应用内存 ↔ 影子内存 一一映射</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">程序只管读写自己的内存，但检测工具（TSan / ASan / Valgrind）想知道<strong>每块内存被谁碰过、怎么碰的</strong>。这些元数据没地方放？就在内存旁边再划一块"影子"，用一条<strong>映射公式</strong>把每个应用地址换算成影子地址，一一对应。</p>

        <!-- 结构图：应用内存块 → 映射 → 影子块 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 300" class="w-full h-auto">
            <defs><marker id="sm-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
            <!-- 应用内存 -->
            <text x="30" y="28" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">应用内存（每 8 字节一块）</text>
            <rect x="40" y="40" width="100" height="50" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="90" y="65" text-anchor="middle" font-size="13" font-weight="bold" fill="#0369a1" font-family="monospace">0x00</text>
            <text x="90" y="80" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">8 字节</text>
            <rect x="205" y="40" width="100" height="50" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="255" y="65" text-anchor="middle" font-size="13" font-weight="bold" fill="#0369a1" font-family="monospace">0x08</text>
            <text x="255" y="80" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">8 字节</text>
            <rect x="370" y="40" width="100" height="50" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="420" y="65" text-anchor="middle" font-size="13" font-weight="bold" fill="#0369a1" font-family="monospace">0x10</text>
            <text x="420" y="80" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">8 字节</text>
            <rect x="535" y="40" width="100" height="50" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="585" y="65" text-anchor="middle" font-size="13" font-weight="bold" fill="#0369a1" font-family="monospace">0x18</text>
            <text x="585" y="80" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">8 字节</text>
            <!-- 映射箭头 -->
            <line x1="90" y1="92" x2="90" y2="168" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#sm-a)"/>
            <line x1="255" y1="92" x2="255" y2="168" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#sm-a)"/>
            <line x1="420" y1="92" x2="420" y2="168" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#sm-a)"/>
            <line x1="585" y1="92" x2="585" y2="168" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#sm-a)"/>
            <!-- 影子内存 -->
            <text x="30" y="150" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">影子内存（每块一个 shadow word：谁·读/写·时钟）</text>
            <rect x="40" y="166" width="100" height="50" rx="8" fill="#06b6d4"/>
            <text x="90" y="188" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">G1 · 写</text>
            <text x="90" y="203" text-anchor="middle" font-size="9" fill="#e0f2fe" font-family="monospace">VC[1,0]</text>
            <rect x="205" y="166" width="100" height="50" rx="8" fill="#06b6d4"/>
            <text x="255" y="188" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">G2 · 读</text>
            <text x="255" y="203" text-anchor="middle" font-size="9" fill="#e0f2fe" font-family="monospace">VC[0,1]</text>
            <rect x="370" y="166" width="100" height="50" rx="8" fill="#cbd5e1"/>
            <text x="420" y="191" text-anchor="middle" font-size="12" fill="#475569" font-family="monospace">∅ 空</text>
            <rect x="535" y="166" width="100" height="50" rx="8" fill="#cbd5e1"/>
            <text x="585" y="191" text-anchor="middle" font-size="12" fill="#475569" font-family="monospace">∅ 空</text>
            <!-- 映射公式 -->
            <rect x="30" y="240" width="700" height="46" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
            <text x="50" y="262" font-size="12" fill="#0f172a" font-family="monospace">TSan / Valgrind（1:1 平移）：shadowAddr = appAddr + OFFSET</text>
            <text x="50" y="279" font-size="12" fill="#0f766e" font-family="monospace">ASan（1:8 压缩）：shadowAddr = (appAddr &gt;&gt; 3) + SHADOW_OFFSET</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">影子内存 = 应用内存的"平行投影"：地址映射过去，每个 shadow word 存"谁访问的、读还是写、当时的向量时钟"，用于竞态/越界判定</figcaption>
        </figure>

        <!-- 操作图：一次写 → 影子更新 → 冲突判定 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure class="bg-slate-50 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-slate-700 mb-3">操作示意 · 一次访问的完整链路</h3>
            <svg viewBox="0 0 340 160" class="w-full h-auto">
              <defs><marker id="sm-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
              <rect x="20" y="20" width="300" height="40" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
              <text x="170" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1" font-family="monospace">G1 写 0x00（时钟 VC[1,0]）</text>
              <line x1="170" y1="60" x2="170" y2="84" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#sm-b)"/>
              <rect x="20" y="86" width="300" height="40" rx="8" fill="#06b6d4"/>
              <text x="170" y="110" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">shadow(0x00) 记录：{G1, 写, VC[1,0]}</text>
              <line x1="170" y1="126" x2="170" y2="142" stroke="#4ade80" stroke-width="2" marker-end="url(#sm-b)"/>
              <text x="170" y="155" text-anchor="middle" font-size="10" fill="#15803d" font-family="monospace">✅ 无冲突，覆盖进 shadow</text>
            </svg>
          </figure>
          <figure class="bg-slate-50 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-slate-700 mb-3">操作示意 · 冲突触发竞态</h3>
            <svg viewBox="0 0 340 160" class="w-full h-auto">
              <defs><marker id="sm-c" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
              <rect x="20" y="20" width="300" height="40" rx="8" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
              <text x="170" y="45" text-anchor="middle" font-size="11" font-weight="bold" fill="#b91c1c" font-family="monospace">G2 写同一地址 0x00（VC[0,1]）</text>
              <line x1="170" y1="60" x2="170" y2="84" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#sm-c)"/>
              <rect x="20" y="86" width="300" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
              <text x="170" y="105" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e" font-family="monospace">对比旧记录：G1·写 ≠ G2</text>
              <text x="170" y="120" text-anchor="middle" font-size="10" fill="#a16207" font-family="monospace">线程不同 + 有写 + 时钟不可比</text>
              <line x1="170" y1="126" x2="170" y2="142" stroke="#ef4444" stroke-width="2" marker-end="url(#sm-c)"/>
              <text x="170" y="155" text-anchor="middle" font-size="10" font-weight="bold" fill="#b91c1c" font-family="monospace">⚠️ 报 DATA RACE！</text>
            </svg>
          </figure>
        </div>
      </section>

      <!-- 1. 为什么要影子内存 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>为什么要"影子"内存？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">普通内存只存<strong>数据</strong>。可检测工具想要的不是数据，而是关于数据的<strong>元数据</strong>：这块 8 字节被哪个 goroutine 写过？上一次读它是在什么因果状态下？这些信息<strong>没有天然的家</strong>——把它塞进应用自己的内存会污染数据，用 HashMap 查又太慢。</p>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">影子内存 = 给每块内存配一份"旁路账本"，用地址换算直接命中，O(1) 查账</p>
          <p class="text-xs text-amber-600 text-center">检测工具在编译期插桩：每次内存访问前面，先算 shadow 地址、读旧账、写新账——这就是"race detector 让程序慢 5~15 倍"的原因</p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>影子内存 ≈ Redux DevTools 的 <strong>action 时间线</strong>。state（应用内存）之外，工具额外维护一份"谁、在什么因果顺序下、改了什么"的平行记录——业务代码完全无感知，只有调试器在读它。检测工具就是"常开的调试器"。</p>
        </aside>
      </section>

      <!-- 2. 核心原理 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>核心原理：地址映射 + 账本内容</h2>
        <h3 class="text-base font-semibold text-slate-700 mb-2">步骤拆解</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>编译期插桩</strong>：每个读/写指令前插入一段检测代码（Go 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">-race</code>、C/C++ 的 TSan 都这么干）。</li>
          <li><strong>算影子地址</strong>：用映射公式把应用地址换算成影子地址（不用查表，纯位运算，O(1)）。</li>
          <li><strong>读旧账</strong>：看看这个 shadow word 里上次是谁访问的。</li>
          <li><strong>判定 + 记账</strong>：旧记录与新访问"冲突"就报错；否则把新访问写进 shadow（覆盖最旧的一条）。</li>
        </ol>
        <div class="mb-4"><Code language="go" :code="shadowCode" title="shadow-mapping.go" /></div>
        <div class="mb-4"><Code language="go" :code="shadowWordCode" title="shadow-word.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么是"时钟不可比"才算竞态：</strong>如果 G1 写完并通过通信把"因果"传给了 G2（G2 时钟覆盖了 G1），那么 G2 再写就<strong>不是</strong>并发——是 happens-before，合法。影子内存存下向量时钟，就是为了判断这一点。<Link :route="'cs-10-a-4-vector-clock'" :text="'向量时钟：因果排序与并发判定'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
        </aside>
      </section>

      <!-- 3. 三种实现对比 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>三大实现对比：TSan / ASan / Valgrind</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">TSan（Go -race）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">ASan</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Valgrind</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">影子比</td><td class="px-4 py-2 border font-mono text-xs">~1:1（每 8B 应用 → 8B 影子）</td><td class="px-4 py-2 border font-mono text-xs">1:8（1B 影子 → 8B 应用）</td><td class="px-4 py-2 border font-mono text-xs">~1:1（9bit/字节）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">抓什么</td><td class="px-4 py-2 border">数据竞态（并发读写同一内存）</td><td class="px-4 py-2 border">堆/栈越界、use-after-free、泄漏</td><td class="px-4 py-2 border">未初始化读、越界、非法 free、泄漏</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">实现方式</td><td class="px-4 py-2 border">编译期插桩 + 运行时检测</td><td class="px-4 py-2 border">编译期插桩 + 影子（含 redzone 毒字节）</td><td class="px-4 py-2 border">二进制翻译（不重编译，最通用）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">性能开销</td><td class="px-4 py-2 border font-mono text-xs">5~15x 慢，内存 ~2x</td><td class="px-4 py-2 border font-mono text-xs">1.5~2x 慢，内存 2~3x</td><td class="px-4 py-2 border font-mono text-xs">20~50x 慢，内存大</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">场景</td><td class="px-4 py-2 border">并发正确性（开发/CI）</td><td class="px-4 py-2 border">内存安全（开发/CI）</td><td class="px-4 py-2 border">无源码可重编时的兜底</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 实践建议：</strong>CI 里默认开 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">go test -race</code>（Go 官方甚至建议所有测试都带上）；C/C++ 项目用 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">-fsanitize=address</code>。它们只做开发期检测，绝不上生产。</p>
        </aside>
      </section>

      <!-- 4. 开销与取舍 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>开销与取舍</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>内存开销</strong>：影子占了和应用同等规模的空间（1:1），再加上 redzone/对齐填充，实际 ~2x。ASan 靠 1:8 压缩把内存开销降到 ~2-3x。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>时间开销</strong>：每次访问多出"算地址 + 读账 + 写账"，循环/热路径被放大——这就是 5~15x 的来源。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>假阴性边界</strong>：shadow 槽位有限（TSan 每块约 4 个），记录被"挤掉"后可能漏报——它保证"报了就是真的"，但不保证"一个不落"。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>只测不修</strong>：检测器只<strong>发现</strong>问题，定位到冲突双方和创建点（靠向量时钟回溯），修复还是要你上锁或改架构。</span></li>
        </ul>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>开了检测器的程序运行<strong>语义不变</strong>（元数据在影子，不碰应用数据），但<strong>时序被拖慢</strong>——原本"恰好没撞上"的弱竞态可能因此藏得更深。所以检测要<strong>尽早、频繁</strong>，别等上线前。</p>
        </aside>
      </section>

      <!-- 5. 与竞态检测的关系 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>与 Go 竞态检测的关系</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Go 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">go build -race</code> / <code class="bg-slate-100 px-1 rounded text-xs font-mono">go test -race</code> 底层就是 ThreadSanitizer（TSan）：<strong>影子内存存访问记录 + 向量时钟判因果</strong>。读到这里，那把"魔法开关"的内部终于透明了——</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600">编译器给每个读写插入检测调用，映射到 shadow。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600">同一 8 字节块被两个<strong>不同 goroutine</strong>访问、且<strong>至少一个是写</strong>、且向量时钟<strong>不可比</strong> → 报竞态，并用向量时钟回溯两个 goroutine 的创建点。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600">全部做完，生产构建去掉 <code class="bg-slate-100 px-1 rounded text-xs font-mono">-race</code> 恢复速度。</div></li>
        </ol>
        <p class="text-sm text-slate-500 leading-relaxed mb-4">跳转阅读：<Link :route="'go-2-10-race-detection'" :text="'Go 竞态检测：-race 原理与实战'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'cs-5-c-1-race'" :text="'并发与竞态（CS 基础）'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>这就像给 CI 加上 <code class="bg-purple-100 px-1 rounded text-xs font-mono">eslint + type-check</code>——它不改你的业务逻辑，只在旁边多维护一份"检查记录"，让并发错误和类型错误在合代码前就被拦下来。</p>
        </aside>
      </section>

      <!-- 🎬 动画演示 -->
      <section id="sec-viz" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">🎬</span>动画演示：影子内存如何抓竞态</h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          顶部是应用内存的 4 个 8 字节块，底部是它们各自的 shadow word。让 <strong>G1</strong> 和 <strong>G2</strong> 访问同一块内存：
          第二次访问会先对比旧记录——<strong>不同 goroutine + 有写 + 时钟不可比</strong>就红屏报 DATA RACE；读-读则不构成竞态。
        </p>
        <div class="flex flex-wrap items-center gap-2 mb-2 text-xs">
          <span class="bg-slate-100 px-2 py-1 rounded-full">🧵 G1 时钟 VC[1,0]</span>
          <span class="bg-slate-100 px-2 py-1 rounded-full">🧵 G2 时钟 VC[0,1]</span>
          <span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded-full font-mono">{{ status }}</span>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <button @mousedown="doAccess(1, 0, true)" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100 hover:border-cyan-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">G1 写 0x00</button>
          <button @mousedown="doAccess(2, 0, true)" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">G2 写 0x00 ⚡</button>
          <button @mousedown="doAccess(1, 1, false)" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">G1 读 0x08</button>
          <button @mousedown="doAccess(2, 1, false)" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">G2 读 0x08</button>
          <button @mousedown="doReset" :disabled="busy" class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 active:scale-95 active:shadow-inner bg-slate-50 text-slate-500 border-slate-300 hover:bg-slate-100 hover:border-slate-400 hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100">↺ Reset</button>
        </div>
        <div ref="box" class="w-full relative" :style="{height: H+'px'}">
          <v-stage :config="{width: W, height: H}">
            <v-layer>
              <v-text :config="appLabelCfg" />
              <template v-for="i in 4" :key="'b'+(i-1)">
                <v-rect :config="blockRectCfg(i-1)" />
                <v-text :config="blockLabelCfg(i-1)" />
              </template>
              <v-text :config="shadowLabelCfg" />
              <template v-for="i in 4" :key="'s'+(i-1)">
                <v-rect :config="shadowRectCfg(i-1)" />
                <v-text :config="shadowTextCfg(i-1)" />
              </template>
              <template v-for="i in 4" :key="'a'+(i-1)">
                <v-arrow v-if="blocks[i-1].flash" :config="arrowCfg(i-1)" />
              </template>
              <v-text v-if="raceBanner" :config="bannerCfg" />
            </v-layer>
          </v-stage>
        </div>
        <p class="text-xs text-slate-400 mt-2">先点「G1 写 0x00」建立第一条记录，再点「G2 写 0x00」触发竞态。对比「G1 读 0x08」+「G2 读 0x08」——读-读永远安全。</p>
      </section>

      <!-- 6. 小结 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>影子内存</strong> = 应用内存的平行账本，用位运算映射公式 O(1) 命中，存放访问元数据。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>影子内容：<strong>谁（线程/goroutine）+ 读/写 + 向量时钟</strong>——时钟用于判断两次访问是否因果可比。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>三大工具：TSan（竞态，~1:1，5-15x）、ASan（越界/泄漏，1:8，1.5-2x）、Valgrind（二进制翻译，最通用最慢）。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>Go 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">-race</code> = TSan = 影子内存 + 向量时钟，建议默认在 CI 开启。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>代价：~2x 内存、5-15x 慢、槽位有限有假阴性边界——检测器只在开发期开。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">相关阅读：<Link :route="'go-2-10-race-detection'" :text="'Go 竞态检测（TSan 实战）'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'cs-10-a-4-vector-clock'" :text="'向量时钟（判并发）'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-5-d-4-segmentation'" :text="'← 上一节：分段与段页式管理'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <span class="text-slate-300 cursor-default">已是本章最后一篇 →</span>
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "为什么要影子内存" },
  { id: "sec-2", name: "核心原理" },
  { id: "sec-3", name: "TSan / ASan / Valgrind" },
  { id: "sec-4", name: "开销与取舍" },
  { id: "sec-5", name: "与 Go 竞态检测" },
  { id: "sec-viz", name: "🎬 动画演示" },
  { id: "sec-6", name: "小结" },
]

// ===== 🎬 影子内存动画 =====
const d = (ms: number) => new Promise(r => setTimeout(r, ms))
const H = ref(300), W = ref(760)
const box = ref<HTMLDivElement>()
const busy = ref(false), status = ref('')
const raceBanner = ref(false)

const blocks = reactive([
  { addr: '0x00', flash: '' },
  { addr: '0x08', flash: '' },
  { addr: '0x10', flash: '' },
  { addr: '0x18', flash: '' },
])
const shadows = reactive([
  { text: '∅', race: false },
  { text: '∅', race: false },
  { text: '∅', race: false },
  { text: '∅', race: false },
])

const X0 = 40, GAP = 95, BW = 80, BH = 56, APP_Y = 44, SHAD_Y = 208
const cx = (i: number) => X0 + i * GAP + BW / 2

const appLabelCfg = { x: X0, y: APP_Y - 18, text: '应用内存（8 字节对齐块）', fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: '#475569' }
const shadowLabelCfg = { x: X0, y: SHAD_Y - 18, text: '影子内存（每个 8B 块一个 shadow word）', fontSize: 12, fontFamily: 'monospace', fontStyle: 'bold', fill: '#475569' }

function blockRectCfg(i: number) {
  const f = blocks[i].flash
  const fill = f === 'red' ? '#fee2e2' : f === 'green' ? '#bbf7d0' : '#e0f2fe'
  const stroke = f === 'red' ? '#ef4444' : f === 'green' ? '#22c55e' : '#0ea5e9'
  return { x: X0 + i * GAP, y: APP_Y, width: BW, height: BH, fill, cornerRadius: 8, stroke, strokeWidth: 1.5 }
}
function blockLabelCfg(i: number) {
  const f = blocks[i].flash
  const fill = f ? '#14532d' : '#0369a1'
  return { x: X0 + i * GAP, y: APP_Y, width: BW, height: BH - 14, text: blocks[i].addr, fontSize: 13, fontFamily: 'monospace', fontStyle: 'bold', fill, align: 'center', verticalAlign: 'middle' }
}
function shadowRectCfg(i: number) {
  return { x: X0 + i * GAP, y: SHAD_Y, width: BW, height: BH, fill: shadows[i].race ? '#fee2e2' : '#06b6d4', cornerRadius: 8, stroke: shadows[i].race ? '#ef4444' : '#0891b2', strokeWidth: shadows[i].race ? 2 : 1.5 }
}
function shadowTextCfg(i: number) {
  return { x: X0 + i * GAP, y: SHAD_Y, width: BW, height: BH, text: shadows[i].text, fontSize: 10, fontFamily: 'monospace', fontStyle: 'bold', fill: shadows[i].race ? '#b91c1c' : '#ffffff', align: 'center', verticalAlign: 'middle' }
}
function arrowCfg(i: number) {
  const color = blocks[i].flash === 'red' ? '#ef4444' : '#22c55e'
  return { points: [cx(i), APP_Y + BH, cx(i), SHAD_Y], stroke: color, strokeWidth: 2, pointerLength: 8, pointerWidth: 8 }
}
const bannerCfg = computed(() => ({ x: 0, y: H.value - 44, width: W.value, text: '⚠️ DATA RACE！', fontSize: 26, fontFamily: 'monospace', fontStyle: 'bold', fill: '#dc2626', align: 'center' }))

async function act(msg: string, fn: () => Promise<void>) {
  if (busy.value) return; busy.value = true; status.value = msg
  try { await fn() } catch (_) {}
  finally { await d(200); busy.value = false; status.value = '' }
}

function doAccess(who: number, blockIdx: number, isWrite: boolean) {
  const whoName = who === 1 ? 'G1' : 'G2'
  const opName = isWrite ? '写' : '读'
  const vc = who === 1 ? '[1,0]' : '[0,1]'
  act(`${whoName} ${opName} ${blocks[blockIdx].addr}`, async () => {
    blocks[blockIdx].flash = 'green'
    await d(320)
    const prev = shadows[blockIdx].text
    if (prev !== '∅') {
      const prevWho = prev.slice(0, 2)
      const prevIsWrite = prev.includes('写')
      if (prevWho !== whoName && (isWrite || prevIsWrite)) {
        // 冲突 → 竞态
        shadows[blockIdx].text = `${whoName} ${opName}`
        shadows[blockIdx].race = true
        blocks[blockIdx].flash = 'red'
        raceBanner.value = true
        status.value = `⚠️ DATA RACE：${prevWho}${prevIsWrite ? '写' : '读'} 与 ${whoName}${opName} 并发碰 ${blocks[blockIdx].addr}（时钟不可比）`
        await d(1100)
        blocks[blockIdx].flash = ''
        raceBanner.value = false
        return
      }
    }
    shadows[blockIdx].text = `${whoName} ${opName} VC${vc}`
    shadows[blockIdx].race = false
    status.value = `${prev === '∅' ? '首条访问' : '无冲突'}：${whoName} ${opName} ${blocks[blockIdx].addr}，写入 shadow 记录 VC${vc}`
    await d(500)
    blocks[blockIdx].flash = ''
  })
}

function doReset() {
  busy.value = false
  blocks.forEach(b => b.flash = '')
  shadows.forEach(s => { s.text = '∅'; s.race = false })
  raceBanner.value = false
  status.value = ''
}

let ro: ResizeObserver | null = null
onMounted(() => {
  if (box.value) {
    W.value = box.value.clientWidth
    ro = new ResizeObserver(e => { const w = e[0]?.contentRect.width; if (w && w > 100) W.value = w })
    ro.observe(box.value)
  }
})
onUnmounted(() => ro?.disconnect())

// ===== 代码示例 =====
const shadowCode = `// 影子地址映射：把应用地址换算成影子地址（概念示意）
// TSan / Valgrind 风格：每 8 字节应用内存 → 8 字节影子（1:1 平移）
const appBase    = uintptr(0x0000_0000)   // 应用地址空间起点
const shadowBase = uintptr(0x7f00_0000)   // 影子区基址（远离用户数据）

func shadowOf(addr uintptr) uintptr {
    // 先对齐到 8 字节边界，再平移
    return shadowBase + (addr - appBase) &^ 7
}

// ASan 风格：1 字节影子覆盖 8 字节应用（1:8 压缩，省内存）
func asanShadowOf(addr uintptr) uintptr {
    return (addr >> 3) + uintptr(0x7fff8000)  // 位运算，无查表，O(1)
}`;
const shadowWordCode = `// 一个 shadow word：记录一次访问 + 当时的向量时钟
type ShadowWord struct {
    TID     int      // 哪个 goroutine/线程
    IsWrite bool     // 读还是写
    VC      [2]int   // 该 goroutine 当时的向量时钟（判断因果可比性）
}

// 每次内存访问的检测逻辑（插桩代码的运行时实现）
func onAccess(addr uintptr, tid int, isWrite bool, vc [2]int) {
    s := shadowOf(addr)                 // 1. 算影子地址
    for _, old := range shadowSlots(s) { // 2. 读旧账
        // 3. 冲突四条件：同地址 + 不同 goroutine + 至少一个写 + 时钟不可比
        if old.TID != tid && (isWrite || old.IsWrite) && !comparable(old.VC, vc) {
            reportDataRace(old, tid, isWrite, vc)  // 4. 报竞态并回溯创建点
            return
        }
    }
    pushShadow(s, ShadowWord{tid, isWrite, vc})     // 5. 记账（挤掉最旧）
}`;
</script>
