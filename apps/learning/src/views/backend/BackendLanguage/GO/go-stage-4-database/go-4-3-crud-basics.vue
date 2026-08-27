<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🗄️ CRUD 基础：增删改查全流程</h1>
          <p class="text-sm text-slate-500 mt-1">建表 CREATE TABLE · INSERT / SELECT / UPDATE / DELETE · 占位符 ? 四种写法 · RowsAffected · LastInsertId</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/backend/internal/repository/menu_repo.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 4-3</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. CRUD 全景 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          CRUD 全景：建表 + 四个动词
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          CRUD = <strong>C</strong>reate（增）、<strong>R</strong>ead（查）、<strong>U</strong>pdate（改）、<strong>D</strong>elete（删）——<strong>任何业务系统的基础</strong>。
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">database/sql</code> 把 SQL 分为两类 API：
          <strong>查询用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Query*</code>（有结果集），增删改用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Exec</code>（没结果集，返回受影响行数）</strong>。
          记住这张对照表，本页所有代码都围绕它展开：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">操作</th><th class="px-4 py-2 border border-slate-200 font-semibold">SQL</th><th class="px-4 py-2 border border-slate-200 font-semibold">database/sql API</th><th class="px-4 py-2 border border-slate-200 font-semibold">menu_repo.go 对应</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">Create</td><td class="px-4 py-2 border font-mono text-xs">INSERT</td><td class="px-4 py-2 border font-mono text-xs">Exec + LastInsertId</td><td class="px-4 py-2 border font-mono text-xs">Create</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Read 单行</td><td class="px-4 py-2 border font-mono text-xs">SELECT ... WHERE id=?</td><td class="px-4 py-2 border font-mono text-xs">QueryRow + Scan</td><td class="px-4 py-2 border font-mono text-xs">Get</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Read 列表</td><td class="px-4 py-2 border font-mono text-xs">SELECT ... ORDER BY</td><td class="px-4 py-2 border font-mono text-xs">Query + rows.Next</td><td class="px-4 py-2 border font-mono text-xs">List</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Update</td><td class="px-4 py-2 border font-mono text-xs">UPDATE ... SET</td><td class="px-4 py-2 border font-mono text-xs">Exec + RowsAffected</td><td class="px-4 py-2 border font-mono text-xs">Update</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Delete</td><td class="px-4 py-2 border font-mono text-xs">DELETE</td><td class="px-4 py-2 border font-mono text-xs">Exec + RowsAffected</td><td class="px-4 py-2 border font-mono text-xs">Delete</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>CRUD 四个动作 ≈ 前端操作数组的四件套——<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">push</code>（增）、<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">find</code>（查单行）、<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">filter</code>（查列表）、<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">splice</code>（改/删）。区别：数据库表是「持久化 + 多端共享」的数组，而前端数组一刷新就没了。</p>
        </aside>
      </section>

      <!-- 2. CREATE TABLE -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          建表 CREATE TABLE：先画好表格再填数据
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          建表 = <strong>定义一张表的列结构</strong>（字段名 + 类型 + 约束）。这张 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">menu</code> 表对应你项目里
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">apps/go/backend</code> 的菜单数据模型：<strong>主键 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">id</code> 自增</strong>，不用应用层生成 ID，数据库自己当「记账员」。
        </p>
        <div class="mb-4"><Code language="text" :code="createTableSQL" title="menu 建表语句 (PostgreSQL)" /></div>
        <div class="mb-4"><Code language="go" :code="createTableExecCode" title="在 Go 里执行 DDL" /></div>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>建表 ≈ 做 Excel 前先写<strong>表头</strong>。没写表头就乱填数据，后面根本没法排序、统计；<code class="bg-orange-100 text-orange-700 px-1 py-0.5 rounded text-xs">BIGSERIAL PRIMARY KEY</code> 就是给每行发一个「不重复的序号」，Excel 里相当于自动递增的序号列。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>DDL（CREATE/ALTER/DROP）<strong>没有结果集</strong>，一律用 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">db.Exec</code> 执行。<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">IF NOT EXISTS</code> 让建表幂等——服务启动时每次跑一遍也不报错，是迁移的基础形态。</p>
        </aside>
      </section>

      <!-- 3. INSERT -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          INSERT + LastInsertId：拿回刚插入的 ID
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">db.Exec</code> 执行 INSERT，返回的
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sql.Result</code> 提供两个方法：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">LastInsertId()</code>（刚插入的自增主键）和
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">RowsAffected()</code>（受影响行数）。自增 ID 是<strong>数据库分配的</strong>，天然线程安全——比你用全局计数器靠谱得多。
        </p>
        <div class="mb-4"><Code language="go" :code="insertCode" title="INSERT + LastInsertId" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 平台差异：</strong>MySQL 驱动直接支持 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">LastInsertId</code>；<strong>PostgreSQL（lib/pq / pgx）默认不返回自增 id</strong>，要用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">INSERT ... RETURNING id</code> 配合 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">QueryRow(...).Scan(&id)</code>。写跨库代码前先确认目标库的取 ID 姿势。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">LastInsertId</code> ≈ Vue 里 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">arr.push(item)</code> 之后立刻拿到新增元素的索引/自增 key——前端靠 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">Date.now()</code> 凑 key 会撞车，数据库的序列则永远唯一。</p>
        </aside>
      </section>

      <!-- 4. SELECT -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          SELECT：QueryRow 单行 / Query 多行
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          查询分两种：<strong>查一行用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">QueryRow</code></strong>（配 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Scan</code>），
          <strong>查多行用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Query</code></strong>（返回「惰性游标」<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">rows</code>，必须手动 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">rows.Next()</code> 循环 + <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">rows.Close()</code>）。
          注意 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sql.ErrNoRows</code> 不是错误，是「没查到」的哨兵值——用它区分「无结果」和「真出错」。
        </p>
        <div class="space-y-4 mb-4">
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">单行：QueryRow → Scan</h4>
            <div class="mb-4"><Code language="go" :code="queryRowCode" title="get_one.go" /></div>
          </div>
          <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 class="font-semibold text-slate-700 mb-1">多行：Query → rows.Next 循环</h4>
            <div class="mb-4"><Code language="go" :code="queryRowsCode" title="list.go" /></div>
          </div>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 最容易漏的两件事：</strong>① 多行查询<strong>必须 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">defer rows.Close()</code></strong>，否则连接池会被游标占满，服务「慢慢卡死」——和忘了关文件句柄一个道理；② 循环结束后还要检查 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">rows.Err()</code>，因为<strong>遍历中遇到的错误要到这里才冒出来</strong>。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">rows.Next()</code> 循环 ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">list.forEach(item =&gt; ...)</code> 逐行消费；<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">QueryRow</code> ≈ 直接取 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">arr[0]</code>。区别：rows 是<strong>流式的（边取边读、占着连接）</strong>，不是一次拿进内存的数组——所以用完必须 Close。</p>
        </aside>
      </section>

      <!-- 5. UPDATE -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          UPDATE + RowsAffected：受影响的语义
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          UPDATE 用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Exec</code>。它最重要的返回值是
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">RowsAffected()</code>——<strong>「真的有几行变了」</strong>。这个数字的语义要记牢：<strong>id 不存在时不是报错，而是返回 0</strong>。业务上「更新成功 = n &gt; 0」，不能只靠 err == nil 判断。
        </p>
        <div class="mb-4"><Code language="go" :code="updateCode" title="update.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ RowsAffected 的两种「0」：</strong>① id 不存在 → 0（正常）；② 值本来就一样 → MySQL 默认返回 0（匹配到但<strong>无变化</strong>），PostgreSQL 则返回 1（按匹配行数计）。所以<strong>别用 RowsAffected 判断「数据有没有变」</strong>，它只表示「SQL 处理了多少行」。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>RowsAffected ≈ Go 里 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">map[key] = v</code> 后的 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">len(map)</code> 增量——但 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">map</code> 覆盖不告诉你「key 原来在不在」，RowsAffected 却能告诉你「WHERE 匹配了几行」；做「存在才更新」的判断时它比 err 更可靠。</p>
        </aside>
      </section>

      <!-- 6. DELETE -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          DELETE：删数据前的最后一道防线
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          DELETE 同样看 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">RowsAffected</code>。<strong>最大的风险不是写错，而是忘了 WHERE</strong>——一条 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">DELETE FROM menu</code> 没有 WHERE，直接清空全表，且<strong>数据库不会拦住你</strong>。
        </p>
        <div class="mb-4"><Code language="go" :code="deleteCode" title="delete.go" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 生产建议：</strong>① DELETE 之前先跑一条同 WHERE 的 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">SELECT COUNT(*)</code> 确认范围；② 多数业务用<strong>软删除</strong>（加 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">deleted_at</code> 字段，查询默认过滤）而不是物理删除——用户菜单删了还想找回，软删除能反悔；③ 用事务包住「删 A + 删 B」这类关联操作，防止删一半。</p>
        </aside>
      </section>

      <!-- 7. 占位符 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          占位符 ? 传参的四种写法
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">?</code> 是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">database/sql</code> 的<strong>统一占位符</strong>：SQL 文本里写 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">?</code>，参数作为独立实参传给驱动，<strong>绝不拼接字符串</strong>（安全意义在下篇 go-4-4 专讲）。实际替换成什么由驱动决定——MySQL 用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">?</code>，PostgreSQL 用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">$1</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">$2</code>。下面四种写法覆盖日常所有场景：
        </p>
        <div class="mb-4"><Code language="go" :code="placeholderCode" title="placeholder.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么第 ④ 种 Prepare 有价值：</strong>高频执行的 SQL（登录、查菜单）如果每次都让数据库重新解析一遍是浪费。<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">db.Prepare</code> 把「解析 + 生成执行计划」缓存起来，之后只绑定参数执行。<strong>不过别过早优化</strong>——很多驱动内部已经做了语句缓存，先用最简单写法，瓶颈真的在 DB 解析时再上 Prepare。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>占位符 ≈ 函数参数而不是宏替换。<code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">? </code> 是「形参」，传进去的实参被当作「值」，不会被重新求值成代码；而字符串拼接 ≈ C 的 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">#define</code> 宏——文本替换，用户输入直接变成「程序的一部分」。</p>
        </aside>
      </section>

      <!-- 8. 实战 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          实战：菜单表 CRUD 全流程
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          把上面所有知识点串成一条完整链路——<strong>建表 → 增 → 查单行 → 改 → 查列表 → 删</strong>。
          这正是你的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">apps/go/backend/internal/repository/menu_repo.go</code> 将来要做的：
          现在它用内存 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">map</code> 存菜单，等阶段 4 引入 PostgreSQL，就把它的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Create / Get / Update / Delete / List</code> 逐一替换成下面的 SQL 调用，接口签名保持不变。
        </p>
        <div class="mb-4"><Code language="go" :code="fullCrudCode" title="main.go — 菜单生命周期" /></div>
        <div class="mb-4"><Code language="bash" :code="crudOutput" title="📟 运行输出" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 对照 menu_repo.go 的学法：</strong>打开 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">apps/go/backend/internal/repository/menu_repo.go</code>，看它现在的内存版 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">Create</code> 是「<code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">r.order++</code> 自己发号」；换成数据库版就是「INSERT 让数据库发号（LastInsertId）」。<strong>接口不变、实现换层</strong>——这就是 repository 模式的意义。</p>
        </aside>
      </section>

      <!-- 9. 常见错误 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          常见错误与反模式
        </h2>
        <div class="mb-4"><Code language="go" :code="errCode" title="common_mistakes.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 两条红线：</strong>① <strong>用户输入永远走占位符</strong>——任何直接拼接用户输入进 SQL 的写法都是 SQL 注入（下篇 go-4-4 深度讲解）；② <strong>Scan 的变量个数必须和 SELECT 列数一致</strong>，多一列少一列都会报 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">sql: expected X destination arguments</code>，排查时要数数。</p>
        </aside>
      </section>

      <!-- 10. 小结 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>API 二分法：</strong>有结果集用 <code class="bg-slate-100 px-1 rounded font-mono text-xs">QueryRow/Query</code>，增删改用 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Exec</code>；DDL 也是 Exec</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>建表：</strong>主键 <code class="bg-slate-100 px-1 rounded font-mono text-xs">id BIGSERIAL PRIMARY KEY</code> 自增，<code class="bg-slate-100 px-1 rounded font-mono text-xs">IF NOT EXISTS</code> 保幂等</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>INSERT：</strong><code class="bg-slate-100 px-1 rounded font-mono text-xs">LastInsertId</code> 拿回数据库发的自增 ID；PostgreSQL 用 <code class="bg-slate-100 px-1 rounded font-mono text-xs">RETURNING id</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>SELECT：</strong>单行 <code class="bg-slate-100 px-1 rounded font-mono text-xs">QueryRow.Scan</code>（<code class="bg-slate-100 px-1 rounded font-mono text-xs">sql.ErrNoRows</code> 表示没查到）；多行 <code class="bg-slate-100 px-1 rounded font-mono text-xs">rows.Next()</code> 循环 + 记得 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Close</code> + <code class="bg-slate-100 px-1 rounded font-mono text-xs">rows.Err()</code></span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>UPDATE / DELETE：</strong><code class="bg-slate-100 px-1 rounded font-mono text-xs">RowsAffected</code> 是「处理了几行」，0 不代表报错；DELETE 别忘 WHERE</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>占位符 ?：</strong>四种写法（逐个传参 / 切片展开 / 动态生成 / Prepare 复用），参数永远当「数据」不当「代码」</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>落地：</strong>menu_repo.go 的 Create/Get/Update/Delete/List 就是本页五个 SQL 的一一映射，接口换实现不换</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <Link :route="'go-4-2-connection-pool'" text="← 上一节：连接池配置与调优" animation="none" size="small" class="text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1" />
        <Link :route="'go-4-4-sql-security'" text="下一节：SQL 注入安全 →" animation="none" size="small" class="text-cyan-600 hover:text-cyan-700 font-medium transition-colors flex items-center gap-1" />
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Link, Nav } from 'components'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "CRUD 全景" },
  { id: "sec-2", name: "CREATE TABLE 建表" },
  { id: "sec-3", name: "INSERT + LastInsertId" },
  { id: "sec-4", name: "SELECT 查询" },
  { id: "sec-5", name: "UPDATE + RowsAffected" },
  { id: "sec-6", name: "DELETE + RowsAffected" },
  { id: "sec-7", name: "占位符 ? 四种写法" },
  { id: "sec-8", name: "实战：菜单 CRUD 全流程" },
  { id: "sec-9", name: "常见错误" },
  { id: "sec-10", name: "小结" },
]

const createTableSQL = `CREATE TABLE IF NOT EXISTS menu (
    id         BIGSERIAL  PRIMARY KEY,              -- 自增主键 (MySQL: AUTO_INCREMENT)
    name       VARCHAR(64)  NOT NULL UNIQUE,        -- 菜单唯一名，如 Home
    label      VARCHAR(64)  NOT NULL,               -- 显示名，如 首页
    path       VARCHAR(255) NOT NULL,               -- 路由路径，如 /admin
    sort_order INT          DEFAULT 0,              -- 排序 (order 是 SQL 保留字)
    project    VARCHAR(32)  NOT NULL DEFAULT 'learning',
    created_at TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT now()
);`

const createTableExecCode = `// 在 Go 里执行 DDL：没有结果集，用 db.Exec
createSQL := "CREATE TABLE IF NOT EXISTS menu (" +
    "id BIGSERIAL PRIMARY KEY, " +
    "name VARCHAR(64) NOT NULL UNIQUE, " +
    "label VARCHAR(64) NOT NULL, " +
    "path VARCHAR(255) NOT NULL, " +
    "sort_order INT DEFAULT 0, " +
    "project VARCHAR(32) NOT NULL DEFAULT 'learning', " +
    "created_at TIMESTAMPTZ NOT NULL DEFAULT now(), " +
    "updated_at TIMESTAMPTZ NOT NULL DEFAULT now()" +
    ")"

_, err := db.Exec(createSQL)
if err != nil {
    log.Fatal(err)   // 语法错 / 权限不足 / 连接失败都会在这里暴露
}
// 输出: 建表成功；IF NOT EXISTS 让重复执行也安全（幂等）`

const insertCode = `// INSERT：db.Exec + 占位符 ?，参数按顺序一一对应
sql := "INSERT INTO menu (name, label, path, sort_order, project) " +
    "VALUES (?, ?, ?, ?, ?)"
res, err := db.Exec(sql, "Admin", "管理后台", "/admin", 1, "admin")
if err != nil {
    return 0, err   // 例如 name 撞了 UNIQUE 约束 → 报唯一冲突
}

// LastInsertId：拿回数据库自己分配的 64 位自增主键
id, err := res.LastInsertId()
if err != nil {
    // 某些驱动/场景不支持时返回 ErrLastInsertId
    return 0, err
}
// 输出: id = 1（数据库发号，不依赖应用层计数，天然线程安全）`

const queryRowCode = `// SELECT 单行：QueryRow → Scan，把列塞进结构体字段
var m Menu
err := db.QueryRow(
    "SELECT id, name, label FROM menu WHERE id = ?", 1,
).Scan(&m.ID, &m.Name, &m.Label)

if err == sql.ErrNoRows {
    // 输出: 没查到 —— ErrNoRows 是哨兵值，不是真错误
    // 用它区分「没有结果」和「查询真的出错」
} else if err != nil {
    return err
}
// 输出: {1 Admin 管理后台}`

const queryRowsCode = `// SELECT 多行：Query 返回「惰性游标」，边取边读，占着连接
rows, err := db.Query(
    "SELECT id, name, label FROM menu WHERE project = ? ORDER BY sort_order",
    "learning",
)
if err != nil { return err }
defer rows.Close()   // ① 必须关！否则游标占着连接池不放

var menus []Menu
for rows.Next() {    // ② 逐行推进，没有行时返回 false 结束
    var m Menu
    if err := rows.Scan(&m.ID, &m.Name, &m.Label); err != nil {
        return err
    }
    menus = append(menus, m)
}
if err := rows.Err(); err != nil {  // ③ 遍历中潜伏的错误在这里统一冒头
    return err
}
// 输出: [{1 Home 首页} {2 Frontend 前端开发} {4 Backend 后端开发}]`

const updateCode = `// UPDATE：RowsAffected 告诉你「真的有几行变了」
res, err := db.Exec(
    "UPDATE menu SET label = ?, updated_at = now() WHERE id = ?",
    "管理中心", 1,
)
if err != nil { return err }

n, err := res.RowsAffected()
// 输出: 1 —— 1 行被更新
// 输出: 0 —— id=1 不存在：不报错！业务判断「更新成功」要看 n > 0`

const deleteCode = `// DELETE：和 UPDATE 一样看 RowsAffected
res, err := db.Exec("DELETE FROM menu WHERE id = ?", 1)
n, err := res.RowsAffected()

// 输出: 1 —— 删了 1 行
// 输出: 0 —— id 不存在，同样是「静默成功」

// ⚠️ 忘了 WHERE 会怎样？
//   DELETE FROM menu          → 清空整张表！数据库不会拦你
//   生产环境：先 SELECT COUNT(*) WHERE 同条件，再 DELETE`

const placeholderCode = `// 占位符 ? 的四种写法（参数必须是「值」，绝不能拼接字符串）

// ① 最常用：逐个传参，顺序与 ? 一一对应
rows, err := db.Query(
    "SELECT * FROM menu WHERE project = ? AND sort_order > ?",
    "learning", 0,
)

// ② 展开切片：IN (...) 批量查询，ids... 把切片解包成多个参数
ids := []interface{}{1, 2, 4}
rows, err = db.Query(
    "SELECT * FROM menu WHERE id IN (?, ?, ?)", ids...,
)

// ③ 占位符数量动态生成（IN 长度不定时）
holders := strings.TrimRight(strings.Repeat("?,", len(ids)), ",")
sql := "SELECT * FROM menu WHERE id IN (" + holders + ")"
rows, err = db.Query(sql, ids...)
// 注意：holders 只含 ?，不含任何用户数据，安全

// ④ Prepare 编译一次、执行多次（高频 SQL 复用，省去重复解析）
stmt, err := db.Prepare(
    "INSERT INTO menu (name, label) VALUES (?, ?)",
)
defer stmt.Close()   // PreparedStatement 也要关
stmt.Exec("Home", "首页")
stmt.Exec("Admin", "管理后台")
// 输出: 两条插入都成功，SQL 骨架只被数据库解析一次`

const fullCrudCode = `// 菜单表 CRUD 全流程 —— 对标 menu_repo.go 的五个方法
func main() {
    db := mustOpenDB()  // 假设已连好库（见 go-4-1 / go-4-2）

    // ① 建表（幂等，启动时跑一遍）
    db.Exec(createTableSQL)   // 见第 2 节

    // ② Create：INSERT + LastInsertId
    res, _ := db.Exec(
        "INSERT INTO menu (name, label, path, sort_order, project) VALUES (?, ?, ?, ?, ?)",
        "Admin", "管理后台", "/admin", 1, "admin")
    id, _ := res.LastInsertId()
    // 输出: 新增菜单 id = 1

    // ③ Get：QueryRow 单行
    var m Menu
    db.QueryRow("SELECT id, name, label FROM menu WHERE id = ?", id).
        Scan(&m.ID, &m.Name, &m.Label)
    // 输出: {1 Admin 管理后台}

    // ④ Update：只改 label（部分更新）
    db.Exec("UPDATE menu SET label = ?, updated_at = now() WHERE id = ?",
        "后台管理", id)
    // 输出: 受影响 1 行

    // ⑤ List：Query 多行（省略 rows.Close / rows.Err 检查）
    rows, _ := db.Query(
        "SELECT id, name, label FROM menu WHERE project = ? ORDER BY sort_order",
        "admin")
    for rows.Next() { /* 逐行 Scan 进切片 */ }
    // 输出: [{1 Admin 后台管理}]

    // ⑥ Delete：物理删除，菜单走完一个生命周期
    db.Exec("DELETE FROM menu WHERE id = ?", id)
    // 输出: 删除 1 行 —— 至此 增→查→改→删 全部演示完毕
}`

const crudOutput = `$ go run main.go
建表成功
新增菜单 id = 1
查询到: {1 Admin 管理后台}
更新了 1 行
删除 1 行 —— 菜单生命周期结束`

const errCode = `// ❌ 常见错误与反模式
// 1. Scan 的列数 ≠ SELECT 的列数
db.QueryRow("SELECT id, name, label FROM menu WHERE id = ?", 1).
    Scan(&m.ID, &m.Name)   // 少扫一个 → sql: expected 2 destination arguments

// 2. 忘记 defer rows.Close() → 连接池被游标占满，服务慢慢卡死
rows, _ := db.Query("SELECT ...")
// 没有 defer rows.Close()  ← 泄漏！

// 3. 把 LastInsertId 转成字符串后直接拼回 SQL
q := "SELECT * FROM menu WHERE id = " + strconv.FormatInt(id, 10)
// → 拼 SQL！应该改成占位符 + id 作为参数

// 4. DELETE / UPDATE 忘了 WHERE → 全表被删/被改（开发库事故现场）

// 5. 用 err != nil 判断「更新成功」→ 漏掉 id 不存在时 RowsAffected=0 的情况`
</script>
