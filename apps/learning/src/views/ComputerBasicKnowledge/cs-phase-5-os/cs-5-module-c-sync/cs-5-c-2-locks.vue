<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">互斥锁、自旋锁、读写锁</h1><p class="text-sm text-slate-500 mt-1">让临界区"同一时刻只有一个人进"的三件套——从忙等到睡眠，再到无锁</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">操作系统 5-c-2</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：等锁的三种姿势 + 一条升级路径</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">并发同步的核心问题只有一个：<strong>多个执行流抢同一块临界区，让谁先进、等的人怎么等。</strong>本篇的三把锁就是三个答案——<strong>自旋锁</strong>（忙等，短临界区）、<strong>互斥锁</strong>（睡眠，长临界区）、<strong>读写锁</strong>（读共享写独占，读多写少）。而现代互斥锁的底层，其实是把前两者串成一条<b>升级路径</b>：先 CAS 原子抢，抢不到再自旋几轮，还不行才进内核睡眠。</p>

        <figure class="mb-4">
          <svg viewBox="0 0 760 390" class="w-full h-auto">
            <defs>
              <marker id="arrow6a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker>
              <marker id="arrow6b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker>
              <marker id="arrow6c" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#f59e0b"/></marker>
              <marker id="arrow6d" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#06b6d4"/></marker>
            </defs>

            <!-- ① 自旋 vs 阻塞：决策流程 -->
            <text x="20" y="30" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">① 自旋锁 vs 阻塞锁：临界区多短决定怎么等</text>
            <rect x="45" y="40" width="120" height="44" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="105" y="58" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e" font-family="monospace">临界区极短？</text>
            <text x="105" y="73" text-anchor="middle" font-size="9" fill="#a16207" font-family="monospace">（纳秒级，多核）</text>
            <line x1="105" y1="84" x2="105" y2="116" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow6a)"/>
            <line x1="105" y1="84" x2="255" y2="116" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow6b)"/>
            <text x="62" y="108" font-size="9" fill="#64748b" font-family="monospace">是</text>
            <text x="210" y="104" font-size="9" fill="#64748b" font-family="monospace">否</text>
            <rect x="40" y="118" width="130" height="48" rx="8" fill="#06b6d4"/>
            <text x="105" y="136" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">自旋锁 · 忙等</text>
            <text x="105" y="152" text-anchor="middle" font-size="9" fill="#e0f2fe" font-family="monospace">反复原子交换直到拿到</text>
            <rect x="190" y="118" width="130" height="48" rx="8" fill="#f59e0b"/>
            <text x="255" y="136" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">阻塞锁 · 睡眠</text>
            <text x="255" y="152" text-anchor="middle" font-size="9" fill="#fef3c7" font-family="monospace">进内核挂起，等唤醒</text>
            <text x="40" y="185" font-size="10" fill="#b45309" font-family="monospace">单核自旋无意义；长临界区自旋 = 纯烧 CPU</text>

            <!-- ② 读写锁状态机 -->
            <text x="395" y="30" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">② 读写锁状态机：读共享 · 写独占</text>
            <rect x="420" y="40" width="100" height="44" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="470" y="59" text-anchor="middle" font-size="12" font-weight="bold" fill="#0369a1" font-family="monospace">无锁</text>
            <text x="470" y="74" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">任何线程可进</text>
            <line x1="520" y1="62" x2="548" y2="62" stroke="#06b6d4" stroke-width="1.5" marker-end="url(#arrow6d)"/>
            <text x="534" y="56" font-size="9" fill="#0891b2" font-family="monospace">读</text>
            <rect x="550" y="40" width="140" height="44" rx="8" fill="#06b6d4"/>
            <text x="620" y="57" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">读锁状态</text>
            <text x="620" y="73" text-anchor="middle" font-size="9" fill="#e0f2fe" font-family="monospace">读读共享，可再来读锁</text>
            <line x1="470" y1="84" x2="470" y2="118" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#arrow6c)"/>
            <text x="478" y="104" font-size="9" fill="#d97706" font-family="monospace">写（独占）</text>
            <rect x="410" y="120" width="130" height="50" rx="8" fill="#f59e0b"/>
            <text x="475" y="139" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">写锁状态</text>
            <text x="475" y="155" text-anchor="middle" font-size="9" fill="#fef3c7" font-family="monospace">写写互斥、读写互斥</text>
            <text x="550" y="150" font-size="10" fill="#b45309" font-family="monospace">只能从"无锁"进入，</text>
            <text x="550" y="164" font-size="10" fill="#b45309" font-family="monospace">持有期间谁都不许碰</text>

            <!-- ③ Mutex 底层升级路径 -->
            <text x="20" y="225" font-size="12" font-weight="bold" fill="#475569" font-family="monospace">③ Mutex 底层升级路径：CAS 抢 → 自旋几轮 → futex 睡眠</text>
            <rect x="40" y="235" width="190" height="52" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1.5"/>
            <text x="135" y="254" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1" font-family="monospace">① CAS 原子抢锁</text>
            <text x="135" y="270" text-anchor="middle" font-size="9" fill="#64748b" font-family="monospace">state 0 → 1，一条指令</text>
            <text x="135" y="283" text-anchor="middle" font-size="9" fill="#15803d" font-family="monospace">→ 抢到即返回，零开销</text>
            <line x1="230" y1="261" x2="278" y2="261" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow6a)"/>
            <text x="254" y="255" font-size="9" fill="#64748b" font-family="monospace">失败</text>
            <rect x="280" y="235" width="190" height="52" rx="8" fill="#06b6d4"/>
            <text x="375" y="254" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">② 自旋几轮（乐观期）</text>
            <text x="375" y="270" text-anchor="middle" font-size="9" fill="#e0f2fe" font-family="monospace">赌持锁者马上释放</text>
            <text x="375" y="283" text-anchor="middle" font-size="9" fill="#e0f2fe" font-family="monospace">用户态忙等，不进内核</text>
            <line x1="470" y1="261" x2="518" y2="261" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#arrow6b)"/>
            <text x="494" y="255" font-size="9" fill="#64748b" font-family="monospace">仍失败</text>
            <rect x="520" y="235" width="190" height="52" rx="8" fill="#f59e0b"/>
            <text x="615" y="254" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff" font-family="monospace">③ futex 内核挂起</text>
            <text x="615" y="270" text-anchor="middle" font-size="9" fill="#fef3c7" font-family="monospace">用户态原子 + 内核排队</text>
            <text x="615" y="283" text-anchor="middle" font-size="9" fill="#fef3c7" font-family="monospace">睡眠，持锁者解锁时唤醒</text>
            <text x="40" y="308" font-size="10" fill="#475569" font-family="monospace">绝大多数锁在 ① 就成功——锁本来就该短；② 是给"马上释放"的持锁者留的缓冲；只有③才付一次昂贵的系统调用。</text>

            <!-- 图例 -->
            <rect x="40" y="330" width="20" height="12" rx="3" fill="#06b6d4"/>
            <text x="66" y="340" font-size="10" fill="#475569" font-family="monospace">自旋 / 读共享</text>
            <rect x="200" y="330" width="20" height="12" rx="3" fill="#f59e0b"/>
            <text x="226" y="340" font-size="10" fill="#475569" font-family="monospace">阻塞 / 写独占</text>
            <rect x="360" y="330" width="20" height="12" rx="3" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1"/>
            <text x="386" y="340" font-size="10" fill="#475569" font-family="monospace">CAS 用户态抢锁</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">等锁三种姿势：自旋（忙等烧 CPU 换低延迟）↔ 阻塞（睡眠省 CPU 付切换代价）↔ 读写锁（读共享写独占）；现代 Mutex 是三段式升级，尽量停在用户态</figcaption>
        </figure>
      </section>

      <!-- 1. 互斥锁 Mutex -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>互斥锁 Mutex：谁拿了，谁放</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">互斥锁的语义只有一句话：<strong>任何时刻，临界区至多有一个持有者。</strong>但它有两条约定的铁律，违反任何一条都会出事故：</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>只有持锁者能解锁</strong>。锁有"所有权"，别人解不了你的锁——这保证了"拿了就一定能放，而且只有你能放"。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>不可重入</strong>：同一个执行流在<strong>持锁期间再锁一次自己</strong>，会等自己放的锁——永久等待，<strong>自死锁</strong>。普通互斥锁（非递归锁）重入即死锁。</div></li>
        </ol>
        <div class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 锁 vs 信号量（本质区别）：</strong>信号量（如 Go 的 <code class="bg-blue-100 px-1 rounded text-xs font-mono">make(chan struct{}, 1)</code>）只有"计数"没有"所有权"——线程 A 可以 P 操作拿到，再让线程 B 去 V 操作释放。<strong>锁是有主人的，信号量是无主的。</strong>这带来一个后果：用信号量做互斥时，谁释放、何时释放全靠自觉；而锁强制"只有持锁者能放"，语义更安全。<Link :route="'cs-5-c-3-semaphore'" :text="'下一篇：信号量与条件变量'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>JS 是单线程事件循环，同一时刻只有一段代码在跑，<strong>根本不需要互斥锁</strong>（这也是前端不学锁的原因）。但一旦跨线程——Web Worker 共享 <code class="bg-purple-100 px-1 rounded text-xs font-mono">SharedArrayBuffer</code>——JS 就又需要锁了：<code class="bg-purple-100 px-1 rounded text-xs font-mono">Atomics.wait</code> / <code class="bg-purple-100 px-1 rounded text-xs font-mono">Atomics.notify</code> 就是 JS 版"睡眠 + 唤醒"的底层锁原语。Vue 里你只在 <code class="bg-purple-100 px-1 rounded text-xs font-mono">computed</code> 的确定性里"假想"了互斥：同一份响应式状态，永远只有一个更新流程在写。</p>
        </aside>
        <div class="mb-4"><Code language="go" :code="mutexCode" title="mutex-counter.go" /></div>
      </section>

      <!-- 2. 自旋锁 Spinlock -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>自旋锁 Spinlock：拿不到就原地打转</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">自旋锁不睡眠：线程在 <strong>用户态死循环</strong>里反复执行 <strong>原子交换（TAS / atomic exchange）</strong>，直到把锁的"occupied 标志"从 <code class="bg-slate-100 px-1 rounded text-xs font-mono">0</code> 换回 <code class="bg-slate-100 px-1 rounded text-xs font-mono">1</code> 才算抢到。因为不用进内核、不用切换上下文，<strong>等待的延迟极低</strong>——但代价是忙等期间 CPU 空转。</p>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">适用判据：等待时间 &lt; 上下文切换开销，自旋才划算</p>
          <p class="text-xs text-amber-600 text-center">一次上下文切换要几微秒；若临界区只有十几纳秒，睡眠一次的代价够你自旋几百轮</p>
        </div>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>适用</strong>：临界区极短（几条指令）、多核（其他核在跑持锁者）、竞争率低。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>致命伤 1 · 单核无意义</strong>：单核上自旋时 CPU 被占住，持锁者根本得不到调度去释放——自旋等于死锁。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>致命伤 2 · 长等待烧 CPU</strong>：临界区一长，所有等锁者把整机 CPU 烧满却干不了活。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>致命伤 3 · 优先级反转</strong>：低优先级线程持锁，高优先级线程自旋空转，中间优先级线程抢占 CPU，低优先级迟迟不释放——系统"冻住"。</span></li>
        </ul>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 业界做法：</strong>没人敢裸自旋无限等。业界折衷是<strong>"自旋有限轮数"</strong>：自旋 4~16 轮没抢到就放弃，转去睡眠（这正是下一节 Mutex 的升级路径）。内核的 <code class="bg-emerald-100 px-1 rounded text-xs font-mono">futex</code> 对锁也这么干：用户态先自旋一阵，才把线程送进内核。</p>
        </aside>
      </section>

      <!-- 3. 阻塞锁底层路径 ⭐ -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>阻塞锁的底层路径：CAS → 自旋 → futex（⭐ 重点）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">现代互斥锁（Go 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">sync.Mutex</code>、Linux 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">futex</code>）既不是纯自旋也不是纯阻塞，而是<b>三段式升级</b>：先抢最便宜的，抢不到再稍微等一会儿，最后才花大价钱睡觉。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>CAS 原子抢锁（最便宜）</strong>：一条 <code class="bg-slate-100 px-1 rounded text-xs font-mono">Lock CMPXCHG</code> 指令试着把 <code class="bg-slate-100 px-1 rounded text-xs font-mono">state</code> 从 <code class="bg-slate-100 px-1 rounded text-xs font-mono">0</code> 换成 <code class="bg-slate-100 px-1 rounded text-xs font-mono">1</code>，成功即持锁，全程用户态、纳秒级。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>自旋几轮（乐观期）</strong>：CAS 失败说明持锁者正在跑，<strong>赌它马上释放</strong>——循环重读锁状态几轮，不切换上下文、不进内核。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>futex 内核挂起（最贵）</strong>：Linux 的 futex（<strong>fast user-space mutex</strong>）机制——锁状态仍在用户态原子操作，但抢不到时调用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">FUTEX_WAIT</code> 把自己挂进内核的<strong>等待队列</strong>睡眠；持锁者释放时用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">FUTEX_WAKE</code> 唤醒队头。</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="lockPathCode" title="mutex-lock-path.go" /></div>
        <div class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>第 ③ 步要付<strong>两次上下文切换</strong>（睡眠一次 + 唤醒一次）+ 一次系统调用，微秒级开销。所以设计者的目标是让锁<strong>尽量死在 ① 或 ②</strong>——这也是为什么"临界区要短"不只是一句口号，而是直接决定你每次 Lock 是 10ns 还是 2µs。</p>
        </div>
      </section>

      <!-- 4. 读写锁 RWLock -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>读写锁 RWLock：读共享，写独占</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">读写锁把"读"和"写"拆成两把锁：<strong>读锁可以多把共存（读读共享），写锁同时只能一把，且与读锁互斥（写写互斥、读写互斥）。</strong>适合典型的<strong>读多写少</strong>场景——缓存、配置表、计数器快照。</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>读锁 RLock</strong>：只有当前没有写者时才放行；读者之间互不阻塞，N 个读者可以并发进入临界区。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>写锁 Lock</strong>：必须等到<strong>所有</strong>读者退出，且没有其他写者——从那一刻起独占，直到解锁。</div></li>
        </ol>
        <div class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 写优先 vs 读优先：</strong><strong>读优先</strong>实现简单（读者永远能进），但高并发读下写者可能<strong>无限饿死</strong>——每次写者快轮到，又插进来一批读者。Go 的 <code class="bg-blue-100 px-1 rounded text-xs font-mono">sync.RWMutex</code> 从 <strong>1.8 起默认写优先</strong>：一旦有写者在等，新来的读者先排队，保证写者最终能拿到锁（防写饥饿）。</p>
        </div>
        <div class="mb-4"><Code language="go" :code="rwlockCode" title="rwlock-cache.go" /></div>
      </section>

      <!-- 5. 原子操作 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>原子操作 sync/atomic：连锁都不用的无锁同步</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">上面的锁都要"等待"。而<strong>原子操作</strong>根本不需要锁：硬件保证单条指令的读-改-写不可分割（<strong>Lock 前缀 + CMPXCHG/XADD</strong>，锁住总线或缓存行）。<code class="bg-slate-100 px-1 rounded text-xs font-mono">counter++</code> 在并发下会丢更新，但 <code class="bg-slate-100 px-1 rounded text-xs font-mono">atomic.AddInt64(&amp;counter, 1)</code> 是一条原子指令，<strong>天然不丢</strong>。</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>原子加 AddInt64</strong>：适合计数器、流量统计、水位线——读-改-写一次性完成。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>CAS CompareAndSwap</strong>：比较旧值、相等才换新值。用途 = 乐观锁 / 无锁队列 / "只允许一个成功"的标志位（如只初始化一次）。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>局限</strong>：原子只能搞定<strong>单个变量</strong>；要保证"多个变量一起变"（转账）必须靠锁。</span></li>
        </ul>
        <div class="mb-4"><Code language="go" :code="atomicCode" title="atomic-counter.go" /></div>
      </section>

      <!-- 6. 公平性 / 性能权衡 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>公平性 / 饥饿 / 性能权衡</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">选哪把锁，本质是<strong>延迟、吞吐、公平性</strong>的三方博弈。一张表收尾：</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">锁类型</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">语义</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">适用场景</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">代价 / 风险</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">自旋锁</td><td class="px-4 py-2 border">忙等独占，不睡眠</td><td class="px-4 py-2 border">临界区极短、多核、竞争低</td><td class="px-4 py-2 border">单核无意义、长等待烧 CPU、优先级反转</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">互斥锁 Mutex</td><td class="px-4 py-2 border">阻塞独占，有所有者、不可重入</td><td class="px-4 py-2 border">通用临界区、竞争较激烈</td><td class="px-4 py-2 border">睡眠/唤醒两次上下文切换</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">读写锁 RWLock</td><td class="px-4 py-2 border">读共享、写独占</td><td class="px-4 py-2 border">读多写少（缓存/配置）</td><td class="px-4 py-2 border">读优先→写饥饿；写频繁时比 Mutex 更差</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">原子操作 atomic</td><td class="px-4 py-2 border">单指令无锁读写</td><td class="px-4 py-2 border">简单计数 / 标志位 / 状态机</td><td class="px-4 py-2 border">只覆盖单变量，做不了复合事务</td></tr>
            </tbody>
          </table>
        </div>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>公平性</strong>：自旋锁/读优先的读写锁<strong>不公平</strong>（后来的可能插队/饿死先到的）；Go 1.9+ 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">sync.Mutex</code> 带<strong>饥饿模式</strong>保证排队的先到先得。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>吞吐 vs 延迟</strong>：自旋是"低延迟高 CPU"，阻塞是"低 CPU 高延迟"，读写锁在纯读下吞吐最高——但没有银弹，<strong>先测量再选</strong>。</span></li>
        </ul>
      </section>

      <!-- 7. 常见坑 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">7</span>⚠️ 常见坑</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>不可重入却递归加锁 → 自死锁</strong>：持锁函数内部又调了自己（或调了同锁的辅助函数）会锁上加锁，普通互斥锁直接永久阻塞。解法：拆锁范围、用可重入设计，或干脆别在持锁区调用未知函数。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>忘记解锁 / 忘记 defer</strong>：提前 return 会跳过 Unlock，锁永久被占，其他 goroutine 全部挂死。Go 里一律 <code class="bg-slate-100 px-1 rounded text-xs font-mono">defer mu.Unlock()</code> 紧跟 Lock 之后。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>拷贝了锁</strong>：<code class="bg-slate-100 px-1 rounded text-xs font-mono">sync.Mutex</code> / <code class="bg-slate-100 px-1 rounded text-xs font-mono">sync.RWMutex</code> <strong>不可复制</strong>（内部含状态），按值传参、放进 struct 再整体拷贝都会拿到"复制品"，等于锁了个寂寞。用指针，<code class="bg-slate-100 px-1 rounded text-xs font-mono">go vet</code> 会报 <code class="bg-slate-100 px-1 rounded text-xs font-mono">copylocks</code>。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>锁粒度太粗 → 并发退化成串行</strong>：整个函数锁住，所有人排队等于没并发。把锁缩小到真正共享的那几行，读用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">RLock</code>。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>持锁做慢操作</strong>：网络请求、磁盘 IO 塞进临界区，持锁时间爆炸——等锁者全部自旋/排队，吞吐崩。临界区只留纯内存操作。</span></li>
        </ul>
      </section>

      <!-- 8. 与 Go 底层实现的关系 ⭐ -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">8</span>与 Go 底层实现的关系（⭐）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">你现在用的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">sync.Mutex</code>，正是上面第 3 节那条路径的完整落地——Go 把它实现进 <code class="bg-slate-100 px-1 rounded text-xs font-mono">runtime</code> 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">lock/unlock</code>（内部调用 Linux futex）。拆开看：</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>抢锁 = state 字段原子 CAS</strong>：<code class="bg-slate-100 px-1 rounded text-xs font-mono">Mutex</code> 用一个 32 位 <code class="bg-slate-100 px-1 rounded text-xs font-mono">state</code> 位字段装锁标志 + 等待计数，<code class="bg-slate-100 px-1 rounded text-xs font-mono">Lock()</code> 第一件事就是 <code class="bg-slate-100 px-1 rounded text-xs font-mono">atomic.CAS(state, unlocked, locked)</code>——无竞争时这一下就完事。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>自旋（active spinning）</strong>：CAS 失败后若满足条件（多核、GOMAXPROCS &gt; 1、自旋计数没超上限），goroutine 在<strong>用户态忙等</strong>几轮，把持锁者"马上释放"的概率吃掉。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>semacquire / futex 挂起</strong>：仍抢不到就调 <code class="bg-slate-100 px-1 rounded text-xs font-mono">runtime.semacquire</code>，走到 Linux futex <code class="bg-slate-100 px-1 rounded text-xs font-mono">FUTEX_WAIT</code>。<strong>关键点：挂起的是 goroutine 而不是 OS 线程</strong>——goroutine 睡着时，它占用的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">M</code>（系统线程）让出来去跑别的 goroutine。这就是 Go 里"锁住就睡、睡眠不浪费 CPU"的底气，和 OS 自旋锁"锁住就烧 CPU"形成鲜明对比。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>公平性（starvation mode）</strong>：Go 1.9 起 <code class="bg-slate-100 px-1 rounded text-xs font-mono">Mutex</code> 增加<strong>饥饿模式</strong>——正常模式优先保证吞吐（新来的可能插队），一旦有 goroutine 等锁超过 1ms 就切饥饿模式，排队的严格先到先得，彻底消灭写/长等待饥饿。</div></li>
        </ol>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>RWMutex 的读计数</strong>：内部用原子字段跟踪<strong>活跃读者数</strong>——RLock 是原子加 1（读者之间不互斥），Lock 要等计数归零。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>atomic 指令映射</strong>：<code class="bg-slate-100 px-1 rounded text-xs font-mono">atomic.AddInt64</code> → 一条 <code class="bg-slate-100 px-1 rounded text-xs font-mono">LOCK XADD</code>；<code class="bg-slate-100 px-1 rounded text-xs font-mono">atomic.CompareAndSwap</code> → <code class="bg-slate-100 px-1 rounded text-xs font-mono">LOCK CMPXCHG</code>。Go 里普通 <code class="bg-slate-100 px-1 rounded text-xs font-mono">++</code> 会被编译成多条指令所以会丢更新，原子函数才不会。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed mb-4">跳转阅读：<Link :route="'go-2-5-sync-mutex'" :text="'Go sync.Mutex 与 RWMutex 实战'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'go-2-7-atomic'" :text="'Go sync/atomic 原子操作'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'go-2-6-sync-wg-once'" :text="'sync.WaitGroup 与 sync.Once'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>后端写接口常说的<strong>悲观锁</strong>（数据库 <code class="bg-purple-100 px-1 rounded text-xs font-mono">SELECT ... FOR UPDATE</code>）≈ 本文的<strong>互斥锁</strong>——先锁行再操作，别的写被堵住；<strong>乐观锁</strong>（UPDATE 带 <code class="bg-purple-100 px-1 rounded text-xs font-mono">WHERE version = N</code>，不匹配就失败重试）≈ <strong>CAS 原子操作</strong>——先干再验，冲突了重来。前端弹窗里防重复提交按钮（<code class="bg-purple-100 px-1 rounded text-xs font-mono">disabled</code> 后立即置灰）就是单线程版的"不可重入锁"。</p>
        </aside>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>互斥锁</strong>：至多一个持有者，有所有权（只有持锁者能解锁）、不可重入（重入自死锁）；与信号量的本质区别是信号量无"所有者"。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>自旋锁</strong>：忙等原子交换；临界区极短 + 多核才划算；单核无意义、长等烧 CPU、会优先级反转；业界只自旋有限轮数。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>阻塞锁底层路径</strong>：CAS 原子抢 → 自旋几轮 → futex 内核挂起睡眠（Go 的 <code class="bg-slate-100 px-1 rounded text-xs font-mono">sync.Mutex</code> 就是这条路径）。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>读写锁</strong>：读读共享、写写/读写互斥；写优先防写饥饿（Go 1.8+ 默认）；适合读多写少。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>原子操作</strong>：CAS / 原子加单条指令无锁搞定简单计数与标志，做不了复合事务。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>口诀</strong>：<strong>锁要短、锁要小、defer 解锁、别拷锁。</strong></span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">相关阅读：<Link :route="'cs-5-c-1-race'" :text="'上一篇：竞态条件与临界区问题'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'cs-5-c-4-deadlock'" :text="'下一篇：死锁与活锁'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'cs-5-c-3-semaphore'" :text="'信号量与条件变量'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-5-c-1-race'" :text="'← 上一节：竞态条件与临界区问题'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-5-c-3-semaphore'" :text="'下一节：信号量与条件变量 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "互斥锁 Mutex" },
  { id: "sec-2", name: "自旋锁 Spinlock" },
  { id: "sec-3", name: "阻塞锁底层路径 ⭐" },
  { id: "sec-4", name: "读写锁 RWLock" },
  { id: "sec-5", name: "原子操作 sync/atomic" },
  { id: "sec-6", name: "公平性与性能权衡" },
  { id: "sec-7", name: "⚠️ 常见坑" },
  { id: "sec-8", name: "与 Go 底层实现 ⭐" },
  { id: "sec-9", name: "小结" },
]

// ===== 代码示例 =====
const mutexCode = `// ① 无锁版本：counter++ 是"读-改-写"三步，并发会丢更新
var counter int

func incNoLock() {
    counter++ // 两个 goroutine 同时读到 5，各自 +1 写回 6 → 丢了一次
}
// go test -race 一跑就报：DATA RACE

// ② sync.Mutex 保护版本
var (
    counter2 int
    mu       sync.Mutex
)

func incWithLock() {
    mu.Lock()          // 抢锁：拿不到就阻塞排队（内部自旋 + futex 睡眠）
    defer mu.Unlock()  // 铁律：Lock 后紧跟 defer，任何返回路径都会解锁
    counter2++         // 现在整个读-改-写是原子的（被锁圈住）
}

// ③ 语义检查：只有持锁者能 Unlock；同样的函数里再来一次 mu.Lock() 就是自死锁
func badReentrant() {
    mu.Lock()
    defer mu.Unlock()
    badReentrant() // 锁没释放又抢同一把锁 → 永久阻塞，go vet/测试才会暴露
}`;
const rwlockCode = `// 读多写少场景：缓存表 + 读写锁
var (
    cache map[string]string
    rwMu  sync.RWMutex
)

func get(key string) (string, bool) {
    rwMu.RLock()          // 读锁：读者之间并发进入，互不阻塞
    defer rwMu.RUnlock()
    v, ok := cache[key]
    return v, ok
}

func put(key, val string) {
    rwMu.Lock()           // 写锁：等所有读者退出后独占
    defer rwMu.Unlock()
    cache[key] = val
}

// benchmark 思路（对比 Mutex）：
//   跑 100 个 goroutine 疯狂调 get()，另 2 个偶发调 put()
//   结果：RWMutex 版 QPS 明显更高（读者并发跑满多核），Mutex 版全挤成一串
//   注意：如果写操作也很频繁，RWMutex 反而更慢（读写互斥开销 > 纯 Mutex）` ;
const atomicCode = `// ① 无锁计数器：atomic.AddInt64 → 一条 LOCK XADD，不丢更新
var hits int64

func incHit() {
    atomic.AddInt64(&hits, 1) // 读-加-写一次性原子完成
}

// ② CAS：乐观锁 / "只允许一个成功"的标志位
var initialized int32

func initOnce() bool {
    // 旧值 == 0 就换成 1 并返回 true；否则返回 false
    // 并发下保证只有第一个调用者拿到 true（无锁版 sync.Once）
    return atomic.CompareAndSwapInt32(&initialized, 0, 1)
}

// ③ CAS 循环：拿不到就重试（无锁队列/自旋式的经典写法）
func spinIncr(p *int64) {
    for {
        old := atomic.LoadInt64(p)
        if atomic.CompareAndSwapInt64(p, old, old+1) {
            return // CAS 成功，别的线程没动过这个值
        }
        // 失败说明有别人抢先改了，重新读再试
    }
}`;
const lockPathCode = `// sync.Mutex.Lock 的概念流程（runtime 实现，伪代码）
func (m *Mutex) Lock() {
    // ① 乐观路径：CAS 原子抢锁，state 从 0（空闲）→ 1（锁定）
    if atomic.CompareAndSwapUint32(&m.state, 0, mutexLocked) {
        return // 抢到了！全程用户态，约 10ns
    }

    // ② 乐观期：自旋几轮（满足多核 + 自旋计数未超限时）
    if canSpin() && activeSpin < maxActiveSpin {
        for i := 0; i < spinRounds; i++ {
            if atomic.LoadUint32(&m.state)&mutexLocked == 0 {
                // 持锁者已释放，再 CAS 抢一次
                if atomic.CompareAndSwapUint32(&m.state, 0, mutexLocked) {
                    return
                }
            }
            // 退避一下，别把自己的缓存行打爆
        }
        return // 自旋期抢到了
    }

    // ③ 悲观路径：进内核挂起（semacquire → futex FUTEX_WAIT）
    //    goroutine 睡眠，它占用的 M 让出去跑别的 goroutine
    semacquire(&m.sema)
    // 被 FUTEX_WAKE 唤醒后重新回到 ① 抢锁
}

func (m *Mutex) Unlock() {
    // 置回 0；若有等待者，FUTEX_WAKE 唤醒队头
}`;
</script>

<style scoped></style>
