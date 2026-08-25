<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🗺️ sync.Map 并发安全 Map</h1>
          <p class="text-sm text-slate-500 mt-1">读多写少的无锁优化 —— LoadOrStore / Range / 读写分离设计</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/concurrency/go-2-14-sync-map.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 2-14</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 为什么需要 sync.Map -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要 sync.Map — 普通 map 会直接崩
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          普通 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">map</code> <strong>不是并发安全</strong>的：一旦有 goroutine 在「读的同时另一个在写」，运行时直接抛
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">fatal error: concurrent map read and map write</code>。
          <strong>注意它是 fatal error 而不是 panic</strong>——panic 可以用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">recover</code> 接住，而 fatal error 会打印堆栈后让整个进程崩溃，<strong>没有任何恢复机会</strong>。
        </p>
        <div class="mb-4"><Code language="go" :code="crashCode" title="map_crash.go — 并发读写普通 map" /></div>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          加 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Mutex</code> 能解决问题，但很痛：<strong>读也要抢锁</strong>。10 个 goroutine 高频读、偶尔写时，
          每次读都在为「其实根本没冲突的读操作」排队——锁成了<strong>热点锁</strong>，把并发直接拖成串行。
        </p>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 sync.Map 的目标：</strong><strong>读无锁</strong>（读走原子指针快照，一条原子指令拿到结果）+ <strong>写少锁</strong>（只对「新增 key」加锁，更新已有 key 也是原子替换）。专为「读多写少 + 热点 key」这类场景设计。</p>
        </aside>
      </section>

      <!-- 2. 读写分离设计（底层原理） -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          读写分离设计（底层原理）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          sync.Map 内部有两个 map 结构的「双缓冲」：<strong>read</strong> 是一个 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">atomic.Pointer[readOnly]</code>
          ——读取时整份快照原子取出来，<strong>完全无锁</strong>；<strong>dirty</strong> 是需要 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Mutex</code> 保护的写副本，
          新增的 key 先进 dirty。再加一个 <strong>misses 计数器</strong>记录「read 里没查到」的次数。
        </p>
        <div class="mb-4"><Code language="go" :code="internalsCode" title="sync_map_internals.go — 底层结构" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">设计</th><th class="px-4 py-2 border border-slate-200 font-semibold">解决什么问题</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">read 原子快照</td><td class="px-4 py-2 border">读操作一条 <code class="bg-slate-100 px-1 rounded font-mono text-xs">atomic.Load</code> 拿整份 readOnly——无锁读的核心</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">dirty 写副本</td><td class="px-4 py-2 border">新增 key 先写 dirty（加锁），不与 read 并发写冲突</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">misses 计数器</td><td class="px-4 py-2 border">连续 miss 累积到 ≥ dirty 长度时，把 dirty 整体提升为 read（dirty→read 整份替换）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">entry.p 原子指针</td><td class="px-4 py-2 border">entry 是地址稳定的指针，<strong>值变更用 atomic 替换指针</strong>——这就是「无锁读」为什么安全：读者要么读到旧值要么读到新值，绝不会读到一半</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-indigo-50 border-l-4 border-indigo-400 rounded-r-xl p-4">
          <p class="text-sm text-indigo-800"><strong>🧐 为什么「无锁读」是安全的？</strong>read 里存的是 <code class="bg-indigo-100 px-1 rounded text-xs font-mono">*entry</code> 指针，不是值本身。一个 key 的 entry 一旦创建就<strong>地址不变</strong>；改值时只 <code class="bg-indigo-100 px-1 rounded text-xs font-mono">entry.p.Store(newVal)</code> 原子替换指针。所以读者永远拿到一个「一致」的值——这条思路和上一节 atomic 的 RCU 模式一模一样（见 <RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-7-atomic" class="text-indigo-600 underline decoration-dotted underline-offset-2">go-2-7</RouterLink>）。</p>
        </aside>
      </section>

      <!-- 3. 核心 API 用法 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          核心 API 用法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sync.Map</code> 零值可用，无需初始化。
          最常用的四个方法：<strong>Load / Store / Delete / Range</strong>。其中 <strong>LoadOrStore</strong> 是「读-不存在则写」的原子操作——
          比「先 Load 后 Store」安全得多（详见陷阱 ④）。
        </p>
        <div class="mb-4"><Code language="go" :code="apiCode" title="sync_map_api.go — 基础四件套" /></div>
        <div class="mb-4"><Code language="go" :code="loadOrStoreCode" title="sync_map_config.go — LoadOrStore 并发读缓存配置表" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ Go 1.20+ 还加了：</strong><code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">CompareAndSwap(key, old, new)</code>（旧值等于才替换，原子）、<code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">Swap(key, val)</code>（直接替换并返回旧值）、<code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">CompareAndDelete</code> / <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">LoadAndDelete</code>。用法与 atomic 包的 CAS 一致——需要「条件更新」时用它们，别用「Load 后自己判断再 Store」。</p>
        </aside>
      </section>

      <!-- 4. Range 遍历 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          Range 遍历
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed text-sm">
          遍历只能通过回调：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">func(key, value any) bool</code>。
          返回 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">false</code> 提前终止（找到目标就停，别遍历完）。<strong>遍历顺序不保证</strong>——内部是无序 map；
          遍历中<strong>删除当前 key 是安全的</strong>。还有一个坑：sync.Map <strong>没有 Len() 方法</strong>，想统计数量只能用 Range 自增。
        </p>
        <div class="mb-4"><Code language="go" :code="rangeCode" title="sync_map_range.go — 统计在线连接数" /></div>
        <div class="mb-4"><Code language="go" :code="rangeSnapshotCode" title="sync_map_snapshot.go — Range 导出快照" /></div>
      </section>

      <!-- 5. 适用场景 + 选型对比表 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          适用场景 + 选型对比表
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-sm">
          <div class="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
            <h4 class="font-semibold text-emerald-700 mb-1">① 读多写少</h4>
            <p class="text-emerald-600">配置缓存、计数器缓存——读的次数远多于写，写少到可以接受加锁。</p>
          </div>
          <div class="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
            <h4 class="font-semibold text-emerald-700 mb-1">② 各写各的 key</h4>
            <p class="text-emerald-600">多个 goroutine 写不同的 key（如每个连接一个条目）——几乎不争锁。</p>
          </div>
          <div class="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
            <h4 class="font-semibold text-emerald-700 mb-1">③ 一次性写入、多次读取</h4>
            <p class="text-emerald-600">初始化时灌一批，之后只读——天然契合 read 快照。</p>
          </div>
        </div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">方案</th><th class="px-4 py-2 border border-slate-200 font-semibold">读性能</th><th class="px-4 py-2 border border-slate-200 font-semibold">写性能</th><th class="px-4 py-2 border border-slate-200 font-semibold">类型安全</th><th class="px-4 py-2 border border-slate-200 font-semibold">适用场景</th><th class="px-4 py-2 border border-slate-200 font-semibold">推荐度</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">map + Mutex</td><td class="px-4 py-2 border">串行（读也抢锁）</td><td class="px-4 py-2 border">串行</td><td class="px-4 py-2 border">✅ 编译期</td><td class="px-4 py-2 border">写多、量小、通用兜底</td><td class="px-4 py-2 border font-mono text-xs">⭐⭐⭐ 默认</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">map + RWMutex</td><td class="px-4 py-2 border">读并行（多读者）</td><td class="px-4 py-2 border">写独占</td><td class="px-4 py-2 border">✅ 编译期</td><td class="px-4 py-2 border">读多写少 + 要 Len/遍历/类型安全</td><td class="px-4 py-2 border font-mono text-xs">⭐⭐⭐⭐ 首选</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">sync.Map</td><td class="px-4 py-2 border">无锁读（原子快照）</td><td class="px-4 py-2 border">新 key 才加锁</td><td class="px-4 py-2 border">❌ 靠断言</td><td class="px-4 py-2 border">读远多于写 + 热点 key + 各写各的</td><td class="px-4 py-2 border font-mono text-xs">⭐⭐ 优化型</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 经验：95% 的场景用 map + 锁就够。</strong>sync.Map 是「优化型选手」——它内部用了 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">any</code> 接口，每次读写都要类型断言，<strong>单 goroutine 下反而比普通 map 慢 2-4 倍</strong>；只有并发读是瓶颈、且热 key 集中在 read 快照里时才划算。别把它当默认选择。</p>
        </aside>
      </section>

      <!-- 6. 执行流程拆解 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          执行流程拆解
        </h2>
        <div class="mb-4"><Code language="go" :code="flowCode" title="sync_map_flow.go — Load 命中 vs miss" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>Load 命中 read：</strong>原子取 read 快照 → 查 key 命中 entry → 原子读 entry 指针 → <strong>直接返回（全程无锁）</strong>。这是 99% 读操作的路径，也是最快的路径。</li>
          <li><strong>Load miss 且 !amended：</strong>read 没有、dirty 也没补充过 → 真没有，返回 <code class="bg-slate-100 px-1 rounded font-mono text-xs">nil, false</code>（连锁都不用加）。</li>
          <li><strong>Load miss 且 amended：</strong>加锁 → <strong>双检查</strong>（防止等待锁期间 dirty 刚被提升）→ 查 dirty → 命中则 <code class="bg-slate-100 px-1 rounded font-mono text-xs">misses++</code> → 返回；没命中也 <code class="bg-slate-100 px-1 rounded font-mono text-xs">misses++</code> → 返回 nil。</li>
          <li><strong>dirty→read 提升：</strong>当 <code class="bg-slate-100 px-1 rounded font-mono text-xs">misses &gt;= len(dirty)</code> 时，把 dirty 整份拷贝成新的 readOnly 原子替换掉旧 read，dirty 清空、amended 置 false、misses 归零——让「热起来的 key」重新无锁可读。</li>
          <li><strong>Store 更新已有 key：</strong>read 里 entry 已存在 → 直接 <code class="bg-slate-100 px-1 rounded font-mono text-xs">entry.p.Store</code> 原子换值，<strong>也不用加锁</strong>。</li>
          <li><strong>Store 新增 key：</strong>read 里没有 → 加锁，把当前 read 拷贝成 dirty（amend）→ 新 entry 写进 dirty → 等下一次提升才进 read。这就是「写少锁」——只有这种时候才碰锁。</li>
          <li><strong>LoadOrStore 的原子性：</strong>整条路径在锁内完成「查一遍 + 没有就写」，<strong>不会出现两个 goroutine 同时查出「都不存在」然后各自写入覆盖</strong>——要么拿到已有值，要么自己写入，结果确定。</li>
        </ol>
      </section>

      <!-- 7. 前端类比 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          🔗 前端类比
        </h2>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          sync.Map ≈ <strong>数据库的「读写分离 + 主从复制」</strong>——读走只读副本（read，无锁），写进主库（dirty，加锁），副本通过提升机制同步最新数据（dirty→read）。延迟同步 = 你能容忍读到的不是「绝对最新」。（注意：sync.Map 是强一致的，这里只是说结构神似。）<br/>
          或者 ≈ <strong>JS 的 <code class="bg-purple-100 px-1 rounded text-xs">Map</code> + 内存缓存双层</strong>：<code class="bg-purple-100 px-1 rounded text-xs">LoadOrStore</code> 就像「有缓存读缓存，没有才去请求并回填」——React 的 <code class="bg-purple-100 px-1 rounded text-xs">cache(fn)</code> 或数据请求库的去重，原理一致：<strong>不存在才执行昂贵操作，且只执行一次</strong>。</p>
        </aside>
      </section>

      <!-- 8. 常见错误与陷阱 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          常见错误与陷阱
        </h2>
        <ul class="space-y-2 text-sm text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-amber-500">⚠️</span><span><strong>① 普通场景滥用 sync.Map</strong>——读写的 key 只有一两个、或者并发度很低时，sync.Map 的类型断言开销 + 双缓冲反而比 map + RWMutex <strong>更慢</strong>，还失去编译期类型安全。先 profile 确认「读是瓶颈」再换。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500">⚠️</span><span><strong>② 没有 Len()，统计要用 Range</strong>——想拿数量只能遍历自增，<strong>O(n)</strong>。频繁统计时用普通 map + RWMutex 更合适，或自己维护一个 atomic 计数器。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500">⚠️</span><span><strong>③ Range 回调里做「删除以外」的修改</strong>——遍历中修改其他 key 的值虽不 panic，但结果依赖遍历顺序（不保证），行为不可预期。要改值就收集 key 出来再统一处理；删除当前 key 才是官方支持的安全操作。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500">⚠️</span><span><strong>④ 用「先 Load 再 Store」实现缓存去重</strong>——两个 goroutine 同时 Load 到都不存在，就会各 Store 一次，后者覆盖前者、重复执行昂贵初始化。<strong>必须用 LoadOrStore</strong>，它保证「不存在才写」只在锁内发生一次。</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500">⚠️</span><span><strong>⑤ 值存了指针且内部字段可变</strong>——<code class="bg-slate-100 px-1 rounded font-mono text-xs">Store("k", &conn)</code> 后再 <code class="bg-slate-100 px-1 rounded font-mono text-xs">conn.online = false</code>，读方拿到的 entry 指针没变但指向的对象被改了一半。<strong>这与 atomic 的陷阱 ③ 完全相同</strong>：要存不可变快照，改就构造新对象整体 Store（呼应 <RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-7-atomic" class="text-slate-700 underline decoration-dotted underline-offset-2">go-2-7</RouterLink>）。</span></li>
        </ul>
      </section>

      <!-- 9. 反模式 + 经验法则 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          反模式 + 经验法则
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
          <div class="bg-red-50 rounded-xl p-3 border border-red-200">
            <h4 class="font-semibold text-red-700 mb-1">❌ 别用 sync.Map</h4>
            <ul class="space-y-1 text-red-600">
              <li>· 单纯并发读写的小 map（key 少）→ map + Mutex</li>
              <li>· 需要 Len / 遍历 / 编译期类型安全 → map + RWMutex</li>
              <li>· 写操作频繁的 map（写多场景没有任何收益）</li>
              <li>· 单 goroutine 访问——纯属自找慢</li>
            </ul>
          </div>
          <div class="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
            <h4 class="font-semibold text-emerald-700 mb-1">✅ 才用 sync.Map</h4>
            <ul class="space-y-1 text-emerald-600">
              <li>· 读远多于写 + 热点 key 集中在 read 快照</li>
              <li>· 多个 goroutine 各写各的 key（互不争锁）</li>
              <li>· 一次性灌入、多次读取的只读缓存</li>
              <li>· 并发度很高、读路径 pprof 显示锁是瓶颈</li>
            </ul>
          </div>
        </div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 与 atomic 的呼应：</strong>sync.Map 的「无锁读」本质上就是 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">atomic.Pointer</code> 的应用——<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">read</code> 是 atomic.Pointer[readOnly]、<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">entry.p</code> 也是 atomic.Pointer。所以选型递进是：<strong>单值热更新用 atomic → 小 map 并发用 RWMutex → 读多写少的 map 才轮到 sync.Map</strong>（见 <RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-7-atomic" class="text-blue-700 underline decoration-dotted underline-offset-2">go-2-7</RouterLink>）。</p>
        </aside>
      </section>

      <!-- 10. 小结 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>普通 map 并发读写 = fatal error</strong>——不是 panic，无法 recover，进程直接崩</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>读写分离设计</strong>——read 原子快照无锁读 + dirty 加锁写 + misses 计数触发 dirty→read 提升</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>核心 API</strong>——Load/Store/Delete/Range；LoadOrStore 原子「不存在才写」；Go 1.20+ 有 CAS/Swap</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Range 遍历</strong>——回调返回 false 提前终止、顺序不保证、无 Len() 要自己计数</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>选型</strong>——95% 用 map + 锁；读远多于写 + 热点 key 才上 sync.Map；它底层就是 atomic.Pointer 无锁读</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <RouterLink to="/backend/BackendLanguage/GO/go-stage-2-concurrency/go-2-13-goroutine-leak" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1">← 上一节：goroutine 泄漏</RouterLink>
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
  { id: "sec-1", name: "为什么需要 sync.Map" },
  { id: "sec-2", name: "读写分离设计" },
  { id: "sec-3", name: "核心 API 用法" },
  { id: "sec-4", name: "Range 遍历" },
  { id: "sec-5", name: "适用场景 + 选型" },
  { id: "sec-6", name: "执行流程拆解" },
  { id: "sec-7", name: "🔗 前端类比" },
  { id: "sec-8", name: "常见错误与陷阱" },
  { id: "sec-9", name: "反模式 + 经验法则" },
  { id: "sec-10", name: "小结" },
]

const crashCode = `// ❌ 并发读写普通 map —— 进程直接崩
func main() {
    m := make(map[string]int)

    go func() {
        for i := 0; i < 100000; i++ {
            m["k"] = i        // 写
        }
    }()
    go func() {
        for i := 0; i < 100000; i++ {
            _ = m["k"]        // 读 —— 与上面同时发生！
        }
    }()

    time.Sleep(time.Second)
}
// ⚠️ 运行后打印：
//   fatal error: concurrent map read and map write
// 注意这是 fatal error 而非 panic：recover 接不住，
// 堆栈打印完整个进程直接崩溃退出，无法恢复。`

const internalsCode = `// 🔬 底层结构（Go 源码简化）—— 读无锁 / 写少锁的秘密
type Map struct {
    mu     Mutex                    // 保护 dirty，只对"写"生效
    read   atomic.Pointer[readOnly] // 只读快照：无锁读的关键
    dirty  map[any]*entry           // 需加锁的写副本
    misses int                      // read 未命中计数器
}
type readOnly struct {
    m       map[any]*entry
    amended bool // dirty 是否有 read 里没有的 key
}
type entry struct {
    p atomic.Pointer[any] // 指向值的指针，改值用原子替换
}`

const apiCode = `// 📦 核心 API：Load / Store / Delete / Range
var cache sync.Map   // 零值可用，无需初始化

// 写入（不存在则新增，存在则覆盖）
cache.Store("level", 88)
cache.Store("gold", 9999)

// 读取：命中返回 (value, true)，未命中返回 (nil, false)
lv, ok := cache.Load("level")
fmt.Println(lv, ok)        // 输出: 88 true

if v, ok := cache.Load("none"); ok {
    fmt.Println("命中:", v)
} else {
    fmt.Println("未命中")  // 输出: 未命中
}

// 删除（key 不存在也安全，不报错）
cache.Delete("gold")

// Range 遍历：回调返回 false 提前终止
cache.Range(func(key, value any) bool {
    fmt.Println(key, value)
    return true            // 继续遍历
})`

const loadOrStoreCode = `// 🚀 实战 1：并发读缓存「配置表」—— LoadOrStore 只初始化一次
var configs sync.Map   // 键: 配置名  值: *Config（存指针避免拷贝）

type Config struct {
    Name   string
    Value  string
}

func getConfig(name string) *Config {
    // 有缓存直接返回；没有才执行 loadConfig 并写入
    val, _ := configs.LoadOrStore(name, loadConfig(name))
    return val.(*Config)   // sync.Map 值类型是 any，取出要断言
}

func loadConfig(name string) *Config {
    time.Sleep(100 * time.Millisecond) // 模拟昂贵的 DB/文件读取
    return &Config{Name: name, Value: "v1"}
}

// 100 个 goroutine 同时首次访问 "server.port"：
// LoadOrStore 保证只有"第一个"真正执行 loadConfig，
// 其余 99 个拿到同一个实例 —— 原子去重，绝不重复初始化。`

const rangeCode = `// 🚀 实战 2：在线连接统计 —— sync.Map 没有 Len()，用 Range 计数
var online sync.Map   // 键: connID  值: *Conn

func main() {
    online.Store("c1", &Conn{id: 1, online: true})
    online.Store("c2", &Conn{id: 2, online: true})
    online.Delete("c1")   // c1 断开连接

    // ⚠️ 没有 Len() 方法！统计数量只能遍历自增（O(n)）
    count := 0
    online.Range(func(key, value any) bool {
        count++           // 遍历到几个加几个
        return true
    })
    fmt.Println("在线连接数:", count)   // 输出: 在线连接数: 1
}`

const rangeSnapshotCode = `// 🚀 实战 3：Range 导出快照 —— 把 sync.Map 倒进普通 map
func snapshot(m *sync.Map) map[string]int {
    out := make(map[string]int)
    m.Range(func(key, value any) bool {
        out[key.(string)] = value.(int)  // 类型断言，别忘 ok 检查
        return true                      // 全量导出
    })
    return out
}

// Range 语义要点：
//  ① 回调签名 func(key, value any) bool —— false 提前终止
//  ② 遍历顺序不保证（内部是无序 map）
//  ③ 遍历中删除"当前 key"是安全的；改其他 key 行为不保证（见陷阱 ③）`

const flowCode = `// 执行流程伪代码 —— Load 命中 vs miss（对应官方实现）
func (m *Map) Load(key any) (any, bool) {
    read := m.read.Load()           // ① 原子读 read 快照（无锁）
    e, ok := read.m[key]            // ② 查 read
    if ok {
        return e.load()             // ③ 命中：原子读 entry → 直接返回（无锁！）
    }
    if !read.amended {
        return nil, false           // ④ 没 key 且 dirty 没补充 → 真没有
    }
    m.mu.Lock()                     // ⑤ 加锁查 dirty
    read = m.read.Load()            // ⑥ 双检查（防止期间刚被提升）
    if e, ok := read.m[key]; ok {
        m.mu.Unlock()
        return e.load()
    }
    if e, ok := m.dirty[key]; ok {
        m.missLocked()              // ⑦ 命中 dirty：misses++
        m.mu.Unlock()
        return e.load()
    }
    m.missLocked()
    m.mu.Unlock()
    return nil, false               // ⑧ 都没有 → nil, false
}
// ⑨ misses 累积到 >= len(dirty) → 把 dirty 整体拷贝提升为 read
//    （dirty→read 整份替换，之后热 key 又能无锁读了）`
</script>
