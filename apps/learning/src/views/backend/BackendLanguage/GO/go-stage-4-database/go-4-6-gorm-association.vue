<template>
  <div class="go-doc min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">🔗 GORM 关联与预加载</h1>
          <p class="text-sm text-slate-500 mt-1">BelongsTo / HasMany / Many2Many · 外键约定 · Preload 避免 N+1 · Association 操作 · Joins · 嵌套预加载</p>
        </div>
        <div class="flex items-center gap-3">
          <Link :route="'go-4-3-crud-basics'" :text="'先看 database/sql CRUD'" animation="none" size="small" class="px-3! py-1! text-xs! font-medium! text-cyan-700! bg-cyan-50! hover:bg-cyan-100! hover:text-cyan-900! rounded-full! border-none!" />
          <span class="text-xs text-slate-400 bg-slate-100 px-3 py-1 rounded-full">阶段 4-6</span>
        </div>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-8 space-y-6">
      <Nav :list="navList" title="📑 目录" position="top-right" :showBackToTop="true" />

      <!-- 1. 关联的三种类型 -->
      <section id="sec-1" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">1</span>
          三种关联类型：BelongsTo / HasMany / Many2Many
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          上篇学了单表的增删改查。真实业务里表之间永远有关系：<strong>用户 → 订单（一对多）</strong>、<strong>订单 → 用户（多对一）</strong>、<strong>用户 ↔ 角色（多对多）</strong>。
          GORM 用结构体字段声明关联，建表、外键、联表查询都由它接管。
        </p>
        <div class="overflow-x-auto mb-4">
          <table class="w-full text-sm border-collapse">
            <thead><tr class="bg-slate-100 text-left"><th class="px-4 py-2 border border-slate-200 font-semibold">关联</th><th class="px-4 py-2 border border-slate-200 font-semibold">关系</th><th class="px-4 py-2 border border-slate-200 font-semibold">典型场景</th><th class="px-4 py-2 border border-slate-200 font-semibold">外键放哪</th></tr></thead>
            <tbody class="text-slate-600">
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">BelongsTo（属于）</td><td class="px-4 py-2 border">N : 1</td><td class="px-4 py-2 border">每张订单属于一个用户</td><td class="px-4 py-2 border">订单表存 <code class="bg-slate-100 px-1 rounded font-mono text-xs">user_id</code></td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">HasMany（拥有）</td><td class="px-4 py-2 border">1 : N</td><td class="px-4 py-2 border">一个用户有多张订单</td><td class="px-4 py-2 border">同一列 <code class="bg-slate-100 px-1 rounded font-mono text-xs">user_id</code>，在订单表</td></tr>
              <tr><td class="px-4 py-2 border font-semibold text-cyan-700">Many2Many（多对多）</td><td class="px-4 py-2 border">N : M</td><td class="px-4 py-2 border">用户 ↔ 角色</td><td class="px-4 py-2 border">中间表 <code class="bg-slate-100 px-1 rounded font-mono text-xs">user_roles</code></td></tr>
            </tbody>
          </table>
        </div>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <strong>关键心智</strong>：BelongsTo 和 HasMany 是<strong>同一张外键列的正反两个视角</strong>——订单表里的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">user_id</code>，
          从 Order 看是 BelongsTo（我属于谁），从 User 看是 HasMany（我拥有谁）。Many2Many 则是多一张<strong>中间表</strong>，两边都不存对方的外键。
        </p>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>GORM 的三种关联 ≈ Sequelize 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">hasMany / belongsTo / belongsToMany</code> ≈ TypeORM 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">@OneToMany / @ManyToOne / @ManyToMany</code>。关系名直接平移，区别只是 JS 用装饰器/配置声明，Go 用结构体字段声明。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>这些关联最终都翻译成 SQL 的 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">JOIN</code> 和外键约束。你可以在数据库客户端（如 pgAdmin / sqlite3）里看到 GORM 帮你建的表：多对多会自动多一张中间表，这正是你手写 SQL 时自己设计的那套结构。</p>
        </aside>
      </section>

      <!-- 2. 一对多 -->
      <section id="sec-2" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">2</span>
          一对多：User ↔ Order（HasMany + BelongsTo）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          声明方式：User 里加 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Orders []Order</code>（HasMany 字段），Order 里加
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">UserID uint</code>（外键列）+ <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">User User</code>（BelongsTo 字段）。
          <strong>外键列的命名默认是「拥有者类型名 + ID」</strong>，即 UserID。
        </p>
        <div class="mb-4"><Code language="go" :code="hasManyCode" title="has-many.go" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">AutoMigrate(&User{}, &Order{})</code>：一次迁移两张表，还会给 <code class="bg-slate-100 px-1 rounded font-mono text-xs">user_id</code> 建索引</li>
          <li>创建关联：<strong>先建「一」方拿 ID</strong>，再建「多」方时把 <code class="bg-slate-100 px-1 rounded font-mono text-xs">UserID</code> 填进去</li>
          <li>也可以「直接带关系创建」：<code class="bg-slate-100 px-1 rounded font-mono text-xs">db.Create(&User{Name: "小明", Orders: []Order{...}})</code>——GORM 会级联创建</li>
          <li>「多」方拿关联数据，最简单是 <code class="bg-slate-100 px-1 rounded font-mono text-xs">db.Where("user_id = ?", u.ID)</code>；「一」方拿数据就要 Preload（见 sec-5）</li>
        </ol>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4">
          <p class="text-sm text-blue-800"><strong>💡 记住谁存外键：</strong>外键永远放在「多」方表里（Order 存 user_id，Role 关联 User 走中间表）。因为「一」方一行要对应多行，「多」方一行只对应一行，外键塞在「多」方最自然。这也和手写 SQL 建表的设计完全一致。</p>
        </aside>
      </section>

      <!-- 3. 外键约定 -->
      <section id="sec-3" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">3</span>
          外键约定与自定义：foreignKey / references
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          默认外键 = <strong>拥有者类型名 + 主键名</strong>：User.ID → Order 里的 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">UserID</code>。
          不满足时可以自定义：<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">gorm:"foreignKey:CreatorID;references:ID"</code> 表示「拿本表 CreatorID 去关联 User 的 ID 列」。
        </p>
        <div class="mb-4"><Code language="go" :code="fkCode" title="fk.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 命名冲突的坑：</strong>一个结构体里出现<strong>两个指向同一模型</strong>的关联（如 Post 同时有 Author 和 Editor 两个 User），GORM 默认猜不出谁是谁，会建错外键列。<strong>必须给两个字段都显式写 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">foreignKey:</code></strong>。同理，关联字段名和已有列名重名也会踩坑。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>自定义外键 ≈ Prisma 里的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">@relation(fields: [creatorId], references: [id])</code> ≈ Sequelize 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">foreignKey: 'creatorId'</code>。都是「指定哪一列连哪一列」，写错名称时 GORM 会直接报 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">invalid foreign key</code>。</p>
        </aside>
      </section>

      <!-- 4. 多对多 -->
      <section id="sec-4" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">4</span>
          多对多：User ↔ Role（Many2Many + 中间表）
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          多对多用 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">gorm:"many2many:user_roles;"</code> 声明。
          <strong>不需要你建中间表</strong>——AutoMigrate 会读取两边结构体，自动创建 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">user_roles</code>（user_id + role_id 两列）。
          建立关联用的是 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Association("Roles").Append(...)</code>。
        </p>
        <div class="mb-4"><Code language="go" :code="many2manyCode" title="many2many.go" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>中间表名默认 = 两个表名 snake_case 拼接：<code class="bg-slate-100 px-1 rounded font-mono text-xs">user_roles</code>；用 <code class="bg-slate-100 px-1 rounded font-mono text-xs">many2many:xxx</code> 可改名</li>
          <li>中间表只存 <code class="bg-slate-100 px-1 rounded font-mono text-xs">user_id</code> + <code class="bg-slate-100 px-1 rounded font-mono text-xs">role_id</code> 两列，是「纯关联表」</li>
          <li>查询关联（谁的角色）同样要 <code class="bg-slate-100 px-1 rounded font-mono text-xs">Preload("Roles")</code>，否则 Roles 是 nil</li>
          <li>多对多也可以自定义连接表：<code class="bg-slate-100 px-1 rounded font-mono text-xs">gorm:"many2many:user_roles;foreignKey:ID;joinForeignKey:UserID;References:ID;joinReferences:RoleID"</code>（高级场景，先用默认）</li>
        </ol>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong>多对多的中间表 ≈ 你手写 SQL 时建的关联表。REST API 里给用户「加角色」就是一个 POST 往 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">user_roles</code> 插一行；「看用户角色」就是 JOIN 三张表。GORM 把这些 SQL 全部包装成了 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">Association(...)</code> 方法。</p>
        </aside>
      </section>

      <!-- 5. Preload -->
      <section id="sec-5" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">5</span>
          Preload 预加载：避免 N+1 查询
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          查「所有用户 + 各自的订单」，如果逐个去查关联，就是<strong>著名的 N+1 查询问题</strong>：1 条查用户 + N 条查订单 = N+1 次往返数据库。
          用户一多，数据库连接就被打爆。<code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Preload("Orders")</code> 把它变成<strong> 2 条 SQL</strong>：先查用户，再拿所有用户 ID 拼一条 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">WHERE user_id IN (...)</code> 批量取回。
        </p>
        <div class="mb-4"><Code language="go" :code="preloadCode" title="preload.go" /></div>
        <ol class="list-decimal list-inside space-y-1 text-slate-600 mb-4 text-sm leading-relaxed">
          <li>N+1 的代价：N 越大越致命。3 个用户 = 4 条 SQL；1000 个用户 = 1001 条 SQL，每次还都要网络往返</li>
          <li>Preload 是「批量取回后内存里按 FK 分组」，不是 JOIN——但它一次往返就够，性能量级完全不同</li>
          <li><code class="bg-slate-100 px-1 rounded font-mono text-xs">Preload(clause.Associations)</code> 可预加载所有第一层关联（需 import <code class="bg-slate-100 px-1 rounded font-mono text-xs">gorm.io/gorm/clause</code>）</li>
        </ol>
        <aside class="bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-emerald-800"><strong>✅ 经验法则：</strong>只要返回结构里带关联字段，就<strong>先想 Preload</strong>。凡是看到「查完主体再循环查关联」的代码，就是 N+1，一律改成 Preload。这是后端性能问题里出现频率最高的一类。</p>
        </aside>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong><code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">Preload("Orders")</code> ≈ Sequelize 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">include: [{ model: Order }]</code> ≈ Prisma 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">include: { orders: true }</code> ≈ Mongoose 的 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">populate('orders')</code>。<strong>所有 ORM 的 N+1 解法都是同一个词：预加载 / include</strong>。</p>
        </aside>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 不 Preload 的表现：</strong>你以为 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">db.Find(&users)</code> 会把 Orders 一起查回来？<strong>不会</strong>——不 Preload 的话 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">users[i].Orders</code> 是 <strong>nil</strong>。要么 Preload，要么自己循环查，没有第三种「自动带上」。</p>
        </aside>
      </section>

      <!-- 6. Association 操作与 Joins -->
      <section id="sec-6" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">6</span>
          Association 操作与 Joins
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">db.Model(&u).Association("Roles")</code> 是关联的「操作手柄」，可以
          <strong>Append（追加）/ Replace（替换）/ Delete（删除关系）/ Clear（清空）/ Count / Find</strong>。
          另外 <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Joins</code> 可以把关联表拼进主查询，用来「按关联字段过滤」（比如找所有 admin 用户）。
        </p>
        <div class="mb-4"><Code language="go" :code="assocOpsCode" title="assoc-ops.go" /></div>
        <aside class="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-blue-800"><strong>💡 两种「建关联」的方式：</strong>多对多推荐 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">Association("Roles").Append(...)</code>（只插中间表）；一对多也可以直接 <code class="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">Order{UserID: u.ID}</code> 创建（写外键列）。<strong>Append 只动中间表，不会改 Order 的 user_id</strong>——一对多的关联创建更常用「直接写外键」。</p>
        </aside>
        <aside class="bg-teal-50 border-l-4 border-teal-400 rounded-r-xl p-4">
          <p class="text-sm text-teal-800"><strong>⚙️ 后端类比·Go：</strong><code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">Delete</code> 只删中间表那一行 ≈ SQL <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">DELETE FROM user_roles WHERE user_id=? AND role_id=?</code>；<code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">Joins</code> 的三表 JOIN ≈ 手写 <code class="bg-teal-100 text-teal-700 px-1 py-0.5 rounded text-xs">SELECT users.* FROM users JOIN user_roles ON ... JOIN roles ON ...</code>。ORM 只是把 SQL 藏起来了，理解 SQL 才能用得准。</p>
        </aside>
      </section>

      <!-- 7. 嵌套预加载 -->
      <section id="sec-7" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">7</span>
          嵌套预加载：User → Orders → Items
        </h2>
        <p class="text-slate-600 mb-4 leading-relaxed">
          预加载的关联里<strong>还有关联</strong>（用户 → 订单 → 订单里的商品明细），用点号写「完整路径」：
          <code class="bg-slate-100 text-cyan-700 px-1 rounded text-xs font-mono">Preload("Orders.Items")</code>。GORM 会为每一层发一条 IN 查询。
        </p>
        <div class="mb-4"><Code language="go" :code="nestedCode" title="nested.go" /></div>
        <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-4">
          <p class="text-sm text-amber-800"><strong>⚠️ 嵌套路径的两个坑：</strong>① 必须写<strong>从根到叶的全路径</strong>，只写 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Preload("Items")</code> 会报 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">unknown field Items in User</code>；② <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Preload(clause.Associations)</code> 只覆盖<strong>第一层</strong>，深层关联必须显式写路径。</p>
        </aside>
      </section>

      <!-- 8. 关联的坑 -->
      <section id="sec-8" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">8</span>
          关联的坑 ⚠️
        </h2>
        <div class="space-y-4 mb-2">
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 1：不 Preload 的 N+1。</strong>「查完主体循环查关联」是最隐蔽的性能炸弹。压测时接口慢、数据库连接暴涨，八成是它。修复永远是一个 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Preload</code>。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 2：外键命名冲突。</strong>一个结构体里两个关联指向同一模型（Author / Editor 都是 User），或者关联字段与已有列重名——GORM 猜错外键。解法：每个关联字段都显式 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">foreignKey:</code>。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 3：忘记先建「一」方。</strong><code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Create(&Order{UserID: 999})</code> 而 User 999 不存在——除非数据库开了外键约束（SQLite 默认不开），否则会插入孤儿记录。先用 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">First(&user, id)</code> 确认存在，或用级联创建。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 4：软删除和关联。</strong>User 用了软删除（gorm.Model 里的 DeletedAt），Preload 时 GORM 会<strong>自动只取未删除的关联</strong>；但删除用户时，它的 Order 关联不会跟着软删除。一对多/多对多的「级联删除」默认是关的，业务上要自己做清理或显式配置。</p>
          </aside>
          <aside class="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
            <p class="text-sm text-amber-800"><strong>⚠️ 坑 5：多对多 Append 前要先保存。</strong><code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">Association("Roles").Append(&role)</code> 要求 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">u.ID</code> 和 <code class="bg-amber-100 text-amber-700 px-1 py-0.5 rounded text-xs">role.ID</code> 都已经存在（先 Create）。对还没入库的零值 ID 做 Append，中间表会插一堆 0。</p>
          </aside>
        </div>
        <aside class="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl p-4">
          <p class="text-sm text-purple-800"><strong>🔗 前端类比：</strong>这些坑在 JS 生态原样存在——Sequelize 不配 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">include</code> 会 N+1，Mongoose 不 <code class="bg-purple-100 text-purple-700 px-1 py-0.5 rounded text-xs">populate</code> 关联是空的。<strong>N+1 不是 GORM 独有的问题，是所有关系型 ORM 的共性</strong>，学会一次到处受用。</p>
        </aside>
      </section>

      <!-- 9. 小结 -->
      <section id="sec-9" class="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span class="w-8 h-8 bg-cyan-100 text-cyan-700 rounded-lg flex items-center justify-center text-sm">📋</span>
          小结
        </h2>
        <ul class="space-y-2 text-slate-600 mb-4">
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>三种关联</strong>：BelongsTo（多对一）、HasMany（一对多，和 BelongsTo 是同一外键的两个视角）、Many2Many（中间表）。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>外键默认</strong> = 拥有者类型名 + ID（UserID）；命名冲突 / 自定义时用 <code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">foreignKey:xxx;references:xxx</code>。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>多对多</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">gorm:"many2many:user_roles;"</code>，AutoMigrate 自动建中间表。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Preload</strong> 预加载：把 N+1 条查询变成 2 条 IN 查询，返回结构带关联时必加。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Association 操作</strong>：Append / Replace / Delete / Clear 只动关联（中间表），不删数据本身。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>Joins</strong>：把关联表拼进主查询，按关联字段过滤（如「找所有 admin 用户」）。</span></li>
          <li class="flex items-start gap-2"><span class="text-cyan-500 mt-1">▸</span><span><strong>嵌套预加载</strong>：<code class="bg-slate-100 px-1 rounded text-cyan-700 text-xs">Preload("Orders.Items")</code>，路径从根写到叶。</span></li>
        </ul>
        <p class="text-sm text-slate-500 leading-relaxed">相关阅读：<Link :route="'go-4-5-gorm-start'" :text="'GORM 入门'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'go-4-3-crud-basics'" :text="'database/sql 手写 CRUD（JOIN 的底层原理）'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /> ·
          <Link :route="'go-4-8-transactions'" :text="'事务（关联写入要多表原子性）'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" /></p>
      </section>
    </main>

    <footer class="max-w-4xl mx-auto px-6 py-8">
      <nav class="flex justify-between items-center pt-4 border-t border-slate-200 text-sm">
        <Link :route="'go-4-5-gorm-start'" :text="'← 上一节：GORM 入门'" animation="none" size="small" class="p-0! text-sm! font-normal! text-slate-500! hover:text-cyan-600! bg-transparent! border-none! inline!" />
        <Link :route="'go-4-7-sqlx-native'" :text="'下一节：sqlx 原生数据库访问 →'" animation="none" size="small" class="p-0! text-sm! font-normal! text-cyan-600! hover:text-cyan-700! bg-transparent! border-none! inline!" />
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Code, Link, Nav } from 'components'

const navList = [
  { id: "sec-1", name: "三种关联类型" },
  { id: "sec-2", name: "一对多 User↔Order" },
  { id: "sec-3", name: "外键约定与自定义" },
  { id: "sec-4", name: "多对多 User↔Role" },
  { id: "sec-5", name: "Preload 避免 N+1" },
  { id: "sec-6", name: "Association 与 Joins" },
  { id: "sec-7", name: "嵌套预加载" },
  { id: "sec-8", name: "关联的坑" },
  { id: "sec-9", name: "小结" },
]

const hasManyCode = `// has-many.go — 一对多：一个用户有多张订单
package main

import (
    "fmt"

    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

// 一方：User（HasMany 拥有者）
type User struct {
    gorm.Model
    Name   string  ` + "`gorm:\"size:64;not null\"`" + `
    Orders []Order // HasMany：User 拥有多个 Order
}

// 多方：Order（BelongsTo 从属）
type Order struct {
    gorm.Model
    UserID uint    ` + "`gorm:\"index\"`" + `  // 外键：默认命名为 UserID
    Amount float64 ` + "`gorm:\"not null\"`" + `
    User   User    // BelongsTo：Order 属于 User（外键还是 UserID）
}

func main() {
    db, _ := gorm.Open(sqlite.Open("shop.db"), &gorm.Config{})
    db.AutoMigrate(&User{}, &Order{}) // 一次迁移两张表 + 外键索引

    // ① 创建关联数据：先建 User，再建 Order 时带上 UserID
    u := User{Name: "小明"}
    db.Create(&u)
    db.Create(&Order{UserID: u.ID, Amount: 99.5})
    db.Create(&Order{UserID: u.ID, Amount: 20})

    // ② 手动查关联（不 Preload 的笨办法，见 sec-5 的 N+1）
    var orders []Order
    db.Where("user_id = ?", u.ID).Find(&orders)
    fmt.Printf("小明的订单数: %d\\n", len(orders))
    // 输出: 小明的订单数: 2
}`

const fkCode = `// fk.go — 外键命名约定与自定义
package main

import "gorm.io/gorm"

type User struct {
    gorm.Model
    Name        string
    Orders      []Order      // 默认外键：Order.UserID
    CreditCards []CreditCard // 默认外键：CreditCard.UserID
}

type Order struct {
    gorm.Model
    UserID uint // 默认外键：拥有者类型名(User) + 主键名(ID) = UserID
    User   User // BelongsTo，外键同样是 UserID（两边共用一列）
}

type CreditCard struct {
    gorm.Model
    UserID uint
    Number string ` + "`gorm:\"size:32\"`" + `
}

// 自定义外键：想让订单的"创建人"用别的列（如 CreatorID）
type Order2 struct {
    gorm.Model
    CreatorID uint
    Creator   User ` + "`gorm:\"foreignKey:CreatorID;references:ID\"`" + `
    //  意思是：用本表 CreatorID 列，去关联 User 的 ID 列
}

// 命名冲突场景：一个 struct 里两个指向同一模型的关联 → 必须显式 foreignKey
type Post struct {
    gorm.Model
    AuthorID uint
    EditorID uint
    Author   User ` + "`gorm:\"foreignKey:AuthorID\"`" + `
    Editor   User ` + "`gorm:\"foreignKey:EditorID\"`" + `
}`

const many2manyCode = `// many2many.go — 多对多：User ↔ Role（自动建中间表）
package main

import (
    "fmt"

    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

type User struct {
    gorm.Model
    Name  string ` + "`gorm:\"size:64\"`" + `
    Roles []Role ` + "`gorm:\"many2many:user_roles;\"`" + ` // 指定中间表名 user_roles
}

type Role struct {
    gorm.Model
    Name string ` + "`gorm:\"size:32;uniqueIndex\"`" + `
}

func main() {
    db, _ := gorm.Open(sqlite.Open("rbac.db"), &gorm.Config{})
    db.AutoMigrate(&User{}, &Role{}) // 中间表 user_roles 也会被自动创建

    // ① 先建角色，再建用户，最后 Append 关联
    admin := Role{Name: "admin"}
    editor := Role{Name: "editor"}
    db.Create(&admin)
    db.Create(&editor)

    u := User{Name: "zhangsan"}
    db.Create(&u)
    db.Model(&u).Association("Roles").Append(&admin, &editor)

    // ② Preload 预加载多对多关联
    var loaded User
    db.Preload("Roles").First(&loaded, u.ID)
    fmt.Printf("%s 的角色: %s、%s\\n", loaded.Name, loaded.Roles[0].Name, loaded.Roles[1].Name)
    // 输出: zhangsan 的角色: admin、editor
}`

const preloadCode = `// preload.go — 预加载：一条 IN 查询解决 N+1
package main

import (
    "fmt"

    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

// User / Order 定义同 has-many.go
type User struct {
    gorm.Model
    Name   string  ` + "`gorm:\"size:64\"`" + `
    Orders []Order
}
type Order struct {
    gorm.Model
    UserID uint
    Amount float64
}

func main() {
    db, _ := gorm.Open(sqlite.Open("shop.db"), &gorm.Config{})
    db.AutoMigrate(&User{}, &Order{})
    // ...先塞入测试数据（3 个用户各 2 张订单）...

    // ❌ 写法 1：不 Preload → N+1 查询
    //    1 条 SELECT users + N 条 SELECT orders（每个用户一条）
    var users []User
    db.Find(&users)
    for i := range users {
        db.Where("user_id = ?", users[i].ID).Find(&users[i].Orders)
    }

    // ✅ 写法 2：Preload("Orders") → 只发 2 条 SQL
    var users2 []User
    db.Preload("Orders").Find(&users2)
    //   实际执行：
    //   SELECT * FROM users
    //   SELECT * FROM orders WHERE user_id IN (1,2,3,...)   ← 一条 IN 搞定所有用户

    fmt.Printf("%d 个用户的订单已批量预加载\\n", len(users2))
    // 输出: 3 个用户的订单已批量预加载
}`

const assocOpsCode = `// assoc-ops.go — Association 系列操作 + Joins
package main

import (
    "fmt"

    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

// User / Role 定义同 many2many.go
type User struct {
    gorm.Model
    Name  string ` + "`gorm:\"size:64\"`" + `
    Roles []Role ` + "`gorm:\"many2many:user_roles;\"`" + `
}
type Role struct {
    gorm.Model
    Name string ` + "`gorm:\"size:32\"`" + `
}

func main() {
    db, _ := gorm.Open(sqlite.Open("rbac.db"), &gorm.Config{})

    var u User
    db.Preload("Roles").First(&u, 1)

    // ① Replace：整组替换（旧的关联全删，换成新的一组）
    visitor := Role{Name: "visitor"}
    db.Create(&visitor)
    db.Model(&u).Association("Roles").Replace(&visitor)
    //   中间表 user_roles 里 user_id=1 的行全部替换为 role_id=visitor.ID

    // ② Delete：只删"这条关联关系"（中间表那行），不删 Role 本身
    db.Model(&u).Association("Roles").Delete(&visitor)

    // ③ Clear：清空该用户所有角色关联
    db.Model(&u).Association("Roles").Clear()

    // ④ Count / Find：查看当前关联
    n := db.Model(&u).Association("Roles").Count()
    fmt.Printf("关联角色数: %d\\n", n)
    // 输出: 关联角色数: 0

    // ⑤ Joins：把关联表拼进主查询，按关联字段过滤（比两次查询更高效）
    var admins []User
    db.Preload("Roles").
        Joins("JOIN user_roles ON user_roles.user_id = users.id").
        Joins("JOIN roles ON roles.id = user_roles.role_id").
        Where("roles.name = ?", "admin").
        Find(&admins)
    fmt.Printf("admin 用户数: %d\\n", len(admins))
}`

const nestedCode = `// nested.go — 嵌套预加载：预加载的关联里再预加载
package main

import (
    "fmt"

    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
)

type User struct {
    gorm.Model
    Name   string  ` + "`gorm:\"size:64\"`" + `
    Orders []Order // 第一层
}

type Order struct {
    gorm.Model
    UserID uint
    Items  []Item // 第二层
}

type Item struct {
    gorm.Model
    OrderID uint
    Name    string
}

func main() {
    db, _ := gorm.Open(sqlite.Open("shop.db"), &gorm.Config{})
    db.AutoMigrate(&User{}, &Order{}, &Item{})

    // ✅ 嵌套预加载：用点号写"完整路径"
    var users []User
    db.Preload("Orders.Items").Find(&users)
    //   执行 3 条 SQL：
    //   SELECT * FROM users
    //   SELECT * FROM orders WHERE user_id IN (...)
    //   SELECT * FROM items  WHERE order_id IN (...)   ← 跨两层，GORM 自动推导 IN

    fmt.Printf("用户数: %d\\n", len(users))

    // ❌ 常见报错：只写 Preload("Items") 会找不到字段
    // db.Preload("Items").Find(&users)
    // → ERROR: unknown field Items in User  （Items 在 Order 里，不在 User 里）

    // 💡 想预加载"所有第一层关联"？用 clause.Associations（需 import gorm.io/gorm/clause）
    // db.Preload(clause.Associations).Find(&users)  // 等价 Preload("Orders")
}`
</script>
