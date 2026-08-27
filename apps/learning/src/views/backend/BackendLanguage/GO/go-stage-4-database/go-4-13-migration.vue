<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🗄️ 数据库迁移 (Migration)</h1>
          <p class="text-sm text-slate-500 mt-1">迁移是什么 · 为什么需要 · up/down 对称 · schema_migrations · golang-migrate · goose · embed 内嵌</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/backend/internal/database/migrate.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 4-13</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 迁移是什么 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          迁移是什么：把表结构也当成"代码"来管版本
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>数据库迁移（Migration）</strong>是一批<strong>按顺序编号的 SQL 文件</strong>，
          每个文件描述一次「表结构的版本变化」。工具（golang-migrate / goose）负责按顺序应用它们，
          并用一张 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">schema_migrations</code> 表记录"现在跑到第几版"。
        </p>
        <p class="text-slate-600 mb-4 leading-relaxed">
          你写的后端代码有 git 管版本、能回滚；<strong>数据库的表结构同样会变</strong>——
          加一列、改一个字段类型、新建一张表。迁移就是给数据库的这套"版本管理"。
          没有它，你只能在别人服务器上手工敲 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">ALTER TABLE</code>，环境一多就全乱。
        </p>
        <div class="mb-4"><Code language="text" :code="dirCode" title="migrations/ 目录 —— 每次结构变化一个编号" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <strong>迁移 ≈ 前端的 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">prisma migrate</code> / knex migrations</strong>——
          Prisma 每次 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">migrate dev</code> 生成的 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">migrations/</code> 目录，本质就是 Go 这套东西的 JS 版；
          <br/>也 <strong>≈ git 管理代码版本</strong>——迁移文件就像一串 commit，每个 commit 描述一次结构变化，能前进也能回退。
          前端项目里"数据库结构变化要跟着代码一起进 PR、一起 code review"，正是迁移工具提供的体验。
          </p>
        </aside>

        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong><br/>
          在 Go 后端生态里，迁移是 <strong>CI/CD 部署流程的一部分</strong>——发布新版本前先跑 <code class="bg-teal-100 px-1 py-0.5 rounded text-xs font-mono">migrate up</code> 升级表结构，
          发布失败要回滚时先 <code class="bg-teal-100 px-1 py-0.5 rounded text-xs font-mono">migrate down</code>。它和你的 Go 服务解耦：
          服务代码依赖的只是"运行时数据库长什么样"，而迁移负责把库变成那个样子。</p>
        </aside>
      </section>

      <!-- 2. 为什么需要迁移 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          为什么需要迁移 —— 三个真实场景
        </h2>
        <ol class="space-y-3 mb-4">
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div class="text-slate-600"><strong>多人协作改表</strong>：三个人同时改开发库，A 加了 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">users.avatar</code>，B 也改了 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">users</code>。
            手工改库没法合并。迁移文件走 git 合并后，<strong>大家的库能对齐到同一个版本</strong>。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div class="text-slate-600"><strong>上线与回滚</strong>：新版本带了一张 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">orders</code> 表。
            上线跑 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">up</code> 建表；发现有问题要回滚，跑 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">down</code> 删表。<strong>up/down 是对称的两个方向</strong>。</div>
          </li>
          <li class="flex gap-3">
            <span class="shrink-0 w-7 h-7 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div class="text-slate-600"><strong>多环境一致</strong>：本地、测试、预发布、生产四套库，<strong>一键从零建出相同的表结构</strong>——
            迁移文件 + <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs font-mono">up</code>，哪里都是同一套结构，再也不用手抄 SQL。</div>
          </li>
        </ol>

        <div class="mb-4"><Code language="text" :code="noMigratePain" title="❌ 没有迁移时的日常" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 没有迁移工具 ≠ 不用管理结构。</strong>
          很多团队"上线时手工跑一段 SQL"，结果就是：生产库和测试库结构对不上、没人知道哪张表加了哪列、
          回滚时不知道之前是什么样。<strong>迁移工具就是把"这次上线跑哪些 SQL"变成可版本化、可回滚、可 review 的资产。</strong></p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 迁移的最佳实践：</strong>表结构变化<strong>跟着代码一起进同一个 PR</strong>。
          谁改了 <code class="bg-emerald-100 px-1 py-0.5 rounded text-xs font-mono">menu_handler.go</code> 加了字段，就顺带提交一个迁移文件——
          code review 时同事能看到"这段代码依赖这次结构变更"，部署顺序也不会乱。</p>
        </aside>
      </section>

      <!-- 3. 文件命名与 up/down 对称 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          迁移文件命名与 up/down 对称性
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          每个迁移由<strong>一对文件</strong>组成：<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">.up.sql</code> 记录"怎么变过去"，
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">.down.sql</code> 记录"怎么变回来"。
          两者<strong>必须对称</strong>：up 建的表 down 要能删，up 加的列 down 要能去掉。
        </p>
        <div class="mb-4"><Code language="text" :code="migrateFileCode" title="migrations/000001_create_users.up.sql + .down.sql" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">命名示例</th><th class="px-4 py-2 border border-slate-200 font-semibold">含义</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">000001_create_users.up.sql</td><td class="px-4 py-2 border">第 1 个迁移，前向：建 users 表</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">000001_create_users.down.sql</td><td class="px-4 py-2 border">第 1 个迁移，回退：删 users 表</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">000002_add_users_avatar.up.sql</td><td class="px-4 py-2 border">第 2 个迁移，前向：加 avatar 列</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">000002_add_users_avatar.down.sql</td><td class="px-4 py-2 border">第 2 个迁移，回退：删 avatar 列</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          <strong>up ≈ <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">git commit</code>，down ≈ <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">git revert</code></strong>——
          或者 Prisma 里 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">migrate dev</code>（前进）和 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">migrate reset</code>（回退）。
          迁移文件后缀 <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">_up</code> / <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">_down</code> 就像 commit 和 revert 是一对儿，永远成对出现。
          </p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ down 不是"撤销"，改了会丢数据。</strong>
          <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs font-mono">DROP TABLE</code> / <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs font-mono">DROP COLUMN</code> 是<strong>物理删除</strong>，
          执行了数据就没了。生产环境回滚前务必<strong>先备份</strong>；很多团队干脆禁止在生产用 down，只用 up 前进 + 写"补偿迁移"（比如新建一张兼容表）。</p>
        </aside>
      </section>

      <!-- 4. schema_migrations -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          schema_migrations —— 数据库里的"git log"
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          迁移工具会在你的库里自动建一张 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">schema_migrations</code> 表，
          专门记录两件事：<strong>当前跑到第几版</strong>（version）和<strong>有没有跑挂了</strong>（dirty）。
          每次 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">up</code> 应用成功就 +1，就像 git 指针往前挪。
        </p>
        <div class="mb-4"><Code language="text" :code="schemaTableCode" title="schema_migrations —— 迁移工具的账本" /></div>

        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>启动时读取 <code class="bg-slate-100 px-1 rounded font-mono text-xs">schema_migrations</code>，知道当前版本是 3</li>
          <li>扫 migrations/ 目录，发现编号 4、5 还没应用</li>
          <li>按顺序执行 4、5 的 <code class="bg-slate-100 px-1 rounded font-mono text-xs">up.sql</code>，每成功一个把 version 更新为 4、5</li>
          <li>全部完成，版本 = 5，与代码中的迁移文件一致</li>
        </ol>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ dirty = 1 是最危险的信号。</strong>
          dirty 表示上一次迁移<strong>执行到一半失败了</strong>（比如第 4 个 up.sql 里建表成功、后面的语句报错）。
          此时<strong>不能直接再 up</strong>——工具会拒绝，怕跳过或重跑造成脏数据。
          正确做法：看日志找出失败语句，<strong>手工把数据库修到"4 已完成"的状态</strong>，再 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs font-mono">force 4</code> 把账本对齐，然后继续 up。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 别手改这张表。</strong>它像 git 的 HEAD 一样是<strong>工具的私有状态</strong>。
          手工 INSERT/DELETE schema_migrations 会让工具误判版本，除非你清楚自己在做什么（比如故障恢复时的 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs font-mono">migrate force</code>）。</p>
        </aside>
      </section>

      <!-- 5. golang-migrate 命令行 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          golang-migrate 命令行用法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">golang-migrate/migrate</code> 是 Go 生态最流行的迁移工具之一。
          <strong>核心命令就三个</strong>：<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">create</code>（新建迁移）、<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">up</code>（前进）、<code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">down</code>（回退）。
        </p>
        <div class="mb-4"><Code language="bash" :code="migrateCLICode" title="📟 golang-migrate 常用命令" /></div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 安装要带 driver tag：</strong><code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs font-mono">go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest</code>。
          golang-migrate 用 <strong>build tag</strong> 选择数据库驱动，装 PostgreSQL 支持必须加 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs font-mono">-tags postgres</code>，否则会报 driver 未注册。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">migrate create -seq xxx</code> ≈
          <code class="bg-purple-100 px-1 py-0.5 rounded text-xs font-mono">npx prisma migrate dev --name xxx</code>——
          都是"给我生成一个新的迁移文件"，你只需要往里面填 SQL / schema 变更。</p>
        </aside>
      </section>

      <!-- 6. Go 里跑迁移：embed 内嵌 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          Go 里跑迁移：embed 内嵌迁移 SQL
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          生产上最稳妥的姿势是：<strong>迁移 SQL 用 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">//go:embed</code> 编译进二进制</strong>，
          程序启动时自动跑到最新版本。这样部署只发一个二进制，迁移跟着版本走，永远不会有"忘了拷 migrations/ 目录"的问题。
          golang-migrate 提供了 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">source/iofs</code> 让 embed.FS 直接当迁移源。
        </p>
        <div class="mb-4"><Code language="go" :code="embedCode" title="internal/database/migrate.go — embed 内嵌 + 启动时迁移" /></div>

        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">//go:embed migrations/*.sql</code> 编译期把 SQL 打进二进制</li>
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">iofs.New(fs, "migrations")</code> 把 embed.FS 包成迁移源</li>
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">migrate.NewWithSourceInstance</code> 指定"源 + 目标库"</li>
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">m.Up()</code> 跑到最新；<code class="bg-slate-100 px-1 rounded font-mono text-xs">ErrNoChange</code> 表示已是最新，不算错误</li>
        </ol>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 为什么 embed 是生产标配：</strong>你的 Go 服务用 <code class="bg-emerald-100 px-1 py-0.5 rounded text-xs font-mono">embed</code> 把模板、静态资源、迁移 SQL 全打包进一个二进制——
          镜像更小、部署一个文件就齐、版本天然锁定。这条链路在 <code class="bg-emerald-100 px-1 py-0.5 rounded text-xs font-mono">go-3-15-template-embed</code> 讲过，迁移只是又一个例子。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>把 <code class="bg-teal-100 px-1 py-0.5 rounded text-xs font-mono">Migrate()</code> 放在 main() 里、HTTP 服务启动之前——
          保证"库结构先就位，再对外提供服务"。这正是你在 <code class="bg-teal-100 px-1 py-0.5 rounded text-xs font-mono">apps/go/backend</code> 里给 <code class="bg-teal-100 px-1 py-0.5 rounded text-xs font-mono">internal/database</code> 包的用法。</p>
        </aside>
      </section>

      <!-- 7. goose 对比 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          goose —— 另一个主流迁移工具
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">github.com/pressly/goose</code> 是 golang-migrate 的常见替代。
          用法几乎一样，但它<strong>不要求 up/down 配对</strong>——可以只写一个 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">.sql</code>（默认向前），
          也支持在迁移里嵌 Go 函数（做数据迁移）。goose 用自己的一张 <code class="bg-slate-100 text-cyan-700 px-1 py-0.5 rounded text-xs font-mono">goose_db_version</code> 表记账。
        </p>
        <div class="mb-4"><Code language="text" :code="gooseCode" title="goose 命令行 + Go 库调用" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">对比</th><th class="px-4 py-2 border border-slate-200 font-semibold">golang-migrate</th><th class="px-4 py-2 border border-slate-200 font-semibold">goose</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">记账表</td><td class="px-4 py-2 border font-mono text-xs">schema_migrations</td><td class="px-4 py-2 border font-mono text-xs">goose_db_version</td></tr>
              <tr><td class="px-4 py-2 border">up/down</td><td class="px-4 py-2 border">必须成对</td><td class="px-4 py-2 border">可只写 up；down 可选</td></tr>
              <tr><td class="px-4 py-2 border">Go 内嵌迁移</td><td class="px-4 py-2 border">不支持（只有 SQL）</td><td class="px-4 py-2 border">支持（Go 函数迁移）</td></tr>
              <tr><td class="px-4 py-2 border">embed 支持</td><td class="px-4 py-2 border">✅ source/iofs</td><td class="px-4 py-2 border">✅ goose.SetBaseFS</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 选型建议：</strong>纯 SQL 表结构变更、需要干净 embed 的，用 <strong>golang-migrate</strong>（文档和生态更成熟）；
          要<strong>用 Go 代码做数据迁移</strong>（比如把存量数据翻新、批量改格式），goose 的 Go 迁移更顺手。两个都值得会，接口心智模型一致。</p>
        </aside>
      </section>

      <!-- 8. 常见错误 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          常见错误与最佳实践
        </h2>
        <div class="mb-4"><Code language="text" :code="errCode" title="❌ 迁移高频翻车现场" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>改已应用的迁移文件</strong>：编号 1 已经跑过，你又改了它的 up.sql——本地库会"假装没看到"，而别人/生产永远对不上。迁移文件<strong>一旦合并进主干就视为不可变</strong>，要改就新建一个编号更大的迁移。</li>
          <li><strong>down.sql 写不干净</strong>：up 建了表 + 索引 + 约束，down 只 drop 表——回滚时残留一堆东西。down 要和 up 完全对称。</li>
          <li><strong>dirty 后直接 up</strong>：失败到一半不处理就继续 up，工具直接拒绝或产生脏状态。先手工修复 + <code class="bg-slate-100 px-1 rounded font-mono text-xs">force</code> 对齐版本。</li>
          <li><strong>迁移里写业务逻辑</strong>：比如根据当前时间戳改数据——不同环境跑出来结果不一样，迁移必须<strong>幂等可复现</strong>。</li>
        </ol>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 上线顺序很关键：</strong>先跑 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs font-mono">migrate up</code> 升级表结构，<strong>再</strong>部署新版本代码。
          反过来代码先用新字段、库还是旧结构，请求一进来就炸。老版本代码在读新表结构时也要兼容（这正是"先加可空列，再填数据，再收紧约束"分步迁移的原因）。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 实践清单：</strong>① 迁移文件随代码一起进 PR、一起 review；② up/down 永远成对、完全对称；③ 已合并的迁移不可修改，新变化开新编号；④ 启动时自动 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs font-mono">Migrate()</code> + embed；⑤ 生产回滚前先备份。</p>
        </aside>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>迁移 = 表结构的版本管理</strong>，一个编号对应一次结构变化，up/down 对称可进可退</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>解决三大痛点：<strong>多人协作改表、上线回滚、多环境一致</strong></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">schema_migrations</code> 是工具的账本：version 记版本，dirty 记"跑挂了没"</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>golang-migrate：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">create / up / down</code>，装 Postgres 驱动要 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">-tags postgres</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>生产用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">//go:embed</code> + <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">source/iofs</code>，启动时自动跑到最新版本</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>goose 是替代方案：不强制 down、支持 Go 函数迁移、用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">goose_db_version</code> 记账</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>铁律：<strong>已合并的迁移不可改</strong>，dirty 先修复再继续，先 up 再发布新代码</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <Link :route="'go-4-12-mongodb'" :text="'← 上一节：MongoDB'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-cyan-600! hover:bg-transparent! bg-transparent! border-none! inline!" />
        <Link :route="'go-4-14-pprof-slow-query'" :text="'下一节：慢查询与性能 →'" animation="none" size="small" class="p-0! text-sm! font-medium! text-cyan-600! hover:text-cyan-700! hover:bg-transparent! bg-transparent! border-none! inline!" />
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Link, Nav } from 'components'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "迁移是什么" },
  { id: "sec-2", name: "为什么需要迁移" },
  { id: "sec-3", name: "文件命名与 up/down" },
  { id: "sec-4", name: "schema_migrations" },
  { id: "sec-5", name: "golang-migrate 用法" },
  { id: "sec-6", name: "Go 里 embed 内嵌" },
  { id: "sec-7", name: "goose 对比" },
  { id: "sec-8", name: "常见错误" },
  { id: "sec-9", name: "小结" },
]

const dirCode = `migrations/
├── 000001_create_users.up.sql        ← 第 1 版：建 users 表
├── 000001_create_users.down.sql      ← 第 1 版回退：删 users 表
├── 000002_add_users_avatar.up.sql    ← 第 2 版：加 avatar 列
├── 000002_add_users_avatar.down.sql  ← 第 2 版回退：删 avatar 列
└── 000003_create_orders.up.sql       ← 第 3 版：建 orders 表
    └── 000003_create_orders.down.sql

数字序号 = 版本号 = 应用顺序；up 前进，down 回退，成对出现`

const noMigratePain = `# ❌ 没有迁移时的日常（别学）
# 1. 小王在自己库里手工执行：
#    ALTER TABLE users ADD COLUMN avatar TEXT;

# 2. 小李接手，不知道有这列，代码里读不到字段，一脸懵
# 3. 上线时运维手工跑一段"我记得的 SQL"，结果少跑一个约束
# 4. 想回滚：没有人知道刚才到底改了什么

# ✅ 用迁移之后的日常：
# 1. 小王提交 000002_add_users_avatar.up.sql / .down.sql 进 PR
# 2. 任何人 git pull 后跑 migrate up，库结构和代码一起对齐
# 3. 出问题 migrate down 一步，干净回退`

const migrateFileCode = `-- migrations/000001_create_users.up.sql（前向：建表）
CREATE TABLE users (
    id          BIGSERIAL PRIMARY KEY,
    email       TEXT NOT NULL UNIQUE,
    name        TEXT NOT NULL,
    password    TEXT NOT NULL,
    role        TEXT NOT NULL DEFAULT 'user',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_email ON users(email);

-- migrations/000001_create_users.down.sql（回退：删表）
-- ⚠️ 必须和 up 完全对称：up 建了什么，down 就要清掉什么
DROP TABLE IF EXISTS users;`

const schemaTableCode = `-- 迁移工具自动建的账本表（golang-migrate）
SELECT version, dirty FROM schema_migrations;

-- version | dirty
--    3    |   f        ← 当前到第 3 版，一切正常 (dirty = false)

-- dirty = t 表示第 3 版跑挂了（跑了一半），不能直接 up，要修完再 force
-- version | dirty
--    3    |   t        ← ⚠️ 危险状态！

-- goose 用的是另一张表，作用一样：
-- SELECT version_id, is_applied FROM goose_db_version;`

const migrateCLICode = `# 安装 CLI（带 Postgres 驱动 tag）
go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest

# 建迁移：自动生成 000004_xxx.up.sql 和 000004_xxx.down.sql 两个文件
migrate create -ext sql -dir migrations -seq add_orders_status

# 连库字符串写长，先存成变量
export DATABASE_URL="postgres://user:pass@localhost:5432/mydb?sslmode=disable"

# 应用全部未执行的迁移（跑到最新）
migrate -path migrations -database "$DATABASE_URL" up

# 回退一步（执行 000004 的 down.sql）
migrate -path migrations -database "$DATABASE_URL" down 1

# 直接看当前版本
migrate -path migrations -database "$DATABASE_URL" version

# 故障恢复：把账本强制对齐到某个版本（跳过有问题的那个）
migrate -path migrations -database "$DATABASE_URL" force 4`

const embedCode = `// internal/database/migrate.go — embed 内嵌 + 启动时自动迁移
package database

import (
    "embed"
    "log"

    "github.com/golang-migrate/migrate/v4"
    "github.com/golang-migrate/migrate/v4/source/iofs"
    _ "github.com/golang-migrate/migrate/v4/database/postgres" // 注册 Postgres 驱动
)

//go:embed migrations/*.sql
var migrationsFS embed.FS // 编译期把全部迁移 SQL 打进二进制

// Migrate 把内嵌迁移应用到数据库，跑到最新版本
func Migrate(databaseURL string) error {
    d, err := iofs.New(migrationsFS, "migrations") // embed.FS → 迁移源
    if err != nil {
        return err
    }

    m, err := migrate.NewWithSourceInstance("iofs", d, databaseURL)
    if err != nil {
        return err
    }

    // 跑到最新；ErrNoChange = 已经是最新，不算错误
    if err := m.Up(); err != nil && err != migrate.ErrNoChange {
        return err
    }
    log.Println("数据库迁移完成，当前最新版本")
    return nil
}

// cmd/server/main.go 里，HTTP 服务启动前调用：
//   if err := database.Migrate(cfg.DatabaseURL); err != nil {
//       log.Fatal("迁移失败: ", err)
//   }
//   log.Fatal(http.ListenAndServe(":8080", router))`

const gooseCode = `# goose 命令行
# 安装
go install github.com/pressly/goose/v3/cmd/goose@latest

# 建迁移（只生成一个 .sql，默认向前）
goose -dir migrations create create_users sql

# 前进 / 回退
goose -dir migrations postgres "postgres://user:pass@localhost:5432/mydb?sslmode=disable" up
goose -dir migrations postgres "postgres://user:pass@localhost:5432/mydb?sslmode=disable" down

# 用 Go 库跑（支持 embed：goose.SetBaseFS）
package main

import (
    "database/sql"
    "log"

    "github.com/pressly/goose/v3"
    _ "github.com/jackc/pgx/v5/stdlib"
)

func main() {
    db, err := sql.Open("pgx", "postgres://user:pass@localhost:5432/mydb?sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    if err := goose.Up(db, "migrations"); err != nil {
        log.Fatal(err)
    }
    log.Println("goose 迁移完成")
}`

const errCode = `-- ❌ 错误 1：改了已应用的迁移文件
-- 000001_create_users.up.sql 已经在所有库跑过，你又悄悄加了一列
-- → 本地库不重跑（版本已经 1），生产永远对不上
-- ✅ 改法：新建 000004_xxx.up.sql 加这一列

-- ❌ 错误 2：down 和 up 不对称
-- up 建了表 + 索引 + 默认值，down 只 DROP TABLE
-- → 回滚后残留索引和约束
-- ✅ down 必须清掉 up 加的所有东西

-- ❌ 错误 3：dirty 后直接 up
-- 第 3 版建表成功、加索引失败 → dirty=1
-- 直接再 up：工具拒绝，或产生半迁移状态
-- ✅ 手工修复 + migrate force 3，再继续 up

-- ❌ 错误 4：迁移里写"当前时间/随机数"这类不稳定逻辑
-- → 不同环境跑出不同结果，无法复现
-- ✅ 迁移必须幂等：同一份 SQL，任何环境跑到同一结果`
</script>
