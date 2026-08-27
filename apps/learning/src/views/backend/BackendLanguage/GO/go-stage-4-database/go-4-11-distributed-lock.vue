<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔒 Redis 分布式锁</h1>
          <p class="text-sm text-slate-500 mt-1">为什么 Mutex 不够 · SETNX 原子加锁 · 防死锁 · Lua 安全解锁 · Redlock · go-redis 实战</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 4-11</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 为什么需要分布式锁 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么需要分布式锁
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          你的 Go 服务部署到生产环境，通常会<strong>起多个实例</strong>（多副本负载均衡、多台机器）。
          这时候会撞上一个单机时代没有的问题：<strong>多个进程同时在操作同一份共享资源</strong>，而它们之间<strong>互相不知道对方的存在</strong>。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">场景</th><th class="px-4 py-2 border border-slate-200 font-semibold">不锁会发生什么</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">扣库存</td><td class="px-4 py-2 border">两个实例同时读到「剩余 1 件」，各自卖出 → 超卖</td></tr>
              <tr><td class="px-4 py-2 border">定时任务</td><td class="px-4 py-2 border">3 个实例的 cron 同时触发 → 报表重复生成、退款重复执行</td></tr>
              <tr><td class="px-4 py-2 border">幂等操作</td><td class="px-4 py-2 border">同一笔支付回调被多个实例处理 → 入账两次</td></tr>
              <tr><td class="px-4 py-2 border">缓存重建</td><td class="px-4 py-2 border">缓存过期瞬间，N 个请求同时查库重建 → 数据库被打爆（缓存击穿）</td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-2 leading-relaxed">
          问题本质：<strong>锁必须放在所有进程都能「看得见」的地方</strong>。单机锁在进程内存里，其他进程看不见。
          Redis 是进程外共享服务，天然适合当这个「锁的保管人」。
        </p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>分布式锁 ≈ 前端的<strong>「跨标签页互斥锁」</strong>。你在一个标签页里用 JS 变量当锁，另一个标签页根本读不到它——因为每个标签页 ≈ 一个独立进程。要跨标签页共享状态只能用 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">localStorage</code>（≈ Redis 这个公共存储），或者用 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">navigator.locks</code>（Web Locks API，浏览器自带的「分布式锁」）。</p>
        </aside>
      </section>

      <!-- 2. 单进程锁的局限 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          单进程锁 sync.Mutex 的局限
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">sync.Mutex</code> 只能保证<strong>同一进程内的 goroutine 互斥</strong>——它的锁状态存在进程内存里。
          一旦多实例部署，每个进程各有一把独立的 Mutex，<strong>互相完全不知情</strong>。
        </p>
        <div class="mb-4"><Code language="go" :code="mutexCode" title="单机版：sync.Mutex 只在本进程内有效" /></div>

        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>进程 A 拿到锁，开始扣库存</li>
          <li>进程 B 的锁是<strong>另一把</strong>——它也能拿到「锁」，同时开始扣库存</li>
          <li>两把锁互不感知 → 临界区同时被两个进程进入 → 数据被并发改写</li>
        </ol>

        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>回顾第 2 阶段学的 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">sync.Mutex</code> 和 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">atomic</code>——它们解决的是<strong>进程内多 goroutine 竞争</strong>；分布式锁解决的是<strong>多进程竞争</strong>。两者都是「互斥」，只是作用域不同。同一个共享数据库连接池里的连接是进程内的，锁也只需要进程内；但<strong>共享的 MySQL/Redis 数据是跨进程的</strong>，就必须上分布式锁。</p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 判断标准：</strong>只有<strong>单实例 + 多 goroutine</strong> 才用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">sync.Mutex</code>；只要<strong>可能部署多个实例</strong>，对共享资源就必须换分布式锁。很多人上线前没想过扩容后锁会失效——这是最典型的「开发环境没问题、一上多实例就出事」。</p>
        </aside>
      </section>

      <!-- 3. SETNX 原子加锁 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          Redis SETNX：一行命令原子加锁
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Redis 提供 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">SET key value NX EX seconds</code>：
        </p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>NX</strong>（Not eXists）——只有 key <strong>不存在</strong>时才写入，key 已存在则失败。这就是「互斥」的核心：谁先写入谁拿锁</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>EX seconds</strong>——设置过期时间，锁到期自动释放，防止进程崩了锁永远不还</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>整体原子</strong>——「判断不存在 + 写入 + 设过期」一步完成，中间不可能插入别的命令</span></li>
        </ul>
        <div class="mb-4"><Code language="bash" :code="setnxCmdCode" title="📟 终端：Redis CLI 演示" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 为什么是「一步原子」这么重要？</strong><br/>
          如果先 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">EXISTS</code> 判断、再 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">SET</code> 写入，两步之间另一个请求可能插进来——<strong>两个请求都判断「不存在」然后都写入成功</strong>，锁就形同虚设。SETNX 把这两步合并成一个原子命令，从根上杜绝了这个竞态。</p>
        </aside>

        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>公共仓库只有一个储物柜，谁要用就在柜门上<strong>贴一张纸条写上自己的名字</strong>。别人来了一看柜门有纸条 → 知道有人占着 → 不进去。SETNX 就是这个「看一眼有没有纸条 + 贴上自己名字 + 写清占多久」的<strong>一次性动作</strong>——不是「先看再贴」两个动作（中间可能有人抢先）。</p>
        </aside>
      </section>

      <!-- 4. 加锁的两个坑 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          加锁的两个坑：过期时间必须带、value 必须唯一
        </h2>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑一：不加过期时间 → 持锁进程崩溃 = 死锁。</strong>进程拿到锁后 panic、被杀、宕机，<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">defer Unlock</code> 根本没机会执行，Redis 里的锁 key 永远不消失，<strong>其他所有进程永久等待</strong>。所以 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">EX</code> 不是可选项，是必需品。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 坑二：value 必须唯一（每把锁一个随机标识）。</strong>如果每个进程都用同一个固定 value（比如 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">"lock"</code>），解锁时根本分不清「这把锁是不是我持有的」，容易误删别人的锁。正确做法：<code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">value = 随机 UUID / 进程ID+goroutineID</code>，解锁前先校验 value 是不是自己的。</p>
        </aside>

        <div class="mb-4"><Code language="go" :code="acquireLockCode" title="go-redis：SetNX 加锁完整实现" /></div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>value 唯一标识 ≈ 前端的<strong>请求令牌（token）</strong>或 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">crypto.randomUUID()</code>——每次操作带上自己的唯一身份，别人拿到也没用。正如 localStorage 里「写谁的名字」，必须写自己的真名而不是统一写「我」，否则离开时容易把别人的纸条撕了。</p>
        </aside>
      </section>

      <!-- 5. 安全解锁 + Lua -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          解锁的坑：先 GET 再 DEL 有竞态，必须用 Lua
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          安全的解锁流程是<strong>「先校验 value 是自己的 → 再删除」</strong>。但如果用两条命令分开做：
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>进程 A <code class="bg-slate-100 px-1 rounded font-mono text-xs">GET</code> 锁 value，确认是自己的</li>
          <li>此时 A 的锁恰好<strong>过期被自动释放</strong>（EX 到点了）</li>
          <li>进程 B <code class="bg-slate-100 px-1 rounded font-mono text-xs">SETNX</code> 成功，拿到了锁</li>
          <li>进程 A 才执行 <code class="bg-slate-100 px-1 rounded font-mono text-xs">DEL</code> —— 把 <strong>B 的锁删掉了</strong>！B 的临界区失去保护</li>
        </ol>
        <p class="text-slate-600 mb-4 leading-relaxed">
          解法：把「检查 value + 删除」合并成一个<strong>原子操作</strong>。Redis 的 Lua 脚本天生原子——脚本执行期间其他命令插不进来。
        </p>
        <div class="mb-4"><Code language="text" :code="unlockLuaCode" title="unlock.lua —— 检查 + 删除一个原子动作" /></div>
        <div class="mb-4"><Code language="go" :code="releaseLockCode" title="go-redis：Eval 执行 Lua 解锁" /></div>

        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>Lua 脚本保证原子性 ≈ Go 里把多步操作包进 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">sync.Mutex</code> 临界区，或数据库里用 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">BEGIN ... COMMIT</code> 事务。第 4-8 节学的「检查 + 更新」必须原子，是同一件事：<strong>读-改-写 的中间不能留缝</strong>。</p>
        </aside>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 提示：</strong>Redis 6.2+ 提供 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">GETDEL</code> 命令也能实现「取值并删除」一步到位，但生产环境里 Lua 脚本的方案最通用、可读性最好，还能顺便扩展成更复杂的锁逻辑（可重入、续期）。</p>
        </aside>
      </section>

      <!-- 6. 续期看门狗 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          锁过期 vs 任务没做完：续期看门狗
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">EX 10</code> 设了 10 秒，但业务逻辑要跑 30 秒——锁在第 10 秒自动释放，别人进来抢锁，你的任务被并发执行。反过来设 300 秒，一旦进程崩了，别人要白等 5 分钟。
        </p>
        <div class="mb-4"><Code language="go" :code="watchdogCode" title="看门狗：定期续期，任务结束主动释放" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 工程现实：</strong>生产中直接用现成库 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">github.com/go-redsync/redsync</code>（内置续期与 Redlock），或分布式任务框架（如 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">xxl-job</code>）自带分布式锁。手写看门狗用于理解原理，别重复造轮子。</p>
        </aside>
      </section>

      <!-- 7. Redlock 简介 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          Redlock：多节点防单点故障
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          单台 Redis 的问题：<strong>Redis 主节点挂了，锁就丢了</strong>（从节点还没同步到锁数据就被提升为主节点，新主节点上锁不存在 → 两个人同时拿到锁）。
          <strong>Redlock</strong>（由 Redis 作者 Antirez 提出）的思路是：向 <strong>N 个互相独立的 Redis 节点</strong>同时加锁，只要<strong>超过半数（N/2 + 1）节点成功</strong>就认为拿到锁。
        </p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>客户端用同一个 value，依次向 5 个独立节点执行 SETNX</li>
          <li>统计成功的节点数：≥ 3 个 → 加锁成功</li>
          <li>若不足半数，向已成功的节点发 Lua 解锁，<strong>整体回滚</strong></li>
          <li>释放时，向所有节点执行 Lua 解锁脚本</li>
        </ol>
        <div class="mb-4"><Code language="go" :code="redlockCode" title="redsync：Redlock 的 Go 实现" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ Redlock 有争议，别盲目上：</strong>分布式系统专家（含 Martin Kleppmann《数据密集型应用系统设计》作者）指出 Redlock 在<strong>时钟跳变、GC 停顿、网络分区</strong>下仍可能出错，它依赖的「墙钟时间」并不可靠。要不要用取决于你的风险容忍度——一般业务用单机 Redis 锁 + 过期时间就足够，<strong>不要为了炫技上 Redlock 增加复杂度</strong>。</p>
        </aside>
      </section>

      <!-- 8. 用不用怎么选 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          用不用分布式锁：怎么选
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">方案</th><th class="px-4 py-2 border border-slate-200 font-semibold">适用</th><th class="px-4 py-2 border border-slate-200 font-semibold">不适用</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">sync.Mutex / atomic</td><td class="px-4 py-2 border">单实例内多 goroutine 竞争内存变量</td><td class="px-4 py-2 border">多实例部署、跨进程共享资源</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">Redis SETNX 锁</td><td class="px-4 py-2 border">多实例互斥、低并发、秒级持有</td><td class="px-4 py-2 border">要求强一致/不可容错丢失锁</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">数据库乐观锁（版本号）</td><td class="px-4 py-2 border">单条记录并发更新、冲突率低</td><td class="px-4 py-2 border">跨多行的长事务</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">ZooKeeper / etcd 分布式锁</td><td class="px-4 py-2 border">要求强一致、高可靠</td><td class="px-4 py-2 border">不想引入重基础设施</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>扣库存优先用<strong>数据库原子操作</strong>（<code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">UPDATE stock SET num = num - 1 WHERE num &gt; 0</code>），一行 SQL 天然原子，比分布式锁更简单可靠。分布式锁留给<strong>跨多个资源的组合操作</strong>（比如「先扣库存再下单再发消息」整体只执行一次）、定时任务互斥这类场景。</p>
        </aside>
      </section>

      <!-- 9. 常见错误 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          常见错误与反模式
        </h2>
        <ul class="space-y-2 text-slate-600 mb-4 text-sm leading-relaxed">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">⚠️</span><span><strong>SETNX 不配 EX</strong>：用 <code class="bg-slate-100 px-1 rounded font-mono text-xs">SET key value NX</code> 单独设过期 → 崩溃死锁。必须 <code class="bg-slate-100 px-1 rounded font-mono text-xs">SET key value NX EX 10</code> 一条命令搞定</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">⚠️</span><span><strong>解锁不校验 value</strong>：直接 <code class="bg-slate-100 px-1 rounded font-mono text-xs">DEL</code>，可能删掉别人的锁。必须「GET 校验 == 自己的 value」再 DEL，且整体用 Lua 保证原子</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">⚠️</span><span><strong>锁粒度太大</strong>：所有用户共用一把锁（<code class="bg-slate-100 px-1 rounded font-mono text-xs">lock:user</code>），一个人持锁全站等待。按业务拆 <code class="bg-slate-100 px-1 rounded font-mono text-xs">lock:user:1001</code>、<code class="bg-slate-100 px-1 rounded font-mono text-xs">lock:order:1001</code>——锁的粒度越细，并发越高</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">⚠️</span><span><strong>锁 key 忘带业务标识</strong>：所有业务共用一个 key（<code class="bg-slate-100 px-1 rounded font-mono text-xs">lock</code>），不同业务的锁互相阻塞。命名规范：<code class="bg-slate-100 px-1 rounded font-mono text-xs">lock:{业务}:{资源ID}</code></span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">⚠️</span><span><strong>拿到锁后忘了 defer 释放</strong>：哪怕持锁逻辑 panic，也要保证释放路径执行（defer 放在 SetNX 成功之后立即注册）</span></li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>锁粒度太细 ≈ 前端只用一把 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">localStorage</code> 全局锁，不同模块（购物车 / 用户信息）互相卡住。正确做法是每个资源一把独立的锁 key，就像 localStorage 用不同 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">key</code> 隔离不同数据。</p>
        </aside>
      </section>

      <!-- 10. 小结 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>sync.Mutex 只护得住一个进程</strong>——多实例部署时每进程一把锁，互相不知道</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>SET key value NX EX seconds</strong> 是 Redis 加锁的核心：判断 + 写入 + 过期一步原子完成</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>value 必须唯一</strong>（UUID/随机串），解锁前校验是「自己的锁」才删</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>解锁用 Lua 脚本</strong>把「检查 value + DEL」合成一个原子动作，杜绝误删别人锁</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>过期时间 + 看门狗续期</strong>：防崩溃死锁，也防任务没做完锁先没了</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Redlock</strong> = 多节点超过半数加锁，防单点 Redis 故障；但有时钟/GC 的争议，一般业务慎用</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>选型</strong>：扣库存优先数据库原子 UPDATE；跨资源组合操作才用分布式锁</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <Link :route="'go-4-10-cache-strategy'" :text="'← 上一节：缓存策略'" animation="none" size="small"
          class="p-0! text-sm! font-normal! text-slate-500! hover:text-cyan-600! bg-transparent! border-none! inline!" />
        <Link :route="'go-4-12-mongodb'" :text="'下一节：MongoDB →'" animation="none" size="small"
          class="p-0! text-sm! font-medium! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Link, Nav } from 'components'

const navList = [
  { id: "sec-1", name: "为什么需要分布式锁" },
  { id: "sec-2", name: "单进程锁的局限" },
  { id: "sec-3", name: "SETNX 原子加锁" },
  { id: "sec-4", name: "加锁的两个坑" },
  { id: "sec-5", name: "安全解锁 + Lua" },
  { id: "sec-6", name: "续期看门狗" },
  { id: "sec-7", name: "Redlock 简介" },
  { id: "sec-8", name: "用不用怎么选" },
  { id: "sec-9", name: "常见错误" },
  { id: "sec-10", name: "小结" },
]

const mutexCode = `// 单机版：sync.Mutex 只保护「本进程」内的 goroutine
var mu sync.Mutex
var count int

func incr() {
    mu.Lock()          // ① 拿锁（锁在进程内存里）
    defer mu.Unlock()  // ② 保证释放
    count++            // ③ 临界区
}

// 问题：把服务部署成 3 个实例后……
//   实例1 的 mu  vs  实例2 的 mu  vs  实例3 的 mu
//   是 3 把完全独立的锁，互相不知道对方存在
//   → 3 个实例同时通过自己的锁进入临界区 → count 被并发改写`

const setnxCmdCode = `# 加锁：key 不存在才写入（NX），10 秒自动过期（EX 10）
# 返回 OK    = 加锁成功（你是第一个写进去的人）
# 返回 (nil) = 加锁失败（key 已存在，锁被别人持有）
127.0.0.1:6379> SET lock:order:1001 "owner-aaaa" NX EX 10
OK

# 别人再试 → 失败（key 已存在，NX 不覆盖）
127.0.0.1:6379> SET lock:order:1001 "owner-bbbb" NX EX 10
(nil)

# 10 秒后锁自动消失，或者谁持有谁负责删除`

const acquireLockCode = `// acquire_lock.go — go-redis v9 加锁
package lock

import (
    "context"
    "fmt"
    "time"

    "github.com/redis/go-redis/v9"
)

// owner：每把锁唯一的标识，解锁时用它确认「是我的锁」
// 生成方式：UUID / 进程ID+随机数，绝不重复
func acquireLock(ctx context.Context, rdb *redis.Client, key, owner string, ttl time.Duration) (bool, error) {
    // SET key owner NX EX ttl —— 原子：不存在才写入 + 带上过期时间
    ok, err := rdb.SetNX(ctx, key, owner, ttl).Result()
    if err != nil {
        return false, fmt.Errorf("acquire lock: %w", err)
    }
    return ok, nil // ok == true → 加锁成功
}

func main() {
    rdb := redis.NewClient(&redis.Options{Addr: "localhost:6379"})
    ctx := context.Background()

    ok, _ := acquireLock(ctx, rdb, "lock:order:1001", "owner-aaaa", 10*time.Second)
    if ok {
        fmt.Println("拿锁成功，执行临界区")
        // 别忘了 defer releaseLock(...)
    }
}`

const unlockLuaCode = `-- unlock.lua —— 把「校验 value + 删除」做成一个原子脚本
-- KEYS[1] = 锁 key；ARGV[1] = 当前持锁人的 owner 标记
if redis.call("get", KEYS[1]) == ARGV[1] then
    -- value 确实是自己的 → 才删除
    return redis.call("del", KEYS[1])
else
    -- value 不是自己的（锁已被别人续上/重抢）→ 不删
    return 0
end`

const releaseLockCode = `// release_lock.go — go-redis 执行 Lua 解锁
// 脚本内容用普通字符串 + 换行符拼出来（内容同上面的 unlock.lua）
const unlockScript = "if redis.call(\\"get\\", KEYS[1]) == ARGV[1] then\\n" +
    "    return redis.call(\\"del\\", KEYS[1])\\n" +
    "else\\n" +
    "    return 0\\n" +
    "end\\n"

func releaseLock(ctx context.Context, rdb *redis.Client, key, owner string) error {
    // Eval：把整个 Lua 脚本作为一步原子执行，
    // 「检查 value == owner」和「del」之间不可能插入别的命令
    _, err := rdb.Eval(ctx, unlockScript, []string{key}, owner).Result()
    return err
}`

const watchdogCode = `// watchdog.go — 简化版看门狗：任务长时持锁时定期续期
func runWithLock(ctx context.Context, rdb *redis.Client, key, owner string, ttl time.Duration, fn func()) error {
    ok, err := acquireLock(ctx, rdb, key, owner, ttl)
    if err != nil { return err }
    if !ok { return errors.New("lock busy") }

    stop := make(chan struct{})
    defer close(stop)

    // 看门狗 goroutine：TTL 过半时续期，直到任务结束
    go func() {
        ticker := time.NewTicker(ttl / 2)
        defer ticker.Stop()
        for {
            select {
            case <-ticker.C:
                rdb.PExpire(ctx, key, ttl) // 重新设置过期时间 = 续期
            case <-stop:
                return
            }
        }
    }()

    defer releaseLock(ctx, rdb, key, owner) // 任务结束主动释放
    fn()
    return nil
}`

const redlockCode = `// redsync — Redlock 的 Go 实现（现成库，别手写）
package main

import (
    "github.com/go-redsync/redsync/v4"
    "github.com/go-redsync/redsync/v4/redis/goredis/v9"
    goredis "github.com/redis/go-redis/v9"
)

func main() {
    // 5 个互相独立的 Redis 节点
    addrs := []string{
        "redis-1:6379", "redis-2:6379", "redis-3:6379",
        "redis-4:6379", "redis-5:6379",
    }
    pool := goredis.NewPool( /* 第一个节点 */ )

    rs := redsync.New(pool)
    mutex := rs.NewMutex("lock:order:1001")

    if err := mutex.Lock(); err != nil { // 内部自动向多数节点 SetNX
        panic(err)
    }
    defer mutex.Unlock()

    // 临界区：只有超过半数节点都拿到锁才进来
}`
</script>
