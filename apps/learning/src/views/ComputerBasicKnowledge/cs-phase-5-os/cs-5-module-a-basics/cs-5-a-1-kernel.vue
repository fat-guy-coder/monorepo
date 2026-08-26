<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">内核态 vs 用户态、系统调用机制</h1><p class="text-sm text-slate-500 mt-1">CPU 特权级、用户态/内核态切换，以及用户程序进入内核的唯一通道</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">操作系统 5-a-1</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：两级特权级 + 一条"唯一通道"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">CPU 把所有代码分成两种身份：<strong>内核态（ring 0）</strong>和<strong>用户态（ring 3）</strong>。应用跑在用户态，碰不了硬件、改不了页表；想干"越权"的事（读文件、发网络包、要内存），只能走<strong>系统调用</strong>这一条正规通道，让内核替你干，再把结果递回来。本篇就讲透这两件事：<strong>为什么分级</strong>，以及<strong>系统调用怎么走完全程</strong>。</p>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-2">
          <!-- ① 特权级环形图 -->
          <figure class="bg-slate-50 rounded-xl p-4">
            <svg viewBox="0 0 340 260" class="w-full h-auto">
              <defs>
                <marker id="kn-trap" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#f59e0b"/></marker>
                <marker id="kn-ret" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker>
              </defs>
              <text x="150" y="26" text-anchor="middle" font-size="13" font-weight="bold" fill="#475569" font-family="monospace">① CPU 特权级环形图（x86）</text>
              <!-- ring3 用户态 -->
              <circle cx="150" cy="145" r="100" fill="#e0f2fe" stroke="#06b6d4" stroke-width="1.5"/>
              <!-- ring0 内核态 -->
              <circle cx="150" cy="145" r="58" fill="#f59e0b"/>
              <text x="150" y="139" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff" font-family="monospace">ring 0</text>
              <text x="150" y="156" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff" font-family="monospace">内核态</text>
              <text x="150" y="64" text-anchor="middle" font-size="11" font-weight="bold" fill="#0891b2" font-family="monospace">ring 3 用户态</text>
              <text x="150" y="225" text-anchor="middle" font-size="9" fill="#0369a1" font-family="monospace">应用只能跑普通指令</text>
              <!-- trap 陷入 -->
              <line x1="150" y1="72" x2="150" y2="84" stroke="#f59e0b" stroke-width="1.8" stroke-dasharray="4 3" marker-end="url(#kn-trap)"/>
              <text x="156" y="80" font-size="9" fill="#b45309" font-family="monospace">syscall 陷入</text>
              <!-- 返回 -->
              <line x1="210" y1="145" x2="224" y2="145" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#kn-ret)"/>
              <text x="228" y="149" font-size="9" fill="#64748b" font-family="monospace">返回</text>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">外圈 ring 3 用户态：应用进程的日常。内圈 ring 0 内核态：握有全部特权。虚线箭头 = 应用通过系统调用"陷入"内核办完事再"返回"</figcaption>
          </figure>

          <!-- ② 系统调用完整流程时序图 -->
          <figure class="bg-slate-50 rounded-xl p-4">
            <svg viewBox="0 0 420 270" class="w-full h-auto">
              <defs>
                <marker id="kn-dn" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker>
                <marker id="kn-ct" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#f59e0b"/></marker>
                <marker id="kn-cr" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto"><path d="M8,0 L0,4 L8,8 Z" fill="#94a3b8"/></marker>
              </defs>
              <text x="210" y="24" text-anchor="middle" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">② 系统调用完整流程</text>
              <text x="100" y="48" text-anchor="middle" font-size="11" font-weight="bold" fill="#0891b2" font-family="monospace">用户态 ring 3</text>
              <text x="320" y="48" text-anchor="middle" font-size="11" font-weight="bold" fill="#b45309" font-family="monospace">内核态 ring 0</text>
              <line x1="210" y1="56" x2="210" y2="256" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 3"/>
              <!-- 用户态 boxes -->
              <rect x="18" y="60" width="184" height="34" rx="7" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.2"/>
              <text x="110" y="80" text-anchor="middle" font-size="10.5" fill="#0c4a6e" font-family="monospace">① 应用调用 printf / read（库函数）</text>
              <rect x="18" y="108" width="184" height="34" rx="7" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.2"/>
              <text x="110" y="128" text-anchor="middle" font-size="10.5" fill="#0c4a6e" font-family="monospace">② 参数放寄存器 + 系统调用号 → rax</text>
              <rect x="18" y="156" width="184" height="34" rx="7" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.2"/>
              <text x="110" y="176" text-anchor="middle" font-size="10.5" fill="#0c4a6e" font-family="monospace">③ 执行 syscall / trap 指令</text>
              <rect x="18" y="204" width="184" height="34" rx="7" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.2"/>
              <text x="110" y="224" text-anchor="middle" font-size="10.5" fill="#0c4a6e" font-family="monospace">⑥ 结果入寄存器 → 库函数返回应用</text>
              <!-- 内核态 boxes -->
              <rect x="218" y="108" width="184" height="34" rx="7" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.2"/>
              <text x="310" y="128" text-anchor="middle" font-size="10.5" fill="#78350f" font-family="monospace">④ 内核按 rax 查 syscall table 分发</text>
              <rect x="218" y="156" width="184" height="34" rx="7" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.2"/>
              <text x="310" y="176" text-anchor="middle" font-size="10.5" fill="#78350f" font-family="monospace">⑤ 内核执行服务（读写 / 调度 / 内存）</text>
              <!-- 箭头 -->
              <line x1="110" y1="94" x2="110" y2="108" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#kn-dn)"/>
              <line x1="202" y1="125" x2="218" y2="125" stroke="#f59e0b" stroke-width="1.8" marker-end="url(#kn-ct)"/>
              <text x="210" y="104" text-anchor="middle" font-size="9" fill="#b45309" font-family="monospace">trap：切换内核态</text>
              <line x1="310" y1="142" x2="310" y2="156" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#kn-dn)"/>
              <line x1="218" y1="190" x2="202" y2="190" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#kn-cr)"/>
              <text x="210" y="200" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">返回用户态</text>
              <line x1="110" y1="190" x2="110" y2="204" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#kn-dn)"/>
            </svg>
            <figcaption class="text-xs text-slate-400 mt-1">应用走库函数 → 把参数和系统调用号放进寄存器 → 执行 syscall 指令切换内核态 → 内核查表分发并执行 → 结果带回来。中途不换进程，只是特权级升降</figcaption>
          </figure>
        </div>
      </section>

      <!-- 1. CPU 特权级 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>CPU 特权级：为什么要把代码分成两等</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">如果所有程序都"想干什么就干什么"会怎样？任何一个 bug：随手往内存地址 0xFFFF 写数据，可能把操作系统自己写崩；随便改页表，能读到别的进程的密码；随便向硬盘发命令，能把整个磁盘清空。所以 CPU 设计了<strong>特权级（privilege level）</strong>——<strong>不是代码想当谁就当谁，而是 CPU 硬件强制约束你当前能执行什么指令、碰什么资源</strong>。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">架构</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">最高特权</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">最低特权</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">谁通常在哪一级</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono font-semibold">x86</td><td class="px-4 py-2 border font-mono text-xs">ring 0（内核态）</td><td class="px-4 py-2 border font-mono text-xs">ring 3（用户态）</td><td class="px-4 py-2 border">内核 / 驱动在 0；应用在 3（ring 1/2 几乎不用）</td></tr>
              <tr><td class="px-4 py-2 border font-mono font-semibold">ARM</td><td class="px-4 py-2 border font-mono text-xs">EL1（内核态）</td><td class="px-4 py-2 border font-mono text-xs">EL0（用户态）</td><td class="px-4 py-2 border">你的手机 SoC 同样分级，ELF 全名 "Executable and Linkable Format" 只是撞名，别混</td></tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">特权指令 vs 普通指令</h3>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">类型</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">例子</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用户态执行会怎样</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold text-slate-700">特权指令</td><td class="px-4 py-2 border font-mono text-xs">cli / sti（关/开中断）、lgdt / lidt（改中断表）、写 CR3（换页表）、halt</td><td class="px-4 py-2 border">触发 <code class="bg-slate-100 px-1 rounded text-xs font-mono">#GP 保护异常</code>，内核把这个进程<strong>杀掉</strong>——硬件直接拒绝</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-slate-700">普通指令</td><td class="px-4 py-2 border font-mono text-xs">add / mov / call / jmp / 算术运算</td><td class="px-4 py-2 border">畅通无阻，应用随便跑（只碰自己的内存）</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">分级之后，"操作系统的安全底线"就有了硬件背书：<strong>内核态代码（ring 0）能执行所有指令、访问所有内存和硬件；用户态代码（ring 3）只能执行普通指令、访问自己地址空间里的内存</strong>。一道异常，一条红线，谁也别想越。</p>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4">
            <p class="text-sm text-orange-800"><strong>🌍 现实类比：银行柜台</strong><br/>普通客户（用户态）只能在营业厅里办业务；金库（硬件/特权）只有持钥匙的柜员（内核态）能进。客户想取钱（IO），自己不能进金库——必须把单子递给柜员，柜员进库取钱再交给你。这就是"自己不能碰，借内核之手"。</p>
          </aside>
          <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
            <p class="text-sm text-purple-800"><strong>🔗 前端类比：浏览器沙箱</strong><br/>JS 被关在沙箱里：DOM、网络请求、localStorage 都不能直接碰，必须走浏览器内核提供的 API（≈系统调用）。某个页面崩溃，最多关掉那个 tab，不会让整个浏览器崩掉——特权级隔离的就是这个"事故隔离"。</p>
          </aside>
        </div>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>goroutine 再轻，也只是"用户态的轻量线程"——它跑的每条指令都在 ring 3。一旦触碰到文件、网络、锁、时间，就掉进 ring 0 的系统调用。你在 <code class="bg-teal-100 px-1 rounded text-xs font-mono">fmt.Println</code> 里看到的那点"慢"，大头就是这一次次 privilege 升降加真实 IO。</p>
        </aside>
      </section>

      <!-- 2. 用户态 vs 内核态 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>用户态 vs 内核态：一张表看清谁说了算</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">别把"用户态/内核态"理解成两个地方——它们是同一个 CPU 上两种<strong>特权状态</strong>。进程的线程平时在用户态跑自己的代码，需要内核服务时就"升级"进内核态跑一段内核代码，再降级回来。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">能做什么？</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">用户态 (ring 3)</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">内核态 (ring 0)</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">访问硬件（磁盘 / 网卡 / 显卡）</td><td class="px-4 py-2 border text-red-500 font-semibold">❌ 必须借系统调用</td><td class="px-4 py-2 border text-emerald-600 font-semibold">✅ 直接操作</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">修改页表 / 管理内存映射</td><td class="px-4 py-2 border text-red-500 font-semibold">❌</td><td class="px-4 py-2 border text-emerald-600 font-semibold">✅（写 CR3、建页表）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">执行特权指令（关中断等）</td><td class="px-4 py-2 border text-red-500 font-semibold">❌ 触发 #GP</td><td class="px-4 py-2 border text-emerald-600 font-semibold">✅</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">访问自己的用户内存</td><td class="px-4 py-2 border text-emerald-600 font-semibold">✅</td><td class="px-4 py-2 border text-emerald-600 font-semibold">✅（但内核代码要小心不越界）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">读其它进程的内存</td><td class="px-4 py-2 border text-red-500 font-semibold">❌ 页表隔离</td><td class="px-4 py-2 border text-emerald-600 font-semibold">✅（换页表就能看到，这是调试器/安全工具的原理）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">抢占 CPU / 调度线程</td><td class="px-4 py-2 border text-red-500 font-semibold">❌</td><td class="px-4 py-2 border text-emerald-600 font-semibold">✅ 调度器在内核</td></tr>
            </tbody>
          </table>
        </div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">为什么要切换？</h3>
        <p class="text-slate-600 mb-4 leading-relaxed">因为应用想要的资源<strong>全都不在自己手里</strong>：文件在磁盘上（内核管）、网卡发包（内核管）、新建进程（内核管）、申请内存（内核管页表）。应用不升级就永远拿不到，于是约定：<strong>凡是想做"自己不能做的事"，就得借内核之手</strong>。切换进入内核态的时机有三类——</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>系统调用（主动）</strong>：应用主动请求服务，如 read/write。本篇主角。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>异常（被动）</strong>：应用自己出错，如除零、访问空指针、执行特权指令 → 内核接管处理。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>外部中断（异步）</strong>：硬件事件来了，如网卡收到包、时钟滴答 → 内核处理完再回来。</div></li>
        </ol>
        <p class="text-sm text-slate-500 mb-4">后两类是下一篇的主角：<Link :route="'cs-5-a-2-interrupt'" :text="'中断与异常处理'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：权限与提权</strong><br/>普通用户（用户态）没有 <code class="bg-purple-100 px-1 rounded text-xs font-mono">sudo</code> 不能装系统级包、不能改全局配置；<code class="bg-purple-100 px-1 rounded text-xs font-mono">sudo</code> 临时提权（≈系统调用切到内核态）办完立刻退回来。前端同理：页面里的 JS 想读文件？必须经过 <code class="bg-purple-100 px-1 rounded text-xs font-mono">FileSystem Access API</code>，而不是直接读磁盘。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>GMP 里 G（goroutine）在用户态排队执行，看起来轻如鸿毛。但遇到真正的阻塞式 IO 就露馅——<code class="bg-teal-100 px-1 rounded text-xs font-mono">os.File.Read</code> 底层的 <code class="bg-teal-100 px-1 rounded text-xs font-mono">read(2)</code> 得进内核态。所以 Go 用非阻塞 IO + netpoller 尽量"少进内核"，详见第 7 节。</p>
        </aside>
      </section>

      <!-- 3. 系统调用是什么 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>系统调用是什么：内核给用户程序的"服务接口"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>系统调用（system call）</strong>是操作系统内核提供的一组"服务入口"，是<strong>用户程序进入内核态的唯一正规途径</strong>。它不是函数指针、不是 Go 标准库——而是一组<strong>编号 + 参数约定</strong>：应用把"想要什么服务、参数放哪"告诉 CPU，CPU 切到内核态，内核按编号找到对应实现并执行。</p>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">系统调用 ≈ 内核的"API"；库函数 ≈ 应用侧的"封装层"</p>
          <p class="text-xs text-amber-600 text-center">printf 不是系统调用，write 才是。库函数负责格式化、缓冲、组合多个系统调用，让你用得爽——但最终干活的是内核</p>
        </div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">系统调用 ≠ 库函数：对照表</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">你在 C 里写 <code class="bg-slate-100 px-1 rounded text-xs font-mono">printf</code>、在 Go 里写 <code class="bg-slate-100 px-1 rounded text-xs font-mono">fmt.Println</code>——这些都是<strong>库函数</strong>。它们内部最终会调用<strong>系统调用</strong>。差在"职责"：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">系统调用（内核实现）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">对应库函数</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">作用</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">read</td><td class="px-4 py-2 border font-mono text-xs">fread / bufio.Scanner</td><td class="px-4 py-2 border">从文件描述符读字节</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">write</td><td class="px-4 py-2 border font-mono text-xs">fwrite / fmt.Println</td><td class="px-4 py-2 border">把字节写到文件描述符</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">open</td><td class="px-4 py-2 border font-mono text-xs">fopen / os.Open</td><td class="px-4 py-2 border">打开文件，返回 fd</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">close</td><td class="px-4 py-2 border font-mono text-xs">fclose / f.Close</td><td class="px-4 py-2 border">关闭 fd</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">fork / clone</td><td class="px-4 py-2 border font-mono text-xs">—（应用很少直接调）</td><td class="px-4 py-2 border">创建子进程 / 线程</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">execve</td><td class="px-4 py-2 border font-mono text-xs">exec 系列</td><td class="px-4 py-2 border">用新程序替换当前进程映像</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">mmap</td><td class="px-4 py-2 border font-mono text-xs">—（Go runtime 自己用）</td><td class="px-4 py-2 border">把文件/匿名内存映射进地址空间</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">clock_gettime</td><td class="px-4 py-2 border font-mono text-xs">time.Now()</td><td class="px-4 py-2 border">读墙钟/单调时钟</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">POSIX 的意义就在这：<strong>只要内核遵循 POSIX 系统调用接口（read/write/open/…），上层程序在 Linux/macOS/BSD 间就能复用</strong>。Go 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">os</code> 包就是跨平台地封装这些系统调用。</p>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：点菜与后厨</strong><br/>系统调用是菜单上的一道菜（"青椒肉丝" = <code class="bg-orange-100 px-1 rounded text-xs font-mono">read</code>），库函数是服务员帮你把"不要辣、多放盐"这些要求翻译成后厨能执行的指令。你（用户态）不能进后厨，只能通过服务员把需求递给厨师（内核态）。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：fetch 与浏览器底层</strong><br/>你在 JS 里写 <code class="bg-purple-100 px-1 rounded text-xs font-mono">fetch('/api')</code>（≈库函数），它内部由浏览器引擎去发网络请求（≈系统调用）。你永远没法在 JS 里自己握一个 TCP socket 裸发数据——就像应用没法绕开系统调用直接操作网卡。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>Go 标准库就是对系统调用的"厚封装"：<code class="bg-teal-100 px-1 rounded text-xs font-mono">net/http</code> → <code class="bg-teal-100 px-1 rounded text-xs font-mono">net</code> → <code class="bg-teal-100 px-1 rounded text-xs font-mono">syscall</code> 包。你在业务里写 <code class="bg-teal-100 px-1 rounded text-xs font-mono">io.Copy(dst, resp.Body)</code>，最底层是 N 次 <code class="bg-teal-100 px-1 rounded text-xs font-mono">read(2)</code>/<code class="bg-teal-100 px-1 rounded text-xs font-mono">write(2)</code>。所以"一次请求多少次系统调用"直接决定你后端的吞吐天花板。</p>
        </aside>
      </section>

      <!-- 4. 系统调用完整流程 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">⭐</span>系统调用完整流程：一次 write 的 6 步旅行</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">以"把一行字写到标准输出"为例（<code class="bg-slate-100 px-1 rounded text-xs font-mono">write(1, "hi", 2)</code>），拆成 6 步——这是本篇的<strong>核心主线</strong>，对照第 0 节右图看：</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>应用调用库函数</strong>：Go 里 <code class="bg-slate-100 px-1 rounded text-xs font-mono">fmt.Println("hi")</code>，C 里 <code class="bg-slate-100 px-1 rounded text-xs font-mono">printf("hi")</code>。此刻还在用户态，库函数负责格式化/缓冲。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>参数进寄存器 + 系统调用号装进 rax</strong>（Linux x86_64）：<code class="bg-slate-100 px-1 rounded text-xs font-mono">rax = 1</code>（write 的编号）、<code class="bg-slate-100 px-1 rounded text-xs font-mono">rdi = fd</code>、<code class="bg-slate-100 px-1 rounded text-xs font-mono">rsi = 缓冲区地址</code>、<code class="bg-slate-100 px-1 rounded text-xs font-mono">rdx = 长度</code>。这一步是"填表单"。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>执行 <code class="bg-slate-100 px-1 rounded text-xs font-mono">syscall</code> 指令</strong>（x86-64 快速路径；老式 <code class="bg-slate-100 px-1 rounded text-xs font-mono">int 0x80</code> 已弃用）：CPU 硬件把<strong>当前特权级升到 ring 0</strong>，切换栈到内核栈，跳到内核入口——<strong>特权级切换发生在这条指令内部，这是最接近"魔法"的一步</strong>。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>内核按 rax 查 syscall table</strong>：内核维护一张 <code class="bg-slate-100 px-1 rounded text-xs font-mono">sys_call_table[]</code> 跳转表，<code class="bg-slate-100 px-1 rounded text-xs font-mono">sys_call_table[rax]</code> 就是 <code class="bg-slate-100 px-1 rounded text-xs font-mono">sys_write</code> 的实现——这就是"分发"。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>内核执行对应服务</strong>：<code class="bg-slate-100 px-1 rounded text-xs font-mono">sys_write</code> 把用户缓冲区的字节复制到终端/管道/文件。期间可能读页缓存、调度、发 IO 到磁盘——真正的"活"在这。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span><div class="text-slate-600"><strong>结果放寄存器，返回用户态</strong>：<code class="bg-slate-100 px-1 rounded text-xs font-mono">rax = 写入字节数</code>（或负的错误码），<code class="bg-slate-100 px-1 rounded text-xs font-mono">sysret</code> 指令把特权级降回 ring 3，切回用户栈，库函数拿到返回值递给应用。</div></li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">整段旅程里<strong>没有换进程</strong>——同一个线程先以用户态身份跑、再以内核态身份跑，只是<strong>特权级升降</strong>。这套流程快得惊人（x86-64 上裸 <code class="bg-slate-100 px-1 rounded text-xs font-mono">syscall</code> 往返约几十纳秒），真正慢的是第 5 步背后的磁盘/网络/锁。</p>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么参数"放寄存器"而不是"压栈"？</strong>栈也在内存里，读内存比读寄存器慢、还要多一次内存访问。寄存器是 CPU 内部最快的存储，6 个通用寄存器就够放系统调用的 6 个参数了（rdi/rsi/rdx/r10/r8/r9）。这也是与普通函数调用（用栈）的直观差别。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>这一趟 6 步，Go 的 <code class="bg-teal-100 px-1 rounded text-xs font-mono">fmt.Println</code> 每次执行都要走一遍。如果一个 HTTP 服务每请求做 20 次小 write，那就是 20 次特权级切换 + 20 次 sysret。所以生产上常用 <code class="bg-teal-100 px-1 rounded text-xs font-mono">bufio.Writer</code> 攒一批再 <code class="bg-teal-100 px-1 rounded text-xs font-mono">Flush</code>，把 N 次小系统调用合并成一次大的——省的就是这趟往返。</p>
        </aside>
      </section>

      <!-- 5. 模式切换 vs 上下文切换 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>模式切换 vs 上下文切换：别把两个"切换"混为一谈</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">很多人以为"系统调用"和"进程切换"是一回事——<strong>完全不是</strong>。系统调用只是<strong>同一进程内部的特权级升降</strong>（模式切换），而上下文切换是<strong>从进程 A 换成进程 B</strong>。两者成本天差地别：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">模式切换（mode switch）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">上下文切换（context switch）</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">本质</td><td class="px-4 py-2 border">特权级升降（ring3 ↔ ring0），<strong>不换进程</strong></td><td class="px-4 py-2 border">换 CPU 上的执行流（进程/线程/协程），<strong>换人</strong></td></tr>
              <tr><td class="px-4 py-2 border font-semibold">要保存什么</td><td class="px-4 py-2 border">切栈（用户栈 ↔ 内核栈）+ 少量寄存器</td><td class="px-4 py-2 border">全部寄存器 + 栈指针 + PC + 页表（换进程时）+ TLB 失效</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">谁触发</td><td class="px-4 py-2 border">系统调用 / 异常 / 中断</td><td class="px-4 py-2 border">调度器主动切换 / 阻塞 / 时间片用完</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">开销</td><td class="px-4 py-2 border font-mono text-xs">几十 ns，非常快</td><td class="px-4 py-2 border font-mono text-xs">数百 ns ~ 数 µs，换进程更贵（TLB 全废）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">会不会被"看到"</td><td class="px-4 py-2 border">进程无感，自己没换</td><td class="px-4 py-2 border">CPU 上的人变了，另一段代码在跑</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">一句话记法：<strong>模式切换是"同一个员工换个制服进金库"，上下文切换是"换一个员工来上班"</strong>。系统调用导致的是前者；只有当系统调用阻塞（比如等磁盘）、内核发现需要调度别的线程时，才会进一步发生上下文切换。</p>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>goroutine 的切换是<strong>用户态上下文切换</strong>（runtime 自己保存 G 的栈和寄存器，几十 ns），比内核线程的上下文切换便宜一个量级——这是 Go 能开百万 goroutine 的根基。但当 G 陷入<strong>阻塞式系统调用</strong>时，runtime 会把 G 绑定的 M 换给别的 G（M 交接），这就涉及真正的内核级调度了。见第 7 节与 <Link :route="'go-2-1-goroutine-gmp'" :text="'Go 的 GMP 模型'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />。</p>
        </aside>
      </section>

      <!-- 6. strace 观察系统调用 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>用 strace 亲眼看到系统调用</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">Linux 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">strace</code> 能在<strong>用户态拦截并记录每一次系统调用</strong>——把上文的 6 步流程变成白纸黑字。它不侵入应用，只在入口记录（本质靠 <code class="bg-slate-100 px-1 rounded text-xs font-mono">ptrace</code> 或 <code class="bg-slate-100 px-1 rounded text-xs font-mono">seccomp</code>）。</p>
        <div class="mb-4"><Code language="bash" :code="straceCode" title="📟 strace 追踪系统调用" /></div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">输出里 <code class="bg-slate-100 px-1 rounded text-xs font-mono">write(1, "hi\n", 3) = 3</code> 就是一次完整的第 4/5/6 步：系统调用号 <code class="bg-slate-100 px-1 rounded text-xs font-mono">write</code>，fd=1（stdout），写了 3 字节，返回 3。<strong>一个 hello world 进程的启动就要几十次系统调用</strong>（openat/mmap/brk/clone…）——这很正常，是初始化开销。</p>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>strace 只在你需要"程序到底调用了哪些内核接口"时用。它会把每次系统调用都记录下来，<strong>拖慢程序 10~100 倍</strong>——别在生产进程上开 strace，这是调试/逆向/学习工具。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>排查"Go 服务为什么卡在 D 状态 / 为什么一直写磁盘"，第一招就是 <code class="bg-teal-100 px-1 rounded text-xs font-mono">strace -f -p &lt;pid&gt;</code> 看它在等哪个系统调用；配合 <code class="bg-teal-100 px-1 rounded text-xs font-mono">-c</code> 统计，能立刻看出系统调用热点在 read 还是 write 还是 futex。</p>
        </aside>
      </section>

      <!-- 7. 与 Go 底层实现的关系 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">7</span>与 Go 底层实现的关系：你的每次 IO 都这么走</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">理解系统调用后，Go 的很多"魔法"就透明了。从上到下分四层：</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>syscall 封装层</strong>：Go 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">os</code> / <code class="bg-slate-100 px-1 rounded text-xs font-mono">net</code> 包最终调用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">syscall</code> 包（用户态）或 <code class="bg-slate-100 px-1 rounded text-xs font-mono">internal/syscall</code>（runtime 内部）。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>runtime 如何触发</strong>：runtime 在 <code class="bg-slate-100 px-1 rounded text-xs font-mono">asm_amd64.s</code> 用汇编实现 <code class="bg-slate-100 px-1 rounded text-xs font-mono">syscall</code>/<code class="bg-slate-100 px-1 rounded text-xs font-mono">syscall6</code>——把参数放进 rdi/rsi/rdx，把系统调用号放进 rax，然后执行 <code class="bg-slate-100 px-1 rounded text-xs font-mono">SYSCALL</code> 指令。这正是第 4 节第 2/3 步。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>netpoller 为什么绕开阻塞</strong>：网络 fd 被设为 <code class="bg-slate-100 px-1 rounded text-xs font-mono">O_NONBLOCK</code>，read 不到数据就返回 <code class="bg-slate-100 px-1 rounded text-xs font-mono">EAGAIN</code>（不阻塞！）；Go 把它注册进 <code class="bg-slate-100 px-1 rounded text-xs font-mono">epoll</code>（Linux），用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">epoll_wait</code> 统一等事件。这样"等网络数据"不再让 M 卡在内核态 read 上。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>G 陷入阻塞系统调用时 M 交接</strong>：真碰上阻塞式系统调用（磁盘 IO、持锁的 futex），runtime 把这个 <strong>G 和它绑定的 M 解绑</strong>，M 拿去执行其它可运行的 G；等那个系统调用返回，G 再找一个空闲 M 继续跑——这就是 GMP 里的"handoff"，避免一个阻塞的 G 独占一个 M。</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="osSyscallCode" title="os-read-write.go" /></div>
        <div class="mb-4"><Code language="go" :code="rawSyscallCode" title="raw-syscall.go" /></div>
        <div class="mb-4"><Code language="go" :code="netpollerCode" title="netpoller-idea.go" /></div>
        <p class="text-sm text-slate-500 leading-relaxed mb-4">想深入 G 与 M 的调度细节，跳转：<Link :route="'go-2-1-goroutine-gmp'" :text="'Go 的 goroutine 与 GMP 模型'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'cs-5-b-3-thread'" :text="'线程与进程（CS 基础）'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>netpoller ≈ Node.js 的 <strong>event loop</strong>：IO 都是非阻塞的，发起请求（≈注册回调）就交还控制权，数据到了再唤醒。Go 的 netpoller 就是 Go 版"事件循环"，靠的是内核的 epoll（这也是个系统调用）。</p>
        </aside>
      </section>

      <!-- 8. 常见坑 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">8</span>常见坑：三个最容易想错的点</h2>
        <div class="space-y-4 mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：以为"库函数 = 系统调用"。</strong><code class="bg-amber-100 px-1 rounded text-xs font-mono">printf</code> 是库函数，<code class="bg-amber-100 px-1 rounded text-xs font-mono">write</code> 才是系统调用。库函数还自带缓冲——<code class="bg-amber-100 px-1 rounded text-xs font-mono">printf("a"); printf("b")</code> 可能只触发<strong>一次</strong> write；缓冲满了/换行/退出才真正落盘。别拿"我调用了 100 次 printf"去推断"100 次系统调用"。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：以为"系统调用每次都巨贵"。</strong>裸的模式切换（syscall/sysret）在现代 x86-64 上只有几十纳秒——不是瓶颈。真正的成本在系统调用背后的<strong>真实 IO、调度、锁、缓存未命中</strong>。所以别因为"少调系统调用"把代码拧成不可读的一坨；该关注的是减少阻塞式 IO、合并小写、避免忙等。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：以为"用户态非法操作只会静默失败"。</strong>用户态执行特权指令会触发 <code class="bg-amber-100 px-1 rounded text-xs font-mono">#GP</code> 保护异常 → 内核把<strong>那个进程杀掉</strong>（你看到的是 Segmentation Fault），不会污染内核。但反过来也说明：<strong>内核态代码（驱动、内核模块）出错才会导致内核 panic</strong>——所以驱动是系统里最危险的部分。你的应用哪怕疯狂崩溃，系统一般还活着。</p>
          </aside>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>能用一次系统调用完成就别拆两次；能攒批写就攒批（bufio）；能用非阻塞 IO + 事件就绝不用阻塞 IO 占着 M（Go 的 net 包已经替你做了）；最后用 strace 实测热点，别猜。</p>
        </aside>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">✅</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>特权级分级</strong>：CPU 硬件强制约束代码权限。内核态 ring 0（能碰硬件/页表/特权指令），用户态 ring 3（只能跑普通指令、碰自己的内存）。ARM 对应 EL1/EL0。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>用户态 vs 内核态</strong>：一张表看清——访问硬件、改页表、执行特权指令、调度，全部是内核专属；应用想干这些必须"借内核之手"。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>系统调用</strong>：用户程序进入内核态的唯一正规途径；<strong>库函数 ≠ 系统调用</strong>，printf 是封装，write 才是内核接口。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>完整流程 6 步</strong>：库函数 → 参数进寄存器 + 调用号进 rax → <code class="bg-slate-100 px-1 rounded text-xs font-mono">syscall</code> 指令切换内核态 → 按 rax 查 syscall table → 内核执行服务 → 结果返回用户态。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>模式切换 vs 上下文切换</strong>：系统调用是<strong>同一进程内的特权级升降</strong>（几十 ns）；上下文切换是<strong>换执行流</strong>（数百 ns~数 µs，换进程更贵）。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>strace</strong> 把每次系统调用变成日志，是观察内核接口的标准工具。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>Go 的联系</strong>：每次 fmt.Println / 文件 / 网络都是系统调用；runtime 用非阻塞 IO + netpoller 减少阻塞；G 陷进阻塞系统调用时 M 会被交接。详见 <Link :route="'go-2-1-goroutine-gmp'" :text="'Go GMP 模型'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> 与 <Link :route="'cs-5-b-3-thread'" :text="'线程与进程'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">下一篇接上"为什么要切进内核态"的另一半：硬件事件来了怎么办——<Link :route="'cs-5-a-2-interrupt'" :text="'中断与异常处理'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />。</p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-5-a-0-os-intro'" :text="'← 上一节：操作系统介绍：它是什么、做什么用'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-5-a-2-interrupt'" :text="'下一节：中断与异常处理 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "CPU 特权级" },
  { id: "sec-2", name: "用户态 vs 内核态" },
  { id: "sec-3", name: "系统调用是什么" },
  { id: "sec-4", name: "⭐ 系统调用完整流程" },
  { id: "sec-5", name: "模式切换 vs 上下文切换" },
  { id: "sec-6", name: "strace 观察系统调用" },
  { id: "sec-7", name: "与 Go 底层实现的关系" },
  { id: "sec-8", name: "常见坑" },
  { id: "sec-9", name: "小结" },
]

// ===== 代码示例 =====
const straceCode = `# 用 strace 观察"一次 hello world"到底发了多少系统调用
$ cat <<'EOF' > /tmp/hw.go
package main
import "fmt"
func main() { fmt.Println("hi") }
EOF

$ go build -o /tmp/hw /tmp/hw.go

# -c 汇总统计每个系统调用被调了多少次
$ strace -c /tmp/hw
% time     seconds  usecs/call     calls    errors syscall
------ ----------- ----------- --------- --------- ----------------
  0.00    0.000000           0        25           read
  0.00    0.000000           0        17           write
  0.00    0.000000           0        33           openat
  0.00    0.000000           0        24           mmap
  0.00    0.000000           0         6           clone
  ...   # 启动一个进程就要几十次系统调用（初始化开销，正常）

# 只看写操作：-e trace=write 只跟踪 write
$ strace -e trace=write /tmp/hw 2>&1 | head
write(1, "hi\\n", 3) = 3      # fd=1 标准输出，写入 3 字节，返回 3`;

const osSyscallCode = `// 把"读一个文件再打印"这件小事拆成系统调用
package main

import (
    "os"
)

func main() {
    // open(2)：打开文件，返回文件描述符 fd
    f, err := os.Open("/tmp/demo.txt")
    if err != nil { panic(err) }
    defer f.Close()

    // read(2)：从 fd 读字节到缓冲区（陷入内核：查页缓存 / 读磁盘）
    buf := make([]byte, 64)
    n, err := f.Read(buf)
    if err != nil { panic(err) }

    // write(2)：把读到的内容写回标准输出（fd=1）
    os.Stdout.Write(buf[:n])
}
// 输出: 文件的前 64 字节（若文件不满 64 字节则全部内容）`;

const rawSyscallCode = `// 绕过标准库，直接发系统调用（仅演示概念，日常千万别这么干）
package main

import (
    "syscall"
    "unsafe"
)

func main() {
    const SYS_WRITE = 1          // Linux x86_64：write 的系统调用号
    msg := []byte("direct syscall!\\n")

    // 参数约定：rax=系统调用号, rdi=fd, rsi=缓冲区, rdx=长度
    // —— 这正是系统调用流程的"第 2 步"
    n, _, err := syscall.Syscall(SYS_WRITE, uintptr(1),
        uintptr(unsafe.Pointer(&msg[0])), uintptr(len(msg)))
    _ = n
    if err != 0 { panic(err) }
}
// 输出: direct syscall!`;

const netpollerCode = `// 非阻塞 IO + netpoller 的核心思路（net 包内部概念示意）
// fd 设为非阻塞：读不到数据立刻返回 EAGAIN，而不是卡死在内核态 read
fd := nonblock(f)                      // 内部: fcntl(fd, F_SETFL, O_NONBLOCK)

// 把 fd 注册进 epoll（epoll_ctl 是系统调用）
epollCtl(epfd, ADD, fd, EPOLLIN)       // 有数据可读时，内核会唤醒等待者

// 轮询线程调用 epoll_wait（阻塞在这一个系统调用上，同时等成百上千个 fd）
ready := epollWait(epfd)               // 返回"有哪些 fd 就绪了"

// G 阻塞"等数据"时并不占着 M：M 被拿去跑别的 G，数据一到再唤醒对应 G
// —— 这就是 Go 大量并发网络 IO 而不开海量线程的根基`;
</script>
