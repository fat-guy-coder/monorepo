<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🗃️ GORM 入门</h1>
          <p class="text-sm text-slate-500 mt-1">Go 最流行的 ORM · gorm.Open 连接 · AutoMigrate 自动建表 · struct tag · 默认约定 · 完整增删改查</p>
        </div>
        <div class="flex items-center gap-3">
          <Link :route="'go-4-3-crud-basics'" :text="'先看 database/sql CRUD'" animation="none" size="small" class="px-3! py-1! text-xs! font-medium! text-cyan-700! bg-cyan-50! hover:bg-cyan-100! hover:text-cyan-900! rounded-full! border-none!" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 4-5</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. GORM 是什么 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          GORM 是什么：Go 最流行的 ORM
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          GORM 是 Go 生态<strong>最流行的 ORM（Object-Relational Mapping，对象关系映射）</strong>库（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">github.com/go-gorm/gorm</code>）。
          它把你前面用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">database/sql</code> 手写 SQL、手动 Scan 的活儿（4-1 到 4-4 那几篇），包装成<strong>「结构体 + 方法调用」</strong>：
          结构体就是表，字段就是列，方法就是增删改查。
        </p>
        <p class="text-slate-600 mb-4 leading-relaxed">
          它开箱即提供：自动建表（AutoMigrate）、关联（HasMany / BelongsTo / Many2Many，见 4-6）、钩子（Hooks）、事务、
          软删除、链式查询、批量操作、Scopes 等。<strong>它仍然是数据库驱动之上的封装</strong>——底层还是要连 SQLite / PostgreSQL / MySQL，只是你不用再手写 SQL。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">对比</th><th class="px-4 py-2 border border-slate-200 font-semibold">database/sql（前几篇）</th><th class="px-4 py-2 border border-slate-200 font-semibold">GORM</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">查单条</td><td class="px-4 py-2 border font-mono text-xs">db.QueryRow("SELECT ... WHERE id=?", id)</td><td class="px-4 py-2 border font-mono text-xs">db.First(&user, id)</td></tr>
              <tr><td class="px-4 py-2 border">映射结构体</td><td class="px-4 py-2 border">手动 <code class="bg-slate-100 px-1 rounded font-mono text-xs">rows.Scan(&u.ID, &u.Name)</code></td><td class="px-4 py-2 border">按字段名 / struct tag 自动映射</td></tr>
              <tr><td class="px-4 py-2 border">建表</td><td class="px-4 py-2 border">手写 <code class="bg-slate-100 px-1 rounded font-mono text-xs">CREATE TABLE</code> 语句</td><td class="px-4 py-2 border font-mono text-xs">db.AutoMigrate(&User{})</td></tr>
              <tr><td class="px-4 py-2 border">占位符</td><td class="px-4 py-2 border">不同数据库 <code class="bg-slate-100 px-1 rounded font-mono text-xs">?</code>/<code class="bg-slate-100 px-1 rounded font-mono text-xs">$1</code> 不统一</td><td class="px-4 py-2 border">统一 <code class="bg-slate-100 px-1 rounded font-mono text-xs">?</code>，GORM 翻译成各库语法</td></tr>
              <tr><td class="px-4 py-2 border">适合</td><td class="px-4 py-2 border">复杂 / 定制 SQL、追求极致控制</td><td class="px-4 py-2 border">常规 CRUD、快速迭代、原型开发</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>GORM ≈ JS 生态的 <strong>Sequelize / TypeORM / Prisma</strong>。前端用 ORM 把「表」映射成「Model / Entity」，Go 里 GORM 干一模一样的活：<strong>结构体 ≈ Model / Entity</strong>，<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">gorm:"..."</code> 标签 ≈ Sequelize 字段定义 / TypeORM 装饰器 / Prisma schema。学过任何一个，GORM 的心智模型直接平移。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>database/sql ≈ Go 的「原生 SQL 连接层」，GORM 是它上面的「框架层」。真实项目里两种可以混用：<strong>GORM 管 90% 的常规 CRUD，遇到复杂报表 / 大事务 / 大数据量更新再用 database/sql 裸写</strong>。Go 社区的经验是「ORM 做日常，SQL 做极致」。</p>
        </aside>
      </section>

      <!-- 2. 安装与连接 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          安装与连接：gorm.Open
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          GORM 本体 + 一个「驱动」即可用。<strong>GORM 核心不直接连数据库</strong>，它通过 Dialector（方言器）对接具体数据库：
          SQLite（本地文件、零配置，学习最方便）、PostgreSQL（与 backend 项目一致）、MySQL / SQL Server 等。
          核心代码只写一次，换数据库只需要换驱动和 DSN。
        </p>
        <div class="mb-4"><Code language="go" :code="connectCode" title="connect.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 学习策略：</strong>本页示例全部用 <strong>SQLite</strong>（一条 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">go get gorm.io/driver/sqlite</code> 就能跑，文件即数据库）。生产接 PostgreSQL 时，把 DSN 换成 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">postgres.Open("host=... dbname=...")</code> 即可——<strong>增删改查的写法完全不变</strong>。这正是 ORM 的价值。</p>
        </aside>
      </section>

      <!-- 3. 模型与 struct tag -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          模型与 struct tag：结构体就是建表说明书
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          在 GORM 里，<strong>一个结构体 = 一张表，一个字段 = 一列</strong>。字段后面跟的
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">gorm:"..."</code> 标签控制列的约束：
          主键、长度、非空、唯一、默认值、列名、索引……AutoMigrate 建表时逐条读取。
        </p>
        <div class="mb-4"><Code language="go" :code="modelCode" title="model/user.go" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">Tag</th><th class="px-4 py-2 border border-slate-200 font-semibold">作用</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">primaryKey</td><td class="px-4 py-2 border">主键（GORM 默认认为 ID 就是主键）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">size:255</td><td class="px-4 py-2 border">长度限制，对应 <code class="bg-slate-100 px-1 rounded font-mono text-xs">VARCHAR(255)</code></td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">not null</td><td class="px-4 py-2 border">非空约束</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">uniqueIndex</td><td class="px-4 py-2 border">唯一索引（可多个字段组合）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">index</td><td class="px-4 py-2 border">普通索引，加速查询</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">default:0</td><td class="px-4 py-2 border">默认值（注意：零值字段 Create 时可能不生效，见常见错误）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">column:xxx</td><td class="px-4 py-2 border">自定义列名（覆盖默认 snake_case）</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">autoIncrement</td><td class="px-4 py-2 border">自增</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">gorm:"size:255;not null"</code> ≈ Prisma schema 里 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">name String @db.VarChar(255)</code> ≈ TypeORM 装饰器 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">@Column({ length: 255 })</code>。都是「<strong>用声明式配置描述列约束</strong>」，Go 把它写在结构体字段后面的反引号里，JS 写在装饰器 / schema 里。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 别把两个 tag 写混：</strong>Go 的 tag 是<strong>反引号</strong> <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">`gorm:"..."`</code>，不是普通引号。写错成 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">"gorm:..."</code> 不会报错，但<strong>GORM 读不到约束</strong>，建出来的表全都没有长度/索引。还有一个高频坑：<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">gorm:"..."</code> 是 GORM 读的，<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">json:"..."</code> 是序列化读的，两者作用不同，别删错。</p>
        </aside>
      </section>

      <!-- 4. AutoMigrate 自动建表 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          AutoMigrate：按结构体自动建表
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">db.AutoMigrate(&Model{})</code> 会对比「结构体定义」和「数据库现有表」，<strong>自动创建缺失的表、补充缺失的列、创建缺失的索引</strong>。它是<strong>幂等</strong>的——重复跑不会报错、不会重复建表。它<strong>不会删除列、不会改列类型、不会删数据</strong>（只增不改不删）。
        </p>
        <div class="mb-4"><Code language="go" :code="migrateCode" title="migrate.go" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>程序启动时调用 <code class="bg-slate-100 px-1 rounded font-mono text-xs">db.AutoMigrate(&User{}, &Order{})</code>，一次可传多张表</li>
          <li>GORM 读取每个结构体：表名（默认复数 snake_case）、字段（列名 + 约束）、索引</li>
          <li>对比目标库：缺表 → CREATE TABLE；缺列 → ALTER TABLE ADD COLUMN；缺索引 → CREATE INDEX</li>
          <li>不存在的列 <strong>不会删</strong>、类型 <strong>不会改</strong>——所以它安全但不是「正式迁移」</li>
        </ol>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 什么时候用 AutoMigrate：</strong>开发阶段 / 原型 / 内部工具——启动即建表，零成本。真实生产环境里，涉及<strong>改列类型、删列、数据迁移</strong>时它不够用，需要正式迁移工具（见 <Link :route="'go-4-13-migration'" :text="'go-4-13 数据库迁移'" animation="none" size="small" class="p-0! text-sm! font-normal! text-emerald-700! hover:text-emerald-800! bg-transparent! border-none! inline!" />）。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ AutoMigrate 的三个「不」：</strong>① <strong>不改列类型</strong>——字段类型从 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">string</code> 改成 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">uint</code> 不会 ALTER；② <strong>不删列</strong>——结构体删掉某字段，旧列还在；③ <strong>不跑数据迁移</strong>——加个默认值不会回填旧数据。线上建表一律走正式迁移（4-13）。</p>
        </aside>
      </section>

      <!-- 5. 默认约定 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          默认约定：表名复数 · snake_case · ID 主键 · 时间戳
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          GORM 大量使用<strong>约定优于配置</strong>（convention over configuration）。你不写任何 tag，它也会按一套默认规则推断表名和列名：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">约定</th><th class="px-4 py-2 border border-slate-200 font-semibold">规则</th><th class="px-4 py-2 border border-slate-200 font-semibold">示例</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">表名</td><td class="px-4 py-2 border">结构体名 → <strong>复数 + snake_case</strong></td><td class="px-4 py-2 border font-mono text-xs">User → users，OrderItem → order_items</td></tr>
              <tr><td class="px-4 py-2 border">列名</td><td class="px-4 py-2 border">字段名 → <strong>snake_case</strong></td><td class="px-4 py-2 border font-mono text-xs">NickName → nick_name</td></tr>
              <tr><td class="px-4 py-2 border">主键</td><td class="px-4 py-2 border"><code class="bg-slate-100 px-1 rounded font-mono text-xs">ID</code> 字段 = 主键 + 自增</td><td class="px-4 py-2 border font-mono text-xs">ID uint → 列 id，primary key</td></tr>
              <tr><td class="px-4 py-2 border">时间戳</td><td class="px-4 py-2 border">字段叫 <code class="bg-slate-100 px-1 rounded font-mono text-xs">CreatedAt</code>/<code class="bg-slate-100 px-1 rounded font-mono text-xs">UpdatedAt</code> → 自动维护</td><td class="px-4 py-2 border font-mono text-xs">创建/更新时自动写当前时间</td></tr>
              <tr><td class="px-4 py-2 border">软删除</td><td class="px-4 py-2 border">字段叫 <code class="bg-slate-100 px-1 rounded font-mono text-xs">DeletedAt</code>（或内嵌 gorm.Model）</td><td class="px-4 py-2 border font-mono text-xs">Delete 变成 UPDATE deleted_at，不真删行</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>不想遵守约定时</strong>：表名用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">TableName()</code> 方法覆盖，列名用
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">column:</code> 标签覆盖。
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">gorm.Model</code> 是一个官方预置结构体，内嵌它 = 白送 ID + CreatedAt + UpdatedAt + DeletedAt 四件套。
        </p>
        <div class="mb-4"><Code language="go" :code="conventionsCode" title="conventions.go" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>这套「表名复数、列名 snake_case」约定 ≈ Sequelize 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">underscored: true</code> + 复数表名约定，也 ≈ Prisma 默认 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">@@map</code>。你在 JS ORM 里见过的「模型名 User → 表 users」「驼峰字段 → 下划线列」，GORM 默认就帮你做了。</p>
        </aside>
      </section>

      <!-- 6. CRUD 完整示例 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          增删改查：Create / First / Find / Where / Updates / Delete
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          六个最常用的方法，一次跑通：
        </p>
        <div class="mb-4"><Code language="go" :code="crudCode" title="crud.go" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>Create</strong>：传 <code class="bg-slate-100 px-1 rounded font-mono text-xs">&Product{...}</code>（指针），写库并回填 ID；传切片 = 批量插入</li>
          <li><strong>First</strong>：<strong>单条</strong>，按主键升序取第一条；找不到返回 <code class="bg-slate-100 px-1 rounded font-mono text-xs">gorm.ErrRecordNotFound</code></li>
          <li><strong>Find</strong>：<strong>多条</strong>，条件可有可无；找不到返回空切片（不报错）</li>
          <li><strong>Where</strong>：拼 WHERE 条件，<code class="bg-slate-100 px-1 rounded font-mono text-xs">?</code> 占位符防注入（与 4-4 的道理一致）</li>
          <li><strong>Updates</strong>：<code class="bg-slate-100 px-1 rounded font-mono text-xs">Model(&p).Updates(...)</code> 按主键更新；只更新<strong>非零值</strong>字段</li>
          <li><strong>Delete</strong>：有 <code class="bg-slate-100 px-1 rounded font-mono text-xs">DeletedAt</code> 字段 → 软删除；否则硬删除</li>
        </ol>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ Updates 的零值陷阱：</strong><code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Updates(Product{Price: 0})</code> 想把价格改成 0？<strong>不会生效</strong>——GORM 用 struct 更新时跳过零值字段（0、""、false）。解法：用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Updates(map[string]interface{}{"price": 0})</code>，或用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Select("price").Updates(...)</code> 显式指定字段。</p>
        </aside>
      </section>

      <!-- 7. 查询进阶 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          查询进阶：链式条件 / 排序 / 分页
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          GORM 的链式 API：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Where</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Order</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Limit</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Offset</code> 只是<strong>攒条件</strong>，真正执行发生在「终结方法」<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Find / First / Count</code>。条件全部用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">?</code> 占位符传参，杜绝拼接字符串。
        </p>
        <div class="mb-4"><Code language="go" :code="queryCode" title="query.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 First 与 Find 的差别：</strong><code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">First</code> 查不到会返回 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">gorm.ErrRecordNotFound</code>（要判断，否则拿到的结构体是零值）；<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">Find</code> 查不到返回<strong>空切片、不报错</strong>。写 API 时「单条用 First + 判错」「列表用 Find」是标准姿势。</p>
        </aside>
      </section>

      <!-- 8. 常见错误 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          常见错误与反模式
        </h2>
        <div class="space-y-4 mb-2">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：忘记 import 驱动包。</strong>只 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">go get gorm.io/gorm</code> 没装驱动，运行报 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">sql: unknown driver</code>。记得同时装 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">gorm.io/driver/sqlite</code> 或 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">gorm.io/driver/postgres</code> 并 import。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：Updates 传 struct 改不了零值。</strong>想把价格清 0、把状态置空 → 一律用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">map[string]interface{}</code>，别用 struct。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：First 不判错。</strong>记录不存在时 First 返回 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">ErrRecordNotFound</code>，但你得到的 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">&p</code> 是<strong>全零值</strong>。不判断直接 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">p.Name</code>，返回给前端的就是空字符串——最隐蔽的逻辑 bug。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 4：SQL 拼接而不是占位符。</strong><code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">db.Where("name = '" + name + "'")</code> 又回到了 4-4 的注入问题。GORM 的 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">?</code> 占位符同样做参数化转义，<strong>永远把值交给占位符</strong>。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 5：全量更新。</strong>在 handler 里直接 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">db.Model(&user).Updates(&req)</code> 会把你没填的字段也一起写库（struct 会跳过零值，但 map 不会）。正确的做法是<strong>只挑允许更新的字段</strong>，用白名单或 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Select</code> 限定。</p>
          </aside>
        </div>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>GORM</strong> 是 Go 最流行的 ORM：结构体 = 表，方法 = SQL，底层仍是数据库驱动。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>gorm.Open(驱动, DSN)</strong> 连接数据库；换库只换驱动 + DSN，业务代码不变。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>struct tag</strong>（<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">gorm:"primaryKey;size:255;not null"</code>）声明列约束，AutoMigrate 建表。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>AutoMigrate</strong> 幂等建表/加列/加索引，只增不改不删；线上正式迁移用 go-4-13。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>默认约定</strong>：表名复数 snake_case、ID 主键、CreatedAt/UpdatedAt 自动维护、DeletedAt 软删除。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>CRUD</strong>：Create / First / Find / Where / Updates / Delete；Updates 用 struct 改不了零值，用 map。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>条件一律 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">?</code> 占位符传参，沿用 4-4 的防注入原则。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">相关阅读：<Link :route="'go-4-3-crud-basics'" :text="'database/sql 手写 CRUD'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'go-4-6-gorm-association'" :text="'GORM 关联与预加载'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'go-4-13-migration'" :text="'正式数据库迁移'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <Link :route="'go-4-4-sql-security'" :text="'← 上一节：SQL 注入防护与参数化查询'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-cyan-600! bg-transparent! border-none! inline!" />
        <Link :route="'go-4-6-gorm-association'" :text="'下一节：GORM 关联与预加载 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Link, Nav } from 'components'

const navList = [
  { id: "sec-1", name: "GORM 是什么" },
  { id: "sec-2", name: "安装与连接" },
  { id: "sec-3", name: "模型与 struct tag" },
  { id: "sec-4", name: "AutoMigrate 自动建表" },
  { id: "sec-5", name: "默认约定" },
  { id: "sec-6", name: "增删改查 CRUD" },
  { id: "sec-7", name: "查询进阶" },
  { id: "sec-8", name: "常见错误" },
  { id: "sec-9", name: "小结" },
]

const connectCode = `// 安装三个依赖（一个核心 + 一个驱动）：
//   go get gorm.io/gorm
//   go get gorm.io/driver/sqlite    // 本地开发最省事（文件即数据库）
//   go get gorm.io/driver/postgres  // 生产常用（PostgreSQL，与 backend 一致）
package main

import (
    "fmt"

    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

type User struct {
    ID   uint   ` + "`gorm:\"primaryKey\"`" + `
    Name string ` + "`gorm:\"size:255;not null\"`" + `
    Age  uint
}

func main() {
    // ① gorm.Open(驱动实例, 配置) → (*gorm.DB, error)
    db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
    if err != nil {
        panic("连接数据库失败: " + err.Error())
    }

    // PostgreSQL 用法（生产，只是 DSN 不同）：
    // dsn := "host=localhost user=postgres password=xxx dbname=monorepo port=5432 sslmode=disable"
    // db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

    // ② 自动建表（细节见 sec-4）
    if err := db.AutoMigrate(&User{}); err != nil {
        panic("自动建表失败: " + err.Error())
    }
    fmt.Println("连接成功，users 表已自动创建")
    // 输出: 连接成功，users 表已自动创建
}`

const modelCode = `// model/user.go — 结构体 + struct tag 就是「建表说明书」
package model

type User struct {
    ID       uint   ` + "`gorm:\"primaryKey\"`" + `             // 主键、自增
    Name     string ` + "`gorm:\"size:255;not null\"`" + `      // VARCHAR(255) + NOT NULL
    Email    string ` + "`gorm:\"size:128;uniqueIndex\"`" + `   // 唯一索引
    Age      uint   ` + "`gorm:\"default:0\"`" + `              // 默认值 0
    NickName string ` + "`gorm:\"column:nick_name\"`" + `       // 覆盖列名（默认会转 snake_case，这里演示强制改名）
    IsActive bool   ` + "`gorm:\"not null;default:true\"`" + `  // 布尔非空、默认 true
    // CreatedAt / UpdatedAt / DeletedAt 字段会被 GORM 自动维护
}

// 常用 tag 速查（完整见 GORM 文档）：
//   primaryKey      主键
//   size:255        长度限制（对应 VARCHAR(255)）
//   not null        非空约束
//   uniqueIndex     唯一索引
//   index           普通索引
//   default:0       默认值
//   column:xxx      自定义列名
//   autoIncrement   自增`

const migrateCode = `// migrate.go — AutoMigrate 自动建表/加列（幂等，可重复执行）
package main

import (
    "fmt"

    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

type User struct {
    gorm.Model          // 内嵌：自动带 ID + CreatedAt + UpdatedAt + DeletedAt
    Name string ` + "`gorm:\"size:64;not null\"`" + `
    Age  uint
}

type Order struct {
    gorm.Model
    Total float64 ` + "`gorm:\"not null\"`" + `
}

func main() {
    db, _ := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})

    // 一次迁移多张表
    err := db.AutoMigrate(&User{}, &Order{})
    if err != nil {
        panic(err)
    }
    fmt.Println("迁移完成：users、orders 表已就绪")
    // 输出: 迁移完成：users、orders 表已就绪
}`

const conventionsCode = `// conventions.go — 默认约定的覆盖方式
package main

import "gorm.io/gorm"

type Product struct {
    gorm.Model
    Code string ` + "`gorm:\"size:32;not null\"`" + `
    Category string ` + "`gorm:\"column:category_name\"`" + ` // 用 column: 强制列名
}

// TableName：覆盖默认复数表名。Product 默认会建 products 表，
// 这里改成单数 product（旧库兼容、或业务要求单数时常用）
func (Product) TableName() string { return "product" }

// 全局约定：想让所有表都单数，可在打开连接时配置
// db, _ := gorm.Open(sqlite.Open("test.db"), &gorm.Config{
//     NamingStrategy: schema.NamingStrategy{SingularTable: true},
// })`

const crudCode = `// crud.go — 完整增删改查
package main

import (
    "fmt"

    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

type Product struct {
    gorm.Model
    Code  string  ` + "`gorm:\"size:32;uniqueIndex;not null\"`" + `
    Price float64 ` + "`gorm:\"not null\"`" + `
}

func main() {
    db, _ := gorm.Open(sqlite.Open("shop.db"), &gorm.Config{})
    db.AutoMigrate(&Product{})

    // ① 创建：单条 + 批量
    db.Create(&Product{Code: "D42", Price: 100})
    db.Create(&[]Product{{Code: "X1", Price: 10}, {Code: "X2", Price: 20}})

    // ② 查单条：First 按主键升序取第一条
    var p Product
    db.First(&p, "code = ?", "D42")
    // 等价 SQL: SELECT * FROM products WHERE code='D42' ORDER BY id LIMIT 1
    fmt.Printf("查到: %+v\\n", p)
    // 输出: 查到: {Model:{ID:1 CreatedAt:... UpdatedAt:... DeletedAt:...} Code:D42 Price:100}

    // ③ 查多条：Where + Find
    var list []Product
    db.Where("price > ?", 15).Find(&list)
    fmt.Printf("price>15 共 %d 条\\n", len(list))
    // 输出: price>15 共 2 条

    // ④ 更新：Updates(struct) 只更新非零值字段；要更新零值请用 map
    db.Model(&p).Updates(Product{Price: 120})
    // SQL: UPDATE products SET price=120 WHERE id=1

    // ⑤ 删除：有 DeletedAt 字段 → 软删除（记录还在，只是标记删除时间）
    db.Where("code = ?", "X1").Delete(&Product{})
    // SQL: UPDATE products SET deleted_at=now WHERE code='X1'   （软删除）
    //      或 DELETE FROM products WHERE code='X1'              （无 DeletedAt 时硬删除）
}`

const queryCode = `// query.go — 查询进阶：链式条件 / 排序 / 分页
package main

import (
    "fmt"

    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

type Order struct {
    gorm.Model
    Status string  ` + "`gorm:\"size:16;index\"`" + `
    Amount float64
}

func main() {
    db, _ := gorm.Open(sqlite.Open("orders.db"), &gorm.Config{})
    db.AutoMigrate(&Order{})

    // ① 链式查询：Where/Order/Limit 只是攒条件，Find 才真正执行
    var paid []Order
    db.Where("status = ?", "paid").
        Where("amount >= ?", 100).
        Order("amount DESC").
        Limit(10).
        Find(&paid)

    // ② 常用条件写法
    var rows []Order
    db.Where("amount NOT IN ?", []float64{0, 99}).Find(&rows)  // NOT IN
    db.Where("status LIKE ?", "%paid%").Find(&rows)             // LIKE
    db.Where("amount BETWEEN ? AND ?", 10, 500).Find(&rows)     // BETWEEN
    db.Find(&rows, []uint{1, 2, 3})                             // WHERE id IN (1,2,3)

    // ③ First 查不到记录 → 返回 gorm.ErrRecordNotFound（要专门判断）
    var none Order
    err := db.First(&none, "id = ?", 99999)
    if err == gorm.ErrRecordNotFound {
        fmt.Println("记录不存在")
    }
    // 输出: 记录不存在

    // ④ Find 查不到不报错，返回空切片（与 First 的区别）
    rows = nil
    db.Find(&rows, "status = ?", "cancelled")
    fmt.Printf("空结果 len=%d\\n", len(rows))
}`
</script>
