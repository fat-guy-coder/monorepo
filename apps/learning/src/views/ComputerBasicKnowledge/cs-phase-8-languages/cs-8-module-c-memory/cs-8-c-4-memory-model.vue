<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">堆内存到底存在哪：各语言内存模型</h1><p class="text-sm text-slate-500 mt-1">进程地址空间里的"堆"是什么、栈 vs 堆、值类型 vs 引用类型，以及 C / Go / Java / Python / JS / Rust 各自怎么存</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">语言与运行时 8-c-4</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：一块堆 + 一条"地址"串起所有语言</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm"><strong>堆不是某一种语言发明的"特性"，而是每个进程的地址空间里本来就有一块叫堆的区域。</strong>任何语言想存"大小不确定 / 需要跨函数共享"的数据，最终都得放到这块区域里——只是<strong>谁去分配、谁去回收、栈上能放多少</strong>各不一样。理解了这一点，之前"map 的 value 到底存在哪"的疑问就全通了：<strong>变量（map/对象/引用）通常在栈上，它存的是一个地址；真正装着 key/value 的桶数组 / 对象，在堆上。</strong></p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2">
          <!-- ① 进程地址空间 -->
          <figure class="bg-slate-50 rounded-xl p-4">
            <svg viewBox="0 0 360 400" class="w-full h-auto">
              <defs>
                <marker id="mm-dn" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#06b6d4"/></marker>
                <marker id="mm-up" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#f59e0b"/></marker>
              </defs>
              <text x="180" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">① 进程地址空间（x86-64 Linux 典型布局）</text>
              <!-- 内核空间 -->
              <rect x="20" y="34" width="232" height="22" rx="4" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
              <text x="136" y="48" text-anchor="middle" font-size="10.5" fill="#475569" font-family="monospace">内核空间（用户不可见）</text>
              <text x="262" y="48" font-size="10" fill="#94a3b8" font-family="monospace">高地址 ↑</text>
              <!-- 栈 -->
              <rect x="20" y="66" width="232" height="52" rx="6" fill="#e0f2fe" stroke="#06b6d4" stroke-width="1.2"/>
              <text x="136" y="86" text-anchor="middle" font-size="12" font-weight="bold" fill="#0e7490" font-family="monospace">栈 Stack</text>
              <text x="136" y="102" text-anchor="middle" font-size="10" fill="#0e7490" font-family="monospace">局部变量 · 函数调用帧</text>
              <line x1="228" y1="118" x2="228" y2="130" stroke="#06b6d4" stroke-width="1.8" marker-end="url(#mm-dn)"/>
              <text x="236" y="128" font-size="9" fill="#0891b2" font-family="monospace">↓</text>
              <!-- 空闲区 -->
              <rect x="20" y="134" width="232" height="38" rx="4" fill="none" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="5 4"/>
              <text x="136" y="157" text-anchor="middle" font-size="10" fill="#94a3b8" font-family="monospace">空闲区（栈与堆之间，按需增长）</text>
              <!-- 堆 -->
              <rect x="20" y="180" width="232" height="62" rx="6" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.2"/>
              <text x="136" y="200" text-anchor="middle" font-size="12" font-weight="bold" fill="#b45309" font-family="monospace">堆 Heap</text>
              <text x="136" y="217" text-anchor="middle" font-size="10" fill="#b45309" font-family="monospace">malloc / new / 动态数据</text>
              <text x="136" y="232" text-anchor="middle" font-size="10" fill="#b45309" font-family="monospace">map / 对象 / 字符串的归属地</text>
              <line x1="228" y1="180" x2="228" y2="168" stroke="#f59e0b" stroke-width="1.8" marker-end="url(#mm-up)"/>
              <text x="236" y="176" font-size="9" fill="#d97706" font-family="monospace">↑</text>
              <!-- BSS / 数据段 / 代码段 -->
              <rect x="20" y="252" width="232" height="22" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
              <text x="136" y="266" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">BSS：未初始化全局变量</text>
              <rect x="20" y="282" width="232" height="22" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
              <text x="136" y="296" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">数据段：已初始化全局 / 静态变量</text>
              <rect x="20" y="312" width="232" height="22" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
              <text x="136" y="326" text-anchor="middle" font-size="10" fill="#64748b" font-family="monospace">代码段 text：机器指令（只读）</text>
              <text x="262" y="330" font-size="10" fill="#94a3b8" font-family="monospace">低地址 ↓</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">每个进程都有一份这样的虚拟地址空间：栈在高地址向下长，堆在数据段上方向上长，中间是空洞。任何语言跑起来，动态数据最终都落在这块"堆"上</figcaption>
          </figure>

          <!-- ② 引用类型全景 -->
          <figure class="bg-slate-50 rounded-xl p-4">
            <svg viewBox="0 0 430 250" class="w-full h-auto">
              <defs>
                <marker id="mm-ref" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#64748b"/></marker>
              </defs>
              <text x="215" y="22" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">② 引用类型：栈上是地址，数据在堆</text>
              <!-- 栈 -->
              <rect x="18" y="44" width="150" height="176" rx="10" fill="#e0f2fe" stroke="#06b6d4" stroke-width="1.3"/>
              <text x="93" y="64" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0e7490" font-family="monospace">栈 Stack</text>
              <rect x="30" y="76" width="126" height="34" rx="6" fill="#ffffff" stroke="#06b6d4" stroke-width="1.1"/>
              <text x="93" y="97" text-anchor="middle" font-size="10.5" fill="#0c4a6e" font-family="monospace">m  map[string]int</text>
              <rect x="30" y="120" width="126" height="34" rx="6" fill="#ffffff" stroke="#06b6d4" stroke-width="1.1"/>
              <text x="93" y="141" text-anchor="middle" font-size="10.5" fill="#0c4a6e" font-family="monospace">u  *User</text>
              <text x="93" y="176" text-anchor="middle" font-size="9.5" fill="#0e7490" font-family="monospace">基本类型内联</text>
              <text x="93" y="192" text-anchor="middle" font-size="9.5" fill="#0e7490" font-family="monospace">引用 = 地址</text>
              <text x="93" y="208" text-anchor="middle" font-size="9.5" fill="#0e7490" font-family="monospace">变量小、数量可控</text>
              <!-- 堆 -->
              <rect x="230" y="44" width="182" height="176" rx="10" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.3"/>
              <text x="321" y="64" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#b45309" font-family="monospace">堆 Heap（动态数据）</text>
              <!-- 桶数组 -->
              <rect x="242" y="76" width="118" height="134" rx="6" fill="#ffffff" stroke="#f59e0b" stroke-width="1.1"/>
              <text x="301" y="92" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#b45309" font-family="monospace">桶数组（装 key/value）</text>
              <rect x="250" y="98" width="102" height="24" rx="4" fill="#fffbeb" stroke="#f59e0b" stroke-width="0.8"/>
              <text x="301" y="114" text-anchor="middle" font-size="9.5" fill="#78350f" font-family="monospace">key: age → 18（内联）</text>
              <rect x="250" y="126" width="102" height="24" rx="4" fill="#fffbeb" stroke="#f59e0b" stroke-width="0.8"/>
              <text x="301" y="142" text-anchor="middle" font-size="9.5" fill="#78350f" font-family="monospace">key: user → ●</text>
              <rect x="250" y="154" width="102" height="24" rx="4" fill="#ffffff" stroke="#d97706" stroke-width="0.8" stroke-dasharray="4 3"/>
              <text x="301" y="170" text-anchor="middle" font-size="9.5" fill="#d97706" font-family="monospace">（空桶）</text>
              <text x="301" y="198" text-anchor="middle" font-size="9" fill="#b45309" font-family="monospace">扩容时整块搬家</text>
              <!-- User 对象 -->
              <rect x="374" y="120" width="34" height="36" rx="6" fill="#e0f2fe" stroke="#06b6d4" stroke-width="1.1"/>
              <text x="391" y="141" text-anchor="middle" font-size="10" fill="#0c4a6e" font-family="monospace">User</text>
              <!-- 箭头 -->
              <line x1="156" y1="93" x2="240" y2="93" stroke="#64748b" stroke-width="1.6" marker-end="url(#mm-ref)"/>
              <text x="198" y="88" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">引用：桶数组地址</text>
              <line x1="352" y1="138" x2="372" y2="138" stroke="#64748b" stroke-width="1.6" marker-end="url(#mm-ref)"/>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">map 变量在栈上只存"桶数组的地址"。桶里既存 key 也存 value：value 可以是内联标量（age→18），也可以是指针（user→堆上的 User 对象）。传引用 = 到处传这个地址</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. 堆到底存在哪 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>"堆"到底存在哪：进程地址空间里那块区域</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">一个进程跑起来时，操作系统给它一片<strong>虚拟地址空间</strong>，并按用途划分成几段（见上图①）。其中从下往上有代码段、数据段、BSS，再往上就是<strong>堆（heap）</strong>——它是给"程序运行期动态申请内存"预留的一块区域。高地址那边是<strong>栈（stack）</strong>，专门给函数调用用的。</p>
        <p class="text-slate-600 mb-4 leading-relaxed">所以答案很直接：<strong>"堆"不是一个抽象概念，也不是某个语言私有的，它是每个进程地址空间里真实存在的一段区间</strong>。你在任何语言里 <code class="bg-slate-100 px-1 rounded text-xs font-mono">new</code>、<code class="bg-slate-100 px-1 rounded text-xs font-mono">make(map)</code>、<code class="bg-slate-100 px-1 rounded text-xs font-mono">{}</code> 出的大对象，最终都会在这段区间里占一块。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">堆是怎么变大的：brk 与 mmap</h3>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">堆不是固定大小，用光了可以"向操作系统要"。用户态程序自己不碰物理内存，而是通过系统调用告诉内核"我要扩大堆"，内核再映射新的页：</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>小请求走 <code class="bg-slate-100 px-1 rounded text-xs font-mono">brk</code></strong>：把"程序断点"（data 段末尾）往高地址推，堆就长了一截。这是传统的堆扩张方式。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>大请求走 <code class="bg-slate-100 px-1 rounded text-xs font-mono">mmap</code></strong>：直接在空闲区映射一块独立内存（比如大对象）。glibc 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">malloc</code> 超过阈值（默认 128KB）就改用 mmap，用完 <code class="bg-slate-100 px-1 rounded text-xs font-mono">munmap</code> 归还。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>Go 的 runtime 类似</strong>：用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">sysAlloc</code>（底层 mmap）向内核申请大块 arena，再自己切成小块发给各个 goroutine 的分配器。</div></li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">还有一个关键误区要破掉：<strong>"分配在堆上"不等于"立刻占了物理内存"</strong>。内核只保证虚拟地址可用，真实物理页是<strong>你第一次读写时才按需映射</strong>（触发缺页中断）。所以 <code class="bg-slate-100 px-1 rounded text-xs font-mono">make([]byte, 1e9)</code> 通常不会立刻吃 1GB 物理内存，除非你真去写它。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">段</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">存什么</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">增长方向</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">谁在用</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono font-semibold text-xs">stack</td><td class="px-4 py-2 border">函数调用帧、局部变量</td><td class="px-4 py-2 border font-mono text-xs">高地址 → 低地址</td><td class="px-4 py-2 border">所有语言的"局部变量/引用"</td></tr>
              <tr><td class="px-4 py-2 border font-mono font-semibold text-xs">heap</td><td class="px-4 py-2 border">动态分配的数据：map 桶、对象、切片底层</td><td class="px-4 py-2 border font-mono text-xs">低地址 → 高地址</td><td class="px-4 py-2 border">所有语言的"引用/指针"指向的对象</td></tr>
              <tr><td class="px-4 py-2 border font-mono font-semibold text-xs">mmap 区</td><td class="px-4 py-2 border">大块映射、共享库、大对象</td><td class="px-4 py-2 border font-mono text-xs">栈下方独立映射</td><td class="px-4 py-2 border">glibc/Go runtime 的大分配</td></tr>
              <tr><td class="px-4 py-2 border font-mono font-semibold text-xs">data/bss/text</td><td class="px-4 py-2 border">全局/静态变量、机器指令</td><td class="px-4 py-2 border font-mono text-xs">固定（编译期定好）</td><td class="px-4 py-2 border">程序加载时就有，几乎不变</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>把进程地址空间想成一层办公楼：<strong>代码段</strong>是水电图纸（固定不变），<strong>数据段</strong>是前台（一开始就摆好），<strong>堆</strong>是仓库（东西多了去后勤部申请扩仓），<strong>栈</strong>是会议室的桌上那摞便签（开会用、散会清、后进先出）。你 <code class="bg-orange-100 px-1 rounded text-xs font-mono">new</code> 出来的大对象，都搬进仓库里了。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>Go 里看进程实际的内存布局，最直接的方式是 <code class="bg-teal-100 px-1 rounded text-xs font-mono">pmap &lt;pid&gt;</code> 或读 <code class="bg-teal-100 px-1 rounded text-xs font-mono">/proc/&lt;pid&gt;/maps</code>——能看到 [heap]、[stack]、以及 Go runtime 用 mmap 申请的一大片 arena。这就是"堆存在哪"的答案，一查便知。</p>
        </aside>
      </section>

      <!-- 2. 栈 vs 堆 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>栈 vs 堆：谁快、谁大、谁来管</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">先记一句总纲：<strong>栈是"函数调用自动分配/自动释放"的临时区，堆是"想用多久用多久、但得有人负责回收"的长期区。</strong>两者不是"快与慢"这么简单，差在三个维度：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">栈（stack）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">堆（heap）</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">分配/释放</td><td class="px-4 py-2 border">函数调用入栈、返回弹栈，<strong>自动</strong>，编译器插入代码</td><td class="px-4 py-2 border">手动（C）或由 runtime/GC（Go/Java/JS/Python），回收有成本</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">速度</td><td class="px-4 py-2 border">改一个栈指针 SP，<strong>一条指令</strong>，无锁</td><td class="px-4 py-2 border">找空闲块 / 锁 / 可能触发 GC，整体更贵</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">大小</td><td class="px-4 py-2 border">固定且小（进程/线程栈一般几 MB），溢出即崩</td><td class="px-4 py-2 border">几乎等于可用内存，可向内核动态扩</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">数据生命周期</td><td class="px-4 py-2 border">仅限当前函数调用（返回就没了）</td><td class="px-4 py-2 border">可跨越函数、跨越 goroutine，直到被回收</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">存什么</td><td class="px-4 py-2 border">调用帧、局部变量、<strong>引用/地址</strong></td><td class="px-4 py-2 border">被引用的实际数据：对象、桶数组、大数组</td></tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">为什么栈快？一条指令 vs 一套流程</h3>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">栈分配就是 <code class="bg-slate-100 px-1 rounded text-xs font-mono">sub $0x40, %rsp</code> 一条减法指令——把栈指针往下挪 64 字节，这片空间就是你的了，释放时再加回来。堆分配要走：查找合适空闲块（free list / tcmalloc 的 size class）→ 可能要加锁（多线程并发）→ 可能要触发 GC → 缓存局部性还差（堆上对象之间经常不连续）。</p>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">所以语言设计者都拼命想让更多变量"去栈上"：Go 用<strong>逃逸分析</strong>，JVM 有<strong>标量替换 / 栈上分配</strong>，Rust 干脆默认栈、堆要用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">Box</code> 才上堆。</p>
        <div class="mb-4"><Code language="go" :code="stackheapCode" title="stack-vs-heap.go" /></div>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：传菜台 vs 仓库</strong><br/>栈像餐厅的<strong>传菜台</strong>：服务员把菜放上去、客人端走，位置固定、后进先出、眨眼完成；堆像<strong>仓库</strong>：你想要多大就去申请多大一块，用完了得办"归还"手续（free / GC），管理成本高得多。菜量小放传菜台，大宗囤货进仓库——数据同理：小且短命上栈，大且长寿进堆。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：JS 的调用栈</strong><br/>浏览器 DevTools 里看到的 <strong>Call Stack</strong> 就是"栈"：函数一层层压进去，递归太深就 "Maximum call stack size exceeded"（栈溢出）。而闭包捕获的变量、Map/对象，全在<strong>堆</strong>上——所以闭包能"活"到外层函数返回之后。JS 引擎替你分栈/堆，你感知不到，但行为处处体现。</p>
        </aside>
      </section>

      <!-- 3. 值类型 vs 引用类型 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>值类型 vs 引用类型：一切分歧的起点</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">"变量到底存在哪"，根源在于这个变量是<strong>值类型</strong>还是<strong>引用类型</strong>。一句话区分：</p>
        <div class="bg-gradient-to-r from-cyan-50 to-sky-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-sm font-bold text-cyan-800 mb-1 text-center">值类型：变量里装的<strong>就是数据本身</strong>，内联放着<br/>引用类型：变量里装的<strong>是一个地址</strong>，数据在别处（堆上）</p>
          <p class="text-xs text-cyan-600 text-center">int x = 5  —— x 的"抽屉"里就是 5<br/>map m = {...} —— m 的"抽屉"里是一张写着地址的便条，真正的桶在仓库里</p>
        </div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对比</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">值类型</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">引用类型</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">变量内容</td><td class="px-4 py-2 border">数据本身（几个字节）</td><td class="px-4 py-2 border">地址/引用（一个指针大小）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">赋值/传参</td><td class="px-4 py-2 border">拷贝整份数据（深）</td><td class="px-4 py-2 border">只拷贝地址（浅、O(1)）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">改一份，另一份变吗</td><td class="px-4 py-2 border">不变（各是各的）</td><td class="px-4 py-2 border">变（指向同一份数据）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">典型代表</td><td class="px-4 py-2 border">int/float/bool/struct（C/Go）/基本类型（JS）</td><td class="px-4 py-2 border">map/slice/对象/字符串（动态大小）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">为什么存在</td><td class="px-4 py-2 border">小、简单、用得起拷贝</td><td class="px-4 py-2 border">数据大/大小不定/要跨函数共享</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">一个重要的直觉：<strong>语言为什么要把 map/对象做成引用？因为数据大小不是编译期能定的。</strong>往 map 里塞 3 个 key 还是 300 万个 key，占的内存完全不同；数组要扩容；字符串有长有短。这些"动态大小的东西"不可能像 int 一样固定塞在栈的一个格子/结构体字段里，只能把"指向它的地址"放变量里——所以它们天然是引用。</p>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>Go 是"值类型语言但带着引用语义的容器"：struct 是值类型（传参默认拷贝！新手最常踩坑），map/slice/chan 是引用类型。所以 Go 面试经典题是"把 struct 传给函数，为什么函数里改了外面没变"——答案就是值拷贝；想要共享得传 <code class="bg-teal-100 px-1 rounded text-xs font-mono">&amp;u</code>（指针）。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>JS 的"原始类型 vs 对象"就是最直白的值 vs 引用：<code class="bg-purple-100 px-1 rounded text-xs font-mono">let a = 1; let b = a; b = 2</code>，a 还是 1；而 <code class="bg-purple-100 px-1 rounded text-xs font-mono">const o = {}; const p = o; p.x = 1</code>，o 里也多了 x——因为 <code class="bg-purple-100 px-1 rounded text-xs font-mono">o</code> 和 <code class="bg-purple-100 px-1 rounded text-xs font-mono">p</code> 拿的是同一个地址。Vue 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">ref</code> 就是把"值"包进一个对象，靠引用让响应式追踪生效。</p>
        </aside>
      </section>

      <!-- 4. 各语言内存模型 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>各语言内存模型：一张表看透 C / Go / Java / Python / JS / Rust</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">上面说的规则<strong>所有语言都遵守</strong>：动态数据在堆、小变量在栈（或内联）。差别只在——<strong>栈上能放多少、堆由谁回收、语言允不允许你直接碰地址</strong>。核心表格：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">语言</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">值类型 / 小数据存哪</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对象 / 动态数据存哪</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">堆由谁回收</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">一句话特征</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono font-semibold">C</td><td class="px-4 py-2 border">栈（struct 可内联）</td><td class="px-4 py-2 border">malloc 到的都在堆</td><td class="px-4 py-2 border">手动 free（否则泄漏）</td><td class="px-4 py-2 border">一切自己管，最接近硬件</td></tr>
              <tr><td class="px-4 py-2 border font-mono font-semibold">Go</td><td class="px-4 py-2 border">栈（逃逸分析决定，也可能堆）</td><td class="px-4 py-2 border">堆：map 桶、切片底层、逃逸对象</td><td class="px-4 py-2 border">并发标记-清扫 GC</td><td class="px-4 py-2 border">变量去哪由编译器决定，别猜</td></tr>
              <tr><td class="px-4 py-2 border font-mono font-semibold">Java</td><td class="px-4 py-2 border">栈（局部基本类型 + 引用）</td><td class="px-4 py-2 border">堆（对象 + 数组）</td><td class="px-4 py-2 border">JVM 分代 GC（可调）</td><td class="px-4 py-2 border">几乎一切对象都在堆</td></tr>
              <tr><td class="px-4 py-2 border font-mono font-semibold">Python</td><td class="px-4 py-2 border">栈（只有引用）</td><td class="px-4 py-2 border">堆（连 int 都是对象）</td><td class="px-4 py-2 border">引用计数 + 分代 GC</td><td class="px-4 py-2 border">一切皆对象，没有"值类型"</td></tr>
              <tr><td class="px-4 py-2 border font-mono font-semibold">JavaScript</td><td class="px-4 py-2 border">栈/寄存器（原始类型，V8 有小整数优化）</td><td class="px-4 py-2 border">堆（对象/数组/闭包/Map）</td><td class="px-4 py-2 border">V8 分代 GC + 空闲期回收</td><td class="px-4 py-2 border">原始值 vs 对象，闭包也上堆</td></tr>
              <tr><td class="px-4 py-2 border font-mono font-semibold">Rust</td><td class="px-4 py-2 border">栈（默认）</td><td class="px-4 py-2 border">堆（Box / String / Vec 等显式类型）</td><td class="px-4 py-2 border">无 GC：所有权 + drop 确定性回收</td><td class="px-4 py-2 border">栈优先，堆必须显式声明</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">这六种语言基本覆盖了所有策略：<strong>C 手动、Rust 编译期决定（所有权）、Go 逃逸分析自动决定、Java/JS/Python 运行时 GC</strong>。注意 Go 和 Java 有个反直觉点：<strong>Java 里几乎一切对象都在堆</strong>（栈上只有引用），而 <strong>Go 大量小对象会留在栈上</strong>——所以"引用类型一定在堆"在 Go 里不成立，详见第 5 节。</p>
        <div class="mb-4"><Code language="go" :code="goMemoryCode" title="go-where-alloc.go" /></div>
        <div class="mb-4"><Code language="js" :code="jsRefCode" title="js-ref.js" /></div>
        <div class="mb-4"><Code language="text" :code="cMallocCode" title="heap.c（text 高亮）" /></div>
        <p class="text-sm text-slate-500 leading-relaxed mb-4">Python 例：<code class="bg-slate-100 px-1 rounded text-xs font-mono">a = 1; b = a</code> 里 <code class="bg-slate-100 px-1 rounded text-xs font-mono">a</code>、<code class="bg-slate-100 px-1 rounded text-xs font-mono">b</code> 都是指向同一个 <code class="bg-slate-100 px-1 rounded text-xs font-mono">PyLong</code> 对象的引用，只是"小整数对象"被 CPython 缓存复用了（-5 ~ 256），所以看起来像值语义。Rust 例：<code class="bg-slate-100 px-1 rounded text-xs font-mono">String</code> 有三个字段（ptr + len + cap）放栈上，但字符串字节在堆，离开作用域 <code class="bg-slate-100 px-1 rounded text-xs font-mono">drop</code> 自动释放。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：V8 的内存分区</strong><br/>Chrome 的 "Memory" 面板能看到 V8 把堆分成 Young Generation（新对象，分代回收）和 Old Generation（活得久的对象）——大图变量熬过几轮 GC 就晋升老年代。你在 DevTools 里看 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Object</code> 占了多少 heap，就是"堆上数据"的直接证据。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>想知道你的 Go 服务里哪些对象上堆了？<code class="bg-teal-100 px-1 rounded text-xs font-mono">go tool pprof -alloc_space</code> 能看到按分配量排序的函数；<code class="bg-teal-100 px-1 rounded text-xs font-mono">GODEBUG=gctrace=1</code> 能看到每次 GC 前后堆大小。<strong>高并发 Go 服务的性能瓶颈，很大程度就是堆分配 + GC 压力</strong>——所以"减少分配"是 Go 优化的头号主题。</p>
        </aside>
      </section>

      <!-- 5. 为什么 map / 对象是引用 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>为什么 map / 对象是引用？四个理由 + 一个"桶搬家"的后果</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">回到最初的问题：<strong>map 的 value 到底存在哪？</strong>答案：<strong>桶数组在堆上，key 和 value 一起塞在桶里；map 变量只是一个指向桶数组的引用。</strong>那为什么必须这样？四个理由：</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>大小动态可变</strong>：往 map 里 insert 到第 7 个元素，Go 会把桶数组从 8 槽扩容成 16 槽、把旧数据全部 rehash 搬进新数组。<strong>数据结构会"整体搬家"，只有拿地址（引用）才能让搬家对调用方透明</strong>——变量里存的地址不变，指向的桶换了。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>跨函数共享可变状态</strong>：把 map 传给函数，函数往里塞数据，外面就能看到。如果按值拷贝整份桶，改了一处别的引用看不到，共享就无从谈起。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>避免拷贝开销</strong>：引用传参永远只拷一个地址（8 字节），O(1)。真要按值拷贝一份 1GB 的底层数组，谁扛得住？</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>生命周期与函数无关</strong>：map 可以在函数 A 里创建、存进全局/结构体，A 返回后数据仍在——因为它不在栈上，栈帧销毁不影响堆。</div></li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>"桶会搬家"的后果</strong>：正因为桶数组可能整体换地址，所以 Go 禁止对 map 元素取地址——<code class="bg-slate-100 px-1 rounded text-xs font-mono">&amp;m["key"]</code> 直接编译报错 <code class="bg-slate-100 px-1 rounded text-xs font-mono">cannot take the address of m["key"]</code>。你拿到地址的瞬间，下一次扩容就把那块数据搬走了，地址立刻失效。</p>
        <div class="mb-4"><Code language="go" :code="mapRefCode" title="map-ref.go" /></div>
        <div class="mb-4"><Code language="go" :code="sliceRefCode" title="slice-ref.go" /></div>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：抽屉里的便条</strong><br/>map 变量就像你<strong>办公桌上的一张便条</strong>，上面写着"仓库 3 号货架"。你把它抄给同事（传引用），大家看到的都是同一个货架——谁往货架加货（塞 key），所有人都能看到。仓库不够用了（扩容），后勤把货搬到 5 号架并悄悄换掉你的便条——你桌上的便条不用动，照常去取，这就是"地址稳定、桶搬家"。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>React 里为什么说"不要直接改 state 对象"？因为 state 是引用，直接改（mutation）是在<strong>同一份对象上改</strong>，引用相同、浅比较发现没变、UI 不更新；得 <code class="bg-purple-100 px-1 rounded text-xs font-mono">setState(prev =&gt; ({...prev, n: 1}))</code> 生成<strong>新对象</strong>替换引用。这个"引用共享 vs 新建"的纠结，根源就是对象在堆上、大家拿的是地址。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>Go 的 <code class="bg-teal-100 px-1 rounded text-xs font-mono">slice</code> 是"胖引用"：变量里是一个 3 字结构（ptr + len + cap），ptr 指向堆上的底层数组。<code class="bg-teal-100 px-1 rounded text-xs font-mono">append</code> 超过 cap 会分配新底层数组并 rehash 般"搬家"——所以 <code class="bg-teal-100 px-1 rounded text-xs font-mono">append</code> 的返回值必须重新赋值给切片变量，这正是"地址会变"的体现。同源问题，详见 <Link :route="'go-1-9-maps'" :text="'Go 的 map'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />。</p>
        </aside>
      </section>

      <!-- 6. 堆由谁回收 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>堆由谁来回收：四种哲学</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">堆上的数据"用完了"必须还回去，否则内存越吃越多（泄漏）。不同语言用不同哲学解决"谁来还、什么时候还"：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">回收哲学</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">语言</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">机制</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">代价</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">手动 free</td><td class="px-4 py-2 border font-mono">C</td><td class="px-4 py-2 border">程序员显式 <code class="bg-slate-100 px-1 rounded text-xs font-mono">free(p)</code></td><td class="px-4 py-2 border">泄漏 / double free / 悬垂指针，全凭纪律</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">所有权 + drop（RAII）</td><td class="px-4 py-2 border font-mono">C++ / Rust</td><td class="px-4 py-2 border">离开作用域自动析构，编译期保证</td><td class="px-4 py-2 border">学习曲线陡（借用检查），运行时开销≈0</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">引用计数</td><td class="px-4 py-2 border font-mono">Python / Obj-C / Swift</td><td class="px-4 py-2 border">每次赋值增减计数，归零立即释放</td><td class="px-4 py-2 border">循环引用泄漏；计数本身有开销</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">追踪式 GC</td><td class="px-4 py-2 border font-mono">Java / Go / JS</td><td class="px-4 py-2 border">标记-清扫 / 分代 / 并发三色标记</td><td class="px-4 py-2 border">回收时机不确定，可能 STW（暂停应用）</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">Go 的 GC 是<strong>并发标记-清扫</strong>：标记和清扫阶段大部分与用户程序并行，只有"启动 GC"等少数时刻有短暂 STW（目标毫秒级）。代价是——<strong>分配越猛，GC 越频繁，延迟毛刺越多</strong>。所以 Go 程序优化往往从"减少堆分配"入手。</p>
        <div class="mb-4"><Code language="go" :code="gcCode" title="gc-notes.go" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：JS 的 GC 与内存快照</strong><br/>V8 的 GC 在<strong>空闲期</strong>（idle time）回收，尽量不阻塞渲染——这就是"垃圾回收不卡页面"的努力。但如果你在回调里无脑创建闭包/对象又不释放，DevTools 的 Heap Snapshot 里就能看到"Detached DOM nodes"越堆越多——那就是堆上数据没被回收的证据（泄漏）。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>Go 服务的高 QPS 优化三板斧：<strong>减少分配</strong>（复用对象、sync.Pool）、<strong>减少逃逸</strong>（小对象别取地址返回）、<strong>调 GC 参数</strong>（<code class="bg-teal-100 px-1 rounded text-xs font-mono">GOGC=400</code> 放宽触发阈值换吞吐）。理解"堆 + 引用 + GC"这三件事，才能真正看懂这些优化手段在干嘛。</p>
        </aside>
      </section>

      <!-- 7. 常见坑 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">7</span>常见坑：五个最容易想错的点</h2>
        <div class="space-y-4 mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：以为"写了 new / 是引用类型就一定在堆上"。</strong>Go 的变量去哪由<strong>逃逸分析</strong>决定：<code class="bg-amber-100 px-1 rounded text-xs font-mono">p := new(int)</code> 如果指针没逃出当前函数，编译器可能把它放栈上；反之一个普通局部变量只要地址被返回，就逃逸去堆。<strong>别拿"写没写 new"判断位置，用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">go build -gcflags=-m</code> 看。</strong>Java 同理有栈上分配/标量替换。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：以为"栈一定比堆快、堆一定比栈慢"。</strong>快慢取决于<strong>访问局部性</strong>：一个放在堆上的大数组连续遍历，可能比散落在栈上的小对象更友好；Go 的堆分配器经过优化（mcache 无锁路径）小对象分配也很快。<strong>结论别一句话下死，先 profile 再优化。</strong></p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：以为"引用"和"指针"是两回事。</strong>底层<strong>都是地址</strong>，只是语言层面对地址的操控做了限制：Go 的 map/slice 你不能算地址、不能 <code class="bg-amber-100 px-1 rounded text-xs font-mono">&amp;m[k]</code>；C 的指针你能 <code class="bg-amber-100 px-1 rounded text-xs font-mono">p++</code> 乱跳。它们的本质差距不是"谁在堆"，而是"语言让不让你碰那个数字"。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 4：以为"堆上数据会自己消失"。</strong>C 忘了 <code class="bg-amber-100 px-1 rounded text-xs font-mono">free</code> = 泄漏；Python/Obj-C 的引用计数遇到<strong>循环引用</strong>（A→B→A）会双双不归零，照样泄漏（要靠 GC 兜底）；Go/Java 有 GC 但<strong>回收时机不确定</strong>——"对象没引用了"和"内存真被还了"之间可能隔着一整轮 GC。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 5：以为"看变量地址高低就能断言栈/堆"。</strong>不同系统、不同版本、不同优化下布局都不同；Go 的地址可能落在 runtime arena，mmap 大对象又在另一片。要查真相，用工具：Go 用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">-gcflags=-m</code>，Linux 用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">pmap /proc/&lt;pid&gt;/maps</code>，别靠地址猜。</p>
          </aside>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>判断一个数据"该在哪"就一句话——<strong>大小编译期定、寿命跟着函数走 → 栈（或内联）；大小动态、寿命跨越函数 / 要共享 → 堆 + 引用。</strong>写代码时不用管 GC，但心里要知道"我又往堆上塞了多少、什么时候会被回收"，这是做高性能服务的基本功。</p>
        </aside>
      </section>

      <!-- 8. 小结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">✅</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>堆是"地方"不是"语言特性"</strong>：每个进程地址空间都有一块堆，动态数据最终都放这。堆由 <code class="bg-slate-100 px-1 rounded text-xs font-mono">brk</code>/<code class="bg-slate-100 px-1 rounded text-xs font-mono">mmap</code> 向内核扩，物理页按需分配。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>栈 vs 堆</strong>：栈自动分配、一条指令、小但固定；堆要申请/回收、大且动态。小且短命 → 栈，大且长寿/共享 → 堆。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>值类型 vs 引用类型</strong>：值类型内联装数据，引用类型装地址。map/对象/切片因"大小动态 + 要共享"天然是引用。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>各语言差异</strong>：C 手动 free、Rust 所有权零开销、Go 逃逸分析自动选栈/堆、Java/JS/Python 靠 GC；Python 甚至"一切皆对象"。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>map 的 value 存在哪</strong>：桶数组在堆上，key+value 成对塞桶里；map 变量只是指向桶的引用。扩容 rehash 会整块搬家 → 不能对 map 元素取地址。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>堆由谁回收</strong>：手动 free / RAII 所有权 / 引用计数 / 追踪式 GC 四种哲学；Go 是并发标记-清扫，分配越多 GC 越频繁。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>别靠猜</strong>：Go 用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">go build -gcflags=-m</code>、系统用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">pmap</code>/<code class="bg-slate-100 px-1 rounded text-xs font-mono">/proc/pid/maps</code> 看真实布局。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">理解了"堆 + 引用"，可以接着看本篇的姊妹篇——<Link :route="'cs-8-c-1-stack-heap'" :text="'栈 vs 堆分配：逃逸分析与性能'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />（Go 逃逸分析的实操细节）与 <Link :route="'cs-8-c-2-gc'" :text="'GC：标记-清扫 / 分代 / 并发 / STW'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />（GC 怎么把堆收回去）。</p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-8-c-3-raii'" :text="'← 上一节：RAII：确定性析构 vs GC'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <span class="text-slate-300">已是本章最后一篇</span>
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "堆存在哪" },
  { id: "sec-2", name: "栈 vs 堆" },
  { id: "sec-3", name: "值类型 vs 引用类型" },
  { id: "sec-4", name: "各语言内存模型" },
  { id: "sec-5", name: "为什么是引用" },
  { id: "sec-6", name: "堆由谁回收" },
  { id: "sec-7", name: "常见坑" },
  { id: "sec-8", name: "小结" },
]

// ===== 代码示例 =====
const stackheapCode = `// 栈上分配 vs 堆上分配：关键在"要不要带回函数外"
package main

import "fmt"

// 返回普通 int：x 不逃逸 → 留在栈上
func stackValue() int {
    x := 42
    return x // 拷贝返回值，x 本身可以留在栈
}

// 返回指针：y 逃逸 → 被搬到堆上
func heapValue() *int {
    y := 42
    return &y // 地址要带出函数，y 只能上堆
}

func main() {
    a := stackValue() // 栈：改 SP 一条指令
    b := heapValue()  // 堆：分配 + 将来还要 GC 回收
    fmt.Println(a, *b)
}`;

const goMemoryCode = `// Go：用逃逸分析看变量到底去栈还是去堆
// 运行：go build -gcflags='-m=2' go-where-alloc.go
package main

import "fmt"

type User struct{ Name string; Age int }

func main() {
    // 1) 小对象、没逃逸 → 栈（内联）
    var n int = 1
    fmt.Println(n) // 输出时地址不会逃逸

    // 2) 显式 new + 返回指针 → 堆
    u := &User{Name: "jason", Age: 18}
    fmt.Println(u) // 编译器：u escapes to heap

    // 3) map 的桶数组一定在堆
    m := make(map[string]int) // m 是引用，桶在堆
    m["count"] = 1
    fmt.Println(m["count"])
}
// -m=2 输出片段：
//   go-where-alloc.go:14: u escapes to heap   ← 第 2 种，堆
//   go-where-alloc.go:11: n does not escape   ← 第 1 种，栈
//   （make(map) 的桶天然在堆，无需逃逸分析）`;

const jsRefCode = `// JS：对象是引用、原始值是值——一改见真章
const user = { name: 'alice' } // 对象在堆，user 只是引用
const copy = user              // 拷贝的是"引用"，不是对象
copy.name = 'bob'
console.log(user.name)         // 'bob' —— 同一个堆对象

let n = 1                      // 原始值：按值拷贝
let m = n
m = 2
console.log(n)                 // 1 —— 互不影响

// Map 也是一样：传进函数改，外面看得到
const dict = new Map()
function fill(d) { d.set('k', 'v') }
fill(dict)
console.log(dict.get('k'))     // 'v'`;

const cMallocCode = `// C：栈 vs 堆全凭你写不写 malloc（最底层、最直白）
#include <stdio.h>
#include <stdlib.h>

int main() {
    int local = 42;                    // 栈：函数返回自动释放
    int *p = (int*)malloc(sizeof(int)); // 堆：不 free 就泄漏
    *p = 7;
    printf("%d %d\\n", local, *p);
    free(p);                           // 必须手动还，否则泄漏
    return 0;
}`;

const mapRefCode = `// Go：map 是引用——函数里改，外面立刻变
package main

import "fmt"

func bump(m map[string]int) {
    m["count"] = 999 // 改的是同一份桶数组
}

func main() {
    m := make(map[string]int)
    m["count"] = 1
    bump(m)                    // 传的是引用（地址），不是拷贝
    fmt.Println(m["count"])    // 999

    // 桶数组扩容会整块搬家 → 不能取元素地址：
    // _ = &m["count"]
    // ❌ cannot take the address of m["count"]
}
// 输出: 999`;

const sliceRefCode = `// Go：slice 是"胖引用"——append 扩容 = 底层数组搬家
package main

import "fmt"

func main() {
    s := make([]int, 0, 2) // ptr+len+cap 三个字段在栈，底层数组在堆
    for i := 0; i < 10; i++ {
        s = append(s, i) // cap 满了 → 分配新数组、把旧数据拷过去
    }
    fmt.Println(s)
    // 每次扩容底层数组地址都会变——所以 append 的
    // 返回值必须赋回给 s，这正是"引用会搬家"的体现
}`;

const gcCode = `// GC 观察：看你的 Go 程序堆涨了多少、GC 跑了几轮
// 运行：GODEBUG=gctrace=1 go run gc-notes.go
package main

func main() {
    // 分配点：造 1000 万个对象，给 GC 找点活干
    for i := 0; i < 10_000_000; i++ {
        _ = make([]byte, 64) // 每个都上堆（逃逸或大对象）
    }
}
// gctrace 输出片段（含义：GC# 次数，堆大小 前→后）：
// gc 1 @0.002s 2%: 4+0.5+1 ms clock, ... heap goal 256MB
// gc 2 @0.005s 3%: 5+1+2 ms clock, ... heap goal 512MB
// 结论：分配越多 → GC 触发越频繁 → 服务延迟毛刺越多`;
</script>
