<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">物理层·金属传输：双绞线、差分信号与干扰</h1><p class="text-sm text-slate-500 mt-1">电信号怎么在铜线里跑——双绞线为什么绞、差分信号怎么抗干扰、同轴电缆与 100 米限制（物理层金属篇收尾）</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">计算机网络 6-a-5</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：双绞线 + 差分信号 + 干扰源</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">这一篇是物理层的<strong>金属篇收尾</strong>。上一篇 <Link :route="'cs-6-a-4-fiber'" :text="'光纤传输'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> 讲的是光在玻璃里跑；这一篇回到铜线——你机柜里<strong>服务器网卡到交换机</strong>那根网线（双绞线）、老式有线电视线（同轴）。先记住一张总图：<strong>双绞线靠"绞 + 差分"抗干扰，同轴靠"屏蔽"抗干扰；铜线在 100 米内便宜好用，超过就得换光纤。</strong></p>

        <!-- ① 双绞线结构 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 240" class="w-full h-auto">
            <defs><marker id="cp-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
            <text x="40" y="26" font-size="13" font-weight="bold" fill="#b45309" font-family="monospace">① 双绞线 = 8 芯 4 对，每对绞合 → RJ45 水晶头</text>
            <!-- 对 1 -->
            <text x="10" y="61" font-size="11" fill="#64748b" font-family="monospace">对1 橙</text>
            <line x1="60" y1="54" x2="470" y2="54" stroke="#f59e0b" stroke-width="2"/>
            <line x1="60" y1="66" x2="470" y2="66" stroke="#06b6d4" stroke-width="2"/>
            <line x1="110" y1="54" x2="122" y2="66" stroke="#94a3b8" stroke-width="1"/>
            <line x1="122" y1="54" x2="110" y2="66" stroke="#94a3b8" stroke-width="1"/>
            <line x1="190" y1="54" x2="202" y2="66" stroke="#94a3b8" stroke-width="1"/>
            <line x1="202" y1="54" x2="190" y2="66" stroke="#94a3b8" stroke-width="1"/>
            <line x1="270" y1="54" x2="282" y2="66" stroke="#94a3b8" stroke-width="1"/>
            <line x1="282" y1="54" x2="270" y2="66" stroke="#94a3b8" stroke-width="1"/>
            <line x1="350" y1="54" x2="362" y2="66" stroke="#94a3b8" stroke-width="1"/>
            <line x1="362" y1="54" x2="350" y2="66" stroke="#94a3b8" stroke-width="1"/>
            <line x1="430" y1="54" x2="442" y2="66" stroke="#94a3b8" stroke-width="1"/>
            <line x1="442" y1="54" x2="430" y2="66" stroke="#94a3b8" stroke-width="1"/>
            <!-- 对 2 -->
            <text x="10" y="101" font-size="11" fill="#64748b" font-family="monospace">对2 绿</text>
            <line x1="60" y1="94" x2="470" y2="94" stroke="#f59e0b" stroke-width="2"/>
            <line x1="60" y1="106" x2="470" y2="106" stroke="#06b6d4" stroke-width="2"/>
            <line x1="100" y1="94" x2="112" y2="106" stroke="#94a3b8" stroke-width="1"/>
            <line x1="112" y1="94" x2="100" y2="106" stroke="#94a3b8" stroke-width="1"/>
            <line x1="160" y1="94" x2="172" y2="106" stroke="#94a3b8" stroke-width="1"/>
            <line x1="172" y1="94" x2="160" y2="106" stroke="#94a3b8" stroke-width="1"/>
            <line x1="220" y1="94" x2="232" y2="106" stroke="#94a3b8" stroke-width="1"/>
            <line x1="232" y1="94" x2="220" y2="106" stroke="#94a3b8" stroke-width="1"/>
            <line x1="280" y1="94" x2="292" y2="106" stroke="#94a3b8" stroke-width="1"/>
            <line x1="292" y1="94" x2="280" y2="106" stroke="#94a3b8" stroke-width="1"/>
            <line x1="340" y1="94" x2="352" y2="106" stroke="#94a3b8" stroke-width="1"/>
            <line x1="352" y1="94" x2="340" y2="106" stroke="#94a3b8" stroke-width="1"/>
            <line x1="400" y1="94" x2="412" y2="106" stroke="#94a3b8" stroke-width="1"/>
            <line x1="412" y1="94" x2="400" y2="106" stroke="#94a3b8" stroke-width="1"/>
            <line x1="460" y1="94" x2="472" y2="106" stroke="#94a3b8" stroke-width="1"/>
            <line x1="472" y1="94" x2="460" y2="106" stroke="#94a3b8" stroke-width="1"/>
            <!-- 对 3 -->
            <text x="10" y="141" font-size="11" fill="#64748b" font-family="monospace">对3 蓝</text>
            <line x1="60" y1="134" x2="470" y2="134" stroke="#f59e0b" stroke-width="2"/>
            <line x1="60" y1="146" x2="470" y2="146" stroke="#06b6d4" stroke-width="2"/>
            <line x1="110" y1="134" x2="122" y2="146" stroke="#94a3b8" stroke-width="1"/>
            <line x1="122" y1="134" x2="110" y2="146" stroke="#94a3b8" stroke-width="1"/>
            <line x1="180" y1="134" x2="192" y2="146" stroke="#94a3b8" stroke-width="1"/>
            <line x1="192" y1="134" x2="180" y2="146" stroke="#94a3b8" stroke-width="1"/>
            <line x1="250" y1="134" x2="262" y2="146" stroke="#94a3b8" stroke-width="1"/>
            <line x1="262" y1="134" x2="250" y2="146" stroke="#94a3b8" stroke-width="1"/>
            <line x1="320" y1="134" x2="332" y2="146" stroke="#94a3b8" stroke-width="1"/>
            <line x1="332" y1="134" x2="320" y2="146" stroke="#94a3b8" stroke-width="1"/>
            <line x1="390" y1="134" x2="402" y2="146" stroke="#94a3b8" stroke-width="1"/>
            <line x1="402" y1="134" x2="390" y2="146" stroke="#94a3b8" stroke-width="1"/>
            <line x1="460" y1="134" x2="472" y2="146" stroke="#94a3b8" stroke-width="1"/>
            <line x1="472" y1="134" x2="460" y2="146" stroke="#94a3b8" stroke-width="1"/>
            <!-- 对 4 -->
            <text x="10" y="181" font-size="11" fill="#64748b" font-family="monospace">对4 棕</text>
            <line x1="60" y1="174" x2="470" y2="174" stroke="#f59e0b" stroke-width="2"/>
            <line x1="60" y1="186" x2="470" y2="186" stroke="#06b6d4" stroke-width="2"/>
            <line x1="110" y1="174" x2="122" y2="186" stroke="#94a3b8" stroke-width="1"/>
            <line x1="122" y1="174" x2="110" y2="186" stroke="#94a3b8" stroke-width="1"/>
            <line x1="190" y1="174" x2="202" y2="186" stroke="#94a3b8" stroke-width="1"/>
            <line x1="202" y1="174" x2="190" y2="186" stroke="#94a3b8" stroke-width="1"/>
            <line x1="270" y1="174" x2="282" y2="186" stroke="#94a3b8" stroke-width="1"/>
            <line x1="282" y1="174" x2="270" y2="186" stroke="#94a3b8" stroke-width="1"/>
            <line x1="350" y1="174" x2="362" y2="186" stroke="#94a3b8" stroke-width="1"/>
            <line x1="362" y1="174" x2="350" y2="186" stroke="#94a3b8" stroke-width="1"/>
            <line x1="430" y1="174" x2="442" y2="186" stroke="#94a3b8" stroke-width="1"/>
            <line x1="442" y1="174" x2="430" y2="186" stroke="#94a3b8" stroke-width="1"/>
            <!-- 引线进 RJ45 -->
            <line x1="470" y1="54" x2="520" y2="52" stroke="#94a3b8" stroke-width="1"/>
            <line x1="470" y1="66" x2="520" y2="72" stroke="#94a3b8" stroke-width="1"/>
            <line x1="470" y1="94" x2="520" y2="92" stroke="#94a3b8" stroke-width="1"/>
            <line x1="470" y1="106" x2="520" y2="112" stroke="#94a3b8" stroke-width="1"/>
            <line x1="470" y1="134" x2="520" y2="132" stroke="#94a3b8" stroke-width="1"/>
            <line x1="470" y1="146" x2="520" y2="152" stroke="#94a3b8" stroke-width="1"/>
            <line x1="470" y1="174" x2="520" y2="172" stroke="#94a3b8" stroke-width="1"/>
            <line x1="470" y1="186" x2="520" y2="192" stroke="#94a3b8" stroke-width="1"/>
            <!-- RJ45 水晶头 -->
            <rect x="520" y="40" width="70" height="160" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
            <rect x="556" y="48" width="26" height="8" rx="2" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
            <rect x="556" y="68" width="26" height="8" rx="2" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
            <rect x="556" y="88" width="26" height="8" rx="2" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
            <rect x="556" y="108" width="26" height="8" rx="2" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
            <rect x="556" y="128" width="26" height="8" rx="2" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
            <rect x="556" y="148" width="26" height="8" rx="2" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
            <rect x="556" y="168" width="26" height="8" rx="2" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
            <rect x="556" y="188" width="26" height="8" rx="2" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
            <text x="555" y="222" text-anchor="middle" font-size="11" fill="#64748b" font-family="monospace">RJ45 水晶头（8 针）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">双绞线：4 对线（每对一"橙/绿/蓝/棕"+ 白），每对绞合；绞点之间的 X 记号就是"绞合"。每对绞距不同 → 避免线对间共振串扰</figcaption>
        </figure>

        <!-- ② 差分信号 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 290" class="w-full h-auto">
            <text x="40" y="26" font-size="13" font-weight="bold" fill="#b45309" font-family="monospace">② 差分信号：TX+ / TX− 相反 → 接收端取差 → 共模干扰被抵消</text>
            <!-- 发送端芯片 -->
            <rect x="28" y="86" width="96" height="100" rx="8" fill="#06b6d4"/>
            <text x="76" y="132" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">发送端</text>
            <text x="76" y="150" text-anchor="middle" font-size="11" fill="#cffafe" font-family="monospace">TX 芯片</text>
            <!-- 接收端芯片 -->
            <rect x="636" y="86" width="96" height="100" rx="8" fill="#06b6d4"/>
            <text x="684" y="132" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">接收端</text>
            <text x="684" y="150" text-anchor="middle" font-size="11" fill="#cffafe" font-family="monospace">RX 芯片</text>
            <!-- TX+ 方波 -->
            <path d="M150,110 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h50" fill="none" stroke="#06b6d4" stroke-width="2"/>
            <!-- TX− 反相方波 -->
            <path d="M150,180 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h20 v-14 h20 v14 h50" fill="none" stroke="#f59e0b" stroke-width="2"/>
            <!-- 线名 -->
            <text x="142" y="98" text-anchor="end" font-size="10" font-weight="bold" fill="#0e7490" font-family="monospace">TX+</text>
            <text x="142" y="208" text-anchor="end" font-size="10" font-weight="bold" fill="#b45309" font-family="monospace">TX−</text>
            <!-- 闪电：共模干扰 -->
            <polygon points="395,10 382,38 391,38 385,66" fill="#f59e0b"/>
            <!-- 干扰叠加线 -->
            <line x1="432" y1="96" x2="432" y2="196" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
            <text x="445" y="118" font-size="11" fill="#b45309" font-family="monospace">外部干扰 n</text>
            <text x="445" y="134" font-size="11" fill="#b45309" font-family="monospace">（共模）</text>
            <text x="445" y="150" font-size="11" fill="#b45309" font-family="monospace">同时加到两线上</text>
            <!-- 接收端公式 -->
            <rect x="180" y="226" width="400" height="46" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="380" y="247" text-anchor="middle" font-size="13" font-weight="bold" fill="#92400e" font-family="monospace">接收端只读两线之差：(A+n) − (B+n) = A − B</text>
            <text x="380" y="265" text-anchor="middle" font-size="11" fill="#b45309" font-family="monospace">干扰 n 被抵消，有用的差分信号 A−B 反而放大一倍</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">差分信号核心：一对线携带相反信号，外部干扰以"共模"形式同时加到两线上，接收端一相减就把它消掉——这是双绞线抗干扰的根本原理</figcaption>
        </figure>

        <!-- ③ 干扰源 -->
        <figure>
          <svg viewBox="0 0 760 230" class="w-full h-auto">
            <defs><marker id="cp-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#f59e0b"/></marker><marker id="cp-c" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#06b6d4"/></marker></defs>
            <text x="40" y="26" font-size="13" font-weight="bold" fill="#b45309" font-family="monospace">③ 干扰源：线对间串扰（NEXT / FEXT）+ 外部电磁干扰（EMI）</text>
            <!-- 线对 A（受扰的干扰源） -->
            <line x1="140" y1="92" x2="620" y2="92" stroke="#f59e0b" stroke-width="2"/>
            <line x1="140" y1="104" x2="620" y2="104" stroke="#06b6d4" stroke-width="2"/>
            <text x="120" y="99" text-anchor="end" font-size="10" fill="#475569" font-family="monospace">线对A</text>
            <line x1="170" y1="92" x2="182" y2="104" stroke="#94a3b8" stroke-width="1"/>
            <line x1="182" y1="92" x2="170" y2="104" stroke="#94a3b8" stroke-width="1"/>
            <line x1="240" y1="92" x2="252" y2="104" stroke="#94a3b8" stroke-width="1"/>
            <line x1="252" y1="92" x2="240" y2="104" stroke="#94a3b8" stroke-width="1"/>
            <line x1="310" y1="92" x2="322" y2="104" stroke="#94a3b8" stroke-width="1"/>
            <line x1="322" y1="92" x2="310" y2="104" stroke="#94a3b8" stroke-width="1"/>
            <line x1="380" y1="92" x2="392" y2="104" stroke="#94a3b8" stroke-width="1"/>
            <line x1="392" y1="92" x2="380" y2="104" stroke="#94a3b8" stroke-width="1"/>
            <line x1="450" y1="92" x2="462" y2="104" stroke="#94a3b8" stroke-width="1"/>
            <line x1="462" y1="92" x2="450" y2="104" stroke="#94a3b8" stroke-width="1"/>
            <line x1="520" y1="92" x2="532" y2="104" stroke="#94a3b8" stroke-width="1"/>
            <line x1="532" y1="92" x2="520" y2="104" stroke="#94a3b8" stroke-width="1"/>
            <line x1="590" y1="92" x2="602" y2="104" stroke="#94a3b8" stroke-width="1"/>
            <line x1="602" y1="92" x2="590" y2="104" stroke="#94a3b8" stroke-width="1"/>
            <!-- 线对 B（受害者） -->
            <line x1="140" y1="166" x2="620" y2="166" stroke="#f59e0b" stroke-width="2"/>
            <line x1="140" y1="178" x2="620" y2="178" stroke="#06b6d4" stroke-width="2"/>
            <text x="120" y="173" text-anchor="end" font-size="10" fill="#475569" font-family="monospace">线对B</text>
            <line x1="180" y1="166" x2="192" y2="178" stroke="#94a3b8" stroke-width="1"/>
            <line x1="192" y1="166" x2="180" y2="178" stroke="#94a3b8" stroke-width="1"/>
            <line x1="250" y1="166" x2="262" y2="178" stroke="#94a3b8" stroke-width="1"/>
            <line x1="262" y1="166" x2="250" y2="178" stroke="#94a3b8" stroke-width="1"/>
            <line x1="320" y1="166" x2="332" y2="178" stroke="#94a3b8" stroke-width="1"/>
            <line x1="332" y1="166" x2="320" y2="178" stroke="#94a3b8" stroke-width="1"/>
            <line x1="390" y1="166" x2="402" y2="178" stroke="#94a3b8" stroke-width="1"/>
            <line x1="402" y1="166" x2="390" y2="178" stroke="#94a3b8" stroke-width="1"/>
            <line x1="460" y1="166" x2="472" y2="178" stroke="#94a3b8" stroke-width="1"/>
            <line x1="472" y1="166" x2="460" y2="178" stroke="#94a3b8" stroke-width="1"/>
            <line x1="530" y1="166" x2="542" y2="178" stroke="#94a3b8" stroke-width="1"/>
            <line x1="542" y1="166" x2="530" y2="178" stroke="#94a3b8" stroke-width="1"/>
            <line x1="600" y1="166" x2="612" y2="178" stroke="#94a3b8" stroke-width="1"/>
            <line x1="612" y1="166" x2="600" y2="178" stroke="#94a3b8" stroke-width="1"/>
            <!-- NEXT -->
            <line x1="196" y1="84" x2="196" y2="168" stroke="#f59e0b" stroke-width="2" marker-end="url(#cp-b)"/>
            <text x="150" y="112" font-size="10" fill="#b45309" font-family="monospace">NEXT 近端串扰</text>
            <text x="150" y="126" font-size="10" fill="#b45309" font-family="monospace">（同侧发射端）</text>
            <!-- FEXT -->
            <line x1="580" y1="104" x2="580" y2="166" stroke="#06b6d4" stroke-width="2" marker-end="url(#cp-c)"/>
            <text x="588" y="146" font-size="10" fill="#0e7490" font-family="monospace">FEXT 远端串扰</text>
            <!-- EMI -->
            <polygon points="388,12 376,40 385,40 379,64" fill="#94a3b8"/>
            <line x1="386" y1="66" x2="386" y2="86" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,3"/>
            <text x="398" y="58" font-size="11" fill="#475569" font-family="monospace">EMI 外部电磁干扰（电源线/电机/荧光灯）</text>
            <!-- 对策 -->
            <text x="140" y="212" font-size="11" fill="#64748b" font-family="monospace">对策：① 每对绞距不同 → 破坏共振耦合   ② 屏蔽层接地（FTP/STP）   ③ 与强电分开走线</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">NEXT（近端串扰）和 FEXT（远端串扰）都来自相邻线对的电磁耦合；EMI 来自外部电磁场。双绞线的一切设计都在对抗这两类干扰</figcaption>
        </figure>
      </section>

      <!-- 1. 电信号怎么传比特 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>电信号怎么传比特：把 0/1 变成电压</h2>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">物理层 = 把一串 0/1 变成能在介质上跑的物理信号</p>
          <p class="text-xs text-amber-600 text-center">铜线上就是电压：高低电平表示 0/1；现代网卡用「一对线的差分电压翻转」来表示</p>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">回到 <Link :route="'cs-6-a-1-osi'" :text="'OSI 模型'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> 的物理层：它只干一件事——<strong>把比特变成物理信号</strong>，并且不关心"这一串比特是 HTTP 还是 TCP"。在铜线里，这个信号就是<strong>电压</strong>：最简单的做法是"高电压 = 1，低电压 = 0"；更现代的做法是"差分电压翻转"——用一对线之间电压的正负来编码（详见第 3 节）。</p>

        <ol class="space-y-4 mb-4">
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>网卡（NIC）从内存读取要发的字节</strong>——你的 Go 程序 <code class="bg-slate-100 px-1 rounded text-xs font-mono">conn.Write([]byte("GET / HTTP/1.1\r\n"))</code>，最终由内核把数据交给网卡 DMA 到网卡自己的缓冲区。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>PHY 芯片把并行比特串行化</strong>——按固定时钟节奏，把 8 位/32 位宽的字节变成一根线上的串行比特流，并加上时钟同步所需的编码（如曼彻斯特编码 / 4B5B / 扰码）。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>PHY 把每个比特映射成电信号</strong>——高/低电压，或差分对的电压翻转。电压施加到线对上，电磁场沿导线传播。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>对端 PHY 采样、判决、还原比特</strong>——在时钟边沿读取线电压，和阈值比较判成 0/1，再交给对端协议栈。</div>
          </li>
        </ol>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">问题</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">答案</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">铜线里传的到底是什么？</td><td class="px-4 py-2 border">电磁波沿"导体 + 介质"界面传导，驱动金属里的自由电子定向移动形成电流。本质是电场以接近光速在导线周围传播。</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">为什么不传"光"？</td><td class="px-4 py-2 border">金属是导体不是光导介质——光会被金属反射/吸收。传光要换光纤（玻璃），那是 <Link :route="'cs-6-a-4-fiber'" :text="'光纤篇'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> 的内容。</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">为什么铜线便宜？</td><td class="px-4 py-2 border">铜原料多、冶炼成熟；RJ45 水晶头几毛钱、一把压线钳现场就能压好；光纤要高纯度石英玻璃、光模块贵、熔接要专用设备、还怕弯折。</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">铜线的代价？</td><td class="px-4 py-2 border">衰减大、受电磁干扰、速率上不去（万兆以上功耗高）——所以只有 100 米内的"最后一跳"用它。</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>铜线传电就像<strong>水管传水</strong>——发送端一"泵"（施加电压），水（自由电子）就沿管（导线）流动，接收端感觉到"水压变了"就知道有信号了；而光纤更像一条<strong>镜子走廊</strong>，光在里面被反复反射前进，跟水一点关系没有。</p>
        </aside>
      </section>

      <!-- 2. 双绞线：为什么绞 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">⭐</span>双绞线（Twisted Pair）：为什么非要"绞"在一起</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">双绞线的结构（见上文结构图 ①）：<strong>8 芯 4 对</strong>，每对两根线<strong>按一定节距绞合</strong>，外面套 PVC 护套，两头压 <strong>RJ45 水晶头</strong>。从 Cat5e 到 Cat8，从千兆到数据中心 25G/40G，都是这个基本盘。那为什么两根线要扭成麻花？三个原因，个个关键：</p>

        <ol class="space-y-4 mb-4">
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>抗外部干扰（抗 EMI）：</strong>两根线绞合后，外部电磁场在相邻两个"半圈"里对两根线的作用<strong>几乎相同</strong>——干扰变成"共模"（两线被同样抬高/压低），配合差分接收端一相减就抵消（第 3 节细讲）。这是绞合最重要的作用。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>降低自身对外辐射：</strong>一对线里两根线电流方向相反，产生的磁场<strong>互相抵消</strong>——既少干扰别人（EMI 友好），也少被人干扰。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>各对绞距不同，避免线对间共振串扰：</strong>如果 4 对线绞距一样，线对 A 的信号会在固定相位上"叠加强化"进线对 B（共振）；每对用不同绞距，就把这种周期性耦合破坏了（第 4 节细讲）。</div>
          </li>
        </ol>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">项目</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">线对颜色</td><td class="px-4 py-2 border font-mono text-xs">橙白/橙、绿白/绿、蓝白/蓝、棕白/棕——每对一根纯色 + 一根白（白+条纹）。</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">线序标准</td><td class="px-4 py-2 border font-mono text-xs">T568A / T568B 两套排线顺序。两端同序 = 直通线（最常用）；一端 A 一端 B = 交叉线（现代设备都自动翻转，很少用了）。</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">接头</td><td class="px-4 py-2 border font-mono text-xs">RJ45（8P8C）：8 个金属触点，水晶头用压线钳一次压成型。</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>绞合就像<strong>拧毛巾 / 编麻花</strong>——两根线扭在一起，外界想"掰弯"它时，相邻两个半圈受力方向相反、互相抵消；而且麻花越紧，越难被一只手沿某个方向扭动。双绞线把"外部磁场"这个想扭动它的力，均匀分摊到每个半圈里抵消掉了。</p>
        </aside>

        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>双绞线的"绞 + 差分"本质上是一种<strong>用冗余换可靠</strong>的工程策略——就像 Go 服务做<strong>双副本/多副本</strong>（或者请求带校验和）：单个副本（单根线）不可靠，就把关键数据<strong>复制</strong>一份（第二根线），接收端<strong>对比两路</strong>（差分相减），把"同一时刻两边都坏"才有效的干扰过滤掉。Raft 的多数派、HTTP 的 ETag 校验，都是同一哲学：单点易错，冗余 + 比较才稳。</p>
        </aside>
      </section>

      <!-- 3. 差分信号 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">⭐</span>差分信号：双绞线抗干扰的"核心武器"</h2>
        <div class="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-1 text-center font-mono">接收端不看单根线，只看两线之差：RX = (TX+) − (TX−)</p>
          <p class="text-xs text-cyan-600 text-center">有用信号是"差模"（两线相反，相减变大）；干扰是"共模"（两线相同，相减抵消）</p>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">先看"单端传输"为什么不行：一根信号线对地传电压，外部干扰直接加在这根线上，接收端无法区分"这是发送端发的高电平，还是干扰抬高的电平"。差分传输的思路是——<strong>用两根线，发相反的信号</strong>：TX+ 发 +V 时，TX− 就发 −V；接收端把两线相减 <code class="bg-slate-100 px-1 rounded text-xs font-mono">A − B</code>。参考上文结构图 ②。</p>

        <ol class="space-y-4 mb-4">
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>发送端：</strong>TX+ 和 TX− 携带<strong>相反</strong>的信号（一个 +V、一个 −V）。有用信息 = 两线之差 <code class="bg-slate-100 px-1 rounded text-xs font-mono">A − B = 2V</code>，比单端大一倍。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>干扰到达：</strong>外部电磁场、相邻线对串扰，作用在靠得很近的两根线上，幅度<strong>几乎一样</strong>——两线被同时抬高或压低 <code class="bg-slate-100 px-1 rounded text-xs font-mono">n</code>。这叫<strong>共模干扰</strong>（common-mode）。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>接收端取差：</strong><code class="bg-slate-100 px-1 rounded text-xs font-mono">(A+n) − (B+n) = A − B = 2V</code>——共模干扰 n 被<strong>完全抵消</strong>，有用的差模信号反而翻倍。抗干扰能力直接拉满。</div>
          </li>
        </ol>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">项目</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">差模信号（有用）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">共模干扰（要消除）</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">两线信号</td><td class="px-4 py-2 border">相反（+V / −V）</td><td class="px-4 py-2 border">相同（都 +n）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">接收端取差 (A−B)</td><td class="px-4 py-2 border font-mono text-xs">2V → 放大一倍</td><td class="px-4 py-2 border font-mono text-xs">0 → 被抵消</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">来源</td><td class="px-4 py-2 border">发送端主动产生的信号</td><td class="px-4 py-2 border">外部电磁场 / 相邻线对串扰</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">需要对抗吗</td><td class="px-4 py-2 border">不需要，它是信息本体</td><td class="px-4 py-2 border">必须消除——差分传输天生免疫</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">实际应用：<strong>100BASE-TX</strong>（百兆）用一对线差分 + MLT-3 编码；<strong>1000BASE-T</strong>（千兆）用 4 对线全部双向同时传（每对 250Mbps × 4 = 1Gbps），全部走差分。你看手机/主板上的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">D+/D-</code>（USB）、HDMI 里的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">TX+ TX-</code>——都是差分信号。</p>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>差分信号 ≈ 前端里的<strong>双通道冗余</strong>。想象你做"双活"部署：同一份服务在机房 A 和机房 B 各跑一份（第二根线），监控同时看两边，一个挂了流量切另一个（相减后取"正常的那份"）。或者像 <strong>React Error Boundary</strong>：渲染出错时不是让整棵组件树崩掉，而是<strong>捕获异常、降级渲染</strong>——差分接收端也是一道"边界"：把共模干扰（异常）这一层滤掉，只放行差模信号（正常的 UI）。</p>
        </aside>
      </section>

      <!-- 4. 串扰 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>串扰（Crosstalk）：NEXT / FEXT 与屏蔽</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">一根网线里挤着 4 对线。当线对 A 在传信号时，它产生的磁场会<strong>耦合进旁边的线对 B</strong>——B 里就混入了 A 的"窃听信号"。这种<strong>线对与线对之间的电磁耦合</strong>就是串扰（crosstalk）。参考上文结构图 ③。</p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类型</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">全称</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">在哪端被听到</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">危害</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold text-amber-700">NEXT</td><td class="px-4 py-2 border font-mono text-xs">Near-End Crosstalk</td><td class="px-4 py-2 border">近端（发射端同侧）</td><td class="px-4 py-2 border">本地发射信号强，干扰最猛</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">FEXT</td><td class="px-4 py-2 border font-mono text-xs">Far-End Crosstalk</td><td class="px-4 py-2 border">远端（接收端同侧）</td><td class="px-4 py-2 border">信号已衰减，相对影响小</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">对付串扰有三大招：</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>每对绞距不同：</strong>绞合把串扰变成了"共模"（两线都受影响），差分接收端能抵消；若线对之间共振（绞距一样、相位周期性对齐），串扰会被周期性强加。错开绞距 = 破坏共振。类比合唱：所有人都同拍反而震耳，错开唱就柔和了。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>增加线对间距 / 加塑料骨架（十字隔片）：</strong>把 4 对线物理隔开，耦合弱。Cat6 起常见十字骨架。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>屏蔽：</strong>给线对或整缆包一层金属箔 / 编织网，把耦合挡在外面——这就是 UTP / FTP / STP 的区别。</span></li>
        </ul>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类型</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">屏蔽方式</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">抗串扰/EMI</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">成本</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">典型场景</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">UTP</td><td class="px-4 py-2 border">无屏蔽</td><td class="px-4 py-2 border">靠绞合 + 差分，够用</td><td class="px-4 py-2 border">最低</td><td class="px-4 py-2 border">家用/办公布线（最主流）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">FTP</td><td class="px-4 py-2 border">整缆铝箔屏蔽</td><td class="px-4 py-2 border">较好</td><td class="px-4 py-2 border">中</td><td class="px-4 py-2 border">工业/机房走线密集处</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">STP</td><td class="px-4 py-2 border">每对独立屏蔽 + 总屏蔽</td><td class="px-4 py-2 border">最强</td><td class="px-4 py-2 border">高</td><td class="px-4 py-2 border">电磁环境恶劣、万兆以上</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>屏蔽层（FTP/STP）<strong>必须可靠接地</strong>。屏蔽层悬空不接地，反而会变成一根"天线"收集噪声，比不屏蔽的 UTP 更糟。机柜里常见"接了屏蔽网线却不接地"的坑。</p>
        </aside>
      </section>

      <!-- 5. 同轴电缆 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>同轴电缆（Coaxial）：穿"铠甲"的电缆</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">同轴电缆结构四层：<strong>中心导体 → 绝缘介质 → 金属屏蔽网（外导体）→ 外皮</strong>。中心导体和屏蔽网共享同一轴线，所以叫"同轴"。它的思路比双绞线更简单粗暴——<strong>用一整圈金属屏蔽网把信号包起来</strong>：外部电磁干扰被屏蔽网挡住，中心导体上只剩干净的信号。</p>

        <ol class="space-y-4 mb-4">
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>中心导体</strong>——传信号的地方，粗细决定衰减与载流能力。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>绝缘介质</strong>——把中心导体与屏蔽网隔开，保持<strong>阻抗均匀</strong>（特性阻抗稳定，信号反射小）。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>金属屏蔽网</strong>——外导体，<strong>接地</strong>。它是信号的回流路径，也是一圈电磁屏蔽罩。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>外皮</strong>——保护 + 绝缘。</div>
          </li>
        </ol>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性阻抗</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">设计取向</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用途</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">50 Ω</td><td class="px-4 py-2 border">功率传输最优</td><td class="px-4 py-2 border">数据通信：老以太网 10BASE2（细缆/BNC）、射频、基站馈线</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">75 Ω</td><td class="px-4 py-2 border">信号损耗最小</td><td class="px-4 py-2 border">视频/广播：有线电视（CATV）、视频监控、老式同轴上网（广电）</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">如今双绞线（便宜、易施工）抢走了以太网短距离的地盘，同轴退守到<strong>有线电视、基站 RRU 回传、视频监控</strong>这类"要强抗干扰、要长距离、又不想上光纤"的场景。你机柜里基本见不到它，但家里电视墙后面的白色粗线很可能就是同轴。</p>

        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>同轴电缆像<strong>穿铠甲的电缆</strong>，也像<strong>地铁隧道</strong>——隧道壁（屏蔽网）把外面的风雨雷电（EMI）全挡在外面，车（中心导体的信号）在隧道里稳稳地跑。双绞线是"两人牵着手互相搀扶"（差分），同轴是"一个人住进碉堡"（屏蔽）。</p>
        </aside>
      </section>

      <!-- 6. 100 米规则与线缆类别 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>距离与速率：为什么是 100 米？线缆类别怎么选</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">以太网双绞线有个铁律：<strong>单段 ≤ 100 米</strong>。这是被两个物理事实逼出来的：</p>

        <ol class="space-y-4 mb-4">
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>衰减（Attenuation）：</strong>电信号在铜线里随距离<strong>指数衰减</strong>，而且<strong>高频分量衰减更快</strong>（集肤效应）。信号传得越远越"虚"，超过某个长度信噪比不足，接收端判决 0/1 就开始出错。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>时序（Timing，CSMA/CD）：</strong>共享介质时代，发送端必须在 <strong>2 × 最大往返延迟</strong>内听到"冲突"才能重传。100BASE-TX 的冲突时隙 = <strong>512 bit-time = 5.12 µs</strong>；电信号在双绞线里约 5.5 ns/m（约 2/3 光速），往返约 11 ns/m。算下来一个时隙最多支持 ~460 米往返，再扣掉网卡/交换机的转发延迟、留足裕量，标准就定成了 <strong>100 米</strong>。</div>
          </li>
        </ol>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类别</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">带宽(MHz)</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">最高速率</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">典型场景</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">Cat5e</td><td class="px-4 py-2 border font-mono text-xs">100 MHz</td><td class="px-4 py-2 border">1 Gbps @100m</td><td class="px-4 py-2 border">家用/办公千兆（最多见）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">Cat6</td><td class="px-4 py-2 border font-mono text-xs">250 MHz</td><td class="px-4 py-2 border">1 Gbps @100m；10 Gbps @55m</td><td class="px-4 py-2 border">千兆增强，短距离万兆</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">Cat6a</td><td class="px-4 py-2 border font-mono text-xs">500 MHz</td><td class="px-4 py-2 border">10 Gbps @100m</td><td class="px-4 py-2 border">万兆到桌面 / 机房</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">Cat7</td><td class="px-4 py-2 border font-mono text-xs">600 MHz</td><td class="px-4 py-2 border">10 Gbps（全屏蔽，GG45 头）</td><td class="px-4 py-2 border">高隔离要求的专业环境</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">Cat8</td><td class="px-4 py-2 border font-mono text-xs">2000 MHz</td><td class="px-4 py-2 border">25 / 40 Gbps @30m</td><td class="px-4 py-2 border">数据中心机柜内（短、快、贵）</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-4 leading-relaxed">别猜——直接看你机器上<strong>实际协商出来的速率</strong>。这也解释了"跑不满带宽"时第一步该查什么：</p>
        <div class="mb-4"><Code language="bash" :code="codeSpeed" title="① 查看网卡协商速率" /></div>
        <div class="mb-4"><Code language="bash" :code="codeLink" title="② 查看链路协商与自协商结果" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>100 米是"<strong>每段</strong>设备到设备"的长度，不是整条链路总长。中间加交换机就<strong>多了一段</strong>（重新生成信号），但每一段仍要 ≤ 100 米，而且级联越多延迟越大（第 9 节有专门的坑）。</p>
        </aside>
      </section>

      <!-- 7. 铜 vs 光纤 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">⭐</span>铜 vs 光纤：一张表看清边界</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">上篇 <Link :route="'cs-6-a-4-fiber'" :text="'光纤传输'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> 讲了光怎么在玻璃里跑；这里把两种介质放一起对照，你就知道"什么时候用铜、什么时候用光纤"：</p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">双绞线（铜）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">光纤</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">介质 / 信号</td><td class="px-4 py-2 border">铜线 · 电信号（差分电压）</td><td class="px-4 py-2 border">玻璃/塑料 · 光信号（全反射）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">带宽上限</td><td class="px-4 py-2 border">千兆普及；万兆以上功耗高、难</td><td class="px-4 py-2 border">单模轻松 100 Gbps+，WDM 一芯多波长复用</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">距离</td><td class="px-4 py-2 border">≤ 100 m</td><td class="px-4 py-2 border">多模 300~550 m；单模几十~上百 km</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">抗电磁干扰</td><td class="px-4 py-2 border">差分 + 屏蔽，仍受 EMI 影响</td><td class="px-4 py-2 border">不导电，天然免疫 EMI、雷击、串扰</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">成本</td><td class="px-4 py-2 border">线便宜、水晶头几毛、现场压接</td><td class="px-4 py-2 border">光纤 + 光模块贵；熔接要设备、怕弯折</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">施工难度</td><td class="px-4 py-2 border">低：压线钳一次成型</td><td class="px-4 py-2 border">高：熔接/冷接、弯曲半径限制</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">典型场景</td><td class="px-4 py-2 border">机柜内跳线、最后 100 米到桌面/服务器</td><td class="px-4 py-2 border">机房上联、跨楼、跨城骨干、长距离高带宽</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 一句话分界线：</strong><strong>100 米内、速率 ≤ 10G、电磁环境一般 → 用铜</strong>（便宜、好施工）；<strong>更远、更快、更强干扰、跨楼跨城 → 用光纤</strong>。服务器到机柜交换机（最后一米）用铜，交换机上联/跨机房（后 99 米）用光纤——这就是数据中心的标准姿势。</p>
        </aside>
      </section>

      <!-- 8. 与后端/Go 的关系 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">8</span>与后端 / Go 底层实现的关系：你的请求从 RJ45 进网卡</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">你把 Go 服务部署到一台服务器上，用户的 HTTP 请求走完整个互联网，最后一段一定是这样：<strong>用户 → 城域网光纤 → 数据中心 → 机房 → 机柜交换机（光纤上联）→ 一根双绞线 → 你的服务器网卡（RJ45）→ 内核 → Go net/http</strong>。在这条链路里，<strong>双绞线是"最后一米"，光纤是"后 99 米"</strong>。</p>

        <ol class="space-y-4 mb-4">
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>最后一米是铜：</strong>每台服务器网卡（通常 1G/10G/25G）到机柜顶部交换机（TOR）用双绞线或 DAC（有源铜缆）。这段距离短（几米），用铜最便宜。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>后 99 米全是光：</strong>TOR 往上走汇聚/核心交换机、跨机柜、跨机房，全是光纤（10G/25G/100G 光模块）。铜线在这个距离衰减/功耗都顶不住。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>高密度为什么转光/DAC：</strong>铜线到 10G+，每端口的<strong>功耗和发热</strong>飙升（DSP 补偿串扰非常耗电）。所以数据中心 25G/100G 用 DAC（短距低成本有源铜缆）或 AOC/光纤，而 100G 基本全是光。</div>
          </li>
          <li class="flex gap-3">
            <span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>1000BASE-T 的现实约束：</strong>如果机房给的还是千兆网卡，你 Go 服务的网络吞吐理论上限 ~118 MB/s。要扛住高并发，靠 epoll + 多 goroutine 把这块带宽吃满——但物理层到这就到头了，再上不去就是升级网卡/换光纤的事，改代码没用。</div>
          </li>
        </ol>

        <div class="mb-4"><Code language="bash" :code="codeErrors" title="③ 排查物理链路：看网卡错误计数" /></div>
        <div class="mb-4"><Code language="go" :code="codeInterfaces" title="④ 用 Go 看网卡：net.Interfaces()" /></div>

        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>你的 <code class="bg-teal-100 px-1 rounded text-xs font-mono">net/http</code> Handler <strong>完全不知道</strong>请求进来时走的最后一段是双绞线还是光纤——就像 Go 的接口/依赖注入：上层只依赖抽象（<code class="bg-teal-100 px-1 rounded text-xs font-mono">io.Reader</code> / <code class="bg-teal-100 px-1 rounded text-xs font-mono">http.Handler</code>），底层实现（是文件、内存、还是网络、什么介质）随便换。物理层和你的业务逻辑之间隔着一整个协议栈，这就是分层给你的自由——但你得知道"最后一米"在哪里，出了问题才知道该查交换机还是查网线。</p>
        </aside>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 回顾全链条：</strong>物理层（本篇铜线 + 上篇光纤）→ <Link :route="'cs-6-a-1-osi'" :text="'数据链路/网络层'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> → TCP → <Link :route="'cs-6-b-1-http1'" :text="'HTTP'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> → Go Handler。这篇讲透了最底下那一层，接下来一路往上，都是你已经熟的东西。</p>
        </aside>
      </section>

      <!-- 9. 常见误区 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见误区（坑）</h2>

        <div class="mb-4">
          <h3 class="text-base font-semibold text-slate-700 mb-2">坑 1："网线越粗/越贵越好？"——类别才是关键</h3>
          <p class="text-slate-600 leading-relaxed mb-3">Cat5e 和 Cat6 外观几乎一样，但带宽差着一倍。想跑千兆，Cat5e 就够；想跑 10G@100m，必须 Cat6a 起步。用错类别，万兆网卡只会协商成千兆，甚至<strong>大量重传、错误计数飙升</strong>。选线看<strong>印刷在护套上的类别</strong>，不看粗细。</p>
        </div>
        <div class="mb-4">
          <h3 class="text-base font-semibold text-slate-700 mb-2">坑 2："绞合是装饰，剪短点没关系？"</h3>
          <p class="text-slate-600 leading-relaxed mb-3">绞合是<strong>核心抗干扰设计</strong>（第 2 节）。剥线、做水晶头时留太长平行段、或者自己重接把两线"捋直"，都会破坏差分共模抵消效果——短距离没事，一拉长或周围干扰大就狂掉包。做水晶头尽量让线对保持绞合到压接处。</p>
        </div>
        <div class="mb-4">
          <h3 class="text-base font-semibold text-slate-700 mb-2">坑 3："超过 100 米，中间加个交换机就行？"</h3>
          <p class="text-slate-600 leading-relaxed mb-3">交换机是"重新生成信号"的设备，确实能续一段，但<strong>每一段仍要 ≤ 100 米</strong>，而且级联增加的是<strong>整条链路的转发延迟</strong>——几十级交换机串下来，延迟和故障点都不可接受。正规做法：重新规划链路预算（每段长度 + 每跳延迟），或直接上光纤。</p>
        </div>
        <div class="mb-4">
          <h3 class="text-base font-semibold text-slate-700 mb-2">坑 4："屏蔽线比不屏蔽强，闭眼买 STP？"</h3>
          <p class="text-slate-600 leading-relaxed mb-3">屏蔽层<strong>不接地 = 天线</strong>，会收集噪声反而更差。STP/FTP 必须保证屏蔽层在两端可靠接地，且接地质量要检查——这在实际布线里是最容易翻车的一环。</p>
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 排查口诀：</strong>链路出问题先看<strong>物理层</strong>（link 状态、错误计数、协商速率），别一上来就怀疑代码。上面的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">ethtool</code> 三件套就是物理层体检工具。</p>
        </aside>
      </section>

      <!-- 10. 小结 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">✅</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>物理层把 0/1 变成电压/差分信号</strong>——铜线上传的是电磁波驱动的电流；铜便宜、好施工，但衰减大、受干扰、速率受限。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>双绞线绞合三作用</strong>：让外部干扰变共模、降低自身辐射、各对绞距不同破坏线对间共振串扰。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>差分信号是核心武器</strong>：接收端只读两线之差，差模信号放大一倍、共模干扰被完全抵消。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>串扰分 NEXT/FEXT</strong>，靠绞距不同 + 屏蔽（UTP/FTP/STP，屏蔽须接地）对抗；同轴靠整圈屏蔽网，退守有线电视/基站回传。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>100 米规则</strong> = 衰减 + 时序（CSMA/CD 冲突时隙）双重约束；选线看类别：Cat5e 千兆、Cat6a 万兆、Cat8 数据中心。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>铜 vs 光纤</strong>：100 米内最后一米用铜，跨机柜/跨楼/跨城用光纤；你的 Go 服务永远不感知介质，但部署时得知道"最后一米"在哪。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">至此物理层两篇（<Link :route="'cs-6-a-4-fiber'" :text="'光纤'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> + 铜线）收尾。下一站往上走——<Link :route="'cs-6-b-1-http1'" :text="'HTTP/1.1'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />，你天天写 Go 后端最熟的协议层。</p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-6-a-4-fiber'" :text="'← 上一节：光纤传输：全反射、单模/多模、WDM'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-6-b-1-http1'" :text="'下一节：HTTP/1.1：持久连接/管线化/缓存 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "电信号怎么传比特" },
  { id: "sec-2", name: "⭐ 双绞线：为什么绞" },
  { id: "sec-3", name: "⭐ 差分信号抗干扰" },
  { id: "sec-4", name: "串扰 NEXT/FEXT" },
  { id: "sec-5", name: "同轴电缆" },
  { id: "sec-6", name: "100 米规则与线缆类别" },
  { id: "sec-7", name: "⭐ 铜 vs 光纤对照" },
  { id: "sec-8", name: "与后端/Go 的关系" },
  { id: "sec-9", name: "⚠️ 常见误区" },
  { id: "sec-10", name: "✅ 小结" },
]

// ===== 代码示例 =====
const codeSpeed = `# ① 看当前协商到的速率（Linux，ethtool 需要 root）
sudo ethtool eth0 | grep -i speed
# 输出示例:  Speed: 1000Mb/s          ← 千兆 = 1000BASE-T

# ② 不装工具，直接读内核暴露的 sysfs（/sys/class/net/eth0/speed）
cat /sys/class/net/eth0/speed
# 输出: 1000                          ← 单位 Mb/s，1000 = 1Gbps

# ③ 把本机所有网卡的速率都打出来
#    （注意：会有虚拟网卡，如 docker0 / br-xxx / lo）
for i in /sys/class/net/*/speed; do
  echo "$i -> $(cat $i) Mb/s"
done`;
const codeLink = `# 查看"自协商"结果：速率 + 双工 + 链路是否建立
sudo ethtool eth0 | grep -i link
# 输出示例:
#   Speed: 1000Mb/s        ← 两边自协商后都支持，才跑上千兆
#   Duplex: Full           ← 全双工：收发同时进行
#   Link detected: yes     ← 物理链路 OK（线插好了、对端也活着）

# 如果显示 100Mb/s，先查线材和端口，再怀疑对端设备

# 看看网卡支持哪些模式（会看到 10baseT/100baseT/1000baseT 等）
sudo ethtool eth0 | head -n 8
# 输出示例:
#   Supported link modes:  10baseT/Half 10baseT/Full
#                          100baseT/Half 100baseT/Full
#                          1000baseT/Half 1000baseT/Full
#   Advertised link modes: 10baseT/Half 10baseT/Full
#                          100baseT/Half 100baseT/Full
#                          1000baseT/Full`;
const codeErrors = `# 网线质量差 / 单段超过 100 米 / 水晶头接触不良 → 错误计数飙升
sudo ethtool -S eth0 | grep -iE 'err|drop'
# 输出示例:
#     rx_errors: 12          ← 收包错误
#     rx_crc_errors: 12      ← 帧校验错误（劣质/超长/干扰大的网线高发）
#     rx_dropped: 0          ← 因缓冲区满而丢弃
#     tx_errors: 3           ← 发包错误

# 如果 rx_crc_errors 持续增长：
# 先怀疑物理链路（换线/重新压水晶头/检查长度），而不是改应用代码！`;
const codeInterfaces = `package main

import (
    "fmt"
    "net"
)

func main() {
    // 应用层根本不关心底层是双绞线还是光纤——
    // 它只看到"逻辑网卡"：名字、MTU、硬件地址（MAC）
    ifaces, err := net.Interfaces()
    if err != nil {
        panic(err)
    }

    for _, iface := range ifaces {
        status := "down"
        if iface.Flags&net.FlagUp != 0 {
            status = "up"
        }
        fmt.Printf("%-8s 状态=%-4s MTU=%-5d MAC=%s\\n",
            iface.Name, status, iface.MTU, iface.HardwareAddr)
        // 输出: eth0      状态=up    MTU=1500  MAC=52:54:00:xx:xx:xx
    }

    // MTU=1500 是经典以太网帧上限（双绞线/光纤都遵守）
    // 数据包超过 MTU 时，IP 层要分片——这是"网络层"的事，
    // 与物理介质无关：你换光纤，net.Interfaces() 的代码一行都不用改。
}`;
</script>
