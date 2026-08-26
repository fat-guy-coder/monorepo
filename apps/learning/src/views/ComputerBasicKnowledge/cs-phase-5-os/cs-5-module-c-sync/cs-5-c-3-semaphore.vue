<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">信号量与条件变量</h1><p class="text-sm text-slate-500 mt-1">用"计数 + 通知"让并发协作——生产者、消费者、等待唤醒不再各自为战</p></div><div class="flex items-center gap-3"><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">操作系统 5-c-3</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📐</span>结构总览：信号量管"数量"，条件变量管"通知"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">锁管的是"能不能进"（互斥），信号量管的是"还剩几个"（计数 + 阻塞等待），条件变量管的是"什么时候告诉我"（等待 + 唤醒）。三者层层递进：<strong>信号量 = 计数 + 等待队列</strong>，<strong>条件变量 = 等条件成立 + 唤醒通知</strong>，而 <strong>Go 的 channel 底层正好把这两样都缝在了一起</strong>。</p>

        <figure class="mb-4">
          <svg viewBox="0 0 760 300" class="w-full h-auto">
            <defs>
              <marker id="sem-a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#94a3b8"/></marker>
              <marker id="sem-b" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#06b6d4"/></marker>
              <marker id="sem-c" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#f59e0b"/></marker>
            </defs>

            <!-- ① 计数信号量 S 随 P/V 变化 -->
            <text x="20" y="22" font-size="13" font-weight="bold" fill="#0f172a" font-family="monospace">① 计数信号量：P 减 V 加，S = 3→2→1→0→1</text>
            <rect x="20" y="40" width="34" height="34" rx="6" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/><text x="37" y="62" text-anchor="middle" font-size="15" font-weight="bold" fill="#b45309" font-family="monospace">3</text>
            <rect x="68" y="40" width="34" height="34" rx="6" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/><text x="85" y="62" text-anchor="middle" font-size="15" font-weight="bold" fill="#b45309" font-family="monospace">2</text>
            <rect x="116" y="40" width="34" height="34" rx="6" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/><text x="133" y="62" text-anchor="middle" font-size="15" font-weight="bold" fill="#b45309" font-family="monospace">1</text>
            <rect x="164" y="40" width="34" height="34" rx="6" fill="#cffafe" stroke="#06b6d4" stroke-width="1.5"/><text x="181" y="62" text-anchor="middle" font-size="15" font-weight="bold" fill="#0e7490" font-family="monospace">0</text>
            <rect x="212" y="40" width="34" height="34" rx="6" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/><text x="229" y="62" text-anchor="middle" font-size="15" font-weight="bold" fill="#b45309" font-family="monospace">1</text>
            <line x1="54" y1="57" x2="68" y2="57" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#sem-a)"/><text x="61" y="49" text-anchor="middle" font-size="10" font-weight="bold" fill="#d97706" font-family="monospace">P</text>
            <line x1="102" y1="57" x2="116" y2="57" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#sem-a)"/><text x="109" y="49" text-anchor="middle" font-size="10" font-weight="bold" fill="#d97706" font-family="monospace">P</text>
            <line x1="150" y1="57" x2="164" y2="57" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#sem-a)"/><text x="157" y="49" text-anchor="middle" font-size="10" font-weight="bold" fill="#d97706" font-family="monospace">P</text>
            <line x1="198" y1="57" x2="212" y2="57" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#sem-a)"/><text x="205" y="49" text-anchor="middle" font-size="10" font-weight="bold" fill="#0891b2" font-family="monospace">V</text>
            <text x="20" y="94" font-size="11" fill="#64748b" font-family="monospace">P(S)：S-- ；减完变负 → 阻塞进等待队列</text>
            <text x="20" y="110" font-size="11" fill="#64748b" font-family="monospace">V(S)：S++ ；唤醒队头一个等待者</text>
            <rect x="20" y="122" width="230" height="34" rx="8" fill="#fff7ed" stroke="#fdba74" stroke-width="1"/>
            <text x="30" y="143" font-size="10" fill="#9a3412" font-family="monospace">3 次 P 把 S 打到 0；再来 P → S=-1，</text>
            <text x="30" y="156" font-size="10" fill="#9a3412" font-family="monospace">阻塞者入队，等某次 V 来救。</text>

            <!-- ② 生产者消费者 -->
            <text x="270" y="22" font-size="13" font-weight="bold" fill="#0f172a" font-family="monospace">② 生产者-消费者：empty/full 双信号量</text>
            <rect x="300" y="40" width="160" height="40" rx="8" fill="#cffafe" stroke="#06b6d4" stroke-width="1.5"/>
            <text x="380" y="58" text-anchor="middle" font-size="11" font-weight="bold" fill="#0e7490" font-family="monospace">生产者</text>
            <text x="380" y="73" text-anchor="middle" font-size="10" fill="#155e75" font-family="monospace">P(empty) 占空位</text>
            <rect x="300" y="120" width="160" height="52" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="380" y="138" text-anchor="middle" font-size="11" font-weight="bold" fill="#b45309" font-family="monospace">有界缓冲（容量 3）</text>
            <text x="380" y="153" text-anchor="middle" font-size="10" fill="#92400e" font-family="monospace">empty: 3→0 ｜ full: 0→3</text>
            <text x="380" y="166" text-anchor="middle" font-size="10" fill="#92400e" font-family="monospace">满 / 空 都由信号量挡住</text>
            <rect x="300" y="212" width="160" height="40" rx="8" fill="#cffafe" stroke="#06b6d4" stroke-width="1.5"/>
            <text x="380" y="230" text-anchor="middle" font-size="11" font-weight="bold" fill="#0e7490" font-family="monospace">消费者</text>
            <text x="380" y="245" text-anchor="middle" font-size="10" fill="#155e75" font-family="monospace">P(full) 取满格</text>
            <line x1="380" y1="80" x2="380" y2="120" stroke="#06b6d4" stroke-width="1.5" marker-end="url(#sem-b)"/>
            <text x="440" y="104" text-anchor="end" font-size="10" fill="#0891b2" font-family="monospace">V(full) 报满</text>
            <line x1="380" y1="172" x2="380" y2="212" stroke="#06b6d4" stroke-width="1.5" marker-end="url(#sem-b)"/>
            <text x="440" y="196" text-anchor="end" font-size="10" fill="#0891b2" font-family="monospace">V(empty) 还空位</text>

            <!-- ③ 条件变量等待队列 -->
            <text x="520" y="22" font-size="13" font-weight="bold" fill="#0f172a" font-family="monospace">③ 条件变量：wait / signal / broadcast</text>
            <rect x="520" y="40" width="220" height="36" rx="8" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.5"/>
            <text x="630" y="62" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569" font-family="monospace">条件不成立 → cond.Wait()</text>
            <line x1="630" y1="76" x2="630" y2="96" stroke="#94a3b8" stroke-width="1.5" marker-end="url(#sem-a)"/>
            <rect x="560" y="100" width="140" height="22" rx="6" fill="#cbd5e1"/><text x="630" y="115" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155" font-family="monospace">T1 等</text>
            <rect x="560" y="126" width="140" height="22" rx="6" fill="#cbd5e1"/><text x="630" y="141" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155" font-family="monospace">T2 等</text>
            <rect x="560" y="152" width="140" height="22" rx="6" fill="#cbd5e1"/><text x="630" y="167" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155" font-family="monospace">T3 等</text>
            <text x="560" y="192" font-size="10" fill="#64748b" font-family="monospace">等待队列：睡眠，不占 CPU</text>
            <rect x="520" y="206" width="220" height="34" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1"/>
            <text x="630" y="227" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8" font-family="monospace">配互斥锁：wait 释放锁+睡眠，醒来重拿锁</text>
            <line x1="590" y1="178" x2="573" y2="246" stroke="#06b6d4" stroke-width="1.5" marker-end="url(#sem-b)"/>
            <line x1="670" y1="178" x2="687" y2="246" stroke="#f59e0b" stroke-width="1.5" marker-end="url(#sem-c)"/>
            <rect x="520" y="250" width="105" height="40" rx="8" fill="#cffafe" stroke="#06b6d4" stroke-width="1.5"/>
            <text x="572" y="267" text-anchor="middle" font-size="11" font-weight="bold" fill="#0e7490" font-family="monospace">signal</text>
            <text x="572" y="282" text-anchor="middle" font-size="10" fill="#155e75" font-family="monospace">唤醒 1 个</text>
            <rect x="635" y="250" width="105" height="40" rx="8" fill="#fffbeb" stroke="#f59e0b" stroke-width="1.5"/>
            <text x="687" y="267" text-anchor="middle" font-size="11" font-weight="bold" fill="#b45309" font-family="monospace">broadcast</text>
            <text x="687" y="282" text-anchor="middle" font-size="10" fill="#92400e" font-family="monospace">唤醒全部</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">左边：信号量用计数 S 管"还剩几个"，P 拿走 V 归还，S 变负就有人阻塞；中间：生产者消费者用 empty/full 两个信号量挡住"缓冲满"和"缓冲空"两个边界；右边：条件变量用等待队列管"通知"，signal 叫醒一个、broadcast 叫醒全部</figcaption>
        </figure>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>计数信号量 ≈ <strong>并发限流库 p-limit / AsyncPool</strong>（池子里 N 个"执行位"，占完就排队）；条件变量 ≈ <strong>EventEmitter 的通知</strong>（emit 一次 signal，广播一次 broadcast）；有界缓冲 ≈ <strong>带 max 长度的任务队列</strong>（满了就背压）。你在 Node 里调 <code class="bg-purple-100 px-1 rounded text-xs font-mono">pLimit(3)</code>，就是在造一个计数信号量。</p>
        </aside>
      </section>

      <!-- 1. 信号量：整型计数 S + P/V -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">1</span>信号量：整型计数 S + 两个原子操作 P/V</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">信号量由荷兰计算机科学家 <strong>Edsger Dijkstra（1965）</strong>提出：一个<strong>整型计数 S</strong> + 两个原子操作 <code class="bg-slate-100 px-1 rounded text-xs font-mono">P</code>（wait / down / acquire）和 <code class="bg-slate-100 px-1 rounded text-xs font-mono">V</code>（signal / up / release）。S 表示"当前可用的资源数"，P 拿走一个，V 还回一个；<strong>S 为负就说明有 <code>-S</code> 个线程在排队</strong>。</p>
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200 mb-4">
          <p class="text-lg font-bold text-amber-800 mb-1 text-center font-mono">P(S)：S = S - 1；若 S &lt; 0 则阻塞 ｜ V(S)：S = S + 1；若有等待者唤醒一个</p>
          <p class="text-xs text-amber-600 text-center">Dijkstra 原名 Proberen（P=试探/申请）与 Verhogen（V=增加/释放），P/V 就是这么来的</p>
        </div>
        <p class="text-slate-600 mb-2 text-sm leading-relaxed">关键在"负计数"的设计：<strong>S ≥ 0 时表示剩余资源</strong>，<strong>S &lt; 0 时表示排队等待者的数量</strong>。下面用 Go 的互斥锁 + 条件变量把经典语义还原出来（这本身就是"信号量 ≈ 锁 + 条件变量"的实证）：</p>
        <div class="mb-4"><Code language="go" :code="semaphorePVCode" title="semaphore-pv.go" /></div>
        <h3 class="text-base font-semibold text-slate-700 mb-2">计数信号量的三个用途</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>互斥</strong>：S 初始化为 <code class="bg-slate-100 px-1 rounded text-xs font-mono">1</code>（二元信号量），P/V 包住临界区——同一时刻只有一个线程能进来。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>资源池 / 限流</strong>：S 初始化为<strong>可用资源数</strong>（如 5 个数据库连接、3 个并发位），P 申请、V 归还，用满就排队——这就是连接池、线程池的原理。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>同步 / 协作</strong>：用<strong>两个信号量组合</strong>表达"先生产后消费"的时序约束——最经典的例子就是下一节的<strong>生产者-消费者</strong>。</div></li>
        </ol>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">二元信号量（S∈{0,1}）</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">互斥锁 Mutex</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">本质</td><td class="px-4 py-2 border">整型计数（能取 0/1）</td><td class="px-4 py-2 border">锁状态 + 持有者</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">所有者</td><td class="px-4 py-2 border font-mono text-xs">❌ 无——谁都能 V 释放</td><td class="px-4 py-2 border font-mono text-xs">✅ 有——谁 lock 谁 unlock</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">释放者</td><td class="px-4 py-2 border">任意线程都能 V（计数 +1）</td><td class="px-4 py-2 border">只有持锁线程能 unlock</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">计数语义</td><td class="px-4 py-2 border">可表达"N 个资源"（>1）</td><td class="px-4 py-2 border">只有"锁上/没锁"两态</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">经典场景</td><td class="px-4 py-2 border">限流、信号、同步</td><td class="px-4 py-2 border">临界区互斥</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑：把二元信号量当互斥锁用。</strong>互斥锁有<strong>所有者</strong>（谁 lock 谁 unlock），而信号量<strong>没有任何所有权</strong>——别的线程也能对你的 S 做 V。T1 拿 S 进临界区，T2 误执行 V 把 S 抬回 1，T3 就能同时进临界区，"互斥"瞬间失效。锁是"只允许钥匙持有者开"，信号量是"谁都能投一枚硬币进去"。</p>
        </aside>
      </section>

      <!-- 2. 生产者-消费者 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">2</span>生产者-消费者：有界缓冲区 + 两个信号量</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">经典场景：生产者往<strong>有界缓冲</strong>里放东西，消费者从里面取。边界有两个——<strong>缓冲满</strong>（生产者必须等空位）、<strong>缓冲空</strong>（消费者必须等数据）。一个信号量只能表达一个计数，所以要用<strong>两个</strong>：</p>
        <ul class="space-y-2 text-slate-600 mb-4 text-sm">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-xs font-mono">empty = N</code>：还有几个<strong>空位</strong>（初始 = 缓冲容量）→ 生产者 P(empty)、消费者 V(empty)。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-xs font-mono">full = 0</code>：已经放了几个<strong>数据</strong>（初始 0）→ 生产者 V(full)、消费者 P(full)。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>再配一把<strong>互斥锁 mutex</strong>：保护缓冲区这个共享数组的索引操作（empty/full 管"能不能"，mutex 管"不乱"）。</span></li>
        </ul>
        <h3 class="text-base font-semibold text-slate-700 mb-2">执行流程逐步拆解</h3>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600">生产者：<code class="bg-slate-100 px-1 rounded text-xs font-mono">P(empty)</code>——抢一个空位。空位是 0 就<strong>阻塞</strong>，说明缓冲满了。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600">生产者：<code class="bg-slate-100 px-1 rounded text-xs font-mono">mutex.Lock()</code> → 写入缓冲、移动写指针 → <code class="bg-slate-100 px-1 rounded text-xs font-mono">mutex.Unlock()</code>。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600">生产者：<code class="bg-slate-100 px-1 rounded text-xs font-mono">V(full)</code>——数据 +1，若有消费者在等 full，唤醒它。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600">消费者：<code class="bg-slate-100 px-1 rounded text-xs font-mono">P(full)</code>——取一个数据。full 是 0 就<strong>阻塞</strong>，说明缓冲空了。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600">消费者：<code class="bg-slate-100 px-1 rounded text-xs font-mono">mutex.Lock()</code> → 读出缓冲、移动读指针 → <code class="bg-slate-100 px-1 rounded text-xs font-mono">mutex.Unlock()</code>。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">6</span><div class="text-slate-600">消费者：<code class="bg-slate-100 px-1 rounded text-xs font-mono">V(empty)</code>——空位 +1，唤醒等在 empty 上的生产者。</div></li>
        </ol>
        <p class="text-slate-600 mb-2 text-sm leading-relaxed"><strong>为什么必须两个信号量？</strong>一个信号量只能表达一个方向的容量。如果只用 full：生产者能知道"满了没"，但消费者满时没人知道"还有没有数据"；两个信号量互为"水闸"，empty 挡生产者、full 挡消费者，谁也饿不死。</p>
        <div class="mb-4"><Code language="go" :code="producerConsumerCode" title="producer-consumer.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ Go 里的天然对应：</strong>有界 channel 本身就是"环形缓冲 + 满/空闸门"。<code class="bg-emerald-100 px-1 rounded text-xs font-mono">buffer &lt;- v</code> 满则阻塞（≈ P(empty) + 写），<code class="bg-emerald-100 px-1 rounded text-xs font-mono">&lt;-buffer</code> 空则阻塞（≈ P(full) + 读）——你根本不用手写 empty/full 两个信号量。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑：P 忘记配对 V → 永久阻塞。</strong>经典死法：拿到 P(empty) 后业务 panic 提前 return，V(full) 永远没执行，full 计数少了 1，后来某个消费者 P(full) 直接 S&lt;0 排队，而没人再 V(full) 来救它 → 整个流水线<strong>卡死</strong>。习惯：<code class="bg-amber-100 px-1 rounded text-xs font-mono">defer V()</code>（Go 里就是 <code class="bg-amber-100 px-1 rounded text-xs font-mono">defer func() { &lt;-sem }()</code>），把"归还"和"申请"绑死。</p>
        </aside>
      </section>

      <!-- 3. 自旋 vs 阻塞 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">3</span>自旋 vs 阻塞：信号量是"睡觉"，不是"空转"</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">等资源的时候有两条路：<strong>忙等（自旋）</strong>——while 循环空转刷 CPU，适合临界区极短、多核、锁几乎不被抢占的场景；<strong>阻塞</strong>——把线程挂到<strong>内核等待队列</strong>，交出 CPU 去睡，被唤醒才回来。经典信号量的 P/V 是<strong>阻塞式</strong>的：S &lt; 0 就把自己塞进等待队列睡眠；<strong>忙等是自旋锁的专属动作</strong>，不要混为一谈。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">自旋锁 Spinlock</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">信号量（阻塞式）</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">等待方式</td><td class="px-4 py-2 border">忙等：循环读锁变量</td><td class="px-4 py-2 border">睡眠：挂内核等待队列</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">等待时 CPU</td><td class="px-4 py-2 border font-mono text-xs">💯 占满（空转）</td><td class="px-4 py-2 border font-mono text-xs">0（让出，可跑别的）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">适合场景</td><td class="px-4 py-2 border">临界区极短（几百 ns）</td><td class="px-4 py-2 border">临界区可能较久 / 等待者多</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">唤醒延迟</td><td class="px-4 py-2 border">无（立等可取）</td><td class="px-4 py-2 border">有（上下文切换开销）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">计数能力</td><td class="px-4 py-2 border">无（只有 0/1）</td><td class="px-4 py-2 border">可计数 N 个资源</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 两个世界的折衷：</strong>现代系统常用"先自旋、后睡眠"的混合策略——先空转几个时钟周期（赌锁很快释放），超时再睡。Go 的 <code class="bg-blue-100 px-1 rounded text-xs font-mono">sync.Mutex</code> 就是这么做的（adaptive spinning），所以它既快又不会烧死 CPU。</p>
        </aside>
      </section>

      <!-- 4. 条件变量 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">4</span>条件变量：等"条件成立"的通知机制</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">条件变量<strong>不是锁</strong>，它是一把"门铃"：线程在<strong>某个条件不成立</strong>时（比如缓冲区空、数据没就绪）不去轮询，而是调用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">wait</code> 把自己挂起来；等别的线程让条件成立后，用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">signal</code> / <code class="bg-slate-100 px-1 rounded text-xs font-mono">broadcast</code> 按门铃叫醒它。核心三件套：</p>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>必须搭配互斥锁</strong>：wait 调用时要<strong>原子地"释放锁 + 睡眠"</strong>，被唤醒后<strong>重新抢回锁</strong>再往下走——否则别人改条件时你正拿着锁，改不了，就永远等不到。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>signal 唤醒一个 vs broadcast 唤醒全部</strong>：信号量语义下唤醒队头一个即可（每个被唤走的资源都对应一个 V）；"全员就绪"这类场景要 broadcast，把等待队列<strong>全部</strong>叫醒。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>用条件变量消灭忙等轮询</strong>：不用条件变量就得 <code class="bg-slate-100 px-1 rounded text-xs font-mono">for !ready { time.Sleep(...) }</code> 死循环轮询，白白烧 CPU 和延迟；wait 是<strong>事件驱动</strong>，来了才醒。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>虚假唤醒 spurious wakeup</strong>：操作系统可能<strong>不保证理由</strong>地叫醒你（信号早到、多核竞争）。所以被唤醒后<strong>必须重查条件</strong>——永远用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">for !cond { wait() }</code>，而不是 <code class="bg-slate-100 px-1 rounded text-xs font-mono">if !cond { wait() }</code>。</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="syncCondCode" title="sync-cond-ready.go" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">轮询 busy-wait</th><th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">条件变量 wait/signal</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold">等待时 CPU</td><td class="px-4 py-2 border font-mono text-xs">💯 持续烧</td><td class="px-4 py-2 border font-mono text-xs">0（睡眠）</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">延迟</td><td class="px-4 py-2 border">取决于轮询间隔（假延迟）</td><td class="px-4 py-2 border">事件一到立即唤醒</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">能否丢事件</td><td class="px-4 py-2 border font-mono text-xs">❌ 条件在两次轮询间变化也能看到</td><td class="px-4 py-2 border font-mono text-xs">⚠️ signal 早于 wait 则丢——必须 while 重查</td></tr>
              <tr><td class="px-4 py-2 border font-semibold">代码</td><td class="px-4 py-2 border font-mono text-xs">简单但低效</td><td class="px-4 py-2 border font-mono text-xs">需小心配对，但高效</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 两个经典坑：</strong>① <strong>wait 前没检查条件</strong>——条件早已成立还去 wait，signal 已经 broadcast 过，你这一睡就没人再叫（事件丢失）。正确姿势是"先 while 查条件再 wait"。② <strong>signal 后没重查 while</strong>——被唤醒不代表条件真的成立（虚假唤醒、另一个线程抢先把资源拿走了），醒来必须<strong>回到 while 再查一遍</strong>。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>条件变量 ≈ <strong>EventEmitter</strong>。等数据就绪 <code class="bg-purple-100 px-1 rounded text-xs font-mono">emitter.once('ready', run)</code> 就是 wait；<code class="bg-purple-100 px-1 rounded text-xs font-mono">emitter.emit('ready')</code> 一次 ≈ signal 唤醒一个；<code class="bg-purple-100 px-1 rounded text-xs font-mono">emitter.emit('ready')</code> 多个监听者 + 全局通知 ≈ broadcast 唤醒全部。事件源若在注册监听器<strong>之前</strong>就 emit 了，回调照样收不到——和 wait 丢 signal 是同一个坑，所以前端也用"先检查状态再等事件"兜底。</p>
        </aside>
      </section>

      <!-- 5. 管程 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">5</span>管程 Monitor：把互斥 + 条件变量缝进一个对象</h2>
        <p class="text-slate-600 mb-4 leading-relaxed">裸信号量最大的痛点是<strong>责任分散</strong>：P/V 谁负责配对？条件什么时候 check？一旦写错就是隐蔽的死锁。为此 Tony Hoare 提出<strong>管程</strong>：把「互斥锁 + 条件变量 + 共享数据」<strong>封装成一个对象</strong>，只有通过对象的方法才能碰数据，方法进入自动拿锁、条件用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">wait / notify</code> 表达——<strong>配对关系由结构保证，不靠程序员自觉</strong>。</p>
        <ul class="space-y-2 text-slate-600 mb-4 text-sm">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>Java</strong>：<code class="bg-slate-100 px-1 rounded text-xs font-mono">synchronized</code> 方法 + <code class="bg-slate-100 px-1 rounded text-xs font-mono">wait()/notify()/notifyAll()</code>，每个对象自带一个隐式条件变量。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>C#</strong>：<code class="bg-slate-100 px-1 rounded text-xs font-mono">lock</code> + <code class="bg-slate-100 px-1 rounded text-xs font-mono">Monitor.Wait/Pulse</code>。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>Go</strong>：把「互斥 + 条件变量」拆开给 <code class="bg-slate-100 px-1 rounded text-xs font-mono">sync.Mutex</code> + <code class="bg-slate-100 px-1 rounded text-xs font-mono">sync.Cond</code>；但更主流的是直接用 <strong>channel</strong>——把"数据 + 同步"一体打包。</span></li>
        </ul>
        <p class="text-slate-600 mb-2 text-sm leading-relaxed">现代语言倾向<strong>管程 / 原生结构（channel、actor、async）</strong>而非裸信号量：正确性交给语言运行时，程序员只描述"做什么"不描述"怎么排队"。这也是本模块一路强调的——Go 用 channel 表达协作，正是这种哲学。</p>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 一句话记忆：</strong>信号量是"零件"，管程是"封装好的部件"。自己拧零件容易漏；直接用带互斥的部件，想错都难。需要"手工拧零件"的场合（限流、多副本计数）才回落到计数信号量。</p>
        </aside>
      </section>

      <!-- 6. 与 Go 底层实现的关系 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">6</span>与 Go 底层实现的关系 ⭐⭐</h2>
        <div class="bg-gradient-to-r from-cyan-50 to-sky-50 rounded-xl p-5 border border-cyan-200 mb-4">
          <p class="text-lg font-bold text-cyan-800 mb-1 text-center font-mono">Go 的 channel 底层 = 互斥锁 + 条件变量（等待队列）+ 环形缓冲</p>
          <p class="text-xs text-cyan-600 text-center">这一句话，把信号量、条件变量、缓冲全串起来了——你在这篇学的每个概念，channel 内部都有对应物</p>
        </div>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span><div class="text-slate-600"><strong>buffered channel 的容量 ≈ 信号量计数</strong>：<code class="bg-slate-100 px-1 rounded text-xs font-mono">make(chan struct{}, N)</code> 就是"有 N 个令牌的计数信号量"。go-2-6 实战 2 正是用 <code class="bg-slate-100 px-1 rounded text-xs font-mono">make(chan struct{}, N)</code> 手搓信号量做限流——发令牌进 channel 是 P，取出来是 V。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span><div class="text-slate-600"><strong>send/recv 的阻塞与唤醒 ≈ 条件变量机制</strong>：channel 满时发送方被塞进 <strong>sendq 等待队列</strong>睡眠（≈ cond.Wait）；有人 recv 腾出空间后按次序唤醒一个发送方（≈ cond.Signal）。channel 空时 recv 方进 <strong>recvq</strong>，对称同理。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span><div class="text-slate-600"><strong>数据本身存环形缓冲</strong>：chansend 前 / chanrecv 后都要锁一把 <code class="bg-slate-100 px-1 rounded text-xs font-mono">mutex</code>（hchan.lock），保护共享的环形队列——和生产者消费者的 mutex 如出一辙。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span><div class="text-slate-600"><strong>sync.Cond 就是裸条件变量</strong>：它不包互斥（要你自己给 <code class="bg-slate-100 px-1 rounded text-xs font-mono">sync.NewCond(&mu)</code> 传锁），也不管数据。所以 Go 只在"纯等待通知、不搬运数据"的场景用 Cond，平时<strong>优先 channel</strong>。</div></li>
          <li class="flex gap-3"><span class="flex-shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span><div class="text-slate-600"><strong>哲学：不要通过共享内存来通信，要通过通信来共享内存</strong>。信号量/条件变量的世界是"共享变量 + 锁 + 队列"；Go 的 channel 把<strong>数据本身</strong>当作同步媒介，谁拿到数据谁就天然完成了同步——从根上绕开大部分 P/V 配对错误。</div></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="semaphoreChannelCode" title="channel-semaphore.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑：goroutine 对 channel 泄漏。</strong>用 channel 当信号量时，忘记 <code class="bg-amber-100 px-1 rounded text-xs font-mono">&lt;-sem</code> 归还令牌（V 缺失），容量 N 很快被占满，后续 goroutine 全部 <code class="bg-amber-100 px-1 rounded text-xs font-mono">sem &lt;- struct{}{}</code> 永久阻塞——就是"P 不配对 V"的 channel 版。漏归还 + 泄漏的 goroutine 一起把整个池子挤爆。归还一律 <code class="bg-amber-100 px-1 rounded text-xs font-mono">defer</code>。</p>
        </aside>
        <p class="text-sm text-slate-500 leading-relaxed">跳转阅读：<Link :route="'go-2-2-channels'" :text="'Go channel：发送接收与缓冲'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'go-2-6-sync-wg-once'" :text="'sync.WaitGroup、sync.Once、sync.Cond 使用场景'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>有界 channel ≈ <strong>有界任务队列 + 背压</strong>（如 RabbitMQ 的 prefetch 上限、Worker 队列的 maxLen）。信号量的"占位/归还"在前端就是 <code class="bg-purple-100 px-1 rounded text-xs font-mono">pLimit</code> 里的 token 槽位：进一个任务拿一个 token，跑完归还，池满任务排队——和 <code class="bg-purple-100 px-1 rounded text-xs font-mono">make(chan struct{}, N)</code> 是同一个模型。</p>
        </aside>
      </section>

      <!-- 7. 小结 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结 ✅</h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>信号量</strong> = 整型计数 S + 原子操作 <code class="bg-slate-100 px-1 rounded text-xs font-mono">P/V</code>（Dijkstra 提出）：P 减一不足则阻塞，V 加一并唤醒一个等待者。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>二元信号量 ≈ 互斥锁，但无所有者</strong>——任何线程都能 V 释放，不能替代有所有权的锁。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>计数信号量三用途：<strong>互斥（S=1）、资源池/限流（S=资源数）、同步（双信号量组合）</strong>。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>生产者-消费者</strong>：empty + full 两个信号量挡"满/空"两个边界 + mutex 护索引，两个信号量一个都不能省。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>信号量<strong>阻塞式</strong>（内核等待队列），忙等是自旋锁的事；现代系统常"先自旋再睡眠"。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>条件变量</strong> = 等条件成立的通知机制，必须搭配互斥锁；<strong>signal 一个 / broadcast 全部</strong>；唤醒后必须 <code class="bg-slate-100 px-1 rounded text-xs font-mono">while</code> 重查防虚假唤醒。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>管程</strong>把互斥 + 条件变量封装进对象；现代语言倾向管程/原生结构，Go 用 channel。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span><strong>Go channel 底层 = 互斥锁 + 条件变量（sendq/recvq 等待队列）+ 环形缓冲</strong>；容量 ≈ 信号量计数；sync.Cond 即裸条件变量。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">▸</span><span>Go 哲学：<strong>不要通过共享内存来通信，要通过通信来共享内存</strong>——数据即同步。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">相关阅读：<Link :route="'go-2-2-channels'" :text="'Go channel 详解'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'go-2-6-sync-wg-once'" :text="'sync.Cond 使用场景'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'go-2-5-sync-mutex'" :text="'Go 互斥锁与自旋'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
      <Link :route="'cs-5-c-2-locks'" :text="'← 上一节：互斥锁、自旋锁、读写锁'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
      <Link :route="'cs-5-c-4-deadlock'" :text="'下一节：死锁：四条件、银行家算法、检测恢复 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-amber-600! bg-transparent! border-none! inline!" />
    </nav></footer>
  </div>
</template>

<script setup lang="ts">
import { Nav, Code, Link } from 'components'

const navList = [
  { id: "sec-overview", name: "📐 结构总览" },
  { id: "sec-1", name: "信号量：S + P/V" },
  { id: "sec-2", name: "生产者-消费者" },
  { id: "sec-3", name: "自旋 vs 阻塞" },
  { id: "sec-4", name: "条件变量" },
  { id: "sec-5", name: "管程 Monitor" },
  { id: "sec-6", name: "与 Go 底层的关系" },
  { id: "sec-7", name: "小结" },
]

// ===== 代码示例 =====
const semaphorePVCode = `// 经典信号量 P/V 语义（概念示意，Dijkstra 1965）
// 信号量 ≈ 互斥锁 + 条件变量（等待队列）——下面用 Go 还原，正验证了这一点
type Semaphore struct {
    count int            // S：可用资源数；S<0 时 -S 就是排队等待者数量
    mu    sync.Mutex     // 保护 count 自身
    cond  *sync.Cond     // 内核里是等待队列，这里用条件变量模拟
}

func NewSemaphore(n int) *Semaphore {
    s := &Semaphore{count: n}
    s.cond = sync.NewCond(&s.mu)
    return s
}

// P(S)：申请资源（wait / down / acquire）
func (s *Semaphore) P() {
    s.mu.Lock()
    s.count--              // ① 先减 1
    for s.count < 0 {      // ② 减完变负 → 资源不足
        s.cond.Wait()      // ③ 阻塞：进等待队列，交出 CPU
    }
    s.mu.Unlock()
}

// V(S)：释放资源（signal / up / release）
func (s *Semaphore) V() {
    s.mu.Lock()
    s.count++              // ① 先加 1
    s.cond.Signal()        // ② 唤醒一个等待者（没人等就是纯加计数）
    s.mu.Unlock()
}

// 用法：S=1 互斥；S=N 限流；两个组合做生产者-消费者同步`;
const producerConsumerCode = `// 生产者-消费者：用有界 channel 表达（底层 = 环形缓冲 + 满/空闸门）
const bufSize = 3
var buffer = make(chan int, bufSize) // 有界缓冲，容量 3

// 生产者：写满就阻塞，直到消费者腾出空位
func producer(wg *sync.WaitGroup, done chan struct{}) {
    defer wg.Done()
    for i := 1; i <= 5; i++ {
        buffer <- i                 // 满则阻塞 ≈ P(empty)；投递后 ≈ V(full)
        fmt.Printf("生产 %d（缓冲中 %d/%d）\\n", i, len(buffer), bufSize)
    }
    close(done)                     // 通知消费者"生产完了"
}

// 消费者：读空就阻塞，直到生产者投递新数据
func consumer(wg *sync.WaitGroup, done chan struct{}) {
    defer wg.Done()
    for {
        select {
        case <-done:                // 生产方收工
            fmt.Println("消费者结束")
            return
        case v := <-buffer:         // 空则阻塞 ≈ P(full)；取走 ≈ V(empty)
            fmt.Printf("消费 %d（剩余 %d/%d）\\n", v, len(buffer), bufSize)
        }
    }
}

func main() {
    var wg sync.WaitGroup
    wg.Add(2)
    done := make(chan struct{})
    go producer(&wg, done)
    go consumer(&wg, done)
    wg.Wait()
    // 输出（时序不定）:
    // 生产 1（缓冲中 1/3）
    // 消费 1（剩余 0/3）
    // 生产 2（缓冲中 1/3）
    // ... 缓冲满时生产者自动等待，缓冲空时消费者自动等待
    // 消费者结束
}`;
const syncCondCode = `// sync.Cond：等"条件成立"的通知机制（不互斥，必须搭配互斥锁）
type Shared struct {
    mu    sync.Mutex
    ready bool            // 共享条件：大家等它变 true
    cond  *sync.Cond
}

func NewShared() *Shared {
    s := &Shared{}
    s.cond = sync.NewCond(&s.mu)  // 条件变量绑定锁：wait 原子释放锁+睡眠
    return s
}

// worker：等 ready 成立再干活（代替死循环轮询）
func (s *Shared) waitReady(id int) {
    s.mu.Lock()
    for !s.ready {        // ★ while 重查：防虚假唤醒 spurious wakeup
        s.cond.Wait()     // 原子：释放锁 + 进等待队列睡眠；醒来自动重抢锁
    }
    s.mu.Unlock()
    fmt.Printf("worker %d 开始执行\\n", id)
}

// goReady：广播"就绪"，唤醒全部等待者
func (s *Shared) goReady() {
    s.mu.Lock()
    s.ready = true
    s.cond.Broadcast()    // 唤醒全部；若只想叫醒一个就改用 Signal()
    s.mu.Unlock()
}

func main() {
    s := NewShared()
    var wg sync.WaitGroup
    for i := 1; i <= 3; i++ {     // 3 个 worker 都先等 ready
        wg.Add(1)
        go func(id int) { defer wg.Done(); s.waitReady(id) }(i)
    }
    time.Sleep(100 * time.Millisecond) // 确保 worker 都进入了等待
    s.goReady()                       // 广播：3 个 worker 一起醒
    wg.Wait()
    // 输出: worker 1 开始执行
    //       worker 3 开始执行
    //       worker 2 开始执行
}`;
const semaphoreChannelCode = `// 用 buffered channel 实现计数信号量：容量 = 信号量计数（go-2-6 实战 2）
// 令牌池：同一时刻最多 maxWorkers 个 goroutine 在跑
const maxWorkers = 3
var sem = make(chan struct{}, maxWorkers) // N 个"空 struct" 当令牌

func doWork(id int) {
    sem <- struct{}{}               // P(S)：占一个令牌；池满则阻塞
    defer func() { <-sem }()        // V(S)：归还令牌；defer 保证 P 必有 V 配对
    fmt.Printf("worker %d 工作中\\n", id)
    time.Sleep(time.Second)         // 模拟耗时任务
}

func main() {
    var wg sync.WaitGroup
    for i := 1; i <= 10; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            doWork(id)
        }(i)
    }
    wg.Wait()
    fmt.Println("全部完成：10 个任务，最多 3 个并发")
    // 输出: worker 2 工作中
    //       worker 5 工作中
    //       worker 1 工作中
    //       worker 4 工作中   ← 前三个完成后，第四批才进场
    //       ...
    //       全部完成：10 个任务，最多 3 个并发
}`;
</script>
