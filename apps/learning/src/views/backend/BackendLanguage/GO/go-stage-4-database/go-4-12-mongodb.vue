<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🍃 MongoDB 文档数据库</h1>
          <p class="text-sm text-slate-500 mt-1">NoSQL 是什么 · 与 PostgreSQL 对比 · BSON · ObjectID · mongo-driver 增删改查 · 适用场景</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 4-12</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 什么是文档数据库 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          什么是文档数据库（NoSQL）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          MongoDB 是<strong>文档型 NoSQL 数据库</strong>。它不建表、不写 SQL，数据以 <strong>BSON 文档</strong>（二进制 JSON）存储——每一条记录就是一个「JSON 对象」，多个记录放在一个<strong>集合（Collection）</strong>里。
        </p>
        <div class="mb-4"><Code language="json" :code="docExampleCode" title="一个「文档」长什么样（博客文章）" /></div>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>数据库</strong> → <strong>集合</strong> → <strong>文档</strong>，三级结构（≈ MySQL 的 库 → 表 → 行）</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>每条文档自带一个 _id 主键</strong>，不指定时自动生成 ObjectID</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>文档字段不固定</strong>：这条有 <code class="bg-slate-100 px-1 rounded font-mono text-xs">tags</code>，那条没有，完全允许</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>支持嵌套结构</strong>：数组、对象、再嵌套，天然贴合业务对象</span></li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>MongoDB ≈ 直接用 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">localStorage</code> 存 JSON——存进去的是 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">{ key: value }</code> 对象本身，取出来还是那个对象，<strong>读写中间没有「表结构」这道门槛</strong>。而 PostgreSQL ≈ <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">SQLite</code>/IndexedDB——先定好列，再往里塞行。</p>
        </aside>
      </section>

      <!-- 2. 关系型 vs 文档型 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          PostgreSQL vs MongoDB：关系型 vs 文档型
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">维度</th><th class="px-4 py-2 border border-slate-200 font-semibold">PostgreSQL（关系型）</th><th class="px-4 py-2 border border-slate-200 font-semibold">MongoDB（文档型）</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">存储单元</td><td class="px-4 py-2 border">表（Table）→ 行（Row）</td><td class="px-4 py-2 border">集合（Collection）→ 文档（Document）</td></tr>
              <tr><td class="px-4 py-2 border">结构</td><td class="px-4 py-2 border">列固定，插入前必须建表；缺列得 ALTER TABLE</td><td class="px-4 py-2 border">schema 灵活，字段随意增减、嵌套，不需要迁移</td></tr>
              <tr><td class="px-4 py-2 border">关系</td><td class="px-4 py-2 border">外键 + JOIN 多表联查</td><td class="px-4 py-2 border">直接内嵌子文档 / 数组；跨集合 JOIN 弱（$lookup）</td></tr>
              <tr><td class="px-4 py-2 border">查询语言</td><td class="px-4 py-2 border">SQL（声明式，标准统一）</td><td class="px-4 py-2 border">find({...}) 传 JSON 条件对象</td></tr>
              <tr><td class="px-4 py-2 border">事务</td><td class="px-4 py-2 border">ACID 强事务是核心卖点</td><td class="px-4 py-2 border">多文档事务 4.0+ 才有，能力弱、慎用</td></tr>
              <tr><td class="px-4 py-2 border">典型场景</td><td class="px-4 py-2 border">钱、账、订单等强一致业务</td><td class="px-4 py-2 border">日志、内容、异构数据、快速迭代</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>你在本阶段前面用 PostgreSQL + Drizzle/SQL 写<strong>菜单、权限</strong>这类结构强相关的数据——关系型里改一列要 ALTER TABLE，用 Go 结构体一行行映射。MongoDB 则像 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">map[string]interface{}</code>：<strong>存什么字段、几层嵌套都是运行时决定的</strong>，对应的 Go 结构体甚至可以省掉——直接读写 map。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 别被「无 schema」骗了：</strong>字段随意增减确实方便，但<strong>没有约束 = 脏数据自由生长</strong>。「标题有时叫 title 有时叫 headline」这种错别字式字段在真实库里很常见。生产环境建议用 MongoDB 的 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">schema validation</code>（JSON Schema 校验）或统一 ORM/DAO 层把关，别真把 schema 丢光。</p>
        </aside>
      </section>

      <!-- 3. BSON 与 ObjectID -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          BSON、bson.M 与 ObjectID
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>BSON</strong>（Binary JSON）是 MongoDB 的二进制存储格式——比纯 JSON 多支持了 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Date</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">ObjectID</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Binary</code> 等类型，查找和解析更快。Go 驱动里最常用两个类型：
        </p>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded font-mono text-xs">bson.M</code> —— 无序的 <code class="bg-slate-100 px-1 rounded font-mono text-xs">map[string]interface{}</code>，写查询/插入最顺手</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded font-mono text-xs">bson.D</code> —— 有序文档（数组），排序、范围查询等<strong>需要保序</strong>的操作用它</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><code class="bg-slate-100 px-1 rounded font-mono text-xs">primitive.ObjectID</code> —— 文档的 <code class="bg-slate-100 px-1 rounded font-mono text-xs">_id</code> 默认类型，12 字节：<strong>4 字节时间戳 + 5 字节随机 + 3 字节计数器</strong>，自增且含时间</span></li>
        </ul>
        <div class="mb-4"><Code language="go" :code="objectIDCode" title="ObjectID 的生成与转换" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">bson.M{}</code> ≈ JS 对象字面量 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">{ key: value }</code>——写查询就是「拿一个普通 JS 对象当条件」。而 ObjectID ≈ 前端的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">crypto.randomUUID()</code>：客户端生成、全局唯一、当主键直接用，不用像自增 ID 那样先查「下一位是多少」。</p>
        </aside>
      </section>

      <!-- 4. 连接与插入 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          连接与插入：Connect / Collection / InsertOne
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          用官方驱动 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">go.mongodb.org/mongo-driver</code>。
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Connect</code> 建立连接，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Collection</code> 拿集合句柄，<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">InsertOne</code> 插文档——<strong>集合和文档不存在会自动创建</strong>，不用建表。
        </p>
        <div class="mb-4"><Code language="go" :code="connectInsertCode" title="mongo.go：连接 + 插入" /></div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 对比 PostgreSQL：</strong>PG 要 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">CREATE TABLE posts (...)</code> 定义好每一列、类型、约束才能插入，字段变了要 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">ALTER TABLE</code>。MongoDB 直接 <code class="bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded text-xs">InsertOne(bson.M{...})</code>——这就是「schema 灵活」最直观的体现：<strong>写数据比写表结构快得多</strong>，适合快速迭代。</p>
        </aside>
      </section>

      <!-- 5. 查询 -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          查询：FindOne / Find / 条件与排序
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">FindOne</code> 拿单条（自动 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">LIMIT 1</code>），<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Find</code> 返回游标 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Cursor</code> 批量迭代。条件就是一个 JSON 对象：精确匹配直接写字段，比较运算用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">$gte</code>、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">$in</code> 等操作符。
        </p>
        <div class="mb-4"><Code language="go" :code="queryCode" title="query.go：查询全家族" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 Find 的 Cursor 要记得 Close：</strong><code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">cur.Close(ctx)</code> 释放底层游标资源，和 Go 里 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">defer rows.Close()</code>（database/sql）一个道理，别忘了。批量取出用 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">cur.All(ctx, &slice)</code> 最省事。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ bson.M 无序，注意它坑过的人：</strong>多条件查询（AND）用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">bson.M</code> 没问题；但<strong>需要保证字段顺序</strong>的场景（如 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">$sort</code> 多键、范围 + 等值混写）必须用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">bson.D</code>，否则 map 乱序会让查询语义错乱。</p>
        </aside>
      </section>

      <!-- 6. 更新与删除 -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          更新与删除：UpdateOne / DeleteOne
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          更新分<strong>两步参数</strong>：第一个是「过滤条件」，第二个是「更新操作」——操作符 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">$set</code> 改字段、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">$inc</code> 原子自增、<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">$push</code> 往数组追加。
        </p>
        <div class="mb-4"><Code language="go" :code="updateDeleteCode" title="update.go：更新与删除" /></div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">$set</code>/<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">$inc</code> 操作符 ≈ 前端不可变更新工具（Immer / 展开运算符）里的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">set</code>、<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">count + 1</code>——只声明「改哪、怎么改」，不重写整条数据。<code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">$inc</code> 更是<strong>数据库内原子自增</strong>，并发安全，正对应前端里要用「防抖 + 乐观更新」才能勉强模拟的场景。</p>
        </aside>
      </section>

      <!-- 7. 什么时候用 / 别用 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          什么时候用 MongoDB，什么时候别用
        </h2>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">✅ 适合（用 MongoDB）</th><th class="px-4 py-2 border border-slate-200 font-semibold">❌ 不适合（继续用 PostgreSQL）</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border">日志 / 监控 / 埋点：海量写入、结构经常变</td><td class="px-4 py-2 border">订单 / 支付 / 账务：强 ACID 事务，一分别错</td></tr>
              <tr><td class="px-4 py-2 border">内容型数据：文章、评论、商品，天然嵌套结构</td><td class="px-4 py-2 border">强关联报表：大量 JOIN 多表统计</td></tr>
              <tr><td class="px-4 py-2 border">异构数据：不同来源的字段完全不一样</td><td class="px-4 py-2 border">复杂约束：唯一索引、外键、触发器保证一致性</td></tr>
              <tr><td class="px-4 py-2 border">快速迭代 / 原型：改字段不用迁移，上线快</td><td class="px-4 py-2 border">既有 PG 业务：不换库就是最稳的方案</td></tr>
            </tbody>
          </table>
        </div>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>先想「我的数据<strong>结构是固定的</strong>还是<strong>随业务膨胀</strong>的」。固定 + 强一致 + 多表关联 → PostgreSQL；膨胀 + 异构 + 海量写 → MongoDB。很多大厂实际是<strong>混合用</strong>：核心交易在 PG/MySQL，日志、埋点、推荐候选进 MongoDB/ES。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 别被「性能快」带偏：</strong>MongoDB 的灵活来自<strong>放弃强约束换来的</strong>，不是免费的。多文档事务（4.0+ 才有）性能远不如 PG，跨集合 JOIN 靠 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">$lookup</code>，复杂统计要写聚合管道（Aggregation Pipeline），学习曲线陡。业务是钱、是账，就老实回关系型。</p>
        </aside>
      </section>

      <!-- 8. 常见错误 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          常见错误与反模式
        </h2>
        <ul class="space-y-2 text-slate-600 mb-4 text-sm leading-relaxed">
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">⚠️</span><span><strong>忘了处理 mongo.ErrNoDocuments</strong>：<code class="bg-slate-100 px-1 rounded font-mono text-xs">FindOne(...).Decode()</code> 查不到会返回 <code class="bg-slate-100 px-1 rounded font-mono text-xs">mongo.ErrNoDocuments</code>，直接当成普通 error 返回，接口就 500 了。先判断 <code class="bg-slate-100 px-1 rounded font-mono text-xs">errors.Is(err, mongo.ErrNoDocuments)</code> 再决定 404 还是兜底</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">⚠️</span><span><strong>用 bson.M 写排序/范围查询</strong>：多键排序依赖字段顺序，必须 <code class="bg-slate-100 px-1 rounded font-mono text-xs">bson.D</code>，<code class="bg-slate-100 px-1 rounded font-mono text-xs">bson.M</code>（map 无序）会让 sort 顺序随机</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">⚠️</span><span><strong>ObjectID 字符串没转换就查 _id</strong>：URL 参数来的 <code class="bg-slate-100 px-1 rounded font-mono text-xs">"665a1c..."</code> 是 string，直接当 <code class="bg-slate-100 px-1 rounded font-mono text-xs">_id</code> 条件查不到，得先 <code class="bg-slate-100 px-1 rounded font-mono text-xs">primitive.ObjectIDFromHex()</code> 转成 ObjectID</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">⚠️</span><span><strong>连接一次建一次</strong>：<code class="bg-slate-100 px-1 rounded font-mono text-xs">mongo.Connect</code> 很重，应用启动时建一个 <code class="bg-slate-100 px-1 rounded font-mono text-xs">*mongo.Client</code> 全局复用，别每次请求都连（和第 4-2 节连接池同理）</span></li>
          <li class="flex items-start gap-2"><span class="text-amber-500 mt-1">⚠️</span><span><strong>无脑 Find 全表</strong>：查询务必带条件 + <code class="bg-slate-100 px-1 rounded font-mono text-xs">SetLimit</code>，全量 <code class="bg-slate-100 px-1 rounded font-mono text-xs">cur.All</code> 会把几百 GB 库读进内存</span></li>
        </ul>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">ErrNoDocuments</code> 没处理 ≈ 前端 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">JSON.parse</code> 不加 try/catch，接口一返 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">null</code> 页面直接崩。而「查不到就 500」≈ 没做空态处理。MongoDB 的「查不到」是正常业务分支（404/空数组），不是异常。</p>
        </aside>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>MongoDB 是文档型 NoSQL</strong>：库 → 集合 → 文档，数据是 BSON（二进制 JSON），不建表不写 SQL</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>vs PostgreSQL</strong>：表/行 vs 集合/文档；列固定 vs schema 灵活；JOIN vs 内嵌嵌套；强事务 vs 弱事务</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>bson.M</strong>（map 无序）写查询，<strong>bson.D</strong>（保序）写 sort/范围；<strong>ObjectID</strong> 是自动生成的 12 字节主键</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>驱动三件套</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">InsertOne</code> 插入、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">FindOne/Find</code> 查询、<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">UpdateOne/DeleteOne</code> 改删；查询别忘了 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">$set/$inc/$push</code> 操作符</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>用在哪</strong>：日志、异构数据、内容型、快速迭代；<strong>别用在哪</strong>：订单/账务等强一致、强事务场景</span></li>
        </ul>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <Link :route="'go-4-11-distributed-lock'" :text="'← 上一节：Redis 分布式锁'" animation="none" size="small"
          class="p-0! text-sm! font-normal! text-slate-500! hover:text-cyan-600! bg-transparent! border-none! inline!" />
        <Link :route="'go-4-13-migration'" :text="'下一节：数据库迁移 →'" animation="none" size="small"
          class="p-0! text-sm! font-medium! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Link, Nav } from 'components'

const navList = [
  { id: "sec-1", name: "什么是文档数据库" },
  { id: "sec-2", name: "PG vs MongoDB" },
  { id: "sec-3", name: "BSON 与 ObjectID" },
  { id: "sec-4", name: "连接与插入" },
  { id: "sec-5", name: "查询" },
  { id: "sec-6", name: "更新与删除" },
  { id: "sec-7", name: "用不用怎么选" },
  { id: "sec-8", name: "常见错误" },
  { id: "sec-9", name: "小结" },
]

const docExampleCode = `// 一条博客文章文档（就是一条「记录」）
{
  "_id": "ObjectId('665a1c2b9d0f1a2b3c4d5e6f')",  // 主键，自动生成
  "title": "MongoDB 入门",
  "author": "fat-guy-coder",
  "tags": ["go", "nosql", "database"],
  "stats": { "views": 1024, "likes": 66 },       // 可以嵌套对象
  "comments": [                                  // 可以嵌套数组
    { "user": "alice", "content": "赞" },
    { "user": "bob", "content": "学到了" }
  ]
}

// 另一条文档：字段可以完全不同（schema 灵活）
{
  "_id": "ObjectId('665a1d0e9d0f1a2b3c4d5e70')",
  "title": "单行文档：没有 tags，多了 category",
  "category": "tutorial"
}`

const objectIDCode = `// object_id.go — ObjectID 的生成、解析与使用
package main

import (
    "fmt"

    "go.mongodb.org/mongo-driver/bson/primitive"
)

func main() {
    // ① 代码里主动生成一个新 ObjectID（不指定 _id 时驱动也会自动生成）
    id := primitive.NewObjectID()
    fmt.Println("新 ObjectID:", id.Hex()) // 24 位十六进制字符串

    // ② 从字符串解析（比如 URL 参数 ?id=665a1c... 传进来的）
    hex := "665a1c2b9d0f1a2b3c4d5e6f"
    oid, err := primitive.ObjectIDFromHex(hex)
    if err != nil {
        panic("不是合法的 ObjectID 字符串")
    }
    fmt.Println("解析成功:", oid)

    // ③ 拿 ObjectID 当查询条件查 _id
    // filter := bson.M{"_id": oid}  ← 必须是 ObjectID，不是字符串！
}`

const connectInsertCode = `// mongo.go — 连接 + 插入
package main

import (
    "context"
    "fmt"
    "log"
    "time"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    // ① Connect：建立连接池（重，进程里只建一次）
    client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
    if err != nil { log.Fatal(err) }
    defer client.Disconnect(ctx)

    // ② 选库、选集合：blog.posts —— 不存在会自动创建，不用建表
    col := client.Database("blog").Collection("posts")

    // ③ 插入一条（bson.M = 一个 JSON 对象）
    res, err := col.InsertOne(ctx, bson.M{
        "title":  "MongoDB 入门",
        "author": "fat-guy-coder",
        "tags":   []string{"go", "nosql"},
        "views":  0,
    })
    if err != nil { log.Fatal(err) }
    fmt.Println("插入成功，自动生成的 _id:", res.InsertedID)
    // 输出: 插入成功，自动生成的 _id: ObjectID("665a1c2b...")

    // ④ 批量插入
    docs := []interface{}{
        bson.M{"title": "第二篇", "author": "alice"},
        bson.M{"title": "第三篇", "author": "bob"},
    }
    many, err := col.InsertMany(ctx, docs)
    if err != nil { log.Fatal(err) }
    fmt.Println("批量插入条数:", len(many.InsertedIDs))
}`

const queryCode = `// query.go — 查询全家族
package main

import (
    "context"
    "fmt"
    "log"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
    ctx := context.Background()
    col := client.Database("blog").Collection("posts")

    // ① FindOne：查单条（等价 LIMIT 1）
    var one bson.M
    err := col.FindOne(ctx, bson.M{"author": "fat-guy-coder"}).Decode(&one)
    if err == mongo.ErrNoDocuments {
        fmt.Println("没找到") // 正常分支，不是异常！
    } else if err != nil {
        log.Fatal(err)
    } else {
        fmt.Println("找到:", one["title"])
    }

    // ② Find：查全部（空条件 {}）+ 迭代 Cursor
    cur, err := col.Find(ctx, bson.M{})
    if err != nil { log.Fatal(err) }
    defer cur.Close(ctx) // 别忘了关游标

    var all []bson.M
    if err := cur.All(ctx, &all); err != nil { log.Fatal(err) }
    for _, p := range all {
        fmt.Println(p["title"], "作者:", p["author"])
    }

    // ③ 范围查询 $gte + 排序 + 限制（排序必须用保序的 bson.D）
    opts := options.Find().
        SetSort(bson.D{{Key: "views", Value: -1}}). // views 倒序
        SetLimit(10)                                 // 只取前 10

    cur2, _ := col.Find(ctx, bson.M{
        "views": bson.M{"$gte": 1000}, // views >= 1000
    }, opts)
    defer cur2.Close(ctx)

    // ④ 精确匹配 + 操作符 $in
    _, _ = col.Find(ctx, bson.M{
        "tags": bson.M{"$in": []string{"go", "nosql"}},
    })
}`

const updateDeleteCode = `// update.go — 更新与删除
package main

import (
    "context"
    "fmt"
    "log"

    "go.mongodb.org/mongo-driver/bson"
)

func main() {
    ctx := context.Background()
    col := client.Database("blog").Collection("posts")

    // ① UpdateOne：把 id 对应的文章 views 原子自增（$inc）
    res, err := col.UpdateOne(ctx,
        bson.M{"_id": postID},          // 条件：按主键定位
        bson.M{"$inc": bson.M{"views": 1}}, // 操作：原子 +1
    )
    if err != nil { log.Fatal(err) }
    fmt.Println("更新条数:", res.ModifiedCount)

    // ② $set 修改字段（字段不存在会新增）
    _, _ = col.UpdateOne(ctx,
        bson.M{"_id": postID},
        bson.M{"$set": bson.M{"title": "改后的标题"}},
    )

    // ③ $push 往数组追加一条评论
    _, _ = col.UpdateOne(ctx,
        bson.M{"_id": postID},
        bson.M{"$push": bson.M{"comments": bson.M{"user": "carol", "content": "好文"}}},
    )

    // ④ DeleteOne：删除一条，返回删了几条
    del, err := col.DeleteOne(ctx, bson.M{"_id": postID})
    if err != nil { log.Fatal(err) }
    fmt.Println("删除条数:", del.DeletedCount)
}`
</script>
