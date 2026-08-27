<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">⚡ Redis 基础</h1>
          <p class="text-sm text-slate-500 mt-1">Redis 是什么 · 为什么快 · 5 种数据类型 · go-redis · TTL 过期 · INCR 原子自增 · 与 PostgreSQL 的关系</p>
        </div>
        <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 4-9</span>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. Redis 是什么 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          Redis 是什么：服务端的 localStorage
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Redis（REmote DIctionary Server）是一个<strong>开源的内存键值数据库</strong>。
          它把数据放在<strong>内存</strong>里，用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">key → value</code> 的形式存储，
          单次读写都是 <strong>微秒级</strong>。它常被当作<strong>缓存层</strong>架在数据库前面，挡住高频重复查询。
        </p>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">对比</th><th class="px-4 py-2 border border-slate-200 font-semibold">前端 localStorage</th><th class="px-4 py-2 border border-slate-200 font-semibold">Redis</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">存储位置</td><td class="px-4 py-2 border">浏览器（单客户端）</td><td class="px-4 py-2 border"><strong>服务端</strong>（所有客户端共享）</td></tr>
              <tr><td class="px-4 py-2 border">读写速度</td><td class="px-4 py-2 border">快（本地磁盘）</td><td class="px-4 py-2 border">更快（纯内存）</td></tr>
              <tr><td class="px-4 py-2 border">数据共享</td><td class="px-4 py-2 border">只有「当前浏览器」能读</td><td class="px-4 py-2 border">后端所有进程/实例共享</td></tr>
              <tr><td class="px-4 py-2 border">数据类型</td><td class="px-4 py-2 border">只有字符串</td><td class="px-4 py-2 border">string/hash/list/set/zset 等 5 种</td></tr>
              <tr><td class="px-4 py-2 border">过期时间</td><td class="px-4 py-2 border">手动清理</td><td class="px-4 py-2 border">原生 TTL 自动过期</td></tr>
              <tr><td class="px-4 py-2 border">持久化</td><td class="px-4 py-2 border">磁盘，刷新不丢</td><td class="px-4 py-2 border">默认内存，重启可能丢（可开 RDB/AOF）</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><br/>
          Redis ≈ 前端状态管理里的「<strong>内存缓存 + localStorage</strong>」双层级——Pinia store（内存）读起来最快但刷新就丢、localStorage 持久但要序列化且慢。Redis 就是<strong>服务端版的这个组合</strong>：它提供「所有请求共享的 store」，速度接近内存 map，还自带过期淘汰。你在浏览器里想共享两个 Tab 的状态要 BroadcastChannel，在 Redis 里天然就是全局的。</p>
        </aside>

        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 名字由来：</strong>Redis 的 value 不只是字符串，而是 5 种数据结构——<code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">REmote DIctionary Server</code>（远程字典服务器）——「字典」就是指 key-value 的映射结构。</p>
        </aside>
      </section>

      <!-- 2. 为什么快 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          为什么快：内存 + 单线程 + IO 多路复用
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Redis 的吞吐能到 <strong>10 万 + QPS</strong>，靠的是三个设计叠加：
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">原因</th><th class="px-4 py-2 border border-slate-200 font-semibold">说明</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border"><strong>纯内存</strong></td><td class="px-4 py-2 border">数据在 RAM 里，没有磁盘 IO、没有寻道、没有页缓存 miss，读写都是纳秒级的内存寻址</td></tr>
              <tr><td class="px-4 py-2 border"><strong>单线程事件循环</strong></td><td class="px-4 py-2 border">所有命令在一个线程里串行执行——<strong>没有锁、没有上下文切换竞争</strong>，从根上避免了并发问题，也保证了原子性（后文 INCR 详解）</td></tr>
              <tr><td class="px-4 py-2 border"><strong>IO 多路复用</strong></td><td class="px-4 py-2 border">epoll 同时监听成千上万个连接，谁有数据就处理谁，一个线程就能扛住海量并发连接</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-2 leading-relaxed"><strong>一次 Redis 读取的执行流程：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>客户端发 <code class="bg-slate-100 px-1 rounded font-mono text-xs">GET user:1</code> 到 Redis 端口</li>
          <li>IO 多路复用器发现这个连接可读，把命令交给事件循环</li>
          <li>单线程直接对内存里的哈希表做一次查找，拿到 value</li>
          <li>把结果写回 socket，回复客户端</li>
        </ol>

        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>Redis 的「单线程 + 事件循环」和 Go 的关系要辩证看——Go 用 <strong>goroutine + channel</strong> 做并发，靠 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">sync.Mutex</code> 保护共享数据；Redis 干脆「没有共享」——单线程天然免锁。<code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">INCR</code> 之所以原子，就是因为同一个线程内执行、没人能打断。你写的 Go 缓存（比如 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">sync.Map</code> + 过期清理）就是「自己手写的迷你 Redis」——但多个进程之间无法共享，这就是为什么要上真正的 Redis。</p>
        </aside>

        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>数据库 ≈ 图书馆仓库（书都在架子上，取书要走去找、登记）；Redis ≈ 前台柜台（最热门的书直接摆柜台，伸手就拿）。把常看的书放柜台，查询就变成「伸手」而不是「跑仓库」。</p>
        </aside>
      </section>

      <!-- 3. 5 种数据类型 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          5 种数据类型与典型场景
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          这是 Redis 区别于「一个 key 对一个字符串」的 Memcached 的关键——<strong>每种类型自带一套操作命令</strong>，
          把「排行榜、去重、消息队列」这类操作直接下沉到 Redis 里完成，省一次网络往返。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">类型</th><th class="px-4 py-2 border border-slate-200 font-semibold">本质</th><th class="px-4 py-2 border border-slate-200 font-semibold">常用命令</th><th class="px-4 py-2 border border-slate-200 font-semibold">典型场景</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-mono text-xs">string</td><td class="px-4 py-2 border">字符串 / 数字</td><td class="px-4 py-2 border font-mono text-xs">SET / GET / INCR</td><td class="px-4 py-2 border">缓存 JSON、计数器、验证码</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">hash</td><td class="px-4 py-2 border">对象（字段集合）</td><td class="px-4 py-2 border font-mono text-xs">HSET / HGET / HGETALL</td><td class="px-4 py-2 border">存一个对象的部分字段、购物车</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">list</td><td class="px-4 py-2 border">有序双向链表</td><td class="px-4 py-2 border font-mono text-xs">LPUSH / RPOP / LRANGE</td><td class="px-4 py-2 border">消息队列、最新消息列表</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">set</td><td class="px-4 py-2 border">无序去重集合</td><td class="px-4 py-2 border font-mono text-xs">SADD / SISMEMBER / SCARD</td><td class="px-4 py-2 border">去重（今日活跃用户）、抽奖</td></tr>
              <tr><td class="px-4 py-2 border font-mono text-xs">zset</td><td class="px-4 py-2 border">有序集合（带分数）</td><td class="px-4 py-2 border font-mono text-xs">ZADD / ZRANGE / ZREVRANGE</td><td class="px-4 py-2 border">排行榜、延时队列、限流</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>这 5 种类型 ≈ JS 的原生数据结构——string ≈ 变量、hash ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">object</code>、list ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">array</code>、set ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">Set</code>、zset ≈ 按分数排序的数组（排行榜天然就是它）。区别在于：JS 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">Set</code> 只能在自己页面里用，Redis 的 zset 是所有后端进程共享的、还能 O(log n) 按分数取区间。</p>
        </aside>
      </section>

      <!-- 4. go-redis 入门 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          go-redis 入门：连接与 Set / Get
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Go 最主流的 Redis 客户端是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">github.com/redis/go-redis/v9</code>（原 go-redis，被官方收购后改名为 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">redis/go-redis</code>）。
          用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">redis.NewClient</code> 建连接，所有命令都走「命令对象 → .Result()」的模式。
        </p>
        <div class="mb-4"><Code language="go" :code="connectCode" title="redis-basics.go — 连接 + Set/Get" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 注意 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">redis.Nil</code>：</strong>GET 一个不存在的 key，go-redis <strong>不返回 error=nil</strong>，而是返回 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">redis.Nil</code>。新手最容易忘判它，结果把「缓存 miss」当成「Redis 挂了」。判断 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">errors.Is(err, redis.Nil)</code> 才是「键不存在」，这是缓存代码里最常出现的分支。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 连接不是「连接」：</strong><code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">redis.NewClient</code> 并不会立刻建立 TCP 连接，它内部维护一个<strong>连接池</strong>，真正拨号发生在第一条命令执行时。所以不要忘了 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">Ping</code> 来确认连通性——和上一节的数据库连接池一个思路。</p>
        </aside>
      </section>

      <!-- 5. 数据类型实战 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          数据类型实战：HSet / SAdd / ZAdd
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          把 5 种类型落到代码里，一屏看懂它们各自的「形状」和操作方式。
        </p>
        <div class="mb-4"><Code language="go" :code="typesCode" title="redis-types.go — hash / list / set / zset" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 别用 string 硬塞数组：</strong>很多人图省事，把整个 list 用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">json.Marshal</code> 塞进一个 string key。这样「取第 2 条、往头部插、取长度」都得整存整取、重新解析——完全失去了 Redis 的操作能力。能用 hash/list/set 的，就用对应类型。</p>
        </aside>
      </section>

      <!-- 6. TTL 与 INCR -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          TTL 过期与 INCR 原子自增
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>TTL（Time To Live）</strong>是缓存的灵魂——给 key 设过期时间，Redis 到点自动删除，缓存才不会「只增不减」。
          <strong>INCR</strong> 则是单线程特性最大的红利：读-改-写三步在别处是竞态，在 Redis 里是<strong>一条原子命令</strong>。
        </p>
        <div class="mb-4"><Code language="go" :code="ttlIncrCode" title="redis-ttl-incr.go — 过期 + 原子自增" /></div>

        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>过期时间两种设置时机</strong>：SET 时带过期（<code class="bg-slate-100 px-1 rounded font-mono text-xs">Set(ctx, k, v, 10s)</code>），或事后单独 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Expire(k, 10s)</code> 追加</li>
          <li><strong>续期 = 重新 Expire</strong>：验证码场景「用户又请求一次 → 重置倒计时」就是再调一次 Expire</li>
          <li><strong>INCR 的原子性</strong>：单线程内串行执行，1000 个并发请求同时 INCR，结果一定是精确 +1000，不会丢</li>
        </ol>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 最佳实践：</strong>浏览量、点赞数这种「只加不减」的计数，别先查再改（<code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">GET → +1 → SET</code>），直接用 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">INCR</code>。它在多进程下也精确、还省一次网络往返。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>INCR ≈ JS 里的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">count++</code> 但它自带「事务」——JS 里 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">count++</code> 在并发下会丢更新（read-modify-write 竞态），Redis 的 INCR 把「读旧值 + 加一 + 写回」在服务器端一步完成，等价于你给它包了一层 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">Mutex</code>。</p>
        </aside>
      </section>

      <!-- 7. Redis 与 PostgreSQL -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          Redis 与 PostgreSQL：缓存层 vs 持久层
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>Redis 不是 PostgreSQL 的替代品，是它的加速器。</strong>两者定位完全不同，各管一段。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold">PostgreSQL（持久层）</th><th class="px-4 py-2 border border-slate-200 font-semibold">Redis（缓存层）</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">职责</td><td class="px-4 py-2 border">数据的「唯一真相」，存全量、保一致</td><td class="px-4 py-2 border">热数据的「副本」，挡高频读，可随时丢弃重建</td></tr>
              <tr><td class="px-4 py-2 border">容量</td><td class="px-4 py-2 border">磁盘，GB~TB 级</td><td class="px-4 py-2 border">内存，GB 级（贵）</td></tr>
              <tr><td class="px-4 py-2 border">速度</td><td class="px-4 py-2 border">ms 级（要 SQL 解析 + 磁盘）</td><td class="px-4 py-2 border">µs 级</td></tr>
              <tr><td class="px-4 py-2 border">查询</td><td class="px-4 py-2 border">任意复杂 SQL、JOIN、事务、外键</td><td class="px-4 py-2 border">只有「按 key」+ 有限的区间/成员操作</td></tr>
              <tr><td class="px-4 py-2 border">持久性</td><td class="px-4 py-2 border">崩溃不丢（WAL + fsync）</td><td class="px-4 py-2 border">默认内存，重启可丢（需开 RDB/AOF）</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-2 leading-relaxed"><strong>典型合作姿势：</strong>写操作走 PostgreSQL（保证不丢、可回滚）；读操作先查 Redis，命中直接返回，miss 再回 PostgreSQL 把结果填回 Redis。所以 Redis 里永远是「别人数据的副本」——丢了也不慌，回源重建即可。</p>

        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>这个「副本可丢弃」的心智模型，和 Go 的 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">sync.Map</code> 完全一致——内存里那份数据随时能丢，磁盘（或数据库）那份才是底。差别在：sync.Map 只属于一个进程，Redis 能跨进程、跨机器共享，还带淘汰策略（LRU/LFU）和过期。</p>
        </aside>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 别把 Redis 当数据库：</strong>如果你开始用 Redis 存「丢了就完蛋」的数据（订单、余额、用户档案主数据），说明用错了。Redis 默认持久化薄弱，崩溃丢数据、内存存不下全量、无法做复杂关联查询。正确姿势：<strong>数据库是真相，Redis 是加速副本。</strong></p>
        </aside>
      </section>

      <!-- 8. 常见错误 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          常见错误
        </h2>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>忘记判断 redis.Nil</strong>——把「键不存在」当成「Redis 故障」抛错，导致缓存 miss 直接 panic</li>
          <li><strong>用 string 塞一切</strong>——该用 hash/list/set 的场景整串序列化，丧失 Redis 的操作能力</li>
          <li><strong>大 key</strong>——单个 key 塞几 MB 数据，一次读取阻塞 Redis 单线程，拖垮所有请求（教训：单 key 要小）</li>
          <li><strong>不带过期时间</strong>——缓存只进不出，内存涨爆被 maxmemory 淘汰，命中率雪崩</li>
          <li><strong>生产裸奔</strong>——默认 6379 无密码无 ACL，公网暴露直接被人当肉鸡（务必设密码 + 只绑内网）</li>
        </ol>

        <div class="mb-4"><Code language="go" :code="errCode" title="✅ 正确姿势一览" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 大 key 的危害：</strong>Redis 是单线程，一条 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">GET</code> 拿到 5MB 数据要序列化、网络传输，这段时间内<strong>所有其他命令都被卡住</strong>。这就是「一个 key 拖垮全库」的场景。</p>
        </aside>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Redis = 服务端的 key-value 内存数据库</strong>，多客户端共享、微秒级读写，≈ 前端的「Pinia + localStorage」但放到后端</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>快的原因三件套</strong>：纯内存 + 单线程事件循环（免锁免竞争）+ IO 多路复用（epoll）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>5 种数据类型</strong>：string（计数/缓存）、hash（对象字段）、list（队列/最新列表）、set（去重）、zset（排行榜/延时队列）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>go-redis</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">NewClient</code> 建连接，命令对象 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">.Result()</code> 取结果，<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">redis.Nil</code> = 键不存在</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>TTL 过期</strong>是缓存不涨爆的关键；<strong>INCR</strong> 利用单线程实现原子自增，多进程也精确</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Redis ≠ 数据库</strong>：PostgreSQL 是真相（持久、复杂查询、事务），Redis 是可丢弃的加速副本——下一节就讲怎么把它们安全地拼起来（缓存策略）</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <Link :route="'go-4-8-transactions'" :text="'← 上一节：事务'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-cyan-600! bg-transparent! border-none! inline!" />
        <Link :route="'go-4-10-cache-strategy'" :text="'下一节：缓存策略 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Link, Nav } from 'components'

const navList = [
  { id: "sec-1", name: "Redis 是什么" },
  { id: "sec-2", name: "为什么快" },
  { id: "sec-3", name: "5 种数据类型" },
  { id: "sec-4", name: "go-redis 入门" },
  { id: "sec-5", name: "数据类型实战" },
  { id: "sec-6", name: "TTL 与 INCR" },
  { id: "sec-7", name: "与 PostgreSQL 的关系" },
  { id: "sec-8", name: "常见错误" },
  { id: "sec-9", name: "小结" },
]

const connectCode = `package main

import (
    "context"
    "fmt"

    "github.com/redis/go-redis/v9"
)

func main() {
    // 1. 连接 Redis（默认 127.0.0.1:6379）
    rdb := redis.NewClient(&redis.Options{
        Addr:     "localhost:6379",
        Password: "", // 无密码
        DB:       0,  // 默认库 0
    })
    ctx := context.Background()

    // 2. Ping 确认连通
    pong, err := rdb.Ping(ctx).Result()
    if err != nil {
        panic(err)
    }
    fmt.Println("ping:", pong)
    // 输出: ping: PONG

    // 3. 写入 + 读取（0 = 不过期）
    err = rdb.Set(ctx, "user:1", "Alice", 0).Err()
    if err != nil {
        panic(err)
    }

    val, err := rdb.Get(ctx, "user:1").Result()
    if err == redis.Nil { // ← 键不存在，不是故障！
        fmt.Println("key 不存在")
    } else if err != nil {
        panic(err)
    } else {
        fmt.Println("user:1 =", val)
    }
    // 输出: user:1 = Alice
}`

const typesCode = `package main

import (
    "context"
    "fmt"
    "time"

    "github.com/redis/go-redis/v9"
)

func main() {
    rdb := redis.NewClient(&redis.Options{Addr: "localhost:6379"})
    ctx := context.Background()

    // string — 缓存 JSON
    rdb.Set(ctx, "user:1", "{\\"name\\":\\"Alice\\",\\"age\\":18}", time.Hour)

    // hash — 对象字段可单独读写（只改 views 不动 title）
    rdb.HSet(ctx, "article:42", "title", "Go 缓存实践", "views", 100)
    title := rdb.HGet(ctx, "article:42", "title").Val()
    fmt.Println("标题:", title)
    // 输出: 标题: Go 缓存实践

    // list — 最新消息（LPUSH 头插 + LRange 取前 3 条）
    rdb.LPush(ctx, "news", "消息3", "消息2", "消息1")
    news, _ := rdb.LRange(ctx, "news", 0, 2).Result()
    fmt.Println("最新消息:", news)
    // 输出: 最新消息: [消息3 消息2 消息1]

    // set — 去重集合（u1 加了两次只存一个）
    rdb.SAdd(ctx, "active:2026-08-27", "u1", "u2", "u1")
    count := rdb.SCard(ctx, "active:2026-08-27").Val()
    fmt.Println("活跃人数:", count)
    // 输出: 活跃人数: 2

    // zset — 排行榜（按分数排序）
    rdb.ZAdd(ctx, "ranking", redis.Z{Score: 98, Member: "Alice"})
    rdb.ZAdd(ctx, "ranking", redis.Z{Score: 100, Member: "Bob"})
    top, _ := rdb.ZRevRange(ctx, "ranking", 0, 0).Result() // 分数从高到低第 1 名
    fmt.Println("第一名:", top[0])
    // 输出: 第一名: Bob
}`

const ttlIncrCode = `package main

import (
    "context"
    "fmt"
    "time"

    "github.com/redis/go-redis/v9"
)

func main() {
    rdb := redis.NewClient(&redis.Options{Addr: "localhost:6379"})
    ctx := context.Background()

    // 1. 设置 10 秒过期（验证码/会话场景）
    rdb.Set(ctx, "code:13800000000", "8899", 10*time.Second)
    ttl := rdb.TTL(ctx, "code:13800000000").Val()
    fmt.Println("剩余存活:", ttl)
    // 输出: 剩余存活: 10s

    // 2. 续期：用户又请求了一次 → 重置倒计时
    rdb.Expire(ctx, "code:13800000000", 10*time.Second)

    // 3. 删除 + 确认
    rdb.Del(ctx, "code:13800000000")
    n := rdb.Exists(ctx, "code:13800000000").Val()
    fmt.Println("键还存在吗:", n)
    // 输出: 键还存在吗: 0

    // 4. INCR 原子自增 — 计数器/限流（多进程并发也精确）
    rdb.Set(ctx, "page:view", 99, 0)
    newVal := rdb.Incr(ctx, "page:view").Val()
    fmt.Println("自增后:", newVal)
    // 输出: 自增后: 100
}`

const errCode = `// ✅ 正确姿势

// 1) 判断键不存在
val, err := rdb.Get(ctx, "user:1").Result()
if errors.Is(err, redis.Nil) {
    // 缓存 miss → 回数据库查
} else if err != nil {
    return err // 真正的网络故障
}

// 2) 计数器用 INCR，不要 GET+SET
rdb.Incr(ctx, "article:42:views")

// 3) 缓存必带过期时间，防内存涨爆
rdb.Set(ctx, "hot:list", data, 5*time.Minute)

// 4) 别用 string 硬塞数组/对象，按类型选命令
//    hash → 对象字段    list → 队列    zset → 排行榜`
</script>
