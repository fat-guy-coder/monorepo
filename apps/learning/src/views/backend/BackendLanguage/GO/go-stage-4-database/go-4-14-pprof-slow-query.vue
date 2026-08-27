<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🐢 慢查询与性能</h1>
          <p class="text-sm text-slate-500 mt-1">为什么查得慢 · EXPLAIN 执行计划 · 索引与 B+ 树 · 复合索引 · pprof 抓 CPU · 慢 SQL 日志</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 4-14</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 为什么查得慢 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么查得慢 —— 先定位问题在哪一层
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一条接口慢了，问题可能在<strong>很多层</strong>：客户端到服务器（网络）、Go 服务本身（CPU/锁/goroutine）、
          数据库查询（<strong>最常见</strong>）、以及拿到数据后的处理。慢查询排查的起点是<strong>先确定慢在数据库还是慢在 Go</strong>——
          本篇前几节讲数据库侧（EXPLAIN + 索引），后几节讲 Go 侧（pprof + 慢 SQL 日志）。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">慢在哪</th><th class="px-4 py-2 border border-slate-200 font-semibold">典型症状</th><th class="px-4 py-2 border border-slate-200 font-semibold">怎么查</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">数据库查询</td><td class="px-4 py-2 border">同样 SQL 有时快有时慢；数据多了明显变慢</td><td class="px-4 py-2 border">EXPLAIN + 慢查询日志</td></tr>
              <tr><td class="px-4 py-2 border">Go CPU 热点</td><td class="px-4 py-2 border">CPU 飙升、某接口整体卡</td><td class="px-4 py-2 border">pprof 抓 profile</td></tr>
              <tr><td class="px-4 py-2 border">连接池耗尽</td><td class="px-4 py-2 border">报 <code class="bg-slate-100 px-1 rounded font-mono text-xs">sql: database is closed</code> / 大量超时</td><td class="px-4 py-2 border">看连接池配置 + 并发量（见 go-4-2）</td></tr>
              <tr><td class="px-4 py-2 border">锁 / 慢事务</td><td class="px-4 py-2 border">写入卡死、行锁等待</td><td class="px-4 py-2 border">pg_stat_activity 看锁等待</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          大多数"数据越多越慢"的场景，根因只有一个：<strong>没有索引，数据库在逐行全表扫描（Seq Scan / SCAN）</strong>。
          数据量小的时候无所谓，100 万行以后差距是<strong>毫秒 vs 几十毫秒甚至几百毫秒</strong>。
        </p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <strong>全表扫描 ≈ 数组的 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">Array.find</code>（O(n)）</strong>——每次都要从头遍历；
          <strong>索引查找 ≈ <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">Map.get</code>（O(1) / O(log n)）</strong>——走一条"直达"的路。
          前端在 10 万条数组里 find 已经明显卡，数据库同理：不加索引就是拿 O(n) 硬扛。</p>
        </aside>
      </section>

      <!-- 2. EXPLAIN 看执行计划 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          EXPLAIN —— 让数据库告诉你它打算怎么查
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          在 SQL 前面加 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">EXPLAIN</code>，数据库不会真的执行，而是输出它<strong>计划采用的执行方案</strong>。
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">EXPLAIN ANALYZE</code> 会真的跑一遍并给出真实耗时（PostgreSQL 支持；SQLite 用 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">EXPLAIN QUERY PLAN</code>）。
          你只需盯住两个词：<strong>SCAN（全表扫，慢）vs SEARCH（走索引，快）</strong>。
        </p>
        <div class="mb-4"><Code language="text" :code="explainCode" title="EXPLAIN：同样一条查询，加索引前后" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">关键词</th><th class="px-4 py-2 border border-slate-200 font-semibold">含义</th><th class="px-4 py-2 border border-slate-200 font-semibold">快慢</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">Seq Scan / SCAN</td><td class="px-4 py-2 border">全表扫描，逐行过滤</td><td class="px-4 py-2 border"><span class="text-red-500 font-semibold">慢</span>（O(n)）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Index Scan / SEARCH</td><td class="px-4 py-2 border">用索引定位，只读匹配的行</td><td class="px-4 py-2 border"><span class="text-emerald-500 font-semibold">快</span>（O(log n)）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Index Cond</td><td class="px-4 py-2 border">用到了哪个条件匹配索引</td><td class="px-4 py-2 border">说明索引生效</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Filter</td><td class="px-4 py-2 border">取回行后再过滤（索引用不上）</td><td class="px-4 py-2 border">说明还有优化空间</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <strong>EXPLAIN ≈ 浏览器 DevTools 的 Network 面板 / Lighthouse 的性能报告</strong>——
          它不直接改代码，而是告诉你"这个请求为什么慢、慢在哪一步"。前端用 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">performance.now()</code> 定位 JS 耗时，数据库就用 EXPLAIN 定位慢在扫描还是索引。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 一条铁律：</strong>看到 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs font-mono">SCAN</code> 或 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs font-mono">Seq Scan</code> 在大表上，<strong>优先考虑加索引</strong>，而不是去优化 Go 代码——方向错了再优化都是白费。</p>
        </aside>
      </section>

      <!-- 3. 索引原理 B+ 树 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          索引原理：B+ 树 —— 加了索引为什么就快
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          索引背后是 <strong>B+ 树</strong>：一棵<strong>多路平衡查找树</strong>，叶子节点按顺序存着"键 → 行的位置"。
          查找时从根出发，<strong>每层根据键的大小砍掉一大片分支</strong>，定位到叶子后再拿行的物理位置去取数据。
          对有 n 行的表，全表扫描要翻 n 行，B+ 树查找只要 <strong>O(log n)</strong> 次节点访问——100 万行也只要十几步。
        </p>
        <div class="mb-4"><Code language="text" :code="indexPrincipleCode" title="B+ 树为什么快：一步砍掉一半分支" /></div>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>按序组织</strong>：叶子层按键值排好序，天然支持范围查询 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">BETWEEN</code> / <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">&gt;</code>。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>磁盘友好</strong>：每个节点存几百个键，一次磁盘 I/O 读一个节点，树高通常只有 2~4 层。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>代价</strong>：插入/更新/删除时树要维护平衡，所以<strong>索引不是越多越好</strong>——写多读少的表别乱加。</div>
          </li>
        </ol>

        <div class="mb-4"><Code language="text" :code="createIndexCode" title="CREATE INDEX —— 把 B+ 树建出来" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <strong>索引 ≈ 书的目录 / 字典的部首检字表</strong>——不用翻遍全书找"迁移"在哪儿，先查目录直接翻到那一页；
          <strong>全表扫描 ≈ 从头一页页翻</strong>。也 ≈ JS 里把无序数组先建成 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">Map</code>（预排序/预索引），后续查找从 O(n) 降到 O(1)。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>B+ 树 ≈ Go 里对 slice <strong>先 sort 再用 <code class="bg-teal-100 px-1 py-0.5 rounded text-xs font-mono">sort.Search</code> 二分查找</strong>（O(log n)），
          而不索引时就是线性 <code class="bg-teal-100 px-1 py-0.5 rounded text-xs font-mono">for</code> 遍历（O(n)）。区别：数据库索引由引擎维护、能覆盖范围查询和排序，比手写排序更通用。</p>
        </aside>
      </section>

      <!-- 4. 复合索引与最左前缀 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          复合索引与最左前缀 —— 最常被误解的规则
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          当查询经常用多个条件（如 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">WHERE user_id = ? AND created_at &gt; ?</code>），
          可以建<strong>复合索引</strong>（多列）。它的关键规则叫<strong>最左前缀原则</strong>：
          索引按定义的列顺序排列，<strong>查询必须命中从左往右的前缀列</strong>才能用上这个索引。
          跳过最左列直接用后面的列，索引就废了。
        </p>
        <div class="mb-4"><Code language="text" :code="compositeIndexCode" title="复合索引 (user_id, created_at) 的最左前缀" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 最左前缀是新手重灾区：</strong>建了 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs font-mono">idx(user_id, created_at)</code>，
          然后跑 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs font-mono">WHERE created_at &gt; ?</code>——<strong>索引完全用不上</strong>，又变回全表扫描。
          规则就一句：<strong>复合索引的列顺序，决定了它能被哪些 WHERE 命中；最左列必须出现</strong>。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 列顺序怎么排：</strong>高区分度的列放前面（如 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs font-mono">user_id</code>），
          或者"等值条件放前面、范围条件放后面"（<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs font-mono">user_id = ?</code> 是等值、<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs font-mono">created_at &gt; ?</code> 是范围）。
          想验证别猜，直接 EXPLAIN 看有没有变 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs font-mono">Index Scan</code>。</p>
        </aside>
      </section>

      <!-- 5. pprof 抓 CPU -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          数据库没问题？Go 侧用 pprof 抓 CPU
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">net/http/pprof</code> 是 Go 标准库自带的性能分析入口，
          只要<strong>空导入</strong>它，你的 HTTP 服务就会自动多出一组 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">/debug/pprof/</code> 路由。
          其中 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">/debug/pprof/profile</code> 会抓一段时间的 CPU profile，
          再用 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">go tool pprof</code> 分析——热点函数、每行耗时一目了然。
        </p>
        <div class="mb-4"><Code language="go" :code="pprofCode" title="main.go — 空导入挂载 pprof" /></div>
        <div class="mb-4"><Code language="bash" :code="pprofCLICode" title="📟 go tool pprof 分析" /></div>

        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>抓采样</strong>：访问 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">profile?seconds=30</code>，这 30 秒里被采样的栈就是真相。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>看 top</strong>：按 CPU 占比排序，先看最上面几个函数。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>list 下钻</strong>：对热点函数 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">list xx</code>，看哪一行最贵。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>web 可视化</strong>：浏览器打开调用图，直观看到调用链上的热路径。</div>
          </li>
        </ol>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <strong>pprof ≈ 浏览器 DevTools 的 Performance 面板</strong>——录制一段操作，看哪个函数（或哪个任务）吃掉大部分时间；
          <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">go tool pprof</code> 的火焰图/调用图 ≈ Chrome 的火焰图。前端说"先录 Performance 再优化"，后端就是"先抓 profile 再优化"。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ pprof 别裸挂到生产公网。</strong>
          <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs font-mono">/debug/pprof/</code> 会暴露 goroutine 栈、堆信息，<strong>是安全风险</strong>。
          生产要么用独立内网端口（本篇做法），要么加鉴权中间件，要么只在压测环境开启。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 常见的 CPU 热点</strong>：JSON 序列化大对象（<code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs font-mono">encoding/json</code> 占大头）、
          正则、字符串拼接、没用的深拷贝。看到哪个就是优化目标。</p>
        </aside>
      </section>

      <!-- 6. 打印慢 SQL -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          让服务自己报慢查询 —— GORM Logger 与手动计时
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          与其等用户抱怨再排查，不如<strong>让服务把慢 SQL 打出来</strong>。用 GORM 时配一个 Logger，超过阈值自动打 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">SLOW SQL</code> 告警；
          用标准库 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">database/sql</code> 时自己包一层计时函数即可。
        </p>
        <div class="mb-4"><Code language="go" :code="gormSlowCode" title="GORM：超过 200ms 自动打慢查询" /></div>
        <div class="mb-4"><Code language="go" :code="sqlSlowCode" title="database/sql：手动计时包装" /></div>

        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>这套"记日志 → 聚合 → 定阈值告警"的闭环，就是你在 <code class="bg-teal-100 px-1 py-0.5 rounded text-xs font-mono">apps/go/backend</code> 里
          给 repository 层加日志时的标准姿势——计时包一层、超过阈值打 <code class="bg-teal-100 px-1 py-0.5 rounded text-xs font-mono">log.Printf</code>，
          排查时直接 <code class="bg-teal-100 px-1 py-0.5 rounded text-xs font-mono">grep 慢查询</code> 看日志，比逐条猜快得多。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 别把慢查询日志打得太频繁。</strong>开发环境全量打 SQL 没问题，
          生产如果每条 SQL 都打，日志量和 IO 本身就成了新瓶颈。<strong>只打超过阈值的那部分</strong>（Warn 级），并配合采样。</p>
        </aside>
      </section>

      <!-- 7. 排查步骤 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          一次慢接口的完整排查流程
        </h2>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>看慢查询日志 / 业务日志</strong>：找到耗时最长的 SQL，确认是哪条。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>EXPLAIN 这条 SQL</strong>：看到 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">Seq Scan / SCAN</code> 就直接跳第 3 步；已经是 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">Index Scan</code> 还很慢，再看 Filter / 行数估算。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>建索引</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">CREATE INDEX</code>（复合条件想清楚最左前缀），再 EXPLAIN 确认变 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">Index Scan</code>。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
            <div class="text-slate-600"><strong>数据库没毛病还慢 → 上 pprof</strong>：抓 30s CPU profile，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">top</code> 找热点，是不是 JSON 序列化 / 正则 / 死循环。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
            <div class="text-slate-600"><strong>再不行看连接池 / 锁</strong>：并发压测、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">pg_stat_activity</code> 看锁等待（对应 go-4-2 连接池 和 go-4-8 事务）。</div>
          </li>
        </ol>
        <div class="mb-4"><Code language="text" :code="workflowCode" title="🧭 决策树一句话版" /></div>
      </section>

      <!-- 8. 常见错误 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          常见错误与反模式
        </h2>
        <div class="mb-4"><Code language="text" :code="errCode" title="❌ 慢查询优化高频翻车现场" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>索引建了但 EXPLAIN 还是 Seq Scan</strong>：最常见原因是 WHERE 里对索引列做了函数运算（<code class="bg-slate-100 px-1 rounded font-mono text-xs">WHERE lower(email) = ?</code>），索引失效。要么建表达式索引，要么改写法。</li>
          <li><strong>忽略最左前缀</strong>：复合索引只用非首列查询，白建。</li>
          <li><strong>无脑给所有列加索引</strong>：写放大严重、占磁盘、拖慢 INSERT/UPDATE。</li>
          <li><strong>只在代码层瞎优化</strong>：SQL 是全表扫描，在 Go 里怎么缓存都治标不治本——先 EXPLAIN 确认根因。</li>
        </ol>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ EXPLAIN 看到的"计划"和实际可能不一样：</strong>统计信息过期会让优化器选错执行计划。
          生产库定期 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs font-mono">ANALYZE</code>（PostgreSQL 自动做，但表数据剧变时手动跑一次更稳）。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>先 EXPLAIN 再动手；索引用最左前缀设计；慢 SQL 日志 + pprof 双保险；优化一处就要重测验证（<code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs font-mono">EXPLAIN ANALYZE</code> 看真实毫秒数）。</p>
        </aside>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>慢查询十有八九是<strong>全表扫描没索引</strong>——EXPLAIN 看到 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">SCAN</code> 就先加索引</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>索引 = B+ 树</strong>：O(log n) 查找、支持范围查询；有写放大，不是越多越好</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>复合索引看最左前缀</strong>：列顺序决定哪些 WHERE 能命中，最左列必须出现</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>Go 侧热点用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">net/http/pprof</code> 内嵌 + <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">go tool pprof</code> 分析 CPU</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>慢 SQL 日志：GORM 配 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">SlowThreshold</code>，database/sql 自己包一层计时</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>排查顺序：<strong>慢 SQL 日志 → EXPLAIN → 加索引 → pprof → 连接池/锁</strong>，别跳过前几步直接改代码</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <Link :route="'go-4-13-migration'" :text="'← 上一节：数据库迁移'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-cyan-600! hover:bg-transparent! bg-transparent! border-none! inline!" />
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Link, Nav } from 'components'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "为什么查得慢" },
  { id: "sec-2", name: "EXPLAIN 执行计划" },
  { id: "sec-3", name: "索引原理 B+ 树" },
  { id: "sec-4", name: "复合索引最左前缀" },
  { id: "sec-5", name: "pprof 抓 CPU" },
  { id: "sec-6", name: "打印慢 SQL" },
  { id: "sec-7", name: "排查流程" },
  { id: "sec-8", name: "常见错误" },
  { id: "sec-9", name: "小结" },
]

const explainCode = `-- 场景：users 表 100 万行，按 email 精确查
-- ⚠️ 前提：先看这个字段有没有索引

-- SQLite 看执行计划（不真执行）：
EXPLAIN QUERY PLAN
SELECT * FROM users WHERE email = 'alice@example.com';

-- 没有索引时 → 输出：
-- SCAN users     ← 全表扫，逐行比对 email，O(n)

-- 建索引之后再查：
CREATE INDEX idx_users_email ON users(email);
EXPLAIN QUERY PLAN
SELECT * FROM users WHERE email = 'alice@example.com';

-- 有索引时 → 输出：
-- SEARCH users USING INDEX idx_users_email (email=?)  ← 走索引，O(log n)

-- PostgreSQL 想看真实毫秒数用 EXPLAIN ANALYZE：
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'alice@example.com';

-- 没索引：
-- Seq Scan on users  (cost=0.00..5438.00 rows=1 width=96)
--   Filter: (email = 'alice@example.com'::text)
--   Execution Time: 85.3 ms          ← 慢

-- 有索引：
-- Index Scan using idx_users_email on users  (cost=0.29..8.30 rows=1 width=96)
--   Index Cond: (email = 'alice@example.com'::text)
--   Execution Time: 0.051 ms         ← 快了一千多倍`

const indexPrincipleCode = `# 有 100 万行的 users，按 id 精确查
# 全表扫描：从第 1 行翻到第 1,000,000 行 —— O(n)，一次最多读一行（磁盘 I/O 巨大）
# 索引查找：走 B+ 树 —— 每层按大小砍掉一半分支，百万数据树高约 3 层，O(log n)

# B+ 树长这样（示意）：
#                      [ 50 | 100 ]
#                    /      |      \
#              [10|20|30]  [60|70]  [110|120]
#              叶子 → 有序，且指向对应行在磁盘上的位置

# 找 id=70：
# 根节点一看 70 在 [50,100) 区间 → 直接进中间分支
# 中间节点一看 70 在 [60,70] → 命中叶子 → 拿行位置读数据
# 一共 3 次节点访问，而不是 70 次（从头数）或 100 万次（全扫）`

const createIndexCode = `-- 建单列索引：email 上建 B+ 树
CREATE INDEX idx_users_email ON users(email);

-- 复合索引：多列，按顺序排列
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at);

-- 唯一索引（顺带做唯一约束 + 查询加速）
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- 表达式索引：WHERE 里对列做了函数运算时的补救
CREATE INDEX idx_users_lower_email ON users(lower(email));

-- 删索引（不再需要时）
DROP INDEX idx_users_email;`

const compositeIndexCode = `-- 复合索引：idx_orders_user_created(user_id, created_at)
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at);

-- ✅ 能用这个索引（命中最左前缀 user_id）：
SELECT * FROM orders WHERE user_id = 42;
SELECT * FROM orders WHERE user_id = 42 AND created_at > '2026-01-01';
SELECT * FROM orders WHERE user_id = 42 ORDER BY created_at;

-- ❌ 用不上（跳过最左列 user_id，只剩 created_at）：
SELECT * FROM orders WHERE created_at > '2026-01-01';

-- ⚠️ 验证方式：EXPLAIN QUERY PLAN 看输出
-- 上面能用索引的查询 → SEARCH orders USING INDEX idx_orders_user_created
-- 用不上的查询 → SCAN orders（全表扫，慢）`

const pprofCode = `// main.go — 空导入 net/http/pprof，自动挂载 /debug/pprof 路由
package main

import (
    "log"
    "net/http"
    _ "net/http/pprof" // ← 只导入不直接调用：它的 init() 注册 pprof handler
)

func menuHandler(w http.ResponseWriter, r *http.Request) {
    // ...业务逻辑...
}

func main() {
    http.HandleFunc("/api/menus", menuHandler)

    // pprof 挂独立端口，和业务路由隔离（生产建议内网/鉴权）
    go func() {
        log.Println("pprof 已启动: http://localhost:6060/debug/pprof")
        log.Fatal(http.ListenAndServe(":6060", nil))
    }()

    log.Fatal(http.ListenAndServe(":8080", nil))
}

// 常用端点：
//   /debug/pprof/         总览（含 goroutine / heap / block 等）
//   /debug/pprof/profile  抓 CPU profile（默认 30s）
//   /debug/pprof/goroutine?debug=1   dump 所有 goroutine 栈`

const pprofCLICode = `# 服务在跑、正在被压测时，抓 30 秒 CPU profile
# （交互式，抓完自动进入 pprof 终端）
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30

# pprof 终端里：
(pprof) top 10        # 按 CPU 占比看前 10 个热点函数
(pprof) list menuHandler  # 看 menuHandler 每行耗时（哪一行最贵）
(pprof) web           # 浏览器打开调用图 / 火焰图
(pprof) quit          # 退出

# 一条命令直接出文本（适合 CI / 快速排查）
go tool pprof -top http://localhost:6060/debug/pprof/profile?seconds=30

# 输出示例：
# Showing nodes accounting for 1.52s, 92.12% of 1.65s total
#       flat  flat%   sum%      cum  cum%
#      1.02s 61.82% 61.82%   1.02s 61.82%  encoding/json.(*encodeState).marshal
#      0.31s 18.79% 80.61%   0.31s 18.79%  runtime.memmove
# ...
# → 热点是 JSON 序列化，先优化它`

const gormSlowCode = `// 用 GORM：配 Logger，超过阈值自动打 SLOW SQL
package main

import (
    "log"
    "os"
    "time"

    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "gorm.io/gorm/logger"
)

func openDB(dsn string) *gorm.DB {
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
        Logger: logger.New(
            log.New(os.Stdout, "\\r\\n", log.LstdFlags), // 输出到 stdout
            logger.Config{
                SlowThreshold:             200 * time.Millisecond, // 超过 200ms 记为慢查询
                LogLevel:                  logger.Warn,            // Warn 级：只有超阈值才打
                IgnoreRecordNotFoundError: true,                   // 忽略 RecordNotFound
                Colorful:                  false,
            },
        ),
    })
    if err != nil {
        log.Fatal(err)
    }
    return db
}

// 运行日志示例：
// [WARN] SLOW SQL >= 200ms
// [185.34ms] SELECT * FROM menus WHERE parent_id = $1
// [320.11ms] SELECT * FROM orders WHERE user_id = $2 ORDER BY created_at DESC`

const sqlSlowCode = `// 标准库 database/sql：手动包一层计时，超过阈值打日志
package main

import (
    "context"
    "database/sql"
    "log"
    "time"
)

// queryWithSlowLog 给查询统一计时，超过阈值打印慢查询日志
func queryWithSlowLog(ctx context.Context, db *sql.DB, query string, args ...any) (*sql.Rows, error) {
    start := time.Now()
    rows, err := db.QueryContext(ctx, query, args...)
    cost := time.Since(start)

    if cost > 200*time.Millisecond { // 阈值和 GORM 保持一致
        log.Printf("[慢查询] %s 耗时 %s", query, cost)
    }
    return rows, err
}

// 用法：把 db.QueryContext 换成 queryWithSlowLog 即可
// rows, err := queryWithSlowLog(ctx, db, "SELECT id, name FROM menus WHERE parent_id = $1", 0)`

const workflowCode = `慢接口排查一句话版：
日志里的 SQL
   └─ EXPLAIN
        ├─ SCAN / Seq Scan  ──► CREATE INDEX ──► 再 EXPLAIN 确认 Index Scan
        ├─ Index Scan 还很慢  ──► 看 Filter / 数据量 / 统计信息过不过期
        └─ 库没毛病 ──► pprof 抓 CPU ──► 热点在 Go 代码
                        └─ 还卡 ──► 连接池 / 锁 / 事务（go-4-2 / go-4-8）`

const errCode = `-- ❌ 错误 1：索引列上做函数运算，索引失效
-- SELECT * FROM users WHERE lower(email) = 'alice@x.com';
-- → EXPLAIN 变回 SCAN users（对 email 先算 lower 再比，索引没用了）
-- ✅ 改法：建表达式索引 CREATE INDEX idx_users_lower_email ON users(lower(email));

-- ❌ 错误 2：复合索引忽略最左前缀
-- 建了 (user_id, created_at) 却只查 created_at → 索引用不上，全表扫

-- ❌ 错误 3：无脑全列加索引
-- 每张表十几二十个索引 → 写放大、占磁盘、INSERT/UPDATE 变慢

-- ❌ 错误 4：不看根因就在 Go 里"优化"
-- SQL 是全表扫描，代码层加缓存 / 换并发也治标不治本 → 先 EXPLAIN`
</script>
