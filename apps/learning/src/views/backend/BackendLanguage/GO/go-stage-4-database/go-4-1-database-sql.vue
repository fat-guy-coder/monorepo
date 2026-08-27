<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🗄️ database/sql 标准接口</h1>
          <p class="text-sm text-slate-500 mt-1">driver 注册 · sql.Open / db.Ping · DB 连接池句柄 · QueryRow / Query / Exec · Scan · 占位符</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/backend/internal/database/db.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 4-1</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. database/sql 是什么 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          database/sql 是什么：数据库的"通用插口"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">database/sql</code> 是 Go 标准库里的<strong>数据库操作统一接口</strong>。
          它本身<strong>不连接任何数据库</strong>，只定义了一套标准 API
          （<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sql.Open</code> /
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">db.Ping</code> /
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">db.Exec</code> /
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">db.Query</code> /
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">rows.Scan</code>）。
          真正和 MySQL / PostgreSQL / SQLite 打交道的，是各自的<strong>驱动（driver）</strong>。
        </p>
        <div class="mb-4"><Code language="go" :code="sqlIntfCode" title="database/sql 生态一览" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">database/sql</code> 就像前端的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">fetch</code>：你写请求时不用关心底层是 HTTP/1.1 还是 HTTP/2，换后端语言你也不用改 fetch 的写法。这里同理——换数据库（MySQL → Postgres），业务 SQL 代码几乎不用动，只换驱动导入 + 连接串 + 占位符。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>你后面要学的 GORM（<code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">go-4-5</code>）就<strong>坐在 database/sql 上面</strong>——GORM 帮你生成 SQL 并调用 database/sql 的 Exec/Query。理解这一层的 API，再看 ORM 就不晕：ORM 只是帮你写 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">INSERT/SELECT</code> 的助手，底层还是这套接口在干活。</p>
        </aside>
      </section>

      <!-- 2. driver 注册 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          driver 注册：import _ "github.com/mattn/go-sqlite3"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          驱动是怎么"登记"进 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">database/sql</code> 的？靠<strong>空白导入</strong>。
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">import _ "pkg"</code> 只做一件事——执行该包的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">init()</code>，
          而驱动的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">init()</code> 里调用了
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sql.Register("驱动名", &amp;Driver{})</code>，
          把自己的名字写进全局注册表。之后 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sql.Open("驱动名", ...)</code> 才能"按名找人"。
        </p>
        <div class="mb-4"><Code language="go" :code="driverCode" title="driver.go — 注册原理" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 最常见的坑：忘了空白导入。</strong>只写 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">sql.Open("sqlite3", ...)</code> 却忘 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">import _ "github.com/mattn/go-sqlite3"</code>，运行时报：<br/>
          <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">sql: unknown driver "sqlite3" (forgotten import?)</code><br/>
          注意：这个错误在 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">sql.Open</code> 时立刻抛，不会拖到 Query 才报。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么用空白导入而不是直接 import？</strong>因为你的业务代码<strong>从不直接调用驱动包里的任何函数</strong>——你只调用 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">database/sql</code> 的 API。空白导入就是告诉编译器："我只想触发它的副作用（init 注册），名字别占我命名空间。"</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>空白导入 ≈ 前端的"副作用导入"——<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">import 'vite-plugin-x'</code>、<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">import '@/styles/index.css'</code>、或引入一个 polyfill。这些导入<strong>不拿任何具名导出</strong>，只要执行到就好（注册全局效果）。Go 的 driver 注册就是这套思想。</p>
        </aside>
      </section>

      <!-- 3. sql.Open 与 db.Ping -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          sql.Open 与 db.Ping：Open 不真连库！
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          新手最大误解：<strong>以为 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sql.Open</code> 返回成功 = 连上数据库了。</strong>
          错。<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sql.Open</code> 只做两件事：校验驱动名 + 创建 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">*sql.DB</code> 句柄，<strong>一条真实连接都不会建立</strong>。
          连接是"懒加载"的——第一次执行 SQL 时才真正去连。所以验证连通性必须靠 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">db.Ping()</code>。
        </p>
        <div class="mb-4"><Code language="go" :code="openPingCode" title="main.go — Open 与 Ping 的分工" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 生产事故隐患：</strong>数据库宕机后，服务重启时 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">sql.Open</code> 照样成功、日志显示"启动正常"，直到第一个请求的 Query 才爆出 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">connection refused</code>。<strong>启动自检必须加 db.Ping()</strong>，连不上就 panic 或重试，别让服务带病启动。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">sql.Open</code> ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">axios.create({ baseURL })</code>——只是造一个实例，<strong>一个字节都没发出去</strong>。<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">db.Ping()</code> ≈ 第一个 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">get('/health')</code> 请求，这一刻才知道服务器在不在。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>把 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">Open + Ping</code> 封装成 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">InitDB()</code>，在 main 里启动即调用；同时给 HTTP 服务加一个 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">/healthz</code> 接口，里面调 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">db.Ping()</code>——K8s 探活、负载均衡健康检查都靠它。</p>
        </aside>
      </section>

      <!-- 4. DB 是连接池句柄 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          DB 是连接池句柄，不是单个连接
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">*sql.DB</code> 不是你脑子里那条"数据库连接"，它是<strong>整个连接池的门面</strong>。
          池里维护着一堆底层连接，你的每条 SQL <strong>借一条来用，用完自动还回去</strong>。
          所以多个 goroutine 同时用同一个 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">db</code> 完全安全——<strong>不需要自己加锁</strong>，池会协调分配。
        </p>
        <div class="mb-4"><Code language="go" :code="dbHandleCode" title="sql.DB 连接池心智模型" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">对比</th><th class="px-4 py-2 border border-slate-200 font-semibold">*sql.DB（连接池）</th><th class="px-4 py-2 border border-slate-200 font-semibold">单条连接</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">是几条连接</td><td class="px-4 py-2 border">自动管理 N 条底层连接</td><td class="px-4 py-2 border">就是一条</td></tr>
              <tr><td class="px-4 py-2 border">创建成本</td><td class="px-4 py-2 border">进程里只 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Open</code> 一次</td><td class="px-4 py-2 border">每次连都要握手 + 认证</td></tr>
              <tr><td class="px-4 py-2 border">并发</td><td class="px-4 py-2 border">并发安全，池自动借还</td><td class="px-4 py-2 border">同一时刻只能服务一个请求</td></tr>
              <tr><td class="px-4 py-2 border">正确姿势</td><td class="px-4 py-2 border"><strong>全局单例</strong>，应用生命周期内常驻</td><td class="px-4 py-2 border">用一次扔一次，成本极高</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>数据库连接复用 ≈ <strong>HTTP keep-alive 连接复用</strong>。浏览器对同一域名最多并发 6 条 TCP 连接，发完请求不立刻断开、留着复用下一条——这正是连接池的思路。<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">rows.Close()</code> 归还连接 ≈ 请求完成后把这条 keep-alive 连接放回浏览器连接池。</p>
        </aside>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>连接池就像<strong>餐厅的前台电话</strong>：不是每位顾客进来都新装一部电话（每次请求新建连接），而是共用几部空闲电话（空闲连接），忙时排队等（阻塞等待）。老板要做的只是决定"最多装几部电话"——那就是 <code class="bg-orange-100 text-orange-700 px-1 py-0.5 rounded text-xs">SetMaxOpenConns</code>，下一篇的配置。</p>
        </aside>
      </section>

      <!-- 5. QueryRow / Query / Exec -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          三兄弟：Exec / QueryRow / Query
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          日常 95% 的 SQL 都逃不过这三个方法。选谁？先问一句：<strong>这条 SQL 返回几行？</strong>
          返回 0 行（INSERT/UPDATE/DELETE/DDL）→ <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Exec</code>；
          恰好 1 行 → <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">QueryRow</code>；
          0 到多行 → <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Query</code>。
        </p>
        <div class="mb-4"><Code language="go" :code="threeBrothersCode" title="三兄弟速查" /></div>
        <div class="mb-4"><Code language="go" :code="fullExampleCode" title="db.go — 完整小例子：建表 + 插入 + 查询" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 返回值区别：</strong><code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">Exec</code> 返回 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">Result</code>（LastInsertId / RowsAffected）；<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">QueryRow</code> 返回一个只能 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">Scan</code> 一次的结果行；<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">Query</code> 返回 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">*sql.Rows</code> 游标，必须遍历 + Close。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑：</strong><code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">QueryRow</code> 查不到行时返回的<strong>不是 nil 而是</strong> <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">sql.ErrNoRows</code>——很多人忘了判断，把"查无此人"当成系统故障。记住：<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">errors.Is(err, sql.ErrNoRows)</code> 是一个<strong>正常业务分支</strong>，不是错误。另外 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">LastInsertId()</code> 并非所有数据库都支持（Postgres 要 RETURNING），跨库时别依赖它。</p>
        </aside>
      </section>

      <!-- 6. 占位符 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          占位符 ? 参数：永不拼接字符串
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          永远不要用字符串拼接拼 SQL。用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">?</code> 占位 + 参数分传，
          driver 负责把值转义后交给数据库——<strong>从根上杜绝 SQL 注入</strong>。这正是你下一篇（go-4-4 SQL 安全）会展开的主题。
        </p>
        <div class="mb-4"><Code language="go" :code="placeholderCode" title="placeholder.go — 占位符正确姿势" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>占位符 ≈ 前端模板里把用户输入交给框架转义，而不是 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">v-html</code> 直接塞原始字符串。就像 React 默认对 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">{name}</code> 转义防 XSS，Go 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">?</code> 由驱动转义防 SQL 注入——<strong>防注入是框架/驱动的默认职责，别自己拼</strong>。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 跨库坑：占位符语法因驱动而异。</strong>SQLite / MySQL 用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">?</code>；PostgreSQL 用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">$1 $2</code>（从 1 编号）。写跨库代码时这行最容易踩——要么把"构造 SQL"抽成一层抽象，要么直接上 GORM 这类 ORM 帮你统一。</p>
        </aside>
      </section>

      <!-- 7. rows.Scan -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          rows.Scan 与类型匹配
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">rows.Scan(&dest...)</code> 把一行的列值<strong>按从左到右的顺序</strong>填进变量，
          是 database/sql 里最容易出"运行期才炸"类型坑的地方。目标必须是<strong>指针</strong>，且类型要能对上。
        </p>
        <div class="mb-4"><Code language="go" :code="scanCode" title="scan.go — 类型匹配规则" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 两个高频类型坑：</strong>① 列序对不上——<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">SELECT id, name</code> 却 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Scan(&name, &id)</code>，不编译报错、运行期才抛转换失败；② NULL 值塞进 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">string</code> 直接报错，必须用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">sql.NullString / sql.NullInt64</code>。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 遍历收尾三件套：</strong>① <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">defer rows.Close()</code>（借了连接要还）；② 循环里 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">rows.Next()</code> 判断还有没有下一行；③ 循环后 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">rows.Err()</code> 检查遍历过程有没有出错——<strong>循环正常结束不等于没出错</strong>，中间某行网络断了要靠它兜底。</p>
        </aside>
      </section>

      <!-- 8. 常见错误 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          常见错误速查
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          这四个坑覆盖了新手（和老手）90% 的 database/sql 事故，看到报错先对号入座。
        </p>
        <div class="mb-4"><Code language="go" :code="errCode" title="errors.go — 四个经典事故" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 最隐蔽的坑：忘记 rows.Close()。</strong>它不报错，只是让连接"借了不还"。单个请求看不出问题，压力一起来连接池就被耗空，症状变成<strong>请求越来越慢、最终全部卡住</strong>。排查这类问题时 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">db.Stats()</code> 一眼见分晓（见下一篇 go-4-2）。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践清单：</strong><br/>① <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">*sql.DB</code> 全局单例，进程只 Open 一次；② 启动时 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">db.Ping()</code> 自检；③ 查询全用占位符；④ 有 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">rows</code> 必有 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">defer rows.Close()</code>；⑤ <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">errors.Is(err, sql.ErrNoRows)</code> 当正常分支处理。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>忘记 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">rows.Close()</code> 不报错、只漏资源 ≈ 前端 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">setInterval</code> 忘了 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">clearInterval</code>——内存泄漏都是"看起来没事，跑久了出事"。Go 的解法很直接：资源用 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">defer</code> 归还，跟你组件卸载时清理监听器一个道理。</p>
        </aside>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>database/sql 是统一接口</strong>，不连库；真正连库的是<strong>驱动</strong>，用空白导入 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">import _ "驱动包"</code> 触发 init 注册</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>sql.Open 不真连库</strong>（只建句柄），验证连通性用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">db.Ping()</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>*sql.DB 是连接池门面</strong>（不是单条连接），全局单例 + 并发安全，不用自己加锁</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三兄弟</strong>：Exec（无返回行）/ QueryRow（恰好一行，无行返回 ErrNoRows）/ Query（多行，需遍历 + Close）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>占位符 ?</strong> 参数化防注入，但 MySQL 用 ?、Postgres 用 $1，跨库注意</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Scan 类型匹配</strong>：目标是指针、列序要对应、NULL 用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">sql.NullXxx</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>四个坑</strong>：忘 rows.Close（连接泄漏）、Scan 类型不匹配、Open 不当连通校验、ErrNoRows 当故障</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <span></span>
        <Link :route="'go-4-2-connection-pool'" :text="'下一节：连接池配置 →'" animation="none" size="small" class="p-0! text-sm! font-medium! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Link, Nav } from 'components'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "database/sql 是什么" },
  { id: "sec-2", name: "driver 注册" },
  { id: "sec-3", name: "sql.Open 与 db.Ping" },
  { id: "sec-4", name: "DB 是连接池句柄" },
  { id: "sec-5", name: "Exec / QueryRow / Query" },
  { id: "sec-6", name: "占位符 ? 参数" },
  { id: "sec-7", name: "rows.Scan 类型匹配" },
  { id: "sec-8", name: "常见错误速查" },
  { id: "sec-9", name: "小结" },
]

const sqlIntfCode = `// database/sql —— Go 标准库的"数据库通用接口"
//
// 它本身【不连接任何数据库】，只定义一套统一 API：
//   sql.Open / db.Ping / db.Exec / db.Query / db.QueryRow / rows.Scan
//
// 真正和 MySQL / PostgreSQL / SQLite 打交道的是各自的【驱动】：
//   数据库    驱动包路径                           导入名
//   SQLite    github.com/mattn/go-sqlite3         sqlite3
//   MySQL     github.com/go-sql-driver/mysql      mysql
//   Postgres  github.com/lib/pq                   pq
//   Postgres  github.com/jackc/pgx/v5             pgx   (推荐)
//
// 好处：换数据库时业务 SQL 代码几乎不用动——
//   只换「驱动导入 + 连接串 + 占位符」三样。
// 这就像前端统一用 fetch，后端语言怎么换你都不用改 fetch 的写法。`

const driverCode = `// driver 的注册秘密：空白导入只做一件事——执行 init()
import _ "github.com/mattn/go-sqlite3"   // ① 导入即执行该包的 init()

// mattn/go-sqlite3 包的 init() 大致长这样（简化）：
func init() {
    // ② 把「驱动名 + 驱动实例」登记进 database/sql 的全局注册表
    sql.Register("sqlite3", &SQLiteDriver{})
}

// ③ 之后你才能这样打开：
db, err := sql.Open("sqlite3", "./data.db")   // 驱动名必须和 Register 的名字一致`

const openPingCode = `package main

import (
    "database/sql"
    "fmt"
    _ "github.com/mattn/go-sqlite3" // 空白导入：注册 sqlite3 驱动
)

func main() {
    // sql.Open 只做两件事：
    //   ① 查全局注册表，确认 "sqlite3" 这个驱动存在
    //   ② 返回一个 *sql.DB 句柄（连接池的门面）
    // 它此刻【不建立任何真实连接】！
    db, err := sql.Open("sqlite3", "./data.db")
    if err != nil {
        fmt.Println("Open 报错只说明：驱动名不认 / 参数不合法：", err)
        return
    }
    defer db.Close()

    // 真正验证连通性的是 Ping —— 它才会实际建立连接
    if err := db.Ping(); err != nil {
        fmt.Println("连不上数据库（库没启动 / 路径不对）：", err)
        return
    }
    fmt.Println("数据库连接 OK")
}
// 输出（库存在且能连）：数据库连接 OK
// 输出（路径不存在时）：连不上数据库（库没启动 / 路径不对）：unable to open database file`

const dbHandleCode = `// 心智模型：*sql.DB 不是"一条连接"，是【整个连接池】的门面
//
//             ┌───────────────────────────────┐
//   查询 ───► │            *sql.DB             │ ──► 连接1
//             │    (自动管理多条底层连接)       │ ──► 连接2
//             │                               │ ──► 连接3 ...
//             └───────────────────────────────┘
//
// 执行一条 SQL 时，database/sql 会：
//   1. 从池里借一条空闲连接
//   2. 在这条连接上执行 SQL
//   3. 用完（rows.Close / 语句结束）自动还回池子
//
// 所以并发安全：多个 goroutine 同时调 db.Query 完全 OK，
// 池会协调连接分配 —— 你【不需要自己加锁】。
// 这是标准库替你省掉的活：在别的语言里连接池要单独引依赖
// （如 Java 的 HikariCP、Python 的 SQLAlchemy pool）。`

const threeBrothersCode = `// 三兄弟：先想「这条 SQL 返回几行」，再选方法
//
// ① db.Exec(sql, args...) —— 不返回行的语句
//    INSERT / UPDATE / DELETE / CREATE TABLE / DDL
//    返回 Result：LastInsertId()、RowsAffected()
//    用法：res, err := db.Exec("INSERT ...", 参数...)
//    多数情况下 err == nil 就算成功
//
// ② db.QueryRow(sql, args...).Scan(&dest...) —— 恰好一行
//    返回单行结果，通常链式调用 .Scan()
//    查不到行 → 返回 sql.ErrNoRows，必须单独判断
//    用法：err := db.QueryRow("SELECT ...", 参数...).Scan(&a, &b)
//
// ③ db.Query(sql, args...) —— 零到多行
//    返回 *sql.Rows 游标：for rows.Next() { rows.Scan(&...) }
//    用完必须 rows.Close()（否则连接不还回池）
//    遍历完还要检查 rows.Err()，确认没在中途出错`

const fullExampleCode = `package main

import (
    "database/sql"
    "errors"
    "fmt"
    "log"

    _ "github.com/mattn/go-sqlite3"
)

func main() {
    db, err := sql.Open("sqlite3", ":memory:") // 内存库：测试专用
    if err != nil { log.Fatal(err) }
    defer db.Close()

    // ① 建表 —— Exec 执行无返回行的语句
    const ddl = "CREATE TABLE IF NOT EXISTS users (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
        "name TEXT NOT NULL, age INTEGER)"
    if _, err := db.Exec(ddl); err != nil { log.Fatal(err) }

    // ② 插入 —— Exec + ? 占位符
    res, err := db.Exec("INSERT INTO users(name, age) VALUES(?, ?)", "小明", 18)
    if err != nil { log.Fatal(err) }
    id, _ := res.LastInsertId() // SQLite 支持；Postgres 要用 RETURNING
    fmt.Println("插入成功，自增 ID =", id)

    // ③ 查单行 —— QueryRow，最多取一行
    var name string
    var age int
    err = db.QueryRow("SELECT name, age FROM users WHERE id = ?", id).
        Scan(&name, &age) // Scan 把结果填进指针
    if errors.Is(err, sql.ErrNoRows) {
        fmt.Println("查无此人 —— 正常业务分支")
        return
    }
    if err != nil { log.Fatal(err) }
    fmt.Printf("查单行: %s 今年 %d 岁\\n", name, age)

    // ④ 查多行 —— Query，返回 rows 游标
    rows, err := db.Query("SELECT id, name, age FROM users")
    if err != nil { log.Fatal(err) }
    defer rows.Close() // 用完必须关，否则连接不还回池子
    for rows.Next() {
        var uID, uAge int
        var uName string
        rows.Scan(&uID, &uName, &uAge) // 顺序与 SELECT 列一一对应
        fmt.Printf("id=%d name=%s age=%d\\n", uID, uName, uAge)
    }
    if err := rows.Err(); err != nil { log.Fatal(err) } // 遍历完检查
}
// 输出:
// 插入成功，自增 ID = 1
// 查单行: 小明 今年 18 岁
// id=1 name=小明 age=18`

const placeholderCode = `// ✅ 用 ? 占位，参数分开传 —— 值由 driver 转义，天然防 SQL 注入
db.QueryRow("SELECT age FROM users WHERE name = ? AND age > ?", name, minAge)

// ❌ 千万别字符串拼接 —— 等于把数据库大门敞开
// db.Query("SELECT * FROM users WHERE name = '" + name + "'")
//   如果 name = "' OR '1'='1" → 全表泄露

// ⚠️ 占位符语法因驱动而异：
//   SQLite / MySQL：?（问号）
//   PostgreSQL：    $1 $2（从 1 编号）
//   换库时这行最容易踩坑，跨库代码要抽象掉这一层

// 每个 ? 必须有对应参数，数量不匹配 → 报错
// db.Exec("INSERT INTO users(name) VALUES(?)")              // ❌ 缺参数
// db.Exec("INSERT INTO users(name, age) VALUES(?, ?)", "王五", 30) // ✅`

const scanCode = `// Scan 把一行的列值按【从左到右】填进你的变量，类型必须能对上
var id int
var name string
var age sql.NullInt64 // 数据库里 age 可能是 NULL

err := db.QueryRow("SELECT id, name, age FROM users WHERE id = ?", 1).
    Scan(&id, &name, &age)

// 类型匹配规则（driver 负责转换）：
//   INTEGER     → int / int64
//   TEXT/VARCHAR → string
//   NULL        → 必须用 sql.NullString / sql.NullInt64，否则 Scan 报错
//   BLOB        → []byte
// 注意：Scan 的目标是指针（&id），不是值本身

// 顺序必须与 SELECT 的列一致：
// SELECT id, name, age  →  Scan(&id, &name, &age)   ← 一一对应
// 反了（先 age 再 name）不编译报错，但运行期会类型转换失败`

const errCode = `// ❌ 坑1：忘记 rows.Close() —— 连接一直被占用，池子越用越少
rows, _ := db.Query("SELECT * FROM users")
for rows.Next() { /* 处理 */ }
// 忘了 defer rows.Close()！rows 不 Close，底层连接不还回连接池，
// 跑几百个请求后池子被耗空，请求全部卡住（见 go-4-2）

// ❌ 坑2：Scan 目标类型不匹配 —— 运行期才报错
// SELECT age (INTEGER) 却 Scan(&name string)
// → sql: Scan error on column index 1: converting driver.Value
//   type int64 to string is not supported

// ❌ 坑3：以为 sql.Open 就连接上了 —— 其实它什么都没连
db, err := sql.Open("mysql", "user:pwd@tcp(127.0.0.1:3306)/db")
if err != nil { /* 一般不会走到这 */ }
// 库没启动？Open 照样成功。直到第一条 Query 才报：
// dial tcp 127.0.0.1:3306: connect: connection refused
// → 连库校验请用 db.Ping()，不要在 Open 后就下"连上了"的结论

// ❌ 坑4：没处理 sql.ErrNoRows（QueryRow 查不到行）
err := db.QueryRow("SELECT age FROM users WHERE id = 999").Scan(&age)
if errors.Is(err, sql.ErrNoRows) {
    fmt.Println("查无此人 —— 正常业务分支，别当故障处理")
}`
</script>
