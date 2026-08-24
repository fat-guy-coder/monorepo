<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200"><div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-800">🏗️ Go 并发模式</h1><p class="text-sm text-slate-500 mt-1">Pipeline · Fan-out/in · Worker Pool · Or-Done · Generator — 拿 channel 搭积木的五种范式</p></div><div class="flex items-center gap-3"><EditorLink file-path="apps/go/concurrency/go-2-9-concurrency-patterns.go" label="📝 查看源码" :is-admin="userStore.isAdmin" /><span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-9</span></div></div></header>
    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6"><Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 🧭 本章怎么学 -->
      <section id="sec-guide" class="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
        <h2 class="text-lg font-semibold text-indigo-900 mb-3 flex items-center gap-2"><span class="w-8 h-8 bg-indigo-200 text-indigo-800 rounded-lg flex items-center justify-center text-sm">🧭</span>本章怎么学（先看这里，避免被劝退）</h2>
        <p class="text-sm text-indigo-900 leading-relaxed mb-3">先打个预防针：<strong>这章是 Go 并发里最难的一章</strong>，看不懂非常正常——这些模式本来就是给"被阻塞和卡死坑过的老手"设计的，不是给新手的第一课。所以本页给每个模式标了<strong>难度 + 优先级</strong>，第一遍<strong>千万别从头啃到尾</strong>，按下面的表格挑着学。</p>
        <div class="overflow-x-auto">
          <table class="w-full text-sm border-collapse bg-white rounded-xl overflow-hidden">
            <thead><tr class="bg-indigo-100 text-left"><th class="px-3 py-2 border font-semibold">模式</th><th class="px-3 py-2 border font-semibold">难度</th><th class="px-3 py-2 border font-semibold">优先级</th><th class="px-3 py-2 border font-semibold">第一遍怎么处理</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-3 py-2 border">Generator</td><td class="px-3 py-2 border">⭐ 最简单</td><td class="px-3 py-2 border">必学</td><td class="px-3 py-2 border">先看，一分钟就懂（自动售货机）</td></tr>
              <tr><td class="px-3 py-2 border">Pipeline</td><td class="px-3 py-2 border">⭐⭐</td><td class="px-3 py-2 border">最核心</td><td class="px-3 py-2 border">反复看，它是后面所有模式的地基</td></tr>
              <tr><td class="px-3 py-2 border">Worker Pool</td><td class="px-3 py-2 border">⭐⭐</td><td class="px-3 py-2 border">必学</td><td class="px-3 py-2 border">最实用，工作中经常要写（银行柜台）</td></tr>
              <tr><td class="px-3 py-2 border">Fan-out/in</td><td class="px-3 py-2 border">⭐⭐⭐</td><td class="px-3 py-2 border">进阶</td><td class="px-3 py-2 border">第二遍再啃，第一遍看懂外卖类比就行</td></tr>
              <tr><td class="px-3 py-2 border">Or-Done</td><td class="px-3 py-2 border">⭐⭐⭐⭐</td><td class="px-3 py-2 border">选学</td><td class="px-3 py-2 border">只记结论：要停，得让生产者自己也监听 done</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-sm text-indigo-900 leading-relaxed mt-3"><strong>✅ 达标线：</strong>能用自己的话讲清楚 Pipeline 和 Worker Pool，就算这章合格。Or-Done 是防"高级陷阱"的进阶知识，现阶段<strong>记住结论就行，不用会写</strong>。</p>
      </section>

      <section id="sec-0" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📌</span>五种模式速览——先认个脸熟：它们对应啥生活场景？</h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">先别管 goroutine、channel 这些术语——<strong>这五种模式全是你每天都在经历的事</strong>。先看右边的生活类比，把"它是干嘛的"记住，后面再对代码就轻松了。</p>
        <div class="overflow-x-auto mb-3"><table class="w-full text-sm border-collapse"><thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border font-semibold">模式</th><th class="px-4 py-2 border font-semibold">解决什么问题</th><th class="px-4 py-2 border font-semibold">一句话</th></tr></thead><tbody class="text-slate-600"><tr><td class="px-4 py-2 border font-mono text-xs">Pipeline</td><td class="px-4 py-2 border">一个任务要<strong>分几步做</strong>，每步都挺慢</td><td class="px-4 py-2 border">"像餐厅出餐：洗→切→炒，各有人负责"</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">Fan-out/in</td><td class="px-4 py-2 border">同一个活想<strong>多个人一起干</strong></td><td class="px-4 py-2 border">"像外卖高峰期：一单拆给多个骑手送"</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">Worker Pool</td><td class="px-4 py-2 border"><strong>控制同时干活的人数</strong>，别把下游压垮</td><td class="px-4 py-2 border">"像银行柜台：只有 3 个窗口，人再多也排队"</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">Or-Done</td><td class="px-4 py-2 border">消费者<strong>中途不想要了</strong>，要能安全撤</td><td class="px-4 py-2 border">"像吃到一半想走，得喊后厨'别做了'"</td></tr><tr><td class="px-4 py-2 border font-mono text-xs">Generator</td><td class="px-4 py-2 border">数据量大/无限，<strong>按需生成</strong>不占内存</td><td class="px-4 py-2 border">"像自动售货机：投币才出货，不囤货"</td></tr></tbody></table></div>
      </section>

      <!-- 📐 结构总览：Pipeline 数据流 -->
      <section id="sec-overview" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📐</span>
          结构总览：Pipeline 流水线数据流
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          先看 Pipeline——它是最核心的模式，后面的 Fan-out、Worker Pool 都是它的变体。<strong>打个比方：餐厅出餐流水线。</strong>
          洗菜、切菜、炒菜、装盘各是一个工位（goroutine），洗好的菜从上一个工位递到下一个（channel 传递数据）。
          各工位<strong>同时开工、互不等待</strong>：洗菜工洗第 3 颗菜时，切菜工可能正在切第 2 颗——没人干瞪眼。
        </p>
        <figure class="mb-4">
          <svg viewBox="0 0 720 180" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="pl-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>

            <!-- gen 阶段 -->
            <rect x="30" y="50" width="150" height="70" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2" />
            <text x="105" y="76" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0369a1">gen</text>
            <text x="105" y="98" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">生成 2,3,4</text>

            <!-- channel 1 -->
            <line x1="180" y1="85" x2="250" y2="85" stroke="#94a3b8" stroke-width="2" marker-end="url(#pl-arr)" />
            <text x="215" y="72" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">ch</text>

            <!-- sq 阶段 -->
            <rect x="255" y="50" width="150" height="70" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
            <text x="330" y="76" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#b45309">sq</text>
            <text x="330" y="98" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b45309">求平方 n²</text>

            <!-- channel 2 -->
            <line x1="405" y1="85" x2="475" y2="85" stroke="#94a3b8" stroke-width="2" marker-end="url(#pl-arr)" />
            <text x="440" y="72" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">ch</text>

            <!-- print 阶段 -->
            <rect x="480" y="50" width="150" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" />
            <text x="555" y="76" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#15803d">print</text>
            <text x="555" y="98" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#15803d">输出结果</text>

            <!-- 数据流动示例 -->
            <text x="30" y="150" font-size="12" font-family="monospace" fill="#0891b2">数据流：2,3,4 → gen → ch → sq → ch → 4,9,16 → print</text>
            <text x="30" y="168" font-size="11" font-family="monospace" fill="#64748b">各阶段并发：gen 生成 3 时，sq 可能正在算 2² —— 不是串行等待</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 1：Pipeline 三段流水线——gen（生成）→ sq（平方）→ print（输出），通过 channel 串联，各阶段并发执行</figcaption>
        </figure>
      </section>

      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>Pipeline — 流水线多步处理 <span class="ml-1 text-[10px] font-normal bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full">⭐⭐ 核心</span></h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>生活类比：餐厅出餐流水线。</strong>洗菜工只洗菜、切菜工只切菜、炒菜工只炒菜——每个人干完自己的活就把菜递给下一个人，<strong>各工位同时开工，谁也不用等别人</strong>。代码里每个阶段就是这样"一个工位"（一个 goroutine），"递菜"就是 channel。<strong>关键点：每步都是并发的</strong>——gen 在生成第 3 个数时，sq 可能正在处理第 2 个。（如果你见过 Unix 的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">|</code> 管道或 RxJS 的 pipe，概念一模一样。）</p>
        <div class="mb-4"><Code language="go" :code="pipelineCode" title="pipeline.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-900 mb-2"><strong>🤔 新手必看：这个 <code class="bg-amber-100 px-1 rounded text-xs font-mono">for v := range sq(...)</code> 是切片遍历吗？</strong></p>
          <p class="text-sm text-amber-800 leading-relaxed">不是！<code class="bg-amber-100 px-1 rounded text-xs font-mono">range</code> 是"重载"的——切片/数组给两个变量 <code class="bg-amber-100 px-1 rounded text-xs font-mono">(i, v)</code>，<strong>channel 只给一个变量 <code class="bg-amber-100 px-1 rounded text-xs font-mono">v</code></strong>，每轮循环做一次接收，读到 channel 关闭就自动结束。这里 <code class="bg-amber-100 px-1 rounded text-xs font-mono">sq(gen(2,3,4))</code> 返回的是一个 channel（不是切片），所以 range 逐条接收 sq 吐出来的平方数。内部等价于：<code class="bg-amber-100 px-1 rounded text-xs font-mono">for { v, ok := &lt;-ch; if !ok { break } }</code>。</p>
          <p class="text-sm text-amber-800 leading-relaxed mt-2"><strong>无缓冲 channel 也能 range 吗？</strong>能。无缓冲只表示"发送必须正好有人接收"，跟 range 没关系——range 对无缓冲/有缓冲一视同仁，区别只在发送时要不要等接收方碰头。</p>
        </aside>
      </section>

      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>Fan-out / Fan-in — 并行分发 + 合并结果 <span class="ml-1 text-[10px] font-normal bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">⭐⭐⭐ 进阶</span></h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>生活类比：外卖高峰期。</strong>外卖平台来了很多单（channel 里的任务），<strong>Fan-out 就是同时喊好几个骑手一起接单</strong>——谁抢到谁送，活儿自动分出去（无缓冲 channel 下，等着接单的骑手按先来后到排队）。<strong>Fan-in 就是大家送完都回站点，把结果汇总</strong>——用 merge 函数把多个 channel 合并成一个。<strong>⚠️ 注意：骑手回站点的先后是乱的</strong>，别指望汇总结果按送单顺序排列。</p>
        <figure class="mb-4">
          <svg viewBox="0 0 720 235" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="fo-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="20" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">Fan-out / Fan-in：一进、多处理、再合并</text>

            <!-- gen 阶段 -->
            <rect x="20" y="90" width="110" height="70" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2" />
            <text x="75" y="116" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0369a1">gen</text>
            <text x="75" y="138" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">生成 1..6</text>

            <!-- 单个输入 channel，Fan-out 分给 2 个 worker -->
            <line x1="130" y1="125" x2="212" y2="125" stroke="#94a3b8" stroke-width="2" marker-end="url(#fo-arr)" />
            <text x="170" y="112" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">ch</text>
            <polyline points="212,125 240,125 240,62 265,62" fill="none" stroke="#94a3b8" stroke-width="2" marker-end="url(#fo-arr)" />
            <polyline points="212,125 240,125 240,158 265,158" fill="none" stroke="#94a3b8" stroke-width="2" marker-end="url(#fo-arr)" />

            <!-- 2 个 sq worker 并行 -->
            <rect x="265" y="27" width="150" height="70" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
            <text x="340" y="53" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#b45309">sq worker 1</text>
            <text x="340" y="75" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b45309">求平方 n²</text>
            <rect x="265" y="123" width="150" height="70" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
            <text x="340" y="149" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#b45309">sq worker 2</text>
            <text x="340" y="171" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b45309">求平方 n²</text>

            <!-- 2 个结果 channel，Fan-in 汇入 merge -->
            <polyline points="415,62 455,62 455,95" fill="none" stroke="#94a3b8" stroke-width="2" marker-end="url(#fo-arr)" />
            <polyline points="415,158 455,158 455,95" fill="none" stroke="#94a3b8" stroke-width="2" marker-end="url(#fo-arr)" />
            <text x="440" y="112" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">ch</text>
            <line x1="455" y1="95" x2="485" y2="95" stroke="#94a3b8" stroke-width="2" />

            <!-- merge 阶段 -->
            <rect x="485" y="60" width="90" height="70" rx="8" fill="#ede9fe" stroke="#8b5cf6" stroke-width="2" />
            <text x="530" y="86" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#6d28d9">merge</text>
            <text x="530" y="108" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#6d28d9">汇总合并</text>

            <line x1="575" y1="95" x2="612" y2="95" stroke="#94a3b8" stroke-width="2" marker-end="url(#fo-arr)" />
            <text x="593" y="82" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">ch</text>

            <!-- print 阶段 -->
            <rect x="615" y="60" width="90" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" />
            <text x="660" y="86" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#15803d">print</text>
            <text x="660" y="108" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#15803d">输出结果</text>

            <text x="20" y="200" font-size="12" font-family="monospace" fill="#0891b2">Fan-out：1 个 channel 被 2 个 sq 同时读，任务自动瓜分（谁闲谁接）</text>
            <text x="20" y="218" font-size="11" font-family="monospace" fill="#64748b">Fan-in：merge 把 2 个结果 channel 合并成 1 个 —— 谁先算完谁先到，顺序不定</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 2：Fan-out/in 拓扑 —— gen 的数据分给 2 个并行 worker，merge 再汇总成单通道给 print</figcaption>
        </figure>
        <div class="mb-4"><Code language="go" :code="fanCode" title="fan_out_in.go" /></div>
      </section>

      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>Worker Pool — 控制并发数 <span class="ml-1 text-[10px] font-normal bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full">⭐⭐ 实用</span></h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>生活类比：银行柜台。</strong>来办业务的人再多，窗口就 3 个——后面的人只能排队。<strong>Worker Pool 就是这个"3 个窗口"</strong>：任务（job）从同一个 channel 排队进，3 个固定 goroutine（窗口/worker）一个个取来办，<strong>同时干活的最多 3 个</strong>。比如你有 1000 个 URL 要爬，又不想一次发太多请求把对方服务器搞挂——开 3 个 worker，同时就 3 个在爬，<strong>并发数 = worker 数</strong>。<strong>下班怎么关</strong>：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">close(jobs)</code> 后，窗口的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs">range</code> 循环发现没活了，自动关门。</p>
        <figure class="mb-4">
          <svg viewBox="0 0 720 235" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="wp-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="20" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">Worker Pool：1 个任务通道 + 固定 3 个 worker</text>

            <!-- jobs 通道 -->
            <rect x="20" y="75" width="140" height="70" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2" />
            <text x="90" y="101" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0369a1">jobs ch</text>
            <text x="90" y="123" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">缓冲 5 · 任务排队</text>

            <!-- Fan-out 到 3 个 worker -->
            <line x1="160" y1="110" x2="238" y2="110" stroke="#94a3b8" stroke-width="2" />
            <polyline points="238,110 238,55 265,55" fill="none" stroke="#94a3b8" stroke-width="2" marker-end="url(#wp-arr)" />
            <line x1="238" y1="110" x2="265" y2="110" stroke="#94a3b8" stroke-width="2" marker-end="url(#wp-arr)" />
            <polyline points="238,110 238,165 265,165" fill="none" stroke="#94a3b8" stroke-width="2" marker-end="url(#wp-arr)" />

            <!-- 3 个 worker -->
            <rect x="265" y="20" width="140" height="70" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
            <text x="335" y="46" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#b45309">worker 1</text>
            <text x="335" y="66" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b45309">取一个 job 处理</text>
            <rect x="265" y="75" width="140" height="70" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
            <text x="335" y="101" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#b45309">worker 2</text>
            <text x="335" y="121" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b45309">取一个 job 处理</text>
            <rect x="265" y="130" width="140" height="70" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
            <text x="335" y="156" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#b45309">worker 3</text>
            <text x="335" y="176" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b45309">取一个 job 处理</text>

            <!-- 每个 worker 直接打印结果 -->
            <line x1="405" y1="55" x2="442" y2="55" stroke="#94a3b8" stroke-width="2" marker-end="url(#wp-arr)" />
            <text x="423" y="42" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">打印</text>
            <line x1="405" y1="110" x2="442" y2="110" stroke="#94a3b8" stroke-width="2" marker-end="url(#wp-arr)" />
            <text x="423" y="97" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">打印</text>
            <line x1="405" y1="165" x2="442" y2="165" stroke="#94a3b8" stroke-width="2" marker-end="url(#wp-arr)" />
            <text x="423" y="152" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">打印</text>

            <rect x="465" y="25" width="230" height="170" rx="10" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4" />
            <text x="580" y="103" text-anchor="middle" dominant-baseline="central" font-size="12" font-family="monospace" fill="#64748b">处理完直接 fmt.Printf</text>
            <text x="580" y="123" text-anchor="middle" dominant-baseline="central" font-size="11" font-family="monospace" fill="#94a3b8">（本例没有结果 channel）</text>

            <text x="20" y="205" font-size="12" font-family="monospace" fill="#0891b2">并发数 = worker 数：同时干活的 ≤ 3，再多 job 也排队</text>
            <text x="20" y="223" font-size="11" font-family="monospace" fill="#64748b">收工：close(jobs) → worker 的 range 读到关闭自动退出；wg.Wait() 等 3 个 worker 全撤</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 3：Worker Pool 拓扑 —— 所有 job 进同一个缓冲 channel，3 个固定 worker 竞争取任务，同时处理数 ≤ 3</figcaption>
        </figure>
        <div class="mb-4"><Code language="go" :code="workerPoolCode" title="worker_pool.go" /></div>
      </section>

      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>Or-Done — "我不想要了，大家都停" <span class="ml-1 text-[10px] font-normal bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">⭐⭐⭐⭐ 选学</span></h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>生活类比：自助餐吃到一半想走。</strong>后厨（生产者）一直在炒菜端出来，你（消费者）吃了几口不想吃了——但如果你只是自己离开座位，<strong>后厨根本不知道，还在一直炒，菜没人吃也停不下来</strong>。goroutine 泄漏就是这样：一个 goroutine 永远卡住不退出，白白占着资源。</p>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">
          <strong class="text-red-600">⚠️ 先纠错：orDone 包装并不能让「后厨」停下来。</strong>
          它只是帮你（消费者）"别傻坐着等菜"——保证<strong>消费者 + 转发 goroutine 不泄漏</strong>。要真正让后厨停火，必须让<strong>后厨自己也听得见"别做了"</strong>（方案 A），或让后厨炒完最后一道菜自己熄火（方案 B 的前提）。
        </p>

        <h3 class="text-sm font-semibold text-slate-700 mb-2">问题：消费者提前退出 → 生产者泄漏</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">消费者读完第 3 个数据就 break——但生产者还在往 channel 塞第 4 个。没人接收，它的 send 就永远卡在那一步，goroutine 一直挂着不退出（泄漏）。<strong>无缓冲 channel 上最严重</strong>：没有缓冲区帮忙"兜着"，一塞不出就死等。</p>
        <div class="mb-4"><Code language="go" :code="orDoneProblemCode" title="or_done_problem.go" /></div>

        <h3 class="text-sm font-semibold text-slate-700 mb-2 mt-6">方案 A（推荐）：done 贯穿管线，每阶段都 select done</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">Go 官方推荐的做法，一句话：<strong>给每个工位发一个"对讲机"</strong>。做法是把 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">done</code> channel 作为参数传给每个阶段，每个阶段传数据前都用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">select done</code> 问一句"还要继续吗？" 消费者 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">close(done)</code>（对讲机喊"收工！"）→ <strong>所有阶段同时听到，没人卡住、没人泄漏</strong>。</p>
        <figure class="mb-4">
          <svg viewBox="0 0 720 205" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="od-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
              <marker id="od-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
              </marker>
            </defs>
            <text x="20" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">方案 A：done 贯穿管线 —— 消费者喊一声，所有阶段同时收手</text>

            <!-- genDone 阶段 -->
            <rect x="20" y="45" width="150" height="70" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2" />
            <text x="95" y="71" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0369a1">genDone</text>
            <text x="95" y="93" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">生成 1..6</text>
            <line x1="170" y1="80" x2="235" y2="80" stroke="#94a3b8" stroke-width="2" marker-end="url(#od-arr)" />
            <text x="200" y="67" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">ch</text>

            <!-- sqDone 阶段 -->
            <rect x="240" y="45" width="150" height="70" rx="8" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
            <text x="315" y="71" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#b45309">sqDone</text>
            <text x="315" y="93" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#b45309">求平方</text>
            <line x1="390" y1="80" x2="445" y2="80" stroke="#94a3b8" stroke-width="2" marker-end="url(#od-arr)" />
            <text x="416" y="67" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">ch</text>

            <!-- 消费者 -->
            <rect x="450" y="45" width="150" height="70" rx="8" fill="#f0fdf4" stroke="#22c55e" stroke-width="2" />
            <text x="525" y="71" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#15803d">消费者</text>
            <text x="525" y="93" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#15803d">读到 4 就 break</text>

            <!-- done 通道（红虚线）从消费者广播到各阶段 -->
            <line x1="525" y1="115" x2="525" y2="148" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 4" />
            <text x="540" y="134" font-size="10" font-family="monospace" fill="#ef4444">close(done)</text>
            <line x1="525" y1="148" x2="95" y2="148" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 4" />
            <polyline points="315,148 315,115" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#od-red)" />
            <polyline points="95,148 95,115" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#od-red)" />
            <text x="180" y="166" font-size="11" font-family="monospace" fill="#ef4444">done（对讲机）：每个阶段都 select &lt;-done</text>

            <text x="20" y="186" font-size="11" font-family="monospace" fill="#ef4444">close(done) 广播：genDone / sqDone 的每个 send 都 select done，听到就退出 → 没人卡在 channel 上</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 4：方案 A —— done（红虚线）贯穿每个阶段，消费者 close(done) 后所有阶段同时收到"别做了"，安全退出不泄漏</figcaption>
        </figure>
        <div class="mb-4"><Code language="go" :code="orDoneDoneCode" title="or_done_pipeline.go" /></div>

        <h3 class="text-sm font-semibold text-slate-700 mb-2 mt-6">方案 B：orDone 包装——黑盒 channel 专用</h3>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm">生产者的代码是<strong>别人写好的库，你改不了它</strong>（黑盒），怎么办？套一个 orDone 包装，让这个"改不了的家伙"也能听见你的声音（消费者能 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">select done</code> 而不被它卡住）。但有个前提：<strong>这个库自己最后会 close 它的 channel</strong>（炒完最后一盘自己熄火）。否则它该阻塞还是阻塞——orDone 管不着它。</p>
        <div class="mb-4"><Code language="go" :code="orDoneCode" title="or_done_wrapper.go" /></div>
      </section>

      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>Generator — 惰性生成无限序列 <span class="ml-1 text-[10px] font-normal bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">⭐ 最简单</span></h2>
        <p class="text-slate-600 mb-3 leading-relaxed text-sm"><strong>生活类比：自动售货机。</strong>你投币（读 channel）它才掉一瓶（算一个值）——绝不会提前囤一屋子货占地方。代码里：返回 channel 的函数就是 Generator，内部 goroutine 用<strong>无缓冲 channel 逐个交付</strong>，算一个 → 交付 → 再算下一个，<strong>消费到哪才算到哪</strong>（惰性求值）。所以哪怕是无限的斐波那契数列，你要几个它算几个，内存永远只占一份。</p>
        <figure class="mb-4">
          <svg viewBox="0 0 520 180" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="gn-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
            <text x="20" y="22" font-size="13" font-family="monospace" fill="#64748b" font-weight="bold">Generator：要一个才算一个（自动售货机）</text>

            <!-- 生产者：无限循环的 goroutine -->
            <rect x="30" y="45" width="210" height="80" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="2" />
            <text x="135" y="71" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#047857">fib() 内部 goroutine</text>
            <text x="135" y="95" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#047857">for { ch&lt;-a; a,b=b,a+b }</text>
            <!-- 循环示意：交付后立刻回去算下一个 -->
            <path d="M 55 112 Q 55 122 135 122 Q 215 122 215 112" fill="none" stroke="#10b981" stroke-width="1.5" marker-end="url(#gn-arr)" />

            <!-- channel -->
            <line x1="240" y1="85" x2="300" y2="85" stroke="#94a3b8" stroke-width="2" marker-end="url(#gn-arr)" />
            <text x="270" y="72" text-anchor="middle" font-size="10" font-family="monospace" fill="#64748b">ch 无缓冲</text>

            <!-- 消费者 -->
            <rect x="305" y="45" width="160" height="80" rx="8" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="2" />
            <text x="385" y="71" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="monospace" font-weight="bold" fill="#0369a1">消费者</text>
            <text x="385" y="95" text-anchor="middle" dominant-baseline="central" font-size="10" font-family="monospace" fill="#0369a1">读一个 → 推进一项</text>

            <text x="30" y="158" font-size="12" font-family="monospace" fill="#0891b2">惰性求值：你读几个它就算几个 —— 无限序列也不占内存（只存当前 a、b）</text>
          </svg>
          <figcaption class="text-xs text-slate-400 mt-1">图 5：Generator —— 函数返回 channel，内部 goroutine 无限循环"算一个、交付一个"；无缓冲保证算一个必须被接走</figcaption>
        </figure>
        <div class="mb-4"><Code language="go" :code="generatorCode" title="generator.go" /></div>
      </section>

      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100"><h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"><span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>小结</h2><ul class="space-y-2 text-slate-600"><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Pipeline</strong>=多步处理串联；<strong>Fan-out/in</strong>=并行+合并；<strong>Worker Pool</strong>=控并发数</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Or-Done</strong>=消费者取消时安全退出（生产者需配合 done 才不泄漏）；<strong>Generator</strong>=惰性求值按需生成</span></li><li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>这些模式组合使用——Pipeline 的某阶段可以 Fan-out，Worker Pool + Or-Done 更安全</span></li></ul></section>
    </main>
    <footer class="max-w-4xl mx-auto px-6 py-8"><nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm"><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-8-context" class="text-slate-500 hover:text-cyan-600 flex items-center gap-1">← 上一节：Context</RouterLink><RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-10-race-detection" class="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">下一节：竞态检测 →</RouterLink></nav></footer>
  </div></template>
<script setup lang="ts">import { Code, EditorLink, Nav } from 'components'; import { RouterLink } from 'vue-router'; import { useUserStore } from '@/stores/userProfle'; const userStore = useUserStore()
const navList = [{id:"sec-guide",name:"🧭 本章怎么学"},{id:"sec-0",name:"五种模式速览"},{id:"sec-overview",name:"📐 Pipeline 结构总览"},{id:"sec-1",name:"Pipeline"},{id:"sec-2",name:"Fan-out/in"},{id:"sec-3",name:"Worker Pool"},{id:"sec-4",name:"Or-Done"},{id:"sec-5",name:"Generator"},{id:"sec-6",name:"小结"}]
const pipelineCode = `// Pipeline: gen → sq → print，每个阶段并发执行
// 生活类比：餐厅出餐流水线——洗菜/切菜/炒菜各是一个工位，干完递给下一个
gen := func(nums ...int) <-chan int {
    out := make(chan int) // 无缓冲：发一个必须有人接，否则阻塞等待
    // 执行步骤：① 启动内部 goroutine ② 逐个发送 nums（发2→等sq接→发3→...）③ 发完 close(out)
    go func() {
        for _, n := range nums {
            out <- n // ← 无缓冲：必须 sq 正好在读，否则阻塞在这
        }
        close(out) // 通知下游"没了"
    }()
    return out
}
sq := func(in <-chan int) <-chan int {
    out := make(chan int)
    // 执行步骤：① 启动内部 goroutine ② 从上游逐个收(2,3,4) ③ 算平方发 out ④ 上游close→close(out)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}
// 串联：gen(2,3,4) → sq → 主 goroutine 逐条接收
for v := range sq(gen(2, 3, 4)) {
    fmt.Println(v)
}
// 输出:
//   4   ← gen发2 → sq算2² → 主goroutine收4
//   9   ← gen发3 → sq算3² → 主goroutine收9
//   16  ← gen发4 → sq算4² → 主goroutine收16（sq读到上游关闭→close输出→range结束）
// 关键：gen 发 3 时 sq 可能正在算 2² —— 三阶段并发，不是串行等待`
const fanCode = `// Fan-out / Fan-in：一进多出再合并
// 生活类比：外卖高峰期——多骑手接单(Fan-out)，送完回站汇总(Fan-in)
// merge：把多个 channel 合并成一个输出 channel
func merge(cs ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    out := make(chan int)
    // 每个输入 channel 启动一个"转发 goroutine"
    for _, c := range cs {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for n := range c {
                out <- n // 把数据转发到合并后的 channel
            }
        }(c)
    }
    // 所有转发 goroutine 干完 → 关闭合并输出
    go func() { wg.Wait(); close(out) }()
    return out
}
// 使用：1 个 gen 生成，2 个 sq 并行处理(Fan-out)，merge 合并(Fan-in)
in := gen(1,2,3,4,5,6)
c1, c2 := sq(in), sq(in)  // 两个 worker 读同一 channel → 任务自动瓜分
for n := range merge(c1, c2) { fmt.Printf(" %d", n) }
// 输出示例（顺序每次不同）: 1 4 9 16 25 36
// ⚠️ 谁先算完谁先到 → 合并顺序不确定，别依赖先后`
const workerPoolCode = `// Worker Pool：固定工人数，控制并发
// 生活类比：银行柜台——人再多，同时办业务的只有 3 个窗口
const numWorkers = 3
jobs := make(chan int, 5) // 缓冲 5：任务先进缓冲区排队，不被阻塞
var wg sync.WaitGroup
for w := 1; w <= numWorkers; w++ { // 固定 3 个 worker → 同时干活的 ≤ 3
    wg.Add(1)
    go func(id int) {
        defer wg.Done()
        for job := range jobs { // 有活就干；close(jobs) 后读到关闭 → 自动退出
            fmt.Printf("  worker %d: job %d\\n", id, job)
        }
    }(w)
}
for j := 1; j <= 5; j++ {
    jobs <- j // 主 goroutine 派发任务（放进缓冲，不用等 worker 接）
}
close(jobs) // 通知所有 worker：没有新任务了
wg.Wait()   // 等 3 个 worker 全部收工
// 输出示例（每次运行不一定一样）:
//   worker 1: job 1
//   worker 2: job 2
//   worker 3: job 3
//   worker 1: job 4   ← 谁先干完回来排队的，就接下一个活
//   worker 2: job 5
// 也有可能是这样——worker 列换个花样，job 列照样 1→5:
//   worker 3: job 1    ← job 还是 1 开头，但接手的是 3 号
//   worker 1: job 2
//   worker 2: job 3
//   worker 3: job 4
//   worker 1: job 5
// ⚠️ 两层别搞混：
//   ✅ 确定的：job 1~5 按 FIFO 顺序被取走（同一个 channel）；每个 job 恰好处理一次（range + close）
//   ❓ 不确定的：哪个 worker 拿到哪个 job —— 3 个 worker 竞争取任务，由 Go 调度器决定谁先跑到 <-jobs
//   （worker 抢任务的顺序每次运行都可能不同，示例只是"一种可能的输出"，不是固定结果）
// 执行步骤：① 开 3 worker 阻塞等任务 ② 主 goroutine 发 5 个任务 ③ close 让 worker 退出 ④ wg.Wait()`
const orDoneCode = `// 方案 B：orDone 包装——黑盒 channel 专用
// 问题背景：消费者中途不想要了，若直接 break，生产者会一直阻塞(泄漏)
func orDone(done <-chan struct{}, in <-chan int) <-chan int {
    out := make(chan int)
    // 执行步骤：① 启动转发 goroutine ② select 同时监听 done 和 in ③ 把数据转发给消费者
    go func() {
        defer close(out)
        for {
            select {
            case <-done: return                           // 收到「别做了」 → 退出
            case v, ok := <-in:
                if !ok { return }                         // 生产者自己 close → 退出
                select {
                case out <- v:                            // 转发给消费者
                case <-done: return                       // 转发中收到退出
                }
            }
        }
    }()
    return out
}
// 使用：消费者读到 stopValue 后主动关闭 done
done := make(chan struct{})
for v := range orDone(done, dataSource()) {
    if v == stopValue { close(done); break }
    fmt.Println(v)
}
// ⚠️ orDone 只保证「消费者 + 转发 goroutine」不泄漏。
// 若 dataSource 自身不会 close(ch)，它的 goroutine 仍会阻塞——
// 黑盒必须满足：生产者最终自己关闭 channel`
const orDoneProblemCode = `// 问题代码：消费者提前 break → 生产者泄漏
// 生活类比：自助餐吃到一半想走，但后厨不知道，还在一直炒菜
dataSource := func() <-chan int {
    out := make(chan int)
    go func() {
        for i := 1; ; i++ {   // 无限生产
            out <- i          // ← 没人接收时永远阻塞在这
        }
    }()
    return out
}
for i := range dataSource() {
    if i == 3 { break }       // 只想要前 3 个 → 直接 break
    fmt.Println(i)
}
// 第 4 个没人读 → 生产者的 goroutine 永久卡死（泄漏）
// 解法见下方案 A：把 done 传给每个阶段，让生产者自己监听 done`
const orDoneDoneCode = `// 方案 A：done 贯穿管线——每个阶段都监听 done
// 解法：把 done channel 传给每个阶段，每个 send 都 select 一下 done
gen := func(done <-chan struct{}, nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            select {
            case out <- n:          // 正常发送
            case <-done: return     // 收到「别做了」 → 立刻退出
            }
        }
    }()
    return out
}
sq := func(done <-chan struct{}, in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            select {
            case out <- n * n:
            case <-done: return
            }
        }
    }()
    return out
}
// 消费者 close(done) → 各阶段收到「别做了」信号
done := make(chan struct{})
for v := range sq(done, gen(done, 1, 2, 3, 4, 5, 6)) {
    fmt.Println(v)
    if v == 4 { close(done); break }  // 拿到想要的 → 喊「别做了」
}
// 输出:
//   1   ← gen发1 → sq算1² → 消费者收1（v≠4 继续）
//   4   ← gen发2 → sq算2² → 消费者收4 → v==4 → close(done) + break
// 执行步骤：
//   1. gen 发 1 → sq 算 1² → 消费者收 1（v≠4，继续）
//   2. gen 发 2 → sq 算 2²=4 → 消费者收 4 → v==4 → close(done) + break
//   3. gen 的 select 命中 <-done → 退出并 close(out)
//   4. sq 的 range in 读到关闭 → 退出并 close(out)
//   5. 关键：send 都包了 select done → 不再有"塞不出去就死等"的泄漏`
const generatorCode = `// Generator：惰性生成无限序列——"要一个才算一个"
// 生活类比：自动售货机——投币才出货，绝不提前囤货
fib := func() <-chan int {
    ch := make(chan int)
    // 执行步骤：算一个 → 发出 → 等消费者收 → 再算下一个
    go func() {
        a, b := 0, 1
        for {
            ch <- a // 发一个，等消费者读走才继续
            a, b = b, a+b
        }
    }()
    return ch
}
f := fib()
// 每执行一次 <-f，内部 goroutine 才推进一步斐波那契
fmt.Println(<-f) // 0  ← (a=0)
fmt.Println(<-f) // 1  ← (b=1)
fmt.Println(<-f) // 1  ← (0+1)
fmt.Println(<-f) // 2  ← (1+1)
fmt.Println(<-f) // 3  ← (1+2)
fmt.Println(<-f) // 5  ← (2+3)
// 只取需要的——无限序列也只算被消费的部分，不占内存`
</script>
