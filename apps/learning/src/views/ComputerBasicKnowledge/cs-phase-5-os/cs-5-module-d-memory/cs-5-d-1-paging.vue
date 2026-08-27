<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">分页机制：页表、多级页表、TLB</h1><p class="text-sm text-slate-500 mt-1">一张"地址翻译表"让进程以为独占整块内存——物理内存却在幕后被切成 4KB 的格子，零散分配、按需加载</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">操作系统 5-d-1</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：虚拟地址 → 页表 → 物理页帧</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">分页是操作系统内存管理的核心机制：把<strong>虚拟地址空间</strong>切成固定大小的「页」，把<strong>物理内存</strong>切成同样大小的「页帧」，再用一张<strong>页表</strong>记录「哪个虚拟页 → 哪个物理页帧」。CPU 发出的每一个地址都是虚拟地址，由硬件 MMU 查页表翻译成物理地址——<strong>你的程序从头到尾看到的都是"假地址"</strong>。</p>

        <!-- 结构图 ①：虚拟地址空间 vs 物理内存 分页映射全景 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 285" class="w-full h-auto">
            <defs><marker id="pg-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#06b6d4"/></marker></defs>
            <!-- 列标题 -->
            <text x="30" y="25" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">虚拟地址空间（页 page，4KB/页）</text>
            <text x="300" y="25" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">页表（数组，下标 = 页号）</text>
            <text x="590" y="25" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">物理内存（页帧 frame）</text>
            <!-- 虚拟页 -->
            <rect x="30" y="45" width="110" height="40" rx="8" fill="#06b6d4"/>
            <text x="85" y="63" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff" font-family="monospace">P0</text>
            <text x="85" y="79" text-anchor="middle" font-size="9" fill="#e0f2fe" font-family="monospace">已映射</text>
            <rect x="30" y="95" width="110" height="40" rx="8" fill="#cbd5e1"/>
            <text x="85" y="118" text-anchor="middle" font-size="13" font-weight="bold" fill="#475569" font-family="monospace">P1</text>
            <text x="85" y="130" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">换出（在磁盘）</text>
            <rect x="30" y="145" width="110" height="40" rx="8" fill="#06b6d4"/>
            <text x="85" y="163" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff" font-family="monospace">P2</text>
            <text x="85" y="179" text-anchor="middle" font-size="9" fill="#e0f2fe" font-family="monospace">已映射</text>
            <rect x="30" y="195" width="110" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5"/>
            <text x="85" y="218" text-anchor="middle" font-size="13" font-weight="bold" fill="#94a3b8" font-family="monospace">P3</text>
            <text x="85" y="230" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">未分配</text>
            <!-- 页表项 -->
            <rect x="300" y="45" width="160" height="40" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="380" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1" font-family="monospace">PT[0] → F2</text>
            <text x="380" y="78" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">present=1</text>
            <rect x="300" y="95" width="160" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="380" y="115" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e" font-family="monospace">PT[1] present=0</text>
            <text x="380" y="130" text-anchor="middle" font-size="9" fill="#a16207" font-family="monospace">缺页！</text>
            <rect x="300" y="145" width="160" height="40" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="380" y="162" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1" font-family="monospace">PT[2] → F0</text>
            <text x="380" y="178" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">present=1</text>
            <rect x="300" y="195" width="160" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5"/>
            <text x="380" y="218" text-anchor="middle" font-size="11" font-weight="bold" fill="#94a3b8" font-family="monospace">空表项</text>
            <text x="380" y="230" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">无映射</text>
            <!-- 物理页帧 -->
            <rect x="590" y="45" width="130" height="40" rx="8" fill="#06b6d4"/>
            <text x="655" y="63" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff" font-family="monospace">F0</text>
            <text x="655" y="79" text-anchor="middle" font-size="9" fill="#e0f2fe" font-family="monospace">被 P2 占</text>
            <rect x="590" y="95" width="130" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5"/>
            <text x="655" y="118" text-anchor="middle" font-size="12" font-weight="bold" fill="#64748b" font-family="monospace">F1</text>
            <text x="655" y="130" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">别的进程用</text>
            <rect x="590" y="145" width="130" height="40" rx="8" fill="#06b6d4"/>
            <text x="655" y="163" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff" font-family="monospace">F2</text>
            <text x="655" y="179" text-anchor="middle" font-size="9" fill="#e0f2fe" font-family="monospace">被 P0 占</text>
            <rect x="590" y="195" width="130" height="40" rx="8" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5"/>
            <text x="655" y="218" text-anchor="middle" font-size="12" font-weight="bold" fill="#64748b" font-family="monospace">F3</text>
            <text x="655" y="230" text-anchor="middle" font-size="9" fill="#94a3b8" font-family="monospace">空闲</text>
            <!-- 映射箭头（页 → 页表） -->
            <line x1="140" y1="65" x2="300" y2="65" stroke="#06b6d4" stroke-width="2" marker-end="url(#pg-a)"/>
            <line x1="140" y1="165" x2="300" y2="165" stroke="#06b6d4" stroke-width="2" marker-end="url(#pg-a)"/>
            <line x1="140" y1="115" x2="300" y2="115" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#pg-a)"/>
            <!-- 映射箭头（页表 → 页帧，斜线表示"不要求连续"） -->
            <line x1="460" y1="65" x2="590" y2="165" stroke="#06b6d4" stroke-width="2" marker-end="url(#pg-a)"/>
            <line x1="460" y1="165" x2="590" y2="65" stroke="#06b6d4" stroke-width="2" marker-end="url(#pg-a)"/>
            <!-- 图例 -->
            <rect x="30" y="252" width="16" height="16" rx="4" fill="#06b6d4"/>
            <text x="54" y="264" font-size="11" fill="#334155" font-family="monospace">已映射（present=1）</text>
            <rect x="220" y="252" width="16" height="16" rx="4" fill="#cbd5e1"/>
            <text x="244" y="264" font-size="11" fill="#334155" font-family="monospace">换出 / 未分配（present=0，访问会缺页）</text>
            <rect x="470" y="252" width="260" height="28" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
            <text x="480" y="270" font-size="10" fill="#0f172a" font-family="monospace">虚拟地址 = 页号(高20位)+偏移(低12位)；页表以页号做下标 → O(1) 查映射</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">每个进程一张页表：虚拟页 P0 → 物理页帧 F2、P2 → F0，斜线交叉表示「映射不要求物理连续」；P1 被换出、P3 未分配，它们的页表项 present=0，一访问就触发缺页</figcaption>
        </figure>

        <!-- 操作图 ②：地址翻译流水线 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <figure class="bg-slate-50 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-slate-700 mb-3">操作示意 · 一次访存的地址翻译流水线</h3>
            <svg viewBox="0 0 760 150" class="w-full h-auto">
              <defs><marker id="pg-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
              <rect x="20" y="40" width="210" height="66" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
              <text x="125" y="60" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1" font-family="monospace">虚拟地址 0x0804_1234</text>
              <text x="125" y="78" text-anchor="middle" font-size="10" fill="#0f172a" font-family="monospace">VPN=0x0804 | offset=0x1234</text>
              <text x="125" y="94" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">页号 20 位 + 偏移 12 位</text>
              <line x1="230" y1="73" x2="268" y2="73" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#pg-b)"/>
              <rect x="270" y="40" width="180" height="66" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
              <text x="360" y="60" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e" font-family="monospace">MMU 查页表</text>
              <text x="360" y="78" text-anchor="middle" font-size="9" fill="#a16207" font-family="monospace">TLB 命中 → 直接出</text>
              <text x="360" y="92" text-anchor="middle" font-size="9" fill="#a16207" font-family="monospace">未命中 → 查内存页表</text>
              <line x1="450" y1="73" x2="488" y2="73" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#pg-b)"/>
              <rect x="490" y="40" width="240" height="66" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
              <text x="610" y="60" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1" font-family="monospace">物理地址 0x00F2_1234</text>
              <text x="610" y="78" text-anchor="middle" font-size="10" fill="#0f172a" font-family="monospace">PFN=0x00F2 | offset=0x1234</text>
              <text x="610" y="94" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">页帧号 20 位 + 偏移（不变）</text>
              <text x="20" y="130" font-size="11" fill="#b45309" font-family="monospace">⚠️ 翻译前后只有页号在变（VPN → PFN），偏移量原封不动 —— 一次访存 = 多一次查表</text>
            </svg>
          </figure>
          <!-- 操作图 ③：多级页表树 -->
          <figure class="bg-slate-50 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-slate-700 mb-3">操作示意 · 四级页表：用树换空间</h3>
            <svg viewBox="0 0 760 310" class="w-full h-auto">
              <defs><marker id="pg-c" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
              <text x="30" y="22" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">x86-64 四级页表：4 个 512 项的目录层，每级只需 9 位索引 —— 顶层永远只有 4KB</text>
              <rect x="250" y="32" width="240" height="48" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
              <text x="370" y="52" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1" font-family="monospace">第 4 级：PML4 页目录</text>
              <text x="370" y="70" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">512 项 × 8B = 4KB</text>
              <line x1="330" y1="80" x2="330" y2="118" stroke="#06b6d4" stroke-width="2" marker-end="url(#pg-c)"/>
              <line x1="430" y1="80" x2="510" y2="118" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#pg-c)"/>
              <rect x="235" y="120" width="190" height="48" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
              <text x="330" y="140" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1" font-family="monospace">第 3 级：PDPT</text>
              <text x="330" y="158" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">512 项（按需分配）</text>
              <rect x="455" y="120" width="210" height="48" rx="8" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5"/>
              <text x="560" y="140" text-anchor="middle" font-size="11" font-weight="bold" fill="#64748b" font-family="monospace">未用项 ✗</text>
              <text x="560" y="158" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="monospace">不分配下级表，省内存</text>
              <line x1="330" y1="168" x2="330" y2="206" stroke="#06b6d4" stroke-width="2" marker-end="url(#pg-c)"/>
              <rect x="235" y="208" width="190" height="48" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
              <text x="330" y="228" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1" font-family="monospace">第 2 级：PD 页目录</text>
              <text x="330" y="246" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">512 项</text>
              <line x1="330" y1="256" x2="330" y2="286" stroke="#06b6d4" stroke-width="2" marker-end="url(#pg-c)"/>
              <rect x="220" y="288" width="220" height="48" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
              <text x="330" y="308" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1" font-family="monospace">第 1 级：PT 页表（PTE）</text>
              <text x="330" y="326" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">512 个 PTE → 直接指到物理页帧</text>
            </svg>
          </figure>
        </div>
      </section>

      <!-- 1. 开篇点破 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>开篇点破：页表不是数据库的表</h2>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">「页表是数据库的表吗？」—— 不是，八竿子打不着</p>
          <p class="text-xs text-amber-600 text-center">SELECT * FROM page_table？要建索引？加外键？——统统不存在。页表不是存数据的，是翻译地址的</p>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">你看到「页表」两个字，第一反应是数据库的表，太正常了——毕竟你做后端天天和表打交道。但两者的用途完全不同：<strong>数据库的表存业务数据</strong>（订单、用户、商品……），回答「这条订单金额是多少」；<strong>页表存的是地址映射</strong>，回答「进程访问虚拟地址 X 时，物理内存里到底是哪一格」。页表不存你的数据，它存的是「你的数据在哪」——比任何索引都底层，因为 <strong>CPU 每取一条指令、每读一个变量，都要靠它把虚拟地址翻译成物理地址</strong>。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对比项</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">数据库的表</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">页表</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">谁维护</td><td class="px-4 py-2 border">数据库系统（MySQL / PostgreSQL）</td><td class="px-4 py-2 border">操作系统内核</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">存什么</td><td class="px-4 py-2 border">业务数据行（订单、用户…）</td><td class="px-4 py-2 border">虚拟页号 → 物理页帧号 的映射</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">回答什么问题</td><td class="px-4 py-2 border">这条记录的值是什么</td><td class="px-4 py-2 border">这个虚拟地址在物理内存哪个位置</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">放在哪</td><td class="px-4 py-2 border">磁盘 + 内存缓冲池</td><td class="px-4 py-2 border">物理内存的内核区</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">谁来查</td><td class="px-4 py-2 border">SQL 引擎</td><td class="px-4 py-2 border">硬件 MMU（缺页时才轮到内核）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">一条对应什么</td><td class="px-4 py-2 border">一行记录</td><td class="px-4 py-2 border">一个 4KB 页的映射</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>页表就像 <strong>SPA 的路由表</strong>。浏览器地址栏里的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">/user/:id</code> 是「虚拟地址」，vue-router 的路由表告诉你要渲染哪个组件，组件文件才是「物理页帧」。用户只关心 URL，从不管组件在哪个文件里——进程也只关心虚拟地址，从不管数据在物理内存哪一格。</p>
        </aside>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>想象一家大酒店的<strong>房号登记册</strong>。你报「305 房」＝虚拟地址；实际房间（不管它在几楼拐角）＝物理页帧；登记册＝页表。前台要查一下册子才知道「305」对应的到底是哪间房——这就是一次地址翻译。住客（程序）永远只报房号，从不关心房间在物理位置上长什么样。</p>
        </aside>
      </section>

      <!-- 2. 为什么需要分页 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>为什么需要分页？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">操作系统一开始并没有分页——最早的方案是「连续分配」和「分段」，结果都栽在同一个问题上：<strong>物理内存不够分、又凑不出连续的一大块</strong>。分页就是为了解决这四个现实问题而生：</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>物理内存被多进程共享</strong>：你的机器同时跑着 Go 后端、MySQL、Redis、浏览器……物理内存就 16GB，要分给几十个进程。没有分页，就必须给每个进程划一块「互不重叠」的连续区域，很快就会分崩离析。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>外部碎片</strong>：连续分配按进程大小切成不等的块，进程退出后留下许多小洞。运行久了，内存里全是"补丁"，想给新进程分一块连续大内存却拼不出来——明明总空闲很多，却<strong>没有哪一段是连续的</strong>。分页用固定大小的格子，把碎片问题彻底绕开。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>进程隔离</strong>：A 进程的野指针绝不能写坏 B 进程的数据，也不能偷读 B 的内存。分页给了每个进程<strong>独立的虚拟地址空间</strong>，A 的虚拟页只映射到 A 的物理页帧，访问 B 的地址 = 页表里查不到 = 触发缺页/保护异常，被硬件和内核当场拦截。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>虚拟内存的基石</strong>：程序以为自己在用一整块连续内存，实际被散落在物理内存的任意页帧上；甚至可以把不常用的页<strong>换出到磁盘</strong>，腾出物理内存给别的进程。这就是下一节「虚拟内存：需求分页、写时复制」的前提，分页是它的地基。</div></li>
        </ol>
        <div class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 前提要背下来：</strong>「每个进程有自己独立的虚拟地址空间」。32 位进程看到 4GB 虚拟地址，64 位进程看到巨大到用不完的地址空间——它们各自独立、互不干扰；<strong>物理内存是所有进程共享的底层资源</strong>，页表就是这份「共享资源」的分配账本。</p>
        </div>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>你写 Go 后端时，同一台机器上还跑着 Redis、Nginx、另一个 Go 服务。OS 靠分页让每个进程<strong>假装自己独占一整块连续内存</strong>——就像 Go 调度器让成百上千个 goroutine<strong>假装自己独占一个 CPU</strong>。两个 goroutine 之间是「协作式共享 CPU」，两个进程之间靠页表实现「物理上共享、逻辑上隔离」。</p>
        </aside>
      </section>

      <!-- 3. 页 / 页帧 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>页 / 页帧：把内存切成固定大小的格子</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">分页的核心动作只有两个：把<strong>虚拟地址空间</strong>切成固定大小的「页」<code class="bg-slate-100 px-1 rounded text-xs font-mono">page</code>，把<strong>物理内存</strong>切成同样大小的「页帧」<code class="bg-slate-100 px-1 rounded text-xs font-mono">page frame</code>（也叫页框）。默认一页 4KB。一页的内容可以放到<strong>任意一个</strong>空闲页帧里——因为格子一样大，<strong>不需要连续</strong>，碎片问题就此消失。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">概念</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">缩写</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">在地址的哪一段</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">作用</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">虚拟页号</td><td class="px-4 py-2 border font-mono text-xs">VPN</td><td class="px-4 py-2 border font-mono text-xs">虚拟地址高位（20 位）</td><td class="px-4 py-2 border">当页表数组的下标</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">偏移量</td><td class="px-4 py-2 border font-mono text-xs">offset</td><td class="px-4 py-2 border font-mono text-xs">低位（12 位，页内第几个字节）</td><td class="px-4 py-2 border">翻译前后不变</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">物理页帧号</td><td class="px-4 py-2 border font-mono text-xs">PFN</td><td class="px-4 py-2 border font-mono text-xs">物理地址高位</td><td class="px-4 py-2 border">页表项里存的"翻译结果"</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">于是地址被切成两段来解读：<code class="bg-slate-100 px-1 rounded text-xs font-mono">虚拟地址 = VPN(20位) + offset(12位)</code>，<code class="bg-slate-100 px-1 rounded text-xs font-mono">物理地址 = PFN(20位) + offset(12位)</code>。12 位 = 4096，正好对应一页 4KB；20 位 = 100 万种组合，正好对应 4GB 虚拟空间的页数。两个地址<strong>共用同一份偏移</strong>，翻译时只有页号在变。</p>
        <div class="mb-4"><Code language="bash" :code="pagesizeCode" title="看页大小" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">页大小</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">2 的幂</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">适用</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">代价</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">4KB</td><td class="px-4 py-2 border font-mono text-xs">2^12</td><td class="px-4 py-2 border">Linux x86-64 默认</td><td class="px-4 py-2 border">页表项多、TLB 覆盖小</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">2MB</td><td class="px-4 py-2 border font-mono text-xs">2^21</td><td class="px-4 py-2 border">HugePage 大页</td><td class="px-4 py-2 border">内部碎片变大（最后一个页浪费多）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">1GB</td><td class="px-4 py-2 border font-mono text-xs">2^30</td><td class="px-4 py-2 border">超大内存场景</td><td class="px-4 py-2 border">碎片更大，分配更粗</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>固定大小的页 ≈ 前端的<strong>栅格系统（12 列 Grid）</strong>。所有 UI 都往固定格子里塞，不要求一行连续占满——空出来的格子随时被别的组件填上。这就是分页消灭碎片的方式：<strong>不追求连续，只要求格子一样大</strong>。</p>
        </aside>
      </section>

      <!-- 4. 单级页表与 PTE -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>单级页表与页表项 PTE</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">最简单的页表就是<strong>一张数组</strong>：虚拟页号 <code class="bg-slate-100 px-1 rounded text-xs font-mono">VPN</code> 当下标，数组里存这个页对应哪个物理页帧，外加一堆标志位。这一整格就是<strong>页表项 PTE</strong>（Page Table Entry）。因为用数组按下标取，查表是 <code class="bg-slate-100 px-1 rounded text-xs font-mono">O(1)</code>——这正是「地址翻译很快」的原因。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">位段</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">名称</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">63:12</td><td class="px-4 py-2 border font-semibold">PFN 物理页帧号</td><td class="px-4 py-2 border">这页在物理内存的哪一帧（翻译结果的载体）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">0</td><td class="px-4 py-2 border font-semibold">Present 存在位</td><td class="px-4 py-2 border">1 = 在物理内存；0 = 换出/未分配 → 访问即缺页</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">1</td><td class="px-4 py-2 border font-semibold">RW 可写位</td><td class="px-4 py-2 border">1 = 可读写；0 = 只读（写时复制 COW 就靠它）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">2</td><td class="px-4 py-2 border font-semibold">User 用户态位</td><td class="px-4 py-2 border">1 = 用户态可访问；0 = 仅内核能碰</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">5</td><td class="px-4 py-2 border font-semibold">Accessed 访问位</td><td class="px-4 py-2 border">是否被访问过（换页算法挑牺牲页时参考）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">6</td><td class="px-4 py-2 border font-semibold">Dirty 脏位</td><td class="px-4 py-2 border">是否被写过（换出前要写回磁盘）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">63</td><td class="px-4 py-2 border font-semibold">NX 禁止执行</td><td class="px-4 py-2 border">该页不允许当代码执行（缓解缓冲区溢出攻击）</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="pteCode" title="pte.go" /></div>
        <div class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 单级页表太贵了：</strong>32 位地址 = 4GB/4KB = <strong>100 万个表项</strong>，每项 4 字节 = <strong>4MB 一进程</strong>。跑 100 个进程光页表就吃掉 400MB；64 位地址更是几何级爆炸。这正是下一节「多级页表」要解决的核心问题。</p>
        </div>
      </section>

      <!-- 5. 地址翻译全流程 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>地址翻译全流程（⭐ 核心）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">以 CPU 执行一条「读变量 x」的指令为例。整个过程由<strong>硬件 MMU</strong>（Memory Management Unit，内存管理单元）完成，操作系统只在缺页/异常时才插手。翻译一共 6 步：</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>CPU 发出访存指令</strong>，带上一个虚拟地址（比如 <code class="bg-slate-100 px-1 rounded text-xs font-mono">0x0804_1234</code>）。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>硬件拆地址</strong>：高 20 位取出 VPN，低 12 位取出 offset——位运算，一个时钟周期。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>MMU 查页表</strong>：用 VPN 当数组下标，取回这一页的 PTE（先在 TLB 里找，见第 7 节）。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>校验标志位</strong>：Present=0 → 缺页异常，陷入内核；权限不符（如 User=0 用户态硬闯内核页）→ 保护异常（段错误）。都通过才继续。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>拼出物理地址</strong>：PTE 里的 PFN 左移 12 位，再 <code class="bg-slate-100 px-1 rounded text-xs font-mono">OR</code> 上原封不动的 offset → 物理地址。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span><div class="text-slate-600"><strong>真正访存</strong>：拿物理地址去物理内存读数据，返回给 CPU。</div></li>
        </ol>
        <div class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 代价点：</strong>本来读一次内存 = 1 次访存；加了页表后，<strong>先查页表（1 次访存）再读数据（1 次访存）= 2 次访存</strong>，性能直接减半。这是分页最大的隐形成本——第 7 节的 <strong>TLB</strong> 就是专门用来消除这第 2 次访存的。</p>
        </div>
        <div class="mb-4"><Code language="go" :code="walkCode" title="translate.go" /></div>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>你报「305 房」（虚拟地址），前台一翻登记册（MMU 查页表）——305 的客人被临时挪去 209 房了，于是带你到 209（物理页帧）。<strong>你只记得 305，不关心房间在几楼哪侧</strong>；今天住 209、明天住 112 都行——这就是「虚拟地址不变、物理映射随便换」，也是进程<strong>被换进换出</strong>时程序无感知的原因。</p>
        </aside>
      </section>

      <!-- 6. 多级页表 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>多级页表：把 4MB 的大数组拆成一棵树</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">单级页表的问题：无论进程用没用那么多内存，页表都得建满 100 万项（4MB）。现实里一个进程<strong>90% 的虚拟地址根本没被用到</strong>——那 100 万个表项里绝大多数是白占内存的空洞。多级页表的思路：<strong>把一张大数组拆成树，只给「真正用到的页」建分支，空页连表项都不建</strong>。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">层级</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">名称</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">索引位数</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">该项覆盖的地址范围</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">4</td><td class="px-4 py-2 border">PML4（页目录指针表）</td><td class="px-4 py-2 border font-mono text-xs">9 bit（47~39 位）</td><td class="px-4 py-2 border font-mono text-xs">512GB</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">3</td><td class="px-4 py-2 border">PDPT（页目录指针表）</td><td class="px-4 py-2 border font-mono text-xs">9 bit（38~30 位）</td><td class="px-4 py-2 border font-mono text-xs">1GB</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">2</td><td class="px-4 py-2 border">PD（页目录）</td><td class="px-4 py-2 border font-mono text-xs">9 bit（29~21 位）</td><td class="px-4 py-2 border font-mono text-xs">2MB</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">1</td><td class="px-4 py-2 border">PT（页表，放 PTE）</td><td class="px-4 py-2 border font-mono text-xs">9 bit（20~12 位）</td><td class="px-4 py-2 border font-mono text-xs">4KB</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">每一级都是 <strong>512 项 = 9 位索引</strong>（x86-64 每项 8 字节，所以每级恰好一页 4KB）。4×9 + 12 = <strong>48 位地址空间</strong>。查一次地址要顺着树走 4 层——<strong>每层都是 O(1) 的数组取值</strong>，总耗时还是常数级别，这是多级页表不牺牲速度的关键。</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>按需分配</strong>：进程刚启动时只有顶层一个 4KB 的 PML4。每访问到一个新页，内核才临时分配它的下级表页。一个只用到 10 页的进程，页表总共也就几十字节，而不是 4MB。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>空页零成本</strong>：<code class="bg-slate-100 px-1 rounded text-xs font-mono">malloc(1GB)</code> 只是「预留」了虚拟地址空间，一个物理页帧都不占、一条页表项都不建——真正写它时才会「缺页→分配」。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>4MB → 4KB</strong>：单级页表每个进程固定 4MB，多级之后顶层永远只有 4KB，用多少建多少。</span></li>
        </ul>
        <div class="mb-4"><Code language="go" :code="multiLevelCode" title="walk4.go" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>把所有路由一次性注册到 <code class="bg-purple-100 px-1 rounded text-xs font-mono">router</code> 是「单级页表」——路由再多也全占内存。改成<strong>多级路由 + 动态 import 按需加载</strong>就是「多级页表按需分配」：只有访问到某个模块，才下载它那块的代码 chunk，不访问就不占带宽。前端懒加载 ≈ 按需分配的页表项。</p>
        </aside>
      </section>

      <!-- 7. TLB -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">7</span>TLB：给地址翻译加一块超快缓存</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">页表查找让一次访存变两次——CPU 受不了一次读数据等两次内存。于是硬件 MMU 里内置了一块<strong>超小、超快的缓存</strong>：<strong>TLB</strong>（Translation Lookaside Buffer，旁路转换缓冲），专门缓存「虚拟页号 → 物理页帧号」这种最近翻译过的结果。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>先查 TLB</strong>：VPN 命中缓存 → 一个时钟周期直接拿 PFN，根本不用去内存读页表。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>未命中（TLB miss）</strong>：才去内存查页表，拿到 PFN 后<strong>填回 TLB</strong>，下次就快了。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>为什么命中率高</strong>：程序有<strong>时间局部性</strong>（同一页反复访问：循环变量、栈）和<strong>空间局部性</strong>（顺序访问数组），真实命中率通常在 99% 以上。</div></li>
        </ol>
        <div class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 TLB 与上下文切换（回扣线程篇）：</strong>TLB 缓存的是「当前进程的」虚拟页映射。<strong>进程切换</strong>时地址空间整个换了，TLB 里全是上一个进程的缓存 → 必须整体<strong>失效/刷新</strong>，切换完头几次访存全是 TLB miss，这就是「进程切换比线程切换贵」的硬件原因之一。而<strong>同一进程里的线程 / goroutine 共享同一个地址空间</strong> → TLB 完全不用刷，切换快。你之前在线程篇反复看到「页表」被提起，<strong>真正的关联点就在这里</strong>。<Link :route="'cs-5-b-3-thread'" :text="'线程：用户态/内核态/轻量级进程'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
        </div>
        <div class="mb-4"><Code language="go" :code="tlbCode" title="tlb.go" /></div>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>TLB ≈ 酒店前台的<strong>常客记忆</strong>。常客一来，前台直接报出他住哪间房，连登记册都不用翻；新客人（TLB miss）才翻册子，翻完记在脑子里，下次就快了。<strong>大页（2MB）让一个 TLB 槽位覆盖 512 个 4KB 页</strong>，相当于前台一口气记住 512 个常客——这就是数据库/Go 大内存服务常开 hugepage 的原因。</p>
        </aside>
      </section>

      <!-- 8. 缺页中断 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">8</span>缺页中断：页表"查不到"时的异常路径</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">当 PTE 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">Present=0</code>（页被换出、还没分配、或根本不该访问），MMU 翻译失败，触发<strong>缺页异常（page fault）</strong>，CPU 停止当前指令、陷入内核，走的就是中断/异常处理路径。内核会分两种情况处理：</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>合法地址</strong>：页被换出到磁盘 / 首次访问尚未分配 → 内核从磁盘读回或新分配一个物理页帧，填好 PTE（置 Present=1），然后<strong>回到用户态，重新执行那条被中断的指令</strong>——程序毫无感知。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>非法地址</strong>：野指针、越界访问一个根本没映射过的地址 → 内核直接判死刑，向进程发 <code class="bg-slate-100 px-1 rounded text-xs font-mono">SIGSEGV</code>（段错误，Go 里就是 runtime error: invalid memory address）。</span></li>
        </ul>
        <p class="text-slate-600 mb-4 leading-relaxed">缺页是「虚拟内存」的核心引擎：<strong>页可以不常驻物理内存，用到才从磁盘拉回来</strong>。这就是下一节的主角。<Link :route="'cs-5-d-2-virtual'" :text="'虚拟内存：需求分页、写时复制'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> · 中断/异常的完整链路见 <Link :route="'cs-5-a-2-interrupt'" :text="'中断与异常'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>

      <!-- 9. 与 Go 底层实现的关系 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">9</span>与 Go 底层实现的关系：你也活在一个虚拟地址空间里</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">你写 Go 后端时，脑子里一直装着「页表」这三个字，是因为<strong>Go 程序本身就运行在一个巨大的虚拟地址空间里</strong>，页表在幕后支撑着它的每一段内存：</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>goroutine 栈随用随涨</strong>：Go 的 goroutine 初始栈只有 <strong>2KB</strong>，栈不够了会在虚拟地址空间里<strong>扩容</strong>（甚至可以扩到 1GB）——靠的就是虚拟内存的「按需映射」：先占住虚拟地址，物理页帧要真的写到了才分配。这就是为什么几百万 goroutine 也能活得下来。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>GC 扫描读的是虚拟地址</strong>：Go 的垃圾回收器扫描堆、追踪指针，全程只跟虚拟地址打交道；物理地址对它不可见。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>Go 自带一套"小分页系统"</strong>：Go runtime 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">runtime.mheap</code> 把堆按「页」管理（Go 的 pageSize = 8KB，是 OS 4KB 的两倍），span 由若干页组成，分配器在 span 上切小对象——<strong>这套系统跑在 OS 分页之上</strong>。所以 Go 里的「页」有两层：OS 页表的页 + Go 自己堆分配器的页。</span></li>
        </ul>
        <div class="mb-4"><Code language="go" :code="addrCode" title="addr.go" /></div>
        <div class="mb-4"><Code language="bash" :code="mapsCode" title="cat /proc/self/maps" /></div>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>Go 的内存分配器（<code class="bg-teal-100 px-1 rounded text-xs font-mono">runtime.mheap → mcentral → mcache</code>）本质上就是<strong>OS 分页机制在用户态的一次"复刻"</strong>：OS 用页帧池 + 页表给进程分物理内存；Go 用 span 池 + mcache 给 goroutine 分堆内存。理解 OS 的页表，等于提前理解了 Go 分配器的设计骨架。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>前端项目跑在浏览器里，也是<strong>同一个虚拟地址空间模型</strong>：JS 的 ArrayBuffer 分的是虚拟内存，V8 引擎自己还维护一套「对象 → 内存」的堆分配（和 Go 的 mheap 异曲同工）。你在浏览器 DevTools 里看 <code class="bg-purple-100 px-1 rounded text-xs font-mono">/proc</code> 看不到，但原理同源。</p>
        </aside>
      </section>

      <!-- 10. 常见误区 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">10</span>常见误区：这些坑你大概率踩过</h2>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 误区 1：以为页表是数据库的表。</strong>这是本文开篇就点破的——页表不存业务数据，是内核里的地址翻译映射表。看到「表」别急着联想 SQL，先想「这张表回答什么问题」。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 误区 2：以为 Go 里 <code class="bg-amber-100 px-1 rounded text-xs font-mono">&x</code> 打印的地址是物理地址。</strong>不是。<code class="bg-amber-100 px-1 rounded text-xs font-mono">%p</code> 打印的是<strong>虚拟地址</strong>——每个进程都从自己的一套 0x 开头编址，物理地址只有 MMU 才知道。你调试 Go 时看到的 0xc000… 全是虚拟地址。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 误区 3：以为每个进程独占物理内存。</strong>进程独占的是<strong>虚拟地址空间</strong>；物理页帧是<strong>共享资源</strong>，随时可能被换进换出、被别的进程抢占。你的 0xc0000000 和另一个进程的 0xc0000000 可以映射到<strong>不同的物理页</strong>，也可能（暂时）映射到<strong>同一个物理页</strong>（写时复制就是靠这个省内存）。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 误区 4：以为"物理内存 4GB，就装不下需要 4GB+ 的程序"。</strong>虚拟地址空间和物理内存是两码事。程序可以拥有远超物理内存的虚拟地址空间，靠<strong>换页</strong>把不用的页挪到磁盘，用到再拉回来——这正是虚拟内存的威力，也是「4GB 内存也能跑内存大户程序」的原因。</p>
        </aside>
      </section>

      <!-- 11. 小结 -->
      <section id="sec-11" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>页表不是数据库的表</strong>——它是一张「虚拟页号 → 物理页帧号」的地址翻译映射表，由内核维护、硬件 MMU 读取，每个进程一张。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>分页解决四件事</strong>：多进程共享物理内存、外部碎片、进程隔离，以及作为虚拟内存的基石。前提是「每个进程有独立虚拟地址空间」。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>地址翻译</strong>：虚拟地址 = VPN + offset，查页表换掉 VPN、offset 原封不动 → 物理地址 = PFN + offset。一次访存多了两次内存访问的代价。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>多级页表</strong>：把 4MB 的大数组拆成 4 级树（PML4→PDPT→PD→PT→PTE），按需分配、空页不占内存，顶层永远只有 4KB。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>TLB</strong> 是 MMU 里的页表缓存；<strong>进程切换要刷 TLB、线程/goroutine 共享地址空间不用刷</strong>——这就是线程切换比进程切换便宜的硬件原因，也是线程篇反复提页表的真正关联点。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>缺页</strong>（Present=0）触发异常走中断路径，是「虚拟内存：需求分页」的引擎——下一页见。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">相关阅读：<Link :route="'cs-5-b-3-thread'" :text="'线程：用户态/内核态/轻量级进程'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'cs-5-d-2-virtual'" :text="'虚拟内存：需求分页、写时复制'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'cs-5-a-2-interrupt'" :text="'中断与异常'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-5-c-4-deadlock'" :text="'← 上一节：死锁：四条件、银行家算法、检测恢复'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-5-d-2-virtual'" :text="'下一节：虚拟内存：需求分页、写时复制 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "页表不是数据库的表" },
  { id: "sec-2", name: "为什么需要分页" },
  { id: "sec-3", name: "页与页帧" },
  { id: "sec-4", name: "单级页表与 PTE" },
  { id: "sec-5", name: "地址翻译全流程" },
  { id: "sec-6", name: "多级页表" },
  { id: "sec-7", name: "TLB" },
  { id: "sec-8", name: "缺页中断" },
  { id: "sec-9", name: "与 Go 底层实现" },
  { id: "sec-10", name: "常见误区" },
  { id: "sec-11", name: "小结" },
]

// ===== 代码示例 =====
const pagesizeCode = `$ getconf PAGESIZE
4096                      # 4096 字节 = 4KB，一页的大小（2^12）
$ getconf PAGE_SIZE
4096
# Linux x86-64 普通页固定 4KB；也支持大页 HugePage：
$ grep Hugepagesize /proc/meminfo
Hugepagesize:       2048 kB   # 2MB 的大页 —— 页表项更少、TLB 覆盖更大`

const pteCode = `// 页表项 PTE：一个 64 位字（概念示意，实际是 CPU 规定的硬件格式）
type PTE struct {
	PFN      uint64 // 物理页帧号：这页在物理内存的哪一帧
	Present  bool   // 存在位：这页在物理内存里吗？（0 → 换出/未分配，访问即缺页）
	RW       bool   // 可写位：1 可读写，0 只读（写时复制 COW 的关键）
	User     bool   // 用户态可访问？（0 → 仅内核能碰）
	Dirty    bool   // 脏位：被写过 → 换出时要写回磁盘
	Accessed bool   // 访问位：被读过 → 换页算法挑牺牲页时参考
}`;

const walkCode = `// 地址翻译：虚拟地址 → 物理地址（单级页表演示）
func translate(vaddr uint64, pageTable []PTE, offsetMask, pageShift uint64) uint64 {
	vpn := vaddr >> pageShift     // ① 取页号（高 20 位）
	off := vaddr & offsetMask     // ② 取偏移（低 12 位）
	pte := pageTable[vpn]         // ③ 查页表：用页号当数组下标（MMU 硬件做这步）
	if !pte.Present {             // ④ 校验标志位
		pageFault(vpn)            //    存在位=0 → 缺页异常，陷入内核
	}
	return pte.PFN<<pageShift | off // ⑤ 页帧号拼上偏移 = 物理地址
}`;

const multiLevelCode = `// 四级页表查表：每级都是 512 项、9 位索引（概念示意）
// 地址 = 9位 + 9位 + 9位 + 9位 + 12位偏移 = 48 位
func walk4(vaddr uint64, pml4, pdp, pd, pt [512]PTE) uint64 {
	idx := func(shift uint) int { return int((vaddr >> shift) & 0x1FF) }

	p4 := pml4[idx(39)]        // ① PML4 索引：47~39 位
	if !p4.Present { return 0 } // 没建下级 → 直接缺页
	p3 := pdp[idx(30)]         // ② PDPT 索引：38~30 位
	p2 := pd[idx(21)]          // ③ PD 索引：29~21 位
	p1 := pt[idx(12)]          // ④ PT 索引：20~12 位（真正的 PTE）
	if !p1.Present { pageFault(vaddr) }
	return p1.PFN<<12 | vaddr&0xFFF // ⑤ PFN + 偏移 = 物理地址
}`;

const tlbCode = `// TLB：页表查询结果的缓存（虚拟页号 → 物理页帧号）
type TLB struct{ hit, miss int }

// MMU 的真实行为：先查 TLB，命中就直接拿 PFN（一个时钟周期）；
// 未命中才去查内存里的页表（多一次访存），并把结果填进 TLB
func (t *TLB) translate(vpn uint64) uint64 {
	if entry, ok := t.lookup(vpn); ok { // 命中：超快路径
		t.hit++
		return entry.pfn
	}
	pfn := walkPageTable(vpn)   // 未命中：慢速路径
	t.insert(vpn, pfn)          // 填回 TLB，下次就快了
	t.miss++
	return pfn
}
// 进程切换时：整个 TLB 作废（flush）；线程/goroutine 切换不用 —— 共享地址空间`;

const addrCode = `package main

import "fmt"

func main() {
	x := 42
	fmt.Printf("&x = %p\\n", &x) // 输出: 0xc0000140e8 —— 这是【虚拟地址】

	// 物理地址只有 MMU 通过页表换算才知道，
	// 普通 Go 代码永远看不到物理地址
}

func stackAddr() {
	c := make(chan *int, 2)
	for i := 0; i < 2; i++ {
		go func() { v := 0; c <- &v }()
	}
	a, b := <-c, <-c
	fmt.Printf("两个 goroutine 的栈变量地址: %p / %p\\n", a, b)
	// 输出: 0xc0000b2000 / 0xc0000b2018
	// 虚拟地址不同 → 但这两个页可能映射到【同一物理页】
	// （fork / 写时复制 COW 的伏笔，见下一节「虚拟内存」）
}`;

const mapsCode = `$ cat /proc/self/maps     # 查看当前进程（cat 自己）的虚拟地址空间
00400000-00452000 r-xp 00000000 08:01 3538881  /usr/bin/cat      ← 代码段（只读+可执行）
00452000-00458000 r--p 00052000 08:01 3538881  /usr/bin/cat      ← 只读数据
00458000-0045c000 rw-p 00058000 08:01 3538881  /usr/bin/cat      ← 可写数据
...
7f8b8ab2b000-7f8b8ab2f000 rw-p 00000000 00:00 0                  ← 匿名映射（堆/临时区）
7f8b8ab54000-7f8b8ad2c000 r-xp 00000000 08:01 3538930  /usr/lib/libc.so.6  ← 共享库代码段
7ffcb0bdc000-7ffcb0bfd000 rw-p 00000000 00:00 0        [stack]   ← 进程栈

# 每一行 = 一段连续的【虚拟地址】区间（头尾都对齐到 4KB 页）
# r-xp / rw-p 里的 p = 这段的页表项 Present=1（已映射）
# 段与段之间留白的地方 = 未映射/未分配 → 一访问就段错误`;
</script>
