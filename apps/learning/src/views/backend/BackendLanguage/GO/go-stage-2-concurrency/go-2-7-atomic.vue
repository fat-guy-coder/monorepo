<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">⚛️ atomic 原子操作</h1><p class="text-sm text-slate-500 mt-1">无锁并发 — CPU 指令级别的原子保障，比 Mutex 快 10-100 倍</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-7-atomic.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-7</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 📐 结构总览 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：counter++ 的竞态 vs atomic 的原子性
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">counter++</code> 是三条 CPU 指令（LOAD→ADD→STORE），两个核心同时执行会互相覆盖。
          atomic 用一条<strong>带 LOCK 前缀的指令</strong>（如 LOCK XADD）锁住内存总线，把整个读-改-写变成原子操作。
        </p>
        <figure class="mb-4">
          <svg viewBox="0 0 720 220" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="at-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- 非原子：三条指令 -->
            <text x="16" y="24" font-size="13" font-family="monospace" fill="#ef4444" font-weight="bold">❌ counter++（三条指令，可被中断）</text>
            <rect x="30" y="36" width="120" height="44" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
            <text x="90" y="58" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b91c1c">① LOAD 读</text>
            <line x1="150" y1="58" x2="180" y2="58" stroke="#94a3b8" stroke-width="2" marker-end="url(#at-arr)" />
            <rect x="185" y="36" width="120" height="44" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
            <text x="245" y="58" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b91c1c">② ADD 加</text>
            <line x1="305" y1="58" x2="335" y2="58" stroke="#94a3b8" stroke-width="2" marker-end="url(#at-arr)" />
            <rect x="340" y="36" width="120" height="44" rx="6" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
            <text x="400" y="58" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" font-weight="bold" fill="#b91c1c">③ STORE 写</text>
            <text x="16" y="104" font-size="11" font-family="monospace" fill="#b91c1c">两个核心同时 LOAD 读到同一个值 → 各自 +1 写回 → 丢失一次 +1</text>

            <!-- 原子：一条指令 -->
            <text x="16" y="138" font-size="13" font-family="monospace" fill="#4ade80" font-weight="bold">✅ atomic.Add（一条 LOCK 指令，不可中断）</text>
            <rect x="30" y="150" width="200" height="44" rx="6" fill="#dcfce7" stroke="#4ade80" stroke-width="2" />
            <text x="130" y="172" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#15803d">LOCK XADD（读+加+写一条）</text>
            <text x="16" y="212" font-size="11" font-family="monospace" fill="#15803d">LOCK 前缀锁内存总线——在这条指令完成前，其他核心无法访问这块内存</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：counter++ 三条指令可被中断（竞态），atomic 用 LOCK 前缀把读改写成一条原子指令</figcaption>
        </figure>
      </section>

      <!-- 1. 为什么需要 atomic -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>为什么 counter++ 不安全？— atomic 解决了什么</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm"><code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">counter++</code> 在 CPU 上是<strong>三条指令</strong>：LOAD(读) → ADD(加) → STORE(写)。如果两个 CPU 核心同时执行这三步，它们可能读到同一个旧值——导致两次 ++ 只生效一次。这就是<strong>竞态条件</strong>。</p>
        <p class="text-slate-600 mb-4 leading-relaxed"><strong>atomic 的做法：</strong>用一条<strong>带 LOCK 前缀的 CPU 指令</strong>（如 x86 的 LOCK XADD）完成整个读-改-写操作。LOCK 前缀<strong>锁住内存总线</strong>——在这条指令完成之前，其他 CPU 核心无法访问这块内存。CPU 级别的保证，比 Mutex（软件锁+上下文切换）快 10-100 倍。</p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-purple-800"><strong>🔗 JS 类比：</strong>JS 单线程不需要 atomic（Event Loop 保证原子性）。Node.js 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Atomics.add()</code> 配合 SharedArrayBuffer/Worker Threads 使用的——和 Go 的 atomic 完全同概念。Go 中 atomic 用于<strong>计数器、标志位、状态值</strong>等单个变量的并发安全。</p></aside>
        <div class="mb-4"><Code language="go" :code="whyCode" title="why_atomic.go" /></div>
      </section>

      <!-- 1.5. 执行流程拆解 -->
      <section id="sec-1-flow" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">⚙️</span>执行流程拆解：竞态现场还原 与 atomic 的 LOCK 指令</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">把 CPU 里发生的事拆成步骤"跑"一遍，彻底看懂为什么 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">counter++</code> 会丢更新、atomic 又是怎么堵住漏洞的。</p>
        <h3 class="text-sm font-semibold text-slate-700 mb-3">A. 竞态现场还原——counter++ 如何丢失一次 +1</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>初始状态</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">counter = 5</code>，goroutine A 和 B 同时执行 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">counter++</code>（counter 位于共享内存）</li>
          <li><strong>核心 A 执行 LOAD</strong>：把 counter 的值 5 读进自己的寄存器</li>
          <li><strong>核心 B 也执行 LOAD</strong>：同样读到 5——因为 A 的 STORE 还没执行，B 看不到任何更新</li>
          <li><strong>核心 A 执行 ADD + STORE</strong>：寄存器里 5+1=6，把 6 写回 counter</li>
          <li><strong>核心 B 执行 ADD + STORE</strong>：基于自己寄存器里的 5 算得 6，把 6 写回 counter——<strong>覆盖了 A 刚写回的 6</strong></li>
          <li><strong>最终结果</strong>：counter = 6，但两次 ++ 应该是 7——<strong>丢失了一次 +1（Lost Update）</strong></li>
        </ol>
        <h3 class="text-sm font-semibold text-slate-700 mb-3">B. atomic.Add 流程——一条 LOCK 指令如何堵住漏洞</h3>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-5 text-sm leading-relaxed">
          <li>goroutine A 调用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">atomic.AddInt64(&amp;counter, 1)</code> → CPU 生成<strong>带 LOCK 前缀的指令</strong>（x86 上是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">LOCK XADD</code>）</li>
          <li>CPU <strong>锁住内存总线</strong>——在这条指令结束前，其他核心无法读写这块内存（配合 MESI 缓存一致性协议同步）</li>
          <li>一条指令内完成<strong>读-改-写</strong>：读取 counter=5 → 加 1 → 写回 6，全程不可中断</li>
          <li>指令执行完毕，CPU <strong>释放总线锁</strong>，其他核心立刻能看到最新值</li>
          <li>goroutine B 再执行第二条 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">atomic.AddInt64</code>：读到最新值 6 → 写回 7 → <strong>counter == 7，一次都不丢</strong></li>
        </ol>
        <div class="mb-4"><Code language="go" :code="raceFlowCode" title="race_flow.go" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>JS 主线程是<strong>单线程 + Event Loop</strong>，同一时刻只有一段 JS 在跑，变量读写天然串行，所以不需要 atomic。<br/>Node 的 <code class="bg-purple-100 px-1 rounded text-xs font-mono">worker_threads</code> 才是真正的多线程 + 共享内存（SharedArrayBuffer），需要 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Atomics.add / Atomics.wait</code>——其中 <code class="bg-purple-100 px-1 rounded text-xs font-mono">Atomics.wait</code> 让线程阻塞等待某个值变化，对应 Go 里基于 atomic 的等待/信号量语义。</p></aside>
      </section>

      <!-- 2. 基本 API -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>atomic 基本 API — Add/Load/Store/Swap</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">atomic 包为 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">int32/int64/uint32/uint64/uintptr/unsafe.Pointer</code> 提供了原子操作。Go 1.19+ 增加了泛型 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">atomic.Pointer[T]</code> 和 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">atomic.Bool</code>。</p>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">操作</th><th class="px-4 py-2 border font-semibold">说明</th><th class="px-4 py-2 border font-semibold">等价于（非原子）</th></tr></thead><tbody class="text-slate-600">
          <tr><td class="px-4 py-2 border font-mono text-xs">AddInt64(&amp;v, n)</td><td class="px-4 py-2 border">原子加 n，返回新值</td><td class="px-4 py-2 border"><code class="text-xs">v += n</code></td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">LoadInt64(&amp;v)</td><td class="px-4 py-2 border"><strong>原子读</strong>——防止读到"写一半"的脏数据</td><td class="px-4 py-2 border"><code class="text-xs">v</code></td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">StoreInt64(&amp;v, n)</td><td class="px-4 py-2 border">原子写——保证整值写入</td><td class="px-4 py-2 border"><code class="text-xs">v = n</code></td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">SwapInt64(&amp;v, n)</td><td class="px-4 py-2 border">原子交换——设新值，返回旧值</td><td class="px-4 py-2 border"><code class="text-xs">old=v; v=n</code></td></tr>
          <tr><td class="px-4 py-2 border font-mono text-xs">CompareAndSwapInt64(&amp;v, old, new)</td><td class="px-4 py-2 border"><strong>CAS</strong>——v==old 才设为 new</td><td class="px-4 py-2 border">—</td></tr>
        </tbody></table></div>
        <div class="mb-4"><Code language="go" :code="atomicBasicCode" title="atomic_basic.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ atomic 和 Mutex 不能混用保护同一个变量！</strong>要么全用 atomic，要么全用 Mutex。混用时 atomic 操作不受锁保护——你以为安全了，其实有竞态。</p></aside>
      </section>

      <!-- 2.5. Go 1.19+ 新 API -->
      <section id="sec-2-typed" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">✨</span>Go 1.19+ 新 API：泛型类型化 atomic（Bool / Int64 / Pointer[T]）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">Go 1.19 起引入<strong>类型化原子类型</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">atomic.Bool</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">atomic.Int64</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">atomic.Pointer[T]</code> 等。<strong>零值即可用</strong>、<strong>不用再取地址 &amp;v</strong>，API 更清晰、类型更安全。</p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">新类型</th><th class="px-4 py-2 border font-semibold">典型用法</th><th class="px-4 py-2 border font-semibold">适合场景</th><th class="px-4 py-2 border font-semibold">与旧函数等价关系</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">atomic.Int64 / Uint64</td><td class="px-4 py-2 border font-mono text-xs">var n atomic.Int64; n.Add(1); n.Load()</td><td class="px-4 py-2 border">计数器、单调序列、水位</td><td class="px-4 py-2 border font-mono text-xs">atomic.AddInt64(&amp;n, ...) / LoadInt64(&amp;n)</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">atomic.Int32 / Uint32</td><td class="px-4 py-2 border font-mono text-xs">同上</td><td class="px-4 py-2 border">小计数器、状态位(0/1)</td><td class="px-4 py-2 border font-mono text-xs">atomic.AddInt32 / LoadInt32</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">atomic.Bool</td><td class="px-4 py-2 border font-mono text-xs">var b atomic.Bool; b.Store(true); b.Load()</td><td class="px-4 py-2 border">开关、健康标志、就绪信号</td><td class="px-4 py-2 border font-mono text-xs">atomic.StoreInt32/LoadInt32(0/1)——语义更清晰</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">atomic.Pointer[T]</td><td class="px-4 py-2 border font-mono text-xs">var p atomic.Pointer[Config]; p.Store(&amp;c); p.Load()</td><td class="px-4 py-2 border">类型安全的无锁读配置、单例替换</td><td class="px-4 py-2 border font-mono text-xs">atomic.Value + 类型断言——省去断言</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">atomic.Value</td><td class="px-4 py-2 border font-mono text-xs">var v atomic.Value; v.Store(x); v.Load()</td><td class="px-4 py-2 border">任意类型 RCU（存的类型必须一致、不能存 nil）</td><td class="px-4 py-2 border">旧函数无直接等价</td></tr>
            </tbody>
          </table>
        </div>
        <div class="mb-4"><Code language="go" :code="typedApiCode" title="typed_api.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4"><p class="text-sm text-amber-800"><strong>⚠️ 注意：</strong>新版类型化 API 与旧函数<strong>不要混着操作同一个变量</strong>——要么全部用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">atomic.Int64</code>，要么全部用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">atomic.AddInt64(&amp;v, ...)</code>，两者取地址方式不同，混用容易出错。</p></aside>
      </section>

      <!-- 3. CAS -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>CAS — 无锁编程的基石</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm"><strong>Compare-And-Swap（比较并交换）</strong>是 lock-free 编程的核心原语。它的逻辑很简单：<strong>"如果你还是我认识的那个值，我就换成新的；如果已经变了，我什么都不做"</strong>。这让你可以在无锁的情况下实现"先检查再修改"的模式——失败了就重试（自旋）。</p>
        <div class="mb-4"><Code language="go" :code="casCode" title="cas.go" /></div>
      </section>

      <!-- 4. atomic.Value / Pointer -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>实战：atomic.Value + RCU 模式（配置热更新）</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">很多服务需要在运行时<strong>热更新配置</strong>——多个 goroutine 读取配置，偶尔一个 goroutine 写新配置。用 Mutex 会导致"读配置"也要排队。用 atomic 可以让读操作<strong>完全无锁</strong>——这就是 <strong>RCU（Read-Copy-Update）模式</strong>。</p>
        <div class="mb-4"><Code language="go" :code="rcuCode" title="rcu_pattern.go" /></div>
      </section>

      <!-- 4.5. 生产实战 -->
      <section id="sec-4-prod" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🔧</span>生产实战：无锁计数器 / 引用计数 / 无锁状态机</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">atomic 最常见的三个生产场景：<strong>高并发计数器</strong>（埋点、QPS 统计）、<strong>引用计数</strong>（资源何时真正销毁）、<strong>无锁状态机</strong>（连接池可用标志、健康检查开关）。它们都只需一个原子变量 + CAS，无需任何锁。</p>
        <div class="mb-4"><Code language="go" :code="prodCode" title="prod_atomic.go" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>无锁状态机的"0→1 只允许成功一次"很像 React 里用 <code class="bg-purple-100 px-1 rounded text-xs font-mono">useRef</code> 做"只初始化一次"的 guard；引用计数则像浏览器里 <code class="bg-purple-100 px-1 rounded text-xs font-mono">URL.createObjectURL</code> 配合 <code class="bg-purple-100 px-1 rounded text-xs font-mono">revokeObjectURL</code>——引用归零才释放资源。</p></aside>
      </section>

      <!-- 5. 选型 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>atomic vs Mutex 选型指南</h2>
        <div class="overflow-x-auto mb-4"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">场景</th><th class="px-4 py-2 border font-semibold">用 atomic</th><th class="px-4 py-2 border font-semibold">用 Mutex</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border">单个 int64/bool/pointer</td><td class="px-4 py-2 border text-emerald-600">✅ 首选</td><td class="px-4 py-2 border">⚠️ 杀鸡用牛刀</td></tr><tr><td class="px-4 py-2 border">多个变量需原子更新</td><td class="px-4 py-2 border">❌ 无法保证</td><td class="px-4 py-2 border text-emerald-600">✅</td></tr><tr><td class="px-4 py-2 border">复杂数据结构</td><td class="px-4 py-2 border">❌</td><td class="px-4 py-2 border text-emerald-600">✅</td></tr><tr><td class="px-4 py-2 border">计数器、标志位</td><td class="px-4 py-2 border text-emerald-600">✅ 首选</td><td class="px-4 py-2 border">⚠️ 计数器用 Mutex 太重</td></tr><tr><td class="px-4 py-2 border">配置热更新（读多写少）</td><td class="px-4 py-2 border text-emerald-600">✅ Value/Pointer</td><td class="px-4 py-2 border">⚠️ RWMutex 也可</td></tr></tbody></table></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4"><p class="text-sm text-blue-800"><strong>💡 性能对比数据（参考）：</strong>原子加 1 ≈ 5ns（CPU LOCK XADD 一条指令）。Mutex Lock+Unlock+加 1 ≈ 25-100ns（包含 CAS + 可能的 futex 休眠）。在高并发争用下差距可能更大——atomic 不会引发上下文切换。</p></aside>
      </section>

      <!-- 6. 常见错误与陷阱 -->
      <section id="sec-traps" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">⚠️</span>常见错误与陷阱——5 个最容易踩的坑</h2>
        <p class="text-slate-600 mb-5 leading-relaxed text-sm">atomic 看起来简单，但用错比不用更危险。以下 5 个坑覆盖了项目里 90% 的 atomic 误用。</p>
        <div class="mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 陷阱①：直接用 v++ 而不走 atomic.AddInt64</strong>——<code class="bg-amber-100 px-1 rounded text-xs font-mono">v++</code> 是「读 v → 加 1 → 写 v」三条指令，不是原子的。并发下会脏读 / 丢更新。凡是被并发读写的变量，<strong>读写都得走 atomic</strong>。</p></aside>
          <Code language="go" :code="trap1Code" title="trap1_vplusplus.go" />
        </div>
        <div class="mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 陷阱②：混用 atomic 和 Mutex 保护同一变量</strong>——atomic 操作<strong>不受锁保护</strong>。你在写路径上了 Mutex，读路径却走 atomic.Load，看起来安全，其实和持锁写入并发的 atomic 读仍是竞态。要么全锁，要么全 atomic。</p></aside>
          <Code language="go" :code="trap2Code" title="trap2_mixed.go" />
        </div>
        <div class="mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 陷阱③：atomic.Pointer / Value 存了"内部字段可变"的 struct</strong>——指针的替换是原子的，但指针<strong>指向的对象的字段仍可能被别处直接改</strong>，读者会读到改了一半的对象。必须存<strong>不可变快照</strong>（改就构造新对象整体替换）。</p></aside>
          <Code language="go" :code="trap3Code" title="trap3_mutable_struct.go" />
        </div>
        <div class="mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 陷阱④：32 位平台上 64 位字段未对齐</strong>——32 位平台（386 / ARM32）下 struct 里的 int64 字段可能只有 4 字节对齐，<code class="bg-amber-100 px-1 rounded text-xs font-mono">atomic.AddInt64</code> 会 panic。改用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">atomic.Int64</code> 类型（自动对齐）或 <code class="bg-amber-100 px-1 rounded text-xs font-mono">atomic.Align64</code> 占位。</p></aside>
          <Code language="go" :code="trap4Code" title="trap4_align.go" />
        </div>
        <div class="mb-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-3"><p class="text-sm text-amber-800"><strong>⚠️ 陷阱⑤：CAS 自旋在高争用下 CPU 空转、可能饿死</strong>——自旋锁适合"临界区只有几条指令 + 低争用"。临界区长或争用高时，无数 goroutine 空转烧 CPU，甚至饿死。这种情况该用 <code class="bg-amber-100 px-1 rounded text-xs font-mono">sync.Mutex</code>（抢不到会休眠）。</p></aside>
          <Code language="go" :code="trap5Code" title="trap5_spin.go" />
        </div>
      </section>

      <!-- 6.5. 反模式与经验法则 -->
      <section id="sec-rules" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">🧭</span>反模式 + 经验法则：什么时候用 atomic，什么时候必须上锁</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm"><strong>核心判断标准：</strong>atomic 只保证<strong>单个变量</strong>的一次操作是原子的；一旦需要让<strong>多个变量保持一致</strong>（组合不变量），atomic 就无能为力了。</p>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-emerald-800"><strong>✅ 用 atomic：</strong>单个 int64 / bool / pointer 变量——计数器、标志位、开关、配置指针。读写频率极高、临界区只有一条指令时，atomic 比 Mutex 快 10-100 倍，且不会引发上下文切换。</p></aside>
        <aside class="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-red-800"><strong>❌ 必须用 Mutex：</strong>多个变量要<strong>一致更新</strong>（如「余额 + 流水号」必须同时变）、复杂数据结构（map / 链表 / 结构体多字段）。atomic 无法保证组合不变量——两次独立的 atomic 操作之间，别的 goroutine 仍可能插进来。<br/>经验法则：<strong>当你需要"两个 atomic 一起变"时，就该换 Mutex 了。</strong></p></aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-emerald-800"><strong>✅ 读多写少的热配置：</strong>用 atomic.Pointer[T] / atomic.Value 的 RCU 模式（见第 4 节）——读完全无锁，写全量替换。这是配置热更新、单例替换的标准做法。</p></aside>
        <aside class="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4 mb-4"><p class="text-sm text-red-800"><strong>❌ 反模式清单：</strong>① 给计数器上 Mutex（太重，高并发下反而成为热点）；② 把 atomic 当万能锁——多字段结构、map、链表都要 Mutex；③ 写了 atomic 又在别处裸读写同一变量（混用）；④ 用 CAS 自旋保护长临界区。</p></aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4"><p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>JS 单线程为什么不需要 atomic？Event Loop 同一时刻只执行一段 JS，变量读写天然串行；Go 的 goroutine 是真的并行跑在多个 CPU 核心上，共享内存才需要原子指令。<br/>React 要"两个 state 一起更新"必须合并成一次 setState，也是同样的道理——分开的两次更新之间，中间状态会对用户可见。Go 里两个变量要一起变，就得靠 Mutex（或 struct + atomic.Pointer 整体替换）。</p></aside>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>atomic = CPU LOCK 指令</strong>——锁内存总线，一条指令完成读-改-写</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>CAS + 自旋</strong> = lock-free 编程——适用于锁持有时间极短的场景</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>atomic.Value / Pointer</strong> = RCU 读无锁模式（配置热更新、单例替换）</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>单个变量用 atomic，多个变量/复杂结构用 Mutex——别混用</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Go 1.19+ 优先用类型化 API：atomic.Int64 / atomic.Bool / atomic.Pointer[T]</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-6-sync-wg-once" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：WaitGroup/Once</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-8-context" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：Context →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-overview",name:"📐 结构总览"},{id:"sec-1",name:"为什么需要atomic"},{id:"sec-1-flow",name:"⚙️ 执行流程"},{id:"sec-2",name:"基本API"},{id:"sec-2-typed",name:"Go1.19+ 新API"},{id:"sec-3",name:"CAS"},{id:"sec-4",name:"RCU实战"},{id:"sec-4-prod",name:"生产实战"},{id:"sec-5",name:"选型指南"},{id:"sec-traps",name:"常见错误"},{id:"sec-rules",name:"经验法则"},{id:"sec-6",name:"小结"}]
const whyCode = `// ❌ 这有竞态条件——counter++ = LOAD+ADD+STORE 三条 CPU 指令
var counter int64
go func() { counter++ }() // goroutine A: LOAD=5
go func() { counter++ }() // goroutine B: LOAD=5 → 两个都读到了 5！
// 最终 counter 可能是 6——应该是 7 才对。少了一次 ++

// ✅ atomic: 一条 LOCK XADD 指令完成全部
var safe int64
go func() { atomic.AddInt64(&safe, 1) }() // LOCK XADD——内存总线锁住
go func() { atomic.AddInt64(&safe, 1) }() // B 等 A 的指令完成 → 读=6 → 写=7
// safe == 7 ✅`
const atomicBasicCode = `var counter int64
// Add — 原子加（x86: LOCK XADD 一条指令）
atomic.AddInt64(&counter, 1)     // counter += 1
atomic.AddInt64(&counter, 5)     // counter += 5
v := atomic.LoadInt64(&counter)  // 原子读（防止读到"写了一半"的值）
fmt.Println(v)                   // 输出: 6

// Store / Swap
atomic.StoreInt64(&counter, 100)       // 原子写
old := atomic.SwapInt64(&counter, 200) // 交换并返回旧值
fmt.Println(old)                        // 输出: 100

// 原子 Bool——Go 1.19+ 有 atomic.Bool
var ready atomic.Bool
ready.Store(true)
if ready.Load() { fmt.Println("ready!") }

// 原子 Pointer——Go 1.19+ 泛型版本
var cfg atomic.Pointer[Config]
cfg.Store(&Config{Timeout: 30})
current := cfg.Load()  // 原子读取最新配置——完全无锁！`
const casCode = `// CAS: "如果你还是旧值，就换新的；否则什么都不做"
var flag int64
swapped := atomic.CompareAndSwapInt64(&flag, 0, 1)
fmt.Println("swapped:", swapped, "flag:", flag)   // true  flag: 1
swapped = atomic.CompareAndSwapInt64(&flag, 0, 2)
fmt.Println("swapped:", swapped, "flag:", flag)   // false flag: 1（flag 不是 0 了）

// 实战①：CAS 自旋锁（比 Mutex 更轻量，适合临界区极短的场景）
type SpinLock struct{ state int32 }
func (s *SpinLock) Lock() {
    for !atomic.CompareAndSwapInt32(&s.state, 0, 1) {
        runtime.Gosched()  // 没抢到 → 让出 CPU（避免空转浪费）
    }
}
func (s *SpinLock) Unlock() { atomic.StoreInt32(&s.state, 0) }

// 实战②：CAS 实现"一次性初始化"（不用 sync.Once）
var initialized int32
if atomic.CompareAndSwapInt32(&initialized, 0, 1) {
    setup()  // 只有第一个执行到这里，其余看到 initialized=1 就跳过
}`
const rcuCode = `// RCU 模式（Read-Copy-Update）——读无锁，写全量替换
type Config struct{ Timeout time.Duration; Debug bool }

// 用 atomic.Value 存指针——读完全无锁！
var globalConfig atomic.Value  // 或者 atomic.Pointer[Config] (Go 1.19+)

func LoadConfig() *Config {
    return globalConfig.Load().(*Config)
}
func UpdateConfig(newCfg *Config) {
    globalConfig.Store(newCfg)  // 原子替换——所有读者立即看到新配置
}

func main() {
    globalConfig.Store(&Config{Timeout: 30, Debug: false})
    // 100 个 goroutine 同时读——完全无锁，无竞争！
    for i := 0; i < 100; i++ {
        go func() {
            cfg := LoadConfig()
            fmt.Println(cfg.Timeout)  // 30
        }()
    }
    // 热更新配置——即时生效
    UpdateConfig(&Config{Timeout: 60, Debug: true})
}
// 这就是 Etcd/ZooKeeper 客户端本地缓存的简化版——RCU 模式`
const raceFlowCode = `// 竞态现场还原：counter=5，两个 goroutine 同时 counter++ 会发生什么
var counter int64 = 5
// 核心 A: LOAD 读到 5
// 核心 B: LOAD 也读到 5（A 还没 STORE，B 看不到更新）
// 核心 A: ADD+STORE 写回 6
// 核心 B: ADD+STORE 写回 6 —— 覆盖 A 的 6，丢失一次 +1
// 最终 counter == 6，但两次 ++ 应该是 7（Lost Update）

// atomic 版本：把"读-改-写"锁进一条 LOCK XADD
var safe int64 = 5
atomic.AddInt64(&safe, 1)  // LOCK XADD: 读 5 → 写 6
atomic.AddInt64(&safe, 1)  // LOCK XADD: 读 6 → 写 7（能看到上一条的结果）
fmt.Println(atomic.LoadInt64(&safe))  // 输出: 7`
const typedApiCode = `type Config struct{ Timeout time.Duration }

// 旧式函数风格（Go 1.19 之前）：需要 &v 取地址
var n int64
atomic.AddInt64(&n, 1)
v := atomic.LoadInt64(&n)

// 新式类型化风格（Go 1.19+）：零值即可用，无需初始化，不用取地址
var c atomic.Int64
c.Add(1)              // Add 返回新值
fmt.Println(c.Load()) // 输出: 1

// atomic.Bool——标志位/开关
var healthy atomic.Bool
healthy.Store(true)
if healthy.Load() { fmt.Println("服务健康") }

// atomic.Pointer[T]——类型安全，不用手写类型断言
var cfg atomic.Pointer[Config]
cfg.Store(&Config{Timeout: 30})
cur := cfg.Load()         // 直接返回 *Config
fmt.Println(cur.Timeout)  // 输出: 30

// atomic.Value——存的值内部类型必须一致，且不能存 nil
var box atomic.Value
box.Store(1)              // int
// box.Store("x")         // ❌ 换类型会 panic：存过的类型必须一致`
const prodCode = `// ① 无锁请求计数器——HTTP 服务统计请求量，高并发无锁
var reqCount atomic.Int64
func recordRequest() {
    n := reqCount.Add(1)          // 原子自增，返回最新值
    if n%10000 == 0 {
        fmt.Println("已处理", n, "个请求")  // 每 1w 次打一条日志
    }
}

// ② 引用计数——最后一个引用释放时才真正关闭资源
type Worker struct{ refs atomic.Int64 }
func (w *Worker) Acquire() { w.refs.Add(1) }
func (w *Worker) Release() {
    if w.refs.Add(-1) == 0 {   // 减到 0 → 没人再使用
        w.shutdown()           // 只有最后一个释放者执行
    }
}
func (w *Worker) shutdown() { fmt.Println("资源已关闭") }

// ③ 无锁状态机——连接池可用标志 / 健康检查开关（0→1 只允许成功一次）
var poolReady atomic.Int32
func EnablePool() {
    if poolReady.CompareAndSwap(0, 1) {   // 多 goroutine 抢，只有 1 个成功
        fmt.Println("连接池已启用")
    } else {
        fmt.Println("已经启用过了")
    }
}
func PoolEnabled() bool { return poolReady.Load() == 1 }  // 读无锁`
const trap1Code = `var v int64
// ❌ 错误①：v++ = 读 v + 加 1 + 写 v，三条指令，并发下丢更新
func inc() { v++ }
// ❌ 错误②：写走了 atomic，读却直接 v —— 读到"写一半"的脏值
func get() int64 { return v }

// ✅ 正确：读写都走 atomic
func inc() { atomic.AddInt64(&v, 1) }
func get() int64 { return atomic.LoadInt64(&v) }`
const trap2Code = `var mu sync.Mutex
var count int64

func write() {
    mu.Lock()
    count++            // ✅ 持锁写入
    mu.Unlock()
}
func read() int64 {
    return atomic.LoadInt64(&count)  // ❌ 绕过锁去读——atomic 不受 mu 保护
}
// 后果：read() 与持锁的 write() 并发执行仍是竞态——你以为锁住了，其实没有
// ✅ 要么读也加锁（或 RWMutex），要么读写全部用 atomic，绝不混用`
const trap3Code = `type Cfg struct{ Timeout time.Duration }
var cfg atomic.Pointer[Cfg]

func init() { cfg.Store(&Cfg{Timeout: 30}) }

// ❌ 反模式：拿到指针后直接改字段——读者可能读到改了一半的对象
func SetTimeoutBad(t time.Duration) {
    c := cfg.Load()
    c.Timeout = t  // 直接改共享对象字段 → 与读者的 Load 并发 = 竞态
}

// ✅ 正确：构造一份"不可变快照"，整体替换指针（RCU 模式）
func SetTimeoutGood(t time.Duration) {
    cfg.Store(&Cfg{Timeout: t})  // 新对象 → 原子替换，读者要么看旧要么看新
}`
const trap4Code = `// 32 位平台（386 / ARM32）下，int64 只保证 4 字节对齐
// 若 int64 字段落在非 8 字节边界，atomic.AddInt64(&c.total, 1) 会 panic
type BadCounter struct {
    flag  bool   // 1 字节，把后面的 int64 挤到非对齐位置
    total int64  // ❌ 32 位平台上可能未 8 字节对齐
}

// ✅ 方案 A：字段直接用 atomic.Int64（运行时保证对齐，零值可用）
type GoodCounter struct {
    flag  bool
    total atomic.Int64  // ✅ 对齐由类型保证
}

// ✅ 方案 B（旧式 API）：结构体开头放 atomic.Align64 强制 8 字节对齐
type AlignCounter struct {
    _     atomic.Align64  // 占位，强制后续字段 8 字节对齐
    total int64
}`
const trap5Code = `// ❌ 反模式：高争用下 CAS 自旋——大量 goroutine 空转烧 CPU，可能饿死
var spin int32
func badLock() {
    for !atomic.CompareAndSwapInt32(&spin, 0, 1) {
        // 忙等：没抢到就一直转，CPU 空转 100%
    }
}
// 临界区稍长（>几条指令）或争用高（>4 核）时，空转浪费远超 Mutex 的休眠唤醒

// ✅ 正确用法：
//   临界区极短 + 低争用 → 自旋锁（轻量，见第 3 节 cas.go）
//   临界区长 / 高争用   → sync.Mutex（抢不到会休眠，唤醒再竞争）`
</script>
