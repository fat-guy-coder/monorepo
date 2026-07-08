<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🏗️ new 与 make</h1>
          <p class="text-sm text-slate-500 mt-1">Go 的两种分配原语 — 为什么需要区分，以及何时用哪个</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/basics/go-1-12-new-make.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 1-12</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 核心区别 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          new 与 make 的核心区别
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 有两个分配函数，它们的职责完全不同。记住一句话：<strong>new 分配内存填零值返回指针，make 只用于 slice/map/chan 并完成内部初始化。</strong>
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700"><code class="text-cyan-700">new(T)</code></th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700"><code class="text-cyan-700">make(T, ...)</code></th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">适用范围</td><td class="px-4 py-2 border border-slate-200"><strong>任意类型</strong></td><td class="px-4 py-2 border border-slate-200">仅 <strong>slice / map / chan</strong></td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">返回值</td><td class="px-4 py-2 border border-slate-200 font-mono">*T（指针）</td><td class="px-4 py-2 border border-slate-200 font-mono">T（非指针）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">初始化程度</td><td class="px-4 py-2 border border-slate-200">只填零值，不初始化内部结构</td><td class="px-4 py-2 border border-slate-200">初始化底层数据结构（数组/hash桶/环形队列）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">是否可直接用</td><td class="px-4 py-2 border border-slate-200">要看具体类型</td><td class="px-4 py-2 border border-slate-200">✅ 立即可用</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">接受参数</td><td class="px-4 py-2 border border-slate-200">仅类型</td><td class="px-4 py-2 border border-slate-200">类型 + len + 可选 cap（map 仅类型）</td></tr>
            </tbody>
          </table>
        </div>

        <div class="mb-4">
          <Code language="go" :code="codeOverview" title="一目了然：new vs make" />
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 JS/TS 类比：</strong><br/>
          <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">new(T)</code> ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">Object.create(T.prototype)</code> ——只分配内存、填零值。<br/>
          <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">make([]T, 3, 5)</code> ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">new Array(3)</code>（但 JS 的 new Array 行为很奇怪……）<br/>
          <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">make(map[K]V)</code> ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">new Map()</code> ——分配并初始化内部 hash 表。<br/>
          <strong>核心差异：</strong>JS 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">new</code> 会调构造函数做初始化；Go 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">new</code> 只填零值，不调任何函数。
          </p>
        </aside>
      </section>

      <!-- 2. 为什么 Go 有两种分配函数 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          为什么需要 make？——看底层结构
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          要理解为什么 Go 需要两个分配函数，需要看 <strong>slice / map / chan 的底层实现</strong>。
          它们不是简单的内存块，而是包含<strong>多个字段和内部指针的复杂结构体</strong>。<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">new</code> 只知道填零值，无法初始化这些内部结构。
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">🗂️ slice 底层</h4>
            <p class="text-xs text-slate-500 mb-2">slice 是一个 header 结构体，包含 <strong>ptr（底层数组指针）+ len + cap</strong>。make 会分配底层数组并设置这三个字段。</p>
            <code class="text-xs font-mono text-cyan-700 block">type slice struct {"{"}<br/>&nbsp;&nbsp;ptr unsafe.Pointer<br/>&nbsp;&nbsp;len int<br/>&nbsp;&nbsp;cap int<br/>{"}"}</code>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">🗺️ map 底层</h4>
            <p class="text-xs text-slate-500 mb-2">map 是一个指向 <strong>hmap 结构体</strong>的指针。make 初始化 hash 桶、溢出桶等字段。</p>
            <code class="text-xs font-mono text-cyan-700 block">type hmap struct {"{"}<br/>&nbsp;&nbsp;count int<br/>&nbsp;&nbsp;B uint8 // 桶数量对数<br/>&nbsp;&nbsp;buckets unsafe.Pointer<br/>&nbsp;&nbsp;// ... 更多字段<br/>{"}"}</code>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-2">📡 chan 底层</h4>
            <p class="text-xs text-slate-500 mb-2">chan 是一个指向 <strong>hchan 结构体</strong>的指针。make 分配环形队列缓冲区。</p>
            <code class="text-xs font-mono text-cyan-700 block">type hchan struct {"{"}<br/>&nbsp;&nbsp;buf unsafe.Pointer<br/>&nbsp;&nbsp;sendx, recvx uint<br/>&nbsp;&nbsp;// 锁、等待队列等<br/>{"}"}</code>
          </div>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 一句话理解：</strong><code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">new(T)</code> 做的事情是 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">var x T; return &amp;x</code>——仅分配内存+填零值。
          <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">make(T)</code> 除了分配内存，还要初始化那些<strong>对运行时正确性至关重要</strong>的内部字段。这就是为什么 slice/map/chan 必须用 make。</p>
        </aside>
      </section>

      <!-- 3. new 深入 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          new 深入：对每种类型做了什么
        </h2>

        <div class="mb-4">
          <Code language="go" :code="codeNewDeep" title="new_each_type.go" />
        </div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ new(map[T]U) 是个坑：</strong>
          它返回 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">*map[T]U</code>，指向一个 <strong>nil map</strong>。
          nil map 可以读（返回零值），但 <strong>写入会 panic</strong>。所以 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">new(map[T]U)</code> 基本没用——用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">make(map[T]U)</code>。</p>
        </aside>
      </section>

      <!-- 4. &T{} vs new -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          实战中 new 基本不用 — &amp;T{} 更好
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          实际 Go 代码中 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">new</code> 出现频率极低。原因是 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">&amp;T{"{}"}</code> 同样返回 <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">*T</code>，但<strong>可以顺便设初始值</strong>：
        </p>
        <div class="mb-4">
          <Code language="go" :code="ampersandCode" title="ampersand_vs_new.go" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>永远用 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">&amp;T{"{}"}</code> 代替 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">new(T)</code>。
          <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">new</code> 只有在你确实只需要零值指针且连空结构体字面量都不想写的<strong>极少数场景</strong>才会出现。</p>
        </aside>
      </section>

      <!-- 5. make 详解 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          make 详解 — 三种类型、三种参数模式
        </h2>

        <h3 class="text-md font-semibold text-slate-700 mb-3">5.1 make slice — len 和 cap 的区别</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">len</code> 是"当前有多少元素"，<code class="bg-slate-100 text-cyan-700 px-1.5 py-0.5 rounded text-xs font-mono">cap</code> 是"底层数组有多大"。
          理解这对组合是写出高性能 Go 代码的关键：
        </p>
        <div class="mb-4">
          <Code language="go" :code="codeMakeSlice" title="make_slice.go" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">5.2 make map — 可选的初始容量提示</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          map 的 make 不接受 len/cap，但可以给一个<strong>容量提示</strong>（hint）。指定 hint 可以<strong>避免多次 rehash</strong>，提升性能：
        </p>
        <div class="mb-4">
          <Code language="go" :code="codeMakeMap" title="make_map.go" />
        </div>

        <h3 class="text-md font-semibold text-slate-700 mb-3 mt-6">5.3 make chan — 缓冲 vs 无缓冲</h3>
        <p class="text-slate-600 mb-2 leading-relaxed">
          第二个参数是<strong>缓冲区大小</strong>。省略或为 0 = 无缓冲（同步）；&gt; 0 = 有缓冲（异步，填满前不阻塞发送）：
        </p>
        <div class="mb-4">
          <Code language="go" :code="codeMakeChan" title="make_chan.go" />
        </div>
      </section>

      <!-- 6. nil vs empty -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          nil vs 空 — 面试高频考点
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          没有 make 的 slice/map/chan 是 <strong>nil</strong>，用 make 创建的是<strong>空但已初始化</strong>。
          它们<strong>不是同一个东西</strong>，在 JSON 序列化和 append 等场景行为完全不同。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead>
              <tr class="bg-slate-100 text-left">
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">特性</th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">nil slice<br/><code class="text-xs">var s []int</code></th>
                <th class="px-4 py-2 border border-slate-200 font-semibold text-slate-700">空 slice<br/><code class="text-xs">make([]int,0)</code></th>
              </tr>
            </thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">== nil</td><td class="px-4 py-2 border border-slate-200">true</td><td class="px-4 py-2 border border-slate-200">false</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">len / cap</td><td class="px-4 py-2 border border-slate-200">0 / 0</td><td class="px-4 py-2 border border-slate-200">0 / 0（或 0 / &gt;0）</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">append 能用吗</td><td class="px-4 py-2 border border-slate-200">✅ 可以（nil slice 也能 append）</td><td class="px-4 py-2 border border-slate-200">✅ 可以</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">for range</td><td class="px-4 py-2 border border-slate-200">0 次迭代（没问题）</td><td class="px-4 py-2 border border-slate-200">0 次迭代</td></tr>
              <tr><td class="px-4 py-2 border border-slate-200 font-medium">JSON 序列化</td><td class="px-4 py-2 border border-slate-200"><code class="text-xs">null</code></td><td class="px-4 py-2 border border-slate-200"><code class="text-xs">[]</code></td></tr>
            </tbody>
          </table>
        </div>

        <div class="mb-4">
          <Code language="go" :code="codeNilVsEmpty" title="nil_vs_empty.go" />
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 API 设计提示：</strong>如果你的 API 返回一个可能为空的列表，用 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">make([]T, 0)</code> 而不是 nil slice。
          这样 JSON 序列化结果是 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">[]</code> 而非 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">null</code>，前端处理更友好。</p>
        </aside>
      </section>

      <!-- 7. make + append 性能 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          性能：预分配容量 vs 动态增长
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          append 在 cap 不够时会<strong>分配新数组 + 复制旧数据</strong>。如果能预估元素数量，用 make 预分配容量可以<strong>避免多次扩容和内存分配</strong>。
        </p>

        <div class="mb-4">
          <Code language="go" :code="codePerformance" title="preallocate.go" />
        </div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>如果你大致知道 slice 最终会有多少元素，<strong>给 make 传一个合理的 cap</strong>。
          这可能是你在 Go 中做的最简单也最有效的性能优化之一。slice 扩容时每次翻倍增长，对于大 slice 会浪费大量内存和 CPU。</p>
        </aside>
      </section>

      <!-- 8. 常见陷阱 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          常见陷阱
        </h2>

        <div class="space-y-4">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱一：nil map 写 panic</strong><br/>
            <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">var m map[string]int</code> → nil map，<strong>写入即 panic</strong>。
            最常发生在声明了 map 字段但没有在构造函数里 make 的结构体上。<br/>
            <strong>修复：</strong>始终用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">make(map[string]int)</code> 或在声明时用字面量 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">map[string]int{"{}"}</code>。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱二：对 nil slice 的 range 没问题，但对 nil map 的 range 也没问题</strong><br/>
            nil slice 和 nil map 都可以 range（0 次迭代，不 panic）。但 nil chan 的 range 会<strong>永久阻塞</strong>！<br/>
            只有 nil chan 的 select 是有用的（作为"永不就绪"的 case）。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱三：len 和 cap 搞混 —— 用 len 当 cap 导致初始化了元素</strong><br/>
            <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">make([]int, 10)</code> 创建的是<strong>已经包含 10 个零值元素</strong>的 slice（len=10, cap=10）。
            后续 append 会加在第 10 个元素之后！如果要用 append 填充，应该用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">make([]int, 0, 10)</code>。
            </p>
          </aside>

          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 陷阱四：make 和 new 不能混用</strong><br/>
            <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">new([]int)</code> 返回 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">*[]int</code>（指向 nil slice 的指针）— 基本没用。
            <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">make(*T)</code> 对非 slice/map/chan 类型<strong>编译错误</strong>。<br/>
            slice/map/chan → make；其他类型要指针 → &amp;T{"{}"}。
            </p>
          </aside>
        </div>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结与速查
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h4 class="font-semibold text-blue-800 mb-2">new(T)</h4>
            <ul class="space-y-1 text-sm text-blue-700">
              <li>· 适用<strong>所有类型</strong>，返回 <strong>*T</strong></li>
              <li>· 只填零值，不初始化内部结构</li>
              <li>· <strong>实战中极少使用</strong></li>
              <li>· 替代：<code class="bg-blue-100 px-1 rounded text-xs">&amp;T{}</code>（还能设初始值）</li>
              <li>· <code class="bg-blue-100 px-1 rounded text-xs">new(map[T]U)</code> → nil map（写会 panic）</li>
            </ul>
          </div>
          <div class="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
            <h4 class="font-semibold text-emerald-800 mb-2">make(T, ...)</h4>
            <ul class="space-y-1 text-sm text-emerald-700">
              <li>· 仅 <strong>slice / map / chan</strong>，返回 <strong>T</strong></li>
              <li>· 初始化内部数据结构，立即可用</li>
              <li>· <code class="bg-emerald-100 px-1 rounded text-xs">make([]T, len, cap)</code></li>
              <li>· <code class="bg-emerald-100 px-1 rounded text-xs">make(map[K]V, hint)</code></li>
              <li>· <code class="bg-emerald-100 px-1 rounded text-xs">make(chan T, buf)</code></li>
            </ul>
          </div>
        </div>

        <div class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 速记口诀：</strong>"<strong>new 填零返指针，make 只管三兄弟。</strong>切片要预分配容量，map 不初始化写就崩。new 基本不用，&amp;T{} 替代之。"</p>
        </div>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-11-structs" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：结构体</RouterLink>
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-1-basics/go-1-13-methods-interfaces" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1">下一节：方法与接口 →</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Nav } from 'components'
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userProfle'

const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "核心区别" },
  { id: "sec-2", name: "为什么需要 make" },
  { id: "sec-3", name: "new 深入" },
  { id: "sec-4", name: "&T{} 替代 new" },
  { id: "sec-5", name: "make 详解" },
  { id: "sec-6", name: "nil vs 空" },
  { id: "sec-7", name: "预分配性能" },
  { id: "sec-8", name: "常见陷阱" },
  { id: "sec-9", name: "小结" },
]

// ==================== 代码示例 ====================

const codeOverview = `// new — 任何类型，返回指针，填零值
p1 := new(int)            // *int, 指向 0
p2 := new(string)         // *string, 指向 ""
p3 := new([3]int)         // *[3]int, 指向 [0,0,0]
type Point struct{ X, Y int }
p4 := new(Point)          // *Point, 指向 {0,0}

// make — 仅 slice / map / chan，返回 T，完成初始化
s := make([]int, 3, 5)    // []int, len=3, cap=5
m := make(map[string]int) // map[string]int, 可读写
ch := make(chan int, 10)  // chan int, 缓冲区 10

// ⚠️ 用 new 创建 map 是陷阱！
mp := new(map[string]int) // *map[string]int → 指向 nil map
// (*mp)["key"] = 1       // panic! nil map 不能写`

const codeNewDeep = `// new 对不同类型的行为
type User struct {
    Name   string
    Scores []int
    Cache  map[string]string
}

u := new(User)
// u 是一个 *User，指向 {Name:"", Scores:nil, Cache:nil}
// u.Scores 是 nil slice，但可以 append
u.Scores = append(u.Scores, 100) // ✅ 可以！nil slice append 没问题

// u.Cache 是 nil map ← 潜伏的 bug！
// u.Cache["k"] = "v"              // ❌ panic！nil map 不能写
u.Cache = make(map[string]string) // ✅ 必须先 make
u.Cache["k"] = "v"                // ✅ 现在可以了`

const ampersandCode = `type Config struct {
    Host    string
    Port    int
    Timeout time.Duration
}

// ❌ new — 只能零值
c1 := new(Config)
// c1.Host = ""  c1.Port = 0  c1.Timeout = 0
// 需要逐一赋值：
c1.Host = "localhost"
c1.Port = 8080
c1.Timeout = 30 * time.Second

// ✅ &T{} — 声明即初始化（推荐）
c2 := &Config{
    Host:    "localhost",
    Port:    8080,
    Timeout: 30 * time.Second,
}

// ✅ 也可以只初始化部分字段
c3 := &Config{Port: 3000}  // Host="" Timeout=0——其余零值

// 结论：new 在 Go 标准库中出现频率不到 &T{} 的 1%`

const codeMakeSlice = `// ① make([]T, len) — len=cap
s1 := make([]int, 5)
fmt.Printf("len=%d cap=%d %v\\n", len(s1), cap(s1), s1)
// 输出: len=5 cap=5 [0 0 0 0 0] ← 已有 5 个零值元素

// ② make([]T, len, cap) — 预分配容量
s2 := make([]int, 0, 5)    // len=0 cap=5 — 空但预留了 5 个位置
for i := 0; i < 5; i++ {
    s2 = append(s2, i)     // 不会扩容！
}
fmt.Println(s2)             // 输出: [0 1 2 3 4]

// ③ make([]T, 0) — 空的但已初始化
s3 := make([]int, 0)
fmt.Println(s3 == nil)      // 输出: false
fmt.Printf("len=%d\\n", len(s3)) // 输出: len=0`

const codeMakeMap = `// ① 不指定大小
m1 := make(map[string]int)

// ② 指定容量提示（知道大概要存多少数据时推荐）
m2 := make(map[string]int, 1000) // 预先分配 ~1000 个桶的空间

// 为什么有用：map 增长时需要 rehash（重新分配桶、迁移数据）
// 如果已知要存 100 万条数据，指定 hint 可以极大减少 rehash 开销
users := make(map[int]*User, 1_000_000)
for i := 0; i < 1_000_000; i++ {
    users[i] = &User{Name: fmt.Sprintf("user-%d", i)}
}

// ③ nil map — 能读不能写
var m3 map[string]int       // nil map
fmt.Println(m3["key"])      // 输出: 0（零值，不 panic）
fmt.Println(len(m3))        // 输出: 0
// m3["key"] = 1            // ❌ panic: assignment to entry in nil map`

const codeMakeChan = `// ① 无缓冲 channel（同步）
ch1 := make(chan int)       // 等价 make(chan int, 0)
// 发送方阻塞直到接收方就绪，反之亦然
go func() {
    ch1 <- 42               // 阻塞，直到...
}()
fmt.Println(<-ch1)          // ...这里接收。输出: 42

// ② 有缓冲 channel（异步，填满前不阻塞）
ch2 := make(chan int, 3)    // 缓冲区容量 3
ch2 <- 1                    // 不阻塞
ch2 <- 2                    // 不阻塞
ch2 <- 3                    // 不阻塞
// ch2 <- 4                  // 阻塞！缓冲区满了
fmt.Println(<-ch2, <-ch2, <-ch2) // 输出: 1 2 3

// ③ nil channel（特殊用法）
var ch3 chan int            // nil channel
// <-ch3                     // 永久阻塞（永不就绪）
// ch3 <- 1                  // 永久阻塞
// 用途：在 select 中作为"禁用此 case"的技巧`

const codeNilVsEmpty = `// nil slice vs 空 slice
var nilSlice []int              // nil
emptySlice1 := make([]int, 0)   // 空，非 nil
emptySlice2 := []int{}          // 空，非 nil (字面量)

fmt.Println(nilSlice == nil)    // 输出: true
fmt.Println(emptySlice1 == nil) // 输出: false

// 都可以 append（nil slice append 自动分配底层数组）
nilSlice = append(nilSlice, 1)  // ✅
emptySlice1 = append(emptySlice1, 1) // ✅

// 都可以 range（0 次迭代）
for range nilSlice   { fmt.Println("不会执行") }

// ⚠️ 关键区别：JSON 序列化
json.NewEncoder(os.Stdout).Encode(nilSlice)
// 输出: null

json.NewEncoder(os.Stdout).Encode(emptySlice1)
// 输出: []

// 💡 API 最佳实践：返回空集合时用 make([]T,0) 而非 nil
// 这样前端收到的 json 是 [] 而不是 null，避免空指针检查`

const codePerformance = `// ❌ 不预分配 — 不断扩容
func buildSlow(n int) []int {
    var result []int          // nil slice
    for i := 0; i < n; i++ {
        result = append(result, i)
        // 每次 cap 不够时 → 分配新数组 → 复制 → 扩容
    }
    return result
}

// ✅ 预分配容量 — 一次分配
func buildFast(n int) []int {
    result := make([]int, 0, n) // 预分配 n 个位置
    for i := 0; i < n; i++ {
        result = append(result, i)
        // 不会扩容！cap 从一开始就够
    }
    return result
}

// 基准测试（100 万元素）:
// buildSlow: ~2ms, 约 28 次内存分配
// buildFast: ~0.8ms, 1 次内存分配

// ✅ 如果你知道确切长度，直接用 make([]T, n) + 索引赋值
func buildFastest(n int) []int {
    result := make([]int, n) // len=n, cap=n
    for i := 0; i < n; i++ {
        result[i] = i        // 索引赋值，比 append 更快
    }
    return result
}`
</script>
