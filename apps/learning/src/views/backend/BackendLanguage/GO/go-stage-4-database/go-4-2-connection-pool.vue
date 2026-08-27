<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔌 连接池：把连接用好，而不是连一堆</h1>
          <p class="text-sm text-slate-500 mt-1">sql.DB 自带池 · SetMaxOpenConns / SetMaxIdleConns / SetConnMaxLifetime · 默认值 · maxOpen=1 调试 · 池耗尽 · DB.Stats()</p>
        </div>
        <div class="flex items-center gap-3">
          <EditorLink file-path="apps/go/backend/internal/database/db.go" label="📝 查看源码" :is-admin="userStore.isAdmin" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 4-2</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. sql.DB 自带连接池 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          sql.DB 自带连接池，不用引第三方
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">*sql.DB</code> <strong>内置连接池</strong>——这是标准库最大的免费午餐。
          你<strong>不需要</strong>像 Java 那样引 HikariCP、像 Node 那样配 pg-pool，池的借还逻辑 Go 全替你写好了。
          我们要学的不是"造一个池"，而是<strong>把内置的池调好</strong>，并能在出事时看明白池子状态。
        </p>
        <div class="mb-4"><Code language="go" :code="poolLifecycleCode" title="一次查询在池里的完整旅程" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>连接池 ≈ 浏览器的 <strong>HTTP keep-alive 连接复用</strong>——浏览器对同一域名只开有限几条 TCP，复用而不是每次新建；Go 的连接池同理，避免每次查询都做一次"建连 + 认证 + 销毁"的重活。区别是浏览器帮你定死上限（6 条），Go 把旋钮交给你。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>连接池和 goroutine 一样是 Go 并发模型的底层设施。<strong>goroutine 池</strong>（如 worker 协程池）省的是"创建协程"的开销，<strong>连接池</strong>省的是"创建数据库连接"的开销——同一个思想：<strong>昂贵资源别反复创建，复用之</strong>。你之后学的 sync.Pool（go-2-11）也是这个思路。</p>
        </aside>
      </section>

      <!-- 2. 三个配置项 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          三个配置项：上限 / 缓冲 / 寿命
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          池有 3 个核心旋钮：<strong>上限</strong>（最多同时开几条）、<strong>空闲缓冲</strong>（空闲时保留几条）、<strong>寿命</strong>（一条连接最多活多久）。
          建议在 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sql.Open</code> 之后立刻设置，一次性配好。
        </p>
        <div class="mb-4"><Code language="go" :code="configCode" title="db.go — 连接池三件套" /></div>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">方法</th><th class="px-4 py-2 border border-slate-200 font-semibold">含义</th><th class="px-4 py-2 border border-slate-200 font-semibold">默认</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">SetMaxOpenConns(n)</td><td class="px-4 py-2 border">池中<strong>同时打开</strong>的连接数上限（硬天花板）</td><td class="px-4 py-2 border font-mono text-xs">0 = 不限</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">SetMaxIdleConns(n)</td><td class="px-4 py-2 border">池中<strong>空闲保留</strong>的连接数（越低越勤建连）</td><td class="px-4 py-2 border font-mono text-xs">2</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">SetConnMaxLifetime(d)</td><td class="px-4 py-2 border">一条连接<strong>最多存活</strong>多久，到期强制重建</td><td class="px-4 py-2 border font-mono text-xs">0 = 永久</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 陷阱：MaxIdle 必须 ≤ MaxOpen。</strong>虽然 Go 会<strong>自动钳制</strong>（idle 不可能超过 open），但如果你 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">SetMaxIdleConns(100)</code> 而 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">SetMaxOpenConns(10)</code>，实际 idle 只会有 10——写了也白写，反而让读代码的人困惑。设值顺序无所谓，最终以钳制后的为准。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么要有 SetConnMaxLifetime？</strong>数据库服务器（如 MySQL <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">wait_timeout</code>）会悄悄断开闲置过久的连接，而池子里那条连接<strong>自己不知道</strong>——下次用它就报 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">invalid connection</code> 之类的"死连接"错误。定期重建（Lifetime 设 30 分钟）能让池里的连接永远"新鲜"，这是生产必配项。</p>
        </aside>
      </section>

      <!-- 3. 默认值是什么 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          默认值是什么：能跑，但别裸奔
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          刚学会连接池的人常以为"必须自己设"，其实<strong>不设也能跑</strong>——但三个默认值各自埋着雷。
        </p>
        <div class="mb-4"><Code language="go" :code="defaultCode" title="默认值 + 经验公式" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 两个裸奔后果：</strong>① <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">MaxOpen=0</code>（不限）：高并发时连接数无脑疯涨，把数据库的连接数打满，拖垮整个库；② <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Lifetime=0</code>（永久）：一旦服务器侧踢掉连接，池里全是"死连接"，症状是<strong>间歇性报错、重启后短暂变好</strong>。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 生产起步配置（再按压测微调）：</strong><code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">SetMaxOpenConns(数据库上限的 70%)</code>、<code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">SetMaxIdleConns(MaxOpen 的一半)</code>、<code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">SetConnMaxLifetime(30 * time.Minute)</code>。留 30% 余量给运维工具、迁移任务、其他服务，别把数据库吃满。</p>
        </aside>
      </section>

      <!-- 4. maxOpen=1 调试利器 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          SetMaxOpenConns(1)：调试利器
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          把池上限设成 <strong>1</strong>，所有 SQL 被迫<strong>串行执行</strong>——这不是给生产用的，是<strong>排障神器</strong>：
          它能把你"借了连接不还"的 bug 变成肉眼可见的卡死。
        </p>
        <div class="mb-4"><Code language="go" :code="maxOpenOneCode" title="debug.go — 单连接排障" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">SetMaxOpenConns(1)</code> ≈ 前端排查死锁时把并发请求改成 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">for...of</code> 逐个 await——一旦某个请求不 resolve，后续立刻卡住、位置一清二楚。把并发降为 1，就是把"谁卡住了谁"从黑盒变成显式。</p>
        </aside>
        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>整栋楼只有 1 部电梯。平时 4 部电梯，谁进谁出看不太清；改成 1 部后，只要有人进电梯迟迟不出来，楼下排队的人马上能指出来"就是那个人堵的"——连接没归还就是这个"堵电梯"的人。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 别忘关掉：</strong>MaxOpen=1 只用于本地调试！上线前记得改回合理数值，否则并发请求全在排队，QPS 直接掉到"一秒一个"。</p>
        </aside>
      </section>

      <!-- 5. 连接池耗尽的坑 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          连接池耗尽的坑：三种报错先对号入座
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          "池耗尽"是个笼统说法，实际报错各不相同。<strong>先分清是哪一种</strong>，再决定从哪查：
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">database/sql: database is closed</code> /
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">connection refused</code> /
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Too many connections</code>。
        </p>
        <div class="mb-4"><Code language="go" :code="errCode" title="三种报错的排查路径" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 最隐蔽的坑：请求不是报错，而是<strong>全部变慢</strong>。</strong>Go 的连接池默认<strong>没有等待超时</strong>——池满了新请求就<strong>无限排队</strong>，表现成"接口越来越慢、最终卡死不报错"。遇到"突然变慢"先怀疑连接池：查是否忘了 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">rows.Close()</code>、是否事务没提交/回滚就返回。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 防坑口诀：</strong>① <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">rows</code> 有借必有还（defer Close）；② 事务记得 Commit 或 Rollback；③ 别在循环里反复 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">Open/Close</code>（每个 db 都是一个新池）；④ 上线前用 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">DB.Stats()</code> 观察基线。</p>
        </aside>
      </section>

      <!-- 6. DB.Stats() 观察池状态 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          DB.Stats()：连接池的仪表盘
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">db.Stats()</code> 返回 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sql.DBStats</code>，
          是观察池子健康度的"仪表盘"。它<strong>不会影响任何连接</strong>，随时可以打点，非常适合暴露在 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">/debug/db</code> 或 Prometheus 指标里。
        </p>
        <div class="mb-4"><Code language="go" :code="statsCode" title="stats.go — 观察池状态" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 三个危险信号：</strong>① <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">InUse</code> 长期接近 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">OpenConnections</code>（池快满，请求在排队）；② <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">WaitCount</code> 快速上涨（并发太高，或连接没归还）；③ <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">MaxIdleClosed / MaxLifetimeClosed</code> 数量异常（策略在频繁换连接，说明 Lifetime 设太短）。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">DB.Stats()</code> ≈ 浏览器 <strong>DevTools 的 Network/Performance 面板</strong>——不改变程序行为，只把"正在发生什么"实时给你看。<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">InUse/Idle</code> ≈ 面板里"在飞/空闲"的连接请求；<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">WaitCount</code> ≈ 卡在队列里的请求数。</p>
        </aside>
      </section>

      <!-- 7. 常见错误与最佳实践 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          常见错误与最佳实践
        </h2>
        <div class="mb-4"><Code language="go" :code="practiceCode" title="practice.go — 反模式与正确姿势" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 反模式三连：</strong>① 每个 handler 里都 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">sql.Open</code> 一次（等于每次都建一个新池，还泄漏旧的）；② 事务里 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">defer rows.Close()</code> 配 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">defer tx.Commit()</code>——Commit 失败被忽略，事务悬挂占用连接；③ 把 MaxOpen 设成 0 然后"交给 Go 自己管"——本地没问题，一压测就爆。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 连接池黄金八条：</strong><br/>① <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">*sql.DB</code> 全局单例，包级变量或依赖注入，进程只建一个；② Open 后立刻配三个 Set 方法；③ 生产必设 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">ConnMaxLifetime</code>；④ MaxIdle 别设 0（等于自废连接池）；⑤ 有 rows 必 defer Close；⑥ 事务用 defer 里 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">rollback</code> 兜底，成功后显式 Commit；⑦ 暴露 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">db.Stats()</code> 到监控；⑧ 压测后再微调三个数，别拍脑袋。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>连接池调优 ≈ goroutine 数量调优——都是"有限资源 + 复用"的工程问题。goroutine 无脑开会爆栈爆内存，连接无脑开会爆数据库 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">max_connections</code>。两者共同的解法是<strong>设上限 + 用队列缓冲 + 监控水位</strong>，这也是你在 backend 里跑压测时要一起看的两个指标。</p>
        </aside>
      </section>

      <!-- 8. 小结 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>*sql.DB 内置连接池</strong>，借还逻辑标准库管好，无需第三方库</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三旋钮</strong>：MaxOpen（上限）/ MaxIdle（空闲缓冲）/ ConnMaxLifetime（单条寿命）；MaxIdle 会被自动钳制到 ≤ MaxOpen</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>默认值</strong>：0 不限 / 2 / 0 永久——能跑但裸奔，生产必调</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>MaxOpen=1 是调试利器</strong>：强制串行，快速暴露"连接没归还"的 bug，上线前记得改回</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>池耗尽三种报错</strong>：database is closed / connection refused / Too many connections——先分清再从池、网络、服务器三个方向查</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>DB.Stats() 是仪表盘</strong>：InUse / Idle / WaitCount / WaitDuration，挂监控 + 压测后微调</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>黄金八条</strong>：全局单例、Open 后即配、设 Lifetime、有 rows 必 Close、事务 defer rollback 兜底</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <Link :route="'go-4-1-database-sql'" :text="'← 上一节：database/sql 标准接口'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-cyan-600! bg-transparent! border-none! inline!" />
        <Link :route="'go-4-3-crud-basics'" :text="'下一节：CRUD 基本操作 →'" animation="none" size="small" class="p-0! text-sm! font-medium! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, EditorLink, Link, Nav } from 'components'
import { useUserStore } from '@/stores/userProfle'
const userStore = useUserStore()

const navList = [
  { id: "sec-1", name: "sql.DB 自带连接池" },
  { id: "sec-2", name: "三个配置项" },
  { id: "sec-3", name: "默认值是什么" },
  { id: "sec-4", name: "maxOpen=1 调试利器" },
  { id: "sec-5", name: "连接池耗尽的坑" },
  { id: "sec-6", name: "DB.Stats() 观察池状态" },
  { id: "sec-7", name: "常见错误与最佳实践" },
  { id: "sec-8", name: "小结" },
]

const poolLifecycleCode = `// 一次查询在池里的完整旅程（7 步）
//   Query("SELECT ...") → *sql.DB
//     ① 池里有空闲连接吗？   有 → 直接拿来用
//     ② 没有 → 还能再开吗？（numOpen < MaxOpen）  能 → 新建一条
//     ③ 不能 → 阻塞等待（WaitCount + 1），直到有人归还
//     ④ 拿到连接，执行 SQL
//     ⑤ 结果扫描完，rows.Close() / 语句执行完
//     ⑥ 连接【归还池子】→ 成为 Idle 空闲连接
//     ⑦ 若空闲超时 / 寿命到期 → 关闭这条连接，池子回收
//
// 核心心智模型：*sql.DB 是个"租借柜台"，
//   查询是"借"，rows.Close / 语句结束是"还"。
//   借了不还（忘 Close）→ 柜台没连接可借 → 请求排队 → 雪崩`

const configCode = `package main

import (
    "database/sql"
    "fmt"
    "time"

    _ "github.com/mattn/go-sqlite3"
)

func main() {
    db, err := sql.Open("sqlite3", "./data.db")
    if err != nil { panic(err) }
    defer db.Close()

    // ① 池中【最多同时打开】多少条连接（硬天花板）
    db.SetMaxOpenConns(20)   // 0 = 不限制（默认）

    // ② 池中【空闲时保留】多少条连接（避免频繁建连）
    db.SetMaxIdleConns(5)    // 默认 2；Go 会自动钳制 ≤ MaxOpen

    // ③ 一条连接【最多存活】多久，到期强制重建
    db.SetConnMaxLifetime(30 * time.Minute) // 默认 0 = 永久
    // 生产必设！服务器（如 MySQL wait_timeout）会悄悄踢掉闲置
    // 过久的连接，若不定期重建会拿到一批"死连接"

    fmt.Println("配置完成：连接池上限 20、空闲保留 5、单条最长存活 30 分钟")
}`

const defaultCode = `// 三个配置的默认值 —— 不设也能跑，但各有雷
//
// SetMaxOpenConns(0)    → 默认 0 = 不限制打开数量
//   危险点：高并发时连接数无脑疯涨，把数据库压垮
// SetMaxIdleConns(2)    → 默认 2 条空闲连接
//   设 0 意味着：每次用完立刻关连接，等于放弃连接池
// SetConnMaxLifetime(0) → 默认 0 = 连接永不超时
//   危险点：服务器侧已断开却不自知 → "死连接"间歇性报错
//
// 经验公式（再按压测微调）：
//   MaxOpen ≈ 数据库最大连接数的 70%（留余量给运维/迁移/其他服务）
//   MaxIdle ≤ MaxOpen（Go 会自动钳制，但自己别写反）
//   Lifetime：MySQL 建议 30 分钟内，确保 < 服务器 wait_timeout`

const maxOpenOneCode = `// 调试利器：SetMaxOpenConns(1) 让所有 SQL 串行执行
db.SetMaxOpenConns(1)  // 池里只有 1 条连接：谁拿到谁用，用完归还

// 用途1：快速暴露"连接没归还"的 bug
//   你写了 N 个查询，但只执行到第 3 个就卡住不动
//   → 说明某个查询的 rows / db 没 Close，连接被永久占用
//   配合日志看：停在第 N 个 SQL 后面不走了

// 用途2：复现并发问题
//   两个 goroutine 同时查询 → 只有一个能拿到连接，
//   另一个阻塞 → 顺序化执行，问题更容易肉眼发现

// 用途3：给慢查询 / 事务加"红绿灯"
//   配短一点的 ConnMaxLifetime，观察连接重建行为

// ⚠️ 只用于本地调试！上线前记得改回合理数值`

const errCode = `// 连接池耗尽的三种典型报错 —— 看到它们先分清是哪一种

// ① database/sql: database is closed
//   池被 db.Close() 关掉了，之后所有查询都报这个
//   排查：是否有人误调 Close？是否在循环里多次 Open/Close？

// ② dial tcp 127.0.0.1:3306: connect: connection refused
//   多半不是池的问题：服务器没起来 / 端口不通 / 防火墙
//   排查：telnet 服务器端口、看数据库日志

// ③ Error 1040: Too many connections （MySQL）
//   服务器侧 max_connections 被打满 —— 池开太多或别处也在连
//   排查：SHOW STATUS LIKE 'Threads_connected';
//         调小 SetMaxOpenConns，检查是否有连接泄漏

// 还有两种隐蔽场景：
//   - 忘 defer rows.Close()：连接"借走不还"，池慢慢枯竭
//   - 池设 0（无限）+ 高并发：连接数无上限疯涨，把数据库打挂`

const statsCode = `// DB.Stats() 返回连接池当前状态 —— 观察池健康度的"仪表盘"
stats := db.Stats()
fmt.Println("打开中:", stats.OpenConnections, "使用中:", stats.InUse, "空闲:", stats.Idle)
fmt.Println("等待获取:", stats.WaitCount, "等待时长(ms):", stats.WaitDuration.Milliseconds())
fmt.Println("闲置超时关闭:", stats.MaxIdleClosed, "寿命到期关闭:", stats.MaxLifetimeClosed)

// 字段解读（sql.DBStats）：
//   OpenConnections  当前已打开的连接总数（= InUse + Idle）
//   InUse            正在执行 SQL 的连接数
//   Idle             空闲待命连接数
//   WaitCount        因无空闲连接而阻塞等待的总次数
//   WaitDuration     等待累计时长
//   MaxIdleClosed / MaxLifetimeClosed  被池策略关闭的连接数
//
// 判断健康：
//   InUse 长期接近 MaxOpen → 池快满，请求在排队，考虑扩容或优化 SQL
//   WaitCount 快速上涨     → 并发太高，或连接没归还（查 rows.Close / 事务）
//   MaxLifetimeClosed 异常高 → Lifetime 设太短，连接在频繁重建`

const practiceCode = `// ❌ 反模式：每个 handler 都 Open 一个池 —— 泄漏 + 浪费
func HandleUser(w http.ResponseWriter, r *http.Request) {
    db, _ := sql.Open("sqlite3", "./data.db") // 每次请求新建池！
    defer db.Close()                          // 还只关当前这个
    // 并发高时，成百上千个池同时活着，连接数失控
}

// ✅ 正确：全局单例，进程只建一次，handler 只用
var db *sql.DB   // 包级变量，InitDB() 里 Open + Ping + 配置

func HandleUser(w http.ResponseWriter, r *http.Request) {
    row := db.QueryRow("SELECT name FROM users WHERE id = ?", id)
    // ...直接用全局 db，绝不反复 Open/Close
}

// ❌ 反模式：事务悬挂 —— Commit 失败被忽略，连接被占住
tx, _ := db.Begin()
defer tx.Commit()  // 出错时根本没执行到，rollback 没人管

// ✅ 正确：defer rollback 兜底，成功后显式 Commit
tx, err := db.Begin()
if err != nil { return err }
defer tx.Rollback()        // 无论成败先挂上兜底
rows, err := tx.Query("...")
if err != nil { return err }
// ...处理 rows（别忘 rows.Close）
if err := tx.Commit(); err != nil { return err }  // 成功才提交
_ = rows // 演示用`
</script>
