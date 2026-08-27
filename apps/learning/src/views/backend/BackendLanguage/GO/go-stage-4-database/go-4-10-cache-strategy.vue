<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-semibold text-slate-800">🗄️ 缓存策略</h1>
          <p class="text-sm text-slate-500 mt-1">为什么用缓存 · Cache Aside · 穿透/击穿/雪崩 · 缓存一致性 · INCR/TTL 配合</p>
        </div>
        <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 4-10</span>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 为什么用缓存 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          为什么用缓存：读多写少
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          绝大多数业务都是<strong>读多写少</strong>——一个商品被读 10000 次才被改 1 次，一篇博客被看 1000 次才更新 1 次。
          如果每次都去 PostgreSQL 执行 SQL、走磁盘 IO，数据库很快成为瓶颈。缓存的意义就是：<strong>把「读得最热的数据」从慢的持久层搬到快的内存层</strong>，让 90% 的请求在缓存就拿到答案。
        </p>
        <div class="mb-4"><Code language="text" :code="whyCode" title="读多写少的数量级对比" /></div>

        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>数据库（PostgreSQL）</strong>：ms 级——SQL 解析、索引查找、磁盘读页，一次几毫秒</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>缓存（Redis）</strong>：µs 级——内存哈希查一下，一次几十微秒</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>量级差距 ≈ 100 倍</strong>——命中缓存时数据库连接压力直接减 90%</span></li>
        </ul>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>「读多写少」在前端就是状态管理的作用范围——Pinia store 里存了用户资料，<strong>绝大多数组件读它，只有登录/改资料时才写</strong>。Redis 缓存是同一件事的服务端版：一次写库，无数次读缓存。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 缓存不是银弹：</strong>如果业务是「写多读少」（比如日志流水、传感器数据），缓存收益很低，反而引入「缓存和库不一致」的新问题。<strong>先用数据验证读多写少，再上缓存。</strong></p>
        </aside>
      </section>

      <!-- 2. Cache Aside 模式 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          Cache Aside（旁路缓存）：最常用的缓存模式
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          Cache Aside 是<strong>面试必背、生产最常用</strong>的缓存模式。核心一句话：<strong>读——先查缓存，miss 再查库并回填；写——先写数据库，再删缓存。</strong>
        </p>

        <p class="text-slate-600 mb-2 leading-relaxed"><strong>读流程（先查缓存）：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>请求进来，先查 Redis（<code class="bg-slate-100 px-1 rounded font-mono text-xs">GET user:1</code>）</li>
          <li><strong>命中</strong>：直接把缓存里的数据返回，结束——最快路径</li>
          <li><strong>miss</strong>（<code class="bg-slate-100 px-1 rounded font-mono text-xs">redis.Nil</code>）：去 PostgreSQL 查真实数据</li>
          <li>查回来后<strong>回填缓存</strong>（<code class="bg-slate-100 px-1 rounded font-mono text-xs">SET user:1 ... 10min</code>），再返回给客户端</li>
        </ol>

        <p class="text-slate-600 mb-2 leading-relaxed"><strong>写流程（先写库，再删缓存）：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>先更新 PostgreSQL（真正的数据源）</li>
          <li><strong>删除 Redis 里的对应 key</strong>——而不是去更新缓存</li>
          <li>下次读时 miss，自然走「查库 → 回填」流程，拿到新数据</li>
        </ol>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>Cache Aside ≈ React Query 的「缓存 + 失效」——React Query 里 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">staleTime</code> 内直接返回缓存，<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">queryKey</code> 变化就重新拉取；写操作后调用 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">invalidateQueries(key)</code> 让缓存失效、下次重新请求。Cache Aside 的「删缓存」就是服务端版的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">invalidateQueries</code>。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 为什么写要「删」而不是「更新」？</strong>更新缓存容易写脏——并发场景下你更新的是一个中间态、或格式和库里不一致。删掉它，让下一次读 miss 后从库里拿到<strong>最新最全</strong>的数据回填，简单又安全。</p>
        </aside>
      </section>

      <!-- 3. Cache Aside 完整实现 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          Cache Aside 完整实现（Go）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          把上面的流程写成 go-redis 代码。注意几个容易踩的细节：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">redis.Nil</code> 判断、JSON 序列化、回填带过期时间。
        </p>
        <div class="mb-4"><Code language="go" :code="cacheAsideCode" title="cache-aside.go — 读回填 + 写删除" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 读多写少的绝配：</strong>Cache Aside 读路径最快（纯缓存命中），写路径最稳（库是真相，缓存永远可重建）。绝大多数系统直接用它就够，先别上更复杂的模式。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 千万别先删缓存再写库：</strong>顺序错了会丢更新——先删缓存，写库中途，另一个请求读 miss → 回填了<strong>旧数据</strong>，写库完成后缓存里是旧的，脏数据长期存在。所以规范是<strong>先写库、后删缓存</strong>（细节见第 7 节）。</p>
        </aside>
      </section>

      <!-- 4. 缓存穿透 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          缓存穿透：查了不存在的 key
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>穿透</strong>：请求的 key 在<strong>缓存和数据库都不存在</strong>——缓存永远 miss，每次都打到数据库。
          攻击者拿随机 id 狂刷 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">GET user:-1</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">GET user:-2</code>...，数据库被无效查询打爆。
        </p>

        <p class="text-slate-600 mb-2 leading-relaxed"><strong>解法一：空值缓存</strong>——查库没查到，也把「空」缓存起来（短过期）。</p>
        <div class="mb-4"><Code language="go" :code="penetrationCode" title="空值缓存 — 防穿透" /></div>

        <p class="text-slate-600 mb-2 leading-relaxed"><strong>解法二：布隆过滤器</strong>——请求先过一层「可能存在」过滤器，判断 id 一定不存在就直接拒绝，根本不碰缓存和库。</p>
        <div class="mb-4"><Code language="go" :code="bloomCode" title="布隆过滤器 — 拦截不存在的 key" /></div>

        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">方案</th><th class="px-4 py-2 border border-slate-200 font-semibold">原理</th><th class="px-4 py-2 border border-slate-200 font-semibold">适用</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">空值缓存</td><td class="px-4 py-2 border">把「查无此人」也缓存起来</td><td class="px-4 py-2 border">key 数量有限、恶意刷量场景</td></tr>
              <tr><td class="px-4 py-2 border">布隆过滤器</td><td class="px-4 py-2 border">位图判断 key 是否「可能存在」，不存在直接短路</td><td class="px-4 py-2 border">key 集合很大、不存在是常态（如用户 id 校验）</td></tr>
              <tr><td class="px-4 py-2 border">参数校验</td><td class="px-4 py-2 border">id ≤ 0、超长、格式非法直接拒绝</td><td class="px-4 py-2 border">最简单的第一道防线，必须有</td></tr>
            </tbody>
          </table>
        </div>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>空值缓存 ≈ 前端给「搜不到结果」也做个本地缓存——用户搜了「没有的商品」，本地把「无结果」记 30 秒，避免每次输入都重新发请求。布隆过滤器 ≈ 一个「肯定没有的黑名单」——先查一下黑名单，命不中就根本不发请求。</p>
        </aside>
      </section>

      <!-- 5. 缓存击穿 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          缓存击穿：热点 key 过期瞬间
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>击穿</strong>：一个<strong>热点 key</strong>（秒杀商品、热门视频）在过期的一瞬间，大量请求同时 miss，<strong>一起</strong>打到数据库。
          数据库一瞬间被 N 个相同查询打垮。
        </p>

        <p class="text-slate-600 mb-2 leading-relaxed"><strong>解法一：互斥锁</strong>——同一时刻只让一个请求回源，其余排队等它把缓存填好。</p>
        <div class="mb-4"><Code language="go" :code="breakdownCode" title="互斥锁 — 防击穿（只放一个请求回源）" /></div>

        <p class="text-slate-600 mb-2 leading-relaxed"><strong>解法二：逻辑过期</strong>——不设真正的 TTL，而是把过期时间存进 value，读的时候发现「逻辑过期」就异步重建。</p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>优点：读永远不会 miss，热点 key 不过期，数据「看起来」永远新鲜</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span>缺点：数据会短暂不一致（返回的是旧值），需要后台任务主动刷新</span></li>
        </ul>

        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>击穿 ≈ <strong>演唱会抢票</strong>——某一张热门票（热点 key）一放出，成千上万人同时抢（同时 miss），售票系统瞬间被挤爆。互斥锁就是「只放一个人进柜台，他买到后大家复制他的结果」。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>互斥锁防击穿 ≈ 在 Go 里用 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">sync.Mutex</code> 包住回源操作，再加一次「double check」——拿到锁后先再看一眼缓存，避免重复回源。更高级的版本是 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">singleflight</code> 包：自动合并同一 key 的并发请求，只真正执行一次。</p>
        </aside>
      </section>

      <!-- 6. 缓存雪崩 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          缓存雪崩：大量 key 同时过期
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>雪崩</strong>：一大批 key<strong>在同一时刻集体过期</strong>（比如都在午夜 0 点设了 24h 过期），于是下一秒所有请求一起 miss，流量洪水般涌向数据库。<strong>穿透打一个，击穿打一个，雪崩打一片。</strong>
        </p>
        <div class="mb-4"><Code language="go" :code="avalancheCode" title="过期时间加随机抖动 — 防雪崩" /></div>

        <p class="text-slate-600 mb-2 leading-relaxed"><strong>雪崩的三道防线：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>过期时间加随机抖动</strong>——把「集体过期」打散成「错峰过期」（上面的代码）</li>
          <li><strong>Redis 高可用</strong>——主从 + 哨兵 / 集群，Redis 本身不挂，缓存层就不整体失效</li>
          <li><strong>多级缓存</strong>——Redis 之上再加一层进程内缓存（Go 的 <code class="bg-slate-100 px-1 rounded font-mono text-xs">sync.Map</code>），Redis 挂了还有兜底</li>
        </ol>

        <aside class="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-orange-800"><strong>🌍 现实类比：</strong>雪崩 ≈ <strong>大规模停电</strong>——所有空调同一时间集体关掉（所有 key 同时过期），电网（数据库）瞬间压力爆表；而「加随机抖动」就是让每台空调延迟 0~60 秒再关，错峰恢复，电网就不会被击穿。</p>
        </aside>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 和击穿怎么区分：</strong>击穿是「一个」热点 key 过期被打；雪崩是「一片」key 同时过期被打。解法也不同：击穿用互斥锁/逻辑过期，雪崩用随机抖动 + 高可用。</p>
        </aside>
      </section>

      <!-- 7. 缓存一致性 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          缓存一致性：先删缓存还是先写库？
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          写操作时序是缓存一致性的核心考点。两条路各有坑，生产标准答案是<strong>「先写库，再删缓存」</strong>。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">顺序</th><th class="px-4 py-2 border border-slate-200 font-semibold">过程</th><th class="px-4 py-2 border border-slate-200 font-semibold">问题</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border"><strong>先删缓存，再写库</strong></td><td class="px-4 py-2 border">删缓存 → 写库（中途）</td><td class="px-4 py-2 border">写库完成前，有读请求 miss → 回填<strong>旧数据</strong> → 写库完成后缓存是脏的，长期不一致</td></tr>
              <tr><td class="px-4 py-2 border"><strong>先写库，再删缓存</strong></td><td class="px-4 py-2 border">写库 → 删缓存</td><td class="px-4 py-2 border">窗口极小：删缓存失败可能残留旧值，但概率低、且可加「重试/延迟双删」兜底</td></tr>
            </tbody>
          </table>
        </div>

        <p class="text-slate-600 mb-2 leading-relaxed"><strong>为什么「先写库再删缓存」只留下一个极小的窗口：</strong></p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>写库完成后，旧缓存理论上<strong>一定会被删掉</strong>（除非删失败）</li>
          <li>写库完成前，读请求读到的还是<strong>旧缓存</strong>——旧值也能用，不算脏</li>
          <li>唯一风险是删缓存那一步失败，补救：删缓存失败就<strong>重试</strong>，或延迟几秒再删一次（延迟双删）</li>
        </ol>

        <div class="mb-4"><Code language="go" :code="consistencyCode" title="先写库再删缓存 + 删除失败重试" /></div>

        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 一致性要求不高时：</strong>很多场景「允许几秒内读到旧值」——比如文章阅读量、商品详情。那 Cache Aside 的「先写库再删缓存」就够了，别为了强一致上消息队列。<strong>缓存一致性是最终一致性，不是强一致性。</strong></p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 追求「缓存与库实时一致」是反模式：</strong>越强的一致越要付出性能/复杂度代价。缓存本质是「允许短暂过期」的副本——接受几秒偏差，换来 100 倍读性能，是这笔交易划算的前提。</p>
        </aside>
      </section>

      <!-- 8. INCR / TTL 配合 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          INCR / TTL 配合：滑动窗口限流
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">INCR</code> 做计数、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">TTL</code> 做「计数窗口到期自动清零」——两者配合是限流、防刷的标准姿势，也是穿透/击穿之外的兜底防御。
        </p>
        <div class="mb-4"><Code language="go" :code="incrTtlCode" title="滑动窗口限流 — 每 10 秒最多 5 次" /></div>

        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>key 里带时间片（<code class="bg-slate-100 px-1 rounded font-mono text-xs">Unix()/10</code>），每 10 秒自动换一个新 key</li>
          <li>第一次 INCR 返回 1 时顺手设过期——窗口结束 key 自动消失，<strong>不需要手动清理</strong></li>
          <li>超过阈值返回「太频繁」，完美挡住恶意刷接口</li>
        </ol>

        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>这个「INCR + TTL」≈ 前端的<strong>防抖（debounce）/ 节流（throttle）</strong>——用户狂点按钮时合并/丢弃多余请求。服务端没有 debounce 可用，就靠 Redis 的这个计数窗口实现「服务端节流」。</p>
        </aside>
      </section>

      <!-- 9. 常见错误 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">9</span>
          常见错误与反模式
        </h2>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><strong>穿透过</strong>——查库不存在的 key 也去查缓存，还没做空值缓存/布隆过滤，数据库被无效查询打爆</li>
          <li><strong>击穿过</strong>——热点 key 用固定过期，过期的瞬间没有互斥锁，流量同时涌向数据库</li>
          <li><strong>雪崩过</strong>——所有 key 统一 TTL，一到点集体过期</li>
          <li><strong>写缓存不删缓存</strong>——写库后去 SET 缓存而不是 DEL，容易写进中间态/旧数据</li>
          <li><strong>缓存当数据库</strong>——缓存里存的是「不可重建」的主数据，Redis 一重启业务就崩</li>
          <li><strong>所有请求都加缓存</strong>——写多读少、变化极频繁的数据也缓存，命中率低、一致性差，得不偿失</li>
        </ol>

        <div class="mb-4"><Code language="go" :code="antiPatternCode" title="❌ 反模式一览" /></div>

        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 一句话记住三者：</strong>穿透查的是<strong>不存在</strong>的 key（空值缓存/布隆过滤器治）→ 击穿是<strong>单个热点</strong>过期（互斥锁/逻辑过期治）→ 雪崩是<strong>一大片</strong>同时过期（随机抖动/高可用治）。</p>
        </aside>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4">
          <p class="text-sm text-emerald-800"><strong>✅ 兜底护栏：</strong>缓存层扛不住时，数据库侧也要有保护——连接池限制、慢查询监控、限流降级（第 8 节的 INCR 限流就是其中一道）。缓存是盾，数据库的护栏也是盾。</p>
        </aside>
      </section>

      <!-- 10. 小结 -->
      <section id="sec-10" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>缓存的适用前提</strong>：读多写少，用数据验证再上，否则是负优化</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Cache Aside</strong>：读——先缓存，miss 查库回填；写——先写库，再删缓存</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>穿透</strong>（查不存在）：空值缓存 / 布隆过滤器 / 参数校验</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>击穿</strong>（单热点过期）：互斥锁 + double check / 逻辑过期</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>雪崩</strong>（一片同时过期）：TTL 加随机抖动 / Redis 高可用 / 多级缓存</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>一致性</strong>：接受「几秒内旧值」的最终一致性，先写库再删缓存 + 删除失败重试</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>INCR + TTL</strong>：滑动窗口限流，服务端的「节流」，防刷兜底</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <Link :route="'go-4-9-redis-basics'" :text="'← 上一节：Redis 基础'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-cyan-600! bg-transparent! border-none! inline!" />
        <Link :route="'go-4-11-distributed-lock'" :text="'下一节：分布式锁 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Link, Nav } from 'components'

const navList = [
  { id: "sec-1", name: "为什么用缓存" },
  { id: "sec-2", name: "Cache Aside 模式" },
  { id: "sec-3", name: "Cache Aside 实现" },
  { id: "sec-4", name: "缓存穿透" },
  { id: "sec-5", name: "缓存击穿" },
  { id: "sec-6", name: "缓存雪崩" },
  { id: "sec-7", name: "缓存一致性" },
  { id: "sec-8", name: "INCR/TTL 限流" },
  { id: "sec-9", name: "常见错误" },
  { id: "sec-10", name: "小结" },
]

const whyCode = `# 同一个接口，两个数据源的量级
# 读 10000 次  /  写 1 次

直接查 PostgreSQL :  10000 × 5ms = 50s    ← 数据库累瘫
先查 Redis 缓存  :   9000 × 50µs + 1000 × 5ms ≈ 5.5s
                    ↑ 90% 命中缓存          ↑ 10% miss 回源

结论: 命中率 90% 时，整体读耗时降一个数量级`

const cacheAsideCode = `package main

import (
    "context"
    "encoding/json"
    "errors"
    "fmt"
    "time"

    "github.com/redis/go-redis/v9"
)

// 读：先查缓存 → miss 查库 → 回填
func getUser(ctx context.Context, rdb *redis.Client,
    db *DB, id int) (*User, error) {

    key := fmt.Sprintf("user:%d", id)

    // 1. 先查缓存
    val, err := rdb.Get(ctx, key).Result()
    if err == nil { // 命中 → 直接返回
        var u User
        json.Unmarshal([]byte(val), &u)
        return &u, nil
    }
    if !errors.Is(err, redis.Nil) {
        return nil, err // 真故障，别吞
    }

    // 2. miss → 查数据库
    u, err := db.GetUserByID(id)
    if err != nil {
        return nil, err
    }

    // 3. 回填缓存（带过期时间）
    data, _ := json.Marshal(u)
    rdb.Set(ctx, key, data, 10*time.Minute)
    return u, nil
}

// 写：先写数据库，再删缓存（不是更新缓存！）
func updateUser(ctx context.Context, rdb *redis.Client,
    db *DB, u *User) error {

    if err := db.UpdateUser(u); err != nil {
        return err
    }
    // 删掉旧缓存，让下次读 miss → 回填新数据
    rdb.Del(ctx, fmt.Sprintf("user:%d", u.ID))
    return nil
}`

const penetrationCode = `// 缓存穿透解决：空值缓存
func getUser(ctx context.Context, rdb *redis.Client,
    db *DB, id int) (*User, error) {

    key := fmt.Sprintf("user:%d", id)
    val, err := rdb.Get(ctx, key).Result()
    if err == nil {
        if val == "" { // 命中"空值占位"
            return nil, ErrNotFound
        }
        var u User
        json.Unmarshal([]byte(val), &u)
        return &u, nil
    }
    if !errors.Is(err, redis.Nil) {
        return nil, err
    }

    u, err := db.GetUserByID(id)
    if errors.Is(err, ErrNotFound) {
        // 查无此人 → 也缓存，但短过期，防穿透
        rdb.Set(ctx, key, "", 30*time.Second)
        return nil, ErrNotFound
    }
    if err != nil {
        return nil, err
    }

    data, _ := json.Marshal(u)
    rdb.Set(ctx, key, data, 10*time.Minute)
    return u, nil
}`

const bloomCode = `// 缓存穿透解决：布隆过滤器（用一个库实现）
import "github.com/bits-and-blooms/bloom/v3"

var filter = bloom.NewWithEstimates(1_000_000, 0.01) // 100万 id，1% 误判

// 预热：启动时把所有合法 id 塞进过滤器
func init() {
    for _, id := range loadAllUserIDs() {
        filter.AddString(id)
    }
}

// 请求入口：不存在 → 直接短路，不碰缓存和数据库
func getUserByID(id string) (*User, error) {
    if !filter.TestString(id) { // 一定不存在
        return nil, ErrNotFound
    }
    // 可能存在 → 才走「缓存 → 数据库」
    return cacheAsideGet(id)
}

// ⚠️ 布隆过滤器只保证"不存在一定拒绝"，
//    "可能存在"仍可能误判，所以只能挡穿透，不能省掉回源逻辑`

const breakdownCode = `// 缓存击穿解决：互斥锁 + double check
var userMu sync.Mutex // 每个热点 key 一把锁（简化示例用一把）

func getUser(ctx context.Context, rdb *redis.Client,
    db *DB, id int) (*User, error) {

    key := fmt.Sprintf("user:%d", id)

    // 快路径：先查一次缓存
    if val, err := rdb.Get(ctx, key).Result(); err == nil {
        var u User
        json.Unmarshal([]byte(val), &u)
        return &u, nil
    }

    // 慢路径：加锁，只放一个请求回源
    userMu.Lock()
    defer userMu.Unlock()

    // double check：拿到锁后缓存可能已被别人填好
    if val, err := rdb.Get(ctx, key).Result(); err == nil {
        var u User
        json.Unmarshal([]byte(val), &u)
        return &u, nil
    }

    // 真回源（此刻只有本请求在执行）
    u, err := db.GetUserByID(id)
    if err != nil {
        return nil, err
    }
    data, _ := json.Marshal(u)
    rdb.Set(ctx, key, data, 10*time.Minute)
    return u, nil
}`

const avalancheCode = `// 缓存雪崩解决：过期时间加随机抖动
func setCache(ctx context.Context, rdb *redis.Client,
    key string, data []byte) error {

    // 基准 5 分钟 + 随机 0~60 秒 → key 错峰过期
    ttl := 5*time.Minute + time.Duration(rand.Intn(60))*time.Second
    return rdb.Set(ctx, key, data, ttl).Err()
}

// 调用侧：批量预热时也逐个打散
for _, item := range hotItems {
    ttl := 5*time.Minute + time.Duration(rand.Intn(60))*time.Second
    rdb.Set(ctx, "item:"+item.ID, item.Data, ttl)
}`

const consistencyCode = `// 缓存一致性：先写库，再删缓存，删除失败重试
func updateUser(ctx context.Context, rdb *redis.Client,
    db *DB, u *User) error {

    if err := db.UpdateUser(u); err != nil { // ① 先写库
        return err
    }

    // ② 再删缓存（失败就重试几次）
    key := fmt.Sprintf("user:%d", u.ID)
    if err := rdb.Del(ctx, key).Err(); err != nil {
        // 简化版重试：生产可用消息队列/延迟队列保证最终删除
        time.Sleep(100 * time.Millisecond)
        _ = rdb.Del(ctx, key).Err()
    }
    return nil
}`

const incrTtlCode = `// INCR + TTL 配合：滑动窗口限流
func rateLimit(ctx context.Context, rdb *redis.Client,
    userID int64) error {

    // key 带时间片：每 10 秒换一个新窗口
    key := fmt.Sprintf("rate:%d:%d", userID, time.Now().Unix()/10)

    count := rdb.Incr(ctx, key).Val()
    if count == 1 {
        // 窗口到期自动消失，不用手动清理
        rdb.Expire(ctx, key, 10*time.Second)
    }

    if count > 5 { // 每 10 秒最多 5 次
        return errors.New("请求过于频繁")
    }
    return nil
}`

const antiPatternCode = `// ❌ 反模式 1：写库后去更新缓存（而不是删除）
rdb.Set(ctx, key, newData, 0) // 可能写进中间态/旧数据

// ✅ 正确：删除缓存，让下次读 miss 回填

// ❌ 反模式 2：所有 key 统一 24h 过期 → 集体雪崩
rdb.Set(ctx, "a", data, 24*time.Hour)
rdb.Set(ctx, "b", data, 24*time.Hour)
rdb.Set(ctx, "c", data, 24*time.Hour)

// ✅ 正确：TTL 加随机抖动，错峰过期

// ❌ 反模式 3：查库没结果不缓存 → 被穿透
u, err := db.GetUserByID(id)
if err != nil { return err }  // 忘记空值缓存

// ✅ 正确：ErrNotFound 也 SET 空值，短过期`
</script>
