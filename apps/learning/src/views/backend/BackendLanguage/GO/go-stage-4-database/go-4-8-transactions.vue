<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔒 事务：ACID / Begin-Commit-Rollback / Savepoint</h1>
          <p class="text-sm text-slate-500 mt-1">ACID · 为什么需要 · db.Begin() · defer tx.Rollback() · tx vs db · 嵌套事务与 Savepoint</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/backend/internal/database/tx.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 4-8</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 事务与 ACID -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          事务是什么：把多条 SQL 绑成一个「原子单元」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          事务（Transaction）把<strong>一组 SQL 语句</strong>打包成一个不可分割的工作单元：
          <strong>要么全部成功提交（Commit），要么全部回滚（Rollback）</strong>，不存在「做了一半」的中间状态。
          数据库靠 <strong>ACID</strong> 四条性质保证这一点：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">性质</th><th class="px-4 py-2 border border-slate-200 font-semibold">含义</th><th class="px-4 py-2 border border-slate-200 font-semibold">不满足的后果</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border"><strong>Atomicity 原子性</strong></td><td class="px-4 py-2 border">全做或全不做</td><td class="px-4 py-2 border">钱扣了但没入账</td></tr>
              <tr><td class="px-4 py-2 border"><strong>Consistency 一致性</strong></td><td class="px-4 py-2 border">事务前后数据都合法（余额不为负、总数不变）</td><td class="px-4 py-2 border">账目对不上</td></tr>
              <tr><td class="px-4 py-2 border"><strong>Isolation 隔离性</strong></td><td class="px-4 py-2 border">事务间互不干扰（可配隔离级别）</td><td class="px-4 py-2 border">并发转账读到脏数据</td></tr>
              <tr><td class="px-4 py-2 border"><strong>Durability 持久性</strong></td><td class="px-4 py-2 border">提交后即使宕机也不丢</td><td class="px-4 py-2 border">提交了钱却丢了</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>事务 ≈ <strong>git 的 commit 原子性</strong>——你的一批改动要么全部进历史、要么一个都不进，绝不可能提交一半导致仓库处于坏状态。也像前端「保存表单」：校验全过才提交，任何一个字段非法就<strong>整份放弃</strong>，而不是把半份脏数据发给后端。</p>
        </aside>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>去 ATM 取款 = 一次事务：扣余额 + 出钞 + 记账<strong>三件事必须一起成功</strong>。如果钱出了但余额没扣（中途断电），银行绝对不允许——这就是原子性在真实世界的模样。</p>
        </aside>
      </section>

      <!-- 2. 为什么需要事务 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          为什么需要：转账「扣款 + 入账」必须原子
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          看一个最经典的例子——<strong>用户 A 转 100 元给用户 B</strong>，本质是两条 UPDATE：
          ① 扣 A 的余额，② 给 B 加余额。这<strong>两条必须同时成功</strong>。没有事务时会怎样？
        </p>
        <div class="mb-4"><Code language="sql" :code="noTxSql" title="no_tx.sql — 没有事务的两条 SQL" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">场景</th><th class="px-4 py-2 border border-slate-200 font-semibold">发生什么</th><th class="px-4 py-2 border border-slate-200 font-semibold">结果</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">② 执行前进程崩溃</td><td class="px-4 py-2 border">① 已提交生效</td><td class="px-4 py-2 border">A 少了 100，B 一分没多 → <strong>钱凭空消失</strong></td></tr>
              <tr><td class="px-4 py-2 border">② SQL 出错（B 不存在）</td><td class="px-4 py-2 border">① 已提交，② 报错</td><td class="px-4 py-2 border">A 被扣了钱，转账失败 → 同上</td></tr>
              <tr><td class="px-4 py-2 border">并发转账</td><td class="px-4 py-2 border">两个事务交错读写</td><td class="px-4 py-2 border">读到中间值，A 的余额越减越错</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          事务的解法：把①和②放进<strong>同一个事务</strong>——②失败就整体回滚，① 的扣款也撤销，数据库回到「没转」的初始状态。
          <strong>一致性</strong>靠业务约束（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">balance &gt;= 0</code>），<strong>原子性</strong>靠事务。
        </p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>多步操作必须有原子性——就像前端「批量上传文件」，要么全部成功再提示完成，要么中途失败就<strong>撤销已传的、整体报错</strong>，绝不能提示「成功」却只传了一半。事务就是数据库端的「批量上传 + 失败整体回滚」。</p>
        </aside>
      </section>

      <!-- 3. Begin / Commit / Rollback -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          db.Begin() + tx.Commit() / tx.Rollback() 三件套
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">database/sql</code> 里事务就三个动作：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">db.Begin()</code> 开事务拿到 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">tx</code>，
          全部成功 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">tx.Commit()</code> 提交，出任何错 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">tx.Rollback()</code> 回滚。
          <strong>核心模式：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">defer tx.Rollback()</code></strong>——一旦 defer，无论函数从哪个 return 出去，未提交的事务都会被回滚，绝不泄漏。
        </p>
        <div class="mb-4"><Code language="go" :code="beginCommitCode" title="begin_commit.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么「成功 Commit 后再 defer Rollback」是无害的？</strong>Commit 之后事务已经结束，此时再调 Rollback 只返回一个 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">sql.ErrTxDone</code>，<strong>对数据毫无影响</strong>。defer 的返回值被丢弃也没关系——我们只需要它在「出错的 return」路径上生效。这个模式保证：<strong>不写一行多余的「出错才回滚」的分支代码</strong>。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">defer tx.Rollback()</code> ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">try/finally</code> 里的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">finally</code>——无论 try 里是成功还是 throw，finally 都会兜底（关弹窗、重置 loading、清理副作用）。defer 就是 Go 的 finally：<strong>函数退出必执行，替你兜底收尾</strong>。Vue 里「请求结束 finally 里置 loading=false」正是同一思想。</p>
        </aside>
      </section>

      <!-- 4. 完整转账事务 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          完整转账事务（已塞进 backend：apps/go/backend/internal/database/tx.go）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          把上面的模式拼成生产级函数：<strong>扣款用带条件的 UPDATE</strong>（<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">AND balance &gt;= $1</code>）——0 行受影响说明余额不足，立刻 return 触发 defer 回滚。这是事务 + 业务约束（一致性）的合体写法。
        </p>
        <div class="mb-4"><Code language="go" :code="transferCode" title="tx.go — 完整转账事务" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">db.Begin()</code> 开启事务，拿到 <code class="bg-slate-100 px-1 rounded font-mono text-xs">tx</code></li>
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">defer tx.Rollback()</code> 兜底：任何错误 return 都自动回滚；成功 Commit 后它变无操作</li>
          <li>扣款 + 校验 RowsAffected（余额不足 → 0 行 → 回滚）</li>
          <li>入账</li>
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">tx.Commit()</code> 全部成功才提交——第 3 步若失败，这里根本不会执行到，defer 已回滚</li>
        </ol>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>① 余额判断用 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">WHERE balance &gt;= $1</code> 在<strong>数据库里做</strong>，不要先 SELECT 再在 Go 里判断——避免并发下「都读到够余额」的竞态；② 每个 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">Exec</code> 的错误都用 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">%w</code> 包一层，定位是第几步挂了；③ Commit 本身的错误也要处理（网络断连时提交可能失败）。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>事务在 Go 后端的定位 ≈ <strong>HTTP 中间件的 before/after</strong>：Begin 是「进入中间件」、Commit/Rollback 是「中间件收尾」。一个请求里「查缓存 → 改数据 → 发事件」这种多步操作，如果后两步失败会让第一步的白做，就该包进事务。和 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">defer</code> 组合，Go 能把「收尾兜底」写得比 try/catch 语言更干净。</p>
        </aside>
      </section>

      <!-- 5. tx vs db -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          sql.Tx vs sql.DB：事务内所有操作必须用 tx，不是 db
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">*sql.DB</code> 是<strong>连接池的入口</strong>，每条语句可能走不同连接、自动提交；
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">*sql.Tx</code> 把<strong>一个连接独占</strong>到事务结束。所以事务里若混用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">db</code>，那条语句<strong>根本不在事务里</strong>——原子性当场被打破。
        </p>
        <div class="mb-4"><Code language="go" :code="txVsDbCode" title="tx_vs_db.go — 错误与正确写法" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold">*sql.DB</th><th class="px-4 py-2 border border-slate-200 font-semibold">*sql.Tx</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">本质</td><td class="px-4 py-2 border">连接池，多连接并发</td><td class="px-4 py-2 border">独占一个连接到结束</td></tr>
              <tr><td class="px-4 py-2 border">提交方式</td><td class="px-4 py-2 border">每条语句隐式自动提交</td><td class="px-4 py-2 border">显式 Commit / Rollback</td></tr>
              <tr><td class="px-4 py-2 border">错误回滚</td><td class="px-4 py-2 border">不适用</td><td class="px-4 py-2 border">整体回滚，不留半截</td></tr>
              <tr><td class="px-4 py-2 border">事务内能否用</td><td class="px-4 py-2 border">❌ 会脱离事务</td><td class="px-4 py-2 border">✅ 唯一正确的选择</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 最隐蔽的坑：</strong>事务里一不留神写了 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">db.Exec(...)</code>（而不是 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">tx.Exec</code>），<strong>不报任何错</strong>，但那条语句已自动提交、脱离事务。排查时盯着每个 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">db.</code> 前缀看是不是该用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">tx.</code>。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 事务不能复用：</strong>Commit 或 Rollback 之后，这个 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">tx</code> 就废了，再调用会返回 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">sql: transaction has already been committed or rolled back</code>。需要再开一个就 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">db.Begin()</code> 新开，别复用旧 tx。</p>
        </aside>
      </section>

      <!-- 6. 嵌套事务与 Savepoint -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          嵌套事务？没有。用 Savepoint 模拟「局部回滚」
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">database/sql</code> 的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">*sql.Tx</code> <strong>没有嵌套事务</strong>——它连 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Begin</code> 方法都没有（事务里开不了子事务）。
          但业务里常有「主体必须成功、附属步骤允许失败」的场景，Postgres / MySQL 用 <strong>SAVEPOINT</strong> 实现：
          在事务中间打个「存档点」，某步失败只 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ROLLBACK TO SAVEPOINT</code>，不影响已做的其他修改。
        </p>
        <div class="mb-4"><Code language="go" :code="savepointCode" title="savepoint.go — 模拟嵌套事务" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 BeginTx 与隔离级别：</strong>需要控制隔离级别（脏读/不可重复读/幻读）时用 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">db.BeginTx(ctx, &sql.TxOptions{Isolation: sql.LevelReadCommitted, ReadOnly: false})</code>。默认 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">LevelDefault</code> 交给数据库决定（Postgres 默认 ReadCommitted）。大多数业务用默认就够，别一上来就 Serializable。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Savepoint ≈ <strong>前端的多步骤表单「分段保存」</strong>——第 1 步基础信息提交成功、第 2 步详情填错，只要求重填第 2 步（局部回滚到存档点），而不是把整个表单清空重来。整段事务的 Rollback 是「全清」，Savepoint 是「回滚到最近存档」。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 别滥用 Savepoint：</strong>它只<strong>模拟</strong>嵌套，不是真正的独立事务——存档点之前的错误依然会回滚整段。团队里若出现「三层 savepoint 套娃」，多半是该拆成独立事务 + 补偿逻辑，而不是继续叠存档点。</p>
        </aside>
      </section>

      <!-- 7. 常见错误 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          常见错误与反模式
        </h2>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>事务里用 <code class="bg-slate-100 px-1 rounded font-mono text-xs">db</code> 而不是 <code class="bg-slate-100 px-1 rounded font-mono text-xs">tx</code></strong> → 语句自动提交、脱离事务（见第 5 节）</li>
          <li><strong>忘了 defer Rollback</strong> → 出错时事务悬挂，<strong>占着连接、锁着表</strong>，久了连接池被耗尽，全站变慢</li>
          <li><strong>defer tx.Rollback() 写在 Begin 之前</strong> → tx 还是 nil，defer 时 panic。必须先 Begin 成功再 defer</li>
          <li><strong>忽略 Commit 的错误</strong> → 提交瞬间网络断了，你以为成功其实没落库</li>
          <li><strong>回滚后复用同一个 tx</strong> → <code class="bg-slate-100 px-1 rounded font-mono text-xs">transaction has already been committed or rolled back</code></li>
          <li><strong>SELECT 后先在 Go 里判断余额再 UPDATE</strong> → 并发下两个请求都「读到够余额」，双双扣款变负数；判断要下沉到 SQL 的 WHERE 条件里</li>
        </ol>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 事务悬挂的症状不好认：</strong>某段时间后接口集体超时、数据库连接数打满——先怀疑「有事务开着没 Commit/Rollback」。写代码时坚持「Begin 成功立刻 defer Rollback」，是根治这个问题的习惯。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 什么时候不要用事务：</strong>单条 INSERT/UPDATE 本身就有原子性，没必要包事务；只读查询更不需要。事务有开销（锁 + 日志），<strong>只在「多步写操作必须同生共死」时开</strong>，别把整个请求的所有 SQL 都塞进一个长事务。</p>
        </aside>
      </section>

      <!-- 8. 小结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>事务 = ACID</strong>：原子性全做或全不做、一致性前后合法、隔离性互不干扰、持久性宕机不丢</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>转账</strong>是最经典场景：扣款 + 入账必须同生共死，否则钱会凭空消失</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三件套</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">db.Begin()</code> → 操作 → <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">tx.Commit()</code> / <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">tx.Rollback()</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>defer tx.Rollback()</strong> 是黄金模式：出错自动回滚，成功 Commit 后再调无害</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>事务内必须用 tx</strong>，用 db 的语句会脱离事务、悄悄自动提交</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>没有嵌套事务</strong>，用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">SAVEPOINT</code> + <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">ROLLBACK TO</code> 模拟局部回滚</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>业务判断下沉到 SQL</strong>（<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">WHERE balance &gt;= $1</code>），别先查后判，避免并发竞态</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <Link route="go-4-7-sqlx-native" text="← 上一节：原生 SQL 与 sqlx" animation="none" size="small"
          class="p-0! text-sm! font-normal! text-slate-500! hover:text-cyan-600! bg-transparent! border-none! inline! text-left!" />
        <Link route="go-4-9-redis-basics" text="下一节：Redis 基础 →" animation="none" size="small"
          class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline! text-right!" />
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Link, Nav } from 'components'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "事务与 ACID" },
  { id: "sec-2", name: "为什么需要事务" },
  { id: "sec-3", name: "Begin / Commit / Rollback" },
  { id: "sec-4", name: "完整转账事务" },
  { id: "sec-5", name: "tx vs db" },
  { id: "sec-6", name: "嵌套事务与 Savepoint" },
  { id: "sec-7", name: "常见错误" },
  { id: "sec-8", name: "小结" },
]

const noTxSql = `-- 没有事务：两步独立提交
UPDATE accounts SET balance = balance - 100 WHERE id = 1;  -- ① 扣款
UPDATE accounts SET balance = balance + 100 WHERE id = 2;  -- ② 入账

-- 若 ② 执行前服务器宕机 / ② 报错（B 不存在）
-- → ① 已经生效：用户 1 少了 100，用户 2 一分没多 → 钱凭空消失
-- 事务的解法：①② 包进同一事务，② 失败整体回滚，数据库回到没转的状态`

const beginCommitCode = `tx, err := db.Begin() // ① 开启事务
if err != nil {
    return err
}
defer tx.Rollback() // ② 兜底：任何出错 return 都会自动回滚；成功 Commit 后再调它只是无害空转

// ③ 事务内所有语句用 tx，不要用 db
if _, err := tx.Exec(\`UPDATE accounts SET balance = balance - 100 WHERE id = $1\`, 1); err != nil {
    return err // ← 走到这里，defer 自动 Rollback
}
if _, err := tx.Exec(\`UPDATE accounts SET balance = balance + 100 WHERE id = $1\`, 2); err != nil {
    return err // ← 同上，扣款一起撤销
}

// ④ 全部成功才提交
if err := tx.Commit(); err != nil {
    return err // Commit 失败也要处理
}
return nil`

const transferCode = `// 完整转账事务 — 已塞进 apps/go/backend/internal/database/tx.go
func TransferMoney(db *sql.DB, fromID, toID int64, amount float64) error {
    // 1. 开启事务
    tx, err := db.Begin()
    if err != nil {
        return fmt.Errorf("begin: %w", err)
    }
    // 2. 兜底回滚：成功 Commit 后这条 Rollback 是无害的（返回 sql.ErrTxDone）
    defer tx.Rollback()

    // 3. 扣款：条件 WHERE balance >= $1 在数据库里校验余额
    res, err := tx.Exec(
        \`UPDATE accounts SET balance = balance - $1
         WHERE id = $2 AND balance >= $1\`,
        amount, fromID)
    if err != nil {
        return fmt.Errorf("deduct: %w", err) // defer 回滚
    }
    if n, _ := res.RowsAffected(); n == 0 {
        return errors.New("余额不足或账户不存在") // 0 行 → 余额不够 → defer 回滚
    }

    // 4. 入账
    if _, err := tx.Exec(
        \`UPDATE accounts SET balance = balance + $1 WHERE id = $2\`,
        amount, toID); err != nil {
        return fmt.Errorf("credit: %w", err) // defer 回滚
    }

    // 5. 全部成功，提交
    if err := tx.Commit(); err != nil {
        return fmt.Errorf("commit: %w", err)
    }
    return nil
}

// 调用：转账 = 原子操作，要么两步都成功，要么一步都不发生
err := TransferMoney(db, 1, 2, 100)
if err != nil {
    log.Printf("转账失败，已回滚: %v", err)
}
// 输出: 转账失败，已回滚: 余额不足或账户不存在`

const txVsDbCode = `// ❌ 错误：事务里混用了 db —— 扣款那条根本没进事务
tx, _ := db.Begin()
defer tx.Rollback()
db.Exec(\`UPDATE accounts SET balance = balance - 100 WHERE id = $1\`, 1) // 自动提交！脱离事务
tx.Exec(\`UPDATE accounts SET balance = balance + 100 WHERE id = $1\`, 2)
tx.Commit()
// ②失败时 ① 已经生效 —— 钱照样消失，事务白开了

// ✅ 正确：事务内所有语句都用 tx
tx, _ := db.Begin()
defer tx.Rollback()
tx.Exec(\`UPDATE accounts SET balance = balance - 100 WHERE id = $1\`, 1)
tx.Exec(\`UPDATE accounts SET balance = balance + 100 WHERE id = $1\`, 2)
tx.Commit() // 任一 Exec 失败 → defer 回滚，两步一起撤销`

const savepointCode = `tx, err := db.Begin()
if err != nil {
    return err
}
defer tx.Rollback()

// 主体业务：必须成功
tx.Exec(\`UPDATE users SET level = level + 1 WHERE id = $1\`, uid)

// 附属业务：允许失败 —— 打存档点
tx.Exec(\`SAVEPOINT sp_reward\`) // ① 存档
if _, err := tx.Exec(\`UPDATE users SET rewards = rewards + $1 WHERE id = $2\`, 10, uid); err != nil {
    tx.Exec(\`ROLLBACK TO SAVEPOINT sp_reward\`) // ② 只撤销「发奖」这一步
    log.Printf("发奖失败，跳过: %v", err)
}

tx.Commit() // 升级保留，奖励丢弃 —— 这就是局部回滚`
</script>
