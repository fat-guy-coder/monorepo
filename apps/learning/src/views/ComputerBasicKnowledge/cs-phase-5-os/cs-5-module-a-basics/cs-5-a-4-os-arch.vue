<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">操作系统体系结构：宏内核 / 微内核 / 混合内核</h1><p class="text-sm text-slate-500 mt-1">内核怎么组织自己——所有服务塞进一个房间，还是拆成一栋栋独立小楼？</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">操作系统 5-a-4</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：三种内核，三种组织哲学</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">上一节讲完内核怎么被「引导」起来。起来之后，内核要负责调度、内存、文件、驱动、网络、IPC 六大服务。这些服务<strong>放在哪</strong>、彼此<strong>怎么协作</strong>，决定了内核的三条设计路线：<strong>宏内核</strong>（全塞进内核态）、<strong>微内核</strong>（只留最小核心，其余拆成用户态服务）、<strong>混合内核</strong>（高频的进内核，低频的放用户态）。</p>

        <!-- 结构图：三栏对比 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 310" class="w-full h-auto">
            <defs><marker id="ar-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
            <!-- 面板分隔线 -->
            <line x1="255" y1="24" x2="255" y2="300" stroke="#e2e8f0" stroke-width="1"/>
            <line x1="505" y1="24" x2="505" y2="300" stroke="#e2e8f0" stroke-width="1"/>
            <!-- 三栏标题 -->
            <text x="130" y="16" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a" font-family="monospace">① 宏内核 Monolithic</text>
            <text x="375" y="16" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a" font-family="monospace">② 微内核 Microkernel</text>
            <text x="630" y="16" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a" font-family="monospace">③ 混合内核 Hybrid</text>

            <!-- ===== 面板 1：宏内核 ===== -->
            <rect x="35" y="26" width="190" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="130" y="42" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1" font-family="monospace">用户进程（应用态）</text>
            <line x1="130" y1="50" x2="130" y2="70" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ar-a)"/>
            <text x="140" y="64" font-size="9" fill="#64748b" font-family="monospace">一次 syscall 直达</text>
            <rect x="25" y="70" width="210" height="220" rx="12" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="130" y="86" text-anchor="middle" font-size="11" font-weight="bold" fill="#b45309" font-family="monospace">宏内核：全部服务在内核态</text>
            <rect x="40" y="96" width="86" height="36" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>
            <text x="83" y="118" text-anchor="middle" font-size="11" fill="#92400e" font-family="monospace">进程调度</text>
            <rect x="134" y="96" width="86" height="36" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>
            <text x="177" y="118" text-anchor="middle" font-size="11" fill="#92400e" font-family="monospace">内存管理</text>
            <rect x="40" y="142" width="86" height="36" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>
            <text x="83" y="164" text-anchor="middle" font-size="11" fill="#92400e" font-family="monospace">文件系统</text>
            <rect x="134" y="142" width="86" height="36" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>
            <text x="177" y="164" text-anchor="middle" font-size="11" fill="#92400e" font-family="monospace">设备驱动</text>
            <rect x="40" y="188" width="86" height="36" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>
            <text x="83" y="210" text-anchor="middle" font-size="11" fill="#92400e" font-family="monospace">网络协议栈</text>
            <rect x="134" y="188" width="86" height="36" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>
            <text x="177" y="210" text-anchor="middle" font-size="11" fill="#92400e" font-family="monospace">IPC</text>
            <text x="130" y="270" text-anchor="middle" font-size="9.5" fill="#a16207" font-family="monospace">同一大地址空间 · 靠 .ko 模块热插补救</text>

            <!-- ===== 面板 2：微内核 ===== -->
            <rect x="285" y="26" width="180" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="375" y="42" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1" font-family="monospace">用户进程（应用态）</text>
            <line x1="375" y1="50" x2="375" y2="92" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ar-a)"/>
            <text x="385" y="76" font-size="9" fill="#64748b" font-family="monospace">IPC 转发</text>
            <rect x="320" y="92" width="110" height="38" rx="8" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.5"/>
            <text x="375" y="116" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0e7490" font-family="monospace">文件系统服务(用户态)</text>
            <line x1="375" y1="130" x2="375" y2="148" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ar-a)"/>
            <text x="388" y="140" font-size="9" fill="#64748b" font-family="monospace">IPC</text>
            <circle cx="375" cy="185" r="38" fill="#06b6d4" stroke="#0891b2" stroke-width="2"/>
            <text x="375" y="181" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">微内核核心</text>
            <text x="375" y="196" text-anchor="middle" font-size="9" fill="#e0f2fe" font-family="monospace">IPC·调度·映射</text>
            <line x1="375" y1="223" x2="375" y2="240" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ar-a)"/>
            <text x="388" y="232" font-size="9" fill="#64748b" font-family="monospace">IPC</text>
            <rect x="320" y="240" width="110" height="38" rx="8" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.5"/>
            <text x="375" y="264" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0e7490" font-family="monospace">设备驱动服务(用户态)</text>

            <!-- ===== 面板 3：混合内核 ===== -->
            <rect x="540" y="26" width="180" height="24" rx="6" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="630" y="42" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1" font-family="monospace">用户进程（应用态）</text>
            <line x1="630" y1="50" x2="630" y2="70" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#ar-a)"/>
            <text x="645" y="64" font-size="9" fill="#64748b" font-family="monospace">高频 syscall 直达</text>
            <rect x="530" y="70" width="200" height="150" rx="12" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="630" y="86" text-anchor="middle" font-size="11" font-weight="bold" fill="#b45309" font-family="monospace">混合内核：核心 + 高频驱动</text>
            <rect x="543" y="96" width="86" height="36" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>
            <text x="586" y="118" text-anchor="middle" font-size="11" fill="#92400e" font-family="monospace">进程调度</text>
            <rect x="631" y="96" width="86" height="36" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>
            <text x="674" y="118" text-anchor="middle" font-size="11" fill="#92400e" font-family="monospace">内存管理</text>
            <rect x="543" y="140" width="86" height="36" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>
            <text x="586" y="162" text-anchor="middle" font-size="11" fill="#92400e" font-family="monospace">设备驱动</text>
            <rect x="631" y="140" width="86" height="36" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>
            <text x="674" y="162" text-anchor="middle" font-size="11" fill="#92400e" font-family="monospace">文件系统</text>
            <text x="630" y="198" text-anchor="middle" font-size="9" fill="#a16207" font-family="monospace">驱动/调度/内存留内核态（保性能）</text>
            <line x1="630" y1="220" x2="630" y2="236" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#ar-a)"/>
            <text x="644" y="230" font-size="9" fill="#64748b" font-family="monospace">可选 IPC</text>
            <rect x="548" y="236" width="164" height="40" rx="8" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="4 3"/>
            <text x="630" y="259" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0e7490" font-family="monospace">用户态服务(网络/图形)</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">同样的六大服务，三种摆放方式：宏内核堆进一个内核大空间（快但一损俱损）；微内核只留核心、其余各自独立成用户态进程（稳但每步都要 IPC 传消息）；混合内核把高频路径留在内核、低频服务放用户态——现实主流</figcaption>
        </figure>
      </section>

      <!-- 1. 内核要提供哪些服务 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>先问：内核到底要提供哪些服务？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">不管什么结构，内核的<strong>职责清单</strong>都差不多——只是把这些职责<strong>摆在哪、怎么通信</strong>的区别。六大核心服务：</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>进程调度</strong>：决定哪个进程/线程此刻用 CPU，跑多久，怎么切换（见 <Link :route="'cs-5-b-4-scheduling'" :text="'调度算法'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />）。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>内存管理</strong>：虚拟地址空间、分页、页表、物理内存分配与回收。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>文件系统</strong>：把磁盘块抽象成「文件/目录」，管理 inode、缓存、权限。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>设备驱动</strong>：对接 CPU 之外的硬件（磁盘、网卡、显卡、USB）——用统一接口把寄存器/中断包装给上层。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>网络协议栈</strong>：socket、TCP/IP、路由、拥塞控制。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>IPC（进程间通信）</strong>：管道、信号、共享内存、消息队列——让进程之间能协作。</span></li>
        </ul>
        <p class="text-slate-600 mb-4 leading-relaxed">再加上中断处理、时钟管理、安全权限校验。问题来了：<strong>这些服务放进内核态，还是放到用户态？</strong>放进内核态 = 宏内核，拆出去 = 微内核，折中 = 混合内核。这就是本页的核心问题。</p>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>这六项服务，在你写 Go 后端时几乎一一有对应——<strong>进程调度 ≈ goroutine 调度器（GMP）</strong>、<strong>内存管理 ≈ Go 的堆分配器 + GC</strong>、<strong>文件系统 ≈ 数据库/对象存储</strong>、<strong>设备驱动 ≈ 第三方 SDK / 基础设施层</strong>、<strong>网络栈 ≈ net/http</strong>、<strong>IPC ≈ channel / 消息队列</strong>。内核把「系统能力」包装给进程，就像你的服务把「业务能力」包装给前端。下一节开始对比三种摆法。</p>
        </aside>
      </section>

      <!-- 2. 宏内核 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>宏内核 Monolithic：所有服务塞进一个大房间</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">宏内核把<strong>调度、内存、文件、驱动、网络、IPC 全部编译进同一个内核镜像</strong>，跑在<strong>内核态、共享同一大地址空间</strong>。Linux 和 BSD 就是典型。<code class="bg-slate-100 px-1 rounded text-xs font-mono">uname -r</code> 看到的那个「内核」，就是这一整块。</p>

        <h3 class="text-base font-semibold text-slate-700 mb-2">运行时的样子</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>应用进程发出 <code class="bg-slate-100 px-1 rounded text-xs font-mono">read()</code> 系统调用，<strong>一次陷入</strong>进内核态。</li>
          <li>内核直接在<strong>自己的函数栈上</strong>调用文件系统代码 → 文件系统直接调用磁盘驱动（都是普通函数调用，无隔离、无消息）。</li>
          <li>结果原路返回用户态。全程只有<strong>一次用户态↔内核态切换</strong>。</li>
        </ol>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <p class="text-sm font-semibold text-emerald-800 mb-1">✅ 优点</p>
            <ul class="space-y-1 text-sm text-emerald-800">
              <li>▸ <strong>性能最好</strong>：服务间是直接函数调用，零 IPC 开销。</li>
              <li>▸ <strong>实现直观</strong>：数据结构全局共享，锁、调度、缓存都好写。</li>
              <li>▸ 业界积累深厚：Linux 性能调优资料满天飞。</li>
            </ul>
          </div>
          <div class="bg-rose-50 rounded-xl p-4 border border-rose-200">
            <p class="text-sm font-semibold text-rose-800 mb-1">❌ 缺点</p>
            <ul class="space-y-1 text-sm text-rose-800">
              <li>▸ <strong>代码庞大</strong>：千万行级，安全漏洞面巨大。</li>
              <li>▸ <strong>崩溃即内核崩</strong>：任何一个驱动 bug 都可能 kernel panic。</li>
              <li>▸ <strong>难扩展</strong>：传统上加个文件系统要重编译整个内核。</li>
            </ul>
          </div>
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-2">Linux 的补救：内核模块 .ko</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">宏内核最难堪的就是「为了扩展要重编整颗内核」。Linux 用<strong>可加载内核模块（Loadable Kernel Module, .ko）</strong>补救：驱动、文件系统可以编译成独立 .ko 文件，运行时用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">modprobe</code> 热插进内核，不用重启。但注意——它仍然是<strong>装进内核态、共享同一地址空间</strong>的一块，不是独立的用户态进程。</p>
        <div class="mb-4"><Code language="bash" :code="kernelModuleCode" title="内核模块观察.sh" /></div>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>宏内核 ≈ <strong>单体后端</strong>——所有 handler、中间件、数据访问层塞进一个进程，内部直接函数调用，快、简单，但一个 goroutine panic 没 recover 就可能拖垮整个服务；也像「改一处要整体重新 build 部署」。Linux 的 .ko 模块 ≈ 单体里用「可选加载的插件/中间件」补救灵活性——但插件崩了照样炸主进程。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>宏内核 ≈ <strong>巨石前端应用</strong>（一个 bundle、全局 store、全局 CSS）。路由跳转是「直接调用组件」，快、开发体验一体；但任意一处运行时错误都可能白屏全站，样式/状态也难以隔离。它和微前端的分歧，正是「性能 vs 隔离」的老矛盾。</p>
        </aside>
      </section>

      <!-- 3. 微内核 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>微内核 Microkernel：只留最小核心，其余全拆出去</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">微内核哲学：<strong>「内核里能不放就不放」</strong>。内核态只保留最基本的东西——<strong>IPC、基础调度、地址空间映射</strong>。文件系统、设备驱动、网络栈全部移到<strong>用户态</strong>，变成一个个<strong>独立的服务进程（server）</strong>，彼此只能通过<strong>IPC 消息</strong>协作。代表：Mach、L4、Minix、seL4。</p>

        <h3 class="text-base font-semibold text-slate-700 mb-2">一次「读文件」的完整链路</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600">应用调用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">open()</code>——编译器把它翻译成<strong>发一条 IPC 消息</strong>。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600">陷入微内核核心，核心做权限校验后，<strong>把消息转交给文件系统服务进程</strong>。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600">文件系统服务在<strong>用户态</strong>解析路径；发现要读磁盘，<strong>再发一条 IPC</strong> 给磁盘驱动服务。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600">驱动服务发硬件命令、等中断，把数据回给文件系统服务。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600">结果沿着消息链原路返回应用。全程 <strong>5~6 次用户态↔内核态切换</strong> + 多次消息编解码。</div></li>
        </ol>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <p class="text-sm font-semibold text-emerald-800 mb-1">✅ 优点</p>
            <ul class="space-y-1 text-sm text-emerald-800">
              <li>▸ <strong>内核极小</strong>：核心只有几万行，Bug 面小，可形式化验证（seL4）。</li>
              <li>▸ <strong>稳定</strong>：文件服务崩了重启该服务即可，内核不受影响。</li>
              <li>▸ <strong>安全</strong>：驱动被攻破只发生在自己进程里，互相隔离。</li>
              <li>▸ <strong>易扩展</strong>：新文件系统 = 新起一个用户态进程。</li>
            </ul>
          </div>
          <div class="bg-rose-50 rounded-xl p-4 border border-rose-200">
            <p class="text-sm font-semibold text-rose-800 mb-1">❌ 缺点</p>
            <ul class="space-y-1 text-sm text-rose-800">
              <li>▸ <strong>性能差</strong>：每次调用 = 多次 IPC 消息 + 上下文切换。</li>
              <li>▸ <strong>设计复杂</strong>：跨服务的锁、一致性问题变成了分布式问题。</li>
              <li>▸ 历史教训：Mach 理论很美，实测太慢被主流弃用。</li>
            </ul>
          </div>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed"><strong>历史教训：</strong>Mach 是 80 年代 CMU 的明星项目，让「微内核」成为主流理想。可实测发现 IPC 路径太贵，把 Linux 移植到 Mach 上比原生 Linux 慢 30~50%。Apple 的 NeXTSTEP（后 macOS/iOS 的 XNU 内核）最初也倾向全微内核，最终被迫把<strong>调度、内存、驱动塞回内核态</strong>，变成混合内核。Minix 因为「教学够用」活了下来（Linus 早期还借鉴过它）；L4 后来把 IPC 做到极快，但主要用于嵌入式/安全领域，没成为通用操作系统主流。</p>

        <div class="mb-4"><Code language="go" :code="ipcVsDirectCode" title="ipc-vs-direct.go" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>微内核 ≈ <strong>微前端架构</strong>（qiankun / Module Federation）。每个子应用独立部署、独立沙箱，通过一套通信协议（props / customEvent / 消息总线）集成——<strong>一个子应用崩了不至于全站挂</strong>，可以单独升级，但跨应用通信、加载、桥接的开销都比「一个巨石应用内部跳转」大。巨石 ≈ 宏内核，微前端 ≈ 微内核，取舍一模一样。</p>
        </aside>
      </section>

      <!-- 4. 混合内核 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>混合内核 Hybrid：高频进内核、低频放用户态</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">宏内核「快但脆」，微内核「稳但慢」——现实操作系统只好<strong>都要</strong>。混合内核的规则很简单：<strong>把高频路径（调度、内存管理、核心驱动）留在内核态保性能</strong>，<strong>把可替换/低频的服务（图形、部分网络、部分驱动）放用户态保稳定</strong>。代表：<strong>Windows NT 系列、macOS/iOS 的 XNU</strong>。</p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div class="bg-white rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-1">Windows NT 的摆法</p>
            <ul class="space-y-1 text-sm text-slate-600">
              <li>▸ <strong>内核态</strong>：微内核核心（调度/中断/对象管理）+ 执行体（内存/进程/IO）+ HAL（硬件抽象层）+ 内核态驱动（WDM/WDF）。</li>
              <li>▸ <strong>用户态</strong>：Win32 子系统、图形（后来的桌面合成器）、部分服务进程。</li>
            </ul>
          </div>
          <div class="bg-white rounded-xl p-4 border border-slate-200">
            <p class="text-sm font-semibold text-slate-700 mb-1">macOS XNU 的摆法</p>
            <ul class="space-y-1 text-sm text-slate-600">
              <li>▸ <strong>内核态</strong>：Mach 微内核核心（内存/线程/IPC 原语）+ BSD 层（进程/网络/socket）+ I/O Kit 驱动框架。</li>
              <li>▸ <strong>用户态</strong>：WindowServer（图形合成）、launchd 等服务进程。</li>
            </ul>
          </div>
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-2">把「内核 + 可插拔模块」写成一个 Go 小程序</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">混合内核的关键不是「要不要模块」，而是「<strong>哪些进内核态、哪些独立出去</strong>」。下面的代码用「模块注册框架」演示：内核只定义 <code class="bg-slate-100 px-1 rounded text-xs font-mono">Module</code> 接口（插槽），具体能力按需 load——这就是 Linux 宏内核 + .ko、Windows 驱动模型、macOS I/O Kit 都用的「注册-加载」心智模型。</p>
        <div class="mb-4"><Code language="go" :code="moduleRegisterCode" title="kernel-module.go" /></div>

        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>三种内核就是三种公司组织方式——<strong>宏内核 = 中央集权</strong>：所有部门听 CEO 指挥，决策快、效率高，但一个关键部门出事，全公司瘫痪；<strong>微内核 = 联邦制</strong>：各部门完全独立，某部门倒闭不影响别人，但跨部门协调要开一堆会、效率极低；<strong>混合内核 = 主流大公司</strong>：财务、法务、核心研发攥在总部手里（内核态），边缘业务外包、设独立子公司（用户态）——<strong>核心集权保证效率，边缘放权保证灵活</strong>。所以现实里绝大多数大公司都是「混合制」，绝大多数操作系统也是混合内核。</p>
        </aside>
      </section>

      <!-- 5. 对比与系统调用路径 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>三者对比 + 系统调用路径差异</h2>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">宏内核</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">微内核</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">混合内核</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">服务位置</td><td class="px-4 py-2 border">全部在内核态，同一大地址空间</td><td class="px-4 py-2 border">内核态只剩最小核心；文件/驱动/网络全在用户态服务进程</td><td class="px-4 py-2 border">核心 + 高频驱动在内核态；部分服务在用户态</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">性能</td><td class="px-4 py-2 border">最高（内部直接函数调用）</td><td class="px-4 py-2 border">差（每次调用多次 IPC + 模式切换）</td><td class="px-4 py-2 border">中上（高频路径在内核态）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">稳定性</td><td class="px-4 py-2 border">低——驱动 bug 崩整个内核</td><td class="px-4 py-2 border">高——服务崩了重启服务即可</td><td class="px-4 py-2 border">中上——内核态驱动仍有风险</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">扩展性</td><td class="px-4 py-2 border">差——改内核要重编译，靠 .ko 补救</td><td class="px-4 py-2 border">好——加一个用户态进程就是新服务</td><td class="px-4 py-2 border">较好——用户态服务易扩展，内核态受版本限制</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">安全性</td><td class="px-4 py-2 border">弱——内核态攻击面巨大</td><td class="px-4 py-2 border">强——服务进程互相隔离</td><td class="px-4 py-2 border">中上</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">代码量</td><td class="px-4 py-2 border font-mono text-xs">千万行级</td><td class="px-4 py-2 border font-mono text-xs">核心几万行</td><td class="px-4 py-2 border font-mono text-xs">中</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">代表系统</td><td class="px-4 py-2 border">Linux、FreeBSD、BSD 系</td><td class="px-4 py-2 border">Mach、L4、Minix、seL4</td><td class="px-4 py-2 border">Windows NT/11、macOS/iOS XNU</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-2">同一个系统调用，路径差多少？</h3>
        <div class="mb-4"><Code language="text" :code="syscallPathCode" title="系统调用路径对比.txt" /></div>
        <p class="text-slate-600 mb-4 leading-relaxed">关键就在<strong>切换次数</strong>：宏内核 <code class="bg-slate-100 px-1 rounded text-xs font-mono">syscall</code> 一次陷入直达目标；微内核的每次 IPC 都要「用户态→内核态→用户态」转一圈，读一个文件可能要 5~6 圈。这就是微内核「理论干净、实测慢」的根源，也是混合内核存在的理由。</p>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 延伸一句：外核 Exokernel：</strong>还有更激进的思路——内核干脆不做「策略」，只做「资源保护与复用」（强制权限），把文件系统、调度策略全部下放给用户态的「库操作系统（libOS）」。Exokernel、L4、Multikernel 等都属于这一派探索。理解它的意义：结构之争的本质永远是<strong>「在哪个特权级放什么代码、边界画在哪」</strong>。</p>
        </aside>
      </section>

      <!-- 6. 与 Go 底层实现的关系 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>与 Go 底层实现的关系：Go runtime 就是一个「用户态微内核」</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">你平时写的 Go 程序，其实运行在<strong>两级操作系统</strong>之上：外层是 Linux 宏内核（管线程、内存页、socket），内层是 <strong>Go runtime</strong>——它像微内核一样，在自己用户态里再管一层「进程」（goroutine）、「内存」（堆分配器）、「网络」（netpoller）。</p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">能力</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Linux 宏内核（内核态）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Go runtime（用户态）</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">调度</td><td class="px-4 py-2 border">线程/进程调度（每个 goroutine 并不直接对应线程）</td><td class="px-4 py-2 border"><strong>GMP 调度器</strong>：goroutine 自己排，M 到 P 再到 G</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">内存</td><td class="px-4 py-2 border">虚拟内存、缺页、brk/mmap 分配物理页</td><td class="px-4 py-2 border">mcache/mcentral/mheap 分代分配 + GC，减少系统调用</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">网络</td><td class="px-4 py-2 border">阻塞式 socket、内核协议栈</td><td class="px-4 py-2 border"><strong>netpoller</strong>：非阻塞 fd + epoll 事件循环，阻塞 goroutine 而不占线程</td></tr>
            </tbody>
          </table>
        </div>

        <h3 class="text-base font-semibold text-slate-700 mb-2">为什么 Go 需要非阻塞 IO？</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600">宏内核的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">read()</code> 阻塞时，会让<strong>整个内核线程睡眠</strong>。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600">如果每个 goroutine 对应一个内核线程，几千个 goroutine 一阻塞，就是几千个睡眠线程——上下文切换开销爆炸。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600">所以 Go 用<strong>非阻塞 IO + netpoller</strong>：goroutine 要等 IO 时，把 fd 挂进 epoll，自己挂起；线程立刻去跑别的 goroutine。等内核 epoll 说「数据来了」，再唤醒对应 goroutine。</div></li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed">这就是「避开宏内核阻塞式系统调用的低效」——Go 把「阻塞」这件事从<strong>内核态</strong>搬到了<strong>自己用户态的事件循环里</strong>。你写的业务代码是「用户态服务」，Go runtime 是「用户态微内核」，Linux 是底下那个宏内核，三级协作。</p>

        <h3 class="text-base font-semibold text-slate-700 mb-2">容器：Linux 宏内核能力的另一个体现</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">Docker 之所以「轻」，是因为它复用了 Linux 内核的两个宏内核特性：<strong>cgroup</strong>（资源限额：CPU/内存/IO 配额）和 <strong>namespace</strong>（隔离：PID/网络/挂载/用户隔离）。容器不是虚拟机，没有自己的内核，全靠宿主内核的这两套机制——这恰恰是<strong>宏内核「把一堆能力集中在内核态」的红利</strong>。</p>

        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>把整个 Go 服务想成一个微内核：你的<strong>业务 handler 是「用户态服务」</strong>，各自独立；<strong>Go runtime 是「微内核核心」</strong>，统一调度 goroutine、分配内存、轮询网络；<strong>Linux 是「宏内核」</strong>，只提供最底层的线程、内存页和 socket 原语。理解这层关系，你就明白为什么 goroutine 轻、为什么 net/http 能扛几十万并发、为什么 Go 官方反复强调「<strong>不要自己写线程池</strong>」——runtime 已经帮你做了微内核该做的事。<Link :route="'go-2-1-goroutine-gmp'" :text="'goroutine 与 GMP 调度器'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> 里有完整调度细节。</p>
        </aside>
        <p class="text-sm text-slate-500 leading-relaxed">跳转阅读：<Link :route="'cs-5-a-1-kernel'" :text="'内核态 vs 用户态、系统调用机制'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'go-2-1-goroutine-gmp'" :text="'goroutine 与 GMP 调度器（Go runtime 的「用户态微内核」）'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>

      <!-- 7. 常见误区 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">7</span>常见误区 ⚠️</h2>
        <div class="space-y-4 mb-2">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：「以为 Linux 是微内核」。</strong>看到 <code class="bg-amber-100 px-1 rounded text-xs font-mono">insmod</code> 能加载驱动就以为 Linux 是微内核——<strong>错了</strong>。Linux 的 .ko 模块是「运行时装进内核态、共享同一地址空间」的一块，文件系统、驱动、网络全部跑在内核态——这是<strong>标准的宏内核</strong>。「能不能卸载」不是微内核的判据，「是不是独立的用户态服务进程 + 只能 IPC 通信」才是。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：「以为内核越新，就越该走微内核路线」。</strong>历史恰好相反：80 年代微内核思潮（Mach）曾被寄予厚望，90 年代发现 IPC 太慢、通用 OS 扛不住；此后 <strong>Windows/macOS 都回归混合内核，Linux 坚持宏内核 + 模块</strong>——主流没有走向纯微内核。别把「新」和「微内核」划等号。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：「把『内核态程序』当成『内核结构』」。</strong>即使某驱动被编译进内核镜像、跑在内核态，也和它是不是「模块」无关。宏内核里也可以有可动态加载的组件（.ko），微内核里也可以有不加载的驱动——<strong>结构看的是「服务放在哪个特权级、靠什么通信」</strong>，不是「能不能热插拔」。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 4：「以为微内核一无是处」。</strong>微内核在<strong>安全敏感/可验证</strong>领域（seL4 被形式化验证、用于军用/航天/自动驾驶）依然是主力；L4 系用「快速 IPC」大幅压低了开销。混合内核本身就是「微内核理想被性能打脸后」的折中——<strong>没有完美的内核，只有适合场景的取舍</strong>。</p>
          </aside>
        </div>
      </section>

      <!-- 8. 小结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">宏内核 = 大而快、一崩全崩；微内核 = 小而稳、通信贵；混合 = 折中，现实主流</p>
          <p class="text-xs text-amber-600 text-center">一句话记忆：性能不够 → 服务往内核搬；稳定不够 → 服务往外拆。边界画在哪，就是什么内核</p>
        </div>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>六大服务</strong>（调度/内存/文件/驱动/网络/IPC）所有内核都得提供，区别只是放哪、怎么通信。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>宏内核</strong>（Linux/BSD）：全部内核态同一空间，性能最好、扩展最差，靠 <code class="bg-slate-100 px-1 rounded text-xs font-mono">.ko</code> 模块补救。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>微内核</strong>（Mach/L4/Minix）：只留 IPC/调度/映射，服务全在用户态进程，稳定安全但 IPC 慢，Mach 因此被弃。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>混合内核</strong>（Windows NT、macOS XNU）：高频进内核、低频放用户态，是现实主流选择。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>系统调用路径</strong>：宏内核一次陷入直达；微内核多次 IPC 消息接力，模式切换是性能分水岭。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>与 Go 的关系</strong>：Go runtime = 用户态微内核（GMP/堆分配器/netpoller），Linux 宏内核 = 底座，容器（cgroup/namespace）吃的是宏内核红利。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">相关阅读：<Link :route="'cs-5-a-1-kernel'" :text="'内核态 vs 用户态、系统调用机制'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'go-2-1-goroutine-gmp'" :text="'goroutine 与 GMP 调度器（Go 的用户态调度）'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'cs-5-b-1-pcb'" :text="'进程控制块 PCB'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-5-a-3-boot'" :text="'← 上一节：引导过程：BIOS→Bootloader→内核'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-5-a-5-os-compare'" :text="'下一节：主流操作系统对比：Windows/Linux/macOS/Unix →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "内核要提供哪些服务" },
  { id: "sec-2", name: "宏内核 Monolithic" },
  { id: "sec-3", name: "微内核 Microkernel" },
  { id: "sec-4", name: "混合内核 Hybrid" },
  { id: "sec-5", name: "对比与系统调用路径" },
  { id: "sec-6", name: "与 Go 底层实现" },
  { id: "sec-7", name: "常见误区" },
  { id: "sec-8", name: "小结" },
]

// ===== 代码示例 1：直调 vs IPC（抽象开销演示）=====
const ipcVsDirectCode = `package main

import (
	"fmt"
	"time"
)

// 模拟"宏内核式"调用：同一地址空间内函数直接调，没有中间商
func add(a, b int) int { return a + b }

func main() {
	const N = 1_000_000

	// ① 直调：一次普通函数调用（宏内核内部直调的类比）
	start := time.Now()
	sum := 0
	for i := 0; i < N; i++ {
		sum += add(i, 1) // 一条 CALL 指令，无切换、无排队、无编解码
	}
	fmt.Printf("直调 %d 次: %v (sum=%d)\\n", N, time.Since(start), sum)

	// ② IPC：goroutine + channel 做"消息往返"（微内核服务调用的类比）
	ch := make(chan int, 1) // 容量 1，才能完成一问一答
	done := make(chan struct{})
	go func() {
		for {
			v, ok := <-ch
			if !ok {
				close(done)
				return
			}
			ch <- v + 1 // "服务端"算完，把结果发消息回去
		}
	}()

	start = time.Now()
	for i := 0; i < N/10; i++ { // 消息往返贵，少跑一个量级才不至于太慢
		ch <- i
		<-ch // 等"服务端"回包
	}
	close(ch)
	<-done
	fmt.Printf("IPC  %d 次往返: %v\\n", N/10, time.Since(start))

	// 输出:（数值因机器而异，重点看量级差）
	// 直调 1000000 次: 372µs  (sum=500000500000)
	// IPC  100000 次往返: 19.7ms   ← 只跑了 1/10 的量，却慢了约 50 倍
}`;

// ===== 代码示例 2：查看 Linux 内核模块（宏内核可扩展性）=====
const kernelModuleCode = `# —— Linux 宏内核的可扩展性：.ko 内核模块 ——

# 1. 当前内核版本号（宏内核是"一整块"，版本号标识整块）
uname -r        # 输出: 5.15.0-91-generic

# 2. 列出已加载进内核态的所有模块（相当于"已热插进内核的驱动们"）
lsmod
# 输出: Module                  Size  Used by
#       veth                   24576  1 docker0
#       ext4                  774144  3
#       nf_tables             147456  1
#       ...

# 3. 查看某模块信息（作者、参数、依赖哪个内核）
modinfo ext4
# 输出: filename: /lib/modules/5.15.0-91-generic/kernel/fs/ext4/ext4.ko
#       license:  GPL
#       description: Fourth Extended Filesystem

# 4. 运行时加载/卸载——不用重启内核（对"宏内核难扩展"的补救）
sudo modprobe usb-storage   # 加载 U 盘驱动模块
sudo rmmod  usb-storage     # 卸载（仍然要内核态代码，只是不用重启）`;

// ===== 代码示例 3：模块化注册（类比"内核 + 可插拔模块"）=====
const moduleRegisterCode = `// 用一个"模块注册"小框架，类比 Linux .ko / Windows 驱动 / macOS I/O Kit
package main

import "fmt"

// —— 内核侧：只定义"模块"这个插槽，不实现任何具体能力 ——
type Module interface {
	Name() string
	Init() error
}

func load(m Module) {
	fmt.Printf("载入内核模块: %s\\n", m.Name())
	if err := m.Init(); err != nil {
		panic("模块初始化失败: " + err.Error())
	}
}

// —— 模块 1：文件系统（类比 ext4.ko）——
type Ext4 struct{}

func (Ext4) Name() string { return "ext4" }
func (Ext4) Init() error  { fmt.Println("  ├─ 挂载 /，可读写磁盘块"); return nil }

// —— 模块 2：网络协议栈（类比 tcp_ip.ko）——
type TCPIP struct{}

func (TCPIP) Name() string { return "tcp/ip" }
func (TCPIP) Init() error  { fmt.Println("  ├─ 初始化网卡，监听 0.0.0.0:80"); return nil }

// —— 模块 3：设备驱动（类比 usb_storage.ko）——
type USBStorage struct{}

func (USBStorage) Name() string { return "usb-storage" }
func (USBStorage) Init() error  { fmt.Println("  └─ 枚举 USB 设备，映射为 /dev/sdb"); return nil }

func main() {
	// 宏内核把"一堆功能"编译在一起；模块化之后，启动时按需 load
	load(Ext4{})
	load(TCPIP{})
	load(USBStorage{})
	// 输出:
	// 载入内核模块: ext4
	//   ├─ 挂载 /，可读写磁盘块
	// 载入内核模块: tcp/ip
	//   ├─ 初始化网卡，监听 0.0.0.0:80
	// 载入内核模块: usb-storage
	//   └─ 枚举 USB 设备，映射为 /dev/sdb
}`;

// ===== 代码示例 4：系统调用路径对比（伪代码）=====
const syscallPathCode = `宏内核：一次陷入直达
  用户进程 ──syscall──> 内核态: 调度/内存/文件/驱动 ──> 返回用户态
  模式切换: 用户态 → 内核态 → 用户态   (仅 1 次陷入)

微内核：多次 IPC 消息接力
  用户进程 ──IPC 1──> 文件系统服务(用户态) ──IPC 2──> 微内核核心(转发)
                                   │                        │
  读磁盘时: 核心 ──IPC 3──> 驱动服务(用户态) ──中断──> 硬件
  结果原路返回: 驱动 ──IPC──> 文件 ──IPC──> 用户进程
  模式切换: 每一条 IPC 都要"用户态→内核态→用户态"，一路 5~6 次`;
</script>
