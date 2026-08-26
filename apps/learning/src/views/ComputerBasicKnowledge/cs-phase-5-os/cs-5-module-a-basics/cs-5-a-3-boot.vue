<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">引导过程：BIOS → Bootloader → 内核</h1><p class="text-sm text-slate-500 mt-1">按下电源到操作系统跑起来的完整链路——每一层都在把控制权交给下一层</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">操作系统 5-a-3</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：开机就是一场「接力棒传递」</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">关机时 CPU 里没有任何程序在跑。按下电源后，从<strong>固件</strong>到<strong>Bootloader</strong>再到<strong>内核</strong>再到<strong>PID 1</strong>，每一层只做一件事：把自己负责的部分准备好，然后把控制权交给下一层。全程不需要你干预，但它决定了"系统能不能起来、快不快、稳不稳"。</p>

        <!-- 结构图：上电 → BIOS/UEFI → GRUB → 内核 → init → 用户程序 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 300" class="w-full h-auto">
            <defs><marker id="bo-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker><marker id="bo-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#06b6d4"/></marker></defs>
            <text x="20" y="28" font-size="13" font-weight="bold" fill="#0f172a" font-family="monospace">启动流水线：控制权逐层交接</text>

            <!-- 第 1 段：上电 -->
            <rect x="20" y="50" width="104" height="56" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1.5"/>
            <text x="72" y="78" text-anchor="middle" font-size="12" font-weight="bold" fill="#334155" font-family="monospace">上电</text>
            <text x="72" y="93" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">CPU 复位，PC 被写死</text>
            <!-- 第 2 段：BIOS/UEFI -->
            <rect x="144" y="50" width="104" height="56" rx="8" fill="#f59e0b"/>
            <text x="196" y="78" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">BIOS / UEFI</text>
            <text x="196" y="93" text-anchor="middle" font-size="9" fill="#fffbeb" font-family="monospace">POST 自检 + 找启动介质</text>
            <!-- 第 3 段：Bootloader -->
            <rect x="268" y="50" width="104" height="56" rx="8" fill="#fbbf24"/>
            <text x="320" y="78" text-anchor="middle" font-size="12" font-weight="bold" fill="#78350f" font-family="monospace">Bootloader</text>
            <text x="320" y="93" text-anchor="middle" font-size="9" fill="#92400e" font-family="monospace">GRUB：选系统、载内核</text>
            <!-- 第 4 段：内核 -->
            <rect x="392" y="50" width="104" height="56" rx="8" fill="#06b6d4"/>
            <text x="444" y="78" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">内核装入内存</text>
            <text x="444" y="93" text-anchor="middle" font-size="9" fill="#cffafe" font-family="monospace">解压 → start_kernel</text>
            <!-- 第 5 段：init/systemd -->
            <rect x="516" y="50" width="104" height="56" rx="8" fill="#22d3ee"/>
            <text x="568" y="78" text-anchor="middle" font-size="12" font-weight="bold" fill="#155e75" font-family="monospace">init / systemd</text>
            <text x="568" y="93" text-anchor="middle" font-size="9" fill="#164e63" font-family="monospace">PID 1 拉起系统服务</text>
            <!-- 第 6 段：用户程序 -->
            <rect x="640" y="50" width="104" height="56" rx="8" fill="#cffafe" stroke="#06b6d4" stroke-width="1.5"/>
            <text x="692" y="78" text-anchor="middle" font-size="12" font-weight="bold" fill="#0e7490" font-family="monospace">用户程序</text>
            <text x="692" y="93" text-anchor="middle" font-size="9" fill="#0891b2" font-family="monospace">登录 → shell / 桌面</text>

            <!-- 主流程箭头 -->
            <line x1="126" y1="78" x2="142" y2="78" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#bo-a)"/>
            <line x1="250" y1="78" x2="266" y2="78" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#bo-a)"/>
            <line x1="374" y1="78" x2="390" y2="78" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#bo-a)"/>
            <line x1="498" y1="78" x2="514" y2="78" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#bo-a)"/>
            <line x1="622" y1="78" x2="638" y2="78" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#bo-a)"/>

            <!-- 放大内核内部时序 -->
            <text x="20" y="150" font-size="12" font-weight="bold" fill="#0f172a" font-family="monospace">🔍 放大第 4 步：内核怎么把自己跑起来</text>
            <rect x="20" y="160" width="720" height="112" rx="10" fill="#f0f9ff" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="6 4"/>
            <rect x="30" y="192" width="100" height="48" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
            <text x="80" y="214" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569" font-family="monospace">setup</text>
            <text x="80" y="229" text-anchor="middle" font-size="8" fill="#64748b" font-family="monospace">实模式</text>
            <rect x="154" y="192" width="100" height="48" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
            <text x="204" y="214" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569" font-family="monospace">切保护模式</text>
            <text x="204" y="229" text-anchor="middle" font-size="8" fill="#64748b" font-family="monospace">可访问大内存</text>
            <rect x="278" y="192" width="100" height="48" rx="8" fill="#f59e0b"/>
            <text x="328" y="214" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff" font-family="monospace">解压内核</text>
            <text x="328" y="229" text-anchor="middle" font-size="8" fill="#fffbeb" font-family="monospace">vmlinuz 自解压</text>
            <rect x="402" y="192" width="100" height="48" rx="8" fill="#06b6d4"/>
            <text x="452" y="214" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff" font-family="monospace">start_kernel()</text>
            <text x="452" y="229" text-anchor="middle" font-size="8" fill="#cffafe" font-family="monospace">内核的 main()</text>
            <rect x="526" y="192" width="100" height="48" rx="8" fill="#06b6d4"/>
            <text x="576" y="214" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff" font-family="monospace">子系统初始化</text>
            <text x="576" y="229" text-anchor="middle" font-size="8" fill="#cffafe" font-family="monospace">内存·调度·FS·驱动</text>
            <rect x="650" y="192" width="100" height="48" rx="8" fill="#06b6d4"/>
            <text x="700" y="214" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff" font-family="monospace">执行 init</text>
            <text x="700" y="229" text-anchor="middle" font-size="8" fill="#cffafe" font-family="monospace">交出控制权给 PID 1</text>
            <line x1="132" y1="216" x2="152" y2="216" stroke="#06b6d4" stroke-width="1.5" marker-end="url(#bo-b)"/>
            <line x1="256" y1="216" x2="276" y2="216" stroke="#06b6d4" stroke-width="1.5" marker-end="url(#bo-b)"/>
            <line x1="380" y1="216" x2="400" y2="216" stroke="#06b6d4" stroke-width="1.5" marker-end="url(#bo-b)"/>
            <line x1="504" y1="216" x2="524" y2="216" stroke="#06b6d4" stroke-width="1.5" marker-end="url(#bo-b)"/>
            <line x1="628" y1="216" x2="648" y2="216" stroke="#06b6d4" stroke-width="1.5" marker-end="url(#bo-b)"/>
            <text x="380" y="260" text-anchor="middle" font-size="10" fill="#0e7490" font-family="monospace">内存管理 → 调度器 → 文件系统 → 驱动 全部就绪后，内核常驻后台，只响应系统调用</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">硬件只做一件固定的事（从 ROM 取第一条指令），之后每一层把"接力棒"交给下一层，最终交到 PID 1 和你的程序手上</figcaption>
        </figure>
      </section>

      <!-- 1. 上电与 POST -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>上电与 POST：CPU 从哪里开始执行</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">关机状态下，CPU、内存、外设全是"死的"——没有程序在运行，没有进程树，连"操作系统存在"这件事都还没有发生。按下电源的那一瞬间，一切从硬件开始。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>上电复位</strong>：电源稳定后，CPU 收到 <code class="bg-slate-100 px-1 rounded text-xs font-mono">RESET</code> 信号，程序计数器 <code class="bg-slate-100 px-1 rounded text-xs font-mono">PC</code> 被<strong>硬件写死</strong>到一个固定地址（x86 是物理地址末尾 <code class="bg-slate-100 px-1 rounded text-xs font-mono">0xFFFFFFF0</code>，那里放着固件的第一条跳转指令）。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>第一条指令来自主板</strong>：CPU 直接从 ROM/闪存里取指执行——此刻还没有任何操作系统在运行，执行的是主板上<strong>固件</strong>（BIOS 或 UEFI）的代码。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>POST 自检</strong>：固件检测 CPU、内存、显卡、键盘等关键硬件；坏了就用蜂鸣声/诊断灯报错（"开机响一声"就是 POST 通过的标志）。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>枚举启动设备</strong>：按 BIOS 设置里的启动顺序（硬盘 → U 盘 → 光驱 → 网络 PXE），挨个去设备上找"可引导的痕迹"。</div></li>
        </ol>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">上电最初几百毫秒，代码来自主板固件，不是你的系统盘——硬件才是"主人"</p>
          <p class="text-xs text-amber-600 text-center">这也是为什么 BIOS 坏了电脑完全没反应、但硬盘坏了 BIOS 还能亮 logo</p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>浏览器冷启动就是一场迷你 OS 启动——<strong>启动浏览器进程 → 初始化渲染器/网络模块 → 加载首屏 HTML → 执行 JS</strong>。你写的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">createRoot(...).render(...)</code> 只在"系统就绪"之后才被调用，正如内核就绪后才轮到 init。你永远不用管浏览器进程是怎么拉起来的，它替你做了"POST + Bootloader"。</p>
        </aside>
      </section>

      <!-- 2. BIOS vs UEFI -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>BIOS 与 UEFI：两代固件怎么找 Bootloader</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">传统 BIOS 诞生于 1981 年 IBM PC 时代，UEFI 是 2005 年前后 Intel 主导的替代方案。它们<strong>不是操作系统</strong>，只是主板上负责"自检 + 找到引导程序"的固件。核心区别在于：用哪种分区表、跑在什么 CPU 模式、去哪找引导程序。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">传统 BIOS（Legacy）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">UEFI</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">分区表</td><td class="px-4 py-2 border">MBR（≤2TB、最多 4 个主分区）</td><td class="px-4 py-2 border">GPT（大容量、分区数几乎不限、自带校验）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">CPU 模式</td><td class="px-4 py-2 border font-mono text-xs">16 位实模式</td><td class="px-4 py-2 border font-mono text-xs">32/64 位保护模式，能直接访问大内存</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">引导位置</td><td class="px-4 py-2 border">读 MBR 第一个扇区（512 字节）的引导代码</td><td class="px-4 py-2 border">从 ESP（EFI 系统分区，FAT32）加载 <code class="bg-slate-100 px-1 rounded text-xs font-mono">.efi</code> 文件</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">界面</td><td class="px-4 py-2 border">文本菜单、按键设定</td><td class="px-4 py-2 border">图形界面、鼠标操作</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">安全</td><td class="px-4 py-2 border">几乎无校验，可被 bootkit 改写</td><td class="px-4 py-2 border">Secure Boot：只加载签名/白名单内的引导程序</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">驱动/扩展</td><td class="px-4 py-2 border">靠 BIOS 中断，慢、单一</td><td class="px-4 py-2 border">自带驱动框架，支持网络启动、更快</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>UEFI 时代的"开机菜单"（F2/Del 进设置）仍常被叫"BIOS 设置"，但底层是 UEFI。另外 <strong>Secure Boot</strong> 是 UEFI 的"信任链"：它校验引导程序签名，因此装 Linux 时遇到"黑屏/拒引导"，多半要关闭 Secure Boot 或给它签过名的 shim。</p>
        </aside>
      </section>

      <!-- 3. Bootloader GRUB -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>Bootloader（GRUB）：操作系统上电后的第一段自由代码</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">BIOS/UEFI 只负责把"接力棒"交到第一个可引导程序手上。这个程序就是 <strong>Bootloader</strong>——Linux 世界最常见的是 GRUB（Grand Unified Bootloader）。它不是内核、也不是系统，而是"把内核搬进内存、摆好姿势、然后跳进去"的程序。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">GRUB 的四项职责</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>多系统选择</strong>：开机看到的那个菜单（Ubuntu / Windows / …）就是 GRUB 在列可选的内核与系统，选择结果决定加载哪套。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>加载内核镜像到内存</strong>：从 <code class="bg-slate-100 px-1 rounded text-xs font-mono">/boot</code> 读 <code class="bg-slate-100 px-1 rounded text-xs font-mono">vmlinuz-xxx</code> 和 <code class="bg-slate-100 px-1 rounded text-xs font-mono">initrd</code>，放到内存里预先约定好的位置。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>传内核参数</strong>：<code class="bg-slate-100 px-1 rounded text-xs font-mono">root=</code> 告诉内核把根文件系统挂到哪个分区、<code class="bg-slate-100 px-1 rounded text-xs font-mono">ro</code> 只读挂载、<code class="bg-slate-100 px-1 rounded text-xs font-mono">quiet</code> 安静模式。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>跳转执行</strong>：设置好寄存器、进入保护模式/长模式，把控制权交给内核入口——GRUB 至此"功成身退"。</div></li>
        </ol>
        <div class="mb-4"><Code language="bash" :code="grubCode" title="grub.cfg 片段" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong><code class="bg-blue-100 px-1 rounded text-xs font-mono">initrd</code>（临时根文件系统）是 GRUB 时代的关键一环：它把"加载磁盘驱动"的能力提前交给内核，让内核能在正式根分区里继续引导——相当于"先借一个小房子安顿下来，再搬进正式办公室"。</p>
        </aside>
      </section>

      <!-- 4. 内核启动 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>内核启动：从保护模式到 start_kernel 的内核态自举</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">内核镜像（vmlinuz）被 GRUB 装入内存后，开始一段艰难的自举（bootstrap）：从最原始的<strong>实模式</strong>环境起步，逐级建立起完整的<strong>内核态</strong>。这一步是"计算机自己把自己提起来"的过程。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>setup（实模式）</strong>：内核头部前 512 字节的汇编代码，收集硬件信息、设置堆栈，然后切换到<strong>保护模式/长模式</strong>——从此可以访问大内存、用现代寻址。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>解压内核</strong>：vmlinuz 的 "z" 就是压缩的意思——setup 把真正的内核解压到内存高位，再跳进去。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>start_kernel()</strong>：内核的第一个 C 函数（在 <code class="bg-slate-100 px-1 rounded text-xs font-mono">init/main.c</code>），相当于整个内核的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">main()</code>，之后全部是 C 代码。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>子系统初始化（顺序严格）</strong>：内存管理（页表 → buddy → slab）→ 调度器 → 中断 → 时间 → 文件系统 VFS → 设备驱动 → 网络协议栈。为什么先内存后调度？因为调度器要调度任务，就得先有内存管理给它管内存。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>内核态自举完成</strong>：最后调用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">run_init_process()</code> 创建第一个用户态进程 init（PID 1），内核则<strong>永远留在内核态</strong>，此后只响应系统调用/中断。</div></li>
        </ol>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>内核"先初始化内存，再初始化调度器"的顺序，在 Go 里一模一样——Go runtime 启动时会<strong>先建立堆与内存分配器，再初始化 M/P/G 与调度循环</strong>，然后才开始调度你的 goroutine。没有堆，调度器没东西可分；没有调度器，goroutine 没地方跑。顺序错了系统就起不来。</p>
        </aside>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>start_kernel 的子系统初始化就像<strong>开新公司当天</strong>——先租好场地（内存管理），再招齐财务/HR/IT 管理层（调度器/文件系统/驱动），制度和流程跑通后（自举完成），才开始招第一批普通员工干活（用户程序）。</p>
        </aside>
      </section>

      <!-- 5. init / systemd -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>init 进程与 systemd：PID 1 和它的进程树</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">内核把控制权交给 <strong>PID 1</strong> 后，整个系统里所有其他进程都挂在它下面——PID 1 是所有进程的"祖先"。它的使命是把"内核就绪"升级为"系统就绪"：拉起系统服务、提供登录入口。</p>
        <div class="bg-slate-50 rounded-xl p-4 mb-4 font-mono text-xs text-slate-600 leading-relaxed overflow-x-auto">
          <div class="text-slate-800 font-bold mb-1">Linux 进程树（起点 = PID 1）：</div>
          PID 1  systemd ─┬─ systemd-journald（日志）
          │              ├─ getty @tty1 ── login ── bash ── <strong>你的程序</strong>
          │              ├─ sshd ── sshd ── bash
          │              └─ nginx（HTTP 服务）
          └─ 一切进程往上追溯，祖先都是 PID 1
        </div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">sysvinit 与 systemd 对比</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">sysvinit（老式）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">systemd（现代）</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">启动方式</td><td class="px-4 py-2 border">串行，一个脚本跑完再跑下一个</td><td class="px-4 py-2 border">并行，按依赖关系同时起</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">配置</td><td class="px-4 py-2 border font-mono text-xs">/etc/rc?.d/ 启动脚本</td><td class="px-4 py-2 border font-mono text-xs">.service 单元文件（systemd.unit）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">特性</td><td class="px-4 py-2 border">简单，但启动慢、难管依赖</td><td class="px-4 py-2 border">并行 + 单元管理 + cgroup 资源控制 + journald 日志 + 定时器</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">现状</td><td class="px-4 py-2 border">Debian 8 之前为主流</td><td class="px-4 py-2 border">现代主流发行版默认</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>PID 1 <strong>不能被普通 kill 掉</strong>。它死了，整个系统就 panic/重启——因为它负责"收养孤儿进程、处理信号"，是进程树的根。这也是为什么"在容器里跑 shell 做 PID 1"是个著名陷阱：shell 不会正确转发信号，所以现代容器要加 <code class="bg-amber-100 px-1 rounded text-xs font-mono">tini</code> 这种真正的 init 来做 PID 1。</p>
        </aside>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>开新公司三件套——<strong>装修好场地通电 = BIOS</strong>；<strong>前台接待先到位 = Bootloader</strong>；<strong>招齐财务/HR/IT 管理层 = 内核初始化</strong>；<strong>排班制度与日常运营流程 = init/systemd</strong>；<strong>员工开始上班 = 用户程序</strong>。没有排班制度，员工再多也各干各的；排班制度跑起来了，全公司才能有序运转。</p>
        </aside>
      </section>

      <!-- 6. 实战：查看与分析启动 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>实战：在你自己机器上观察启动链路</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">这条链路的"痕迹"全被系统留了下来。在 Linux 终端敲下面几条命令，就能"回放"一次开机。</p>
        <div class="mb-4"><Code language="bash" :code="bootInfoCode" title="📟 查看启动信息" /></div>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-xs font-mono">uname -a</code>：内核版本、构建时间、硬件平台——"现在跑的是哪一版内核"。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-xs font-mono">dmesg</code>：内核环形缓冲区，开机早期内核打的日志都在这里（从 GRUB 跳进来那一刻起）。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-xs font-mono">systemd-analyze blame</code>：把启动各服务按耗时从大到小排序——排查"开机慢"的第一工具。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-xs font-mono">cat /proc/cmdline</code>：GRUB 传给内核的参数就长这样——对照上面 grub.cfg 里的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">linux</code> 行。</span></li>
        </ul>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">开机太慢的排查思路：dmesg 看内核段，systemd-analyze blame 看用户态段</p>
          <p class="text-xs text-amber-600 text-center">先看 <code class="bg-amber-100 px-1 rounded text-xs font-mono">systemd-analyze</code> 总耗时；再用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">blame</code> 找拖后腿的服务；驱动等待超时能在 <code class="bg-amber-100 px-1 rounded text-xs font-mono">dmesg</code> 里看到。把 HDD 换 SSD 通常是最立竿见影的一刀</p>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 实践建议：</strong>把 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">dmesg | grep -i "error\|timeout"</code> 设为肌肉记忆——装机/容器起不来的第一现场基本都在这里。</p>
        </aside>
      </section>

      <!-- 7. 与 Go 底层实现的关系 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">7</span>与 Go 底层实现的关系：Go 程序自己就是一场迷你 boot</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">你天天在写的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">go run</code>，底层就是一场"操作系统式启动"。你的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">main()</code> 远不是第一个执行的代码——它前面还有一大段<strong>Go runtime 的内核态初始化</strong>。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">OS 启动阶段</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">Go 程序启动阶段</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">BIOS/UEFI 找启动介质</td><td class="px-4 py-2 border">操作系统的 loader 加载 Go 可执行文件（ELF），映射内存、准备栈</td></tr>
              <tr><td class="px-4 py-2 border">Bootloader 装载内核</td><td class="px-4 py-2 border font-mono text-xs">rt0_linux_amd64.s（汇编入口）</td></tr>
              <tr><td class="px-4 py-2 border">start_kernel() 初始化子系统</td><td class="px-4 py-2 border">Go runtime 初始化：<strong>G0/M0、堆分配器、GC、netpoller、调度器</strong></td></tr>
              <tr><td class="px-4 py-2 border">init/systemd 拉起服务</td><td class="px-4 py-2 border">包级变量 + 各包 <code class="bg-slate-100 px-1 rounded text-xs font-mono">init()</code> 函数</td></tr>
              <tr><td class="px-4 py-2 border">用户程序运行</td><td class="px-4 py-2 border"><code class="bg-slate-100 px-1 rounded text-xs font-mono">main()</code>——你的业务代码</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="goStartupCode" title="go-startup-order.go" /></div>
        <div class="mb-4"><Code language="go" :code="pid1Code" title="pid-and-parent.go" /></div>
        <div class="mb-4"><Code language="go" :code="miniBootCode" title="mini-boot.go" /></div>
        <p class="text-sm text-slate-500 leading-relaxed mb-4">关于"Go runtime 到底初始化了什么"以及内核态/用户态的边界，可回看：<Link :route="'cs-5-a-1-kernel'" :text="'操作系统核心概念：内核'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>容器镜像的 <code class="bg-teal-100 px-1 rounded text-xs font-mono">ENTRYPOINT</code>/<code class="bg-teal-100 px-1 rounded text-xs font-mono">CMD</code> 就是"应用版 boot"——镜像启动时，<strong>容器运行时先起 PID 1（= 你的入口程序）</strong>，它再拉起依赖的进程；K8s 里的 <code class="bg-teal-100 px-1 rounded text-xs font-mono">initContainers</code> ≈ 正式容器之前的"pre-boot 服务"（比如先等数据库就绪、拉配置），这跟"initrd 先安顿再搬进正式根分区"是同一个思想。</p>
        </aside>
      </section>

      <!-- 8. 常见误区 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">8</span>常见误区与坑</h2>
        <div class="space-y-3 mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：以为 BIOS 就是操作系统。</strong>BIOS/UEFI 只是主板固件——它在你硬盘里的系统启动前把接力棒递出去，之后就没它事了（除了部分固件服务仍会被调用）。你写的 Go 程序、用的 Go runtime，都和 BIOS 没关系，它只管"把控制权交出去"。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：把 GRUB 误当内核。</strong>GRUB 是 Bootloader（引导程序），内核是 <code class="bg-amber-100 px-1 rounded text-xs font-mono">vmlinuz</code>。GRUB 加载内核、传参、然后跳转——它自己不提供进程/内存/文件系统能力。GRUB 坏了的表现是"开机停在 GRUB 菜单/命令行"，而不是系统正常进桌面。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：分不清 MBR 和 GPT（引导扇区 vs 分区表）。</strong>MBR 是 BIOS 时代的<strong>引导扇区</strong>（磁盘第一个 512 字节，存引导代码）<strong>同时兼任分区表</strong>；GPT 是 UEFI 时代的<strong>分区表</strong>（在磁盘开头有 GUID 头 + 分区条目）。装双系统/大磁盘时：旧主板配 MBR、新主板配 GPT，混用常导致"找不到引导项"。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 4：以为开机速度只由内核决定。</strong>开机耗时被四块瓜分：BIOS/UEFI 自检（很多主板能设置快速启动跳过部分检测）→ Bootloader → 内核初始化 → init/systemd 拉起服务。你换内核版本提升的是第四块里的"内核段"，用户态服务（数据库、Docker、网络）往往才是大头——所以要用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">systemd-analyze blame</code> 量化，而不是凭感觉。</p>
          </aside>
        </div>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">✅</span>小结：启动全链路一图流</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>上电</strong>：CPU 复位到固定地址，第一条指令来自主板固件（BIOS/UEFI），与系统盘无关。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>固件</strong>：POST 自检硬件 + 按启动顺序找引导设备。BIOS（MBR/16 位/legacy）→ UEFI（GPT/64 位/图形/Secure Boot）。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>Bootloader（GRUB）</strong>：多系统选择、加载内核镜像与 initrd 到内存、传内核参数、跳转执行。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>内核自举</strong>：setup（实模式）→ 切保护模式 → 解压 vmlinuz → <code class="bg-slate-100 px-1 rounded text-xs font-mono">start_kernel()</code> → 内存/调度/FS/驱动按序初始化 → 内核常驻内核态。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>init/systemd</strong>：PID 1 是所有进程的祖先，串行脚本升级为并行单元管理；PID 1 挂了系统就重启。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>观察与排查</strong>：<code class="bg-slate-100 px-1 rounded text-xs font-mono">uname -a</code> 看内核、<code class="bg-slate-100 px-1 rounded text-xs font-mono">dmesg</code> 看早期日志、<code class="bg-slate-100 px-1 rounded text-xs font-mono">systemd-analyze blame</code> 排慢服务。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>连回 Go</strong>：Go 程序 = 迷你 boot——<code class="bg-slate-100 px-1 rounded text-xs font-mono">rt0</code>（Bootloader）→ runtime 初始化（≈ start_kernel）→ 包 <code class="bg-slate-100 px-1 rounded text-xs font-mono">init()</code>（≈ init/systemd）→ <code class="bg-slate-100 px-1 rounded text-xs font-mono">main()</code>（用户程序）。</span></li>
        </ul>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 一句话记住：</strong>开机 = 一次接力跑——固件把接力棒交给 Bootloader，Bootloader 交给内核，内核把自己"举"起来后交给 PID 1，PID 1 拉起整个用户世界，最后轮到你的程序。</p>
        </aside>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-5-a-2-interrupt'" :text="'← 上一节：中断与异常处理'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-5-a-4-os-arch'" :text="'下一节：操作系统体系结构：宏内核/微内核/混合内核 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-amber-600! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "上电与 POST" },
  { id: "sec-2", name: "BIOS vs UEFI" },
  { id: "sec-3", name: "Bootloader GRUB" },
  { id: "sec-4", name: "内核启动" },
  { id: "sec-5", name: "init / systemd" },
  { id: "sec-6", name: "实战：查看启动" },
  { id: "sec-7", name: "与 Go 的关系" },
  { id: "sec-8", name: "常见误区" },
  { id: "sec-9", name: "小结" },
]

// ===== 代码示例 =====
const grubCode = `# /etc/grub.d/40_custom 或 grub.cfg 中的菜单项（概念示意）
menuentry 'Linux' --class gnu {
    load_video
    insmod part_gpt              # 加载 GPT 分区表驱动
    insmod ext2                  # 加载文件系统驱动
    search --no-floppy --fs-uuid --set=root 1234abcd-5678
    linux /vmlinuz-6.8.0 root=/dev/sda2 ro quiet splash
    initrd /initrd.img-6.8.0
}

# linux 行 = 内核镜像路径 + 传给内核的参数
#   root=    → 根文件系统挂到哪个分区
#   ro       → 以只读方式挂载根分区（fsck 更安全）
#   quiet    → 安静模式，少打日志
#   splash   → 显示开机 logo
# initrd 行 = 临时根文件系统，用来加载启动所需的磁盘驱动`;

const bootInfoCode = `# ① 查看内核版本与构建信息
uname -a

# ② 内核启动早期日志（开机从 GRUB 跳进来那一刻起）
dmesg | head -30

# ③ 启动耗时总览（systemd 系统）
systemd-analyze

# ④ 按耗时给启动单元排序，找"拖后腿"的服务
systemd-analyze blame | head -10

# ⑤ 看 GRUB 传给内核的命令行参数（对照 grub.cfg 的 linux 行）
cat /proc/cmdline`;

const goStartupCode = `// 观察 Go 程序自己的启动顺序：你的 main 远不是第一个执行的代码
package main

import "fmt"

var globalA = func() string {
    fmt.Println("① 包级变量初始化（先于 main 执行）")
    return "ready"
}()

func init() {
    fmt.Println("② 包 init() 函数（runtime 就绪后、main 之前调用）")
}

func main() {
    fmt.Println("③ main() 用户代码入口")
    fmt.Println("真实顺序：rt0(汇编) → runtime 初始化 → 包变量 → init() → main()")
    _ = globalA
}`;

const pid1Code = `// 打印当前进程与父进程 PID，理解"PID 1 是根"
package main

import (
    "fmt"
    "os"
)

func main() {
    fmt.Println("当前进程 PID:", os.Getpid())
    fmt.Println("父进程 PID  :", os.Getppid())
    fmt.Println("说明: 普通程序不是 PID 1；Linux 的 PID 1 是 init/systemd，")
    fmt.Println("      它是一切进程的祖先。上面打印的 PPID 一路向上追溯，")
    fmt.Println("      终点就是 PID 1。")
}`;

const miniBootCode = `// 迷你 boot：用 Go 演示内核初始化顺序的概念模型
// 把 start_kernel() 的子系统初始化抽象成"先内存、再调度、后任务"
package main

import "fmt"

func initMemory() {
    fmt.Println("[1] 内存管理初始化：建页表，划定堆区间")
}
func initScheduler() {
    fmt.Println("[2] 调度器初始化：准备运行队列 runqueue")
}
func runTask(id int) {
    fmt.Println("    ▶ 跑用户任务", id, "≈ 用户进程")
}

func boot() {
    fmt.Println("=== 迷你 boot：模拟 start_kernel() 顺序 ===")
    initMemory()     // 必须先有内存
    initScheduler()  // 调度器依赖内存就绪
    for i := 1; i <= 3; i++ {
        runTask(i)   // 然后才跑任务
    }
}

func main() {
    boot()
}`;
</script>
