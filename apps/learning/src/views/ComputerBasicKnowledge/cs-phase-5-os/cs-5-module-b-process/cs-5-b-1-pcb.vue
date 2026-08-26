<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">进程控制块 PCB 与上下文切换</h1><p class="text-sm text-slate-500 mt-1">进程的"身份证 + 档案袋"——内核靠它管住每一个进程，换进程就是换一套寄存器现场</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">操作系统 5-b-1</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：PCB 管住进程，上下文切换换现场</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">程序只是一堆躺在磁盘上的文件，<strong>跑起来</strong>才是进程。内核怎么认得出每个进程？靠 <strong>PCB（Process Control Block）</strong>——每个进程一份，记录它的 ID、状态、寄存器现场、占用的内存和文件。CPU 在同一时刻只能跑一个进程，切换进程本质就是<strong>把当前寄存器现场存进 PCB，再把另一个 PCB 的现场搬进 CPU</strong>。</p>

        <!-- 结构图：进程映像 + PCB + CPU 寄存器 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 330" class="w-full h-auto">
            <defs><marker id="pcb-ar-1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
            <text x="30" y="22" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">进程映像（运行时实体）</text>
            <text x="430" y="22" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">PCB · 进程控制块（内核的"档案袋"）</text>
            <text x="600" y="22" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">CPU 寄存器</text>
            <!-- 进程映像 -->
            <rect x="30" y="40" width="160" height="40" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="110" y="65" text-anchor="middle" font-size="12" fill="#0369a1" font-family="monospace">代码段 只读指令</text>
            <rect x="30" y="92" width="160" height="40" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="110" y="117" text-anchor="middle" font-size="12" fill="#0369a1" font-family="monospace">数据段 全局变量</text>
            <rect x="30" y="144" width="160" height="40" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="110" y="169" text-anchor="middle" font-size="12" fill="#0369a1" font-family="monospace">堆 动态内存</text>
            <rect x="30" y="196" width="160" height="40" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="110" y="221" text-anchor="middle" font-size="12" fill="#0369a1" font-family="monospace">栈 局部变量/返回地址</text>
            <!-- PCB -->
            <rect x="230" y="40" width="310" height="220" rx="12" fill="#fff7ed" stroke="#f59e0b" stroke-width="2"/>
            <text x="385" y="62" text-anchor="middle" font-size="13" font-weight="bold" fill="#b45309" font-family="monospace">PCB：进程的"身份证 + 档案袋"</text>
            <rect x="244" y="76" width="140" height="32" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
            <text x="314" y="96" text-anchor="middle" font-size="11" fill="#92400e" font-family="monospace">PID · 进程 ID</text>
            <rect x="380" y="76" width="140" height="32" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
            <text x="450" y="96" text-anchor="middle" font-size="11" fill="#92400e" font-family="monospace">进程状态 就绪/运行/阻塞</text>
            <rect x="244" y="120" width="140" height="32" rx="6" fill="#cffafe" stroke="#06b6d4" stroke-width="1"/>
            <text x="314" y="140" text-anchor="middle" font-size="11" fill="#0e7490" font-family="monospace">寄存器上下文 PC/SP/通用</text>
            <rect x="380" y="120" width="140" height="32" rx="6" fill="#cffafe" stroke="#06b6d4" stroke-width="1"/>
            <text x="450" y="140" text-anchor="middle" font-size="11" fill="#0e7490" font-family="monospace">内存映射 页表/段表</text>
            <rect x="244" y="164" width="140" height="32" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1"/>
            <text x="314" y="184" text-anchor="middle" font-size="11" fill="#92400e" font-family="monospace">调度信息 优先级/时间片</text>
            <rect x="380" y="164" width="140" height="32" rx="6" fill="#cffafe" stroke="#06b6d4" stroke-width="1"/>
            <text x="450" y="184" text-anchor="middle" font-size="11" fill="#0e7490" font-family="monospace">打开的文件表</text>
            <rect x="244" y="208" width="140" height="32" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
            <text x="314" y="228" text-anchor="middle" font-size="11" fill="#475569" font-family="monospace">父子进程指针</text>
            <rect x="380" y="208" width="140" height="32" rx="6" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
            <text x="450" y="228" text-anchor="middle" font-size="11" fill="#475569" font-family="monospace">记账信息 CPU 用时</text>
            <!-- CPU 寄存器 -->
            <rect x="600" y="40" width="130" height="100" rx="8" fill="#1e293b" stroke="#0f172a" stroke-width="1.5"/>
            <text x="665" y="60" text-anchor="middle" font-size="11" font-weight="bold" fill="#f8fafc" font-family="monospace">CPU 寄存器组</text>
            <text x="665" y="78" text-anchor="middle" font-size="10" fill="#cbd5e1" font-family="monospace">PC 程序计数器</text>
            <text x="665" y="94" text-anchor="middle" font-size="10" fill="#cbd5e1" font-family="monospace">SP 栈指针</text>
            <text x="665" y="110" text-anchor="middle" font-size="10" fill="#cbd5e1" font-family="monospace">R0 ~ R31 / 标志位</text>
            <!-- 保存/恢复箭头 -->
            <line x1="600" y1="80" x2="522" y2="130" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#pcb-ar-1)"/>
            <text x="524" y="96" font-size="10" fill="#475569" font-family="monospace">保存/恢复</text>
            <!-- 登记箭头 -->
            <line x1="190" y1="150" x2="228" y2="120" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4 3" marker-end="url(#pcb-ar-1)"/>
            <text x="196" y="144" font-size="10" fill="#64748b" font-family="monospace">登记</text>
            <!-- 底部结论 -->
            <rect x="30" y="278" width="700" height="40" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
            <text x="50" y="302" font-size="12" fill="#0f172a" font-family="monospace">进程 = 程序（代码+数据）+ 栈/堆 + PCB。PCB 记录"这个进程现在是什么样、有哪些资源"</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">PCB 独立于进程的代码和数据存在：CPU 换进程前先把寄存器"拍进"PCB，换上来再从 PCB"捞出来"——PCB 就是进程的身份证 + 现场存档</figcaption>
        </figure>

        <!-- 状态转移 + 上下文切换 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure class="bg-slate-50 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-slate-700 mb-3">操作示意 · 进程五态转移</h3>
            <svg viewBox="0 0 360 330" class="w-full h-auto">
              <defs><marker id="pcb-st-1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
              <rect x="20" y="20" width="100" height="42" rx="8" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5"/>
              <text x="70" y="46" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">新建 New</text>
              <rect x="240" y="20" width="100" height="42" rx="8" fill="#06b6d4"/>
              <text x="290" y="46" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">就绪 Ready</text>
              <rect x="130" y="170" width="110" height="44" rx="8" fill="#f59e0b"/>
              <text x="185" y="196" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">运行 Running</text>
              <rect x="240" y="250" width="100" height="42" rx="8" fill="#fda4af" stroke="#f43f5e" stroke-width="1.5"/>
              <text x="290" y="276" text-anchor="middle" font-size="12" font-weight="bold" fill="#881337" font-family="monospace">阻塞 Blocked</text>
              <rect x="20" y="250" width="100" height="42" rx="8" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5"/>
              <text x="70" y="276" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">终止 Terminated</text>
              <line x1="120" y1="45" x2="238" y2="45" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#pcb-st-1)"/>
              <text x="180" y="38" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">接纳</text>
              <line x1="285" y1="62" x2="220" y2="168" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#pcb-st-1)"/>
              <text x="262" y="112" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">调度 dispatch</text>
              <line x1="185" y1="172" x2="285" y2="64" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#pcb-st-1)"/>
              <text x="228" y="112" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">时间片到/抢占</text>
              <line x1="185" y1="214" x2="288" y2="250" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#pcb-st-1)"/>
              <text x="220" y="238" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">等待 I/O/事件</text>
              <line x1="300" y1="250" x2="300" y2="64" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#pcb-st-1)"/>
              <text x="310" y="150" font-size="10" fill="#64748b" font-family="monospace">唤醒/事件完成</text>
              <line x1="130" y1="214" x2="70" y2="248" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#pcb-st-1)"/>
              <text x="80" y="240" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">运行完/异常</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">就绪 = 万事俱备只等 CPU；阻塞 = 在等 I/O/事件，即使有 CPU 也跑不了</figcaption>
          </figure>
          <figure class="bg-slate-50 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-slate-700 mb-3">操作示意 · 上下文切换三步走</h3>
            <svg viewBox="0 0 340 330" class="w-full h-auto">
              <defs><marker id="pcb-fw-1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
              <rect x="20" y="20" width="300" height="44" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
              <text x="170" y="47" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e" font-family="monospace">CPU 正在运行 P1（寄存器是 P1 的现场）</text>
              <line x1="170" y1="64" x2="170" y2="86" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#pcb-fw-1)"/>
              <rect x="20" y="88" width="300" height="44" rx="8" fill="#cffafe" stroke="#06b6d4" stroke-width="1.5"/>
              <text x="170" y="112" text-anchor="middle" font-size="11" fill="#0e7490" font-family="monospace">① 中断/阻塞 → 保存 P1 现场进 PCB1</text>
              <line x1="170" y1="132" x2="170" y2="154" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#pcb-fw-1)"/>
              <rect x="20" y="156" width="300" height="44" rx="8" fill="#cffafe" stroke="#06b6d4" stroke-width="1.5"/>
              <text x="170" y="180" text-anchor="middle" font-size="11" fill="#0e7490" font-family="monospace">② 从 PCB2 恢复 P2 现场到寄存器</text>
              <line x1="170" y1="200" x2="170" y2="222" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#pcb-fw-1)"/>
              <rect x="20" y="224" width="300" height="44" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
              <text x="170" y="247" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e" font-family="monospace">③ 从 P2 的 PC 接着执行（P2 运行中）</text>
              <text x="20" y="298" font-size="10" fill="#64748b" font-family="monospace">全程内核态，CPU 不执行任何用户代码；一次约 1~10 μs</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">切换代价主要在"保存恢复寄存器 + 缓存/TLB 失效"——所以一次要几微秒</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 进程 vs 程序 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>进程 vs 程序：先分清对象</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">程序（Program）是<strong>静态的</strong>：一堆躺在磁盘上的文件——指令 + 数据。进程（Process）是<strong>动态的</strong>：程序被加载进内存、分配了栈和堆、拿到了资源、正在被 CPU 执行的那个<strong>活体实例</strong>。同一个程序可以被启动成好几个进程（比如开三个浏览器窗口）；同一个进程也可以把代码替换掉继续跑（<code class="bg-slate-100 px-1 rounded text-xs font-mono">exec</code>）。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">程序 Program</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">进程 Process</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">本质</td><td class="px-4 py-2 border">静态文件：指令 + 数据</td><td class="px-4 py-2 border">运行中的实例，有状态</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">生命周期</td><td class="px-4 py-2 border">一直躺在磁盘上</td><td class="px-4 py-2 border">创建→运行→终止</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">有没有资源</td><td class="px-4 py-2 border">无（不占内存/CPU/文件）</td><td class="px-4 py-2 border">有：内存、CPU、文件、寄存器现场</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">谁能管理它</td><td class="px-4 py-2 border">文件系统</td><td class="px-4 py-2 border">内核（通过 PCB）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">一一对应？</td><td class="px-4 py-2 border">—</td><td class="px-4 py-2 border">❌ 一个程序可多进程，一个进程也可换代码</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>程序 ≈ <strong>组件源码文件</strong>（静态的 .tsx + 样式）；进程 ≈ <strong>这个组件被渲染出来的一个真实实例</strong>——有自己的 props/state、被挂载到了 DOM 上、占用着浏览器内存。同样的组件源码，页面里可以同时有 100 个实例，就像同一个程序能跑出 100 个进程。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>把"进程就是程序"挂在嘴边。它俩完全不同——进程是程序加上了<strong>运行上下文</strong>（资源 + 寄存器现场 + PCB）之后的活体。面试/考试常考这个对比，记不住就想：<code class="bg-amber-100 px-1 rounded text-xs font-mono">程序是菜谱，进程是照着菜谱正在炒的那锅菜</code>。</p>
        </aside>
      </section>

      <!-- 2. PCB 是什么 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>PCB 是什么：进程的"身份证 + 档案袋"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">PCB 是内核为<strong>每一个进程</strong>在<strong>内核空间</strong>维护的一个<strong>数据结构</strong>。它是内核"认得出"这个进程的唯一凭证：没有 PCB，进程的代码和数据在内存里只是一堆无法解释的字节；有了 PCB，内核就知道"这个进程叫 1234、现在在等 I/O、它占着这些页表、它打开着这些文件"。PCB 的三大作用——</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>区分进程</strong>：多个进程跑同一份程序，靠不同的 PCB（不同的 PID、不同的资源）把它们区开。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>保存现场</strong>：进程被换下 CPU 时，寄存器等现场存进 PCB；换回来时再恢复——没有它，进程就"失忆"了。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>调度依据</strong>：优先级、状态、已用时间都记在 PCB 里，调度器照它决定"下一个让谁上 CPU"。</div></li>
        </ol>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">进程被换下 → "把这一刻的我"存档进 PCB；换回来 → "把我"还原到寄存器</p>
          <p class="text-xs text-amber-600 text-center">PCB 由内核创建/销毁/读写，用户程序无感知——它是操作系统管进程的"幕后账本"</p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>PCB ≈ React 的 <strong>Fiber 节点</strong>。每个组件实例背后都有一个 Fiber 节点，记录它的 state、props、pending 更新、优先级（lane）、还有双缓冲树指针——就像 PCB 记录进程的状态、资源、调度优先级和父子进程指针。Fiber 是 React 调度器的"PCB"，PCB 是内核调度器的"Fiber"。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>以为 PCB 属于进程、存放在用户进程自己的地址空间。恰恰相反——PCB 属于<strong>内核</strong>，放在<strong>内核空间</strong>。原因很简单：PCB 是管进程的工具，若放用户空间，进程就能随便改自己的"档案"（把状态改成运行、给自己加优先级），内核就管不住它了。</p>
        </aside>
      </section>

      <!-- 3. PCB 的核心字段 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>PCB 的核心字段</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">不同操作系统 PCB 长得不一样，但核心字段大同小异，可以归成四类：<strong>身份 / 状态 / 现场与资源 / 管理与记账</strong>。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">分类</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">字段</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">作用</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold" rowspan="2">身份</td><td class="px-4 py-2 border font-mono text-xs">PID / PPID</td><td class="px-4 py-2 border">进程唯一 ID、父进程 ID</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">UID / GID</td><td class="px-4 py-2 border">归属的用户/组，权限判定用</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">状态</td><td class="px-4 py-2 border font-mono text-xs">进程状态</td><td class="px-4 py-2 border">就绪/运行/阻塞/终止……调度器据此排队列</td></tr>
              <tr><td class="px-4 py-2 border font-semibold" rowspan="4">现场与资源</td><td class="px-4 py-2 border font-mono text-xs">CPU 寄存器上下文</td><td class="px-4 py-2 border">PC/SP/通用寄存器/标志位——进程被换下时的"现场快照"</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">内存映射</td><td class="px-4 py-2 border">代码段/数据段/栈/堆的地址范围 + 页表指针</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">打开的文件表</td><td class="px-4 py-2 border">每个 fd 指向哪个文件、偏移量到哪</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">I/O 设备状态</td><td class="px-4 py-2 border">占用的终端/设备、等待的 I/O 请求</td></tr>
              <tr><td class="px-4 py-2 border font-semibold" rowspan="3">管理与记账</td><td class="px-4 py-2 border font-mono text-xs">调度信息</td><td class="px-4 py-2 border">优先级、剩余时间片、调度队列链接</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">父子进程指针</td><td class="px-4 py-2 border">指向父/子进程的 PCB，构成进程树</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">记账信息</td><td class="px-4 py-2 border">累计 CPU 用时、内存占用峰值、系统调用次数</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">先用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">os.Getpid()</code> 亲眼看看自己的"身份证"和状态（跑一次就知道 PCB 里 PID/状态这些字段从哪来）：</p>
        <div class="mb-4"><Code language="go" :code="getPidCode" title="pcb-getpid.go" /></div>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">再看 PCB 在内核里大致长什么样——用 Go struct 把字段"画"出来，并模拟一个就绪队列调度循环：</p>
        <div class="mb-4"><Code language="go" :code="pcbStructCode" title="pcb-struct.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 关键点：</strong>寄存器上下文（<code class="bg-blue-100 px-1 rounded text-xs font-mono">PC/SP/通用寄存器</code>）只在进程被换下 CPU 的<strong>瞬间</strong>才写入 PCB，平时它是"活的"，就住在 CPU 里。而 PID、状态、文件表这些是<strong>常驻</strong> PCB 的——谁都可以随时查。</p>
        </aside>
      </section>

      <!-- 4. 进程状态机 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>进程状态机：五态 + 转移条件</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">一个进程一生在 <strong>新建 / 就绪 / 运行 / 阻塞 / 终止</strong> 五态间流转（转移图见开头总览）。核心就两条腿：<strong>就绪 ⇌ 运行</strong> 靠调度，<strong>运行 → 阻塞 → 就绪</strong> 靠 I/O。逐个看转移条件——</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">转移</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">触发条件</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">一句话</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">新建 → 就绪</td><td class="px-4 py-2 border">资源已分配、进程表已建好</td><td class="px-4 py-2 border">被"接纳"进就绪队列</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">就绪 → 运行</td><td class="px-4 py-2 border">调度器选中它上 CPU（dispatch）</td><td class="px-4 py-2 border">终于轮到我了</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">运行 → 就绪</td><td class="px-4 py-2 border">时间片用完 / 更高优先级抢占</td><td class="px-4 py-2 border">CPU 被收走，但没在等别的东西</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">运行 → 阻塞</td><td class="px-4 py-2 border">请求 I/O、等锁、等信号、read 阻塞</td><td class="px-4 py-2 border">主动或被动挂起</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">阻塞 → 就绪</td><td class="px-4 py-2 border">I/O 完成 / 事件到达 / 锁释放</td><td class="px-4 py-2 border">被唤醒，回就绪队列排队</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">运行/就绪/阻塞 → 终止</td><td class="px-4 py-2 border">正常退出 / 异常 / 被 kill</td><td class="px-4 py-2 border">释放资源，PCB 销毁</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 记忆锚点：</strong>就绪 = "万事俱备，只欠 CPU"；阻塞 = "有了 CPU 我也跑不了，我在等 I/O/事件"。所以<strong>就绪一定是因为 CPU</strong>，<strong>阻塞一定是因为别的资源</strong>——这是最常考的一对区别。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>把"阻塞"理解成"没被调度"。两者完全不同：阻塞是进程<strong>自己</strong>在等外部事件（读文件、等网络），内核把它从就绪队列移到<strong>等待队列</strong>，事件完成才挪回来。判据就一条——"给它 CPU 它现在能跑吗？能 → 就绪；不能 → 阻塞"。</p>
        </aside>
      </section>

      <!-- 5. 上下文切换 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>上下文切换：换进程 = 换一套现场</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">CPU 只有一个，进程却有一堆。切到另一个进程跑，CPU 必须先<strong>记住</strong>当前进程停在哪，再把下一个进程<strong>当时停在哪</strong>读出来。这个"记忆 + 读取"的动作就是<strong>上下文切换（context switch）</strong>。注意：触发它的是<strong>时钟中断</strong>（时间片到）或<strong>阻塞系统调用</strong>（read 等）。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">切换流程</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>保存当前进程 P1 的现场</strong>：把 PC、SP、通用寄存器等全部写进 <code class="bg-slate-100 px-1 rounded text-xs font-mono">PCB1</code>。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>切换内核数据结构</strong>：把当前 PCB 指针切到 <code class="bg-slate-100 px-1 rounded text-xs font-mono">PCB2</code>，同时切换地址空间（换页表基址寄存器 / CR3）。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>恢复 P2 的现场</strong>：把 <code class="bg-slate-100 px-1 rounded text-xs font-mono">PCB2</code> 里存的寄存器值装回 CPU。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>从 P2 的 PC 继续执行</strong>：从此 CPU 开始跑 P2 的用户代码。</div></li>
        </ol>
        <h3 class="text-base font-semibold text-slate-700 mb-2">开销从哪来？</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>保存/恢复寄存器</strong>：几十到几百个寄存器要搬进搬出 PCB，这是纯开销。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>缓存失效（Cache miss）</strong>：换了进程，L1/L2 里的指令和数据大概率不是新进程的，全得从内存重新拉。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>TLB 抖动</strong>：地址空间换了，页表缓存（TLB）大量失效，虚拟地址→物理地址翻译要重新查。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>内核态进入</strong>：整个过程必须陷入内核（用户态 → 内核态 → 用户态），还有两次模式切换的损耗。</span></li>
        </ul>
        <h3 class="text-base font-semibold text-slate-700 mb-2">切换 vs 系统调用 vs 模式切换</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">概念</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">发生什么</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">换进程吗</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">代价</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">用户态 ⇌ 内核态</td><td class="px-4 py-2 border">CPU 特权级切换，不换进程</td><td class="px-4 py-2 border">❌</td><td class="px-4 py-2 border">小（~百 ns）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">系统调用</td><td class="px-4 py-2 border">用户程序请求内核服务（read/write），同进程内返回</td><td class="px-4 py-2 border">❌</td><td class="px-4 py-2 border">小（百 ns ~ μs）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">上下文切换</td><td class="px-4 py-2 border">换整个进程：保存 P1 现场 + 恢复 P2 现场</td><td class="px-4 py-2 border">✅ 必须</td><td class="px-4 py-2 border">大（1~10 μs，含缓存/TLB 失效）</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">内核把每个进程切换了多少次都记在账上——Linux 下能直接读出来：</p>
        <div class="mb-4"><Code language="bash" :code="procObserveCode" title="observe-pcb.sh" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>上下文切换 ≈ 浏览器里的 <strong>切 tab / 切页面路由</strong>。切走时要把当前页面的表单状态、滚动位置存起来，切回来再还原——代价就是不能保留全部 DOM 在内存里带来的缓存失效；而 React 的 <strong>Fiber 时间切片</strong>把渲染拆碎、能随时"切走再切回来"，靠的就是给每个 Fiber 节点保存了中断点。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 常见错误：</strong>把上下文切换的代价当成"免费"的。它很贵——一次 1~10 μs，还得附带缓存/TLB 全废。所以操作系统都<strong>尽量避免频繁切换</strong>（时间片不要太小），Go 的 goroutine 之所以快，恰恰因为<strong>不做进程级切换</strong>（见下一节）。评估"进程多 = 并发强"是误区：进程多 = 切换多 = 开销大。</p>
        </aside>
      </section>

      <!-- 6. 与 Go 底层实现的关系 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>与 Go 底层实现的关系：G ≈ goroutine 的"PCB"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">你在 Go 里写的每一个 <code class="bg-slate-100 px-1 rounded text-xs font-mono">go func()</code> 创建的 goroutine，在 Go 运行时（runtime）里都对应一个 <code class="bg-slate-100 px-1 rounded text-xs font-mono">G</code> 结构体。它干的事和 PCB 一模一样——<strong>记录这个 goroutine 的状态、现场、栈、调度信息</strong>。一句话：<strong>G 就是 goroutine 版的 PCB</strong>。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">G 结构体字段</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对应的 PCB 概念</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">goid</td><td class="px-4 py-2 border font-mono text-xs">PID</td><td class="px-4 py-2 border">goroutine 唯一 ID</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">g.status</td><td class="px-4 py-2 border font-mono text-xs">进程状态</td><td class="px-4 py-2 border">_Gidle / _Grunnable / _Grunning / _Gwaiting ……</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">g.sched (gobuf)</td><td class="px-4 py-2 border font-mono text-xs">CPU 寄存器上下文</td><td class="px-4 py-2 border">保存 PC/SP 等，切换时存取——就是"现场快照"</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">g.stack</td><td class="px-4 py-2 border font-mono text-xs">进程的栈</td><td class="px-4 py-2 border">每个 g 独立的栈（2KB 起步、可增长）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">g.m / g.lockedm</td><td class="px-4 py-2 border font-mono text-xs">调度信息 / 关系指针</td><td class="px-4 py-2 border">当前绑定的 M（执行线程）、锁绑定关系</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">g.atomic / g.paniconfault</td><td class="px-4 py-2 border font-mono text-xs">记账 / 状态标志</td><td class="px-4 py-2 border">状态原子修改、panic 现场记录</td></tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">核心区别：一个在用户态，一个在内核态</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>管理者不同</strong>：PCB 由<strong>内核</strong>创建和管理，放在内核空间；G 由 <strong>Go 运行时（一个用户态程序库）</strong>创建和管理，在用户空间。所以 G 的切换不需要陷入内核。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>切换代价不同</strong>：进程上下文切换要陷入内核 + 缓存/TLB 全废（1~10 μs）；goroutine 切换只是运行时的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">gopark/goready</code>，纯用户态搬几个寄存器（几十 ~ 几百 ns），快一到两个数量级。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>谁在"换现场"</strong>：进程切换保存/恢复的是 CPU 的 PC/SP/通用寄存器；goroutine 切换保存/恢复的是 <code class="bg-slate-100 px-1 rounded text-xs font-mono">g.sched</code>（gobuf）里的 PC/SP 等——同一个思路，只是老板不同。</span></li>
        </ul>
        <div class="mb-4"><Code language="go" :code="goroutineSwitchCode" title="g-switch.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 一句话带走：</strong>写 Go 并发时，goroutine 切换便宜所以可以开成千上万个；但要真去做"进程级"的事（多核绑核、隔离）才知道 OS 进程切换有多重。理解 PCB，就看懂了 goroutine 的 G——它们共享同一套"记录现场 + 换现场"的设计。</p>
        </aside>
        <p class="text-sm text-slate-500 leading-relaxed">跳转阅读：<Link :route="'go-2-1-goroutine-gmp'" :text="'Go GMP 调度模型（G/M/P 详解）'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>

      <!-- 7. 快速回顾 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">✅</span>快速回顾</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>程序 ≠ 进程</strong>：程序是静态文件（指令+数据），进程是运行中的实例（有资源、有状态），靠 <strong>PCB</strong> 被内核认识。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>PCB = 身份证 + 档案袋</strong>：在内核空间为每个进程维护，记录 PID、状态、寄存器上下文、内存映射、文件表、调度信息、父子指针、记账信息。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>五态转移</strong>：新建→就绪→运行→（阻塞→就绪/就绪）→终止。就绪只缺 CPU；阻塞在等别的资源。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>上下文切换</strong> = 保存 P1 现场进 PCB1 → 切地址空间 → 从 PCB2 恢复 P2 现场。代价来自寄存器搬运 + 缓存/TLB 失效（1~10 μs），且与系统调用/模式切换完全不同。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>映射到 Go</strong>：goroutine 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">G</code> 就是它的"PCB"（goid↔PID、g.status↔状态、g.sched↔寄存器上下文）。但 G 由用户态运行时管理，切换不陷内核，所以比进程切换快一两个数量级。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">相关阅读：<Link :route="'go-2-1-goroutine-gmp'" :text="'Go GMP 调度模型'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'cs-5-b-2-fork'" :text="'进程创建：fork/exec/wait'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'cs-5-b-4-scheduling'" :text="'CPU 调度'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-5-a-5-os-compare'" :text="'← 上一节：主流操作系统对比：Windows/Linux/macOS/Unix'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-5-b-2-fork'" :text="'下一节：进程创建：fork/exec/wait →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "进程 vs 程序" },
  { id: "sec-2", name: "PCB 是什么" },
  { id: "sec-3", name: "PCB 核心字段" },
  { id: "sec-4", name: "进程状态机" },
  { id: "sec-5", name: "上下文切换" },
  { id: "sec-6", name: "与 Go 底层实现的关系" },
  { id: "sec-7", name: "✅ 快速回顾" },
]

// ===== 代码示例 =====
const getPidCode = `// pcb-getpid.go：打印自己进程的"身份证"和状态（PCB 字段的现实来源）
package main

import (
	"fmt"
	"os"
)

func main() {
	fmt.Printf("我的 PID：%d\n", os.Getpid())            // 输出: 我的 PID：12345（每次运行不同）
	fmt.Printf("我的 PPID（父进程）：%d\n", os.Getppid())  // 输出: 我的 PPID（父进程）：6789（通常是你的 shell）

	// Linux 下从 /proc/self 读自己——这就是内核为"我"维护的那份 PCB 的对外快照
	stat, err := os.ReadFile("/proc/self/stat")
	if err == nil {
		fmt.Println("/proc/self/stat 内容：", string(stat))
		// 输出: 12345 (a.out) R 6789 12345 ...  ← 第 3 列 R 就是进程状态（Running）
	}

	// 更可读的状态 + 内存/文件字段
	status, _ := os.ReadFile("/proc/self/status")
	fmt.Println(string(status))
	// 输出片段:
	//   Name:   a.out
	//   State:  R (running)      ← 对应 PCB.State
	//   Pid:    12345            ← 对应 PCB.Pid
	//   PPid:   6789             ← 对应 PCB 的父进程指针
	//   VmRSS:  2804 kB          ← 对应 PCB 的内存映射（已占物理内存）
	//   FDSize: 256              ← 对应 PCB 的打开文件表容量
}`;
const pcbStructCode = `// pcb-struct.go：PCB 的数据结构 + 就绪队列调度循环（概念伪代码，示意内核逻辑）
package main

import "time"

type ProcessState int

const (
	New ProcessState = iota
	Ready
	Running
	Blocked
	Terminated
)

// PCB：进程控制块（内核为每个进程维护一份，放内核空间）
type PCB struct {
	Pid    int          // 进程 ID（身份）
	State  ProcessState // 进程状态（状态）
	Parent *PCB         // 父进程指针（进程树）
	// CPU 寄存器上下文：进程被换下 CPU 时保存现场
	Ctx struct {
		PC uint64 // 程序计数器：下一条指令地址
		SP uint64 // 栈指针
		// R0, R1, ... 通用寄存器、标志位
	}
	Memory    *MMap       // 内存映射：代码段/数据段/栈/堆 + 页表指针
	Files     []*FileDesc // 打开的文件表
	Priority  int         // 调度优先级
	TimeSlice int         // 剩余时间片（调度信息）
	CPUUsed   time.Duration // 记账：累计 CPU 用时
}

type MMap struct{ /* 省略 */ }
type FileDesc struct{ /* 省略 */ }

func saveContext(p *PCB)   { /* p.Ctx = 当前 CPU 寄存器 */ }
func restoreContext(p *PCB) { /* 寄存器 = p.Ctx */ }

// scheduler：极简调度循环——时间片用完就保存现场、从就绪队列换下一个
func scheduler(readyQueue []*PCB, running *PCB) []*PCB {
	if running != nil && running.TimeSlice > 0 {
		return readyQueue // 时间片没到，继续跑，不切换
	}
	// ① 时间片到/主动让出 → 保存现场，移回就绪队列
	if running != nil {
		saveContext(running)          // 寄存器 → running.Ctx
		running.State = Ready
		running.TimeSlice = 10        // 重新分配时间片
		readyQueue = append(readyQueue, running)
	}
	// ② 取出队首的下一个进程
	next := readyQueue[0]
	readyQueue = readyQueue[1:]
	// ③ 恢复现场，让它上 CPU 运行
	next.State = Running
	restoreContext(next)
	return readyQueue
}`;
const procObserveCode = `# observe-pcb.sh：从 /proc 偷看内核给进程维护的"档案袋"
# 1. 先看当前 shell 的 PID
echo "我的 shell PID: $$"

# 2. 查看它对应 PCB 的快照（status 文件就是 PCB 字段的可读版）
cat /proc/$$/status | head -18
# 输出关键字段（对照 PCB）：
#   Name:   bash
#   State:  S (sleeping)     ← 进程状态（阻塞：等终端输入）
#   Pid:    1234             ← PID
#   PPid:   100              ← 父进程指针
#   Uid:    0   0   0   0    ← 身份字段
#   VmSize: 14584 kB         ← 内存映射
#   VmRSS:  3300 kB
#   FDSize: 256              ← 打开文件表容量

# 3. 数一数打开的文件（文件表字段）
ls -l /proc/$$/fd | head
# 输出: 0 -> /dev/null, 1 -> /dev/pts/0（stdout）, 2 -> /dev/pts/0（stderr）

# 4. 看这个进程被切换过多少次（上下文切换记账字段）
grep -E "voluntary|nonvoluntary" /proc/$$/status
# 输出:
#   voluntary_ctxt_switches:    12   ← 主动让出（等 I/O）
#   nonvoluntary_ctxt_switches: 3    ← 被迫让出（时间片到/抢占）

# 5. 找一找僵尸进程（状态 Z = Terminated 但 PCB 还没回收）
ps aux | awk '$8=="Z" {print $2, $11, "已僵尸"}'
# 输出: 9999 <defunct> 已僵尸  ← 子进程退出但父进程没 wait，PCB 悬着`;
const goroutineSwitchCode = `// g-switch.go：goroutine 切换 ≈ 用户态"换现场"，不陷入内核
package main

import "runtime"

// 每个 goroutine 对应运行时里的 G 结构体（goroutine 的"PCB"）：
//   G.goid     ↔  PID
//   G.status   ↔  进程状态（_Grunnable/_Grunning/_Gwaiting ...）
//   G.sched    ↔  CPU 寄存器上下文（gobuf 存 PC/SP，切换时保存/恢复）
//   G.stack    ↔  进程的栈

func worker(n int) {
	for i := 0; i < n; i++ {
		// 一旦发生阻塞（channel 收发、锁、系统调用），Go 运行时会在这里：
		//   1) 把当前 g 的 PC/SP 存进 G.sched（保存现场，等价于进程切换第 1 步）
		//   2) 把另一个 g 的现场从 G.sched 装回寄存器（恢复现场）
		//   全程是运行时在用户态干的事，不需要 syscall 陷入内核
		runtime.Gosched() // 主动让出：当前 g 挂回队列，换下一个 g 跑
	}
}

// 对比：进程上下文切换要内核介入 + 缓存/TLB 全废 → 1~10 μs
//       goroutine 切换纯用户态搬寄存器     → 几十 ~ 几百 ns
//       差一两个数量级，所以 Go 敢开几十万 goroutine`;
</script>
