<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🧰 原生 SQL 增强：sqlx</h1>
          <p class="text-sm text-slate-500 mt-1">sqlx 是什么 · Open · Get/Select 自动映射 · NamedQuery · StructScan · sqlx.In · rebind · 三选一怎么选</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 4-7</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. sqlx 是什么 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          sqlx 是什么：database/sql 的增强层，不是替代品
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">github.com/jmoiron/sqlx</code> 是
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">database/sql</code> 之上的一层<strong>增强库</strong>。
          它<strong>不替换标准库，也不生成 SQL</strong>——底层依然是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">*sql.DB</code>，
          连接池、预处理语句、事务引擎全走标准库那套，sqlx 只是帮你<strong>少写大量样板代码</strong>。
        </p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>自动映射</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Get</code> / <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Select</code> 把查询结果直接扫进 struct / struct 切片，靠 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">db</code> tag 认列名</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>命名参数</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">NamedQuery</code> / <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">NamedExec</code> 用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">:name</code> 代替位置占位符</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>IN 展开</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">sqlx.In</code> 把 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">IN (?)</code> 展开成 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">IN (?, ?, ?)</code>，并自动拼参数列表</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>跨库占位符</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Rebind</code> 把 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">?</code> 转成 Postgres 的 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">$1</code>、MySQL 的 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">?</code>，同一段 SQL 通吃多库</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>逐行扫描</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Queryx</code> / <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">QueryRowx</code> 返回带 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">StructScan</code> 的行集</span></li>
        </ul>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>sqlx 之于 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">database/sql</code>，就像 <strong>axios 之于 fetch</strong>——axios 没有替换 fetch，而是在它之上加了自动 JSON 解析、拦截器、统一错误处理；sqlx 也没有替换 database/sql，而是在它之上加了自动 struct 映射、命名参数、IN 展开。你依然手写 SQL（相当于手写请求 URL），但取数据这步不再需要手动一个个赋值。</p>
        </aside>

        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>这条「标准库 + 增强层」的路子在 Go 生态到处可见：<code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">net/http</code> 之上有 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">gin</code>，<code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">database/sql</code> 之上有 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">sqlx</code>。增强层从不关掉标准库的能力——你可以随时回到 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">db.Query</code> / <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">db.Begin</code> 干标准库的事（比如下节的事务）。这也是 Go 社区最爱的取舍：<strong>加糖，但不屏蔽底层</strong>。</p>
        </aside>

        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>database/sql 是<strong>手动挡</strong>，sqlx 是<strong>自动挡</strong>——发动机（连接池、事务引擎）完全一样，但 sqlx 帮你自动「换挡」：给一行 SQL + 一个 struct，结果自动跑进 struct，不用你一行行去踩离合（手动 Scan 到变量）。想秀操作时你仍然可以切回手动挡。</p>
        </aside>
      </section>

      <!-- 2. Open 与连接 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          sqlx.Open 与数据库连接
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          打开连接的姿势和标准库几乎一样，只是返回的是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">*sqlx.DB</code>。
          它内嵌了 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">*sql.DB</code>，所以<strong>标准库的所有方法它都有</strong>，还能直接传给任何要 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">*sql.DB</code> 的函数。
        </p>
        <div class="mb-4"><Code language="go" :code="openCode" title="connect.go" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">sqlx.Open</code> ≈ 标准库 <code class="bg-slate-100 px-1 rounded font-mono text-xs">sql.Open</code>——只建句柄，不真正连库（惰性连接）</li>
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">sqlx.Connect</code> = Open + Ping，连不上直接返回错误，<strong>开发期推荐</strong></li>
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">sqlx.MustConnect</code> = Connect 失败直接 panic，工具脚本里图省事可用</li>
          <li>驱动注册走标准库的 <code class="bg-slate-100 px-1 rounded font-mono text-xs">init()</code>，所以必须<strong>空白导入</strong>驱动包</li>
        </ol>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 最容易忘的一步：</strong>只 import 了 sqlx 没 import 驱动 → 运行时报 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">sql: unknown driver "pgx" (forgotten import?)</code>。记得 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">import _ "github.com/jackc/pgx/v5/stdlib"</code>（或用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">github.com/lib/pq</code>，注册名是 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">"postgres"</code>）。</p>
        </aside>
      </section>

      <!-- 3. Get / Select 自动映射 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          Get / Select：查询结果自动映射到 struct
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          这是 sqlx 用得最多的两个方法。<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">db.Get(&u, sql, args...)</code> 取<strong>单行</strong>，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">db.Select(&users, sql, args...)</code> 取<strong>多行</strong>。
          映射靠 struct 上的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">db:"列名"</code> tag——<strong>列的顺序无所谓，sqlx 按 tag 名认字段</strong>。
        </p>
        <div class="mb-4"><Code language="go" :code="getSelectCode" title="get_select.go" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>StructScan ≈ 前端拿到 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">fetch().json()</code> 之后，用一个反序列化库（<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">class-transformer</code> / <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">zod</code>）直接把对象变成类型化实例，而不是手写 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">user.name = data.name</code> 一行行赋值。Get 单行 ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">fetchOne</code>，Select 多行 ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">findAll</code>。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 两个高频坑：</strong>① struct 里字段忘了写 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">db</code> tag（或 tag 名拼错）→ 该字段永远是<strong>零值</strong>，不报错，最阴险；② <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Get</code> 查不到行返回 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">sql.ErrNoRows</code>——要用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">errors.Is(err, sql.ErrNoRows)</code> 判断，别拿 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">err != nil</code> 一把抓。</p>
        </aside>
      </section>

      <!-- 4. NamedQuery 命名参数 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          NamedQuery / NamedExec：命名参数告别数问号
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">:name</code> 命名占位符，参数用 map 或 struct 传。<strong>顺序无关、可复用、SQL 可读性强</strong>——SQL 里参数多了以后不用再一个个数 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">?</code> 的位置。
        </p>
        <div class="mb-4"><Code language="go" :code="namedCode" title="named.go" /></div>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">NamedExec</code>：执行写操作（INSERT/UPDATE/DELETE），返回 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">sql.Result</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">NamedQuery</code>：执行读操作，返回 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">*sqlx.Rows</code>（带 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">StructScan</code>）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>参数可以传 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">map[string]any</code>，也可以直接传一个 struct——字段名即参数名</span></li>
        </ul>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>命名参数在内部会被 rebind 成数据库自己的占位符——Postgres 变 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">$1</code>，MySQL 变 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">?</code>，所以<strong>同一段带命名参数的 SQL 可以跨库用</strong>，这也是后面 rebind 的底层原理。</p>
        </aside>
      </section>

      <!-- 5. StructScan -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          StructScan：逐行扫描进 struct
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          当你需要<strong>边遍历边处理</strong>（而不是一次取完）时，用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Queryx</code> 拿到 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">*sqlx.Rows</code>，
          在 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">for rows.Next()</code> 里调用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">rows.StructScan(&u)</code>。
          对比标准库的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">rows.Scan(&a, &b, &c)</code>——那里你必须<strong>按 SELECT 列的顺序</strong>一个个传指针，sqlx 按 tag 认列，加一列 SELECT 不用改 Go 代码。
        </p>
        <div class="mb-4"><Code language="go" :code="scanCode" title="struct_scan.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 何时用 StructScan 而不是 Get/Select：</strong>结果集很大要<strong>流式处理</strong>（边扫边算、边扫边写文件、发到 channel）、或查询里带了 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">LIMIT</code> 之外的分页游标逻辑时。普通「查完放切片」就用 Select，代码更短。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">Queryx + StructScan</code> ≈ 前端用流式接口 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">getReader()</code> 一帧帧读 SSE / 分块响应并逐个处理，而不是一次性 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">await res.json()</code> 等全部到齐。前者省内存、可提前消费，后者简单直接。</p>
        </aside>
      </section>

      <!-- 6. sqlx.In 与 rebind -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          sqlx.In 展开 IN (?) 与 Rebind 跨库占位符
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">WHERE id IN (?)</code> 不能直接传切片——得手动拼 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">(?, ?, ?, ...)</code>。
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sqlx.In</code> 帮你展开占位符并返回参数列表；<strong>Postgres 还得再调一次 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Rebind</code></strong> 把 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">?</code> 换成 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">$1,$2,$3</code>。
        </p>
        <div class="mb-4"><Code language="go" :code="inCode" title="sqlx_in.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 执行流程拆解：</strong><br/>
          ① <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">sqlx.In</code>：把 SQL 里的 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">IN (?)</code> 替换为 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">IN (?, ?, ?)</code>，把切片拆成单个参数返回 → ② <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">db.Rebind</code>：把 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">?</code> 换成当前驱动的占位符（Postgres 是 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">$N</code>）→ ③ <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">args...</code> 展开传参执行。<br/>
          在 MySQL 上可省略第 ② 步（占位符本来就是 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">?</code>）。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 空切片陷阱：</strong>传一个空切片给 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">sqlx.In</code>，会生成 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">IN (NULL)</code>——SQL 里 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">NULL</code> 比较恒为 UNKNOWN，<strong>永远查不到任何行</strong>。调用前先判空：<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">if len(ids) == 0 { return nil }</code>。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">sqlx.In + Rebind</code> ≈ 前端拼 `url + '?' + params.map(p => encodeURIComponent(p)).join('&')` 的自动版——JS 里手动拼查询串很容易漏转义、拼错，sqlx 把「把数组变成一组合法占位符」这件机械事自动化，避免手搓出错。</p>
        </aside>
      </section>

      <!-- 7. 三选一怎么选 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          sqlx vs database/sql vs GORM：怎么选
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          三条路线没有绝对优劣，取决于你要「多少 SQL 控制力」和「多少自动化的手」。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold">database/sql</th><th class="px-4 py-2 border border-slate-200 font-semibold">sqlx</th><th class="px-4 py-2 border border-slate-200 font-semibold">GORM</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">SQL 自由度</td><td class="px-4 py-2 border">100%（纯手写）</td><td class="px-4 py-2 border">100%（纯手写）</td><td class="px-4 py-2 border">低——尽量用链式 API，复杂 SQL 靠 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Raw</code></td></tr>
              <tr><td class="px-4 py-2 border">struct 自动映射</td><td class="px-4 py-2 border">无（手动 Scan）</td><td class="px-4 py-2 border">✅ Get/Select/StructScan</td><td class="px-4 py-2 border">✅ 由 model 生成 SQL</td></tr>
              <tr><td class="px-4 py-2 border">关联加载（join 缓存）</td><td class="px-4 py-2 border">手写 JOIN</td><td class="px-4 py-2 border">手写 JOIN</td><td class="px-4 py-2 border">Preload / Joins 自动</td></tr>
              <tr><td class="px-4 py-2 border">迁移工具</td><td class="px-4 py-2 border">无</td><td class="px-4 py-2 border">无（配 goose 等）</td><td class="px-4 py-2 border">自带 AutoMigrate</td></tr>
              <tr><td class="px-4 py-2 border">学习成本</td><td class="px-4 py-2 border">低（要懂 SQL）</td><td class="px-4 py-2 border">低（语法 ≈ 标准库）</td><td class="px-4 py-2 border">中高（API 多）</td></tr>
              <tr><td class="px-4 py-2 border">适合场景</td><td class="px-4 py-2 border">极致性能 / 简单项目</td><td class="px-4 py-2 border"><strong>原生 SQL + 不想写样板</strong></td><td class="px-4 py-2 border">CRUD 密集、团队熟悉 ORM</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          一句话结论：<strong>性能敏感 / SQL 复杂难改 → database/sql；SQL 自己写、但要自动映射 → sqlx（甜点位）；CRUD 占大头、想少写 SQL、要迁移 → GORM。</strong>
          sqlx 适合「从标准库升级、又不愿被 ORM 框住」的团队——也是把它放在原生 SQL 和 ORM 之间的原因。
        </p>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>在 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">apps/go/backend</code> 的 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">repository</code> 层将来接真库时，sqlx 是最贴近「原生 SQL 即军规」的选法——SQL 由你精写、结果由 sqlx 自动映射，既保留 DBA 级控制力，又不让 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">rows.Scan</code> 样板污染每一行代码。GORM 更适合纯 CRUD 的模块，两种可以在一个项目里共存。</p>
        </aside>
      </section>

      <!-- 8. 常见错误 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          常见错误与反模式
        </h2>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>忘写 db tag / tag 名拼错</strong> → 字段静默零值，不报错。写完 struct 先跑一次查询看值</li>
          <li><strong>Postgres 里直接手写 <code class="bg-slate-100 px-1 rounded font-mono text-xs">?</code></strong> → Postgres 只认 <code class="bg-slate-100 px-1 rounded font-mono text-xs">$N</code>。要么手写 <code class="bg-slate-100 px-1 rounded font-mono text-xs">$1</code>，要么走 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Rebind</code></li>
          <li><strong>sqlx.In 忘了 Rebind</strong> → 展开后的 SQL 还是 <code class="bg-slate-100 px-1 rounded font-mono text-xs">?</code>，Postgres 直接 <code class="bg-slate-100 px-1 rounded font-mono text-xs">syntax error</code></li>
          <li><strong>空切片丢给 sqlx.In</strong> → 生成 <code class="bg-slate-100 px-1 rounded font-mono text-xs">IN (NULL)</code>，恒空结果。先判空</li>
          <li><strong>拿到 <code class="bg-slate-100 px-1 rounded font-mono text-xs">*sql.Rows</code> 调 StructScan</strong> → 编译不过，StructScan 是 <code class="bg-slate-100 px-1 rounded font-mono text-xs">*sqlx.Rows</code> 独有的；用 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Queryx</code> 拿行集</li>
          <li><strong>忘空白导入驱动</strong> → <code class="bg-slate-100 px-1 rounded font-mono text-xs">sql: unknown driver</code>。见第 2 节警告</li>
        </ol>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 排查顺序经验法则：</strong>sqlx 报错 90% 是「占位符 / tag / 驱动」三件事。先确认驱动注册（Open 那步有没有报 unknown driver）→ 再确认 tag 和列名完全一致 → 最后确认占位符是 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">$N</code>（Postgres）还是 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">?</code>（MySQL）。按这个顺序能省一半查错时间。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>能用 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">Select</code> 就别手动 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">Queryx+StructScan</code>；要流式处理才用 Queryx。参数能走 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">NamedExec</code> 就用命名参数——SQL 一长，位置占位符是维护噩梦。</p>
        </aside>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>sqlx 是 database/sql 的增强层</strong>，不是替代品也不是 ORM——底层还是 *sql.DB，事务引擎完全兼容（下节就用到）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Get / Select</strong> 按 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">db</code> tag 自动映射单行 / 多行到 struct</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>NamedQuery / NamedExec</strong> 用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">:name</code> 命名参数，顺序无关、跨库兼容</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Queryx + StructScan</strong> 流式逐行扫进 struct，需要边扫边处理时用</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>sqlx.In + Rebind</strong>：展开 IN 占位符 + 转成 Postgres 的 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">$N</code>，注意空切片陷阱</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三选一</strong>：要控制力 + 自动映射 → sqlx；纯 CRUD + 迁移 → GORM；极致裸 SQL → database/sql</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <Link route="go-4-6-gorm-association" text="← 上一节：GORM 关联" animation="none" size="small"
          class="p-0! text-sm! font-normal! text-slate-500! hover:text-cyan-600! bg-transparent! border-none! inline! text-left!" />
        <Link route="go-4-8-transactions" text="下一节：事务 →" animation="none" size="small"
          class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline! text-right!" />
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Link, Nav } from 'components'

const navList = [
  { id: "sec-1", name: "sqlx 是什么" },
  { id: "sec-2", name: "Open 与连接" },
  { id: "sec-3", name: "Get / Select 自动映射" },
  { id: "sec-4", name: "NamedQuery 命名参数" },
  { id: "sec-5", name: "StructScan" },
  { id: "sec-6", name: "sqlx.In 与 Rebind" },
  { id: "sec-7", name: "三选一怎么选" },
  { id: "sec-8", name: "常见错误" },
  { id: "sec-9", name: "小结" },
]

const openCode = `package main

import (
    "log"

    _ "github.com/jackc/pgx/v5/stdlib" // 驱动注册：空白导入，靠 init() 注册到 database/sql
    "github.com/jmoiron/sqlx"
)

func main() {
    // 1. sqlx.Connect = Open + Ping：连不上立刻报错，开发期首选
    db, err := sqlx.Connect("pgx", "postgres://user:pass@localhost:5432/game?sslmode=disable")
    if err != nil {
        log.Fatalf("连不上数据库: %v", err)
    }
    defer db.Close()

    // 2. 也可以分两步：先 Open 再手动 Ping
    // db, err := sqlx.Open("pgx", "postgres://user:pass@localhost:5432/game")
    // if err != nil { log.Fatal(err) }
    // if err := db.Ping(); err != nil { log.Fatal(err) }

    // 3. *sqlx.DB 内嵌 *sql.DB：标准库方法全保留
    var version string
    if err := db.Get(&version, "SELECT version()"); err != nil {
        log.Fatal(err)
    }
    log.Println(version)
}
// 输出: 2026/08/27 10:00:00 PostgreSQL 16.x on x86_64-pc-linux-gnu ...`

const getSelectCode = `type User struct {
    ID        int64     \`db:"id"\`         // db tag 决定映射到哪一列
    Name      string    \`db:"name"\`
    Email     string    \`db:"email"\`
    CreatedAt time.Time \`db:"created_at"\`
}

// Get：单行 → 一个 struct
var u User
err := db.Get(&u, \`SELECT id, name, email, created_at FROM users WHERE id = $1\`, 1)
if errors.Is(err, sql.ErrNoRows) {
    log.Println("没有这个用户")
}

// Select：多行 → struct 切片
var users []User
err = db.Select(&users, \`SELECT id, name, email, created_at FROM users ORDER BY id\`)
// users[0].Name 直接可用

// 列的顺序无所谓：sqlx 按 db tag 认字段
var u2 User
err = db.Get(&u2, \`SELECT name, email, id FROM users WHERE id = $1\`, 2)`

const namedCode = `// NamedExec：命名参数版 INSERT，参数用 map 传，顺序无关
result, err := db.NamedExec(\`
    INSERT INTO users (name, email)
    VALUES (:name, :email)\`,
    map[string]any{
        "name":  "Alice",
        "email": "alice@example.com",
    })
if err != nil {
    log.Fatal(err)
}
id, _ := result.LastInsertId()
fmt.Printf("新用户 id = %d\\n", id)

// 参数也可以直接传 struct——字段名即参数名
type NewUser struct {
    Name  string
    Email string
}
_, err = db.NamedExec(\`
    INSERT INTO users (name, email)
    VALUES (:name, :email)\`,
    NewUser{Name: "Bob", Email: "bob@example.com"})

// NamedQuery：命名参数版 SELECT，返回 *sqlx.Rows，配合 StructScan
rows, err := db.NamedQuery(\`
    SELECT id, name, email, created_at FROM users WHERE name = :name\`,
    map[string]any{"name": "Alice"})
if err != nil {
    log.Fatal(err)
}
defer rows.Close()
for rows.Next() {
    var u User
    rows.StructScan(&u) // 一行映射进 struct
    fmt.Printf("%d %s\\n", u.ID, u.Name)
}
// 输出:
//   新用户 id = 7
//   1 Alice`

const scanCode = `// Queryx：返回 *sqlx.Rows，逐行 StructScan
rows, err := db.Queryx(\`SELECT id, name, email, created_at FROM users WHERE age > $1\`, 18)
if err != nil {
    log.Fatal(err)
}
defer rows.Close()

for rows.Next() {
    var u User
    if err := rows.StructScan(&u); err != nil { // 按 db tag 映射，不用管列顺序
        log.Fatal(err)
    }
    fmt.Printf("%s <%s>\\n", u.Name, u.Email)
}

// QueryRowx：单行版本，直接 StructScan
row := db.QueryRowx(\`SELECT id, name, email, created_at FROM users WHERE id = $1\`, 1)
var u User
if err := row.StructScan(&u); err != nil {
    if errors.Is(err, sql.ErrNoRows) {
        log.Println("没有这行")
    } else {
        log.Fatal(err)
    }
}`

const inCode = `// 1) sqlx.In：把 IN (?) 展开成 IN (?, ?, ?)，并拆出参数列表
ids := []int{1, 3, 5}
query, args, err := sqlx.In(\`SELECT id, name FROM users WHERE id IN (?)\`, ids)
if err != nil {
    log.Fatal(err)
}
// query = "SELECT id, name FROM users WHERE id IN (?, ?, ?)"
// args  = []interface{}{1, 3, 5}

// 2) Postgres 需要 rebind：把 ? 换成 $1,$2,$3
query = db.Rebind(query)
// query = "SELECT id, name FROM users WHERE id IN ($1, $2, $3)"

// 3) 用 Queryx 拿到可 StructScan 的行集
rows, err := db.Queryx(query, args...)
if err != nil {
    log.Fatal(err)
}
defer rows.Close()
for rows.Next() {
    var u User
    rows.StructScan(&u)
    fmt.Println(u.ID, u.Name)
}
// 输出:
//   1 Alice
//   3 Carol
//   5 Eve`
</script>
