<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">操作系统是什么、做什么用</h1><p class="text-sm text-slate-500 mt-1">夹在硬件与应用程序之间的"万能中介"——本篇为整个操作系统阶段开篇打地基</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">操作系统 5-a-0</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：操作系统夹在硬件与应用程序之间</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">你写 Go 代码、点开浏览器、在终端敲 <code class="bg-slate-100 px-1 rounded text-xs font-mono">go run .</code>——这些动作最终都要落到 CPU / 内存 / 磁盘这些<strong>裸硬件</strong>上。操作系统就是夹在中间的那一层：<strong>向下驱动硬件，向上给应用提供抽象接口</strong>。没有它，每个程序都得自己去读写磁盘扇区、驱动网卡——那就没法写程序了。</p>

        <!-- 结构图：OS 在计算机中的分层位置 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 380" class="w-full h-auto">
            <defs><marker id="ai-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
            <!-- 应用层（用户态） -->
            <text x="40" y="30" font-size="13" font-weight="bold" fill="#b45309" font-family="monospace">用户态 · 应用层（你写的程序 + Shell）</text>
            <rect x="40" y="40" width="210" height="54" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="145" y="62" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e" font-family="monospace">Go 后端程序</text>
            <text x="145" y="80" text-anchor="middle" font-size="10" fill="#b45309" font-family="monospace">fmt.Println("hi")</text>
            <rect x="265" y="40" width="210" height="54" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="370" y="62" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e" font-family="monospace">浏览器 / VS Code</text>
            <text x="370" y="80" text-anchor="middle" font-size="10" fill="#b45309" font-family="monospace">打开文件 / 请求网络</text>
            <rect x="490" y="40" width="240" height="54" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="610" y="62" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e" font-family="monospace">Shell / 终端 (bash)</text>
            <text x="610" y="80" text-anchor="middle" font-size="10" fill="#b45309" font-family="monospace">ps / top / go run .</text>
            <!-- 应用 → 系统调用 箭头 -->
            <line x1="145" y1="96" x2="145" y2="116" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ai-a)"/>
            <line x1="370" y1="96" x2="370" y2="116" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ai-a)"/>
            <line x1="610" y1="96" x2="610" y2="116" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ai-a)"/>
            <!-- 系统调用接口 -->
            <rect x="40" y="118" width="690" height="42" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
            <text x="385" y="136" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">系统调用接口 (System Call)</text>
            <text x="385" y="151" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">open / read / write / fork / exec ...（应用进入内核的唯一合法入口）</text>
            <!-- 内核 -->
            <text x="40" y="185" font-size="13" font-weight="bold" fill="#0e7490" font-family="monospace">内核态 · 内核 (Kernel)</text>
            <line x1="385" y1="162" x2="385" y2="192" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ai-a)"/>
            <rect x="40" y="194" width="690" height="90" rx="10" fill="#06b6d4"/>
            <rect x="55" y="210" width="150" height="58" rx="8" fill="#0891b2"/>
            <text x="130" y="233" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">进程/线程</text>
            <text x="130" y="250" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">调度 · PCB</text>
            <rect x="225" y="210" width="150" height="58" rx="8" fill="#0891b2"/>
            <text x="300" y="233" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">内存管理</text>
            <text x="300" y="250" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">虚拟内存 · 分页</text>
            <rect x="395" y="210" width="150" height="58" rx="8" fill="#0891b2"/>
            <text x="470" y="233" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">文件系统</text>
            <text x="470" y="250" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">inode · 目录</text>
            <rect x="565" y="210" width="150" height="58" rx="8" fill="#0891b2"/>
            <text x="640" y="233" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">设备驱动</text>
            <text x="640" y="250" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">中断 · 驱动</text>
            <!-- 硬件 -->
            <line x1="385" y1="286" x2="385" y2="308" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ai-a)"/>
            <rect x="40" y="310" width="690" height="52" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
            <text x="60" y="342" font-size="12" font-weight="bold" fill="#334155" font-family="monospace">硬件</text>
            <text x="210" y="342" text-anchor="middle" font-size="11" fill="#475569" font-family="monospace">CPU</text>
            <text x="365" y="342" text-anchor="middle" font-size="11" fill="#475569" font-family="monospace">内存 (RAM)</text>
            <text x="520" y="342" text-anchor="middle" font-size="11" fill="#475569" font-family="monospace">磁盘 (SSD)</text>
            <text x="675" y="342" text-anchor="middle" font-size="11" fill="#475569" font-family="monospace">网卡 / 外设</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">红色虚线以上是用户态（普通程序），以下到硬件之间全归内核态。应用碰硬件必须走「系统调用接口」这个唯一的门</figcaption>
        </figure>

        <!-- 四大资源管理总览 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 260" class="w-full h-auto">
            <defs><marker id="ai-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
            <!-- 第 1 列：CPU -->
            <rect x="30" y="40" width="160" height="50" rx="8" fill="#f59e0b"/>
            <text x="110" y="62" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">CPU</text>
            <text x="110" y="79" text-anchor="middle" font-size="9" fill="#fffbeb" font-family="monospace">物理处理器</text>
            <line x1="110" y1="92" x2="110" y2="116" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ai-b)"/>
            <rect x="30" y="118" width="160" height="50" rx="8" fill="#06b6d4"/>
            <text x="110" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">进程 / 线程</text>
            <text x="110" y="157" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">可运行的任务</text>
            <line x1="110" y1="170" x2="110" y2="194" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ai-b)"/>
            <rect x="30" y="196" width="160" height="50" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
            <text x="110" y="226" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155" font-family="monospace">程序 / goroutine</text>
            <!-- 第 2 列：内存 -->
            <rect x="205" y="40" width="160" height="50" rx="8" fill="#f59e0b"/>
            <text x="285" y="62" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">物理内存</text>
            <text x="285" y="79" text-anchor="middle" font-size="9" fill="#fffbeb" font-family="monospace">RAM 颗粒</text>
            <line x1="285" y1="92" x2="285" y2="116" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ai-b)"/>
            <rect x="205" y="118" width="160" height="50" rx="8" fill="#06b6d4"/>
            <text x="285" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">虚拟地址空间</text>
            <text x="285" y="157" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">每个进程独享</text>
            <line x1="285" y1="170" x2="285" y2="194" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ai-b)"/>
            <rect x="205" y="196" width="160" height="50" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
            <text x="285" y="226" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155" font-family="monospace">进程</text>
            <!-- 第 3 列：磁盘 -->
            <rect x="380" y="40" width="160" height="50" rx="8" fill="#f59e0b"/>
            <text x="460" y="62" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">磁盘</text>
            <text x="460" y="79" text-anchor="middle" font-size="9" fill="#fffbeb" font-family="monospace">扇区 / 柱面</text>
            <line x1="460" y1="92" x2="460" y2="116" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ai-b)"/>
            <rect x="380" y="118" width="160" height="50" rx="8" fill="#06b6d4"/>
            <text x="460" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">文件 / 目录</text>
            <text x="460" y="157" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">树形命名空间</text>
            <line x1="460" y1="170" x2="460" y2="194" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ai-b)"/>
            <rect x="380" y="196" width="160" height="50" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
            <text x="460" y="226" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155" font-family="monospace">应用</text>
            <!-- 第 4 列：设备 -->
            <rect x="555" y="40" width="160" height="50" rx="8" fill="#f59e0b"/>
            <text x="635" y="62" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">网卡 / 键盘</text>
            <text x="635" y="79" text-anchor="middle" font-size="9" fill="#fffbeb" font-family="monospace">物理 I/O 设备</text>
            <line x1="635" y1="92" x2="635" y2="116" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ai-b)"/>
            <rect x="555" y="118" width="160" height="50" rx="8" fill="#06b6d4"/>
            <text x="635" y="140" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">fd / socket</text>
            <text x="635" y="157" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">文件描述符</text>
            <line x1="635" y1="170" x2="635" y2="194" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ai-b)"/>
            <rect x="555" y="196" width="160" height="50" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
            <text x="635" y="226" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155" font-family="monospace">应用</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">操作系统四大资源管理，本质都是同一种动作：把难用的物理硬件，抽象成好用的逻辑概念</figcaption>
        </figure>
      </section>

      <!-- 1. 操作系统是什么 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>操作系统是什么？</h2>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">操作系统 = 管理计算机硬件与软件资源、为应用提供抽象与服务的系统软件</p>
          <p class="text-xs text-amber-600 text-center">关键词拆解：管理资源（CPU/内存/磁盘/设备）· 提供抽象（进程/文件/socket）· 系统软件（区别于应用软件）</p>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">一句话记住：<strong>操作系统是"系统软件"而不是"应用软件"</strong>。系统软件负责让整个机器跑起来、让别的程序能运行；应用软件是"跑在系统之上、给用户干活"的那批程序。判断标准很简单——<strong>没了它别的程序还能不能跑？</strong>不能，那它就是系统软件。</p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类别</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">职责</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">典型例子</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold text-amber-700">系统软件</td><td class="px-4 py-2 border">管理硬件、支撑其他程序运行</td><td class="px-4 py-2 border">操作系统、编译器（gcc / go toolchain）、数据库引擎、Shell</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">应用软件</td><td class="px-4 py-2 border">直接给用户/业务提供服务</td><td class="px-4 py-2 border">浏览器、Excel、你的 Go 后端服务、游戏</td></tr>
            </tbody>
          </table>
        </div>

        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>Windows / Linux / macOS / Android / iOS</strong> —— 是操作系统（里面有内核 + 壳）。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>Chrome / VS Code / Go 编译出的服务</strong> —— 不是操作系统，是跑在 OS 之上的应用。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>Docker / 虚拟机</strong> —— 也不是操作系统，它们<strong>靠操作系统的能力</strong>（命名空间/容器技术）把进程隔离起来。</span></li>
        </ul>

        <p class="text-slate-600 mb-4 leading-relaxed">用一个小程序看看"我现在正跑在什么操作系统上"——<code class="bg-slate-100 px-1 rounded text-xs font-mono">runtime.GOOS</code> 是编译目标的操作系统，<code class="bg-slate-100 px-1 rounded text-xs font-mono">os.Hostname()</code> 从内核里读出本机主机名：</p>
        <div class="mb-4"><Code language="go" :code="osInfoCode" title="os-info.go" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>你打开 Chrome 开了 30 个标签页，每个标签是一个独立进程，浏览器替你把内存、切换前台、杀掉卡死的标签都管好了——这正是<strong>操作系统在做的事</strong>（进程管理 + 内存管理 + 调度）。而你在前端写 <code class="bg-purple-100 px-1 rounded text-xs font-mono">new Array(1000000)</code> 时根本不用操心物理内存在哪，是<strong>操作系统 + JS 引擎帮你把内存抽象掉了</strong>——就像后端写 Go 也不用管磁盘扇区一样。</p>
        </aside>
      </section>

      <!-- 2. 操作系统在计算机里的位置 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>操作系统在计算机里的位置</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">一台能跑程序的机器从上往下大致分五层。理解这个分层，就理解了操作系统"夹在中间"到底夹在哪：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">层</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">内容</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">谁能直接访问</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">① 应用 / Shell</td><td class="px-4 py-2 border">浏览器、Go 服务、bash 终端</td><td class="px-4 py-2 border">用户</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">② 系统库 / 运行时</td><td class="px-4 py-2 border">libc、Go runtime（GMP 调度器、内存分配器）</td><td class="px-4 py-2 border">应用代码</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">③ 系统调用接口</td><td class="px-4 py-2 border">open / read / write / fork / exec</td><td class="px-4 py-2 border">系统库（应用唯一合法入口）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">④ 内核</td><td class="px-4 py-2 border">进程调度、内存管理、文件系统、设备驱动</td><td class="px-4 py-2 border">仅内核自己</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">⑤ 硬件</td><td class="px-4 py-2 border">CPU、内存、磁盘、网卡、键盘</td><td class="px-4 py-2 border">仅内核（通过特权指令）</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">关键在 ③ 和 ④ 的边界：<strong>用户态程序永远不能直接读写硬件、不能直接改其他进程的内存</strong>——所有"碰硬件"的请求都必须打包成一个系统调用，交给内核去办。这就是"内核态 vs 用户态"划分的由来（<Link :route="'cs-5-a-1-kernel'" :text="'下一篇 5-a-1 详解'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />）。</p>

        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>把整台计算机想象成一家<strong>大酒店</strong>——硬件是房间、水电、电梯（CPU、内存、磁盘），<strong>操作系统是前台</strong>：客人（进程）来了要<strong>分配房间</strong>（内存）、做入住登记（PCB）、安排会议厅使用时间（CPU 调度）、协调客房服务（设备 I/O）；客人闹事就请安保（保护/隔离）。前台把"一栋楼"抽象成了"一间间好用的房间"，操作系统也把裸硬件抽象成了进程、文件、socket 这些好用的概念——<strong>客人（应用）永远不需要自己去通水管（驱动硬件）</strong>。</p>
        </aside>
      </section>

      <!-- 3. 操作系统做什么用 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>操作系统做什么用？（四大资源管理 + 抽象）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">操作系统的核心工作可以压缩成四个字：<strong>管理资源</strong>。它管四样东西，每一样都采用同一个手法——<strong>把物理资源抽象成逻辑概念，再安全地分给多个程序用</strong>：</p>

        <ol class="space-y-4 mb-4">
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>进程 / 线程管理 —— 把 CPU 抽象成"可运行的任务"。</strong>CPU 只有几十上百个核，但系统里可能躺着上千个进程。OS 给每个运行中的程序建一个 PCB（进程控制块），由调度器决定"谁用哪个核、跑多久"，再假装每个进程都独占了一整颗 CPU。<Link :route="'cs-5-b-1-pcb'" :text="'进程与 PCB'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>内存管理 —— 把物理内存抽象成"虚拟内存"。</strong>每个进程都拿到一块<strong>独立、连续、从 0 开始</strong>的地址空间，互不干扰；内核靠页表把虚拟地址翻译到真正的物理页。A 进程的野指针永远碰不到 B 进程的数据。<Link :route="'cs-5-d-2-virtual'" :text="'虚拟内存'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>文件系统 —— 把磁盘抽象成"文件 / 目录"。</strong>程序员不用知道数据在哪个扇区，只要 <code class="bg-slate-100 px-1 rounded text-xs font-mono">open("a.txt")</code>。OS 把磁盘的物理块组织成一棵从根 / 开始的目录树。<Link :route="'cs-5-e-1-inode'" :text="'inode 与文件系统'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>设备管理 —— 把网卡 / 键盘 / 显示器抽象成"文件描述符 / socket"。</strong>一个 socket、一个终端、一个管道，在应用眼里都是<strong>一个 int 编号</strong>，都能用 read / write 读写——设备细节全被驱动藏在内核里了。</div>
          </li>
        </ol>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">物理资源</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">操作系统抽象成</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">使用者</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">CPU</td><td class="px-4 py-2 border font-mono text-xs">进程 / 线程（"可运行的任务"）</td><td class="px-4 py-2 border">程序、goroutine</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">物理内存 (RAM)</td><td class="px-4 py-2 border font-mono text-xs">虚拟地址空间（每进程独享、连续）</td><td class="px-4 py-2 border">进程</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">磁盘 (SSD/HDD)</td><td class="px-4 py-2 border font-mono text-xs">文件 / 目录（树形命名空间）</td><td class="px-4 py-2 border">应用、用户</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">设备（网卡、键盘、显示器）</td><td class="px-4 py-2 border font-mono text-xs">文件描述符 / socket（统一 read/write）</td><td class="px-4 py-2 border">应用</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">用 Go 感受一下"OS 把 CPU 核数和内存管好了"这件事：</p>
        <div class="mb-4"><Code language="go" :code="resourceCode" title="os-resource.go" /></div>

        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>Go runtime 就是一个跑在 OS 之上的<strong>「用户态迷你操作系统」</strong>——<strong>GMP 调度器</strong>调度 goroutine ≈ OS 调度进程/线程；<strong>内存分配器</strong>（mcache / mcentral / mheap）≈ OS 内存管理；<strong>netpoller</strong> ≈ 设备管理里的网络事件驱动。你写 <code class="bg-teal-100 px-1 rounded text-xs font-mono">fmt.Println("hi")</code> 时，背后其实是 runtime 替你发了一个 <code class="bg-teal-100 px-1 rounded text-xs font-mono">write(1, "hi\n", 3)</code> <strong>系统调用</strong>，把字节交给内核去写屏幕。<Link :route="'go-2-1-goroutine-gmp'" :text="'Go GMP 调度模型'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-700! hover:text-cyan-800! bg-transparent! border-none! inline!" /></p>
        </aside>
      </section>

      <!-- 4. 三种视角 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>三种视角看操作系统</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">同一个操作系统，站在不同位置看到的面完全不同。学 OS 时先想清楚"我在用哪个视角看"，能少走很多弯路：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">视角</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">关心什么</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">典型代表</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold text-amber-700">用户视角</td><td class="px-4 py-2 border">好不好用、能不能点、卡不卡、界面漂不漂亮</td><td class="px-4 py-2 border">Windows 桌面、手机 UI、任务管理器</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">应用视角</td><td class="px-4 py-2 border">有哪些 API 可用、性能如何、接口稳不稳</td><td class="px-4 py-2 border">系统调用、libc、Go runtime、POSIX 接口</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-slate-700">系统视角</td><td class="px-4 py-2 border">资源怎么分配、谁能碰什么、效率与安全</td><td class="px-4 py-2 border">内核、调度器、权限模型、Docker 隔离</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>本阶段（CS 基础）走的是<strong>系统视角 + 应用视角</strong>——看内核怎么分配、也看 Go 程序怎么通过系统调用向内核要服务。图形界面那套，只是 OS 最外面一层"壳"（Shell），不是内核本体。</p>
        </aside>
      </section>

      <!-- 5. 发展史简表 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>发展史简表：从"没人管"到"人人隔离"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">操作系统的历史，就是<strong>让昂贵硬件利用率越来越高、让程序越来越安全隔离</strong>的历史。逐行看这张表，你会发现今天的每个概念都是被"问题"逼出来的：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">阶段</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">代表</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">关键突破</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">解决什么问题</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">无 OS</td><td class="px-4 py-2 border font-mono text-xs">1940s 真空管 / 纸带</td><td class="px-4 py-2 border">程序独占机器，人工插拔</td><td class="px-4 py-2 border">昂贵的机器大量闲置</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">单道批处理</td><td class="px-4 py-2 border font-mono text-xs">1950s IBM</td><td class="px-4 py-2 border">作业批量录入</td><td class="px-4 py-2 border">减少人工等待时间</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">多道程序</td><td class="px-4 py-2 border font-mono text-xs">1960s 早期</td><td class="px-4 py-2 border">内存装多个程序，I/O 等待时切换 CPU</td><td class="px-4 py-2 border">CPU 利用率低</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">分时</td><td class="px-4 py-2 border font-mono text-xs">1960-70s <strong>Unix</strong> / Multics</td><td class="px-4 py-2 border">时间片轮转，多人实时交互</td><td class="px-4 py-2 border">现代 OS 雏形，Unix 诞生</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">实时</td><td class="px-4 py-2 border font-mono text-xs">1960s-至今 RTOS (VxWorks)</td><td class="px-4 py-2 border">确定性响应（毫秒级）</td><td class="px-4 py-2 border">工业控制、航空安全</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">现代</td><td class="px-4 py-2 border font-mono text-xs">1980s-至今 Windows / Linux / macOS / 移动</td><td class="px-4 py-2 border">图形界面、网络、多核、移动触屏</td><td class="px-4 py-2 border">个人电脑 / 服务器 / 手机</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">虚拟化 / 容器</td><td class="px-4 py-2 border font-mono text-xs">2000s-至今 VMware / <strong>Docker</strong></td><td class="px-4 py-2 border">一台机器跑多个 OS / 进程级隔离</td><td class="px-4 py-2 border">云基础设施、秒级部署</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 划重点：</strong>Docker <strong>不是</strong>操作系统，它复用了宿主 OS 内核的能力（命名空间 + cgroup）把进程隔离开。所以容器必须"长在"某个 Linux 内核之上——这也解释了为什么 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">docker run</code> 在 Windows / macOS 上要套一层轻量虚拟机。你在 K8s 里看到的隔离，底座全是 OS 的能力。</p>
        </aside>
      </section>

      <!-- 6. 分类 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>操作系统分类</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">按"服务方式"和"硬约束"不同，操作系统分成几大类。搞清你的场景属于哪类，才能理解为什么有的系统要抢占式调度、有的却要"一个程序跑到完"：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类型</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">典型代表</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特征</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">应用场景</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">批处理</td><td class="px-4 py-2 border font-mono text-xs">IBM OS/360</td><td class="px-4 py-2 border">批量执行、无交互、吞吐优先</td><td class="px-4 py-2 border">大型机批处理作业</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">分时</td><td class="px-4 py-2 border font-mono text-xs">Unix / Linux / Windows / macOS</td><td class="px-4 py-2 border">时间片轮转、多用户交互、公平</td><td class="px-4 py-2 border">服务器、个人电脑</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">实时</td><td class="px-4 py-2 border font-mono text-xs">VxWorks / FreeRTOS</td><td class="px-4 py-2 border">确定性、低延迟、可预测</td><td class="px-4 py-2 border">工业控制、汽车、飞行器</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">嵌入式</td><td class="px-4 py-2 border font-mono text-xs">FreeRTOS / RT-Thread</td><td class="px-4 py-2 border">资源受限、可裁剪、低功耗</td><td class="px-4 py-2 border">单片机、路由器、家电</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">分布式</td><td class="px-4 py-2 border font-mono text-xs">集群 OS / 云 OS 扩展</td><td class="px-4 py-2 border">多机协同、对用户透明</td><td class="px-4 py-2 border">集群、云计算、区块链节点</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>"嵌入式"和"实时"不是同一维度——嵌入式是"资源受限"的类别，实时是"响应有硬时限"的约束，两者经常叠在一起（车载系统通常既嵌入式又实时），但也可以单独出现。</p>
        </aside>
      </section>

      <!-- 7. 底层实现原理总览 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">7</span>底层实现原理总览（点题，后几篇逐个展开）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">操作系统的种种"魔法"，靠的是一套基础的底层机制。这里先把五个关键词列出来、各一句话，方便你建立地图——后面每一篇都会把它们展开：</p>
        <ol class="space-y-4 mb-4">
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>内核 (Kernel)</strong> —— OS 的核心本体，常驻内存、拥有最高权限，直接管理全部硬件。你敲的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">go run .</code> 编译出的进程，只是内核眼皮底下的一个"受管对象"。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>用户态 / 内核态</strong> —— CPU 的两种特权级别：普通程序在用户态跑（碰不了硬件），要执行内核代码就得切换进内核态。一切安全隔离都建立在这道"特权墙"上。<Link :route="'cs-5-a-1-kernel'" :text="'内核态 vs 用户态'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>系统调用 (System Call)</strong> —— 用户态请求内核服务的<strong>唯一合法入口</strong>，例如 <code class="bg-slate-100 px-1 rounded text-xs font-mono">read</code> / <code class="bg-slate-100 px-1 rounded text-xs font-mono">write</code> / <code class="bg-slate-100 px-1 rounded text-xs font-mono">fork</code>。应用不能自己"跳"进内核，只能按这个门规规矩矩地进。<Link :route="'cs-5-a-1-kernel'" :text="'系统调用机制'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>中断 (Interrupt)</strong> —— 硬件主动打断 CPU，通知内核"有事件发生了"（键盘按下、时钟滴答、磁盘读完）。没有中断，内核永远不知道外面发生了什么。<Link :route="'cs-5-a-2-interrupt'" :text="'中断与异常'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <div class="text-slate-600"><strong>设备驱动 (Driver)</strong> —— 内核里专门读写某一种硬件的小模块，把"这台网卡的寄存器怎么操作"封装成统一接口。操作系统对设备的抽象（fd / socket）全靠驱动垫底。</div>
          </li>
        </ol>

        <p class="text-slate-600 mb-4 leading-relaxed">光看书不够——去命令行里<strong>亲眼看看操作系统在管理资源</strong>。ps / top / free 本身就是"向内核要资源信息"的程序，它们看到的东西就是进程表、内存表这些内核数据结构：</p>
        <div class="mb-4"><Code language="bash" :code="cliCode" title="📟 Terminal" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>这些命令之所以能"看到"别的进程，是因为内核把<strong>部分系统信息以虚拟文件/接口</strong>的形式暴露了出来（Linux 的 <code class="bg-blue-100 px-1 rounded text-xs font-mono">/proc</code>）。这就是"一切皆文件"思想的体现——连进程列表都是文件。</p>
        </aside>
      </section>

      <!-- 8. 常见误区 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见误区</h2>
        <div class="mb-4">
          <h3 class="text-base font-semibold text-slate-700 mb-2">误区 1："操作系统 = Windows 那个图形界面？"</h3>
          <p class="text-slate-600 leading-relaxed mb-3"><strong>不是。</strong>桌面、开始菜单、Dock 这些都只是操作系统最外层的<strong>壳（Shell）</strong>，真正干活的是藏在底下的<strong>内核</strong>。把图形界面关了、切到纯终端模式，内核照样在跑，你的 Go 服务照样能起来。类比：酒店前台不是酒店大楼本身。</p>
        </div>
        <div class="mb-4">
          <h3 class="text-base font-semibold text-slate-700 mb-2">误区 2："操作系统就是个普通程序？"</h3>
          <p class="text-slate-600 leading-relaxed mb-3"><strong>不是。</strong>普通程序：受内核管辖、在用户态运行、申请内存要系统调用、崩溃了只是自己崩。操作系统内核：<strong>有 CPU 最高特权、常驻内存、开机第一个被加载</strong>，还能反过来管所有普通程序。你的 Go 程序要是能改内核，那它就变成病毒了。</p>
        </div>
        <div class="mb-4">
          <h3 class="text-base font-semibold text-slate-700 mb-2">误区 3："系统调用 = 库函数？"</h3>
          <p class="text-slate-600 leading-relaxed mb-3"><strong>混淆了。</strong><code class="bg-slate-100 px-1 rounded text-xs font-mono">fmt.Println</code> 是 Go 标准库<strong>库函数</strong>，它在用户态执行、还会做缓冲格式化；它内部才调 <code class="bg-slate-100 px-1 rounded text-xs font-mono">write()</code> 这个<strong>系统调用</strong>。库函数可替换、可缓存、可重写；系统调用要陷入内核、开销大、接口由内核定死。</p>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 经验法则：</strong>看文档/报错时，遇到 <code class="bg-amber-100 px-1 rounded text-xs font-mono">open</code> / <code class="bg-amber-100 px-1 rounded text-xs font-mono">write</code> / <code class="bg-amber-100 px-1 rounded text-xs font-mono">fork</code> / <code class="bg-amber-100 px-1 rounded text-xs font-mono">mmap</code> 这类名字，往往是<strong>系统调用</strong>；遇到 <code class="bg-amber-100 px-1 rounded text-xs font-mono">fmt.Println</code> / <code class="bg-amber-100 px-1 rounded text-xs font-mono">os.ReadFile</code> 这类，是<strong>库函数</strong>——它们内部偷偷帮你发系统调用。</p>
        </aside>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">✅</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>操作系统是系统软件</strong>：管理硬件与软件资源、为应用提供抽象与服务，夹在硬件和应用之间。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>四大资源管理 = 同一个动作</strong>：CPU→进程/线程、内存→虚拟内存、磁盘→文件、设备→fd/socket。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>三种视角</strong>：用户（好用）、应用（API）、系统（分配/保护）——学 OS 时先想清自己在哪个视角。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>底层五件套</strong>：内核、用户态/内核态、系统调用、中断、驱动——后续每篇逐个展开。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>连回 Go</strong>：你的 goroutine 最终跑在 OS 线程上，GMP 调度叠在 OS 调度之上；写高并发后端，先懂操作系统。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">下一篇进入正题——<Link :route="'cs-5-a-1-kernel'" :text="'内核态 vs 用户态、系统调用机制'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />，揭开"特权墙"和"唯一的门"的底层细节。</p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-4-k-5-yield'" :text="'← 上一节：良率与DFM：工艺角/冗余设计/芯片分级'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-5-a-1-kernel'" :text="'下一节：内核态 vs 用户态、系统调用机制 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "操作系统是什么" },
  { id: "sec-2", name: "它在计算机里的位置" },
  { id: "sec-3", name: "它做什么用（四大资源）" },
  { id: "sec-4", name: "三种视角" },
  { id: "sec-5", name: "发展史简表" },
  { id: "sec-6", name: "操作系统分类" },
  { id: "sec-7", name: "底层实现总览" },
  { id: "sec-8", name: "⚠️ 常见误区" },
  { id: "sec-9", name: "✅ 小结" },
]

// ===== 代码示例 =====
const osInfoCode = `package main

import (
    "fmt"
    "os"
    "runtime"
)

func main() {
    // runtime 是"编译进程序里的 OS 情报站"
    fmt.Println("操作系统(内核):", runtime.GOOS)        // 输出: windows / linux / darwin
    fmt.Println("CPU 架构:", runtime.GOARCH)           // 输出: amd64 / arm64
    fmt.Println("Go 编译器版本:", runtime.Version())     // 输出: go1.23.0 之类

    // 向内核问"这台机器叫什么名字"
    hostname, _ := os.Hostname()
    fmt.Println("本机主机名:", hostname)                // 输出: 你的电脑名

    // CPU 核数——内核告诉 runtime 的（见下一个示例）
    fmt.Println("逻辑 CPU 核数:", runtime.NumCPU())     // 输出: 8 / 16 等
}`;
const resourceCode = `package main

import (
    "fmt"
    "runtime"
)

func main() {
    // ① CPU：Go runtime 感知机器上有多少核
    //    （实际由 OS 内核统计后告诉应用层）
    fmt.Println("逻辑 CPU 核数:", runtime.NumCPU())     // 输出: 8（取决于你的机器）
    fmt.Println("GOMAXPROCS:", runtime.GOMAXPROCS(0)) // 输出: 8（默认=核数）

    // ② 内存：Go 自带"用户态内存分配器"，底层才向 OS 申请
    //    应用层看到的是 runtime 的堆统计，不是物理内存
    var m runtime.MemStats
    runtime.ReadMemStats(&m)
    fmt.Printf("堆内存占用: %.1f MB\\n", float64(m.HeapAlloc)/1024/1024) // 输出: 0.1 MB 等

    // ③ 系统真正的物理内存总量，应用无权直接读——
    //    要看 OS 提供的工具：任务管理器 / top / free
}`;
const cliCode = `# ps：查看当前有哪些进程（内核的"进程列表"）
ps -ef                # 全部进程
ps -ef | grep go      # 只看 Go 相关进程（管道也是 OS 提供的机制）

# top：实时看每个进程的 CPU / 内存占用（内核调度器在跑）
top                   # 按 q 退出

# free：看整个系统的物理内存 / 虚拟内存使用
free -h               # -h 人类可读单位

# ⚠️ Windows 上对应：任务管理器 (Ctrl+Shift+Esc)，或 PowerShell：
#    Get-Process | Sort-Object CPU -Descending | Select-Object -First 10`;
</script>
