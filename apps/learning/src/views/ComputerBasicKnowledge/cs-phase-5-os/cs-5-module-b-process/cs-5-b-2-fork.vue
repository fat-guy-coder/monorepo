<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">进程创建：fork / exec / wait</h1><p class="text-sm text-slate-500 mt-1">一次 fork 两次返回——从"复制进程"到 COW 写时复制，再到与 goroutine 的创建成本对比</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">操作系统 5-b-2</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：fork 的两次返回 + COW 写时复制</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">Unix 创建进程只有一个入口：<strong>fork()</strong>。它把当前进程"复制"出一份，于是<strong>调用一次、返回两次</strong>——父进程拿到子进程的 PID，子进程拿到 0。复制整个地址空间太贵，现代 Linux 用 <strong>COW（写时复制）</strong>：父子先共享同一批物理页（只读），谁写入才真正复制那一页。</p>

        <!-- 结构图：fork 流程 + COW 共享物理页 -->
        <figure class="mb-4">
          <svg viewBox="0 0 760 330" class="w-full h-auto">
            <defs><marker id="arrow2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker></defs>
            <!-- fork 流程 -->
            <text x="30" y="20" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">fork() 流程：调用一次，返回两次</text>
            <rect x="300" y="32" width="160" height="44" rx="8" fill="#06b6d4"/>
            <text x="380" y="59" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff" font-family="monospace">父进程 P</text>
            <!-- 分叉箭头 -->
            <line x1="352" y1="76" x2="190" y2="126" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow2)"/>
            <line x1="408" y1="76" x2="588" y2="126" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow2)"/>
            <text x="205" y="116" text-anchor="middle" font-size="10" fill="#92400e" font-family="monospace">子进程返回 0</text>
            <text x="593" y="116" text-anchor="middle" font-size="10" fill="#0369a1" font-family="monospace">父进程返回子 PID</text>
            <!-- 子 / 父 -->
            <rect x="90" y="130" width="180" height="46" rx="8" fill="#f59e0b"/>
            <text x="180" y="148" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">子进程 child</text>
            <text x="180" y="164" text-anchor="middle" font-size="10" fill="#fff7ed" font-family="monospace">fork()==0 → 执行"孩子逻辑"</text>
            <rect x="490" y="130" width="180" height="46" rx="8" fill="#06b6d4"/>
            <text x="580" y="148" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff" font-family="monospace">父进程 parent</text>
            <text x="580" y="164" text-anchor="middle" font-size="10" fill="#e0f2fe" font-family="monospace">fork()==子PID → 执行"父逻辑"</text>
            <!-- COW -->
            <text x="30" y="206" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">写时复制 COW：父子地址空间 → 共享同一批物理页（只读）</text>
            <rect x="90" y="220" width="160" height="40" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="170" y="244" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e" font-family="monospace">子 虚拟页表</text>
            <rect x="510" y="220" width="160" height="40" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="590" y="244" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1" font-family="monospace">父 虚拟页表</text>
            <!-- 共享物理页 -->
            <rect x="328" y="223" width="55" height="30" rx="5" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
            <text x="355" y="242" text-anchor="middle" font-size="10" font-weight="bold" fill="#b91c1c" font-family="monospace">页A</text>
            <rect x="388" y="223" width="55" height="30" rx="5" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
            <text x="415" y="242" text-anchor="middle" font-size="10" font-weight="bold" fill="#b91c1c" font-family="monospace">页B</text>
            <rect x="448" y="223" width="55" height="30" rx="5" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5"/>
            <text x="475" y="242" text-anchor="middle" font-size="10" font-weight="bold" fill="#b91c1c" font-family="monospace">页C</text>
            <!-- 共享箭头 -->
            <line x1="250" y1="240" x2="326" y2="240" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow2)"/>
            <line x1="510" y1="240" x2="434" y2="240" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow2)"/>
            <!-- 说明 -->
            <text x="30" y="288" font-size="11" fill="#64748b" font-family="monospace">任一进程写入页A → 触发缺页 → 内核复制出独立页（只有这一页被复制，其余仍共享）</text>
            <text x="30" y="306" font-size="11" fill="#64748b" font-family="monospace">好处：fork 几乎不拷贝数据（只复制页表），大进程瞬间完成</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">左上：fork 分叉两次返回；下方：COW 让父子虚拟页表指向同一批物理页（红框），写入才触发复制</figcaption>
        </figure>
      </section>

      <!-- 1. fork -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>fork()：调用一次，返回两次</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">fork 是 Unix 世界创建进程的<strong>唯一系统调用</strong>：内核把<strong>当前进程</strong>复制出一份几乎一样的副本（新 PCB、新 PID、独立地址空间），父子从 <code class="bg-slate-100 px-1 rounded text-xs font-mono">fork()</code> 返回的那一行继续执行。关键在返回值——它决定了你此刻是"父"还是"子"：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">fork() 返回值</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">含义</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">执行分支</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs text-cyan-700">&gt; 0（= 子进程 PID）</td><td class="px-4 py-2 border">我在父进程里</td><td class="px-4 py-2 border">执行"父亲逻辑"</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-amber-700">== 0</td><td class="px-4 py-2 border">我在子进程里</td><td class="px-4 py-2 border">执行"孩子逻辑"</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs text-red-600">== -1</td><td class="px-4 py-2 border">创建失败（进程数达上限等）</td><td class="px-4 py-2 border">处理 errno</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="forkCCode" title="fork.c（C 语言）" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 关键心法：</strong>fork 之后父子执行的是<strong>同一段代码</strong>（main 后面所有语句两遍都跑），只是各自看到的 <code class="bg-blue-100 px-1 rounded text-xs font-mono">pid</code> 值不同。写代码的思路就是：<code class="bg-blue-100 px-1 rounded text-xs font-mono">if (pid == 0) {孩子的事} else {父亲的事}</code>，用分支把两个世界切开。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>fork ≈ 给组件做一次<strong>深拷贝</strong>——复制出一份初始数据完全相同的实例（state 相同），但从此各走各的。返回两次 ≈ 构造函数里，父组件拿到 <code class="bg-purple-100 px-1 rounded text-xs font-mono">childRef</code>，而子实例自己知道"我是副本"（返回 0）。之后你改父的 state、它改子的 state，互不干扰——这就是"独立地址空间"。</p>
        </aside>
      </section>

      <!-- 2. COW -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>传统复制 → COW 写时复制</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">早期 Unix 的 fork 会把父进程的<strong>整个地址空间</strong>复制一份给子进程——一个几 GB 的进程 fork 一次就拷几 GB，慢到离谱。现代 Linux 改用 <strong>COW（Copy-On-Write，写时复制）</strong>：<strong>先共享、谁写谁才复制</strong>。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">COW 执行流程</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>fork 时</strong>：不复制物理页，只复制父进程的<strong>页表</strong>，并把父子所有页表项都指向<strong>同一批物理页</strong>，同时把这些页标记为<strong>只读</strong>。</li>
          <li><strong>只读访问</strong>：命中页表直接读，无任何打断——90% 的场景（比如 fork 后立即 exec）根本没有写，全程零拷贝。</li>
          <li><strong>首次写入</strong>：CPU 发现该页只读却要写 → 触发<strong>缺页异常</strong>（页面保护错误）。</li>
          <li><strong>内核处理</strong>：分配一个新物理页，把旧页内容<strong>复制</strong>过去，把<strong>当前进程</strong>的页表项指向新页并设为可写；旧页仍归另一方。</li>
          <li><strong>分道扬镳</strong>：从此只有被写的那一页被拆开，其余页继续共享；写第二页就再拆第二页……</li>
        </ol>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">COW = 用"延迟复制"换来"几乎零成本的 fork"</p>
          <p class="text-xs text-amber-600 text-center">对程序员完全透明：你感知不到任何差异。代价是首次写某页会慢一拍（缺页 + 拷贝），且 fork 后父子立刻都写大量内存时，复制成本会原样返回</p>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 组合拳：</strong>典型套路 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">fork()</code> 后子进程马上 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">exec()</code> 换程序——复制出来的旧进程几乎不写任何内存，COW 让它几乎免费。这就是 fork+exec 能成为 Unix 最主流进程创建方式的原因。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>COW ≈ 框架里的<strong>不可变数据 + 结构共享</strong>（Immutable.js 的 Trie）——修改前大家共享同一个对象，只在你改的那一条路径上才做拷贝，其余引用继续复用。fork 只复制"引用表"（页表），谁真动手谁才付拷贝的账。</p>
        </aside>
      </section>

      <!-- 3. exec -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>exec 族：PID 不变，镜像全换</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">fork 只是"复制"，复制出来的还是同一个程序。想变成<strong>另一个程序</strong>要用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">execve()</code>：它用磁盘上新程序的镜像（ELF）<strong>替换当前进程的代码段、数据段、堆、栈</strong>，然后从新程序入口重新开始。注意：<strong>PID 不变</strong>——换的只是"内容"，不是"户口本"。</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>exec 成功不返回</strong>：新的镜像从头执行；只有失败才返回 -1。所以 exec 后面通常紧跟 <code class="bg-slate-100 px-1 rounded text-xs font-mono">perror + exit</code>。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>保留项</strong>：PID、打开的文件描述符（除非设了 <code class="bg-slate-100 px-1 rounded text-xs font-mono">FD_CLOEXEC</code>）、当前工作目录、信号处置等。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>execl / execv / execlp / execvp</strong> 都只是 execve 的 libc 封装，区别在参数是列表还是数组、要不要走 PATH 搜索。</span></li>
        </ul>
        <h3 class="text-base font-semibold text-slate-700 mb-2">Go 视角：不暴露 fork，日常用 exec.Command 起子进程</h3>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">Go 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">os/exec</code> 把 <strong>fork + exec + wait 打包</strong>成一个 API：你要"跑另一个程序"，一句 <code class="bg-slate-100 px-1 rounded text-xs font-mono">exec.Command(...)</code> 就够，底层在 Unix 上正是 <code class="bg-slate-100 px-1 rounded text-xs font-mono">syscall.ForkExec</code>。</p>
        <div class="mb-4"><Code language="go" :code="execGoCode" title="exec-child/main.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么不是 spawn()：</strong>Unix 把"复制进程"（fork）和"换程序"（exec）拆成两个原语，而不是合成一个 <code class="bg-blue-100 px-1 rounded text-xs font-mono">spawn</code>。好处是<strong>可自由组合</strong>：你可以在 fork 后、exec 前，先重定向文件描述符、改权限、设置环境——"机制"与"策略"分离，这是 Unix 的设计哲学。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>exec ≈ 用<strong>另一个组件替换当前渲染</strong>——同一个挂载点（key/PID 不变），把 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Modal</code> 换成 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Table</code>，DOM 容器还是那个，里面渲染的内容焕然一新。而 fork+exec 组合 ≈ 先 clone 一个工作区（深拷贝），再在里面 git checkout 另一个分支。</p>
        </aside>
      </section>

      <!-- 4. wait -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>wait / waitpid：回收孩子，防止僵尸</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">子进程 <code class="bg-slate-100 px-1 rounded text-xs font-mono">exit()</code> 时并不会立刻消失——内核还要留着它的 <strong>PCB</strong>（里面有退出码），等父进程来"领走"结果。父进程用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">wait()</code> / <code class="bg-slate-100 px-1 rounded text-xs font-mono">waitpid()</code> 阻塞等待，取走退出码后内核才释放 PCB。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">状态流转</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>运行中</strong>：子进程正常执行。</li>
          <li><strong>子进程 exit()</strong>：内核发 <code class="bg-slate-100 px-1 rounded text-xs font-mono">SIGCHLD</code> 给父进程，子进程变为<strong>僵尸态 Z</strong>（PCB 保留、资源已释放，只占一个 PCB 槽位）。</li>
          <li><strong>父进程 wait()</strong>：内核把退出码交给父，<strong>僵尸消失</strong>，PCB 释放。</li>
          <li><strong>父进程先死（孤儿）</strong>：内核把孤儿的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">PPID</code> 改成 <strong>1</strong>（init/systemd），由它来 wait——所以孤儿不会被世界遗忘，也不会变僵尸。</li>
        </ol>
        <div class="mb-4"><Code language="go" :code="waitpidCode" title="waitpid.c（C 语言）" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">状态</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">进程还能跑吗</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">资源占用</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">怎么办</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">运行 / 就绪 / 阻塞</td><td class="px-4 py-2 border">能</td><td class="px-4 py-2 border">完整（代码/数据/PCB）</td><td class="px-4 py-2 border">—</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-red-600">僵尸（Zombie）</td><td class="px-4 py-2 border">不能（已死）</td><td class="px-4 py-2 border">仅剩 PCB 一个槽位</td><td class="px-4 py-2 border">父进程 wait() 回收</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">孤儿（Orphan）</td><td class="px-4 py-2 border">能（被 init 收养）</td><td class="px-4 py-2 border">完整</td><td class="px-4 py-2 border">PID 1 负责 wait</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 生产守则：</strong>守护进程要么 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">SIGCHLD</code> 信号处理器里 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">waitpid(-1, …)</code> 循环回收，要么干脆设 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">SA_NOCLDWAIT</code> 让内核自动回收。绝不能让无限 fork 且不 wait 的程序长期跑——僵尸堆满会撑爆进程表。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>wait ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">await childTask</code>——阻塞地等子任务返回，退出码 ≈ resolve 出来的值。僵尸进程 ≈ 子组件卸载后父组件没清理订阅：对象本身"没价值了"（死进程），却还占着资源，等父组件（wait/清理函数）来收。</p>
        </aside>
      </section>

      <!-- 5. 进程树 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>进程树：一切进程的根是 PID 1</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">因为进程<strong>只能由 fork 生出</strong>，所以系统里的进程天然是一棵<strong>树</strong>：开机时内核启动 PID 1（<strong>init</strong>，现代多为 <strong>systemd</strong>），它再 fork 出各种服务，层层往下。每个进程的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">PPID</code>（父进程号）就指着它在树上的父节点。</p>
        <div class="mb-4"><Code language="bash" :code="psTreeCode" title="ps -ef --forest" /></div>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>孤儿被收养</strong>是树形结构的结果：父节点没了，子节点挂到根上（PID 1）。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>退出码沿树回收</strong>：每个进程的"后事"由它的父进程料理，一路收回到 PID 1。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>容器 = 一棵子树</strong>：Docker 用 PID namespace 让容器里的进程"以为"自己看到的是 PID 1 起头的一棵树——那是隔离出来的假象。</span></li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>进程树 ≈ 组件树——根组件（PID 1）挂载后递归渲染出整棵树，每个节点都能拿到它的父节点（PPID）；父组件卸载（父进程退出），子组件节点会被"提升"挂到根上（被 init 收养）。</p>
        </aside>
      </section>

      <!-- 6. 对比表 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>创建开销大比拼：进程 vs 线程 vs goroutine</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">这一节是本文的<strong>核心价值</strong>。同为"并发单元"，三者的重量级差了三个数量级——这正是 Go 选择 <strong>goroutine</strong> 而不是 fork 来做并发的根本原因。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">进程（fork）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">线程（pthread）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">goroutine</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">创建方式</td><td class="px-4 py-2 border">系统调用 fork（陷入内核）</td><td class="px-4 py-2 border">系统调用 clone / pthread_create（陷入内核）</td><td class="px-4 py-2 border"><code class="bg-slate-100 px-1 rounded text-xs font-mono">go</code> 语句（纯用户态，不陷入内核）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">创建开销</td><td class="px-4 py-2 border">高：新 PCB + 页表复制 + COW</td><td class="px-4 py-2 border">中：内核线程 + 独立线程栈</td><td class="px-4 py-2 border">极低：~2KB 栈 + 一个 g 结构</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">栈大小</td><td class="px-4 py-2 border">独立虚拟地址空间（MB 级）</td><td class="px-4 py-2 border">共享地址空间，每线程独立栈（MB 级）</td><td class="px-4 py-2 border">2KB 起步，可动态增长</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">调度者</td><td class="px-4 py-2 border">内核调度器</td><td class="px-4 py-2 border">内核调度器</td><td class="px-4 py-2 border">Go 运行时（GMP，把 g 调度到 M 线程）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">切换代价</td><td class="px-4 py-2 border">高：内核态切换 + 页表切换 + TLB 失效</td><td class="px-4 py-2 border">中：内核态切换，地址空间共享（TLB 友好）</td><td class="px-4 py-2 border">极低：用户态栈切换，微秒级</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">数量上限</td><td class="px-4 py-2 border">几百 ~ 几千</td><td class="px-4 py-2 border">几千 ~ 几万</td><td class="px-4 py-2 border">几十万 ~ 上百万</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">隔离性</td><td class="px-4 py-2 border">完全隔离：独立地址空间，一个崩不牵连另一个</td><td class="px-4 py-2 border">共享地址空间：一个段错误全组崩</td><td class="px-4 py-2 border">共享地址空间：panic 不 recover 会崩整个进程</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">通信方式</td><td class="px-4 py-2 border">IPC（管道 / 信号 / socket / 共享内存）</td><td class="px-4 py-2 border">共享内存 + 互斥锁</td><td class="px-4 py-2 border">channel + 锁</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 一句话总结：</strong>进程用<strong>强隔离</strong>换共享困难与高开销；线程用<strong>共享地址空间</strong>换效率但没了隔离；goroutine 把"共享"做得更廉价，靠<strong>用户态调度</strong>把创建/切换成本压到纳秒~微秒级——这正是"百万并发"的底气。</p>
        </aside>
      </section>

      <!-- 7. 常见坑 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">7</span>⚠️ 常见坑：fork 的暗礁</h2>
        <div class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：fork 后 printf 输出重复。</strong>C 的 stdio 是<strong>行缓冲</strong>——数据先攒在用户态缓冲区，遇到换行或 flush 才真正 write 到内核。如果 fork 前 printf 了不带换行的内容，缓冲区里那份未写出的数据会被<strong>连同内存一起复制</strong>给子进程，于是父子各 flush 一次，<strong>同一段话打两遍</strong>。解决：fork 前 <code class="bg-amber-100 px-1 rounded text-xs font-mono">fflush(NULL)</code>，或 printf 带 <code class="bg-amber-100 px-1 rounded text-xs font-mono">\n</code>。</p>
        </div>
        <div class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：不 wait 就会堆僵尸。</strong>子进程 exit 后内核还留着它的 PCB，只有父进程 <code class="bg-amber-100 px-1 rounded text-xs font-mono">wait()</code> 才会释放。进程数有限，长时间 fork 不回收，进程表会被僵尸塞满，新进程创建直接返回 -1。你写"拉起一堆任务"的守护进程时，务必有配套的回收逻辑。</p>
        </div>
        <div class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：fork 在循环里不 break，指数爆炸。</strong>每次循环 fork 都会把<strong>当前所有进程</strong>各复制一份——3 次循环就多出 <code class="bg-amber-100 px-1 rounded text-xs font-mono">2³-1 = 7</code> 个进程，10 次就是 1023 个。想"派生 N 个孩子"要在子进程里立即 break/return。</p>
        </div>
        <div class="mb-4"><Code language="go" :code="forkLoopCode" title="fork-loop.c（错误示范）" /></div>
        <div class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑 4（Go 专属）：Go 程序里别手动 fork。</strong>Go 运行时是多线程的（多个 M 线程），而 <code class="bg-amber-100 px-1 rounded text-xs font-mono">fork()</code> 只会复制<strong>调用它的那个线程</strong>——子进程里其他线程的锁（malloc 的锁、运行时的锁）将永远锁死，一碰 Go 运行时 API 就死锁。Go 自己的 <code class="bg-amber-100 px-1 rounded text-xs font-mono">syscall.ForkExec</code> 是 <strong>fork 后立即 exec</strong>（不碰那些锁）才安全。日常正确姿势：起子进程用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">exec.Command</code>，要并发用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">go func</code>。</p>
        </div>
      </section>

      <!-- 8. 与 Go 底层实现的关系 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">8</span>与 Go 底层实现的关系</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">你的 Go 程序<strong>本身就是 fork+exec 的产物</strong>：shell 先 fork 出子进程，再 exec 装载你的可执行文件；进程启动后 Go 运行时再用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">clone</code>（本质是 fork 的变体）创建出若干 OS 线程（M）来跑调度器。但进入 Go 之后，<strong>并发不再走 fork 这条路</strong>——那是"起程序"的路，不是"写并发"的路。</p>
        <h3 class="text-base font-semibold text-slate-700 mb-2">Go 的并发单元：go func 创建 goroutine</h3>
        <div class="mb-4"><Code language="go" :code="goroutineGoCode" title="goroutine-create/main.go" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">指标</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">进程（fork）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">goroutine（go）</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">创建路径</td><td class="px-4 py-2 border">系统调用 → 陷入内核</td><td class="px-4 py-2 border">go 语句 → 纯用户态</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">创建耗时</td><td class="px-4 py-2 border">微秒 ~ 毫秒级（PCB + 页表 + COW）</td><td class="px-4 py-2 border">~100ns 级（分配 2KB 栈 + g 结构）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">切换成本</td><td class="px-4 py-2 border">内核上下文切换 + 页表/TLB</td><td class="px-4 py-2 border">用户态栈切换（同 M 上由 P 调度）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">并发规模</td><td class="px-4 py-2 border">千级</td><td class="px-4 py-2 border">百万级</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">共享方式</td><td class="px-4 py-2 border">IPC（管道/信号/共享内存）</td><td class="px-4 py-2 border">直接共享内存 + channel / 锁</td></tr>
            </tbody>
          </table>
        </div>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>为什么 goroutine 便宜？</strong>goroutine 是<strong>运行时自己调度的用户态任务</strong>，由 <code class="bg-slate-100 px-1 rounded text-xs font-mono">G</code>（goroutine）<code class="bg-slate-100 px-1 rounded text-xs font-mono">M</code>（线程）<code class="bg-slate-100 px-1 rounded text-xs font-mono">P</code>（逻辑处理器）三层结构承载：<strong>M 不需要为每个 goroutine 新建</strong>，切换 g 只是换栈和寄存器，不进出内核。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>什么时候仍要用进程？</strong>需要<strong>隔离</strong>（一个崩溃不牵连宿主）、跑<strong>外部程序/命令</strong>、或跨语言部署时——这时 Go 给你 <code class="bg-slate-100 px-1 rounded text-xs font-mono">os/exec</code>。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed mb-4">深入调度器：<Link :route="'go-2-1-goroutine-gmp'" :text="'Go GMP 调度模型'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />（goroutine 如何在 M/P 上被调度）</p>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 选择法则：</strong>并发 → <code class="bg-emerald-100 px-1 rounded text-xs font-mono">go func</code>（百万级、纳秒级）；执行外部程序 → <code class="bg-emerald-100 px-1 rounded text-xs font-mono">exec.Command</code>（包好 fork+exec+wait）；要硬隔离/多程序独立 → 子进程。永远不要手动 fork。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>go func ≈ 往事件循环里丢一个<strong>微任务（Promise）</strong>——轻、快、不占用独立线程；而 fork 一个进程 ≈ <code class="bg-purple-100 px-1 rounded text-xs font-mono">new Worker()</code>（独立线程，开销大、通信靠消息）。Go 的 M 池 ≈ 浏览器/Node 的 worker 池，goroutine 是被池子复用调度的轻量任务。</p>
        </aside>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>fork()</strong>：Unix 创建进程的唯一入口，<strong>调用一次返回两次</strong>——父得子 PID、子得 0，用返回值分支把父子世界切开。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>COW 写时复制</strong>：fork 只复制页表、父子共享物理页（只读），谁写谁才复制——让"复制一个大进程"近乎免费。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>exec 族</strong>：PID 不变、镜像全换；fork+exec 组合拳是 Unix 起新程序的经典套路。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>wait/waitpid</strong>：回收子进程、拿退出码、防僵尸；孤儿被 PID 1（init/systemd）收养。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>进程树</strong>：进程只能被 fork 生出，故全系统以 PID 1 为根构成一棵树。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>核心价值</strong>：进程（千级/系统调用/强隔离） → 线程（万级/共享地址空间） → goroutine（百万级/用户态 2KB/纳秒级）。Go 并发用 goroutine 而非 fork，就是这个数量级差异。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>Go 里要起子进程用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">exec.Command</code>，要并发用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">go func</code>，<strong>永远不要手动 fork</strong>。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">相关阅读：<Link :route="'go-2-1-goroutine-gmp'" :text="'Go GMP 调度模型'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'cs-5-b-3-thread'" :text="'线程：用户态/内核态/轻量级进程'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-5-b-1-pcb'" :text="'← 上一节：进程控制块 PCB 与上下文切换'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-5-b-3-thread'" :text="'下一节：线程：用户态/内核态/轻量级进程 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "fork：一次调用两次返回" },
  { id: "sec-2", name: "传统复制 vs COW" },
  { id: "sec-3", name: "exec 族" },
  { id: "sec-4", name: "wait：回收与僵尸" },
  { id: "sec-5", name: "进程树" },
  { id: "sec-6", name: "进程 vs 线程 vs goroutine" },
  { id: "sec-7", name: "常见坑" },
  { id: "sec-8", name: "与 Go 底层实现" },
  { id: "sec-9", name: "小结" },
]

// ===== ① C 经典 fork：父子分叉打印 =====
const forkCCode = `#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();            // ① 在这里进程分裂：调用一次
    if (pid == 0) {
        // ② 子进程走这里：fork 返回 0
        printf("[子] 我的 PID=%d\\n", getpid());
        return 0;                  // 子进程从这里退出
    } else if (pid > 0) {
        // ③ 父进程走这里：fork 返回子进程 PID（>0）
        printf("[父] 我的 PID=%d, 孩子 PID=%d\\n", getpid(), pid);
        wait(NULL);                // ④ 回收孩子，防止僵尸
    } else {
        perror("fork 失败");        // 返回 -1
    }
    return 0;
}

// 输出（父子交错，顺序不定）：
//   [子] 我的 PID=12435
//   [父] 我的 PID=12434, 孩子 PID=12435
// 同一个 fork() 在父进程返回 12435、在子进程返回 0，
// 于是两份代码沿着 if/else 走向不同的分支执行。`;
const waitpidCode = `#include <stdio.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();
    if (pid == 0) {
        return 42;                 // 子进程以退出码 42 退出
    }
    int status;
    waitpid(pid, &status, 0);      // 阻塞等指定孩子
    if (WIFEXITED(status)) {
        printf("子进程退出码: %d\\n", WEXITSTATUS(status));
        // 输出: 子进程退出码: 42
    }
    return 0;
}`;
const execGoCode = `package main

import (
    "fmt"
    "os/exec"
)

func main() {
    // Go 不暴露 fork()：要"起另一个程序"就用 exec.Command
    // 底层在 Unix 上是 fork + exec + wait 的一体化封装
    cmd := exec.Command("ls", "-l")
    out, err := cmd.Output()       // 运行并等待结束（内部 wait）
    if err != nil {
        fmt.Println("运行出错:", err)
        return
    }
    fmt.Printf("子进程输出:\\n%s", out)
}

// 对比记忆：
//   fork   → 复制出子进程（原样）
//   exec   → 用 ls 替换子进程镜像（PID 不变）
//   wait   → 父进程等它结束、拿退出码
// exec.Command 把这三步打包成一次调用。`;
const goroutineGoCode = `package main

import (
    "fmt"
    "sync"
)

func main() {
    var wg sync.WaitGroup
    n := 100_000                  // 10 万个 goroutine

    for i := 0; i < n; i++ {
        wg.Add(1)
        go func(id int) {         // go 关键字 → 纯用户态创建，不陷入内核
            defer wg.Done()
            _ = id                // 每个 goroutine 独立 2KB 栈起步
        }(i)
    }
    wg.Wait()
    fmt.Println("全部", n, "个 goroutine 执行完毕")
    // 输出: 全部 100000 个 goroutine 执行完毕
}

// 换成进程：10 万次 fork 会让系统直接崩溃；
// 换成 goroutine：毫秒级全部创建完，这就是数量级差异。`;
const forkLoopCode = `#include <stdio.h>
#include <unistd.h>

int main() {
    for (int i = 0; i < 3; i++) {
        fork();        // ⚠️ 不 break：每轮把"当前所有进程"各复制一份
        // i=0 → 1 个新进程（总数 2）
        // i=1 → 2 个新进程（总数 4）
        // i=2 → 4 个新进程（总数 8）
        // 3 次 fork 共 2^3 = 8 个进程（1 个父 + 7 个孩子）
        // N 次 fork 得到 2^N 个进程，指数爆炸
    }
    return 0;
}`;
const psTreeCode = `$ ps -ef --forest | head -20
UID   PID  PPID  CMD
root    1     0  /sbin/init                    ← PID 1：进程树之根
root   42     1   ├─ systemd-journald
root   51     1   ├─ sshd
root  160     1   ├─ postgres
root  180     1   │   └─ postgres
root  310     1   └─ docker
root  345   310       └─ containerd

# PPID 就是父进程号：谁 fork 我，谁就是我的父节点。
# 孤儿进程的 PPID 会被改成 1，由 PID 1 负责 wait 收养。`;
</script>
