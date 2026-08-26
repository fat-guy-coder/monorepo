<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">主流操作系统对比：Windows / Linux / macOS / Unix</h1><p class="text-sm text-slate-500 mt-1">一张谱系图看懂四大 OS 家族的来历与内核，以及为什么 Go 后端几乎都跑在 Linux 上</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">操作系统 5-a-5</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：Unix 家族谱系 + 生态定位图</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">操作系统不是凭空冒出来的，而是<b>一条延续了半个世纪的血缘</b>。先看两张图建立全局观：① 家族谱系图——今天的主流系统都是谁的子孙；② 生态定位图——谁统治着哪个战场。</p>

        <!-- 图 1：Unix 家族谱系图 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 350" class="w-full h-auto">
            <defs><marker id="cm-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker><marker id="cm-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#f59e0b"/></marker></defs>
            <text x="380" y="14" text-anchor="middle" font-size="13" font-weight="bold" fill="#475569" font-family="monospace">类 Unix 系统家族谱系（1969 → 至今）</text>
            <!-- 主干：AT&T Unix -->
            <rect x="105" y="22" width="220" height="42" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="215" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e" font-family="monospace">AT&amp;T Unix · 1969</text>
            <text x="215" y="55" text-anchor="middle" font-size="9" fill="#a16207" font-family="monospace">贝尔实验室 · Thompson &amp; Ritchie</text>
            <!-- 分叉线 -->
            <line x1="215" y1="64" x2="125" y2="96" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#cm-a)"/>
            <line x1="215" y1="64" x2="335" y2="96" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#cm-a)"/>
            <!-- BSD -->
            <rect x="35" y="98" width="180" height="38" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="125" y="122" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1" font-family="monospace">BSD · 1977（伯克利）</text>
            <!-- System V -->
            <rect x="245" y="98" width="180" height="38" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="335" y="119" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1" font-family="monospace">System V · 1983</text>
            <text x="335" y="132" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">AT&amp;T 商用化 · Unix 大战</text>
            <!-- BSD → 两支 -->
            <line x1="125" y1="136" x2="85" y2="168" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#cm-a)"/>
            <line x1="125" y1="136" x2="300" y2="168" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#cm-a)"/>
            <!-- 开源 BSD -->
            <rect x="5" y="170" width="160" height="38" rx="8" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
            <text x="85" y="194" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569" font-family="monospace">FreeBSD / NetBSD / OpenBSD</text>
            <!-- macOS -->
            <rect x="205" y="170" width="190" height="38" rx="8" fill="#06b6d4"/>
            <text x="300" y="194" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">macOS · XNU 内核 · 2001</text>
            <!-- System V → 商用 Unix -->
            <line x1="335" y1="136" x2="500" y2="168" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#cm-a)"/>
            <rect x="410" y="170" width="180" height="38" rx="8" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
            <text x="500" y="194" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569" font-family="monospace">Solaris / AIX / HP-UX（商用 Unix）</text>
            <!-- macOS → iOS -->
            <line x1="300" y1="208" x2="300" y2="240" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#cm-a)"/>
            <rect x="235" y="242" width="130" height="36" rx="8" fill="#06b6d4"/>
            <text x="300" y="264" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">iOS · 2007</text>
            <!-- GNU -->
            <rect x="570" y="22" width="175" height="42" rx="8" fill="#ccfbf1" stroke="#14b8a6" stroke-width="1.5"/>
            <text x="657" y="40" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f766e" font-family="monospace">GNU 计划 · 1983</text>
            <text x="657" y="55" text-anchor="middle" font-size="9" fill="#0d9488" font-family="monospace">RMS · 自由软件 · GPL</text>
            <!-- Linux 内核 -->
            <rect x="570" y="98" width="175" height="38" rx="8" fill="#ccfbf1" stroke="#14b8a6" stroke-width="1.5"/>
            <text x="657" y="122" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f766e" font-family="monospace">Linux 内核 · 1991</text>
            <text x="657" y="133" text-anchor="middle" font-size="9" fill="#0d9488" font-family="monospace">Linus · 独立实现</text>
            <!-- 独立实现虚线：AT&T Unix → GNU/Linux -->
            <line x1="325" y1="43" x2="568" y2="43" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#cm-b)"/>
            <text x="446" y="38" text-anchor="middle" font-size="9" fill="#d97706" font-family="monospace">受 Unix 启发，但重新实现</text>
            <line x1="657" y1="136" x2="657" y2="168" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#cm-a)"/>
            <!-- Linux 发行版 -->
            <rect x="545" y="170" width="200" height="38" rx="8" fill="#ccfbf1" stroke="#14b8a6" stroke-width="1.5"/>
            <text x="645" y="190" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f766e" font-family="monospace">Linux 发行版：Ubuntu / Debian / RHEL</text>
            <text x="645" y="203" text-anchor="middle" font-size="9" fill="#0d9488" font-family="monospace">Arch / CentOS · 内核同一颗，用户态不同</text>
            <!-- Android -->
            <line x1="645" y1="208" x2="645" y2="240" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#cm-a)"/>
            <rect x="555" y="242" width="180" height="36" rx="8" fill="#14b8a6"/>
            <text x="645" y="264" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">Android · 2008</text>
            <!-- POSIX 基座 -->
            <rect x="0" y="300" width="760" height="40" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
            <text x="380" y="316" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a" font-family="monospace">POSIX 标准（IEEE 1988）：进程 / 线程 / 文件 / 网络 API 统一契约</text>
            <text x="380" y="331" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">macOS 已认证 Unix · Linux / Android 属"类 Unix" · Windows 通过 WSL 兼容 POSIX</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">只有 Windows 不是 Unix 血统。BSD 一支演化出 macOS/iOS，System V 一支进化为商用 Unix，GNU + Linux 内核一支统治了今天的服务器与 Android</figcaption>
        </figure>

        <!-- 图 2：生态定位图 -->
        <figure>
          <svg viewBox="0 0 760 250" class="w-full h-auto">
            <text x="380" y="14" text-anchor="middle" font-size="13" font-weight="bold" fill="#475569" font-family="monospace">主流 OS 生态定位：谁统治哪个战场</text>
            <!-- 桌面端 -->
            <rect x="10" y="26" width="360" height="100" rx="12" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="190" y="50" text-anchor="middle" font-size="13" font-weight="bold" fill="#92400e" font-family="monospace">🖥️ 桌面端</text>
            <text x="190" y="70" text-anchor="middle" font-size="11" fill="#a16207" font-family="monospace">Windows —— 游戏 / 办公 / 大众</text>
            <text x="190" y="86" text-anchor="middle" font-size="11" fill="#a16207" font-family="monospace">macOS —— 设计 / 开发 / 内容创作</text>
            <text x="190" y="104" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="monospace">Linux 桌面存在但份额小众</text>
            <!-- 服务器 -->
            <rect x="390" y="26" width="360" height="100" rx="12" fill="#ecfeff" stroke="#06b6d4" stroke-width="1.5"/>
            <text x="570" y="50" text-anchor="middle" font-size="13" font-weight="bold" fill="#0e7490" font-family="monospace">☁️ 服务器 / 云计算</text>
            <text x="570" y="72" text-anchor="middle" font-size="11" fill="#155e75" font-family="monospace">Linux —— 绝对霸主（云主机默认）</text>
            <text x="570" y="88" text-anchor="middle" font-size="11" fill="#155e75" font-family="monospace">Windows Server 偏企业 .NET 场景</text>
            <text x="570" y="106" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="monospace">绝大多数互联网站点运行在 Linux 上</text>
            <!-- 移动端 -->
            <rect x="10" y="140" width="360" height="100" rx="12" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5"/>
            <text x="190" y="164" text-anchor="middle" font-size="13" font-weight="bold" fill="#15803d" font-family="monospace">📱 移动端</text>
            <text x="190" y="186" text-anchor="middle" font-size="11" fill="#166534" font-family="monospace">Android —— Linux 内核 · 开源</text>
            <text x="190" y="202" text-anchor="middle" font-size="11" fill="#166534" font-family="monospace">iOS —— XNU（同 macOS）· 封闭</text>
            <text x="190" y="220" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="monospace">移动双雄，共占智能手机绝大部分份额</text>
            <!-- 嵌入式 -->
            <rect x="390" y="140" width="360" height="100" rx="12" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
            <text x="570" y="164" text-anchor="middle" font-size="13" font-weight="bold" fill="#475569" font-family="monospace">🛰️ 嵌入式 / 物联网</text>
            <text x="570" y="186" text-anchor="middle" font-size="11" fill="#64748b" font-family="monospace">Linux 内核 —— 路由器 / 车机 / 智能电视</text>
            <text x="570" y="202" text-anchor="middle" font-size="11" fill="#64748b" font-family="monospace">Android（嵌入式版）/ RTOS 补充</text>
            <text x="570" y="220" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="monospace">Linux 因开源 + 可裁剪而统治嵌入式</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">一个规律：越靠近"必须开源/可定制/无人值守"的场景，Linux 越强；越靠近"要图形化/要人机交互"的场景，Windows 与 macOS 越强</figcaption>
        </figure>
      </section>

      <!-- 1. Unix 的遗产 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>Unix 的遗产：所有现代操作系统的老祖宗</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">今天四大主流系统里，只有 <strong>Windows 不是 Unix 血统</strong>。Linux、macOS、iOS、Android 全都是「类 Unix」——要么是 Unix 的直系后裔（BSD → macOS），要么是遵循其设计规范重新实现（GNU/Linux）。理解这条血缘，就理解了现代操作系统的骨架。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">演变时间线</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>1969 · 贝尔实验室</strong>：Ken Thompson 和 Dennis Ritchie 写出 Unix（名字是对失败的 MULTICS 项目的反讽，原拼 UNICS）。最初用汇编，只为一台机器。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>1973 · 用 C 重写</strong>：Unix 成为第一个「用高级语言写成的可移植操作系统」——同一份源码能搬到不同厂商的机器上，这是它横扫学术界的起点。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>1977-1983 · 两大分叉</strong>：学术界的 <strong>BSD</strong>（伯克利软件发行版）与 AT&amp;T 商用的 <strong>System V</strong> 分道扬镳，爆发著名的「Unix 大战」。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>1983 GNU + 1991 Linux 内核</strong>：Richard Stallman 发起 GNU 自由软件计划（缺内核）；Linus Torvalds 发布 Linux 内核（缺用户态）。两者合体，才是今天完整的 Linux 系统——这就是为什么有人坚持叫它 <strong>GNU/Linux</strong>。</div></li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed">1988 年 IEEE 推出 <strong>POSIX</strong> 标准，把「进程、线程、文件、网络 API」统一成一份契约。它是类 Unix 系统至今共同遵守的"普通话"——你在 macOS 上写的 shell 脚本，拿到 Linux 上基本能跑，靠的就是 POSIX。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>POSIX 之于操作系统 ≈ <strong>ECMAScript（ES）标准</strong>之于 JS 运行时——V8 和 JSCore 各自实现 ES 规范，就像 macOS 和 Linux 各自实现 POSIX 规范。前端生态的「一次编写处处运行」能成立，全靠 ES 这份契约；后端脚本能在不同 Unix 间迁移，全靠 POSIX。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>Go 的 <code class="bg-teal-100 px-1 rounded text-xs font-mono">os</code> / <code class="bg-teal-100 px-1 rounded text-xs font-mono">syscall</code> 标准库就是 Go 自己定义的「POSIX 层」——标准库替你抽象了 Windows 和 Unix 的差异，所以同样的 <code class="bg-teal-100 px-1 rounded text-xs font-mono">os.Open</code> 在哪都编译跑。而 <code class="bg-teal-100 px-1 rounded text-xs font-mono">os.PathSeparator</code> 之类常量，正是运行时告诉你"当前是不是 Unix"。</p>
        </aside>
      </section>

      <!-- 2. Windows -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>Windows：NT 混合内核的闭源巨头</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Windows 是唯一<b>不姓 Unix</b> 的主流系统。它的现代内核是 1993 年推出的 <strong>Windows NT</strong>（New Technology），与老 DOS 彻底决裂。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">关键点</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>NT 内核 = 混合内核</strong>：架构上借鉴了微内核的分层模块化（HAL 硬件抽象层 + 内核 + 执行体），实际运行时却把大量驱动/子系统直接塞进内核态——既不是纯微内核也不是纯宏内核。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>闭源 + 商业</strong>：微软独占授权，靠卖系统 + 生态赚钱。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>图形化桌面统治</strong>：Win32 / DirectX，游戏（Steam 绝大多数玩家在 Windows）与 Office 办公生态无可替代。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>企业级</strong>：AD 域（Active Directory）统一认证、组策略批量下发，是大量政企内网的标配。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>WSL（Windows Subsystem for Linux）</strong>：微软在 Windows 里直接内嵌了一颗 Linux 内核（WSL2），让你能跑 bash/apt/Docker——闭源巨头向开源世界递出的橄榄枝。</span></li>
        </ul>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div class="bg-emerald-50 rounded-xl p-4"><h4 class="text-sm font-semibold text-emerald-800 mb-2">✅ 优点</h4><ul class="text-xs text-emerald-700 space-y-1"><li>硬件/驱动兼容性最强，插上就能用</li><li>游戏与办公软件生态独占</li><li>图形界面 + 桌面应用体验最成熟</li><li>AD 域管理大型内网方便</li></ul></div>
          <div class="bg-red-50 rounded-xl p-4"><h4 class="text-sm font-semibold text-red-700 mb-2">⚠️ 缺点</h4><ul class="text-xs text-red-700 space-y-1"><li>闭源、收费、许可证繁琐</li><li>无 POSIX 命令行传统，运维靠图形界面（WSL 才补上）</li><li>服务端份额远不如 Linux</li><li>更新强制重启的历史包袱</li></ul></div>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>浏览器内核之争 ≈ OS 内核之争——<strong>Chromium / WebKit / Gecko</strong> 各有各的实现哲学，就像 NT / Linux / XNU；前端要同时兼容三家引擎（写 <code class="bg-purple-100 px-1 rounded text-xs font-mono">-webkit-</code> 前缀、做 polyfill），就像后端要同时兼容 Windows 和 Linux（路径分隔符、换行符、大小写敏感）。不同引擎的「行为差异」≈ 不同 OS 的「命令差异」——都是同一套标准（ES / POSIX）下各家实现细节的偏差。</p>
        </aside>
      </section>

      <!-- 3. Linux -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>Linux：宏内核 + 模块的开源霸主</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Linux 是 <strong>宏内核（Monolithic Kernel）+ 可加载模块（LKM）</strong>：内核是一个大的整体（调度、内存、文件系统、网络都在内核态），但驱动可以像插件一样<strong>动态加载</strong>，兼顾了宏内核的性能与微内核的扩展性。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">内核 vs 发行版（最容易混）</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed"><strong>Linux 内核</strong>是那一颗「引擎」（Linus 维护的 kernel.org）；<strong>发行版</strong>是「整车」——内核 + GNU 用户态 + 包管理器 + 默认配置。全世界的发行版共用<strong>同一颗内核</strong>，区别全在引擎之外。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">发行版</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">包管理器</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">血统</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">适合场景</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">Debian</td><td class="px-4 py-2 border font-mono text-xs">apt</td><td class="px-4 py-2 border">老牌社区</td><td class="px-4 py-2 border">稳定服务器</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">Ubuntu</td><td class="px-4 py-2 border font-mono text-xs">apt</td><td class="px-4 py-2 border">Debian 分支</td><td class="px-4 py-2 border">新手 / 云主机默认</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">RHEL</td><td class="px-4 py-2 border font-mono text-xs">dnf</td><td class="px-4 py-2 border">红帽企业</td><td class="px-4 py-2 border">金融 / 企业生产</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">CentOS Stream</td><td class="px-4 py-2 border font-mono text-xs">dnf</td><td class="px-4 py-2 border">RHEL 免费版</td><td class="px-4 py-2 border">服务器 / 云镜像</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">Arch</td><td class="px-4 py-2 border font-mono text-xs">pacman</td><td class="px-4 py-2 border">独立滚动</td><td class="px-4 py-2 border">桌面折腾 / 滚动更新</td></tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">为什么它是霸主</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>开源 GPL</strong>：源码可审计、可修改、可裁剪——安全性与可信度被企业认可。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>服务器/云计算</strong>：几乎所有云厂商的默认镜像都是 Linux，K8s/Docker 的宿主清一色 Linux。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>嵌入式</strong>：路由器、车机、智能电视、ATM——可裁剪到几 MB 也能跑。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>Android 底层</strong>：你的手机里那颗内核，就是 Linux。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>命令行友好</strong>：管道/重定向/脚本，天然适合无人值守与自动化运维。</span></li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>「内核 vs 发行版」≈ <strong>Vite / Webpack 版本 vs 脚手架模板</strong>——底层构建引擎是同一套工具，但 <code class="bg-purple-100 px-1 rounded text-xs font-mono">create-vue</code> / 公司内部脚手架替你把 ESLint、路由、UI 库的默认配置都配好了。换发行版就像换脚手架：引擎不变，默认体验和包管理方式变了。</p>
        </aside>
      </section>

      <!-- 4. macOS -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>macOS：BSD 血统的 Unix 认证选手</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">macOS 的遗传信息来自 <strong>BSD</strong>。2001 年苹果以 FreeBSD 为基础重做系统（代号 Mac OS X），核心内核叫 <strong>XNU</strong>——它是 <strong>Mach 微内核 + BSD 层</strong>的混合体：Mach 提供任务/线程/IPC 的微内核底座，BSD 层提供文件系统/网络/POSIX 接口。正因为带着 BSD 的血统，macOS 在 2001 年正式获得了 <strong>Unix 认证</strong>（可合法自称 UNIX）。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">关键点</h3>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>开发者友好</strong>：开箱即用的 bash/zsh + 全部 POSIX 命令，<code class="bg-slate-100 px-1 rounded text-xs font-mono">ls</code> / <code class="bg-slate-100 px-1 rounded text-xs font-mono">grep</code> / <code class="bg-slate-100 px-1 rounded text-xs font-mono">curl</code> 直接可用，再配 <strong>Homebrew（brew）</strong>装软件。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>精致体验</strong>：Retina 高分屏、Metal 图形栈、强一致性的 UI 规范——设计/内容创作领域的首选。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>闭源生态</strong>：核心闭源（Darwin/XNU 部分开源），只允许跑在自家硬件上，不可 DIY。</span></li>
        </ul>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div class="bg-emerald-50 rounded-xl p-4"><h4 class="text-sm font-semibold text-emerald-800 mb-2">✅ 优点</h4><ul class="text-xs text-emerald-700 space-y-1"><li>真·Unix 血统，开发命令行体验顶级</li><li>「macOS + iPhone」生态无缝联动</li><li>能耗与续航调校出色</li><li>适合设计 + 开发双栖的工程师</li></ul></div>
          <div class="bg-red-50 rounded-xl p-4"><h4 class="text-sm font-semibold text-red-700 mb-2">⚠️ 缺点</h4><ul class="text-xs text-red-700 space-y-1"><li>贵（硬件绑定），无法 DIY</li><li>游戏生态基本没有</li><li>闭源，服务器领域无人用</li><li>企业办公/政企兼容性不如 Windows</li></ul></div>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>macOS <strong>不是</strong> Linux。它们是两条不同的 Unix 血缘：macOS = BSD（有 Unix 认证），Linux = 独立实现（只算「类 Unix」）。你在 macOS 上用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">brew install</code>，在 Ubuntu 上用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">apt install</code>——命令差不多的原因不是同族，而是大家都守 POSIX 契约。</p>
        </aside>
      </section>

      <!-- 5. 移动端 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>移动端：Android 与 iOS</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">移动时代的双雄，底层都在谱系图上（见总览）：<strong>Android 用 Linux 内核</strong>，<strong>iOS 用 XNU</strong>（和 macOS 同源）。区别在于——</p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div class="bg-green-50 rounded-xl p-4"><h4 class="text-sm font-semibold text-green-700 mb-2">🤖 Android · 开放自由</h4><ul class="text-xs text-green-700 space-y-1"><li>内核：Linux（Google 改了调度器、内存管理）</li><li>开源（AOSP），任何厂商可魔改定制</li><li>但<b>不是</b>标准 GNU/Linux：没有 glibc，App 不直接跑 shell/ELF</li><li>跨系统协同靠 Binder IPC，与 Linux 桌面用户态不同</li></ul></div>
          <div class="bg-sky-50 rounded-xl p-4"><h4 class="text-sm font-semibold text-sky-700 mb-2">🍎 iOS · 封闭精致</h4><ul class="text-xs text-sky-700 space-y-1"><li>内核：XNU（与 macOS 完全同源）</li><li>闭源 + 严格审核，生态纯净、体验一致</li><li>安全性高、碎片化少（就苹果自家机型）</li><li>开发者要遵守 App Store 规则与上架审核</li></ul></div>
        </div>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比（选手机系统）：</strong>选 iOS 还是 Android ≈ 选 macOS 还是 Linux 的哲学之争——<strong>iOS = 封闭但精致</strong>（≈ macOS：体验统一、省心、不给你乱来），<strong>Android = 开放自由</strong>（≈ Linux：可定制、可刷机、什么都能碰，代价是要自己兜底）。你选系统的偏好，基本就是你在桌面/服务器上选系统的偏好在手机上的投影。</p>
        </aside>
      </section>

      <!-- 6. 服务器选型 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>服务器选型：为什么 Linux 独霸</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">云主机、容器、超级计算机——<strong>绝大多数服务器都跑 Linux</strong>（Windows Server 只在 .NET/政企内网有份额，macOS 几乎不用于服务器）。这不是巧合，是工程必然：</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>开源 + 免费</strong>：无许可证费用，跑 100 台和跑 1 台成本一样，源码可审计、可回滚。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>稳定</strong>：核心调度/内存/文件系统经过几十年生产验证，uptime 以年计是常态，无人值守也能自我维护。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>命令行 + 脚本化</strong>：一切皆文件、管道组合、systemd 服务——整个运维可以声明式/代码化，配合 Ansible/K8s 做大规模自动化。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>容器 = Linux 特性</strong>：Docker 的 cgroup + namespace 是 Linux 内核机制，容器化/云原生天然长在 Linux 上。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>网络栈</strong>：epoll 高性能事件驱动模型（见第 10 节），支撑了高并发反向代理（Nginx）与 Go 运行时。</div></li>
        </ol>
        <p class="text-xs text-slate-400 mb-4">上手第一步：登录服务器先用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">cat /etc/os-release</code> + <code class="bg-slate-100 px-1 rounded text-xs font-mono">uname -a</code> 看清自己跑的是哪个发行版、哪颗内核（完整命令见「第 9 节 · 示例 2」）。</p>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>你的 Go 程序<strong>在哪都能编译跑</strong>，但<strong>生产环境几乎都是 Linux</strong>。为什么？epoll 让 Go 的 netpoller 承载十万级连接、cgroup 让容器可以按 CPU/内存精确配额、稳定免费让部署成本趋近于零。而 Go 的杀手锏就是 <code class="bg-teal-100 px-1 rounded text-xs font-mono">GOOS=linux go build</code>——在 Windows 开发机上一条命令产出 Linux 二进制，<strong>一次编译，跨平台部署</strong>，这正是选型里最舒服的姿势。</p>
        </aside>
      </section>

      <!-- 7. 对比表 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">7</span>三大桌面/服务器 OS 对比表</h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Windows</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Linux</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">macOS</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">内核类型</td><td class="px-4 py-2 border">混合内核（NT）</td><td class="px-4 py-2 border">宏内核 + 可加载模块</td><td class="px-4 py-2 border">混合内核（XNU：Mach 微内核 + BSD）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">是否开源</td><td class="px-4 py-2 border">闭源</td><td class="px-4 py-2 border">开源（GPL）</td><td class="px-4 py-2 border">闭源（Darwin 部分开源）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">Unix 血统</td><td class="px-4 py-2 border">无（WSL 兼容）</td><td class="px-4 py-2 border">类 Unix（独立实现）</td><td class="px-4 py-2 border">BSD 系，已认证 Unix</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">主要用途</td><td class="px-4 py-2 border">桌面 / 游戏 / 办公 / 政企</td><td class="px-4 py-2 border">服务器 / 云 / 嵌入式 / Android</td><td class="px-4 py-2 border">设计 / 开发 / 内容创作</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">包管理</td><td class="px-4 py-2 border font-mono text-xs">winget / msi</td><td class="px-4 py-2 border font-mono text-xs">apt / dnf / pacman</td><td class="px-4 py-2 border font-mono text-xs">Homebrew (brew)</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">命令行</td><td class="px-4 py-2 border font-mono text-xs">PowerShell / CMD</td><td class="px-4 py-2 border font-mono text-xs">bash / zsh</td><td class="px-4 py-2 border font-mono text-xs">zsh / bash</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">最大优点</td><td class="px-4 py-2 border">生态（游戏/办公）与硬件兼容</td><td class="px-4 py-2 border">开源稳定免费 + 服务器统治</td><td class="px-4 py-2 border">Unix 血统 + 精致体验</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">最大缺点</td><td class="px-4 py-2 border">闭源收费、无 POSIX 传统</td><td class="px-4 py-2 border">桌面生态弱、学习曲线陡</td><td class="px-4 py-2 border">贵、硬件绑定、无游戏</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-xs text-slate-400 mb-4">表中 Windows 的「命令行」是自家 PowerShell（对象管道），Linux/macOS 是 POSIX shell——这也解释了为什么运维工程师的肌肉记忆全在后者。</p>
      </section>

      <!-- 8. 选择建议 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">8</span>选择建议：什么场景用什么系统</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>桌面 / 游戏 / 办公</strong> → <strong>Windows</strong>：生态无敌，硬件即插即用。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>开发 / 服务器 / 容器</strong> → <strong>Linux</strong>：生产环境就是你开发环境，0 环境差异。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>开发 + 设计双栖</strong> → <strong>macOS</strong>：Unix 命令 + Figma/设计工具 + 优雅交互一手抓。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>新手第一台服务器</strong> → <strong>Ubuntu</strong>：文档最全、社区最大、云厂商默认，遇到问题搜得到。</span></li>
        </ul>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比（选车）：</strong>Windows ≈ <strong>大众家用车</strong>——保有量大、维修方便、谁都会开；Linux ≈ <strong>工程车/服务器机房设备</strong>——普通人用不上，但干重活（并发、容器、无人值守）全靠它；macOS ≈ <strong>豪华跑车</strong>——精致、贵、只给懂它的人，性能未必最强但体验拉满。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>别把「开发机」和「生产机」割裂。做 Go 后端：<strong>Windows/macOS 开发，Linux 部署</strong>——开发机用你顺手的环境，交付一律走 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">GOOS=linux go build</code> + Docker，把环境差异压缩到零。</p>
        </aside>
      </section>

      <!-- 9. 代码实战 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">9</span>代码实战：跨平台编译与系统差异</h2>
        <h3 class="text-base font-semibold text-slate-700 mb-2">示例 1 · Go 交叉编译：一次编写，跨平台交付</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">Go 天然跨平台——<strong>GOOS（目标操作系统）+ GOARCH（目标 CPU 架构）</strong>是编译期常量。你在 Windows 上就能产出 Linux 服务器二进制：</p>
        <div class="mb-4"><Code language="bash" :code="crossCompileCode" title="交叉编译 · build.sh" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">示例 2 · 查看 Linux 发行版与内核</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">登录任意一台 Linux 服务器，三行命令看清「这车是什么牌子的」（发行版）+「引擎是哪颗」（内核）：</p>
        <div class="mb-4"><Code language="bash" :code="osReleaseCode" title="查看发行版 · check-distro.sh" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">示例 3 · Go 在 Windows / Linux 上的行为差异</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">同一份 Go 代码，跨平台时下面这些「隐性差异」最容易埋坑：</p>
        <div class="mb-4"><Code language="go" :code="platformDiffCode" title="platform-diff.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提一嘴 GOPATH：</strong>老版本 Go 强制代码放 <code class="bg-blue-100 px-1 rounded text-xs font-mono">GOPATH/src</code> 下且路径全小写，跨平台很容易踩大小写坑。Go Modules（go 1.11+）之后已彻底摆脱，直接用 <code class="bg-blue-100 px-1 rounded text-xs font-mono">go mod init</code> 就好——这也是 Go 跨平台体验大幅提升的关键一步。</p>
        </aside>
      </section>

      <!-- 10. 与 Go 底层实现的关系 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">10</span>与 Go 底层实现的关系：为什么 Go 服务天然属于 Linux</h2>
        <h3 class="text-base font-semibold text-slate-700 mb-2">① GOOS / GOARCH：交叉编译的根基</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">Go 编译器的每个目标平台都有一个独立的<strong>后端</strong>（GOOS+GOARCH 组合，如 linux/amd64、darwin/arm64）。<code class="bg-slate-100 px-1 rounded text-xs font-mono">go build</code> 时按目标平台编译 syscall 层和 runtime，所以同一份源码能产出任意平台二进制。这也是上一节 <code class="bg-slate-100 px-1 rounded text-xs font-mono">GOOS=linux go build</code> 能工作的原理。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">② Linux 网络栈 epoll → Go netpoller</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">Go 的运行时 netpoller 在 Linux 上基于 <strong>epoll</strong>：一个线程可以同时监视几万条连接，谁有数据就唤醒谁——这正是 Go 能轻松支撑十万级并发连接的内核底座。Windows 上对应的是 IOCP，macOS 上是 kqueue，Go runtime 都适配了，但<strong>生产环境跑 Linux = 走最成熟的 epoll 路径</strong>。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">③ cgroup / namespace → Docker 容器</h3>
        <p class="text-slate-600 mb-3 text-sm leading-relaxed">容器不是「虚拟机」，而是<strong>Linux 内核特性</strong>：<strong>namespace</strong> 隔离视图（PID/网络/文件系统）、<strong>cgroup</strong> 限制资源（CPU/内存/IO）。Docker 镜像 = 把一个 Linux 用户态打包带走。所以你部署 Go 服务时，「打镜像 → 推到仓库 → K8s 拉取调度」整个链路，全都在 Linux 上运转。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">④ 部署 Go 服务：标准动作</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600">开发机：<code class="bg-slate-100 px-1 rounded text-xs font-mono">CGO_ENABLED=0 GOOS=linux go build</code> 产出<strong>静态二进制</strong>（零外部依赖）。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600">把二进制塞进一个极小的 Linux 镜像（<code class="bg-slate-100 px-1 rounded text-xs font-mono">FROM scratch</code> 或 <code class="bg-slate-100 px-1 rounded text-xs font-mono">alpine</code>）。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600">推到容器仓库，K8s / Docker Compose 拉取并运行在任意 Linux 节点上。</div></li>
        </ol>
        <p class="text-sm text-slate-500 leading-relaxed mb-4">跳转阅读：<Link :route="'cs-5-a-4-os-arch'" :text="'操作系统体系结构：宏内核/微内核/混合内核'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />（看懂 NT 混合内核与 XNU 的结构后，本页的「内核类型」一栏就不只是背名词了）</p>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>把「选 Linux 服务器」类比成「选 <strong>Node 的 pm2 + 单进程模型</strong>」——不是别的不能跑，而是这条路上生态最顺、坑最少、社区答案最全。Go 的选择同样如此：<code class="bg-teal-100 px-1 rounded text-xs font-mono">net/http</code> + goroutine + epoll 的组合在 Linux 上是经过千锤百炼的黄金路线，别在生产上自找麻烦。</p>
        </aside>
      </section>

      <!-- 11. 常见误区 -->
      <section id="sec-11" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">11</span>⚠️ 常见误区</h2>
        <div class="space-y-3 mb-4">
          <div class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>误区 1 · 把「Linux 内核」和「发行版」混为一谈。</strong>Ubuntu 和 CentOS 用的<strong>是同一颗 Linux 内核</strong>；区别在包管理器、用户态工具、默认配置。所以「Ubuntu 是内核」「卸载内核后换个发行版」这种说法都是错的。</p></div>
          <div class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>误区 2 · 以为 Windows 是宏内核、Linux 是微内核——反了。</strong>Windows NT 是<strong>混合内核</strong>（借鉴微内核的分层，实际大量跑在内核态）；Linux 才是<strong>宏内核</strong>（整体在内核态，靠可加载模块扩展）。把两者记反是最典型的翻车。</p></div>
          <div class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>误区 3 · 以为 macOS 是 Linux。</strong>macOS 是 <strong>BSD 系 Unix</strong>（有认证），Linux 是独立实现（类 Unix）——两条血缘。只是都守 POSIX，命令长得像而已。</p></div>
          <div class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>误区 4 · 以为 Android 是标准 Linux。</strong>Android 底层<strong>是</strong> Linux 内核，但它没有 glibc、App 不跑传统 ELF/shell、IPC 走 Binder——它更像「借了 Linux 内核的定制系统」，不是你能 <code class="bg-amber-100 px-1 rounded text-xs font-mono">ssh</code> 进去的发行版。</p></div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">易混淆三连</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">真相</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">Ubuntu 与 Linux 内核</td><td class="px-4 py-2 border">Ubuntu 是发行版，内核是引擎</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">Windows 内核 vs Linux 内核</td><td class="px-4 py-2 border">NT 混合内核 / Linux 宏内核（别反）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">macOS vs Linux</td><td class="px-4 py-2 border">BSD 系 Unix vs 独立类 Unix</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 12. 小结 -->
      <section id="sec-12" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">✅</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>一条血缘</strong>：1969 AT&amp;T Unix → BSD / System V 两大分叉；BSD 演化出 macOS/iOS，GNU + Linux 内核演化出 Linux 发行版与 Android；只有 Windows 不姓 Unix。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>三类内核</strong>：Windows NT = 混合内核；Linux = 宏内核 + 模块；macOS XNU = Mach 微内核 + BSD 的混合。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>一个标准</strong>：POSIX 是类 Unix 系统的共同契约——脚本能在 macOS/Linux 间迁移、Go 标准库能在 Windows/Linux 间统一，都靠它。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>一个结论</strong>：Go 后端生产环境选 Linux，不是情怀是工程必然——epoll 高并发、cgroup 容器、稳定免费、<code class="bg-slate-100 px-1 rounded text-xs font-mono">GOOS=linux go build</code> 一次交付。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>三条铁律</strong>：别把内核和发行版搞混、别把 Windows 记成宏内核、别把 macOS 当成 Linux。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">相关阅读：<Link :route="'cs-5-a-4-os-arch'" :text="'操作系统体系结构：宏内核/微内核/混合内核'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'cs-5-b-1-pcb'" :text="'进程控制块 PCB 与上下文切换'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-5-a-4-os-arch'" :text="'← 上一节：操作系统体系结构：宏内核/微内核/混合内核'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-5-b-1-pcb'" :text="'下一节：进程控制块PCB与上下文切换 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "Unix 的遗产" },
  { id: "sec-2", name: "Windows：NT 混合内核" },
  { id: "sec-3", name: "Linux：宏内核霸主" },
  { id: "sec-4", name: "macOS：BSD 血统" },
  { id: "sec-5", name: "移动端：Android 与 iOS" },
  { id: "sec-6", name: "服务器选型：为什么是 Linux" },
  { id: "sec-7", name: "三大 OS 对比表" },
  { id: "sec-8", name: "选择建议" },
  { id: "sec-9", name: "代码实战" },
  { id: "sec-10", name: "与 Go 底层实现的关系" },
  { id: "sec-11", name: "⚠️ 常见误区" },
  { id: "sec-12", name: "小结" },
]

// ===== 示例 1：Go 交叉编译（bash）=====
const crossCompileCode = `# ① 交叉编译：在 Windows 开发机上编译出 Linux 服务器可执行文件
# 关键：指定 GOOS（目标 OS）+ GOARCH（目标 CPU 架构）
GOOS=linux   GOARCH=amd64 go build -o app-server main.go

# ② 交叉编译成 Windows 可执行文件（在 Linux/macOS 上也能做）
GOOS=windows GOARCH=amd64 go build -o app.exe main.go

# ③ 交叉编译成 macOS（Apple Silicon / Intel 两种架构）
GOOS=darwin  GOARCH=arm64 go build -o app-mac-arm main.go
GOOS=darwin  GOARCH=amd64 go build -o app-mac-intel main.go

# ④ 查当前默认目标平台（Go 工具链编译期的默认值）
go env GOOS GOARCH        # 输出例如：windows amd64

# ⑤ 静态编译：不开 cgo，二进制零外部依赖，拷到服务器直接跑
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o app-server main.go`

// ===== 示例 2：查看 Linux 发行版（bash）=====
const osReleaseCode = `# ① 几乎每个发行版都提供 /etc/os-release —— 系统身份证明
cat /etc/os-release
# NAME="Ubuntu"
# VERSION="24.04 LTS (Noble Numbat)"
# ID=ubuntu
# ID_LIKE=debian          ← Ubuntu 血统来自 Debian（还记得谱系图吗？）

# ② 直接问内核：不关心发行版，只看内核版本和机器信息
uname -a
# Linux dev-server 6.8.0-31-generic x86_64 GNU/Linux
#        ^          ^                          ^
#   主机名      内核版本                    架构/用户态

# ③ 发行版专属文件（判断具体"味道"）
cat /etc/debian_version    # Debian/Ubuntu 系
cat /etc/redhat-release    # RHEL/CentOS/Fedora 系
cat /etc/arch-release      # Arch 系`

// ===== 示例 3：Go 平台差异（go）=====
const platformDiffCode = `package main

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"
)

func main() {
	// ① 路径分隔符：Windows 是 \\，Linux/macOS 是 /
	// 永远用 filepath.Join 拼路径，它会按当前系统选择正确分隔符
	p := filepath.Join("data", "user", "profile.json")
	fmt.Println("filepath.Join =", p)
	// Windows: data\\user\\profile.json
	// Linux:   data/user/profile.json

	fmt.Println("os.PathSeparator =", string(os.PathSeparator)) // \\ 或 /

	// ② 换行：Windows 文本文件惯用 \\r\\n，Unix 惯用 \\n
	// Go 源码里写 \\n 就是 \\n；要写给 Windows 记事本看才需显式 \\r\\n

	// ③ 文件系统大小写敏感：Windows 不敏感（a.txt == A.TXT），Linux 敏感
	// 在 Linux 上踩过的坑：git 配置 core.ignorecase 不一致导致改文件名失效

	// ④ 环境变量名：Windows 不区分大小写，Linux 区分
	fmt.Println("PATH 存在?", os.Getenv("PATH") != "")

	// ⑤ 运行时平台常量（交叉编译时是编译期写死进二进制的）
	fmt.Println("runtime.GOOS   =", runtime.GOOS)   // windows / linux / darwin
	fmt.Println("runtime.GOARCH =", runtime.GOARCH) // amd64 / arm64
}`
</script>
